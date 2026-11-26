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
(filled below when it ends)

## 4. Videos (law 12, real finger taps, both devices) — CDN img/_review/help-housemate/
- https://ctm-img.victoria-tntt.workers.dev/img/_review/help-housemate/fold-755x1000.webm
- https://ctm-img.victoria-tntt.workers.dev/img/_review/help-housemate/ipad-1180x820.webm
- frames: fold-/ipad- 2-talk.jpg (housemate list: «Nhờ giúp đỡ» beside the «Cùng cung» lock), 6-loinho.jpg (her «Lời nhờ» kit card, 4 answers, odds in words), 7-answered.jpg (KẾT QUẢ: Bạc −30, thiện cảm +7).
Script dev/test/help-housemate-video.js. Staging (not the feature): the opening reward reveals are stubbed, the housemate is placed alone on her home stage (curPeople wrap), selection days ended; every step after that is a real tap (token → card → answer; notice line → «Xem lời nhờ» → «Giúp hết lòng»). Looked at: Fold part (a) Bạc 160 → 190 (the housemate lent 30), part (b) Bạc −30; iPad same flow; no page errors. Kit parts only (kfoc talk cards, kit notice, kit dialog, kit result card).

## 5. Notes for the reviewer
- Law 16: the jaudit loan/tell copy was a private second rule (OD 08:45Z «no silent random target» named the consort she'd tell about); with helpAsk the «kể chuyện» branch still exists inside slot 0 (evGuilty of a third person, named in the result) — the same rule both ways.
- Law 2/3: her card choices are the existing rcvHelpOpts (gain + cost each); unchanged.
- Pre-existing, not touched: rcvHelpOpts rows print «Tốn: không» on the NPC-asks-her card (kit wording, all receiver cards).
