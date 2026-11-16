PASS 90c5b9e50641edb94c2bcec465cc31e1c66bba49
# review of review/reign-road-fix @ 9f4e8bf9 -> branch review/reign-road-fix-r1 (ancestor: origin/main 18fb8252)
Merge of current main: only index.html/sw.js conflicted (built files) -> rebuilt with assemble.py + build_site.sh.

## Checks
- Fault 1 (unmet consorts "???"): kitNameList is a kit helper in j61 beside kitKnownName; Triều cục rows, foe-evidence line, and 9 other join sites use it. Looked at the Triều cục screenshot 755x1000: fine. Kit-first OK (no private chip).
- Fault 2 (option hints vs .opts.k3rows): verified independently. k3rows is `grid-auto-rows:auto; min-height:0` on main, cards grow. opt-overflow-scan: 80 reign dialogs, 204 cards, 0 overflow at 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2. Screenshots 755 (c6b), 1180 (c2a), 390 looked at: hints complete, no cut. Kit card NOT changed, no text shortened -> no lost meaning; no KIT REQUEST needed.
- Tests: reign.js PASS at 755x1000, 1180x820, 1366x1024, 390x844 (390 shows the rotate prompt, as designed); panel-size.js 59 cases, 0 page errors at 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2. (390 btnOut PEND:plantpick pre-existing, identical on main, not caused here.)

## Finding: family scan was NOT complete (worker's own unmet-names-scan.js exits 1 on it) -> fixed by reviewer, small
1. jwhy.js whyPal/spyWho: spy act line and picker printed "Tần ở thiên điện của Lục Hải Đường (chưa quen)" (palName("r"+id) = "thiên điện của <name>"). Now "một thiên điện".
2. j78.js j78who: act/"rv" lines printed the raw name of an unmet consort ("Đáp ứng Chu Lạc Anh thiện cảm +8 và nắm 0 chứng cứ…"). Unmet now "<tước> ???" (k61Mask).
After both: unmet-names-scan 4 runs, raw names gone in act/rv; page errors 0.

## Residue (not blocking, follow-up for the family; pre-existing, outside "lists")
- Bare-name log lines (e.g. j21:76 "<name> sang cung ngươi thăm hỏi.") leak the raw name: the j61 DOM mask only catches a name after a title. Candidate fix: route all log() texts naming a consort through j78who/kitName.
- j27 palName("r"+id) itself still returns "thiên điện của <raw name>" for the palace spots/visit result; only whyPal was masked.
- Per-person result rows "Quý phi ???: ghét ta hơn" remain (single masked person per row = kit mask, kit §4.x). Owner may still dislike a column of ??? rows; suggest owner decision.
