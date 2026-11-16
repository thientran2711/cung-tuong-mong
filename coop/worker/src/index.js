/* Cung Tường Mộng · Chơi cùng bạn — co-op backend (Cloudflare Worker + Durable Object).
   Protocol: dev/coop/PROTOCOL.md. One Durable Object per room code holds the canonical shared state C + both seats. */
import { merge3 } from "./merge.js";
import { vaultRoute, Vault } from "./vault.js";
export { Vault };

const V = "coop-2";
const CHAT_MAX = 50, CHAT_LEN = 300, CHAT_NAME = 24, CHAT_FRAME = 2400, CHAT_GAP = 350;   // chat: last 50 per room, 300 chars, 2.4 KB frame, 350 ms between two sends of one seat
const ALPH = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CHUNK = 40000;            // chars per storage value (<128 KiB even in 3-byte UTF-8)
const BIG = 200000;             // send gzip binary above this many chars
const STALE = 45000;            // ms of silence before a socket counts as gone
const IDLE_DAYS = 30;
const SEATMAX = 3000000;        // chars of one seat's week copy

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "content-type" };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", ...CORS } });
const mkCode = () => { let s = ""; const b = crypto.getRandomValues(new Uint8Array(4)); for (const x of b) s += ALPH[x % ALPH.length]; return s; };
const okCode = c => typeof c === "string" && c.length === 4 && [...c].every(ch => ALPH.includes(ch));

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (u.pathname.startsWith("/api/vault")) return vaultRoute(req, env);   // Sổ mây (vault.js): own CORS, game origin only
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const p = u.pathname.replace(/\/+$/, "");
    if (p === "/api/health" || p === "" || p === "/") return json({ ok: true, v: V });
    if (p === "/api/room" && req.method === "POST") {
      for (let i = 0; i < 12; i++) {
        const code = mkCode();
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
        const q = new URL(req.url); q.hostname = "do"; q.pathname = "/ws"; q.searchParams.set("code", code);
        return stub.fetch(new Request(q.toString(), req));
      }
      const r = await stub.fetch("https://do/info");
      return new Response(r.body, { status: r.status, headers: { "content-type": "application/json", ...CORS } });
    }
    return json({ error: "not found" }, 404);
  }
};

async function gzipText(s) {
  const cs = new CompressionStream("gzip"); const w = cs.writable.getWriter(); w.write(new TextEncoder().encode(s)); w.close();
  return new Uint8Array(await new Response(cs.readable).arrayBuffer());
}
async function gunzipText(buf) {
  const ds = new DecompressionStream("gzip"); const w = ds.writable.getWriter(); w.write(new Uint8Array(buf)); w.close();
  return await new Response(ds.readable).text();
}

