# ROAD DIALOGUE SCENES — report (B ROW4 ROAD-DIALOGUE helper; brief dev/handover/briefs/b-row4-road-dialogue.md; E70 job)
PRIORITY #1 CHECK ('E70|road dialogue|dlgsMk|road-dlg'): OD 1 (24/11 ~10:05Z STORY = DIALOGUE SCENES) | ledger 0 | claims 1 (ROWS 4+22 session_01N1tNP2GvCVsyLKPfx7RhNt) | main 0 | review/* 0 road-dialogue branch before this one | archive briefs/E70-road-dialogue.md = the job text. REUSED: side-line engine jdlgs.js (dlgsResolve / dlgsCtx / dlgsActor / dlgsPlay / DLGS.R), jdlgsd_build.py, dlgs_validate.py, dlgs-play.js, BAL.dlgs — one schema, one player; no second engine.
KIT CHECK: reuses kitScene.open / kitScene.light / kitDialogue.play / kitTypeLine (KIT §95) through jdlgs dlgsPlay; nothing drawn of its own (law 9).

## STATUS
- (11/28/2026 ~08:00Z) helper session_01N1tNP6X94bVbzA5TSJzzxJ (opus), depth 3. START_CTX ~3 % (used_tokens reads 0 → estimate; 1M window) → roll ≈28 %, ceiling 60 %. Worktrees /home/user/wt/rdlg (code, local rdlg = review/road-dialogue) + /home/user/wt/rdlg-ho (handover).
- Branch **review/road-dialogue** from review/sideline-dlg-4 98fbcccb (carries the side-line engine; rebase onto LIVE when sideline-dlg-4 lands).
- ecfe9831: adapter + inventory + validator family rd + style model rd_tt.md (51) + dlgs-play family rd. → WRITERS NEEDED (plan below).

