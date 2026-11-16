# PROGRESS review/panel-size (worker, 16/11)
Owner (OWNER_DECISIONS L963): "rõ ràng tôi thấy kích thước khung khác nhau mà" -> every pop-up uses the SAME frame size per viewport; only the seal word and content differ; content scrolls inside (L191).

## Cause
The ONE kpanel frame sized itself by content: width 560 / 620 (kpanel), 640 (kesdlg), 780 (kmc-modal), `--kdpw + 470` (kdper event dialogs with a stage figure, 560..958 px); height = content (82 px notice .. 972 px choice).

## Done (kit level, KIT §8.1)
- j79: tokens `--kpw` / `--kph` + ONE frame rule `html body #modal:not(.pcm) .dlg.kpanel` (fixed width + height, flex column: `.kph` fixed, `#mb` scrolls, `#mr` fixed). Week panel `.dawn .dbox.kpanel` uses the same tokens.
- Removed the per-kind sizes: jk4 `kesdlg` max-width, `kdper` width/height, `kdnarrow` width/height; jmcal `kmc-modal` 780; jinv `kslot` width/max-height.
- jk4 kitDpFit: the figure column is fitted INSIDE the frame (`dw = d.clientWidth`), the frame no longer grows with the people. (review/stage-fig-size-r1 also edits kitDpFit: on merge keep its cap/crop AND this one line `const dw=d.clientWidth||...`.)
- `.kph` is `position:relative` (the close x `.kph>.kit-x` is positioned in it).
- Exempt (own frame by design, KIT §3/§13/§27): person card `.modal.pcm`, picture zoom lightbox, mini-game `#ov .mg`, week flip-book.
- Test: `dev/test/panel-size.js` (51 cases: 17 panel kinds + 34 PEND event dialogs that apply, per viewport; checks one width, one height, fits viewport, close x inside header, visible button inside frame, no horizontal overflow).

## Before / after (widths x heights of 51 panels, direct mode, dpr 1)
| viewport | BEFORE widths (px) | BEFORE heights (px) | AFTER w x h |
|---|---|---|---|
| 755x1000 | 12 distinct: 560..727 | 24 distinct: 82..972 | 560 x 700 (51 cases) |
| 1000x755 | 14 distinct: 560..939 | 20 distinct: 82..739 | 560 x 529 (51 cases) |
| 1180x820 | 11 distinct: 560..939 | 18 distinct: 82..804 | 560 x 574 (51 cases) |
| 1366x1024 | 12 distinct: 620..958 | 21 distinct: 82..996 | 620 x 717 (51 cases) |
| 844x390 | 10 distinct: 560..780 | 10 distinct: 82..374 | 560 x 358 (51 cases) |
| 390x844 | 2 distinct: 362..366 | 15 distinct: 75..828 | 362 x 591 (51 cases) |
| 412x1058 | 2 distinct: 384..388 | 17 distinct: 75..1030 | 384 x 720 (51 cases) |

Per case at 755x1000 (w x h): before -> after

| case | seal | before | after |
|---|---|---|---|
| info-short | ĐIỀU | 560x301 | 560x700 |
| info-long | ĐIỀU | 560x733 | 560x700 |
| rule | LUẬT | 560x301 | 560x700 |
| news | TIN | 560x284 | 560x700 |
| notice | BÁO | 560x82 | 560x700 |
| notice-long | BÁO | 560x818 | 560x700 |
| result | KẾT QUẢ | 560x82 | 560x700 |
| reward | BÁO | 560x82 | 560x700 |
| night | ĐÊM | 560x82 | 560x700 |
| end | KIẾP | 560x82 | 560x700 |
| choice-2 | VIỆC | 560x362 | 560x700 |
| choice-6 | VIỆC | 560x906 | 560x700 |
| intel | MẬT BÁO | 626x300 | 560x700 |
| evidence | CHỨNG CỨ | 727x720 | 560x700 |
| mood | ĐIỀU | 626x300 | 560x700 |
| item | ĐIỀU | 640x312 | 560x700 |
| place | ĐIỀU | 640x510 | 560x700 |
| calendar | LỊCH | 727x406 | 560x700 |
| identity | KIẾP | 640x920 | 560x700 |
| PEND:vase | VIỆC | 645x611 | 560x700 |
| PEND:tt1 | VIỆC | 640x564 | 560x700 |
| PEND:tt2 | VIỆC | 640x564 | 560x700 |
| PEND:tt3 | VIỆC | 640x564 | 560x700 |
| PEND:nc1 | VIỆC | 640x564 | 560x700 |
| PEND:td1 | VIỆC | 640x700 | 560x700 |
| PEND:ch1 | VIỆC | 710x720 | 560x700 |
| PEND:ch2 | VIỆC | 727x586 | 560x700 |
| PEND:thd1 | VIỆC | 707x587 | 560x700 |
| PEND:phoenix | VIỆC | 640x700 | 560x700 |
| PEND:doanngo | VIỆC | 640x700 | 560x700 |
| PEND:trungcuu | VIỆC | 726x720 | 560x700 |
| PEND:vulan | VIỆC | 640x700 | 560x700 |
| PEND:dongchi | VIỆC | 640x700 | 560x700 |
| PEND:thbirthday | VIỆC | 727x720 | 560x700 |
| PEND:ksp | VIỆC | 721x706 | 560x700 |
| PEND:prep | VIỆC | 717x720 | 560x700 |
| PEND:night1 | VIỆC | 726x720 | 560x700 |
| PEND:night2 | VIỆC | 726x720 | 560x700 |
| PEND:giu | VIỆC | 727x720 | 560x700 |
| PEND:giftpick | VIỆC | 640x368 | 560x700 |
| PEND:plantpick | VIỆC | 720x615 | 560x700 |
| PEND:taintpick | VIỆC | 640x232 | 560x700 |
| PEND:evpick | VIỆC | 640x972 | 560x700 |
| PEND:shop | VIỆC | 710x720 | 560x700 |
| PEND:plantsv | VIỆC | 640x972 | 560x700 |
| PEND:j70thr | VIỆC | 727x720 | 560x700 |
| PEND:vlget | VIỆC | 717x720 | 560x700 |
| PEND:vlcraft | VIỆC | 717x720 | 560x700 |
| PEND:vlnvp | VIỆC | 666x720 | 560x700 |
| PEND:vlout | VIỆC | 717x720 | 560x700 |
| PEND:runner | VIỆC | 640x281 | 560x700 |

AFTER design sizes (what the player really sees, KIT §0): 755x1000 -> 560 x 700; 1180x820 -> 560 x 574. No page errors, no overflow, close x and button inside the frame at all 7 viewports.
