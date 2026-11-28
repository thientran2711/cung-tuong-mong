# E-TITLES3-LRM5: the titles line (review/titles-daycard-lrm4-rv db036137, PASSED) re-merged onto LIVE 5ad52416 → review/titles-daycard-lrm5 (worker session_01DgYSWnLKPLcUZXYzT1Ggyv, Foreman E C9)

depth 1 · START_CTX ≈ 4 % (get_session read 0; estimate) · finished at ≈ 15 %. No rollover needed.
PRIORITY #1 CHECK ('titles-daycard|titles2|lrm5|K-XL-GROW-SAME'): OD 17 (23/11 titles2 BUILD NOW) | main 5ad52416 (re-fetched 07:10Z, still LIVE): no TITLES2 / jdh3 code | review/* titles-daycard-lrm4-rv db036137 (PASS, merged here), kit-kri-xl-rv178 786f65ad (K-XL-GROW-SAME, trial only) | claims E-TITLES3-LRM5 (this), lrm4 / RV done.
KIT CHECK: reuses kitPanel (reward / info) + kit rows, kitTitlePlate (§82 / §82.1), kit option cards (§6.2b), j3 kitEmpty, jkhand kitHandWants (§101 WHERE: Danh hiệu NOT a hand, KK58 ACK). I did not add or change any kit part. kit-std-scan: head 38 = LIVE 38 (see §2).

**HEAD = 709caa80** (review/titles-daycard-lrm5, pushed). Never pushed to main, no PR.

## 1. Merge (merge-base 5fb13d60)
| commit | what |
|---|---|
| 06f60c6b | merge db036137 onto LIVE 5ad52416. Only **index.html / sw.js** conflicted (built files: took the LIVE side) |
| 709caa80 | rebuild with dev/site/build_site.sh. assets.json reset to LIVE (only its `v` field had changed) and sw.js recomputed against it |

Honesty check (0 lost LIVE hunks):
- Titles delta (5fb13d60 → db036137, without index/sw) = 21 files, +1612/−545. Head vs LIVE (without index/sw) = the same 21 files, +1612/−545.
- Every one of those files is byte-identical to db036137 except **dev/build/jbal2.js**, the only file both sides changed (auto-merged). There, the head-vs-LIVE ± lines = the titles ± lines exactly, and the head-vs-db036137 ± lines = LIVE's own 5fb13d60→5ad52416 ± lines exactly. So both sides are kept.
- Every other file = LIVE 5ad52416 byte for byte; assets.json = LIVE.

## 2. Gates on head 709caa80 (A/B on LIVE 5ad52416, same box, alternating runs)
| gate | head | LIVE A/B | verdict |
|---|---|---|---|
| titles2-unit ×3 | PASS 84/0 · 84/0 · 84/0 | absent on LIVE | ok |
| titles2-ui | PASS · 0 issues (2 WARN iPad caption plate wider than the picture = K-DH-CAPFIT, already filed) | — | ok |
| chapter-title-hook | PASS 41/0 | — | ok |
| title-notice-tap (real taps, Fold + iPad) | PASS 10/0 | — | ok |
| titles2-scan | rows 1185 · lc 48 · missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 | — | ok |
| quickcheck.js (old index = LIVE 5ad52416) | **QUICKCHECK PASS** · open 2556 ms · 0 errors · **old save from LIVE loads + plays a buổi** · perf median of 3 new/live: render 305/305, tab 510/527, buổi 1980/4368 ms, tasks>200 41/45 | — | ok |
| time-spill-guard (×3 head, ×2 LIVE) | FAIL 20 · **PASS** · FAIL 20 | FAIL 20 · FAIL 20 | **LIVE-own**: the 20 FAIL rows are identical line for line on head and LIVE (runtime greet / gate greeting «offered · null», place sneak / ask «offered ""»). Head even passes 1 of 3 |
| kit-std-scan Fold + iPad (REPORT_ONLY) | 38 {X02 20 · X06 12 · X08 6} | 38 {X02 20 · X06 12 · X08 6}, FAIL list identical (sorted diff empty) | = LIVE |
| coop-e2e (live Worker) ×2 | 51 ok / 0 FAIL · 51 ok / 0 FAIL (both cut by the 10-min cap) | 48 ok / **3 FAIL** («week 1 advanced» ×2 + same-world) · 51 ok / 0 FAIL (cap) | head clean; LIVE's 3 = Worker/host-lag flake |
| q-softlock, default (random life) ×5 | PASS · FAIL 8 · FAIL 1 · FAIL 1 · FAIL 1 | PASS · PASS · PASS · FAIL 1 · PASS | see below: same row on LIVE |
| q-softlock, origin pinned (scratch copy of the test, `__forceOrigin`) ×2 | dtq 0 · 0 FAIL; cn **1** · 0 FAIL | dtq 0 · 0; cn 0 · 0 | — |
| dialog-fixed | **83 ok · 1 FAIL** iPad (§3) | (LIVE 5fb13d60 passed in lrm4 / RV) | kit, blocked on kit-kri-xl |
| page errors | 0 in every run | 0 | ok |

