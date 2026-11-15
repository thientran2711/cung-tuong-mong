# PROGRESS review/face-reveal-r1 (reviewer, merged onto origin/main e5a327d1)
Checked: rule correctness (old hook already met people on dialogs with options + who; new hook is a superset; j70 aft hides unknown
culprit via who:null; tsb omen has no person when unnamed), scan 14 steps x 2 seeds after fixes: 2903 dialogs, 50 strangers shown, 50
revealed, 0 left grey (scan now only counts dialogs really drawn); stranger-sweep (no leaks, held dialog no reveal, drawn dialog reveal);
face-reveal-shots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390: real figures, no grey, no overflow, no page errors;
face-reveal-look.js; ts-oldsave (old main save loads + 12 weeks, no errors); backfill once-only check; chap-label OK;
event-dp: layout numbers same as main (test is flaky on main too: 'rivals' undefined in the harness).
Fixes made: see dev/PROGRESS_review-face-reveal.md "Review r1" (evGate timing; look:1 panels).
Left: month-cal.js, kit-page.js compare vs main, 390x844 rotate shot.
