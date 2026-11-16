# rank-bright report (branch review/rank-bright, base origin/main b85cdb1e)
Owner 11/16 13:00Z: rank colours too pale -> brighter / more vivid.

## Root cause
Two sources: RCOL (j1, overridden in j59; pale bases) and a second hex table KIT_RT in jk4 for text tones, plus copies: j59 (MRCOL/ERCOL/J59C, "#cfd3d8"), j60 (KIT_COLD_COL, KIT_MRCOL/ERCOL), p1.html + j59 `.rk-c0..c7` portrait grounds, jkitpage sample hexes, 4 "#8a7a6a" fallbacks.
## Change (ONE source)
- j1: RCOL, RCOL_COLD, MRCOL, ERCOL, KIT_ROLE = the only place with colour values (vivid, same family per rank; hue order unchanged).
- jk4: kitToneOf(base) derives text tone (>=4.0:1 on #fbf3e2); KIT_RT maps title words to j1 bases (no hexes); `.rk-cN` grounds generated from RCOL; night tone lightened in oklch.
- j59/j60/j15/j72/jtabs/j79/jkitpage/p1.html: copies deleted or turned into reads of the j1 values. KIT.md §1.3/§1.4/§48.1 overwritten in place; kit page has new sample §1.3 (palette, tone, portrait grounds).
- Her-only stage glow (OD L890) and the stage outline/halo untouched.
## Places proven to change together (grep: no rank hex left outside j1)
stage name tags (.j59t), person pop-up caption (kitEventDp), inline kname/kti in sentences, person cards + sticky strip, picker rows, Tuần lục heading, podium plates, edicts (kitEdict), portrait ground/ring `.rk-cN`, halo (haloColor), tab/chip colours via kitRankCol, maids/eunuchs (kitServCol), cold palace.
Computed tone before -> after: Đáp ứng 135,102,56 -> 149,102,21 (see sheet); Quý phi 200,16,46 -> 222,18,40; list card --c Hoàng hậu #f0d070 -> #ffc20a.
## Tests (local http.server, Playwright)
755x1000@2 + 1180x820@2: kit-page 0 page errors (the 'lot/rcpL/pal' sample errors are IDENTICAL on origin/main: samples need a started game); kit-conform 755: 84/15 vs main 85/15 (count wobbles run to run), 1180: 86/15, floats none; boot (rank-title day/kit, rank-bright) 0 page errors, no overlap/cut tags.
Sheet: dev/handover/reports/rank-bright/before-after.jpg (Fold, seeded, bg loaded: stage tags / person pop-up / Ân oán list). Script dev/test/rank-bright.js.
## Rework 13:30Z - 13:50Z (main s17: change was too subtle)
Jewel-tone bases (RCOL #c4861a #12b84a #1f6cff #ff3d8f #a23cff #ff1f3d #ff6a00 #ffc400, MRCOL/ERCOL brighter). Framed UI (paper) = PLAIN vivid text, no stroke/shadow/glow (owner 15/11 22:25Z + 16/11 13:50Z; KIT 48.1h overwritten); on paintings (OD 13:55Z option 1) EVERY person glows: rank line in its rank colour, name line light-gold, title in tier colour, her tag brighter (KIT 48.1d/e/h overwritten).
## Rework 2 (owner 13:35Z: Đáp ứng bronze / gold too pale on paper)
Tone floor 2.8->3.6:1 (deeper, same hue, still saturated); sheet before-after3.jpg (all ranks on paper + zoomed crops).

## Honest limits
- Text on LIGHT paper is limited by contrast: gold/bronze can only get so bright; the floor is now 3.6:1 (was 4.5), so bronze/gold stay deep on paper.
- Painted frame/gem/brocade art is not recoloured (art task).
- Old non-rank role colours in face constructors (f.col, KIT §1.5) not touched.
