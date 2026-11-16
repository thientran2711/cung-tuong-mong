# PROGRESS review/header-own (D9, OD L607, OWNER_LEDGER #179) — from origin/main c4e89f8

Task: top bar keeps ONLY her own info; other people's info moves to room/person tabs.

## Finding
On current main the header already satisfies D9. The old header Emperor box (#emp) is `display:none` and the old header court chips
(.kcchips/.kcbox) were retired by review/fold-layout (jk2b.js `kitCourtChips`); the court chips are now the stage plaques `.k3c`
(Hoàng thượng, Thái hậu, Hoàng hậu, Cung nữ thân tín). No code change needed; added a regression probe.

## Before/after table (measured at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2 — identical set at every size)
| Header item | Whose | Decision | Where it lives |
|---|---|---|---|
| ☰ menu (save slot) | system | keep | header |
| her portrait + name, rank, age, date line (#me) | hers | keep | header |
| Sắc Tài Tâm cơ Đức(+!) Danh Sủng · Bạc Sức (#kstrow) | hers | keep | header |
| Buổi/khắc, "Hôm nay mặt mộc" (her make-up), weather, Quẻ (#k3tt) | hers / world | keep | header |
| "‹ Nơi" room button (#k3room, only away from home) | navigation | keep | header |
| seal (kseal-hud) | decoration | keep | header |
| Emperor box #emp (era name + mood) | his | already moved (hidden, dead DOM) | stage plaque Hoàng thượng → card (Ân tình, Sủng, Tâm trạng): 1 tap |
| Thái hậu / Hoàng hậu chips (thiện cảm) | theirs | already moved | stage plaques → card, 1 tap |
| Cung nữ thân tín + Thiện cảm (maid) | hers servant | already moved | stage plaque → Hậu cung/staff tab, 1 tap |
| #hud2 chips (th/hh/maid thiện cảm, Ân tình…) | mixed | hidden in header (not rendered) | same data on plaques + cards |
| Co-op friend chip/countdown (jcooptimer `placeF`) | partner | NOT TOUCHED (owned by main) | — |

Nothing lost: every moved datum reachable in 1 tap (plaque). KIT REQUEST: none.
Residual (not done, low value / risk): dead hidden `#emp` and `#hud2` nodes still sit in the header DOM; removal touches all40/j19/j57/j79 render paths — left for main if wanted.

## Probe
`node dev/test/header-own.js <index.html> <outdir> 755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@2,390x844@2 [oldsave.json]`
Checks: no other-person text visible in the header, #emp hidden, plaques on the stage (not in header), each plaque tap opens a card/tab, no cut cell, no overflow, no page errors, old save loads.
Result (build of origin/main c4e89f8): all 6 sizes PASS; old save PASS (755, 1366). Header screenshot at 755 looked at: her info only.
Existing header-danh.js not re-run (no code change under test).
