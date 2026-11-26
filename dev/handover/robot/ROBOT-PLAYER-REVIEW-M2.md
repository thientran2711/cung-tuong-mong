# ROBOT-PLAYER-REVIEW — M2 / M2b (thd_tho, Con gái thầy đồ nghèo, SEED 102, Fold 755x1000, real taps)
Honest scope: I am a tap robot (policy.js), not a human. Everything below is from logs, tap traces and the 12 moments M2 wrote; I did NOT watch the whole life by eye. Items marked (log) are measured; (feel) are inferred from how the robot behaved.

## Result
Natural death, no rare ending: **«Tuổi xuân qua đi»**, age 40, Y21 (03:45Z 26/11), **rank 2 of 6**, ≈11 h (M2) + ≈11.5 h (M2b) real. 3305 sang-buổi/ngày, 28,971 real taps, 16 true reloads (2 of them rolled the save back ~1 game year), 14 evening SOFTLOCK-RELOADs, 469 UX-OPTION-CENTRE hits. Builds served: 0756a05b -> f10d269d -> f21a1042 (kit stack) -> 351122ba -> **5e013076 (SANGBUOI r4)** for the last 5.5 h. final.json + last screen in dev/handover/robot/m2/.

## 10 areas
1. **Pace / length (log)**: ~40–45 min of real play per game year when nothing stalls; one life = 21 years = ~23 h of robot play. A human would never do this; the 40 min/year pace is mostly stall + escalation time, not content.
2. **Evening «Sang buổi» stall (log)**: no modal, «Sang ngày mới» dimmed, Q/DQ.newsHold holds cards. f21a1042: 5 softlocks in one hour; 351122ba: ~1 per 40 min; **r4 5e013076: 0 in ~5 h**. r4 fixed it for this life.
3. **Save / reload (log) — WORST**: save rollback on true reload. Y12 (f21a1042) lost 1–2 months twice; Y20 (5e013076) reload #13 and #15 each lost ~13 game months and a year number (age 39 -> 38): save content frozen after 'Tiếp tục kiếp này'. Report dev/handover/reports/m2b-rollback.md. A real player who closes the app loses the session.
4. **Tap targets / UI (log)**: tapping the centre of an option card hits the odds chip («Thang cơ duyên») instead of choosing — 469 times over the life; the robot has to tap an offset. Tap-catcher after result toasts swallows the next tap (needs 2 taps). Left side of an option opens its picture full-screen.
5. **Tin báo / news (log)**: 24–76 queued items; the older build clipped the buttons («Xem tin/Để sau» below the card) -> 94 escapes on 0756a05b; fixed by kit pack-4; later builds only 'unread=2 total=20' style counts, no clip seen after f10d269d.
6. **Mini-games (log)**: 427 state polls, 61 results, 23 idle; the same makeup mini-game (≈25–40 s) is offered as the first act every day -> (feel) repetitive. My own TOIL helper throws 'getBoundingClientRect of null' 191 times (harness bug, not game).
7. **Hành sự variety (log)**: the robot picked «Đọc sách giải khuây» 1061x, Trò chuyện 423x, Nghỉ ngơi 300x, Điểm trang 190x — partly my policy (first safe card), but the real list gave little reason to choose otherwise (feel).
8. **Odds / wording (feel)**: «Rất vững … TỐN không ĐƯỢC không» style rows were readable; no % seen; no wording violation noticed by the robot (it does not read for tone).
9. **Progression (log)**: rank only 2 of 6 after 21 years of a safe-play policy; the life ended by age, not by plot — (feel) a safe, low-risk player gets little drama.
10. **Rewards (log, last screen)**: «Bổng lộc tháng chạp» lists 9 items with long repeated lines (3x identical «Nến sáp vàng»); clear and kit-consistent, but repetitive; items appear real (law 6c ok at a glance).

## Top-3 loved (robot's view)
1. r4 evening fix — five hours without one stall.
2. Reload-resilient flow: «Chơi một mình -> Tiếp tục kiếp này» got back in every time (except the rollback).
3. Reward/result cards from the kit are readable and consistent (final.png).

## Top-3 hated
1. Save rollback after 'Tiếp tục kiếp này' (loses a game year; loop for a robot).
2. Centre-of-option tap opens the odds legend (469x) — the kit chip steals the main action.
3. Evening stall/news hold on older builds (f21a1042/351122ba) needing true reloads.

Caveats: SEED 102 + safe policy = one life; not a balance test. The robot did not try rare endings (exit roads blacklisted by design).
