#!/usr/bin/env node
/* dev/measure/renderer-mem-heap.js — F10: WHAT keeps growing in the renderer. Plays the in-page bot (playperf STEP) and, at the buổi listed
   in --at (e.g. 20,80), forces a full GC and takes a V8 heap snapshot; prints per constructor (count, self MB, retained-by-DOM) the growth
   between snapshots, the detached DOM trees, and the biggest strings (external strings = Blink-owned text, the partition_alloc buffer).
   usage: node dev/measure/renderer-mem-heap.js --url <site> [--at 20,80] [--seed 6] [--cold 1] [--dev fold] */
'use strict';
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const D = require('../test/lib/device'), PP = require('../test/lib/playperf'); const { procs, memdump } = require('./renderer-mem-lib');
const A = process.argv.slice(2); const opt = (k, d) => { const i = A.indexOf('--' + k); return i < 0 ? d : A[i + 1] };
const AT = String(opt('at', '20,80')).split(',').map(Number), SEED = +opt('seed', 6), DEV = opt('dev', 'fold'), OUTD = opt('out', '/tmp');
const sleep = t => new Promise(r => setTimeout(r, t));
async function snap(cdp) { await cdp.send('HeapProfiler.enable'); for (let i = 0; i < 3; i++) await cdp.send('HeapProfiler.collectGarbage'); const ch = []; const h = d => ch.push(d.chunk); cdp.on('HeapProfiler.addHeapSnapshotChunk', h);
  await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false, captureNumericValue: false }); cdp.off('HeapProfiler.addHeapSnapshotChunk', h); return JSON.parse(ch.join('')) }
function summ(s) { const m = s.snapshot.meta, NF = m.node_fields.length, EF = m.edge_fields.length, T = m.node_types[0], ET = m.edge_types[0]; const N = s.nodes, E = s.edges, STR = s.strings;
  const it = m.node_fields.indexOf('type'), iname = m.node_fields.indexOf('name'), isz = m.node_fields.indexOf('self_size'), iec = m.node_fields.indexOf('edge_count'), idet = m.node_fields.indexOf('detachedness');
  const by = new Map(), strs = []; let det = 0, detN = new Map();
  for (let i = 0; i < N.length; i += NF) { const ty = T[N[i + it]], nm = STR[N[i + iname]], sz = N[i + isz]; let k = ty === 'object' || ty === 'native' ? nm.replace(/\s*\/.*$/, '').slice(0, 60) : '(' + ty + ')';
    if (idet >= 0 && N[i + idet] === 2) { det++; const kk = 'Detached ' + k; detN.set(kk, (detN.get(kk) || 0) + 1) }
    const o = by.get(k) || { n: 0, sz: 0 }; o.n++; o.sz += sz; by.set(k, o); if ((ty === 'string' || ty === 'concatenated string' || ty === 'sliced string') && sz > 50000) strs.push([sz, ty, nm.slice(0, 90).replace(/\s+/g, ' ')]) }
  strs.sort((a, b) => b[0] - a[0]); return { by, det, detN, strs: strs.slice(0, 25), total: [...by.values()].reduce((a, o) => a + o.sz, 0) } }
