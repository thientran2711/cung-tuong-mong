# OWNER-ASK-AUDIT 27/11 — every owner ask 22/11 → 27/11 06:57Z: who did it, is it LIVE, duplicates, dropped

Session OWNER-ASK-AUDIT session_01Rc5AsN3VjEKRPNahxU31aV (opened by MAIN 172, reports to MAIN 173). Read-only audit; LIVE = origin/main 98c77517.
PRIORITY #1 CHECK: REUSED dev/handover/reports/owner-bugs/Bao-cao-loi-25-26-11.md (57 rows, only open rows re-checked), WORKLIST_OPEN, OWNER_LEDGER, CLAIMS, MAIN_STATUS, FOREMAN_B–F_STATUS | main: git log + content check | review/*: ls-remote 2816 refs, 83 PASS/LAND READY tips fetched and content-checked | claims: sessions listed per row.

## TÓM TẮT CHO SẾP
- Từ 22/11 tới 27/11 sếp giao khoảng **111 việc**. Riêng ngày 22/11 không có dòng nào trong sổ OD. Không tính 57 lỗi trong báo cáo 25–26/11, phần đó đã kiểm rồi.
- **Đã lên game: 28 việc.** Lên một phần: 13. Đang duyệt hoặc chờ đưa lên: 20. Thợ đang làm: 25. **Chưa ai làm: 10.** Không rõ: 3. Bị lệnh sau của sếp thay: 2.
- **Đã duyệt xong mà chưa vào game (rơi rớt): 22 nhánh.** Nặng nhất:
  - Gói Rời cung / kết cục rời cung (e-pack-a, PASS 26/11).
  - Phụ tuyến lặt vặt (e-pack-c).
  - Nói chuyện với người của cung khác → nghi / tin (talk-others-people, PASS 25/11).
  - Luật hai chiều (law1-land).
  - Ra ngoài cung không còn chữ trong cung (ob-ngoaicung, 4 lỗi của sếp).
  - Tài nghệ ô vuông: làm 4 lần, PASS 3 lần, chưa lần nào lên.
  - Thẻ ngày, Ngự hoa viên chia khu, người lạ, ồn mỗi ngày, Tiến bộ theo bậc, khung sự kiện, màn che chuyển cảnh.
- **Trùng đang chạy bây giờ:**
  - Ảnh lãnh cung: OWNER-UI-C và KK56 cùng sửa. Giữ KK56.
  - Tab Hành sự: ba thợ cùng đụng vào. Phải đi đúng thứ tự door-onetap → act-move-6 → R11.
  - Vòng người: RING-BUILD-6 và ring-build-7 cùng ghi RUNNING. Đóng 6.
  - Phạt / chứng cứ: phiên real-proof cũ vẫn mở song song PUNISH-TIER-8. Đóng phiên cũ.
- **Làm tới làm lui:**
  - Phạt: 6 phiên. Dời hành động: 6 phiên. Thợ kit: 8 phiên. Bàn bài: 7 phiên.
  - Vẽ lại 107 tranh hành động (khoảng 18.300 credit) rồi bỏ.
  - Tab Hành sự dạng thẻ: làm xong thì sếp hủy.
- **Có kế hoạch mà chưa ai làm:**
  - Đổi cả game sang 3 bậc Nhẹ · Vừa · Nặng (4647 bộ).
  - Phúc duyên phần 1.
  - Hoàng thượng ban ngày (EMP-DAY-B).
  - Giới hạn phụ tuyến.
  - Bỏ mọi lá «Thôi».
- Việc nhanh nhất là đưa ngay các nhánh đã PASS lên game theo gói (danh sách 10 việc ở dưới).
~83% xong (theo WORKLIST_OPEN) / «chơi được»: chưa có ai đo số này.

## How this was checked
- OD rows: 401 owner rows 23/11 03:15Z → 27/11 06:57Z (L2192–L2804). OD has **no row dated 22/11**: the log jumps from 21/11 to 23/11; the 22/11 ~22:45Z «C stop painting» order is known only through L2192's overwrite. Grouped into asks in three parts (appendices A, B, C).
- «Landed» = `merge-base --is-ancestor`, or for re-merged stacks a **content check**: added code lines (len>25) of the branch diff (dev/build, kit, test, site, measure) that are present in the same file on main. ≥85% = LANDED, 0–10% = NOT LANDED. Script: scratchpad landed.py (copied below in «Method note»). Lander stacks rewrite shas, so a non-ancestor sha alone is never called dropped.
- Main fetched to depth 400 (9991 commits reachable); 83 review tips fetched --depth=30 under the fetch lock.

## DROPPED — PASS / LAND READY, NOT on main, NOT in the current LC28 Bundle 1 (448622df) or Bundle 3
Content % = branch's added lines found on main.
| # | branch · sha | passed (who, when) | owner ask | content on main | why stuck · action |
|---|---|---|---|---|---|
| D1 | review/e-pack-a 7ee5ab55 (carries leave-palace-r6 34ed061c, save-growth-r6, robot10-e-fix-6-r6, fix-1-r6) | E91r BIG PASS 26/11 04:50Z (session_01DgYSWns4aUH6GFwP2vobWa) | OD 24/11 L2309/L2318/L2324 leave palace = an ending, xuất gia asks once, forced-out severity | 0/1299; jleave.js / ttExposed absent on main | never staged by any lander; save-growth part now rides B save stack rv23. **Remerge leave-palace part on LIVE → BIG rv → land.** WL 12 wrongly says only end-maxrank |
| D2 | review/e-pack-c ff373f76 (moment-r3m, scent-r3m, parking-rank-r3m) | E93r PASS 26/11 (session_01DgYSWpgF1aueFYbXCutixJ) | parking-lot rows (moment / scent / parking rank) | 0/462 | never staged → next bundle (foreman set) |
| D3 | review/talk-others-people-rv 25a9a9cc | D PASS LAND READY 25/11 11:34Z | OD 24/11 L2385 others talk to her servants → suspicion/trust (WL 26 «open») | 71/1649 | «after dfu», then forgotten; WL 26 shows it as unbuilt → **remerge + land, do NOT rebuild** |
| D4 | review/law1-land 52263f49 | B BIG PASS 25/11 23:26Z (session_01N1tNP4PNwJ48R7BjEw5mTA) | OD 24/11 L2312/L2341 law 1 two-way audit whole game (WL 11 «open») | 0/136 | never staged → remerge + land |
| D5 | review/ob-ngoaicung-r6 fe8b928f | BIG PASS 26/11 19:25Z | OD 25/11 L2504–2518 outside palace: no palace words/events/news (4 owner bugs) | 2/488 | «next in LC23», never restaged |
| D6 | review/tainghe-overview 624d39ea + tainghe-info-r5 88bd567f (+ kit-bac-progress 16fe9dca) | KK38 LAND READY 26/11; tiles 24/11 | OD 24/11 ~18:05Z, 25/11 23:48Z, 27/11 L2794/L2803 Tài nghệ square cells (owner angry «nói nhiều lần») | 1/24, 4/170, 4/210 | starved between landers; KIT-STAGE-R11 now rebuilding on this base (4th build). lc19-a14-tainghe4 bf321724 content mostly on main (2090/2235, mostly merged LIVE code) — its Tài nghệ popup part unverified |
| D7 | review/titles-daycard 8cdc4b46 | E92r2 PASS 26/11 | OD 23/11 L2264/L2266 titles + day title card (WL 5) | 0/1039 | not in any bundle (title-parity-r163d is in Bundle 1; check overlap, then land) |
| D8 | review/nhv-areas 50840478 | LAND READY (MAIN 153 LOOK PASS) | OD 24/11 L2408 + 25/11 L2496 Ngự hoa viên areas | 4/1642 | sat in LC21 queue, lost on rollover |
| D9 | review/qc-noise-hygiene-r10b bdb0f65d | F LAND READY 26/11 13:39Z | Bao #30 daily noise budget | 0/794 | never staged |
| D10 | review/kit-name-stranger e25dfd52 | SMALL PASS (D) 26/11 | Bao #22 stranger name in scene | (part B check) | never staged |
| D11 | review/endcard-top-r6 3f38961f | E98r PASS 26/11 | end card covered by «Bổng lộc tháng» popups | 3/169 | never staged |
| D12 | review/net-ghen-2-r5 9d3b7b7b | D BIG PASS 25/11 20:40Z | nết / ghen behaviour (WL 9 «open») | 9/556 | never staged |
| D13 | review/moment-r2 8792f09a → re-merged as moment-r3m inside e-pack-c | E77r PASS 24/11 | moment rows | 0/286 | = D2 |
| D14 | review/kit-evframe-r3 3e27d76f | kit-evframe r3 (WL 6) | OD 23/11 L2199–2210 event frame relayout | 0/242 | WL 6 open; check whether KIT-STAGE replaced it, else land |
| D15 | review/kit-screenveil-r1 16a2521d | VEIL-1 (owner picked option 2, 24/11) | OD 24/11 L2364/L2368 screen-change veil | 0/231 | WL 23 «no LIVE trace»; no PASS line found → re-review + land |
| D16 | review/mgskin-wire-r2 b2a0d0c2 | — | OD 23/11 L2269 mini-game skins wiring | 0/110 | kit-mgskin LIVE, wiring not → check |
| D17 | review/flight-mucluc-kit 09e7b6e6 / -cnv af4e19b7 | kit rv DONE 24/11 | OD 24/11 L2413 Mục lục big kit frame | 0/85, 0/84 | verify Mục lục on LIVE; else land the kit one |
| D18 | review/promo-stack-lr4 e2c5d5ae (+ help-housemate-lr5, srv-rank-lr5, selx-fair-lr5; carries contest-thitam, cung-quy, hud-sacphong fixes) | D VERIFIED LAND READY 27/11 05:23Z | promotion redesign, Bao #9 thị tẩm, HUD Sắc phong (WL 7, 29) | 7/3007 | pending, not in Bundle 1 → next bundle |
| D19 | review/kit-person-panel-rv165 34d41e13 | RV-165 PASS 27/11 03:40Z | OD 26/11 L2643 person panel B, 27/11 L2702 round avatars | 1/259 | held «with/after act-move» |
| D20 | review/goal-links-r2d-rv165 9448be40 | RV-165 PASS | Bao #41 buy-where / meet-who | 1/223 | pulled from Bundle 1 → RV-168 remerge |
| D21 | review/e-gain3 23b44074 | E-GAIN3-RV PASS 27/11 06:52Z | law 3 empty «Được» | 0/67 | Foreman E asked twice; not in a bundle |
| D22 | review/c3-seals 29462da0 | Foreman C, owner 23/11 L2193 «wire them in» | emotion seals (WL 14) | 0/18 | C reported «not on main» 3× today |
Also not landed, likely superseded (check before archiving): promo-hist ed47e570, titles2-r3m c39be532, law1-gifts-rv 99faeb2b (0 % each; newer branches cover them); robot10-e-fix-* / robot-fix-cnv (test harness only); dialog-order-r3 (r4 is in Bundle 1); real-proof-r163d a2902d43 (deliberate «never», MAIN 173); kit-stage-r10 tab tiles (voided by owner 06:42Z); kp23-redraw 984587cb (107 redraws dropped by owner option B).
Verified LIVE although the sha is not on main's first-parent chain: places-swap-n13 569f8916, act-seals-n14-r 77619056, mood-seal-2-rv 38e0fd93, news-unk-fix 7222ff88 (ancestors); coop-rebirth-stuck-r7 (89/93 content); co-ngu-titles, delegate-nomg, makeup-noboost (content, part B).

