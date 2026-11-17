# looks-2 — NEW LOOKS (smudge, stains, ink, pox, layer law, live emotion faces)

PRIORITY #1 CHECK: OD (17/11 ~16:20Z real) item (g) read verbatim + L126/L130/L139/L348/L1144/L1154/L1196 | main: jface.js KIT_FACEFX (ill/doc/tat/phat + jrash), jtoil.js toilFaceLayer (makeup = one layer in kitFxLayers), j13.js ILL (daumua exists: cont, die, scar −8; no thuydau), jweather.js wxRisk/wxHit (outdoor weather, umbrella gear "cold", kiệu, helper), jemo.js EMO (vui/buon/gian/ghen/dau/lo…), jemoact.js (crying acts khoc/tui/okhoc), jrash.js A("rash") = the harm-act pattern, j92 wdWearEntry/wdApply (outfit change) | review/*: makeup-lux (B, makeup levels + luxTotal; no smudge/stain/ink/pox/thuydau/emotion-face code — `git grep` checked), toil-looks2-r5 (Vụng A blobs, merged into makeup-lux); "mụn"/pimples: NO state anywhere on main or makeup-lux (nearest = rash "nổi mẩn") | claims: none before this (CLAIMS row looks-2 = me).

Worker: session_01N1tNP5NugSQQVChrBKbF4p · coordinator Foreman B s6 (session_01N1tNP6aS1jVsCvD9kpxdH1) · branch review/looks-2 (from origin/main e8b1906fb).
START_CTX ≈ 12 % (estimate). Rollover at ≈ 37 %, ceiling 60 %.

## 0. Design note (DESIGN FIRST — no code before this was sent to Foreman B)

### 0.1 One module, one rule for everyone
New module `dev/build/jlooks.js` (assembled right after jtoil/jtoilr so it sees both jface and jtoil). Every number in `BAL.looks` (one `Object.assign(BAL,{looks:…})`, same pattern as BAL.wx in jweather). Every state lives on the person object (her, consorts, servants, court, Thái hậu, Hoàng thượng, children) and is read through `KIT_FACEFX.each` — no per-kind code path (OD:L1154). Deny table extended: Hoàng thượng and Thái hậu are never the TARGET of the two new harm acts (same as tat/phat); weather, crying and illness can land on them.
Who wears makeup: her = only when today's toilette has makeup (`toilToday(S).makeup`); co-op friend = her friend record; every other WOMAN (consort, maid, mama, cung nữ, Thái hậu) = painted made-up in the base art, so smudge can land; men / eunuchs / Hoàng thượng / children never get SMUDGE (they still get stains, ink, pox).

### 0.2 States (all saved on the person; old saves = none)
| state | field | causes | clears | Sắc while it lasts | chip (VANPHONG) |
|---|---|---|---|---|---|
| makeup smudge | `p.smu={sev 1-2, why:"mua"/"tra"/"khoc", at, by}` | (a) outdoor act in RAIN (wxHit, her and NPCs): no umbrella/áo tơi/kiệu → ALWAYS; with dù/áo tơi or a maid holding the umbrella → only a chance `BAL.looks.smu.gear[sev]`; kiệu → `BAL.looks.smu.kieu`; snow → `smu.snow`. (b) hit by the new act "Hắt nước trà". (c) CRYING (jemoact khoc / tui / okhoc and any `emoCry(p)` hook) → `smu.cry` chance | she REDOES her makeup (a new S.toilette record) or the tuần ends (makeup is per tuần); NPC women: tuần end | `BAL.looks.smu.sac[sev]` | "Phấn son lem nhem" |
| outfit stain | `p.stain={k:"uot"/"tra", at:<abs buổi>, by}` | uot = outdoor in rain/snow without kiệu (umbrella lowers to `stain.gear`); tra = "Hắt nước trà" | uot: dries after `BAL.looks.stain.dryBuoi` buổi; both: outfit changed (wdWearEntry / wdApply) or tuần end | `stain.sac.uot` / `stain.sac.tra` | "Áo ướt sũng" / "Áo loang vết trà" |
| ink smear | `p.ink={at, by}` | new act "Bôi mực lên mặt" | she redoes makeup (washes) or tuần end | `BAL.looks.ink.sac` | "Mặt dính mực" |
| chickenpox | `p.ill={k:"thuydau",…}` (j13 ILL, same pipeline) | season Xuân (ILL.sea), contagion = the existing `cont:1` rule (illMonthP "near" + jface staff spread, extended from daumua to every `cont` illness with face marks) | j13 cure roll as every illness; `die:0` | `BAL.looks.pox.sac.thuydau[st]` | the existing ill chip ("Thủy đậu · nhẹ") |
| smallpox | existing `ill.k="daumua"` (j13 + j13 epidemic + j67 s_dich) | unchanged | unchanged (scar −8 on cure stays) | `BAL.looks.pox.sac.daumua[st]` | existing ill chip |

