# Rerun of E's solo cnv_ma lives — SEAT R3 final report (Foreman D, road cnv_ma)

Method: real taps (`review/robot-realtap`), fold 755x1000, no cap, no bot exit unless it is the only option. 16 solo lives from `robot-audit-E.json` + 1 replay (rebel-1-rp). Results (md, json.gz, moments) in `dev/handover/robot/rerun-cnv-cnv_ma/`; per-life reviews in `dev/handover/robot/review/rrcnvma-R4-<life>-review.md`. Shots on CDN `img/_review/rerun-cnv_ma/`.

| life | end | buổi | valid | harness sha (start) | note |
|---|---|---|---|---|---|
| cautious-2 | Xuất cung 30 | 1712 | VALID | 4523381f | age-25 «Xin ở lại» |
| cautious-3 | Xuất cung 30 | 1707 | VALID | 1a29f470 | restarted fresh once |
| lover-5 | Xuất cung 25 | 711 | VALID-UNPROVEN | 1a29f470 | log says «Xin ở lại» picked yet exit; 3 replays on LIVE did not reproduce; F9 closed not-a-game-bug |
| rebel-1 | Xuất cung 25 | 698 | VOID | 1a29f470 | voluntary exit with sibling option |
| rebel-1-rp | death age 22 (Hồn lìa dưới trượng) | 590 | VALID | bfa73a6e | replaces rebel-1 |
| rebel-3 | Hồng nhan bạc mệnh 19 | 180 | VALID | 1a29f470 | death |
| rebel-4 | Hồng nhan bạc mệnh 28 | 1563 | VALID | 1a29f470 | death; age-25 stay |
| rebel-5 | Xuất cung 30 | 1709 | VALID | 1a29f470 | age-25 stay |
| schemer-1 | Được ban hôn 21 | 542 | VALID | 93812531 | event ending, no exit tapped; 1 dead button unidentified |
| scholar-1 | Xuất cung 30 | 1560 | VALID | 93812531 | age-25 stay; 1 dead button |
| skilled-2 | Xuất cung 30 | 1417 | VALID | 93812531 | no age-25 dump captured |
| skilled-3 | Xuất cung 30 | 1563 | VALID | 93812531 | age-25 stay |
| skilled-4 | Xuất cung 30 | 1562 | VALID | 93812531 | age-25 stay |
| skilled-5 | death age 22 (Liễu yếu gặp sương) | 589 | VALID | 93812531 | death |
| speed-1 | STOPPED by order b~1806 | 1806 | VALID-INCOMPLETE | bfa73a6e+F10 | risen consort past 30, see below |
| speed-4 | Xuất cung 30 | 1709 | VALID | bfa73a6e+F10 | age-25 stay; 4 dead-button rows in «Nhờ thái giám tìm thú nuôi» (likely harness target) |
| speed-5 | Xuất cung 30 | 1709 | VALID | bfa73a6e+F10 | age-25 stay |

Sha column is the harness at the life's start (json `harness.sha`); lives that resumed after 21:35Z 25/11 continued on later worktrees (93812531 → bfa73a6e at 23:37Z, + F10 hang hooks from bac25389).

## Findings
- **speed-1 age-30 (design question, not an exit bug):** the maid rose via `srvRise` (j42.js:448, `S.srv.risen=1`), after which `srvMonth` returns at `j42.js:301 if(!isSrv())return ev` before the age-30 «Xuất cung» (j42.js:303). She plays on as a consort at age 30+ (same family as R1 cnv_ban speed-4 died 36, R2 speed-k2 32). Save: CDN `img/_review/srv-age30/speed-1-age30-b1803.ckpt.json`. Owner of fix: D-SRV-RANK worker (design call: age cap after rising).
- **F10 hang (speed-1, b1254–1255, 05:19Z):** main thread in `kitScrollCues` MutationObserver loop, renderer 2.5→3.2 GB, auto-killed by RT_HANGKILL, resumed fine. `speed-1.hang.json` in results dir, sent to F10.
- **lover-5:** see table; keep VALID-UNPROVEN.
- **Harness gaps for F:** log tap bbox/elementFromPoint; build id per life; last card option labels in log; end shot taken on the loading screen sometimes; resume from a checkpoint with no save gets stuck at «Chọn sổ»; ending banner overlap, «Tin báo» stall family, avatar overlap in «Tuyển tú» (reported earlier).
- Dead buttons: scholar-1 1, schemer-1 1, speed-4 4 — none confirmed as game bugs.

Totals: 16 solo lives + 1 replay: 12 VALID, 1 VALID-UNPROVEN (lover-5), 1 VALID-INCOMPLETE (speed-1), 1 VOID (rebel-1, replaced by rebel-1-rp); ~25h wall clock, par 3.
