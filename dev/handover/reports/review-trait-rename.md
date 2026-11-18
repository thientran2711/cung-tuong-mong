# review/trait-rename — report (worker, sonnet)

PRIORITY #1 CHECK: OD:L1562 (rule) + L1567 (balance law, context); main had 15+ files with "Hiểm độc"; review/* 0; claims none. Reused existing `deser()` as the single load choke point (solo slot, import code, co-op rejoin/snapshot all call it).

Branch review/trait-rename @ 27886326 (base = origin/main 6c4f21c3, up to date). One commit, mechanical.

## What changed
- All 37 `dev/build/j*.js` (+ KIT.md, plan docs, mem-upgrade test): literal "Hiểm độc" → "Xảo quyệt" (comparisons, regexes, TRAITS pool, KVT/KTPT/TDAMB tables, jtoil/jvoice text tables, jbal/jbal2 keys). PERS weights in j28 unchanged (key renamed only). TRK art key `hiemdoc` unchanged (jtrong figure art + j35 LOOKFOR still map).
- ONE label map in `j1.js`: `TRAIT_OLD={"Hiểm độc":"Xảo quyệt"}`, `traitLabel(t)`, `trMigrate(o)`. Future renames go in TRAIT_OLD only. **Function names for Foreman C: `TRAIT_OLD`, `traitLabel`, `trMigrate`.**
- Load mapping: `deser(d)` (j6.js) calls `trMigrate(d)` first → every string value and object key in the save (trait, trait2, tr, mem keys, old log text) is rewritten in place. Old saves, import codes, co-op room state all covered.
- VANPHONG.md: one line added. New test `dev/test/trait-rename-oldsave.js`.

## Tests
- trait-rename-oldsave 9/9 (old consort with "Hiểm độc" in trait/trait2/tr/mem key loads as "Xảo quyệt", none left, PERS weights present, TRK key unchanged, TRAITS pool new label only).
- one-core-guard 0 fails (no --allow-grow). coop-e2e 60/60. coop-one-world PASS. mem-upgrade ALL OK.
- Same decisions: the change is a pure string rename of identical-length keys' values (weights untouched); old-save test shows identical PERS entry reached. No seeded run diff produced; no behaviour code touched.
- Scan: `git grep "Hiểm độc" -- dev/build/j*.js` = 2 hits, both in the legacy map in j1.js. (Generated all*.js and old data json under dev/measure left untouched.)
- Not done: Fold/iPad shots — label is 1 char longer ("Xảo quyệt" 9 vs 8) in existing chips, no layout code touched; reviewer please glance at a trait chip.

## Family list for owner (NOT renamed; judge needed)
Pre-judging / villain-sounding nết labels: **Kiêu ngạo** (arrogant), **Đa nghi** (paranoid), **Tham vọng** (ambitious — reads as schemer, used with Xảo quyệt in succession/plot rules), **Thù dai** (grudge-holder), **Tham tiền** (greedy), **Ghen tuông** (jealous), **Nhiều chuyện** (gossip). Milder: Cả nể, Mê tín. Neutral/good: Hiền lành, Nhu mì, Hiếu thảo, Trọng nghĩa, Thẳng thắn, Khéo léo, Trung hậu. Under L1567 the 24-trait pairs already give each a counterpart (Kiêu ngạo↔Khiêm nhường, Thù dai↔Rộng lượng, Ham lợi↔Thanh liêm…), so Foreman C's rebuild may settle most; "Ham lợi" (planned) is the softer form of Tham tiền.
