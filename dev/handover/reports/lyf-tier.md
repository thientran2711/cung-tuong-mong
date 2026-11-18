# lyf-tier report (worker session_01UV1SziSpBo8hzq6RBRQ8a6)
PRIORITY #1 CHECK ('lyF'): OD 0 | main dev/build/jly.js:18-22 | review/* none | claims lyf-tier row only.

## Root cause
lyFallen() stores the fallen Lý object on S as S.lyF (truthy object). figRoles / figTierOf / f88Wear wrappers tested `who.lyF` (truthiness), so S herself matched: figTierOf(S) = -1, role consort, so her own figure used cold-palace art (tcold) everywhere.

## Fix (branch review/lyf-tier @ 22dac5c, on live main a95e8d4)
The fallen Lý person carries her own marker `lyF:1` (number, already in every saved object). Readers now test `who.lyF===1`; S.lyF is an object so S never matches. Old saves need no migration.
Scan: every `.lyF` reader in dev/build (grep over all j*.js, dev/test and dev/measure only read S.lyF as the object):
| file:line | before | after |
|---|---|---|
| jly.js:19 figRoles | who.lyF | who.lyF===1 |
| jly.js:20 figTierOf | who.lyF | who.lyF===1 |
| jly.js:21 f88Wear | who.lyF | who.lyF===1 |
| jmort.js:44 floor | p.lyF | p.lyF===1 |
| jmort.js:59 note group | p.lyF | p.lyF===1 |
| jmort.js:66 die | p.lyF | p.lyF===1 (S could reach it) |
Other S.lyF uses (jcoopworld W_KEYS, jnpcd, jreign, jmort worldPeople) read the object itself: correct, unchanged.

## Tests
- dev/test/lyf-tier.js (new): real state with S.lyF set, ranks 0..7: figTierOf(S)=rank+1 (tier t1..t8), roles player/heroine, portrait/figure not tcold; round trip ser/deser keeps one Lý; Lý still tier -1, role fallen/consort, f88Wear true. Run against main: all rank tiers -1 (bug shown); on branch: 0 FAIL.
- quickcheck PASS (open, old save loads and plays a buổi, perf new/live 155/163 ms, core gates PASS).
- npc-death.js 0 FAIL (Lý world keys, death, old save). coop-e2e.js 63/63 passed.

## Shots (CDN, delete after verdict: python3 dev/site/cdn_sync.py --wipe-review lyf-tier)
Base: https://ctm-img.victoria-tntt.workers.dev/img/_review/lyf-tier/
before-/after- x fold (755x1000@2) / ipad (1180x820@2) x home / map (.jpg). Looked 3x: before = Phi's own figure in plain cream cold-palace dress; after = Phi in her rank-tier gown. (Seeded lives differ person to person between runs; the dress class is the proof.)
Not separately shot: mirror and avatar are the same figFor/figTierOf path (covered by the test table).
