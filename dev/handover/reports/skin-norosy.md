# skin-norosy — rosy-skin layer removed from ALL pictures (owner 16/11 12:45Z, option B)
Branch review/skin-norosy @95f8d7cd (from origin/main b85cdb1e; no kitFigLight code). Worker session_01UV1SzjQcW4S8GoPGj8rDyk. START_CTX ~4 % of window.

## Done
- Rosy layer undone, everything later kept (huadian, makeup, outfit/pose edits, neck wedge, edge extensions): see dev/art/skin-norosy/README.md.
- Sources found (priority rule #1, git grep main): rosy pass = skin-smudge.py rosy() via scene-light/tools/hb.py, list dev/art/skin-rosy-fixed.txt;
  skin-match neck/hands shift that followed it (log/fix.jsonl); player look 1 rosy (skin-match/player.py). review/skin-light panel B method reused
  and made exact per file (pixel diff vs the pre-rosy git copy, commit 3374e531 = last tree with img/ in git).
- FILES CHANGED ON CDN (same names): 1903 fig/por + 389 img/hd twins + 140 img/tn thumbnails = 2432. Live _index md5 == fixed file for 2432/2432.
  1631 by exact pixel diff (pre copy re-registered when re-cut), 272 by the rebuilt rosy field (pre copy no longer lines up / born after img/ left git;
  validated on 40 exact files: residual a*/b* ±0.3).
- Result on all 952 measurable portraits: face a* − pre-rosy a* median +0.1 (p10 −0.1, p90 +0.3), b* 0.0 (before the fix: a* +6.0).
- Cache-busting: site rebuilt on the branch (assets.json + sw.js) → SW keys ?h=<md5> change, so the new pictures load once main is rebuilt/merged.
  Plain-URL loads (no SW) can keep the old picture up to 7 days (CDN max-age), same as any same-name overwrite (CDN.md).
- Never again: rosy() raises, hb.py A_LIM disabled, player.py raises (message quotes the owner). Canon overwrite on this branch:
  dev/rules/topic/art-faces-figures.md [OD:L415] "faces must look rosy" → replaced in place by [OD:L1305] (owner 12:45Z verbatim); [OD:L622] rosy mismatch
  line deleted; art-costumes.md [OD:L475] "APPROVED rosy-skin sample → fix 807 portraits" clause deleted (makeup approval kept).
- Gotcha found: the first CDN download (plain URL) returned STALE copies for 1192 files (cache) — everything was re-downloaded with ?h=<md5> and
  checked against _index before processing and before upload. Anyone pulling pictures to edit: use ?h= or cdn_sync --pull.

## Proof
- dev/art/skin-norosy/proof-fold-755x1000.jpg (branch review/skin-norosy): Ngọc Thanh các stage, Fold 755x1000@2, 10 figures in 5 pairs
  (player look 1, player look 3, consorts c32-t2 + c05-t4, maids m10 + m03, eunuch u20, man congtu-7, Thái hậu h2-a36, kid p02-a14);
  left = rosy layer, right = removed; face strip under each pair. Looked at.

## Tests (local http server + Playwright, 0 page errors)
- dev/test/house-stage.js 755x1000@2 and 1180x820@2: ck [] errs [].
- dev/art/skin-norosy/figpages.js (boot + every tab, fig/por pictures shown / broken): 755x1000@2 and 1180x820@2 → 0 broken, 0 page errors.

## Notes for review
- review/skin-light FIGLIGHT.json (kitFigLight) was measured on the rosy pictures: stale, must not ship (owner: not C).
- Rosy backup not kept on the CDN (owner decision is final); old pixels are reproducible only approximately.
- Not checked: other origin/review/* branches for a rosy re-apply (only main + review/skin-light fetched; shallow-fetch rule) — tools on main disabled.
