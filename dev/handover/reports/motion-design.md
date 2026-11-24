# MOTION-DESIGN report — how events appear (game feel), study + 5 mocks

Worker: MOTION-DESIGN (session_01V1ZZH1Vs2r1yMeb37RPjRJ, lineage depth 4), child of MAIN CHÍNH 119. START_CTX ≈ 3 % of the window (get_session reads 0; own estimate).
Task: owner 24/11 ~07:48Z (OD) — "I do not want to change everything, I want to change HOW EVENTS APPEAR so it feels more like a game, more animation. Does the game have a thẻ bài card-pick? Dig deeper." DESIGN STUDY, NOT BUILD.

PRIORITY #1 CHECK: OD (24/11 ~07:32/07:35/07:42/07:48Z read verbatim; "thẻ bài lật thẻ card pick animation / MOTION game feel" earlier hits: 0 outside dev/MOTION.md + KIT §14, §67, §93) | main: dev/MOTION.md, dev/build/j93.js (kit motion), jflip.js (kitCardFlip), jk2b.js (kitRoulette), jgpick.js (item pick grid), jfxkit.js (kitEdictOpen), jend.js (kesUnfurl) | review/*: no motion/ring/carousel branch | claims: none (sister RING-DESIGN session_01V1ZZH3CcWmndHofFV5TX3K does only the figure ring). Reused: every mock uses existing CDN art (kit/card-back, kit/mo-edict-*, kit/mo-seal-thanh/bai, kit/mo-coin-silver, item-*, act-*, ev-*, fig-*, scene-*). NO new art made.

## 0. Where to look (open these first)
- Review page (both devices, 1x and 2x videos + still frames): `https://ctm-img.victoria-tntt.workers.dev/img/_review/motion/index.html` (see "Delivery" at the end for the exact state).
- Mock code: branch `review/motion-design` (db847a35), folder `dev/mock/motion/` (tl.js, harness.js, m1..m5.js, README).
- REWORKED after MAIN's law-9 reminder (OD ~09:05Z / ~09:15Z): every mock now runs INSIDE the real game (origin/main index.html in Playwright) — real dialog `.dlg/.kph/.kpseal`, real option cards `.opt`, real result card (`resultShow`, real seal), real HUD cells `.kst`, real item tiles `.kipc` (jgpick), real act cards `.kart`, real buttons, real `kitFlyItem` / gift animation. No private chip/frame/avatar; no round avatars; background at normal brightness and NO whole-screen dark overlay of mine (I set `#modal` background transparent in the mocks). Recorded by CDP screencast at 2x: Fold 755x1000 + iPad 1180x820 (law 12), 1x copies, key stills; every still looked at 3x.
- Older first-round mocks (own HTML shell, private cards) were DROPPED.

## 1. LIVE AUDIT (origin/main build run in Playwright, both devices) — how things appear today

| What appears | How it appears today | Game feel | Evidence |
|---|---|---|---|
| Event / choice dialog (VIỆC, ĐIỀU, LUẬT, BÁO, TIN, ĐÊM, KIẾP — kit §24/25 kinds) | One shared dialog `.dlg`: `kmIn` = 0.28 s fade + 14 px rise + scale .96 (j93 L331). Picture left, options as a plain vertical list of kit option cards. Same for every kind. | WEAKEST, and the MOST frequent (every event, every week) | audit shot `m-choice` (modal with 3 options) |
| Notice / news pill ("Có tin: … có chuyện", kit chip in the top bar) | Static kit pill; no entry motion found in j93/jfx. | very weak | audit home shot |
| Person arriving (visit, errand maid) | Card/dialog just appears. j93 notes "người đến thăm: bóng người hiện ở cửa" as UNBUILT (priority A). | weak | MOTION.md §Đề xuất |
| Item / gift pick (jgpick grid `.kshpick`) | Static tile grid; tap = glow; confirm button. The gift moment AFTER confirm is painted (fxkit). | picking weak, after-confirm good | PROGRESS_gift-pick |
| Action list ("thẻ việc", `deal()`) | Long scrolling list of kit act cards; no deal/flip/exit motion (j93 lists "chia bài đầu tuần" as unbuilt C). | weak | audit tab act |
| Result card (`rtoast.karesult`) | `kmUp` .32 s + seal THÀNH/BẠI stamp + floating numbers + stat bars (j93 piece 3). GOOD, but numbers float up in place; they do not travel to the HUD cell or the bag tab. | good, improvable | j93 L153 |
| Reward / gift box (kitReward) | Tray / chest / dragon chest / gift box: tap, rattle, lid, items arc out by grade, coins bounce. | STRONG — keep | audit shot `m-reward` |
| Origin pick (Luân hồi, kitRoulette, jk2b §14) | **THE EXISTING THẺ BÀI MOMENT**: nine origin cards face-up → "Tiếp" → all flip to the painted card back (`img/kit/card-back.webp`) → shuffle (gather to centre, deal back twice) → she taps ONE card blind → it glows, moves to centre, flips. Once per life only. | STRONG, but only at birth | jk2b.js L680; owner 11/15 04:00Z |
| Night (thị tẩm) card flip (jflip kitCardFlip §67) | Tablets/cards laid in a tray, hers lifts and flips, seal. Once per week. | strong, rare | PROGRESS_cardflip |
| Quẻ tuần (xăm tube), promotion edict (kitEdict), birth peony, death ink, buổi sky + incense, calendar | Built (j93 pieces 2,4,5,6). | strong, rare | MOTION.md |
| Weather, hearth/figure idle | Built. | fine | — |
| Tab / panel switching | Panels open with the same `kmIn`; tab change is instant. | flat | — |
| Dư đồ people list (Ngự Hoa Viên 16–18 figures) | Swipe row — RING-DESIGN's topic. | owner pain | OD 07:32/07:42Z |

