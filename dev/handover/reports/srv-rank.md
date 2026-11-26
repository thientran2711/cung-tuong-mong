# D-SRV-RANK — report (review/srv-rank)

PRIORITY #1 CHECK ('srv.rk|maid rank|promo'): OD 65 | ledger 13 | claims 8 | main 15 | review/* 10 | archive 513 — key hits: OD:L1149 (servant rank capped by master rank: j14 srkMax ≥7→Nữ quan, ≥4→Chưởng sự cô cô, else Đại cung nữ), OD:L1940 (maid-ladder-6), OD ~08:00Z 26/11 ONE PACE TABLE (dev/measure/pace.js); main j42 srvMonth/srvMax, j14 srkMax, jbal.js:445 BAL.srvRk, jbal2 BAL.srvMp; review/promo-root3 (rank-0 = harness metric, not game), review/robot-realtap 7767c6fc (RANK METRIC srv.rk), dev/measure/cnv-promo-sim.js (maid road sim, reused); claims: none for srv-rank (D 12:15Z).

- (26/11 12:30Z) START: D-SRV-RANK worker session_01D3E3NbVRYoHioc81tQJMxN, child of Foreman D session_01D3E3NZKCLJ7V9VupQyCnr1. depth 5. START_CTX ≈ 7 % (get_session used_tokens reads 0; own estimate, 1M window) → roll at ≥ 32 %, ceiling 60 %. LIVE = 1dcb373e. Worktree /home/user/wt/srvrk (sparse), branch review/srv-rank from LIVE.
- First read: s11b srv.rk 4 = Chưởng sự cô cô = srkMax cap when the mistress is rank 4–6 (OD:L1149 rule, by design). Open question = whether the exits from the cap (buy-out to a higher house, emperor pick, ma ma at 25, mistress rising) fire at a sane pace. Measuring with cnv-promo-sim.js next.

## ROOT (26/11 ~12:45Z)
- A maid's rung is capped by her master's rank (j14 srkMax, owner OD:L1149: master ≥ 7 → Nữ quan, ≥ 4 → Chưởng sự cô cô, else nhất đẳng). Most masters are low → cap nhất đẳng (3); s11b's master is rank 4–6 → cap Chưởng sự cô cô (4).
- At the cap a TRUSTED maid had no road of her own: «Xin chủ tiến cử» is locked at the cap; «Xin chủ cho đi hầu cung khác» was locked while Chủ tin ≥ BAL.sp.leaveLoyal (60) — a good maid always has high Chủ tin. Other exits are rare or late: buy-out by a consort > master + 1 rank at 1.5 %/month with a 12-month wait (~once in 5–6 years); ma ma only from age 25; the emperor's notice needs deeds near him.
- NPC servants had the same wall (jagstf2: the ask only under loyalty 60) → law 1 parity.
- LIVE robot (cnv-promo-sim work, life b0): rk 3 at y1m7, then FLAT 6+ years at cap 3 with Chủ tin 85–100 and Công lao 20/20 = the s11b pattern.
- The per-rung pace below the cap is not the fault: rk 1→3/4 within year 1 (consort road: Tần ~5.5 mo, Phi ~26 mo, reports/balance-pace.md); need already grows per rung ((rk+1)×BAL.srvMp, law 5). Pace table numbers NOT forked (pace-all / stat-pace own them).

## FIX (review/srv-rank b4b22b4b, source; build commit follows)
- ONE rule spOutgrown (jpromsv) for her and every NPC servant, BAL.srvCap {open, u, letW, demW}: at her master's cap with full Công lao and a palace above with a higher cap → «Xin chủ cho đi hầu cung khác» is open whatever her trust. Destination spUpTo = highest such palace; the maid player is no seat of the household table (hhHas); an NPC servant takes a free seat or the Nội vụ phủ swap (that house's lowest servant of her kind below her rung takes the seat she leaves; BAL.promo.cap holds on both sides; her own «Kẻ hầu xin đi» card names the swap).
- The master's answer stays the existing three (keep with bạc / demote / let go, mindPick); for a trusted servant who outgrew the house let × letW, demote × demW (gain-and-loss kept).
- Gate: dev/test/srv-rank.js 13/13 branch, LIVE fails the open + parity rows. Family scan dev/measure/srv-rank-scan.js (her maid / NPC maid / NPC eunuch × 4 states): LIVE at-cap-trusted = locked everywhere → branch open everywhere.

