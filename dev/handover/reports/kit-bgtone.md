# kit-bgtone — KIT KEEPER report (root76-kit-bgtone)
PRIORITY #1 CHECK: OD 20/11 ~07:45Z (owner, FOREMAN_C_STATUS:474-475) | main: kit tokens `:root{--bg,--panel,--panel2,--line,--k-hair,--k-card,--k-card2,--k-lab}` (p1.html:282, j79) | review/*: rank-palette-b24 (rank colours, untouched) | claims: this worker.

Branch `review/kit-bgtone` @ 9f636249 (from origin/main 716be762, index/sw rebuilt).

## Reference palette (dev/art/rank8-trio/, t1–t8 s62/s64/s65, looked at t4)
Powder blue + mint, rose-pink + lilac, sage green + peach; all with gold embroidery, jade/pearl, soft pastel, light and airy. The old ground (#f5ecdc cream, #fffaf0 paper, gold line) is warm yellow-beige.

## What (kit only, one place → everywhere)
- j79 §0.3: `KIT_BG="a"` (one-line switch to "b") sets `<html data-kbg>`; two token sets, nothing else changed:
  - A «Ngọc sương» (jade mist, from the sage/mint/blue robes): bg #e4ebdc · panel/k-card #f6faee · panel2/k-card2 #e3ecd6 · line #c9bf8e · k-hair #d3dab8 · k-lab #5f6b45
  - B «Đào phấn» (peach blush, from the rose/peach robes): bg #f5e2dc · panel/k-card #fff4ef · panel2/k-card2 #f5dcd4 · line #dcb7a0 · k-hair #e8cbbd · k-lab #8a5f58
- NOT touched: gold (--gold/--trim), red/seal (--red/--bad/--k-seal), green (--good), --ink, --dim, odds colours, rank colours (rank-palette-b24), art.
- Coverage fix (same default value, so "now" is unchanged): 31 plain `background:#fffaf0 / #f6ead6` literals in j57 j63 j79 j87 j93 jcoopchat jmapc jmcal jne jopic p1.html now read `var(--k-card,#fffaf0)` / `var(--k-card2,#f6ead6)`, so the sets reach them. Still literal on purpose (not a plain background): inset rings `0 0 0 2px #fffaf0`, gradients `linear-gradient(#f6ead6e6,#fffaf0f0)`, canvas fills — listed for a later sweep if she wants the colour to go deeper.
- Contrast (WCAG): ink/panel A 16.1 · B 16.2; dim/panel2 A 6.0 · B 5.8; label colour on panel: now 4.3 → A 5.5 · B 5.3 (both ≥ 4.5; the old label colour was below); gold/bad/good on panel unchanged ≥ 5.0.

## Shots (LOOKED; sheets = now | A | B, same screen, Fold 755x1000 and iPad 1180x820; jpg on CDN, never in git)
Base https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-bgtone/ — sheet-{fold,ipad}-{home,act,haucung,soghi,tainghe,rules}.jpg
(home = room scene, act = Hành sự tab, haucung, soghi = Sổ ghi/Mệnh truyện, tainghe, rules = mini-game «Luật chơi» dialog with its 3 option buttons). Characters differ between columns (random new game each run); only the colours should be compared. Costume figure is on screen on home/rules.
Note: A is clearly mint-sage, B clearly blush-peach, "now" is cream; both readable, text/icons/rank colours unchanged. The sheets are 1400–1800 px wide (@1); the owner pair at @2 can be cut from the same script if she wants a closer look. Delete the folder with the verdict: `python3 dev/site/cdn_sync.py --wipe-review kit-bgtone`.

## Tests
- Fold/iPad sheets above, no page errors in the shot run.
- quickcheck (`dev/tools/quickcheck.sh 9f636249`, = build equality + core gates (one-core, rules-one-source, kit-conform) + old save + perf): QUICKCHECK PASS · 201 s · open 1689 ms · old save ok · perf (median of 3, new/live): render 239/231 ms, tab 407/439 ms, buổi 1307/1064 ms, tasks>200ms 21/19 · core gates PASS (one-core-guard, rules-one-source, kit-conform, hooks 6) · time-spill guard PASS.
- Not run: `golive.sh` (the auto-mode classifier refused it; quickcheck.sh is its check part, nothing was pushed to main).