Ranking of weakness (worst first): (1) event/choice dialog arrival, (2) notices and visitors, (3) item/gift picking, (4) action list (no deal), (5) result numbers do not travel. The rare big moments (reward, edict, death, birth, night) are already good: the gap is the EVERYDAY events.

Answer to "does the game already have thẻ bài?": YES — (a) Luân hồi roulette = the card-pick (face-down, shuffle, blind pick, flip), (b) kitCardFlip thị tẩm, (c) the painted card back `img/kit/card-back.webp` exists and is reusable. Everyday events do not use it.

## 2. BENCHMARK (from design knowledge of shipped games, not a fresh web study) — patterns and what to borrow

| Pattern | Where seen | What makes it feel alive | Fit for cổ trang |
|---|---|---|---|
| Card draw → flip → fan hand | Hearthstone / Slay the Spire / Legends of Runeterra rewards | choices are objects you hold; lift on touch, others lean away, picked card flies to centre | strong (we already own the card back + flip code) |
| Ring / carousel select | Genshin-style character select, Fate/GO servant pick, gacha banner wheels | everything visible on one screen, centre item lit, inertia swipe | strong for gifts, outfits, figures |
| Pack / box reveal, rarity order, skip | gacha summons, idle-RPG chests | anticipation (rattle, hold) then rarest last; tap to skip | already built (kitReward) |
| Reward fly-to-bag | idle RPG, mobile RPG popups | the gain travels to its counter, the counter pulses — the loop closes | strong, also satisfies law 6c (objects have a place) |
| Decree / memorial scroll unroll + seal stamp | Chinese palace-sim games | authority and ceremony, one gesture per kind | native to the setting |
| Flip the tablet (翻牌子) | palace games | already in this game (thị tẩm) | done |
| Otome / visual-novel event CG | affection games | full-screen CG with slow push-in, name plate drop, type-in text, hearts on affection | strong for VIỆC arrival |
| Visitor silhouette at the door, name plate | palace/otome | person-as-event before the text | strong |

## 3. FIVE PROPOSALS (each maps to the WHOLE group — law 11 — and to existing kit parts — law 9)

Common rules baked into every mock: motion only transform/opacity/clip-path (cheap on Fold); respects `kmReduced()` / "Cảnh động" off / `--pace`; tap = skip to end state; routine events ≤ 1.2 s, big events ≤ 2.5 s; every number/word per VANPHONG (no digits, no %, odds in words Vững / Tùy duyên / Có cơ); card equality kept (law 2: all option cards one frame, one size) and every option card shows Tốn · Được · Mất (law 3).

