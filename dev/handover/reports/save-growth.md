# save-growth — (d) packed browser sổ + (b) BAL son phấn tune (E worker session_01DgYSWn2jD6dN6G4v5qkFaf)
PRIORITY #1 CHECK ('save growth compress slot' / 'CTM2 gzip save compress' / 'son phan ration npc use' / 'slotEnc CTMZ'): OD 0 | ledger 0 | claims 0 (own row) | main 0 | review/* 0 | archive 0 — decision only in FOREMAN_E_STATUS «FOR MAIN 121 (24/11 10:36Z)» + «ORDER FROM MAIN 125 (17:35Z 24/11) … save growth → adopt (d) + (b)». Reused: j16 saveCode/readCode (export stays CTM2 gzip), FIXER #3 measures (r10e-save-size / r10e-grow-scan), jcloud hash/bundle unchanged.
BASE: review/save-growth branched from **origin/review/robot10-e-fix-3-r2 6ac29a2c** (LAND READY, FF from LIVE 502c48c9, holds FIXER #3 save-size work) — NOT bare main, per the Foreman E base note. Branch: **review/save-growth e573b9b87ae77720601d690077aa145e9bd9fc02**.
START_CTX ≈ 4 % (used_tokens reads 0; own estimate).

## (d) packed sổ — what changed
- ONE sync codec in dev/build/j6.js: `slotEnc(json)` / `slotDec(raw)` (LZ77 on UTF-16 units, 64 k window, bit-packed 15 bits per char into U+0020..U+801F — no control chars, no surrogates, safe in every browser's localStorage). Stored form `"CTMZ"+len+stream`. `slotDec` returns anything not starting with «CTMZ» unchanged → **every old plain-JSON sổ still loads**. Sync, so save()/loadSlot() stay synchronous (no async races on unload).
- `slotGet(k)` / `slotPut(k,json)` = the only readers/writers of the big life stores (fix the whole group):
  j6 save()/loadSlot() · j16 Sổ › xuất (reads plain JSON → CTM2 code, format unchanged) and Ghi vào ô · jcloud rawSlot() (returns PLAIN JSON → cloud bundle, hash, sumOf unchanged; old devices / other builds read the cloud as before) and writeSlot() (packs) · jcoopworld week copy «ctm-coop-wk» · jcoopthine guest copy «ctm-thin-e:<room>». Small keys (options, rooms list…) untouched.
- Nothing is capped or dropped (law 6c): the same JSON text is stored, only packed. A cut-off packed sổ → slotGet null (same as a broken JSON sổ today).
- No UI change, no player-visible word.

## Size table (slot = what the browser holds; Chrome keeps ~5.2 M chars per site, ALL slots + co-op copies together)
Saves: robot repro saves dev/handover/robot/*/saves (year 1–14), loaded in this build and written by save(); year 22 = the year-14 save played on 8 game years by dev/test/savegrow-rouge.js (the life died at age 40 in year 22, so no real year-26 save exists).
| save | game year | sổ before (plain JSON chars) | sổ after (CTMZ chars) | × smaller | save() ms (of which JSON.stringify) | loadSlot ms |
|---|---|---|---|---|---|---|
| ncA/saves/…0057-004 | 1 | 452,973 | 69,230 | 6.5 | 18 (7) | 13 |
| nc-B-tuc/saves/…0057-035 | 5 | 1,902,152 | 229,117 | 8.3 | 56 (17) | 32 |
| ncA/saves/…0057-032 | 10 | 3,253,700 | 362,587 | 9.0 | 92 (35) | 59 |
| nc-B-tuc/saves/…0057-010 | 14 | 4,346,335 | 486,867 | 8.9 | 114 (45) | 60 |
| y14 + 8 years (node codec test) | 22 | 3,557,860 | 509,294 | 7.0 | enc 92 / dec 63 (node) | — |
| projected (FIXER #3 rate +200 k/yr from y15 2.97 M) | 26 | ≈ 5.2 M (the old limit) | ≈ 0.6–0.75 M | ≈ 7–9 | | |
→ the limit moves from game year ~26 to far beyond any life (≈ 7× the room). (save() timings: desktop Chromium; codec part ≈ 70 ms at year 14.)
Perf: quickcheck perf vs LIVE = render 202/197 ms, tab 350/380, buổi 916/904, tasks>200 ms 14/21 → no measurable cost.

## (b) BAL son phấn — BAL.ration.npc.use 3 → 4 (jration.js, the one BAL row; no typed number elsewhere)
Cause: the monthly issue is n=2 boxes × uses 6 lượt over 4 parts = 3 lượt / part / month = exactly npc.use 3, so every box an NPC BUYS when out (buy 50 %) or is bestowed (tribute) or borrows was never spent → full boxes piled up (+≈7 lượt / NPC / year, no end). With 4 the spend = issue + those extra boxes; the NPC still buys at her own price when out (law C), the stock settles at ≈5 boxes.
Measure dev/test/savegrow-rouge.js (real turns, every dialog closed, seed 11), year-5 save, 24 months:
| | game y/m | son phấn records / NPC | of which empty (0 lượt, old-build husks) | with lượt | lượt left / NPC | lượt in by road (24 months, all NPC) | lượt spent |
|---|---|---|---|---|---|---|---|
| BEFORE use 3 | 5/10 | 16.9 | 8.7 | 8.3 | 44.1 | | |
| | 6/10 | 17.5 | 8.8 | 8.7 | 47.1 | | |
| | 7/10 | 19.6 | 9.1 | 10.5 | 58.3 | noivu 5310 · buy 90 · emp 24 | 5169 |
| AFTER use 4 | 5/10 | 16.9 | 8.7 | 8.3 | 44.1 | | |
| | 6/10 | 12.4 | 8.1 | 4.4 | 20.0 | | |
| | 7/10 | 13.8 | 8.5 | 5.3 | 23.3 | noivu 5382 · buy 102 · emp 30 | 5938 |
Long run BEFORE (year 14 → 22, use 3): lượt left / NPC 70.7 → 63.2 (deaths/new NPCs reset it), records / NPC ≈ 72–80 of which ≈ 61–67 are 0-lượt husks.
FINDING (OPEN, not built): the 0-lượt «husk» boxes (u = 0) in NPC bags come from OLD builds (today every spend path removes a box at 0 and counts it in S.il.used); lxBoxes ignores them, so they never leave. In the year-14 save ≈ 1 200 of them (≈ 60 / NPC, one NPC 177 records). A one-shot load migration (each husk → ilUsedUp, counted used up — law 6c ok) would remove ≈ 90 k chars from such saves; not done here (not in the order; FIXER #3 / MAIN to decide).

## OPEN (not built, per the order)
(a) NPC dresses sewn from every monthly cloth + promotion sets never leave (+≈34 k chars / yr) → needs a real road (hand down / sell / keep the cloth) = new NPC behaviour (law 18) → MAIN / owner.
(c) NPC food / tea / wine never eaten; dead NPCs keep their goods → «eaten = used up» + heir / store for dead NPCs = new NPC behaviour → MAIN / owner.
Husk migration above.

## Tests (this sha)
- `python3 dev/build/assemble.py` + `bash dev/site/build_site.sh` ✔ (built, committed index.html/sw.js).
- `node dev/test/savegrow-codec.js <saves>` — fuzz 608 strings (ASCII / Vietnamese / random UTF-16 incl. lone surrogates / 70 k / empty) round trip 0 fails, every packed char safe, plain JSON passes through, cut-off throws; y1/5/10/14/22 round trip ✔.
- `node dev/test/savegrow-slot.js y1 y5 y10 y14` — OLD LOAD (plain JSON put in Sổ 1 as an old build left it; title + Tiếp tục), PACK, ROUND TRIP after a page reload (identical to what save() wrote), EXPORT (CTM2 code of the plain JSON reads back the same), IMPORT writer packs → ALL OK, 0 page errors (4 old saves incl. the long year-14 one).
- quickcheck: **QUICKCHECK PASS** · open 1613 ms · old save (from LIVE build) ok · core gates PASS.
- jcloud: `node dev/test/cloud-save.js` (real Worker code on the local mock) 53/55 — the 2 FAIL «iPad: its own Sổ 2 kept» / «phone pulls the iPad Sổ 2 on the title» are PRE-EXISTING: the same 2 FAIL, same 53 ok, on the base 6ac29a2c (run side by side). (A first run under 3 parallel jobs timed out at the conflict step; rerun on a quieter box = identical to base.)
- coop-e2e Fold host: **142/142 PASS** (exit 0) · COOP_SWAP=1: **142/142 PASS** on the rerun (first run 141/142: «week after rebirth advances» one-off; base 6ac29a2c SWAP 142/142 side by side; rerun of this sha 142/142 → flake)
- Test harness fix (whole group): 20 dev/test files (+ 3 new savegrow-* tests) + dev/tools/roster.js read the sổ through `window.slotGet?slotGet(k):localStorage.getItem(k)` (works on old builds too); roster.js decodes packed dumps with the j6 decoder.
- Note for reviewers: a page of an OLDER build (stale tab) cannot read a packed sổ (shows it empty); the SW update replaces the build, the cloud copy stays plain JSON.
