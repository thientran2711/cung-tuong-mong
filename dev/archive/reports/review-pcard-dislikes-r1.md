PASS 3b2e15ef50bcf851453b453d540e17ad1f08f355
Branch: origin/review/pcard-dislikes-r1 (= review/pcard-dislikes @6eaca05 merged onto origin/main c4e89f8; ancestor check OK). Site rebuilt (assemble.py + build_site.sh).

Merge notes: conflicts in assemble.py / jbal2.js / index.html / sw.js / assets.json. assemble list = main's list + `jdis.js` kept right after `jpcf.js` (before jfighd); jbal2.js keeps both BAL.dis and BAL.rg; generated files rebuilt.

Fix on r1 (test only, no game code): dev/test/pcard-dislikes.js was flaky. A proud (Kiêu ngạo) consort refuses ALL handmade work (game rule, wkEval) so the wrong-gift check saw "penalised 0"; also items without `tg` (ngocboikc, vongbackc) crashed giftVal in the test. Test now picks a consort who accepts the work / an item-kind dislike and tagged items. Not a code bug.

Tests (3 full runs of node dev/test/pcard-dislikes.js, 6 viewports each): ALL PASS every run — 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: 1-2 dislikes each, no overlap with likes, deterministic per life, old save migrates, spy/talk/Hỏi sở thích reveal, unknown stays "chưa rõ", wrong gift refused (~35%, stays in chest) or small loss, liked item never penalised, no page errors, no horizontal overflow.
Also: dev/test/gift-pick.js at all 6 sizes — no errors, no overflow/cut, gift flow intact.
Screens viewed myself (755x1000, 1180x820, 844x390, plus Emperor card at 755/1180): the "NGÀI GHÉT" / "NÀNG TA GHÉT" row sits in Sở trọng with the same kitRows label/value style as "NGÀI THÍCH"; no cut text; long values wrap inside the right column. 390x844 = rotate prompt/portrait, no errors.

Checks
- Kit-only: PASS. No new CSS/HTML; rows go through jpcf kitRows (same as likes); KIT.md note only. KIT CONSISTENCY: Emperor card (jhc old card + jpcf) and consort card use the identical row.
- Wording (VANPHONG): PASS. Cổ trang ("không ưa", "ghét", "chưa rõ"), no %; refuse chance via chanceW ladder. Minor: row label says "ghét" while log says "không ưa" — acceptable.
- Balance: modest. BAL.dis: refuse 35% (−2 thiện cảm / −1 Sủng and item kept), else −4 thiện cảm / −1 Sủng on top of the gift's own +4..+10, so a disliked gift is still mostly net positive for consorts; for the Emperor Sủng −1 is nearly negligible. Not an obvious pick either way; owner may want a firmer penalty (see question).

KIT REQUESTS: none.
Owner questions: (1) Is a disliked gift supposed to still net-gain thiện cảm (current), or should the loss outweigh the gain? (2) Thái hậu has no dislikes (spec said consorts + Emperor) — add later?
