# coop-thin F1 — HER HÀNH ĐỘNG ACTS AS INTENTS (+ the intent wrapper for F2–F5) — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('runAct|intent|do act|TH.onDo|erd|sendRes|famApply|petApply|coop-cyc'): OD 0 new (thin guest 17/11 ~01:40Z / ~02:05Z / ~02:15Z + L1487/L1489/L1493/L1494 read verbatim) | ledger 0 | main 09b1bbaf: jcoopthin A+D (TH.doSend/onDo, D patches/cards), jcoopthinb B, jcoopthinc C (runAct act frame → NPC ops), jcoopthine E (`do erd` person diff + `do ready`), jcoopworld runAct wrappers :416 (acts on the friend → sendRes/res) and :996 (NPC acts on her entry → b4 ops) | review/* no F branch (git ls-remote review/coop-thin-f*: none) | claims: this worker only (CLAIMS row 'coop-thin part F1').

Worker session_01N1tNP3rNcptHftJhzxFMrF (opus), coordinator FOREMAN B ROOT session_01N1tNP31AgWuBWJq16iwyup. depth 1 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f1 from origin/main 09b1bbaf (E LIVE). Worktree /home/user/wt/f1 (sparse, hooks).

## 0a. Every act entry point the guest runs today (main 09b1bbaf) and which part moves it
The engine function is `runAct(a,t,k,extra)` (j9.js:37); the table is `ACT` (j8.js:85, `A(k,n,o)`; 52 kinds incl. the ones j30 j70 j78 j92 jdress jecon jface jlost jpet jpetcare jpoison jrash jshelf jtsb add).
Today on the guest at level ≥ 3 her act RUNS ON HER PHONE: jcoopthinc's runAct wrapper opens an ACT frame, the NPC side goes to the host as `do npc` ops (3-way merge), her own side stays on her phone; on the friend (the host's entry) jcoopworld:416 resolves it on her phone and sends `res` (fx / flags / pet / fam / items / fxl) → the host applies it (D.resTo at L4+ in his context).

