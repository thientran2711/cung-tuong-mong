# REVIEW r9 UPDATE (SMALL reviewer, 25/11 ~04:40Z): PASS e0594561 RETRACTED → FAIL / HOLD
LC13 reported dev/test/visitor-scene.js FAIL «grey silhouette on screen» (lower-rank «Đáp ứng» case only) on e0594561 2/2 and on its r9 merge 1/5. Reviewer re-run: base 7dbfe98a 0/10 FAIL; r9 tree (e0594561) 1/10 + 1/6 FAIL. Variants (each 14-16 runs of visitor-scene): A = K61SENT removed from k61Scrub 0/14; B = old k61Desc wording but K61SENT kept 3/14; C = K61SENT skipped inside #modal/focus 1/14; D = K61SENT only for the Sổ ghi hook 1/16. So r9b's K61SENT (j61 k61Scrub, also the j65 hook) is the suspect (race: the generic DOM scrub masks the visitor name before showModal makes her known → no face); the k61Desc wording alone is not. I did not isolate it fully; I missed it because I ran visitor-scene only after the PASS verdict was sent. Needs the worker: make the sentence rule not touch the visitor card/focus path, run visitor-scene ≥15× on both devices; my j65 Sổ ghi fix is still wanted.

# REVIEW r9 (SMALL reviewer, 25/11 ~02:40Z): PASS e0594561 (review/visitor-fix-r9-rv = r9 98a29b65 merged onto LC13 head 7dbfe98a + 1 reviewer fix)

PRIORITY #1 CHECK: OD 24/11 ~22:14Z + ~21:58Z read; r9 diff vs 42af6315 = j61 k61Desc/K61SENT, jhc/jne hint, know-notice + name-sentence tests, KIT_REQUESTS KK25.
Merge: r9 merges clean onto 7dbfe98a (only generated index.html/sw.js conflict → rebuilt with assemble.py + build_site.sh). origin/main moved to d6b6fd6f; LC13 head = 7dbfe98a (newest lc13 ref).
Found on shots: r9b fixed only the log() path. Sổ ghi rows stored with the raw name at world-gen (before S.known) were still chipped by j65 kitNames as «Quý phi ??? tâu xin Dục Khôn cung…» (Fold + iPad). Reviewer fix (j65:226): k61Scrub before kitNames → «một vị Quý phi tâu xin …».
Tests (e0594561 tree): know-notice Fold + iPad bad 0 · name-sentence PASS · greet-stranger PASS · name-mask-scan PASS 0 hits, page errors 0 · quickcheck started (see MAIN message for result).
Shots CDN img/_review/visitor-fix-r9/: r9-pair-unnamed.jpg (Fold | iPad: toast «Ta gặp một vị Thường tại.» on iPad; Fold shows the chip «Ta biết thêm 2 điều»), r9-pair-log.jpg (Fold | iPad Sổ ghi, no «???» in sentences).
Advisory (not blocking): (1) the scrubbed Sổ ghi row with a portrait icon starts lowercase «một vị Phi tâu xin …» (capitalisation attempt did not take; cosmetic); (2) iPad icon-row orphan word «cung.» = KK25 (KIT request filed by r9); (3) the named chip rows keep «Quý phi <tên>» (known people) — correct.
Pending wipes after LIVE: img/_review/visitor-fix, visitor-fix-r8, visitor-fix-r9.

# BIG REVIEW visitor-fix — MERGE r8: BIG PASS 42af6315 (review/visitor-fix-r8-rv = worker merge 814d272f + reviewer merge fix)

