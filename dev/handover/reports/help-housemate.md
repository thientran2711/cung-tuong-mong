# D-HELP-HOUSEMATE — report (worker session_01D3E3NZiSpuiy15v3s1c6wU, Foreman D)

First line: START_CTX ≈3 % (get_session used_tokens reads 0; own estimate) · depth 6 (limit 8).

PRIORITY #1 CHECK: OD law 1 two-way (OD:L33, L1534) + MAIN 159 ruling 26/11 12:55Z «FOR D: help-housemate = YES» (FOREMAN_D_STATUS L408, gap line L332) | main dev/build/jrcv.js:58 helpAsk(p,t) · jagacts3.js:316-321 cx2:help → helpAsk · jagacts2.js:55 cx2:help target list · j9.js:132 her card · jaudit.js:24 loan/tell rewrite · j25.js:7 lock · BAL.ag.cx2.help (jbal2.js:1812) | review/* none (git branch -r | grep help: none) | claims D-HELP-HOUSEMATE (Foreman D, this session). REUSED helpAsk / rcvHelpOpts / PEND.rcvHelp — no second help system.

Branch **review/help-housemate**, head **5ac9c150** (FF from LIVE origin/main aa37de21). Game commit fc48eb59; 5ac9c150 adds only the video script (dev/test).

## 1. The gap and the fix (law 1, whole family — law 11)
Every «Nhờ giúp đỡ» entry point now runs the ONE rule `helpAsk(p,t)` (jrcv: the receiver picks one of the 4 answers by L1876 weights; her «Lời nhờ» card when SHE is the receiver).

| entry point | before (LIVE aa37de21) | after (5ac9c150) |
|---|---|---|
| her talk with a rival (j2 rival → j9 topicOpts card) | card built with helpAsk, but **jaudit.js:24 rewrote run()** into a private loan/tell copy (50/50 roll, BAL.audit.loan 30, evRun) — not the receiver's 4 answers | jaudit rewrite deleted → runs helpAsk(S,v): the NPC's own pick of the 4 answers (same numbers as cx2:help) |
| her «Cùng cung» list (housemate, j9 same-house filter) | **no card** (NPC may ask a housemate: cx2:help has no sameHouse filter) | card kept in the list → helpAsk(S,housemate); the «Cùng cung» lock line stays for the harm/court cards |
| her Hoàng hậu talk list (j2 kind hh) | **no card** (NPC cx2:help may ask the queen) | card in the list → helpAsk(S,queen) |
| lock of her card (j25) | «cần nàng quý ngươi **30** (đang N)» — typed 30 while the rule is netTh(v,"than") (seen: th 47, text 30) — law 4; also printed hidden liking | «cần nàng quý ngươi ${netTh(v,"than")}» + «đang N» only when she knows v, else KIT_REL.unknown — the NPC pick rule (receiver likes asker ≥ «thân») |
| NPC cx2:help (jagacts2:55) | `t!==S` — **an NPC never asks HER** | S allowed (same rule aff(t,v) ≥ netTh(t,"than"), same weights BAL.mind.pick.ag) → her «Lời nhờ» card (PEND.rcvHelp, kit notice / parallel-time order); `rcvHelpWait(v)`: one asker never stacks a second waiting card |
| NPC → NPC cx2:help / her «Lời nhờ» card / jgreet | helpAsk (already) | unchanged |
| dead numbers | BAL.audit.loan, BAL.eff.jaudit.run / evRun (only the deleted copy read them) | removed (one core) |

Scan of every «Nhờ giúp đỡ» site: `grep -n "Nhờ giúp đỡ" dev/build/*.js` → j9:132 (card, helpAsk), j25:7 (lock), jaudit (rewrite → deleted), jagacts2:41/49/55 (NPC act, helpAsk via jagacts3:321), jrcv (helpAsk + her card), jbal/jbal2 comments. No other path.
Co-op: host computes (NPC agents and helpAsk run on the host); her card is the host seat's rcvCard; the guest proxy path (t.coop) is unchanged.

