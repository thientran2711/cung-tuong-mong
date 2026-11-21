# DESIGN20 — thu s62 t4 Tần v5 (G40/G42/G44/G45), owner L1623/L1624 via Foreman C #15
depth 6 (child of Foreman C #15) · START_CTX ≈ 4 % (est; get_session used_tokens reads 0) · 0 gens, 0 cr.

## JOB 1 — thu s62 t4 Tần v5 prompt
Builder (L1567, never hand-edited): dev/art/thu_comoi/make_s62_t4_thu.py → **dev/art/thu_comoi/s62_t4_THU_COMOIe.txt (9 989 chars)**.
Base = thu_comoi/s62_t4_THU_COMOIc.txt (production t4, CHECK1 PASS; same chain as KHO2 t5 COMOId). Palette unchanged = t1–t3 v5 (light plum #DF9ED9 + blush).
Changes (A39, only these):
1. G40: master_common.OUTER_IN after "outer robe worn OPEN at the front … ;" (same placement as LADDER1 COMOId).
2. G42 (carry t3 v5 placements up, a bit denser):
   - density: "a few LARGE embroidered lotus flowers on the robe (fewer than Phi)" + " among many small lotus flowers over the robe and skirt" (t3 v5 has "many small … over the robe and skirt"; t4 keeps its LARGE flowers on top = denser).
   - inner top: "(the Tần edge)" + ", the inner top also richly embroidered across the chest" (t3: "also embroidered", t5: "also richly").
   - front edges: "(a slim gold edge)" → "(an embroidered blush lotus band down past the waist)" (t3 v5 words + lotus).
   - sleeves: "long trailing wide sleeves" + " with a few small lotus flowers on them" (cuffs already = "WIDE gold-thread embroidered borders of lotus flowers at sleeves and hem").
3. G44 + G45 + G42 jade: "an embroidered silk sash with jade belt pendants and tassels" → "an embroidered silk sash tied flat at the CENTRE front, NO bow, with a carved jade pendant set (ngọc bội) and tassels in front, never covered by sleeve or shawl".
4. Caption: "… Tần · Áo choàng nhỏ + cổ mở · v5".
Tần capelet clause (B, owner liked) byte-identical. Pose (white-jade vase in one hand) unchanged — a hand in front is OK by G45.
A38 trims (make_thu_L1574.fit, same list as LADDER1/KHO2; store sentence "Everyone beautiful…" never trimmed): "; face clearly visible, 3/4 or frontal view." · ", never a pair" · ", no cluster" · ", never in profile" · the "her signature colour family … all-gold robe" colour-repeat sentence. Tried + rejected (gate FAIL): dropping "The item is in a contrasting colour…" (S16), "Every hairpin is inserted…" (S24), "NOTHING on the forehead…" (S34). My own additions were shortened instead (first draft 10 188).

## Gates
- check_store --scope tp4 --age a22: APPROVED + STORE CHECK PASS.
- check_store s62 v0 --low 4: only the Outfit store sentence [0.70] = the same accepted exemption as COMOIc ([0.69], G38/L1377 COMOI neckline).
- keep_check --sidecar PASS (base COMOIc, 9 allow lines); keep_check --all 274 PASS.

## Open notes
- t3 v5 also has TWO apron panels + long jade pendant sets on the girdle; not in the G42 list → not carried to t4 (owner/foreman call).
- "gold-brocade band (the Tần edge)" next to fabric "NOT brocade" (CHECK1 old minor note) unchanged.
- Margin: 1 char under the 9 990 builder LIMIT, 11 under the gate 10 000.

## JOB 2 — t4 + t5 v6 (owner L1625/L1626/L1627/L1628 via Foreman C #15) — 0 gens. SUPERSEDES t4 COMOIe for the draft.
Shared G40 strong clause (agreed/proposed to LADDER2): **master_common.OUTER_TIED** (209 ch; OUTER_IN kept unchanged for old builders):
"the outer robe HELD IN by the sash tied OVER it: its front edges meet at the waist under the sash, which wraps over BOTH layers, so the robe is closed and fitted at the waist, never a loose open coat or jacket"
Source: t8-prompt-B/build.py **CAPE5_V4** = build.py Tần capelet words verbatim ("a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest, a jade clasp at the throat"+TAN_CAPE_PEARLS+"; no cloud collar, vest or stiff shoulder pieces") + **CAPE5_V4_EXTRA** "; PLUS ONE extra small layer: on top of EACH shoulder (both sides) a small SOFT round embroidered silk layer lying over the capelet, clearly visible, also edged with sparse pearls and a short pearl tassel fringe". t5 low_outfit now uses CAPE5_V4 (CAPE5_V3 kept for the record). Proof: build.py s62 v0 --low 4 / --low 6 byte-identical before/after; --low 5 tp5 fail count 11 before = 11 after (raw store output, not a final prompt).
- **t4 v6 = dev/art/thu_comoi/s62_t4_THU_COMOIf.txt (9 972)**, builder make_s62_t4_thu.py (V6 stage, base COMOIe). Capelet + chest cord + jade clasp KEPT verbatim (L1626 a). Changes: OUTER_IN→OUTER_TIED; "+ a wide embroidered lotus band at the inner robe's hem too" (L1626 d); neckline "a richer gold-brocade band" → "a wide blush band embroidered with lotus flowers running straight ACROSS the chest (the Tần edge), small lotus flowers embroidered below it" (L1628); front edges → "(each a long vertical blush panel of lotus embroidery from shoulder to hem)" (L1626 c); caption "Mùa Thu · Tần · v6". A38 repeat trims: the "Hair: her own hair colour, … rich like her rank." sentence (= HAIR FLOWER SIZE + hairpin sentences) and "(her secondary colour, clearly different from …)" in PHI BẠCH (= TWO-COLOUR RULE). Tried + rejected: ANGLE tail trim (E1 FAIL).
- **t5 v6 = dev/art/thu_comoi/s62_t5_THU_COMOIe.txt (9 980)**, builder make_s62_t5_thu_v6.py (base COMOId). Cape = the t4 COMOIf capelet text cut verbatim ("a short round … stiff shoulder pieces", i.e. the thu open-front form with cord + jade clasp) + CAPE5_V4_EXTRA. OUTER_TIED; neckline "edged by a wide blush band richly embroidered with double hollyhocks running straight ACROSS the chest (the Phi edge), many small double hollyhocks embroidered below it"; front edges "(each a long vertical gold-edged blush panel of double hollyhock embroidery from shoulder to hem)"; "+ many small double hollyhocks over the robe and skirt, WIDE embroidered double hollyhock hem bands on the outer and the inner robe"; girdle "tied flat at the CENTRE front, NO bow, with two long carved jade pendant sets (ngọc bội) and tassels in front, never covered by sleeve or shawl" (G44/G45); caption "Mùa Thu · Phi · v6"; same 2 A38 repeat trims. Dropped with the old cape: "each cape richly embroidered in gold thread with small double hollyhocks" (owner: Tần words verbatim).
- Gates both: check_store --scope tp4/tp5 --age a22 PASS; s62 v0 --low 4/5 only the Outfit store sentence ([0.70]/[0.73], same exemption as COMOIc). keep_check sidecars PASS (allow lines with reasons); --all 276 PASS.
- Pose t5 unchanged (letter held in both hands — G45 allows hands/held items in front; POSEFIX1 owns poses).

### G42/G47 checklist t1→t8 (thu s62, current files; Y = words present)
| tier | file | neck band embroidered | chest embr. | front edges | outer hem | inner hem | sleeve/cuff | jade pendant | G40 strong | bow |
|---|---|---|---|---|---|---|---|---|---|---|
| t1 | dapung4/s62_t1_COMOI_v5 | Y (lilac band) | **–** | narrow band to past waist | Y | **–** | Y | Y | **–** (OUTER_IN) | – (sash) |
| t2 | dapung4/s62_t2_COMOI_v5 | Y | Y | narrow band to past waist | Y | **–** | Y | Y | **–** | – |
| t3 | dapung4/s62_t3_COMOI_v5 | Y | Y | band to past waist | Y | **–** | Y | Y (2 sets) | **–** | – (girdle) |
| t4 | thu_comoi/s62_t4_THU_COMOIf | Y | Y | long vertical panel shoulder→hem | Y | Y | Y | Y | Y | NO bow, centre |
| t5 | thu_comoi/s62_t5_THU_COMOIe | Y | Y | long vertical panel shoulder→hem | Y | Y | Y | Y (2 sets) | Y | NO bow, centre |
| t6 | thu_comoi/s62_t6_THU_COMOIe | **– (pearl-edged gold band)** | Y? | **slim pearl-edged** | Y | **–** | Y | **– (jade drops only)** | **–** | – |
| t7 | thu_comoi/s62_t7_THU_COMOI_v8d | **– (brocade band)** | Y? | **slim gold-and-pearl** | Y | **–** | Y | **– (jade belt)** | **–** | – |
| t8 | thu_comoi/s62_t8_THU_COMOI_v10c | **– (brocade band)** | Y? | **slim gold-and-pearl** | Y | **–** | Y | **– (jade belt)** | **–** | – |
Gaps for LADDER2 (t6–t8 + t1–t3 check): t1 chest embroidery; t1–t3 inner hem band + OUTER_TIED; t6–t8 neck band embroidered, long vertical front panels, inner hem, jade pendant set (ngọc bội), OUTER_TIED (t7/t8 keep own embroidery per L1627 but still need the G42 placements). Ladder note: t1–t3 front edges stop "past the waist"; t4/t5 now run shoulder→hem (owner L1626 'mảng dài dọc xuống') → t1–t3 may need the same for G42 consistency (owner call).

## HANDOVER (DESIGN20)
depth 6 · START_CTX ≈ 4 % · now ≈ 24 % (est.) → roll line 29 %: near it. All work pushed; open = CHECK1 verdict on t4 COMOIf + t5 COMOIe → GEN1 2×55 cr. Coordinator Foreman C #15 (session_01D3E3NajnDsKk2KkQgXnroZ) opens the successor if more prompt work comes.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS.
Pointers: t4 builder thu_comoi/make_s62_t4_thu.py (COMOIe + V6→COMOIf); t5 builder thu_comoi/make_s62_t5_thu_v6.py (reads t4 COMOIf capelet + build.py CAPE5_V4_EXTRA → rerun after t4 changes); G40 = master_common.OUTER_TIED; both at ~9 975 / 9 990.

## JOB 3 — t4 + t5 v7 (Foreman C #15 01:39Z: YES carry t3's two apron panels + long jade sets up, G47; CHECK1: name the outer hem, cord across the chest with the jade in the middle, G46) — 0 gens
Correction to the handover above: the context window is 1M → I was ≈15 %, not 24 %; continued.
- **t4 v7 = dev/art/thu_comoi/s62_t4_THU_COMOIg.txt (9 981)** (make_s62_t4_thu.py V7 stage, base COMOIf): capelet "loosely linked low on the chest by a small jade clasp on a short silk cord" → "loosely linked across the chest by a silk cord with a jade clasp in the middle"; "borders … at sleeves and hem" → "at sleeves and outer hem"; sash "… NO bow, with TWO embroidered blush APRON PANELS (lotus, gold-braid edge) side by side to the ankles, a long jade pendant set (ngọc bội) of jade plaques on pearl strings with tassels at each outer side, never covered by sleeve or shawl"; caption "Mùa Thu · Tần · v7".
- **t5 v7 = dev/art/thu_comoi/s62_t5_THU_COMOIf.txt (9 981)** (make_s62_t5_thu_v6.py --v7, capelet copied from t4 COMOIg): girdle "… NO bow, with TWO embroidered blush APRON PANELS (double hollyhocks, gold-braid edge) side by side to the ankles, a long jade pendant set (ngọc bội) of jade plaques on pearl strings with tassels at each outer side, never covered by sleeve or shawl, the skirt embroidered with large double hollyhock medallions"; own v6 words compacted (front panels "of double hollyhocks, shoulder to hem", "small double hollyhocks below it", "hem bands on outer and inner robe"); caption "Mùa Thu · Phi · v7".
- Length (Foreman 01:47Z decision, NOT the S12 shawl words, NOT dropping the shawl): A capelet "(never hiding the neck or the square inner neckline)" · D t4 "neck and collarbones visible;" (t5 has none) · C pose tail (t4 ", skirt swirling, the robe hem stirring slightly"; t5 ", the robe hem stirring slightly") + own words compacted.
- Gates: tp4/tp5 a22 PASS; s62 v0 --low 4/5 only the Outfit sentence [0.70]/[0.73] (COMOIc exemption); keep sidecars PASS (base = v6 files), --all 278 PASS. v6 outputs byte-identical after the builder edits.
- Checklist row update: t4 + t5 now also have apron panels ×2 + jade sets at both sides (= t3 v5), cord across the chest with jade in the middle.

## JOB 4 — t4 + t5 v8 (Foreman C #15 01:51Z after v6 drafts both_L1638: G40 still an open coat; t4 vase banned L1438) — 0 gens
GEN1 told to HOLD v7 (COMOIg/COMOIf). New shared clause **master_common.OUTER_WRAP** (226 ch; OUTER_IN/OUTER_TIED kept):
"the outer robe is a WRAP robe HELD IN by the sash: its front edges overlap at the waist, bound CLOSED under the sash lying ON TOP of it, outer robe fabric on both sides of the waist above and below the sash, never an open coat"
- thu t1–t3 v5 checked as the foreman asked: they only have OUTER_IN (same short clause), nothing extra to copy → wrap wording written new.
- "outer robe worn OPEN at the front," → "outer robe open above the waist," (t4 + t5).
- t4 item: "a small white-jade vase with blossoms" → "a small white-jade lotus lamp" (owner L1438, B26FAB4 rank-4 replacement list).
- t5 own-words compaction: "the skirt embroidered with large double hollyhock medallions" → "large double hollyhock medallions on the skirt".
- Files: **t4 v8 = thu_comoi/s62_t4_THU_COMOIh.txt (9 988)** (make_s62_t4_thu.py V8 stage) · **t5 v8 = thu_comoi/s62_t5_THU_COMOIg.txt (9 982)** (make_s62_t5_thu_v6.py --v8). Earlier outputs rebuild byte-identical.
- Gates: tp4/tp5 a22 PASS; store only the Outfit exemption [0.70]/[0.73]; keep sidecars PASS, --all 280 PASS.
- CONFLICT (not changed, A18/A39): approved S13 (t4 CAPELET CUT, gated) says "the outer robe closes only at the sash … opening gradually in a long soft V toward the hem" — so the outer robe parts again BELOW the sash; removing it = S13 FAIL. OUTER_WRAP therefore says "outer robe fabric on both sides of the waist above and below the sash", not "closed to the hem". If the owner wants it closed down to the hem, S13 needs her update.

## JOB 5 — t5 v9 (Foreman C #15 01:58Z: v8 draft = two hollyhocks in the hair + jade drop earrings) — 0 gens. Coordinator now Foreman C #16 (session_01D3E3NYgpZzskYx2Nvem9yW).
**t5 v9 = dev/art/thu_comoi/s62_t5_THU_COMOIh.txt (9 975)** (make_s62_t5_thu_v6.py --v9, base COMOIg):
- hair flower: "(never two)" → "(never two, never a pair, no cluster)" (words of the A38 trim list put back).
- earrings: "a LARGER gold headdress with dangling gold tassels and jade pins" + " on the bun, none at the ears" (master EAR_SENT "Bare earlobes, no earrings." already present).
- length: ", framing the bordered square neckline" (A38 repeat, gate-free) · "gold-edged " dropped from the front panels · "many small double hollyhocks over the robe and skirt" → "many small ones over the robe and skirt".
- Gates: tp5 a22 PASS; store only the Outfit exemption [0.73]; keep sidecar PASS, --all 290 PASS. Older t5 outputs rebuild byte-identical. t4 v8 COMOIh unchanged.

## JOB 6 — t4 v9 + source check (Foreman C #16 01:59Z: same hair-flower/earring fix on all tiers that can have it) — 0 gens
- SOURCE: store-all/build_all.py _F13 already = "exactly ONE fresh flower in her hair (never two, never a pair, no cluster)"; the words were lost only through the thu A38 trim list dapung4/make_thu_L1574.TRIM (", never a pair", ", no cluster"), used by every thu builder. Earrings: master EAR_SENT "Bare earlobes, no earrings." is in every prompt; the risk is dangling hair ornaments (bu yao / tassels / jade pins) drawn at the ears.
- Not changed: the TRIM list itself (removing entries would make other builders' existing outputs fail length on rerun) → rule for every thu tier builder: do not use those two trims; add "… in the bun, none at the ears" to the dangling hair-ornament phrase. Sent to LADDER2 for t1–t3 + t6–t8.
- **t4 v9 = dev/art/thu_comoi/s62_t4_THU_COMOIi.txt (9 989)** (make_s62_t4_thu.py V9): "(never two)" → "(never two, never a pair)"; "gold and jade hairpins with small dangling gold bu yao tassels" + " in the bun, none at the ears"; length: own words compacted (front panels "of lotus, shoulder to hem", "an embroidered lotus band at the inner robe hem", "of jade plaques, pearl strings and tassels") + boilerplate "a NEW outfit, " (store Outfit sentence already the exemption, still 0.70).
- t5 v9 = COMOIh (JOB 5) unchanged; its capelet is still read from t4 COMOIh (same capelet text as COMOIi).
- Gates t4 v9: tp4 a22 PASS; store only the Outfit exemption [0.70]; keep sidecar PASS.
- JOB 6b (Foreman C #16 02:01Z, CHECK1 job 15): t4 COMOIi rebuilt in place (not drawn yet): front edges "(each a long vertical lotus-embroidered blush panel, shoulder to hem)" ("embroidered" back); room from own words: "sleeves with small lotus flowers on them" (was "a few small"), item "a white-jade lotus lamp" (was "a small white-jade"). 9 986 chars; tp4 PASS; store only Outfit exemption [0.69]; keep PASS, --all 303.
