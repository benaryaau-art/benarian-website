const ALLOWED_TYPES = new Set(['image/jpeg','image/png','image/webp','video/mp4']);
const MAX_FILES = 20;
const MAX_FILE_BYTES = 15 * 1024 * 1024;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

function textValue(form, key, max = 5000) {
  const value = String(form.get(key) || '').trim();
  return value.slice(0, max);
}

function safeFileName(name) {
  return String(name || 'upload')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'upload';
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.STORIES_DB || !env.STORIES_MEDIA) {
    return json({ error: 'Cloudflare storage bindings are not configured.' }, 503);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return json({ error: 'Expected multipart form data.' }, 415);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Unable to read submission.' }, 400);
  }

  const required = ['email', 'title', 'destination', 'hotel', 'rating', 'story', 'permission'];
  for (const field of required) {
    if (!form.get(field)) return json({ error: `Missing required field: ${field}` }, 400);
  }

  const media = form.getAll('media').filter(item => item instanceof File && item.size > 0);
  if (media.length > MAX_FILES) return json({ error: `Maximum ${MAX_FILES} files allowed.` }, 400);
  for (const file of media) {
    if (!ALLOWED_TYPES.has(file.type)) return json({ error: `Unsupported file type: ${file.type}` }, 400);
    if (file.size > MAX_FILE_BYTES) return json({ error: `${file.name} is larger than 15 MB.` }, 400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const topics = form.getAll('topics').map(String).slice(0, 12);
  const uploaded = [];

  try {
    for (let index = 0; index < media.length; index += 1) {
      const file = media[index];
      const key = `pending/${id}/${String(index + 1).padStart(2, '0')}-${safeFileName(file.name)}`;
      await env.STORIES_MEDIA.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
        customMetadata: { storyId: id, originalName: file.name, status: 'pending' }
      });
      uploaded.push({ key, name: file.name, type: file.type, size: file.size });
    }

    await env.STORIES_DB.prepare(`
      INSERT INTO travel_stories (
        id, created_at, status, display_name, email, title, destination, hotel,
        travel_date, travel_type, rating, topics, story, highlights, improvements,
        social, recommend, anonymous, show_social, media_json, source_ip
      ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      createdAt,
      textValue(form, 'name', 120),
      textValue(form, 'email', 254).toLowerCase(),
      textValue(form, 'title', 180),
      textValue(form, 'destination', 160),
      textValue(form, 'hotel', 180),
      textValue(form, 'travel_date', 20),
      textValue(form, 'travel_type', 40),
      Number(form.get('rating')),
      JSON.stringify(topics),
      textValue(form, 'story', 20000),
      textValue(form, 'highlights', 5000),
      textValue(form, 'improvements', 5000),
      textValue(form, 'social', 160),
      textValue(form, 'recommend', 20),
      form.get('anonymous') ? 1 : 0,
      form.get('show_social') ? 1 : 0,
      JSON.stringify(uploaded),
      ip.slice(0, 64)
    ).run();

    return json({ ok: true, id, status: 'pending' }, 201);
  } catch (error) {
    await Promise.allSettled(uploaded.map(file => env.STORIES_MEDIA.delete(file.key)));
    console.error('Story upload failed', error);
    return json({ error: 'Unable to store the submission.' }, 500);
  }
}

export function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405);
}
