PRIORITY #1 CHECK: OD L644/L1252/L1601 (2) + audit D-Q2 | main dev/build/jnroad.js nrOffer/nrMOffer + jnroadm nrMenOffer (3 offer sites), 8 stock nr_* j72 cards, BAL.nroad jbal2.js | review/* review/questline-audit (§4 Q1 = spec), no other NRASK/jnrask anywhere (git grep origin/main + origin/review/*) | claims E7a/E7b/E7c (brief E7-questline-q1.md)

# Q1a — help hồi tells the real story (worker E7a, session_01DgYSWpyUqEzbbzMAtLMkNM, depth 1, START_CTX ≈ 4 %)
Branch **review/questline-q1a** @ **98cb395522dc387aef7036261bec345619038cd4** (base origin/main a95e8d4; 3 commits: engine+data, tests+step titles, site rebuilt).

## What
- **Engine (jnroad.js, ONE hook for all 3 offer sites: consorts nrOffer, maids nrMOffer, men nrMenOffer in jnroadm.js)**: `nrAskPick(N,A)` draws one ask of NRASK[<chapter id>] (per life → variety, OD:L1252) and stores its index in the quest (`p.av`); `nrAskOf(X)` gives it back. The 8 stock nr_* templates are wrapped: card text h, step title, option 1/2 labels and loss lines read the ask; **costs / odds / losses stay the stock ones** of kind k (ONE CORE: BAL.nroad.op/.bac/.suc). No entry, av −1, missing av (old saves) or a kind that no longer matches → today's stock card unchanged.
- Chapter id = jroad id (`ROAD14[road][n]`, e.g. `tt_co_7`); men template chapter = `<NRM id>_<n>` (E7c: e.g. `gd_tl_7`). Slots: `{me} {Me} {call} {Call} {he} {B}` (B fallback «kẻ kia»). Optional `c` = own step title; else a neutral per-kind title (stock titles named one errand only).
- **BAL.nroad.kinds** = ["thu","emp","th","hh","do","y","che"] — «bac» OFF (D-Q2); add "bac" = one key flip (tested). nrKind falls back to the first allowed kind of the chapter's hồi cast, else kinds[0]. nr_bac template stays registered so old-save quests still end.
- **Data dev/build/jnrask.js** (assemble.py: right after jnroadm.js): tt / dtq / muoi / cn, 16 roads × chapters .5–.10 = **96 chapters × 2 asks = 192 asks**, written from reports/questline-expert.md (K1–K7 shapes, origin flavour, B4 voices; money only as a cost). File pattern for E7b/E7c: `var NRASK=window.NRASK||(window.NRASK={}); Object.assign(NRASK,{...})`.

## Tests (all PASS)
| test | result |
|---|---|
| node dev/test/nrask-scan.js (static, ALL jnrask*.js: keys = real help chapters, full coverage per origin/men, kinds ⊂ BAL.nroad.kinds, ≥2 asks/chapter, no shared sentence / label / loss line, slots only, VANPHONG bans incl. typed pronouns, sizes) | ALL PASS · 192 asks · 514 sentences · 384 labels · 384 loss lines |
| node dev/test/nrask-engine.js (built game: kinds never «bac» + flip; offer carries av; all 192 asks × 2 voices (peer, Hoàng hậu) render 384 cards, no raw slot, stock costs kept; fallback; old save nr_emp/nr_bac without av end; ask played → hb>0, betrayal → hb<0) | ALL PASS |
| npc-roads.js (1 life × 120 mo) · npc-roads-saves.js (vs main build) · npc-roads-tokscan.js | 14/14 · all PASS · titleBad 0 |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · old save ok · perf new/live render 180/194 ms, buổi 918/796 ms · core gates PASS |
| node dev/test/nrask-shots.js <dir> (HOST, Fold 755x1000@2 + iPad 1180x820@2: offer card + Việc nhờ tab, tt_mat_7 peer Quý phi, muoi_lau_9 Hoàng hậu) | SHOTS OK (visible, no overflow, no raw slot, no page error) — looked at all 8 |