## PROOF (26/11 ~13:00Z) — review/srv-rank d45adb93 (build 84362ea1 + test-only commit), FF from LIVE 1dcb373e
### Gate test dev/test/srv-rank.js — branch 15/15 PASS (with LIVE old save); LIVE 8/12 (fails: spOutgrown, ask OPEN for a trusted outgrown maid, NPC parity ask; the «rises after the move» row fails on both because LIVE never opens the move)
### LAW 11 family scan dev/measure/srv-rank-scan.js — «ask to serve a higher palace» column
| servant | state | LIVE | branch |
|---|---|---|---|
| maid player (cap nhất đẳng) | below cap | locked | locked (she still rises here) |
| maid player | at cap, full Công lao, trusted | **locked** | **open** |
| maid player | at cap, low trust | open | open |
| maid player | at cap, trusted, every higher palace full | **locked** | **open** (she is no seat of the household table) |
| NPC maid / NPC eunuch | below cap | locked | locked |
| NPC maid / NPC eunuch | at cap, full Công lao, trusted | **locked** | **open** |
| NPC maid / NPC eunuch | at cap, low trust | open | open |
| NPC maid / NPC eunuch | at cap, trusted, every higher palace full | **locked** | **open** (Nội vụ phủ swap) |
### Robot (dev/measure/cnv-promo-sim.js policy work/climb: a sensible maid who asks to move only when she has outgrown the house), lives that reached age ≥ 22
| build | lives | rung 2 / 3 / 4 / 5 median month (reached) | longest trusted wait at the cap below Nữ quan (months) | reached Nữ quan | raised to consort / ma ma |
|---|---|---|---|---|---|
| LIVE 1dcb373e | 6 | 5 / 7 / 10 (5/6) / 17 (3/6) | 12, 23, 36, 42, **84, 84** | 3/6 (only under a rank ≥ 7 master) | 2 / 1 |
| branch | 4 | 5 / 7.5 / 10 (3/4) / 14 (3/4) | 0, 2, 11, 24 | 3/4 | 2 / 2 |
Reading: the rungs below the cap keep their pace (law 5 already in (rk+1)×BAL.srvMp; the ONE PACE TABLE numbers are not forked — PACE-ALL / stat-pace own them). The multi-year wall (LIVE 84 months = the s11b plateau) is gone: when she outgrows the house the ask opens; the master lets her go (or keeps her with bạc + Chủ tin, or demotes — the 6-month wait then applies, the 11–24 values). Small sample (game ~1 min per year headless).
NOTE FOR PACE-ALL (not changed here): rungs 1→4 come within ~10 months on both builds (consort road: Tần ~5.5 mo) — if the pace table wants the lower maid rungs slower, BAL.srvMp is the key.
### Consort side effect
- ag-stf2 23/23 PASS both; world leave answers in its 12-tuần run LIVE keep/let/demote 111/150/139 vs branch 98/163/139 (no churn jump).
### Real-tap videos (Fold 755x1000 + iPad 1180x820; trusted maid, Chủ tin 80, at her rank-3 master's cap, Công lao 20/20 → tap her master's figure on the stage → «Xin chủ cho đi hầu cung khác»)
- LIVE: the card is greyed (locked), tap does nothing: https://ctm-img.victoria-tntt.workers.dev/img/_review/srv-rank/live-755x1000.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/srv-rank/live-1180x820.mp4
- branch: the card is open; tap → her master lets her go → «Cung nữ nhất đẳng của Hoàng hậu …» (cap Nữ quan) → next month the Nội vụ phủ exam for the next rung: https://ctm-img.victoria-tntt.workers.dev/img/_review/srv-rank/branch-755x1000.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/srv-rank/branch-1180x820.mp4
