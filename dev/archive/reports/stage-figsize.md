# stage-figsize HOTFIX — report (worker session_01UV1SziFt6yExRxFGSGFA24, 11/16/2026)

Branch **review/stage-figsize @ 2f071fe8** = review/stage-pets-r7-r1 (r7 6aaca31a + r1 cea021e3) + origin/main b53ba8b9 + this fix. SẴN SÀNG KIỂM 2f071fe8 (all items incl. 5).

## 1. Root cause (owner photos refs/owner-figsmall-ipad-1116.jpg, owner-figsmall-fold-1116.jpg, owner-eunuch-clip-fold-1116.jpg)
Measured in-frame (host mode, rot.js design canvas), 392fff60 vs 1aa0edb2, her + 1 maid (2 slots):

| device | 392fff60 fig/stage | 1aa0edb2 fig/stage | alone (both) |
|---|---|---|---|
| Fold 755x1000 (590x820 → 590x852 page) | .51–.62 | .54 (.43 with a wide-sleeved consort) | .797 |
| iPad 1180x820 | .60 | .59 | .797 |
| iPad 1366x1024 | .60 | .57 | .797 |
| Fold cover 412x1058 | .54 | .50 | .797 |

- NOT page-scale: --kvh = 8.2 px = the old 1vh at the 820 design height; stage box 582x591/620 → 582x623.
- Cause = j59 slot fit (live since review/stage-side, before 392fff60): 2 people at 1/3·2/3 of the free width left of the side column (434 px) → slot spacing 125 px; fits() shrank EVERYONE until each figure's whole visible art (sleeves included) was ≤ 125 px (J59HMIN down to .32×) → .5–.6 of the stage, wide sleeves smallest (her 45 %). Her 19:54Z ruling (clothes may overlap, fixed slots, never shrink) removed the reason; r7 already dropped the shrink.
- Giant clipped eunuch + name over the place title + blank side-card portraits (Fold shot 3) = first load after the build: pictures now come from the CDN (8adfd886) and j59lay returned early while any figure was loading, leaving raw unscaled tokens on screen; a portrait whose first CDN request failed was swapped for the (empty) initials for good.

## 2. Fix (KIT FIRST: jkit KIT_SLOTS / kitSlotIn + KIT.md 33.12 + kit page sample §33.12; j59 uses them)
- People at KIT_FIG .79 always (r7: no width test, no shrink).
- KIT_SLOTS.rail = 66 px: the left rail strip (#krail) is never a slot, always (also the rail's measured edge + 5 if wider) → Fold slots move RIGHT 113/323 → 156/337 px of the 582 px page; no head under a rail button (r6 FAIL 1, 844x390).
- kitSlotIn(cx,l,r,lo,hi) + KIT_SLOTS.edge = 4: a figure whose visible art would leave the stage or reach under the side column is pulled in by exactly that much; its pet follows; a figure that fits never moves.
- j59wait (unplaced figures hidden) 6 s → 15 s (CDN first load).
- kitImgErr: a failed picture is retried twice (1.5 s, 4 s) before the initials fallback — every pcPort portrait (side cards, header, cards).
- r7-r1 review finding 1: a stranger ("Người lạ") shows no pet (j59pr uses j59known, figWho first).
- dev/test/stage-slots-fixed.js: expected centre = kitSlotIn(slot) ± 2 px, art inside lo..hi, pet spot from the owner's real centre.

## 3. Whole group scan (stage-slots-fixed.js: her room, Ngự hoa viên, Thái y viện, every view by swipe)
| size | before (r7-r1) slots | after slots | fig/stage | cut | result |
|---|---|---|---|---|---|
| 590x852 (Fold page) | 113 / 323 | 156.5 / 337.5 | .79 | none (wide consort pulled in ≤ 35 px) | PASS |
| 755x1000 direct | 113 / 323 | 156.5 / 337.5 | .79 | none | PASS |
| 1180x820 | 113 / 323 (her sleeve -17 px cut) | 156.5 / 337.5; spread 184/420/656/892 | .79 | none | PASS |
| 1366x1024 | — | spread 204/481/758/1035 | .79 | none | PASS (1 flaky swipe run, rerun PASS) |
| 844x390 direct | — | — | — | none | PASS |
| 412x1058 direct | — | — | — | art wider than the 193 px free width | FAIL in direct mode only — not a device layout: on the device rot.js rotates 412x1058 to the 1180x820 spread (host-mode measure: .79, nobody cut) |

Host mode (real device path): Fold 755x1000 .79 (l 63 / r 168 px from edges), 412x1058 .79, 844x390 .79, nobody cut. Shots looked at (scratch /home/user/wt/fsz/ssf, not in git).
Other figure places touched by --kvh (dialogs kesimg, kidfig2, zoom): unchanged by this branch.

## 4. Checks
- quickcheck.sh: PASS (open 1227 ms, old save ok, perf new/live render 316/371 ms).
- coop-e2e.js (live Worker): run 1 55/59 (start-of-room 'friend in rivals' + 'A frozen when B left' timing), run 2 **59/59**, 0 page errors.
- kit-conform 755x1000: 89 CONFORMS / 14 MISSING; r7-r1 base 88–89 / 13–14 (same noise).
- build_site OK, img-allowlist OK, node --check OK.

## 5. iPad header top cut + strip under the tab bar (owner photo CDN img/_review/owner-refs-1116/owner-ipad-header-tabs-1116.jpg, 4:3 iPad, home-screen app)
- Photo: the iOS status bar band covered the top ~36 design px of the frame (buổi dots + 'Chưa điểm trang' row gone, top of her name and the seal cut, Bạc/Sức values pushed under the stage edge) and a paper strip sat under the tab bar.
- Not page-scale: in the 1180x820 design canvas the header (132 → 129 px) is never clipped. Cause = rot.js host geometry ignored env(safe-area-inset-*) and centred the 1180x820 canvas on the 4:3 screen (1366x1024: 37 px strip top and bottom); same in 392fff60.
- Fix (rot.js, KIT §0 host): the frame is fitted into the screen minus the safe-area insets (top / left / right; status bar never covers the game) and, in landscape, stands flush on the SCREEN bottom (tab bar flush, the 4:3 spare strip goes to the top beside the status bar; the home-indicator line may sit over the lowest px of the 44 px tabs). Narrow rotated phones unchanged.
- dev/test/host-safe-area.js (insets injected via window.__kinsetsTest): 1366x1024 (24/20 and 0) frame 0,75..1366,1024; 1180x820 with 24/20 → 17,24..1163,820 (s .97); 1180x820 plain 0,0..1180,820; 1024x768; 755x1000; 412x1058 rotated — PASS. quickcheck PASS after the change.

## Handover
Context ~16 % at stop. Worktrees: /home/user/wt/stage-figsize (branch), fs-old (392fff60), fs-r7, fs-r7r1, fsz (scripts + shots) — delete after review.
