# ROBOT-10 nc FIXER (opus) — session_01964izEqyr78GaoHgYUcT4p (Foreman D session_01964izCEg2Mg4ff3dvoeMWK)
PRIORITY #1 CHECK ('rstats|hhBind|emoSee|kitFocus|dfOpen|save→load|roundTrip|scan-stat-clamp'): OD 0 | main dev/build/j8.js rstats, j24.js hhBind, jemo.js emoSee, jdfv.js (Dư đồ focus glue) | review/* fix-kframe-heir-rv fcdf5b19 (stat clamp incl. duc: scan-stat-clamp 13 → 0), typed-stat-bal-rv a902ebe4 (poisonedFish law 3 + save-C), fix-evening-softlock f3d427a1, robot10-harness-rv 811cb1a6 | claims D robot10 row. Reused: the harness repro saves + its roundTrip method; built on nothing already fixed elsewhere.
START_CTX ≈ 3 % (1 M window); rollover at 28 %, ceiling 60 %.
Brief: dev/handover/briefs/D-robot10-nc-fixer.md. Input: dev/handover/robot/nc-20261123-2308.md (35 rows).

## 1. Triage — nc-20261123-2308.md (35 rows)
| row | type | verdict | family / owner | proof |
|---|---|---|---|---|
| 1 | mem leak (bot page) | owned: robot10-lag worker | — | brief: report only |
| 2 | stuck: soft-lock after load (night flip) | owned: review/fix-evening-softlock | — | — |
| 3 | stuck: inpage6 TIMEOUT at «Bỏ cuộc?» (opts []) | harness limit | — | the card is j82 kitConfirm «Bỏ cuộc? / Chơi tiếp» (buttons, not Q opts); the bot cannot press it. Save 003 loads and round-trips clean. |
| 4 | no ending within 1800 s wall cap | harness (cap) | — | lives alive at year 14 |
| 5 | save→load→save changes the state | **REAL (part) → FIX-1** | F1 save drift | see §2 |
| 6 | «Sức +6» vs fx suc −2 (poisonedFish) | owned: review/typed-stat-bal-rv (law-3 fix + save-C) | — | FOREMAN_D_STATUS 21:20Z/22:12Z |
| 7 | Danh 101 | owned: review/fix-kframe-heir-rv | — | — |
| 8-11 | option text Bạc ± vs fx | harness false positive (win block read as cost) | fixed in harness 521331fc | harness report PART 2 |
| 12 | Đức 101 | owned: review/fix-kframe-heir-rv | its j1 statSet clamp covers duc (scan-stat-clamp.py ST list incl. duc; jpet S[k] pet bonus) | scan on kframe-heir tree: 0 unclamped; on main: 13 |
| 13 | forced road nc_su not played | harness | — | — |
| 14-15 | lag | owned: robot10-lag worker | — | — |
| 16-19 | Dư đồ go-tab buttons covered / overlap | owned: MAIN | — | — |
| 20 | HUD Sức 87 vs state 90 (act card open) | harness false positive | — | j11.js:86 hudTween counts the 4 HUD numbers up over 500 ms (rAF); the scan read mid-tween. Harness: wait ≥ 600 ms after a change or read with reduced motion. No repro on saves 005/009 (37 cards opened, HUD = state every time). |
| 21-30, 32-34 | Dư đồ go-tab text over text (mmeta/mlab/em) | owned: MAIN | — | — |
| 31 | Fold story tab span.kchkt × span.kfoc-sayn | **REAL → FIX-2** | F2 stage layers over another tab | see §3 |
| 35 | Fold rel tab p.past × button.kfoc-next | **REAL → FIX-2** | F2 | see §3 |
Brief candidate «death names showing raw ${…}»: that is the harness catalogue (robot10-cat.js names from source text), not game text — harness follow-up (reviewer noted it), not a game fix. No JS errors in this round.

