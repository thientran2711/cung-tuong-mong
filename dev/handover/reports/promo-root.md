PRIORITY #1 CHECK ('thăng phẩm|promot|thang pham|promo'): OD 58 | ledger 13 | claims 8 | main 15 | review/* 10 | archive 346 — reused: dev/measure/probe_promo.js + inpromo.js pattern (promoReqP row counts), inpage6.js bot, robot life files on the handover branch (dev/handover/robot/flight2-s8*, s9b, s4d-loop*, s7-stuck). OD read: 24/11 ~05:55Z…~09:50Z promotion rulings (kỳ sắc phong / đại lễ / caps). No OD ruling on «Bị bỏ quên» (grep 'bỏ quên|forget': 0). Kỳ sắc phong redesign (promo-build-2-rv 4defb821) is PASS but NOT on LIVE 5e013076 (pass-not-landed-2511.md) — LIVE still runs the monthly check + exam; this job measures LIVE.

# PROMO-ROOT — why 5 robot lives never got a promotion (LIVE 5e013076)

Branch `review/promo-root` (base 5e013076). Worker: PROMO-ROOT session_01V1ZZGzXMYdRFgHB23g5qvC, child of MAIN CHÍNH 146.

## 1. ROOT (one line each)

| life | what really held her | kind |
|---|---|---|
| s9b (muối, bold, Fold) — «593 offers / 54 picked» | In lãnh cung from month ~2 of year 1 to death (y11). The «593 promotion-type offers» are **false positives** of the harness word match on «phong»: «Phong hàn» (illness) 317, «lá phong rơi» 90, the «Sắc phong» tab chip 91, «Mệnh truyện… Sắc phong» 91 → **0 real promotion offers**. | **broken path (game)** + harness metric bug |
| s8 (thầy đồ, bold, iPad) | Month 2: «bị phe Càn Ninh hợp mưu tố tội, giáng Đáp ứng» + Danh lost → month 3 **«Bị bỏ quên, đưa vào lãnh cung»** (save: coldWhy, coldTurn 3). Released at turn 36 («Rời lãnh cung») and back in lãnh cung 2 months later. 12 years rank 0. | **broken path (game)** |
| s7 (consort, rank 0 at y6) | Danh 46 fine; **Sủng 0–2** for years (needs 15 for Thường tại). Sủng −1 every tuần (j3 endTurn, −3/month), one thị tẩm +3 (BAL.night.sung); robot chose «Giấu, không báo» nguyệt sự twice (Sủng 2 → 0 each). | balance / robot play |
| s4d (cung nữ cnv_mat, cautious) | Exam tam → nhị đẳng sat 8× by month 9, **score 10 vs bar 18** every time (real-tap mini-game play), then Chủ tin 22 < BAL.srvx.tinUp 35 (no window) and later windows lapsed (save: srv.ex n 8, lapse 1). | robot play (+ design question) |
| s3e (cung nữ cnv_mat, bold) | «Công lao 11/10»: Công lao can only pass the need when the gate fails on **Chủ tin < 35** (j42 srvMonth: rank cap was not the block at tam đẳng, Tân Giả khố stops Công lao) → Chủ tin under 35 for 10 years. | robot play (+ display nit «11/10») |

**The one game fault (fixed here):** j3 monthTick line «Bị bỏ quên» — `!S.out && Sủng ≤ 0 && Danh ≤ BAL.danhG.forget (5) && rank ≤ 1 → cold()` — had no grace:
1. **Every release from lãnh cung was undone at once.** restore() (đại xá, cầu xin, nhờ người, bài thơ cũ, con xin, Thái hậu, minh oan, kêu oan, Hoàng hậu ân xá, chiếu đại xá — every release site: j14 ×3, j24, j68q, jagacts ×2, jworld; all go through restore) leaves her at rank 0 with the Sủng 0 / Danh 0 she had in lãnh cung; coldMonth runs inside monthTick BEFORE the forget line, so an amnesty is reversed in the SAME monthTick; a release in a buổi is reversed at the month end. Deterministic check (dev/test/promo-root.js, real monthTick): **LIVE 12/12 releases re-sent to lãnh cung the same month**.
2. **Rank-0 origins with no Danh bonus (buôn muối, thầy đồ) could be «forgotten» in month 1–3**, before she had any chance (s8 month 3, s9b month ~2).
Two-way note (law 1): the forget line is player-only; NPC consorts have no such rule (not changed here, reported to MAIN).

