# dialog-person-3 — report (sonnet worker for Foreman B ROOT-5; owner mark #73 + eye checks)
PRIORITY #1 CHECK: OD 21/11 05:07Z (#73 verbatim: "left figure has a big round portrait medallion beside it … remove too") | main 666def0c: r86 NOT in main, merged here | review/mood-seal: picture-corner mark (§28.19b, X.mk) already in main, reused | CLAIMS: #76 stays with kit-dialog-2, not touched.
START_CTX ~8%.
Tests: dialog-person-scan PASS Fold+iPad (526/441 frames); quickcheck PASS (1st run perf noise, 2nd PASS 192 s); coop-e2e 92/92 (the r86 2 FAILs are gone); old save ok.
## Branch
review/dialog-person-3 = review/dialog-person-r86 2b8b3efd + merge of main 666def0c (conflict only jksize.js: kept r86 subject rule + main's `mk` mark) + fixes below.
## Fixes
1. #73 round medallion = the stage head seal (`img.kfseal`, emo-m-binh) that `kszFigHtml` figures got in dialogs → filtered out for every `#modal .dlg` figure (jfigseal `kfsFigs`); stage + book pages unchanged; mood events keep the seal on the picture corner (#39/#68).
2. REGRESSION found in r86 R2 (visible in the first shot): `.kfav-off` hid the line avatar but the row grid kept its 34px column, so the line text was squeezed into a 1-char-wide column (Nghe lén sau hòn giả sơn). Fix: `.kfav-off` = one column (jksize CSS). Whole group = every avatar-off row.
3. KIT.md bullet; tests dp3-look.js / dp3-sweep-look.js (shots to scratch only).
## Eyes (Fold 755x1000 + iPad 1180x820, looked 3x)
Nghe lén sau hòn giả sơn (before: medallion + squeezed text; after: clean, both devices), Thái hậu (ch1), Hoàng thượng lật thẻ (ksp), Thư nhà (tt1 with «(ta)»): one picture per person, no line avatar. NOT reached: tsbFirst (needs a grudge), Hắt nước, Thất tịch contest, Chủ thưởng, Bị bắt (not PEND dialogs; need natural play) — list for the next eye pass.
OBSERVATION (not mine, mood-seal): in ksp the stage seal of her own figure leans big over the dialog picture, covering the first words («Tối nay…»). Foreman B → mood-seal owner.
