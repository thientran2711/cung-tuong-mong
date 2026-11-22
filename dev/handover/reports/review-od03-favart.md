# REVIEW od03-favart (BIG) — reviewer session_01964izCZEjJkV3NTqKebwmD, child of Foreman D #16

depth 8 (limit 8) · START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate) · rollover at 29 %, ceiling 60 % · as a reviewer I open no sessions; at rollover I write the handover here and tell Foreman D #16.

PRIORITY #1 CHECK: OD 26 hits (OD:L1484 owner 16/11 ~23:05Z verbatim = the rule) | main: no month-art code (fc7f98f6) | review/*: core in review/night-balance-bundle jbalcore.js (empArtMonth / empArt / eaLearn / stealArtB / stealShown, BAL.steal.art + BAL.steal.ea), worker branch review/od03-favart cd43bd8a | claims: OD03 FAV-ART worker session_01964izDQzR1Uo3Ssiwer1sk. The worker reused the bundle core (law 13 ✓).

Subject: review/od03-favart cd43bd8a (base review/night-balance-bundle 21703845). Reviewed: whole diff vs base (j15, j2, jagacts2, jbalcore, jsteal, coop-e2e, od03-favart test, measure files).

## Merge (review/od03-favart-rv)
- bb1bf616 = cd43bd8a + newest bundle head a9822ee3 (k4: Danh re-tune, HH gate keys = LIVE; coop-cyhold law-4 fix; KIT_REQUESTS restore) + LIVE main fc7f98f6 (ending-screens-2).
  Conflicts: index.html / sw.js (rebuilt), dev/build/assemble.py (= main's list + jbalcore.js + jnf.js, checked by set diff: only those 2 extra), dev/kit/KIT_REQUESTS.md (kept both: night-final's 3 requests + main's ending-screens request).
- LIVE-revert audit (deepened 300, bases 21703845 / 452e4c41): 91 files differ from main; 0 lines of main lost that both the bundle and od03 still hold → nothing of LIVE reverted by the merge.

## Laws
| law | result |
|---|---|
| 1 two-way | stModes → stSeen (stealShown): NPCs weigh Tranh sủng / Chặn ngự giá by the odds they SEE, as her flip card ✓; roll stays oSteal ✓. **Found + fixed (R1):** NPC Kính sự phòng ask (cx2:likes) on a win got a like AND a month-art roll (both 35 %); her discover() gives the month art OR a like. Probe on bb1bf616: NPC both 73/200, her both 0/400. |
| 2/3 equal value, gain-and-loss | «Hỏi sở thích Hoàng thượng» costs 15 bạc, gains info ✓. **Found + fixed (R2):** once every like + dislike is known her ask stays open for the month art only, shows «Chắc» (84) but a win named it only at BAL.steal.ea.disc 35 % → real gain ≈ 29 % (probe 0.34 of wins) = a cost-heavy option sold as sure; law 7 shown odds ≠ truth. |
| 4 one core | no new number; eaAsk reads BAL.steal.ea.disc; card rows print art names; stealShown from BAL.steal.art / BAL.art.odds ✓ |
| 6 real evidence | n/a (info only); month art host-computed, both seats same (coop-e2e) ✓ |
| 7 cổ trang | card rows «Tháng này chuộng» / «Tháng này không ưa» / «chưa rõ»; no % anywhere new ✓ |
| 9 kit | rows go into the existing pcard group «Điều ngài thích» (same [label, value, tone] rows as the likes) — no new part ✓ |
| old saves | deser hook draws the month art on load; guest muted (jcoopone MUTE empArtMonth, late-bound) ✓ (test 5) |

## Reviewer fixes on review/od03-favart-rv (2932b3e1; final rv head 50bea9c97 = that + newest bundle 35b3a3f5 + LIVE main f85cba97, jksize conflict = bundle's kdpall removal + main's #76 item slot, LIVE-revert audit again 0 lost lines) — small, no new number
- R1 NPC cx2:likes follows her rule: a won ask = the month art at BAL.steal.ea.disc, ELSE a like (never both).
- R2 eaAsk(p, sure): a won ask names the month art for sure when nothing else is left to learn (her: every like + dislike known — the same gate that keeps the option open; NPC: every like) → the shown «Chắc» is the real chance.
- dev/test/od03-favart.js case 6 (4 checks): FAIL on bb1bf616 (22/60, [73,73,200], 20/60), PASS on 2932b3e1.

## Gates on 2932b3e1 (my clone)
Final sha **50bea9c97ba9** (review/od03-favart-rv; bundle 35b3a3f5 + LIVE f85cba97 merged in):
- dev/test/od03-favart.js: PASS 13/13 (incl. new case 6) · 0 page errors
- dev/test/balance-core.js: PASS 39/39 · 0 page errors
- **coop-e2e 99/99 PASS** (live Worker; host Fold + guest iPad) — od03's own co-op check on both seats: same month art at start / week 1–3 / after rejoin, incl. a month rollover (theu/thi@0 → ky/y@1 on both seats; earlier run hoa/cam@0)
- quickcheck vs live 419079d7: QUICKCHECK PASS (open 1867 ms, old save from LIVE loads + plays a buổi, perf render 318/274, tab 501/557, buổi 1833/1444 ms, tasks>200 23/25) · TIME-SPILL PASS · core gates G1/G2/G3/G5 PASS (G2 «need th» seen by the worker on 21703845 is gone after the k4 bundle) · **G4 70-npc-purpose-scan FAIL «j54.js:99 done-text not found» = PRE-EXISTING on LIVE main f85cba97, on the bundle 35b3a3f5 and on cd43bd8a alike** (same scan script, same 1 problem; j54 untouched here) → not od03; flag to whoever owns npc-purpose rows.
- LIVE-revert audit (50bea9c9 vs f85cba97, 91 files): 0 lines of LIVE lost that bundle and od03 both still hold.

## Balance note (judged, not tuned) — for BAL PROOF session_01964izFzGxSL8HNQXDXiA9R
1. The worker's ON/OFF arm does NOT measure od03's diff. OFF = BAL.steal.art all 0, i.e. it switches off the BUNDLE's month-art odds effect (stealArtB inside oSteal, already in 21703845). od03 itself only changes (a) which odds NPCs weigh (seen, not true), (b) NPC/her asks naming the month art, (c) the card rows. The right comparison for landing od03 is bundle head vs bundle+od03; nobody has run it.
2. NPC flip wins track the month art as intended (fav 53 % / neu 42 % / dis 34 % vs odds 55/38/22; OFF flat ~40 %). The compression at dis (22 → 34 %) is the NPC mini-game rung (BAL.steal.mg npcP 1), as designed.
3. HH ON 30 % (6/20) vs OFF 57 % (8/14, OFF arm still running at write time, finished lives only): ≈2 SE on tiny n, on the OLD base 21703845 (FINAL, HH gate lowered — not k4). The sens bot pressed Tranh sủng / Chặn ngự giá 0 times in 34 lives, so she never collects the month-art gain NPCs collect. Verdict: **a bot-policy measurement gap, not a code blocker for od03** — the game lets her press both choices with the same odds rule (law 1 holds in code). It is NOT proof of balance either: BAL PROOF should (i) measure k4 bundle vs k4+od03 (2932b3e1) with ≥20 lives/arm, and (ii) give the bot the flip choice (press when stealShown ≥ the BAL.odds cut it uses elsewhere) before any HH number with the month art ON is read as the player's rate.

## Verdict
**PASS (with 2 reviewer fixes) → LAND READY review/od03-favart-rv 50bea9c97ba9 (lands AFTER the bundle; contains bundle 35b3a3f5 — if the bundle head moves again, the lander re-merges it first) · coop-e2e PASS 99/99 both seats incl. same month art across a month rollover · quickcheck PASS except the pre-existing LIVE G4 npc-purpose-scan (j54:99).**
Worker session_01964izDQzR1Uo3Ssiwer1sk: FYI only — R1/R2 already fixed on the rv branch, nothing owed.
Balance: not a blocker; BAL PROOF to measure k4 vs k4+od03 with a bot that presses the flip choices (see note).

## Re-merge on the final reviewed bundle (22/11 01:52Z, for Foreman D #18)
**LAND READY review/od03-favart-rv bb92f98652 (on review/night-balance-bundle-rv 8746a062 = bundle + LIVE 02c6d8f4; lands after/with the bundle) · coop-e2e PASS 129/129 both seats (same month art across rollover hoa/theu@0 → ky/thi@1, after rejoin) · od03-favart 13/13 · balance-core 39/39 · quickcheck PASS incl. ALL core gates (G4 npc-purpose now green on this LIVE).** Conflict: dev/test/coop-e2e.js — od03 month-art check + bundle's K61MAP check both kept. Diff vs 8746a062 = exactly od03 + R1/R2 (9 files, +114/−7) → nothing of the bundle or LIVE reverted.
