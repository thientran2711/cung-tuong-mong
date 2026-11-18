# batch-0132 — hourly go-live batch (builder report)

Builder session_01UV1Szgb3UbRCJaMcocuGrF (opus; the same builder as batch-0032). Coordinators: main s27, then s28 (session_01UV1SzkNSYyuEkCJ3Bv1Evj). START_CTX ≈ 3 %; now about 25 % (own estimate, get_session reads 0), close to the START + 25 % line, so the next batch needs a fresh builder.

**FINAL SHA: `7abaf07ac`** on `review/batch-0132` (base = live main 0f61ff928 = f5220eaa + coop-main-faults-r1). Main pushes; the builder did not touch main.

## In
| branch | PASS head | merge notes |
|---|---|---|
| review/coop-main-faults-r1 | 608309dc | already in main 0f61ff92 (built and tested as batch-0032 0f61ff92) |
| review/kit-size-10 | 8ab00ede | jkitpage.js kitPopSample: kept BOTH the kit-size #8 place/personopt samples (main) and the kit-size #10 "timed" sample (branch); generated files rebuilt |

## Not in (no PASS sha reached the builder)
oi-perf (review/batch-0032-oi), it-key-guard, coop-contest-fix.

## Checks on 7abaf07a
| check | result |
|---|---|
| quickcheck | **PASS** 121 s · open 755 ms · old save ok · render 188/188 · tab 209/202 · buổi 1064/1040 ms · core gates PASS |
| one-core-guard | PASS 0 fails |
| coop-e2e (LIVE Worker f7d52a7d) | 60/60 |
| timed-choice-fit (755x1000, 412x1058, 1180x820, 390x844 × sample/two/nochip) | OK 12/12 |
| shots (local shots.js copy, waitForTimeout 9000, not committed) | home Fold + iPad taken. The worker process restarted during the tab shots, so only the 2 home shots exist; enough for the LOOK |

## LOOK (CDN `img/_review/batch-0132/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-0132`)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0132/fold-755x1000-home.jpg — 2 figures in the fixed slots, no overlap, no dark block. Art nit (not the batch): the heroine's figure fig shows a few small cut-out holes in the lower skirt (Đáp ứng, lilac dress with the cầm). Goes to the art owner.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0132/ipad-1180x820-home.jpg — 2 figures, no overlap, no dark block.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0132/fold-755x1000-timed.png and …/ipad-1180x820-timed.png — kit page "timed" sample: the "Còn 22 giây" clock chip sits right under the question, above the 3 options, at both sizes. The pictures are blank because the test blocks the network. Nit: every option chip reads "có rủi ro" and the hint "thành bại khó đoán", not the ladder word written in the sample (Khá chắc / Năm ăn năm thua / Chắc); this is the kit page sample only.

## CHANGE line (dev/site/CHANGE.txt, first line)
Chơi chung không còn treo máy vì tên bạn lặp chữ; số bóng người trên dư đồ khớp đúng người đang ở đó; việc có hạn giờ hiện đồng hồ ngay dưới câu hỏi, trên các lựa chọn.
