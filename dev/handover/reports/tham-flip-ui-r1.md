# tham-flip-ui-r1 (reviewer) - PASS (perf not completed, see below)
Branch review/tham-flip-ui-r1 = review/tham-flip-ui a27f525b2 + origin/main 0ce59361 (includes c88edbf2; title-tag-r1 + design-scale-p2-r1 live). Conflicts were only built files (index.html, sw.js, assets.json): taken from main and rebuilt with dev/site/build_site.sh. START_CTX ~5%.

Checked
- Tray at 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058, 390x844, 1024x768 (dev/test/thamflip-shots.js + cardflip.js): one card per person (roster 11 at start, barred cards leave), tag overlap 0, cut 0, her card soft white glow from the start, 0 page errors (only a CORS console line from the CDN picture host because the test origin is localhost; not a game error). Tags are the live kitNameRank (rank colour over name, plain text, no glow). Tray art comes from CDN img/kit/cf-gplate-*.
- Phone portrait sizes (412, 390) show the kit's rotate prompt (design), same as main.
- dev/test/cardflip.js on branch and main: "real week end" step prints NO SCENE on BOTH (harness case, not a regression); demo steps fine. main's demo showed 16-17 cards for a roster of 11 (duplicates); the branch shows one per person.
- kit-conform: 91 conform / 15 missing, floats none, both sizes (same 15 as before).
- tab-pairs: 56 pairs, 0 mismatches, 0 errors at 1180x820@2 and 755x1000@2.
- game-feel (old save): oldLoad ok, offline ok, 0 errors.

Fixed by reviewer (jflip.js, KIT 67 updated)
1. Picked card: its tag ("Phi" rank) sat under the frame edge / medallion and was clipped; moved to 79 % of the card box.
2. Picked card's tassel + tag crossed and cut the name tag of the neighbour card (e.g. "Doan Moc Hai Duong"): new coverTags() hides the tags of other cards that column would cross (the result chip already names the pick).

Not done / open
- dev/test/perf.js did not finish in this sandbox (cold profile, 20 Mbit, ~30+ min for one device, killed twice at the time limit; a --turns 3 run also hit the limit). No number to compare. The change is jflip.js CSS/JS only (scene opened by the week end) plus 4 CDN pictures loaded on the scene, nothing on the title/first-load path. Coordinator: run perf on a normal machine if wanted.
- Remaining small look: the picked card's tassel still passes through the middle of its own tag (readable). Could move the tag beside the tassel later.
- Her co-op own-glow (c.p===S) not exercised by an e2e here (no coop-e2e run).
