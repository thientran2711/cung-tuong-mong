# coop-thin F6b — the remaining mini-game ends as ONE score intent each (level 12) — STEP 0 (report first)

PRIORITY #1 CHECK ('exDone|exSrvDone|exRun|kcPhucPlay|kc2Exam|kc2SelPlay|herGame|stealMgPlay|vlCraftRun|toilFinish|tsMkSit|wdGroomUI|tsDressHold|tsDressGame|wkDeckCard|aaMG|reg12'): OD 17/11 thin guest VERBATIM (via brief) | main 0 (no F5/F6) | review/*: review/coop-thin-f5 e6ad9a29 (base; F5 report row 13/15 lists these ends as F6), review/coop-thin-f6 NOT pushed yet (F6a worker session_01N1tNP5ex6HrG5uFmnZYTqA; its step 0 = reports/coop-thin-f6.md: family 7 = F6b, "cards whose game opens first (jsmg steal cards, jaudit aaMG) stay on the old road at L11 (mine() false) and move with F6b"), no reg12 anywhere | claims: CLAIMS row 'coop-thin F6b' (this worker).

Worker session_01N1tNP4XtuMraUEmXvATwMg (opus), coordinator FOREMAN B ROOT-5 session_01N1tNP5mhtJhZ3qE6WZHmFk. depth 6 (get_session lineage.depth, limit 8). START_CTX ≈ 4 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 29 %, ceiling 60 %.
Branch review/coop-thin-f6b STACKED on origin/review/coop-thin-f5 e6ad9a29. Worktree /home/user/wt/f6b (sparse). Level **12** (`TH.CAP` → 12; Worker THINMAX 12, local `wrangler dev` until the FOR MAIN deploy). F6a (level 11) is merged in when Foreman B says it is SẴN SÀNG KIỂM; until then this branch carries CAP 12 with level 11 = F5's road (no F6a code).

## 0a. Every F6b game end (base e6ad9a29: ALL run LOCAL on her phone at L10)
| # | game (her tap → start) | end today (score callback → what it writes) | file:line | cost path | BAL score range |
|---|---|---|---|---|---|
| 1 | Khảo hạch tấn phong (deck card exam:1, `exCard` go → exStart) | exRun rounds (kg82Play per môn, «Để tài nghệ quyết định» = exSkipRaw) → result → `exDone(S, r)` (S.ex last/cd/rank edict, log, Q) | jexam.js:203, :205-227, :157 | card c:{suc:-BAL.ex.suc} + khắc BAL.ex.k by runOpt BEFORE the game (her phone) | each môn raw BAL.mgSc.raw [0,10]; rounds = exPlan(S).rounds (count from BAL.ex) |
| 2 | Khảo hạch Nội vụ phủ (servant, deck card exam:2) | the same exRun → `exSrvDone(r)` (S.srv.ex, exSrvRise: rank / tin / Q) | jexam.js:259, :254 | same (runOpt, card c) | same |
| 3 | Phúc tuyển (tiểu thư road; her kcE card «Dâng …» / «Để tài nghệ quyết định») | kcPhucPlay (jentry override) → kcEntryExam → entExam → fin(raw) → S.kc.tt done/raw/art + pushDil Điện tuyển | jentry.js:70-73 (jkc.js:509 old body) | option fx {suc:-10} paid by chooseM on her phone (her local card) | raw [0,10]; skip = entSkipRaw() |
| 4 | Ngày tuyển cung nữ / Lễ ra mắt (kc2 d_thi, n_ramat options) | kc2Exam(art) → kc2Play → kcEntryExam → fin(raw) → S.kc.ex done/raw + `kc2Enter(raw)` | jkc2.js:361-364, :341 | option fx suc (chooseM, her phone) | raw [0,10]; "" art = entSkipRaw() |
| 5 | Tuyển chọn trước ngày phong / Tuyển cung nữ (PEND.kc2Sel, "Vào cung ngay") | kc2SelPlay(art) → kc2Play → fin(raw) → S.selx done/raw + `kc2SelDo(raw)` | jkc2.js:490-491 | option fx suc (chooseM) | raw [0,10] |
| 6 | Tranh sủng / Chặn ngự giá deck cards (j75 __steal) | jsmg act wrapper → herGame (playArt) → fin(raw,sk): stat + log + cb(up) → the real act(i) with a.o raised | jsmg.js:74-78, :56-69 | the card's runOpt (inside the real act) AFTER the game | raw [0,10]; win = raw ≥ BAL.stealMg.win (rung BAL.stealMg.rung) |
| 7 | the same two acts from her person menu (j8 doAct steal / road) | jsmg doAct wrapper → herGame → TOK + the real doAct | jsmg.js:80-85 | doAct's own cost after the game | same |
| 8 | Tự tay kết mạng che mặt (PEND.vlcraft option) | vlCraftRun(m) → playArt → fin(raw,sk) → vlCraft (the veil made: S.inv), log, Q card | jveil.js:142-146 | khắc 2 + Sức BAL.veil.craftSuc + material bạc: spent on her phone, put back by jaudit aaDefer and held (__aaPend) → aaPayMG at the end (F5 machinery) | raw [0,10]; quick = no veil, material back |
| 9 | Điểm trang trước gương (deck card a.toil `toilCard` go → toilOpen; Hành sự button jtoil:302) | 4 hồi in TOIL.st (dress, brow / powder / son / hoa điền parts) → `toilFinish(made)` (S.toilette, lxSit ration, log, kitSfx) | jtoil.js:287, :302, :315, :466-490 | card runOpt (khắc BAL.toil.khac) BEFORE the game; button path spend() on her phone | parts brow/powder/son/hd in [0,1] (toilRaw → score [0,100]); quick = kitQuickRoll |
| 10 | Chải chuốt (Y phục tab, data-wd="groom") | wdGroomUI → kg92Groom → done(zone) → spend(1) + wdGroomApply (S.wd: the worn tram / y picked) + log | j92.js:470-477 | spend(1) inside the end | zone ∈ {ok, over, under} |
| 11 | Hội phối đồ theo đề (tsDressHold panel at month 4 / 10, «Tự tay phối đồ») | tsDressGame (slot picks P, skip = maidPick roll) → tsMkSit (the mirror, TOIL.after) → finish(mine): every entrant's place, ap() on NPCs + her, bestow, log, podium | jts.js:385-399, :401; jmkt.js:159-166 | option fx {suc:-5} (tsPanel, her phone) | dress points from the picked items (tsDressPts), face = the mirror (#9 ranges) |
| 12 | Tự học deck cards (j83 wkDeckCard, jaudit aaMG) | jaudit act wrapper: a.done=1, the cost held (keep), a.go() → the lesson game → ends in F5's wkLessonEnd (already an intent at L10) | jaudit.js:307-311, j83.js:170 | held cost (aaPayMG at the end, F5) — but a.done and the hold are written on her phone | F5 wkLessonEnd ranges |
Not F6b: jmgcal (Thử tay, localStorage only), slap / nghiệm thân (D), contest rounds j34 (D / world).

