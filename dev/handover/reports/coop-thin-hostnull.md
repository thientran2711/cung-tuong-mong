# coop-thin hostnull — host:null repaint + reveal flips + effect cap + walk sounds/scenes (+ (e) accepted gifts), whole family

PRIORITY #1 CHECK ('coop-thin host:null repaint'): OD 17/11 thin guest VERBATIM + L1487/L1489/L1493/L1494 (brief) | main 0 | review/* none (gaps raised in reports/coop-thin-f4.md '## REVIEW r1' FOR B + reports/coop-thin-f2.md 'REVIEW r2 — HANDOVER'; F3 reviewer FOR B 1 for (e)) | claims B chain only (row 'coop-thin hostnull fix').

Worker #1 session_01N1tNP4i9JQenzqhXnbDaGx (opus), child of Foreman B ROOT-5 session_01N1tNP5mhtJhZ3qE6WZHmFk. **depth 6** (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens read 0 at start; estimate) → rollover at ≈ 28 %, ceiling 60 %. Rolled at ≈ 31 % (see the HANDOVER at the end).
Branch **review/coop-thin-hostnull @ 20a1f54f** (pushed) = origin/review/coop-thin-f4-r1 d913db71 + 699c60c1 (a/b/c/e) + 5613d919 (d) + merge **d9b32074 (F4 final, Foreman B 09:15Z)** + 20a1f54f (test). Worktree /home/user/wt/hostnull; before-build worktree /home/user/wt/hn-before (d913db71 + the new tests); logs /home/user/wt/hn-out.

## STEP 0
### (a) every TH.F.reg registration and its host repaint (jcoopthinf.js, base d913db71)
| registration | file:line | host hook | paints the host's DOM in her context (dynamic scan, before) |
|---|---|---|---|
| runAct | jcoopthinf.js:134 | none | #game (rare) |
| goTo / visitPal / goSee / accEtqGo / accAsk / accSneak / srvGoTo / kcGo | :179–193 (W7) | herMoved = D.after(keepFriendPos + refreshHere) → afterRun render | goTo / accEtqGo / visitPal: #stage #tokens #kshR #krail #game #k3room #j59metag … #popw (repainted only because of herMoved) |
| **talk** | :189 | **host:null** | **#popw ×60, #stage, #tokens, #kshR, #krail, #game … — no repaint: his screen showed HER pop-up / her people** |
| **scout, invite** | :190 | **host:null** | none in the runs seen (render is a no-op) — but her face reveal state leaked (b) |
| reg8 F3 (useItem … tdGiftGo, 26) | :237–275 | none | none |
| reg9 F4 (petDo … tdsRun, 8) | :302–310 | none | none |
| also (same tap-run family, not TH.F.reg): part D pick (chooseM in her context, jcoopthin.js:439) | | none | **#modal** (the host's own modal) |
| part E her buổi step (jcoopthine.js:148) | | none | **#tokens ×132, #stage ×87, #game, #j59metag, #mefig …** |
→ the family = every run through TH.tapRun, not only the three host:null rows.

### (b) reveal / flip / sound / scene emitters reached by her runs (screen gates "off" in her context, dynamic)
| emitter | where | reached by | before |
|---|---|---|---|
| krvFlip (face reveal) | jreveal.js:30 (via k61Know / k61Meet wrapper :31) | goTo, accEtqGo, talk, tdGiftGo, D pick | her flip set the HOST's KRV state (host could replay her reveal on his next paint); her phone saw it only if the grey face was already on her screen |
| krvTick | jreveal.js:46 | same | gated (fine: her own render runs it) |
| kpmGo (stage figure moves: slap/drag/poison/thread …) | jpres.js:124; act wrapper :135 (setTimeout 450 ms) | runAct (kpmOn<kpmGo ×5) | gated in her context AND the act wrapper's TIMER ran later OUTSIDE her context → **her act's move played on the HOST's stage** (H4 before: hostMoves 1), never on hers |
| kpmOn<renderStage | jpres.js:153 | every walk / talk / E step | her own render plays it on her phone (no capture needed) |
| flip scene (Lật thẻ bài) | jflip.js:246 `want()` | D pick (want<flip) | not shown on her phone |
| sfx / kitSfx / kitStatGlow / kitResultFx / kitGloom / kmPush | — | NOOP drop list over f1–f4 + hostnull: no sfx / kitGloom / kitResultFx call in any run; kmPush ×1 once in an F1 run (not reproduced in the after runs; caller logging added) | kitSfx already UICAP (F3 r1) |
### (c) cap sites
jcoopthinf.js:112 `out.ui=ui.slice(0,4)` (the answer) · jcoopthin.js:200 tapRun `ui.slice(0,12)` · jcoopthin.js:204 NOOP capture `TH.uiCap.length<12` · jcoopthinf.js:295 UI9 `<12` · :298 petcGrowCard `<12`. E.eui and the D pick ui use tapRun's list (same cap).

