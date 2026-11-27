const { chromium } = require('playwright');
const OUT = '/home/user/wt/out-coop1j-c', SH = '/home/user/wt/coop1j-hand', U = 'http://127.0.0.1:8812/';
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const tapTxt = async (p, dev, re) => { const pt = await p.evaluate(src => { const R = new RegExp(src, 'i'); for (const b of document.querySelectorAll('button,[role=button]')) { const tx = (b.innerText || '').replace(/\s+/g, ' ').trim(); if (!R.test(tx) || b.disabled) continue; const r = b.getBoundingClientRect(); if (r.width < 3) continue; const x = r.left + r.width / 2, y = r.top + r.height / 2, t = document.elementFromPoint(x, y); if (t && (t === b || b.contains(t))) return { x, y } } return null }, re); if (pt) { if (dev === 'ipad') await p.mouse.click(pt.x, pt.y); else await p.touchscreen.tap(pt.x, pt.y) } return !!pt };
const st = p => p.evaluate(() => { try { return { buoi: S.buoi, used: typeof used !== 'undefined' ? used : null, tuan: S.tuan, turn: S.turn, sk: S.hp, mood: S.mood, next: (document.querySelector('#next') || {}).textContent, nextDis: (document.querySelector('#next') || {}).disabled, ended: COOP.state.ended, wk: COOP.state.week, Q: Q.length, modal: (document.querySelector('#modal:not([hidden]) h2,#modal:not([hidden]) h3,#modal:not([hidden]) .kdlg-t') || {}).innerText || '' } } catch (e) { return String(e) } });
(async () => {
  const S = {}; for (const [w, dev] of [['host', 'fold'], ['guest', 'ipad']]) { const c = await chromium.launchPersistentContext(OUT + '/profile-coop-flight2-coop1j-c-' + dev, { viewport: VP[dev], hasTouch: dev !== 'ipad', isMobile: dev !== 'ipad', serviceWorkers: 'block' }); const p = c.pages()[0] || await c.newPage(); await p.goto(U); S[w] = { c, p, dev } }
  await new Promise(r => setTimeout(r, 7000));
  for (const w of ['guest', 'host']) { await tapTxt(S[w].p, S[w].dev, '^Cùng hảo hữu'); await new Promise(r => setTimeout(r, 3000)); await tapTxt(S[w].p, S[w].dev, '^Trở lại phòng'); await new Promise(r => setTimeout(r, 8000)) }
  const g = S.guest.p;
  console.log('before', JSON.stringify(await st(g)));
  const cards = await g.evaluate(() => [...document.querySelectorAll('*')].filter(e => e.children.length < 30 && /Nghỉ ngơi một lát/.test(e.innerText || '') ).map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: String(e.className).slice(0, 60), id: e.id, ds: JSON.stringify(e.dataset).slice(0, 80), r: [r.left | 0, r.top | 0, r.width | 0, r.height | 0], onclick: !!e.onclick } }).slice(-8));
  console.log(JSON.stringify(cards, null, 0));
  await g.screenshot({ path: SH + '/P-guest-before.png' });
  // tap the smallest visible card containing «Nghỉ ngơi một lát»
  const pt = await g.evaluate(() => { const c = [...document.querySelectorAll('.kcard,[data-i],[data-act],[data-k],.kac,.act-card,.kopt')].filter(e => /Nghỉ ngơi một lát/.test(e.innerText || '')).sort((a, b) => a.innerText.length - b.innerText.length)[0]; if (!c) return null; const r = c.getBoundingClientRect(); const x = r.left + r.width * 0.6, y = r.top + r.height * 0.3; const t = document.elementFromPoint(x, y); return { x, y, cls: c.className, hit: !!t && c.contains(t), tcls: t && t.className } });
  console.log('card', JSON.stringify(pt));
  for (let i = 0; i < 6; i++) { const q = await g.evaluate(() => { const c = [...document.querySelectorAll('.cards .kcard')].filter(e => !e.disabled && e.getClientRects().length)[0]; if (!c) return null; c.scrollIntoView({ block: 'center' }); const r = c.getBoundingClientRect(); const x = r.left + r.width * 0.6, y = r.top + r.height * 0.3; const t = document.elementFromPoint(x, y); return { x, y, hit: !!t && c.contains(t), tx: c.innerText.replace(/\s+/g, ' ').slice(0, 40) } });
    console.log('card', i, JSON.stringify(q)); if (!q || !q.hit) { await new Promise(r => setTimeout(r, 2000)); continue }
    await g.mouse.click(q.x, q.y); await new Promise(r => setTimeout(r, 1500)); await g.mouse.click(q.x, q.y); await new Promise(r => setTimeout(r, 3500));
    for (let k = 0; k < 4; k++) { const ok = await tapTxt(g, 'ipad', '^(Tiếp ▸|Tiếp|Đã rõ|Ngủ|Lui)$'); if (!ok) break; await new Promise(r => setTimeout(r, 2000)) }
    console.log('  st', JSON.stringify(await st(g))) }
  await g.screenshot({ path: SH + '/P-guest-spent.png' });
  if (pt) { await g.mouse.click(pt.x, pt.y); await new Promise(r => setTimeout(r, 2500)); console.log('after1', JSON.stringify(await st(g))); await g.screenshot({ path: SH + '/P-guest-after1.png' });
    await g.mouse.click(pt.x, pt.y); await new Promise(r => setTimeout(r, 3500)); console.log('after2', JSON.stringify(await st(g))); await g.screenshot({ path: SH + '/P-guest-after2.png' }) }
  await new Promise(r => setTimeout(r, 8000)); console.log('end guest', JSON.stringify(await st(g))); console.log('end host', JSON.stringify(await st(S.host.p))); await g.screenshot({ path: SH + '/P-guest-end.png' }); await S.host.p.screenshot({ path: SH + '/P-host-end.png' });
  for (const w in S) await S[w].c.close() })();
