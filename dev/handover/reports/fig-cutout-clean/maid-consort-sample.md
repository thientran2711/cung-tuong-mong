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
