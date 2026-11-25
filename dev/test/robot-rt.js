#!/usr/bin/env node
/* robot-rt.js — ONE SOLO LIFE played with REAL TAPS (owner rules 25/11: ~05:10Z real taps · ~05:15Z a life ends only at
   death or a real ending, NO time cap · ~05:20Z/~05:40Z no bot-chosen exit road unless it is the only option left).
   usage: node dev/test/robot-rt.js <url> <out-dir> [key=value ...]
     dev=fold|ipad (Fold 755x1000 touch · iPad 1180x820 pointer)   origin=<origin key> road=<j67 road id>  (optional, set
     BEFORE the first tap through the game's own dev hooks window.__forceOrigin / a67init pick — no tap is simulated)
     bot=sens|rand|cautious|bold|quiet   seed=<n>   life=<name>   stuckMin=15 (no progress → stuck bug, unstick, SAME life)
     resume=1 (continue the SAME life from <out>/<life>.ckpt.json after a crash / container restart; written every cp buổi and 10 min)
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
/* RESUME (container restart): <out>/<life>.ckpt.json holds R + the game's localStorage save + rng state; resume=1 continues the SAME life */
const CKPT = path.join(OUT, LIFE + '.ckpt.json'); let ck = null;
if (C.resume && fs.existsSync(CKPT)) { try { ck = JSON.parse(fs.readFileSync(CKPT, 'utf8')); Object.assign(R, ck.R); rs = ck.rs >>> 0 || rs; R.harness.taps0 = R.harness.taps || 0; R.harness.resumed = (R.harness.resumed || []).concat([{ at: new Date().toISOString(), buoi: R.buoi, from: ck.at }]); console.log('RESUME', LIFE, 'from', ck.at, 'buổi', R.buoi) } catch (e) { console.log('RESUME failed: ' + e.message); ck = null } }
const bug = (type, msg, extra) => { const k = type + '|' + msg; const b = R.bugs.find(x => x.k === k); if (b) { b.n++; return b } const n = { k, type, msg, n: 1, at: sec(), ...extra }; R.bugs.push(n); console.log('BUG', type, msg); return n };

/* ---- read-only screen reader: which layer is on top, its buttons (index into a fresh handle list) ---- */
/* open info layer that a person would tap away: returns a bare point ON it (each of these closes on a tap), or null */
const INFO = () => { const W = innerWidth, H = innerHeight;
  const vis = e => { if (!e || e.hidden) return false; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.05 || cs.pointerEvents === 'none') return false; const r = e.getBoundingClientRect(); return r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < H };
  for (const sel of ['#kpzoom', '#kpinfo', '#kpop', '#rtoast.on']) { const e = document.querySelector(sel); if (!vis(e)) continue;
    if (sel === '#rtoast.on') { /* the result toast only matters when it covers a button the player needs */ const blocks = [...document.querySelectorAll('button,[role=button],[data-tab]')].some(b => { if (e.contains(b)) return false; const r = b.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; const x = r.left + r.width / 2, y = r.top + r.height / 2; if (x < 0 || y < 0 || x > W || y > H) return false; const t = document.elementFromPoint(x, y); return !!t && e.contains(t) }); if (!blocks) continue }
    const r = e.getBoundingClientRect(); for (const [fx, fy] of [[.5, .12], [.25, .2], [.75, .2], [.5, .5], [.2, .85]]) { const x = Math.max(2, Math.min(W - 2, r.left + r.width * fx)), y = Math.max(2, Math.min(H - 2, r.top + r.height * fy)); const t = document.elementFromPoint(x, y); if (t && e.contains(t) && !t.closest('.kalog,.kkem,button,[role=button],a,input,select,textarea')) return { sel, x, y } }
    if (sel === '#kpop') { /* a hint closes on any tap: pick bare space (never a button — the tap goes on through to what is under it) */ for (const [x, y] of [[W / 2, 6], [6, H / 2], [W - 6, H / 2], [W / 2, H - 6], [6, 6]]) { const t = document.elementFromPoint(x, y); if (t && !t.closest('button,[role=button],a,input,select,textarea,[data-tab],[data-tip],[data-kzoom],.kodm,.kgl')) return { sel, x, y } } } }
  return null };
