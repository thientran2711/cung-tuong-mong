#!/usr/bin/env node
/* rt-membase.js — NO-HARNESS memory baseline (HARNESS FIXER #9, FOREMAN E 23:25Z «E-S2 renderer 6882 MB at buổi 75»).
   Plays N buổi of a fresh life with the smallest possible driver: one tiny page.evaluate per step that returns ONE point to tap
   (top dialog: an option that is not an exit road, else its close; page: «Sang buổi / Sang ngày mới»; mini-game intro: its quick option),
   then a real tap there (touchscreen on Fold, mouse on iPad). No SCAN, no element handles, no screenshots, no moment log, no console/CDP
   listeners, no checkpoints. Same Chromium launch as robot-rt.js (persistent profile, serviceWorkers block, same viewport).
   Every 5 buổi: renderer RSS (ps, biggest child), whole tree RSS, JS heap (performance.memory), DOM nodes, localStorage KB.
   usage: node dev/test/rt-membase.js <url> <out-dir> [dev=fold|ipad] [buoi=60] [seed=1] [snap=1 (heap snapshot at the end)]
   Test tool only (it is not a life robot: it may pick exits, it never counts as a life). */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const [URL0, OUT0, ...KV] = process.argv.slice(2); const A = Object.fromEntries(KV.map(s => s.split('=')));
if (!URL0 || !OUT0) { console.error('usage: node dev/test/rt-membase.js <url> <out-dir> [dev=fold|ipad] [buoi=60] [seed=1]'); process.exit(2) }
const DEV = A.dev || 'fold', VP = DEV === 'ipad' ? { width: 1180, height: 820 } : { width: 755, height: 1000 }, N = +A.buoi || 60;
let rs = (+A.seed || 1) >>> 0 || 1; const rnd = () => { rs ^= rs << 13; rs >>>= 0; rs ^= rs >>> 17; rs ^= rs << 5; rs >>>= 0; return rs / 4294967296 };
const { EXIT_RE } = require('./robot-rt.js');
function rssTree() { try { const rows = execSync('ps -eo pid=,ppid=,rss=', { encoding: 'utf8', timeout: 5000 }).trim().split('\n').map(l => l.trim().split(/\s+/).map(Number)); const kids = new Map(); for (const [pid, pp] of rows) { if (!kids.has(pp)) kids.set(pp, []); kids.get(pp).push(pid) } const rss = new Map(rows.map(r => [r[0], r[2]])); const all = []; const st = [process.pid]; while (st.length) { const x = st.pop(); all.push(x); for (const k of kids.get(x) || []) st.push(k) } const mb = all.map(x => (rss.get(x) || 0) / 1024); return { totalMB: Math.round(mb.reduce((a, b) => a + b, 0)), rendererMB: Math.round(Math.max(0, ...mb.slice(1))) } } catch (e) { return null } }
/* page side: ONE point to tap, or null (no handle, nothing kept) */
const POINT = ([exitSrc, r, ban]) => { const BAN = new Set(ban || []); const EXIT = new RegExp(exitSrc, 'i'); const W = innerWidth, H = innerHeight;
  const hit = e => { const q = e.getBoundingClientRect(); if (q.width < 4 || q.height < 4) return null; const x = Math.min(W - 2, Math.max(2, q.left + q.width / 2)), y = Math.min(H - 2, Math.max(2, q.top + q.height / 2)); const t = document.elementFromPoint(x, y); return t && (t === e || e.contains(t)) && !e.disabled ? { x, y, t: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40) } : null };
  const btns = root => [...root.querySelectorAll('button,[role=button],.kcard[data-i]')].map(hit).filter(Boolean);
  const SEL = '#kg82,.dlg,[role=dialog],#modal,.kfoc,#title,#kload,#kroul,.kmov,#dawn,.kbk,.kpdlg'; let top = null; /* the layer a person sees: what is under the screen middle (a few points) */
  for (const [fx, fy] of [[.5, .5], [.5, .35], [.5, .65], [.3, .5], [.7, .5]]) { const t = document.elementFromPoint(W * fx, H * fy); const l = t && t.closest && t.closest(SEL); if (l) { top = l; break } }
  if (top) { const L1 = btns(top), L0 = L1.filter(b => !BAN.has(b.t)).length ? L1.filter(b => !BAN.has(b.t)) : L1, L = L0.filter(b => b.t).length ? L0.filter(b => b.t) : L0; /* labelled buttons first (an animated empty icon is not a way on) */ if (!L.length) { const q = top.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height * 0.4, t: 'AREA' } }
    const quick = L.find(b => /^(bỏ qua|để tài nghệ)/i.test(b.t)); if (top.id === 'kg82' && quick) return quick;
    const pref = L.find(b => /^(chơi một mình|tiếp tục|bắt đầu kiếp mới|nhận thân phận|vào cung|chơi tiếp|nhận|đã rõ|đã hiểu)/i.test(b.t)); if (pref) return pref;
    const opt = L.filter(b => !EXIT.test(b.t) && !/^(✕|×|lui|đóng|quay lại|bỏ cuộc|thiết lập|☰)$/i.test(b.t) && !/ô lưu|hảo hữu|chọn sổ|xóa|âm thanh/i.test(b.t)); if (opt.length) return opt[Math.floor(r * opt.length)];
    return L.find(b => /^(✕|×|lui|đóng)$/i.test(b.t)) || L[0] }
  const nx = document.getElementById('next'); if (nx && !nx.disabled) { const h = hit(nx); if (h) return h }
  return null };
