# REPORT act-merge-J2: harm / scheme / accuse doors P5–P14 (opus worker, child of MAIN CHÍNH 155)

PRIORITY #1 CHECK ('act-merge'): OD 1 (26/11 ~07:25Z + ~07:32Z, read verbatim via the plan) | ledger 0 | claims 2 | main 0 | review/* review/act-merge e50465e1 (plan, REUSED: §2 G1–G3, §4 row J2) + review/dup-report 87b41ef2 (HANHSU_MERGE §3.1 P5–P14, §3.4 old act → new home, REUSED unchanged) + review/charge-evidence 4f2963cb (BAL.charge, NOT live: see LIMITS) | archive 0.

Branch **review/act-merge-J2**, head = see the «LAND READY» message (base LIVE 3af7896e merged). No kit part added or changed (the chooser = the existing kit option dialog pushDil → kitOptFinal cards, KIT §6.2b; the tier row = text in the dialog head). No new number (law 4): every option shows the OLD button's own line.

## What changed (one feature = one button, ways + tiers inside, every outcome kept)
ONE table `DOOR` in dev/build/jdf.js = which old act lives in which door, at which tier, as which kind (rep / roll / way / hide):
| Door | nhẹ | vừa | nặng | ways (keep own price, odds, outcome) |
|---|---|---|---|---|
| P5 Dò la | — | — | — | Dò la (sai tai mắt) · Mua chuộc cung nữ · Sai cung nữ thân tín lấy lòng · Nghe lén câu chuyện (pop-up) · «Tự đi dò la» folded (hide, MAIN 153 / OD ~05:35Z) |
| P6 Khiêu khích (pop-up) | Khoe quà ngự ban | Khiêu khích (+ Trút giận way) | Hạ nhục | — |
| P7 Hãm hại | Hắt trà (roll: Hắt nước · Quạt mực · Ngáng chân) | Hủy dung (roll: Bỏ phấn lạ) | Hạ độc | Thả thú dữ (vừa) · Hạ độc dần · Tặng quà ăn có độc · Đẩy xuống hồ sen (nặng) |
| P8 Hạ uy thế | Tung tin đồn | Rút thẻ bài | Vu oan | Nhờ ơn người quen · Ly gián (vừa) · Cài đồ vào rương · Giá họa trộm đồ · Xin Hoàng hậu giáng (nặng) |
| P9 Hại hoàng tự (only with a child / pregnancy) | Phá việc học | Bỏ xạ hương | Hạ độc con nàng | Vu con nàng trù ẻo (vừa) · Mua chuộc bà đỡ · Đẩy con nàng xuống hồ (nặng) |
| P10 Lấy của | Ép nộp của | Sai người lấy trộm đồ | Phóng hỏa kho đồ | Sai cung nữ thân tín lấy đồ · Trộm thú nuôi · Hại thú nuôi (vừa) |
| P11 Tố cáo | — | — | — | Tố giác · Tố tội thật · Bóc chuyện tư tình · Tố xa xỉ · Hặc ăn mặc sai phẩm · Trình Hoàng hậu · Trình Thái hậu |
| P12 Mặc cả chứng cứ | — | — | — | Uy hiếp đòi bạc · Bán cho phe khác · Trả chứng cứ lấy lòng |
| P13 Quyền Hoàng hậu (rank 7) | — | — | — | Xử tội · Tịch thu · Ban thưởng · Ân xá · Khất bổng lộc · Xin bế con nàng về nuôi |
| P14 Ra uy | Tát | Phạt quỳ | — | — |
roll = §3.4 «roll»: the tier offers ONE act, picked among rep + rolls that can run now, fixed per target and buổi (doorPick), so the card she reads is the act that runs.

