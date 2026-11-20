// node shots.js -> screenshots/ : each figure off / on (ALL wear buttons: earrings, bangle, necklace, phi bach on c22, waist items + pins/flowers), compare card, phi bach A|B card; Fold 755x1000 + iPad 1180x820
const {chromium} = require('playwright');
const path = require('path');
const ON = {c11: ['pin_plum', 'fl_peach'], c09: ['fl_peony', 'pin_butterfly', 'fl_jasmine'], c22: ['pin_dangle', 'fl_orchid', 'pin_floralfork']};
(async () => {
  const b = await chromium.launch();
  const url = 'file://' + path.resolve(__dirname, 'earring-demo.html');
  for (const [dev, w, h] of [['fold', 755, 1000], ['ipad', 1180, 820]]) {
    const p = await b.newPage({viewport: {width: w, height: h}, deviceScaleFactor: 1});
    await p.goto(url);
    await p.waitForTimeout(600);
    await p.screenshot({path: `screenshots/${dev}_page_off.png`});
    for (const id of ['c11', 'c09', 'c22']) {
      const c = await p.$('#card-' + id);
      await c.screenshot({path: `screenshots/${dev}_${id}_off.png`});
      for (const bt of await c.$$('button[data-k]')) await bt.click();
      for (const k of ON[id]) await (await c.$(`button[data-h="${k}"]`)).click();
      await p.waitForTimeout(300);
      await c.screenshot({path: `screenshots/${dev}_${id}_on.png`});
    }
    await (await p.$('#card-compare')).screenshot({path: `screenshots/${dev}_compare.png`});
    await (await p.$('#card-phibach')).screenshot({path: `screenshots/${dev}_phibach_AB.png`});
    await p.close();
  }
  await b.close();
})();
