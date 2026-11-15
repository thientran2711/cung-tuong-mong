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
