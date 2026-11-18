# REPORT live-servants (worker LIVE-SERVANTS, opus; foreman C-AG #14) — 18/11

PRIORITY #1 CHECK: OD L1901 points (2)+(3) (owner 18/11 ~19:30Z, read verbatim) + L1316 (S.roster ledger) + L1592 (day plans) | main 94d11623: dev/build/j95.js j95planOther :215 (mm follows NPC mistress always, st serve/clean + 1 errand dice, "phận sự trong cung"), j95fixHouse :317, j95sync :284 (mm:me follows her always), jagday.js agDrawReg/AGBASE (maid/srv base row = [master palace,"go",null,""]), jagstaff.js (staff deeds, base row), dev/tools/roster.js + ROSTER.md (S.roster/S.rlog, self-checks) | review/* review/npc-purpose (G1 #9: touches j95.js week/intent/ty/peddler lines + jagday comments; no overlap with the lines changed here — merge expected clean, re-check when it lands) | claims none.
START_CTX ≈ 5 % of the window (get_session read 0 at start; estimate). Rollover at 30 %, ceiling 60 %.

Branch **review/live-servants** from main 94d11623. Commits: 22de1d1d (code, tests, tool, docs) + 560014be (build).

## STATUS: SẴN SÀNG KIỂM 560014be WITHDRAWN (scope changed 19:55Z + 20:07Z, see HANDOVER at the end) — the work below stays on the branch as the base

## What changed (REUSE: S.roster/S.rlog + j95 plans + jagday/jagstaff deed slots + roster.js; nothing parallel)
- **NEW dev/build/j95s.js** (after jagstaff.js in assemble.py), numbers in `BAL.slv` (one core; one-core-guard PASS):
  - (2) **Every maid / eunuch lives her own day** — hers, every consort's, Hoàng hậu's, Thái hậu's household (non-post staff): per-khắc rows at her palace (serve / clean / meal / break / sleep / one night watch per household) and at most ONE walk out per buổi (errand to Nội vụ phủ / Thái y viện — ×3 when her mistress is ill or with child — / Kính sự phòng / Tân Giả khố, or a visit to a friend in another palace, thiện cảm ≥ `friendAf`), the walk takes the whole buổi. Deterministic per buổi (j95rng seeded by life + buổi key + person: same day however often recomputed).
  - **Retinue**: when a mistress (any consort, Hoàng hậu, Thái hậu, AND the player — two-way law) is away from her palace, size = min(free, ceil(`ret[rank]` × `occ[place]`)), `ret`=[1,1,1,2,2,3,4,5] (Hoàng hậu up to 5), `retTh`=5; occ dtd/thu/tn 1, kn/other palaces .8, vuon .6, tyv .4. The close maid goes if free; else the free ones by trust (loyal); busy = a deed, a meeting, a forced list, her own errand/visit. Members stay for the whole outing (only a deed/meeting takes one away). The rest keep their day; a serving row while she is out becomes "ở lại trông cung".
  - Reasons: "Hoàng hậu sang Ngự hoa viên, cung nữ thân cận theo hầu" · "cung nữ thân cận Song Hỷ đang bận (…), nên Hoàng hậu chọn Ngọc Bích theo hầu" · "… chọn theo hầu (tùy tùng 3 người)" · "Hoàng hậu không khỏe, sai đi lấy thuốc ở Thái y viện" · "hết phiên, sang Cảnh Phúc cung thăm bạn thân X" · "đến phiên canh đêm cho ngươi" …
  - (3a) **Reason guard** for EVERY NPC row: an empty / filler reason ("", "phận sự trong cung", "phận sự") is replaced by the cause read from the row (walking to a deed → "đang đến X để …", men by role, etc.).
  - `j95party` now = herself + every one of her people walking with her (was: close maid only) — her retinue is not counted as bóng and not drawn as others.
  - Read API for the map levels: `j95here(place[,khắc])`, `j95whereId(id[,khắc])` (sent to MAP-ZONES session_01Rc5AsJdJ7NfUTTcbii1sqc: read positions only from S.roster).
  - Perf: the pass skips when nothing changed (same buổi, same mistress places, households, deed slots, same rows); place names cached per buổi; guard checks each row once (WeakSet).
