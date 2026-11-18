# facefx-all — PASS 2cc69dfaf4 (review/facefx-all-r2, parent main a363cc14a). One face-mark rule for everyone (+ hủy dung, slap tiers 1–3); 6092 fit rows on the CDN; ~130 faces checked.
- BUG ON MAIN (UI, for the main chat): jbook.js defines kitPortrait() as an orientation check and overrides j60 kitPortrait(p,{size}), so it returns a boolean. The podium fallback at j90.js:30 uses it. Fix: rename the orientation function.
- Then slap-mg (Foreman D, §79) can be reviewed on top of this.
