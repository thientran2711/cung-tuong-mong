PRIORITY #1 CHECK ('phòng ở chung' / 'BAL.res' / 'resCap' / 'palSolo'): OD 4 (L1540, L1898, L1902, L1927) | ledger 0 | claims 0 | main dev/build/jbal.js:56 BAL.res {side:1,halls} + resCap(), jpal.js palFix (one body), j27 palSolo (typed rank ≥6), j95c j95cCap, jres resSidePart, dev/test/residence-seats.js + residence-oldsave.js | review/* residence-seats(-r1/-r2) = already on main, residence-art = art only → extended the ONE existing residence table and its readers; no second table.

# residence-qp-alone — worker report (Foreman B, ORDER MAIN ROOT-58)

START_CTX ≈ 3 % of the window (estimate). Context at report ≈ 14 %: no rollover needed.

Branch `review/residence-qp-alone` from origin/main 1130a49e, **sha f7cf2ad6**. Never pushed to main, no PR.

## 1. Rules: before / after

| rule | before (main 1130a49e) | after (f7cf2ad6) |
|---|---|---|
| BAL.res | `{side:1,halls:["dong","tay"]}` — 1 per room for every chủ vị | `{side:{3:2,4:2},halls:["dong","tay"]}` — consorts per room BY THE HEAD'S RANK; a rank not listed lives alone |
| Tần (3) | 2 co-residents (1 Đông + 1 Tây) | 4 (2 per room) |
| Phi (4) | 2 | 4 (2 per room) |
| Quý phi (5) | 2 (owner: "Quý phi đâu có ở chung") | **alone** (resCap 0) |
| Hoàng quý phi (6) / Hoàng hậu | alone (typed `rkOf>=6` in j27 palSolo + `rkOf<=5` in jpal palHostOK) | alone, read from BAL.res.side (no typed rank) |
| cap reader | `resCap()` = side × halls, one number for all | `resSide(h)` / `resCap(h)` (person or rank index) — jpal (host test, trim, pickHost, spread, hallFix), j95c j95cCap, jres resSidePart, j27 palSolo, tests |
| capacity | — | Tần 3×4 + Phi 2×4 = 20 ≥ lower consorts of a full harem (asserted in test R12 from BAL.seat × resCap) ; harem.cap stays BAL 20 |
| room fill | 1 per room | a room takes 2 before the next room opens (owner 19:35Z: "ít nhất là 2 người phải ở chung một phòng"); houses still spread (fewest first) |

Lists / map: Dư đồ, Hậu cung › Phi tần (grouped by palace), the stage at home and the palace detail all read residenceOf / houseOf → palFix → BAL.res. No UI change (no kit part touched).

## 2. Moves (law 6 real world) + old saves

palFix (one body, runs on load, promotion, demotion, death, lãnh cung): anyone (NPC or the player below Tần) living under a head who lives alone by rank (Hoàng hậu, Hoàng quý phi, Quý phi) is re-housed in a Tần / Phi house with a free seat (else a free palace, palLone, as before). Each move =
- one news line with the reason, cổ trang: «Theo lệ, Quý phi Tạ Thủy Tiên ở riêng Khải Tường cung; Thường tại Mạnh Tố Tâm dời sang thiên điện Cảnh Phúc cung.» (player: «…; ngươi dời sang Tuy Phúc hiên · Hàm An cung.»; the player as Quý phi: «Theo lệ, Quý phi ở riêng một cung; …»). Unmet names show through the existing name mask («một vị Quý nhân chưa quen biết»).
- one act in the people ledger S.roster.acts {k:"res_move", id, t: the head, why: same reason, src jpal}; if the record has her standing in the old house this khắc she stands in the new one (j95bPut).
Same path when a Phi with co-residents rises to Quý phi in play. j95c j95cCap skips a head with resCap 0 so palFix (with the reason) does the move. Co-op: palFix runs where it ran before (host; guest by snap) — coop-one-world 10/10, coop-e2e 63/63.

## 3. Tests

| test | result |
|---|---|
| dev/test/residence-seats.js (4 games × 24 months + forced) — R1/R3 per-host caps, new R11 (HH/HQP/QP hold nobody, every month), R12 capacity, R13 (Phi → Quý phi: residents moved, reason line + ledger act each) | R1–R8, R10–R13 PASS. **R9b 2 fails = pre-existing on origin/main 1130a49e** (same 2 fails with main's own test on main's build: pardon / coldvisit ân xá bring a consort back over harem.cap) — not residence; not touched |
| dev/test/residence-qp-oldsave.js (NEW; old = main build save with a Quý phi holding the player + an NPC) | PASS (×4 runs): ranks + consort count unchanged, QP holds 0, each moved to a Tần/Phi room ≤ resSide, reason lines, ledger acts, 3 turns played, 0 page errors |
| dev/test/residence-oldsave.js (older test) | FAIL on main→main too (pre-existing: built for the pre-seat-halving build; seatSettle demotes) — not this change |
| quickcheck (old live save loads + plays, perf vs live) | PASS · render 167/205 ms, buổi 1021/913 ms, tasks>200 19/17, core gates PASS |
| coop-one-world seeds 1–10 | 10/10 PASS |
| coop-e2e | 63/63 passed |
| one-core-guard | PASS, fails 0 |
| LOOK Fold 755×1000 + iPad 1180×820 | Dư đồ: palace labels/counts fine, no overlap; Hậu cung › Phi tần: Càn Ninh 1 · Cảnh Phúc (Quý phi) 1 alone · Khải Tường 3 · Chung Tú 3 · Hàm An 2 + her; iPad stage: «Nhã Vận hiên · Khải Tường cung» her room with roommates (+N). 0 page errors. Shots outside git (/home/user/wt/resqp-shots), not uploaded |

## 4. Files
dev/build/jbal.js (BAL.res.side by rank, resSide/resCap(h)), jpal.js (palHostOK, palFix per-host caps, reason lines, palLed), j27.js (palSolo reads resCap), j95c.js (j95cCap per head), jres.js (resSidePart per head); index.html + sw.js rebuilt; dev/test/residence-seats.js (R1/R3 + R11–R13), dev/test/residence-qp-oldsave.js (new).

SẴN SÀNG KIỂM f7cf2ad6
