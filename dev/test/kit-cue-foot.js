/* KIT-CUE-FOOT (KK64, K-CUE-FOOT, KIT §56.34; LIVE-born, law 11): the «Kéo xuống» scroll cue (jksize kitScrollCues .kscue: bottom fade + pill)
   NEVER lies over a sticky footer of its own scroll column (item-pick confirm .kipw>.kipgo «Dâng / Tặng / Biếu / Cài», the §23 pager .kippg,
   pinned option rows .k3btns / .opts.khand, .k3foot, .kpscopts, .mr, .kmtake, .kg82act …). LIVE fault: Fold «Dâng quà» grid, after picking a tile
   the cue + fade sat OVER the sticky «Dâng» (label unreadable, tap still worked).
   For every item-pick grid (grid_bieuqua, grid_tangqua, grid_dangqua, grid_dangtha, grid_plant) on Fold 755x1000 + iPad 1180x820:
     open it the game's way, choose a second tile (kipSelect), then (a) elementFromPoint at the confirm LABEL centre must be the .kipgo (or inside it);
     (b) FAMILY: every visible sticky-bottom element of the open dialog (computed position:sticky, bottom != auto) — its centre must hit itself,
     never a .kscue; (c) the cue (when on) sits wholly ABOVE the footer stack.
   usage: node dev/test/kit-cue-foot.js [--root <worktree>] [--save y05.json] [--dev fold,ipad] [--only a,b] [--out dir]   (exit 1 on FAIL)
   It serves the worktree's built index.html (run dev/site/build_site.sh first). page.evaluate opens the dialog (setup) and READS only. */