const SCAN = () => {
  const LAYER = '#modal,#ov,.modal,.ov,[role=dialog],.dlg,.kpdlg,#dawn,.kne,.kmov,#kroul,.kroul,#kpop,.kpop,#title,.title,#kload,#klife';
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
  const all = [...document.querySelectorAll('button,[role=button],[data-tab],.kcard[data-i],input[type=text],input:not([type])')].filter(vis).filter(e => !e.parentElement.closest('button,[role=button]')).filter(e => !e.matches('.kodm,.kgl,[data-kodds],[data-kgl]')) /* odds word / glossary chips only open a hint (#kpop), they are not moves (s2d «Vững» ×4 loop) */;
  const probe = e => { const c = clip(e); if (!c.any) return { hit: false, clipped: true }; const pts = [[.14, .5], [.5, .5], [.3, .5], [.86, .5], [.5, .3], [.5, .7]]; let cover = null; for (const [fx, fy] of pts) { const x = c.x0 + (c.x1 - c.x0) * fx, y = c.y0 + (c.y1 - c.y0) * fy; const t = document.elementFromPoint(x, y); if (t && (t === e || e.contains(t))) { const inner = t.closest('button,[role=button],a,[data-tip],[data-help],[data-leg],[data-kzoom],.kaart,.kodds,.kchip,[class*=odds],[class*=legend]'); if (inner && inner !== e && e.contains(inner)) continue; return { hit: true } } if (!cover) cover = t } return { hit: false, full: c.full, cover: cover && (cover.tagName.toLowerCase() + (cover.id ? '#' + cover.id : '') + (typeof cover.className === 'string' && cover.className ? '.' + cover.className.trim().split(/\s+/).slice(0, 2).join('.') : '')), foreign: cover && !cover.contains(e) && layerOf(cover) !== layerOf(e) && !cover.closest('#kpop,.kpop,#kxcatch,#ktut,#title,#kload,#dawn,.kne') } };
  const txt = e => (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim();
  const inLay = e => lay === document.body ? layerOf(e) === document.body : lay.contains(e);
  let btns = all.filter(inLay).map(e => ({ e, p: probe(e) }));
  if (!btns.some(x => x.p.hit)) { const hl = all.map(e => ({ e, p: probe(e) })).filter(x => x.p.hit); if (hl.length) { lay = layerOf(hl[hl.length - 1].e); btns = all.filter(inLay).map(e => ({ e, p: probe(e) })) } }
  /* a big screen panel that is not a dialog (Dư đồ map .mapsc, scenes in the page) sits IN the page: tabs / «Sang buổi» stay valid moves */
  if (lay !== document.body && !lay.matches(LAYER)) { btns = all.filter(e => { const l = layerOf(e); return l === lay || l === document.body }).map(e => ({ e, p: probe(e) })) }
  /* tutorial (Lời dặn #ktut): .ktut-blk blocks every card but the highlighted one BY DESIGN → the gate is the layer: its own buttons + the hole target */
  const tut = document.getElementById('ktut'); let gate = false;
  if (tut && !tut.hidden && tut.querySelector('.ktut-blk,.ktut-card') && getComputedStyle(tut).display !== 'none') { gate = true; lay = tut; btns = all.map(e => ({ e, p: probe(e) })).filter(x => x.p.hit) }
  window.__rtBtns = btns.map(x => x.e);
  let S0 = null; try { S0 = typeof S !== 'undefined' && S ? { dead: !!S.dead, y: S.year, t: S.turn, w: S.tuan, b: S.buoi || 0, age: S.age, rank: S.rank, name: S.name } : null } catch (e) {}
  return { layer: lay === document.body ? 'page' : (lay.id ? '#' + lay.id : '.' + String(lay.className).split(' ')[0]), title: ((lay.querySelector && lay.querySelector('h2,h3,.kh,.ttl')) || {}).textContent ? lay.querySelector('h2,h3,.kh,.ttl').textContent.trim().slice(0, 50) : '',
    b: btns.map((x, i) => ({ i, t: txt(x.e).slice(0, 90), id: x.e.id || '', c: String(x.e.className || '').slice(0, 40), d: Object.keys(x.e.dataset).join(','), inp: x.e.tagName === 'INPUT', hole: gate && !tut.contains(x.e), hit: x.p.hit, deadSuspect: !x.p.hit && x.p.full && x.p.foreign ? x.p.cover : null, x: /kit-x|kclose/.test(x.e.className) || /^(✕|×)$/.test(txt(x.e)) })),
    lr: (() => { const r = (lay === document.body ? document.documentElement : lay).getBoundingClientRect(); return { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(W, r.right) - Math.max(0, r.left), h: Math.min(H, r.bottom) - Math.max(0, r.top) } })(),
    code: !(S0 && S0.name && !S0.dead) ? ((document.body.innerText || '').match(/Ám hiệu\s*:?\s*([A-Z0-9]{4})(?![A-Za-z0-9])/) || [])[1] || null : null,
    scr: lay === document.body ? null : (() => { for (const el of [lay, ...lay.querySelectorAll('*')]) { if (el.scrollHeight > el.clientHeight + 8 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) { const r = el.getBoundingClientRect(); if (r.height < 40) continue; return { x: r.left + r.width / 2, y: r.top + r.height / 2, left: Math.round(el.scrollHeight - el.clientHeight - el.scrollTop) } } } return null })(),
    S: S0, end: !!window.__rtEnd };
};

async function play(p) {
  p.on('pageerror', e => bug('js', 'page error: ' + e.message.split('\n')[0].slice(0, 160)));
  p.on('crash', () => { R._crashed = true; R.harness.crashes = (R.harness.crashes || 0) + 1; const os = require('os'); bug('crash', 'tab crashed (Page crashed) at buổi ' + R.buoi, { freeMB: Math.round(os.freemem() / 1048576), totalMB: Math.round(os.totalmem() / 1048576), load: os.loadavg()[0] }) });
  const rt = RT.make(p, { dev: DEV, shots: SHOTS, ignoreCover: /kpop|kxcatch|ktut|#title|#kload|#dawn|kne/, touch: DEV !== 'ipad', log: d => { (R.trace = R.trace || []).push([sec(), d.k === 'tap' ? (d.screen || '') + ' «' + d.label + '»' : 'DEAD ' + d.label]); if (R.trace.length > 400) R.trace.shift(); if (process.env.RTV) console.log('TAP', d.screen, '«' + d.label + '»'); if (d.k === 'DEAD BUTTON') { R.dead.push({ ...d, at: sec(), S: lastS }); console.log('DEAD BUTTON', d.screen, '«' + d.label + '»', 'cover', d.cover) } } });
  let lastS = null;
  /* stuck evidence: every save / slot / co-op key of localStorage + the co-op state (CW / room) + S summary → <shots>/<tag>-dump.json + -save.json */
  const dumpStuck = async tag => { try { const d = await p.evaluate(() => { const ls = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/hclh|save|slot|ctm|coop|room/i.test(k)) ls[k] = localStorage.getItem(k) }
      const safe = o => { try { const seen = new WeakSet(); return JSON.parse(JSON.stringify(o, (k, v) => { if (typeof v === 'function') return undefined; if (v && typeof v === 'object') { if (seen.has(v)) return '[cycle]'; seen.add(v) } return v })) } catch (e) { return 'unserialisable: ' + e.message } };
      let S1 = null; try { S1 = { name: S.name, year: S.year, turn: S.turn, tuan: S.tuan, buoi: S.buoi, dead: S.dead, rank: S.rank, place: S.place } } catch (e) {}
      return { at: new Date().toISOString(), url: location.href, ls, S: S1, coop: { CW: safe(window.CW || null), room: safe(window.CTM_ROOMS && window.CTM_ROOMS.cur ? window.CTM_ROOMS.cur : null), seat: safe(window.COOP || window.CO || null) }, Q: (typeof Q !== 'undefined' && Q) ? Q.length : null } });
      const f = path.join(SHOTS, tag + '-dump.json'); fs.writeFileSync(f, JSON.stringify(d)); const sk = Object.keys(d.ls).find(k => /save/i.test(k)); if (sk) fs.writeFileSync(path.join(SHOTS, tag + '-save.json'), d.ls[sk]); (R.dumps = R.dumps || []).push(f); return f } catch (e) { return null } };
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
  if (ck && ck.ls) { await p.evaluate(ls => { for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v) }, ck.ls); await p.reload({ waitUntil: 'load' }); await boot(); /* setup only: the save goes back where the game keeps it; the life is then opened by taps (Chơi một mình → Tiếp tục) */ }

  await p.evaluate(() => { window.__rtEnd = null }).catch(() => {});
  const actsPerBuoi = { sens: 2, rand: 3, cautious: 1, bold: 3, quiet: 0 }[BOT] ?? 2;
  let infoTry = new Map(); let preT = Date.now(), idle = 0, noClose = new Set(), noFx = new Map(), deadSeen = new Set(), acts = 0, lastKey = '', lastProg = Date.now(), repeat = new Map(), sameScr = 0, lastSig = '', started = false, cpAt = 0, statusAt = Date.now();
  const NEXT_RE = /^sang (buổi|ngày mới)\b/i; const UTIL_RE = /lịch tháng|sổ ghi|nhật ký|sổ tay|tư trang|tổng lược|thiết lập|tuần lục|bảng vàng|sổ luân hồi|ghi chú/i; const dlgActs = new Map(); const isNext = x => x.id === 'next' || NEXT_RE.test(x.t); let tapsB = 0;
  const clockKey = s => s ? [s.y, s.t, s.w, s.b].join('.') : 'none';

  for (;;) {
    R.steps++;
    let sc; try { sc = await p.evaluate(SCAN) } catch (e) { await p.waitForTimeout(1000); continue }
    lastS = sc.S;
    if (sc.end || sc.S && sc.S.dead && started) { break }
    /* an open info layer (picture zoom #kpzoom, option note #kpinfo, hint #kpop, or the KẾT QUẢ toast #rtoast when it sits over a button) is closed like a person: tap on it (each closes on a tap) */
    { const inf = await p.evaluate(INFO).catch(() => null);
      if (inf) { const n = (infoTry.get(inf.sel) || 0) + 1; infoTry.set(inf.sel, n);
        if (n <= 3) { const x = inf.x, y = inf.y; if (DEV === 'ipad') await p.mouse.click(x, y); else await p.touchscreen.tap(x, y); R.harness.infoTaps = (R.harness.infoTaps || 0) + 1; if (process.env.RTV) console.log('TAP info', inf.sel); await p.waitForTimeout(400); continue }
        if (n === 4) { const shot = path.join(SHOTS, 'info-noeffect-' + Date.now() + '.png'); await p.screenshot({ path: shot }).catch(() => {}); bug('game', 'NO EFFECT: info layer ' + inf.sel + ' stays open after 3 real taps on it', { shot }) } }
      else infoTry.clear() }
    if (sc.S && sc.S.name && !sc.S.dead && !started) { started = true; if (C.onStart) C.onStart() }
    /* progress + checkpoints */
    const key = clockKey(sc.S);
    if (key !== lastKey) { if (lastKey && sc.S) { R.buoi++; acts = 0; tapsB = 0; repeat.clear(); dlgActs.clear() } lastKey = key; lastProg = Date.now();
      if (R.buoi - cpAt >= CP) { cpAt = R.buoi; const sz = await p.evaluate(() => { let m = 0, k0 = ''; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/save/.test(k)) { const n = (localStorage.getItem(k) || '').length; if (n > m) { m = n; k0 = k } } } return { k: k0, n: m } }).catch(() => null); if (sz) { R.saves.push({ buoi: R.buoi, year: sc.S && sc.S.y, chars: sz.n, key: sz.k }); console.log('CP buổi', R.buoi, 'year', sc.S && sc.S.y, 'save', sz.n, 'chars') } } }
    if (started && (Date.now() - (R._ckAt || 0) > 180e3 || R.buoi - (R._ckB || 0) >= 5)) { R._ckAt = Date.now(); R._ckB = R.buoi; const ls = await p.evaluate(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^hclh|save|slot/i.test(k)) o[k] = localStorage.getItem(k) } return o }).catch(() => null); if (ls) { try { fs.writeFileSync(CKPT + '.tmp', JSON.stringify({ at: new Date().toISOString(), rs, R, ls })); fs.renameSync(CKPT + '.tmp', CKPT) } catch (e) {} } save() }
    if (SLICE && R.buoi >= SLICE) { R.sliced = true; break }
    if (process.env.RT_TEST_CRASH && R.buoi >= +process.env.RT_TEST_CRASH && !(R.harness.resumed || []).length) { /* self-test of the crash path only */ await p.goto('chrome://crash').catch(() => {}) }
    if (Date.now() - statusAt > 3600e3) { statusAt = Date.now(); const l = 'STATUS ' + LIFE + ' · buổi ' + R.buoi + ' · year ' + (sc.S && sc.S.y) + ' · rank ' + (sc.S && sc.S.rank) + ' · bugs ' + R.bugs.length + ' · stuck ' + R.harness.stuck + ' · dead buttons ' + R.dead.length; R.status.push(l); console.log(l); save() }
    if (Date.now() - (R._snapAt || 0) > 60e3) { R._snapAt = Date.now(); await p.screenshot({ path: path.join(SHOTS, 'now.png') }).catch(() => {}); if (process.env.RTV) console.log('NOW', sc.layer, '«' + sc.title + '»', 'hit', sc.b.filter(x => x.hit).length, 'idle', idle, 'buổi', R.buoi, 'areaTaps', R.harness.areaTaps || 0) }
    /* not in the life yet (title / resume splash / loading) for 5 min = stuck too: bug, reload, go again (a resume re-opens its save) */
    if (!started && Date.now() - preT > 300e3) { preT = Date.now(); R.harness.stuck++; const shot = path.join(SHOTS, 'prestart-stuck-' + R.harness.stuck + '.png'); await p.screenshot({ path: shot }).catch(() => {}); const dmp = await dumpStuck('prestart-stuck-' + R.harness.stuck); bug('stuck', 'life not (re)opened within 5 min on ' + sc.layer + ' «' + sc.title + '»', { shot, dump: dmp, buttons: sc.b.map(x => x.t).slice(0, 8) }); await p.reload({ waitUntil: 'load' }).catch(() => {}); await boot().catch(() => {}); continue }
    /* stuck: no clock progress for STUCK_MS → bug + shot + save, unstick, SAME life continues */
    if (started && Date.now() - lastProg > STUCK_MS) { R.harness.stuck++; const shot = path.join(SHOTS, 'stuck-' + R.harness.stuck + '.png'); await p.screenshot({ path: shot }).catch(() => {});
      const svf = await dumpStuck('stuck-' + R.harness.stuck); const sv = !!svf; /* evidence FIRST, then the unstick ladder */
      bug('stuck', 'no progress ' + Math.round(STUCK_MS / 60e3) + ' min on ' + sc.layer + ' «' + sc.title + '»', { shot, save: sv ? svf : null, S: sc.S, buttons: sc.b.map(b => b.t).slice(0, 12) });
      await unstick(p, rt, sc, 3); lastProg = Date.now(); continue }
    /* a layer with nothing to tap (loading / scene / gate): wait like a person, then tap the middle of the screen */
    if (!sc.b.some(x => x.hit) && sc.b.length && idle === 40) { const h = await p.evaluateHandle(() => window.__rtBtns[0]); await rt.tap(h, { screen: sc.layer + (sc.title ? ' «' + sc.title + '»' : ''), label: sc.b[0].t.slice(0, 50) }) }
    if (!sc.b.some(x => x.hit)) { idle++; if (idle > 4) { /* scene gate / mini-game board without buttons: tap inside it like a person */ const r = sc.lr; for (let k = 0; k < 6; k++) { const x = r.x + r.w * (0.15 + 0.7 * rnd()), y = r.y + r.h * (0.2 + 0.65 * rnd()); /* never land on a button (an exit road could sit there): only bare board / scene area */ const bare = await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y); return !!t && !t.closest('button,[role=button],a,input,select,textarea,[data-tab],#rtoast,.kkem,.kalog') }, [x, y]).catch(() => false); if (!bare) continue; if (DEV === 'ipad') await p.mouse.click(x, y); else await p.touchscreen.tap(x, y); R.harness.areaTaps = (R.harness.areaTaps || 0) + 1; break } } await p.waitForTimeout(idle > 4 ? 250 : 500); continue }
    idle = 0;
    /* a button of the top layer, fully on screen, covered by ANOTHER layer → real tap on it → DEAD BUTTON if the cover stays */
    for (const d of started ? sc.b.filter(x => x.deadSuspect) : []) { const ds = sc.layer + '|' + sc.title + '|' + d.t; if (deadSeen.has(ds)) continue; deadSeen.add(ds); await p.waitForTimeout(3000); const s2 = await p.evaluate(SCAN).catch(() => null); const d2 = s2 && s2.b.find(x => x.t === d.t && x.deadSuspect); if (d2) { const h = await p.evaluateHandle(i => window.__rtBtns[i], d2.i); await rt.tap(h, { screen: s2.layer + (s2.title ? ' «' + s2.title + '»' : ''), label: d.t.slice(0, 50) }) } }
    /* same screen many steps → light unstick (tap ✕ / another button) — logged, not a stuck bug */
    const sig = sc.layer + '|' + sc.title + '|' + sc.b.map(b => b.t).join('/') + '|' + key;
    if (sig === lastSig) sameScr++; else { sameScr = 0; lastSig = sig }
    if (sameScr > 25) { await unstick(p, rt, sc, sameScr > 60 ? 2 : 1); sameScr = 0; continue }
    const ch = choose(sc, started);
    if (!ch) { await p.waitForTimeout(400); continue }
    if (ch.scroll) { await p.mouse.move(ch.scroll.x, ch.scroll.y); await p.mouse.wheel(0, Math.min(400, ch.scroll.left + 20)); await p.waitForTimeout(400); R.harness.scrolls = (R.harness.scrolls || 0) + 1; continue }
    if (ch.noclose) { const shot = path.join(SHOTS, 'noclose-' + Date.now() + '.png'); await p.screenshot({ path: shot }).catch(() => {}); bug('game', 'dialog scrolled to the end has no close / next button: ' + sc.layer + ' «' + sc.title + '»', { shot, buttons: sc.b.map(x => x.t).slice(0, 8) }); continue }
    if (ch.exit) { R.exitPick = { label: ch.t, n: ch.n, only: ch.only, at: sec(), S: sc.S }; console.log('EXIT ROAD', ch.only ? '(only option — real ending)' : '', '«' + ch.t + '»') }
    const h = await p.evaluateHandle(i => window.__rtBtns[i], ch.i);
    const ok = await rt.tap(h, { screen: sc.layer + (sc.title ? ' «' + sc.title + '»' : ''), label: ch.t.slice(0, 50), wait: started ? 1500 : 8000, confirm: async () => { const s3 = await p.evaluate(SCAN); return s3.layer === sc.layer && s3.title === sc.title } });
    const rk = sig + '#' + ch.t; repeat.set(rk, (repeat.get(rk) || 0) + (ok ? 1 : 5));
    /* a close (✕ / Lui) tapped for real 3× and the same dialog is still there = button with no effect → bug + shot */
    if (ok && (ch.x || CLOSE_RE.test(ch.t)) && sc.layer !== 'page') { /* NO EFFECT = 3 taps IN A ROW on the close and the same dialog still open after its close animation (counter resets as soon as it closes once — s8 false alarms counted closes over the whole life) */ const k = 'nx|' + sc.layer + '|' + sc.title; await p.waitForTimeout(1200); const s4 = await p.evaluate(SCAN).catch(() => null); if (!(s4 && s4.layer === sc.layer && s4.title === sc.title)) noFx.delete(k); else if (sc.title) { noFx.set(k, (noFx.get(k) || 0) + 1); if (noFx.get(k) === 3) { const shot = path.join(SHOTS, 'noeffect-' + Date.now() + '.png'); await p.screenshot({ path: shot }).catch(() => {}); R.dead.push({ k: 'NO EFFECT', screen: sc.layer + ' «' + sc.title + '»', label: ch.t, cover: 'tapped 3× for real, dialog stays', shot, at: sec(), S: sc.S }); bug('dead', 'close button has no effect: ' + sc.layer + ' «' + sc.title + '» «' + ch.t + '»', { shot }) } } }
    if (ok && ch.type) { await p.waitForTimeout(200); await p.keyboard.press('Control+A').catch(() => {}); await p.keyboard.type(String(ch.type), { delay: 80 }); R.harness.typed = (R.harness.typed || 0) + 1 }
    if (ok && (sc.layer === 'page' || sc.b.some(isNext)) && !ch.next) acts++; if (ok) tapsB++; if (ok && sc.layer !== 'page' && !(ch.x || CLOSE_RE.test(ch.t))) { const dk = sc.layer + '|' + sc.title; dlgActs.set(dk, (dlgActs.get(dk) || 0) + 1) }
    await p.waitForTimeout(ok ? 220 : 400);

    function choose(sc, started) {
      const hb = sc.b.filter(x => x.hit && !LEAVE_RE.test(x.t) && !(started && /^(cfz|coop)$/.test(x.d))); let b = started ? hb.filter(x => (repeat.get(sig + '#' + x.t) || 0) < 4) : hb; /* before the life opens: keep retrying the start / continue button */
      if (!b.length) b = hb;
      const isExit = x => EXIT_RE.test(x.t) && !(!started && /kiếp mới/i.test(x.t) && sc.layer !== 'page');
      /* back on the title after the life started (room dropped / reload): co-op seat rejoins its room or waits; solo continues its sổ */
      if (started && b.some(x => /^chơi một mình/i.test(x.t))) { const back = b.find(x => /trở lại phòng|vào lại phòng|về phòng/i.test(x.t)); if (back) return back; if (C.pre || C.coop) { R.titleBack = (R.titleBack || 0) + 1; return null } }
      if (!started && ck) { for (const re of [/tiếp tục kiếp này|tiếp tục kiếp|chơi tiếp/i, /^chơi một mình/i, /^tiếp tục/i, /^bỏ qua$/i, /^tiếp$/i]) { const f = b.find(x => re.test(x.t) && !/kiếp mới|bắt đầu/i.test(x.t)); if (f) return f } return null /* resume: only continue the saved life — never «Kiếp mới» / «Bắt đầu kiếp mới»; wait for the right button */ }
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
      /* this buổi is done (persona acts used, or 40+ taps without the clock moving — map rooms «Ở đây còn N người», E-S1 Dư đồ loop): take «Sang buổi / Sang ngày mới» wherever it shows */
      const nx = nonExit.find(isNext); if (nx && started && (acts >= actsPerBuoi || tapsB > 40)) return { ...nx, next: true };
      if (!isPage) {
        /* a person closes a utility / notebook dialog (Lịch tháng, Sổ ghi, Tư trang …) after a few acts; any dialog after 20 acts with the clock still (s2d «Lịch tháng» 15 min typing notes) */
        { const n = dlgActs.get(sc.layer + '|' + sc.title) || 0, cl = b.find(close); if (cl && (n >= 4 && UTIL_RE.test(sc.title) || n >= 20)) { R.harness.dlgClose = (R.harness.dlgClose || 0) + 1; return cl } }
        const main = nonExit.filter(x => !LOW_RE.test(x.t) && !/^kéo xuống/i.test(x.t));
        if (main.length) return score(main);
        /* a long dialog (Tin báo …): its ✕ / Đóng / «Đã xem hết» may sit below — scroll its own scroller like a person */
        if (!b.some(close) && sc.scr && sc.scr.left > 4) return { scroll: sc.scr };
        if (!b.some(close) && !nonExit.some(x => !/^kéo xuống/i.test(x.t)) && sc.scr && sc.scr.left <= 4 && !noClose.has(sc.layer + sc.title)) { noClose.add(sc.layer + sc.title); return { noclose: true } }
        const cl = b.find(close); if (cl) return cl; /* ✕ / Lui before help / empty-label icons (portrait re-opens the same dialog) */
        if (nonExit.length) return score(nonExit);
        if (exits.length) { const e = score(exits); return { ...e, exit: true, n: opts.length, only: true } }
        return null;
      }
      /* main screen: a few actions per buổi (persona), then «Sang buổi» */
      const next = b.find(isNext);
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
  R.harness.deadButtons = R.dead.length; R.harness.taps = (R.harness.taps0 || 0) + rt.stats().taps; R.t = { total: Date.now() - T0 };
  save();
  console.log('LIFE DONE ' + LIFE + ' ' + (R.life.id) + ' age ' + (R.life.age ?? '?') + ' · buổi ' + R.buoi + ' · taps ' + R.harness.taps + ' · dead buttons ' + R.dead.length + ' · stuck ' + R.harness.stuck + ' · bugs ' + R.bugs.length);
}

