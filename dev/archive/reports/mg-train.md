# mg-train — minigame family integration (Foreman B worker, opus)

Branch: review/mg-train, started from origin/main ee5d33de, now contains origin/main 0ce59361 (fast-forward OK). Lands the whole minigame family (mg-balance-r1, mg-balance-2-r1, nw-poem/quiz/lantern, owner-answers-b, presentation, slap-mg-r3) in one fast-forward.

## Merges (order as briefed; every sha checked before merging)
| # | branch @ sha | conflicts | resolution |
|---|---|---|---|
| 1 | review/mg-balance-r1 @288aa4f6 (core BAL.mgTier + jmgt.js) | assemble.py, jbal2.js, index.html, sw.js | main's file list + jmgt.js after j91; jbal2 keeps main's BAL.mline and adds BAL.mgTier |
| 2 | review/nw-poem-r1 @5d200041 | assemble.py, generated | jnwp.js after jmgt.js |
| 3 | review/nw-quiz-r1 @33730518 | assemble.py, generated | jnwq.js after jbal2.js |
| 4 | review/owner-answers-b-r1 @07f84484 (carries nw-lantern-r1 + presentation-r1) | MINIGAMES.md, assemble.py, j91.js, generated | j91: theirs (k91Lantern deleted); MINIGAMES.md: tho/doi rows from nw-poem + doden row from nw-lantern; jlant.js after jbal2, jpres.js after jsfx |
| 5 | review/slap-mg-r3 @6444443b | assets.json, assemble.py, jbal2.js, KIT.md, mg-bots.js, generated | jmgt.js = mg-balance-r1 version (git kept ours, slap had no own change); jbal2: slap's OLD mgTier copy dropped, order = core `Object.assign(BAL,{mgTier:…})` → `BAL.slap` → `Object.assign(BAL.mgTier.occ,{tat,ne})` (order trap; runtime check: occ = hoc,hoi,trieu,exam,tuyen,tat,ne; wk.th = [6,10,15]); KIT.md keeps §45.4 + §28.13b and §79; mg-bots.js = core bot + slap `aim` + `KG82.noDemo`; jslap.js after jts |
| 6 | origin/main 5682ce6f (design-scale-p2, title-tag, merge-train-8 which already held nw-poem/nw-quiz/nw-lantern/presentation) | assets, assemble.py, jbal2, jk3, jk4, KIT.md, generated | assemble = main's list (kvfallback first) + jmgt after j91 + jslap after jts; jbal2 both; KIT.md keeps §79 + §82/§61; jk3: main's k3Phone + owner-answers' Q6 `alive` flag; jk4: main's `.kv1` block (one page = 582 px design width < 600, so icon-only room button matches Q6), owner-answers' Q6 wide rule `@media (min-width:1000px)` → `html:where(.kv2)` (KIT §0 design scale; scan: it was the only viewport media query this train added) |
| 7 | review/mg-balance-2-r1 @961c1f8b (Foreman B order: last) | assemble, j82, j91, jbal2, jlant, jmgt, jnwq, mg-bots, generated | jbal2: mg-balance-2's WHOLE BAL.mgTier (lev / kAdj / kG — trap), slap block + `Object.assign(BAL.mgTier.occ,{tat,ne})` after it; jmgt exports mgLev + mgTierOf; jnwq/jlant keep the shared mgTierOf (both branches fixed the same bug); j82: their mua text + dead-code placeholders; j91: verse/pair stay deleted; mg-bots: their MGBOT_* knobs + slap aim |
| 8 | origin/main 0ce59361 (anim-pace, square-icons, phone-bars) | generated only | rebuilt (main touched only BAL.pace among minigame files) |
Generated files (index.html, sw.js, assets.json) always rebuilt with dev/build/assemble.py + dev/site/build_site.sh, never hand-merged.

## Fixes made while merging (whole family)
1. ONE tier helper `mgTierOf(env)` (jmgt.js): the tier mgSet() put in KG82.tier for this play (carries the occasion: exam stakes, contest, lesson), else `kg82Tier(env.lv)`.
   - jnwq `nwqTier`: called `mgTier(env.kind, KG82.ctx)` with a STRING → occ "hoc" + her own rank, exam stakes ignored → now `mgTierOf(env)` (+ BAL.nwq.shift, 0).
   - jlant `lmTier`: expected a number from `window.mgTier`, got an object → always fell back → now `mgTierOf(env)` (BAL.lantern.tier still forces one for tests).
   - jnwp `nwTier`: was already correct (read KG82.tier) → now the same helper.
   - Scan of every `mgTier(` caller: only jmgt, j82 kg82DiffWord (object use, correct) and jslap slapMg (object; sets KG82.tier itself, correct). Every kg82Play caller runs mgSet first (j82 startContest/playArt/kg82Lesson, jexam, jts, jtd) — same set the mg-balance reviewer listed; main's new files add none.
