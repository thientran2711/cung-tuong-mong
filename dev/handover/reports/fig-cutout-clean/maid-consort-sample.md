# maid-consort-sample (W10, art lead #7) — SAMPLE ONLY

PRIORITY #1 CHECK: OD owner 17/11 ~19:40Z "bên cung nữ ... lên phi rồi mà vẫn còn giống cung nữ" + 17/11 03:03Z "Đáp ứng vs cung nữ y chang" | main none (prio1.sh: 0 hits) | review/* none | claims none. Ref dev/handover/refs/owner-dapung-vs-maid-same-1117.jpg is NOT on the handover branch (git ls-tree: no match; main not searched beyond that) — not needed for the sample.

## Finding
- FIGURES-servants.json holds maid rows for tier None/cold/t1..t8 (208 each). In jty.js "ty" = trung y (inner robe, TY_COL ivory..gold), NOT a tier; fig-maid-mNN-tyK files are trung y art.
- Looked at m01,m02,m03,m05,m07,m09 a18 t1/t3/t5 on the CDN: each maid keeps ONE identity colour (sage green, blue, pink, coral...) at every tier; only embroidery/jewellery grows. Consort c01 t1/t3/t5 change colour per rank and have the layered sheer robes. So a promoted maid still reads as the maid uniform (same hue as her cung nữ look).
- Which file the game shows: figFor -> figPick(who) identity -> figBest(L,tier,age) by f.tier; promoted maid uses her maid t-file.

## Sample
https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/maid-consort-sample.jpg (1171x2260). Left = live t1/t3/t5, right = proposal.
6 Magnific gpt-2-6 gens (80 credits each), folder ba4aecfe, refs by creation id: maid base look (magnificUrl) + consort c01 sheet p8Jr7Q4ehw. One gen per maid = 3 ranks lineup; every image looked at. No upload of old files to Magnific (no denial).
Proposal logic: flowing layered sheer hanfu, small huadian, jewelled hairpins, prop in hands, a new colour per rank, matte flat embroidery.
Gens: m01 fHG21TmCDY, m02 jUBd9wKLD0, m03 IfiNbQztvE, m05 1leDPMTr4r, m07 IfiN53FtvE, m09 dtPOFeSXSL.

