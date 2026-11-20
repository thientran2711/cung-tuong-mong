# MG_CRAFTS — one real mechanic per craft (STEP 1: designs only, no code, no BAL change)
PRIORITY #1 CHECK ('Thêu|Cắm hoa|Khéo tay|pattern engine|trace|Chép kinh|craft'): OD 28 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 77
Owner (verbatim, OD ~L2030, 20/11 ~08:15Z): "Trời ơi, hiện tại trong game có tới 4 cái game mà chơi cái kiểu mà đồ nét chữ như vậy. Trời, boring lắm."
Rule recorded with it: each art gets its OWN mechanic, true to the real craft (law 8); tracing stays for ONE kind only (Chép kinh); no text in play; harder as she climbs; calibrated levels re-tested after; owner sees the designs first.
Worker E24 (FOREMAN E #17). Base origin/main 70bea3d3. Mockups: handover branch dev/handover/shots/mg-craft-design/ (CDN upload refused HTTP 401; see §MOCKUPS).

## §0 FINDING — which games really trace today (read the LIVE code, not the j82 table)
The OD 08:15Z CHECK read `dev/build/j82.js:25-28` (all four `e:"pattern"`). That table is STALE: `dev/build/j91.js:316-326` re-wires the kinds at load. Live engines:

| Kind (key) | Live engine | Feels like | Traces? |
|---|---|---|---|
| Vẽ (`ve`) | `trace` k91Trace (j91:321) | drag along a faint brush line | **YES** |
| Thơ (`tho`) | `calli` jnwp (jnwp:167) | drag along numbered faint strokes | **YES** |
| May áo (`may`) | `may` kwkTrace (jwkg:27-29) | drag needle along faint seam | **YES** |
| Công · Thêu theo nét (`td_cong`) | `tdthread` jtd (jtd:16) | pick thread colour, drag along dotted line | **YES** |
| Chép kinh (`kinh`) | `kinh` kwkTrace (jwkg:28) | drag along sutra strokes | YES — the ONE kind allowed |
| Cắm hoa (`hoa`) | `arrange` k91Arrange (j91:322) | drag stems into rings | no |
| Khéo tay (`kim`) | `untangle` k91Untangle (j91:323) | drag knots until no thread crosses | no |
| Thêu (`theu`) | `pattern` kg82Pattern (j82, j91:326) | memorise lit cells, tap them again | no |

So the "4 đồ nét games" she sees are almost surely **Vẽ, Thơ, May áo, Công** (+ Chép kinh). This page designs the 4 kinds the brief names (Thêu, Vẽ, Cắm hoa, Khéo tay — all 4 still benefit: Thêu's cell memory and Cắm hoa's rings are not the real craft either), and §5 gives short design notes for **Thơ, May áo, Công** because after this job they would still trace, which breaks her rule ("tracing for ONE kind only"). Scope of §5 = FOREMAN E / MAIN to order (td_cong, tho, may belong to mg-noword-b's files today; I touch none).

## §EXPERT — how the crafts were really done (law 8)
Embroidery (Thêu)
- Chinese court and Suzhou embroidery (Su xiu 蘇繡, one of the "four great" styles) build a petal from bands of the same hue, dark at the rim to light at the heart: *tào châm / long-and-short shading* (套針, 搶針). The embroiderer splits silk floss into fine strands and changes spool per band; the colour order is the skill, the even stitch rhythm is the hand. Satin stitch (平針) fills, "seed/knot" stitch (打籽) dots flower hearts, couched gold (盤金) outlines dragons and phoenixes on court robes.
- Vietnam: the craft guild honours Lê Công Hành as founder of embroidery (làng Quất Động); palace embroidery for Lê/Nguyễn courts followed the same shading practice.
- Sources: Wikipedia "Su embroidery" and "Chinese embroidery" (stitch list); Palace Museum Beijing collection notes on Qing court embroidered robes; Vietnamese sources on Quất Động guild (Lê Công Hành).

Ink painting (Vẽ)
- Xie He's Six Principles (謝赫六法, c. 500 CE): no. 5 *jingying weizhi* 經營位置 = placing and composition — where things go matters as much as the line.
- Guo Xi, *Linquan gaozhi* 林泉高致 (11th c.): "three distances" 三遠 (high, deep, level); a main "host" mountain with lesser "guest" peaks (主賓); far things small and pale, near things large and dark.
- *Mo fen wu se* 墨分五色 — "ink has five tones" (burnt, thick, heavy, light, clear); the painter controls tone by how much water the brush holds. Layering pale washes first and darker accents after (積墨, accumulated ink — Huang Binhong). Blank paper is part of the picture: *liu bai* 留白 (mist, water, sky).
- Sources: Wikipedia "Six principles of Chinese painting", "Guo Xi", "Shan shui"; Metropolitan Museum essay "Chinese Painting" (heilbrunn timeline).

Flower arranging (Cắm hoa)
- Ming manuals *Ping shi* 瓶史 (Yuan Hongdao, 1599) and *Ping hua pu* 瓶花譜 (Zhang Qiande, 1595): choose flowers of the season, an odd number, one main flower with "guest/attendant" flowers; stems cut so the main stem clearly rises above the vase; never crowded.
- Japanese ikebana, which grew from the Chinese altar/palace style: three main lines — *shin* (heaven, tallest), *soe* (man, ~3/4 of shin), *hikae* (earth, ~3/4 of soe) — set at different leans in an uneven triangle; the arranger CUTS each stem to length and sets its angle. (Our current game already names Thiên–Nhân–Địa; the real skill missing is cutting to length and leaning.)
- Sources: Wikipedia "Ikebana", "Yuan Hongdao"; Ikenobo/Ohara basic moribana proportions (school primers); Li & Sullivan notes on Ming flower manuals.

Fine handwork (Khéo tay)
- *Khất xảo* 乞巧 (Qixi, "begging for skill", 7th night of 7th month): palace women competed in handwork — threading a seven-hole needle by moonlight, and showing paper-cuts and knots. "Khéo tay" in a palace = this festival's crafts.
- Paper-cutting 剪紙 (UNESCO Intangible Heritage 2009): red paper folded 2, 4, 6 or 8 times and snipped; unfolded it becomes a symmetric window-flower 窗花. The skill is seeing, while folded, what each snip becomes once opened.
- Chinese knotting 中國結 (pan chang 盤長 "endless knot" etc.) — a fixed sequence of loops; strong but needs a long tutorial and would echo Múa (sequence memory). Kept as a parking-lot variant.
- Sources: UNESCO ICH list "Chinese paper-cut" (2009); Wikipedia "Qixi Festival", "Chinese paper cutting", "Chinese knotting".

## §COMMON — what every new board keeps (laws 4, 5, 1, 9, 12)
- Same KG82 contract: `eng(box, env{kind, lv, hud, end(raw0to10)}) → stop`, `KG82.peek()` oracle, kind KEYS unchanged (`theu`, `ve`, `hoa`, `kim`) so every caller (startContest, playArt, openMG lessons, jexam, jentry, jmgcal Thử tay, works j83) keeps working and old saves load.
- Same score road (law 4, ONE CORE): engine returns a float 0–10 → `mgGrade(raw, kind)` with the SAME `BAL.mgTier.kG.<kind>` (theu 5.5, ve .9, hoa 2.3, kim 1.8) and `BAL.mgTier.kAdj.<kind>` (theu 0, ve −1.6, hoa −2, kim 0); time part `mgPace(env, kind, el, lim)`; same cal key `BAL.ag.mg2.cal.k.<kind>` (now theu 9.7, ve 9.5, hoa 7.9, kim 7.7), same hand band `BAL.ag.mg2.hand` (lo 3, hi 9.5, w 4, skew 1.6). NPCs: unchanged `mgNpcRaw(kind, p, o)` one draw from her curve on the board the seat would get (law 1: same board for her and them). The sở trường ±2 / sở đoản on the RESULT (OD 08:30Z, C-AG #28) sits on top untouched.
- New board levers ONLY as `BAL.mgTier.lev.<kind>.<name> = [ease0, ease5]` read through `mgLev(env, kind, name)`; pieces added with rank through `mgMore(env)`; tolerances through `mgTol(env)`. Values below are PROPOSED shapes for the build step (C-AG / build worker sets them; no BAL change now).
- Harder as she climbs (law 5): `env.lv` from `mgTier` (occasion + rank + art level) — the same ease number every kind already gets; 3–5 rounds so the Thử tay ladder d −2…+2 bites.
- Calibration: the mechanic changes ⇒ her four cal values are void for the new boards; after build, Thử tay re-test of the 4 (and §5 kinds if ordered). Target her usual score ≈ 7–8 (main 08:35Z recommendation, pending her pick — not decided here).
- No words in play (OD 05:10Z): every cue is a picture (sample, lit band, swatch, ghost hand); ✓ is a sign button (k91Btns tooltip only); rules screen keeps text (kgReady). Score/clock chips stay (kitGameClock).
- Kit reused (law 9): kitGameFrame / .kgbox canvas / `.kg82act` + `.kgbtn` signs / kg82Spr glow + kg82Cue «lit / pressed» (mg-visual) / BAL.mgFx cue kit / kgReady rules + KG82_DEMO picture / kgTut guided round + ghost hand / kitQuick skip / kitGameVs head-to-head / kitGameResult / k91Pointer input. Laws 2/3: no new choice screen; the existing quick-skip (kitQuick) stays the equal-value alternative.
- Real objects (law 6c): boards draw silk, paper, flowers as scenery; no inventory item is created or used (same as today). Parking lot: real flowers from her garden / real silk spools from Nội vụ phủ.

## §1 THÊU (`theu`) — «Thêu lướt sắc» (shade the petal, stitch on the beat)
Core loop (3 lines)
1. The hoop shows a flower outline cut into bands; a small finished sample sits in the corner. The next band glows.
2. Tap the silk spool whose colour matches that band in the sample (spools: dark → light shades of one hue, shuffled, plus near-alike decoys).
3. The needle bobs up-down on a steady beat; a lit dot hops along the band — tap when the needle dips onto the dot to lay a stitch (silk sheen); off-beat = a loose loop that must be re-stitched. Band done → next lighter band. 3 pieces (mai 3 bands · mẫu đơn 4 · phượng 5).
What she touches: tap a spool; tap anywhere on the hoop on the beat (big target, thumb-friendly). No drag, no tracing.
Score (raw 0–10): per piece 10/3 × (0.35 × right-colour share + 0.65 × mean stitch quality [on-beat 1 / near 0.6 / loose 0]) × mgPace. → mgGrade(raw,"theu"), kG 5.5 kept.
Harder with rank (`BAL.mgTier.lev.theu`, proposed): `beat` ms between stitches [520, 900] · `win` hit window ms [90, 190] · `alike` decoy spools that differ by one shade step [3, 0] · `sway` hoop drift px share [.02, 0] · bands +mgMore. Low rank: the sample stays; high rank: sample shown 3 s then covered by its silk cloth (`peek` ms [3000, ∞]).
Distinct from: Đàn (falling notes on 4 lanes) — here one moving point + colour order; Công td_cong (drag along dots) — no drag at all (§5c).
Kit: all §COMMON parts; KG82_DEMO group "tap" exists. KIT REQUEST: none. ART REQUEST (Foreman C): silk spool sprite × 8 shades per hue (3 hues), 3 hoop motifs as outline + finished-band layers, needle sprite. SOUND: needle "tuk" (sounds go straight in, PREAMBLE L11).
Two-way: an NPC rival's live board on kitGameVs shows her/his stitches filling the same flower.

## §2 VẼ (`ve`) — «Thủy mặc: bố cục, năm sắc mực»
Core loop (3 lines)
1. Bố cục: the master's small painting is pinned in the corner; drag 3–4 motif stamps (chủ sơn, khách sơn, thuyền/nước, tùng/chim) onto the blank scroll where the sample has them — higher on the scroll = farther = drawn smaller and paler (three distances).
2. Mực: layers glow one by one, far → near. Hold the brush on the inkstone: its tip darkens through the tones painted on the stone's rim; release on the tone that layer shows in the sample.
3. Flick onto the glowing layer: the wash blooms. Ink that runs into the blank mist/water (留白) leaves a blot. 3 paintings.
What she touches: drag stamps; press-hold-release on the inkstone; one flick/tap on the layer. No tracing.
Score: per painting 10/3 × (0.5 × placement [distance to the sample spot, within tol = full] + 0.4 × tone match [exact 1 / one step 0.5 / else 0] + 0.1 × clean [no blot]) × mgPace. → mgGrade(raw,"ve"), kG .9 / kAdj −1.6 kept.
Harder (`BAL.mgTier.lev.ve`): `place` tol share of scroll width [.07, .14] · `tones` on the stone [5, 3] (5 = all wu se, finer) · `dry` ms before the loaded brush pales one tone [1400, ∞] · `peek` sample visible ms [3000, ∞] (high rank: sample rolled up after a look — memory) · motifs +mgMore · `bleed` blot radius share [.06, .03].
Kit: §COMMON; KG82_DEMO groups "drag" + "hold" exist. KIT REQUEST: none. ART REQUEST: motif stamps (2 mountains, boat+water, pine, crane pair) in ink at 5 tones or one grey sprite tinted at runtime (Foreman C to choose); inkstone with 5-tone rim; blank silk scroll; 3 master paintings (shan shui) as samples.

## §3 CẮM HOA (`hoa`) — «Chọn mùa · cắt cành · nghiêng thế»
Core loop (3 lines)
1. Chọn: the window shows the season (snowy mai, lotus pond, chrysanthemum, plum); tap the main flower of that season from a tray of 6 stems (look-alikes of other seasons wilt if picked).
2. Cắt: each stem lies beside the vase; swipe across it to cut. Thiên ≈ 1.5 × vase height, Nhân ≈ ¾ Thiên, Địa ≈ ¾ Nhân — the vase itself is the ruler (ghost ticks at low rank).
3. Cắm: drag the cut stem into the vase mouth and turn its tip to lean (Thiên ~10°, Nhân ~45°, Địa ~75°, uneven triangle; a faint fan at low rank). 3 vases (3 · 4 · 5 stems, extra = guest flowers).
What she touches: tap (pick), swipe (cut), drag-and-turn (set). Rings gone.
Score: per vase 10/3 × (0.2 season + 0.4 length ratio [error ≤ cutTol = full, linear to 0 at 3×] + 0.3 lean [≤ angTol full] + 0.1 balance/odd count) × mgPace. → mgGrade(raw,"hoa"), kG 2.3 / kAdj −2 kept.
Harder (`BAL.mgTier.lev.hoa`): `ghost` share of ruler ticks / fan shown [0, 1] (none at ease 0) · `cutTol` share of length [.06, .15] · `angTol` degrees [8, 20] · `alike` off-season look-alikes [3, 0] · `sway` stem wobble while held [.03, 0] · stems +mgMore.
Kit: §COMMON. KIT REQUEST (file in KIT_REQUESTS.md at build time, kit keeper builds first): **KG82_DEMO "cut" motion** (hand slashes across a stem) for the kgReady picture + kgTut step word «cắt» on `.kgt-bar` — no existing demo group shows a slash. ART REQUEST: 4 season window views, 6 stems × 4 seasons (uncut long, with bloom), 3 vases (bình men lam), cut-end sprite.

## §4 KHÉO TAY (`kim`) — «Cắt hoa giấy» (Khất xảo paper-cut)
Core loop (3 lines)
1. The finished red window-flower (unfolded sample) hangs on the left; on the right, the same red paper already folded into a wedge.
2. Drag one of 3 cutter shapes (moon, triangle, drop) onto the wedge's fold edge or open edge where it will make the sample's holes; each drop = a scissor snip.
3. Tap ✓: the paper unfolds (2 → 4 → 8 panels with a flourish); holes that match glow, extra holes show. 3 sheets.
What she touches: drag a shape onto the wedge; tap ✓ (sign). The skill = seeing the fold symmetry.
Score: per sheet 10/3 × max(0, (matched − 0.5 × extra) / needed) × mgPace. → mgGrade(raw,"kim"), kG 1.8 / kAdj 0 kept; the current mgPace knobs `lev.kim.fast/keep` [0,0]/[.6,.6] kept.
Harder (`BAL.mgTier.lev.kim`): `folds` [8, 2] (sheet order 2·4·8 at high rank; 2·2·4 at low) · `place` snap tol share of wedge [.05, .12] · `peek` sample visible ms [4000, ∞] · `alike` similar cutter shapes [2, 0] · holes +mgMore.
Distinct from: Câu đối (doiline: drag a stroke to its left-right mirror) — here radial multi-fold and a reveal; Múa (sequence memory) — no sequence.
Kit: §COMMON; KG82_DEMO "drag" exists. KIT REQUEST: none (the unfold is a canvas animation inside .kgbox). ART REQUEST: red paper texture, 3 cutter shapes, scissors sprite, 9 sample window-flowers (3 per fold count). Park: Qixi needle-threading and endless-knot variants.
Old engines: `untangle` (k91Untangle) and `pattern` (kg82Pattern) — build step scans their callers (j71, jdh, jentry, jkc2) and keeps them only where another caller still needs them.

## §5 THE OTHER TRACERS (for FOREMAN E / MAIN to order — not built by this job)
5a. Thơ (`tho`, Thư pháp) — «Bát pháp chữ Vĩnh» (永字八法: the 8 basic brush strokes). A character builds stroke by stroke; for each, a picture of the stroke type appears on the copybook (chấm, ngang, sổ, móc, hất, phẩy, phẩy ngắn, mác) and she FLICKS that gesture (direction + press/lift shown by the brush icon) on the beat — a gesture, not a path to follow. Score: right gesture × on-beat × mgPace; levers beat / win / alike strokes. Key `tho`, kG/kAdj/cal unchanged.
5b. May áo (`may`) — «Cắt ráp áo»: lay paper pattern pieces (thân, tay, cổ, vạt) on the bolt of silk so they fit without waste and with the grain arrow along the selvage, then tap ✓ to see the robe assembled. Drag + rotate puzzle; levers pieces / grain tol / waste tol.
5c. Công (`td_cong`, jtd, Tài đức trial): today it is "choose thread colour + drag along dots". Simplest: reuse the new Thêu board (§1) under the trial skin — or keep as-is if MAIN rules trials may share an engine. j91's rule "no two kinds share one" makes reuse a MAIN call.

## §MOCKUPS (law 12: Fold portrait 755×1000 + iPad landscape 1180×820, looked at 3×)
Plain sketches (no kit part exists for these boards yet): grey blocks = existing kit frame parts (seal TÀI NGHỆ, title line, clock chip, ✓/? sign buttons); the board is a hand sketch of the new play. A side caption band (not in the game) says what happens.
Files (WebP): handover branch dev/handover/shots/mg-craft-design/`<kind>-fold.webp` + `<kind>-ipad.webp` for theu, ve, hoa, kim (cdn_sync.py → HTTP 401 Authentication error, so the root44-common fallback path is used; move to CDN img/_review/mg-craft-design/ when auth works, then delete from git). Links in dev/handover/reports/mg-craft-design.md.
