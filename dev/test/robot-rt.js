#!/usr/bin/env node
/* robot-rt.js — ONE SOLO LIFE played with REAL TAPS (owner rules 25/11: ~05:10Z real taps · ~05:15Z a life ends only at
   death or a real ending, NO time cap · ~05:20Z/~05:40Z no bot-chosen exit road unless it is the only option left).
   usage: node dev/test/robot-rt.js <url> <out-dir> [key=value ...]
     dev=fold|ipad (Fold 755x1000 touch · iPad 1180x820 pointer)   origin=<origin key> road=<j67 road id>  (optional, set
     BEFORE the first tap through the game's own dev hooks window.__forceOrigin / a67init pick — no tap is simulated)
     bot=sens|rand|cautious|bold|quiet   seed=<n>   life=<name>   stuckMin=15 (no progress → stuck bug, unstick, SAME life)
     slice=<buổi> (self-test only: stop after n buổi; a sliced life is NOT a life)   cp=50 (buổi between save-size checkpoints)
   Every action is a tap through dev/test/realtap.js. page.evaluate is used only to READ the screen / state, plus the
   pre-life setup above and a recording wrapper on over() (it calls the game's own over unchanged).
   Output: <out>/<life>.json  {job, life, harness:{kind:'realtap',realtap:true,jsClicks:0,...}, exitPick, bugs, dead, saves}
           <out>/<life>.md short table; one status line per hour on stdout («STATUS …»). */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const RT = require('./realtap.js');

let SHA = ''; try { SHA = execSync('git -C ' + JSON.stringify(__dirname) + ' rev-parse --short=8 HEAD').toString().trim() } catch (e) {}

/* exit roads the bot may NOT choose while another option exists (owner ~05:20Z list + every «kết thúc kiếp này» road) */
const EXIT_RE = /xuất gia|xuất cung|về quê|thứ dân|bỏ cuộc|kiếp mới|luân hồi|an nhiên|giả chết|cao chạy|kết thúc kiếp|xuất giá|thành thân|vương phủ|tự vẫn|tự tận|quyên sinh|bắt đầu lại|chơi lại|rời cung|xin ra khỏi cung/i;
const CLOSE_RE = /^(✕|×|x|đóng|lui|thôi|quay lại|trở về|để sau|bỏ qua)$/i;
const LOW_RE = /hướng dẫn|luật chơi|về luật|^bỏ qua|xem đầy đủ|^\?$|^$/i; /* help / skip / empty icons: only when nothing else */
/* leaving a co-op room / going back to the title is NEVER a robot move (not a game ending): never tapped, the robot waits instead */
const LEAVE_RE = /màn đầu|bỏ phòng|rời phòng|thoát phòng|rời khỏi danh sách|chép đường dẫn|gửi đường dẫn|chép mã|về trang đầu/i;
const NAV_RE = /thiết lập|sổ luân hồi|bảng vàng|cùng hảo hữu|hảo hữu|☰|giữ sổ|nối sổ|ám hiệu|xóa|xoá|âm thanh|nhạc/i;
const ODDS = { 'mong manh': 0, 'hiểm': 1, 'khó lường': 2, 'tùy duyên': 3, 'có cơ': 4, 'vững': 5, 'rất vững': 6, 'liều': 0, 'khó': 1, 'năm ăn năm thua': 3, 'khá chắc': 4, 'chắc': 5, 'rất chắc': 6, 'nắm chắc': 6 };

