# tinh-net-word (MAIN 89, mark-verify #4 note)
PRIORITY #1 CHECK: OD 2124 (uses «Tính cách» as an EXAMPLE row label in the trait-word rule) + VANPHONG nết = the traits | main jpcf.js:39 | review/* none | claims none
Cause: jpcf.js pcfBlocks wrote the Hoàng thượng / Chí tôn trait row with label «Tính cách»; every other person card (Thái hậu, her own, rivals, kids, maid) uses «Tính nết». Majority 8 vs 6 occurrences in code; VANPHONG calls them nết («Tính tình / Lòng dạ / Chí hướng» are the three nết GROUP names, a different thing, untouched).
Fix: the one player-visible label → «Tính nết» (jpcf.js row + kit sample §73.2 row + its title; comments j79/jpcf; KIT.md §73.2 line). OD 2124's example text still says «Tính cách» — main owns OD: please correct that line.
Scan dev/test/tinh-net-scan.js (Emperor card, Thái hậu card, her own card, stage pop-up cards of the people at home, kit sample §73.2: every trait-row label): before 1 of 3 labels «Tính cách» (Emperor card), after 0 «Tính cách» (all «Tính nết»), Fold + iPad, 0 page errors. Shot looked (Fold, Emperor card: TÍNH NẾT).
Limit: label scan covers the cards reachable here; other person kinds only show the label when they have known traits.
Base: LIVE 922b36b4 (hoangthuong-gold not landed yet; different lines, merges clean).
