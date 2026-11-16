# PROGRESS — review/difficulty-port (D31: Độ khó Dễ / Vừa / Khó per life)

Spec: OD:L85 (owner 14/11 21:30Z: Vừa = current balance; Dễ ≈ HH ~50 %, early death ~20 %; Khó ≈ HH ~15–20 %, early death ~55 %,
more Phúc duyên; chosen at a new life with kit UI, stored per life, shown in Sổ luân hồi), OD:L128 (Độ khó row overlapped the face
picker), SESSION8_QUEUE D31, OWNER_LEDGER #43 / #63. Source: origin/review/difficulty v8 (5a664492), its dev/PROGRESS_difficulty.md.
Base: origin/main a523531d. Model: opus (difficulty = numbers/rules).

## What was ported (and what was not)
| old branch piece | here | why |
|---|---|---|
| dev/build/jdiff.js (v8 knobs) | **ported**, in assemble.py right after jbal2 (before jkiep) | the feature |
| knob values v8 (Dễ v7 / Khó v8) | **unchanged** | owner-approved, measured; C7 owns any retune |
| jdiff restore of the whole BAL | **changed**: only the knobs a mode lists are saved/restored (DIFF_KN) | main has ~20 modules that add BAL keys after jbal2; restoring a whole BAL copy could undo their runtime values |
| end card row via `pcrow` regex | **changed**: kit row via `kitRows([["Độ khó",…]])` spliced after the "Thân phận" kit row | main's end card (j32) is kitRows now; the old regex matched nothing |
| `.kdiff` grid CSS | **dropped**; only `.kdiff .ksub{position:static;z-index:auto}` | kit-only: the row is `.kpsec` + `h4.kpst` + `.ksub/.ksubb` + `.kpnote`, all existing kit parts |
| jrolefig.js (cung nữ wears maid tier) | **dropped** | main already has it (review/player-dress, j88 `f88SrvRk`) |
| merges of balance / page-curl / fold-layout | not needed | already on main |

## Design (unchanged from v8)
- `S.diff` = "de" | "vua" | "kho"; missing (old saves) = Vừa. Chosen on the identity card (Thân phận kiếp này) while NLP is set, fixed
  after "Nhận thân phận". Last choice remembered in localStorage `ctm-diff` (default for the next card). Bot: `window.__diffO`.
