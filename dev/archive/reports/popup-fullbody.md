# popup-fullbody — READY FOR REVIEW 591bde42 (branch review/popup-fullbody)
Owner bugs OD 07:35Z + 07:37Z (OD:L448, OD:L963). Details + family table: dev/PROGRESS_popup-fullbody.md on the branch.

Done
- New kit part kitPersonDlg (dev/build/jpdlg.js, KIT.md §50.2, kit page sample): person pop-up outside #modal = figure LEFT, picture right top, info, buttons. Tutorial coach (LỜI DẶN) + tips use it; the small portrait is gone.
- One frame size per event: 4 intro pages identical (std = --kpw x --kph); spotlight steps identical (coach height --kpch); tip = coach size.
- #modal info / rule / person kinds about a person now get the full-body column (jk4 exclusion removed). Events / BÁO / TIN / KẾT QUẢ / ĐÊM / identity were already full-body.
- Tests: dev/test/popup-fullbody.js (new) + kit-conform.js (T4 small portrait = FAIL; tutorial pages / steps one size; old "loose figure column" rule retired).
- Shots checked: Fold 755x1000, iPad 1180x820 / 1366x1024 @2, 844x390.

Open for owner (not converted / decisions)
1. Nhập cung + other new-life scene panels (.kpsc, faces:[..] rows of 3 small portraits, bottom-docked caption over full-screen art): a figure column does not fit; tried and reverted. Needs a decision (figures standing on the scene art?).
2. Spotlight coach steps use a shorter height than the std frame so the target stays visible (one size for all steps). Owner to confirm.
3. 412x1058 / 390x844 portrait phones show "Xoay ngang" and the existing #modal template is garbled there (pre-existing) — not tested.
4. Latent flake: a figure can stay hidden if kitFigBody (CDN CORS measure) is slow (PEND:shop in long runs) — pre-existing, kitDpFit.
~100% xong / ~90% chơi được (scene panel + portrait phones open).

## Round 2 (reviewer FAIL list) — branch review/popup-fullbody-r1 @ afe5a023 (pushed on top of reviewer's 0b1d3096)
- #1 kept. #2 default banner per kind (kitDefaultBanner, KIT §50.3). #3 tests: FAIL no banner / visible figure < 150px / frame size differing from the viewport's across all kinds + tutorial + tip; new cases contest, cold-palace, contest-round. kit-conform MISSING (place:*) have no `who`/portrait; contest + cold-palace covered in popup-fullbody.js.
- Decision: coach size dropped — tutorial steps + tip are the std frame (OD:L963). Spotlight card that has no free side lies at the edge; rest of target stays tappable (owner to judge on 844x390).
- New bug fixed: evidence/intel person panel (no options, scrolls whole): figure column was the full scroll height, figure far below the fold → column = visible #mb height, sticky.
- Results: popup-fullbody.js 755x1000 38 OK/1 WARN(CDN)/0 FAIL; 1180x820 39 OK/0 WARN; 1366x1024 38 OK/1 WARN; 844x390 38 OK/1 WARN; 0 FAIL. kit-conform 755x1000: 76 CONFORMS, 0 MIXED, no floats. Frame size identical for all kinds per viewport. #4 (empty figure column until CDN measure ends) unchanged, latent.
