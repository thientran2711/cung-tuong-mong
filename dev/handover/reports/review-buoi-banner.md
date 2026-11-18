# REVIEW buoi-banner (8b50182 -> r6 ece0403) — PASS

PRIORITY #1 CHECK: OD line "(18/11 ~06:25Z UTC, ROOT-46 chat; CANON OVERWRITE" read verbatim; KIT §74; brief buoi-banner.md (old plaque approach, VOID); no other review/* branch touches jbuoi.js.

## Verdict: PASS ece0403 (review/buoi-banner-r6 = 8b50182 merged onto live origin/main 4dcd50e, fast-forwardable)
8b50182 was not a descendant of live main (main moved 550dd1b -> 4dcd50e, mood HUD). Merged on r6: only index.html + sw.js conflicted (generated); took main's, rebuilt with dev/site/build_site.sh. Tree vs origin/main = jbuoi.js + KIT.md §74 note + index.html + sw.js only (4 files, +21/-26). Plaque fully gone.

## Checks
1. Diff vs 550dd1b was only the intended change. Removed: .btr-tint, .btr-wash, .btr-vig (+ their animations). Kept byte-identical: sky band, hills, sun/moon + phase sprite, mist, first light, title plate, icon, seal, festival name, season/festival variants, timings (kitPace), BTR_POS arc. Added: BTR_OP=0.8 (hook window.__btrOp), opacity set on #buoitr.
2. Shots (own run, REAL=1, local server) fold 755x1000@2, ipad 1180x820@2, ipad-pro 1366x1024@2: UI (header, left scene, cards, tabs, bottom bar) visible and unmoved under the animation; band + title lie on top at 0.8. Looked at fold-b1, ipad-b3, ipad-pro-b0.
3. Input: #buoitr stays pointer-events:none; tap-to-skip existed live and still works (gone <=0.6 s, click still reaches the page, clicked:true at all 6 viewports). Nothing new leaks.
4. Gọn: was a 260 ms tint flash (backdrop only, nothing left once removed). Now the title only, ~0.7 s (documented in KIT §74). Single child, goes away. Judgement call by the worker, consistent with owner ("whole animation, never plaque" applies to the full mode; Gọn had nothing else to show). Main may revert to nothing if the owner prefers.
5. Game logic: nextBuoi sync (S.buoi new, overlay present) OK. Co-op: buổi change is a local overlay called from the same curtain() path, no state/network code touched (reasoned from the diff; coop e2e not re-run).
6. Tests: buoi-transition REAL=1 6 viewports FAIL 0 (also again on the merged ece0403, fold+ipad FAIL 0); buoi-art FAIL 0; buoi-moon FAIL 0; one-core-guard PASS. Old-save: no save/state code in the diff; not re-run.

## Notes for MAIN / owner
- At 0.80 the sky band is still a clearly visible soft box (its own gradient + hard top/bottom edge) and the text behind it is hard to read for ~2.5 s; that is the approved band, only less opaque than before. If the owner wants the UI more readable she should pick 70 (BTR_OP=.7 or __btrOp).
- The review shots folder img/_review/buoi-banner/ is not in the branch (shots stay off git); I did not touch/wipe anything.

---
# ROUND 2: review/buoi-banner 3d675bd -> r7 b12fccb — PASS

PRIORITY #1 CHECK: same OD line + owner 06:35Z change list (sub line bigger/darker, group flush to stage top, feathered band); no other branch touches jbuoi.js.

Verdict: PASS b12fccb (review/buoi-banner-r7 = 3d675bd + merge of live origin/main 97de885, generated files rebuilt; fast-forwardable). 3d675bd itself lacked 97de885 (main moved while the worker finished), so I merged on r7. Tree vs main = jbuoi.js + KIT.md §74 notes + index.html + sw.js only.
- Flush: .btr-stage padding-top = --btr-top (.stage top - 2 px, measured at open), justify flex-start. Looked at ipad-b2 and fold-b3: title, icon, seal, sub line and band start right at the stage top, centred. Header / stats / tabs / bottom bar unmoved and visible.
- Feather: vertical mask on .btr-sky (0 -> 26 % -> 72 % -> 0), box-shadow line removed; no hard box edge any more.
- Sub line: bold, 1.3-1.9 rem, full-strength ink + soft halo; readable on the shots, though over busy cards (ipad-b2) it still competes with the text behind it at 0.80.
- Backdrop removal, Gọn = title only (~0.7 s), tap-skip, kitPace timing: as in round 1. Art/motion/season/festival unchanged.
- Tests on b12fccb: buoi-transition REAL=1 fold+ipad+ipad-pro FAIL 0; buoi-art 0; buoi-moon 0; one-core PASS. Co-op e2e / old-save not re-run (no state/network code in the diff).
- Note: in the Luân hồi (rebirth) picker the buổi overlay is not visible in the test shot (the picker sits above z 36 like live); unchanged from live.
