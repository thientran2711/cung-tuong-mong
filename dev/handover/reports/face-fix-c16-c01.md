# REPORT face-fix-c16-c01 (W51, sonnet) — STATUS: SCAN DONE (c01), ALPHA TOOL PARTLY WORKS, NOT READY — ROLLOVER HANDOVER below
PRIORITY #1 CHECK: brief face-fix-c16-c01.md read in full; START_CORE/START_WORKER/START_ART/FIGURE_GATE skimmed (D1 own face, D2 clean forehead, D4b closed-lip smile); no existing fix on main/review (brief's own check: 0).

## Orders (verbatim from FOREMAN_C_STATUS)
1. (05:58Z) ART FIX fig-consort-c16 — brownish smear on the RIGHT CHEEK in the face reveal / mirror close-up (reviewer of face-zoom-stretch, also on live baseline; reports/review-face-zoom-stretch.md 8d79fbd). Fix the picture (gpt-2-6), LOOK whole face at 3x, _review first, report to main.
2. (06:15Z) ART FIX c01 cut-out (fig-consort-c01 a18 live figure set): dark speck right of the mouth + ragged holes on the right cheek/hair edge (reports/look-fx-wire.md R9d). Clean the cut-out (alpha) on the live figure set, LOOK whole face 3x.

## What I found (all looked at 3x, CDN files downloaded to /tmp, container only)
- Live a18 c01 t1–t8: por (384x506), fig (406x900) and hd fig (749x1800) are CLEAN at the right cheek/hair edge and beside the mouth (no speck, no holes; checked t2 at 4x on all three sizes). So the fault is NOT on the a18 set named in order 2.
- The harness shot that shows the fault (CDN img/_review/look-fx-wire/fold-c01-bui-lv1.jpg, stage face panel) is c01 t2 (flower left, cup) at an OLDER AGE: img/hd/fig-consort-c01-t2-a26.webp (also fig/ and por/ a26 presumably) shows exactly: ragged cut-out edge on the right cheek/jaw, bluish fringe bits, holes in the right hair edge, a dark patch beside the mouth at the jaw line. a36/a51 and other tiers/ages not yet individually looked at (all share the a26 cut-out recipe; sheet c01_ages looked: a36/a51 hair edge looks similar).
- c16: the brownish smear / stray hair strands are visible at the right cheek edge on live a18 por t1, t2, t3 (t4 mild) and on a26 hd t1/t2/t4 (alpha leftover of hair strands over the cheek edge, i.e. cut-out/portrait-patch edge, not a paint stain). Which exact file the reviewer saw at Fold is not stated in review-face-zoom-stretch.md (it only says "fig-consort-c16 reveal at Fold").
- A "blue" metric on the pixels finds 0 in every file: the "blue speck" is the dark page background showing through alpha holes, so the fix is alpha/edge, not colour.

## Why I stopped
Scope is ambiguous and large: 2 figures x ~44 variants (t1–t8, tm0–4, ty1–8, kc/ngheo/tcold) x 4 ages x 3 sizes (por/fig/hd). Order 2 names a18 but a18 is clean; the fault is at a26 (and probably a36/a51). I will not guess and fix ~400 files.

