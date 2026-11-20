# F4 — 4 NEW consort faces s62 s63 s64 (Dịu dàng) + s65 (Đoan trang) → 90 people
START_CTX ≈4 % of 1M (estimate; get_session read 0) · depth 1 (limit 8) · worker of Foreman C ROOT-66 (session_01PEhRbw4KJerwm5MeJ2pquL)
Owner: Lượt 1001 "…thiếu bao nhiêu thì làm ở cái số dịu dàng và đoan trang thêm cho đủ thôi … Thì bây giờ làm đủ 90 người." · 20/11 ~06:05Z "Rồi giờ bảng màu mà có thì tự vẽ luôn đi, đừng có đợi tôi nói nữa."
After: Dịu dàng 11 → 14 · Đoan trang 12 → 13 · total 86 → 90.

## STEP 1 (0 gens) — READY
- Builder dev/art/face-common/make_new_s62_65.py = make_kieuky_L761.py / make_quyenru_L761.py recipe (F1/F2 new faces): make_nf4 read-only,
  line(), T7 block of her group UNCHANGED (TYPES5 "Dịu dàng" / "Đoan trang" face + expr), EYES_STRAIGHT, strong closed mouth
  (OLD_MOUTH → NEW_MOUTH), FG.final (master block + D9 + face gate). Only the per-person rows are new (A17 diff = the rows below).
- Prompts: dev/art/face-common/s62.v5.FULL.txt … s65.v5.FULL.txt (~5.3k chars each).
- Gate: `python3 dev/art/check_store.py dev/art/face-common/sNN.v5.FULL.txt --scope face --pid sNN` → PASS ×4 (B20 root hex really checked: a 1-digit hex change FAILs).

| id | group | age | face swaps (vs T7 block) | hair | item (colour) | angle |
|---|---|---|---|---|---|---|
| s62 | Dịu dàng | 17 | smooth wide forehead · softly feathered curved brows | one long loose braid over the right shoulder, pearl clasp, ONE small white jasmine flower clasp | small wind chime of brass bells on a red silk cord | SR |
| s63 | Dịu dàng | 18 | softly rounded gently high cheekbones · slightly wide-set eyes · softly full lower lip | half-up: small soft low loop, one plain jade pin, rest long and loose | small chocolate-brown rabbit cradled in one arm | TL |
| s64 | Dịu dàng | 17 | round-almond eyes, soft double eyelids · slightly fuller straight brows sloping down · softly rounded nose tip | half-up: small rounded top-knot wrapped with tiny pearls, rest loose, two side locks | ripe golden-orange loquats on a short bare twig | FF |
| s65 | Đoan trang | 18 | gently rounded, softly broad cheekbones · slightly long level eyes, clear double lids · clearly defined lip bow | half-up: one small neat loop, pair of gold pearl-head pins, rest long and straight | brown sandalwood prayer beads | SL |

None of these faces / hair styles / items / angle mixes is used by the 11 Dịu dàng or 12 Đoan trang (their v3 prompts checked) or by each other.
Items "wind chime" and "loquat" appear in no other prompt in face-common; a live rabbit and prayer beads are held by no one (m16 holds a rabbit LANTERN; c24/m28 have rabbits embroidered).
Outfits: s62 ruqun + pleated skirt · s63 short half-sleeved jacket over inner top · s64 high-waisted chest-tied skirt + short top · s65 ruqun + knee-long overvest.

## ROOT-66 review fixes (06:11Z) — all applied, 0 gens
1. F1 hair (thiếu nữ = loose or half-up): s63, s64, s65 → half-up (wording from ROOT-66); s65 "double-loop" dropped (F14).
2. F13 one flower: s62 → "one small white jasmine flower clasp".
3. Items: s62 hoop (echo m03) → brass wind chime; s64 vase + sprig (echo m44) → golden loquats on a bare twig. Both are used by no one.
4. B16 item colour stated and outside both root families: wind chime brass + red cord (ice blue/blush) · rabbit chocolate-brown (peach orange/ivory) ·
   loquats golden-orange, bare twig (peony pink/smoke lilac) · sandalwood brown (leaf green/blush). The gate refuses "dark" on a colour word (B20 DEEP COLOUR),
   so it reads "red silk cord" and "brown sandalwood". RE-CHECK at GO against P6's roots.
