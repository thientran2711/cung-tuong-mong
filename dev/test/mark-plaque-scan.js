/* MARK-PLAQUE SCAN (KK67, law 11 family of RV-179 Fold «Biếu quà làm lành»: the «ta ở đây» marker lay on the dialog name plaque over «Quý phi»).
   NO head mark and NO figure may lie on plaque / rank / title / name-tag text, on any dialog or stage, Fold 755x1000 + iPad 1180x820.
   TEXT  = the glyph boxes (Range.getClientRects) of every text node inside a plaque part: .kpsn / .kdpcap figcaption plaques, .kname, .kdh title pills,
           #kpname, stage name tags (.tok .tag, #j59metag .tag), ring tags (.kring-tg), .kchip.
   MARKS = every head mark on screen: .kmemark («ta ở đây»), img.kfseal (mood seal), .khead (speech head mark), .ksay (speech bubble).
   Checks per screen:
     P1 mark-on-text  : a visible mark box (grown 1 px) overlaps a text glyph box by > 2x2 px (under or over the text: either way the word is spoiled)
     P2 paint-over    : at 5 points of each glyph box the TOP painted element (pointer-events forced on for the probe) is a figure picture or a mark
                        (figure img.kesimg / #mefig / .tok img / anything inside a mark) — something paints over the word
   Screens: generic person dialogs through the game's own pushModal → kitEventStage (stage [her], [her, rival], [rival, her], long body),
            the item pickers (Biếu quà làm lành grid, Tặng quà, Dâng quà), at her rank AND at rank 7 (the biggest marker, longest rank words);
            stages: home + every place of places() at her rank.
   usage: node dev/test/mark-plaque-scan.js --save y05.json [--dev fold,ipad] [--only a,b] [--out dir]   (serves the worktree's built index.html; exit 1 on any hit)
   page.evaluate only opens screens (setup) and READS them. */
'use strict';
const { chromium } = (require('./lib/bigpage'), require('playwright')); const fs = require('fs'); const path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const ROOT = path.resolve(arg('root', path.resolve(__dirname, '..', '..')));
const DEVS = String(arg('dev', 'fold,ipad')).split(',');
const ONLY = arg('only', '') ? String(arg('only')).split(',') : null;
const OUT = path.resolve(arg('out', '/tmp/mark-plaque-scan')); fs.mkdirSync(OUT, { recursive: true });
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const SAVE = path.resolve(arg('save', path.join(ROOT, 'dev/handover/fixtures/save-growth/y05-ncBtuc-035.json')));
if (!fs.existsSync(SAVE)) { console.log('no save fixture: ' + SAVE + ' (git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json > y05.json)'); process.exit(2) }
const SAVETXT = fs.readFileSync(SAVE, 'utf8');
const VEILS = '.kfgain,#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,.kmov,#rtoast,#kprevov,.kne';

