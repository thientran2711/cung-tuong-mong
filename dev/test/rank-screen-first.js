/* RANK-SCREEN-FIRST (MAIN 179 rule, DLG-DEAD-BTN-2; law 11 whole family): a reward / notice pop-up never covers a life-end card or a
   rank-change / «Lãnh cung» screen — it queues after it.
   Foreman F s2h (FLIGHT2-S2H Fold seed 2026112560, LIVE 772bee4f): month roll → HUD already «Lãnh cung» behind the «Bổng lộc tháng chín» chest
   (#kmrew), the «Lãnh cung» card only after it. Rank-change screens: the kit rank scenes kitGloom («Vào lãnh cung» / «Bị giáng …») and kitEdict
   (thăng phẩm), the rank cards «Lãnh cung», «Rời lãnh cung», «Bị giáng phẩm». The life end card is covered by dev/test/endcard-top.js (E98).
   Every case: a mid-life save at home (fixture y05), the producers fired by the game's own functions in ONE task (setup only, like a month roll
   or a choice), then a PLAYER taps through everything with REAL taps (dev/test/realtap.js: scene buttons, chest, card ✕ / options lift → ✓)
   while an in-page sampler (read-only, every 100 ms) logs the top layer. FAIL when a non-rank pop-up scene is visible (a) while a rank card is
   still in Q (shown or waiting) or (b) before the rank scene of that change has played; and, for a reward, when it never shows at all (dropped
   instead of queued). Stills: --out dir (Fold 755x1000 + iPad 1180x820) at the moment the rank screen is up and at the first pop-up after it.
   usage: node dev/test/rank-screen-first.js [--root wt] [--dev fold,ipad] [--only a,b] [--save y05.json] [--out dir]   (exit 1 on any FAIL)
   Never presses a button with .click() / dispatchEvent: page.evaluate only fires the producers (setup) and READS the screen. */
'use strict';
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const RT = require('./realtap.js');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d };
const ROOT = path.resolve(arg('root', path.resolve(__dirname, '..', '..')));
const DEVS = String(arg('dev', 'fold,ipad')).split(',');
const ONLY = arg('only', '') ? String(arg('only')).split(',') : null;
const OUT = arg('out', '') ? path.resolve(arg('out')) : null; if (OUT) fs.mkdirSync(OUT, { recursive: true });
const SAVE = path.resolve(arg('save', path.join(ROOT, 'dev/handover/fixtures/save-growth/y05-ncBtuc-035.json')));
if (!fs.existsSync(SAVE)) { console.log('no save fixture: ' + SAVE + ' (git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json > y05.json)'); process.exit(2) }
const SAVETXT = fs.readFileSync(SAVE, 'utf8');
const VP = { fold: { width: 755, height: 1000 }, ipad: { width: 1180, height: 820 } };

/* rank states (setup) */
const PRE = {
  rank1: `S.out=0;S.rank=1;S.dead=false`,
  rank3: `S.out=0;S.rank=3`,
  cold: `S.out=1;S.rank=0;S.coldWk=-999;S.coldTurn=-999;S.coldPend=null`,
};
/* the rank change (the game's own code) */
const RANK = {
  monthroll: { pre: 'rank1', code: `S.forgetAt=0;S.turn=Math.max(S.turn,5);S.sung=-60;S.danh=Math.min(-60,BAL.danhG.forget);S.arts.thi=0;S.tuan=3;S.confined=0;const ev=monthTick();if(ev)log(ev)`, scene: 'km-gloom', card: 'Lãnh cung' },
  cold: { pre: 'rank1', code: `cold("Bị tố trước mặt Hoàng hậu")`, scene: 'km-gloom', card: 'Lãnh cung' },
  demote: { pre: 'rank3', code: `demote(S,"phạm lỗi trong lễ")`, scene: 'km-gloom', card: 'Bị giáng phẩm' },
  promote: { pre: 'rank3', code: `S.rank=4`, scene: 'km-edict', card: null },
  restore: { pre: 'cold', code: `restore(true,"Ân xá")`, scene: 'km-edict', card: 'Rời lãnh cung' },
};
/* pop-ups fired in the same task BEFORE the rank change (a pay-out / gift that came first) or AFTER it, while the rank screen is up */
const POP = {
  stipend: { code: `stipReveal([{k:Object.keys(IT)[0]}],{kind:'chest',title:'Bổng lộc tháng chín',sub:'Nội vụ phủ phát',bac:30})`, cls: 'km-reward', must: 1 },
  chest: { code: `kitReward({kind:'chest',title:'Rương bảo vật',from:'Hoàng thượng ban',items:[{n:'Ngọc bội'}]})`, cls: 'km-reward', must: 1 },
  gain: { code: `kitGain(Object.keys(IT)[1])`, cls: 'kfgain', must: 0 },
  learn: { code: `kitLearn({t:'Học được lối «Thêu chỉ vàng»'})`, cls: 'km-learn', must: 0 },
  bloom: { code: `kitBloom({title:'Có tin vui',sub:'Thái y bắt mạch'})`, cls: 'km-bloom', must: 0 },
  person: { code: `kitPersonReveal({who:liveRivals(true)[0],title:'Có người tới',sub:'x',line:'y'})`, cls: 'km-prev', must: 0 },
};
const CASES = [];
for (const r of Object.keys(RANK)) CASES.push({ name: `${r}+stipend:before`, rank: r, pop: r === 'monthroll' ? null : 'stipend', when: 'before' });
for (const p of Object.keys(POP)) if (p !== 'stipend') CASES.push({ name: `cold+${p}:before`, rank: 'cold', pop: p, when: 'before' });
for (const p of Object.keys(POP)) CASES.push({ name: `cold+${p}:after`, rank: 'cold', pop: p, when: 'after' });
CASES.push({ name: `demote+chest:after`, rank: 'demote', pop: 'chest', when: 'after' });
CASES.push({ name: `restore+chest:after`, rank: 'restore', pop: 'chest', when: 'after' });

