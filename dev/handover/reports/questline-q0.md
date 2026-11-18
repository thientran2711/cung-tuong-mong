# questline-q0 (E5, sonnet, docs only)
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1264 | main dev/build/jnroad.js + jnroadm.js (LIVE) | review/* questline-audit b42a7c70 (G6, plan §4 row Q0); grand-endings-design untouched | claims E5 only

## What (branch review/questline-q0, base origin/main 94a93759, commit cfb0e8ab, 1 file: dev/story/ROAD_MAP.md)
- §0 row "NPC roads" overwritten in place: "0 done" -> LIVE on main (jnroad.js women + jnroadm.js men), men "~20 templates" -> "20 templates (§4.10)".
- §4.10 written (before §5): the 20 men templates exactly as `NRM` in dev/build/jnroadm.js, extracted by script (id, title, test stat, 8 chapter titles numbered .4–.11, allied road flag) + who gets a road, engine summary, cast-key legend. Count check: 20 template lines.
- §7 change log: one line.
- Docs only; no code, no images, no tests needed (no game file touched).

## For E1 to fold into GRAND_ENDINGS (branch review/grand-endings-design NOT touched)
§1.5 (file line 41 of dev/design/GRAND_ENDINGS.md r3) — replace the sentence
`**NPC roads (OD:L1243) are not built** (ROAD_MAP §0 "NPC roads 0 done", unit D). So NPC grand endings depend on NPC roads (§7).`
with (same line, canon overwrite):
`**NPC roads (OD:L1243/L1264) are LIVE on main**: jnroad.js (women, one of the 36 roads of the house-rolled origin) and jnroadm.js (20 men templates, ROAD_MAP §4.10). NPC grand endings hook into those roads and their help hồi (§7).`
Same stale idea elsewhere in the file: line 125 ("NPC women draw an identity by the ORIGINS odds (j69 OW69) … NPC roads OD:L1243, unit D") and line 497 step 5 ("NPC parity with NPC roads … unit D") — drop "unit D / not built" wording; the identity-odds conflict (house table vs OW69) is audit D-Q3, not decided here.

## Canon check
FOR MAIN line added in FOREMAN_E_STATUS.md asking Foreman B to canon-check ROAD_MAP §4.10 (branch review/questline-q0).
Note: ROAD_MAP's "live copy" also sits on the handover branch; coordinator syncs main -> handover when Foreman B passes (not done by me).

## HANDOVER
None needed (small task, finished well under the context limit).
