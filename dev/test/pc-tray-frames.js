// Deterministic frame capture (time is stepped via window.__T, so slow software GL still gives real-speed video).
// node dev/test/pc-tray-frames.js <baseUrl> <outDir> <WxH> <dpr> <fps> <seconds> [from,to,step override: list "2,3.6"]
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [url, out, vp, dpr, fps, secs, list] = process.argv.slice(2); const [w, h] = vp.split('x').map(Number);
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: +dpr })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url + '/dev/demo/pc-tray/index.html?dpr=' + dpr, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__trial && window.__trial.ready, null, { timeout: 60000 });
  const ts = list ? list.split(',').map(Number) : Array.from({ length: Math.round(fps * secs) + 1 }, (_, i) => i / fps);
  let i = 0;
  for (const t of ts) {
    await p.evaluate(t => new Promise(r => { window.__T = t; requestAnimationFrame(() => requestAnimationFrame(r)); }), t);
    await p.screenshot({ path: `${out}/f${list ? 't' + t : String(i).padStart(4, '0')}.${list ? 'png' : 'jpg'}`, ...(list ? {} : { type: 'jpeg', quality: 92 }) }); i++;
  }
  console.log(JSON.stringify({ frames: i, errs }));
  await b.close();
})();
