# suc-khoe BUILD report — HEALTH + PREGNANCY BUNDLE (review/suc-khoe)

Worker session_01DgYSWmn1SNsxewKAaDLZjN for FOREMAN D s7. START_CTX ≈ 4 % (own estimate). Base origin/main c19b25eb. Branch review/suc-khoe (head in the last line).
Order: FOREMAN_D.md INBOX 18:08Z / 18:10Z / 18:17Z / 19:00Z (main s21); spec reports/suc-khoe.md §4.1–4.7 with the owner changes (OD L1405–L1419, PARKING_LOT #1).
What was built, file by file, and the clamp scan: dev/PROGRESS_suc-khoe.md on the branch. New module dev/build/jkh.js (last in assemble); numbers BAL.kh / BAL.preT / BAL.pgRisk (jbal2.js).

## Owner changes applied
- Sức khỏe = ONLY the Sức max ceiling (18:05Z): sucCap(p) = 40 + 0.6 × health; health = 100 − (age − 30) × 1.2 − lasting scars − a healing part. Regen speed untouched; jmort `tired` (regen −1 per 5 years over 35) switched off while kh is on (folded in). Every Sức clamp in the assembled game (20 sites, 10 files) reads sucCap.
- Ở cữ = 1 month, ×0.7 removed (18:10Z): j35 + the NPC affair line in j22 both read khOcu (one core). NPCs same.
- Innocent 'lệch sổ' → existing blood test, two-way (18:17Z): jroute rtNgSet for her child; khNgNpc (same truth rule, same bowl tricks) for an NPC's child; her kit card → existing PEND.rtNgNpc dialog. ng_set / ng_oan counted per life (tables below).
- Childbirth death kept (19:00Z): jmort birth formula untouched (hardX / hardDie / birthRisk unchanged). Nothing in the bundle lowers death: preterm baby death (40 % / 15 %) and the overdue risk (birthRisk × 1.5, stillbirth + 3) are as specified; no new shield. (Low health was NOT added to birthRisk either, so the formula stays the same for everyone.)
- Thuốc thúc sinh (PARKING_LOT #1, owner words there): see PROGRESS §7. Two-way: NPCs in the same spot take it (BAL.preT.npcDrug 60 %).

## History / drama check (OD:L1327) for the drug
- Chinese obstetrics had labour-hastening prescriptions (催生 "thúc sinh" decoctions/pills in the Song-era 《妇人大全良方》 tradition) — general knowledge, used for slow labour; a court woman using one to match a recorded date is a drama device, not a documented court practice.
- *Empresses in the Palace* (Hậu cung Chân Hoàn truyện): Zhen Huan's twins were conceived outside the palace; the dates against the Emperor's record are the threat; she goes into early labour after a cat attack, and the Empress later forces a drop-of-blood test where the water is rigged ([thetvdb ep. list](https://thetvdb.com/series/empresses-in-the-palace/episodes/4328819), [163.com recap](https://www.163.com/dy/article/J1OC6THH0552YYE2.html); science note on the alum/oil trick: [cn-healthcare](https://www.cn-healthcare.com/article/20210312/content-552200.html)). The analyst's history part (reports/suc-khoe.md Part 1: ở cữ, wet nurses, preterm folk saying, Lady Gouyi, Kính sự phòng) covers the rest.
- Design consequence: the drug is a scheme card (Mưu kế-style "Sức khỏe" domain) with a real price (a truly preterm baby), never a safe fix.

## Measurements
### D57 bot (dev/measure/sk-bots.js = review/preg-rate-r1 preg-bots.js + health counters; real weekly endTurn loop, seeded, same seeds per pair)
Both arms run with BALJ conc .5 (the D57 base change). NOTE: the D57 fertile-window factor (jcycle fert) is NOT on main (review/preg-rate-r1 is unmerged; main has conc .25), so these are "main + conc .5" numbers. A = origin/main build, B = this branch. 40 lives × 10 years (player Sủng ≥ 25); f = 20 lives with Sủng ≥ 60.

| arm | NPC births / consort-year | NPC births | NPC conception / 100 nights | NPC mother died in childbirth | hard | stillbirths | NPC miscarried / 100 pregnancies | her births | her died in childbirth |
|---|---|---|---|---|---|---|---|---|---|
| A main | 0.097 | 331 | 9.9 | 30 (9.1 / 100 births) | 68 | 8 | 19.1 | 18 | 4 |
| B branch | **0.141** | 567 | 14.9 | 43 (7.6 / 100 births) | 108 | 19 | 21.8 | 17 | 2 |
| Af main | 0.107 | 192 | 11.0 | 11 (5.7) | 40 | 6 | 19.3 | 10 | 0 |
| Bf branch | **0.150** | 232 | 17.0 | 16 (6.9) | 46 | 7 | 19.1 | 17 | 4 |

- **Births rise ~45 %** (0.097 → 0.141): this is the owner's ở cữ change (×0.7 gone, 1 month instead of 6) — the foreman asked for this number. If the target stays ≈ 0.10 per consort-year, the one knob is BAL.conc (e.g. .5 → .35) or the D57 fert window when it lands; not changed here (owner decision / D57 owner).
- Childbirth deaths per birth not up (7.6 vs 9.1, 6.9 vs 5.7 — noise both ways); same formula.
- Miscarriage per pregnancy (NPC) 19 → 22 %: more conceptions right after a birth while Sức is still low (the old +8 under Sức 30). Her own sample (37 pregnancies) 35 % vs 9 % in A is small; no "named cause" miscarriage fired for her in this bot (it does not walk).
- Health counters (B, 40 lives): preterm m8 12 / m9 28 (≈ 6.6 % of births), preterm babies died 8, overdue 42 (≈ 7 %), ở cữ kept 535, lệch sổ facts 64 → tests 27 (blood mixed / accuser punished 23, innocent NPC condemned by a rigged bowl 2, guilty caught 2), NPC drug 3. Per life: ng_set 0.75, ng_oan 0.05 (route counters; includes the NPC twin).
- Sức max: her (bot lives mostly die young) < 30 y cap 98.3; NPC consorts 30–40 y: health 90.8, cap 94.5, Sức 90.3.

### Sens bot (runb.js sens + inpage6 + insk.js counters; 4 lives careful, 4 lives "careless" = +8 khắc, 40 % rain walk, +20 card Sức per week while pregnant; this branch)
| | her Sức mean | Sức max mean (<30 / 30s) | her pregnancies | miscarried | by a named cause | her births | preterm (palace) | overdue (palace) | ng_set per life | ng_oan per life |
|---|---|---|---|---|---|---|---|---|---|---|
| careful | 85.0 | 98.0 / 89.9 | 14 | 0 | 0 | 6 | 3 | 2 | 1.0 | 0.0 |
| careless | 79.4 | 98.6 / 93.6 | 13 | 2 (15 / 100) | 2 | 2 | 3 | 6 | 1.0 | 0.3 |
Small samples (the sens bot is ~4 min a life); the cause table works (both careless miscarriages named a cause, none when careful) and is capped at +4 %/month. ng_set ≈ 1 per life (≈ 9 years) counts every lệch-sổ test in the palace, mostly NPC-vs-NPC.

## Tests (one at a time)
- dev/test/suc-khoe.js (new, logic): PASS.
- dev/test/palace-oldsave.js main → branch (755x1000): PASS, no page errors (old save without kh fields loads; khScar set lazily).
- dev/test/mortality.js 240 2: all ok, no page errors. dev/test/cycle.js 1180x820: ALL OK. dev/test/routes.js 1180x820 (blood-test dialog etc.): no errors, no overflow/cut.
- dev/test/coop-world.js: fails the same way on origin/main (TypeError reading 'name' at coop-world.js:14) — pre-existing, not this branch. dev/test/coop-e2e.js (LIVE Worker, Fold host + iPad guest + solo): 59/59 passed, no page errors.
- Co-op rule in code: every NPC roll in jkh (pregnancy extras, health month, lệch-sổ world, NPC drug) is skipped on a guest (khGuest = COOPW.on && seat ≠ "a"), as jmort.

## Open / follow-ups
- Births +45 % (above). NPC act Sức costs (npc-mind) — the walking/work causes barely reach NPCs until NPC acts spend Sức.
- Site (root index.html / sw.js / assets.json) NOT rebuilt on the branch: assets.json drifts with CDN manifests (438 entries of new art); the coordinator rebuilds on merge as usual.
- Not built: the person-card health words line (spec 4.6 says "and a line … if she prefers"); the j68e event "Để thái y kê thuốc bổ" does not count as a tonic. No kit part added, no KIT REQUEST.

## Handover
Only push + report remained; no successor needed.

SẴN SÀNG KIỂM 10cba645
