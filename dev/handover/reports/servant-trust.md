# SERVANT-TRUST — every act toward another person's servant has a relationship effect (Foreman D, worker session_01D3E3NYMzUyzf9KBhvBCtFW, 24/11)

PRIORITY #1 CHECK ('lòng tin cung nữ nghi ngờ chủ tử khác' / 'svTouch' / 'chủ tin' / 'bất kính chào chủ tử'): OD rows 24/11 ~07:58Z, ~08:08Z, ~08:12Z real (verbatim, read in full) | ledger 0 | claims: none | main ac4790f0: none — REUSED: «Chủ tin» per servant (jtin.js tinOf/tinAdd, kit bars «<chủ> tin cậy» already on every servant card), ownerOf (j10), affAdd/oanAdd/evA + deedCap (jtruth: proof only up to real deeds), greetName (jgreet, the ONE greeting function), servant nết via netQ/nq, servDo "doi" | review/*: none.
Order: FOREMAN_D_STATUS «ORDER FROM MAIN 119 (24/11 07:58Z)» → brief dev/handover/briefs/D-servant-trust.md. PLAN line posted first (FOREMAN_D_STATUS, b26c549f).

Branch **review/servant-trust** from review/net-build ed1be95a. Commits 7e578d16 (build) · 42db050c (one-core khắc, last two family sites). **Final sha 42db050c4451e6521fcc357911862511cda31058.**

