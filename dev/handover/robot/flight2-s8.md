# flight2-s8 (real-tap harness 6d3a128f, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick |
|---|---|---|---|---|---|---|---|---|
| flight2-s8 | HARNESS |  | 172 |  | 7 | 1 | 9 | — |

## Dead buttons

- .dlg «Tin báo» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795596986240.png
- .dlg «Lịch tháng» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795596997264.png
- .dlg «Tâm trạng · Thường tại Trưởng Tôn Cẩm Sắt» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795598927894.png
- .dlg «Lịch tháng» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795599350803.png
- .dlg «Tâm trạng · Tần Nhan Lăng Ba» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795599823474.png
- .dlg «Tâm trạng · Phi Kiều Ngọc Hành» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795601791970.png
- .dlg «Tâm trạng · Thuần phi Thôi Lan Âm» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795601849543.png

## Bugs

- [dead] ×1 close button has no effect: .dlg «Tin báo» «Lui»
- [dead] ×2 close button has no effect: .dlg «Lịch tháng» «Lui»
- [game] ×1 dialog scrolled to the end has no close / next button: .dlg «Lịch tháng»
- [dead] ×1 close button has no effect: .dlg «Tâm trạng · Thường tại Trưởng Tôn Cẩm Sắt» «Lui»
- [dead] ×1 close button has no effect: .dlg «Tâm trạng · Tần Nhan Lăng Ba» «Lui»
- [stuck] ×1 no progress 15 min on .dlg «Tin báo»
- [dead] ×1 close button has no effect: .dlg «Tâm trạng · Phi Kiều Ngọc Hành» «Lui»
- [dead] ×1 close button has no effect: .dlg «Tâm trạng · Thuần phi Thôi Lan Âm» «Lui»
- [harness] ×1 runner error: page.waitForTimeout: Target page, context or browser has been closed
## HANDOVER s8 (runner session context rule, 25/11 ~10:20Z)
- Life NOT finished. Harness: review/robot-realtap 6d3a128f (head ece651b0). LIVE game = origin/main (github.io). Same life id: flight2-s8.
- Persona/seed/device: bold · origin thd road thd_tho · seed 372282412 · iPad 1180x820 · character Thạch Tú Uyển (Phế phi · lãnh cung, age 21).
- Checkpoint: dev/handover/robot/flight2-s8-ckpt/flight2-s8.ckpt.json (written 2026-11-25T10:18:01Z, buổi 169, year 2 tháng ba). Results so far: dev/handover/robot/flight2-s8.json. The runner's out dir was /home/user/wt/s8/out (ephemeral, not available to the successor).
- Resume (successor): create a sparse worktree on review/robot-realtap 6d3a128f (or newer head the foreman names), mkdir out, copy the ckpt to out/flight2-s8.ckpt.json, then run in an until-loop:
  `setsid nohup bash -c 'until node dev/test/robot-rt.js https://thientran2711.github.io/cung-tuong-mong/ out dev=ipad origin=thd road=thd_tho bot=bold seed=372282412 life=flight2-s8 resume=1; do sleep 5; done' > out/flight2-s8.log 2>&1 &`
  When the life ends (LIFE DONE) STOP the loop at once and never run resume=1 again; copy the results JSON aside first (F #9 warning).
- Harness switches so far on this life: 1a29f470 (start) → 64cd9fcf (buổi 86) → 1ffae8bb (buổi 116) → 6d3a128f (buổi 164). Rate after 64cd9fcf ~2-3 buổi/min.
- Bugs/stuck so far (8 entries in results JSON): 1 stuck (no progress 15 min on .dlg «Tin báo», 62 tin mới, no ✕ in view, year 2 tháng ba, buổi ~166; evidence flight2-s8-ckpt/stuck-1-dump.json; shots + save only on the runner machine); 1 «dialog scrolled to the end has no close/next button: .dlg «Lịch tháng»» (probably harness false positive, ✕ visible); «dead close button has no effect» ×6: Tin báo, Lịch tháng, and person «Tâm trạng» dialogs of Thường tại Trưởng Tôn Cẩm Sắt, Tần Nhan Lăng Ba, Phi Kiều Ngọc Hành, Thuần phi Thôi Lan Âm (4 different persons, plausible real game bug: person mood dialog close; sent to ROLE B #3 session_01UV1Szis6w42ZQrVFshkBo8 by F #9). Shots (NOT in git) are on the runner only: /home/user/wt/s8/out/shots-flight2-s8/.
- Dead buttons (real taps covered): 0 so far. JS clicks 0. Unstick ladder used 42 times, mostly Lịch tháng loop on 1a29f470 (fixed in later harness).
- Player review files: moments at dev/handover/robot/review/flight2-s8-moments.md (pushed with this handover). The end-of-life review flight2-s8-review.md is still to be written by the successor from these moments + what it sees. Notes so far: iPad layout is clear and roomy; Tâm trạng panel lists «Nguyên do chưa rõ» for 4 of 5 rows; names shown as «???» in Tin báo text; Danh 0, Sủng 0, Bạc ~0-22, rank 0 (lãnh cung), schemes 2.
- Reports go to Foreman F #9 session_01UV1SzgyYZztEVKbPNwpyMf (or successor in FOREMAN_F_STATUS.md). Hourly one line: life · buổi · year · rank · bugs · stuck · dead buttons.
