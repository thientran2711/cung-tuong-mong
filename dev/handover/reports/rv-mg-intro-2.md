# REVIEW mg-intro-2 (b21609fc) — PASS

PRIORITY #1 CHECK: OD 21/11 owner mark #55 | main LIVE 666def0c | review/mg-intro-2 b21609fc (+ merge) | claims CLAIMS row «REVIEW mg-intro-2», Foreman B ROOT-5.

Branch review/mg-intro-2-rv = b21609fc + merge of origin/main 666def0c. Conflicts: dev/build/j82.js (kgReady html) and dev/build/jnwb.js (main's new NWB_DEMO block from mg-5s-clear) → both resolved to the mg-intro-2 side (rule-demo picture gone, owner #55); index.html / sw.js taken from main then rebuilt (assemble.py + build_site.sh). No conflict markers.

## Checks
- git grep: no `kgr-demo` / `NWB_DEMO` / `kgReadyDemo` left in dev/build; no `kpPop` in j82 (only the shared kit callers elsewhere, unchanged). kgBang / kgBangRows (j82:554-556) = 2 one-line wrappers of kitTapWord; no private style/CSS (law 9 OK).
- Intro (startContest Thất tịch, every KG82_KIND via playArt): event picture on top, no demo picture, long rules + «Phần của ngươi» + rival detail behind the tap-word; tap opens the kit pop-up with the rules. Fold shows all 3 rival rows (.kgrv-c 249/247, no inner scroll), iPad too; no horizontal overflow.
- Wording: no %, cổ trang (law 7). Numbers/BAL untouched (law 4).

## Results (on merged build)
mg-intro-2 ALL OK (755x1000 and 1180x820) · mg-ui-rest 39/39 · mg-allkinds PASS 7/7 · mg-noword-a 0 FAIL · mg-noword-b ALL OK · mg-noword-kit PASS 31 kinds · mg-ready-guide PASS 9/9 · coop-e2e (tt/nc) 92/92 · quickcheck PASS (238 s, old save loads + plays a buổi, core gates PASS, 0 errors).
Shots (scratch, looked 3×, Fold 755x1000 + iPad 1180x820): layout as described. Note: a stray «Bộ sưu tập» notice from the seeded test state can overlay the iPad shot; it is not part of the intro.

~100% review done.
