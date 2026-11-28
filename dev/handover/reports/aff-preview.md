# AFF-PREVIEW — a preview is a promise (MAIN 186 ruling 28/11, law 4 / law 7)

PRIORITY #1 CHECK: OD/ledger — MAIN ruling in the order (KK68 finding) | main: spSee (jstatpace, pace-only preview, 3 callers), pvQuy/aaNum (jaudit, trust-only range), affGot (review/kk68-ringdup 9c7ea0de, result side) | review/*: no affPreview / dry-run anywhere (git grep) | claims: none.
KIT CHECK: no UI part touched — only the NUMBER inside existing card texts (x / wt / duoc / g / k rows); no CSS, no new frame/chip. Wording unchanged except the
honest range «+a đến +b» that pvQuy already used (VANPHONG kept; no %; odds words untouched).

Base: review/kk68-ringdup 9c7ea0de. Branch: review/aff-preview.

## Root
Cards printed the BASE amount (BAL) while the act runs it through the affAdd wrappers (trust trait j28, titles jdh, feelings jfeel, mood jmood, onlookers jtrong)
and stat pace (spG). spSee (pace only) and pvQuy (trust only) were partial copies of that path.

## Fix — ONE preview path (no duplicate formula, law 11)
- j9 `AFF_DRY` + `affPreview(x,y,n[,trust])`: the REAL affAdd chain runs; the core only records the change (pace carry peeked, nothing written).
  Side-effect wrappers stand aside while AFF_DRY is set: jemo (emotion event), jnet (netCross), jwhyn (why notes), jint (intrigue points), jmood (MOOD_N counter).
  Man/servant bonds (msAffAdd): run, read, add the change back.
- j9 `affSg(x,y,n)` = the card word. Her nết not all known → «+a đến +b» from the same chain at the lowest / highest trust she could have (the existing
  honest-range rule of jaudit aaMulRange), so no hidden trait leaks.
- j9 `affPreviewRun(x,y,fn)`: several steps on ONE bond (queen gift: relAdd + hh step) run live with side effects muted, read, every touched cell + carry put back.
- spSee (jstatpace) delegates rel / hh to affPreview → fmt(fx) chips (j1) and jky previews follow automatically. pvQuy (jaudit) = affSg → every pvRel/pvQuy card.
- jstatpace spG: a peek creates no `spc` object (a preview writes nothing).

## Same family, made one funnel (flagged for the reviewer — these change a RESULT, not only a preview)
1. hh was paced TWICE: apply/ap paced «hh» (spG) and its setter hhSet → affAdd paced it again. Now hh is paced once, inside affAdd (j1 apply, j8 ap, j24 hhLive);
   the apply pop shows the real hh change.
2. spAdd(p,"rel",n) (18 calls: j3, j7, jreign) wrote p.rel with pace only, skipping the trait/title/feeling/mood wrappers that affAdd(p,S) applies to the SAME number
   (aff(p,S) reads p.rel). Now spAdd rel → affAdd(p,S,n) (non man/servant, target her) — law 1 one rule.

