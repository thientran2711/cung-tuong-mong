# Row 4 + 22 — side-line dialogue scenes (B WORKER ROWS 4+22) — HANDOVER (rolled at context line)

PRIORITY #1 CHECK: OWNER_DECISIONS / HANDOVER / PROGRESS grepped; origin/main + origin/review/* git-grepped; CLAIMS + FOREMAN_B_STATUS read. Reused: jdlgs engine + DLGS_DATA (jdlgsd_build.py), KIT §95 kitDialogue/kitScene, lib/dlgs-off.js guard. Row 22 (THIN P4/P6/P8) already LIVE — struck by MAIN, no work.

## STEP 0
| Item | State | Action |
|---|---|---|
| Row 22 THIN P4/P6/P8 roads | LIVE | none (struck) |
| Side-line / quest scenes (jdlgs, DLGS_DATA, BAL.dlgs) | on old branch | re-landed as review/sideline-dlg-4 on new LIVE |
| Main-road chapter scenes (609 units) | missing | helper B ROW4 ROAD-DIALOGUE (session_01N1tNP6X94bVbzA5TSJzzxJ) → review/road-dialogue, SSKs separately |

## Branch
review/sideline-dlg-4 @ be27aead348bda97bebfff793c6b20235d413641, merged on LIVE aecbc267. **LIVE is now 8a1a71de → successor must re-merge first.**

## What changed
- assemble.py: 'jdlgsd.js','jdlgs.js' right after 'jkitsel.js'.
- j71c.js compCard keeps `dlg:dlgsMk("j71:"+sd.id,…)` + LIVE rcpReg.
- jbal2.js: duplicate BAL.kdlg removed (one-core-guard), BAL.dlgs kept.
- jdlgs.js law-11 fix: after a scene ends, re-run jnolock's dead-screen judgement on the card that was hidden under the scene (kitDomDead → showModal).
- Tests: 84 conflicted + 117 auto-guarded with lib/dlgs-off ('off' card/scan tests, 'tap' play bots); EXEMPT rows added in dlgs-guard-scan.js; dead-card.js → 'off'; dlgs-play.js: stp/evc off, KIT_RING off, DQ.user=1, title veil case-free compare, `.kscn:not(.kring)`.

## Law-11 table (family fixes)
| Family | Before | After |
|---|---|---|
| Unguarded tests (dlgs-guard-scan) | 126 | 0 |
| BAL.kdlg set count | 2 | 1 |
| Card hidden under scene skipped by jnolock | dead-card FAIL 5 | DEAD-CARD PASS |
| dlgs-play "no scene resolved" (jdayq hold) | 655 FAIL | 0 |

## Gates on be27aead
| Gate | Result | Note |
|---|---|---|
| quickcheck perf/open/old save | PASS (render 251/280, buổi 1659/2748) | |
| core G4 96-noise-hygiene | FAIL | TEXT-HYGIENE FAIL 2 then PASS in the same gate (flaky); LIVE text-hygiene PASS; noise-day advisory. Successor: rerun once |
| q-softlock | FAIL | same FAIL on LIVE → pre-existing |
| j72c/j68c/kyc/j71c/wc/j7c plays | ALL PASS | |
| j70c-play | 1 FAIL "old j70 count unchanged (52/52)" | LIVE run crashed (#krotf timeout) → not comparable; successor: rerun on both |
| coop-e2e SWAP0/1 | timeout, 7 FAIL (seat B stalls buổi 0:3 «Chờ hảo hữu…») | LIVE 3 FAIL same coop-host-lag family; Foreman B: known red, owned by COOP-REBIRTH-RESYNC → pre-existing, do not chase |
| dlgs-play STEP=40 fold,ipadAir | 2823 PASS / 31 FAIL | ALL 31 are "cannot cast: q72Make nr_*" / j72 court cast — test harness cannot force those cards in this world after the aecbc267 merge; no scene fault. Successor: fix the caster in dlgs-play (nr_do/thu/che/emp) |
| dead-card | PASS | |

## Shots
Fold 755x1000 + iPad 1180x820 shots NOT yet taken/looked at 3× — successor does it.

## Handover (successor to-do)
1. Re-merge origin/main 8a1a71de into review/sideline-dlg-4 (redo assemble.py list insert; keep jdeadcard deleted; one BAL.kdlg).
2. Fix dlgs-play caster for q72Make nr_* + j72 court (31 cannot-cast).
3. Rerun j70c-play on branch AND LIVE; rerun quickcheck alone (one browser at a time).
4. Shots Fold + iPad, look 3×, outside git.
5. SSK «SẴN SÀNG KIỂM review/sideline-dlg-4 <sha> (BIG; on LIVE <sha>)» at end of FOREMAN_B_STATUS.md; message Foreman B. Note coop-e2e + q-softlock pre-existing.
6. Relay helper's SSK of review/road-dialogue if not yet sent.
