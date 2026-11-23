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


## Round 3 (reviewer r1 FAIL list) — before / after
Base review/know-notice-r a8176fbf (index.html/sw.js rebuilt, committed here too).
| # | Site | Before | After |
|---|---|---|---|
| 1 | jmind.js learnDis (non-jdis path) | log only | 1 notice |
| 1 | jmind.js learnLike else-branch (target not a rival) | log only | 1 notice |
| 1 | jtrong.js trongLearn (Hoàng thượng/Thái hậu/any) | noteAdd skipped for emp/th → log only | 1 notice (same key as the Sổ line for rivals) |
| 1 | j92.js wdReveal / jveil.js vlReveal (item's true phẩm) | log only | 1 notice (batched) |
| 1 | j29.js servLearn (servant's nết) | log only | 1 notice |
| 1 | j53.js ktReveal (kid's nết) | returned text: in the Thầy-dạy dialog (j53:152, card shows it → none) / log-only in j53:204 | j53:204 → 1 notice; dialog path unchanged |
| 1 | j85.js S.kduc (true Đức of one caught) | card says only «Danh -5» | 1 notice «Ngươi đã thấy rõ đức của …» |
| 1 | j78.js:125 Tai mắt auto «Dò la» (log only) | log only | 1 notice |
| 2 | noteAdd(id,t,shown) — new 3rd arg: the act's own card/dialog/log tells it → no notice | double | quiet at j95b j95bHear (Q card «Nghe đồn»), jcycle 216/217 (Sổ nguyệt sự dialog list), j78 intelLearn (every caller shows the returned facts), j92:283 (wdReveal gives the one notice) |
| 2 | other noteAdd callers (j21:8/17, j22, j24, j28:56, j68e/h, j70 ×4, j92:275, j95 ×2, jagday, jagent, jagknow ×2, jcycle:222, jdis, jdress, jroute, jshelf, jthaiy ×3, jts:352, jtsb ×2, jtwoway) | notice | unchanged: each tells her something via the Sổ / log / dialog without the same fact as a card line of its act (not verified card-by-card for every one; rule = a verified card line → pass shown=1) |
| 3 | k61RankSync `v.queen?7:` | typed 7 | `rkOf(v)` (j8) |
Tests: know-notice.js +6 rows (shown=1, intelLearn, j95bHear = 0 notice; servLearn, wdReveal, trongLearn(emp) = 1) → fold 0 bad / ipadAir 0 bad. coop-e2e 141/141 (Fold host) and COOP_SWAP=1 141/141.
