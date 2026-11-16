# PROGRESS pcard-dislikes (review/pcard-dislikes, C35b)
Done: `dev/build/jdis.js` (new module after jpcf in assemble.py), BAL.dis in jbal2.js, hooks: j2.js (talk options text/condition), jpcf.js (Sở trọng rows), jhc.js (old Emperor card rows).
- Data: v.dis / S.emp.dis (pool keys), seeded per life (ctxSeed), 1-2 each; pool = ARTS (handmade works), item kinds (IT.kd), Emperor also his LIKES pools; own likes excluded (disLikeKeys). Old saves: normAll wrapper (disInit).
- Learning: spy fact "dis" (j78facts), talk (chatMark, BAL.dis.talk), Emperor discover() reveals like OR dislike, wrong gift reveals. S.disK = known keys.
- Show: "Nàng ghét"/"Ngài ghét" row in Sở trọng (kitRows, same as likes). Unknown = "chưa rõ".
- Effect: giveTo wrapper (player gifts to consort/Emperor): refuse (BAL.dis.refuse, item stays) or penalty (aff -4 / Sủng -1); gift dialog hint only when known.
- Not done / ideas: Thái hậu has no dislikes (task said consorts + Emperor); consorts have no "likes" display (only best art/tg derived).
- Test: node dev/test/pcard-dislikes.js <url> <outdir> [sizes]  (all 6 sizes ALL PASS).
