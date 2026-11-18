# place-banner — report (worker; sonnet; MAIN s42)
PRIORITY #1 CHECK: OD 10 (1633 chip plaque, 1647 morechip-sil, 1796 this bug) | main j59.js j59hdrCount / j59ico, jmark.js kmmAvoid | review/* none | claims 1 (this row). Reused: j59ico, j59hchip, kit plaque (.k3p paper), kmemark marker, KIT_FIG.

STATUS: SẴN SÀNG KIỂM. Owner pick BAKED (break the line right away: "Hoa nở rộ… xuống hàng ngay"). Branch review/place-banner sha d333d638 on top of live main f8276cdb (fast-forward).

## Root causes (all kit, one place each)
1. **Count icon missing**: `j59hdrCount` (j59.js) only converted a stage line that STARTS with "Ở đây còn N người". Places whose line is something else (Ngự hoa viên "Hoa nở rộ. Hoàng thượng không ra vườn hôm nay.", empty-palace lines r3/r4/r5 "Phi ??? không có ở cung…") never got the chip. Fix: the chip is now built from the ONE head count `kitHereCount()` for every place with people, the stage line keeps its text after it.
2. **Chip on chip**: the place name `.rt1` had its own border/pill inside the `#sc-t` plaque (a "kit" chip on the kit plaque). Fix (j59.js CSS): `.rt1` = plain bold text on the panel; the place icon `kplic` is one text line high (it was a big separate flower/icon). ONE plaque; the count chip is the only chip in it.
3. **Banner on head / ornament**: her figure img top is ~27–48 px under the stage top, the banner is 47 px (1 line) up to 121 px (long lines, r3–r5 at Fold) tall → the banner always covers the head box; her marker `.kmemark` (the flower above her head) was drawn ON TOP of the banner because `kmmAvoid` (jmark.js) looked only at `#sc-t h2` and ignored plaques that end below the marker bottom. Fix (jmark.js, shared by stage + dialogs): avoid the whole `#sc-t`, never overlap a plaque that starts above the marker; hide the marker if there is no room (< K.tiny).

## FINAL (baked; A/B/C switch removed)
- ONE plaque (`#sc-t`): line 1 = place icon + name + head-count chip, never wraps; line 2 = the happening line, ALWAYS on its own line inside the same plaque (`.j59ln`, built by `j59hdrCount`, j59.js). Count chip on EVERY place with people (kitHereCount, one number); no chip on chip.
- Her head + marker (kmemark) clear the plaque: `j59ease()` (j59.js, `J59EASE={min:.8,room:36}`) eases figures only as much as needed (never below .8; re-measured after the first frame because pictures settle late); `kmmAvoid` (jmark.js, shared by stage + dialogs) avoids the whole plaque and hides the marker if there is no room.
- Table per place x device (icon = count chip with picture, chip2 = chip on chip, banner = plaque bottom px from stage top, ease = figure scale applied (1 = none), marker = her marker visible). Scan: `DEV=<fold|ipadAir|ipadPro|pixel|iphone14> PLACES=all node dev/test/place-banner-scan.js` (host mode, built root):
| place | fold icon/chip2/banner/ease/marker | ipadAir icon/chip2/banner/ease/marker | ipadPro icon/chip2/banner/ease/marker | pixel icon/chip2/banner/ease/marker | iphone14 icon/chip2/banner/ease/marker |
|---|---|---|---|---|---|
| vuon | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y |
| thu | Y/n/66/0.892/Y | Y/n/47/0.927/Y | Y/n/66/0.892/Y | Y/n/47/0.934/NO | Y/n/47/0.923/Y |
| dtd | Y/n/66/0.892/Y | Y/n/47/0.927/Y | Y/n/66/0.892/Y | Y/n/47/0.934/NO | Y/n/47/0.923/Y |
| tn | Y/n/47/0.917/Y | Y/n/47/0.917/Y | Y/n/47/0.909/Y | Y/n/47/0.909/Y | Y/n/47/0.909/Y |
| kn | Y/n/83/0.867/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y |
| r2 | Y/n/118/0.8/Y | Y/n/83/0.867/Y | Y/n/66/0.892/Y | Y/n/83/0.867/Y | Y/n/83/0.867/Y |
| r3 | Y/n/83/0.867/Y | Y/n/83/0.867/Y | Y/n/66/0.892/Y | Y/n/83/0.867/Y | Y/n/83/0.867/Y |
| r4 | Y/n/136/0.8/Y | Y/n/66/0.892/Y | Y/n/66/0.892/Y | Y/n/83/0.867/Y | Y/n/66/0.892/Y |
| r5 | Y/n/118/0.8/Y | Y/n/66/0.892/Y | Y/n/83/0.867/Y | Y/n/83/0.867/Y | Y/n/66/0.892/Y |
| tyv | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y |
| ksp | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y |
| lc | Y/n/66/0.897/Y | Y/n/66/0.89/Y | Y/n/66/0.895/Y | Y/n/66/0.819/Y | Y/n/66/0.89/Y |
| cnh | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y |
| tgk | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y |
| ttp | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y |
| acs | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y |
| dc | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y | Y/n/47/0.923/Y |
| nvp | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y | Y/n/47/0.894/Y |
Summary: 18 places x 5 devices: count chip everywhere, chip-on-chip nowhere, marker visible everywhere except pixel thu/dtd in the last run (marker placement timing; re-render fixes), 0 page errors. Tallest plaque 136 px (Fold, palace lines) -> figures eased to .8.
- Finals on CDN (delete after verdict): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-banner/final-<fold|ipadAir>-<vuon|kn|tyv>.jpg. Not shot: 1366x1024/412x1058/390x844 pictures (scan rows only).
- quickcheck: PASS (open 1330 ms, old save ok, core gates PASS, tasks>200ms 13/14; render median 187/158 ms new/live, +29 ms from j59ease layout reads; can drop the 700 ms re-measure if the reviewer wants).
- For MAIN: "Phi ???" / "Tần ???" text (empty palace lines and the place card "Phi ??? là chủ vị…") shows ??? as the unknown consort's name: old text, NOT this task; decide whether intended.
- SMALL review: j59.js, jmark.js (kmmAvoid), dev/test/place-banner-scan.js + generated files.