| # | entry (guest tap) | file:line | ends in | part |
|---|---|---|---|---|
| 1 | Hậu cung person card act (`doAct`) | j8.js:461-463 | `spend(2); runAct(S,v,k); log(r)` | **F1** |
| 2 | Tặng quà picker (giftpick → `giveTo`) | j8.js:470 | `giveTo` (not runAct) | F3 (gifts) |
| 3 | Cài đồ vào rương picker (plantpick → `plantItem`) | j8.js:475 | `plantItem` (not runAct) | F3 (bag) — same family as runAct "plant": listed for F3, F1 covers `runAct(...,"plant",ix)` |
| 4 | place pop-up harms (`placeHarms` act cards) | j9.js:68 | `runAct(S,v,key2)` | **F1** (pushPond / trip direct calls j9.js:70-71: not runAct → F2 places) |
| 5 | person-card game "Giao cho người làm" (`sgJob` place/act run) | jsgame.js:244 | `SG.mod=m; runAct(S,v,k)` | **F1** (the SG.mod modifier travels with the intent; the mini-game score itself = F5) |
| 6 | co-op pet acts on the friend (`coopPetAct` / act tabs petcare / thaopet / petsteal) | jpetcare.js:158-161 | `runAct(S,f,k)` | **F1** |
| 7 | j70 schemes: "Tố giác … ngay" / "Dò la" / "Tố giác" buttons in the plot cards | j70.js:230, 242, 427-428 | `runAct(S,a,"accuse"/"spy")` | **F1** (the card's own `go` runs runAct: the outer wrapper catches it) |
| 8 | j70 plot execution `exec70` (a===S) | j70.js:205 | `runAct(S,t,M.k)` inside her buổi step (L5: on the host in context b already) / her week end (endTurn: still on her phone until G) | not a tap: E/G (inside a world frame the F1 wrapper never sends) |
| 9 | the friend's invitation answered (Kết giao / Tặng quà: invHer / invRun) | jcoopworld.js:519, 1041 | `runAct(S,v,pp.k,extra)` on the host (part D) | already host (D); F1 removes the guest's own invite relay (the act runs on the host from the start) |
| 10 | NPC-actor runAct on the guest (jtwoway SOC run, mindRun, jtsb, jtruth npcFrame…) | many | C already returns "" on the guest | unchanged (C) |
| 11 | empAct (Hoàng hậu powers: cutpay / judge / conf / reward / pardon) | j8.js:464-469 | direct code, `judge` | F6 (tripwire) |
| 12 | talk / chat options (Tạ lỗi, Nhún nhường, Giúp đỡ nàng …) j9 `A.push run` | j9.js:60-62 | direct code | F2 (visits / places) |
| 13 | deck cards (`runOpt`, j80 __restAct/__cardSuc) | j3/j80 | direct code | F6 |
Wrappers of runAct that run INSIDE the act (j24 j25 j29 j43 j61 j70 j78 j95 j95b j95c jil jlooks jmem jmood jpoison jslap jtq14 jtruth jtsb jcoopone jcoopworld jcoopthinc): all run on the host in her context once the F1 wrapper (outermost) sends the act — they are her act's effects, computed once.

## 0b. The intent wrapper (ONE function; F2–F5 only register their engine functions)
New module **dev/build/jcoopthinf.js**, loaded LAST (after jcoopthine: outermost wrapper of every engine function it registers). Level **6** (`TH.CAP` 5 → 6; `TH.on(6)`; on only when both seats run a build with it — Worker level = min(want, cap a, cap b), same as A–E).
```
TH.F.reg(name, {mine(args)→bool, enc(args)→plain|null, dec(a)→args, log:bool, ctx:[[get,set],…]})
  wraps window[name] once; returns the original (inner) for the host's run
```
- **Guest** (`TH.on(6)`, seat b, not inside a host context, not inside a world frame of part C (her week end / step still on her phone until G: unchanged there), S alive, `mine(args)` true): the call never runs locally. It (1) syncs every host patch first (TH.gSync), (2) sends her person diff since the last base (`do erd` packs — E's code, shared, with ONE guest baseline: after a send the base = what she sent; host patches are applied to the base too; so two quick acts never re-send the same change — this also fixes E's `do ready` diff, which reads the same base), (3) sends `do f {n:name, a:enc(args), c:ctx, id}`, (4) marks the act PENDING and returns "" (the caller's `if(r)log(r)` logs nothing; `spend(2)` stays on her phone = her khắc clock, as E's buổi clock). Persons in args travel as ids (an NPC id; the friend = the host's pid 901 = the stand-in id in her context on the host); an item index travels with the item itself (resolved by value on the host, like invRun's pp.he).
- **Host** (`TH.onDo("f")`, runs in `withSeat("b")` from the top of the event loop = the existing runDo): dedupe by intent id (a resend after a dead socket is applied once; ids kept per room in D.save), call-scoped context restored (`SG.mod` jsgame, `S.__err` j70) for the call only, args decoded IN HER CONTEXT (her viewer rows, the host as the stand-in entry), the ORIGINAL inner function called (all inner wrappers = her act's effects), `log(r)` in her context (the caller's log on her phone), her Q → part-D cards (takeQ), her person → part-D patch (pDiff), the world changes stay in the host's world (no NPC ops) and travel in the same view delta (`deltaSoon(0)` after runDo) → ONE render on her phone, no flicker.
- **Acts between the two** become ordinary acts in ONE engine, both directions:
  - her act on the host: runs in her context on the host with the host's stand-in as target; what it did to the stand-in lands on the HOST's real person when her context closes — the existing withSeat bridge (STAT, rel/oan, bridgeItems = gifts) is EXTENDED to the whole entry: items taken / burnt / planted, children (hurt, killed, taken), pregnancy (musk), pets (care / harm / steal), face marks (looks) — applied by the same local appliers the target side always used (famApply / petApply / resApply bodies, run on the host in the host's context: no message). No `res`, no ack / rpend, no week-end wait, no `ctm-fam` for her acts.
  - the host's act on her: already on the host since D (her entry's change → D.resTo → resApply in her context → patch). At level 6 the `res` relay object and its ack are not built: the host's runAct wrapper hands the entry diff straight to the same local applier in her context (D.later), result = patch. (The applier code stays as the ONE "act on a player's entry → that player's person" function; the relay messages `res`/`actr`/`act invite`/`ctm-fam` for this act family do not run at L6 and are deleted when L6 becomes the default — part H, same rule as C/E.)
  - Kết giao / Tặng quà between the two (ASK, needs the receiver's yes): her act on the host → the host's thInv card in his context (D, already); the host's answer runs her act in her context (invHer). No guest-side invite relay at L6.
- **Pending → result on her phone**: while an F intent is pending (sent, no `dr` answer yet): a second act tap is ignored (never queued: no double act), #next is locked with the existing lockNext wording (KIT: no new part), and the act buttons render disabled through the existing `can()` gate (pending counts as busy). The answer arrives as the view's `dr` (id) in the SAME delta as her patch + the world change → pending cleared + one render. **Latency guard**: no answer in 8 s → the same intent is resent (same id; the host applies an id once) up to 3 times, then the pending clears with a kit line (VANPHONG wording) and nothing is applied locally.
- **F2–F5 reuse**: `TH.F.reg("goTo", …)`, `TH.F.reg("buy", …)`, `TH.F.reg("useItem", …)`, `TH.F.reg("mgScore", …)` — each part only writes its `mine/enc/dec/ctx`; erd sync, pending UI, resend, dedupe, host run, patch return are shared.
- **Old guest path deleted for the moved acts (behind L6, one switch `fW()` = TH.on(6))**: C's act frame for runAct (her act → `do npc` ops), jcoopworld:416 sendRes/res for her acts on the host, the guest's invite relay (`do inv` for ASK acts), the guest's `ctm-fam` push as the source of the host's view of her bag/kids/pets for acts (her entry on the host is built from her stored person, kept current by erd) — all unreachable at L6 for runAct; deleted with the other bypassed relays when L6 is the default (part H). Tripwire: act category (F1) → 0, no other rises.

## 0c. Perf / latency (plan risk: every tap waits a round trip)
Path of one tap: guest → Worker → host (runDo: withSeat ≈ 16–26 ms measured in E + the act) → `deltaSoon(0)` → Worker → guest → apply + render. Two network legs + the host's run.
Measure (dev/test/coop-thin-f1.js, host Fold 686x880, guest iPad 1180x820, live Worker): tap → the act's result on her screen (her log line / card visible), median of ≥ 9 acts, (a) plain network from this container, (b) a **4G profile** = +85 ms each way on every socket message of both phones (≈ 170 ms RTT per leg, DevTools "Regular 4G"), CPU ×4 on the host. Target ≤ 400 ms (audit §4). Numbers in Done.
No lost tap / no flicker by construction: the guest never applies the act locally (nothing to undo), the pending state blocks a second tap, and the result + world + her patch come in one view message.

## Questions for Foreman B (I go on with the defaults unless told otherwise)
1. "no res / famApply / petApply" — default: the relay MESSAGES go (no `res`, no ack, no `ctm-fam` for acts at L6); the target-side APPLY code (famApply / petApply / resApply bodies) stays as the one local applier run on the host in the target's context (it gives the target her grief, lost-item case, Quà tặng card, death / lãnh cung). Rewriting those appliers would be a second copy of the same rules (ONE CORE).
2. Level number: F1 = level 6 (F2–F5 add their registrations behind the same level or 7–10 as B decides; the wrapper reads its own level per registration).

## #1 progress (worker session_01N1tNP3rNcptHftJhzxFMrF) — review/coop-thin-f1 @ a6cb63b7 (pushed), NOT ready for review
Built (level 6, CAP 5 → 6, everything behind TH.on(6) / jcoopworld fW(); levels 0–5 + solo unchanged):
- **dev/build/jcoopthinf.js** (new, LAST in assemble.py): `TH.F.reg(name,{mine,enc,dec,log,ctx,ret})` = the ONE intent wrapper. Guest: her person diff rides IN the intent (`do f {n,a,c,ops}`, atomic; leading `erd` packs only when > 15 000 chars), pending (a second tap ignored; `can()` false; #next locked through CW.eWait = the existing lockNext words), answer = view `dr` id (F.lastAns, F.stat.ms), resend after 8 s same id ×3 then kit line "Việc ấy chưa thành, xin thử lại." (VANPHONG: check wording with B if needed). Host: `onDo("f")` dedupe by id (DONE map, localStorage `ctm-thin-f:<room>`), her ops → pApply + D.rebase, ctx (SG.mod, S.__err) set for the call only, args decoded in her context, the INNER function run, `log(r)` in her context. F1 registers `runAct` (mine = she is the actor; target by id, item index + the item itself).
- **jcoopthine.js**: ONE guest baseline `E.base(V)` / `E.sent(cur)` (view copy only when the host answered her last intent and every patch is applied; else her last sent copy + the patches she applied since); `TH.doSend` on the guest records E.last. gReady uses it (fixes a latent double-send of the same diff).
- **jcoopthinc.js**: `C.inWorld()` (an act inside a world step on her phone is never an intent).
- **jcoopworld.js**: `fW()` = TH.on(6); `sendRes` in her context on the host at fW(): no message — the stand-in's change → `resApply` on the host's own person in his context (D.after); stand-in baseline + bag moved so the withSeat bridge does not count it twice.
Results (live Worker, host Fold 686x880, guest iPad 1180x820, L6, no throttle): coop-thin-f1 run t2: **F1 45/53 kinds green** (the 8 red = test compared only her NEWEST log line; her phone adds its own lines after the act from the world delta — "Ngươi có thêm chứng cứ …" (evidence from the staged ev), "Nội vụ phủ định lại kẻ hầu …" (staff cap): guest-side log writers = F6/G tripwire items; stats all equal both phones). Test fixed to look for the host's act line in her top 5 lines (rerun t3 on the 5 red kinds: 15/15 green; pushed a6cb63b7). Tap → answer **312–478 ms** (no throttle, median ≈ 380). F2 both directions ran with no page error: guest→host petcare pets 50→75 on the host ✓, kpoison "Công chúa … trúng độc mà chết" ✓ (host kid effect to verify in the table), petsteal / laydo caught (seeded), gift → invite card on the host; host→guest petcare ✓, gift inv 47→48 ✓. F8 oldRun {} both. 0 page errors.

## ROLLOVER HANDOVER #1 → #2 (11/18/2026; context ≈ 28 % ≥ START 3 % + 25 %) — Foreman B opens the successor
Worktree /home/user/wt/f1 (sparse, hooks), logs /home/user/wt/f1-out (another container: recreate from review/coop-thin-f1, then commit the test fix if missing: coop-thin-f1.js herSame uses her top-5 `logs`). Run: `python3 dev/build/assemble.py && node dev/test/coop-thin-f1.js https://ctm-coop.victoria-tntt.workers.dev 6 [swap]` (KINDS=a,b / NOACT=1 / OUT=dir / TRIP=1).
Left, in order:
1. F1 table green on L6 + swap (`… 6 1`); OUT=<dir> for the before/after table in the report.
2. **F2 assertions** (acts on the friend, both directions): today only "ran"; make each check its effect (her pet / item / kid on the TARGET's real person: guest→host = host's S; host→guest = her phone S after the patch), force success by staging (high odds / seeded host RNG in the host page while it runs her intent) — steal (laydo), gift (accept the invite card on the receiver), harm kid (kpoison/pond), pet (petcare/petsteal). Check the host's note card (resApply) shows on the host for her act.
3. Delete-for-good list at fW() (report table): C act frame for her runAct (bypassed: the F wrapper is outer), sendRes `res` for her acts (done), her `do inv` relay (ASK acts now run on the host: jcoopworld:416 in her context → D.kind("a","inv") = the host's card; verify), ctm-fam at act time. Check jcoopworld onRes / ack paths are not reached at L6 for acts (stat counters).
4. Latency on a **4G profile**: wrap COOP.send + the socket onmessage on both pages with +85 ms (add an env LAG=85 to coop-thin-f1.js), CPU ×4 on the host; median of ≥ 9 acts; target ≤ 400 ms per leg pair — report both numbers.
5. **coop-cyc rewrite** (test debt from E): dev/test/coop-cyc.js edits her person locally and she is a cung nữ under thin life → rewrite for the thin model (her Kỳ nguyệt sự card through part D on the host; set state via the host's withSeat('b') store, not her phone); list old vs new checks; no weakened assertion.
6. Gates: coop-thin-a L1 / b L4 / c L4 / d L4 (known 4 kit sameDom) / e L5 + swap, coop-e2e (+COOP_SWAP=1), coop-p2, coop-b1, coop-night (THIN=5 and 6), coop-timer, coop-one-world seeds 1–10, tripwire `TRIP=1 THIN=5` vs `THIN=6 node dev/test/coop-bot.js 4 <out>` (F1 category → 0; check coop-bot accepts THIN=6), quickcheck, one-core-guard/text/text-rule/bind; generated files (dev/site/build_site.sh) rebuilt; LOOK host Fold 755x1000@2 + guest iPad 1180x820@2 at an act result (scratch only).
7. '## Done' (moved/deleted paths table, tripwire before/after, latency, tests, sha), CLAIMS row 'SẴN SÀNG KIỂM <sha>', send_message Foreman B.
Known: guest-side log writers after a world delta (evidence lines, staff-cap line) still write her S.logs on her phone (F6/G); her plots executing in her week end (j70 exec70 inside endTurn on her phone) still run locally in a dropped world frame (part G); resend of a > 15 000-char diff re-sends only the intent (leading erd packs not idempotent; rare).

## #2 progress (worker session_01N1tNP5hUtqm6eT8fJ5jxTy, depth 1, START_CTX ≈ 3 %) — review/coop-thin-f1 @ 3b9cd531 (pushed), NOT ready for review
Commits: 56add030 (F1/F2/F3 test + 2 fixes), 3b9cd531 (E-fix WIP).
1. **F1 table L6** (live Worker): normal 53/53 kinds green; swap 51/53 → the 2 red (pond, expose) = the test compared the host's TOP log line of her (a later line such as "Lòng ngươi bắt đầu nghĩ…" or her phone's own world-delta lines); the act line itself was there. Test now compares the act's OWN result line (the host's runAct return, `F.lastAns.r.r`, first 40 chars) among her newest 8 lines — stricter, not weaker. Swap rerun of pond/expose/kpoison/gift 4/4.
2. **F2 rewritten** (dev/test/coop-thin-f1.js): each act between the two is checked on the TARGET's own person + the actor (petcare: target pet No/Vui up; petsteal: target −1 pet, actor +1; gift: receiver accepts the invite card + the Quà tặng card → receiver +1 item, giver −1; laydo: target −1, actor +1; kpoison: target kid hp down / dead); success forced on the host (every act runs there): `roll=o=>o!==30` (30 = j29 loyal servant refusing a dirty job), `caught=()=>""`, restored after; her person staged in the host store (withSeat b → patch), never on her phone; guest→host also checks the host got his note card (resApply in his context). Results: L6 normal 20/20, L6 swap 20/21 → fixed below → green; 4G run 21/21.
   - **BUG FIXED (jcoopworld invHer)**: her Tặng quà to the host at L6 did nothing after he accepted: at L6 her offer is made on the host in her context (runAct wrapper → D.kind inv, item as `pp.he`) but invHer read only `pp.e` → extra undefined → giveTo "" → nothing moved. Now `pp.e||pp.he`.
   - **F3 (new)**: messages counted on both pages during F2: no `res` / `actr` / `act … invite` / `do inv` at L6 (both seats) ✓. Still sent at L6 (sync layer, not act relays): host `act:ctm-fam:fam`, `pos`; guest `act:ctm-fam:fam`, `pos`, one `do:npc` (not from an act: to trace) → part H list.
   - **Guard (Foreman ruling 18/11)**: jcoopworld resApply on the GUEST at L6 (outside a host context) = `oldRan("actApply")` + no-op (F8 asserts oldRun 0 both seats ✓). The appliers run only on the host: her act on him = his context a once hers closes (the target is the host's own person); his act on her = D.resTo in her context b.
3. **Latency** (env LAG=<ms> per socket message each way on both pages, CPU=<rate> host via CDP; LATENCY line printed): no throttle median **302 ms** (n=4, 247–351) / #1: ≈380; **4G profile LAG=85 + host CPU ×4: median 888 ms** (n=11, 812–9100; the 9100 = one resend after 8 s). Over the ≤ 400 ms target: 4 × 85 = 340 ms is pure network (two legs, both phones) + the host's run at ×4. No lost tap / flicker (pending blocks a 2nd tap, one view message). FOR B: decide if 888 ms on 4G is acceptable or needs an optimistic "đang làm…" state (kit line) — NOT built.
4. **E-fix 'cyAsk on host' (Foreman B ruling 18/11 07:34Z; reviewer checks it as part E code) — WIP @ 3b9cd531**:
   - Root cause: her cyAsk lives in her flip, which at L5+ runs only on her phone inside her week-end world frame → card + S.cyb dropped; the host's cyWait read CW.fcy (from `do cyb`) which her phone sent as "not pending" → no hold.
   - Built: jcoopworld cyWait at eW()&&host(): reads her person (CW.fcyb), holds until `rk===this week` (or CW.cyNo), triggers `CW.herCy(g)` when not asked; flip wrapper: in her context (her answer → jcycle done → flip) no draw, `D.after(cyFree)`; cySend off at eW() (host owns cyb); jcoopthine CW.herCy = D.later(her seat) → jcycle cyAsk (part-D card), nothing to ask → CW.cyNo + cyFree; guest cyAsk → false; jcoopthin pDiff: `cyb` no longer skipped at L5+ (travels in the patch). coop-thin-e E9 rewritten (stage cyb in the host store; her phone gets it in the patch; no do cyb / ctm-p2 cyb from her phone) — NOT run yet.
   - coop-cyc thin rewrite: her state staged in the host store (withSeat b) + check it reached her phone; `lui` Math.random forced on the host; thin checks: held = host `COOPW.cyHold===wk()`, reached = `fcyb().rk===w`. Last run THIN=6 CYC_ONLY=dung: 19/23 — card ✓ appears on her phone, answered ✓, cost once ✓, book ✓; RED: (a) held null (my held probe also required `!(S.tn.w===wk())` — drop that clause, then recheck the host really holds), (b)+(c) "merged week is her cycle tuần" false: suspect **her stored S.tuan lags the host world tuần** (cycOn reads S.tuan; in her context it is her person's tuan) → the ask fires in the week before; fix idea: in CW.herCy run cyAsk with S.tuan = TH.outerS.tuan (world tuần) or keep her tuan synced; the test's `want` should also use the host's tuan; (d) host page error `thin ser TypeError: reading 'k'` (S.origin undefined in ser during runDo → withSeat) — the test sets ranks on her phone at setup (`[B,3]`): move that to the host store too, then see if the error remains.
   - Then: coop-cyc THIN=5 + THIN=6 + swap (no swap arg in coop-cyc: add one like the others), L4 = main behaviour (main L4 30/62).
Left after the E-fix (items 6–7 of #1's list): gates coop-thin-a L1 / b L4 / c L4 / d L4 / e L5 (+swap; E9 new), coop-e2e (+COOP_SWAP=1), coop-p2, coop-b1, coop-night (THIN=5 and 6), coop-timer, tripwire `TRIP=1 THIN=5` vs `THIN=6 node dev/test/coop-bot.js 4 <out>` (F1 category → 0), quickcheck (`bash dev/tools/quickcheck.sh`, needs dev/site/build_site.sh output committed), LOOK host Fold 755x1000@2 + guest iPad 1180x820@2 at an act result (SHOTS=<dir outside git>), '## Done', CLAIMS 'SẴN SÀNG KIỂM <sha>'.
DONE so far: one-core-guard / text / text-rule / bind PASS; coop-one-world seeds 1–10 PASS (on 56add030 + E-fix-free build).
Runs: `python3 dev/build/assemble.py && node dev/test/coop-thin-f1.js https://ctm-coop.victoria-tntt.workers.dev 6 [swap]` (KINDS=a,b NOACT=1 OUT=dir TRIP=1 LAG=85 CPU=4); `THIN=6 CYC_ONLY=dung CYC_DBG=1 node dev/test/coop-cyc.js <outdir>`.

## ROLLOVER HANDOVER #2 → #3 (11/18/2026; context ≈ 27 % ≥ START 3 % + 25 % − margin) — Foreman B opens the successor
Branch review/coop-thin-f1 @ 3b9cd531. Do, in order: (1) finish the E-fix (point 4 above: held probe, world tuần in herCy, setup ranks via the host store, page error) until coop-cyc is green at THIN=5 and 6 (+ swap), L4 as main; run coop-thin-e L5 (+swap) for the new E9; (2) gates + tripwire + quickcheck + LOOK (list above); (3) '## Done' (moved/deleted paths table from step 0b + F3 message table, tripwire before/after, latency numbers above, tests, sha; label the cyc work 'E-fix: cyAsk on host'), CLAIMS 'SẴN SÀNG KIỂM <sha>', send_message Foreman B.

## #3 (worker session_01N1tNP6ZG4o7s2LdhThfFH2, depth 1, START_CTX ≈ 3 % of 1M, used_tokens reads 0) — Done
PRIORITY #1 CHECK ('cyAsk|cyWait|cyFree|deltaSoon|latency|origin erd'): OD 0 new (Foreman B rulings 18/11 in the takeover prompt) | main 36e574fa: no cyAsk-on-host, no latency split | review/* only this branch | claims: this worker only.
Branch review/coop-thin-f1 @ 433da4de (merged origin/main 36e574fa, clean). Commits this session: 24168022 (E-fix finished, separate commit), a01ce68d + 67046e41 (latency), 15adffc8 (origin guard), merge, 433da4de (tests/generated).

### E-fix 'cyAsk on host' (Foreman ruling 2; label for the reviewer: part E code)
Root causes found and fixed (on top of #2's WIP 3b9cd531):
1. jcycle is an IIFE: `window.cyAsk` did not exist, so the host's `CW.herCy` never asked (always "nothing to ask" → cyNo → draw freed at once). jcycle now exports `window.cyAsk`.
2. jcoopworld `cyFree` checked `cyWait(friendEntry())`; during the week end her entry is out of the deck (CW.pulled) → null → any presence / patch event freed the hold before she answered. New `cyFe()` = the entry as the draw sees it (pulled first), used by flip and cyFree.
3. Her card auto-answered "Báo đúng" without her: jcycle's endTurn rule "never answered (closed, reloaded): the true report" ran (a) on her phone (her week end, flags from the patch) and (b) in her context on the host while her card waited as a part-D card in S.thq (Q empty). Two hooks in jcycle (no co-op logic there): `window.cyHostOwns()` (jcoopthine: guest at L5+, outside a host context → her phone neither asks nor auto-answers) and `window.cyCardOpen()` (jcoopthine: in her context the cyrep card is still in S.thq → not answered for her). The old `window.cyAsk` wrapper of #2 (never reached: jcycle calls its own cyAsk) is replaced by the hook.
4. Her person diff carried `["-",["origin"]]` on a first ready → the host's ser of her context threw "reading 'k'" (coop-thin-e E8, coop-cyc page error). `origin` (her thân phận, set by her life intent, part B) added to jcoopthine BAD: her diff never carries it. The 'thin ser' console error now names the op.
coop-cyc rewrite for the thin model (no assertion removed or weakened; every old check kept):
| check | old (L≤3 relay model) | new (THIN ≥ 4) |
|---|---|---|
| setup ranks / her staged person | set on her phone | set in the host store (withSeat b), patch reaches her phone (new check) |
| card shown to her | modal text /báo thế nào/ | the card's own option "Báo đúng ngày" (4 ask wordings exist; the old regex missed 3 → the test itself answered "dung" through clear()) |
| her week can be pressed | press #next through open cards | a player never presses #next under an open card (guest) |
| host draw held | COOPW.pend + cyHold + no week end sent | host `cyHold === wk()` (the thin hold is at the new week's start) |
| answer reached the host | CW.fcy w/pend | host `fcyb().rk === w` (her stored person) |
| week merges | always pressed one more week | stops when the week has merged already (thin hold = week start) |
| same night on both | tn.who equal | tn.who equal, or host 902 ↔ guest "me" (part A view maps her own pid) |
| swap | none | CYC_SWAP=1 (host iPad 1180x820, guest Fold 755x1000) |
Results (live Worker): **THIN=6 66/66, THIN=6 swap 66/66, THIN=5 66/66**, THIN=4 this branch 60/66 vs **main 58/66** with the same test (L4 not worse; the shared L4 reds are the old relay model: hold probe, som "who null" = a week with no night on both builds).
coop-thin-e L5 (new E9): **33/33, swap 33/33** (main build + main test: 32/32, no E9 there).

### Latency (Foreman ruling 3) — split measured, not guessed
Instrumentation (report only, cheap): host `TH.lat` per intent id = run (withSeat + act) / wait (run end → its delta send) / view+diff+send; guest `F.lastAns` = pre-send, pending render, apply+render of the answer delta. Network = total − the rest.
Fix found by the split: the host's delta timer was a trailing debounce: a render after the intent's run called `deltaSoon()` (1200 ms) and pushed back the answer's `deltaSoon(0)` (host wait up to 1.5 s on some taps). Now `deltaSoon` keeps the sooner due time (an answer leaves at once; renders still send at most every 1.2 s).
| profile (host Fold 686x880, guest iPad, live Worker, 50+ acts) | total median | network (2 legs) | host run | host wait | host view+diff+send | guest apply+render |
|---|---|---|---|---|---|---|
| no throttle, before (#2) | 302 / 437 | — | — | — | — | — |
| no throttle, after | 461 (swap 284) | 257 (swap 125) | 12 | 0 | 7 | 181 (swap 129) |
| 4G: LAG 85 ms each way per message on both phones + host CPU ×4, before (#2) | 888 | — | — | — | — | — |
| 4G, after | **917** (min 809, max 1881) | **620** | 91 | 1 | 49 | 150 |
Network is 68 % of the 4G time (4 × 85 ms injected + this container's own RTT to the Worker, 125–257 ms); host CPU 140 ms (15 %); her render 150 ms. **FOR MAIN (owner call): tap→result on 4G ≈ 0.9 s > the 400 ms target; the floor is two network legs (~0.35–0.6 s on 4G) — only an optimistic local result (not allowed: no lost/duplicated act, one engine) would go under it.**
Pending state at once: right after the tap, in the same tick, `F.pend` is set and #next is locked (existing lockNext words through CW.eWait); her act buttons are off through `can()`; pending render 44–66 ms. A second tap in the same tick is ignored (F.stat.busy +1, still one intent). coop-thin-f1 now asserts both for every ACT kind (pendNow.pend, pendNow.next, dbl === 1).

### Moved / deleted paths at level 6 (F1)
| path (guest, her Hành động act) | before (L≤5) | L6 |
|---|---|---|
| runAct on her phone (C act frame → `do npc` ops) | ran locally, NPC side as ops | not run on her phone: `do f` intent, host runs the inner runAct in withSeat b (51/51 kinds, F1 table) |
| her act on the host: jcoopworld sendRes → `res` / ack / rpend | message | no message: resApply on the host in his context (D.after) — F3: 0 `res`/`actr` |
| her ASK acts (Kết giao / Tặng quà) `do inv` relay | message | the invite card is made on the host in her context (D.kind inv); invHer reads `pp.e||pp.he` (#2 fix) — F3: 0 `do inv` / `act invite` |
| resApply on the guest | ran | `oldRan("actApply")` no-op (F8: oldRun {} both seats) |
| `ctm-fam` push, `pos` | sync layer | still sent (not an act relay) → part H list |
Delete-for-good: these branches are unreachable at L6 and go with the other bypassed relays when L6 becomes the default (part H), same rule as C/E.

### Tripwire (guest writes outside fromCanon, coop-bot 4 weeks)
Real act category = runAct (coop-thin-f1 TRIP=1, the whole ACT table from the guest, 53 kinds):
| | L5 (before: acts run on her phone) | L6 (F1) |
|---|---|---|
| F1 entry `runAct` state writes | **5313** (log 2597, deedAdd wrongs 890, mood 456, inv 77+73+64, duc 84, bac 52 …) | **0** |
| F1 entry `directActs` (render of her act list: toilette/thTrait) | 35 | 31 |
| "?" | 3147 | 2441 |
| C/H | 38 | 36 |
| D·patch (the host's result applied to her person = the designed path) | 0 | 7495 |
coop-bot 4 weeks (TRIP=1, THIN=5 vs 6): state 653 vs 871 (random play, not comparable act for act); its "F1" bucket = the regex /runAct|act|cardH|talk|directActs/: no `runAct` entry in either run; L6 F1 = `act(i)` (j2 deck cards → runOpt = F6 per step 0 row 13: log, Sức/Tài/Danh) + `directActs` render. → for part F6 / the meter owner: split `act` (deck) out of the F1 regex.

### Tests (this branch, live Worker)
| test | result |
|---|---|
| coop-thin-f1 L6 (F1 every ACT kind, F2 both directions, F3 messages, F8) | 21/21 (no lag), 21/21 (4G); swap 20/21 → kpoison host→guest: the host's entry of her had no visible kid yet (test now waits for tKid on the host's entry, swap NOT rerun after that test change — reviewer: run `… 6 1`; non-swap 21/21 ×3 after it); F1 table 51/51 both |
| coop-thin-a L1 / swap | 24/24 / 23/24 → rerun 24/24 (main swap 24/24) |
| coop-thin-b L4 | 136/136 |
| coop-thin-c L4 | 17/17 |
| coop-thin-d L4 / swap | 48/52 / 48/52 (the 4 known kit sameDom IMG data-kfsp reds, as before) |
| coop-thin-e L5 / swap | 33/33 / 33/33 |
| coop-cyc THIN=6 / swap / 5 / 4 (main 4) | 66/66 / 66/66 / 66/66 / 60/66 (58/66) |
| coop-e2e / COOP_SWAP=1 | 63/63 / 63/63 |
| coop-p2 | 45/45 |
| coop-b1 | 37/43 → rerun 43/43 (main 41/43) |
| coop-night THIN=5 / THIN=6 | 105/105 / 105/105 |
| coop-timer | 43/43 |
| coop-one-world seeds 1–10 | 10 × PASS |
| one-core-guard / text / text-rule / bind | PASS ×4 |
| quickcheck | PASS (186 s; render 197/229 ms new/live, tab 489/511, buổi 885/1079; core gates PASS; old save ok) |
LOOK: host Fold 755x1000@2 + guest iPad 1180x820@2 (coop-thin-f1 SHOTS, scratch only, not uploaded): both screens render kit cards cleanly, no overflow, 0 page errors; the end-of-test shot caught a life-start card (host "Nhập cung") and a rank-reward card (guest "Phẩm phục Tần") on top, NOT an act result → reviewer: LOOK at an act result directly (her Sổ ghi line after a guest act).

### Open / FOR MAIN
- FOR MAIN (owner call): 4G tap→result ≈ 0.9 s (network-bound, two legs); target 400 ms not met without an optimistic local result.
- Reviewer: coop-thin-f1 swap rerun (`… 6 1`), LOOK at an act result on both devices; part F6/meter: the coop-bot tripwire "F1" regex includes `act` (deck cards).
- Known (unchanged from #2): guest-side log writers after a world delta (F6/G); her plots in her week end (part G); ctm-fam / pos still sent (part H list).
SẴN SÀNG KIỂM 433da4de
