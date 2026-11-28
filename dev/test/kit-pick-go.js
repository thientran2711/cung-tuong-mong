/* KIT-PICK-GO (KK61, K-PICK-GO-REACH, KIT §28.13i): the item-pick grid confirm «kipgo» must be reachable with NO scroll.
   = dev/test/dlg-dead-scan.js of review/dlg-dead-btn ffa55582 (DLG-DEAD-BTN, MAIN 179) with the grid face of the WHOLE picker family added
   (grid_bieuqua, grid_tangqua, grid_dangqua, grid_dangtha, grid_plant; ring off) and goBelow > 0 = FAIL. Run:
   node dev/test/kit-pick-go.js --save y05-ncBtuc-035.json --only grid_bieuqua,grid_tangqua,grid_dangqua,grid_dangtha,grid_plant --tiles 2
   (it serves the worktree's built index.html: run dev/site/build_site.sh first). The original header follows. */
/* DLG-DEAD-SCAN (MAIN 178/179 order «DLG-DEAD-BTN», law 11: fix the whole family of dialogs / pickers whose way out is dead on LIVE).
   Foreman F faults on LIVE (FOREMAN_F_STATUS 27/11 09:55Z / 10:28Z / 13:36Z): «Đông sở» .dlg scrolled to its end has no close / next;
   «Tin báo» «Để sau» dead after 3 real taps; «Danh hiệu mới» «Để sau» dead; «Biếu quà làm lành» item cards outside the viewport dead;
   item-pick grid «kipgo» off-screen. MAIN 178 ruling NO-EFFECT-HOLD: a choice with no effect never holds the player (jverdict isNav).
   For every dialog family below, on Fold 755x1000 and iPad 1180x820 (touch, like her devices):
     1. open it the way the game does (its own producer function, harness setup only),
     2. scroll every scroller of the dialog to its END with real wheel / touch drags (no el.scrollTop / scrollIntoView on the game),
     3. list the ways out (frame ✕, close / later / next options, every option card) and hit-test each (dev/test/realtap.js PROBE: on screen, not covered),
     4. REAL-TAP the way out (realtap.js tap; option cards via rt.choose = lift → ✓) and check the dialog closed or moved on within 2.5 s.
   A case FAILs when after scrolling to the end NO way out is reachable, or the tapped way out leaves the same dialog up (dead button).
   Item pickers: every tile of the grid must be reachable by real scrolling (+ pager) and its tap must choose it; the confirm (kipgo) must be reachable.
   usage: node dev/test/dlg-dead-scan.js [--root <worktree>] [--dev fold,ipad] [--only a,b] [--out dir]   (exit 1 on any FAIL)
   Never uses .click() / dispatchEvent to PRESS a button: page.evaluate only opens the dialog (setup) and READS the screen. */
'use strict';
const { chromium } = (require('./lib/bigpage'),require('playwright')); const fs = require('fs'); const path = require('path');
const RT = require('./realtap.js');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const ROOT = path.resolve(arg('root', path.resolve(__dirname, '..', '..')));
const DEVS = String(arg('dev', 'fold,ipad')).split(',');
const ONLY = arg('only', '') ? String(arg('only')).split(',') : null;
const OUT = path.resolve(arg('out', '/tmp/dlg-dead-scan')); fs.mkdirSync(OUT, { recursive: true });
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 }, cover: { width: 412, height: 1058 } };/* cover = Fold cover screen (WORKER_BRIEF 412x1058) */

/* ---------- harness: a mid-life save at home (the F/handover fixture y05-ncBtuc-035; loaded like j6's data-load handler — setup only) ----------
   --save <file> (default: dev/handover/fixtures/save-growth/y05-ncBtuc-035.json from the handover branch:
   git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json > y05.json) */
const SAVE = path.resolve(arg('save', path.join(ROOT, 'dev/handover/fixtures/save-growth/y05-ncBtuc-035.json')));
if (!fs.existsSync(SAVE)) { console.log('no save fixture: ' + SAVE + ' (see header)'); process.exit(2) }
const SAVETXT = fs.readFileSync(SAVE, 'utf8');
async function home(p) {
  await p.evaluate(t => {
    try { localStorage.clear() } catch (e) { } try { REC.tour = 'done'; REC.asked = 1; saveRec() } catch (e) { }
    localStorage.setItem(SK(3), t); SLOT = 3; const d = loadSlot(3); try { kmReset && kmReset() } catch (e) { } quiet = true; d.tab = 'act'; deser(d); quiet = false;
    document.getElementById('title').hidden = true; try { deal() } catch (e) { } if (S.mg) S.mg = null; try { S.tutTour = 1; coachOff && coachOff() } catch (e) { }
    Q.length = 0; document.getElementById('modal').hidden = true; render()
  }, SAVETXT);
  await p.waitForTimeout(2500);
  await clean(p);
}
const VEILS = '.kfgain,#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,.kmov,#rtoast,#kprevov,.kne';/* .kne = timed world-event beat scene (RV-176 §7 a: «kne kne-beat OUT» over the scan) */
const unveil = p => p.evaluate(v => document.querySelectorAll(v).forEach(e => e.remove()), VEILS).catch(() => { });/* KK62: a timed world beat / new day that comes up DURING a case is cleared before each measure + tap (harness setup, not a game press) */
async function clean(p) {
  for (let k = 0; k < 2; k++) {
    await p.evaluate(v => { try { if (window.kitRingItem && kitRingItem.cur) kitRingItem.cur.close() } catch (e) { } document.querySelectorAll('.kri').forEach(e => e.remove()); document.querySelectorAll(v).forEach(e => e.remove()); Q.length = 0; try { closeModal() } catch (e) { } Q.length = 0; document.getElementById('modal').hidden = true; try { if (window.DQ) { DQ.want = null; DQ.park = null } } catch (e) { } render() }, VEILS);
    await p.waitForTimeout(700);
  }
}

