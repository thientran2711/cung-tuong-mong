PASS 81f8665522cf0f4988cf336d6bcfa184b327d002 — review/ghen-shown-r1 = review/ghen-shown 7b97d64c + review/emperor-visit-r1 b2e34df7 (was NOT on main; ships with this PASS) merged onto origin/main 50299942 + reviewer fix: main's jmood "Hân hoan" ×1.2 jealousy moved into ghenN (was shown ≠ applied, 32 cases); applied values unchanged.

# Review — review/ghen-shown (r1), Opus reviewer, Foreman D
Reviewer session_01DgYSWow8vFRane8N6zVBKh. START_CTX ~3 % of 1M (get_session reads 0; estimate). Done; nothing pending.

## Merge
- 98de8130: merge origin/review/ghen-shown 7b97d64c (contains emperor-visit-r1 b2e34df7) onto origin/main 50299942. Conflicts: assemble.py (main's list + jvisit.js last, same as emperor-visit-r1 did), index.html / sw.js / assets.json (generated → rebuilt with dev/site/build_site.sh).
- 81f86655: reviewer fix (below) + test case; site rebuilt. origin/main is an ancestor (fast-forward ready).

## Finding fixed on the branch (LUẬT SỬA CẢ NHÓM / ONE CORE)
main's jmood.js (not on the worker's base) wraps ghenAll: at mood band "Hân hoan" every ghenAll(n) adds round(n×(1+BAL.mood.ghen)) — but the texts print ghenN(n), which did not know the mood. My live check (every BAL.ghen key × đa tình on/off × mood 0/30/80) on the plain merge: 32 BAD, e.g. Múa yến tiệc shown 4 applied 5, Kinh hồng vũ 10/12, son 15/18 (đa tình: 6/8 …). Fix (jmood.js): the mood factor now wraps ghenN (n0(round(n×(1+k)))), so ghenAll (which applies ghenN) and every text read one function; the ghenAll wrapper only counts MOOD_N.ghen. Same order of rounding as before → applied numbers identical (MOOD_N.ghen 48 before and after). After: 0 BAD.
dev/test/ghen-shown.js gained case 1b (mood Hân hoan, đa tình on/off, every key); it FAILS on the plain merge (verified) and passes after the fix.

## My own scan (other spellings, per-person writes)
grep over all assembled j*.js for "ghen +", "ghen+", ghen tăng/thêm, `.ghen=cl(` group/per-person writes, and every ghenAll/ghenN re-binding:
- ghenAll is re-bound only by jmood (fixed above); ghenN only by jmood. All 34 ghenAll calls read BAL (worker scan: OK 27, call-OK 34, 0 BAD/TYPED/ORPHAN).
- Group writes not via ghenAll: jinv luxMonth (no number shown), j28 rival boasts (NPC act, no number shown), jtoil toilCrowd (shows the max per-trait gain "ghen +n"; not đa tình family), jpet top-3 +3 shown +3, jts lễ tấn phong ±3/6/8 shown = applied, jgift garden +3 shown +3.
- Per-person: steal +25 (shown via stealKem, applied j8 stealWin 25), j2 Hoàng hậu +15 / +10, j7 +10, j24 +3, jaudit +10, jvisit lostGhen — all shown == applied. No đa tình factor on them by design.
- FOLLOW-UP (not blocking, worker already noted): steal "+25" typed in j2/j17/j75/j79/j87/jaudit and j8 → one BAL constant would close ONE CORE there; garden +3 (jgift) and jpet +3 likewise typed twice.

## Tests (on 81f86655)
| test | result |
|---|---|
| dev/test/ghen-shown.js (+ new mood case) | ALL OK, 0 page errors |
| scratch: every BAL.ghen key × đa tình × mood 0/30/80 | 0 BAD (32 BAD before fix) |
| dev/test/emperor-visit.js 3 3 | PASS, 0 page errors |
| dev/test/cycle.js index.html | ALL OK (6 viewports + rotate prompt) |
| dev/test/mood-bar.js (755x1000) | PASS (incl. oldsave case) |
| dev/test/night-day.js file:///…/index.html | ok:false (exit 1) on THIS branch AND on origin/main 50299942 in the same run → pre-existing on main, not from this branch (worker's claim confirmed). Coordinator: separate item. |

## UI / wording / saves
- Kit: no visual change (only numbers inside existing kit cards); no private CSS. VANPHONG: no new words, no %.
- "Thánh thượng ban thưởng" card with Emperor đa tình at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: card text reads "phi tần ghen +5" (= applied), no horizontal overflow, 0 page errors (DOM check; my scripted captures landed on the title/Luân hồi overlay, so the picture check relies on the worker's shots at the same sizes — text-only change).
- Old saves: no save-format change (BAL constants + one function); mood-bar oldsave case PASS; emperor-visit PASS.
