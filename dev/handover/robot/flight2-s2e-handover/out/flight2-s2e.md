# flight2-s2e (real-tap harness d417d3bb, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick |
|---|---|---|---|---|---|---|---|---|
| flight2-s2e | HARNESS |  | 50 |  | 0 | 0 | 5 | — |

## Dead buttons


## Bugs

- [game] ×1 dialog queue holds 4 copies of «Tâm trạng · Quý phi Lương Lăng Ba» (each close pops one; looks like a dead ✕)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Dực Khôn cung · Hòa Sướng hiên · Ở đây còn 2 người»
- [game] ×1 softlock: «Sang ngày mới» disabled with no dialog on screen (dialog queue Q=10: Quan hệ với / Tin báo / Tin báo / Tin báo / Dung · Dung nghi / Tin báo)
- [game] ×1 softlock: «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn (dialog queue Q=1: Tin trong cung buổi này)
- [harness] ×1 runner error: page.waitForTimeout: Target page, context or browser has been closed