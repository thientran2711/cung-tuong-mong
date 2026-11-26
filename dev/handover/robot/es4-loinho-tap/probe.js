const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const dump = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2, hasTouch: true });
  const p = await ctx.newPage(); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('https://thientran2711.github.io/cung-tuong-mong/', { waitUntil: 'load' }); await p.waitForTimeout(4000);
  await p.evaluate(ls => { for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v) }, dump.ls);
  await p.reload({ waitUntil: 'load' }); await p.waitForTimeout(5000);
  for (let i = 0; i < 40; i++) { const t = await p.evaluate(() => document.body.innerText); if (/Chơi một mình/.test(t)) break; await p.waitForTimeout(3000) }
  const tapText = async re => { const els = await p.$$('button, [role=button], .btn, div, span, a'); for (const e of els) { const t = (await e.innerText().catch(() => '')).trim(); if (t.length < 40 && re.test(t) && await e.isVisible()) { await e.tap().catch(() => {}); return t } } return null };
  console.log('solo', await p.getByText(/Chơi một mình/i).first().tap().then(()=>'ok').catch(e=>'fail '+e.message.slice(0,60))); await p.waitForTimeout(2500);
  for (let i = 0; i < 6; i++) { const r = await p.getByText(/Tiếp tục kiếp này/i).first().tap({ timeout: 4000 }).then(() => 'ok').catch(() => null); console.log('resume try', i, r); if (r) break; await p.waitForTimeout(3000) } await p.waitForTimeout(8000);
  await p.screenshot({ path: '/home/user/wt/e-s4-probe/s1.png' });
  const info = await p.evaluate(() => { const out = []; document.querySelectorAll('.dlg').forEach(d => { const r = d.getBoundingClientRect(); out.push({ title: (d.innerText || '').slice(0, 60), r: [r.x, r.y, r.width, r.height].map(Math.round) }) }); return out });
  console.log(JSON.stringify(info));
  const cards = await p.evaluate(() => { const out = []; document.querySelectorAll('.dlg *').forEach(e => { const t = (e.innerText || ''); const r = e.getBoundingClientRect(); if (/^(Nhận lời|Khéo từ chối)/.test(t.trim()) && r.width > 150 && r.width < 420) out.push({ tag: e.tagName + '.' + (e.className || '') + '#' + (e.id || ''), txt: t.slice(0, 20), r: [r.x, r.y, r.width, r.height].map(Math.round) }) }); return out });
  console.log(JSON.stringify(cards));
  for (const c of cards.slice(0, 6)) { const [x, y, w, h] = c.r; const cx = x + w / 2, cy = y + h / 2; const top = await p.evaluate(([cx, cy]) => { const e = document.elementFromPoint(cx, cy); return e ? e.tagName + '.' + e.className + ' in ' + ((e.closest('[id]') || {}).id) : null }, [cx, cy]); console.log('center', c.txt, cx, cy, 'top=', top) }
  const t0 = await p.evaluate(() => { const d = document.querySelector('.dlg'); return d && d.innerText.slice(0, 40) });
  if (cards[0]) { const [x, y, w, h] = cards[0].r; await p.touchscreen.tap(x + w / 2, y + h / 2); await p.waitForTimeout(2500); await p.screenshot({ path: '/home/user/wt/e-s4-probe/s2.png' }); const t1 = await p.evaluate(() => { const d = document.querySelector('.dlg'); return d && d.innerText.slice(0, 40) }); console.log('before:', t0, '| after tap Nhan loi center:', t1) }
  await b.close();
})().catch(e => { console.log('ERR', e.message); process.exit(1) });
