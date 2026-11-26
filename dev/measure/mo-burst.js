#!/usr/bin/env node
/* dev/measure/mo-burst.js — F10 family scan: every MutationObserver of the game, how many times its callback runs inside ONE task
   (a callback that mutates what it, or another observer, watches makes a microtask chain: N per task → ∞ = the page hangs, R1 b365).
   Wraps window.MutationObserver (init script, every frame): id = where it was created (script line:col), per-task count reset by a
   setTimeout(0) queued at the first callback of a task. Plays --buoi n with the in-page bot (+ the kscue-loop cases at the end) and prints,
   per observer: total callbacks, max callbacks in one task, tasks with ≥ --th callbacks. usage: --url <site> [--buoi 40] [--seed 6] [--th 8] */
'use strict';
const { chromium } = require('playwright'); const D = require('../test/lib/device'), PP = require('../test/lib/playperf');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] }; const sleep = t => new Promise(r => setTimeout(r, t));
const INIT = () => { if (window.__moB) return; const O = window.MutationObserver; const B = window.__moB = {};
  window.MutationObserver = function (cb) { let id = '?'; try { const st = String(new Error().stack).split('\n').slice(2).map(x => x.trim()); const f = st.find(x => !/mo-burst|__puppeteer|playwright/.test(x)) || st[0] || '?'; id = f.replace(/^at /, '').replace(/https?:\/\/[^)]*?:(\d+):(\d+)/, '@$1:$2').slice(0, 90) } catch (e) { }
    const o = B[id] = B[id] || { n: 0, max: 0, burst: 0, cur: 0 }; let armed = false;
    return new O(function (ms, obs) { o.n++; o.cur++; if (o.cur > o.max) o.max = o.cur; if (o.cur === +(window.__moTh || 8)) o.burst++; if (!armed) { armed = true; setTimeout(() => { armed = false; o.cur = 0 }, 0) }
      if (o.cur > 5000) { o.killed = (o.killed || 0) + 1; return } /* scan only: stop a runaway so the scan itself finishes */ return cb.call(this, ms, obs) }) };
  window.MutationObserver.prototype = O.prototype };
(async () => { const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, opt('dev', 'fold'), { deviceScaleFactor: 2, serviceWorkers: 'block' });
  await ctx.addInitScript(INIT); await ctx.addInitScript(PP.INIT); await ctx.addInitScript(([s, th]) => { window.__moTh = th; let x = s; Math.random = () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646 } }, [+opt('seed', 6) * 7919 + 13, +opt('th', 8)]);
  const p = await ctx.newPage(); const f = await D.openHost(p, opt('url'), { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  let bn = 0; while (bn < +opt('buoi', 40)) { const b0 = await f.evaluate(() => window.__buoiN || 0); let g = 0; while ((await f.evaluate(() => window.__buoiN || 0)) === b0 && g++ < 80) { await f.evaluate(PP.STEP).catch(() => { }); await sleep(150) } bn++; await f.evaluate(PP.CLEAR).catch(() => { }) }
  const R = await f.evaluate(() => window.__moB); const L = Object.entries(R).sort((a, b) => b[1].max - a[1].max);
  console.log(`observers ${L.length} · buổi ${bn}\n max/task  bursts  total  killed  created at`); for (const [k, o] of L) if (o.n) console.log(`  ${String(o.max).padStart(6)}  ${String(o.burst).padStart(6)}  ${String(o.n).padStart(6)}  ${String(o.killed || 0).padStart(5)}  ${k}`);
  await b.close() })().catch(e => { console.error(e); process.exit(2) });
