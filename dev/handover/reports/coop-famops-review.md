# coop-famops-review — E44r (opus BIG co-op reviewer, session_01DgYSWkYVK6ksd1qvq815dc, depth 2) · FOREMAN E #29 · 21/11
PRIORITY #1 CHECK ('famApply|famDiff|b4Ops|loWeek|jcoopworld'): OD 8 (law 6c) | main jcoopworld.js «ret» / famDiff «rm» | review/coop-famops a211fcf0 → 6b11f8fa (base jlost-kyngo-r1 8527f09c, in LIVE), review/dresscode-r4-land 0620c318 (scan reused) | claims E44 / E44b.

Heads reviewed: round 1 a211fcf0 (E44 SSK); round 2 24196bf0 → 6b11f8fa (E44b: same code + site build + merge LIVE 0faf7a05).
PASS sha: review/coop-famops-r 8b3aee536f4515ed236e4ec784e97c6011d8441a = 6b11f8fa + merge LIVE d0f75fa4 (8486dbd9) + re-merge LIVE e804edfc (only index.html / sw.js conflicted each time → rebuilt by build_site.sh; assets.json kept = LIVE). jcoopworld.js: all LIVE hunks kept (incl. palace-life-gaps co-op heir code) + exactly the branch hunks (change set vs LIVE identical to the branch's own diff, checked by hash). vs LIVE: 5 files — dev/build/jcoopworld.js, dev/test/coop-famops-unit.js, dev/test/coop-lost-scan.js, index.html, sw.js.

## Code read (jcoopworld.js, all of the diff)
famItem / famOff / famCase / famBack / famRet(+alt ids) / famLostCase / famSweep / lostReturn hook / loWeek wrap / loEntry kind guard / b4Send host guard.
rm by ledger id (worn trâm/áo included); no id = same slot + same kind only; no match = nothing moves (famMiss, console only). ret/add close HER case by any id of the piece, once; plant/add of an id already hers add nothing. Gifts (res.items), pets, kids untouched; thin L6 famApply on the host in her context unchanged.
Laws: 1 two-way + 6c — fixed roads both seats (scans below); 4 one core — no new number (core gates PASS); 7 — no new player word.
Nits (no fix needed now): (n1) famSweep RET lacks «kyngo» (jky Mang trả): the host also sends «gone» after the «ret» → guest famMiss "gone: no open case" only. (n2) famCase kind fallback for a «ret» whose ids all miss picks the first same-kind case the friend holds — wrong case only if she has 2 same-kind pieces held by the friend AND an id split.

## Round 1 (a211fcf0) — found, fixed by E44b
| # | scan | fault | root | fix (E44b) |
|---|---|---|---|---|
| A | seed 4242 default: dup 10000054 (host chest + her case lo2); SKEW: dup 10000073 | rm of a piece that on her seat already sat in HER own open «lost» case → famItem «not hers», nothing moved | famLostCase: case held by the thief / «mất dấu», routed (ba28d7d4) |
| B | seed 4242: vanish 1073, 144; SWAP: vanish 399, 1571 (host case «held at 902» forever) | the guest's lostReturn hook called b4Send, which on the guest went into thin-D D.resTo (no host() check) → the «ret» never left her seat | b4Send `dOn()&&host()&&…` (24196bf0) + ret alt ids + kind fallback + famMiss on no-case push (ba28d7d4/56850f9f) |
| C | E44b SWAP w4 dup 31 + vanish | loEntry matched her case to a host-numbered lo mark of another kind | loEntry kind guard (263304f5) |

## Before / after (same scan, seed 4242, 76 wk)
| build | dup pieces / piece-weeks | vanish pieces / piece-weeks |
|---|---|---|
| base 8527f09c (my run) | 3 / 26 | 8 / 72 |
| LIVE 0faf7a05 (E44b) | 0 / 0 | 2 / — (closed «mat» then «sang hảo hữu», never on her seat) |
| a211fcf0 (my run) | 1 / 2 | 2 / 18 |
| 24196bf0 (E44b) | 0 | 1 (shape c, below) |
| 24196bf0 + LIVE 8c829c67 (my run) | 0 to w65 (OOM-killed) | 0 to w65 |

## Gates
| gate | where | result |
|---|---|---|
| coop-famops-unit | 8b3aee53 / 8486dbd9 | PASS 21/21 |
| coop-e2e (LIVE suite, both seats) | 8b3aee53 / 8486dbd9 / c53f4993 / 153a1e34 | 124/124 ×4 |
| coop-b1 | 8486dbd9 | 43/43 (LIVE 38/43: its laydo-case fails are what famops fixes) |
| quickcheck + old save | 8b3aee53 | PASS (197 s, old save ok, perf ≈ live, core gates PASS); 1st run FAIL on one perf outlier only (longTaskMax 3650 vs 2070, medians = live) → rerun PASS. Also PASS on 8486dbd9, 153a1e34 |
| coop-lost-scan default 76 wk | c53f4993 (24196bf0+LIVE) | 0 dup / 0 vanish to w65 (box OOM killed the page at w65) |
| coop-lost-scan COOP_SWAP | c53f4993 | 0 / 0 to w55 (OOM); 153a1e34 (a211fcf0) 76 wk: dup0 van2 = fault B (fixed) |
| coop-lost-scan COOP_SKEW=24 | c53f4993 | 0 / 0 to w53 (stalled: harness dialog «Tiếng khóc ở Trường Môn viện», pre-existing) |
| coop-dresscode-scan COOP_DBG=1 both seats | a211fcf0+dresscode-r4-land | 88/88, 0 persistent (E30r4 guest B1/B3 famApply cases gone) |
| same | 24196bf0+dresscode-r4-land | 0 persistent to w65 except 1 (B3 trâm w53): host event «Nội vụ phủ…» on her entry seized it; famApply «gone» mirrors it correctly — the seizure itself puts the piece nowhere on the host (pre-existing, not famops; FOR MAIN below) |
| kyngo-unit | 153a1e34 | PASS |
| lost-items 755x1000 | 153a1e34 vs LIVE | 44 bool checks identical |
| role-parity ×2 (alone) | 8486dbd9 | ALL PASS ×2 |
Stall «Chờ hảo hữu…» seen on base 8527f09c too = pre-existing harness/sync (not famops).

## Open (follow-ups, not blocking)
- (c) E44b: a host piece held by her, returned on her seat while the owner's entry is pulled out → ilGone into HER box → sold → bought by a host-NPC copy: fix on review/coop-famops-c 7e13e936 (separate review).
- FOR MAIN: a host event «Nội vụ phủ…» that takes a piece from a consort leaves no ledger line / box (law 6c, owner question like E30r4's j8 giveTo note).

## VERDICT
PASS 8b3aee536f4515ed236e4ec784e97c6011d8441a (base LIVE e804edfc). Strictly better than LIVE on law 6c / law 1 (before/after table), no regression on any gate, both seats. Follow-ups: (c) review/coop-famops-c2 (E44b), FOR MAIN Nội vụ phủ seizure note, nits n1/n2.
Shots: none (no UI change; no CDN review folder used).
