# INTRO-DESIGN report — character first-introduction shots (owner OD 24/11 ~05:10Z)

PRIORITY #1 CHECK: OD 24/11 ~04:10Z→~05:10Z (selection-scene review rows s1–s23, dialogue rules ~04:45Z/~04:50Z, intro rule ~05:10Z) | main: dev/MOTION.md (no intro/reveal shot there), KIT §93 `jkitsel.js` (selection layer), `kitEntryGate` (j-entry gate, KIT 8.x), 33.9 swipe stage | review/*: kit-dialogue-vn (KK16: spotlight + typewriter + cue hook, in progress), selection-scene (SELSCENE-2, HOLD) | claims: INTRO-DESIGN = this session (CLAIMS.md L1366).
Nothing for "character intro" exists yet; the mock REUSES the KK16 parts that are announced (typewriter line with a per-line cue hook, speaker spotlight) and only adds new INTRO parts on top.

Status: RECOMMENDATIONS + storyboard mock (not a build). Mock code: branch `review/intro-design`, `dev/mock/intro-design/`. Page + clips: CDN `img/_review/intro-design.html`, `img/_review/intro-design/`.

## 1. Research — how admired games / dramas introduce a character the first time

Expert-first (law 8). Method: I looked for sources and found little citable material on the web (search returned generic film-writing pages); the list below is from craft knowledge of the genre (otome / VN / gacha RPG / Chinese palace dramas). Treat as designer's judgement, not as quotes.

| # | Technique | Where it is seen | What makes it feel polished |
|---|---|---|---|
| 1 | **Close-up then pull-back** (face first, body second) | Chinese palace dramas (the first shot of an empress is the face/headdress, then the camera opens to the throne), Fire Emblem: Three Houses, Genshin story cutscenes | Scale change IS the introduction; ease-out in, ease-in-out out; the background is soft so only the face is sharp |
| 2 | **Freeze-frame + name caption** | Drama "character cards" (vertical calligraphy: name + title), anime opening | Caption appears AFTER the face has registered (≈300 ms later); vertical brush name on the side, never over the face; holds 1.5–2 s |
| 3 | **Depth-of-field spotlight** | VNs (Fate, Ace-Attorney witness stand), Persona dialogue | Everything else blurs (6–10 px) and dims (≈.5–.7), still readable as a shape — owner's "tắt/mở đèn" |
| 4 | **Silhouette → colour reveal** | Persona boss reveals, Love and Deepspace entrances | Black shape + rim light first, colour fills in over ≈1 s; the pause makes the reveal land |
| 5 | **Entrance walk-in** | Otome VNs, Mystic Messenger-style chat, Arknights operator arrival | Figure slides in from off-screen with ease-out; the others STOP moving (idle sway stops) so the eye follows one thing |
| 6 | **Roll-call with synchronous highlight** | Fire Emblem class/house presentations, Idolmaster line-ups, drama "tuyển tú" scenes | Line types out; the instant the typewriter hits the name, that person brightens and a plaque appears at the feet; the rest stay dim but visible |
| 7 | **Lower-third title bar** | TV dramas, 80 Days, Disco Elysium NPC tags | Bar slides from the side, tag word «LẦN ĐẦU GẶP» + name + origin; leaves after ≈3 s so it is a memory, not a HUD |
| 8 | **Light-from-the-door entrance** | Costume dramas (the Emperor arriving) | Warm light cone + silhouette; sound/bell first, person second; the room dims so he "fills" it |
| 9 | **Inner-thought narration** | Otome protagonists, Sengoku-style VNs | The first sight is told by HER thought line (typewriter) and the image obeys the words — this is the owner's design exactly (A) |
| 10 | **Rank-ordered reveal** | Palace dramas (Emperor, then Empress Dowager, then Empress) | Order = importance = what her eye reaches first; the SAME shot grammar for all three so the player learns the rule; first one is the longest |

