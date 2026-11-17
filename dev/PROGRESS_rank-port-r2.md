# PROGRESS rank-port-r2 (D36 Bảng vàng, fix of reviewer FAIL review-rank-port-r1)

Branch review/rank-port-r2 = review/rank-port-r1 @ 0178141c + latest origin/main (assemble order jnight, score.js, jrank, jtut kept).

Done (dev/build/jrank.js):
1. Rules pop-up -> kitModal T1 PANEL (kind "rule"); deleted .krk-pop/.krk-card/.krk-ch/.krk-cb/.krk-lead/.krk-ex.
2. "Ta" chip -> kitChip("Ta","n"); deleted .krk-you. (kitPodiumTag/kitMeMark are not row chips.)
3. Name-edit and recovery-code views -> kitModal T1 PANEL with kitInput + .kpnote + .kbtn; deleted .krk-name/.krk-code/.krk-nb/.krk-msg. Empty/loading -> kitEmpty, error line -> .kpnote; deleted .krk-note.
4. Header = plain kit .kph + kit-x, tabs = plain kit .ksub (no gold override); button size overrides and footer gradient deleted (.krk-btns, .krk-eb, .krk-end CSS, .krk-ft gradient).
5. closeModal guard: kit panels opened from the title screen (S undefined) no longer throw in closeModal.
Left private, KIT REQUEST (see reports/rank-port-r2.md): ranked list frame+row+header+own-row highlight (.krk-list/.krk-row/.krk-hd/.krk-mine), own-life footer strip (.krk-me/.krk-ft).
Tests: dev/test/rank-e2e.js updated for the kit panels.
