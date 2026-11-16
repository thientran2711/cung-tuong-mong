# Review road-b3-fix r1 — review/road-b3-fix 68067fe1 (fix of review-road-b3-r1 items 1–9 + fix A 072bc1e5)
Reviewer: opus BIG review (roads), coordinator Foreman B s8 (session_01N1tNP4LoQPgWaFJWtCiVsJ). Read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER,
topic story-roads + balance (gain-and-loss lines), reports review-road-b3-r1, road-b3-fix, review-road-b1-r1 (pattern list).

Merge: `review/road-b3-fix-r1` = origin/review/road-b3-fix 68067fe1 + origin/main 95282e69. Conflicts: assemble.py (main's list + jroad/jrd_tt/
jrd_dtq/jrd_muoi/jrd_cn/jrd_thd/jrd_cnv/jend14 after jst14), jbal2.js (both blocks: BAL.road + main's BAL.led), index.html/sw.js rebuilt.
Head after my fixes: **401ae165** (descends origin/main 95282e69), pushed. Branch still carries story14-p1-r2 (Foreman C) → landing waits for C.

## VERDICT: FAIL (1 item). Items 1–9 of review-road-b3-r1 are fixed except a regression that item 7's fix made.

1. **thd_hoc road .5–.11 never runs (regression of the item 7 fix).** The pupils now must be living children of school age
   (BAL.tc.hienAge = 6, thdHocOk/thdHocCast), but a new life starts with the oldest child at 4 at most (probe, 8 fresh thd lives: oldest
   child 3–4, 0 of age 6) and chapter 5 opens ~1.5 years in → thd_hocOk false. Evidence: road-full thd_hoc (1 life, first-option bot):
   `4:thd_hoc 5:s_than 6:s_hoa 7:s_tinh 8:s_thu 9:s_su 10:s_ban 11:s_dich` — every road chapter replaced by a shared chapter, while the
   origin finale is still told from the .4 premise; road-rare: `FAIL thd_hoc: road threads open (cast) … nocast thd_hoc_5`.
   r1 asked to stop infants doing school things, not to close the road. Fix (whole road): the .5 «giáo tập» class is the vỡ lòng class
   (road-history pass 2) → allow pupils from a vỡ lòng age (new BAL key, e.g. BAL.road.thd_hoc.vlAge, j53 has barAge 3), and gate only the
   beats that need a school-age child (Thượng thư phòng proper, khảo hạch, cưỡi ngựa bắn cung, Đông cung talk) on BAL.tc.hienAge with
   vỡ-lòng twins; or make the thd road roll draw thd_hoc only when a pupil can exist by .5. Re-run road-full thd_hoc + road-rare thd_hoc:
   chapters 5..11 must be thd_hoc_5..11 and the rare must fire.

## Checked and OK (items 1–9 of review-road-b3-r1)
| item | check (tool) | result |
|---|---|---|
| 1 | road-option-scan, 168 road chapters, 3280 options: dominance / bold≤safe / inverted / free gain / text-only / double Lợi thế | 0 each (cn_chu_9 x1 "not readable" = B1 file) |
| 1 | jend14 x beats read by hand: bold base = safe + 10, same cost | OK |
| 1 | NEW scan check (D) free sure «mid» with a gain beside a costed option (the b3-r1 thd rule) | thd 0; **cnv 11 + jend14 2 left → fixed by me** (cost Danh −2, as the thd fix), now 0 |
| 2 | road-rare cnv_chu/ban/mat/ma, thd_tho/sach/tro: E.r97, ✦ tag, title, finale, road tally, recast told | PASS (thd_hoc FAIL = item 1) |
| 2c | cnv_ma_11 rare after «Đốt hộp» | LMMBOX() read, OK |
| 3–5 | own mode scan in the browser (every text of thd/cnv/noi14/hau14/ke14 under Hoàng hậu / empty seat / both gone / Hoàng hậu + Thái hậu dead × maid / raised; need/if filtered) | 0 wrong-person texts in B3 roads; **hau14 g «lòng Thái hậu» when she is dead → fixed by me**; left: cnv_chu (.4 premise, main j67 «Trình lên Hoàng hậu» with an empty seat — not B3, note for j67 owner); cnv_ma_11 r97 «từ Càn Ninh cung…» = a place name, OK |
| 6 | {mis} kept in S.st.f14.act.mis, death told once, CNV_MOK/CNV_MT guards (code read) | OK |
| 7 | thd_sach continuity / thd_hoc age + sex (code read) | OK except item 1 |
| 8 | history: Ngự thư phòng, Tam pháp ty once, verdicts «tâu lên, Hoàng thượng phê» (code read, sample) | OK |
| 9 | jend14 EG_HH/EG_TOP from RANKS, egRankN clamped; no typed digits (scan) | OK |
| — | VANPHONG scan (all road files + RD97L) | 0 |
| — | Known limit «cnv chapters needing the mistress fall back to shared chapters when she is gone» | ACCEPTED: told once to the player (log + A.rc), no silent recast (b1-r1 item 6/7 rule), the origin ending is told from the last road chapter; a dead-mistress rewrite of cnv_chu would be a different road |

## Fixed by me on review/road-b3-fix-r1 (4aab6682, site 401ae165)
- x-beat «free sure mid with a gain» costs Danh −2: hau14 «Thưa: thiếp không dám nhận», ke14 «Lùi lại, nhường bậc», cnv_chu_6 «Để yên, khép kín
  cửa», cnv_ban_6 «Để nàng đi, ghi lại giờ giấc», cnv_mat_6/7/9/11 («Cáo ốm ở lại», «Xin rút thẻ một kỳ», «Cúi đầu lui», «Cúi đầu, lui vào trong»),
  cnv_ma_5 x1/x2, _6, _9, _11 (rdfrag sources + jrd_cnv regenerated with cat.sh).
- hau14 g: «lòng triều thần» instead of «lòng Thái hậu» when S.thDead.
- dev/measure/road-option-scan.js check (D) for that pattern. NOTE for the coordinator: B1 roads (cn/dtq/muoi/tt) show **59** hits of (D);
  they were held only to the narrower b1-r1 rule (free mid beside a free mid/lose) — your call whether the b3-r1 rule extends to them.

## Tests (own http server, this branch build; Playwright; bots ≤2 at a time — 3 parallel crashed a page on memory)
| test | result |
|---|---|
| road-end (6 cases + old f14 plan, 1 life each, after my fixes) | 27/27 PASS (earlier run 2 lives: the 8 lives that ran all OK, then a memory crash from parallel bots) |
| road-full thd_tho, thd_sach | PASS (1..14, .5–.11 = road, finale told) |
| road-full thd_hoc | FAIL (item 1) |
| road-full cnv_ban, cnv_chu | PASS (cnv_chu 1st run: frame closed at ch 9 with no finale after cnv_chu_9 win — not reproduced on a 2nd run, 10/10; worker to keep an eye while fixing item 1) |
| road-saves @755x1000 (origin/main save, phase-1 save, mid-road tt / thd / cnv saves) | 6/6 PASS, 0 page errors (old saves load) |
| road-rare (8 B3 roads) | 7 PASS, thd_hoc FAIL (item 1) |
| coop-e2e (live Worker) | **b3-r1 blocker gone**: run 2 **59/59**; run 1 57/60 (3 start checks: friend not yet visible — flaky); origin/main same day 57/59 (rebirth flake). Not counted against B3. |
| shots (looked at): cnv_mat_10 + hau14 @755x1000@2, thd_tro_8 + cnv_ban_7 @1180x820@2 | kit j67 event card, no overflow, 0 page errors; 1180 beat text under the options = the known kit KIT REQUEST (jk4 kdpall), not B3; option thumbnails blank (CDN lazy timing). Shots in scratch only, deleted. |

## Handover
Context at write ~25 %. Worktrees /home/user/wt/rb3fr1 (review branch), rb3fr1-main (main baseline), rb3fr1-doc — removed after push.
