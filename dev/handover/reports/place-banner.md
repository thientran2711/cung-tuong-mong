# place-banner — report (worker; sonnet; MAIN s42)
PRIORITY #1 CHECK: OD 10 (1633 chip plaque, 1647 morechip-sil, 1796 this bug) | main j59.js j59hdrCount / j59ico, jmark.js kmmAvoid | review/* none | claims 1 (this row). Reused: j59ico, j59hchip, kit plaque (.k3p paper), kmemark marker, KIT_FIG.

STATUS: OPTIONS ready (owner has NOT picked). Branch review/place-banner, sha 9c71b02e (on top of main 62a6846f).

## Root causes (all kit, one place each)
1. **Count icon missing**: `j59hdrCount` (j59.js) only converted a stage line that STARTS with "Ở đây còn N người". Places whose line is something else (Ngự hoa viên "Hoa nở rộ. Hoàng thượng không ra vườn hôm nay.", empty-palace lines r3/r4/r5 "Phi ??? không có ở cung…") never got the chip. Fix: the chip is now built from the ONE head count `kitHereCount()` for every place with people, the stage line keeps its text after it.
2. **Chip on chip**: the place name `.rt1` had its own border/pill inside the `#sc-t` plaque (a "kit" chip on the kit plaque). Fix (j59.js CSS): `.rt1` = plain bold text on the panel; the place icon `kplic` is one text line high (it was a big separate flower/icon). ONE plaque; the count chip is the only chip in it.
3. **Banner on head / ornament**: her figure img top is ~27–48 px under the stage top, the banner is 47 px (1 line) up to 121 px (long lines, r3–r5 at Fold) tall → the banner always covers the head box; her marker `.kmemark` (the flower above her head) was drawn ON TOP of the banner because `kmmAvoid` (jmark.js) looked only at `#sc-t h2` and ignored plaques that end below the marker bottom. Fix (jmark.js, shared by stage + dialogs): avoid the whole `#sc-t`, never overlap a plaque that starts above the marker; hide the marker if there is no room (< K.tiny).

## Baseline fix (in EVERY option; all places, all stage kinds — one kit part)
| place | BEFORE Fold: count icon | chip-on-chip | banner bottom px | AFTER Fold: count icon | chip-on-chip | AFTER iPad: count icon |
|---|---|---|---|---|---|---|
| vuon | **NO** | **yes** | 54 | yes | no | yes |
| thu | yes | **yes** | 47 | yes | no | yes |
| dtd | yes | **yes** | 47 | yes | no | yes |
| tn | yes | **yes** | 47 | yes | no | yes |
| kn | yes | **yes** | 84 | yes | no | yes |
| r2 | yes | **yes** | 84 | yes | no | yes |
| r3 | **NO** | **yes** | 110 | yes | no | yes |
| r4 | **NO** | **yes** | 110 | yes | no | yes |
| r5 | **NO** | **yes** | 110 | yes | no | yes |
| tyv | yes | **yes** | 47 | yes | no | yes |
| ksp | yes | **yes** | 47 | yes | no | yes |
| lc | yes | **yes** | 66 | yes | no | yes |
| cnh | yes | **yes** | 47 | yes | no | yes |
| tgk | yes | **yes** | 47 | yes | no | yes |
| ttp | yes | **yes** | 47 | yes | no | yes |
| acs | yes | **yes** | 47 | yes | no | yes |
| dc | yes | **yes** | 47 | yes | no | yes |
| nvp | yes | **yes** | 47 | yes | no | yes |
Scan = `DEV=fold|ipadAir PLACES=all node dev/test/place-banner-scan.js` (HOST mode). Places = places() of the consort road (18 keys incl. r2..r5 palaces).

## The 3 options (switch for review only: `window.j59pb("A"|"B"|"C"|"")` in the game frame; after the owner picks, the chosen one is baked in and the rest deleted)
Shots (CDN, delete after verdict): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-banner/
- **A** text without panel: shadowed text straight on the painting (halo), place icon + name + count chip + happening line; figures eased up to 12 % (min scale .88) so the marker fits.
- **B** line moved elsewhere: top plaque = icon + name + count chip ONLY (1 line, 47 px, never wraps); the happening line is a small plaque at the stage bottom just above the name tags; figures eased up to 12 %.
- **C** figure scaled: unchanged banner (plaque + line, up to 2–3 lines on long text); figures scaled so head + her marker clear the whole banner (min .6; tall banners cost up to ~25 % at Fold; breaks KIT_FIG "never shrink", so I'd only pick it with a banner-height cap).
Review images: 10-/11- sheets (base,A,B,C for Fold/iPad Ngự hoa viên), `optX-<fold|ipadAir>-<place>.jpg` (X = 0 baseline, A, B, C; places vuon, kn, r3, tyv), 00-before-fold-vuon.jpg = bug repro.
Recommendation (not a pick): **B** — shortest banner (47 px everywhere), no chip on chip, fixes the long-line palaces (r3–r5) which A and C handle worst; costs ~9 % figure ease and a second small plaque.

## Tests
quickcheck (bash dev/tools/quickcheck.sh --runs 3): CORE GATES PASS, TIME-SPILL PASS, QUICKCHECK PASS (open 1440 ms, old save ok, perf new/live render 149/153, tab 277/292, buổi 740/774, tasks>200ms 11/11). Scan JSON: errs [] on Fold + iPad Air. Looked at every shot (zoom on head/ornament).
Known/open: (a) r3 option B on Fold once measured marker hidden (timing of the first scan frame; re-render fixes) — recheck after pick; (b) "Phi ??? không có ở cung" text with ??? placeholder names is an older text bug (not this task) — tell MAIN; (c) 1366x1024, 412x1058, 390x844 shots not made yet (after pick).

## HANDOVER (if rolled)
Worktree /home/user/wt/place-banner (review/place-banner), scan script dev/test/place-banner-scan.js, scratch shots /home/user/wt/pb-shots. After pick: bake option (remove j59pbApply switch + other options' CSS), run scan on all 5 devices, re-shoot finals, SMALL review.

~80% xong / ~0% chơi được (chờ chị chọn A/B/C)
