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
