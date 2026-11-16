# PROGRESS — review/mood-bar (D12 · OWNER_LEDGER #172 · OD:L600 "MOOD (The Sims-like)")

Worker: session_01N1tNP2hssUsxJwKBBsGRUZ (Foreman B). Base: origin/main c4e89f8.

## What the owner asked (OD:L600, verbatim summary in the ledger)
A Sims-like mood bar SEPARATE from the per-event emotion cell: goes up/down with successes/failures, events, needs; mood bands (vui/buồn/giận/hờn…)
change the success odds of her acts, her choices and how others see her (e.g. sad → someone who loves her comes to comfort her).

## Reuse check (LUẬT ƯU TIÊN SỐ 1)
- `git grep` origin/main + origin/review/{emotion,mood-dialog,mood-dialog-r1} (both mood-dialog branches are merged): no mood bar / `S.mood` exists.
- Reused, not rebuilt: jemo `p.emo` (the feeling seal + cause; every feeling that lands on her also pushes the bar), jevb `emoBox` (the mood box
  opened by tapping her seal; now shows the bar), jevb `evbMood` (event results already set her feeling → they reach the bar through emoSet),
  jrest rest cards, jwhy "Vì sao" (whyDiff / kitWhyHtml), j63 Cần row (data-kneed), jpcf mood tile look (kitSkillCard kind "mood").
- Kit parts used (no new part, no private CSS): `kitSignedBar` (KIT §49.1, −100..100 with midline), `kitRows`, `kitSkillCard` (mood tile),
  `kitModal` (mood box), event dialog (Q item with `who`, `art`, `opts`). No KIT REQUEST needed.

## Design (module `dev/build/jmood.js`, last in assemble.py; numbers `BAL.mood` in `dev/build/jbal2.js`)
- State: `S.mood = {v: −100…100, log: [{w, k, d, why, n}], wk, cw}`; created on first use (old saves load; test `oldsave`). Co-op: a personal key of
  S (jcoopworld "everything else in S is personal") — no sync change.
- Inputs: feelings on her (emo × strength: vui +.3, buồn −.3, giận −.25, sợ −.3, ghen −.25, lo −.25, đau khổ −.4); her rolled acts (thành +3 /
  hỏng −4; deck cards + talk options via runOpt, consort acts via runAct); rest cards +5 / +8 up to +25; each tuần: Sức < 30 −6, Sức ≥ 80 +1,
  sick −4, Bạc < 15 −1, cấm túc −3, lãnh cung −5, friends (thiện cảm ≥ 30) +1 each ≤ +3, foes (oán ≥ 45) −1 each ≤ −2, maid thiện cảm ≥ 70 +1,
  weather pleasant +2 / harsh −3 / wet −1; decay 20 % of |v| a tuần (≥ 1).
- Bands: ≤ −60 lowest · −59…−25 low · −24…24 Bình thản · 25…59 Vui vẻ · ≥ 60 Hân hoan. Low-band word follows her current feeling:
  giận → Bực dọc / Phẫn uất, ghen → Hờn tủi / Hờn ghen, sợ / lo → Bất an / Hoảng hốt, else Phiền muộn / U uất.
- Effects (gain AND loss on both sides, owner 16/11 rule):
  - odds of HER acts: 0 inside ±30, linear to ±6 points at ±100 (≤ one ladder step); "Vì sao <bậc>?" names "Tâm trạng ngươi: <band>".
  - how others see her: thiện cảm gains toward her ×(1 ± .15) beyond ±25 (angry low mood ×(1 − .25)); Hân hoan also makes rivals' jealousy
    gains (ghenAll) ×1.2 — the price of showing joy.
  - choices: at the lowest band the show-off acts (Múa trong yến tiệc, Kinh hồng vũ, Đánh đàn ở ngự hoa viên, Đàn khúc Phượng cầu hoàng) are
    locked, the Cần row says "tâm trạng không <band> (lòng chẳng còn hứng múa hát)"; a sad / frightened lowest band (not angry) may bring
    the consort who likes her most (thiện cảm ≥ 40), else her maid (≥ 60), to comfort her (35 % a tuần, cooldown 4 tuần): "Giãi bày tâm sự"
    (tâm trạng +22, visitor thiện cảm +4, costs 1 khắc) vs "Gượng cười, cảm tạ" (tâm trạng +8, Danh +1 with a consort, visitor thiện cảm −2).
- UI: mood box (tap her seal) = sub "Hiện nay: <feeling> · <band>", sections Thanh tâm trạng (band · bar · number), Vì sao lên xuống (each push
  with its cause and when; merged per tuần), Cảm xúc lúc này (the jemo causes), Ảnh hưởng (the real effects now). Her own card (Tư chất tab):
  the mood tile (cause picture + band + newest cause) + the bar row; tap → mood box.
- NPCs: they keep jemo's per-person feeling (its odds/act-weight effects already apply to them). A full NPC mood bar is NOT in this branch (owner
  question below).

## Tests
- `node dev/test/mood-bar.js <url> <out> [sizes]` — cases box / self / comfort / lock / high / oldsave; page errors, page overflow, dialog overflow.
- Measure: `dev/measure/inmood.js` (INP2 counters) + `python3 dev/measure/anmood.py LABEL=<glob>` on runb.js sensible-bot lives.

## Status / log
- 16/11: module + BAL + mood box + self tile + tests written; first 1-life bot run: mean v −16.7 (chronic weekly pushes too strong) → conf −3, foe cap 2,
  bac −1, friends from thiện cảm 30.
