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
