PRIORITY #1 CHECK: all four are reviewer PASSes in dev/handover/CLAIMS.md (newlife-reset-r1 0045ff8e, mg-clutter r1 cbbbc7d9, app-edge-r1 dd2e4168, map-full-r1 29131677) | live main 4719d424 | builder only, nothing new built.

# batch-0430 — builder report

Builder session_01UV1SzjhxXkcba8uS4TZeVm (opus), coordinator s30. START_CTX ≈ 6 %; now ≈ 33 %.

**FINAL SHA: `6c4f21c3`** on `review/batch-0430` (base = live main 4719d424). Main pushes; builder did not touch main, manifests or any Worker.

## In (merge order)
| branch | PASS head | merge notes |
|---|---|---|
| review/newlife-reset-r1 | 0045ff8e | generated files only (took ours) |
| review/mg-clutter (r1 PASS, base 7abaf07a) | cbbbc7d9 | generated files only |
| review/app-edge-r1 | dd2e4168 | generated files only (added by s30 after the first gates; first gate runs were stopped and all gates re-run on the final sha) |
| review/map-full-r1 | 29131677 | generated files only; rot.js + KIT.md auto-merged clean |
| CHANGE line + site rebuilt | 6c4f21c3 | |

## Gates on 6c4f21c3
| check | result |
|---|---|
| quickcheck --runs 7 vs live 4719d424 | **PASS** 410 s · open 1161 ms · old save ok · core gates PASS · perf median new/live render 219/219, tab 284/284, buổi 942/906 (+4 %), tasks>200ms 11/11 |
| one-core-guard | 0 (core gates) |
| it-key-guard.js | PASS · it-key-scan: 3 guarded reads in jdemo.js, same as live (scanner false positive) |
| sfield-collide.py | pairs 0 |
| oldsave-r1.js | 16/16 |
| coop-e2e vs LIVE Worker | 60/60 |
| fig-rank-audit.js | PASS (0 lower / maid-art / other-face) |
| newlife-oldsave.js | FAIL 0 |
| newlife-leak.js | leak checks 0 in 3 runs; 2 of 3 runs also show page error `r.updateLocalTransform is not a function` (Pixi). **Same error on LIVE 4719d424** (2 of 3 runs, test copied to a live worktree) → pre-existing, not from this batch. Owner of jfx/Pixi should look (KFX sprite update after a life restart under quick start() loops). |
| save-dlg-scan.js | TOTAL bad 0 |
| fig-feet-fam.js 755x1000 + 1180x820 | 62 cases, 0 px cut |
| toilette.js Fold + iPad | ok, errs [] |
| map-full.js (5 sizes) | PASS all: map = 100 % page width + height, palace + courtyard, tools/columns inside, no h-scroll |
| book-col-scan.js | ALL OK |
| minigames91.js iPad 1180x820 | 15 kinds done, 0 errors; «dan» shows hudOver 84 (canvas count) + result-card domOverlap; other kinds 0. Live comparison was still running when this report was written (see s30 message for the result). |

## LOOK (CDN `img/_review/batch-0430/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-0430`), host mode (real rot.js frame)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/fold-755x1000-home.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/ipad-1180x820-home.jpg — new life day 1: no wound / veil line; Fold has NO side bands now (host frame 756 px wide = screen; live had 31 px bands each side: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/LIVE-fold-755x1000-home.jpg).
- **FINDING (Fold, from app-edge):** on Fold home the «+4» more-people chip now sits ON the «Nguy hiểm chung: 0» line of the side column (live: it sits below the column). Taller side column (Hoàng hậu card + Xét phẩm line) in the shorter page. iPad fine. Not a crash; s30 to decide (kit side-column / +N chip owner).
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/fold-755x1000-map.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/ipad-1180x820-map.jpg — Dư đồ: map box now fills the page edge to edge (live Fold: map 377 of 580 px). **Answer to s30's question:** on Fold the map PICTURE still runs on under the right info-card column (Hoàng thượng / Thái hậu / Hoàng hậu / cung nữ / Ân sủng cards are overlays): labels Dực Khôn, Hàm Phúc, Thái Cực điện are half under the cards and Cần Chính is cut at the right edge; the left side is cut too (Tân Giả khố, Nội vụ phủ). The map can be panned, so nothing is unreachable, but at rest it still looks cut under the cards. iPad: whole palace visible, cards cover only the far right strip.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/fold-755x1000-diemtrang.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0430/ipad-1180x820-diemtrang.jpg — Điểm trang: no PHẦN/HỒI/CÒN rows, clock chip «Còn 2 phút 40 giây» in the title line.

## CHANGE line (dev/site/CHANGE.txt, first line)
Bước sang kiếp mới nay sạch sẽ như trang giấy trắng: không còn vết thương, khăn che mặt hay đồ vật không tên sót lại từ kiếp trước; các trò tiểu xảo như Điểm trang gọn gàng hơn, bỏ những dòng phần, hồi, còn rườm rà, trò có hạn giờ hiện đồng hồ ngay trên dòng tiêu đề; trên máy gập, khung game nay trải kín bề ngang, không còn dải trống hai bên; bản đồ Dư đồ trải trọn khung, các thẻ người nằm nổi trên bản đồ.

## Next
s30 queue: presentation-wiring-r1 bc8461cc → kit-ico-rank-r1 a1c7a37c (no ctm-rank Worker deploy by the builder) → fig-headtop-r1 f95f5a92; shots incl. Ngự hoa viên stage (Hoàng hậu beside a lower rank).
