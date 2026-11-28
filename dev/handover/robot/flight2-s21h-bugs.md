# flight2-s21h bugs (build b=d40143e5bce3 = main 8a30664e, ipad, bot=speed, seed 2026112576)
PRIORITY #1 CHECK: brief F-SEAT-s21h; s21g handover; harness robot-rt.js at main 8a30664e.

Life ended at buoi 1 (age 19): "Ban hoa - Bi ban hoa, xuat cung" right after the Dien tuyen audition minigame (#kg82, speed bot "Bo qua"/fast play: moves 1/10, raw 5.60, 21 s). Real game ending (failed the entry audition), not a harness stamp error. No bugs, 0 stuck, 0 dead buttons, 45 taps.
Watch list: NO-TURN not exercised (life never reached a queued-dialog day) | Cho tin softlock not seen | illness dialog / cure road not reached | promotion roads 0/0 | two-tap plaques not reached.
Console noise: 429 /hello; 404 /img/kit/ico-download.webp; 404 /%23n; 404 /https://ctm-img.victoria-tntt.workers.dev/img/{phi-tan-cung,kinh-su-phong,ngu-hoa-vien}-xuan-sang.webp (absolute CDN URL prefixed with "/" - looks like a path-join bug on the 3 spring scene images, only seen on the local serve).
Harness note: log line "BUILD PIN ... served at http://127.0.0.1:8706/" while the run URL was :8766 (cosmetic?).
VERDICT: INVALID for the watch list (life too short to test anything) - needs a re-seed.
