# Review ES8-bd_san-speed1-h — E-S8 row run by E-S3 (origin bd / road bd_san, iPad 1180x820, bot sens, seed 807812900)
Harness real-tap f65d019b, fresh life, NO resume, ONE build the whole life: unpinned github.io LIVE CTM_BI s=5fb13d60+ (build 8af7b3429f38). VALID (robot-audit VALID, not mixed).
## 1 Summary
Age 22 · year 4 · max rank 0 · 492 buổi · 5912 real taps · ending «Lãnh cung — Phát điên trong lãnh cung» (game-imposed; status chips «Tâm bệnh · nguy kịch» + «Lãnh cung» at the end) · bugs 4, stuck 0, dead buttons 0.
## 2 Findings (facts)
- End card «Hồng lạc lãnh cung · Mở Sổ luân hồi» is CLEAN on 5fb13d60+ — no «Bổng lộc» popup over it (end.png). First end card on an unpinned, never-resumed life of the current LIVE.
- Softlock «Sang ngày mới» tapped 3× and the buổi does not turn ×3, dialog queue Q=1 each time: «Việc của kẻ hầu» (b~10), «Một ánh mắt» (b~100), «Nghe đồn» (b~370) — hidden-queue family, still present on 5fb13d60+.
- SAVE STALE ×5 (stored b<1, «stored clock unreadable», every 100 buổi) → the known packed-save false positive; never a reload rewind (no SAVE REWIND this life).
- «Tâm bệnh · nguy kịch» dialog (b481) offers only «Lui», then the life ends at b492: mind-illness death/imposition with no cure shown (same «nguy kịch w/o cure» family).
- No gift-picker bug, no crash, no dead button, no JS error this life.
## 3 Suggestions: clear the hidden dialog queue before «Sang ngày mới» disables; give «Tâm bệnh · nguy kịch» a cure/relief path.
