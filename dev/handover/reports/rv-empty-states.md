# REVIEW empty-states (rv) — FAIL (1 item) — reviewer session_01Rc5AsKYVABSkdoN1RAuKBR, 21/11

PRIORITY #1 CHECK: OD 21/11 ~02:20Z/~02:22Z/~02:24Z, mark #22 | main LIVE a88b14f0 | review/empty-states 4fe91dcc | claims: worker session_01Rc5AsMTnwmUdoGmZsd4Uvk, keeper kit-pcrow-square (not landed at review time) | reports/empty-states.md read.

Merge: 4fe91dcc + origin/main a88b14f0 = e184af1e (local only, not pushed: FAIL). index.html/sw.js = main's, rebuilt (assemble + build_site). No markers.

## Gates (all on e184af1e)
- quickcheck: PASS (163 s, old save ok, core gates PASS, time-spill PASS, perf ≈ live).
- coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 92/92.
- empty-scan: kitEmpty (`.kempty`) used by the empty tabs (Nam nhân, Phe phái, Việc nhờ ×3, Mệnh truyện ×3, Sắc phong, Thú cưng, Gia tộc…), no private frame. KIT.md §37.2 + §21 updated (law 9 ok). Words cổ trang («Ta chưa …»), no %.
- panel-scroll-scan: PASS on Fold + iPad; long tabs (art, log, act, fac-td) still scroll.
- ART REQUEST lines in FOREMAN_C_STATUS.md: not found for empty-states in the C status tail (only bag-inline's «Chợ đen» line) — worker to confirm / write if the brief required any.

## FAIL 1 — Ân oán (Giao tình › Ân oán, tab `rel`/`fac`) overlaps on Fold AND iPad
Shots (scratch, seen 3×): Fold 755x1000 `fac-Ân oán`, iPad 1180x820 same. On main the relation card keeps its natural height and the panel scrolls. On this branch `#panel.kpane>.pgwrap{height:auto;flex:1 1 0;min-height:0}` shrinks the wrap to the space under the tab bar, so the content does NOT fit and, instead of scrolling, it is squashed: the `<p class="past">Còn N phi tần ngươi chưa quen biết…` sits ON the card's bottom border and spills below it, and the next card «Đã biết về …» overlaps that text. panel-scroll-scan reports `rel` "ok" (scrollHeight == clientHeight) — it only measures the panel, so it is blind to this; it hides a real regression.
Chí tôn (Fold) has the same cause in milder form: the card is a little shorter than on main and the bottom card «Xin yết kiến…» is cut by the frame (compare main: both bullets fully shown, no cut card). Cung nhân (iPad) looks ok.
Fix for the worker: only the tabs whose wrap content is a short fixed card should use `flex:1 1 0`; any `.pgwrap` with `.krelpg` / long content (rel, hon people list) must be `flex:0 0 auto` (like `:has(.ktbox)`), or `min-height:min-content` so it can scroll. Extend panel-scroll-scan with an overlap/overflow check (child.scrollHeight>clientHeight && overflow visible, or p.past bottom > its card bottom) and re-run Fold + iPad for Chí tôn, Cung nhân, Ân oán, Phi tần, Hoàng tự tabs.

PASS items otherwise. Nothing pushed to review/empty-states-rv. ~92% xong / ~85% chơi được (empty states), 1 layout regression open.
