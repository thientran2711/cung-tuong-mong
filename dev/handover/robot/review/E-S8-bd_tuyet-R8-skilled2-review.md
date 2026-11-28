# E-S8-bd_tuyet-R8-skilled2 — end-of-life review (player + reviewer, persona: skilled = efficient/competent)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b on resumes (first start earlier), iPad 1180x820 real taps, jsClicks 0, seed 3927155259, ~60 resumes (same life). Build note: **the whole life ran on pinned local builds** (first build 0a4c8010+ 26/11 → 1dcb373e+ …); I could NOT move it to LIVE (its 5.23M-char save does not fit the LIVE origin's localStorage on restore → QuotaExceededError, ckpt restored). Audit says VALID (single recorded build); counted VALID with the flag **«pinned old build, never on LIVE»** — not usable as an UNPINNED-LIVE END-CARD «Bổng lộc» proof (MAIN 180).

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona skilled (bot `sens`). Rank 0 (Đáp ứng Tiết Tinh Uyển in the end panel), 40 tuổi at the end.
- 22 game years, 5974 buổi, 1735 taps, 263 turns, offers 620/217 picked. Ending: **Lãnh cung — «Tuổi xuân qua đi»** (game-imposed). End panel «Xuân tàn lãnh cung» with the **«Bổng lộc tháng chạp · Nội vụ phủ phát · Chạm để mở» chest shown over the end panel** (shot end.png) — on the OLD pinned build, so it does not count for the MAIN 180 check; button «Chuyển kiếp» below. exitPick none, jsClicks 0, stuck 7, dead buttons 20, 59 bug rows. audit VALID.

## 2. Scores (evidence: moment log, shot end.png)
- a. First 15 min 6. b. Pacing 2 — the longest life of the round (5974 buổi) at rank 0. c. UI 4 — 20 dead buttons and 7 stuck rows (below); the end-panel chest overlay hides the end card on this old build. d. Story 3. e. Characters 4. f. Choices 5. g. Rewards 4 (monthly chest repeats). h. Mini-games 5. i. Visuals 8 (the chest art is lovely). j. n/a.
## 3. Loved: the chest art. Hated: the chest sitting over the ending panel; so many «Tâm trạng» dialog duplicates.
## 4. BUGS (59 rows, old pinned build)
- **Dialog queue duplicates**: «Tâm trạng · …» queued up to 7 copies (Huệ tần Quách…, Thục tần Mạnh…, Tể tướng Hạ Thiệ…); close buttons «Tâm trạng · Ta / Đáp ứng Khương… / Huệ tần» «Lui» have no effect.
- **Stuck/no-clock loops** ×7 (150 taps without a clock step on «Tâm trạng», «Dực Kh…» page, «Phụ tuyến · Tân quân lập uy · Ch.2» — 15 min, known options clipped on iPad, fixed KK29 on LIVE); softlock «Sang ngày mới» disabled with no dialog ×4; «Sang buổi» no turn ×1.
- **DEAD BUTTON ×20**: `.mapsc` covered by `button.k3r.kasr` / `span.k3l` in #kshR (the Ân sủng panel over the Dư đồ map), `.kmov` `img.kfr` / zero size, `#modal «Cung Tường Mộng»` close tapped 3× stays.
- **JS page error** `f.rk.split is not a function` ×1.
- Save quota/SAVE STALE (5.2M chars); renderer tab crashes; save never restorable on LIVE.
## 5. Suggestions (freeze → recorded): the chest overlay must not cover the ending panel; dedupe the mood dialogs; shrink the save for 5000+ buổi lives.
