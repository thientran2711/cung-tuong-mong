# art-animations — verbatim owner rules

Holds: animations, page curl, effects, glow, sprites, videos.

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L527] - (~18:10Z, owner) ITEM EVENTS: any event that offers/presents an item she could get (letter, gift…) shows the ITEM ICON in the event dialog; choices accept/reject: accept → the item flies into Tư trang; reject/burn (e.g. 'đốt thư') → an animation of the letter burning. Sweep ALL events involving items for matching animations (whole class). Owner asks for proposals of PEOPLE animations too (ideas list sent; waiting for her pick).
### OD:L807 15/11 (session 8) — Gift picker shows item pictures in a Tư trang grid + gift animation (owner screenshot)
[OD:L810] - Decision: the gift picker shows each item as its PICTURE cell, same kit cell as Tư trang (picture + name + grade colour), laid out in horizontal rows to pick from; selecting a cell shows its ĐƯỢC/MẤT/odds detail (kit rows) and a confirm button. On giving: painted gift animation per 22:45Z list items 4–5 (item wrapped in silk / lacquer box carried across, ribbon untied on arrival; refused → box set down/returned) using §68 painted-fx. Whole family: every "choose an item to give/offer/bribe/use" picker in the game uses the same picture grid. → worker review/gift-pick.
### OD:L721 15/11 ~22:45Z — Painted animations for ALL events (owner)
[OD:L722] - Animations for every event and game moment, not just nights. Code-drawn weather is tolerated, but other code effects look off-style (e.g. the red screen flash for danger). Replace with painted (Magnific) effects. Owner asked for recommendations; per owner rule build them.
[OD:L723] - Coordinator list (build all, painted sprites/short black-bg screen-blend videos, perf budget applies):
### OD:L7 2026-11-14
[OD:L192] - (08:55Z) Owner: blood test gets animation/minigame; scheme acts get minigames (worker review/scheme-games; always option to skip and use plain odds; NPCs plain odds).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L372] - (08:20Z) EVERY time items/silver reach her there is a tap-to-open/receive animation: gifted = brocade box; rewarded/granted = tray/chest/imperial chest; found/searched = cloth bundle/pouch; bought = item flies into the bag, silver flies out; sold = item flies away, silver flies in; lost/confiscated = item fades and falls + notice card. Several items at once go in one chest. One shared function kitGain/kitLose.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1196] - (16/11) Owner: if the room weather and the season effect are both flying petals, use ONE petal effect (one painted Magnific sprite set, one layer). No code-drawn effects ever. → review/weather-fx-one.
### OD:L7 2026-11-14
[OD:L25] - Identity screen: origin art goes into a framed picture (left/top), info right/bottom; a new common reincarnation backdrop. Roulette animation (light runs over origin tiles, slows, stops on the rolled origin, zooms into the identity card) at new game AND rebirth.
[OD:L26] - Game feel: animations for key moments (card flip for night selection, weekly fortune sticks, stamp Thành/Bại, promotion scroll, demotion gloom, day/week transition, pregnancy/death, reward chest…). All art for them by gpt-2-6.
[OD:L37] - Every minigame (contests, lessons, self-practice, works, Chải chuốt, any other) has its own painted background + painted sprites (gpt-2-6); lessons use study/practice rooms, contests use festival courts.
[OD:L116] - (00:15Z) Owner: the UI reads like an open book — iPad = two-page spread (left room, right tab), phone = one page; tab switch = page turn on the right; week-book page flip must CURL like real paper (not a rigid card). (kitPageCurl, review/page-curl)
[OD:L132] - (03:30Z) Owner page-curl reference (dev/owner-shots/1115-curl-ref-*.jpg): the turning page lifts diagonally from the corner, rotates/tilts as it turns (corner leads), with a soft curved bend and a dark gradient shadow along the fold — not a vertical cylinder roll.
[OD:L135] - (22:30Z) Owner: face-down origin flow = show all 9 origins face-up first → "Tiếp" → cards flip face-down + shuffle → player taps one → it glows, flips, moves to page centre → "Tiếp" → that origin's picture animates over to the character-selection page. Odds unchanged.
[OD:L179] - (06:25Z) Owner: during page curl, the next page must already be visible underneath the lifting page (like a real book).
[OD:L186] - (07:50Z) Owner: the back of the curling page must show page content (the new page's image), not blank paper.
[OD:L204] - (01:30Z) Owner: Dư đồ scroll/unroll animation too fast → slow down (~2×, ease, interruptible, off with Cảnh động) → worker review/map-anim.
[OD:L208] - (01:50Z) Owner: slow the page-turn animation (~2×, ~1.1–1.4 s, smooth) → worker review/page-curl.
[OD:L295] - (09:30Z) Owner: the game lacks feel (buttons press-in/glow, animations); wants PixiJS for effects, device VIBRATION, screen shake per event — said since 14/11 but not done (code has VIB but almost never calls it). → review/game-feel: press/glow/ripple buttons, Pixi particle layer (falling petals, gold rays, falling silver, flying numbers), kitFx(kind) screen shake + vibration per event, respecting Cảnh động/Rung.
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L370] - (08:05Z) Items gifted at game start (family, relatives) must come out of the kitReward brocade box/chest (exists: tap to open, chest shakes, lid pops, items fly out by grade). Entering the palace with a rank → Nội vụ phủ grants a rank OUTFIT SET via chest; every promotion also grants the new rank's set. NPCs same rules (no animation).
### OD:L560 15/11 ~19:35Z — Night-end and new-day pictures (owner)
[OD:L562] - Add sound + on-screen animation by mood (e.g. happy night = soft laughter; unhappy night = a sigh).
### OD:L588 15/11 ~20:05Z — Big owner batch (recorded by session 6, assigned by session 7)
[OD:L610] 13. Animations to build (all approved): people slide in / fade out of the stage; promotion = portrait frame changes to the new rank frame, rank chip text changes, light gold glow; demotion / cold palace = rank chip cracks and falls, frame fades to grey; dragged away for punishment = figure dragged off stage, screen dims; slapped / scolded = one-beat screen shake + brief red flush; death = figure greys, fades, white silk falls over; pregnancy announced = soft pink light around her; birth = swaddled baby appears in her arms / beside her; favoured = petals fall around her; poisoned = figure tints green then blurs; alliance / betrayal = red thread joins two people or snaps.
### OD:L648 15/11 ~20:50Z — fig-bg crop rule + card-flip (lật thẻ bài) scene (owner)
[OD:L650] - END-OF-DAY CARD FLIP SCENE (big event → make it beautiful; Magnific painted scene / video allowed, but it must blend with the game's own animation so it looks like ONE continuous event, not pasted):
[OD:L652]   2. Start: all cards lit. Then the ones in their monthly cycle (or otherwise barred) turn grey (animation), are lifted out of the tray; the rest re-arrange neatly (animation).
[OD:L653]   3. The tray is carried/presented to the Emperor (animation).
[OD:L654]   4. He picks: the chosen card glows and grows to the centre of the screen.
[OD:L655]   5. If it is HER card, an extra animation tells her she was chosen.
### OD:L671 15/11 ~21:15Z — Card-flip shows HER knowledge (owner)
[OD:L672] - In the card-flip scene, each card's face/name follows HER knowledge (j61 stranger rule): unknown people show the grey silhouette + '???'. Everything shown in the game is what SHE sees, never what the Emperor knows.
### OD:L710 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
[OD:L712] - Art level-up (every art / Công Dung Ngôn Hạnh level): a short "học thành tài" celebration scene (painted, Magnific) that also shows what she gained: items appear (fly to Tư trang), new effects/abilities/recipes shown as info lines.
### OD:L721 15/11 ~22:45Z — Painted animations for ALL events (owner)
[OD:L721] ## 15/11 ~22:45Z — Painted animations for ALL events (owner)
[OD:L735]   12. Death: white silk falling, incense smoke curls.
[OD:L738]   15. Weather: keep code, but optionally upgrade rain/snow/petals to painted sprites for style match.
### OD:L746 15/11 ~23:05Z — Owner batch: makeup 8, CDNH works, old player looks as new faces, lover art, gifts from works, dress contest themes + luxury, weather painted (owner)
[OD:L754] - WEATHER: redo with Magnific painted effects using the same method (sprites + black-bg screen-blend videos), perf budget.
### OD:L768 15/11 ~23:30Z — Makeup "final look" reveal scene (owner; coordinator design)
[OD:L771]   2. Look-specific effect: đẹp/thanh nhã = soft petals + gentle glow + light chime; diêm dúa = gold sparkle, stronger warm light, bolder sound; vụng = a smudge-ink wobble + embarrassed sound; mặt mộc = simple soft daylight.
### OD:L883 15/11 (session 8) — Buổi change page-flip animation looks odd (owner)
[OD:L885] - Decision (coordinator design, replaces the page-flip for buổi changes; the week book keeps its own page curl): a TIME-OF-DAY transition — the current scene cross-dissolves through a soft ink-wash veil into the next buổi's lighting (§56 scene-light), while a small painted sky band slides the sun/moon along its arc and the new buổi name appears as a brush-calligraphy title with a seal ("Buổi trưa"), ~1.5–2 s, tap to skip; Gọn = quick fade only. Night → morning uses a dawn variant (mist + first light). Painted pieces via §68 painted-fx / Magnific gpt-2-6; perf budget; co-op: plays locally after state applies. → worker review/buoi-transition (QUEUED: subagent cap).
### OD:L888 15/11 (session 8) — Owner rulings: stage glow only for HER; stat glow green; buổi transition approved (owner)
[OD:L892] - Owner approved the buổi transition design as written (ink-wash dissolve to the new buổi light, painted sky band with sun/moon arc, calligraphy buổi title + seal, dawn mist + first light, tap to skip, Gọn = quick fade) and added: "Vẽ bằng magnific cho giống các hiệu ứng và chuyển màn khác" → all its pieces painted with Magnific (gpt-2-6), same method as the other painted effects/transitions (§68).
### OD:L923 15/11 (session 8) — Fold page-turn looks stiff; pick-hint must cover all groups; status questions (owner)
[OD:L924] - Owner (verbatim): "Animation lật trang của fold nhìn kì lắm. Nó đơ chứ không cong giống trang sách." → page turns (week book / any book UI) must CURL like a real paper page following the finger (bend, shadow, back side visible), not a stiff flat flip; Fold first, all viewports. Reuse review/drag-curl (orphan branch, ledger D37) + review/page-curl. → worker review/page-curl2 (QUEUED: subagent cap).
### OD:L960 15/11 (session 8) — Page turn only on landscape; portrait uses another animation (owner)
[OD:L961] - Owner (verbatim): "Trên điện thoại dọc thì không làm animation lật trang, vì không thấy cuốn sách mà lật trang chi. Chỉ lật trang trên màn ngang. Màn dọc fold nên làm animation kiểu khác. Bạn khuyến nghị."
[OD:L1349] - (16/11 15:55Z, s18 chat; overwrites OD:L962/L985 and OD:L1347 15:45Z) OWNER (verbatim): "bỏ luôn cái hiệu ứng lật trang khi mà ở trên cái màn chơi của bên iPad luôn đi, tức là hiệu ứng lật trang chỉ còn ở lại trên cái cuốn sổ tuần lục thôi." + 15:45Z: "cái màn hình full dọc, không cần hiệu ứng lật trang hay là không cần cái hiệu ứng nào khi mà chuyển tab. Bấm tab để nó qua cái tab mới bình thường thôi" → page curl ONLY in the Tuần lục book (swipe only there too). Tab change on EVERY device/orientation = NO curl: portrait = instant swap, no animation at all; landscape = instant (at most the short kit tab-underline move).
### OD:L1076 16/11 (session 8) — Owner rulings: start children, factions, don't ask small things, head marker, no double work across accounts
[OD:L1079] - Owner (verbatim): the marker above HER head on stage ("cái dấu hoa trên đầu của tôi") should bob up/down more visibly — slowly, clear travel distance — and glow. → face-sharp branch (animate the marker only, never the figure).
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1195] - (16/11) CORRECTION (owner): TWO effects. Weather = in the room/place stage only. Season = over the whole screen. Keep both as separate kit layers, never duplicating the same thing; no grey petals at night. → review/weather-fx-one.
[OD:L1260] - (16/11 07:20Z, s11) OWNER BUG (card flip): after the flip the light sits in the MIDDLE of the portrait and covers the face — the light must follow the avatar's FRAME BORDER, never over the face; and the animation is STILL too fast. → review/cardflip-glow (sonnet, session_01UV1Szki5WiXQ1nthXM98EG).
[OD:L1261] - (16/11 07:20Z, s11) OWNER RULE (every animation scene ends with a button): no animation/scene closes by itself. Each ends with ONE short button whose words fit the event — e.g. card flip lands on HER → "Chuẩn bị thị tẩm"; another consort picked → "Ta biết rồi"; otherwise "Tiếp theo" / "Đã hiểu". The button closes the scene. Whole family: every animation scene in the game (card flip, reward chest, promotion/demotion, item fly, level-up, festival, night, death/KIẾP, co-op…) via ONE kit part.