export class Room {
  constructor(state, env) {
    this.ctx = state; this.env = env; this.meta = null; this.C = undefined;
    try { this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('{"t":"ping"}', '{"t":"pong"}')); } catch (e) {}
  }
  async loadMeta() { if (!this.meta) this.meta = (await this.ctx.storage.get("meta")) || null; return this.meta; }
  async saveMeta() { this.meta.at = Date.now(); await this.ctx.storage.put("meta", this.meta); }
  async loadC() {
    if (this.C !== undefined) return this.C;
    const n = (await this.ctx.storage.get("sn")) || 0;
    if (!n) { this.C = null; return null; }
    const keys = []; for (let i = 0; i < n; i++) keys.push("s:" + i);
    const got = await this.ctx.storage.get(keys); let s = ""; for (const k of keys) s += got.get(k) || "";
    try { this.C = JSON.parse(s); } catch (e) { this.C = null; }
    return this.C;
  }
  async saveC(C) {
    this.C = C; const s = JSON.stringify(C); const old = (await this.ctx.storage.get("sn")) || 0;
    const put = {}; let n = 0; for (let i = 0; i < s.length; i += CHUNK) put["s:" + (n++)] = s.slice(i, i + CHUNK);
    put.sn = n;
    const keys = Object.keys(put);
    for (let i = 0; i < keys.length; i += 120) { const part = {}; keys.slice(i, i + 120).forEach(k => part[k] = put[k]); await this.ctx.storage.put(part); }
    const del = []; for (let i = n; i < old; i++) del.push("s:" + i); if (del.length) await this.ctx.storage.delete(del);
    if (s.length > 8e6) return false; return true;
  }
  socks(seat) { return this.ctx.getWebSockets(seat ? "seat-" + seat : undefined); }
  online(seat) { return this.socks(seat).length > 0; }
  seatsView() {
    const m = this.meta, o = {};
    for (const x of ["a", "b"]) { const s = m.seats[x]; o[x] = s ? { name: s.name || "", online: this.online(x) } : null; }
    return o;
  }
  async send(ws, obj) {
    const s = JSON.stringify(obj);
    try { if (s.length > BIG) ws.send(await gzipText(s)); else ws.send(s); } catch (e) {}
  }
  async bcast(obj, exceptWs) { const s = JSON.stringify(obj); let z = null; if (s.length > BIG) z = await gzipText(s);
    for (const ws of this.socks()) { if (ws === exceptWs) continue; try { ws.send(z || s); } catch (e) {} } }
  async presence() { await this.bcast({ t: "presence", seats: this.seatsView(), ended: this.endedView(), week: this.meta.week, buoi: this.meta.buoi || 0, bended: this.bendedView() }); }
  bendedView() { const e = this.meta.bended || {}; return { a: !!e.a, b: !!e.b }; }
  buoiView() { const m = this.meta; return { buoi: m.buoi || 0, bended: this.bendedView(), where: m.where || null, pos: m.pos || {} }; }
  endedView() { const e = this.meta.ended || {}; return { a: !!e.a, b: !!e.b }; }

  async fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === "/create") {
      if (await this.loadMeta()) return new Response("taken", { status: 409 });
      this.meta = { code: u.searchParams.get("code"), seats: { a: null, b: null }, week: 0, ended: {}, created: Date.now() };
      await this.saveMeta(); await this.ctx.storage.setAlarm(Date.now() + 86400000);
      return new Response("ok");
    }
    const m = await this.loadMeta();
    if (u.pathname === "/info") {
      if (!m) return new Response(JSON.stringify({ exists: false }), { status: 404 });
      return new Response(JSON.stringify({ code: m.code, exists: true, seats: this.seatsView(), week: m.week, hasState: !!(await this.ctx.storage.get("sn")) }));
    }
    if (u.pathname === "/ws") {
      const pid = (u.searchParams.get("pid") || "").slice(0, 64), name = (u.searchParams.get("name") || "").slice(0, 40);
      const fail = async (code, msg) => { const [c, sv] = Object.values(new WebSocketPair()); this.ctx.acceptWebSocket(sv, ["dead"]);
        await this.send(sv, { t: "error", code, msg }); try { sv.close(4000, code); } catch (e) {} return new Response(null, { status: 101, webSocket: c }); };
      if (!m) return fail("noroom", "Không có phòng này");
      if (!pid) return fail("nopid", "thiếu pid");
      let seat = null;
      for (const x of ["a", "b"]) if (m.seats[x] && m.seats[x].pid === pid) seat = x;
      if (!seat) { if (!m.seats.a) seat = "a"; else if (!m.seats.b) seat = "b"; }
      if (!seat) return fail("full", "Phòng đã đủ hai người");
      if (!m.seats[seat]) m.seats[seat] = { pid, name };
      if (name) m.seats[seat].name = name;
      await this.saveMeta();
      for (const old of this.socks(seat)) { try { old.close(4001, "replaced"); } catch (e) {} }
      const [c2, s2] = Object.values(new WebSocketPair());
      this.ctx.acceptWebSocket(s2, ["seat-" + seat]);
      s2.serializeAttachment({ seat, last: Date.now() });
      const C = await this.loadC();
      const mine = await this.seatCopy(seat);
      await this.send(s2, { t: "room", code: m.code, you: seat, seats: this.seatsView(), week: m.week, ended: this.endedView(), state: C, chat: await this.chatLoad(), ...this.buoiView(), mine, msv: (m.sv && m.sv[seat]) || 0, caps: ["seatd"] });
      await this.presence();
      await this.ctx.storage.setAlarm(Date.now() + 20000);
      return new Response(null, { status: 101, webSocket: c2 });
    }
    return new Response("?", { status: 404 });
  }

  async webSocketMessage(ws, data) {
    let msg; try { const s = typeof data === "string" ? data : await gunzipText(data); if (s.length > 9e6) throw 0; msg = JSON.parse(s); } catch (e) { return this.send(ws, { t: "error", code: "bad", msg: "bad message" }); }
    const at = ws.deserializeAttachment() || {}; const seat = at.seat; if (!seat) return;
    at.last = Date.now(); ws.serializeAttachment(at);
    const m = await this.loadMeta(); if (!m) return;
    const t = msg.t;
    if (t === "ping") return this.send(ws, { t: "pong" });
    if (t === "bend") {
      if (msg.week !== m.week || msg.buoi !== (m.buoi || 0)) return this.send(ws, { t: "error", code: "badbuoi", msg: "tuần " + m.week + " buổi " + (m.buoi || 0) });
      /* buổi per week: 3 (old clients) or what the host said at init (4 since jtime4: sáng, trưa, chiều, tối) */
      if ((m.buoi || 0) >= (m.nb || 3) - 1) return this.send(ws, { t: "error", code: "badbuoi", msg: "buổi tối kết thúc bằng end" });
      m.bended = m.bended || {}; m.bended[seat] = true;
      const other = seat === "a" ? "b" : "a";
      if (m.bended[other] || !m.seats[other]) { m.buoi = (m.buoi || 0) + 1; m.bended = {}; await this.saveMeta(); return this.bcast({ t: "buoi", week: m.week, buoi: m.buoi, bended: { a: false, b: false } }); }
      await this.saveMeta(); return this.bcast({ t: "bended", week: m.week, buoi: m.buoi || 0, bended: this.bendedView() });
    }
    if (t === "unbend") { if (m.bended && m.bended[seat]) { delete m.bended[seat]; await this.saveMeta(); await this.bcast({ t: "bended", week: m.week, buoi: m.buoi || 0, bended: this.bendedView() }); } return; }
    if (t === "where") {
      if (seat !== "a") return this.send(ws, { t: "error", code: "notyours", msg: "chỉ chủ phòng" });
      m.where = { week: msg.week, buoi: msg.buoi, W: msg.W }; await this.saveMeta();
      return this.bcast({ t: "where", week: msg.week, buoi: msg.buoi, W: msg.W }, ws);
    }
    if (t === "pos") {
      { const o = { ...msg }; delete o.t; delete o.from; if (JSON.stringify(o).length > 4000) return; m.pos = m.pos || {}; m.pos[seat] = o; }
      await this.saveMeta(); return this.bcast({ t: "pos", from: seat, ...m.pos[seat] }, ws);
    }
    if (t === "act" || t === "actr" || t === "res" || t === "note") { const o = { ...msg, from: seat }; return this.bcast(o, ws); }
    if (t === "chat") return this.chatIn(ws, seat, msg, m);
    /* per-seat copy of her week (review/coop-rejoin-xdev): the client's rolling snapshot (jcoopworld CW.snap), so a rejoin from ANOTHER
       device (same pid via Sổ mây) or with cleared storage restores her exact week. Version = server counter m.sv[seat]; a write based on an
       older version than the stored one is refused (a stale device must not overwrite a newer copy). */
    if (t === "seat") {
      const o = msg.o; if (!o || typeof o !== "object" || o.seat !== seat || o.week !== m.week) return this.send(ws, { t: "error", code: "badseat", msg: "tuần " + m.week });
      m.sv = m.sv || {}; const cur = m.sv[seat] || 0;
      if ((msg.sv | 0) < cur) return this.send(ws, { t: "error", code: "seatold", sv: cur });
      if (JSON.stringify(o).length > SEATMAX) return this.send(ws, { t: "error", code: "seatbig" });
      m.sv[seat] = cur + 1; o.sv = m.sv[seat]; o.sat = Date.now();
      await this.putBig("seat-" + seat, o); await this.saveMeta();
      return this.send(ws, { t: "seatok", sv: m.sv[seat] });
    }
    /* seat copy as a DELTA (review/lag-play-2): only the parts that changed since the version she last stored. msg = {t:"seatd", sv:<her
       version>, set:{path:value}, del:[path]}, a path = "buoi" | "used" | "c" | "d.<key>" | "d.S.<key>". Applied on top of the stored copy
       only when that copy is exactly her version sv (server-authoritative); otherwise error "seatresync" -> the client sends the FULL copy. */
    if (t === "seatd") {
      m.sv = m.sv || {}; const cur = m.sv[seat] || 0; const o = await this.seatCopy(seat);
      if (!o || (msg.sv | 0) !== cur || o.seat !== seat || !msg.set || typeof msg.set !== "object") return this.send(ws, { t: "error", code: "seatresync", sv: cur });
      const put = (path, v, del) => { const k = String(path).split("."); let x = o; for (let i = 0; i < k.length - 1; i++) { if (!x[k[i]] || typeof x[k[i]] !== "object") { if (del) return; x[k[i]] = {}; } x = x[k[i]]; } if (del) delete x[k[k.length - 1]]; else x[k[k.length - 1]] = v; };
      const ok = p => typeof p === "string" && /^(buoi|used|c|d\.[^.]+|d\.S\.[^.]+)$/.test(p) && !/__proto__|constructor|prototype/.test(p);
      for (const p in msg.set) { if (!ok(p)) return this.send(ws, { t: "error", code: "seatresync", sv: cur }); put(p, msg.set[p]); }
      for (const p of Array.isArray(msg.del) ? msg.del : []) { if (ok(p)) put(p, null, true); }
      if (JSON.stringify(o).length > SEATMAX) return this.send(ws, { t: "error", code: "seatbig" });
      m.sv[seat] = cur + 1; o.sv = m.sv[seat]; o.sat = Date.now(); if (msg.dev) o.dev = msg.dev;
      await this.putBig("seat-" + seat, o); await this.saveMeta();
      return this.send(ws, { t: "seatok", sv: m.sv[seat] });
    }
    if (t === "say") { const text = String(msg.text || "").slice(0, 200); return this.bcast({ t: "said", from: seat, text }, ws); }
    if (t === "init") {
      if (seat !== "a") return this.send(ws, { t: "error", code: "notyours", msg: "chỉ chủ phòng" });
      if (await this.loadC()) return this.send(ws, { t: "error", code: "hasstate", msg: "phòng đã có thế giới" });
      const C = msg.state; if (!C || typeof C !== "object") return;
      C.week = m.week = 0; m.ended = {}; m.buoi = 0; m.bended = {}; m.nb = (msg.nb === 4 ? 4 : 3);
      await this.saveC(C); await this.saveMeta();
      return this.bcast({ t: "state", state: C, week: m.week, by: seat });
    }
    if (t === "me") {
      const C = await this.loadC(); if (!C) return this.send(ws, { t: "error", code: "nostate", msg: "chưa có thế giới" });
      C.P = C.P || {}; C.P[seat] = msg.P;
      // her new character starts fresh in this week; drop a pending end of hers
      if (m.ended) delete m.ended[seat];
      await this.delBig("sub-" + seat); await this.delBig("seat-" + seat);
      // the other seat may already have ended with a view of my OLD character: make her view of me the new blob,
      // so the merge sees "no change by her" there and keeps my new character as it is
      const other = seat === "a" ? "b" : "a"; const os = await this.getBig("sub-" + other);
      if (os && typeof os === "object") { os.P = os.P || {}; os.P[seat] = msg.P; await this.putBig("sub-" + other, os); }
      await this.saveC(C); await this.saveMeta();
      return this.bcast({ t: "state", state: C, week: m.week, by: seat });
    }
    if (t === "unend") {
      if (m.ended && m.ended[seat] && !(m.ended.a && m.ended.b)) { delete m.ended[seat]; await this.ctx.storage.delete("sub-" + seat); await this.saveMeta(); await this.presence(); }
      return;
    }
    if (t === "end") {
      if (msg.week !== m.week) return this.send(ws, { t: "error", code: "badweek", msg: "tuần " + m.week });
      if (!msg.state || typeof msg.state !== "object") return;
      await this.putBig("sub-" + seat, msg.state);
      m.ended = m.ended || {}; m.ended[seat] = true; await this.saveMeta();
      const other = seat === "a" ? "b" : "a";
      if (m.ended[other] || !m.seats[other]) return this.tick();
      return this.presence();
    }
  }


  /* ---- chat (PROTOCOL §10): room-scoped (this Durable Object only), last CHAT_MAX messages in DO storage, plain text ---- */
  async chatLoad() { const a = await this.ctx.storage.get("chat"); return Array.isArray(a) ? a : []; }
  async chatIn(ws, seat, msg, m) {
    let raw = typeof msg.text === "string" ? msg.text : "";
    if (JSON.stringify(msg).length > CHAT_FRAME) return this.send(ws, { t: "error", code: "toolarge", msg: "tin quá dài" });
    const clean = s => [...String(s).replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]+/g, " ").replace(/ {2,}/g, " ").trim()];
    const text = clean(raw).slice(0, CHAT_LEN).join("");
    if (!text) return;
    const at = ws.deserializeAttachment() || {}; const now = Date.now();
    if (at.cs && now - at.cs < CHAT_GAP) return this.send(ws, { t: "error", code: "slow", msg: "gửi chậm lại" });
    at.cs = now; ws.serializeAttachment(at);
    const nm = clean(msg.nm || (m.seats[seat] && m.seats[seat].name) || "").slice(0, CHAT_NAME).join("");
    const g = msg.g && typeof msg.g === "object" ? msg.g : {};
    const n = v => (Number.isFinite(+v) ? Math.max(0, Math.min(9999, Math.floor(+v))) : 0);
    m.cn = (m.cn || 0) + 1;
    const one = { i: m.cn, s: seat, n: nm, x: text, w: m.week | 0, g: { y: n(g.y), m: n(g.m), t: n(g.t), b: n(g.b) }, ts: now };
    const list = await this.chatLoad(); list.push(one); while (list.length > CHAT_MAX) list.shift();
    await this.ctx.storage.put("chat", list); await this.saveMeta();
    return this.bcast({ t: "chat", m: one });          // to BOTH seats, the sender too: one order, one id
  }

  async putBig(key, obj) {
    const s = JSON.stringify(obj); const put = {}; let n = 0;
    for (let i = 0; i < s.length; i += CHUNK) put[key + ":" + (n++)] = s.slice(i, i + CHUNK);
    put[key] = n; const keys = Object.keys(put);
    for (let i = 0; i < keys.length; i += 120) { const part = {}; keys.slice(i, i + 120).forEach(k => part[k] = put[k]); await this.ctx.storage.put(part); }
  }
  async getBig(key) {
    const n = await this.ctx.storage.get(key); if (!n) return null;
    const keys = []; for (let i = 0; i < n; i++) keys.push(key + ":" + i);
    const got = await this.ctx.storage.get(keys); let s = ""; for (const k of keys) s += got.get(k) || "";
    try { return JSON.parse(s); } catch (e) { return null; }
  }
  async seatCopy(seat) { const o = await this.getBig("seat-" + seat); return o && typeof o === "object" && o.week === this.meta.week ? o : null; }
  async delBig(key) { const n = (await this.ctx.storage.get(key)) || 0; const keys = [key]; for (let i = 0; i < n; i++) keys.push(key + ":" + i); await this.ctx.storage.delete(keys); }

  async tick() {
    const m = this.meta; const base = await this.loadC();
    const A = await this.getBig("sub-a"), B = await this.getBig("sub-b");
    let F;
    if (!base) F = A || B; else if (A && B) F = merge3(base, A, B); else F = A || B || base;
    m.week = (m.week || 0) + 1; F.week = m.week; m.ended = {}; m.buoi = 0; m.bended = {}; m.sv = {};
    await this.saveC(F); await this.delBig("sub-a"); await this.delBig("sub-b"); await this.delBig("seat-a"); await this.delBig("seat-b"); await this.saveMeta();
    await this.bcast({ t: "week", week: m.week, state: F });
    await this.presence();
  }

  async webSocketClose(ws) { try { ws.close(); } catch (e) {} await this.loadMeta(); if (this.meta) await this.presenceSoon(ws); }
  async webSocketError(ws) { await this.webSocketClose(ws); }
  async presenceSoon(closed) {
    const s = { t: "presence", seats: this.seatsView(), ended: this.endedView(), week: this.meta.week };
    // the closing socket may still be listed; correct it
    const at = closed && closed.deserializeAttachment && closed.deserializeAttachment();
    if (at && at.seat && s.seats[at.seat]) s.seats[at.seat].online = this.socks(at.seat).filter(w => w !== closed).length > 0;
    await this.bcast(s, closed);
  }
  async alarm() {
    const m = await this.loadMeta(); if (!m) return;
    const now = Date.now(); let changed = false;
    for (const ws of this.socks()) {
      const at = ws.deserializeAttachment() || {}; let last = at.last || 0;
      try { const ar = this.ctx.getWebSocketAutoResponseTimestamp(ws); if (ar && ar.getTime() > last) last = ar.getTime(); } catch (e) {}
      if (now - last > STALE) { try { ws.close(4003, "stale"); } catch (e) {} changed = true; }
    }
    if (changed) await this.presence();
    if (this.socks().length) { await this.ctx.storage.setAlarm(now + 20000); return; }
    if (now - (m.at || m.created || now) > IDLE_DAYS * 86400000) { await this.ctx.storage.deleteAll(); this.meta = null; this.C = undefined; return; }
    await this.ctx.storage.setAlarm(now + 86400000);
  }
}
