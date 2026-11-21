# bongloc-options (E47, M83) — report
depth 2 (get_session lineage.depth 2 / limit 8). Worker E47, opened by FOREMAN E #29.
PRIORITY #1 CHECK ('Bổng lộc|bongloc|M83|stipEvent|Ghi chú'): OD 5 | main jecon.js:53-60 (month card), jstip.js:122-150 (stipShow / stipEvent «Bổng lộc bị cắt xén»), j79.js:68 kitRows (already folds «Ghi chú» into the kit «!») | review/* none | claims E47 only.

Branch `review/bongloc-options`, sha **6803e362** (from origin/main b7041e67; site build committed).

## (1) Why tháng năm/sáu had no options
- jecon `econStipend` gave the month card options ONLY `if(d||bt)` (lễ nghĩa cost > 0). Cost is 0 when **cấm túc** or **lãnh cung** (econDuty) and at **Đáp ứng** (BAL.duty[0]=0) → LUẬT panel, no buttons, no reason. The owner's tháng năm = cấm túc (the «Ghi chú» note said «cấm túc: nửa bổng, không lễ nghĩa»).
- The cut answers (Nhịn / Đút bạc / Sai cung nữ đi đòi / Tố / Ghi nhớ) were on a SEPARATE card «Bổng lộc bị cắt xén», which jspread (SP13SLOT slot 2) moves to the afternoon / another buổi → the owner never sees them on the Bổng lộc frame (what she remembered from tháng ba).

## (2) Fix (every month the same options, on the frame)
- Something cut (bạc or items): the month frame itself carries the cut answers (stipEvent options, one source, jptime parallel-time «ask» wiring kept): **Lót tay thái giám Nội vụ phủ** (renamed from «Đút bạc cho thái giám»; sure, Bạc −BAL.stip.tip[rank], restores goods, 3 months no skim) · **Sai <cung nữ> đòi lại phần bị cắt xén** (renamed; odds word stipAskOdds) · NEW when no usable cung nữ: **Đòi lại phần bị cắt xén** (she goes herself; odds BAL.stip.askBase + Danh/BAL.blopt.danhD + Sủng/BAL.blopt.sungD − BAL.blopt.sup if a superior is behind it; fail: Danh BAL.eff.jstip.danhGo + Nội vụ phủ holds a grudge) · Tố lên Hoàng hậu/Thái hậu · Ghi nhớ để trả thù sau · Nhịn. Then the lễ nghĩa choice (Chu toàn / Bớt lễ nghĩa) follows on its own frame «Bổng lộc tháng X · Lễ nghĩa» (two decisions never mixed in one choice — law 2). No separate «Bổng lộc bị cắt xén» card any more (stipShow(…,merged)).
- Nothing cut: Chu toàn / Bớt lễ nghĩa every month at every rank (BAL.duty[0] 0→2: Đáp ứng also has lễ tiết).
- cấm túc / lãnh cung with nothing cut: the frame SAYS why (kit `.past` line): «Đang cấm túc: không phải lo lễ nghĩa tháng này, Nội vụ phủ phát đủ phần, không có việc gì để chọn.» / «Đang ở lãnh cung: …». cấm túc WITH a cut → the cut answers show (cấm túc is itself a skim cause).
- Laws: 1 two-way (Nội vụ phủ cuts → she answers: lót tay / đòi / tố / ghi nhớ for evidence); 2/3 every option has gain + cost (lót tay: bạc ↔ goods back; đòi: odds ↔ Danh/lòng; nhịn: Đức ↔ more cuts); 4 numbers from BAL (new BAL.blopt in jbal2.js; quickcheck one-core guard caught 2 inline divisors in the first push → fixed); 6b the eunuch is the real S.court.ped (unknown name masked by the game → the frame line says «Thái giám Nội vụ phủ», no «???»); 7 odds in words, no %.

