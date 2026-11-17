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