814d272f = review/viecnho-fix-r2 518aef86 + visitor-fix-2 0b4e1e65 (on BIG-PASSED a6f7715a). Ancestors OK: origin/main 502c48c9, 518aef86, a6f7715a.
Merge check (every line a6f7715a added to j61/j63 vs 502c48c9, kept/lost scan): all kept EXCEPT j61:214 hc relation hint, which went back to «Còn N phi tần ngươi chưa quen biết» (owner 22:14Z: never «chưa quen biết») → reviewer fix 42af6315 restores «chưa gặp mặt». j63 stranger-line search (a6f7715a regex) is replaced by flight-ui's kaWhyWho, which no longer reads stranger log lines — fine. kitNoUnk/«???» tag handling = flight-ui (tags keep «???», prose «một vị …», OD:L673).
0b4e1e65 (SMALL, worker): know notices in narration — «Ngươi gặp <một vị …>.», «<Title> xưng danh với ngươi.» — OK (closes advisory 3 for the toast voice).
Tests on 42af6315: quickcheck PASS (old save ok, core gates PASS) · coop-e2e 142/142 · visitor-scene Fold + iPad PASS · greet-stranger PASS · know-notice bad 0 · name-mask-scan PASS 0 hits · viecnho-fix.test ALL OK · viecnho-map.test 28 places ALL OK.
Shots (Fold | iPad): img/_review/visitor-fix/r8-pair-hi.jpg (Quý phi giá đáo, face + name), r8-pair-unnamed.jpg (toast «Ta gặp một vị phi tần áo bậc Thường tại.»; line «Tần thiếp thỉnh an tiểu chủ.»).

# BIG REVIEW review/visitor-fix — FINAL VERDICT: BIG PASS a6f7715a (review/visitor-fix-r6 = worker fe9eb3a9 + reviewer small fixes R6 f4b8254c + R7 a6f7715a)

R7 (a6f7715a, asked by MAIN 129): a visitor who comes to HER door to ask for an audience knows whose palace it is — npcLearn(v,S) on the door arrival; grLine drops «nàng chưa biết tên ngươi» when G.arr; the «Xưng danh đáp lễ / Khẽ gật đầu» name-reply options are not offered after a door arrival. Now: «Tần thiếp Quý nhân <tên> xin cầu kiến.» … «Ngươi khẽ nâng tay: “Miễn lễ.”»; equals «Hai bên chào nhau theo lễ.»
Tests on a6f7715a: quickcheck PASS (old save ok, core gates PASS, buổi 1201/3622 ms) · coop-e2e 142/142 · visitor-scene.js Fold + iPad PASS · greet-stranger PASS. Shot: img/_review/visitor-fix/r7-pair-lo.jpg (Fold | iPad, low-rank door visit, face + name, no «chưa biết tên»). The round-2 «advisory 1» is closed by R7.

## Round 2 (f4b8254c)

PRIORITY #1 CHECK ('visitor-fix'): OD 0 | ledger 0 | claims 1 (VISITOR-FIX session_01V1ZZH3EpiFUfjQmqdR8cmA) | main 0 | review/* review/visitor-fix, review/visitor-fix-r6 | archive 0.
f4b8254c793d9c108625d5d310fa1a08bf71a805 has origin/main 502c48c9 as ancestor (fast-forwardable).

## Round-1 FAIL items → round 2
| # | item | result |
|---|---|---|
| 1 | silhouette in the encounter scene | FIXED: jdfv showModal makes the visitor known, re-renders the stage and waits (≤4 s) for her real face. Reviewer scene runs (Fold + iPad, high + low): 0 unknown-fig on screen; the focus figure = her painting. The wait never strands the card (the poll always re-calls showModal; scene state w2/df open seen). Card losses seen in reviewer runs come only from the harness clearing Q while another modal was open (same on base). |
| 2 | voice of non-consorts | FIXED: one table grSelf/grAddr/grVerb: «Vi thần tham kiến Quý nhân tiểu chủ», «Nô tài thỉnh an …»; no «ngươi» inside quotes (visitor-scene test checks it). |
| 3 | «Tần thiếp» | FIXED (consort→consort «Tần thiếp», to HH/TH/Emperor «Thần thiếp»). |
| 4 | no personal name / descriptor in speech | FIXED: «Tần thiếp thỉnh an Quý phi nương nương», unnamed: «… thỉnh an nương nương / tiểu chủ». |
| 5 | arrival for every visitor | FIXED: met visitor card (gmReplyCard) starts with visitArrive + title; j24 AP kinds; j68 visit family (visitArrive / visitArriveK); higher visitor never gets the humble tone pools (gmSay). |
| 6 | door vs road | FIXED: door lines at home, «Phía trước có tiếng cung nhân xướng …» / «Có người rảo bước tới …» elsewhere; road-only lines removed from GREET_COME_HI. |
| 7 | repeated name + know-toast | FIXED: __k61noKn suppresses the toast for announced visitors; no second «nói tên mình». |
| 8 | small wording | FIXED (jtone_c, kitNameList «N vị phi tần»). |
| R6 | reviewer small fix (f4b8254c) | owner 22:08Z «người đó xưng tên ngay từ ở cửa»: round 2 had «Tần thiếp xin cầu kiến» with NO name → now «Tần thiếp Đáp ứng <tên> xin cầu kiến» (non-consorts «Vi thần/Nô tài <tên> …»); the follow-up line uses «Nàng». |

