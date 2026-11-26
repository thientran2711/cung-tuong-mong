# TITLE-PARITY — every «Danh hiệu» counter is two-way (law 1)

Order: MAIN 166 (after RV-163C PASS of review/title-bal 61bdd97d): titles from dhStreak / dhThMonth counted only her; NPC phi tần must earn them under the same BAL rule.
PRIORITY #1 CHECK ('dhStreak title npc'): OD — (law 1 OD:L33/L1534) | main: none (title-bal not landed yet) | review/*: only review/title-bal(-r163c) | claims: none.
(dev/tools/prio1.sh is not in this tree; the check was done by hand with git grep.)
Branch `review/title-parity` on top of 61bdd97d.

## Law-11 scan — every title source, who could earn it (before → after)

| title (key) | counter | her | NPC before | NPC after |
|---|---|---|---|---|
| 15 contest titles (w_*), Bảng vàng đề tên (podium), Tài hoa vô song (meta), Sen nở trong bùn (c_han) | cFin7 (every contest) | yes | yes | yes (unchanged) |
| Trăng soi rèm ngọc (nights), Phúc ấm đầy nhà (kids), 8 mastery titles (l_*) | derived from state (p.nights / p.kids / art level) | yes | yes | yes (unchanged) |
| 5 work titles (m_*) | wkMake (her + NPC works) | yes | yes | yes (unchanged) |
| **Sớm viếng chiều thăm** (a_thinh) | day streak | yes (runOpt card) | **no** (`me:1`) | **yes**: Thỉnh an Thái hậu / Hoàng hậu through the one deed table TW (jtwoway `thTH` / `thHH` run, which NPC agents and see:join use) |
| **Thư hương** (a_doc) | count of successful reading | yes | **no** (`me:1`) | **yes**: NPC agent deed `cx:book` (jagacts, same cost / odds as her card); a failed deed does not count |
| **Dung nhan như ngọc** (a_nhan) | count of successful beauty care | yes | **no** (`me:1`) | **yes**: NPC agent deed `cx:face` |
| **Thái hậu ưu ái** (c_th) | months in a row with Thái hậu's liking ≥ BAL.dh.cond.th.v | yes (S.th) | **no** (`me:1`) | **yes**: rivalsMonth runs the same dhThMonth on every NPC (p.th) |
| Thiên mệnh (ge_*), Khuê các (kc_*) | her own grand ending / her own home road | yes | n/a (bound to her life story, no NPC counterpart) | unchanged |

Player-only titles: before 4 (a_thinh, a_doc, a_nhan, c_th) → after 0 (outside the two life-story groups). Same bars (BAL.dh.T), same quality / streak rules, same co-op rule (NPC counting on the host only, npcOK).

## Checks
- dev/test/title-parity.js (new): PASS — scan, NPC streak via TW (same day once, gap restarts, failed deed adds nothing), NPC cx:face / cx:book (fail does not count), NPC c_th through rivalsMonth, NPC earns + wears.
- dev/test/title-bal.js: PASS.
- dev/test/title-sys.js: fails = the SAME list on base 61bdd97d without this change («no dialog», «place/festival style name», gSung / gDanh / gTren / gHau / NPC gSung (the stat-pace merge from LIVE 4cfcda61 now paces those gains), «thai») — pre-existing, not from this branch.

RV READY → RV-163C + MAIN 166.
