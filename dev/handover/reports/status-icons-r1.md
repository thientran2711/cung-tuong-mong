# status-icons r1 review (SMALL tier) — reviewer session_01UV1Szkts9Mdx3Ydnpyf3No

VERDICT: PASS e47bba8a54cd3a7cf090b474d4bfbc5f3e39889d (branch review/status-icons-r1, pushed; origin/main 12f52db7f is an ancestor)
Reviewed: review/status-icons @ 0613ec0a5 (was 40 commits behind main). Merged onto origin/main 12f52db7f: conflicts only in generated files (index.html, sw.js)
and the dev/build/assemble.py file list (kept main's list + 'jstatus.js' after 'jrail.js'); site rebuilt with dev/site/build_site.sh.

## Results
- KIT first: kitStatusIcon registered in KIT.md §77.1 (+ §36.6, §35.2, table row, kitTip line updated). Consistency scan: the old chips `.kloadchip` / `#kupdchip` are gone from code;
  both users (`dl`, `upd`) go through kitStatusIcon. Co-op clock `#kctm` / friend chip `#kctmf` stay chips by the coordinator ruling (documented in KIT §77.1). kit-conform 755x1000 + 1180x820: 86 CONFORMS, 0 CUSTOM, floats none.
- status-icon.js (touched part): 755x1000 PASS, 1180x820 PASS (2 of 2 reruns), 1000x755 PASS; no page errors.
- Fold fix: on tabs where the stage has height 0 the icon docks bottom-left above the tab bar (shot si-755x1000-othertab): does not cover tab buttons; it sits over the bottom-left corner of the page content (empty on Nam nhân; a list that fills to the bottom could be touched at its corner — owner asked for a corner icon, accepted).
- stage-rail.js 1180x820 + 755x1000 PASS. load-e2e.js cold (Fold, throttled): PASS, no errors, offline reload ok (2 broken offline images are CDN art, not this change).
- Old save / returning player: sw-update "main" (old main build + a sổ → this build) 5/5; sw-update "play" 23/24, "away" 9/10 — the single failure in each is "sổ written before the reload == sổ after it": harness error `undefined.slice` in samePre (new S.visit/record fields from D29 jqsave). Same assertion also errors on a clean origin/main build (baseline run) → pre-existing test brittleness, not this branch. Sổ, buổi, khắc, tab all identical in the same runs.
- Shots: dev/handover/reports/status-icons-r1/ (Fold busy + other tab, iPad panel + "Có bản mới" icon).

## Notes (not blocking)
1. status-icon.js at 844x390 direct mode fails "icon outside stage" (3rd rail button clipped in the 360px stage). Not a SMALL-tier size and direct mode is unscaled (a real player sees the 1180x820 design scaled), so waived; if ever needed, hide rail overflow or wrap.
2. 1180x820 `upd icon wrong` once on the very first cold run (icon not yet registered); passes on reruns → timing flake in the test (wait for st-upd).
3. dev/site/swreg.js:141 still lists the dead selector `.kloadchip` (harmless).
4. Painted icons still text glyphs (↓ ✓ ⟳): ART REQUEST already noted in KIT §77.1.
