# learn-scene-fix — review/learn-scene-fix @ 41836865
PRIORITY #1 CHECK: OD 2 | claims 8 (Foreman C: 10 scene-thanhtai-<k> LIVE) | main 3 (jlevel PAINT single file) | review/* 0.

What
- jlevel: kitLearnPic(k) = img/scene-thanhtai-<k>.webp only if the CDN index (KIT_CDNHAVE) lists it; else (or index not loaded) kitSkillArt fallback AT ONCE; a missing file is never requested. 6 ARTS + 4 VIR = 10 keys.
- j93: kmPre (warm pictures, wait max 1.5 s), kmPush(fn,{pre,afterModals}), kmHold/kmArm. pre added to learn, reward box, tablet flip, promo reveal (jne already preloaded).
- ORDER: kitLearn queued afterModals (made-item result dialog first) -> level-up scene -> jbuoi buoiShift goes through kmPush when a scene is held -> next VIỆC: new jorder.js (last module) gates showModal while a scene runs/armed (90 s safety), closeModal arms the scene.
Tests: node dev/test/learn-scene.js (Fold + iPad Air): all 10 subjects own picture loaded, no 4xx; key missing from index -> fallback, no request; index null -> fallback; order steps 1-5 + no-scene path immediate; no page errors: ALL PASS. Not run: full quickcheck (dev/test/quickcheck.sh absent on main).
Shots (CDN img/_review/learn-scene-fix/): fold-learn-cong, ipadAir-learn-cam, fold-order-buoi (looked at: picture shows at once, buổi plays after scene).
Scan: kmPush callers 9 -> pre on 4 (learn, reward, tablet, promo); others have no picture or CSS-only.
Note: dawn() (new week) is not in the queue; not touched.
HANDOVER: none, done.
