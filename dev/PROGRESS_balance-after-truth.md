# PROGRESS · review/balance-after-truth (base origin/main eba64ead4)
Owner 16/11 (OWNER_DECISIONS ~L1105): do the new rules (evidence-truth, palace-start, weather risks, succession; mortality is NOT on main
yet) change the odds of becoming Hoàng hậu / dying? Targets (OWNER_DECISIONS L20/L85, Vừa): HH ~32 %, early death ~40–45 %,
childbirth death 8–12 % per birth. Pregnancy rate untouched (owner proposal pending).

## Method
- Sensible bot (inpage6 + inx/inpz/inty/inpromo, HHSTOP: a life ends at HH) via run_par, 3 pages, pictures blocked, seeded.
  Harness ported from review/balance-pass (not on main): inty.js (bot dresses; without it lives stall in trung y), inpromo.js, anpass.py,
  pass/mkinp.sh + sens1/sensloop; inpage6: makeup each morning, no pond/trip pushes, avoids "mất mạng" options; run_par loads inty.js.
- New: inbirth.js (pet rescues, each birth's death roll and outcome), anbat.py (how lives end, frames aimed/landed, Emperor-first deaths).
- Arm A = main 6c17e4611 (before evidence-truth, palace-start, merge-train-3: weather risks, succession choice) — its built index.html.
  A crashed in 6 of 10 lives (evA on a person without .evm: old bug, fixed on main by jtruth) → A runs with a one-line guard
  (EXTRA in mkinp: h.evm={} when missing; no rule change). Arm B/B2 = current main eba64ead4 (seeds 501 / 777).
- Run: `bash dev/measure/pass/mkinp.sh` → `node dev/measure/run_par.js root/index.html sens 45 <out> ../tmp/sensall.js 3 <seed>`;
  `python3 dev/measure/anpass.py sens <label> <files>`; `python3 dev/measure/anbat.py <label> <files>`. ~50 min per 45 lives.

## Results (raw lives: dev/measure/pass/data/at_*.json)
| | A: before (6c17e4611), n=45 | B+B2: main eba64ead4, n=90 | target |
|---|---|---|---|
| Hoàng hậu | 36 % (16/45; 23–50) | 34 % (31/90; 25–45) | ~32 % ✔ |
| early death (died before HH) | 40 % (18/45; 27–55) | 38 % (34/90; 28–48) | 40–45 % ✔ (CI) |
| childbirth death per birth | 11 % (3/27), shown 10.7 | 5 % (4/88; 2–11), shown 10.5 | 8–12 % ✔ (see below) |
| Emperor died first (Thái phi etc.) | 24 % (11/45) | 28 % (25/90) | — |
| HH after (median tuần) | 289 | 285 | ~188 ✘ (both) |
| frames aimed at her / landed per life | 46.6 / 1.8 | 58.6 / 4.8 | (evidence-truth: frames must land, defence can fail ✔) |
| her births per life | 0.60 | 0.98 | — |
| poison aimed / landed per life | 19.5 / 1.64 | 16.0 / 1.38 | — |
| early-death causes | poison 14, childbirth 3, illness 1 | poison 29, childbirth 4, illness 1 | — |
- Verdict: the new rules do NOT move the owner targets beyond noise: HH 36 → 34 %, early death 40 → 38 %. Evidence-truth makes frames
  land ~2.7× more often (1.8 → 4.8 a life) but a landed frame costs Danh/Sủng or a rank, not a life, so HH and death odds hold.
  Palace-start: she bears more children (0.60 → 0.98 a life; fewer rivals at the start).
- Childbirth: B (seed 501) had 0/53 births fatal (expected 5.5) → checked: inbirth.js on B2 logs each birth's first roll = the shown
  risk and hit = dead in every case (4/35, expected 3.7); a direct probe on main: 324 deaths in 3000 births at risk 11 % (10.8 %). The
  mechanism is exact; B's zero was chance. Pooled 4/88 is low only by luck (p ≈ 5 %).
- No BAL change applied: all three targets are within the 95 % intervals. Early death sits at the low edge (38 %); review/mortality
  (BAL.mort: lifespan dice mean 45 sd 15, epidemics, assassination) will add deaths on top, so raising poison now would double-count.
  Re-measure with this harness when mortality lands; first knob if death then overshoots: BAL.mort itself; if it stays < 40 %: BAL.seeMaxP 70 → 65.
- Pace is slow on both builds (HH after ~285 tuần vs ~188): the exam bar fix BAL.ex.bar [22,27,31] → [22,25,28] is on review/balance-pass
  (not merged). With it C7 measured HH 45 % → if balance-pass merges, re-measure: HH may overshoot 32 %, then raise ex.bar[2] 28 → 30.
- Emperor-first ends (~1 life in 4, at game year ~14, her rank stuck at 6 while the HH seat is filled): pre-existing rule (j3 monthTick
  roll((year−12)×1.5 + …)), same on A and main.

## Tests
- Measures only; no game code or BAL changed on this branch → no UI test needed (no viewport changes).