- **dev/build/j95.js** (3 guarded lines): when `BAL.slv.on`, the old forcing of servant rows (mm:me always with her; staff back home every sync; fixHouse mm/st block) is off — j95s writes those rows. `BAL.slv.on=0` gives the old behaviour back. ACT95 + brk / stay / nightw.
- **dev/build/jagday.js agTell** (1 guard): a servant does not "carry news" to a master who stands at the same place and khắc (she sees it herself). Before, staff never stood beside their master away from home, so this never arose.
- **dev/tools/roster.js `--who <name|id|role>` [--all] [--json]**: "now: <place>, khắc k of buổi b (week w), doing <act>, with <target>, because <reason>" + her timeline over S.rlog + the current buổi (plan khắc marked); roles "cung nữ của ta", "thái giám của ta", "người hầu của ta", "cung nữ thân tín của ta" or any role as written; ACT names now also read from every `Object.assign(ACT95,…)` in j95*.js. Old usage unchanged. **ROSTER.md** updated (§1 --who, §3b live servants, §4 tests).
- Tests/tools: **dev/test/live-servants.test.js** (T1–T5), **dev/test/live-servants-probe.js** (one maid's day + reason stats; ROAD=maid).

## (3b) moves after the plan → written into the record with their reason (audit)
| writer | rows | reason |
|---|---|---|
| jagday agPlanX / agTickX (staff + Emperor/Thái hậu deeds) | `ag_<deed>` at the deed khắc | agWhyN (never empty) — kept by j95s |
| jagday agHeard / jagent agReapply (re-decide in khắc, walking) | `go` + `ag_*` | info.why / p.why; an empty `go` → guard "đang đến X để …" |
| jagday agTell / agRdDeliver (servant carries news) | `ag_tell` | why of the news — kept |
| j95b j95bPut, j95c (people moved by event text, summons) | place/act | event cause + "nguồn: …" (existing) |
| j95fixHouse (housing changes), j95sync (cấm túc, lãnh cung, freed, elders, Nội vụ phủ) | moves | own reasons (existing) |
| j95secApply (trysts, plot errands) | tryst / meet | "tư tình…", "chủ sai việc kín" — kept |
| j95s (servant day, retinue) | all servant rows | real cause (above) |
| co-op guest/host | record off in co-op (j95on false) | n/a (unchanged) |
Safety net = guard; it fired 0 times in all probe runs after j95s (the writers above already give reasons).

## Before / after — one maid's day (seed 1, same life start; probe dev/test/live-servants-probe.js)
Hoàng hậu Khương Nhược Lan's close maid **Song Hỷ** (mm:1) and the player's close maid **Hải Đường** (mm:me):
| buổi / khắc | OLD (main 94d11623) | NEW (560014be) |
|---|---|---|
| Sáng k1–4, Song Hỷ | Đức Thọ cung · theo hầu chủ · "theo hầu chủ ra ngoài" (always, alone) | Đức Thọ cung · theo hầu chủ · "Hoàng hậu sang Đức Thọ cung, cung nữ thân cận theo hầu" (+ others of the train, size by rank × place) |
| Trưa k1–4, Song Hỷ | Thái y viện · "theo hầu chủ ra ngoài" | Thái y viện · "Hoàng hậu sang Thái y viện, cung nữ thân cận theo hầu" |
| Sáng k1–4, Hải Đường (player at home) | home · hầu hạ chủ · "phận sự trong cung" ×4 | home · hầu hạ chủ · "hầu ngươi chải đầu, dâng trà sáng" |
| Trưa k1–2 | home · "phận sự trong cung" | home · dùng bữa · "đến giờ cơm của cung nhân" |
| Trưa k3 | home · "phận sự trong cung" | home · hầu hạ chủ · "dọn bữa trưa, hầu ngươi" |
| Tối k3–4 | home · "phận sự trong cung" | home · canh đêm · "đến phiên canh đêm cho ngươi" |
| a buổi out (another life, test 3) | — (never left her) | Kính sự phòng · đi việc vặt · "ngươi sai đi Kính sự phòng hỏi chuyện" (whole buổi) |
| the player goes out | always followed, alone | retinue by HER rank (close maid first if free, else "cung nữ thân cận … đang bận …, nên ngươi chọn … theo hầu"), the others "ngươi sang …, ở lại trông cung" |

## Family scan (law 11): filler reasons by kind, probe on 6 buổi × every khắc
| kind | OLD filler/rows | NEW filler/rows (3 lives consort road + 1 maid road) |
|---|---|---|
| servants (s) | 336 / 440 (all `go` with empty reason) | 0 |
| close maids (mm) | 71 / 220 ("phận sự trong cung") | 0 |
| consorts, Emperor, Thái hậu, court, kids, men, officials | 0 | 0 |
Retinue size by mistress rank (followers per outing-khắc), OLD always 1 → NEW: rank 0–2: 1 · Tần 1.29 (max 2) · Phi 2 · Quý phi 2 · Hoàng hậu 2.89 (max 4 at the garden; 5 at Dưỡng Hòa điện / Cần Chính điện / Đức Thọ cung). Servants away from their palace in a khắc: 23 % → 46 %.

## GATES
| gate | result |
|---|---|
| roster.js self-check, 3 fresh lives × several khắc (17 saves) | PASS (exit 0 on all) — in live-servants.test.js T5 |
| new unit test live-servants.test.js (retinue by rank ×22 trials/life, close-busy fallback, player's maids + party, no filler, --who) | PASS (3 lives) |
| quickcheck (dev/tools/quickcheck.js: open, old live save loads + plays, perf smoke vs live) | PASS (render 263/228 ms, tab 461/450, buổi 1407/1226, tasks>200ms 18/18) |
| core gates G1 one-core-guard / text / bind | PASS |
| G2 rules-one-source (old save, 16 perturbations) | PASS |
| G4 odds-cap · coop-one-world · mk-layer-scan · anchor-table | PASS |
| time-spill-guard | PASS (46 runtime checks) |
| ag2perf-a (re-decide causes) | PASS |
| deeds (ag2perf-deeds, 160 buổi, 5 seeds) | total live 2901 / new 2931 (+1 %); per seed live 615/569/594/609/514, new 645/502/591/644/549 (per-seed spread = trajectory divergence: servants' places shift the random stream; seed 2 also shows it with BAL.slv.on=0 vs on). Staff landings 88 / 66 (seed 2 outlier 20→2; others 68 / 64) |
| perf 4x per khắc (ag2perf-probe, 24 buổi × 4 khắc, 5 seeds) | median 2.90 → 2.72 ms, mean 5.42 → 4.80 ms (≤ +10 %: PASS) |
| **BLOCKED here (network policy, host 403 via proxy)** | build_site assets step + G4 manifest-guard (ctm-img…workers.dev), G3 kit-conform pictures (same CDN; live main fails G3 identically here: MIXED 21), coop-e2e (ctm-coop…workers.dev: no room code). Code path: the record is off in co-op (j95on false), so co-op is untouched. Please run these three on a box with the CDN / Worker. |
Build note: index.html built by build_site.sh up to the assets step + buildinfo; sw.js regenerated with the build_site algorithm (V verified: the same algorithm reproduces main's 905429a8603c), PRE list kept from main's sw.js (the CDN index could not be read). A rebuild with network should give the same files unless the CDN list changed.

## For MAIN / owner decisions (not changed; noted)
- The player's own close maid now really leaves (errands / visits, retinue only when free): when she is away the home stage no longer draws her (people ledger), so her talk options are not on the stage until she is back — the owner's point (5) "khi cần mà không thấy thì phải đi tìm". If MAIN wants a "call her back" button, that is a new UI (kit) item → parking lot / kit request.
- Expect a merge with review/npc-purpose (its j95.js / jagday.js hunks are in other lines).


## HANDOVER (worker rolled over at ~30 % context, 18/11 ~20:20Z) — for the successor, opened by foreman C-AG #15
Read first: brief dev/handover/briefs/live-servants.md (sections (2) rewritten 19:55Z = ENTOURAGE PICKER, (5) added 20:07Z = rest/sleep rhythm) + OD 18/11 ~19:45Z point (4) verbatim + OD L1901.
Branch review/live-servants @ 560014be (from main 94d11623). LIVE main is now 13bb8c88 → merge newest main first (git fetch --depth=30 under flock; if the merge needs history: --deepen). Rebuild: python3 dev/build/assemble.py; root index.html/sw.js as in the Build note above (CDN host blocked in these containers).
What is reusable as is: j95s.js servant day (BAL.slv.day: serve/clean/eat/brk/err/vis/sleep, sleep from khắc BAL.slv.sleepFrom in tối, one night watch per household), reason guard, j95party for followers, skip logic (perf), roster.js --who, tests/probe, agTell same-place skip, j95.js guards.
TO DO:
1. (2) REPLACE the rank retinue (j95sPick / BAL.slv.ret/retTh/retNd/occ) by the ENTOURAGE PICKER: player's first Dư đồ departure of the day → one picker (how many + who, among her maids present AND free; busy/absent greyed per the grey rule; once a day, no adding once out). Store the day's pick on S (e.g. S.ent={d:wk(),ids:[…]}) and make j95sPass use it for her outings that day (the followers = picked ∩ still free). UI only from kit parts (dev/kit/KIT.md: option rows / checklist?) — a missing part → STOP, dev/kit/KIT_REQUESTS.md + tell the foreman. NPC mistresses pick the same way (two-way): one pick per day by her needs/traits (replace the rank-size draw with her own choice; free up to all). Hook point for "first departure": goTo wrapper (j41/j95 final wrappers list goTo).
2. WITNESSES: only that day's companions see what she sees/does (where the game rolls maid witnesses, restrict to S.ent ids at her place), later gossip via the existing per-maid knowledge chain (jagknow kn* / agTell) — grep kn chain first (GATE ZERO).
3. (5) REST/SLEEP RHYTHM: MAIN's note came from main (no j95s there). On the branch servants already sleep in tối from BAL.slv.sleepFrom with reason "hết phiên, về phòng cung nhân ngủ" + break/meal rows; check MAIN's exact ask (rest hours from BAL by slot, maybe shift sleep / rest turns per servant) and extend BAL.slv (e.g. per-servant rest turn) + show in roster.js --who; T-test it.
4. Update live-servants.test.js: T1 (rank sizes) → picker tests (count/choice, only present+free, once a day, no adding), witnesses + gossip, NPC picks; keep T3–T5. Re-run all gates (table above) incl. perf 4x (scripts: dev/test/ag2perf-probe.js; my 5-seed loop = run live vs new × seeds 1–5, 24 buổi × 4 khắc).
5. Report here + SẴN SÀNG KIỂM <sha> to C-AG #15.
Scratch (may be wiped): /home/user/wt/ls-scratch (live.html = main 94d11623 dev build). Worktree /home/user/wt/ls (sparse) holds the branch.
