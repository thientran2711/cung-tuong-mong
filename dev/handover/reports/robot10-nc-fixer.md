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
