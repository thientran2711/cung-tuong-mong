# PROGRESS review/boot-flash (worker, 15–16/11)
Owner: "Khi vừa bấm vào game, có chừng ít hơn 1 giây hiện khung này" (dev/handover/refs/owner-boot-flash.jpg) + iPad "Bị gì đây mới vào game" (stuck on the skeleton).

## Causes
1. Flash: index.html is one 4 MB page; while it parses, the browser paints the bare static markup of p1.html (HUD box, vertical stat labels,
   empty panels, the old 11-tab bar) before any kit CSS/JS runs. Measured (CPU 4x, 6 Mbps/150 ms, 755x1000, host mode): skeleton visible
   ~2.4 s on a warm open and ~8 s on a cold one (load avg ~70 on the test box; the owner's phone saw <1 s).
2. iPad stuck: 20 regex LOOKBEHIND literals across 13 modules (j8 j63 j68i j78 j79 j84 j87 jk2b jcoopworld jhc jitev jsfx jph). Safari < 16.4
   cannot parse them → SyntaxError → the ONE game script never runs → static skeleton stays with its unpatched OLD tab names (exactly the
   owner's photo: Hành động … Tuyến truyện, Nhật ký are the p1.html labels that j84 patchTabs renames at run time).

## Done
- dev/site/kboot.js: boot cover from the first paint (KIT §14.1), host + frame, fade at ready, watchdog failure card, boot error log.
- rot.js: shared geometry (geo/place) for frame and cover; build_site.sh inlines kboot.js (IMG_BASE substituted).
- assemble.py: window.__ctmBuilt at the end of the game script; last script calls kbootDone().
- j0.js kRx (+ KIT §14.2): every lookbehind literal → kRx("…"); j84 R() and jaudit KREL_RE through kRx; jsfx "tát" and jitev "nhận" split
  into their own leading-lookbehind entries (exact emulation).
- p1.html static tab labels = final j84 TABS names; j57 comment.
- Tests: dev/test/boot-flash.js, dev/test/webkit-syntax.js (0 parse-level hits), dev/test/webkit-boot.js (PASS: native, old-Safari
  emulation 0 errors + same VP.fix text, broken page → failure card). Emulation vs native differential: 34 patterns × ~3000 texts, 0 diffs
  (the 2 non-leading cases were rewritten to leading form).
