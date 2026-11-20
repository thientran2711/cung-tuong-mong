# TANG1 report (worker of Foreman C #2) · START_CTX ≈ 3 % (estimate) · finished well under the roll line

## JOB A — Option 1 drawn (DROPPED by owner ~18:55Z, rule G27: never show these 3 again): s62 a18 xuân, t4/t5/t6, rank cape kept, Tang open neck — 3 gens, 405 cr, one try each, no cut-outs
Base = `build_all.py s62 4|5|6` (builder untouched). Test prompts dev/art/tang1/s62_t{4,5,6}_tang_xuan.txt (bases in the same folder).
Colours: s62 has no entry in palettes_season.json; her xuân pair is in face-common/palettes_season_deep.json: soft clear cool peach-blossom pink #EB8186 + ivory white #F4F0E6 (root = đông ice blue / mint mist). Swap = colour words + hex only ("peach-blossom pink", "ivory white").
Diff vs builder (A17):
- Added before "Hair:" (all 3, same text): "TANG NECKLINE (Tang dynasty): her inner layer is a high-waisted Tang skirt in ivory white tied ABOVE the bust as a strapless tube top (a chest-wrap with a gold-embroidered edge and a ribbon bow), under a light sheer silk outer jacket with a wide OPEN low neckline; her neck, collarbones and shoulder line show; modest, no cleavage; NO crossed collar, NO closed collar; {cape clause}." Cape clause: t4 "the capelet stays on her shoulders, open below the throat clasp"; t5 "the cloud collar sits on the shoulders only, never covering the neckline"; t6 "the two capes sit on the shoulders only, never covering the neckline".
- t4: removed "the low square neckline of rank 1, richer gold-brocade edge, NO crossed collar,".
- t6: "a pearl-edged collar and cape trim" → "a pearl-edged cape trim" (as RANK8-A2).
- Length trims (only duplicates of other lines in the same prompt): t4 dropped "Full-body standing figure head to feet, centered, plain light parchment background, soft even light;", "face clearly visible, 3/4 or frontal view.", "beautiful/handsome romantic-lead looks for everyone;", and the outfit's "her signature colour family … NOT a cream, beige or all-gold robe" clause (repeated by COLOUR RULE). t6 dropped the same first three + the final duplicate "Image 2 is only a colour reference for the royal yellow …" sentence (the same words stay inside the outfit sentence).
Gate: check_store --scope tp4/tp5/tp6 --age a18 → STORE CHECK PASS (approved PASS) for all 3. Lengths 9 993 / 9 005 / 9 724.
Gen-tool note: with 2 refs (t6) the tool counted ~233 chars more than the file (9 966 → "10 199"), 2 refused calls (0 cr). Keep 2-ref prompts ≤ ~9 760.
Gens (gpt-2-6 1024x2304 2k seed 7172; refs t4/t5 [nVsrRMPYQD], t6 [nVsrRMPYQD, TdwDfOyVNR]): t4 KLpIv3dkqp, t5 4RF1Lym9Aa, t6 ksetEJ616B. Ledger: 3 TANG-TEST lines.
Sheet (A37): dev/handover/review-sheets/tang1/s62_TANG1_t4-t5-t6.webp (438 KB) — per rank MỚI big | Hiện tại small | Thử cổ vuông (RANK8-A2) small.
Looked (honest):
- t5 Phi: best — clear Tang tube top with pink ribbon, open neck, collarbones visible, cloud collar with tassels on the shoulders, gold girdle. Face fine.
- t6 Quý phi: good — tube top + yellow bow/sash, two pearl-edged capes on the shoulders, open neck, necklace + pearl strands. Face fine.
- t4 Tần: tube top + ribbon visible below, but the capelet is still clasped high at the throat with the pearl net, so neck/collarbones are mostly covered; the "open" reads weakly. The 3/4-left angle came out only slightly turned. If the owner wants t4 more open: drop "fastened at the throat with a jade clasp" + "starts right at the collar at the throat" (needs her yes — no redraw done).
- Dangles next to the face on t5/t6 look like headdress tassels, not earrings; please check at full size.
- Colours: xuân pair (pink/ivory), so the sheet compares against her ice-blue current pictures — the colour change is the season swap, not part of the neckline test.

## JOB B — plan only (v3): dev/handover/reports/TANG1_plan_B.md — two FULL looks: T = Tang (rank = chest band), H = Han/Three Kingdoms deep crossed V (rank = stacked collar bands 2/3/4); test 405 cr each, 810 both. Rule G27 added (drop of Option 1).
Open question: t6 open neck vs G25 (t6 always closed).

## Phi test T vs H (owner GO ~19:10Z): 2 gens 270 cr — T fHzM1ekCDY, H hu205pSvqL; gate tp5 PASS (8 899 / 8 734 chars); sheet dev/handover/review-sheets/tang1/s62_t5_DUONG_vs_HAN.webp (new only). Looked: faces fine, no earrings, lips closed. T = open neck + strong chest-band block; H = crossed V modest depth, collar stack thinner. plan_B fixed: Tần starts at today's embroidery density.

## Owner picked T (G29): final T prompts s62 t4/t5/t6 written (dev/art/tang1/s62_t{4,5,6}_TANG_final_xuan.txt, 9 265 / 9 061 / 9 714 chars), PHI BẠCH placement sentence added; gate t5/t6 PASS, t4 expected FAIL S13 CAPELET CUT (capelet removed). H dropped in plan_B. No gens.

Total credits: 675.
