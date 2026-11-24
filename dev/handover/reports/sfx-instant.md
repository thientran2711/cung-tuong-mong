# sfx-instant — tap sound lag (FLIGHT-SOUND, OD 24/11 ~18:05Z item 2)

PRIORITY #1 CHECK: OD grep 'tiếng bấm trễ'/'sfx lag' = only the 24/11 18:05Z row (item 2); ledger 0; claims 0; main = j11.js (AU, auUnlock, auBuf, AU_PRELOAD) + jsfx.js (sfx mixer, mgStroke, kg82Pluck wrapper) + j18/j82/j87 synth sounds on window.__bellCtx; review/* kit-music 0ff57cb0 (music keys, not touched); OFFLINE-FAST (session_01V1ZZH4kPEoVSax9ycpSYqp) told by send_message which lines I touch (no music code touched). Reused the existing mixer and buffer layer; nothing new built beside it.

Branch: `review/sfx-instant` @ `cce57071` (from origin/main 502c48c9). Tier: **SMALL** (sound only; no rules, time, save or co-op; no DOM/CSS change).

## Root cause (Múa «Lục yêu», 4 arrows: each tap = stroke `sfx-step` on pointerdown + note `sfx-mg-pluck`/`sfx-mg-miss`)
1. Only 12 files were pre-decoded at unlock (AU_PRELOAD). Tap/mini-game files (step, mg-*, item-pop, open/close/lock/page/notice) were decoded at their **first play**. Until then sfx() fell back to a cold `<audio>` clone, which starts 170–360 ms late or gets lost.
2. A cold `<audio>` voice of unknown length took a **2.2 s** slot. With 2 sounds per tap, the 3-voice cap dropped the next fast taps (`full`), so the 2nd and 3rd taps were silent.
3. bell (j18), the kg82Pluck fallback (j82) and the Sổ tuần knock (j87) each made a **second AudioContext** the first time they played. Made outside a gesture, it starts suspended, so the first sound is silent.
4. A stroke at finger-down **before the first unlock** (unlock runs at touchend) was dropped (`off`).

## Fix (whole group; j11 auUnlock / pointerdown listener / auBuf + jsfx sfx() only; music untouched)
- Every UI-layer file + every `mg*` moment + item-pop/open/close/lock/page is decoded at the first gesture (AU_PRELOAD grows from jsfx).
- One shared context: `window.__bellCtx = AU.ctx`.
- A touch pointerdown resumes an already-made context that is suspended.
- The buffer path also runs while a context that ran before is resuming.
- Tap (UI) sounds are never dropped: they stop the oldest UI voice, or play over the cap when only events play. Events keep the old cap.
- UI dedup is now 35 ms (was 90 ms); events stay at 90 ms.
- The cold `<audio>` fallback holds a 600 ms slot for UI sounds (was 2.2 s).
- A tap asked before the first unlock plays right after the unlock (≤ 350 ms).
- A failed decode is retried after 4 s.
- SFX_PLAN.md cap line overwritten in place (canon overwrite). The cap was a worker plan line, not an owner rule; her 24/11 ruling wins.

## Measure — dev/measure/sfx-tap-latency.js (real gesture policy, audio fetch +150 ms, taps: first, 2 × 120 ms, 5 × 90 ms, slow)
| profile | build | first tap | silent taps | dropped | worst |
|---|---|---|---|---|---|
| Fold 755x1000 CPU 1× | before | 177 ms (`<audio>`) | 0–1 | 2 | 933 ms |
| Fold 755x1000 CPU 4× | before | 260 ms (`<audio>`) | 1 (3rd tap) | 2 | 260 ms + silent |
| iPad 1180x820 CPU 1× | before | 178 ms | 1 | 2 | 178 ms + silent |
| iPad 1180x820 CPU 4× | before | 5 ms (2nd tap 362 ms) | 1 | 1 | 362 ms + silent |
| all four profiles | after | ≤ 1 ms (WebAudio) | 0 | 0 | ≤ 1.2 ms |

## Whole-group scan — dev/test/sfx-instant-scan.js (Fold)
| check | before | after |
|---|---|---|
| tap-family files decoded 2.5 s after first touch | 3 / 18 | 18 / 18 |
| burst 16 tap sounds (8 taps × 2, 90 ms) dropped | 11 | 0 |
| synth context shared with the unlocked one | no | yes |
| very first touch of the session on a mini-game sounds | no (`off`) | yes |

## Regression
- dev/tools/quickcheck.js: **PASS**. Old save ok. Perf new/live: render 261/288 ms, tab 489/530 ms, buổi 1412/1635 ms.
- result-sfx.js (unlock / WebAudio / iOS layer): 17/17 pass.
- sfx.js (Fold): 102/104, same 2 fails as the before build (bán đồ eval error, lật thẻ dòng báo). Both are pre-existing. One run showed a click-visibility flake on «mâm sơn son»; it did not repeat.
- 0 page errors.
- Music code (mkAudio/startTrack/setMusic/auTick) and sw.js lists: not changed.
- Shots: a sound-only change with no DOM/CSS diff. My Fold/iPad shots only caught the boot cover (pictures still loading), so I have **no** visual before/after of the mini-game. The coordinator may ask for real shots if wanted.

## Not checked on a real phone
Headless Chromium only. On iOS, a context made outside a gesture still needs the touchend unlock (kept). The first-touch path covers that case: the sound comes at touchend, about 50–100 ms after the finger goes down.