5. Grammar: comma-joined swaps (s62 "oval face, a smooth wide forehead, smooth rounded cheeks…"; s64 "round-almond eyes, soft double eyelids, gently LOWERED…");
   s62 head tilt only once (in the block's Expression; removed from the pose).
6. s65 face: EGG-shaped (m08/m30) → "gently rounded, softly broad cheekbones" (no one uses it; "softly squared" would echo c28 "softly ROUNDED SQUARE").
   s62 "slightly SHORT oval" also dropped (c06/c01/c25 use "short oval").
7. Colours: still PLACEHOLDER (src says "NEVER GEN WITH THIS"); s64 moved off green (m02 moss) → peony pink; s65 → L* 61 (c06 CŨ lightness).
8. Gate command (exact): `python3 dev/art/check_store.py dev/art/face-common/sNN.v5.FULL.txt --scope face --pid sNN` → PASS ×4.
NOTE: the Dịu dàng / Đoan trang v5 blocks (TYPES5 in make_nf4) have NEVER been drawn (TYPES_v5.md l.6, Lượt 689: no new people for these groups
then) → the first sheet is also a test of the blocks themselves.

## Colours — PLACEHOLDER toned picks (to be replaced by P6's A32 roots at GO)
Written to s_root_colours.json (src = "F4 PLACEHOLDER …") so the B20 gate checks them. Chosen inside P5/P6's own A32 bands
(four_season86_a32.BAND, OKLCH: Dịu dàng main L .72–.84 C .07–.12 + light neutral phụ L .93; Đoan trang main L .61–.74 C .08–.13 + light neutral L .91),
season family from MAINF, phụ from NEUT. Checked with check_unique.pair_verdict (ΔE2000): no FAIL/WARN against any of the 86 root pairs
nor any same-season pair in palettes_season.json; B19 no grey; the 4 new mains ≥ 24 ΔE2000 from each other (closest s63–s64 24.0).
| id | root season | main | phụ | CIELab C* / L* of main |
|---|---|---|---|---|
| s62 | Đông | ice blue #70B8DD | blush pink #FFDEE7 | 28 / 71 |
| s63 | Hạ | peach orange #FEB894 | ivory #F3E7CE | 35 / 80 |
| s64 | Xuân | peony pink #F8B3D3 | smoke lilac #ECE2FE | 30 / 80 |
| s65 | Xuân | spring leaf green #71A166 | blush pink #FCD6E0 | 37 / 61 |

OPEN POINT (for the foreman): "ΔE ≥ 20 from every other person's root" cannot be met for the MAIN colour inside the toned bands. The
best in-band candidate is only ≈12 ΔE2000 from its nearest of the 86 root mains (86 soft roots fill the space). The picks are distinct as
PAIRS (pair_verdict clean) and from each other; nearest root mains: s62 8.3 (s52), s63 7.0 (s59), s64 5.8 (s54), s65 10.3 (s41). If P6 gives roots, they replace these.

## Notes (not changed, LAW #0)
- The shared Colour tone sentence (make_nf4 LOW_TONE "ONE medium tone level … coral-red / brick-red") + the MG1 COLOUR RULE "medium-light"
  are in every face prompt; for light Dịu dàng roots they may pull the robe a little deeper than the hex. Same as F1/F2.
- s_root_colours.json now has 60 s-ids (s62–s65 added). palettes3 scripts that read it (gen_palettes3.load_p1) will see them.

## STEP 2 — waiting for the foreman's GO (P6 palette). Then: take P6 roots (else keep these), re-run the builder + gate, 4 gens (1 try each,
~138 cr each), look at each, one sheet with big labels (name · group · "MẶT MỚI"), push, send the sheet path. FACE_CUTS untouched until owner OK.

Credits used: 0.

