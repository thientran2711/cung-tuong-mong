# Review Q1a — review/questline-q1a @ 98cb395 (reviewer E7ar, BIG review: rules + numbers + UI)

PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601(2) + audit D-Q2 | main dev/build/jnroad.js nrOffer/nrMOffer + jnroadm.js nrMenOffer (3 offer sites), 8 stock nr_* j72 cards, jvoice.js kAddr (VANPHONG §2 one core) | review/* questline-q1a (this), q1b 344e1e9, q1c 6dc4222; no other NRASK | claims E7a session_01DgYSWpyUqEzbbzMAtLMkNM

**FAIL 98cb395** (note: branch tip is now 1b6005a = 98cb395 + a nrask-scan-only change for hz princes; reviewed 98cb395 as ordered, 1b6005a read too).

## What is good (verified myself, not from the report)
- Engine hook: one `nrAskPick`/`nrAskOf` at all 3 offer sites (nrOffer, nrMOffer, nrMenOffer); `p.av` stored; no entry / av −1 / missing av / wrong kind → stock card. Costs/odds/losses stay stock (ONE CORE). No typed number anywhere in the data (no digits; story words only).
- BAL.nroad.kinds in jbal2.js, «bac» off, one key flip restores it (tested); nr_bac template kept for old saves.
- 96 chapters × 2 asks = 192, written to each chapter's real conflict (checked against rdDef titles/sj), option order matches the stock cost order of every kind (I listed all 384 labels: bạc option = lễ / thái giám / trả công; Sức option = in person), money only as a cost, `do` asks name {B}. Writing quality is high, cổ trang, no %, no modern words.
- KIT FIRST: no CSS/markup added; offer card = j72 kit card, Việc nhờ = kit option cards, odds as ladder words (Năm ăn năm thua / Khá chắc / Chắc / Khó). No new part, no KIT REQUEST needed.

## Tests (run by me, built site at 98cb395)
| test | result |
|---|---|
| nrask-scan | ALL PASS (192 asks) |
| nrask-engine | ALL PASS |
| npc-roads (1×120 mo) / -saves (vs main 9bbd78b build) / -tokscan / -men / -maids | 14/14 · 6/6 (main save loads) · titleBad 0 tagBad 0 · 23/23 · 22/22 |
| quickcheck | QUICKCHECK PASS · old save ok · core gates PASS |
| shots (nrask-shots, HOST) Fold 755x1000@2, iPad 1180x820@2, 1366x1024@2, 390x844@3 × (tt_mat_7 peer, muoi_lau_9 Hoàng hậu, dtq_bien_7 peer) offer + tab | SHOTS OK, no overflow, no raw slot; 390x844 = rotate prompt (expected). Looked at them; kept local (no CDN, no git). They show fault 2 below: a Quý phi asking a Thường tại says «tỷ … muội muội». |

## FIXES (numbered)
1. **Hoàng hậu asks for help «before the Hoàng hậu» (whole group: every `hh` ask + stock nr_hh).** Probe on the built game: a Hoàng hậu NPC on tt_mat_7 draws an hh ask → «Hoàng hậu giao bổn cung lo lễ Thân tằm … Xin muội muội thưa với người…», step «Thưa giúp nàng trước Hoàng hậu»; 45/384 draws give `hh` to a queen asker. Same when the PLAYER is Hoàng hậu: «Xin tỷ tỷ thưa với Hoàng hậu…» to the Hoàng hậu herself. Fix in the engine (nrAskPick + nrKind): never deal kind `hh` when the asker is the queen or the player is Hoàng hậu (S.rank ≥ EG_HH()); pick another ask of the chapter, else stock of another allowed kind. Test it in nrask-engine (queen asker + queen player → no hh).
2. **Rank voice is not VANPHONG §2 (ONE CORE = jvoice `kAddr`).** {me}/{call} for a consort asker come from jnroad me()/call() (only tỷ/muội/bổn cung-for-queen). Shots: Quý phi → Thường tại player says «tỷ … muội muội» (VANPHONG: chủ vị từ Tần → thấp: «bổn cung», gọi «muội muội»); Quý phi → player Hoàng hậu says «muội / Tỷ tỷ» (must be «thần thiếp / Hoàng hậu nương nương»). `kAddr(asker,S)` already gives exactly these (probe: Quý phi→Thường tại bổn cung/muội muội; Thường tại→Quý phi tần thiếp/Quý phi nương nương; Quý phi→Hoàng hậu thần thiếp/Hoàng hậu nương nương; Hoàng hậu→Quý nhân bổn cung/Quý nhân). Route the consort branch of me()/call() (jnroad help templates — stock 8 cards AND the NRASK slots, whole group) through kAddr; keep nrVoice/nrVoiceM for servants/men. Check every ask still reads well with «tần thiếp / ‹phẩm› nương nương» as {call} (e.g. «{Call} được gần Hoàng thượng»). Add a voice check to nrask-engine (≥4 rank pairs).
3. **{B} missing.** When the road rival is the player (N.c="me") or gone, X.B is null and 72 of 192 asks print «kẻ kia» where the story names the rival («Kẻ kia lâm bệnh sau bữa tiệc…») — not true information (HANDOVER L46). In nrAskPick, when the offer has no B, draw only asks whose h does not use {B}; none → stock card. Test it.
4. **nrask-scan duplicate-key check is dead code**: `per[f]` is already filtered by `!before.has(k)`, so a key defined in two jnrask*.js files is silently overwritten by Object.assign and never reported. Load each file in its own sandbox (or diff key sets) and FAIL on a shared key — needed before q1b/q1c land.

## Siblings on this engine shape
- Shape (key `<chapter>`/`<template>_<n>`, `{k,h,o:[[label,loss]×2]}`, stock option order, `Object.assign(NRASK,…)`, data only) — both fit. Ran nrask-scan (1b6005a) with q1a+q1b+q1c data: **414 asks, 289 FAIL**.
- **q1b (344e1e9) NOT as is**: every h is wrapped in “…” (120) → the engine adds its own quotes → «““…””»; 1 ask per chapter (120 FAIL ≥2, OD:L1252); 19 `do` asks without {B}; 10 typed pronouns (mình, em…); 3 labels/loss lines identical to q1a ones.
- **q1c (6dc4222) NOT as is**: 1 ask per chapter (102 FAIL ≥2); 27 `do` asks without {B}; 8 typed pronouns. Men rivals are men: check {B} sentences do not say «nàng ta».
- Both must pass nrask-scan of the merged set, and pick up fixes 1–3 automatically once they rebase.

Shots kept local only (scratch, deleted with this verdict); nothing uploaded, nothing in git.

---
# ROUND 2 — review/questline-q1a @ 54f10e85 (reviewer E7ar2, opus, BIG)

PRIORITY #1 CHECK ('questline-q1|NRASK|nrAskPick'): OD L644/L1072/L1252/L1601(2) | main: none (jnroad.js stock nr_* only) | review/* questline-q1a 54f10e8 (this), q1b 2b80a8a, q1c 99aa2c5, display-set-bonus a95e8d4 (inside q1a, see note C) | claims E7a/E7b/E7c2 + E7ar/E7br/E7cr (this slice)

Method: LOCAL merge q1a + q1b + q1c (newest origin/main 94a9375 is an ancestor of q1a); only conflicts = generated files + the assemble.py list (kept jnrask.js, jnrask_b.js, jnrask_m.js in order); site rebuilt with build_site.sh; not pushed.

## VERDICT: FAIL 54f10e85

## Prior fixes (round 1 + q1b item 6 + nrVoiceM)
| # | item | state |
|---|---|---|
| 1 | no hh kind when asker or player is Hoàng hậu (stock + NRASK, 3 offer sites) | FIXED for the KIND (NRSELF + nrMeQueen in nrAskPick/nrKind; nrask-engine 7/7b). Text family NOT fixed → FIX 1 below |
| 2 | consort voice via jvoice kAddr (8 stock cards + slots) | FIXED. Probe: Quý phi→Thường tại «bổn cung … muội muội», Thường tại→Quý phi «tần thiếp … Quý phi nương nương», Quý phi→HH «thần thiếp … Hoàng hậu nương nương», queen→Quý nhân «bổn cung … Quý nhân»; mood floor cool (no «ngươi»); stock card texts use call() only at sentence start |
| 3 | no {B} ask / no stock «do» without a real rival | FIXED in the engine (hasB at nrOffer/nrMOffer/nrMenOffer; maid rival is never S). Data side NOT done for jnrask.js → FIX 2 |
| 4 | nrask-scan dup-key check real | FIXED (own sandbox per file; merged set: no shared key) |
| q1b-6 | asker = target of its own kind (queen ≠ hh, Thái y ≠ y) | FIXED for kinds (648 queen offers, 0 hh; Thái y never y). The 4 extra asks the q1b review named (tt_mat_6/8/9/10) NOT fixed → FIX 1 |
| nrVoiceM | men by trade | FIXED: Thái y / quan / sứ thần / họa sư / nhạc sư «vi thần», Thị vệ + thái giám «nô tài», Vương gia «bản vương»; player called via kAddr({srv:"m"}) (tiểu chủ / nương nương / Hoàng hậu nương nương) per VANPHONG §2 |

## FIXES (numbered)
1. **The Hoàng hậu still speaks of / is sent to «Hoàng hậu» (whole family = every ask whose text names the queen as a third person, not only kind hh).** Probe on the built merged game (40 draws each):
   - queen NPC asker: tt_mat_9[0] «Ở thọ yến, bổn cung, phụ thân và Hoàng hậu sẽ có một khắc ngồi riêng…» (40/40; seen on the Fold + iPad shots, card title «Hoàng hậu Đường Lan Chi: «Mật ước với Hoàng hậu»»); tt_mat_8[0] «Hàn Thanh Liên muốn cùng Hoàng hậu viết một mật ước mới… đã đem gì đến Khôn Ninh cung» (40/40); tt_mat_6[1] «…Trung cung sẽ không đòi được»; tt_mat_10[1] «…ngôi Trung cung sẽ đổ».
   - player is Hoàng hậu: tt_mat_6[1] «Trung cung sẽ không đòi được. Hoàng hậu nương nương được gần thánh giá, xin khéo nhắc»; tt_mat_8[0] (asks the queen what was brought to her own Khôn Ninh cung); jnrask_m.js ksp_so_7[1] «…đã bị ai đó chỉ cho Hoàng hậu xem trước… dò giúp kẻ ấy đã nói gì» (q1c data, same engine family).
   Fix in the ENGINE (one rule for all three files): in nrAskPick, when who has "queen" or nrMeQueen(), skip every ask whose h/c/labels/loss lines name the queen (Hoàng hậu | Trung cung | Khôn Ninh — keep the pattern in one table next to NRSELF); none left → stock of an allowed kind. Extend nrask-engine 7/7b to the text (queen asker + queen player → no ask naming the queen). Recommended with it (pre-existing on main, decide with Foreman E): the queen NPC should not be dealt a road whose premise IS the Hoàng hậu (tt_mat «Mật ước với Hoàng hậu») in nrPickRoad.
2. **19 jnrask.js chapters have NO {B}-free ask**, so with no real rival (rival = the player, or gone) they always fall back to the stock card and the story is lost — brief E7r2 (2) «every chapter keeps ≥1 {B}-free ask»; q1b and q1c already did this for their files, q1a's own data did not: tt_oan_7 tt_tranh_7 tt_mat_8 dtq_bien_7 muoi_tuoc_7 muoi_tuoc_9 muoi_lau_6 muoi_no_6 muoi_no_7 muoi_no_8 muoi_no_10 cn_chu_5 cn_chu_6 cn_chu_7 cn_chu_8 cn_chu_9 cn_chu_10 cn_tinh_6 cn_tinh_8. Reword one ask per chapter so it does not name {B} (keep the two kinds different; not «do»), and add the rule to nrask-scan for ALL jnrask*.js files (today only nrask-m-scan checks it, men only).

## Notes (not q1a fixes)
A. **Merged set nrask-scan: 1 FAIL from q1c data** — jnrask_m.js ksp_so_10[0] label «Nói với Hoàng thượng ngươi tin sổ ấy» («ngươi» in a label; j84 turns it into «ta» on screen → meaning flips). For the q1c reviewer; the merged set must be green before landing.
B. Vương gia calls the player «tiểu chủ / nương nương» like a servant (kAddr srv). VANPHONG §2 has no Vương gia row; not blocking — Foreman E may ask the kit keeper for a row («nương nương» / «hoàng tẩu»).
C. **q1a carries review/display-set-bonus a95e8d4** (PASS by its own reviewer, not yet on main). A fast-forward of q1a lands it too — land a95e8d4 first or knowingly together.
D. Edge: a rival who dies between offer and render still prints «kẻ kia» in a {B} ask (X.B null). Not blocking.

## Tests (merged q1a+q1b+q1c, local 1aab860, built)
| test | result |
|---|---|
| nrask-scan | 1 FAIL (note A, q1c) · 318 chapters, 636 asks, 1272 labels/loss lines, kinds thu/emp/th/hh/do/y/che |
| nrask-m-scan | PASS (204 asks) |
| nrask-engine | ALL PASS (1, 2, 3 = 1272 cards both voices, 4, 5 old saves, 6, 7, 7b, 8 voice + men, 9 no-B) — does not cover FIX 1 text |
| quickcheck | QUICKCHECK PASS · 374 s · core gates PASS · old save ok · perf new/live render 223/211, tab 425/444, buổi 1022/1154 ms |
| own scans (jnrask.js) | 0 digits/%; no bạn/tôi/em/anh (hits = «chị em cũ», «chị dâu», label «mình»); queen-naming asks of non-hh kinds: 6 (4 q1a, 2 q1c); {B}-free coverage: 19 chapters 0 |
| shots (nrask-shots) Fold 755x1000@2 + iPad 1180x820@2 · tt_mat_9:0 queen + cn_ban_6:0 peer, offer + Việc nhờ tab | SHOTS OK, kit j72 card + kit option cards, ladder words (Năm ăn năm thua / Khá chắc), no overflow / raw slot / page error. Looked: tt_mat_9 queen card shows FIX 1; cn_ban_6 Quý phi «bổn cung … Xin muội muội giữ giúp ít hôm» right. Local only (no CDN, not in git), deleted with this verdict |

## Re-review
FIX 1 (engine + test) and FIX 2 (data + scan) → small re-review: diff + nrask-scan/-engine on the merged set + one queen shot.

# ROUND 3 — reviewer E7r3 (opus, ONE reviewer for q1a + q1b + q1c), 18/11
PRIORITY #1 CHECK ('questline-q1|NRASK|NRQX|nrAskPick'): OD 0 new | main none (no NRASK on main 9c58140) | review/* questline-q1a a615eb7 · q1b 2f79ae26 · q1c b013ddf (the three under review) | claims E7a2 / E7b / E7c2 (this slice)
START_CTX ≈ 3 % (own estimate).
Setup: LOCAL merge origin/main 9c58140 + q1a a615eb7 + q1b 2f79ae26 + q1c b013ddf (not pushed). **q1a is NOT on newest main any more** (main moved b2a9d34 → 9c58140: place-stage / map-tap-go); only conflict = assemble.py list (main added jplst.js; kept it + jnroadm → jnrask → jnrask_b → jnrask_m) and generated index.html/sw.js (rebuilt with build_site.sh). The landing sha must be rebased on main again.
Method: own NRASK dump of all 636 asks (318 chapters) + whole-family scans across ALL three files (one reviewer → one standard), engine code read (jnroad.js:100–131), tests, shots.

## VERDICT: q1a FAIL · q1b FAIL · q1c PASS
One cross-file family is open: **time words vs the card deadline** (j72 card prints «hạn 6 tuần», BAL.nroad.dl, j72.js:142). Round 2 made this a FAIL family for q1c (E7cr2 fix 2: «rằm», «mồng một», a future span shorter than the deadline) and q1c fixed it + put the rule in nrask-m-scan (men only). The SAME words stand in q1a and q1b data (LUẬT SỬA CẢ NHÓM: the family is the whole help-ask set, not one file). Seen on screen: cn_chu_10#1 Fold offer reads «Đêm mai bổn cung phải đến gian trà nhỏ…» directly above the chip «hạn 6 tuần».
Rule (same as q1c's): no fixed date (đêm nay / tối nay / sáng mai / ngày mai / đêm mai / «Mai …» / rằm / Tết / cuối tháng) and no future span shorter than the deadline («N ngày nữa», «mấy hôm nữa», «trong ba ngày», «trong một tháng»). Kept as fine: event-relative «trước khi …», «trước kỳ khóa sổ», «đêm hẹn», past spans («đã nửa tháng», «ba năm trước»), spans longer than the deadline («ba tháng nữa»), durations of the ask itself («nới hạn thêm một tháng», «hoãn thuế một năm»).

## Tests (merged tree, built)
| test | result |
|---|---|
| node dev/test/nrask-scan.js | ALL PASS · 636 asks, 318 chapters, 1272 labels/loss lines (no rule for time words outside the men file → gap, see q1a fix 2) |
| node dev/test/nrask-m-scan.js | PASS (204 asks) |
| node dev/test/nrask-engine.js | ALL PASS (1–9, 7b, 7c: 92 chapters with queen-naming asks, 2208 draws queen asker + queen player → 0; live queen offers 0; other askers still draw them, 91 chapters) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS first run · 408 s · core gates PASS (kit-conform green, no G3 tutorial float this time) · time-spill PASS · open 1556 ms · old save ok · perf new/live render 185/185, tab 387/427, buổi 954/1032 ms |
| own scans | chapters with no {B}-free ask 0/318 · non-hh asks naming the queen 37 (all filtered for a queen asker / player) · chapters left with no ask for a queen asker or player → stock card: 22 (63 when also no rival; engine fallback by design) · «ngươi» in labels 0 · time-word family: q1a 8 asks, q1b 18 asks, q1c 0 |
| shots Fold 755x1000@2 + iPad 1180x820@2 (nrask-shots / nrask-m-shots; local scratch, deleted with this verdict; not in git, CDN not used) | SHOTS OK on all 24 (no overflow, no raw slot, no page error). LOOKED: cn_chu_10#1 offer (Fold) shows the time-word fault above «hạn 6 tuần»; cn_chu_10 tab (iPad) kit option rows Tốn/Thành/Bại + Năm ăn năm thua / Khá chắc; ch_co_8#1 (Fold) «Xin muội muội khéo tiến cử bổn cung hầu ngài ở Ngự thư phòng ít lâu» reads right, no target needed; thd_tho_8#0 (iPad) asks for the paper/ink check, no shared past; ksp_so_10 tab (Fold) label «Nói với Hoàng thượng mình tin sổ ấy», ladder Khó / Chắc; gd_tinh_5#1 (iPad) «đêm hẹn», Thị vệ «nô tài … tiểu chủ», rival veiled «Vương gia ???». Kit j72 card + KIT §6.2 option cards only, no private CSS |
ONE CORE: no number typed in any jnrask*.js (scan: no digits); costs / odds / deadline stock BAL.nroad.*. Old saves: engine test 5 PASS (no p.av → stock), missing entry → stock card (test 4).

## q1a — FAIL a615eb7e (round 2 fixes HOLD; one cross-file family open)
| round 2 item | check | state |
|---|---|---|
| FIX 1 queen-alias filter | jnroad.js:125 NRQX (Hoàng hậu / Trung cung / Khôn Ninh / cô mẫu / ngôi hậu / hậu vị / phượng ấn / mẫu nghi, case-free) next to NRSELF; :126 nrAskTxt = h + c (step title, used by jnrask_m) + labels + loss lines; :127–128 nrAskPick skips any matching ask when nrSelfOf gives hh (asker «queen» at jnroad.js:136, player Hoàng hậu via nrMeQueen at :104; maid site :289 and men site jnroadm.js:136 covered by nrMeQueen). Own alias sweep of all 636 asks: other names for her («chính cung», «mẫu hậu») only in asks of kind hh or meaning the asker's own palace / the Thái hậu — none missed | FIXED |
| test 7c | nrask-engine 7c loads every dev/build/jnrask*.js, queen asker + queen player, 2208 draws → 0; other askers keep them | FIXED |
| FIX 2 {B}-free ask per chapter | 19 rewordings read (git diff 54f10e8..a615eb7): kinds kept, no «kẻ kia», facts kept; nrask-scan rule for every jnrask*.js (nrask-scan.js:53); own count 0/318 chapters without a {B}-free ask | FIXED |
| foreign commit a95e8d4 | `git log origin/main..review/questline-q1a` = 7 q1a commits only; a95e8d4 is on main | FIXED |

### Fixes (numbered)
1. **Time words vs «hạn 6 tuần» (family of q1c round-2 fix 2), 8 asks in jnrask.js** — reword each without a fixed date / a span shorter than the deadline (e.g. «sắp tới», «đêm hẹn», «trước khi …»), labels + loss lines to match:
   - jnrask.js:35 tt_co_10#0 «Sáng mai triều hội… Đêm nay {call} được hầu» (also states a summoning as fact)
   - jnrask.js:37 tt_co_10#1 «Phụ thân phải biết ngay đêm nay… trước canh ba»
   - jnrask.js:60 tt_oan_10#0 «Ngày mai Hoàng thượng phán án»
   - jnrask.js:69 tt_tranh_6#0 «…trước Tết»
   - jnrask.js:341 cn_chu_10#0 and :343 cn_chu_10#1 «Đêm mai …» (seen on the Fold offer)
   - jnrask.js:350 cn_tinh_6#0 «hạn trước rằm» and :352 cn_tinh_6#1 «khai trước rằm»
   Optional, same spirit: jnrask.js dtq_binh_7#0 «Đêm trước {call} được hầu» states a future summoning as fact («Nếu {call} được hầu đêm trước…»).
2. **Move the TIME rule into the shared nrask-scan (all jnrask*.js)** — q1a owns nrask-scan; take q1c's TIME regex (nrask-m-scan.js:37) and add the words q1c's regex misses: «đêm mai», «Mai » at sentence start, «(\S+) (ngày|hôm) nữa», «mấy hôm nữa», «cuối tháng», «trong (một|hai|ba) (ngày|tháng)». Must FAIL on today's tree (q1a 8 + q1b 18) and PASS after both fixes.

### Notes (not blocking)
A. Rebase on newest main 9c58140 before landing (assemble.py conflict = jplst.js; keep it).
B. Render-time edge: an ask is checked against the queen filter at offer time only; if the player becomes Hoàng hậu while the help quest is open (6 weeks), a queen-naming ask still shows. Rare; Foreman E may decide (re-check in nrAskOf → stock).
C. Still open from round 2 (pre-existing on main, Foreman E's call): the queen NPC is dealt road tt_mat «Mật ước với Hoàng hậu» (nrPickRoad); her help hồi now falls to stock, so no wrong text shows.
D. «{Call} được gần thánh giá» (tt_co_7, tt_oan_9, tt_mat_6, dtq_bien_5; q1c ty_thu_8) is the stock emp line on main (jnroad.js:198) — not a fault; q1b chose to soften its own copies.

### Re-review
Small: diff of jnrask.js + nrask-scan.js, nrask-scan on the q1a+q1b+q1c merge (time rule must PASS), nrask-engine.
