# danh-p1-r1 — reviewer (opus) for review/danh-p1 @ 98d7acc4

Merge: review/danh-p1 98d7acc4 onto origin/main 5682ce6f → review/danh-p1-r1. Conflicts: jbal2.js (both sides only added blocks:
main's mline/cmaid/mood/mem blocks + this branch's BAL.charity value change — all kept), generated files (index.html, sw.js, assets.json)
rebuilt with dev/site/build_site.sh.

## Owner ruling check
FOREMAN_D.md "(12:55Z s16) … ANSWERS": P1 APPROVED (charity bạc 20→35, Danh 1→5 + shared Hành sự door); P2 bot first, no BAL.ex.bar
change; P3 NO. Diff = exactly that: BAL.charity {khac 1, bac 35, duc 3, danh 5} (jbal2 only), one effect body charityFx (j85) used by both
doors, one lock S.charM + bạc (charityLocked), Hành sự card adCharityCard via the act-dedupe second-door path (jact, like the maid cards).
BAL.ex.bar unchanged; no P3 change. Bot-only edits in dev/measure (inpage6 hooks, vclock, run_rep, intn, antn).

## ONE CORE / wording / kit
- Every shown number reads BAL.charity (card c/w, Tài nghệ button text jtabs/j85, Đức panel row); "Thiếu bạc (cần 35)" is the generic
  cardWhy from c.bac. Shown = applied (test: door effects = BAL). No typed copy (git grep).
- Kit act card (Cần/Tốn/Được), same look as the neighbours at all viewports; no new CSS. Player text has no %; sure act carries no odds label.
- Old saves: test "old save (no S.charM)" ok; palace-oldsave (save made on origin/main build → loaded in this build): 0 errors.

## Tests (this merge, local server)
| test | result |
|---|---|
| dev/test/danh-p1.js 755x1000@2, 1180x820@2 (+ 1000x755, 1366x1024@2, 844x390, 390x844 with shots) | 17/17 ok, 0 page errors, every size |
| act-dedupe-w1 | PASS |
| act-dedupe-vp (5 viewports + 390x844) | PASS (1st run FAIL 2 while 4 bot pages ran beside it; re-run PASS — load flake) |
| succession (755x1000) | PASS |
| palace-oldsave (main build save → this build) | 0 errors |
Screenshots looked at: card in Hành sự at 755x1000 (sheet), 1180x820, 1366x1024, 1000x755, 844x390; 390x844 = rotate prompt.

## Sims re-run (my seeds 1301 + 2602, 16 lives each, cap 144 tuần, run_rep.js; before = origin/main 5682ce6f build, P1 = this merge)
| | hs before | hs P1 | mix before | mix P1 |
|---|---|---|---|---|
| Danh at tuần 144 | 43.2 ± 12.2 | 82.7 ± 6.8 | 19.1 ± 8.1 | 41.3 ± 14.2 |
| tuần held back by the Danh row | 45 % | 7 % | 72 % | 45 % |
| tuần held back by the Sủng row | 11 % | 31 % | 4 % | 9 % |
| max rank | 3.3 ± 0.5 | 3.6 ± 0.5 | 2.6 ± 0.4 | 2.9 ± 0.4 |
| Hoàng hậu in 144 tuần | 0/32 | 1/32 | 0/32 | 0/32 |
| died / ended early | 6 % | 6 % | 12 % | 9 % |
Per seed Danh-row hold: hs 44→4 % / 47→10 %; mix 74→47 % / 69→43 %. Same direction and size as the worker (51→12 %, 72→47 %). 0 PAGEERR.
P2 (seed 1301, P1 build): exams passed hs 59 % (82/139) vs hs + Tài nghệ 100 % (98/98); score 56.2 vs bar 21.1; Tứ đức part 0 vs 16.6;
max rank 3.7 → 4.7. Confirms the worker: the bar is not the problem (no BAL.ex.bar change, as ruled).
Reproducibility: p1_hs_1301 re-run (other arms had finished, different load) → byte-identical (md5 eb3d5e23ee34 both). Runner claim confirmed.
Data: dev/measure/pass/data/danh-p1-r1/*.json.

## Flags (not blocking; for the foreman)
1. KIT (category ribbon): the new card's picture ribbon says "Buôn bán" — kitActCat (j79 KIT_ACT_CATS) guesses the category from the
   name and /bạc/ hits "Phát bạc …". Family scan dev/measure/actcat-scan.js: 104 of 1934 act/option names land in "buon-ban" by the word
   bạc/đổi/mua/buôn, many wrong (Buông bỏ, Bạch lộc, Đứng xem, mặt không đổi sắc, Đổi đường đi…, Kim bạc thử độc, Cúng dường bạc dầu đèn,
   Góp bạc cứu lụt). Kit-keeper item (KIT REQUEST: word-boundary regex + a per-act category override in ACTS.json), not a danh-p1 fault.
2. BALANCE (PREAMBLE, bạc valued by rank): 35 bạc is ≈ 88 % of a month's pay at Đáp ứng (BAL.pay[0] 40) but ≈ 21 % at rank 5 (165) —
   at high rank the card is a near-free monthly Danh +5 (bots use it ~31×/life). Owner approved the flat numbers; a rank-scaled price
   (like BAL.thy.cost) is an option for a later balance pass.
3. With P1 the Sủng row becomes the main hold for a Hành-sự player (11 → 31 %), and with Tài nghệ Danh sits at the 100 cap by tuần 144.
4. Pre-existing (worker flagged): Tài nghệ card source text "Chắc chắn · …" (not on screen in the kit render).
5. Discoverability of the exam's Tứ đức/art parts (worker's open item) stands.

RESULT: PASS