function Seat(C) {
const URL0 = C.url, DEV = C.dev || 'fold', BOT = C.bot || 'sens', SEED = +C.seed || 1, LIFE = C.life || ['rt', C.origin || 'any', BOT, DEV, SEED].join('-');
const STUCK_MS = (+C.stuckMin || 15) * 60e3, SLICE = +C.slice || 0, CP = +C.cp || 50, A = { origin: C.origin, road: C.road };
const OUT = path.resolve(C.out), SHOTS = path.join(OUT, 'shots-' + LIFE); fs.mkdirSync(SHOTS, { recursive: true });
let rs = SEED >>> 0 || 1; const rnd = () => { rs ^= rs << 13; rs >>>= 0; rs ^= rs >>> 17; rs ^= rs << 5; rs >>>= 0; return rs / 4294967296 };
const pick = a => a[Math.floor(rnd() * a.length)];
const T0 = Date.now(), sec = () => Math.round((Date.now() - T0) / 1e3);
const R = { job: { id: LIFE, origin: A.origin || null, road: A.road || null, bot: BOT, seed: SEED, dev: DEV, url: URL0 },
  harness: { kind: 'realtap', sha: SHA, realtap: true, jsClicks: 0, deadButtons: 0, cap: null, stuck: 0, unstick: [], slice: SLICE || null },
  life: null, exitPick: null, bugs: [], dead: [], saves: [], buoi: 0, steps: 0, status: [] };
const bug = (type, msg, extra) => { const k = type + '|' + msg; const b = R.bugs.find(x => x.k === k); if (b) { b.n++; return b } const n = { k, type, msg, n: 1, at: sec(), ...extra }; R.bugs.push(n); console.log('BUG', type, msg); return n };

/* ---- read-only screen reader: which layer is on top, its buttons (index into a fresh handle list) ---- */
const SCAN = () => {
  const LAYER = '#modal,#ov,.modal,.ov,[role=dialog],.dlg,.kpdlg,.kmov,#kroul,.kroul,#kpop,.kpop,#title,.title,#kload,#klife';
  const W = innerWidth, H = innerHeight;
  const vis = e => { if (!e.isConnected || e.disabled || e.getAttribute('aria-disabled') === 'true') return false; const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; const cs = getComputedStyle(e); return cs.visibility !== 'hidden' && cs.display !== 'none' && cs.pointerEvents !== 'none' && (e.checkVisibility ? e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) : e.offsetParent !== null || cs.position === 'fixed') };
  /* a layer = a known dialog/scene container, else any fixed/absolute box covering ≥ 40 % of the screen (scene, dawn calendar …) */
  const big = e => { const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'absolute') return false; if (cs.pointerEvents === 'none') return false; const r = e.getBoundingClientRect(); return r.width * r.height >= 0.4 * W * H };
  const layerOf = e => { if (!e || !e.closest) return document.body; const k = e.closest(LAYER); if (k) return k; let s = e; while (s && s !== document.body) { if (big(s)) return s; s = s.parentElement } return document.body };
  /* top layer = what a person sees at the middle of the screen (a few points) */
  const votes = new Map(); for (const [fx, fy] of [[.5, .5], [.5, .35], [.5, .65], [.3, .5], [.7, .5]]) { const t = document.elementFromPoint(W * fx, H * fy); const l = layerOf(t); votes.set(l, (votes.get(l) || 0) + 1) }
  let lay = [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
  /* a dialog without a backdrop (person dialog «Tâm trạng · …») leaves the page tappable: a person deals with the open dialog first */
  { const dl = [...document.querySelectorAll('.dlg,[role=dialog]')].filter(d => { const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); return r.width > 40 && r.height > 40 && cs.display !== 'none' && cs.visibility !== 'hidden' && d.offsetParent !== null && !d.closest('[hidden]') && [...d.querySelectorAll('button')].some(b => { const q = b.getBoundingClientRect(); const t = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); return t && (t === b || b.contains(t)) }) });
    if (dl.length && (lay === document.body || !dl.some(d => d === lay || d.contains(lay) || lay.contains(d)))) lay = dl[dl.length - 1] }
  /* visible clip of an element: viewport ∩ every overflow ancestor */
  const clip = e => { let r = e.getBoundingClientRect(), x0 = Math.max(0, r.left), y0 = Math.max(0, r.top), x1 = Math.min(W, r.right), y1 = Math.min(H, r.bottom); let s = e.parentElement; while (s && s !== document.body) { const cs = getComputedStyle(s); if (/(auto|scroll|hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY)) { const q = s.getBoundingClientRect(); x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom) } s = s.parentElement } return { x0, y0, x1, y1, full: x0 <= r.left + 1 && y0 <= r.top + 1 && x1 >= r.right - 1 && y1 >= r.bottom - 1, any: x1 - x0 > 4 && y1 - y0 > 4 } };
  const all = [...document.querySelectorAll('button,[role=button],[data-tab],.kcard[data-i],input[type=text],input:not([type])')].filter(vis).filter(e => !e.parentElement.closest('button,[role=button]'));
  const probe = e => { const c = clip(e); if (!c.any) return { hit: false, clipped: true }; const pts = [[.5, .5], [.5, .3], [.5, .7], [.25, .5], [.75, .5]]; let cover = null; for (const [fx, fy] of pts) { const x = c.x0 + (c.x1 - c.x0) * fx, y = c.y0 + (c.y1 - c.y0) * fy; const t = document.elementFromPoint(x, y); if (t && (t === e || e.contains(t))) return { hit: true }; if (!cover) cover = t } return { hit: false, full: c.full, cover: cover && (cover.tagName.toLowerCase() + (cover.id ? '#' + cover.id : '') + (typeof cover.className === 'string' && cover.className ? '.' + cover.className.trim().split(/\s+/).slice(0, 2).join('.') : '')), foreign: cover && !cover.contains(e) && layerOf(cover) !== layerOf(e) && !cover.closest('#kpop,.kpop,#kxcatch,#ktut,#title,#kload') } };
  const txt = e => (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim();
  const inLay = e => lay === document.body ? layerOf(e) === document.body : lay.contains(e);
  let btns = all.filter(inLay).map(e => ({ e, p: probe(e) }));
  if (!btns.some(x => x.p.hit)) { const hl = all.map(e => ({ e, p: probe(e) })).filter(x => x.p.hit); if (hl.length) { lay = layerOf(hl[hl.length - 1].e); btns = all.filter(inLay).map(e => ({ e, p: probe(e) })) } }
  /* tutorial (Lời dặn #ktut): .ktut-blk blocks every card but the highlighted one BY DESIGN → the gate is the layer: its own buttons + the hole target */
  const tut = document.getElementById('ktut'); let gate = false;
  if (tut && !tut.hidden && tut.querySelector('.ktut-blk,.ktut-card') && getComputedStyle(tut).display !== 'none') { gate = true; lay = tut; btns = all.map(e => ({ e, p: probe(e) })).filter(x => x.p.hit) }
  window.__rtBtns = btns.map(x => x.e);
  let S0 = null; try { S0 = typeof S !== 'undefined' && S ? { dead: !!S.dead, y: S.year, t: S.turn, w: S.tuan, b: S.buoi || 0, age: S.age, rank: S.rank, name: S.name } : null } catch (e) {}
  return { layer: lay === document.body ? 'page' : (lay.id ? '#' + lay.id : '.' + String(lay.className).split(' ')[0]), title: ((lay.querySelector && lay.querySelector('h2,h3,.kh,.ttl')) || {}).textContent ? lay.querySelector('h2,h3,.kh,.ttl').textContent.trim().slice(0, 50) : '',
    b: btns.map((x, i) => ({ i, t: txt(x.e).slice(0, 90), id: x.e.id || '', c: String(x.e.className || '').slice(0, 40), d: Object.keys(x.e.dataset).join(','), inp: x.e.tagName === 'INPUT', hole: gate && !tut.contains(x.e), hit: x.p.hit, deadSuspect: !x.p.hit && x.p.full && x.p.foreign ? x.p.cover : null, x: /kit-x|kclose/.test(x.e.className) || /^(✕|×)$/.test(txt(x.e)) })),
    lr: (() => { const r = (lay === document.body ? document.documentElement : lay).getBoundingClientRect(); return { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(W, r.right) - Math.max(0, r.left), h: Math.min(H, r.bottom) - Math.max(0, r.top) } })(),
    code: !(S0 && S0.name && !S0.dead) ? ((document.body.innerText || '').match(/Ám hiệu\s*:?\s*([A-Z0-9]{4})(?![A-Za-z0-9])/) || [])[1] || null : null,
    S: S0, end: !!window.__rtEnd };
};