Common rules across all of them (carried into the kit): (a) ONE thing moves at a time; (b) the caption never covers a face; (c) text and image are tied by a cue (the words start the picture); (d) tap = jump to the end state of the current beat, never skip the story; (e) the same shot grammar every time = recognisable "first meeting" feeling.

## 2. INTRO KIT proposal (parts for KK16)

New kit parts (built ONLY by the kit keeper; the mock is a prototype):

| Part | What | Notes |
|---|---|---|
| `kitIntroStage(spec)` | One focus-shot container over the stage (Fold: stage rect 747x749; iPad: full spread 1180x820, see §4) with blur layer, shade layer, camera group, tap-to-skip | one at a time (queued with `kmPush`), Gọn/reduced-motion = final frame at once |
| `kitIntroPlate({name,sub,mode})` | Name plate: `v` = vertical brush strip (royals, side of the face), `h` = horizontal plaque under feet (roll-call, self-intro), `bar` = lower-third (first meeting) | ONE look (cream paper + gold border + ink-red name, serif display); title via `kitTitlePlate` tier effects if the person has a title |
| `kitIntroCue` | The KK16 typewriter fires `onCue(substr)`; intro parts subscribe | no new typewriter |
| `kitFocusFig` | Full/half-body figure with `crop` (clip + soft mask), `fly` (to seat) | uses the existing 900 px figure (`fig-*`), nothing new |
| `kitSpotlight` | Speaker lit / others dimmed (KK16) reused for D | same part |

Timing (all ms, in the kit table so one place changes them): type speed 34 ms/char (+110 after , ; · +160 after — … · +260 after . ! ?), blur in 700–1000, close-up push 700, half→full open 700, fly to seat 900, plate fade 450–600, hold after text ≥ 1800, post-line gap 700. Tap while typing = finish the line; tap when finished = next beat; long-press = skip the whole shot to its final frame. A faint hint «Chạm: xem tiếp · Giữ: bỏ qua» shows from the first beat.

Skip/seen rule: a first-introduction shot plays ONCE per person per save (flag `S.intro[id]`); replays (new life: same Hoàng thượng) are the short form: plate + 400 ms push only.

Wording (VANPHONG): thoughts «Người ngồi giữa, long bào vàng rực… hẳn là Hoàng thượng.», plates «Hoàng thượng / Chí tôn thiên hạ», «Thái hậu / Mẫu nghi thiên hạ», «Hoàng hậu / Chủ lục cung», «LẦN ĐẦU GẶP», «Hoàng thượng giá lâm». No % anywhere.

## 3. The shot types

All figures/backgrounds are the game's own: figures `fig-emperor-a26-1`, `fig-thaihau-h1-a51`, `fig-consort-c03-t8-a36` (Hoàng hậu), `fig-eunuch-u01-a51` (Tổng quản), `fig-player-look1-t1-a18`, tú nữ `fig-consort-c01/c02/c04/c05-t1-a18`, visitor `fig-consort-c02-t3-a26`; hall `end-bg-throne.webp`, yard `ngu-hoa-vien-xuan-sang.webp`. Clip lengths below are the mock's.

