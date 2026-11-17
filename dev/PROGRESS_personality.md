# PROGRESS — review/personality (item D7) — RESUMED 16/11, built (see Built)

Task: personality + 13 "trọng" virtues for ALL characters (player included), Thái hậu archetypes picked per life,
thỉnh an no longer flat +8 (depends on the target's personality/virtues, her standing, mood). Owner: OD L598, L599
(docs branch), ledger items 170/171.

## LUẬT ƯU TIÊN SỐ 1 findings (done)
- Existing personality engine on main: `dev/build/j28.js` PERS (traits w/ act weights, dang/slight/forgive/trust/gift),
  `traitsOf(p)`, `persW`, `persF`; wrappers on oanAdd/affAdd/giftVal; SOC social menu (help/visit/warn/mediate/provoke/
  humiliate/flaunt/spy…). jemo.js EMO_DK / EMO_BRAKE use the same trait names. REUSE these, do not rebuild.
- `traitsOf(S)` returns [] -> the player has no traits (owner: "whatever she has, they have" — gap to close).
- Thái hậu: `S.thTrait` picked lazily in traitsOf from Hiền lành/Đa nghi/Kiêu ngạo (TH_TRAITS const unused).
- No 13-virtue / trọng system anywhere on origin/main or any origin/review/* (grep VIRT, trongOf, thArch, tastes, "Hiếu…Lễ").
  review/virtue = j85 Tứ đức (Công Dung Ngôn Hạnh), already on main, different thing.
- Thỉnh an sources: j2.js:130 Thái hậu talk opt `w:{th:8,danh:2,duc:1}` od(75) (deck act j2.js:73 uses option 0);
  j2.js:134 Hoàng hậu `w:{hh:4,…}` od(70); j42.js:115 NPC greet +2; j68f.js:12 snow +5; j85 Dung bonus to thỉnh an odds;
  jaudit.js:194 thiếu lễ wrapper on talkOpts (Thỉnh an*). Thái hậu regard = S.th (apply clamps ±100); BAL.hhTh 55 gates
  the Hoàng hậu road (any th change must be measured against hhTurn rate).
- 197 positive `{th:N}` sources vs 32 negative in j*.js -> few lowering events.

## Design (planned, not coded yet)
- New module `dev/build/jtrong.js` (add to assemble.py list after j28/jemo-dependent modules), numbers in BAL.trong.
- 13 virtues: Hiếu, Đễ, Trung, Tín, Lễ, Nghĩa, Liêm, Sỉ, Nhân, Trí, Cần, Kiệm, Khiêm. Each person (incl. player, Emperor,
  Thái hậu, servants, men) gets `trong` = 2 virtues, deterministic from id hash (co-op safe, old saves migrate lazily).
- Deed tags: act name regex + SOC keys -> +virtue / -virtue (Thỉnh an: Hiếu, Lễ; help/visit: Nhân, Nghĩa; warn: Trung, Tín;
  mediate: Khiêm; provoke/humiliate: -Lễ -Khiêm; flaunt: -Kiệm; bribe: -Liêm; frame/rumor: -Tín -Nhân).
  Regard gain scaled by the recipient's trọng (×up if matched, ×down/negative if offended). Applied in talkOpts (so the card
  shows the real number) and via a context around SOC runs for NPC↔NPC/NPC→her.
- Thái hậu archetypes S.thArch (Từ ái / Nghiêm khắc / Đa nghi / Quyền uy / Sùng Phật), each sets thTrait (keeps PERS),
  own trọng, greeting base, lowering-event odds; migrate from old S.thTrait.
- Thỉnh an result = f(archetype, trọng match, her rank, her mood, recent repetition/diminishing, Thái hậu mood) incl. a
  chance of a scolding (negative); same function for Hoàng hậu thỉnh an (LUẬT SỬA CẢ NHÓM: j68f snow, j42 NPC greet too).
- Display: card text only through existing act-card/kit (no new chips); person card trọng line needs a kit row -> check
  kitLine (§42) / pcard lines first, else KIT REQUEST.

## Built (16/11, resumed by worker D7)
- `dev/build/jtrong.js` (assembled right after jaudit.js), numbers in `BAL.trong`. Builds ON j28 PERS/traitsOf (nothing replaced).
  - 13 virtues `VIRT` + glosses `VIRT_GL`. `trongOf(p)` → 2 virtues for EVERY person: player, Emperor, Thái hậu (from archetype),
    consorts, servants, her maid. Deterministic from id/name hash (co-op: players keyed by name, so both seats agree); the first virtue
    leans on the nết (`TR_V`), some nết exclude virtues (`TR_BAN`, e.g. Tham tiền never Liêm/Kiệm). Stored lazily as `.trong` (old saves migrate).
  - Player now has a nết too: `S.pTr` (kept off `.trait` because figure art reads `.trait`); `traitsOf(S)` returns it (feeds jemo emotions).
  - Deeds tagged `DEED` (+1 honours / -1 offends). `trongMul(judge,tags)` = 1 + 0.5 per honoured − 0.6 per offended virtue (can go < 0).
    * Topic talk with consorts (`topicOpts`): the option is rebuilt with `chatF × trongMul`, so "nàng quý ngươi +N" on the card = what happens.
    * NPC social deeds (SOC): deed context around affAdd/oanAdd → the judge's regard/oán follows their trọng (NPC↔NPC and NPC↔her; her own trọng judges deeds done to her).
  - Thái hậu archetypes `TH_ARCH` (Từ ái / Nghiêm khắc / Đa nghi / Quyền uy / Sùng Phật) in `S.thO.arch` (co-op world key thO).
    Old saves: mapped from `S.thTrait` (Hiền lành→Từ ái, Đa nghi→Đa nghi, Kiêu ngạo→Quyền uy); `S.thTrait` is kept = archetype's PERS trait.
  - ONE greeting rule `trGreet(who,host)`: gain = base(archetype) × trọng × rank (Quyền uy/Nghiêm khắc weigh rank) × host mood × her mood
    × repetition (greets in the last 3 mornings fade it, floor .35) × saturation (above the archetype's ceiling it fades to 0 within 15)
    + (−2 if the host is angry) → can be 0 or negative. Odds per archetype ± trọng ± mood; a failed greeting = scolding (`l`).
    Used by: Thỉnh an Thái hậu (talk + deck act), Thỉnh an Hoàng hậu (talk + deck act), snow-day "Vẫn lội tuyết đi thỉnh an" (j68f),
    NPC serveTH (j28 SOC), servant-road "Hành lễ thỉnh an" (j42). The card shows the real number in Được/Mất; reasons in Kèm (`risk`)
    and in "Vì sao" (`why`).
  - Lowering: a month with no thỉnh an → Thái hậu −neg (Nghiêm khắc 3, Đa nghi/Quyền uy 2, Sùng Phật 1, Từ ái 0); above ceiling+10 → −1/month.
  - Display (no new UI part, ONE KIT KEEPER rule respected): extra person-card lines "Trọng: …" (and "Tính nết: …" on her own card and the
    Thái hậu card) → the existing kitPcGrid turns them into ordinary kit chips. Trọng shows "?" until learnt (a deed that touches it,
    60% per touch; she always knows her own). Thái hậu's archetype is shown after her first greeting.
- `dev/test/trong-check.js` (old save from main build → load, migration, greeting curves, neglect, card chips at 6 viewports).

## Measures (sens bot, `EXTRA=inpers.js,inth.js node dev/measure/runpers.js sens 30 out.json`, CAP 2400–2700 s; box overloaded, so lives are few)
| | lives | HH (rank 7) | Thái hậu regard y1 / y2 / y3 / end / max | NPC consorts' Thái hậu | maxRank |
|---|---|---|---|---|---|
| main (base) | 11 | 3/11 (+4/11 in an earlier run) | 61.8 / 92.7 / 96.5 / 93.8 / 100 | 55.2 | 5.5 |
| this branch (final numbers) | 28 | 6/28 | 30.3 / 50.7 / 65.1 / 78.7 / 89.9 | 46.0 | 5.1 |
- Where her Thái hậu regard came from on main (inth.js): "Vẽ chân dung tặng Thái hậu" +9.1 per use (1126 uses / 11 lives), Thỉnh an +5.6 per
  greeting, thiếu lễ (dress under rank, jaudit) −2.8 per greeting. After: portrait +5.1 per use, greeting rule +0.8 per greeting
  (the bot greets every morning and sits near the ceiling), thiếu lễ unchanged. → LUẬT SỬA CẢ NHÓM: deck acts raising Thái hậu
  regard now share the family rule (`trThDeed`: trọng × repetition × saturation).
- End regard by archetype (after): Nghiêm khắc 55, Đa nghi 72, Từ ái 85, Sùng Phật 88, Quyền uy 92 (2 lives).
- HH rate 21% vs main ~27–32% (small samples, within noise but lower; C7 balance-pass should take it into account). The HH gate
  BAL.hhTh 55 is untouched. rand-bot lives die within ~1 year (no HH either side), not informative here.
- Greeting curve probe (trong-check.js, 36 mornings, toil included): every morning → Từ ái 100, Sùng Phật 79, Nghiêm khắc 74,
  Quyền uy 71, Đa nghi 62; every third morning → 74 / 48 / 58 / 49 / 25 (Đa nghi rewards spacing).
- Tests: `node dev/test/trong-check.js <main build> <this build> <shotdir>` — old save (made with main) loads, Thái hậu archetype
  mapped from S.thTrait, everyone has 2 virtues (deterministic), month without thỉnh an = −3 (Nghiêm khắc), person cards at 755x1000,
  1000x755, 1180x820, 1366x1024, 844x390, 390x844: no page error, no horizontal overflow, "Trọng" / "Tính nết" kit chips present.

## Owner questions
1. Her own nết is now given from her name (8 nết, no Xảo quyệt). Should she instead CHOOSE it at the start of a life?
2. Thái hậu archetype names (Từ ái / Nghiêm khắc / Đa nghi / Quyền uy / Sùng Phật) and whether it is shown after the first thỉnh an (now) or only after more contact.
3. Thiếu lễ at thỉnh an (−3 ×1.5 strict hosts) now outweighs a routine greeting when she is under-dressed; keep?

## Not done / next
- Emperor's trọng is shown on his card and judges nothing yet (Sủng numbers are C7's balance area; left alone on purpose).
- Event choices that move Thái hậu regard (EV6 etc., ~10% of her regard) are not scaled by trọng yet.
- No new KIT part used or needed (ONE KIT KEEPER rule): card lines → kitPcGrid chips, Kèm/Ghi chú row via `risk`, "Vì sao" via `why`.

## Done
- Worktree, sparse checkout, main builds (`python3 dev/build/assemble.py`).
- Measure tools: `dev/measure/inpers.js` (per-life regard recorder: th/hh end+max+years, consorts' rel, NPC th,
  greet count/avg) and `dev/measure/runpers.js` (= runbal.js + EXTRA env for extra in-page files).
  Usage: `EXTRA=inpers.js node dev/measure/runpers.js sens 40 out.json` (not yet run).

## Left / next step (old plan, done)
1. Run baseline on main (sens + rand, ~40 lives) with inpers.js; record table.
2. Code jtrong.js + BAL.trong, migration in deser, Thái hậu archetypes, thỉnh an function.
3. Re-measure, compare (th avg/max, hhTurn rate, consort rel), tests at 5 viewports, PROGRESS update, push.

## Reviewer r1 (16/11, branch review/personality-r1)
- Merged latest origin/main (assemble.py: main list kept, jtrong.js right after jaudit.js); site rebuilt.
- Fixes: (1) co-op friend (id/sid 901/902, `.coop`) now gets the same nết/trọng on both seats (`trTraits` uses P_TR[hash("me:"+name)], key `me:name`);
  before, the friend object carried trait "Nhu mì" so the other seat computed different virtues. (2) jpcf "Sở trọng" showed Thái hậu's PERS trait
  to strangers and disagreed with the card chip → now archetype name once met at thỉnh an, else "chưa rõ".
- Tests: trong-check.js (old main save loads, migration, curves, neglect −3, cards at 6 viewports, 0 errors); host mode (device.js from review/ua-test):
  fold / ipadAir / iphone14Land cards ok, no overflow, no cut chips, iphone14 portrait = rotate prompt; coop-e2e 59/59.
- Bot (sens, 8 lives, CAP 2700 s, box load ~25): Thái hậu max ≥84 in 8/8 lives, end ≥55 in 6/8; year-1 regard negative in 3/8 (Đa nghi / Quyền uy
  + thiếu lễ −5 > greeting +4 while under-dressed; the card shows it). No HH in 8 lives (worker: 6/28). 1 CRASH in j91 minigame `finish` (not this branch).
- Notes for follow-up: jaudit `aaHostStrict` counts Đa nghi/Kiêu ngạo as strict but not Nghiêm khắc ("Thẳng thắn"); same-name co-op players share
  nết/trọng and the friend's card is read as hers (kitPersonByName/pcard by name — family issue); Trọng is not yet listed in jpcf "Sở trọng".
