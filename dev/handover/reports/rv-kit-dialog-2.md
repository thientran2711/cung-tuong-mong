# REVIEW kit-dialog-2 (MAIN CHÍNH 89, 21/11) — reviewer session_01Rc5AsMaLLvZ2wrtmc2Tjti
PRIORITY #1 CHECK ('kit-dialog-2'): OD 0 new (marks #71 #75 #76 #80 #82 + her verbatim OD rows 2160-2173 read) | ledger 0 | claims 3 (worker session_01Rc5AsLvRJSwBGGefPUEw8B) | main 0 (kit-dialog + dialog-person landed meanwhile, merged) | review/* 1 (review/kit-dialog-2 198825c5) | archive 0

## Verdict: PASS review/kit-dialog-2-rv ab74a5d7 = FF of origin/main aee7ff84 (all marks #71 #75 #76 #80 #82 + (a) (b) OK vs her words)
Main moved on to d6f23858 (or20-j68q, kit-ghichu-sections) while I gated: `git merge-tree` shows ONLY generated index.html / sw.js conflict (sources auto-merge j79.js, KIT.md) → coordinator: take main for index/sw, `python3 dev/build/assemble.py` + `bash dev/site/build_site.sh`, commit, FF.

## What I did
- Worktree from review/kit-dialog-2 198825c5; merged newest origin/main several times as it moved (068662ad → 1e826e29 → 20b9f2a5 → fc0867ca → 2bf59027). Generated index/sw: take main, rebuild (assemble.py + build_site.sh), never committed markers.
- ONE real source conflict (merge 1e826e29, main's mood-seal-2): `jksize.js kszLiveLay3`. Resolved by keeping BOTH: main's `keepMk` (corner emotion seal element kept through every re-lay) around the worker's ONE left-slot part (`kszSlot3`, `X.slot`, `kszAvatarRule3`); main's `:not(.ksart-mark)` load-listener selector + worker's `kszListCols3`. `node --check` OK; mood-seal tests as baseline (below).
- Small fix on my branch: `dev/test/dialog-person-scan.js` — the scan assumed the left slot is always `who`. With #76 (item in the left slot) it FAILED 12 lines (Đồ thất lạc / Tìm thấy đồ thất lạc: no «(ta)»; Nội vụ phủ trả đồ: line avatar). The UI is right per her #76 (item = subject; the eunuch named in the line is a normal line avatar, no duplicate of the left slot); the scan now skips dupLeft / lineAv / (ta) when `X.slot==="item"`. Worker had not run this scan on its sha (its own note).

## Each mark vs her verbatim words (shots Fold 755x1000 + iPad 1180x820, looked 3× on the final build)
- #71 «một cái khung chất Word, không đi theo size nào»: «Sai Cung nữ … Bạch Lan đi dò la» pick-list on Fold + iPad = kit frame (L), full width, picture + figure + option cards, no one-word-per-line. Test (i) 19 dialog kinds Fold+iPad all data-ksz + kit width. OK.
- #75 «Lỡ hẹn»: the person's portrait (rank + name + frame) on the LEFT on Fold AND iPad, same content. phone-drop-scan exists. OK.
- #76 «Đồ thất lạc … món đồ nên thay cho khung đại diện»: item tile left (Váy sa xanh ngọc) on Fold + iPad; event picture top-right; item NOT repeated in the text; Tìm thấy đồ thất lạc same; Nội vụ phủ trả đồ = item left, the eunuch as the line avatar. Person subject («Gặp Hoàng hậu …») = figure left; matter («Tin cung») = picture left. ONE slot part (kszSlot3) used by builder + live path, no per-dialog variants (laws 9/11). OK.
- #80 «hình minh họa để cao»: event picture at the TOP of the right column in result («Bị từ chối», avatar left), notice, person, item frames, both devices (evTop 0, test (j)). OK.
- #82 «chia hai cột»: iPad «Sổ nguyệt sự» 12 short rows → 2 columns, no long scroll; Fold stays 1 column (picture strip left). Test (k). OK.
- (a) no empty «Được»: choice card shows Tốn / Được / Mất rows; no-gain cards say «Được không», no-cost «Tốn không»; Mất row red only when there is a loss. OK. (b) one card-title alignment: all titles left on every card (Fold + iPad). OK.
- Older owner rules on the same elements (grep OD 2160-2173 + KIT): seal top-right one size (#44) unchanged; option card odds on title row / 2 columns on iPad (#49) unchanged; Hoàng hậu name stays gold, Thái hậu untouched (the gold fix 94a37f51 from main merged unchanged); avatar rule (#62-#65) intact except the item-slot clarification above; KIT §6.2b overwritten in place (law 14), §6.2g added. No rule broken.

## Gates (clean box; on a shared box several parallel runs gave timing flakes)
- dev/test/dialog-person-scan.js: first run FAIL 12 (stale scan, above) → after my fix PASS on every later sha.
- quickcheck: PASS on 44914632, 11081e02, 8058b403, 474314f8 (core gates incl. coop-one-world, open, OLD SAVE LOADS buổi, perf). One run under 4 parallel jobs failed G4 coop-one-world «guest week changes the world» — PASS again alone (load flake).
- dialog-fixed.js (86 checks, Fold + iPad): all pass on 44914632, 8058b403, 474314f8 (1 timing FAIL (#54 plate) once under load only).
- coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 92/92 on 44914632, 11081e02, 8058b403.
- mood-seal-ev.js: 2 FAIL (case «khoc», leanMs) — IDENTICAL on pure origin/main fc… (quiet box) → pre-existing, not this branch. mood-seal-scan: pass.

## Final sha ab74a5d7 (merge of main aee7ff84, incl. bag-inline-2 + kit-act-grid + kit-rankunit): quickcheck PASS (core gates, open, old save, perf), dialog-fixed all pass, dialog-person-scan PASS, coop-e2e 92/92, kit-rankunit + kit-rankunit-scan PASS.
- pcrow-square.js (kit-act-grid scan) «gift-wk» FAIL 2 rows wrong/noface — IDENTICAL on pure origin/main 2bf59027 (both sizes) → pre-existing, not this branch (for the kit-act-grid / bag-inline owners).
- Notes for MAIN (not blockers): (1) the left-slot item tile is small (≈ 52 px) inside a wide empty left column on the Fold small frame — matches her #76 words, only a size remark. (2) dialog-fixed is timing-sensitive when other node jobs run on the box: run it alone.
- Shots (Fold 755x1000 + iPad 1180x820; event choice Tốn/Được/Mất, person, maid pick-list, lost item, found item, Nội vụ phủ trả, Lỡ hẹn, result avatar, matter, Sổ nguyệt sự) were kept in scratch, none in git, none on the CDN (nothing to wipe).
