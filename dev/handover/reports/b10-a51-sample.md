# b10-a51-sample report (W64, sonnet painter)
PRIORITY #1 CHECK: per brief (OD 3 | ledger 3 | claims 8 | main 15 | review/* 0 | archive 0 -> no B10 a51 work existed).
Read in full: START_CORE/WORKER/ART, FIGURE_GATE, consort-B10, b10 tools README, brief (OWNER CLARIFIED wins).

## c03 a51 — READY (25 gens: 24 + 1 regen)
CDN: img/_review/consort-tiers/c03/b10-a51/ (c03_a51_sheet.jpg rows v0/v1/v2 x t1-t8; c03_a51_compare.jpg a18 v0 | a51 v0; 24 PNG c03_a51_tN_vK.png). cdn_sync --check: same 26/26.
Method: refs = LIVE img/hd/fig-consort-c03-tN-a51.webp (image) + m09 eIyOFEidqL (style); prompt "copy EXACTLY face, nose, hair, hairpins, costume... change ONLY pose to composed/calm"; v1 dusty rose-mauve, v2 dusty slate blue (t7 = that colour main + deeper golden yellow parts; t8 = muted golden yellow mixed with rose / blue).
| figure | gens | pass |
| all 24 | 1 each | pass by eye |
| v0 t7 | 2 | 1st gen drifted green->pink (FAIL), regen green OK |
Notes/flags for Foreman C:
1. Magnific returned 1024x2304 (not true 2K tall); same as brief's settings.
2. Live a51 t4-t7 carry a forehead dot (hoa dien) and the brief says copy exactly, so it is kept; FIGURE_GATE D2 says bare forehead. Foreman C to decide.
3. t8 v0 = exact live (green); only v1/v2 carry the muted yellow (v0 exact-copy rule).
4. v1 t1 lantern is red next to dusty rose robe — contrast is moderate; check.
5. Faces read slightly younger than live a51 in t1-t3; no pose lock issues. Hands often clasped (calm).
6. Not done: iou/edge check, no live push (nothing live).
Gen log (creation ids): ids in scratch c03/ids.txt (v0 t1 6AqPm0qiJO ...).

## HANDOVER (rollover)
Next: wait Foreman C OK, then c04 then c12 same method. Steps: upload 8 live a51 as image refs (creations_upload_image, folder ba4aecfe), 24 gens (3 batches of 8 parallel), creations_get urls -> dlmap.py, view rows, sheets via PIL, cdn_sync from scratch root (copy cdn_sync.py+manifest_guard.py from origin/main).
Prompt template: see c03 prompts (v0: "copy EXACTLY ... change ONLY the standing pose ... muted, toned-down colours (lower saturation, softly greyed), not dark, not deep, not heavy"; v1/v2 add "change ONLY the robe colour to muted <colour>").

## c03 FIX round (Foreman C order 15:57Z)
Removed forehead dot t4-t7 (all versions) + replaced t6 phoenix by flowers/cranes/butterflies: 12 regens, 1 gen each, all pass by eye (total c03 gens = 37). Old kept locally as *_prev_dot_phx (not stored in git/CDN).
Open flag: t5 v0 still shows a faint phoenix-like bird near the hem (original); not reported by Foreman, check.
## HANDOVER v2 — W64 near rollover; successor does c04 then c12
Apply from the start: bare forehead (no dot), no phoenix on t1-t6 robes (flowers/cranes/butterflies), t7/t8 keep phoenix; copy the live a51 exactly, change only pose (+robe colour v1/v2: dusty rose-mauve, dusty slate blue; t7 main colour + deeper golden yellow parts; t8 v1/v2 muted golden yellow mixed with rose/blue; t8 v0 = original). Scratch root for CDN: /home/user/wt/w64-work/cdnroot (may be gone; rebuild from origin/main dev/site/cdn_sync.py + manifest_guard.py).

## W64b (successor) — c03 t5 fix + c04 + c12 (18/11)
Read in full: START_CORE/WORKER/ART, FIGURE_GATE, consort-B10, tools README, brief (OWNER CLARIFIED wins), W64 report. Re-applied FIGURE_GATE C4d/D2/D3/D3c before every person.
Method: refs = LIVE img/hd/fig-consort-<cNN>-tN-a51.webp (image) + m09 (style); "copy EXACTLY face/nose/hair/hairpins/costume; change ONLY pose to composed/calm"; bare forehead; v1/v2 add "change only the robe colour to muted <colour>"; every prompt carries the muted/not dark/not deep/not heavy wording and the stitched-embroidery wording; no soft/feet wording.
- c03 t5 v0/v1/v2: long-tailed phoenix replaced by cranes/peonies/butterflies, no dot; 3 gens, all pass (c03 total gens = 40). Old *_prev_phx kept locally only. Sheet + compare rebuilt, CDN img/_review/consort-tiers/c03/b10-a51/ (26/26 same).
- c04: 24 gens (1 each) pass by eye. v0 original purple muted, v1 sage green, v2 dusty slate blue. Teacups t2/t4/t5 -> round fan / orchid branch / silk book; t4-t6 golden birds -> cranes/flowers/butterflies; t5 dot removed. t7 own colour + deeper golden yellow parts; t8 v1/v2 muted golden yellow mixed with sage/blue; t8 v0 exact. CDN img/_review/consort-tiers/c04/b10-a51/ (26/26 same).
- c12: 24 gens (1 each) pass by eye. v0 original pale green, v1 dusty rose-mauve, v2 dusty slate blue. Teacups t3/t5/t6/t7 -> round fan / silk book / lotus-bud branch / peony sprig; t1 raised-hand pose -> folded fan held low; t4 given a peony branch (live had no item); t4-t6 birds -> cranes; dots removed. t7/t8 as c04. CDN img/_review/consort-tiers/c12/b10-a51/ (26/26 same).
Flags: (1) t8 v0 / t7 v0 are the exact live colours (v0 original rule); only v1/v2 carry the muted yellow. (2) Held items changed on cup ranks per D3 (cup ban beats "copy exactly"). (3) Faces read slightly younger than live a51 in places; hairpins on v1/v2 may drift slightly from v0 (original-hair instruction given, not enforced by iou). (4) No iou/edge check; nothing live. 
Context: worker ~well under rollover ceiling; no handover needed beyond this. Magnific images are 1024x2304.

