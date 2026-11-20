# ITEMFIX2: t4 Tần + t6/t8 prompts shortened to ≤ 10 000; 3 test gens on m03. DONE
depth 3 · START_CTX ≈ 3 % (context_usage read 0; own estimate) · worker for Foreman C #3 (session_01D3E3Naoh7q3mHkW5tL3iwm) · 405 credits (3 gens × 135, 1 try each, no cut-outs).
Owner GO verbatim: "Ok làm đi, rồi chạy magnific 1 người test lại coi có khác không". Part 2 was changed by Foreman C #3 (owner verbatim): "Tức là bây giờ run lại hết cái prompt của người nào đổi, Quý Phi, Hoàng hậu và Tần … trên một người mới hoàn toàn mình chưa từng run. Nếu mà nó thành công á, thì mình giữ lại cái mẫu của người đó luôn".

## 1. Shortening (only filler and repeated words; same garments, collar, colours, embroidery level and items)
| rank | where | before → after |
|---|---|---|
| t4 Tần | build.py build_low t==4 outfit | "an embroidered silk sash with hanging jade belt pendants … and as her ONE signature piece, clearly visible at game size, a short round capelet covering only the shoulders and upper chest, of embroidered silk with a smooth round outline (not cloud-shaped, not scalloped, not pointed), fastened at the throat with a jade clasp" → "… with jade belt pendants and tassels, and her ONE signature piece: a short round embroidered silk capelet (not cloud-shaped, scalloped or pointed) over only the shoulders and upper chest, a jade clasp at the throat" |
| t4 | TAN_CAPE_PEARLS (pearl yoke + F1 full length) | 493 → 234 chars: ", with a beaded yoke over it: an airy open net of sparse pearls and small jade beads with tiny gold flower studs, lying flat from the throat over the WHOLE capelet, its short pearl fringe at its lower edge, never only half of it". The old text is kept in the file as a comment |
| t4 | outfit tail | "no cloud collar, no vest, no stiff shoulder pieces" → "no cloud collar, vest or stiff shoulder pieces"; "gold and jade hairpins and small dangling gold bu yao tassel hairpins" → "… hairpins with small dangling gold bu yao tassels"; ", gold only as embroidery accents" removed (said again in COLOUR RULE and TWO-COLOUR RULE) |
| t4 | build_all capelet_cut() = approved **S13** (check_store table + proof c06_t4_a18 + APPROVED_SENTENCES.md regenerated) | "CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is {shape}; the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, graceful (uyển chuyển), never boxy." (the per-person shape is unchanged) |
| t6 Quý phi | YEL_T6 / LUX_T6 | luxury list with fewer filler words (same items: gold embroidery, pearl-edged collar + cape trim, pearl strands, grander headdress; the "; more luxury than the rank below" marker is kept because the build checks for it). Yellow: "plus clearly visible royal yellow: a yellow inner robe panel, sash and narrow borders, exactly the colour of the flat colour swatch image (…hex…)". The in-outfit "image N is only a colour reference, never copy anything but its colour" is dropped: the closing "Image N is only a colour reference for the royal yellow …" sentence says the same thing and is kept (the swatch ref and coverage.py use it) |
| t8 Hoàng hậu | build.py Empress outfit line only (Nữ đế untouched) | "long ceremonial silk mantle falling from" → "long silk mantle from"; "(far denser and richer embroidery than any other rank)" → "(far denser than any other rank)"; the duplicate ", floor-length robe, only slipper toe tips peeking under the hem" is dropped (the approved closing S19 sentence has it); "; the most splendid outfit of all, clearly grander than every other rank" is dropped (the outfit label and the GRANDEST crown already say this) |

### Checks
- Whole plan, every drawn person × t1–t8, a18 + a26, normal AND `--season dong` (3 584 prompts, before/after dump): 2 244 byte-identical, 1 340 changed (only t4/t6/t8). Putting the old words back makes every one of the 1 340 byte-identical to before, except that 214 winter prompts now KEEP their ANGLE sentence. **0 extra diffs** (no pose, angle or item pick moved).
- LENGTH a18/a26: before, 48 + 49 t4 normal, 8 + 7 t6 normal, 51 + 51 t4 đông, 4 + 4 t6 đông and 5 + 4 t8 đông were over 10 000. **After: 0 over 10 000 anywhere** (normal max: t4 s59 a26 = 10 000 exactly by Python len; the gate passes it).
  Winter prompts that still drop ANGLE (were → now): t4 81/80 → 14/14, t6 40/32 → 14/16, t8 37/34 → 17/15. t3 (8/7) and t7 (11/12) are untouched (not in this job).
  s59 t4 a18: 10 569 → 9 976. a26: 10 613 → 10 000.
