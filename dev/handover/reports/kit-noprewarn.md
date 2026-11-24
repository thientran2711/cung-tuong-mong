# kit-noprewarn — report

## REVIEW r1 (sonnet reviewer-lander · 24/11)
PRIORITY #1 CHECK: KIT §13.9 + OD 24/11 ~08:40Z (real scope: only post-tap «choose again» confirms in game; system confirms stay) | review/kit-noprewarn 1d4fc04d (KK18) | reused, nothing rebuilt.
r1 = review/kit-noprewarn-r1 = 1d4fc04d + merge origin/main fd85907a + bash dev/site/build_site.sh (index.html/sw.js committed) → 40bcd59fd8ea524f4deea7dbedc81f4c52323bc0.

### Law 11 — confirm call-site scan (before = 056c2402 parent, after = 1d4fc04d)
| call site | before | after | verdict |
|---|---|---|---|
| j82 kg82Ask «Bỏ cuộc?» (✕ on rules / play) | yes | removed | in scope (post-tap choose-again) |
| j82 kg82Ask «Quay lại?» (Thử tay, backAsk) | yes | removed | in scope |
| j82 quitAsk «Để mộc» (jtoil) | yes | removed | in scope |
| jsgame «Ra tay?» (xdo) | yes | removed | in scope |
| j25 xgConfirm «Xuất gia?» | yes | kept | not this branch (separate OD 07:25Z) |
| jcloud «Xóa hẳn sổ trên mây?» kitConfirm | yes | kept | system confirm — stays |
| j79 kitConfirm itself + jkitpage sample | yes | kept | kit part, one copy (law 9) |
No private copy; kg82cf CSS removed in both j82 and jk4. Grep after merge: no kg82Ask / kg82cf / backAsk / quitAsk left in dev/build (only KIT.md prose). KIT §6 untouched; §13.9 text matches the code.

### Tests (commands → result)
| test | head | result |
|---|---|---|
| node dev/test/mg-back.js (no args) | bare 1d4fc04d | run 1: FAIL 1/12 (check 6, jtd Tu đức self, diff `__mkAt` = jmoodknow clock stamp, flaky); rerun PASS 12/12; parent 056c2402 PASS 12/12 |
| same | merged 40bcd59f | PASS 12/12 |
| mg-back dev/index.html 755x1000 shots / 1180x820 shots | merged | PASS 12/12 both |
| mg-allkinds (no args, + dev/index.html) | merged | PASS 13/13 both |
| minigames.js file://… 755x1000@2 / 1180x820@2 | merged | exit 0 both |
| mg-skip.js file://… both viewports | merged | PASS both |
| fig-retry.js (no args, + 1180x820@2 both), ag-mgcal.js (no args, + dev/index.html) | merged | exit 0 |
| minigame-tap.js, minigames-j71.js, tuduc-mg.js ngon self | merged | FAIL — IDENTICAL on parent 056c2402 (pre-existing: tap test lesson intro; j71 «Đệm gấm» modal intercepts tap; tuduc bot raw 2<3). Not this branch |
| minigame-tap/j71/tuduc-mg/minigames/mg-skip with NO args | — | usage error (they need URL/root) — not a branch fault |
| bash dev/tools/quickcheck.sh (run ALONE) | merged | PASS 202 s · open 1702 ms · old save ok · perf render 202/267, tab 426/434, buổi 1007/1671 · core gates PASS |
| coop-e2e.js (Fold hosts) / COOP_SWAP=1 (iPad hosts) | merged | 142/142 both seat orders |
Law 14: mg-back updated by the branch itself (asserts no confirm, kitConfirm counter 0); no other test asserted the old rule.
Shots (Fold 755x1000, iPad 1180x820, looked 3×): ✕ «Quay lại» in header, inside screen; contest give-up goes straight to the result; nothing cut.
Note (not FAIL): a fat-finger ✕ now forfeits a paid game at once — that is the owner's order.
Verdict: **PASS** 40bcd59fd8ea524f4deea7dbedc81f4c52323bc0.
