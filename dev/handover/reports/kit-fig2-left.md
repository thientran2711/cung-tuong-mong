# KP22 kit-fig2 leftovers — check on LIVE 494b386a (kit-mark). No code change; nothing to review.

| Item (PROGRESS_kit-fig2.md «LEFT») | State on LIVE | Evidence |
|---|---|---|
| 1a 2-option visit ~124 px empty (500 px min height, 32.7c) | not reproducible | the 500 px minimum is gone (no `min-height:500` in jk3/jksize/jk4/jk2b); 2-option modal at Fold 755x1000: dialog 482 px, last option → dialog bottom 74 px (padding included) |
| 1b several people → only the main one | done | jk4.js `kitStagePeople` (`L.slice(0,1)`) |
| 8 person-card relation chips old wording | done | jk2b.js ~1108–1125: subject + verb + object chips («Nàng quý ngươi», «Ngươi oán nàng», Ghen), `kitRel2` style |
| 6 Ân oán groups Nam nhân / Cung nhân | NOT done, not a kit job | `hcRelHTML` (jhc.js) groups Ta · Chí tôn · Phi tần via `relGrp`; men / staff have no pairwise relation model (`relPerson` only knows me / emp / th / rivals), so a group would be empty rows. Needs a GAME decision: which relations between a man / a servant and the other people exist (data first, then the kit tab is trivial: add a group in `relGrp` + `GR`) |
| 1d art (ev-hoang-de-dem, ev-cung-nhan, mocking-visit) | Foreman C art | not kit |
| 2 / 4 / 1e re-run act-compact, stranger-sweep, fig-fill, event-dp | ran, no pass/fail | the four scripts print JSON dumps only (errs: [] for act-compact, stranger-sweep, fig-fill; fig-fill reports `nocol:true` for every kind = its harness found no figure column in my state; event-dp printed nothing). Not usable as evidence — a worker with the old fixtures should re-run |
| 4 jbook kbp-fig not audited | not done | |

Honest summary: KP22 is mostly stale (done in code since), one real gap (Nam nhân / Cung nhân in Ân oán) that needs a design/data decision, no kit code written.
