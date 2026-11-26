# punish-reason — ONE BIG REVIEW (opus), reviewer session_01D3E3NYgP2MiapKNFbLV7bG, depth 3, START_CTX ~3 %

PRIORITY #1 CHECK: OD rows 26/11 ~01:25Z → ~05:35Z read verbatim (D1 = (2) reason / one rank / lãnh cung stay + ~04:15Z (2) WHO/WHY/EVIDENCE; D4 = OPTION A picked ~05:15Z, tâm cơ canon ~05:25Z/~05:35Z) | main f009e1a6 = LIVE | review/punish-reason fc9af9a1 (FF from LIVE) | brief dev/handover/briefs/D-owner-bugs-2611.md §D1 | worker report has its PRIORITY #1 line.

## VERDICT: PASS on review/punish-reason-rv (tree = branch tip 74e9161f + the 4 reviewer fixes; sha in the message / git log). fc9af9a1 / c6336349 / 74e9161f alone = FAIL (findings 1–4).

LAW 16 — NPC release rank = `BAL.pun.npcOneBelow` (PENDING OWNER, asked via MAIN 152; not failed). Checked BOTH ways on -rv: true → Hoàng hậu 7→6, Tần 4→3; false → 3→0 (old rule); the lãnh cung stay gate holds either way. If sếp keeps the old rule, set `npcOneBelow:false` ON THIS BRANCH (review/punish-reason-npcfloor 38467ddf does not carry the 4 fixes below).

## Findings on fc9af9a1 (all fixed on review/punish-reason-rv)
1. **One rank + law 1, NPC Hoàng hậu / same-day demote** — `dev/build/jpun.js` coldFree read `v.rank` at release; `j8.js fall` sets an NPC queen to rank 6 on entry → released at 5 (TWO ranks below her seat) while her own road (`restore`, `S.coldRank`=7) gives 6. An NPC demoted earlier the same day then sent in (rank ≥ 5) also lost 2 ranks (hers folds via `punFromToday`). Probe: NPC queen fall→release `{"r0":7,"after":5}` vs her `6`. FIX: `coldRankIn(p)` (queen = 7, else `punFromToday`) stamped as `p.coldR` on entry (fall both roads, deathSentence mercy, lazily in coldStamp for every other road); `coldFree` releases to `min(6, coldR-1)` and clears the queen flag. After: `{"r0":7,"after":6}` = hers.
2. **Whole family (law 11), missed site** — `dev/build/jrd_cn.js:726` story road dropped an NPC straight to Đáp ứng («bị giáng xuống hàng thấp nhất», `v.rank=0`); the scan's patterns only looked at `.rank=0` next to `.out=false`. FIX: punDown + punMark + punTwice gate, text «bị giáng một bậc»; new scan family `npc_zero` in `dev/test/punish-scan.py` (main 7 → branch 0).
3. **Wording / real information (law 6, 7)** — `dev/build/j78.js:193` the Bóc chuyện tư tình card still told her the failure costs «vào lãnh cung hoặc giáng 2 bậc» (fall is one rank now). FIX: «giáng một bậc».
4. **Reason must be true (law 6b, VANPHONG)** — `jpun.js punAllyWhy` always said «nàng quý ngươi (thiện cảm N)», and both worker videos show «Hoàng hậu … ân xá vì nàng quý ngươi (thiện cảm −10 / −5)». FIX: words follow the one relation core (`netTh(a,"than")`): ≥ thân «nàng quý ngươi», ≥ 0 «nàng mở lòng khoan dung với ngươi», < 0 «nàng giữ đức khoan dung của Trung cung, dù không ưa ngươi»; no new number (law 4).

## Laws checked
- 1 two-way: her + NPC on every road (fall/demote/punish/deathSentence/e67drop/rgPurge/pardon/đại xá/Thái hậu/coldMonth/p3Free/j72/j7); after fix 1 the release rank is the same rule for both (npcOneBelow true; false = old NPC floor, pending owner). OK.
- 4 BAL: `BAL.pun` (coldMinDays 3 = 3 tuần = one month, gapDays, fallSung, evShow); no typed numbers added by the fixes. OK.
- 6 real: evidence row reads jtruth deeds + chest items; accuser from ACTX (try/finally reset, no stale doer). OK. Note: for a FRAMED charge the row lists her real wrongs (heaviest first), not the charge's own kind — that is D4 (per-charge pieces, OPTION A picked 05:15Z, not built here) → must land with D4.
- 7 wording: notices cổ trang, no %, after fixes 3–4 no false text. OK.
- 9 kit: kitPanel kind notice + fact rows (KIT §8/§9), subject figure; no private CSS. Looked at Fold + iPad frames: no cut text, no overflow. OK.
- 11 whole family: scan + before/after table; after fix 2 every family 0.

## Tests (reviewer, file:// build of each worktree)
| test | main f009e1a6 / LIVE | fc9af9a1 | -rv (fixed) |
|---|---|---|---|
| punish-scan (+npc_zero) | 3/6/8/7/–/5/1/7 | 0 except npc_zero 1 | all 0 |
| punish-reason.js 755x1000 | – | 18/18 | 18/18 |
| punish-reason.js 1180x820 | – | 18/18 | 18/18 |
| punish-live-vs 40 falls | LIVE: 22 two-rank, 18/18 early pardon out, 0 reason rows | 0 / 0 / 40 | 0 / 0 / 40 |
| cold-faction.js | – | 20/20 | 20/20 |
| coop-one-world | – | PASS | PASS |
| seatcap-oldsave (LIVE save → build) | PASS | PASS | PASS ×2 (one earlier run under 7 parallel browsers failed «not settled on load», her rank 1 = the save never loaded; not reproducible) |
| reviewer probe: NPC queen release / her | – | 5 / 6 | 6 / 6 |
| reviewer probe: old save in lãnh cung, no S.coldWk, early ân xá | – | waits, out on day 3 | same |
| reviewer probe: 90 tuần with forced falls/demotes/pardons/đại xá | – | 0 two-rank, 0 early release, 0 page errors | same |

Pre-existing, NOT from this branch (identical on main f009e1a6): `coop-cold-faction.js` FAILs «week merged (A in lãnh cung)» + following rows (timeout) on both main and branch; `seatcap-sim.js` runs 0 months on both; `seatcap-active.js` times out. → route to the co-op / seat owners.

## Notes (non-blocking)
- Seat cap: a punished NPC kept on a full rank (`punR`) is skipped by seatSettle; if every other holder is seatMine/seatKept (co-op both players + one punished NPC on a 1-seat rank) the rank stays over cap until her rank changes. Rare; the worker's «cap still holds» is true in solo.
- The CDN review folder img/_review/punish-reason/ is NOT wiped: the worker's LAND READY cites those videos; the lander wipes it after landing (`python3 dev/site/cdn_sync.py --wipe-review punish-reason`).