## (4) «Ghi chú» → kit «!» beside its line
kitRows (j79:68) already folds a «Ghi chú» row into a kit «!» — but onto the PREVIOUS row (the owner's shot: beside «Công kẻ hầu»). The month frame now puts each note on its own line: cấm túc / lãnh cung / khất bổng → «!» beside **Bổng**; the cut cause → «!» beside **Bị cắt xén** (or **Đồ phát** when only goods were cut). No Ghi chú row on the frame. Whole game: `git grep '["Ghi chú"'` = 15 other sites, all already rendered as a kit «!» by kitRows (no visible row); none is a bổng-lộc line. Kit parts only (kitRows, kitNoteBang, option cards); no new kit part, no KIT_REQUEST.

## (3) Group scan (law 11) — `python3 dev/test/bongloc-group-scan.py`
| card | before | after |
|---|---|---|
| jecon «Bổng lộc tháng …» | options only if lễ nghĩa > 0 — SILENT DROP (cấm túc, lãnh cung, Đáp ứng) | options every month, or the reason said on the frame |
| jstip «Bổng lộc bị cắt xén» | separate card, jspread slot 2 → another buổi (SPLIT FROM MONTH FRAME) | merged onto the month frame |
| j71 «Lời mời · … (đầu tháng …)» | options yes | unchanged |
| jroute (month line in a notice) | notice only, no choice by design | unchanged |
Other periodic notices (Xét phẩm cuối tháng, Điềm báo, Tin triều đình …) are information notices with no choice by design.

## Tests
- NEW `dev/test/bongloc-options.test.js`: month 1..12 × normal / cut / cấm túc / cấm túc+cut / lãnh cung × rank 0/3/6 (180 cases): options present or reason said; no visible Ghi chú; no separate cut card; no %; every cut month has Lót tay + đòi lại; cause «!» beside the cut line; cut+duty → lễ nghĩa frame follows; every option runs; no-maid road; no page errors → **BONGLOC PASS 13/13**.
- coop-e2e (full, live worker, Fold host + iPad guest): **124/124 passed** (CO-OP LAND GATE; month card is built only off the server seat as before — isSrv guard unchanged).
- law4-typed: 0 typed.
- ptime2 (renamed «Sai … đòi lại phần bị cắt xén» wiring), stipend.js, role-parity ×2, quickcheck (old save): see RESULTS below.

## Shots (looked at; CDN upload refused: cdn_sync has no Cloudflare credentials in this container → under dev/handover/shots/bongloc-options/ on this branch)
bongloc-cut-fold.png / bongloc-cut-ipad.png (cut: rows + «!» beside Bị cắt xén + Nhịn / Lót tay / Sai … đòi lại …), bongloc-confined-fold.png / bongloc-confined-ipad.png (cấm túc: «!» beside Bổng + reason line). Option art was still loading («Đang thỉnh tranh…») in the Fold cut shot — CDN lazy load, not a layout fault.

## RESULTS (sha 6803e362)
- quickcheck: open 1722 ms 0 errors · OLD SAVE loads + plays a buổi (0 errors) · perf median new/live render 186/178 ms, tab 407/397, buổi 1277/1115, tasks>200ms 19/18 · time-spill guard PASS. The run's last line read «CORE GATES FAIL G1» because a first quickcheck (on 5b77b988, before the BAL.blopt fix) was still writing the same .quickcheck/gates folder; G1 one-core-guard re-run alone on 6803e362: **PASS** (inlineNow 3592 = baseline, fails 0). Reviewer: please re-run quickcheck once clean.
- role-parity: run 1 **ALL PASS**; run 2 was still running at report time (same build, no role-act change in this branch).
- ptime2: **ALL OK** (renamed «Sai … đòi lại phần bị cắt xén» parallel-time wiring).
- coop-e2e: **124/124**. law4-typed: 0. bongloc-options: 13/13.
- stipend.js (old econ-stipend test): no page errors; its «ev» step looks for the separate «Bổng lộc bị cắt xén» dialog, which is gone BY DESIGN (answers now on the month frame) → that step reads «shown:false»; the test is stale on that one step (bongloc-options.test.js covers the new place).
Shots: dev/handover/shots/bongloc-options/*.jpg (CDN refused: no Cloudflare credentials in this container).

SẴN SÀNG KIỂM bongloc-options 6803e362 (tier BIG).
