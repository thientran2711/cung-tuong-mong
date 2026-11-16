# PROGRESS result-sfx (D1) - PAUSED, research only, no code changed yet

## Findings (LUẬT ƯU TIÊN SỐ 1 done)
- review/sfx is already in main (jsfx.js, audio/MANIFEST.json, sfx-win / sfx-fail / sfx-learn-good / sfx-learn-bad / sfx-rank-new exist). Audio stays in git (not CDN), so new files need no cdn_sync.
- Mixer: dev/build/jsfx.js (`sfx` override, `kitSfx`, SFXN table). Base audio: dev/build/j11.js (AU, mkAudio, auOk, auTick). Audio is HTMLAudio only.
- No WebAudio / real iOS unlock exists: only `pointerdown` sets AU.unlocked (j11.js:19) and settings toggles (j11:123, j74:61). iOS needs touchend/click/pointerup/keydown, and element.volume is ignored on iOS.
- OPT.snd default is false (j11.js:3) -> "sound on by default" not done.
- Existing result sounds: kitResultFx wrap (jsfx.js) plays seal + win/fail/expose/schemeOk, but only when kmOn (j93 resultShow wrap); exDone plays examPass/examFail for her only; kitPodiumShow plays podium/rankNew (top 3).

## Result surfaces (to cover) and current status
- Acts/events/choices: resultShow (j19:45 generic wrapper; also j25:56, j55:205, j72:198, j75:60, jwhy:65) -> sound only if kmOn: wrap resultShow itself, independent of kmOn, dedupe with kitResultFx.
- Minigames: all end through kg82ShowRes (j82:389 contest, :393 and :405 playArt/lesson, j92:438 grooming, jexam:185 round + :191 final, jtoil:321, jts:94) -> NO win/fail sound now. Plan: add 2nd arg `ok` (true/false/null) at each call site, wrapper plays mgwin/mglose via the central dedupe (contest ok=place<=3, others raw>=6 per kg82Word, exam final left to exDone, grooming zone==="ok", toil score>=50).
- Other openMG callers (j2:173, j23:20, j34:38, j5:31) lessons: check they end via kg82ShowRes.
- Contest podium: keep podium/rankNew.

## Plan / next steps
1. New code in jsfx.js (or new jrsfx.js after jsfx.js in assemble.py list): kitResultSfx(ok,key) with ~1.5 s dedupe; wrap resultShow + kg82ShowRes.
2. iOS: WebAudio unlock on touchend/click/pointerup/keydown (ctx.resume + silent buffer, re-arm on visibilitychange/pageshow), navigator.audioSession.type="playback", sfx via decoded AudioBuffers (late-play if decoding), music through createMediaElementSource+gain with `volume` accessor so slider/mute/duck work on iOS; keep HTMLAudio fallback.
3. Default snd=true (+ one-time migration flag for saves with stored snd:false).
4. Scan script dev/test/result-sfx-scan.js: static list of call sites + dynamic KSFX.log check -> before/after table. Run dev/audio/meas.sh on sfx-win/fail for loudness.
5. Build: bash dev/site/build_site.sh, tests dev/test/sfx.js + sfx-smoke.js at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844), one Chromium at a time.
