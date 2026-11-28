# ROW 26 — talking to others' people → suspicion/trust + greeting (B WORKER ROW 26, session_01N1tNP2KcAtN7j5hYW1DiLJ, 28/11)

PRIORITY #1 CHECK ('suspicion|greeting|chào hỏi|người của'): OD 26 (24/11 ~07:58Z etiquette, ~08:08Z no pre-warning, ~08:12Z suspicion/trust; 17/11 ~05:12Z greeting name by rank + nết) | ledger 0 | claims: D servant-trust + talk-others-people DONE | main 22afefb4: jgreet.js (greeting by rank + nết LIVE), NO jsvt | review/*: servant-trust-rv 65abb0de, talk-others-people-rv 25a9a9cc (PASS 25/11) → inside promo-stack-lr4 7fc09b65 → rank-pace-rv2 bbe3d757 → **review/lr-rules-r2 a96564ad (RV-184 PASS, LR-RULES lander)**.
KIT CHECK: reuses the existing approach card (kit stage thẻ gỗ «Có người đến») and the kit result card; no new UI part.

## STEP 0 table
| Part of row 26 | Where | State |
|---|---|---|
| Greeting by rank + nết (lower names herself; unique titles known; proud/cold no name; both ways) | LIVE jgreet.js + BAL.greet (jbal2) | ON LIVE |
| svTouch / svTalk / svtEtq / svtPeer: refusal by lòng + Chủ tin + nết; talk → master suspicion, Chủ tin −, real leak; bất kính when master present and not greeted; NPC→her, NPC↔NPC, servant↔servant; no pre-warning | jsvt.js + BAL.svt | in lr-rules-r2 a96564ad (blob == talk-others-people-rv 25a9a9cc), not LIVE |
| «Hỏi lén» covert talk, elder talk gain, Thái hậu household | jsvt / jstaff / j15 | in lr-rules-r2 a96564ad |
| jtsb «xin theo ngươi» card (another house's servant comes to sell out) | jtsb.js:246/254 | **FAULT on every branch** (svt-scan 1 UNWIRED) → fixed here |

## What changed (branch review/row26-talk, base review/lr-rules-r2 a96564ad — jsvt is not on LIVE, so the fix stacks on the READY rules bundle)
1. dev/build/jtsb.js: the jtsb override of j24 svDefect lost j24's wiring: svTouch(S,s,"bribe") ran when the card ARRIVED (before her choice, also on «Đuổi về») and the after-line said «ngươi tìm gặp X» though X came to her. Now svTouch(S,s,"bribe",undefined,s) runs only inside «Thu làm tai mắt» go() (mv = the servant who came). OD 24/11 ~08:12Z: refuse → nothing; ~08:08Z: effect shown only after.
2. dev/test/servant-trust.js: + 5 checks for that card (arrive = no change; Đuổi về = no change; accept = svTouch once + Chủ tin −; after-line names the one who came). Test-fixture fixes: never pick her housemate (same palace is exempt by design → random FAILs); thiện cảm falls below 0 are paced by stat-pace (jstatpace, OD 26/11 ~04:20Z) — the 5 exact «−B.rel.x» checks now accept the paced share (`fell`). Before: «Hỏi lén seen» FAILed on lr-rules-r2 itself (100/101).
3. dev/test/greet_check.js: «words» check inverted to the current owner rule (24/11: story text, never «Vì sao / Ta đã biết»); it FAILed on LIVE.

## Law-11 table (svt-scan, dev/measure/svt-scan.py)
| | sites | UNWIRED |
|---|---|---|
| LIVE 22afefb4 | (no jsvt) | whole family unwired |
| lr-rules-r2 a96564ad / svtouch-spylearn-r2 d6e7ac24 | 69 | 1 (jtsb.js:246) |
| review/row26-talk | 69 | 0 |
Other svTouch call sites checked by hand: j24:34 (on go), j24:96 (NPC deed, done), j42:346 (friend already came — a real visit), j10/j42/j70/jagknow/jky (on success). No other arrival-time call.

## Tests
| test | LIVE 22afefb4 | base a96564ad | fix | MUTATE (jtsb reverted) |
|---|---|---|---|---|
| servant-trust.js | n/a (no jsvt) | 100/101 FAIL (stale exact −10) | 106/106 PASS ×5 | 104/106 FAIL (2 new checks) |
| svt-scan.py | n/a | 1 UNWIRED | 0 UNWIRED | 1 UNWIRED |
| greet_check.js | 3 FAIL | 3 FAIL | words PASS; AG-MEET 2 checks random (see open) | — |
| greet-stranger.js | — | PASS | PASS | — |
| real tap Fold 755x1000 + iPad 1180x820 | — | — | PASS both: card shows, tap «Thu làm tai mắt» + ✓ → Chủ tin 52→38 / 49→34, svTouch.bribe +1, spyFor me; result card «Được Tai mắt +1 · Mất Bạc −20 · Hoàng hậu …: thiện cảm −9 (−14)», 0 page errors | — |
Shots (scratch, not in git): /home/user/wt/r26-shots/{fold,ipad}-{1-card,2-after}.png — looked at 3×.

## Open (not row 26, reported to Foreman B)
- greet_check AG-MEET «she is picked sometimes» / «she gets the kit card»: in 80 buổi NPCs approach her 0 times in ~2 of 3 runs, LIVE the same (meet 3–18, her 0). A statistical test or a real rarity of law-1 approaches — owner of AG-MEET should check.
- Landing: this branch = lr-rules-r2 + 1 game fix; it must ride WITH/after the rules bundle (LR-RULES), or its jtsb hunk be applied on whatever bundle head lands.

## Core gates (dev/tools/coregates.sh on review/row26-talk e70e9e38, base a96564ad; run cut by my 900 s timeout during G4-94)
G1 one-core guard/bind/khắc/text/textrule PASS · G2 rules-one-source PASS (old save loads) · G3 kit-conform no FAIL, floats none · G4: webkit-boot, odds-cap, coop-one-world, mk-layer 0 bad, manifest-guard, npc-purpose-scan, dialog-fixed, dead-card, button-crawl (0 sure faults), look-dedupe, press-keep all PASS · q-softlock: 4 FAIL inside the gate run («person view never opened») → rerun standalone: LIVE 22afefb4 18/18 PASS, base a96564ad 18/18 PASS, **row26-talk 18/18 PASS** (the gate-run FAIL = the known «person view» tap flake, not this change; reviewer may rerun G4-94 alone).

SẴN SÀNG KIỂM review/row26-talk e70e9e387c84847f958e232c8e3a1a7819b4b42e (BIG; on lr-rules-r2 a96564ad ⊃ LIVE 22afefb4).

## REVIEW (B BIG RV row26-talk, session_01N1tNP2KKJkkwauJFWVHcCs, opus, fresh; depth 3; START_CTX ~3 %; 28/11)
PRIORITY #1 CHECK ('row26|svTouch|jsvt|jgreet|xin theo ngươi'): OD row 26 | LIVE now a96564ad (= lr-rules-r2, so row26-talk is a plain delta on LIVE) | review/row26-talk e70e9e38 | claims B-ROW26 2KcAtN7j.
VERDICT: **PASS on review/row26-talk-r2 8f62a546a0a18d9c520d220180f1b53c3d9aed18** (= e70e9e38 + reviewer small fixes). e70e9e38 alone would PASS except one LAW 11 family gap, fixed in r2.
(1) Source delta vs a96564ad: jtsb.js 2 hunks (svTouch moved from the approach2 arrival wrapper into «Thu làm tai mắt» go(), mv = s) — correct; index.html/sw.js = rebuild only (4 build lines). OK.
(2) LAW 11 family (all 20 svTouch call sites, grep 'svTouch(' dev/build): the SAME card has a fallback in j24 svDefect (used when jtsb cannot find the victim): it still called svTouch(S,s,"tm") without mv → after-line «ngươi tìm gặp X» though X came to her, and kind "tm" ≠ the jtsb card's "bribe". j24 svSell (her servant sells her out to v) also lacked mv = the servant who went. **Fixed in r2**: j24:34 svTouch(S,s,"bribe",undefined,s); j24:96 svTouch(v,g,"tm",undefined,g). Every other site: on success/acceptance (j10, j42:346/382/419, j70, jagknow, jky, jsvt internals) — no arrival-time call, mover correct.
| | svTouch sites | arrival-time | wrong/missing mover on the defect/sell family | svt-scan UNWIRED |
|---|---|---|---|---|
| LIVE a96564ad | 20 | 1 (jtsb approach2) | 3 (jtsb, j24:34, j24:96) | 1 |
| e70e9e38 | 20 | 0 | 2 (j24:34, j24:96) | 0 |
| r2 8f62a546 | 20 | 0 | 0 | 0 |
(3) Law 1 two-way: svTouch/svTalk same rule her ↔ NPC ↔ NPC (servant-trust (5) PASS). Law 6b: the card's servant is a real staff member (rcpDec resolves s204 in the real-tap run). Law 4: svTouch numbers from BAL.svt; card cost BAL.eff.jtsb.bacFx (j24 fallback fx bac:-20 literal is pre-existing, not this diff). Law 7: words, no %, no «ngươi tìm gặp» (real-tap PASS).
(4) Test edits honest: `fell()` matches jstatpace header (thiện cảm paced on both sides of 0, OD 26/11 ~04:20Z) — exact while ≥ 0, a paced share ≤ n past 0; housemate exclusion = svTouch exempt same house by design. greet_check «words» = jgreet header rule (24/11: story text, never «Ta đã biết… Vì sao…»). The worker's new «card arriving: no change» check did NOT exercise the arrival wrapper (it built tsbApCard directly → PASSed on LIVE too); r2 adds a check that the approach2 wrapper calls no svTouch + the j24 fallback wiring check.
TESTS (reviewer, own runs):
| test | LIVE a96564ad | e70e9e38 | r2 |
|---|---|---|---|
| servant-trust.js (r2 test) | 104/108 FAIL (4: arrival wrapper, j24 fallback, accept svTouch, after-line) | — | 108/108 ×3 PASS |
| servant-trust.js (e70 test) | 100/101 own test; 104/106 MUTATE | 106/106 ×3 | — |
| svt-scan.py | 1 UNWIRED | 0 | 0 (69 sites) |
| greet_check.js | words PASS (new rule); AG-MEET her 0/80 FAIL ×2 | — | same: AG-MEET her 0/80 (meet 8) FAIL ×2, all else PASS |
| dev/test/row26-defect-tap.js (NEW, real taps, real approach chain approachOne, y05 save; Fold 755x1000 + iPad 1180x820, both buttons) | FAIL 6 (svTouch on ARRIVAL ×4, «Đuổi về» touch 1 ×2) | — | 16/16 PASS ×2, 0 dead taps, 0 page errors |
| q-softlock.js alone | — | — | 18/18 PASS |
| oldsave-r1.js (old = origin/main) | — | — | 16/16 PASS |
| quickcheck.sh HEAD 11be590b | — | — | FAIL: (a) G4-94 q-softlock inside the gate run (alone 18/18 = the known person-view tap flake), (b) time-spill guard «greet inside offered null» — FLAKE ON LIVE TOO: base a96564ad 3/10 FAIL, e70 2/4, r2 2/4, same line, SEED=7 yet timing-dependent. Not this change. All other gates PASS (G1–G3, G4 webkit/odds/coop/mk/manifest/npc-purpose/dialog/dead-card/button-crawl/look-dedupe/press-keep/kit-std/noise). |
Shots looked at 3× (scratch, not in git): /home/user/wt/r26-shots/{fold,ipad}-{duoi,thu}-{1-card,2-after}.png — kit thẻ gỗ hand «Thu làm tai mắt / Tốn Bạc 20» «Đuổi về / Tốn không»; after: kit KẾT QUẢ «Được Tai mắt +1 · Mất Bạc −20» / «ta không được gì, cũng không mất gì».
TICKETS (not blockers, all pre-existing on LIVE): T1 greet_check AG-MEET: NPCs approach her 0× in 80 buổi (LIVE same) — AG-MEET owner. T2 time-spill guard runtime «greet inside» flake ~30 % on LIVE (test harness timing; owner time-spill). T3 «Đuổi về» result says «không mất gì» while the top bar shows «Bạc −6» (LIVE identical, same −6 on «Thu» = 20+6): an unexplained −6 bạc on answering the card (law 3 / law 7 wording) — find its source. T4 j24 svDefect fallback fx bac:-20 literal (law 4), dead path while jtsb finds the victim.
LAND READY review/row26-talk-r2 8f62a546a0a18d9c520d220180f1b53c3d9aed18 (BIG; rules; on LIVE a96564ad; Worker deploy: no).
