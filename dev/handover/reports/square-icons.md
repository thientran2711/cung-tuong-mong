# square-icons (owner 16/11 15:05Z) — report

Change (kit only): `.krailb` in `dev/build/jrail.js` (KIT §77 kitStageRail) = rounded-corner SQUARE (8 px, same corner as kit ✕ `.kit-x`), 44x44 (was round 40 / 34 in short landscape; now 44 everywhere = tap target). Red dot stays. KIT.md §77 rewritten + SHAPE RULE (no round tap targets). Kit sample §77 title updated. Co-op chat icon uses the same rail, so it follows.
Also `.kcard .kinfo` (p1.html, old ⓘ button, hidden under `.ka.kcard`) 50% -> 8 px so no round button remains in the CSS.

## Group audit (before -> after)
| element | where | before | after |
|---|---|---|---|
| `.krailb` cal (Lịch tháng) | stage, top-left | round 40 | square 44 r8 |
| `.krailb` goal (Mục tiêu chương, red dot) | stage | round 40 | square 44 r8 |
| `.krailb` chat (co-op, review/coop-chat) | stage | same class | follows kit |
| `.kinfo` ⓘ | old act card (hidden) | round 28 | r8 |
Runtime scan (dev/test/square-icons-scan.js, all tabs, 755x1000 + 1180x820): only `.krailb` was a round tap target. Others are NOT buttons, left: `.k3age`/`.kchip`/`.ksart-chip`/`.kodm` pills (chips), `.kstw`/`.khap` 13 px "!" marks (indicators, title only), avatars/medallions (`.md`, kmwx weather icon 18-20 px), sliders' thumbs/toggle knobs, dots, seal. Doubtful: `.kstw`, `.khap` (title tooltip only, not tappable).
Already non-round: `.kit-x` (r8), back-to-place `.kbackb` (painted, no bar), tabs, act cards.

## Tests (direct mode, ?khost=0, @2)
stage-rail.js 755x1000, 1180x820, 1366x1024, 412x1058, 390x844, 1024x768: PASS, buttons 44x44, none over a face, no page errors.
kit-conform.js 755x1000 + 1180x820: CONFORMS 59/60, floats none (MISSING = cases absent in a fresh save, unchanged). tab-underline-scan (tab pairs) all 6 sizes: bad []. game-feel: see coordinator note below. Old save loads (CSS only, no state change).
Sheet: dev/handover/reports/square-icons/before-after.jpg (stage crop 755x1000 + 1180x820, before/after).
