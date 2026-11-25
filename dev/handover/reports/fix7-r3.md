# fix7-r3 — fix-7-r2 × SANGBUOI r4 interaction («guest iPad ☰ co-op life menu EMPTY, ✕ fails»)
B FIXER session_01N1tNP3VDtpUy2jB8w7jbKc (opus), depth 5, START_CTX ~3 % of 1M (no rollover needed). Brief dev/handover/briefs/b-fix7-r3.md.
PRIORITY #1 CHECK ('coop life menu empty'): OD 0 | ledger 0 | claims 0 | main 0 | review/* review/coop-clear-kroulw e5453580 (r4 worker's partial fix, REUSED) + lib/roulette.js (same waits, REUSED idea) | archive 0.

## Verdict: SẴN SÀNG KIỂM review/robot-coop-fix-7-r3 a32a931d98140d35624d41a590b5f9fb58578583
= fix-7-r2-rv 6ad6631f (via LC17 stack eda56acc) + e5453580 (r4 worker, #kroulw) + 1f71647a (this fixer, whole family) merged onto LIVE 5e013076 (SANGBUOI r4 + coop-rebirth-stuck).
Code delta vs LIVE = j74 / jslots / jcooplobby (fix-7, unchanged, ONE title guard) + tests + dev/test/lib/coop-clear.js. CHANGE.txt = union (fix-7 line + LIVE's dead «Sang buổi» line); index.html/sw.js rebuilt.

## Root (NOT game code; not r4's dqUi showModal wrapper; not fix-7's title guard)
The shared co-op bot step dev/test/lib/coop-clear.js TAP() returned '' while a full-screen PICTURE-WAIT cover sat over the game, so the bot's
next tap (guest ☰ «Ô lưu») landed on the cover: menu never opened → «menu = []», then «✕» not found. Timing-dependent (CDN picture speed):
r4 shifts timings, B-alone also failed 80/82 once (r4 worker). Family (law 11) = every cover that waits for pictures, no game button reachable under it:
- #kroulw — jk2b kitRoulette picture wait, ≤ 8 s, no button (r4 worker e5453580 caught this one)
- #klife — jload lifeGate, ≤ 25 s, «Vào cung ngay» [data-klife] after 6 s (shows after the C8 reload → C7 «A frozen» cascade)
- #kload — first-run download, «Vào cung ngay» [data-kl]
Fix (ONE place, every co-op bot uses it): visible cover → tap its go button when offered (a player may), else return 'x' so clear() keeps polling.

## Proof — every non-local image delayed 6 s (proof-only preload /home/user/wt/f7r3-proof/slowimg.js, not committed), guest iPad (COOP_SWAP unset)
| lib/coop-clear.js | coop-title-leave (CTL_SOLO=0) | FAILs |
|---|---|---|
| eda56acc (before) | 73/82 FAIL | guest B-ipad taps ☰ · C3 menu [] · taps ✕ (= the reported shape) + C7 ×6 |
| + e5453580 (#kroulw only) | 76/82 FAIL | C7 ×6 (top element #klife after the C8 reload; guest ☰ also failed once on Fold-guest) |
| + 1f71647a (whole family) | 82/82 PASS both hosts (old stack + LIVE merge) | 0 |
NOTE for testers: COOP_SWAP=0 is TRUTHY in coop-title-leave / coop-e2e (`process.env.COOP_SWAP?`) = iPad hosts. Guest-iPad = COOP_SWAP UNSET.

## Gate on a32a931d (LIVE 5e013076 + fix), local Worker wrangler dev --local :8791
- coop-title-leave Fold-host (COOP_SWAP unset, guest iPad): 110/110, 110/110
- coop-title-leave iPad-host (COOP_SWAP=1): 110/110, 110/110
- slow-image proof run guest iPad: 82/82 (base 73/82)
- title-never-bare 18/18; MUTATE (tgFix → return false, TNB_ROOT): 8/18 FAIL (G2–G6 bare)
- coop-e2e SWAP unset 143/143, SWAP=1 143/143
- coop-keymove-unit 12/12
- sangbuoi-held (r4's own test, file://index.html): ALL PASS (Fold + iPad A–H). Old stack eda56acc+fix once printed «755x1000 D: FAIL setup: card already painted» = a test SETUP precondition (r4's net painted the card inside the 200 ms set-up wait), game code there byte-identical to eda56acc where LC17 had ALL PASS; on the LIVE merge ALL PASS.
- quickcheck ALONE (bash dev/tools/quickcheck.sh): QUICKCHECK PASS · open 2025 ms · old save ok · render 257/255 ms, tab 632/600, buổi 1893/4430, tasks>200ms 27/28 · core gates PASS
- button-crawl --fast: fold 80/80 PASS (incl. «Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng]»), ipad 80/80 PASS, GATE PASS 0 faults
- Shots (looked 3×): guest ☰ co-op life menu Fold 755x1000@2 + iPad 1180x820@2 = «Trở lại cuộc chơi / Rời phòng / Sổ luân hồi / Bảng vàng / Thiết lập» + kit ✕, no cut text. CDN img/_review/fix7-r3/ (r3-guest-menu-fold-755.png, r3-guest-menu-ipad-1180.png); verdict giver wipes.
Observation (not this branch's fault, for the rv): the co-op life menu sub-line reads «Hảo hữu: chưa gặp mặt» while the friend is in the room — pre-existing fix-7 wording, worth one look.

Laws: 9 (no UI touched), 11 (whole cover family in the ONE shared lib), 12 (both devices), 13 (check line + reuse e5453580/roulette.js), 14 (no second guard). No game code changed by r3.
