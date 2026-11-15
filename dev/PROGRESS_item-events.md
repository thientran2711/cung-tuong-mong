# PROGRESS — review/item-events (KIT §64 items in events, owner 15/11 ~18:10Z)

## Done
- `dev/build/jitev.js` (after jfx in assemble.py): resolver `ievOf` (explicit pid resolvers giftin / pgin / cnvBribe / story `gi`, econ STIP_EV
  goods events, noun table on title + text + option names), verb table per option (`data-kia`), `kitItemTag` (kitItem md on the banner or the
  top of the text column), `kitItemFx` (keep / back / give / burn / tear / smash / pour / well / bury / use), 6 new Pixi particle kinds,
  tap-to-skip catcher, claim rule (no double reveal / no double lose animation), silver bribes = coins.
- 10 new story item pictures (gpt-2-6), IT entries + ITEM_ART_G grades; hinhnhan now an IT item (il).
- KIT.md §64 (coordinator registry), kit page sample "§64".
- Scan: `dev/test/item-events-scan.js` → `dev/review/item-events-table.md` (event → item → choice → act), 0 gaps.
- Test: `dev/test/item-events.js` (5 sizes).
## Notes for whoever resumes
- The machine is shared and slow (load ~50): tests sample animations by pausing them, never by wall clock.
- Old saves: nothing new is stored; dialogs resolve from pid + pp (already saved).
## Results (15/11 ~20:00Z, build in this commit)
- dev/test/item-events.js at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, booted from an OLD save made with main's build (+ a queued
  gift dialog): PASS at every size (old save loads, queued gift shows the frame; 16 dialog cases each: frame + grade, act per option, real entry
  on keep, no second reveal, animation runs, tap skips, no h-overflow, options in cost mode). One E68 giftArrive variant did not build at two
  sizes (random actor) and was skipped; the other variant passed.
- Scan: 837 dialog texts, 65 with an item and choices acting on it, 0 gaps (dev/review/item-events-table.md).
- Kit page #kit: §64 sample present (8 item tags + 10 act buttons).

## Reviewer r1 (review/item-events-r1, merged onto main 8ee414c1b)
- Merge: assemble.py keeps main's jts.js + jmcal.js and adds jitev.js after jfx; KIT.md keeps §58 (month calendar) and §64 (items in events).
- Fixes on r1:
  1. give flew to the dialog's figure even when the option names someone else ("Đem cho cung nữ", "Trình lên Hoàng hậu" with a maid shown,
     envoy "chia cho người hầu", "Trả sổ cho cha") → now flies to the figure only when the option names that person (`.kpsn`), else up.
  2. giftin "Đem đến Thái y viện nghiệm độc" was "give" (flew to the GIVER) → new act `probe`: after the choice, the entry back in S.inv → keep,
     kept as evidence → give (up). KIT.md §64.2, scan table + scan legend updated.
  3. 844x390: the item frame (101 px) was taller than the event banner (96 px) and its top was clipped → short screens use a 40 px picture,
     one-line name/grade; test now checks the frame stays inside the banner.
- Tests (r1 build): item-events.js 5 sizes PASS (+3 new cases: giftin-probe, story-give-other, story-give-named); scan 837/65/65/0 gaps;
  month-cal.js 6 sizes ok (390x844 rotate prompt); ts-oldsave.js (main build save → r1) ok, 0 errors; kit-page.js: only §28.1 pcPort sample
  error, same on origin/main (pre-existing, not this branch); §64 sample renders.
