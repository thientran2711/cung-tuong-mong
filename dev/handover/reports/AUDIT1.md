# AUDIT1 — prompt machine + all persons' prompts (owner L2028)
depth 1 · START_CTX ~3 % (1M window) · 0 gens · NO prompt/builder/gate edits (list only) · base FETCH_HEAD a0d3673a→d0987eda

PRIORITY #1 CHECK: read FOREMAN_C_STATUS #27/ROOT L1935–L2028, rules G57–G69, A42/G35, B31, F19, F20 (ART_RULES.md); GATE7 report 4aab8d82 + BUILDFIX1 brief (STATUS ROOT ~11:18Z) — findings already owned by BUILDFIX1 are marked [BUILDFIX1]; everything else is NEW.

## Two machines exist (this is the root finding)
1. **Store builder** `dev/art/store-all/build_all.py` → exec's `dev/art/t8-prompt-B/build.py`. Seasons: ONLY root (default) and `--season dong`. `--season thu|xuan|ha` → `AssertionError: only đông (winter) is defined` (`dev/art/winter_g28.py:90`). B8 refuses 16 undrawn persons (c02 c04 c05 …): 74 persons buildable.
2. **Hand thu track** `dev/art/thu_comoi/`: approved s62 files t1–t8 + VE12's `make_thu_s63_65_L2026.py` (person slot swap; colour NAMES and hair colour words typed by hand for 3 persons only). This is what is actually drawn today.
⇒ Mass drawing of Thu/Xuân/Hạ for 90 persons has NO machine; the builder cannot make them, and the thu script covers 3 persons with hand-typed colours.

## Method (scripts, LUẬT SỬA CẢ NHÓM)
`AUDIT1/gen_builder.py` builds every person × t1–t8 × {root, dong} in-process (1184 prompts, gate result saved per file); `AUDIT1/audit_rules.py` = text checks per rule × rank (clause-level negation, held-item clauses exempt for G57). Full tables: `AUDIT1/tab_root.txt`, `AUDIT1/tab_dong.txt`. Builder's own gate: root 355/592 PASS (FAIL: all t4, t5, t8 + 11 t2 + s61 t1/t3/t6/t7), dong same.

## Results — ranked by what blocks mass drawing
| # | Rule | Where | FAIL (builder, root; dong identical) | Example | Fix location |
|---|---|---|---|---|---|
| 1 | Season palette B20 (a) | builder | **no thu/xuân/hạ at all**; root season: main ≠ palette 50/74 persons (ΔE≥10), sec ≠ 31/74; dong: main ≠ 23/74 (= the persons whose root_season is đông: builder keeps old DATA colours for them) | c06 root xuân wants deep peony pink #933966, has 'soft vermilion #D28977' (=main_before, pre-L1726); m14 đông MAIN written 'ivory white', palette main soft plum #D28BCC (main/sec swapped) | build_all.py b20()/main_words()/secondary(): use palettes_season.json for EVERY season incl. root and root=đông; winter_g28.season must accept thu/xuan/ha |
| 2 | G57 body pendant | builder | t4 74/74, t5 74/74, t8 74/74 (gate already refuses → no t4/t5/t8 prompt can be made) | 'embroidered silk sash with jade belt pendants and tassels' | build.py t4 Tần/Phi F clause (~L1235 'jade belt pendants'), t5 _a 'hanging jade belt pendants', t8 store text |
| 3 | G67 no cloak QP/HQP/HH | builder | t6 74/74, t7 74/74, t8 74/74 | t6 'the upper cape shorter'; t7 'outer robe worn OPEN at the front' + 'cloud-collar cape'; t8 'a long silk mantle from the shoulders to the floor' | build.py t6/t7/t8 outfits (check_store has G67 now via GATE7) |
| 4 | G68 Tần density [BUILDFIX1] | builder | t4 74/74 still 'a few LARGE embroidered' | cause: build.py L1228–1231 the NEW `_G20/_G20B` lines are immediately overwritten by the OLD two lines below them (dead code) | delete the old 2 lines |
| 5 | G69 t1 chest-centre flower [BUILDFIX1] | builder | t1 74/74 missing | cause: build.py TIER_LOW has key `1:` twice (L686 new, L687 old) → old wins | delete L687 |
| 6 | F19 chrysanthemum + F19 t6 list | builder | t6/t7/t8 14/74 each (persons n%5==2: m02, s62, c07, c12, …) | 'incurved chrysanthemums … along the borders' | build.py F2_FL[6] (L2034) still old list (tree peony / incurved chrysanthemum / … / bomb-form peony); F19(4) list = centifolia rose / thousand-petal camellia / thousand-petal lotus / mophead hydrangea / double crabapple; t7 = herbaceous peony, t8 = tree peony (F19(3)) — builder gives t7/t8 = her t6 species |
| 7 | F19 hair flower 'bloom only, no leaves' | builder | t1–t6 444/444 never say it; t3 20/74 say 'wintersweet sprig' (sprig = stem/leaves) | m05 t3 'a wintersweet sprig' | build_all.py SZ/_F13 hair sentence (L111) add the bloom-only words; F2_FL t1 'lilac spray', t3 'wintersweet sprig' names |
| 8 | F20 flower colours wired? [BUILDFIX1] | builder | 0/592 carry the json embroidery hex; 0/444 the hair hex | json is NOT read anywhere in build.py / build_all.py | read face-common/flower_colours_L2013.json in build.py flower_outfit() (embroidery colour next to {motif}) and build_all.py laws()/SZ (hair colour hair_by_tier[tN]) |
| 9 | G59 sachet | builder | t2 11/74 (gate refuses) | 'an embroidered silk sachet with a tassel in the other hand' (held-item list) | build.py t2 item list (E6 picks) — drop sachet from held items |
| 10 | NOFRUIT false positive | gate | s61 t1/t3/t6/t7 refused | her colour name 'persimmon' read as held fruit (check_store F16) | check_store F16: skip colour words |
| 11 | Rule-ID collision | gate | — | check_store.py L939/1150 calls NOVASE 'F19'; ART_RULES F19 = hair flower | rename NOVASE id |
| 12 | G60 bow | builder | builder writes NO bow/knot at any rank (only 'ribbons fall down the front' t1) → nothing to centre; thu files have them | — | none (info) |
| ok | G58/G65 big flowers t1–t3, G65 trims, G61 front waist, G35 cleavage, length ≤10 000 | builder | 0 FAIL by text check | | |