async function play(p) {
  p.on('pageerror', e => bug('js', 'page error: ' + e.message.split('\n')[0].slice(0, 160)));
  p.on('crash', () => bug('crash', 'tab crashed'));
  const rt = RT.make(p, { dev: DEV, shots: SHOTS, ignoreCover: /kpop|kxcatch|ktut|#title|#kload/, touch: DEV !== 'ipad', log: d => { (R.trace = R.trace || []).push([sec(), d.k === 'tap' ? (d.screen || '') + ' «' + d.label + '»' : 'DEAD ' + d.label]); if (R.trace.length > 400) R.trace.shift(); if (process.env.RTV) console.log('TAP', d.screen, '«' + d.label + '»'); if (d.k === 'DEAD BUTTON') { R.dead.push({ ...d, at: sec(), S: lastS }); console.log('DEAD BUTTON', d.screen, '«' + d.label + '»', 'cover', d.cover) } } });
  let lastS = null;
  const boot = async () => {
    if (!C.noBoot) await p.goto(URL0, { waitUntil: 'load', timeout: 0 });
    await p.waitForFunction(() => typeof start === 'function' && typeof over === 'function', null, { timeout: 0 });
    /* pre-life setup (no taps): forced thân phận through the game's own dev hooks + a recording wrapper on over() */
    await p.evaluate(C => {
      if (C.origin) { window.__forceOrigin = C.origin }
      if (C.road && typeof a67init === 'function' && !window.__rtRoad) { window.__rtRoad = 1; const i0 = a67init; a67init = function () { const p0 = pk67, c0 = choose67, want = C.road; pk67 = function (a) { return Array.isArray(a) && a.includes(want) ? want : p0.apply(this, arguments) }; choose67 = function (k, ids) { return Array.isArray(ids) && ids.includes(want) ? want : c0.apply(this, arguments) }; try { return i0.apply(this, arguments) } finally { pk67 = p0; choose67 = c0 } } }
      if (!window.__rtOver) { window.__rtOver = 1; const o0 = over; over = function (h, t, fate, alive) { try { if (!S.dead) window.__rtEnd = { id: String(h), fate: String(fate || '').replace(/<[^>]+>/g, ''), text: String(t || '').replace(/<[^>]+>/g, '').slice(0, 200), alive: !!alive, age: S.age, year: S.year, rank: S.rank, turn: S.turn } } catch (e) {} return o0.apply(this, arguments) } }
    }, { origin: A.origin, road: A.road });
  };
  await boot();

  await p.evaluate(() => { window.__rtEnd = null }).catch(() => {});
  const actsPerBuoi = { sens: 2, rand: 3, cautious: 1, bold: 3, quiet: 0 }[BOT] ?? 2;
  let idle = 0, noFx = new Map(), deadSeen = new Set(), acts = 0, lastKey = '', lastProg = Date.now(), repeat = new Map(), sameScr = 0, lastSig = '', started = false, cpAt = 0, statusAt = Date.now();
  const clockKey = s => s ? [s.y, s.t, s.w, s.b].join('.') : 'none';

  for (;;) {
    R.steps++;
    let sc; try { sc = await p.evaluate(SCAN) } catch (e) { await p.waitForTimeout(1000); continue }
    lastS = sc.S;
    if (sc.end || sc.S && sc.S.dead && started) { break }
    if (sc.S && sc.S.name && !sc.S.dead && !started) { started = true; if (C.onStart) C.onStart() }
    /* progress + checkpoints */
    const key = clockKey(sc.S);
    if (key !== lastKey) { if (lastKey && sc.S) { R.buoi++; acts = 0; repeat.clear() } lastKey = key; lastProg = Date.now();
      if (R.buoi - cpAt >= CP) { cpAt = R.buoi; const sz = await p.evaluate(() => { let m = 0, k0 = ''; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/save/.test(k)) { const n = (localStorage.getItem(k) || '').length; if (n > m) { m = n; k0 = k } } } return { k: k0, n: m } }).catch(() => null); if (sz) { R.saves.push({ buoi: R.buoi, year: sc.S && sc.S.y, chars: sz.n, key: sz.k }); console.log('CP buổi', R.buoi, 'year', sc.S && sc.S.y, 'save', sz.n, 'chars') } } }
    if (SLICE && R.buoi >= SLICE) { R.sliced = true; break }
    if (Date.now() - statusAt > 3600e3) { statusAt = Date.now(); const l = 'STATUS ' + LIFE + ' · buổi ' + R.buoi + ' · year ' + (sc.S && sc.S.y) + ' · rank ' + (sc.S && sc.S.rank) + ' · bugs ' + R.bugs.length + ' · stuck ' + R.harness.stuck + ' · dead buttons ' + R.dead.length; R.status.push(l); console.log(l); save() }
    if (Date.now() - (R._snapAt || 0) > 60e3) { R._snapAt = Date.now(); await p.screenshot({ path: path.join(SHOTS, 'now.png') }).catch(() => {}); if (process.env.RTV) console.log('NOW', sc.layer, '«' + sc.title + '»', 'hit', sc.b.filter(x => x.hit).length, 'idle', idle, 'buổi', R.buoi, 'areaTaps', R.harness.areaTaps || 0) }
    /* stuck: no clock progress for STUCK_MS → bug + shot + save, unstick, SAME life continues */
    if (started && Date.now() - lastProg > STUCK_MS) { R.harness.stuck++; const shot = path.join(SHOTS, 'stuck-' + R.harness.stuck + '.png'); await p.screenshot({ path: shot }).catch(() => {});
      const sv = await p.evaluate(() => { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/save/.test(k)) return localStorage.getItem(k) } return null }).catch(() => null); const svf = path.join(SHOTS, 'stuck-' + R.harness.stuck + '-save.json'); if (sv) fs.writeFileSync(svf, sv);
      bug('stuck', 'no progress ' + Math.round(STUCK_MS / 60e3) + ' min on ' + sc.layer + ' «' + sc.title + '»', { shot, save: sv ? svf : null, S: sc.S, buttons: sc.b.map(b => b.t).slice(0, 12) });
      await unstick(p, rt, sc, 3); lastProg = Date.now(); continue }
    /* a layer with nothing to tap (loading / scene / gate): wait like a person, then tap the middle of the screen */
    if (!sc.b.some(x => x.hit) && sc.b.length && idle === 40) { const h = await p.evaluateHandle(() => window.__rtBtns[0]); await rt.tap(h, { screen: sc.layer + (sc.title ? ' «' + sc.title + '»' : ''), label: sc.b[0].t.slice(0, 50) }) }
    if (!sc.b.some(x => x.hit)) { idle++; if (idle > 4) { /* scene gate / mini-game board without buttons: tap inside it like a person */ const r = sc.lr; for (let k = 0; k < 6; k++) { const x = r.x + r.w * (0.15 + 0.7 * rnd()), y = r.y + r.h * (0.2 + 0.65 * rnd()); /* never land on a button (an exit road could sit there): only bare board / scene area */ const bare = await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y); return !!t && !t.closest('button,[role=button],a,input,select,textarea,[data-tab]') }, [x, y]).catch(() => false); if (!bare) continue; if (DEV === 'ipad') await p.mouse.click(x, y); else await p.touchscreen.tap(x, y); R.harness.areaTaps = (R.harness.areaTaps || 0) + 1; break } } await p.waitForTimeout(idle > 4 ? 250 : 500); continue }
    idle = 0;
    /* a button of the top layer, fully on screen, covered by ANOTHER layer → real tap on it → DEAD BUTTON if the cover stays */
    for (const d of started ? sc.b.filter(x => x.deadSuspect) : []) { const ds = sc.layer + '|' + sc.title + '|' + d.t; if (deadSeen.has(ds)) continue; deadSeen.add(ds); await p.waitForTimeout(3000); const s2 = await p.evaluate(SCAN).catch(() => null); const d2 = s2 && s2.b.find(x => x.t === d.t && x.deadSuspect); if (d2) { const h = await p.evaluateHandle(i => window.__rtBtns[i], d2.i); await rt.tap(h, { screen: s2.layer + (s2.title ? ' «' + s2.title + '»' : ''), label: d.t.slice(0, 50) }) } }
    /* same screen many steps → light unstick (Escape / ✕) — logged, not a stuck bug */
    const sig = sc.layer + '|' + sc.title + '|' + sc.b.map(b => b.t).join('/') + '|' + key;
    if (sig === lastSig) sameScr++; else { sameScr = 0; lastSig = sig }
    if (sameScr > 25) { await unstick(p, rt, sc, sameScr > 60 ? 2 : 1); sameScr = 0; continue }
    const ch = choose(sc, started);
    if (!ch) { await p.waitForTimeout(400); continue }
    if (ch.exit) { R.exitPick = { label: ch.t, n: ch.n, only: ch.only, at: sec(), S: sc.S }; console.log('EXIT ROAD', ch.only ? '(only option — real ending)' : '', '«' + ch.t + '»') }
    const h = await p.evaluateHandle(i => window.__rtBtns[i], ch.i);
    const ok = await rt.tap(h, { screen: sc.layer + (sc.title ? ' «' + sc.title + '»' : ''), label: ch.t.slice(0, 50), wait: 1500, confirm: async () => { const s3 = await p.evaluate(SCAN); return s3.layer === sc.layer && s3.title === sc.title } });
    const rk = sig + '#' + ch.t; repeat.set(rk, (repeat.get(rk) || 0) + (ok ? 1 : 5));
    /* a close (✕ / Lui) tapped for real 3× and the same dialog is still there = button with no effect → bug + shot */
    if (ok && (ch.x || CLOSE_RE.test(ch.t)) && sc.layer !== 'page') { await p.waitForTimeout(600); const s4 = await p.evaluate(SCAN).catch(() => null); if (s4 && s4.layer === sc.layer && s4.title === sc.title && sc.title) { const k = 'nx|' + sc.layer + '|' + sc.title; noFx.set(k, (noFx.get(k) || 0) + 1); if (noFx.get(k) === 3) { const shot = path.join(SHOTS, 'noeffect-' + Date.now() + '.png'); await p.screenshot({ path: shot }).catch(() => {}); R.dead.push({ k: 'NO EFFECT', screen: sc.layer + ' «' + sc.title + '»', label: ch.t, cover: 'tapped 3× for real, dialog stays', shot, at: sec(), S: sc.S }); bug('dead', 'close button has no effect: ' + sc.layer + ' «' + sc.title + '» «' + ch.t + '»', { shot }) } } }
    if (ok && ch.type) { await p.waitForTimeout(200); await p.keyboard.press('Control+A').catch(() => {}); await p.keyboard.type(String(ch.type), { delay: 80 }); R.harness.typed = (R.harness.typed || 0) + 1 }
    if (ok && (sc.layer === 'page' || sc.b.some(x => x.id === 'next')) && !ch.next) acts++;
    await p.waitForTimeout(ok ? 220 : 400);

    function choose(sc, started) {
      const hb = sc.b.filter(x => x.hit && !LEAVE_RE.test(x.t) && !(started && /^(cfz|coop)$/.test(x.d))); let b = hb.filter(x => (repeat.get(sig + '#' + x.t) || 0) < 4);
      if (!b.length) b = hb;
      const isExit = x => EXIT_RE.test(x.t) && !(!started && /kiếp mới/i.test(x.t) && sc.layer !== 'page');
      /* back on the title after the life started (room dropped / reload): co-op seat rejoins its room or waits; solo continues its sổ */
      if (started && b.some(x => /^chơi một mình/i.test(x.t))) { const back = b.find(x => /trở lại phòng|vào lại phòng|về phòng/i.test(x.t)); if (back) return back; if (C.pre || C.coop) { R.titleBack = (R.titleBack || 0) + 1; return null } }
      if (!started && C.pre) { const r = C.pre(sc, b); if (r === 'wait') return null; if (r) return r }
      if (!started) { /* title → solo → new life in slot 1 → skip roulette → accept identity */
        const pref = [/chơi một mình/i, /^bắt đầu kiếp mới$/i, /bỏ qua/i, /nhận thân phận/i, /^(vào cung|bắt đầu|nhập cung)/i];
        for (const re of pref) { const f = b.find(x => re.test(x.t)); if (f) return { ...f } }
        const nl = b.find(x => /data-nl|nl/.test(x.d) && /ok/i.test(x.t)); if (nl) return nl;
      }
      const hole = b.find(x => x.hole && !EXIT_RE.test(x.t)); if (hole) return hole; /* tutorial: tap what it points at */
      const nav = x => NAV_RE.test(x.t);
      const close = x => x.x || CLOSE_RE.test(x.t);
      const opts = b.filter(x => !nav(x) && !close(x) && !x.inp);
      const nonExit = opts.filter(x => !isExit(x));
      const exits = opts.filter(isExit);
      const isPage = sc.layer === 'page' || sc.b.some(x => x.id === 'next');
      if (!isPage) {
        const main = nonExit.filter(x => !LOW_RE.test(x.t));
        if (main.length) return score(main);
        const cl = b.find(close); if (cl) return cl; /* ✕ / Lui before help / empty-label icons (portrait re-opens the same dialog) */
        if (nonExit.length) return score(nonExit);
        if (exits.length) { const e = score(exits); return { ...e, exit: true, n: opts.length, only: true } }
        return null;
      }
      /* main screen: a few actions per buổi (persona), then «Sang buổi» */
      const next = b.find(x => x.id === 'next');
      const acts0 = nonExit.filter(x => x.id !== 'next' && !/^(menu|me)$/.test(x.id) && !LOW_RE.test(x.t));
      if (acts < actsPerBuoi && acts0.length && rnd() < 0.85) return score(acts0);
      if (next) return { ...next, next: true };
      if (acts0.length) return score(acts0);
      const cl = b.find(close); return cl || null;
    }
    function score(list) {
      if (BOT === 'rand' || list.length === 1) return pick(list);
      const sc = list.map(x => { const m = Object.keys(ODDS).filter(k => x.t.toLowerCase().includes(k)).map(k => ODDS[k]); const o = m.length ? Math.max(...m) : 3; const w = BOT === 'bold' ? 7 - o : BOT === 'cautious' ? o * 2 : o; return { x, w: w + rnd() * 3 } });
      sc.sort((a, b) => b.w - a.w); return sc[0].x;
    }
  }

  /* life over → read the ending (the game's own over() args) */
  const end = await p.evaluate(() => window.__rtEnd || null).catch(() => null);
  if (end) { const death = !end.alive; R.life = { id: end.id, type: death ? 'death' : 'end', fate: end.fate, death, age: end.age, year: end.year, rank: end.rank, text: end.text } }
  else if (R.sliced) R.life = { id: 'SLICE', type: 'slice', fate: 'self-test slice of ' + SLICE + ' buổi (not a life)' };
  else R.life = { id: '?', type: '?' };
  if (R.exitPick && R.life) R.life.exitPick = R.exitPick;
  await p.screenshot({ path: path.join(SHOTS, 'end.png') }).catch(() => {});
  R.harness.deadButtons = R.dead.length; R.harness.taps = rt.stats().taps; R.t = { total: Date.now() - T0 };
  save();
  console.log('LIFE DONE ' + LIFE + ' ' + (R.life.id) + ' age ' + (R.life.age ?? '?') + ' · buổi ' + R.buoi + ' · taps ' + R.harness.taps + ' · dead buttons ' + R.dead.length + ' · stuck ' + R.harness.stuck + ' · bugs ' + R.bugs.length);
}

