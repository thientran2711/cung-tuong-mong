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
