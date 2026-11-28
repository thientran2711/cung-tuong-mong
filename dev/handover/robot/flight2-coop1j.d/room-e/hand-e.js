// hand check (real taps) of both seats of room E8EH: list every hittable button / card / kscn / result card on each seat
const { chromium } = require('playwright'); const fs = require('fs');
const OUT = '/home/user/wt/out-coop1j-e', SH = '/home/user/wt/coop1j-hand', U = 'http://127.0.0.1:8813/';
const TAG = process.argv[3] || 'h';
const steps = JSON.parse(process.argv[2] || '[]'); // [[seat, label-regex], ...]
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const dump = p => p.evaluate(() => { const W = innerWidth, H = innerHeight, vis = e => { const r = e.getBoundingClientRect(); return r.width > 3 && r.height > 3 && r.bottom > 0 && r.top < H && r.right > 0 && r.left < W };
  const hits = [...document.querySelectorAll('button,[role=button],.kcard[data-i],[data-tab],a')].filter(vis).map(b => { const r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, t = document.elementFromPoint(x, y); return { t: (b.innerText || b.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 50), hit: !!t && (t === b || b.contains(t)), off: !!b.disabled } }).filter(x => x.t);
  let S1 = null; try { S1 = { khac: (typeof used!=='undefined'?used:null), sprite: (document.querySelector('#next')||{}).textContent, name: S.name, dead: !!S.dead, year: S.year, turn: S.turn, tuan: S.tuan, buoi: S.buoi, kiep: S.kiep, fate: S.fate || '' } } catch (e) {}
  let cw = null; try { cw = { on: CW.on, seat: CW.seat, inLife: CW.inLife, sent: CW.sent, pend: CW.pend, wk: COOP.state.week, ended: COOP.state.ended } } catch (e) {}
  return { body: document.body.className, kscn: document.querySelectorAll('.kscn').length, rtoast: (document.querySelector('#rtoast.on') || {}).className || '', modal: (document.querySelector('#modal:not([hidden]) h2,#modal:not([hidden]) h3') || {}).innerText || '', fz: (document.querySelector('#coopfz') || {}).innerText || '', S: S1, CW: cw, btn: hits.filter(x => x.hit && !x.off).map(x => x.t), off: hits.filter(x => x.off).map(x => x.t) } });
(async () => {
  const seats = {}; for (const [who, dev] of [['host', 'fold'], ['guest', 'ipad']]) { const c = await chromium.launchPersistentContext(OUT + '/profile-coop-flight2-coop1j-e-' + dev, { viewport: VP[dev], hasTouch: dev !== 'ipad', isMobile: dev !== 'ipad', serviceWorkers: 'block' }); const p = c.pages()[0] || await c.newPage(); await p.goto(U, { waitUntil: 'load' }); seats[who] = { c, p, dev } }
  await new Promise(r => setTimeout(r, 8000));
  const show = async (tag) => { for (const w of ['host', 'guest']) { const d = await dump(seats[w].p); await seats[w].p.screenshot({ path: SH + '/' + tag + '-' + w + '.png' }); console.log('== ' + tag + ' ' + w + ' ' + JSON.stringify(d)) } };
  await show(TAG + '0');
  let i = 0; for (const [w, re] of steps) { i++; const { p, dev } = seats[w]; const R = new RegExp(re, 'i');
    const pt = await p.evaluate(src => { const R = new RegExp(src, 'i'); for (const b of document.querySelectorAll('button,[role=button],.kcard[data-i],[data-tab]')) { const tx = (b.innerText || '').replace(/\s+/g, ' ').trim(); if (!R.test(tx) || b.disabled) continue; const r = b.getBoundingClientRect(); if (r.width < 3) continue; const x = r.left + r.width / 2, y = r.top + r.height / 2, t = document.elementFromPoint(x, y); if (t && (t === b || b.contains(t))) return { x, y, tx } } return null }, re);
    console.log('STEP ' + i + ' ' + w + ' /' + re + '/ → ' + (pt ? 'tap «' + pt.tx + '»' : 'NOT FOUND'));
    if (pt) { if (dev === 'ipad') await p.mouse.click(pt.x, pt.y); else await p.touchscreen.tap(pt.x, pt.y) }
    await new Promise(r => setTimeout(r, 6000)); await show(TAG + i) }
  await new Promise(r => setTimeout(r, 15000)); await show(TAG + 'end');
  for (const w of ['host', 'guest']) await seats[w].c.close() })();
