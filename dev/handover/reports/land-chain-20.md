# LC20 — lander log (successor of LC19; coordinator MAIN 152 session_01V1ZZH3STSxwbKbhhjWkVhD)
PRIORITY #1 CHECK ('land-chain'): continuing LC19's chain (land-chain-19.md «## LC19 HANDOVER») — nothing rebuilt.
depth 1 · START_CTX ~5% (context_usage read 0; estimate) · roll at 30%, ceiling 60%.
STATE at start: LIVE f009e1a6, ROLLBACK 5e013076.

## Staged (no push to main)
- OB-KIEP: review/lc20-ob 02f564ae = merge 87bc8942 onto f009e1a6 (only index.html/sw.js/assets.json conflicted → rebuilt). CHANGE line = LC20 draft (MAIN may replace): «Màn «Thân phận kiếp này»: điều được, điều mất xếp mỗi điều một dòng; ấn cảm xúc không còn nhảy lên mặt người khi đang chọn.» Gates: running (gates8 chain + kit-ef-unit, kit-e-rows, kit-cost-rows-home, kit-gain-list-scan --fail, emoseal-nonplay-scan Fold+iPad --fail, QC alone last).
- a9 «A» HELD: review/lc20-a9 aa2a208a = f009e1a6 + c0f41387 (1 source conflict jtabs.js ktWorksHTML: kept crsProg course bar from balance-pace + LIVE's info data-v85tab) + 346da1ae (forgetSafe). CHANGE = MAIN 150 line. Gates not yet run (after OB-KIEP).

## 05:20Z — OB-KIEP READY, a9 re-stacked
- MAIN 152: standing go-live permission is in MAIN's chat → LC20 stages + gates, MAIN FF-pushes; LC20 never pushes main. GOs: #1 OB-KIEP, #2 a9 (sếp Q5 «A»), #3 kit-stage 006579ae (CHANGE «Khung sự kiện: …»; gates kit-stage, kit-hand, kit-pick, look-dedupe ×10, opt-frame-scroll-scan STG + chain), #4 srvmerit-guard-r2-rv 0bbb81fd (gates srvmerit-guard 47/47, coop-thin-b, coop-e2e + chain; CHANGE «Thẻ việc của người hầu …»).
- OB-KIEP 02f564ae: whole chain PASS (global-names 1 CLASH = LIVE; info-tap-audit flake, rerun alone PASS). READY TO PUSH sent.
- PRE-EXISTING HARNESS BREAKS on LIVE f009e1a6 (proven LIVE-vs-LIVE): (1) tainghe-info.js TypeError line 61 (q.ov undefined); (2) quickcheck perf «live build could not be measured»: all perf lives are now day lives (S.selx2) on both builds; quickcheck compares only NON-day live runs → null baseline. Manual medians OB vs live: render 231/223, tab 429/483, buổi 1416/1328, tasks>200 31/28 — within limits. Told MAIN.
- a9: review/lc20-a9 8446da67 = aa2a208a merged onto 02f564ae (only CHANGE/built files). Chain running (+promo-root, balance-pace).
- Tools in scratch: gates.sh (gates8 + OB gates), gates-a9.sh (+promo-root, balance-pace).

## 07:05Z — slots
- qc-daylife: review/lc20-qc bf6dd041 (on LIVE 02f564ae; tools only: quickcheck like-with-like perf classes + old-save step uses settleNew; CHANGE «(công cụ kiểm tra, không đổi game)»). QC LIVE-vs-LIVE PASS. READY TO PUSH sent to MAIN 154.
- a9: review/lc20-a9 6b5d3d05 (on bf6dd041) = c0f41387 + 346da1ae + j85 «Năm bậc» artNm(l+1) fix + promo-root test fix (quiet months + poetry off; 24/24 PASS). Gated as 42e1fd7f (tree differs only by tools + build line): chain PASS, QC PASS day vs day. READY TO PUSH sent.
- HOME-WAY: review/lc20-hw bdc3ee5b (on 6b5d3d05; built files only). CHANGE (MAIN 154 OK): «Nút «Về phòng · N khắc» (thanh trên, Dư đồ) đưa nàng về phòng; lỗi nhẹ chỉ khất bổng; hết khắc thì được đưa về, không bị phạt.» (CHANGE lines are cut at 140 chars by buildinfo.py one()). Chain running at handover (gates-hw.sh: + home-way fold/ipad, punish-weight-scan, promo-root, balance-pace; QC vs parent a9).
- srvmerit r2: review/lc20-sm c7f4fc0a staged on OLD a9 5a6ff285 → re-stack on the HOME-WAY/DRESS slot. Gates: srvmerit-guard, coop-thin-b + coop-e2e vs a local worker (gates-sm.sh) + chain + QC.

## LC20 HANDOVER (to LC21; MAIN 154 session_01V1ZZGzqRF5sRSbkTyuecDd opens it)
### STATE
LIVE = 02f564ae (OB-KIEP; verified byte-identical on the site, boot Fold+iPad 0 errors). ROLLBACK = f009e1a6. MAIN holds standing go-live permission in its own chat: lander stages + gates, sends «READY TO PUSH <sha> on <branch>, parent <sha>, gates …» to MAIN 154; MAIN FF-pushes. Lander never pushes main.
### QUEUE (MAIN 154 order)
1. qc slot bf6dd041 — READY sent. 2. a9 6b5d3d05 — READY sent. 3. HOME-WAY bdc3ee5b — gates running in LC20 (LC20 forwards the result to MAIN if it lives; else LC21 reruns gates-hw.sh). 4. DRESS review/mghelp-dress-r6 4f377603 (E95r BIG PASS; CHANGE line: ask MAIN). 5. srvmerit r2 0bbb81fd (CHANGE «Thẻ việc của người hầu không còn dùng thẻ cũ của kiếp trước/người khác: đổi người là chia lại thẻ.»). 6. kit-stage-r2 8d51d377 (KK38 session_01V1ZZH2wd7VqsCBPRaqKu7D; already merged onto 02f564ae, LOOK PASS 154; CHANGE «Khung sự kiện: luôn có tranh nơi chốn làm nền, hình người chỉ hiện khi đã vẽ xong, người nói đúng người (thái giám Nội vụ phủ), thẻ chọn có ✓/✕.»; gates kit-stage, kit-hand, kit-pick, kit-mapban, look-dedupe ×10, opt-frame-scroll-scan STG + chain). 7. NHV review/nhv-areas b48425a1 (carries kit-stage 006579ae; KK38: after r2 only assemble.py conflicts → r2's list + 'jnhv.js' after 'jkmapban.js'). C farshot/rankroom are already on main (dropped).
### KNOWN
- QC: ALWAYS run review/qc-daylife's quickcheck (or main's once bf6dd041 lands); older quickcheck FAILS «live build could not be measured» (all lives are day lives since SELSCENE) and old-save «Timeout 30000ms». buổi median is noisy (2 runs kept after an outlier drop → mean of 2); a single perf FAIL on buoiMs → rerun QC alone.
- tainghe-info.js TypeError line 61 (q.ov undefined) on LIVE too → KK37/KK38's TAINGHE r5; not a lander gate until fixed.
- global-names 1 CLASH = LIVE (kitDayName). info-tap-audit: occasional clipped sub-tab row (rerun alone).
- Stack recipe: worktree at parent slot, `git merge --no-commit --no-ff <sha>`, checkout --theirs index.html sw.js assets.json, write CHANGE.txt, build_site BEFORE commit (so the build line reads <parent>+), commit, push review/lc20-<slot>. Module-list conflicts in assemble.py: union (python snippet in this log's history: insert each new module after its predecessor).
- Tools: dev/handover/reports/lc20-tools/ (gates.sh = gates8 + OB-KIEP gates; gates-hw.sh; gates-sm.sh with local wrangler worker at /home/user/wt/wr — copy coop/worker there + npm install first; holog.sh). Edit SP= and the QC line (qc-daylife quickcheck path) for the new container.
- START_CTX ~5%, rolled at ~28% (context rule).

## 07:20Z — final
- MAIN 154 pushed bf6dd041 (qc slot) and 6b5d3d05 (a9). LIVE = 6b5d3d05 (site md5 = slot), ROLLBACK bf6dd041.
- HOME-WAY bdc3ee5b = FAULT: stage-stay.js «chip-odds» still wants the old «…lẻn vào, may rủi» wording; HOME-WAY's chip now says «nán lại quá giờ, bị bắt gặp thì Danh -8, bị cảnh cáo; may rủi: Có cơ.» → HOME-WAY worker updates the test; LC21 reruns gates-hw.sh (rest of the chain was not finished). a9 post-push buổi A/B not run (LC21).
- LC20 stopped; LC21 = session_01V1ZZH3pV1ng9hG9pEgF3yY.
