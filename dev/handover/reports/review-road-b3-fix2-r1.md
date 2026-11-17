# Review road-b3-fix2 r1 — review/road-b3-fix2 995f6349 (thd_hoc vỡ lòng fix + ONE CORE move of jrd_thd / jrd_cnv / jend14)
Reviewer: opus BIG review (roads + rules + numbers), coordinator Foreman B s9 (session_01N1tNP35FF3tYRLkr6a7v7Y). START_CTX ~4 % of a 1M window; at write ~12 %.
Read: REVIEWER.txt, PREAMBLE.txt, START_CORE / START_WORKER / START_REVIEWER, topic story-roads, road-history (thd_hoc pass 2),
reports review-road-b3-r1, review-road-b3-fix-r1, road-b3-fix, road-b3-fix2.

Merge: `review/road-b3-fix2-r1` = origin/review/road-b3-fix2 995f6349 + origin/main **f5220eaa**. One conflict: dev/build/assemble.py (main's list,
incl. new jksize.js, + jbalroad/jroad/jrd_tt/jrd_dtq/jrd_muoi/jrd_cn/jrd_thd/jrd_cnv/jend14 after jst14); index.html / sw.js rebuilt by
build_site.sh. Head **b837b0d18375ce18a1f16e445394e6ec308399d1** (descends origin/main f5220eaa), pushed. No fixes by me.
Note: the branch still carries the road engine + B1 roads + road-onecore (not on main yet) and story14 frame work; landing order is the coordinator's.

## VERDICT: PASS

