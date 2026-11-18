# Review road-b2-fix r2 — review/road-b2-fix db5c49f4 (B2 fixes + ONE CORE move + history doubt 1)
Reviewer: Foreman B reviewer (session_01N1tNP5i7LqTvSFFBdZwQiG), coordinator Foreman B s9 (session_01N1tNP35FF3tYRLkr6a7v7Y). START_CTX ~3 % of a 1M window.
Read: REVIEWER, PREAMBLE, START_CORE/WORKER/REVIEWER, topic story-roads, CLAUDE.md core laws, review-road-b2-r1, road-b2-fix (both parts), road-history (rules 8–11, B2 table).

Merge: `review/road-b2-fix-r2` = db5c49f4 + reviewer fixes 05cb7011 + origin/review/road-onecore-r1 74ba4f9a (FX ALIGN, per coordinator) + origin/main f5220eaa
(assemble.py conflict: main's list incl. jksize + road files after jst14), 0f61ff92 (co-op faults) and 7abaf07a (kit-size-10, kdpall) → FX ALIGN scan fix 46a2f066 → **fba2b5de** (pushed, descends origin/main 7abaf07a). index.html/sw.js/assets.json: main's, then site rebuilt.

## VERDICT: PASS review/road-b2-fix-r2 fba2b5de
All 8 r1 items fixed (each re-checked), ONE CORE gate 0 fails, values unchanged by the move, FX ALIGN 0, co-op/road tests green, Fold + iPad shots clean.

## Reviewer small fixes (on review/road-b2-fix-r2)
1. td_tha_11 rare finale: path entry «Dâng tờ xin chỉ xét người có tội» no longer matched any option (the fix renamed it to «Dâng tờ xin Hoàng thượng chỉ xét
   người có tội», td_tha .10) → path entry renamed. Whole-family scan (every path/bad entry of the 16 B2 RD97L finales vs every option name in jrd_nc/td/ch): before 1 dead, after 0.
2. History QUESTION 3 decided as continuity (same family as r1 item 5): td_song .9 s1 after a .4 r97 (edict already restored his surname) said «Đệ muốn mang
   họ cha» → r97 variant «chiếu đã trả đệ họ cha, mà sổ đinh nơi biên vẫn ghi Tiểu Thạch. Đệ muốn tờ hộ tịch cũng mang họ cha.»; the «lão quan bộ Lễ» rf
   «lệ ấy chưa từng có» → r97 variant «chiếu thì có, nhưng sửa sổ đinh nơi biên chưa có lệ». This matches the .5 s1 bridge and the .9 g (Hộ bộ sổ đinh). Text only;
   road-b2-same still SAME, road-option-scan still 0.

## r1 items — before → after (each re-checked on the code at db5c49f4)
| # | r1 FAIL item | after (checked) |
|---|---|---|
| 1 | free fixed-mid climax options with a gain (nc 15 ×2 bd, ch_bi .9) | every cited option now costs (dump of live c/w: nc_su .5/.7/.9/.10 danh/tamco −2, nc_tuc .5/.6/.9 x1+x2 danh −2/−3, ch_bi .9 «Giữ thế…» danh −2; bd copies same); scan F = 0, D = 0 |
| 2 | same-e-pair dominance (ch_benh .10 x2) | «…giữ ấn làm kỷ vật» suc −4, 30+sung/5 vs «Xin Hoàng thượng cho đặt ấn ở Phụng Tiên điện» danh −3, 30+duc/5; scan E = 0 on all three files |
| 3 | history pass-3 ADJUSTs | (a) nc_gian .7 «Người Nội vụ phủ về tay không», no guard left; (b) lương y họ Tôn only by the Emperor's chỉ (.5 g/s1/s2/c4, .7 recall); (c) td_an .8 success lines match the code |
| 4 | officials' wives (rule 11) | TDVAO / NC_MP: wife greets Hoàng hậu / Thái hậu and stops at her palace (seen on screen, td_tha .8 s2); the «xin vào chầu, quỳ trước cửa cung ngươi» form is gone |
| 5 | continuity | ch_bi .11 lgone, ch_co beads (RD_FL), td_ke mute {foed}, td_song .8/.9/.10 variants, nc .5 r97 beats (rdPrev()==="r97") present; + reviewer fix 2 |
| 6 | promised effects / dead flags | ch_bi .6 c2 sets v.confined = BAL.road.ch_bi.conf (field read by j15 «Cấm túc» chip); no «Nội vụ phủ trả bạc»; dead flags wired via RD_FL |
| 7 | history rules 1/2/3 | «Xin Tam ty đối chiếu», «Xin quan xét mời sư», «Lễ bộ giao ngươi», «Lễ bộ ghi công ngươi», «Chép cho Hộ bộ», «Hứa tha cả nhà», «bị phạt bổng một năm», «Lời ngươi nói sẽ định ai»: 0 hits |
| 8 | VANPHONG / Bắc Địch leaks | scan C (incl. vấn đề/trang trí/tỷ lệ/chứng minh/thông dịch) 0; «ải phía nam», «bùa ngải người man» 0 |

3. FX ALIGN (road-onecore-r1 check, required by the coordinator) read nc 197 / td 169 / ch 169 on this merge — all false positives: the 28 bd_* chapters are
   aliases of nc_* (jrd_nc alias loop; fx already applied on the shared option objects, road-b2-same shows bd = nc), the ch_hoD row is the shared after-death
   ch_ho beat row, and one-file mode flagged every other origin's rows. Scan fixed (46a2f066): ch_hoD checked against every ch_ho chapter holding sD/cD/tD/xD,
   bd_* checked against the nc source row, one-file mode scoped to loaded roads → 0 on the whole repo and on each of the 7 jrd files; negative test (one ch_hoD
   entry removed) reports 5 misaligned ch_ho chapters.

## ONE CORE (OD:L1267) and the road-onecore pattern
- one-core-guard.js, no --allow-grow: **PASS, 0 fails** (inlineNow 6674 ≤ baseline 6691, 270 modules).
- road-b2-same.js (OLD = d385cb48, before the move): **SAME, 0 differences** — nc/bd/td/ch 28 chapters each, c/w/l deep-equal, odds === on 518 800 trials, 16 RD97L finales.
- chTh (31 Thái hậu / Hoàng hậu go amounts, not covered by road-b2-same): own check — every CHTH("k") replaced by BAL.road.chTh[k] gives the old jrd_ch text exactly; 51 uses, 31/31 keys used, 0 differences.
- Same pattern as B1: jrd_tt/dtq/muoi/cn, jroad.js (except RD_FL = rdFb alias), j67 are byte-identical to origin/review/road-onecore 6a1112d1; B2 uses jbalroad.js
  (BAL.road.fx / .rare / .chTh), rdRare for all 12 B2 RD97L pushes, rdOdds terms; no BAL.road assignment inside jrd_nc/td/ch (comments only).

## History (road-history rules)
- Doubt 1 (envoy meetings): FIXED by rule 8 — every nc envoy / envoy-kinsman meeting is «trong buổi gia lễ ở nội điện, cách một bức rèm, có thái giám» (seen on screen in nc_gian .8).
- QUESTION 2 (td TDVAO fallback «theo lệ mệnh phụ vào cung ngày sóc vọng» when no Hoàng hậu and no Thái hậu): rule 11 names only those two, so the rules do
  not decide it → stays a QUESTION (non-blocking, not clearly wrong: mệnh phụ did enter on fixed court days). Suggestion for the history expert: name whom
  they greet — the consort who holds the harem seal (nhiếp lục cung) — if such a role exists in the game.
- QUESTION 3 (td_song .9 after .4 r97): decided as continuity → reviewer fix 2.

## Nits (non-blocking)
- nc_vuong .11 s1 «Tiếp cả hai đoàn cùng lúc, cách rèm» lx «hai đoàn cãi nhau ngay trong cung ngươi» — the meeting is in the nội điện now → «ngay trước rèm».
- nc_gian «Nhờ sứ thần {land} lo» lx «thêm một lần gặp sứ thần» — a meeting outside the gia lễ is implied; better «thêm một lần nhắn qua sứ thần».
- Stale header comments in jrd_nc/td/ch («costs inline as in jrd_tt»; ch_bi comment lacks conf): numbers now live in jbalroad.js.
- Kit (not B2, already known from r1): blank option thumbnails (beat text above options is fixed by main's kit-size-10, seen), Tốn row shows only some stats; odds tags «an toàn / có rủi ro» come from the j67 engine.

## Tests (build of review/road-b2-fix-r2; own utf-8 server, stopped by PID)
| test | result |
|---|---|
| one-core-guard.js (no --allow-grow) | PASS, 0 fails |
| road-b2-same.js vs d385cb48 | SAME, 0 differences (also re-run after the reviewer fixes) |
| road-option-scan jrd_nc / jrd_td / jrd_ch (+ FX ALIGN) | 0 on every list incl. FX ALIGN; 16 RD97L finales ok |
| coop-e2e.js (Fold host + iPad guest, live Worker, solo + old save) | 59/59 on db5c49f4+fixes; after main f5220eaa 60/60; after main 0f61ff92 60/60 — 0 page errors, no reruns needed |
| coop-one-world.js | PASS (all three builds) |
| road-rare.js, 16 B2 roads | ALL PASS, 99 checks, 0 page errors (before and after the main f5220eaa merge) |
| road-saves.js @1180x820, ROADS=nc,bd,td,ch, main = live site | 7/7 PASS (main save loads + plays, phase-1 save, mid-road nc_gian/bd_hoa/td_song/ch_co keep road + cast + plan) |
| road-full.js 1 life each, one bot at a time (other roads than the worker's) | td_song 10/10 «Chị em đoàn tụ», nc_vuong 10/10 «Cố quốc một lòng», bd_hoa 10/10 «Sứ tiết thưa dần», ch_bi 10/10 «Bí mật được chôn, cô mẫu mang ơn»; chapters 4..11 = the road, 12–14 endgame, 0 crashes |
| shots 755x1000 + 1180x820: nc_gian .8 c1, nc_su .10 x1, td_tha .8 s2, td_song .9 s1 (r97 variant), ch_benh .10 x2 (thDead), ch_bi .6 c2 — looked at (td_song .9 + nc_gian .8 re-shot after the kit-size-10 merge: beat text now on the card above the options) | j67 kit event card (VIỆC frame, kit option cards, Tốn/Gợi ý rows, odds tags), no horizontal overflow, no cut text, 0 page errors, no private UI. Scratch only, deleted. |

## Landing note (coordinator)
fba2b5de contains road-onecore-r1 74ba4f9a (PASSED), so fast-forwarding main to fba2b5de lands road-onecore + B1 files (jrd_tt/dtq/muoi/cn identical to it) + B2
together. FX ALIGN on road-onecore-r1 alone would show the same alias/shared false positives once B2 is in; the scan fix here covers it.

## Handover
Context at write ~14 %. Worktrees /home/user/wt/rb2r2 (pushed), /home/user/wt/rb2doc — removed after push.
