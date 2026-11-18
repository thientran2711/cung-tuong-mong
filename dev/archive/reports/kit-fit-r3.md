SẴN SÀNG KIỂM 2d6a50e3 (branch review/kit-fit-r3; base review/kit-fit 7865ed13 + merge review/kit-fit-r1 59812a63 + merge origin/main b53ba8b9)

# kit-fit round 3 (kit keeper worker, s23/s24 relay) — START_CTX ≈ 6 % (estimate)
Co-op: same code path (nlCard → kitRoulette, kitPicker id "face"), no per-mode code.

## Item 1 — Luân hồi origin cards span the background (KIT §28.12b, kitRouFit in jk2b)
Cards get `--krw` (≤ 300 px) found by measuring; side margin 5 % (14–72 px), ONE gap (`--krgap`) between columns, rows and title/cards/buttons; picture, name, chip scale with the card; all tiles one height.
Columns: iPad 1180x820 5x2 (card 202 px, was 139), 1366x1024 5x2 (233), Fold 755x1000 4x3 (160), Fold cover 412x1058 3x4 (116), phone 390x844 3x4 (110). Title + moon wheel visible above, Tiếp / Bỏ qua below, no overflow, no horizontal scroll.
## Item 2 — face picker without tabs (OWNER CORRECTION: game picks the set)
Tabs + counts removed (j86). `kitFaceScope()` (j88): cung nữ life (isSrv / origin cnv) → 52 maid faces only; every phi tần life → 84 = 32 consort + 52 maid.
WHY 84: the pool is f88Keys("all") = FIGIX.consort c01–c32 + FIGIX.maid m01–m52 (j88 design 11/14 "cung nữ có thể lên phi tần"). The old Phi tần tab showed only the 32 consort ids; no faces are missing on the CDN. I checked img/FIGURES-servants.json: all 52 maid identities have consort-dress (t1–t8/cold) art, so a consort can wear all 84 (F88_NEED_C stays for NPC draws only).
Open point: a cung nữ life still has a consort pid from the roll (pidRoll uses consort ids) until she picks a maid face — her current face is not highlighted in the 52 list. Say if the roll should give cung nữ a maid face by default.
## Extra (reviewer / s24) — identity card name + age line lost
ROOT CAUSE: jkc inserted the "Con đường" cards at #mb level between `.kpscroll` and the pinned Nhận/Đổi row: a 300 px block left the scroll area 106 px on iPad (name + age under the sticky strip). Now inside `.kpscroll`. Fold picture `clamp(84px,14·kvh,190px)`. KIT §28.11b. Fold figure column (~90 px) was already fixed in r2b (§28.11a): measured figure 263 px above the panel, gaps 15/14.
## Tests (all after the last merge, CSS px)
- NEW dev/test/kit-fit3.js: 5 sizes x {solo, cung nữ}: Luân hồi cards inside screen, equal gaps, face picker tabs 0, 84 vs 52 faces, name+age line inside the scroll area → 0 violations, 0 page errors.
- kit-fit.js 0 · kit-fit2.js 0 violations (755x1000 + 1180x820) (run before the last main merge).
- Old save ts-oldsave (main → new build): loads, 12 weeks, 0 errors. quickcheck.sh: PASS (before the last main merge; re-run on 2d6a50e3 pending s24's gate).
- coop-e2e.js: see result line below.
- newgame-ui.js: tab step removed.
## Shots (CDN, scratch not git): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-fit-r3/<name>
ipad-luanhoi-1180x820.png · ipad-luanhoi-1366x1024.png · fold-luanhoi-755x1000.png · foldcover-luanhoi-412x1058.png · phone-luanhoi-390x844.png · ipad-face-1180x820.png (84) · ipad-face-maid52-1180x820.png · fold-face-maid52-755x1000.png · ipad-idcard-1180x820.png · fold-idcard-755x1000.png
Old round shots removed from git on this branch (img-allowlist blocked the build).
