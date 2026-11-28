depth 3
# STALE-TESTS-8 — successor of STALE-TESTS-7 (worker of MAIN CHÍNH 189 session_01Rc5AsKLcnai97YwjFT5YMc)

PRIORITY #1 CHECK: OD PUNISH-TIER «tử tội» tier (OD 26/11 ~21:00Z rkPlus), act-merge jdoor (OD 26/11 ~07:25Z), law 2 tiers (OD 27/11 ~00:46Z), kitRing (OD 26/11 ~18:55Z) | main dev/build/jcharge.js:93 chReady, dev/build/jone.js:170-178 (door TIER card), dev/build/jkring.js:307/352 (ring wiring) | review/rules-prefail-r3-rv184 c76b6499 (base), review/stale-tests-7 9abfa246 | claims none other

Branch: **review/stale-tests-8** (base review/rules-prefail-r3-rv184 c76b6499)
- 0c1050f2 + 4e4b4d67 = stale-tests-7 ef9c6f7a + 9abfa246 cherry-picked (only index.html/sw.js clashed → rebuilt)
- e6e93674 site rebuilt. **MODGATE**: assemble.py quoted *.js 499 ⊇ LIVE a96564ad 494 (0 missing); **0 LIVE deletions**
- abda1390 **REAL BUG (perf) fix** jcharge.js chReady (see below), rebuilt
- 4c77dd12 temper-perception harness (wip)

## Results on the new base (c76b6499 + branch)

| test | result | note |
|---|---|---|
| world_check | **PASS 25/25** | |
| feelings18.test.js | **34/34 PASS** | |
| temper-outburst (755x1000, 1180x820, 390x844) | **PASS** | all 3 sizes |
| ag-all.test.js | 1 FAIL perf only: p95 **8.6 ms** vs BAL.ag.perf.p95 8 | **LIVE a96564ad on the same idle machine: 8.3 ms → also FAIL**: a tight budget on this container, not a regression. Budget NOT changed (MAIN rule). Before the fix: 74–94 ms (see bug) |
| emotion-acts-2 (6 sizes) | FAIL 12 = `kinds` + `plock` at every size | plock: the locked row IS there («[x] Rót rượu, nũng nịu … Cần: ta đang phẫn uất, tính nóng, không nũng nịu nổi») but r0 `{ok:false,L:[]}` → the harness reads the lock rows with an old selector/format (likely TEST LIE, the «Cần:» kit line). kinds: not read yet |
| emotion-acts (6 sizes) | FAIL 4 = `lock` at 755x1000, 844x390, 390x844 (PASS at 1000x755 — same «Nhịn» locked row shown, r0 false) + `hit` 1000x755 overflow | `hit` overflow (`.opt.ka.kart.kopt.khideout.kback` hand card) **reproduced a 2nd time** (STALE-TESTS-7 called it a flake) → check whether a real kit overflow at 1000x755 |
| temper-perception (755x1000) | eaHook, math, npcMood, oldsave **PASS**; gateNo, gateYes, label **FAIL** (open) | see open item 1 |

## REAL GAME BUGS
1. (STALE-TESTS-7) jworld court roll lost «tham» with the minister layer on — fixed in ef9c6f7a (carried).
2. **PERF (in the base stack, not on LIVE) — sent to MAIN 189 at once.** PUNISH-TIER chNeed/chWitNeed → chTier(t,c) → chDeedMap(t) → deedsOf → deedSync (→ luxOf → toilNpc → lxNpcCap → lxBoxes) ran for EVERY charge of EVERY NPC plan check (j95except / opEx / opHeatOK / motiveOK → chOK → chReady). 10 days: deedsOf ~200k calls (LIVE ~300), lxBoxes ~1.0M (LIVE ~10k); agReplanB / agDayDraw units grew 11 → 139 ms over the days (the game gets slower every day). Fix abda1390: chReady skips a charge when the pieces are fewer than the lowest possible need = min(own tier need, tu need) + rkPlus (chTier only returns the own tier or "tu") — same answer: 1296/1296 (h,t,c) checks equal after 10 days (6 ready hits); p95 94 → 8.6 ms. The PUNISH-TIER owner may prefer a cached chDeedMap.

