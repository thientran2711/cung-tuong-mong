# PROGRESS review/night-end (KIT §62) — night-end card + new-day pictures (owner 15/11 19:35Z)

## Done
- Art (gpt-2-6, folder ba4aecfe, style ref = uploaded ev-fest-thattich / ev-fest-dongchi, no faces), on the CDN (not in git):
  img/kit/ne-night-{warm,normal,cold,lonely}.webp, img/kit/ne-dawn-{xuan,ha,thu,dong}.webp (1024x768).
  Magnific: warm 5jV8im6Kxe · normal SytQc5NUb8 · cold jUXaGFpLD0 · lonely VXUNqGoMMU · xuan jUXaGbvLD0 · ha xSdvAb1jfW · thu aF2TwtofSh · dong 6AHjo9MiJO.
  Sample sheet /home/user/wt/night-end-sample.jpg (approved by coordinator 19:07Z). Festivals reuse ev-fest-<k>-b.webp (14).
- Sounds: new sfx-zither (s7oCczEl8e), sfx-candle-out (MBw6kbVDCm), normalised with review/sfx dev/audio/norm.py (-16 LUFS).
  Copied byte-identical from review/sfx: sfx-night-watch, sfx-wind, sfx-wx-crickets, sfx-wx-birds (+ their MANIFEST entries).
  MERGE NOTE: audio/MANIFEST.json gains 6 entries at the end; review/sfx also appends entries -> trivial merge (keep both; the 4
  shared keys are identical). jne plays through kitSfx when jsfx is present, else j11 sfx().
- dev/build/jne.js (assembled after jevb, before j84): kitNightEnd (night card, BAL.nightEnd tier rule, his mood moves, held bestow
  tray -> reward rows + kitFlyItem on close, option/night toasts dropped), kitNewDay (lonely-night beat + season/festival dawn beat
  inside #dawn before the j87 Tuần lục book), kit sample §62, CSS. KIT.md §62 written.
- Test dev/test/night-end.js.

## Resume notes
- Night card trigger = j75's resultShow("Đêm thị tẩm") (wrapped outermost in jne). Lonely info captured in an endTurn wrapper (S.nightWhy /
  S.ntk / S.nightLog of the tuần that ends) because flip() of the new tuần overwrites S.nightWhy before dawn().

## Tests (15/11 ~20:30Z, machine load ~60, one browser at a time; dev/test/night-end.js + ad-hoc old-save / festival / kit-page probes)
| viewport | lonely beat | dawn beat | night card | overflow / offscreen | page errors |
|---|---|---|---|---|---|
| 755x1000 | ok | ok (xuân) | ok (warm, column) | none / 0 | 0 |
| 1000x755 | ok (custom "theo lệ") | ok | ok (cold, row layout) | none / 0 | 0 |
| 1180x820 | ok | ok | ok (warm + reward row, row layout after fix) | none / 0 | 0 |
| 1366x1024 | ok | ok | queued behind an unrelated gift box (kmPush order), then shown | none | 0 |
| 844x390 | ok (row) | ok (row) | ok (normal, row) | none / 0 | 0 |
- Festival: Dec hạ tuần -> Tết Nguyên đán: beat 2 = ev-fest-newyear-b "Sáng Tết Nguyên đán" over the stipend chest (beats sit above kit stages, z 9200).
- Reduced motion: still pictures, beats 2.2 s + 2.4 s, no particles; tap skips.
- Old save made by origin/main loads in this build (deser + endTurn + dawn), 0 errors. No new save fields.
- Kit page: §62 sample renders (21 samples), 0 errors.
- Known, pre-existing: kit stages queued in endTurn (stipend chest, flip note) start before the week panel opens; the beats now cover them
  until the book opens. The prep option's own toast ("Tắm cánh hoa… Bạc −15") still shows before the night (it is the prep cost).

## Review r1 (15/11 ~21:50Z, reviewer) — review/night-end-r1 on origin/main 41cdf7c3f
- Merged: assemble order = main's list + jne.js after jevb (jts, jmcal, j84, jimg, jwkg, jwkr, jartc kept); KIT §58/§64 + §62 kept; site rebuilt.
- r1 fix: his mood step (BAL.nightEnd.mood) now runs in bot / no-UI paths too (was UI-only, so balance runs and the game differed).
- KIT §62: owner scene rule (≥1536 px landscape, focal point + portrait crop via object-position) + painted-only effects written in.
- MANIFEST vs review/sfx: textual conflict when sfx lands; resolve as a JSON union taking review/sfx's values (it only adds "loudness"),
  plus sfx-zither + sfx-candle-out from here; the 4 shared mp3s are byte-identical.
- FAIL items for the worker: see the reviewer report (code-drawn light/particles, art 1024 px + no portrait crop, lonely picture is autumn
  in every season, empty frame when the picture is slow, 844x390 button below the fold, celebratory coin FX over a cold night).