## c09 hand redraw (ROOT-66 GO; owner 20/11 ~06:45Z "Rồi sẵn tiện nha, vẽ lại cái cô C09 này đi. Cái tay của cổ này giờ tôi nhìn tôi mới để ý. Cái tay trái cổ cầm lồng đèn nhưng mà thực tế tay này là tay phải.")
- Builder dev/art/face-common/make_c09_hand.py → c09.v3h.FULL.txt = approved c09.v3.FULL.txt (gen xSBWQlajfW, cut xSBWFuTjfW, seed 7172, ref eIyOFEidqL) +
  ONE "HANDS:" sentence after the pose (lantern stick in her LEFT hand = right side of the picture, thumb on the upper side toward her body, 4 fingers
  under; other hand a correct RIGHT hand) + FG.final (master block + D9 forehead line: c09.v3 failed today's gate without them — M10, S34).
- Gate-forced word change (flag): B20 DEEP COLOUR refuses "deep rose" → "rose" ×4, hex #C16776 unchanged.
- Gate `python3 dev/art/check_store.py dev/art/face-common/c09.v3h.FULL.txt --scope face --pid c09` PASS.
- Gen w4atqqr7EI → cut UPvIb4owny, gpt-2-6 1024x2304 2k seed 7172, 1 try, 135 + 3 = 138 cr. (One earlier call was refused by the server before
  generating — bad model name — 0 credits.)
- Looked full size + hand zooms + face: lantern hand is now a correct LEFT hand (palm toward the viewer, thumb over the stick, four fingertips under it);
  OLD was the back of a hand with thumb on top = a right hand (owner was right). Other hand open, five fingers. Eyes level, lips closed, no teeth, no mark.
- Side changes (not fixed, L777): free hand hangs open (OLD lifted the skirt) · shoes pink (OLD blue) · collar embroidery now flowers · face a little
  less baby-round · skirt a touch lighter rose.
- Sheet: dev/handover/review-sheets/new-faces-v4/c09_hand_F4.jpg (make_sheet_c09_hand.py): CŨ | MỚI, full figure + hand zoom + face zoom, big labels.
- FACE_CUTS / FACE_MAP NOT switched (owner OK pending). Credits F4 total: 138.

## Earrings + colour re-pick (~07:00Z)
- Owner rule (ROOT-66 relay, verbatim "…không ai được đeo hoa tai."): "Bare earlobes: she wears NO earrings, nothing at the ears." added before
  "No text, no labels." in make_new_s62_65.py and make_c09_hand.py (skipped once NOEAR1 puts it in the master block). Gate PASS ×5 (s62–s65, c09.v3h).
- c09 picture already drawn (w4atqqr7EI): LOOKED at the ears — visible ear bare, other ear under the hair → no earring. c09.v3h.FULL.txt now also carries the sentence (for any rerun).
- P6 pushed (P6.md: "s62–s65 left out"; palettes_season_deep.json overwritten, owner OK "toned palette"). My earlier picks clashed with P6's
  same-season pairs (s63 FAIL c31/s49, s65 FAIL s32, s62 WARN s48) → re-picked (still PLACEHOLDER, no gens), no FAIL/WARN vs any same-season pair of P6's file:
  | id | season | main | phụ |
  |---|---|---|---|
  | s62 | Đông | ice blue #71B5D7 | mint mist #CDF2E0 |
  | s63 | Thu | amber #CB996C | ivory #F3E7CE |
  | s64 | Xuân | peony pink #F8B3D3 | smoke lilac #ECE2FE (unchanged) |
  | s65 | Đông | jade #4EA989 | peach cream #FBDAC1 |
  Mains ≥ 26 ΔE2000 apart. Nearest of P6's mains: s62 5.7 (s48) · s63 3.3 (m19) · s64 4.7 (m02 xuân) · s65 5.8 (s36). The Dịu dàng band is nearly full:
  only 2 clean candidates were left for s63, both at the band's darker edge (OKLCH L .72, L* 66).
  Item colours re-checked: brass + red cord (ice blue/mint) · brown rabbit (amber/ivory — brown is close-ish to amber, flag) · golden-orange loquats (pink/lilac) · brown sandalwood (jade/peach).

## c09 APPROVED (owner "Duyệt", Lượt 1044) → switched ~07:05Z
- FACE_CUTS_L703.json c09.cut xSBWFuTjfW → UPvIb4owny (src c09.v3h.FULL.txt) · FACE_MAP_L703.json c09 (gen w4atqqr7EI, ver v3h, kind HANDFIX-F4, group unchanged
  "Công chúa (Tinh nghịch)") · face crop face_page/faces/c09.jpg (crop.py on the new cut, looked) · ledger OWNER-OK line · LOOK_GROUPS.md line. No CDN step (F3's s44 had none).
- NOT touched: dev/art/earring-test/anchors.json + EAR1.md still use the old cut xSBWFuTjfW (c09, one ear picture-left) → EAR1 refits. The new picture
  also shows one ear on the picture's left, bare. face_page/ASSETS_L703.json + face_tick.html (old L703 page) also still list the old cut, same as s44 (F3 didn't update them).