## Shots
CDN upload REFUSED (cdn_sync.py → Cloudflare HTTP 401 auth). Not committed to git (image rule OD 17/11). Re-make in 1 min: `bash dev/site/build_site.sh && node dev/test/nrask-shots.js /tmp/q1a-shots`. What they show: kit j72 offer card «Phụ tuyến · Quý phi …: «Mật ước với Hoàng hậu» · Chương 7 «Hoàng hậu thử lòng»», ask in tỷ/muội voice, step «Thưa giúp nàng ta trước Hoàng hậu»; Việc nhờ tab with kit option cards «Thưa với Hoàng hậu rằng nàng ta chỉ làm theo lệ cũ» (Sức −8, Năm ăn năm thua, BẠI Đức −2 · loss line) / «Dâng Trung cung một khay lá dâu bạc thay lời» (Bạc −30, Khá chắc); Hoàng hậu card «Thuyền muối đêm» ch. 9 che-ask. No new kit part, no KIT REQUEST.

## Scan table (before / after, whole group = every NPC help card)
| | before (main) | after |
|---|---|---|
| help card text about the NPC's own chapter | 0 of 8 stock cards | 96 chapters (tt/dtq/muoi/cn) × 2 asks; Q1b/Q1c add theirs on the same hook |
| «bac» ("xin bạc") dealt | yes (default of nrKind) | never (kinds flip to restore) |
| offer sites reading the ask | — | 3/3 (consort, maid, man) |

