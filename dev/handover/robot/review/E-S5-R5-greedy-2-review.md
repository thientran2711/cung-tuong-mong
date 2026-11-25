# E-S5-R5-greedy-2 — player review (pf / pt_su, greedy = min-maxer, iPad 1180x820, seed 1756174360)
PRIORITY #1 CHECK: OD 25/11 ~05:10–05:58Z rules | review/robot-realtap 93812531→594fa1ee harness | claims E-S5 (this runner).
## 1. Summary
Persona greedy (bot=bold). Origin pf, road pt_su. Ended by DEATH «Hồng nhan bạc mệnh — Bị ban rượu độc vì mưu hại Tiêu Tịnh Sơ», age 20, year 3, max rank 0, 445 buổi, 7956 real taps, jsClicks 0, no exit pick. Real time ≈ 2 h 40 (11:50–14:27Z incl. one same-life resume at buổi 96 on a newer harness). VALID life.
## 2. Scores (1–10)
a. First 15 minutes — 5: dawn/Tổng lược/Tin trong cung/bổng lộc chain before the map; goal unclear.
b. Gameplay loop & pacing — 3: 445 buổi in 3 years, rank 0 the whole time; the same cold-palace map and Tư trang/Việc pages repeat; the loop gives a min-maxer nothing to optimise.
c. Buttons & UI — 3: «Sang ngày mới» disabled/no-op ×16 with no cue; duplicate «Tâm trạng» dialogs (up to 17 copies) must be closed one by one; «Tin báo» ✕ off-screen; 150-tap no-clock loops (map page ×17, dialogs ×16); JS page error «Cannot read properties of undefined (reading 'off')» ×2.
d. Story & drama — 4: the night cards are lovely; the ending says I schemed against Tiêu Tịnh Sơ without my choice → plot does not follow from my choices.
e. Characters — 5: rivals (Tần Thượng Quan Hà Nhi, Quý nhân Tiêu Tịnh Sơ) exist and have lives (favoured at night), but I could not do anything with them from lãnh cung.
f. Choices & fairness — 4: as in the sister life, the cold-palace choices are cost-only vs free.
g. Rewards & feedback — 5: night/morning cards give clear feedback; few rewards.
h. Mini-games — n/a (none reached).
i. Visuals & sound — 8: night card art is excellent; scenes consistent.
j. Co-op — n/a.
## 3. Top
Loved: night card «Đêm không được triệu»; scene art; death text.
Hated: dialog-queue duplicates; «Sang ngày mới» no-op; three years with nothing to do.
Would I play another life? Not on this road unless the cold palace has goals.
## 4. BUGS
1. [game] dialog queue dedupe: «Tâm trạng · <person>» up to 17 copies (known, F).
2. [game] «Sang ngày mới»/«Sang buổi» disabled or no-op with no dialog (×16).
3. [game/kit] «Tin báo» and «Phụ tuyến · Tân quân lập uy Chương 2» ✕/options not reachable (stuck 15 min ×4).
4. [js] page error «Cannot read properties of undefined (reading 'off')» ×2 (repro: see greedy-2 json bugs, y3).
5. [game] map page 150-tap no-clock loops (Trường Môn viện, Cảnh Phúc cung).
## 5. Suggestions (parking lot)
- Cold-palace road needs goals; explain WHY «Sang ngày mới» is blocked; show who accused me before the death.