/* unstick ladder (all real input): 1 Escape key · 2 tap the top layer ✕ / any close · 3 reload + continue the same save from the title */
async function unstick(p, rt, sc, lvl) {
  R.harness.unstick.push({ at: sec(), lvl, layer: sc.layer, title: sc.title });
  await p.keyboard.press('Escape').catch(() => {}); await p.waitForTimeout(500);
  if (lvl >= 2) { const i = sc.b.findIndex(b => b.x || CLOSE_RE.test(b.t)); if (i >= 0) { await p.evaluate(SCAN).catch(() => {}); const h = await p.evaluateHandle(i => window.__rtBtns[i], i); await rt.tap(h, { screen: sc.layer, label: 'unstick ✕' }) } }
  if (lvl >= 3) {
    await p.reload({ waitUntil: 'load' }).catch(() => {}); await p.waitForFunction(() => typeof start === 'function', null, { timeout: 0 }).catch(() => {});
    await p.evaluate(() => { if (!window.__rtOver) { window.__rtOver = 1; const o0 = over; over = function (h, t, fate, alive) { try { if (!S.dead) window.__rtEnd = { id: String(h), fate: String(fate || '').replace(/<[^>]+>/g, ''), alive: !!alive, age: S.age, year: S.year, rank: S.rank } } catch (e) {} return o0.apply(this, arguments) } } }).catch(() => {});
    for (const re of (C.coop ? [/cùng hảo hữu/i, /trở lại phòng|vào lại phòng|về phòng/i] : [/chơi một mình/i, /chơi tiếp|tiếp tục|vào sổ|^tải$/i])) { for (let k = 0; k < 30; k++) { const s2 = await p.evaluate(SCAN).catch(() => null); const i = s2 ? s2.b.findIndex(b => re.test(b.t) || re.source.includes('chơi tiếp') && /load/.test(b.d)) : -1; if (i >= 0) { const h = await p.evaluateHandle(i => window.__rtBtns[i], i); await rt.tap(h, { screen: 'title (unstick reload)', label: re.source }); await p.waitForTimeout(1500); break } await p.waitForTimeout(500) } }
  }
}
function save() { const f = path.join(OUT, LIFE + '.json'); fs.writeFileSync(f, JSON.stringify(R, null, 1));
  fs.writeFileSync(path.join(OUT, LIFE + '.md'), ['# ' + LIFE + ' (real-tap harness ' + SHA + ', ' + DEV + ')', '', '| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick |', '|---|---|---|---|---|---|---|---|---|',
    '| ' + LIFE + ' | ' + (R.life ? R.life.id + (R.life.fate ? ' — ' + R.life.fate : '') : 'running') + ' | ' + (R.life && R.life.age || '') + ' | ' + R.buoi + ' | ' + (R.harness.taps || '') + ' | ' + R.dead.length + ' | ' + R.harness.stuck + ' | ' + R.bugs.length + ' | ' + (R.exitPick ? R.exitPick.label + (R.exitPick.only ? ' (only option)' : '') : '—') + ' |', '',
    '## Dead buttons', ''].concat(R.dead.slice(0, 100).map(d => '- ' + d.screen + ' «' + d.label + '» covered by ' + d.cover + (d.shot ? ' · ' + path.basename(d.shot) : ''))).concat(['', '## Bugs', ''], R.bugs.map(b => '- [' + b.type + '] ×' + b.n + ' ' + b.msg)).join('\n')) }

