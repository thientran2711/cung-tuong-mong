# REMERGE LEAD lr5 — report (Foreman D)
Worker session_01D3E3NZuZ53VXut5YsqK6ej (opus, depth 1, START_CTX ~4 %). Foreman D: session_01D3E3Na4WaA2w77G38gsY8w → session_01D3E3NYwRePZXPzMMwNfkEq (27/11 00:53Z).
PRIORITY #1 CHECK: OD/STATUS: FROM MAIN 165 23:16Z (mg-trim LAND READY sha ask) + D 23:58Z order | main 4cfcda61 at start (then a22cf45d → fa722503 → 540358c4 → 17f23656) | review/* mg-trim-r6 4ecc3ce6, srv-rank 8559fea2, parity-facfix 1d0f032d, help-housemate 3aa87e1b, selx-fair c7594222 | claims REMERGE LEAD = this session.

## Landed on LIVE?
None. After `git fetch --deepen=400`: none of the 5 heads is an ancestor of LIVE; their own markers are absent on LIVE (dev/test/mg-trim.js, dev/test/srv-rank.js, dev/test/help-housemate.test.js, facFrOk, D-SELX-FAIR / selxCutRow).

## Table
| branch | landed? | new branch | source conflicts | resolution | gates | state |
|---|---|---|---|---|---|---|
| mg-trim-r6 4ecc3ce6 | no | review/mg-trim-lr5 **c8fa513d** (FF LIVE 17f23656) | none (built files only, 5 merges) | — | mg-trim.js 38/38 Fold+iPad ×4 shas; next-dead PASS; coop-e2e 143/143 ×3; quickcheck PASS exc. known LIVE crawl «Ô lưu · Lui»; videos img/_review/mg-trim-lr5/ | **LAND READY c8fa513d** |
| parity-facfix 1d0f032d | no | review/parity-facfix-lr5 **947283db** (FF LIVE 17f23656) | none | + test-only 6b10dd0f (SP_OFF setup, LIVE stat-pace) | fac-parity-play, fac-roads-play, role-parity-drift2-play, ag-par3 ALL PASS; coop-e2e 143/143; quickcheck PASS exc. known crawl; videos img/_review/parity-facfix-lr5/ | **LAND READY 947283db** |
| help-housemate 3aa87e1b | no | review/help-housemate-lr5 **75eb6e45** (FF LIVE 17f23656) | j2.js:169 | union of hh list | help-housemate.test **3 FAIL** (rows 1, 2, 2-lock: «Nhờ giúp đỡ» not found in her talk list — LIVE act-merge doors now show [Trò chuyện, Giao hảo, Cùng cung, Cùng chơi / Thách đấu]; test or door wiring must follow); receiver-choice 1 FAIL = same as LIVE («one core … stf2BribeW», pre-existing); coop-e2e 143/143 | **NEEDS RV** (act-merge door path for «Nhờ giúp đỡ») |
| srv-rank 8559fea2 | no | review/srv-rank-lr5 **a5fec6d6** (FF LIVE 17f23656) | jbal2.js:912 | LIVE srvMpN kept, srvMp dropped, srvCap kept | srv-rank.js 14/14 PASS; coop-e2e 143/143 | **NEEDS RV** (BIG: numbers) |
| selx-fair c7594222 | no | review/selx-fair-lr5 **c72de843** (FF LIVE 17f23656) | on LIVE ≥ a22cf45d: none | — | selx-rules + selx-wire ALL PASS; coop-e2e 143/143; measure selx-fair.js timed out at 900 s (measure, not a gate; not re-run) | **NEEDS RV** (optional; clean merge) |

## Conflict resolutions (for the BIG rv)
- srv-rank: dev/build/jbal2.js:912 — branch `BAL.srvMp=5` + srvCap comment vs LIVE pace-all `BAL.srvMpN=[6..18]` (canon overwrite of srvMp) + `BAL.srvLoyal`. Kept LIVE's line (law 14), dropped `BAL.srvMp=5`, appended branch `BAL.srvCap={open:1,u:.2,letW:2,demW:.5}` with its comment. srv-rank code (spOutgrown, jpromsv, jagstf2, j14, j42) already reads `srvMpNeed(rk)`; the only def is LIVE j42.js:553 (`BAL.srvMpN[rk]`); no other `BAL.srvMp` reader in dev/build (a stale comment in dev/measure/cnv-promo-sim.js:1 only).
- help-housemate: dev/build/j2.js:169 — hh («Cùng cung») topic filter: base [Hỏi han sức khỏe, Tạ lỗi, Nhún nhường, Chia sẻ bí mật]; branch + «Nhờ giúp đỡ»; LIVE + «Hậu lễ tạ tội», «Nhờ người đứng giữa». Union (7). Not duplicates: «Nhờ người đứng giữa» = jmend grudge-mend via a mediator (oán − one band), «Nhờ giúp đỡ» = helpAsk ask-for-help (jrcv, 4 answers).
- selx-fair: on LIVE 4cfcda61 jkc.js 4 hunks + jkc2.js 5 hunks conflicted: selx-fair is stacked on review/firstcard-2-rv (kitRiskOpt wrappers) and LIVE had stat-pace (spAdd, BAL.odb.jkc.rlO). From LIVE a22cf45d on (firstcard-3 STACK LAND 814bd77d self-merged jkc/jkc2), the merge has NO source conflict; delta vs LIVE = selx-fair's own lines only (j32 ban hoa rows, jbal2 BAL.selx.w + BAL.kc2.soNeed, jkc kcSoPts/kcSoOk/kcTrialW, jselx, jselxday, 2 measures).

## Test-only fix on parity-facfix-lr5 (6b10dd0f)
fac-parity-play rows 1/3/4/5 and role-parity-drift2-play row A FAILED on LIVE: the liking SETUP writes (affAdd) are now paced by LIVE stat-pace (spG), so a seed of (thân − aff) no longer reaches «thân». Fix = LIVE's own pattern (ag-moodknow / cold-faction): `window.SP_OFF` around the setup; row 5 seed at least «quen» (p3FacJoin) like rows 1/3. Build unchanged. Rule code untouched.

## Notes
- LIVE moved 5 times during the work (4cfcda61 → a22cf45d → fa722503 → 540358c4 → 17f23656); each re-merge = built files only; gates re-run on the last sha for mg-trim (mg-trim.js + coop-e2e) and parity (own 4 tests).
- Side bug seen (not fixed, out of scope): her «Lập phe cùng» tap when the NPC answers no / hẹn returns "" → 2 khắc spent, no log line (j10 facAct logs only a non-empty r).
- help-housemate rv hint: j9.js:132 pushes «Nhờ giúp đỡ» into topicOpts and j9.js:138 keeps it for same-house; the failing rows read her talk list as rendered by LIVE act-merge (doors). Check whether the door deck lists topicOpts' «Nhờ giúp đỡ» (inside «Trò chuyện» / «Giao hảo») — then the test must open the door; else the door table must register it.
- Recorder for the parity videos (not committed): /home/user/wt/lr5-tools/pf-video.js (real tap on «Lập phe cùng»; receiver answer rigged to «Nhận lời»).

## Handover
Worker done unless D wants more: LAND READY ×2 posted; NEEDS RV ×3 posted. Worktrees /home/user/wt/lr5* kept until the lands / rv (re-merge = `git merge origin/main`, take --theirs index.html sw.js, --ours CHANGE.txt, `bash dev/site/build_site.sh`).
