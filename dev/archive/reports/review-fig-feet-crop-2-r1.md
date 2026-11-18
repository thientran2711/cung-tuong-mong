# review fig-feet-crop-2 r1 — reviewer
Reviewed review/fig-feet-crop-2 @ c269e2fc9 (from main 7abaf07ac). Result branch review/fig-feet-crop-2-r1 @ **d431dc3db** (ancestor = main 7abaf07ac). START_CTX ~3 %.
**Verdict: PASS d431dc3db** (one small fix by the reviewer, below).

## (1) Feet never cut
- fig-feet-fam re-run by me, all 5 sizes (755x1000, 1180x820, 1366x1024, 412x1058, 390x844): **0 of 155 cut, 0 px** (on c269e2fc9 and again on d431dc3db). Skips are the one-option S layouts and the figure-less pop-ups (rule/result/news/place), as the worker noted.
- Fix is kit-level only (jksize kszFeetFit, KIT 32.8); no per-dialog variant found. Figures shrink only when cut: VIỆC timed dialog figure 326 px (fold) / 404 px (iPad) after vs 329 / 396 before — not smaller; person dialogs XL scale 0.90–0.98 only.
- LOOKED at shots (Fold 755x1000@2, iPad 1180x820@2): VIỆC Kính sự phòng timed dialog (shoes fully visible, tag above head, no collision with the clock chip), BÁO (news pop-up has no figure, S layout), event (Hoàng hậu), person dialogs (Tổng quản thái giám, cung nữ thân tín, thái y, thị vệ, Quý phi, Hoàng thượng): feet visible in all. In XL person dialogs with 3 long options the 3rd option scrolls inside the info column (kit XL design, not a cut figure).

## (2) Name tag
- tag-rank-scan: 0 fails (48–51 tags depending on the game seed). Spot checks: eunuch Thái giám / Tiểu Lạc Tử; Tổng quản thái giám / Lý Liên Anh; maid Cung nữ / Tú Cầm; thái y Thái y / Trương Tế An; court men Thị vệ, Vương gia, Sứ thần, Nhạc sư, Họa sư; ksp Thái giám / <name> (no "Kính sự phòng"); consorts Quý phi/Phi/Tần + name unchanged.
- **Defect found (fixed by me in d431dc3db):** a court man she has not met printed line 2 = "Bùi Thị vệ ???" / "Lục Thị vệ ???" (global name mask replaced only the given-name part of the bare name → rank repeated and surname leaked). Not caught by the scan (it treats ??? only as the column value). Fix: jksize kszRankName, a person whose name is not known (kitKnownName) prints "???" on line 2, same as the 32.7 column. After: "Thị vệ / ???" on Fold and iPad. Scan + fig-feet-fam + quickcheck re-run after the fix. Site rebuilt.
- Minor, not blocking: bare NPC "Thầy dạy Thượng thư phòng" has no rank line (title-only, no personal name); scan lists it as ok.

## Gates
- quickcheck on d431dc3db: **PASS** (open 976 ms, old save ok, core gates PASS, perf new/live render 240/252 ms).
- KIT TRƯỚC: no custom chip/row/frame added; VANPHONG: no new player words ("???" is the existing unmet-name wording).

## Shots (CDN, scratch not in git) — https://ctm-img.victoria-tntt.workers.dev/img/_review/fig-feet-crop-2/<file>
Fold: r1-fold-timed.png, r1-fold-news.png, r1-fold-event.png, r1-fold-person-eunuch.png, r1-fold-person-maid.png, r1-fold-person-thaiy.png, r1-fold-person-official.png, r1-fold-person-consort.png, before-fold-timed.png (main).
iPad: same names with ipad (r1-ipad-*.png, before-ipad-timed.png).

## CLAIMS
| claim | evidence |
|---|---|
| feet never cut, 5 sizes | fig-feet-fam 0/155 (reviewer re-run) + shots |
| figures not tiny | timed fig 326/404 px vs 329/396 before |
| tag rank/name one source | tag-rank-scan 0 fails + spot check; unmet-man defect fixed d431dc3db |
| quickcheck + old save | PASS d431dc3db |
