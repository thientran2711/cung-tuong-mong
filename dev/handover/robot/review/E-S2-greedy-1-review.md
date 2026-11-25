# E-S2 greedy-1 — end-of-life review (robot as player: min-maxer, bot=bold, Fold 755x1000)
## 1 Summary
thd / thd_tro (seed 2613534650, R2 greedy kiếp 1 rerun), Fold, harness 2aad6849 → resumed on 69e41729 at buổi 317, real taps (jsClicks 0), real time ~4.3 h (06:5xZ–12:33Z). Years 4 (age 21), max rank 0 (never rose), ending «Lãnh cung — Phát điên trong lãnh cung» (game-imposed death-type ending, VALID). 462 buổi, 4541 taps, 5 stuck, 12 dead buttons, 29 bugs.
## 2 Scores (1–10)
a. First 15 minutes — 5. Origin/road start from the roulette is clear; Tin báo / Tâm trạng dialogs stack from buổi 1 and I could not tell which one matters (shots m-new-318-*).
b. Gameplay loop & pacing — 3. 462 buổi at rank 0: bổng lộc, Tin báo, Tâm trạng, Lịch tháng again and again; no progress lever visible for a thd_tro road; year 3 turn 25–31 is the same cards.
c. Buttons & UI — 2. «Nhờ thái giám tìm thú nuôi» «Xem Mèo mướp» etc. dead (covered b.kidn/span.kitb) on Fold; «Lui» with no effect on Tâm trạng / Tin báo / Nội vụ phủ trả đồ / pets; 17 duplicate Tâm trạng dialogs; «Sang ngày mới» softlock under queued Tin báo; 8 JS page errors «f.rk.split is not a function».
d. Story & drama — 3. Fall into Lãnh cung and «Phát điên» arrives with no scene I could act on; «Rời lãnh cung / Tạ ơn» at year 4 turn 37 then madness 3 buổi later: the logic of release then madness is odd.
e. Characters — 4. Many named consorts visible only via Tâm trạng popups; they never reacted to what I did.
f. Choices & fairness — 3. Most buổi offered 1 option (offers 35 shown / 0 picked as a choice).
g. Rewards & feedback — 3. End screen is covered by a «Bổng lộc tháng giêng» reward dialog; the loss is not shown.
h. Mini-games — n/a (none appeared as played; harness mgQuit 0).
i. Visuals & sound — 6. Dialog art and the treasure-chest reward are good-looking; the person focus shows the figure small (owner's known issue).
j. Co-op — n/a.
## 3 Top 3 loved / hated; replay?
Loved: chest reward dialog art; Lịch tháng calendar; the harness-visible odds/names are cổ trang. Hated: duplicate/stuck dialogs; dead pet-shop buttons; rank 0 for 4 years. Would play another life: only if dialogs closed reliably.
## 4 Bugs (repro in out dir, shots not in git)
1. Dialog queue duplicates «Tâm trạng · <person>» (17 copies) — known (F button-crawl-fix-2).
2. «Nhờ thái giám tìm thú nuôi»: «Xem <pet>» buttons covered by b.kidn/span.kitb in #mb, and «Lui» no effect (Fold). NEW to my knowledge — BUG FAST LANE.
3. «Sang ngày mới» tapped, buổi does not turn with «Tin trong cung buổi này» queued (softlock, 150 taps).
4. JS page error «f.rk.split is not a function» ×8, «Cannot read properties of undefined (reading 'off')» ×1.
5. End screen: ending card hidden under «Bổng lộc tháng giêng» reward dialog.
## 5 Suggestions (parking lot, feature freeze)
A visible rank-up goal for thd_tro; fewer Tâm trạng popups.
