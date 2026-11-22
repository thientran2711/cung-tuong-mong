# coop-famops — co-op friend-act item ops move THAT piece, by identity (E44, opus BIG, FOREMAN E #26)
PRIORITY #1 CHECK ('famApply|famDiff|b4Ops|RMHOW|loLose|jcoopworld'): OD 8 (law 6c) | main jcoopworld.js:476 «ret», :490 famDiff «rm» | review/* review/jlost-kyngo 2fa2e667 (E42, base of this branch; unchanged on origin at 11:20Z), review/dresscode-fix-r4 (E30d, scan reused) | claims: this row only (E44).
Branch review/coop-famops FROM review/jlost-kyngo 2fa2e667, then MERGED review/jlost-kyngo-r1 8527f09c (PASS base, FOREMAN E #27; merge, no rewrite) (E42's one owner change reused: loCaseOf / lostReturn / loKeepBy / loLedgerBack; no second owner-change path).
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
| 9 | r2: her piece numbered on both seats (her entry got a host id before her own census numbered it) | (r1) id not found → nothing moved (coop-b1 «1 laydo» regression: host +1, her chest +0) | no piece of hers has that id → same slot + same kind; her id kept, the host's rides as `hiu`; every match (rm / ret / add / famWhere / famCase) reads iu OR hiu |
| 10 | r2: the host's side of HER case closes without a return (his chest searched: her xạ hương seized as tang vật; holder gone = mất dấu) | hers stayed «thất lạc» while the piece sat in the host's evidence box (COOP_SWAP run: dup host box + guest case) | host famSweep after every act / buổi / week end: a friend-owned case newly done without a return how → «gone» op; her seat closes that case the same way (by id), the holder copy on her seat leaves, nothing comes home |
| 12 | r2: «gone» on her seat | her census netted the closed case to Nội vụ phủ (dup with the host box) | routed «mất dấu bên hảo hữu» in her ledger |
| 13 | r2: loWeek on MY pieces HELD by the friend (her entry pulled out at week end) | «mất dấu» = vanish | waits like the friend-owned ones |
| 11 | r2: her lost piece leaves MY slots inside a host NPC turn (b4in: hearing / holder move → b4Ops «add») | my census netted it («mkt» net line, COOP_SKEW) | the lostReturn hook routes it «sang hảo hữu» (jil ilSent) when it was in my slots |
Not changed: gifts (res.items → «Quà tặng», jil ilSent), kids/preg/art ops, pets (petApply), thin L6 rooms (famApply runs on the host in her context; the hook skips CW.ctx).
No new number (law 4), no new player word (the «ret» line is the old one).


## Scans (coop-lost-scan.js, E42's scan + COOP_FAM driver, default on; census by ledger id on both seats)
Driver each week on BOTH seats: she may put on a chest piece (B); I steal from the friend's entry (laydo/laydol, up to 4 tries: LIVE theft odds
are hard); I hand back what I hold of hers (Cài đồ onto her / Lén trả lại / Trả lại); a host NPC steals from her entry (host only).
| run | base | dup pieces / piece-weeks | vanish | notes |
|---|---|---|---|---|
| 20 wk | before (2fa2e667) | 2 / 17 | 0 | host chest + guest case «lost» |
| 63 wk (76 killed by timeout at w63) | before (2fa2e667) | 0 | 5 | returns outside acts never reached her seat |
| 63 wk (76 killed by timeout) | after r1 (pre-merge) | 0 | 0 | |
| 76 wk default | after r1 + merge 8527f09c | 0 | 0 | weak traffic (LIVE theft odds) → driver retries added |
| 76 wk COOP_SWAP=1 | after r1 + merge | 1 / persistent | 0 | host's chest searched, her xạ hương seized → fix 10; run stalled w29 (both «Chờ hảo hữu…») |
| 76 wk COOP_SWAP=1 | after r2 (b4e24258) | 0 | 0 | 90/90 PASS, traffic A steal 11 / npc 32 / ui 8 / plant 3, B steal 7 / ui 37 / plant 5 / wear 26 |
| 76 wk COOP_SKEW=24 | after r2 (b4e24258) | 0 | 0 | 90/91: one host net line (her đàn) → fix 11 |
| 76 wk default | after r2 (b4e24258) | 0 | 0 | that run's host life had no friend entry (A.nofriend 76) + one host page error «stip show rkOf null queen» (LIVE stipend code, not jcoopworld) + stall w37 → re-run |
| 76 wk default | r2 (e3282a03) | 2 / 9 | 2 / 20 | (a) her xạ hương seized on the host again, her census netted the closed case → fix 12; (b) MY piece held by the friend read «mất dấu» at week end → fix 13; (c) OPEN: hoadien_bac (host's piece she stole) in her chest AND her box «nvp:dead» (her seat's copy of the host entry carried it when that copy was rebuilt) |
| 76 wk COOP_SKEW=24 | r2 (e3282a03) | 0 | 0 | 91/91 PASS |
| 76 wk default | r2 final (a211fcf0) | 0 | 2 / 9 | 89/90. OPEN: (d) id 555 (host piece held by her since w14, case still «held» = fix 13 holds) gone from her seat at w61, no ledger line on the host; (e) her maitrang handed back by the host at w80 («sang hảo hữu» on his ledger, his case done «nha») never seen on her seat in the last 2 weeks |
| 76 wk SEED=9001 | r2 final (a211fcf0) | 0 | 0 | 88/91 (74 weeks run; 2 stalls w54/w60) |
Stalls «week advanced for both» (both seats «Chờ hảo hữu…»): seen at w29 / w38 / w37 in 3 of 9 long runs, on runs with and without these
changes' traffic; nothing of famops runs in the buổi handshake. OPEN item for the coop-sync owner (not this row).
coop-dresscode-scan COOP_DBG=1, 76 wk (asked by E30r4 via E #28): BEFORE = review/dresscode-r4-land 0620c318 alone: 87/90 — «every lent piece in exactly ONE place»
FAIL (6 persistent, 9 one-week transients) + 2 harness «#next enabled» waits. AFTER = 0620c318 + coop-famops a211fcf0 (local tmp merge, never pushed): 88/88 PASS.
(Earlier r1 tmp merge with r4: 87/90 — the 7 persistent weeks are ONE loan piece A4 kimthoa_phuong (lender v1 → v8, lo:false)
at a host NPC AND in the guest's il.box from w9: a dresscode / jil guest-box matter, not a friend-act op. OPEN item for dresscode (E30d).
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
| coop-famops-unit (NEW, 15 checks) | PASS 15/15 (a211fcf0) |
| quickcheck + old save | PASS (c3d3020e build; core gates PASS, old save ok, perf within live) |
| coop-b1 (famApply's own test, incl. 7b Lén trả lại) | 43/43 (b4e24258); 41/43 (e3282a03: step 8 «Người cùng cung, ngươi không thể ra tay» = both in one palace, room roll) · 43/43 (a211fcf0) |
| coop-e2e | 94/94 (b4e24258; the suite now has 94 checks); 94/94 (e3282a03) |
| role-parity ×2, alone | ALL PASS ×2 (b4e24258) |
| kyngo-unit / one-core / lost-guest-probe | PASS (merged base, r1) |
| lost-items 755x1000 | 44 bool checks identical to base (r1) |

## STATUS
READY FOR REVIEW — review/coop-famops a211fcf0 (base: review/jlost-kyngo-r1 8527f09c merged in, no history rewrite).
Long scans on the final head: SWAP/SKEW (r2 code, 1 commit before final) clean; default SEED=9001 clean; default seed 4242: 0 dup, 2 vanish (OPEN d/e above).
OPEN for the reviewer / next row: (c) her seat's copy of the host entry re-carrying a piece she stole (1 piece, 1 run); (d)/(e) two vanishes in one 76-wk run;
buổi-handshake stalls in 4 of 12 long runs (coop sync, not famops); dresscode loan piece row now clean with this branch.

## HANDOVER (E44 rolls on context, 18:25Z; E44r reviewing a211fcf0)
- Foreman ask (E #29): trace seed-4242 van2 + run seed 4242 on LIVE; trace the hoadien_bac host-entry rebuild dup. Any fix → new head + tell E #29 and E44r (session_01DgYSWkYVK6ksd1qvq815dc).
- RUNNING: LIVE origin/main 0faf7a05 + this branch's coop-lost-scan.js (uncommitted copy) seed 4242, 76 wk, in /home/user/wt/famops-base → log /home/user/wt/fo-out/live4242.log (pre-existing check).
- LEAD for (e) maitrang: host case 144 stolen w79, handed back w80 («sang hảo hữu» on his ledger), never on her seat. res delivery has NO retry:
  b4Send/sendRes put CW.rpend[rid], resWait drops it after 10 s (jcoopworld.js:654), onRes drops when her S.dead / life change; the scan's rejoinB closes
  and reopens B's page. A res lost in that window = a vanish (same for any fam op). Unproven; check the B log around w75 for a rejoin / reload.
- (d) id 555: host piece held by her since w14 (case «held», fix 13 kept it), gone from her seat at w61, no host ledger line — needs her seat's ledger (faults.json has host side only; add B-side __why for ids).
- (c) hoadien_bac: her seat's copy of the host entry rebuilt from the host canon while his «rm» was in flight → carried the piece she stole; the host's death (di vật) then put it into her box «nvp:dead» too.
- Worktrees: /home/user/wt/famops (review/coop-famops a211fcf0, clean), /home/user/wt/famops-base (detached LIVE, scan copy), /home/user/wt/famops-dc (detached; tmp branches deleted, nothing pushed), /home/user/wt/famops-ho (handover). http servers stopped.
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

## E44b (depth 2, session_01DgYSWpsqWVG7nn7zh9VgW3) — r3, 21/11 19:15Z
PRIORITY #1 CHECK ('famApply|rpend|resWait|coop-lost-scan'): OD 8 (law 6c) | main jcoopworld.js:654 resWait | review/coop-famops a211fcf0 | claims E44 → E44b.
| run | base | result | dup | vanish | notes |
|---|---|---|---|---|---|
| seed 4242 76 wk | LIVE 0faf7a05 (+branch scan) run 1 | stalled w9 (host dialog the harness never closes) | – | – | killed |
| seed 4242 76 wk | LIVE 0faf7a05 run 2 | 87/93 (stall w66: guest dialog «Tiếng khóc ở Trường Môn viện» unanswered) | 0 | **2** (10000098 sonthuy, 10000088 remchau) | PRE-EXISTING: her case closed «mat» at week end while the host held it, then host ledger «sang hảo hữu», never on her seat = root causes #4/#7 this branch fixes |
| seed 4242 76 wk LOST_DBG | a211fcf0 (my box, 2 scans parallel) | 90/92 (2 harness «#next» waits) | 0 | 0 | famMiss 8 |
| seed 4242 76 wk | a211fcf0 (E44r box, 3 parallel) | 88/90 | 1 (10000054) | 2 (1073, 144) | E44r leads A / B → r3 |
Lead (e) (res no retry): the scan's rejoinB is defined but never called (no page reopen); in thin-D the host→guest res goes D.resTo → D.later → patch queue D.PQ kept until «pack» ack and re-sent in hostView — not the 10 s rpend drop. Unproven; no change.
r3 fixes (ba28d7d4, jcoopworld.js):
| # | road | before | after |
|---|---|---|---|
| 14 | «rm» whose id sits in HER own open «lost» case (no holder) — the host's copy of her entry was a step behind | famItem null → famMiss «not hers», nothing moved: piece in the host's chest AND her case (dup 10000054) | famLostCase: case held by the thief (how lost, as fix 3) or closed «mất dấu bên hảo hữu» (other roads); her census routed (ilLog, I.at cleared) |
| 15 | «ret» when the piece and the sender's case carry different ids (a census renumbered one) | famCase matched o.iu only → host case orphaned «held by 902», piece pushed under the other id (vanish 1073 / 144) | famRet sends alt = hiu + ids of the sender's case (lostReturn hook, WeakMap FA); famCase / famBack match ANY id; a ret pushed with no case logs famMiss |
(d) faults.json now carries both seats' __why (why = host, whyB = guest).
(c) hoadien_bac host-entry rebuild: not reproduced in 3 seed-4242 runs this session; not changed.
Gates on ba28d7d4: unit 19/19 · others running (see STATUS lines).

### E44b r3 final (20:20Z)
| # | road | before | after |
|---|---|---|---|
| 16 | jlost loEntry on co-op: the seats number cases on their own; her copies of the host's people carry HIS lo marks | her case 1 (lxma2) took host case 1's lxson2 (iu 31) as holder copy: census synced c.e.iu / c.at → ret closed onto it (SWAP w4 dup 31 + vanish 10000012) | a piece of ANOTHER KIND is never a case's holder copy (no entry, c.at kept) |
| 17 | b4Send from the GUEST (lostReturn hook) | dOn() → D.resTo ran the «ret» locally on the guest: host case stayed «held by 902» (SWAP vanish 399 / 1571; root found by E44r) | D.resTo on the host only (as sendRes); the guest's res goes COOP.send → host onRes |
Heads: ba28d7d4 (14, 15) · 56850f9f (15 kind fallback, asked by E44r) · 263304f5 (16) · 24196bf0 (17) · 4d16236d (site build) · **6b11f8fa merge LIVE 0faf7a05** (G1 frozen list 3930 > LIVE 3592 before the merge).
| gate | result |
|---|---|
| coop-famops-unit | 21/21 (6b11f8fa) |
| coop-e2e (LIVE suite) | 124/124 (6b11f8fa); 94/94 (24196bf0, old suite) |
| quickcheck + old save | PASS, core gates PASS (6b11f8fa) |
| coop-b1 | 43/43 (56850f9f; ba28d7d4 39/43 = laydo picked a used-up «Than liễu», no case by design) |
| role-parity ×2 | ALL PASS ×2 (4d16236d) |
| 76 wk COOP_SWAP | 24196bf0: dup0 van0 (88/90: 2 traffic FAILs, LIVE theft odds) |
| 76 wk seed 4242 | 24196bf0: dup0 van1 (148 vongvang = (c)) |
OPEN (c) → follow-up branch review/coop-famops-c 7e13e936 (from 4d16236d): ilGone wrapper — a piece OWNED by the friend leaving me with no live owner entry (her entry pulled out at week end) goes to her seat as «ret» + ilSent, never into MY box «di vật» (148: her box nvp:dead w35 → sold → bought by a host-NPC copy). unit 22/22; seed 4242 76 wk running.
### E44b (c) follow-up result (20:40Z) — NOT READY
review/coop-famops-c 7e13e936, seed 4242 76 wk: 89/91, dup 0, vanish 3 (1173 tuan, 576 kinhvv, 1182 wkb_mua_s4). Host pieces held by her (host cases 31/25/35 «held at 902»); on HER seat seized as tang vật («me → cct evid» w19–26) → «tang vật trả kho» → «bán lại» → bought by a host-NPC copy; the host case never learns. -c covers only how=dead.
LEAD (whole group, law 11): every ilGone of a FRIEND-OWNED piece into my ledger box (evid / conf / sell / pawn / fix / dead …) must reach the owner seat: «ret» when it comes back to her, else a «gone» op so the owner's case closes «mất dấu» while the piece stays in the taker's box (the mirror of fix 10; famSweep is host-only today). Worktrees: /home/user/wt/famops (6b11f8fa), /home/user/wt/famops-c (-c), logs /home/user/wt/fo-out.

## HANDOVER (E44b rolls on context, 21/11 22:15Z) — row = review/coop-famops-c2 (whole (c) group), foreman E #30, reviewer E48r
- Head review/coop-famops-c2 6909e22c1 = 720381ab (c) whole group on 6b11f8fa + merge LIVE e804edfc + merge LIVE 04afaeb7 (coop-cyhold hunks auto-merged). review/coop-famops-c 7e13e936 is STALE (force-push refused) — ignore.
- c2 rule (jcoopworld.js, ilGone wrapper just above famApply): friend-owned piece = box own === fp() OR e.gh === fp() OR loCaseOf(e).own === fp(); how «dead» → famRet «ret» + ilSent (my case closed «nha»); other box roads → g0 runs (piece in MY box), own cleared, my case closed «matdau» (c.__fs, famSweep skips), «gone» {iu, alt} sent. Unit 23/23 (16, 16b).
- 76 wk on 6909e22c1 (3 scans parallel, logs /home/user/wt/fo-out/cw-*.log):
  | run | result | dup | vanish |
  |---|---|---|---|
  | COOP_SWAP | 88/90 | 0 | 1: id 248, HOST case 56 own 4 (NPC) at 1, «tra» w65 → nowhere. SUSPECT: wrapper's e.gh test (stale gh === 902 on an NPC↔NPC return with owner not live → «dead» → sent to her). Try: require e.lo for the gh test, or drop gh and use only box own / loCaseOf |
  | COOP_SKEW=24 | 89/95 (1 stall w51) | 0 | 3: 10000274/275/320 — NPC→NPC «cướp» cases (own NPC, matdau) on HER seat over host-NPC copies, ids numbered on her seat; never counted. Check whether LIVE 04afaeb7 (or e804edfc) makes the guest run NPC robberies on copies (not famops) |
  | SEED=4242 | 81/98 (B.nofriend 76: guest never had a friend entry; stalls w0/4/8/25/30/53/55) | 0 | 2: 10000637 (her piece home «nha» w58 then her case 22 held by host NPC 6 → «matdau» w62), 10000706 (NPC 6 → 3 «cướp» on her seat) — run degenerate, rerun |
- NEXT (E44c): (1) CONTROL: same 3 scans on LIVE 04afaeb7 + coop-famops (E48r's re-land 8b3aee53, or 6b11f8fa merged with 04afaeb7 locally) WITHOUT c2 → splits LIVE vs c2. (2) fix the gh suspect (248). (3) if SKEW «cướp» shape is in the control too → report as LIVE/other row, not c2. (4) gates: unit, seed 4242 + SWAP + SKEW 76 wk dup0/van0 for the (c) family, coop-e2e 124, quickcheck + old save, role-parity ×2 → SSK to E #30 (session_01DgYSWn34K38PMxUZdZc9yb) AND E48r (session_01DgYSWpBzP3A6Bn8pRU8jcw); line in FOREMAN_E_STATUS.md.
- Worktrees (E44b container only — successor starts fresh): /home/user/wt/famops (review/coop-famops 6b11f8fa), /home/user/wt/famops-c (review/coop-famops-c2 6909e22c1). Run scans max 2–3 in parallel (4 cores; stalls rise with load). Unit needs URL arg http://ctm.local/ (coop-serve route).

## E44c (depth 3, session_01DgYSWpbxnb51GjUhBoeY8R) — CONTROL split + E48r guard, 21/11 23:55Z
PRIORITY #1 CHECK ('famApply|ilGone|famSweep|coop-lost-scan'): OD law 6c | main 87ac1ff4 (coop-famops LIVE, contains 5341fe36) | review/coop-famops-c2 6909e22c1 → 840b1e54 → eaebce79 | claims E44b → E44c.
Heads: 840b1e54 = c2 + merge LIVE ea112384 · 8f… fix commit (E48r ask: «dead» branch gated by jil's own guards ilAt / ilToFriend / ilDur, unit 16c) · **eaebce79** = + merge LIVE 87ac1ff4 (generated-file conflicts only; diff vs LIVE = jcoopworld.js +21, coop-famops-unit.js +13).
76 wk coop-lost-scan, LOST_DBG=1 (3 in parallel per batch; SWAP/SKEW use the default seed 4242; 9001 replaces the degenerate default-4242 run):
| run | CONTROL 5341fe36 (LIVE ea112384 + famops, NO c2) | c2 840b1e54 (no guard) |
|---|---|---|
| COOP_SWAP | 3 FAIL: vanish **116** + 10000274; stall w30 | 82/104: degenerate (B.nofriend 76) + stalls w37/w57; dup 86 (pre-existing shape P1) |
| COOP_SKEW=24 | 89/94: vanish 3119; stall w73 | **91/91** dup0 van0 |
| SEED=9001 | dup 55 (pre-existing shape P1); stip show page error (LIVE) | **90/90** dup0 van0 |
Split:
- **116 = the (c) shape, PRE-EXISTING on LIVE, closed by c2**: host piece (host case 12 own me, held at 902) seized on HER seat as tang vật → «trả kho» → «bán lại» → bought by a host-NPC copy; host case stays «held at 902».
- **248 (E44b's c2 SWAP vanish) not reproduced**; code reading: lostReturn always loClean()s the piece (gh dropped), so the wrapper's gh test never fires on an NPC↔NPC «tra»; gh is only kept on census di vật (jil:101) and planted pieces (gh = the planter = whose piece it was). No change to the gh test.
TICKET (pre-existing, NOT c2, not this row — guest seat runs NPC item roads on its COPIES of the host's people):
- P1 dup (55 control, 86 c2): her seat's copy of host NPC 2/4 «sells» a piece (host id) → HER box mkt:sell, while the real piece stays at the host NPC.
- P2 vanish (10000274 control; E44b's SKEW 10000274/275/320): NPC→NPC «cướp» case opened on HER seat over host-NPC copies (ids numbered on her seat), never counted.
- P3 vanish 3119 (control SKEW): host Kỳ ngộ «giữ lại» by NPC 1 (lo103) then gone, host side only.
Owner for P1/P2: coop world (thin guest must not run NPC economy/loLose on copies); P3: jky/jlost.

### E44c c2 SẴN SÀNG KIỂM — review/coop-famops-c2 f766a052 (22/11 ~01:20Z)
Commits since E44b 6909e22c1: 840b1e54 merge LIVE ea112384 · 5349479e «dead» branch gated by jil's guards ilAt / ilToFriend / ilDur (E48r ask) + unit 16c · eaebce79 merge LIVE 87ac1ff4 (coop-famops landed) · **f766a052** merge LIVE 02c6d8f4 (bongloc-options). Diff vs LIVE 02c6d8f4: dev/build/jcoopworld.js +21/−1, dev/test/coop-famops-unit.js +13 (+ generated index.html/sw.js). No new number, no new player word.
| gate | result |
|---|---|
| coop-famops-unit | 24/24 on f766a052 (16c FAILs on the code without the guard: «ret» sent) |
| quickcheck + old save | PASS on eaebce79 and on f766a052 (core gates PASS). One run on f766a052 failed G4 coop-one-world while 3 heavy jobs ran in parallel; the rerun alone PASSed = load flake |
| coop-e2e (LIVE suite) | 124/124 on eaebce79 and on f766a052 |
| coop-b1 | 43/43 (eaebce79) |
| role-parity ×2 | ALL PASS ×2, logs byte-identical (eaebce79) |
| 76 wk COOP_SKEW=24 | eaebce79: 91/92 dup0 van0 (1 harness «#next» wait) · 840b1e54: 91/91 |
| 76 wk SEED=9001 | eaebce79: dup 118 (P1) + 246 (P4), van0 · 840b1e54: 90/90 |
| 76 wk COOP_SWAP | eaebce79: van 270 (P3) + 10000341 (P2), stall w40 · 840b1e54: degenerate (B.nofriend 76) |
The (c) family (a friend-owned piece leaving the holder through the box rule) is clean in all 6 c2 runs. Control (no c2) showed it: 116. Every leftover fault has a shape the CONTROL also shows, except P4, which the wrapper cannot reach (owner = NPC):
- P1 dup (control 55; c2 86, 118): her seat's copy of a host NPC «sells» (agent cx3:sell → sellItem → ilGone sell) a piece with a host id into HER box mkt:sell; the real piece stays at the host NPC.
- P2 vanish (control 10000274; c2 10000341; E44b 10000274/275/320): ilRob «cướp» NPC→NPC on HER seat over copies → a case in HER S.lost (own NPC), closes «matdau», never counted.
- P3 vanish (control 3119; c2 270; = E44b's 248): host Kỳ ngộ «giữ lại» by an NPC (holder of an NPC-owned case) → case «tra» → the piece is nowhere. Host side only.
- P4 dup (c2 246, one run): host NPC 3's case «riv» held by the friend entry (her seat has the piece, lo99) while the host confiscates a piece with the same id from NPC 3 («conf» into nvp box), so NPC 3 kept a copy on the host.
NEXT (order E #30): P1–P4 on NEW branch review/coop-famops-p (from LIVE / on c2), whole group, CONTROL vs fix tables.
