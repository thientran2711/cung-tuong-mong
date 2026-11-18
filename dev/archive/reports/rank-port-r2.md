# rank-port-r2 — D36 Bảng vàng, fix of review-rank-port-r1 FAIL

Branch review/rank-port-r2 @ d8636053825328b97320bc08a297c18f966cbeed (= review/rank-port-r1 0178141c + latest origin/main ee5d33de, assemble order kept: jnight, score.js, jrank, jtut; site rebuilt).

## FAIL items → result
1. Rules pop-up → DONE: `kitModal({kind:"rule"})` = the one kpanel T1 PANEL (kitRows / kitTiles / .kpnote). Deleted .krk-pop/.krk-card/.krk-ch/.krk-cb/.krk-lead/.krk-ex.
2. Ranked-list row (rank · face · name · 2 columns · score, header, own-row highlight) → NOT convertible: kitRows/kitTable (§51) are 2-cell label|value grids, no face, no 5-column row, no own-row state. Left as is, marked PRIVATE in the CSS → KIT REQUEST A.
3. "Ta" chip → DONE: `kitChip("Ta","n")` (kitPodiumTag tags a modal with a podium, kitMeMark is a painted emblem over a figure: neither is a row chip). Deleted .krk-you.
4. Body blocks / buttons → DONE where a kit part exists: name-edit and recovery-code views are now T1 PANELS (kitInput + .kpnote + .kbtn); empty/loading = kitEmpty; error line = .kpnote; deleted .krk-name/.krk-code/.krk-nb/.krk-msg/.krk-note/.krk-end CSS/.krk-eb and the .krk-btns / footer size + gradient overrides (kit .kbtn sizes only). Own-life footer strip (.krk-me, .krk-ft) has no kit part → KIT REQUEST B.
5. Header + sub-tabs → DONE: plain kit .kph + kit-x, plain kit .ksub (gold .ksubb.on override and header padding/size overrides deleted). Only layout left: `.kph{position:relative}` (anchor for kit-x), tab margins.
Layering only: `#modal.krkp{z-index:9100}` so the kit panels open above the board (board is z 8990, #modal 55).

## KIT REQUESTS (for the kit keeper)
A. kitRankList / kitRankRow: frame + header row + row = rank number · kit face (md sm) · name (+ kit "Ta" chip) + small second line · 2 value columns · score (number + small unit); own-row highlight state; phone layout (second columns fold into the second line, header hidden); gold top-3 rank numerals. Data: {rank, face html, name, sub, cols:[a,b], score, unit, mine}.
B. kitRankFoot: own-life strip under a list (small label line "Ta trên bảng · hạng N trên M", one kitRankRow with mine, small queue note) + a button row.
C. (nice to have) kitFormBlock: label + kitInput + note + message line + button as one T1 block (name edit, recovery code); today composed inside a T1 section from existing parts.
D. (observation) the kit adds a picture slot to kind "rule"/"info" panels (tea set / cloth). Fine, but a form panel (name, code) might prefer none.

## Extra fix (not asked, small)
Kit panels opened from the title screen, before any life exists (S undefined), threw in `closeModal` (reads S.dead) and stayed on screen. jrank wraps closeModal: if no S, shift the queue by hand. Same latent bug exists for any other pre-life kit panel (coordinator may want a core fix).

## Tests (my build, local Worker stand-in, local http server, fresh rank server per run)
rank-e2e (dev/test/rank-e2e.js, updated for the kit panels): 755x1000@2 ALL OK (49 ok), 1000x755@1 ALL OK (49 ok). 1180x820@2, 1366x1024@2, 844x390@2: 48 ok, only FAIL "no page errors" = Chromium console "blocked by CORS" for background preloads from the CDN img worker (localhost origin; not product, appears before this branch's code runs; no pageerror). Old save loads and gets a guest id: ok at all sizes. 390x844 rotate prompt not re-run (screen logic untouched; r1 reviewer saw it OK).
kit-conform scan 755x1000: CONFORMS 84, MISSING 15, MIXED 0, CUSTOM 0, floats none (scan does not open the Bảng vàng panels itself; rank-e2e covers them).
Screenshots looked at: 755x1000 rules / rename, 844x390 rules, 1366x1024 recovery code, board. Seen OK: kit frame, kit ✕, no overflow. Board list/footer unchanged (private, KIT REQUEST A/B).

Product note unchanged from r1: recovery code shown automatically once, re-readable by the "Mã khôi phục" button.

SẴN SÀNG KIỂM d8636053825328b97320bc08a297c18f966cbeed
