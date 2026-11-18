# Report: pcard-dislikes (C35b, Slice B)
Branch `review/pcard-dislikes`, commit 6eaca05892276ad6b16b29d073531745ff7df2b6 (from origin/main eba64ead).

## Done
- New module `dev/build/jdis.js` (after jpcf); numbers in `BAL.dis` (jbal2.js): n 1-2, aff -4, Sủng -1, refuse 35, refAff -2, refSung -1, talk 20, spyPri 55.
- Data: every rival (consort) and the Emperor has 1-2 dislikes in the save (`v.dis` / `S.emp.dis`), seeded per life (ctxSeed), pool = handmade-work arts + item kinds (IT.kd) (+ Emperor's LIKES flower/music/dish). Own likes excluded (Emperor: his 3 likes + trait-favoured arts; consort: best art). A gift the recipient's own tag likes is never penalised. Old saves: `normAll` wrapper assigns them.
- Learnt: spy (new intel fact → "Đã biết"), talk (chatMark), Emperor "Hỏi sở thích"/"Nói thật lòng" (discover reveals like OR dislike), and by a wrong gift. Unknown stay hidden.
- Shown: row "Nàng ghét"/"Ngài ghét" in the person card "Sở trọng" (jpcf, same kitRows row as likes; also old Emperor card in jhc). No new kit part/CSS (KIT §73 note added).
- Effect: gift to consort/Emperor that matches a dislike → refused (item stays in chest) or goes through with thiện cảm -4 / Sủng -1; gift dialog shows the "không ưa" line only when already known.

## Tests (`node dev/test/pcard-dislikes.js <url> <out> [sizes]`)
755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: ALL PASS (1-2 each, no overlap with likes, deterministic, old save loads, spy/talk/Emperor learn, hidden until learnt, wrong gift refuse+penalty, liked item not penalised, card row shown, no page errors, no overflow). Shot of 1366x1024 viewed: row visible, nothing cut. Other-size shots not individually viewed (automated overflow check only).

## KIT REQUESTs
None.

## Owner questions
1. Thái hậu has no dislikes (task said consorts + Emperor). Add?
2. Consorts have no displayed "likes" yet (only derived best art); only "ghét" row added for them.

SẴN SÀNG KIỂM
