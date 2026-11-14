// Live protocol test against the deployed Worker: node test/ws.test.mjs [baseUrl]
const BASE = process.argv[2] || "https://ctm-coop.victoria-tntt.workers.dev";
const WSB = BASE.replace(/^http/, "ws");
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function parse(d) {
  if (typeof d === "string") return JSON.parse(d);
  const buf = d instanceof Blob ? await d.arrayBuffer() : d;
  const ds = new DecompressionStream("gzip"); const w = ds.writable.getWriter(); w.write(new Uint8Array(buf)); w.close();
  return JSON.parse(await new Response(ds.readable).text());
}
function client(code, pid, name) {
  const c = { got: [], ws: null };
  c.open = () => new Promise((res, rej) => {
    const ws = new WebSocket(`${WSB}/api/room/${code}/ws?pid=${pid}&name=${encodeURIComponent(name)}`); ws.binaryType = "arraybuffer"; c.ws = ws;
    ws.onmessage = async e => { const m = await parse(e.data); c.got.push(m); };
    ws.onopen = () => res(); ws.onerror = e => rej(e);
  });
  c.send = o => c.ws.send(JSON.stringify(o));
  c.wait = async (t, f = () => true, ms = 8000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const i = c.got.findIndex(m => m.t === t && f(m)); if (i >= 0) return c.got.splice(i, 1)[0]; await sleep(50); } throw new Error(name + " timeout waiting " + t); };
  return c;
}
const assert = (c, m) => { if (!c) throw new Error("FAIL " + m); console.log("ok", m); };
const { code } = await (await fetch(BASE + "/api/room", { method: "POST" })).json();
console.log("room", code);
const A = client(code, "pidA" + Date.now(), "Chủ phòng"), B = client(code, "pidB" + Date.now(), "Bạn");
await A.open(); let r = await A.wait("room"); assert(r.you === "a" && r.state === null, "host seat a, no state");
const big = "x".repeat(300000);
A.send({ t: "init", state: { v: 1, W: { S: { month: 3, tuan: 0, pad: big }, R: [{ id: 1, suc: 50 }] }, P: { a: { S: { bac: 10 } } } } });
await A.wait("state");
await B.open(); r = await B.wait("room"); assert(r.you === "b" && r.state && r.state.W.S.pad.length === 300000, "guest seat b gets big state (gzip)");
let p = await A.wait("presence", m => m.seats.b && m.seats.b.online); assert(p, "host sees guest online");
B.send({ t: "me", P: { S: { bac: 20 } } }); await A.wait("state", m => m.by === "b");
for (let w = 0; w < 3; w++) {
  const base = (await (async () => { return null })()) ;
  A.send({ t: "end", week: w, state: { v: 1, W: { S: { month: 3, tuan: w + 1 }, R: [{ id: 1, suc: 50 + 4 * (w + 1) }] }, P: { a: { S: { bac: 10 + w } }, b: { S: { bac: 20 } } } } });
  await A.wait("presence", m => m.ended.a);
  B.send({ t: "end", week: w, state: { v: 1, W: { S: { month: 3, tuan: w + 1 }, R: [{ id: 1, suc: 50 + 4 * w - 6 }] }, P: { a: { S: { bac: 10 } }, b: { S: { bac: 5 } } } } });
  const wa = await A.wait("week"), wb = await B.wait("week");
  assert(wa.week === w + 1 && wb.week === w + 1, "week " + (w + 1) + " broadcast to both");
  if (w === 0) assert(wa.state.W.R[0].suc === 48 && wa.state.P.b.S.bac === 5 && wa.state.W.S.pad === undefined, "merged values");
}
// per-buổi sync (phase 2)
A.send({ t: "bend", week: 3, buoi: 0 }); let bd = await B.wait("bended"); assert(bd.bended.a && !bd.bended.b, "bend a seen");
A.send({ t: "where", week: 3, buoi: 1, W: { emp: "vuon", 3: "vuon" } });
B.send({ t: "bend", week: 3, buoi: 0 }); const ba = await A.wait("buoi"), bb = await B.wait("buoi"); assert(ba.buoi === 1 && bb.buoi === 1, "both bend → buổi 1");
const wh = await B.wait("where"); assert(wh.W.emp === "vuon", "guest gets host where");
B.send({ t: "pos", place: "vuon", khac: 2, week: 3, buoi: 1 }); const ps = await A.wait("pos"); assert(ps.from === "b" && ps.place === "vuon", "pos relayed");
A.send({ t: "act", id: 7, k: "talk" }); const ac = await B.wait("act"); assert(ac.from === "a" && ac.k === "talk", "act relayed");
B.send({ t: "actr", id: 7, ok: true }); const ar = await A.wait("actr"); assert(ar.ok && ar.from === "b", "actr relayed");
B.ws.close(); p = await A.wait("presence", m => m.seats.b && !m.seats.b.online); assert(p, "host sees guest offline (freeze)");
const info = await (await fetch(BASE + "/api/room/" + code)).json(); assert(info.week === 3 && !info.seats.b.online, "info after leave");
const B2 = client(code, B.ws.url.match(/pid=([^&]+)/)[1], "Bạn"); await B2.open(); r = await B2.wait("room");
assert(r.you === "b" && r.week === 3 && r.state.week === 3 && r.buoi === 1 && r.pos.b.place === "vuon" && r.where.W.emp === "vuon", "guest reconnects to same seat, week, buổi, pos, where");
await A.wait("presence", m => m.seats.b && m.seats.b.online);
const C3 = client(code, "pidC" + Date.now(), "Người thứ ba"); await C3.open(); r = await C3.wait("error"); assert(r.code === "full", "third player refused");
A.ws.close(); B2.ws.close(); console.log("ALL OK"); process.exit(0);
