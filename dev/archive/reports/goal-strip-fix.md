# goal-strip-fix verdict (reviewer, 16/11)
1. PASS a363cc14a6 (review/goal-strip-fix-r1, origin/main eba64ead4 is an ancestor); r0 FAIL items (tour target 40px, strip wording, strip sample/code, stale tests) all fixed.
2. stage-rail.js PASS at 1180x820, 755x1000, 844x390, 1000x755: rail inside stage, no face/title overlap, no strip, detail closes by x / Esc / tap outside, calendar opens.
3. goal.js PASS at 1180x820 (rail icon, detail, "Di lam" ring, old save: no card/tour/tips); goalEl() now >=24 px; no page errors.
4. Icon URLs (mo-calendar, mo-edict-closed, ico-chat) return 200 on the CDN; images do not render in the container. Co-op not run live (rail attaches to #stage; re-paints after render).
5. Note: browser "Page crashed" seen when many chromes share the box (memory), not a branch fault; re-run passed.
