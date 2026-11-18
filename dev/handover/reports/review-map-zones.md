# review-map-zones — BIG review of review/map-zones @ 635c406 (on LIVE main 790cda59)
PRIORITY #1 CHECK: OD 18/11 ~19:30Z–19:45Z read verbatim (L1897–L1903: 19:35Z 10 palaces, 19:40Z Đông cung own tag, 19:45Z "Ba cái cung dư ra … bỏ luôn", Trữ Tú «tú nữ học» elsewhere, no Đông/Tây zones) | main 790cda59 (map-labels LIVE) | review/map-zones 635c406 | claims map-zones r2 session_01Rc5AsLenCtDZkYpKqUFs18. Worker report ## r2 + r2b read.

## VERDICT: FAIL (small; 3 fixes, all in jpal.js palFix + 2 stale docs)

## What I checked
| Check | Result |
|---|---|
| FF onto 790cda59 | OK (origin/main is an ancestor of 635c406) |
| Dropped keys anywhere (git grep "Trữ Tú / Hàm Phúc / Thái Cực", slugs tru-tu/ham-phuc/thai-cuc) in dev/build, events, ACT_PLACE, j95 roster/schedules, BAL, dev/site, tests | 0 live hits. Only jpal.js comments + PAL_GONE (log names). Places are keyed by person ("r<id>"/"home"), not by slot, so the ledger/walk/S.place hold no slot keys. map-hotspots.json (CDN) only feeds festivals/outerCourt, not rivalSlots. |
| ONE CORE | PASS: PALN from PAL_WEST, no typed palace count; seats read from BAL.seat / resCap / BAL.harem.cap (20 unchanged). |
| «tú nữ học» → Nội vụ phủ | Done in BAL.staff.posts gt, jstaff (duty row, tx, Tuyển tú line), jentry Phúc tuyển judge, jkc kcPhucD. Wording OK (VANPHONG). |
| quickcheck (my run) | PASS · old save ok · core gates PASS (one-core, rules-one-source, kit-conform, coop-one-world, 5 hooks) · time-spill PASS · perf new/live render 216/160, tab 368/351, buổi 1117/949 (box was loaded by my parallel scan; worker's run 281/278 — noise, not this change). |
| dev/test/pal-trim-oldsave.js | PASS (3 log lines, palCer 0, hall rows for all 10). |
| My old-save matrix (25 cases, scratch script, same harness: mutate → save → deser) | no page errors, no pal ≥ PALN, no double-housed palace, no Ban-cung card, palCer kept: player Tần/Phi/QP/HQP in each of slots 10/11/12 (12 cases), palCer pending, pregnant, rank 2 lone, cold palace (out), NPC heads in all 3 dropped, NPC pregnant, NPC out, dead NPC, co-op partner rival, kept palaces full of lone low consorts + 3 heads in dropped (lone ones give way). All re-housed with one "… đóng cửa; … dời sang …" line. |
| map-labels-scan DSF=2 | Fold 755x1000 day/night PASS, courtyards 10 PASS; iPad 1180x820 day/night PASS, courtyards 10 PASS. |
| My shots (Fold + iPad, day/night/courtyard @2) LOOKED | The 3 dropped palaces have no tag; Vĩnh Thọ/Dực Khôn tags fine; no overlap. The lower-west courts stay painted without a tag (art, acceptable). Fold right-edge tags (Trường Môn viện, A ca sở, Đông cung, Thượng thư phòng) off the panned edge = existing family (map-labels r3), not this branch. |
| 18 laws touched | 4 ONE CORE ok; 6(b) real people: see fix 1 (people move without a record line); 7 wording ok; 9 kit: no new UI; 14 canon overwrite: see fix 3. |

## FIX LIST (worker)
1. **Side-hall residents of a dropped palace move with NO line** (brief: "1 log line each"). Case: NPC Phi in slot 10 with 2 side-hall consorts → only the Phi gets "Trữ Tú cung đóng cửa; Phi X dời sang Cảnh Phúc cung."; the two residents silently become "thiên điện Cảnh Phúc cung". Worse for the PLAYER below Tần living in that host's side hall: she is moved to "Dưỡng Xuân hiên · Cảnh Phúc cung" with no line at all. Fix in palFix: before nulling, collect everyone whose resHead is a gone host (incl. S) and log one line each after re-housing ("«Trữ Tú cung» đóng cửa; ngươi theo … dời sang thiên điện …" / "…; Quý nhân Y dời sang thiên điện …"). Add the case (player + NPC resident under a dropped host) to dev/test/pal-trim-oldsave.js.
2. **"dời khỏi cung cũ"**: `gone` nulls p.pal BEFORE the `was` list is built, so a resident whose host was in a dropped palace and is now out/dead logs "X dời khỏi cung cũ, dời sang …" instead of the real name. Build `was` with the PAL_GONE name (or compute `gone` names into a map and use it in `was`).
3. **Canon overwrite (law 14)**: stale "13 / 5 west" lines: dev/build/jres.js:48 comment "the 5 west palaces jpal added (index 8–12)" → "PAL_WEST (index 8–9)"; dev/PROGRESS_balance.md:20 "PALN 13 cung … slot 9-13" → 10 (8 east + Vĩnh Thọ, Dực Khôn).

## Notes (not blocking, for MAIN)
- Giáo tập ma ma: title now "Nội vụ phủ", but the ledger (j95elderK) puts her at Đức Thọ when not in her room — same as before with Trữ Tú (pre-existing; law 6(b) candidate for C-AG / live-servants).
- A player rank-7 set without the crowning path gets a palace — identical on main 790cda59 (artificial test), not this branch.
- jmapz.js (Càn Ninh / Đức Thọ 2nd level) unchanged since 8f8dadb, not re-reviewed in depth here beyond quickcheck/scan; TODO 2 (switch to j95here/j95whereId) still open.
Shots: scratch only (not committed, not on CDN). Re-review after fixes = rerun pal-trim-oldsave (with the new case) + quickcheck.
