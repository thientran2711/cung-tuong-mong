#!/usr/bin/env node
/* dev/measure/renderer-mem.js — F10 renderer-memory probe: plays N buổi with the in-page bot (dev/test/lib/playperf STEP) and logs, per buổi,
   the native memory of the page next to what holds pictures:
     rss      RSS (MB) of each Chromium process of THIS browser by type (renderer = the game page, gpu, browser, other) — read from /proc
     dom      CDP Memory.getDOMCounters (documents, nodes, listeners) + JS heap (performance.memory)
     img      <img> in the game document: count, decoded megapixels (natural w*h), of which hidden / off-screen; biggest one
     bg       CSS background images in use (unique urls, elements), canvases (count, MPx), videos
     js       pictures held by JS only (Image objects never put in the page / removed from it): alive count + MPx (WeakRef registry, init script)
     lay      composited layers (CDP LayerTree) count + painted MPx (every --layEvery buổi; LayerTree is costly)
   usage: node dev/measure/renderer-mem.js --root <site dir> | --url <site url>  [--dev fold|ipadAir] [--dsf 2] [--buoi 100] [--out f.json]
          [--seed n] [--layEvery 10] [--gpu 0|1 (1 = the playperf GPU args; default 0 = plain headless like the robot)]
   The site dir is a checkout root (index.html + sw.js + assets.json + audio …); pictures come from the CDN like on the live site. */
