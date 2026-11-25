# Player review — rerun-nc_tuc-random-1 (casual newcomer, bot=rand, Fold 755x1000, seed 4180392236)
Harness 93812531 (earlier segments 4523381f → 1a29f470). Road nc_tuc. Ending: Lãnh cung «Phát điên trong lãnh cung», age 27 (y10), buổi 1482, 12440 taps. robot-audit: VALID.

HONESTY NOTE: the runner was an unattended supervisor driving the robot for ~14 h. Screens were looked at only at checks (a few `now.png`, the `end.png`), NOT every 20 buổi, so there is NO live moment log (ROBOT-PLAYER-REVIEW §A not met). Scores below come from the harness bug/dead-button log (45 bugs, 49 dead buttons, 16 stuck) and the end screen only; treat as low-confidence, mainly UI/loop-focused. Story/character/mini-game areas could not be judged and are left unscored.

## Scores (1–10)
- a First 15 min: not observed (n/s).
- b Loop & pacing: 4 — long no-clock loops on «Trường Môn viện» (146 episodes, Phế phi in lãnh cung), «Danh hiệu» ×16, «Đeo «Trăng soi rèm ngọc»» ×10: the loop gets dead-ended often.
- c Buttons & UI: 2 — «Tin báo» queue stacks up to 13 copies, each ✕ pops one (looks dead); «Lui» no effect on «Tâm trạng · Ta», «Tin chờ người sai đi», «Lịch tháng»; «Để sau» on Tin báo; «Nhờ thái giám tìm thú nuôi» «Xem <thú>» buttons covered by span.kitb/b.kidn/button.kit-x in #mb.
- d–f, h: n/s. 
- g Rewards/feedback: 3 — at the ending card «Hôn lạc lãnh cung / Chuyển kiếp» the «Bổng lộc tháng mười» reward popup (Nhận) is on top of the end card and hides its text.
- i Visuals: 6 — reward chest/items and portrait look good (end.png).

## Top loved / hated
Loved: reward chest popup art; the end card framing. Hated: Tin báo queue; popup over the ending; endless no-clock loops in lãnh cung.
Would I play another life: n/s.

## BUGS (to fast lane, already sent to Foreman D 21:20Z)
1. Popup over end card (shot shots-rerun-nc_tuc-random-1/end.png, container-local).
2. JS page error `f.rk.split is not a function` ~b89 after a dead «Tin báo» «Lui» (rerun-nc_tuc-random-1.log line 29).
3. Tin báo dead ✕ / stacking ×13; Lui no effect on three other dialogs.
4. «Nhờ thái giám tìm thú nuôi» «Xem …» covered by other elements.
5. No-clock loops: Trường Môn viện ×146, Danh hiệu ×16, Đeo «Trăng soi rèm ngọc» ×10, Xem quan hệ của ×5.
## Suggestions
Fix Tin báo queue so one ✕ closes all; show end card before any reward popup.
