#!/usr/bin/env node
/* robot-rt-coop.js — ONE CO-OP ROOM played with REAL TAPS on both seats (owner rules 25/11: real taps · a life ends only at
   death / a real ending, NO cap · NO bot-chosen exit road on ANY seat unless it is the only option the game leaves).
   usage: node dev/test/robot-rt-coop.js <url> <out-dir> [key=value ...]
     host=fold guest=ipad (devices: fold 755x1000 touch · ipad 1180x820 pointer)   kiep=1 (lives each seat must finish)
     hostOrigin= hostRoad= guestOrigin= guestRoad= (pre-life dev hooks, no taps)   bot=sens|rand|cautious|bold   seed=<n>   tag=<name>
     stuckMin=15   slice=<buổi> (self-test only)
   Room setup is tapped like two people: host «Cùng hảo hữu» → «Mời hảo hữu» (reads the ám hiệu off the screen); guest
   «Cùng hảo hữu» → «Nhập ám hiệu» → taps the box, TYPES the code on the keyboard → «Vào phòng». Then both seats play with the
   shared real-tap seat player (dev/test/robot-rt.js Seat). A seat whose life ended while the other still plays goes on with the
   next kiếp in the same room (recorded extra:true) so the room never waits on a dead seat.
   Output: <out>/coop-rt-<tag>.json {run, pairs:[{job, lives:[{seat,dev,kiep,extra,life,harness,exitPick,bugs,dead}], partial}]} + .md */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { Seat } = require('./robot-rt.js');
const [, , URL0, OUT0, ...KV] = process.argv;
if (!URL0 || !OUT0) { console.error('usage: node dev/test/robot-rt-coop.js <url> <out-dir> [host=fold] [guest=ipad] [kiep=1] [tag=..] ...'); process.exit(2) }
const A = Object.fromEntries(KV.map(s => s.split('=')));
/* STATIC SELF-TEST first (robot-lint.js: node --check + undeclared names outside page code); a FAIL never starts a life (lint=0 skips) */
if (A.lint !== '0') { const LR = require('./robot-lint.js').run(require('./robot-lint.js').DEFAULT); if (LR.warn) console.log('HARNESS LINT WARN: ' + LR.warn); if (!LR.ok) { console.error('HARNESS LINT FAIL — no life started:\n' + LR.rep.join('\n')); process.exit(2) } }
const TAG = A.tag || 'p' + (A.seed || 1) + '-' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
const KIEP = +A.kiep || 1, OUT = path.resolve(OUT0); fs.mkdirSync(OUT, { recursive: true });
const VPS = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const run = { tag: TAG, url: URL0, harness: 'realtap', args: A, at: new Date().toISOString() };
const pair = { job: { id: 'coop-rt-' + TAG, kiep: KIEP, seed: +A.seed || 1 }, lives: [], partial: true, bugs: [] };
const RESUME = A.resume === '1'; let code = A.room || null; /* resume=1 room=<CODE>: same pair, same profiles/ckpts, each seat «Cùng hảo hữu → Trở lại phòng» (A-COOP #2 coop1i patch) */
const flush = () => { fs.writeFileSync(path.join(OUT, 'coop-rt-' + TAG + '.json'), JSON.stringify({ run, pairs: [pair] }, null, 1));
  fs.writeFileSync(path.join(OUT, 'coop-rt-' + TAG + '.md'), ['# co-op real-tap room ' + TAG + ' (code ' + code + ')', '', '| seat | dev | kiếp | extra | ending | age | buổi | dead buttons | stuck | bugs | exit pick |', '|---|---|---|---|---|---|---|---|---|---|---|']
    .concat(pair.lives.map(l => '| ' + l.seat + ' | ' + l.dev + ' | ' + l.kiep + ' | ' + (l.extra ? 'yes' : '') + ' | ' + (l.life ? l.life.id + (l.life.fate ? ' — ' + l.life.fate : '') : '') + ' | ' + ((l.life && l.life.age) || '') + ' | ' + l.buoi + ' | ' + l.dead.length + ' | ' + l.harness.stuck + ' | ' + l.bugs.length + ' | ' + (l.exitPick ? l.exitPick.label + (l.exitPick.only ? ' (only option)' : '') : '—') + ' |')).join('\n')) };

/* resume=1: both seats reopen the SAME room like a person: title → «Cùng hảo hữu» → «Trở lại phòng»; never «Chơi một mình» / Chọn sổ / Mời hảo hữu */
const resumePre = (sc, b) => { if (process.env.RTV) console.log('RESUMEPRE', sc.layer, '«' + sc.title + '»', b.map(x => x.t.slice(0, 22)).join(' | ').slice(0, 200)); const f = re => b.find(x => re.test(x.t)); const back = f(/^(trở lại phòng|vào lại phòng)/i); if (back) return back; if (/mời hảo hữu|đợi hảo hữu/i.test(sc.title || '')) return 'wait'; const c = f(/^cùng hảo hữu/i); if (c) return c; if (f(/chơi một mình|bắt đầu kiếp mới|chọn sổ/i)) return 'wait'; return null };
/* pre-start choices (title → room) per seat; return a button, 'wait', or null (= the seat player's own start prefs) */
function hostPre(st) { return (sc, b) => {
  if (!code) { const m = sc.b.map(x => x.t).join(' | ').match(/Chép mã\s*([A-Z0-9]{4})(?![A-Za-z0-9])/); const c = sc.code || (m && m[1]); if (c) { code = c; console.log('ROOM CODE', code) } }
  const f = re => b.find(x => re.test(x.t));
  if (!st.made) { const m = f(/^mời hảo hữu/i); if (m) { st.made = true; return m } const c = f(/^cùng hảo hữu/i); if (c) return c; const t = b.find(x => /^hảo hữu|cùng hảo hữu/i.test(x.t)); return t || 'wait' }
  /* room made: only the thân phận flow may be tapped (never «Chơi một mình», never a second room) */
  const ok = b.find(x => /^tiếp$|^bỏ qua$|nhận thân phận|vào cung ngay|^vào cung/i.test(x.t));
  if (ok) return null;
  if (process.env.RTV && sc.title !== st.lastT) { st.lastT = sc.title; console.log('HOST WAIT', sc.layer, '«' + sc.title + '»', b.map(x => x.t.slice(0, 30)).join(' | ')) }
  return 'wait' } }
