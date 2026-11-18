# R1 report — art rule book cleanup (PARTIAL, handover to successor)
PRIORITY #1 CHECK: OD OD:L1232/L1231/L1148 + owner 22:45Z | main: non-art books are MAIN's | review/* none | claims none.

## STATUS
DONE (commit "rulebook-cleanup R1 step 1"): (a) ONE BOOK header added at top of dev/art/FIGURE_GATE.md with her 22:45Z words verbatim; (b) section C item 4c ("ONE IMPERIAL YELLOW", 18:17Z incl. its "Older text of this rule" block with the 16:30Z/17:35Z C2 text and the t8 FREEZE) DELETED — 4c-NEW (19:05Z, explicit "canon overwrite of the c25-yellow line") is kept as the newest on the yellow topic.
NOT DONE (scale): moving still-valid lines of dev/art/OWNER_ART_RULES.md, STYLE_ANCHOR.md, EVENT_ART/ITEM_ART/LOOK_DECALS/MOVE_HOUSE, dev/rules/START_ART.md and the 8 dev/rules/topic/art-*.md (~170 KB, thousands of tagged lines) into FIGURE_GATE. Needs per-file workers (suggest 1 worker per file group; art-costumes, art-faces-figures, art-events-effects are the big ones). Not started; nothing deleted from those files. OWNER_ART_RULES.md is only an INDEX (3.7 KB, no rules) — safe to replace by the one-line pointer "Art rules live ONLY in dev/art/FIGURE_GATE.md".

## TABLE (topic | kept line | removed | moved)
| topic | kept (source) | removed | moved |
|---|---|---|---|
| t7/t8 yellow | FIGURE_GATE C 4c-NEW (19:05Z) | old 4c (was line 73 before edit): c25 yellow, C2 16:30Z/17:35Z text, t8 freeze | none |
| ONE BOOK | FIGURE_GATE top | — | — |

## QUESTIONS for the owner / ROOT-32 (not deleted)
1. Fragments that lived only in old 4c and may still be valid: (a) "FAIL = pale cream/beige/tan/ochre yellow"; (b) "v0 of a person whose ORIGINAL robe is cream/yellow keeps its original colour"; (c) "every pale t7/t8 yellow already made is raised to the reference yellow". They were dropped with 4c; re-add if she wants them (c is probably covered by 4c-NEW).
2. FIGURE_GATE A0 table row "Held items t1/t4/t5/t6": "t6 swatch TdwDfOyVNR = OPEN question" vs line "T6 FINAL ~23:30Z ... swatch as image 3" vs REFERENCES "EXACTLY TWO references, no third image": t6 swatch as 3rd image vs the two-reference rule — which wins for t6?
3. C 2a tail (18:54Z): "4 consort style portraits face-consort-01/05/12/18 redrawn in m09 style, use as refs decided after she sees them" — REFERENCES 22:35Z says only two refs, pink-robe style B never used. Is the 4-portrait redraw still wanted?
4. B 2/2b/5/6 vs B 7 (22:45Z): hairpin rules for t1–t8 say "OLD prompt words unchanged" (newest). Older lines B2 (v1/v2 different hairpin sets, new ornaments wording), B5 (no fixed formula), B2b (crown per version) overlap partly; I did not delete them because v1/v2 variation is still a live design — confirm whether B2's "new hair ornaments" prompt wording is superseded by B7.
5. A WOMEN line (07:05Z: refs = old live figure + faces, no m09 for body) vs C 4a/REFERENCES (m09 + own t1): REFERENCES (22:35Z) is newer; the old WOMEN "refs = old live figure" wording looks superseded for refs only (proportion part stays). Not edited.
6. Section F still mentions "C2 yellow" and spec5 ladder; "Reference set = c12 a18 approved ladder" — unchecked.
7. Style-B lines at FIGURE_GATE (21:50Z, 22:10Z, T6 FINAL) vs "pink-robe style B kspkwKx16B NEVER used": two different things called "B" (prompt B vs style image B); worth renaming one — owner-word lines cannot be reworded, so only a header note could, ask.

