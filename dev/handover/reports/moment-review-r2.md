# E77r — BIG REVIEW review/moment-r 1d2189f3 (MOMENT FIX r1 of E75; PARKING #9 Khoảnh khắc chân dung, rules/data) — VERDICT: PASS 8792f09a (LAND READY)
PRIORITY #1 CHECK ('khoảnh khắc chân dung moment review'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 | review/moment-r 1d2189f3 (E75 fix of E73r FAIL 5a504f92) | claims E69, E73r, E75 (done), E77r (this).
Reviewer: E77r = session_01DgYSWopEScRoLUDyxAoR6m (opus). Branch **review/moment-r2**: 4bf6ee6f = 1d2189f3 + origin/main **ac4790f0** (conflicts: assemble.py list → main's list + jmoment.js after jshelf.js; index.html/sw.js rebuilt by build_site.sh) → **8792f09a** = test-only fix (below). origin/main ac4790f0 is an ancestor of 8792f09a (fast-forward ready).

## E73r ITEMS — each checked
| # | item | result |
|---|---|---|
| 1 | hasen / haquat reachable (law 6b) | FIXED — BAL.mo.list[m].ord one lawful yearly Nội vụ phủ work order per season moment, inside the same menSched wrap (menPlace calls the wrapped global). moment.test case 11 walks the REAL schedule 2 years: xuandao 6 · hasen 2 · haquat 4 · thucuc 6 · dongmai 6 · each festival 2; painter alive 288/288 buổi (sacphong count in case 11 is nominal; case 7 proves the grant) |
| 2 | «Lót tay» equal value + risk on card (law 2/3) | FIXED — br = (p1−p0)·W + khắc − rumour from BAL.pm.val; sit/bribe values equal by construction (case 13: ≤ 0.5 bạc vs eqTol 8 at every rank × Sắc 20/60/100, with and without Hoàng thượng, incl. clamp p0=p1=90 → br 5 buys the saved khắc = real gain, not dominated). Risk IS in the option markup (row dump: `kr-kem kofold: bị đồn đút lót họa sư · Danh -1: khả năng vừa`, wording chanceW per VANPHONG side-chance row). It is NOT visible to the player yet because of the live kit bug below (law 9, not this branch) |
| 3 | NPCs take the bribe road (law 1) | FIXED — npcPass uses the same moRoads; npwPick between the two roads when v.bac ≥ price; bạc spent, rumour → her Danh, item traced (case 12; sim roads e.g. sit 15 / bribe 2) |
| 4 | «… vẽ cho undefined» | FIXED — busy line only for a real sitter (case 14 scan 0 undefined/null/NaN) |
| 5 | typed numbers (law 4) | FIXED — BAL.mo.gr / shelfRk / seeMat, moTop(); case 15 literal scan 0 |
| 6 | buổi perf | ok — my quickcheck buổi median 1058 vs live 915 ms (inside the gate); moFixAll returns at once with no S.moIu |

## GATES (on 4bf6ee6f; 8792f09a only changes dev/test/moment.test.js)
| gate | result |
|---|---|
| moment.test.js | first run FAIL «NPC bribe: no traced painting» = test-order flake (case 12 counted a dongmai painting an earlier case had already given the same NPC this year: got 2). Fixed in the test (count only pieces added by the pass) → PASS ×3 |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · open 1603 ms · old save ok · render 179/180, tab 344/401, buổi 1058/915, tasks>200 18/18 · core gates PASS |
| role-parity.test.js ×2 | ALL PASS / ALL PASS |
| coop-e2e.js | 142/142 passed |
| old-save load | ok (quickcheck + moment test 9) |
| shots Fold 755x1000@2 + iPad Air 1180x820@2 (moment-shots.js, LOOKED, scratch only, deleted) | no page errors; card: both roads with odds word (Có cơ / Vững), Tốn 1 khắc / Bạc −23, Thôi; «!» overlay of the bribe card shows Tốn/Được/Ghi chú only (kit bug); reward = kit reveal, sitter portrait, «Tranh «Dưới tuyết mai» · <name>», Trân phẩm, «chưa vẽ cảnh»; bag Lễ vật = own tile Trân phẩm. No overflow / cut text seen |

## 18 LAWS
1 two-way ok (same odds, same two roads, give/steal) · 2 equal value ok · 3 gain-and-loss ok · 4 one core ok · 5 harder with rank ok (bar 40→68) · 6a n/a · 6b real painter ok (all 12 reachable via the real schedule, lawful 'order') · 6c real objects ok (chest + ilLog + moIu identity, jlost, shelf) · 7 wording ok (ladder words; side chance chanceW; no %) · 8 expert step done by E69 · 9 kit ok (Q + act cards, kitItemInfo, kitInvGrid, rows67; album held on KIT REQUEST) · 10 n/a (no new frame) · 11 family ok · 12 both devices shot and looked · 13 prio1 lines present · 14–17 n/a · 18 parking-lot item, Foreman E may build.

## FOR MAIN / FOREMAN E
- **FOR MAIN → kit keeper (LIVE kit bug, E75 KIT REQUEST in KIT_REQUESTS.md on this branch):** kitOptInfo «!» overlay clones the option as disabled, and j63 `button.ka:disabled .kr-kem/.kr-bai/.kr-mat{display:none}` hides Kèm/Bại/Mất in EVERY option's «!» view game-wide (also greys the odds meter). On the card face those rows are folded (kofold), so today a player cannot see any folded Kèm risk anywhere — incl. this rumour. Fix belongs in the kit, not here.
- Still open from E69: album UI (KIT READY «moment album»), ART ORDER (Foreman C). Dialog top picture is the generic evArt (a lightning-storm scene in my shots) — off-tone, fine until the ART ORDER / a calm scene pick.
- Shots: scratch only, deleted; E75's dev/handover/shots/moment-r1/ (if present) deleted with this verdict.
