# DESIGN16 — _cloak9: embroidery restored on Đông t7 HQP / t8 HH (owner L1536 via Foreman C #12)
depth 3 · START_CTX ≈ 3 % (get_session read 0; own estimate) · NO gens · worker of Foreman C #12 (session_01D3E3NaKhsRgpffMmENngac).

## Job
The owner said of the _cloak7 t7/t8 pictures: "the embroidered clothes are stripped down to minimal". _cloak7 (DESIGN13) had cut the robe embroidery down to a border band. _cloak9 = _cloak7 with ONLY two things changed:
1. The embroidery sentence goes back to the store / rule text (_cloak6 = store: I1, I3, G8). t8 HH: large phoenixes on the chest, shoulders and wide sleeves, "richly", plus its rank clause (s62 "finer and richer than any other rank" / m02 "far denser than any other rank"). t7 HQP: the store sentence (phoenixes on the chest and along the borders) + "mid-size" so the HQP phoenixes are smaller than the HH's "large" ones (I1: nobody outshines the rank above). "The phoenix is the main embroidered motif" (t8) and the INNER LAYER EMBROIDERED line (m02) were never cut; they stay.
2. FABRIC per B28 (L1534: Quý phi–HH = the same light gấm in all seasons; HH winter cloak light gấm too): "soft light silk, not brocade," → "light gold-woven gauze over thin supple Song brocade," = the current Hán t7/t8 store wording (seasons4/s62_t7_HAN_BAC.txt, s62_t8_HAN_BAC.txt), word for word.
KEPT byte-identical from _cloak7: "a slim cloak hanging close, never bell-wide," (the bell fix), the smaller collars/fringes (t7 ONE small single-tier collar + tiny pearl edge; t8 "finer than the Hoàng quý phi's" + tiny pearl fringe), fur Lông 2, crown, face, pose, colours. G33 (phoenix plumage palette) is still waiting for the owner, so "kingfisher-blue" stays as in the store.

## Files (dev/art/dong_hientai/, each + .keep with base = the _cloak7 file)
| file | chars (_cloak7 → _cloak9) |
|---|---|
| s62_t7_DONG_HIENTAI_cloak9.txt | 9999 → 9988 |
| m02_t7_DONG_HIENTAI_cloak9.txt | 9951 → 9940 |
| s62_t8_DONG_HIENTAI_cloak9.txt | 9999 → 9986 |
| m02_t8_DONG_HIENTAI_cloak9.txt | 9916 → 9897 |
(keep_check counts; all ≤ 10 000.)

## Word diff _cloak7 → _cloak9 (the ONLY changes)
- s62_t7: "outer" → ""; "plain except small" → "embroidered with mid-size"; "in a border band, ONE small phoenix roundel" → ""; "back, no big motifs," → "chest and along the borders,"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- s62_t8: "outer" → ""; "" → "richly"; "ONLY in a border band along its edges" → "on the chest, shoulders"; "cuffs" → "wide sleeves"; "small" → "large"; "thread, the rest plain, ONE small phoenix roundel on the back, no big motifs," → "thread (finer and richer than any other rank),"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- m02_t7: "outer" → ""; "plain except small" → "embroidered with mid-size"; "in a border band, ONE small phoenix roundel" → ""; "back, no big motifs," → "chest and along the borders,"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- m02_t8: "outer" → ""; "" → "richly"; "ONLY in a border band along its edges" → "on the chest, shoulders"; "cuffs" → "wide sleeves"; "small" → "large"; "thread, the rest plain, ONE small phoenix roundel on the back, no big motifs," → "thread (far denser than any other rank),"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"

## Proof
- keep_check --sidecar ×4 PASS (5 allowed drops each, all the _cloak7 border-band / "soft light silk" words) · keep_check --all: 193 sidecars PASS.
- check_store (args `<p> v0 --tN`): the output for _cloak9 is identical to _cloak7 for all 4 (same FAIL set: s62/m02 t7 5, t8 6 store sentences, all from before; no new FAIL, no LEN).
- "a slim cloak hanging close, never bell-wide," present once in each of the 4.

