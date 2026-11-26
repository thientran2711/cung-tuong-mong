# OB-PHU — home Dư đồ full screen + «N bóng» + outside→palace carry-over audit (owner 25/11 ~22:52Z)

PRIORITY #1 CHECK ('dư đồ|du do|kcgo|full ?screen.*map'): OD 109 | ledger 7 | claims 8 | main 15 | review/* 0 | archive 143
PRIORITY #1 CHECK ('bóng|silhouette|kcgPeople|shadow'): OD 75 | ledger 1 | claims 8 | main 15 | review/* 0 | archive 151
PRIORITY #1 CHECK ('carry|hồi môn|inPal|Thư nhà|kcCarry'): OD 18 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 135
Reused: palace map mode `maptab` (j38), palace info row bits (j27 mapHTML), KIT §85; §9 carry-over already mostly built in jkc/jkcg (audit below). No review/* branch held this fix.

Branch: review/ob-phu (base LIVE origin/main 5e013076). Shots: CDN img/_review/ob-phu/.

## Part 1 — home Dư đồ full screen (whole family, law 11)
Cause: jkc renderPanel0 (home road) always REMOVED `.game.maptab`, so the home map rendered as the right-hand panel beside the stage.
Fix: jkc.js renderPanel0 adds `maptab` whenever the home map renders a `.mapv` (all home maps: Trong phủ, Kinh thành, kd roads' maps; Danh sách stays a list). jmapc.js KIT §85.6b: a full-screen map with a kit sub-tab row (`.kpbar`) = flex column, map takes all the rest (otherwise the map ran under the bottom tab bar). KIT.md §85.6b written.

| Map | before (iPad 1180x820) | after |
|---|---|---|
| Palace Dư đồ (all zooms, courtyard, Ngự hoa viên level) | full (maptab) | unchanged (NHV-BUILD told to stay inside maptab/.mapv) |
| Home «Trong phủ» | right half 564px, stage on left | full scene area 1162px, stage hidden |
| Home «Kinh thành» | right half | full |
| kd roads (Ba Tư / Nam Chiếu / dân) maps | right half | full |
| Danh sách (list) | panel | panel (unchanged, as palace) |

## Part 2 — people on the home map
Before: home spots showed faces only, no count row. After: the SAME info row as the palace (j27): «N bóng · K khắc», her place «Ta + N bóng · còn K khắc» / «Chỉ có ta · còn K khắc». N = real people of the one home ledger S.kc.at at that place this buổi (family, teachers, nhũ mẫu, bà mối, khuê hữu at phủ thế giao, người ấy) — law 6b, nothing invented. No separate servant records exist at home (her tỳ nữ walks with her, as the palace maid is not counted in countAt), so none are added.

## Part 3 — §9 carry-over audit (LIVE 5e013076) and what was built
| §9 row | LIVE status | code | now |
|---|---|---|---|
| Sắc/Tài/Tâm cơ/Đức/Sức | BUILT (cap 0 = off per OD:L1288) | jkcg.js kcEnter wrap (st0/cap) | same |
| art xp → tài nghệ | BUILT (same state fields) | — | same |
| Danh ×0.6 max 30 | BUILT | jkc.js:579 (BAL.kcg.carry.danhK/danhMax) | same |
| Hồi môn → Bạc + items | BUILT | jkc.js:579, Rương đồ khuê các items stay in S.inv | same |
| tỳ nữ thân cận → her staff, high Lòng | PARTIAL: thd origin = jcmaid swapped her for a Nội vụ phủ pick at first palace month («Không ai theo ngươi từ nhà»), td/ch labelled «Nội vụ phủ cắt cử»/«người Thái hậu ban» | jcmaid.js:114, jkc.js:137 | BUILT: kcTy maid = src home (land for kd), loyalty kept, no cmPick |
| Phụ thân af → «Nhờ cha dâng sớ» | BUILT | jkcg.js:82 askO wrap | same |
| Mẫu thân af → letters/gifts | BUILT | jkcg.js:98 kcgPalMonth, Tư trang › Thư nhà | same |
| clan pow / F3 | BUILT (home acts write the real j55 pow) | jkc.js:208, :482, jkc3.js:183-185 | same |
| intel letters → npcKnows | BUILT | jkc.js:297 kcIntel1 → k61Know | same |
| thứ muội / khuê hữu → consorts, real relations | PARTIAL: only half of their liking, one way; her own liking (m.me) and Oán dropped (law 1) | jkc.js:584 | BUILT: af ×rel.af, me → S.rl ×rel.me, Oán ×rel.oan (BAL.kcg.carry.rel) |
| TM96 seeded | BUILT | jkc.js:140, jkc3b.js:75, jkc3.js:142-144 | same |
| Lời đồn ≥40 → «lời đồn cũ» | BUILT | jkcg.js:102 + PEND.kcgLd | same |
| «Thư nhà» | BUILT | jkcg.js:126 KINV_XTRA | same |

Visible at home (plan §5 roster allows it): Gia tộc › Người nhà now has the tỳ nữ's own card (Lòng trung; «Vào cung · Khi ta vào cung: theo ta làm tỳ nữ hồi môn, giữ nguyên lòng trung»); thứ muội / khuê hữu cards add «Nếu trúng tuyển: cùng ta vào cung làm phi tần, giữ nguyên tình cũ oán xưa» under «Cùng đi tuyển tú».

Answer to her question (for MAIN, Vietnamese): giai đoạn ngoài cung là để nàng xây vốn trước khi vào cung — tư chất, tài nghệ, Danh, hồi môn, thế lực nhà cha, tin về phi tần; người ở nhà KHÔNG biến mất: tỳ nữ theo vào cung, thứ muội / khuê hữu trúng tuyển thành phi tần (giữ thiện cảm và oán), cha giúp dâng sớ, mẹ gửi thư/quà, người ấy (thanh mai) nối tiếp chương trong cung, lời đồn cũ có thể bị đào lại.

## Tests
- dev/test/outside/route.js gained the §9 checks (same maid before/after entry, src home/land, no cmPick queued, consort from home has her→them relation).
- quickcheck (alone) 53bb193c vs LIVE 5e013076: build ok · time-spill PASS · open/old save ok · perf PASS on the solo re-run (render 243/234, tab 549/471, buổi 1782/2331 ms; the first run's buổi 3768 was load noise from parallel runs) · CORE GATES: only G4 button-crawl «Ô lưu · Lui» FAIL — the SAME fail on LIVE 5e013076 (crawl run on the live build) = pre-existing, not this branch.
- coop-e2e alone: 143/143 passed.
- outside route.js: tt iPad 1180x820 PASS incl. new §9 checks (maid same/src home, sister consort her→them rel present). thd Fold: «did not enter the palace» + 3 follow-ons — the SAME fails on LIVE (plus LIVE fails the new check «home maid labelled palace», fixed here) = pre-existing thd jump issue in the test path, reported to MAIN.

## Deliverables (CDN img/_review/ob-phu/, looked at)
ipad-BEFORE-home-map-half.jpg · ipad-home-map-phu.jpg · fold-home-map-phu.jpg · ipad-home-map-kinh.jpg · fold-home-map-kinh.jpg · ipad-palace-entry-carry.jpg · fold-palace-entry-carry.jpg · ipad-home-tyno-card.jpg · ipad-home-thumuoi-card.jpg

## Notes for MAIN (not in this brief, seen while testing)
- At home the bottom tab bar still reads palace names (Hành sự / Hậu cung / Giao tình / Hoàng tự) — KCTABS (Khuê phòng / Gia tộc / Giao du / Thư từ) are not applied on LIVE.
- Stage chips «1 Cung nhân · 3 Chí tôn» at home = the ~22:45Z bug (other fixer).

## HANDOVER (rollover, 25/11 ~23:50Z) — parts 4/5 + add-ons NOT started
Parts 1–3 above are done (cf143155). Queued by MAIN 146/147/148 after the brief, not started (successor picks up, base review/ob-phu):
- PART 4 (owner 25/11 ~23:00Z, shots k5/k6/k7 in dev/handover/refs/owner-2511-kiep/): ALL person info (portraits, person cards, nết/ghét/đã biết/dạo này, thiện cảm pairs) only in a dedicated PEOPLE tab; action tabs (Giao du/Giao tình, Tài nghệ, Khuê phòng, palace tabs) hold ONLY actions; an act about a person names/links the person (tap → People tab), never embeds the card. Home: jkc kcArtHTML (teacher skill card), kcSocHTML (Áp lực hôn sự + bà mối card in the act stream), kcFamCard groups «Việc» (acts inside person cards). Palace: check existing people tab (Hậu cung) first. Kit part with KK33. Before/after table of every tab.
- PART 5 (owner ~23:45Z, shot k17): Dư đồ too much text → zone tags for similar non-consort places (OD ~L1898 + ~19:40Z/19:45Z 18/11 rows), tap zone = zoom + fog; one short count per label; status banner owned by PLACE-RULES session_01V1ZZH3XzLLpDVWarrvHjvA. Gate Zero: review/map-zones + map-zones-r6 exist (reuse). Add Dưỡng Tú viện as a real place (MAIN 148).
- iPad: «Về phòng/Về Khuê phòng» button + top bar never cut on Dư đồ (k17).
- IPAD-SIZE: call k3RowH(mv) next to k3RW(mv) in k3Stage for the map view (KIT 56.28, review/ipad-size 7eb0154b); check dev/test/ipad-size-ratio.js.
Tools: my shot driver /home/user/wt/obphu-t/home.js (env ORG, DUMP, EXTRA=[[name,js]]) enters the home road on a local build (python3 -m http.server in the worktree).

## OB-PHU2 (successor, 26/11 ~00:40Z) — parts 4 + 5 delivered
PRIORITY #1 CHECK: OD 25/11 ~22:52/~22:56/~23:00/~23:40/~23:45Z + 18/11 ~19:25Z (L1898), ~19:40Z, ~19:45Z read verbatim | main: no zones (cancelled 18/11, jmapz §85.10 second level only) | review/*: review/map-zones 5692c687 jmapz sections 1-2 (zones/zoom/fog) REUSED, map-zones-r6 = the second level already in main; review/ipad-size 7eb0154b k3RowH (called guarded) | claims: PLACE-RULES session_01V1ZZH3XzLLpDVWarrvHjvA owns the cấm túc banner / home mark (not touched).
LAND READY: dcf260d3 (part 5 = d734dcf7, part 4 on top). Videos: img/_review/ob-phu/ob2-dudo-people-fold.mp4, ob2-dudo-people-ipad.mp4.
PART 5 (Dư đồ text, KIT §85.10 rewritten in place + §34.1d/85.2/85.6b):
- (0) every tag = name + «N bóng» only (walk khắc, «đang cấm túc», «hết khắc», «bái kiến» … gone from tags; still in title + tap card); her place keeps «Ta + N bóng · còn K khắc» (§41.2).
- (1)(2) zones «Nội vụ» (Nội vụ phủ, Tân Giả khố, Tích Cần viện, Dưỡng Tú viện) and «Hoàng tử sở» (A ca sở, Thượng thư phòng); Đông cung + every consort palace keep own tags; zone = total bóng, grey when all members grey; tap = zoom + fog, back = fog tap / rail back.
- (3) Dưỡng Tú viện = real place `dtv` (court of long halls south of Nội vụ phủ), open by day; picture STAND-IN cung-nhan → ART REQUEST: land Foreman C's c3-dtv set (img/_review/c3-dtv/duong-tu-*).
- (4) no tag cut at open: Fold portrait pads the pan by the rail (--kmv-fl 56px) + j38 open-scroll settle (home «Viện di nương / mẫu thân» were cut).
- «Về …» header button: shortens («Về Đức Thọ», then «Về») instead of being cut; full words in title. k3RowH(mv) beside k3RW(mv) (guarded until ipad-size lands).
PART 4 (people tab, KIT §6.3i): home Tài nghệ (teacher strip + card) and Giao tình (bà mối / suitor strip + card) → Gia tộc sub-tabs «Thầy dạy», «Người ngoài» (same kit pager + person card; their acts stay in the action tab and in the card «Việc»). Palace action tabs already had 0 person cards/strips.
BEFORE/AFTER (dev/test/people-tab-scan.js, iPad; LIVE 5e013076 → dcf260d3): home Giao tình strips 1→0, home Tài nghệ strips 1 (all 5 sub-tabs)→0; every other action tab home + palace 0→0.
TESTS (local build): map-zones-scan Fold+iPad day/night/cấm túc/zone/home PASS · map-labels-scan PASS (zone rule added) · people-tab-scan PASS (LIVE FAIL 2) · coop-e2e 143/143 · quickcheck d734dcf7: build ok, time-spill PASS, open/old save ok; CORE G4 «Ô lưu · Lui» = pre-existing on LIVE; LOOK-DEDUPE flagged under load but PASS alone on this sha and on LIVE; perf not reached (900 s cap while other tests ran) → re-run alone recommended.
OPEN (not done): act card → tap person name opens that person in the people tab (only kcSel hook added, no chip on the card yet); «Bảng tài nghệ hậu cung» table under Tài nghệ is consort info in an action tab — ask MAIN whether it moves to Phi tần.
### OB-PHU2 add-on (26/11 ~01:15Z): stacked on PLACE-RULES + maps wait — LAND READY (code) cbd94e4d
- Merged review/place-rules 3da9b4c8 (jplrule stays the LAST module / outermost map wrapper; its «Nhà ta ·» mark, one cấm túc chip, «Về phòng · N khắc» kept; my tag trim runs inside it). place-rules.js faults [] on the merge.
- KIT §85.11: every map waits for its painting + her mark (kit wait cue «Đang thỉnh tranh…», tags/mark invisible meanwhile, fade in); home map waits for its hotspot file instead of flashing the stand-in list (failed file → list; hung picture → shown after 8 s). Test dev/test/map-wait.js PASS Fold+iPad, palace + home.
- Re-run on cbd94e4d: map-zones-scan PASS, map-labels-scan PASS, map-wait PASS, coop-e2e 143/143.
- FOUND (not fixed, other family): the home «Danh sách» list (jkc kcMapHTML) lists places of every home road (Nhà tranh, Ruộng nhà, Bến sông, Thọ Xương cung, Tẩm điện của ta …) on the tt road.
