# Review: review/close-bugs (15e36a6c6) — reviewer R6, 2026-11-15

Merged onto origin/main ebbbd9eff, then again onto d50f5f772 (rank0-emo, rest-balance, scene-light), as review/close-bugs-r6.

## Merge
- Conflicts: assemble.py (kept main order incl. jseal; jclose before j84), KIT.md, built files (rebuilt with dev/site/build_site.sh).
- "Qua ngày" lines (j6, j77, jcoopworld, jcooplobby, jtime4, p1.html): identical to kit-close already on main, merged clean.
- KIT numbering: this branch's §40 (close-bugs rules, kitLine) renumbered to **§42** (main has §39 kitSeal, §40 APP ICON, §41 kitMeMark);
  note left in KIT.md §42, refs fixed in KIT 28.6, jclose.js, swreg.js ("KIT §7.4" was a wrong ref -> §42.2), PROGRESS_close_bugs.md.
- assemble order: main's list + jclose.js after jaudit.js (before jmark, jkpor, j84, jimg).

## Scans re-run on the merge with d50f5f772 (all 0)
| scan | result |
|---|---|
| cb-gate.fn.js (Bái kiến, all places × buổi × khắc) | 0 / 350 bad |
| cb-wx.fn.js (weather × buổi × season, 64) | before 12 -> 0 |
| cb-tap.fn.js (tap highlight) | 0 / 235 (713 on the ebbbd9eff merge; count = tappable pictures on screen) |
| cb-need.fn.js (one Sức need per card) | 0 dup rows / 312 cards |
| cb-ton.fn.js ("Tốn không") | 0 / 516 options in 72 dialogs |
| cb-fest.js (festival × contest titles) | 117 variants, wrong before 28 -> 0 |
| cb-words.py (Qua ngày / Qua buổi / Qua đêm / Đợi sáng) | 0 (main and merge; index.html hits are only the KBK_OPT_DROP regex) |
| cb-greet.fn.js (owner case: chiều 1 khắc -> Vào thẳng -> tối inside -> card) | "Bái kiến Phi · Tốn 1 khắc"; visit line tells her |
| gate at 1–4 khắc, near/far | Bái kiến offered or "Bái kiến: cần N khắc, còn M"; far walk = 2 khắc (wet too) |
| cb-view.fn.js at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 | 0 page errors, 0 horizontal overflow, 0 cut text; Múa card one line "Sức trên 20 (có 17)" |
| old save (made with origin/main build, slot 2) | loads, S.wx.b filled, nextBuoi + render OK |
| kit-close.js 1180x820 (on the ebbbd9eff merge) | ✕ / outside / Esc all close; greet card's "Thôi" is drawn as ✕ and runs its go (acSeen) |

## Notes (not blocking)
- kitLine pill sits above the bottom bar for 4.5 s, pointer-events none; on 844x390 it can sit over the stage name plate, on 755x1000 over a
  scrolled card name. Never over the top bar / scene title / dialog title.
- Fog: greet card body says "Phi ???" but the ĐƯỢC row names her ("Nhan: thiện cảm…") — same pattern as main's gate card (pvRel). Pre-existing; for the fog owner.
- dev/test/minigames-j71.js times out on origin/main too (stale test).

Result: PASS
