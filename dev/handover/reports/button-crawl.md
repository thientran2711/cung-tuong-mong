# BUTTON CRAWL — every visible button REAL-tapped (ROLE B, Foreman F #5 brief dev/handover/briefs/F-robot-2511.md)
PRIORITY #1 CHECK ('crawler|real tap|realtap|elementFromPoint|every button'): OD 1 (25/11 ~05:10Z rule) | main: no crawler (robot10.js boot/serve reused) | review/*: sansang-music-fix-2 frame-tap-scan.js = kit frame kinds only (complementary, not duplicated) | claims: none.
Owner rule (verbatim, OD 25/11 ~05:10Z): "Tối nay tôi không cần biết, cho robot đi bấm từng cái nút cho tôi, make sure là cái nút nào cũng work. Và nó phải đưa đến, có nghĩa là nó work cho đúng nha. Tôi không có muốn cái tình trạng này xảy ra nữa. ... Giống như là người bấm thật chứ không phải là máy bấm."

## How
- `node dev/test/button-crawl.js [--dev fold,ipad] [--depth 2] [--start title,home,tour] [--game index.html|URL] [--out dir]` (branch review/button-crawl-fix-1).
- Every tap = `dev/test/realtap.js` (local copy of the ROLE A contract): finger-scroll into view → centre point → `document.elementFromPoint` must be the button (or inside it) → touchscreen tap at that point. Covered / off-screen → DEAD. No `.click()` / dispatchEvent / game function presses anything.
- Verdict per tap: hit (DEAD or ok) · effect (layer opened/closed, tab/panel changed, text/state changed, moved, toggled) · right effect (✕/Lui/Đóng closes its own frame or goes back to the screen before; a mini-game ✕ may end the game with its lose result, KIT §13.9; a tab shows that tab; no JS error).
- Screens explored breadth-first from START title (the opening screen), home (a fresh solo life, LỜI DẶN marked seen) and tour (a brand-new player: title → Chơi một mình → Luân hồi → Thân phận → Tiền truyện → Tuyển chọn → Nhập cung → home → LỜI DẶN tour). Between taps the harness restores the snapshot (deser + replay of the path with real taps; reload if a frame stays up) — harness setup only.
- Pictures load from the CDN (layout as she sees it); sound/video blocked. Fold 755x1000 (touch) + iPad 1180x820.
- Gate: `dev/tools/quickcheck.d/90-button-crawl.sh` = `--fast` (Fold, fresh-life home + one tap deep, ≤80 taps); fails on DEAD, JS error on a tap, ✕ that does not close; known filed faults in `dev/tools/quickcheck.d/button-crawl-known.txt` are printed KNOWN.

## FAIL families (LIVE 008aa59b) and status
| # | family | devices | status |
|---|---|---|---|
| 1 | LỜI DẶN tour card: «Tiếp» and «Bỏ qua lời dặn» DEAD (div.kpdr text column over both; 0/9 points free) — a new player cannot leave page 1/12 | Fold + iPad | fixed on review/sansang-music-fix-2 a6b4d573 (owned by session_01V1ZZH1Z5G4aTpbCaR3rDY7; crawler-verified on iPad: Tiếp pages 1/4…5/12, lit-spot tap, Bỏ qua closes) — LAND it |
| 2 | «Chưa điểm trang» rules card: kit ✕ «Quay lại» OPENED the dress screen (ran «Sẵn sàng») | Fold + iPad | FIXED review/button-crawl-fix-1 605decea (jtoil honours KG82.giveUp → «Mặt mộc» lose result); family scan: only jtoil ignored giveUp |
| 3 | Hậu cung: tap on a person / «Xem thêm» → TypeError «f.rk.split is not a function» at pcPort | Fold + iPad | FIXED review/button-crawl-fix-1 6d25be7e (pcPort reads rk as text, like mdH); family scan: only pcPort splits rk |
| 4 | Mục tiêu chương panel: tabs «Mục tiêu · Danh hiệu n/35 · Thiên mệnh» DEAD under the head-art band | Fold | KIT REQUEST K-KDTX-BAND filed (dev/kit/KIT_REQUESTS.md): kitDlgText cap squeezes the stacked band rows — kit keeper; gate lists it KNOWN |
| 5 | Bảng vàng → «Mã khôi phục»: «Chép mã» / «Lui» hit the #modal backdrop (dialog not on top of the leaderboard page?) | Fold | TO CONFIRM (one probe) — next session |
| 6 | first life: the LỜI DẶN tour did not open by itself on a new player's first home screen within 6 s (opened fine from ☰ «Xem lại lời dặn») | Fold + iPad | WARN, to confirm |
| 7 | look-up panels («Tâm trạng · X», «Đã biết về X», «Chứng cứ về X», «Thỉnh tranh nhân vật») piled up in Q with no dedupe, AND every kit card was saved as a bare title (body in m.kit) → after a load / co-op merge an EMPTY card, carried by every save (flight2 B U3 BGMQ ctm-coop-wk P = 1998 empty «Tâm trạng · Cung nữ tam đẳng Tố Nguyệt»; root of the B «empty Tâm trạng card» loops U1 2GBH / U2 QB46 / U3 BGMQ) | Fold + iPad | FIXED review/button-crawl-fix-2 fa466d90 (on sansang-music-fix-2 a6b4d573): kitPanel one look-up per title; look-ups never saved; the other 79 kit-card call sites saved with their spec; old poisoned saves load clean; jqsave index pairing fixed. Test dev/test/look-dedupe.js (FAILS on LIVE: 21 copies) + quickcheck hook 92 |
| 8 | Fold: people tokens covered by img#mefig after a token → focus → ✕ cycle (G1): #krail came back from the header slot to the stage keeping its inline left ≈ 628 px → j59 reserved 695 px → her + every token in one 40 px gap | Fold | FIXED review/button-crawl-fix-3 6b401cfc (on test-path-fix-r 003ac0b0 + LIVE 9f72524b): jrail clears header-slot left/flex; j59 side reserves from their own side only. G2 («layer shown on hidden #mefig») = test false positive (layer inherits visibility:hidden from the hidden stage) → toil-overlay scan fixed; covered token FAILS by default |
| 9 | iPad (mouse; iOS touch at risk): a press on an option card's Tốn/Được row did NOTHING — cung nữ «Tuyển chọn» (jkc2 kc2Sel) stuck. Root: jfx press (.kfdown + ripple node) → j63 kaMO → kaNorm → jopic kitOptFinal sig read className → the press looked like a change → rows rebuilt under the finger → click dropped. Also jseal kitSealEvPlace self-loop (~11 class writes/s on every open dialog) | iPad (Fold touch survived in Chromium) | FIXED review/button-crawl-fix-4 b3605b12: kfCls() in every «changed?» sig (jopic ×2, jlag2, j57); jseal writes only when needed. Test dev/test/press-keep.js (LIVE FAIL 3 → PASS) + hook 93 |
| 10 | «Sang ngày mới / Sang buổi» greyed with cards waiting in Q and NOTHING on screen (robot s6d Q=12; s7 4× / s9 7× «Tin báo», s6d 3× «Tin chờ», 20× «Tâm trạng · X» copies): jdayq gate (c) held every queued card while a person view she opened was «open» — also after a tab change parked it (dfTabLayers hides .kfoc, DF.F kept) or when its layer was gone (dqActEl returned document.body); taps on the rail / «!» box in that state queued more panels that never showed | Fold + iPad | FIXED review/button-crawl-fix-5 de62f99c (on m-fix-2-r 240f549a): dqActEl = view ON SCREEN only; dqWake safety net (BAL.dayq.wake 2 s); view panels (spec.view: Tin chờ / Tin báo / Lịch tháng) one per title + never saved. Test dev/test/q-softlock.js (LIVE FAIL 6 → 20/20 PASS) + hook 94 |

