/* Thin guest part A on the Room DO (review/coop-thin-a): node test/thin.test.mjs (no network).
   thin level + capability check, host snap/delta with versions (stored, relayed to the guest only), guest do (relayed to the host only). */
import { Room, pathPut } from "../src/index.js";
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
const has = (s, t) => s.got.some(m => m.t === t);
await R.fetch(new Request("https://do/create?code=ABCD", { method: "POST" }));
const m = await R.loadMeta(); m.seats.a = { pid: "pidA" }; m.seats.b = { pid: "pidB" }; await R.saveMeta();
const A = ws("a"), B = ws("b"); const msg = (s, o) => R.webSocketMessage(s, JSON.stringify(o));
const clr = () => { A.got = []; B.got = []; };
/* 1. level: off until both seats said it, min of want/caps, 0 on different builds */
await msg(B, { t: "snap", v: 1, o: { x: 1 } }); assert(last(B, "error").code === "notyours", "guest cannot send a snap");
await msg(A, { t: "snap", v: 1, o: { x: 1 } }); assert(last(A, "error").code === "nothin" && !mem.has("hsnap"), "no snap while the room level is 0");
await msg(B, { t: "do", op: "x" }); assert(last(B, "error").code === "nothin", "no intent while the room level is 0");
await msg(A, { t: "thin", cap: 1, v: "b1", want: 1 }); assert(R.meta.thin === 0 && last(B, "thin").lvl === 0, "only the host said it: level 0");
await msg(B, { t: "thin", cap: 1, v: "b2", want: 9 }); assert(R.meta.thin === 0, "two builds: level 0 (build-match)");
await msg(B, { t: "thin", cap: 1, v: "b1", want: 9 }); assert(R.meta.thin === 1 && last(A, "thin").lvl === 1 && last(B, "thin").lvl === 1, "same build, want 1, caps 1/1: level 1, told to both");
assert(R.meta.tcap.b.want === 0, "the guest's want is ignored");
await msg(A, { t: "thin", cap: 3, v: "b1", want: 3 }); assert(R.meta.thin === 1, "level = min(want, cap a, cap b) = 1");
await msg(A, { t: "thin", cap: 3, v: "b1", want: 0 }); assert(R.meta.thin === 0, "host turns it off (want 0)");
await msg(A, { t: "thin", cap: 1, v: "b1", want: 1 });
/* 2. snap: stored, acked, relayed to the guest only */
clr(); await msg(A, { t: "snap", v: 5, o: { w: 1, S: { tai: 3, kids: [1, 2] }, R: [{ id: 1, rel: 2 }] } });
assert(last(A, "snapok").v === 5 && R.meta.hv === 5, "snap stored with version 5");
assert(last(B, "snap").v === 5 && last(B, "snap").o.S.tai === 3 && !has(A, "snap"), "snap relayed to the guest only");
/* 3. delta: on the stored version only; applied; relayed to the guest only */
clr(); await msg(A, { t: "delta", v: 6, base: 5, set: { "S.tai": 4, "S.kids": [1, 2, 3], "S.newo.x": 1 }, del: ["w"] });
let o = await R.getBig("hsnap"); assert(last(A, "snapok").v === 6 && o.S.tai === 4 && o.S.kids.length === 3 && o.S.newo.x === 1 && !("w" in o) && o.R[0].rel === 2, "delta applied on top of the stored snapshot");
assert(last(B, "delta").v === 6 && last(B, "delta").base === 5 && !has(A, "delta"), "delta relayed to the guest only");
clr(); await msg(A, { t: "delta", v: 7, base: 5, set: { "S.tai": 9 } }); assert(last(A, "error").code === "snapresync" && last(A, "error").v === 6 && !has(B, "delta"), "delta on a stale base: snapresync, not relayed");
assert((await R.getBig("hsnap")).S.tai === 4, "stored snapshot unchanged");
clr(); await msg(A, { t: "delta", v: 9, base: 6, set: { "S.tai": 9 } }); assert(last(A, "error").code === "snapresync", "version must be base + 1");
clr(); await msg(A, { t: "delta", v: 7, base: 6, set: { "S.__proto__.x": 1 } }); assert(last(A, "error").code === "snapresync" && !({}).x, "bad path refused");
clr(); await msg(B, { t: "delta", v: 7, base: 6, set: { "S.tai": 1 } }); assert(last(B, "error").code === "notyours", "guest cannot send a delta");
/* 4. snapreq + rejoin: the guest gets the stored full snapshot */
clr(); await msg(B, { t: "snapreq" }); assert(last(B, "snap").v === 6 && last(B, "snap").o.S.tai === 4, "snapreq: the stored snapshot, current version");
clr(); await msg(A, { t: "snapreq" }); assert(!has(A, "snap"), "host asks nothing");
/* 5. do: guest only, to the host only, with the room's sequence */
clr(); await msg(B, { t: "do", op: "act", args: { k: "x" }, base: 6, id: "i1" }); await msg(B, { t: "do", op: "go", args: null, base: 6, id: "i2" });
const d = A.got.filter(x => x.t === "do"); assert(d.length === 2 && d[0].n + 1 === d[1].n && d[0].op === "act" && d[0].args.k === "x" && d[0].from === "b" && d[1].id === "i2" && !has(B, "do"), "intents relayed to the host in one order");
clr(); await msg(A, { t: "do", op: "act" }); assert(last(A, "error").code === "notyours" && !has(B, "do"), "host sends no intent");
clr(); await msg(B, { t: "do", op: "act", args: "x".repeat(30000) }); assert(last(B, "error").code === "bado", "intent too big refused");
socks.splice(socks.indexOf(A), 1); clr(); await msg(B, { t: "do", op: "act", id: "i3" }); assert(last(B, "error").code === "nohost" && last(B, "error").id === "i3", "no host online: nohost");
socks.push(A);
/* 6. old messages untouched by the level */
clr(); await msg(B, { t: "act", k: "ctm-p2", mode: "x" }); assert(has(A, "act"), "old act relay still works");
/* 7. pathPut */
{ const x = { a: { b: 1 }, l: [1, 2] }; pathPut(x, "a.c.d", 2); pathPut(x, "a.b", null, true); pathPut(x, "z.q", null, true); assert(x.a.c.d === 2 && !("b" in x.a) && !("z" in x), "pathPut set/del"); }
console.log("thin ALL OK");
