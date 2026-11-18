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
