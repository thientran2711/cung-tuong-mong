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
