// node shots.js -> screenshots/: page (Fold 755x1000, iPad 1180x820), each card close-up on/off + full
const {chromium} = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const url = 'file://' + path.resolve(__dirname, 'necklace-square-demo.html');
  for (const [dev, w, h] of [['fold', 755, 1000], ['ipad', 1180, 820]]) {
    const p = await b.newPage({viewport: {width: w, height: h}, deviceScaleFactor: 1});
    await p.goto(url); await p.waitForTimeout(500);
    await p.screenshot({path: `screenshots/${dev}_page.png`, fullPage: true});
    for (const id of ['t1', 't2']) {
      const c = await p.$('#card-' + id);
      await c.screenshot({path: `screenshots/${dev}_${id}_close_on.png`});
      await (await c.$('[data-w]')).click(); await c.screenshot({path: `screenshots/${dev}_${id}_close_off.png`});
      await (await c.$('[data-w]')).click();
      await (await c.$('[data-v="half"]')).click(); await c.screenshot({path: `screenshots/${dev}_${id}_half_on.png`});
      await (await c.$('[data-v="close"]')).click();
    }
    await p.close();
  }
  await b.close();
})();
