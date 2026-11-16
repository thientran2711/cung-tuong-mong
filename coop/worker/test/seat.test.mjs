/* Per-seat week copy on the Room DO (review/coop-rejoin-xdev): node test/seat.test.mjs (no network).
   Drives Room.webSocketMessage with fake sockets on an in-memory storage. */
import { Room } from "../src/index.js";
const assert = (c, m) => { if (!c) throw new Error("FAIL " + m); console.log("ok", m); };
const mem = new Map(); const cl = v => structuredClone(v);
const storage = { async get(k) { if (Array.isArray(k)) { const r = new Map(); for (const x of k) if (mem.has(x)) r.set(x, cl(mem.get(x))); return r; } return mem.has(k) ? cl(mem.get(k)) : undefined; },
  async put(k, v) { if (typeof k === "object") { for (const x in k) mem.set(x, cl(k[x])); } else mem.set(k, cl(v)); },
  async delete(k) { if (Array.isArray(k)) { for (const x of k) mem.delete(x); return; } return mem.delete(k); }, async deleteAll() { mem.clear(); }, async setAlarm() {} };
const socks = [];
const ctx = { storage, getWebSockets: tag => socks.filter(s => !tag || s.tag === tag), acceptWebSocket() {} };
const R = new Room(ctx, {});
const ws = seat => { const s = { tag: "seat-" + seat, got: [], send(x) { this.got.push(JSON.parse(x)); }, deserializeAttachment: () => ({ seat }), serializeAttachment() {} }; socks.push(s); return s; };
const last = (s, t) => [...s.got].reverse().find(m => m.t === t);
await R.fetch(new Request("https://do/create?code=ABCD", { method: "POST" }));
const m = await R.loadMeta(); m.seats.a = { pid: "pidA" }; m.seats.b = { pid: "pidB" }; await R.saveMeta();
const A = ws("a"), B = ws("b"); const msg = (s, o) => R.webSocketMessage(s, JSON.stringify(o));
await msg(A, { t: "init", nb: 4, state: { v: 1, W: { S: {} }, P: { a: { S: { tai: 1 } }, b: { S: { tai: 1 } } } } });
const snap = (seat, tai, week = 0) => ({ room: "ABCD", seat, week, buoi: 1, used: 2, d: { S: { name: "N" + seat, tai } }, c: { life: 0 }, dev: "d" + seat });
await msg(B, { t: "seat", sv: 0, o: snap("b", 23) }); assert(last(B, "seatok").sv === 1, "first copy stored, version 1");
await msg(B, { t: "seat", sv: 1, o: snap("b", 25) }); assert(last(B, "seatok").sv === 2, "second copy, version 2");
B.got = []; await msg(B, { t: "seat", sv: 1, o: snap("b", 10) }); assert(last(B, "error").code === "seatold" && !last(B, "seatok"), "a write based on an older version is refused");
let c = await R.seatCopy("b"); assert(c && c.d.S.tai === 25 && c.sv === 2, "stored copy is the newest (25), not the stale one");
await msg(A, { t: "seat", sv: 0, o: snap("b", 99) }); assert(last(A, "error").code === "badseat", "a seat cannot write the other seat's copy");
await msg(A, { t: "seat", sv: 0, o: snap("a", 5, 3) }); assert(last(A, "error").code === "badseat", "wrong week refused");
await msg(A, { t: "seat", sv: 0, o: snap("a", 7) }); assert(last(A, "seatok").sv === 1, "host has its own counter");
assert((await R.seatCopy("a")).d.S.tai === 7 && (await R.seatCopy("b")).d.S.tai === 25, "both seats kept apart");
/* the room reply carries only MY copy */
await msg(B, { t: "me", P: { S: { tai: 3 } } }); assert(!(await R.seatCopy("b")) && (await R.seatCopy("a")), "new character (me) drops only her copy");
await msg(B, { t: "seat", sv: 2, o: snap("b", 30) });
await msg(A, { t: "end", week: 0, state: { v: 1, W: { S: {} }, P: { a: { S: { tai: 7 } }, b: { S: { tai: 3 } } } } });
await msg(B, { t: "end", week: 0, state: { v: 1, W: { S: {} }, P: { a: { S: { tai: 1 } }, b: { S: { tai: 30 } } } } });
assert(R.meta.week === 1 && !(await R.seatCopy("a")) && !(await R.seatCopy("b")) && !mem.has("seat-a") && !mem.has("seat-b"), "new week: copies dropped (the merged base holds the week)");
assert(JSON.stringify(R.meta.sv) === "{}", "versions start again each week");
await msg(B, { t: "seat", sv: 0, o: snap("b", 31, 1) }); assert(last(B, "seatok").sv === 1, "week 1 copy accepted from version 0");
/* 3 M char cap (review/coop-rejoin-xdev-r1): just under is stored in chunks and read back whole; over is refused, the old copy kept */
{ const big = snap("b", 40, 1); big.d.pad = "x".repeat(2990000); await msg(B, { t: "seat", sv: 1, o: big }); assert(last(B, "seatok").sv === 2, "copy just under 3 M stored");
  const rb = await R.seatCopy("b"); assert(rb && rb.d.pad.length === 2990000 && rb.d.S.tai === 40, "big copy read back whole from its chunks");
  const over = snap("b", 41, 1); over.d.pad = "x".repeat(3000001); B.got = []; await msg(B, { t: "seat", sv: 2, o: over });
  assert(last(B, "error").code === "seatbig" && !last(B, "seatok") && (await R.seatCopy("b")).d.S.tai === 40, "over 3 M refused, older copy kept"); }
console.log("seat ALL OK");
