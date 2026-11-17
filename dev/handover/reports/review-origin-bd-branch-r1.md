PRIORITY #1 CHECK ('Bắc Địch|origin-bd|ORIGIN_BR|OW69|KIT_OW'): OD 14 (OD:L1213–L1220 read verbatim) | ledger 0 | claims 2 (worker session_01N1tNP2P9Eko2vdenJRPyk3 L675; this review L712) | main: jorigins.js bd (10th origin), j69 OW69, jk2b KIT_OW copy, new on main c29866a6: jkc2 KC2K bd→nc, jentry/joi ENT_INTRO.bd | review/*: review/origin-bd-branch 24c23752 (under review), review/one-core-dup2-r2 / arcs-r2v / roads-r1 (trial-merged below)

# REVIEW review/origin-bd-branch r1 — VERDICT: PASS
Reviewer session_01N1tNP3r4Wz5SfLPnQXnXnJ (opus, BIG). START_CTX ≈ 4 % of the window (estimate); finished well below rollover.
Verdict branch: **review/origin-bd-branch-r1 @ 4e50e6ea65851b37ba9a9a61bc7bbd9b43a30fd3** = worker 24c23752 + my old-save test + merges of origin/main c29866a6 and 25bfd7cf (site rebuilt); origin/main 25bfd7cf is its ancestor (fast-forward ready).

## (1) Structure — OK
- Bắc Địch exists only as `ORIGIN_BR.bd` {par:"nc", land:"Bắc Địch"} (jorigins.js); no `ORIGINS` entry, so no own card anywhere. Readers of ORIGINS in the 280 modules (j2 start, j69 roll, jk2b roulette, jagent NPC names) checked: roulette = 9 cards with ONE "Công chúa hòa thân" card; a bd life lands on it (target = originRoot). Tutorial (tut-origins-scan 10/10 incl. bd), Tuần lục/codex/seat pick have no origin list of their own (they read S.origin), co-op seat load goes through deser / jcoopthin `originByKey`.
- Branch roll: new lives `originBrPick(nc, r)` with BAL.orig.br.nc (j2 Math.random; j69 pre-roll from a derived seed stream). Roll check 3000 seeds ow3: nc 90 / bd 82 (1:1 inside the 6/130 slot).
- Name shown: identity card "Công chúa Bắc Địch hòa thân", rarity chip = the hòa thân card's ("Thân phận rất hiếm"); jroute escape text now `nhà ở ${land}`; j72 envoy translation for every hòa thân branch.
- Branch-keyed content still reached: STORY/QUEST67.bd, ARC67 bd_* (story14-frame: bd walks chapters 1..14 on bd_hoa), fam_bd letter, close maid, BAL.home.bd; main's new pre-palace road (jkc2 KC2K bd→"nc", Bắc Địch land data) and origin intro (ENT_INTRO.bd) key on "bd" and keep working after my merge.
- Non-blocking notes (pre-existing, not this branch): player seal `KIT_ORIGINS` (j-kit) has no bd emblem (old K12 open, bd shows no seal as before); NPC consorts never roll bd (BAL.ag.org has no bd) — owner 16/11 09:10Z wants NPC consorts to roll foreign-princess identities too → a Foreman B ticket, not this branch's scope.

## (2) Old saves — OK (new test, real main saves)
New `dev/test/origin-bd-oldsave.js` (committed on the verdict branch): a bd life is played on the MAIN build (bd = 10th origin there) and saved at month 2 (mid-tutorial), 24 (mid-road) and the last alive month 40–72 (late); each loads on this build.
| save (main build) | k / par / land | rank, turn, kids, chapter + plan, road + cast, story/arc state | 60 buổi on, story tab, chip |
|---|---|---|---|
| mid-tutorial (turn 2, ch 2, bd_hoa) | bd / nc / Bắc Địch | all identical | PASS, "Rất hiếm" |
| mid-road (turn 24, ch 8, bd_hoa) | bd / nc / Bắc Địch | all identical | PASS |
| late (turn 72, ch 14) | bd / nc / Bắc Địch | all identical | PASS |
- Pre-roll freeze: for 3000 seeds main `ow69Pick(s,true/false)` == branch `ow69Pick(s,1/2)` — 0 differ (bd still comes for ow2 lives, 166/3000).
- Co-op: a seat blob with ok "bd" (jcoopworld deser path) loads as bd/nc. Result 14/14, 0 page errors (pre-merge and re-run on the final merge).

