# flight2-s16a (real-tap harness 97e55a45, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s16a | Vợ quan thanh liêm — Vợ quan thanh liêm | 20 | 283 | 780 | 0 | 0 | 1 | — | 0 / 0 |

## Dead buttons


## Bugs

- [js] ×1 page error: c is not defined
## Notes (runner s16, 11/27/2026)

- game: LIVE main a22cf45d (CTM_BI s 539603bf+, b c1633dab8e17, t 2026-11-26T21:29Z), served locally with rt-serve-build.sh, pin=1 (builds=1 for the whole life); iPad 1180x820, persona bold, seed 2026112542, fresh profile.
- harness 8ea10d7e from start; HARNESS SWITCH 8ea10d7e -> 97e55a45 at buổi ~161 (F ROOT order 00:40Z): process killed, resumed from ckpt, same life/out/build, save restored in full.
- robot-audit.js: VALID (real taps, jsClicks 0, no cap, exitPick null). COUNTS: lives 1 · VALID 1 · INVALID 0 · MIXED-BUILD 0.
- ending: «Vợ quan thanh liêm», age 20, year 3, rank 0, buổi 283, taps 780. Daughter of a salt merchant, not chosen at Điện tuyển; the card «Trả thẻ bài» offered ONLY three endings (Gả cho con trai Thượng thư bộ Hộ / Xin ở vậy, mở lớp dạy chữ cho con gái / Cắt tóc đi tu) = game-imposed, every road ends the life. Robot tapped «Xin ở vậy, mở lớp dạy chữ cho con gái» (trace step 1083, not an exit label); the game ended the life as «Vợ quan thanh liêm» (marries the Minister of Revenue's son = option 1).
- GAME BUG (suspect, F triage): card «Trả thẻ bài» — the tapped 2nd option («Xin ở vậy…», gain «Tài cao») produced the ending text of the 1st option («Gả cho con trai Thượng thư bộ Hộ»). Either the ending is picked by roll/rank, not by the option, or the option→ending mapping is wrong. Check dlg «Trả thẻ bài» opts/fx.
- GAME BUG: ReferenceError «c is not defined» ×1 (year 2, buổi ~122): card «Thứ muội giành mối», option «Nói lại với cha»; odds closure reads `c` declared inside go() (const c=kcR("cha")) → index.html:77932:321 ← kcDo ← go. Sibling kcCard options likely the same (whole-family scan).
- dead buttons 0, stuck 0, bugs 1. Save peaked ~541k chars (buổi 262). Console 404s (/img/kit/emo-*.webp, pixi vendor, VOICES.json, ico-download.webp) = local sparse serve has no CDN/vendor files, serve artefact.