~100% xong (chờ kiểm) / chơi được sau khi kiểm

## ROLLOVER HANDOVER (worker hit START_CTX+25 % at ~25 % of window; MAIN opens the successor)
START_CTX ~5 %, now 24.8 % (248k/1M). The d333d638 bake is the OLD pick (superseded twice by the owner, MAIN s43 messages 02:31–03:11Z, OD last lines VERBATIM there). NEW ORDER (read OD last lines):
1. NO plaque on the stage at all (remove #sc-t panel + j59ease/J59EASE: figures keep TODAY's full size, NO scaling; nothing over her head, marker included).
2. People-count chip (j59hchip, j59ico/j59hdrCount, kit chip) = TOP of the LEFT button column (V/L/M shifted down a bit).
3. Place NAME = TOP of the RIGHT column, bigger font (the Hoàng thượng/Thái hậu/Hoàng hậu… cards shift down).
4. Place-entry lines (j2.js cap/msg: "Hoàng thượng không ra vườn hôm nay", "Thái giám chặn cửa"…) = the SAME small chip the stage already uses at the top for "Tai mắt báo" news (find it: grep "Tai mắt báo" dev/build/*.js; reuse, KIT FIRST; if not a kit part STOP and tell MAIN). Audit every kind of place-entry line: table kind -> where it shows now (blocked at gate / met someone / gain / loss must still show in its result/event card).
5. Whole group: every place/stage kind, 5 devices (scan script dev/test/place-banner-scan.js exists; add checks: no #sc-t plaque, count chip in left column, name in right column, figTop unchanged vs live main, marker visible).
6. Branch from live main e24d5838 (my review/place-banner is on f8276cdb + d333d638; rebase/restart: keep j59hdrCount count logic (kitHereCount for every place), the kmmAvoid fix in jmark.js (avoid plaques/chips, hide marker if no room), delete .j59ln/J59EASE parts).
7. FULL-SCREEN shots only (whole figure head to feet, NEVER crops): Fold 755x1000 + iPad 1180x820, Ngự hoa viên, SAME character/scene/count: live main | yours side by side. Seed the game identically for both builds (same S, same people), look at them, then send MAIN "SHOTS READY" before "SẴN SÀNG KIỂM". Scratch shots /home/user/wt/pb-shots; worktree /home/user/wt/place-banner; handover worktree /home/user/wt/ho-pb; CDN img/_review/place-banner/ (wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review place-banner).
Learned: scan harness = dev/test/place-banner-scan.js (HOST mode, DEV=fold|ipadAir|ipadPro|pixel|iphone14, PLACES=all|k1,k2, SHOTS=dir); wait for images + ~1.5 s before measuring (marker placement is async, kmmSched); r3 on Fold opens a place-card dialog; bash (not sh) for quickcheck: `bash dev/tools/quickcheck.sh --runs 3`; commit built files (bash dev/site/build_site.sh) or quickcheck says NOT BUILT.
