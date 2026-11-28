# E-S8-bd_tuyet-R8-random3 — end-of-life review (player + reviewer, persona: random = clicks anything)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 3022128181, ~20 resumes (same life). Build note: **flag «mixed build»** — 4 builds (48ab87e6 → cf61b8e4 → ca4a1689 → 5fb13d60+ LIVE); the first part ran on the pinned local build (pin-server resume), the later part on LIVE after I cleared pinUrl/build0 in the ckpt per Foreman E's pin note (backup kept). VALID per Foreman E ruling.

## 1. Summary
- origin bd, road bd_tuyet, iPad, persona random (bot `rand`). Lâm Mạn Nhu, Công chúa Ba Tư hòa thân, 33 tuổi at the end, rank 0 the whole life (Đáp ứng, Sắc 42 Tài 80 Tâm cơ 30 Đức 36 Danh 1 Sủng 0 at y7).
- 16 game years, 2280 buổi, 921 taps, 193 turns. Ending: **Hồng nhan bạc mệnh — «Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 33 tuổi»** (illness, game-imposed). exitPick none, jsClicks 0, stuck 0, dead buttons 4, 22 bug rows. audit MIXED-BUILD (valid with flag).

## 2. Scores (evidence: moment log, shots dead-ipad-1795801225666.png (Dư đồ), dead-ipad-1795830235518.png (lật thẻ bài))
- a. First 15 min 5. b. Pacing 3 — 16 years at rank 0; long and flat. c. UI 5 — 4 dead-button rows (below); the Dư đồ map is attractive (snow palace, building labels «N bóng · 2 khắc») but the «Ân sủng» side panel overlaps map hot-spots on the right. d. Story 4 — an exiled princess slowly fades and dies of illness; no rise at all. e. Characters 5 (the lật thẻ bài scene «Hoàng thượng lật thẻ bài», cards Trình Thanh Hoan / Lâm Thư Dao… is lovely). f. Choices 4 (random bot). g. Rewards 4. h. Mini-games n/a. i. Visuals 9. j. n/a.
## 3. Loved: the card-flip (lật thẻ bài) scene with the «Tối nay: Quý nhân … được chọn hầu đêm nay» card. Hated: dead hot-spots on the map and the cut-scene frame; the death with no cure path.
## 4. BUGS (22 rows)
- **DEAD BUTTON ×4**: `.mapsc` «Hàm An1 bóng · 2 khắc» covered by `span.k3l` in #kshR (y7 buổi 227); «Hàm An3 bóng · 2 khắc» covered by `button.k3r.kasr` in #kshR (buổi 284) — the Ân sủng side panel covers the map building hot-spots; `.kmov` «?» covered by `span.kin` (y15) and `span.kbg` (y16, the glow frame on the lật thẻ bài scene) — cut-scene decoration over the buttons.
- **Gift picker (old-build segment)**: item pick grid «kipgo» confirm stays off-screen after 8 real scrolls; «Chọn lá này» re-opened 3× with no gift given — fixed on LIVE per D (not seen on LIVE segment).
- **Softlock** «Sang ngày mới» ×3, buổi does not turn, dialog queue Q=1 «Nghe đồn» (LIVE; same family E-S3 / speed4 reported).
- **Save**: SAVE REWIND ×1, SAVE STALE (old pinned segment); LIVE save small.
- **Renderer tab crashes** ×15 (buổi 51…2167), harness resumed each time; late button «Ta biết rồi» 11.2 s after .kmov opened.
## 5. Suggestions (freeze → recorded): the map hot-spots must not be covered by the Ân sủng panel; remove glow overlays from cut-scene buttons.
