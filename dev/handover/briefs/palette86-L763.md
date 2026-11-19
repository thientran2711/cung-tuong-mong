# P1 — SEASON PALETTE FOR THE 86 CONSORT FACES (owner Lượt 763, TOP) — Foreman C ROOT-57
PRIORITY #1 CHECK: palettes_season.json @ handover (87 old m/c/nc ids, approved Lượt 758 as it is); dev/art/palettes3/ (gen_seasons.py, seasons.py, check_seasons.py, tone_unify.py, ha_warm.py, xuan_pink.py, make_season_sheets_by_season.py) = REUSE these, no new framework. Groups: dev/art/face-common/OWNER_GROUPS_L686.json. No MASTER/uniqueness gate exists yet.
READ: dev/rules START_CORE + START_WORKER; dev/art/ART_RULES.md rows A18 A21 A22 B18 B19 B20 B21 B24 B25 (rule.py find). English in repo; never message the owner.

## Owner words (Lượt 763)
The season palette must cover EXACTLY the current 86 consort (phi tần) faces, each person a UNIQUE (main, secondary) pair in EVERY season (Xuân, Hạ, Thu, Đông) — nobody shares a pair with anyone, in any season.

## The 86
- 70 = every id in OWNER_GROUPS_L686.json whose group is NOT "Kho" and NOT "Công chúa (…)" (Sắc sảo 18, Đoan trang 12 incl. m05, Dịu dàng 11, Kiêu kỳ 10, Lạnh lùng 10, Quyến rũ 9).
- 16 NEW ids (owner Lượt 761): Lạnh lùng s46–s50, Kiêu kỳ s51–s55, Quyến rũ s56–s61. Add them to OWNER_GROUPS_L686.json (value = group name) so every tool sees 86.
- Old ids that are Kho / Công chúa / nc1–nc3: MOVE out of palettes_season.json into palettes_season_nonconsort.json unchanged (princesses get colours later; do not lose data).

## Rules
1. People already in the file (31): their approved palettes stay; ★ root pairs NEVER change. Change a non-root season pair ONLY where needed to break a duplicate, smallest change (same colour family, shift hue/lightness), list every change (old → new hex) in the report.
2. s07–s45 (39): ROOT = her current drawn colours = the two hexes in her latest approved sNN.v*.FULL.txt prompt (check FACE_MAP_L703.json / FACE_CUTS for which version is approved). Classify the root season with the existing seasons.py rules; generate the other 3 seasons with gen_seasons.py rules (B18 tone, B19 no grey, keep main-vs-secondary contrast, recognisably hers). Add root_tone_adjusted (Xuân/Hạ tone level) as ADVISORY only (owner Lượt 757: base pictures are NOT redrawn).
3. 16 new: invent a new root pair per person fitting her group (Lạnh lùng cool/clear, Kiêu kỳ proud/rich-but-soft, Quyến rũ warm/rose/alluring), at the Xuân/Hạ tone level (L≈0.62–0.75, S≈0.30–0.50, owner Lượt 744/750), no royal yellow (B21), unique against all 86; then 3 more seasons as above. These roots are what the new faces will be drawn with.
4. Seasons follow the approved character: Xuân mostly PINK (Lượt 741), Hạ light yellow/orange mains + cool secondary, no honey/gold (Lượt 756), all four seasons one tone level (Lượt 742/744; Thu/Đông secondaries may stay a little deeper by the existing season rule).
5. UNIQUENESS GATE (new script dev/art/palettes3/check_unique.py): for each season, for every two of the 86: FAIL if max(ΔE2000(main_a, main_b), ΔE2000(sec_a, sec_b)) < 10, or if the colour NAME pair is identical. Also flag (WARN) main ΔE < 6 with sec ΔE < 14. Print a table per season; exit 1 on any FAIL. Also run check_seasons.py → 0 FAIL. Both must be clean before sheets.
6. Keep palettes_season.json shape (root_season, xuan/ha/thu/dong with main/main_hex/sec/sec_hex, root:true on the root season); status stays "PROPOSAL" until the owner OKs; update _note (86 consorts, Lượt 763).

## Output
- Sheets (reuse make_season_sheets_by_season.py): dev/handover/review-sheets/palettes-season/v86/season_{xuan,ha,thu,dong}.jpg — all 86, grouped by look group, each swatch labelled with id; ★ on root; NEW people marked. Plus changes_old_new.jpg (only the 31 whose non-root pairs changed: old | new). Readable on a phone (≤ 2400 px wide, big labels). LOOK at every sheet full size yourself.
- Report dev/handover/reports/P1-palette86.md: counts, duplicates before (per season) → after (0), every changed pair, check_unique + check_seasons output tail, commit hash.
- Commit to branch claude/cung-tuong-mong-handover-hj0h8w (git pull --rebase before push; retry 4×). No gens, no credits.
- Then send_message to Foreman C ROOT-57 session_01PEhRbuFkLEFvsv8jdPo9vC: "P1 DONE <hash> sheets <paths>". The 16 new roots are needed FIRST by the face worker: as soon as those 16 pairs pass the gate, commit + message "P1 NEW16 READY <hash>" and continue with the rest.
ROLLOVER at START_CTX + 25 % (ceiling 60 %): write handover in your report, tell the foreman; the foreman opens your successor.
