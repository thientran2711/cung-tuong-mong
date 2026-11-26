# PLACE-CLOSE — report (worker session_01Rc5AsMa9g4rpa9ima1j9qH, depth 1, START_CTX ~3 %)
PRIORITY #1 CHECK: OD L2605–2606 (26/11 ~14:00Z place close + MAIN rec), L2530/2537 (25/11 place-rules), L1930–1931 (ONE NOTICE SYSTEM) | main f573dc94: jstagehere.js stClose/chip/stayRoll, jplrule.js homeWay/homeGo/plHome, j8 punish + BAL.punW (HOME-WAY), jnotice kitNotice | review/home-way-r6 (landed) | claims: KK44 (kit chip states). Reused: kitNotice chip, homeWay/homeGo, BAL.punW lite, accSneakO. Nothing rebuilt.

Branch **review/place-close** from LIVE f573dc94 → **225b6582** (394b2516 logic · c9b75719 tests · 38524cd4 build · 225b6582 look script + kit request).
STATUS: **LOGIC READY · LOOK BLOCKED on KK44 K-CHIP-PULSE** (pulse / red / hold / chipGo + hold-chip priority). Not LOOK READY.

## What changed (canon overwrite of «roll at the buổi turn», jstagehere.js)
1. Last allowed khắc = the last khắc from which the walk home still fits in this buổi (left ≤ max(1, travel home)), so the chip's tap can take her home. kitNotice line «Nơi này sắp đóng cửa, mời tiểu chủ rời đi», spec state:"pulse", hold, chipGo + go=homeGo, goLabel=homeWay().label («Về phòng · N khắc»). Panel text names the grace (BAL) + light price + odds word.
2. GRACE (S.plGrace, optional): the buổi turn punishes NOTHING. Grace end = max(BAL.placeClose.grace=2, spill carry + BAL.placeClose.leave=1) → a talk that spilled counts inside the grace and never gets cut. Chip «Đã quá giờ, mời tiểu chủ rời đi», state:"late"; panel «còn N khắc ân hạn…».
3. Grace used up (render with no card open) → ONE caught roll (accSneakO, the odds the notice names); caught = Danh −BAL.sneak.danh + punish weight BAL.placeClose.sev=0 (NHẸ: khất bổng / cảnh cáo), walked home (plHome), said in a kit notice (closepen:…). NO dialog: the «Bị bắt» card is gone; punNote's panel is skipped for this path (window.__punQuiet, jpun.js). Guard: a weight that would confine falls back to NHẸ; confined restored if anything set it.
4. No fault ⇒ no punishment (home-way rule kept): unwarned or no way home all grace → cung nhân walk her home at grace end, kit notice, no loss, no card. A second closed buổi in a row has no new grace (roll at once).
5. BAL.placeClose {grace:2, leave:1, sev:0} in jbal.js (ONE CORE). No typed number.

## Bug «talked past the buổi → cấm túc»
Reproduced on LIVE with a seeded talk past closing at Đức Thọ cung: punishment came at the buổi turn with 2 dialogs (thị vệ «Bị bắt» + «Phạt nhẹ»). LIVE is already NHẸ (home-way); the owner's cấm túc matches the pre-home-way stayRoll (sev 1 default). Now: no penalty at the turn, a hard guard, and every path listed below.

## Whole family — every path that ends/judges a visit at closing (python3 dev/test/place-close-scan.py, exit 0)
| path | before | after |
|---|---|---|
| buổi turn inside a closed place (jstagehere) | roll at once; caught = «Bị bắt» thị vệ card + «Phạt nhẹ» panel (pre-home-way: cấm túc) | grace, no loss, red chip |
| grace used up | — | one roll; NHẸ; kit notice; never cấm túc |
| unwarned / no way home | escorted at the turn, «Hết giờ tiếp» card | escorted at grace end, kit notice, no card |
| talk spilling over (j76 carry) | its khắc ate the next buổi, then the roll | counts inside the grace |
| walk spill into a closed place (j9, j76:101) | refused before walking | unchanged |
| new buổi «ngươi vẫn ở» (j77) / cấm túc line (j41) / plSweep / door refusal (jplrule) / day turn (j3) | no punishment of their own | unchanged |
| other overstay punishers in the game | none | none (scan fails on any) |
8 places with hours tested by place-close.js I: vuon, tn, kn, tyv, cnh, nth, pd, nvp.

## Tests (Fold + iPad unless noted)
- NEW dev/test/place-close.js PASS ×2 (A last-khắc chip spec · B seeded talk past closing: no loss, no card, grace end · C NHẸ at grace end, no card, no cấm túc · D leave in grace · E not caught · F unwarned · G long spill · H confining weight refused · I 8 places).
- Updated to the grace rule (canon overwrite): home-way.js PASS, stage-stay.js PASS, place-rules.js PASS (Fold).
- quickcheck: open ok · old save from LIVE ok · perf median of 3, interleaved, new/live: render 227/246 ms, tab 558/545, buổi 1372/1482, tasks>200 ms 34/29 → PASS. Core gate G4 80-dialog-fixed FAIL (kit-dialog-2 «empty Tốn/Được cell»): known, fails on LIVE too (home-way report L149); not touched by this branch.

## LOOK (not uploaded, nothing on CDN to wipe)
Stills taken (dev/test/place-close-look.js, Fold 755x1000 + iPad 1180x820) and looked at: with today's kit the closing chip fades after 5 s, and on the buổi turn the j77 «Sang buổi trưa, ta vẫn ở …» notice takes the one chip slot, so the red chip never shows and a tap opens that notice. Both are kit work → K-CHIP-PULSE (+ hold-chip priority) filed in dev/kit/KIT_REQUESTS.md, KK44 messaged twice. When KK44 lands: rebase, re-run the look script, upload to img/_review/place-close/, LOOK READY to MAIN.

## Handover
Resume: worktree /home/user/wt/pc (review/place-close). Wait for KK44's KIT READY → rebase onto it → rebuild (dev/site/build_site.sh) → DEV=fold|ipadAir SHOT_DIR=… node dev/test/place-close-look.js → tile sheet → cdn_sync img/_review/place-close → LOOK READY → RV.
