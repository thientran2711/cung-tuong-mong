# review hud-mood-bar 04bb279 — PASS
PRIORITY #1 CHECK: brief briefs/review-hud-mood-bar.md + OD 18/11 ~05:40Z / ~06:05Z; report reports/hud-mood-bar.md; kit KIT §49.1/§49.4; VANPHONG L84 (numbers stay, after the name); claims row 480; origin/review/hud-mood-bar read in full (7 files).

## Checks
- Base: 04bb279 is a fast-forward of live origin/main 9bbd78b (merge-base = main tip). OK.
- Layout 1 only: no KIT_MOODBAR switch, no slim CSS left (grep clean). OK.
- Kit-first: one part (mbHud / #hud-mood.kstm, kitSignedBar inside), registered in KIT.md §49.4, styles injected by the part itself like other kit parts in jmood.js; nothing custom in the header. OK.
- Header kept: stat row intact, header 129 -> 151 px (+22, full-width row; owner accepted layout 1), 0 horizontal overflow, 0 page errors. Fold 755x1000@2 and iPad 1180x820@2 + 1366x1024: tabs act/rv/inv. Bar spans full header width, nothing cut.
- Tap = existing mood box (data-emo-open="me"): opens on fold, ipadAir, ipadPro (true), box content unchanged.
- Wording: band word (mbBand) + signed number after it, per VANPHONG L84; "Tâm trạng" label; Nghỉ ngơi card reads the same accessor (kitMoodVal), text "Tâm trạng đang phiền muộn". OK.
- One accessor kitMoodVal() = moodBar(S) else S.mood.v; one-core-guard PASS (fails 0, inline 3839 <= baseline 3842).
- Old save (no S.mood): "Bình thản 0", calm centre mark, no errors. Mood +60: "Hân hoan" green bar right. Mood -45: "Phiền muộn" red left. LOOKED all.
- Tests: mood-bar.js 755x1000@2,1180x820@2,1366x1024@2 PASS (0 errs, 0 hscroll/overflow, box/self/high/oldsave ok); kit-conform 755x1000 MIXED 17 / MISSING 4 = identical on origin/main 9bbd78b (no regression; header is not a dialog); hud-mood-shots.js 0 errs.
- No quickcheck.sh in the repo (only the reviewer-named suites above were run).

## Not covered
- Co-op host+guest header shot: no 2-player harness here (same as the worker). The part is the same header.hud last child in every mode, hooked on renderHUD; no co-op-specific code touched.
- 412x1058 / 390x844: host mode shows the rotate prompt (no top bar), accepted by main earlier; 1366x1024 viewport run via VP override looked fine. A 412 direct run hit a roulette overlay in the harness (not product).
- Minor, not blocking: header +22 px (owner picked the full row knowing this).

Shots were local scratch only (/home/user/wt/hudshots, not in git, not on CDN); nothing under CDN img/_review/hud-mood-bar was created by this review.