## Earlier FAIL items, one by one
| source | item | check | result |
|---|---|---|---|
| fix-r1 | 1 thd_hoc .5–.11 never runs | road-full thd_hoc, 2 lives | **17/17**: `4:thd_hoc 5:thd_hoc_5 … 11:thd_hoc_11 12:noi14 13:hau14 14:ke14`, finale «Người thầy được tôn kính» both lives |
| fix-r1 | 1 (rare) | road-rare thd_hoc | ✦ rare fired, path at thd_hoc_5, recast told — PASS |
| fix-r1 | 1 (whole road) | code read of rdfrag/thd_hoc.js | pupils from BAL.road.thd_hoc.vlAge (ONE CORE key); school-age beats twinned on BAL.tc.hienAge (thdHocBig): .7 g/s1/x1/E (Văn Hoa điện + Lục bộ → Thượng thư phòng + Đại học sĩ), .7 t1 rt (cưỡi ngựa bắn cung only school-age son), .10 x1 rt (theo hầu buổi chầu only school-age son); .5 c1 «Đại học» → «Tam tự kinh»; same costs/odds/effects in every twin; roll guard ARC67.thd_hoc.ok/cast (pupil with a live mother, cast that mother first) — sound, matches road-history pass 2 (vỡ lòng class, princes enter school ~6) |
| b3-r1 | 1 climax dominance | road-option-scan | DOMINANCE 0 · BOLD≤SAFE 0 · INVERTED 0 · FREE GAIN 0 · text-only 0 · double Lợi thế 0; (D) free sure mid: thd / cnv / jend14 0 (the 59 hits are B1 roads cn/dtq/muoi/tt — unchanged, coordinator's call as before) |
| b3-r1 | 2 rare finales (path, engine E.r97, burned box) | road-rare 8 B3 roads + scan reachability | **49 PASS / 0 FAIL**, ✦ rare fired on all 8; reachability LOW 0 |
| b3-r1 | 3–6 effects / maid-raised / hh-th guards / {mis} | covered by fix-r1 mode scans; code unchanged since then except thd_hoc + the number move (proof below: 0 value differences) | OK |
| b3-r1 | 7 thd_hoc ages + thd_sach continuity | see fix-r1 item 1 above; thd_sach untouched | OK |
| b3-r1 | 8 history | thd_hoc twins keep the vỡ lòng setting (Thượng thư phòng, Đại học sĩ; no consort inside Văn Hoa điện) | OK |
| b3-r1 | 9 ONE CORE jend14 rank numbers | EG_HH/EG_TOP from RANKS (unchanged) + now all option/ending numbers in BAL.road.fx | OK |
| b3-r1 | 10 coop-e2e | run on this merge | 60/60 |

## ONE CORE move (jrd_thd, jrd_cnv, jend14 → BAL.road.fx / .rare / .go) — proof re-run by me
| check | result |
|---|---|
| "before" = 94d041352: its jrd_thd.js / jrd_cnv.js / jend14.js blobs are byte-identical to the worker's fix 83641f2a (e81a7b4d / 4009b705 / 20b6d9c6), no rdFx in them | confirmed |
| road-b3-onecore-same.js (SAME_FILES=jrd_thd.js,jrd_cnv.js, ref 94d041352) | thd 28 ch: c 544 · w 478 · l 203 · odds fn 270 (108 000 trials) · E fx 84 → **0 diff**; cnv 28 ch: c 584 · w 521 · l 267 · odds fn 333 (133 200 trials) · E fx 87 → **0 diff**; RD97L 8 rare choices compared → SAME |
| road-b3-onecore-esame.js (jend14 83641f2a → now, both egThGone states) | 18 486 compares, **SAME** |
| same pattern as review/road-onecore (PASS) | yes: rdDef → rdFx(id) from jroad.js, rdRare/RR, rdGo(id,i); all keys in jbalroad.js; jend14 calls rdFx("noi14"/"hau14"/"ke14", ARC67.x) after each definition; 0 inline `c:/w:/l:{stat:N}` left in jrd_thd / jrd_cnv / jend14 |
| one-core-guard.js (main's guard, no --allow-grow) | **fails 0**, inlineNow 6674 ≤ baseline 6691 |
| road-option-scan FX ALIGN | **0** (no alias false positives on this merge, so the road-b2 scan fix was not needed) |

## PASS criteria
| # | criterion | result |
|---|---|---|
| 1 | one-core-guard 0 fails, no --allow-grow | PASS |
| 2 | coop-e2e (assemble.py first; live Worker) | **60/60** first run (no flaky rerun needed) |
| 2 | coop-one-world | PASS (all 6 checks) |
| 3 | road-option-scan incl. FX ALIGN | 0 on every check (B1 (D) 59 as known) |
| 3 | road-rare (8 B3 roads) | 49/0, ALL PASS |
| 3 | road-full thd_hoc ×2, thd_tro ×1, cnv_mat ×1 (one bot at a time) | 17/17 + 17/17; thd_tro and cnv_mat 4..11 = road, finale told, 12–14 endgame (cnv_mat 12 = len14) |
| 3 | road-end (6 cases + old f14 plan, 1 life) | **27/27** |
| 3 | road-saves @755x1000 (origin/main LIVE site save, phase-1 td save, mid-road tt / thd / cnv saves) | **6/6**, 0 page errors — old saves load |
| 4 | KIT FIRST | B3 chapters render only through the j67 kit event card (VIỆC frame, speaker figure, kit option cards, TỐN / GỢI Ý rows); no HTML/style in chapter data (only the shared log `<i>` / `<b class="g">` lines as jroad rdCast); no new UI part |
| 4 | VANPHONG | road-option-scan VANPHONG 0, digits/% in chapter text 0 |
| 4 | history rules / owner road rules | thd_hoc vỡ lòng twins match road-history pass 2; 14-chapter frame (1–3 tutorial, 4–11 road, 12–14 endgame) holds in every road-full life |
| 5 | shots looked at (scratch only, deleted): thd_hoc_7 c1 + cnv_ban_7 c1 @755x1000@2, thd_hoc_5 c1 + ke14 @1180x820@2 | kit card, no horizontal overflow, 0 page errors; at 1180 the beat text now shows above the options (the old jk4 kdpall KIT REQUEST no longer reproduces on main f5220eaa); option thumbnails load |

## Notes (not blocking)
1. road-card.js forces S.rank=3, which fires the rank-up thánh chỉ + Phẩm phục reward over the card; I closed them in a scratch copy of the
   test before shooting. Worth a one-line fix in road-card.js (dismiss the promo or set the rank before the life's first render) for the next reviewer.
2. In the cnv_ban_7 forced-chapter shot the chapter line reads «cung nữ ??? bị phạt»: the j61 name mask for a maid she has not met, because the
   test opens .7 cold. In a real road she meets Xuân Đào in earlier chapters (road-full cnv_ban passed in fix-r1). Not B3; if the coordinator wants
   chapter titles never to show "???" even for unknown people, that is the j61/j67 owner's family (mask wording in titles).
3. thd_hoc for a 3–5 year old pupil still has copying punishments («chép phạt», .8 «quỳ chép sách mười lượt», «chép một trăm lần chữ Nhẫn»).
   Tracing/copying characters is what a vỡ lòng class does, so it stands; a lighter count for a pupil under BAL.tc.hienAge would be polish only.
4. Ending side-effect helper amounts in E/option `o:` functions (CHU_MIS(10), e67merit(4), e67heir(6), son fond −4 …) are still typed in
   jrd_cnv (72), jend14 (8), jrd_thd (1) — the SAME as the already-PASSED B1 files (jrd_tt 67, jrd_dtq 74), which road-onecore left as is and the
   one-core guard accepts. If the coordinator wants these in BAL too, it is one family task over all road files, not a B3 item.

## Handover
Worktrees /home/user/wt/rb3f2r1 (review branch), /home/user/wt/rb3f2r1-doc (this file) and scratch /home/user/wt/rb3f2r1-shots — removed after push.
No CDN review folder was used (shots stayed in scratch, deleted).
