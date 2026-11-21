# REVIEW duodo-focus @ 43bc4ba2 (OPUS BIG) — reviewer session_01Rc5AsMC6NdEnc5VsL1xzk6 for MAIN CHÍNH 93
PRIORITY #1 CHECK ('duodo-focus' / 'kitFocus' / 'dfOpen'): OD 3 (L2183–L2185, 21/11 ~06:20Z / ~06:50Z / ~06:55Z) | ledger 0 | claims: worker N9Yc→LtG4, this review (CLAIMS L858) | main 0 (jfocus.js / jdf*.js not on origin/main ba9b6243) | review/* review/duodo-focus (+ review/kit-focus-rv4 merged in) | archive 0.
START_CTX ≈ 3 % (rollover 28 %, ceiling 60 %).

## VERDICT: FAIL (2 code faults, both with a repro below) — everything else PASS; art-dependent owner points listed as OPEN.

## FAIL LIST (to worker LtG4)
1. STALE PERSON INDEX — the focus view keeps the person as an INDEX (DF.i / dfTap(i,id) / dfRun(i,…) / dfData(i) all read curPeople()[i]); when S.visit.people shifts while the focus is up, the figure on screen stays the old person but the fan, the acts and dfRun go to whoever now sits at that index.
   - Real triggers: co-op guest jcoopworld refreshHere() rebuilds S.visit.people on every «where» message (Emperor `unshift` at vuon/thu, rivals filtered / pushed); jres.js:113 / jplx.js:91 / jmen.js:142 / j22.js:14 also rewrite the list. The worker's own data test shows it in solo: 1 of 4 of my runs FAILED «class A» with rets [true,"nobody","nobody","nobody"] (curPeople()[i] gone after the first run).
   - Repro (my probe, Fold): focus on Độc Cô Tuyết Kiến (i=0) → unshift the Emperor (what refreshHere does) → curPeople()[DF.i] = «Hoàng thượng», dfActs(DF.i) = the Emperor's groups (on another run: focus Tăng Tuyết Nhạn → «Hoàng hậu Vu Tố Huyên», groups «Giao thiệp|Lễ nghi»). A tap now runs the act on the WRONG person (law 6b real people; co-op both seats).
   - Fix (whole group): keep the focused person by REF (DF.p = curPeople()[i].ref || the stage entry) and resolve the index at each use (dfTap, dfRun, dfAfter/dfData, the encounter, popIdx); if the person is gone → close the focus (walk back) instead of acting. Test: shift the list while the focus is up (unshift / remove before her) → the act still lands on her or the focus closes; never on another person.
2. INFO CHIP OFFERED AS AN ACT + STARTS A MINI-GAME — when the person card has ONE pane (after she has talked to that person this visit; also one-pane strangers), dfActs takes EVERY button of the card, so the kit info chip «Đã biết: N tin ›» (j79.js:881, `.kchipb[data-kintel]`) becomes a fan act, class C, engine «words»: tapping it plays the Lời hay game and only then opens the intel list. Seen in my Fold shot after the NPC encounter (fan = «Đã biết: 1 tin» only) and confirmed by probe: after talk, groups = «Giao thiệp: Đã biết: 1 tin ›[C/words], Kết giao[C/words], Tặng quà[C/drag]»; dfTap on it → DFG.cur running.
   - Fix (whole group): dfActs must take only ACT buttons (data-o / act rows of the card), never info chips (`.chip`, `.kchipb`, `[data-kintel]`, any `.pcinfo` button) — scan every popCard host (rival, hh, emp, maid, servant, elder, men, kid, co-op friend) for non-act buttons and list them in the report. If the intel list must stay reachable from the focus view, it opens as info (no game), through the kit (ask keeper), not as a fan act. Test: one-pane card with S.notes → no «Đã biết» in dfActs; every fan act is a real act.

