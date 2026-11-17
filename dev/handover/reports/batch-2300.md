# batch-2300 — hourly go-live batch (builder report)

Builder session_01UV1SzmGLUepYfBP7dwyHAo (opus). Coordinator main s26 → s27 (session_01UV1Szh248gDvHSAH88RvJm). START_CTX ≈ 5 % (get_session read 0; own estimate).

**FINAL SHA: `744b80e717dbda6cd679b1752e49ce5f35fc99df`** on `review/batch-2300` (base origin/main 08725411). Game build = c20eb8f2 (744b80e7 adds a test-only commit). Main pushes; builder did not touch main.

## In (11)
| branch | PASS head | merge notes |
|---|---|---|
| review/map-frame-kit-r1 | ef4bf825 | jpm.js kpmArt: branch exact/hall rule + main's "rank with no own picture → tạm" kept |
| review/time-spill-r1 (incl. one-core-land) | 27fa7955 | jtds.js: main kitOffBac + branch BAL.td keys; quickcheck.d/50-coop-one-world.sh = main's |
| review/palace-voice-r1 | 04c49d51 | j72.js / jne.js: branch wording + main BAL keys (BAL.m72.bdOk, A.bearDanh) |
| review/diemtrang-coop-look-r1 | 6f72e641 | test toilette.js: main's equivalent kmend loop |
| review/tut-quests-r1 | 66f598de | clean |
| review/seatcap-r1-golive | ce1538ba | clean; jseat.js kept last before jcoopone.js |
| review/mem-upgrade-r1 | 64b40270 | clean (+ __j95off test fix, below) |
| review/preg-rate-r1 | 1c31bd79 | jbal.js: main outQ 60 + branch conc .5 / trystC; jroute.js: trystCh + BAL.route keys |
| review/ghen-shown-r1-golive | 7ee482e0 | j34 seat check (seatHas) + BAL.ghen.rankUp; j8 nightGain (+ nightG/nightA kept as reads of it); j75/j79 branch; jbal2 voice + ghen blocks |
| review/danh-p1-r1 | dd3363ff | jbal2: branch charity values + main succN one-core |
| review/flip-entry-r1 | d821e988 | clean (urgent owner bug, added by s26) |

assemble.py list: union, jseat.js then jcoopone.js LAST (jvisit.js, jmapc.js, jvoice.js, jtq14.js, jfe.js added).

## Out
- **review/road-b1-fixa-r1 c012bf32** — the one-core gate (one-core-guard.js, arrives with time-spill-r1) FAILS: 303 new typed rule numbers in jrd_cn/jrd_tt/jrd_muoi/jrd_dtq.js. s26 ruled: never --allow-grow; back to Foreman B (numbers into BAL).
- **review/origin-intros-r1 34d90ea4** (added by s26, merge last) — merges clean but 57 one-core fails (52 jkc2.js, 5 jbal2.js) → kept OUT of this batch on `review/batch-2300-oi`; s26 order: builder moves the numbers into BAL → "OI READY" for the 00:32 batch (in progress, see below).

## Builder fixes inside the batch
- one core: BAL.night was set twice (jbal.js + jbal2.js) → jbal2 only; §84 / §85 kit-sample demo numbers (jgrey/jmapc) read BAL.kitpage.demo.grey / .mapK. Gate: 0 fails (6674 inline vs frozen 6691).
- tests follow merged code (no game change): rules-one-source night card = ghen-shown nx() best/worst (nightGain); preg-rate reads the j22 tryst/affairMonth bodies (main wraps them in j24/j95) and flips at buổi tối (flip-entry); mem-upgrade + memories set window.__j95off around forced NPC acts (D note).

## Checks (on c20eb8f2 / 744b80e7 unless noted)
| check | result |
|---|---|
| quickcheck (core gates G1–G3 + hooks, time-spill guard, open, old save from live loads + plays a buổi, perf vs live) | **PASS** 243 s · open 959 ms · render 222/224 · tab 302/270 · buổi 768/807 ms |
| one-core-guard | PASS 0 fails |
| coop-e2e | 59/59 (c20eb8f2) · 59/59 ×2 (7c467596, before flip-entry) — no flake hit |
| coop-one-world seeds 7 + 3 | PASS (7c467596) |
| coop-toil-look | 29/29 (7c467596) |
| flip-entry Fold 755x1000@2 / iPad 1180x820@2 | ALL OK / ALL OK |
| ghen-shown | ALL OK (one earlier FAIL under heavy load, passed on rerun) |
| emperor-visit | PASS (2 years × 2 lives; default 6×6 bot crashed the tab = memory, like the earlier seatcap OOM) |
| preg-rate | PASS ×2 |
| danh-p1 | FAIL 0 |
| voice-band / voice-core | PASS / PASS |
| mem-upgrade / memories | ALL OK / ALL OK |
| map-frame-kit Fold + iPad | PASS (run with a LOCAL copy adding a localhost proxy bypass: the test launches chromium with HTTPS_PROXY and no bypass, so on this box the local server never loads — test env issue, not the game) |
| tut-quests | 40/40 |
| seatcap-sim (6 lives × 60 months) | PASS, 0 over-cap months |
| seatcap-active | 4 lives timed out at 900 s; 1-life rerun: see tail note |
| time-spill-guard | PASS static + runtime |
| walk-spill Fold | case "night" flaky: 3 fails in 6 runs (2 with flip-entry on, 1 with jfe disabled) → timing, not flip-entry; spill + closed cases always PASS |
| toilette | no overflow, no page errors, reaction card OK |

## LOOK (shots.js local copy, waitForTimeout(9000), not committed)
CDN review folder `img/_review/batch-2300/` (owner rule: shots never in git; verdict giver wipes with `python3 dev/site/cdn_sync.py --wipe-review batch-2300`):
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-2300/fold-755x1000-home.png — Fold: 2 figures in the fixed slots, ratio ≈ .79, no overlap, no dark block.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-2300/ipad-1180x820-home.png — iPad (cung nữ life): 2 figures ≈ .80, no dark block. Note (not batch-blocking): the place heading prints the master's rank "Quý nhân" as a small blue chip over the line.

## CHANGE line (dev/site/CHANGE.txt, first line)
Vào game mới không còn bật ngay màn lật thẻ, lật thẻ chỉ khi vào buổi tối; dư đồ nhãn giấy mới; việc dài lấn sang buổi sau; lời trong cung hợp phẩm cấp người nghe; chơi chung xét đúng dung nhan, y phục của bạn; ba chương đầu có việc tự tay làm mới được thưởng; mỗi phẩm chỉ đủ số ghế; người trong cung nhớ việc đã qua; dễ có thai hơn; cơn ghen hiện rõ; phát bạc cứu giúp thêm danh tiếng.

## Next (this session): OI
review/batch-2300-oi: origin-intros-r1 on top; jkc2.js 149 typed numbers → BAL.kc2 (values checked identical by substitution), BAL.entry.why / BAL.entry.w.kc as BAL tables, gate 0 fails locally. To do: rebase on 744b80e7, build, origin-intros tests + quickcheck + kc2val re-measure → "OI READY <sha>" to main s27.
