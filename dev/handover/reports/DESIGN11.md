# DESIGN11 — HH collar + no necklace + fringe ladder + A42 (owner L1411/1412/1413) — depth 8, worker of Foreman C #8
START_CTX ~5 %; finished well under the roll line (no handover needed). 0 gens, prompts only. Builder NOT edited.

## New files (dev/art/thu_comoi/, each with .keep sidecar)
- s62_t8_THU_COMOI_v4.txt (9974 ch), m02_t8_THU_COMOI_v4.txt (9963) — base *_t8_THU_COMOI_v2
- s62_t7_THU_COMOI_nn.txt (9918), m02_t7_THU_builder_nn.txt (9798) — base s62_t7_THU_COMOI / m02_t7_THU_builder

## t8 new collar sentence (verbatim)
a jewelled cloud collar of two tiers of scalloped cloud-shaped lobes with wavy edges over the shoulders (upper tier smaller), edged with pearls and gold, light and flat, not bigger than the Hoàng quý phi's, only a little richer (denser gold embroidery and a few more pearls), with the LONGEST fringe: airy pearl-and-gold tassel drops hanging straight down from both lobe tiers, never puffed, never bulky, OPEN at the front (its lobes resting on the shoulders and back, never covering the neck or the square inner neckline),
(removed: 'cloud-collar cape', 'the SAME size and light flat shape as the Hoàng quý phi's', 'never long or layered fringes')

## t7 changes
- (b) removed 'a layered pearl-and-gold necklace,' from HQP LUXURY (crown/pearls/belt untouched)
- (c) after 'a jewelled cloud-collar cape edged with pearls and gold over the shoulders,' added: 'with a fringe of pearl-and-gold drops hanging straight down from its lobe edges, clearly longer than the Quý phi's,'

## (d) A42 all 4 files, after 'showing her neck and collarbones,'
'the low square neckline shows a soft, natural hint of cleavage, tasteful and elegant,'

## Boilerplate trimmed to stay ≤ 10 000 (t8 only, in .keep allow lines)
s62 t8: duplicate 'Full-body standing figure head to feet, centered, plain light parchment background, soft even light;' (same as sentence 4); both t8: 'face clearly visible, 3/4 or frontal view.' (dup of 'The whole face clearly visible'), 'Everyone beautiful at every age.'

## Gates
- keep_check --sidecar: PASS ×4.
- check_store --scope tp8/tp7 --age a18, FAIL set vs base: t8 s62 unchanged (S19 only, as base), t8 m02 unchanged (PASS).
- t7 *_nn: ONE NEW FAIL each: 'S14 REWRITTEN: HOÀNG QUÝ PHI LUXURY t7 (78 %)' — the approved S14 text itself contains 'a layered pearl-and-gold necklace'. Unavoidable under A41; FOREMAN: S14 in check_store APPROVED must drop the necklace (with B26FAB4 builder change). Other t7 s62 FAILs (E1, G23, S19) = same as base.

## Necklace-like items left in place (list only, owner to decide)
- t8 s62+m02 (outfit sentence): 'many long strands of pearls and jade across the chest' — on the m02 sheet HH t8 these read as long necklace strands.
- t7 s62+m02 (outfit sentence): 'strands of pearls across the chest'.
- crowns (not necklace, listed for completeness): t8 'a large central gold phoenix holding a pearl string in its beak'; t7 'with pearl strands' on the crown.

## Job 2 — owner Lượt 1415: HH luxury = t7 HQP LUXURY copied, not richer (no necklace)
- New: dev/art/thu_comoi/{s62,m02}_t8_THU_COMOI_v5.txt (+.keep, base v4). 9923 / 9912 chars.
- Added (verbatim, placed before 'HELD ITEM COLOUR:'): "HOÀNG HẬU LUXURY: more jewels on the phoenix crown (rubies, sapphires, pearls and jade), pearl and jade trims along the cloud-collar edges, and long jade-and-gold belt pendants with pearl tassels;"
- Not copied from S14: 'richer than every lower rank', 'a layered pearl-and-gold necklace' (A41), 'still clearly simpler and less golden than the Empress'.
- Trimmed for ≤ 10 000 (allow lines): duplicate 'her head turns together … never in profile.', 'gentle expression … mouth never open;', 'beautiful/handsome romantic-lead looks for everyone;'. (First try trimmed the forehead + item-contrast sentences → new FAIL S16/S34, so those were restored.)
- keep_check PASS ×2; check_store tp8 a18: no new FAIL vs v4 (m02 0 FAIL; s62 S19 no longer fires → 0 FAIL).

## FIX to Job 2 (v5) — my earlier v5 gate check was WRONG
v5 had cut 'gentle expression … mouth never open;' = approved S18 → new FAIL S18 on both v5 (I misread my own diff). Fixed in place: sentence restored; to stay ≤ 10 000 the luxury label 'HOÀNG HẬU LUXURY: ' dropped (s62 also 'the phoenix crown'→'the crown', 'along the'→'on the'). Now: s62 v5 9999 ch, FAIL = S19 only (= v4); m02 v5 9999 ch, 0 FAIL. keep PASS. Luxury sentence now: m02 "More jewels on the phoenix crown (rubies, sapphires, pearls and jade), pearl and jade trims along the cloud-collar edges, and long jade-and-gold belt pendants with pearl tassels;" / s62 "More jewels on the crown (rubies, sapphires, pearls and jade), pearl and jade trims on the cloud-collar edges, and long jade-and-gold belt pendants with pearl tassels;"

## Job 3 — ĐÔNG = current outfit (owner L1421, brief dong-hientai-L1421.md), 0 gens
Files: dev/art/dong_hientai/{s62_t4..t8, m02_t7, m02_t8}_DONG_HIENTAI.txt + .keep (bases as brief; t8 base = fixed v5). Script: one-off, changes only:
1. Neckline: inner top square neckline → "a fitted <sec> INNER robe with a CLOSED crossed wrap collar (right over left) covering her neck base and chest, that crossed collar edged by <same rank edge>" (t4/t6 short form "… inner robe with a CLOSED crossed wrap collar … chest, edged by …"); 'neck and collarbones visible/showing' + A42 cleavage clause out; 'NO crossed wrap collar' → 'never an open or low neckline'; 'framing the bordered square neckline' → '… crossed collar'; cape/cloud-collar '(never covering the neck or the square inner neckline)' → '… the crossed inner collar'. Outer robe, capes, cloud collars, fringes, jewellery, headdress verbatim.
2. Fur: approved W02 (t4–t6) / W03 (t7–t8) verbatim, before 'Pose:'.
3. Fabric G28 t4–t6: PHI BẠCH sheer shawl → approved W05 (opaque) with mint mist / ice blue; t5 'a sheer silk shawl' → 'a soft opaque silk shawl'. t7/t8 fabric unchanged.
4. Colours: s62 root season = đông → her đông palette IS ice blue #71B5D7 / mint mist (unchanged). m02 đông = sky blue #97C9D4 / cool rose pink #CE8AA7 replaces moss green #A8C379 / coral rose #CF8377 everywhere. Royal yellow unchanged. Caption 'Mùa Thu' → 'Mùa Đông', '+ cổ mở' → '+ cổ chéo kín + viền lông' (m02 files have no caption).
5. A41: t6 'gold-and-jade necklace and bracelets' → 'gold-and-jade bracelets'.
Gates: keep_check --sidecar PASS ×7, --all PASS (92). check_store (tp4..tp8, a18): NO new FAIL vs base except **LEN TOO LONG** on 6/7 (t4 10322, t5 10236, t6 10346, s62 t7 10306, s62 t8 10387, m02 t8 10370; m02 t7 9996 after trimming 3 dup boilerplate sentences). Cause: the approved fur sentence (≈410–470 ch) on bases already ~9 900–10 000; every remaining short sentence is approved/master (cutting one = new FAIL). Per G30 the season tests are run by the owner in ChatGPT (no Magnific), where 10 000 does not apply — FOREMAN decide: OK as is for ChatGPT, or tell me which outfit words may go.
Counter word diff (− / + main words): t4–t6 −square, sheer, gauze, veil, visible (+necklace t6) / +crossed collar, fur words, opaque; t7/t8 −square ×5, neckline ×3, tube-top, bodice, cleavage / +crossed ×3, collar ×4, fur words; m02 also −moss green ×5, coral ×3–4 / +sky blue ×5, cool rose pink ×3–4.
Necklace-like still present (unchanged, listed before): 'strands of pearls across the chest' (t6 'a few', t7), t8 'many long strands of pearls and jade across the chest'.
Context: ~45 % now; no further jobs fit before my roll line — #9 should give new jobs to a new worker.
