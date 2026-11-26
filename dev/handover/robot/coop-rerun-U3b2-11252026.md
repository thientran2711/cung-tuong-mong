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
| 17 | 9SAR | u4 7959f1b5 PROVISIONAL | + patch sha 85909494 | Fold / iPad | 20 | **VALID — MITIGATED** (same RELOAD_AT list, all 10 reloads OK both seats; 85 min closed by time at buoi 149/148, year 2, 0 stuck, 0 SEATHANG). Earlier attempt: Worker not ready, 47 min on title = runner script bug, discarded. (u3br/seg17-9SAR-MITIGATED) |
| 18a | D36E | u4 7959f1b5 | + f40a56ff | iPad / Fold | 21 | stopped at ~18 min on foreman order (switch to freeze-fix verify) |
| 18b | FJDK | **u5b** = u4 + jksize/jinv diff of coop-freeze-kmrew c20aaa6e | + f40a56ff | Fold / iPad | 18 | **VALID — UNMITIGATED (RELOAD_AT=20 only)** B FREEZE-FIX VERIFY: passed buoi 61 + 73, closed by time 85 min at buoi 131/132 year 2, 0 stuck, 0 SEATHANG; DOM nodes flat 4–9k (u4: 25k→55k + wedge at 61) (u3br/seg18-FJDK-u5b-verify) |
| 19 | VFE5 | u5b | + f40a56ff | iPad / Fold | 22 | **VALID — UNMITIGATED (RELOAD_AT=20)** B FREEZE-FIX VERIFY #3: iPad host / Fold guest, 85 min closed by time at buoi 124 year 2, 0 stuck, 0 SEATHANG; DOM nodes 4–9k flat; host documents count 9→27 (watch) (u3br/seg19-VFE5-u5b) |

## Findings
- DOM nodes grow ~2–3k/min between reloads (host 25k@8 min → 48.6k@16 min), drop at each reload but not to baseline (~38k after 3 reloads); documents 5–12. Freeze root = jinv kitInvFit observer leak (fix review/coop-freeze-kmrew ee0824f4).
- Recurring chip-on-card hit-area bugs (#kpop on «mưa …» / «Hôm nay mặt mộc» cards, #kg82 «Trước khi ra tay», .dlg «Ghi chú» noFreePoint, chip modal «Tâm trạng»).
- Story scene «Phụ tuyến · Tân quân lập uy» stays unreachable on iPad (KK31).
- Box: background local Worker/static die ~90–110 min after start → rooms capped at SEG_MIN 85; run via Bash run_in_background only.

## Seg16 facts for the freeze fixer
- 76JU guest Fold passed «Chương 1 khép lại» once (buoi 73, 9 buoi after reload at 64); «Bổng lộc» chains 34 taps, first at buoi 13 (5 after reload at 8); no hang.

## HANDOVER / END (U3b-2, 26/11 ~10:55Z)
Valid: seg16 76JU + seg17 9SAR (MITIGATED), seg18 FJDK + seg19 VFE5 (u5b, UNMITIGATED, freeze fix verified twice). Invalid: seg12–15 (stuck/hang before fixes). Job done per Foreman B child 3; no seed 23 started. Box: servers stopped; work dirs /home/user/wt (game4 = u4, game5 = u5b, run17.sh/run18.sh = room scripts). START_CTX ~3 %, ended well below the roll line.
