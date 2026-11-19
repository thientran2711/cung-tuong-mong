# NỮ ĐẾ MASS — owner Lượt 713 (19/11 ~21:58Z), GO
⚠ OWNER Lượt 724 OVERRIDES the split below: ONE PERSON AT A TIME (all 5 ages) → owner OK → next person. No parallel groups.
Owner (verbatim gist): "Nữ đế là tiến hành vẽ hàng loạt nữ đế, những gương mặt tôi đã duyệt. Làm ơn đưa đúng form nữ đế này cho tất cả các thợ, vẽ cho đúng."
FORM = Nữ đế m05 ROUND 4 (NDX4, commit d7a41e3be, sheet dev/handover/review-sheets/nu-de-B/nudeB_m05_r3_vs_r4_crown_colour.jpg, sent as Lượt 711):
- prompt maker dev/art/nude-B/mk.py exactly as in d7a41e3be (HH t8 crown sentence with dragon swaps + lưu F7; HH SLEEVE LENGTH + ONE SINGLE SLEEVE LAYER; a51/a65 = a36 COLOUR RULE + swatch line (B23, gate S35/X17); D15 style lock at a51/a65 with the person's OWN a36 Nữ đế cut as image 3; a65 hand warmer "of green jade").
- order per person: a18, a26, a36 FIRST; a36 cut becomes image 3 for a51/a65.
- refs: image 1 = her approved face cut (B8), image 2 = royal swatch TdwDfOyVNR, image 3 (a51/a65 only) = her a36 Nữ đế cut.
- gpt-2-6 1024x2304 2k, prompt = mk.py output verbatim (B6), check_store --scope nude --age aNN PASS before every gen (B3/A19), every gen in gen_ledger.jsonl, look at every picture full size, cut transparent like NDX4.
- Final m05 set (reference for checking, A10 benchmark only): a18 Lw8VXB8swO · a26 cpSkl1a0eP · a36 xSB0XPJjfW · a51 s7IMfxEl8e · a65 Xm9S2dYBfo.
PEOPLE = the owner-approved faces in dev/art/face-common/OWNER_GROUPS_L686.json (NOT Kho; ids + cuts in FACE_CUTS_L703.json / FACE_MAP_L703.json). Exclude until approved: Quyến rũ s16 s33 s35 s36 s38 (being redrawn, Lượt 712), and any id ticked "vẽ lại" on the tick page https://claude.ai/artifact/FQADgRrxsN5ZQphqSQDUsx (ArtifactData list `picks`, redraw:true). c06/c14/c19/c31 v5: sent Lượt 705, no verdict yet → ask the foreman.
OPEN FIX before mass: mk.py reads KC_REFS.json people (m-ids only, m09_ok). c-ids and s-ids need a row (face_words verbatim from their v3/v5 prompt file + cut id) — builder task, gate it.
OPEN (owner asked, Lượt 711, no answer yet): a36/a51/a65 crowns alike; a18–a36 drawn with the OLD HH angle plan (new plan: a18 slight right, a26 3/4 right, a36 frontal). Use the CURRENT builder angles for new people.
Flag (BW6): store build.py --nude3 path still writes darkening text at a51/a65 → do NOT use it; nude-B/mk.py only. m01 old a51/a65 prompt files fail S35/X17 → rebuild with mk.py.
Split: one worker per look group (≈11 people × 5 ages ≈ 55 gens each). Sheet per group (5 ages per person, 3-line tags) → foreman looks full size → owner.