## STEP 0 (what exists)
| piece | where | reuse |
|---|---|---|
| scene engine + KIT §95 player | review/sideline-dlg-4 dev/build/jdlgs.js | yes: one new resolver in DLGS.R |
| side-line scenes (2076) incl. NRASK road ASK hồi «nr:*» (644) | same branch, content/dlg/*.md | not redone |
| main-road chapter scenes | nowhere (main 0, review/* 0) | built here |
| road data | j67 ARC67 (premise arcs), jroad rdDef ROAD14 (.5–.11), jroadc RDC + jrdcsd RDCSD (THIN P8 composed) | read only |

## ENGINE (code on review/road-dialogue)
- `dev/build/jdlgs.js` `dlgsRd` (DLGS.R entry, card pid "j67"): plays before the FIRST hồi card of a chapter (thread A.i 0, no hồi yet), once; every later hồi has none. Unit id `dlgsRdId(A)`:
  `rd:<road>#<n>` (hand-typed road, .4 = premise arc ARC67[road], .5–.11 = rdDef) · `rd:<prem>#4` (THIN P8 composed premise) · `rd:<open part id>#open` (a composed chapter .5–.11 opens with ONE pool part: rdcComp(road,n).s[0] after a won chapter = s1, s[1] after a middle / lost one = s2) · `rd:<arc>#arc` (shared «*», st, eg, tm arcs).
- Roles = j67 cast words, resolved to the REAL person the road itself shows (`dlgsRdAct`, law 6b): v / v2 (the chapter's consorts, cast once by rdCast before the first hồi), hh (Hoàng hậu while there is one), th (while alive), emp, maid (her cung nữ thân tín), eun (Tổng quản), doc (Thái y), dad (tt/dtq father, dad67; speaks as an official: «vi thần» by her rank — a father's own word is typed «cha / con»), man (man67), lv (tm96 old love), kid / dau, mis (cn/cnv her mistress), foe (td enemy), me. A role with no living person = no scene (the card shows as before, never a wrong person).
- Text: {goi}/{xung} said by the line's speaker to the listener (jvoice kSay), then the road's TOK67 tokens ({v} {dad} {dadr} {sj} {land} …), then GEN ({S} {E} {M}). Strings only on the card (save-safe). Co-op: the story card is in the seat's own Q → the scene shows on the seat whose life it is. Old saves: nothing saved changes; a chapter already past its first hồi never gets a scene.
- Inventory `node dev/test/rdlg-inventory.js [--check]` (after build_site.sh) → dev/test/rdlg_units.jsonl (609 units; --check fails when stale). Validator `python3 dev/test/dlgs_validate.py [files] --strict --cover` family rd (roles per unit, placeholders per origin, 3–8 lines, ≤ BAL.dlgs.maxCh, no digit / % / odds word, xưng hô, speaker checks — all numbers from BAL.dlgs). `--units rd --o <origin>` = the writer list.
- Play: `DLGS_ONLY=rd:… node dev/test/dlgs-play.js <out> fold,ipadAir N` — starts the unit's chapter in a life of its origin (newThread67, the road's own cast()), fires its first hồi inside a tap (as her «Mệnh truyện» card does), checks the scene before the card, two painted figures, title = speaker, spotlight, tap-finish, card after, never twice, 0 page errors.

## RD RULES (writers; on top of b-dlg-writer.md)
1. The scene OPENS the chapter: who comes, the situation (the chapter goal g), the detail that makes it a story, last line leads into the first hồi. 4–6 lines, first line `nar` painting the moment.
2. `old` units (rd:<road>#<n>): both first hồi s1 (after a won chapter) and s2 (after a middle / lost one) can follow → the scene must fit BOTH (never say she won or lost the chapter before). `open` units: the part's `after` is known (win / lose / *) → match it. `prem` / `arc`: stand alone (also played in old 3-chapter lives and by NPC women).
3. L = a person who really comes in that hồi: the hồi's speaker w when it is a person who can stand there (v, v2, hh, th, emp, eun, doc, mis, foe); a letter / news from outside (dad's letter, a môn sinh, kin at home) → L = maid (her cung nữ brings it and tells it). dad as L only when he truly comes to court (an audience, a feast, a petition day); his lines type «cha / con», no {xung}/{goi}; her lines to him «con / cha». Never `man` unless the hồi's own man is the speaker (man67 picks any man of her life).
4. {v}/{v2} only in units whose roles list them (cast). hh / th only where the hồi needs them (they may be absent: no scene then). Never name a speaker by his own placeholder; the emp / th / hh figure never says its own title.
6. NEVER {goi}/{xung} in a `nar` line (nobody speaks it → the line cannot resolve → the WHOLE scene drops in game; validator now rejects it): write «nàng» or the person's name.
5. Servant origin cnv (she is a cung nữ): L = mis / eun / a fellow maid; she addresses up through {xung}/{goi}.

## COVER (law 11; `python3 dev/test/dlgs_validate.py --cover`, ecfe9831)
| family | units | with scene | plays in game |
|---|---|---|---|
| rd old (hand-typed roads .4–.11) | 384 | 32 (tt) | yes |
| rd prem (composed premise .4) | 44 | 4 (tt) | yes |
| rd open (composed chapter openings) | 164 | 15 (tt) | yes |
| rd arc (shared / st / eg / tm) | 17 | 0 | yes |
| rd ALL | 609 | 51 | |
(before this branch: 0 / 609)

## WRITER PLAN (sonnet; brief dev/handover/briefs/b-rd-writer.md; file content/dlg/rd_<slice>.md on the handover branch)
| W | file | origin units (old + prem + open) | ~scenes |
|---|---|---|---|
| R1 | rd_dtq.md | dtq | 51 |
| R2 | rd_muoi.md | muoi | 52 |
| R3 | rd_cn.md | cn | 52 |
| R4 | rd_cnv.md | cnv (servant origin) | 52 |
| R5 | rd_nc.md | nc | 51 |
| R6 | rd_td.md | td | 50 |
| R7 | rd_ch.md | ch | 50 |
| R8 | rd_thd.md | thd | 51 |
| R9 | rd_pf.md | pf + the 17 arcs («*», st, eg, tm: `--o '*,st,eg,tm'`) | 67 |
| R10 | rd_bd.md | bd (8 old roads) | 82 |
Total 558. Lead folds each file (validator --strict, read 10 random, rebuild jdlgsd.js), then the gates.

## WRITERS
- B RD WRITER B (sonnet, session_01N1tNP2Np9FjuaTENKCVB5w): R4 rd_cnv.md 52, R5 rd_nc.md 51, R6 rd_td.md 50 = 153 scenes, validator --strict 0 errors; all three pushed. HANDOVER rd_td: last id done rd:rc-td-o14#open (slice complete, nothing left).
- Foreman B 08:22Z: RDW-A session_01N1tNP4LvMJG9uWS2NZ4ou7 (R1 dtq, R2 muoi, R3 cn) · RDW-B session_01N1tNP2Np9FjuaTENKCVB5w (R4 cnv, R5 nc, R6 td) · RDW-C session_01N1tNP5unp7XKs9SvrxrGPy (R7 ch, R8 thd) · RDW-D session_01N1tNP3ksEX5jCyKC35RTiW (R9 pf+arcs, R10 bd).
- R1 rd_dtq 51 (d673e73d) folded cbdc8fd4. R4 rd_cnv 52 (938a68d8): lead fixed 18 nar lines carrying {goi} (law 11 scan: side-line files 0, rd_* 18 → 0; validator rule added).

## LOG
- 984ed3e8 adapter + inventory (609) + validator rd. ecfe9831 style model tt 51 (validator --strict 0); dlgs-play rd sample 6 units Fold ALL PASS 236 (tt_co#4, tt_oan#7, tt_tranh#6, rc-tt-o05/o12/o13#open); shots looked at: speaker lit left, her dimmed right, title = speaker, card «Chính tuyến · … Hồi 1» after.
- Test note: the first hồi must be fired inside a tap (jdayq holds every card the game posts at dawn / under an activity; a card she opens herself — DQ.user — shows). Same as the game: storyActs67 go() runs inside her tap.
