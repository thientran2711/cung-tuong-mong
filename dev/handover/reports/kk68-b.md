# KK68-B — K-OPTS-READER half B (53 test files, coop-sleep.js → wk-kind-game.js)
PRIORITY #1 CHECK: OD n/a (KK68 order, test harness only) | main n/a | review/* kk68-optsreader 498a869b (lib dev/test/lib/kopts.js + half A = the pattern, reused) | claims KK68 split list (kk68.md §2 half B)
KIT CHECK: test-only, no game code, no UI change. No regex lookbehind (webkit hook 30).

Branch review/kk68-optsreader-b, based on review/kk68-optsreader 498a869b (settled lib API). Commits: switch (53 files), settled API pass, kit-std-scan result scene.

## What changed
- Every file: `await require('<rel>/lib/kopts').install(p)` right after newPage (coop bots: inside o.page; sw-update: 3 pages). lib/playperf.js (shared page code, also used by half-A / other tests) uses the reader only when `window.__kopts` exists, else the old read.
- First enabled choice → `__koptsOn(m,':not([data-kcp])')[0]` / `__koptsOn(m)[0]`; clicks → `__koptGo`; names → `__koptText` / `__koptName`; `x.offsetParent` on reader results → `__koptSeen`; `.disabled` → `__koptOff`; `.opt` read → `__kopts(M,'.opt')`; Playwright locator taps (schemegames, schemewire) → `KO.tap` (real taps).
- kit-std-scan «result» scene (KK68 ask): `__koptsOn(m)[0]` + `__koptGo`, no `.opts` guard; INFO probe «result: no #rtoast.karesult after the act». RESULT: still NOT reached (fold + ipad) — the act card tap (`#panel button.ka` b.click()) runs the act (used=1) but no dialog, no choice, no #rtoast / .kmov at +0.9/2.4/3.9 s. Not the reader; KK68 filed it to MAIN as a separate item; INFO kept (no FAIL, hook 96 baselines unmoved).
- Kept as is (not a list read / the hand mechanism under test; a miss there FAILs loudly, never vacuous): data-m index taps in dlg-dead-scan / kit-pick-go / press-keep rows, kit-hand-split `.opts button.kopt`, kit-close-reach closer geometry, kit-std-scan CHOICE selectors (already plaque-aware), kit-warn-line `.opts` sibling check.

