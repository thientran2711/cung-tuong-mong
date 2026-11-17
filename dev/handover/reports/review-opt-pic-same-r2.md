# review-opt-pic-same-r2 (reviewer, session_01UV1SzioDmB4Xjzd2Wg26k4)

PRIORITY #1 CHECK: worker report `reports/opt-pic-same.md ## r2` has its own check (kitOptFit, OD 1); CLAIMS row 593/731 (kit worker) ; live main 6ca04148; no other branch touches option cards.

**Reviewed:** review/opt-pic-same 42d52109 merged on origin/main 6ca04148 -> **review/opt-pic-same-r2 @ 9b2f7821** (conflicts only index.html / sw.js / assets.json: generated, rebuilt with `build_site.sh`; no source conflict).

## Verdict: FAIL (1 item); everything else PASS
Fold 755 + iPad 1180 + 1366: PASS. 412x1058 / 390x844: FAIL (cause below). Branch r2 is safe to fast-forward AFTER item 1 is done (or main may accept item 1 as a separate kit job, owner decision).

## Gates on 9b2f7821
| gate | result |
|---|---|
| quickcheck.sh --runs 3 | PASS 152 s · open 1519 ms · old save ok · core gates PASS (one-core, rules-one-source, kit-conform, coop-one-world) · time-spill PASS · perf new/live render 178/171, tab 324/318, buoi 751/992, tasks>200ms 14/14 |
| build_site (media-check, img-allowlist, assemble) | PASS |
| kit-fit.js 755 / 1180 / 1366 | page errors 0; 0 ONE-WORD-PER-LINE, 0 person-dialog size / square flags; remaining VIOL = old "empty under text" in the court act rows (person-card rows, picture fills by rule) + toil figure gaps 156/99..133 (old, same on main) |

## LOOK (own shots, merged build, host dismissed of the start reward dialog)
- Fold 755x1000, Hoàng thượng tab act rows (Xin yết kiến / Xin hầu cờ / ...): all cards ONE height (~110), picture tall 84x112 filling the card, text not cut. PASS.
- Fold 755 "Có người đến" (man, 2 cards Tiếp / Từ chối khéo): T3 (figure left from top, banner right column), two cards equal 292x90, Được/Mất on one line each (was 149 px cells, one word per line). PASS.
- Fold 755 "Có người đến" (Đáp ứng, 3 cards): equal cards, tall 3:4 pictures, text column wide. PASS.
- Worker shots (VIỆC "Kẻ hầu xin" 755, "Phi tần cười cợt" 755 / 1180, Hoàng hậu person card 755 / 1180): T3 right, no empty band, name not clipped, options visible (tease list scrolls from card 3-4, OD L191). My own tease at 1180 (2 columns of 4 cards) also PASS.
- All 755/1180 dialogs: no h-scroll, no cut text, page errors 0.

## FAIL 1 — 412x1058 and 390x844 (the family the worker flagged): NOT a small kit change
Seen: person/VIỆC dialog (man, "Có người đến" visit) at 412 / 390: the frame is ~370 px wide but the T3 live frame (`kszLiveLay3` in jksize.js, class `kszf ksz3 kszlive`) keeps the figure column LEFT (~250 px) and squeezes the right column (banner + text + option cards) to ~110 px; cards there are 1 word per line, text column <190 px so kitOptFit0 falls back to the old one-form rule (`clientWidth>=274` guard in jk4.js) and the tall pictures stay: cards 203/406 px (man) and 1157/1172 px (visit) tall, not one size. Measured `PERSON DIALOG cards not one size: 203 / 406` (412 and 390), `1157 / 1172` (390 visit). Rotate prompt "Xoay ngang điện thoại để chơi" shows on top (KIT §0.1) but the dialog stays reachable under it.
Why not fixed here: the right fix is a NEW narrow pick for the T3 frame (stack: figure above/beside a short text, banner full width, option list 1 column compact, `KIT_SIZE.v3` pres/focus + `kszLivePick3` need a narrow mode), which touches all T3 dialogs at every width and the S/M/L/XL fit, not a one-rule cap. A card-height cap alone would clip text. Needs its own kit job + KIT §6.2b/§32.7 line.

## Not verified (honest)
- Toilette "Thái hậu chê dung nhan" (th-scold) in my harness shows the banner full width on top, empty band right of the figure and options below the fold, with a DUPLICATE option list (two `.opts` in `#mb`): same on origin/main, probably a harness artefact (toilReact called outside the real flow), NOT shown to be a real fault. Main may want a real-flow shot (Thái hậu / Hoàng hậu / Hoàng thượng reaction) before the owner opens a toilette.
- Court tab at 1180 "Xin hầu cờ" empty 17 px: person-card act rows (picture fills by rule).

## Items for the worker / main
1. Narrow T3 mode for kszf frames < ~420 px wide (stack, 1-column compact cards, cards one size) — new kit job; until then 412/390 remain broken (same on main).
2. Real-flow shot of th-scold / hh-scold / emp-dislike VIỆC at 755 + 1180.
Shots: scratch only (not uploaded, none in git).