'use strict';
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const D = require('../test/lib/device'), PP = require('../test/lib/playperf');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : (A[i + 1] === undefined || A[i + 1].startsWith('--') ? true : A[i + 1]) };
const DEV = opt('dev', 'fold'), DSF = +opt('dsf', 2), NB = +opt('buoi', 100), OUT = opt('out', null), SEED = +opt('seed', 1), LAYE = +opt('layEvery', 10), GPU = +opt('gpu', 0);
const sleep = t => new Promise(r => setTimeout(r, t));
const { procs, REG, SCAN, SEEN, DECS, memdump } = require('./renderer-mem-lib'); const DUMPE = +opt('dumpEvery', 0);
(async () => {
  let srv = null, url = opt('url', null); if (!url) { srv = await D.serveRoot(path.resolve(opt('root', path.join(__dirname, '../..')))); url = srv.url }
  const b = await chromium.launch({ args: GPU ? PP.LAUNCH_ARGS : [] }); const ctx = await D.newDeviceContext(b, DEV, { deviceScaleFactor: DSF, serviceWorkers: 'block' });
  await ctx.addInitScript(REG); await ctx.addInitScript(PP.INIT); await ctx.addInitScript(s => { window.__bot = { pre: 1 }; let x = s; Math.random = () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646 } }, SEED * 7919 + 13);
  const p = await ctx.newPage(); const errs = []; let crashed = null; p.on('pageerror', e => errs.push(e.message)); p.on('crash', () => { crashed = Date.now() });
  const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable'); try { await cdp.send('LayerTree.enable') } catch (e) { }
  let layers = null; cdp.on('LayerTree.layerTreeDidChange', e => { layers = e.layers || layers });
  const f = await D.openHost(p, url, { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  const rows = []; const t0 = Date.now(); let bn = 0; let pk = { r: 0, at: '' }; const pkT = setInterval(() => { try { const r = procs().rendererMax; if (r > pk.r) pk = { r, at: 'b' + bn } } catch (e) { } }, 1000);
  const sample = async (buoi) => { const rs = procs(); let dc = null; try { dc = await cdp.send('Memory.getDOMCounters') } catch (e) { } const sc = await f.evaluate(SCAN).catch(e => ({ err: String(e).slice(0, 80) }));
    let lay = null; if (layers && (buoi % LAYE === 0)) { let n = 0, px = 0, dr = 0; for (const l of layers) { n++; if (l.drawsContent) { dr++; px += (l.width || 0) * (l.height || 0) } } lay = { n, draws: dr, mpx: Math.round(px * DSF * DSF / 1e5) / 10 } }
    const row = { buoi, peak: pk.r, t: Math.round((Date.now() - t0) / 1000), rss: rs, dom: dc && { docs: dc.documents, nodes: dc.nodes, lst: dc.jsEventListeners }, lay, ...sc }; rows.push(row); pk = { r: 0, at: '' };
    if (DUMPE && buoi % DUMPE === 0) { try { const md = await memdump(b); const R = Object.values(md.P).filter(o => /Renderer/.test(o.name || '')).sort((x, y) => (y.alloc.malloc || 0) - (x.alloc.malloc || 0))[0]; if (R) { row.alloc = R.alloc; console.log('  STR ' + JSON.stringify(sc.str)); console.log('  ALLOC b' + buoi + ' ' + ['discardable', 'cc/tile_memory', 'partition_alloc', 'partition_alloc/partitions/buffer', 'partition_alloc/partitions/array_buffer', 'malloc', 'v8', 'blink_gc'].map(k => k.split('/').pop() + '=' + Math.round(R.alloc[k] || 0)).join(' ')) } } catch (e) { console.log('dump err', String(e).slice(0, 80)) } }
    console.log(`b${buoi} rend ${rs.renderer} pk ${row.peak} gpu ${rs.gpu} br ${rs.browser} | heap ${sc.heapMB} nodes ${sc.nodes} | img ${sc.img && sc.img.n}/${sc.img && sc.img.mpx}MP hid ${sc.img && sc.img.hidMpx} off ${sc.img && sc.img.offMpx} | bg ${sc.bg && sc.bg.urls}u/${sc.bg && sc.bg.els}e | cv ${sc.cv && sc.cv.n}/${sc.cv && sc.cv.mpx} | js ${sc.js && sc.js.alive}/${sc.js && sc.js.mpx}MP det ${sc.js && sc.js.detached}/${sc.js && sc.js.detMpx}${lay ? ' | lay ' + lay.n + '/' + lay.draws + ' ' + lay.mpx + 'MP' : ''}`) };
  await sample(0);
  while (bn < NB && !crashed) { let g = 0; const b0 = await f.evaluate(() => window.__buoiN || 0).catch(() => 0);
    while (!crashed && (await f.evaluate(() => window.__buoiN || 0).catch(() => b0)) === b0 && g++ < 80) { await f.evaluate(PP.STEP).catch(() => { }); await sleep(150) }
    bn++; await f.evaluate(PP.CLEAR).catch(() => { }); await sleep(600); if (!crashed) await sample(bn) }
  const seen = await f.evaluate(SEEN).catch(() => []); const decs = await f.evaluate(DECS).catch(e => ({ err: String(e) })); console.log('DECODES', JSON.stringify(decs)); const res = { seen, dev: DEV, dsf: DSF, url: srv ? 'root:' + srv.root : url, buoi: bn, crashed: !!crashed, errs: errs.slice(0, 5), peakRenderer: Math.max(...rows.map(r => Math.max(r.peak || 0, r.rss.renderer))), rows }; clearInterval(pkT);
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(res)); { const tot = seen.reduce((a, x) => a + x.mpx, 0), need = seen.reduce((a, x) => a + Math.min(x.mpx, x.need || x.mpx), 0); console.log('SEEN pictures ' + seen.length + ', natural ' + tot.toFixed(0) + ' MPx (≈' + (tot * 4).toFixed(0) + ' MB decoded), at shown size ' + need.toFixed(0) + ' MPx'); seen.slice(0, 25).forEach(x => console.log('  ' + x.mpx + 'MP ' + x.w + 'x' + x.h + ' shown ' + x.shown + ' need ' + x.need + ' ' + (x.bg ? 'bg ' : '') + x.u)) }
  console.log('PEAK renderer', res.peakRenderer, 'MB; crashed', res.crashed, '; errs', errs.length);
  await b.close(); if (srv) srv.close()
})().catch(e => { console.error(e); process.exit(2) });