## Not bugs (checked)
- With a kitRing open, a tap on the bottom bar does not switch the tab (LIVE a96564ad the same) → a player closes the ring (✕) first; home never opens the place ring (wants()). The harness had moved her by state with a ring still up.

## HANDOVER (rollover: context at START + 25 %)
State: branch review/stale-tests-8 4c77dd12 pushed. (Container-local, lost with this session: worktrees /home/user/wt/st8 (branch), st8live (LIVE a96564ad), st8base (c76b6499); servers :8807 branch, :8808 LIVE; probes /tmp/claude-0/st8/probes — `_agperf` (prints the AGD.ms list), `_aglx*` (wraps a fn and counts its callers by stack), `_agprof` (CDP CPU profile, top self-time) — easy to remake from dev/test/ag-all.test.js.)
**NOTE: LIVE moved to c03d6ee7 (handover c3b6c0e8 «MAIN 189: LIVE c03d6ee7»). Re-run MODGATE (assemble.py quoted *.js ⊇ LIVE c03d6ee7) + 0 LIVE deletions before RV READY; restack if MAIN says so.**
Open items for the successor:
1. temper-perception gateNo / gateYes (dev/test/temper-perception.js): after «Chọn» on the door plaque «Khiêu khích» (P6, members humil «Hạ nhục» · flaunt «Khoe quà ngự ban» · provoke «Khiêu khích») the door is a **jone TIER card** (jone.js:170-178, ONE mode "tier", harm:1): «Chọn mức. <tên>», ≤3 rows «<way> · nhẹ|vừa|nặng» or «Khiêu khích · <t>» with «ra một trong: …» when several free ways share a tier; the way inside a tier is drawn by `pick()` (seeded). It is painted IN-SCENE inside the ring focus (stageRing: a tap on a home figure opens the one-figure ring) as a text box «Chọn mức. <tên> ✓»; the rows are NOT `#modal .dlg .opts > button` (modal hidden). Next: find how the rows show after the box (tap the box / its ✓ — the first `text=✓` locator hit a hidden `.kr-why` mark, not the box), then rewrite gateNo = the tier row holding provoke is closed with its reason (all-locked tier → `off.why`) and a real tap changes nothing; gateYes = Oán 45 → the row names «cớ: oán 45»; her tap lands (the drawn way must be provoke: set the other members of that tier locked by state, or pick the row whose single member is provoke). Also seen: the provoke way's t read «phận dưới không dám khiêu khích bậc trên» in one gateYes run even with the setup rule «not above her rank» → re-check `setup()` (rkOf vs rank after k61Meet).
2. temper-perception label: «Hậu cung» → «Phi tần» now both reached (steps [true,true,false]); the consort's portrait is not found by the given-name regexp → look at the Phi tần list (portrait caption / ‹ Hoàng thượng · 1/2 › pager «kbtn») and tap her row.
3. emotion-acts-2 kinds + plock, emotion-acts lock (3 sizes): read the harness checks vs the «Cần: …» locked-row line (likely TEST LIE); emotion-acts hit 1000x755 overflow: run `EA_ONLY=hit` 5× at 1000x755; if it repeats → real kit overflow (report to MAIN).
4. temper-perception on LIVE: it no longer crashes (LIVE run: gateNo/gateYes/label FAIL like the branch, math PASS with LIVE numbers base −35 / nhân −53).
5. MUTATE for every fixed test (break the rule → red → restore): world_check (jworld.js:274 back to `/Quan tham/`), ag-all (BAL.ag.day.on=0), feelings18 (feelActDur → 0), ea2 (BAL.punW.mid.m → [2,3,1]), temper-outburst (BAL.ea.fx.dapdo.bac 0), temper-perception math (BAL.trong.off=0), and the perf fix (drop chNeedLo → p95 back > 50 ms).
6. Then «RV READY» to BIG RV-184 session_01Rc5AsMLNT6kzi1NmvZRwKz and FOR MAIN 189.
7. (STALE-TESTS-7 item 7, not done) scan the other jworld / jagmin regexes that read event TEXT for the case trap.