## ASK to Foreman C (answer by send_message, then I continue)
1. Confirm: fix c01 AGE a26 (+ a36, a51?) t1–t8 (+ tm/ty?) instead of a18? Or only the exact files the owner sees (which age/tier does the owner's character use)?
2. c16: same question (age/tier/size of the reveal at Fold), or fix all ages t1–t8.
Plan once confirmed: alpha edge repair first (morphological close of alpha holes inside the face skin region, remove dark/blue fringe, feather the cheek edge), then Magnific gpt-2-6 retouch ONLY if skin pixels are missing; outputs to img/_review/face-fix/<cNN>/; live|fixed 3x sheet.

## Gens / credits
0 Magnific gens, 0 credits used. Gens table: n/a yet.

~10% xong / ~0% chơi được


## UPDATE 11:55Z — Foreman C ordered the WHOLE GROUP (all ages x t1-t8 x sizes, both figures)
Scan (hd cheek crops of all 64 hd files, 4x4 sheets looked; script dev/art/face-fix/cheek_sheets.py, downloader dl_variants.py). Automatic metrics (alpha notch, bluish pixels) did NOT separate faulty from clean files (the "blue speck" is low-alpha cream/skin pixels over the dark page, RGB itself is not blue; crowns/hair wisps also score high), so the table is by LOOKING at every crop:
| fig | age | tiers with the fault (right cheek/jaw by the mouth: semi-transparent smudge + ragged edge) | clean |
|---|---|---|---|
| c01 | a18 | none | t1-t8 |
| c01 | a26 | t1 (ragged), t2 (blue speck by mouth), t3 (speck) | t4-t8 |
| c01 | a36 | t1 (speck by mouth), t5 (smear by mouth) | t2-t4, t6-t8 |
| c01 | a51 | t1 (dark speck by mouth); t3/t5 only mild edge | t2, t4, t6-t8 |
| c16 | a18/a26/a36/a51 | NOT YET LOOKED (sheets sh_c16_*.png generated in /tmp only) — from the earlier look: a18 por t1-t3, a26 hd t1/t2/t4 | pending |
(por and fig are the same cut-out at smaller size; apply the same tier list to por/fig/hd; tn not found in the CDN index for these names.)

## Tool tried: dev/art/face-fix/alpha_fix.py (Haar face rect + skin blob; fades light low-alpha pixels outside the face outline in the lower-right cheek/jaw zone, fills notches inside it)
Test c01 t2 a26 hd (before|after at 2.5x, looked): speck by the mouth REMOVED, jaw edge smoother. BUT it leaves a hard-edged stub of the hair lock beside the cheek and a slightly straight neck edge — not good enough to ship; a clean result needs a re-matte of the 2K source or a Magnific gpt-2-6 retouch on opaque background + remove_background (not done, 0 gens).
## ROLLOVER HANDOVER (W51 near context ceiling)
- Successor: (1) look sheets for c16 (run dl_variants.py, cheek_sheets.py; mediapipe wheels do not exist for py3.13 here: use cv2 Haar as in alpha_fix.py; pip scipy numpy opencv-python-headless==4.10.0.84); (2) finish the table; (3) for each faulty file: Magnific gpt-2-6 retouch of the face edge ON A PLAIN BACKGROUND (ref = the same live figure) then images_remove_background, or hand-tune alpha_fix.py (zone rows .5-1.3, hair-lock stub is the open defect); (4) outputs img/_review/face-fix/<cNN>/; (5) before|after 3x sheet; gens table.
- Nothing uploaded, 0 gens, 0 credits.

~20% xong / ~0% chơi được

---
# W51b FINAL — READY face-fix-c16-c01 (18/11, sonnet)
PRIORITY #1 CHECK: brief + W51 report read in full; FIGURE_GATE D1/D2/D4b re-read (face stays the live figure's own, forehead untouched, mouth untouched); dev/art/face-fix tools reused; no other fix on main/review (brief check 0).
## Method (what worked)
1. Magnific gpt-2-6 was tried FIRST and REJECTED: whole-figure regen (pilot c01 t2 a26) redesigned face/hairpins; gpt-2-6 head-crop regen redrew the face (sharper, added a mole) and cannot be blended back; images_retouch has no gpt-2-6 model (rule: gpt-2-6 only). 2 gens, 160 credits spent on the pilot, thrown away.
2. Fix used: live file composited on an opaque beige, images_remove_background (Magnific, 3 credits each) = fresh matte of the SAME pixels; new alpha/colour taken ONLY in the face-edge zone (right cheek/jaw/hair edge, feathered), everything else is the untouched live pixel. fig = hd resized to the live fig size; por re-matted on its own (por is a separate source). 1 file = c16 t2 a18 had a real pixel fault (pale haze on right cheek beside the mouth, in the source colour too): skin-tone inpaint of that patch (hd + por).
3. Faults removed: dark/blue speck beside the mouth, semi-transparent smudge, ragged cheek/jaw edge, holes in the right hair edge. Face, mouth, forehead, eyes untouched.
## Table (hd + fig + por, all sizes; 20 sets = 60 files)
| fig | age/tier | fault | fix | gens |
|---|---|---|---|---|
| c01 | a26 t1 | ragged cheek edge, speck | re-matte zone | rm 2 (hd,por) |
| c01 | a26 t2 | speck by mouth | re-matte | 2 |
| c01 | a26 t3 | speck by mouth | re-matte | 2 |
| c01 | a36 t1 | speck by mouth | re-matte | 2 |
| c01 | a36 t5 | smear by mouth | re-matte | 2 |
| c01 | a51 t1 | dark speck by mouth | re-matte | 2 |
| c01 | a51 t3 | mild edge | re-matte | 2 |
| c01 | a51 t5 | mild edge | re-matte | 2 |
| c16 | a18 t1 | ragged jaw/cheek edge | re-matte | 2 |
| c16 | a18 t2 | brown/dark smear + pale haze by mouth (reviewer's fault) | re-matte + haze inpaint | 2 |
| c16 | a18 t4 | ragged hair/cheek strands | re-matte | 2 |
| c16 | a18 t5 | ragged cheek edge | re-matte | 2 |
| c16 | a26 t1 / t4 / t5 | ragged edge, smear at t5, strand patch at t4 | re-matte | 2 each |
| c16 | a36 t1 / t4 / t5 | ragged edge | re-matte | 2 each |
| c16 | a51 t5 / t6 | ragged edge | re-matte | 2 each |
Scanned and left UNTOUCHED (no visible fault or only hair-wisp softness): c01 a18 all, a26 t4-t8, a36 t2-t4/t6-t8, a51 t2/t4/t6-t8; c16 a18 t3/t6, a26 t2/t3/t6, a36 t2/t3/t6, a51 t1-t4; t7/t8 crown tiers of both figures (their fringe is crown pearls/tassels, not the cheek). Re-matte was also run on c16 t1-t6 x 4 ages (48 files) and c01 flagged sets to judge; only the sets above are shipped.
Open/noticed, not mine: c16 t2 a36 eyes closed, hoa dien visible on c16 t4 a18 / t5 a51 etc. (FIGURE_GATE D2/D1 matters, other task).
## Gens / credits
Magnific gpt-2-6 gens: 2 (160 cr, rejected pilot). images_remove_background: 1 pilot + 16 c01 + 48 c16 = 65 x 3 = 195 cr. Total ~355 cr. Final shipped files: 60 (20 sets x hd/fig/por), 0 gpt-2-6 pixels in them.
## URLs (CDN _review only, nothing live, no JSON)
- c01: https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fix/c01/{hd/fig-consort-c01-tT-aA.webp, fig-consort-c01-tT-aA.webp, por-consort-c01-tT-aA.webp}; 3x sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fix/c01/before-after-3x-c01.png
- c16: https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fix/c16/... same layout; 3x sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fix/c16/before-after-3x-c16.png
- intermediates (opaque sources) https://ctm-img.victoria-tntt.workers.dev/img/_review/face-fix/_src/ (wipe with the verdict: cdn_sync.py --wipe-review face-fix)
- tools: dev/art/face-fix/ (merge/haze logic was inline; re-matte = Magnific images_remove_background on an opaque composite).
## To go live
Copy the 60 files over img/hd/fig-*, img/fig-*, img/por-* with the same names (same sizes as live; checked hd dims match, fig = live size) after owner/MAIN OK.
READY face-fix-c16-c01
~90% xong / ~0% chơi được (chưa lên live, chờ sếp duyệt)
