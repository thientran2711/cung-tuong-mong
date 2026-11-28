#!/usr/bin/env node
/* ka-know.js — LAW 11 family check (ROOT D 25/11, review/talk-others-people): every way she LEARNS something inside an act must show in the
   §7 result card (resultShow, j63) as a gain («Được»), never «Ghi chú: ta không được gì, cũng không mất gì».
   The knowledge hubs: noteAdd (j21, her Sổ), kitKnow (jnotice KNOW-NOTICE), intelAdd (j78 tin / secrets) — every learn path ends in one of them
   (learnTrait / trait-by-deed j28, k61Know j61, intelLearn j78, jmen / j92 / j95 / jagknow intelAdd).
   usage: node dev/test/ka-know.js <index.html> [label]   → one table row per case; exit 1 when a learn case shows «không được gì»
   or the control case (nothing learned) shows a gain. Unit check: page.evaluate calls the game's own functions (not a player robot). */
'use strict';
const { chromium } = require('playwright');
const [HTML, LAB] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 755, height: 1000 } });
  await p.route(u => !/^file:/.test(String(u)), r => r.abort());
  await p.goto('file://' + HTML, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500);
  await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('#slots button[data-new="1"]').click()); await p.waitForTimeout(1500);
  const rows = await p.evaluate(() => {
    const out = []; const v = (typeof liveRivals === 'function' ? liveRivals(true) : rivals).find(x => x && x !== S && x.alive) || rivals[1];
    const cases = [
      ['learnTrait shown (Hỏi chuyện / Hỏi lén talk)', () => { S.trK = S.trK || {}; S.trK[v.id] = []; return learnTrait(v, 'Thử kể', 1) }],
      ['learnTrait with notice', () => { S.trK[v.id] = []; return learnTrait(v, 'Thử kể') }],
      ['noteAdd shown (Sổ line, card already told)', () => noteAdd(v.id, 'Thử: nàng hay đi dạo Ngự hoa viên', 1)],
      ['intelLearn (tin / secret, j78)', () => { S.intel = {}; return intelLearn(v, 1, { by: 'Thử', how: 'dò la' }) }],
      ['kitKnow only (KNOW-NOTICE)', () => kitKnow({ key: 'test:k', pri: 1, text: 'Ngươi biết thêm một chuyện.' })],
      ['CONTROL: nothing learned', () => '']
    ];
    for (const [n, f] of cases) {
      let r = ''; const b0 = rsnap(); try { r = f() } catch (e) { r = 'ERR ' + e.message } try { log('Thử việc xong.') } catch (e) {}/* an act always writes its log line */ window.kaLastResult = null;
      const bot = window.__bot; window.__bot = null; try { resultShow('Thử', b0, null) } catch (e) {} window.__bot = bot;
      const k = window.kaLastResult; const rs = k ? k.rows : null;
      out.push({ n, fn: String(r).slice(0, 50), rows: rs ? rs.map(x => x.label + ': ' + x.items.join(' · ')).join(' | ').slice(0, 160) : '(no card)', gain: !!(rs && rs.some(x => x.k === 'duoc')), none: !!(rs && rs.some(x => x.k === 'note')) });
    }
    return out });
  await b.close();
  let bad = 0; console.log(`| ${LAB || HTML} case | card | ok |\n|---|---|---|`);
  for (const r of rows) { const ctl = /^CONTROL/.test(r.n); const ok = ctl ? !r.gain : r.gain && !r.none; if (!ok) bad++; console.log(`| ${r.n} | ${r.rows} | ${ok ? 'PASS' : 'FAIL'} |`) }
  console.log((bad ? 'FAIL' : 'PASS') + ' ka-know ' + (rows.length - bad) + '/' + rows.length); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) });
