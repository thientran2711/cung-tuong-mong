# PR18 — art worker (successor of PR17). depth 6, START_CTX ~5 % (estimate; get_session used_tokens reads 0; window 1 000 000) → roll line ~30 %, ceiling 60 %. Coordinator = Foreman C ROOT-62 session_01PEhRbv1mzNGajBinerKiRq.

## JOB 1 — owner L867 pastel Magnific test (s46–s61)
Prompts: dev/art/face-common/pastel_L867/sNN.pastel.FULL.txt, made by make_pastel_prompts.py (hex map in pastel_hexes.json).
- Base = the prompt of each original gen (s51–s61: current sNN file = Magnific stored prompt; s46/s49/s50: L770 changed the codes in the file AFTER the gen → restored the DRAWN pair from s_root_colours.json root_drawn).
- A17 diff: ONLY the two robe hexes (robe_pastel.py flat-hex form: w = 1, g from the hex; k from the prompt hexes) + a 'deep ' colour word dropped where the lighter hex would fight it (s46 deep blue-violet → blue-violet, s50 deep raspberry → raspberry). s46–s50 files predate the B25 master sentences → master_common.apply + D9 (same as face_gate.final), no other change.
- Gate: every check PASS except B20 ROOT HEX (fails BY DESIGN: any lowered hex is 'not her root pair'). Asked ROOT-62 for the B20 ruling before any gen.
- Cost exact (simulate_cost): 16 × (135 gen + 3 cut-out) = 2 208 cr. Balance 91 606 at 01:5xZ.
| s | MAIN before → pastel | SEC before → pastel |
|---|---|---|
| s46 k=0.55 | cool aquamarine #86CDB9 → #A6DACA | deep blue-violet #5D5894 → #76709E |
| s47 k=0.55 | periwinkle #949BD8 → #B9BDEC | mint #9ACBB7 → #B3D8C8 |
| s48 k=0.55 | soft blush pink #DF9FA8 → #EDBCC2 | aqua celadon #8BC6BE → #ABD6CF |
| s49 k=0.55 | soft burgundy rose #C37986 → #E3A9B1 | pine teal #388581 → #82B7B4 |
| s50 k=0.6 | clear ice blue #A6C9E4 → #B9D4E9 | deep raspberry #A55D7A → #CA8FA5 |
| s51 k=0.55 | cool lilac #CCB0E5 → #DAC5ED | soft pine teal #62AEA9 → #95CBC7 |
| s52 k=0.61 | sky blue #98C8D7 → #AFD4DF | soft coral #D38A7B → #E8AB9F |
| s53 k=0.55 | soft lavender #A893CE → #C8B7E5 | pale mint green #B0DDD0 → #BFE0D6 |
| s54 k=0.55 | carnation pink #E4A1B7 → #EFBCCC | soft sea blue #75A7C3 → #A2C6DB |
| s55 k=0.6 | pink lilac #CEA1BF → #DEBAD2 | soft jade green #9EB28F → #B8C8AC |
| s56 k=0.55 | apricot #D6A585 → #E7C0A8 | lavender violet #A991CA → #C9B6E2 |
| s57 k=0.55 | soft orchid purple #BA8CC4 → #D6B3DD | warm beige cream #E8D3B8 → #E7D7C3 |
| s58 k=0.55 | soft rust red #D28B79 → #EAB2A3 | pale mint green #B0DDD0 → #BFE0D6 |
| s59 k=0.64 | soft apricot #DEAF9B → #E7C0B0 | soft moonlight blue #A4BCD8 → #B8CBE1 |
| s60 k=0.55 | coral pink #D9998C → #EBB9AF | soft sea blue #649AB8 → #9ABFD7 |
| s61 k=0.55 | persimmon #D2906C → #EAB599 | ivory #EDDCC6 → #E9DDCC |
- B20 EXEMPTION (ROOT-62 01:30Z): "B20 OK — for these 16 L867 pastel TEST gens only (owner's explicit order to draw with the lowered codes = the exemption; they replace no game art)". GATE NOTE: every pastel prompt = all checks PASS except B20 ROOT HEX (exempted); ledger lines carry "gate":"PASS except B20 (L867 exemption ROOT-62)".