## DUPLICATES — two or more workers / branches on the same ask
Running NOW (27/11 ~07:00Z):
1. **Lãnh cung portrait filter:** OWNER-UI-C session_01Rc5AsLoQNjZmHi3rWPc992 + KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq both edit .kst-lc. KEEP KK56 for the kit state; OWNER-UI-C only wires lists + stills.
2. **Hành sự tab:** DOOR-ONETAP (-hs f387c92d) + ACT-MOVE-6 session_01Rc5AsM9iW1G2zcaDL3uNtq + KIT-STAGE-R11 session_01Rc5AsK3LyLvFW9Yyf56KgJ. Keep all three, fixed order door-onetap → act-move-6 → R11 removes the R10 tab tiles only.
3. **Ring:** RING-BUILD-6 session_01Rc5AsK4NEL… and ring-build-7 session_01Rc5AsL6hQY… both «RUNNING» on review/ring-build in CLAIMS. Ring is in Bundle 1 → close both claims (RING-BUILD-6 first).
4. **Punishment / evidence:** «real-proof + split-merge-fix» session_01Rc5AsJgemE… still RUNNING beside PUNISH-TIER-8 session_01Rc5AsNKRvfaAAYsA5xVvPJ. Keep PUNISH-TIER-8; archive JgemE; fix WL 43 (still cites a2902d43).
5. **Tài nghệ:** KIT-STAGE-R11 = 4th build of the same ask. It must reuse 624d39ea + 88bd567f + 16fe9dca. Recommend a separate small seat for Tài nghệ so the event-hand work doesn't block it.
6. **kitHand:** KK51 kit-hand-mount 089a822b + KIT-STAGE-R1…R11 both on kitHand → close the KK51 claim.
7. **Person info:** ob-phu people tab (OB-PHU3 session_01V1ZZH3bHXM…, KIT FAIL, stalled) vs kit-person-panel B → keep person-panel B; archive OB-PHU3; small new job for ob-phu parts 1–3 (full-screen Dư đồ, home shadows).
8. **Game pace:** PACE-SPEED-2/3 (stats) + D-RANKPACE session_01D3E3Naunyi… (promotion pace) both answer «game chậm». Not a code clash; give one owner the «≤4 h life» target.
Earlier (sequential, costly):
- PUNISH-TIER 3→8 (6 seats); ACT-MOVE 1→6 (6); kit keepers KK49→KK56 (8 in ~8 h); KIT-STAGE R5→R11 (7); plaque KK53 → KK54 → kk54-rv166 a/b/c/d (owner said «đưa lên live» 04:20Z).
- Land-chain copies of the same item: lc19-a13/b13-selscene, lc19-a12/b12-farshot, rankroom / c3-rankroom / lc19-a11 / b11 → archive the lc19 copies (content LIVE).
- Ring 5 branches (design 1–3 → build → rv165 → rv166 → pf-rv166): keep the Bundle 1 tip only.
- Titles two lanes (titles-daycard vs title-parity), promotion 6 branches, law 1 6 branches, Mục lục 3 branches.
- kp23-redraw 107 pictures (~18 300 cr) then dropped by option B; makeup boost 5 rulings in 3 h (final LIVE).
- WORKLIST_OPEN hygiene: two rows «45», two rows «5»; row 12 stale (end-maxrank LIVE 17f23656 but leave-palace not); row 25 says motion «waits sếp» though she picked mocks 1/2/4 on 24/11 15:15Z (law 17 risk); row 26 «open» though talk-others-people PASSED 25/11.

## NOT STARTED (needs a worker or an order)
3-tier CONVERT (E tier-audit v2 99ead418, 4647 sets) · Phúc duyên phase 1 (phucduyen-plan 61af25bb) · EMP-DAY-B (emperor-favour-plan f868ff7b, C «waits sếp» but MAIN applies) · side-quest rank-fit limit (OD 26/11 L2639) · remove every «Thôi» card (L2683) · Đa Bảo Các shelves (L2273) · palace distance (L2343) · AI narrator (L2396, needs her key) · ob-phu rest · allot-season branch not yet on origin (C working).

## TOP 10 FASTEST TO FINISH (already passed / small)
1. ob-ngoaicung-r6 fe8b928f: BIG PASS, restage. Fixes 4 owner bugs.
2. promo-stack-lr4 e2c5d5ae: LAND READY. Covers thị tẩm, HUD Sắc phong and festival sắc phong.
3. talk-others-people-rv 25a9a9cc: PASS. Remerge on LIVE, then land. Closes WL 26.
4. law1-land 52263f49: BIG PASS. Remerge and land. Closes most of WL 11.
5. e-pack-a leave-palace-r6 34ed061c: BIG PASS. Remerge, BIG rv, land. Closes WL 12.
6. e-gain3 23b44074, kit-name-stranger e25dfd52, endcard-top-r6 3f38961f, qc-noise-r10b bdb0f65d: all SMALL. One «small fixes» bundle.
7. Tài nghệ: one seat lands 624d39ea + 88bd567f + 16fe9dca on LIVE plus the a14 Fold popup fix. No rebuild.
8. titles-daycard 8cdc4b46 and e-pack-c ff373f76: PASS, foreman-set bundle.
9. kit-person-panel-rv165 34d41e13 and goal-links-r2d 9448be40: RV-165 PASS. Land right after act-move or Bundle 1.
10. nhv-areas 50840478 and net-ghen-2-r5 9d3b7b7b: PASS. Remerge and land.
Plus doc-only: copy TRUNGSINH_STORY.md (review/trungsinh-story abc229b2) to handover; fix WORKLIST numbering and stale rows; close stale claims (RING-BUILD-6, real-proof JgemE, OB-PHU3, KK51 kit-hand-mount).

## Method note (content check)
For tip T: mb = merge-base(T, main); for each added line (>25 chars) in `git diff -U0 mb T -- dev/build dev/kit dev/test dev/site dev/measure`, test whether the line occurs in `git show main:<file>`. hit/total ≥ 0.85 LANDED, ≥ 0.4 PARTIAL, else NOT LANDED. Limits: a line later rewritten on main counts as missing (so 0–10 % is reliable, 40–85 % needs a look); a branch that merged a lot of LIVE code (e.g. lc19-a14-tainghe4) can score high without its own part.

---
# APPENDIX A — 23–24/11 (OD L2192–L2428)
Note: OD has NO rows dated 22/11 (log jumps 21/11 → 23/11 03:15Z); the 22/11 ~22:45Z «C stop painting» order (MAIN 106) is known only via L2192's overwrite.
Evidence: `git ls-remote origin 'refs/heads/review/*'` (2816 refs), `git rev-list origin/main` (814 commits, back to 23/11 04:49Z only — a «not on main» tip older than 23/11 may still be LIVE), `git grep origin/main -- dev/build`, FOREMAN_B–F_STATUS, MAIN_STATUS, CLAIMS, WORKLIST_OPEN (WL). «tip» = branch head sha now; «on main» = in rev-list.

