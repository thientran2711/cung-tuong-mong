# flight2-s9f (real-tap harness ec026335, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s9f | HARNESS |  | 1623 |  | 1 | 0 | 1 | — | 129 / 50 (exam 18, decree 111) |

## Dead buttons

- page «Diên Huy cung · Chiêu Nhân hiên · Ở đây còn 1 ngườ» «Nghỉ ngơiNghỉ ngơiNghỉ ngơi một látRất vữngNằm ngh» covered by span.kitem in #rtoast · dead-ipad-1795675052961.png

## Bugs

- [harness] ×1 runner error: page.waitForTimeout: Target page, context or browser has been closed
## HANDOVER (runner rollover 11/26/2026 10:45Z, life NOT ended)

- life: flight2-s9f · iPad 1180x820 · bot cautious · seed 2026112527 · LIVE game 5e013076 (keep the same build for the whole life)
- state at ckpt: buổi 1623 · year ~11-12 · rank 0 (peak rank 1 at buổi 202) · promotion roads 127 seen / 49 taken (exam 18, decree 109) · bugs 0 game bugs · stuck 0 · dead buttons 1 (harness gap: #rtoast over «Nghỉ ngơi», shot dead-ipad-1795675052961.png, not a game DEAD per F #19)
- harness: review/robot-realtap @ ec026335 (worktree: git worktree add --detach /home/user/wt/hec0 ec026335)
- ckpt: branch review/ckpt-s9f @ 16496f71, dir ckpt-s9f/ (flight2-s9f.ckpt.json + .json + .md + -moments.md). Copy all four into the out dir (e.g. /home/user/wt/out-s9f/) before resuming. Profile/shots are not needed (pictures refetch).
- serve the game: cd <worktree of main 5e013076> && python3 -m http.server 8765 (run_in_background, timeout 7200000; re-arm every 2 h)
- resume command (run_in_background, timeout 7200000, re-arm every 2 h):
  cd /home/user/wt/hec0 && until node dev/test/robot-rt.js http://localhost:8765/ /home/user/wt/out-s9f dev=ipad bot=cautious seed=2026112527 life=flight2-s9f resume=1; do sleep 5; done
- rules unchanged: real taps only, no cap, no exit road; hourly line to the Foreman; STUCK LIFE over 30 min; switch harness only on SWITCH at a fresh ckpt; at the end run dev/measure/robot-audit.js, push flight2-s9f.{json,md,bugs.md,-moments.md}, send «LIFE DONE s9f <ending> <age>».
- note: "runner error: browser closed" lines in the results come from deliberate harness-switch kills, not game bugs.
