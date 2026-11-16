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

## Measurements (dev/test/boot-flash.js, host mode ?khost=1, CPU 4x, 6 Mbps/150 ms; test box load avg 50–75, so absolute times are inflated)
| run | before (main f012058f3) | after |
|---|---|---|
| 755x1000 cold | blank paper → **bare skeleton 7.0 s → 15.3 s** → title → loading | cover from 0.2 s → loading screen; 0 skeleton states |
| 755x1000 warm | blank → **bare skeleton 1.7 s → 4.2 s** → title | cover from 0.3 s → title/loading; 0 skeleton states |
| 390x844 (rotated) cold / warm | (same skeleton, sideways) | cover from 0.3 / 0.4 s; 0 skeleton states |
Time to a usable title, A/B in one browser (direct mode, CPU 4x, 3 runs each): old 5.2/1.6/2.8 s, new 3.1/2.3/1.4 s (noise; no slowdown).
Bytes: index.html +~5 KB raw (~2 KB gzip) for kboot.js + kRx; the cover's picture is the title art the title screen loads anyway.
Fixes during testing: the cover's class .kbp collided with jbook's .kbp (renamed .kbtp/.kbtx/.kbte); the host copy now waits for the frame's
backdrop picture before it drops (no bare-paper blink); the first-visit cache check is skipped once the device has booted (ctm-booted).
Service worker: index.html is network-first with no-cache; an old shell answers only after 4 s on a slow line and is replaced on activate.
A pre-fix shell still cached on a device can flash once more; after this build lands, every cached shell carries the cover + watchdog.

## Review r1 (review/boot-flash-r1, merged onto origin/main 2d038139e)
- Merge: rot.js conflict (main's always-on rotate prompt tip/untip + this branch's geo/place) resolved by hand; site rebuilt.
- FIX watchdog: at 15 s the branch turned a SLOW but working cold open into the failure card, and kbootDone() then refused to lift it
  (card stuck over a working game; seen in boot-flash 755x1000 cold: frame cover 12 s → ready 37 s). Now 15 s = note "Đường xa, cung đang
  dựng dần…" (bar keeps moving), 30 s = card with data-why=slow, and any card except data-why=broken lifts the moment the game is ready.
- FIX "Xóa bộ nhớ đệm rồi tải lại": reloads the TOP page (host may be the stale copy), keeps the query (?room=), puts kfresh before the #hash
  (a hash-only change never reloaded); keeps legacy ctm-<timestamp> picture caches too. "Tải lại" reloads the top page. Saves (localStorage) untouched.
- Tests: webkit-syntax 0 parse hits; krx-diff 48 patterns x 18735 texts, 6.29 M checks, 0 diffs, VP.fix native = old-Safari; jitev/jsfx split
  vs the old literals 0 diffs on 19270 texts; webkit-boot PASS (native / old-Safari / broken card); boot-slow 150 KB/s direct: cover → note 16 s
  → card 31 s → gone+ready 40 s, PASS; boot-flash 755x1000 + 390x844 cold/warm 0 skeleton states; shots ok/broken/room at 6 viewports, 0 errors,
  no overflow, buttons not clipped; ?room= link reaches the room dialog.
