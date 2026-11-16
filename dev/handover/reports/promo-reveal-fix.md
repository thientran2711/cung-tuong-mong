# promo-reveal-fix (main s16 task, session_01UV1SzixY6z6k4yg5Fc3gvp, opus)
Branch review/promo-reveal-fix from main b85cdb1e → **3c0997010**. SẴN SÀNG KIỂM. Test-only change (no game code, no UI).

## Finding: NOT a live game regression
- Symptom: promo-rules.js FAIL «chest Phẩm phục lists the set», «person reveal … Nhận», «reveal shown» on main since ~a5d9d2b.
- Root cause: KIT §81 kitSceneEnd (owner OD:L1261, j93 kmStage): a kit scene never closes by itself or by a tap; it waits for ONE end button `.kmov.km-endon > .kmend`. At life start the Kính sự phòng card flip (kcf) is the first scene; the test only clicked overlays, so the queue stayed there and the edict → chest → reveal never came.
- Proof: probe on main a5d9d2b pressing `.kmend`: kcf → edict «Đã hiểu» → km-reward «Phẩm phục» → servant reveal (kprevov) all shown; window.__prRev=1. Bots (window.__bot) skip the motion queue (kmOn), so balance runs do not stall.
- Note: a plain git bisect was misleading (probe passed once by chance on 6604e0b; the "first bad" commit changed only a report). Re-runs: 5e5c412 0000 (no §81), b978946/6604e0b fail every time.

## Fix (whole family)
- New shared helper dev/test/lib/kmscene.js (`KM.use(ctx)` + page `__kmNext()` presses every shown §81 end button); documented in dev/test/README.md.
- promo-rules.js uses it in both click-through loops.
- Family scan: 47 tests touch kit scenes without `.kmend`. Ran on main b85cdb1 vs pre-§81 main 5e5c412: only promo-rules.js depended on it. act-dedupe-vp, item-info, stage-rail differences were load timeouts (pass alone). item-lose, item-events, goal, succession fail IDENTICALLY on 5e5c412 → pre-existing, unrelated to §81 (owners: their topics). promo-exam, reward-box, reveal-shots, flip-newlife, item-gain, stipend, stage-rail PASS.

## Tests
- promo-rules.js 755x1000@2 + 1180x820@2: 0 FAIL (chest «Phẩm phục» + Dấu ấn, person reveal full-body + «Nội vụ phủ phụ cấp thêm», no overflow/clipping, button in view).
- Live smoke of promo-skip b85cdb1e (s16 item 1): reign.js PASS 755x1000 + 1180x820 on the live URL.