2. Dead word-game code deleted (proof: assembled-file scan + runtime list of `KG82_KIND[*].e` — rhythm, go, pattern, steps, aim, hold, fling, trace, arrange, untangle, cook, blend, calli, doiline, lamp, lay, sort, seat, clue, td*, groom, tspluck, tssteer, slapbar, kinh, may: none uses quiz/verse/pair; every MG lesson key incl. thi and y is replaced through KG82_MGL by j82's openMG wrapper):
   j5 DOI, YQ, MG.thi, MG.y, quiz(); j82 KG82_HUONG, KG82_BEP, kg82Bank, kg82Quiz, KG82_ENG.quiz (kind keys tho/doi/banh/huong kept as one-line placeholders so the kind ORDER is unchanged); j91 K91_LB, k91Verse, k91Pair + verse/pair registration and kinds (k91Lantern already gone with nw-lantern). Kind list and order identical before/after (runtime check). −~200 lines.
3. Page error found by the bots: jnwp thư pháp read `F.S[ns]` when a stroke ended in the 250 ms after the last one ("Cannot read properties of undefined (reading 'length')" at scoreStroke). Same guard as mg-balance's earlier j91 trace fix (whole family: j91 trace, jnwp calli; doiline / seat / lay only end when every slot is filled, no such index). Re-run: 0 errors.
4. mg-bots.js now sets KG82.tier from the tier spec (null for a raw `eN` spec) so the nw-* engines are measured at the asked tier.

## Tests (final build, own http server)
- FINAL sha (after merges 7 + 8): mg-balance-vp 30/30 at 755x1000@2 and 844x390@2, 0 errors (main 0ce59361 changed only BAL.pace among minigame files). After merge 7 (d8fca348), with an old save from main 5682ce6f: 30/30 at all 6 sizes, 0 bad, 0 page errors, old save loads; coop-e2e 59/59; mg-bots 960 plays 0 page errors; slap-mg at 755x1000 timed out on the dodge (the same CDN preload wait: board still empty at 1.3 s, screenshot looked at; the earlier run of the same test at that size passed every check).
- Before merges 6–7: dev/test/mg-balance-vp.js (old save made on origin/main → this build; every kind opens + finishes by bot; startContest kinds show the "Độ khó" row): 30/30 kinds (dan hat co dauho ban tho doi doden ve hoa theu kim mua banh huong td_cong td_dung td_ngon td_hanh chai le tc xa thq duho den tat ne kinh may) at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2 — 0 bad, 0 page errors, 0 horizontal overflow, old save loads at every size.
- dev/test/slap-mg.js: 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2 (rotate prompt shot) all checks pass, 0 errors. 1000x755 passes on re-run; 844x390 `demoShown` false twice — timing only: the tát board paintings are not on the CDN yet, so kg82Preload waits up to 2.5 s before the engine starts and the check reads at 0.9 s; the screenshot right after shows the demo card (looked at).
- Exam path: jexam round with occ "exam", rank = target → KG82.tier Khó, nwqTier 2, intro row "Độ khó: Khó · gợi ý ở nút Gợi ý · khảo hạch, tài nghệ bậc 0" (screenshot looked at, 755x1000@2). dev/test/promo-exam.js 23/24, the one FAIL ("old save loads: exam state…") is the known pre-existing one (nw-quiz reviewer: main vs main gives the same FAIL); its round shot is covered by the night card-flip scene (harness, not the game).
- coop-e2e (jslap touches the act path / res message): 59/59 twice in a row (a first run gave 56/59 — start / fold / week-after-rebirth timing, the same flake the slap reviewer saw; not reproduced).
- Own board screenshots looked at: tho, doden, le, xa at 755x1000@2; doi, tc, thq at 844x390@2 (+ slap intro / demo / bar / marks / dodge at every size; 390x844 rotate prompt).
- Console only (not page errors): j90 confetti "translate(NaNpx…)" at 390x844 behind the rotate prompt — j90 untouched by this branch.

## mg-bots n=30 at Vừa (hoc/4/2 = rank 4, art 2), after mg-balance-2-r1, skilled / random, raw score
| kind | skilled ≥9 raw | skilled mean | graded ≥9 (kG) | random ≥9 | random mean |
|---|---|---|---|---|---|
| banh | 17 % | 7.8 | 17 % | 0 | 0.5 |
| co | 93 % | 9.3 | 43–93 % (kG 3: needs raw ≥9.47; 13/30 at 10) | 0 | 0.1 |
| mua | 20 % | 6.8 | 20–40 % (kG 1.25) | 0 | 0.3 |
| td_hanh | 20 % | 5.8 | 20 % | 0 | 0 |
| td_ngon | 53 % | 8.4 | 17–53 % (kG 2) | 0 | 0.3 |
| dauho | 23 % | 7.2 | 23 % | 0 | 0.0 |
| td_dung | 13 % | 8.0 | 13 % | 0 | 0.8 |
| tho | 57 % | 8.5 | 57 % | 0 | 0.0 |
| doi | 100 % | 10.0 | 100 % | 0 | 0.1 |
| doden | 90 % | 9.4 | 90 % | 0 | 0.8 |
| le | 100 % | 10.0 | 100 % | 0 | 0.1 |
| tc | 100 % | 10.0 | 100 % | 0 | 0.0 |
| xa | 100 % | 9.7 | 100 % | 0 | 4.3 |
| thq | 100 % | 10.0 | 100 % | 0 | 0.1 |
| tat | 23 % | 5.6 | 23 % | 3 % | 2.8 |
| ne (dodged = 10) | 57 % | 5.7 | — | 17 % | 1.7 |
(The bot prints histograms by whole point; graded ranges come from kG and the 9-bin. Exact graded numbers: mg-balance-2-r1 review.)
In target: banh, mua, td_hanh, dauho, tat (≈20–30 %); td_dung a bit low; random ≈ 0 everywhere except xa (guessing gives 4.3 mean, 0 % ≥9) and the one-tap slap/dodge (window/period, accepted by the slap reviewer).
FAR ABOVE target: the no-word engines (tho 57 %, doden 90 %, doi / le / tc / xa / thq ≈100 %) and co. The nw-* boards are puzzles the oracle bot solves exactly and they score correctness, not time, so a skilled player is near 10/10 at every tier; kG / kAdj cannot move a perfect 10 (and these engines read the tier word, not the ease trim). NOT tuned here (engine scoring changes inside reviewed games, outside this brief): OPEN ITEM for Foreman B — add a time / mistakes component in BAL.nw / BAL.nwq / BAL.lantern (and co), and give the bot search time on "find the match" boards (the oracle knows the answer at once, so it overstates players; real players will score lower, probably not down to 20–30 %).

## KIT REQUEST (pre-existing, not from this branch)
- j82 game frame at 844x390: the board canvas has a 260 px floor (kg82Canvas) under the intro rows, so its bottom ends below the screen (canvas bottom 408 px on a 390 px screen) and the Gợi ý button row sits over the lower part of the board — measured the same for old games (ve, dan, hoa) and the new ones (tc, doi, thq); the dialog (.kginfo) scrolls, so it is playable, but the pieces to drag start half hidden. nw-lantern solved it for itself only (jlant `fit`: scroll the board to the top of .kginfo on short screens, BAL.lantern.short). Whole-family fix belongs in the shared frame (j82 kg82Play / kg82Canvas: on short screens scroll the board whole above the button row for every engine), by the kit keeper; then jlant's private fit can go.

## Open items (not this branch)
- review/mg-balance-2 (other B worker) tunes banh / co / td_hanh / mua + td_ngon on top of this.
- BAL.mgTier.kAdj has no tho/doi/doden/le/tc/xa/thq entries (0); nw-* engines read the tier word.
- slap demo check: the tát/né paintings are not painted yet (art paused), so first play waits up to 2.5 s on the CDN.

## Handover (context ~40 %, nothing left but this report)
Branch is final unless main moves again: re-merge origin/main (expect only generated-file conflicts), rebuild, re-run mg-balance-vp at 755x1000@2.

## Clean-up
Worktree /home/user/wt/mg-train deleted after push; own servers stopped by their task ids.

SẴN SÀNG KIỂM 7e52cb1c2ba1028a6041e4ed2a26a0db83825540
