// Fixed-action Playwright driver for playing trungsinhgame.com like a player (one browser, real clicks).
// ops: goto | text | click {t,n,exact} | tap {x,y} | fill {p,v} | shot {name} | scroll {dy} | buttons
const { chromium } = require('playwright');
const http = require('http');
(async () => {
  const browser = await chromium.launch();
  const fs = require('fs');
  const ctx = await browser.newContext({ viewport: { width: 430, height: 900 }, locale: 'vi-VN', storageState: fs.existsSync('state.json') ? 'state.json' : undefined });
  const page = await ctx.newPage();
  http.createServer((req, res) => {
    let body = ''; req.on('data', d => body += d);
    req.on('end', async () => {
      let out = '';
      try {
        const a = JSON.parse(body);
        if (a.op === 'goto') await page.goto('https://trungsinhgame.com' + (a.path || '/'));
        else if (a.op === 'click') await page.getByText(a.t, { exact: !!a.exact }).nth(a.n || 0).click({ timeout: 5000 });
        else if (a.op === 'tap') await page.mouse.click(a.x, a.y);
        else if (a.op === 'fill') await page.getByPlaceholder(a.p).fill(a.v);
        else if (a.op === 'shot') await page.screenshot({ path: 'shots/' + a.name + '.png' });
        else if (a.op === 'draw') { for (const st of a.strokes) { await page.mouse.move(st[0][0], st[0][1]); await page.mouse.down(); for (const p of st.slice(1)) await page.mouse.move(p[0], p[1], { steps: 4 }); await page.mouse.up(); } }
        else if (a.op === 'save') await ctx.storageState({ path: 'state.json' });
        else if (a.op === 'reload') await page.reload();
        else if (a.op === 'scroll') await page.mouse.wheel(0, a.dy || 600);
        await page.waitForTimeout(a.wait || 1500);
        if (a.op === 'buttons') out = JSON.stringify(await page.$$eval('button,a,[role=button]', els => els.filter(e => e.offsetParent).map(e => e.innerText.trim().replace(/\s+/g, ' ').slice(0, 70)).filter(Boolean)));
        else if (a.op === 'modal') out = JSON.stringify(await page.evaluate(() => {
          const vis = e => e.offsetParent || getComputedStyle(e).position === 'fixed';
          const cands = [...document.querySelectorAll('[role=dialog], body *')].filter(e => { const cs = getComputedStyle(e); return (e.getAttribute('role') === 'dialog' || cs.position === 'fixed') && e.getBoundingClientRect().height > 200 && e.innerText.trim().length > 0; });
          const m = cands[cands.length - 1];
          if (!m) return { modal: null };
          const btns = [...m.querySelectorAll('button,[role=button]')].filter(b => b.offsetParent).map(b => b.innerText.trim().replace(/\s+/g, ' '));
          return { modal: m.innerText, btns };
        }));
        else out = await page.evaluate(() => document.body.innerText);
      } catch (e) { out = 'ERR ' + e.message.split('\n')[0]; }
      res.end(out);
    });
  }).listen(9333, () => console.log('ready'));
})();
