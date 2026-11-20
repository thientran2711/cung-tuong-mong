# F4 — 4 NEW consort faces s62 s63 s64 (Dịu dàng) + s65 (Đoan trang) → 90 people
START_CTX ≈4 % of 1M (estimate; get_session read 0) · depth 1 (limit 8) · worker of Foreman C ROOT-66 (session_01PEhRbw4KJerwm5MeJ2pquL)
Owner: Lượt 1001 "…thiếu bao nhiêu thì làm ở cái số dịu dàng và đoan trang thêm cho đủ thôi … Thì bây giờ làm đủ 90 người." · 20/11 ~06:05Z "Rồi giờ bảng màu mà có thì tự vẽ luôn đi, đừng có đợi tôi nói nữa."
After: Dịu dàng 11 → 14 · Đoan trang 12 → 13 · total 86 → 90.

## STEP 1 (0 gens) — READY
- Builder dev/art/face-common/make_new_s62_65.py = make_kieuky_L761.py / make_quyenru_L761.py recipe (F1/F2 new faces): make_nf4 read-only,
  line(), T7 block of her group UNCHANGED (TYPES5 "Dịu dàng" / "Đoan trang" face + expr), EYES_STRAIGHT, strong closed mouth
  (OLD_MOUTH → NEW_MOUTH), FG.final (master block + D9 + face gate). Only the per-person rows are new (A17 diff = the rows below).
- Prompts: dev/art/face-common/s62.v5.FULL.txt … s65.v5.FULL.txt (~5.3k chars each).
- Gate: check_store --scope face --pid sNN → PASS ×4 (B20 root hex really checked: a 1-digit hex change FAILs).

| id | group | age | face swaps (vs T7 block) | hair | item | angle |
|---|---|---|---|---|---|---|
| s62 | Dịu dàng | 17 | slightly SHORT oval + smooth wide forehead · softly feathered curved brows | one long loose braid over the right shoulder, pearl clasp, small jasmine flowers | round embroidery hoop, half-stitched white orchid, both hands | SR |
| s63 | Dịu dàng | 18 | softly rounded gently high cheekbones · slightly wide-set eyes · softly full lower lip | soft low looped nape bun, one plain jade pin | small white rabbit cradled in one arm | TL |
| s64 | Dịu dàng | 17 | round-almond eyes, soft double lids · slightly fuller straight brows sloping down · softly rounded nose tip | high rounded crown bun wrapped in tiny pearls, silver pin, two side locks | small blue-and-white porcelain vase with one apricot-blossom sprig | FF |
| s65 | Đoan trang | 18 | classic EGG-shaped oval · slightly long level eyes, clear double lids · clearly defined lip bow | smooth double-loop chignon, pair of gold pearl-head pins | long string of sandalwood prayer beads | SL |

None of these faces / hair styles / items / angle mixes is used by the 11 Dịu dàng or 12 Đoan trang (their v3 prompts checked) or by each other.
Outfits: s62 ruqun + pleated skirt · s63 short half-sleeved jacket over inner top · s64 high-waisted chest-tied skirt + short top · s65 ruqun + knee-long overvest.

## Colours — PLACEHOLDER toned picks (to be replaced by P6's A32 roots at GO)
Written to s_root_colours.json (src = "F4 PLACEHOLDER …") so the B20 gate checks them. Chosen inside P5/P6's own A32 bands
(four_season86_a32.BAND, OKLCH: Dịu dàng main L .72–.84 C .07–.12 + light neutral phụ L .93; Đoan trang main L .61–.74 C .08–.13 + light neutral L .91),
season family from MAINF, phụ from NEUT. Checked with check_unique.pair_verdict (ΔE2000): no FAIL/WARN against any of the 86 root pairs
nor any same-season pair in palettes_season.json; B19 no grey; the 4 new mains ≥ 32 ΔE2000 from each other (closest s63–s64 32.4).
| id | root season | main | phụ | CIELab C* / L* of main |
|---|---|---|---|---|
| s62 | Đông | ice blue #70B8DD | blush pink #FFDEE7 | 28 / 71 |
| s63 | Hạ | peach orange #FEB894 | ivory #F3E7CE | 35 / 80 |
| s64 | Xuân | young bud green #9FBC83 | orchid mist #FEDCF5 | 32 / 72 |
| s65 | Thu | plum #AB6E9E | ivory #ECE0C8 | 35 / 54 |

OPEN POINT (for the foreman): "ΔE ≥ 20 from every other person's root" cannot be met for the MAIN colour inside the toned bands. The
best in-band candidate is only ≈12 ΔE2000 from its nearest of the 86 root mains (86 soft roots fill the space). The picks are distinct as
PAIRS (pair_verdict clean) and from each other; nearest root mains: s62 8.3 (s52), s63 7.0 (s59), s64 ≈4–5 (m02 moss green, but its
pair is moss + coral rose), s65 6.5 (s18). If P6 gives roots, they replace these.

## Notes (not changed, LAW #0)
- The shared Colour tone sentence (make_nf4 LOW_TONE "ONE medium tone level … coral-red / brick-red") + the MG1 COLOUR RULE "medium-light"
  are in every face prompt; for light Dịu dàng roots they may pull the robe a little deeper than the hex. Same as F1/F2.
- s_root_colours.json now has 60 s-ids (s62–s65 added). palettes3 scripts that read it (gen_palettes3.load_p1) will see them.

## STEP 2 — waiting for the foreman's GO (P6 palette). Then: take P6 roots (else keep these), re-run the builder + gate, 4 gens (1 try each,
~138 cr each), look at each, one sheet with big labels (name · group · "MẶT MỚI"), push, send the sheet path. FACE_CUTS untouched until owner OK.

Credits used: 0.
