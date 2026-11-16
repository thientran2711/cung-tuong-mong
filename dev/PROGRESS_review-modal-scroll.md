# PROGRESS review/modal-scroll (urgent live bug, owner 16/11 "Không vuốt được, sửa gấp")
Bug: "Học Cầm: làm gì?" picker (jwkr, 10 tiles) could not be swiped on touch; lower tiles unreachable (iPad 1180x820).
Root cause: KIT §8.1 one-size kpanel (j79, `#mb>*{flex:0 0 auto}`, landed 16/11 03:27Z) makes #mb the scroller, so the inner tile grid
`.kshg` (jinv, overflow-y:auto + overscroll-behavior:contain) no longer overflows. The browser still latches the finger to that nested
scroll container and `contain` stops the chain to #mb -> nothing moves. Mouse wheel / scrollbar still worked, touch did not.
Same family: kdscroll event dialogs (jk4) set #mb overflow:hidden, so a long text + many choices pushed the choice list below the frame.
Fix (scroll chain only, no sizing change):
- dev/build/j79.js after the `#mb>*{flex:0 0 auto}` line: nested scrollers inside #mb / .pc / dawn .kpb get overscroll-behavior:auto
  (only the panel's own scroller contains).
- dev/build/jk4.js `.modal .dlg.kdscroll>#mb`: overflow:hidden -> overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain.
Test: `node dev/test/modal-swipe.js <url> [sizes]` real CDP touch swipes on 12 modal kinds; all SCROLLS or fits at 1180x820, 755x1000,
1000x755, 1366x1024, 844x390 (before: wkr pickers STUCK at every size, long event STUCK).