- Gate: build_all CLI (store + approved) PASS 16/16 (s59 t4 a18/a26/đông, c06 t4, m24 t4 a26, s57 t4 đông a26, s44/s57/c06/m03 t6, s38 t6 đông, s59/c06/m03 t8, s57/s59 t8 đông). `check_store.py --self`: only S19 PROOF MISMATCH (owner-copy/pr_cl_t2_V2.txt), which was there before.
- Not in scope, all already failing before (now shorter): a36+ t4/t8 LEN (e.g. s59 t4 a36 10 661 → 10 042), c06 Thái hậu a36 (10 076, S19, unchanged).

## 2. Gens (m03 = approved face, never drawn at any rank; ledger kind RANK-ITEMFIX2, real pictures, not TEST)
Settings: gpt-2-6 1024×2304 2k, seed 7172, folder ba4aecfe…; refs: her KC ref bxMlxKk5Y2 (+ swatch TdwDfOyVNR for t6/t8). The prompt Magnific stored = the file, byte-identical (checked).
| rank | prompt | chars | gen |
|---|---|---|---|
| t4 Tần a18 | dev/art/itemfix2/m03_t4_a18.txt | 9 215 | P3QrRn242C |
| t6 Quý phi a18 đông | dev/art/itemfix2/m03_t6_a18_dong.txt | 9 479 (ANGLE kept) | dt4AmiwXSL |
| t8 Hoàng hậu a18 đông | dev/art/itemfix2/m03_t8_a18_dong.txt | 9 413 (ANGLE kept) | jUoC7NPLD0 |
Sheet (A37): `dev/handover/review-sheets/itemfix2/m03_t4_t6dong_t8dong.webp`: the 3 new pictures big, her approved face ref small (she has no rank picture yet), VN labels.
LOOKED (full size): all 3 have a closed mouth, no teeth, eyes aligned, no forehead mark, no earrings, one held item, one hair flower (t4/t6), none at t8.
- t4: slate-blue robe + warm-ivory skirt/linings, lotus borders + a few large lotuses, short round capelet with a jade clasp and the pearl net over the WHOLE capelet with a pearl fringe at its edge, sheer ivory phi bạch, one hand raised to the hairpin and the other holding magnolia. Notes: the collar reads more as a small stand collar over the crossed robe; the body turn to the LEFT is mild (nearly frontal).
- t6 đông: two pearl-edged shoulder capes, yellow panel + sash, wide ivory fur, opaque ivory shawl, big gold headdress + large flower, butterfly hairpin held in both hands.
- t8 đông: yellow mantle dominant with phoenixes + peonies + clouds, slate-blue inner robe, nine-phoenix crown, pearl-fringed cloud collar, widest fur, a letter held at the chest.
Owner verdict needed (only "duyệt" approves).

## Files
dev/art/t8-prompt-B/build.py, store-all/build_all.py, check_store.py (S13), APPROVED_SENTENCES.md, approved/proof/c06_t4_a18.txt, itemfix2/*.txt, gen_ledger.jsonl, this report, the sheet.

## HANDOVER (ITEMFIX2 rolls over by context: START_CTX ≈ 3 %, now 27.4 % of 1 M; threshold 28 %) — depth 3
NOT STARTED: Foreman C #4 job (session_01D3E3NZPt7cysxtbybnExBK), owner GO Lượt 1260, gist verbatim: "thử rên cái prompt y chang như vậy cho bậc Tần ở bên mình thử xem, nhưng mà là một người mới hoàn toàn". ONE Magnific gen (~135 cr), one try:
- Person: a NEW approved face, never drawn at any rank (not m03, not s62). Candidates checked by me (approved face, 0 ledger lines, no rank picture in the repo): m06 m11 m17 m21 m23 m40 m45 m50 m52 (m24 had old maid figures; m01/m30 have ledger lines). Tell #4 who before firing.
- Prompt: `python3 dev/art/store-all/build_all.py <p> 4 a18` (gate PASS = exit 0), then swap ONLY the fabric words as in dev/art/seasons4/m03_t4_VAI_DOAN.txt (medium-weight silk SATIN đoạn: the FABRIC sentence, "layered satin (đoạn) robe", "clearly <her colour> satin", "The satin has real weight, a little more than thin silk:"). No CAPTION line. ≤ 10 000. Run the gate on the swapped text (`python3 dev/art/check_store.py <file> <p> v0 --nostyle --low 4`) and report any FAIL honestly (S-rule wording may differ).
- Settings exactly like m03: images_generate mode gpt-2-6, 1024×2304, resolution 2k, seed 7172, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs = her KC ref (`python3 dev/art/kc_ref.py <p>` → ref_id), no swatch at t4. Paste the prompt verbatim, then check creations_get metadata.prompt == file.
- Ledger kind RANK-TEST-DOAN. Sheet: new picture big + her face ref small + m03 t4 silk (gen P3QrRn242C) for comparison, VN labels (DejaVuSans, webp in dev/handover/review-sheets/). LOOK full size, push, report to Foreman C #4.
