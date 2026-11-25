# BIG REVIEW review/visitor-fix — ROUND 2 VERDICT: BIG PASS f4b8254c (review/visitor-fix-r6 = worker fe9eb3a9 + one reviewer small fix)

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
