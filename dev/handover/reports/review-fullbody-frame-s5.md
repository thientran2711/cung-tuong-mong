PRIORITY #1 CHECK: brief line verified (OD 18/11 ~16:10Z, ~18:30Z (5)(6), ~18:40Z | review/fullbody-frame-s4 af700c81 | claims s5 session_01Rc5AsN3VydxRkMokeiihJw); no duplicate feature.
# Review fullbody-frame-s5 — review/fullbody-frame-s4 @ af700c81
Laws touched: 4 ONE CORE (cRef + bookFigBody in BAL; code fallbacks .131 only mirror BAL), 9 KIT FIRST (one KIT_SIZE.fig, one cRef), 10 frame size, 11 whole group, 12 two devices. No break found.
Final merge: origin/main = 94d1162 is already an ancestor of af700c81 -> nothing newer to merge; assemble.py leaves index.html unchanged (built files current). No push needed.
(a) figure-head-fade-scan (real build, Fold 755x1000@2 + iPad 1180x820@2, cases hoang-hau, 3 other hh, widest-robe, crown-tallest, man, old-maid-wide, SELF; kinds news/choice/pdlg/shop/idcard): ALL OK; name over figure 0.0 px everywhere; cut at frame 0.0 everywhere; crown top below frame top >= 88 px. Looked at Fold choice + pdlg crown-tallest, iPad choice crown-tallest, Fold/iPad idcard.
(b) iPad Thân phận figure = book body (534, BAL.bookFigBody.kv2); looked, same scale as the book.
(c) Phone Luân hồi card: figure small left, long panel right = the approved 16:10Z layout; looked.
(d) Robe overflow: head offset 8.7 (iPad choice) / 20.4 (Fold pdlg) px only for the widest robes, kept inside the frame (kitFullFigX limited by frame left edge). Nothing clipped, nothing touches the screen edge (Fold choice robe ~7 px inside the frame border). JUDGED NOT A FAIL; owner may still see it as tight on the Fold.
(e) QUICKCHECK PASS (open 1490 ms 0 errors, old save loads + plays a buổi, perf new/live render 224/224, tab 408/374, buổi 980/995); time-spill PASS; coregates G1 G2 G3 + G4 hooks 5 (incl. 70-manifest-guard) PASS (200 s).
Shots (scratch only, not in git); handover shots dir deleted.
PASS LAND READY af700c81 (FF from 94d1162)

## RE-REVIEW S5b/S5c/S5d (for MAIN ROOT-55) — checked a06ca1d = review/fullbody-frame-s4 7943eebe (KIT 56.11) + merge origin/main 13bb8c88 (rebuilt; only index.html/sw.js conflicted). NOT pushed: branch tip moved to 579fac03 (KIT 56.12) while I reviewed.
PRIORITY #1 CHECK: brief from ROOT-55 (OD 18/11 ~20:25Z); same scans reused, no duplicate.
quickcheck PASS (open 1493 ms, old save ok, perf render 248/237, tab 407/411, buổi 1243/1070); core gates PASS incl. G4 hooks 5; idcard scan ALL OK (8 cases x Fold 755x1000@2 + iPad 1180x820@2: name over figure 0, cut 0, cues 0; Fold crown headroom 139-196 px, iPad 108-156 px).
LOOKED: Fold hoang-hau + crown-tallest (figure Tuần-lục size, whole, 8 long-row tiles, no scroll), iPad crown-tallest + hoang-hau (book body, no «Kéo xuống»).
Flag for ROOT-55/owner: Fold crown-tallest (maid-m50 pink gown) hem is ~1.5 CSS px from the screen's left edge — complete, unclipped, head off-centre 16.9 px. Not a cut; judge if too tight.
Branch tip 579fac03 (S5e, KIT 56.12 XL3 393, scan columns) is NOT reviewed; verdict applies to a06ca1d only.
