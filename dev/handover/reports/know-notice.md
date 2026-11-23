# know-notice report (KNOW-NOTICE, sonnet UI worker for MAIN 112)
PRIORITY #1 CHECK: OD 1 (23/11 ~23:08Z) | main: npcKnows j61.js:111, kitNotice jnotice.js (§42.2) | review/* none | claims KNOW-NOTICE (this session).
KIT: fitting part exists = `kitNotice` (§42.2); added ONE thin kit entry `kitKnow` (batching) — no KIT_REQUEST needed. KIT.md §42.3.

## Scan: paths that write her knowledge (newest origin/main 72521d62) — before → after
| Path (file) | What she learns | Before | After |
|---|---|---|---|
| k61Know (j61.js:105) — chokepoint of ~40 callers: greet, Hỏi danh tính, thỉnh an, festival, đêm đầu, scout, servant report, kc intel, men, jht kids, jpromo… | face / name / quen biết | log line only (and none when `quiet`) | 1 notice (batched) |
| k61MetSet (new, j61; was S.met writes j21:15,17, j61:109,239, jgreet grMet) | first sight of a face | silent | 1 notice |
| learnTrait + newsAdd trait leak (j28) | nết | Sổ line only | 1 notice (same key as Sổ line) |
| newsAdd (j28) rumours / tin đồn (jky no longer double-notices) | rumour | touch-me only | 1 notice |
| discover (j1) + jdis learn (Hoàng thượng/Thái hậu không ưa) | likes/dislikes | log only | 1 notice |
| eaTell (jbalcore) | month art he favours | log only (silent when quiet) | 1 notice |
| toilTasteLearn / toilLvTasteLearn / tsMkLearn (jmkt) | son phấn tastes | log only | 1 notice |
| rcpLearn (jrcp) | recipe/facet | returned HTML for log | 1 notice |
| noteAdd (j21; ~60 callers: spy, dò la, tai mắt, likeLearn, dislikes of NPCs…) | any Sổ line | silent | 1 notice |
| Already notices: Tai mắt tin báo (jnotice tbHook), errands, kitLearn (art/vir), flip note, evidence deltas (result card), tấn phong panel (jts) | – | yes | unchanged |
| Co-op | guest's knowledge raised on host | – | kitKnow in UICAP → her phone |

## Round 2 (MAIN 112 asks)
- RANK of another person: `k61RankSync` (j61) — rank changes of a known person (promoteP, demotion, crowned, co-op friend; after every week) = one batched notice; strangers silent; first sight already carries the rank. Tested 4 rows.
- Built ON §42.2 (kind `know`, no private chip/panel), kit page sample §42.3, KIT.md §42.3.
- `kitKnowMany(list)` for SELSCENE sắc phong list → ONE notice.

## NOT done (for MAIN)
- SẮC PHONG NEWS screen (rows face+name+new rank per girl) = the SELSCENE job, not this one; kitKnow gives the batched notice for it meanwhile.
- Secrets/evidence: shown as stat deltas on the result card (yes); no separate silent writer found beyond noteAdd.
- Panel joins several facts with « · » in one paragraph (jnotice panel renders `text`); a one-line-per-fact list would need a kitNoticeOpen tweak — suggest later.
- Not exhaustively traced: every direct `S.notes`/`trK` writer outside j21/j28 (none found by grep).

## Test
`DEV=fold|ipadAir node dev/test/know-notice.js` → 0 bad both devices (each path = exactly 1 notice; repeat/no-new = 0; batch = 1 «biết thêm 3 điều»; no %). Shots looked 3× on 755x1000 + 1180x820: chip «Ta biết thêm 3 điều» in the top bar, «Tin báo» panel with all lines. Old saves load (nothing new stored).
