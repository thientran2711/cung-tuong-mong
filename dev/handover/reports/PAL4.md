# PAL4 — season palette rework from L1583 (Foreman C ROOT#19, owner L1704/L1705/L1707/L1708) · 0 cr, no gens
depth 1 · START_CTX ~3 % (used_tokens read 0; estimate) · ended ~20 %.

## What
- NEW `dev/art/face-common/palettes_season_L1709.json` (L1583 + L1679 untouched; L1679 values NOT used).
- Script `dev/art/palettes3/four_season_L1709.py` (deterministic, ~3 min), sheets `sheet_L1709.py`, table `stats_L1709.py`.
- Method: start from L1583. Every non-root main keeps ITS OWN L1583 tone (OKLCH L + C, HSV S never raised above its L1583 value by more than the fit cost allows; cap HSV S ≤ .72 for any changed main; max move ≈ ΔL .12). Only the hue FAMILY changes. 6 families per season. Family spread: quota per season + no two sheet neighbours in the same family where possible + at most ~1/3 of a group in one family (the two Thu reds count as ONE colour) + check_unique + A31 repair. bad_colour + THUPAL2 looks_right kept, with ONE exception: the owner's L1705 words ("Tôi chỉ cấm màu vàng hoàng gia thôi chứ tôi đâu có cấm những cái màu vàng nhạt hơn") let PALE butter yellow (L ≥ .90, ΔE ≥ 14 from royal #EFBD69) sit in bad_colour's 'royal band' (hue 80–100).
- Kept unchanged: all ★GỐC roots (90 of 360) + s62 all 4 seasons (sample row; Thu olive #9FB577 + phụ "hồng tím phấn" #FBE8F8 = the drawn lilac-pink, NOT changed — flag only).
- 259 of 360 mains changed; 70 phụ changed (only where the old phụ no longer suited the new main or to clear a uniqueness FAIL).

## Gates
- check_unique (--file palettes_season_L1709.json): **0 FAIL**, 214 WARN (L1583: 0 FAIL, 370 WARN).
- Same group + same season mains ΔE < 8: L1583 **656** pairs → L1709 **355**.
- A31 (one person's 4 mains all ΔE ≥ 20): L1583 8 people fail → L1709 **27** fail (mostly a red in Xuân/Thu next to a red in Đông, or a root that can't move). OPEN — owner/foreman call; it can be pushed down at the cost of fewer reds per season.
- keep_check --all: FAIL ×2, NOT mine (no prompts edited): bases `thu_comoi/s62_t4_THU_COMOIk.txt` (29 713 ch) and `s62_t5_THU_COMOIj.txt` (29 724 ch) are GLUED again (3 prompts each), last touched by 93cfa42 "rv-chiton-name rv2 report" (stale tree). → foreman: restore (DESIGN21 job3 recipe).

## HSV stats of mains (old vs new)
| mùa | bảng | mean S | p90 S | max S | mean V |
|---|---|---|---|---|---|
| Xuân | L1583 | 0.47 | 0.62 | 0.72 | 0.68 |
| Xuân | L1709 | 0.47 | 0.62 | 0.71 | 0.68 |
| Hạ | L1583 | 0.50 | 0.62 | 0.84 | 0.94 |
| Hạ | L1709 | 0.43 | 0.56 | 0.83 | 0.91 |
| Thu | L1583 | 0.51 | 0.80 | 0.98 | 0.61 |
| Thu | L1709 | 0.50 | 0.71 | 0.84 | 0.65 |
| Đông | L1583 | 0.48 | 0.65 | 0.98 | 0.75 |
| Đông | L1709 | 0.44 | 0.59 | 0.94 | 0.74 |
| cả 4 (360) | L1583 | 0.49 | 0.66 | 0.98 | 0.75 |
| cả 4 (360) | L1709 | 0.46 | 0.63 | 0.94 | 0.75 |

## Family counts per season (same classifier for both: nearest hue range)

| mùa | họ màu | L1583 | L1709 |
|---|---|---|---|
| Xuân | hồng hoa đào | 20 | 18 |
| Xuân | hồng mẫu đơn | 28 | 16 |
| Xuân | đỏ son Tết | 12 | 14 |
| Xuân | xanh lá non | 30 | 20 |
| Xuân | xanh ngọc non | 0 | 13 |
| Xuân | cam đào xuân | 0 | 9 |
| Hạ | vàng bơ | 23 | 25 |
| Hạ | cam đào | 32 | 16 |
| Hạ | cam san hô | 35 | 19 |
| Hạ | xanh lá sen | 0 | 12 |
| Hạ | hồng sen | 0 | 12 |
| Hạ | xanh ngọc biển | 0 | 6 |
| Thu | ô liu | 51 | 31 |
| Thu | cam quả hồng | 5 | 13 |
| Thu | đỏ lá phong | 6 | 17 |
| Thu | đất nung | 11 | 6 |
| Thu | xanh cổ vịt trầm | 0 | 14 |
| Thu | đỏ rượu trầm | 17 | 9 |
| Đông | chàm | 24 | 20 |
| Đông | tím mận | 17 | 18 |
| Đông | tím hoa cà | 13 | 11 |
| Đông | xanh băng | 21 | 17 |
| Đông | xanh tùng | 14 | 12 |
| Đông | đỏ mai đông | 1 | 12 |
L1583: same-group same-season main pairs ΔE<8 = 656; A31 people (4 mains not all ΔE>=20) = 8 c04 c20 s18 s32 s35 s47 s54 s63
(L1583 Thu "ô liu" 51 includes the old rêu greens; Đông root classification by hue, e.g. roots "mòng két" count as xanh băng / xanh tùng.)

## Sheets (all LOOKED full size; Vietnamese, "0 cr" on image)
- dev/handover/review-sheets/pal_L1709/bangmau_L1709_to1.png, _to2.png, _to3.png (bangmau_90 format)
- dev/handover/review-sheets/pal_L1709/bangmau_theomua_L1709.png (+ bangmau_theomua_L1583.png = same format for the OLD table, for side-by-side)
- dev/handover/review-sheets/pal_L1709/s33_s42_cu_moi.png (CŨ L1583 → MỚI, all 4 seasons)

## Honest limits / open
- Hạ yellow: 25/90 (target ~27). Pale yellows have little room to differ (L .90–.96), so the yellow row looks alike on purpose; uniqueness is carried by the phụ. Đoan trang Hạ has 8/13 yellow (their L1583 Hạ tone was already light).
- Deep Thu (Kiêu kỳ/Sắc sảo, L1583 L ≈ .34): orange/olive at that depth reads brown/army-drab (rules), so these people can only be red, wine, deep teal or olive lightened a bit. Kiêu kỳ Thu now: 4 wine, 3 maple red, 3 deep teal, 4 olive, 1 persimmon (L1583: 9 people the same "đỏ rượu trầm thẫm").
- Xuân Lạnh lùng: 7/15 "cam đào xuân" (soft peach) — their L1583 tone is light-muted; flag if she wants fewer.
- A few warm mains at low chroma (e.g. s33 Hạ cam đào dịu #C99670) read a little tan — L1583 tone kept exactly; can be lifted if she says so.
- Red across the game: Xuân đỏ son 14 + Hạ san hô 19 + Thu đỏ lá phong/rượu 26 + Đông đỏ mai 12 (L1583 Đông had 1).
