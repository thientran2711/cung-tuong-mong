# coop-home-tabs — report (sonnet worker session_01N1tNP4bvkJPNpw5jHcE7Uq)
PRIORITY #1 CHECK: OD 0 | ledger 0 | main dev/test/outside/coop-home.js:94 (the test; not dev/test/coop-home.js) | review/* none | claims coop-home-tabs only (this one)

Branch review/coop-home-tabs sha 92df9b086 (on LIVE main 04afaeb70). TIER SMALL (test-only, no game/co-op/save/time code touched).

## Root cause = TEST DRIFT (game is right)
Commit 06807c14f "maid-8tabs: one 8-tab bar on every road (ROAD8 mapping table)" (owner 21/11 ~03:15Z mark #32/#35 ONE SHELL) put the home (tiểu thư) road on the same 8-tab bar as the palace; labels are now
Hành sự|Dư đồ|Hậu cung|Giao tình|Hoàng tự|Tư trang|Tài nghệ|Mệnh truyện (jroad8 ROAD8.kc). "Khuê phòng" (KCTABS.act) no longer appears on the bar. Seat A in the live run shows exactly that bar and road8()==='kc'.
Side effect: the old palace check `/Hậu cung/.test(tabs)` was vacuous (home bar has Hậu cung too).

## Fix
dev/test/outside/coop-home.js + coop-kcco.js (identical stale check): st() now also returns road8() and the bar's data-tab ids; home check = road 'kc' + 8 ids starting 'act'; palace check = !isKc, road '', 8 ids. No label words.

## Scan (whole group, dev/test)
| file | stale/vacuous home-tab words | action |
| outside/coop-home.js:94 | /Khuê phòng/ FAIL | fixed |
| outside/coop-kcco.js:102 | /Khuê phòng/ (same, would FAIL) | fixed |
| outside/coop-home.js:110 | /Hậu cung/ palace check vacuous | fixed (state) |
| kc-roads/route.js:78 | `home tabs in the palace` regex Nhà tranh|Tẩm cung|Gia đình|Vương tộc now vacuous (never fails), palace /Hậu cung/ vacuous | NOT changed (outside the co-op scope; passes; note for Foreman B) |
| other coop-*.js | no home-tab words | none |

## Gates
coop-home 51/51 ×2 · coop-kcco 65/65 · coop-e2e (A=tt B=nc) 124/124 · quickcheck PASS (old save ok, perf new≈live) · UI untouched → no Fold/iPad shots.
