# PROGRESS — review/audio-ipad (owner OD 25/11 ~23:30Z, on the plane: "Trên iPad là không thấy nghe tiếng nhạc nha. Không nghe tiếng gì luôn.")

PRIORITY #1 CHECK: OD 'tiếng nhạc' 1 / 'âm thanh' 5 (OD L2410 offline panel, L2435 music stop, L2528 this bug); main 'AudioContext' 7 hits (j11 AU, j18 bell, j82 pluck, j87 knock, jsfx);
review/* 0. Reused: j11 AU / auRoute / auWatch, jsfx sfx(), sw.tpl.js asset(), jload keyOf / «Tải hết» (oaBase), dev/test/lib/device.js.

## Root cause (plain words)
1. Since kit-music-r1 landed (LIVE 351122ba, 25/11 ~21:00Z) nearly every music track (day-xuan/ha/thu/dong/sang/chieu, night-2, joy, sad, festivals,
   endings — the 37 KMUS_NEW files) is played from the picture CDN (another web address) and routed through the AudioContext (auRoute →
   createMediaElementSource, the iPad/iPhone volume path). An `<audio>` from another address without `crossOrigin` is a "tainted" source:
   the AudioContext plays it as pure silence. iPad/iPhone Safari does this always; Chrome (Fold) does it whenever the service worker does not answer.
   Proven on LIVE 5e013076 (dev/test/audio-ipad.js <live url>): bgm-joy / bgm-day-xuan signal = 0.0000 on iPad and Fold, while the old local bgm-day = 0.12.
2. Those 37 tracks were NOT in assets.json (assets.py only listed img/ from the CDN index) → «Tải hết để chơi offline» never fetched them and sw.js
   never kept them → on the plane they could never play.
   SFX / bell / mini-game sounds: local files, decoded buffers — they DID sound in every run (iPad + Fold, online + offline). If she hears no sfx at
   all, it is device side (see below).

## Fix (whole family: every `<audio>` + every sound file)
- j11 `auSrc(a,url)`: ONE helper; an element whose file is on another origin gets `crossOrigin="anonymous"` BEFORE src (the CDN sends
  `Access-Control-Allow-Origin: *`). mkAudio (music, heartbeat, sfx fallback clones) uses it; j36 voices too. Test scans for any `new Audio(url)` left.
- assets.py: CDN-only `audio/*` files from img/_index.json listed with a 5th field `"c"` (37 files, 39 MB, group lazy → NOT blocking entry;
  core stays 879 files / 53.6 MB, ALWAYS regex tightened to `audio/bgm-day\.` so the 6 CDN day tracks do not join core).
- sw.tpl.js: `CDNF` set from the manifest's `"c"` mark; `baseOf(p)` keys those on IMG (prune waits for the manifest).
- jload.js: `keyOf` keys `"c"` files on the CDN (same key as sw.js); «Tải hết» downloads the music FIRST (rank -1).

## Tests — dev/test/audio-ipad.js (needs the built root)
iPad (ipadAir, Mac UA + touch) + Fold, real CDN, SW blocked (Safari-like) and SW on, then OFFLINE (context offline + reload):
one tap unlocks; CDN music + local music non-zero at the element's own analyser; sfx tap/win/coin + bell non-zero; sw.js keeps the tracks under the
content key; offline: CDN music, base music, sfx still sound. Audit: every KMUS_NEW track in assets.json with "c", every sfx-/bgm- name written in
code is a shipped file, every git sound listed, no bare `new Audio(url)`.
LIVE (before): 4 FAIL (CDN music = 0). This branch: see the report (ALL PASS line).
Note: SW blocked + first visit, a CORS music request shares the connection pool with jload's CORS picture download → first CDN track can start a few
seconds late in that worst case (it sounds; before it was silent forever). With the SW (normal case) it starts in < 1 s.

## Device-side checks for her (if still silent after this build)
- Thiết lập › «Mở tiếng» on (SND_DEFAULT=false: a home-screen app has its OWN storage, separate from Safari → sound starts OFF there).
- iPad volume up (side buttons), Control Center: Silent mode off / no Bluetooth headset left connected (the plane's in-flight audio pairing).
- Tap once inside the game after opening (iPad only allows sound after a tap).
- Open the game once ONLINE after this build (new build + music download in «Tải hết để chơi offline»: «Có N món mới cần tải»).

## Open (owner question, not decided here)
- SND_DEFAULT (sound on by default?) is still the OPEN owner question (PROGRESS_result-sfx.md). A home-screen iPad install starts muted.
