# E-GAIN3-LIVE — land unit e-gain3 + 3b + 3c on LIVE main (worker report + HANDOVER)

PRIORITY #1 CHECK: OD 26/11 ~05:55Z (law 3) + OD 27/11 ~08:10Z | main LIVE **f28d28b9** (brief said 0562e15f; LIVE moved 00dca386 → f28d28b9, merged both) | review/e-gain3 23b44074, review/e-gain3b 76821d10, review/e-gain3c 8b6eadb9 (E-GAIN3c-RV FAIL → items below) | claims: E-GAIN3-LIVE (this, session_01DgYSWow6S6bMgkTAvopBX4).
KIT CHECK: reuses kaRows/kcls rows, writer class `<span class="g">` (KP12), kitHint (read-only), doorGain / DOOR.rowHint / doorHint (jdoor), DOOR.card / PEND.door dialogs. No kit internal edited (j63, j19, jk2b, jopic, jkring untouched); KIT REQUEST #9–#11 filed. kit-std-scan not run (no CSS / frame / part added).
START_CTX ~5 %. **ROLLED OVER at ~34 %** (see HANDOVER at the end) — the coordinator opens the successor.
Successor **E-GAIN3-LIVE-2** (session_01DgYSWnf2mstVedSHmT1NNq), START_CTX ~4 % of 1M: finished the HANDOVER TODO — section D below. **READY head = see D.**

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

## D. E-GAIN3-LIVE-2 (successor) — HANDOVER TODO done
PRIORITY #1 CHECK: report HANDOVER (this file) | main LIVE moved f28d28b9 → **d9ca7892** (lc30-b2 on 5cee92bb kg82-phase) → merged 40042835 (clean, no conflict) | review/e-gain3-live cd2317f2 | claims: E-GAIN3-LIVE-2 (this).
KIT CHECK: reuses kaRows/kcls rows, kitHint, DOOR.rowHint / doorHint, PEND.door; no kit internal edited, no CSS / frame / part added.

Changes:
1. **Law 4, one reader** — giveTo (relAdd + log line) and jgift rows now CALL `giftRel()`; before, both typed `giftVal+BAL.eff.j8.giftRelPlus` themselves (3 places, same number). In-page (cao, 8 rivals): hub «Tặng quà» +N = max gift row +N **8/8 same**; gift row +4 = giveTo relAdd 4.
2. **door-row-hint MUTANT=1 was surviving** on the merge (dau: «changed 0», exit 0 — LIVE's jone already cleans the raw texts, so on some seeds no live row reaches the raw-first rule). Added 2 fixed SELF cases on DOOR.rowHint (need-text way / tip way with a gain line) → MUTANT=1 now exit 1 in any state (2 SELF bad + 50 rows); clean exit 0.
3. **Law 3, LIVE-own empty** — gain-empty iPad cao: «Hỏi chuyện › Mặc kệ» (agReact witness card, agSeen / haSeen, jagent.js; identical on LIVE). Now the «Mặc kệ» family form (j4 / j7 / j95b): `fx:{suc:BAL.cv.rest}`, «giữ sức, không dính vào chuyện» → kit hint «Sức ++, …». Family scan (every `n:"Mặc kệ…"` in dev/build): all others already show a gain (wx / x with a gain / fx). This is likely the same card as the earlier state-random «Lấy trộm son phấn › Mặc kệ», «Lục rương › Mặc kệ», «Thỉnh an › Mặc kệ» (agReact is the shared witness reaction).
4. Own build on LIVE d9ca7892 (index.html + sw.js; assets.json unchanged = LIVE).

| test (merge on LIVE d9ca7892) | result |
|---|---|
| door-row-hint Fold / iPad | **8158 rows 0 bad / 7714 rows 0 bad**, exit 0, 0 page errors |
| door-loss Fold / iPad | **478 ways 0 bad / 424 ways 0 bad**, exit 0 |
| gain-empty Fold | **1661 cards, 0 empty**, exit 0 |
| gain-empty iPad | 2397 cards, 2 distinct: «Hỏi chuyện › Mặc kệ» (fixed, item 3) + «Lập phe cùng ai · 1 ›» (KIT REQUEST #11, LIVE-own kit part) → after the fix dau+cao 581 cards **0 empty** |
| mutants door-row-hint (dau) | MUTANT=1 exit 1 (after item 2) · hg exit 1 · tgt exit 1 (3) · reg exit 1 |
| mutants door-loss (dau) | MUTANT=1 exit 1 · MUTANT=2 exit 1 (4 loss-only «Phạt vô cớ») |
| mutant gain-empty (dau) | MUTANT=1 exit 1 (5 runs / 2 distinct) |
| act-audit cao 755x1000 | **errs=0** |
| hub «Tặng quà» = gift row = giveTo | 8/8 same (item 1) |
| quickcheck 26308d3f vs LIVE d9ca7892 | open 1753 ms 0 errors · old save loads + plays a buổi · perf PASS (render 251/219, tab 399/408, buổi 1560/1325 ms) · time-spill PASS · **CORE GATES FAIL only G4 94-q-softlock** = **pre-existing on LIVE**: q-softlock.js on LIVE d9ca7892 index.html (same local server) = Q-SOFTLOCK FAIL (4), the same 4 checks (person view holds the card / ✕ shows it / parked view / stale view; device that fails flips Fold↔iPad run to run) |

Shots (looked at; not in git, /home/user/wt/eg3shots): maid pop-up «Đổi người chạy việc» Fold (Tốn không · Được «tự chọn người chạy việc cho ta (đi dò la, đưa thư, mua đồ · lòng cao thì ít khi khai ra ta)», no cut text); deck «Nghỉ ngơi» Fold + iPad (Thành Nghỉ ngơi một lát · Nghỉ ngơi dưỡng sức), tier dialog iPad (2 tier cards, Được «Sức ++, tâm trạng +++»; played on Fold → result «Được Sức +6»); Giao hảo tier door Fold + iPad (Ghé chơi · nhẹ / Giúp đỡ nàng ta · vừa / Tặng quà · nặng). «Mượn son phấn» is now a member of the nhẹ tier (jone gh) and shows only when it is the picked member; its text is covered by door-row-hint (0 bad), no own shot.
Notes for Foreman E (LIVE-own, not touched, out of this unit): (a) «Đổi người chạy việc» sits under the pop-up tab «Trừng phạt»; (b) the deck card summary prints «vừa: —» for a locked tier (jone.js:192 on LIVE); (c) Giao hảo «Ghé chơi · nhẹ» Bại line carries «nàng ta chuộng giản dị: quý ta +».

## E. Landing merge (Foreman E order 27/11 ~15:31Z; E-GAIN3b-RV PASS 4db15919)
Branch **review/e-gain3-live-m** = 4db15919 + LIVE **772bee4f** → merge **443c6761**. Source clean; only index.html + sw.js conflicted → rebuilt (assemble.py + build_site.sh), assets.json = LIVE. review/e-gain3-live not moved.
| test on 443c6761 | result |
|---|---|
| door-row-hint Fold / iPad | 7740 rows 0 bad / 8268 rows 0 bad, exit 0, 0 page errors |
| gain-empty Fold | 2145 cards, 1 distinct empty = «Lập phe cùng ai · 1 ›» (cao:fac) = KIT REQUEST #11 (LIVE-own kit part, jkring; same as before), 0 page errors |
| oldsave-r1 (LIVE 772bee4f save → merge) | 16 / 16 |
