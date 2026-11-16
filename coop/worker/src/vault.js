/* Cung Tường Mộng · Sổ mây (cloud save, C44, review/cloud-save). Same Worker as co-op rooms (ctm-coop).
   API (all POST, JSON body, CORS only for the game origin): dev/review/cloud-save-SECURITY.md + dev/PROGRESS_review-cloud-save.md.
     /api/vault/new   {}                         → {k}                  new sync code (8 chars Crockford base32 = 40 bits, server-made)
     /api/vault/head  {k}                        → {rev,at,dev,sum}     404 {error:"nocode"} if the code was never made
     /api/vault/get   {k, rev?}                  → {rev,at,dev,sum,keep,slots,rooms}
     /api/vault/put   {k, base, keep?, b}        → {rev,head}           409 {error:"conflict",rev,at,dev,sum} if base ≠ head (keep=1 never conflicts)
     /api/vault/list  {k}                        → {head, versions:[{rev,at,dev,sum,keep}]}   newest first, max KEEP
     /api/vault/drop  {k}                        → {ok}                 wipes the vault
   Storage: one Durable Object "Vault" per code, named sha256("ctm-vault:"+code): the code itself is never stored.
   The DO is single-threaded and strongly consistent, so the base/head compare-and-set cannot race (KV could).
   GUARD (review/cloud-save-r1): the code is 8 chars (owner design), so guessing is stopped by a per-network miss guard that does not
   depend on the [[ratelimits]] binding: one Vault-class object per IPv4 address / IPv6 /56, named sha256("ctm-guard:"+net), counts
   lookups of codes that do not exist (persisted, survives eviction) and refuses every code lookup from that network once it has
   G.MISS_H misses in the hour or G.MISS_D in the day; it also caps new codes per network. Numbers: dev/review/cloud-save-r1-SECURITY.md. */

export const VAULT = {
  ALPH: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",   // Crockford base32 (no I L O U)
  LEN: 8,                                    // 8 × 5 = 40 bits (owner design "8-char like ám hiệu"); safe only with the GUARD below
  KEEP: 10,                                  // versions kept
  MAX_BODY: 2600000,                         // bytes per request
  MAX_SLOT: 900000,                          // chars per sổ (compressed CTM2 text; a 40-week life ≈ 37 KB)
  CHUNK: 100000,                             // chars per storage value
  WIN: 600000, MAX_PUT: 40, MAX_READ: 200,   // per vault per 10 min
  IDLE_DAYS: 180,
  G: { MISS_H: 10, MISS_D: 30, NEW_H: 10, NEW_D: 30 }   // per IPv4 address / IPv6 /56
};
const ORIGINS = ["https://thientran2711.github.io"];

export function allowedOrigins(env) {
  const s = env && env.VAULT_ORIGINS; if (!s) return ORIGINS;
  return String(s).split(",").map(x => x.trim()).filter(Boolean);
}
function corsFor(req, env) {
  const o = req.headers.get("Origin") || "";
  if (!allowedOrigins(env).includes(o)) return null;
  return { "Access-Control-Allow-Origin": o, "Vary": "Origin", "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type", "Access-Control-Max-Age": "600" };
}
const SEC = { "content-type": "application/json", "cache-control": "no-store", "x-content-type-options": "nosniff" };
const out = (o, s, c) => new Response(JSON.stringify(o), { status: s || 200, headers: { ...SEC, ...(c || {}) } });

export function mkCode() {
  const b = crypto.getRandomValues(new Uint8Array(VAULT.LEN)); let s = "";
  for (const x of b) s += VAULT.ALPH[x & 31];              // 256 % 32 = 0: no bias
  return s;
}
/* typed codes: case, spaces, dashes ignored; O→0, I/L→1 (Crockford) */
export function normCode(k) {
  if (typeof k !== "string" || k.length > 80) return "";
  const s = k.toUpperCase().replace(/[\s-]/g, "").replace(/O/g, "0").replace(/[IL]/g, "1");
  if (s.length !== VAULT.LEN) return "";
  for (const ch of s) if (!VAULT.ALPH.includes(ch)) return "";
  return s;
}
async function sha(t) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return [...new Uint8Array(h)].map(x => x.toString(16).padStart(2, "0")).join("");
}
const nameOf = code => sha("ctm-vault:" + code);
/* network key for the guard: IPv4 as is, IPv6 cut to its /56 (one home / one phone line), "" when unknown (local tests only:
   Cloudflare always sets CF-Connecting-IP) */
