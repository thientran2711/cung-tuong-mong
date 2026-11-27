# E-GAIN3-LIVE — land unit e-gain3 + 3b + 3c on LIVE main (worker report + HANDOVER)

PRIORITY #1 CHECK: OD 26/11 ~05:55Z (law 3) + OD 27/11 ~08:10Z | main LIVE **f28d28b9** (brief said 0562e15f; LIVE moved 00dca386 → f28d28b9, merged both) | review/e-gain3 23b44074, review/e-gain3b 76821d10, review/e-gain3c 8b6eadb9 (E-GAIN3c-RV FAIL → items below) | claims: E-GAIN3-LIVE (this, session_01DgYSWow6S6bMgkTAvopBX4).
KIT CHECK: reuses kaRows/kcls rows, writer class `<span class="g">` (KP12), kitHint (read-only), doorGain / DOOR.rowHint / doorHint (jdoor), DOOR.card / PEND.door dialogs. No kit internal edited (j63, j19, jk2b, jopic, jkring untouched); KIT REQUEST #9–#11 filed. kit-std-scan not run (no CSS / frame / part added).
START_CTX ~5 %. **ROLLED OVER at ~34 %** (see HANDOVER at the end) — the coordinator opens the successor.

Branch **review/e-gain3-live** = review/e-gain3c 8b6eadb9 + LIVE 00dca386 + LIVE f28d28b9 (both merges: one docs conflict, dev/kit/KIT_REQUESTS.md, kept both, LIVE first). Head at handover: **224e8524**.

