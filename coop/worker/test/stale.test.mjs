/* Stale socket (review/coop-stable): node test/stale.test.mjs (no network).
   A seat whose socket went silent WITHOUT closing (phone off the network) is closed by the alarm; the peer never answers the close frame,
   so the runtime keeps listing the socket. The seat must read offline from then on (presence, seatsView), and the buried socket never writes. */
import { Room } from "../src/index.js";
const assert = (c, m) => { if (!c) throw new Error("FAIL " + m); console.log("ok", m); };
const mem = new Map(); const cl = v => structuredClone(v);
const storage = { async get(k) { return mem.has(k) ? cl(mem.get(k)) : undefined; }, async put(k, v) { if (typeof k === "object") { for (const x in k) mem.set(x, cl(k[x])); } else mem.set(k, cl(v)); },
  async delete(k) { return mem.delete(k); }, async deleteAll() { mem.clear(); }, async setAlarm() {} };
const socks = [];
/* like the runtime: close() sends a close frame and moves to CLOSING (2); the socket stays listed until the peer answers (a ghost never does) */
const ctx = { storage, getWebSockets: tag => socks.filter(s => !tag || s.tag === tag), acceptWebSocket() {}, getWebSocketAutoResponseTimestamp: () => null };
const R = new Room(ctx, {});
const ws = (seat, last) => { const s = { tag: "seat-" + seat, readyState: 1, at: { seat, last }, got: [], send(x) { this.got.push(JSON.parse(x)); }, close() { this.readyState = 2; },
  deserializeAttachment() { return cl(this.at); }, serializeAttachment(a) { this.at = cl(a); } }; socks.push(s); return s; };
await R.fetch(new Request("https://do/create?code=ABCD", { method: "POST" }));
const m = await R.loadMeta(); m.seats.a = { pid: "pidA" }; m.seats.b = { pid: "pidB" }; await R.saveMeta();
const now = Date.now(); const A = ws("a", now), B = ws("b", now - 60000);
assert(R.seatsView().b.online, "before the alarm the silent seat still counts");
await R.alarm();
const p = [...A.got].reverse().find(x => x.t === "presence");
assert(p && p.seats.b && p.seats.b.online === false && p.seats.a.online, "presence tells the host her friend is offline");
assert(B.readyState === 2 && B.at.gone, "the alarm closes the silent socket and marks it gone");
/* mock keeps the closed socket listed, like a peer that never answers: a second alarm must not re-announce her online */
A.got = []; B.readyState = 1; /* even if the runtime still reports it open */
await R.alarm(); assert(!R.seatsView().b.online, "a buried socket never counts as online again (attachment)");
assert(!A.got.some(x => x.t === "presence" && x.seats.b && x.seats.b.online), "no presence says she is back");
B.got = []; await R.webSocketMessage(B, JSON.stringify({ t: "ping" })); assert(!B.got.length, "a buried socket's messages are ignored");
/* she comes back on a new socket: online again */
const B2 = ws("b", Date.now()); assert(R.seatsView().b.online, "a fresh socket for the seat reads online");
/* replaced: the old socket of the same seat is buried at once */
R.bury(B2, 4001, "replaced"); assert(B2.at.gone && !R.seatsView().b.online, "a replaced socket stops counting at once");
console.log("ALL OK stale");
