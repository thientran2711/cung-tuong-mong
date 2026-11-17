PRIORITY #1 CHECK ('tuần lục.*(log|lặp|lần)|log.*pdl|dedupe'): OD 10 (OD:L921 every change logged with reason; OD:L933 week-book entry = one short past-tense sentence with cause) | main: jroute.js:49 rtOpen log, jstaff.js:123 Tống ma ma lines, jmen.js:200 thị vệ line, jts.js k61Meet | review/*: log-sync-r2 (live via merge-hot-1, number sync only), weekbook-entries-r1, act-dedupe (acts, not log) — none covers this | claims: none. Re-run at start of work: `prio1.sh "tuần lục lặp|rtOpen|logOnce|dedupe"` → OD 0 | ledger 0 | claims 0 | main 15 | review/* 2 (log-sync / act-dedupe, not this).

# tuanluc-sync — report (worker, opus) · branch review/tuanluc-sync

Owner bug 17/11 03:18Z + 03:22Z (OD tail, verbatim there). START_CTX ≈ 5 % of 1M window; finished below the 30 % rollover line, no handover needed.

## Root causes found (whole family)
1. **"9 lần" Lối riêng unlock** — `jroute.js rtOpen` stored `T.open=S.turn`; `S.turn` is 0 in the first month → `if(T.open)` read "closed" → the line was logged on EVERY render of Hành sự. Scan of the same bug shape (`x.flag=S.turn|wk()` then a truthy guard) over all game modules: 1 more family — `S.dKnown[v.id]=wk()` (week 0 = falsy; 6 files: j24, j28, j68h, j78, jts, jtwoway) → stored `wk()+1`.
2. **"Vết thương trên mặt đã lành, ngươi tháo mạng che" repeated (23× in a 4-life scan, and on every NEW life)** — `jvoice.js:98` kept its voice-line memory in `S.vl`, the SAME field as the worn veil (`jveil`). Every palace-voice line created `S.vl={…}`; `vlSync` saw a "veil" with no wound → logged the healed line and pushed the memory object into her chest; `vlMig` then re-made a veil from `scar.veil`. Fix: memory → `S.vmem`; `vmemFix()` migrates old saves (moves it out of `S.vl`, drops memory objects from `inv`); `vlSync` clears `scar.veil`. (Told main: worker newlife-reset should not redo this.)
3. **Important things only in the week book** — no path from log() to the screen. New `jlogbao.js` (outermost log wrapper): ONE class table `LOGBAO` (+ `LOGBAO_NOT`); class (a) lines are queued (`S.lbQ`, kept in the save) and shown as ONE kit notice (`kitPanel` kind notice, seal BÁO, `facts`) per buổi, max 5 lines + "Còn n việc nữa, xem trong Tuần lục", 0.7 s after the buổi settles; a line already on screen in the dialog she is reading is not repeated.
4. **Attribution (03:22Z)** — the j61 name mask runs before the line is stored, so the week book (`homeOf`) found nobody in "Một vị Quý phi chưa quen biết báo thị vệ…" and filed it on HER page. Now the outermost wrapper sees the RAW line and stamps `<i class="kw" data-w="name">` (first person named; staff elders only when they speak / "dặn thêm"); `j87 wkBookData` files the line on that person's page, or under "Triều đình · thiên hạ" when she has not met that person. Never on her page.
5. **Wording** — Lối riêng line now says what opened and where ("…tư tình với một nam nhân, trốn khỏi cung, xin rời cung (xuất gia, về quê) hay ẩn dật một đời an nhiên. Từ nay trong Hành sự có thêm nhóm việc «Lối riêng» cho những lối ấy."). j61 mask (`k61MaskP`): same stranger again → "nàng ta"/"y", another stranger → "một <chức> lạ mặt"/"một vị <phẩm> khác"; `lbTidy` on every stored line (same rule for lines built from pre-masked pieces, "Quý phi<badge>Quý phi" once, word glued to a badge gets its space, "Thị vệ một thị vệ lạ mặt" → "một thị vệ lạ mặt"); jmen "báo với thị vệ rằng …". jstaff "Hỏi chuyện" odds word "Chắc chắn" → "Nắm chắc" (VANPHONG). Trailing `”.` dropped in book entries.
6. **"n lần" chip** — kept only for real repeated acts; never on one-time lines, tips or spoken lines (“…”). Tống ma ma tips already rotate per pool with no repeat inside `BAL.voice.noRepeat` tuần (jvoice kLine); scan found 0 repeats in one tuần.

