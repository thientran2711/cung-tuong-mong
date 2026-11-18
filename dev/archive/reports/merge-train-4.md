# review/merge-train-4 — worker DONE (SẴN SÀNG KIỂM)

- Final sha: **4675e90f558abe62a2b71e7cd0d89f08c3207471** (descends from origin/main 0c23da403, which contains c4e89f89b). Details: dev/PROGRESS_merge-train-4.md on the branch.
- Built like merge-train-3: `merge --no-ff` one branch at a time, generated files (index.html, sw.js, assets.json) never hand-merged, rebuilt with dev/site/build_site.sh after every merge.

## Branches in (13)
routes-port-r1 332308a19 · chapter-detail-r1 936a2fe78 · difficulty-port-r1 cbb8ab2bf · tuduc-mg-r1 53a13452d · result-sfx-r1 18926abcc ·
placeholder-pics3-r1 696127b32 · small-art-wire-r1 6bce72fa6 · collect-ms-r1 94591de58 · act-text-r1 fe15a6d54 · ua-test-r1 cad6e04c0 ·
cycle-r3 d9c47fad1 · tuduc-sub-r1 adeb7de66 · scheme-games-port-r1 e25486e0 (13th, added by coordinator s10).
Then origin/main a363cc14 → 0a311183 → 0c23da40 merged on top. Skipped: none.

## Assemble order (new modules)
jroute after jmen · jchap after jtabs · jdiff after jbal2 · jtd after j85 · jcol after jearn · jsgame after jgoal (jrail follows) ·
tail: … jtruth, jkpc, **jcycle, jtds, jact, jkc**. jcycle and jtds wrap disjoint functions (order between them free); main's jact (dedupe)
and jkc (home road) also wrap deal/talkOpts/endTurn/render, so they stay outermost and see every card.

## Conflicts resolved / merge-breakage fixed
- jtoil: train-3 makeup reveal kept + result-sfx sound via kg82ShowRes(html,tOk). jbal2: BAL.col + BAL.rg both kept.
- j83/j85/jtabs: tuduc-sub's Đức cap + act-text wording. Owner rule "Tự học" one word (act-text) restored where tuduc-mg/tuduc-sub text
  undid it (jtabs, jtd, jtds); j79 picture keys accept the new labels.
- Result sound added to the 3 new mini-game results (jroute, jtd, jsgame): result-sfx-scan 10/10.
- dev/test/tuduc-mg.js taught to pass tuduc-sub's work dialog.
- Update notes: new id 2026-11-16b (4 Vietnamese lines) in jnotes.js.

## Tests (final build; 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 + 390x844 rotate)
PASS: routes, difficulty, tuduc-mg 40/40, tuduc-sub, cycle (ALL OK + rotate), thaiy, collect-ms, result-sfx, sfx-smoke (+old save, 390x844),
small-art-wire, reign, schemegames, schemewire, schemesave, stage-rail, act-dedupe-w1, act-dedupe-vp (alone), kc-end, outside/oldsave,
coop-home, kit-conform, pcard-actrow, **coop-e2e**, rotate-prompt, boot-flash 755/1180, act-text-scan 0 page errors (brk/dots/pct/frag/
word1/sign 0; glue 1, kemgain 5, twice 7, long 134).
Not green, NOT merge breakage: goal.js fails on main too; chapter-detail 844x390 fails on its own branch too; chapter-detail 1000x755
flaky (1 of 3 alone, #kxcatch over the card tap); placeholder-pics.js stale (same on its branch). Flaky under parallel load only:
small-art-wire servant pouch, act-dedupe-vp.

## KIT
No new § added in this train; no duplicate § numbers. Next free §81.

## Open for owners (not fixed here)
- jroute: "đợi qua cơn giận của Hoàng thượng (còn NaN tháng)" shows when no cooldown is set (routes-port-r1 bug).
- Conditional PASS items still with the kit keeper: loi-rieng category (routes), K8 (act-text), K10 (small-art-wire), .kdiff .ksub (difficulty).

## UPDATE (GO round, s14/s15) — READY 9266809641ffbf7a33119e71646933c6e0be0821
- Re-merged origin/main 399483e3 (merge-train-5) and 18fb8252 (final, frozen); branch contains main. Assemble tail: jtruth, jlogsync, jkpc, jcycle, jtds, jwkpics, jact, jkc, jhouse.
- Only test fixes after the merge (KIT 81 scenes need their end button): schemewire, small-art-wire, chapter-detail (now also green at 844x390 and 1000x755).
- All tests green on the final head (co-op trio, cloud-save, newgame-ui, flip-newlife, popup-fullbody, dlg-clip, scene-end, every branch test, act-text-scan 0 page errors).
