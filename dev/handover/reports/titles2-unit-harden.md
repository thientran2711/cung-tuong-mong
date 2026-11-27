# E-T2FLAKE — titles2-unit harden (test-only, no game code changed)

PRIORITY #1 CHECK: OD «titles2» = E-TITLES3 work (FOREMAN_E_STATUS 08:43Z) | main d9ca7892: no titles2-unit.js | review/titles-daycard-lrm3 14a3a4c2 holds dev/test/titles2-unit*.js (base of this branch) | claims: none.
Branch review/titles2-unit-harden, base origin/review/titles-daycard-lrm3 14a3a4c2. Files touched: dev/test/titles2-unit.js, chapter-title-hook.js, title-notice-tap.js, titles2-ui.js (+ this report). No game code.

## Root cause (reproduced)
The G1/G3 flake was NOT a timing race. G1–G3 run synchronously inside one page.evaluate, so no timer can fire in the middle. The input was random: `S.maid.loyal = 50+R(31)` per new life (j8.js:32). `RULE.khoan` («Khoan hậu», jdh3.js:92) turns true on a high loyalty roll. Then `khoan` takes the second-name slot before `cankiem` (RP order: khoan line 35, cankiem line 36), so G1 saw `pend ["rp:khoan"]` instead of `rp:cankiem` and G3 (waiting key `rp:cankiem`) found 0 panels. It happened 1 in 12 runs under 4-way parallel load (about 1 in 6 on the owner's side).
Proof: the OLD test with `S.maid.loyal=100` forced fails every time with exactly the reported G1 + G3 lines (`pend ["rp:khoan"]`, `G3 … (0)`).
Fix: the G block pins `S.maid.loyal=0` first, so only «Hiền lương thục đức» + «Cần kiệm» qualify.

## Timing hardening (brief step 2; real waits, bounded, clear message)
Helpers added to each file: `until` (bounded waitForFunction with «TIMEOUT waiting for …»), `settle` (2 rAF), `stable` (modal hidden flag + text + day-title card unchanged for 3 polls; with `prev` it first waits for a real change), plus `ready` (tap target still for 3 frames and topmost, title-notice-tap) and `shown` (dialog up + topmost, titles2-ui). Viewport is now `VP=WxH` (default 755x1000).

| Pattern | file:line (before) | after |
|---|---|---|
| boot `sleep(2000)` | titles2-unit.js:15 | until readyState complete + TITLES2 + rpSync + deal + kitPanel; settle |
| day-card `sleep(900)` | titles2-unit.js:20 | wait for #kdaytc (≤3 s, optional), remove, then condition |
| after new life `sleep(500)` | titles2-unit.js:22 | settle + until (no card, modal hidden, Q empty) |
| boot `sleep(1500)` / card `sleep(800)` / `sleep(150)`×2 | chapter-title-hook.js:24 / 29 / 37 / 45 | readyState+settle / wait #kdaytc / settle |
| boot `sleep(2500)`, `sleep(1500)` | title-notice-tap.js:8 / 10 | readyState+settle / settle+stable |
| open `sleep(1200)` | title-notice-tap.js:11 | stable(prev = sig before) |
| tap `sleep(700)` / `600` / `800` | title-notice-tap.js:12 / 17 / 18 | ready(button) before the click, wait for the REAL end state (modal hidden / «Đeo «…»» panel / S.titleWorn), then stable |
| boot `sleep(2500)` ×2, `sleep(1200)` | titles2-ui.js:11 / 13 / 17 | readyState+settle, stable |
| scroll `sleep(500)` ×2 | titles2-ui.js:27 / 29 | stable |
| card/notice/chapter `sleep(900/1500/1500)` | titles2-ui.js:31–33 | shown(): dialog up + stable + topmost at centre |
Fixed sleeps left in these 4 files: 0 (grep `sleep(` = no calls).

## Proof
- titles2-unit, 20 runs per device, 4 in parallel: Fold 755x1000 = 20/20 PASS (exit 0), iPad 1180x820 = 20/20 PASS. Flakes 0. (84 ok, 0 fail each.)
- Mutant: dhNoteGate per-buổi cap disabled (`if(false&&S.dhNB…`) on a copy of index.html → G1, G2, G1-3 FAIL, exit 1.
- chapter-title-hook 6/6 PASS (parallel); title-notice-tap 6/6 PASS (sequential; under 12-way parallel chromium load the first version of `ready` timed out at 8 s, so the bound is now 20 s); titles2-ui 2 runs, same 2 fails as base.
- titles2-ui «notice: no dialog» (both devices) was a STALE TEST, not a flake (foreman add-on, law 11 same family): E-TITLES3's «seen» gate (jdh3 seenOK, BAL.dh.rp.seen=8) bars a fresh life from earning «Hiền lương thục đức». Setup-only fix in the notice case: `S.rep.t0=-1e9` before rpSync. That unmasked the next case («chapter notice: no dialog»): the notice used the buổi's slot of the ONE title gate, so the chapter title waited in S.dhPend; setup-only fix `S.dhNB=null;delete S.dhPend` before cpGive. No assertion weakened. After: titles2-ui PASS 0 issues on Fold 755 + iPad 1180 in 3/3 runs; titles2-unit 1 run each device PASS (84 ok).
- Not restored: `S.maid.loyal` stays 0 after the G block (later cases passed 40/40; note for the next editor).