## Before / after (scripted lives, 12 tuần each, `node dev/test/tuanluc-sync.js 4 12`)
| measure | before (main 7abaf07ac) | after |
|---|---|---|
| one-time lines repeated in one life | 26 (3 lives: Lối riêng) + 23 (4 lives: veil healed) | **0** |
| clumsy masked lines ("chưa quen biết: Một vị … chưa quen biết", "Người lạĐáp ứng", "Quý phiQuý phi") | 6–7 | **0** |
| Tống ma ma tip repeated inside one tuần | 0 | 0 |
| BÁO notices during play | 0 (none existed) | 23 in 4 lives, **max 1 per buổi** |
| page errors | 0 | 0 |

## Call-site classification (`node dev/test/tuanluc-sites.js --md`, same table as runtime)
790 log() call sites · (a) shown at the moment 46 · (b) week book only 744. "a (her)" = the template opens with a filled-in name; it is (a) only when that name is her ("Ngươi …") at runtime. Page column: ta = her page; named = the person stamped at runtime; ? = no person in the template.
Class (a) rows below; every (b) row is in the full table the script prints (not pasted: 744 rows of routine results).
| call site | class | page | text (template, X = filled in) |
| j2.js:16 | a · người mới | named | X là người quen cũ, sẵn lòng che chở ngươi. |
| j4.js:70 | a (her) · phẩm vị | named | X bị phế, đày vào lãnh cung. |
| j8.js:64 | a (her) · phẩm vị | named | X bị giáng xuống X vì X. |
| j8.js:65 | a (her) · bị phạt | named | X bị cấm túc X tháng vì X. |
| j8.js:72 | a · phẩm vị | ta | Ngươi X, bị giáng xuống X. |
| j8.js:73 | a (her) · phẩm vị | named | X X, bị phế vào lãnh cung. |
| j8.js:74 | a (her) · bị phạt | named | X X, bị đày vào lãnh cung. |
| j8.js:75 | a (her) · phẩm vị | named | X X, bị giáng xuống X. |
| j24.js:49 | a (her) · bị phạt | named | X bị bắt vì mang thư lãnh cung, bị xử trảm. |
| j24.js:75 | a · nhắm vào ta | named | X, kẻ từng bị ngươi phạt oan, lén bán tin cho X. |
| j42.js:145 | a · bị phạt | ? | Bị quản sự bắt gặp: thêm một tuần phạt. |
| j42.js:199 | a · phẩm vị | named | Được thăng X. |
| j42.js:232 | a · bị phạt | named | X sai thái giám đánh ngươi hai mươi trượng. Sức -X. |
| j42.js:257 | a · bị phạt | ? | Bị phạt quỳ giữa sân. Sức -15. |
| j42.js:264 | a · bị phạt | named | X sai người phạt ngươi quỳ trên đá vụn. Sức -20. |
| j42.js:302 | a · phẩm vị | named | X: ngươi được phong X. |
| j42.js:382 | a (her) · bị phạt | named | X bị đánh bốn mươi trượng. |
| j54.js:220 | a · bị phạt | named | X vào cung quỳ xin cho mẹ; Hoàng thượng giảm cấm túc của ngươi một tháng. Mẫu tử -4. |
| j67.js:1265 | a · phẩm vị | named | Được thăng X (không qua khảo hạch). |
| j71.js:375 | b | named | a?X: ngươi ghi tên dâng XX.:X: ngươi không ghi tên. |
| j61.js:88 | a · người mới | ta | Ngươi đã quen biết X. X |
| jbal2.js:93 | a · bị phạt | ta | Ngươi bị bắt quả tang khi dò la X, bị đánh hai mươi trượng ở Thận Hình ti. Sức -X. |
| jroute.js:105 | a · luật phải biết | ta | Ngươi trả lại tín vật cho X. Từ nay mỗi người một ngả. |
| jroute.js:127 | a · nhắm vào ta | named | X tố ngươi tư thông với X; chứng cứ chưa đủ. Hoàng thượng quở trách, cấm y vào hậu cung. S |
| jroute.js:177 | a · bị phạt | ta | Ngươi bị bắt ngay ở cổng. Nhà ngươi bị liên lụy. |
| jroute.js:236 | a (her) · bị phạt | named | X bị phạt trước khi kịp mở miệng. |
| jroute.js:251 | a (her) · bị phạt | named | X bị đày vào lãnh cung. |
| jroute.js:375 | a · bị phạt | named | Máu hòa. X quỳ khóc kêu oan; ngươi mang tội vu cáo. |
| jcoopworld.js:665 | b | ? | arguments[0] |
| jhc.js:189 | a · người mới | named | Từ nay X lo chạy việc cho ngươi. |
| jpet.js:161 | a · bị phạt | ? | Vào lãnh cung, thú nuôi của ngươi bị Nội vụ phủ thu lại hết. |
| jpet.js:277 | a · người mới | named | X theo hầu ngươi. |
| jpetcare.js:56 | a · bị phạt | ? | Vào lãnh cung, thú nuôi của ngươi bị Nội vụ phủ thu lại hết. |
| jwhy.js:61 | a (her) · bị phạt | named | X bị bắt gặp khi dò la X: lòng -5. |
| jexam.js:154 | a · phẩm vị | named | Đỗ khảo hạch tấn phong X (X phần, mức đỗ X). |
| jexam.js:157 | a · phẩm vị | named | Trượt khảo hạch tấn phong X (X phần, mức đỗ X): chờ đến X mới được thi lại. |
| jexam.js:167 | a · luật phải biết | ? | Luật mới trong cung: từ nay muốn thăng phẩm phải qua khảo hạch tấn phong; đủ điều kiện chỉ |
| jexam.js:171 | a · phẩm vị | named | Lỡ hạn khảo hạch tấn phong X : chờ đến X mới được thi. |
| jexam.js:174 | a · mở lối | named | Được dự khảo hạch tấn phong X : X khảo, hạn đến hết X. Thẻ «Khảo hạch tấn phong» ở Hành sự |
| jexam.js:244 | a · phẩm vị | named | Được dự khảo hạch X : ma ma Nội vụ phủ khảo, hạn đến hết X. Thẻ «Khảo hạch Nội vụ phủ» ở P |
| jexam.js:247 | a · phẩm vị | named | Được thăng X. |
| jexam.js:251 | a · phẩm vị | named | Đỗ khảo hạch X (X phần, mức đỗ X). |
| jexam.js:252 | a · phẩm vị | named | Trượt khảo hạch X (X phần, mức đỗ X): chờ đến X mới được thi lại. |
| jexam.js:253 | a · luật phải biết | ? | Không được ở lại làm ma ma; đến tuổi thì xuất cung theo lệ. |
| jexam.js:261 | a · phẩm vị | named | Lỡ hạn khảo hạch X : chờ đến X mới được thi. |
| jexam.js:262 | a · luật phải biết | ? | Không được ở lại làm ma ma; đến tuổi thì xuất cung theo lệ. |
| jrcp.js:169 | a (her) · bị phạt | named | X quỳ nhận đã lỡ tay bỏ X vào, bị đánh hai mươi trượng. |
| jdh2.js:78 | a · phẩm vị | named | Hoàng thượng ban hiệu X: từ nay gọi là X. Danh +X. |