export function netKey(ip) {
  ip = String(ip || "").trim().replace(/^::ffff:(?=[0-9.]+$)/i, ""); if (!ip) return "";
  if (!ip.includes(":")) return /^[0-9.]{7,15}$/.test(ip) ? "4:" + ip : "";
  const [a, b] = ip.split("::"); const L = a ? a.split(":") : [], R = b != null ? (b ? b.split(":") : []) : [];
  const full = b != null ? L.concat(Array(Math.max(0, 8 - L.length - R.length)).fill("0"), R) : L;
  if (full.length !== 8 || !full.every(x => /^[0-9a-f]{1,4}$/i.test(x))) return "6:?";
  const w = full.map(x => parseInt(x, 16));
  return "6:" + [w[0], w[1], w[2], w[3] & 0xff00].map(x => x.toString(16)).join(":");
}
async function guard(env, net, g, miss) {
  if (!net) return true;
  try {
    const st = env.VAULT.get(env.VAULT.idFromName(await sha("ctm-guard:" + net)));
    const r = await st.fetch("https://vault/guard", { method: "POST", body: JSON.stringify({ g, miss: !!miss }), headers: { "content-type": "application/json" } });
    return r.status === 200;
  } catch (e) { return false; }                       // fail closed
}
async function readCapped(req, max) {
  const cl = +req.headers.get("content-length");
  if (cl && cl > max) return null;
  if (!req.body) return "";
  const rd = req.body.getReader(); const parts = []; let n = 0;
  for (;;) { const { done, value } = await rd.read(); if (done) break; n += value.length; if (n > max) { try { rd.cancel(); } catch (e) {} return null; } parts.push(value); }
  const all = new Uint8Array(n); let o = 0; for (const p of parts) { all.set(p, o); o += p.length; }
  return new TextDecoder().decode(all);
}

/* ---------- input validation (whitelist rebuild: unknown keys are dropped) ---------- */
const CTRL = /[\u0000-\u001f\u007f<>]/g;
const str = (v, n) => typeof v === "string" ? v.replace(CTRL, "").slice(0, n) : "";
const SLOT_RX = /^CTM[12]:[A-Za-z0-9+/=]+$/;
function sumOne(x) {
  if (!x || typeof x !== "object") return null;
  const a = Number.isInteger(x.a) && x.a >= 0 && x.a <= 200 ? x.a : null;
  return { n: str(x.n, 60), w: str(x.w, 60), a, d: str(x.d, 80) };
}
export function cleanBundle(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return { err: "bad" };
  const slots = {}, sum = {};
  const bs = b.slots && typeof b.slots === "object" ? b.slots : {}, bm = b.sum && typeof b.sum === "object" ? b.sum : {};
  for (const n of ["1", "2", "3"]) {
    const v = bs[n];
    if (v == null) { slots[n] = null; sum[n] = null; continue; }
    if (typeof v !== "string" || v.length > VAULT.MAX_SLOT || !SLOT_RX.test(v)) return { err: "slot" };
    slots[n] = v; sum[n] = sumOne(bm[n]) || { n: "", w: "", a: null, d: "" };
  }
  const rooms = [];
  if (b.rooms != null) {
    if (!Array.isArray(b.rooms) || b.rooms.length > 3) return { err: "rooms" };
    for (const r of b.rooms) {
      if (!r || typeof r !== "object" || typeof r.room !== "string" || !/^[A-Z0-9]{4}$/.test(r.room)) return { err: "rooms" };
      if (r.pid != null && (typeof r.pid !== "string" || !/^[A-Za-z0-9]{8,32}$/.test(r.pid))) return { err: "rooms" };
      rooms.push({ room: r.room, seat: r.seat === "a" || r.seat === "b" ? r.seat : "", pid: r.pid || "", name: str(r.name, 60), who: str(r.who, 60),
        age: Number.isInteger(r.age) && r.age >= 0 && r.age <= 200 ? r.age : null, date: str(r.date, 80), fr: str(r.fr, 80),
        at: Number.isFinite(r.at) && r.at > 0 && r.at < 1e14 ? Math.floor(r.at) : 0 });
    }
  }
  sum.r = rooms.map(r => ({ room: r.room, n: r.name, w: r.who, a: r.age, d: r.date }));
  return { b: { dev: str(b.dev, 24), slots, rooms, sum } };
}