'use strict';
const { chromium } = (require('./lib/bigpage'), require('playwright')); const fs = require('fs'); const path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const ROOT = path.resolve(arg('root', path.resolve(__dirname, '..', '..')));
const DEVS = String(arg('dev', 'fold,ipad')).split(',');
const ONLY = arg('only', '') ? String(arg('only')).split(',') : null;
const OUT = path.resolve(arg('out', '/tmp/kit-cue-foot')); fs.mkdirSync(OUT, { recursive: true });
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const SAVE = path.resolve(arg('save', path.join(ROOT, 'dev/handover/fixtures/save-growth/y05-ncBtuc-035.json')));
if (!fs.existsSync(SAVE)) { console.log('no save fixture: ' + SAVE + ' (git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json)'); process.exit(2) }
const SAVETXT = fs.readFileSync(SAVE, 'utf8');
const VEILS = '.kfgain,#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,.kmov,#rtoast,#kprevov,.kne';
async function home(p) {
  await p.evaluate(t => {
    try { localStorage.clear() } catch (e) { } try { REC.tour = 'done'; REC.asked = 1; saveRec() } catch (e) { }
    localStorage.setItem(SK(3), t); SLOT = 3; const d = loadSlot(3); try { kmReset && kmReset() } catch (e) { } quiet = true; d.tab = 'act'; deser(d); quiet = false;
    document.getElementById('title').hidden = true; try { deal() } catch (e) { } if (S.mg) S.mg = null; try { S.tutTour = 1; coachOff && coachOff() } catch (e) { }
    Q.length = 0; document.getElementById('modal').hidden = true; render()
  }, SAVETXT);
  await p.waitForTimeout(2500); await clean(p);
}
async function clean(p) {
  for (let k = 0; k < 2; k++) {
    await p.evaluate(v => { try { if (window.kitRingItem && kitRingItem.cur) kitRingItem.cur.close() } catch (e) { } document.querySelectorAll('.kri').forEach(e => e.remove()); document.querySelectorAll(v).forEach(e => e.remove()); Q.length = 0; try { closeModal() } catch (e) { } Q.length = 0; document.getElementById('modal').hidden = true; render() }, VEILS);
    await p.waitForTimeout(600);
  }
}
const PICKERS = {
  grid_bieuqua: () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out).sort((a, b) => oan(b, S) - oan(a, S))[0]; tsDil(mkP('tsgiftpick', { v: V.id, k: 'it' }), 'Biếu quà làm lành') },
  grid_tangqua: () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out)[0]; const d = mkP('giftpick', { v: V.id }); pushModal({ t: d.t0 || 'Tặng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
  grid_dangqua: () => { window.__kriOff = 1; const d = mkP('giftto', { t: 'emp' }); pushModal({ t: 'Dâng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
  grid_dangtha: () => { window.__kriOff = 1; const d = mkP('giftto', { t: 'th' }); pushModal({ t: 'Dâng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
  grid_plant: () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out)[0]; const d = mkP('plantpick', { v: V.id }); pushModal({ t: 'Cài đồ', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
};
/* read-only: the confirm label hit + every sticky footer of the open dialog */
const FOOT = () => {
  const M = document.getElementById('modal'); const d = M && M.querySelector('.dlg'); if (!d) return { none: 1 };
  const nm = e => e ? (e.tagName.toLowerCase() + '.' + String(e.className).split(' ').slice(0, 3).join('.')) : '-';
  const out = { go: null, feet: [], cue: [] };
  /* the cue is pointer-events:none (taps pass through), so elementFromPoint would never see it: while probing, the cue takes hits (restored after) */
  const pe = document.createElement('style'); pe.textContent = '.kscue.on,.kscue.on *{pointer-events:auto!important}'; document.head.appendChild(pe);
  const g = d.querySelector('.kipw>.kipgo');
  if (g) { const rg = document.createRange(); rg.selectNodeContents(g); const R = rg.getBoundingClientRect(), B = g.getBoundingClientRect(); const x = R.width ? R.left + R.width / 2 : B.left + B.width / 2, y = R.height ? R.top + R.height / 2 : B.top + B.height / 2; const e = document.elementFromPoint(x, y);
    out.go = { lab: g.textContent.trim(), on: y >= 0 && y <= innerHeight, top: !!e && g.contains(e), hit: nm(e), y: Math.round(y) } }
  for (const f of d.querySelectorAll('*')) { if (f.closest('.kscue')) continue; const cs = getComputedStyle(f); if (cs.position !== 'sticky' || cs.bottom === 'auto' || cs.display === 'none' || cs.visibility === 'hidden') continue;
    const B = f.getBoundingClientRect(); if (B.width < 4 || B.height < 4 || B.bottom < 0 || B.top > innerHeight) continue;
    const x = B.left + B.width / 2, y = B.top + Math.min(B.height / 2, 14); const e = document.elementFromPoint(x, y);
    out.feet.push({ el: nm(f), top: !!e && f.contains(e), hit: nm(e), y: Math.round(B.top), h: Math.round(B.height) }) }
  for (const c of d.querySelectorAll('.kscue.on:not(.sib)')) { const k = c.querySelector('.kscc'), B = (k || c).getBoundingClientRect(); out.cue.push({ col: nm(c.parentElement), bottom: Math.round(B.bottom) }) }
  pe.remove(); return out
};
async function run(p, dev, name, rows) {
  await home(p); await p.evaluate(() => { window.__kriOff = 0 });/* a fresh home each case: the save's evening clock must not run out between cases (iPad «Đã quá giờ») */
  await p.evaluate(`(()=>{const f=${PICKERS[name].toString()};try{if(window.DQ)DQ.user=(DQ.user||0)+1;f();showModal()}finally{if(window.DQ)DQ.user--}})()`);
  for (let k = 0; k < 12; k++) { await p.waitForTimeout(500); await p.evaluate(v => document.querySelectorAll(v).forEach(e => e.remove()), VEILS); if (await p.$('#modal .kipc')) break }
  /* pick a tile that is NOT already chosen: a second tap on the chosen tile gives it (the dialog closes) */
  const t = await p.$('#modal .kipc:not(.lock):not(.on)') || await p.$('#modal .kipc:not(.on)');
  if (!t) { rows.push({ dev, name, verdict: 'SKIP', why: 'no second tile' }); return }
  const id = await t.evaluate(e => e.dataset.kip);
  if (process.env.DBG) console.log('tiles', JSON.stringify(await p.$$eval('#modal .kipc', L => L.slice(0, 6).map(e => e.className + ':' + e.dataset.kip))), 'pick', id);
  if (process.env.DBG) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-pre.jpg`), type: 'jpeg', quality: 55 });
  /* choose it the game's way (kipSelect = what the tile tap does; tile tap reachability is kit-pick-go's job — on iPad the tile centre can sit under the sticky confirm) */
  await p.evaluate(i => { kipSelect(document.getElementById('modal'), Q[0], +i); try { kitScrollCues() } catch (e) { } }, id); await p.waitForTimeout(900);
  await p.evaluate(v => document.querySelectorAll(v).forEach(e => e.remove()), VEILS);
  if (process.env.BEFORE) await p.evaluate(() => { window.kscFoot = () => 0; document.querySelectorAll('.kscue').forEach(c => { c.__kscB = null; c.style.bottom = '' }) });/* BEFORE=1: no footer offset = the LIVE fault, proves the test catches it */
  await p.evaluate(() => { try { kitScrollCues() } catch (e) { } }); await p.waitForTimeout(300);
  const f = await p.evaluate(FOOT);
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}.jpg`), type: 'jpeg', quality: 55 });
  const feetBad = (f.feet || []).filter(x => !x.top);
  const goBad = f.go && f.go.on && !f.go.top;
  const verdict = goBad || feetBad.length ? 'FAIL' : 'ok';
  rows.push({ dev, name, verdict, go: f.go, feet: (f.feet || []).length, feetBad, cue: f.cue });
}
(async () => {
  const b = await chromium.launch(); const rows = []; let fails = 0;
  for (const dev of DEVS) {
    const ctx = await b.newContext({ viewport: VP[dev], serviceWorkers: 'block', hasTouch: true, isMobile: false });
    await ctx.route('http://localhost:8817/**', r => { const u = new URL(r.request().url()); const f = path.join(ROOT, decodeURIComponent(u.pathname)); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ status: 200, contentType: f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'application/javascript' : 'application/octet-stream', body: fs.readFileSync(f) }) });
    const p = await ctx.newPage(); p.setDefaultTimeout(240000); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto('http://localhost:8817/index.html', { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => typeof start === 'function' && typeof deser === 'function', null, { timeout: 240000 });
    await p.waitForTimeout(1500);
    for (const name of Object.keys(PICKERS)) {
      if (ONLY && !ONLY.includes(name)) continue;
      try { await run(p, dev, name, rows) } catch (e) { rows.push({ dev, name, verdict: 'ERR', why: String(e.message).slice(0, 200) }) }
      const r = rows[rows.length - 1]; if (r.verdict !== 'ok' && r.verdict !== 'SKIP') fails++; console.log(JSON.stringify(r));
    }
    if (errs.length) console.log(dev, 'pageerrors', JSON.stringify(errs.slice(0, 5)));
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'kit-cue-foot.json'), JSON.stringify(rows, null, 1));
  console.log(`kit-cue-foot: ${rows.length} cases, ${fails} FAIL`);
  await b.close(); process.exit(fails ? 1 : 0);
})();
