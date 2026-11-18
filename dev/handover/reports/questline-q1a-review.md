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
