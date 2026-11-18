# review img-cleanup-r1 (reviewer of Foreman B s7, 11/16/2026)

PASS 2032fb69d74e8be1dd1f3267c90af9a2bef9fc9d

Branch `review/img-cleanup-r1` = origin/review/img-cleanup a2e99bd0 merged onto origin/main 84c00794 (descends it; checked after the last fetch).
START_CTX: ~5 % of the window (estimate).

## Reviewer fixes on review/img-cleanup-r1
Main kept receiving review shots while this was in review. The new check caught them on every merge, and I removed them with `git rm` (no history rewrite):
- 15057195: 7 × dev/handover/reports/chonso-cloud/*.jpg (landed after the cleanup base a0d93ac8).
- d1d63b68 (merge of 7b5e5e49): 7 × chonso-cloud/*.jpg (re-added) + 2 × dev/handover/reports/lag-play-video/*.webm.
- 2032fb69: merge of 84c00794 (buoi-art), clean, no new images.

## Checks
1. **Served pictures untouched.** Scan of every `img/` / `audio/` / `icons/` path in dev/build/*.js, dev/site/*, index.html, sw.js, assets.json, manifest.webmanifest and CSS: 26796 refs. Every local one (icons/*.png ×6) is still tracked. Every literal `img/` path was checked against the CDN index (img/_index.json, 26925 objects). The 16 not on the CDN are all comment placeholders (`img/x.webp`, `item-X`, `veil-t1..t8.png`, `rash-1..3.png`…) or known painted-later fallbacks (mg-tat-bg, islot-frame-G, origin-bd, nau, theu). None of them was a git file before, so the cleanup did not cause them. Of the 6121 paths deleted from main, the only one quoted in a game/site source is a comment (jbook.js: dev/owner-shots/1115-turn-ref-1.jpg). Main never tracked img/. On the handover branch, all 3584 deleted img/ keys exist on the CDN.
2. **Live walk with real CDN pictures** (shots in scratch only, none in git or on the CDN). Route: title → Chơi một mình/Chọn sổ → Luân hồi → identity card → first turn → 8 tabs (act, go, court, rel, kid, inv, art, story) → one buổi → card-flip night event. Results:
   - Fold 755x1000@2: 1091/1091 image responses OK, 0 4xx/5xx, 0 broken `<img>`, 0 page errors, no horizontal overflow.
   - iPad 1180x820@2: 1133/1133 OK, same zeros.
   - The 3 ERR_ABORTED requests per run are cancelled fig loads; each of those keys exists on the CDN.
   - I looked at the title, Luân hồi, identity card and card-flip shots: all pictures are present.
3. **Old save:** loads and plays a buổi in all 3 quickcheck runs.
4. **No history rewrite:** both worker commits (4c24e6fb, a2e99bd0) are plain `git rm` + adds. The handover commits fd8642e0, 5639d9b5 and 5c48f5a6 are in the handover history.
5. **Allow-list gate:**
   - `img-allowlist-selftest.sh` = PASS.
   - pre-commit hook (after `install.sh`) blocks a staged `dev/xx/stray.png` (rc 1).
   - build_site.sh fails on strays. It failed on the merged tree until the chonso shots were removed, then passed.
   - `quickcheck.sh origin/main` = FAIL at step 0 (main still holds images; intended).
   - `quickcheck.sh HEAD` = PASS on 15057195, d1d63b68 and 2032fb69. Last run: open 879 ms, old save ok, perf in budget.
   - golive.sh calls quickcheck unchanged.
   - main's old quickcheck kit still works on this sha: the sha's own build_site.sh runs the check and passes.
6. **Templates:** 5c48f5a6 changes only PREAMBLE.txt L14 and REVIEWER.txt L4 (coordinator lines, shots sentence), plus their generated copies START_WORKER.md and START_REVIEWER.md. No owner verbatim rule text changed.
7. **CDN:** nothing deleted. The object count is 26925, the same as in the worker's table. `--wipe-review` is restricted to img/_review/<one topic>/ and has `--dry-run`.

## Notes for the coordinator (not FAIL items)
- N1. The handover branch has **14 new images** since the cleanup:
  - foreign-princess-art: 2
  - map-frame-art: 7
  - pl-night-art: 1
  - weather-videos-v3: 4

  These sessions did not install the hook (`bash dev/site/hooks/install.sh`), and the handover branch has no build gate. Please tell Foreman C / the art workers to install the hook and move their samples to img/_review/<topic>/ on the CDN, then `git rm` them. I left them alone because they are live samples of other workers.
- N2. Any review/* branch that still carries images will FAIL quickcheck step 0 once this is live. That is intended; `git rm` fixes it.
- N3. The worker's questions are still open for main: the owner-shots paths in START_WORKER L28 / OD:L177, the CDN delete table (§4 of reports/img-cleanup.md), and veil/rash/scar (owner).
- Shots: scratch only, deleted. No CDN review folder was used, so there is nothing to wipe.
