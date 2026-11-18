# questline-q2 — BIG REVIEW (E13r, opus; session_01DgYSWmBrrumpeuqy7XfMzM; START_CTX ~6 %)
PRIORITY #1 CHECK ('nroad\.fin|nroad\.sb|Phụ tuyến|questline-q2|nr\.hp'): OD 6 | ledger 0 | claims 0 | main 15 (label words + BAL.nroad only) | review/* 0 | archive 2 — Q2 did not exist before review/questline-q2.

Scope: review/questline-q2 @ a8cd0551 (base = origin/main 94d11623, still the newest main → test merge "Already up to date", no conflict).

## VERDICT: FAIL a8cd0551 — 1 law item (law 2 equal value) + 1 test gap; K-Q2-1 kit wait CONFIRMED (separate, blocks landing anyway)
Everything else PASSES (list below). The fix is small and inside jnroadhp.js + BAL.nroad.

## FAIL items (fix as a whole family, LUẬT SỬA CẢ NHÓM)
1. **Law 2 (equal-value choices) / law 3 — Q2 tilts the help hồi toward «giúp».** Q2 adds a GAIN only to option 0 (help → finale reward BAL.nroad.fin: Danh + bond + nợ ân) and a LOSS only to option 2 (betray → strike-back oán), and nothing to the other side of either. Before Q2 the j72 options were balanced by j72/jnroad (npc-roads gain-and-loss scan 24/24); after Q2 help is clearly better. Measure dev/measure/nroadhp-bal.js, bond player, 12 years, my runs + the worker's runs pooled:
   | style | lives | her death % | Danh |
   |---|---|---|---|
   | off (Q2 off, helps) | 45 (10+10+10+15 counted) | ≈53 (80, 47, worker 40, 50) | 16.6 / 14.1 / 15.2 / 14.7 |
   | help (Q2 on) | 50 | ≈28 (20, 25, worker 30, 40) | 16.1 / 17.4 / 17.5 / 15.1 |
   | betray (Q2 on) | 20 | 40 (50, worker 30) | 14.2 / 14.1 |
   Help beats betray on Danh in every run (+2…3) and on death in every run; betray now carries a ~1-in-3 grudge (found out 3.2/11.3 mine, 2.3/6.5 worker) with no matching gain. The help-vs-off death gap (≈ −25 points, z≈2.6) also says the finale reward (nợ ân / bond) is far stronger than "≈1–3 Danh per life" — explain or cut it.
   Fix (two-way, symmetric — law 1 too): a betrayal IS help to the rival she told (X.B). Record it on B's road as well (B.nr.hp +1 «nhờ ngươi mách tin», same H-a record, so B's finale reward BAL.nroad.fin and the «Phụ tuyến» list work for B the same way), and/or give option 2 its own Q2 gain from BAL.nroad (no number in code). Then tune fin / sb.oan so the measure shows help ≈ betray (Danh and death within run noise) AND help(on) ≈ off on death, ≥ 20 lives per style, 2 runs, order swapped. Report the table.
2. **Test gap (strike-back carriers).** dev/test/nroadhp-unit.js covers only the "eye" and "riv" carriers. Add "srv" (her servant hears + tells, knTell) and "sell" (the player's servant bought by her, knTell sell) checks, plus co-op guest (nrGuest → no record) and save round trip (S.nrpt + v.nr.hp in ser()). My reviewer script does exactly this and PASSES on a8cd0551 — copy it in: checks in this report §Tests (servant line «… (X, người hầu của nàng, nghe ngóng được rồi bẩm lại)», sell line «… (có kẻ bên ngươi đã bán tin)»).

## K-Q2-1 (kit keeper) — CONFIRMED
iPad 1180x820@2, palace-start life (every new life is S.ps=1): Mệnh truyện sub-tab bar now/rank/past/**pt**/rg/rgl overflows — «Tâm nguy…» cut and the trailing «ⓘ Phụ tuyến» slot sits on it. Fold 755x1000@2 fits (6 tabs + ⓘ in one row). Kit rule needed for every over-full kitSubTabs bar (not a per-screen fix). The branch cannot land until KIT READY.

## PASS (checked on my own box)
- Law 1 two-way: betrayal strikes back only through a real carrier; NPC-side "she betrays HER" is Q3 (helpers in her road), out of Q2 scope per the audit — OK for Q2 (but see FAIL 1: B's side).
- Law 4 ONE CORE: every number in BAL.nroad (fin/sb/hpMax) or reused BAL.ag.know / SRVA.listen; the .01 floors mirror knFor/knTell. Unit test changes BAL and sees the change.
- Law 6a/6b: carriers = her Tai mắt (oSee×know.eye), her servants (listen odds + knTell), player's bought servant (knTell sell), the told rival by dislike (mindPick) — no flat roll (OD:L1386), no death roll; the old false line «X biết ngươi bán đứng» is replaced by «chưa hay ai đã để lộ chuyện». Q2 changes no NPC stat except oán toward her → cannot inflate the harem (HH seat held % 50–90 in all styles = noise at 10–20 lives; mechanism-checked in code).
- Law 7 VANPHONG: nroadhp-vp PASS 38 strings, no %. The capital «(Một vị … chưa quen biết» inside brackets is the kit name-mask rule (j61 k61Scrub capitalises after "("), game-wide, not Q2's.
- Law 9 kit: kitSkillCard kind "story" + kitRows (rows67) + kitSubTabs/kitInfo/kitEmpty/KIT_GLOSS — no private part. Sub-tab bar identical on all 6 sub-tabs (now,rank,past,pt,rg,rgl) — wrapper chain with jreign is consistent.
- Laws 10/12 shots: Fold 755x1000@2 + iPad 1180x820@2 of the list, looked 3×: cards + rows readable, no page overflow (sw = cw), colour by result (g/r). Only fault = K-Q2-1.
- Note (no fail): jreign's Triều cục / Tâm nguyện cards also carry the kicker «Phụ tuyến» but live in their own tabs, while KIT_GLOSS «Phụ tuyến» now describes only NPC lines — Foreman E may want one word for it later (parking lot).

## Tests (my box, a8cd0551)
- build_site.sh OK. nroadhp-unit PASS 26 · nroadhp-vp PASS 38 · nrask-engine ALL PASS · npc-roads (2 lives × 96 months) 22/22 PASS (default 3×240 runs > 25 min here) · 0 page errors.
- quickcheck.sh a8cd0551 ALONE: QUICKCHECK PASS · old save ok · core gates PASS · perf new/live render 195/231, tab 349/348, buổi 943/956 ms.
- Reviewer script (srv carrier, sell carrier, co-op guest, tab bar order on every sub-tab, save round trip): 7/7 ok, 0 page errors.
- Measure nroadhp-bal: tables in FAIL 1.
Shots: scratch only (deleted with this verdict); no CDN review folder used.