## Caveats (honest)
- Proposal backgrounds are parchment, NOT transparent (not yet cut); lineups are 3 ranks per image, so production would need per-figure gens + cutout + cutcheck.
- Face identity is close but drifts a little (m03 live has long loose hair, proposal has a bun; huadian is drawn per prompt, not the maid's own motif). Production should use per-maid face master + her huadian style.
- Colours here are per-maid picks, not tied to rank mapping; rank-colour-per-woman rule (C-ROOT-6 12:46Z: 13 distinct outfits each) not applied beyond these 3 ranks.
- Uploaded: only that one jpg (cdn_sync rebuilt img/_index.json as usual). Nothing live, nothing overwritten.

## Handover
START_CTX low; no rollover needed. Finished.

## Round 2 (ROOT-9 orders 19:42-19:48Z)
- Foreman is ROOT-9 (session_011xDdVRcPyvGXaGQCff5fCJ). Ref jpg not in git: pair rebuilt from LIVE figures instead (OD line 1501: Hạ Lăng Vân Đáp ứng vs Cung nữ Tiểu Hoa; names are random per game, so used consort c08 t1 a18 (pastel pink) vs maid m09 base a18 (pink)).
- HOA ĐIỀN removed: all 6 proposals regenerated (6 more gens, total 12) with "bare clean forehead, no forehead mark"; every forehead looked at: clean. (The first-round sheet maid-consort-sample.jpg has huadian — SUPERSEDED, do not show; wipe with cdn_sync --wipe-review maid-consort-sample when done.) CURRENT files are live art and still carry huadian (c08 t1, maid t5 etc).
- Gens (clean): m01 rgdpAAUxtc, m02 Xm4yxLZBfo, m03 LwoXYu7swO, m05 kspM2CS16B, m07 bxV0ZL75Y2, m09 rgdpn7Qxtc.
- Single files under img/_review/maid-consort-sample/: pair_dapung-c08-t1_vs_cungnu-m09_current.jpg; <mNN>_<t1|t3|t5>_current.webp (live, transparent, 900px high) and <mNN>_<t1|t3|t5>_proposal.jpg (crop of the lineup gen, ~416x752, parchment bg, NOT upscaled/cut).

## Round 3 (ROOT-9 19:50Z: PNG, transparent, full size)
- Backgrounds removed with Magnific images_remove_background (3 credits each) on the 6 clean-forehead lineup gens, then split per figure by alpha column runs (stray neighbour fragments dropped), tight crop. Checked on dark bg: clean edges, no parchment, foreheads clean (no local fill needed: regenerated clean).
- Files (PNG, RGBA) in img/_review/maid-consort-sample/: <mNN>_<t1|t3|t5>_proposal.png (~320x745 = native size of the 1344x752 gens; not downscaled, not upscaled) and <mNN>_<t1|t3|t5>_current.png (live fig 900 px high, converted from webp).
- Superseded older files in the same folder (jpg/webp proposals, contact sheet) remain: wipe the folder when done.

## Round 4: m09 8-rank ladder (owner ~20:05Z "vẽ đủ 8 bậc", via ROOT-9)
- t1 (sky-blue, anchor), t3 (rose-coral), t5 (emerald) kept from round 2 (clean-forehead cutouts, native ~320x745). NEW at gpt-2-6 2k, single figure 2:3, refs = m09 base look + approved lineup rgdpn7Qxtc, each cut with images_remove_background: t2 pale lilac EbnGWUCuuO, t4 honey-amber 5jMTpizKxe, t6 crimson 3z5q1rVREY, t7 midnight indigo (redo: first try vQ2Rz05a47 had a high stand collar = rejected) yiEfqMlPW9, t8 imperial yellow + phoenix crown s78BvYEl8e. 6 gens + 5 cuts.
- Files: img/_review/maid-consort-sample/m09_t1..t8_ladder.png (+ m09_ladder_check.jpg for the foreman only).
- Caveats: t1/t3/t5 are ~745 px high while t2/t4/t6/t7/t8 are ~3000 px (2048x3072 gens); t6 has a long trailing hem (wider canvas); t6 V neckline is fairly deep; colour ladder blue, lilac, rose, amber, green, crimson, indigo, yellow (t3 rose vs t6 crimson are the closest pair). If approved, redo t1/t3/t5 at 2k for the same size.

## Round 5: ladder headdress toned down (owner ~20:10Z "đừng over quá", anchor = live img/hd/fig-consort-c01-t1..t8-a18.webp)
- Viewed the 8 anchors first: headdress there = t1 one flower, t2 flower+pin, t4 small comb, t5 gold crown, t6 crown+flowers, t7 phoenix crown, t8 tall gold crown; pearl shoulder cape from t6.
- Redone with explicit "modest, not overdone": t6 KLDVhBCkqp (cut aFAZpB1fSh; first redo xSXef4mjfW had only a flower pin, too low vs t4, rejected), t7 4RQExTb9Aa (cut TdUgi32VNR), t8 bxV0Iny5Y2 (cut VXwS32jMMU). Overwrote my own m09_t6/t7/t8_ladder.png + m09_ladder_check.jpg in the review folder. Replaced attempts (3z5q1rVREY, vQ2Rz05a47, yiEfqMlPW9, s78BvYEl8e) are not used. Hems now floor length, no train. Total this ladder: 10 gens, 8 cuts.

## Round 6: owner verdict on the ladder (hem to floor, no trains, slimmer t8, varied hands, t1/t3/t5 at 2k)
- All 7 redone as single 2k figures (2048x3072), design refs = previous creations, face ref = m09 base; each cut with images_remove_background. t2 kept unchanged (owner OK).
- Gens/cuts: t1 yiEfsWuPW9/nVLxZ45YQD (flower branch to cheek), t3 6AqFwePiJO/YMsj26HWeC (round fan raised beside face), t4 cpgsZJC0eP/VXwSYG5MMU (hem lowered to floor, open hand + round fan low), t5 EbnGIDxuuO/IfiNdeWtvE (hand at hairpin, folded fan down), t6 vQ2RoQLa47/N2HQOyB6D9 (handkerchief at chest + open hand, no train, less deep V), t7 s78Bky2l8e/p8O70Mhehw (folded fan low + hand on sleeve), t8 mERiBOZhJQ/1leDbtsr4r (two layers, slim, raised open hand + folded fan at hip). t2 = fan held low in front (unchanged).
- Caveat: t4, t6, t8 each have one open extended hand (different side/height/other hand); could vary further if she says they look alike.
- Overwrote my own m09_t1,t3-t8_ladder.png + m09_ladder_check.jpg. Ladder totals: 17 gens, 15 cuts (this round 7+7).

## Round 7: headdress per owner ~20:35Z (t6-t8 grand crowns back; t4/t5 richer pins)
- Only the headdress changed on t4-t8 (pose, hem, outfit kept via the round-6 creation as ref 2): t4 CqzAfrJEEy/jUBXlgkLD0 small gold crown-comb + 2-3 pins short dangles; t5 gOt8lRoSXO/w4vhO4g7EI larger gold comb + phoenix pin; t6 nVLxnkpYQD/8a6NmuEIrU, t7 SymISIPUb8/EbnzFr6uuO, t8 aFAZaTofSh/aFA2E1gfSh with the round-1 grand crowns (refs 3z5q1rVREY / yiEfqMlPW9 / s78BvYEl8e). t1-t3 unchanged. 5 gens + 5 cuts (ladder total 22 gens, 20 cuts).
- Overwrote my own m09_t4..t8_ladder.png + m09_ladder_check.jpg.

## Round 9: owner "same style/ref" order via ROOT-10 (t1-t3 different cuts, t3 pins > t1, t4/t5 redrawn in the t1-t3 style, t6-t8 same style)
- Style ref on every gen = the m09 base-look Magnific creation KLM2ApKkqp (= source of img/hd/fig-maid-m09-a18.webp; no old-file upload), ladder creations as design refs. Prompt prefix "soft watercolour-like rendering ... exactly matching reference 1".
- Gens / cuts: t1 8a6NkupIrU/LwoBnclswO (wrap-front, narrow collar, 1 shawl, 1 flower + 1 pin), t2 CqzGgjbEEy/cpglF5s0eP (chest-wrapped ruqun + open-front straight-collar jacket, 2 pearl pins), t3 kspDN3h16B/ovN9LwI829 (wide crossed lapel + cape-sleeve, gold comb + pins), t4 xSXdZvIjfW/s78oYpNl8e (first try lJI8Aokgv9 had too few pins), t5 ovN91Lo829/79avMtRJAL, t6 1lep3aor4r/kspDZpj16B, t7 Bh94xIvoQR/3z5btKaREY, t8 yiECp67PW9/Xm4PxNeBfo. t4 outer robe to floor, no jutting pins, every hand grips its item or clothing.
- Face/hair "near-3D, no contour line" order (ROOT-10 20:45Z) arrived after these: test on t1/t2 only (ovN9lIy829 cut P3uEoP842C, p8OJro2ehw cut N2HFmiP6D9) = m09_t1_face3d_test.png, m09_t2_face3d_test.png; slightly softer, less contour than the ladder files. Remaining 6 NOT redone pending ROOT-10 go.
- Ladder total so far: 41 gens, 40 cuts (this round 11 gens + 10 cuts).

## Round 10: near-3D face/hair + skin clause on all 8 (ROOT-10 20:45Z / 20:53Z / 20:55Z)
- t1/t2 designs APPROVED by the owner; all 8 regenerated with "FACE and HAIR like ref: near-3D, no dark contour" + "luminous smooth porcelain skin, soft even frontal light, no grey/dark shading on the face, no nasolabial/under-eye lines, dewy flawless complexion". Style ref = m09 base-look creation KLM2ApKkqp (ROOT-10 also gave eIyOFEidqL = hd 1800 upload of fig-maid-m09-a18); previous ladder creation as design ref. t3 pins tucked into the bun. No teacup/teapot held anywhere.
- gen/cut: t1 kspDMS916B/JNfaafwOq4, t2 s78oB9Rl8e/Bh9446UoQR, t3 Ebnzz41uuO/LwoBoqNswO, t4 xSXddc7jfW/s78o851l8e, t5 bxVTVDT5Y2/Xm4P6rLBfo, t6 tC3i3GlmZJ/1lepB25r4r, t7 cpglUBT0eP/LwoBtWMswO, t8 vQ2ZGKza47/LwoBtcCswO. Intermediate face3d-only versions (t1/t2 ovN9lIy829/p8OJro2ehw, t3 Ifi6OidtvE, t4 tC3iy27mZJ, t5 bxVTnQq5Y2, t6 tC3iPIWmZJ, t7 9ZFQCG4NYZ, t8 N2HFEci6D9) are superseded; m09_t1/t2_face3d_test.png are stale files in the review folder.
- All 8 m09_tN_ladder.png + m09_ladder_check.jpg overwritten and md5-verified on the CDN. Ladder total about 59 gens, 58 cuts.

## Round 11: FRESH gens only (owner: "never derive from a previous gen"), hairpin ladder, ornaments one side then both sides
- Rule applied: every m09 t1-t8 is a fresh gpt-2-6 gen whose ONLY image ref is eIyOFEidqL (hd 1800 of fig-maid-m09-a18); outfit, hand pose and hairpins are described in words. Clauses on every gen: near-3D face/hair, luminous porcelain skin (no grey shading, no nasolabial/under-eye lines), real gold hairpins with dangles + pink flower, bare clean forehead. No teacup/teapot. Face crops zoomed and checked: clean.
- Hairpin ladder (owner: from Phi up ornaments visible on BOTH sides): t1 one gold pin + flower (one side); t2 pin + 2nd pearl-dangle pin + small flower cluster (one side); t3 gold crown-comb + pins + flower cluster (one side); t4 crown-comb + 3 pins + flower cluster (one side); t5 Phi crown-comb + pin/flower left + phoenix pin right (both sides); t6-t8 grand crowns (both sides).
- gen/cut: t1 rgdeh2axtc/5jMVt22Kxe, t2 TdUSGpMVNR/0eSgGFzTfW, t3 79avL9AJAL/4RQuwB59Aa, t4 ovN9DfE829/JNfagB8Oq4, t5 lJI81iCgv9/tC3iXODmZJ, t6 nVLj9c6YQD/s78oqdnl8e, t7 iGbqUEs3uK/5jMVa0nKxe, t8 xSXdQG9jfW/DoJ7nIWpcl (superseded in-between gens: t2 SymtQVNUb8, t3 4RQuxfy9Aa, t4 9ZFQjQWNYZ, t5 CqzGeXxEEy). All 8 m09_tN_ladder.png + m09_ladder_check.jpg md5-verified on the CDN. Ladder total about 74 gens.
- Process note: my `git rebase` in the shared checkout /home/user/cung-tuong-mong (and a worktree) was left mid-rebase by me at 20:43Z (stale local history after the branch was rewritten upstream); I aborted both at ~21:30Z. No remote history was touched; all my report commits were made on top of origin tip via fresh worktrees.

## Round 12 (ROOT-11): t2/t3/t4 steps + varied items, t7/t8 yellow rule, proportions
- All fresh gens, ONLY image ref eIyOFEidqL, items vary: t1 flower branch, t2 flower basket (pin + big flower + 2nd pearl-dangle pin), t3 palace lantern (comb + pin + flower), t4 sachet pouch (gold centrepiece + comb + 3 pins + flower), t5 hand at hair + folded fan, t6 handkerchief + fan, t7 folded fan, t8 phoenix fan. t1-t4 ornaments on one side (t4 also a centre piece), t5-t8 both sides.
- Owner rule "from Hoàng quý phi gold in the outfit": t7 indigo with golden-yellow lining/sash/hem band; t8 golden-yellow main mixed with deep red, jade green and white (not all yellow).
- Proportions vs ref (hd fig-maid-m09-a18) by Haar face box: face_h/(feet-facetop) ref 0.0982; t1 +1.2%, t2 +1.4%, t3 +3.6%, t4 -1.1%, t5 -0.7%, t6 +3.1%, t7 -1.5%, t8 -1.5% (all within 5%). First t1 was +7.1% and was regenerated (fHGG7YTCDY/LwoonnCswO) with "head not larger than the ref".
- gen/cut: t1 fHGG7YTCDY/LwoonnCswO, t2 s788Zdzl8e/s788AGvl8e, t3 SymmGIkUb8/lJIIGYvgv9, t4 yiEETqQPW9/mERRLW9hJQ, t5 lJI81iCgv9/tC3iXODmZJ, t6 nVLj9c6YQD/s78oqdnl8e, t7 YMssaQlWeC/5jMM6jWKxe, t8 dtPP5yIXSL/gOttYyFSXO. All md5-verified on the CDN. Ladder total about 81 gens.

## Round 13 (ROOT-12): t4 apricot, body measurements
- t4 fresh regen (eyes open, apricot-peach not golden, centre piece + ornate pin cluster + flower, capes close to the body): gen 4RQQIzJ9Aa / cut Cqzz9fVEEy; m09_t4_ladder.png + check sheet overwritten, md5-verified. Ladder total about 82 gens.
- Measurements (Haar face box as hairline->chin, canvas px; shoulder = silhouette width at chin+0.46H): ref hairline 98 chin 264 feet 1800 H/(hair->feet) .0974 shoulder 186-453 (1.61H); t1 175/464/3059 .1002 249-741 (1.70); t2 168/456/3062 .0996 288-807 (1.80); t3 195/490/3069 .1024 278-947 (2.27); t4 190/462/3060 .0946 421-887 (1.72); t5 221/498/3053 .0979 248-843 (2.15); t6 231/515/3045 .1010 322-821 (1.76); t7 219/494/3060 .0967 317-797 (1.75); t8 281/551/3048 .0974 550-1010 (1.71). t3 (+41%) and t5 (+34%) shoulders are wide because arms are raised; waist not measurable from the silhouette.

## Round 14 (ROOT-12 correction): t3/t5 stay as before, shoulder by eye
- ROOT-12 first asked for t3+t5 regen with arms close (done: t3 huZZ4u5vqL/aFAA6t2fSh, t5 JNff83fOq4/N2HHfPg6D9), then CANCELLED it (silhouette method wrong). Restored the earlier t3 (raised lantern, SymmGIkUb8/lJIIGYvgv9) and t5 (hand at hair, lJI81iCgv9/tC3iXODmZJ) in the review folder; the arms-close versions are unused (2 gens + 2 cuts wasted). md5-verified.
- Shoulder points by eye on ruler zooms (H = hairline->chin, x from face centre): ref -1.05H/+1.05H = 2.1H; t3 -1.0H/+1.1H = 2.1H; t5 -1.1H/+1.05H = 2.15H (+-0.1H). Alpha-silhouette widths are NOT a valid method (owner/ROOT-12). Ladder total about 84 gens.

## Round 15: base-body edit test (ROOT-12), REJECTED by the owner 00:15Z
- Method: Magnific images_retouch mode=edit (whole-image repaint, no masks/layers/paste) on eIyOFEidqL (m09 hd, 637x1800, white bg) to change only garments/hairpins/held item. Ops: t4 edit #1 IfiiABatvE (270 cr), images_expand rgddtIExtc (130 cr; painted a palace roof/blossoms on black = useless for headroom), t6 edit LwooaR2swO (270), t4 edit #2 KLDDtSRkqp (270). 940 credits, 4 edits + 1 expand.
- Result (Haar, ref hairline 97 / chin 266 / feet 1799 / face h 169): t6 98/267/1799/169 (identical, crown squeezed into the 26 px top margin: owner: crown SQUASHED); t4 #1 112/275/1796/163 (drifted); t4 #2 97/266/1798/169 (face locked). Files: basetest_t4_edit.png (#2), basetest_t6_edit.png, basetest_t4_overlay50.jpg, basetest_t6_overlay50.jpg (review folder).
- Owner reasons for rejection: (1) crown squashed, no headroom; (2) costumes not in the approved rank-outfit style; (3) t4 reads like a MAID because the sleeves/hem structure stayed the maid's. Lesson: editing on the maid body keeps the maid garment structure; a body template must be a neutral/underlayer base, not a dressed maid. Method dropped; no pose library made.
- Claim line (CLAIMS.md 'MAID->CONSORT TIER SAMPLE sheet') released: DONE. Ladder total about 90 gens/ops. Final state of the m09 ladder (fresh gens, ONLY ref eIyOFEidqL) stays as in Round 14 (t4 apricot, t3 lantern, t5 hand-at-hair); owner verdict on t5 pending via ROOT-12.

## Round 16: face swap test, then neutral base body (ROOT-12 orders 00:17Z / 00:22Z)
- Face test (dropped by ROOT-12 afterwards): images_retouch edit on eIyOFEidqL with ref 8aNsy0CIrU (face-consort-01 portrait), P3uuxWp42C, 270 cr. Haar: ref hairline 97 / chin 266 / face h 169 / feet 1799; edit 97 / 265 / 168 / 1799 (head locked). The face changed only modestly (similar-looking eyes/nose/lips). Files: basetest_face_edit.png, basetest_face_sidebyside.jpg (review folder).
- Neutral base body (ordered: plain skin-tight bodysuit, low bun, no pins, 7.5 heads, tall canvas with headroom): ONE gen attempted (gpt-2-6, ref eIyOFEidqL, 9:16 2k, VXww30OMMU) was REFUSED by Magnific: failureReason "NSFW: Content detected" (the skin-tight nude-beige bodysuit request). Not retried or reworded to evade the filter. Also 1:2 is not supported by gpt-2-6 (snapped to 9:16). Needs a foreman decision: e.g. a plain fitted unpatterned under-robe/leotard-with-sleeves in a clearly non-nude colour, or a mannequin/wooden-doll style base, or skip the bodysuit and dress straight from approved outfit refs.

## Round 15 addendum: EXACT prompts of the base-body edits (owner question 00:25Z: "did the prompts DESCRIBE the costume?" Answer: yes, colour/cut/collar/cape/embroidery/hairpins/held item were described in words, but NOT sleeve width/length or hem; the pose/sleeves/hem came from the maid image. Tool: images_retouch, mode=edit, quality=high, folder ba4aecfe..., input eIyOFEidqL, no reference images.)

### t4 edit #2, KLDDtSRkqp (270 cr):
Repaint this single image in place: keep the SAME person, her face and expression exactly (same eyes, nose, mouth, skin, same face size and the same position of the head on the canvas), the same neck, shoulders, hands and feet, the same height, framing and pose, with the same sleeves hanging as they are; do not move, resize or redraw the face or head. Paint a NEW outfit naturally into the picture with fitted folds and shadows: imperial consort rank 4 (Tần): soft APRICOT-PEACH silk (clearly not golden), a broad open cross-collar with a cream-and-peach trimmed edge, a short sheer cape-shawl over the shoulders, a long sheer outer robe flowing to the floor with peach-coral floral and cloud embroidery stitched into the cloth. New hair ornaments (hair shape unchanged): a gold flower centrepiece at the top centre of the bun, and on the figure's left a gold crown-comb and three gold hairpins with dangling beads and a big pink flower. Replace the book with a small embroidered silk sachet pouch on a tasselled cord, held between the same hands at chest height. Keep the plain white background.

### t6 edit, LwooaR2swO (270 cr):
Keep the SAME person, the SAME face, skin, neck, shoulders, hands, feet, head size, body proportions and the exact SAME pose, framing and position on the canvas, pixel-identical; do not move, resize or shrink anything, especially not the head. Replace ONLY the clothing, hair ornaments and the held item: new outfit = imperial consort rank 6 (Quý phi): deep CRIMSON silk with gold phoenix and peony embroidery stitched into the cloth, an open cross-collar with a gold border, a small pearl-beaded shoulder cape, a jewelled waist band with jade pendants, slim two-layer silhouette, the long robe flowing to the floor; keep the sleeves hanging as they are. New headdress (face and head size unchanged): a grand gold hair crown with pearl and ruby flowers and long hanging bead strands on both sides; the crown rises above the head, it may be cropped by the top edge of the canvas but the head must NOT be made smaller. Replace the book with a silk handkerchief held in the same hands. Keep the plain white background.

(Not described in either prompt: sleeve width/length, which stayed the maid's wide hanging sleeves from the input image; that explains why t4 read like a maid. Also "keep the sleeves hanging as they are" in both prompts told the model to keep the maid sleeves. The earlier t4 edit #1 IfiiABatvE used a similar prompt with "Keep the SAME person ... pixel-identical" wording.)

## Round 17: neutral base body, option (a) grey fitted under-robe (ROOT-12 00:2xZ)
- 1 gen (gpt-2-6, ref eIyOFEidqL, 9:16 2k, 135 cr, 79aa1hKJAL): plain matte light-grey fitted under-robe, close long sleeves, high round neck, ankle length, no pattern/belt/jewellery; low simple bun, no pins; grey slippers; hands clasped at the chest like m09; big headroom. File: img/_review/maid-consort-sample/neutral_base_grey.png (1520x2688, white bg, not cut). Prompt: "A neutral BASE BODY reference figure for a dress-up system, semi-realistic painterly near-3D style, plain white background. ONE standing young woman, full body head to feet, centered. Face, skin, hair colour and body proportions like the reference image: same face, 7.5 heads tall measured from the top of her skull to the feet, shoulder width about twice the face width, waist about 1.15 times the face width. She wears ONE plain, matte LIGHT GREY, fitted but modest under-robe: close-fitting long sleeves down to the wrists, a high round neckline, ankle-length straight fitted skirt, NO pattern, NO embroidery, NO collar trim, NO belt, NO jewellery, like a plain grey mannequin dress. Hair in one simple low bun at the back of the head, smooth, NO hairpins, NO flowers, no ornaments. Plain grey slippers. Standing pose: relaxed, hands loosely clasped in front of her chest at the same place as in the reference, serene closed-lip smile, looking at the viewer. IMPORTANT: leave generous EMPTY white space above her head (about 15 percent of the image height) so tall headdresses can be added later; she must NOT fill the frame to the top edge. Soft even frontal light, luminous smooth skin, no grey shading on the face, no nasolabial lines."
- px (canvas 1520x2688): skull top 319 (headroom 11.9%), hairline 429, chin 658, feet 2660, face h 229, face centre x 788. H/(hairline->feet) 0.1026 (spec 0.102 OK). Shoulder at chin+0.7H: x 526-994 = 2.04H (spec 2.0 OK; silhouette method, no sleeves/capes here so valid). Skull-top->feet = 6.91 skull-heights (spec 7.5): the hair mass above the hairline is taller than the m09 ref (0.48H vs 0.38H) so the 'skull top' is higher; by the face ratio it is on spec. Waist not measured (my silhouette probe failed on the clasped arms).
- Caveat: rendering is smoother/more CG-like than the painterly m09; face is the same identity but simplified. The earlier first attempt with a skin-tight nude bodysuit was refused by the filter (Round 16).

## Round 18 — neutral grey base v2 (overlays m09), ROOT-12 GO

1 gen only: images_retouch edit of m09 hd `eIyOFEidqL` (270 cr, creation SymmsSoUb8) → plain matte light-grey fitted under-robe (stand collar, long sleeves, ankle length), low simple bun, no pins/earrings/book, hands clasped same place, grey slippers. Canvas stays 637x1800 (pixel-aligned); I only made the white background transparent (local flood-fill) and added 300 px empty headroom on top (2100 px tall).

| px (637x1800, before headroom) | m09 | base v2 | off |
|---|---|---|---|
| hairline | 97 | 97 | 0 |
| chin | 266 | 267 | 1 px (0.06%) |
| face h | 169 | 170 | 0.6% |
| face cx | 341 | 342 | 1 px |
| feet (last row) | 1799 | 1792 | 7 px (0.4%) |
| face/(hairline→feet) | 0.0993 | 0.1003 | +1% |

By-eye zoom of the 50% overlay: eyes, nose, mouth, chin, face outline coincide; shoulder line coincides; only the hair differs (m09 has pins/flower, base has bare bun). Sleeves of the grey robe are fitted, so the wide m09 sleeve flares are not covered (by design). All within ≤3%.

Note: the robe has a side slit and a mandarin collar (slight áo dài look) — fine as a base, can be flattened if the owner dislikes it.

- Single (transparent PNG, 637x2100): https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/neutral_base_grey_v2.png
- 50% overlay on m09: https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/neutral_base_grey_v2_overlay50.jpg

Nothing live. No further gens until told.

## Round 19 — base v2 dressed as t4 Tần and t6 Quý phi (ROOT-12 GO, owner 01:00Z)

2 gens of the ≤4 allowed (540 cr). Source: base v2 on white, padded to 637x2100 (300 px headroom; uploaded as `neutral_base_v2_white_padded.png`), `images_retouch` mode=edit, quality high. Prompts asked for the grey robe to be COMPLETELY REPLACED, wide flowing consort sleeves past the hands, layered robe, floor-length hem with no train, own colour, real gold trâm, clean forehead; t6 with an open low cross-collar showing the collarbone, shoulder cape, crown into the headroom.

- t4: apricot-peach, centre piece + one side pin (left), low cross-collar with bare throat, wide embroidered sleeves, sash, floor-length.
- t6: deep rose-crimson, gold embroidery, wide open neckline with collarbone skin, shoulder cape, brocade sash, gold crown with pins, floor-length.

Gate:
- No grey visible: PASS in both, by eye. t6 collarbone and throat are skin.
- 50% overlay on m09: face, eyes, chin, shoulders coincide by eye. Output canvas is 621x2048 (0.975 of 637x2100, same aspect), so I resized to 637x2100 for the overlay and the singles. Haar face h (scaled to 637 frame): m09 169, t4 174 (+3.2%, borderline, Haar noise), t6 170 (+0.8%). hairline/chin within ±3 px.
- No maid-like sleeves or hem: PASS, sleeves wide and loose past the hands, hem to floor.
- Headroom: crown not squashed in t6. Weak spots: t6 phoenix pins are on one side more than both; t4 crown pieces are small.

Files (transparent PNG 637x2100, background removed locally, check edges; overlays are JPG): `base_v2_t4_dressed.png`, `base_v2_t6_dressed.png`, `base_v2_t4_dressed_overlay50.jpg`, `base_v2_t6_dressed_overlay50.jpg` under `.../img/_review/maid-consort-sample/`.

Nothing live. Holding the other 2 gens.

### Round 19 addendum — exact prompts (owner 01:12Z called the t6 dressed result "ugly"; HOLD, no gens)

Method for both: `images_retouch` mode=edit, quality high, source = base v2 white padded 637x2100 (creation DoJOXcgpcl), no reference images (costume was invented from text only). Creation ids: t4 0eSUpIgTfW, t6 fHGzFxACDY.

t6 prompt (verbatim):
> Repaint this single standing figure as a Vietnamese/Chinese-style palace consort of rank Quý phi (6th rank), keeping the SAME person, the same face and expression, the same head size and position, the same shoulders, the same stance and the same feet position, pixel-aligned; do not resize or move the body. The plain grey under-robe must be COMPLETELY REPLACED: no grey anywhere. New outfit: a rich layered palace robe in deep rose-crimson silk with gold embroidery, with a wide, low OPEN cross-collar neckline that clearly shows bare skin of the neck, throat and collarbone (skin visible, not covered by any grey or inner garment), a gold-embroidered collar border, very wide flowing consort sleeves hanging loose and long past the hands (clearly NOT close-fitting maid sleeves) with broad embroidered cuffs, a layered outer robe over a lighter inner robe, a wide embroidered brocade sash, a short embroidered shoulder cape (vân kiên) over the shoulders, a floor-length full skirt with an embroidered gold hem band covering the feet, no train. Hands lightly clasped in front of the waist, no held object. Hair: same low bun at the back but now crowned with a real GOLD crown-style headdress with gold phoenix-like hairpins (Phi) and pearl dangles rising symmetrically on BOTH sides, and the crown rising into the empty white headroom above the head without being squashed. Clean bare forehead, no forehead mark. Luminous even skin. Plain white background.

t4 prompt (verbatim):
> Repaint this single standing figure as a Vietnamese/Chinese-style palace consort of rank Tần (4th rank), keeping the SAME person, the same face and expression, the same head size and position, the same shoulders, the same stance and the same feet position, pixel-aligned; do not resize or move the body. The plain grey under-robe must be COMPLETELY REPLACED: no grey anywhere. New outfit: a luxurious layered palace robe in soft APRICOT-PEACH silk (not golden, not pink), a low open cross-collar (đối khâm) showing a little bare skin at the throat, with a cream-gold embroidered collar border, wide flowing consort sleeves that hang loose and long past the hands (clearly NOT close-fitting maid sleeves), embroidered cuffs with peach and gold flowers, a layered outer robe over a lighter inner robe, a slim embroidered sash at the waist, a floor-length full skirt that covers the feet with no train, delicate gold-thread embroidery on the hem band. The hands are lightly clasped in front of the waist, no held object. Hair: same low bun at the back but now dressed with real polished GOLD hairpins (trâm) with small pearl dangles: ONE ornate centre piece at the front of the bun plus ONE gold hairpin with dangles on one side only. Clean bare forehead, no forehead mark. Luminous even skin. The top of the canvas is empty headroom; keep it plain white. Plain white background.

Lesson: a text-invented costume (heavy brocade panels, flat crimson, cape with printed patches, wide square neckline) reads as stock-art, not the m09 painterly look. Next try only on ROOT-13/ROOT-12 word: use an owner-liked outfit image as outfit reference (m09 t6 ladder `m09_t6_ladder.png` or W11 c01 t6 v8) + base v2 as body/pose source.

## Round 20 — consort c12 a18, all 8 ranks t1–t8, fresh gens (ROOT-12, owner 03:25Z "đẹp rồi, cứ tiếp tục làm đi")

Method = W11's approved c01 set: images_generate gpt-2-6, 768x2000, 2k, refs = live hd c12 tN a18 (design; imported as creations) + m09 hd `eIyOFEidqL` (style/body), STYLE_ANCHOR prefix, face/body proportion clauses, bare forehead, matte translucent silk, no teacup, varied held item, hairpin ladder (t1–t4 one side, t4 + centre piece, t5 both sides, t6–t8 crowns). 8 gens (640 cr) + 8 Magnific bg removals (24 cr); no regens. Colours chosen from W11 palette Q rotation (my choice, p=2): t1 apricot-orange, t2 sky blue, t3 emerald-jade, t4 deep rose-pink, t5 indigo-blue, t6 coral-crimson, t7 teal-turquoise + imperial yellow accents, t8 imperial yellow mixed with crimson/jade/navy. Design keeps c12's pomegranate motif. Held items: t1 pearl string, t2 scroll, t3 round fan, t4 peony branch, t5 book, t6 plum branch, t7 lantern, t8 jade ruyi.

| rank | gen -> cut | Haar face h | face/(hairline->feet) | top px (headroom) |
|---|---|---|---|---|
| t1 | LwoIyZ1swO -> SymviFNUb8 | 189 (hand near face, inflated) | 0.1003 | 10 |
| t2 | DoJymHzpcl -> yiEQGksPW9 | 155 | 0.0944 | 195 |
| t3 | 9ZFqzwzNYZ -> jUB8PCpLD0 | 153 | 0.0911 | 130 |
| t4 | dtP9aTOXSL -> 5jMpUmZKxe | 160 | 0.0952 | 118 |
| t5 | 79aCRIpJAL -> bxVDSmw5Y2 | 153 | 0.0949 | 225 |
| t6 | CqzY1ZGEEy -> WDlSo60cXe | 165 | 0.0932 | 17 (crown close to edge) |
| t7 | 4RQHnMe9Aa -> 9ZFqYgRNYZ | 157 | 0.0957 | 96 |
| t8 | SymvinaUb8 -> Bh96u0foQR | 155 | 0.0938 | 60 |

Gate (honest): m09 measured by the same Haar = 0.0993. Haar ratios for t2–t8 are 0.091–0.096, i.e. 4–8% BELOW m09, under the 0.098 floor (t1 passes). Haar is noisy under crowns/hair, and in the 50% overlay (scaled by hairline->feet, face centre aligned) face, eyes, shoulders and bodies coincide closely by eye, but the strict by-eye ruler check is not done. t3 is the smallest-face one (−8%). Known: t6 crown is only 17 px from the top edge (headroom tight), t1 hem reaches the bottom edge, feet hidden at t1.
Files (transparent PNG 768x2000, uncropped): c12_a18_tK_fresh.png; overlays c12_a18_tK_overlay50.jpg; sheet c12_a18_overlay_sheet.jpg under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ . md5-verified. Nothing live.

## Round 21 — consort c12 a18 t1–t8 v2 with c12's OWN face ref (ROOT-12, owner 03:35Z: faces too close to the m09 maid)

Change vs Round 20: refs = image 1 live hd c12 tN a18 (design), image 2 m09 `eIyOFEidqL` (rendering/fabric/skin/body only), image 3 = c12's own live por `por-consort-c12-t4-a18.webp` (imported kspdyUo16B) as FACE ref. Face clause: "face, eyes, nose, lips and face shape exactly as image 3 (her OWN identity: round soft face, full cheeks, large warm round eyes, small nose, soft small lips), NOT the face of image 2 (the maid); image 2 ONLY for painterly rendering, fabric look, skin and body proportion". 10 gens (800 cr): 2 test gens first with an extra face ref `face-consort-12` (huZA1bivqL) — those came back with bangs/fringe (that master photo has a fringe, live c12 has a centre parting), so I dropped it and added "low bun, clean centre parting, NO bangs/fringe, whole forehead bare". Then 8 final gens, 8 bg removals. Colours, held items, hairpin ladder unchanged from Round 20.
Final gens -> cuts: t1 WDlSmDtcXe->YMsgmkNWeC | t2 rgdB9Smxtc->4RQHTah9Aa | t3 YMsgtyVWeC->vQ2GjiOa47 | t4 8a635YNIrU->dtP9HJhXSL | t5 huZArMbvqL->YMsgmx3WeC | t6 jUB86QILD0->rgdBNp0xtc | t7 9ZFqTS6NYZ->TdU7fShVNR | t8 ovNibV9829->lJImZ8sgv9. (Discarded test gens KLDeONLkqp, 5jMpJNQKxe.)

Face check by eye (faces3 sheet = c12 por + 8 crops): all 8 faces read as one woman, longer oval face, narrower arched-brow eyes, matching c12's por and clearly NOT the m09 round face. Bare forehead, no fringe.

| rank | Haar face h | face/(hairline->feet) | top px (headroom) |
|---|---|---|---|
| t1 | 189 (hand near face, inflated) | 0.1026 | 28 |
| t2 | 167 | 0.0963 | 70 |
| t3 | 153 | 0.0891 | 121 |
| t4 | 163 | 0.0921 | 73 |
| t5 | 164 | 0.0917 | 53 |
| t6 | 156 | 0.0958 | 148 |
| t7 | 169 | 0.0955 | 17 (crown near top edge) |
| t8 | 179 | 0.1029 | 11 (crown near top edge) |

Gate: Haar ratio (m09 = 0.0993): t1 and t8 in range, t2/t6/t7 0.096, t3–t5 0.089–0.092 (below 0.098). Haar noisy; 50% overlay (scale by hairline->feet, face centre aligned) shows bodies/shoulders/faces coinciding closely. Weak spots: t7/t8 crowns only 11–17 px from the top edge; t3 smallest face.
Files: https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/c12_a18_v2_tK_fresh.png (768x2000 transparent), c12_a18_v2_tK_overlay50.jpg, c12_a18_v2_overlay_sheet.jpg, c12_a18_v2_faces_vs_por.jpg. md5-verified. Round 20 files kept (superseded). Nothing live.

## Round 22 — consort c12 a18 t1–t8 v3 (own face + fixes + richer hairpin ladder + real-embroidery rule), ROOT-12 04:05Z

v3 = v2 prompt + owner fixes: t3 bigger face ("LARGE head, face exactly 1/10 hairline->feet, NOT small"), t6/t7/t8 "TOP 12 percent of the canvas empty headroom above the crown", t1+all "hem ends just above the floor, BOTH embroidered slippers clearly visible, empty space below the feet", embroidery clause ("real silk EMBROIDERY: fine satin-stitch threads, slight thread texture, stitched into the cloth, following folds and shading, NOT pasted/printed/AI-looking motifs"), face ref = c12 live por only (face-consort-12 caused fringe in v2 tests; "centre parting, NO bangs, bare forehead" clause kept). Hairpin ladder per rank: t1 one simple gold trâm + 1 pearl dangle, one side | t2 trâm + small flower + 2 pearl dangles, one side | t3 two trâm with dangles+tassels, one side | t4 ornate centre piece + two trâm with long dangles, one side | t5 centre ornament + trâm with LONG dangles/tassels both sides | t6 phoenix crown | t7 larger crown, more dangles | t8 phượng quan, richest, longest dangles. 8 gens (640 cr) + 8 bg removals; no regens.
Gens -> cuts: t1 WDlSfhEcXe->Bh961kSoQR | t2 nVLlvmlYQD->aFAzSS1fSh | t3 SymvnntUb8->dtP9KKYXSL | t4 1leXiR2r4r->w4vfc0S7EI | t5 rgdB32bxtc->w4vfcTU7EI | t6 tC3ZjSUmZJ->kspdiZq16B | t7 bxVD4RX5Y2->eIy45rWdqL | t8 N2HbemE6D9->bxVD9Rd5Y2.
Checks: feet/slippers visible on all 8 (by eye). Embroidery at 2x zoom (t4 and t6 checked): reads as stitched thread, following folds. Faces: face sheet m09 | c12 por | t1..t8 — all 8 read as one woman, none reads as m09; the cheeks/rendering stay soft like m09 (rendering ref), shape closer to c12 por.
| rank | Haar face h | ratio | top px |
|---|---|---|---|
| t1 | 191 (hand near face) | 0.1032 | 34 |
| t2 | 179 | 0.1008 | 91 |
| t3 | 166 | 0.0974 | 142 |
| t4 | 160 | 0.0917 | 104 |
| t5 | 173 | 0.0967 | 23 (crown tight) |
| t6 | 158 | 0.0926 | 124 |
| t7 | 154 | 0.0973 | 140 |
| t8 | 159 | 0.0943 | 69 |
Gate: Haar 0.098–0.107 only t1/t2 pass; t3, t5, t7 0.097; t4/t6/t8 0.092–0.094 (m09 = 0.0993 same detector). t3 face fixed (0.089 -> 0.097); t6/t7/t8 headroom fixed (124/140/69 px); t5 crown now tight (23 px) — new weak spot. 50% overlays on m09 coincide closely by eye.
Files: c12_a18_v3_tK_fresh.png (768x2000 transparent), c12_a18_v3_tK_overlay50.jpg, c12_a18_v3_overlay_sheet.jpg, c12_a18_v3_face_sheet_m09_por_t1-t8.jpg under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ . md5-verified. v1/v2 kept, superseded. Nothing live.

## Round 23 — c12 a18 v4 t4 + t6 with W11's exact c05-v2 method (ROOT-13, owner verdict 18/11 ~01:20Z on c12 t6 v3: "AI quá, không giống đồ thêu, như đặt lên, lệch phong cách")

Method: W11 PROMPT TEMPLATE (recolour-sample.md, HANDOVER W11) with the EMBROIDERY clause replaced by a soft one (no "raised thread texture"): motifs "woven and embroidered INTO the cloth with the same soft matte painterly look, following folds and shading, never pasted, never shiny, no high-contrast gold appliqué"; fabric = "matte soft silk with body, NOT see-through, no sheer layers" (v3 used "translucent"). Refs in order: 1 live hd c12 tN design (t4 0eSwoMHTfW, t6 xSXoJSNjfW), 2 m09 eIyOFEidqL, 3 c12 por (kspdyUo16B, head crop), 4 face-consort-12 (huZA1bivqL), style eIyOFEidqL. Canvas 768x2000. One held item (t4 peony, t6 plum branch). 2 gens (160 cr) + 2 bg removals.
Gens->cuts: t4 79aC8cjJAL->EbnWZFmuuO (muted rose pink, Tan: crown-comb + several pins + flower cluster, one side) | t6 4RQHve39Aa->gOthX7rSXO (coral-crimson, flower-phoenix crown both sides).
Fabric check at 100% beside c05 t4 v2: c12_a18_v4_fabric100_c05t4_vs_c12t4_t6.jpg (c05 t4 v2 | c12 t4 | c12 t6).
- t4: close to c05 t4 v2: soft matte pink silk with body, flowers sit in the cloth, no appliqué. Slightly less gold than c05.
- t6: NOT the same: heavier, denser, more opaque coral with big gold-cream phoenix motifs and pearl-beaded cape (velvet-like). Softer than v3 and no sheer layers, but still bolder than c05 v2. Honest: needs a regen with lighter/fewer motifs if the owner agrees; I did not regen (order = 2 gens).
Faces (c12_a18_v4_faces_m09_por_t4_t6.jpg: m09 | c12 por | t4 | t6): both read as c12 (longer oval, arched brows), not m09. Haar ratio: t4 0.0933 (face h 152, small, below 0.098), t6 0.1010 (in gate). Headroom: t4 top 245 px, t6 top 253 px (crown fully inside). Feet visible both. 50% overlays: c12_a18_v4_t4_overlay50.jpg, c12_a18_v4_t6_overlay50.jpg (bodies/shoulders only; faces differ by design).
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v4_t4_fresh.png, c12_a18_v4_t6_fresh.png (+overlays, fabric and face sheets), md5-verified. Nothing live. Other 6 ranks wait for ROOT-13's OK.

## Round 24 — c12 a18 v5 t4 + t6 (ROOT-13 GO: t6 lighter, t4 bigger face + new colour)

c12's 8 colours (all different within c12, and different from c01 and c05 at the same rank): t1 apricot-orange | t2 sky-blue | t3 mint-jade green | t4 muted deep teal | t5 indigo-blue | t6 warm coral-red | t7 deep plum + imperial yellow inner/borders | t8 imperial yellow mixed with crimson/jade/navy. (Check vs c01: celadon, lilac, apricot, sky, emerald, rose, navy+yellow, yellow mix; vs c05: lilac, apricot, sky, rose, emerald, violet-orchid, crimson+yellow, yellow mix.)
2 gens (160 cr) + 2 bg removals. Same refs/template as Round 23.
- t4 kspdVsN16B -> IfiRN6DtvE: colour muted deep teal; clause "FULL NORMAL-SIZE HEAD, face as large as the face in ref 2". Fabric at 100% next to c05 t4 v2: soft matte silk, tone-on-tone flowers in the cloth, scalloped cape with pink peonies; same family as c05 t4 v2 (less gold). Face reads as c12 (longer oval, arched brows). BUT face still small: Haar face h 140, ratio 0.0906 (m09 0.0993) — the bigger-head clause did NOT work, and this version is smaller than v4 (0.0933). Headroom 339 px.
- t6 yiEQaRsPW9 -> s78tBIEl8e: coral-red soft matte silk (not velvet), FEW and SMALL embroidered sprays + thin borders, light single pearl strand cape, no phoenix panels, crown both sides, plum branch. Fabric at 100%: matches the c05 v2 softness, quite plain now (maybe too plain for Quý phi). Face h 155, ratio 0.1001 (in gate). Headroom 306 px.
Files: c12_a18_v5_t4_fresh.png, c12_a18_v5_t6_fresh.png (768x2000 transparent), c12_a18_v5_t4_overlay50.jpg, c12_a18_v5_t6_overlay50.jpg, c12_a18_v5_fabric100_c05t4_vs_c12t4_t6.jpg, c12_a18_v5_faces_m09_por_t4_t6.jpg under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ . md5-verified. Nothing live.

### Round 24 addendum — owner correction 01:40Z: ONE fabric reference only = m09
c01/c05 are NOT standards or refs (comparison to c05 withdrawn). My v5 gens already used only m09 for style/fabric/rendering (refs: live c12 design, m09, c12 por, face-consort-12, style m09). Fabric at 100% vs m09: c12_a18_v5_fabric100_m09_vs_c12t4_t6.jpg (m09 | c12 t4 | c12 t6). t4: matte, soft, flower borders sit in the cloth like m09; closest. t6: matte and soft like m09 but plainer (m09 has wide floral borders and more sprays; t6 only thin borders + few sprays). Not sheer in either. No new gens.

## Round 25 — c12 a18 t6 v6 (owner 02:00Z: t4 v5 APPROVED "rất đẹp"; t6 v5 REJECTED: far plainer than Tần)

1 gen (80 cr) + 1 bg removal: MB7OOKPDCm -> YMsggNyWeC. Same refs as v5 (live c12 t6 design xSXoJSNjfW, m09 eIyOFEidqL, c12 por kspdyUo16B, face-consort-12 huZA1bivqL, style m09). Prompt changes: RICH layered court robe (outer over inner), WIDE floral sleeve bands + wide floral borders along opening and hem, pearl-trimmed cross collar band, pearl-trimmed shoulder cape with two pearl strands, wide sash with jade clasp, MANY tone-on-tone embroidered flower sprays (coral + soft muted gold/cream) inside the cloth, soft matte silk like m09, no giant phoenix panels, no high-contrast gold appliqué; rich flower-and-phoenix crown both sides; coral-red, plum branch, full normal-size head.
Self-check vs t4 v5 side by side (c12_a18_v6_t4v5_vs_t6v6.jpg): t6 reads one rank above t4 at a glance (more layers, wide borders on sleeve/hem/front, pearl cape, bigger crown). Fabric at 100% vs m09 (c12_a18_v6_fabric100_m09_t4v5_t6v6.jpg: m09 | c12 t4 v5 | c12 t6 v6): matte, soft, motifs sit in the cloth, borders similar to m09's, not sheer, not velvet.
Haar: face h 157, ratio 0.0952 (vs m09 0.0993: -4.2%, inside ±5%); headroom 185 px; feet visible; face reads as c12. Overlay: c12_a18_v6_t6_overlay50.jpg.
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v6_t6_fresh.png (768x2000 transparent) + overlay + the two check sheets, md5-verified. Nothing live. 1 of max 2 gens used.

## Round 26 — c12 a18 t6 v7 (owner 02:20Z on v6: "ra AI", fabric and tà áo wrong, not like embroidery)

ROOT-13's diagnosis: m09 = mostly plain soft silk + a FEW small sparse stitched sprays; v6 = all-over dense florals + wallpaper borders + stiff rectangular robe flaps. Order: 1 gen (max 2).
1 gen (80 cr) + 1 bg removal: gOthfoxSXO -> 8a63AmgIrU. Refs unchanged (live c12 t6 design xSXoJSNjfW as general idea only, m09, c12 por, face-consort-12, style m09). Prompt: robe SHAPE soft and flowing (outer robe longer to the floor, wide draped sleeves, hems fall in soft ripples, NO stiff straight rectangular panels); richness from MORE LAYERS (outer/middle/inner), pearl-trimmed collar + shoulder cape with two pearl strands, jade-clasp sash, jewellery, bigger crown both sides; FABRIC exactly like m09: plain matte coral-red silk ground, a lot of empty plain cloth, only a FEW small embroidered sprays + narrow border bands only on collar/cuffs/hem; NO all-over pattern, NO wallpaper borders, NOT velvet, NOT see-through. Forehead clause (owner 02:20Z): "absolutely clean bare forehead: NO hoa điền, no forehead flower, dot, jewel, tick or mark".
Checks: forehead at 100% (c12_a18_v7_t6_forehead100.jpg): bare, no mark. Fabric next to m09 (c12_a18_v7_fabric100_m09_t4v5_t6v7.jpg: m09 | t4 v5 | t6 v7): density now like m09, plain ground + sparse sprays + narrow bands. Full figure vs t4 v5 (c12_a18_v7_t4v5_vs_t6v7.jpg): robes soft, flowing, layered, no stiff panels; richness from layers, pearl cape, big crown.
HONEST weak points: (1) colour came out salmon/pink-coral, not clear coral-red; (2) the outer draped layer on the sleeves looks semi-sheer in places (owner wants not see-through); (3) face is smaller: Haar face h 144, ratio 0.0892 (m09 0.0993): -10.2%, out of gate (v6 was 0.0952); (4) fabric is now plainer than t4 v5, so "one rank richer" rests on layers/crown/cape, not on embroidery.
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v7_t6_fresh.png (768x2000 transparent), c12_a18_v7_t6_overlay50.jpg + the three check images. md5-verified. Nothing live. 1 of max 2 gens used.

## Round 27 — c12 a18 t6 v8 (ROOT-13 last gen: v7 robe shape + t4-v5 embroidery amount + solid coral-red + opaque + full-size head)

1 gen (80 cr) + 1 bg removal: dtP9RU4XSL -> p8OPic5ehw (max-2 budget for this order now fully used: v7 + v8). Same refs as v7. Prompt: keep v7 soft flowing layered robe + pearl cape/collar + jade sash + big crown; ALL layers fully OPAQUE matte silk; "FULL-SIZE LARGE HEAD, face hairline->chin exactly one tenth of hairline->feet, head clearly large vs body"; colour "solid, clear, saturated CORAL-RED (warm red-orange, not pink, not salmon)"; embroidery "stitched silk embroidery, moderate amount: flower sprays over robe body and skirt with plain cloth visible between, plus embroidered border bands on sleeves/front opening/hem, a little soft gold thread; never all-over/wallpaper/pasted/shiny"; forehead clause "NO hoa điền, no forehead flower, dot, jewel, tick or mark".
Checks: Haar face h 170, ratio 0.1055 (m09 0.0993: +6.2%), IN the 0.098-0.107 gate (upper edge). Forehead at 100%: bare, no mark (c12_a18_v8_t6_forehead100.jpg). Fabric vs m09 and t4 v5 at 100% (c12_a18_v8_fabric100_m09_t4v5_t6v8.jpg: m09 | t4 v5 | t6 v8): matte soft silk, sprays + bands with plain coral cloth visible, a bit more gold than t4, borders on sleeve/front/hem are cream bands (wider/lighter than m09's). Full figure vs t4 v5 (c12_a18_v8_t4v5_vs_t6v8.jpg): same flowing layered shape, clear red-orange coral, more layers + pearl cape + bigger crown: reads one rank higher. Headroom 190 px, feet visible.
Weak points: cream front/hem bands are fairly wide and light (could read as border panels), outer sleeve layer mostly opaque but slightly lighter at the edges; head is large (+6%, upper edge of gate).
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v8_t6_fresh.png (768x2000 transparent), overlay, forehead crop, two check images; md5-verified. Nothing live.

## Round 28 — c12 a18 t6 v9 (owner correction 02:30Z: "thêu" = HOW it is stitched, not how little; Quý phi must be RICH and luxurious; ROOT-13 withdrew the "sparse like m09" order)

Note: v8 (Round 27) was generated with the superseded sparse/"moderate" embroidery wording; reported as such. v9 = 1 gen (80 cr) + bg removal: gOthQwvSXO -> 9ZFqxFMNYZ (budget: up to 2 more approved, 1 used). Same refs as v7/v8. Prompt keeps v7 flowing layered robe, opaque layers, pearl cape/collar, jade sash, big crown, "FULL-SIZE LARGE HEAD, face one tenth of hairline->feet", solid clear coral-red, plus RICH embroidery wording: "real silk embroidery of a Quý phi, clearly more lavish than a lower rank: fine satin-stitch threads with visible thread texture, stitched INTO the cloth following folds and shading, in the soft matte painterly rendering; LARGER embroidered peony and flower motifs with leaves spread over robe body, sleeves and skirt, WIDE embroidered border bands with flowers and gold thread along sleeves, front opening and hem, gold thread highlights; coral silk ground visible between motifs, never printed all-over wallpaper, never pasted, never shiny". Forehead clause "NO hoa điền, no forehead flower, dot, jewel, tick or mark".
Result: clearly richer than t4 v5 (large peonies, two small embroidered phoenixes on the sleeves/front, wide gold-flower borders), opaque coral-red, flowing layered shape, pearl cape, big crown. Fabric at 100% vs m09 and t4 v5 (c12_a18_v9_fabric100_m09_t4v5_t6v9.jpg): same soft matte stitched rendering family as t4 v5, but bolder/denser, motifs larger and some gold more contrasty. Forehead at 100% bare, no mark (c12_a18_v9_t6_forehead100.jpg).
HONEST weak points: (1) face is smaller again: Haar face h 147, ratio 0.0930 (m09 0.0993: -6.3%, below the 0.098 gate; v8 was 0.1055 with the same face clause, so the face size varies run to run); (2) the phoenix motifs appeared although not asked (they come from the live t6 design ref) — fine for a Quý phi but ROOT-13 had asked for none earlier; (3) embroidery denser than t4 v5 in the lower skirt: risk of reading as a heavy print at a glance.
Headroom 232 px, feet visible. Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v9_t6_fresh.png (768x2000 transparent), overlay, forehead crop, fabric zoom, t4v5-vs-t6v9; md5-verified. Nothing live. 1 more gen approved if the face/embroidery needs a fix.

## Round 29 — c12 a18 t6 v10 (backup: v9 prompt + larger head), ROOT-13 last gen

1 gen (80 cr) + bg removal: fHGnD82CDY -> YMsg4fpWeC (this is the 2nd of the 2 approved gens; budget now used up). Same refs and v9 prompt (rich luxurious stitched embroidery, flowing opaque layered robe, pearl cape, big crown, solid coral-red, bare forehead with the hoa điền clause) + added HEAD SIZE paragraph: "a LARGE head, noticeably larger than a typical figure: face (hairline to chin) as large as the face in ref 2 at the same height, exactly one tenth of hairline->feet, the head a clear prominent part of the figure; body about 7.5 heads tall".
Result: Haar face h 158, ratio 0.1015 on the cut-out (0.0996 on the raw gen), vs m09 0.0993: +2.2% - IN the 0.098-0.107 gate (v9 was 0.0930). Forehead at 100% bare, no mark (c12_a18_v10_t6_forehead100.jpg). Headroom 258 px, feet visible. Embroidery: same rich stitched family as v9, with sprays + peonies over robe/sleeves/skirt, wide flower-and-gold borders, two small phoenixes; at 100% (c12_a18_v10_fabric100_m09_t4v5_t6v10.jpg: m09 | t4 v5 | t6 v10) denser and more all-over than t4 v5 on the skirt and sleeves. Side by side (c12_a18_v10_t4v5_v9_v10.jpg): clearly richer than Tần.
Weak points: embroidery is dense (closer to all-over than v9) and could read as a print at a glance; the outer sleeve edge is slightly sheer at the top. v9 has the lighter embroidery but a small face (0.0930); v10 has the correct face. No gens left on this order.
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_v10_t6_fresh.png (768x2000 transparent), overlay50, forehead crop, fabric zoom, t4v5_v9_v10 comparison; md5-verified. Nothing live.

## Round 30 — c12 a18 remaining ranks, batch 1: t1 + t2 (ROOT-14: owner 01:36Z approved c12 t6 v9 "đẹp đó"; GO t1,t2,t3,t5,t7,t8 one by one)

Method: images_generate gpt-2-6 768x2000 2k; refs: 1 live hd c12 tN design (t1 TdU7oc4VNR, t2 kspdSKI16B), 2 m09 eIyOFEidqL (rendering/fabric/skin/body only), 3 c12 por kspdyUo16B, 4 face-consort-12 huZA1bivqL, 5 approved c12 t4 v5 cut IfiRN6DtvE (only "the quality of the stitched embroidery and soft drape, NOT colour, NOT design"), style m09. Prompt = v10 clauses: HEAD SIZE paragraph (face = m09's face size, 1/10 hairline->feet), opaque soft matte coral... colour per rank, rich-by-rank stitched embroidery wording, ladder, one held item, bare forehead "NO hoa điền, no forehead flower, dot, jewel, tick or mark". 2 gens (160 cr) + 2 bg removals.
- t1: gen jUBIOZJLD0 -> cut 3z51cU4REY; apricot-orange; pearl string; ONE simple trâm + 1 pearl dangle, one side; modest sprays + narrow bands; ankle-length, slippers visible. Haar face h 154, ratio 0.0987 (m09 0.0993: -0.6%), in gate. Headroom 327 px.
- t2: gen eIy9v5edqL -> cut vQ2zbpea47; sky blue; scroll; trâm + small flower + 2 pearl dangles, one side; more sprays + embroidered bands on collar/sleeves/hem. Haar face h 147, ratio 0.0954 (-3.9%), inside +-5%. Headroom 338 px.
Checks: foreheads at 100% bare, no mark (r2_t1/t2_forehead100.jpg). t2 reads richer than t1 (vs_prev: t1 vs t4 v5, t2 vs t1). Fabric at 100% vs m09 (fabricl00: m09 | prev | this). Weak points: t1 outer sleeve layer slightly sheer; t2 sky-blue is pale; both hems ankle-length (floor from t3).
Files under https://ctm-img.victoria-tntt.workers.dev/img/_review/maid-consort-sample/ : c12_a18_r2_tK_fresh.png (768x2000 transparent) + _overlay50 + _forehead100 + _vs_prev + _fabric100 (K=1,2); md5-verified. Nothing live.