async function home(p) {
  await p.evaluate(t => {
    try { localStorage.clear() } catch (e) { } try { REC.tour = 'done'; REC.asked = 1; saveRec() } catch (e) { }
    localStorage.setItem(SK(3), t); SLOT = 3; const d = loadSlot(3); try { kmReset && kmReset() } catch (e) { } quiet = true; d.tab = 'act'; deser(d); quiet = false;
    document.getElementById('title').hidden = true; try { deal() } catch (e) { } if (S.mg) S.mg = null; try { S.tutTour = 1; coachOff && coachOff() } catch (e) { }
    Q.length = 0; document.getElementById('modal').hidden = true; render()
  }, SAVETXT);
  await p.waitForTimeout(2500);
  for (let k = 0; k < 2; k++) {
    await p.evaluate(() => { try { kmReset() } catch (e) { } document.querySelectorAll('.kfgain,#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,.kmov,#rtoast,#kprevov').forEach(e => e.remove()); Q.length = 0; document.getElementById('modal').hidden = true; try { if (window.DQ) { DQ.want = null; DQ.park = null } } catch (e) { } });
    await p.waitForTimeout(700);
  }
}
/* read-only sampler: the top layer every 100 ms */
const SAMPLER = () => {
  window.__rs = []; let last = '';
  const RT = /^(Lãnh cung|Rời lãnh cung|Bị giáng phẩm)$/;
  const vis = e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > .05 };
  clearInterval(window.__rsT); window.__rsT = setInterval(() => {
    const sc = [...document.querySelectorAll('.kmov:not(.km-out),.kfgain')].filter(vis).map(e => (e.className.match(/\b(km-gloom|km-edict|km-reward|km-learn|km-bloom|km-prev|kfgain|km-tablet|kne-ov|km-inkov)\b/g) || ['kmov']).join('.'));
    const M = document.getElementById('modal'); const up = M && !M.hidden;
    const t = up ? ((M.querySelector('.kpt,.kph h3,.kph .kpt,h3,.kt') || {}).textContent || (Q[0] && Q[0].t) || '').replace(/\s+/g, ' ').trim().slice(0, 40) : '';
    const rq = (typeof Q !== 'undefined' ? Q : []).filter(m => m && RT.test(m.t || '')).map(m => m.t);
    const k = sc.join('|') + '#' + t + '#' + rq.join(',');
    if (k !== last) { last = k; window.__rs.push({ ms: Date.now(), sc, t, rq }) }
  }, 100);
};
/* one player step: real tap on whatever is on top (returns what it did) */
async function step(p, rt) {
  const top = await p.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > .05 };
    document.querySelectorAll('[data-rsw]').forEach(e => e.removeAttribute('data-rsw'));
    const ov = [...document.querySelectorAll('.kmov:not(.km-out),.kfgain')].filter(vis).pop();
    if (ov) {
      const b = [...ov.querySelectorAll('.kmend,[data-km-close],.kmtake,.krevok,.kne-take,button')].filter(vis).filter(b => !b.disabled)[0];
      if (b) { b.setAttribute('data-rsw', 'b'); return { k: 'scene-btn', lab: (b.textContent || '').trim().slice(0, 30) } }
      const c = ov.querySelector('.kmbox,.kmst') || ov; c.setAttribute('data-rsw', 'b'); return { k: 'scene-tap' }
    }
    const rtz = document.getElementById('rtoast'); /* jverdict RESULT-FIRST: the result card holds the next card behind «Tiếp ▸» */
    if (rtz && rtz.classList.contains('on') && vis(rtz)) { const b = [...rtz.querySelectorAll('button,[role=button]')].filter(vis)[0]; if (b) { b.setAttribute('data-rsw', 'b'); return { k: 'result-next', lab: (b.textContent || '').trim().slice(0, 20) } } }
    const M = document.getElementById('modal'); if (!M || M.hidden) return { k: 'idle' };
    const bs = [...M.querySelectorAll('button,[role=button]')].filter(vis).filter(b => !b.disabled);
    const lab = b => (b.getAttribute('aria-label') || b.textContent || '').replace(/\s+/g, ' ').trim();
    const x = bs.find(b => b.matches('.kit-x,.kx,.kpx,[data-kx],.mclose,#mclose,[aria-label="Đóng"]') || /^(✕|×)$/.test(lab(b)))
      || bs.find(b => /^(Bước vào|Tạ ơn|Đã rõ|Đã hiểu|Đóng|Tiếp|Tiếp ▸|Biết rồi|Xong|Nhận)\b/.test(lab(b)) && !b.matches('.opt,[data-m]'));
    if (x) { x.setAttribute('data-rsw', 'b'); return { k: 'card-close', lab: lab(x).slice(0, 30) } }
    const o = bs.find(b => b.matches('.opt,[data-m]')); if (o) { o.setAttribute('data-rsw', 'o'); return { k: 'card-opt', lab: lab(o).slice(0, 30) } }
    const any = bs[0]; if (any) { any.setAttribute('data-rsw', 'b'); return { k: 'card-btn', lab: lab(any).slice(0, 30) } }
    return { k: 'card-stuck' };
  });
  if (top.k === 'idle' || top.k === 'card-stuck') return top;
  if (top.k === 'card-opt') await rt.choose('[data-rsw="o"]', { screen: 'rank-first', label: top.lab });
  else await rt.tap('[data-rsw="b"]', { screen: 'rank-first', label: top.lab || top.k });
  return top;
}
function judge(C, log) {
  const R = RANK[C.rank], P = C.pop ? POP[C.pop] : null; const bad = []; let rankSceneSeen = false, cardGone = !R.card, popSeen = false, cardSeen = false;
  const firstRankScene = log.findIndex(e => e.sc.some(s => s.includes(R.scene)));
  for (let i = 0; i < log.length; i++) {
    const e = log[i]; if (e.sc.some(s => s.includes(R.scene))) rankSceneSeen = true; if (R.card && e.t === R.card) cardSeen = true;
    const pops = e.sc.filter(s => !/km-gloom|km-edict|km-inkov/.test(s));
    if (P && pops.some(s => s.includes(P.cls))) popSeen = true;
    if (pops.length) {
      if (e.rq.length) bad.push(`pop «${pops[0]}» over / before the rank card «${e.rq[0]}» (screen «${e.t || '-'}»)`);
      else if (!rankSceneSeen && firstRankScene > i) bad.push(`pop «${pops[0]}» before the rank scene «${R.scene}»`);
    }
  }
  if (firstRankScene < 0) bad.push(`rank scene «${R.scene}» never shown`);
  if (R.card && !cardSeen) bad.push(`rank card «${R.card}» never shown`);
  if (P && P.must && !popSeen) bad.push(`pop «${P.cls}» never shown (dropped, not queued)`);
  return [...new Set(bad)];
}
(async () => {
  const b = await chromium.launch(); const rows = []; let fails = 0;
  for (const dev of DEVS) {
    const ctx = await b.newContext({ viewport: VP[dev], deviceScaleFactor: 1, hasTouch: true, isMobile: false, serviceWorkers: 'block' });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message.slice(0, 200)));
    await p.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'domcontentloaded', timeout: 0 });
    await p.waitForFunction(() => typeof deser === 'function' && typeof kitReward === 'function' && typeof cold === 'function', null, { timeout: 0 }); await p.waitForTimeout(2500);
    for (const C of CASES) {
      if (ONLY && !ONLY.some(o => C.name.includes(o))) continue;
      const rt = RT.make(p, { dev, touch: true });
      await home(p); const R = RANK[C.rank], P = C.pop ? POP[C.pop] : null;
      await p.evaluate(c => { (0, eval)(c) }, PRE[R.pre] + ';render();Q.length=0;document.getElementById("modal").hidden=true');
      await p.waitForTimeout(600); await p.evaluate(() => { try { kmReset() } catch (e) { } document.querySelectorAll('.kmov,.kfgain').forEach(e => e.remove()); render() /* kmDiff snapshot of the state BEFORE the change (kmReset clears it) */ });
      await p.waitForTimeout(400);
      await p.evaluate(SAMPLER);
      const fire = C.when === 'before' ? `${P ? P.code + ';' : ''}${R.code};render();if(Q.length)showModal()` : `${R.code};render();if(Q.length)showModal()`;
      const e1 = await p.evaluate(c => { try { (0, eval)(c); return S.out ? null : (S.rank + '') } catch (e) { return String(e).slice(0, 200) } }, fire).then(r => r && /^\d+$/.test(r) ? (/monthroll|cold/.test(C.rank) ? 'rank change did not happen (S.out 0, rank ' + r + ')' : null) : r);
      let shotRank = false, shotPop = false, idle = 0, popFired = C.when !== 'after';
      for (let i = 0; i < 60 && idle < 8; i++) {
        await p.waitForTimeout(450);
        if (!popFired) { /* AFTER: the pop-up comes once the rank screen is up (rank scene or rank card on screen) */
          const up = await p.evaluate(() => { const l = window.__rs; const e = l[l.length - 1]; return !!e && (e.rq.length > 0 || e.sc.some(s => /km-gloom|km-edict/.test(s))) });
          if (up) { await p.evaluate(c => { (0, eval)(c) }, P.code); popFired = true; await p.waitForTimeout(700) }
        }
        const cur = await p.evaluate(() => window.__rs[window.__rs.length - 1] || { sc: [], t: '', rq: [] });
        if (OUT && !shotRank && (R.card ? cur.t === R.card || (cur.rq.length && cur.sc.length) : cur.sc.some(s => /km-gloom|km-edict/.test(s)))) { shotRank = true; await p.waitForTimeout(900); await p.screenshot({ path: path.join(OUT, `${dev}-${C.name.replace(/[^a-z0-9]+/gi, '_')}-rank.jpg`), type: 'jpeg', quality: 70 }) }
        if (OUT && shotRank && !shotPop && P && cur.sc.some(s => s.includes(P.cls))) { shotPop = true; await p.screenshot({ path: path.join(OUT, `${dev}-${C.name.replace(/[^a-z0-9]+/gi, '_')}-pop.jpg`), type: 'jpeg', quality: 70 }) }
        const s = await step(p, rt); idle = s.k === 'idle' ? idle + 1 : 0;
      }
      const log = await p.evaluate(() => { clearInterval(window.__rsT); return window.__rs });
      if (process.env.RSDBG) console.log('DBG', JSON.stringify(await p.evaluate(() => ({ Q: Q.map(m => m.t), kmq: KMQ.length, busy: kmBusy, out: S.out, modal: document.getElementById('modal').hidden, ov: [...document.querySelectorAll('.kmov')].map(e => e.className) }))));
      const bad = judge(C, log); if (e1) bad.push('setup error: ' + e1);
      const seq = log.map(e => (e.sc.length ? '[' + e.sc.join('+') + ']' : '') + (e.t ? '«' + e.t + '»' : '')).filter(Boolean).filter((x, i, a) => x !== a[i - 1]).join(' → ').slice(0, 300);
      rows.push([C.name, dev, bad.length ? 'FAIL — ' + bad.join('; ') : 'ok', seq]); if (bad.length) fails++;
      console.log(`${dev} ${C.name}: ${bad.length ? 'FAIL ' + bad.join('; ') : 'ok'}\n   ${seq}`);
    }
    if (errs.length) { rows.push(['page errors', dev, 'FAIL — ' + errs.slice(0, 3).join(' | '), '']); fails++ }
    await ctx.close();
  }
  await b.close();
  console.log('\n| case | device | result | sequence (top layer) |\n|---|---|---|---|'); for (const r of rows) console.log('| ' + r.join(' | ') + ' |');
  console.log(`\nrank-screen-first: ${rows.length - fails}/${rows.length} ok`); process.exit(fails ? 1 : 0)
})();
