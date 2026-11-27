#!/usr/bin/env node
/* dev/measure/renderer-mem-bookhang.js — F10 repro: the robots' freezes (A4 nc_vuong speed-1/2, renderer 5.7 GB) came right after fast
   «Trang sau / Trang trước» taps in the Tuần lục book then «Lui». Plays the in-page bot; every time a book is open, real-taps (touch) a fast
   random sequence of next/prev (gap --gap ms ± jitter) then «Lui», then checks the page still answers within 8 s; a hung page is paused 5×
   through CDP and the JS stacks printed. usage: --url <site> [--weeks 20] [--seed 6] [--gap 120] [--dev fold] */
'use strict';
const { chromium } = require('playwright'); const D = require('../test/lib/device'), PP = require('../test/lib/playperf'); const { procs } = require('./renderer-mem-lib');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] }; const sleep = t => new Promise(r => setTimeout(r, t));
const SEED = +opt('seed', 6), GAP = +opt('gap', 120), WEEKS = +opt('weeks', 20); let rs = SEED; const rnd = () => { rs = (rs * 16807) % 2147483647; return rs / 2147483647 };
(async () => { const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, opt('dev', 'fold'), { deviceScaleFactor: 2, serviceWorkers: 'block' }); await ctx.addInitScript(PP.INIT);
  await ctx.addInitScript(s => { let x = s; Math.random = () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646 } }, SEED * 7919 + 13);
  const p = await ctx.newPage(); const f = await D.openHost(p, opt('url'), { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Debugger.enable');
  const alive = async ms => Promise.race([f.evaluate(() => 1).then(() => true, () => true), sleep(ms).then(() => false)]);
  const stacks = async () => { const out = []; for (let k = 0; k < 5; k++) { const pr = new Promise(r => cdp.once('Debugger.paused', r)); await cdp.send('Debugger.pause').catch(() => { }); const ev = await Promise.race([pr, sleep(8000).then(() => null)]); if (ev) out.push(ev.callFrames.slice(0, 16).map(c => (c.functionName || '(anon)') + '@' + c.location.lineNumber + ':' + c.location.columnNumber).join(' < ')); await cdp.send('Debugger.resume').catch(() => { }); await sleep(1000) } return out };
  /* button centre in PAGE coordinates (the game frame sits inside the host page) */
  const fe = await f.frameElement(); const at = async sel => { const r = await f.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => x.offsetParent !== null); if (!e) return null; const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2, dis: e.disabled } }, sel).catch(() => null); if (!r) return null; const fb = await fe.boundingBox(); const sc = await f.evaluate(() => (document.documentElement.getBoundingClientRect().width / innerWidth) || 1).catch(() => 1); return { x: fb.x + r.x * (fb.width / (await f.evaluate(() => innerWidth))), y: fb.y + r.y * (fb.height / (await f.evaluate(() => innerHeight))), dis: r.dis } };
  let weeks = 0, g = 0;
  while (weeks < WEEKS && g++ < 20000) { const open = await f.evaluate(() => { const r = document.querySelector('.kbk'); return !!(r && r.offsetParent !== null && window.__kbk) }).catch(() => false);
    if (!open) { await f.evaluate(PP.STEP).catch(() => { }); await sleep(120); continue }
    weeks++; await sleep(600 + rnd() * 900); const seq = []; const n = 2 + Math.floor(rnd() * 8);
    for (let k = 0; k < n; k++) { const sel = rnd() < .65 ? '.kbk-next' : '.kbk-prev'; const c = await at(sel); if (c && !c.dis) { await p.touchscreen.tap(c.x, c.y); seq.push(sel === '.kbk-next' ? 'N' : 'P') } await sleep(Math.max(10, GAP * (.3 + rnd() * 1.4))) }
    const x = await at('.kbk-x'); if (x) { await p.touchscreen.tap(x.x, x.y); seq.push('X') }
    const ok = await alive(8000); const r = procs(); console.log(`week ${weeks} seq ${seq.join('')} alive ${ok} rss ${r.rendererMax}`);
    if (!ok) { console.log('HUNG — stacks:'); (await stacks()).forEach(s => console.log('  ' + s)); for (let t = 0; t < 6; t++) { await sleep(10000); console.log('  +' + (t + 1) * 10 + 's rss ' + procs().rendererMax) } await b.close(); process.exit(3) }
    await sleep(800) }
  console.log('no hang in', weeks, 'weeks'); await b.close() })().catch(e => { console.error(e); process.exit(2) });
