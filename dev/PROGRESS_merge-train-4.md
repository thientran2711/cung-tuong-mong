# PROGRESS merge-train-4 (worker, coordinator = main session 9)

Base: origin/main eba64ead43adcd53e4cf0ebf1e5b50f17c093a03. Branch: review/merge-train-4.
Method (as merge-train-3): `git merge --no-ff` one branch at a time; generated files (index.html, sw.js, assets.json) taken from ours
then REBUILT with `bash dev/site/build_site.sh` after every merge (one commit per merge); assemble.py list = ours + the branch's new
module inserted after its predecessor in the branch's list.

## Merged (order)
1. routes-port-r1 332308a19 — assemble: jroute after jmen
2. chapter-detail-r1 936a2fe78 — jchap after jtabs
3. difficulty-port-r1 cbb8ab2bf — jdiff after jbal2
4. tuduc-mg-r1 53a13452d — jtd after j85
5. result-sfx-r1 18926abcc — jtoil.js conflict: kept train-3 makeup reveal/colours (HEAD) + result-sfx's win/lose sound through kg82ShowRes(html,tOk)
6. placeholder-pics3-r1 696127b32 — clean
7. small-art-wire-r1 6bce72fa6 — clean
8. collect-ms-r1 94591de58 — jcol after jearn
9. act-text-r1 fe15a6d54 — jtabs.js conflict (Tứ đức buttons): act-text wording + tuduc-mg's "chơi một trò nhỏ"
10. ua-test-r1 cad6e04c0 — clean (dev/ only)
11. cycle-r3 d9c47fad1 — jcycle after jtruth/jkpc
12. tuduc-sub-r1 adeb7de66 — j83: tuduc-sub's Đức cap (wkFinLeft/wkFinTxt) + act-text wording (Tự học, "từ 0 đến 10", wkTierTxt); j85: act-text log
Assemble tail: … jtruth, jkpc, jcycle, jtds (jcycle and jtds wrap disjoint functions: jcycle deal/endTurn/flip/monthPay/nightCh/nightScene/
rivalsMonth/stealNight/talkOpts; jtds addVir/virCost/deser/tdFinish/lessonVir/wkLv/wkrMat/rcpListOpen/rcpOldSave/render/ktArtSkills/start/ktWorksHTML).

13. scheme-games-port-r1 e25486e0 (13th PASS, added by coordinator s10; kit keeper approved its jopic grid-auto-rows max-content) — jsgame after jgoal
14. origin/main a363cc14 (goal-strip-fix), 0a311183 (reign-road; jbal2 keeps BAL.col + BAL.rg), 0c23da40 (act-dedupe, outside-r2, kit-sweep,
    cardflip-smooth, pcard-actrow, facefx) merged on top. Assemble tail now: jtruth, jkpc, jcycle, jtds, jact, jkc
    (jact/jkc wrap deal/talkOpts/endTurn/render like jcycle/jtds; main's jact dedupe and jkc home road stay outermost so they see every card).

## Merge-breakage fixes
- Owner rule carried by act-text-r1 (one word "Tự học"; "Học với ma ma"; log "Học X với ma ma giáo tập") was undone by tuduc-mg / tuduc-sub
  text: jtabs Tứ đức buttons, jtd TD_MODE + log, jtds practice ("Tự học, làm đồ", log "tự học") brought back in line.
- jtds teacher-log rewrite regex also matches the new log form.
- j79 kpActCtx (placeholder-pics3 picture keys) accepts the new labels ("Tự học", "Học với ma ma", "Học với Thái hậu",
  "Tự học, làm tác phẩm") → same ACTS.json pictures as before.
- Result sound (result-sfx rule: every kg82ShowRes passes ok): jroute blood test (!!ok), jtd Tứ đức (raw>=5), jsgame scheme game
  (odds up/down/same -> true/false/null). result-sfx-scan: 10/10 call sites.
- dev/test/tuduc-mg.js: tuduc-sub puts the work dialog ('Làm', then material) in front of a lesson; the bot now picks it.
- Update notes: new id 2026-11-16b in dev/build/jnotes.js.

## KIT
No new § sections in this train; no duplicate § numbers (§6.x / §57.x are subsections). Next free §81.

## Tests (final round on the main-0c23da40 merge, 3 in parallel; flaky ones re-run alone)
PASS: routes (5 sizes), difficulty (5), tuduc-mg 8/8 x5, tuduc-sub x5, cycle ALL OK (5 + 390x844 rotate), thaiy, collect-ms x5,
result-sfx (5), sfx-smoke (5 + 390x844, old save), small-art-wire (5; servant-pouch check flaky under load, alone PASS - known),
reign x5, schemegames x5, schemewire x5, schemesave, stage-rail (5), act-dedupe-w1 x5, act-dedupe-vp (FAIL 2 under load, alone 0,
same on main), kc-end, outside/oldsave, coop-home, kit-conform, pcard-actrow (5), coop-e2e, rotate-prompt, boot-flash 755 + 1180.
chapter-detail: 755/1180/1366 PASS; 1000x755 flaky (passes 1 of 3 alone: #kxcatch intercepts the card tap); 844x390 FAILS on its
own branch build too (pre-existing).
goal.js: fails on main 0c23da40 too ('tour did not start', ktut blocks the tap; old-save step reads S after a reload that holds
no save - identical on main). placeholder-pics.js: stale (expects placeholder cards, all now have pictures) - identical on its own
branch; dev/art/pp3/scan.js identical to the branch (8 titles, 7 changed, 0 errors).
act-text-scan: see dev/handover/reports/merge-train-4.md.

## Open (not merge breakage, for owners)
- jroute rtHlCards: 'đợi qua cơn giận của Hoàng thượng (còn NaN tháng)' when no cooldown is set (routes-port-r1 itself).
- act-text-scan (pre-main-merge build): kemgain 5, glue 1 (the NaN line), twice 7, long 164 (act-text K8 layout).

## GO round (s14/s15): re-merged origin/main 399483e3 (merge-train-5) then 18fb8252 (coop-rejoin-xdev, kit-keeper-2, cardflip-glow, popup-fullbody)
- Conflicts: assemble only (+ dev/test/tuduc-mg.js → main's copy). Tail: jtruth, jlogsync, jkpc, jcycle, jtds, jwkpics, jact, jkc, jhouse; jpdlg after jk4.
- KIT 81 (scene ends only by its .kmend button; card flip no longer auto-closes) broke branch tests, not the game: schemewire, small-art-wire,
  chapter-detail now hide .kcf / press .kmend / clear #kxcatch in reset() (same pattern as main's tests). chapter-detail 844x390 and 1000x755 now PASS.
- Final round (62 jobs + re-runs alone): all PASS incl. coop-e2e 59/59, coop-night, coop-rejoin-stats, cloud-save, coop-home, newgame-ui x5,
  flip-newlife x5, popup-fullbody, dlg-clip, scene-end, modal-swipe, act-text-scan (0 page errors; brk/dots/pct/sign 0), every branch test.
  Flaky only under 3-way parallel load (pass alone): scene-end bloom 'early', flip-newlife 844 (also fails on main under load), coop-e2e one timing check.