(async () => {
  const srv = null, url = opt('url'); const b = await chromium.launch(); const ctx = await D.newDeviceContext(b, DEV, { deviceScaleFactor: 2, serviceWorkers: 'block' });
  await ctx.addInitScript(PP.INIT); await ctx.addInitScript(s => { window.__bot = { pre: 1 }; let x = s; Math.random = () => { x = (x * 16807) % 2147483647; return (x - 1) / 2147483646 } }, SEED * 7919 + 13);
  const p = await ctx.newPage(); const f = await D.openHost(p, url, { timeout: 300000 }); await sleep(2000); await PP.newLife(f); await sleep(2500); await f.evaluate(PP.CLEAR);
  if (+opt('cold', 0)) await f.evaluate(() => { try { cold('Bị vu cáo (thử bộ nhớ)'); render() } catch (e) { } });
  const cdp = await ctx.newCDPSession(p); const fc = await ctx.newCDPSession(p); const snaps = []; let bn = 0;
  while (bn < Math.max(...AT)) { const b0 = await f.evaluate(() => window.__buoiN || 0).catch(() => 0); let g = 0;
    while ((await f.evaluate(() => window.__buoiN || 0).catch(() => b0)) === b0 && g++ < 80) { await f.evaluate(PP.STEP).catch(() => { }); await sleep(150) }
    bn++; await f.evaluate(PP.CLEAR).catch(() => { }); await sleep(500);
    if (AT.includes(bn) || (+opt('every', 0) && bn % +opt('every', 0) === 0)) { const r0 = procs(); const m0 = +opt('nodump', 0) ? { P: {} } : await memdump(b); const R0 = Object.values(m0.P).filter(o => /Renderer/.test(o.name || '')).sort((x, y) => (y.alloc.malloc || 0) - (x.alloc.malloc || 0))[0]; const dcx = await cdp.send('Memory.getDOMCounters');
      console.log(`PRE b${bn} rss ${r0.rendererMax} anon ${Math.round(r0.rAnon)} domAll ${dcx.nodes} docs ${dcx.documents} lst ${dcx.jsEventListeners} buffer ${R0 && Math.round(R0.alloc['partition_alloc/partitions/buffer'])} blink_gc ${R0 && Math.round(R0.alloc.blink_gc)} v8 ${R0 && Math.round(R0.alloc.v8)} malloc ${R0 && Math.round(R0.alloc.malloc)} img ${R0 && Math.round(R0.alloc['cc/image_memory']||0)}`) }
    if (AT.includes(bn)) { const dc = await cdp.send('Memory.getDOMCounters'); const md = +opt('nodump', 0) ? { P: {} } : await memdump(b); const R = Object.values(md.P).filter(o => /Renderer/.test(o.name || '')).sort((x, y) => (y.alloc.malloc || 0) - (x.alloc.malloc || 0))[0];
      const raw = await snap(cdp); if (opt('save', 0)) fs.writeFileSync(opt('save') + '-b' + bn + '.heapsnapshot', JSON.stringify(raw)); const s = summ(raw); const dc2 = await cdp.send('Memory.getDOMCounters'); s.dc = dc; s.dc2 = dc2; s.rss = procs(); s.alloc = R && R.alloc; s.bn = bn; snaps.push(s);
      console.log(`SNAP b${bn} heap ${(s.total / 1048576).toFixed(1)} MB detached ${s.det} dom(before gc) ${dc.nodes} after ${dc2.nodes} docs ${dc2.documents} rss ${s.rss.rendererMax} anon ${Math.round(s.rss.rAnon)} buffer ${R && Math.round(R.alloc['partition_alloc/partitions/buffer'])} blink_gc ${R && Math.round(R.alloc.blink_gc)}`);
      console.log('  detached: ' + [...s.detN.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(x => x[0] + '×' + x[1]).join(', '));
      console.log('  big strings: ' + s.strs.slice(0, 10).map(x => Math.round(x[0] / 1024) + 'K ' + x[1] + ' «' + x[2].slice(0, 50) + '»').join(' | ')) } }
  if (snaps.length >= 2) { const a = snaps[0], z = snaps[snaps.length - 1]; const rows = []; for (const [k, o] of z.by) { const o0 = a.by.get(k) || { n: 0, sz: 0 }; rows.push([k, o.n - o0.n, (o.sz - o0.sz) / 1048576, o.n, o.sz / 1048576]) }
    rows.sort((x, y) => y[2] - x[2]); console.log(`GROWTH b${a.bn}→b${z.bn} (constructor, +count, +MB, count, MB):`); rows.slice(0, 30).forEach(r => console.log('  ' + r[0] + '  +' + r[1] + '  +' + r[2].toFixed(2) + '  ' + r[3] + '  ' + r[4].toFixed(2)));
    rows.sort((x, y) => y[1] - x[1]); console.log('GROWTH by count:'); rows.slice(0, 20).forEach(r => console.log('  ' + r[0] + '  +' + r[1] + '  +' + r[2].toFixed(2))) }
  await b.close() })().catch(e => { console.error(e); process.exit(2) });
