# review/reign-road-fix (orphan #33, from reign-road-r1b)
Base: origin/main 399483e3. Status: ready for review.
1. Triều cục faction rows + foe-evidence line: DONE (kitNameList helper in j61.js next to kitKnownName; jreign.js uses it). Whole family: 9 more list sites moved to the same helper (j2, j10, j27 x2, j34, jgift, jht, jts, j42). Before/after: dev/handover/reports/reign-road-fix.md.
2. k3rows hint overflow: already gone on main (option cards are min-height 128px and grow; scan 0/204 cards overflow at 4 viewports). No text change, no kit request needed.
Scans (kept): dev/test/unmet-names-scan.js, unmet-list-family.js, opt-overflow-scan.js (negative control: forcing 70px cards is caught).
