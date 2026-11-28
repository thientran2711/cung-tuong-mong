/* interactive real-tap driver (scratch, not committed). node drv.js <dev fold|ipad> <dir> [origin]
   commands appended to <dir>/cmd-<dev>.txt, one per line:
     tap <regex>        real tap (realtap.js) on the first visible button/card whose text matches
     tapn <n> <regex>   n-th match
     dump               list visible clickable labels + top dialog title
     shot <name>        screenshot <dir>/<dev>-<name>.png
     read <js>          page.evaluate READ-ONLY expression, prints JSON
     wheel <dy>         wheel scroll at viewport middle
   output appended to <dir>/out-<dev>.txt */
'use strict';
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const http = require('http');
const RT = require('./realtap.js');
const [, , DEV, DIR, ORIGIN] = process.argv; const ROOT = '/home/user/wt/ng2';
const CMD = path.join(DIR, 'cmd-' + DEV + '.txt'), OUT = path.join(DIR, 'out-' + DEV + '.txt');
const VP = DEV === 'ipad' ? { width: 1180, height: 820 } : { width: 755, height: 1000 };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.webmanifest': 'application/json' };
const srv = http.createServer((q, r) => { let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (f.endsWith('/')) f += 'index.html'; fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d) }) });
const out = s => fs.appendFileSync(OUT, s + '\n');
const SEL = 'button,[role=button],.tab,a[href],.opt,.kopt,.act-card,.pc,.card,[data-p],[onclick]';
(async () => {
  await new Promise(r => srv.listen(0, r)); const url = 'http://127.0.0.1:' + srv.address().port + '/index.html';
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: VP, deviceScaleFactor: 2, hasTouch: DEV !== 'ipad' || !!process.env.IPT, isMobile: DEV !== 'ipad' || !!process.env.IPT, serviceWorkers: 'block' });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => { errs.push(e.message); out('PAGEERROR ' + e.message.slice(0, 200)) });
  await p.goto(url, { waitUntil: 'load' }); await p.waitForFunction(() => typeof start === 'function', null, { timeout: 0 });
  if (ORIGIN) await p.evaluate(o => { window.__forceOrigin = o }, ORIGIN);
  const rt = RT.make(p, { dev: DEV, shots: DIR, touch: DEV !== 'ipad' || !!process.env.IPT, ignoreCover: /kpop|kxcatch|ktut|kne/, log: d => out('  rt ' + JSON.stringify(d).slice(0, 300)) });
  out('READY ' + url); let done = 0;
  const find = async (re, n) => { const hs = await p.$$(SEL); const m = []; for (const h of hs) { const ok = await h.evaluate((e, re) => { if (!e.offsetParent && getComputedStyle(e).position !== 'fixed') return null; const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return null; const t = (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim(); return new RegExp(re, 'i').test(t) ? t.slice(0, 80) : null }, re); if (ok) m.push([h, ok]) } return m[n || 0] };
  for (;;) {
    let lines = []; try { lines = fs.readFileSync(CMD, 'utf8').split('\n').filter(Boolean) } catch (e) {}
    for (; done < lines.length; done++) {
      const L = lines[done]; out('> ' + L); const sp = L.indexOf(' '); const c = sp < 0 ? L : L.slice(0, sp), a = sp < 0 ? '' : L.slice(sp + 1);
      try {
        if (c === 'tap' || c === 'tapn') { let n = 0, re = a; if (c === 'tapn') { n = +a.split(' ')[0]; re = a.slice(a.indexOf(' ') + 1) } const f = await find(re, n); if (!f) out('  NO MATCH ' + re); else { const ok = await rt.tap(f[0], { screen: 'drv', label: f[1] }); out('  tapped=' + ok + ' «' + f[1] + '»'); await p.waitForTimeout(1500) } }
        else if (c === 'dump') { const d = await p.evaluate(SEL => { const v = [...document.querySelectorAll(SEL)].filter(e => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight && getComputedStyle(e).visibility !== 'hidden' }).map(e => (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50)).filter(Boolean); const dl = [...document.querySelectorAll('.dlg,.kdlg,[role=dialog]')].filter(e => e.offsetParent).map(e => (e.querySelector('h2,h3,.t,.kt') || e).textContent.trim().slice(0, 60)); return { dl, v: [...new Set(v)].slice(0, 90) } }, SEL); out('  DLG ' + JSON.stringify(d.dl)); out('  BTN ' + d.v.join(' ¦ ')) }
        else if (c === 'shot') { await p.screenshot({ path: path.join(DIR, DEV + '-' + a + '.png') }); out('  shot ' + a) }
        else if (c === 'read') { const r = await p.evaluate(a); out('  = ' + JSON.stringify(r).slice(0, 3000)) }
        else if (c === 'wheel') { await p.mouse.move(VP.width / 2, VP.height / 2); await p.mouse.wheel(0, +a); await p.waitForTimeout(600); out('  wheeled') }
        else if (c === 'wait') { await p.waitForTimeout(+a) }
        else if (c === 'quit') { out('STATS ' + JSON.stringify(rt.stats()) + ' errs ' + errs.length); await b.close(); srv.close(); process.exit(0) }
      } catch (e) { out('  ERR ' + e.message.slice(0, 200)) }
      out('  ok');
    }
    await new Promise(r => setTimeout(r, 400));
  }
})().catch(e => { out('FATAL ' + e.message); process.exit(1) });
