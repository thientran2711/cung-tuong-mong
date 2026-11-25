# RV viecnho-fix — BIG review of review/viecnho-fix b9865381 (base 502c48c9)

PRIORITY #1 CHECK: OD rows «24/11 ~21:50Z / ~21:57Z / ~22:00Z / ~22:14Z real» (read verbatim) | claims VIECNHO-FIX session_01V1ZZH4XjjV9xGrojVNGZpc | review/viecnho-fix b9865381 | kit KK23b «KIT OK ad4884b6».

## FINAL VERDICT (re-review 89ef52f9): **BIG PASS 89ef52f9** — F1, N1, N2 fixed; see «Re-review» at the end. (Round 1 on b9865381 was FAIL F1, text below kept as history.)

## Round 1: FAIL (one blocking item, small; everything else PASSES)

### Tier claim
Diff 502c48c9..b9865381 read hunk by hunk (j61/j63/j72/j93/jk2b/jk4/jmapc/jreign/jtabs/jwhyn + KIT.md + 3 tests). Claim VERIFIED: text builders + CSS + sub-tab only. No BAL / jbal*.js / save-schema / co-op / time change; no new RNG; `whyWho("emp")` now «Hoàng thượng» (text only). BIG by script only because of text hunks.

### Results
| # | Check | Result |
|---|---|---|
| 1 | «Tìm việc» sub-tab holds «Hỏi han…»; Đang làm = person panel right under chip rows; whole family | PASS (viecnho-scan: every tab/sub-tab × Fold+iPad, 0 «open-new act above main»; only Việc nhờ had it) |
| 2 | Person panel: portrait never moves; left text only scrolls; right info fixed, only act area scrolls; kit part; every person panel | PASS (viecnho-fix.test Fold+iPad ALL OK; scan 7 tabs; my own shots of Cung nhân/staff panel both devices: portrait+tassel+text clean, no overlap) |
| 3 | Result popups: title = cause; one line per change exact signed number; unnamed «một vị <tước>»; no (5→13); no repeated action text; stamp off text | **FAIL for the non-person rows** (see F1); person rows, Kèm rows, unnamed wording, stamp, Vì sao = PASS |
| 4 | «Ta đang ở đây» top layer | PASS (viecnho-map 27 places ALL OK; CSS z-index 60 + tag parts) |
| 5 | KIT FIRST + VANPHONG | PASS (kit parts kitKemRow/.kmseal/§6.4/§7.1/§85.8 in KIT.md; no private frames; no %) |
| 6 | Old saves / co-op | PASS: quickcheck PASS 234 s (old save ok, perf render 258/286, tab 544/550, buổi 1616/1366, core gates + time-spill PASS); j72c-oldsave per worker; **coop-e2e 142/142 passed (both seats)**; viecnho-fix/-scan/-map ALL OK; text-idem-scan clean (still:false, 0 page errors) |

### FAIL list for the worker
**F1 (blocking). The self-stat and maid rows of the same result popup still break the owner's 21:57Z rule.** Reproduced in the real `resultShow` (Fold+iPad), shots `rv/pair-popA`, `rv/pair-popB-thanh`:
- BẠI «Dâng canh khuya cho Thái hậu»: `MẤT  Sủng 60→55 (−5) · dâng canh khuya cho Thái hậu`
- THÀNH «Chép kinh cầu phúc»: `ĐƯỢC  Sủng 55→59 (+4) · chép kinh cầu phúc` and `Cung nữ thân tín tam đẳng Trân Châu: thiện cảm +3 · chép kinh cầu phúc`
Owner words: «không cần ghi dài dòng… chỉ cần thiện cảm cộng 8 … ngắn gọn lẹ thôi»; brief ADD: no «(5→13)», no repeated action text, Vì sao only when cause ≠ action. Here the cause = the card title and is printed a 2nd time, and Sủng still shows old→new.
Cause: `dev/build/j63.js:264` (`${nm} ${before[k]}→${now} (${kaN(d)})` + `kaWhyHtml(kaWhyStat(...))`), `:265` (maid row, same `kaWhyStat`), and `kaWhyStat` line 241 `if(!r&&title…)r=title` (title copy) / 242–243 generic fillers (`KA_WHYD`, «chuyện trong cung»).
Fix (whole family, not only Sủng): every Được/Mất stat row = `<stat> <signed d>` e.g. «Sủng +4» / «Sủng −5» (all stats Sủng/Danh/Đức/Bạc/Sức/Sắc/Tài/Tâm cơ + maid), no `a→b`; `kaWhyStat` returns "" when its text would equal/contain the title or is only a generic filler (keep only a REAL distinct cause from the log). Add to viecnho-fix.test.js a scan over ALL rows of `#rtoast` (not only the person line): no `\d+→\d+`, no `(±\d+)` bracket, no row text containing the lower-cased title. Re-shot: BẠI + THÀNH popups Fold + iPad.

