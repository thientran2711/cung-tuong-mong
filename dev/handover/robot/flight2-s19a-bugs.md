# flight2-s19a bugs / infra (iPad 1180x820, cautious, seed 2026112548)

Build 9ab008eb74f9 (main 98c77517, rt-serve-build self-check OK), harness review/robot-realtap f65d019b, pin=1, fresh profile. Real taps only, no cap, exitPick none.

## Game bugs
- none logged (bugs 0, stuck 0, dead buttons 0).

## Harness / INFRA
- INFRA 1: runner killed at buổi ~810 (2h background-command limit, 09:16Z); relaunched, resumed from ckpt.
- SAVE REWIND (harness bug, from the resume): reload went back from b807 (clock 6.69.1.1) to the stored b806 (clock 6.69.1.0), 1 buổi lost. Resume restored ckpt save written at b806/807 boundary; 1 buổi replayed.
- Save size: 1.96M chars at b750, 2.01M at b800 (key hclh-save-v2-1); no quota/SAVE QUOTA SPLIT, no tab crash.

## Result
LIFE DONE: ending «Hồng nhan bạc mệnh» (Năm 7, tiên đế băng hà, Thái hậu ban lụa trắng tuẫn táng), age 24, buổi 903, taps 572.
