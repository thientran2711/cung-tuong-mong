# ipad-size (worker IPAD-SIZE, child of MAIN 147) — iPad kit parts at the Fold proportion

PRIORITY #1 CHECK: OD 'Ân sủng' 11 | main 15 | review/* 0; 'Nguy hiểm chung' OD 5 | claims 1 | main 15; 'iPad to' OD 2 | main 1. Reused: KIT 56.28 `--k3rowh` (KK28), `k3Gut`/`k3RW` (jk3), `#kpname` + `--kpnh` (jplst), KIT_RCOLW 140 px (owner 17/11 06:45Z). Map (OB-PHU) not touched.

## Owner bug (OD 25/11 ~23:27Z, verbatim)
"Tại sao cái khung bên này nó to như vậy? Ở bên cái điện thoại tôi chơi nó đâu có to như vậy. Tôi cần bạn phải đi kiểm tra toàn bộ cái giao diện kiểu này đi nha, tôi rất là mệt mỏi luôn á." Shot: dev/handover/refs/owner-2511-kiep/k15-ipad-stage-rightcol-too-big.jpg.

## Cause
Every stage overlay kept FOLD PIXELS (rows 44 px from KK28, rail buttons 44 px, chips) while the iPad landscape stage is only 575–601 px tall (Fold 749). The right column (counters + 6 Ân sủng rows + Nguy hiểm chung / Xét phẩm) = 440 px = 73 % of the iPad stage (Fold 59 %; Safari on her iPad, stage ~574: ~77 %). The place name (`--kpnh`) was measured once, before the web font: its 2nd line slid under the court counters.

## Fix (kit level, one rule; KIT 56.28 overwritten in place)
- `k3RowH(st)` (jk3, run by `k3Gut` on every stage layout): `--k3rowh` = `KIT_RCOL.row` 44 × stage height / `KIT_RCOL.refH` 749, clamp [30, 44]; `--kss` = row/44. Fold + iPad portrait = 44 (unchanged), iPad landscape = 34–35.
- Users of the one value: side-column rows (`.ksh .k3r`), court counters (`.kgfbtns`), left rail buttons (`.stage .krail .krailb`), «ở đây N» count chip, «+N» page chips. Font stays the kit size.
- `#kpname` ResizeObserver: the column always starts below the place name.

## Audit: share of its container, Fold 755x1000 | iPad L 1180x820 | iPad P 820x1180 (before → after)
Script `node dev/test/ipad-size-ratio.js <url> [out.json] [shotdir]` (every bottom tab; stage parts measured on the stage). FAIL rule: a stage overlay > 1.15 × its Fold share on an iPad.

| part | axis | Fold | iPad L | iPad P | iPad L / Fold | fixed |
|---|---|---|---|---|---|---|
| stage.rightcol (owner's box) | h | 0.587 | 0.731 → 0.597 | 0.473 | 1.25 → 1.02 | yes |
| stage.rightcol.row | h | 0.059 | 0.073 → 0.058 | 0.047 | 1.24 → 0.98 | yes |
| stage.counters (Cung nhân / Chí tôn) | h | 0.059 | 0.073 → 0.058 | 0.047 | 1.24 → 0.98 | yes |
| stage.rail (left icons) | h | 0.24 | 0.299 → 0.24 | 0.194 | 1.25 → 1.00 | yes |
| stage.railbtn | h | 0.059 | 0.073 → 0.058 | 0.047 | 1.24 → 0.98 | yes |
| stage.herecount chip | h | 0.04 | 0.05 → 0.042 | 0.032 | 1.25 → 1.05 | yes |
| stage.more «+N» chip | h | 0.05 | 0.062 → 0.05 | 0.04 | 1.24 → 1.00 | yes |
| stage.rightcol.w | w | 0.187 | 0.241 | 0.172 | 1.29 | no: width = KIT_RCOLW 140 px, owner ruling 17/11 06:45Z (law 16) — info |
| stage.placename | h | 0.056 | 0.07 | 0.045 | 1.25 | no: text at kit font size — info; overlap fixed |
| stage.nametag | h | 0.048 | 0.06 | 0.039 | 1.25 | no: text at kit font size — info |
| map.rightcol | h | 1.0 (grid) | 0.734 | 1.0 | 0.73 | NOT touched (OB-PHU owns the map). One line enables the same rule there: call `k3RowH(mv)` next to `k3RW(mv)` in k3Stage — MAIN to route |
| map.tag | h | 0.091 | 0.114 | 0.074 | 1.25 | map, not touched |
| tabbar | h | 0.076 | 0.054 | 0.064 | 0.71 | fine (one row on iPad) |
| tabbtn | h | 0.036 | 0.054 | 0.031 | 1.5 | fine: one-row bar, bar total smaller |
| subtabs / subtab.btn | h | 0.04 | 0.05 | 0.032 | 1.25 | panel chrome, not on the stage; kit chip size — info |
| chip | h | 0.047 | 0.058 | 0.038 | 1.23 | kit chip size — info |
| actcard (w) | w | 0.976 | 0.969 | 0.978 | 0.99 | fine |
| popup (area) | a | 0.125 | 0.097 | 0.097 | 0.78 | fine |
iPad portrait: every part ≤ Fold share (0.8x) before and after — no outlier.

## Tests
- `dev/test/ipad-size-ratio.js` before: FAIL (10 stage overlays 1.24–1.29x) · after: PASS.
- `dev/test/kit-row-tap-size.js index.html`: rows 18, FAIL 0 (stage rows now checked against the stage's `--k3rowh`).

## Deliverables (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/ipad-size/)
ipsz-ipadL-stage-before-after.jpg · ipsz-before-fold-ipadL.jpg · ipsz-after-fold-ipadL.jpg · ipsz-before-fold-ipadP.jpg · ipsz-after-fold-ipadP.jpg · ipsz-ipadL-tour-all-tabs.mp4 (90 s, every bottom tab + sub tabs) · ipsz-ipadL-tour-contact.jpg.
All 10 worst parts are stage overlays and are all visible in the stage pairs.

## Not done / handover
Root index.html / sw.js / assets.json not committed (rebuilt at landing). Map column (OB-PHU) waiting on MAIN.