### Nits (not blocking, fix in the same round)
- N1 `dev/test/name-mask-scan.js:45` still expects the old aggregate row «N vị chưa quen biết» → now «3 vị người trong cung: thiện cảm bớt». Owner 22:14Z rule applies: update the regex to `/^\s*\d+ vị /`. Scan otherwise clean (0 page errors; all names masked as «một vị <tước>»).
- N2 aggregated stranger row «3 vị người trong cung: thiện cảm bớt / thêm» carries no signed number (owner: exact signed number). For ≥2 strangers consider one line per rank group with the number, or per-person lines like Kèm.
- N3 `dev/test/coop-thin-f1.js:97` comment still quotes «một vị Phế phi chưa quen biết» (comment only). `jhc.js:164`/`j61.js:214` «Còn N phi tần ngươi chưa quen biết» is a statement in the relations tab, not a person naming → left as is (owner may rule).
- N4 Worker's disclosed trade-off (portrait narrows to ≥120 px on short cards: Fold ≈190, iPad ≈120–140) = deviation from OD 18/11 «figure never shrinks»; law 16 → owner must be told (main 129). My iPad shot of Cung nhân shows it looks fine.

### Shots (CDN, base https://ctm-img.victoria-tntt.workers.dev/img/_review/viecnho-fix/rv/ ; Fold 755x1000 left + iPad 1180x820 right, looked 3×)
`pair-popA.png` (BẠI, shows F1) · `pair-popB-thanh.png` (THÀNH, shows F1; Thái hậu/Hoàng hậu rows + Kèm fine) · `pair-popC-trong.png` · `pair-pp-staff.png` (Cung nhân panel, PASS) · `pair-pp-kvo.png`. iPad harness shots sometimes show a chest/achievement dialog from the bot run — harness artefact, not the build.

~90% xong / ~85% chơi được (after F1).


## Re-review 89ef52f9992b45c3271b5f3c24c4e2cdc7b268d7 → **BIG PASS 89ef52f9**
Diff b9865381..89ef52f9 = j63.js (kaWhyStat no title/filler, stat rows «<stat> ±N», strangers one signed line each), name-mask-scan regex, viecnho-fix.test.js (+ scan of ALL .kitem rows of real BẠI + THÀNH). Text only; still no BAL/save/co-op/time change.
- F1 fixed: real popups now `MẤT Sủng −5 / Bạc −20 · một vị Tần: thiện cảm −5 · KÈM Quý phi X: oán +18 · một vị Phi: oán +18`; `ĐƯỢC Sủng +4 / Danh +2 / Bạc +30 · <nữ quan>: thiện cảm +3 · Thái hậu: thiện cảm +6`. No a→b, no (±N), no title copy, no filler. Also seen in my own harness popups (Fold+iPad) and worker shots `{fold|ipad}-after-3-ket-qua-{bai|thanh}`.
- N1/N2 fixed. Runs: viecnho-fix.test ALL OK · viecnho-scan CLEAN · viecnho-map 31 places ALL OK · name-mask-scan PASS 0 hits (0 page errors) · quickcheck PASS 235 s (old save ok, render 256/264, tab 465/585, buổi 1642/1642) · coop-e2e 142/142.
- Open for main/owner only (not blocking): N4 portrait-narrowing trade-off vs OD 18/11 (law 16).
~92% xong / ~88% chơi được.