**Gates ARE reachable for a sensible player (LIVE, in-page «sens» bot, seeded):** consort lives first promotion at month 4–7 (td m5, dtq m4, ch m7 → Phi by y5); cung nữ life tam → nhị month 4, → nhất month 8; exams 5/5–6/6 passed, 0 lapses. NPC exams pass 90–100 %. So «rank gates unreachable» and «offers that never convert» are NOT the root; the root is the lãnh cung trap + how the real-tap robots play (Sủng, Chủ tin, mini-games).

## 2. FIX (law 11 whole family, law 4 number in BAL) — commit 1623b417

- `BAL.danhG.forgetGrace: 6` (jbal2, beside `forget`).
- j14 `restore()` (the ONE exit of every lãnh cung release road): `S.forgetAt = S.turn + 1 + BAL.danhG.forgetGrace`.
- j3 monthTick: `S.forgetAt` initialised to `S.turn + forgetGrace` on the first month seen (palace entry; old saves get the same grace once) and the forget line also needs `S.turn >= S.forgetAt`.
- No player-visible text, no UI, no new kit part. The rule itself is kept (a girl who stays forgotten after the grace is still sent to lãnh cung — test (4)).

## 3. BEFORE / AFTER

### 3a. Deterministic (dev/test/promo-root.js, real monthTick, origin muối)
| check | LIVE 5e013076 | review/promo-root |
|---|---|---|
| đại xá in monthTick → still free after the month | BAD (re-sent same month) | ok |
| release by restore() → free for the grace months | 0 / 6 | 6 / 6 |
| after the grace, Sủng 0 + Danh 0 at rank 0 → forgotten | ok | ok |
| newcomer (Sủng 0 / Danh 0) free in her first months | 0 / 6 | 6 / 6 |
| trap.js loop, 12 releases each | 12/12 amnesty + 12/12 cầu xin undone | 0/12 + 0/12 |