async function home(p, rank) {
  await p.evaluate(([t, rank]) => {
    try { localStorage.clear() } catch (e) { } try { REC.tour = 'done'; REC.asked = 1; saveRec() } catch (e) { }
    localStorage.setItem(SK(3), t); SLOT = 3; const d = loadSlot(3); try { kmReset && kmReset() } catch (e) { } quiet = true; d.tab = 'act'; deser(d); quiet = false;
    if (rank != null) { S.rank = rank; try { kmmOwned() } catch (e) { } }
    document.getElementById('title').hidden = true; try { deal() } catch (e) { } if (S.mg) S.mg = null; try { S.tutTour = 1; coachOff && coachOff() } catch (e) { }
    Q.length = 0; document.getElementById('modal').hidden = true; render()
  }, [SAVETXT, rank]);
  await p.waitForTimeout(2500); await clean(p);
}
async function clean(p) {
  for (let k = 0; k < 2; k++) {
    await p.evaluate(v => { try { if (window.kitRingItem && kitRingItem.cur) kitRingItem.cur.close() } catch (e) { } document.querySelectorAll('.kri').forEach(e => e.remove()); document.querySelectorAll(v).forEach(e => e.remove()); Q.length = 0; try { closeModal() } catch (e) { } Q.length = 0; document.getElementById('modal').hidden = true }, VEILS).catch(() => { });
    await p.waitForTimeout(500);
  }
}
const LONG = '<p>' + 'Trong cung lời đồn lan nhanh như gió, người này nói với người kia, chẳng ai biết thật giả ra sao. '.repeat(6) + '</p>';
const DLG = {
  ev_me: `(()=>{Q.push({t:'Chuyện trong cung',h:'<p>Tiểu chủ ngồi bên song cửa, ngắm hoa mai nở.</p>',opts:[{n:'Lui'}],stage:[S]});showModal()})()`,
  ev_me_rival: `(()=>{const V=rivals.filter(x=>x.alive!==false&&!x.out)[0];Q.push({t:'Gặp gỡ',h:'<p>Hai người gặp nhau ở hành lang.</p>',opts:[{n:'Lui'}],stage:[S,V]});showModal()})()`,
  ev_rival_me: `(()=>{const V=rivals.filter(x=>x.alive!==false&&!x.out)[1]||rivals[0];Q.push({t:'Gặp gỡ',h:'<p>Nàng ta bước tới chào.</p>',opts:[{n:'Lui'}],stage:[V,S]});showModal()})()`,
  ev_me_long: `(()=>{Q.push({t:'Lời đồn trong cung',h:${JSON.stringify(LONG)},opts:[{n:'Lui'},{n:'Thôi'}],stage:[S]});showModal()})()`,
  grid_bieuqua: `(()=>{window.__kriOff=1;const V=rivals.filter(x=>x.alive!==false&&!x.out).sort((a,b)=>oan(b,S)-oan(a,S))[0];tsDil(mkP('tsgiftpick',{v:V.id,k:'it'}),'Biếu quà làm lành');showModal()})()`,
  pick_tangqua: `(()=>{window.__kriOff=1;const V=rivals.filter(x=>x.alive!==false&&!x.out)[0];const d=mkP('giftpick',{v:V.id});pushModal({t:'Tặng quà',h:d.t,opts:d.o,pid:d.pid,who:V});showModal()})()`,
  pick_dangqua: `(()=>{window.__kriOff=1;const d=mkP('giftto',{t:'emp'});pushModal({t:'Dâng quà',h:d.t,opts:d.o,pid:d.pid});showModal()})()`,
};
/* read: every plaque text glyph box vs every mark + the top painted element (read-only; the probe style is removed at once) */
const CHECK = (scope) => {
  const TXT = '.kpsn,.kdpcap,.kname,.kdh,#kpname,.tok .tag,#j59metag .tag,.kring-tg,.kchip';
  const MK = '.kmemark,img.kfseal,.khead,.ksay';
  const root = scope === 'modal' ? document.getElementById('modal') : document.getElementById('stage');
  if (!root) return { err: 'no ' + scope };
  const vis = e => { if (!e || !e.isConnected) return false; const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; for (let x = e; x && x.nodeType === 1; x = x.parentElement) { const c = getComputedStyle(x); if (c.visibility === 'hidden' || c.display === 'none' || +c.opacity < .15) return false } return true };
  const VW = innerWidth, VH = innerHeight;
  /* the part of a box really on screen: clipped by every overflow ancestor (a word scrolled out of its box is not «covered») */
  const clip = (e, r) => { let L = r.left, T = r.top, R = r.right, B = r.bottom; for (let x = e; x && x.nodeType === 1 && x !== document.body; x = x.parentElement) { const c = getComputedStyle(x); if (c.overflowX !== 'visible' || c.overflowY !== 'visible') { const q = x.getBoundingClientRect(); L = Math.max(L, q.left); T = Math.max(T, q.top); R = Math.min(R, q.right); B = Math.min(B, q.bottom) } } return { left: L, top: T, right: R, bottom: B, width: R - L, height: B - T } };
  const marks = [...document.querySelectorAll(MK)].filter(vis).map(e => ({ e, r: clip(e, e.getBoundingClientRect()), k: e.matches('.kmemark') ? 'me' : e.matches('img.kfseal') ? 'seal' : e.matches('.ksay') ? 'say' : 'head' }));
  const st = document.createElement('style'); st.textContent = '*{pointer-events:auto!important}'; document.head.appendChild(st);
  const hits = []; let nText = 0; const seen = new Set();
  for (const host of root.querySelectorAll(TXT)) {
    if (!vis(host)) continue; if (host.closest('.kipc,.kshc')) continue;/* item tiles of the pick grid: no figure / mark lives there */
    const tw = document.createTreeWalker(host, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) {
      if (seen.has(n) || !n.nodeValue.trim()) continue; seen.add(n); if (!vis(n.parentElement)) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const g0 of rg.getClientRects()) {
        const g = clip(n.parentElement, g0);
        if (g.width < 3 || g.height < 3 || g.bottom < 0 || g.top > VH || g.right < 0 || g.left > VW) continue; nText++;
        const word = n.nodeValue.trim().slice(0, 30);
        for (const m of marks) { if (host.closest(MK) === m.e) continue; const w = Math.min(g.right, m.r.right + 1) - Math.max(g.left, m.r.left - 1), h = Math.min(g.bottom, m.r.bottom + 1) - Math.max(g.top, m.r.top - 1); if (w > 2 && h > 2) hits.push({ rule: 'P1', word, mark: m.k, ov: Math.round(w) + 'x' + Math.round(h), at: [g.left, g.top].map(Math.round) }) }
        const pts = [[.5, .5], [.2, .3], [.8, .3], [.2, .7], [.8, .7]];
        for (const [fx, fy] of pts) {
          const x = g.left + g.width * fx, y = g.top + g.height * fy; const top = document.elementFromPoint(x, y); if (!top) continue;
          if (top === n.parentElement || n.parentElement.contains(top) || top.contains(n.parentElement)) continue;
          const mk = top.closest(MK); const fig = top.matches('img.kesimg,#mefig,.tok img,img.figimg') ? top : null;
          if (mk || fig) { hits.push({ rule: 'P2', word, by: mk ? (mk.className || mk.tagName) : (fig.id || fig.className), at: [x, y].map(Math.round) }); break }
        }
      }
    }
  }
  st.remove();
  const me = (scope === 'modal' && document.querySelector('#modal .kmemark')) || document.querySelector('#stage .kmemark') || document.querySelector('.kmemark'); const meInfo = me ? { vis: vis(me), at: me.dataset.at || '', h: Math.round(me.getBoundingClientRect().height), gap: me.dataset.gap } : null;
  return { nText, nMarks: marks.length, hits, me: meInfo };
};