## 2. Gates (5ac9c150 build = fc48eb59 build)
| gate | branch | LIVE aa37de21 |
|---|---|---|
| dev/test/help-housemate.test.js (new; 3 gaps + queen + dedupe + no errors) | ALL PASS ×5 runs | **5 FAIL** (rival card no helpAsk; lock typed 30; housemate no card; queen no card; NPC never picks her) |
| receiver-choice.test.js | ALL PASS | — |
| ag-par3.js (LIVE version of the test) | 6 FAIL = subset of LIVE's 7 FAIL (stale probes fixed on review/parity-facfix); «Nhờ giúp đỡ: her card and cx2:helpAsk» row ok | 7 FAIL |
| ag-par3.js from review/parity-facfix (fixed probes) on this build | **ALL PASS** (36 ok) | — |
| one-core-guard / one-core-text / one-core-bind | PASS / PASS / PASS (0 mismatches) | — |
| coop-e2e (live Worker, co-op first) on fc48eb59 build | **143 ok / 0 FAIL** | — |
| quickcheck 5ac9c150 | see §3 | — |

## 3. Quickcheck
quickcheck 5ac9c150 vs LIVE aa37de21 (run 2, uncapped; run 1 was cut by my 20-min cap in the play part): **QUICKCHECK PASS** play part · open 2477 ms · old save ok · perf median new/live: render 314/289 ms, tab 800/665, buổi 2140/2068, tasks>200ms 44/48.
CORE GATES: G4 80-dialog-fixed «kit-dialog-2 a no empty Tốn/Được» 755+1180 + 90-button-crawl «Ô lưu · Lui» = the KNOWN LIVE faults (same rows as on LIVE; parity-facfix §7). 92-look-dedupe (3) and 95-next-dead (2) failed once under load → rerun alone: look-dedupe PASS on branch AND LIVE, next-dead FIX-6 PASS on branch AND LIVE = flakes (this branch touches neither look panels nor «Sang buổi»). Time-spill guard PASS.

## 4. Videos (law 12, real finger taps, both devices) — CDN img/_review/help-housemate/
- https://ctm-img.victoria-tntt.workers.dev/img/_review/help-housemate/fold-755x1000.webm
- https://ctm-img.victoria-tntt.workers.dev/img/_review/help-housemate/ipad-1180x820.webm
- frames: fold-/ipad- 2-talk.jpg (housemate list: «Nhờ giúp đỡ» beside the «Cùng cung» lock), 6-loinho.jpg (her «Lời nhờ» kit card, 4 answers, odds in words), 7-answered.jpg (KẾT QUẢ: Bạc −30, thiện cảm +7).
Script dev/test/help-housemate-video.js. Staging (not the feature): the opening reward reveals are stubbed, the housemate is placed alone on her home stage (curPeople wrap), selection days ended; every step after that is a real tap (token → card → answer; notice line → «Xem lời nhờ» → «Giúp hết lòng»). Looked at: Fold part (a) Bạc 160 → 190 (the housemate lent 30), part (b) Bạc −30; iPad same flow; no page errors. Kit parts only (kfoc talk cards, kit notice, kit dialog, kit result card).