| ID | Type | Option | Idea | Length |
|---|---|---|---|---|
| A1 | ROYAL REVEAL | **Close-up card** (her description, literally) | 4 tú nữ walk in (royals NOT shown). Thought line types; at the cue word «Hoàng thượng» the hall blurs/dims and a HALF-BODY close-up fades in centred, vertical plate beside the face; the crop OPENS to full body, then the figure flies/shrinks to his seat. Repeat for Thái hậu (plate on the right) and Hoàng hậu (plate on the left), same grammar, shorter | 23 s |
| A2 | ROYAL REVEAL | **Camera push-in** | Same words and order, but the camera itself pushes into the seat (scene scale ≈ 1 → 2.1, blurred background), the figure rises into place, then the camera pulls back; plaque «Hoàng thượng · Chí tôn thiên hạ» at the bottom. Smoother, more "drama", less like a card | 23 s |
| B1 | SELF-INTRODUCTION (yard) | **Step forward** | The girl who speaks steps to the middle and grows 13 % (never above the stage height), others dim + blur, plaque under her feet «Khổng Thị Lan / Nữ nhi Khổng gia · Giang Nam», her line types in the box at the bottom, then she steps back | 11.7 s |
| B2 | SELF-INTRODUCTION | **Half-body card** | Yard stays, dimmed/blurred; a half-body card slides in from the right with a vertical name strip on the left; she does not leave her spot | 11.7 s |
| C1 | NARRATOR focus (Tổng quản) | **Centre** | He steps forward and grows to .72 of the stage, hall blurred, name plate at his feet, box at the bottom, nobody covered | 8 s |
| C2 | NARRATOR focus | **Left + box right** | Same but he stands LEFT and his box sits on the RIGHT (the event-frame family: speaker left, box right) | 8 s |
| D1 | ROLL-CALL | **Light + name** | Whole hall dark; Tổng quản lit; his line types: the moment the typewriter passes «—» the girl of that line lights up (slight pop) and her name plaque appears under her feet; next line, next girl; earlier girls stay lit with their plaque | 14.9 s |
| D2 | ROLL-CALL | **Spotlight cone + seal numeral** | Same cue logic, plus a warm light cone over the lit girl and a small red numeral seal (壹 貳 參 肆) on her plaque | 14.9 s |
| E1 | FIRST MEETING of a new NPC (visit) | **Lower-third** | Visitor walks in from the left, background softly blurred, bar «LẦN ĐẦU GẶP · Mục Tài nhân · Ngọc Thanh các» slides in, bar leaves after her first line | 9.2 s |
| E2 | Emperor's FIRST VISIT | **Door light** | Her real room dims; warm light cone; silhouette → colour; plaque «Hoàng thượng giá lâm»; her thought line | 9.4 s |
| F1 | DAY-1 ROOM ASSIGNMENT (OD ~08:50Z) | single option (follows her words) | 12 girls in 3 rows (yard); ma ma LIT, rest + background dimmed; her line types «Tây sở: A,| B,| C,| D.» with a beat after each name; at each name (typewriter cue) that girl's row figure vanishes and the same girl pops up as a half-body close-up in the centre, then shrinks into a group slot; after 4 → the group shrinks and goes to a corner (Tây bottom-left, Đông bottom-right, Bắc back-centre) with a plaque «Tây sở»…; at the end the scene gives way to HER room (real stage underneath): her figure + 3 grey «Người lạ» (the kit's `unknown-fig-f`) with plaques; her thought line. Ma ma = STAND-IN (consort a51 figure; the game's real ma ma figure may differ — flagged) | 29 s |
| G1 | SELECTION RESULT per girl (OD ~09:00Z + ~09:30Z) | tray along the row | Tổng quản with the tray figure `fig-eunuch-ndp-tray` walks along the row; typewriter «Khổng Lan — lưu bài tử, ban hương nang.» → at «ban» that girl, from her place in the row, zooms up (x1.22) + lights (others dim), the item (sachet `item-tuithom` / flower `item-tp-bhoa-b1`) flies from the tray to her; KEPT → she steps aside to the right, plaque «Ở lại»; BAN HOA → she backs OUT of the screen (shrinks, slides off, fades), plaque «Ban hoa»; next girl | 18 s |
| G2 | HER OWN result (big) | big version | She stands big in the centre, tray eunuch at the side, sachet floats to her, warm glow, plaque «Ở lại cung · ban hương nang». Needs its OWN painted background (OD ~04:40Z): mock uses the throne hall as a stand-in; new painting = Foreman C, held by the credit rule | 9.4 s |

Choice for the owner per type (max 2): A1/A2, B1/B2, C1/C2, D1/D2, E1/E2, F1, G1/G2. Recommendation: **A1** (it is what she described and reads as a "character card"), **B1** (full body, she asked for the person to be shown full body), **C2** (consistent with the event frame she restated 24/11), **D1** (plain, nothing to explain; D2 only if she wants extra ceremony), **E1** + **E2** both (different moments).

Other first-meeting moments to hook into the same kit (checklist for KK16/foremen, each uses a type above, no new art): new master (chủ tử) = A-short; Thái hậu summons first time = A1 short; Hoàng hậu receiving the new girls = D1; a new tú nữ arriving in the yard later = B1; Hoàng thượng first visit = E2; first time she meets a named NPC at a place = E1; first appearance of a child/prince = E1 with age tag; a new Tổng quản after a transfer = C2.

## 4. Fold vs iPad

- Fold 755x1000: the shot occupies the stage rect (747x749); the top status block and the tab bar stay visible (she keeps orientation). Figures keep the stage ratio in the tableau (feet ≈ 77 % of the stage, group figures .46–.66 H), only the FOCUS shot enlarges (close-up figure 1.5 x stage height).
- iPad 1180x820: the stage page is only 582x601, a cinematic close-up in it would be tiny, so the mock lets the intro take the **whole spread** (1180x820, game chrome hidden for the length of the shot). Open question for the owner: whole spread (mock) or only the stage page.
- Text box = existing narrator box position (bottom), centred 640 px max on iPad.

## 5. What I changed my mind on while building (useful for KK16)

- Figures sit at the stage height only in the tableau; the BOX at the bottom hides the lower legs of a focus figure — plates under the feet therefore need the feet raised to ≈ 77 % of the stage (otherwise the plate lies under the box).
- Do not hard-clip the half-body crop: use a soft mask (gradient) or the bottom edge reads as a cut-out.
- Two shots must not share one typewriter box without windows (each line replaces the previous) — the cue hook needs a per-line window.
- The royals standing on the dais look "floating" if their feet are above the carpet; in the real build the hall needs a dais/standing line painted (Foreman C) — the mock uses the current throne background.
- Soft figure resolution: the full-body PNGs are 900 px tall; the 1.5x close-up is upscaled ≈ 1.7x and still reads, but a bust crop (`por-` 384x506 is too small) would be sharper if she wants it at iPad size. NEW ART not required; optional list: none.

## 6. Mock details

`dev/mock/intro-design/` on `review/intro-design`: `intro-mock.js` (deterministic timeline engine + the 10 clips, injects into the REAL local build page), `render.js` (boot the real game with Playwright, seek, screenshot every frame), `mkvid.sh`. Clips rendered frame-by-frame at 12 fps (exact, no jitter; CPU-bound sandbox), Fold 755x1000 and iPad 1180x820, each with a 2x-speed copy. Stills at dpr 2 on the page.

Existing art only (credit hold): figures fig-*, backgrounds end-bg-throne / ngu-hoa-vien-xuan-sang, kit `unknown-fig-f`, items item-tuithom / item-tp-bhoa-b1, tray figure. Words «ban hương nang / ban hoa» from OD 24/11 ~09:00Z. Typewriter pauses ('|') per name are a KK16 cue-hook requirement: the hook must support a per-name beat.

Known limits of the mock (for KK16 / foremen): tableau positions are placeholders (the real hall needs a painted dais line); half-body crops reuse the 900 px full figures; the iPad mock covers the whole spread; the game's own name-guard rewrites unmet names in any DOM text («Tân Như Ý» became «Tân Phi ???» in the first take) — the real parts must pass the names through the kit name rules.

## 8. r2 (24/11 after MAIN 119: her rulings OD ~09:05Z real + ~09:15Z real) — what changed and which KIT part every element is

1. NO whole-scene dark / blur overlay: backgrounds stay at normal brightness (all dark shades, vignettes and background blur removed). Focus is on the FIGURES only: the lit one in full colour, the others `brightness .84 + saturate .75` (soft), no blur. (KK16 spotlight part should do exactly this.)
2. Strangers (not met) = the kit grey silhouette `img/kit/unknown-fig-f.webp` (KIT §59.1 / `kitSilFig`), never black figures: yard others (B), girls waiting behind Tổng quản (C), not-yet-called girls (D roll-call: grey -> colour at the cue), the 12 row girls (F), the 3 roommates in her room (F). Ma ma in F = the REAL ma ma figure `fig-mama-k01-a51` (no more stand-in).
3. KIT FIRST — every element of the mock, with its kit part:
| Element | Kit part used in the mock |
|---|---|
| overlay layer | `.kscn` (KIT §93.1 scene layer class), mounted inside `#stage`; no veil, no blur (kitScene.open NOT used because of the veil) |
| speech / thought box + speaker name | `kitDlgBox` (§93.3, `.dlg.kpanel.kscn-box` + `kpHeader`) — the typewriter inside it is the KK16 part (kit-dialogue-vn); the mock types into the box's text node |
| name under feet, group labels («Tây sở»), result labels («Ở lại», «Ban hoa»), «Người lạ» | the stage tag: `.tok .tag` + `.j59t` (title/origin line) + `.j59n` (name line) = KIT §28 stage tag / `kitNameTag` §93.5; NO private plate |
| tap hint | `kitChip` (§9 chip) |
| figures | raw `fig-*` pictures at stage height (build must use `kitStageFig` / `S.fig`) |
| item pictures (sachet, flower) | raw item art (build must use `kitItem`) |
| grey strangers | `unknown-fig-f` (§59.1) |
KIT REQUESTS (nothing private kept): **IC-1** large intro tag = the j59 tag at 1.45–1.6x scale (royal reveal caption, «giá lâm», first-meeting caption, room caption) — mock scales the kit tag; ask KK16 to give the tag a `big` size. **IC-2** half-body close-up = figure part option `crop:'half'` with a soft bottom mask. **IC-3** camera push (scene scale) for A2. **IC-4** typewriter beat per name (`|` pause) in the cue hook.
4. G1 «Ban hoa» label no longer a faded plate on her feet: the label is the kit tag, shown while she receives the flower (spotlit girl keeps full colour).
5. iPad mock = the stage page only (582x601), same layout as Fold — removes the "whole spread" question; everything uses the stage standard.
6. Law 11 check (whole-screen darkening in existing kit parts): `kitScene` §93.1 (`.kscn-veil` rgba(20,12,8,.45) + `.kscn-bg` blur 6 px; night veil) and any part built on it darken the whole scene — REPORT ONLY, not changed (needs her word); KK16/§95 spotlight must dim figures only.
7. Names used in the mock avoid the game's name-guard (it masks names of unmet persons as «cung nữ ???»).

## 7. Questions for the owner (to MAIN)

1. A1 or A2 for the royals? 2. iPad: whole spread or the stage page only? 3. First-meeting shots: play once per person per save, short form afterwards — OK? 4. Roll-call: D1 or D2.

Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/intro-design.html (CDN img/_review/intro-design/, 26 videos + 2x copies + 104 stills). To wipe after the verdict: python3 dev/site/cdn_sync.py --wipe-review intro-design.

~80% xong / ~0% chơi được (storyboard mock only; the kit parts are KK16's).

## 9. r2 delivery (24/11 ~10:50Z)
Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/intro-design.html — 13 options x Fold + iPad, mp4 + 2x copy, 4 stills each (104 stills, 52 mp4). Files in `img/_review/intro-design/<clip>-<fold|ipad>[-x2].mp4`, `<clip>-<dev>-s1..s4.jpg`.
Index: A1/A2 royal reveal; B1/B2 self-intro; C1/C2 Tổng quản; D1/D2 roll-call; E1 first meeting, E2 Emperor first visit; F1 room assignment; G1 result along the row, G2 her own turn.
r2 fixes after frame review: G1 "Ban hoa"/"Ban hương nang" are now kit tags (sub line + name), full strength, above the dialogue box on both devices (was faded on her feet); D2 hang fixed (seal numeral is now a sibling, no blend-mode cone); A2 still s1 re-shot (was the loading screen).
Known flags: royal tags on the carpet are light in A2 (kit tag, no plate behind); G2 uses the throne hall as stand-in (new painted background held by the credit rule); iPad mock covers the stage page only; tableau positions are placeholders.
Mock code: branch `review/intro-design`, `dev/mock/intro-design/` (commit fff52fe0).

## 10. r3 (24/11 after MAIN 121 review) — fixes, whole family each
1. **Tags cut by the dialogue box on iPad** (D1/D2, G1, F1, E1, E2, C1/C2, A2): the cause was one shared "feet" line (.77 of stage height) that fits the Fold stage (749 px) but not the iPad stage (601 px, box = 96 px + 8). Family fix: on iPad all rows of figures stand on feet=.69 (G1 .65, tags are 2-line), every stage tag sits at feet+4..6 px and is fully above the box on both devices (law 12). Checked on stills of all 13 clips x 2 devices; A2's bottom plate also raised.
2. **E2 tags over the room's right-hand info block**: the HUD parts of the live stage (.stop, .kpname, .krail, .ksh = Cung nhân/Chi tôn/Lật thẻ/Nguy hiểm chung, .kmemark, .kmfly) are hidden for the E2 scene only (the room painting and the girls' own kit tags stay); the Emperor is slightly smaller and the kit tag sits under his feet, above the box. No text-over-text in any clip (full still sweep).
3. **F1**: the close-up name (e.g. «Hồng Vi») is now a kit stage tag at the figure's feet line above the box (was mid-body); ma ma tag moved up, group tags «Tây/Đông/Bắc sở» shifted so they no longer overlap «Giáo tập ma ma / Tổng ma ma».
4. **E1**: the red «LẦN ĐẦU GẶP · Mục Tài nhân» lower-third was a private banner (no kit part exists for a lower-third). Removed. It is now the kit stage tag (.tok .tag, §28 / kitNameTag §93.5): sub line «Lần đầu gặp · Ngọc Thanh các», name «Mục Tài nhân», under her feet. No new KIT REQUEST needed; the old banner is not proposed.
5. **C2**: the box beside the figure was my own placement; the kit's standard place is the bottom of the stage (kitDlgBox §93.3), so C2 now uses it. C1/C2 differ by figure position only.
6. Host page: the frame around the mock (HUD, right column, bottom buttons) is the LIVE game; index page now says so («khung ngoài là bản game hiện tại, chỉ xem cảnh giữa»). The selection-day live HUD is SELSCENE-9's job (RV-SELX FAIL 3), not intro-design.
7. G2: the designer note strip (needs painted background) moved out of the game frame to a small caption under the videos on the index page.
Also: D2 plate numerals: sibling elements, cone gradient without blend mode (the blend-mode combo hung headless Chromium); first-still loading-screen flakes (A1/B1/G1 Fold) re-shot.
Mock code: review/intro-design commit 5cbb1049. ~85% xong / ~0% chơi được.

## 11. r4 (24/11 after MAIN 122): the two round face medallions in E2
They are a LIVE stage part, not mock: the mood seals `img.kfseal` (classes `kemo kemo-binh kfseal kemo-live kemo-m-nod`) that the game puts above each figure's head on the room stage (kit §28.8d / §78.y STAGE BADGE LINES; the big one is its lean-in clone `img.kemo-big`, §28.8d EMO-SEAL LEAN). In E2 the real room stage is the background, so they show over the girls' heads. They are now hidden for the E2 scene only with `img.kfseal, img.kemo-big, .kemo-big {visibility:hidden}` (installed with the other E2 HUD hides: `.stop,.kpname,.krail,.ksh,.kmemark,.kmfly`). Family for KK18: any intro/moment scene built over the live room stage must hide `img.kfseal` / `img.kemo-big` (and say where faces go: kit avatar frame, not round seals). Note for whoever hides them in the game: the root element also carries the class `kfshost` — never hide that class, it blanks the whole game (I did it once by mistake in the mock). Verified: 8 E2 stills (Fold + iPad) and both mp4 + 2x re-shot, no medallion in any frame.
Mock: review/intro-design (dev/mock/intro-design/intro-mock.js). ~88% xong / ~0% chơi được.
