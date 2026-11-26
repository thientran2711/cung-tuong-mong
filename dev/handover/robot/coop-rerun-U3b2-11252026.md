# U3b-2 co-op rerun — segment results (runner session_01N1tNP2HWuJXKRafMwdgWGn, 25/11 20:55Z–)
Unit U3b, pair 4. START_CTX ~3 %. Rules: real taps; segment = 2 h real-tap OR year 2, 0 stuck, >=1 mid-year save+reload. Dumps: review/robot10-coop-saves u3br/<seg>/.

| # | room | game | harness + patch | devices (host/guest) | seed | result |
|---|---|---|---|---|---|---|
| 12 | V6TM | 512cfee6 | 5edf09f6 + #11 | iPad / Fold | 15 | lost: box background procs died between turns (setsid/nohup); only Bash run_in_background survives |
| 12b | KJ2Z | 512cfee6 | + #12 91d359dd | iPad / Fold | 15 | INVALID host iPad page hang buoi 15 (~17 min), SEATHANG x3, ended HARNESS (u3br/seg12-KJ2Z) |
| 13 | WPXU | 512cfee6 | + #13 19535bcd | Fold / iPad | 16 | INVALID 2 h, reload 30 OK, buoi 146/147 Y2→3, 1 stuck per seat (guest story scene «Tân quân lập uy»; host #coopfz) (u3br/seg13-WPXU) |
| 14 | u4-s17 | u4 7959f1b5 PROVISIONAL | + #15/#17 2273c8a1 | iPad / Fold | 17 | INVALID reload 30 OK; host #coopfz stuck x4, guest #title + «Cung Tường Mộng» modal x3; buoi ~70 (cause: unstick ✕ on #coopfz = leave room, fixed in #20/#21) (u3br/seg14-u4-s17) |
| 15 | u4-s18 | u4 7959f1b5 | + #21 c2f7cc83 | Fold / iPad | 18 | INVALID host Fold renderer freeze buoi 61 (~42 min) (page.evaluate hangs, pause impossible); freeze fixer repro seed 56 buoi 61; killed ~76 min (u3br/seg15-u4-s18-hang) |
| 16 | 76JU | u4 7959f1b5 PROVISIONAL | + #22 6ebd0f5d | iPad / Fold | 19 | **VALID — MITIGATED** (RELOAD_AT=8,15,28,40,52,64,76,88,100,112, both seats all OK; 85 min, closed by time at buoi 130, year 2, 0 stuck both seats; valid except the DOM leak) (u3br/seg16-76JU-MITIGATED) |
| 17 | 9SAR | u4 7959f1b5 PROVISIONAL | + #26-ish 85909494 | Fold / iPad | 20 | **VALID — MITIGATED** (same RELOAD_AT list, all 10 reloads OK both seats; 85 min closed by time at buoi 149/148, year 2, 0 stuck, 0 SEATHANG). Earlier attempt 6OK-less: Worker not ready, 47 min on title = runner script bug, discarded. (u3br/seg17-9SAR-MITIGATED) |
| 18 | (running) | u4 7959f1b5 | + f40a56ff | iPad / Fold | 21 | MITIGATED, running |

## Findings
- DOM nodes grow ~2–3k/min between reloads (host 25k@8 min → 48.6k@16 min), drop at each reload but not to baseline (~38k after 3 reloads); documents 5–12. Freeze root = jinv kitInvFit observer leak (fix review/coop-freeze-kmrew ee0824f4).
- Recurring chip-on-card hit-area bugs (#kpop on «mưa …» / «Hôm nay mặt mộc» cards, #kg82 «Trước khi ra tay», .dlg «Ghi chú» noFreePoint, chip modal «Tâm trạng»).
- Story scene «Phụ tuyến · Tân quân lập uy» stays unreachable on iPad (KK31).
- Box: background local Worker/static die ~90–110 min after start → rooms capped at SEG_MIN 85; run via Bash run_in_background only.

## Seg16 facts for the freeze fixer
- 76JU guest Fold passed «Chương 1 khép lại» once (buoi 73, 9 buoi after reload at 64); «Bổng lộc» chains 34 taps, first at buoi 13 (5 after reload at 8); no hang.
