# PROGRESS review/pick-hint

Owner 15/11: "Giải thích khó hiểu quá" (spy picker odds line) + scope extensions: rank and name always together; rank line halo on paintings.

## Done
1. Spy picker (jwhy `spyHint`): one sentence "Thành hay bại tùy: Tai mắt của ngươi, <maid> khéo hay vụng, có quen ai bên ấy không; bên ấy càng đa nghi, canh giữ càng chặt thì càng khó." Factor list stays in "Vì sao…?".
2. Root cause of "cungCung": j79 `kitNoChange` stripped a ", " at the end of every text piece that sat before a tag (name/chip). Now it tidies only pieces where a "N → N" clause was really dropped (whole family: every kit fact row).
3. Family of "what decides the odds" lines rewritten (jpoison, j70 ×2, jexam, jpet ×2, jtsb, jmen). Table: `python3 dev/test/pick-hint-scan.py origin/main` (0 old-style lines left).
4. Rank + name together: jaudit §17 `kitRankNamePaint` (KIT.md §9). Scan `dev/test/rank-name-scan.js` → dev/review/rank-name-scan.md.
5. KIT 48.1d: rank line on paintings gets the same light halo as the name (jk4), full rank tone, contrast >= 4.7:1 for all KIT_RT tones.

## Exceptions (rank+name)
Hậu cung roster strip short names (not full names); her own name S (header shows her rank chip); kids whose name carries the title; strangers stay masked by j61.

## Reviewer r1 (review/pick-hint-r1)
- Owner ruling (session 8, newest): on the STAGE only HER tag glows. jk4 48.1e: her tag (`#j59metag`, any `.tag.j59mine` set by j59tags
  for S; co-op = each player's own S) keeps the 48.1d paper halo on the rank line + the 48.1b gold glow on the name; every other stage tag is
  plain rank colour + plain ink with only a 0.6px zero-blur paper hairline edge (no glow) — without it, plain lines measured 1.0–1.7:1
  against the painting on carpets / night scenes (`dev/test/stage-tag-contrast.js` + `.py`, 14 places x sáng/tối). KIT.md 48.1d/48.1e.
- Stage side cards (`.ksh .k3c`): kitRankNamePaint made "Cung nữ thân tín X" one long nowrap line → side column ~115px wider at 755 and a
  squeezed card at 844. Title now stacks above the name (rank line over name, 48.1).
- kitRankNamePaint observer: repaints only the changed subtrees per frame (full pass at start or >120 roots). Idle mutations 0, no nested
  .kname, dry-run leftovers 0 on every tab.
- kitNoChange: double-space / space-before-full-stop tidy kept for every piece (branch had dropped it: "Lụa Hàng Châu . Được" showed);
  separator strip only after a dropped clause. Old vs new over 1702 fact rows: only diffs are the restored ", " / "; " / "·" before tags.
- j70: restored main's `Math.round(6*sev)` (the branch had reverted it by accident).
- Merged origin/main 3ef079f61 + origin/review/rank-colour 99b8b6250 (coordinator scope add). j79 kpPeopleIn conflict: kept main's
  fix-float stale-rank drop AND rank-colour's 48.3 title-inside-name. j59 court-officer naming renamed `j59CourtNames` (the second global
  `kitNames` was shadowed by j65's; officers were never named). Both observers together: list form "X (Quý phi, chủ vị)", "Quý phi X",
  bare "X", mood title all painted once, no nested .kname, no doubled title, idle mutations ~0.
- Tests on the merged build: rank-colour.js 1180x820 4988 pairs, 4876 ok, 112 "plain" = all "Thủ lĩnh thái giám X" drawn in the thủ lĩnh
  tone (correct KIT_RT; the scan expects the shorter "thái giám" tone — test-side); rank-name-scan after 0; hint-dedup exit 0; kit_dupes OK;
  old save (main 3ef079f61) loads + 8 weeks, 0 errors; coop-e2e 57/59 (known start-timing flake) then 59/59.
- Re-merged origin/main 583858942. Found + fixed (pick-hint bug, whole family): a lone name label whose title stands in a SIBLING label
  (Hậu cung person card: .pcrk "Hoàng hậu" over .pcname) was painted again → "Hoàng hậu / Hoàng hậu X". kitRankNamePaint now treats a short
  sibling label holding the title as titled. `dev/test/rank-name-dup.js`: 85 doubled titles before (Hậu cung cards, mood, spy, dialogs) → 0.
