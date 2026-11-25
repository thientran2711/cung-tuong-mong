# co-ngu-seals — KIT review (review/co-ngu-seals newest 73fe03b9, MAIN 136 order)
PRIORITY #1 CHECK ('co-ngu-seals'): OD 25/11 ~07:40Z cổ ngữ pass | main 0 | review/* 1 | claims KK/worker.

## REVIEW r1 (sonnet kit reviewer, 11/25/2026 ~10:00Z) — head 73fe03b9 (r1 4406fe66 + r2 363522b2 + r3 73fe03b9; contains newest LIVE 9f72524b) — KIT FAIL (1 wording row)
Scope: 30 files, wording only + KP_SEAL table (j79) + KSZ3_NAME now reads KP_SEAL (jksize) + the 2 kit-size compose scripts. No logic change.
Checks:
- Built: fresh build_site.sh on the branch = committed index.html except the CTM_BI stamp (363522b2+ vs 73fe03b9; normal) → content is rebuilt.
- Seal fit (law 11, every KP_SEAL kind × Fold 755x1000 / iPad 1180x820 / 390x844, real kpHeader in a --kpw frame, long title): all 18 seals one line 20 px high, no wrap, no overlap with the title, none outside the frame; widest PHONG THANH 105 px, CANH KHUYA 95, ÂN THƯỞNG 89, VẬT CHỨNG 87 (LIVE widest 97). KSZ3_NAME keeps «week» (KP_SEAL has TUẦN) so the sheet loses nothing.
- Tests on head vs LIVE 9f72524b (bare = merged, branch already contains LIVE): title-stale-sel ALL PASS both; hoa-dien ALL OK both; tut-replay FAILS the same on LIVE (harness «no replay button», pre-existing); tutorial.js 1 fail line on both (pre-existing). dialog-stack-scan.js still uses «Thang cơ hội» as its own probe text (harmless).
- quickcheck alone on head: QUICKCHECK PASS 241 s (render 262/253, tab 592/559, buổi 1700/3439, tasks>200ms 23/28, old save ok).
FAIL row (law 7 / VANPHONG §3 + row «Chờ»): 
1. jload-area line (the kpnote in the cellular-data warning, in the diff of the commit «dữ liệu→mạng»): `Máy đang dùng mạng di động hoặc chế độ tiết kiệm mạng. Nên đợi có Wi-Fi rồi hãy tải.` — «dữ liệu» (banned, VANPHONG §3) was replaced by «mạng», which is ALSO banned (VANPHONG waiting-lines row: the network = «đường xa»; banned: tải, kết nối, mạng, server, …). «tiết kiệm mạng» also lost its meaning (data saver) and «Wi-Fi»/«tải» remain. Fix at the source in the owner's own words (đường xa / mở lại), e.g. «Máy đang đi đường xa hẹp (mạng di động hoặc chế độ tiết kiệm). Nên đợi đường xa thông rồi hãy mở lại.» — worker decides wording per VANPHONG; show it to the owner only if it is a new term.
Non-blocking notes: j8.js:554 still pushes the modal title «Kiểm tra đồ» (j84 VP patches it to «Soát» on screen, source not fixed); remaining banned words in dev/build source counted on head: Chỉ số 4 / chỉ số 10, Kiểm tra 5, cơ hội 3, dữ liệu 4, xét nghiệm 3 — most are comments / j84 VP maps / unseen strings; a family scan table of which ones the player can see would settle it.
Verdict: KIT FAIL review/co-ngu-seals 73fe03b9 → fix row 1 → r4 (text-only, quick re-review: grep + quickcheck).