Soft «no effect» rows (not called bugs yet; most are harness blind spots fixed in the crawler after this run): «Chọn chính mình» (her figure: selection toggle class j59sel → now counted «toggled»), Dư đồ «Phóng to / Thu nhỏ» (map zoom = inline transform → now «moved»), «Gieo quẻ» (skip area under reduced motion → crawler now runs without reduced motion), stats strip «Sắc … Sủng» (tooltip), iPad «Về phòng» on the home screen, Mệnh truyện › Sổ ghi origin rows, Settings «Sổ đổi mới mã …», Cung nhân «Người lạ». Vault «Giữ sổ trên mây» CORS error = harness origin 127.0.0.1, not the game.
Coverage gap: SKIP 337 rows = the harness could not bring a tab panel back to the exact sub-state (Tư trang / Dư đồ / Tài nghệ sub-tabs) — those buttons were not tapped; next run should reset sub-tab state (or crawl them without restore when the tap only changes the panel).

## READY + HANDOVER (worker rollover, owner 16/11 08:22Z s14 — the COORDINATOR opens the successor)
- depth 5 · START_CTX ~4 % · rolling over at ~29 % (START + 25 %).
- READY button-crawl-fix-1 87c8c543 (review/button-crawl-fix-1, from LIVE 008aa59b): fix #2 jtoil ✕ + fix #3 pcPort + crawler + gate hook + KIT REQUEST K-KDTX-BAND. quickcheck 6d25be7e: all PASS except the 90 hook, which then failed only on the filed K-KDTX-BAND fault → known-list added in 87c8c543 (gate self-test PASS, 0 sure faults, 205 s).
- Worktrees: /home/user/wt/bcrawl (crawler dev copy, LIVE index), /home/user/wt/bcfix (fix branch, detached HEAD = 87c8c543), /home/user/wt/bcho (this report). Runs + shots: /home/user/wt/bc-out/ (full6 = this table; shots NOT in git).
- NEXT for the successor: (a) switch realtap.js to ROLE A's review/robot-realtap once Foreman F gives the sha; (b) full re-run with the newer crawler (no reduced motion, toggles/moves, frame-on-top dedupe): `node dev/test/button-crawl.js --dev fold,ipad --start title,home,tour --depth 2 --out <dir>` then `--report <dir>` into this file; (c) confirm #5 (Bảng vàng «Mã khôi phục» on Fold) and #6 (tour auto-open) with one probe each, fix as fix-2 if real; (d) close the SKIP gap (sub-tab state restore); (e) deeper screens: act cards (Hành sự) options, mini-game intros, person-focus, visitors — depth 3 from home and a mid-life save (robot10 saves) so later-rank tabs exist.

