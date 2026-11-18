SẴN SÀNG KIỂM 7b97d64c8e7c53ffdc1f47ff3cd6abbf36ad8547 — review/ghen-shown: ghenN() = the one function for "every consort ghen +n"; 27 shown texts + 34 ghenAll calls read the same BAL constant (đa tình ×1.5 shown == applied).

# Worker report — review/ghen-shown (Foreman D, ONE CORE OD:L1267)

Worker session_01DgYSWoyzKbRUjGm9gW7pNW (opus). START_CTX ~3 % of 1M (get_session reads 0; estimate). Base = review/emperor-visit-r1 b2e34df7 (NOT yet on main when started) — ship after it (fast-forward on top of it).

## What
- LUẬT ƯU TIÊN SỐ 1: git grep origin/main, origin/review/one-core (the only review branch named for one-core/ghen; 625 review branches, gh code search on main for ghenN/ghenAll) → no existing helper; reused the reviewer's nightGain/BAL.night pattern.
- `ghenN(n)` (j1): round(n × BAL.ghen.datinh) when the Emperor is đa tình, else n. `ghenAll(n)` applies ghenN(n). Every text that shows such a gain prints `ghenN(<the same constant>)`.
- ONE CORE: the factor 1.5 moved to `BAL.ghen.datinh`; all 28 typed ghenAll numbers moved to `BAL.ghen.<key>` (jbal2, keys commented), so text and rule read one constant. Rules unchanged in value (same numbers, same ×1.5).
- Kit: no visual change (text only, existing kit cards/chips). No KIT REQUEST.
- VANPHONG: no %, no new words; only numbers in existing lines.

## Scan (LUẬT SỬA CẢ NHÓM) — `python3 dev/measure/ghen_shown_scan.py [rev]`
| | before (b2e34df7) | after (7b97d64c) |
|---|---|---|
| shown texts of a ghenAll gain, plain number (shown ≠ applied under đa tình) | 27 (13 same-line BAD + 14 on other lines) | 0 |
| shown texts via ghenN (OK) | 0 | 27 |
| ghenAll calls with a typed number | 28 | 0 |
| ghenAll calls reading BAL | 6 | 34 |
| text keys no ghenAll applies (ORPHAN) | – | 0 |

Before → after per shown text (Emperor đa tình; applied = what ghenAll really adds):
| place | text | before shown / applied | after shown / applied |
|---|---|---|---|
| j2 Múa trong yến tiệc | phi tần ghen +n | 4 / 6 | 6 / 6 |
| j2 Kinh hồng vũ | các phi tần ghen +n | 10 / 15 | 15 / 15 |
| j2 Báo tin có thai · j75 Báo tin cho Hoàng thượng | ghen +n | 6 / 9 | 9 / 9 |
| j7 phoenix Để lời đồn lan xa | cả hậu cung ghen +n | 12 / 18 | 18 / 18 |
| j7 Khóc kể với Hoàng thượng | ai cũng ghen +n | 5 / 8 | 8 / 8 |
| j20 ân thưởng card + log | phi tần ghen +n | 3 / 5 | 5 / 5 |
| j24 Nhận lời kết chị em | các phi tần khác ghen +n | 3 / 5 | 5 / 5 |
| j68e thưởng hoa / kéo bè / khoe | phi tần ghen +n | 2,2,4 / 3,3,6 | 3,3,6 / same |
| j68g Xin giữ làm của riêng | phi tần ghen +n | 3 / 5 | 5 / 5 |
| j71 contests (×5 texts) | thắng thì … ghen +n | 4 / 6 | 6 / 6 |
| j71 praise (×2) | được khen thì … ghen +n | 3 / 5 | 5 / 5 |
| j71 big festivals (×2) | đứng đầu thì … ghen +n | 8 / 12 | 12 / 12 |
| j83 / jecon Bày ở yến tiệc (button ×2 + log) | phi tần ghen +n | 2 / 3 | 3 / 3 |
| jexam full-seat reward (BAL.psk.seat) | Lục cung ghen với ngươi (ghen +n) | 10 / 15 | 15 / 15 |
| jcycle Giấu, không báo | phi tần ghen +n | 4 / 6 | 6 / 6 |
| jvisit card + morning line | phi tần ghen +n | 6 / 9 | 9 / 9 |
Not đa tình: every place shown == applied before and after (same numbers).

Not part of this family (scan lists them DIRECT/NOTE): one-consort or small-group jealousy written directly (steal +25, Hoàng hậu +15, garden +3, toilet crowd, the visit's lost-night rival, jts, jpet, jne). No đa tình factor there, so shown == applied already. FOLLOW-UP for the coordinator (ONE CORE, not done here): some of those numbers are typed twice (steal "ghen +25" in j2/j17/j75/j79/j87/jaudit vs j8 stealWin) — a BAL.steal constant would close it. Also j20's bestow line still passes "Chắc chắn" into kitParse (not visible on the card; VANPHONG-banned word in source) — left as is.

## Tests
| test | result |
|---|---|
| dev/test/ghen-shown.js (new: static scan + unit every BAL key đa tình on/off + live: pool Múa, artActs Kinh hồng vũ, deal Báo tin có thai, phoenix event, pregFind card, bestow card + log, visit Thắp đèn → visAfter; shown parsed, option run, every rival's real delta == shown) | ALL OK, 0 page errors |
| dev/test/emperor-visit.js 3 3 | PASS, 0 page errors |
| dev/test/cycle.js index.html (6 viewports + logic) | ALL OK |
| dev/test/night-day.js (root index.html) | ok:false on BOTH base b2e34df7 and this branch, 2 runs each; which night kinds happen varies run to run (base nights steal/road/ksp/morning/stale = 1/1/1/0/0, 0/1/1/1/0; new 1/0/0/1/1, 1/0/1/1/1), 0 page errors. Pre-existing random flake, not from this branch (no night/day code touched besides the ghen number). Coordinator: watch it |

## Screens (deviceScaleFactor 1, Emperor đa tình)
755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844 rotate prompt OK in cycle.js): Hành sự card "Múa trong yến tiệc" shows Kèm "phi tần ghen +6" (4 × 1.5) at all sizes; "Thánh thượng ban thưởng" card Kèm "phi tần ghen +5" (looked at 844x390, 755x1000); phoenix / visit event cards show hints only (numbers appear in the result), no overflow, 0 page errors.

## Handover
Done; nothing pending. Worktree /home/user/wt/ghen-shown removed after push.