## 2. FIX-1 family «save→load→save drift» — review/robot10-nc-fix-1
Scan script: dev/test/r10-rt.js — loads a repro save the way she does (Sổ 1 → «Tiếp tục kiếp này»), then ser → deser → render → ser twice and lists EVERY differing path (the robot's diffPath stops at the first). Load-time repairs by design are counted apart: item census ids (jil: S.il.at not saved → .iu / il.seq), fcKeep once-flag, the day roster S.roster (j95c re-syncs it at load).
Causes found (all three were inside the robot's 2294 hits; it only printed the first path):
| cause | file | effect for her |
|---|---|---|
| a loaded consort has no own `hh` (the getter is not saved) → normAll→rstats seeded `hh = R(20)−5` → the first consorts() hhBind blended that random number into the Empress's regard | j24.js (pre-bind on deser), j8.js rstats | «Hoàng hậu với X» moved by a random amount on EVERY load (save 005: rivals[0].rl[2] 28 → 12; whole rl rows reshuffled) |
| rstats `d("maid",{name:nmNew("maid")})` evaluates nmNew even when the maid exists | j8.js | every load took + registered a fresh maid name per consort (S.nmReg +10..36 names per load, name pool burned) |
| emoSee wrote session-only «x<n>» keys (emoRegKey) to S.emoSeen on every stage draw | jemo.js | the save grew with every walk (keys meaningless after reload); old ones dropped at load |
Harness artefact (not a game bug): S.visit.people differs because the robot ser()s before the first draw — the stage (jchat group) re-adds the visitors on render; after render the list equals the saved one (saves 001/005/009: same02 true).
Before / after (robot repro saves 001-012 + proof saves; «round 2» = load the reloaded save again):
| save | main round1 / round2 | fix-1 round1 / round2 |
|---|---|---|
| 001 | 233 / 17 | 0 / 0 |
| 004 | 162 / 36 | 0 / 0 |
| 005 | 110 / 17 | 0 / 0 |
| 006 | 81 / 15 | 0 / 0 |
| 007 | 93 / 37 | 0 / 0 |
| 009 | 154 / 22 | 0 / 0 |
| 002 003 008 010 012, save-B | — | 0 / 0 |
| proof-save-001, save-C | — | 0 / 0 besides the roster day labels (repair, listed) |
Old-save path kept: a save that still carries a numeric R[i].hh blends once exactly as main (probe: 45 on main = 45 on fix).
Tests: save-slots.js 755x1000 28 ok · feelings18 34/34 · ag-moodknow ALL 33 PASS · r10-rt 11/11 nc saves ok · quickcheck: see SSK line.
Laws: 4 (no number made at load), 6b (names stay unique without burning the pool), 16/17 (no rule changed).

## 3. FIX-2 family «stage layers over another tab» — review/robot10-nc-fix-2
Cause: the Dư đồ focus layer (kitFocus: talk, NPC encounter say box, mini-game on the figure) and the mood bubble are drawn on #game over the stage; the tab bar stays free under the focus, so a tap on another tab left them over that tab's panel (Fold story/rel rows; on Fold the whole Giao tình panel was hidden under the focus — looked at the shot).
Fix in jdfv (the Dư đồ controller that opens/closes the focus — the kit part jfocus/K-FOCUS-1 is untouched, no new visual): after every panel draw, the open focus is hidden while the tab is not «Hành sự» and comes back as it was on return; the mood bubble goes.
Scan: dev/test/r10-tab-layers.js — focus + mood bubble open, then every visible tab (robot-style click) × Fold 755x1000 + iPad 1180x820.
| | main | fix-2 |
|---|---|---|
| tabs with a stage layer over the panel (7 tabs × 2 devices) | 14 FAIL | 0 (22/22 ok, focus back on «Hành sự») |
Tests: duodo-focus-view.js ALL OK (mock kitFocus, controller glue) · r10-tab-layers on saves 005 + 009.

## SSK
- SẴN SÀNG KIỂM review/robot10-nc-fix-1 2e5d3da04d29993c45acf6b3e2a4db2a404a176a (rules/numbers/save → BIG reviewer) · base LIVE bba42773 · quickcheck PASS (old save ok; perf new/live render 243/246, tab 474/481, buổi 1124/1500 ms) · core gates PASS.
- SẴN SÀNG KIỂM review/robot10-nc-fix-2 a08f8cd9964015b626e84b8a29dd6557785dd899 (UI glue, no kit part changed) · base LIVE bba42773 · quickcheck PASS (old save ok; render 287/277, tab 443/495, buổi 2768/2042 ms — buổi = box noise while two checks ran; fix-2 only adds one cheap call per panel draw) · core gates PASS.
- Repro saves used: dev/handover/robot/saves/*.json.gz (gunzip; pass the .json to the tests).
- Harness notes for Foreman D (no game change): (a) roundTrip should render() after deser (the stage rebuilds S.visit) and count the load-time repairs apart (r10-rt.js has the filter); (b) HUD check must wait out the 500 ms hudTween; (c) inpage6 cannot answer j82 kitConfirm «Bỏ cuộc?».
- Fixer stays on call for FAILs and the next nc-<date>.md.

## § REVIEW robot10-nc-fix-2 (reviewer sonnet) — PASS
PRIORITY #1 CHECK: brief hits reused (jdfv glue, r10-tab-layers.js); no rebuild. Target a08f8cd9 → merged with origin/main 2a80712b as review/robot10-nc-fix-2-rv 977a70e9efd9858854450b6bd2a7bc67dfe4449e (index.html/sw.js rebuilt via build_site.sh).
- r10-tab-layers: saves 005 + 009 × Fold 755x1000 + iPad 1180x820 = 22/22 ok each (7 tabs + back on «Hành sự» focus returns, no page errors). Same script on main: 14 FAIL → 0.
- duodo-focus-view ALL OK. quickcheck PASS (old save ok; render 257/222, tab 402/437, buổi 1169/1356 ms new/live; core gates PASS).
- Law 9 KIT FIRST: only dfTabLayers glue in jdfv.js (hidden toggle + remove mood bubble); no CSS, no new part. Law 11 whole group: scan covers kfoc (talk/encounter say/mini-game) + kfoc-mood on all tabs both devices (story kchkt×kfoc-sayn, rel p.past×kfoc-next rows included); no other leaking stage layer found. Law 12: shots of every tab on both devices looked (iPad clean; focus back on «Hành sự»).
- Note (not this fix): on Fold the go/court/rel/inv/art #panel reads 0×0 in my probe on BOTH main and fix (identical pixels) — probe/layout artefact or MAIN's Dư đồ lane, unchanged by this branch.
- Conflict watch: review/map-label-overlap-r touches only j38.js; review/duodo-focus-rv differs from main in jdfv.js only at line ~55 (dfEncOn), jdfv fix is appended at the end → no overlap.

## § REVIEW robot10-nc-fix-1 — PASS (reviewer session_01964izBqmsSifomtfYUK96U, opus BIG numbers/save, 24/11 ~02:30Z)
PRIORITY #1 CHECK ('hhBind|emoSeen|rstats maid|r10-rt'): OD 0 | ledger 0 | claims D robot10 row | main j24 hhBind, j8 rstats, jemo emoSee | review/* robot10-nc-fix-1 (target), robot10-nc-fix-2 (other family) — reused the fixer's r10-rt.js + repro saves.
START_CTX ≈ 6 %. Land branch: review/robot10-nc-fix-1-rv **ad3fa9be4cc009701858dcf5941864e501e2a7fc** = target 2e5d3da0 + merge LIVE 4a8c627b (index.html/sw.js rebuilt by build_site.sh, assets.json = LIVE) + one test guard (below).
Code read: (a) j24 deser pre-bind — rivals=d.R are the same objects, so the getter set on them before normAll is the one the game uses; only entries WITHOUT an own hh are bound, so an old save with a numeric hh still blends once in consorts(). (b) j8 `if(v.maid==null)` = same rule as d(), but nmNew no longer runs eagerly. (c) S.emoSeen is write-only (no reader in dev/build), so dropping session-only x<n> keys changes nothing she sees.
| check | main (LIVE) | fix (on the merge) |
|---|---|---|
| r10-rt.js, 12 nc saves 001-012 (round1 / round2) | 001 21/22 · 004 37/37 · 005 19/21 FAIL | 12/12 ok, 0 / 0 (run twice: on 2a80712b and 4a8c627b merges) |
| first load of the FILE vs the file (rel, sung, maid name, rl of every R; S.rl), saves 001/005/009 | R[0].rl (= «Hoàng hậu với X») moves at random every load; nmReg +10 / +22 names per load | 0 diffs; nmReg unchanged |
| old saves: same saves as v5 / v4 / v3 | same drift as above | load, 0 diffs, NaN 0, no lost maid names |
| legacy save with numeric R[i].hh (v4) | blended row | identical blended row to main (001, 005) — migration unchanged |
| new game: Empress's regard to each rival at start (law 4/BAL, 150 lives × 9) | mean 2.56 sd 3.09 [-6,16] | mean 2.30 sd 3.01 [-6,11] (earlier 60-life run: 2.24 vs 2.64 — noise, flips sign); maid names unique 150/150 both |
| co-op coop-e2e full (live Worker) + NEW guard «R10RV after rejoin: maid names + Hoàng hậu với X same on both seats» | 141/142 — guard FAILS (guest's row differs from host after rejoin: the guest's deser blended a random hh) | 142/142 (two runs; one other run had 2 start-time friend-placement flakes, rerun clean) |
| save-slots.js 755x1000 · ag-moodknow · feelings18 | — | ok · ALL 33 PASS · 34/34 PASS |
| quickcheck HEAD (incl. core gates G1-G5) | — | PASS · old save ok · render 186/186, tab 310/335, buổi 1021/1743 ms |
Reviewer change: dev/test/coop-e2e.js — the R10RV guard above (test only; the same family on the co-op seat, would catch a return of the drift).
FAMILY SCAN (any other random draw at load, Math.random hooked during deser of saves 001/009, by call site):
- rstats eager `d(k, R(..))` arguments (140-308 draws): values computed and thrown away (field already set) — no state change; harmless.
- jmort initAll at deser → assign(): people who got NO lifespan yet (new staff / consorts added since the last month tick; initAll runs at month tick and at load) roll tho/thoM/thoO at load. Not a save→load→save drift (once rolled it is saved; r10-rt round 2 = 0), but loading the SAME file twice gives those newcomers a different lifespan (save 009: 7 people, e.g. a consort 52 → 63, her own maid 30 → 67). Suggest (not this branch, design call for Foreman D): roll the lifespan when the person is made, not at the next tick/load.
- drawF (face pick) at load for a person with no face yet — same once-then-saved pattern; harmless.
Laws: 1-3 untouched · 4 no number made at load (hh = the Empress's real regard; new-game values still from the same rstats/BAL path) · 5 untouched · 6b names kept, pool no longer burned · 6c n/a · 7/9/10/12 no UI or wording change · 11 whole family covered (hh, maid, emoSeen + co-op seat) · 13 check line above · 14-18 no rule changed.
Shots: none (no UI change). Scratch probes deleted with the worktrees.

## REVIEWS (Foreman D 02:18Z): nc-fix-1-rv ad3fa9be PASS, nc-fix-2-rv 977a70e9 PASS — LAND READY.

## 4. FIX-3 family «a load draws dice» (save drift part 2) — review/robot10-nc-fix-3
Order (Foreman D 02:18Z, from the fix-1 reviewer): jmort initAll at load rolled lifespans for people who joined since the last month tick → the same file loaded twice gave them different lifespans; whole family scan for any other load-time random draw.
Scan: dev/test/r10-load-twice.js — the SAME save loaded in two fresh pages (title click: deser + deal + render) must serialise the same; every differing path listed.
Found on main (14 robot saves): lifespans tho/thoM/thoO of new staff / maids / consorts, faces (S.maid.fc, R[i].fc, Thái hậu's staff fc, S.fseen), names given at load (S.court.ksp / ty, S.lcfPn, nmReg), tai mắt S.mspy.id, roster acts / agent queue (S.roster.acts, S.ag.rq).
Fix: (1) jmort: initAll runs before ser — nobody is ever saved without a lifespan, whatever road made her (old saves: once at load, then saved). (2) jldseed.js (new, outermost deser wrapper, assemble.py): every die thrown DURING a load (deser + the title-click task: deal + first render) comes from a PRNG seeded by the save's own clock/counters → same file = same game, a reload re-rolls nothing; Math.random is native again right after (checked).
| | main | fix-3 |
|---|---|---|
| saves loading differently twice (of 14) | 13 (1-26 paths each) | 0 |
| r10-rt round1/round2 (001/004/005/008/009/010/save-C) | (fix-1 base) | 0 / 0 |
Tests: mortality.js ok · save-slots 28 ok · coop-e2e 142 ok / 0 FAIL · quickcheck PASS.
Stacked on review/robot10-nc-fix-1-rv ad3fa9be (LAND READY), which carries LIVE 4a8c627b.
SẴN SÀNG KIỂM review/robot10-nc-fix-3 449cbe0848953be0f9f935bc8dffe2b4ef2c8e4b (BIG: save/rules) · quickcheck PASS (old save ok; render 201/278, tab 570/440, buổi 2358/3880 ms) · core gates PASS.