## OWNER WORDS (OD L2183–L2185) → PASS / FAIL / OPEN
| # | owner sentence (short; verbatim in OD) | result | evidence |
|---|---|---|---|
| 1 | 06:20 «vào ngự hoa viên … thấy 4 người … nút tương tác ngay trên dư đồ», not a new tab | PASS | stage tap → kitFocus over the place (jdfv capture listener); old pop-up hidden; Fold + iPad mp4 + my shots |
| 2 | 06:20 tap a person → zoom close, she walks toward me | PASS | kitFocus walk-in (mp4 frames 0–2 s both devices) |
| 3 | 06:20 background dim + blurred, top bar + 8 tabs stay, no buttons below | PASS | mp4 frames; top bar + 2×4 tabs visible during focus |
| 4 | 06:20 danh hiệu / phẩm / tên stay under her feet | PASS | plate = j59 stage tag (view test 1b; shots «Tần / Lâm Ngọc Khê») |
| 5 | 06:20 act-group tabs over her head (Giao tiếp / Hãm hại / Tố cáo …) → pick a group → acts fan out LEFT + RIGHT | PASS | head tabs «Giao thiệp 18/21 · Mưu kế 3/3 · Hại người 4/4», two columns (mp4, my shots) |
| 6 | 06:20 ✕ / back → she walks back to her place | PASS | ✕ → popIdx cleared, #popw shown (view test 3); walk-out = kit motion |
| 7 | 06:20 Tát mini-game ON the figure, «thấy cái tay của mình … tát qua tát lại» | PARTIAL / OPEN | swipe game on her face works, tier = BAL.slap; but NO hand is drawn (BAL.df.art = 0: gold trail line + red ring only). Hand art = ART REQUEST df-hand (Foreman C). Do not tell the owner the hand is in. |
| 8 | 06:50 EVERY action on a person from the Dư đồ is a mini-game | PASS (with FAIL 2) | dfActs → 7 engines (swipe/tug/bow/drag/ear/words/stare), class D opens jsgame / jpma / gift as they are (probe: Dò la / Vu oan become D once unlocked); FAIL 2 = an info chip wrongly becomes a «game» |
| 9 | 06:50 reactions after each act (seal, one line, rel change floats up) | PASS | F.react (line from the result toast + seal), top-bar deltas «Đức −7 · Sủng −7» float (mp4) |
| 10 | 06:50 idle animations + mood bubbles on the map | PASS (light) | existing bob + kitMoodSay mood lines (DF_MOOD, BAL.df.idle); rare by design |
| 11 | 06:55 NPCs come to her on their own: same dim + approach | PASS (rival speakers) | showModal hook → kitFocus encounter. Note: only cards whose speaker is `who.w[0]==="r"` (consorts / Hoàng hậu); Emperor / maid / servant cards (`e`/`m`/`s`…) keep the centre card. Fine for Ngự hoa viên consorts; flag for MAIN whether the owner's «người đó» needs the other kinds (not a FAIL now). |
| 12 | 06:55 NO centre popup → small dialogue box at the BOTTOM, «tiếp» to advance | PASS | say box bottom «Tần Lâm Ngọc Khê bước tới, giơ cao bàn tay…» + «Tiếp ▸» (mp4 both devices), modal hidden (view test 5a) |
| 13 | 06:55 then choice buttons in the empty LEFT + RIGHT columns (Né / Không né) | PASS | «Né đòn» left / «Chịu đòn» right (mp4, shots) |
| 14 | 06:55 Né = a mini-game ON THIS SAME SCENE | PASS | swipe-dodge on the figure, result back to slapGame onDone (jslap rule unchanged) |
| 15 | 06:55 the NPC's slap animation plays DURING the mini-game | PARTIAL / OPEN | only a red ring flying in from the side; no NPC hand / slap animation until ART df-npc-hand lands (BAL.df.art). |
| 16 | 06:55 two-way (she can do the same to them) | PASS | her Tát / Hắt nước / Hắt trà / Quạt mực in the fan (B class, own doAct path); NPC side = existing jslap / jagacts |

## 18 LAWS (touched)
- 1 two-way: PASS (row 16). 2 equal value / 3 gain-and-loss: PASS — «Làm luôn» = same price, plain odds; the game moves ONE ladder step up OR down (sgShift / BAL.cut.sgStep) or the BAL.slap tier; class C sure acts keep their numbers. 4 one core: PASS — knobs in BAL.df (jbaldf) + BAL.mgTier.occ.df / kAdj; jdf / jdfg scans clean (my read agrees). Nit: jdfg canvas colours `rgba(63,138,67,.35)` / `rgba(0,0,0,.18)` in dfgBar are private colour literals (kit vars used elsewhere in the same file) — move to the kit colour set when touching it.
- 5 harder with rank: PASS — mgTier occ df [0,.3] by her rank (attacker's for dodge); games test ease share 0.40 → 0.06 (rank 0 → 7).
- 6b real people: FAIL via FAIL 1 (act lands on a different person than the one shown). Say box name respects fog (k61Named). 
- 7 wording: PASS — no % in player text; «Làm luôn / không chơi: như thường», «N giây», «hết khắc buổi này», mood lines cổ trang.
- 9 kit: PASS — no CSS of its own; kitFocus / kitQuick / kitMoodSay only; old pop-up hidden by the global [hidden] rule. FAIL 2 is a data fault (info chip fed to the act fan), not a private part.
- 10/12 layout + devices: PASS with the known open kit item — Fold fan sub-line clips the 2nd cost («Tốn 2 khắc · Đức -…»); «!» shows the full cost (keeper #2, kit-focus r5) → note, not a FAIL here. Fold columns also show the top sliver of a 6th row at the bottom edge (scroll hint) — kit item for the keeper.

## GATES (run by me on 43bc4ba2)
- duodo-focus-games: ALL OK. duodo-focus-view: ALL OK. duodo-focus-data: 3/4 ALL OK, 1/4 FAIL «class A» (= FAIL 1 symptom).
- kit-focus.js 755x1000 + 1180x820: PASS.
- quickcheck: browser part PASS (open 1802 ms, old save ok, perf new/live render 299/259, tab 562/560, buổi 1701/1396); core gates FAIL only G4 80-dialog-fixed (#54 iPad new-title plate on event picture) — the SAME FAIL on clean origin/main ba9b6243 (I ran dev/test/dialog-fixed.js on main's index.html) → not this branch (keeper review/kit-g4-plate).
- coop-e2e (tt / nc, live Worker): 94/94 passed.
- Videos: watched both real mp4s on CDN img/_review/duodo-focus/ (fold 26 s, ipadAir 28 s; frames extracted 1 fps and looked at) + the two sheets; my own Fold shots (scratch, not in git).

## NEXT
- Worker LtG4 fixes FAIL 1 + 2 (each with a test that fails before / passes after) → MAIN opens re-review; on PASS the reviewer final-merges newest origin/main into review/duodo-focus-rv (not FF today: main moved to ba9b6243), rebuilds index.html / sw.js, reruns quickcheck.
- CDN img/_review/duodo-focus/ kept (the worker's videos are needed for the re-review); wipe at the final verdict.
- No commit pushed to review/duodo-focus-rv (FAIL; nothing to land).