## Tests on f4b8254c / fe9eb3a9
quickcheck f4b8254c PASS (open 2091 ms, old save ok, core gates PASS, perf new/live render 223/218, buổi 991/1296) · quickcheck fe9eb3a9 PASS · visitor-scene.js 755x1000 + 1180x820 PASS (f4b8254c) · greet-stranger PASS · tone-pool 87 OK · coop-e2e fe9eb3a9 142/142 PASS (R6 is text-only) · name-mask round 1 PASS 40 s.

## Shots (Fold | iPad), CDN img/_review/visitor-fix/ (round-1 shots wiped)
r2-pair-df-hi.jpg (high rank, «giá đáo», face + name, card) · r2-pair-df-lo.jpg (low rank encounter scene, real face, «Tần thiếp Tần/Phi <tên> xin cầu kiến») · r2-pair-card-unnamed.jpg (stranger on stage: toast «Ta đã thấy mặt một phi tần áo bậc …; chưa biết tên», result «Tần thiếp thỉnh an nương nương/tiểu chủ»).

## Advisory (not blocking, for the queue)
- A lower visitor who came to HER door still «chưa biết tên ngươi» (greetName rule) — odd for someone who sought her out; consider making the visitor know her name (two-way).
- Focus-scene figure (KIT_FOC XL, ~398 px on both devices) is smaller than the stage figures (~430–570 px); owner said the visitor looked too small — kit keeper may check KIT_FOC size vs KIT_FIG.
- Stranger toast «Ta đã thấy mặt …; chưa biết tên.» is still notice voice (kit know-notice), not story.

---
## ROUND 1 (d60a0ec8) — FAIL, kept below for the record
## Round 1 detail: d60a0ec8 — FAIL (8 items, 2 blocking)

PRIORITY #1 CHECK ('visitor-fix'): OD 0 | ledger 0 | claims 1 (VISITOR-FIX session_01V1ZZH3EpiFUfjQmqdR8cmA) | main 0 | review/* review/visitor-fix | archive 0. Spec = OD rows «24/11 ~22:02Z real», «~22:08Z real», «~22:14Z real» (read verbatim) + brief visitor-fix.md (ADD, ADD 2) + worker report.
Reviewer: BIG REVIEWER session_01V1ZZH1BBdQ7Qp6VjTmSeoC. Base check: origin/main 502c48c9 is an ancestor of d60a0ec8 (OK).

## Shots (law 12, made by the reviewer; Fold 755x1000 + iPad 1180x820, each pair = Fold | iPad, looked at 3x)
CDN folder img/_review/visitor-fix/:
- pair-df-hi.jpg — Dư đồ encounter scene (kitFocus), HIGH rank visitor «Quý phi … giá đáo!»: iPad = GREY SILHOUETTE (Fold frame showed only the know-toast).
- pair-df-lo.jpg — encounter scene, LOWER rank visitor «Thần thiếp Tần …, xin cầu kiến»: GREY SILHOUETTE on BOTH devices.
- pair-card-hi.jpg — modal card path, high rank visitor: face + name at KIT figure size (OK), text shows F3/F4.
- pair-card-unnamed.jpg — stranger greeted on the stage: toast «Ta đã thấy mặt một phi tần áo bậc Quý nhân; chưa biết tên.»; result line (log) «Ngươi hành lễ: “Thần thiếp … thỉnh an một phi tần áo bậc Quý nhân.”» (F4).
Overlay: chest #kmrew removed + «Vào cung ngay» tapped until the loader is gone (scripts in reviewer scratch, not in git).

