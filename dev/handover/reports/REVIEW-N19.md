# REVIEW-N19 (session_01D3E3NakuSUvDgL4Z9pUGAZ, sonnet) — review/body-fit-data @6e845d8e
(Written by ROOT-C5 from the reviewer's send_message, 23/11 00:37Z — the reviewer's own push did not finish before archive.)
VERDICT: PASS (caveat: dev/test/kit-body-fit.js not run pre-land).
1) Diff vs main d1a36374 = 4 files, all dev/measure/ (body_fit.py, body-fit.json, 2 check jpgs); no game code touched.
2) Format {"fig-*.webp":{"waist":[l,t,w,h,0]}} matches BODYFIT_NOTES + jbody.js:31 (partial row overrides only waist). 8295 rows, consort/maid/mama/thaihau only; all inside picture, waist top 25.4–38.8 %. Python calc ratios are copied constants of BAL.body (script only; re-sync if BAL.body changes).
3) Re-ran script on consort-c01 (114 figs): 114/114 identical. Own overlay on 20 figs (14 random + 6 default) + 8-fig torso zoom: boxes on the sash; default-.315 figs (e.g. consort-c14-ty5, c09-tcold, maid-m37) plausible but ~2 % of body off the exact sash (eye judgement).
4) kit-body-fit.js NOT run (reads body-fit.json from the CDN; request-intercept wrapper blocked by auto-mode classifier; not worked around).
LANDING: (a) merge review/body-fit-data to main (data only, no rebuild); (b) cp dev/measure/body-fit/body-fit.json img/body-fit.json + cdn_sync; (c) node dev/test/kit-body-fit.js <live-url>, LOOK at 755x1000@2 and 1180x820@2; revert = delete img/body-fit.json from CDN. Optional: hand-check the ~995 default rows.
