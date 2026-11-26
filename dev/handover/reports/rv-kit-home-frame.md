# rv-kit-home-frame — SMALL kit review of review/kit-home-frame daa31a5e (on LIVE 3af7896e)

PRIORITY #1 CHECK: OD owner-bug family ob-ngoaicung (pre-palace frame, rec B) · main 3af7896e · review/kit-home-frame daa31a5e (2 commits straight on top of main, no merge needed) · claims KK40 · KIT §4.3a + KIT_REQUESTS K-FRAME-HOME read · git grep of KIT_HOME_FRAME / kitNoCrest / kitPrePal: only j60, jk2b, jhcpor (no second copy elsewhere).

## VERDICT: SMALL PASS daa31a5e

### 1. Consistency scan (law 9/11) — PASS
Every portrait of her goes through kitDecor (gem/frame/bg) + pcPort (crest) + jhcpor (headroom); all three are patched at the one place, so every surface follows one rule:
- header portrait `#me-p` (tabs act/map/harem/love/kids/bag/skill/fate scanned): no .kcrest, no .kgem at home.
- identity card (`#mb`, big frame): no crest, no gem; origin medallion (.kemb) + mood seal (.kemo) stay.
- small mdH avatars: same pcPort cell → same rule. Hậu cung / popups / co-op: she has no palace row at home; kitNoCrest also covers her face object (`f.w[0]==="me"` + rank `cN`), so a face built for her elsewhere gets the same rule. In the palace (kc false) crest + gem return (checked: frame-consort-2 + crest + gem).
- Frame from ONE table KIT_HOME_FRAME[kc2D()]: tiểu thư "" → consort-0; thôn nữ dan → consort-0; nc (bd/pf map to nc via KC2K) → frame-princess + bg-princess. Verified on real starts.
- jhcpor crest headroom only when a crest is really drawn → no empty gap above the frame.

### 2. Real new-game starts — PASS
Real start + home road of tt (tiểu thư), cnv (thôn nữ), nc, bd, pf (Công chúa); Fold 755x1000 (all) + iPad 1180x820 (tt, nc). Body-text scan on home + 8 tabs + identity card: no NaN / undefined / [object]. No page errors. (nc/bd/pf → frame-princess, cnv/tt → frame-consort-0, never crest/gem.)

### 3. Docs — PASS
KIT.md §4.3a present (rule, table, helpers, test, K-FRAME-HOME swap steps); kit page sample «§4.3a» (jkitpage); KIT_REQUESTS K-FRAME-HOME gives the art spec (frame-home / frame-dan, 550x1037, opening 384x506 @ (83,214)). No player-visible words added.

### 4. Tests — PASS
- `node dev/test/kit-home-frame.js index.html`: KIT-HOME-FRAME PASS (8 checks x 2 devices = 16 PASS; the brief said 13, the count is per device).
- Old save: `caoly-oldsave.js` (princess life saved MID-ROAD on main 3af7896e, loaded in this build) 14/14 PASS, no page errors.
- Not re-run: the hourly quick-check batch (coordinator tier); the diff touches only the portrait path (j60, jhcpor, jk2b, jkitpage, KIT, KIT_REQUESTS, the test, built index/assets/sw).

### 5. LOOKED at the shots myself (Fold 755x1000, iPad 1180x820) — PASS
- tt Fold: header + identity card show the plain consort-0 frame, origin medallion top-left, mood seal; no crest / gem.
- nc Fold identity card: frame-princess (its own painted art, existing), no rank crest / gem.
- nc iPad home screen: header portrait clean; tt iPad identity card clean.

### Nits (non-blocking)
1. In `kit-home-frame.js` the 755 shot `home-755.png` is taken while the title cover is still up (shows the cover art, not the game); assertions are on the DOM so they stay valid — give the cover one more tick before the screenshot.
2. The test's «nc»/«dan» kinds override `S.kc.kd` on a tiểu thư life; real nc/bd/pf/cnv starts were verified in this review — consider adding them to the test.
3. Until K-FRAME-HOME art lands, tiểu thư and thôn nữ share the plain consort-0 frame — as specified.