## Tests
- `bash dev/tools/quickcheck.sh` on the final sha: **QUICKCHECK PASS** · open 1080 ms · old save ok · perf new/live render 235/233, tab 298/276, buổi 907/1017 ms, tasks>200ms 12/11 · core gates PASS. (First run had buổi 1597/784 because the BÁO opened inside the buổi; it now opens 0.7 s after.)
- `node dev/test/tuanluc-shots.js <dir>` **PASS** on Fold 755x1000 + iPad 1180x820: old save with T.open=0 → 0 new lines; old save with T.open lost but line in log → 0; fresh unlock → exactly 1 line + 1 BÁO; stranger's report + elder tip → 0 on her page (stranger → "Triều đình · thiên hạ", tip → Tống ma ma's own page with her figure); 0 page errors.
- `node dev/test/tuanluc-sync.js 4 12` → `TUANLUC-SYNC lives 4 lines 1252 · one-time repeats 0 · clumsy masked 0 · tip repeats/tuần 0 · BÁO 23 (max/buổi 1) · errors 0`.
- Shots (CDN review folder `img/_review/tuanluc-sync/`): bao-fold, bao-ipad (kit notice BÁO "Việc đáng nhớ" with the unlock), book-ipad-2/3, book-fold-2/3 (Tuần lục pages: her page, Tống ma ma page, Triều đình page). Looked at: kit panel T2 (picture left, facts right), nothing cut.