## (3) Numbers — OK (bd inside the band within error; 1:1 split sane)
Same smart-bot harness as the worker and OD:L1220 (run_par + inpage6 sens + inty, forced origin, first random life dropped), my own seeds (11/31/51/71/91 bd, 41/61/81/97 nc), 1–3 pages, worker's inpage6 + a counter for "card dropped because every option was refused".
| branch | n (mine) | Hoàng hậu % | median yrs to HH (p25/p75) | early death % | top early-death causes | n pooled with worker | HH % pooled | early death % pooled |
|---|---|---|---|---|---|---|---|---|
| Bắc Địch bd | 62 | 42 | 8.0 (5.9/9.5) | 44 | poison 18, illness 5, childbirth 2 | 107 | 43 (±5) | 44 |
| Nam Chiếu nc (control) | 45 | 40 | 9.2 (5.3/11.9) | 40 | poison 8, childbirth 6, illness 2 | 77 | 35 (±5) | 40 |
- bd − nc = +8 pts pooled ≈ 1.1 SE → no real difference; bd is not harder than Nam Chiếu, so by "hard → rare" it gets the same share: BAL.orig.br.nc = {nc:1, bd:1} inside the approved hòa thân slot 6/130 is sane.
- Band 20–40 %: bd 42–43 % sits on the top edge, nc 35–40 % too; the today's bot reaches HH more easily for BOTH branches (control nc was 28 % in the worker run) → not a bd-specific excess; no change asked.
- Early death 44 % is NOT bd-specific (nc 40 %, same harness). Mix differs: bd dies more by poison (29 % of lives vs nc 18 %), nc more in childbirth — watch item only (n too small to act; no "early suicide pays" sign: died <1 month 0).
- Harness fix (inpage4/5/6 skip off / lk / need / mood-locked options, try the others, else drop the card): the options it skips are the ones the UI greys out (a player cannot pick them either). Counter result: 0 cards dropped and 0 TIMEOUT lives in 107 runs → it does not hide a stuck state. Main has since added the narrower `!c.off` filter to inpage4/5 (d7d0d0aa); merge kept the branch's superset.
- Watch item for Foreman B: review/one-core-arcs-r2v rewrites the bd (and nc) arc options (removes the typed `o:`/`sc:` odds in jorigins). After it lands, the bd/nc share should be re-measured with this same harness (one run each) — the 1:1 split rests on today's odds.

## (4) ONE CORE — OK
OW69 = BAL.orig.ow, KIT_OW = BAL.orig.ow (no typed copy left; git grep "nc:6" only in jbal.js). BAL.orig.ow2 keeps the frozen ow2 table (nc 6, bd 7 …) on purpose: lives pre-rolled while bd was a card must keep what they were shown, so it must NOT follow later edits of ow — correct as a separate frozen constant. one-core-guard 0 fails (core gates PASS, no --allow-grow), before and after my merge.

## (5) Kit + wording + devices — OK
Only changed player words: roulette card "Công chúa hòa thân", escape line "nhà ở Bắc Địch/Nam Chiếu xa xôi, thư đi lâu" (cổ trang, no %). No new UI part; card/chip are kit (kitRoulette/kitOriginFace, kitChip). Shots looked at (scratch only, not in git): Fold 755x1000@2 roulette 3×3, no orphan card, "Công chúa hòa thân · Rất hiếm"; bd identity card (banner, name, chip, lore, stat cells, Nhận/Đổi thân phận); iPad 1180x820@2 roulette 5+4 and bd identity card. No overflow, no cut text.

## (6) Gates
| gate | result |
|---|---|
| origins.js 755x1000@2 / 1180x820@2 | 28/28 / 28/28 (pre- and post-merge) |
| origin-bd-oldsave.js (new) | 14/14 |
| tut-origins-scan | 10/10 (9 origins + bd) |
| tut-quests TQ_ORIGIN=bd | 35/35 |
| road-rare | ALL PASS |
| road-saves tt,dtq,nc,bd,td | 6/8: bd mid-road keeps bd_ngua PASS; 2 FAIL ("main build (dtq): no road state", "td phase-1 plan") = the SAME 2 FAIL on pure main 9391f9a9 (stale expectations: roads now full) → not this branch |
| story14-frame | every origin + bd walks 1..14; `chAdvance67 p.startsWith` TypeError → identical on pure main (main's own test copy) → pre-existing ticket |
| quickcheck | PASS (pre- and post-merge; core gates: one-core-guard · rules-one-source · kit-conform · coop-one-world) |
| coop-e2e | 62/62 (pre-merge), 63/63 (on main c29866a6 merge) |
| final sha 4e50e6ea (main 25bfd7cf merged, generated files only) | quickcheck PASS (core gates PASS), origins 28/28 Fold |

## Merges
- origin/main c29866a6 then 25bfd7cf merged into the verdict branch (25bfd7cf: generated files only, no origin code): conflicts only generated files (rebuilt) + dev/measure/inpage4.js / inpage5.js (kept the branch's wider locked-option filter, superset of main's `!c.off`).
- Trial merges (git merge-tree, not pushed): with review/one-core-dup2-r2 069188d7 and review/one-core-arcs-r2v 6b2ab41b the ONLY bd-specific conflict is dev/build/j69.js `ow69Rare` (they replace 6/9 by BAL.rareLv[0]/[1]; this branch uses OW69[originRoot(k)]) → resolve = keep both: `const w=OW69[originRoot(k)]||0; … w<=BAL.rareLv[0]?…:w<=BAL.rareLv[1]?…`. With review/one-core-roads-r1 75bc9f05 no bd-specific conflict (its j2/j72 conflicts exist against main already). All three also conflict with current main on their own (assemble.py, j9, j10, j24, jkc …) — they need their own main merge first.
- Foreman D story-frame (jorigins.js): this branch only changes the bd header + line 9 (ORIGIN_BR.bd); a story-frame edit near lines 13–15 merges trivially, whichever lands second keeps both.

Shots: scratch only (/home/user/wt/rbd-shots), deleted with the worktree; no CDN review folder used.

## Verdict
PASS review/origin-bd-branch-r1 4e50e6ea65851b37ba9a9a61bc7bbd9b43a30fd3. Follow-ups for Foreman B (not blocking): (a) re-measure bd/nc share once after one-core-arcs-r2v lands; (b) j69 ow69Rare merge note above for dup2/arcs; (c) NPC consorts never roll bd (owner 16/11 09:10Z); (d) story14-frame startsWith crash + road-saves 2 stale expectations are on main.