/* ---------- read the open dialog (read-only) ---------- */
const READ = () => {
  const M = document.getElementById('modal'); const vis = el => { if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(M).visibility !== 'hidden' };
  const lay = [...document.querySelectorAll('.kipwrap,.kfoc,.kbk,#kg82')].filter(vis);
  const up = M && !M.hidden && vis(M.querySelector('.dlg'));
  const d = up ? M.querySelector('.dlg') : null;
  const t = d ? ((d.querySelector('.kpt,.kph h3,.kph .kpt,h3,.kt') || {}).textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50) : '';
  const sig = d ? (t + '|' + (document.getElementById('mb') || d).textContent.replace(/\s+/g, ' ').trim().slice(0, 160) + '|' + Q.length + '|' + (Q[0] && Q[0].t || '')) : '';
  return { up, t, sig, q: Q.length, q0: Q[0] && Q[0].t || '', lay: lay.length };
};
/* the ways out of the dialog: frame ✕ / close-type buttons and option cards (read-only) */
const WAYS = () => {
  const M = document.getElementById('modal'); if (!M || M.hidden) return [];
  const out = []; let i = 0;
  for (const b of M.querySelectorAll('button,[role=button]')) {
    const r = b.getBoundingClientRect(); if (r.width < 1 || r.height < 1) continue; if (getComputedStyle(b).visibility === 'hidden') continue;
    const lab = (b.getAttribute('aria-label') || b.textContent || b.title || '').replace(/\s+/g, ' ').trim();
    const opt = b.matches('.opt,[data-m]'); const x = b.matches('.kit-x,.kx,.kpx,[data-kx],.mclose,[aria-label="Đóng"],[aria-label="Lui"]') || /^(✕|×)$/.test(lab);
    const close = x || /^(Đóng|Lui|Thôi|Để sau|Đã hiểu|Đã rõ|Biết rồi|Quay lại|Xong|Tiếp ▸|Tiếp|Bỏ qua|Không đi)\b/.test(lab);
    const tag = 'dds' + (i++); b.setAttribute('data-ddsw', tag);
    out.push({ tag, lab: lab.slice(0, 50), opt, close, x, dis: !!b.disabled });
  }
  return out;
};

/* ---------- scroll every scroller of the dialog to its end with the real wheel / touch drag ---------- */
async function scrollEnd(p, touch) {
  for (let pass = 0; pass < 12; pass++) {
    const s = await p.evaluate(() => {
      const M = document.getElementById('modal'); if (!M || M.hidden) return null;
      const L = [M, ...M.querySelectorAll('*')].filter(e => { const cs = getComputedStyle(e); return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 2 && e.getBoundingClientRect().height > 20 });
      const e = L.find(e => e.scrollTop + e.clientHeight < e.scrollHeight - 2); if (!e) return { done: true };
      const r = e.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(Math.max(r.top + 10, Math.min(r.bottom - 10, (Math.max(0, r.top) + Math.min(innerHeight, r.bottom)) / 2))), h: Math.min(r.height, innerHeight) };
    });
    if (!s || s.done) return true;
    if (touch) {
      const cdp = await p.context().newCDPSession(p); const y0 = s.y + s.h * .3, y1 = s.y - s.h * .3;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: s.x, y: y0 }] });
      for (let k = 1; k <= 6; k++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: s.x, y: y0 + (y1 - y0) * k / 6 }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await cdp.detach();
    } else { await p.mouse.move(s.x, s.y); await p.mouse.wheel(0, 600) }
    await p.waitForTimeout(250);
  }
  return false;
}

/* ---------- the families (producer = the game's own function; setup only) ---------- */
const CASES = {
  /* «Tin báo» panel with 4 news, one with a «Để ta xem» road (F s18b: «Để sau» dead after 3 real taps) */
  tinbao: { way: /^(✕|Đóng|Để sau)$/, open: () => { for (let i = 0; i < 4; i++)kitNotice({ id: 'dds' + i, kind: 'tin', line: 'Có tin: Ngự hoa viên có chuyện ' + i, text: 'Cung nữ báo: Ngự hoa viên có chuyện ' + i + '.', go: i === 0 ? () => { } : null, goLabel: 'Để ta xem' }); kitNoticeOpen() } },
  /* «Tin báo» long list (24 news; KIT BUG #3 family): the way out after scrolling to the end */
  tinbaolong: { way: /^(✕|Đóng|Để sau)$/, open: () => { for (let i = 0; i < 24; i++)kitNotice({ id: 'ddl' + i, kind: 'tin', line: 'Có tin ' + i, text: 'Tai mắt báo: nơi số ' + i + ' có chuyện, người qua lại bàn tán không thôi suốt cả buổi sáng hôm nay.', go: i === 0 ? () => { } : null, goLabel: 'Để ta xem' }); kitNoticeOpen() } },
  /* the closing «Tin báo» toast card (jclose, no options) */
  toast: { way: /./, open: () => { Q.push({ __once: 'toast', t: 'Tin báo', h: '<p>Nơi này sắp đóng cửa, mời tiểu chủ rời đi.</p>' }); showModal() } },
  /* «Danh hiệu mới» (jdh dhNotice): «Để sau» (F 12:20Z: dead) */
  danhhieu: { way: /^(✕|Để sau|Đóng|Lui)$/, open: () => { const k = Object.keys(DH_CAT).find(x => !(S.dh && S.dh[x] && S.dh[x].i >= 0)); S.dh = S.dh || {}; S.dh[k] = { n: 1, i: 0, at: [''] }; dhNotice(k); showModal() } },
  /* a long event card with 6 options (S/M/L frames; options at the end of the scroller) */
  eventlong: { way: /^(Thôi|✕)$/, open: () => { const L = []; for (let i = 0; i < 18; i++)L.push('<p>Trong cung lời đồn lan nhanh như gió, người này nói với người kia, chẳng ai biết thật giả ra sao, chỉ thấy lòng người xao động không yên.</p>'); Q.push({ t: 'Lời đồn trong cung', h: L.join(''), opts: [1, 2, 3, 4, 5].map(i => ({ n: 'Cách thứ ' + i, fx: { danh: 1 }, x: 'thành: Danh +1', go: () => { } })).concat([{ n: 'Thôi', fx: {}, go: () => { } }]) }); showModal() } },
  /* VIEW panels (kit.view: one copy in Q, never saved): «Lịch tháng», «Tin chờ người sai đi» (robots: «Lui» no effect on a duplicated queued copy) */
  lichthang: { way: /^(✕|Lui|Đóng)$/, open: () => { kitMonthCalOpen() } },
  lichthang2: { way: /^(✕|Lui|Đóng)$/, open: () => { kitMonthCalOpen(); kitMonthCalOpen() } },
  tinbao2: { way: /^(✕|Đóng|Để sau)$/, open: () => { for (let i = 0; i < 3; i++)kitNotice({ id: 'dd2' + i, kind: 'tin', line: 'Có tin ' + i, text: 'Tin số ' + i + '.' }); kitNoticeOpen(); kitNoticeOpen() } },
  /* the selection lodge free card «Đông sở» (jselxday selxFree; kit scene panel .kpsc) */
  dongso: { way: /^(Ngồi yên chờ tới tối)/, choose: true, open: null },
};

