# review-result-reason — reviewer report
PRIORITY #1 CHECK: OD 18/11 09:03Z owner clock | main j63.js kitResultSeal/resultShow, jwhyn.js kitWhyRowHTML | review/result-reason 0db60e0e | claims MAIN s42.

VERDICT: PASS e1f60927 (branch review/result-reason-r6 = 0db60e0e merged with live main f986ff6a; only index.html/sw.js conflicted, rebuilt with build_site.sh; FF from main OK).

## Checks
1. Every line of every card kind shows `value · reason`: node dev/test/result-reason.js on the merged build, Fold 755x1000, iPad 1180x820, 412x1058: PASS (between-buổi, act, no-log, person; withWhy = items, KÈM too, left-aligned, 0 bad (no % / colon), 0 page errors).
2. Kit first: one part (kaWhy*/.kwy in j63.js) feeds kaResultRows -> resultShow + night end; KIT.md §7 + jkitpage entry present. OK.
3. Worker scan: 98/98 lines with reason (partial scenarios dau + toi, worker note). Not re-run (time); test above covers the 4 kinds.
4. Layout: worker shots (Fold, iPad) looked at: label column left, value + dim reason next to it; no overflow. Long Thái hậu line wraps to 2 lines (still readable).
5. Duplicate: the top sentence line ("Ngủ một đêm: Sức +10 · ân sủng nhạt dần: Sủng -1.") repeats some of the same reasons; the old "Vì sao" row (jwhyn) only appears after tapping the Kèm line, so no permanent duplicate. Non-blocking, owner may want the top sentence dropped.
6. Old-save/perf: worker quickcheck PASS (147 s, old save ok, perf 180/203 ms); no quickcheck.sh on this branch, so not re-run by me.

## Non-blocking notes
- Fallback reasons are sometimes just the act name ("Danh +2 · việc lạ", "Tâm cơ +1 · thỉnh an") or fixed per-stat text (KA_WHYD), not a Sổ ghi clause.
- My own shot attempt at 3 sizes hit the identity-pick screen; relied on the worker's CDN shots (viewed at full size). CDN folder img/_review/result-reason wiped.
