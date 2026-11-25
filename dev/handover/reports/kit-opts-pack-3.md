# kit-opts-pack-3 (f10d269d) — KIT REVIEW (kit rv seat 4, 11/25/2026)
PRIORITY #1 CHECK ('kit-close-reach / kit-opts-pack'): reviewed existing branches only (review/kit-close-reach d8acb74b ⊂ pack-2 2815c46d ⊂ pack-3 f10d269d); main 9f72524b ⊂ head (no merge needed); claims = FOREMAN_B_STATUS.

## REVIEW — **KIT FAIL f10d269d review/kit-opts-pack-3**
FAIL items (numbered, exact):
1. **quickcheck FAIL — core gate G4 `80-dialog-fixed` (dev/test/dialog-fixed.js): `FAIL 755x1000 1-hoi-nga-re-1: phone option cards in 1 column (layout 2S) "2S"`.** REGRESSION: same test = all pass on LIVE 9f72524b and on pack-2 2815c46d; FAIL on f10d269d → caused by §56.27 (step-down switched ON, `step:1`) — the Fold event frame 1-hoi-nga-re-1 now picks the stacked 2S layout. Fix: make step-down keep the 1-column phone layout rule, or (only with owner ruling) change the gate; then quickcheck must PASS.
2. **own test kit-one-opt-tap.js FAILS (§56.29): `ksp-card / centre / 1 option / LOCKED: reason in card y, tap pop NO`** — Fold 755x1000 every run (2 FAIL first run, 1 FAIL rerun incl. iPad flake): a tap on a locked one-option card does not open the lock pop. §56.29 claim not met.
3. **kit-opts-realtap.js MUTATE=1 is still vacuous** (file unchanged since r1 dfdf48e4): MUTATE=1 → `ok` Fold 2/2 (+pack-2 Fold/iPad), iPad 1180x820 2/2 `ok` (frames 16, exit 0). The earlier single Fold MUTATE FAIL on pack-3 was the unrelated flake (4). The clip `.dlg{max-height:62vh}` never bites (kszlive frame rules win). Fix: mutate with higher specificity/!important on `html body #modal .dlg.dlg.kszlive`, or assert against viewport rect; MUTATE must FAIL on Fold AND iPad.
4. FLAKE kit-opts-realtap Fold run 3 of 3 on pack-3: `vlout{}: real tap on the last option did not fire it` + `only 5 frames opened (skipped pmPick{} rcpacc{})` (runs 1,2 ok; iPad 3/3 ok). Needs a fix or a bounded retry, otherwise the gate is unreliable.
5. (RESOLVED, not a fail) kit-tag-collide.js §33.10: TAGS 770 OVERLAPPING PAIRS 0 (Fold + iPad; run takes >10 min, fine).

PASS items (evidence):
- kit-close-reach (KIT BUG #3): LIVE 9f72524b = 14 FAIL Fold + 14 FAIL iPad (rule…week long+opts, "NO visible hit-able closer"; author said iPad 16). d8acb74b head: runs 1/3 ok, 2/3 ok, 3/3 hard FAIL once (iPad `intel long +opts`, 2nd tap did not fire; isolated 8/8 ok = ksz-lost-tap flake family, ~1 in 440 cases). pack-2: 3/3 ok (146 cases ×3, NT=1 Tin báo ×33). pack-3 (f10d269d): 3/3 ok. MUTATE (remove sticky pin AND `.kszbs` rule) → FAIL (iPad 10 long+opts kinds) = not vacuous. Removing only the sticky pin on pack-2 still passes (the M/S size step-up §56.22b + .kszbs covers it; the pin is now a safety net — fine).
- Consistency/law 10 (button sizes) on d8acb74b: 72 frame cases, button sizes/frame size identical LIVE vs head when run isolated (a notice/result swap seen only in an in-sequence run is order dependence, present on LIVE too). L frames static (header ✕ / own scroller), M frames pinned — one rule for every kind, no per-kind variant.
- opt-frame-scroll-scan Fold+iPad (82 frames): LIVE 2 FAIL → pack-2 0 FAIL, regressions 0 (opt-frame-scroll-diff); pack-3 0 FAIL.
- kit-opt-meter-tap 16/16 ok both devices; kit-opts-touchdrag 8 cases 0 FAIL; kit-row-tap-size 18 rows 0 FAIL; kit-focus-fig ok; kit-focus PASS; kit-close ok (pack-3).
- quickcheck pack-2 2815c46d PASS (old save ok, perf ok); pack-3 quickcheck parts: open/old-save/perf ok (open 2179 ms, buổi 1387/1588 ms) — fails only on G4 above.
- NOT done (time, FAIL already decided): real-art Fold+iPad shots looked 3×; KIT.md §56.27–56.29/§33.10 read-through; kit page entries.

## Hand-back
Worker fixes 1–4 (1 and 2 are product, 3–4 test integrity), re-posts; I re-run: dialog-fixed, kit-one-opt-tap, realtap iPad 3/3 + Fold 3/3 + MUTATE both devices FAIL, scan, kcr x3, quickcheck. Nothing pushed to main; no CDN review folder was created by me (nothing to wipe).
