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

## ROUND 2 — PASS cb0c97b7 (review/questline-q2-r6; worker sha 451b4d1e + 2 reviewer commits + merge of origin/main e16e1d66)
PRIORITY #1 CHECK ('nhTip|mách tin|nroad\.fin|nr\.hp'): OD law 1/2/3 lines | main e16e1d66 (K-Q2-1 wrap live 048f3c71; no tip code) | review/* questline-q2 only | claims E13 → E13b.
Base: 451b4d1e did not include the newest main → merged 790cda59, then e16e1d66 (conflicts only index.html/sw.js + assemble.py module line: main's jmapz.js + jgedata_w1.js kept, jnroadhp.js after jagknow.js). cb0c97b7 has origin/main e16e1d66 as ancestor → fast-forward ready.

### Round-1 findings
1. **Law 2/3 + law 1 — FIXED.** nhTip: a betrayal is help to the rival who was told (record [n,2,turn] «mách tin» on HER road, next chapter +BAL.nroad.help, her finale reward BAL.nroad.fin, list line «mách tin giúp»; no open road → nợ ân BAL.nroad.fin.owe at once). No new BAL key. NPC odds net zero (A −help, B +help).
   My own measure (bond player, 12 y, 20 lives/style × 2 runs, order swapped; cb0c97b7's engine):
   | run | style | death % | Danh | HH seat % | finale (via mách) | found out / betrayals (carrier) |
   |---|---|---|---|---|---|---|
   | 1 off,help,betray | off | 25 | 15.1 | 50 | 0 | — |
   | 1 | help | 55 | 15.0 | 85 | 1.9 | — |
   | 1 | betray | 40 | 19.3 | 65 | 1.8 (1.8) | 4.0/10.7 (srv 48, eye 31) |
   | 2 betray,help,off | betray | 30 | 15.8 | 50 | 1.5 (1.5) | 4.7/11.3 (srv 57, eye 35, sell 1) |
   | 2 | help | 40 | 15.7 | 80 | 2.5 | — |
   | 2 | off | 15 | 14.7 | 70 | 0 | — |
   Pooled 40 lives: death off 20 / help 47.5 / betray 35 %; Danh 14.9 / 15.4 / 17.6. Worker pooled 80: death 37.5 / 37.5 / 41.3; Danh 15.9 / 16.5 / 17.3. All 200 lives: death off ≈32 / help ≈41 / betray ≈39 %. The death gaps change sign between runs (round 1: help lower; now help higher) → run noise, as the worker said; Q2 adds no death path. Danh: betray ≈ +1…2 over help, and betray pays for it with ~4 grudges per life (oán 15 each, real carriers) + j72's Đức cost; help is the safe road → a trade, neither clearly better. **Law 2/3 PASS.**
   Harem: HH seat 50–85 % in every style (noise); Q2 changes no NPC stat except oán toward her and ±help on chapter odds (net zero) → no inflation. PASS.
2. **Tests — FIXED.** nroadhp-unit 40 checks (srv, sell, co-op guest, save round trip, tip record/bonus/no double, tip finale, no-road debt) PASS; nroadhp-vp 52 strings PASS.

### Round-2 checks asked by Foreman E
- **Law 1 — her being the one betrayed:** the NPC side of Q2 is symmetric (the betrayed NPC strikes back; the told NPC repays). An NPC betraying HER when SHE asks for help is Q3 («phá ngầm / mách lẻo», QUESTLINES_AUDIT §4 Q3, review/questline-q3 still in review) — out of Q2's scope by the spec; not a Q2 fail. Q3 must reuse nhTip/nhCarrier's two-way pattern.
- **Law 6c (real objects/records):** Q2 has no item. Every record is traceable: v.nr.hp / v.nr.sb on the person (saved with her), S.nrpt list (capped hpMax, survives her death), nợ ân in the j72 ledger (q72DebtAdd). Save round trip checked (unit + my script). PASS.
- **K-Q2-1 bar (live on main):** iPad 1180x820@2 — 6 tabs in one row, ⓘ «Phụ tuyến» on its own line by the kit wrap rule, no overlap, no sideways scroll; Fold 755x1000@2 — 6 tabs + ⓘ in one row, 4 cards (incl. the «mách tin» card «Đã qua 0/8»), no overflow. Looked 3×. subtabs-overflow PASS. (In one Fold run the random life gave only 1 list line — the shot script's life; 2 re-runs gave 4/4.)

### Reviewer fix (small, on r6)
- jnroadhp nhTip: `if(!NB.hb)` treated a PENALTY (hb −15 from another betrayal) as "already has a bonus" and gave the tip nothing; now `if(!(NB.hb>0))NB.hb=(NB.hb||0)+help` (penalty offset to 0, a bonus never stacks). Checked in page: −15 → 0, +15 stays 15, closed road → nợ ân +1, self-tip → nothing.

### Tests on my box (cb0c97b7)
build_site OK · nroadhp-unit 40 PASS · nroadhp-vp 52 PASS · nrask-engine ALL PASS · subtabs-overflow PASS · npc-roads 2×96: 22/22 (one earlier run 20/22: the test's one random life stopped finishing help quests after the first betrayal; I replayed all 16 kinds × help/betray in 3 tip modes (no road / closed / open) — none ever blocks, so it is a test-life flake, not Q2; FOR E: parking item to make that test pick a fresh asker per kind) · quickcheck.sh ALONE on cb0c97b7: QUICKCHECK PASS · old save ok · core gates PASS · perf new/live render 184/182, tab 407/383, buổi 896/1131 ms · co-op guest host-only ok · 0 page errors.
Shots: scratch only, deleted with this verdict.

**VERDICT ROUND 2: PASS cb0c97b7** (laws 1–7, 9, 10/12 checked; K-Q2-1 done on main).
