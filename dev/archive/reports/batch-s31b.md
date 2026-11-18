PRIORITY #1 CHECK: OD/CLAIMS: all seven branches reviewer PASS (CLAIMS rows), none on origin/main before this batch | main bbb3b4ca | review/* = the PASS heads below | claims: builder only, nothing new built beyond the brief's one fix (+ its group).

# batch-s31b — builder report (session_01UV1SzhfMi68Cmn88G2Yqze, opus, opened by MAIN s31)

**FINAL SHA: `17e6c4b4`** on `review/batch-s31b` (base = live main **bbb3b4ca**; re-merged twice as main moved c29866a6 -> 25bfd7cf -> bbb3b4ca). Builder did not touch main.

## In / held
| branch | PASS head | status |
|---|---|---|
| review/fig-tag-chip-r1 | 7582405e | IN |
| review/morechip-fix-r1 | 3bed78e3 | IN |
| review/kit-rcol-top-r1 | 8c84e6be | IN |
| review/stage-caption-r1 | d59541fe | IN (j2.js goTo conflict hand-merged: main's tyv/ksp/lcPeople lines + this branch's msg/cap lines) |
| review/opt-pic-same-r2 | 9b2f7821 | IN |
| review/morechip-corners-r1 | a66f274c | IN (PASS msg from main) |
| review/learn-scene-fix | 41836865 | **HELD — co-op hang** (below). Full build incl. it kept at `review/batch-s31b-full` b244aa6b (base c29866a6) |

## BLOCKER: learn-scene-fix (jorder) hangs co-op after rebirth
coop-e2e vs LIVE Worker on the full build: stuck after "12-reborn" (exit 124), every later buổi FAIL. Diagnosis (debug fields added to a scratch copy of the test): host A has Q=2 ("Mệnh truyện kiếp này", "Hảo hữu vào cung"), modal **hidden**, KMQ=1, kmBusy=false, kmHold()=true, no .kmov on screen, #next "Sẵn sàng" disabled. Deadlock: jorder's showModal gate hides every dialog while kmHold() (a scene queued), but kmPump does not run the queued scene while kmFree() is false (dawn overlay / roulette / kpodov / kmrew), so neither side ever moves; the player sees no dialog and cannot advance. Without learn-scene-fix: coop-e2e **63/63** (twice).
Also on the full build: time-spill-guard (inside quickcheck) FAILED 20 rows (dialogs held while the new life's opening scene waits for a tap; the guard opens cards synchronously). I adapted the guard on batch-s31b-full only (its clean slate also drops KMQ/kmBusy) — that test change is NOT in the final batch.
Suggested fix for the owner of learn-scene-fix: the gate must not hold when the queued scene cannot start (e.g. require kmFree() / kmBusy, or release after N s), then re-run coop-e2e (LIVE Worker) + quickcheck; also learn-scene.js 4xx check fails on img/@W<n>.webp 404s — those 404s are **on live main too** (j25 CW ids requested as raw img paths; not this branch).

## Fix commit (brief) + its group
a2eda349: per-life reset through the one registry (j1 lifeStore): window.KPM_LOG / KPRES_LOG + KPM_LAST/KPRES_LAST/KPM_PREV/KPM_PL/KPM_OUT (jpres), and WHYL/WHY_CTX why-notes (jwhyn, held old-life people). newlife-leak ALLOW += __khN (jkh measure counters, like __rtN).
| newlife-leak | before | after |
|---|---|---|
| live main 25bfd7cf | FAIL 10 (6 AG + 3 KPM_LOG/WHYL + 1 Pixi page error) | — |
| batch | — | FAIL 7 on a2eda349 (6 AG = live + same Pixi error as live), FAIL 7 on 17e6c4b4 (6 AG + win.__kitLastEvArt 2>0 on "start" only — already a lifeStore; random first-event art of the new life, seen once) |
AG.* = main's jagent (owner: jagent). Pixi "r.updateLocalTransform is not a function" appears on live main 25bfd7cf too.

## Gates (a2eda349 full set; 17e6c4b4 = + main bbb3b4ca, re-ran quickcheck / coop / newlife)
| check | result |
|---|---|
| quickcheck --runs 7 vs live (17e6c4b4) | **PASS** 300 s · open 1436 ms · old save ok · core gates PASS · time-spill PASS · perf render 177/158, tab 275/287, buổi 835/884, tasks>200ms 13/12 |
| coop-e2e vs LIVE Worker | **63/63** (a2eda349 and 17e6c4b4) |
| oldsave-r1 | 16/16 |
| morechip-scan | MORECHIP OK (5 devices) |
| fig-tag-fit (5 sizes x 8 origins) | TAGS 622 CUT 75 — all 75 on origin **thd** (first origin run, B495 px = test artifact of the opening state). Live main: CUT 402. main+fig-tag-chip alone also 495 px; fig-tag-chip tip 0 (old base) |
| fig-feet-fam | OK 155 cases 0 px |
| stage-caption.js | bad [] |
| kit-fit 755/1180/1366 | 11 VIOL rows (8 old opt 'empty under text', 3 old toil gaps) vs live 38 (15 person-card square, 13 person cards not one size, 7 unequal pictures, 3 gaps); 0 page errors |
| presentation.js / presentation-people.js | ok / ok (presentation-people was flaky on live too: preg=0 1 of 2 runs) |

## LOOK (host mode, real frame; wipe: python3 dev/site/cdn_sync.py --wipe-review batch-s31b)
- home Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/755x1000-1-home.jpg (right column narrow, no '!' on stat cells; live for compare https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/755x1000-1-home-LIVE.jpg shows '30!' on Đức). Both show no figures on the first-day home stage — same on live.
- garden iPad https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/1180x820-90-garden.jpg: «Ngự hoa viên · Hoa nở rộ…» caption plate on the painted backdrop, right column 140 px, big **+7** chip bottom-right corner. Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/755x1000-90-garden.jpg (Fold opens the Hành sự list over the stage).
- Kẻ hầu xin VIỆC: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/755x1000-91-servant.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/1180x820-91-servant.jpg (tall person card left, option cards with pictures).
- Tài nghệ: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/1180x820-8-tab-art.jpg (ⓘ Cách học in the tab bar, '+2' chip stage bottom corner) · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/755x1000-8-tab-art.jpg · iPad home https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b/1180x820-1-home.jpg
- person dialog: kit-fit 'person' shot was covered by the new-life reward chest (harness); kit-fit scan has 0 person-dialog flags. Học thành tài scene not shot (branch held).
Looked at all.

## CHANGE line
Thẻ tên dưới chân nhân vật không còn bị đẩy khỏi khung hay cắt mất tên; nút +N báo người khuất nay nằm gọn hai góc dưới sân khấu, không đè cột bên; cột phải thu về một bề rộng, chú giải ⓘ lên thanh thẻ, ô chỉ số không còn dấu chấm than; lời đề sân khấu như Ngự hoa viên nằm gọn trên nền tranh; hộp gặp người dùng thẻ cao đều nhau, tranh dọc phủ kín thẻ.

## Open for next batch
learn-scene-fix (after the co-op deadlock fix + re-review), kit-ico-rank, map-me-mark, toil-looks2 (as before). Pre-existing on live: fig-tag-fit thd opening-state cuts, img/@W*.webp 404s, Pixi updateLocalTransform page error, AG old-life refs.