## Open
- Not tested; the owner decides on a gen (A20/A21).
- Risk to watch: the large all-over HH phoenixes were one cause of "thô" in L1498 (DESIGN13). This time the slim fall + light gấm + small collar stay, so a bell/heavy look should not come back from the shape, but the owner should judge the density.

## Handover
Job done; nothing left open for a successor. ROLLOVER/LINEAGE lines: see START_ART_WORKER.md §6 (unchanged).

## Update: G37 one-tier vân kiên on t8 (owner Lượt 1543, relayed by DESIGN14 / C #12)
Both t8 _cloak9 files (s62 AND m02, so _cloak9 does not undo the m02_t8_cloak8 G37 fix of 379e8b0):
"a SOFT jewelled cloud collar of supple silk in two small tiers of softly scalloped cloud-shaped lobes (upper tier smaller)," → "a moderately firm (never too stiff) jewelled cloud collar of supple silk in ONE small tier of softly scalloped cloud-shaped lobes," (the same wording as m02_t8_cloak8, word for word). .keep got 2 allow lines tagged "# owner Lượt 1543 G37". t7 is already single-tier, so nothing changes there.
Chars now s62_t8 9993 · m02_t8 9904 (keep_check). keep_check --sidecar PASS ×2 · --all 203 PASS · check_store output still identical to _cloak7.
NOTE for C #12: m02_t8 now has two branches, _cloak8 (DESIGN14: G37 only) and _cloak9 (embroidery + light gấm + G37). _cloak9 holds everything in _cloak8, so _cloak9 is the one to use.

---
# JOB L1554 — XUÂN Hán phục t1/t2/t3 for s62 (owner via Foreman C #13) · NO gens
Files: dev/art/seasons4/s62_t1_HAN_BAC.txt (9009 chars) · s62_t2_HAN_BAC.txt (9148) · s62_t3_HAN_BAC.txt (9479), each + .keep (base = s62_t4_HAN_BAC_open5.txt, the Hán set the owner approved "ổn", L1506).
Built by a script from t4 open5: everything else is byte-identical (open-neck opener, style/skin, face, expression, mouth, COLOUR RULE, TWO-COLOUR, HELD ITEM, hairpin, forehead, caption form). Replaced per rank: Outfit, Hair + HAIR law, SLEEVE law, HAIR FLOWER SIZE, ANGLE + GRACE, Pose, fabric, COLLAR CUT ("opening in a V toward the hem" dropped because there is no wrap panel), caption.

## How t1 / t2 / t3 differ (each one step below the t4 Tần: no triple band, no wrap curve, no all-over embroidery, no pearl net, no zupei, no chignon)
| | t1 Đáp ứng | t2 Thường tại | t3 Quý nhân |
|---|---|---|---|
| cut | 2-piece ruqun: short wrapped jacket to the hips + pleated floor skirt, narrow sash | straight-hem zhiju over an inner robe | straight-hem zhiju over an inner robe + G15 girdle, apron panel to the ankles, 2 jade-plaque pendant sets to the knees |
| collar band | ONE narrow PLAIN band | TWO stacked narrow bands (piping + small tiger lilies) | ONE WIDE stiff embroidered band |
| embroidery (G8) | small lilac sprays on the jacket + wide lilac hem band | delicate tiger lilies at the sleeves and hem | wide China-rose bands at the sleeve ends and hem + apron |
| waist | narrow sash | sash + ONE small jade disc | stiff brocade girdle + pendants |
| hair (rank law) | LOOSE, half up, silver pins | LOOSE, silver + pearl pins | LOOSE, pearl-tipped pins |
| flower F2/F4 (s62 n=62) | lilac spray, SMALL | tiger lily, small–medium | semi-double China rose, MEDIUM (palm) |
| sleeves (G5) | to the KNEES (all three) | | |
| angle / pose (store) | frontal, book | frontal mirrored, pellet drum | ¾ right, flute |
All: Hán open collar (G25 spring = open neck), no shawl (G36), no phoenix, fabric = the t1–t3 thin silk M06 sentence + M07 + the store S06 movement sentence.

