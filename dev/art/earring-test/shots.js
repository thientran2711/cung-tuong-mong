// node shots.js -> screenshots/ : each figure without / with all items, at Fold 755x1000 and iPad 1180x820
const {chromium} = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const url = 'file://' + path.resolve(__dirname, 'earring-demo.html');
  for (const [dev, w, h] of [['fold', 755, 1000], ['ipad', 1180, 820]]) {
    const p = await b.newPage({viewport: {width: w, height: h}, deviceScaleFactor: 1});
    await p.goto(url);
    await p.waitForTimeout(500);
    await p.screenshot({path: `screenshots/${dev}_page_off.png`});
    for (const id of ['c11', 'c09']) {
      const c = await p.$('#card-' + id);
      await c.screenshot({path: `screenshots/${dev}_${id}_off.png`});
      for (const bt of await c.$$('button')) await bt.click();
      await p.waitForTimeout(200);
      await c.screenshot({path: `screenshots/${dev}_${id}_on.png`});
    }
    await p.close();
  }
  await b.close();
})();