Seen rule = the one `KIT_FACEFX.seen` (herself, or she knows / has seen the person). Pox marks use `fxIllSeen` (illKnown).

### 0.3 Odds keys (BAL.looks — first values, tuned by measure)
- `smu:{rain:[0,100,100,100]` (no cover = always, owner word), `gear:[0,35,50,70]` (umbrella/áo tơi), `help:[0,30,45,60]` (maid holds the umbrella), `kieu:5, snow:[0,15,25,40], cry:70, sac:[0,3,6]}`
- `stain:{rain:[0,60,85,100], gear:[0,20,35,50], kieu:0, dryBuoi:2, sac:{uot:2,tra:4}}`
- `tea:{o:55, duc:-3, sevW:[.6,.4], cd:2}` — act "Hắt nước trà" (band Hại nhỏ, motive-gated through mindMenu like "Bỏ phấn lạ"; `caught()` evidence trail; result: smu (why "tra") + stain tra; Hoàng thượng / Thái hậu denied)
- `ink:{o:45, duc:-4, bac:0, sac:5}` — act "Bôi mực lên mặt" (same band/pattern)
- `pox:{thuydau:{sea:["Xuân"],cont:1,die:0}, sac:{thuydau:[0,3,5,8],daumua:[0,6,10,14]}, spread:35}` (spread = the existing 35 % daumua staff spread, now one key)
- `emoFace:{v:40}` — emotion face threshold (see 0.6)
Player text prints these through `chanceW()` (ladder Liều … Nắm chắc), never a %.

### 0.4 LAYER LAW (item 5) — order and the family scan
Order inside every face box (kitFxLayers, DOM order = paint order): `picture < MAKEUP (kmkl SVG + kmkc colour layer) < ill/doc tint (z10/12) < rash (z20) < pox (z22, new) < smudge (z24, new) < ink (z26, new) < slap (z30) < scar < veil < frame`.
Today this holds only BY ACCIDENT of assembly order (jtoil wraps kitFxLayers after jface, so its makeup string is prepended). looks-2 makes it a LAW: jlooks wraps kitFxLayers last and re-sorts the pieces by a layer table (`LOOKS_LAYER`), and a test asserts it.
Family scan (`dev/test/looks-layer-scan.js`): her + 1 consort + 1 maid, makeup on, every mark set one at a time and all together, at every face place (tall portrait pframe, small avatar mdH, room-stage figure kitFxPut, event-stage figure, podium, mirror zoom kitFaceZoom, toilette preview) → rows: place × mark → `makeup present` + `makeup below mark`. Before/after table goes in §2.
Note: the ill/doc CSS tint paints pale lips OVER the lipstick. That is "on top", not erase — it follows the law; flagged for Foreman B in case the owner reads it as erasing.

### 0.5 ART REQUESTS (→ FOREMAN_C_STATUS; Magnific gpt-2-6; transparent PNG overlays fitted to the existing veil/scar fit boxes like img/rash-*.png; NO code-drawn effect, OD:L1196)
Until a file is delivered, its slot draws NOTHING (state, chip, Sắc and logs work; `LOOKS_ART` lists ready files, flip one line when C delivers).
1. `img/fx-smudge-1.png`, `img/fx-smudge-2.png` — makeup smudge overlay (light / heavy): powder streaked by water, a little lip colour smeared past the line, faint grey lash-run under the eyes; transparent; face-box square like rash-*.png (nose bridge at 47 % height).
2. `img/fx-ink.png` (+ `img/fx-ink-2.png` mirrored variant) — black ink smear across one cheek / jaw, brush-stroke, transparent; cheek box like fx-slap.png.
3. `img/fx-pox-thuydau-1..3.png` — chickenpox: small red spots / blisters scattered on face, light/medium/heavy.
4. `img/fx-pox-daumua-1..3.png` — smallpox: dense raised pustules, light/medium/heavy (heavier, more uniform than thủy đậu; still not gory).
5. Outfit stains — figure overlays: `img/fx-stain-uot.png` (darker wet patches + drip on robe front/hem), `img/fx-stain-tra.png` (brown tea splash on the chest/sleeve). Needs a body-fit box per figure (none exists: KIT REQUEST below) → until then the stain shows as chip + Sắc only.
6. LIVE EMOTION FACES — see 0.6 (pilot first).

