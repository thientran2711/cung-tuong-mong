# PROGRESS result-sfx (D1) - code done, see "Status" at the bottom

## What changed
- `dev/build/jsfx.js`
  - `kitResultSfx(ok,o)`: THE one result sound. Drops a second call within 1.5 s (`KSFX.rsDrop`, `KSFX.rsLog`). ok=true/false only; null/undefined = silent.
  - `resultShow` is wrapped on itself (outermost, loaded last), NOT on `kitResultFx`, so the card sound no longer depends on `kmOn()`. A card counts as shown when `#rtoast` is `.on` and `window.__rtT` changed. Plays seal, then win / fail / expose / schemeOk, plus the card's own word (kneel, cane, ...). The old `kitResultFx` sound wrapper was removed (it was the second source).
  - `kg82ShowRes(html, ok)` wrapped: ok=true -> `mgwin`, ok=false -> `mglose`. If the contest podium sounded inside the same call (`KSFX.podAt`), the podium is the result sound and nothing is added. After a panel sound, the legacy j11 `openMG` `feedback("good"/"bad")` (same two files, no `m`) is dropped once (`KSFX.mgShown`).
  - `sfx()`: WebAudio first (decoded AudioBuffer -> GainNode; `log.w=1`), HTMLAudio clone while the buffer is still decoding or WebAudio is missing.
- `dev/build/j11.js`
  - `SND_DEFAULT` (line 3): **the one-line switch for the OPEN owner question "sound on by default?"**. Left `false` (unchanged behaviour). Set `true` to ship sound-on (no save migration yet: saves that stored `snd:false` keep it; add a one-time flag if the owner wants those flipped too).
  - `auUnlock()` on `touchend / click / pointerup / keydown` (+ `pointerdown` only for a mouse or without WebAudio): one AudioContext, `resume()`, silent buffer, `navigator.audioSession.type="playback"` where it exists, preloads 12 core buffers. Re-armed on `pageshow` / `visibilitychange` (`AU.silent=0`, resume).
  - Music and the heartbeat loop are routed `HTMLAudioElement -> MediaElementSource -> GainNode` (`auRoute`); the element's `volume` property is replaced by an accessor writing the gain, so slider / mute / ducking (all write `a.volume`) work on iPhone. Plain HTMLAudio when no AudioContext.
  - NOT routed: voices (j36 `VO`, `new Audio`): still element volume (iPhone plays them at full volume; follow-up if the owner reports it).
- Call sites passing `ok` to `kg82ShowRes`: j82 (contest `place<=3`; lesson/work `raw>=5`), j92 grooming (`zone==="ok"`), jexam round (`raw>=5`) and final (`null`, exDone owns it), jtoil (good / bad; neutral keeps the `mirror` sound), jts tsGame (`raw>=5`, skip = luck result).
- Tests/scripts: `dev/test/result-sfx-scan.js` (static before/after table, exit 1 if a site lacks ok), `dev/test/result-sfx.js` (browser: default, unlock, gain routing, buffer playback, card once, kmOn independence, dedupe, panel win/lose/silent, legacy feedback drop, podium, sound off). `dev/test/sfx.js` `clean()` also resets `KSFX.rs`.

## Loudness (dev/audio/meas.sh)
win -18.9 LUFS / -3.9 dBTP, fail -19.7 / -3.4, learn-good -21.0 / -1.7, scheme -20.6 / -3.2, rank-new -20.9 / -4.2; learn-bad, seal-stamp, expose are < 0.4 s (integrated LUFS unreadable) with true peaks -1.9 / -1.5 / -2.0. All within the SFX_PLAN norm (peak <= -1.5 dBFS). No new audio files.

## Kit
No kit part touched or needed (audio logic only). KIT REQUEST: none.

## Status (16/11): READY FOR REVIEW
- dev/test/result-sfx.js: PASS at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844 (0 page errors, 0 HTTP>=400). Machine load was ~38, so the test polls for the sound instead of fixed waits.
- dev/test/result-sfx-scan.js: 7/7 kg82ShowRes call sites pass ok (before: 0/7); every resultShow wrapper goes through the one jsfx wrapper.
- dev/test/sfx.js at 755x1000@2: 96/104 steps; the 8 misses are reward-box / lot-tube steps that fail by the 3-voice cap ("full"/"twice" drops) when the box runs after other long sounds under load; re-run alone: lot and chest steps pass, only "mâm sơn son" misses decree/coin (night reward, not result-related). Not compared against a pre-change baseline run - a reviewer may want that.
- Not done / open: sound-on default (SND_DEFAULT, owner question); voices (VO) not gain-routed on iOS; real iPhone not available (WebAudio verified in Chromium only).

## Reviewer r1 (16/11)
- Fix: jaudit replays held/late result cards through window.__aaR0 (below the jsfx resultShow wrapper) -> they were silent after the change (main had the sound via the j93 wrapper). jsfx now wraps __aaR0 too (same function, no double: jaudit closure keeps the unwrapped one).
- Voices (j36 VO) not gain-routed: follow-up.
