# flight2-s9f (real-tap harness 8ea10d7e, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s9f | Lãnh cung — Tuổi xuân qua đi | 40 | 3447 | 2233 | 1 | 0 | 3 | — | 226 / 84 (exam 18, decree 201, select 7) |

## Dead buttons

- page «Diên Huy cung · Chiêu Nhân hiên · Ở đây còn 1 ngườ» «Nghỉ ngơiNghỉ ngơiNghỉ ngơi một látRất vữngNằm ngh» covered by span.kitem in #rtoast · dead-ipad-1795675052961.png

## Bugs

- [harness] ×1 picker stalled 96 steps / 60 s on .kmov «» without a real tap (area 96, deadEnd 1) → tapped «Chuẩn bị thị tẩm»
- [harness] ×1 NO-EXIT DIALOG .kmov «» (div.kmov.kcf.km-full): no close / next after scrolling to its end → later visits unstuck at once by taps
- [game] ×1 dialog scrolled to the end has no close / next button: .kmov «»

## Notes (runner s9f #1/#2, 11/26/2026)

- ending: Lãnh cung — Tuổi xuân qua đi, age 40, game imposed (no exit pick); robot-audit.js: VALID (real taps, jsClicks 0, no cap, no bot exit); promotion roads 226 seen / 84 picked (rt-offer rule).
- harness switches at fresh ckpts: ec026335 → 2df8f5fa (b1673) → 0e0ebe29 (b2067) → 8ea10d7e (b2416); game pinned 5e013076 (local server, localhost:8765) for the whole life; the json harness field shows only the last harness.
- GAME BUG: SAVE QUOTA SPLIT b2716 stored 5233180 / live b2746, lsK 6312 KB (localStorage quota ~5.2M; stored save frozen at 5228745-5228777 chars, live played on). See flight2-s9f-savesplit.md.
- RESUMED FROM STALE SAVE b2716, lost ~245 buổi; harness R.buoi over-counts by ~245 from here (game clock is truth). Final harness buổi 3447 ≈ game clock b3202 (year 23 by audit).
- GAME BUG: dialog scrolled to the end has no close / next button: .kmov «» (harness tapped out at once; 2 harness lines belong to it).
- DEAD BUTTON ×1: «Nghỉ ngơi» covered by span.kitem in #rtoast (pre-8ea10d7e harness gap, not a game dead per F #19).
- "runner error: browser closed" lines come from deliberate harness-switch kills.
