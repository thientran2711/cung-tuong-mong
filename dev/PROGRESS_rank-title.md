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

## Test results (dev/test/rank-title.js, 15/11 ~19:40Z)
Sizes 755x1000@2, 1000x755@2, 844x390@3, 1180x820@2, 1366x1024@2 × cases day, night (tối), rain, cold (lãnh cung), dp (kitEventDp),
kit (#kit §48.1), book (Tuần lục), cards (Hậu cung), podium, old (save written by origin/main build, loaded here):
0 page errors; every stage tag: title serif (Noto Serif) in KIT_RT colour, name rgb(42,26,18), title above name, no tag overlap, no tag cut;
old save loads (ok month 4) at all 5 sizes; kit page sample 54 blocks, no horizontal overflow. 1180x820 shows one slot (her) + "+3"
(slot rule KIT 33.7, unchanged). Contact sheet: /home/user/wt/rank-title-contact-sheet.jpg (not in git).
Contrast (WCAG): title fill vs its outline 6.5–14.3:1; vs a night scene 6.3–13.8:1; on parchment the outline carries it (outline vs
parchment ≈ 17:1) — fill vs parchment only 1.2–2.6:1, which is why the outline is part of the kit.

## Review r1 (review/rank-title-r1, merged onto origin/main e5a327d1)
- Merge: index.html / sw.js / assets.json conflicts = generated files, taken from main and rebuilt (bash dev/site/build_site.sh).
- Reviewer fixes: Đại cung nữ tone #86a8ec (blue, MRCOL family; was jade) and Nữ quan #b6a6e6 (lavender, MRCOL family).
  Dialog face captions (j3 `.faces figcaption`: "Nhập cung", "Thân phận kiếp này") now built with kitNameRank (rank over name; was name over rank).
- Owner 15/11 ~20:10Z — KIT 48.1b: HER own name = near-black ink + soft light-gold glow (`.kmy`), set by kitNameRank (4th arg / kitIsMyName),
  Ân oán relSide, stage tag j59 (p===S), kitName(S,{named}) (32.7 captions, Tuần lục, podium), kpIdentity, her pcard + strip. Co-op friend not marked.
- Owner 15/11 ~20:40Z — KIT 48.1c: person-dialog captions (kitEventDp .kdpcap, .kesf>.kpsn, event-stage .kesov>.kpsn) have no box;
  .kesov names over a picture keep the paper halo.
- Tests: rank-title.js 5 sizes × 10 cases: 0 page errors, 0 bad, old save loads; chap-label.js (755/1000/844) all ok; month-cal.js bad 0;
  kit-page.js only the pre-existing "lỗi … reading 'out'" sample error (same on origin/main); ts-oldsave.js ok (12 weeks, no errors).
- Owner questions (not blocking): stage keeps the paper halo behind names; Thái hậu title is bronze while her frame is deep plum + gold;
  pale tones (Đáp ứng ivory, Phế phi ash, thô sử, Người lạ) on white/parchment read mainly through the dark outline.
