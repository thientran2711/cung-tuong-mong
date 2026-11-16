PASS 727b6112b330eb8b96e621b0368f5cacccd1788f

Branch review/coop-invite-ux-r1 (origin/main is an ancestor, fast-forwardable). Merged review/coop-invite-ux, rebuilt index/sw/assets with assemble.py + build_site.sh.
- coop-invite-ux.js ALL OK (4 viewports + 2nd browser join); coop-e2e 59/59 (includes single-player + old save load); panel-size 3 viewports, errs 0.
- Screenshots at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: no horizontal overflow, no page errors, no cut text (844x390 body scrolls as other kit panels).
- Kit: kitCoopSteps registered (KIT.md §69.3, sample on kit page "§69"), built only from kitRows/kitRowsJoin, no private CSS; step rows look identical to the Ám hiệu / Hảo hữu rows.
- VANPHONG: cổ trang, no %, vocabulary Ám hiệu / hảo hữu / Cùng hảo hữu respected.
- Minor, not blocking: at 390 wide the live row grows from "… đang đợi" to "… đang đợi hảo hữu vào phòng · m:ss" on the first tick and wraps to two lines (one reflow). Optional follow-up: use the same text at render time.