async function openDongso(p) {
  await p.evaluate(() => {
    if (typeof kitRoulette === 'function' && !window.__tRoul0) { window.__tRoul0 = kitRoulette; kitRoulette = function (o) { try { o && o.done && o.done() } catch (e) { } } }
    for (let i = 0; i < 600; i++) { try { store.set(NL_KEY, null) } catch (e) { } start(); if (S.origin.k === 'tt') break } S.kcPick = 'cung'; nlAccept(); window.__selxNoSc = 1;
    const close = () => document.querySelectorAll('.kmov,#kprevov,#kg82,[id^="kroul"],.kroul,.kroul-ov,.kbd,#klife').forEach(x => x.remove());
    for (let n = 0; n < 60 && Q.length; n++) { const m = Q[0]; const nm = (m.opts || []).map(x => x.n); if (nm.includes('Ra Dư đồ')) break; const c = nm.findIndex(s => /Cất đồ|Theo|Tập thật kỹ|Quỳ|Nghe/.test(s)); if (m.opts) chooseM(c < 0 ? 0 : c); else closeModal(); close() }
  });
  await p.waitForTimeout(1500);
  await p.evaluate(v => { document.querySelectorAll(v).forEach(e => e.remove()); try { render(); showModal() } catch (e) { } }, VEILS);
  await p.waitForTimeout(800); await p.evaluate(v => { document.querySelectorAll(v).forEach(e => e.remove()); try { showModal() } catch (e) { } }, VEILS);
}

/* ITEM PICK GRID family (KIT 28.13i jgpick): «Biếu quà làm lành» (tsgiftpick it), «Tặng quà» (giftpick), «Dâng quà» (giftto), «Cài đồ» (plantpick).
   Every tile must be reachable by real scrolling and chosen by a real tap (.kipc.on); then the confirm «kipgo» must be reachable and move the dialog on. */
