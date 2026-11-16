# PROGRESS review/kit-sweep — every dialog from a kit frame template (owner 16/11 "Má nó, kit chung đâu")
Base: review/goal-strip-fix (993b24b221, from main 67af14139) — kit-sweep needs its kitOnePic + jgoal change.
Rules: KIT §8.2 FRAME TEMPLATES (new, in KIT.md) = T1 panel · T2 event frame (one picture left + kit rows right) · T3 person event ·
T4 person info · T5 identity · option row · person card · slot/item card · notice (kitLine) · stage rail (§77).
Scan: `node dev/test/kit-conform.js <url> <out.json> [WxH,...] [maxPend]` (CONFORMS / MIXED / CUSTOM per dialog, loose floats over the tabs,
retired floats in code). Exit 1 on any MIXED / CUSTOM / float.

## Batch 1 (this push)
| Kind | Before | After |
|---|---|---|
| Place card (Dư đồ tap, greeting card, last walk; j77Card / accEtqCard / j77LastWalk / cbGreetCard) | MIXED: wide band picture + 3-column row (room picture from the event-art wrapper, host portrait cell `.kplhost`, hand-made `.kplinfo` box) + options cut off | T2: ONE place picture left, kit rows right (Chủ vị · Đường đi · Còn · Bóng người · Giờ) + kit fact rows, options below as kit option rows; place-only CSS (kplhost/kplinfo/kplsil, opts min-height hack, flex override) deleted |
| Any no-person dialog with headArt (fire, strange omen, pet gifts, tsb events, …) — the family of the place card fault | MIXED: band on top + a second tall picture (jk2b kitEvArt) | T2 via ONE shared rule `kitOnePic` (jk4): the headArt picture moves into the left slot, the generic one is dropped |
| Chapter detail "Chương N · …" (kitGoalDetail, owner shot 4ff48b96) + "Mệnh truyện kiếp này" card | MIXED: loose full-body figure column + picture + rows, cut at the bottom, no ✕ | T2 (on goal-strip-fix): picture left, kit rows right, "Đóng" close option → kit ✕ + Esc + tap outside |
| Co-op wait strip `#kctm` (owner shot faa95830) | CUSTOM float: 3 loose chips over #next / the tab bar, overlapping, cut at the edge, duplicating the header friend chip | removed; the header friend chip (§69.2) is the one display; "Tạm dừng" + the wait words live in its kit notice (`kitCoopFriendPanel`, kit ✕ in header, no "Đóng" button) |
| Item info pop-up (kitItemCard `#kidfl`) | CUSTOM: private card frame `.kidc` (own border, width 400, ✕ floating) | T2 in the kit panel frame: kpHeader ĐIỀU · name · kind + kit ✕, item picture left, chips + kitItemDetailRows + acts right |
| Goal strip (stage + Hành sự) | CUSTOM float over the people | replaced by the stage rail icon (§77, review/goal-strip-fix) |

