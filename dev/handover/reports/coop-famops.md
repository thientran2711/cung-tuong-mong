# coop-famops — co-op friend-act item ops move THAT piece, by identity (E44, opus BIG, FOREMAN E #26)
PRIORITY #1 CHECK ('famApply|famDiff|b4Ops|RMHOW|loLose|jcoopworld'): OD 8 (law 6c) | main jcoopworld.js:476 «ret», :490 famDiff «rm» | review/* review/jlost-kyngo 2fa2e667 (E42, base of this branch; unchanged on origin at 11:20Z), review/dresscode-fix-r4 (E30d, scan reused) | claims: this row only (E44).
Branch review/coop-famops FROM review/jlost-kyngo 2fa2e667 (E42's one owner change reused: loCaseOf / lostReturn / loKeepBy / loLedgerBack; no second owner-change path).
Head: see «STATUS» at the end. Files: dev/build/jcoopworld.js (+ site build), dev/test/coop-lost-scan.js (E42's scan + COOP_FAM driver), NEW dev/test/coop-famops-unit.js.

## Root cause (law 6c REAL OBJECTS, law 1 TWO-WAY)
1. famApply «rm» (target seat): `itemAt` = slot ci, else «any piece of that kind» → another trâm spliced out, the stolen one stayed (her worn one
   was never in her entry's bag → host had a copy AND she kept hers). A loLose that made no case left `indexOf(e) = -1` → `splice(-1,1)` = her LAST piece gone.
2. famApply «ret»: found her case by kind + «friend holds it», pushed `c.e` (or a bare {k} stub) whatever was already home → 2nd copy (worn trâm).
3. Guest case for a piece the friend took: loLose keep:1 → loKeepBy refused (no live holder copy on this seat) → case stayed «lost» = the piece
   counted in the case AND in the thief's real chest; later «found» to Nội vụ phủ → 2 real copies (coop-lost-scan COOP_FAM before: dup).
4. The week end runs withoutFriend → jlost loWeek read every case OWNED by the friend as «owner gone» (done «mat») one week after each theft:
   the thief's «Lén trả lại» / «Trả lại» vanished from Tư trang › Việc (two-way road gone).
5. «Lén trả lại» / «Trả lại» / a hearing / a holder's death OUTSIDE an act put the piece into the friend's ENTRY (a copy of her chest): nothing
   reached her seat (thief's chest −1, her chest +0 = vanish), and the thief's jil census netted it.

## Fix — every co-op friend-act item op, one rule (jcoopworld.js)
| # | op / road | before | after |
|---|---|---|---|
| 1 | «rm» (my acts on her: laydo/laydol/phonghoa/batnat/uyhiep/tieuhuy/…; host NPC acts on her entry b4Ops) | slot ci, else any piece of the kind | sender adds `iu` (ledger id); famItem: that id in her chest OR worn trâm/áo (taken off, famOff); no id (old room): same slot + same kind only; no match = nothing moves (CW.famMiss + console.warn) |
| 2 | «rm» lost, loLose makes no case | splice(-1): her last piece | famOff removes exactly that piece |
| 3 | «rm» lost, her case | «lost» when no live holder copy | held by the thief (by/at = his key) |
| 4 | «ret» (Cài đồ onto the owner; any lost piece an act hands back) | kind + friend holds it; copy pushed always; {k} stub | famRet sends `iu` + the piece; famBack: her case by id (old room: the friend's case), holder copy on this seat removed, ONE copy via lostReturn(lo-marked) — none when the id is already hers (chest/worn/pawn/ledger box); no case: the real piece once, never a stub |
| 5 | «add» (host NPC gives / returns to her entry) | always pushed | id already hers → none; id of her open case → the return (famBack) |
| 6 | «plant» | always pushed | id already hers → none |
| 7 | lostReturn to the friend's ENTRY outside an act (Lén trả lại, Trả lại, nộp, hearing, holder dies…) | piece stayed in the entry copy (vanish) | hook: «ret» op to her seat (b4Send) + jil ilSent «sang hảo hữu»; inside an act the act's own diff sends it (famIn/famBk), inside a host NPC turn b4Ops «add» (b4in) |
| 8 | loWeek on cases owned by the friend | closed «mat» (owner gone) every week end | wait (her seat keeps her side); expiry still ends them |
Not changed: gifts (res.items → «Quà tặng», jil ilSent), kids/preg/art ops, pets (petApply), thin L6 rooms (famApply runs on the host in her context; the hook skips CW.ctx).
No new number (law 4), no new player word (the «ret» line is the old one).

## Scans (before = review/jlost-kyngo 2fa2e667, after = this branch; same scan file)
coop-lost-scan.js (E42) + COOP_FAM=1 driver (default on): each week on BOTH seats — she may first put on a piece from her chest (B), I steal from the
friend's entry (laydo/laydol), I hand back what I hold of hers (Cài đồ onto her / Lén trả lại / Trả lại), a host NPC steals from her entry. Census: host world + guest's own S by ledger id.
| run | before | after |
|---|---|---|
| 20 wk smoke | 2 pieces dup (17 piece-weeks: host chest + guest case «lost») | (first fix) 1 dup same shape → fix 3 |
| 12 wk | — | 0 dup · 0 vanish · net 0 |
| 76 wk default | RUNNING | RUNNING |
| 76 wk COOP_SWAP=1 | — | TODO |
| 76 wk COOP_SKEW=24 | — | TODO |
| coop-dresscode-scan 76 wk (r4 + this, tmp merge, not pushed) | E30d: guest trâm dup/vanish | RUNNING |

## Gates
| gate | result |
|---|---|
| coop-famops-unit (NEW, 13 checks) | PASS 13/13 |
| one-core-guard | PASS (fails 0) |
| kyngo-unit | PASS |
| lost-items 755x1000 | 44 bool checks identical to 2fa2e667 (diffs = random names/ids only) |
| quickcheck + old save | TODO |
| coop-e2e 92/92 | TODO |
| coop-b1 (famApply's own test) | TODO |
| role-parity ×2 (alone) | TODO |

## HANDOVER (if rolled)
Worktrees: /home/user/wt/famops (review/coop-famops), /home/user/wt/famops-base (2fa2e667 + new scan, for «before»), /home/user/wt/famops-dc
(tmp/famops-dc = this + review/dresscode-fix-r4, LOCAL ONLY, never push), /home/user/wt/famops-ho (handover). Logs /home/user/wt/fo-out/*.log.
Local servers: python http.server 8744 (famops root) / 8745 (base root) for kyngo-unit / lost-items / unit test.
Left: finish the scan rows above (76 wk default, SWAP, SKEW, dresscode), gates TODO, fill STATUS, FOREMAN_E_STATUS line, send_message FOREMAN E #26.

## STATUS
WIP.
