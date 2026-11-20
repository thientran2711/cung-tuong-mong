# rv-mg-noword-a — PASS 3ff39b1a (review/mg-noword-a-rv, FF of origin/main d74f86a5)
PRIORITY #1 CHECK: OD 20/11 ~05:10Z + ~06:20Z | main j82 kit frame | review/mg-noword-a ab5e4f68 | claims mg-noword-a JjhKkEPJ
## Checked (LIVE main d74f86a5 already inside ab5e4f68)
- dev/test/mg-noword-a.js: 15 kinds x (play, «Hướng dẫn») = 0 words, no page errors (46 ok / 0 FAIL, rerun on final sha).
- mg-ready-guide PASS 9/9; ag-mgcal all ok (every kind starts its real board). dev/test/quickcheck.sh does not exist (worker note true).
- Shots LOOKED, Fold 755x1000@2 + iPad 1180x820@2: dauho, huong, hat, mua rules + play. Boards show only pictures/signs (★ stars, ♪, ◎ ●, arrows ↙, ✓, 3 stars pop). Pull demo (hand pulls back, tick line, arrow) and slide demo (hand + bar) are readable on both devices.
- Scope: no BAL.mgFx / group-b kind code touched; k91DemoCard off.
## Fixes I made (1)
1. KIT.md did not register the new demo motions "pull"/"slide" nor the kg82Sym sign table (brief: kit parts must be registered). Added in the §13 kgr-demo line (still "five motions"). Commit ece81711; then index.html/sw.js rebuilt (3ff39b1a).
## Open item for MAIN (kit-wide, not group a only — not failed, your call)
- In play, the kit block "CÁCH CHƠI <sentence>" above the board and the "Còn N giây" chip still show words, for every kind (a, b, all callers). Owner: "không có một cái mini game nào mà có chữ hết trơn". The worker flagged it; the test skips them as kit parts. If the owner means these too: hide the sentence in play (rules screen + «Hướng dẫn» keep it) in the kit part, one place, all kinds.
## Weak (accepted, listed by worker)
- Cờ (co) still the generic tap demo; glyph signs until painted icons (KIT_REQUESTS).
- Shots are scratch only (not uploaded, none in git).
