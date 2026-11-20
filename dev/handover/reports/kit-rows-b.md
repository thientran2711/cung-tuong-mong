# kit-rows-b — report (kit-mark, ROOT-77/78 queue: KP12–22 + K-PM-1)

Branch `review/kit-rows-b` (from origin/main 99bdba82). Gate: `bash dev/tools/quickcheck.sh <sha>` (see the SẴN SÀNG message for the sha + verdict; first run a51ef13d failed G1 one-core-guard — I had named a part `kitSteps`, which already exists in j79 as the level pips; renamed `kitStepList`, guard PASS). `golive.sh` not run (refused by the auto classifier). Test: `dev/test/kit-rows-b.js` (18 checks, Fold 755x1000 + iPad 1180x820). Doc: KIT.md §13.11.

| Item | Result |
|---|---|
| KP12 `kaSent` (j63) | writer's explicit class g/r beats word meaning; unclassed `<b>item name</b>` never colours the row |
| KP13 pay-only-on-success | already works: game side j2 payWinBac/payWinFail → kaRows puts «Bạc -N» in Mất under THÀNH, «không mất bạc» under BẠI. Only a test added (no kit change) |
| KP15 reward shelf (j93) | ≤ 8 icons + `+N` chip while opening; the list below keeps every item (22-item Phẩm phục card: 23 rows, Nhận in view) |
| KP17 `kitEvArt` (jk4) | act picker / shop never tagged with a guessed evId. NOTE: I could not reproduce the tag on main with a synthetic picker, so the test only guards the result (not proof the old bug is gone in the field) |
| KP19 `kitStepList` (jtabs) | one 3-state step list ✓ ▸ ·, used by Việc nhờ «Các bước» (j72). (`kitSteps` = level pips, untouched) |
| KP20 chapter cover (jgoal) | chapter detail `headArt` = chapModel().cover for arc chapters (falls back to the origin picture) |
| KP21 act-card parser (j63) | (1) a coloured item starting with «kèm:/thành:…» has the label stripped and routed by it; (2) labelled values split at top-level `;` / `, ` and routed alone (gain in Kèm → Được; long lists = one short line per value). Before/after probe in a browser: label rows `kèm: Chủ tin…` → `Chủ tin…` under Được |
| K-PM-1 `kitGameVs` (jgamevs) | panes `align-items:start` (the opponent plate was as tall as her board: empty lower half — shots before/after, iPad) ; new `vs.setMood(side,text)` = mood line in the pane flow, never a bubble over a ladder row. The Fold 755 stacked layout showed no empty half in my probe (kv1 stacks); the stretch was kv2 |

## NOT done (still open)
- **KP14** option tiles at Fold: main already lays every option in ONE column (304 px, part 1 landed); the picture card leaves a ~188 px text column (scan flag NARROW on «Ta bắt gặp», «Hội phối đồ: báo đề»; both pre-existing, same on main). Needs a decision on the card picture width at ≤ 760 px (r2 branch `review/kit-option-rows-r2` has «figure-left column stacks label over value»; not on main).
- **KP22** (kit-fig2 leftovers: 2-option visit ~124 px empty, Ân oán Nam nhân/Cung nhân groups, relation chip wording) — not started.
- option-modal-scan fold/ipad full runs were compared on a 40-turn seeded sample; random state differs between builds so the per-modal tables are not apples-to-apples (same direct modals identical).

Shots: CDN `img/_review/kit-rows-b/` (before/after-vs-fold, before/after-vs-ipad). Delete with the verdict.
