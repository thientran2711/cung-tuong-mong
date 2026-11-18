PRIORITY #1 CHECK (reviewer): OD 0 | claims kit-subtabs-overflow | review/kit-subtabs-overflow 9366028 | main 13bb8c88 is ancestor (no merge needed)

# REVIEW verdict — PASS 9366028
18 LAWS touched: 9 (kit first) OK; 10 (fixed tab size per tier, wrap not shrink) OK; 11 (whole group via one `.ktsub` rule) OK; 12 (Fold + iPad looked) OK; 4/6/7 untouched (CSS only, no new wording except kit sample title).
(1) kit-only: jtabs.js rule + KIT.md §46 + sample §46.1 + KIT_REQUESTS; no per-screen variant. index.html diff = only that rule, sample, BUILD id.
(2) Reran dev/test/subtabs-overflow.js myself, fold/ipadAir/ipadPro/pixel/iphone14: all bars (Tài nghệ, Mệnh truyện 5 + simulated 6, Việc nhờ, Ân oán relx/rely, kit samples) overflow n, overlap n, no page h-scroll; tab widths unchanged (70-88 Mệnh truyện). PASS.
(3) Other chip rows (.kcattabs filters, Tư trang kinds, kcattabs w/o .ktsub) not selected by the rule. jhc.js:250 .krelpk rule now loses overflow-x to !important (3 short tabs, no effect).
(5) LOOKED story6 on Fold 755x1000 (6 tabs one row, ⓘ right) and iPad (tabs one row, ⓘ right-aligned below), art iPad (4 tabs + ⓘ one row). Clean.
NOT rerun: full quickcheck (CSS-only; worker reported PASS 306 s). Scratch shots in /tmp only, nothing on CDN.
