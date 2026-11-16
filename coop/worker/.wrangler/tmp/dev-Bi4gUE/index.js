var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/merge.js
var isObj = /* @__PURE__ */ __name((x) => x !== null && typeof x === "object" && !Array.isArray(x), "isObj");
var isNum = /* @__PURE__ */ __name((x) => typeof x === "number" && isFinite(x), "isNum");
function eq(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false;
    return true;
  }
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k) || !eq(a[k], b[k])) return false;
  }
  return true;
}
__name(eq, "eq");
var NOADD = /* @__PURE__ */ new Set([
  "mood",
  "rank",
  "buoi",
  "tuan",
  "month",
  "year",
  "turn",
  "age",
  "era",
  "face",
  "hue",
  "fid",
  "fc",
  "fk",
  "id",
  "sid",
  "rid",
  "week",
  "life",
  "step",
  "done",
  "pal",
  "used",
  "lastPromo",
  "vacSince",
  "pregWk",
  "preg",
  "srk",
  "pid",
  "v",
  "seatBan",
  "until",
  "at",
  "wx"
]);
var idArr = /* @__PURE__ */ __name((x) => Array.isArray(x) && x.length > 0 && x.every((e) => isObj(e) && e.id != null), "idArr");
function m3(base, a, b, inP, key) {
  if (eq(a, b)) return a;
  if (eq(a, base)) return b;
  if (eq(b, base)) return a;
  if (isNum(a) && isNum(b)) {
    if (!isNum(base) || NOADD.has(key)) return a;
    const r = a + (b - base);
    return Number.isInteger(a) && Number.isInteger(b) ? Math.round(r) : r;
  }
  if (isObj(a) && isObj(b)) {
    const bs = isObj(base) ? base : {};
    const out2 = {};
    const keys = /* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const v = m3(bs[k], a[k], b[k], inP || k === "P", k);
      if (v !== void 0) out2[k] = v;
    }
    return out2;
  }
  if ((idArr(a) || Array.isArray(a) && !a.length) && (idArr(b) || Array.isArray(b) && !b.length) && (idArr(a) || idArr(b))) {
    const bm = new Map((Array.isArray(base) ? base : []).filter(isObj).map((e) => [String(e.id), e]));
    const bmA = new Map(a.map((e) => [String(e.id), e])), bmB = new Map(b.map((e) => [String(e.id), e]));
    const out2 = [];
    for (const e of a) {
      const id = String(e.id);
      if (bmB.has(id)) out2.push(m3(bm.get(id), e, bmB.get(id), inP, key));
      else if (bm.has(id)) {
        if (!eq(bm.get(id), e)) out2.push(e);
      } else out2.push(e);
    }
    for (const e of b) {
      const id = String(e.id);
      if (bmA.has(id)) continue;
      if (bm.has(id)) {
        if (!eq(bm.get(id), e)) out2.push(e);
        continue;
      }
      if (inP) out2.push(e);
    }
    return out2;
  }
  return a;
}
__name(m3, "m3");
function merge3(base, A, B) {
  return m3(base, A, B, false);
}
__name(merge3, "merge3");

// src/vault.js
var VAULT = {
  ALPH: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
  // Crockford base32 (no I L O U)
  LEN: 8,
  // 8 × 5 = 40 bits (owner design "8-char like ám hiệu"); safe only with the GUARD below
  KEEP: 10,
  // versions kept
  MAX_BODY: 26e5,
  // bytes per request
  MAX_SLOT: 9e5,
  // chars per sổ (compressed CTM2 text; a 40-week life ≈ 37 KB)
  CHUNK: 1e5,
  // chars per storage value
  WIN: 6e5,
  MAX_PUT: 40,
  MAX_READ: 200,
  // per vault per 10 min
  IDLE_DAYS: 180,
  G: { MISS_H: 10, MISS_D: 30, NEW_H: 10, NEW_D: 30 }
  // per IPv4 address / IPv6 /56
};
var ORIGINS = ["https://thientran2711.github.io"];
function allowedOrigins(env) {
  const s = env && env.VAULT_ORIGINS;
  if (!s) return ORIGINS;
  return String(s).split(",").map((x) => x.trim()).filter(Boolean);
}
__name(allowedOrigins, "allowedOrigins");
function corsFor(req, env) {
  const o = req.headers.get("Origin") || "";
  if (!allowedOrigins(env).includes(o)) return null;
  return {
    "Access-Control-Allow-Origin": o,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "600"
  };
}
__name(corsFor, "corsFor");
var SEC = { "content-type": "application/json", "cache-control": "no-store", "x-content-type-options": "nosniff" };
var out = /* @__PURE__ */ __name((o, s, c) => new Response(JSON.stringify(o), { status: s || 200, headers: { ...SEC, ...c || {} } }), "out");
function mkCode() {
  const b = crypto.getRandomValues(new Uint8Array(VAULT.LEN));
  let s = "";
  for (const x of b) s += VAULT.ALPH[x & 31];
  return s;
}
__name(mkCode, "mkCode");
function normCode(k) {
  if (typeof k !== "string" || k.length > 80) return "";
  const s = k.toUpperCase().replace(/[\s-]/g, "").replace(/O/g, "0").replace(/[IL]/g, "1");
  if (s.length !== VAULT.LEN) return "";
  for (const ch of s) if (!VAULT.ALPH.includes(ch)) return "";
  return s;
}
__name(normCode, "normCode");
async function sha(t) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
__name(sha, "sha");
var nameOf = /* @__PURE__ */ __name((code) => sha("ctm-vault:" + code), "nameOf");
function netKey(ip) {
  ip = String(ip || "").trim().replace(/^::ffff:(?=[0-9.]+$)/i, "");
  if (!ip) return "";
  if (!ip.includes(":")) return /^[0-9.]{7,15}$/.test(ip) ? "4:" + ip : "";
  const [a, b] = ip.split("::");
  const L = a ? a.split(":") : [], R = b != null ? b ? b.split(":") : [] : [];
  const full = b != null ? L.concat(Array(Math.max(0, 8 - L.length - R.length)).fill("0"), R) : L;
  if (full.length !== 8 || !full.every((x) => /^[0-9a-f]{1,4}$/i.test(x))) return "6:?";
  const w = full.map((x) => parseInt(x, 16));
  return "6:" + [w[0], w[1], w[2], w[3] & 65280].map((x) => x.toString(16)).join(":");
}
__name(netKey, "netKey");
async function guard(env, net, g, miss) {
  if (!net) return true;
  try {
    const st = env.VAULT.get(env.VAULT.idFromName(await sha("ctm-guard:" + net)));
    const r = await st.fetch("https://vault/guard", { method: "POST", body: JSON.stringify({ g, miss: !!miss }), headers: { "content-type": "application/json" } });
    return r.status === 200;
  } catch (e) {
    return false;
  }
}
__name(guard, "guard");
async function readCapped(req, max) {
  const cl = +req.headers.get("content-length");
  if (cl && cl > max) return null;
  if (!req.body) return "";
  const rd = req.body.getReader();
  const parts = [];
  let n = 0;
  for (; ; ) {
    const { done, value } = await rd.read();
    if (done) break;
    n += value.length;
    if (n > max) {
      try {
        rd.cancel();
      } catch (e) {
      }
      return null;
    }
    parts.push(value);
  }
  const all = new Uint8Array(n);
  let o = 0;
  for (const p of parts) {
    all.set(p, o);
    o += p.length;
  }
  return new TextDecoder().decode(all);
}
__name(readCapped, "readCapped");
var CTRL = /[\u0000-\u001f\u007f<>]/g;
var str = /* @__PURE__ */ __name((v, n) => typeof v === "string" ? v.replace(CTRL, "").slice(0, n) : "", "str");
var SLOT_RX = /^CTM[12]:[A-Za-z0-9+/=]+$/;
function sumOne(x) {
  if (!x || typeof x !== "object") return null;
  const a = Number.isInteger(x.a) && x.a >= 0 && x.a <= 200 ? x.a : null;
  return { n: str(x.n, 60), w: str(x.w, 60), a, d: str(x.d, 80) };
}
__name(sumOne, "sumOne");
function cleanBundle(b) {
  if (!b || typeof b !== "object" || Array.isArray(b)) return { err: "bad" };
  const slots = {}, sum = {};
  const bs = b.slots && typeof b.slots === "object" ? b.slots : {}, bm = b.sum && typeof b.sum === "object" ? b.sum : {};
  for (const n of ["1", "2", "3"]) {
    const v = bs[n];
    if (v == null) {
      slots[n] = null;
      sum[n] = null;
      continue;
    }
    if (typeof v !== "string" || v.length > VAULT.MAX_SLOT || !SLOT_RX.test(v)) return { err: "slot" };
    slots[n] = v;
    sum[n] = sumOne(bm[n]) || { n: "", w: "", a: null, d: "" };
  }
  const rooms = [];
  if (b.rooms != null) {
    if (!Array.isArray(b.rooms) || b.rooms.length > 3) return { err: "rooms" };
    for (const r of b.rooms) {
      if (!r || typeof r !== "object" || typeof r.room !== "string" || !/^[A-Z0-9]{4}$/.test(r.room)) return { err: "rooms" };
      if (r.pid != null && (typeof r.pid !== "string" || !/^[A-Za-z0-9]{8,32}$/.test(r.pid))) return { err: "rooms" };
      rooms.push({
        room: r.room,
        seat: r.seat === "a" || r.seat === "b" ? r.seat : "",
        pid: r.pid || "",
        name: str(r.name, 60),
        who: str(r.who, 60),
        age: Number.isInteger(r.age) && r.age >= 0 && r.age <= 200 ? r.age : null,
        date: str(r.date, 80),
        fr: str(r.fr, 80),
        at: Number.isFinite(r.at) && r.at > 0 && r.at < 1e14 ? Math.floor(r.at) : 0
      });
    }
  }
  sum.r = rooms.map((r) => ({ room: r.room, n: r.name, w: r.who, a: r.age, d: r.date }));
  return { b: { dev: str(b.dev, 24), slots, rooms, sum } };
}
__name(cleanBundle, "cleanBundle");
async function vaultRoute(req, env) {
  const u = new URL(req.url);
  const p = u.pathname.replace(/\/+$/, "");
  if (!p.startsWith("/api/vault")) return null;
  const c = corsFor(req, env);
  if (req.method === "OPTIONS") return c ? new Response(null, { status: 204, headers: c }) : new Response(null, { status: 403 });
  if (!c) return out({ error: "origin" }, 403);
  if (req.method !== "POST") return out({ error: "method" }, 405, c);
  const op = p.slice("/api/vault/".length);
  if (!["new", "head", "get", "put", "list", "drop"].includes(op)) return out({ error: "not found" }, 404, c);
  if (!/^application\/json/i.test(req.headers.get("content-type") || "")) return out({ error: "type" }, 415, c);
  const ip = req.headers.get("CF-Connecting-IP") || "";
  if (env.VAULT_RL && ip) {
    try {
      const r2 = await env.VAULT_RL.limit({ key: (op === "new" ? "n:" : "a:") + ip });
      if (!r2.success) return out({ error: "slow" }, 429, c);
    } catch (e) {
    }
  }
  const txt = await readCapped(req, VAULT.MAX_BODY);
  if (txt == null) return out({ error: "big" }, 413, c);
  let body;
  try {
    body = JSON.parse(txt || "{}");
  } catch (e) {
    return out({ error: "json" }, 400, c);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return out({ error: "json" }, 400, c);
  const net = netKey(ip);
  if (op === "new") {
    if (env.VAULT_NEW_RL && ip) {
      try {
        const r2 = await env.VAULT_NEW_RL.limit({ key: ip });
        if (!r2.success) return out({ error: "slow" }, 429, c);
      } catch (e) {
      }
    }
    if (!await guard(env, net, "new")) return out({ error: "slow" }, 429, c);
    for (let i = 0; i < 4; i++) {
      const k2 = mkCode();
      const stub = env.VAULT.get(env.VAULT.idFromName(await nameOf(k2)));
      const r2 = await stub.fetch("https://vault/init", { method: "POST" });
      if (r2.status === 200) return out({ k: k2 }, 200, c);
    }
    return out({ error: "busy" }, 503, c);
  }
  const k = normCode(body.k);
  if (!k) return out({ error: "nocode" }, 404, c);
  const fwd = { op };
  if (op === "get") {
    if (body.rev != null) {
      if (!Number.isInteger(body.rev) || body.rev < 1) return out({ error: "rev" }, 400, c);
      fwd.rev = body.rev;
    }
  }
  if (op === "put") {
    if (!Number.isInteger(body.base) || body.base < 0) return out({ error: "base" }, 400, c);
    const cb = cleanBundle(body.b);
    if (cb.err) return out({ error: cb.err }, 400, c);
    fwd.base = body.base;
    fwd.keep = body.keep ? 1 : 0;
    fwd.b = cb.b;
  }
  if (!await guard(env, net, "try")) return out({ error: "slow" }, 429, c);
  let r, miss = false;
  try {
    const stub = env.VAULT.get(env.VAULT.idFromName(await nameOf(k)));
    r = await stub.fetch("https://vault/op", { method: "POST", body: JSON.stringify(fwd), headers: { "content-type": "application/json" } });
    if (r.status === 404) miss = (await r.clone().json().catch(() => ({}))).error === "nocode";
  } finally {
    await guard(env, net, "done", miss);
  }
  return new Response(r.body, { status: r.status, headers: { ...SEC, ...c } });
}
__name(vaultRoute, "vaultRoute");
var Vault = class {
  static {
    __name(this, "Vault");
  }
  constructor(state, env) {
    this.ctx = state;
    this.env = env;
    this.rl = { w: 0, put: 0, read: 0 };
    this.g = null;
    this.fly = 0;
  }
  /* guard object (named from a network, never from a code): {g:"try"} reserves one lookup, {g:"done",miss} settles it,
     {g:"new"} counts one new code. The in-flight count closes the race of many parallel guesses. */
  async guardOp(q) {
    const G = VAULT.G, now = Date.now(), H = 36e5, D = 864e5;
    if (!this.g) this.g = await this.ctx.storage.get("g") || { h: 0, hm: 0, hn: 0, d: 0, dm: 0, dn: 0 };
    const g = this.g;
    if (now - g.h >= H) {
      g.h = now;
      g.hm = 0;
      g.hn = 0;
    }
    if (now - g.d >= D) {
      g.d = now;
      g.dm = 0;
      g.dn = 0;
    }
    const save = /* @__PURE__ */ __name(async () => {
      g.at = now;
      await this.ctx.storage.put("g", g);
      try {
        if (!await this.ctx.storage.getAlarm()) await this.ctx.storage.setAlarm(now + 2 * D);
      } catch (e) {
      }
    }, "save");
    const no = /* @__PURE__ */ __name(() => new Response("no", { status: 429 }), "no"), yes = /* @__PURE__ */ __name(() => new Response("ok"), "yes");
    if (q.g === "try") {
      if (g.hm + this.fly >= G.MISS_H || g.dm + this.fly >= G.MISS_D) return no();
      this.fly++;
      return yes();
    }
    if (q.g === "done") {
      this.fly = Math.max(0, this.fly - 1);
      if (q.miss) {
        g.hm++;
        g.dm++;
        await save();
      }
      return yes();
    }
    if (q.g === "new") {
      if (g.hn >= G.NEW_H || g.dn >= G.NEW_D) return no();
      g.hn++;
      g.dn++;
      await save();
      return yes();
    }
    return new Response("op", { status: 400 });
  }
  async meta() {
    return await this.ctx.storage.get("meta") || null;
  }
  async put(m) {
    await this.ctx.storage.put("meta", m);
  }
  async readV(e) {
    const keys = [];
    for (let i = 0; i < e.n; i++) keys.push("v:" + e.rev + ":" + i);
    const got = await this.ctx.storage.get(keys);
    let s = "";
    for (const k of keys) s += got.get(k) || "";
    return JSON.parse(s);
  }
  async writeV(rev, obj) {
    const s = JSON.stringify(obj);
    const put = {};
    let n = 0;
    for (let i = 0; i < s.length; i += VAULT.CHUNK) put["v:" + rev + ":" + n++] = s.slice(i, i + VAULT.CHUNK);
    const ks = Object.keys(put);
    for (let i = 0; i < ks.length; i += 100) {
      const part = {};
      ks.slice(i, i + 100).forEach((k) => part[k] = put[k]);
      await this.ctx.storage.put(part);
    }
    return n;
  }
  async dropV(e) {
    const keys = [];
    for (let i = 0; i < e.n; i++) keys.push("v:" + e.rev + ":" + i);
    if (keys.length) await this.ctx.storage.delete(keys);
  }
  limit(kind) {
    const now = Date.now();
    if (now - this.rl.w > VAULT.WIN) this.rl = { w: now, put: 0, read: 0 };
    this.rl[kind]++;
    return this.rl[kind] > (kind === "put" ? VAULT.MAX_PUT : VAULT.MAX_READ);
  }
  async fetch(req) {
    const u = new URL(req.url);
    const J = /* @__PURE__ */ __name((o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { "content-type": "application/json" } }), "J");
    if (u.pathname === "/guard") return this.guardOp(await req.json());
    if (u.pathname === "/init") {
      if (await this.meta()) return new Response("taken", { status: 409 });
      const now2 = Date.now();
      await this.put({ created: now2, seen: now2, head: 0, next: 1, idx: [] });
      try {
        await this.ctx.storage.setAlarm(now2 + 864e5 * 30);
      } catch (e) {
      }
      return new Response("ok");
    }
    const q = await req.json();
    const m = await this.meta();
    if (!m) return J({ error: "nocode" }, 404);
    const now = Date.now();
    if (this.limit(q.op === "put" ? "put" : "read")) return J({ error: "slow" }, 429);
    const pub = /* @__PURE__ */ __name((e) => e ? { rev: e.rev, at: e.at, dev: e.dev, sum: e.sum, keep: e.keep ? 1 : 0 } : { rev: 0, at: 0, dev: "", sum: null, keep: 0 }, "pub");
    const headE = /* @__PURE__ */ __name(() => m.idx.find((e) => e.rev === m.head) || null, "headE");
    let dirty = false;
    if (now - (m.seen || 0) > 864e5) {
      m.seen = now;
      dirty = true;
    }
    try {
      if (q.op === "head") return J(pub(headE()));
      if (q.op === "list") return J({ head: m.head, versions: m.idx.slice().sort((a, b) => b.rev - a.rev).map(pub) });
      if (q.op === "get") {
        const e = q.rev ? m.idx.find((x) => x.rev === q.rev) : headE();
        if (!e) return J({ error: "norev" }, 404);
        const v = await this.readV(e);
        return J({ ...pub(e), slots: v.slots, rooms: v.rooms });
      }
      if (q.op === "drop") {
        await this.ctx.storage.deleteAll();
        dirty = false;
        return J({ ok: true });
      }
      if (q.op === "put") {
        if (!q.keep && q.base !== m.head) return J({ error: "conflict", ...pub(headE()) }, 409);
        const rev = m.next++;
        const n = await this.writeV(rev, { slots: q.b.slots, rooms: q.b.rooms });
        m.idx.push({ rev, at: now, dev: q.b.dev, sum: q.b.sum, keep: q.keep ? 1 : 0, n });
        if (!q.keep) m.head = rev;
        const order = m.idx.slice().sort((a, b) => b.rev - a.rev);
        const keepSet = new Set(order.slice(0, VAULT.KEEP).map((e) => e.rev));
        keepSet.add(m.head);
        while (keepSet.size > VAULT.KEEP) {
          const old = order.filter((e) => keepSet.has(e.rev) && e.rev !== m.head).pop();
          keepSet.delete(old.rev);
        }
        for (const e of m.idx) if (!keepSet.has(e.rev)) await this.dropV(e);
        m.idx = m.idx.filter((e) => keepSet.has(e.rev));
        m.seen = now;
        dirty = true;
        return J({ rev, head: m.head });
      }
      return J({ error: "op" }, 400);
    } finally {
      if (dirty) await this.put(m);
    }
  }
  async alarm() {
    const m = await this.meta();
    if (!m) {
      const g = await this.ctx.storage.get("g");
      if (g && Date.now() - (g.at || 0) > 2 * 864e5) await this.ctx.storage.deleteAll();
      else if (g) await this.ctx.storage.setAlarm(Date.now() + 2 * 864e5);
      return;
    }
    if (Date.now() - (m.seen || m.created) > VAULT.IDLE_DAYS * 864e5) {
      await this.ctx.storage.deleteAll();
      return;
    }
    await this.ctx.storage.setAlarm(Date.now() + 864e5 * 30);
  }
};

// src/index.js
var V = "coop-2";
var CHAT_MAX = 50;
var CHAT_LEN = 300;
var CHAT_NAME = 24;
var CHAT_FRAME = 2400;
var CHAT_GAP = 350;
var ALPH = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
var CHUNK = 4e4;
var BIG = 2e5;
var STALE = 45e3;
var IDLE_DAYS = 30;
var SEATMAX = 3e6;
var CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "content-type" };
var json = /* @__PURE__ */ __name((o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", ...CORS } }), "json");
var mkCode2 = /* @__PURE__ */ __name(() => {
  let s = "";
  const b = crypto.getRandomValues(new Uint8Array(4));
  for (const x of b) s += ALPH[x % ALPH.length];
  return s;
}, "mkCode");
var okCode = /* @__PURE__ */ __name((c) => typeof c === "string" && c.length === 4 && [...c].every((ch) => ALPH.includes(ch)), "okCode");
var src_default = {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (u.pathname.startsWith("/api/vault")) return vaultRoute(req, env);
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const p = u.pathname.replace(/\/+$/, "");
    if (p === "/api/health" || p === "" || p === "/") return json({ ok: true, v: V });
    if (p === "/api/room" && req.method === "POST") {
      for (let i = 0; i < 12; i++) {
        const code = mkCode2();
        const stub = env.ROOM.get(env.ROOM.idFromName(code));
        const r = await stub.fetch("https://do/create?code=" + code, { method: "POST" });
        if (r.status === 200) return json({ code });
      }
      return json({ error: "busy" }, 503);
    }
    const m = p.match(/^\/api\/room\/([A-Za-z0-9]{4})(\/ws)?$/);
    if (m) {
      const code = m[1].toUpperCase();
      if (!okCode(code)) return json({ exists: false }, 404);
      const stub = env.ROOM.get(env.ROOM.idFromName(code));
      if (m[2]) {
        if (req.headers.get("Upgrade") !== "websocket") return json({ error: "need websocket" }, 426);
        const q = new URL(req.url);
        q.hostname = "do";
        q.pathname = "/ws";
        q.searchParams.set("code", code);
        return stub.fetch(new Request(q.toString(), req));
      }
      const r = await stub.fetch("https://do/info");
      return new Response(r.body, { status: r.status, headers: { "content-type": "application/json", ...CORS } });
    }
    return json({ error: "not found" }, 404);
  }
};
async function gzipText(s) {
  const cs = new CompressionStream("gzip");
  const w = cs.writable.getWriter();
  w.write(new TextEncoder().encode(s));
  w.close();
  return new Uint8Array(await new Response(cs.readable).arrayBuffer());
}
__name(gzipText, "gzipText");
async function gunzipText(buf) {
  const ds = new DecompressionStream("gzip");
  const w = ds.writable.getWriter();
  w.write(new Uint8Array(buf));
  w.close();
  return await new Response(ds.readable).text();
}
__name(gunzipText, "gunzipText");
var Room = class {
  static {
    __name(this, "Room");
  }
  constructor(state, env) {
    this.ctx = state;
    this.env = env;
    this.meta = null;
    this.C = void 0;
    try {
      this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('{"t":"ping"}', '{"t":"pong"}'));
    } catch (e) {
    }
  }
  async loadMeta() {
    if (!this.meta) this.meta = await this.ctx.storage.get("meta") || null;
    return this.meta;
  }
  async saveMeta() {
    this.meta.at = Date.now();
    await this.ctx.storage.put("meta", this.meta);
  }
  async loadC() {
    if (this.C !== void 0) return this.C;
    const n = await this.ctx.storage.get("sn") || 0;
    if (!n) {
      this.C = null;
      return null;
    }
    const keys = [];
    for (let i = 0; i < n; i++) keys.push("s:" + i);
    const got = await this.ctx.storage.get(keys);
    let s = "";
    for (const k of keys) s += got.get(k) || "";
    try {
      this.C = JSON.parse(s);
    } catch (e) {
      this.C = null;
    }
    return this.C;
  }
  async saveC(C) {
    this.C = C;
    const s = JSON.stringify(C);
    const old = await this.ctx.storage.get("sn") || 0;
    const put = {};
    let n = 0;
    for (let i = 0; i < s.length; i += CHUNK) put["s:" + n++] = s.slice(i, i + CHUNK);
    put.sn = n;
    const keys = Object.keys(put);
    for (let i = 0; i < keys.length; i += 120) {
      const part = {};
      keys.slice(i, i + 120).forEach((k) => part[k] = put[k]);
      await this.ctx.storage.put(part);
    }
    const del = [];
    for (let i = n; i < old; i++) del.push("s:" + i);
    if (del.length) await this.ctx.storage.delete(del);
    if (s.length > 8e6) return false;
    return true;
  }
  socks(seat) {
    return this.ctx.getWebSockets(seat ? "seat-" + seat : void 0);
  }
  online(seat) {
    return this.socks(seat).length > 0;
  }
  seatsView() {
    const m = this.meta, o = {};
    for (const x of ["a", "b"]) {
      const s = m.seats[x];
      o[x] = s ? { name: s.name || "", online: this.online(x) } : null;
    }
    return o;
  }
  async send(ws, obj) {
    const s = JSON.stringify(obj);
    try {
      if (s.length > BIG) ws.send(await gzipText(s));
      else ws.send(s);
    } catch (e) {
    }
  }
  async bcast(obj, exceptWs) {
    const s = JSON.stringify(obj);
    let z = null;
    if (s.length > BIG) z = await gzipText(s);
    for (const ws of this.socks()) {
      if (ws === exceptWs) continue;
      try {
        ws.send(z || s);
      } catch (e) {
      }
    }
  }
  async presence() {
    await this.bcast({ t: "presence", seats: this.seatsView(), ended: this.endedView(), week: this.meta.week, buoi: this.meta.buoi || 0, bended: this.bendedView() });
  }
  bendedView() {
    const e = this.meta.bended || {};
    return { a: !!e.a, b: !!e.b };
  }
  buoiView() {
    const m = this.meta;
    return { buoi: m.buoi || 0, bended: this.bendedView(), where: m.where || null, pos: m.pos || {} };
  }
  endedView() {
    const e = this.meta.ended || {};
    return { a: !!e.a, b: !!e.b };
  }
  async fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === "/create") {
      if (await this.loadMeta()) return new Response("taken", { status: 409 });
      this.meta = { code: u.searchParams.get("code"), seats: { a: null, b: null }, week: 0, ended: {}, created: Date.now() };
      await this.saveMeta();
      await this.ctx.storage.setAlarm(Date.now() + 864e5);
      return new Response("ok");
    }
    const m = await this.loadMeta();
    if (u.pathname === "/info") {
      if (!m) return new Response(JSON.stringify({ exists: false }), { status: 404 });
      return new Response(JSON.stringify({ code: m.code, exists: true, seats: this.seatsView(), week: m.week, hasState: !!await this.ctx.storage.get("sn") }));
    }
    if (u.pathname === "/ws") {
      const pid = (u.searchParams.get("pid") || "").slice(0, 64), name = (u.searchParams.get("name") || "").slice(0, 40);
      const fail = /* @__PURE__ */ __name(async (code, msg) => {
        const [c, sv] = Object.values(new WebSocketPair());
        this.ctx.acceptWebSocket(sv, ["dead"]);
        await this.send(sv, { t: "error", code, msg });
        try {
          sv.close(4e3, code);
        } catch (e) {
        }
        return new Response(null, { status: 101, webSocket: c });
      }, "fail");
      if (!m) return fail("noroom", "Kh\xF4ng c\xF3 ph\xF2ng n\xE0y");
      if (!pid) return fail("nopid", "thi\u1EBFu pid");
      let seat = null;
      for (const x of ["a", "b"]) if (m.seats[x] && m.seats[x].pid === pid) seat = x;
      if (!seat) {
        if (!m.seats.a) seat = "a";
        else if (!m.seats.b) seat = "b";
      }
      if (!seat) return fail("full", "Ph\xF2ng \u0111\xE3 \u0111\u1EE7 hai ng\u01B0\u1EDDi");
      if (!m.seats[seat]) m.seats[seat] = { pid, name };
      if (name) m.seats[seat].name = name;
      await this.saveMeta();
      for (const old of this.socks(seat)) {
        try {
          old.close(4001, "replaced");
        } catch (e) {
        }
      }
      const [c2, s2] = Object.values(new WebSocketPair());
      this.ctx.acceptWebSocket(s2, ["seat-" + seat]);
      s2.serializeAttachment({ seat, last: Date.now() });
      const C = await this.loadC();
      const mine = await this.seatCopy(seat);
      await this.send(s2, { t: "room", code: m.code, you: seat, seats: this.seatsView(), week: m.week, ended: this.endedView(), state: C, chat: await this.chatLoad(), ...this.buoiView(), mine, msv: m.sv && m.sv[seat] || 0 });
      await this.presence();
      await this.ctx.storage.setAlarm(Date.now() + 2e4);
      return new Response(null, { status: 101, webSocket: c2 });
    }
    return new Response("?", { status: 404 });
  }
  async webSocketMessage(ws, data) {
    let msg;
    try {
      const s = typeof data === "string" ? data : await gunzipText(data);
      if (s.length > 9e6) throw 0;
      msg = JSON.parse(s);
    } catch (e) {
      return this.send(ws, { t: "error", code: "bad", msg: "bad message" });
    }
    const at = ws.deserializeAttachment() || {};
    const seat = at.seat;
    if (!seat) return;
    at.last = Date.now();
    ws.serializeAttachment(at);
    const m = await this.loadMeta();
    if (!m) return;
    const t = msg.t;
    if (t === "ping") return this.send(ws, { t: "pong" });
    if (t === "bend") {
      if (msg.week !== m.week || msg.buoi !== (m.buoi || 0)) return this.send(ws, { t: "error", code: "badbuoi", msg: "tu\u1EA7n " + m.week + " bu\u1ED5i " + (m.buoi || 0) });
      if ((m.buoi || 0) >= (m.nb || 3) - 1) return this.send(ws, { t: "error", code: "badbuoi", msg: "bu\u1ED5i t\u1ED1i k\u1EBFt th\xFAc b\u1EB1ng end" });
      m.bended = m.bended || {};
      m.bended[seat] = true;
      const other = seat === "a" ? "b" : "a";
      if (m.bended[other] || !m.seats[other]) {
        m.buoi = (m.buoi || 0) + 1;
        m.bended = {};
        await this.saveMeta();
        return this.bcast({ t: "buoi", week: m.week, buoi: m.buoi, bended: { a: false, b: false } });
      }
      await this.saveMeta();
      return this.bcast({ t: "bended", week: m.week, buoi: m.buoi || 0, bended: this.bendedView() });
    }
    if (t === "unbend") {
      if (m.bended && m.bended[seat]) {
        delete m.bended[seat];
        await this.saveMeta();
        await this.bcast({ t: "bended", week: m.week, buoi: m.buoi || 0, bended: this.bendedView() });
      }
      return;
    }
    if (t === "where") {
      if (seat !== "a") return this.send(ws, { t: "error", code: "notyours", msg: "ch\u1EC9 ch\u1EE7 ph\xF2ng" });
      m.where = { week: msg.week, buoi: msg.buoi, W: msg.W };
      await this.saveMeta();
      return this.bcast({ t: "where", week: msg.week, buoi: msg.buoi, W: msg.W }, ws);
    }
    if (t === "pos") {
      {
        const o = { ...msg };
        delete o.t;
        delete o.from;
        if (JSON.stringify(o).length > 4e3) return;
        m.pos = m.pos || {};
        m.pos[seat] = o;
      }
      await this.saveMeta();
      return this.bcast({ t: "pos", from: seat, ...m.pos[seat] }, ws);
    }
    if (t === "act" || t === "actr" || t === "res" || t === "note") {
      const o = { ...msg, from: seat };
      return this.bcast(o, ws);
    }
    if (t === "chat") return this.chatIn(ws, seat, msg, m);
    if (t === "seat") {
      const o = msg.o;
      if (!o || typeof o !== "object" || o.seat !== seat || o.week !== m.week) return this.send(ws, { t: "error", code: "badseat", msg: "tu\u1EA7n " + m.week });
      m.sv = m.sv || {};
      const cur = m.sv[seat] || 0;
      if ((msg.sv | 0) < cur) return this.send(ws, { t: "error", code: "seatold", sv: cur });
      if (JSON.stringify(o).length > SEATMAX) return this.send(ws, { t: "error", code: "seatbig" });
      m.sv[seat] = cur + 1;
      o.sv = m.sv[seat];
      o.sat = Date.now();
      await this.putBig("seat-" + seat, o);
      await this.saveMeta();
      return this.send(ws, { t: "seatok", sv: m.sv[seat] });
    }
    if (t === "say") {
      const text = String(msg.text || "").slice(0, 200);
      return this.bcast({ t: "said", from: seat, text }, ws);
    }
    if (t === "init") {
      if (seat !== "a") return this.send(ws, { t: "error", code: "notyours", msg: "ch\u1EC9 ch\u1EE7 ph\xF2ng" });
      if (await this.loadC()) return this.send(ws, { t: "error", code: "hasstate", msg: "ph\xF2ng \u0111\xE3 c\xF3 th\u1EBF gi\u1EDBi" });
      const C = msg.state;
      if (!C || typeof C !== "object") return;
      C.week = m.week = 0;
      m.ended = {};
      m.buoi = 0;
      m.bended = {};
      m.nb = msg.nb === 4 ? 4 : 3;
      await this.saveC(C);
      await this.saveMeta();
      return this.bcast({ t: "state", state: C, week: m.week, by: seat });
    }
    if (t === "me") {
      const C = await this.loadC();
      if (!C) return this.send(ws, { t: "error", code: "nostate", msg: "ch\u01B0a c\xF3 th\u1EBF gi\u1EDBi" });
      C.P = C.P || {};
      C.P[seat] = msg.P;
      if (m.ended) delete m.ended[seat];
      await this.delBig("sub-" + seat);
      await this.delBig("seat-" + seat);
      const other = seat === "a" ? "b" : "a";
      const os = await this.getBig("sub-" + other);
      if (os && typeof os === "object") {
        os.P = os.P || {};
        os.P[seat] = msg.P;
        await this.putBig("sub-" + other, os);
      }
      await this.saveC(C);
      await this.saveMeta();
      return this.bcast({ t: "state", state: C, week: m.week, by: seat });
    }
    if (t === "unend") {
      if (m.ended && m.ended[seat] && !(m.ended.a && m.ended.b)) {
        delete m.ended[seat];
        await this.ctx.storage.delete("sub-" + seat);
        await this.saveMeta();
        await this.presence();
      }
      return;
    }
    if (t === "end") {
      if (msg.week !== m.week) return this.send(ws, { t: "error", code: "badweek", msg: "tu\u1EA7n " + m.week });
      if (!msg.state || typeof msg.state !== "object") return;
      await this.putBig("sub-" + seat, msg.state);
      m.ended = m.ended || {};
      m.ended[seat] = true;
      await this.saveMeta();
      const other = seat === "a" ? "b" : "a";
      if (m.ended[other] || !m.seats[other]) return this.tick();
      return this.presence();
    }
  }
  /* ---- chat (PROTOCOL §10): room-scoped (this Durable Object only), last CHAT_MAX messages in DO storage, plain text ---- */
  async chatLoad() {
    const a = await this.ctx.storage.get("chat");
    return Array.isArray(a) ? a : [];
  }
  async chatIn(ws, seat, msg, m) {
    let raw = typeof msg.text === "string" ? msg.text : "";
    if (JSON.stringify(msg).length > CHAT_FRAME) return this.send(ws, { t: "error", code: "toolarge", msg: "tin qu\xE1 d\xE0i" });
    const clean = /* @__PURE__ */ __name((s) => [...String(s).replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]+/g, " ").replace(/ {2,}/g, " ").trim()], "clean");
    const text = clean(raw).slice(0, CHAT_LEN).join("");
    if (!text) return;
    const at = ws.deserializeAttachment() || {};
    const now = Date.now();
    if (at.cs && now - at.cs < CHAT_GAP) return this.send(ws, { t: "error", code: "slow", msg: "g\u1EEDi ch\u1EADm l\u1EA1i" });
    at.cs = now;
    ws.serializeAttachment(at);
    const nm = clean(msg.nm || m.seats[seat] && m.seats[seat].name || "").slice(0, CHAT_NAME).join("");
    const g = msg.g && typeof msg.g === "object" ? msg.g : {};
    const n = /* @__PURE__ */ __name((v) => Number.isFinite(+v) ? Math.max(0, Math.min(9999, Math.floor(+v))) : 0, "n");
    m.cn = (m.cn || 0) + 1;
    const one = { i: m.cn, s: seat, n: nm, x: text, w: m.week | 0, g: { y: n(g.y), m: n(g.m), t: n(g.t), b: n(g.b) }, ts: now };
    const list = await this.chatLoad();
    list.push(one);
    while (list.length > CHAT_MAX) list.shift();
    await this.ctx.storage.put("chat", list);
    await this.saveMeta();
    return this.bcast({ t: "chat", m: one });
  }
  async putBig(key, obj) {
    const s = JSON.stringify(obj);
    const put = {};
    let n = 0;
    for (let i = 0; i < s.length; i += CHUNK) put[key + ":" + n++] = s.slice(i, i + CHUNK);
    put[key] = n;
    const keys = Object.keys(put);
    for (let i = 0; i < keys.length; i += 120) {
      const part = {};
      keys.slice(i, i + 120).forEach((k) => part[k] = put[k]);
      await this.ctx.storage.put(part);
    }
  }
  async getBig(key) {
    const n = await this.ctx.storage.get(key);
    if (!n) return null;
    const keys = [];
    for (let i = 0; i < n; i++) keys.push(key + ":" + i);
    const got = await this.ctx.storage.get(keys);
    let s = "";
    for (const k of keys) s += got.get(k) || "";
    try {
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  }
  async seatCopy(seat) {
    const o = await this.getBig("seat-" + seat);
    return o && typeof o === "object" && o.week === this.meta.week ? o : null;
  }
  async delBig(key) {
    const n = await this.ctx.storage.get(key) || 0;
    const keys = [key];
    for (let i = 0; i < n; i++) keys.push(key + ":" + i);
    await this.ctx.storage.delete(keys);
  }
  async tick() {
    const m = this.meta;
    const base = await this.loadC();
    const A = await this.getBig("sub-a"), B = await this.getBig("sub-b");
    let F;
    if (!base) F = A || B;
    else if (A && B) F = merge3(base, A, B);
    else F = A || B || base;
    m.week = (m.week || 0) + 1;
    F.week = m.week;
    m.ended = {};
    m.buoi = 0;
    m.bended = {};
    m.sv = {};
    await this.saveC(F);
    await this.delBig("sub-a");
    await this.delBig("sub-b");
    await this.delBig("seat-a");
    await this.delBig("seat-b");
    await this.saveMeta();
    await this.bcast({ t: "week", week: m.week, state: F });
    await this.presence();
  }
  async webSocketClose(ws) {
    try {
      ws.close();
    } catch (e) {
    }
    await this.loadMeta();
    if (this.meta) await this.presenceSoon(ws);
  }
  async webSocketError(ws) {
    await this.webSocketClose(ws);
  }
  async presenceSoon(closed) {
    const s = { t: "presence", seats: this.seatsView(), ended: this.endedView(), week: this.meta.week };
    const at = closed && closed.deserializeAttachment && closed.deserializeAttachment();
    if (at && at.seat && s.seats[at.seat]) s.seats[at.seat].online = this.socks(at.seat).filter((w) => w !== closed).length > 0;
    await this.bcast(s, closed);
  }
  async alarm() {
    const m = await this.loadMeta();
    if (!m) return;
    const now = Date.now();
    let changed = false;
    for (const ws of this.socks()) {
      const at = ws.deserializeAttachment() || {};
      let last = at.last || 0;
      try {
        const ar = this.ctx.getWebSocketAutoResponseTimestamp(ws);
        if (ar && ar.getTime() > last) last = ar.getTime();
      } catch (e) {
      }
      if (now - last > STALE) {
        try {
          ws.close(4003, "stale");
        } catch (e) {
        }
        changed = true;
      }
    }
    if (changed) await this.presence();
    if (this.socks().length) {
      await this.ctx.storage.setAlarm(now + 2e4);
      return;
    }
    if (now - (m.at || m.created || now) > IDLE_DAYS * 864e5) {
      await this.ctx.storage.deleteAll();
      this.meta = null;
      this.C = void 0;
      return;
    }
    await this.ctx.storage.setAlarm(now + 864e5);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-nMPZIS/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-nMPZIS/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  Room,
  Vault,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
