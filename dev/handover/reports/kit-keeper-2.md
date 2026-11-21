# KIT KEEPER #2 (session_01Rc5AsMF9SLrWM4NQM9zGGz) — report
START_CTX ~8 % (estimate). Successor of kit-keeper-1 (MtjP). Coordinator MAIN CHÍNH 92 session_01Rc5AsMUHiJKCMiCjnzdhii.
- 21/11: kit-focus round 2 pushed review/kit-focus d3f02bcc → SSK rv MSxp (details in reports/kit-focus.md ROUND 2).
- 21/11: K-CHIP-PAUSE (MAIN 92, low prio) → `review/kit-chip-pause` 8d624b8a, based on review/hao-huu f21bd515 (the «⏸ m:ss» clock chip exists only there; hao-huu already carries kit-badge). PRIORITY #1 CHECK: OD L742/L1035/L1061 (pause button + friend chip spec, no glyph rule) | main: FST hold ⏸ (jcooptimer.js:228) | review/hao-huu jcooptimer.js:240 «⏸ » prefix, kit-badge jrail.js badge bars | claims none.
  Family scan (`git grep ⏸` dev/build, rendered strings): before = 3 text glyphs (friend clock chip pz, FST hold → status chip, panel row, jhaohuu now-rows) + §77b badge (already CSS bars, glyph at font-size 0); after = 0 text glyphs, all show `.kpzb` (two CSS bars 3x10, currentColor; new kit class in jrail.js next to the badge bars). KIT §77b note.
  Test `node dev/test/kit-chip-pause.js` Fold + iPad PASS (no ⏸ text, bars 3x10, chips not cut); kit-badge.js PASS; quickcheck PASS. Shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-chip-pause/755x1000-chip.png · 1180x820-chip.png. Merge order: land after hao-huu (or hao-huu merges this branch).
- 21/11: kit-focus r3 b0a8eb4b (sub-line price never cut) + kit-chip-pause 8d624b8a SSK to rv MSxp. Context ~12 % of 1M (depth 4). Next: rv law-4 follow-up (rv-kit-opt-kem.md «Sủng +N» literals).
- 21/11: K-OPT-SG (rv-kit-opt-kem.md law-4 follow-up) → `review/kit-opt-sg` 64b61d37 (from LIVE). PRIORITY #1 CHECK: rv-kit-opt-kem.md lines 15-18 | main jaudit.js item 15 (act cards only), j1.js sg/apply/fmt | review/* none | claims none.
  New module dev/build/joptsg.js (last in assemble list): optLine + dilLine rewrite ONLY the option's x text through sg() (her Sủng = a «Sủng ±N» that starts a clause: start / after · , : ; ( ); x restored after the call; fmt(w/fx) already sg'd, never twice; «nàng Sủng», «<name> Sủng» untouched.
  Family scan (x literals with her Sủng, 31 option lines): all apply through apply() or ap(S,…) → sg (j7 ×10, j31 ×6, j54 ×2, j71 ×2, j8 ×2, j34 sabotage→ap, jact, jgift ×3 (ap/j8 emp gift), jkcco, jpet, jworld ×4, jworld2 ×2). Before: nóng nảy Emperor j7 «Tự trình» shown +4 / applied +5 (rv probe); after: shown 5 = applied 5. Traits none / nóng nảy / lạnh lùng × v +4/−3/+3/−2: shown == sg(v) on both line kinds.
  Test `node dev/test/kit-opt-sg.js <url> <out>` PASS; quickcheck PASS. Side note (not fixed, separate law-4 item): j34.js:32 «Sủng -8» / «Danh -6» typed as literals instead of BAL.eff.j34.sungSabotage/danhSabotage.
