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
