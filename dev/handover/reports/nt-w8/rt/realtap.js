/* realtap.js — SHARED REAL-TAP LIBRARY (owner rule 25/11 ~05:10Z: robots tap like a real person, never machine clicks).
   tap(page, target, info) — target = Playwright Locator | ElementHandle | CSS selector:
     scroll into view (real wheel/touch scroll of the page, not el.scrollIntoView on the game) → element centre →
     document.elementFromPoint hit-check (must be the target or its descendant; a few probe points inside the box) →
     touchscreen.tap (touch devices) / mouse.click (desktop/iPad pointer) at that point.
     Covered / off-screen / zero-size → logs «DEAD BUTTON» {screen,label,cover,shot} and returns false.
   NO .click() / dispatchEvent / game-function calls anywhere here: page.evaluate is used ONLY to READ (rects, hit-test).
   opt.ignoreCover = RegExp of transient hint popups (e.g. /kpop/) that a tap simply dismisses: not a dead button.
   Usage: const RT=require('./realtap.js'); const rt=RT.make(page,{dev:'fold',shots:'/dir',log:fn}); await rt.tap(sel,{screen,label});
          rt.stats() → {taps, dead, deadList[], jsClicks:0}. */
'use strict';
const path = require('path');

/* read-only probe: centre + hit test of the element (runs in the page, changes nothing) */
const PROBE = (el) => {
  if (!el || !el.isConnected) return { gone: true };
  const r = el.getBoundingClientRect(), W = innerWidth, H = innerHeight;
  const lab = (el.getAttribute('aria-label') || el.textContent || el.title || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if (r.width < 1 || r.height < 1) return { zero: true, lab };
  if (getComputedStyle(el).pointerEvents === 'none' || el.disabled) return { disabled: true, lab };
  /* the part a person can SEE: viewport ∩ every clipping (overflow) ancestor; probe points lie inside it */
  let x0 = Math.max(0, r.left), y0 = Math.max(0, r.top), x1 = Math.min(W, r.right), y1 = Math.min(H, r.bottom), sc = null;
  for (let s = el.parentElement; s && s !== document.body; s = s.parentElement) { const cs = getComputedStyle(s); if (/(auto|scroll|hidden|clip)/.test(cs.overflow + cs.overflowX + cs.overflowY)) { const q = s.getBoundingClientRect(); x0 = Math.max(x0, q.left); y0 = Math.max(y0, q.top); x1 = Math.min(x1, q.right); y1 = Math.min(y1, q.bottom); if (!sc && /(auto|scroll)/.test(cs.overflowY) && s.scrollHeight > s.clientHeight) sc = { l: q.left, t: q.top, r: q.right, b: q.bottom } } }
  /* label side first (odds chip «Rất vững» / «!» / legend triggers usually sit on the right or centre) */
  const pts = [[.14, .5], [.5, .5], [.3, .5], [.86, .5], [.5, .3], [.5, .7], [.7, .5], [.5, .12], [.5, .88], [.3, .85], [.7, .85], [.3, .15], [.7, .15]];
  let cover = null, anc = false, chip = false;
  /* TOUCH ADJUSTMENT (s7/s9 «Kính sự phòng báo tin» loop, 25/11): on a touch screen the browser snaps a tap to the nearest clickable inside the finger
     radius — a tap on the option NAME next to the odds chip «Rất vững» (.kodm role=button) opened the odds legend every time. A person's finger lands
     clear of the small chips: probe points closer than NEAR px to a nested clickable / chip are skipped (fall back to them only if nothing else). */
  const NEAR = 24, kids = [...el.querySelectorAll('button,[role=button],a,[data-tip],[data-help],[data-leg],[data-kzoom],.kaart,figure.ksart,.ksart,.kodds,.kodm,.kgl,.kchip,.kqm,.khelp,[class*=odds],[class*=legend]')].filter(c => c !== el).map(c => c.getBoundingClientRect()).filter(q => q.width > 0 && q.height > 0);
  const near = (x, y) => kids.some(q => x > q.left - NEAR && x < q.right + NEAR && y > q.top - NEAR && y < q.bottom + NEAR);
  let nearOk = null;
  if (x1 - x0 < 3 || y1 - y0 < 3) return { lab, clip: true, sc, top: r.top, bottom: r.bottom, cover: 'clipped by its scroller / off-screen', off: r.bottom < 0 || r.top > H };
  for (const [fx, fy] of pts) {
    const x = x0 + (x1 - x0) * fx, y = y0 + (y1 - y0) * fy;
    if (x < 1 || y < 1 || x > W - 1 || y > H - 1) continue;
    const t = document.elementFromPoint(x, y);
    if (t && (t === el || el.contains(t))) { /* never land on a nested info chip / legend trigger inside the button (it opens its own popup) */
      const inner = t.closest('button,[role=button],a,[data-tip],[data-help],[data-leg],[data-kzoom],.kaart,figure.ksart,.ksart,.kodds,.kchip,.kqm,.khelp,[class*=odds],[class*=legend]');
      if (inner && inner !== el && el.contains(inner)) { chip = true; continue }
      if (near(x, y)) { if (!nearOk) nearOk = { x, y, lab, ok: true, near: true }; continue }
      return { x, y, lab, ok: true } }
    if (t && t !== el && t.contains(el)) anc = true;
    if (!cover && t) { const c = t.closest('[id]'); cover = (t.tagName.toLowerCase() + (t.id ? '#' + t.id : '') + (typeof t.className === 'string' && t.className ? '.' + t.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (c && c !== t ? ' in #' + c.id : '')).slice(0, 80) }
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
    if (!p.ok && !p.gone && !p.disabled && p.cover && !p.anc && !p.clip) { await page.waitForTimeout(2500); const p2 = await h.evaluate(PROBE).catch(() => ({ gone: true })); if (p2.ok || p2.gone || p2.disabled) p = p2 } /* a scene / dawn frame passing over: settle once */
    if (!p.ok && info.wait) { const t0 = Date.now(); while (!p.ok && Date.now() - t0 < info.wait) { await page.waitForTimeout(400); p = await h.evaluate(PROBE).catch(() => ({ gone: true })) } }
    if (p.disabled) { log({ k: 'disabled', screen: info.screen, label: info.label }); return false }
    if (p.gone) { log({ k: 'gone', screen: info.screen, label: info.label }); return false }
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
  return { tap, stats: () => ({ ...st, deadList: st.deadList.slice(-200) }), touch, PROBE };
}
module.exports = { make, PROBE };
