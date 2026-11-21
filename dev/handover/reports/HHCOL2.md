# HHCOL2 — worker of Foreman C #26 (successor of HHCOL1)
Coordinator from 09:06Z = Foreman C #27 session_01D3E3NaDamfSozkn47q9kMK (#26 rolled over).
depth 8 (limit 8) · START_CTX ~4 % of 1M (used_tokens read 0; own estimate) · roll at 29 %, ceiling 60 %
Job = HHCOL1 HANDOVER 3, owner L1924 (1) + (2). Gens by me: 0.

## (1) THU vân kiên clasp t6/t7/t8 — files ready, sent to VE11 @55×3
Insert (owner L1924, like image 3 kseQCFw16B): "the two fronts joined at the throat by one small horizontal clasp (frog button), split open below it". No necklace (already in prompt). Caption L1903 → L1924.
- t6 dev/art/thu_comoi/s62_t6_THU_vankien2_L1924.txt (9993): after "its front CUT AWAY"; trims (boilerplate, .keep allow): "beautiful/handsome romantic-lead looks for everyone." + "the royal yellow in the robe is exactly that colour." (repeats the swatch sentence).
- t7 …/s62_t7_THU_vankien2_L1924.txt (9996): "CUT AWAY square so the chest…" → "CUT AWAY square, the two fronts joined at the throat by one small horizontal clasp (frog button), so below it the chest and square neckline stay open"; trim "beautiful/handsome…" only (t7 has no second yellow sentence).
- t8 …/s62_t8_THU_vankien2_L1924.txt (9987): as t6.
- Gates: check_store --scope tpN --age a22 PASS ×3; keep_check --sidecar PASS ×3. (Tried trimming the POSE TAIL item line and ", no cup" → approved FAIL, reverted.)

## (2) WINTER t1 Đáp ứng
(a) OLD liked winter t1 = gen **1ldmoUCr4r** (prompt dev/art/winter1/s62_t1_dong.txt, WINTER1 20/11 18:05Z, ice blue + mint mist); sheet dev/handover/review-sheets/winter1/s62_dong_coLong_t1-t8.webp (the sheet she chose at L1803; L1887 "copy byte-for-byte" = that prompt → s62_t1_dong_L1887 Xm9TAynBfo).
(b) dev/art/winter1/s62_t1_dong_L1924.txt (9085) = L1912 + ONE added sentence after GRACE: "CONSORT BEARING (an imperial consort, never a maid or servant): she carries herself upright and dignified, chin level, shoulders relaxed and back, a calm noble poise, her mouth fully closed in a gentle closed-lip smile, no teeth; refined silver hairpins with small pearl dangles befitting a palace consort of Đáp ứng rank." Nothing cut. keep PASS; store FAIL M06/W01/W04 only = same as base L1912 (owner-ordered). HOLD lifted: #26 GO 09:03Z → sent to VE6 session_01D3E3NavF2AADAvmzPDhZC5 @55, sheet 1ldmoUCr4r | rgXHHk0xtc | L1924.

