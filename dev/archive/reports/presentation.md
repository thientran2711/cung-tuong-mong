# D11 presentation — report (branch review/presentation)

Worker for Foreman B. Code wiring only, existing assets only. No art, no Magnific.

## What was built
`dev/build/jpres.js` (assembled right after `jsfx.js`) + test `dev/test/presentation.js`. One table, wraps only `showModal` and `musicCtx`.
Every event card is classified by its picture category (`evArtCat`, the same key as the picture and the KIT §32.3 category frame; 75 categories in EVENTS.json, 14 `fest-*` fold into le-nghi). Once per card:
- SOUND: group sting via existing `kitSfx` moments. A keyword sound (jsfx SFXTXT) wins; never two sounds per card.
- MUSIC: `musicCtx` used to say bgm-tension for every event card. Now the track follows the group (day / night / festival / sorrow / cold / tension). Existing files only.
- VOICE: fallback only when j36 `voKind` found none (gossip, child laugh, sigh, soft laugh, angry). Existing VOICES.json keys only.
- FX: painted §68 via `kitFx` / `kitFxBurst` / `kitFxEdge`. Gọn / reduced motion / bots do nothing (verified: no burst/edge/sheet/light logged with OPT.fxon=false). Same kit kind not repeated within 6 s.
- FRAME hooks on the dialog: `data-kpres-grp`, `data-kpres-cat`; story cards (title "Chính tuyến" / "Phụ tuyến") get `data-kpres-story=main|side` and main also `data-kpres-origin=<S.origin.k>`. No private CSS (kit-first); the frame look for these is a KIT REQUEST below.

## Event-group table (before → after)
Before: sound only when a keyword matched card text (~25 words), music = tension for ALL event cards, no fx, no group hooks. After (default per frame group, overrides per category in `KPC`):

| group (frame) | categories | sound | music | fx (painted §68) |
|---|---|---|---|---|
| trieu-chinh | court, disasters, war, envoys, mourning | edict / alarm / win / decree / death | day / tension / sorrow | gold petals on victory, decree |
| sung-ai | hoàng đế vui, đêm, vi hành, tư tình, mật ước | favour / night / step | night | peach petals, kitFx favour / night / romance |
| trung-phat | giận, hình phạt, lãnh cung, hỏa hoạn | gloom / cane / doorShut / alarm | tension / cold | ink, ash, embers |
| le-nghi | seasonal rites, banquet, tấn phong, thỉnh an, fest-* | festival / rite / banquet / edict / kneel | festival (day for thỉnh an/tuyển tú/hh-việc, sorrow for tế lễ/tang lễ) | season petals / leaves / snow, lanterns |
| cham-con | sinh nở, con trẻ | bloom | day | lotus petals |
| giao-thiep | khách, thư nhà, quà, hảo hữu, bạc tiền | visitor / notice / lidGift / join / coin | day (night for chuyện lạ) | paper, spark |
| hau-ha | cung nhân, cung nữ, canh phòng | step / notice | day | — |
| hoc-tap | tài nghệ | mgwin | day | — |
| nghi-ngoi | weather, omens, illness | wind / xamDrop / lotGood / sick | day / night / sorrow | lotus petals (good omen) |
| muu-ke | tranh sủng, tin đồn, tai mắt, vu oan, hối lộ | schemeOk / search / expose / coin | tension | rumour wisps, ink, paper, coins |
| hai-nguoi | đầu độc, hại thai | poison / gloom | tension / sorrow | painted poison / blood edge |

Full per-category table is printed by `node dev/test/presentation.js … ` (writes `<out>/table.json`, 75 rows).

## Tests (dev/test/presentation.js)
75 categories × each size: plan + dialog data attributes present, dialog visible, a sound played (own or keyword), music equals the group track, story main/side/origin hooks, Gọn starts no particle/edge, 12 cards in a row for frame gaps, 0 page errors, 0 HTTP ≥ 400.
Results: ALL 6 sizes PASS (755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844): 75/75 categories planned, 0 page errors, 0 HTTP errors, Gọn clean. Longest frame gap with 12 cards in a row: 313–346 ms on small/1x, ~1.2 s at @2 sizes in headless software rendering (first load of fx files; real devices not measured) — reviewer please re-check on a real device. Old save not re-tested here (change is wrap-only, no state). Screenshots were looked at and deleted. Bytes added: 0 (no new files except ~9 KB JS source; effects load on demand from the existing img/fx).
Found and fixed in my own test: a rising sealed-letter fx covered the dialog text → replaced by paper burst (no object over text).

## ART REQUEST (nothing drawn)
1. MUSIC: no track fits romance (sung-ai uses bgm-night), court ceremony/grand drama (uses bgm-day), comic/gossip, joy-birth. Request 3–4 bgm loops: bgm-romance, bgm-court, bgm-joy, bgm-intrigue.
2. SOUND stings missing by meaning: seal of imperial decree for đại xá, soft chime for birth of a child at the event card (re-using bloom), child's laughter is voice only; weather has stings but no "omen" sting (xamDrop reused).
3. VOICES: none for emperor tender/lover tone, Thái hậu approval, elder mourning wail, crowd cheer (victory/festival).
4. FX art: painted fx for 15-item list items not wired because art is missing: #6 rumour wisps exist as edge only (no flutter paper notes); #9 candle-lit paper under a door; #11 exam/contest seal slam + ink blot sprite; #14 red thread joining (only the snapping thread sheet exists); #12 death/#13 birth swaddle reveal sheet; #10 painted confetti.
5. FRAMES: 9 origin frames for main story and 1 side-story frame painting (dialog border + corner ornaments), per OD 15/11 ~18:15Z.
6. Entrance animation art: edict scroll unroll for dialogs (sfx-edict-unroll exists; no painted scroll sheet for dialogs).

## KIT REQUESTS (stopped at these)
- K-A: `kitDlgFrame(group|origin)`: dialog frame by event group and by origin for main story (9 styles) + side-story style. Hooks are on the dialog already (`data-kpres-*`); the kit keeper only has to style them.
- K-B: `kitSceneEnd(label)`: the OD 07:20Z s11 rule "every animation scene ends with ONE short button". `git grep` on origin/main and all origin/review/* found no such part; not built here.
- K-C: dialog entrance animation (edict scroll unroll) as a kit motion part.

## Related work not duplicated
D51 fxkit (`review/fxkit-r1`, §68) is on main; I only call its API. D51 call-site wiring for gift/exam/death/birth moments by MAIN is untouched.

## Owner questions
1. Music: does she accept the interim mapping (romance → night track) until new tracks exist?
2. Should fx also play on routine group cards (court/giao thiệp), or only on dramatic groups? Currently light on routine ones.

SẴN SÀNG KIỂM ddb4d1ffcb2a0949bdfade543e542b141f695417