## 0b. Design (level 12, on F1's TH.F.reg; F5 pattern)
- `reg12` = F5's reg10 at level 12 (+ ctx "toil" = TOIL.st as plain values, "exr" = nothing: exam plans are rebuilt on the host).
- ONE rule: **the game plays on her phone with solo parameters; nothing of hers is written there; its end is ONE intent; the host validates every score (BAL.mgSc / the game's own table), rolls every quick button, pays every cost once, then runs the end in her context.**
- Named end engines (solo-identical: the same body moved out of a closure): `exEnd(kind,raws,sk)` (#1/#2: the host rebuilds the plan exPlan / exSrvPlan in her context, fills skipped môn with exSkipRaw, scores with exFinish → exDone / exSrvDone), `kcPhucEnd(k,raw,sk)` (#3), `kc2ExamEnd(raw)` (#4), `kc2SelEnd(raw)` (#5), `stealEnd(src,raw,sk)` (#6/#7: the host runs her act(i) / doAct with herGame answered at once by the given score — jsmg's own __smgFake seam), `vlCraftEnd(m,raw,sk)` (#8, held cost paid on the host first = F5 payAA), `toilEnd(made,st)` (#9: TOIL.st parts checked [0,1], occ rebuilt on the host), `wdGroomEnd(zone)` (#10), `tsDressEnd(th,picks,sk,face)` (#11: the host rebuilds the entrants in her context), aaMG (#12): the card mark + the held cost ride the F5 end (ctx "card" {i,n}: the host marks her host-deck card done).
- Deck cards whose game opens first (#1, #2, #6, #9, #12): at L12 her tap plays the game on her phone WITHOUT running the card (no runOpt, no a.done, no e.pend in S: exRun gets a throw-away state); the end intent carries the card {i,n} + the score(s); the host runs act(i) in her context with the game answered at once from the score (injection seam per opener: exRun / herGame / toilOpen) — the card's cost is paid there once, in solo order. This is the start "riding F6a's act(i)": the host side uses F6a's card finder (deck[i] with the same name) once F6a is merged; until then a local finder with the same rule.
- Her result cards / floaters / sounds: on HER seat once (cardLater / TH.UICAP captures: kg82 result rows stay her phone's own; aaShowLast as F5); none on the host.
- Refused end (score out of range, unknown kind / card gone / cannot pay): nothing applied, nothing paid; her game closes (as a game closed unplayed).

## 0c. Tripwire / latency before
Every F6b end needs a real tap (the coop-bot never reaches them: F6 step 0 family 7 "not reached by the bot"). BEFORE = the L10/L11 column of the new dev/test/coop-thin-f6b.js with TRIP=1 (her phone runs every end locally); filled in Done.

## ROLLOVER HANDOVER #1 → #2 (worker session_01N1tNP4XtuMraUEmXvATwMg, context at the rollover line ≈ START_CTX + 25 %)
Branch review/coop-thin-f6b @ a4d77f3c (pushed; stacked on review/coop-thin-f5 e6ad9a29; F6a / f5-r1 / hostnull / main NOT merged yet — wait for Foreman B).
Commits: 4741274d (code), a4d77f3c (test + trip bucket + frame-only replays). Worktree /home/user/wt/f6b (sparse); local Worker: `cd coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1` (npm install done; THINMAX 12).
### Built (level 12)
- Game files (solo-identical named functions): jexam exPlanFull / exEnd (+ exRun records pend.sk); jkc kcPhucEnd; jentry kcPhucGame; jkc2 kc2ExamGame/kc2ExamEnd, kc2SelGame/kc2SelEnd; jveil vlCraftGame/vlCraftEnd (playArt mgEnd:12); j92 wdGroomEnd/wdGroomShow; jtoil toilFinish → toilFinShow(plain view) + toilGo (card go); jsmg seams __smgEnd / __smgOpen + window.stealIsCard / stealO0.
- jcoopthinf.js: exports F.x5 (reg10, CX10, payAA, …). jcoopthin.js CAP 12. coop/worker THINMAX 12. assemble.py adds jcoopthinf6b.js after jcoopthinf.
- jcoopthinf6b.js: reg12 = reg10 at lv 12 + ctx CX12 (toil = TOIL.st, card = her Tự học card, kgrun = the host's own KG82.run kept); registered ends exEnd, kcPhucEnd, kc2ExamEnd, kc2SelEnd, vlCraftEnd (pre payAA), wdGroomEnd, toilFinish, stealEnd (host runs act(i)/doAct with __smgFake = her score); wkLessonEnd pre marks her host-deck aaMG card done; host-in-her-context OPENER CAPTURE (exRun→exGame, kcPhucGame, kc2ExamGame, kc2SelGame, vlCraftGame, stealGame, toilGo, plus result replays wdGroomShow / toilFinShow, frame-only) → TH.UICAP, played on her phone.
### Test dev/test/coop-thin-f6b.js (L12, local Worker) — last full run before the rollover
E1 exam played (twin noInv: rank-edict gifts depend on her phone's bag, which differs from the host copy in this harness) / E2 over-max / E3 all skipped / E4 / E5, K1–K3 guards, V1–V3 veil, R1–R2 groom, M1–M3 mirror (M2 host rolls), T1/T1b/T2 steal card, A1/A1b Tự học card mark, C1/C2 host-started veil opens on HER phone + its end = one intent, D1 double end. Partial runs: all rows green except E rows being stabilised (rank align + grace staging added at a4d77f3c; see the full-run result line appended below by #1 if it landed).
### LEFT for #2
1. Re-run coop-thin-f6b L12 full; then swap (arg 3 = 1), 4G (LAG=85 CPU=4), L10 old-road column, TRIP=1 at L10 and L12 (bucket F6b; target 0).
2. NOT built: Hội phối đồ contest finish (jts tsDressHold `finish` closure → named tsDressEnd + host rebuild of entrants; the face already comes from toilFinish on the host); servant exam applied row (needs a staged servant); kc applied rows (needs a staged tiểu thư road).
3. Gates: coop-thin-a/b/c/d/e/f1–f5 at their levels (f5 L10 = 27/27 with this code), quiet scan (add reg12 roots if its regex misses them), coop-cyc THIN=12, coop-e2e + swap, one-world, one-core ×4 (PASS ×4 at 4741274d), quickcheck old save, build_site.sh (index.html / sw.js), LOOK Fold 755x1000 + iPad 1180x820 (scratch, never git).
4. After F6a is SẴN SÀNG KIỂM: merge review/coop-thin-f6 (F6a's act(i) excludes game-first cards; with it the exam / toil cards start on the host → the capture path (exGame / toilGo) opens them on her phone — test that row), reuse its card finder in place of myCard().
5. Done section: step 0 table above, moved paths table, quiet-gated emitters, tripwire, latency, tests, sha; CLAIMS row 'SẴN SÀNG KIỂM <sha>'; message Foreman B.
**Full run at a4d77f3c (L12, local Worker): 27/29.** Red: E1 (end sent once, host ran it, twin diff {} = same as solo; fails only the phone-vs-host `same` check on `inv`: her phone's bag ≠ the host copy in this harness — compare as a delta or stage her bag on the host first) and E2 (refused correctly, but the `exw!=null` check: her phone's diff after E1's rank edict rewrites S.ex on the host — re-stage the window AFTER align, or check w1 on the host copy). Both are row-staging issues to settle first in #2; no page errors; F8 clean; D1 / C1 / C2 / V / R / M / T / A / K green.

## WORK #2 (worker session_01N1tNP3uQwFDZBPxqqP6ZN8, depth 6, START_CTX ≈ 4 %) — branch review/coop-thin-f6b @ 5e49d73d (pushed)
Commits: e2c7f636 (Hội phối đồ end + rank-set fix + test staging), 63ad2dc2 (trip buckets, mktKnow, quiet-scan reg12 roots), 5e49d73d (H test).
### E1/E2 reds of #1 = staging, plus ONE real twin-state fault (fixed)
| red | cause | proof | fix |
|---|---|---|---|
| E1 `same` on inv (bag) | (a) staging: her phone's starting bag never reached the host copy in this harness (19 vs 1) | setup row "her bag staged on the host = her phone" | harness: bag copied to the host once, her phone keeps its copy |
| E1 `same` on inv after a rank-up (+10 items on her phone only) | (b) REAL: jpromo prCheck (render hook) ran on HER phone when the rank patch landed → her rank set given there a 2nd time (law 6c duplicate) | NOTWIN runs still red ⇒ not the twin | jcoopthinf6b: her phone skips prCheck at L12 (stat prSkip); the host runs exS(S) + prCheck in her context right after every reg12 end (stat prPost) → rank + set + exam record in ONE patch. Other roads that raise her rank in her context get the set at her next step there (jpromo nextBuoi wrapper). kitPersonReveal captured to her phone. |
| E1/E2 S.ex reset on her phone | (b') exS lazy reset (record moved to the next rank) ran on her phone first | E2 ops "-ex.w1 …" from her phone | same host exS call; E checks accept "rank rose" |
| twin leak (deferred) | the twin's setTimeout steps ran later on her real person | — | harness: twin deferred steps flushed on the clone |
### Built #2
- #11 Hội phối đồ: tsDressGame in her context on the host → keeps the contest closure (DH[seat] = {th, m, cb}: entrants rolled at the hold, cost {suc:-5} paid at her pick), mktKnow made there, captures `tsDressGo(th,m)` → her phone plays the board + mirror (mirror end = toilFinish intent, waited for) → ONE intent `tsDressEnd(P, sk)`: dec = every piece in her bag + fits its slot, else refused; sk ⇒ the host rolls `tsMaidPick(th)` (jts: the board's maidPick moved to a named function, same body). tsMkSit in her context on the host never opens the mirror. A contest podium in her context on the host = captured `kitPodiumP` (plain list: "me" / NPC id; cuMeet written on the host), shown on her phone. Caveat: DH is host memory — a host reload between her pick and her end ⇒ her end refused, nothing applied (borrowed pieces stay traceable with her, tsB).
- trip buckets: F6b = END engines only (asserted 0); her game on her phone = "F6b·game" (reported: jtoil leAttire probe nulls + restores S.toilette, mkSync render writers).
- quiet scan reads jcoopthinf6b.js (reg12 roots in): 32 reachable = before (no new quiet-gated emitter).
### Gates #2 (local Worker THINMAX 12)
| gate | result |
|---|---|
| coop-thin-f6b L12 | 33/33 (×2), H rows 15/15 after 5e49d73d |
| swap | 32/34: H2 = the placement-count test bug fixed in 5e49d73d; E1 swap red once (her phone suc/sung/th vs host after a "Sẵn sàng" hồi sức inside the row: numeric delta vs her unsynced state — NOT yet settled, see LEFT) |
| 4G LAG 85 CPU 4 | 33/33 · end→answer median 741 ms (max 3963) · local tap→render 79 ms |
| latency L12 LAG 0 | median 383–649 ms; local 69–87 ms |
| TRIP L12 | F6b ends = 0 (BEFORE L10: 748) · F6b·game 21 reported |
| L10 old road | 25/26: one page error kg82ShowRes null on her phone (old road, a game result after the harness closed the frame; BEFORE column only) |
| coop-thin-c L3 16/16 · d L1 46/52 (= main: 6 kit sameDom) · e L5 33/33 · f1 L6 22/22 · f2 L7 25/25 · f3 L8 37/37 · f4 L9 18/18 · f5 L10 27/27 | green |
| coop-thin-a L0 3 red (host friend entry null at L0) — rerun at L1 (F5 ran L1) pending; b L4 result not captured (grep) — rerun | pending |
| one-core ×4 | PASS |
| quiet scan | 32 reachable, reg12 roots in |
| e2e / swap, one-world, coop-cyc THIN=12 | running at the rollover (/home/user/wt/f6b-gates4.log) |

## ROLLOVER HANDOVER #2 → #3 (context ≈ START_CTX + 25 %)
Branch review/coop-thin-f6b @ 5e49d73d (pushed). Worktree /home/user/wt/f6b (sparse; index.html / sw.js built at 63ad2dc2, NOT committed — rebuild at the final sha). Local Worker: `cd coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1`.
LEFT for #3:
1. Read /home/user/wt/f6b-gates4.log (e2e, e2e swap, one-world, cyc THIN=12) or rerun; rerun coop-thin-a L1 and b L4 (`node dev/test/coop-thin-a.js http://127.0.0.1:8787 1`, `… coop-thin-b.js … 4`, read the tail).
2. Swap E1 red (once): her phone suc/sung/th ≠ host copy after a hồi sức step inside the row — decide staging (a step ran during the row: stage suc after sync / hold the clock: BAL.coopTm.buoiMs is set; check why "Sẵn sàng" fired) vs real; rerun swap ×2.
3. F6a merge when Foreman B says SẴN SÀNG KIỂM (review/coop-thin-f6, worker session_01N1tNP5ex6HrG5uFmnZYTqA); reuse its card finder instead of myCard(); test exam / toil cards started on the host (capture exGame / toilGo).
4. Not built (needs staged roads): servant exam applied row, kc applied rows (tiểu thư / kc2 roads).
5. build_site.sh at the final sha + commit index.html / sw.js; quickcheck (`bash dev/tools/quickcheck.sh`); LOOK Fold 755x1000 + iPad 1180x820 (SHOTS=<scratch outside git>, rows with o.shot; never git); Done section; CLAIMS 'SẴN SÀNG KIỂM <sha>'; message Foreman B.
### Messages that reached #2 after the handover was written (for #3, verbatim content summarised by source)
- Foreman B is now ROOT-6 = session_01N1tNP2hiwnmraLBJ9N24DU (report there). MAIN ROOT-69 session_01Rc5AsMesCGqrqL1dGjCJXv; LIVE main 2481c80d — final-merge it before READY.
- F5 LAND READY at 7f74ce44 (review/coop-thin-f5-r1, on LIVE edb2e724): merge it (via F6a when F6a is SẴN SÀNG KIỂM). F5 reviewer: the forged start/cost/score-in-range family needs the game START as an intent — cover it in F6b for the game ends F6b owns, list the rest for H.
- F6a #2 = session_01N1tNP5kNmqN7AE6fHZAd5u (review/coop-thin-f6). Its __g HOOK (dev/build/jcoopthinf.js F6a block): TH.gKinds = {exam, toil, aaMG, steal} predicates; TH.gLift[kind] = level. A kind stays old road (card.__g, act intent refuses it) until F6b sets e.g. TH.gLift.exam=12; from on(12) that card is a plain host card, its tap rides reg11 "act" (host runs act(i) in her ctx → the game opens host-side in her ctx → F6b's capture (exGame / toilGo / stealGame) must take over). New kind: TH.gKinds.x=pred. F6a will send its SSK sha.

## WORK #3 (worker session_01N1tNP3ZKhXs5gAeKLeNMoh, depth 7 of 8, START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover ≈ 28 %)
PRIORITY #1 CHECK ('reg12|gLift|gKinds|f6bStart|F.PRE'): OD 0 | ledger 0 | claims 4 (F6a #2 RUNNING, F5 r1 PASS) | main 0 | review/*: review/coop-thin-f6 ea367ecb (TH.gKinds/gLift hook), review/coop-thin-f5-r1 7f74ce44 | archive 0.
- 5e49d73d (#2's H test commit) was NEVER on the remote (lost with #2's container): redone as 52db781b (H rows count only the logs written in the row, S.logSeq; the old count saw H1's placement line in H2).
- Gate at 52db781b (before merges): coop-thin-f6b L12 **33/33** (latency n=19 median 536 ms, max 1407); H rows 14/14.
- Merged: review/coop-thin-f5-r1 7f74ce44 (F5 LAND READY, carries LIVE edb2e724) = 14b5e9dc; review/coop-thin-f6 ea367ecb (F6a, NOT yet SSK — merged early to build the lift; re-merge its SSK sha) = 924a7e90 (conflicts: Worker THINMAX → 12, TH.CAP → 12 comment, jcoopthinf.js F6a block + F.x5 export both kept).
- START AS AN INTENT (F5 reviewer family, for the F6b ends): host start tokens per seat (F.f6bStart): exam (exGame capture, kind me/srv), toil (toilGo), veil (vlCraftGame). A LIFTED kind's end only after its host start, once (exEnd, toilFinish; toilFinish also accepts the Hội phối đồ face = DH). vlCraftEnd: refused with no host start AND no held solo cost (khắc ≥ VL.craftK, Sức ≤ -VL.craftSuc; the material is paid by vlCraft in the end) — a forged end was a free veil (payAA paid nothing). VL.craftK = the veil's 2 khắc (was typed in 4 places). tsDressEnd = DH (host start), stealEnd = the host runs the card at the end (cost there), kc ends = the kc windows opened on the host: already covered.
- LIFT: TH.gLift.exam / toil / steal = 12 (F6a hook). aaMG NOT lifted (its lesson picker would open on the host: no capture yet) → H.
- Fixes found on the lifted road: (1) F6a's act intent runs PRE.act on the host = below every window wrapper → F6b's steal wrapper never ran there (the card ran without its game). Now jcoopthinf exports F.PRE and F6b wraps F.PRE.act / doAct too. (2) cap() dropped a capture when uiCap held ≥ 12 → always unshift + trim. (3) her phone: the half result card (cardLater → resultShow) closed the game opened by the act answer → skipped once (noCard, 2 s) for exGame / stealGame / toilGo replays. (4) her phone: a replayed opener ran inside the view apply (gOn false → exRun took the old road, no kg82go) → now on the next tick (b08d3375; NOT yet tested: /home/user/wt/t2.log = ROWS=T1,L1 run started at the rollover).
- Test rows added: L1 (her exam deck card, lifted: act(i) on the host pays Sức once, game on HER phone, ONE end), L2 (forged exEnd, lifted: refused), M4 (forged mirror end, lifted: refused), V4 (forged vlCraftEnd: refused); E1/E3/M1/M2 stage the host start token (TOK) because they open the game on her phone directly; harness o.pre2 (a step after the start's own intent came back); reset() clears the tokens. DBG hooks (G console errors, host tapRun ui) only with DBG=1.
### Last full run on the merged tree (726a24d0 code minus fix 4): coop-thin-f6b L12 33/37
RED: L1 (game not open at pre2: answer carried exGame, played, but exRun took the old road → fix 4), T1 + T1b (same: stealGame played inside the view apply → fix 4), A1b (her host-deck Tự học card not marked done after A1 green: with F6a her hand is the host's plain hand; check whether the lesson's khắc stepped the buổi and the hand was re-dealt (then the row's check must look at the old hand / B.hk), else HCARD → myCard on the host). Green: E1–E5, L2, K1–K3, V1–V4, R, M1–M4, T2, A1, C1, C2, H1–H3, D1, F8, no page errors.
Other gates at the merged tree: one-world PASS; quiet scan 32 reachable (= before); one-core guard / bind / text / text-rule PASS. .tmp/old.html (origin/main build for coop-cyc) built in /home/user/wt/f6bm.

## ROLLOVER HANDOVER #3 → #4 (context ≈ START_CTX + 25 %)
Branch review/coop-thin-f6b @ b08d3375 (pushed). Worktree /home/user/wt/f6bm (sparse, detached at b08d3375; /home/user/wt/f6b = old pre-merge tree, delete). Local Worker running: `cd /home/user/wt/f6b/coop/worker && npx wrangler dev --port 8787 --ip 127.0.0.1` (THINMAX 12; restart from f6bm/coop/worker if the container is new: npm install first).
LEFT for #4:
1. Fix 4 VERIFIED at b08d3375: ROWS=T1,L1 = 12/12 (L1 826 ms, T1 817 ms, T1b card done). Next: A1b (see above); then full L12 + swap ×2 + 4G (LAG=85 CPU=4) + TRIP=1 (bucket F6b = 0).
2. When Foreman B says F6a is SẴN SÀNG KIỂM: merge its SSK sha (review/coop-thin-f6) over 924a7e90; rerun.
3. coop-thin-a L1 (`node dev/test/coop-thin-a.js http://127.0.0.1:8787 1`) and b L4; c/d/e/f1–f5 + f6 (F6a's own test at L11) at their levels; e2e + swap, coop-cyc (old.html built), one-world, one-core ×4, quiet scan; quickcheck (`bash dev/tools/quickcheck.sh`).
4. Swap E1 flake of #2 (her phone suc/sung/th vs host after a hồi sức step inside the row) — re-check on the merged tree.
5. Remove the DBG pre2 dumps if noisy (they only print on a red row); build_site.sh at the final sha + commit index.html / sw.js; LOOK Fold 755x1000 + iPad 1180x820 (SHOTS=<scratch>, never git); '## Done' section (step 0 table, moved paths, quiet-gated emitters, tripwire, latency, tests, sha + the H list below); CLAIMS 'SẴN SÀNG KIỂM <sha>'; message Foreman B.
### For H (the forged start family, NOT covered by F6b)
- aaMG Tự học work cards: start (a.done + held cost) on her phone; the lesson end (F5 wkLessonEnd) takes her held cost as sent (a zero cost is accepted) → capture the lesson picker on the host + lift aaMG + check the held cost against BAL (as vlHeld).
- jtoil top-row button with NO toil card (jtoil.js click handler: spend(BAL.toil.khac) + toilOpen on her phone): with toil lifted its end is refused (no host start) → she plays for nothing (her local khắc is not canon) → make that start an intent on the host.
- F5's own ends (petcGain, shelfPlantGain, wkLessonEnd, tdFinish, tsSummonEnd, tsDenEnd): held / start costs as sent by her phone.
- F6a RDIFF already runs prCheck on the host at her ctx close; F6b's prSkip / prPost (her rank set) overlap it (idempotent) — H may drop one.

## WORK #4 (worker session_01N1tNP3pjtkkD3B4ih64gjM, depth 7 of 8, START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate))
PRIORITY #1 CHECK ('myCard|aaMG|gHand|hDeal|seatDrop|ordQ|ptime'): OD 0 | ledger 0 | claims 6 (F6a #3 62bajsTW SSK d8d8447f; coop-ptime-reds 4mYCDDrF; runact-sv-fix) | main 801b86b7 → 1a4df595 → c02748c2 (parallel-time, receiver-choice) | review/*: coop-thin-f5-r1 9b46e1ad, coop-thin-f6 d8d8447f | archive 0.
- Merged: LIVE main 801b86b7 (f5cfdd3a), review/coop-thin-f5-r1 9b46e1ad (F5 LAND READY, carries LIVE 1a4df595; fedde6ef), review/coop-thin-f6 d8d8447f (F6a SSK: used-clock keep in seatDrop, RDIFF stand-in restore), LIVE main c02748c2 (06baef69). Every merge: only index.html / sw.js conflicted → rebuilt by build_site.sh.
- Fix (5b2cb906): A1b — her Tự học (aaMG) card was not marked used on the host. Cause: aaMG is still F6a's old road (__g): F6a gHand shows HER OWN aaMG card in the host's slot (by name, else ANY aaMG card of hers — another subject, another name) → F6b's myCard looked the host card up by her name and missed. Now her phone sends {i, n, aa:1}; myCard falls back to the host's aaMG card in that slot, else the first unused aaMG card. ×3 green. (For H: her phone can show another Tự học subject than the host's card in that slot — the lesson applied is hers; lift aaMG to end it.)
- Test fixes: T1b accepts a new hand dealt by the card's own khắc (F6a deals her new buổi hand as her context closes — solo rule); A1 taps her Tự học card by its slot (a standing / mood card can be dealt in front of it) and prints her hand when no game opens; PROF=1 prints the host's time per part of her intent; coop-thin-b prints the withSeat round-trip diff paths on a red row.
- 4G 5× (Foreman B flag): at fedde6ef (before F6a SSK) 4G median 3943 ms; same rows on 930ad0cb 3930–4260 ms while the host's own work per intent was not larger (PROF: withSeat avg 64 ms, flush 28 ms) → the extra ~3.3 s was a WAIT, not host CPU; that tree also showed her side "Chờ hảo hữu" vs host "Sẵn sàng" at setup = the `used` clock drift F6a fixed in d8d8447f. At 06baef69: 4G median **775 ms** (min 654, max 3514, n=23) ≈ #2's 741 ms; PROF at 06baef69: withSeat avg 36 ms (max 160), ctxOut avg 5 ms, flush avg 22 ms, hostView avg 7 ms.

## Done — SẴN SÀNG KIỂM dcda88d7 (review/coop-thin-f6b; local Worker THINMAX 12 — FOR MAIN: Worker deploy before level 12 can be switched on)
Code = 06baef69 (+ test-only commits 9d40c959, dcda88d7). Gates on 06baef69 / dcda88d7, local wrangler dev:
| gate | result |
|---|---|
| coop-thin-f6b L12 | 37/37 (×2) · latency median 559 ms (max 832); local tap→render 81 ms |
| coop-thin-f6b L12 swap | 37/37 ×3 of 4 (one run: A1 her Tự học card did not open — fixed the slot tap, diag added, not seen since); latency median 174–448 ms |
| coop-thin-f6b 4G (LAG 85, CPU ×4) | 37/37 · median 775 ms (see WORK #4) |
| TRIP L12 | F6b end writes on her phone = **0** · F6b·game 15 (her game, reported: wdOf / leAttire / mktKnow) |
| coop-thin-a L1 · c L3 · e L5 · f4 L9 · f5 L10 · f6 L11 | 24/24 · 16/16 · 33/33 · 18/18 · 30/30 · 38/38 |
| coop-thin-b L4 | 136/136 ×3 of 5 (2 reds, each a different row: host own person / withSeat round trip; main c02748c2 3/3 green) — FLAKE, diag paths now print; reviewer: watch it |
| coop-thin-d L1 | 3 red = **the same 3 on main c02748c2** (kit thInv img sp, Thân sơ patch, Quà tặng giftin) → inherited |
| coop-thin-f1 L6 | 20/22: F2 gift ×2 — **inherited, owned by coop-ptime-reds** (main c02748c2: 18/24 incl. the j29 `sv` ReferenceError = runact-sv-fix) |
| coop-thin-f2 L7 | 24/25: P5 invite (her khắc) — same family (receiver-choice / ptime), inherited, owned by coop-ptime-reds |
| coop-thin-f3 L8 | 31/37 → G1 ×2 green on rerun (the red run: the consort returned the gift = a roll); X1/X2 gift — **inherited, owned by coop-ptime-reds** (main c02748c2: 35/38, same X1/X2) |
| coop-e2e / COOP_SWAP=1 | 68/68 / 68/68 |
| coop-cyc THIN=12 | 73/73 (one earlier run 71/73 'giau' host drew nobody — not reproduced) |
| coop-timer THIN=12 · coop-night THIN=12 | 43/43 · 105/105 |
| one-world | PASS |
| one-core guard / bind / text / text-rule | PASS ×4 |
| quiet scan | 41 global-quiet reads, 32 reachable (= before) |
| quickcheck | PASS (open 1284 ms, old save ok, perf new/live render 186/204, buổi 1233/950 ms) |
| LOOK Fold 755x1000 + iPad 1180x820 (V1 veil, M1 mirror) | her result cards on HER iPad only (kit cards), host Fold shows only its own screen. Note: in the SHOTS run her E1 promotion scroll (Thánh chỉ → Tần) showed over the V1 veil result (the harness closes her modals between rows; check in review) and one kg82ShowRes null page error after the shot step closed the game frame (shot harness only; non-shot runs 0 page errors). Shots in scratch only, never git. |
Step 0 table / moved paths / quiet-gated emitters / tripwire: sections 0a–0c + WORK #2 / #3 above (unchanged). Start-as-intent tokens and the lift (TH.gLift exam / toil / steal = 12): WORK #3.
### For H (NOT covered by F6b)
- aaMG lift (lesson picker capture on the host + held cost check vs BAL); until then her phone may show another Tự học subject in the host's slot (F6a gHand any-aaMG fallback).
- jtoil top-row button without a toil card (start on her phone: refused at the end when lifted) → make that start an intent.
- F5's own ends (petcGain, shelfPlantGain, wkLessonEnd, tdFinish, tsSummonEnd, tsDenEnd): held / start costs as sent by her phone.
- F6a RDIFF prCheck vs F6b prSkip / prPost overlap (idempotent) — drop one.
- Merge coop-ptime-reds (session_01N1tNP4mYCDDrFNfWP327T3) and review/coop-thin-f6-r1 final sha when Foreman B sends them.

## REVIEW r1 — reviewer session_01N1tNP3MvM7Uixh5xp1DqdQ (opus BIG), depth 8 (= limit: no children; did the fixes itself, as Foreman B ROOT-7 asked)
PRIORITY #1 CHECK ('coop-thin-f6b review'): OD 0 | ledger 0 | claims: REVIEW row (this session) | main 2bda29a1 (no F5/F6) | review/*: coop-thin-f6b dcda88d7 (reviewed), coop-thin-f6-r1 be2a8fcc → 389da198 (F6a land sha, merged here) | archive 0.
START_CTX ≈ 4 % of 1M (used_tokens reads 0; estimate) → rollover ≈ 29 %; finished below it.
Branch review/coop-thin-f6b-r1 = dcda88d7 + merge origin/main 2bda29a1 (6e9445c8) + fixes R-a/R-b (153e8621) + merge be2a8fcc (4cdf69e2) + fix R-c (23dba2e2, de419976) + FAST PATH merge review/coop-thin-f6-r1 389da198 (a595b547) + test tweak V6 (ce5d81f1) + FAST PATH merge origin/main 3584ea42 (e54ed05d) + origin/main 71e7b382 (**6194dd6a**; only index.html / sw.js / assets.json conflicted, rebuilt by build_site.sh; the 71e7b382 step changes no code: j29 identical, same shell hash).

### Fixed here (blocking; before → after)
| # | finding | before (old build) | after |
|---|---|---|---|
| R-a | vlCraftEnd `vlHeld` checked the held khắc + Sức only, not the held bạc: vlCraftEnd gives the option's material back and vlCraft pays it once, so a held cost with bạc 0 made a «Kết bằng ngọc» veil (45 bạc) with NO material paid (law 4/6c: an item for a cost below BAL) | new row V5 **applied** (swap + 4G runs on the old build) | vlHeld also needs bạc ≤ -VL.mat[m]: V5 refused, nothing made or paid |
| R-b | wdGroomEnd had no khắc check (its end runs spend(1)); solo wdGroomUI never opens the game without khắc | new row R3 **applied** with her khắc clock full | dec refuses unless can(1): R3 refused |
| R-c | LAW 3 (cost-only path, not in the H list): a LIFTED exam pays its start (Sức BAL.ex.suc + khắc BAL.ex.k) on the host in act(i), but the host kept NO pending record (the exRun wrapper returned before e.pend; her phone ran on a throw-away state). Her reload / app kill mid-exam = cost paid, no result, the window still open → the exam card re-dealt next buổi (pay again). Solo: e.pend survives a reload and exTick / exSrvTick exAbort finishes it (môn played + exSkipRaw). Same family: a host-started veil (PEND.vlcraft picked in her context) paid khắc + Sức + material at the start, abandoned = paid, nothing (solo defers it). | no row (code path: exRun hctx branch / vlCraftGame capture) | the host keeps the start IN HER STATE (exam: e.pend {raws, sk, co} as solo exRun; veil: S.vlPend {m, co}); her exTick / exSrvTick are skipped while it is pending (the host's own #kg82 says nothing about her game); exEnd accepts the pending record as its start (survives a host reload, token kept as before); her phone keeps the môn played in localStorage (room + seat + start id) and, when a start is pending in her view with no game of hers running for 3 s (reload / app kill / her end dropped), sends the solo end once (exam: the môn played + exSkipRaw = solo exAbort; veil: «Kết nhanh», material back); resend after 20 s if still pending. Rows **L3** (exam, page gone after môn 1: ONE end, môn 1 kept, start paid once, window closed) and **V6** (host-started veil, page gone: ONE Kết nhanh end, bạc back, record cleared) green. The page-gone step is simulated (game frame closed + her flags dropped, localStorage kept), not a real page reload. |

### Checks (brief items 1–7)
1. Start + end once on the host, her phone only renders: L1 (her exam card lifted: act(i) on the host pays once, the game opens on HER phone, ONE end), T1/T1b steal card, C1/C2 host-started veil, M rows mirror, H1–H3 Hội phối đồ; D1 double end = one intent; resend/reconnect = F DONE dedupe (F5/F6a), now plus R-c for a page gone mid-game.
2. Every cost / score from BAL on the host; both seats read the host number (`same` check, twin = solo in every applied row); khắc once (L1 suc 80-BAL.ex.suc; R1 used +1). one-core guard / bind / text / text-rule PASS.
3. Forged / out of range refused, nothing applied: E2 / L2 / M4 / V3 / V4 / V5 / R2 / R3 / K1–K3 / E4 / E5. No item lost / duplicated: veil / mirror / dress rows trace every piece (law 6c). Orphans vs the report's H list: none left (R-a/R-b/R-c fixed here); in-range forged scores stay the F5 class (FOR B).
4. Her result cards / sounds once on her phone, none on the host: hostCard false every row; LOOK below.
5. Gate: TH.on(12) only when both seats run L12 (Worker min); every F6b wrapper (and the new R-c ones) checks on(); f6b at L10 = old road 29/29; f6 L11 38/38 ×2 + swap; f5 L10 30/30; TRIP F6b end writes = 0 (3 runs).
6. Latency (local wrangler): LAG 0 median 571–631 ms; 4G (LAG 85 + host CPU ×4) median **822 / 1436 / 1556** over 3 runs (min 623–1077, max 2.6–2.9 s); LAG 85 alone 1232; CPU ×4 alone 552 (= LAG 0). Cause = the simulated network hops (about two lagged round trips per end) and run-to-run phase noise, NOT host CPU (PROF at 4G: withSeat avg 40 ms, flush 24–26, hostView 7, ctxOut 4 per intent). The worker's 775 is inside that range. No 3.9 s cluster in any run: the earlier 5× was the `used` drift F6a fixed (d8d8447f), confirmed.
7. LOOK (scratch only, never git / CDN; deleted): host Fold 755x1000@2 after her veil / mirror end shows only its own screen (his Nhập cung reveal over his entry selection) — nothing of hers; guest iPad 1180x820@2: her mirror result card «Điểm trang: Trước gương đồng» (kit rows, kit chips, cổ trang words, no %), her veil row under the test's staged bag pop-up «Rương đồ» (staging, as F5 r1). The mirror figure shows the grey placeholder silhouette (art not loaded in the local harness; not F6b).
Laws: 3 ✓ (R-c fixed) · 4 ✓ (R-a, one-core ×4) · 5 ✓ (solo parameters on her phone) · 6c ✓ (R-a, traced pieces) · 7 no new player word · 9–12 no UI part changed · 1/2/6ab/8/13–18 not touched.

### Gates (local wrangler dev THINMAX 12 unless "live"; final = a595b547 code)
| gate | result |
|---|---|
| coop-thin-f6b L12 / swap / 4G / TRIP | 41/41 / 42/42 / 41/41 / TRIP F6b 0 (E1 red only under TRIP=1, 3/3, also on dcda88d7+main before any fix: her phone's view of suc/sung lags under the trip instrumentation; twin diff {} — harness, watch) |
| coop-thin-f6b L10 (old road) | 29/29 |
| hostnull · f6 L11 + swap · f5 L10 | 15/15 · 38/38 + 38/38 · 30/30 |
| f1 L12 / swap | 20/23 ×2, 18/22 swap: F2 gift ×2 = inherited (main 2bda29a1 same + the j29 sv reds, fixed by F6a-r1); **F2 host→guest laydo (steal): actor bag +2 / target −1** — red ×3 here AND on review/coop-thin-f6-r1 389da198 alone (F6b off at L11) → comes with F6a-r1 / hostnull, NOT F6b: FOR B (F6a reviewer / hostnull owner, law 6c candidate). Swap once: 'a real tap (doAct): her result card once the answer landed' (1 of 2) |
| f2 L12 + swap | 24/25 ×2: P5 invite = inherited (main same) |
| f3 L12 + swap | B1 first row (her rank set given on the host in her context at her first intent: F6a RDIFF / F6b prPost, the twin has no set) · G1 consort «trả lại» the gift (receiver-choice roll) · X1/X2 = inherited (main same) |
| f4 L12 + swap / L11 | 17/18: P1 first row = the same rank-set staging; red at L11 too (F6b off) → not F6b |
| coop-thin a L1 · b L4 · c L3 · d L1 · e L5 · e-net L6 (live) | 24/24 · 136/136 (8 reds once beside a parallel run, then green) · 16/16 · 3 red (main 2 red; see below) · 33/33 · 20/20 |
| quiet scan | 41 quiet reads, 32 reachable (= before) |
| coop-cyc THIN=12 / 11 / 12 swap | 73/73 / 73/73 / 73/73 then 71/73 once ('giau' host drew nobody = the worker's known flake) — mixed part vs .tmp/old.html = main 2bda29a1 dev build |
| coop-e2e / swap · p2 (live) · night · timer | 68/68 / 68/68 · 45/45 · 105/105 · 43/43 |
| one-world seeds 1–10 · one-core ×4 · Worker npm test | 10 × PASS · PASS ×4 · thin ALL OK |
| on the final head (main 3584ea42 merged; 71e7b382 = no code change) | f6b L12 41/41 · swap 41/41 · f6 L11 40/40 · e2e 68/68 · one-core ×4 PASS · manifest guard PASS |
| quickcheck | steps PASS (open ~1.5 s no errors, old save loads + plays a buổi, perf new/live render 230/233, tab 398/410, buổi 1062/962 ms); on a595b547 the core gate G4 manifest-guard failed = the CDN FIGURES-kc floor, red on main 2bda29a1 too; main 3584ea42 lowered the floor → PASS on the final head |

### Inherited reds (identical on LIVE main, NOT a FAIL)
f1 F2 gift ×2 (main same) · f2 P5 invite (main same) · f3 X1/X2 (main same), G1 consort returns the gift (receiver-choice roll) · d L1: kit thInv + Quà tặng giftin on main ×2 runs, «Thân sơ» patch red in 1 of 2 runs on BOTH branch and main · b L4 flake: 8 reds once under a parallel run, 136/136 alone · f3 B1 / f4 P1 first row (her rank set given on the host at her first intent; red on F6a 389da198 alone too).
### FOR B / H
- F2 host→guest laydo red comes with F6a-r1 389da198 (above) — owner F6a reviewer / hostnull.
- Her rank set: the host gives it at her FIRST intent (F6a RDIFF / F6b prPost), not at her join → f3 B1 / f4 P1 twin rows red; give it at seat creation, or stage it in the tests (H).
- E1 under TRIP=1: her phone's view of suc / sung lags behind the host's stage (harness watch).
- Still H (unchanged from the report's list): aaMG lift, the jtoil top-row start without a card, F5's held costs as sent, prSkip/prPost vs F6a RDIFF overlap; in-range forged scores (F5 class).
FOR MAIN: deploy the Worker with THINMAX 12 at landing (all L12 runs used a local wrangler dev).
LOOK shots: scratch only (never git, never uploaded to the CDN, so img/_review/coop-thin-f6b/ was never created); deleted after the verdict.
**VERDICT: PASS review/coop-thin-f6b-r1 6194dd6a** (descends from origin/main 71e7b382, re-fetched right before the push, and from review/coop-thin-f6-r1 389da198).
