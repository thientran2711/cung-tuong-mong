/* KIT-GIFT-OUT (KK64, K-GIFT-OUT; KIT-KRI-XL leftovers 2 + 3, laws 3 + 6 + 11): what really became of a given piece decides the result.
   (2) the ring gift result seal (jkring-item kriGiftOpen act) read every log line written in the act's tick: a world line of someone else
       («… phát hiện …», «… không thành …») sealed a kept gift BẠI and showed up under Ghi chú. Now: seal = giveTo.out / plantItem.out, notes = lines naming the piece.
   (3) «Biếu quà làm lành» (jts tsGiftPiece) «kept» test was «a.inv.includes(e)»; jrcv «back» gives the giver a COPY, so a gift handed back still eased
       her heart (free peace). Now kept = giveTo.out back / refused.
   Cases (Fold 755x1000 + iPad 1180x820, the y05 save):
     A ring «Tặng quà» hand to hand to a rival, she takes it, a foreign log line («… phát hiện … không thành») written in the same tick → seal THÀNH (ok true)
     B ring «Tặng quà», she hands it back (rcv «back») → seal BẠI (ok false)
     C tsGiftPiece, she hands it back → kept true, her oán NOT eased by the rite (the «back» answer's own small liking change stays), the piece is back in the chest
     D tsGiftPiece, she takes it → not kept, oán eased
   usage: node dev/test/kit-gift-out.js [--root <wt>] [--save y05.json] [--dev fold,ipad]   (exit 1 on FAIL). Serves the built index.html (build_site.sh first).
   page.evaluate = setup (rcvPick stubbed to the asked answer, jdis refusal off) + reading the result; the act runs through the game's own code. */