## Tests
| test | result |
|---|---|
| quickcheck.sh | PASS (open 2035 ms, old save ok, core gates PASS, perf new/live render 228/227, buổi 1478/2398) |
| greet-stranger.js | PASS (table), but its line column shows F2 + F4 |
| tone-pool-check.js | 87 pools OK |
| name-mask-scan.js 755x1000 | PASS 0 hits, 1100 log lines / 27 months, **40 s** — no hang; the worker's >330 s timeout was box load (parallel runs), not the code |
| coop-e2e.js (A Fold host + B iPad guest, live Worker) | PASS 142/142 (175 s), host + guest ledgers equal, rebirth 1.3 s |

## FAIL list (fix all; whole family each — LUẬT SỬA CẢ NHÓM)
1. **BLOCKING — item (3) not fixed on the owner's path: the encounter scene still shows the grey silhouette.** When the visitor stands on the place stage (she was a stranger when the stage rendered), jdfv's showModal wrapper opens kitFocus with `dfFig(i)` = the EXISTING stage token img = `img/kit/unknown-fig-f.webp` (h 399 px, smaller than KIT_FIG ~430–570). `visitSeen()` runs inside gmCard/gmReplyCard AFTER that render, so the token is never refreshed. Reproduced Fold + iPad, high + low rank (pair-df-*). Fix: make the visitor known (visitSeen) before the card is queued (gmWatch before Q.push; AP_MK / e68 before show) and refresh her token/figure before showModal, or let the focus resolve the figure through the kit known test at open time. Add a test: stranger on stage → gmCard → showModal → focus figure is not unknown-fig and is KIT_FIG size, both devices.
2. **BLOCKING — wrong voice for non-consorts (law 1 + VANPHONG):** grLine «hers.w==="low"» branch gives men/officials/eunuchs/physicians «Thần thiếp» and «ngươi» inside quoted speech: «Đại tướng quân Trình Thành Ngọc hành lễ: “Thần thiếp thỉnh an ngươi.”» (same for Tể tướng, Thị vệ, Thái y, Thái giám KSP — greet-stranger output). Fix: self-address + address from ONE table by kind and rank (quan «Vi thần», thị vệ/thái y «Thần»/«Vi thần», thái giám/cung nữ «Nô tài»/«Nô tỳ», lower consort «Tần thiếp»; address «nương nương» / «tiểu chủ» by her rank). Never «ngươi» inside a quote.
3. Owner's words «Tần thiếp … xin cầu kiến» (OD 22:08Z) are not used: visitArrive and grLine say «Thần thiếp» consort→consort. «Thần thiếp» only toward Hoàng thượng / Hoàng hậu / Thái hậu; consort→higher consort = «Tần thiếp».
4. Speech addresses people by personal name or by the fog descriptor: «Thần thiếp Đáp ứng X thỉnh an Quý phi Yến Nghiên Thu.», «… thỉnh an một phi tần áo bậc Quý nhân.» Cổ trang speech = title + «nương nương» (e.g. «Tần thiếp tham kiến Quý phi nương nương»); the descriptor is narration only, never spoken.
5. Family incomplete (item 4 + ADD 2, law 1 two-way): only the FIRST-meeting greet card has the arrival line. A met visitor (gmOpts health/praise/gossip/secret/warn/provoke) opens with bare name and a rank-blind tone line: «Uông Diệu Hoa hỏi thăm ngươi mà chẳng dám nhìn thẳng.», «… đỏ mặt khen tài nghệ ngươi, rồi xin ngươi chỉ dạy.» (a Quý phi to an Đáp ứng). j68 fam "visit" (e.g. visit-001 «{A} đặt hộp …») got visitSeen only, no arrival line. Fix: every «Có người đến» / visit card starts with the arrival stage line once, name with title; the GREET* pools pick by rank direction like GREET_COME_HI.
6. Place: visitArrive always says «Ngoài điện có tiếng xướng» / «Ngoài cửa có tiếng thưa», but AG-MEET (gmWatch/gmPlaces) fires wherever she stands (garden, other palaces). Door lines only at her residence; elsewhere a road line (e.g. «Phía trước có tiếng thái giám xướng: “Quý phi nương nương giá đáo!”»). GREET_COME_HI also mixes road lines («chặn ngay đường ngươi đi», «hỏi cung nhân ngươi là ai / ở cung nào») that contradict a visitor at her own palace — choose by place.
7. Repeats / system notice next to the scene: after «Thần thiếp Đáp ứng X, xin cầu kiến» grLine says again «Đáp ứng X nói tên mình.» (G.arr should drop it); and the kit toast «Ta biết tên: đó là Quý phi X.» (j61:119 kitKnow) pops right after «Quý phi X giá đáo!» — same «Ta đã biết: đó là …» voice the owner rejected (v12). Suppress it for a visitor announced at the door, or say it as story.
8. Small wording: jtone_c «rơm rớm nước mắt, vẫn một lời cảm tạ ngươi» (no verb) → «vẫn nói lời cảm tạ ngươi»; kitNameList bare «N vị» («3 vị: quý ngươi hơn», «Hòa Chương hiên: 1 vị») → «N vị phi tần» / role noun (OD 22:14Z «một vị phi tần»).

