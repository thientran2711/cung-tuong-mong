# PROGRESS review/rank-title (KIT 48.1 rank title)

Owner request (OWNER_DECISIONS "next day", reference shot of another game, title floating above the name): the RANK line above every
character name = serif title in the rank's own colour (portrait-frame colour family) with soft glow + thin dark outline; the NAME line
below in plain dark ink. Technique only, nothing copied.

## Done
- `dev/build/jk4.js`: KIT 48.1 — `KIT_RT` table + `kitRankTone(title,col)` (colour by the title's words), one CSS block `#kit-rt`
  (title `.krt` look + name `.krn` ink) applied to: kitNameRank (`.knr-r`/`.knr-n`), stage tags (`.j59t`/`.j59n`), kitEventDp / 32.7
  captions (`.kpsn .kname .kti`), person cards (`.pcrk` / `.pcname`, sticky `.kpstrip`), Tuần lục heading (`.kbk-pname`, title on its own
  line), podium plates (`.kpod-plq`). `.krs` = names over a painted scene keep the paper halo. Night modal: name in parchment ink.
- Producers set `--rt`: kitName `.kti` (j79 `kitRtOf`), j61 masked title, jinv figure caption, j59 stage tag, j15 pcard `.pcrk`,
  jk2b strip (copies the style; rank line ordered above the name).
- Kit page sample §48.1 (jkitpage): every title on parchment and on a dark scene.
- KIT.md §48.1 written (table of colours, where it applies, test).
- Test `dev/test/rank-title.js` (cases day, night, rain, cold, dp, kit, book, cards, podium, old).

## Notes / open
- The 32.5 small-portrait person dialog (`.kpsubj`, j79) still puts the caption UNDER the portrait (pre-existing; §48 rule says above).
  Not changed here (layout, not the title look) — reported to the coordinator.
- Name on the stage keeps the existing paper halo (KIT 33.5 scene words) so dark ink reads on night scenes; no coloured glow on names.
