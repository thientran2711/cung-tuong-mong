#!/usr/bin/env node
/* dev/test/kscue-loop.js — F10 regression: the «Kéo xuống» scroll cue (jksize kitScrollCues) and the option-card normaliser (j63 kaNorm1 / kaMO)
   must never feed each other. A scrollable element inside a dialog that is ALSO a normalised card (button.ka[data-ka="1"]) used to get a cue
   as its direct child → kaNorm1 moved it into .kan → the cue's MutationObserver re-ran kitScrollCues → a NEW cue → … an endless microtask
   chain (page hung, renderer +280 MB/min until the OOM kill: robot R1 b365, A4 b65, T1d timid-2 b77). Also checks a scroller whose height
   crosses the short/tall line when its cue comes and goes. PASS = the page answers within 3 s after each case and ≤ 2 cues per scroller.
   usage: node dev/test/kscue-loop.js [--url <site>] (default: the built site at the repo root) */
'use strict';
const { chromium } = require('playwright'); const path = require('path'); const D = require('./lib/device'), PP = require('./lib/playperf');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] }; const sleep = t => new Promise(r => setTimeout(r, t));
(async () => { let srv = null, url = opt('url'); if (!url) { srv = await D.serveRoot(path.resolve(__dirname, '../..')); url = srv.url }
  const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, opt('dev', 'fold'), { deviceScaleFactor: 1, serviceWorkers: 'block' }); const p = await ctx.newPage();
  const f = await D.openHost(p, url, { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  const alive = ms => Promise.race([f.evaluate(() => 1).then(() => true, () => true), sleep(ms).then(() => false)]);
  const CASES = {
    /* a long option card that scrolls inside itself (button.ka data-ka=1 with overflow auto) */
    card: () => { const M = document.getElementById('modal'); M.hidden = false; M.innerHTML = `<div class="dlg"><h2>thử</h2><div class="opts"><button class="ka card" data-ka="1" style="display:block;overflow-y:auto;height:160px"><span class="kat"><span class="kan">Một lựa chọn rất dài</span></span><span class="klead">${'Lời dài. '.repeat(400)}</span></button></div></div>`; kitScrollCues() },
    /* a scroller whose clientHeight sits on the short/tall line (260 px) and moves by the cue's own strip */
    edge: () => { const M = document.getElementById('modal'); M.hidden = false; M.innerHTML = `<div class="dlg" style="display:flex;flex-direction:column;height:276px"><div class="body" style="flex:1;min-height:0;overflow-y:auto">${'<p>dòng</p>'.repeat(200)}</div></div>`; kitScrollCues() },
    /* THE R1 case (26/11, RT_MOB record: #mb.body ⇄ div.kscue.sib): a tall column (#mb) whose DIRECT child is a short scroller (.opts) — the
       short one's strip (.kscue.sib, placed right after it) is also a direct child of #mb, so #mb had two «:scope > .kscue»: its keep-last
       observer moved one to the end, then the other, for ever */
    nested: () => { const M = document.getElementById('modal'); M.hidden = false; M.innerHTML = `<div class="dlg"><h2>thử</h2><div id="mb" class="body" style="display:block;overflow-y:auto;height:420px"><div class="opts" style="display:block;overflow-y:auto;height:150px">${'<p>lựa chọn</p>'.repeat(40)}</div>${'<p>dòng</p>'.repeat(120)}</div></div>`; kitScrollCues() }
  };
  let bad = 0; for (const [k, fn] of Object.entries(CASES)) { await Promise.race([f.evaluate(fn).catch(() => { }), sleep(4000)]); await sleep(1500); const ok = await alive(3000); const n = ok ? await f.evaluate(() => { let mx = 0; for (const e of document.querySelectorAll('#modal *')) { const c = e.querySelectorAll('.kscue').length; if (c > mx) mx = c } return mx }) : -1;
    const pass = ok && n <= 2; if (!pass) bad++; console.log(`${pass ? 'PASS' : 'FAIL'} ${k}: page answers ${ok}, cues in one scroller ${n}`); if (!ok) break; await f.evaluate(() => { const M = document.getElementById('modal'); M.innerHTML = ''; M.hidden = true }).catch(() => { }) }
  console.log(bad ? `FAIL ${bad}` : 'PASS all'); await Promise.race([b.close().catch(() => { }), sleep(5000)]); if (srv) srv.close(); process.exit(bad ? 1 : 0) })().catch(e => { console.error(e); process.exit(2) });