## Hand thu files (15 VE12 s63–s65 t1–t5 + s62 bases t1–t5 + THUROOT1 t6–t8 L2023)
check_store --scope tpN --age a18: t1–t3 PASS, t6–t8 PASS; t4/t5 FAIL B26/M06/S13 (= known written waiver of the approved s62 base, VE11.md L89). keep_check 15/15 PASS. My rule table: G57 G59 G61 G58/G65 G68 G69 F19 G35 = 0 FAIL. Open:
- **(a) colour NAMES ≠ palette** (hex correct): s64 main 'muted teal' vs palette 'soft muted duck-teal'; s65 main 'smoky mauve' vs 'deep ash rose' (#8C6393, also 'NOT grey' guard); s64/s65 sec 'ivory' vs 'ivory white'. s62 approved files write sec 'lilac' while palette thu sec = 'powder pink-lilac #FBE8F8' (approved picture — leave, A18; but every copy from s62 inherits the name swap logic).
- **(b) F20**: embroidery hex written ✓ (VE12 files); hair colour = hand words only, json hair_by_tier hex never written (21/21). s62 base files predate F20 (no flower hex).
- G67 word risk: s62_t7/t8 L2023 still contain 'cape' ('pearl and jade trims along the cape edges', 'NEVER on the robe, cape, collar') — GATE7's G67 passes them; owner may still read a cape.
- F19(3) question: s65 t5 'peony-flowered Chinese aster' = peony-like flower below t7 (F2 table vs F19(3)); s65 t3 wintersweet is a yellow species drawn pink-lilac (allowed by F19(5)).
- Machine gap: make_thu_s63_65 hard-codes per-person colour names (P dict) → for 90 persons it must read palettes_season.json main/sec + flower_colours_L2013.json hair_by_tier/embroidery instead of hand words.

## F20 table itself (flower_colours_L2013.json, 90 × 4 = 360 cells)
main/sec hex = live palette 360/360 ✓; no yellow/green hair 0 FAIL; flower vs main ΔE≥14 0 FAIL; hair_by_tier light→dark 0 FAIL; dark robe → lighter flower 0 FAIL. **Hair NOT lighter than embroidery (F20 'hoa cài tóc luôn sáng hơn hoa thêu') 12 FAIL**: c20.thu c26.ha c26.thu m02.dong m08.ha m19.dong s13.dong s30.ha s34.ha s49.thu s52.dong s53.ha.
Palette: no duplicate main+sec pair in any season; duplicate MAIN hex: xuân 3, hạ 2, thu 3 (B20 'unique pair' holds; unique main does not).

## Recommended order (for BUILDFIX1 / foreman; no edits made)
1. Builder: add thu/xuân/hạ seasons using palettes_season.json for main+sec (and fix root + root=đông persons) — without this no 90-person season run is possible.
2. Remove body pendants t4/t5/t8, cloak/cape/outer robe/mantle t6–t8, sachet t2 → builder output can pass its own gate.
3. Dead-code fixes G68/G69; F2_FL t6 list per F19 + t7/t8 own peonies; hair 'bloom only, no leaves' sentence; F20 json wiring (embroidery + hair_by_tier).
4. Fix 12 F20 cells; gate F16 'persimmon' + F19 id clash.
5. Hand thu: palette names in s64/s65; generalise make_thu script to read the json.
Handover: none needed (job done at ~15 % ctx).