## Kit
No new UI part: kit notice panel (`kitPanel` kind "notice", facts) and the existing week-book pages only. The marker `<i class="kw">` is empty, never shown.

## Open / notes
- LOGBAO is a regex table on the sentence; a new log text that changes her game but uses other words falls to (b) — add its words to LOGBAO (the site scan shows the class of every call site).
- "X không tin ngươi, sai đánh đòn" (j42:275) stays (b) (her punishment is already in that dialog).

## HANDOVER (worker rollover, 17/11 ~04:05Z) — NOT ready for review yet
START_CTX ≈ 5 %; context now ≈ START_CTX + 25 % → rollover per owner rule (OD:L1217, s14 option 1). Coordinator (main s29, session_01UV1SzjZSZnpbhRqnkyzg7p) opens the successor.
Done on this branch (a1b683cbb): items 1–5 above (one-time lines, BÁO during play, who stamp + attribution, wording, "n lần" chip), tests dev/test/tuanluc-sync.js / tuanluc-sites.js / tuanluc-shots.js, quickcheck PASS.
OPEN for the successor (main s29 order 03:52Z, read the OD tail 03:26Z–03:36Z + OD:L1458(3) VERBATIM first):
- (10) FIRST: rebase on it-key-guard 02561fca (or the batch-0232 tip) and DROP this branch's own S.vl→S.vmem migration (jvoice.js `vmemFix`, S.vmem; jveil.js vlSync `vmemFix` call). Keep only the extra cleanup on top, using batch-0232's field name and old-save move: vlSync clears `p.scar.veil=0` when it takes the veil off; drop nameless voice-memory objects from `inv`.
- (6) Delete the filler line j87.js wkBookData "Mấy việc vặt trong tuần chưa ghi riêng…" (+ same family). Find every code path that changes sủng / relation (aff/oán/ghen, e.g. Hoàng hậu ghen +6, close maid thiện cảm +3) WITHOUT a log() and give it a real cause line at the moment; replay rule OD:L921 must balance with 0 filler. Scan: filler count in a scripted 3-month life before/after = 0 (extend dev/test/tuanluc-sync.js).
- (7) Sổ ghi keeps EVERY KẾT QUẢ / BÁO / VIỆC card shown in full (title, text, Được/Mất/Kèm rows incl. 'Kèm 12 phi tần ghen thêm 1–3' + list, who). Scan: every card shown in a 3-month life has a matching Sổ ghi entry (0 missing). Hook point idea: wrap showModal/kitPanel (jlogbao already wraps showModal).
- (8) Overnight "Trong cung vừa qua" KẾT QUẢ card: each Được/Mất/Kèm row names its cause ("Ngủ một đêm: Sức +9", "Lâu chưa được gặp Hoàng thượng, ân sủng nhạt: Sủng −1"); other people's news in its own "Tin trong cung" block, never her headline. Same in Sổ ghi.
- (9) OD:L1458(3) canon: Tuần lục = literary sentence only (no Được/Mất number rows / chips in entries; the person relation table stays); Sổ ghi = full info (gains/losses/cause). j87 wkeEntry currently appends chips like "Sủng +7." — remove from Tuần lục, keep in Sổ ghi.
- Then one SẴN SÀNG KIỂM to s29 with a before/after table per item (1–10). Shots go to CDN img/_review/tuanluc-sync/ (6 files already there).


## SUCCESSOR #2 (session_01UV1SzhADWZHmWHmXNzN7eb, 17/11 ~04:00–04:55Z) — items 6–10 built, NOT yet SẴN SÀNG KIỂM
PRIORITY #1 CHECK: predecessor report (this file) | main bad6d59f it-key-guard j8 itClean (S.vl→S.vmem) reused | jlogsync.js (log-sync r1: lsSync per action for HER stats) EXTENDED, not rebuilt | review/* only review/tuanluc-sync.
START_CTX ≈ 5 %; rollover at ≈ 30 % (owner OD:L1217) — reached; handover below.

