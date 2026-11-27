/* noise-sampler.js — IN-PAGE, READ-ONLY sampler of every channel that interrupts the player (owner OD 26/11 ~06:50Z (A) PLAYER-NOISE BUDGET,
   (D) TEXT HYGIENE). Installed by dev/measure/noise-preload.js as a context init script; it never taps, never calls a game function that
   changes state, never writes S, never calls Math.random. It only READS (S, S.tb, Q, kitNoticeList, wk, kaLastResult, the DOM) every SAMPLE_MS and counts:
     tinbao   new rows in the Tin báo box (kitNoticeList: a new id, or the same id with a new line = shown again)
     tinag    new world news items (S.tb.K / S.tb.R ids, jagknow — read directly, never through tinBaoList) — what feeds the box from the living world
     chip     toast chips (#kntchip shown with a new text) — the small pop-up that slides in
     result   result cards (#rtoast «KẾT QUẢ» shown: kaLastResult changed), rows = its Được/Mất/Ghi chú items
     dlg      dialogs / cards she is shown (#modal open with a new Q[0]) — counted per buổi AND per day
     visit    of those: people coming to find her («Có người đến / tìm đến», «Một ánh mắt», «Có người bán tin», visitor cards)
     big      of those: BIG event cards (kind fest / harm / visit / ky / opt — the same names as BAL.evc, jevc evcKind when the build has it)
     seal     of those: cards that carry an emotion seal (m.emoSeal)
   Day = wk() (game day = tuần, the unit of BAL.evc); buổi = S.buoi. Rows go to the Node side through window.__nzPush (exposeBinding) at every
   day change and every FLUSH_MS; the first sample after a (re)load is the baseline (a save's old notices are not counted again).
   TEXT: every distinct visible line of the interrupting surfaces (+ dialog body, option labels, buttons) is sent once for the hygiene scan
   (dev/test/text-hygiene.js rules), with its surface name. */