## FOR MAIN (non-art books carrying art lines; I touched none)
grep count of art terms (Magnific/gpt-2-6/m09/hoa điền/STYLE_ANCHOR/OWNER_ART_RULES/APPROVED_PROMPTS): dev/OWNER_DECISIONS.md 128; OWNER_LEDGER.md 5; handover/WORKER_BRIEF.md 3 (line 17 = a full art-rule paragraph: Magnific, refs consort-01/05/12/18, no moles, huadian — now partly superseded: m09 only style ref); dev/PRIORITY_RULES.md 2; START_CORE.md 3; START_WORKER.md 5 (HO/WORKER_BRIEF:L17 and PREAMBLE art lines incl. ART COMPLETENESS 15/11 and the consort-01/05/12/18 style refs — superseded by FIGURE_GATE REFERENCES 22:35Z); START_FOREMAN 1; START_MAIN 1. MAIN should point these to FIGURE_GATE.
Non-art duplicates seen: kit-first rule appears in START_CORE laws 9–11 + OD:L491/L1093 + HANDOVER:L64–72 + WORKER_BRIEF:L5 + PREAMBLE:L4/L9/L20 + START_CORE OD:L336/L513 (same rule 6+ times); priority rule #1 in START_CORE gate zero + OD:L5 + HO/WORKER_BRIEF:L9; fix-whole-group in OD:L52/L474 + law 11 + WORKER_BRIEF:L7 + HANDOVER:L69.

## HANDOVER TO SUCCESSOR (rollover; coordinator opens it)
Next steps: (1) answer/park the QUESTIONS; (2) per file group move still-valid art lines verbatim into FIGURE_GATE under their topic (new sections after H: ART OTHER-TOPICS: faces/figures, costumes, events/effects, scenes, frames/kit, items/pets, animations) and replace the old file by the pointer line; check with `grep -rn '\[OD:L' dev/rules/topic/art-*.md` that every kept line carries its tag; (3) re-run the table. Read order: this report, FIGURE_GATE (183→~180 lines, 100 KB, read with offset/limit ~40 lines), then the art file you take.

