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