## FIX (one place per family)
- **(a) jcoopthin TH.tapRun**: a MutationObserver (takeRecords = synchronous, no painter list to keep) around every outer tap run of the other seat on the host; any host DOM written → `TH.paintN++` + `D.after(()=>{})` → afterRun renders the host's screen from HIS state when her context closes. Covers every F registration (talk / scout / invite included), D picks and E steps. Walk hook herMoved unchanged.
- **(b) jcoopthin krvFlip wrapper**: in any other seat's context it never touches the host's KRV; inside her tap run it is captured (`["krvFlip",[key]]`, UICAP) and played by her own krvFlip (the reveal window dedupes the flip her render also finds) → once.
- **(c) ONE cap rule, BAL.coopUi {batch:4, gapMs:900}** (jbal2.js): every capture keeps all effects (no slice / length cap anywhere); TH.uiPlay queues them and plays `batch` at once, the rest `gapMs` later batch by batch — never dropped. Play starts after every listener of the same view (setTimeout 0: her patch + render first).
- **(d)** jcoopthin kpmGo wrapper: in her context → captured as `["kpmPlay",[m,ref,ref]]` (her = "me", the other player = "f", NPC = id), played on HER stage (window.kpmPlay resolves in her world); jpres act wrapper: inside a context the move is taken at once (captured), never by the later timer on the host. jflip: her flip in her context → `["cfShow",[]]` → her phone plays the scene from her own S.nightWhy.
- **(e) law 1** (Foreman B 09:02Z): `window.coopAccepted(t)` (jcoopworld: CW.inv && isF(t)) — an ASK act the other PLAYER accepted is never refused afterwards: jdis dislike refusal skipped; j8 Kết giao "lạnh nhạt" roll skipped (whole family scan of every giveTo / wkGive wrapper: the only other roll is j8 giveTo's tainted-gift detection oSee = real evidence, law 6a, kept). NPC targets unchanged.
Touched: dev/build/jcoopthin.js, jcoopthinf.js, jbal2.js, jcoopworld.js, jdis.js, j8.js, jpres.js, jflip.js; tests dev/test/coop-thin-hostnull.js (new), coop-thin-uiscan.js (new, host preload + report), coop-thin-f1/f2/f3/f4.js (UISCAN hook only).

## RESULTS so far
### coop-thin-hostnull (new; live Worker, L9) — before (d913db71) vs after
| check | before | after L9 | after swap |
|---|---|---|---|
| H1 talk: host screen = his own state | **FAIL** (his #popw showed HER person card, a token missing) | ok | ok |
| H1 scout / invite (khắc +1 as solo, host screen his) | ok | ok | ok |
| H2 face reveal once on her phone, none on host | **FAIL** (host KRV got her key "x3") / flaky | ok (flips 1, host 0) | ok |
| H3 7 effects in one run | **FAIL** (4 arrived, 3 lost) | ok (7, in order, 4 then +900 ms) | ok |
| H4 her act's figure move | **FAIL** (on HOST stage, 0 on hers) | ok (= solo count 2, host 0) | ok |
| H5 law 1 gift / Kết giao accepted | **FAIL** ("không nhận…", "lạnh nhạt") | ok (NPC still refused) | ok |
| total | 7/11 | **12/12** | **11/11** (+H8 no page errors) |
### Suites with the UI scan (after = build 699c60c1, i.e. a/b/c/e; (d) added after — rerun pending)
coop-thin-f1 L9 22/22 · f2 L9 25/25 · f3 L9 37/37 · f4 L9 19/19 (before: 22/22, 25/25, 37/37, 18/18).
Family table after (key columns): every run that wrote host DOM now has host repaint = its runs (talk 3/3, accEtqGo 3/3, visitPal 1/1, goTo 40/40, E step 4/5 dom runs, D pick 2/2 #modal); flips captured: goTo 2, accEtqGo 6, D pick 2; lost (cap) 0 everywhere; ui max seen 7 (H3 staging) / 5 (runAct) — the old answer cap (4) would have lost runAct's 5th.
one-core-guard / text / text-rule / bind: PASS ×4 (on 699c60c1).

## ROLLOVER HANDOVER #1 → #2 (11/19/2026, context ≈ 31 % ≥ START 3 % + 25 %) — Foreman B opens the successor
Branch review/coop-thin-hostnull @ 20a1f54f (pushed). Generated files NOT rebuilt for the branch yet (only assemble run locally): run `python3 dev/build/assemble.py && bash dev/site/build_site.sh` and commit index.html / sw.js / assets.json before quickcheck.
Runs: `UISCAN=<out>/x.json node dev/test/coop-thin-<f1|f2|f3|f4|hostnull>.js https://ctm-coop.victoria-tntt.workers.dev 9 [1]`; table: `node dev/test/coop-thin-uiscan.js <out>/*.json`. Before build: /home/user/wt/hn-before (d913db71 + new tests; may be lost — recreate as a sparse detached worktree at d913db71 and copy the two new test files).
Left, in order:
1. Rerun the UI scan over f1–f4 L9 + hostnull on the final build (includes (d)): expect kpmPlay captured in runAct rows, cfShow in D pick rows, no `kpmOn<kpmGo` / `want<flip` gate rows; paste the after table here (tab-before.md exists in /home/user/wt/hn-out).
2. Swaps: f1–f4 L9 `… 9 1`; levels: coop-thin-a L1 / b L4 / c L4 / d L4 (known 6 kit sameDom reds = main) / e L5 (+swap) / e-net L6, coop-thin quiet scan (`NODE_PATH=<acorn dir> node dev/test/coop-thin-quiet-scan.js`), coop-cyc THIN=9 (+CYC_SWAP=1; the 'mixed' red = main, see f4 review), coop-e2e (+COOP_SWAP=1), coop-p2, coop-night, coop-timer, coop-one-world seeds 1–10, quickcheck (old save), 4G latency (`LAG=85 CPU=4` on f2 or hostnull), tripwire (`TRIP=1` on f2/f3: guest writes for these acts stay 0).
3. Check under parallel load: the host repaint adds one host render after talk / E step / D pick runs that touched his DOM (jlogsync note in jcoopthinf:174 — watch f1/f2 log-only reds; none seen in the 4 after runs).
4. LOOK (scratch only): host Fold 755x1000@2 + guest iPad 1180x820@2 at a guest talk (host screen = his own place, her pop-up only on her iPad) and swapped. No CDN upload needed unless a reviewer asks (then img/_review/coop-thin-hostnull/, wiped after the verdict).
5. '## Done' (tables, tripwire, latency, tests, sha), CLAIMS row 'SẴN SÀNG KIỂM <sha>', send_message Foreman B one line.
Out of scope (report only): her Tranh ghế rounds not driven in co-op (L6 = L7, pre-existing).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

## Worker #2 (session_01N1tNP2tXKt5N4VcwMfYH8B, opus) — depth 6, START_CTX ≈ 4 % of 1M (rollover ≈ 29 %, ceiling 60 %); ended ≈ 18 %.
PRIORITY #1 CHECK: handover #1 above + Foreman B ROOT-6 orders (merge LIVE main, then F5) | main / review/* no other host repaint work | CLAIMS row 'coop-thin hostnull fix #2'.

### (a) repaint cost / loop / modal (extra check ordered by Foreman B)
- r2 (deferred repaint in rAF) was DROPPED: under the suite it let the page's microtask observers (jreveal krvSoon → krvTick → krvFlip) see HER DOM on the host page → the host flipped her face key (H2 red, stack recorded in the test).
- r3 (kept): the repaint stays in the SAME task (TH.tapRun → rpAsk → D.after(RPF); D.afterRun renders), observer disconnected first → no loop; the host's own open card is rebuilt (showModal) only when her run wrote #modal or other waiting work exists.
- H6 (new): host opens his own card with a marker → she talks → marker kept, Q[0] same, modal open, no host sfx; 3 s idle → rpN / paintN unchanged (no loop). PASS L9 + swap.
- Cost (host CPU ×4, LAG 85, hostnull run): repaint ≈ 300 ms per run that wrote his DOM (5 repaints / 1.3–1.6 s per suite run; 7 / 610 ms at CPU ×1). f2 4G tap→arrival median: before 2207 · (a) 2152 · r2 2094 · r3 2037 ms (n=40) = noise level. Long tasks comparable.
- Decision: keep the WHOLE family (talk / scout / invite + walk + E step + D pick); a host:null-only repaint would miss the E step and D pick writes (UI scan).
- Pre-existing, report only: record-based page observers (e.g. jsfx "open" sound on an added .kpanel/.kpop) could see her added nodes even with the sync repaint; H6 checks no host sound plays during her talk (0 seen).

### Merges
LIVE main 2481c80d (ebb26851) → F5 7f74ce44 (4e95b5ea) → F5 9b46e1ad = LIVE 1a4df595 (801b86b7 parallel-time + drift-2) (b65dfcbb, rebuilt e4e06059). Conflicts only in generated index.html / sw.js (rebuilt by assemble.py + build_site.sh).

### Fixes in #2
- 717d92f6: kpmPlay kept out of the NOOP wrapper list (defined after it) → coop-thin-b 'UI no-op list wrapped' red fixed (b 136/136).
- 1fc3b8a0 (test only): H3/H4 staging hooks seeLoc in her scout run; parallel time (jptime) now sends a runner → BAL.ptime.on=0 for the two stagings only (both phones, restored). H2 waits for her scene's people (4G). SHOTS hook after her talk.

## Done — branch review/coop-thin-hostnull @ 1fc3b8a0 (pushed; = F5 9b46e1ad + hostnull)
### Tests on the final build (live Worker; L9 unless noted)
| test | result | note |
|---|---|---|
| coop-thin-hostnull | 13/13 · swap 13/13 · CPU×4 LAG85 13/13 | H1 talk once 12/13 in ~10 runs (host's own reveal mid-flip "???" vs name in a token; flaky, passes on rerun) |
| coop-thin-a L1 / b L4 / c L4 | 24/24 · 136/136 · 16/16 | |
| coop-thin-e L5 (+swap) / e-net L6 | 33/33 · 33/33 · 20/20 | |
| coop-thin-f4 (+swap) | 18/18 · 18/18 | |
| coop-thin-f1 / f2 / f3 (+swap) | f1 19/26 · f2 24/25 · f3 34/37 | SAME reds on F5 tip 9b46e1ad (b2 runs: f1 18/25, f2 24/25, f3 34/37): main 1a4df595 parallel time — her gift / invite / poison / bribe / musk now land at due; page error `sv is not defined` in runAct (main). NOT this branch. |
| coop-thin-d L4 | crash at giftin card | SAME on F5 tip 9b46e1ad (parallel-time gift: NPC gift carried later); kit sameDom reds = main |
| coop-thin-f5 L10 (+swap) | F0 level stays 9 | live Worker THINMAX = 9 until F5's worker (THINMAX 10) deploys; SAME on F5 tip |
| coop-cyc THIN=9 (+swap) | 73/73 · 73/73 | swap night-draw rows flaky on F5 tip too (69–71/73 there) |
| coop-e2e (+swap) / p2 / timer / night | 68/68 · 68/68 · 45/45 · 43/43 · 105/105 | night 102/105 once, 105/105 on rerun (F5 tip 105/105) |
| coop-one-world seeds 1–10 | 10/10 PASS | |
| ptime.test / ptime2.test | ALL OK · ALL OK | |
| quickcheck | PASS (open 1825 ms, old save ok) | |
| one-core-guard / text / text-rule / bind | PASS ×4 | |
### Tripwire (guest writes outside fromCanon) — f2 place loop: before (d913db71) state 7362 (F1 1501) → after state 5937 (F1 169); F3 entry writes on her phone = 0.
### UI scan after (f1–f4 + hostnull, host side): kpmPlay captured in runAct rows; cfShow in D pick rows; krvFlip captured (goTo ×2, accEtqGo, D pick); no `kpmOn<kpmGo` / `want<flip` gate rows; lost-by-cap 0 everywhere; every run that wrote host DOM has its repaint.
### LOOK (scratch only, not uploaded): host Fold 755x1000@2 + guest iPad 1180x820@2 after her talk, and swapped: the host shows only his own screen (his Nhập cung card); her person card + her result only on her phone.
### For B (out of scope, report only): main 1a4df595 parallel time breaks the co-op F1/F2/F3/D suites on F5 tip itself (see table); her Tranh ghế rounds not driven in co-op (L6 = L7, pre-existing).

## REVIEW r1 — PASS review/coop-thin-hostnull-r1 6facd67d (descends from origin/main 2bda29a1 + F5-r1 9b46e1ad)
PRIORITY #1 CHECK ('review-coop-thin-hostnull'): OD 0 | ledger 0 | claims hostnull #1 4i9JQenz, #2 2tXKt5N4 | main 2bda29a1 (no hostnull; NEW there since the worker: receiver choice jrcv, seal-lean-3) | review/coop-thin-hostnull 1fc3b8a0 (reviewed), review/coop-thin-f5-r1 9b46e1ad (in it) | archive 0.
Reviewer session_01N1tNP5FGJzDEEndPqePkcQ (opus), **depth 7**, START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover ≈ 28 %, ceiling 60 %; finished below it.
Branch = 1fc3b8a0 + 16f3ee33 + 588b553d + merge origin/main 2bda29a1 (05281054) + 2137358a + 6facd67d. Main re-fetched right before READY (2bda29a1, unchanged); F5-r1 head unchanged (9b46e1ad).

### Fixed here
| # | finding | before | after |
|---|---|---|---|
| R1 | **(a) family not whole**: the host repaint net sat only in TH.tapRun. A probe over EVERY her-context run (TH.withSeat) found her part B **life** intent writing the host's OPEN card (#modal: jload lDlgWait `klifewait` = his card hidden up to 3 s + his .dlg kit size attributes data-ksz / data-lay / data-pres / data-focus stripped; outer showModal wrappers run past the NOOP) and a part D **pick** writing #modal's class — never repainted (same on F5 tip) | WSCAN: life DOM NO REPAINT 1, pick 1 (F5 tip: + f ×10) | jcoopthin TH.withSeat: one MutationObserver per outer run of hers (part D on), rpAsk (same one repaint, his card rebuilt when #modal was written) when it wrote his DOM and no tap run inside already asked. WSCAN: every run that wrote his page repainted (life 1/1, pick 1/1, f 15/15), 0 misses — test **H10** (permanent) |
| R2 | **(e) merge conflict with main's receiver choice**: main replaced the Kết giao roll by jrcv rcvAsk; on a player target (her entry, t !== S) the NPC receiver pick (rcvPick: yes / half / từ chối / mách) would answer AFTER the other player said «Nhận» → law 1 broken again | j8 conflict | j8 = main; jrcv rcvAsk: coopAccepted(t) → the yes road (full; half if her Sức is short; never mách / an AI refusal). H5 / H5b force the NPC pick to «no»: player target still «thành», NPC target refused |
| R3 | law 1 tested one way only (host → her) | H5 | **H5b**: same staging in HER context (her gift / Kết giao to the host's entry): never refused, the gift left her chest once (law 6c), NPC still refuses and the gift stays |
| R4 | law 4: uiPump typed a fallback `{batch:4,gapMs:900}` beside BAL.coopUi | typed numbers | reads BAL.coopUi only |
| R5 | (d) jflip cfShow sent with NO plan: her phone re-read stoleFrom (per-seat state of her run, not on her phone) → wrong turned card after a stolen night; could replay a stale night | cfShow [] | plan taken in her run (cfPlan, JSON) and played as is; nothing sent when her run has no plan. Note: at E levels her flip in her context does not draw (jcoopworld E-fix → the host's held draw), so nothing is sent there — FOR B below |
| R6 | (2) long-session cost unmeasured | — | **H7** LONG=<n>: repaint ms per run beside a plain host render |
Test-tool adds: coop-thin-uiscan.js columns "runs that wrote host DOM / repaint / DOM run with no repaint"; H2 staging with parallel time off (it flaked 1 in 6: the stranger walked away in real time); H1 logs what the host learned by himself.

### Checks (brief 1–6)
1. Host shows only his own screen, both seats: H1 talk / scout / invite, H6 (his own open card kept, Q[0] same, no host sound, no loop), H2 reveal once on her phone none on host, H3 7 effects in order 4 + 900 ms none lost, H4 her slap on HER stage only. LOOK (scratch, deleted): host Fold 755x1000@2 = his own Nhập cung scene; guest iPad 1180x820@2 = her person card + her result (and her staged rank edict); swapped the same.
2. Repaint cost: H7 20 talks, CPU ×1: median 48 / 48 ms (first / second half), = one host render (36–71 ms); CPU ×4 LAG 85: 316 / 334 ms (10 talks), 244 / 168 ms (6) — does not grow. Her run time (TH.lat) unchanged in shape; long tasks comparable (max 1.4–2.2 s at CPU ×4 come from her walk runs, present before).
3. Family (UI scan f1–f4 + hostnull, host side): every tap run that wrote host DOM repainted — talk 4/4, scout 2/2, invite 1/1, goTo 42/42, visitPal 1/1, accEtqGo 3/3, E step 4/4, rcpAskGo 1/1, tdsRun 1/1, runAct 1/1; D pick 0 DOM (its #modal write is outside the tap run → R1); lost by cap 0; krvFlip captured (goTo, accEtqGo, talk).
4. Law 1 two-way + 6c: H5 + H5b both directions; refused (NPC) gift stays in the chest; accepted gift left once; resend = DONE dedupe (unchanged). Law 6c note (pre-existing, not this branch): j8 giveTo tainted gift detected → `r.inv.pop()` the piece is not stored anywhere (evidence only) → FOR B.
5. H1 flaky (host token "Phi ???" vs name after a fresh render): seen 1 in ~9 runs before R1 (CPU ×4 LAG 85), 0 in 8 runs after R1 (4 at CPU ×4 LAG 85). Not proven which; every run of hers is now repainted (H10) and H1 logs the host's own learning for any future red.
6. f1 / f2 / f3 vs F5 tip 9b46e1ad (live Worker L9, same box): f1 18/23 vs 18/25 (swap 18/26 vs 18/24) — same classes: "F1 <act>" (varies per run: poison / musk / vp / laydol / plant …, lands at due), "every ACT kind", F2 gift ×2, page error `sv is not defined` (j9 runAct, main); f2 24/25 = 24/25 (P5 invite); f3 34/37 = 34/37 (X1 ×2, X2), swaps identical; on merged main: f1 20/22 (only F2 gift ×2), f3 35/38. coop-thin-d crashes at the giftin card on both. Not a FAIL (separate B job).
Laws: 1 ✓ (R2, R3) · 4 ✓ (R4; one-core ×4 PASS) · 6c ✓ (H5b) · 7 no new player word · 9–12 no UI part changed (repaint uses the host's own render / showModal) · 2/3/5/6ab/8/13–18 not touched.

### Gates (live Worker ctm-coop, L9 unless noted; final = 2137358a/6facd67d unless noted)
| gate | result |
|---|---|
| coop-thin-hostnull / swap / CPU×4 LAG85 | 15/15 · 15/15 · 15/15 + 16/16 (+ LONG); with H10 |
| coop-thin-a L1 / b L4 / c L4 / e L5 / e swap / e-net L6 | 24/24 · 136/136 · 17/17 · 33/33 · 33/33 · 20/20 |
| coop-thin-f4 (+swap) | 18/18 · 18/18 |
| coop-thin-f1 / f2 / f3 (+swap) | = F5 tip classes (item 6) |
| coop-thin-d L4 | crash at giftin = F5 tip |
| quiet scan | 41 reads / 32 reachable = F5 tip |
| coop-cyc THIN=9 / swap | 72/73 · 73/74 (red: mixed = main); one 68/73 run (lui / giau night draw) and F5 tip 71/73 (lui) = known night-draw flake |
| coop-e2e / swap · p2 · timer | 68/68 · 68/68 · 46/46 · 43/43 |
| coop-night | 104/105 · 102/105 (F5 tip 104/105, different rows) = known flake |
| coop-one-world seeds 1–10 · ptime / ptime2 | 10 × PASS · ALL OK · ALL OK |
| receiver-choice.test (jrcv touched) | ALL PASS ×3 (one 1-FAIL run under load); main ALL PASS |
| one-core ×4 | PASS (final) |
| quickcheck | PASS (old save ok; render 186/191, tab 388/383, buổi 972/1095 ms new/live; core gates PASS) |

### FOR B (out of scope, report only)
- Receiver choice (main jrcv) × co-op: every rcvAsk kind other than Kết giao (facFound / facInvite / facJoin / invite / call / mediate / blockf / illAlly / rougeBorrow) with the OTHER PLAYER as target is answered by the NPC pick for her — she gets no card (law 1). Co-op needs her 4-answer card (G/H).
- Her night card-flip scene at E levels: her flip in her context does not draw (host's held draw), so no plan exists to send; check that her phone shows the flip scene from the merged night at all.
- j8 giveTo tainted gift caught: the piece is popped and stored nowhere (law 6c).
- main 1a4df595+ parallel time: f1/f2/f3/d co-op reds (item 6), `sv is not defined` (j9 runAct).
