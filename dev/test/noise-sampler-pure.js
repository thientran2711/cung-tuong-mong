#!/usr/bin/env node
/* noise-sampler-pure.js — the noise sampler (dev/measure/noise-sampler.js) must NOT change the life it measures (BIG #9 FAIL 1, 26/11).
   usage: node dev/test/noise-sampler-pure.js [index.html|url] [secs=6] [seed=7]
   1 a seeded life is started and played 2 buổi; then the news state that the OLD sampler broke is planted: one EXPIRED Tin báo item in S.tb.K
     (k1 < now, not ended: knEnd would rewrite its line through kLine → Math.random + S.vmem) and one DUE carried item in S.tb.W (knCarryTick
     would deliver it into S.tb.K and fire KN.cb)
   2 snapshot: JSON of S, the localStorage save strings, a Math.random call counter, a KN.cb listener counter
   3 the sampler (the same code the robot lanes inject) ticks secs×20 times (= <secs> s at 50 ms) inside ONE synchronous evaluate (its interval
     captured), so no game timer runs between the snapshots: a change can only be the sampler's
   4 PASS = S byte-identical, localStorage identical, Math.random never called, KN.cb never fired, and the sampler DID read the planted news
     (both planted lines reached its text stream — the read is live, not skipped)
   5 control: ONE tinBaoList() call on the same planted state DOES change S (the probe is sensitive: the old sampler would FAIL here)
   6 no page errors. Exit 1 on any FAIL. */