/* unstick ladder (TAPS ONLY — no keyboard, owner real-tap rule 25/11 ~05:10Z; Escape soft-locked co-op on the title, B U3 9YAK): 1 tap the top layer ✕ / close · 2 no close → tap another safe button of the top layer (never exit / leave / nav), else tap bare space outside the top layer · 3 reload + continue the same save from the title */
async function unstick(p, rt, sc, lvl) {
  R.harness.unstick.push({ at: sec(), lvl, layer: sc.layer, title: sc.title });
  { const s1 = await p.evaluate(SCAN).catch(() => null) || sc; let i = s1.b.findIndex(b => b.hit && (b.x || CLOSE_RE.test(b.t)));
    if (i < 0 && lvl >= 2) { const ok = s1.b.map((b, k) => k).filter(k => { const b = s1.b[k]; return b.hit && !EXIT_RE.test(b.t) && !LEAVE_RE.test(b.t) && !NAV_RE.test(b.t) }); if (ok.length) i = ok[Math.floor(rnd() * ok.length)] }
    if (i >= 0) { const h = await p.evaluateHandle(i => window.__rtBtns[i], i); await rt.tap(h, { screen: s1.layer, label: 'unstick ' + (s1.b[i].t || '✕').slice(0, 30) }) }
    else if (lvl >= 2 && s1.layer !== 'page' && s1.lr) { /* tap-out: bare space outside the top layer, like a person tapping beside a popup */ const vw = p.viewportSize(); const r = s1.lr; const pts = [[8, 8], [vw.width - 8, 8], [8, vw.height / 2], [vw.width - 8, vw.height / 2]].filter(([x, y]) => x < r.x || x > r.x + r.w || y < r.y || y > r.y + r.h);
      for (const [x, y] of pts) { const bare = await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y); return !!t && !t.closest('button,[role=button],a,input,select,textarea,[data-tab],#rtoast,.kkem,.kalog') }, [x, y]).catch(() => false); if (!bare) continue; if (DEV === 'ipad') await p.mouse.click(x, y); else await p.touchscreen.tap(x, y); R.harness.areaTaps = (R.harness.areaTaps || 0) + 1; break } }
    await p.waitForTimeout(500) }
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