## R1b (worker R1b of ROOT-33, 18/11 ~23:10Z) — costumes, faces-figures, STYLE_ANCHOR, OWNER_ART_RULES, START_ART, FIGURE_GATE A0–H
PRIORITY #1 CHECK: OD 0 new | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. Method: moved/deleted by [tag] with a script (moved text is copied byte for byte; only 2 worker-written lines edited, listed below). Upstream REFERENCES (22:55Z) now allows a 3rd image (royal swatch) for t6+ → R1 QUESTION 2 is answered, dropped.
FIGURE_GATE: 100.7 KB → 112 KB (+11 KB: ~25 KB moved in, ~14 KB of old files' duplicates stayed out). New blocks: C8 (costume families), D4 (style anchor text), D6 (face/appearance/makeup lines), E3 (approval/completeness lines).

### TABLE (topic | kept line (source) | removed (file:line) | moved from → to)
| topic | kept | removed | moved |
|---|---|---|---|
| style anchor | FIGURE_GATE D4 + 9 STYLE_ANCHOR lines (prefix, Never, output, beauty rule, rejected eyes, nobody poor, men colours) | STYLE_ANCHOR:16 (smile = dup of D4b); START_ART ART/STYLE_ANCHOR.md:L2–L14 copies (older, open-mouth prefix); sentence "pass 2–3 consort portraits as style refs" cut from STYLE_ANCHOR:2 (superseded by REFERENCES) | STYLE_ANCHOR:2,3,4,5,6,8,10,12,14 → FG D4 |
| huadian | OD:L592 (8.5 %), OD:L9, OD:L1104 (motif: flowers/leaves/butterfly/phoenix) | art-costumes OD:L512, L216 (objects→flowers, replaced by L1104), L231, L97, L103, L152, L240, L245, L476, L212 (older size/status); START_ART OD:L490 (replaced by L592); art-faces HANDOVER:L92 | OD:L592, L9, L1104 → FG C8 |
| veils / trung y / dress items / khuê các+nghèo | OD:L12; OD:L392; OD:L685; OD:L211 | art-costumes OD:L391, L460 (status); L206, L209, L210, L214 (khuê các/poor: replaced by FG 21:00Z + 22:05Z blocks) | those four → FG C8 |
| foreign princesses | OD:L1206, L1207, L1212, L1238, L1239, L1256 | art-costumes OD:L1209 (sample work order), L1210 (home maid → "palace maid uniform", withdrawn by L1239) | → FG C8 |
| one colour per person / rank | C-ROOT-6 ~12:44Z ("84 different colours, nobody alike") | C-ROOT-6 ~12:46Z (13 ranks each its own design: replaced by 4a/4b "recolour only"), ~12:48Z (embroidery = FG C1 dup); C-ROOT-15 03:35/02:43/03:45/04:05(×2)/04:00/04:08Z (all already in FG A0/WHO/F/B1); 03:50Z (a51 "hands in front", replaced by the 15:55Z a51 pose); ROOT-52 16:42Z (= FG 3e) | C-ROOT-6 ~12:44Z → FG C8 |
| makeup | OD:L747 (8+8), L420, L555, L778, L687 | art-costumes OD:L472 (older tone, replaced by L687) | → FG D6 |
| faces/appearance | OD:L8, L10, L13, L100, L107, L121, L126, L130, L305, L1166, L1305 (no rosy layer), L1160/L1018 (HD) , HANDOVER:L53 (clause "refs consort-01/05/12/18" cut, superseded) | art-faces OD:L11 + HANDOVER:L93 ("calm standing, no flying sleeves, may turn at an angle": replaced by A0 rule 3 + D3a facing rule); START_ART OD:L122 (save credits: replaced by OD:L751 "draw everything") , OD:L48, OD:L29 | → FG D6 |
| process | OD:L93 (pilot → approval → roll out), OD:L751, OD:L98 (HD previews), OD:L567 (4 age bands × every rank) | — | → FG E3 |
| FG t6 | T6 FINAL, 22:40Z swatch line, 22:10Z line | FG: 22:12Z (t6 small yellow), 23:25Z T6 vs T7 (cancelled proposal), 21:50Z "style ref B" block (style B = pink image, never again) | — |
| FG emperor | EMPEROR 23:15Z, 22:25Z builder, 23:00Z, 22:02Z redraw rule | FG: 21:50Z e2–e4 redo, 22:35Z e2–e4 rewrite (replaced by 23:15Z) | — |
| FG ages | a51/a65 lines 22:50Z, 22:55Z, 22:58Z, ELDER COLOURS 21:06Z | FG: AGE 51 t7/t8 EXCEPTION 19:55Z (overridden), a65 "same colours darker" 22:30Z and AGE COLOURS 22:45Z (replaced by 22:50Z trầm = lower saturation + ELDER COLOURS); the "COLOUR two levels" segment inside the 15:55Z AGE 51 line (the rest of that line kept) | — |
| FG refs | text in 109 "(art-costumes.md OD:…)" → "(section C8 below …)"; D4 pointer to STYLE_ANCHOR.md replaced by the moved text | — | — |
Old files: art-costumes.md, art-faces-figures.md, STYLE_ANCHOR.md, OWNER_ART_RULES.md (index, no rules) → pointer line "Art rules live ONLY in dev/art/FIGURE_GATE.md (owner 18/11 ~22:45Z)." START_ART.md keeps its gate-zero and "approved forms first" lines + the pointer.

### Left in place on purpose (NOT figure-art rules; unclear → not deleted) — FOR MAIN / R1c
- art-costumes.md under "NOT ART RULES": OD:L382, L384, L473, L475, L605, L746(heading), L761, L1106, L128 (outfit-slot / minigame / contest mechanics, status).
- art-faces-figures.md (86 lines left): stage/portrait/dialog/Tuần lục/podium/news-card display and bug tickets (OD:L177, L167, L498, L510, L554, L831, L833, L1026, L1187, L940, L949 …), roster/NPC lines (L1120, L1121, L642), handover lines HANDOVER:L32/L49/L75/L77/L80/L104, work orders (L183, L294, L297, L749). Kit/people topics → kit-ui.md / people-life.md.
- START_ART.md "OTHER ART/PROCESS LINES": events/effects/perf/CDN/pets/scene lines (OD:L364, L659, L663, L713–719, L1230, L203, L141, L399, L662, L775, L385 …) → R1c (FIGURE_GATE I) or MAIN.

### QUESTIONS (not decided, nothing deleted for these)
1. makeup: OD:L687 (6–7 looks, 3 cool + 4 warm) vs OD:L747 (8+8, 4 cool + 4 warm, newer): only the count is superseded; both lines kept (L687 also has the tone rule). OK to drop the count?
2. huadian: OD:L9 still says "size t1 = c03 t1, grows ~5 %/tier" vs OD:L592 8.5 %; and FG D2 says "bare forehead, hoa điền is an item". Is huadian on figures still painted at all?
3. calm: OD:L11 and HANDOVER:L93 ("no flying sleeves/sashes/swirling hems for ALL figures") deleted as replaced by A0 rule 3 ("low ranks may be lively, sleeves moving"). Confirm she wants sleeves moving at low ranks.
4. C-ROOT-6 ~12:46Z deleted: it also had "modest cloud-collar (vân kiên) growing from Tần/Phi up, never bulky" (only "not bulky" survives in C5). Re-add the collar?
5. Emperor yellow: FG "EMPEROR COLOURS NOW" says THE YELLOW = emp1 a26; 20:08Z says same C2 yellow as consorts. Kept both (owner words); which wins?
6. STYLE_ANCHOR prompt prefix (D4) vs build.py builders: is the prefix still pasted by hand anywhere, or only inside build.py?
7. Older R1 questions 1, 3–7 still open (see above).

### FOR MAIN (added)
Art lines still in non-art books: START_WORKER.md (WORKER_BRIEF:L17 / PREAMBLE art lines, consort-01/05/12/18 style refs superseded), PRIORITY_RULES (2), WORKER_BRIEF:L17, OWNER_DECISIONS (128 hits, history, untouched). Mechanic lines listed above should move to kit-ui.md / people-life.md.

### HANDOVER
R1b done and pushed (commit "rulebook-cleanup R1b …"). Nothing pending except the QUESTIONS. R1c edits only FIGURE_GATE section I at the end (no overlap).

### SUMMARY FOR OWNER — R1b (sections A0–H of FIGURE_GATE + moved lines; for ROOT-33 to turn into Vietnamese)
#### A. Topics that STAY in FIGURE_GATE (topic — rule now — date)
A0 approved forms: copy builder output unchanged; only held item + pose may change; calm with rank/age; not listed = sample only (22:20Z).
References: style image m09 (never pink "style B") + own t1 face; royal ranks t6+ also the yellow swatch (22:35Z/22:55Z).
Approved forms table: t8, t7, a51/a65, headdress, held items t1–t6, poses spec5, Thái hậu, nhà nghèo (22:00–22:35Z).
Owner's words 03:35Z: all checks in ONE file; m09 row on red lines from skull top.
WHO 03:45Z: women = old live figure body; men = prompt only; children normal; no separate mama figure; tolerance ±5%.
A proportion/row: no m09 overlay for women, keep old body, row on red skull-top/feet lines, crowns are extra height (07:08Z).
B hairpins: full pins from t1; v1/v2 different pins same rank richness + may change hairstyle (07:50/07:55Z); t7/t8 crown per version based on v0 (16:25Z); every rank ≥ rank below, t6/t7/t8 crowns differ; real trâm no combs; no fixed formula (05:15Z); copy the old prompt (05:25Z); t1–t8 hairpin words = old prompt words (22:45Z); rank names.
C costume: embroidery stitched into silk, not pasted (07:45/07:55Z); one style ref m09 (18:52Z); m09 = style/skin/fabric only; each rank own colour, only colour changes, not rực, fresh for a18–a36 (18:45/18:00Z); method copy-then-recolour; three completely different colours v0/v1/v2 (07:55Z); row scan before painting; slim ≠ plain (04:27Z); one gen = m09 + old figure (07:52Z); original design wins (07:40Z); fabric drape sentence (17:55Z); v0 colour = own t1 + m09 (18:35Z); t8 prompt B frozen (18:20Z); the yellow = C2, t8 yellow dominant (19:05Z); phoenix required t7/t8, never below t7 (18/11); sleeves/hem/feet, giao lĩnh collar; one prompt structure for every rank/state (19:12Z).
C8 (moved): huadian 8.5 % + flowers/leaves/butterfly/phoenix only + consorts only; veils; trung y colours per tier; dress items not on a rack; khuê các/nhà nghèo clothes; foreign princess rules (own costume below Quý phi, own court robe from Quý phi, feedback of samples, no invented uniform); each person own colour (17/11).
D face/pose: own face, bare forehead; one item, never a cup; poses = spec5 table, front/3-quarter only, no look-back, nothing covers face (16:25Z, 22:45Z); held item value = rank, top-3 items reserved, fixed 10-item lists per rank t1–t8 (16:35–17:15Z); item contrasts with robe (08:00Z); natural feet; style anchor text (moved); closed-lip smile for everyone (16:37Z); fresh gens, Magnific gpt-2-6 only.
D6 (moved): face pool, no moles, hủy dung, ageing hair, allergy, 8 appearance overlays, expressions, no rosy layer (L1305), HD faces, makeup presets/looks, hand-written brief tags.
E approval: no mass before she approves 3–4 good people; one sheet per person; pilot→approval→roll out; draw everything; HD previews; 4 ages × every rank.
F ladder: hairpins + costume per rank table; Nữ đế (own prompt 22:40Z, dragon crown, tassels to forehead, woman's dress, shoulder piece stiff, own robe each); Thái hậu; Emperor (yellow dominant, same C2 yellow, own robe each, clean-shaven young, stiff shoulders, wide sleeves); age 51 face/hair/pose/original copy; a65.
G auto-regen + gen count; age look a36/a51; t7/t8 no more review; redraw rule = re-run same prompt (22:02Z); reply numbering "Lượt N"; style B for t1–t5, t6 final (23:30Z); 3–4 sample options; 22:05Z rules (hair same at every rank, praised images = benchmarks, Thái hậu collar, held items by status, triều phục luxury/headwear); a51/a65 elder colours (21:06Z), trầm = lower saturation (22:50Z), a51 silver streaks (22:58Z), emperor 23:15Z.
H held-item lists by status: nhà nghèo, khuê các, Thái hậu, Nữ đế, Nam Chiêu, Bắc Địch (22:05Z).
#### B. Lines DELETED as superseded (topic — deleted — replaced by)
huadian size — OD:L512, L231, L97, L103, L152, L240, L245, L476, L490 — OD:L592 (8.5 %).
huadian motifs — OD:L216, L212 — OD:L1104.
khuê các / poor — OD:L206, L209, L210, L214 — FIGURE_GATE 21:00Z + 22:05Z blocks (+ OD:L211 kept for origins).
trung y status — OD:L391, L460 — OD:L392.
foreign maid — OD:L1210 — OD:L1239 (no invented maid uniform); OD:L1209 sample order (done).
colour/design per rank — C-ROOT-6 12:46Z, 12:48Z — FG C4a/4b/C3 (recolour only), C1 embroidery.
duplicates already in FG — C-ROOT-15 03:35, 02:43, 03:45, 04:05 (×2), 04:00, 04:08Z; ROOT-52 16:42Z — FG Owner's words, WHO, B1, F, 3e.
a51 pose — C-ROOT-15 03:50Z — AGE 51 15:55Z.
makeup — OD:L472 — OD:L687.
calm poses — OD:L11, HANDOVER:L93 — A0 rule 3 + D3a facing rule (QUESTION 3).
huadian dup — HANDOVER:L92 — OD:L9/L592.
credits/art order — START_ART OD:L122, L48, L29 — OD:L751 (draw all), OD:L93 (pilot), FG D5.
STYLE_ANCHOR — :16 (smile) — FG D4b; START_ART copies of STYLE_ANCHOR (older) — FG D4; "pass 2–3 consort portraits as refs" — REFERENCES.
FG t6 — 22:12Z small yellow, 23:25Z proposal — T6 FINAL 23:30Z.
FG style B — 21:50Z "style ref B" — REFERENCES 22:35Z.
FG emperor — 21:50Z e2–e4 redo, 22:35Z e2–e4 rewrite — 22:02Z redraw rule, 23:15Z.
FG a51/a65 — 19:55Z t7/t8 exception, 22:30Z a65 colours, 22:45Z AGE COLOURS, "two levels" colour segment of the 15:55Z line — 22:50Z trầm, 21:06Z ELDER COLOURS.
## R1c (worker R1c, 18/11) — events, effects, scenes, animations, frames, items, pets, other
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. Moved verbatim (script copy, tags kept) into FIGURE_GATE "## I. OTHER ART" (sub-headings I.1–I.9; 227 lines; FIGURE_GATE 100 KB → 163 KB). Sections A0–H untouched. Dedupe: none of my [OD:Lnn] tags were already in FIGURE_GATE; ITEM_ART:L3 + EVENT_ART:L10 existed twice (topic file + dev/art file) → moved once.
Old files now = title + pointer "Art rules live ONLY in dev/art/FIGURE_GATE.md (owner 18/11 ~22:45Z)." (+ leftover NON-ART lines, see FOR MAIN; EVENT_ART/ITEM_ART/LOOK_DECALS/MOVE_HOUSE keep their data tables/process steps; their rule lines moved).

### TABLE (file = rules/topic/<file>; Ln = line in that file before the edit; [OD:Lnn] = its tag)
| topic | kept (moved to FIGURE_GATE I.x) | removed (file:line) | reason |
|---|---|---|---|
| event/act picture light-dark | I.1: events-effects L33, L34 (17/11 owner verbatim), L37 (L638) | events-effects L32 (L545), L35 (exact duplicate of L33's first part) | 17/11 line states it "restates L545"; L35 = same text twice |
| event frame layout | I.1: L10 (L448 kitEventDp, 13:15Z = newest) | events-effects L50 (L114), L55 (L194); art-other L26 (L236) | all replaced by L448 (left figure / right picture) |
| Tiên đế băng hà art | I.1: L53 (L125 st-* style) | events-effects L51 (L117), L52 (L124), L54 (L131 approved-status) | chain L117→L124→L125 style rule; approval = status |
| Thỉnh an pictures | I.1: L59 (L280 differ), L64 (L417 pose), L65 (L427 approved ref) | events-effects L57 (L237 old redraw spec), L107 (L838) | superseded by L417/L427; L838 covered by L383 anatomy audit |
| default/fallback pictures | I.1: L16 (L967 no generic default), L75–77 (L548–550 placeholders, see Q2) | events-effects L66 (L428), L67 (L444), L68, L70, L109, L113, L117, L121, L123, L127, L84 | instance bug reports / audit-count status / worker notes covered by L967 + L987; L1144 covered by L1154 |
| face marks | I.1: L41 (L1154 one rule) | events-effects L127 (L1144) | replaced by L1154 |
| podium/results | I.1: L46 (OD:L15) ; I.6: art-other L76 (L378) | events-effects HANDOVER:L94 left (non-art, gameplay) | |
| scenes / backdrops | I.2: scenes L12,13,15,16,23,28,31–35,37,39–42,44–51,53,56,59,61–63,66,68,70,74,82–86 | scenes L10 (L64 phone-stage plan, replaced by L77 "portrait room set cancelled"), L43 (L142 status), L52 (L268 → covered by L300/L1257), L55 (L300) + L58 (L328) (code colour-grade, replaced by L1176 "remove CSS buổi tint"), L64 (L505 bug status), L76 (L998), L81 (L1174 approved-status), L25 (ITEM_ART dup) | newer line same topic |
| animations/effects | I.3: animations L10,12,14,15,19,21,23–33,35,37,39,41–45,47,49,52,53,55,57,59,61,63,65,66,68,70–72; events-effects L56,62,83,86–98,100–103; scenes L72; other L21,28,48; items-pets L34 | animations L51 (heading dup) | |
| frames / portrait kit | I.4: frames-kit L10,11,16,18–23,25–27,29,31–39,41,43,45,47; scenes L29 | frames-kit L13 (worker task), L24 (L79 approved-status), L28 (L232, replaced by L251) | |
| items / pets | I.5: items-pets L10,12–15,17,18,20,23–26,28,29,31–33,40,42–44,46,48,49; ITEM_ART.md:L3,L11 | items-pets L27 (L400, replaced by L413 "only the cat"), L30 (L403 "NO glow", replaced by L407 aura painted in), L38 (L683 ok-status), L41 (L577 status) | |
| emotion/head marks/other | I.6: other L12,32,64,66–69,72,75–80,84; items-pets L22 | other L10 (L1000 replaced by L1009 owner override), L34 (L539 calendar icon → replaced by L1186 icon column), L70+L71 (L145, L151 → approved set L156), L74 (L366 emblem glow, replaced by L390/L1079), headings L36/38/40 | |
| decals / event art / style | I.7: LOOK_DECALS.md L2,L4,L37; I.8: EVENT_ART.md L3,L10,L86–88; I.9: MOVE_HOUSE.md L2,L7–L14 | — | rule lines only; tables/steps stay in the files |

### QUESTIONS (kept, not deleted)
1. Pictures per MEANING GROUP shared (L987/L986, newest) vs "every act/meaning its own picture" (L341, L279, L468) vs "act buttons in person card: group pictures BANNED, leave empty" (L470). Which wins for Hành sự / person-card acts?
2. Placeholder pictures event-light/dark, act-light/dark (L548–550, "owner sees it and reports") vs "no generic default picture anywhere, paint a fitting one" (L967). Still want the 4 placeholders?
3. Page turn: L1349 (turn effect only on Tuần lục book) vs L961 (portrait phone: no page turn, other animation) vs older curl specs (L116/L132/L179/L186/L204/L208/L276/L924): curl specs kept for the book; confirm L961 is dead.
4. Head mark above her: L1079 (bob more visibly + glow, newest) vs L390 ("only gentle bob, NO glow", 8 tiers, mixed line) — L390 kept whole; confirm glow wins.
5. L375 / L380 / L410 Đáp ứng frame chain (plum-branch frame, paler gold, then "APPROVED A old frame + ivory") and L80 vs L81 (check badge vs "NO check badge"): all kept; which parts are dead?
6. L1270 ("Dư đồ always from Phượng Lệnh, never painted") vs L1415 (16/11 18:40Z: missing season/buổi → paint it) vs L159/L329: kept all; is the PL-only rule narrowed to "paint only what is missing"?
7. L139 (art-other L68) asks for a seasons redraw of place backdrops — rejected by L144 (kept as is). Mixed line, kept whole; delete the redraw half?
8. L395 (pet stages Non→Trưởng thành→Linh thú) vs L398 (4 stages) — mixed line kept whole.
9. MOVE_HOUSE:L12 (4 consort portraits in m09 style pending) vs R1 Q3 — same question, moved as is.

### FOR MAIN — NON-ART lines left in the old topic files (not art; each file now = pointer + these)
art-events-effects: L20–21 (new-game identity screen UI), L24 (Tự học wording), L26 (night notes), L43–44 (HANDOVER L91/L94 wardrobe, contests), L115 (week-book person page), L118 (contest intro layout). art-scenes: L17, L19, L21+L78 (stage slots), L27, L36, L38, L80. art-animations: L17 (minigames). art-other: L14,16,18,20,22–25,27,30,31,42,44,46,50,52,54,56,58,60–62,82 (UI, gameplay, balance, lifespan, wardrobe). art-frames-kit: L15 (KIT FIRST law). art-items-pets: L36 (handmade recipes, gameplay). Please re-home or confirm.

### HANDOVER (R1c)
Done: all 10 files processed in one pass. Remaining for others: answer the QUESTIONS; R1b owns A0–H. If FIGURE_GATE size (163 KB) is a problem, next prune = I.1/I.2 per-instance lines (event/room approvals) once the owner answers Q1/Q2/Q6.

### FOR MAIN (owner answers 23:25Z)
UI/kit items, not art: main writes them into its own UI books (not FIGURE_GATE). Owner answer 18/11 ~23:25Z real: "Lật trang chỉ có ở sổ Tuần lục, điện thoại dọc thì không lật, đúng, 11 đúng, 12 đúng, 13 4 giai đoạn, có vẽ ảnh già rồi mà"
- Q10 page-turn effect: only in the Tuần lục book; no page turn on a portrait phone. Owner: "Lật trang chỉ có ở sổ Tuần lục, điện thoại dọc thì không lật, đúng".
- Q11 head mark: small bob + glow (new) wins over "no glow" (old). Owner: "11 đúng".
- Q12 Dư đồ: always comes from Phượng Lệnh; paint only the missing parts. Owner: "12 đúng".
(Q2, Q3 + maid sleeves, Q5, Q8, Q13 were written into dev/art/FIGURE_GATE.md as canon overwrites.)
