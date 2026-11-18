PRIORITY #1 CHECK: all three are reviewer PASSes in dev/handover/CLAIMS.md (save-dlg-fix-r1 711d018, fig-rank-match-r2-r1 2558a2f1, wx-fx-size-r1 5b2664116) | live main 64c39ca28 | builder only, nothing new built.

# batch-0415 — builder report

Builder session_01UV1SzjhxXkcba8uS4TZeVm (opus). Coordinator s29, then s30 (session_01UV1SzhK3qSvU55wPgq9kKb). START_CTX ≈ 6 % (own estimate); now ≈ 20 %.

**FINAL SHA: `4719d424`** on `review/batch-0415` (base = live main 64c39ca28). Main pushes; the builder did not touch main or the manifests.

## In (merge order)
| branch | PASS head | merge notes |
|---|---|---|
| review/save-dlg-fix-r1 | 711d018f | conflicts only in generated index.html / sw.js / assets.json (took ours) |
| review/fig-rank-match-r2-r1 | 2558a2f1 | same, generated only |
| review/wx-fx-size-r1 | 5b266411 | same, generated only |
| CHANGE line + site rebuilt | 4719d424 | dev/site/build_site.sh once after the 3 merges |
Not in: newlife-reset-r1 b2da25cc0 (arrived after gates had started; s30 queued it for the next batch).

## Gates on 4719d424
| check | result |
|---|---|
| quickcheck --runs 5 vs live 64c39ca2 | **PASS** 317 s · open 1044 ms · old save ok · core gates PASS (one-core-guard, rules-one-source, kit-conform) · time-spill PASS · perf median new/live: render 205/219, tab 303/287 (+5.6 %, box noise: per-run 284–370 vs 286–312), buổi 904/1092, tasks>200ms 11/12 |
| one-core-guard | 0 fails (inside core gates) |
| it-key-guard.js | PASS (0 thrown, 0 page errors) |
| it-key-scan.py | 3 hits, all in jdemo.js (unchanged from live; came with scenes-3). They are guarded reads (`IT[e.k]?IT[e.k].n:…`, `IT[e.k]&&IT[e.k].sl&&IT[e.k].rk`), a scanner false positive; not from this batch |
| old save (oldsave-r1.js, old = live index.html) | 16/16 |
| coop-e2e vs LIVE Worker | 60/60 |
| fig-rank-audit.js (live CDN manifests) | 5712 cells exact (npc 3024 + her 2688), 0 lower / maid-art / other-face, 0 missing tiers, 0 page errors |
| save-dlg-scan.js (5 sizes) | TOTAL bad 0, no page errors |
| save-dlg-mask.js | PASS |
| book-col-scan.js (5 sizes) | ALL OK (cut/band/card 0) |
| fig-feet-fam.js 755x1000 + 1180x820 | OK 62 cases, 0 px cut |
| wx-fx-size.js Fold + iPad | petal median 16/12 px, max 18/15; 0 errors |
| manifest_guard.py --live-check | PASS: CDN manifests already rebuilt (FIGURES 1296, FIGURES-servants 2112); manifest_rebuild adds +0 |

## LOOK (CDN `img/_review/batch-0415/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-0415`)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/fold-755x1000-home-hoanghau.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/ipad-1180x820-home-hoanghau.jpg — her room as Hoàng hậu: phoenix crown + empress robe, feet shown, tag «Hoàng hậu / name».
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/fold-755x1000-petals.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/ipad-1180x820-petals.jpg — home stage with «hoa đào bay»: a few small petals, inside the stage, none over the top bar.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/fold-755x1000-chonso.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/ipad-1180x820-chonso.jpg — Chọn sổ: wide frame, whole words on buttons, no picture column on Sổ mây.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/fold-755x1000-tuanluc.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0415/ipad-1180x820-tuanluc.jpg — Tuần lục Thái hậu page: whole figure with feet, relation table on paper (no band, no card).
Looked at all 8. Note (not batch-blocking): the Chọn sổ shots show all slots «Chưa ghi» because the shot harness clears storage; filled slots are covered by save-dlg-scan.

## CHANGE line (dev/site/CHANGE.txt, first line)
Hộp Chọn sổ nay rộng rãi, chữ trên nút đọc trọn, không còn ô hình bị cắt; trang Tuần lục hiện trọn dáng người đến tận gót chân, bảng thân sơ in thẳng trên giấy sổ; xiêm y theo đúng phẩm vị, Hoàng hậu đội mũ phượng khoác phượng bào; cánh hoa, lá rơi, tuyết bay nay nhỏ nhắn, thưa thớt, chỉ bay trong khung cảnh.

## Next
s30 queue: newlife-reset-r1 b2da25cc0 → mg-clutter-r1 cbbbc7d9 → map-full-r1 29131677 with app-edge (only after app-edge r1 PASS). This builder stays alive for it.
