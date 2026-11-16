# Chapters 1-4 status per origin (read-only check, 11/16/2026 ~23:10Z)
START_CTX ~5 % (own estimate). Sources: origin/main 08725411d (22:44Z), origin/review/*, CLAIMS.md, FOREMAN_B/C/D_STATUS.md, reports/*.md, dev/story/ROAD_MAP.md. No code touched.
Owner priority (OD "16/11 ~22:00Z real"): ch1-3 (learning) + ch4 (real start) complete and polished, for EVERY origin.

## 0. What each chapter is in code
| ch | content | where |
|---|---|---|
| P0 | origin intro (narrated + painted panels + entry animation) -> [home road] -> selection minigame -> entry rank | C (intro), D (home roads, entry exam) |
| 1-3 | nhap14 / sung14 / tap14 (cnv: servant variants), milestone check + DO-the-feature quests | jst14.js (main), jtq14.js (review/tut-quests-r1) |
| 4 | `.4` = existing j67 premise arc ARC67[road], 4 roads per origin (rolled at rebirth) | j67.js + jorigins.js (main) |

## 1. Chapters 1-3 (learning) - same for all origins except noted
| Origin | Live on main (08725411d) | On a review branch | Missing / blocks |
|---|---|---|---|
| tt, dtq, muoi, cn, nc, td, ch, thd (consort) | LIVE: 14-chapter frame jst14 (story14-p1-r3 PASS, c053ee92, fast-forwarded in; story14-frame/host/view tests). Ch1-3 are milestones only (no quests): nhap14 "Nhập cung, đứng vững", sung14 "Lần đầu được sủng", tap14 "Học quy củ" | review/tut-quests-r1 **PASS 66f598de** (opus reviewer): 3 DO-the-feature quests per chapter, reward only on the deed, narrator = named official, kit-only; tut-quests 40/40, story14-frame 27/27, coop-e2e 59/59 x2 | Not live. Waiting for main's hourly batch: BATCH 23:32 (builder RUNNING, claim row) lists "B tut-quests" = IN the 11-branch batch. Open nit: nc starts with EMPTY chest -> ch1 "trang" quest only solvable by buying in Nội vụ phủ (reviewer added a hint; not hard-stuck) |
| cnv (servant start) | LIVE: servant variants of ch1/ch2 (Chủ tin, Đại cung nữ, Hoàng thượng để ý, phong Đáp ứng); len14 replaced by a shared arc when already raised | tut-quests-r1: maid quests (hau/le/di, chai/vuon/theu, chat/bieu/luyen), narrator Quản sự ma ma | Same as above. Dead regex "Quét sân" harmless |
| **bd (Bắc Địch)** | **MISSING: no chapter frame at all** (jst14 f14() false for a rolled bd life; no ch1-3, no numbering; story14 fast-bot had to pin tt for that reason) | review/tut-followups = worker RUNNING (claim 22:50Z, session_01N1tNP3UDczWXyX6AAfxasv), **no branch pushed yet** | bd lives skip the whole learning part until tut-followups lands + is reviewed (reviewer not yet opened). Same worker also converts j67 "Các bước" to kit ✓/✗ rows (kitChecks family) |

Known flake (not blocking): story14-frame fast bot stalls at ch10 arc tm96c (dtq/thd). tutorial.js replay mode fails on main too (pre-existing; tut-replay-r1 PASS cfea7435 is the fix for the title-menu replay, status of its go-live not verified here).

## 2. Chapter 4 (real start) - the j67 premise arc, 4 roads per origin
All 10 keys have 4 ch4 arcs LIVE on main (j67.js ARC67 for the 9 + jorigins.js for bd/nc extras; names read from code):
| Origin | ch4 roads on main | ch4 live? | Pre-palace before it (P0) |
|---|---|---|---|
| tt | tt_co, tt_oan, tt_tranh, tt_mat | LIVE | home road jkc LIVE |
| dtq | dtq_bien, dtq_vu, dtq_binh, dtq_huynh | LIVE | jkc LIVE |
| muoi | muoi_doi, muoi_lau, muoi_no, muoi_tuoc | LIVE | jkc LIVE |
| cn (raised maid) | cn_ban, cn_chu, cn_than, cn_tinh | LIVE | no home road (by design) |
| nc (Nam Chiếu) | nc_gian, nc_su, nc_tuc, nc_vuong | LIVE | home road jkc2 "nc" on branch only |
| bd (Bắc Địch) | bd_hoa, bd_ngua, bd_tuc, bd_hoang (jorigins.js) | LIVE as arcs, **but no frame -> not "chapter 4" of a numbered life** (see §1) | jkc2 on branch only |
| td | td_an, td_ke, td_song, td_tha | LIVE | jkc LIVE (fall card at entry) |
| ch | ch_benh, ch_bi, ch_co, ch_ho | LIVE | jkc LIVE |
| thd | thd_hoc, thd_sach, thd_tho, thd_tro | LIVE | jkc LIVE |
| cnv | cnv_ban, cnv_chu, cnv_ma, cnv_mat | LIVE | jkc2 "dan" on branch only |
Polish on ch4: the owner-facing rules (VANPHONG odds ladder, no %, history) were applied to the premise arcs by story14-p1-r3 reviewer fixes (preview ladder, ONE CORE for old len/sung). No open review finding names a ch4 arc as broken. NOT verified here: a fresh playthrough of every ch4 road (read-only status, no game run). `.4` is also what road ch5+ opens on (B), so a ch4 fix would ripple into the road files below.

## 3. Pre-palace P0 that feeds ch1-4 (intro + entry)
| Part | State |
|---|---|
| Home roads jkc (tt dtq muoi td ch thd) | LIVE on main |
| Home roads cn/nc/bd/cnv (jkc2 «nc» «dan»), entry selection exam (jentry), narrated origin intros (joi) | **review/origin-intros-r1 PASS 34d90ea4** (opus, BIG). It CARRIES review/kc-roads-cn-nc-fix2 (reviewer D) + entry-exam-r1; ships as one chain (fix2 is an ancestor). Not live. Not in the BATCH 23:32 list from the claim row (the 11 = 4 main + tut-quests, road-b1-fixa, seatcap, mem-upgrade, preg-rate, ghen-shown, danh-p1) -> **ask main to add origin-intros-r1 to the next batch** |
| Blocker history of that chain | kc-roads-cn-nc-fix-r1 FAIL (OD:L1288 value of "Chờ": cnv −45, nc +76) -> fix2 re-tuned BAL.kcv @18ff6eb0 (21:17Z). origin-intros-r1 reviewer re-merged it and passed; it did NOT print a fresh kc2val re-measure in what I read -> uncertainty, check with D that the ±gap is inside the spread |
| Origin intro pictures | Only tt-1..4, tt-h3, G1 painted on CDN (sample). The other ~45 panels + G2-G7 are §59 placeholders. review/intro-art branch is **not on origin** (not pushed / not found); worker ARCHIVED by C because the owner never answered "vẽ hay bỏ" (asked many times) -> **blocked on owner verdict** |
| Entry animation | KIT REQUEST K-OI-1 logged (caller ready, no-op) |

## 4. Ch5-11 (not owner priority now, one line)
Roads built in review, none live: road-b1-fixa-r1 PASS c012bf32 (tt/dtq/muoi/cn, in batch); road-b2-fix RUNNING (nc/bd/td/ch, r1 FAIL 8 being fixed); road-b3-fix2 RUNNING (thd/cnv + endgame, thd_hoc never runs fix). Landing order B1 -> B2 -> B3.

## 5. Origin x chapter summary (one cell = worst honest state)
| Origin | P0 intro/entry | ch1 | ch2 | ch3 | ch4 |
|---|---|---|---|---|---|
| tt dtq muoi td ch thd | old single card (LIVE); new intro PASS-not-live | milestone LIVE; quests PASS-not-live | same | same | LIVE |
| cn | same, no home road | same | same | same | LIVE |
| nc | new home road + intro PASS-not-live | same (+empty-chest hint in quests) | same | same | LIVE |
| cnv | new home road «dan» PASS-not-live | servant variant LIVE; quests PASS-not-live | same | same | LIVE |
| bd | same as nc | **MISSING (no frame)** -> tut-followups running | **MISSING** | **MISSING** | arcs LIVE, unnumbered |

## 6. What to do (for main s26)
1. BATCH 23:32 must really contain review/tut-quests-r1 66f598de (ch1-3 quests) - owner priority.
2. Add review/origin-intros-r1 34d90ea4 (carries fix2 + entry-exam) to the next batch, ship in order main, then it. Ask D to confirm the nc/cnv "Chờ" gap after fix2 (one measurement).
3. tut-followups (bd ch1-3 + kitChecks) must finish, then get an opus reviewer (BIG progression) - this is the only hole in ch1-3 for every origin.
4. Owner decision needed: intro pictures "vẽ hay bỏ" (otherwise 45 panels stay placeholders). Single owner question.
5. Optional: one end-to-end playthrough per origin of ch1->ch4 after the batch lands (no one has run this chain as a whole on main).

## 7. Tóm tắt cho sếp (tiếng Việt)
1. Chương 4 đã có sẵn trên bản chạy cho cả 10 nguồn gốc (mỗi nguồn 4 đường); chương 1-3 có khung và mốc, chưa có việc phải tự tay làm.
2. Việc "phải tự tay làm" cho chương 1-3 đã qua kiểm (PASS), đang nằm trong lô đẩy lên 23:32; riêng Bắc Địch chưa có chương 1-3 nào, đang có thợ sửa.
3. Truyện mở đầu kể lại, ở nhà chờ tuyển tú, thi tuyển cho nguồn gốc nữ hòa thân và cung nữ đã qua kiểm nhưng chưa lên; cần xin lô tiếp theo đẩy lên.
4. Tranh minh họa phần mở đầu mới vẽ 6/51 tấm; thợ vẽ dừng vì sếp chưa trả lời "vẽ hay bỏ".
5. Em chưa chạy thử trọn đời từ chương 1 đến 4 trên bản chạy, nên chất lượng chương 4 mới tính theo báo cáo kiểm, chưa tự nhìn.