| item | before (main bad6d59f, `node dev/test/tuanluc-sync.js 2 12`) | after (this branch) |
|---|---|---|
| (10) rebase | branch on 7abaf07a with its own S.vl→S.vmem | merged origin/main bad6d59f; own vmemFix DROPPED (j8 itClean moves the memory; itCleanL drops keyless chest objects); kept only vlSync `scar.veil=0`; jroute conflict resolved (main kitChecks + `open!=null`) |
| (6) filler "Mấy việc vặt trong tuần chưa ghi riêng" | **280** lines in 2 lives | **0** (deleted in j87); jlogsync `rlSync` writes every consort / servant thiện cảm · oán · ghen change at the moment with the action as cause ("Múa trong yến tiệc: Lý Tần ghen +4, 9 người chưa quen biết thêm ghen ghét."); `rlTag`/`lsTag` name time-tick reasons. Scan: relation changes per action with no line naming the person = **0** (546 changes, 3 lives × 12 tuần) |
| (7) cards in Sổ ghi | KẾT QUẢ / dialog cards: 0 kept | S.cards (save, cap 60): every #rtoast KẾT QUẢ card (as shown, kit seal + .kb rows + kitKemRow) and every titled dialog (title, text, rows, Lựa chọn) shown in the Sổ ghi between the lines at its moment; kept out of S.logs so the replay / Tuần lục never count numbers twice. Scan: 886 cards shown, missing 2 (→ 0 expected after the outer resultShow hook; re-run) |
| (8) overnight card | headline = another consort's news; rows without cause | sentence dropped when there is news; rows "Ngủ một đêm: Sức 80→98 (+18)", "ân sủng nhạt dần: Sủng 23→22 (−1)"; others' news in its own row "Tin trong cung" (lines stamped about another person, not hers); Kèm unchanged (kitKemRow). OPEN: person rows ("Đáp ứng X: ghét ta hơn") often still lack a cause (whoWhy misses the rank-prefixed name) |
| (9) Tuần lục literary only | entries end with chips "Sủng +7." | wkeEntry prints no chips; wkeLit + last pass `litNo` strip every number from me / world / person lines; relation table stays. shots2 check: numbers in Tuần lục lines = 0 |

Tests: `node dev/test/tuanluc-sync.js 3 12` → one-time repeats 0 · clumsy 0 · BÁO max/buổi 1 · relation changes 546 (no cause line 0) · cards 886 (missing 2) · filler 0 · errors 0. `node dev/test/tuanluc-shots2.js <dir>` → PASS (night card found, Sổ ghi cards in the tab, filler 0, numbers 0, 0 page errors). "week-book residue" printed by the scan = j87 token sums vs the table (not shown anywhere now; pronoun lines like "nàng ghen +25" are counted on u.home) — informational.

## HANDOVER #2 → successor #3 (coordinator opens it)
1. Shots NOT looked at yet: tuanluc-shots2.js shoots while the scene interstitial ("Đêm không được triệu" / "Bình minh mùa xuân", "Chạm để bỏ qua") covers the screen — dismiss it (click the overlay / its skip) before night / soghi / book shots; then LOOK at night-*, soghi-* (kept card markup: .klk wrapper is a plain span, check seal + .kb rows render outside .rtoast), book-* on Fold 755x1000@2 + iPad 1180x820@2. Never commit shots; CDN img/_review/tuanluc-sync/.
2. Re-run `node dev/test/tuanluc-sync.js 3 12` (card miss should be 0) and paste the line.
3. Item 8 open bit: cause for person rows (j63 resultShow `whoWhy`: match the name without rank, e.g. v.name inside "Đáp ứng Tần Thục Nghi").
4. `bash dev/tools/quickcheck.sh` (perf: rlSync runs in every lsSync — snapshot is cheap, wkeTokens only when something changed; check buổi time), `python3 dev/build/assemble.py`, `bash dev/site/build_site.sh`, commit, push review/tuanluc-sync, then ONE "SẴN SÀNG KIỂM <sha> review/tuanluc-sync" to main s29 with this table.
Files touched: jlogsync.js (rlSnap/rlNote/rlSync/rlTag, lsTag relation reasons, wkSnap flush, wkBookData keeps bookkeeping lines), j87.js (filler gone → window.__wkResid, wkeEntry no chips, wkeLit, litNo, byName unique part-name, wkeNorm "X → ta: thiện cảm"), j63.js (overnight causes + Tin trong cung + lbCardRes call), jlogbao.js (S.cards, lbCardKeep, lbCardRes, showModal/renderPanel0 hooks), jveil.js, assemble.py, tests tuanluc-sync.js / tuanluc-shots2.js.