## Gates
- check_store --scope tpN --age a22: APPROVED + MASTER PASS ×3.
- check_store `s62 v0 --low N` (store part): FAIL, but only on the Tang square-neck outfit sentences (t1/t2: the Outfit sentence and "never a round collar, never a V, NO crossed wrap collar"; t3: the G15 option-B words, which carry the square neckline). These are replaced by nature in the Hán set; the t4 open5 base cannot be store-gated at all (check_store crashes on it). The general store sentences (elegant/slim/adult, romantic-lead looks, kind gentle-hearted girl, S06, "Everyone beautiful at every age") were added so they pass.
- keep_check --sidecar ×3 PASS · --all 215 PASS.

## Flags for C #13 / the owner
1. COLOURS: I used the Hán set's s62 colours (light clear warm plum #DF9ED9 + bright blush pink, the same as t4–t8 Hán). B20 palettes_season_deep.json s62 xuân says soft clear cool peach-blossom pink #EB8186 + ivory white. If the owner wants B20, it is a word swap in the 3 files.
2. FABRIC: B27 says spring should be "slightly heavier", but no t1–t3 heavier cloth has been approved (DESIGN15 proposed "lụa hoa dệt chìm, đục"; B28 says "thin silk like t1–t3"). So I used the current t1–t3 M06 thin silk.
3. NECK: G17/G25 give t1–t3 a SQUARE neck in spring (Tang store). I used the Hán open crossed collar, as the brief asked ("same Hán look / open neck"). If the owner wants the square neck, t3 would then pass G15.

