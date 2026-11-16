// node dev/test/pc-tray-shots.js <baseUrl> <outDir> <WxH> <dpr> [times comma sep]
const { chromium } = require('playwright');
(async () => {
  const [url, out, vp, dpr, times] = process.argv.slice(2); const [w, h] = vp.split('x').map(Number);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] });
  const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: +dpr })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url + '/dev/demo/pc-tray/index.html?dpr=' + dpr, { waitUntil: 'load' });
  await p.waitForFunction(() => window.__trial && window.__trial.ready, null, { timeout: 60000 });
  await p.evaluate(() => window.__restart());
  const T = (times || '2,5,6.5,9,12').split(',').map(Number); const s0 = Date.now();
  for (const t of T) { const wait = t * 1000 - (Date.now() - s0); if (wait > 0) await p.waitForTimeout(wait); await p.screenshot({ path: `${out}/s-${vp}-t${t}.png` }); }
  console.log(JSON.stringify({ errs, load: await p.evaluate(() => window.__trial.loadMs) }));
  await b.close();
})();
