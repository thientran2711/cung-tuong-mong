# ACT-MOVE plan — Hậu cung = info only; person acts move to Dư đồ meet + Hành sự (worker ACT-MOVE for MAIN CHÍNH 168)

PRIORITY #1 CHECK: OD L1152 (tap a person on Dư đồ = small kit pop-up, never jump to Hậu cung) + L1153 (split) + 26/11 ~05:xxZ/07:32Z (one feature = one button; merge only true duplicates) + 27/11 00:13Z/00:15Z (no new layer) + 00:26Z (few Emperor moves) + 00:32Z (this ruling) | main a22cf45d: jdf.js:35 dfInPerson + jbaldf.js:11 `BAL.df.inPerson` (the existing pipe that moves Hậu cung ACT keys into the stage pop-up), jdoor.js:182–197 doors P5–P14 (kinds `card` = Hậu cung only), j15.js:36 RVGRP/rvGroups, jgift.js:159 courtMeet + :200 KM_EMPACT, jhc.js:183 court «Việc hôm nay» (= copies of Hành sự deck cards), jpcf.js:66 «Việc nhanh», jdfv.js:49 dfOpen, jpdlg.js kitPersonDlg (§50.2) | review/*: act-merge-J0…J5 + act-merge-ALL(-fix) are on LIVE (inventory reused: dev/tools/act-inventory.js, re-run on a22cf45d, 0 page errors), greet-meet/place-card/place-close = stage/place pop-ups only, no act move | claims: KK51-P review/kit-person-panel owns the panel LOOK (not touched here); no emperor-favour plan from Foreman C on the handover branch yet.

## 1. Inventory (LIVE a22cf45d, scan + code) — acts that are reachable ONLY outside Dư đồ/Hành sự today
| Act (button) | Today | New entry (Dư đồ meet pop-up = dfActs; Hành sự = same pop-up for people at her place) |
|---|---|---|
| Lấy của (P10: bắt nạt, lấy đồ, trộm/thả thú, phóng hỏa) | Hậu cung card only (door kind `card`) | Dư đồ pop-up of that consort, tab Hại người (door kinds + `rival`,`hh`) |
| Mặc cả chứng cứ (P12: uy hiếp, bán, tiêu hủy) | card only | Dư đồ pop-up, tab Mưu kế |
| Quyền Hoàng hậu (P13: xử tội, tịch thu, ban thưởng, tha, cắt bổng; rank ≥ 7) | card only | Dư đồ pop-up, tab Trừng phạt (same rank gate) |
| Hãm hại / Hạ uy thế / Dò la / Hại hoàng tự / Tố cáo — card members not in the pop-up (huydung, rash, thathu, poison, slowpoison, pgift, pushp, rumor, block, frame, plant, giahoa, xinhh, spy, bribe, ksab, musk, kframe, kpoison, catswap, pond, accuse, tocao, expose, xx, vp, trinhhh, trinhth …) | card full; pop-up only the talk members + 5 inPerson keys | same door in the pop-up gets the full ACT member list (widen `BAL.df.inPerson` to every key of RVGRP + P5–P14) |
| Kết giao · Tặng quà · Giúp chăm thú nuôi | card «Giao thiệp»; pop-up «Giao hảo» door partly | inside the existing «Giao hảo» door (one button) |
| Đến cung nàng thăm · Mời đến cung ta | card «Gặp mặt» | Đến = walking there on Dư đồ (exists). Mời = Hành sự, one button «Mời người đến cung» with a person picker (she comes → met on her own stage) |
| Sai tai mắt dò nơi ở · Hỏi người hầu: đó là ai? | card | a way inside the maid/servant door «Dò la tin tức» (tap her maid on Dư đồ / Hành sự); L1150 «sai người đi xem nàng ở đâu» |
| Emperor: Đến/Xin yết kiến gặp ngài · Dâng quà · Xin hầu cờ · Xin đánh đàn hầu ngài · Mời ngài dạo ngự hoa viên | Hậu cung › Chí tôn «Gặp ngài ban ngày» | Đến/Yết kiến = Dư đồ place pop-up (j41 exists). Dâng quà + the 3 KM_EMPACT acts → his stage pop-up (tab Hầu hạ), next to Hầu chuyện · Phô tài · Dâng hoa · Xin ân điển |
| Thái hậu: Sang Đức Thọ cung thỉnh an · Dâng quà | Chí tôn | walk = Dư đồ; Dâng quà → her stage pop-up |
| Chí tôn «Việc hôm nay» | copies of Hành sự deck cards | dropped from the panel (still in Hành sự) |
| Cung nhân: Thưởng phạt · Hỏi chuyện · Tiến cử · Phòng bị · Thân cận | Cung nhân card (pop-up has all but Thân cận) | serv/maid pop-up (+ «Chọn làm thân cận»); household acts Thêm người · Cài người vào cung khác · Chưởng sự tra xét → Hành sự (they target no one met) |
| Hoàng tự: Chăm sóc · Dạy học · Dẫn đi thỉnh an · Canh giữ · Về thăm con | Hoàng tự tab | the child's pop-up where the child really is (per the kid's real schedule), + Hành sự |
| Nam nhân: Chào hỏi đúng lễ … Cắt đứt | Nam nhân card + man pop-up | man pop-up only (already there) |
| jpcf «Việc nhanh» (Sai tai mắt, Đến cung nàng, Tặng quà/Kết giao) | panel | gone with the panel acts (each above) |

