/* realtap.js — SHARED REAL-TAP LIBRARY (owner rule 25/11 ~05:10Z: robots tap like a real person, never machine clicks).
   tap(page, target, info) — target = Playwright Locator | ElementHandle | CSS selector:
     scroll into view (real wheel/touch scroll of the page, not el.scrollIntoView on the game) → element centre →
     document.elementFromPoint hit-check (must be the target or its descendant; a few probe points inside the box) →
     touchscreen.tap (touch devices) / mouse.click (desktop/iPad pointer) at that point.
     Covered / off-screen / zero-size → logs «DEAD BUTTON» {screen,label,cover,shot} and returns false.
   NO .click() / dispatchEvent / game-function calls anywhere here: page.evaluate is used ONLY to READ (rects, hit-test).
   opt.ignoreCover = RegExp of transient hint popups (e.g. /kpop/) that a tap simply dismisses: not a dead button.
   Usage: const RT=require('./realtap.js'); const rt=RT.make(page,{dev:'fold',shots:'/dir',log:fn}); await rt.tap(sel,{screen,label});
          rt.stats() → {taps, dead, deadList[], jsClicks:0}.
   rt.choose(target,{screen,label}) = choose an option card the way a person does (hand: lift → ✓; dialogue: lines → thẻ gỗ → ✓), see below. */
'use strict';
const path = require('path');