## Laws touched
1 two-way: FAIL (5, 2). 7 cổ trang wording: FAIL (2–4, 8). 9 KIT FIRST: OK (no new part; figure via pv()/kit; the bug in 1 is wiring). 11 whole group: FAIL (5, 6). 12 two devices: shots made by reviewer, FAIL shown on both. Save/old save: quickcheck old save OK; no BAL/save change. 4 ONE CORE: no numbers added — OK.

---
## HANDOVER (BIG REVIEWER session_01V1ZZH1BBdQ7Qp6VjTmSeoC, 25/11 ~02:16Z) — context 40 % > START+25 % → rollover; the coordinator opens the successor
Done: BIG PASS a6f7715a → r8 merge BIG PASS 42af6315 (j61 «chưa gặp mặt» restored) → LC13 step 10 7dbfe98a confirmed (dev/build+dev/test tree = my clean merge of 42af6315 onto 4232709a, hash 8ba7d7fd; build fresh).
OPEN (not started): MAIN 131 asked a SMALL review of review/visitor-fix-r9 98a29b65 (on 42af6315): «Ta gặp một vị Thường tại», «Một vị Phi tâu xin …» in sentences (??? only on tags/chips/stat rows), «Còn N phi tần chưa gặp mặt»; FRESH Fold 755x1000 + iPad 1180x820 shots of the stranger toast + Sổ ghi rows with unmet subjects → CDN img/_review/visitor-fix-r9/; merge-check on the newest LIVE/LC13 chain head; verdict → MAIN 131 + LC13.
Shot tools (copied here, run with NODE_PATH=$(npm root -g) from a worktree with dev/index.html built by python3 dev/build/assemble.py):
- rv-visitor-fix-tools/stranger-toast-shot.js <dev/index.html> <outdir> → <outdir>/{fold,ipad}-unnamed.png (stranger greeted on stage: toast + result line).
- rv-visitor-fix-tools/solog-shot.js: copy into dev/test/ first (it reads ../measure/inpage4.js), then node dev/test/<it> dev/index.html 755x1000 <prefix> → <prefix>-log.png = Sổ ghi with 3 unmet subjects (Một vị Quý phi sang cung … / một vị Tần nói xấu …); run again for 1180x820.
- rv-visitor-fix-tools/df-scene-shot.js <dev/index.html> <outdir> <tag> (env SCS=hi|lo, DEVS='[["fold",755,1000]]') → visitor encounter scene/card shots.
Harness traps: tap «Vào cung ngay» until «Sửa soạn nhập cung» is gone and remove #kmrew (scripts do it); a queued card can vanish when a test closes another modal programmatically — same on main 502c48c9, re-run instead of failing. Pair: convert A -resize x900, B -resize x900, +append; upload with python3 dev/site/cdn_sync.py img/_review/<topic> from a worktree. Pending wipes after LIVE: img/_review/visitor-fix + visitor-fix-r8.
Open advisory: focus-scene figure ~398 px < stage KIT_FIG (→ KK24); Sổ ghi «Phi ??? tâu xin …» name-chip rows (r9 addresses it).
