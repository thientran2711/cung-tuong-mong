# THUPAL1 — Thu palette looks pink like spring (owner L1582, widened L1583)
depth 5 · START_CTX ≈ 3 % of 1M (get_session read 0, own estimate) · Opus · 0 gens, 0 credits · NO palette file changed (A39).

## Rules checked (rule.py find)
A31 (8 colours never alike; ΔE ≥ 20, light neutral vs light neutral ≥ 12, L1015) · A32 (group tone band, s62 Dịu dàng = nhạt + dịu, never deep; season sets family + one notch) · B18 (soft, never grey/pastel-washed) · B20 (4 palettes, unique pair per person per season) · L27 (★GỐC/root_drawn fixed) · royal yellow / no grey / no brown (four_season86.bad_colour) · check_unique (pair FAIL ΔE < 8). L1583 (via Foreman status): pink not banned in Thu; MAIN carries the season feeling; SECONDARY free but must suit the main.

## Cause (measured, all 90 = 86 consorts + s62–s65)
Script `dev/art/palettes3/season_feel_L1582.py` (season-feeling test: nearest season prototype by ΔE2000; Thu prototypes = đất nung, quả hồng trầm, hổ phách, vàng nghệ, ô liu, rêu, hồng đất, lá phong / đỏ rượu only when deep). Output `review-sheets/thu_palette_L1582/audit.json`.
- The Thu MAIN families in the solver (four_season86_a32.py MAINF['thu']) are plum (hue 335), autumn rose (10), wine (0), maple (27), moss (135) — and bad_colour forbids every warm earthy hue 20–112 below L .67–.76 (brown / mustard / royal yellow). So light groups got pink/plum, and "xanh rêu" came out as fresh leaf green (hue 139, C .10–.12 = the Xuân "spring green" swatch).
- **Thu mains that read as Thu: 9 / 90** (c16 c20 c28 m05 m08 s08 s31 s41 s63).
- **"Hồng như Xuân" (Thu main pink/rose/plum, light or near Xuân): 36** — c02 c08 c10 c19 c26 m04 m09 m14 m16 m18 m20 m22 m28 m29 s07 s08 s10 s13 s14 s16 s19 s23 s27 s31 s32 s35 s36 s37 s43 s47 s50 s52 s53 s55 s62 s65 (worst: c08 Thu ΔE 3 to her Xuân).
- Other 47 Thu mains not autumn: 23 "xanh rêu" = xanh lá non (reads Xuân), deep wine/maple reds 13 (read Xuân rose — borderline, deep reds could stay for Sắc sảo/Kiêu kỳ/Quyến rũ if the owner accepts them as thu), 5 plum (Đông), 5 soft coral (Hạ), 1 Tết red.
- Swapped seasons: **27 people's HẠ main reads as THU** (warm muted, e.g. c02 #DA9071) while their Thu is pink/green; Xuân 14 off, Đông 4 off.

## s62 proposal (sheet1_s62_options.png) — Đông ★GỐC kept; all pass bad_colour + season test; options 2–3 A31 OK + unique vs 89
1. **Chỉ đổi Thu**: xanh ô liu dịu #97AF68 + hồng tím phấn nhạt #FCCFE7 (pink kept as phụ, L1583). Xuân/Hạ/Đông unchanged. A31 only the OLD flag Hạ phụ #B9C9F9 ~ Đông #71B5D7 ΔE 16 (already in _flags).
2. **Thu đất nung**: hồng đất nung dịu #D59278 + trắng sương xanh #E7F4F9; Xuân → hồng xuân #E680A1 + #FCEEEE; Hạ → vàng chanh sáng #F4E798 + tím than nhạt #C9CDF9.
3. **Thu quả hồng**: cam quả hồng trầm #CC8E6B + #E7F9FF; Xuân hồng hoa đào #E98092 + #FCEEEE; Hạ #F4E798 + #C9CDF9. Owner to say if it looks "nâu".
Why Xuân/Hạ move in 2–3: her Xuân coral-pink (hue 17) and Hạ peach (hue 52) sit on both sides of every warm autumn hue; amber hits royal yellow (#EFBD69, ΔE < 12) in her light band. Search proved no warm Thu fits A31 with them unchanged.

## Method for all 90 × 4 (L1583, new separate file after owner picks a s62 option)
1. Rule draft for foreman (rule.py add is yours): "MÀU CHÍNH mỗi mùa phải ra cảm giác mùa đó (season-feel test); MÀU PHỤ tự do, hợp với chính; hồng được làm phụ ở mọi mùa."
2. Thu MAIN families = olive/moss with yellow cast (hue 118–132, NOT 135–150), soft terracotta / hồng đất (hue 30–45, muted C ≤ .09), quả hồng trầm (46–55), hổ phách only where royal-yellow ΔE ≥ 12; deep groups may keep lá phong / đỏ rượu deep (L ≤ .55). Remove plum (→ Đông, as P3 already classed it) and light autumn rose from Thu MAIN.
3. Solve **Thu first** (narrowest), then Hạ/Xuân with least change (ΔE moved), Đông after; where Hạ already reads Thu (27 people), swap that colour into Thu and give Hạ a clear sun colour. ★GỐC fixed; A31 + check_unique gate 0 FAIL; season-feel test must pass for all 4 mains.
4. Sheets per group for owner before any prompt uses it.

## Files (commit below)
- dev/art/palettes3/season_feel_L1582.py (audit + s62 options), dev/art/palettes3/thu_sheet_L1582.py (sheets)
- dev/handover/review-sheets/thu_palette_L1582/: audit.json, sheet1_s62_options.png, sheet2_flagged.png (36), sheet3_thu_reads.png (47) — all looked at.

## Open questions for owner
- Pick s62 option 1 / 2 / 3 (or "đổi kiểu khác").
- Deep wine / maple red as Thu for deep groups: OK as autumn, or also change?
- Note: local branch in my container had diverged from origin (148 vs 56); I worked on a fresh branch from origin and push to the handover branch.