## Inventory (code paths that build dialogs) — 755x1000 runtime scan, before (main 67af14139) → after
Totals: before CONFORMS 43 · MIXED 8 · CUSTOM 1 · floats 2 (retired #kctm strip, #kgoalst strip) → after CONFORMS 51 · MIXED 0 · CUSTOM 0 · floats 0. Places that open straight into a walk (no card) are not listed. JSON: dev/review/kit-conform-before.json / -after.json.

| Dialog | Template | Before (main) | After |
|---|---|---|---|
| info | T2 | CONFORMS | CONFORMS |
| rule | T2 | CONFORMS | CONFORMS |
| news | T2 | CONFORMS | CONFORMS |
| notice | T2 | CONFORMS | CONFORMS |
| result | T2 | CONFORMS | CONFORMS |
| night | T1 | CONFORMS | CONFORMS |
| choice | T2 | CONFORMS | CONFORMS |
| headart-notice | T2 | MIXED (two pictures: band + left picture) | CONFORMS |
| headart-choice | T2 | MIXED (two pictures: band + left picture) | CONFORMS |
| intel | T3 | CONFORMS | CONFORMS |
| evidence | T3 | CONFORMS | CONFORMS |
| item | T1 | CONFORMS | CONFORMS |
| item-card | T2 | CUSTOM (no .dlg) | CONFORMS |
| calendar | T1 | CONFORMS | CONFORMS |
| goal-detail | T2 | MIXED (loose figure column on an info panel) | CONFORMS |
| place:thu | T2 | MIXED (two pictures: band + left picture; hand-made block .kplinfo) | CONFORMS |
| place:dtd | T2 | MISSING | CONFORMS |
| place:cnh |  | MISSING | ? |
| place:tgk | T2 | MIXED (two pictures: band + left picture; hand-made block .kplinfo) | ? |
| place:ttp | T2 | MIXED (two pictures: band + left picture; hand-made block .kplinfo) | ? |
| place:acs | T2 | MIXED (two pictures: band + left picture; hand-made block .kplinfo) | ? |
| place:dc | T2 | MIXED (two pictures: band + left picture; hand-made block .kplinfo) | ? |
| place:etq | T2 | MISSING | CONFORMS |
| place:night | T2 | MISSING | CONFORMS |
| PEND:vase | T3 | CONFORMS | CONFORMS |
| PEND:tt1 | T2 | CONFORMS | CONFORMS |
| PEND:tt2 | T2 | CONFORMS | CONFORMS |
| PEND:tt3 | T2 | CONFORMS | CONFORMS |
| PEND:nc1 | T2 | CONFORMS | CONFORMS |
| PEND:td1 | T2 | CONFORMS | CONFORMS |
| PEND:ch1 | T3 | CONFORMS | CONFORMS |
| PEND:ch2 | T3 | CONFORMS | CONFORMS |
| PEND:thd1 | T3 | CONFORMS | CONFORMS |
| PEND:phoenix | T2 | CONFORMS | CONFORMS |
| PEND:doanngo | T2 | CONFORMS | CONFORMS |
| PEND:trungcuu | T3 | CONFORMS | CONFORMS |
| PEND:vulan | T2 | CONFORMS | CONFORMS |
| PEND:dongchi | T2 | CONFORMS | CONFORMS |
| PEND:thbirthday | T3 | CONFORMS | CONFORMS |
| PEND:ksp | T3 | CONFORMS | CONFORMS |
| PEND:prep | T3 | CONFORMS | CONFORMS |
| PEND:night1 | T3 | CONFORMS | CONFORMS |
| PEND:night2 | T3 | CONFORMS | CONFORMS |
| PEND:giu | T3 | CONFORMS | CONFORMS |
| PEND:giftpick | T1 | CONFORMS | CONFORMS |
| PEND:plantpick | T3 | CONFORMS | CONFORMS |
| PEND:taintpick | T1 | CONFORMS | CONFORMS |
| PEND:evpick | T1 | CONFORMS | CONFORMS |
| PEND:shop | T3 | CONFORMS | CONFORMS |
| PEND:plantsv | T1 | CONFORMS | CONFORMS |
| PEND:j70thr | T3 | CONFORMS | CONFORMS |
| PEND:vlget | T3 | CONFORMS | CONFORMS |
| PEND:vlcraft | T3 | CONFORMS | CONFORMS |
| PEND:vlnvp | T3 | CONFORMS | CONFORMS |
| PEND:vlout | T3 | CONFORMS | CONFORMS |
| PEND:runner | T1 | CONFORMS | CONFORMS |

## Overlaps (not touched here)
- review/kpanel-compact owns §8.1 sizing: at 844x390 the place card's text block (T2 body) is taller than the frame, so the option rows are
  below the fold and only the options list may scroll (32.5) — needs the short-panel / body-scroll sizing rule, not a per-place fix.
- review/modal-scroll owns the touch-scroll chain (options scroll inside the frame).
- review/pcard-actrow owns the person-card act rows and the gift "Chí tôn" list.
- review/coop-night-sync works in co-op sync logic; here only the display (jcooptimer paint / friend panel) changed.

## Batch 2 queue
Title menu (`#title .tbox`, p1.html), save / co-op slot cards (jslots, jcooplobby rooms column), the shop detail sheet `.kshdc` (jinv),
mini-game frame and week book stay exempt (§13 / §27). Each: list → template → convert in the kit part only.
