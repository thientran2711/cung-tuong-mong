/* Presence after a reload (review/coop-presence-reload): node test/presence.test.mjs (no network).
   ONE presence rule: every seats view is stamped with a clock that only goes up (ps); "who" answers the asker with the room's view now;
   "here" (a seat that applied its room reply) re-announces to everybody; a socket that was already replaced / buried closing late never
   marks the seat absent; a buried socket that still writes is told "gone" (its page missed the close) and closed again. */
import { Room } from "../src/index.js";
const assert = (c, m) => { if (!c) throw new Error("FAIL " + m); console.log("ok", m); };
const mem = new Map(); const cl = v => structuredClone(v);
const storage = { async get(k) { if (Array.isArray(k)) { const r = new Map(); for (const x of k) if (mem.has(x)) r.set(x, cl(mem.get(x))); return r; } return mem.has(k) ? cl(mem.get(k)) : undefined; },
  async put(k, v) { if (typeof k === "object") { for (const x in k) mem.set(x, cl(k[x])); } else mem.set(k, cl(v)); },
  async delete(k) { if (Array.isArray(k)) { for (const x of k) mem.delete(x); return; } return mem.delete(k); }, async deleteAll() { mem.clear(); }, async setAlarm() {} };
const socks = [];
const ctx = { storage, getWebSockets: tag => socks.filter(s => !tag || s.tag === tag), acceptWebSocket() {}, getWebSocketAutoResponseTimestamp: () => null };
const R = new Room(ctx, {});
const ws = seat => { const s = { tag: "seat-" + seat, readyState: 1, at: { seat, last: Date.now() }, got: [], closed: null, send(x) { this.got.push(JSON.parse(x)); },
  close(c) { this.readyState = 2; this.closed = c || 1000; }, deserializeAttachment() { return cl(this.at); }, serializeAttachment(a) { this.at = cl(a); } }; socks.push(s); return s; };
const pres = s => s.got.filter(x => x.t === "presence");
const msg = (s, o) => R.webSocketMessage(s, typeof o === "string" ? o : JSON.stringify(o));
await R.fetch(new Request("https://do/create?code=ABCD", { method: "POST" }));
const m = await R.loadMeta(); m.seats.a = { pid: "pidA" }; m.seats.b = { pid: "pidB" }; await R.saveMeta();
const A = ws("a"), B1 = ws("b");

/* 1. ps only goes up, even within one millisecond */
const p1 = R.psNext(), p2 = R.psNext(), p3 = R.psNext(); assert(p1 < p2 && p2 < p3, "presence clock strictly increases");
await R.presence(); const q1 = pres(A).pop(); assert(q1 && q1.ps > p3, "every presence carries a newer ps");

/* 2. who: only the asker hears the room's view now */
A.got = []; B1.got = []; await msg(A, { t: "who" });
const w = pres(A).pop(); assert(w && w.seats.b.online && w.seats.a.online && w.ps > q1.ps, "who answers the asker with both seats online and a newer ps");
assert(!pres(B1).length, "who is answered to the asker only");

/* 3. here: a seat that applied its room reply re-announces; everybody hears a fresh presence */
A.got = []; B1.got = []; await msg(B1, { t: "here" }); assert(pres(A).length === 1 && pres(B1).length === 1, "here re-announces to both seats");

/* 4. reload: the guest's new socket replaces the old one; the OLD socket closing late never marks her absent */
const B2 = ws("b"); R.bury(B1, 4001, "replaced"); assert(B1.closed === 4001 && B1.at.gone, "the old socket is buried as replaced");
A.got = []; await R.webSocketClose(B1); assert(!pres(A).some(x => x.seats.b && x.seats.b.online === false), "a late close of the replaced socket never tells the host she is away");
assert(R.seatsView().b.online, "the seat reads online on its newest socket");

/* 5. the live socket closing (a real leave) still tells the friend at once */
A.got = []; B2.readyState = 2; await R.webSocketClose(B2); const lv = pres(A).pop(); assert(lv && lv.seats.b.online === false && lv.ps > w.ps, "her newest socket closing marks her away (with a newer ps)");

/* 6. a buried socket that still writes (its page missed the close) is told "gone" and closed again; its keep-alive ping is not answered */
const B3 = ws("b"); R.bury(B3, 4003, "stale"); B3.got = []; B3.closed = null;
await msg(B3, '{"t":"ping"}'); assert(!B3.got.length, "a buried socket's ping gets nothing");
await msg(B3, { t: "bend", week: 0, buoi: 0 }); assert(B3.got.some(x => x.t === "error" && x.code === "gone") && B3.closed === 4003, "a buried socket that writes hears «gone» and is closed again");
assert(!(m.bended && m.bended.b), "a buried socket's bend never counts");
await msg(B3, { t: "who" }); assert(!pres(B3).length, "a buried socket gets no presence (only «gone»)");

/* 7. the room reply carries ps too (newest-view rule on the client) */
const src = (await import("node:fs")).readFileSync(new URL("../src/index.js", import.meta.url), "utf8");
assert(/t: "room", code: m\.code, you: seat, ps: this\.psNext\(\)/.test(src), "the room reply is stamped with ps");
console.log("ALL OK presence");
