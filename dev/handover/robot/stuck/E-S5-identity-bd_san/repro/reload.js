// usage: node reload.js <outdir> <life>  — reopen the harness profile (persistent localStorage) on LIVE, report what the title offers
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const [out, life] = process.argv.slice(2); const URL = 'https://thientran2711.github.io/cung-tuong-mong/';
  const ctx = await chromium.launchPersistentContext(path.join(out, 'profile-' + life), { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1, hasTouch: false, isMobile: false, serviceWorkers: 'block' });
  const p = ctx.pages()[0] || await ctx.newPage();
  const ls = async () => p.evaluate(() => Object.keys(localStorage).map(k => [k, localStorage.getItem(k).length])).catch(() => 'n/a');
  await p.goto(URL, { waitUntil: 'load' }).catch(() => {}); await p.waitForTimeout(6000);
  console.log('LS keys at open (key,chars):', JSON.stringify(await ls()));
  const btns = async () => p.evaluate(() => [...document.querySelectorAll('button,.opt,[role=button]')].filter(e => e.offsetParent).map(e => (e.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40)).filter(Boolean).slice(0, 25)).catch(() => []);
  console.log('TITLE buttons:', JSON.stringify(await btns()));
  await p.screenshot({ path: path.join(out, 'reload-title.png') });
  for (let i = 0; i < 3; i++) {
    const r = await p.evaluate(() => { const els = [...document.querySelectorAll('button,.opt,[role=button]')].filter(e => e.offsetParent); const pick = els.find(e => /chơi một mình/i.test(e.innerText)) || els.find(e => /chơi tiếp|tiếp tục|vào sổ/i.test(e.innerText)); if (pick) { pick.click(); return (pick.innerText || '').trim().slice(0, 40) } return null }).catch(() => null);
    console.log('click', i, r); if (!r) break; await p.waitForTimeout(3000); console.log('buttons after:', JSON.stringify(await btns()));
  }
  await p.waitForTimeout(3000);
  const st = await p.evaluate(() => { try { const s = window.S || (typeof S !== 'undefined' ? S : null); return s ? { name: s.name, org: s.org, y: s.y, age: s.age, t: s.t, clock: [s.y, s.t, s.w, s.b].join('.') } : null } catch (e) { return String(e) } });
  console.log('STATE after continue:', JSON.stringify(st)); await p.screenshot({ path: path.join(out, 'reload-after.png') });
  await ctx.close();
})();
