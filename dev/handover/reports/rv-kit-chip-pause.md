# rv-kit-chip-pause — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (21/11 ~06:30Z badge canon: ✓ / «…», no long text), rv hao-huu note N4 (⏸ unreadable at 10 px), rv-kit-badge round 2 (⏸ = two 3x10 CSS bars), KIT.md §77b; K-CHIP-PAUSE reuses the §77b bars (.kpzb), no new chip.

Branch: review/kit-chip-pause-rv = keeper#2 8d624b8a (stacked on review/hao-huu f21bd515, NOT yet in LIVE at gate time) + LIVE 94cbe0cd (assemble.py list union: main's jkslide/jtamco/jgenpc/jmgx/jkcg/jkcco/jroad8 + hao-huu's jhaohuu; KIT_REQUESTS.md both; index/sw rebuilt; contains newest LIVE), sha 33661a109bd8f2b95d429276179ba4646cd9b549. LANDING ORDER: hao-huu first (reviewed separately), then this — landing this alone also lands hao-huu's unreviewed-by-me code.

Change (jcooptimer.js / jrail.js, 22 lines): the ⏸ font glyph in kit chip/row text → <i class="kpzb"> = the badge's two CSS bars (3x10, currentColor) in the friend clock chip («pz») and in FST hold (status chip, panel row, now-rows). Scan: 3 text glyphs before → 0 visible after (the badge's own <b.kbdg.pause> keeps a hidden zero-size ⏸ text node under font-size 0; the bars are CSS).
Checks: kit-chip-pause.js PASS Fold + iPad (bars 3px x 10px on every instance, chip text not cut); kit-badge.js PASS; looked at Fold + iPad chip shots: clock chip «▮▮ 1:05» amber, panel row «▮▮ xin tạm dừng chốc lát», badge ⏸ bars clear; whole group: grep of j*.js — no other visible ⏸ left (comments only). coop-e2e 94/94. QUICKCHECK PASS 315 s (render 266/301, tab 589/530, buổi 2137/1690, core gates PASS, old save ok). No stray images.
