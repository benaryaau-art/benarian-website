// Hotelbeds test integration
const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers }
  });

async function hotelbedsSignature(apiKey, secret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const cleanKey = String(apiKey || "").trim();
  const cleanSecret = String(secret || "").trim();
  const input = new TextEncoder().encode(cleanKey + cleanSecret + timestamp);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return [...new Uint8Array(digest)]
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hotelbedsStatus(env) {
  if (!env.HOTELBEDS_API_KEY || !env.HOTELBEDS_SECRET) {
    return json({ ok: false, supplier: "hotelbeds", error: "credentials_missing" });
  }

  try {
    const response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.0/status", {
      headers: {
        accept: "application/json",
        "Api-key": String(env.HOTELBEDS_API_KEY).trim(),
        "X-Signature": await hotelbedsSignature(env.HOTELBEDS_API_KEY, env.HOTELBEDS_SECRET)
      }
    });

    if (!response.ok) {
      let supplierError = {};
      try {
        const raw = await response.json();
        supplierError = {
          code: String(raw.code || raw.error?.code || "").slice(0, 80),
          message: String(raw.message || raw.error?.message || raw.error || "").slice(0, 180)
        };
      } catch {}
      console.error(JSON.stringify({
        event: "hotelbeds_status_failed",
        status: response.status,
        supplierError
      }));
      return json({
        ok: false,
        supplier: "hotelbeds",
        environment: "test",
        supplierStatus: response.status,
        supplierError
      });
    }

    return json({
      ok: true,
      supplier: "hotelbeds",
      environment: "test",
      checkedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(JSON.stringify({
      event: "hotelbeds_status_error",
      error: String(error && error.message || error)
    }));
    return json({
      ok: false,
      supplier: "hotelbeds",
      environment: "test",
      error: "supplier_unreachable"
    });
  }
}


async function sophiaAdvisor(request, env) {
  const respond=(data,status=200)=>json(data,status,{"cache-control":"no-store"});
  if(request.method==="GET") return respond({service:"Sophia Workers AI",ready:!!env.AI,mode:"cloudflare-free-tier"});
  if(request.method!=="POST")return respond({error:"Method not allowed"},405);
  if(!env.AI)return respond({error:"Cloudflare Workers AI binding AI is missing."},503);
  let payload;
  try{payload=await request.json()}catch{return respond({error:"Invalid JSON"},400)}
  if(!Array.isArray(payload.messages)||payload.messages.length>20)return respond({error:"Invalid messages"},400);
  const messages=payload.messages.filter(m=>m && ["user","assistant"].includes(m.role) && typeof m.content==="string" && m.content.length<=9000).slice(-12);
  if(!messages.length||messages[messages.length-1].role!=="user")return respond({error:"Please enter your question."},400);
  const system="You are Sophia, an AI assistant (not a human) for BENARIAN Hotel College. Respond in the visitor's language, including Persian and English. Help with hotel management, rooms, housekeeping, food and beverage, revenue, ADR, RevPAR, GOP, EBITDA, hospitality operations, career advice, honest ATS-friendly CVs and cover letters, and interview preparation. Ask for missing professional background before personalizing documents. Never fabricate experience, employers, qualifications or results. Do not claim to create downloadable files or send applications if not supported. Avoid requesting confidential identity documents or passwords. Be professional, practical and concise.";
  try {
    const result=await env.AI.run("@cf/meta/llama-3.1-8b-instruct",{messages:[{role:"system",content:system},...messages],max_tokens:900,temperature:0.4});
    if(!result||typeof result.response!=="string"||!result.response.trim())return respond({error:"AI returned an empty answer."},502);
    return respond({answer:result.response});
  }catch(e){
    console.error("Sophia Workers AI failure:",String(e));
    return respond({error:"Workers AI is temporarily unavailable or its free quota is exhausted."},503);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/college-advisor") return sophiaAdvisor(request, env);

    if (request.method === "GET" && url.pathname === "/api/hotelbeds/status") {
      return hotelbedsStatus(env);
    }

    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) return response;

    let html = await response.text();
    html = html.replaceAll("assets/canonical-footer.js?v=20260725a", "assets/canonical-footer.js?v=20261025-hotel-menu");
    const isHome = url.pathname === "/" || url.pathname === "/index.html";
    if (isHome && !html.includes("assets/site-fixes.js")) {
      html = html.replace(
        "</body>",
        '<script src="/assets/site-fixes.js?v=20261025-hotel-analysis"></script></body>'
      );
    }

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=UTF-8");
    headers.set("cache-control", "public, max-age=0, must-revalidate");
    return new Response(html, { status: response.status, headers });
  }
};