'use strict';
try { require('./lib/bigpage') } catch (e) { }/* HARNESS-BIGPAGE (review/kk63) when present */ const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const ROOT = path.resolve(arg('root', path.resolve(__dirname, '..', '..')));
const DEVS = String(arg('dev', 'fold,ipad')).split(',');
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };
const SAVE = path.resolve(arg('save', path.join(ROOT, 'dev/handover/fixtures/save-growth/y05-ncBtuc-035.json')));
if (!fs.existsSync(SAVE)) { console.log('no save fixture: ' + SAVE); process.exit(2) }
const SAVETXT = fs.readFileSync(SAVE, 'utf8');
async function home(p) {
  await p.evaluate(t => {
    try { localStorage.clear() } catch (e) { } try { REC.tour = 'done'; REC.asked = 1; saveRec() } catch (e) { }
    localStorage.setItem(SK(3), t); SLOT = 3; const d = loadSlot(3); try { kmReset && kmReset() } catch (e) { } quiet = true; d.tab = 'act'; deser(d); quiet = false;
    document.getElementById('title').hidden = true; try { deal() } catch (e) { } if (S.mg) S.mg = null; try { S.tutTour = 1; coachOff && coachOff() } catch (e) { }
    Q.length = 0; document.getElementById('modal').hidden = true; render()
  }, SAVETXT);
  await p.waitForTimeout(2000);
  await p.evaluate(() => { document.querySelectorAll('.kfgain,#kload,#dawn,#kdaytc,.kmov,#rtoast,.kne').forEach(e => e.remove()); Q.length = 0; try { closeModal() } catch (e) { } document.getElementById('modal').hidden = true });
}
const FOREIGN = 'Ở Đông cung, người của Lệ phi phát hiện chuyện cũ không thành.';
/* ring act: open «Tặng quà» to a rival with the ring face, act on the first giftable piece, return the ring result */
const RING = async (p, ans, foreign) => p.evaluate(async ([ans, foreign]) => {
  window.__bot = 0; window.__kriOff = 0; try { BAL.dis.refuse = 0 } catch (e) { }
  const r0 = window.rcvPick; window.rcvPick = (t, f, O) => O.find(x => x.id === ans) || O[0];
  const tg0 = window.together; window.together = () => true;/* hand to hand (same place): giveTo runs now — a servant errand (ptSend) is a pending KẾT QUẢ, not this case */
  const g0 = giveTo; if (foreign) giveTo = function () { const o = g0.apply(this, arguments); log(foreign); return o };
  try {
    const V = rivals.filter(x => x.alive !== false && !x.out && !x.coop)[0]; const d = mkP('giftpick', { v: V.id });
    pushModal({ t: d.t0 || 'Tặng quà', h: d.t, opts: d.o, pid: d.pid, pp: d.pp, who: d.who }); showModal();
    await new Promise(r => setTimeout(r, 900)); const R = kitRingItem.cur; if (!R) return { err: 'no ring (kriOn false?)' };
    const items = R.o.items().filter(x => !x.lock && !(x.ref && x.ref.e && x.ref.e.wk));/* a bought / found piece (a handmade work has no hand-back road) */ if (!items.length) return { err: 'no giftable piece' };
    const it = items[0]; const act = R.o.acts(it)[0]; const aw0 = kriAway(), pr = kriPromise(R); const res = kriPending(act.fn(), aw0, pr);/* as kriAct does */
    try { kitRingItem.close(true) } catch (e) { }
    return { ok: res && typeof res === 'object' ? res.ok : res, notes: ((res && res.rows || []).find(x => x.k === 'note') || {}).items || [], title: res && res.title, out: giveTo.out }
  } finally { window.rcvPick = r0; giveTo = g0; window.together = tg0; Q.length = 0; try { closeModal() } catch (e) { } document.getElementById('modal').hidden = true }
}, [ans, foreign]);
const TSG = async (p, ans) => p.evaluate(ans => {
  try { BAL.dis.refuse = 0 } catch (e) { } const r0 = window.rcvPick; window.rcvPick = (t, f, O) => O.find(x => x.id === ans) || O[0];
  try {
    const v = rivals.filter(x => x.alive !== false && !x.out && !x.coop).sort((a, b) => oan(b, S) - oan(a, S))[0];
    const A = tsGiftPieces(S, v, 'it').filter(o => o.w.ok); if (!A.length) return { err: 'no piece worth the rite' };
    const e = S.inv[A[0].i], k = e.k, n0 = S.inv.filter(x => x.k === k).length, o0 = oan(v, S);
    const R = tsGiftPiece(S, v, A[0].i);
    return { kept: !!(R && R.kept), lost: !!(R && R.lost), oan0: o0, oan1: oan(v, S), eased: o0 - oan(v, S) >= BAL.tsGift.oan, back: S.inv.filter(x => x.k === k).length === n0 }
  } finally { window.rcvPick = r0 }
}, ans);
(async () => {
  const b = await chromium.launch(); const rows = []; let fails = 0;
  for (const dev of DEVS) {
    const ctx = await b.newContext({ viewport: VP[dev], serviceWorkers: 'block', hasTouch: true });
    await ctx.route('http://localhost:8817/**', r => { const u = new URL(r.request().url()); const f = path.join(ROOT, decodeURIComponent(u.pathname)); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ status: 200, contentType: f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.js') ? 'application/javascript' : 'application/octet-stream', body: fs.readFileSync(f) }) });
    const p = await ctx.newPage(); p.setDefaultTimeout(240000); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 160)));
    await p.goto('http://localhost:8817/index.html', { waitUntil: 'domcontentloaded' });
    await p.waitForFunction(() => typeof start === 'function' && typeof deser === 'function' && typeof kitRingItem === 'object', null, { timeout: 240000 }); await p.waitForTimeout(1500);
    const add = (name, res, pass) => { const v = res.err ? 'SKIP' : pass ? 'ok' : 'FAIL'; if (v === 'FAIL') fails++; const r = Object.assign({ dev, name, verdict: v }, res); rows.push(r); console.log(JSON.stringify(r)) };
    await home(p); let r = await RING(p, 'take', FOREIGN); add('A ring take + foreign log', r, r.ok === true && !r.notes.some(x => x.includes('phát hiện chuyện cũ')));/* the choice log folds every line of the tick into the act's own line («Tặng quà: X — …»); K-GIFT-NOTE (KK65): Ghi chú keeps only the sentences naming the piece / receiver, so the foreign sentence is gone from the note too */
    await home(p); r = await RING(p, 'back', null); add('B ring handed back', r, r.ok === false);
    await home(p); r = await TSG(p, 'back'); add('C tsGiftPiece handed back', r, r.kept && !r.eased && r.back);
    await home(p); r = await TSG(p, 'take'); add('D tsGiftPiece taken', r, !r.kept && !r.lost && r.eased);
    if (errs.length) console.log(dev, 'pageerrors', JSON.stringify(errs.slice(0, 5)));
    await ctx.close();
  }
  console.log(`kit-gift-out: ${rows.length} cases, ${fails} FAIL`); await b.close(); process.exit(fails ? 1 : 0);
})();
