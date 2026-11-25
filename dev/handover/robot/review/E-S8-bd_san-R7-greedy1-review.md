# E-S8-bd_san-R7-greedy1 — end-of-life review (player + reviewer, persona: greedy / min-maxer)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed; harness b4b181f8 (+ earlier shas 69e41729…64d62d9b resumed from checkpoints, same life); game builds 6a87c26fe0f5 → 79050fbf5464 → 4763d410aa0d (LIVE moved during the life).

## 1. Summary
- persona greedy (harness bot `bold`), origin bd, road bd_san, iPad 1180x820 real taps, seed 1955587375.
- Years 11 (age 19→29), 1601 buổi, 6467 taps, max rank: lowest tier (rank 0 on every checkpoint; ended as «Phế phi · lãnh cung»).
- Ending: **Lãnh cung — «Phát điên trong lãnh cung»** (game-imposed, age 29). exitPick none (no bot-chosen exit). Harness: realtap, jsClicks 0. audit: VALID.
- Real time ≈ 10 h wall clock incl. 2 page freezes (buổi 16, 45) and 5 container restarts (resume=1 from checkpoint, same life).

## 2. Scores (1–10) — evidence is the harness moment log + shots; I did not see every buổi, only the every-20-buổi looks, new screens and the ending
- a. First 15 minutes: 5. Tutorial «Lời dặn» + chapter cards explain the goal; but the first buổi already stacks «Tin báo», «Tin trong cung buổi này», «Lịch tháng» dialogs before I can act.
- b. Gameplay loop & pacing: 4. 1601 buổi with rank 0 the whole life: the loop is act ×2 → «Sang ngày mới». From the lãnh cung years on (year 3 «Rời lãnh cung» → «Lãnh cung» → «Bước vào») the screen is the same Trường Môn viện, same «Nghỉ ngơi/Tĩnh dưỡng» cards for ~8 game years (shot m-look-980 «Đêm không được triệu» is the 100th such night).
- c. Buttons & UI: 3. 7 dead-close rows (`«Tin báo»` / `«Lịch tháng»` «Lui» tapped 3× for real, dialog stays), 41 «150 taps without a clock step» loops on the Trường Môn viện page, 19 «Sang ngày mới» tapped but buổi does not turn (queue Q=1 «Tin trong cung buổi này») and 4 «Sang ngày mới disabled, no dialog» with dialog queue 15–24 deep (Chương 4 · Mã cầu và săn hổ ×N, Lịch tháng ×N).
- d. Story & drama: 4. Chapter 4 «Mã cầu và săn hổ» is queued dozens of times (duplicates), so it never reads as one event.
- e. Characters: 5. Faces/outfits good; «Tâm trạng · <person>» opens duplicate dialogs (3–12 copies, e.g. ×12 «Đáp ứng Cố Tố Tuyết») — a person card must be closed N times.
- f. Choices & fairness: 4. As a min-maxer: once in lãnh cung every card costs «khắc» and only «Nghỉ ngơi» / «Tĩnh dưỡng» are useful; no way back to favour was offered (Sủng 0, Danh 0 for years).
- g. Rewards & feedback: 4. Ending card is a plain fate line; the long decline gives no warning that it is heading to «Phát điên».
- h. Mini-games: n/a (0 played this life).
- i. Visuals & sound: 8. Art is strong (m-look-980 night room; Trường Môn viện figures); no odd sounds heard by the harness.
- j. Co-op: n/a.

## 3. TOP 3 loved / hated / replay
- Loved: (1) the room art and night frames («Đêm không được triệu»); (2) the cổ trang wording of cards («Nghỉ ngơi một lát», odds ladder shown as Rất vững/Hiểm); (3) a real game-imposed ending instead of a quit.
- Hated: (1) the person-dialog duplicate queue; (2) «Sang ngày mới» that does not advance; (3) 8 years in lãnh cung with nothing to do.
- Replay: yes for story, not this road unless lãnh cung is fixable.

## 4. BUGS (all known families, already in the BUG FAST LANE / MAIN lanes — none new)
1. Dialog queue duplicates: «Tâm trạng · <person>» ×3–12 (each close pops one) — known pcPort/queue dedupe family.
2. «Sang ngày mới» no-turn softlock with Q=1 «Tin trong cung buổi này» (19×) and Q=15–24 (4×) — known (F «Sang-buổi-no-turn», fix-8 / SANGBUOI r3).
3. «Tin báo» / «Lịch tháng» no ✕ on iPad → dead «Lui» ×7, «150 taps no clock» ×41 + .mapsc ×3 — known KK26 KIT BUG #3 / KK29 pack-4 (LIVE 08e7d79f).
4. Page froze 2× (renderer hang, buổi 16, 45) — harness watchdog resumed; note for F (rss samples in json).
Repro: saves in the container /home/user/wt/out/shots-E-S8-bd_san-R7-greedy1/ (not in git).

## 5. Suggestions (feature freeze: recorded only)
- A lãnh cung exit path (favour recovery / pardon event) so a road does not collapse to 8 empty years; one «Chương» card per chapter (no re-queue).