(async () => {
  const b = await chromium.launch(); const rows = []; let fails = 0;
  for (const dev of DEVS) {
    const ctx = await b.newContext({ viewport: VP[dev], serviceWorkers: 'block', hasTouch: true, isMobile: false });
    await ctx.route('http://localhost:8817/**', r => { const u = new URL(r.request().url()); const f = path.join(ROOT, decodeURIComponent(u.pathname)); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ status: 200, contentType: f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json' : f.endsWith('.webp') ? 'image/webp' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream', body: fs.readFileSync(f) }) });
    const p = await ctx.newPage(); p.setDefaultTimeout(240000); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto('http://localhost:8817/index.html', { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => typeof start === 'function' && typeof deser === 'function', null, { timeout: 240000 });
    await p.waitForTimeout(1500);
    const run = async (name, rank, open, scope) => {
      if (ONLY && !ONLY.some(o => name.startsWith(o))) return;
      await home(p, rank);
      try { await p.evaluate(open) } catch (e) { rows.push({ dev, name, rank, verdict: 'SKIP', why: String(e.message).slice(0, 120) }); return }
      await p.waitForTimeout(2600); await p.evaluate(v => document.querySelectorAll(v).forEach(e => e.remove()), VEILS).catch(() => { }); await p.waitForTimeout(400);
      const R = await p.evaluate(CHECK, scope);
      const bad = (R.hits || []).length; if (bad) fails++;
      const tag = `${dev}-${name}-r${rank == null ? 'own' : rank}`;
      if (bad || new RegExp(process.env.SHOTS || '^(grid_bieuqua|ev_me)$').test(name)) await p.screenshot({ path: path.join(OUT, tag + '.jpg'), type: 'jpeg', quality: 60 });
      rows.push({ dev, name, rank: rank == null ? 'own' : rank, verdict: R.err ? 'SKIP' : bad ? 'FAIL' : 'ok', nText: R.nText, nMarks: R.nMarks, me: R.me, hits: (R.hits || []).slice(0, 6), why: R.err || '' });
      console.log(JSON.stringify(rows[rows.length - 1]));
    };
    for (const rank of [null, 7]) for (const [k, src] of Object.entries(DLG)) await run(k, rank, src, 'modal');
    await home(p, null);
    const places = ['home', ...await p.evaluate(() => places().map(x => x.k))];
    for (const k of places) await run('stage_' + k, null, `(()=>{Q.length=0;S.place='home';used=0;S.buoi=0;S.suc=100;try{goTo(${JSON.stringify(k)})}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;if(S.place!==${JSON.stringify(k)}&&${JSON.stringify(k)}!=='home'){S.place=${JSON.stringify(k)};S.visit={k:${JSON.stringify(k)},people:[],talked:false,tk:{},msg:''}}render()})()`, 'stage');
    if (errs.length) console.log(dev, 'page errors:', errs.slice(0, 3));
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, 'mark-plaque-scan.json'), JSON.stringify(rows, null, 1));
  const by = {}; for (const r of rows) { const k = r.dev; by[k] = by[k] || { screens: 0, fail: 0, skip: 0 }; by[k].screens++; if (r.verdict === 'FAIL') by[k].fail++; if (r.verdict === 'SKIP') by[k].skip++ }
  console.log('mark-plaque-scan:', JSON.stringify(by), fails ? fails + ' FAIL' : 'PASS');
  process.exit(fails ? 1 : 0);
})();
