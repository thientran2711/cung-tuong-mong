# E53r — BIG co-op review of review/coop-famops-t2 (N17 rest) — reviewer session_01DgYSWnXUrXsk75X7QMXWtm (depth 2, opus)
PRIORITY #1 CHECK (brief E53r, prio1 "coop-famops-t2|kyngo"): OD 2 (owner first-try codes, not this) | ledger 0 | claims = E44i→E44j→E44k rows + this row | main: t1 landed 2ba6c64e; LIVE now 225c5c08 | review/* = review/coop-famops-t2 (5020f618) | precedent reused for my fix: jkcco RQ relay queue (jkcco.js:68 `COOP.on("room",()=>{RQ.length=0;rqLoad()})`).

Reviewed **5020f618** (verified on origin; LIVE f7016b8d ancestor). Final branch **review/coop-famops-t2-r dbbbf3c6c45943dac8744a8f1820c52fdb2fb28c** = 5020f618 + my 2 review commits + merge LIVE 225c5c08 + merge LIVE 72521d62. **VERDICT: PASS dbbbf3c6** (LIVE 72521d62 ancestor).

## Review fixes (mine, small; on -r)
| # | finding | fix | unit |
|---|---|---|---|
| R1 | F1 res outbox (new in -t2) was not room-keyed in memory: CW.rq survives `leave()` → `join()` of another room on the same page; `COOP.on("room")` only merged the new room's saved items and `rqFlush(true)` re-sent the OLD room's unacked «res» into the NEW room (its «add» lands in another friend's world = a piece from nowhere, law 6c); rqSave also wrote old-room items under the new key | each entry carries its key (rk = room+seat); rqLoad keeps in memory only this key's entries, rqSave/rqFlush skip other keys; the old room's entries wait in localStorage under their own key and go out when that room is back (same as the jkcco RQ precedent) | **35** (FAIL on 5020f618 / LIVE → ok) |
| R2 | unit 27 (T9 maidMonthP buyer guard) was vacuous: it PASSED on LIVE (read her silver after `finally` restored it; the maid could take any of the NPC's pieces, so the case looked up was often none) | test only: silver read before restore; e27 is the NPC's only piece | **27** now FAILs on LIVE (her entry = buyer, bac 99961) → ok on -r |

## Units
- coop-famops-unit on 5020f618: 57/57. On -r: **58/58** (×3: 9e8f4dd2, 445d512a, 7d54e3a9 pending in gates).
- Same file on LIVE f7016b8d: FAIL 26, 26b, 27, 29, 30, 31, 32, 33, 34, 35 (each FAIL→ok as briefed; 28 = regression ok both, 26c ok both).

## Law check (18 laws, those touched)
- Law 1 TWO-WAY: actor guards keep her entry a TARGET (NPCs still act on her); (b) gives her seat the same box roads the player has (confW wait / ransom visit) — OK.
- Law 4 ONE CORE: no new number (againW, confSuc, pr from BAL / the box record) — OK.
- Law 6c REAL OBJECTS: every road her piece takes between her entry, host NPCs, host box and her seat checked: (a) b4Mark/npcToFriend no double add; (b) ilask → iltake → ilTake → one «add» (refund only if the piece left meanwhile); T4 famBoxBack «rm gone» only when the piece sits in the answering seat's BOX and not its hands, never for a «gone» (no ping-pong); F1 outbox + seenIds + S.coopRs (old saves without S.coopRs: ok, rsSeen guards). R1 above was the one hole found.
- Laws 7 + 9 KIT/wording: (b) on her seat = the same PEND ilconf / ilback builders (mkP + pushDil), titles «Đồ bị tịch thu» / «Đồ cũ trở về»; dialog text dumped on her seat (solo page, ilask driven) = identical words, odds words only («Nắm chắc»), TỐN/ĐƯỢC/MẤT rows; no new frame, no new word. (Shots at 755x1000 / 1180x820 were covered by the art preload card under load; text checked instead; no shots kept.)
- Law 11 whole family: actor-guard table E44j (c) complete for item roads (j8 rivalsMonth npcMonthly / rivalsTurn judge / maidMonthP, j13 bribe, j20 queenRewards, j40 npcAct, j92 wdAutoFor / wdNpcInit + jhd). Every res road now in the outbox (sendRes, b4Send, iltake/ilrefund). Note (LIVE twin, not an item vanish): rivalsMonth still runs itemMonth for her entry on the host — jeitem.js:41 melts her ice (bangda/bangvun) by the HOST's S.turn (used up, her seat melts it too; harmless double «rm»).

## Scans (76 wk, LOST_DBG=1 SEED=9001, dev/test/coop-lost-scan-traced.js; on 5020f618 dev/index.html)
| run | build | result | traffic |
|---|---|---|---|
| Fold host | 5020f618 | 86/92; **dup 0, van 1 (34 tram_maudon)**; other FAILs = stall rows | A.steal 15 B.steal 17 A.npc 44 plant 21 ui 21 wear 22 |
| COOP_SWAP (iPad host) | 5020f618 | 88/90; **dup 0 van 0**; FAILs = 1 stall row + 1 Worker 502 handshake console line (infra) | A.steal 21 B.steal 13 A.npc 45 |
| CONTROL COOP_SWAP | LIVE f7016b8d | 88/98; dup 0 van 0; FAIL «no host lost case held by a friend entry (max 1)» = the T9 family -t2 fixes; rest stall rows | A.steal 22 B.steal 13 A.npc 43 |
- van 34 «tram_maudon» = **F2 family, LIVE twin (watch item, not a -t2 road)**: NPC 2's piece, w16 Kỳ ngộ «giữ lại» by NPC 3 (ledger [16,34,tram_maudon,lo33,3,«kyngo: giữ lại»] = its FIRST ledger line), case 33 closed «tra» w17, then NPC↔NPC moves (A:4 w18, A:2 w19, A:3 w22, A:2 w23), HDROP w29 from NPC 2 (alive, rank 5), no ledger line, no co-op op either seat (tA/tB rmT/rcv/snd empty). -t2 changes no NPC-only road (every -t2 line is guarded on `.coop` / her entry / co-op messages). Same kind seen on LIVE b238857f (10000275 tram_maudon, E44j T7 row). Code candidate for the F2 fixer (MAIN's review/ky-keeper-f2): jky.js:196 SPEC.item «giữ lại» builds the keeper's copy from the dialog-time case L with no kyLc / state check (the return branch :195 has one) → a case closed or held meanwhile still gets a copy.
- E44k on 5020f618 (its container): 9001 ×2 dup0 van0; SWAP#1 van 2235 (same F2 family); SWAP#2 invalid (B.nofriend 76).
- T2 shape (10000025) / T7: not hit in my runs.

## Final merge
review/coop-famops-t2-r = 5020f618 + 9e8f4dd2 (R1 + R2) + 445d512a (index/sw) + 7d54e3a9 merge LIVE 225c5c08 + **dbbbf3c6 merge LIVE 72521d62**. LIVE deltas (225c5c08: jopic.js, dev/test/*, dev/art/kp23/*, cdn_sync.py, ACTS.json; 72521d62: j79.js, jk3.js, jroute.js + tests/docs) checked file by file: disjoint from the -t2 code files (j8 j13 j20 j40 j92 jcoopworld jhd jil + coop-famops-unit + coop-lost-scan-traced); only index.html / sw.js conflicted → rebuilt (assemble + build_site.sh), assets.json = LIVE byte for byte. No new runtime file → pages_stage.sh untouched.

## Gates (alone; full set on each head)
| gate | 445d512a (base f7016b8d) | 7d54e3a9 (base 225c5c08) | **dbbbf3c6 (base 72521d62) FINAL** |
|---|---|---|---|
| coop-famops-unit | 58/58 | 58/58 | **58/58** |
| coop-e2e Fold host | 141/141 | 141/141 | **141/141** |
| coop-e2e COOP_SWAP iPad host | 141/141 | 141/141 | **141/141** (1st run crashed at step 4 join, no FAIL row = Worker/infra; rerun 141/141) |
| coop-b1 | 44/44 | 44/44 | **44/44** (step 8 passed: no LIVE-twin flake this time) |
| role-parity ×2 | ALL PASS (#1) | ALL PASS ×2 | **ALL PASS ×2** |
| quickcheck + old save | — | PASS (old save ok) | **PASS** (old save ok; 1st run perf-only FAIL buổi 2751/1029, rerun buổi 1089 vs LIVE 3229 = machine noise both ways; core gates PASS both) |

## Ticket lines (for E ROOT-1, not FAILs)
- F2 (LIVE twin): see scans; jky.js:196 candidate.
- Outbox age cap: rqFlush drops an unacked «res» after 30 min (jkcco RQ has no age cap) → a peer away > 30 min loses it (the F1 shape). Watch item; not reproduced.

## Verdict
**PASS dbbbf3c6** → LAND READY (FOREMAN_E_STATUS). No handover needed.
