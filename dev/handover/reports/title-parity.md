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

## TITLE-SYS-FIX (MAIN 168: the 3 remaining title-sys failures, not stat-pace) — same branch

| failure | cause | fix (family) |
|---|---|---|
| «no dialog» | the test's visitor card never reached the screen: (1) jdfv / jgreet wait ≤ 4 s for the visitor's face picture, then re-show the card outside her act; (2) jdayq parks a card shown outside her act at day start; (3) j68 evGate drops a same-kind card shown recently (event spacing). The worn title itself is fine (line 1 of the figure caption, now `.k3ev>.kt3.kdhcap`, KIT §82.2 kitDhCap). | test only (dev/test/title-sys.js): the test card skips the face waits (`__dfWait/__fcW = 2`), is opened as her act (`DQ.user`), the spacing gate is off for the test page (`__e68off`), and the caption selector includes the kit's caption plate. Game unchanged. |
| «place/festival style name» | the Khuê các rare-ending title kc_R3 «Hội thơ ngộ vương» breaks the owner title-name rule (13:25Z D: no festival / place-style names; test /·|Tết|Hội /). | renamed **«Thơ ngộ vương gia»** (jkcg.js KCT; key kc_R3 kept, so a title already earned in an older life keeps showing, with the new name). Scan: no other title name in DH_CAT matches. |
| «thai a,b» | the «Dễ có thai» bonus (+v points) was added INSIDE later wrappers: jcycle (phase ×F, rounded) and jledger (float ×BAL.nt.concF) swallowed it, so wearing the title changed nothing. | jdh: the conception hook is installed OUTERMOST after every module loaded (setTimeout 0), +v points on the final chance; in ledger mode +v × BAL.nt.concF (the same unit); never when the chance is 0. Test checks the exact delta. |

Checks (Fold 755x1000@2 + iPad 1180x820@2): title-sys — «no dialog», place-name and thai now pass, dp = «Trăng soi rèm ngọc / Phi / …» on both; the remaining gSung / gDanh / gTren / gHau / NPC gSung are the stat-pace family (base 4cfcda61, PACE-SPEED-2). title-bal PASS, title-parity PASS.
