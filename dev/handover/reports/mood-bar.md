# Report — D12 mood bar (OWNER_LEDGER #172, OD:L600) — SẴN SÀNG KIỂM

Worker session_01N1tNP2hssUsxJwKBBsGRUZ (Foreman B). Branch **review/mood-bar**, head **d538222cbab59256916556512d54c5998f09f40b** (base origin/main c4e89f8).
Details, numbers and the tuning history: `dev/PROGRESS_mood-bar.md` on the branch.

## Done
- New module `dev/build/jmood.js` (last in assemble.py), numbers `BAL.mood` in `jbal2.js`. One state `S.mood.v` −100…100 for HER, separate from the
  jemo feeling seal (reused, not rebuilt: every feeling that lands on her also pushes the bar; jevb event results reach it the same way).
- Inputs: feelings (promotion, demotion, night, gift, slight, punishment, children, lãnh cung, event results), her rolled acts (thành +3 / hỏng −3),
  rest cards (up to +25), weekly needs (Sức, sick, bạc, cấm túc, lãnh cung), people (friends / foes / maid), weather; decay 20 %/tuần; saturation.
- Bands Hân hoan · Vui vẻ · Bình thản · low / lowest named by her current feeling (Phiền muộn/U uất, Bực dọc/Phẫn uất, Hờn tủi/Hờn ghen, Bất an/Hoảng hốt).
- Effects, each with gain and loss: odds of her acts ±6 points max (≤ one ladder step; shown in "Vì sao <bậc>?"); thiện cảm gains toward her
  ×(1 ± .15) (angry low ×.75); Hân hoan makes rivals' jealousy gains ×1.2; lowest band locks 4 show-off acts (Cần row says why); a sad/frightened low
  mood may bring the consort who likes her (or her maid) to comfort her — "Giãi bày tâm sự" (mood +22, thiện cảm +4, 1 khắc) vs "Gượng cười, cảm tạ"
  (mood +8, Danh +1, thiện cảm −2); picture img/act-sang-tham-hoi.webp (a visitor arriving — fits; no new art).
- UI: mood box (tap her seal): sub "Hiện nay: <feeling> · <band>", Thanh tâm trạng (band · kitSignedBar · number), Vì sao lên xuống (each push, cause,
  when), Cảm xúc lúc này, Ảnh hưởng (real effects now). Her own card, Tư chất tab: mood tile (kitSkillCard kind "mood", cause picture) + bar row.
- Old saves: S.mood created on first use (test). Co-op: S.mood is a personal key of S (jcoopworld) — sync code untouched, coop-e2e not run.

## Tests (`node dev/test/mood-bar.js <url> <out>`; cases box/self/comfort/lock/high/oldsave)
| viewport | page errors | page overflow | dialog overflow | result |
|---|---|---|---|---|
| 755x1000@2 | 0 | no | no | PASS |
| 1000x755 | 0 | no | no | PASS |
| 1180x820@2 | 0 | no | no | PASS |
| 1366x1024@2 | 0 | no | no | PASS |
| 844x390 | 0 | no | no | PASS |
| 390x844 | 0 | no | no | PASS |
All screenshots looked at; long boxes scroll inside the panel on phones.

## Measure (sensible bot runb.js + inpage6 + `dev/measure/inmood.js`, `anmood.py`, 9 origins, HHSTOP)
| config | lives | HH | early death | mean v | tuần v ≥ 60 | tuần v ≤ −60 | longest extreme streak | odds shift mean / max |
|---|---|---|---|---|---|---|---|---|
| mood OFF (`__moodOff=1`) | 30 | 0 % | 33 % | – | – | – | – | 0 / 0 |
| mood ON (shipped) | 30 | 3 % | 30 % | +4.7 | 0.8 % | 0.5 % | 5 tuần (mean 2.3) | +0.49 / 6 pts |
Outcome difference is inside noise (SE ≈ 8 points at n = 30). Bar is not stuck; effect on odds is modest. Tuning history (5 earlier runs) in PROGRESS.

## KIT REQUEST
None (kitSignedBar §49.1, kitRows, kitSkillCard, kitModal, event dialog — all existing).

## Owner / foreman questions
1. OD:L600 says the mood applies to NPCs too. NPCs already have jemo's feeling (it moves their odds and act choices); this branch gives the Sims-like
   BAR only to her. Build the same bar for NPCs as a next step?
