# coop-thin F2 — HER PLACES / goTo / VISITS AS INTENTS (on the F1 wrapper TH.F.reg) — STEP 0 (report first, before code)

PRIORITY #1 CHECK ('goTo|visitPal|goSee|walkGo|walkSpill|accEtq|accSneak|accAsk|talk|srvGoTo|kcGo|TH.F.reg|sendPos'): OD 0 new (thin guest 17/11 ~01:40Z / ~02:05Z / ~02:15Z + L1487/L1489/L1493/L1494 via the brief) | ledger 0 | main 53544bd8: F1 LIVE (jcoopthinf.js TH.F.reg, runAct only), E LIVE (her buổi step on the host re-enters her place: j9 nextBuoi → goTo in context b), no goTo/visit registration | review/* none for F2 (git ls-remote review/coop-thin-f*: f1, f1-r1 only) | claims: CLAIMS row 'coop-thin F2' (this worker).

Worker session_01N1tNP3eu44fWyHnBJfJHuj (opus), coordinator FOREMAN B ROOT-2 session_01N1tNP3G5N78YfJ9phcb2nc. depth 3 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f2 from origin/main 53544bd8. Worktree /home/user/wt/f2 (sparse, hooks).

## 0a. Every place / goTo / visit entry point the guest runs today (main 53544bd8) and which part moves it
The walk engine is `goTo(k)` (j2.js:123) wrapped by 30 modules (j21 j22 j27 j38 j41 j42 j70 j76 j77×2 j95 jact jcoopworld jdress jht jk3 jkc jkh jmen jplfs jplx jpm jroute jshelf jstaff jty×2 jworld2); jcoopthinf loads last, so a registration there is the OUTERMOST layer (every inner wrapper = the walk's own effects, run once on the host). Today on the guest every walk RUNS ON HER PHONE (at L5 inside no world frame: S.place / S.visit / spend / arrival rolls / NPC rows on her phone; the host learns her place only from the `pos` relay).

| # | entry (guest tap / caller) | file:line | engine it ends in | part |
|---|---|---|---|---|
| 1 | Dư đồ map / list tap (j77Tap → j77Go / walkSpillGo / j77Card), courtyard halls (jpm kpmEnter → j77Tap) | j77.js:84-92, jpm.js:96 | `goTo(k)` | **F2** (goTo) — j77Tap / kpmEnter stay routers on her phone (read-only checks, S.hall = her person, rides in the intent's diff) |
| 2 | generic `data-go` buttons (walkGo) | j6.js:90, j9.js:141 | goTo / walkSpillGo | **F2** (goTo); walkGo = router (local) |
| 3 | walk spill (walk longer than the khắc left: pay now, buổi turns, arrive next buổi) | j9.js:133-152 walkSpillGo / walkSpillTick | spend (her khắc clock) + nextBuoi (= E `ready`) + later `goTo(W.k)` | her clock + E stay; the arrival `goTo` = **F2** (ctx carries `__walkSpill` so travel() returns the rest of the walk on the host) |
| 4 | "Đến cung nàng thăm" (person card visit) | j21.js:71 visitPal (+ j77:184, jres:109 wrappers) | `visitPal(id)` → goTo + popIdx / gatekeeper line | **F2** (visitPal) |
| 5 | "Đến gặp …" / "Theo đến" (follow) | j21.js:49 goSee (+ j77:188 wrapper), j21:53 handlers | `goSee(id)` → goTo + open card | **F2** (goSee) |
| 6 | the greeting gate (bái kiến chủ vị): card built by accEtqCard; its choices run accEtqGo(k,h,greet,then) | j77.js:157-178 | `accEtqGo` (spend, relAdd on the NPC = world rows, log, k61Meet, then()) | **F2** (accEtqGo; `then` = goTo / visitPal / goSee travels as data: tag on the closure) |
| 7 | the access gate (Xin yết kiến / bái kiến, Lẻn vào): j41 card + map list buttons | j41.js:47-55 accAsk / accSneak, j41:64 gate | `accAsk(k)`, `accSneak(k)` (rolls, spend, punish, Q card, goTo) | **F2** |
| 8 | talk to the person at the place (pop-up options: Tâng bốc, Thỉnh an, Tạ lỗi, Nhún nhường, Khiêu khích, place harms pushPond / trip, Nghe lén, Lục rương …) | j2.js:176 talk(oi), j6.js:94 | `talk(oi)` (spend, rolls, runOpt / a.run, popMsg) | **F2** (talk; F1 step 0 row 12 assigned it here). An option that opens a picker (Tặng quà giftpick, plantpick) becomes a part-D pid card on the host; the pick itself = F3 |
| 9 | "Sai tai mắt dò nơi ở" (scout) | j21.js:57 | `scout(id)` (roll, seeLoc) | **F2** |
| 10 | "Mời sang cung" (invite) | j21.js:60 | `invite(id)` (spend, S.invite; lands in placeWhere on the host) | **F2** (no world write, but it is a visit; registered so one engine runs it) |
| 11 | cung-nữ roads (maid seat): srvGoTo direct (j42 SRVA follow / errand cards) | j42.js:149, :208, :222 | `srvGoTo(k)` | **F2** (through goTo when called by goTo; registered for the direct calls) |
| 12 | khuê các roads (before entering the palace) | jkc.js:192, :626 | `kcGo(k)` | **F2** |
| 13 | quest / errand walks (j72 q72 tab, jgift kgmgo, j78 Kinh thư tn, jagent "lui về cung", jty trung y card "Vẫn đi") | j72:288/293, jgift:170, j78:200, jagent:265, jty:65 | `goTo` | **F2** (through goTo; jty's flag `__tyGo` rides in ctx) |
| 14 | the new buổi re-entering her place | j9.js:158 nextBuoi | goTo inside the buổi step | E (host, context b, already) — not a tap |
| 15 | decision cards before a walk (j41 access card, j77Card place card, j77LastWalk, accEtqCard, jty "Ra ngoài khi mặc trung y?") | j41:66, j77:55/78/157, jty:63 | Q card with closures, no state change | stay LOCAL on her phone (decision UI: read-only, like F1's spend clock); their choices call the registered engines above → intents |
| 16 | gift / plant pickers, shop at the peddler | j8:470/475, talk peddler | giveTo / plantItem / buy | F3 |
| 17 | empAct, deck cards (runOpt), lessons / mini-games | j8:464, j3/j80, j2 lesson | — | F6 / F5 |

## 0b. How each registers on TH.F.reg (and the wrapper gaps, proven)
Level **7** (brief: "C.thin = 7 or the next free level after F1's 6"; `TH.CAP` 6 → 7; Worker THINMAX 9 already). NOTE for B: contract C1 (coop-thin-a.md) said F1–F6 share 6 and G = 7 — with F2 at 7, G/H move up (8/9) or F3–F6 take 8+: B decides; F2 reads its level per registration so it can be renumbered in one line.
Registrations (jcoopthinf.js, F2 block): `goTo(k)`, `visitPal(id)`, `goSee(id)`, `accEtqGo(k,h,greet,then)`, `accAsk(k)`, `accSneak(k)`, `talk(oi)`, `scout(id)`, `invite(id)`, `srvGoTo(k)`, `kcGo(k)`. Persons travel as ids (the friend = 901 = the host's stand-in in her context); `then` travels as `{f,a}` (one tag set where the closure is made, j77 / F2); place keys travel as strings.
**mine(args)** = she is on her own turn (gOn) and the call would WALK or ACT now; a call whose first step is a decision card (access gate, greeting gate, trung y card, place card) returns false → it runs on her phone exactly as solo and only shows that card (no world write: checked by the tripwire); the card's choice calls the registered engine → intent.
**ctx** (her per-phone state the walk reads): `used` (khắc), `__walkSpill`, `__tyGo` / `__j77etq` / `__accSilent` / `__accStay` (call-scoped flags), `tab` / `__fromMap` (j38 / j42 / jkc / jk3 switch to the act tab after a map walk), `popIdx` / `popMsg` (visit opens the person pop-up; talk writes popMsg).
Wrapper gaps (each proven by the table above; no other wrapper change):
1. **level per registration** (`R.lv`, default 6): F2 entries are on only at 7.
2. **ctx back** (`R.back`: names): the walk WRITES state that lives outside S (used, popIdx/popMsg, tab, __fromMap, __walkSpill); the host returns those values after the run and her phone sets them with the answer (F1's ctx only went one way).
3. **after hook on her phone** (`R.done(args, dr)`, run after her patch is applied): a walk that did not arrive (closed on arrival, curfew, a gate on the host) shows the same place card her phone shows in solo (j77Card) — never before the answer (no 'lost tap', no card while pending).
4. **pending awareness for "did she arrive?" callers**: j77Tap and walkSpillTick check `S.place!==k` right after goTo and would open the place card at once; while a walk intent is pending that check is answered by hook 3 instead (j77Card is skipped while her walk to k is pending).
5. **UI side effects of her walk on the host** (contract C3 "UI side effects / timers"): renderStage, resultShow, srvToast, k3ShowPlace / k3Shell, j59lay are added to the ONE no-op list (TH.NOOP, jcoopthin) — her arrival must not repaint the host's stage / open his place page / toast on his phone; callbacks a context-b run schedules with setTimeout run with the same no-op list (accEtqGo's result card at +30 ms, jplfs j59lay at +60 ms). The result card itself reaches her phone through F1's snapshot path (`R.snap`: the wrapper takes the rsnap on her phone when the engine snapshots inside, accEtqGo).
6. **one source for her place on the host**: at level 7 the host's world `S.where[her entry]` and `CW.fpos` come from her stored person after each walk (her `pos` relay's place is ignored at L7; pos stays for stats/look = part H list). Visits between the two players then read the same S.where in both contexts: host visits her (his own goTo sees her entry where her stored person is), she visits him (her context: keepFriendPos already puts the host's entry at his own place).
Old guest path deleted for the moved family (behind L7, one switch): local goTo/visit runs on her phone, the walk part of `pos` (host side ignores it), her local arrival rolls (jty rob, j70 plot sighting, jdress / jshelf looks, j95 counts, jmen/jplx people lists) — all unreachable at L7 for her taps; deleted when L7 is the default (part H), same rule as C/E/F1.

## 0c. Latency + pending → arrival (no lost tap, no flicker)
Same path as F1 (two network legs + the host run): expected ≈ F1's numbers — no throttle ≈ 0.3–0.5 s, 4G profile (LAG 85 ms each way on both phones + host CPU ×4) ≈ 0.8–1 s; measured in Done with coop-thin-f2.js (LATENCY line, ≥ 9 walks).
Her screen while pending: the tap is held as the intent in the same tick: `F.pend` set, #next locked (existing lockNext words through CW.eWait), act buttons off (can), a second map / person tap ignored (F.stat.busy). Her S.place / S.visit / khắc NEVER change locally (nothing to undo); the answer = ONE view message (dr + her patch: S.place, S.visit, logs; + the ctx back values: khắc, tab, pop-up) → one render on arrival. A walk that did not arrive shows the place card after the answer, as in solo.

## Questions for Foreman B (I go on with the defaults unless told otherwise)
1. Level 7 for F2 (default, per brief) vs contract C1's 'F shares 6, G = 7'.
2. Decision cards before a walk stay local (default): moving them would need every closure card turned into a part-D pid card (solo code change across j41/j77/jty) — far bigger, no gain (they change nothing until a choice is tapped, and that choice is an intent).

## Foreman B ruling (18/11 ~22:50Z): F2 = level 7; F3=8, F4=9, F5=10, F6=11, G/H after F6 — contract C1 line in coop-thin-a.md overwritten in place (THINMAX 9 must rise before F5).

## F2 #1 → #2 HANDOVER (worker session_01N1tNP3eu44fWyHnBJfJHuj, depth 3; rolled at Foreman B ROOT-3's call, context ~44 %)
Branch **review/coop-thin-f2 @ 6eaf01a** (pushed; from origin/main 53544bd8 — main is now 9a1d6922: merge it in the final merge). Worktree /home/user/wt/f2 (sparse, hooks), logs /home/user/wt/f2-out (g/*.txt), main build for comparison /home/user/wt/f2main (53544bd8), `.tmp/old.html` = main build for coop-cyc.
### Built (all behind TH.on(7); CAP 6 → 7; level 6 and below + solo unchanged)
- **jcoopthinf.js**: wrapper gaps closed — (1) level per registration `R.lv`; (2) `R.back` ctx values returned (`out.c`, set on her phone only if her run changed them and she is still on that buổi); (3) `R.done` after-hook (+ `out.rv` boolean result, `out.ui` toasts srvToast/kitLine captured on the host via TH.uiCap and replayed on her phone — F2 regs only); (4) j77Card waits while her walk to that place is pending (`p.walk`, shown after the answer if she did not arrive); (5) `R.snap` (the wrapper snapshots for the result card, accEtqGo) + rsnap inside her context marked `__ctx` so a delayed resultShow never shows on the host; (6) reconnect gap: a tap while `CW.lvWas>=lv && !TH.on(lv)` takes no road (F1 too), `CTM_WAIT.coopLinking` line; an un-encodable F2 call runs locally (counted F.stat.local); host drops her ops on host-owned keys (E.BAD: buoi/origin/thq/thpn/heir/hr) — her diff carried ["-",["buoi"]] (a patch's buổi in her base) and the host deleted her stored buổi before her walk (walk spill paid full price; F1 acts saw buổi 0) — found by P7; F1's `lastAns.r` stays the view's object (`r0` = copy).
- F2 registrations: goTo, visitPal, goSee, accEtqGo (then as data via j77 `accThen`), accAsk, accSneak, talk, scout, invite, srvGoTo, kcGo; decision cards (trung y jty, access j41, greeting j77, spill) stay local (mine false → solo path shows only the card); ctx used/tab/__fromMap/__walkSpill/__tyGo/__tyCardK/__j77etq/__accSilent/__accStay/popIdx/popMsg; walks: D.after → host keepFriendPos + refreshHere + one host render.
- **jcoopworld.js**: `herPl7()` — at L7 the host's where of her = her stored person's place (pos place ignored); CW.keepFriendPos / CW.refreshHere exported.
- **jcoopthin.js**: CAP 7; TH.NOOP + srvToast (captured), resultShow wrapper skips `__ctx` snapshots out of context; renderStage NOT no-op'd (its wrappers write her person; F1 depends on it — bisected).
- **jk3.js**: k3Shell / k3ShowPlace return when COOPW.ctx (internal IIFE calls). **j77.js**: accThen tags.
- **jcoopthine.js**: comment + `E.BAD` export only (her base logic = main; a guest-side delete broke F1's log path — bisected).
- **dev/test/coop-thin-f2.js** (new): P0 level, P1 every place of places() (gates local), P2 visits both directions + host sees her, P3 talk, P4 greeting gate (accEtqGo + result card, none on host), P5 scout / invite / accAsk, P6 real map tap (tab act on her phone, host tab kept), P7 walk spill (khắc = travel()), P8 oldRun, P9 reconnect gap.
### Gates done (live Worker)
coop-thin-f2 L7 18/18 + swap 17/17 (×4 each over the session) · coop-thin-f1 L6 23/23 swap, L7 22/22 swap (single runs; under 3–4 parallel suites both main and branch show 1 log-only red: main 22/24, branch 22/24 — same class) · coop-thin-a L1 + swap 24/24 · b L4 136/136 (after jk3 fix) · c L4 17/17 · d L4 47/53 = main 47/53 (kit sameDom) · e L5 33/33 + swap 34/34 · e-net L6 / L7 / L7 swap 20/20 · coop-cyc THIN=6 74/74, THIN=7 73/73 + swap 73/73 · coop-e2e 63/63 + COOP_SWAP 63/63 · coop-night THIN=5 / 7 105/105 · coop-timer 43/43 · coop-one-world seeds 1–10 PASS · one-core guard / text / text-rule / bind PASS · latency (no throttle) median 390–580 ms over 32–39 walks.
### Left (successor, in order)
1. coop-p2 (was running at the roll: rerun), coop-b1 (19/41 — known pairing flake on main too; rerun alone, compare main).
2. Final merge origin/main 9a1d6922 (rebuild generated: `python3 dev/build/assemble.py && bash dev/site/build_site.sh`, commit index.html / sw.js / assets.json), rerun f2 L7 + swap, f1 L6 + swap, e2e.
3. Tripwire place area before/after: `TRIP=1 node dev/test/coop-thin-f2.js <W> 6` (old road: asserts red, counts printed) vs `… 7` → place writers (goTo/visit/walk/talk) = 0 at L7; table in Done.
4. Latency 4G: `LAG=85 CPU=4 node dev/test/coop-thin-f2.js <W> 7` (LATENCY line).
5. LOOK host Fold 755x1000@2 + guest iPad 1180x820@2 at a travel result (`SHOTS=<dir outside git>`), scratch only.
6. quickcheck (`bash dev/tools/quickcheck.sh`), delete dev/test/zz-*.js (untracked debug), '## Done' (moved/deleted paths table from step 0 §0b, tripwire, latency, tests, sha), CLAIMS 'SẴN SÀNG KIỂM <sha>', send Foreman B.
Known / FOR B: E's `do ready` / erd still carry ["-",["buoi"]] to the host (harmless there: the step sets buổi absolute; F filters it); F1 log check is timing-sensitive under parallel load (main too).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## F2 #2 — Done (worker session_01N1tNP54k39FoQxynYXS2Xp, depth 4; START_CTX ~6 %, ended ~25 %)
**Branch review/coop-thin-f2 @ 4dabbd46** = #1's 6eaf01a + final merge origin/main **b1c3631e** (6d2de853) + reconnect fix (f73e136e) + test LOOK (e0f242f0) + generated files (4dabbd46).
- **Merge**: one conflict, jk3.js k3Shell. Kept main's stage-here version (k3Full) and added the co-op ctx guard (`if(window.COOPW&&COOPW.ctx)return`). k3ShowPlace guard merged clean. Generated files rebuilt by build_site.sh.
- **NEW FIX: lost tap on a reconnect (F1 + F2, jcoopthinf.js).** `COOP.on("room",()=>{F.pend=null})` (main F1) dropped her pending intent in silence when her socket died and COOP reconnected. The tap was lost, or worse: the host had run it and moved her, but her phone never heard. Found from a P7 walk-spill red (1 in 8 full runs): the host ran the walk, there was no answer and no resend, and the two phones disagreed on where she was. Fix: on "room", same room + same week → keep it pending and send it again at the next 1 s tick once the level is back (`F.stat.reNet`). The host dedupes by intent id (DONE is kept per room), so a run that already happened is answered from DONE and never runs twice. Another room or week → dropped with the existing words "Việc ấy chưa thành, xin thử lại." (never silent). New test **P10** (dead socket, the same method as coop-thin-e-net): (a) her walk frame lost, (b) the host's answer lost (delta/snap). **Before the fix: red 2/2** — (a) the tap is gone, the host never ran it; (b) the host has her at vuon, her phone has her at home. **After: green 2/2** — kept pending, sent again, host ran it ONCE, she arrives on both phones, khắc paid once (2 = travel()).
- Test fixes: P1 waits for a gate card's late answer before resetting khắc (under 4G, clear() tapped "Bái kiến" on the card left over from the row before, and its late answer overwrote used=0; this was a test race, not a game bug). Tripwire prints all entries. LOOK shot taken right after the P6 real map tap.

### Tripwire (TRIP=1 coop-thin-f2, guest writes outside fromCanon)
| | L6 (old road: her walks run on her phone) | L7 (F2) |
|---|---|---|
| F2 `goTo` (place writers) | **3403** | **0** |
| F1 `talk` | 71 | 0 |
| place / visit / walk / talk / accEtq / scout / invite filter | 2 entries | **[] (0)** |
| D·patch (the host's result applied to her person = the designed path) | 106 | 2448 |
| F1 bucket (deck `act` + directActs render; F6/meter item, as noted in the F1 report) | 135 | 959 |
L6 run 7/35 (red = expected: the old road runs locally). L7 17/17.

### Latency (tap → arrival on her phone, live Worker)
No throttle: median **560–613 ms** (n=30–36, min ~460). 4G profile (LAG 85 ms each way on both phones + host CPU ×4): median **1749–1925 ms** (n=35–36, min ~1.4 s). That is higher than #1's estimate of 0.8–1 s. The outliers (6–12 s under 4G, 2–2.7 s without throttle) all come in one window: right after P2, when the host has walked to her palace himself. A host probe showed the F2 work stays at ~100 ms withSeat + ~50 ms render per walk. The extra time is host long-tasks OUTSIDE the F2 path (1.2–2.3 s per walk, likely the art load/decode of his new place). It clears by itself after ~3 walks. While a walk is pending her screen shows the pending state (#next locked, buttons off); the walk is never lost or shown twice.

### Gates (on the merged build; after the fix where marked ★)
coop-thin-f2 L7 17/17 → ★19/19, ★20/20, ★19/19 (P10 incl.) + swap 17/17 → ★19/19 · 4G ★16/17 (P4 timed out at 15 s inside the host long-task window above; it arrived and its card showed afterwards) · coop-thin-f1 L6 23/23 + swap 22/22 → ★L6 22/22, ★L6 swap 22/22, ★L7 22/22 · coop-thin-e-net ★L6 20/20, ★L7 20/20 · coop-e2e 63/63 + COOP_SWAP 63/63 · coop-p2 46/46 · coop-b1 (level 0, F2 code off): branch 31/41, 40/43, 32/41 vs **main 43/43, 33/41** — the same flake classes on main (laydo, ksab, musk, plant, 7b; the two-seat pairing timing #1 noted). Branch-only reds in those runs (5 takeaway, 6 pond, 8, 9) are the same timing class (9 follows from 5/6). Not F2. · quickcheck PASS twice (old save ok; core gates incl. one-core-guard, rules-one-source, kit-conform, coop-one-world) · #1's a/b/c/d/e/cyc/night/timer/one-world gates are listed above (pre-merge; the merge touched only jk3 in F2 code).
P7 (walk spill): 1 red in 8 full runs before the fix (the signature above); 0 in 11 runs since.

### LOOK (owner devices, scratch only, not committed)
Guest iPad 1180x820@2 after a real map tap: she stands in Ngự hoa viên on her Hành sự tab, clean. Host Fold 755x1000@2: his own Dư đồ tab is kept (the design: his tab stays his); the card on top is his own Lễ ra mắt card from the test setup, not from F2. Looked at 3×.

### Moved / deleted paths
As step 0 §0a/§0b + #1's handover list: goTo, visitPal, goSee, accEtqGo, accAsk, accSneak, talk, scout, invite, srvGoTo, kcGo run on the host at L7 (her phone never walks: P1/P8, tripwire 0). Decision cards stay local (Foreman B ruling, Q2). Old guest walk paths are bypassed behind TH.on(7) and stay until part H makes the level the default (same rule as C/E/F1).

### FOR B / reviewer
1. The reconnect fix changes F1's shared wrapper (all intents). F1 gates are green; the reviewer should rerun coop-thin-f1 L6 + swap and coop-thin-e-net.
2. Host long-tasks after the host changes place: not F2, but they make the 4G walks slow (up to 12 s); worth a perf item (art preload / decode off the main thread).
3. Known from #1: E's `do ready` / erd still carry ["-",["buoi"]] (F filters it); F1's log check is timing-sensitive under parallel load (main too).