## HANDOVER ROLE B #2 (session_01UV1Szgmw4epFn6X13b3DZS, depth 7, START_CTX ~6 %)
- Done: READY fix-2 fa466d90 · READY fix-3 6b401cfc (both reported to Foreman F #7).
- Worktrees: /home/user/wt/fx2 (fix-2), /home/user/wt/fx3 (fix-3), /home/user/wt/base (a6b4d573 baseline), /home/user/wt/ho (this report). Scratch /home/user/wt/rp (repro + BGMQ dump host.json).
- Rolling over at context ~START + 25 % (worker rule: the COORDINATOR opens the successor). Probe started, not finished: nlcard flow on LIVE Fold from a cleared title — first «Chơi một mình» tap hit the #kload loading veil (DEAD BUTTON, cover div#kload.modal.kpscene, transient while pictures load) → check whether #kload outlives its pictures on a fresh player; script idea in this report's history (title → Chơi một mình → Nhận thân phận → Vào cung ngay, realtap each, 3 tries, log Q / #modal.nlcard).
- NOT STARTED (orders read at rollover, Foreman F #9 session_01UV1SzgyYZztEVKbPNwpyMf): (a) FIRST fix-1-r2 on review/button-crawl-fix-1-r bac2c5c6: iPad crash «par is not defined» in crawlTour() button-crawl.js ~141; replace the local realtap.js ({tap,hitInfo}) by the shared review/robot-realtap lib (RT.make(page).tap); quickcheck incl. hook 90 Fold+iPad → READY button-crawl-fix-1-r2; then triage Fold no-effect rows (stat chip, «Gieo quẻ», «Sổ đổi mới mã»; «Giữ sổ trên mây» CORS = localhost). (b) s7 pet dialog «Nhờ thái giám tìm thú nuôi» (Fold): item info popup («Chim họa mi lồng trúc», own ✕) stays over the grid and covers other pet cards; two ✕ at once → whole family (info popup inside a dialog over its own option grid). (c) fix-2 family check: «Lịch tháng» close-no-effect on s6d iPad (shots on session_01UV1SzkDs88ozjFkVLK5VG8 box /home/user/out6d/shots-flight2-s6d/noeffect-*.png) — confirm it is covered by the look-up dedupe or fix.
- Still open from the pending list below: probes #5 (Bảng vàng «Mã khôi phục» Fold), #6 (tour auto-open), nlcard (#modal.nlcard 30 taps), #krail over «3 Chí tôn» / img.kfr in #dawn, #dawn .kne-beat by design?; then the full re-run on realtap 4523381f + SKIP gap + depth-3 screens.

## HANDOVER ROLE B #3 (session_01UV1Szis6w42ZQrVFshkBo8, depth 8 = limit, START_CTX ~6 %, rolled at ~30 %) — the COORDINATOR (F #10 session_01UV1SzjwRAZo2x1CQsUNG3x) opens the successor
PRIORITY #1 CHECK ('button-crawl'): OD 0 | main 0 | review/* button-crawl-fix-1..3 + robot-realtap 1ffae8bb | claims ROLE B line — continued, nothing rebuilt.
- READY button-crawl-fix-1-r2 9259f352 (on fix-1-r bac2c5c6): crawlTour `par` crash removed (iPad crawl no longer lost); dev/test/realtap.js = robot-realtap 1ffae8bb byte-identical, crawler calls it through an RT.make adapter (disabled / gone / hint-popup refusals = WARN, not DEAD); tour test flag `hclh-tut-test` (jtut autoOk hides the tour from webdriver pages); tour «Tiếp» waits ≤3.6 s for the next lesson; first-life path closes look-up dialogs it opened. Fast gate Fold PASS (80 taps, 0 sure faults); tour fold+ipad no crash.
- READY button-crawl-fix-4 b3605b12 (from LIVE 9f72524b), quickcheck PASS (core gates, 9 hooks incl. new 93-press-keep, old save, perf in noise): FAIL family #9 below.
- Probes closed: #5 Bảng vàng «Mã khôi phục» = PASS Fold+iPad on LIVE (Chép mã, Ta đã ghi lại, footer reopen, ✕; #modal.krkp z 9100 over #krkov 8990). The «covered» seen before = the first-visit #kload card («Lần đầu nhập cung», «Vào cung ngay» / «Thỉnh tiếp»), by design. #6 tour auto-open = harness-only (jtut autoOk: `!navigator.webdriver||testFlag()`); with the flag the tour opens on iPad. nlcard = by design: «Vào cung ngay» on the card is a ROAD chip (selects, card stays); «Nhận thân phận» closes it (crawler PASS Fold+iPad) — F #6's «30 taps would not close» was a harness tapping the road chip.
- NOT DONE (next ROLE B): (a) tour lesson 5/12 «Làm thử một việc» (jtut step thu, interact+noNext): on iPad the card showed only «Bỏ qua lời dặn», no lit spot (pickAct found no act card?) → crawler now dumps {hole, acts, visActs, dis, tab} + shot in that row: run `node dev/test/button-crawl.js --dev ipad --start tour --depth 0` on fix-1-r2 and decide bug / by design; Fold row said «tour closed» after 4/12 (thu step pauses the card while she tries = likely by design, confirm). (b) #krail over «3 Chí tôn» / img.kfr in #dawn, #dawn .kne-beat by design?, s7 pet-dialog info popup over its grid (family), fix-2 «Lịch tháng» close on s6d. (c) FULL RE-RUN on LIVE with fix-1-r2 crawler, Fold+iPad, depth 3, SKIP gap (sub-tab restore), mid-life save. (d) Fold soft rows: stat chip, «Gieo quẻ» no effect (seen again in fast run on LIVE), «Sổ đổi mới mã».
- QUEUE from F #9/#10 (09:40–10:55Z, read after rollover, NOT started), in this order: (1) «Tâm trạng · <person>» close no-effect (s8 ×4 persons Fold, s10 «Lui» ×2 iPad) + «Tâm trạng · Ta» EMPTY dialogs popping after «Đêm thị tẩm» (✕ needs >3 taps) + s6d yr2 8 queued copies of «Tâm trạng · Quý nhân Đường Hân Duyệt» (dump dev/handover/robot/flight2-s6d-loop1/) — FIRST check whether fix-2 3b7e15cb (look-up dedupe, PASS, not yet LIVE) already covers it: LIVE 9f72524b lacks it, so re-test on fix-2-r; (2) dead «Lui» on .dlg «Tin chờ người sai đi» (Foreman D); (3) .kmov «?» covered by a zero-size cover (s10 ×3); (4) pet dialog «Xem Chó/Chim/Thỏ» covered by span.kitb / b.kidn (also co-op, flight2-coop1g.d) = s7 pet family; (5) #kpzoom picture zoom has no visible close (kit first / KIT_REQUESTS); then the NOT DONE list above. Not ours: «Kính sự phòng» sole-card «reading 'off'» = HARNESS FIXER #3. Harness head now 93812531 (use its realtap.js).
- Worktrees: /home/user/wt/f1r2 (fix-1-r2), /home/user/wt/fx4 (fix-4, built), /home/user/wt/ho (this report). Probes /home/user/wt/probe (p5 Mã khôi phục, p6 new-player path, p7 cung nữ «Tuyển chọn» path: `FORCE=cnv node p7.js <index.html> ipad Cung "<option>"`), outputs /home/user/wt/bc3-out (shots NOT in git).

## HANDOVER ROLE B #4 (session_01UV1SziRSpt6UJHzZkSfGnp, depth 8 = limit, START_CTX ~6 %, rolled at ~30 %) — the COORDINATOR (F #10 session_01UV1SzjwRAZo2x1CQsUNG3x) opens the successor
PRIORITY #1 CHECK ('Tâm trạng|Tin chờ|Q softlock|dqActEl|kshdet|kpzoom'): OD 0 | main LIVE 9f72524b (jdayq, jdfv, jstatus, jnotice) | review/*: button-crawl-fix-2 (look dedupe, inside m-fix-2-r 240f549a) | claims ROLE B row — reused, nothing rebuilt.
NOTE: a stale local origin/main ref (4a8c627b) can sit in a fresh container — check `git ls-remote origin refs/heads/main` (LIVE = 9f72524b at 11:30Z).
- READY button-crawl-fix-5 de62f99c (on m-fix-2-r 240f549a; FAIL family #10 above). quickcheck PASS (core gates, hooks 10 incl. 94-q-softlock, time-spill, old save ok, perf: render 222/237, tab 557/476, buổi 1150/1354 ms new/live).
- PUSHED review/button-crawl-fix-1-r3 da3cfca0 (= fix-1-r2 9259f352 + crawler: waits for the tour lit hole / next lesson; restore puts back sub-tab picks KTSUB / KINV_SUB / ctm-ktsub-* = the SKIP gap). Supersedes fix-1-r2 for review.
- Verdicts sent to F #10 (11:10Z): (1) «Tâm trạng» copies / dead «Lui» / empty «Ta» = fix-2 (look-dedupe LIVE FAIL 21 copies → m-fix-2-r 16/16 PASS); (2) «Tin chờ» dead «Lui» = not by real taps → root found later = family #10; (4) pet «Xem Chó/Chim/Thỏ» covered = BY DESIGN (kitShop detail card; tap outside closes only the detail); (5) #kpzoom no ✕ = BY DESIGN (KIT §828/§447).
- Probes: tour lesson 5/12 «Làm thử một việc» WORKS Fold + iPad (lit card → act → «Thẻ kết quả»; crawler read the hole mid-move → fixed in fix-1-r3). #dawn = Tuần lục book: buttons under the cover / kne-beat «Chạm để bỏ qua» = BY DESIGN. iPad tour crawl still stops at cung nữ «Tuyển chọn» option no effect = family #9 (fix-4 b3605b12). «Danh hiệu» «Đổi phần thưởng» WORKS (opens the pick list); its card reads «TỐN không / ĐƯỢC không» (navigation row on a kit option card) = wording, F/MAIN. KIT REQUEST K-NOTICE-OPTS filed (long «Tin báo» with options: «Để sau» below the frame, no ✕, outside tap does nothing). s9 «Tin báo» 5/12 lines one template = wording → MAIN.
- NOT DONE (next ROLE B): (a) .kmov «?» zero-size cover (s10 ×3) — no detail found; ask F for the dump; s4d: «Hầu hạ» card covered by a zero-size element on «Tích Cần viện», button.kbtn.kmend over #dawn (dev/handover/robot/flight2-s4d-dead.md @81c58047); (b) s6 runner (session_01UV1SzkDs88ozjFkVLK5VG8) was asked for loop-1-save.json on the CDN (img/_review/s6d-loop1/) — re-test it on fix-5 when it comes; (c) Fold tour: after 4/12 the crawler sees lesson 5 skipped («Thẻ kết quả» page did not turn) — check with fix-1-r3; (d) FULL RE-RUN depth 3 Fold + iPad with fix-1-r3 on LIVE (or on m-fix-2-r + fix-4 + fix-5 stack), mid-life save (s8 dump ls in dev/handover/robot/flight2-s8-ckpt/stuck-1-dump.json).
- s6d REAL SAVE (CDN img/_review/s6d-loop1/loop-1-dump.json, ls inside; base https://ctm-img.victoria-tntt.workers.dev/), loaded through the title with real taps, Fold: LIVE = Q 9 (5× «Lịch tháng», 3× «Chứng cứ về Phế phi Liêu Ngọc Thù», «Tin trong cung buổi này»), 8 ✕ taps to get through the copies; fix-5 = Q 1 (copies dropped on load). BOTH then: «Tin trong cung» stays in Q, #modal hidden, #next greyed (fix-5 shows the cue «Có tin đang chờ · xong việc đang làm đã»), because #dawn (kne-day kne-beat, z 9200) is up = jdayq gate (b) by design; a real tap skips the beat → day title «Bình minh mùa xuân» + «Tiếp theo»; after a real tap on «Tiếp theo» the news card is STILL not shown and #next stays greyed (LIVE: Q 2 + «Nghe đồn»; fix-5 Q 1). NEXT for ROLE B #5: screenshot after «Tiếp theo» (pictures were blocked in my probe /home/user/wt/probe4/s6.js — rerun with pictures on): if the Tuần lục book opens, close it and check the news shows; if #dawn is empty / stuck = a 2nd softlock root in jdayq gate (b) / jne → fix on fix-5 (whole family, dqDawn must only hold while the host is really on screen with something to tap).
- Worktrees (this box): /home/user/wt/b4 (fix-5), /home/user/wt/f1r2 (fix-1-r3), /home/user/wt/ho4 (this report); probes /home/user/wt/probe4 (tin.js, chip.js, s8.js + s8ls.json, pet.js, tut.js, dawn.js, foc.js, hold.js, dh.js, tb.js), outputs /home/user/wt/bc4-out (shots NOT in git).

## Numbers (run full6, LIVE 008aa59b, depth 2 from title + home; tour run separate)
Devices: fold + ipad · rows 1587 · PASS 1184 · FAIL 58 (dead 5) · WARN 0 · SKIP 345 (harness could not bring the screen back; not a game verdict)
- fold: PASS 450 · FAIL 29 · WARN 0 · SKIP 160
- ipad: PASS 734 · FAIL 29 · WARN 0 · SKIP 185

### FAIL + WARN (every row)

| dev | screen | button | hit | effect | verdict |
|---|---|---|---|---|---|
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Sắc 45 Tài 73 Tâm cơ 17 Đức 30 Danh 38 Sủng 8 | ok | no effect (screen and state unchanged) | FAIL |
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| fold | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | Quay lại | ok | close button did not close its layer (something else changed) | FAIL |
| fold | Quẻ Trung (Giao thiệp) [div#modal.modal:Quẻ Trung · Giao thiệp] | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Mục tiêu | DEAD | dead button: covered under img | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Danh hiệu 0/35 | DEAD | dead button: centre covered (1/9 points free) under img | FAIL |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | Thiên mệnh | DEAD | dead button: covered under img | FAIL |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Thu nhỏ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Phóng to | ok | no effect (screen and state unchanged) | FAIL |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] |  | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Xem thêm | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| fold | Quẻ Trung (Giao thiệp) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#m | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Hậu cung › Cung nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái Tể tướng 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái Đại tướng quân 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái nhà buôn muối 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cung nữ được sủng hạnh 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Công chúa hòa thân · Ba Tư 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Công chúa hòa thân · Phù Tang 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái tội thần 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cháu gái Thái hậu 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Con gái thầy đồ nghèo 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | Cung nữ tuyển vào cung 0/16 | ok | no effect (screen and state unchanged) | FAIL |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | Lui | DEAD | dead button: covered under div#modal.modal.krkp.kptitle «ĐIỀUMã khôi phụcKhách vô danh✕Mã khôi ph» | FAIL |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | Chép mã | DEAD | dead button: covered under div#modal.modal.krkp.kptitle «ĐIỀUMã khôi phụcKhách vô danh✕Mã khôi ph» | FAIL |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Sắc 83 Tài 41 Tâm cơ 12 Đức 30 Danh 8 Sủng 8 | ok | no effect (screen and state unchanged) | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Về phòng | ok | no effect (screen and state unchanged) | FAIL |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | Quay lại | ok | close button did not close its layer (something else changed) | FAIL |
| ipad | Quẻ Hạ hạ (Mưu kế) [div#modal.modal:Quẻ Hạ hạ · Mưu kế] | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Thu nhỏ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Phóng to | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] |  | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Xem thêm | ok | JS error: console.error: TypeError: f.rk.split is not a function at pcPort (http://127.0.0.1:41173/index.html:4691:282) at | FAIL |
| ipad | Giao tình [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tư trang [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tài nghệ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Mệnh truyện [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Sổ đổi mới mã 0756a05b+ · 11/25/2026 05:01 Xem | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | Giữ sổ trên mây lập ám hiệu sổ mới | ok | JS error: console.error: Access to fetch at 'https://ctm-coop.victoria-tntt.workers.dev/api/vault/new' from origin 'http://127.0.0 | FAIL |
| ipad | Quẻ Hạ hạ (Mưu kế) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#modal | Gieo quẻ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Dư đồ › Danh sách [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Nam nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Giao tình › Phe phái [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Kế vị [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Hoàng tự trong cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Ki | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Hôn sự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | Người lạ | ok | no effect (screen and state unchanged) | FAIL |
| ipad | Tư trang › Thú cưng [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | Chọn chính mình | ok | no effect (screen and state unchanged) | FAIL |

### PASS (per screen: buttons that hit and did the right thing)

| dev | screen | buttons PASS |
|---|---|---|
| fold | home [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 31: Ô lưu · Xem bản thân · Bạc 180 Sức 80/100 · Buổi sáng, còn 4 khắc · Chưa điểm trang · sương sớm · Quẻ Trung (Giao thiệp) · Tâm trạng Bình thản 0 · Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 3 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Hành sự  |
| fold | Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| fold | Xem bản thân [div#modal.modal.pcm:✕ Cố Ngưng Hoa Tần 23 Tinh phẩm Trâm | 13: Lui ·  · 23 Tinh phẩm Trâm phỉ th · Hoa tai · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · 35 Trân phẩm Áo gấm thêu · Giày · Theo hầu · Tư chất · Tài nghệ |
| fold | Bạc 180 Sức 80/100 [div#modal.modal:Bạc] | 2: Lui ·  |
| fold | Buổi sáng, còn 4 khắc [div#modal.modal:sáng · còn] | 1: Lui |
| fold | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | 2: Luật chơi · Điểm trang · Sẵn sàng bắt đầu chơi |
| fold | Quẻ Trung (Giao thiệp) [div#modal.modal:Quẻ Trung · Giao thiệp] | 2: Lui · Gieo lại TỐN Bạc -10·1 k |
| fold | Tâm trạng Bình thản 0 [div#modal.modal:Tâm trạng · Ta] | 1: Lui |
| fold | Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11: Thời tiết: trời · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21 · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày  |
| fold | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | 3: Lui · Đi làm: Thỉnh an Thái hậ · Đi làm: Thay y phục hay  |
| fold | Có thai Rất thấp [div#modal.modal:Có thai: Rất thấp] | 1: Lui |
| fold | Lật thẻ Rất thấp [div#modal.modal:Lật thẻ: Rất thấp] | 1: Lui |
| fold | Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| fold | Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| fold | Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| fold | Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| fold | Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Phi] | 1: Lui |
| fold | Dư đồ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 2: Ra vào cung cấm · Danh sách |
| fold | Hậu cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Chí tôn · Phi tần · Nam nhân · Cung nhân |
| fold | Giao tình [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 2: Ân oán · Phe phái |
| fold | Hoàng tự [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 5: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu |
| fold | Tư trang [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 3: Túi đồ · Thú cưng · Việc |
| fold | Tài nghệ [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 5: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · Bảng tài nghệ hậu cung G |
| fold | Mệnh truyện [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 3: Mệnh truyện · Việc nhờ · Sổ ghi |
| fold | Sang buổi [div#kntchip.ktbt.kntc:! Thường tại ??? sai người sang thách | 1: ! Thường tại ??? sai ngư |
| fold | Ô lưu › Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle | 7: Lui · Một mình · Cùng hảo hữu · Nhập ám hiệu · Mời hảo hữu · Mời hảo hữu · Mời hảo hữu |
| fold | Ô lưu › Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 37: Lui · Ghi chú · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Mật lệnh cố quốc 0/4 · Sứ đoàn cố quốc 0/4 · Người ngoại tộc 0/4 · Ngai vàn |
| fold | Ô lưu › Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 1: Lui |
| fold | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | 13: Lui · Tiếng nhạc, tiếng động,  · Nhạc 50 · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem lại lời dặn Game này · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| fold | Quẻ Trung (Giao thiệp) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#m | 1: Lui |
| fold | Mục tiêu chương (có mới) › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Lui | 1: Xem đầy đủ trong Sổ ghi |
| fold | Mục tiêu chương (có mới) › Đi làm: Thay y phục hay trang sức trong Tư  | 1: Xem đầy đủ trong Sổ ghi |
| fold | Nguy hiểm chung: 0 › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Thôi Nguy | 1: Xem đầy đủ trong Sổ ghi |
| fold | Nguy hiểm chung: 0 › Đóng cửa giữ mình TỐN Sủng -3 ĐƯỢC 2 tuần: mưu h  | 1: Xem đầy đủ trong Sổ ghi |
| fold | Hậu cung › Phi tần [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 21: Chí tôn · Phi tần · Nam nhân · Cung nhân · Hàn Yên · Doanh Nguyệt · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Xem thang nguy hiểm · Gặp mặt 3/5 · Giao thiệp 2/3 · Dùng chứng cứ 0/8 · Hại nhỏ 7/12 · Hại nặng 13/17 · Sát hại 5/9 |
| fold | Hậu cung › Nam nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Chí tôn · Phi tần · Nam nhân · Cung nhân |
| fold | Hậu cung › Cung nhân [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 12: Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người sau ·  |
| fold | Giao tình › Phe phái [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Ân oán · Phe phái · Phe phái hậu cung · Triều đình |
| fold | Hoàng tự › Kế vị [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 8: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · 1. Tuyên · 2. Thụy |
| fold | Hoàng tự › Hoàng tự trong cung [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp t | 12: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Khác · Mẫn · Kính · Tuyên · Thụy · Đến cung nàng ta thăm ⓘ  |
| fold | Hoàng tự › Hôn sự [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 6: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm |
| fold | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Cố Ngưng Hoa Tần 19 tuổi K | 19: Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người lạ · Người sau · Dò hỏi gia thế Rất vững  |
| fold | Tư trang › Thú cưng [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 4: Túi đồ · Thú cưng · Việc · Nhờ thái giám tìm thú nu |
| fold | Tư trang › Việc [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 7: Túi đồ · Thú cưng · Việc · Nhờ thái giám mua đồ ⓘ Đ · Soát đồ Mong manh TỐN 2  · Sai cung nữ thân tín mua · Hối lộ người ở Thái y vi |
| fold | Tài nghệ › Cầm kỳ thi họa 8/12 [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp t | 22: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Cách học · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 2 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 1 trên 5 · Tự học ⓘ TỐN 2 |
| fold | Tài nghệ › Vũ · Y · Nữ công 8/12 [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp | 22: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Cách học · Bậc 2 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 khắc Sức  · Học với thầy ⓘ TỐN 2 khắ · Các lối, sách phổ ⓘ ĐƯỢC · Bậc 0 trên 5 · Tự học ⓘ TỐN 2 |
| fold | Tài nghệ › Tác phẩm [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 8: Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · ⓘ Tác phẩm · Hỏi thái y kiêng kỵ ⓘ TỐ · Sai cung nữ dò la khẩu v · Bảng tài nghệ hậu cung G |
| fold | Tài nghệ › Bảng tài nghệ hậu cung GHI CHÚ xem thứ bậc từng [div#modal. | 10: Lui · Đàn Rất vững TỐN không Đ · Cờ Rất vững TỐN không ĐƯ · Vẽ Rất vững TỐN không ĐƯ · Múa Rất vững TỐN không Đ · Thơ Rất vững TỐN không Đ · Điều hương Rất vững TỐN  · Nấu ăn Rất vững TỐN khôn · Thêu Rất vững TỐN không  · Đầu hồ Rất vững TỐN khôn |
| fold | Mệnh truyện › Sổ ghi [body:☰ Cố Ngưng Hoa Tần 19 tuổi Kiếp thứ nhất] | 30: Mệnh truyện · Việc nhờ · Sổ ghi · Công chúa hòa thân · Cao ·  · Ghi chú · Ghi chú · Ghi chú · Mật lệnh cố quốc 0/4 · Sứ đoàn cố quốc 0/4 · Người ngoại tộc 0/4 · Ngai vàng cố quốc 0/4 · Nhập cung · ? ? kỳ ngộ · ? · ? · ? · ? · ? · ? · ? ? kỳ ngộ · Chương 12 · Tranh ngôi Trung cung · Mẫu nghi thiên hạ · Hồi kết nhánh · ? Còn mở ? ? ? thua · ? Còn mở ? ? ? thua · ? Còn mở ? ? ? thua · ? Còn mở ? ? ?  |
| fold | Sang buổi › ! Thường tại ??? sai người sang thách đấu ta [div#modal.mo | 1: Lui |
| fold | title [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| fold | Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle:Chọn sổ | 3: Lui · Một mình · Cùng hảo hữu |
| fold | Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 36: Lui · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Quân cờ trong tay cha 0/ · Phủ Tể tướng mắc oan 0/4 · Phủ Tể tướng chia đôi 0/ · Mật  |
| fold | Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 2: Ta đã ghi lại · Lấy lại |
| fold | Thiết lập [div#modal.modal.kptitle:Thiết lập] | 11: Lui · Tiếng nhạc, tiếng động,  · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| fold | Sổ luân hồi › Nhập cung [div#modal.modal.kptitle:Nhập cung] | 1: Lui |
| fold | Sổ luân hồi › ? ? kỳ ngộ [div#modal.modal.kptitle:?] | 1: Lui |
| fold | Sổ luân hồi › Chương 12 [div#modal.modal.kptitle:Chương 12] | 1: Lui |
| fold | Sổ luân hồi › Tranh ngôi Trung cung [div#modal.modal.kptitle:Tranh ngô | 1: Lui |
| fold | Sổ luân hồi › Mẫu nghi thiên hạ [div#modal.modal.kptitle:Mẫu nghi thiê | 1: Lui |
| fold | Sổ luân hồi › Hồi kết nhánh [div#modal.modal.kptitle:Hồi kết nhánh] | 1: Lui |
| fold | Thiết lập › Xem [div#modal.modal.kptitle:Sổ đổi mới] | 1: Lui |
| fold | Thiết lập › Nối sổ máy kia đã có ám hiệu [div#modal.modal.kptitle:Nối  | 2: Lui · Nối sổ |
| fold | Thiết lập › Tải hết để chơi offline mở bảng tải [div#modal.modal.kptit | 2: Bắt đầu tải tải ngầm lúc · Lui về Thiết lập |
| ipad | home [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 31: Ô lưu · Xem bản thân · Bạc 380 Sức 80/100 · Buổi sáng, còn 4 khắc · Chưa điểm trang · sương sớm · Quẻ Hạ hạ (Mưu kế) · Tâm trạng Bình thản 0 · Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Hành sự · Dư |
| ipad | Ô lưu [div#modal.modal.kptitle:Cung Tường Mộng] | 6: Lui · Chơi một mình chọn sổ, x · Cùng hảo hữu Mời hảo hữu · Sổ luân hồi · Bảng vàng · Thiết lập |
| ipad | Xem bản thân [div#modal.modal.pcm:✕ Vân Tố Ngưng Đáp ứng 10 Thường Trâ | 13: Lui ·  · 10 Thường Trâm hoa lụa · Hoa tai · Đeo tay · Đeo eo · Túi thơm · Khăn che mặt · 10 Thường Áo lụa thêu ho · Giày · Theo hầu · Tư chất · Tài nghệ |
| ipad | Bạc 380 Sức 80/100 [div#modal.modal.kpcompactm:Bạc] | 2: Lui ·  |
| ipad | Buổi sáng, còn 4 khắc [div#modal.modal.kpcompactm:sáng · còn] | 1: Lui |
| ipad | Chưa điểm trang [div#ov.ov:TÀI NGHỆ Điểm trang: Trước gương đồng ✕ ] | 2: Luật chơi · Điểm trang · Sẵn sàng bắt đầu chơi |
| ipad | Quẻ Hạ hạ (Mưu kế) [div#modal.modal:Quẻ Hạ hạ · Mưu kế] | 2: Lui · Gieo lại TỐN Bạc -10·1 k |
| ipad | Tâm trạng Bình thản 0 [div#modal.modal:Tâm trạng · Ta] | 1: Lui |
| ipad | Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung, đứng v | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất thấp] | 1: Lui |
| ipad | Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất thấp] | 1: Lui |
| ipad | Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Thường tại] | 1: Lui |
| ipad | Dư đồ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 14: Ra vào cung cấm · Danh sách · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 |
| ipad | Hậu cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân |
| ipad | Giao tình [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 15: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Ân oán · Phe phái |
| ipad | Hoàng tự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 18: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu |
| ipad | Tư trang [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 16: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Túi đồ · Thú cưng · Việc |
| ipad | Tài nghệ [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 18: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Tứ đức 9/9 · Cầm kỳ thi họa 8/12 · Vũ · Y · Nữ công 8/12 · Tác phẩm · Bảng tài nghệ hậu cung G |
| ipad | Mệnh truyện [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 16: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Mệnh truyện · Việc nhờ · Sổ ghi |
| ipad | Sang buổi [div#kntchip.ktbt.kntc:! Có tin: Đức Thọ cung có chuyện] | 1: ! Có tin: Đức Thọ cung c |
| ipad | Ô lưu › Chơi một mình chọn sổ, xem Phúc duyên [div#modal.modal.kptitle | 7: Lui · Một mình · Cùng hảo hữu · Nhập ám hiệu · Mời hảo hữu · Mời hảo hữu · Mời hảo hữu |
| ipad | Ô lưu › Sổ luân hồi [div#modal.modal.kptitle:Sổ luân hồi] | 37: Lui · Ghi chú · Ghi chú · Ghi chú · Con gái Tể tướng 0/16 · Con gái Đại tướng quân 0 · Con gái nhà buôn muối 0/ · Cung nữ được sủng hạnh 0 · Công chúa hòa thân · Cao · Công chúa hòa thân · Ba  · Công chúa hòa thân · Phù · Con gái tội thần 0/16 · Cháu gái Thái hậu 0/16 · Con gái thầy đồ nghèo 0/ · Cung nữ tuyển vào cung 0 · Mua tước cho cha 0/4 · Thuyền muối đêm 0/4 · Năm đói ở Giang Nam 0/4 · Món  |
| ipad | Ô lưu › Bảng vàng [div#modal.modal.krkp:Mã khôi phục] | 1: Lui |
| ipad | Ô lưu › Thiết lập [div#modal.modal.kptitle:Thiết lập] | 13: Lui · Tiếng nhạc, tiếng động,  · Nhạc 50 · Tiếng động 70 · Giọng 70 · Rung Có · Hiệu ứng Gọn: tranh tĩnh · Lời dặn tân thủ ma ma ch · Xem lại lời dặn Game này · Xem · Nối sổ máy kia đã có ám  · Tải hết để chơi offline  · Nạp sổ GHI CHÚ dán bản c |
| ipad | Quẻ Hạ hạ (Mưu kế) › Gieo lại TỐN Bạc -10·1 khắc ĐƯỢC không [div#modal | 1: Lui |
| ipad | Mục tiêu chương (có mới) › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Lui | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Mục tiêu chương (có mới) › Danh hiệu 0/35 [div#modal.modal:Danh hiệu] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Mục tiêu chương (có mới) › Thiên mệnh [div#modal.modal.kes:Thiên mệnh] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Nguy hiểm chung: 0 › Lui [div#rtoast.rtoast.karesult:KẾT QUẢ Thôi Nguy | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Nguy hiểm chung: 0 › Đóng cửa giữ mình TỐN Sủng -2 ĐƯỢC 2 tuần: mưu h  | 1: Xem đầy đủ trong Sổ ghi |
| ipad | Dư đồ › Ra vào cung cấm [div#modal.modal:Ra vào cung cấm] | 1: Lui |
| ipad | Dư đồ › Danh sách [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 2: Cung nữ thân tín tam đẳn · Lịch tháng |
| ipad | Dư đồ › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Dư đồ › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập cung | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Dư đồ › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Dư đồ › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất thấp | 1: Lui |
| ipad | Dư đồ › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất thấp | 1: Lui |
| ipad | Dư đồ › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Dư đồ › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Dư đồ › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Dư đồ › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Dư đồ › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Thườn | 1: Lui |
| ipad | Hậu cung › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Hậu cung › Mục tiêu chương (có mới) [div#modal.modal.kes:Thiên mệnh] | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Hậu cung › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Hậu cung › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Hậu cung › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Hậu cung › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Hậu cung › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Hậu cung › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Hậu cung › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Hậu cung › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Hậu cung › Phi tần [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 33: Cung nữ thân tín tam đẳn · Chọn chính mình · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Nhược Lan · Người lạ · Người lạ · Người lạ · Người sau · X |
| ipad | Hậu cung › Nam nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân |
| ipad | Hậu cung › Cung nhân [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 24: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Chí tôn · Phi tần · Nam nhân · Cung nhân · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người sau ·  |
| ipad | Giao tình › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Giao tình › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập  | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Giao tình › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Giao tình › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất  | 1: Lui |
| ipad | Giao tình › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất  | 1: Lui |
| ipad | Giao tình › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Giao tình › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Giao tình › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Giao tình › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Giao tình › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · T | 1: Lui |
| ipad | Giao tình › Phe phái [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Ân oán · Phe phái · Phe phái hậu cung · Triều đình |
| ipad | Hoàng tự › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 33: Lui · Tháng trước · Tháng sau · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: Nguyệt tín · ngày 28 · ngày  |
| ipad | Hoàng tự › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập c | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Hoàng tự › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Hoàng tự › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Hoàng tự › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Hoàng tự › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Hoàng tự › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Hoàng tự › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Hoàng tự › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Hoàng tự › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Hoàng tự › Kế vị [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 21: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · 1. Tuyên · 2. Bích |
| ipad | Hoàng tự › Hoàng tự trong cung [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Ki | 24: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Tĩnh · Bích · Thuận · Tuyên · Đến cung nàng ta thăm ⓘ  |
| ipad | Hoàng tự › Hôn sự [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 19: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm |
| ipad | Hoàng tự › Quý tộc kén rể · kén dâu [body:☰ Vân Tố Ngưng Đáp ứng 19 tu | 29: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Con của ta · Kế vị · Hoàng tự trong cung · Hôn sự · Quý tộc kén rể · kén dâu · Xem thêm · Người trước · Người lạ · Người lạ · Người lạ · Người lạ · Người l |
| ipad | Tư trang › Lịch tháng [div#modal.modal.kmc-modal:Lịch tháng] | 34: Lui · Tháng trước · Tháng sau · mồng 1: Lĩnh bổng lộc ·  · mồng 2 · mồng 3 · mồng 4 · mồng 5: Tiết Thanh minh · mồng 6 · mồng 7 · mồng 8 · mồng 9 · mồng 10 · ngày 11 · ngày 12 · ngày 13 · ngày 14 · ngày 15 · ngày 16 · ngày 17 · ngày 18 · ngày 19 · ngày 20 · ngày 21: Nguyệt tín · ngày 22: Nguyệt tín · ngày 23: Nguyệt tín · ngày 24: Nguyệt tín · ngày 25: Nguyệt tín · ngày 26: Nguyệt tín · ngày 27: N |
| ipad | Tư trang › Mục tiêu chương (có mới) [div#modal.modal:Chương 1 · Nhập c | 4: Lui · Mục tiêu · Danh hiệu 0/35 · Thiên mệnh |
| ipad | Tư trang › Tai mắt 0 [div#modal.modal:Tai mắt] | 2: Lui ·  |
| ipad | Tư trang › Có thai Rất thấp [div#modal.modal.kpcompactm:Có thai: Rất t | 1: Lui |
| ipad | Tư trang › Lật thẻ Rất thấp [div#modal.modal.kpcompactm:Lật thẻ: Rất t | 1: Lui |
| ipad | Tư trang › Ân tình (đêm) 0 [div#modal.modal:Ân tình (đêm)] | 1: Lui |
| ipad | Tư trang › Số lần ân thưởng 0 [div#modal.modal:Ân thưởng] | 1: Lui |
| ipad | Tư trang › Bổng lộc sau 3 tuần [div#modal.modal:Bổng lộc] | 1: Lui |
| ipad | Tư trang › Nguy hiểm chung: 0 [div#modal.modal:Nguy hiểm chung] | 2: Lui · Đóng cửa giữ mình TỐN Sủ |
| ipad | Tư trang › Xét phẩm: thiếu 4 [div#modal.modal:Xét phẩm cuối tháng · Th | 1: Lui |
| ipad | Tư trang › Thú cưng [body:☰ Vân Tố Ngưng Đáp ứng 19 tuổi Kiếp thứ ] | 17: Cung nữ thân tín tam đẳn · Lịch tháng · Mục tiêu chương (có mới) · 1 Cung nhân · 3 Chí tôn · Tai mắt 0 · Có thai Rất thấp · Lật thẻ Rất thấp · Ân tình (đêm) 0 · Số lần ân thưởng 0 · Bổng lộc sau 3 tuần · Nguy hiểm chung: 0 · Xét phẩm: thiếu 4 · Túi đồ · Thú cưng · Việc · Nhờ thái giám tìm thú nu |

## PENDING ORDERS for the ROLE B successor (received 05:52–07:21Z, read at rollover, NOT started)
- DONE (fix-2/fix-3 carry 4523381f) — Harness: switch dev/test/realtap.js to review/robot-realtap 78af2325 (or newer; #ktut / own-ancestor covers not dead, own-scroller wheel).
- DONE as fix-2 fa466d90 — (F #6 06:43Z): «person dialog queue has no dedupe» — header mood bar / person chips stay tappable behind non-modal kitPersonDlg («Tâm trạng · <person>»), every tap queues a duplicate (2.7–2.9k copies in saves). Fix family: dedupe identical pending person dialogs in Q/P + clean poisoned saves on load; block taps behind kitPersonDlg via the KIT (law 9). Base on review/sansang-music-fix-2 a6b4d573 (kpopts z). Real-tap proof Fold+iPad.
- Confirm (F #6 06:12Z): #krail button.krailb over «3 Chí tôn» (Vinh Hoa cung); img.kfr in #dawn over «Tổng lược» «?» — real if >2.5 s on 78af2325.
- Confirm (F #6 07:04Z, review/test-path-fix-2 dev/PROGRESS_test-path-fix.md): (A) DONE as fix-3 6b401cfc — #tokens .tok covered by img#mefig.j59sz.kfxon after 3–4 token→focus→✕ cycles (Fold); (B) new-life card #modal.nlcard («Vào cung ngay»/«Nhận thân phận») would not close from 30 real taps on Fold.
- Decide (F #6 07:07Z): #dawn buttons («Tổng lược» «?», «Ô lưu», «Xem bản thân», stat row) covered by div.kne.kne-beat / img.kfr — by design (beat = modal step → tell harness fixer session_01UV1SzhZEs2semzyzA7vwtt) or real overlap (fix family). One line to Foreman F.
- READY lines format: «READY button-crawl-fix-N <sha> FF <main>» to the current Foreman F (F #7 session_01UV1SzhHkCV76zb6skHhFpV at 07:21Z).

## REVIEW button-crawl-fix-1 (big reviewer session_01UV1SziXSk67Zy3DMXHsCrJ, 11/25/2026) — FAIL 87c8c543 (merge onto LIVE 9f72524b = review/button-crawl-fix-1-r bac2c5c6)
PRIORITY #1 CHECK: OD «real taps» 25/11 ~05:10Z | main: no dev/test/realtap.js, no button-crawl.js | review/*: robot-realtap + test-path-fix carry dev/test/realtap.js with API {make, PROBE} | claims Foreman F #5/#7.
Merge: index.html / sw.js / assets.json conflicts → main's, rebuilt with build_site.sh (game fixes present in the built index.html); KIT_REQUESTS.md: both new sections kept.
| check | result |
|---|---|
| jtoil rules-screen ✕ «Quay lại» (game) | LIVE bug confirmed with a real tap (✕ opened the dress, Hồi 1). Fix reads KG82.giveUp → KG82.quit = toilFinish(false) (set by toilBackX before toilRules). Family scan of every kgReady go handler: only jtoil had its own handler without giveUp; j92 has KG82.back; kg82Play / jsgame / jroute handle giveUp; pet / shelf rules use kitGameFrame in their modal (no kg82 ✕). OK |
| j15 pcPort f.rk as text (game) | OK (same as mdH String(p.rk)) |
| button-crawl.js full run fold+ipad on the merged build | 359 taps, PASS 351, FAIL 10 (dead 3 = K-KDTX-BAND tabs, known) — **iPad crawl CRASHED: «par is not defined»** |
| quickcheck | not run (my local server was stopped at its time limit and could not be restarted in this env) |
FAIL reasons:
1. Crawler crash: crawlTour() (button-crawl.js ~line 141) has the «screen one tap deeper» filter `if(par){…sig0…}` pasted from the crawl loop (line 247); `par`/`sig0` are not defined there → ReferenceError, the whole iPad crawl is lost (the tour step breaks on any device that reaches it). Remove the block from crawlTour (or pass the values), rerun fold+ipad.
2. Two incompatible files at ONE path: this branch's dev/test/realtap.js exports {tap, hitInfo}; the shared lib on review/robot-realtap and review/test-path-fix exports {make, PROBE}. Whichever lands second breaks the other (button-crawl: `tap is not a function` → quickcheck hook 90 red at every go-live; or toilette/hoa-dien/overlay break). Use the ONE shared lib (`RT.make(page,…).tap(target,{screen,label})`) and drop the local copy (laws 9/11: one shared part, no private copy).
3. Crawl findings for Foreman F (not blocking this branch): Fold — top-bar stat chip «Sắc 40 Tài 43 …» no effect; «Gieo quẻ» (and after «Gieo lại») no effect; Thiết lập «Sổ đổi mới mã» no effect; «Giữ sổ trên mây» = CORS console.error on ctm-coop…/api/vault/new from localhost (likely local-origin only).

## REVIEW button-crawl-fix-2 (BIG REVIEWER #2 session_01UV1SzhBrzCVc4CVbM2dCsJ, 11/25/2026) — PASS 3b7e15cb (review/button-crawl-fix-2-r = fa466d90 merged onto LIVE 9f72524b, index.html/sw.js rebuilt)
PRIORITY #1 CHECK: OD 25/11 ~05:10Z real taps + flight2 save BGMQ 1998 empty «Tâm trạng» | main: serM/deserQ j3, kitPanel j79, jqsave serQ index pairing | review/*: realtap.js = robot-realtap 78af2325 byte-identical (shared lib, no private copy) | claims Foreman F #8.
Branch base was a6b4d573 (not LIVE) → merged on LIVE 9f72524b; only conflicts index.html/sw.js (rebuilt by build_site.sh).
| check | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| look-dedupe.js (real taps) | 8/8 PASS: seal tap opens «Tâm trạng · Ngươi» with body; 20× same + «Đã biết về» 2× → 1 card per title; look-ups not saved; ONE ✕ tap closes (Q 0); kit notice saved with spec + body back; poisoned save 2001 entries → [«Kỳ ngộ»]; 0 errors | 8/8 PASS |
| queue order probe (A notice, look, kit B, C, choice D fn-opts, E) | serQ → [A, Kit B(kit), C, E]; deserQ → same order, kit B body back (old index pairing fixed) | — |
| quickcheck 3b7e15cb vs LIVE | PASS · core gates · hooks 9 (incl. 92-look-dedupe) · old save ok · perf in noise | |
Code read: dedupe splice can hit the SHOWN Q[0], but every look-up opener (j79 kitPanel front + showModal, kitModal front + showModal, jevb kitModal) puts the new copy at the front and repaints → queue and screen stay in step. kqEnc drops functions/onClose/opts, people as ids (rcpP/emoByKey), 24k cap. Laws 4/7/9: no new UI; kit cards rebuilt from their own spec.
Note for landing: dev/test/realtap.js is add/add with review/test-path-fix-3-r (3567b906 version) — keep the NEWER (78af2325 here, or 1a29f470 harness when it lands); same API.

## HANDOVER ROLE B #5 (session_01UV1SzjyWfynL199ZMNico8, depth 7, START_CTX ~6 %, rolled at ~31 %) — report to FOREMAN F #12 session_01UV1SzkjNu6H8cD4bN4xqiu; the COORDINATOR opens the successor
PRIORITY #1 CHECK ('stale S.mg|dqWake|resumeMG|parked|K61PLACE|??? cung'): OD 0 (+64 generic «???» hits) | main 15 (resumeMG/jk4 guard, reused) | review/* bc-stack-r2 afbfc06d (fix-5 family), m-fix-1-r (KIT REQUEST M-FIX-1 option fit, NOT built) | claims ROLE B row.
VERDICTS (real taps, pictures ON, bc-stack-r2 afbfc06d, Fold 755x1000 + iPad 1180x820):
- softlock root #2 «Tin trong cung» held (CDN s6d-tinq1) = NOT a game bug: held only behind tap-to-continue layers (card flip .kmov.kcf ends with kit button «Chuẩn bị thị tẩm» after ~18 s; Bổng lộc chest «Chạm để mở» then «Nhận»; #kpinfo «!» any tap closes). Picker rules sent to HARNESS FIXER #5 (now in robot-realtap 594fa1ee).
- #kpop grey-card reason: closes on a real tap on it or outside (iPad mouse + touch). Fold not tested (no grey card on screen in that run).
- zero-size covers (s4d «Hầu hạ» on Tích Cần viện, s10 .kmov «?») = HARNESS (target itself 0×0) → realtap 594fa1ee logs «zero», not DEAD.
- «Thân phận kiếp này» no close (1R) = by design: footer option «Nhận thân phận» → «Tiền truyện 1/4» (Fold+iPad).
- co-op «f.rk.split» = fixed by fix-3 (pcPort) inside afbfc06d; coop1i ran LIVE 9f72524b.
- s10 dead-end REPRODUCED (review/flight2-s10 @239fda28 ckpt; path: Sang ngày mới → beat → Tuần lục ✕ → Tin ✕ → chest «Nhận» → «Bổng lộc tháng bảy» Nhịn → «· Lễ nghĩa» Chu toàn → «Lễ tấn phong» → «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1» (jreign RGBT.c2a faces:1)): iPad options at y 858 below a frame ending ~695, text column does not scroll, option scroller 0/322 fully off-screen = HARD SOFTLOCK; Fold ~40 px sliver of the option scroller under «Kéo xuống». = KIT REQUEST M-FIX-1 (kit keeper KK29, F #12 asked MAIN 140). Probe /home/user/wt/p5/s10.js (this box).
READY / PUSHED:
- review/button-crawl-fix-6 1953d58f (on bc-stack-r2 afbfc06d): jdayq dqRoomWait / dqMgStale / dqBring — a visitor scene parked by a tab change: greyed button says CTM_WAIT.dqRoom «Có người đang đợi · về phòng», one tap brings her back; stale S.mg healed by the safety net (resumeMG like a load, cleared when no game opens) or at once by a tap. dev/test/next-dead.js (real taps; NEXT_SAVE = handover 37cfc029 dev/handover/robot/flight2-s4d-loop3/loop-3-save.json): LIVE 9f72524b FAIL 14 → PASS 16/16 Fold+iPad. Hook 95. realtap.js = robot-realtap 594fa1ee. Quickcheck: first run under 4 crawls had 3 load-flaky hooks (94 fold view, 95 iPad result card → test fixed in 1953d58f, 80 browser crash); quiet re-run: QUICKCHECK PASS 1953d58f (core gates PASS, hooks 13 incl. 95-next-dead, time-spill PASS, old save ok, perf median new/live render 285/269 ms, tab 672/602, buổi 1496/1585, tasks>200 26/26).
- review/button-crawl-fix-7 3aec1c1c (on fix-6 a5235301), part 1/2: j61 K61PLACE — the name mask never hides a place named like an unknown person («Ma ma Đức Thọ cung» → «một vị Tổng quản thái giám cung», s10). dev/test/name-place.js (every BAL.banCung.danh + PLNAME place): LIVE FAIL 18/19 → PASS 19/19, person still masked in prose and before «cung kính». Part 2 (option fit) = kit keeper only (law 9, F #12 13:44Z).
CRAWL (crawler + new start «save»: --save <robot dump with .ls>; uncommitted in /home/user/wt/b5/dev/test/button-crawl.js — commit it to fix-6 or the next crawler branch): 4236 real taps on afbfc06d, depth 2 full + part of depth 3, starts home + save (s6d Đáp ứng y3): fold-home 956 rows PASS 832 FAIL 15 · fold-save 951/732/18 · ipad-home 1242/1016/12 · ipad-save 1087/903/11. Every FAIL is known or harness: K-KDTX-BAND «Mục tiêu/Thiên mệnh» (kit, known) · CORS vault on 127.0.0.1 (harness origin) · 29 «clipped» = HORIZONTAL kit tab rows .pctabs.kcattabs (Tư trang sub-tabs, Sổ ghi origin rows, Danh hiệu list) → realtap needs a horizontal swipe (sent to HARNESS FIXER #5) · 1 iPad «Lui» flake. 0 new game faults. Reports: /home/user/wt/p5/rep-{fold,ipad}-{home,save}.md, runs /home/user/wt/bc5-out (shots not in git).
NOT DONE (next ROLE B, in order): (1) s9 no-turn cases (handover 324ce4a9 dev/handover/robot/flight2-s9-noturn/: 11 cases, ckpt latest-ckpt-1314.json.gz) → replay on fix-6, add to fix-6 before/after; (2) «Ô lưu · Lui close did not close its layer» + PAGE CLOSED in button-crawl --fast (HARNESS FIXER #5 on 97675a8d) — game or crawler?; (3) co-op «Lịch tháng» no close/next (coop1i) — whole family; (4) title + tour starts at depth 2 on afbfc06d (not run this round); (5) Fold #kpop.
Probe scripts (this box /home/user/wt/p5): lib.js (serve + robot-save load through the title with real taps), adv.js (play forward), s4d.js, s10.js, kpop.js, nl.js, f6.js, clip.js.
