# Review road-b1-fixa r1 — review/road-b1-fixa @ f1f18496 (engine jroad.js + jrd_tt/dtq/muoi/cn, fix A + fix B)
Reviewer: opus, coordinator Foreman B s8 (session_01N1tNP4LoQPgWaFJWtCiVsJ). START_CTX ~4 % of a 1M window; finished well under the rollover line.
Read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER, topic story-roads.md + coop.md, OD tail (CO-OP FIRST), reports review-road-map-r1, review-road-b1-r1, road-b1-fix.

Branch: `review/road-b1-fixa-r1` = origin/main 9c49f13c + f1f18496 (623ed35d; conflicts: assemble.py list = main + jroad/jrd_*, jbal2.js both blocks, built files rebuilt)
→ reviewer fix ca91c017 (below) → merge of the newer origin/main f1509d7c (lag-play-2 + coop-one-world; assemble list union, site rebuilt) → **c012bf32** (descends origin/main f1509d7c). Pushed.

## VERDICT: PASS c012bf3280e208af97c2e0e5f7fa831955c62b0d

## Earlier FAIL items — checked
review-road-map-r1 (engine + tt pilot)
1. A.sc in climax odds: 0 (scan DOUBLE LỢI THẾ 0, grep). ✔
2. Gain without loss / no-effect options: FREE GAIN 0, text-only 0 over all 4 files (16 roads, .5–.11). ✔
3. Beat text vs cast person: tt_mat_6 c2 guarded by TT_VUP, c3 sibling for the not-above case (seen live). ✔
4. Silent recast: rdCast logs + first-hồi line (A.rc); mid-chapter recast (castRv67 wrapper → A.rq) told too; rdCast clears the old id first so it is never told twice. road-rare "mid-chapter recast told" 16/16. ✔
5. ONE CORE: tm index from BAL.road.tm.length; RANKS clamps fixed; only RANKS[0] left (lowest rank by meaning, OK). ✔
review-road-b1-r1
1. (a) E.r97 built by rdR97 for EVERY RD97L entry at load end (and later pushes) — road-rare: 16/16 ✦ tag, title, Ngự tứ, finale = rare tag. (b) q97 carried: res67 wrapper (outer, reads the option before the original clears A.cur) feeds S.st.f14.q97 for .4–.10, the .11 thread starts from it (newThread67 wrapper after j97), j97 counts the .11 itself (no double count: rdQ97 skips rn===last); reset at road start; saved with S.st.f14. Reachability scan 0 LOW. I listed every path/bad name against the options it matches (substring rule): all hits are the intended options; .4 premise hits only in its own road (muoi_no «Đốt sổ…/Trả sổ cho…» = intended); "Nói thật"/"Đốt hết" also exist in other j67 arcs but only the road's own .4 counts. (c) rare texts true when they fire (sampled tt_mat, dtq_binh, cn_ban). ✔
2. Climax dominance: X-BEAT DOMINANCE 0, BOLD ≤ SAFE 0 (scan now guards it with the real BAL); 2 x beats with unreadable odds (cn_chu_9 x1) read by hand — fine. ✔
3. Inverted e:: 0. ✔
4. Promised effects: sampled — cn CN_CAM/CN_PAY really set confined/cutPay (months from BAL.road), tt_mat pact break = real promotion (MATUP / exDirectUp, seat-aware text), dtq_huynh «Mượn bạc» debt collected (DTQH_OWE, BAL.road.dtq_huynh.owe), cn_than deal flag read by .9 x1 / .10 x1 / .11 x1. ✔
5. History: sampled cn_than .9–.11 («Đại Lý tự tâu, Hoàng thượng phê», she waits in the palace), dtq_vu .9 (she waits in the palace, evidence by the family's hand). ✔
6. HH/TH alive guards: need hh/th + hh-free siblings (tt_mat .6 x2 «nhà Trung cung cũ»; cn CN_Q stand-in). ✔
7. Continuity: .5 openings read .4 r97/win2 (cn_chu .5 s1/s3 seen), rdEnd guards. ✔
8. ONE CORE: number words via kitNumVi; no typed RANKS index. ✔
9. VANPHONG: scan VANPHONG 0 (chắc chắn any case, bạn, Khôn Ninh …), digits 0; my own grep agrees. ✔

## Open item from the worker (cn_than .10/.11 skipped when {v} is gone) — judged + fixed here (ca91c017)
- Measured: road-full first + random option, cn_than 2/2 lives and cn_chu 2/2 lives ran all of .4–.11 (identity role alive); so the skip is uncommon, but when it happens .9–.11 were replaced SILENTLY by unrelated shared arcs (f14Shared) and the road lost its finale chapter + rare ending — same family as r1 item 6 ("never a silent skip of .11").
- In cn_than .9/.10/.11 the Thượng thư daughter {v} appears only in guarded beats (c3/c2 with if rv67) and in two .10 ending texts. Fix: .9/.10/.11 cast() keeps the identity rule (never recast) but no longer refuses the chapter; .10 E.win/E.lose say «nhà Thượng thư» instead of «nhà {v}». Checked live with {v} dead: .9/.10/.11 open, her beats drop out, texts read true, 0 errors; scan still all 0; road-rare cn_than/cn_chu PASS.
- cn_chu (the whole road is about the old mistress) and cn_than .5–.8 (texts name her house through {v}) keep the stop + told fallback finale — acceptable; a v-free variant there would be new writing (not needed for PASS).

## Tests (build c012bf32 unless noted; own http server; dev/index.html assembled for co-op)
| test | result |
|---|---|
| road-option-scan.js (4 files, 16 roads) | all lists 0; RD97L 16/16 ok |
| road-rare.js (all 16 roads) | ALL PASS (before and after the main merge) |
| road-full.js 755x1000 | tt_mat 1/1, cn_than 2/2, cn_chu 2/2 — every life 1..14 in order, 4 = premise, 5–11 = road, 12–14 endgame, finale told, same rival, 0 errors (bot killed by OOM after life 2, results kept) |
| road-saves.js 755x1000@2 + 1180x820@2 (old origin/main 9c49f13c save, phase-1 save, mid-road tt/dtq/muoi/cn saves) | 7/7 + 7/7 |
| coop-e2e.js (LIVE Worker) | run 1 57/59 («A frozen when B left» / «cannot advance while frozen»: presence timing), run 2 59/59; earlier build (before main merge) 59/59. Not repeatable → flaky, not a FAIL; co-op code is not touched by this branch |
| coop-one-world.js (new on main) | PASS |
| shots (scratch, not in git): tt_mat_6 c2 @1180x820@2, tt_mat_6 t1 @755x1000@2 (+ scrolled), dtq_vu_9 x1 @1180x820@2, cn_than_10 x1 @755x1000@2 | kit event card (VIỆC frame, speaker figure, option cards TỐN/GỢI Ý, ladder words), 0 overflow, 0 page errors, pictures load after a few seconds |

## OPEN BUG (not this branch; main kit event card, whole family) — j67 beat text
Confirmed STILL OPEN: in the kit event card (dlg kesdl, j67 PEND / kitPanel) the hồi's story text (kpmain/kfacts block) is placed BELOW the option list; at 1180x820 it starts ~10 px under the dialog's visible body (needs scrolling) and at 755x1000 too (seen after scrolling the body). The player sees the choices before the story. This is the shared card layout on main (this branch does not change it) → kit keeper: story text above the options in every event card (whole group: j67 arcs, roads, jstory, side stories).

## Notes (no FAIL)
- e:["win","mid"] option hints show only the success ending («kết: …; khó thành») and no «hỏng thì kết: …» line, while win/lose options show it (j67 hint code, all arcs) — kit/j67 wording follow-up.
- At 755x1000 the stage seal (TRẦN NỮ) sits over the right end of the card title line (kit, main).
- dtq_huynh owe: apply({bac:-owe}) when she holds less bạc than the debt depends on the shared apply clamp.
- Shots wiped (scratch only, no CDN review folder used). Worktrees removed after push.
