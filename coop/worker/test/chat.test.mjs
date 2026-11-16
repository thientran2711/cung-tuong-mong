// Live chat test against the deployed Worker: node test/chat.test.mjs [baseUrl]
const BASE = process.argv[2] || "https://ctm-coop.victoria-tntt.workers.dev";
const WSB = BASE.replace(/^http/, "ws");
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function parse(d) { if (typeof d === "string") return JSON.parse(d); const buf = d instanceof Blob ? await d.arrayBuffer() : d;
  const ds = new DecompressionStream("gzip"); const w = ds.writable.getWriter(); w.write(new Uint8Array(buf)); w.close(); return JSON.parse(await new Response(ds.readable).text()); }
function client(code, pid, name) {
  const c = { got: [], ws: null, pid };
  c.open = () => new Promise((res, rej) => { const ws = new WebSocket(`${WSB}/api/room/${code}/ws?pid=${pid}&name=${encodeURIComponent(name)}`); ws.binaryType = "arraybuffer"; c.ws = ws;
    ws.onmessage = async e => { c.got.push(await parse(e.data)); }; ws.onopen = () => res(); ws.onerror = e => rej(e); });
  c.send = o => c.ws.send(JSON.stringify(o));
  c.wait = async (t, f = () => true, ms = 6000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const i = c.got.findIndex(m => m.t === t && f(m)); if (i >= 0) return c.got.splice(i, 1)[0]; await sleep(40); } throw new Error(name + " timeout " + t); };
  c.none = async (t, ms = 900) => { await sleep(ms); return !c.got.some(m => m.t === t); };
  return c;
}
const assert = (c, m) => { if (!c) throw new Error("FAIL " + m); console.log("ok", m); };
const mk = async () => (await (await fetch(BASE + "/api/room", { method: "POST" })).json()).code;
const code = await mk(), other = await mk();
const A = client(code, "chA" + Date.now(), "Lan"), B = client(code, "chB" + Date.now(), "Mai"), X = client(other, "chX" + Date.now(), "Khác");
await A.open(); let r = await A.wait("room"); assert(Array.isArray(r.chat) && r.chat.length === 0, "fresh room: empty chat history");
await B.open(); await B.wait("room"); await X.open(); await X.wait("room");
A.send({ t: "chat", text: "  Chào <b>bạn</b>\u0000 ơi  ", nm: "Lan Nhi", g: { y: 1, m: 3, t: 0, b: 1 } });
let a = await A.wait("chat"), b = await B.wait("chat");
assert(a.m.i === 1 && b.m.i === 1 && b.m.s === "a" && b.m.n === "Lan Nhi" && b.m.x === "Chào <b>bạn</b> ơi" && b.m.g.b === 1, "message reaches both seats (sender echo too), control chars stripped, html kept raw for the client to escape");
assert(await X.none("chat"), "other room never receives it (room-scoped)");
await sleep(400); B.send({ t: "chat", text: "x".repeat(900) });
b = await B.wait("chat"); assert(b.m.x.length === 300 && b.m.s === "b" && b.m.i === 2, "text cut at 300 chars, seat b, id 2");
await sleep(400); A.send({ t: "chat", text: "a".repeat(5000) }); let e = await A.wait("error"); assert(e.code === "toolarge", "frame over 2.4 KB refused");
A.send({ t: "chat", text: "nhanh 1" }); A.send({ t: "chat", text: "nhanh 2" }); e = await A.wait("error", m => m.code === "slow"); assert(e, "two sends within 350 ms: second refused (slow)");
await sleep(400); A.got.length = 0; B.got.length = 0; A.send({ t: "chat", text: "   " }); assert(await A.none("chat", 700), "blank text ignored");
for (let i = 0; i < 55; i++) { await sleep(380); (i % 2 ? B : A).send({ t: "chat", text: "tin " + i }); }
await sleep(900);
B.ws.close(); await sleep(500);
const B2 = client(code, B.pid, "Mai"); await B2.open(); r = await B2.wait("room");
assert(r.chat.length === 50 && r.chat[49].x === "tin 54" && r.chat[0].i < r.chat[49].i, "reconnect: room snapshot holds the last 50 in order");
const X2 = client(other, "chX2" + Date.now(), "Y"); await X2.open(); r = await X2.wait("room"); assert(r.chat.length === 0, "other room history empty (no cross-room read)");
const T = client(code, "chT" + Date.now(), "Ba"); await T.open(); r = await T.wait("error"); assert(r.code === "full", "third player gets full, no history");
A.ws.close(); B2.ws.close(); X.ws.close(); X2.ws.close(); console.log("ALL OK"); process.exit(0);
