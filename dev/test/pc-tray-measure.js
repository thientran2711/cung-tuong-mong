// node dev/test/pc-tray-measure.js <baseUrl> <WxH> <dpr> <cpuThrottle>  -> JSON (real-time run of the whole 14 s scene)
const { chromium } = require('playwright');
(async () => {
  const [url, vp, dpr, thr] = process.argv.slice(2); const [w, h] = vp.split('x').map(Number);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: +dpr }); const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: +thr });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  const t0 = Date.now();
  await p.goto(url + '/dev/demo/pc-tray/index.html?dpr=' + dpr, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__trial && window.__trial.ready, null, { timeout: 120000 });
  const ready = Date.now() - t0;
  await p.evaluate(() => { window.__trial.fps.length = 0; window.__trial.long = 0; window.__trial.longMs = 0; window.__restart(); });
  await p.waitForFunction(() => window.__trial.done, null, { timeout: 200000, polling: 500 });
  const r = await p.evaluate(() => { const f = window.__trial.fps.slice(5).sort((a, b) => a - b); const sum = f.reduce((a, b) => a + b, 0);
    const res = performance.getEntriesByType('resource'); return { frames: f.length, avgFps: +(1000 * f.length / sum).toFixed(1), medMs: f[f.length >> 1], p95Ms: f[Math.floor(f.length * .95)], maxMs: f[f.length - 1],
      long: window.__trial.long, longMs: Math.round(window.__trial.longMs), loadMs: window.__trial.loadMs, heapMB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null,
      resBytes: res.reduce((a, e) => a + (e.encodedBodySize || 0), 0), resN: res.length, cardPx: window.__trial.cardPx }; });
  console.log(JSON.stringify({ vp, dpr, thr, readyMs: ready, ...r, errs }));
  await b.close();
})();