return { R, play, save, SCAN, get life() { return LIFE } };
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
const seat = Seat({ url: URL0, out: OUT0, dev: DEV, bot: A.bot, seed: A.seed, life: A.life, origin: A.origin, road: A.road, stuckMin: A.stuckMin, slice: A.slice, cp: A.cp, resume: A.resume === "1" });
(async () => {
  /* one browser profile per life (<out>/profile-<life>): pictures / music are fetched once and stay cached across restarts and resume
     (a fresh profile re-downloads everything behind «Lần đầu nhập cung», which the CDN throttles (429) when many robots start together) */
  const ctx = await chromium.launchPersistentContext(path.join(path.resolve(OUT0), 'profile-' + LIFE), { viewport: VP, deviceScaleFactor: 1, hasTouch: DEV !== 'ipad', isMobile: DEV !== 'ipad', serviceWorkers: 'block' });
  const br = { close: () => ctx.close() };
  const p = ctx.pages()[0] || await ctx.newPage();
  try { await seat.play(p) } catch (e) { if (seat.R._crashed) { /* a crashed tab cannot be reused (Playwright: every call → «Page crashed»): like a person, reopen the game — keep the life OPEN, put the crash into the checkpoint, exit 3 → the runner loop (until … resume=1) reopens the SAME life from its last ckpt */
      const CK = path.join(OUT, LIFE + '.ckpt.json'); try { const ck = JSON.parse(fs.readFileSync(CK, 'utf8')); ck.R = ck.R || {}; ck.R.harness = ck.R.harness || {}; ck.R.harness.crashes = seat.R.harness.crashes; ck.R.bugs = (ck.R.bugs || []).concat(seat.R.bugs.filter(b => b.type === 'crash').slice(-1)); fs.writeFileSync(CK + '.tmp', JSON.stringify(ck)); fs.renameSync(CK + '.tmp', CK) } catch (x) { console.error('crash: no checkpoint yet — the life restarts fresh') }
      delete seat.R._crashed; seat.save(); console.error('PAGE CRASHED ' + LIFE + ' at buổi ' + seat.R.buoi + ' → exit 3, rerun with resume=1'); process.exitCode = 3 } else {
    seat.R.bugs.push({ type: 'harness', msg: 'runner error: ' + String(e.message).split('\n')[0], n: 1 }); seat.R.life = seat.R.life || { id: 'HARNESS', type: 'harness' }; seat.save(); console.error(e); process.exitCode = 1 } }
  await br.close().catch(() => {});
})();
}
