# REVIEW maid-acts-a (OPUS BIG) — MAIN CHÍNH 91 · reviewer session_01Rc5AsKb5S4yXkQE8MAu4TW · 21/11

PRIORITY #1 CHECK ('maid-acts'): OD 21/11 ~03:15Z (L2108, 8 tabs, «cũng chả cần phải khóa», mapping «tôi sẽ báo bạn sau») + ~03:25Z (L2116, «Chủ tử», same layout) + 18/11 ~21:30Z (L1919, role parity per role) | main: no srv act table (git grep ROAD8.srv.acts → only review/maid-acts-a) | review/maid-acts-a 90931482 → 90c83c93 (worker merged 561e3f47) | claims: worker KzCE, this rv row.
START_CTX ~5 % (1M window).

## VERDICT: PASS → LAND READY **4cabe30f** (FF of main a2eb51cb; main moved on to e391b85f during the last gate run — e391b85f = maid-8tabs LAND + emo-balance/kit-info-fixed/kc-fail-effects; the land step re-merges LIVE as usual, generated files + assemble list only expected)
Branch review/maid-acts-a-rv = worker 90c83c93 (+ my identical merge of maid-8tabs-rv 561e3f47) + origin/main merged 4 times as main kept moving (1af8db13 → 74cea8bf → f3353128 → ce99b707 → a2eb51cb; each: assemble list = main's list + jroad8, index.html/sw.js rebuilt; one union slip that dropped jroad8 was caught by checking road8Acts in the build and fixed before any gate). Gates re-run on the final tip 4cabe30f (it carries map-places, which edits role-parity-scan.js, and econ-tamco, which edits consort act cards).

## What was checked (laws touched: 1, 2, 3, 4, 6, 9, 11, 16)
| check | result |
|---|---|
| ONE allowlist (law 4/9) | `ROAD8.srv.acts.rival` (jroad8) is the only source; `pcard` calls `road8Acts` innermost, so every wrapper's button passes it; no per-card copies. |
| consort acts absent (not greyed/locked) on maid Chủ tử cards | browser walk, Fold + iPad, every Chủ tử card × every card group: before filter 55 keys, after only `visit` + `k61:ask` (`see` when locatable); no 🔒, no disabled consort button. |
| unknown key absent by default | `keep()` returns "" for any key not in the table (incl. `?<data>`) — verified by code read + table-off negative proof (worker: 37 P-ONLY gaps; my walk: 55 keys before the filter). |
| consort road unchanged | `road8()===""` → `road8Acts` returns o untouched; consort rvCard keys = 58 (Kết giao, Tranh sủng, Ly gián, Mời đến cung ta … present). maid-8tabs consort line PASS. |
| law 1 two-way | role-parity ALONE ALL PASS (0 new gaps, open 13/13, promotion sets equal both sides, riseCore same numbers); her maid acts toward a consort stay in j42 srvTalk (Hành lễ thỉnh an · Mật báo · Tố cáo chủ trước Hoàng hậu) = NPC maid asOpts greet/betray/accuse. |
| law 2/3 kept acts | «Đến cung nàng (ta) thỉnh an»: cost khắc only, gain «gặp mặt»; where she may not enter, the existing access line shows «(chỉ khi chủ sai: chạm để xem cách vào)» and the tap opens the access BÁO (no khắc spent) — honest, same mechanism as the consort road. «Hỏi người hầu»: 1 khắc, odds word, result = knows who (verified log), fail = nothing lost. No number typed in jroad8 (law 4). |
| page errors tapping every card | 0 page errors: every Hậu cung sub-tab (Chí tôn 2, Chủ tử 10, Nam nhân 0, Đồng liêu 5–10) × every person × every group, + tapping every kept act on every Chủ tử card, Fold + iPad. |
| KEPT/ABSENT table vs code (script) | report keys vs runtime RVGRP + rvCard keys: 2 keys missing from the table — `takeaway` (Xin bế con nàng về nuôi) and `kframe` (Vu con nàng trù ẻo); code already hid them (allowlist). Reviewer fix: 2 rows added to reports/maid-acts-a.md. Now complete. |
| shots (scratch only, not in git) | Fold 755x1000 + iPad 1180x820: Chủ tử (her own chủ), Chủ tử (Hoàng hậu, not her chủ), stranger (Làm quen › Hỏi người hầu), Chí tôn (Hoàng thượng), Thái hậu, Đồng liêu (cung nữ), Đồng liêu (thái giám). Looked 3×: kit cards only, words cổ trang, no %, no lock, no cut text on the card. |

## Gates
- quickcheck 4cabe30f: PASS (median of 5: render 207/230, tab 492/471, buổi 1270/1375, tasks>200ms 20/19, core gates PASS, old save ok). Two earlier single runs (median of 3) failed on buổi only (3794 while my shot script ran in parallel; 4062 alone) and passed on rerun (1280, 1184/1512, 1270/1456) — box noise, as rv-maid-8tabs also saw (3998 once).
- coop-e2e tt + nc (live worker): 94/94 (on 6c9bda0a, d4ae87b1, 37371bc5 and 4cabe30f).
- maid-8tabs.js (Fold + iPad, old save from the LIVE main build of the time served locally, last a2eb51cb): 70/70 every run.
- role-parity ALONE: ALL PASS every run (0 new gaps, open 13/13). My card walk re-run on 4cabe30f: Chủ tử cards after the table = visit + k61:ask only (55 keys before), 0 page errors.
- old save: PASS (quickcheck + maid-8tabs).

## Notes for MAIN (not blocking)
1. FLAG (brief): Hậu cung › Chí tôn on the maid road still offers «Xin hầu cờ» / «Xin đánh đàn hầu ngài» (THÀNH «Sủng +2 đến +4, Ân tình +1» — a Sủng gain on a maid), «Dâng quà lên Thái hậu / Hoàng thượng», «Sang Đức Thọ cung thỉnh an». One line in `ROAD8.srv.acts` (key `p:Hoàng thượng` / `p:Thái hậu` card kinds, button keys `?kgmgo` `?kmemp` `?kgmgive`) closes them when she rules.
2. PRE-EXISTING (from maid-8tabs base, seen on every shot): the «Dạo này» row of Hoàng thượng / her chủ / Hoàng hậu cards on the maid road shows HER OWN entry log «Trong cung: Ta vào cung làm cung nữ, hầu … — Danh 8 → 2 (bị chê trách), Sủng 8 → 0 (Hoàng thượng phật ý), Bạc 60 → 8 (tốn bạc)» — wrong person's news, and the maid start reads as a punishment (consort start numbers wiped with blame words). Worth a small worker.
3. Owner words L2108 «phi tần là mình vẫn có thể tương tác được với họ mà … hầu như … y chang» — option A removes most consort acts on her road; it is MAIN's interim choice pending her mapping; the KEPT/ABSENT table is ready for her ruling.
