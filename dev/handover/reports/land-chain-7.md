LC7 = session_01Rc5AsLJoRXS3EU8sX8nrzQ; START_CTX ~3 % (est., get_session reads 0); depth 3; setup ready (23/11 ~08:05Z)
# LAND CHAIN 7 (opened by MAIN CHÍNH 109 session_01Rc5AsMAkWe3fwq2w85eAKc; predecessor LC6 STOPPED)
Roll at ctx >= ~28 % (START_CTX + 25), ceiling 60 %.

## Setup (same as land-chain-5.md)
/home/user/wt/live sparse detached on origin/main ca801185 + hooks; /home/user/wt/ho handover; sland.sh (LC7 id, golive 1500, hold guard); landq-e2e.sh; hpush.sh (LC7 id); hold.txt empty.

## Log
- 23/11 ~08:05Z LIVE = ca801185. Queue: act-seals-n14-r 77619056 (N14).
- 23/11 ~08:50Z LANDED act-seals-n14 31956a09 (77619056 self-merged on ca801185 = a689bb80; merge conflict only in generated assets.json/index.html/sw.js → took LIVE + rebuilt (sland.sh now treats assets.json as generated too). Quickcheck 1st run FAIL G4 dialog-fixed #54 iPad (title plate on event picture) = load flake: 5/5 isolated reruns pass, golive re-check QUICKCHECK PASS 694 s. actwire-look Fold (lo, choang, tinhnghich, vui) + iPad (khochiu, hanghai, gian): set th-, out→loop→back ~0/~3.9/~7.0 s, errs 0, sheets looked at. coop-e2e 141/141. Code pushed a689bb80, then lander steps: actwire_stage.py + cdn_sync 63 clips (33.4 MB, CDN index v=51fb81f57814), rebuild: 63 th-act clips listed 'lazy', none core; build commit 31956a09 QUICKCHECK PASS 662 s → pushed. LIVE = 31956a09. REVERT: revert code range AND wipe img/kit/emo-anim/th-act-* from CDN.
- 23/11 ~08:55Z LANDED gapart2 340ede94 (8a957cca self-merged on 31956a09; ending-screens 272/272, fullscreen-scenes 202/202, QUICKCHECK PASS 636 s, coop-e2e 141/141).
- 23/11 ~09:10Z LANDED mg10a 13a8dfc7 (87ad5da4 self-merged on 340ede94; dev/site/CHANGE.txt conflict → branch line (sland.sh now takes --ours for CHANGE.txt); ag-mgcal ok; QUICKCHECK PASS 649 s; coop-e2e 141/141).
- 23/11 ~09:30Z LANDED gapart1 5db0422e (03002dc1 self-merged on 13a8dfc7; ending-screens 272/272; QUICKCHECK PASS 694 s; coop-e2e 141/141; no cdn_sync).
- 23/11 ~09:45Z LANDED kit-ap01 e9c0a43d (f38a40b1 self-merged on 5db0422e; QUICKCHECK PASS 656 s; coop-e2e 141/141).
Helpers: /home/user/wt/land1.sh (sland + coop-e2e, no push) + push1.sh (FF-check push).
- 23/11 ~10:00Z LANDED outing-art e6894660 (b2f84cd0 self-merged on e9c0a43d; outing-art.js ALL OK; QUICKCHECK PASS 649 s; coop-e2e 141/141). LIVE = e6894660. Queue empty.
- 23/11 ~11:50Z LANDED outing-art2 78324353 (FF on e6894660; outing-art.js ALL OK; QUICKCHECK PASS 700 s; coop-e2e 141/141). LIVE = 78324353. Queue empty.
- 23/11 ~13:00Z LANDED kit-mgbg 9f9d318c (FF on 78324353; ag-mgcal ok; QUICKCHECK PASS 700 s; coop-e2e 141/141). LIVE = 9f9d318c. Queue empty.
- 23/11 ~13:55Z LANDED coop-famops-t1 (N12) 2ba6c64e (e74b0808 self-merged on 9f9d318c, no source conflict; coop-famops-unit 46/46 (run with url http://ctm.local/index.html — default 127.0.0.1:8744 needs a server); QUICKCHECK PASS 634 s; coop-e2e 141/141). LIVE = 2ba6c64e. Queue empty.
- 23/11 ~16:55Z LANDED pages-lock f7016b8d (FF on 2ba6c64e; pages-lock-proof PASS (0 unexpected 404, all served paths on allowlist, 0 page errors); QUICKCHECK PASS 698 s; coop-e2e 141/141). Adds .github/workflows/pages.yml — first run may fail until owner sets Pages Source = GitHub Actions (expected). LIVE = f7016b8d. Queue empty.
- 23/11 ~17:37Z Coordinator changed: MAIN CHÍNH 110 session_01Rc5AsJh26cgtwNsyhTRPQx (MAIN 109 stopped). Reports now go to MAIN 110. LIVE = f7016b8d, queue empty.
- 23/11 ~19:50Z LANDED coop-driver-fails da829e9b (FF on f7016b8d, test-only; QUICKCHECK PASS 673 s; coop-e2e 141/141).
- 23/11 ~20:10Z LANDED kp23-swap 225c5c08 (7e2d4e6d self-merged on da829e9b; QUICKCHECK PASS 647 s; coop-e2e 141/141). CDN step: live img/ACTS.json patched (log replaced from dev/art/manifests/ACTS.json, acts kept) + cdn_sync (index v=b59b194524ec). Verify: CDN acts 337, log == manifest, 63 changed values vs pre-swap, 0 still -h. LIVE = 225c5c08. Revert: restore old log (29cc02d2^ manifest) in CDN ACTS.json.
- 23/11 ~20:37Z Coordinator changed: MAIN CHÍNH 111 session_01Rc5AsND3CwtWZx1yyFP5Lp (child of 110). LIVE = 225c5c08, queue empty.
- 23/11 ~21:45Z LANDED hdr-kiep 948c80a5 (5d0039de FF candidate, but its index.html was NOT built from its source (quickcheck NOT BUILT) + manifest-guard network IncompleteRead flake → added build commit 948c80a5; QUICKCHECK PASS 651 s (old save ok); hdr-kiep.js 0 fails Fold+iPad, looked at Fold life3 shot; coop-e2e 141/141). LIVE = 948c80a5.
- 23/11 ~22:00Z Coordinator now MAIN CHÍNH 112 session_01Rc5AsNGsPSDAJiSHyVCNx1. LANDED odds-ladder-words 72521d62 (f1ee0636 self-merged on 948c80a5; odds-scales-scan OK; hdr-kiep 0 fails; QUICKCHECK PASS 666 s; coop-e2e 141/141). LIVE = 72521d62. Note: review/kit-odds-row-r (BIG) must merge over this.

## ROLL (23/11 ~22:05Z, ctx ~25 % (roll trigger ~28 %), START_CTX ~3 %, depth 3/8) — LC7 STOPPED, queue empty, nothing running, hold.txt empty
LIVE = 72521d62 (odds-ladder-words). Coordinator = MAIN CHÍNH 112 session_01Rc5AsNGsPSDAJiSHyVCNx1.
Landed by LC7 (14, all coop-e2e 141/141): act-seals-n14 31956a09 (+63 CDN clips), gapart2 340ede94, mg10a 13a8dfc7, gapart1 5db0422e, kit-ap01 e9c0a43d, outing-art e6894660, outing-art2 78324353, kit-mgbg 9f9d318c, coop-famops-t1 2ba6c64e, pages-lock f7016b8d, coop-driver-fails da829e9b, kp23-swap 225c5c08 (+CDN ACTS.json log patch), hdr-kiep 948c80a5, odds-ladder-words 72521d62.
Known next: review/kit-odds-row-r (BIG, new ladder) must merge over odds-ladder-words.
Setup for LC8 = land-chain-5.md recipe PLUS these sland.sh fixes: (a) generated-file case is `index.html|sw.js|assets.json) git checkout --theirs`, `git add -A index.html sw.js assets.json`; (b) `dev/site/CHANGE.txt) git checkout --ours` (one-line what-changed file); hpush.sh fetch --depth=300 (depth 30 made the rebase cross the shallow boundary → add/add conflicts on every doc).
Helpers: land1.sh = sland.sh "$@" > sland-$T.log + coop-e2e if QUICKCHECK PASS (no push); push1.sh <sha> = fetch main, ancestor check, push sha:main.
Notes: (1) FF candidates whose index.html is not built from their source fail quickcheck "NOT BUILT" → rebuild + build commit on top (hdr-kiep). (2) Tests needing args can't go through sland's test list (hdr-kiep.js <url> <outdir>; pages-lock-proof.js <staged dir> after pages_stage.sh; coop-famops-unit.js http://ctm.local/index.html — default 127.0.0.1:8744 needs a server) → run them after. (3) Flakes seen: G4 dialog-fixed #54 iPad under load; manifest-guard IncompleteRead on CDN fetch → rerun.