## L1554 REVISION (owner L1555 via C #13: embroidery + fabric per the rules) — supersedes the table above
All three now share ONE cut (G32: t1–t3 almost the same outfit; H12: LONG garments only, so no hip-length jacket for t1 and no apron panel for t3): a floor-length straight-hem zhiju in plum over a blush-pink inner robe, plain sleeve body with embroidered cuff bands (H6 sleeves), Hán open collar, no signature piece, no shawl/phi bạch (G32, G36).
Embroidery (H6 density = the Tần's "densely embroidered ALL OVER" at every rank, motif size rising; G8 extras; G9 stitched sentence unchanged; H12 "clearly more embroidery than any palace maid"):
- t1: "ONE narrow plain bright blush pink collar band … with no embroidery on it (the Đáp ứng edge); the robe body densely embroidered ALL OVER (not only the borders) with many SMALL lilac sprays spread over the whole garment, clearly more embroidery than any palace maid, in bright blush pink and fine gold thread; small sprays of embroidered lilac on the upper body and a wide embroidered lilac hem band;" + narrow sash, no pendants.
- t2: "TWO stacked NARROW collar bands …: a thin bright blush pink piping inside and a narrow band of small embroidered tiger lilies outside (the Thường tại edge); the robe body densely embroidered ALL OVER … with many small tiger lilies, a little larger than at the lowest rank, …; delicate embroidered tiger lilies at the sleeves and hem and a soft silk sash;" + ONE small jade disc.
- t3: "ONE WIDE stiff bright blush pink collar band embroidered with semi-double China roses … (the Quý nhân edge); the robe body densely embroidered ALL OVER … with many small-to-medium semi-double China roses, larger than at the two lower ranks yet smaller than the Tần's, …; wide embroidered semi-double China roses bands at the collar, the sleeve ends and the hem;" + wide stiff silk girdle and 2 jade-plaque pendant sets to the knees (from G15).
Fabric, all three (B27 group A, XUÂN = slightly heavier; DESIGN15 A-NẶNG verbatim) + M07: "The FABRIC is soft, supple OPAQUE patterned silk (lụa hoa) with a faint woven flower pattern and a soft sheen, never see-through, just a little fuller than summer silk yet still thin, light and airy, NOT satin and NOT brocade; long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread. The silk has real weight: …" The store S06 movement sentence stays.
G17 vs G25: both give t1–t3 a SQUARE open neck in spring for the Tang/current design. For the Hán look I kept the Hán open collar (wide off the neck), because G32 says the owner likes "Hán cái cổ áo to" and G25's own t4/t5 "open-neck version" in the Hán set IS this open collar. So G25's open neck is kept and the square cut is not used here. Owner/foreman to confirm.
Chars: t1 9400 · t2 9651 · t3 9805.
GATES:
- keep_check ×3 PASS, --all 215 PASS.
- check_store --scope tpN --age a22: FAIL ×3 on ONE item only, "M06 MASTER MISSING". The master block needs the M06 thin-silk sentence word for word, and A-NẶNG is still a DESIGN15 proposal, not in MASTER_COMMON / master_common.py. So it is "do NOT generate" until the foreman (rule owner) adds an A-xuân fabric form to the master/gate (like winter_g28's M06 đông), or the owner approves A-NẶNG. With M06 in place the same files passed (commit e7e649e).
- Store part (--low N): only the Tang square-neck outfit sentences + M06 (t1/t2) and G15 option B (t3, apron panel dropped per H12).
Flags still open: B20 colours (plum/blush pink vs peach-blossom pink + ivory); H12 vs G15 apron (I followed the later H12).

## L1554 fix 2 (C #13): colours = s62 XUÂN palette; fabric confirmed by B29
- In place, s62_t{1,2,3}_HAN_BAC.txt: "light clear warm plum silk like #DF9ED9" → "peach-blossom pink silk like #EB8186"; "light clear warm plum" → "peach-blossom pink"; "bright blush pink" → "ivory white". Same words as seasons4/s62_t5_xuan_TONG.txt. No other words changed; no plum, blush pink or #DF9ED9 left. (The embroidery thread colour words "in ivory white and fine gold thread" follow the secondary colour.)
- Fabric: A-NẶNG was already in (now owner-approved, B29).
- Chars t1 9340 · t2 9591 · t3 9745. keep_check ×3 PASS (.keep rebuilt), --all 215 PASS.
- GATE still FAILs on one item only: "M06 MASTER MISSING". The master/gate does not know the B29 t1–t3 xuân fabric yet. Foreman: add the A-NẶNG form to master_common/check_store (like winter_g28 for đông) before any gen.

## B29 gate wiring (C #13 order (b)): check_store accepts the owner-approved fabric table
- dev/art/master_common.py: B29_A_LIGHT, B29_A_HEAVY, B29_B_LIGHT, B29_C_GAM (DESIGN15 sentences verbatim); b29_alts(scope, high, doan, winter), b29_alt_in(), b29_store_swap(); check(..., scope=) lets EXACTLY ONE group sentence stand in the fabric slot:
  - t1–t3 / pr1–pr3: A_HEAVY any season; A_LIGHT not in winter (G28 opaque).
  - t4/t5 (doan scopes): B_LIGHT not in winter, DOAN as before.
  - t6+ / royal (high scopes): C_GAM in place of BROCADE (B28: one light gấm, all seasons).
  - Maids: unchanged (M06 / G28 winter form ARE the B29 S sentences).
  The old sentences still pass; nothing else changed. The gate cannot tell xuân from hạ/thu, only winter.
- dev/art/check_store.py: passes scope= to master_common.check; the store part reads the store's fabric sentence as the B29 alternative when the prompt carries it; S07 (brocade registry line) is satisfied by C_GAM in high scopes.
- Regression (scratchpad reg.sh: --scope tpN --age a22 + store args, 119 prompts: seasons4 Hán + xuân, dapung4, winter1/g28, thu_comoi, dong_hientai cloak9): before vs after identical for 116; only my 3 Hán t1–t3 changed, FAIL → PASS (approved + master).
- Synthetic: A_LIGHT tp1 PASS · A_HEAVY tp1 PASS · A_HEAVY winter tp1 PASS · A_LIGHT winter tp1 FAIL · B_LIGHT tp1 FAIL · A_HEAVY tp4 FAIL · A_HEAVY tp6 FAIL · B_LIGHT tp4 (Hán open5) = same fail set as its base (M07, S13, already there) · C_GAM tp6 = same as its base + LEN (the sentence is longer). check_store --self: 2 problems, the same with and without the change (already there).
- Gates now for s62_t{1,2,3}_HAN_BAC: approved + master PASS ×3. Store part (--low N) fails only on the Tang square-neck outfit sentences (t1/t2) and G15 option B (t3), which the Hán cut replaces by nature.

## HANDOVER (DESIGN16 → successor; written at the roll line, JOB L1565 NOT started)
depth 3 · START_CTX ≈ 3 % (get_session read 0 at start; my estimate) · now 30.4 % (get_session 303 654 / 1 000 000) ≥ roll line 28 %. Earlier I told C #13 my roll line was "about 40 %"; that was wrong (I counted from 15 %). The coordinator (Foreman C #13, session_01D3E3NZQZ3tznka9ZppefHM) opens the successor; the worker does not.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS (owner 20/11): never create one.

### Done in this session (all pushed)
- L1536 Đông t7/t8 _cloak9 (embroidery back + light gấm) + G37 one-tier vân kiên on t8: e0b617f, b19845e.
- L1554/L1555 XUÂN Hán t1–t3 s62: dev/art/seasons4/s62_t{1,2,3}_HAN_BAC.txt + .keep: e7e649e → 2de3663 (rank embroidery G8/H6/H12/G32, A-NẶNG fabric) → 9b79ed4 (xuân colours peach-blossom pink #EB8186 + ivory white).
- B29 gate wiring (master_common.py b29_* + check_store.py): 1f30e53; regression of 116/119 prompts unchanged.

### OPEN JOB for the successor: L1565 (C #13 brief, owner on sheet dev/handover/review-sheets/xuan_han_t13_L1564/sheet.jpg — LOOK at it)
Owner words: "cái cổ áo ... nhấn mạnh là nó phải là hở cả vai không? Hở cả vai luôn thì nó hơi lố á, cho nó hở vừa thôi ... vừa ngay cái đầu vai thôi. Còn ở trong á, mình không có đặt một cái áo lót ở trong, cho nên GPT nó sẽ tự nó đặt cái áo lót ở trong ... phải có một cái lớp mình sẽ thiết kế mô tả thêm về cái áo ở trong nó ngang như thế nào, thêu ra làm sao. ... thêu thùa trên cái trang phục. Bạn không hề copy cái mật độ thêu thùa từ cái prompt gốc qua hay sao á, nó thêu kỳ quá."
Make s62_t{1,2,3}_HAN_BAC_v2.txt (+ .keep base = the current s62_tN_HAN_BAC.txt, keep_check PASS, check_store `--scope tpN --age a22` PASS; run it from the repo ROOT, since check_store calls keep_check with repo-relative paths). NO gens. A39: ONLY these 3 changes:
1. COLLAR: open moderately, the collar edges resting exactly AT the shoulder points (đầu vai), shoulders covered, never off the shoulder or slipping, no deep low V. Today's words (copied from t4 open5) are: first line "OPEN-NECK LOOK: collar wide OFF the neck: bare neck and collarbones." and in the Outfit "the collar is worn OPEN, pulled wide OFF the neck: its two edges start at the OUTER shoulder points and run straight down to cross only LOW at the sash; …". "OUTER shoulder points" + "cross only LOW at the sash" push it off the shoulders and make a deep V (t3 the worst on the sheet). Compare with the t4 open5 picture level the owner called ỔN.
2. INNER GARMENT: describe the inner robe explicitly (shape of its upper edge in the opening, e.g. a crossed inner collar or a straight horizontal edge; colour ivory white = secondary; a small motif band along its edge, graded by rank). Today the Outfit only says "over an inner robe in ivory white" + "the inner collar lies flat just inside those edges".
3. EMBROIDERY: copy the DENSITY / placement sentences VERBATIM from the base (t4 open5: "the robe body densely embroidered ALL OVER (not only the borders) with many medium-size spring flowers spread over the whole garment, clearly more embroidery than any palace maid (…)") and from the store/approved t1–t3 text (check_store S-sentences, G8, H6). Only the motif (F2: t1 lilac, t2 tiger lily, t3 semi-double China rose) and the size per rank change. My current words "many SMALL lilac sprays spread over the whole garment … in ivory white and fine gold thread" + extra G8 clauses are what the owner called "thêu kỳ quá"; remove the invented wording.
Build tip: my script is in the old scratchpad (gone). Edit with python replace + assert count==1; rebuild .keep with the CUT lines from `keep_check --sidecar`; keep ≤ 10 000 chars (now 9340 / 9591 / 9745).