const PICKERS = {
  grid_bieuqua: () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out).sort((a, b) => oan(b, S) - oan(a, S))[0]; tsDil(mkP('tsgiftpick', { v: V.id, k: 'it' }), 'Biếu quà làm lành') },
  pick_bieuqua: () => { const V = rivals.filter(x => x.alive !== false && !x.out).sort((a, b) => oan(b, S) - oan(a, S))[0]; tsDil(mkP('tsgiftpick', { v: V.id, k: 'it' }), 'Biếu quà làm lành') },
  pick_tangqua: () => { const V = rivals.filter(x => x.alive !== false && !x.out)[0]; const d = mkP('giftpick', { v: V.id }); pushModal({ t: d.t0 || 'Tặng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
  pick_dangqua: () => { const d = mkP('giftto', { t: 'emp' }); pushModal({ t: 'Dâng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) },
};
/* LIVE §97 kitScreenVeil (jscrv, «Đang bày tranh…»): a dialog that opens with pictures not yet decoded is veiled until they are; the harness waits
   for the veil to lift (up to 20 s) before it probes or taps — a tap on the veil is not a dead tile (r7: iPad «Dâng quà» tile 0 «unreachable» = the veil) */
async function veilGone(p) { for (let k = 0; k < 40; k++) { const v = await p.evaluate(() => [...document.querySelectorAll('.kscrv')].some(e => { const cs = getComputedStyle(e); return cs.display !== 'none' && +cs.opacity > 0.05 && e.getClientRects().length })); if (!v) return true; await p.waitForTimeout(500) } return false }
async function runPicker(p, dev, name, rows) {
  const rt = RT.make(p, { dev, touch: true, shots: OUT });
  await clean(p); await p.evaluate(() => { window.__kriOff = 0 });
  await p.evaluate(`(()=>{const f=${PICKERS[name].toString()};try{if(window.DQ)DQ.user=(DQ.user||0)+1;f();showModal()}finally{if(window.DQ)DQ.user--}})()`);
  let st = null; for (let k = 0; k < 60; k++) { await p.waitForTimeout(500); if (k && k % 4 === 0 && st && !st.up) await p.evaluate(() => { try { if (Q.length && document.getElementById('modal').hidden) showModal() } catch (e) {} });/* r7: the previous case's gift moment / result toast holds the queue a few s (iPad grid_dangtha SKIP «did not open», q=1) — wait up to 30 s, re-ask showModal */ await p.evaluate(() => document.querySelectorAll('.kfgain').forEach(e => e.remove())); st = await p.evaluate(READ); if (st.up && await p.$('#modal .kipc') && await veilGone(p)) break }
  const n = await p.$$eval('#modal .kipc', L => L.length);
  /* K-PICK-FOLD-BAND (KK61): (a) no empty band between the dialog picture and its text, (b) the prompt line is on screen (not under the options) */
  await unveil(p);
  const band = await p.evaluate(() => { const kb = document.querySelector('#modal #mb>.kpb'); if (!kb) return { none: 1 }; const sj = kb.querySelector(':scope>.kpsubj'), tx = kb.querySelector(':scope>.kpmain'), o = document.querySelector('#modal #mb>.opts'); if (!tx) return { none: 1 };
    const B = kb.getBoundingClientRect(), T = tx.getBoundingClientRect(), S = sj && sj.offsetParent ? sj.getBoundingClientRect() : null; const stacked = S && T.top >= S.bottom - 2;
    const gap = stacked ? Math.max(0, Math.round(T.top - S.bottom)) : 0; const f = tx.querySelector('.kfact,p') || tx; const F = f.getBoundingClientRect();
    const y = F.top + Math.min(10, F.height / 2), x = F.left + Math.min(40, F.width / 2); const e = document.elementFromPoint(x, y); const oT = o ? o.getBoundingClientRect().top : Infinity, lim = Math.min(B.height > 0 ? B.bottom + 1 : Infinity, oT); const outside = !!e && !e.closest('#modal'); const shown = F.height > 4 && y < lim && !!e && (tx.contains(e) || outside);/* a layer OUTSIDE the dialog (gift fx catcher, #dawn left by an earlier case in the run) is reported as hit «OUT», not a layout fault *//* a zero-size .kpb (display:contents layouts) gives no bottom: the options' top is the limit */
    return { gap, prompt: (f.innerText || '').slice(0, 40), shown, hit: e ? (e.tagName + '.' + String(e.className).slice(0, 40) + (e.closest('#modal') ? '' : ' OUT')) : '-', fy: Math.round(F.top), fh: Math.round(F.height), fx: Math.round(x), txTop: Math.round(T.top), kbBottom: Math.round(B.bottom), optTop: o ? Math.round(o.getBoundingClientRect().top) : null } });
  const bandBad = !band.none && (band.gap > 24 || !band.shown);
  if (process.env.DUMPKPB) console.log(name, dev, JSON.stringify(await p.evaluate(() => { const k = document.querySelector('#modal #mb>.kpb'); if (!k) return null; const cs = getComputedStyle(k); const ch = [...k.children].map(c => { const z = getComputedStyle(c); return c.className + ' row=' + z.gridRow + ' col=' + z.gridColumn + ' area=' + z.gridArea }); return { cls: k.className, style: k.getAttribute('style'), gtr: cs.gridTemplateRows, gtc: cs.gridTemplateColumns, gta: cs.gridTemplateAreas, h: cs.height, minh: cs.minHeight, dlg: document.querySelector('#modal .dlg').className, mb: document.querySelector('#modal #mb').className + ' ' + getComputedStyle(document.querySelector('#modal #mb')).gridTemplateRows, ch } })));
  if (process.env.DUMPTREE) console.log(name, dev, JSON.stringify(await p.evaluate(() => { const mb = document.querySelector('#modal #mb'); const out = []; const walk = (e, d) => { for (const c of e.children) { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); out.push('  '.repeat(d) + c.tagName.toLowerCase() + (c.id ? '#' + c.id : '') + '.' + String(c.className).split(' ').slice(0, 3).join('.') + ' y=' + Math.round(r.top) + ' h=' + Math.round(r.height) + ' disp=' + cs.display + ' vis=' + cs.visibility + ' op=' + cs.opacity + ' txt=' + (c.innerText || '').slice(0, 40).replace(/\n/g, ' ')); if (d < 3 && !c.classList.contains('kipw')) walk(c, d + 1) } }; walk(mb, 0); return out }), null, 1));
  if (!st.up || !n) { const q = await p.evaluate(() => ({ q: (window.Q || []).map(x => x.t), hid: document.getElementById('modal').hidden, dq: window.DQ ? { user: DQ.user, want: !!DQ.want, park: !!DQ.park } : null, veils: [...document.querySelectorAll('.kfxk-catch,.kscrv,#dawn,#klife,.kne')].map(e => e.id || e.className).slice(0, 6) })).catch(() => null); rows.push({ dev, name, verdict: 'SKIP', why: 'picker did not open / no tile', st, q }); return }
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-open.jpg`), type: 'jpeg', quality: 50 });
  const lim = +arg('tiles', 400); const dead = [];
  const ids = await p.$$eval('#modal .kipc', L => L.map(t => t.dataset.kip));
  /* how far the confirm sits below what she sees once she picks the FIRST tile (a person must scroll that far to give it) */
  await rt.tap(`#modal .kipc[data-kip="${ids[0]}"] .kshpic`, { screen: name, label: 'tile ' + ids[0] });
  const goBelow = await p.evaluate(() => { const g = document.querySelector('#modal .kipgo'); if (!g) return null; const r = g.getBoundingClientRect(); let b = innerHeight; for (let e = g.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (/(auto|scroll|hidden|clip)/.test(cs.overflowY)) b = Math.min(b, e.getBoundingClientRect().bottom) } const ch=[];for (let e = g.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); ch.push((e.id?'#'+e.id:'')+'.'+String(e.className).split(' ').slice(0,2).join('.')+' oy='+cs.overflowY+' pos='+cs.position+' disp='+cs.display+' h='+Math.round(e.getBoundingClientRect().height)+' sh='+e.scrollHeight) } window.__CH=ch; return Math.max(0, Math.round(r.bottom - b)) });
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-picked.jpg`), type: 'jpeg', quality: 70 }); if (process.env.PROBE) console.log(JSON.stringify(await p.evaluate(()=>window.__CH),null,1));
  /* KK65 (RV-178 nit b): the tile grid is a scroller INSIDE the scrolling body #mb; rt.tap only scrolls the grid, so on Fold the rows under #mb's
     clipped foot read «unreachable». A person first drags the panel up until the whole grid shows above the sticky confirm: real wheel on #mb,
     off the grid (the scene / prompt column), at most 10 steps. */
  for (let k = 0; k < 10; k++) {
    const g = await p.evaluate(() => { const m = document.querySelector('#modal #mb'), q = document.querySelector('#modal .kshg.kipg,#modal .kipg'), o = document.querySelector('#modal .kipgo'); if (!m || !q) return null;
      const M = m.getBoundingClientRect(), Q = q.getBoundingClientRect(), win = Math.min(M.bottom, o ? o.getBoundingClientRect().top : M.bottom);
      return { need: Q.bottom - win, room: m.scrollHeight - m.clientHeight - m.scrollTop, x: M.left + M.width * 0.75, y: Math.min(M.top + 24, Q.top - 8) } });
    if (!g || g.need <= 1 || g.room <= 0 || g.y <= 0) break;
    await p.mouse.move(g.x, g.y); await p.mouse.wheel(0, Math.min(150, g.need + 4)); await p.waitForTimeout(250);
  }
  for (const id of ids.slice(0, lim)) {
    await unveil(p);
    const sel = `#modal .kipc[data-kip="${id}"] .kshpic`;
    const ok = await rt.tap(sel, { screen: name, label: 'tile ' + id });
    const on = ok && await p.$eval(`#modal .kipc[data-kip="${id}"]`, t => t.classList.contains('on')).catch(() => false);
    if (!on) dead.push(id + (ok ? ':no-select' : ':unreachable'));
  }
  /* K-LIST-PAGE × K-PICK-GO-REACH (KK62): a paged grid (picker-dom §23 pager .kippg) — the pager must not sit under the sticky confirm: hit-test ‹ › and
     REAL-tap › once (page label must change), then ‹ back */
  let pager = 'none';
  if (await p.$('#modal .kippg')) {
    const ov = await p.evaluate(() => { const a = document.querySelector('#modal .kippg'), g = document.querySelector('#modal .kipgo'); if (!a || !g) return 0; const r = a.getBoundingClientRect(), q = g.getBoundingClientRect(); return Math.max(0, Math.round(Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top))) });
    const lab0 = await p.$eval('#modal .kippg .kpkpn', e => e.textContent).catch(() => '');
    const nx = await p.$('#modal .kippg [data-kippg="1"]:not([disabled])');
    let turned = null; if (nx) { const r = await rt.tap('#modal .kippg [data-kippg="1"]', { screen: name, label: 'pager ›' }); await p.waitForTimeout(900); const lab1 = await p.$eval('#modal .kippg .kpkpn', e => e.textContent).catch(() => ''); turned = !!r && lab1 !== lab0; if (turned) { await rt.tap('#modal .kippg [data-kippg="-1"]', { screen: name, label: 'pager ‹' }); await p.waitForTimeout(900) } }
    pager = { overGo: ov, lab0, turned }; if (ov > 0 || turned === false) dead.push('pager:' + (ov > 0 ? 'under confirm ' + ov + ' px' : 'turn dead'));
  }
  /* the confirm of the last chosen tile: reachable + it moves the dialog on */
  await unveil(p);
  const sig0 = (await p.evaluate(READ)).sig;
  const go = await p.$('#modal .kipgo:not([disabled])');
  let goOk = null, goWhy = '';
  if (go) { const r = await rt.tap('#modal .kipgo', { screen: name, label: 'kipgo' }); await p.waitForTimeout(2500); const s2 = await p.evaluate(READ); goOk = r && (!s2.up || s2.sig !== sig0); if (!goOk) goWhy = r ? 'confirm tapped, dialog stays' : 'confirm not reachable (' + ((rt.stats().deadList.slice(-1)[0] || {}).cover || '') + ')' }
  else goWhy = 'no enabled confirm';
  if (dead.length || goOk === false) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-dead.jpg`), type: 'jpeg', quality: 55 });
  rows.push({ dev, name, tiles: n, tested: Math.min(n, lim), goBelow, pager, band, dead: dead.length, deadList: dead.slice(0, 8), confirm: goOk === null ? 'none' : goOk ? 'ok' : 'DEAD', verdict: dead.length || goOk === false || goBelow > 0 || bandBad ? 'FAIL' : 'ok', why: [dead.length ? dead.length + ' tile(s) dead' : '', goBelow > 0 ? 'confirm ' + goBelow + ' px below the box' : '', bandBad ? (band.gap > 24 ? 'empty band ' + band.gap + ' px' : '') + (band.shown ? '' : ' prompt hidden') : '', goWhy].filter(Boolean).join('; ') });
}

/* RING face of the item pickers (kitRingItem, jkring-item kriGiftOpen: what a player sees on LIVE; the grid above is the robots' / ring-off face).
   Every ring tile is brought to the FRONT by real taps on › and must be tappable there; then the front item is focused (real tap) and its main act
   button must be reachable and run (result in place or the dialog moves on). Pieces offered beyond the ring's cut (KIT_RINGI.maxN) are COUNTED
   (K-RING-ALL, kit keeper KK59) — reported, not judged here. */
PICKERS.grid_tangqua = () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out)[0]; const d = mkP('giftpick', { v: V.id }); pushModal({ t: d.t0 || 'Tặng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) };
PICKERS.grid_dangqua = () => { window.__kriOff = 1; const d = mkP('giftto', { t: 'emp' }); pushModal({ t: 'Dâng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) };
PICKERS.grid_dangtha = () => { window.__kriOff = 1; const d = mkP('giftto', { t: 'th' }); pushModal({ t: 'Dâng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) };
PICKERS.grid_plant = () => { window.__kriOff = 1; const V = rivals.filter(x => x.alive !== false && !x.out)[0]; const d = mkP('plantpick', { v: V.id }); pushModal({ t: 'Cài đồ', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }) };
const RINGS = { ring_bieuqua: PICKERS.pick_bieuqua, ring_tangqua: PICKERS.pick_tangqua, ring_dangqua: PICKERS.pick_dangqua };
async function runRing(p, dev, name, rows) {
  const rt = RT.make(p, { dev, touch: true, shots: OUT });
  await clean(p); await p.evaluate(() => { window.__kriOff = 0 });
  await p.evaluate(`(()=>{const f=${RINGS[name].toString()};try{if(window.DQ)DQ.user=(DQ.user||0)+1;f();showModal()}finally{if(window.DQ)DQ.user--}})()`);
  let n = 0; for (let k = 0; k < 16; k++) { await p.waitForTimeout(500); await p.evaluate(() => document.querySelectorAll('.kfgain').forEach(e => e.remove())); n = await p.$$eval('.kri .kri-t', L => L.length).catch(() => 0); if (n) break }
  const offered = await p.evaluate(() => { const m = Q[0]; return m && m.opts ? m.opts.filter(o => o && o.ik != null && S.inv[o.ik]).length : 0 });
  /* RV-176 nit (law 6c): every offered piece not on the ring must be EXPLAINED — a duplicate option of a piece already on the ring (same S.inv entry), or a piece the
     dialog itself does not draw (K-PICK-LIVE refused: counted in the dialog's «Còn N món khác trong rương …» line). Unexplained = dropped = FAIL. */
  if (process.env.DUMP34) await p.evaluate(() => { window.__DUMP34 = 1 });
  const acct = await p.evaluate(() => { const m = Q[0], M = document.getElementById('modal'); const ops = M.querySelector('.opts'); const O = (m.opts || []).map((c, i) => [c, i]).filter(([c]) => c && c.ik != null && S.inv[c.ik]);
    const drawn = O.filter(([c, i]) => ops && ops.querySelector('.opt[data-m="' + i + '"]')); const ringIk = new Set(drawn.map(([c]) => c.ik)); const notDrawn = O.filter(x => !drawn.includes(x));
    const dupIk = notDrawn.filter(([c]) => ringIk.has(c.ik)).length; const sig = c => { const e = S.inv[c.ik] || {}; return [e.k, c.n, c.x || '', !!c.lock].join('#') }; const drawnSig = new Set(drawn.map(([c]) => sig(c))); const sameKindDrawn = notDrawn.filter(([c]) => drawnSig.has(sig(c))).length; const stackAware = typeof invSig === 'function'; const dupSameIk = O.length - new Set(O.map(([c]) => c.ik)).size;
    const past = [...M.querySelectorAll('#mb p.past, #mb .past')].map(e => e.innerText).join(' | '); const pastN = +((past.match(/Còn (\d+) món/) || [])[1] || 0);
    if (window.__DUMP34) window.__D34 = notDrawn.slice(0, 40).map(([c, i]) => { const e = S.inv[c.ik] || {}; const any = document.querySelector('[data-m="' + i + '"]'); return [i, c.n, 'any=' + (any ? any.tagName + '.' + any.className + ' in ' + (any.parentElement && any.parentElement.className) : 'none'), 'tsDis=' + c.tsDis, 'need=' + String(JSON.stringify(c.need)).slice(0, 80), e.k, e.h ? 'h' : '', e.eq ? 'eq' : '', e.wk ? 'wk' : '', c.hide ? 'hide' : '', c.lock ? 'lock' : '', c.off ? 'off' : '', Object.keys(c).join(',')].join('|') });
    const R = kitRingItem.cur; const qsum = R && R.items ? R.items.reduce((t, it) => t + (it.qty || 1), 0) : null; return { qsum, sameKindDrawn, stackAware, offered: O.length, drawn: drawn.length, distinctIk: new Set(O.map(([c]) => c.ik)).size, dupSameIk, notDrawn: notDrawn.length, notDrawnDupOfRing: dupIk, notDrawnNew: notDrawn.length - dupIk, pastN, past: past.slice(0, 160) } });
  if (!n) { rows.push({ dev, name, verdict: 'SKIP', why: 'ring did not open', offered }); return }
  await p.waitForTimeout(900);
  const head = await p.evaluate(() => ((document.querySelector('.kri .kri-tt') || {}).innerText || '').replace(/\s+/g, ' ').trim()).catch(() => '');/* KK62 ring header family (RV-176 §7 c) */
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-open.jpg`), type: 'jpeg', quality: 50 });
  if (process.env.DUMPHINT) await p.evaluate(() => { window.__hlog = []; const f = () => { const R = window.kitRingItem && kitRingItem.cur; if (!R) return; const n = R.nameEl, h = R.hint; if (n && h) { const L = window.__hlog, e = [R.__nf, n.offsetHeight, n.offsetWidth, h.style.top, Math.round(performance.now())]; const q = L[L.length - 1]; if (!q || q[0] !== e[0] || q[1] !== e[1] || q[2] !== e[2] || q[3] !== e[3]) L.push(e) } requestAnimationFrame(f) }; requestAnimationFrame(f) });
  const dead = []; const seen = new Set(); const subl = []; let maxLines = 0;
  for (let k = 0; k < n; k++) {
    const fi = await p.evaluate(() => { const f = document.querySelector('.kri .kri-t.kri-front'); return f ? f.__i : null });
    /* K-RING-SUBLINE (KK61): the front item's name block (name + sub line) never overlaps the hint, and the hint stays inside the ring layer */
    await unveil(p);
    const ov = await p.evaluate(() => { const n = document.querySelector('.kri .kri-name'), h = document.querySelector('.kri .kri-hint'); if (!n || !h) return null; const a = { bottom: Math.max(...[...n.children].filter(c => c !== h).map(c => c.getBoundingClientRect().bottom)) }/* the name text (plate + sub line); KK62: the hint may sit inside the name block */, b = h.getBoundingClientRect(), L = (n.offsetParent || document.body).getBoundingClientRect(); return { over: Math.max(0, Math.round(a.bottom - b.top)), out: Math.max(0, Math.round(b.bottom - L.bottom)), lines: Math.round((n.querySelector('small') || n).getBoundingClientRect().height / 14) } });
    if (ov && ov.over > 0 && process.env.DUMPHINT) console.log('HINTDUMP', dev, name, fi, JSON.stringify(await p.evaluate(() => { const n = document.querySelector('.kri .kri-name'), h = document.querySelector('.kri .kri-hint'); const R = window.kitRingItem && kitRingItem.cur; return { nTop: n.style.top, oh: n.offsetHeight, rh: Math.round(n.getBoundingClientRect().height * 10) / 10, hTop: h.style.top, kro: !!n.__kro, same: !!(R && R.nameEl === n), nf: R && R.__nf, txt: n.textContent.slice(0, 120), w: n.offsetWidth, fonts: document.fonts && document.fonts.status, log: (window.__hlog || []).filter(e => e[0] >= (R.__nf - 1) && e[0] <= R.__nf), rehint: (() => { try { kriHintAt(R); return h.style.top } catch (e) { return 'ERR ' + e.message } })() } })));
    if (ov && (ov.over > 0 || ov.out > 0)) subl.push(fi + ':over ' + ov.over + (ov.out ? ' out ' + ov.out : '')); if (ov) maxLines = Math.max(maxLines, ov.lines); if (process.env.SHOTFRONT && String(fi) === process.env.SHOTFRONT) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-front${fi}.jpg`), type: 'jpeg', quality: 70 });
    if (fi != null) { seen.add(fi); const pr = await p.$eval('.kri .kri-t.kri-front', RT.PROBE).catch(() => ({ gone: true })); if (!pr || !pr.ok) dead.push(fi + ':' + (pr && (pr.cover || (pr.zero ? 'zero' : pr.gone ? 'gone' : 'covered')) || '?')) }
    const ok = await rt.tap('.kri .kri-ar[aria-label]:last-of-type', { screen: name, label: '›' }).catch(() => false);
    if (!ok) { dead.push('arrow ›'); break }
    await p.waitForTimeout(450);
  }
  /* focus the front item and run its main act */
  let act = 'none', actWhy = '';
  const f = await rt.tap('.kri .kri-t.kri-front', { screen: name, label: 'front item' });
  await p.waitForTimeout(1300);
  const main = await p.$('.kri .kri-acts .kbtn.kri-main:not([disabled])');
  if (!f) { act = 'DEAD'; actWhy = 'front item not tappable' }
  else if (main) { const before = await p.evaluate(() => (document.querySelector('.kri .kri-pane') || {}).textContent || ''); const r = await rt.tap('.kri .kri-acts .kbtn.kri-main', { screen: name, label: 'act' }); await p.waitForTimeout(2200); const after = await p.evaluate(() => ({ t: (document.querySelector('.kri .kri-pane') || {}).textContent || '', ring: !!document.querySelector('.kri') })); act = r && (!after.ring || after.t !== before) ? 'ok' : 'DEAD'; if (act === 'DEAD') actWhy = r ? 'act tapped, nothing changed' : 'act button not reachable' }
  else act = 'locked';
  if (dead.length || act === 'DEAD') await p.screenshot({ path: path.join(OUT, `${dev}-${name}-dead.jpg`), type: 'jpeg', quality: 55 });
  if (process.env.DUMP34) console.log(name, dev, JSON.stringify(await p.evaluate(() => window.__D34), null, 1)); const unexpl = Math.max(0, acct.notDrawnNew - acct.pastN - acct.sameKindDrawn) + Math.max(0, acct.drawn - n) + (acct.qsum != null && acct.qsum < acct.offered ? acct.offered - acct.qsum : 0);/* twins folded into a ×N tile are explained only when the ring's ×N counts add up to every offered piece */ rows.push({ dev, name, head, offered, acct, unexpl, ring: n, cut: Math.max(0, offered - n), fronts: seen.size, dead: dead.length, deadList: dead.slice(0, 8), act, subline: subl.length, sublineList: subl.slice(0, 6), maxLines, verdict: dead.length || act === 'DEAD' || subl.length || unexpl ? 'FAIL' : 'ok', why: [dead.length ? dead.length + ' ring tile(s) / arrows dead' : '', subl.length ? subl.length + ' front item(s): sub line over the hint' : '', actWhy].filter(Boolean).join('; ') });
}

/* STALE HAND LIFT (law 11, F «Tin báo» «Để sau» → «Đặt lại» / «Chọn lá này» dead): she lifts a card of queue card A, then A is REPLACED by the next card
   (news / a timer / a one-copy panel unshifted into Q). The new card must show no ✓/✕ pair and no lift plate without a lifted card, and its own card is
   chosen by real taps (lift → ✓). Variant «x»: she closes A with the frame ✕ while a card is lifted, then the next card opens. */
const HANDS = { stale_hand: { how: 'replace' }, stale_hand_x: { how: 'x' } };
async function runHand(p, dev, name, rows) {
  const rt = RT.make(p, { dev, touch: true, shots: OUT }); const H = HANDS[name];
  await clean(p);
  await p.evaluate(() => { window.__ddsCard = (t, n) => ({ t, h: '<p>' + t + ': việc trong cung cần ngươi định liệu.</p>', opts: n.map(x => ({ n: x, fx: { danh: 1 }, x: 'thành: Danh +1', go: () => { } })).concat([{ n: 'Thôi', fx: {}, go: () => { } }]) }); try { if (window.DQ) DQ.user = (DQ.user || 0) + 1; Q.push(__ddsCard('Việc thứ nhất', ['Cách A', 'Cách B', 'Cách C'])); showModal() } finally { if (window.DQ) DQ.user-- } });
  await p.waitForTimeout(1500); await p.evaluate(() => document.querySelectorAll('.kfgain').forEach(e => e.remove()));
  const mark = async (txt, tag) => p.evaluate(([txt, tag]) => { const b = [...document.querySelectorAll('#modal .opts button[data-m]')].find(b => b.textContent.includes(txt)); if (!b) return false; b.setAttribute('data-ddsw', tag); return true }, [txt, tag]);
  if (!await mark('Cách A', 'hA')) { rows.push({ dev, name, verdict: 'SKIP', why: 'card A not drawn' }); return }
  await rt.tap('[data-ddsw="hA"]', { screen: name, label: 'Cách A (lift)' }); await p.waitForTimeout(700);
  const lifted = await p.evaluate(() => !!document.querySelector('#modal .opts.khand>button.klift'));
  if (H.how === 'x') { await rt.tap('#modal .kit-x, #modal [data-kx]', { screen: name, label: '✕' }); await p.waitForTimeout(1000); await p.evaluate(() => { try { if (window.DQ) DQ.user = (DQ.user || 0) + 1; Q.push(__ddsCard('Việc thứ hai', ['Cách D', 'Cách E'])); showModal() } finally { if (window.DQ) DQ.user-- } }) }
  else await p.evaluate(() => { Q.unshift(__ddsCard('Việc thứ hai', ['Cách D', 'Cách E'])); showModal() });
  await p.waitForTimeout(1500);
  const st = await p.evaluate(() => { const M = document.getElementById('modal'); const v = e => !!e && !e.hidden && e.getBoundingClientRect().width > 0; return { q0: Q[0] && Q[0].t, pair: v(M.querySelector('.dlg>.khconf')), plate: v(M.querySelector('.dlg>.khplate')), lift: !!M.querySelector('.opts.khand>button.klift') } });
  const stale = (st.pair || st.plate) && !st.lift;
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-new.jpg`), type: 'jpeg', quality: 60 });
  let chose = false;
  if (await mark('Cách D', 'hD')) { await rt.choose('[data-ddsw="hD"]', { screen: name, label: 'Cách D' }); await p.waitForTimeout(1500); chose = await p.evaluate(() => !(Q[0] && Q[0].t === 'Việc thứ hai')) }
  if (stale || !chose) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-fail.jpg`), type: 'jpeg', quality: 55 });
  rows.push({ dev, name, lifted, st, chose, verdict: !stale && chose ? 'ok' : 'FAIL', why: [stale ? 'stale ✓/✕ pair / lift plate on the new card (✓ dead)' : '', chose ? '' : 'new card not chosen by real taps'].filter(Boolean).join('; ') });
}

/* NO-EFFECT-HOLD (MAIN 178 ruling): card A's option «Ngắm hoa một lát» changes nothing (result card «ta không được gì, cũng không mất gì»);
   the next card B must show at once — never held behind the result card's «Tiếp ▸». Control: A's option with a gain still holds (RESULT-FIRST). */
const NOFX = {
  nofx_hold: { pick: 'Ngắm hoa một lát', wantHold: false },
  fx_hold_control: { pick: 'Dạo quanh vườn', wantHold: true },
};
async function runNoFx(p, dev, name, rows) {
  const rt = RT.make(p, { dev, touch: true, shots: OUT }); const N = NOFX[name];
  await clean(p);
  await p.evaluate(() => { try { if (window.DQ) DQ.user = (DQ.user || 0) + 1;
    Q.push({ t: 'Chiều trong vườn', h: '<p>Gió chiều lay rèm, hoa trong vườn vừa nở.</p>', opts: [{ n: 'Ngắm hoa một lát', fx: {}, x: '', go: () => { } }, { n: 'Dạo quanh vườn', fx: { danh: 1 }, x: 'thành: Danh +1' }] });
    Q.push({ t: 'Cung nữ bẩm báo', h: '<p>Có người ngoài cửa xin vào.</p>', opts: [{ n: 'Cho vào', fx: { danh: 1 }, x: 'thành: Danh +1' }, { n: 'Bảo đợi', fx: { duc: 1 }, x: 'thành: Đức +1' }] });
    showModal() } finally { if (window.DQ) DQ.user-- } });
  let st = null; for (let k = 0; k < 10; k++) { await p.waitForTimeout(400); await p.evaluate(() => document.querySelectorAll('.kfgain').forEach(e => e.remove())); st = await p.evaluate(READ); if (st.up) break }
  if (!st.up) { rows.push({ dev, name, verdict: 'SKIP', why: 'card A did not open', st }); return }
  const sel = await p.evaluate(n => { const b = [...document.querySelectorAll('#modal .opts button[data-m]')].find(b => b.textContent.includes(n)); if (!b) return null; b.setAttribute('data-ddsw', 'nofx'); return '[data-ddsw="nofx"]' }, N.pick);
  if (!sel) { rows.push({ dev, name, verdict: 'SKIP', why: 'option not drawn' }); return }
  for (let k = 0; k < 2; k++) { await rt.choose(sel, { screen: name, label: N.pick }); await p.waitForTimeout(1500); if (await p.evaluate(() => !(Q[0] && Q[0].t === 'Chiều trong vườn' && window.kaLastResult && !window.kaLastResult.rows.length))) break; if (!(await p.$(sel))) break }
  const r = await p.evaluate(() => { const M = document.getElementById('modal'); const t = document.getElementById('rtoast'); return { q0: Q[0] && Q[0].t || '', modalUp: !M.hidden && getComputedStyle(M).visibility !== 'hidden', held: !!(window.RF && RF.held), next: !!(t && t.querySelector('.kres-next')), res: window.kaLastResult ? window.kaLastResult.rows.map(x => x.k + ':' + x.items.join('/')).join(' | ').slice(0, 120) : '' } });
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-after.jpg`), type: 'jpeg', quality: 60 });
  const showsB = r.q0 !== 'Chiều trong vườn' && r.modalUp && !r.held && /không được gì/.test(r.res);/* the next card (B, or a game event that came first) is up, nothing held */
  const ok = N.wantHold ? (r.held && /duoc:/.test(r.res)) : showsB;
  if (!ok) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-fail.jpg`), type: 'jpeg', quality: 55 });
  rows.push({ dev, name, verdict: ok ? 'ok' : 'FAIL', why: ok ? '' : (N.wantHold ? 'control: a result with a gain did not hold' : 'a no-effect result held the next card behind «Tiếp ▸»'), r });
}

async function runCase(p, dev, name, C, rows) {
  const rt = RT.make(p, { dev, touch: true, shots: OUT });
  await clean(p);
  if (name === 'dongso') await openDongso(p); else { await p.evaluate(v => { document.querySelectorAll(v).forEach(e => e.remove()); Q.length = 0 }, VEILS); await p.evaluate(`(()=>{const f=${C.open.toString()};try{if(window.DQ)DQ.user=(DQ.user||0)+1;f();showModal()}finally{if(window.DQ)DQ.user--}})()`) }
  let st = null; for (let k = 0; k < 10; k++) { await p.waitForTimeout(500); await p.evaluate(() => document.querySelectorAll('.kfgain').forEach(e => e.remove())); st = await p.evaluate(READ); if (st.up) break }
  await p.waitForTimeout(600); st = await p.evaluate(READ);
  if (!st.up) { st.dbg = await p.evaluate(() => { const M = document.getElementById('modal'); let dawn = null; try { dawn = dqDawn() } catch (e) { dawn = 'x' } return { hid: M.hidden, dawn, dtc: !!document.getElementById('kdaytc'), dawnEl: !!document.getElementById('dawn'), rf: window.RF ? { held: RF.held, depth: RF.depth } : null, dq: window.DQ ? DQ.stat.modalHeld : null, dlg: (() => { const d = M.querySelector('.dlg'); if (!d) return null; const r = d.getBoundingClientRect(), cs = getComputedStyle(d), mc = getComputedStyle(M); return [Math.round(r.width), Math.round(r.height), cs.visibility, cs.opacity, cs.display, mc.display, mc.visibility, M.className, d.className] })(), user: window.DQ && DQ.user, mst: M.getAttribute('style'), bcl: document.body.className, kf: document.querySelectorAll('.kfgain,.kmov').length, ancV: (() => { let a = []; for (let e = M; e; e = e.parentElement) a.push(e.tagName + ':' + getComputedStyle(e).visibility); return a.join('>') })(), kids: [...document.body.children].filter(x => !x.hidden && getComputedStyle(x).display !== 'none').map(x => x.id).join(',') } }); rows.push({ dev, name, verdict: 'SKIP', why: 'dialog did not open', st }); return }
  const t0 = st.t, sig0 = st.sig;
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-open.jpg`), type: 'jpeg', quality: 50 });
  const ended = await scrollEnd(p, true);
  await p.screenshot({ path: path.join(OUT, `${dev}-${name}-end.jpg`), type: 'jpeg', quality: 50 });
  const ways = await p.evaluate(WAYS);
  const reach = [];
  for (const w of ways) { const pr = await p.$eval(`[data-ddsw="${w.tag}"]`, RT.PROBE).catch(() => null); reach.push(Object.assign({}, w, { pr })) }
  /* pick the way out this family names; else any close-type; else the last option card */
  const cand = ways.filter(w => C.way.test(w.lab));
  const pick = cand.find(w => w.close) || cand[0] || ways.find(w => w.close) || ways.filter(w => w.opt).pop();
  if (!pick) { rows.push({ dev, name, t: t0, verdict: 'FAIL', why: 'no way out at all (no ✕ / close / option)', ways: ways.map(w => w.lab), ended }); await p.screenshot({ path: path.join(OUT, `${dev}-${name}-noway.jpg`), type: 'jpeg', quality: 55 }); return }
  let ok = false, taps = 0;
  for (let k = 0; k < 3 && !ok; k++) {
    const sel = `[data-ddsw="${pick.tag}"]`;
    const alive = await p.$(sel); if (!alive) { ok = true; break }
    /* KK65 (RV-178 nit b): an OPTION card is chosen the way a person does (rt.choose: hand = lift → ✓), even when its label reads like a close
       («Để sau!» of «Danh hiệu mới» is a hand card: tapping its body only lifts it — KIT §101 / realtap rt.choose) */
    const r = (C.choose || pick.opt) ? await rt.choose(sel, { screen: name, label: pick.lab }) : await rt.tap(sel, { screen: name, label: pick.lab });
    taps++;
    await p.waitForTimeout(2500);
    const s2 = await p.evaluate(READ);
    ok = !s2.up || s2.sig !== sig0;
    if (!r && !ok) break;
  }
  if (!ok) await p.screenshot({ path: path.join(OUT, `${dev}-${name}-dead.jpg`), type: 'jpeg', quality: 55 });
  rows.push({ dev, name, t: t0, way: pick.lab, taps, verdict: ok ? 'ok' : 'FAIL', why: ok ? '' : `«${pick.lab}» tapped ${taps}× for real, dialog stays`, ended, ways: ways.map(w => w.lab + (w.dis ? '(off)' : '')).slice(0, 12), dead: rt.stats().deadList.map(d => d.label + ':' + (d.cover || d.k)).slice(0, 4) });
}

