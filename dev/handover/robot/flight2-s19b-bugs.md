# flight2-s19b bugs / infra (iPad 1180x820, greedy, seed 2026112551)

Build 128ec6b7d5fa (main 0562e15f, rt-serve-build self-check OK), harness review/robot-realtap f65d019b, pin=1, fresh profile. Real taps only, no cap. Ran in one go, no resume, no INFRA events, no stuck, 0 dead buttons. Save 0.54M chars at b250 (no quota).

## Game bugs (JS page errors, both inside kcDo → Object.g.go, i.e. an event-card option handler)
1. `ReferenceError: c is not defined` (build line 78143, kcDo → go) at ~buổi 1997 trace step, year 1-2. Option handler uses an undeclared variable `c`.
2. `ReferenceError: to is not defined` (line 78135, kcDo → go) at ~buổi 3744 trace step, year 2. Option handler uses an undeclared variable `to`.
Same family (kc card option closures); please scan all kcE option handlers for undeclared names. Stacks in flight2-s19b.json bugs[].
3. Console: 404 /img/kit/emo-tinhnghich.webp (×3). Image path is not served by the local build (images live on CDN) — check whether LIVE serves it; likely harness-side only.

## Ending — for the foreman's judgement (VALID per robot-audit, exitPick none)
Year 3 «Điện tuyển» → «Trả thẻ bài» (palace selection failed, age 20): three options, all end the life: «Gả cho con trai Thượng thư b…», «Xin ở vậy, mở lớp dạy chữ cho con gái» (taken by the greedy picker), «Cắt tóc đi tu» (Tốn không, Được xuất…). The bot took the middle one; the marry option existed, so check whether you accept this as a game-imposed ending or want the life replayed. The harness did not tag it as an exit pick.

## Result
LIFE DONE: «Nữ phu tử» age 20 · buổi 278 · taps 1582.
