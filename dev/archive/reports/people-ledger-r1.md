PASS e3d29d73b1e4bcfc05f6334f30e158d39918d194  (supersedes 44355544; re-merged onto origin/main 7b5e5e49 on Foreman C s7 request)

# people-ledger-r1 — Opus reviewer (Foreman C session 6), tier BIG
Reviewed review/people-ledger 4bdb8672 merged onto origin/main 67cd00a2 (two merges: 810d594a, then 67cd00a2; only generated
index.html / sw.js / assets.json conflicted → rebuilt with dev/site/build_site.sh). Branch review/people-ledger-r1 = 44355544, origin/main is
its ancestor (fast-forward OK). Diff vs main = the branch's 14 files only. START_CTX ~5 % of the window. No code changes by the reviewer.

## Tests (re-run by the reviewer)
| test | on 810d594a merge | on 67cd00a2 merge (final) |
|---|---|---|
| ledger_shadows consort 1180x820 | 30 moments, map 1722 = record 1722, hidden/extra/twice/offmap 0, page err 0 | 20: 1190 = 1190, all 0 |
| ledger_shadows maid road 755x1000 | 30: 1604 = 1604, all 0, page err 0 | 20: 1086 = 1086, all 0 |
| ledger_hours consort / maid | 40 / 40: bad {} , court 9/9 and 7/7 ok | 25 / 25: bad {}, court 4/4, 8/8 |
| roster_audit sens 18 | 17 799 checks, (a)–(r) all 0, page err 0 | – |
| roster_audit rand 8 shard 4 | 20 581 checks, (a)–(r) all 0, page err 0 | – |
| stage-counts LEDCNT=arrive | thd 132 / cnv 72 walks, mism {} | – |
| roster_oldsave main→r1, people-ledger→r1 | 755x1000 + 1180x820 loaded, record on load, bad 0, errors 0 | main 67cd00a2→r1: same, 0 |
| coop-e2e (live Worker) | 59/59 | – |
| ledger_stage (HOST) fold, ipadAir, foldLand, ipadPro, iphone14Land, iphone14 × both roads | record = stage = figures = title count on all 12, no overflow, no page error | fold + ipadAir both roads: all equal, 0 errors |
Shots looked at: Fold 755x1000 both roads (her + 1 figure + "+12"/"+18", kit j59 pager), iPad 1180x820 both roads, 1000x755, 1366x1024,
844x390, 390x844 (rotate prompt shown). Kit only: no new CSS / visual part; stage entries use existing kit kinds. Wording cổ trang, no %.

## OD:L1386 — every NEW or changed NPC decision in the diff
1. Emperor morning court (j95planEmp wrap, BAL.led.court=2): fixed duty from the owner's 13:40Z "mandatory times (e.g. morning court)"; no
   dice, no gate. OK.
2. Men on the maid road: jmen menSched() replaces j22's flat `roll(55)` + random haunt with the fixed roster → REMOVES a flat roll. OK.
3. jmen re-timing to 4 buổi (night = B4L, trysts at night, letters [B4L,2,1,0], physician summons buổi 2): same plan logic, moved. OK.
4. Officials menMinW: same logic, moved into menSched. OK.
5. jemo emoHalf: the EXISTING flat 50 % "sad, wants to be alone" gate (was roll(50)) is now a seeded hash — still a flat 50 % coin, not
   driven by her traits; and the 50 is typed, not BAL. Not new → NOTE for main's npc-agent audit (no FAIL).
6. j95cal: the planner's EXISTING dice (j95dice / j95pw habits and surprises) are seeded by life + buổi (same odds, now a fixed calendar).
   Not new → NOTE for the npc-agent audit.
7. talkOpts [] for other people's servants/children on her stage: a player-side limit, not an NPC outcome. OK.
No new flat random roll, special bar or invented gate found → no FAIL on OD:L1386.

## OD:L1267 one core
New numbers read BAL (led.court, led.cnt). Typed ones left: emoHalf `<50` (pre-existing value, see 5); `Math.min(4,…)` = khắc per buổi
(structure). Note only.

## Notes (no FAIL)
- QUESTION Reading A "now" vs B "arrive": kept A as built (owner 13:50Z wording), per brief; switch BAL.led.cnt works both ways.
- OPEN (h) rare j75 line without bind (worker's OPEN, owner j95c) not hit in my 38 380 audit checks.
- iPad title line "Càn Ninh cung · Ở đây còn N người. Càn Ninh cung: X (Hoàng hậu, chủ vị)." wraps to 2 lines over the scene: main's
  existing line (this branch only rewrites the count) — owner OD:L68 "one line" → for the stage-title owner, not this branch.
- Test harness: dev/test/ledger_stage.js does not dismiss main's new iOS install card (ios-install-first) nor an open result card, so on
  67cd00a2 the iPad shot shows that card; in-page counts are unaffected. Worker should add the dismiss next pass.
- One transient iPad maid-road shot caught her act moment (her figure alone, large); a re-run showed the normal stage (her + figure + "+11").

## Re-merge (Foreman C s7 request): 9fc1ac33, then 7b5e5e49 → e3d29d73
- jmen.js conflict: main's own 4-buổi fix (MEN_SHIFT [0,0,1,2] guard shifts, menOrder buổi map, letters [B4L,2,0]) kept inside the ledger's
  menSched (both roads). index.html / sw.js / assets.json rebuilt.
- ledger_shadows thd 1180x820 1131=1131, cnv 755x1000 1088=1088, all 0; final build 359=359 / 328=328; page err 0.
- ledger_hours cnv 0 bad (court 8/8); thd court 7/7, 1 fault at moment 0 (below). Old save main→r1 loads, 0 bad. coop-e2e 59/59
  (first run 58/59: a timing failure on the "reborn friend name" step).
- ledger_stage.js: also taps the iOS install choice "Chơi luôn trên trình duyệt" (#kload [data-kl="web"]) — test-only.
- PRE-EXISTING (also on main, more often there): at life start a guard's S.menW can keep j22's flat `roll(55)` haunt (e.g. m7 at vuon) while
  S.menWhy says duty ksp. Probe: 1/12 lives here, 3/16 on main 9fc1ac33. Some placeWhere path reaches j22's dice without jmen's overwrite.
  Next ledger pass: find the bypass, or make j22's men dice a no-op whenever jmen's schedule runs (OD:L1386, owner 13:40Z: no random presence).
