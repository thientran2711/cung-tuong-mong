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

## REVIEW — B EXPRESS BIG rv session_01N1tNP2KxFM4UDdFweHAZz1 (opus, fresh), 11/26/2026
PRIORITY #1 CHECK ('fix-7|coop-clear|kroulw|kxcatch|next-dead'): OD 0 | ledger 0 | claims = this rv + fixer 3VDtpUy2 | main 3 (j74 title guard, jload first-run rule) | review/* coop-clear-kroulw e5453580, robot-coop-fix-7-r2-rv 6ad6631f | archive 0.
**VERDICT: PASS — review/robot-coop-fix-7-r3 a32a931d98140d35624d41a590b5f9fb58578583, FF on LIVE 5e013076 (LIVE unmoved at verdict). No commit added by rv.**

### Brief checks
1. **Test-only — proven.** Every picture-wait cover is a VISIBLE kit screen, never an invisible swallow: #kroulw = kitBackdrop roulette + «Luân hồi» header + CTM_WAIT.rebirth, ≤ 8 s then removed (jk2b:757-763); #klife = kit scene + kitProgress bar + note, «Vào cung ngay» after 6 s, ≤ 25 s, fades + removed (jload:300-325); #kload = first-run screen, own button. A real player's tap on them does nothing while she sees a wait screen (correct: the cover blocks visibly).
   Real-pointer run (own script, mouse.click at ☰'s centre, Fold host + iPad guest, guest reload → «Cùng hảo hữu» › «Trở lại phòng», no lib taps after the reload): under the finger = #klife cover 1.0–9.4 s (☰ not reachable, cover visible), then one tap on #kxcatch WHILE the result card #rtoast was on (opacity 1) = KIT 32.10 «the tap is spent on closing», then the next tap opened the co-op life menu «Trở lại cuộc chơi / Rời phòng / Sổ luân hồi / Bảng vàng / Thiết lập» + kit ✕; ✕ → back in the running game, room kept; host Fold ☰ → same menu. REALTAP PASS, 0 page errors.
2. **Lib wait bounded.** TAP returns 'x' only while a cover is in the DOM (covers self-remove at ≤ 8 s / ≤ 25 s, «Vào cung ngay» tapped when offered); every bot loop stays bounded (ctl clear n=40 × 250 ms; others their own n). Slow-image runs finished normally (no hang). Negative control = same tree with eda56acc's lib, CDN images +6 s, guest iPad: **73/82 FAIL** = the owner shape («guest B-ipad: taps ☰ · C3 menu [] · taps the menu ✕» + C7 ×6); with this lib **82/82**.
3. **ONE rule each (law 11).** 0587bad7 = cherry-pick of e5453580, identical diff (content in; not the same object id — harmless); lib has ONE kroulw line inside ONE «1a picture-wait covers» block. Title guard: ONE (j74 tgBlank/tgFix/tgSoon); jload:114 is the first-run screen's own button rule on LIVE, a different element. j74/jslots/jcooplobby byte-identical to fix-7-r2-rv; index.html reproduced by assemble.py (no diff).
4. **No images in git** (diff vs LIVE: 0 image files; no img/_review in tree). CDN img/_review/fix7-r3/ (2 objects) **wiped** by rv (404 now). rv shots outside git, deleted.

### Laws touched
4 no number · 7 wording unchanged (fix-7 rv'd) · 9 no UI/CSS change · 11 whole cover family in the one shared lib · 12 Fold 755x1000@2 + iPad 1180x820@2 shots looked 3× (guest iPad life menu, host Fold life menu, after-✕): no cut text, no overflow · 13 check line · 14 no second guard.

### Gates on a32a931d (local Worker wrangler dev --local :8791)
| gate | result |
|---|---|
| coop-title-leave Fold host / guest iPad (COOP_SWAP unset) ×2 | 110/110, 110/110 |
| coop-title-leave iPad host (COOP_SWAP=1) ×2 | 110/110, 110/110 |
| ctl CDN images +6 s, guest iPad / guest Fold (CTL_SOLO=0) | 82/82, 82/82 |
| same, eda56acc lib (negative control) | 73/82 FAIL (owner shape) |
| title-never-bare / MUTATE (tgFix → return false) | 18/18 / 8/18 FAIL (G2–G6 bare) |
| coop-e2e SWAP unset / SWAP=1 | 143/143 / 143/143 |
| coop-keymove-unit | 12/12 |
| sangbuoi-held (file://) | ALL PASS, 0 FAIL |
| button-crawl --fast Fold (in quickcheck) / iPad | GATE PASS «Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng]» + «Lui» PASS / 80/80 PASS, GATE PASS |
| real 2-seat realtap (above) | PASS |
| quickcheck ALONE ×3 | open ~2.1 s, old save ok every run; run 1 core G4 95-next-dead FAIL 3 (jdayq S.mg heal) → rerun 2/2 PASS r3 + 2/2 LIVE; run 2 G4 92-look-dedupe FAIL 1 (mood seal) → rerun 3/3 PASS r3 + 3/3 LIVE; run 3 core gates PASS, perf buổi median 5255/2310 |
| perf buổi A/B (rv) | buổi time is bimodal by the random life: ~2 s when the turn queues no card, ~6–9 s when it queues one — on BOTH builds (LIVE runs 4751, 5253, 6273, 4634 in the gate too). Same CPU 4x, global nextBuoi, 8+8 alternating: r3 [2282 9518 4288 3914 9900 7696 8002 5971] vs LIVE [7978 7124 8020 6448 6568 1938 2763 6844], medians ≈ equal. Branch adds no hot-path work (tgBlank short-circuits on T.hidden). Not a regression; the gate's median over random lives is noisy (note for the perf-gate owner: fix the life or split by cards). |

### NEW finding for Foreman B (pre-existing, SAME on LIVE 5e013076 — not this branch; needs its own lane)
**F1 co-op rejoin soft-lock**: host still on her first «Thân phận kiếp này» card (co-op pick buttons [data-kcp]); guest reloads → title → «Cùng hảo hữu» › «Trở lại phòng» → guest sits on «Mời hảo hữu · 3 · Cùng chơi … đang vào cuộc» (COOP open, peerOnline, playing, COOPW.on, title up, __cuxBoth 'join') for 60 s+; host's card taps do nothing (waits for the guest); the panel's ✕ LEAVES the room (host freezes «Đợi hảo hữu trở lại»). Repro 5/5 on r3 and 2/2 on LIVE whenever the host card was open; 0 when the host was already in the game. Repro script: rv realtap.js PROBE2 (described here; script not committed).
F2 (wording, pre-existing, fixer noted): life-menu sub-line «Hảo hữu: chưa gặp mặt» while the friend is in the room (jslots friendTxt).
