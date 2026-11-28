#!/usr/bin/env node
/* svt-len-rt.js — REAL-TAP test of «Hỏi lén» (review/talk-others-people, WORKLIST #26, OD 24/11 ~07:58Z) on a MID-GAME save.
   usage: node dev/test/svt-len-rt.js <url> <ckpt.json from robot-rt.js (its .ls = the game's localStorage)> <out-dir> [fold|ipad]
   Every action is a tap through dev/test/realtap.js (the shared real-tap library of review/robot-realtap, same file).
   page.evaluate is used ONLY to READ (which buttons exist, khắc used, SVT.stat, the log) and to put the save back in localStorage (setup).
   Steps: title → Chơi một mình / Tiếp tục (taps) → close any open layer (taps) → tab «Cung nhân» → a face in «Cung khác» →
   the card shows «Giao thiệp»: «Hỏi chuyện» + «Hỏi lén · 3 khắc» → tap «Hỏi lén» → khắc +kLen, SVT.stat.len +1, a new log line. Shots before/after.
   Exit 0 = PASS, 1 = FAIL (reasons printed). */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const RT = require('./realtap.js');
const [URL0, CK, OUT, DEV0] = process.argv.slice(2); const DEV = DEV0 || 'fold';
if (!URL0 || !CK || !OUT) { console.error('usage: svt-len-rt.js <url> <ckpt.json> <out-dir> [fold|ipad]'); process.exit(2) }
fs.mkdirSync(OUT, { recursive: true });
const VP = DEV === 'ipad' ? { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 2, hasTouch: false } : { viewport: { width: 755, height: 1000 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true };
const fail = [], note = [];
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext(VP); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message.split('\n')[0].slice(0, 160)));
  const rt = RT.make(p, { dev: DEV, shots: OUT, touch: DEV !== 'ipad', ignoreCover: /kpop|kxcatch|ktut|#dawn|kne/, log: process.env.RTV ? (x => console.log('RT', JSON.stringify(x))) : undefined });
  const shot = n => p.screenshot({ path: path.join(OUT, DEV + '-' + n + '.png') });
  const ck = JSON.parse(fs.readFileSync(CK, 'utf8'));
  await p.goto(URL0, { waitUntil: 'load', timeout: 0 });
  await p.waitForFunction(() => typeof start === 'function', null, { timeout: 0 });
  await p.evaluate(ls => { for (const [k, v] of Object.entries(ls)) localStorage.setItem(k, v) }, ck.ls); /* setup: the mid-game save */
  await p.reload({ waitUntil: 'load', timeout: 0 }); await p.waitForFunction(() => typeof start === 'function', null, { timeout: 0 }); await p.waitForTimeout(1500);
  /* the top visible button whose text matches re, in the top layer (read-only) → its handle */
  const btn = async re => { const h = await p.evaluateHandle(src => { const re = new RegExp(src, 'i'); const v = e => { const r = e.getBoundingClientRect(); return r.width > 2 && r.height > 2 && getComputedStyle(e).visibility !== 'hidden' };
    return [...document.querySelectorAll('button,[role=button]')].filter(e => v(e) && !e.disabled && re.test((e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim())).pop() || null }, re.source);
    return (await h.evaluate(e => !!e)) ? h.asElement() : null };
  const inGame = () => p.evaluate(() => { try { return !!(S && S.name && !S.dead && document.getElementById('tabs') && document.getElementById('tabs').getBoundingClientRect().height > 0 && ![...document.querySelectorAll('#kload,#title,.curtain.on')].some(e => !e.hidden && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0)) } catch (e) { return false } });
  /* title → the saved life, by taps */
  for (let i = 0; i < 25 && !(await inGame()); i++) {
    const h = (await btn(/^(chơi một mình|tiếp tục|vào game|chơi tiếp)/)) || (await btn(/^(✕|×|đóng|lui|thôi|để sau|bỏ qua|tiếp|được|vâng)/));
    if (h) await rt.tap(h, { screen: 'boot', label: 'boot' }); await p.waitForTimeout(900) }
  await p.waitForFunction(() => !(document.getElementById('kload') && !document.getElementById('kload').hidden && getComputedStyle(document.getElementById('kload')).display !== 'none'), null, { timeout: 180000 }).catch(() => {}); await p.waitForTimeout(800);
  if (!(await inGame())) { fail.push('could not reach the saved life by taps'); await shot('boot-fail'); return done(b) }
  /* close any open dialog / story beat (taps only) */
  for (let i = 0; i < 12; i++) { const open = await p.evaluate(() => [...document.querySelectorAll('#modal:not([hidden]),#ov:not([hidden]),.kdlg,.kne')].some(e => e.getBoundingClientRect().height > 0)); if (!open) break;
    const h = await btn(/^(✕|×|đóng|lui|thôi|để sau|tiếp|được|vâng|ừ|biết rồi)/) || await btn(/./); if (h) await rt.tap(h, { screen: 'clear', label: 'close' }); await p.waitForTimeout(700) }
  const st0 = await p.evaluate(() => ({ y: S.year, rank: S.rank, used, kLen: BAL.svt.kLen, k: BAL.svt.k, len: SVT.stat.len || 0, talk: SVT.stat.talk, refuse: SVT.stat.refuse, khac: BAL.time.khac, log: (document.getElementById('log') || document.body).innerText.length }));
  note.push('save: year ' + st0.y + ' rank ' + st0.rank + ' · khắc used ' + st0.used + '/' + st0.khac);
  /* the boot cover fades out over the bar: wait until a person can actually hit the tab bar (read-only hit test) */
  await p.waitForFunction(() => { const t = document.getElementById('tabs'); if (!t) return false; const r = t.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !!e && t.contains(e) }, null, { timeout: 120000 }).catch(() => {});
  /* «Cung nhân» sits under the «Hậu cung» group tab (j84 TABS + its sub-tab row .ksubb) on the phone bar */
  let sub = await btn(/^Cung nhân$/);
  if (!sub) { const g = await btn(/^Hậu cung$/); if (!g || !(await rt.tap(g, { screen: 'tabs', label: 'Hậu cung' }))) { fail.push('tab «Hậu cung» dead/missing'); await shot('tabs'); return done(b) } await p.waitForTimeout(700); sub = await btn(/^Cung nhân$/) }
  const onStaff = () => p.evaluate(() => [...document.querySelectorAll('#panel .psep')].some(e => /Cung khác/.test(e.textContent)));
  /* the panel re-renders under a live handle (realtap «gone»): find the sub-tab again right before each try (W3) */
  let subOk = await onStaff(); for (let i = 0; i < 3 && !subOk; i++) { sub = await btn(/^Cung nhân$/); if (sub && (await rt.tap(sub, { screen: 'tabs', label: 'Cung nhân' }))) { await p.waitForTimeout(600); subOk = await onStaff() } else await p.waitForTimeout(500) }
  if (!subOk) { fail.push('tab «Cung nhân» dead/missing'); await shot('tabs'); return done(b) }
  await p.waitForTimeout(800);
  /* faces of the «Cung khác» group (another house's servants): tap them one by one until one she has met (the stranger gate) */
  const pis = await p.evaluate(() => { const g = [...document.querySelectorAll('#panel .pgrp')]; const i = g.findIndex(x => /Cung khác/.test((x.querySelector('.psep') || {}).textContent || '')); return i < 0 ? [] : g.slice(i).flatMap(x => [...x.querySelectorAll('.pface')].map(f => f.dataset.pi)) });
  if (!pis.length) { fail.push('no «Cung khác» group in Cung nhân'); await shot('no-other'); return done(b) }
  const rd = () => p.evaluate(() => { const b2 = document.querySelector('#panel [data-sv="hoi2"]'), b3 = document.querySelector('#panel [data-sv="hoi3"]'); const t = e => e ? e.textContent.replace(/\s+/g, ' ').trim() : null; return { hoi2: t(b2), hoi3: t(b3), dis3: b3 ? (b3.disabled || /Cần\s*✗/.test(t(b3))) : null } });
  /* review N1: the Thái hậu's household named women = others' people → their card has the #26 «Hỏi chuyện» + «Hỏi lén» (data-elder hoi2 / hoi3), no plain elder talk */
  const thhCheck = async () => { const tp = await p.evaluate(() => { const g = [...document.querySelectorAll('#panel .pgrp')]; const i = g.findIndex(x => /Cung Thái hậu/.test((x.querySelector('.psep') || {}).textContent || '')); return i < 0 ? [] : [...g[i].querySelectorAll('.pface')].map(f => f.dataset.pi) });
    if (!tp.length) { note.push('no «Cung Thái hậu» group in this save'); return }
    /* page like a person: «›» until the strip ends (the last arrow greys out / stops), then «‹» back */
    const prev = async () => { const ok = await rt.tap('#panel .pstrip .parr:first-of-type', { screen: 'staff', label: '‹' }); await p.waitForTimeout(450); return ok };
    let dir = next; for (let g = 0; g < 80 && !tp.includes(await cur()); g++) { const c0 = await cur(); const ok = await dir(); if (!ok || (await cur()) === c0) { if (dir === prev) { fail.push('«‹ ›» could not reach the Thái hậu group'); return } dir = prev } }
    if (!tp.includes(await cur())) { fail.push('could not reach a Thái hậu card'); return }
    const c = await p.evaluate(() => { const T = e => e ? e.textContent.replace(/\s+/g, ' ').trim() : null; return { h2: T(document.querySelector('#panel [data-elder="hoi2"]')), h3: T(document.querySelector('#panel [data-elder="hoi3"]')), old: document.querySelectorAll('#panel [data-elder="hoi"]').length } });
    await shot('thh-card'); note.push('Thái hậu card: «' + c.h2 + '» + «' + c.h3 + '» · plain elder talk ' + c.old);
    if (!c.h2 || !c.h3) fail.push('N1: Thái hậu household card without the #26 talks'); if (c.old) fail.push('N1: plain elder «Hỏi chuyện» still on a Thái hậu card') };
  let card = null, tried = 0, stranger = 0;
  /* first «Cung khác» face: tap it when the strip shows it (Fold); else page with «›» like a person (iPad strip shows a window) */
  const vis = pi => p.evaluate(pi => { const f = document.querySelector(`#panel .pface[data-pi="${pi}"]`); if (!f) return false; const r = f.getBoundingClientRect(), q = f.closest('.pfaces').getBoundingClientRect(); return r.width > 0 && r.left >= q.left - 1 && r.right <= q.right + 1 }, pi);
  const cur = () => p.evaluate(() => { const f = document.querySelector('#panel .pface.on'); return f ? f.dataset.pi : null });
  const next = async () => { const ok = await rt.tap('#panel .pstrip .parr:last-of-type', { screen: 'staff', label: '›' }); await p.waitForTimeout(450); return ok };
  if (await vis(pis[0])) { if (!(await rt.tap(`#panel .pface[data-pi="${pis[0]}"]`, { screen: 'staff', label: 'face ' + pis[0] }))) { fail.push('face ' + pis[0] + ' dead'); return done(b) } await p.waitForTimeout(500) }
  else { for (let g = 0; g < 40 && !pis.includes(await cur()); g++) if (!(await next())) { fail.push('«›» dead'); return done(b) } }
  for (let g = 0; g < pis.length; g++) { tried++; card = await rd(); if (card.hoi3 && !card.dis3) break; if (card.hoi3 && /Chưa biết/.test(card.hoi3)) stranger++; if (tried === 1) await shot('card-stranger');
    if (!(await next())) { fail.push('«›» dead'); return done(b) } if (!pis.includes(await cur())) break }
  note.push('Cung khác faces ' + pis.length + ' · tried ' + tried + ' · stranger-gated ' + stranger);
  note.push('card: «' + card.hoi2 + '» + «' + card.hoi3 + '»');
  const dup = await p.evaluate(() => { const T = e => (e.textContent || '').replace(/\s+/g, ' ').trim(); const tabs = [...document.querySelectorAll('#panel button,#panel [role=tab]')].filter(e => /^Giao thiệp\b/.test(T(e)) && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().height < 80).length;
    const hoi = [...document.querySelectorAll('#panel [data-sv="hoi2"],#panel [data-elder="hoi"]')].length; return { tabs, hoi } });
  note.push('«Giao thiệp» tabs ' + dup.tabs + ' · «Hỏi chuyện» buttons ' + dup.hoi);
  if (dup.tabs > 1) fail.push('two «Giao thiệp» groups on one card'); if (dup.hoi > 1) fail.push('two «Hỏi chuyện» on one card');
  await shot('card-before');
  if (!card.hoi3) { fail.push('no «Hỏi lén» on the card'); return done(b) }
  if (!/Hỏi lén/.test(card.hoi3) || !new RegExp(st0.kLen + ' khắc').test(card.hoi3)) fail.push('label wrong: ' + card.hoi3);
  if (/%|\d+\s*%/.test(card.hoi3)) fail.push('a % in the button (law 7)');
  /* review N2: a full buổi is not a failure — the button must be locked with ITS OWN khắc reason, and a tap on it changes nothing */
  if (card.dis3) { if (st0.khac - st0.used < st0.kLen && /khắc/.test(card.hoi3)) { await rt.tap('#panel [data-sv="hoi3"]', { screen: 'staff-card', label: 'Hỏi lén (locked)' }).catch(() => {}); await p.waitForTimeout(600);
      const sl = await p.evaluate(() => ({ used, len: SVT.stat.len || 0 })); if (sl.used !== st0.used || sl.len !== st0.len) fail.push('locked «Hỏi lén» tap still acted'); note.push('full buổi (khắc ' + st0.used + '/' + st0.khac + '): «Hỏi lén» locked with its own reason «' + card.hoi3 + '» — a tap changes nothing'); await thhCheck(); return done(b) }
    fail.push('«Hỏi lén» disabled with khắc left or no khắc reason (khắc ' + st0.used + '/' + st0.khac + '): ' + card.hoi3); return done(b) }
  const tgt = await p.evaluate(() => { const b3 = document.querySelector('#panel [data-sv="hoi3"]'); const s = b3 && servById(+b3.dataset.sid); return s ? { eid: s.eid || null, call: s.call || null, af: (s.af && s.af.me) || 0, sid: s.sid } : null });
  const ok = await rt.tap('#panel [data-sv="hoi3"]', { screen: 'staff-card', label: 'Hỏi lén' });
  if (!ok) { fail.push('DEAD BUTTON «Hỏi lén»'); return done(b) }
  await p.waitForTimeout(1200);
  const st1 = await p.evaluate(() => ({ used, len: SVT.stat.len || 0, talk: SVT.stat.talk, refuse: SVT.stat.refuse, log: (document.getElementById('log') || document.body).innerText.length, last: (() => { const k = [...document.querySelectorAll('div,section')].filter(e => /^\s*KẾT QUẢ/i.test(e.innerText || '') && e.getBoundingClientRect().height > 0).pop(); return k ? k.innerText.replace(/\s+/g, ' ').slice(0, 300) : '' })() }));
  await shot('after');
  if (st1.used - st0.used !== st0.kLen) fail.push('khắc spent ' + (st1.used - st0.used) + ' ≠ kLen ' + st0.kLen);
  if (st1.len !== st0.len + 1) fail.push('SVT.stat.len ' + st0.len + '→' + st1.len + ' (the tap did not reach svTalk len)');
  if (st1.talk !== st0.talk + 1) fail.push('SVT.stat.talk did not move');
  note.push((st1.refuse > st0.refuse ? 'refused' : 'talked') + ' · log: ' + st1.last);
  if (st1.refuse === st0.refuse && /không được gì/.test(st1.last)) fail.push('talked (learned) but the result card says «không được gì» (LAW 11 ka-know)');
  if (/bất kính/.test(st1.last)) fail.push('«bất kính» after «Hỏi lén» (no greeting owed)');
  /* review B1: a named woman (s.eid) keeps the elder talk gain (thiện cảm + palace news line) when she talks */
  if (tgt && tgt.eid && st1.refuse === st0.refuse) { const af1 = await p.evaluate(sid => { const s = servById(sid); return (s && s.af && s.af.me) || 0 }, tgt.sid); const meA = await p.evaluate(() => BAL.eff.jstaff.meAct);
    note.push('named woman ' + tgt.call + ': thiện cảm ' + tgt.af + '→' + af1); if (af1 !== tgt.af + meA) fail.push('B1: the elder talk gain is lost (thiện cảm ' + tgt.af + '→' + af1 + ')') }
  await thhCheck();
  if (errs.length) fail.push('page errors: ' + errs.slice(0, 3).join(' / '));
  note.push('taps ' + JSON.stringify(rt.stats ? rt.stats() : {}));
  return done(b);
})().catch(e => { console.error(e); process.exit(1) });
async function done(b) { await b.close(); const r = { dev: DEV, pass: !fail.length, fail, note }; fs.writeFileSync(path.join(OUT, DEV + '-result.json'), JSON.stringify(r, null, 1)); console.log((r.pass ? 'PASS' : 'FAIL') + ' svt-len-rt ' + DEV + '\n  ' + note.concat(fail.map(f => 'FAIL: ' + f)).join('\n  ')); process.exit(r.pass ? 0 : 1) }