## Before / after (base = d408091d test files, identical to 498a869b for half B; after = this branch). fail = FAIL-line count in the log; rc 124 = 15 min cap.
| file | before | after | KOPTS line |
|---|---|---|---|
| coop-sleep.js | rc=1 fail=1 | rc=1 fail=4 | KOPTS reads 77 · blind-before 0 · plaques 0 |
| coop-steal.js | rc=124 fail=0 | rc=124 fail=2 | KOPTS reads 246 · blind-before 4 · plaques 4 |
| coop-timer-lag.js | rc=1 fail=11 | rc=1 fail=12 | KOPTS reads 63 · blind-before 2 · plaques 2 |
| coop-timer.js | rc=2 fail=5 | rc=1 fail=5 | KOPTS reads 98 · blind-before 2 · plaques 2 |
| coop-toil-look.js | rc=1 fail=1 | rc=0 fail=0 | KOPTS reads 76 · blind-before 3 · plaques 3 |
| coop-ton-row.js | rc=1 fail=4 | rc=1 fail=4 | KOPTS reads 15 · blind-before 0 · plaques 0 |
| dead-card.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 7 · blind-before 0 · plaques 0 |
| df-folded-who.js | rc=1 fail=1 | rc=1 fail=0 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| dialog-person.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 3 · blind-before 0 · plaques 0 |
| dlg-dead-scan.js | rc=1 fail=2 | rc=0 fail=1 | no KOPTS line |
| emoseal-nonplay-scan.js | rc=0 fail=0 | rc=0 fail=0 | no KOPTS line |
| fig-retry.js | rc=0 fail=0 | rc=0 fail=0 | no KOPTS line |
| flip-entry.js | rc=1 fail=4 | rc=1 fail=5 | KOPTS reads 9 · blind-before 0 · plaques 0 |
| gain-empty.js | rc=124 fail=0 | rc=124 fail=0 | KOPTS reads 877 · blind-before 701 · plaques 701 |
| goal.js | rc=1 fail=0 | rc=1 fail=0 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| hoang-tu.js | rc=1 fail=0 | -  | not run |
| home-chapters/coop-seats.js | rc=1 fail=4 | rc=1 fail=4 | KOPTS reads 3 · blind-before 0 · plaques 0 |
| home-chapters/costrows.js | rc=1 fail=0 | rc=1 fail=0 | KOPTS reads 126 · blind-before 0 · plaques 0 |
| kc-roads/coop-together.js | rc=124 fail=27 | rc=124 fail=27 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| khac-day-run.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| kit-close-reach.js | rc=1 fail=33 | rc=1 fail=33 | no KOPTS line |
| kit-goal-link.js | rc=1 fail=2 | rc=1 fail=2 | KOPTS reads 3 · blind-before 0 · plaques 0 |
| kit-hand-split.js | rc=0 fail=0 | rc=0 fail=0 | no KOPTS line |
| kit-pick-go.js | rc=0 fail=1 | rc=0 fail=1 | no KOPTS line |
| kit-popup-sample.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 5 · blind-before 0 · plaques 0 |
| kit-std-scan.js | rc=1 fail=17 | rc=1 fail=17 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| kit-title-name.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| kit-warn-line.js | rc=0 fail=0 | rc=0 fail=0 | no KOPTS line |
| lib/playperf.js | rc=0 fail=0 | -  | not run |
| men.js | rc=1 fail=0 | -  | not run |
| minigame-tap.js | rc=1 fail=0 | rc=1 fail=0 | no KOPTS line |
| oldroom-r1.js | rc=1 fail=0 | -  | not run |
| or20-j68q-coop.js | rc=1 fail=4 | rc=124 fail=2 | KOPTS reads 215 · blind-before 4 · plaques 4 |
| outside/coop-home.js | rc=124 fail=28 | rc=2 fail=0 | no KOPTS line |
| outside/coop-kcco-ui.js | rc=2 fail=10 | rc=2 fail=7 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| outside/coop-kcco.js | rc=2 fail=0 | rc=1 fail=10 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| pets.js | rc=1 fail=0 | rc=1 fail=0 | no KOPTS line |
| place-card.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 4 · blind-before 2 · plaques 2 |
| play-perf.js | rc=1 fail=1 | rc=1 fail=1 | KOPTS reads 11 · blind-before 0 · plaques 0 |
| play-prof.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| popup-fullbody.js | rc=1 fail=41 | rc=1 fail=41 | KOPTS reads 12 · blind-before 0 · plaques 0 |
| press-keep.js | rc=0 fail=0 | rc=1 fail=2 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| punish-reason.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| reign.js | rc=1 fail=0 | rc=1 fail=1 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| schemegames.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 32 · blind-before 0 · plaques 0 |
| schemewire.js | rc=1 fail=0 | rc=1 fail=0 | KOPTS reads 3 · blind-before 0 · plaques 0 |
| show-why-coop.js | rc=1 fail=2 | rc=1 fail=2 | KOPTS reads 4 · blind-before 0 · plaques 0 |
| stipend.js | rc=1 fail=1 | rc=1 fail=1 | KOPTS reads 1 · blind-before 0 · plaques 0 |
| sw-update.js | rc=1 fail=0 | -  | not run |
| thoi-live-scan.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 336 · blind-before 10 · plaques 10 |
| tuduc-mg.js | rc=1 fail=0 | rc=1 fail=0 | KOPTS reads 2 · blind-before 0 · plaques 0 |
| walk-spill.js | rc=0 fail=0 | rc=0 fail=0 | no KOPTS line |
| wk-kind-game.js | rc=0 fail=0 | rc=0 fail=0 | KOPTS reads 22 · blind-before 0 · plaques 0 |

Not run (need builds this seat does not have): hoang-tu (_ht.html/_ht0.html), men (_mt.html + _old.html), oldroom-r1 (.tmp/old.html old build), sw-update (build_site + sw-overlays). Their switch is syntax-checked only (node --check). lib/playperf.js is a lib: exercised by play-perf + play-prof (same result before/after).
Args used: page URL = a local http.server of each worktree root (index.html), Fold 755x1000@1 where a size is asked; dlg-dead-scan / kit-pick-go with the y05-ncBtuc-035 fixture from the handover branch.

## Differences checked (second run of each side, before2 / after2)
- press-keep after 1st run FAIL (ipad: row covered by #klife loading scene) → after2 PASS, before2 PASS: flake.
- coop-sleep 1→4 → after2 1 (= before 1/before2 2): live-Worker variance.
- flip-entry FAIL 3/4 before, 4/5 after: the same «at the END of tối the flip runs» lines on random games in both; variance.
- outside/coop-kcco, coop-home, or20-j68q-coop, coop-steal: rc/fail moves both ways run to run on the live Worker (different FAIL lines each run). coop-steal after2 lists «guest plays her own night» — the guest bot now also clears plaque-only frames (blind-before 4) — NOT claimed as a game fault: before2 also failed (another line); needs a quieter worker to judge.
- reign: before crashed at the switch step (random side null), after reaches the end and FAILs «kit hides outcomes» — before's c2a read also showed hide:0, so that check fails at base too (pre-existing, not the reader).
- dlg-dead-scan 2→1 FAIL lines (ring_dangqua dead tiles in both).
## Vacuous reads found (blind-before > 0: the old read saw no visible choice while plaques were on show)
gain-empty 701 of 877 reads (the card scan read plaque-only frames as empty most of the time), thoi-live-scan 10, coop-steal 4, or20 4, coop-toil-look 3 (its 1 FAIL went away after), coop-timer 2, coop-timer-lag 2, place-card 2.
