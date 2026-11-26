#!/usr/bin/env node
/* dev/measure/renderer-mem-book.js — F10: the «Tuần lục» week book open spike on a real year-1 save.
   Loads <ckpt.json> (robot checkpoint: its localStorage save) into the site, loadSlot(), then opens the week book (dawn()) <n> times,
   turning to the end once, and logs the renderer RSS peak (1 s sampler + per step) and the picture cache (cc/image_memory).
   usage: node dev/measure/renderer-mem-book.js --root <site dir> --ckpt <ckpt.json> [--dev fold|ipadAir] [--dsf 2] [--n 3] */
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const D = require('../test/lib/device'); const { procs, memdump } = require('./renderer-mem-lib');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] };
const sleep = t => new Promise(r => setTimeout(r, t));
(async () => { const ck = require(path.resolve(opt('ckpt'))); const srv = await D.serveRoot(path.resolve(opt('root'))); const N = +opt('n', 3);
  const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, opt('dev', 'fold'), { deviceScaleFactor: +opt('dsf', 2), serviceWorkers: 'block' });
  await ctx.addInitScript(ls => { try { if (!sessionStorage.getItem('rmls')) { for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v); sessionStorage.setItem('rmls', 1) } } catch (e) { } window.__bot = { pre: 1 } }, ck.ls);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); let crashed = false; p.on('crash', () => { crashed = true });
  let pk = 0; const T = setInterval(() => { const r = procs().rendererMax; if (r > pk) pk = r }, 500);
  const f = await D.openHost(p, srv.url, { timeout: 300000 }); await sleep(3000);
  console.log("load", await f.evaluate(() => { const r = { sk: SK(1), has: !!localStorage.getItem(SK(1)), keys: Object.keys(localStorage).join(",") }; try { const lb = document.querySelector("#slots [data-load]"); r.ret = lb ? lb.dataset.load : "none"; if (lb) lb.click() } catch (e) { r.err = String(e).slice(0, 120) } try { Q.length = 0; closeModal() } catch (e) { } try { render() } catch (e) { } r.S = typeof S !== "undefined" && !!S; return r })); await sleep(6000);
  const cc = async () => { try { const s = await ctx.newCDPSession(p); const md = await memdump({ newBrowserCDPSession: async () => s }); const R = Object.values(md.P).find(o => /Renderer/.test(o.name || '')) || { alloc: {} }; return Math.round(R.alloc['cc/image_memory'] || 0) + '/' + Math.round(R.alloc.discardable || 0) } catch (e) { return '?' } };
  const row = async (what) => { await sleep(1500); const r = procs().renderer; console.log(what.padEnd(14), 'rend', r, 'peak', pk, 'img/disc', await cc(), 'imgs', await f.evaluate(() => document.querySelectorAll('#dawn img').length).catch(() => '?')); pk = r };
  await row('loaded y' + await f.evaluate(() => S.y || S.year));
  for (let i = 0; i < N && !crashed; i++) { await f.evaluate(() => dawn()).catch(e => console.log('dawn err', String(e).slice(0, 80))); await sleep(4000); await row('open ' + (i + 1));
    for (let k = 0; k < 40 && !crashed; k++) { const ok = await f.evaluate(() => { const b = window.__kbk; if (!b || b.cur >= b.max) return 0; b.next(); return 1 }).catch(() => 0); if (!ok) break; await sleep(500) } await row('turned to end');
    await f.evaluate(() => { try { window.__kbk.close() } catch (e) { } }).catch(() => { }); await sleep(1500) }
  clearInterval(T); console.log('crashed', crashed, 'errors', errs.slice(0, 3)); await b.close(); srv.close() })().catch(e => { console.error(e); process.exit(2) });
