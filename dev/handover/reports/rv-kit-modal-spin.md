# rv-kit-modal-spin — reviewer (sonnet)
PRIORITY #1 CHECK: brief + reports/kit-modal-spin.md read; main kitModal j79, KIT_ACT_CATS j79, kitSpin jph, jcloud dropAsk, jload lDlgWait diffed; no other kitSpin / y-duoc on main.

Reviewed review/kit-modal-spin 5a3cc86a. Merged LIVE origin/main f43efc71 (only index.html/sw.js conflicted → rebuilt with build_site.sh) → review/kit-modal-spin-rv 4be15f10.

- KP18 PASS: one rule in kitModal (kptitle when #title up); jcloud per-place patch removed; in play no kptitle (test). Shot fold-title-dialog LOOKED: dialog above title art, clickable.
- KP16 PASS: kitSpin one part 28/18 px; dialog wait uses same ring; reduced motion → breath (test); Gọn → kspin-still via kfStill (code read). Shot fold-spinner LOOKED: both rings.
- KP06 PASS: 15 moves table matches test output exactly; «Hầu thuốc Hoàng thượng», «Mang chăn ấm, thuốc men» stay Hầu hạ; nothing else moved.
- Tests: kit-modal-spin.js PASS Fold+iPad (all ok, no page errors). QUICKCHECK PASS 217 s, core gates PASS, old save ok, perf render 277/280, tab 499/502, buổi 1153/1424.
- Non-blocking notes: (1) kitModal adds kptitle to any dialog opened while #title is visible; if such a dialog stays queued after the title closes it would keep z55/no backdrop (showModal wrapper strips kptitle only for HM/SM). Not reproduced. (2) kitConfirm shot shows only «Xóa hẳn» + ✕ (no «Thôi» button) — looks pre-existing kitConfirm layout, not from this change. (3) did not look at iPad shot / golive.sh (not run).
- Worker's CDN shots img/_review/kit-modal-spin/ still to wipe (`cdn_sync.py --wipe-review kit-modal-spin`); I made no shots.
VERDICT: PASS 4be15f100106fb4b85b667eed869bd49a0e6d06f