/* read-only probe: centre + hit test of the element (runs in the page, changes nothing) */
const PROBE = (el) => {
  /* option card = the kit's own list of cards whose meter / glossary word never steals the tap (LIVE kit tap guard: button.opt, button.kopt, .opts>button,
     .kpopts>button, .k3btns>button, .kfoc-b, #mr>button, .kszopts>button); its only no-tap spots: the «!» corner chip .kobang and the «!» overlay .kopinfo */
  const CARD_SEL = 'button.opt,button.kopt,.opts>button,.kpopts>button,.k3btns>button,.kfoc-b,#mr>button,.kszopts>button', CARD_NOGO = '.kobang,.kopinfo,[data-leg],[class*=legend],.khelp,.kqm,input,select,textarea';
  if (!el || !el.isConnected) return { gone: true };
  const r = el.getBoundingClientRect(), W = innerWidth, H = innerHeight;
  const lab = (el.getAttribute('aria-label') || el.textContent || el.title || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if (r.width < 1 || r.height < 1) return { zero: true, lab };
  if (getComputedStyle(el).pointerEvents === 'none' || el.disabled) return { disabled: true, lab };
  /* the part a person can SEE: viewport ∩ every clipping (overflow) ancestor; probe points lie inside it */
  let x0 = Math.max(0, r.left), y0 = Math.max(0, r.top), x1 = Math.min(W, r.right), y1 = Math.min(H, r.bottom), sc = null;
  for (let s = el.parentElement; s && s !== document.body; s = s.parentElement) { const cs = getComputedStyle(s); if (/(auto|scroll|hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY)) { const q = s.getBoundingClientRect(); x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom); if (!sc && /(auto|scroll)/.test(cs.overflowY) && s.scrollHeight > s.clientHeight) sc = { l: q.left, t: q.top, r: q.right, b: q.bottom } } }
  /* label side first (odds chip «Rất vững» / «!» / legend triggers usually sit on the right or centre) */
  let pts = [[.14, .5], [.5, .5], [.3, .5], [.86, .5], [.5, .3], [.5, .7], [.7, .5], [.5, .12], [.5, .88], [.3, .85], [.7, .85], [.3, .15], [.7, .15]];
  /* OPTION CARDS (HARNESS FIXER #8, FOREMAN E 20:15Z: LIVE pack-4 2-column cards, iPad «Phụ tuyến · Đổi ơn… · Lời nhờ», 40+ min stuck): on LIVE a REAL tap
     anywhere on an option card chooses it — its picture (.kaart/figure.ksart), odds meter (.kodds/.kodm/.kseg), name (.kan/.kname), rows (.krv) — measured
     tap by tap (dev/test/rt-optcard-spots.js); ONLY the corner «!» (.kobang «Xem thêm») opens its own panel. So a card is probed on its OWN rect: the card
     centre first, then the centre of every descendant, then the fractions; a point counts when it lands in the card and not on / within NEAR px of the «!». */
  const card = el.matches(CARD_SEL);
  if (card) { const q = (x, y) => [(x - x0) / Math.max(1, x1 - x0), (y - y0) / Math.max(1, y1 - y0)]; const dp = [];
    /* the TITLE first (option name .kan / title row .kat: where a person taps, and the spot that chose in every LIVE frame measured — iPad PEND:plantsv rows
       / card centre did NOT choose on a real tap, reported as a kit bug), then the card centre, then every other descendant */
    for (const d of el.querySelectorAll('.kan,.kat,.kopn,.kon')) { if (d.closest(CARD_NOGO)) continue; const b = d.getBoundingClientRect(); if (b.width >= 4 && b.height >= 4) dp.push(q(b.left + b.width / 2, b.top + b.height / 2)) }
    dp.push(q((r.left + r.right) / 2, (r.top + r.bottom) / 2));
    for (const d of el.querySelectorAll('*')) { if (d.closest(CARD_NOGO)) continue; const b = d.getBoundingClientRect(); if (b.width < 4 || b.height < 4) continue; dp.push(q(b.left + b.width / 2, b.top + b.height / 2)); if (dp.length > 40) break }
    pts = [...dp.filter(([fx, fy]) => fx > 0 && fx < 1 && fy > 0 && fy < 1), ...pts] }
  let cover = null, anc = false, chip = false;
  /* TOUCH ADJUSTMENT (s7/s9 «Kính sự phòng báo tin» loop, 25/11): on a touch screen the browser snaps a tap to the nearest clickable inside the finger
     radius — a tap on the option NAME next to the odds chip «Rất vững» (.kodm role=button) opened the odds legend every time. A person's finger lands
     clear of the small chips: probe points closer than NEAR px to a nested clickable / chip are skipped (fall back to them only if nothing else). */
  const NEAR = 24, kids = [...el.querySelectorAll(card ? CARD_NOGO : 'button,[role=button],a,[data-tip],[data-help],[data-leg],[data-kzoom],.kaart,figure.ksart,.ksart,.kodds,.kodm,.kgl,.kchip,.kqm,.khelp,[class*=odds],[class*=legend]')].filter(c => c !== el).map(c => c.getBoundingClientRect()).filter(q => q.width > 0 && q.height > 0);
  const near = (x, y) => kids.some(q => x > q.left - NEAR && x < q.right + NEAR && y > q.top - NEAR && y < q.bottom + NEAR);
  let nearOk = null;
  if (x1 - x0 < 3 || y1 - y0 < 3) return { lab, clip: true, sc, top: r.top, bottom: r.bottom, cover: 'clipped by its scroller / off-screen', off: r.bottom < 0 || r.top > H };
  for (const [fx, fy] of pts) {
    const x = x0 + (x1 - x0) * fx, y = y0 + (y1 - y0) * fy;
    if (x < 1 || y < 1 || x > W - 1 || y > H - 1) continue;
    const t = document.elementFromPoint(x, y);
    if (t && (t === el || el.contains(t))) { /* never land on a nested info chip / legend trigger inside the button (it opens its own popup) */
      const inner = t.closest(card ? CARD_NOGO : 'button,[role=button],a,[data-tip],[data-help],[data-leg],[data-kzoom],.kaart,figure.ksart,.ksart,.kodds,.kchip,.kqm,.khelp,[class*=odds],[class*=legend]');
      if (inner && inner !== el && el.contains(inner)) { chip = true; continue }
      if (near(x, y)) { if (!nearOk) nearOk = { x, y, lab, ok: true, near: true }; continue }
      return { x, y, lab, ok: true } }
    if (t && t !== el && t.contains(el)) anc = true;
    if (!cover && t) { const c = t.closest('[id]'); /* s8b (F #16 23:06Z) «Xem Mèo mướp» DEAD «covered by span.kitb / b.kidn in #mb»: the cover was a CHILD of the open kitShop detail card (.kshdet/.kshdc, a
        by-design cover in opt.ignoreCover) but only the child + #mb were named, so ignoreCover never matched → name the by-design layer the hit sits in */
      const byd = t.closest('.kshdet,.kshdc,#kpop,.kpop,#kxcatch,#ktut,#kpzoom,.kpzoom'); const bn = byd && byd !== t ? ' under ' + (byd.id ? '#' + byd.id : '.' + String(byd.className).trim().split(/\s+/)[0]) : '';
      cover = (t.tagName.toLowerCase() + (t.id ? '#' + t.id : '') + (typeof t.className === 'string' && t.className ? '.' + t.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (c && c !== t ? ' in #' + c.id : '')).slice(0, 80) + bn }
  }
  if (nearOk) return nearOk;
  const off = r.bottom < 0 || r.top > H || r.right < 0 || r.left > W;
  return { lab, off, anc, sc, chip, cover: cover || (off ? 'off-screen' : 'outside viewport'), top: r.top, bottom: r.bottom };
};

function make(page, opt = {}) {
  const touch = opt.touch != null ? opt.touch : (page.viewportSize() || { width: 1000 }).width < 1100;
  const st = { taps: 0, dead: 0, deadList: [], jsClicks: 0 };
  const log = opt.log || (() => {});
  async function handleOf(target) {
    if (typeof target === 'string') return page.$(target);
    if (target && typeof target.elementHandle === 'function') return target.elementHandle({ timeout: 2000 }).catch(() => null);
    return target;
  }
  /* bring the element into the viewport like a person: scroll the page / its scroller with the wheel (no DOM calls) */
  async function scrollTo(h) {
    for (let i = 0; i < 8; i++) {
      const p = await h.evaluate(PROBE).catch(() => ({ gone: true }));
      if (p.gone || p.zero || p.ok || !p.off && p.cover !== 'outside viewport') return p;
      const vh = (page.viewportSize() || { height: 800 }).height;
      const dy = p.top > vh ? Math.min(p.top - vh * 0.5, vh * 0.8) : p.bottom < 0 ? Math.max(p.bottom - vh * 0.5, -vh * 0.8) : (p.top > vh / 2 ? vh * 0.4 : -vh * 0.4);
      const box = await h.evaluate(e => { let s = e.parentElement; while (s && s !== document.body) { const cs = getComputedStyle(s); if (/(auto|scroll)/.test(cs.overflowY) && s.scrollHeight > s.clientHeight) { const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: Math.max(r.top + 10, Math.min(r.bottom - 10, innerHeight / 2)) } } s = s.parentElement } return null }).catch(() => null);
      const vw = (page.viewportSize() || { width: 800 }).width;
      await page.mouse.move(box ? box.x : vw / 2, box ? box.y : vh / 2);
      await page.mouse.wheel(0, dy); await page.waitForTimeout(250);
    }
    return h.evaluate(PROBE).catch(() => ({ gone: true }));
  }
  /* every handle is DISPOSED after its tap (memory, F #10 11:03Z: s7 renderer grew ~1 GB → 3 GB by buổi 140): an undisposed JSHandle pins its element —
     and with it the whole detached subtree of every closed dialog / scene — in the renderer for the life of the page (thousands of taps per life).
     info.keep = true leaves a caller's handle alive (none today). */
  async function tap(target, info = {}) {
    let h = null;
    try { h = await handleOf(target); return await tap1(h, target, info) }
    finally { if (!info.keep) { if (h && typeof h.dispose === 'function') await h.dispose().catch(() => {}); if (target && target !== h && typeof target.dispose === 'function') await target.dispose().catch(() => {}) } }
  }
  async function tap1(h, target, info) {
    if (!h) { return dead(info, { lab: info.label || String(target), cover: 'not in page' }) }
    let p = await h.evaluate(PROBE).catch(() => ({ gone: true }));
    if (!p.ok) p = await scrollTo(h);
    /* half hidden under a fixed bar (tabs, header): a person scrolls it toward the middle first */
    for (let k = 0; k < 2 && !p.ok && !p.gone && !p.disabled && !p.zero && p.top != null; k++) { const vp = page.viewportSize() || { width: 800, height: 800 }; const box = p.sc || { l: 0, t: 0, r: vp.width, b: vp.height }; const mid = (box.t + Math.min(box.b, vp.height)) / 2; const dy = (p.top + p.bottom) / 2 - mid; if (Math.abs(dy) < 8) break; await page.mouse.move((box.l + Math.min(box.r, vp.width)) / 2, mid); await page.mouse.wheel(0, dy); await page.waitForTimeout(350); p = await h.evaluate(PROBE).catch(() => ({ gone: true })) } /* over ITS scroller, not the screen middle */
    /* HORIZONTAL tab rows (ROLE B #5 via F #12 14:33Z: 29 false «clipped by its scroller» DEAD rows = .pctabs.kcattabs overflow-x:auto — Tư trang tabs,
       Mệnh truyện › Sổ ghi origin rows, Danh hiệu list): a person swipes the row sideways; the wheel above only moved vertically */
    for (let k = 0; k < 6 && !p.ok && !p.gone && !p.disabled && !p.zero; k++) {
      const hx = await h.evaluate(e => { let s = e.parentElement; while (s && s !== document.body) { const cs = getComputedStyle(s); if (/(auto|scroll)/.test(cs.overflowX) && s.scrollWidth > s.clientWidth + 2) { const q = s.getBoundingClientRect(), r = e.getBoundingClientRect(); const dx = r.left < q.left ? r.left - q.left - 12 : r.right > q.right ? r.right - q.right + 12 : 0; return dx ? { x: q.left + q.width / 2, y: q.top + q.height / 2, dx } : null } s = s.parentElement } return null }).catch(() => null);
      if (!hx || hx.y < 0 || hx.y > (page.viewportSize() || { height: 800 }).height) break;
      await page.mouse.move(hx.x, hx.y); await page.mouse.wheel(hx.dx, 0); await page.waitForTimeout(300); p = await h.evaluate(PROBE).catch(() => ({ gone: true })) }
    if (!p.ok && !p.gone && !p.disabled && p.cover && !p.anc && !p.clip && !info.settled) { /* info.settled: the caller already waited + re-scanned (robot-rt deadCheck, FIXER #14 N3) */ await page.waitForTimeout(2500); const p2 = await h.evaluate(PROBE).catch(() => ({ gone: true })); if (p2.ok || p2.gone || p2.disabled) p = p2 } /* a scene / dawn frame passing over: settle once */
    if (!p.ok && info.wait) { const t0 = Date.now(); while (!p.ok && Date.now() - t0 < info.wait) { await page.waitForTimeout(400); p = await h.evaluate(PROBE).catch(() => ({ gone: true })) } }
    if (p.disabled) { log({ k: 'disabled', screen: info.screen, label: info.label }); return false }
    if (p.gone) { log({ k: 'gone', screen: info.screen, label: info.label }); return false }
    if (p.zero) { log({ k: 'zero', screen: info.screen, label: info.label }); return false } /* ROLE B #5 (d): a 0×0 target is a hidden element the picker chose (s4d «Hầu hạ», .kmov «?»), not a covered button — never DEAD */
    if (!p.ok && info.confirm && !(await info.confirm().catch(() => true))) { log({ k: 'moved', screen: info.screen, label: info.label }); return false }
    if (!p.ok && p.clip) { log({ k: 'clipped', screen: info.screen, label: info.label, cover: p.cover }); return false }
    if (!p.ok && p.anc) { log({ k: 'clipped', screen: info.screen, label: info.label, cover: p.cover }); return false } /* its own container is on top = clipped / under a scroll edge, not covered by another layer */
    if (!p.ok && opt.ignoreCover && opt.ignoreCover.test(p.cover || '')) { log({ k: 'popup', screen: info.screen, label: info.label, cover: p.cover }); return false }
    if (!p.ok) return dead(info, p);
    if (touch) await page.touchscreen.tap(p.x, p.y); else await page.mouse.click(p.x, p.y);
    st.taps++; log({ k: 'tap', screen: info.screen, label: info.label || p.lab, x: Math.round(p.x), y: Math.round(p.y) });
    return true;
  }
  async function dead(info, p) {
    st.dead++; let shot = null;
    if (opt.shots) { shot = path.join(opt.shots, 'dead-' + (opt.dev || 'dev') + '-' + Date.now() + '.png'); await page.screenshot({ path: shot }).catch(() => { shot = null }) }
    const d = { k: 'DEAD BUTTON', screen: info.screen || '?', label: info.label || (p && p.lab) || '?', cover: p && (p.gone ? 'element gone' : p.zero ? 'zero size' : p.cover) || '?', shot, dev: opt.dev };
    st.deadList.push(d); log(d); return false;
  }
  /* CHOOSE an option card like a person (owner 25/11 ~21:55Z, KIT §101 / §102.2; law 11: ONE helper for every robot / gate):
     a plain button = one real tap. A HAND card (.opts.khand) = real tap (the card lifts) → real tap on the green ✓ of the lifted card
     (#modal .dlg>.khconf>.khok); a tap on the lifted body chooses nothing. A DIALOGUE stage (.dlg.kstalk) = real taps on the stage through
     its lines until the thẻ gỗ drop → real tap on the plaque of that card (data-id = its hand index; pager «›» if it is on another page) → its ✓.
     Returns true when the last tap (the ✓, or the plain tap) landed. Read-only evaluates only. */
  const OKSEL = '#modal .dlg>.khconf:not([hidden])>.khok', PKOK = '.kpk .khconf:not([hidden])>.khok';
  async function choose(target, info = {}) {
    const h = await handleOf(target); if (!h) return dead(info, { lab: info.label || String(target), cover: 'not in page' });
    const k = await h.evaluate(e => { if (!e || !e.isConnected) return { k: 'gone' }; const g = e.closest('.opts.khand'); if (!g) return { k: 'plain' }; const dl = e.closest('.dlg');
      return { k: dl && dl.classList.contains('kstalk') ? 'talk' : 'hand', i: [...g.children].filter(b => b.matches('button.ka.kopt')).indexOf(e) } }).catch(() => ({ k: 'gone' }));
    const lab = info.label || 'card';
    if (k.k === 'plain' || k.k === 'gone') return tap(h, info);
    if (k.k === 'hand') {
      if (!(await tap(h, { ...info, label: lab + ' (lift)' }))) return false;
      for (let i = 0; i < 8 && !(await page.$(OKSEL)); i++) await page.waitForTimeout(150);
      if (!(await page.$(OKSEL))) { log({ k: 'no ✓', screen: info.screen, label: lab }); return false }
      return tap(OKSEL, { ...info, label: '✓ ' + lab });
    }
    /* talk: lines → plaques */
    if (info.keep !== true && typeof h.dispose === 'function') await h.dispose().catch(() => {});
    const stagePt = () => page.evaluate(() => { const d = document.querySelector('#modal:not([hidden]) .dlg.kstalk'); if (!d) return null; const r = d.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * .4 } });
    for (let i = 0; i < 16 && !(await page.$('.kpk .kpk-n')); i++) { const q = await stagePt(); if (!q) break; if (touch) await page.touchscreen.tap(q.x, q.y); else await page.mouse.click(q.x, q.y); st.taps++; await page.waitForTimeout(260) }
    await page.waitForTimeout(700);
    const PL = `.kpk .kpk-b[data-id="${k.i}"]`;
    for (let i = 0; i < 4; i++) { const vis = await page.evaluate(s => { const e = document.querySelector(s); return !!(e && e.getClientRects().length && e.getBoundingClientRect().width > 3) }, PL); if (vis) break; if (!(await tap('.kpk .kpkpg[data-pkpg="1"]', { screen: info.screen, label: 'thẻ gỗ ›' }))) break; await page.waitForTimeout(400) }
    if (!(await tap(PL, { ...info, label: lab + ' (thẻ gỗ)' }))) return false;
    for (let i = 0; i < 8 && !(await page.$(PKOK)); i++) await page.waitForTimeout(150);
    if (!(await page.$(PKOK))) { const off = await page.evaluate(s => { const e = document.querySelector(s); return !!(e && e.matches('.kitoff,.kfoc-off')) }, PL).catch(() => false); /* FIXER #23 F3 (BIG #21): a LOCKED plaque shows its reason, never «Chọn» (kitPick conf, by design) — logged «locked», not «no ✓» */ log({ k: off ? 'locked' : 'no ✓', screen: info.screen, label: lab + ' (thẻ gỗ)' }); return false }
    return tap(PKOK, { ...info, label: '✓ ' + lab });
  }
  return { tap, choose, stats: () => ({ ...st, deadList: st.deadList.slice(-200) }), touch, PROBE };
}
/* BARE_CHECK([x, y, sel]) — page side of robot-rt's bare-area tap (moved here by FIXER #11 JOB 11 so it has one copy and a unit test): installs the capture
   guard once (until the tap lands, any pointer / touch / click on a button is cancelled and counted), then says whether the point is bare. Returns true
   (bare, guard armed), false (a button is the top element) or 'covered: <why>' (a button under a leaving layer, a moving button near, the top changed). It reads only; it never clicks. */