### 3b. Replay of the REAL robot save s8 (in lãnh cung, turn 14, Sủng 0 Danh 0 Bạc 0), in-page «sens» bot, 24 months, seeds 1–6
(«sens» is a strong player: it earns Sủng fast once free, so it escapes either way — the table shows the trap firing, not the robots' life)
| seed | LIVE: months in lãnh cung / 24 · «Bị bỏ quên» re-sends · releases · rank m12 → m24 | review/promo-root: same |
|---|---|---|
| 1 | 17 · 1 · 2 · lãnh cung → 1 | 10 · 0 · 1 · 0 → 2 |
| 2 | replay crashed m2 (srvMerit, §6) | 6 · 0 · 1 · 1 → 3 |
| 3 | 5 · 0 · 2 · 0 → 2 (1 other send: phe hợp mưu tố tội) | 3 · 0 · 1 · 1 → 1 |
| 4 | 8 · 0 · 2 · 0 → 2 (1 other: lật tẩy vu oan) | 3 · 0 · 3 · 0 → 0 (2 other: tố tội, lật tẩy) |
| 5 | 16 · 0 · 1 · lãnh cung → 0 | 12 · 0 · 3 · 0 → 1 (2 other: lật tẩy, tố giác) |
| 6 | 3 · 0 · 1 · 2 → 2 | replay crashed m3 (srvMerit, §6) |
| mean (5 finished each) | **9.8 months** in lãnh cung | **6.8 months** |
The very first LIVE replay (seed 1, 12 months, 22:27Z) shows the loop itself: released m1 → «Bị bỏ quên» m2 → released m3 → «Bị bỏ quên» m4 → released m5 (Thái hậu); on the branch no «Bị bỏ quên» re-send in any seed. The other lãnh cung sends (tố tội, lật tẩy vu oan, tố giác) are real story outcomes of the strong bot's own schemes, unchanged.

## 4. GATES
Run one at a time on this box, head 1623b417 (code) vs LIVE 5e013076, same box, same hour.
| gate | review/promo-root | LIVE 5e013076 | verdict |
|---|---|---|---|
| dev/test/promo-root.js (new) | PASS 6/6 | 3 BAD (the trap) | fixed |
| promo-exam | 31/32 | 31/32, same FAIL row («result frame: rounds, Tứ đức, tài nghệ, bar, verdict») | = LIVE |
| promo-rules | 26/28 | 26/28, same FAIL rows | = LIVE |
| promo-skip | FAIL | FAIL, same rows (grace-seat «passed grace exam waits for a free seat», «strike-back hits once when due») | = LIVE |
| promo-next-rank 755x1000 | same table as LIVE (exit 1 on LIVE too) | — | = LIVE |
| coop-e2e (alone) | **143/143** | — | PASS |
| quickcheck core gates G1–G3, time-spill guard | PASS | — | PASS |
| quickcheck G4 90-button-crawl | FAIL «Ô lưu → Lui close button did not close its layer» (fold) | **same FAIL** (button-crawl.js --fast on LIVE via local http, 23:02Z) | pre-existing, not this fix |
| quickcheck open / old save | open 1968–2023 ms, 0 errors; LIVE save loads + plays a buổi, 0 errors | — | PASS |
| quickcheck perf (iPad), median of 3 / 7 | FAIL buổi 4962/1874, 4039/1798 | — | noise: the buổi time is BIMODAL on BOTH builds (~1.3–1.8 s or ~3.4–4.8 s, by what the fresh random life gets); in the 7-run set LIVE itself had 4441 and 3362 |
| **quickcheck perf, median of 11** | **PASS** · render 267/253 ms, tab 621/602 ms, buổi 1871/1989 ms, tasks>200ms 27/28 | — | PASS |
The fix only adds two comparisons in monthTick and one assignment in restore; no buổi path changes.

## 5. OPEN FOR MAIN (design/balance — NOT changed; two options each)
**B. Consort Sủng at the two lowest ranks (s7).** Today: Sủng −1 every tuần at every rank below Hoàng hậu (j3 endTurn, typed `1` — law 4 debt), i.e. −3 a month; one thị tẩm +3 (BAL.night.sung); Thường tại needs Sủng 15, Quý nhân 25 (RANKS). The «sens» bot reaches Sủng 97–100 in ≤12 months, the real-tap robots stay at 0–2.
- **B1 (recommended now): no balance change.** Move the typed decay `1` into BAL (law 4, same value) and let the next real-tap lives run on this fix first; s8/s9b were the lãnh cung trap, only s7 is a pure Sủng case. Harness: robots should play the Sủng cards a person would (the sens bot proves the road is open).
- **B2: gentler start.** At rank ≤ 1 and Sủng < RANKS[1].s (15), decay only every 2nd tuần (BAL value): −1.5 / month instead of −3; a thị tẩm then covers two months of decay instead of one. Law 5 kept (higher ranks unchanged). Risk: every low-rank life climbs a little faster.

**C. Cung nữ rung gate (s4d, s3e).** Today: Công lao (rung+1)×BAL.srvMp, Chủ tin ≥ BAL.srvx.tinUp 35, mistress rank cap, then the Nội vụ phủ exam (BAL.ex.srvBar [0,18,19,20,22,24,24], window BAL.ex.win 2 tuần). The «sens» bot rises tam → nhị month 4, → nhất month 8; NPC servants pass 100 %.
- **C1 (recommended): no change in the game.** The real-tap robot scored 10 vs 18 eight times — it cannot play the drag rounds (Bày lễ / Phân kho); it should use «Để tài nghệ quyết định» (exSkipRaw, capped), as a person who cannot play a round would.
- **C2: show the block.** The «Xét phẩm» box already lists Chủ tin (jts tsSrvRows); add a one-line voice nudge from the mistress when Công lao is full and only Chủ tin blocks (kit voice pool, no number). Needs kit/VANPHONG words → owner.

**D. Law-1 gap:** «Bị bỏ quên» is player-only (NPC consorts with Sủng 0 / Danh ≤ 5 are never forgotten). Options: D1 leave (NPC world already has its own lãnh cung roads); D2 the same line for NPC consorts with the same grace (more NPC churn into lãnh cung). Recommend D1 until the owner rules (law 16: no rule change without her).

## 6. Side findings
- Harness (Foreman F / robot-realtap, `dev/test/robot-rt.js:150` `OFFER_RE = /thăng|tiến cử|phong|khảo|sắc phong|tuyển/i` on review/robot-realtap): the «promotion-type offers» counter matches «phong» inside «Phong hàn», «lá phong», the «Sắc phong» chip → 593/254 «offers» are noise; count only real decree / exam cards («Khảo hạch tấn phong», «Khảo hạch Nội vụ phủ», «Thánh chỉ … tấn phong»).
- Crash seen in 2 of 12 replays (LIVE and branch alike, not this fix): `CRASH: Cannot read properties of undefined (reading 'mp') @ srvMerit` — a servant Công lao action (S.srv.mp) runs for a consort (j42 srvMerit has no S.srv guard; callers j42:173/177/195, jagknow:265). Repro: replay.js on flight2-s8-ckpt save, seeds 2 and 6.
- s3e display «Công lao 11/10» (MAIN 144 item) = Công lao keeps growing while the gate waits on Chủ tin; same family as this report (j42 srvMonth).

## 7. Status
READY for review: review/promo-root (code 1623b417, this report on top). No push to main, no PR. Harness for lives: dev/test/promo-root.js (gate), probes used for the numbers kept in the session scratch (probe/hook/replay/trap .js; can be added on request).

~96% xong / ~90% chơi được

## 8. HANDOVER (PROMO-ROOT rolled at ~52 % context, 26/11 01:20Z) — open nit from RV-PROMO-ROOT PASS 8169d9da (MAIN 150)
Nit: jagacts.js:71 pardon catch-fallback (`S.out=false;S.confined=0` when restore() throws) frees her without `S.forgetAt`. Whole family = every place that frees her / brings her into the palace, all must set the grace the same way:
1. j14 restore() — done (`S.forgetAt=S.turn+1+BAL.danhG.forgetGrace`).
2. jagacts.js:71 catch fallback — add the same line.
3. jkc.js:578 (`S.out=0;S.pal=null` palace entry from the kc home life) and jkc2.js:400 (`K.inPal=1…S.out=0`) — REAL gap, not only a nit: during the home life monthTick already initialised `S.forgetAt`, so it can be past when she enters the palace → a rank-0 entrant with Sủng 0 / Danh ≤ 5 can be forgotten at once. Set the grace at entry too.
Plan: one helper in j14 `function forgetSafe(p){if(p===S)S.forgetAt=S.turn+1+BAL.danhG.forgetGrace}` used by all 4 sites (restore keeps it). Scan: `grep -n "S.out=0\|S.out=false" dev/build/j*.js` (4 sites today). Test: extend dev/test/promo-root.js with (5) catch-fallback path (stub restore to throw, call agActs pardon) and (6) kc entry (S.kc home life with forgetAt in the past → enter palace → free for forgetGrace months). Own commit on review/promo-root, then sha to MAIN 150 + LC19.