## L1933 (owner via #26 09:04Z) — THU Quý phi LOCKED
- Thu Quý phi t6 = L1893 eIPcGThdqL, prompt dev/art/thu_comoi/s62_t6_THU_vankien2_L1893.txt → frozen copy dev/art/thu_comoi/THU_QP_t6_L1933_FROZEN.txt; rule **G63** added (rule.py add, per #26).
- t6 L1924 clasp CANCELLED (s62_t6_THU_vankien2_L1924.txt = do not draw; #26 told VE11). t7/t8 L1924 clasp continue at VE11.
- Every sheet label names the collar type in Vietnamese (in G63; told VE11/VE6).
- VE11 result: t7 hu2BC0ivqL, t8 Tdwzp62VNR (L1924 clasp), sheet dev/handover/review-sheets/thu_t7_t8_vankien_clasp_L1924.png (VE11 @e779fa2; ids sent to #27).

## #27 09:09Z — t7 hu2BC0ivqL jade pendant + red tassel (G57)
- Looked at hu2BC0ivqL: a red knot + jade disc + long red tassel hang from the held jade flute. Ref kseQCFw16B (collar crop) shows only a throat drop, no flute/tassel → cause = PROMPT WORDS: Pose "a jade flute with gold-filigree bands and gem tassels held low" (+ HELD ITEM COLOUR 'any … tassel on it … different colour' → red). Same words in L1901/L1903 t7. G57 gate regex misses "gem tassels" (only jade discs/tassels/pendant).
- Fix (words only, no gen): dev/art/thu_comoi/s62_t7_THU_vankien2_L1924b.txt (9998): "…bands and gem tassels held low" → "…bands, no tassel or pendant, held low"; caption L1924b, "large" trimmed. store PASS, keep PASS.
- Wider: "gem tassels" is in ~137 t7 prompt files (builder pose for the jade flute, e.g. rank8-t78/*_t7.txt) → foreman call (store/builder + G57 regex).

## OWNER L1952 (via #27 09:20Z)
(1) Winter Đáp ứng t1 L1924 **KLpQriTkqp KEPT** → LOCKED: rule **G64**, frozen copy dev/art/winter1/WINTER_DAPUNG_t1_L1952_FROZEN.txt (= s62_t1_dong_L1924.txt).
(2) Winter t3–t8 = her APPROVED sheet dong8_duyet_L1803_clean.png = the coLong WINTER1 set (20/11 18:05Z; same pictures): t3 jUoam4eLD0, t4 cpSPN2P0eP (s62_t4_dong_noangle), t5 Lw8fhqlswO, t6 1ldmIAjr4r, t7 8aizA8UIrU, t8 KLpI8Vqkqp. New files dev/art/winter1/s62_t{3..8}_dong_L1952.txt (+.keep), ONLY phi bạch removed, nothing added (no thick words):
- t3 (9069): PHI BẠCH sentence + outfit item "a sheer silk shawl" cut.
- t4 (9373, base noangle): PHI BẠCH sentence cut.
- t5 (8247): PHI BẠCH sentence + ", a sheer silk shawl" cut.
- t6 (9323): PHI BẠCH sentence cut + pose "a breeze lifts her long stole" → "…long sleeves" (stole = phi bạch).
- t7 (9260), t8 (9468): the approved prompts had NO phi bạch → byte-identical copies.
- Gates: keep PASS ×6. Store: exactly the same fails as each approved base (t3 M06/W01/W04, t4 M06/W02/S13, t5 M06/W02, t6 W02, t7 S14; t8 PASS) = approved-original waiver.
- Sent VE6 t3–t6 (4 × 55). t7/t8 SKIPPED (#27 09:22Z: no phi bạch, stay as approved 8aizA8UIrU / KLpI8Vqkqp).

## OWNER L1955 (via #27 09:23Z) — thu t7 HQP: sash binds outer robe + not bulky
New dev/art/thu_comoi/s62_t7_THU_vankien2_L1955.txt (9996; base L1924b = clasp + no-tassel kept unchanged):
- "a near-empress ceremonial robe" → "a SLIM, FITTED near-empress robe … never bulky"
- "under the OPEN outer robe, its front edges (slim, pearl-edged) falling from both shoulders" → "under the outer robe, its slim pearl-edged fronts closing below the bust" (the OPEN outer robe = cause of (a) + width)
- "a plain gold belt, floor-length robe" → "the sash tied OVER the outer robe at the waist, closing it, bow centred" (G60)
- trims: "Everyone beautiful at every age." + caption → "Thu · Hoàng quý phi · cổ vuông + vân kiên + khuy cài L1955".
- store PASS, keep PASS. Sent VE11 1 sample @55 + sheet CŨ hu2BC0ivqL | MỚI. t8 waits for owner OK.
- Other bulk words NOT touched (rank/owner law, flag only): SLEEVE LENGTH "very long, very wide sleeves … touch the floor"; FABRIC "thick gold-embroidered brocade"; collar "standing slightly OUT past the shoulders" (collar kept per order).

## OWNER L1965 (via #27 09:30Z)
(1) Winter t2 Thường tại: approved dong8_duyet_L1803 t2 = gen jUoattyLD0, prompt winter1/s62_t2_dong.txt (HAS phi bạch). New dev/art/winter1/s62_t2_dong_L1965.txt (8321): ONLY the PHI BẠCH sentence cut. keep PASS; store fails M06/W01/W04 = same as approved base (waiver). Sent VE6 1 @55 + sheet CŨ jUoattyLD0 | MỚI.
(2) Thu t7 L1955 rgXqyJlxtc sent to owner (outer robe still open below sash, sleeves wide to floor) — no action until she answers.

## OWNER L1971 (via #27 09:42Z)
A1 THU list → dev/handover/reports/THU_8BAC_LIST_L1971.md; VE11 rendering review-sheets/thu_8bac_hientai_L1971.png (0 gens). t1/t2 ids inferred from the L1862/L1864 sheets OK'd at L1869 (asked #27 to confirm).
A2 t7 HQP rebuild → dev/art/thu_comoi/s62_t7_THU_fromQP_L1971.txt (9997; base L1955; store PASS, keep PASS). Garment: "the Quý phi's robe: ONE light olive silk brocade robe over a lilac inner dress, ONLY TWO layers (no extra outer robe), SLIM and fitted …, never bulky"; LAYERED NECKLINE/outer-robe words → the frozen QP square-collar words ("a straight SQUARE collar (no crossed collar): a LOW open square neckline …, framed by a wide flat band in her second colour"); sash → "a yellow sash tied at the waist, closing the robe, bow centred, long ties". vân kiên + clasp + no-tassel flute UNCHANGED. Trims: "An imperial consort.", ", gaze to the viewer". Sent VE11 1 @135 (2k medium) + sheet CŨ rgXqyJlxtc | MỚI.

## HANDOVER (rollover: context ~25 % ≥ START 4 % + ~20 %, rolling early because B+C are large) — 21/11 ~09:55Z
depth 8 · coordinator Foreman C #27 session_01D3E3NaDamfSozkn47q9kMK (it opens my successor). Owner L1971 full text: FOREMAN_C_STATUS.md "#27 ~10:20Z".
OPEN for successor (WORDS ONLY, no gens until she says):
(B) WINTER audit of dong8_duyet_L1803_clean (= coLong set; ids/prompts in section L1952 above; t2 jUoattyLD0 s62_t2_dong.txt):
 - L1961 t4 Tần has SQUARE collar → winter must be crossed collar (cổ chéo, G25). Base used = s62_t4_dong_noangle.txt (my L1952 copy) — check its collar words vs G25 and vs the picture cpSPN2P0eP; fix in s62_t4_dong_L1952 → new _L1971 file.
 - t6 QP vân kiên / shoulder cape BELL-shaped: grep the bell fix (HHCOL1 L1840 "winter t8 red/bell"; rule.py find bell / chuông) and check s62_t6_dong_L1952.txt has it.
 - L1967 t2 (VE6 result of s62_t2_dong_L1965) very different from jUoattyLD0: compare settings (original 2k 1024x2304 vs 1k low), refs (orig nVsrRMPYQD only), and whether s62_t2_dong.txt really = the prompt of jUoattyLD0 (ledger line 3300 "build_all.py s62 2 + G26 fur + G25 collar" — the file may have been rebuilt after the gen; check git log -p of that file vs 20/11 18:05Z).
 - Do the same TRUE-prompt check (git log at gen time) for t3–t8; report causes + fixes to #27.
(C) BOWS: her new rule — every bow in the game has LONG trailing ties, thướt tha. Extend G60 (rule.py set G60 … via #27 OK) + word sweep of live consort files (bow / knot / sash words → "bow centred with long trailing ties, thướt tha"); words only; keep_check sidecars.
Also: L1971 #9 says tassels on held items are fine (revert "G57b" no-tassel; keep ngọc bội ban) — my L1924b/L1955/L1971 t7 still say "no tassel or pendant" on the flute; #27 to decide.