const BARE_CHECK = ([x, y, sel, own]) => { if (!window.__rtG) { window.__rtG = 1; window.__rtBareN = 0; const f = e => { if (!(window.__rtBare > Date.now())) return; const t = e.target && e.target.closest && e.target.closest(sel); if (!t) return; e.preventDefault(); e.stopImmediatePropagation(); if (/^(pointerdown|touchstart|mousedown)$/.test(e.type)) { window.__rtBareN++; window.__rtBareHit = String(t.innerText || t.className || '').replace(/\s+/g, ' ').slice(0, 50); const d = el => el ? el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '') : '-'; window.__rtBareWhy = { ev: e.type, hit: d(t), tgt: d(e.target), dt: Math.round(Date.now() - (window.__rtBareAt || 0)), top0: window.__rtBareTop || '-' } } }; for (const k of ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'mousedown', 'mouseup', 'click']) window.addEventListener(k, f, { capture: true, passive: false }) }
      /* JOB 11 (FIXER #11; s15b Fold ×3 at b66 · s13 iPad «Giao thiệp Giặt đồ»): the point was checked on its TOP element only, once. What took the taps:
         (a) the LIVE emotion seal img.kemo[role=button] (jemoseal «kemo-live», idle sway / nod + the big lean seal) moving onto the point between check and touch
         (s15b ×2 «kemo kemo-binh kemo-live kemo-m-nod», «kemo-vui … sway»); (b) an option card mounting under the point (s15b first day «… Rất vững»);
         (c) a leaving layer (curtain / toast fading) over a button. Now a point is bare only if: no button is the top element; no button is under a
         see-through or LEAVING layer (a transition or a finite animation: curtain, toast, sliding card; a looping ambient pan such as the kmeg scene
         backdrop and a steady modal backdrop are fine = a person's tap there); no ANIMATED button (kemo seal, bobbing figure) within 0.35 × its size (≥ 40 px) of
         the point; and the same holds again 120 ms later with the same top element. Else 'covered' → the caller tries another point (harness.bareCovered). */
      const dsc = el => el ? el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '') : '-';
      const chk = () => { const st = document.elementsFromPoint(x, y), t = st[0]; if (!t || t.closest(sel)) return false; if (own) { let L = null; try { L = own === true ? window.__rtLay : document.querySelector(own) } catch (e) {} return L && L.isConnected && L.contains(t) ? dsc(t) : 'covered: not on the layer ' + (own === true ? 'scanned' : own) } /* FIXER #12 N2: own === true = the element the last SCAN chose (window.__rtLay); a selector string still works */ /* JOB 17: a tap ON a tap-to-skip layer (its own top element, never a button): what lies under the layer cannot take it */ const under = st.find(e => e.closest && e.closest(sel)); if (under) { const t0 = t; for (let e = t0; e && e !== document.body && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (+cs.opacity < 0.5 || cs.visibility !== 'visible' || (e.getAnimations && e.getAnimations().some(a => a.playState === 'running' && (a.constructor.name === 'CSSTransition' || !(a.effect && a.effect.getComputedTiming && a.effect.getComputedTiming().iterations === Infinity))))) { window.__rtCov = (window.__rtCov || 0) + 1; window.__rtCovLast = dsc(t0) + ' over ' + dsc(under.closest(sel)); return 'covered: ' + window.__rtCovLast } } }
        for (const a of (document.getAnimations ? document.getAnimations() : [])) { if (a.playState !== 'running') continue; const tg = a.effect && a.effect.target, b = tg && tg.closest && tg.closest(sel); if (!b) continue; { const r0 = b.getBoundingClientRect(), ce = document.elementFromPoint(r0.left + r0.width / 2, r0.top + r0.height / 2); if (!ce || !(b === ce || b.contains(ce) || ce.contains(b))) continue } /* a moving button hidden under another layer cannot reach the point */ const r = b.getBoundingClientRect(), m = Math.max(40, 0.35 * Math.max(r.width, r.height)); if (x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m) { window.__rtCov = (window.__rtCov || 0) + 1; window.__rtCovLast = 'moving ' + dsc(b); return 'covered: ' + window.__rtCovLast } }
        return dsc(t) };
      const c1 = chk(); if (c1 === false || /^covered/.test(c1)) return c1;
      return new Promise(res => setTimeout(() => { const c2 = chk(); if (c2 !== c1) return res(c2 === false ? false : /^covered/.test(c2) ? c2 : 'covered: top changed ' + c1 + ' → ' + c2); window.__rtBareTop = c1; window.__rtBareAt = Date.now(); window.__rtBare = Date.now() + 700; res(true) }, 120)) };
const bareCheck = (page, x, y, sel, own) => page.evaluate(BARE_CHECK, [x, y, sel, own || null]);
module.exports = { make, PROBE, BARE_CHECK, bareCheck };
