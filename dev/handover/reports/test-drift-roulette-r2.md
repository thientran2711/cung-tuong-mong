# test-drift-roulette review r2 (reviewer, branch review/test-drift-roulette-r1)
START_CTX ~6 %. Reviewed e0f3fef3 (main e9c6021d merged in); my fix on top: 70cae6bd. Tests-only confirmed: git diff origin/main --name-only has 0 files outside dev/test/ (main has since moved to 73c06812).

## VERDICT: FAIL (tutorial test still red on this build)
Results (serial runs, cdn-overlay-serve, Playwright):
| test | 755x1000@2 | 1180x820@2 |
|---|---|---|
| podium | PASS 53s | PASS 48s |
| inv-grade | PASS 29s | PASS 28s |
| minigames-j71 | PASS 46s | PASS 39s |
| toilette | PASS 185s | - |
| mk-e2e | PASS 175s | - |
| minigames | PASS 454s | - |
| tutorial tour,skip,replay | FAIL | FAIL |

## Tutorial findings
1. Test drift (fixed, 70cae6bd): after main moved on, the new-life flow ends with a KIT 81 scene (flip card "Hoàng thượng lật thẻ bài") whose only exit is a kit button `.kmend` ("Ta biết rồi") OUTSIDE #modal. passNewLifePopups only looked in #modal, so Q kept "Nhập cung"/"Mệnh truyện" and "tour did not start" came back (reproduced at @1 and @2). Helper now taps `.kmend:visible`. With it the tour starts at 755x1000 (first-run auto-open works, opens once).
2. GAME defect (not test drift), 755x1000 @1 and @2: tour step 5/12 id "thu" ("Làm thử một việc", Tống ma ma): the card is 560x700 at (8,8) and lies on top of the tap target (hole 9,145 737x250). Test check "card over the tap target" fails 10x, then "tour end" fails (the step is blocked, the player cannot tap the lit card). Screenshot seen: card covers the target. Cause is in jtut.js place(): with a tap step and no room below (586 px free, card 700 px, picture + tall figure from kitPersonDlg guide) the fallback puts the card at the side and still overlaps because the hole is 737 of 755 px wide. This needs a game fix (card shorter/placed above or hole narrower), owner of jtut/kit.
3. 1180x820@2: only "tip" FAIL (first-open Tài nghệ tip never became 'tab-art' within 12 s; tb above=true). Not analysed further: likely another queued tip after the new flow; needs the worker to look (test drift or game).
Not run: 1366x1024, the 39 mass-switched tests (node --check only, same as worker).

## For main
- Worker branch is not mergeable yet: tutorial.js is red at both owner devices. Item 2 is a real game bug the test correctly catches; send to the UI/kit owner, then re-review. Branch review/test-drift-roulette-r1 @70cae6bd keeps the helper fix; origin/main moved (73c06812) so merge it again before PASS.
