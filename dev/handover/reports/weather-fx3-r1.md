# review/weather-fx3-r1 — verdict PASS f92ee954 (reviewed weather-fx3 @ 77ac0d6d)
START_CTX ~8 % (estimate); no rollover needed.
Head f92ee954 contains origin/main caa73a87 (main moved during review; merged, only generated index.html/sw.js/assets.json conflicted, rebuilt with build_site.sh).
Checks
- Owner rules: snow = soft round mixed-size flakes with depth (far tiny/slow, near big/soft/faster), no crystal icon; fireflies = warm core + soft halo, slow wander + deep blink; summer night no sun rays (kfSeCfg "sunn" off); weather follows buổi/event.
- FESTFX table intact and unchanged vs main (fireworks row = newyear/giaothua at tối only). dev/test/fest-fx.js ALL PASS (280-cell matrix, old save, 0 page errors).
- Kit-only: sprites via kfSp/KFK (existing "orb" via ONE swap line KF_SPR), no private parts; kit sample buttons added to §68.
- Off switch: kfStill()/kfOn() gate kfBolt and ambient (reduced-motion/Gọn = none); previous worker confirmed 0 parts.
- Perf: quickcheck (Fold open, old save from live build, iPad perf) PASS on 02d5c249 and f92ee954. One earlier FAIL was CPU contention (tests run in parallel); clean re-runs median buổi 914/926 ms (new/live).
- Shots (scratch, not in git, looked at): snow + fireflies at 755x1000@2 and 1180x820@2.
Fix by reviewer (02d5c249): near-firefly halo scale 1.4+2.4z -> 1.1+1.4z; on Fold it was a big green wash over a figure, now tiny points.
Notes (non-blocking): lightning/wind/summer-rays from weather-fx2 ride in this branch (not on main yet); PX.flash/.stage::after removed in favour of kfBolt, no leftover refs in dev/build/j*.js. Real Foreman C sprites later = change only KF_SPR + KFK_SP.
