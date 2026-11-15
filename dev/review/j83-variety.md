# Review r6: review/j83-variety (self-made works option A + paid tiers)

Reviewed: review/j83-variety a45a12dc1 (rebased on main 70c792d4). Merged onto origin/main 94ea008a2, then 5e491704d (gift-ui), as
**review/j83-variety-r6**. Site rebuilt (CDN image base).

## Merge decisions
- `assemble.py`: main's order + `jwkg.js`, `jwkr.js` last (after jimg; jgift / jevban from main stay where main put them).
- `j79.js`: main's §21 kitSkillCard (tabs-kit). The branch's teacher text ("luôn hơn tự học 1") moved to where main now draws the
  Tài nghệ tab: `jtabs.js` ktArtSkills ("tiến bộ +2..3, luôn hơn tự học 1"), same as j23 / j85.
- `j83.js`: main's `act:1` (opt-render: an act's own picker keeps full numbers) + the branch's texts (WMAT +0/+2/+4, quý-only Tuyệt phẩm).
- `jbal.js`: `BAL.wk` + `tchMin` (branch) and `hintMid/hintSharp/hintMat` (main) together.
- **Close / "Thôi"**: main (kit-close, KIT 32.10) never draws a no-effect "Thôi" option: the dialog gets the kit ✕, and ✕ / tap outside /
  Esc run it; a dialog without one is a forced choice. The branch had its own mechanism (`xc:1` + a `showModal` wrapper adding a
  `data-kitx="wk"` ✕ for `KWK_XPID`), which on main would leave dialogs without Esc / tap-outside and could double the ✕. Resolved to
  main's one implementation: the wrapper and `xc:1` are removed; the plain `{n:"Thôi",fx:{}}` options are back in j83 (works dialog,
  gift, đồ cấm), jveil (4 veil dialogs, as on main) and the new jwkr material dialog (`act:1`). Player sees no "Thôi" anywhere (tested).
- `jwkr.js`: private style block `#k-wkr` (`#modal.kwrd .kshop.kwr …`) removed; the head line now uses the kit shop head (`.kshl` /
  `.kshm`), same as kitShop. The material note was split so the kit pill row reads "Thường dưới 6 · Khá 6 · Tinh xảo 10 · Tuyệt phẩm 14"
  and the sentence about quý follows as text (it was one long pill).
- KIT 28.13e pick tile `.kshc.kshpick`: documented in KIT.md (branch); **sample added to the kit page** (`#kit`, id "§28.13e", the real
  `wkrTile`, one open + one locked) and noted in KIT.md.

## Checks
| check | result |
|---|---|
| wk-kind-game, 11 kinds, 1180x820@2 + 755x1000@2 | every kind opens its own game (tranh→ve, theu→theu, bhoa→hoa, tho→tho, kinh→kinh, khuc→dan, the→co, mua→mua, ao→may, mon→banh, huong→huong); 10 recipe tiles, 8 open at bậc 2; product = recipe name + `item-tp-<kind>-<rid>-b<ti+1>.webp`; ✕ on pick + material dialogs, no Thôi; ✕ closes without spending; 0 page errors |
| wk-kind-game subsets at 1000x755, 1366x1024, 844x390 | same, 0 page errors |
| pick grid / material / kit page (own script) at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 | no horizontal overflow, tiles inside the dialog, button row on one line, `#mr` hidden, Esc closes the material dialog without spending, veil dialog: ✕, no Thôi, new odds text; kit sample §28.13e renders (2 tiles, 1 locked) |
| old save (made on the live site, build b332eb6b5e33: 2 handmade works without a recipe + an unfinished cắm hoa session) | loads at all 6 sizes, 0 errors; old works keep their tier picture (`item-tp-mon-b2`, `item-tp-tranh-b3`); the unfinished session resumes in the Cắm hoa game |
| CDN | all 440 × 2 recipe pictures (256 + item512) and the 17 new ingredient icons answer 200; every ingredient key used by WKR.mon has an icon |
| art spot-check (16 pictures, 7 kinds) | no Chinese characters (sutra / poem / calligraphy are abstract strokes), calm faces on the dancers, clear grade progression |
| paid-scan.py | main 94ea008a2: 595 options / 376 lists, 6 dominated paid options → branch: 1 (j96 "Tin nàng, nhờ nàng canh cửa": its `go` also gives the maid loyalty +8 / trust +10, the free option −12 loyalty; not a fault) — numbers confirmed |
| paid-tiers.js | 0 FAIL, 0 page errors (handmade 11 kinds × 3 levels, lessons, veil 6 bạc, shop groups) |
| event changes vs cost mode | the 5 j67 event options only change their `w:` numbers; j67 dialogs stay events (pid, cost mode: only Tốn + hint shown), opt-scan: our dialogs classified (works / material = act), the one unclassified (`jgift.js KM_EMPACT`) is the same on main |

## Notes (not blocking)
- paid-tiers.js shop table mixes two scales (`w`×10 for items with wear stats in IT, `luxVal` for j92 items), so e.g. "Bộ diêu vàng 100 (70)"
  vs "Bộ diêu kim phượng 150 (59)" looks inverted; the real wear stats (j92) rise with price (5/2 → 6/3 → 8/4). A cleaner metric would read
  the j92 stats for every hairpin / robe.
- No rotate prompt at 390x844 on main either (game draws portrait); not this branch.
