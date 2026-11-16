# PROGRESS collect-ms (D49: collection milestones, Sổ luân hồi titles + Phúc duyên)
Branch review/collect-ms (from origin/main 9b4f1697aa). Status: ready for review.

## What
- New `dev/build/jcol.js` (assembled after jearn). `S.col` = every distinct item kind she has held this life (chest `S.inv`, non-hidden, + worn trâm/y), merged on every `render` and `endTurn`.
- `BAL.col` (jbal2.js): `ms:[[20,5,"Tích bảo"],[50,10,"Tàng bảo"],[100,20,"Bách bảo"],[200,35,"Vạn bảo các chủ"]]` = [items, Phúc duyên, danh hiệu]; `keep` = lives remembered by the ledger.
- Phúc duyên via `pdAdd` => counted in `S.pdLife`, so a kiếp dở dang (jkiep `kpPenalty`) loses it like all life Phúc duyên.
- Once per life, reload-proof: persistent ledger `cung-colms` {best, ms:{20:lives..}, lives:{"name|origin":{20:1,..,n}}}. Loading an earlier save of the same life (no S.colMs) finds the milestone in the ledger: no PD, no card. Old saves: S.col is built from current holdings, reached milestones granted once in ONE card; old book (no ledger key) loads, section shows only the running life.
- Titles persist in the ledger (Sổ luân hồi storage `cung-luanhoi` is per-life log; the ledger is the cross-life book part); the life's log line gets "Danh hiệu: «…»" via kpLifeNote on lifeSave.
- UI = existing parts only: reward card = Q card `kind:"reward"` (BAN THƯỞNG seal kit) + `rows67`/kitRows; book = `<h3>Bộ sưu tập</h3>` + rows67, same as the Kết hiếm section (j97). No new row/badge/CSS.
- `wdColInfo()` (jearn stand-in) now real in jcol: {n,title,next}; stand-in removed from jearn.js.
- Co-op: nothing sent; all state is local (S + localStorage).

## Tests
`node dev/test/collect-ms.js <url> <W>x<H>@dpr <outdir> [shots]`: 19→20, 49→50, 99→100, 199→200 (PD 0/5/0/10/0/20/0/35, one card each), same-life reload (0 PD), old save (+5 once), old book, pdLife counts. PASS at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 (no page errors, no horizontal overflow). Screenshots of book + reward looked at 755x1000 and 844x390.

## Notes / open
- "Item" = any distinct kind in IT held in chest or worn (incl. consumables). If the owner wants only wardrobe/ornaments, change `colHeld()`.
- Numbers lived in jbal2 only. No KIT REQUEST.

## Reviewer r1
Spec reading (OD L45-46): items counted PER LIFE, items do not carry over; titles are recorded in Sổ luân hồi (persist); Phúc duyên once per life, lost if kiếp dở dang. Build matches. Fix: ledger key was name|origin (a new life with the same random name + origin would inherit the old grants) -> unique S.colLid stamped in start() (old saves fall back to name|origin). Merged origin/main, jcol.js re-inserted after jearn in assemble.py, site rebuilt.