### P3 «Tin đến» — arrival grammar per kind (cost M) — RECOMMENDED FIRST
- What: four arrival forms: TIN = red silk ribbon slides down with a small ring flash and unrolls a paper card; CHIẾU CHỈ/LUẬT = scroll `mo-edict-closed` drops, ties part, `mo-edict-open` unrolls, text types in, seal stamps; KHÁCH = silhouette at the door, name plate drops, silhouette fills with colour; VIỆC = picture pushes in (kmegPush exists), "VIỆC" seal stamps, title + text type in.
- Where (whole group): the head of every kp dialog kind (kit §24/25: LUẬT, ĐIỀU, TIN, BÁO, VIỆC, KẾT QUẢ, ĐÊM, KIẾP) + the status-bar news row + visitor cards. Today all share `kmIn` 0.28 s.
- Kit parts: kitEdict + `mo-edict-*` art, seal chip, §95 typewriter/dialogue spotlight, §93 focus shot, kmegPush, `kmReduced`. New: ONE kit part `kitArrive(kind, dialog)` (kit keeper KK18) that wraps the dialog open — no per-screen variants.
- Why it feels like a game: each event is an entrance with a clear identity (you know the kind before you read); nothing about the layout changes.
- Pros: cheapest big win; no new art; no layout risk. Cons: adds 1–2 s per event unless skip/short variants are enforced; needs a per-kind duration budget in BAL.reveal.

### P4 «Lật kết quả và bay về túi» (cost S) — RECOMMENDED WITH P3
- What: result card arrives face-down, flips, seal THÀNH/BẠI stamps (BẠI: ink sink + shake + desaturate), the gained/lost number becomes an orb that flies to ITS cell in the top bar (cell bar eases, cell pulses), a lost coin leaves the Bạc cell, a received item flies to the Tư trang tab (tab bounces + red badge).
- Where: every result card (`rtoast.karesult`), kitReward items, gifts received, every stat change chip. Group = all places that show a delta.
- Kit parts: kitResultFx (j93 piece 3, already has seal + floats), kitFlyItem (exists), stat cells. New: small `kitFlyTo(from, to)` helper.
- Why: it is the core gacha/idle pleasure: the reward visibly goes somewhere; also proves law 6c (item traceable) to the player.
- Pros: cheap, clear for new players. Cons: simultaneous deltas must queue (≤ 3 orbs, rest instant).

### P2 «Vòng bảo vật» — item/gift ring (cost M) — build together with RING-DESIGN
- What: ≤ 12 items on an elliptical ring in front of the figures; swipe = inertia rotation; centre item big and haloed, name + grade chip + a note ("Bành quý nhân ưa món này"); "Tặng" → item arcs to the receiver, hearts, a Thiện cảm chip, log line.
- Where: every pick-ONE-of-N item moment: gift picker (jgpick), dâng/bestow, cài vào rương, dress picker, choose-one reward. NOT the Tư trang inventory (stays a grid: management ≠ choosing).
- Kit parts: item tile (§28.13e) + grade frame + `kitItem`; the ring itself must be the SAME kit part RING-DESIGN builds for people (`kitRing` with two renderers: figure, item tile). One part, two uses — exactly the owner's question "can the person ring be used for items/events too".
- Why: everything visible on one screen, no scroll, no getting lost; lighting the centre item is a clear "selected" state.
- Pros: solves the owner's "vuốt qua vuốt lại bị lạc" for items too. Cons: > 12 items crowd (category tab + ring); needs arrow buttons + tap-to-centre for non-swipers; reduced-motion = snap.

### P1 «Bàn bài» — event choices as a fanned hand (cost L) — pilot, then widen
- What: event arrives as a card drawn from a pile (back → flip), tucks up; the options are dealt from the pile as a fan (back → flip each); touch lifts one, neighbours lean away; the chosen card flies to centre, flips into the result card with the seal; result card folds into the Mệnh truyện/log tab.
- Where (whole group): all choice dialogs (events, kỳ ngộ, night customs, contests, trials) = every `m.opts` dialog rendered by showModal / kit option card.
- Kit parts: option card content (Tốn · Được · Mất · odds word), `kit/card-back.webp`, jflip/jk2b flip + shuffle code, kitSeal. New: `kitHand` (kit keeper).
- Why: the choice becomes an object you pick from your hand — the most "game" read of all five; the Luân hồi screen proves the owner already likes the language.
- Pros: strongest feel. Cons: option text is smaller on a card (13 px lines); > 4 options need two rows or a scroll fan; must keep a list fallback; needs the layout laws (10) checked on both devices; biggest build.

