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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/hotelbeds/status") {
      return hotelbedsStatus(env);
    }

    const response = await env.ASSETS.fetch(request);
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) return response;

    let html = await response.text();
    const isHome = url.pathname === "/" || url.pathname === "/index.html";
    if (isHome && !html.includes("assets/site-fixes.js")) {
      html = html.replace(
        "</body>",
        '<script src="/assets/site-fixes.js?v=20260822-deals-quick-ad"></script></body>'
      );
    }

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=UTF-8");
    headers.set("cache-control", "public, max-age=0, must-revalidate");
    return new Response(html, { status: response.status, headers });
  }
};
