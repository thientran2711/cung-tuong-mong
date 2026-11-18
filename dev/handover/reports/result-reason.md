# result-reason — report (worker, session_01UV1SzirzUecQTMVipMrcQ1)
PRIORITY #1 CHECK: OD 2 (18/11 09:03Z result line) | main j63.js kitResultSeal/resultShow, jaudit.js:10, jwhyn.js "Vì sao" row | review/* none | claims this row.

READY FOR REVIEW: review/result-reason @ 0db60e0e (from origin/main 62a6846f build).

## What
- Root causes: (1) deltas were snapshot diffs with no cause; (2) `.kitem` (item-cell class, text-align:center) was reused for result lines, so values floated centred away from labels.
- Kit part `kitWhy` in j63.js (kaWhyCl / kaWhyStat / kaWhyWho / kaWhyKem / kaWhyHtml, `.kwy`): every line = `value · short reason`. Reason is read from the SAME Sổ ghi lines of the span (clause "lead: … Sức +10" -> lead; person found by name; strangers stay unnamed), else the act's title, else a short fixed cause per stat (KA_WHYD). ≤44 chars, no colon, no %.
- kaResultRows feeds resultShow AND jne night end, so between-buổi, act, event, night, co-op cards all change from this one part.
- CSS: result lines left-aligned, value next to label. KIT.md §7 updated + kit sample page entry (§7).
- Left as is: the older separate "Vì sao" row (jwhyn.js, relation formula detail) — different content; main may drop it if it feels duplicate.

## Scan (act-audit, Fold, scenarios dau + toi partial, stopped for time)
84 result cards, 98 lines: before 0 / 98 had a reason, after 98 / 98. Reasons seen: múa trong yến tiệc, thỉnh an Thái hậu, dưỡng nhan, cài tai mắt, ân sủng nhạt dần, ngủ một đêm … Weakest: act-title fallback ("Bạc −8 · dưỡng nhan") is the act name, not a finer cause.
## Tests
- node dev/test/result-reason.js (Fold 755x1000 + iPad 1180x820): PASS (4 card kinds, every line has a reason, left-aligned, 0 page errors).
- quickcheck --runs 3: PASS 147 s, old save ok, core gates PASS, perf render 180/203 ms.
## Shots (CDN img/_review/result-reason/)
https://ctm-img.victoria-tntt.workers.dev/img/_review/result-reason/before-fold.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/result-reason/after-fold-between.png
https://ctm-img.victoria-tntt.workers.dev/img/_review/result-reason/after-ipad-between.png
(act / night / co-op cards are covered by the scan + test, not separate shots; wipe folder after verdict: python3 dev/site/cdn_sync.py --wipe-review result-reason)
Context: finished well under ceiling, no rollover needed.