return { R, play, save, get life() { return LIFE } };
}

module.exports = { Seat, EXIT_RE };

if (require.main === module) {
const [, , URL0, OUT0, ...KV] = process.argv;
if (!URL0 || !OUT0) { console.error('usage: node dev/test/robot-rt.js <url> <out-dir> [dev=fold|ipad] [origin=..] [road=..] [bot=..] [seed=..] [life=..] [slice=..]'); process.exit(2) }
const A = Object.fromEntries(KV.map(s => s.split('=')));
const DEV = A.dev || 'fold', VP = DEV === 'ipad' ? { width: 1180, height: 820 } : { width: 755, height: 1000 };
const BOT = A.bot || 'sens', SEED = +A.seed || 1, LIFE = A.life || ['rt', A.origin || 'any', BOT, DEV, SEED].join('-');
const STUCK_MS = (+A.stuckMin || 15) * 60e3, SLICE = +A.slice || 0, CP = +A.cp || 50;
const OUT = path.resolve(OUT0), SHOTS = path.join(OUT, 'shots-' + LIFE); fs.mkdirSync(SHOTS, { recursive: true });
const seat = Seat({ url: URL0, out: OUT0, dev: DEV, bot: A.bot, seed: A.seed, life: A.life, origin: A.origin, road: A.road, stuckMin: A.stuckMin, slice: A.slice, cp: A.cp });
(async () => {
  const br = await chromium.launch();
  const ctx = await br.newContext({ viewport: VP, deviceScaleFactor: 1, hasTouch: DEV !== 'ipad', isMobile: DEV !== 'ipad', serviceWorkers: 'block' });
  const p = await ctx.newPage();
  try { await seat.play(p) } catch (e) { seat.R.bugs.push({ type: 'harness', msg: 'runner error: ' + String(e.message).split('\n')[0], n: 1 }); seat.R.life = seat.R.life || { id: 'HARNESS', type: 'harness' }; seat.save(); console.error(e); process.exitCode = 1 }
  await br.close();
})();
}
