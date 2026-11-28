#!/usr/bin/env node
/* rt-bare-unit.js — unit test of realtap.BARE_CHECK (FIXER #11 JOB 11, s15b «area tap blocked» ×3).
   A bare-area tap must never land on a button. Cases, Fold (touch 755x1000) + iPad (mouse 1180x820):
     A bare scene point → true · B a button on top → false · C a LEAVING layer (opacity transition running) over a button → 'covered' (skipped)
     D a STEADY backdrop over a button → true (a person's backdrop tap) · E the old top-only check on C: true, the layer leaves before the touch,
     the button takes it → the guard cancels it (blocked 1) — what the new check avoids.
     F a LIVE emotion seal (img.kemo[role=button] with a running sway, like jemoseal kemo-live) 30 px from the point → 'covered' (s15b ×2)
     H a LOOPING ambient pan (the kmeg scene backdrop, infinite animation) over a button → true (a person taps the scene)
     I/J the JOB 17 skip tap: a point ON the named layer is taken even over a button (the layer is on top) · a point off that layer is refused
     G an option card mounting under the point 60 ms after the check began → not bare (s15b first day «… Rất vững»).
   usage: node dev/test/rt-bare-unit.js   (exit 1 on any FAIL) */
'use strict';
const { chromium } = require('playwright');
const RT = require('./realtap.js');
const SEL = 'button,[role=button],a,input,select,textarea,[data-tab],.kcard[data-i],#rtoast,.kkem,.kalog';
const HTML = `<!doctype html><meta name=viewport content="width=device-width"><style>body{margin:0;background:#f4e8d0}
#b{position:absolute;left:100px;top:100px;width:200px;height:120px}#cov{position:absolute;left:0;top:0;width:400px;height:400px;background:rgba(40,20,10,.5)}
#cov.go{transition:opacity 20s linear;opacity:.2}@keyframes sw{0%{transform:translateX(0)}50%{transform:translateX(40px)}100%{transform:translateX(0)}}
@keyframes pan{0%{background-position:0 0}100%{background-position:50px 0}}#cov.pan{animation:pan 9s linear infinite}
#seal{position:absolute;left:500px;top:500px;width:60px;height:60px;background:#c84;animation:sw 2s ease-in-out infinite}</style><button id=b onclick="window.__hit=(window.__hit||0)+1">Giao thiệp</button>`;
const OLD = ([x, y, sel]) => { const t = document.elementFromPoint(x, y); return !!t && !t.closest(sel) }; /* the check before JOB 11 */
(async () => {
  const br = await chromium.launch(); let fails = 0; const rows = [];
  for (const dev of ['fold', 'ipad']) {
    const ctx = await br.newContext(dev === 'fold' ? { viewport: { width: 755, height: 1000 }, hasTouch: true, isMobile: true } : { viewport: { width: 1180, height: 820 } });
    const p = await ctx.newPage(); const tap = (x, y) => dev === 'ipad' ? p.mouse.click(x, y) : p.touchscreen.tap(x, y);
    const set = async cov => { await p.setContent(HTML); await p.evaluate(() => { window.__rtG = 0; window.__rtBareN = 0; window.__hit = 0 }); /* setContent = document.open: window listeners go, the flag stays */ if (cov) await p.evaluate(c => { const d = document.createElement('div'); d.id = 'cov'; document.body.appendChild(d); if (c === 'leave') { d.getBoundingClientRect(); d.className = 'go' } }, cov) };
    const ck = (x, y) => RT.bareCheck(p, x, y, SEL);
    const cases = [];
    await set(null); cases.push(['A bare point', await ck(600, 600), true]);
    cases.push(['B button on top', await ck(200, 160), false]);
    await set('leave'); cases.push(['C leaving layer over a button', await ck(200, 160), 'covered']);
    await set('steady'); cases.push(['D steady backdrop over a button', await ck(200, 160), true]);
    /* E: the old check on the leaving layer, then the layer is gone before the touch (the s15b / s13 race) */
    await set('leave'); await ck(600, 600); /* installs the guard (bare point, no tap) */
    const old = await p.evaluate(OLD, [200, 160, SEL]); await p.evaluate(() => { window.__rtBare = Date.now() + 700; document.getElementById('cov').remove() }); await tap(200, 160); await p.waitForTimeout(100);
    const e = await p.evaluate(() => ({ blocked: window.__rtBareN || 0, hit: window.__hit || 0, why: window.__rtBareWhy }));
    cases.push(['E old check on C → tap', 'old ' + old + ', blocked ' + (e.blocked > 0 ? 'yes' : 'no') + ', button hit ' + e.hit, 'old true, blocked yes, button hit 0']);
    await set('steady'); await p.evaluate(() => { document.getElementById('cov').className = 'pan' }); cases.push(['H looping scene pan over a button', await ck(200, 160), true]);
    await set('leave'); cases.push(['I tap ON a skip layer (own) over a button, layer leaving', await RT.bareCheck(p, 200, 160, SEL, '#cov'), true]);
    cases.push(['J own layer given but the point is elsewhere', await RT.bareCheck(p, 600, 600, SEL, '#cov'), 'covered']);
    await set(null); await p.evaluate(() => { const i = document.createElement('div'); i.id = 'seal'; i.className = 'kemo kemo-binh kemo-live'; i.setAttribute('role', 'button'); document.body.appendChild(i) });
    cases.push(['F live seal 30 px from the point', await ck(590, 530), 'covered']);
    await set(null); const g = ck(600, 600); await p.evaluate(() => setTimeout(() => { const c = document.createElement('button'); c.textContent = '… Rất vững'; c.style.cssText = 'position:absolute;left:550px;top:550px;width:120px;height:100px'; document.body.appendChild(c) }, 60));
    cases.push(['G option card mounts under the point', await g === true ? true : 'not bare', 'not bare']);
    for (const [n, got, want] of cases) { const ok = got === want || (want === 'covered' && /^covered/.test(got)); if (!ok) fails++; rows.push(dev + ' | ' + n + ' | ' + JSON.stringify(got) + ' | ' + (ok ? 'ok' : 'FAIL want ' + JSON.stringify(want))) }
    await ctx.close() }
  await br.close(); console.log(rows.join('\n')); console.log(fails ? 'RT-BARE-UNIT FAIL ' + fails : 'RT-BARE-UNIT OK ' + rows.length + '/' + rows.length); process.exit(fails ? 1 : 0)
})();