'use strict';
module.exports = function nzSampler(cfg) {
  if (window.__nzOn) return; window.__nzOn = 1;
  const SAMPLE_MS = cfg && cfg.sampleMs || 350, FLUSH_MS = cfg && cfg.flushMs || 20000, LMAX = 400;
  /* the life's own opening / story pages she pages through on purpose (not interruptions): counted apart as «story» */
  const STORY = /^(Thân phận kiếp này|Tiền truyện|Chương \d|Hồi \d)/;
  const VIS = /^(Có người đến|Có người tìm đến|Một ánh mắt|Có người bán tin)/;
  const kindOf = m => {
    try { if (typeof evcKind === 'function') { const k = evcKind(m); if (k) return k } } catch (e) {}
    const t = String(m.t || '').replace(/<[^>]+>/g, ''), pid = String(m.pid || '');
    if (pid === 'j70' || /^(Mưu hại|Sau vụ mưu hại|Lời cảnh báo|Tai mắt báo tin)/.test(t)) return 'harm'; if (pid === 'kyngo') return 'ky';
    if (VIS.test(t) || /visit/.test(pid)) return 'visit'; if (/^(e68|q72o|rgo?$|j71m)/.test(pid) || /^(Việc khó xử|Phụ tuyến|Lập công)/.test(t)) return 'opt';
    if (/^j71[ix]$/.test(pid)) return 'fest'; return null };
  /* BIG #9 FAIL 1 (whole family): NO game function that writes is ever called. The world news are read straight from S.tb (K = this buổi's
     items, R = today's late reports, the same two lists tinBaoList() returns) — tinBaoList itself is NOT pure (adHapNow writes S.adHap, knTb
     writes S.tb + knCarryTick delivers carried news and fires KN.cb, knEnd rewrites expired lines via kLine → Math.random + S.vmem). The game
     keeps S.tb fresh by itself (knTb at every buổi turn, knScan, knBao, knSellTick). Every other read is a pure getter: wk() (j8: S.turn*3+
     S.tuan), kitNoticeList() (jnotice: NT.list.slice()), evcKind(m) (jevc, stat-pace builds: string tests only), BAL / Q / kaLastResult / the
     DOM (read only). The sampler's own id does not use Math.random (a seeded life's stream must not move). */
  const tbRead = s => { const T = s && s.tb; if (!T || typeof T !== 'object') return []; const out = [];
    for (const it of Object.values(T.K || {})) if (it && it.id != null) out.push({ id: it.id, line: it.line });
    for (const it of (Array.isArray(T.R) ? T.R : [])) if (it && it.id != null) out.push({ id: it.id, line: it.line });
    return out };
  const sid = (Date.now() % 2176782336).toString(36) + (performance.now() | 0).toString(36).slice(-2); let base = false, day = null, buoi = null, cur = null, lastFlush = Date.now();
  const seenN = new Map(), seenAg = new Set(), seenTxt = new Set(), seenQ = new WeakSet(); let lastChip = '', lastRes = null;
  const z = () => ({ tinbao: 0, tinag: 0, chip: 0, result: 0, resRowsMax: 0, resRows: 0, dlg: 0, visit: 0, big: 0, seal: 0, kinds: {}, buoiDlg: {}, ex: {} });
  const ex = (c, s) => { const e = cur.ex; e[c] = e[c] || []; if (e[c].length < 6) e[c].push(String(s).replace(/\s+/g, ' ').slice(0, 120)) };
  /* who asked for the card: a tap on the PAGE (a tab, a person, an item, a place — not inside a card, not the buổi / day turn) within OWN_MS before the
     card shows = she opened it herself (counted as «own», not as an interruption); read-only passive listener, it never stops the tap */
  const OWN_MS = 1500; let lastTap = { t: 0, own: false }, lastOwn = false; /* lastOwn: the card on screen is one she opened — a card opened from inside it is hers too */
  addEventListener('pointerdown', e => { try { const t = e.target, inCard = !!(t.closest && t.closest('#modal,#rtoast')); /* a tap on the Tin báo box / chip = she opens the news herself */
    const lab = ((t.closest && t.closest('button,[role=button]')) || t).innerText || ''; lastTap = { t: Date.now(), own: (!inCard || lastOwn) && !/Sang (buổi|ngày)/i.test(lab) } } catch (x) {} }, { capture: true, passive: true });
  const txt = [];
  const addTxt = (surf, s) => { if (s == null) return; for (let l of String(s).split(/\n+/)) { l = l.replace(/[ \s]+/g, ' ').trim(); if (!l || l.length < 2) continue; if (l.length > LMAX) l = l.slice(0, LMAX) + '…';
      const k = surf + '|' + l; if (seenTxt.has(k)) continue; if (seenTxt.size > 30000) return; seenTxt.add(k); txt.push([surf, l, day, buoi]) } };
  const flush = (why) => { if (!cur || !window.__nzPush) return; let bud = null; try { bud = { noise: BAL.noise || null, evc: BAL.evc ? { cap: BAL.evc.cap, q: BAL.evc.q } : null } } catch (e) {}
    const row = Object.assign({}, cur, { sid, day, buoi, why, at: Date.now(), bud }); const T = txt.splice(0);
    try { window.__nzPush(JSON.stringify({ row, txt: T })) } catch (e) {} lastFlush = Date.now() };
  const vis = el => { if (!el || !el.isConnected || el.hidden) return false; const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > .05 };
  function tick() {
    let s; try { s = typeof S !== 'undefined' ? S : null } catch (e) { s = null } if (!s || s.dead === undefined && s.buoi === undefined) return;
    let d = null; try { d = typeof wk === 'function' ? wk() : null } catch (e) {} const b = s.buoi || 0;
    if (d !== day) { if (cur && day != null) flush('day'); day = d; cur = z() } if (!cur) cur = z(); buoi = b;
    /* Tin báo rows */
    let NL = []; try { if (typeof kitNoticeList === 'function') NL = kitNoticeList() } catch (e) {}
    for (const x of NL) { const k = x.id, v = x.line || ''; if (seenN.get(k) === v) continue; seenN.set(k, v); if (base) { cur.tinbao++; ex('tinbao', v) } addTxt('tinbao', v) }
    let AL = []; try { AL = tbRead(s) } catch (e) {}
    for (const x of AL) { if (seenAg.has(x.id)) continue; seenAg.add(x.id); if (base) cur.tinag++; addTxt('tinbao', x.line) }
    /* toast chip */
    const ch = document.getElementById('kntchip'); if (ch && vis(ch)) { const t = (ch.innerText || '').trim(); if (t && t !== lastChip) { lastChip = t; if (base) { cur.chip++; ex('chip', t) } addTxt('chip', t) } } else lastChip = '';
    /* result card */
    let R = null; try { R = window.kaLastResult || null } catch (e) {}
    if (R && R !== lastRes) { lastRes = R; const n = (R.rows || []).reduce((a, r) => a + ((r.items || []).length), 0); if (base) { cur.result++; cur.resRows += n; cur.resRowsMax = Math.max(cur.resRowsMax, n); ex('result', (R.title || '') + ' · ' + n) }
      addTxt('result', R.title); addTxt('result', R.sentence); for (const r of R.rows || []) for (const it of r.items || []) addTxt('resrow', String(it).replace(/<[^>]+>/g, '')) }
    const rt = document.getElementById('rtoast'); if (rt && rt.classList.contains('on')) addTxt('result', rt.innerText);
    /* dialog cards */
    const M = document.getElementById('modal'); let m = null; try { m = (typeof Q !== 'undefined' && Q.length && M && !M.hidden) ? Q[0] : null } catch (e) {}
    if (m && typeof m === 'object' && !seenQ.has(m)) { seenQ.add(m); if (base && STORY.test(String(m.t || ''))) { cur.story = (cur.story || 0) + 1 } else if (base && lastTap.own && Date.now() - lastTap.t < OWN_MS) { lastOwn = true; cur.own = (cur.own || 0) + 1; ex('own', m.t) } else if (base) { lastOwn = false; cur.dlg++; cur.buoiDlg[b] = (cur.buoiDlg[b] || 0) + 1; const k = kindOf(m); if (k) { cur.big++; cur.kinds[k] = (cur.kinds[k] || 0) + 1; ex('big', k + ': ' + (m.t || '')) }
        if (k === 'visit' || VIS.test(String(m.t || ''))) { cur.visit++; ex('visit', m.t) } if (m.emoSeal) { cur.seal++; ex('seal', m.t) } ex('dlg', m.t) } }
    if (!M || M.hidden) lastOwn = false;
    if (M && !M.hidden) { const t = document.getElementById('mt'); if (t) addTxt('title', t.innerText); const mb = document.getElementById('mb'); if (mb) addTxt('body', mb.innerText);
      for (const o of M.querySelectorAll('button')) if (vis(o)) addTxt('button', o.innerText) }
    for (const dl of document.querySelectorAll('.dlg')) { if (M && M.contains(dl)) continue; if (!vis(dl)) continue; addTxt('panel', dl.innerText) }
    base = true;
    if (Date.now() - lastFlush > FLUSH_MS) flush('t') }
  setInterval(() => { try { tick() } catch (e) {} }, SAMPLE_MS);
  addEventListener('pagehide', () => { try { flush('hide') } catch (e) {} });
};
