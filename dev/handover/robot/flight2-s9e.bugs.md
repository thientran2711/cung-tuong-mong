# flight2-s9e bugs
Life flight2-s9e (Fold 755x1000, bold, seed 2026112525, LIVE 5e013076 build 3762da08+; harness 496b6b66 -> 8dc395ba -> 4d7a22c6): ending «Hong nhan bac menh - Lao phoi nguy kich, khong qua khoi» age 27, buoi 1415, year 10, 993 taps (after resumes), exitPick null. 7 bugs, 1 dead button, 0 harness-counted stuck.
1. freeze: page froze 10 min (page.evaluate hung) at buoi 133, renderer RSS 6197 MB (resumed from ckpt).
2. dead: «Tin trong cung buoi nay» «Lui» tapped 3x, dialog stays (y5 t57). Evidence: flight2-s9e-tintrong/.
3. game: every close of that dialog tapped 3x and stayed (same).
4-5. harness: area tap would hit a button (b13 «Mac ke...»; «j59sz»).
6. stuck: no-clock loop 150 taps on .mapsc, y9 t119 w2 b3 age 26 (Evening, 4 khac left, Lanh cung ...). Shots/dump: flight2-s9e-softlock/loop-1*.
7. game SOFTLOCK: «Sang ngay moi» tapped 3x in one buoi but the buoi does not turn (dialog queue Q=0), y9 t119 w2 b3, page Truong Mon vien. Evidence: flight2-s9e-softlock/noturn-2* (png, dump, save). Same family as FOREMAN D Q-softlock. Life continued after unstick (lvl3 page) and ended by death.
Shots NOT in git except the listed ones (281 MB local).