## W64b ROW-SCAN + HANDOVER (ROOT-26 order 16:20Z: v1/v2 rows of c03, c04, c12 = 8 DIFFERENT muted colours each; one READY for all 3)
My c03/c04/c12 v1/v2 rows are ONE colour per row = FAIL C3 (my miss: I followed W64's per-person colour). v0 rows are fine (original colours). Redo = 48 gens (3 persons x 2 rows x 8), same refs/prompts (live a51 + m09), only the colour clause changes per rank. Old files -> *_prev_row.png (local), rebuild sheet2.py + compare.py (scripts in /home/user/wt/w64b-work, lost if container is gone: tools = dev/handover/reports/consort-b10-tools/{dlmap,sheet2}.py).
ROW SCAN (colour per rank; every colour muted = toned down/greyed, never dark; each differs from that rank's v0 original and from the other version; no repeat inside a row; held items stay as in the first pass: c04 t1 beads t2 round fan t3 handkerchief t4 orchid t5 book t6 scroll t7 flower sprig t8 hands+beads; c12 t1 folded fan t2 scroll t3 round fan t4 peony t5 book t6 lotus bud t7 peony t8 small fan; c03 live items as W64; contrast the item with each new robe colour):
| rank | c03 v1 | c03 v2 | c04 v1 | c04 v2 | c12 v1 | c12 v2 |
| t1 | dusty rose | dusty slate blue | sage green | dusty apricot | dusty rose-mauve | muted lavender-grey |
| t2 | muted apricot | muted lavender | dusty teal | dusty rose | muted apricot | dusty slate blue |
| t3 | dusty teal | muted plum-mauve | muted sand-gold | slate blue | muted lavender | muted terracotta-rose |
| t4 | muted lavender | muted terracotta | dusty rose | sage green | dusty teal | muted dusty plum |
| t5 | muted terracotta | dusty teal | dusty slate blue | muted apricot | muted plum | dusty blue-grey |
| t6 | dusty blue-grey | muted dusty rose | muted apricot | dusty teal | dusty blue-grey | muted terracotta |
| t7 | muted plum + deeper old-gold parts | dusty blue + deeper old-gold parts | dusty teal + deeper old-gold | dusty rose + deeper old-gold | dusty blue + deeper old-gold | muted plum + deeper old-gold |
| t8 | muted old-gold + dusty rose | muted old-gold + dusty teal | muted old-gold + sage | muted old-gold + slate blue | muted old-gold + dusty blue | muted old-gold + dusty rose |
(three families per rank: v0 original / v1 / v2 all different; c03 v0 green, c04 v0 purple, c12 v0 pale green are never reused.)
Prompt template used (copy, change the item + colour): "Image 1 is the figure to copy; the style reference supplies skin, drawing style and fabric rendering. Copy EXACTLY the face, nose, hair, hairpins and headdress, costume cut and layers, fabric material and stitching of image 1. Change ONLY the standing pose to a composed, calm, dignified stance, holding ONE <item> in a contrasting colour (no cup) and interacting with it, and change only the robe colour to muted <colour> (the paler inner robe a pale tone of it). Muted, toned-down colours (lower saturation, softly greyed), not dark, not deep, not heavy. Clean bare forehead, no dot or mark. <t1-t3: flower embroidery only; t4-t6: any birds = embroidered cranes, flowers, butterflies, no phoenix, no long-tailed bird; t7/t8: phoenix stays main motif>. All embroidery is real silk-thread stitched directly into the fabric, flat, not appliqué, not pasted, not raised. Soft closed-lip faint smile, eyes open, beautiful dignified mature lady, hair warm dark-brown. Full-body standing figure head to feet, transparent background." Params: gpt-2-6, 1024x2304, 2k, transparentBackground, refs [{image: live-a51 upload}, {style: eIyOFEidqL}], folder ba4aecfe-efce-47e2-b53f-30d292091886. Live a51 upload ids (folder, reusable): c04 t1..t8 = gOtj5HASXO jUBkFFzLD0 8a6dTDgIrU TdUYZnfVNR kspqC5N16B bxVQaKr5Y2 gOtjKOrSXO 5jMFflRKxe; c12 t1..t8 = kspbllL16B KLDqsgikqp xSXkUymjfW kspbly616B s78xJZ9l8e yiE73VxPW9 4RQOZdL9Aa P3uJRBa42C; c03 t5 = 9ZFOlwLNYZ (others: upload img/hd/fig-consort-c03-tN-a51.webp).
Do next (successor): c03 (16 gens; v1/v2 t5 also per table, keeping cranes/no dot), then c04, then c12; look at every image; CDN dev/site/cdn_sync.py from a scratch root (copy cdn_sync.py + manifest_guard.py from origin/main); upload explicit file paths RELATIVE TO the scratch root; --check; one READY with all 3 sheets + compares + gens. Gens so far: c03 40, c04 24, c12 24 (first pass, v1/v2 rows now to be replaced).
