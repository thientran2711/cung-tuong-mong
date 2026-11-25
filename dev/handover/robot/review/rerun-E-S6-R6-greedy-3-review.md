# R6-greedy-3 — end-of-life notes (E-S6, ipad, bot=sens, seed 523933307) — NOT COUNTED, bug-finding only
Played on a LOCAL build of origin/main 17835565 (not the LIVE github.io build) and harness 2aad6849 → resumed 69e41729 at buổi 208. By Foreman E lesson d (17:30Z) it does not count for the tally. Ending: Lãnh cung — «Phát điên trong lãnh cung», age 30, year 13, 1868 buổi, 10 851 taps, 0 JS clicks. Rank went 1 → 0 at year 2 (buổi ~236) and stayed 0 for the other 11 years.
Written from the result JSON and moment log; I did not look at the shots of this life except by reading stuck lines, so there is no score table: scores would be invention. A real player review will come with the counted (LIVE-build) lives.
## Bugs found (evidence under shots-R6-greedy-3/, save + dump per stuck)
1. GAME no-button dialogs: .dlg «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1» (4 stucks), .dlg «Tin báo» (2), .dlg «Sổ nguyệt sự» (1), .dlg «Cung nữ thân tín tam đẳng Nghiêm Oanh Nhi» (1) → ladder needed (family KK26/KK29, kit-opts-pack-4).
2. JS: «Cannot read properties of undefined (reading 'off')» ×2 (fixed on LIVE via choose-guard-r per Foreman E); «f.rk.split is not a function» ×1 (pcPort, button-crawl family, year 5 buổi 3).
3. GAME: «Tâm trạng · <person>» «Lui» tapped 3× for real, dialog stays (5 consorts: Bạch Ngưng Hoa, Tôn Hàn Yên, Vương Yên Nhiên, Triệu Họa Nhi, Sử Thục Hoa) — duplicate-copy queue (button-crawl-fix-2 family).
4. ODD: dead button «?» zero-size under .kmov at year 5 buổi 3.
5. DESIGN note: rank drops 1 → 0 in year 2 with no recovery in 11 years; 49 offers seen in the sibling life, picks stay rare (see R6-lazy-1).