- Vừa = nothing changed. Dễ / Khó = base × m + a on the same knobs; base = the Vừa values in force when the game leaves Vừa
  (so C7's re-tuned Vừa numbers are followed automatically). A whole-number base stays whole (rounded) — as measured in v7/v8.

| knob (BAL unless noted) | Dễ | Vừa now (main) | Khó | effective Dễ / Khó on main | who |
|---|---|---|---|---|---|
| hz (palace aims at her) | ×0.55 | 3.2 | ×1.1 | 1.76 / 3.52 | her side |
| birthAdd / birthMin | −2 / −3 | 4 / 8 | +3 / +4 | 2,5 / 7,12 | every woman |
| illDie / illAdd | ×0.5 / – | 2 / 1 | ×1.5 / ×2 | 1,1 / 3,2 | everyone |
| seeMaxP (spot poison cap) | +15 | 70 | – | 85 / 70 | everyone |
| poisonX | ×0.67 | 1 | ×1.2 | 1 (whole base, rounded) / 1 | everyone |
| poisonNow | 0 | 1 | – | 0 / 1 | her (NPCs already die at Sức 0) |
| accCdT (charge cooldown) | ×1.5 | 36 | ×0.67 | 54 / 24 | everyone |
| hhTh (Thái hậu gate for HH) | −5 | 55 | +0 (v8) | 50 / 55 | every candidate |
| outQ (outsider takes empty HH seat) | – | 60 | +25 | 60 / 85 | world |
| J70CFG.mot (scheme motive) | ×0.6 | 3 (runtime) | ×1.2 | 2 / 4 (whole base, rounded) | every schemer |
| her starting bạc | ×1.5 | – | ×0.7 | | her |
| Phúc duyên earned | ×1 | – | ×1.5 | | her |
Note: poisonX base is now 1 (jbal2 v12), so ×0.67 / ×1.2 round back to 1 — on main the poison-strength knob is inert in both modes
(it was 1.5 when v3 tuned Dễ). Left as approved; flagged for C7 (see Open).

- UI: identity card row "Độ khó" (kitGloss) + kit segmented control Dễ / Vừa / Khó + one `.kpnote` line; in normal flow under the
  face picker, above the note and the pinned choices (OD:L128). Her own card in the game: `kitChip("Kiếp này: Khó","n")`.
  End card: kit row "Độ khó". Sổ luân hồi line "· Kiếp này: Khó"; in-game Sổ luân hồi Phúc duyên line starts "Kiếp này: <b>Khó</b>".
- Phúc duyên ×1.5 in Khó (milestones through pdAdd, ending bonuses at death incl. j69 origin compensation). jkiep wraps jdiff:
  an unfinished life (Kiếp dở dang) loses everything it earned, the Khó extra included.
- Co-op (state only): `S.diff` and `S.bac0` are personal keys (not in jcoopworld W_KEYS), so each player's blob `P[seat].S` carries her
  own difficulty and survives attach() / fromCanon(). Each client applies its own life's knobs. World rolls (NPC schemes, world events)
  run on the host, so world-rule knobs there follow the host's life; her-side knobs (hz, bạc, Phúc duyên) follow each player.
  No co-op UI added (the identity card is the same card in co-op).
- Mini-games (review/mg-easy, `kg82Tier(lv)`: tier by HER art level): jdiff touches no j82/j91 knob, so a Khó life still gets the easy
  tier at art level 0–1 and vice versa. Owner rule for mini-games is "by level"; the life difficulty is about the palace, not the hands.
  The gloss "Độ khó" says so ("Độ khó của màn thi tài nghệ vẫn theo bậc tài nghệ của ngươi"). NB: at origin/main a523531d mg-easy is
  NOT merged yet (no kg82Tier on main; j82 still has the old kg82DiffWord); nothing here depends on it, and both merge cleanly
  (no shared file). The two "Độ khó" labels have different scopes (life on the identity card; one game on the mini-game intro row).

## Tests (built site, local http server, Playwright, reducedMotion)
`node dev/test/difficulty.js <url> [WxH …]` — 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844 rotate prompt):
**71/71 ok** — row present (Dễ/Vừa/Khó, default Vừa), in flow, not in the choice block, no overlap, no horizontal overflow;
Khó/Dễ/Vừa knobs + bạc; Dễ computed from the Vừa base (not from Khó); back to Vừa restores every knob; every choice visible and
tappable after switching; accepted → kept, control gone; self-card chip; in-game Sổ luân hồi; save + reload keeps Khó knobs;
old save without S.diff → Vừa + base knobs; Khó death: end-card row, "kiếp khó: +N" Phúc duyên line, Sổ luân hồi; no page errors.

## LUẬT SỬA CẢ NHÓM — "a control paints over the pinned choices of the identity card"
Found while porting: after switching difficulty and scrolling, the Dễ/Vừa/Khó control drew over "Nhận thân phận" (755x1000).
Cause: `.ksub` carries `z-index:5` (kit, for its sticky tab use); inside the flex `.kpsec` a flex item's z-index applies even when
static, so it rose over the pinned choice block (sticky, z 3). Scan: `node dev/test/idcard-pin-scan.js <url> [WxH …]` (DIFF=kho to
rebuild the card first) scrolls the card body in 16 px steps and hit-tests 5 points of every choice button.
| element over the choices | before (v8 CSS) | after |
|---|---|---|
| Độ khó control `.kdiff .ksub` | covered at 755x1000 (after card rebuilds) | never (755x1000, 1000x755, 1180x820, 844x390) |
| face picker filter `.ksub.kpkf` (Phi tần / Cung nữ, kit kitPicker j79) | covered: 1180x820 scroll 0–48, 1000x755 scroll 0–64, 844x390 scroll 112–176 | **unchanged — KIT REQUEST** (kit part; ONE KIT KEEPER) |
KIT REQUEST: kitPicker (j79) filter tabs `.ksub.kpkf` are sticky with z-index 5 and paint over the identity card's pinned choice block
(`.kpopts.kpscopts`, sticky bottom, z 3) while the card scrolls; fix in the kit (e.g. pinned choices above any sticky picker bar, or
kpkf z ≤ 2 inside `.dlg.kpsc`). Seen at 1180x820, 1000x755, 844x390 with idcard-pin-scan.js; pre-existing on main.

## Bot measure (for C7)
Harness: `OUT=<dir> dev/measure/rundiff.sh <game.html with meta charset> <de|vua|kho> <shard> [lives]` (= run1b.sh: sensible bot,
HHSTOP, 9-origin rotation, inx + inpz counters; `indiff.js` tags each result with `diff`), then
`python3 dev/measure/anx.py <label> <dir>/<mode>_*.json`. One life ≈ 10 min on this box (load ~39 on 4 CPUs), so the numbers below are
a small-n smoke check that the layer still bites on main; the real table is C7's to take after merge.
RESULTS: see "Measured on main" below.