- 21/11: kit-focus r4 0f6c758a (j59.js exports j59tagHTML/j59col/j59fac — plate showed «Người lạ» for everyone in the real game, fac always 1; found by duodo-focus #2; test asserts plate == stage tag). SSK re-sent.
- 21/11: K-OPT-SG: MAIN 92 says the law-4 family is ORDERED to Foreman D → I stopped; branch review/kit-opt-sg 64b61d37 already built + SSK'd before the order — MAIN to point Foreman D at it (reuse) or have me withdraw.
- 21/11: KIT-INFO-TAP (old keeper leftover) → `review/kit-info-tap` 5466b126 (from LIVE). PRIORITY #1 CHECK: KIT §6.3h (OD 21/11 ~05:15Z #86 option A), kit-keeper-1 leftovers | main jk4.js kitInfoOneLine (.pc .pcf .kr only) | review/* none | claims none.
  Finding: the Hoàng tự / Quý tộc person cards keep their info rows in the card BODY kit rows (`.pc .pcb > .kb.kpkb > .kr`: Tuổi · Thứ bậc · Tước vị · Nuôi dạy · Sức khỏe), not in `.pcf` → §6.3h never applied there (long «Nuôi dạy» row wrapped, test SKIPPED those hosts). Fix (law 11): kitInfoOneLine + its CSS (nowrap/…/«!» position, dialog ✕ lane) also cover `.pc .pcb>.kb.kpkb>.kr>.krv`; `.kpkb` outside a person card (panels) untouched.
  Test kit-info-tap.js: selector = kit selector; taps the «!» of the row it filled (marked data-k1t — another naturally long row now has its own «!»); seeds marriage-age kids for Kế vị / Hôn sự / Quý tộc; screenshot on SKIP. Before/after: tab-kin SKIP → PASS (Fold + iPad); pop-maid/elder, rv, court, staff PASS as before; kvo/hon/qt SKIP = those cards have NO info rows (note only, shot 755x1000-tab-hon-skip.jpg). pop-elder / pop-maid occasionally SKIP on one viewport (harness race, known). quickcheck PASS; coop-e2e 92/92.
  Shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-info-tap/755x1000-tab-kin.jpg · 1180x820-tab-kin.jpg · 755x1000-tab-hon-skip.jpg · 755x1000-pop-maid.jpg
- 21/11 ~11:00-12:00Z (coordinator now MAIN CHÍNH 93 session_01Rc5AsKcbi9rTmDK4pY2SeT): rv PASS kit-focus r3/r4, kit-chip-pause (33661a10, land after hao-huu), kit-info-tap (c5bbde7e). kit-opt-sg: NOT landing alone — Foreman D sg-card r2 absorbs it (MAIN 10:36Z).
  - kit-mark-fix-r3 99f1e576 (MAIN priority): re-merge of rv kit-mark-fix-rv3 db138921 onto LIVE ba9b6243; jk4.js observer conflict → kept kit-mark-fix side (superset of LIVE), KIT.md §6.3i/§6.3j kept. kit-mark-fix.js PASS (230/209), LIVE kit-info-tap PASS, QC PASS, coop-e2e 94/94 → SSK.
  - kit-ef-unit 9fd26c14 (KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): stat item in a card row = one nowrap unit (.kef1, kaUnit). kit-ef-unit.js PASS, coop 92/92 → SSK.
  - kit-g4-plate 03181881 (MAIN 93 top priority): LIVE G4 80-dialog-fixed #54 is a RACE, not a landing (fails on every LIVE sha back to 35232176 under load); kitDhCap now also re-run by one #modal MutationObserver. 6 parallel runs: before 6/6 FAIL, after 6/6 PASS; QC PASS → SSK.
  - kit-focus r5 da873b4b (duodo: 2-cost ton clipped on Fold): each ton cost its own nowrap part; 3-line sub drops title to 1 line. kit-focus.js PASS, QC PASS → SSK.
  KIT_REQUESTS rows: «quý nhau» (E22t) and econ-tamco ton row = already on LIVE (close); place-nth/pd glyphs = art → Foreman C; OPEN for me: rel-men-servants kitRelRows, «khi thành» tag on §6.2b Được (next).

# HANDOVER — KIT KEEPER #2 (session_01Rc5AsMF9SLrWM4NQM9zGGz, depth 4) → KIT KEEPER #3 (written 21/11 ~12:15Z at ~33 % context = START ~8 % + 25 %)
Coordinator: MAIN CHÍNH 93 session_01Rc5AsKcbi9rTmDK4pY2SeT (opens the successor). Kit reviewer: rv MSxp session_01Rc5AsMSxpxbsAMRSE5oWrq.
Role/rules: unchanged from kit-keeper-1 HANDOVER (top of this file's sibling reports/kit-keeper-1.md): review/<topic> from newest LIVE, tests Fold 755x1000 + iPad 1180x820, LOOK at shots, shots on CDN img/_review/<topic> (cdn_sync.py <dir>, never git), KIT.md note, quickcheck (+ coop-e2e for layout), SSK to rv + MAIN. Never push main, no PR.
Practical: worktrees /home/user/wt/hand2 (handover, sparse), /home/user/wt/kmf (kit-mark-fix-r3), /home/user/wt/kf (kit-focus); test servers: python3 -m http.server 8778 in /tmp/pcs/www (+8779 www2, 8780 www3); copy index.html there. Harness overlays to hide in shots: `#kload,#klife,.modal.kload,#modal.kptitle,.kroul,#kroulw,#curtain,#buoitr,.kmov`. quickcheck can leave index.html build-stamp diffs (commit them) and _aa.html (transient). LIVE G4 dialog-fixed #54 is a race (fixed on kit-g4-plate) — until it lands, a G4 #54 FAIL on any branch is not that branch's fault (verify on plain origin/main index.html).

## My branches (state at handover)
| topic | branch @ sha | state |
|---|---|---|
| kit-focus | review/kit-focus r4 0f6c758a PASS (LAND READY); r5 da873b4b (2-cost ton sub-line, duodo) | r5 SSK sent, waiting |
| kit-chip-pause | review/kit-chip-pause 8d624b8a | rv PASS (33661a10), land AFTER hao-huu |
| kit-info-tap | review/kit-info-tap 5466b126 | rv PASS (c5bbde7e), LAND READY |
| kit-opt-sg | review/kit-opt-sg 64b61d37 | NOT landing alone: Foreman D sg-card r2 absorbs it; nothing to do |
| kit-mark-fix-r3 | review/kit-mark-fix-r3 99f1e576 | SSK sent (QC PASS, coop 94/94), waiting |
| kit-ef-unit | review/kit-ef-unit 9fd26c14 | SSK sent, waiting |
| kit-g4-plate | review/kit-g4-plate 03181881 | SSK sent (MAIN 93 top priority: unblocks every land), waiting |
| kit-win-pay | review/kit-win-pay 0e6fe923 | SSK sent, waiting |
## Queue for #3
1. Handle any rv FAIL on the 5 waiting topics above (kit-focus r5, kit-mark-fix-r3, kit-ef-unit, kit-g4-plate, kit-win-pay). After LIVE lands: CLAIMS LANDED + `python3 dev/site/cdn_sync.py --wipe-review <topic>`.
2. KIT_REQUESTS OPEN row «REVIEW rel-men-servants r1 — KIT §52 kitRelRows(p)» (men / servants get two «Thiện cảm» numbers; asked mapping in the row). PRIORITY #1 first: check whether review/rel-men-servants landed and whether Foreman B already took it.
3. KIT_REQUESTS row place-nth / place-pd glyphs = ART → Foreman C (not the keeper); old 15/11 rows marked «in progress» look stale — ask MAIN before touching.
4. Side note for the owner of j34: «Sủng -8 / Danh -6» literals in j34.js:32 (should read BAL.eff.j34.*Sabotage) — reported to MAIN 92.
FOR MAIN: keeper #2 stops here (worker rollover rule); please open KIT KEEPER #3 with this HANDOVER.