## Notes for E7b / E7c
Rebase on this branch; add only your data file + assemble line after jnrask.js; nrask-scan.js already scans every jnrask*.js (men coverage = 20 templates × .5–.10 = 120 chapters). `do` asks must name {B} (the stock option hits {B}'s bond).

SẴN SÀNG KIỂM questline-q1a 98cb395522dc387aef7036261bec345619038cd4


## Fix r1 (Foreman E order from E7br q1b review item 6) → ed01a6b22ed161ac272f2d38e76e1c6b664d0cad
No asker is sent to herself (whole family): `NRSELF = {queen:["hh"], ty:["y"]}` in jnroad.js; `nrAskPick(N,A,who)` skips those asks and `nrKind(A,no)` skips those stock kinds — consorts pass "queen" (v.queen), men pass their kind (Thái y = ty); Emperor / Thái hậu have no NPC road. nrask-engine check 7: every chapter of every road × each self role → never its own kind; 288 live queen offers → no nr_hh. nrask-scan / nrask-engine ALL PASS, quickcheck PASS. NRASK data shape unchanged (E7b/E7c files need no change).
SẴN SÀNG KIỂM questline-q1a ed01a6b22ed161ac272f2d38e76e1c6b664d0cad

## Fix r2 (review E7ar FAIL 98cb395, reports/questline-q1a-review.md) → 54f10e85ea0438884fcba07a354bbacb80ad41f9
| # | review item | fix (whole family) | before → after |
|---|---|---|---|
| 1 | Hoàng hậu asked to speak «trước Hoàng hậu» | NRSELF {queen:[hh], ty:[y]} + the PLAYER as Hoàng hậu (rank ≥ BAL.voice.hq, jvoice rule) → kind removed from asks AND stock nrKind, all 3 offer sites | queen draws hh 45/384 → 0; player-queen hh 0 (check 7, 7b) |
| 2 | consort voice not VANPHONG §2 | consort/Hoàng hậu asker of EVERY nr card (8 stock + NRASK slots) speaks via jvoice kAddr(asker, player), mood floor cool (no «ngươi» when asking); men by trade (nrVoiceM): Thái y / quan / sứ thần / họa sư / nhạc sư → vi thần, Thị vệ + thái giám → nô tài, Vương gia → bản vương, player called via kAddr (tiểu chủ / nương nương / Hoàng hậu nương nương); {call} keeps title capitals mid-sentence | Quý phi→Thường tại «tỷ…muội muội» → «bổn cung…muội muội»; Thường tại→Quý phi → «tần thiếp…Quý phi nương nương»; →player Hoàng hậu «muội / Tỷ tỷ» → «thần thiếp / Hoàng hậu nương nương»; S.men all «thần» → by trade (check 8) |
| 3 | «kẻ kia» when no rival {B} | nrAskPick(…, hasB): no real B → no ask naming {B} and no stock «do» (spies on B); rival computed before the pick at all 3 offer sites | 72/192 asks could print «kẻ kia» → 0 (check 9) |
| 4 | nrask-scan dup key dead | each file loaded in its own sandbox; a key in two jnrask*.js files FAILs | copy of jnrask.js as a 2nd file → 96 dup FAILs (was 0) |
Tests at 54f10e8: nrask-scan ALL PASS · nrask-engine ALL PASS (new 7b/8/9) · npc-roads 14/14 · -saves 6/6 · -tokscan titleBad 0 · -men 16/16 (its voice check now follows VANPHONG: Thị vệ nô tài, others vi thần) · -maids 15/15 · nrask-shots Fold+iPad SHOTS OK (looked: «Hoàng hậu giao bổn cung … Xin muội muội thưa…» Quý phi→Thường tại) · quickcheck PASS.
Data shape for E7b/E7c UNCHANGED (slots the same; {call} now e.g. «Quý phi nương nương» / «Hoàng hậu nương nương» — write asks that read well with a title, e.g. «Xin {call} …»). Asks naming {B} are simply not drawn when there is no rival: keep at least one {B}-free ask per chapter where possible.
SẴN SÀNG KIỂM questline-q1a 54f10e85ea0438884fcba07a354bbacb80ad41f9

## HANDOVER (E7a rollover 18/11 07:20Z: context 45 % ≥ START_CTX 4 % + 25 %; depth 1) — for the successor E7a2
State: review/questline-q1a @ 54f10e85ea0438884fcba07a354bbacb80ad41f9 (= fix r2) FAILED re-review E7ar2 → FIX 2 = reports/questline-q1a-review.md ROUND 2 (handover 28f7713). Nothing of FIX 2 is started.
Read first: this report (all sections), the review ROUND 2, brief dev/handover/briefs/E7-questline-q1.md + E-common.md, START_CORE + START_WORKER.
FIX 2 to do:
1. ENGINE text filter (whole family): an ask whose text (h, c, labels, loss lines) names the Hoàng hậu by ANY alias (Hoàng hậu, Trung cung, Khôn Ninh cung, Thân tằm-as-Trung-cung rite? check the review list) is never drawn when the asker is v.queen OR the player is Hoàng hậu (`nrMeQueen()` in jnroad.js). Put it next to the NRSELF filter in `nrAskPick` (jnroad.js; same place as the hasB {B} filter): e.g. `const NRQX=/Hoàng hậu|Trung cung|Khôn Ninh/` and skip when `no.includes("hh")` (= queen asker or player queen). Known hits: tt_mat_6/8/9/10 (jnrask.js) + ksp_so_7 (q1c). Add a test to dev/test/nrask-engine.js (or nrask-scan.js static list) that scans ALL jnrask*.js: for a queen asker and a queen player, no drawn ask contains a queen alias.
2. DATA: 19 jnrask.js chapters have no {B}-free ask (with no rival they fall to stock). Reword ONE ask per such chapter so it does not name {B} (keep facts true; keep sentences/labels unique — nrask-scan checks). List them with: node -e (load jnrask.js; chapters where every ask's h+o contains "{B}").
3. BRANCH: the reviewer says commit a95e8d4 (display-set-bonus merge) is foreign. My branch was cut from origin/main a95e8d4 at 05:20Z; if main has moved/rewound since, rebuild the branch on NEWEST origin/main: new branch from origin/main, cherry-pick my q1a commits only (git log origin/main..review/questline-q1a --oneline; skip a95e8d4 and any "site rebuilt" commits, rebuild the site instead), then force-with-lease push review/questline-q1a (my own branch). Fetch with depth/deepen under flock.
Then: bash dev/site/build_site.sh; node dev/test/nrask-scan.js; node dev/test/nrask-engine.js; npc-roads.js <url> 1 120, -saves <url> <main url>, -tokscan, -men 1 120, -maids 1 120 (serve the root with python3 -m http.server); node dev/test/nrask-shots.js <dir> (look at shots; CDN 401 → don't store); bash dev/tools/quickcheck.sh; commit the rebuilt site; append "Fix r3" before/after table here; send E7b (session_01DgYSWqDaerQBfKu5bPRkef) + E7c2 (session_01DgYSWkXhh7hPLBJjzFYMWJ, q1c 99aa2c5 rebased on 54f10e8) the new sha (shape unchanged unless the filter changes it); ONE «SẴN SÀNG KIỂM questline-q1a <sha>» to Foreman E #3 session_01DgYSWmvDYnmfLCrNGtw5Uu + FOREMAN_E_STATUS line.
Worktree /home/user/wt/q1a may still exist in this container only (successor makes its own).

## Fix 2 (E7a2, 18/11) — review/questline-q1a @ a615eb7e5f5c55d75511dd0cfa432a289d73f1d3
PRIORITY #1 CHECK ('questline-q1|NRASK|nrAskPick|NRQX'): OD 0 new | main none (jnroad stock nr_* only) | review/* questline-q1a (this), q1b 44b7805, q1c 99aa2c5 | claims E7a2 (this), E7b, E7c2
START_CTX ~3 % of the window.

### Branch
Rebuilt on origin/main b2a9d34 with ONLY the q1a commits (987a6d9 024a1a5 1b6005a ed01a6b 6e600d2 54f10e8 cherry-picked; generated index.html/sw.js taken from main, rebuilt at the end; assemble.py = main's list + jnrask.js after jnroadm.js). The foreign a95e8d4 (display-set-bonus) is already on main, so nothing foreign rides along: `git log origin/main..review/questline-q1a` = 7 q1a commits. Force-with-lease over 54f10e8 (own branch).

### FIX 1 — queen alias text filter (engine, whole family)
jnroad.js: one table `NRQX=/Hoàng hậu|Trung cung|Khôn Ninh|cô mẫu|ngôi hậu|hậu vị|phượng ấn|mẫu nghi/iu` next to NRSELF + `nrAskTxt(a)` (h + c + labels + loss lines). In nrAskPick, when nrSelfOf gives "hh" (asker is the queen OR the player is Hoàng hậu), any ask whose text matches NRQX is skipped, whatever its kind; none left → stock card of an allowed kind (the old hh / do rules stay). «cô mẫu» = the queen on the ch roads (jrd_ch; q1b data, 35 hits). «chính cung» / «lục cung» are not aliases (own main palace / the six palaces) — left out on purpose. Exported window.NRQX / nrAskTxt.
Not done (reviewer's optional note, needs Foreman E): the queen NPC is still dealt the road tt_mat «Mật ước với Hoàng hậu» in nrPickRoad (pre-existing on main); with the filter her tt_mat help hồi falls to stock, so no wrong text shows.

| family scan (raw ask text matches NRQX) | before | after |
|---|---|---|
| jnrask.js asks naming the queen | 25 (21 hh + 4 other: tt_mat_6/8/9/10) | same data; never drawn for queen asker / queen player |
| q1a+q1b+q1c on disk: chapters with such asks | 92 | 92 chapters, 2208 draws (queen asker + queen player): 0 drawn; live queen offers: 0 |
| other askers still draw them | — | 92/92 chapters |

Test: nrask-engine 7c — loads EVERY dev/build/jnrask*.js on disk into the page (addScriptTag), then for queen asker and player Hoàng hậu, 12 draws per chapter → no ask matching NRQX; live nrOffer of a queen consort → none; non-queen askers still get them.

### FIX 2 — {B}-free ask per chapter (data + scan)
nrask-scan: new rule for ALL jnrask*.js — a chapter whose every ask names {B} (h, c, labels, loss lines) FAILS. Before: 19 FAIL (exactly the review list). Reworded one non-«do» ask per chapter (kinds kept, facts kept; the rival becomes «có người / chủ cũ / một nhà khác / kẻ lo trà rượu», never «kẻ kia»):

| chapter | ask reworded | kind |
|---|---|---|
| tt_oan_7 | [1] «Có nhà được lợi…» | hh |
| tt_tranh_7 | [0] dish rumoured poisoned, thái y; label «Tự sắc thuốc thử với phần điểm tâm còn lại» | y |
| tt_mat_8 | [1] «Hoàng hậu đang nghe lời một nhà khác»; loss «chuyện lọt ra ngoài» | hh |
| dtq_bien_7 | [0] «một công tử nhà quyền quý chưa từng ra ải» | emp |
| muoi_tuoc_7 | [1] «Có người bày sẵn một màn…» | emp |
| muoi_tuoc_9 | [0] drops «nhà {B} đứng sau tờ sớ» | emp |
| muoi_lau_6 | [1] «Có người đã phạm lệ ấy để hãm nhà {me}»; loss «cả cung biết ai dâng» | hh |
| muoi_no_6 | [1] «khoản lãi còn thiếu» | hh |
| muoi_no_7 | [1] «qua lại cho {me}» | che |
| muoi_no_8 | [1] «những món nợ ấy tự tan» | hh |
| muoi_no_10 | [0] new ask: the emperor may squeeze every salt house; options «nhà {he} chỉ đòi đúng phần» / lão thái giám | emp |
| cn_chu_5 | [0] «Có người … chủ cũ» | hh |
| cn_chu_6 | [0] «hầu chủ cũ» | che |
| cn_chu_7 | [0] «kẻ lo trà rượu» | y |
| cn_chu_8 | [0] «ngang chủ cũ» | emp |
| cn_chu_9 | [0] the old maid who taught {me}; loss «nuôi người cũ để khoe ơn» | che |
| cn_chu_10 | [1] «gian trà nhỏ năm xưa»; loss «kể khắp nơi» | che |
| cn_tinh_6 | [1] «bị người ta gọi đến hỏi» | che |
| cn_tinh_8 | [0] «lời đồn không có gốc, kẻ tung tin đã nhận bạc» | hh |

### Tests (a615eb7, built)
| test | result |
|---|---|
| nrask-scan (jnrask.js) | ALL PASS · 96 chapters, 192 asks, kinds thu/emp/th/hh/do/y/che |
| nrask-scan with q1b 44b7805 + q1c 99aa2c5 files copied in (local only) | ALL PASS · 636 asks (note A of the review is already green on q1c tip) |
| nrask-engine | ALL PASS (1–9, 7b, 7c new); also ALL PASS with the q1b/q1c files on disk (7c: 92 chapters) |
| npc-roads 1 120 / -saves (vs main b2a9d34) / -tokscan / -men 1 120 / -maids 1 120 | 14/14 · 6/6 · tagBad 0, errs 0 · 16/16 · 15/15 |
| quickcheck | QUICKCHECK PASS · core gates PASS · old save ok · perf new/live render 233/200, tab 454/439, buổi 1214/1171 ms (first run had a G3 tutorial float flake under parallel load; kit-conform alone on this build and on main: both exit 0, floats none) |
| nrask-shots Fold + iPad (tt_mat_7 peer, muoi_lau_9 queen) | SHOTS OK; looked at the Fold queen offer: kit j72 card, no overflow, no raw slot, no queen alias. Local only, deleted |

## Fix 3 (E7a2, 18/11) — review/questline-q1a @ 90796d37dbca227e0862ed566dfe6226dc276f26
PRIORITY #1 CHECK ('questline-q1|NRASK|TIME|nrask-scan'): OD 0 new | main none | review/* questline-q1a (this), q1b 2f79ae26, q1c b013ddf (TIME rule source nrask-m-scan.js:37) | claims E7a2 (this), E7b, E7c2
Branch rebuilt on origin/main a2ad240 (newest at push) with ONLY the 7 q1a commits + this one; assemble.py = main's list (jplst.js kept) + jnrask.js after jnroadm.js.

### 1. Time words vs «hạn 6 tuần» (8 asks + optional dtq_binh_7)
| ask | before | after |
|---|---|---|
| tt_co_10#0 | «Sáng mai triều hội… Đêm nay {call} được hầu» | «Triều hội sắp quyết… Nếu {call} được hầu trước buổi triều ấy» |
| tt_co_10#1 | «ngay đêm nay… trước canh ba» (+ label) | «trước buổi triều hội… trước khi cửa cung đóng»; label «…trước giờ đóng cửa cung» |
| tt_oan_10#0 | «Ngày mai Hoàng thượng phán án» | «Hoàng thượng sắp phán án» |
| tt_tranh_6#0 | «trước Tết» | «trước khi lão ngả hẳn» |
| cn_chu_10#0 | «Đêm mai {B} mời {me}» | «{B} hẹn {me} một đêm» |
| cn_chu_10#1 | «Đêm mai {me} phải đến» | «Đêm hẹn ở gian trà nhỏ năm xưa» |
| cn_tinh_6#0 | «hạn trước rằm» | «ai trả cao thì bán» |
| cn_tinh_6#1 | «khai trước rằm» | «bị ép khai» |
| dtq_binh_7#0 (optional) | «Đêm trước {call} được hầu» (fact) | «Nếu {call} được hầu trước ngày yến» |

### 2. TIME rule in the shared nrask-scan (every jnrask*.js)
q1c's regex + đêm mai, tối mai, «Mai …» at a sentence start, «<word> ngày/hôm nữa», cuối tháng, (trong|còn|hạn|đợi|ở được) + vài/mấy/number + ngày/hôm/tuần/tháng/năm. Checks h, step title, labels, loss lines.
| tree | before fix | after fix |
|---|---|---|
| q1a jnrask.js | 8 FAIL (exactly the review list) | ALL PASS |
| + q1c b013ddf jnrask_m.js | 0 | ALL PASS |
| + q1b 2f79ae26 jnrask_b.js | 23 lines (18 asks) | 23 — E7b's data (nc_gian_6/9/10, nc_su_6, nc_tuc_6, nc_vuong_7, td_an_9, td_song_8, ch_benh_9/10, ch_bi_10, thd_tho_10, thd_sach_10, cnv_chu_10, cnv_ban_9, cnv_ma_5/7/8) |
nrask-m-scan keeps its own copy (q1c's file); the shared rule is a superset.

### Tests (90796d3, built)
nrask-scan ALL PASS (192 asks) · nrask-engine ALL PASS (7c 21 chapters, 504 draws) · quickcheck PASS · core gates PASS · old save ok · perf new/live render 188/209, tab 430/435, buổi 1139/952 ms.
Not done (Foreman E's call, reviewer notes B/C): render-time re-check of the queen filter in nrAskOf; nrPickRoad dealing tt_mat to the queen NPC.

## Fix 4 (E7a2, 18/11) — review/questline-q1a @ a77e7cb0dc6fb8261704ec7cb16460110da757a6
PRIORITY #1 CHECK ('questline-q1|TIME|nrask-scan'): OD 0 | main none | review/* q1a (this), q1b 7f12b48c, q1c 154506f | claims E7a2, E7b, E7c2
Branch rebuilt on origin/main 36e574f (newest at push), 8 q1a commits + this one (cherry-picks clean).
1. tt_co_10#1: «…trước khi cửa cung đóng» → «Lá thư này phải ra khỏi cung trước buổi triều ấy.»; label «…trước giờ đóng cửa cung» → «Sai thái giám của mình mang thư ra khỏi cung».
2. nrask-scan TIME widened: (sáng|trưa|chiều|tối|đêm|ngày|hôm) (mai|mốt|kia), (sáng|trưa|chiều|tối|đêm) nay, mai mốt, (tuần|tháng|năm) (sau|tới), sang năm, từ chiều, từ trưa, giờ đóng cửa, cửa cung đóng, kiệu sắp đến, canh một…năm, (trước|đến|tới|kịp|ngay) giờ Tý…Hợi. Kept on purpose (not deadlines): bare «trước giờ ấy» (= before an event, q1b nc_gian_10) and «hay đi qua cổng tây vào giờ Thân» (a habit, q1c gd_tinh_8, PASSED data).
| tree | old jnrask.js + new rule | after |
|---|---|---|
| q1a | FAIL tt_co_10#1 (cửa cung đóng, giờ đóng cửa) | ALL PASS |
| q1a + q1c 154506f | — | ALL PASS |
| + q1b 7f12b48c | — | 3 FAIL = E7b's: td_ke_9#0 «chiều mai», cnv_mat_8#0/#1 «Kiệu sắp đến» |
Tests: nrask-scan ALL PASS · nrask-engine ALL PASS · quickcheck PASS (2nd run; 1st run had the same G3 «tutorial 0 intro pages» float flake as in Fix 2) · perf new/live render 215/221, tab 459/468, buổi 895/1123 ms.