'use strict';
const { chromium } = require('playwright'); const path = require('path');
const A = process.argv.slice(2); const KV = Object.fromEntries(A.filter(a => /^[a-z]+=/.test(a)).map(a => a.split('=')));
const U0 = A.find(a => !/^[a-z]+=/.test(a)) || path.resolve(__dirname, '..', '..', 'index.html');
const URL = /^(https?|file):/.test(U0) ? U0 : 'file://' + path.resolve(U0); const SECS = +(KV.secs || 6), SEED = +(KV.seed || 7);
const SAMPLER = require(process.env.NZP_SAMPLER ? path.resolve(process.env.NZP_SAMPLER) : '../measure/noise-sampler.js'); /* NZP_SAMPLER=<file>: test another sampler (e.g. the old one) */
const res = []; const ok = (c, m, x) => { res.push(!!c); console.log((c ? 'ok  ' : 'FAIL') + ' ' + m + (x !== undefined ? ' ' + JSON.stringify(x) : '')) };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 755, height: 1000 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(s => { let x = s; Math.random = () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648 } }, SEED);
  await p.goto(URL, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(2500);
  const st = await p.evaluate(SEED => {
    let x = SEED; Math.random = () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648 };
    localStorage.clear(); SLOT = 4; document.getElementById('title').hidden = true;
    for (let i = 0; i < 20; i++) { window.__nlInner = 1; start(); window.__nlInner = 0; if (!isSrv()) break }
    window.__bot = 1; Q.length = 0; const step = () => { Q.length = 0; S.mg = 0; try { nextBuoi() } catch (e) {} Q.length = 0; try { placeWhere(); agFlush() } catch (e) {} };
    step(); step(); Q.length = 0;
    if (typeof knTb !== 'function' || typeof tinBaoList !== 'function') return { err: 'no jagknow in this build' };
    used = J95.KH - 1; const T = knTb(); const now = agKh();
    T.K['nzp:old'] = { id: 'nzp:old', k: 'deed', place: 'vuon', b: S.buoi || 0, k0: 0, k1: now - 1, who: [], line: 'Phi tần Thử đang dạo vườn', by: 'here', seen: 0, ended: 0 };
    T.W = (T.W || []).concat([{ id: 'nzp:w', k: 'deed', place: 'vuon', b: S.buoi || 0, k0: 0, k1: now, who: [], line: 'Phi tần Thử đang hái hoa', by: 'here', seen: 0, ended: 0, due: 0 }]);
    try { save() } catch (e) {}
    const r0 = Math.random; window.__nzpR = 0; Math.random = function () { window.__nzpR++; return r0.apply(this, arguments) };
    window.__nzpCb = 0; KN.cb.push(() => { window.__nzpCb++ });
    window.__nzpTxt = []; window.__nzPush = s => { try { const o = JSON.parse(s); window.__nzpTxt.push(...(o.txt || []).map(t => t[1])) } catch (e) {} };
    const ls = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); ls[k] = localStorage.getItem(k) }
    window.__nzpS0 = JSON.stringify(S); window.__nzpL0 = JSON.stringify(ls);
    return { buoi: S.buoi, day: wk(), K: Object.keys(T.K).length, W: T.W.length, len: window.__nzpS0.length };
  }, SEED);
  if (st.err) { ok(false, '1 setup', st); await b.close(); process.exit(1) }
  ok(st.K >= 1 && st.W >= 1, '1 seeded life, 2 buổi played, expired K + due W news planted', st);
  /* the robot lanes inject the sampler as an init script; here the same function is installed on the booted page with its interval CAPTURED
     (not scheduled), then ticked N times inside ONE synchronous evaluate: no game timer can run between the two snapshots, so any change is
     the sampler's own (the idle page's own timers do write S: __feelMig, autosave, their own Math.random — not the sampler's business) */
  const N = Math.round(SECS * 1000 / 50);
  const r = await p.evaluate(([src, N]) => {
    const rI = window.__nzpR; /* the install counts too (the old sampler drew its id from Math.random) */
    const si = window.setInterval; let tickFn = null; window.setInterval = (f, ms) => { if (!tickFn) tickFn = f; return 0 };
    try { (0, eval)('(' + src + ')')({ sampleMs: 50, flushMs: 1000 }) } finally { window.setInterval = si }
    const snap = () => { const ls = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); ls[k] = localStorage.getItem(k) } return [JSON.stringify(S), JSON.stringify(ls)] };
    /* (re)plant inside this same synchronous run: between two evaluates the game's own timers may already have ended / delivered them */
    used = J95.KH - 1; const T = S.tb, now = agKh(); delete T.K['nzp:old']; T.W = (T.W || []).filter(x => !/^nzp:/.test(x.id));
    T.K['nzp:old'] = { id: 'nzp:old', k: 'deed', place: 'vuon', b: S.buoi || 0, k0: 0, k1: now - 1, who: [], line: 'Phi tần Thử đang dạo vườn', by: 'here', seen: 0, ended: 0 };
    T.W.push({ id: 'nzp:w', k: 'deed', place: 'vuon', b: S.buoi || 0, k0: 0, k1: now, who: [], line: 'Phi tần Thử đang hái hoa', by: 'here', seen: 0, ended: 0, due: 0 });
    const [S0, L0] = snap(); const r0 = rI, c0 = window.__nzpCb; const D0 = Date.now; let fake = D0.call(Date);
    Date.now = () => (fake += 50); /* each tick 50 ms later: the sampler's flush clock runs (a flush every 1 s = every 20 ticks) */
    try { for (let i = 0; i < N; i++) tickFn() } finally { Date.now = D0 }
    const [S1, L1] = snap(); const o = { ticks: N, captured: !!tickFn, same: S1 === S0, lsSame: L1 === L0, rnd: window.__nzpR - r0, cb: window.__nzpCb - c0,
      sawOld: window.__nzpTxt.some(t => /đang dạo vườn/.test(t)), on: !!window.__nzOn, txt: window.__nzpTxt.length };
    if (!o.same) { let i = 0; while (i < S1.length && S1[i] === S0[i]) i++; o.diffAt = S0.slice(Math.max(0, i - 60), i + 60) + ' → ' + S1.slice(Math.max(0, i - 60), i + 60) }
    /* 5 control, same synchronous run: the game call the old sampler made */
    const r1 = window.__nzpR, c1 = window.__nzpCb; try { tinBaoList() } catch (e) {} o.ctlChanged = JSON.stringify(S) !== S1; o.ctlRnd = window.__nzpR - r1; o.ctlCb = window.__nzpCb - c1;
    return o }, [SAMPLER.toString(), N]);
  ok(r.on && r.captured && r.txt > 0, `3 the sampler ran ${r.ticks} ticks on the page`, { txt: r.txt });
  ok(r.sawOld, '4a it read the planted expired item straight from S.tb.K');
  ok(r.same, `4b S byte-identical after ${r.ticks} sampler ticks (= ${SECS} s at 50 ms)`, r.diffAt);
  ok(r.lsSame, '4c localStorage save identical');
  ok(r.rnd === 0, '4d Math.random never called by the sampler (install + ticks)', { calls: r.rnd });
  ok(r.cb === 0, '4e no carried news delivered (KN.cb never fired)', { cb: r.cb });
  ok(r.ctlChanged && (r.ctlRnd > 0 || r.ctlCb > 0), '5 control: one tinBaoList() on the same state DOES change S (the probe is sensitive)', { changed: r.ctlChanged, rnd: r.ctlRnd, cb: r.ctlCb });
  ok(!errs.length, '6 no page errors', errs.slice(0, 3));
  await b.close(); const n = res.filter(x => !x).length; console.log(n ? `NOISE-SAMPLER-PURE: ${n} FAIL` : `NOISE-SAMPLER-PURE: ALL ${res.length} PASS`); process.exit(n ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) });
