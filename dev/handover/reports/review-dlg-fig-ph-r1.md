PASS fd7768b30966f4dfa5adc6d217feb9696995b3ec
# review/dlg-fig-ph-r1 (D50) — reviewer result
Branch review/dlg-fig-ph-r1 = origin/main ba07c65 + review/dlg-fig-ph 0bf17ac; only generated files conflicted (rebuilt with build_site.sh). origin/main is an ancestor (fast-forwardable).

Checks
1. dlg-fig-scan: BAD 0 of 60, page errors 0.
2. panel-size 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: widths uniform, 0 page errors, no nofit/xOut. btnOut PEND:plantpick (1000x755/1180x820/390x844) is PRE-EXISTING: identical on origin/main at 1000x755 — not this item. "mood" case 320 vs 529 in one run not reproducible (8/8 rivals 529 in isolation) = harness noise.
3. stage-fig-size 6 viewports: over 0, distorted 0, face true. figH 0 rows = CDN pictures not loaded within harness wait through the slow proxy (same harness on the figure-less cases); with an explicit wait the figure shows.
4. Screenshots LOOKED at (755x1000, 1000x755, 1366x1024, 844x390): silhouette fills the normal figure column, same position/size tier as real figures (KIT_FIG kfr .935 f / 1.0 m), no overflow, no cut text.
5. Stranger rule: stranger = silhouette + "Người lạ"; known person without art (e.g. Phế phi họ Lý) = same silhouette + real name. Consistent with kitKnownName; kitFigOf already returned unknown-fig for strangers, the fix only adds the fallback for known people. Other figure places (week book j87, identity card kpIdFig j79, j59 stage, pickers kpmSil/k61SilChip, jplace) already use the same kit unknown-fig-f|m|k files; no per-place variant added.
6. Swap-on-error: failing figure → one swap to the silhouette (src changes: 1), no loop (guard: only when src is not already unknown-fig, data-sil removed), no flash, loaded. CDN 404 path goes first through jcdn retry (?r=1), then the element onerror swaps.
Notes (non-blocking): before FIGURES manifests load (first seconds) known people with art show the silhouette instead of blank; not re-rendered when the list arrives (was empty before). After swap --kfr stays that of the original figure (same tier for same sex). Story NPC records without ref still need real art (ART NEEDED, listed in dev/PROGRESS_dlg-fig-ph.md).
~100% xong / ~100% chơi được (cho mục D50)