How (files, all owned by J2): **jdf.js** — DOOR / DOOR_M / doorOf; outermost `rvGroups` wrapper folds the card's member buttons into door buttons; `doorPop` for the pop-up; `PEND.door` = the kit option dialog; each option runs the OLD click path (`doorFireAct` = jsgame scheme game → doAct + every wrapper: j70 chains, jtamco ways, jslap / jlooks games, jptime sends; `talk(oi)` by option name; `empAct`); option rows = the old button's raw kit line read back from its rows (`doorRaw`); dfActs marks doors class D and folds the in-person acts (Tát, Phạt quỳ, Hắt …) into their doors; from the person view the door closes the view first (jdayq gate (c) takes back any centre card painted inside it); door dialogs skip the once-per-life «Kiếp này chưa trọn» gate (the old buttons never passed it; it read the sent servant's «bị đánh chết»). **j15.js** — popCard asks `doorPop` (skip members, add doors to their kit group). **jagharm.js** — `haDoor(k)` = doorOf(k) on every NPC harm option (two-way, same door + tier). j8 / j25 / j30 / j92 / j9 / jlooks / jcharge / jtruth: NOT edited — not needed (keys, deeds, prices untouched; jtruth deed kinds unchanged by construction: every option runs the same ACT key).

## Before / after (dev/tools/act-inventory.js on LIVE 6b5d3d05 vs this branch; Fold 755x1000; + dev/test/act-merge-j2.js T5)
| Screen | Before | After | Note |
|---|---|---|---|
| Hậu cung › consort card | 46–55 on one card (60 distinct) | 11–12 on one card (17 distinct) | 8 doors + J1's Gặp mặt 5 / Giao thiệp 3 (+ Làm quen gate) |
| Hậu cung › Hoàng hậu card | 51 | 16 | + Quyền Hoàng hậu door |
| Dư đồ › tap a consort | 24–32 (37 distinct) | 19–22 (23 distinct) | harm side done; the rest = J1's talk side |
| Dư đồ › Hoàng hậu | 11–12 | 9–10 | Khiêu khích + Hãm hại nhẹ in doors |
| Dư đồ › same-palace consort | 9–11 | 6 | Hắt / Tát / Phạt quỳ → Hãm hại / Ra uy |
| focus tabs, real tap Fold | «Giao thiệp 19/22 · Mưu kế 3/3 · Hại người 4/4 · Trừng phạt 1/1» | «Giao thiệp 12/15 · Mưu kế 3/3 · Hại người 1/1 · Trừng phạt 1/1» | |
Prints: scratch only (before.txt / after.txt), re-run: `node dev/tools/act-inventory.js <out.json>`.

## Tests
- `node dev/test/act-merge-j2.js` (new): T1 no member left outside its door, every member the old card showed reachable · T2 every card option fires the SAME old key · T3 pop-up: no door option outside its door, every option fires talk() on the same name / doAct on the same in-person key · T4 two-way: every door ACT key is run by NPCs (BANDS ∪ HA_VAR − HA_NO, tieuhuy = jagharm help), haDoor = doorOf · T5 counts. **PASS T1–T4, 0 page errors** (4 scenarios × every consort, before and after merging LIVE 3af7896e).
- `node dev/test/shown-odds.test.js` (updated: a door member's word is read from its door option card): **90/90** shown == rolled (one earlier run 84/87 on plant-here = the test's random state; live 88/88; re-run 90/90).
- Real taps (repo device lib, HOST mode): Fold 755x1000 + iPad 1180x820 — card: Hại người tab → Hãm hại → dialog (Hắt nước · Hủy dung · Thả thú dữ · Hạ độc · Hạ độc dần · Tặng quà ăn có độc · Đẩy xuống hồ sen) → Hủy dung → the existing «Bày mưu» chain → result card; Hạ uy thế → Tung tin đồn → the existing «Tự ra tay / Giao cho người làm» way card → result. Pop-up: tap a consort at Ngự hoa viên → person view → Hại người / Mưu kế tab → door → view closes, kit dialog opens (Fold + iPad).
- Videos / shots (CDN, review folder): img/_review/act-merge-J2/fold-card-popup.webm · ipad-card.webm · fold-popup-door.png · ipad-popup-door.png (https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J2/…).

## LIMITS / for the reviewer
- Tố cáo by charge: BAL.charge / jcharge (review/charge-evidence) is NOT live. The P11 door holds today's accuse keys; when charge-evidence lands, its own changes to accuse / judge (chOK, chNeedTxt) show through the door unchanged (same keys, same lines). The «choose the charge» list inside P11 then = a small follow-up on the door (no file conflict: charge-evidence edits j8/j15 rvGroups base, J2 wraps outermost).
- J1 stack: J1's branch was not pushed yet when this report was written; J2 merges J1's head when MAIN sends the sha (popCard grouping is J2's; J1 asked to keep the P5–P14 talkOpts names, sent to MAIN 155).
- A door option card shows the old act's own rows; the tier word sits in the dialog head («Nhẹ: … · Vừa: … · Nặng: …»), not as a row (no new kit part).
- dev/test/dress-offence-shots.js (a shots script) clicks `button[data-a="xx"]` on the card: that button now lives inside Tố cáo; the script needs the door tap first (not a gate test).
- No new art: door buttons use the category pictures (kpActArt by name; «Hãm hại» etc. have no own picture yet → Foreman C if wanted).

## Handover (if a successor is needed)
Worktree /home/user/wt/j2 (sparse); scratch harness /home/user/wt/j2-s (r2.js real game, tap3/tap6/vid.js). Remaining: merge J1 head when MAIN sends it → rebuild → `node dev/test/act-merge-j2.js` → LAND READY.
