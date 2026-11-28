# D-GIFTIN-LIKE — report (worker session_01964izDXiybd9mxJY4C4UHc, for Foreman D ROOT session_01964izEUYzmixcs6Yg5ZXsE)

PRIORITY #1 CHECK: OD «giftin»: 0 rulings (D's check, brief) | main dev/build/j8.js PEND.giftin + giveTo (relAdd before the push), j83.js wkGive (relAdd before the push) | review/* review/d19-gift-npc-rv cc856c9e (in review/lr-rules; its reviewer note reviews/d19-gift-npc-review.md:45 names this exact fault) — reused: its keepGain / rcvGiftIn answer rule is mirrored here, nothing rebuilt | claims: none other (D-GIFTIN-LIKE claimed by D ROOT).
KIT CHECK: reuses the existing PEND.giftin / pgin option cards (kit option card, odds chip), pvQuy / balSg text helpers; no new UI part.
START_CTX ≈ 4 % (own estimate, get_session used_tokens reads 0); at delivery ≈ 16 %, under the 29 % rollover line.

## Branch
**review/d-giftin-like @ 329da0a5** (base review/lr-rules caa95310, which already holds LIVE main 5ad52416). Two commits: 83998c62 (fix + scan + build), 329da0a5 (npc-purpose row follows the changed jrcp line).
Against review/lr-rules-r2 a96564ad (newer bundle, contains caa95310), the sources merge cleanly; only the built files index.html / sw.js conflict, so a rebuild settles them.

