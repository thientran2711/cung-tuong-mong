#!/usr/bin/env node
/* dev/measure/renderer-mem-render.js — F10: does an idle screen that is re-painted keep memory? Plays --buoi n with the in-page bot, then
   calls the game's render() (or --fn <expr>) --n times every --ms ms (what a timer tick on an idle screen does) and prints renderer RSS
   (/proc) + DOM counters every --every calls, then once after a forced GC. usage: --url <site> [--buoi 10] [--n 600] [--ms 100] [--fn "render()"] */
'use strict';
const { chromium } = require('playwright'); const D = require('../test/lib/device'), PP = require('../test/lib/playperf'); const { procs } = require('./renderer-mem-lib');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] }; const sleep = t => new Promise(r => setTimeout(r, t));
(async () => { const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, opt('dev', 'fold'), { deviceScaleFactor: 2, serviceWorkers: 'block' }); await ctx.addInitScript(PP.INIT);
  await ctx.addInitScript(s => { let x = s; Math.random = () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646 } }, +opt('seed', 6) * 7919 + 13);
  const p = await ctx.newPage(); const f = await D.openHost(p, opt('url'), { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  let bn = 0; while (bn < +opt('buoi', 10)) { const b0 = await f.evaluate(() => window.__buoiN || 0); let g = 0; while ((await f.evaluate(() => window.__buoiN || 0)) === b0 && g++ < 80) { await f.evaluate(PP.STEP).catch(() => { }); await sleep(150) } bn++; await f.evaluate(PP.CLEAR).catch(() => { }) }
  await sleep(3000); const cdp = await ctx.newCDPSession(p); const line = async k => { const r = procs(); const dc = await cdp.send('Memory.getDOMCounters'); console.log(`${k} rss ${r.rendererMax} anon ${Math.round(r.rAnon)} nodes ${dc.nodes} docs ${dc.documents} lst ${dc.jsEventListeners}`) };
  await line('start b' + bn); const N = +opt('n', 600), MS = +opt('ms', 100), EV = +opt('every', 100), FN = opt('fn', 'render()');
  for (let i = 1; i <= N; i++) { await f.evaluate(FN).catch(e => console.log('err', String(e).slice(0, 100))); await sleep(MS); if (i % EV === 0) await line('call ' + i) }
  await cdp.send('HeapProfiler.enable'); for (let i = 0; i < 3; i++) await cdp.send('HeapProfiler.collectGarbage'); await sleep(2000); await line('after GC'); await b.close() })().catch(e => { console.error(e); process.exit(2) });
