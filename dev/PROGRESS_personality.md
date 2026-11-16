# PROGRESS — review/personality (item D7) — PAUSED (Foreman C order, cap 12)

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

## Done
- Worktree, sparse checkout, main builds (`python3 dev/build/assemble.py`).
- Measure tools: `dev/measure/inpers.js` (per-life regard recorder: th/hh end+max+years, consorts' rel, NPC th,
  greet count/avg) and `dev/measure/runpers.js` (= runbal.js + EXTRA env for extra in-page files).
  Usage: `EXTRA=inpers.js node dev/measure/runpers.js sens 40 out.json` (not yet run).

## Left / next step
1. Run baseline on main (sens + rand, ~40 lives) with inpers.js; record table.
2. Code jtrong.js + BAL.trong, migration in deser, Thái hậu archetypes, thỉnh an function.
3. Re-measure, compare (th avg/max, hhTurn rate, consort rel), tests at 5 viewports, PROGRESS update, push.
