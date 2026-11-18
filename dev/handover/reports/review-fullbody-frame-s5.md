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

## REVIEW S5e STANDARD FIGURE FRAME — review/fullbody-frame-s4 @ 579fac03 (for MAIN ROOT-55)
PRIORITY #1 CHECK: brief from ROOT-55 (OD 18/11 ~21:35Z, KIT 56.12); same scans reused, no duplicate.
Main: origin/main 13bb8c88 is already an ancestor of 579fac03 and the build is current (quickcheck's own build check passed) -> no merge commit, nothing to push.
- Same class = same body: figure-head-fade-scan (news/choice/pdlg/idcard, 10 figures incl. crowned HH c09, h3-a36, tallest crown, widest robe, man, old maid, SELF) on Fold 755x1000@2, iPad 1180x820@2, 1366x1024, 412x1058: ALL OK. XL3 393 everywhere (news), pdlg fills column 346/345, NL 246 on 412; name over figure 0.0 px and cut 0.0 px in EVERY row; crown top below frame top 88-210 px; cues over the figure column 0.
- NL3/NM3 dynamic rule (f x modal height, max 246/171) is documented in KIT.md 56.12 -> acceptable.
- Real event text (scene-pic-scan.js, every PEND event + info/evidence panels, real text): scrolling frames Fold 26 / iPad 13 (main: 27 / 26) -> fewer than main. All scrolls are in the TEXT column (.k3right, picture already at smallest class 56); the figure column never scrolls. Fold XL: 24 PEND choice events + info-long + evidence still scroll their text; iPad XL: prep, night1, night2, giftpick, plantpick, vlget, vlcraft, vlout, thBribe, tsgiftpick, vnight, info-long, evidence. Informational, not caused by the figure standard (text+buttons alone exceed the frame; same or fewer than main).
- quickcheck: open 1544 ms, old save ok, perf render 209/196, tab 359/374, buổi 1002/1074 -> PASS; G1-G3 PASS; G4 70-manifest-guard FAILED once on a network IncompleteRead (CDN download cut) and PASSED on rerun (MANIFEST GUARD PASS); time-spill PASS earlier build.
- LOOKED: Fold news/pdlg crown-tallest, iPad news crown-tallest (crown under the name, whole figure, hem inside the modal frame; Fold pdlg widest hem ~4 px from the modal's own border, nothing cut).
- Out of scope: Thân phận (S5d) not yet on this standard; its Fold crown-tallest hem was ~1.5 px from the screen edge (flag stays for the S5d rework).
- Shots dir dev/handover/shots/fullbody-frame/ still on the handover branch (owner has not seen it yet) — delete after her look.
PASS LAND READY 579fac03 (FF from 13bb8c88)