### P5 «Chia bài đầu buổi» (cost M) — LAST
- What: the buổi's action cards are dealt from a pile (flip each), a done card flips face-down onto a "đã làm" pile and the rest close the gap.
- Where: Hành sự tab (and the same list family in Hậu cung / Giao tình).
- Risk: the mock uses a grid; the real list is rows with a picture left — changing rows to a grid collides with law 10 (frame → layout → button size). Do only the deal/flip motion on the existing rows.
- Why last: lowest value per cost, highest layout risk, and the list is used constantly (the deal would repeat dozens of times a day → must be ≤ 0.6 s).

## 3b. KIT REQUESTS raised by the mocks (law 9 — nothing built privately)
- kitArrive(kind, dialog): per-kind arrival wrapper on the real dialog (clip-path unroll, edict drop, door silhouette, push-in + stamp + type-in).
- kitHand: card SHELL (card back `img/kit/card-back.webp` + gold card frame) that holds the real `.opt` option card; deal / lift / fly motion.
- kitRing: ring layout + inertia swipe + pedestal slot for a real item tile — ONE part shared with RING-DESIGN (people renderer + item renderer).
- kitFlyTo(from, to): delta orbs from the result chip to its HUD cell / from a HUD cell down; cell pulse; tab badge.
All four need a kit page sample + KIT.md entry by KK18 before any wiring.

## 3c. FINDING for MAIN (OD ~09:05Z: report, do not change): real kit parts that darken the WHOLE screen
- `#modal` backdrop = rgba(42,26,18,.53) behind every dialog (audit shot `m-choice`; the mocks neutralise it).
- `kitReward` chest/tray veil (very dark brown, whole screen) when a gift is confirmed (seen in mock 2 after "Tặng").
- Not checked line by line: §93 focus shot / §95 dialogue spotlight (grep `kmegPush`/dim in j93, jfxkit) — Foreman/keeper should scan them for the same whole-screen dark.

## 4. Recommendation and order
1. P3 + P4 together (kit parts `kitArrive`, `kitFlyTo`): 1 sprint, no new art, no layout change, touches every event the player sees → fixes the audit's weakest rows.
2. P2 with RING-DESIGN (one `kitRing`).
3. P1 pilot on ONE class (Ngự Hoa Viên encounters), measure that text stays legible on Fold, then widen to every choice dialog.
4. P5 last or park.
All five are NEW features → law 18 FEATURE FREEZE: they go to the parking lot (Foreman E may build parking-lot items); nothing here is wired into the game. A real build goes through the kit keeper KK18 and a reviewer consistency scan (no per-screen variants).

## 5. Coordination with RING-DESIGN (drama on a ring — the owner's worry 07:35Z)
Not duplicated here. Suggestions sent to RING-DESIGN: (a) one `kitRing` shared by people and items (the math in `m2-ring.html`: slot angle, depth scale, dim, z-order, inertia keyframes); (b) drama between two OTHER people on the ring: a red thread/notch between their two slots + a small alert badge on the ring rim; the TIN ribbon from P3 ("Tin trong cung: A và B tranh cãi") carries the alert and its tap rotates the ring to the pair, lighting both; (c) the ring never hides the alert: the ribbon sits above the ring, rim badges sit on the ring.

## 6. Honest limits
- Mocks are scripted recordings on the real game (not playable); the sample events/gifts are test data pushed into the real dialog functions.
- Benchmark is from design knowledge, not a fresh web study (no credits spent, no new art).
- Real build will need: perf pass on Fold (ring: ≤ 12 composited layers), reduced-motion variants, co-op (waiting for the host's week — events must not block the shared timer), sound hooks (existing sfx kit), kit page samples.

## 7. Delivery state
- Page + 40 videos/stills: https://ctm-img.victoria-tntt.workers.dev/img/_review/motion/index.html (CDN img/_review/motion/, 96 files, cdn_sync).
- Videos: rN-fold-1x/2x.mp4 and rN-ipad-1x/2x.mp4 (N = 1 Bàn bài, 2 Vòng bảo vật, 3 Tin đến, 4 Lật kết quả, 5 Chia bài); stills rN-<device>-still-<ms>.jpg.
- Wipe with the verdict: `python3 dev/site/cdn_sync.py --wipe-review motion`.
- Honest gaps: mock 2 fold was recorded before a harmless cleanup edit; the chest after "Tặng" is the real kitReward (dark veil, see 3c); mock 5 act cards stay rows (grid variant dropped); mock 1 card shell shows the real option card cramped at card width — real build needs kitHand to lay the option content out for a card.