KIT REQUEST (to the kit keeper via Foreman B): a "body/chest fit box" per figure picture (like veil-fit for faces) so outfit-stain overlays can sit on robes; and an "emotion picture swap" slot in kitFigOf/portrait pickers (0.6). Filed in dev/kit/KIT_REQUESTS.md.

### 0.6 LIVE EMOTION FACES — proposal (owner rejected code mesh-warp 14/11, OD:L139 "emotions must be clearer")
Recommendation: PAINTED PORTRAIT VARIANTS, swapped whole (not an overlay, not a warp).
- Keys shown on the face: vui (EMO vui), buồn (buon / dau / lo / so), giận (gian), hờn (ghen + tủi thân), and khóc (= buồn with tears, only in the buổi a crying act happened; also smudges makeup by 0.3 `smu.cry`). Shown when `emoGet(p).v ≥ BAL.looks.emoFace.v`; else the serene base.
- Art: for each portrait file `por-X.webp` Foreman C makes `por-X~vui.webp`, `~buon`, `~gian`, `~hon`, `~khoc` by gpt-2-6 image-to-image from the SAME picture (same face, hair, jewels, frame crop; only brows, eyes, mouth, tears change), so every fit table (veil/scar/toil/mk-fit) stays valid and makeup + marks still sit on top. Clear, readable at avatar size (the owner's complaint about the old code version).
- Where: portraits (tall frame, avatars, mirror zoom) first; full-body figures keep the serene face in phase 1 (face is small there) — phase 2 if she wants.
- Pilot: her current face + 1 consort × 5 variants → owner checks through Foreman C → then batch, ordered by faces in use.
- Code (no art needed): `looksEmoFace(p)` → key or null; the portrait picker tries `por-X~<key>.webp` only when it is in `LOOKS_ART` (no 404 probing); mood icon stays as today.
- Art-rule note for Foreman B/C: the standing art rule says base faces are serene (no sad/teary/pout); the owner's override (g) is for these TEMPORARY variants only — base art stays serene.
Rejected alternatives: code warp (owner said no); painted part-overlays on eyes/mouth (seams + makeup misfit, low readability at avatar size).

### 0.7 Co-op and devices
All states are plain fields on person objects inside S → they ride the existing state sync; NPC world rolls (rain on NPCs, NPC harm acts) stay host-only like wxGearAll / placeWhere. coop-e2e: both seats must render the same marks. Display only through existing kit parts (pcard chips, kitFxLayers face layer); no new UI.

### 0.8 Build order (no art needed)
1 BAL.looks + states + clears + Sắc + chips · 2 weather hook (wxHit) · 3 crying hook · 4 two harm acts · 5 ILL.thuydau + pox face entry + spread · 6 layer law wrap + scan · 7 emotion-face key + art slot · 8 tests (face/toil/illness, one-core-guard, kit-conform, coop-e2e, old-save, quickcheck; Fold 755x1000@2 + iPad 1180x820@2).

## 1. Build log — SẴN SÀNG KIỂM 040ce3440 (review/looks-2, base origin/main e8b1906fb)
- `dev/build/jlooks.js` (new, assembled LAST so its kitFxLayers wrap is outermost): BAL.looks; states smu / ink (on the day's toilette record → redo makeup or next tuần washes them) and stain (p.stain; wet dries after dryBuoi buổi; wdWearEntry / wdApply or next tuần clear it); weather hook on wxHit (her + every NPC, one roll; no cover = always smudged in rain; dù / áo tơi / maid umbrella / kiệu = odds); crying hook (jemoact eaDo "khóc" + her "Khóc thầm" ventMe → BAL.looks.smu.cry); two harm acts "Hắt nước trà" (tea) + "Tẩm mực khăn mặt" (ink), band Hại nhỏ, motive-gated in mindMenu, Hoàng thượng / Thái hậu denied; ILL.thuydau (Xuân, cont, die 0) + servant spread (BAL.looks.pox.spread); face-fx entries pox z22 / smu z24 / ink z26 (picture only when LOOKS_ART lists the file) + stain (chip + Sắc; no picture until the body-fit KIT REQUEST); emotion-face key looksEmoFace (vui / buồn / giận / hờn / khóc) + kitFace swap to por-X~key.webp only when listed in LOOKS_ART; LAYER LAW wrap (fit by base file; every img.kmkl hoisted under every mark).
- `dev/build/jcoopworld.js` (family fix found by the co-op test): a co-op player's face marks were NOT seen by the other seat (rash, slap, poison, punishment, sickness, scar — only illness rode LOOK). Now FXL = rash/slap/pz/pen/sick/scar/stain/lk/lkCry ride the live pos relay + the week merge, and a mark one seat puts on the friend's entry goes back to her at the week write-back (the live relay does not stomp a pending local mark).
- `dev/kit/KIT_REQUESTS.md`: body-fit box per figure (stains) + emotion portrait swap slot.
- Art: ART REQUEST in FOREMAN_C_STATUS (17/11 ~17:20Z). Nothing drawn, no code drawing; every slot empty until delivered.
- Open for Foreman B: "mụn" (pimples) has no state anywhere — nothing to layer; ask the owner via main whether pimples are a new mark or she meant nổi mẩn. Đậu mùa scar after recovery stays the old Sắc −8 (no scar picture). Emotion faces wait for your OK on §0.6 + the C pilot.

## 2. LAYER LAW before/after (dev/test/looks-2.js --scan-only; her with makeup on; picture por/fig-consort-c01-t1-a18 has veil + scar + toil fit)
| place × mark | before (main e8b1906fb) | after (040ce3440) |
|---|---|---|
| portrait / avatar / stage figure / mirror zoom × ill, doc, rash, slap, scar, ALL | 24/24 makeup present + under every mark (held only by assembly order: jtoil wraps after jface) | 24/24, now enforced by the jlooks wrap |
| same 4 places × pox, smudge, ink, ALL (8 marks) | — (no such marks) | 12/12 makeup present + under every mark |
| co-op: A's marks as seen on B, B's on A (dev/test/coop-looks.js) | 16/21 — a player's rash / slap / stain / smudge / ink invisible on the other seat; a mark put on the friend lost | 21/21 |
Note: the ill / doc tint paints pale lips OVER the lipstick (on top, per the law). If the owner reads that as "erasing", it is a tint-strength question for the ill entry, not layer order.

## 3. Tests (on 040ce3440)
- dev/test/looks-2.js: scan 36/36; checks all true — thuydau rule, smudge Sắc = BAL, chip, redo clears, no makeup → no smudge, men no smudge but stain, rain without cover 20/20, umbrella ≈ 97/200 (gear[2] = 50), wet dries, outfit change clears, NPC ink gone next tuần, acts registered + emp denied, tea lands, crying ≈ 67/100 (cry 70), old-save object safe, emotion key gian + no swap without art; no page errors.
- dev/test/coop-looks.js 21/21 (before 16/21); dev/test/coop-e2e.js 63/63.
- dev/test/toilette.js 755x1000@2: no overflow, no errors.
- one-core-guard PASS (inline 5092 ≤ baseline 5093); one-core-text PASS.
- quickcheck PASS (core gates incl. kit-conform + co-op one-world probe; old save from live loads + plays; perf new/live render 181/156 ms, buổi 902/889 ms, tasks>200 ms 15/11 — earlier run 11/12, noise).
- Devices Fold 755x1000@2 + iPad 1180x820@2: her card with smudge + tea stain + ink + thủy đậu → no overflow, no page errors; HUD shows "Thủy đậu · nặng" (shots outside git, not uploaded).

## 4. Handover (if a successor is needed)
review/looks-2 @ 040ce3440 is complete for the no-art scope. Next: when Foreman C delivers a file, add it to LOOKS_ART in jlooks.js (one line) and rerun dev/test/looks-2.js; emotion faces per §0.6 after Foreman B's OK.

## 5. PART 2 — TABLE FIRST (Foreman B s6 17:32Z; MAIN s34 16:35Z/16:40Z/17:12Z/17:40Z + MAIN s35 17:30Z; OD tail 16:35Z, 16:40Z, 17:40Z (1)(3), 17:55Z (2))
PRIORITY #1 CHECK: OD 16:40Z (3 smudge levels, pox-scar ointment via hủy dung path, tea/water/ink minigames), 17:40Z (1) emotion faces DROPPED for good, (3) every weather kind; 17:55Z (2) painted filters, A/B table, s34 Lượt 62 all approved | main: j12 WX (16 states) + jweather wxRisk/wxHit, j70 scar70 + scar cure, jlooks (part 1, 040ce3440) | review/weather-khac e1d540cf (currentWeather(k).lv, wxDayAny, wxkHook, WX_KH: trời âm u / mưa rào / mưa thu) | dev/design/HARM_ACTS.md: NOT on the handover branch yet (harm-acts-expert) → folded in when it lands | claims: looks-2 (me).
EMOTION FACES: owner dropped them for good (OD 17:40Z (1) "bỏ đi, tốn credit không có đáng") → part 2 REMOVES the part-1 slot (looksEmoFace / kitFace swap) and the C pilot request is CANCELLED in FOREMAN_C_STATUS. The mood seal next to figures is kit-figure-mood (main), not looks-2.

Rules for every row: same for every person (her, NPC women; men get no makeup/hair-ornament rows, the rest yes); levels nhẹ / vừa / nặng = the weather's own level (currentWeather(k).lv; dry kinds use BAL.looks level by kind) or the act's result; every A-look is ONE PAINTED OVERLAY FILTER per level (Magnific gpt-2-6 via Foreman C ART REQUEST, never code-drawn, OD:L1196) — slot empty until delivered; all numbers in BAL.looks; shown on the person card as a kit chip; cover (dù / lọng / áo tơi / kiệu / người che) lowers the odds, never to zero except kiệu.
Clears: HAIR = redo hair (Điểm trang lại) · FACE = redo makeup · CLOTHES = change clothes (wdWearEntry / wdApply) · TIME = buổi/khắc count in BAL · every look ends at the next tuần (day).

| Cause (season / source) | A — FASHION / appearance (painted filter, levels) · clears | B — GAMEPLAY effect (BAL odds/amounts) |
|---|---|---|
| **Mưa phùn** (Xuân) | lem phấn nhẹ; tóc ẩm, áo ẩm lấm tấm (nhẹ→vừa by lv) · FACE / CLOTHES / TIME (dries) | đường trơn: ngã (jweather slip, pregnant = risk of losing the child, OD:L1399); Sắc −small while it lasts |
| **Mưa rào / mưa thu** (WX_KH, sudden burst) | lem vừa→nặng; áo ướt sũng; tóc bết · FACE / CLOTHES / TIME | slip + cảm lạnh (jweather); Sắc − by level |
| **Giông tố** (Hạ) | ướt sũng + lem NẶNG + bùn gấu áo; tóc rối · FACE + CLOTHES + HAIR | slip ×, cảm lạnh ×, sấm làm giật mình → mood Sợ (jemo); pregnancy danger highest; lọng/ô useless at nặng |
| **Gió heo may** (Thu) — and gió lớn when lv ≥ vừa | tóc rối, trâm lệch, áo xốc xếch, bụi bay vào mặt (mặt lấm bụi nhẹ) · HAIR / CLOTHES / FACE | lọng/ô useless at gió lớn; bụi vào mắt: small Sức/mood −; needs a wind LEVEL from C-AG (today wind has no lv) → tell C-AG |
| **Nắng gắt** (Hạ) / ve kêu (heat) | mồ hôi làm phấn trôi nhẹ; má ửng · FACE / TIME | say nắng: Sức − (odds; lọng che lowers); |
| **Nắng vàng** (Thu) | — (fine; no look) | — |
| **Sương sớm** (Xuân) / sương mù | tóc ẩm, vạt áo ẩm nhẹ · HAIR / TIME | tầm nhìn kém: harder to be seen → dò la / mưu kế easier (C-AG owns: tell C-AG) |
| **Tuyết nhẹ / tuyết dày** (Đông) | gấu áo ướt; má đỏ môi tái vì lạnh; bông tuyết vương tóc (nhẹ→nặng) · CLOTHES / TIME (warm up indoors) | trơn ngã, cảm lạnh (jweather); tuyết dày = more; pregnant risk |
| **Sương giá** (Đông) | môi tái, má đỏ vì lạnh (nhẹ) · TIME | tay cóng: hand minigames (cầm, thêu…) worse (C-AG owns hand ceiling: tell C-AG); đá trơn (slip) |
| **Mai nở trong tuyết** / **hoa đào bay** (Xuân) / **lá phong rơi** (Thu) | cánh hoa / lá vương tóc áo — PRETTY, no harm (nhẹ) · HAIR / CLOTHES / TIME | none (OD 17:40Z list: "đẹp, không hại") |
| **Trời quang / đom đóm / trăng rằm / trời âm u** | — | — (âm u = a hint that rain may come; C-AG) |
| **Khóc** (any cause; jemoact) | lem phấn nhẹ→vừa (by how long), mắt đỏ · FACE | mood already moved by the cry |
| **Hắt nước** (harm act → MINIGAME, dodge kit) | ướt áo vừa + lem vừa · CLOTHES / FACE | Sắc − while it lasts; act odds = minigame result (her) / hand band (NPC); evidence: done in person |
| **Hắt trà** (harm act → MINIGAME) | vết trà loang áo + lem vừa→nặng (nóng: má ửng đỏ) · CLOTHES / FACE | as above, a little more Sắc −; nóng = small Sức − |
| **Tẩm mực khăn / quạt mực** (harm act → MINIGAME) | vệt mực trên mặt (nhẹ→nặng) · FACE | Sắc − until washed |
| **Bị xô ngã** (env / scheme; jweather slip, harm acts) | bùn/bụi gấu áo, tóc xổ, trâm rơi · CLOTHES / HAIR | Sức − (exists), pregnant risk (exists) |
| **Cành cây quẹt** (walking in Ngự hoa viên / outdoor places, odds by place) | tóc vướng lá, sợi tóc xổ, vạt áo móc chỉ (nhẹ) · HAIR / CLOTHES | none |
| **Khói bếp / lò than** (Ngự thiện phòng, nấu ăn acts) | mặt lấm muội nhẹ, áo ám khói · FACE / CLOTHES | none |
| **Bùn** (outdoor after rain, Dư đồ walk) | bùn bắn gấu áo/giày (nhẹ→vừa) · CLOTHES | none |
| **Thủy đậu / đậu mùa** (illness, part 1) | nốt đậu trên mặt (st 1–3) · cure | contagion + Sắc − (part 1); đậu mùa leaves a SCAR → removed by a Thái y ointment she must BUY via the existing hủy dung scar cure (j70 scar70 path), no new system |
| Approved acts from dev/design/HARM_ACTS.md | one painted filter each | per the expert list (folded in when the file lands) |

SMUDGE LEVEL per cause (BAL.looks.smu.lvOf): mưa phùn = by lv (mostly nhẹ) · mưa rào/thu = vừa (nặng at lv 3) · giông tố = nặng · tuyết = nhẹ · nắng gắt = nhẹ · khóc = nhẹ (vừa if khóc suốt đêm) · hắt nước = vừa · hắt trà = vừa (nặng on a hit at full strength). Part 1 had 2 levels → part 2 makes it 3 (nhẹ / vừa / nặng) everywhere.
MINIGAMES: hắt nước / hắt trà / quạt mực reuse the slap/dodge minigame kit (aim vs dodge), Thử tay calibration entry per OD 17:10Z; NPC hands from the calibrated bands (cap 95 %).
ART REQUEST list (→ C, after you OK the table): per row above one transparent overlay per level, grouped HAIR (tóc rối/xổ, trâm lệch, tóc ẩm/bết, tuyết/hoa/lá vương), FACE (lem 1–3, bụi, muội, mực 1–3, mồ hôi, má lạnh), CLOTHES (ẩm, ướt sũng, vết trà, bùn gấu, xốc xếch, áo ám khói, móc chỉ) — CLOTHES/HAIR need the body-fit KIT REQUEST (filed in part 1).
