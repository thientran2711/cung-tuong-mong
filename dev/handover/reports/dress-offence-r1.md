# Review r1: dress offences (review/dress-offence f47c7fd3) — PASS 40903f4a3044 (branch review/dress-offence-r1)

Merged onto current origin/main 8d14f6ef (ancestor OK). Small fixes by the reviewer: findings 1-3.

## Findings (fixed on r1)
1. FAIL→fixed: rank allowance was visible. BAL.lux.xx.showBud was true ("Xa xỉ 195 / 188"); the inquiry result text hard-coded "mức của nàng N" regardless of showBud (jdress.js xxAccuse); the tag turned red above the allowance (leaks the threshold). Now showBud=false, result text "(Xa xỉ 195)", tag colour neutral. Item detail already off (BAL.itd.allow=false). Tests 9c/9f assert no "/ M", "mức", "hạn mức" on the card and in proven/waved/false xx + Dò la texts (both fail with showBud=true — verified).
2. FAIL→fixed: dev/test/dress-offence.js was flaky (~40% of runs, also on the original branch): test 5 picked two NPCs of one house (runAct blocks acts inside a house) and 6e used an NPC just punished in 6c ("đang sợ", jemo motive gate). Fixture fixed; 31/31 runs pass. Game rules were right, the test wrong.
3. dress-offence-shots.js landed on cung-nữ lives (no Phi tần tab) → now retries start() until the tab exists.

## Checks
- Two acts (ACT.xx, ACT.vp), ONE score luxOf; numbers in BAL.lux.xx / allow / lv3 / WD, no typed numbers in the acts. OK.
- Two-way incl. NPC↔NPC with same odds oVP/cooldowns: tests 1,3,4,5,6 pass.
- Evidence gate: unseen blocked with LACK reason; same place seen both ways; Dò la both ways; servant dò la reports dress: tests 7,8 pass.
- Person card = 7 kit item cells (6 slots + pet), red "Vượt phẩm" tag only when seen, "Xa xỉ N" total only: Fold 755x1000 and iPad 1180x820 shots viewed, no horizontal overflow, 0 page errors. Cosmetic: in a 52 px cell the corner tag wraps to 2 lines over the picture (kit part kitItem, outside this branch).
- dress-offence.js ALL PASS; old save (main build → merged build, 12 weeks) ok; coop-e2e 59/59; kit-conform same non-conforming set as origin/main (place cards MISSING vary by seed on both); 0 page errors.

## FLAG: would a player ever see it? Bot, lavish player (3 most lavish within-rank pieces), 10 lives x 24 months, seed 7, per 100 days
| difficulty | xx NPC→her | vp NPC→her | NPC menus offering xx | NPC acts |
| Dễ  | 0 | 0.12 (0.07 proven, 0.05 waved) | 0.31 | 5.8 |
| Vừa | 0.09 (0.07 proven, 0.02 waved) | 0.13 | 0.63 | 11.9 |
| Khó | 0.07 (0.03 proven, 0.04 waved) | 0.15 | 1.01 | 10.4 |
xx at a lavish player ≈ once per 3–4 years on Vừa/Khó, never seen on Dễ; vp ≈ once per 2 years. She will rarely be accused; her own accusations are the main use. Drivers: (a) gate hostility ≥ hostMin 50 or ghen ≥ ghenMin 70; (b) weight (.4 + hostility/100 + ghen/150) × persW(v,"vp"), competing with every other scheme; (c) cooldowns cdA 48 / cdT 72 weeks (one target at most once per ~1.4 years); (d) j95/jemo motive gate (a frightened NPC won't act) and a sighting is required. Menus offer xx 0.3–1.0 per 100 days but only ~10% reach an act. If the owner wants it more visible: cdT 72→36, or lower hostMin/ghenMin (not changed: BAL numbers are the owner's call).