## 2. How (smallest change, no new layer, no new screen)
1. ONE data move: `BAL.df.inPerson` (jbaldf) = every ACT key the Hậu cung cards offered; doors P10/P12/P13 gain kinds `rival`,`hh`; locks unchanged (`a.ok` + `together` + j61 name lock). Nothing is deleted; every act keeps its own outcomes, odds and numbers (BAL).
2. Emperor/Thái hậu: `courtMeet` + `kmEmpBtns` feed his/her stage pop-up instead of the Chí tôn card (same handlers `data-kgmgive` / `data-kmemp`).
3. Hành sự: the people at her place (curPeople, real schedules law 6b) open the SAME pop-up via kitPersonDlg (§50.2) — no new list unless MAIN wants one (Q1).
4. Panels: KK51-P strips act groups (info-only B tabs). If KK51-P lands first I only verify; else I hide act groups via the existing `pcard` groups filter (no look change) and KK51-P keeps the look.

## 3. Emperor by day on Dư đồ (owner gap 00:26Z) — align with Foreman C, not duplicate
His real buổi schedule `S.where.emp` (jworld) stays the truth. Chí tôn panel keeps ONE info line «Buổi này ngài ngự ở <nơi>» (no button). She walks there; locked place → «Xin yết kiến» (j41, one meeting a day); open place (Ngự hoa viên) → «Đánh đàn chờ ngự giá» exists; met → tap him → his pop-up with ALL Emperor moves (4 today + 5 moved = 9). Robot counts Emperor vs palace-fight options before/after. Phô tài: Kỳ/Cầm vs Xin hầu cờ/Xin đánh đàn look like one feature twice → flagged for Foreman C's plan, not merged here.

## 4. Proof (law 6c: nothing vanishes)
`dev/test/act-move-reach.js`: for every act key/door member offered on LIVE in ANY Hậu cung/Chí tôn/Cung nhân/Hoàng tự panel (baseline list from LIVE), assert it is offered in a Dư đồ pop-up (or Hành sự) of a person really present per schedule (scenarios dau/cao/hh/con × 4 buổi × places); assert panels have 0 act buttons; assert a person NOT at the place cannot be acted on. Fold 755x1000 + iPad 1180x820 mp4 → LOOK READY.

## Questions for MAIN
Q1. Hành sự entry: (a, rec) tap a person already shown on her stage = same pop-up, Hành sự gets no new strip (owner 00:13Z no new layer); (b) a small kit people strip «Người ở đây» in Hành sự.
Q2. Remote «sai người» ways inside a door (poison via a maid, plant in her palace, catswap …): rec = they stay as ways inside the door, but the door itself opens only from the target's pop-up when she meets her (owner «thậm chí muốn hãm hại cũng vậy»); no remote entry from her own maid.
