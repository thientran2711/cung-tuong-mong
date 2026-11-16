# PROGRESS: review/schedules3 — D29 re-port of j95 (who is where, ONE location ledger) onto main

Owner rules: dev/OWNER_DECISIONS.md lines 32–36 (habits/intentions/surprises, trysts, S.roster, motive gate, ROSTER bot audit).
Source branches: `review/schedules2` 3e55eb5 (independent PASS 14/11, never merged; 1100+ commits behind main) and `wip/kit-j95` c13abcd
(kit UI, reviewer FAIL, WIP). Their old notes are kept in `.old/PROGRESS_schedules.md` of the worktree only; the logic description below
replaces them. Branch made from origin/main 900ace7 (no merge of the old branches: files copied and ported one by one).

## What was ported (files)
| file | from | state |
|---|---|---|
| dev/build/j95.js | schedules2 | ported + adapted (below) |
| dev/build/j95b.js | schedules2 | ported; option texts rewritten; new main cards declared |
| dev/build/j95c.js | schedules2 | ported; servant name dedupe follows main (no numbers) |
| dev/build/jqsave.js | schedules2 | ported as is (data-only choice cards survive save/load; autosave held while a code card waits) |
| dev/build/jk95.js | wip/kit-j95 | ONLY the parts that use existing kit pieces (see KIT REQUEST) |
| dev/tools/roster.js, dev/tools/ROSTER.md | schedules2 | ported; map self-check uses the same "visible" rule |
| dev/test/roster_audit.js, roster_audit_c.js, roster_dom.js, roster_sim.js, indep/* | schedules2 | ported; (a)/(c) adapted to jmen + visible counts; extra stage check |

Load order (dev/build/assemble.py): `… jk2b, jk95, j98 …` and at the very end `… jopic, j95, j95b, j95c, jqsave` (j95 wraps many
functions, so it must be the outermost wrapper; it was "after j84" on schedules2, main added ~40 modules after j84 since).

## Adaptations to current main (why)
1. **Men come from jmen (main, owner 11/15: "no dice for who enters the hậu cung").** jmen decides every man's place and reason each buổi
   (S.menW / S.menWhy) and makes the lovers' trysts (S.menPlans) with its own catch card (Báo thị vệ · Báo Cung Chính ti · Giấu giúp · Núp
   nghe lén · Làm như không thấy) and the two-way catch (she is seen talking with a man). So while `menRoad()`:
   - the record takes every man from S.menW with the reason from S.menWhy (`j95menAct`: duty / summons / order / visit / fest / stray:
     tryst, letter, overstay, seek); men jmen does not place are not in the palace (off-duty guards, the physician at night are gone from
     the record, no more "always at Cần Chính");
   - the consort jmen sends to a meeting gets "hẹn hò lén / lén gửi thư" with the man as target and the real reason;
   - j95's OWN affair trysts and its j22 `tryst` catch wrapper are OFF (they would double jmen's); they still run on the maid road
     (jmen is consort-only);
   - the map's two-shadows sign also marks jmen's tryst spots (`j95mapSigns`);
   - officials inside for the audience / a banquet (jmen S.minW) are now in the record (`q:<office>`), and the stage draws them.
   - a man whose order is at a palace whose head moved away follows the consort he came for, else leaves (`J95OUT` "ngoai").
2. **Co-op:** one world state is the owner's rule; S.roster is not in the co-op world keys yet, and the guest overwrites S.where with the
   host's. To avoid two different records the location record is OFF in a co-op room (`j95on()` false while `COOPW.on`); the motive gate
   stays ON there (`j95gate()`). Follow-up item (see Owner/coordinator questions).
3. **Map count = the people she would meet there** (main rule review/stage-slots, test dev/test/stage-counts.js; j59 answers her own place
   and "home" from the stage itself). One rule `j95vis(id,place)`: consorts (at her palace only visitors, not consorts living there), the
   Emperor (not at her palace, not at Dưỡng Hòa điện when Sủng < 50 — not drawn there), Thái hậu, men, officials, the court physician, the
   Kính sự phòng eunuch; at her palace also her maid and children. Servants, other maids, children elsewhere, Tổng quản, the peddler stay
   in the record but are not counted (they are not drawn). countAt, R.m (map numbers recorded per khắc), j95check, roster.js and the audit
   all use it. The stage is reconciled to it (`j95stage` now also adds men, officials, physician, eunuch from the record; `j95dedupe` keeps
   one figure per person — an inner render used to reconcile before j22 added the same men again); visitors at her palace are in
   `homePeople()`; while she is away from her palace (her maid follows her) "home" is counted from the record. The maid road keeps its own
   stage (j42 srvVisitOf + j59srvCount, which read whereOf = the record). jk95's crowd chip (up to 20 shadows) is therefore obsolete.
4. **Motive gate, whole family:** every act the game groups as harm in RVGRP (j9 + jecon/jtsb/jpoison/jpet: spyk, bribel, blockf, thathu,
   phonghoa, batnat, thaopet, petsteal, pgift …) is gated; "Giao thiệp" acts (petcare …) are friendly. New main cards with a consort
   in their params declared for the event gate: tsbBul, tsbOmen, pgin.
5. **Option texts (owner 11/15 07:15Z: every option shows Tốn / Được / Mất + odds word):** the catch card (Tố giác lên Hoàng hậu / Xử tội /
   Tố giác lên Hoàng thượng / Giữ làm con bài / Lặng im / Giả như không thấy), the bribe card (Nhận lễ / Trả lại hộp gấm) and the rumour card
   (Sang gặp giải bày / Cho người tra / Mặc kệ) now carry "word · tốn · thành · hỏng · kèm" like jmen's cards (kit j63 rows). No "có thể", no %.
6. **Servant names:** j95c used to rename duplicates "X 2"; main forbids numbers (jaudit aaNamesFix renamed them on every load, which changed
   the record on save/load). It now takes an unused name from the same pool.

## Dropped (and why)
- j95 affair trysts + its tryst catch + j95npcCatch on the consort road: replaced by jmen (live on main, owner-approved, deterministic).
- jk95 map pair-shadow badge, "N người theo hầu" stage tag line, crowd chip: new visual parts = KIT REQUEST (ONE KIT KEEPER rule 16/11);
  crowd chip obsolete (point 3).
- Old schedules2 balance merges (review/balance v9b etc.): already superseded on main; nothing taken from them.

## KIT REQUEST (stopped, data API ready)
1. Map: an anonymous "two shadows close together" mark on a place with a secret meeting now — data `j95mapSigns()` → {placeKey: text}.
   Used on the Dư đồ place spots. Interim: the place card text already says "Có hai bóng người đứng sát nhau trong chỗ khuất."
2. Stage name tag second line "N người theo hầu" for a consort / her — data `j95followers(p)` → [{id,name,role}].
3. (Check) jk95 adds two sections to the person card built only from kit pieces (kpsec + kpst title, kitRows, kitChip "tin cũ" n /
   watchers r, kpnote) with NO CSS of its own: "Thói quen" (other people) and "Nơi ngươi hay đến" (her own card, only after her tai mắt
   reported a watcher). If the kit keeper wants these as a named kit part, register it; the code only calls kit functions.

## LEDGER API (for D13 spread events across buổi, D30 palace map, and any reader) — read only through these
Record: `S.roster` (saved) = `{key:"<wk>-<buổi>", wk, b, nb, c (canonical slot 0 Sáng..3 Tối), kh (khắc last synced), P, who, m, acts, ev}`
- `P[id]` = 4 entries (khắc 0..3) `[place, act, target, reason]`. place = j77 code (`home` her palace, `rN` palace of consort N, `kn`, `tn`,
  `dtd`, `thu`, `vuon`, `tyv`, `ksp`, `lc`, `tgk`, …) or `"ngoai"` (outside the palace, never on the map). act = key of `ACT95` (text there).
  target = an id. reason = text from real state.
- ids: `me` (her), `emp`, `th`, `v<N>` consort, `mm:<me|N>` trusted maid, `s<sid>` servant, `c:<tq|ksp|ped|ty>` court people,
  `m<N>` man (j22/jmen), `q:<office>` official, `k:<me|N>:<i>` child.
- `who[id]` = [name, role]. `m[kh]` = map numbers shown at that khắc (visible people per place). `acts` = last 60 gate lines
  `{id,kh,k,t,why,ok,ex,src}`.
- History: `S.rlog` = this week + 4 before, packed (read with `j95table(week,buổi,khắc)` or dev/tools/roster.js).
Functions:
- `whereOf(p)` → place of consort p now (record). `rosterWhere(m)` → place of a man now (adds him at his first haunt if absent; j96).
- `countAt(k)` → how many people she would meet at k now (= map number = stage). `j95vis(id,k)` → is that record line counted/drawn.
- `j95table(t,b,kh)` → `{at,total,rows:[{id,name,role,place,placeName,act,tgt,why}],dup,miss,mapMismatch,ok}`; `window.__roster()` prints it.
- `j95kh()` current khắc 0..3, `j95key()` current buổi key, `j95c(b)` canonical slot of a buổi, `J95.B4` slot names.
- `motiveOK(a,t,kind)` → `{ok, why, ex}` the shared motive gate (kind = act key; harm set H95, friendly F95). Any new NPC decision aimed at
  someone must call it (and log with `j95actLog(a,t,kind,g)`); events with actors declare roles in `E95B` (j68) / `P95B` (other mkP cards).
- Place text in events: `j95bPut(id,k,act,why,src)` moves someone in the record for the current khắc (j95b scans card text too);
  turn-of-buổi acts use `j95bPutPast` (never rewrites a shown khắc).
- Knowledge (fog): `habitsKnown(p)`, `j95habitsMine()`, `j95followers(p)`, `j95mapSigns()`, `j95bRumours()`.
- Off switches for measuring: `window.__j95off`, `__j95boff`, `__jqoff`. The record is off in co-op (see 2).
How D13 / D30 should use it: never place people yourselves; to move someone for an event call `j95bPut` (now) or schedule through the
weekly intentions (`S.j95.it`, `j95intent`); to draw a palace map read `S.roster.P` at `j95kh()` and count with `j95vis`.

## Tests
(filled below)
- Merged origin/main eba64ea mid-task (337 new commits): j95 files now load just before jkpc (kept last). Adapted: jstaff named staff +
  Thái hậu household in the record at their posts (stage draws them); jtruth `vuoan` card declared; maid road counts the named staff.
- Bot audit (dev/test/roster_audit.js + roster_audit_c.js, 2 game years/life, all 9 origins, smart + random):
  build c.ca22ede (before the main merge): 36 lives (18 sens all reached 2 years, 18 rand), 23 155 checks: (b)–(g),(i)–(r) 0;
  (a) 2 (one khắc when a maid is raised to consort mid-buổi: jmen's last S.menWhy is stale until the next buổi — known, minor);
  (h) 27 = a test artefact fixed after (check now uses the arrival khắc and visible people). Page errors 0, J95/J95B/J95C errors 0.
  Earlier rounds 36 lives: all 0 except maid-road stage rule (fixed: srvWhere/j95srvStage).
  Final re-run on the merged build a1f5628 (36 lives + roster_dom 5 viewports) was still running at hand-off: RE-RUN BEFORE MERGE:
  `CAP=3300 node dev/test/roster_audit.js sens 18 out.json 0; ... rand 18 out.json 4`.
- dev/test/stage-counts.js (main test): this branch thd 0 / cnv 0 mismatches; main eba64ea itself: 9 (named staff not counted).
- dev/test/roster_dom.js (map / stage / roster.js vs record, 20 moments): 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 @2: 0 bad, 0 page errors (pre-merge build).
- Person card "Thói quen" (jk95) verified in the card's facts column at 755x1000.
- kit_dupes.js OK. Old-save test dev/test/roster_oldsave.js written, NOT yet run (uismoke.js timed out on the PWA root page).
- Known main issues found (not fixed, outside j95): jmen assumes 3 buổi (night = buổi 2 = Chiều now; tryst plans b:2; guard roster w*3+b);
  jstaff draws the Thái hậu elder at both Đức Thọ cung and Tân Giả khố on the maid road (one person, two places).

## Finishing pass (16/11, worker opened by Foreman C)
Merged origin/main 0a311183 (9 commits: jreign, jrail, goal strip); assemble order kept (jk95 after jk2b; j95, j95b, j95c, jqsave just
before jkpc, which stays last); site rebuilt. The merged-build audit then showed failures the pre-merge runs could not see (jstaff + jplx
came in with the eba64ea merge). Fixed (all inside j95/j95b/jk95 files or tests; no main module edited):
1. **Named elders (jstaff)**: `J95.eld[id]=eid`; `j95vis` counts an elder only where jstaff `addStage` draws her (tn elder at Đức Thọ cung
   while Thái hậu lives, kn elder at Càn Ninh cung, gt elder at her home only in turns ≤4). The gt elder after turn 4 stood at Đức Thọ cung
   in the record, counted, never drawn → map +1.
2. **jplx places (one ledger)**: the record now takes jplx's own lists: servants resting at Dãy nhà cung nhân (`plxServants`) and punished
   at Tân Giả khố (`plxTgk`) get kind `px` (acts `offduty` / `laundry`), children 6+ go where `plxKidPlace` says (Thượng thư phòng / A ca sở /
   Đông cung), the two fixtures are ids `c:tgk` (Quản sự Tân Giả khố) and `c:ttp` (Thầy dạy, `ngoai` when no class). They are resynced every
   khắc for now and later khắc (lists change inside a buổi). `j95stage` adds any missing jplx entry at those places. Not on the maid road
   (jplx skips it; `j95vis` false there).
3. **Overlaps between main modules, reconciled in j95 (one person, one place)**: jplx's rest list could take a named elder, a maid punished at
   Tân Giả khố, or (at night) her trusted maid while the home stage draws her; jplx's punished list could take a named elder. j95 wraps
   `plxServants` / `plxTgk` to drop those (they stay where the record and the other stage put them).
4. **Newcomer mid-buổi** (a birth): khắc already shown get `[ngoai, away, "chưa có trong cung lúc ấy"]`; a child born while she is home
   joins the home stage.
5. **Motive gate, whole family**: j83 handmade works (`wkGive` gift, `wkPoison`) aimed at a person pass `motiveOK` like `runAct` (a sad
   consort sent her a gift card through j83, ungated). Scan of PEND cards reading a consort from params: 26 cards, newly declared `tsbFirst`,
   `rcpacc` (others are covered: e68 via E95B, player-chosen `itarget`, no consort in shop/thbenh/tuyen/vase).
6. **Text scan**: `j95bNoTitles` drops jstaff titles ("Quản sự ma ma Càn Ninh cung", "<x> cô cô ở Đức Thọ cung") before reading place
   words (the monthly report put a confined consort "at Càn Ninh cung").
7. jk95 "Thói quen": checked on main's card layout (sticky act-tab bar `.kpstick`): with no facts block the section sits at the end of the
   right column (putting it above the sticky bar is covered by the bar's negative margin/shadow, so left as is).
Tests changed (test-side gaps, not game bugs): old-save + roster_dom start a life with `__nlInner=1` (main's start() opens the next-life
flow otherwise, nothing was saved); roster_dom ORIGIN env; maid road: map checked by stage-counts.js, stage caps (4 consorts; at home only
the mistress); audit knows elder / npc / fixture stage entries, elders' posts in (l), plxKidPlace in (k), jplx places in (c);
roster.js tool knows elders + jplx places. **Known main bug kept visible, not hidden**: jstaff draws the Đức Thọ cung elder at Tân Giả khố
too (consort road as well) → map at Tân Giả khố = record + 1; the audit counts it as `knownTgkElder`, roster_dom as `known`.

Final results on the merged build (main 0a311183 + this branch):
| test | result |
|---|---|
| roster_audit sens 18 (all 9 origins) | 17 498 checks: (a),(b),(d)–(r) 0; (c) 2 (one moment, see open 1); page errors 0; J95/J95B errors 0 |
| roster_audit rand 18 (shard 4) | 9 248 checks: all 0; page errors 0 |
| roster_oldsave (save made on main → this build) | loads at 755x1000 + 1180x820, record built on load, 12 buổi clean, 0 errors |
| stage-counts.js | thd 139 / cnv 62 walks, 0 mismatches, 0 errors |
| roster_dom 20 moments | 755x1000 random 0 bad, 1180x820 random 0 bad, 755x1000 maid road (cnv) 0 bad; 0 page errors, no overflow |
| rotate prompt, built root page, iPhone 390x844 host mode | "Xoay ngang điện thoại để chơi" shown, game frame 1180x820 rotated, 0 errors |
| person card "Thói quen" 755x1000 | kit rows (Buổi sáng · Ngự hoa viên · Tai mắt kể · 3 lần …), end of right column |
Open: (1) 1 moment in 36 lives: a walk to Đức Thọ cung drew Thái hậu without her Chưởng sự cô cô (jstaff stage hook missed on that path;
record right). (2) Known (a) at a mid-buổi maid→consort promotion (documented above) did not show this round. (3) Main bugs for session 8:
jstaff Tân Giả khố double placement (both roads), jmen 3-buổi assumption; the jplx×jstaff overlaps are reconciled in j95 (point 3) but the
owners of jplx/jstaff may prefer to fix them at source.

## Fix pass 2 (review/schedules3-r2, 16/11) — after the reviewer's FAIL on r1 (dev/handover/reports/review-schedules3-r1.md)
Base: review/schedules3-r1 f74f95d3 + merge of origin/main 18fb8252 (assemble: j95 order kept; main's new jpdlg after jk4). Site rebuilt.
Root cause of items 1–4: j95 reconciled the stage only inside its own goTo/sync, but main modules loaded AFTER j95 (jact, jhouse, jkc, …)
and older ones on other paths (jstaff addStage, j22 men, jhouse coldVisit) add people later. Fix at the root, for the whole family:
- **ONE final reconcile, outermost** (`j95final`, installed with setTimeout 0 like j59's outermost countAt, so it wraps every module
  whatever the load order): after `goTo, spend, nextBuoi, endTurn, coldVisit, talk, closeModal, chooseM` and before every `renderStage`, the
  stage list is made to follow the record (j95stage + `j95elderFix` + j95dedupe); redraws only if something changed. `homePeople` (her room
  stage AND the map number of her room through j59) is wrapped last too for the named elders. Off in co-op (j95on) and on a trip outside
  the palace (jkc isKc). The bots stub renderStage, so the data-path hooks are what the audit sees; the renderStage hook covers the real game.
- **Item 1 (her servants in lãnh cung)**: the stage did draw them (kind `serv`); the audit did not recognise kind `serv` (test gap). Audit fixed
  both ways. Also: a drawn servant the record no longer has (sold / moved) now leaves the stage.
- **Item 2 (Nội vụ phủ eunuch)**: (a) audit did not recognise kind `peddler` (test gap, fixed). (b) "đếm nvp: bản đồ 2 sổ 1" happened while she
  was in LÃNH CUNG: jact adds +1 to countAt("nvp") unconditionally, and j95 took it off only while the place exists. Now: j95's countAt always
  takes jact's +1 off for nvp; `j95vis("c:ped","nvp")` needs `j95nvp()`; the record line of c:ped follows `j95nvp()` from the current khắc on
  (she can fall mid-buổi). One peddler entry: jact and j95stage both check `kind==="peddler"` before adding, and j95dedupe keeps one.
- **Item 3 (home elder)**: the record now re-applies the post rule `j95elderK` to every named elder from the current khắc on at each sync (eid
  given after the plan, turn 4 passing, Thái hậu dying, her fall), and the final reconcile makes the stage (and homePeople) follow the record.
- **Item 4 (intermittent men)**: a drawn man the record does not have at all (j22 pushes from a stale S.menW before the sync) was never
  removed (the guard was `R.P[id]` exists). Now a `man` entry not at this place in the record leaves the stage. stage-counts 3×: 0.
- **Audit (h)**: the rule text says "or the record says why not (cấm túc / lãnh cung)": a card that places a consort and then confines her in
  the same choice is now counted as `placeWhy`, not an error (record right).
- dev/tools/roster.js: c:ped visible at nvp only when the place exists (not in lãnh cung / maid road).
Family scan (modules that put people on a stage or count a place; script in the r2 report): j2/j3/j6/j9/j14/j41 (build S.visit), j22 (men),
j42 (maid road, own rules), jmen (officials), jres (residence filter), jsl, jplx, jstaff, jact, jkc, jhouse, j59 (count) — all now pass through
the final reconcile (stage) or j95's countAt (map); jcoopworld is co-op (ledger off).

Ledger API changes in r2 (additive only; nothing removed or renamed):
- new `j95final()` → true if the stage list changed (call after you add people to S.visit yourself; it is already run after the paths above).
- new `j95elderFix(list, place, R, kh)` and `j95elderEntry(st)` (named elders on a stage list follow the record).
- `j95vis("c:ped", "nvp")` is now also false when the Nội vụ phủ place does not exist (`j95nvp()` false).
- `countAt("nvp")`: the final number = record in every state (jact's +1 is taken off whenever jact is loaded).
- record: elders' and c:ped's now/later khắc are resynced each sync (no change to the shape `[place, act, target, reason]`).

Results (r2 build = main 18fb8252 + r1 + r2): see dev/handover/reports/review-schedules3-r2.md (docs branch).
