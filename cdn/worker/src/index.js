/* ctm-img — serves the game's pictures (and sounds) from the R2 bucket "ctm-img" (dev/art/CDN.md).
   GET/HEAD /img/<path>, /audio/<path> -> the R2 object with the same key. Read only; uploads go through dev/site/cdn_sync.py.
   - CORS open (Access-Control-Allow-Origin: *) so the PWA's service worker, PIXI and canvas reads can use the pictures.
   - Cache-Control: media 7 days (+30 days stale-while-revalidate); with ?h=<hash> (content-keyed URL) 1 year immutable;
     *.json manifests 60 s so new art shows without rebuilding the game.
   - ETag / If-None-Match -> 304; Range requests (audio) -> 206. */
const TYPES = { webp: "image/webp", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml",
  avif: "image/avif", json: "application/json; charset=utf-8", txt: "text/plain; charset=utf-8", mp3: "audio/mpeg", ogg: "audio/ogg",
  m4a: "audio/mp4", woff2: "font/woff2" };
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Range, If-None-Match, If-Modified-Since, x-ctm-load, Cache-Control",
  "Access-Control-Expose-Headers": "ETag, Content-Length, Content-Range, Accept-Ranges", "Access-Control-Max-Age": "86400",
  "Timing-Allow-Origin": "*" };
function plain(status, text) {
  return new Response(text, { status, headers: { ...CORS, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (req.method !== "GET" && req.method !== "HEAD") return plain(405, "read only");
    let key;
    try { key = decodeURIComponent(u.pathname.slice(1)); } catch (e) { return plain(400, "bad path"); }
    if (key === "") return plain(200, "ctm-img: Cung Tuong Mong pictures. /img/<file>");
    if (!/^(img|audio)\/[^\0]+$/.test(key) || key.includes("..")) return plain(404, "not found");
    const ext = (key.match(/\.([a-z0-9]+)$/i) || [, ""])[1].toLowerCase();
    const json = ext === "json";
    const range = !json && req.headers.get("range");
    let obj;
    try {
      obj = await env.IMG.get(key, range ? { onlyIf: req.headers, range: req.headers } : { onlyIf: req.headers });
    } catch (e) { return plain(503, "storage busy"); }
    if (obj === null) return plain(404, "not found");
    const h = new Headers(CORS);
    obj.writeHttpMetadata(h);
    h.set("Content-Type", TYPES[ext] || h.get("Content-Type") || "application/octet-stream");
    h.set("ETag", obj.httpEtag);
    h.set("Accept-Ranges", "bytes");
    h.set("X-Content-Type-Options", "nosniff");
    h.set("Cache-Control", json ? "public, max-age=60"
      : u.searchParams.has("h") ? "public, max-age=31536000, immutable"
      : "public, max-age=604800, stale-while-revalidate=2592000");
    if (!("body" in obj)) return new Response(null, { status: 304, headers: h }); // If-None-Match matched
    let status = 200;
    if (range && obj.range) {
      const r = obj.range, off = r.suffix != null ? Math.max(0, obj.size - r.suffix) : (r.offset || 0);
      const len = r.suffix != null ? obj.size - off : (r.length != null ? r.length : obj.size - off);
      if (len < obj.size) { status = 206; h.set("Content-Range", `bytes ${off}-${off + len - 1}/${obj.size}`); h.set("Content-Length", String(len)); }
    }
    if (status === 200) h.set("Content-Length", String(obj.size));
    return new Response(req.method === "HEAD" ? null : obj.body, { status, headers: h });
  }
};
