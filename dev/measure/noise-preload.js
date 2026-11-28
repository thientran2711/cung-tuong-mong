/* noise-preload.js — node -r preload for the REAL-TAP robot (dev/test/robot-rt.js, review/robot-realtap): every browser context the robot opens
   gets the read-only noise sampler (dev/measure/noise-sampler.js) as an init script and a binding window.__nzPush that appends its rows to
   the file named by env RT_NOISE (one JSON line per push: {life, dev, row, txt}). The robot itself is unchanged (no tap, no game call added).
   usage: RT_NOISE=<out>/noise-<life>.jsonl node -r ./dev/measure/noise-preload.js dev/test/robot-rt.js <url> <out> life=<life> dev=fold … */
'use strict';
const fs = require('fs'), path = require('path');
const OUTF = process.env.RT_NOISE; const SAMPLER = require('./noise-sampler.js');
if (OUTF) {
  const pw = require('playwright');
  const meta = { life: process.env.RT_NOISE_LIFE || path.basename(OUTF).replace(/^noise-|\.jsonl$/g, ''), dev: process.env.RT_NOISE_DEV || '' };
  const wire = async ctx => {
    try { await ctx.exposeBinding('__nzPush', (src, s) => { try { fs.appendFileSync(OUTF, JSON.stringify(Object.assign({}, meta, JSON.parse(s))) + '\n') } catch (e) {} }) } catch (e) {}
    await ctx.addInitScript(SAMPLER, { sampleMs: +process.env.RT_NOISE_MS || 350 }); return ctx };
  const C = pw.chromium;
  const lpc = C.launchPersistentContext.bind(C); C.launchPersistentContext = async (...a) => wire(await lpc(...a));
  const ln = C.launch.bind(C); C.launch = async (...a) => { const b = await ln(...a); const nc = b.newContext.bind(b); b.newContext = async (...x) => wire(await nc(...x));
    const np = b.newPage.bind(b); b.newPage = async (...x) => { const c = await b.newContext(...x); return c.newPage() }; return b };
}
