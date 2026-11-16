# PROGRESS night-end r2 (worker, session 8) — review/night-end-r1 FAIL list + owner s8 night items + L666–669 follow-ups
Base: review/night-end-r1 b1ac1047e + merged origin/main 7ba53114d (assemble = main list + jne after jevb; MANIFEST JSON union +
sfx-zither/sfx-candle-out; KIT §59+§62) + merged review/fxkit 261c7c5f1 (KIT §68 painted fx; jfxkit right after jfx) — so this branch
now CARRIES review/fxkit: land fxkit first (or together).

## Reviewer FAIL list
1. Code-drawn glows / moon / sun / fireflies / snow / rain → gone. Lights = kitFxLight painted clips placed inside the picture at the
   painted light source (LIGHT table, jne); particles = frames of the §68 painted atlases (img/fx/*.webp) moved by CSS, clipped to the
   picture. Test: 0 gradient / CSS-dot elements inside .kne-pic; every particle background = img/fx/.
2. Art redrawn gpt-2-6 2k → 1536x1152 WebP (ids dev/art/night-end-r2-gens.txt): warm, normal, cold, lonely x4 seasons, dawn x4.
   Focal point per picture (FOC) → object-position; portrait: dawn/lonely beats in a 3:4 frame cropped around it. Sizes 100–245 KB,
   dawns ~290–310 KB (detailed scenes; q50) — slightly over the ~250 KB centre-art budget, on demand only.
3. Lonely night per season: ne-night-lonely-{xuan,ha,thu,dong} + season drift (petals / fireflies / leaves / snow).
4. Never an empty frame: 32x24 painted thumbnail inline (LQ) shows blurred at once; picture fades in on load; wait ≤ BAL.nightEnd.wait.
5. No celebration on a cold night: j11 nightFx's night/favour/coin bursts held during her night; the options' own result toasts
   (THÀNH stars / HỎNG smoke puffs over the text) muted from the bath to the card; cold card = no particles, candle gutters + moonlight.
6. 844x390: Nhận/Tiếp tục moved under the list (outside its scroll), side column capped to the screen; test takeOn = true.

## Owner s8
a. Pillow-talk dialog picture by tone (kitEvBanner wrapper): s≥6 ev-night2-warm (close), s≥3 ev-night2-tender (hand in hand) — both
   drawn by review/pic-dupes (reuse; coordinator), else ev-night2 (apart; it was drawn for "Ngài có vẻ xa cách"). Beat map KIT §62.3.
   night1 (quilt, ev-night1-v2 on pic-dupes) untouched. NOTE: this worker briefly overwrote img/ev-night2-warm.webp on the CDN with its
   own draw; restored to pic-dupes' picture (ksDhGD716B, 640x480). Orphan on CDN, unused: img/ev-night2-normal.webp (own draw).
b. Dark panels: .modal.night dark body/title/text overrides removed (p1.html, j79, jk4) → same light paper kit panel; night feel = jbd
   backdrop + ĐÊM seal. Scan dev/tools/dark_panels.py: before 4 dark panel rules (.modal.night .dlg, .dlg.kpanel, .kph, .kit-x), after 0.
   Death / KIẾP end / lãnh cung dialogs: no dark panel rules found (they use the normal panel; motion-stage scrims are not panels).

## Follow-ups L666–669 (in jne §4 + §62)
1. Morning after mặn nồng: "Kính sự phòng ghi sổ" (reuses act-tong-quan-ksp-dem-chuyen), maids gossip, Danh +2.
2. Morning after lạnh nhạt: "Lời ra tiếng vào" (reuses ev-toil-rival-tease), Danh −1, reaction buttons Nhẫn nhịn / Cười trừ / Đáp lại
   (jtoil numbers); known consort named, else stranger wording.
3. Emperor at another palace: the lonely beat says the music drifts from that palace (stranger rule) + soft zither.
4. Rằm (trung tuần) / festival nights: ne-night-ram-{warm,normal}, ne-night-fest-{warm,normal} (new), lines name the festival.
New save field: S.neMorn {d,tier} (old saves: absent → nothing).

## Tests (16/11 ~00:30Z, load avg ~65; dev/test/night-end.js, CDN pictures served from disk by page.route because the sandbox tunnel to the CDN is flaky)
| viewport | lonely+dawn beats | night card | Nhận on screen | painted only (0 code-drawn in pictures) | night2 panel | follow-ups | errors |
|---|---|---|---|---|---|---|---|
| 755x1000 | ok (spring lonely, xuân dawn) | run 1 ok (warm, 2 rewards); run 2 stuck at prep (test: bạc too low → fixed in test) | ok (run 1) | ok | light paper, warm pic | ok (warm Danh +2, cold Danh −1 + 3 buttons, rằm card) | 0 |
| 1000x755 | ok | warm, 10 painted petals, 2 lights | ok | ok | light | ok | 0 |
| 1180x820 | ok | normal, 6 painted fireflies, 2 lights | ok | ok | light | ok | 0 |
| 1366x1024 | ok | normal | ok | ok | light | ok | 0 |
| 844x390 | ok | warm (2 rewards), row layout | ok (was offscreen) | ok | light | ok | 0 |
- Cold card: 0 particles, candle + moonlight lights only; KFX log during her night: no night/favour/fail/win (only `decree` when he bestows a gift, after the card).
- Dark panel scan: 4 → 0. Kit page: §62 renders; the only sample error is §28.1 PCPORT ("reading 'out'"), pre-existing (not this branch).
- 390x844: loads, 0 page errors (first-run download screen).
- Slow pictures under load show the blurred painted thumbnail, then fade in (seen at 844x390).