/* ---------- router (called from index.js fetch) ---------- */
export async function vaultRoute(req, env) {
  const u = new URL(req.url); const p = u.pathname.replace(/\/+$/, "");
  if (!p.startsWith("/api/vault")) return null;
  const c = corsFor(req, env);
  if (req.method === "OPTIONS") return c ? new Response(null, { status: 204, headers: c }) : new Response(null, { status: 403 });
  if (!c) return out({ error: "origin" }, 403);
  if (req.method !== "POST") return out({ error: "method" }, 405, c);
  const op = p.slice("/api/vault/".length);
  if (!["new", "head", "get", "put", "list", "drop"].includes(op)) return out({ error: "not found" }, 404, c);
  if (!/^application\/json/i.test(req.headers.get("content-type") || "")) return out({ error: "type" }, 415, c);
  const ip = req.headers.get("CF-Connecting-IP") || "";
  if (env.VAULT_RL && ip) {           // Workers rate-limit binding (wrangler.toml [[ratelimits]]); the IP is only a key, never stored
    try { const r = await env.VAULT_RL.limit({ key: (op === "new" ? "n:" : "a:") + ip }); if (!r.success) return out({ error: "slow" }, 429, c); } catch (e) {}
  }
  const txt = await readCapped(req, VAULT.MAX_BODY);
  if (txt == null) return out({ error: "big" }, 413, c);
  let body; try { body = JSON.parse(txt || "{}"); } catch (e) { return out({ error: "json" }, 400, c); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return out({ error: "json" }, 400, c);
  const net = netKey(ip);
  if (op === "new") {
    if (env.VAULT_NEW_RL && ip) { try { const r = await env.VAULT_NEW_RL.limit({ key: ip }); if (!r.success) return out({ error: "slow" }, 429, c); } catch (e) {} }
    if (!(await guard(env, net, "new"))) return out({ error: "slow" }, 429, c);
    for (let i = 0; i < 4; i++) {
      const k = mkCode(); const stub = env.VAULT.get(env.VAULT.idFromName(await nameOf(k)));
      const r = await stub.fetch("https://vault/init", { method: "POST" });
      if (r.status === 200) return out({ k }, 200, c);
    }
    return out({ error: "busy" }, 503, c);
  }
  const k = normCode(body.k); if (!k) return out({ error: "nocode" }, 404, c);
  const fwd = { op };
  if (op === "get") { if (body.rev != null) { if (!Number.isInteger(body.rev) || body.rev < 1) return out({ error: "rev" }, 400, c); fwd.rev = body.rev; } }
  if (op === "put") {
    if (!Number.isInteger(body.base) || body.base < 0) return out({ error: "base" }, 400, c);
    const cb = cleanBundle(body.b); if (cb.err) return out({ error: cb.err }, 400, c);
    fwd.base = body.base; fwd.keep = body.keep ? 1 : 0; fwd.b = cb.b;
  }
  if (!(await guard(env, net, "try"))) return out({ error: "slow" }, 429, c);
  let r, miss = false;
  try {
    const stub = env.VAULT.get(env.VAULT.idFromName(await nameOf(k)));
    r = await stub.fetch("https://vault/op", { method: "POST", body: JSON.stringify(fwd), headers: { "content-type": "application/json" } });
    if (r.status === 404) miss = (await r.clone().json().catch(() => ({}))).error === "nocode";
  } finally { await guard(env, net, "done", miss); }
  return new Response(r.body, { status: r.status, headers: { ...SEC, ...c } });
}

/* ---------- Durable Object: one sổ mây ---------- */
export class Vault {
  constructor(state, env) { this.ctx = state; this.env = env; this.rl = { w: 0, put: 0, read: 0 }; this.g = null; this.fly = 0; }
  /* guard object (named from a network, never from a code): {g:"try"} reserves one lookup, {g:"done",miss} settles it,
     {g:"new"} counts one new code. The in-flight count closes the race of many parallel guesses. */
  async guardOp(q) {
    const G = VAULT.G, now = Date.now(), H = 3600000, D = 86400000;
    if (!this.g) this.g = (await this.ctx.storage.get("g")) || { h: 0, hm: 0, hn: 0, d: 0, dm: 0, dn: 0 };
    const g = this.g; if (now - g.h >= H) { g.h = now; g.hm = 0; g.hn = 0; } if (now - g.d >= D) { g.d = now; g.dm = 0; g.dn = 0; }
    const save = async () => { g.at = now; await this.ctx.storage.put("g", g); try { if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(now + 2 * D); } catch (e) {} };
    const no = () => new Response("no", { status: 429 }), yes = () => new Response("ok");
    if (q.g === "try") { if (g.hm + this.fly >= G.MISS_H || g.dm + this.fly >= G.MISS_D) return no(); this.fly++; return yes(); }
    if (q.g === "done") { this.fly = Math.max(0, this.fly - 1); if (q.miss) { g.hm++; g.dm++; await save(); } return yes(); }
    if (q.g === "new") { if (g.hn >= G.NEW_H || g.dn >= G.NEW_D) return no(); g.hn++; g.dn++; await save(); return yes(); }
    return new Response("op", { status: 400 });
  }
  async meta() { return (await this.ctx.storage.get("meta")) || null; }
  async put(m) { await this.ctx.storage.put("meta", m); }
  async readV(e) {
    const keys = []; for (let i = 0; i < e.n; i++) keys.push("v:" + e.rev + ":" + i);
    const got = await this.ctx.storage.get(keys); let s = ""; for (const k of keys) s += got.get(k) || "";
    return JSON.parse(s);
  }
  async writeV(rev, obj) {
    const s = JSON.stringify(obj); const put = {}; let n = 0;
    for (let i = 0; i < s.length; i += VAULT.CHUNK) put["v:" + rev + ":" + (n++)] = s.slice(i, i + VAULT.CHUNK);
    const ks = Object.keys(put);
    for (let i = 0; i < ks.length; i += 100) { const part = {}; ks.slice(i, i + 100).forEach(k => part[k] = put[k]); await this.ctx.storage.put(part); }
    return n;
  }
  async dropV(e) { const keys = []; for (let i = 0; i < e.n; i++) keys.push("v:" + e.rev + ":" + i); if (keys.length) await this.ctx.storage.delete(keys); }
  limit(kind) {
    const now = Date.now(); if (now - this.rl.w > VAULT.WIN) this.rl = { w: now, put: 0, read: 0 };
    this.rl[kind]++; return this.rl[kind] > (kind === "put" ? VAULT.MAX_PUT : VAULT.MAX_READ);
  }
  async fetch(req) {
    const u = new URL(req.url); const J = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { "content-type": "application/json" } });
    if (u.pathname === "/guard") return this.guardOp(await req.json());
    if (u.pathname === "/init") {
      if (await this.meta()) return new Response("taken", { status: 409 });
      const now = Date.now(); await this.put({ created: now, seen: now, head: 0, next: 1, idx: [] });
      try { await this.ctx.storage.setAlarm(now + 86400000 * 30); } catch (e) {}
      return new Response("ok");
    }
    const q = await req.json(); const m = await this.meta();
    if (!m) return J({ error: "nocode" }, 404);
    const now = Date.now();
    if (this.limit(q.op === "put" ? "put" : "read")) return J({ error: "slow" }, 429);
    const pub = e => e ? { rev: e.rev, at: e.at, dev: e.dev, sum: e.sum, keep: e.keep ? 1 : 0 } : { rev: 0, at: 0, dev: "", sum: null, keep: 0 };
    const headE = () => m.idx.find(e => e.rev === m.head) || null;
    let dirty = false; if (now - (m.seen || 0) > 86400000) { m.seen = now; dirty = true; }
    try {
      if (q.op === "head") return J(pub(headE()));
      if (q.op === "list") return J({ head: m.head, versions: m.idx.slice().sort((a, b) => b.rev - a.rev).map(pub) });
      if (q.op === "get") {
        const e = q.rev ? m.idx.find(x => x.rev === q.rev) : headE();
        if (!e) return J({ error: "norev" }, 404);
        const v = await this.readV(e); return J({ ...pub(e), slots: v.slots, rooms: v.rooms });
      }
      if (q.op === "drop") { await this.ctx.storage.deleteAll(); dirty = false; return J({ ok: true }); }
      if (q.op === "put") {
        if (!q.keep && q.base !== m.head) return J({ error: "conflict", ...pub(headE()) }, 409);
        const rev = m.next++; const n = await this.writeV(rev, { slots: q.b.slots, rooms: q.b.rooms });
        m.idx.push({ rev, at: now, dev: q.b.dev, sum: q.b.sum, keep: q.keep ? 1 : 0, n });
        if (!q.keep) m.head = rev;
        /* keep the newest KEEP versions; the head is never dropped */
        const order = m.idx.slice().sort((a, b) => b.rev - a.rev); const keepSet = new Set(order.slice(0, VAULT.KEEP).map(e => e.rev)); keepSet.add(m.head);
        while (keepSet.size > VAULT.KEEP) { const old = order.filter(e => keepSet.has(e.rev) && e.rev !== m.head).pop(); keepSet.delete(old.rev); }
        for (const e of m.idx) if (!keepSet.has(e.rev)) await this.dropV(e);
        m.idx = m.idx.filter(e => keepSet.has(e.rev)); m.seen = now; dirty = true;
        return J({ rev, head: m.head });
      }
      return J({ error: "op" }, 400);
    } finally { if (dirty) await this.put(m); }
  }
  async alarm() {
    const m = await this.meta();
    if (!m) { const g = await this.ctx.storage.get("g"); if (g && Date.now() - (g.at || 0) > 2 * 86400000) await this.ctx.storage.deleteAll(); else if (g) await this.ctx.storage.setAlarm(Date.now() + 2 * 86400000); return; }
    if (Date.now() - (m.seen || m.created) > VAULT.IDLE_DAYS * 86400000) { await this.ctx.storage.deleteAll(); return; }
    await this.ctx.storage.setAlarm(Date.now() + 86400000 * 30);
  }
}