(async () => {
  const OUT = path.resolve(OUT0); fs.mkdirSync(OUT, { recursive: true });
  require('./lib/rt-profile.js').freshProfile(path.join(OUT, 'profile-membase')); /* FIXER #24 vii: a baseline starts with no old save (HTTP cache kept) */
  const ctx = await chromium.launchPersistentContext(path.join(OUT, 'profile-membase'), { viewport: VP, deviceScaleFactor: 1, hasTouch: DEV !== 'ipad', isMobile: DEV !== 'ipad', serviceWorkers: 'block' });
  const p = ctx.pages()[0] || await ctx.newPage(); await p.goto(URL0, { waitUntil: 'domcontentloaded' });
  const rows = [], used = new Map(); let last = null, b = 0, steps = 0; const T0 = Date.now();
  while (b < N && Date.now() - T0 < 90 * 60e3) { steps++;
    const st = await p.evaluate(() => { try { return S ? { k: [S.year, S.turn, S.tuan, S.buoi || 0].join('.'), dead: !!S.dead } : null } catch (e) { return null } }).catch(() => null);
    if (st && st.dead) break;
    if (st && st.k !== last) { used.clear(); if (last) { b++; if (b % 5 === 0 || b === 1) { const m = rssTree(); const pm = await p.evaluate(() => ({ heapMB: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null, dom: document.getElementsByTagName('*').length, lsK: Math.round(JSON.stringify(localStorage).length / 1024) })).catch(() => ({})); rows.push({ buoi: b, sec: Math.round((Date.now() - T0) / 1e3), ...m, ...pm }); console.log('MEM', JSON.stringify(rows[rows.length - 1])) } } last = st.k }
    const pt = await p.evaluate(POINT, [EXIT_RE.source, rnd(), [...used].filter(([k, n]) => n >= 6).map(([k]) => k)]).catch(() => null); if (pt) used.set(pt.t, (used.get(pt.t) || 0) + 1); /* a label tapped 6× in this buổi is put aside (paging ‹ ›, re-opened panels) */
    if (process.env.MBV && steps % 10 === 0) console.log('STEP', steps, b, JSON.stringify(pt));
    if (pt) { if (DEV === 'ipad') await p.mouse.click(pt.x, pt.y); else await p.touchscreen.tap(pt.x, pt.y) }
    await p.waitForTimeout(pt ? 220 : 500) }
  let snap = null;
  if (A.snap === '1') { const cdp = await ctx.newCDPSession(p); const chunks = []; cdp.on('HeapProfiler.addHeapSnapshotChunk', e => chunks.push(e.chunk)); await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false }); snap = path.join(OUT, 'membase.heapsnapshot'); fs.writeFileSync(snap, chunks.join('')) }
  fs.writeFileSync(path.join(OUT, 'membase.json'), JSON.stringify({ dev: DEV, url: URL0, buoi: b, steps, rows, snap }, null, 1));
  console.log('MEMBASE DONE buổi ' + b + ' steps ' + steps); await ctx.close() })().catch(e => { console.error(e); process.exit(1) });
