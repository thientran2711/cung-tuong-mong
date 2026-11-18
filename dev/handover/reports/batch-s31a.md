PRIORITY #1 CHECK ('presentation-wiring|kit-ico-rank|fig-headtop'): all three reviewer PASS in CLAIMS (bc8461cc / a1c7a37c / f95f5a92), none on origin/main | builder only, nothing new built.

# batch-s31a — builder report (session_01UV1SziPrputLM5qYtCL6zH, opus, opened by MAIN s31)

**FINAL SHA: `c29866a6`** on `review/batch-s31a` (base = live main **6ca04148**, re-merged after main moved from 65dcf52f). Builder did not touch main, manifests or any Worker.

## In / held
| branch | PASS head | status |
|---|---|---|
| review/presentation-wiring-r1 | bc8461cc | IN (generated files only, took ours) |
| review/fig-headtop-r1 | f95f5a92 | IN (generated files only) |
| review/kit-ico-rank-r1 | a1c7a37c | **HELD — co-op rebirth regression** (below). The 3-branch build is kept at `review/batch-s31a-full` e0b82ba4 (base 65dcf52f; assemble.py conflict resolved = main's module list + score.js/jkrank/jrank after jnight) |
| morechip-fix eba25768 / fig-tag-chip / opt-pic-same | — | no PASS before gates started → next batch |

## BLOCKER found: kit-ico-rank breaks co-op rebirth
coop-e2e vs LIVE Worker: e0b82ba4 (3 branches) **61/63** twice; bisect: main+presentation-wiring 62/62, main+pres+kit-ico-rank **61/63**; live 65dcf52f 62/62. Failing: "B reborn as a new person in the same world" + "A sees the reborn friend by her new name": after B dies, the rank board («Bảng xếp hạng», Mã khôi phục / Cách tính) + «Hồng nhan bạc mệnh — Mở Sổ luân hồi / Tiếp theo» end card sit over the rebirth choice and B never gets a new life within the test's 12 taps. Shot: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/RANK-coop-rebirth-blocked.jpg. Owner of kit-ico-rank must check whether a real co-op player can reach rebirth (or only the test's button regex lacks «Tiếp theo»), then re-review.
ctm-rank Worker: NOT deployed. NOTE for main: .github/workflows/rank-worker.yml runs `wrangler deploy` automatically on a push to main that touches rank/worker/** (steps + rollback: reports/review-kit-ico-rank-r1.md lines 40-47; live script already byte-identical; test lives on the live board may need a wipe).

## Gates on c29866a6
| check | result |
|---|---|
| quickcheck --runs 7 vs live 6ca04148 | **PASS** 263 s · open 1268 ms · old save ok · core gates PASS · perf render 144/143, tab 248/237, buổi 689/779, tasks>200ms 10/10 |
| it-key-guard | PASS · it-key-scan: jdemo 3 (known guarded reads) + jmind 2 (main's jmind, also on live) |
| oldsave-r1 | 16/16 |
| coop-e2e vs LIVE Worker | **63/63** |
| fig-rank-audit | FAIL 2688 wrong-dress cells — **identical on live 6ca04148** (pre-existing from batch-d8; owner: fig-rank / batch-d8) |
| save-dlg-scan / fig-feet-fam / book-col-scan / map-full / newlife-oldsave | all OK (0 bad / 62 cases 0 px / ALL OK / PASS 5 sizes / FAIL 0) |
| fig-headtop (head-top spread) | iPad 1180 + 1366 PASS; Fold 0.0007 (re-run; first run 1.12 = shot before images loaded). Live 6ca04148 Fold 0.0426 |
| presentation.js | ok both sizes |
| presentation-people.js | **flaky FAIL**: hooks.preg = 0 in 3 of 4 size-runs on base 6ca04148 (on old base 65dcf52f 2/2 ok). The pregnancy moment does not fire in the test after batch-d8; owner presentation-wiring to look (not visible as an error; animation missing) |
| newlife-leak | FAIL 9; live 6ca04148: FAIL 6 (AG.* old-life refs = main's jagent). The 3 extra come from **presentation-wiring**: window.KPM_LOG (test-hook log, capped 80) keeps old-life names across a new life; also WHYL (main's jwhyn) bigger than a fresh life. Not player-visible; fix = clear KPM_LOG on new life (owner presentation-wiring) |

## LOOK (https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ ; wipe: python3 dev/site/cdn_sync.py --wipe-review batch-s31a) — host mode, real rot.js frame
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/fold-755x1000-home.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ipad-1180x820-home.jpg
- Ngự hoa viên with Hoàng hậu: the random life on the final sha gave no crowned queen in the garden; head-top check shots from fig-headtop.js (queen + lower ranks): https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ht-batch-1180x820.jpg (crowned Hoàng hậu beside Đáp ứng, head tops level; NOTE the two name tags touch: «Lục Linh LungĐoan Mộc Nhược Lan» — tag width vs close figures, kit tag owner), https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ht-batch-1366x1024.jpg. Earlier shots of the same scene on e0b82ba4 looked right (Fold: queen crown above, head level with Đáp ứng).
- person dialog: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/fold-755x1000-person.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ipad-1180x820-person.jpg
- Dư đồ: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/fold-755x1000-map.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/ipad-1180x820-map.jpg. Fold: rail icons cover «Dư» of the «Dư đồ» title and the right card column is absent after a person popup — **same on live**: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31a/fold-755x1000-map-LIVE.jpg (pre-existing, map-full follow-up).
Looked at all.

## CHANGE line (first line of dev/site/CHANGE.txt)
Hoàng hậu đội mũ phượng nay đứng ngang tầm các phi tần khác, dáng người đo theo đỉnh đầu chứ không theo ngọn mũ; chiếu chỉ triều đình và các hồi truyện chính mở ra như cuộn lụa, thi cử hay tranh tài có kết quả thì có khoảnh khắc đóng ấn.

## HANDOVER (17/11 ~14:30Z)
START_CTX ≈ 8 %, now past START + 25 % (many shots) → this builder stops; main opens the successor.
Recipe: worktree from origin/main, merge --no-ff each PASS, generated conflicts → ours, assemble.py module list = union, one build_site.sh, CHANGE line first; gates list above (+ each branch's own tests). Host shots: /home/user/wt/bs31a-tools/shots.js <worktree> <outdir> <tag> (fold + ipadAir; consort life; garden via goTo('vuon') then S.visit.people override + kitKnown — random lives often give no queen: crown one or reuse fig-headtop.js shots). Gate runner: /home/user/wt/bs31a-gates/r2/run.sh.
Open for the next batch: kit-ico-rank (after co-op rebirth fix + re-review), morechip-fix/-corners, fig-tag-chip, opt-pic-same.