| # | OD date/line | Ask | Branches/sessions | Status | Note |
|---|---|---|---|---|---|
| 1 | 23/11 L2192, L2393 | C resumes painting everything «ngoại trừ … nhân vật»; «C mà vẽ xong thì cho nó làm việc luôn» | Foreman C seats; GAP_LIST_v5 rows | IN WORK (standing) | Standing rule, not one job; art rows tracked in WL 14–17 |
| 2 | 23/11 L2193 | Finished pictures «thay luôn đi», N13 PLACES4/5 swap + N14 21 act seals wire, no more asking | review/places-swap-n13 569f8916, act-seals-n14(-r) 77619056 | LIVE? (pre-window) | Tips not in 814-commit window; no LAND line found after 23/11 05Z → likely landed 23/11 early; verify with deeper fetch |
| 3 | 23/11 L2194, L2302, L2311 | KP23: HTML compare page 194 act pics, tick to keep; then «vẽ lại toàn bộ» | kp23-compare 6061d518, kp23-swap (LIVE 225c5c08 23/11 19:49), kp23-redraw 984587cb (107 redraws, ≈18 300 cr) | SUPERSEDED (part) | Swap of her picks LIVE 225c5c08. Redraw-all overwritten by OD 24/11 ~07:35Z/08:00Z OPTION B (L2325/L2330): 107 redraws DROPPED/not wired; only far shots redrawn (#27) |
| 4 | 23/11 L2195–L2196 | MG10a: paint items 1–15 «tự vẽ luôn đi, khỏi cần phải báo» (16 waits) | review/mg10a → LIVE 13a8dfc7 | LIVE 13a8dfc7 | 27 mini-game pictures |
| 5 | 23/11 L2197 | B/D may paint non-character art when free («4-5 việc lớn … làm tới làm lui») | — | DONE (rule) | Rule only |
| 6 | 23/11 L2198, L2202 | Robots/links private; then «Mở lại công khai cho tới khi game hoàn chỉnh» | review/pages-lock f7016b8d | LIVE f7016b8d | Repo public is an owner click |
| 7 | 23/11 L2199–L2201, L2206–L2210, L2277–L2280, L2288–L2291; 24/11 L2281 | Event frame (M1+M2 merged, figure left, info box fixed, no cut figure) + toilette room mock (character centre, no gold outline), videos | MOCK-STAGE (review/mock-stage 92e8f54f), kit-evframe r1–r3 3e27d76f, toilette-r6 27491781, kit-toilring LIVE 22f1e491 | IN WORK / open | WL 6 «Event frame relayout + toilette v3.5» OPEN; kit-evframe-r3 and toilette-r6 not on main; she was angry 24/11 04:00Z (L2281) that her words were missed |
| 8 | 23/11 L2211–L2212, L2219–L2228 | Odds word wrap («Nắm chắc» on own line) + new odds ladder words (Mong manh … Khó lường … «9 phần», no numbers) | odds-ladder-words → LIVE 72521d62 (rv f1ee0636 on main) | LIVE 72521d62 | Later overwritten to 7 equal bands (law 7, BAL.odds.cut); WORDING-GAIN r3 e2d6f281 live 26/11 |
| 9 | 23/11 L2204, L2213, L2216–L2218, L2262, L2268 | Robot plays first; measure death rates by cause, minutes/days per life & per ending, lag (esp. 2 players), then tune odds | ROBOT-10 family: robot10-lag LIVE c0dff1b3, robot10-onecore (merged 24/11), robot10-coop*, robot10-e-fix-1..3; Foreman E reruns (179/417 valid 27/11) | IN WORK (Foreman E/F) | Measurement runs live; odds-tuning from the data not closed |
| 10 | 23/11 L2215 | Name row shows «Kiếp thứ …» | MAIN W3 | LIVE (code: geLifeNo jge.js, «Kiếp thứ» in j79/jkcg) | No branch name found; present in main code |
| 11 | 23/11 L2229–L2259, L2283–L2301, L2304, L2307, L2313–L2314, L2319–L2321, L2326–L2328, L2333–L2334, L2344–L2347, L2351–L2354 | Opening = cinematic selection («cảnh nhập cung»), 3 days, Dưỡng Tú viện (Đông/Tây sở), waiting-yard drama bank «đa dạng», ask names, per-shot fixes, room-assignment scene, mama buy-info, ban hoa animation | SELSCENE-2..20 (selection-scene-r19 LIVE f009e1a6 26/11), selscene-dramas1–3 (d40506b3), c3-rankroom LIVE b69f0f5f, rankroom 810e926a on main, kit-selscene, lc19-a13/b13-selscene | PARTLY LIVE | WL 1 «polish + owner mock open». Ban hoa/keep-card own backgrounds (L2290, L2332) → WL 15 open; ban-hoa animation (L2346) not found as branch |
| 12 | 23/11 L2237, L2252–L2255 | Rank ceiling = identity tier ±1 («1 bậc là được rồi»), easier; Hòa Thân princess exception | (in selection/promo work) | UNCLEAR | No dedicated branch found; check BAL caps in promo-root |
| 13 | 23/11 L2260 | Each identity enters the palace differently (cung nữ etc.) | FIRSTCARD-2 98f00f16 «cn meets the 3 selection days» (LIVE) | PARTLY LIVE | cn path joins selection days; other identities not verified |
| 14 | 23/11 L2264, L2266–L2267 | Titles count + a title per finished main road (+ «phần mỏng» Lượt 10) — BUILD NOW | titles2/-r3m c39be532, titles-daycard 8cdc4b46 (E92r2 PASS), title-bal LIVE fa722503, kptitle-close LIVE 4cd3f974, title-parity-r163d 4af19072 PASS | PARTLY LIVE; titles-daycard PASSED-NOT-LANDED | WL 5. titles-daycard 8cdc4b46 PASS 26/11 not on main |
| 15 | 23/11 L2266 (Lượt 10 thin) | Thin roads filled | THIN P4/P6/P8 (thin-p8-r2 LIVE 2fd303aa) | PARTLY LIVE | WL 22 |
| 16 | 23/11 L2269 | Mini-games more varied in form / skins | kit-mgskin LIVE 2a80712b, mgskin-wire-r2 b2a0d0c2, mg-trim LIVE 0b43ee55 | PARTLY LIVE | mgskin-wire-r2 tip not on main |
| 17 | 23/11 L2271; 24/11 L2402–L2404 | Every character animated (breathing…); motion mocks, picks 1/2/4 | MOTION-DESIGN-3/4 review/motion-design | IN WORK / waits sếp | WL 25 «MOCK READY, waits sếp» — but she already picked 24/11 15:15Z (L2404) → law-17 risk |
| 18 | 23/11 L2273 | Đa Bảo Các: shelves in a palace room, not a bare cabinet | Foreman C (KP10) | NOT STARTED? | cabinet-land.webp still the only ref in main |
| 19 | 23/11 L2275; 24/11 L2410 | Download all pictures for offline (she flies 25/11); 3.8 GB panel bug | offline-all LIVE 17835565, offline-fast LIVE 9abd1de2 | LIVE | — |
| 20 | 23/11 L2276 | Upload 32 consorts redrawn per m09 with clean cut | Foreman C | SUPERSEDED? | Character art stopped (ART-CHAR out, L2192/L2393); status unknown — check C |
| 21 | 24/11 L2279 | Age bands 18/28/39/51/64 | ageband-r → LIVE 68799300 | LIVE 68799300 | — |
| 22 | 24/11 L2293–L2296 | Royals reveal + character intro shots | review/intro-design 7a55e7a1 | IN REVIEW (waits sếp) | WL 2 MOCK READY |
| 23 | 24/11 L2298, L2305, L2315, L2322, L2339, L2348–L2350, L2353, L2357, L2365 | Promotion redesign + 3 historic kinds (đại lễ, sủng ái, truy phong), Thái hậu once-in-life favour, sắc phong by festival, caps | PROMO-HIST promo-hist ed47e570, promo-build(-2-rv) 4defb821, promo-exam-r6, lc19-a9-promoroot → LIVE 6b5d3d05, promo-stack-lr4 e2c5d5ae (D LAND READY), contest-thitam-rv | PARTLY LIVE; promo-stack PASSED-NOT-LANDED | WL 7 |
| 24 | 24/11 L2309, L2318, L2324, L2328 | Leaving palace = an ending; xuất gia asks once; forced-out severity; main-story quests outside | leave-palace r1–r6, end-maxrank → LIVE 17f23656 (27/11 01:14) | PARTLY LIVE | WL 12 still says «LAND READY» → stale; removal ladder open |
| 25 | 24/11 L2312, L2341 | Law 1 two-way audit of the WHOLE game (not just gifts) | law1-audit(-r1) b01cc880, law1-land 52263f49, two-way-acts(-r1) | IN WORK / open | WL 11 open |
| 26 | 24/11 L2316, L2323 | Likes/dislikes on gifts both ways | law1-gifts(-rv) 99faeb2b, pcard-dislikes-r1, gift-* | open | WL 10 |
| 27 | 24/11 L2317 | Personality-driven thresholds (examples only) | personality(-r1) 99b5e315 | open | WL 9 |
| 28 | 24/11 L2330 | Redraw old FAR shots with tiny people | c3-farshot → LIVE 0a4c8010 | PARTLY LIVE | WL 16 (13 pictures live) |
| 29 | 24/11 L2331, L2342 | Emotion seals: all groups, animated like Thái hậu set, no samples | Foreman C seals (c3-seals, mood-seal-2-rv, emo-seal-vanish-r6) | IN WORK | WL 14 open |
| 30 | 24/11 L2343 | Keep names; map positions follow history; distance matters (visits) | Foreman D | NOT STARTED / open | WL 8 «Phân cung by thiện cảm + palace distance» open |
| 31 | 24/11 L2355, L2358–L2359 | Music for selection, contests, thị tẩm own group | kit-music-r1 → LIVE 351122ba; music-fest fcf015eb | LIVE 351122ba | WL 13 struck |
| 32 | 24/11 L2360 | Main story = dialogue scenes | B, C (thin-p8-r2 LIVE) | PARTLY LIVE | WL 4 |
| 33 | 24/11 L2362 | Canon feature log + twice-daily progress report | MAIN | DONE (process) | — |
| 34 | 24/11 L2364, L2368 | Loading: frames paint before pictures on every screen change → veil, option 2 | VEIL-1 kit-screenveil(-r1) 16a2521d, veil-zoom-r3 | IN REVIEW / stuck | WL 23 «no LIVE trace»; screen recordings ordered 24/11 by MAIN 118 |
| 35 | 24/11 L2367, L2396 | Cloudflare API given; AI API / live AI narrator «ngày mai» | B-AI (parking) | NOT STARTED | Needs her key + cost cap; never re-offered after 25/11 |
| 36 | 24/11 L2369–L2381, L2389–L2401, L2406 | «Vòng người» ring for crowded scenes; ring r2 «quá tệ» | RING-DESIGN 1–3 0cc43436, ring-build, ring-build-rv165/rv166, ring-build-pf-rv166 72f2450f (RV-166 PASS) | PASSED-NOT-LANDED | WL 24 |
| 37 | 24/11 L2383 | «Không có một lời nhắc» before her actions | kit-noprewarn-r1 40bcd59f → LIVE 502c48c9 | LIVE 502c48c9 | — |
| 38 | 24/11 L2385 | Others talking to her servants → suspicion/trust | Foreman D | NOT STARTED / open | WL 26 |
| 39 | 24/11 L2387 | Spare account runs more workers | MAIN | DONE (process) | — |
| 40 | 24/11 L2394 | Lips/teeth keep as is (character art) | — | DONE (ruling) | — |
| 41 | 24/11 L2408 | Ngự Hoa Viên areas → tap area → people | review/nhv-areas 50840478 (LAND READY, LC21 queue) | DROPPED (PASS-NOT-LANDED) | Not on main; LC21 rolled to LC28 since |
| 42 | 24/11 L2411, L2413, L2415 | Flight bug batch (Tài nghệ tab, Mục lục big kit frame listing every chapter, fixed info chips) | flight-ui LIVE 9878230b, flight-mucluc 6fb8e7eb, flight-mucluc-kit 09e7b6e6 (kit rv DONE), flight-mucluc-cnv af4e19b7, flight-* stack LIVE 25/11 (d3b99724 etc.) | PARTLY LIVE | flight-mucluc tips not on main — verify Mục lục on LIVE (9 «Mục lục» hits in build) |
| 43 | 24/11 L2414 | Tuần lục flash when choosing | tuanluc-sync(-r1) 4156a49d | UNCLEAR | Tip not on main; no LAND line |
| 44 | 24/11 L2416–L2428 | Việc nhờ batch (tháp đang hiệu lực, Tin báo one-per-line, Dư đồ «ta» plaque, mini-game intro behind, quý phi known by all) | viecnho-fix-r2 → LIVE 4232709a, tinbao-ui r6 → LIVE 50f8a13b | LIVE (mostly) | «Dư đồ ta hidden» + MG intro overlap not separately traced |

## Duplicates
- Selection scene: SELSCENE-2…20 + selscene-dramas 1–3 + kit-selscene + lc19-a13/b13-selscene — serial successors (fine), but lc19-a13 vs lc19-b13 = two land-chain copies of the same item; keep LIVE f009e1a6 line, archive a13/b13.
- Far shots: c3-farshot vs lc19-a12-farshot vs lc19-b12-farshot (same item, LIVE 0a4c8010) → archive the lc19 copies. Same for rankroom: rankroom / c3-rankroom / lc19-a11 / lc19-b11.
- KP23: kp23-redraw (107 redraws, ≈18 300 cr) then OPTION B far-shot redraws (c3-farshot) — the redraw-all work was paid and then dropped.
- Ring: ring-design 1–3 → ring-build → ring-build-rv165 → ring-build-rv166 → ring-build-pf-rv166 (5 branches, one ask) → keep ring-build-pf-rv166 72f2450f only.
- Titles: titles2 / titles2-r / -r2 / -r3m / titles-daycard / kit-daytitle r1–r2 / title-bal / title-parity — two lanes (E92 titles-daycard and RV-163C/D title-parity) on one ask → keep title-parity-r163d 4af19072 + titles-daycard 8cdc4b46, archive older.
- Mục lục: flight-mucluc / flight-mucluc-kit / flight-mucluc-cnv (3 branches) — check which is live, archive rest.
- Promotion: promo-hist / promo-build / promo-build-2 / promo-exam / lc19-a9-promoroot / promo-stack-lr4 — keep promo-stack-lr4 e2c5d5ae (D LAND READY).
- Law 1: law1-audit / law1-gifts / law1-land / law1-maid-away / two-way-acts / lc14-law1gifts-on-dfu — gifts and audit split across many; one owner (B) should hold.

## Dropped (PASS / LAND READY not on main)
- review/nhv-areas 50840478 — LAND READY (MAIN 153 LOOK PASS), sat in LC21 queue, not on LIVE 98c77517.
- review/titles-daycard 8cdc4b46 — E92r2 PASS 26/11, not on main.
- review/ring-build-pf-rv166 72f2450f — RV-166 PASS 27/11 ~05:36Z, in LC28 queue (fresh, not yet dropped).
- review/promo-stack-lr4 e2c5d5ae (+ help-housemate-lr5 3bd74d29, srv-rank-lr5 7536d3c6, selx-fair-lr5 76bd422b) — D LAND QUEUE, not on main.
- review/kit-screenveil-r1 16a2521d — VEIL-1 owner chose option 2 on 24/11, no LIVE trace since.
- review/kp23-redraw 984587cb — 107 redraws paid then dropped by owner OPTION B (not a bug, but lost credits).
- Unverified (tips outside the 814-commit window, no LAND line): places-swap-n13 569f8916, act-seals-n14-r 77619056, kit-evframe-r3 3e27d76f, toilette-r6 27491781, mgskin-wire-r2 b2a0d0c2, tuanluc-sync-r1 4156a49d, flight-mucluc-cnv af4e19b7 — need a deeper `merge-base --is-ancestor` check.

---
# APPENDIX B — 25–26/11 (OD L2430–L2701; extends Bao-cao-loi-25-26-11)
Method: OD rows grouped into asks; evidence = `git merge-base --is-ancestor` where the sha is local, else main commit subjects (`git log origin/main --since=23/11`) + content `git grep origin/main` (lander stacks rewrite shas, so a non-ancestor sha ≠ dropped — CO-NGU-TITLES dbd77388 is not an ancestor but its text is on main); CLAIMS / MAIN_STATUS / FOREMAN_B–F_STATUS for sessions and PASS lines. No fetch beyond depth 400 of main.
REUSED: Bao-cao-loi-25-26-11.md (57 rows, 25/11 23:30Z → 26/11 18:40Z, checked at 540358c4) — only its open rows are re-checked here (section B). New rows = 25/11 01:42–23:27Z (section A) and 26/11 18:55–23:58Z (section C).

## A. 25/11 01:42Z – 23:27Z (not in Bao-cao)
| # | OD date/line | Ask | Branches / sessions | Status | Note |
|---|---|---|---|---|---|
| A1 | 25/11 01:42Z L2430 | «sửa gấp … toàn bộ cái makeup của tất cả các nhân vật» (mắt/môi/má off the face) | review/makeup-fit e4d2d3e3 → makeup-fit-r6 dd200174; MAKEUP-FIT session_01V1ZZH4ZZrw, rv 01V1ZZH1G7YF | LIVE 008aa59b | — |
| A2 | 25/11 03:10–06:50Z L2432–L2463 | makeup strength same at every size; «Vụng về»/«Diêm dúa» tuned; final «giữ 1 chấm hết» (×1.0) | review/makeup-noboost 74068c07 (MAIN 132, 01V1ZZGzj7Ek) | LIVE ca5af050 (+ jtoil.js:108 `lod.boost:1` on main) | 5 rulings in 3 h on one number; final one live |
| A3 | 25/11 04:06–04:15Z L2434/L2438/L2439 | «nút sẵn sàng … không bấm được»; every mini-game from a person screen dead; Lời dặn «Đã hiểu» dead | sansang-music-fix c70cfd17 + -2 a6b4d573 (01V1ZZH1Z5G4); kit-mg-intro-r2, mg-intro-2*, lc14-sansang-on-palace | LIVE 0756a05b + ee37ab5f (63858d80, 310bad2e) | — |
| A4 | 25/11 04:10Z L2435 | «đang chơi nghe nhạc … hết nghe nhạc» | sansang-music-fix-2 (music watchdog e00c6a8f) | LIVE ee37ab5f | iPad no-sound 23:30Z = Bao #1 LIVE 4fae357a |
| A5 | 25/11 04:15Z L2439 | button tap «tiếng tèo» | sansang-music-fix-2 | LIVE 310bad2e | Bao lists the same (no dup work) |
| A6 | 25/11 04:12Z L2436 | «nghe ngóng của cung nữ mà tôi phải đi chơi game» → no mini-game for delegated acts | review/delegate-nomg 170e05b3, -2 71e150b4, -rv, lc13-delegate-on-r10, lc14-*-delegate (01V1ZZH3fnPT) | LIVE (dev/test/delegate-nomg*.js + reports on main; mg-trim 484e5815 keeps the scan) | landed through a stack; shas rewritten |
| A7 | 25/11 05:10–05:58Z L2445–L2455 | robots: real taps, «một kiếp là phải là một cái chết» (no cap), never self-exit, rerun bad lives | Foreman F robot-realtap (7ca6b369 → 39c6e505 → f65d019b → robot-realtap-lc27 605c596a), E/D rerun seats | RULE LIVE in every round; harness PASSED-NOT-LANDED: 605c596a BIG #17 PASS but built on SUPERSEDED a2902d43 → F told 27/11 06:50Z to rebase (MAIN_STATUS); BIG #18 FAIL 7561ffe6 on ring crawler | harness ≠ game; lands only as test code |
| A8 | 25/11 05:50Z L2456 | every robot life = player review, merged report | brief ROBOT-PLAYER-REVIEW.md; per-life reviews (e.g. robot/review/rerun-nc_su-*) | PARTLY: per-life reviews exist; merged dev/handover/reports/ROBOT_PLAYER_REVIEW.md not found on handover/main | small: merge job |
| A9 | 25/11 06:55Z L2464 | «tại sao cái việc gì cũng có cái bà tổng quản mama» → person in tip only if it is her business | review/mama-only-own 91f80e32 + -rv 1649c8df (01V1ZZH4XVMN) | LIVE (both shas ancestors of main) | — |
| A10 | 25/11 07:00Z L2466 | focus figure = stage size 1:1 | kit-focus-fig d500b6db → -r2 97ec1639 (B child7) | LIVE (97ec1639 in main, KIT §92.5) | later ring size rule (C5) is a separate kit |
| A11 | 25/11 07:10–07:35Z L2469–L2477 | robot plays trungsinhgame ≥20 lives: story, endings, deaths | TRUNGSINH-STORY 01V1ZZGzGFi2 + TS-P2/P3/P4, leads 2/3; review/trungsinh-story abc229b2 | DONE (research, 20 lives) — report only on review/trungsinh-story, not on handover/main | copy TRUNGSINH_STORY.md to handover so nobody re-runs it |
| A12 | 25/11 07:40Z L2478 | «Một kiếp phù sinh» — literary cổ trang names/titles whole game | review/co-ngu-titles dbd77388 (P1 3424724f), co-ngu-seals 73fe03b9, co-ngu-banhoa 449b058d (01V1ZZH4mHp8) | LIVE (text on main: jend.js:27 ending names, «Sơ nhập cung môn» j67/jst14) | sha not ancestor = landed via stack |
| A13 | 25/11 05:45Z + 08:05Z L2460/L2483 | «Bộc phát theo tính cách là phải làm» — forced outburst picks + reason gate | temper-outburst c02602fb, -fix 39561518, temper-perception d05a9698/-lr ed7be1ce/-rv, temper-g4, temper-coop-fix (Foreman D T1c/T1d/T3) | PARTLY: outburst LIVE 23e5b84f (39561518 ancestor); perception part (4) PASSED (rv r3 DONE 25/11) but not on main — in D re-merge lead (CLAIMS) | WORKLIST #9 open |
| A14 | 25/11 07:05–08:10Z L2468/L2471/L2474/L2480/L2481 | story-closure endings; «Nhân vật kỳ ngộ»; vacation freeze on new features | PARKING_LOT #14/#15 | PARKED by owner («để dành», L2481/L2484) | not started on purpose |
| A15 | 25/11 15:12Z L2485 + 21:50–22:00Z L2492–L2497 | event choices as «Bàn bài» cards; ✓/✕ on lifted card; dialogue + thẻ gỗ | review/kit-hand 9cffbf17, KK31/KK32, kit-stage → -r2 ec2f7c43 … -r10 352a5310 (KIT-STAGE-R1…R11), KK51 kit-plaque-confirm/kit-hand-mount | IN REVIEW / landing: kit-stage-r10 LOOK PASS → RV-166 (27/11 06:08Z); then owner 27/11 06:42Z «card hand ONLY for event pop-ups» (KIT-STAGE-R11) | many rulings later (C11, C12) |
| A16 | 25/11 22:00–22:05Z L2496–L2499 | vòng người / vòng nhóm / Ngự hoa viên + videos | NHV: ART-NHV 01V1ZZH4P2cD, NHV-BUILD 01V1ZZH11unC (review/nhv-areas); ring: RING-BUILD-3…7, review/ring-build (rv165/rv166/pf-rv166) | Ring IN LANDING: LC28 Bundle 1 r3 448622df (gates running 07:10Z). NHV: no LIVE trace found | NHV status unknown — ask MAIN |
| A17 | 25/11 18:52Z L2491 | «âm thanh nhạc riêng theo từng sự kiện mà vẫn chưa làm» | kit-music-r1 475df8ba (B PASS 24/11, dropped, then relanded) | LIVE 351122ba | was a DROPPED pass once (lesson logged) |
| A18 | 25/11 22:40Z L2502 | Tốn/Được/Mất «tùm lum» → one item per line; no seals on menus | review/ob-kiep 87bc8942 (KIT OK B) | LIVE 02f564ae | — |
| A19 | 25/11 22:45–23:10Z L2504/L2506/L2516/L2518 | outside the palace: no «cung nhân / chí tôn» words, no palace events/visits/news | review/ob-ngoaicung → r5 8aaac5ac → LAND SLOT r6 fe8b928f (OB-NGOAICUNG-3b 01V1ZZH1sqdb, RV 01V1ZZH1CncuHjsC BIG PASS 26/11 19:25Z) | PASSED-NOT-LANDED (fe8b928f; «Next in LC23» 19:41Z, then never; meRankN absent from dev/build on main) | DROPPED — 4 owner bugs ride on it |
| A20 | 25/11 22:52–23:00Z L2508–L2513 | Dư đồ full screen on iPad; home map shadows; all person info in ONE people tab | review/ob-phu (437d4efc KIT FAIL 26/11 03:25Z, tip b5c053d1); OB-PHU3 01V1ZZH3bHXM | STALLED: KIT FAIL (plkGo wrong person + 2), fixer never re-reviewed; nothing on main (no jplink) | overlaps C5 person-panel B |
| A21 | 25/11 23:05Z L2514 | «cả 8 cuộn chỉ cùng màu một đỏ» | mg-color d2d068b7 / 802f7271 | LIVE 3f3fdfbd | — |
| A22 | 25/11 23:15Z L2520 | «cổng cung … vẽ bằng code hả?» → paint entry gate + every code stand-in | art-slots 7f22c202, bdc83200 | LIVE (both in main) | — |
| A23 | 25/11 23:20–23:24Z L2522/L2524 | makeup preset sets back; mirror skipped her; blurry result | review/makeup-set r4 374282f9, mirror-center(-r2) 0f0954fb | LIVE c90f71fb | — |
| A24 | 25/11 23:27Z L2526 | iPad right column too big → iPad = Fold proportion, whole UI | review/ipad-size 128ab148 | LIVE (128ab148 ancestor; c90f71fb stacked on it) | — |
| — | L2487–L2489, L2500 | flight priority; «tài khoản này tập trung sửa»; no busy-work splitting | — | RULES (no build) | — |

## B. Bao-cao-loi 25–26/11 — open rows re-checked (changes since 540358c4)
| Bao # | Ask | Was | Now |
|---|---|---|---|
| 9 | Hạng nhất → thị tẩm | chờ lên live contest-thitam | PASSED-NOT-LANDED in promo-stack-lr4 e2c5d5ae (D VERIFIED LAND READY 27/11 05:23Z; not in LC28 Bundle 1) |
| 14, 21, 27 | Trang điểm một chạm / Học nhanh / Chăm nhanh | chờ lên live mg-trim | LIVE 0b43ee55 |
| 22 | người lạ trong cảnh | chờ lên live kit-name-stranger e25dfd52 | DROPPED: SMALL PASS 26/11, not in any lander bundle, not on main |
| 30 | ngân sách ồn mỗi ngày | chờ lên live qc-noise-hygiene-r10b bdb0f65d | DROPPED: LAND READY 26/11 13:39Z (F), not on main, not in LC28 bundles |
| 36 | Tiến bộ 8/20 per bậc | chờ lên live kit-bac-progress cb221604 | DROPPED/stale: branch tip now 16fe9dca, no kitBac on main, not in LC28 bundles |
| 5, 31 | Dư đồ gom khu | map-zones-r7 9c8985ab held | superseded by map-r9 3a88aba4 (RV-165 PASS; out of Bundle 1, RV-166 remerge after B1) |
| 39 | chip nơi sắp đóng cửa | PLACE-CLOSE đang làm | IN LANDING: place-close 208d11d0 (RV-166 PASS) in LC28 Bundle 1 (kk54-rv166d+place-close) |
| 41 | mua ở đâu / gặp ai | GOAL-LINKS đang làm | PASSED-NOT-LANDED goal-links-r2d (RV-165 PASS), pulled from Bundle 1 → RV-166 remerge |
| 42 | khách tới tìm: kết quả hiện ngay | OB-VERDICT-3 đang làm | LIVE 98c77517 |
| 44, 45, 57 | icon Dư đồ to; mờ theo buổi; 5 kit thay khung cũ | KK44 đang làm | IN LANDING: kk54-rv166d + kit-std-audit in LC28 Bundle 1 |
| 47 | Bàn bài / thẻ gỗ / vòng — video | VIDEO-161 | see A15/A16 (ring in Bundle 1; Bàn bài RV-166) |
| 48–52, 56 | DRESS-FIX (áo/hoa, ô gộp, xa xỉ, thay đồ, lột đồ NPC) | đang làm | IN REVIEW: dress-fix-rv166 02203967 at RV-163F; LC28 Bundle 3 pre-staged |
| 55 | oán quá nhanh (+ L2660 one cap per stat) | OAN-PACE đang làm | IN REVIEW: oan-pace-ghen → RV-163G remerge (MAIN 173 07:20Z) |
| «thứ tự cửa sổ» | dialog order | DIALOG-ORDER-R4 | IN LANDING: dialog-order-r4 in LC28 Bundle 1 |
Rows LIVE in Bao stay LIVE (spot-checked: 4fae357a, 9812646a, aa37de21, 50f8a13b, e4314b74, 6b5d3d05, b881686f, 504d2e6a, 639455a2, fa722503, 539603bf, 540358c4 are on main's first-parent chain).

## C. 26/11 18:55Z – 23:58Z (not in Bao-cao)
| # | OD date/line | Ask | Branches / sessions | Status | Note |
|---|---|---|---|---|---|
| C1 | 26/11 18:55–19:00Z L2631/L2633 | vòng người = real rotating ring; new motion family = ONE new animation kit replacing every old picker, LIVE as one set | ring-build (RING-BUILD-3 01Rc5AsMga9M … -6 01Rc5AsK4NEL, ring-build-7 01Rc5AsL6hQY), kit-plaque-post 03061ce6 | IN LANDING (LC28 Bundle 1 r3 448622df) | «one whole set» gate: Bàn bài still at RV-166 |
| C2 | 26/11 20:27–20:30Z L2645/L2647 | ring front = LIVE stage size; never cover buttons; full body on iPad | ring-build-rv165 02b19b2a, -rv166 42cc27fb, -pf-rv166 9856601b | IN LANDING (as C1) | — |
| C3 | 26/11 21:41–21:45Z L2673/L2675 | one plaque post fixed place; 3 ring sizes near→far | kit-plaque-post 03061ce6, ring-build | IN LANDING (as C1) | — |
| C4 | 26/11 19:05Z–21:40Z L2635/L2641/L2649/L2651/L2658/L2661/L2667/L2668 | crime decides penalty; nhẹ/vừa/nặng same for all ranks; evidence count by tier × accused rank; witnesses separate, only nặng/tử tội | punish-tier ab73bc26, punish-tier-wit(-r163c), real-proof f95d94fb, real-proof-2(-rv163e), real-proof-r163d a2902d43, split-merge-fix; real-proof+split-merge-fix 01Rc5AsJgemE (RUNNING), PUNISH-TIER-7 01Rc5AsHuiZG (RV READY 46a34673) → PUNISH-TIER-8 01Rc5AsNKRvf | IN WORK (PUNISH-TIER-8 remerge → RV-163F). a2902d43 SUPERSEDED («never», MAIN 173) | WORKLIST #43 still says «a2902d43 RV PASS» — stale |
| C5 | 26/11 20:15Z L2643 | «Chọn cách B cho hậu cung» person panel | person-panel-a/b/c/d/o1 mocks → kit-person-panel 31f83ba0 (KK51-P2 01Rc5AsLyZ4T), -rv165 34d41e13 | PASSED-NOT-LANDED (RV-165 PASS list 03:40Z; «lands with/after act-move»; not in Bundle 1) | waits ACT-MOVE |
| C6 | 26/11 19:10Z L2637 | «tốc độ game … khá là chậm»: robot life ≤ ~4 h | pace-speed 47bbe2e8 (PACE-SPEED-2 01Rc5AsN2DLj), -rv163e d64f53cf; D-RANKPACE 01D3E3Naunyi (review/rank-pace) | IN LANDING: RV-163E PASS pace-speed; LC28 Bundle 3 pre-staged. Rank-pace root cause in work (D) | see duplicates |
| C7 | 26/11 23:00–23:58Z L2687–L2697 | 6 stats: slowdown curve, soft ceiling = next bar + 8, Sủng fade, Sắc −1/yr from 28 («Ok làm chỉ số như khuyến nghị») | pace-speed (same as C6) | IN LANDING (as C6) | monthly rescale + promo-adjust DROPPED by owner (L2689/L2696) |
| C8 | 26/11 19:15Z L2639 | «sự kiện phụ tuyến nhiều quá … ai cũng tới tìm tôi» → rank-fit table + limit | none found (no branch, claim or STATUS line) | NOT STARTED | MAIN recs written in OD only |
| C9 | 26/11 20:55–21:40Z L2656/L2663/L2665/L2670 | Emperor reign-end events (nhường ngôi / phế …); her life ends only by Emperor / reign end / her choice; remove age-40 end; keep illness/poison/assassination | reign-end 142e8e0a (REIGN-END 01Rc5AsKDTgM), -r163d, -rv163e 85791268 | IN LANDING: RV-163E PASS; LC28 Bundle 3 «reign-end (no jtrim)». LIVE still ends lives «Tuổi xuân qua đi» age 40 (Foreman E tallies 27/11) | — |
| C10 | 26/11 21:55Z L2677 | choices show «Danh + / ++ / +++», exact numbers only in result | wording-marks c580f2cd (wording-gain e2d6f281) | LIVE 540358c4 | = Bao #53 |
| C11 | 26/11 20:45Z + 22:07Z L2653/L2679 + 23:55–23:58Z L2698/L2700 | result card height = content; no figure on event stage; Game of Dice style, «Ok bỏ lật» | kit-resfold 5fd36e51, -r2 740331b5, -r2-rv163g; result-sieve-r2 575917ae (-rv165); god-research 01Rc5AsMsPWc (reports/god-research.md); kit-stage-r10 352a5310 | result-sieve IN LANDING (Bundle 1); kit-resfold-r2 IN REVIEW (RV-163G); no-flip Bàn bài RV-166 | owner narrowed 27/11 06:42Z |
| C12 | 26/11 21:45Z + 22:43Z L2671/L2683 | no paging of cards; 7 not a hard cap; «lá bài thôi thì dẹp» (remove every «Thôi» card) | picker-dom (D, kitCancelIx «Thôi» still counted — rv r3 FAIL 705d50e0); no whole-game «Thôi» removal branch found | NOT STARTED (removal of «Thôi»); paging part inside KIT-STAGE | — |
| C13 | 26/11 22:58Z L2685 | HUD «Sắc phong 5/32 tuần» | hud-sacphong 34e25776 (01Rc5AsMfzAW, kitHudSlot 470d4ece); fixes carried in promo-stack-lr4 e2c5d5ae | PASSED-NOT-LANDED (promo-stack-lr4 D VERIFIED LAND READY 05:23Z; not in Bundle 1) | WORKLIST #29 |
| — | L2655, L2660, L2681, L2701 | MAIN-applied rulings; sắc phong stays on festivals («giữ … như đang có»); message-her-less rule | — | RULES / NO CHANGE | — |

## Duplicates
1. **Ring / Bàn bài / thẻ gỗ (A15, A16, C1–C3, C11)** — RING-BUILD-6 01Rc5AsK4NEL and ring-build-7 01Rc5AsL6hQY are BOTH «RUNNING» on review/ring-build in CLAIMS (opened 22:10Z and 23:02Z 26/11); KK51 kit-hand-mount and KIT-STAGE-R1…R11 both touch kitHand. Keep: ring-build tip in LC28 Bundle 1 + KIT-STAGE-R11 for kitHand; close RING-BUILD-6 and the KK51 kit-hand-mount claim.
2. **Punishment / evidence (C4)** — CLAIMS shows «real-proof + split-merge-fix» 01Rc5AsJgemE RUNNING while PUNISH-TIER-7/8 own split-merge-fix too; real-proof, real-proof-2, real-proof-r163d (superseded), punish-tier-wit-r163c are four generations. Keep PUNISH-TIER-8 01Rc5AsNKRvf only; archive 01Rc5AsJgemE; delete a2902d43 from WORKLIST/F harness base.
3. **Game pace (C6/C7)** — PACE-SPEED-2 (stat ceilings) and D-RANKPACE (promotion gate pace) both answer «game chậm»; stat-pace (LIVE 4cfcda61) and title-bal (LIVE) are earlier layers. Not a code clash yet (BAL.stp vs BAL.ex.win) but MAIN should give one owner the «≤ 4 h life» target; keep both workers with D-RANKPACE reporting to PACE-SPEED owner.
4. **Person info (A20 vs C5)** — ob-phu «people tab» (stalled after KIT FAIL) and kit-person-panel B both decide where person info lives. Keep kit-person-panel B; fold ob-phu parts 1–3 (full-screen Dư đồ, home shadows, carry-over links) into a fresh small job; archive OB-PHU3 01V1ZZH3bHXM.
5. **Makeup boost (A2)** — five rulings in 3 h; MAIN 132/133/134 made 4 sample sheets; final ×1.0 is LIVE. Done; lesson only.
6. **Robot harness (A7)** — robot-realtap passes BIG #7/#15/#16/#17 but each LAND READY was overtaken by a new chain; F's FIXER #18 job 3 still running. Serial, not parallel — keep F ROOT #3 only.

## Dropped (PASS / LAND READY, not on main, not in the current LC28 bundles)
| sha | branch | passed by / when | ask | why stuck |
|---|---|---|---|---|
| fe8b928f | review/ob-ngoaicung-r6 | RV-OB-NGOAICUNG-3 BIG PASS 26/11 19:25Z | A19 outside-palace words + events + news (4 owner bugs) | queued «next in LC23» 19:41Z; LC23 handed its queue on; never restaged |
| e25dfd52 | review/kit-name-stranger | SMALL PASS (D) 26/11 | Bao #22 người lạ | never put in a lander bundle |
| bdb0f65d | review/qc-noise-hygiene-r10b | LAND READY F 26/11 13:39Z | Bao #30 noise budget | never staged |
| cb221604 (tip 16fe9dca) | review/kit-bac-progress | in lander queue 27/11 01:40Z (Bao) | Bao #36 Tiến bộ per bậc | fell out of LC26→LC28 queue |
| e2c5d5ae | review/promo-stack-lr4 | D VERIFIED LAND READY 27/11 05:23Z (BIG rv) | Bao #9 thị tẩm, C13 HUD sắc phong, kỳ sắc phong theo lễ | not in LC28 Bundle 1 (pending, not lost yet) |
| 34d41e13 | review/kit-person-panel-rv165 | RV-165 PASS 27/11 03:40Z | C5 person panel B | held «with/after act-move» |
| goal-links-r2d (9448be40) | review/goal-links-r2d-rv165 | RV-165 PASS | Bao #41 | pulled from Bundle 1 → RV-166 remerge |
| 605c596a | review/robot-realtap-lc27 | F BIG #17 PASS 27/11 05:35Z | A7 harness | built on superseded a2902d43 → rebase ordered |
| (perception) d05a9698 / ed7be1ce | review/temper-perception(-lr2) | rv r3 DONE 25/11 | A13 temper part 4 | sits in D re-merge stack; not on main |
| (old, already relanded) 475df8ba | review/kit-music-r1 | B PASS 24/11 | A17 | was dropped once, now LIVE 351122ba |
Not dropped although the sha is not an ancestor: co-ngu-titles dbd77388, delegate-nomg 71e150b4, makeup-noboost 8325d13f — their content is on main via stacks.

## Fastest to finish (from this part)
1. fe8b928f ob-ngoaicung-r6 — BIG PASS, just restage + gates (4 owner bugs).
2. e2c5d5ae promo-stack-lr4 — LAND READY, next bundle (thị tẩm + HUD sắc phong + festival sắc phong).
3. e25dfd52 kit-name-stranger — SMALL PASS, restage.
4. bdb0f65d qc-noise-r10b — LAND READY, restage.
5. kit-bac-progress — remerge 16fe9dca on LIVE + SMALL rv.
6. kit-person-panel 34d41e13 — RV-165 PASS; decide whether it must wait for act-move.
7. pace-speed + reign-end — RV-163E PASS, Bundle 3 pre-staged.
8. goal-links-r2d — RV-165 PASS, remerge after Bundle 1.
9. Copy TRUNGSINH_STORY.md (abc229b2) to handover; merge robot player reviews into ROBOT_PLAYER_REVIEW.md (doc-only).
10. Close stale claims: RING-BUILD-6, real-proof 01Rc5AsJgemE, OB-PHU3, KK51 kit-hand-mount.
Not started (need a worker): C8 side-quest limit, C12 remove every «Thôi» card, A20 ob-phu rest.

---
# APPENDIX C — 27/11 (OD L2702–L2804)
Sources: OD (handover branch), MAIN_STATUS tail (to 07:25Z), FOREMAN_B–F_STATUS, CLAIMS, review_refs (ls-remote 2816 review/*), list_sessions (200 newest, 27/11 ~07:00Z). LIVE = 98c77517 (pushed 06:24Z). None of the 27/11 asks is on LIVE yet; Bundle 1 (review/lc28-b1 448622df) is gating now.

| # | OD date/line | Ask (≤1 line) | Branches / sessions | Status | Note |
|---|---|---|---|---|---|
| 27-1 | 27/11 00:05Z L2702 | Round avatars in the Hậu cung person-picker row only («Chí tôn» tall thumbs → round) | KK51-P → KK51-P2 (archived); review/kit-person-panel 31f83ba0, -rv165 34d41e13 (round avatars 052433a5) | IN REVIEW (RV-165 LOOK PASS 01:42Z; lands with/after act-move) | Not in lc28-b1 list → check it is queued |
| 27-2 | 27/11 00:10–00:15Z L2703–2706 | Real evidence/witness, not «1 con số»; but «sợ rối» → charge card one line + one exposure line after bad deeds | PUNISH-TIER-3 → 4 → 5 → 6 → 7 → **PUNISH-TIER-8 session_01Rc5AsNKRvfaAAYsA5xVvPJ (RUNNING)**; review/real-proof f95d94fb, real-proof-r163d a2902d43 (RV PASS, MAIN 173: «never» land), real-proof-2 ae2e0a07 (+rv163e f3ceae2f), split-merge-fix 46a34673 | IN WORK (remerge by PUNISH-TIER-8 → RV-163F re-check) | 6 sequential seats in 7 h (context rolls) |
| 27-3 | 27/11 00:09Z L2704 | Arson «phóng hỏa» → Mưu hại tính mạng (nặng, 1 witness) | split-merge-fix 46a34673 (PUNISH-TIER-4/7) | IN WORK (same remerge as 27-2) | |
| 27-4 | 27/11 00:24–00:57Z L2707/2709/2714/2717/2719/2723 | «Xóa dấu vết» by Tâm cơ; witness Đe dọa (nhẹ) / Mua chuộc (vừa, refused = no bạc lost) / Thủ tiêu (nặng; Đức vs Danh loss) | same PUNISH-TIER chain (real-proof-2) | IN WORK (PUNISH-TIER-8) | WL row 43 |
| 27-5 | 27/11 00:26Z L2708 | «rất ít hành động tương tác với hoàng thượng để chiếm sủng» by day — expert first, inventory, more daytime moves | Foreman C EMP-DAY session_01PEhRbuMDVjApgDKJapJENo → reports/emperor-favour-plan.md @f868ff7b (where/when); 6 moves built in ACT-MOVE | Plan READY 01:25Z, **build «EMP-DAY-B» NOT STARTED** (Foreman C says «waits sếp») | OD 26/11 05:55Z: MAIN rec = MAIN applies → should not wait; stuck point |
| 27-6 | 27/11 00:32–00:42Z L2710/2715 (+L2729 OK) | Hậu cung tab = INFO ONLY, big avatar frame; acts move to where she really is; card has only «Tìm gặp» / «Ghé cung» | ACT-MOVE → -2 → -3 → -4 → -5 → **ACT-MOVE-6 session_01Rc5AsM9iW1G2zcaDL3uNtq (RUNNING)**; review/act-move 66afd77e (LOOK PASS 06:18Z), act-move-law3 42793459; KK51-P2 kit-person-panel | IN WORK (ACT-MOVE-6 rebases on door-onetap → RV-163G) | WL 39/40 |
| 27-7 | 27/11 00:54Z L2721 | Emperor/tranh-sủng acts merged into few moves (Hiến nghệ, Dâng lễ vật, Hầu chuyện, Chặn ngự giá, Xin ân điển, Đút lót lật thẻ) | ACT-MOVE chain (batch 1 f5360191 LOOK PASS 01:25Z) | IN WORK (ACT-MOVE-6) | |
| 27-8 | 27/11 01:00–01:14Z L2725/2727/2730/2731/2732/2734 | Merged button: general button, specific true result; odds word before tap, best-fit auto pick; «Ok sửa hết đi» — all 58 doors → one-tap; NPC + co-op same | DOOR-ONETAP session_01Rc5AsMW6M9P8GqgmY6EbSe (COMPLETED); review/door-onetap e408ab1d, door-onetap-hs f387c92d | IN REVIEW (RV-163F queue #1; lands ALONE as play-stopper path) | WL 41 |
| 27-9 | 27/11 01:12Z L2735 | Buttons needing a target/item/place pick KEEP their choice list | DOOR-ONETAP + E tier audit (MERGE vs KEEP-CHOICE column) | IN REVIEW (with 27-8) | |
| 27-10 | 27/11 00:46–00:50Z L2717/2719 | LAW 2 rewrite: max 3 tiers Nhẹ·Vừa·Nặng, whole-game audit + convert | Foreman E E-TIER-AUDIT session_01DgYSWoFVCrpS7YmQGBGr58 → reports/tier-audit.md v2 (99ead418): 5510 sets, 4647 to convert | Audit DONE; **CONVERT NOT STARTED** (no build branch, no order seen) | Biggest open item; needs a phased build order |
| 27-11 | 27/11 01:35–01:40Z L2737/2738 | Thẻ gỗ board «lệch phong cách» → restyle to light kit silk card | RING-BUILD-7 → RB-8 (archived); KK53 review/kk53 a7ee4459; review/ring-build ae6a2266 (+rv165/rv166/pf-rv166) | IN REVIEW → in **Bundle 1 lc28-b1 448622df** (gates running) | |
| 27-12 | 27/11 03:17Z → 04:00Z L2765/2766 (+L2770 «đưa lên live») | No big «Chọn» bar; small green ✓ tick top-right of lifted plaque | KK53 → KK54 (archived); review/kk54-plaque b47e6367 → kk54-rv166 / b / c / d 5be6a2ec; kit-plaque-confirm daabd1f1 (+rv165) | IN REVIEW → **Bundle 1** (kk54-rv166d + place-close) | Owner said «đưa lên live» 04:20Z; 3 h later still not LIVE (4 re-review rounds) |
| 27-13 | 27/11 01:50–02:47Z L2740–2763 | Cơ duyên → «PHÚC DUYÊN» earned deck (Kho bài, carry 10, season draw 3, Công/Thủ/Thời cơ, 4 grades, starters, one-use vs thường trực, card never replaces an action); 2 phases | Foreman E E-PHUCDUYEN-PLAN session_01DgYSWmrvcBipCfWarncs3U → reports/phucduyen-plan.md (61af25bb); C3-KHOBAI icon art img/ui-khobai.webp (ART READY); KK53 Kho bài slot | Plan READY 02:45Z; **phase-1 build NOT STARTED** (no branch) | Rows 01:50/02:00Z SUPERSEDED by 02:10–02:40Z (L2745–2758); WL 45 |
| 27-14 | 27/11 02:50Z L2764 | PACE-SPEED: slow Tâm cơ as built; Danh/Đức cap ~54–60 | PACE-SPEED-2 → -3 (archived); review/pace-speed 47bbe2e8, pace-speed-rv163e d64f53cf (RV-163E PASS) | PASSED-NOT-LANDED → staged in **Bundle 3** (LC28) | WL 27 |
| 27-15 | 27/11 04:08–04:10Z L2767/2768 | Maid death notice: mistress told why («bị thủ tiêu …»), whole family + NPCs | PUNISH-TIER-7 → **PUNISH-TIER-8 (RUNNING)** on real-proof-2 | IN WORK | Older review/npc-death* branches are a different (earlier) job |
| 27-16 | 27/11 04:16Z L2769 | OWNER BUG Tai mắt: oán only when master knows; turned servant unknown until Tra xét | TAI-MAT-KNOW session_01Rc5AsLs77k5Zjpz1euhJR4 (COMPLETED); review/tai-mat-know 34c53f8e | IN REVIEW (RV-163F queue #3) | WL 42b |
| 27-17 | 27/11 04:33–04:39Z L2771/2773 | ANGRY: cards forgot kit rules (Được green / Mất red …) → KIT_CHECKLIST + scan + gate for ALL kit standards | KIT-STD-AUDIT session_01Rc5AsLjdujq3CBnAckhFyp (archived); review/kit-std-audit ddddca2e (+rv166 b3a2b9ef); KK56 review/kk56-std 5ebacab2 / kk56-std2 40193130 (4d77ca7a RV-167 FAIL) | IN REVIEW → kit-std-audit in **Bundle 1**; kk56-std2 OUT (guard fix pending) | |
| 27-18 | 27/11 04:36Z L2772 | Enlarged card opens ABOVE the hand, never covers it | KIT-STAGE-R9 → R10 (archived) → **KIT-STAGE-R11 session_01Rc5AsK3LyLvFW9Yyf56KgJ (RUNNING)**; review/kit-stage-r9 203c178e, -r10 86e0cbc8 | IN WORK (R11 keeps event hand) | |
| 27-19 | 27/11 05:27–05:29Z L2780/2782 | Card rows «Thành:» green / «Bại:» red on own lines; never «hỏng thì …» | KIT-STAGE-R10→R11 + KK56 + KIT-STD-AUDIT | IN WORK (R11 / KK56) | |
| 27-20 | 27/11 06:10Z L2789 | Odds badge on top edge of card picture | KK56 kitOddsBadge d3e2fd71 (LOOK PASS) + R10/R11 | IN WORK — scope cut by L2801 (event lá bài only) | «wider» part SUPERSEDED by L2801 06:45Z |
| 27-21 | 27/11 05:10Z → 06:40Z L2774/2785/2786/2787/2788/2791/2798 | Lãnh cung portrait = own colours paler (no sepia), more colour; lãnh-cung kit frame keeps colours; dead = b/w incl. rank frame; dead stay in lists | OWNER-UI-A (archived) → OWNER-UI-B (archived) → **OWNER-UI-C session_01Rc5AsLoQNjZmHi3rWPc992 (RUNNING)** + **KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq (RUNNING)**; review/owner-ui-a 2d23616e, kk56-ui e0442c3f | IN WORK (stills to sếp first) | 7 owner corrections in 90 min; L2774 sepia / L2785 / L2786 SUPERSEDED by L2798 (saturate .85) |
| 27-22 | 27/11 05:10Z L2776 | Chest: items fly out one by one, no list frame | OWNER-UI-A → review/owner-ui-a 2d23616e (RV-167 queue) | IN REVIEW | chest look APPROVED by owner 05:42Z (L2783) |
| 27-23 | 27/11 05:10Z → 06:36Z L2778/2781/2796 | Allotments pile up unused (vải …) → expert plan → ALLOT-SEASON (cloth by season, tea, phát bù, trà mốc) APPROVED | Foreman C plan reports/allot-season-plan.md @6a13cd58; build seat session_01PEhRbutKkyUU1W6mBp7ru8, branch review/allot-season (not on origin yet) | IN WORK (Foreman C) → RV-163G → LC28 | WL 47 |
| 27-24 | 27/11 05:42Z L2783 | OWNER BUG raw skeleton flash before title screen | BOOT-SKEL-FLASH session_01Rc5AsLUw7gDgkkzHaZqLd7 (COMPLETED); review/boot-skel-flash 6e11c262 (LOOK PASS) | IN REVIEW → **Bundle 1** | earlier review/boot-flash 6b1d6855 / -r1 20f4d7c9 = older same family |
| 27-25 | 27/11 05:43Z L2784 | Item detail frame too much blank space → every info dialog hugs content (law 10) | KK56 (X09 per-row height check, kk56-std2) | IN WORK (KK56) | |
| 27-26 | 27/11 06:12Z → 06:42Z L2790/2792/2799 | Hành sự as tilted card tiles? → «Đưa về như cũ»: card hand ONLY for event pop-ups; tabs keep old LIVE grid | KIT-STAGE-R10 kitHandRows 352a5310 (VOID) → R11 drops it | SUPERSEDED (L2792 order voided by L2799 06:42Z); R11 must REMOVE tab cards | Wasted work: R10 tab tiles + odds-badge on tabs |
| 27-27 | 27/11 06:45Z L2801 | Odds labels stay on the Hành sự buttons; badge only on event lá bài | KK56 (scope observer) + LC28 check kk56-std2 2f2223f0 | IN WORK (KK56) | |
| 27-28 | 27/11 06:33Z / 06:48Z L2794/2803 | ANGRY «nói nhiều lần»: Tài nghệ = one square cell per subject; tap → one frame | = OD 24/11 ~18:05Z item (1) + 25/11 ~23:48Z. **KIT-STAGE-R11 (RUNNING)** → review/tainghe-r6 on base tainghe-overview 624d39ea + tainghe-info-r5 88bd567f (+ kit-bac-progress 16fe9dca) | IN WORK (fast lane) | REPEAT ask: PASS branches since 24/11 never landed (see Dropped) |
| 27-29 | 27/11 06:38Z L2797 | Land PASSED branches in GROUP BUNDLES (UI/kit · foreman set · rules/numbers); save + play-stoppers alone | LC28 lander session_01Rc5AsKBqhCq1XrtewR7VyR; review/lc28-b1 448622df, lc28-rb d7718f8b | IN WORK (Bundle 1 gates running; Bundle 3 staged) | |
| 27-30 | 27/11 06:57Z L2804 | Audit all asks + duplicates | OWNER-ASK-AUDIT session_01Rc5AsN3VjEKRPNahxU31aV | IN WORK | this report |

Skipped as pure answers / approvals already folded above: L2705 (rec), L2712 (part of 27-4), L2729/L2742/L2755/L2763 approvals, L2753/L2756/L2758/L2760 (folded into 27-13), L2770 (folded 27-12).

## Duplicates
Running NOW (27/11 ~07:00Z, list_sessions):
- **Lãnh cung portrait filter: OWNER-UI-C session_01Rc5AsLoQNjZmHi3rWPc992 + KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq both on .kst-lc** (OD L2785–2798 list both as owner). KEEP KK56 as sole owner of the kit state (.kst-lc / frame-cold / dead b/w); OWNER-UI-C only wires lists + makes stills. Tell both in one line so they don't both edit the filter values.
- **Odds placement: KK56 (kitOddsBadge scope) + KIT-STAGE-R11 session_01Rc5AsK3LyLvFW9Yyf56KgJ (event hand wiring)** — split is fine (kit part vs wiring), but R11 add-on was cancelled 07:00Z; keep KK56 only for the badge.
- **Hành sự acts: DOOR-ONETAP (-hs f387c92d) + ACT-MOVE-6 session_01Rc5AsM9iW1G2zcaDL3uNtq + KIT-STAGE-R11** all touch Hành sự. ACT-MOVE-6 already rebases on door-onetap; R11 must only REMOVE the R10 tab tiles (no act logic). Keep all three, enforce order door-onetap → act-move-6 → R11 removal.
- **Tài nghệ cells: KIT-STAGE-R11 must REUSE tainghe-overview 624d39ea + tainghe-info-r5 88bd567f + 16fe9dca**, not rebuild (4th build of the same ask since 24/11: tainghe-overview → lc14/lc18/lc19 tainghe branches → tainghe-info-r5 → R11). Recommend splitting Tài nghệ off R11 into its own small seat if R11 is also doing the event hand, so the fast lane isn't blocked.
Earlier churn today (sequential, not parallel, but costly):
- PUNISH-TIER 3→4→5→6→7→8 (6 seats, real-proof → real-proof-r163d a2902d43 PASS dropped → real-proof-2 → remerge). Keep PUNISH-TIER-8 only.
- ACT-MOVE 1→6 (6 seats). Keep ACT-MOVE-6 only.
- Kit keepers KK49→KK56 (8 seats in ~8 h) and KIT-STAGE R5→R11 (7 seats); plaque confirm rounds KK53 → KK54 → kk54-rv166 a/b/c/d.
- Lãnh cung OWNER-UI-A→B→C after 7 owner corrections (L2774→2798) — the corrections, not the workers, caused the churn.
- Emperor favour: Foreman C EMP-DAY (where/when) vs ACT-MOVE (6 moves) — scopes were split by MAIN 168 00:42Z; not a duplicate, but EMP-DAY-B build is parked.
- WORKLIST_OPEN numbering: two rows numbered 45 (Phúc duyên, Lãnh cung) and two row 5 lines — fix numbering.

## Dropped / stuck (27/11 asks)
- review/real-proof-r163d **a2902d43** RV PASS → MAIN 173 «never» (superseded by real-proof-2) — deliberate drop, OK.
- review/kit-stage-r10 **86e0cbc8 / 352a5310** kitHandRows — VOID by owner 06:42Z (superseded, not a loss).
- review/kk56-std2 **4d77ca7a** RV-167 FAIL (tab odds badge); 2f2223f0 kept for Bundle 1 → re-check; 40193130 guard fix pending.
- review/e-gain3 **23b44074** LAND READY 06:52Z (Foreman E asked twice) — not yet in any LC28 bundle.
- review/hud-sacphong **34e25776** — HUD-SACPHONG session REVIEW_READY/idle; not in Bundle 1 list.
- review/kit-person-panel(-rv165) **34d41e13** RV-165 PASS-path, not in Bundle 1 list (lands with act-move).
- c3-seals **29462da0** (owner 23/11 OD L2193: «wire them in») — Foreman C reports «not on main» at 01:30Z, 03:15Z, 06:20Z; still not landed (belongs to the 23/11 part, flagged here).
- Plans waiting with no build: EMP-DAY-B (emperor-favour-plan f868ff7b), Phúc duyên phase 1 (phucduyen-plan 61af25bb), 3-tier CONVERT (tier-audit v2 99ead418).