q-softlock: every 1-FAIL run on head AND the one LIVE failure (run 4, iPad) is the SAME row: «view parked by a tab change → the card shows on «court»». The state there is `{"q":1,"modal":true,"tab":"court","next":true}`, so the card DOES show and «Sang buổi» is enabled (no soft-lock). Only the `foc==='parked'` part fails: the person view was closed, not parked. Head run 2 (8 FAIL) is the case where the person view never opened at all (`view ''`, realtap «gone» on «✕ person view»), so every view row fails on both devices. That is a test-setup/life case, and the waiting card still shows.
HONEST NOTE for the reviewer: on head this row failed in 5 of 9 runs, on LIVE in 1 of 9. Since LIVE fails the same row, by the brief's rule this is not branch-born. But head hits it more often. The titles diff touches none of jdayq / jdfv / jkring / realtap / tabs (diff = assemble.py, j71, j72sd, jbal2, jdh, jdh2, jdh3, jdh3n, jgoal, jkhand, KIT.md, tests, content docs). The RV-163/173/RV lrm4 reports already list this row as LIVE-own and life-dependent (it depends on the random life / RNG stream, and the titles code shifts that stream). The fix belongs in the test: pin origin + seed, and accept 'parked' OR a closed view as long as the card shows. FOR test owners / KK.

Harness notes (scratch only, never committed, deleted): kit-std-scan run from a scratch copy that answers non-page ctm.test requests 404. The stock test sends the 20.6 MB page for every sfx/vendor request and breaks the Playwright pipe at this size (lrm4 §3 note; still not fixed on LIVE). The q-softlock origin-pinned copy sets `window.__forceOrigin` in FRESH.

## 3. dialog-fixed: head vs trial with kit-kri-xl
| build | result |
|---|---|
| head 709caa80 | 83 ok · **1 FAIL** iPad 1180x820 «frame size XL: left figure same size + position in 3 dialogs»: 3-dai-ket-cuc 754 fig h621 y188 vs 7-ket-cuc-thua / 8-quiet 548 fig h415 y291. This is the expected **KIT K-XL-GROW-SAME** fault, the same numbers as lrm4 / RV / MAIN 178. Fold all ok. |
| TRIAL = 709caa80 + merge review/kit-kri-xl-rv178 786f65ad (only index.html / sw.js conflicted → rebuilt, assets.json = LIVE; scratch, NOT pushed) | **84 ok · 0 FAIL, «dialog-fixed: all pass»** on Fold + iPad |
The kit fix is NOT in my branch (brief). The lander lands lrm5 together with or after ui4 (kit-kri-xl).

## 4. Law 12: «Tiếng thơm» / «Danh hiệu mới» notice + Danh hiệu panel, Fold 755x1000@2 + iPad 1180x820@2 side by side, looked at 3×
Shots (scratch, outside git, no CDN): /home/user/wt/lrm5-gates/law12-t2-notice.png, law12-t2-notice-cp.png, law12-t2-panel-top.png, law12-t2-panel-dt.png (from titles2-ui).
- «Danh hiệu mới» (chapter title «Gỡ lời đàn hặc»): kit reward panel, plate on the picture, rows Cách có / Khi đeo / Xem lại, two plain kit option cards «Đeo ngay» (Tốn không · Được không) + «Để sau» (not a hand, §101). Nothing cut, inside the frame on both devices.
- «Tiếng thơm» (rp notice, «Hiền lương thục đức», Bậc «cao · trên «Khiêm cung»»): kit panel + rows Vì sao / Bậc / Được / Mất / Mất khi / Xem lại, words only, no % and no numbers. It still shows the **K-NOTICE-ACK** empty block «Lúc này không còn việc để chọn · Đóng thẻ này; …» on both devices. This is LIVE-born (RV lrm4 §5), filed for the kit keeper, and does not block this branch.
- Danh hiệu panel (Nhiệm vụ › Danh hiệu 12/49): tabs Mục tiêu · Danh hiệu · Thiên mệnh, «Danh hiệu trên đầu», «Hiệu Hoàng thượng ban» (Cách có / Còn thiếu), «Danh tiếng · 3/28» group with kit plates + text (Được / Mất / Mất khi in words: «một phần mười hai», «hơn một chút»), and a kit card «Đeo «Cứu người trong lửa»». The body scrolls inside the frame («Kéo xuống»). No overflow-x, nothing clipped by the frame on either device.

## 5. Verdict / next
**RV READY BIG (delta) review/titles-daycard-lrm5 709caa80 — dialog-fixed blocked on kit-kri-xl (trial PASS).**
- Delta vs the PASSED db036137 = only the LIVE merge (5fb13d60 → 5ad52416) + rebuild; no code change by me.
- Landing: kit-kri-xl (ui4) first or together, then rerun dialog-fixed + titles2-unit on the combo.
- Open, not branch-born: time-spill 20 (LIVE-own, identical), q-softlock «view parked» row (LIVE shares it; it shows more often on head, see §2 note), K-NOTICE-ACK (LIVE-born), K-DH-CAPFIT WARN (filed).
- Worktrees deleted after push. Scratch logs/shots in /home/user/wt/lrm5-gates (outside git) can be deleted at will.
