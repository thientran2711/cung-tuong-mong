# maid-8tabs — report (worker session_01Rc5AsN3dAttmwAANVGfgtX, MAIN CHÍNH 85)

PRIORITY #1 CHECK ('cung nữ maid tabs Phận sự Đồng liêu SRVTABS KCTABS kgOn'): OD 0 earlier rule (new rule 21/11 ~03:15Z + ~03:18Z) | main dev/build/j42.js SRVTABS + srvTabs + srvHead, j79 kgOn (isSrv off), jhc:185 court/men hidden for srv, jht:174/278 HTK off for srv, jkc KCTABS/kcTabs + kgOn off at home, jk3 K3_RIGHT servant box | review/* none | claims: this row only.

START_CTX ~4 % (1M window). Finished well under the rollover line.

Branch **review/maid-8tabs** @ **5d0ac1c6** (base origin/main a88b14f0). TIER BIG.
Shots (Fold 755x1000 + iPad 1180x820 side by side, @2, real pictures): CDN `img/_review/maid-8tabs/` (11 files: maid-01-home-33 … maid-11-menh-truyen-so-ghi). Looked at all of them 3×.

## What changed
- **dev/build/jroad8.js (new, last in assemble.py)**: `ROAD8` = THE ONE mapping table (consort tab key → what a road shows there). Owner decides the final mapping later → only this table changes. Guards: unknown / hidden key on a road → Hành sự (old links/saves); `renderPanel0` dispatch (road panel under its own key, kitEmpty, or the consort panel as is). Helpers `road8Hide / road8Label / road8Name`.
- **j79**: `kgOn()` true on every road (only death turns groups off); `kgKeys` drops keys ROAD8 hides; `kgLabel` reads ROAD8 labels; `kgBar` hides every non-head member (incl. hidden keys); a group with one sub-tab shows no sub-tab row.
- **j42 (cung nữ)**: bar no longer relabelled/hidden (`srvTabs` no-op; SRVTABS kept only as old names); `tab in SRVTABS` guard gone; **#33 `srvHead` strip removed** (function deleted); `rkName(S)` / `rkOfFace("consort",S)` = her servant rung on her road (consort panels said «Đáp ứng»).
- **jhc / jht**: Chí tôn, Nam nhân and the 5 Hoàng tự sub-tabs open on the maid road too; Ân oán self row = her rung; the court/rel sub-label override respects ROAD8.
- **jkc (tiểu thư ngoài cung)**: same 8 tabs + groups at home (kcTabs no-op, KCTABS guard + kgOn override + ksub removal gone); «Áp lực hôn sự» chip opens Giao tình (rel).
- **jk3 (#33 right column)**: maid = «Chủ tin N» kit button (same `krailb krailt kgfbtn`) where the consort has «Cung nhân», then Chí tôn, then the **Ân sủng card** with Tai mắt + Ngài để ý (nt) + Công lao + Lương tháng (+ Tân Giả khố / Biết chuyện của chủ / Tai mắt cho người khác when they apply). The separate servant box (srk/nt/wage/merit) is gone; srk is the header title. Phone-map rail gets the same Chủ tin button.
- **jpet**: Tư trang › Thú cưng sub-tab (kitEmpty «Phận cung nữ chưa được nuôi thú cưng…») + the empty pet slot on the maid road (pet rules unchanged: tsbOn still off for her).
- **Words (fix the group)**: j42 entry card «Mục Hành sự … Dư đồ … Hậu cung › Đồng liêu», jexam «ở Hành sự», jtut tab rows identical for every road, jgoal `tabName` / goal «where» via road8Name («Hậu cung › Đồng liêu»), j84 dead SRVTABS rename + «Mục Việc» pair removed.
- Kit parts only (law 9): kit sub-tab row, kitEmpty, kit rail button, k3 Ân sủng card. No new CSS.

## MAPPING TABLE (ROAD8 in dev/build/jroad8.js — the owner's later ruling changes only this)
| Bottom tab (same on every road) | Sub-tab key | Consort | Cung nữ (srv) | Tiểu thư ngoài cung (kc) |
|---|---|---|---|---|
| Hành sự | act | Hành sự | **Phận sự** cards (her deck) | Khuê phòng cards |
| Dư đồ | go | Dư đồ | her Dư đồ (srvMapFix) | her home map |
| Hậu cung | court | Chí tôn | Chí tôn (consort panel) | **Thư từ / Tin trong cung** (KCTABS.kid) |
| | rv | Phi tần | Phi tần | **Gia tộc** (KCTABS.rv) |
| | men | Nam nhân | Nam nhân | — (not a sub-tab) |
| | staff | Cung nhân | **Đồng liêu** | — |
| Giao tình | rel | Ân oán | Ân oán | **Giao du** (KCTABS.staff) |
| | fac | Phe phái | Phe phái | — |
| Hoàng tự | kid kvo kin hon qt | 5 sub-tabs | same 5 (Con của ta = «Ta chưa có con» card) | kitEmpty «Ngươi chưa vào cung, chưa có con.» |
| Tư trang | inv | Túi đồ · Thú cưng · Việc | same 3 (Thú cưng = kitEmpty) | same |
| Tài nghệ | art | Tài nghệ | Tài nghệ | hers |
| Mệnh truyện | story | Mệnh truyện | **Thân phận** cung nữ | her Mệnh truyện |
| | q72 | Việc nhờ | Việc nhờ | — |
| | log | Sổ ghi | **Sổ ghi** | — |
(KCTABS names follow her variant: thôn nữ / công chúa hòa thân — e.g. Thư từ · Vương tộc · Triều đình.)

## BEFORE / AFTER — every maid-only (and home-road) layout difference removed (#32 + #33)
| # | Place | Before | After |
|---|---|---|---|
| 1 | bottom bar, cung nữ | 5 tabs «Phận sự · Dư đồ · Đồng liêu · Thân phận · Sổ ghi» | the consort's 8 tabs, same order/labels |
| 2 | sub-tabs, cung nữ | groups off (kgOn false) | same groups + sub-tab row as consort |
| 3 | Chí tôn / Nam nhân | hidden on maid road (jhc) | sub-tabs of Hậu cung |
| 4 | Hoàng tự sub-tabs | Kế vị … Quý tộc hidden (jht) | all 5 |
| 5 | Tư trang › Thú cưng + pet slot | missing for maid | present (kit empty card / empty slot) |
| 6 | strip under tabs (#33) | «Cung nữ tam đẳng của … · Chủ tin 43» | removed (header already says it) |
| 7 | stage right column (#33) | Tịch Cần viện + «Chí tôn» only + separate servant box (Cung nữ tam đẳng / Hoàng thượng để ý / Lương tháng / Công lao) | consort layout: «Chủ tin N» in the Cung nhân place · Chí tôn · Ân sủng card (Tai mắt + her facts) |
| 8 | her title in consort panels (Ân oán self card, etc.) | «Đáp ứng» | her servant rung («Cung nữ tam đẳng») |
| 9 | bottom bar, tiểu thư ngoài cung | 8 tabs with other names (Khuê phòng · Gia tộc · Giao du · Thư từ …) | the consort's 8 tabs; her panels as sub-tabs |
| 10 | help / goal / exam lines | «Phận sự», «Mục Việc», «Đồng liêu» tab names | the 8-tab names («Hành sự», «Hậu cung › Đồng liêu») |
Scan used: dev/test/maid-8tabs.js (bar + every tab/sub-tab key set equals the consort's on both roads) + a panel scan for any consort rank printed next to her own name on every maid tab (none left).

## Tests (on 5d0ac1c6 unless noted)
- `bash dev/tools/quickcheck.sh` — PASS on 06807c14 (render 263/267 ms, tab 437/449, buổi 1339/1457, core gates PASS); on 5d0ac1c6: run A FAIL on perf only (buổi median 3427 vs live 1091; runs 4814/1092/3427), run B **PASS** (render 250/245, tab 447/422, buổi 1321/1004; runs 3223/1255/1321). One slow buổi run in each 5d0ac1c6 pass vs none on 06807c14 (runs 1339/1487/1233); the only code between them is the rkOfFace/rkName wrappers (O(1)) + one jhc label + one jk3 label — looks like box noise, but **reviewer: please re-measure buổi** (quickcheck perf).
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js` — 92/92.
- **both-seat** (new check in coop-e2e: the 8 tabs + each seat's own road): `COOP_A_ORIGIN=tt COOP_B_ORIGIN=cnv` — **94/94** (one earlier run 92/94: «both seats show the same Thái hậu picture» on the maid seat, gone on the re-run; not tab related, flaky S.thO timing).
- `node dev/test/maid-8tabs.js <new> <old live>` (new) — **41/41** on Fold + iPad: 8 tabs maid/home/consort, same sub-tab keys, labels, every tab opens, #33 strip/column/Ân sủng, her title, **rank-up maid→consort** (lands on Hành sự, consort sub-tab names, Cung nhân button, every tab opens), **old save from the live build** (loads, Hành sự, 8 tabs, remembered Hậu cung sub-tab), home road Hoàng tự empty card, no page error.
- `dev/test/tab-pairs.js` — consort 56 pairs ×2 sizes, 0 mismatches; same test pinned to the maid road (scratch copy) — 56 pairs ×2, 0 mismatches, 0 errors.
- `node dev/test/role-parity.test.js dev/index.html` — ALL PASS.
- `maid-ladder-6.js` 11/12, `promo-exam.js` 32/33 — the failing lines (old build «5 rungs, no lad6»; promo-exam old save) fail the same way with main a88b14f0 as the new build (pre-existing / stale), not this branch.

## Notes for the reviewer
- No save field changed (tab is not saved); old localStorage `hclh-kg-*` keys stay valid.
- Co-op sends no UI state; each seat computes its own road (verified both seats).
- Known open (not in scope): kc road shows the consort pet sub-tab because tsbOn is true at home (unchanged behaviour).

## HANDOVER (worker rolls over at START_CTX+25 %; MAIN CHÍNH 87 opens the successor) — addenda #34 / #35 / #36 vs 5d0ac1c6
Read OD rows «21/11 ~03:20Z», «~03:22Z», «~03:25Z» verbatim + shots img/_review/refs/owner-2111-maid-master.jpg, owner-2111-dongliu.jpg. Branch review/maid-8tabs @5d0ac1c6 is the base (merge newest origin/main first, rebuild index.html/sw.js).
Status in 5d0ac1c6:
- **#34 master strip → right-column box**: strip DONE (it is j42 `srvHead`, deleted). MISSING: master as a BOX in the stage right column, same kit box as the consort's Hoàng thượng row (jk3 `k3court` .kcrow inside the Chí tôn fold / kitCourtRows), showing «Chủ tin N», tap → master's kit person sheet. Today a «Chủ tin N» kit button sits in the Cung nhân place (jk3 `kitGroupBtns`, tap = HX text) — per #36 that place must become «Đồng liêu» instead (see below), so move Chủ tin onto the master row. Suggested: wrap `kitCourtRows` (as jkc does) on isSrv to prepend {k:"mis",who:<master rank+name>,f:pv(srvM()),mood:["Chủ tin "+S.tin,..]} and route data-kc="mis" to the master's person card (Hậu cung › Chủ tử pager on the master, or the kit person sheet used by kitCourtOpen).
- **#36 same right-column boxes, labels from ONE table**: Ân sủng card for maid DONE (jk3 `k3AsRows` srv branch, K3_SRVAS). TO DO: (a) one label table (extend jroad8 ROAD8 with `lab:{cn:"Đồng liêu",rv:"Chủ tử",staff:"Đồng liêu"}` and make kitGroupBtns / k3crew / kgfDrop / sub-tab labels read it); (b) maid «Cung nhân» box = «Đồng liêu N» listing her colleagues (`srvColleagues()`), `kgfCount("cn")` returns 0 on srv today — give it the colleague count and `k3crewList` the colleague chips (data-k3go="staff"); (c) Phi tần sub-tab label → «Chủ tử» for maid (ROAD8.srv.rv.l); (d) check jts boxes (Nguy hiểm chung, Xét phẩm) appear on srv like consort — jts may gate on kitRoad/isSrv: grep jts.js for isSrv/kitRoad; Xét phẩm for maid = her rung exam (jexam) or kitEmpty-like row, ask nothing, pick the honest value.
- **#35 ONE SHELL**: DONE: one tab bar for every status (j79 KG + kgOn everywhere; j42 srvTabs / jkc kcTabs bar relabel+hide removed, SRVTABS/KCTABS guards removed, jhc court/men hide removed, jht HTK srv-off removed); co-op guest uses the same code (both-seat check in coop-e2e). TO DO: (a) delete the leftover stubs (j42 `srvTabs` + SRVTABS const + its jgoal/j84 references; jkc `kcTabs`); (b) Đồng liêu in the SHARED person-tab layout (pager strip + one pcard per colleague, same as Cung nhân tab — find the Cung nhân renderer, likely jaudit/jstaff/j14 staffTab) instead of j42 `srvStaffHTML` .srvrow list: build pcard per colleague with the same act buttons (data-cnv chat/gift/ask/frame/poison) as groups; delete srvStaffHTML/.srvrow CSS; (c) report a scan: `git grep -nE "SRVTABS|KCTABS\\[|kcTabs|srvTabs|data-tab=.*display|style.display=.*isSrv|isKc\\(\\)\\?.*tab" dev/build` → no status-specific tab bar; list every removed path (file:function): j42 srvTabs/SRVTABS guard/srvHead, jkc kcTabs/KCTABS guard/kgOn override/ksub removal, jhc render court/men hide, jht render HTK srv-off + panel srv bail, j79 kgOn isSrv, jpet isSrv bails.
- Tests to re-run after: dev/test/maid-8tabs.js (update: Phi tần label «Chủ tử», right column «Đồng liêu N» + master row with Chủ tin), coop-e2e tt+nc and tt+cnv (both-seat check), tab-pairs (+maid copy), role-parity, quickcheck (re-measure buổi), Fold+iPad shots of all 8 tabs → CDN img/_review/maid-8tabs/ (wipe old first).
Scratch tools I used (not in git, recreate if wanted): a shots script walking every bar tab + .ksub sub-tab per road (srv via __forceOrigin='cnv'; kc via start() until kcOk && !S.srv, nlCard(), click [data-kcp="nha"], click [data-nl="ok"]).

---
# maid-8tabs-2 — report (worker session_01Rc5AsKY5rVpiLYpPGJuZPT, MAIN CHÍNH 87 → 88)

PRIORITY #1 CHECK: OD 21/11 marks #32–#36 (rows ~03:15Z–03:25Z verbatim) | main LIVE 6e07f837 (merged first) | review/maid-8tabs 5d0ac1c6 → this work | claims: maid-8tabs row (this session). START_CTX ~3 % (1M window); finished well under the rollover line.

Branch **review/maid-8tabs** @ **7d68436b** (merge of origin/main 6e07f837 + 3 work commits). TIER BIG.
Shots (Fold 755x1000@2 + iPad 1180x820@2 side by side, real pictures): CDN `img/_review/maid-8tabs/` (old 11 wiped; 14 new: m8-01-home … m8-14-duđo). Looked at all 3×.

## #32–#36 — where and how tested
| Mark | What | Where (file:function) | Tested by |
|---|---|---|---|
| #32 | same 8 bottom tabs + sub-tabs on every road | jroad8 ROAD8 + j79 kgOn/kgKeys (from 5d0ac1c6) | maid-8tabs.js bar + key walk srv/kc/consort, tab-pairs consort + maid copy (56 pairs ×2 sizes, 0 mismatch) |
| #33 | no strip; right column = consort's | j42 srvHead gone (5d0ac1c6); jk3 kitGroupBtns now exactly the consort's two buttons (extra «Chủ tin» button + phone rail item removed) | maid-8tabs.js #33 rows |
| #34 | her chủ = court box row «<phẩm> <tên>» + «Chủ tin N», tap → her card | j42 srvCourtRow + kitCourtRows/kitCourtOpen("mis") wrappers; j61 k61Own (law 6b: a maid knows her own chủ and the colleagues she serves with / has met: no grey «Người lạ» on stage, chủ row, Đồng liêu pager or greyed card buttons) | maid-8tabs.js #34 (row text, tap → Hậu cung › Chủ tử on her, card name); shots m8-02, m8-04 |
| #35 | Đồng liêu = shared person-tab layout; stubs gone | j42 srvStaffTabHTML (kit pager + one pcard, act buttons in card groups «Giao thiệp»/«Mưu kế»); deleted srvStaffHTML, .srvrow/.srvhead CSS, SRVTABS, srvTabs, jkc kcTabs | maid-8tabs.js #35 (strip, faces = colleagues, 1 pcard, no .srvrow, «Trò chuyện» spends 1 khắc); ag-stf2 23/23; shot m8-05 |
| #36 | same boxes, words from ONE table | jroad8 ROAD8_LAB (cn/ct labels) + road8Lab; ROAD8.srv.rv «Chủ tử»; jk3 kgfLab/k3crewList/kgfCount/kgfDrop/kgfRail read it; jts tsBoxOn: Nguy hiểm chung + Xét phẩm on her road, tsSrvRows/tsSrvPromoPanel = her next rung (Công lao, bậc cung chủ cho phép, Chủ tin ≥ BAL.srvx.tinUp — new BAL key replacing the typed 35 in j42 srvMonth, law 4) | maid-8tabs.js #36 (fold = colleagues, tap → her card, labels, chips + panels); shots m8-01/03/07/08 |

## Group bugs found on the way (fixed whole group, law 11)
| # | Bug (pre-existing, also on the consort road) | Fix |
|---|---|---|
| 1 | j79 kgBar: a member tab that was once a group head kept data-kg (rv headed Hậu cung before jhc rebuilt KG) → a tap on it (kitCourtOpen Hoàng hậu / chủ) opened the group's LAST sub-tab (Cung nhân) | member branch drops the stale head mark |
| 2 | jk3: a tap on a person INSIDE the open fold (Cung nhân chips, Hoàng hậu row) only closed the fold — the «tap outside closes» guard ate the tab click it sends | kgfShut() before navigating (k3go + kitCourtOpen wrapper) |
| 3 | j27: PG.rv is the palace-grouped STRIP position; kitCourtOpen set rivals.indexOf → Hoàng hậu / chủ row opened another consort's card | rvOrd()/rvPgOf(v), used by jk2b (hh) and j42 (chủ) |

## Removal list + scan
Removed: j42 SRVTABS, srvTabs (+ its render call), srvStaffHTML, .srvrow/.srvhead CSS; jkc kcTabs (+ call); jk3 «Chủ tin» group button + kgf-tin rail item. (From 5d0ac1c6: j42 srvHead, SRVTABS guard; jkc KCTABS guard / kgOn override / ksub removal; jhc court/men hide; jht HTK srv-off + panel bail; j79 kgOn isSrv; jpet isSrv bails.) KCTABS stays = her home panel NAMES read by ROAD8.kc labels and her goal lines (no bar code).
`git grep -nE "SRVTABS|KCTABS\[|kcTabs|srvTabs|srvStaffHTML|srvrow|srvhead|style.display=.*isSrv|isKc\(\)\?.*tab" -- 'dev/build/j*.js'` → only j84 comment + jkc2 KCTABS[t] (variant names) + jht kgOn (always on). No status-specific tab bar left.
Test tools updated to the new renderer: dev/tools/role-parity-scan.js (tabAll("srvStaffTabHTML")), dev/test/ag-stf2.js.

## Tests (on 7d68436b unless noted)
- quickcheck 7d68436b: PASS (render 231/286, tab 455/520, buổi 1531/1214 ms, tasks>200ms 19/23; core gates PASS). Earlier a0e3590f: PASS (buổi 1293/1690).
- coop-e2e tt+nc 94/94 (a0e3590f); tt+cnv both-seat on 7d68436b: 92/94 then 94/94 on re-run (the 2 lines = «same Thái hậu picture» on the maid seat, the known flaky S.thO timing noted in 5d0ac1c6, not tab related).
- maid-8tabs.js 57/57 (Fold + iPad, old save from LIVE 6e07f837, rank-up, home road).
- tab-pairs consort 56×2 0 mismatch; maid copy 56×2 0 mismatch.
- ag-stf2 23/23.
- role-parity: ALL PASS (peak RAM ~13.6 GB used on the box). First runs failed «maid:N-ONLY ask / frame / poison»: the scan read the deleted srvStaffHTML, then the shared pcard greyed buttons of met colleagues as strangers — fixed (k61Own: her chủ + colleagues she serves with / met = known; scan uses tabAll("srvStaffTabHTML")).

## Notes for the reviewer
- No save field changed. Co-op sends no UI state.
- Her chủ's card still says «Ghen/Đức/Tính nết: chưa rõ» (knowledge rules of j25/k61, unchanged — not in these marks).

## maid-8tabs-2 — FIX ROUND for rv FAIL 1 → **941c1367** (on reviewer f479ac2f)
- jts tsGuardW/tsOptGuard: ONE act, two roads. Consort «Đóng cửa giữ mình» (Sủng −BAL.tsGuard.sung, kèm ít gặp Hoàng thượng). Cung nữ «Nép mình theo hầu chủ» (Chủ tin −BAL.tsGuard.tin = her Sủng bar; need: not in Tân Giả khố; kèm ít được chủ sai việc; log phòng hạ nhân / theo sát chủ). Same gain s.guard for BAL.tsGuard.wk weeks (npcAct wrapper + jagharm haGuardW).
- Law 4: typed sung −2 / 2 weeks (player + NPC tsNpcDanger) → BAL.tsGuard {wk:2,sung:2,tin:2} (values unchanged).
- Whole group on the maid road: guard FIXED; Biếu quà làm lành → Lễ bạc / Tác phẩm / Đồ trong rương: real bạc cost (BAL.tsGift), real gain, honest need, no consort words → kept (probe); tsDangerOmen «Ghi nhớ…» only on the consort road (endTurn !isSrv) → n/a.
- Gates: maid-8tabs.js 59/59 (new line: danger panel on her road = «Nép mình theo hầu chủ», fx tin −2, guard 2 wk, no Sủng / door / servants words); quickcheck 941c1367 PASS (render 236/242, tab 491/454, buổi 1296/1319; one earlier run perf-only FAIL tab 636/465, noise — re-run PASS).

## HANDOVER maid-8tabs-2 → successor (rollover: context 38 % > START_CTX 3 % + 25 %; MAIN opens the successor)
State: review/maid-8tabs @ **941c1367** = reviewer f479ac2f + rv FAIL 1 fix (guard act maid-true, BAL.tsGuard). SẴN SÀNG KIỂM 941c1367 sent to MAIN 90 + rv session_01Rc5AsMYd9YDaGJ8Zvocx99 (gates: maid-8tabs.js 59/59, quickcheck PASS). Role-parity NOT re-run on 941c1367 (last ALL PASS on 7d68436b; jts change touches no scanned act) → successor: run it alone (~25 min, peak ~13.6 GB).
OPEN — MAIN 90 order (06:53Z), not done: «every act offered on a non-consort road must be role-true» — the reviewer's note: the maid's Hậu cung › Chủ tử cards (j15 rvCard + j24/j25/j51/j54/j65 wrappers, act groups RVGRP + kneed acts) offer ~50 consort acts with consort words/costs on the maid road. Probe list (srv, Chủ tử cards): Mời đến cung ta · Kết giao (Bạc 30, «không còn ai rảnh để sai, người hầu») · Tặng quà · Giúp chăm thú · Tố giác / Tố tội thật / Bóc chuyện tư tình / Trình Thái hậu / Trình Hoàng hậu / Uy hiếp đòi bạc / Bán cho phe khác / Trả chứng cứ · Tung tin đồn · Dò la · Ngáng chân · Tát · Phạt quỳ (ngươi là Hoàng hậu / trên ba phẩm) · Bỏ phấn lạ · Tự đi dò la · Ép nộp của (phẩm cao hơn) · Hại/Trộm thú · Hắt nước/trà · Quạt mực · Vu oan (Sủng ngươi −10 on fail) · Cài đồ vào rương · Rút thẻ bài · Mua chuộc cung nữ · Hặc ăn mặc sai phẩm · Tố xa xỉ · **Tranh sủng / Chặn ngự giá (fail: Sủng −4)** · **Ly gián (Sủng ngươi −4)** · Xin Hoàng hậu giáng · Giá họa trộm đồ · Sai người lấy trộm đồ · **Sai cung nữ thân tín** lấy đồ / lấy lòng · Nhờ ơn người quen rút thẻ bài · Thả thú dữ · Phóng hỏa kho · Hạ độc / Hạ độc dần · Đẩy xuống hồ sen / Đẩy con nàng xuống hồ · Bỏ xạ hương · Mua chuộc bà đỡ · Hủy dung · Tặng quà ăn có độc. (Role-parity does NOT see them: role-parity-scan reads rvCard only when !isSrv() — so they are also unchecked law-1 extras for the player maid.)
Why not built here: (1) size (~50 acts × cost/log/word, a design pass); (2) owner OD 21/11 ~03:15Z: «đổi cái gì vào trong cái tab gì cho nó đúng thì tôi sẽ báo bạn sau» — which consort acts a maid keeps is HER mapping (law 16/17: ask MAIN/owner, don't invent).
Suggested plan for the successor (MAIN decides first): A) interim, smallest true fix = on the maid road the Chủ tử card keeps the person info + only acts a cung nữ really has (the maid:* rows of dev/tools/role-parity-scan.js tables lines ~20-40: e.g. Đến cung thăm only when chủ sai, Dò la/Tố with her own SRVA costs) and moves the rest behind ONE kitEmpty-style line «Việc của phi tần — cung nữ không làm được» (no lock icons, owner said no locks: so preferably simply absent), mapping table in jroad8 (ROAD8.srv.acts allowlist) so her later ruling changes one table; B) full: give each kept act a maid-true version (cost on Chủ tin/Công lao/Bạc from BAL, log words cung nữ), with role-parity extended to scan rvCard on the srv road (addP role "maid").
Worktree /home/user/wt/m8 (branch review/maid-8tabs @941c1367), scratch probes /home/user/wt/m8-tools (probe8.js = the act list above), shots /home/user/wt/m8-shots. Local servers 8871 (m8) / 8872 (live main) running in this session — a successor starts its own.