## Sites switched (scan: `python3 dev/measure/aff-preview-scan.py [--all]`)
60 preview / result sites now print affSg / affPreview (or affGot for lines written after the change) across 38 files; generic readers fixed at the helper:
fmt (j1, every fx chip with hh), jky (spSee), pvQuy/pvRel (jaudit), P3T talk cards (jagacts3: Hỏi han / Khen / Bàn tán / Chia sẻ bí mật), two-way talk
(jtwoway: Giúp đỡ / Thăm / Nương theo), Ghé chơi + host answers (jshelf, jrcv), gift card (jgift, queen = one number), world events (jworld, jworld2),
consort approaches (j24, jtsb, j25), festival / faction / scheme cards (j7, j70, j71, j78, j95, jmen, jagent, jroute, jrcp, jdis, j30, j55, j42, j22, j2, j9, jtoil, jaudit, jmood, jemoact).
Result lines after the change now print the real change (affGot): j24 approach gift, j72, jdis (refused / wrong taste), jration, jrcp, j9 talk results, jagacts3,
jemoact, jfeel, jmem, jpoison, jvisit (incl. the queen's hh), P3T results.
Scan after: 0 raw. NO ONE PERSON at preview time — 16 sites, listed by `--all`, a group / a random pick made inside the act / a static act text with no
target: no single real number exists before the act. MAIN 188 ruling (28/11 ~07:45Z): «show the plain stat change with no name (no invented person)». All 16
ALREADY print the plain BAL change and name no invented person (only «nàng» = the act's own target, or a group word) → left as they are, no code change:
| site | why no single person | text (unchanged) |
|---|---|---|
| j10.js:203 | group: every faction member | `đồng đảng quý ngươi ${balSg(-BAL.ag.par3.fac.leave.rel)}` |
| j31.js:17 | random pick inside go | `một người thiện cảm ${balSg(BAL.eff.j31.go)}` |
| j54.js:154 | group: the clan | `các phi tần phe ${s.house} thiện cảm +${H54.clanRel}` |
| j54.js:154 | group: envious mothers | `… phi tần có con gái cùng tuổi ghen (thiện cảm ${H54.envy})` |
| j55.js:182 | list button, no target yet (the per-target card j55:214 is fixed) | `nàng biết chuyện (…): thiện cảm ${balSg(BAL.eff.j55.tdProbe)}` |
| j68e.js:100 | random pick inside ok | `một phi tần mất thiện cảm ${balSg(BAL.eff.j68e.ok)}` |
| j71.js:190 | group: every consort | `mỗi người mất thiện cảm ${balSg(BAL.eff.j71.ok)}` |
| j72.js:527 | static outcome text (no X in scope) | `chủ cũ của nàng mất thiện cảm ${balSg(BAL.eff.j72.fn_10)}` |
| j83.js:180 | wkGainTxt(ev) gets no target | `thiện cảm nàng +${ev.rel}` |
| j97.js:229 | group result line | `${n} người trong phe ngươi thêm thiện cảm (${balSg(G[0])})` |
| jecon.js:204 | static act x (the person is named by xw) | `người quen của ngươi trả ơn: thiện cảm -${BAL.favorCost}` |
| jht.js:115 | group: the clan | `các phi tần phe ${q.house} thiện cảm +${HT.clanRel}` |
| jht.js:116 | group: envious mothers | `… có con trai đến tuổi ghen (thiện cảm ${HT.envy})` |
| jpetcare.js:193 | static act x | `thiện cảm của nàng +${BAL.pet.helpRel}` |
| jpetcare.js:205 | static AOUT text | `thiện cảm +${BAL.pet.helpRel}` |
| jts.js:363 | group: every guest | `khách: thiện cảm ${balSg(BAL.eff.jts.liXiAff)}` |
Known limit: the scan pairs a preview with its act by the SAME expression in the file (one-letter locals only within 2 lines); previews whose number travels
through another helper are covered by the runtime test below, not by the scan.

## Runtime test (new): `node dev/test/aff-preview.js <built root>` — the real game, rescaling states on
Families (relAdd, affAdd, spAdd rel, a fall, NPC→NPC, apply hh ±, man/servant bond), her nết unknown (range), the REAL talk cards (topicOpts built by the game,
the shown number vs what run() really moved), the gift card (giftEval vs giveTo's result line). Also checks a preview writes NOTHING (whole save JSON + MOOD_N).
Result: AFF-PREVIEW PASS · 53 acts, 3/3 runs. Before (base 9c7ea0de, same harness, first run): cards showed the raw base — e.g. talk «Hỏi han sức khỏe» +4 vs
real +1 / +5, «Chia sẻ bí mật» +10 vs real +1 / +7 / +9, «Giúp đỡ nàng» +8 vs real +4; the queen gift card showed two raw parts («nàng +gr · Hoàng hậu với ngươi +g») while the result line printed one real number; families: relAdd +6 shown, +8 real; near the pace
ceiling +9 shown, 0 real. Table: see the test output (columns before raw / after card / real).

## Gates
- scan `python3 dev/measure/aff-preview-scan.py` → 0 raw (60 ok, 16 no-one-person per MAIN 188 ruling).
- `node dev/test/aff-preview.js .` → AFF-PREVIEW PASS · 53 acts, 3/3 runs (families + real talk cards + gift card + range + preview writes nothing).
- `node dev/test/kri-one-row.js .` (KK68, touched path) → PASS 4 receivers.
- quickcheck `--runs 3` ALONE, CTM_LIVE_REF=22afefb4 (LIVE per MAIN 188) → **QUICKCHECK PASS** · 450 s · open 2290 ms · **old save ok** (loads + plays a buổi) ·
  perf median new/live: render 298/280, tab 546/558, buổi 2956/1532 ms, tasks>200 41/31 · core gates PASS. (An earlier run vs stale origin/main 2a80712b failed the
  buổi limit 2884 vs 1242 with noisy runs 2884/3064/1432.) The buổi gap is NOT the preview: profiled 4 real buổi — affPreview 6 calls, 0.4 ms total;
  please compare against the base 9c7ea0de (KK68) if the reviewer wants the buổi delta pinned.
- `node dev/test/webkit-syntax.js` → 478 modules, 0 parse-level hits (no regex lookbehind added); `node dev/test/webkit-boot.js http://…/` → PASS (old-safari boots, broken card, VP.fix same).
- Stills (dev/test/aff-preview-shots.js, scale 1, looked at): Fold 755x1000 + iPad 1180x820 — talk card hand + opened «Hỏi han sức khỏe» card (Tốn không · Được
  thiện cảm …): no clipping, no h-scroll, 0 page errors. Note: the card-hand kit shows thiện cảm as marks («++» / «+; lợi kém hơn») built from the number
  the card holds — that number is now affSg; the marks wording is the kit's, unchanged.
