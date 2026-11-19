# F1 — NEW FACES: Lạnh lùng +5 (s46–s50), then Kiêu kỳ +5 (s51–s55), then Quyến rũ +6 (s56–s61) (owner Lượt 760/761/763) — Foreman C ROOT-57
PRIORITY #1 CHECK: latest face recipe = dev/art/face-common/make_sacsao_L737.py (NF4 method via make_nf4.py, v5 blocks TYPES_v5.md, EYES_STRAIGHT, closed-mouth sentence, no "phoenix" words); approved Lạnh lùng people s-ids in OWNER_GROUPS_L686.json + their sNN.v5.FULL.txt; sheets new-faces-v4/*.jpg; face tick page FACE_CUTS_L703.json / FACE_MAP_L703.json. ROOT-56's Lạnh lùng +5 subagent left NOTHING (no s46+ files) → start fresh.
READ: dev/rules START_CORE + START_WORKER + START_ART; dev/art/ART_RULES.md (A1 A11 A17 A21 A22 A23 B6 B18 B21 B25 D-rows, E-rows); dev/art/face-common/NF4.md if present + dev/handover/reports for NF4.

## Owner words
Lượt 760/761: the game has 86 women → 86 consort faces; 70 approved → 16 more split Lạnh lùng +5, Kiêu kỳ +5, Quyến rũ +6, one group sheet at a time → owner OK (A23) → next group. Colours from the season palette (her own 4-season set; draw with her ROOT pair) in the Xuân/Hạ tone, drawn with the v5 recipe (thướt tha fabric sentence).
Lượt 763 order of work: (1) palette for 86 (worker P1), (2) MASTER block + face gate (worker MG1), (3) the new faces.

## Steps
1. NOW (no gens): write dev/art/face-common/make_lanhlung_L761.py copying make_sacsao_L737.py's method, but Lạnh lùng v5 block (as the approved Lạnh lùng s-people). 5 clearly DIFFERENT people (face swaps, hair, outfit layers, item, angle, weight-on-one-leg pose), each different from all 10 approved Lạnh lùng faces and from each other (no near-twins; s43≈s45 was a past fault). Colours = placeholders {ROOT_MAIN}/{ROOT_SEC}.
2. WAIT for "P1 NEW16 READY" (palettes_season.json s46–s50 root pair) AND "MG1 FACE READY" (MASTER block in the face makers + check_store --scope face). The foreman forwards both. Then fill colours (name + hex from her ROOT season), rebuild prompts through the builder (B6, stdout only), check_store --scope face PASS, ledger lines.
3. Gens: Magnific gpt-2-6, same settings/refs as L737. If your gen is refused by the permission check, STOP and send the foreman the exact prompts + refs (he runs them). Look at every picture full size (eyes, teeth, hands, colour = her pair); fix ~1-gen faults yourself (A21), max 6 tries.
4. Sheet dev/handover/review-sheets/new-faces-v4/lanhlung_L761.jpg (5 new + the 10 approved Lạnh lùng small for comparison, id labels) + cut ids; face crops into face_page assets like NF4.
5. Report dev/handover/reports/F1-newfaces.md; commit to claude/cung-tuong-mong-handover-hj0h8w; send_message Foreman C ROOT-57 session_01PEhRbuFkLEFvsv8jdPo9vC "F1 LANHLUNG READY <hash> <sheet>". Then WAIT for the foreman's GO before Kiêu kỳ (A23). Meanwhile you may prepare make_kieuky_L761.py / make_quyenru_L761.py prompts (no gens).
ROLLOVER at START_CTX + 25 % (ceiling 60 %): handover in your report, tell the foreman; the foreman opens your successor.