## The fault (law 1 mirror of d19, law 3)
When an NPC sent HER a gift, `giveTo(a,S,…)` (j8) and `wkGive(a,S,…)` (j83) ran the keep gain (relAdd giver↔her + the giver's hh) at SEND time, before she answered. So «Trả lại quà» still left the giver's liking up and her oán eased (net −12 + 8). The Thái y check ended at −3 instead of −3 + gain. For an NPC receiver, d19 already waited for the answer.

## The fix
- j8: `giftKeepOf(r,e[,g,gr])` = ONE reader of the keep gain {r: giftRel, hh: giftVal when the receiver is Hoàng hậu / she at rank ≥ 7}. `giftKeepGo(a,r,kg)` pays it through the one relAdd. giveTo keeps using it for an NPC receiver (unchanged numbers). To HER, the card carries `pp.kg` and nothing is paid at send.
- PEND.giftin answers: **Nhận** → invAdd + giftKeepGo (card text: `cất vào rương · được: <tên> quý ngươi +N`, pvQuy range). **Trả lại quà** → go_2 only (text now names it: `… · <tên> với ngươi -12/-6`). **Thái y**, nothing found → go_3 + giftKeepGo. Taint found → evidence only.
- j83 wkGive: same, `kg={r:ev.rel,hh:ev.fx.hh}` on the card.
- jpoison: a food gift (giftin → pgin wrapper) passes kg on. pgin `keep()` pays it (Nhận ngay clean / kim bạc clean / maid tastes clean). It is **not printed** on the pgin card, because a clean and a poisoned dish must read the same (no tell).
- jrcp (a friend shares a pattern copy): before, it carried no gain at all. Now it carries `giftKeepOf(S,e)`, so her Nhận pays the friend's gain like any gift (law 11, the same rule).
- jptime (a servant carries the card): pp is passed whole, so kg rides along. jcoopthin / jcoopworld: the co-op friend is a player seat with no NPC liking, so no change (delta 0, static scan).
- **Old saves**: a saved giftin card has no kg (its liking was already added at send), so Nhận pays nothing more. No double count (tested).
- **Law 4, one new BAL key**: `BAL.eff.j8.goHhQ: -8`. «Trả lại quà» to a Hoàng hậu giver had a typed `apply({hh:-8})` in j8. It now reads BAL, with the same value and behaviour. No other new number.

## Law 11 scan — dev/test/giftin-like-scan.js
A static pass over every giftin/pgin pusher in the built page (7: j8, j83, jcoopthin, jcoopworld, jrcp, jptime landing, jpoison pgGive), plus a runtime Fold pass (j8 item ×3 answers, j83 work ×2, food→pgin ×2, old saved card).
| run | static pushers | runtime | result |
|---|---|---|---|
| LIVE main 5ad52416 | 2 FAIL (j8 L2722, j83 L36347: relAdd before push) | 13 FAIL: send moves liking (+8/+9 her side, oán −2), Nhận pays 0, Thái y ends −3 | **FAIL 15** |
| branch 329da0a5 | 7/7 PASS | every send delta 0/0/0/0/0; each answer = exactly its relAdd | **PASS** (3 runs in a row) |
Before / after per answer (giver's liking toward her, one run each):
| road · answer | LIVE at send → at answer | branch at send → at answer |
|---|---|---|
| item · Nhận | +9 → +0 | 0 → +10 (gain 8, trust range) |
| item · Trả lại quà | +9 → −12 (net −3, oán eased first) | 0 → −12 |
| item · Thái y (clean) | +9 → −3 | 0 → −3 + gain |
| work · Nhận | +11 → 0 | 0 → +5..+10 |
| work · Trả lại quà | +11 → −12 | 0 → −12 |
| food · Nhận ngay | +4 → 0 | 0 → +4 |
| food · Trả lại quà | +4 → −4 | 0 → −4 |
(The giver→her side carries the jaudit trust multiplier, a range. The scan compares it to the same relAdd within that range; her side and oán are compared exactly.)

## Gates
- giftin-like-scan: **PASS** (LIVE FAIL 15).
- d19-gift.js (Fold 755x1000 + iPad 1180x820): **D19-GIFT PASS**.
- gift-return-scan: **PASS**.
- gift-dead-scan y14-ncBtuc-010 / y05-ncBtuc-035 (fixtures from dev/handover/fixtures/save-growth): **PASS / PASS** (0 dead tiles).
- undef-scan: **PASS** (360 names).
- npc-purpose-scan: was FAIL (row jrcp.js:303 done-text followed the old line), now **PASS** (row updated in 329da0a5, still npwPick).
- quickcheck: `dev/site/build_site.sh` cannot run here, because the CDN index host ctm-img.victoria-tntt.workers.dev is blocked by this box's proxy (403). I built with an offline copy that keeps assets.json and reuses the PRE list from sw.js; it reproduces the base build byte-for-byte except the build line. **quickcheck.js (open Fold · old save from LIVE loads + plays a buổi · perf vs live, median of 3): QUICKCHECK PASS** (render 313/280 ms, tab 624/514, buổi 1693/1521, tasks>200ms 24/33).
- coregates on branch vs base caa95310 (same box): every result is the same on both. The failing ones also fail on the base: dialog-fixed 2, LOOK-DEDUPE 6, Q-SOFTLOCK 8, FIX-6 4, manifest-guard (CDN 403). The base's own coop-one-world fail is only because its worktree had no dev/index.html assembled; the branch's coop-one-world PASSES. kit-conform: the base shows MISSING 338 and the branch 339; the only difference is PEND:cyrep (not touched here, the same assembly artefact). kit-std-scan 6 = 6.
- coop-e2e (soft): could not run, because the co-op relay is unreachable from this box (A gets no room code). This is environment only.
- Shots (outside git, /home/user/wt/giftin-tools): Fold giftin card = the same kit card (Nhận / Trả lại quà / Thái y with the odds chip). The iPad shot only caught the boot loader (the CDN is blocked); d19-gift covered iPad.

## Open for D
1. jrcp shared copies now give the friend a keep gain on Nhận (before: none). This follows law 1/11 and the same giftKeepOf. Revert that one line if D wants copies gain-free.
2. The pgin card does not print the gain (no-tell rule), so the gain stays unshown there on purpose.
3. New BAL key goHhQ (named above).
