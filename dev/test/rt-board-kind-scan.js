#!/usr/bin/env node
/* rt-board-kind-scan.js — HARNESS FIXER #18 family scan (law 11, F ROOT #3 job 3: the «ve» debut board was never played).
   Lists EVERY board kind of the game (KG82_KIND, after every j*.js has registered its engines), its engine, and the INPUT the engine's own
   test oracle KG82.peek() asks for — read from the engine source: point {x,y} (tap), drag {drag:[[x,y]…]}, hold {hold,x,y | hsel},
   button {sel}, timed point {at}, flick {thinkMs}. robot-rt.js BOARD PLAY before FIXER #18 understood ONLY the point shape: every other
   shape fell to random «area» taps (E-S1 seed 3683447523 «BOARD ve 0 moves 2/10, 19 area taps» → ladder «Quay lại» → ban hoa).
   Also lists the playArt arts (RT_TEST_BOARD=<art>) and the kind each opens.
   usage: node dev/test/rt-board-kind-scan.js <site url, e.g. http://127.0.0.1:8918/> [--md]   (reads only; no tap) */
'use strict';
const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2] || 'http://127.0.0.1:8918/';
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 755, height: 1000 } })).newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.waitForFunction(() => typeof KG82_KIND === 'object' && typeof KG82_ENG === 'object', null, { timeout: 60e3 });
  await p.waitForTimeout(1500);
  /* every peek function an engine installs is caught by a setter on KG82.peek (all phases, also helpers outside the engine body); the engine is
     started on a bare test box (the j82 contract eng(box, env)) and its peek() is SAMPLED for a few seconds (no tap) — shapes = static ∪ sampled */
  const kinds = await p.evaluate(() => Object.keys(KG82_KIND));
  const rows = [];
  for (const k of kinds) rows.push(await p.evaluate(k => new Promise(res => {
    const K = KG82_KIND[k] || {}, e = K.e, f = (KG82_ENG || {})[e]; const srcs = new Set(), seen = new Set(); let cur = KG82.peek;
    const cls = q => { const s = new Set(); if (/drag:/.test(q)) s.add('drag'); if (/\bsel:/.test(q)) s.add('sel'); if (/hold:/.test(q)) s.add(/hsel:/.test(q) ? 'hold-btn' : 'hold');
      if (/thinkMs:/.test(q)) s.add('flick'); if (/\bat:/.test(q)) s.add('timed'); if (/C\.client\(|\{\s*x:/.test(q.replace(/drag:\[[^\]]*\]/g, ''))) s.add('point'); return s };
    const smp = v => { if (!v || typeof v !== 'object') return; if (v.drag) seen.add('drag'); else if (v.sel) seen.add('sel'); else if ('hold' in v) seen.add(v.hsel ? 'hold-btn' : 'hold'); else if (v.thinkMs) seen.add('flick'); else if (v.at != null) seen.add('timed'); else if (isFinite(v.x)) seen.add('point') };
    try { Object.defineProperty(KG82, 'peek', { configurable: true, get: () => cur, set: v => { cur = v; srcs.add(String(v)) } }) } catch (er) {}
    const box = document.createElement('div'); box.style.cssText = 'position:fixed;left:0;top:0;width:360px;height:560px;z-index:99999;background:#fff'; document.body.appendChild(box);
    let stop = null, err = null; const ph0 = KG82.phase; KG82.phase = 'play';
    try { if (typeof f === 'function') stop = f(box, { kind: k, lv: 0, hud: () => {}, end: () => {} }) } catch (er) { err = er.message }
    const t0 = performance.now(); const tick = () => { try { smp(cur && cur()) } catch (er) {} if (performance.now() - t0 < 3500) setTimeout(tick, 40); else fin() };
    const fin = () => { try { if (typeof stop === 'function') stop() } catch (er) {} box.remove(); KG82.phase = ph0; delete KG82.peek; KG82.peek = () => null;
      const st = new Set(); for (const q of srcs) if (!/^\(\)\s*=>\s*null$/.test(q.trim())) for (const x of cls(q)) st.add(x);
      res({ kind: k, n: K.n || '', e: e || '', own: !!K.own, err, static: [...st].sort().join('+') || 'none', sampled: [...seen].sort().join('+') || '–' }) };
    setTimeout(tick, 300) }), k).catch(er => ({ kind: k, err: er.message, static: '?', sampled: '?' })));
  const md = process.argv.includes('--md');
  for (const r of rows) r.input = [...new Set([...String(r.static).split('+'), ...String(r.sampled).split('+')].filter(x => x && x !== 'none' && x !== '–' && x !== '?'))].sort().join('+') || 'none';
  if (md) { console.log('| kind | name | engine | oracle input (static peek source ∪ sampled 3.5 s, no tap) |\n|---|---|---|---|'); for (const r of rows) console.log('| ' + r.kind + ' | ' + r.n + ' | ' + r.e + (r.own ? ' (own)' : '') + ' | ' + r.input + (r.err ? ' (start err: ' + r.err.slice(0, 40) + ')' : '') + ' |') }
  else console.log(JSON.stringify(rows, null, 1));
  const by = {}; for (const r of rows) for (const s of r.input.split('+')) (by[s] = by[s] || []).push(r.kind);
  console.log('\n' + rows.length + ' kinds. By input: ' + Object.entries(by).map(([s, k]) => s + ' ' + k.length + ' [' + k.join(',') + ']').join(' · '));
  console.log('Before FIXER #18 robot-rt played ONLY «point»: kinds needing drag/hold/sel/flick = ' + rows.filter(r => /drag|hold|sel|flick/.test(r.input)).map(r => r.kind).join(','));
  await b.close() })().catch(e => { console.error(e); process.exit(1) });