## A. Brief LAND FAIL items (E-GAIN3b re-review)
### A1. «nàng quý ta −−» as Được (law 3, law 11)
- ONE reading `DOOR.REG` (jdoor.js top): «quý / tin / thương / nể / mến / kính» + «ngươi / ta / bổn cung / nàng», «thiện cảm», «quý nhau»; `DOOR.HOST` = the hostility words. Used by doorGain TG + filter (a regard piece with «−» is never Được; «oán/ghét/thù/ghen ngươi|ta +» neither), DOOR.TGT, DOOR.hintGain. Test copy `DRH.REG` in door-row-hint.js.
- Scan `node dev/measure/regard-scan.js` (every regard/trust wording in dev/build, OLD reading vs DOOR.REG): 17 forms; OLD knew 2 (quý ngươi, tin ngươi), NEW knows all 15 pronoun forms (2 kin words «tin em / quý em» n/a). Table: run the script.
- ROOT of the 9 «Trò chuyện» cards: LIVE's one-tap talk door (jone ONE) picks «Bàn tán về <X>» whose line, when the listener does NOT dislike X, is cost-only («nàng quý ngươi −3», may be told on: j25:10 / jagacts3 gossip). Fix (law 3 + law 1): j9 topicOpts offers it only when `aff(v,third)<0` = the NPC speaker's own gate (jagacts3 cx3 talkGossip). Scan `python3 dev/measure/gain-regard-scan.py <gain-empty.json>`: merged before 8 runs / 2 distinct «Bàn tán …: nàng quý ta −−»; LIVE f28d28b9 alone 4 runs; after **0** (Fold + iPad).
### A2. «Mượn son phấn» (gh) door row
- True gain (jration lxBorrowCard → jrcv RCVK.rougeBorrow): the lender's «Chia» answers = half the box / a little. The old line was a maybe-text the kit read as «Lắm lời, thiện cảm +» (the «thiện cảm +» was «tùy nàng quý ngươi», a condition). New x: `<g>được chia nửa hộp <part></g> (hoặc chút ít cho có) · <willingness> · nàng cũng có thể từ chối, hoặc đem chuyện ngươi hết son phấn đi kể · tùy …` (gain FIRST: optLine keeps the whole x as ONE kit item coloured by its first word → KIT REQUEST #9).
- door-row-hint on the merge after A1+A2 (sha be4aa927): Fold **8727 rows, 0 bad, exit 0**; iPad **8152 rows, 0 bad, exit 0**.
### A3. merged-only empties / LIVE-own empties (gain-empty)
| empty card | LIVE alone (f28d28b9) | merge before | fix |
|---|---|---|---|
| Trò chuyện (gossip, cost-only) | yes | yes | A1 (j9 gate) |
| Nghỉ ngơi › Nghỉ ngơi một lát · nhẹ (deck TIER rows, jone) | yes | yes | jone deckM x = the member's optLine; tier rows carry price + hint (base first, doorHint when the base says nothing) → «Được: Sức ++, tâm trạng +++» |
| Đổi người chạy việc (runner chip, jamove) | yes | yes | jamove amBtnsOf: «được: tự chọn người chạy việc cho ngươi (đi dò la, đưa thư, mua đồ; lòng cao thì ít khi khai ra ngươi)» (= jhc PEND.runner's own words) |
| Ghé cung › <person> (Dư đồ «Chọn người theo hầu», toi, state-random) | not seen | seen once | j95s: a free person row «thành: theo hầu, thấy giùm ngươi những gì xảy ra» (J95S_ENT_T[1]); the price stays on «Lên đường» |
| Lập phe cùng ai · N › (jkring §104.2 ring opener) | yes | yes | **kit part → KIT REQUEST #11** (not edited, law 9) |
| Chưởng sự tra xét, Cài người, Dạy con, Học, Mua đồ, Lập phe cùng <X> | yes | no | fixed by the e-gain3 unit itself |
| Thỉnh an › Đeo ngay / Để sau, Lấy trộm son phấn › Mặc kệ, Lục rương › Mặc kệ | not seen on my seeds | not seen | state-random (reviewer's run only) |
Final gain-empty on cbbaf253 (before the last jone tweak): Fold **2001 cards, 1 empty (Lập phe cùng ai · 1 ›, KIT REQUEST #11)**; iPad **2152 cards, 1 distinct (same)**; 0 page errors. LIVE alone same test: Fold 1755 cards / 10 distinct empty, iPad 1603 / 10 distinct.
### Reviewer note (mutants on hintGain / TGT exit 0)
- door-row-hint now runs 22 fixed SELF cases that reach DOOR.hintGain, DOOR.TGT, doorGain. Mutants (dau): `MUTANT=hg` exit 1 (7 bad), `MUTANT=tgt` exit 1 (3), `MUTANT=reg` exit 1 (6), clean exit 0. `MUTANT=1` kept.

## B. E-GAIN3c-RV FAIL items (Foreman E order 27/11 11:51Z)
0. LIVE moved → merged f28d28b9 (docs conflict only).
1. **Law 1** — ONE `svPunishNoCause(m,s)` (j24): lòng −loyalJudgeServ_3, master Đức ducJudgeServ, every other servant of that master −loyalJudgeServ_4, grudge + oán (srvGrudge), svDreadSet. Her judgeServ «Phạt vô cớ» and the NPC servDo «phat» on a non-spy servant both call it (before: NPC lòng −15 only). Spy «Tra khảo» path unchanged. Dead j10 staffHTML «Phạt» button removed.
2. **Law 4** — `giftRel(it,r)=giftVal+BAL.eff.j8.giftRelPlus` (3, new key): giveTo relAdd + log, jgift rows, Tặng quà hub read it. Before hub +12 vs rows +15 → same number now. (Not re-measured in-page yet → successor.)
3. **Law 4** — j78 banphe: 3 texts `${15*n}` → `${BAL.eff.j78.bacBanphe*n}` (j78.js:150/165/198). Whole-game grep `\$\{\d+\*`: the rest are CSS / layout (j27, jflip, jkcg …); j53 `fee*2`, j71 `n*2` left (not ACT text, own family).
4. npc-purpose-rows.json gossip row `done` → `npwPick(twGossipFoes(a,t),…)`: **PASS npc-purpose-scan (419 rows)**.
5. jone tier rows: `c` + `hint` (doorHint gated, base first). door-loss on the merge cbbaf253: Fold **620 ways, 0 bad, exit 0**; iPad **736 ways, 0 bad, exit 0**.
6. doorHint `if(a.hint)return a.hint` removed (every hint through DOOR.rowHint).
- Inherited one-core-bind G1: `jointWin()` (j10, the joint-scheme gain: jointScheme + facHTML text) and `searchEv()` (j14, the maid-search evidence: both doers + j15 text) = one reader each → **one-core-bind PASS (1624 prints, 0 mismatches)** (before: 2, and 6 more from item 1 until the helper read full keys).
- Inherited «Thưởng phạt» door card garble: on the merge, LIVE's jone repaints that door face with ONE way's own kit card («Tốn 1 khắc · Bạc 10 · Được Thưởng vô cớ: thiện cảm ++ · Ghi chú (ít hơn thưởng có cớ)», cao, every servant) — the «trả Tử về» garble is gone (probe, no shot yet).

## C. Tests (cbbaf253 unless said)
| test | result |
|---|---|
| act-literal-scan | 0 |
| egain3c-parity (old = LIVE f28d28b9 build) | 64 same, 0 different |
| charge-smoke | exit 0, 0 page errors |
| odds-one-row 755x1000 + 1180x820 | PASS both |
| fac-parity-play / role-parity-drift2-play | 17 ok ALL PASS / 11 ok ALL PASS |
| oldsave-r1 LIVE f28d28b9 → merge | 16 / 16 |
| npc-purpose-scan / one-core-bind | PASS 419 / PASS 0 mismatches |
| door-loss Fold / iPad | 0 bad / 0 bad |
| gain-empty Fold / iPad | 1 distinct empty each = KIT REQUEST #11 (LIVE-own) |
| door-row-hint Fold / iPad (cbbaf253) | **FAIL 5 / 11 distinct: gh «Ghé chơi · nhẹ», «Tặng quà · nặng»** (my jone hint made them differ from base) → fixed in **224e8524** (base hint first) — **NOT re-run yet** |

## HANDOVER (for the successor; same branch review/e-gain3-live, worktree /home/user/wt/eg3live, LIVE build in /home/user/wt/eg3live-main, tools in /home/user/wt/eg3live-tools: ev.js probe, run.sh, shots.js)
On head 224e8524 still to do:
1. `python3 dev/build/assemble.py`; re-run door-row-hint Fold + iPad (expect 0 bad), door-loss Fold + iPad (MUTANT=1 / 2 must exit 1), gain-empty Fold + iPad (expect only «Lập phe cùng ai · N ›»), door-row-hint MUTANT=1/hg/tgt/reg (one state) exit 1.
2. act-audit cao (`node dev/test/act-audit.js <url> out.jsonl 755x1000@1 cao`) — errs 0 (not run on the final merge).
3. Item 2 in-page check: hub «Tặng quà» number = gift row number (cao).
4. Shots Fold + iPad of the fixed cards (node /home/user/wt/eg3live-tools/shots.js → /home/user/wt/eg3live-shots; look at each: Nghỉ ngơi tier dialog, maid «Đổi người chạy việc», Giao hảo door with «Mượn son phấn»).
5. quickcheck: `bash dev/site/build_site.sh` + commit root index.html/sw.js if the coordinator wants an own build, then `bash dev/tools/quickcheck.sh`; core gates PASS or prove pre-existing on LIVE (dialog-fixed / q-softlock: compare vs LIVE f28d28b9).
6. Push, fill the «C. Tests» table, send READY to Foreman E (session_01DgYSWn1AhiLBvHqmVLmY3B).