function guestPre(st) { return (sc, b) => {
  const f = re => b.find(x => re.test(x.t));
  if (!code) return 'wait';
  if (!st.joined) {
    const inp = b.find(x => x.inp); if (inp && !st.typed) { st.typed = true; return { ...inp, type: code } }
    const go = f(/^vào phòng/i); if (go && st.typed) { st.joined = true; return go }
    const j = f(/^nhập ám hiệu/i); if (j) return j; const c = f(/^cùng hảo hữu/i); if (c) return c; return 'wait' }
  const ok = b.find(x => /^tiếp$|^bỏ qua$|nhận thân phận|vào cung ngay|^vào cung/i.test(x.t));
  if (ok) return null;
  if (process.env.RTV && sc.title !== st.lastT) { st.lastT = sc.title; console.log('GUEST WAIT', sc.layer, '«' + sc.title + '»', b.map(x => x.t.slice(0, 30)).join(' | ')) }
  return 'wait' } }

/* both seats rejoin together: a seat that reloads (unstick lvl 3) sets the friend's want → the friend reloads + «Trở lại phòng» too */
const LINK = { host: { want: 0 }, guest: { want: 0 } };
async function seatLoop(ctx, who, dev, other) {
  const p = await ctx.newPage(); const st = {}; let k = 0;
  for (;;) {
    k++; const extra = k > KIEP;
    const s = Seat({ pin: A.pin, url: URL0, out: OUT, dev, bot: A.bot, seed: (+A.seed || 1) * 10 + (who === 'host' ? 1 : 2) + k * 100, life: 'coop-rt-' + TAG + '-' + who + '-k' + k,
      origin: A[who + 'Origin'], road: A[who + 'Road'], stuckMin: A.stuckMin, slice: A.slice, resume: RESUME && k === 1, noBoot: k > 1, coop: true, roomCode: () => code, coopLink: { me: LINK[who], other: LINK[who === 'host' ? 'guest' : 'host'] }, pre: (k === 1 && !RESUME) ? (who === 'host' ? hostPre(st) : guestPre(st)) : (k === 1 && RESUME ? resumePre : null) });
    try { await s.play(p) } catch (e) { s.R.bugs.push({ type: 'harness', msg: 'runner error: ' + String(e.message).split('\n')[0], n: 1 }); s.R.life = s.R.life || { id: 'HARNESS', type: 'harness' }; s.save() }
    pair.lives.push({ seat: who, dev, kiep: k, extra, room: code, life: s.R.life, harness: s.R.harness, exitPick: s.R.exitPick, bugs: s.R.bugs, dead: s.R.dead, buoi: s.R.buoi, saves: s.R.saves });
    flush(); console.log('SEAT LIFE DONE', who, 'k' + k, s.R.life && s.R.life.id);
    if (s.R.life && /HARNESS|SLICE/.test(s.R.life.id)) break;
    if (k >= KIEP && other.done) break;
    if (k >= KIEP && !extra && other.done) break;
    if (k >= KIEP + 20) break; /* safety net: 20 extra lives while the friend is still in the same life = runaway */
  }
  return p;
}

(async () => {
  /* one cached browser profile per seat (pictures fetched once; see robot-rt.js) */
  const ctxs = [];
  const mk = async dev => { if (!RESUME) { const fp = require('./lib/rt-profile.js').freshProfile(path.join(OUT, 'profile-coop-' + TAG + '-' + dev)); if (fp.existed) console.log('FRESH START: profile-coop-' + TAG + '-' + dev + ' storage wiped (' + fp.mode + ', ' + fp.wiped + ' removed)') } /* FIXER #24 vii */ const c = await chromium.launchPersistentContext(path.join(OUT, 'profile-coop-' + TAG + '-' + dev), { viewport: VPS[dev], deviceScaleFactor: 1, hasTouch: dev !== 'ipad', isMobile: dev !== 'ipad', serviceWorkers: 'block', ...(process.env.COOP_URL ? { args: ['--disable-web-security', '--disable-features=PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults'] } : {}) }); if (process.env.COOP_URL) await c.addInitScript(u => { window.COOP_URL = u }, process.env.COOP_URL); /* optional own co-op Worker (B U3b patch) */ ctxs.push(c); return c };
  const br = { close: () => Promise.all(ctxs.map(c => c.close())) };
  const H = { done: false }, G = { done: false };
  const hDev = A.host || 'fold', gDev = A.guest || 'ipad';
  const [hc, gc] = await Promise.all([mk(hDev), mk(gDev)]);
  await Promise.all([
    seatLoop(hc, 'host', hDev, G).then(() => { H.done = true }),
    seatLoop(gc, 'guest', gDev, H).then(() => { G.done = true })]);
  pair.partial = false; flush(); await br.close();
  console.log('ROOM DONE ' + TAG + ' · ' + pair.lives.map(l => l.seat + ' k' + l.kiep + (l.extra ? '+' : '') + ' ' + (l.life && l.life.id)).join(' · '));
})().catch(e => { pair.bugs.push({ type: 'harness', msg: String(e.message).split('\n')[0] }); flush(); console.error(e); process.exit(1) });