## 1. What was built
**ONE function for the whole family — `svTouch(actor, servant, kind)` (new dev/build/jsvt.js, assembled after jagwhy1.js).** Runs only when the servant really ENGAGED (talked / took the bạc / took the threat / became eyes). Same code for her, the NPC and NPC↔NPC (law 1); a servant who acts does it for her own master (svtWho).
- **Her master may come to know** (roll `svtSeenO` = BAL.svt.seen: base + master's eyes × eye + near when the master stands at the same place − covert for bribe/threat/tm/plot/friend): **Chủ tin** in that servant drops (`tinAdd`, the existing jtin store; per kind BAL.svt.tin) and the master's **thiện cảm toward the one who went behind her** drops (`affAdd`, per kind BAL.svt.rel).
- **The servant may let slip a REAL secret** (law 6a): only when the master has schemed / done a deed since this servant's last slip or keeps a tư tình, and only while `deedCap(master) > chứng cứ already held` → `evA(asker, master, BAL.svt.leak.ev)`. No secret → no chứng cứ (test). Odds BAL.svt.leak: base + (100 − lòng) × loyK + Nhiều lời / Tham + / Trung −.
- Once per asker × servant × kind × buổi (wrappers never stack).
**The open talk — `svTalk(actor, servant)`** (new act, the brief's «another master talks to HER servant»):
- **Refusal first** (OD 08:12Z): odds `svtRefO` = BAL.svt.ref: base + (lòng − 50) × loyK + (Chủ tin − 50) × tinK + nết (Trung / Nhát + ; Nhiều lời / Tham −), clamped [5, 90]. Refused → **nothing changes at all** (test), her line: «… cúi đầu thưa: phận tôi tớ cung …, không dám nói chuyện riêng với người cung khác.»
- Talks → her gain: she learns one nết of that master (learnTrait, no double notice) or «chỉ kể những chuyện ai cũng biết»; then svTouch(…,"talk") (suspicion + possible slip).
- Her buttons (KIT parts only — the same `pbtn` group of the servant card j15 «Giao thiệp», the same row button of the staff list j10 «Kẻ hầu cung khác»): **«Hỏi chuyện» · BAL.svt.k khắc**. No odds word, no warning of what follows (OD 08:08Z); the consequence shows only after, in words.
- NPC side (law 1): each month every NPC mistress may (BAL.svt.npc.talk) have a servant of her target talked to — HER servants included; she is told after only when it reaches her («Có kẻ bẩm: … kéo riêng … ra nói chuyện, … không từ chối. Từ đó ngươi bắt đầu nghi …»).
**BẤT KÍNH (OD ~07:58Z)**: an OPEN talk with a servant while her master stands at the same place (agent record knAt, same khắc) and was not greeted this buổi → master's oán + (BAL.svt.greet.oan) and thiện cảm − (greet.aff), × 1.5 when the master outranks the speaker, × .5 when below. Both ways: «X đứng ngay đó mà ngươi không chào, lại gọi thẳng Y — X cho là ngươi bất kính.» / «X chẳng chào ngươi một tiếng mà gọi thẳng Y — thật là bất kính.» Greetings are remembered per buổi by wrapping greetName (every greeting site). Covert acts (Mua chuộc, Dọa tố, Cài tai mắt, j70 plots) skip the greeting but are seen less (test).
**A low Chủ tin has a REAL effect**: an NPC master returns a servant she trusts under BAL.svt.tin.out to Nội vụ phủ (servDo "doi", BAL.svt.tin.outRoll a month); her own she decides herself (Đổi người). Whole-group fix found on the way: the jtin trust gate on the sent servant (`bestSent`: Chủ tin ≥ BAL.tinLv.send) was bypassed for HER by the j70 busy wrapper and for everyone by the jptime busy substitute → both now keep the gate (her named runner S.runner stays her own choice).
**Her as a servant (cung-nữ road, law 1)**: when another master bribes or threatens HER (j42 cnvBribeOpts / cnvBlackOpts), her own mistress may come to know → S.tin (Chủ tin) drops, line after.
**Numbers**: all in `BAL.svt` (jbal2.js end, commented; law 4). one-core-guard: the «Hỏi chuyện» khắc reads BAL.svt.k.

## 2. Whole family (law 11) — scan `python3 dev/measure/svt-scan.py`
Every site in dev/build/j*.js where an act makes another person's servant engage (`spyFor =` or a call of bribeServ / threatServ / tmTake / tmAsk / svTalk):
| | BEFORE (net-build ed1be95a) | AFTER (this branch) |
|---|---|---|
| sites | 29 | 31 (+2: her «Hỏi chuyện» handler, NPC monthly talk) |
| reach a relationship effect on the servant's MASTER when the servant engages | **0** (only refusals told the master: bribe «mách chủ», tmRefuse) | **26** (11 inline svTouch/svTalk · 4 inside a wrapped function · 11 call a wrapped function) |
| exempt (with reason) | — | 5: plantServ (her own servant moves house), jagknow old-save seeding, 3 × jcoopworld state sync |
| UNWIRED | 29 | **0** |
Sites wired: bribeServ j29 (her «Mua chuộc» j10/j15/jsgame Mặc cả, NPC servMonth j10:88, jagacts2 day plan, jmline mlHit), threatServ j10 + par3 cnvBlack (jagacts3:183), tmTake/tmAsk jagknow (+ j7, jagacts3:27), tmAsk best (jagknow:382 inline), j70 plot accomplice (inline), j24 svDefect + svSell (inline), j42 her-as-servant bribe/threat (inline), jky spy (inline), jtsb bribe (inline), j10 servant↔servant friend talk (inline, no second chứng cứ). Acts that already carried their own master effect stay as they were: jmline beat / frame (oán + chứng cứ), refusals (mách chủ).

## 3. Tests
- dev/test/servant-trust.js (new): **48/48 PASS, 3 runs in a row** (deterministic: odds forced through BAL.svt, not Math.random sequences) — refusal = no change; seen → Chủ tin + thiện cảm drop; real slip only with a real deed (deedCap); no secret → no chứng cứ; once per buổi; law 1 (NPC → her servant, she is told after; NPC ↔ NPC); bất kính and greetName; covert skips greeting, seen less; wrappers; NPC returns the distrusted servant; bestSent gate; her button costs BAL.svt.k khắc, after-line has no number/% (kit relation read-out excepted); old save without svtG loads; 8 weeks played, 0 page errors.
- npcmind-check (main ac4790f0 save → this build): ERRS [], exit 0.
- one-core ×3: one-core-guard PASS (inline 3112 < baseline 3592; first run caught my typed «2 khắc» → BAL.svt.k), one-core-text PASS, one-core-bind PASS (1590 prints, 0 mismatches).
- coop-e2e: **142/142 passed**.
- two-way-oldsave (main save → new build): ok true, errs [].
- quickcheck 42db050c vs live ac4790f0: **QUICKCHECK PASS** · old save ok · core gates PASS · perf median new/live render 300/261 ms, tab 596/616, buổi 1689/1539, tasks>200ms 22/25.
- svt-scan: 31 sites, 0 UNWIRED (before 29 / 29 unwired).
- Shots (looked at 3×, Fold 755x1000 + iPad 1180x820, real art, SHOTS OK no overflow): CDN img/_review/servant-trust/ — *-svt-card.jpg (another house's servant card, «Giao thiệp: Hỏi chuyện · 2 khắc», no warning) and *-svt-after.jpg (after the tap: kit KẾT QUẢ card shows the bất kính / thiện cảm loss only after). Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review servant-trust.

## 4. Notes / not done
- The RING / «vòng nhóm» place UI (OD ~07:52–08:05Z) is design-first and NOT decided — not built here. svTalk + svtEtq are the rule functions that UI will call (tap a follower without greeting her master = bất kính; a covert option = svTouch with a covert kind).
- NPC↔NPC effects are silent to her unless they reach her household (witness rule unchanged).

## REVIEW (opus BIG reviewer session_01D3E3NZh6xm1S3xPV8XpuMW, 24/11 ~11:00Z) — **REVIEW FAIL** (2 items; rest green)
PRIORITY #1 CHECK ('servant-trust svTouch' / 'srvStaffAct' / 'asPeers' / 'newsAdd witness'): OD 24/11 07:58Z / 08:08Z / 08:12Z read verbatim + the 08:40Z scope row (no-prewarn = only re-ask prompts; Được/Mất rows stay) | ledger 0 | claims: this review | main ac4790f0: none | review/*: review/servant-trust 42db050c (target), review/net-build-rv b029879a (net-build FAILED, moving — NOT merged, per Foreman D) | archive 0.
Reviewed the stacked diff ed1be95a..42db050c. Branch **review/servant-trust-rv c8d3589922a0554146d30bac970a084511d29a76** = 42db050c + merge LIVE origin/main ac4790f0 (assemble.py: jsvt.js kept beside main's j70sd/j70c/jwsd/jworldc/j71sd/j71c; index.html/sw.js rebuilt) + small fixes (below). Trial merge with net-build-rv b029879a: only generated index.html/sw.js conflict, sources clean. No servant-trust code leans on the FAILED net-build parts: jsvt reads evG only as the real proof count vs deedCap (svtHasSecret), never as a level; no netTh copies.

### Checks
1. **ONE function (law 11)** — svTouch/svTalk really carry every site the scan lists; svt-scan re-run: 31 sites, 0 UNWIRED (reproduced). **But the scan's definition (spyFor set / 5 function names) misses one family → FAIL 1.**
2. **Law 1 / law 6** — refusal by lòng + Chủ tin + nết is real (svtRefO, test: refused = no change); a slip gives chứng cứ only with a real deed and deedCap room (test); NPC→her and NPC↔NPC use the same code. **Master's knowing does not follow the witness rule → FAIL 2.** Bất kính: open talk only, master at the same place and not greeted this buổi; not spammy (sim 24 months: 3 bất kính world-wide; her servants approached 7×, she was told 2×; 50 NPC talks / 27 refused / 11 seen; 0 dismissals; servMonth cost ≈1 ms/month).
3. **Laws 2/3/7** — «Hỏi chuyện»: cost BAL.svt.k khắc, gain = a nết of that master or common talk; risk only after, in words, no %. No free option. OD 08:08Z (scope fixed 08:40Z) kept: no re-ask, consequence after.
4. **Low Chủ tin real** — bestSent bypass CONFIRMED real: j70's wrapper for p===S returned its own pick for her ALWAYS (jtin's BAL.tinLv.send gate never applied to her), and for NPCs when the jtin pick was busy; jptime's busy substitute likewise. Fix keeps the old sort (loyal + sharp) so trusted servants are picked as before; her named runner (jhc S.runner, assembled later) still wins. Side effect to know: a fresh servant with lòng < 30 (default tin 45 + (lòng−50)/4 < 40) is no longer sent by her — that is the jtin rule as written. NPC returns under BAL.svt.tin.out (test). Law 4: all numbers BAL.svt; one-core-guard / text / bind / text-rule PASS.
5. **Kit (9/10)** — «Hỏi chuyện» = the same pbtn option card in «Giao thiệp» (card) and the same row button (staff list); after = kit KẾT QUẢ card. Own shots Fold 755x1000 + iPad 1180x820 (scratch, not in git), looked at 3×: no overflow, no page error, no pre-warning, Mất/Vì sao/Kèm only after.
6. **Gates on c8d35899** — servant-trust 48/48 ×3 · svt-scan 31/0 · one-core ×4 PASS · npcmind-check ERRS [] exit 0 · two-way-oldsave ok, errs [] · coop-e2e **142/142** · quickcheck: open ok, old save ok, perf median new/live render 215/260, tab 513/493, buổi 1663/1444, tasks>200ms 24/25 (on par); its G4 80-dialog-fixed failed ONCE («Danh hiệu mới» plate on the event picture, iPad) — re-run 3× on this build + 1× on main: all pass → flake, not this branch.

### FAIL list (for the fixer; base review/servant-trust-rv c8d35899)
1. **Law 11 + law 1 + OD 07:58Z — servant ↔ servant across houses is a member of the family and is NOT wired.** Wired today: only the j10 servMonth friend TELL. Unwired: (a) her cung-nữ road `srvStaffAct` (j42.js:523) chat / gift / ask / frame on a colleague of ANOTHER house (srvColleagues includes S.srv.met from other houses; «ask» makes that colleague tell her about another palace); (b) the NPC servants' own options in jagstaff.js:77-80 / 124-128 (chat / gift with peers, «ask» picks `fr` = a friend of ANOTHER house explicitly, asPeers:89). Same act, two sides, no relationship effect for the colleague's master, and no greeting rule although the owner names exactly this case ("Cùng là cung nữ, muốn tương tác với một người cung nữ khác thì ít nhất cũng phải chạy lại chào hỏi cái vị chủ tử đó"). Also law 1: on the cung-nữ road no other master ever does «Hỏi chuyện» to HER (svtMonth only picks from t.staff; she is not in a staff list), while she can do it to others' servants as a consort. FIX: route these through svTouch (open talk via svtEtq for the greeting, «ask» = the telling one); widen svt-scan to «any act whose target is a servant whose owner ≠ the actor's house» (catch srvAf / s.af writes, srvStaffAct, jagstaff peers), before/after table; measure NPC servant churn (Chủ tin drops → BAL.svt.tin.out returns) over ≥12 months with the jagstaff path on; test lines both sides.
2. **Law 6 / brief check 2 — the master comes to know with NO witness.** `svtSeenO` = BAL.svt.seen.base 30 + eyes×6 + near 30 − covert: with eyes 0 and not at the same place she (or an NPC master) still learns 30 % (10 % covert) of the time from nobody. The game's witness rule (newsAdd, j28.js:80, npc-purpose G2) says news reaches a person only through a real witness: being there, her eyes (eyes()), a talkative servant of her household (netIs "talk"), or a witness who chooses to tell (npcTell). FIX: build the roll from those real sources (keep numbers in BAL.svt.seen), so «Có kẻ bẩm» always has a «kẻ»; test: no witness → never known.

### Small fixes made on -rv (c8d35899)
- jsvt svTalk after-line printed the nết capitalised mid-sentence («là người Kiêu ngạo») → lower case.
- servant-trust.js typed «2» for the khắc → reads BAL.svt.k.

### Notes (not FAIL)
- Bất kính against a higher rank can be heavy: one ungreeted talk with the Hoàng hậu's maid (oán 8 × up 1.5, then her nết scaling) → oán +25, thiện cảm −15, «Nguy hiểm chung» 18 → 45 on iPad shot. Owner-intended direction; fixer may sanity-check the size.
- The «8 weeks played» loops in servant-trust.js / net-build.js call endTurn without clearing Q, so the turn does not advance (same harness weakness as before); my direct 24-month servMonth sim covers the monthly path.
- Lands after net-build: re-merge onto the fixed net-build-rv before landing.
Shots: scratch only (not uploaded); the worker's CDN folder img/_review/servant-trust/ stays until the final verdict.
<<<<<<< HEAD

## FIX r1 (opus worker, child of Foreman D, 24/11) — both FAIL items fixed, whole family (law 11)
PRIORITY #1 CHECK ('servant-trust svTouch' / 'srvStaffAct' / 'asPeers' / 'newsAdd witness' / 'svtPeer'): OD 24/11 07:58Z / 08:08Z / 08:12Z + 08:40Z scope row read verbatim | ledger 0 | claims: servant-trust NYMzUyzf (worker, done) + rv NZh6xm1S (FAIL) → this fix | main 178cac37: no jsvt (not live) | review/*: review/servant-trust 42db050c, review/servant-trust-rv c8d35899 (base), review/net-build-rv (NOT merged, per brief) | archive 0. REUSED: svTouch / svtEtq / svtWrap (jsvt), the witness sources of newsAdd (j28.js:80: being there, eyes(), netIs "talk", npcTell), npcTell / npcWit (jagwhy), srvAf / S.srv.intel (j42), asPeers / AS_DO (jagstaff), msAffAdd / msOanAdd (j9: one relation store for servants), pushDil / mkP (j3: the ONE dilemma card), tinAdd / tinOf (jtin).

Branch **review/servant-trust-rv** (base c8d35899). Commits: 971f4c1a (fix) · 2c1c2bfc (merge) (merge newest origin/main 178cac37 + rebuild). **Final sha 2c1c2bfc3cf85d022c881e4c38d04031ff537dba.**

### FAIL 1 — servant ↔ servant across houses (law 11 + law 1 + OD ~07:58Z) — FIXED
One new entry **`svtPeer(actor, colleague, kind, ok, at)`** (jsvt): if the colleague belongs to another house → the greeting rule for the open act (`svtEtq`, always, whatever the outcome; a servant is below every master, so ungreeted = × up), then, when the colleague engaged, `svTouch` (her master may come to know through a real witness). A chat is two-way: `svTouch` both directions (each servant's master may hear of it). `svTouch` now knows a servant actor (`svtId` "s<sid>", `svtHouse`: servant → her master; she on the cung-nữ road → srvM()) and also lowers the master's thiện cảm toward the servant who went behind her (j9 msAffAdd, same store).
| site | before (c8d35899) | after |
|---|---|---|
| j42 srvStaffAct «Trò chuyện» / «Biếu quà» / «Nhờ dò tin» on a colleague of another house (her cung-nữ road) | no effect for the colleague's master, no greeting | svtPeer (chat / gift / ask): bất kính if that master stands there ungreeted; seen → Chủ tin in the colleague −, master's thiện cảm toward her −; chat also → HER master's Chủ tin in her (S.tin) − |
| j42 place card «sv» Trò chuyện / Biếu quà nhỏ | same gap | svtPeer (same) |
| j42 srvFriendTip (a friend of another house comes and tells / shares) | none | svTouch(S, friend, "friend") (covert, no second chứng cứ) |
| jagstaff AS_DO chat / gift / ask (NPC servants, asPeers f / fr of another house) | none (and under asOn the old j10 friend-talk svTouch never ran) | svtPeer (chat two-way / gift / ask with a real leak) |
| law 1: «Hỏi chuyện» on HER on the cung-nữ road | never (svtMonth picked from t.staff only) | svtMonth: when the NPC's target is her master, she is one of that household's servants (1 in staff+1); the NPC comes herself or sends a servant (BAL.svt.npc.srvAsk) → kit dilemma `PEND.svtAsk` «Trò chuyện» (gain: the asker's thiện cảm + news of that palace for her master; risks only after) / «Cúi đầu từ chối» (nothing changes, OD ~08:12Z). No pre-warning (OD 08:08Z / 08:40Z scope). |
| same-house frame (j42 frame, jagstaff P.foe), Nội vụ phủ chance meetings, seeding, jnroad rivalry outcome, her eavesdropping (listen / scout / watch) | — | exempt with reason in the scan (no servant of ANOTHER house is approached) |
**svt-scan widened** (dev/measure/svt-scan.py): family = «any act whose target is a servant whose owner ≠ the actor's house»: every srvAf / stfLike / nrAf / `<x>.af[<y>.sid]=` / `S.srv.intel` / `s.intel=` write must reach svtPeer/svTouch in the same act or be exempt with a reason. `--legacy` = the old 31-site scan.
| scan | sites | UNWIRED |
|---|---|---|
| old scan on c8d35899 (`--legacy`) | 31 | 0 |
| widened scan on c8d35899 (before) | 67 (31 + 36 servant↔servant) | **11** (j42:189/190/341/524/525/526, jagstaff:124×2/127×2/+ask) |
| widened scan on the fix (after) | 67 | **0** |
**Churn** (new dev/measure/svt-churn.js, 14 game months = 42 tuần, staff decide every buổi through jagstaff asTick, Q cleared weekly):
| life | peer acts (svtPeer) | touches chat / gift / ask / talk / tm / bribe | known (near / eyes / talk / tell) | bất kính | Chủ tin avg (start→end) | servants under BAL.svt.tin.out | returned to Nội vụ phủ | «Hỏi chuyện» on her |
|---|---|---|---|---|---|---|---|---|
| consort | 147 | 78 / 55 / 14 / 14 / 8 / 3 | 53 (8 / 5 / 17 / 23) | 8 | 48 → 76 | 0 | 0 | — |
| cung nữ | 189 | 110 / 72 / 26 / 6 / 19 / 2 | 77 (26 / 9 / 4 / 38) | 7 | 49 → 64 | 1 | 0 | 1 |
No churn: Chủ tin drops (chat 5, gift 4, ask 8) are smaller than the monthly trust gains, nobody was mass-returned; ~1 peer act per household-week, ~1 in 3 known.

### FAIL 2 — the master came to know from nobody (law 6) — FIXED
`svtSeen(a,m,kind,at,s)` replaces the base roll: the master knows ONLY through a real witness, the same sources as newsAdd (j28.js:80, npc-purpose G2): **near** (she stands at the place of the act: BAL.svt.seen.near), **eyes** (her informants, eyes(m) ≥ 1: eyeB + eyes × eye), **talk** (a talkative servant of her household, nết «talk», not the one involved), **tell** (a witness at the place who chooses to tell her: npcTell grudge vs the doer / liking for her). Covert kinds take BAL.svt.seen.covert off every source. **No base** — no witness → never. The after-line names the «kẻ»: «Chính mắt ngươi thấy / Tai mắt của ngươi bẩm / <tên> miệng mồm lanh lẹ, kể lại / <tên> có mặt ở đó, đến mách: …». BAL.svt.seen = {near 60, eyeB 10, eye 8, talk 30, tell 100, covert 20} (law 4).
| check | before | after |
|---|---|---|
| eyes 0, not at the place, no talkative servant, nobody tells, luckiest roll (Math.random 0), 20 tries | known 30 % (covert 10 %) | **0 / 20** |
| each source alone (near / eyes / talk / tell) | — | known, counted per source (SVT.stat.how), line names the witness |

### Bất kính size (reviewer note) — trimmed, direction kept
Before: oán 8 × 1.5 (higher rank) = 12, then her nết (persF «slight» up to ×1.5 × 1.4) → **+25 oán** and −15 thiện cảm in ONE talk; other single slights in BAL sit at 5–10, serious ones 15–20. After: BAL.svt.greet = {oán 5, aff 4, up 1.4, dn .5} → 7 before nết, worst nết ≈ 15 (= a serious single slight), test line «bất kính worst case ≈ 15 oán (was 25)». Same rule for a servant who skips greeting a master (svtRk: a servant is below every master).

### Gates (on 2c1c2bfc3cf85d022c881e4c38d04031ff537dba)
servant-trust **70/70** (was 48; new: witness ×5, servant↔servant ×7, bất kính size, cung-nữ road ×7) ×3 · svt-scan 67 / **0 UNWIRED** · svt-churn 14 months consort + cung nữ, 0 page errors · npcmind-check ERRS [] · one-core-guard / bind / text / text-rule PASS · two-way-oldsave ok, errs [] · coop-e2e **142/142** · quickcheck PASS (open 1978 ms, old save ok, perf median new/live render 242/264 ms, tab 421/395, buổi 1181/1398, tasks>200ms 22/23, core gates PASS).
Kit (laws 9/10): «Hỏi chuyện» on her = the ONE dilemma card (pushDil, kit option cards); after = kit KẾT QUẢ card; no new part. Laws 2/3/7: talk = gain (thiện cảm + news) with after-only risk; refuse = nothing; no %, no digit in the option text, no re-ask prompt. Shots Fold 755x1000 + iPad 1180x820 (the card + the KẾT QUẢ after it; scratch only, not in git), looked at 3×: no overflow, no page error.
Note (not changed): the old harness weakness (endTurn with a Q item does not advance) is avoided in svt-churn by the bot pattern of ea-npc-rate (start() + nfParked); servant-trust.js keeps its 8-week smoke as before.
=======
>>>>>>> 01958043 (MAIN 122: test-mrfoot ruling + B order)
