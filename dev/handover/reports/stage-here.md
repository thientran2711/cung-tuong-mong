# stage-here — report (MAIN ROOT-54 UI worker, session_01Rc5AsK9y5NbRATifWtFqG7, depth 2, START_CTX ~4 %)
PRIORITY #1 CHECK ('nền sân khấu' / 'đóng cửa' / 'goTo' / 'walk-spill'): OD 18/11 ~19:45Z (5), ~19:55Z, ~20:00Z + place-stage OD 04:50Z–06:05Z | main jplfs kplAway + jk3 k3Phone (one-page shell while away), j6 renderStage (already paints S.place), j41 accessOf/ACC_DAY/B4L (hours), jplst kitLineToast (tai mắt chip), jrail kitStageRail (glyph/busy/badge), j9 `const u=used;goTo(k);used=u` (free move idiom) | review/place-stage LANDED on main (built on it) | claims none
Branch `review/stage-here`, head **e8e5afe** (r1 af77e99 + r1b 4005ab2 + merge origin/main 13bb8c8).

## (1) Why tabs lost the stage / showed the room
renderStage always painted `placeOf(S.place)`; the fault was the SHELL: KIT 33.10 (owner 16/11 19:15Z "Hành sự stage = her room only") forced the ONE-PAGE shell on iPad whenever she was away, so every tab became a full-page panel with no stage beside it (only her room ever had the split stage). Fix (one source = S.place, kit shell only): jk3 `k3Full()` = away AND (one-page screen OR the place page itself `K3SH.home`). iPad: the place page stays the full-screen painting; any tab = normal spread, stage (her place) | panel. Fold: unchanged model (panel page per tab, "Về <nơi>" = her place painting). Room returns only at the day turn (j3) or goTo("home"). KIT 33.10 overwritten in place (law 14). Side fix (same group): jplst entry-line toast no longer re-fires when coming back from a hidden stage.

## (2)+(3) Closing alert (jstagehere.js, KIT §77.2)
`stClose()` from the ONE access rule: last khắc of the buổi (`BAL.time.khac-used<=1`, buổi < B4L) and `accessOf(S,k)` for the next buổi says no → "sắp đóng cửa"; or closed now and she stayed → "đã đóng cửa". Kit only: kitStageRail item `closing` (glyph "!" §77.1 glyph mode + `kbusy` motion + `kbadge` seal dot), stays until she leaves / it opens; first time per buổi (place + state) the tai mắt chip `kitLineToast` ("Ngự hoa viên sắp đóng cửa sau khắc này (đóng cửa tối)."), tap icon = chip again. No new number. **KIT REQUEST K-ICO-ALERT** filed (painted `img/kit/ico-alert.webp`, Foreman C); swap is one line.
(4) Staying past closing: no new penalty; existing j41 nextBuoi stay rule keeps her inside without a check. **GAP FOR MAIN**: nothing happens to her for being in a closed place (no "caught" roll) — owner said drama; needs a ruling/design, not invented here.

## (5) Acts bound to a place (OD ~19:55Z + ~20:00Z)
jstagehere `ACT_PLACE` + `act()` wrap: after the act, `accGrant` + goTo with the walk khắc refunded (one cost), deferred until the result cards close (same buổi only). Audit `node dev/test/act-place-audit.js` (28 deck acts):
| act | place | before: moves? | after: moves? | stays | stage | charged once (spent = card cost) |
|---|---|---|---|---|---|---|
| Thỉnh an Thái hậu | tn | no | yes | yes | yes | 2 = 2 |
| Thỉnh an Hoàng hậu | kn | no | yes | yes | yes | 2 = 2 |
| Hối lộ Kính sự phòng | ksp | no | yes | yes | yes | 2 = 2 |
| Sang Thái y viện xin bắt mạch | tyv | no | yes | yes | yes | 3 = 3 |
| Xem sổ nguyệt sự | ksp | no | yes | yes | yes | 1 = 1 |
| Xem lén sổ nguyệt sự | ksp | no | yes | yes | yes | 2 = 2 |
| Nhờ Thái hậu nói giúp / Xin rút thẻ bài | tn / ksp | no | yes (bound; story-gated in the run) | yes | yes | 1 = 1 |
| Mời thái y bắt mạch | — invite (stays) | no | no | — | — | 1 = 1 |
| 18 home/self acts (Điểm trang, Nghỉ ngơi, Đọc sách, Dưỡng nhan, Giả bệnh, Trò chuyện với cung nữ, maid errands…) | none | no | no | — | — | yes |
Person acts: j2 `talk()` only targets people ON her stage (curPeople) = already place-bound; Hậu cung / court cards walk via j21 visitPal/goTo. **GAPS FOR MAIN**: "Cầu tự ở Phụng Tiên điện", "Múa trong yến tiệc" name places that are not on Dư đồ; "Cài tai mắt" (talks to another palace's maid) — remote by nature or a trip? Home acts ("Nằm nghỉ trong tẩm cung") still usable while away. Maid errand scene (OD 20:05Z) not in this job.

## Tests
- `DEV=fold|ipadAir node dev/test/stage-here.js` (6 cases × 18 tabs = 114 rows, seeded, consort road): **fold 0 faults, ipadAir 0 faults**, old save ok, no h-overflow, no page errors. BEFORE (main, iPad): 85 tab rows "panel without stage" while away → 0.
- `DEV=ipadAir node dev/test/stage-here-scan.js`: every place (19) × act/rel/inv = her place picture, visible; hours table: vuon/tyv/cnh/nvp NEXT at chiều last khắc, CLOSED tối; kn NEXT at sáng last khắc; summons-only places (thu/dtd/ttp/acs/dc) CLOSED without a pass.
- `node dev/test/act-place-audit.js`: 8 bound, 0 bad.
- quickcheck (e8e5afe): **QUICKCHECK PASS** · 214 s · old save ok · core gates PASS · perf new/live: render 259/241 ms, tab 575/456 ms (iPad now paints the stage beside every tab while away — expected), buổi 1477/1461 ms.
## Shots (CDN write refused 403 → dev/handover/shots/stage-here/ on this branch per brief; Fold 755x1000 + iPad 1180x820, looked; delete after verdict)
own-fold-1-place.jpg (Fold, Ngự hoa viên painting, "!" + chip) · own-fold-2-act.jpg · own-ipadAir-2-act.jpg (iPad Hành sự: stage = vườn | cards, "!" + chip) · own-ipadAir-3-rel.jpg · ipadAir-tn-closing-act.jpg · ipadAir-vuon-closed-act.jpg · ipadAir-palace-rel.jpg
Note: the tin báo toast (pre-existing §87 position under the top bar) sits over the sub-tab row / name plaque for its 5 s.