(async () => {
  const b = await chromium.launch(); const rows = []; let fails = 0;
  for (const dev of DEVS) {
    const ctx = await b.newContext({ viewport: VP[dev], serviceWorkers: 'block', hasTouch: true, isMobile: false });
    await ctx.route('http://localhost:8817/**', r => { const u = new URL(r.request().url()); const f = path.join(ROOT, decodeURIComponent(u.pathname)); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ status: 200, contentType: f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'application/javascript' : 'application/octet-stream', body: fs.readFileSync(f) }) });
    const p = await ctx.newPage(); p.setDefaultTimeout(240000); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto('http://localhost:8817/index.html', { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => typeof start === 'function' && typeof deser === 'function' && typeof kitNoticeOpen === 'function', null, { timeout: 240000 });
    await p.waitForTimeout(1500);
    for (const [name, C] of Object.entries(Object.assign({}, CASES, { ring_bieuqua: RINGS.ring_bieuqua, ring_tangqua: RINGS.ring_tangqua, ring_dangqua: RINGS.ring_dangqua, grid_bieuqua: PICKERS.grid_bieuqua, grid_tangqua: PICKERS.grid_tangqua, grid_dangqua: PICKERS.grid_dangqua, grid_dangtha: PICKERS.grid_dangtha, grid_plant: PICKERS.grid_plant }, NOFX, HANDS, RINGS))) {
      if (ONLY && !ONLY.includes(name)) continue;
      try { if (!p.__home || name === 'dongso' || p.__dirty) { await home(p); p.__home = 1; p.__dirty = 0 } if (name === 'dongso' || /^grid_/.test(name)) p.__dirty = 1;/* r7b: every grid case starts on a FRESH home (the previous case's gift moment / result held the queue → 1 SKIP per run) */ if (/^grid_/.test(name)) await runPicker(p, dev, name, rows); else if (NOFX[name]) await runNoFx(p, dev, name, rows); else if (RINGS[name]) await runRing(p, dev, name, rows); else if (HANDS[name]) await runHand(p, dev, name, rows); else await runCase(p, dev, name, C, rows) } catch (e) { rows.push({ dev, name, verdict: 'ERR', why: String(e.message).slice(0, 200) }) }
      const r = rows[rows.length - 1]; if (r.verdict !== 'ok' && r.verdict !== 'SKIP') fails++;
      console.log(JSON.stringify(r));
    }
    if (errs.length) console.log(dev, 'pageerrors', JSON.stringify(errs.slice(0, 5)));
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'dlg-dead-scan.json'), JSON.stringify(rows, null, 1));
  console.log(`dlg-dead-scan: ${rows.length} cases, ${fails} FAIL`);
  await b.close(); process.exit(fails ? 1 : 0);
})();