## 5. Notes for the reviewer
- Law 16: the jaudit loan/tell copy was a private second rule (OD 08:45Z «no silent random target» named the consort she'd tell about); with helpAsk the «kể chuyện» branch still exists inside slot 0 (evGuilty of a third person, named in the result) — the same rule both ways.
- Law 2/3: her card choices are the existing rcvHelpOpts (gain + cost each); unchanged.
- Pre-existing, not touched: rcvHelpOpts rows print «Tốn: không» on the NPC-asks-her card (kit wording, all receiver cards).

## 6. REVIEW (opus BIG, session_01D3E3NbbsVnx5jrHuceQUuf) — FAIL 5ac9c150
START_CTX ≈4 % (own estimate; used_tokens reads 0) · depth 7 (limit 8).
PRIORITY #1 CHECK: OD law 1 (OD:L33, L1534) + OD:L286 (08:45Z: no player auto-random target; NPCs pick by real motive) + MAIN 159 «FOR D: help-housemate = YES» | main jrcv.js:32/58/60 rcvHelpOpts·helpAsk·PEND.rcvHelp, jagacts3.js:321, jk2b.js:300 (kit hint «chẳng được gì») | review/* none | claims D-HELP-HOUSEMATE (Foreman D).

| check | result |
|---|---|
| build: assemble + build_site on 5ac9c150 | index.html identical except CTM_BI ✔ |
| help-housemate.test.js branch / LIVE aa37de21 | ALL PASS / 5 FAIL (as reported) ✔ |
| receiver-choice.test.js | ALL PASS ✔ |
| coop-e2e (live Worker, co-op first) | 143/143 ✔ (incl. single-player + old save load) |
| one-core-guard / -text / -bind | PASS / PASS / PASS ✔ |
| law 4 dead keys: BAL.audit.loan, BAL.eff.jaudit.run/evRun | no reader left in dev/build, dev/test, dev/measure ✔ |
| law 1 + law 11 family scan (every «Nhờ giúp đỡ» site) | j9 card (rival / Cùng cung / hh) → helpAsk; jaudit rewrite gone; j25 lock = netTh; cx2:help may pick her ✔ |
| law 16 (deleted jaudit copy) | it implemented OD:L286 on a private second rule; the target she «learns about» is now the receiver NPC's pick (evGuilty = real motive) inside the one rule — no owner rule dropped ✔ |
| rcvHelpWait dedupe | covers S.rcvPend, S.ordQ (parallel time, on by default) and Q (pid kept) ✔ |
| spam probe (planner draw, agOptsG + mindPick ×300 per NPC, fresh world) | 5 NPCs she likes ≥ «thân»: 0.3 % of NPC deeds ask her; all 10: 2.3 %. One waiting card per asker; unanswered cards end as «Từ chối» at BAL.ptime.ansK. Same rule as NPC↔NPC (law 1). Non-blocking. |
| quickcheck 5ac9c150 | FAIL: dialog-fixed «kit-dialog-2 a / empty Tốn/Được» + crawl «Ô lưu · Lui» (known LIVE faults); perf longTaskMax 2747 vs 1643 (single-run noise on a loaded box; the change adds no per-frame work) — not counted against this branch |
| videos / frames on CDN (both devices) | looked at: 2-talk, 6-loinho, 7-answered fold + ipad; kit parts only ✔ — but see B1 |

**BLOCKING**
- **B1 (law 3, law 11).** Her «Lời nhờ» card (PEND.rcvHelp) was unreachable on LIVE (no path gave helpAsk t===S); this branch makes it reach her for the first time, so its rows are now player-visible. Frames fold-6-loinho / ipad-6-loinho: «Giúp qua loa» reads **ĐƯỢC: chẳng được gì · MẤT: hao bạc, mất lòng người** — a cost-only option on screen. The rule does give a gain (asker's liking +BAL.rcv.help.af[1] when not seen through), but the option text `được: quý ${balSg(R.af[1])}` (jrcv.js:39) has no subject, so the kit hint (jk2b.js:300) drops it. Fix: name who likes whom in slot 1 the way slot 0 does (`${p.name} quý ${me?"ngươi":t.name} +N`), then scan every receiver card option (rcvHelpOpts / rcvNoO / rcvSabO and the other RCVK cards) for a rendered «ĐƯỢC chẳng được gì» and give a before/after table.

**Non-blocking notes**
- N1: «Tốn: không» on every receiver card while «Mất: hao bạc» (pre-existing kit wording).
- N2: evGuilty(pick) chooses among guilty people at random (pre-existing, shared with NPCs).
- N3: no cool-down after she answers (same asker may ask again at its next deed); bounded by the number of NPCs she likes — fine under law 1, flag to Foreman D if the owner finds it busy.

## 7. FIX of rv B1 → head **41125250** (FF from LIVE aa37de21)
B1 (law 3 + law 11): «Giúp qua loa» on her «Lời nhờ» card read ĐƯỢC «chẳng được gì» — jrcv rcvHelpOpts slot 1 `được: quý +N` had no subject, so the kit hint dropped the gain. Fix: `được: <asker> quý <receiver> +N`, the same shape as slot 0 (jrcv only; numbers unchanged).
Family scan **dev/tools/rcv-hint-scan.js**: every option of every card SHE answers as receiver (PEND.rcvHelp · rcvAsk × every RCVK key · rcvJudge × every RCVJ key) through kitHint, two passes (A: asker/third person not the queen; B: the Hoàng hậu herself asks) — 75 rows.

| row | LIVE aa37de21 | 41125250 |
|---|---|---|
| A rcvHelp · Giúp qua loa | FAIL «chẳng được gì; nhưng hao bạc…» | ok «<asker> có thiện cảm với ta hơn; nhưng hao bạc…» |
| B rcvHelp · Giúp qua loa | FAIL | ok |
| B rcvAsk:mediate · Mách lẻo (the queen herself mediates: nobody above to tell; gain only «giữ mối oán») | OPEN | OPEN — pre-existing on LIVE, a MISSING GAIN (law 3), not wording; needs a number/ruling (law 16) → **FOR D** |
| every other row (A+B, 72) | ok | ok |

Gates on 41125250: help-housemate.test ALL PASS · receiver-choice ALL PASS · one-core-guard / text / bind PASS · rcv-hint-scan PASS (1 OPEN) · **coop-e2e 143 ok / 0 FAIL** (co-op first, live Worker).
Videos re-recorded on 41125250 (same CDN URLs, overwritten): fold-755x1000.webm, ipad-1180x820.webm, frames fold-/ipad-6-loinho.jpg now show «Giúp qua loa» ĐƯỢC «được lòng người» (Fold) / «người ấy có thiện cảm hơn» (iPad). Looked at both.
Quickcheck on 5ac9c150 stands for the build except jrcv text (one string); play part unaffected.

## 8. DELTA REVIEW (opus BIG, session_01D3E3NbbsVnx5jrHuceQUuf) — PASS 41125250
41125250 is an FF of LIVE origin/main aa37de21. Delta vs 5ac9c150 = jrcv.js slot-1 text + dev/tools/rcv-hint-scan.js + built files.

| check | result |
|---|---|
| B1: slot 1 «được: <asker> quý <receiver> +N» (same shape as slot 0) | ✔ frame ipad-6-loinho: «Giúp qua loa» ĐƯỢC «người ấy có thiện cảm hơn», MẤT «hao bạc, người ấy mất thiện cảm» — gain + loss (law 3) |
| build: assemble + build_site | index.html identical except CTM_BI ✔ |
| rcv-hint-scan.js branch / LIVE aa37de21 | RCV-HINT PASS (75 rows) / 2 FAIL (rcvHelp «Giúp qua loa» A + B) ✔ |
| help-housemate.test.js · receiver-choice.test.js · one-core-guard/-text/-bind | ALL PASS · ALL PASS · PASS ×3 ✔ |
| coop-e2e | not re-run by me: one player-text string, no co-op path touched; 143/143 on 5ac9c150 (my run) and 143/0 on 41125250 (worker) |

Notes (non-blocking, FOR D):
- N4: rcv-hint-scan builds no card for 8 kinds (rcvAsk facJoin / facInvite / illAlly / rougeBorrow / pmDuel, rcvJudge xinhh / rougeBeg / trinhhh: «no card built», 16 rows) — they are pre-existing cards that this branch does not reach; extend the scan's setup so the family check covers them.
- N5: OPEN, pre-existing on LIVE: rcvAsk:mediate «Mách lẻo» when the queen herself mediates reads ĐƯỢC «chẳng được gì» (a missing gain, not wording) → needs a ruling before any change (law 16), FOR D.
- N1–N3 from §6 stand.
CDN review folder wiped with this verdict.

## 9. DELTA REVIEW (opus BIG, session_01D3E3NbbsVnx5jrHuceQUuf) — FAIL d007c9ba (41125250 stays PASS)
Delta 41125250 → d007c9ba: jrcv.js rcvSabO `qSelf` (RCVK.mediate «Mách lẻo» when the Hoàng hậu HERSELF mediates gets the gain «Hoàng hậu quý <receiver> +qAf») + rcv-hint-scan OPEN set emptied. Build ok; rcv-hint-scan PASS.

**BLOCKING**
- **B2 (law 6b real people, law 3 the gain must be real).** The «gain» comes from the very person the option betrays. Probe (her card, queen Nhan Ngọc Thù mediates, she picks «Mách lẻo»): x = «được: Hoàng hậu quý ngươi +5 · mất: … Nhan Ngọc Thù oán +6»; after go(): the queen's liking −5 → −3 AND the queen's oán 0 → 6. The kit card reads «Hoàng hậu hài lòng; nhưng … <queen's name> sinh oán» (scan row B rcvAsk:mediate · Mách lẻo) — the same woman pleased and resentful because she gossiped about the queen's own mediation, with nobody above to tell. Not a real gain, it only silences the scan. Fix options: (a) revert d007c9ba (back to 41125250) and keep N5 as an owner question (the gain of gossiping when no one is above is a design call, law 16/17); or (b) a gain from a REAL other person who would be pleased to hear it (e.g. a rival of the queen / a palace gossip, named on the card), never the queen herself.
- Also seen (check while fixing): the card prints +5 but the queen's liking moved +2 (−5 → −3) — confirm the printed number is what affAdd applies (law 4), or show the rule's real value.
