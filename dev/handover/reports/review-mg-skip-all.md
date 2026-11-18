# REVIEW (BIG, rules/numbers) mg-skip-all — PASS d219fce
PRIORITY #1 CHECK: OD 18/11 ~05:30Z / ~05:45Z / ~05:55Z (read verbatim) | main: old skips j5.js #mgskip (BAL.odb.j5) + j83.js "Học nhanh" (BAL.odb.j83), now replaced | review/* mg-skip-all only (worker session_01UV1Szjuwc7PJM75kQAAyPf) | claims: MAIN ROOT-46 row 489; Foreman D skip-odds-40 folded in.

Reviewed: review/mg-skip-all 0f542e1 (fdd2862 + 0f542e1). Not a fast-forward of main, so merged on **review/mg-skip-all-r2 = d219fce** (merges origin/main de5571d, then 1c3abe3; only conflict jbal2.js tail = both blocks kept (BAL.skip + BAL.faceReveal); index.html/sw.js taken from main and rebuilt with `bash dev/site/build_site.sh`). Diff r2 vs origin/main = the same 27 files as the worker branch (no extra). d219fce has origin/main 1c3abe3 as ancestor (FF-able at 06:31Z).

## Checks
| Check | Result |
|---|---|
| Every mini-game found (mg-skip-audit.js static scan: 21 games, discovery rule = any file opening kg82Open / kitGameFrame / openMG must build kitQuick; playArt callers must name quick) | 21/21 use the ONE kit part kitQuick/kitQuickSub (j79, KIT §13.6), fails 0 |
| ONE BAL key | BAL.skip {od:40, raw:5, care:.5} in jbal2; kitQuickRoll() = roll(od(BAL.skip.od)) is the only quick roll; BAL.odb.j5 / BAL.odb.j83 gone (grep 0 hits) |
| one-core-guard | PASS (inline 3839 < baseline 3842, 0 fails) |
| 40 shown as a word | every quick button prints word(od(BAL.skip.od)) = "Khó"; no %, no "Chắc chắn" (page test wordOK on 5 buttons) |
| Quick ≤ middle tier (tested in page, both rolls forced) | makeup won → vua "Đoan trang" score 40 = BAL.toil.tier[0] (lowest of the middle tier), lost → Vụng về; Để mặt mộc kept · j83 lesson won 1 pt (good play up to 3) / lost 0, no work · Tu đức won = progress of a 5/10 play / lost 0 · j5 overlay lost → "Không vào" · veil craft = no product, material back · care games = BAL.skip.care (½) of the gain |
| Own-rule quick (contests/exams "Để tài nghệ quyết định" = peer mark; jts court act "Bỏ qua" = the act's own odds; jslap/jroute/jsgame/j92) | pre-existing rules, unchanged; only their button moved to the kit part. Accepted: they are not odds-skips of a lesson; none beats a good own play |
| Old saves | quickcheck old save from live build loads + plays a buổi (odb keys were BAL, never saved) |
| Co-op (both seats) | quick result writes the same S.toilette / lesson result as a play, run where the game runs; coop-toil-look.js 29/29 (Fold host + iPad guest, live Worker); core-gate coop-one-world PASS |
| quickcheck (on 8af2fc2) | PASS · open 1484 ms · old save ok · perf new/live render 178/206, buổi 915/1062 |
| mg-skip.js page test | PASS 16/16 at 755x1000@2 and 1180x820@2 (8af2fc2); rerun PASS on d219fce (Fold) |
| Kit consistency | every quick button = class "kbtn alt kquick" (j5 #mgskip adds .btn base), same look beside each start button |

## Shots LOOKed (scratch, not in git): Fold + iPad: makeup intro (3 buttons: Trang điểm / Điểm trang nhanh "Khó · thành: Đoan trang · hỏng: Vụng về" / Để mặt mộc), lesson Học Cầm (Học nhanh), Tu đức Thêu (Để trời định + Thôi), j5 Kỳ overlay. No cut text, no overflow, no page errors.
Note (not this branch): a stray "Sức −150" float shows top-right in the Fold j5 shot — test reset artefact (S.suc forced), not seen in play.

Verdict: **PASS d219fcefd3a7012a3e095749ecc599de03501036** (review/mg-skip-all-r2). CDN img/_review/mg-skip-all wiped.
