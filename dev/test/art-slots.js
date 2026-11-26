// art-slots.js — every art slot a player can reach is a painted file on the CDN (owner OD 25/11 ~23:15Z: "không có được vẽ bất kỳ một cái hình gì bằng code").
// Family = every place where a missing file used to make the game show a code stand-in (kitPhNote callers j82 / j93 / jcraft / jslap, the mini-game
// figure-column backdrop, the §59 placeholders): the slot list is read from the LIVE game (KEG, KG82_KIND × ctx, KG82_SPR, CR_HAVE + the craft
// names, KG82_MGBG, KIT_PH) and checked against the CDN index img/_index.json.
//   node dev/test/art-slots.js [url]   (default: serves the worktree root on a free port)   → prints the table, exit 1 when a slot is missing
// Kinds the code deliberately skips (no board painting by design: duho/den/may, DOM boards KG82_BOARDBG) are listed as "by design".
const { chromium } = require("playwright"); const http = require("http"); const fs = require("fs"); const path = require("path");
const R = path.resolve(__dirname, "..", "..");
function serve() { return new Promise(res => { const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html"; const f = path.join(R, p);
  fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return } const ext = path.extname(f); r.writeHead(200, { "content-type": ext === ".html" ? "text/html" : ext === ".js" ? "text/javascript" : ext === ".json" ? "application/json" : "application/octet-stream" }); r.end(b) }) });
  s.listen(0, () => res(s)) }) }
(async () => {
  let url = process.argv[2], srv = null; if (!url) { srv = await serve(); url = `http://127.0.0.1:${srv.address().port}/index.html` }
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 755, height: 1000 } });
  await pg.goto(url, { waitUntil: "domcontentloaded" });
  await pg.waitForFunction(() => typeof KIT_CDNHAVE !== "undefined" && KIT_CDNHAVE && typeof KG82_KIND !== "undefined" && typeof KEG !== "undefined", null, { timeout: 90000 });
  const rows = await pg.evaluate(() => {
    const H = KIT_CDNHAVE, out = [], add = (fam, where, slot, note) => { slot = String(slot).replace(/^.*?(?=img\/)/, ""); out.push({ fam, where, slot, on: H.has(slot), note: note || "" }) };
    // 1. entry gate (j93 kitEntryGate): scene per kind + the door leaves of the kinds that have doors
    for (const k of Object.keys(KEG)) { add("entry", "j93 kitEntryGate", `img/kit/entry-gate-bg-${k}.webp`); for (const d of (typeof kegDoors === "function" ? kegDoors(k) : [])) add("entry", "j93 kitEntryGate " + k, `img/kit/${d}.webp`) }
    // 2. mini-game board painting (j82 kg82Pic / kg82Bg): every kind × contest ("thi") and lesson ("hoc") room
    const skip = k => ["duho", "den", "may"].includes(k) || (typeof KG82_BOARDBG !== "undefined" && KG82_BOARDBG.has(k));
    const ctx0 = KG82.ctx, seen = new Set();
    for (const k of Object.keys(KG82_KIND)) for (const c of ["thi", "hoc"]) { KG82.ctx = c; const n = kg82BgName(k), s = `img/kit/mg-${n}.webp`; if (seen.has(s)) continue; seen.add(s);
      if (skip(k)) out.push({ fam: "mg-board", where: "j82 kg82Pic " + k, slot: s, on: true, note: "by design: no board painting (DOM board / own art)" }); else add("mg-board", "j82 kg82Pic " + k, s) }
    KG82.ctx = ctx0;
    // 3. mini-game sprites (j82 KG82_SPR, jslap preload)
    for (const k in KG82_SPR) for (const n of KG82_SPR[k]) { const s = `img/kit/mg-${n}.webp`; if (seen.has(s)) continue; seen.add(s); add("mg-sprite", "j82 KG82_SPR " + k, s) }
    // 4. craft sprites (jcraft crArt): CR_HAVE + every name the craft boards ask for
    const craft = (typeof CR_SLOTS !== "undefined" ? CR_SLOTS : []).concat(typeof CR_HAVE !== "undefined" ? [...CR_HAVE] : []);
    for (const n of craft) { const s = `img/kit/mg-${n}.webp`; if (seen.has(s)) continue; seen.add(s); add("mg-craft", "jcraft crArt", s) }
    // 5. figure-column backdrop of the mini-game frame (j82 KG82_MGBG): every kind that opens a frame with a figure
    for (const k of Object.keys(KG82_KIND)) { const s = String(KG82_MGBG[k]).replace(/^.*?(?=img\/)/, ""); if (seen.has(s)) continue; seen.add(s); add("mg-figbg", "j82 KG82_MGBG " + k, s) }
    // 6. §59 placeholders (painted stand-ins for events / acts / options)
    for (const g in KIT_PH) for (const t in KIT_PH[g]) { const s0 = KIT_PH[g][t]; if (typeof s0 !== "string") continue; const s = s0.replace(/^.*?(?=img\/)/, ""); if (seen.has(s)) continue; seen.add(s); add("ph59", "jph KIT_PH." + g, s) }
    // 7. the game's OWN lookups find every painted slot (review/art-slots: kegPic / kg82Pic compared the full CDN url with the «img/…» index keys → never found)
    for (const k of Object.keys(KEG)) { const r = kegPic("entry-gate-bg-" + k); out.push({ fam: "lookup", where: "kegPic " + k, slot: "img/kit/entry-gate-bg-" + k + ".webp", on: !!r, note: r ? "" : "kegPic returned empty" }) }
    for (const k of Object.keys(KG82_KIND)) { if (skip(k)) continue; KG82.ctx = "thi"; const r = kg82Pic(k); out.push({ fam: "lookup", where: "kg82Pic " + k, slot: "img/kit/mg-" + kg82BgName(k) + ".webp", on: !!r, note: r ? "" : "kg82Pic returned empty" }) }
    KG82.ctx = ctx0;
    return out });
  await b.close(); if (srv) srv.close();
  const miss = rows.filter(r => !r.on);
  const fams = [...new Set(rows.map(r => r.fam))];
  console.log("| family | slots | on CDN | missing |\n|---|---|---|---|"); for (const f of fams) { const L = rows.filter(r => r.fam === f); console.log(`| ${f} | ${L.length} | ${L.filter(r => r.on).length} | ${L.filter(r => !r.on).length} |`) }
  if (process.env.ART_SLOTS_ALL) for (const r of rows) console.log([r.fam, r.where, r.slot, r.on ? "on CDN" : "MISSING", r.note].join(" | "));
  for (const r of miss) console.log("MISSING", r.fam, "|", r.where, "|", r.slot);
  console.log(miss.length ? `FAIL: ${miss.length} reachable art slot(s) not on the CDN` : `PASS: all ${rows.length} reachable art slots are on the CDN`);
  process.exit(miss.length ? 1 : 0)
})().catch(e => { console.error(e); process.exit(2) });
