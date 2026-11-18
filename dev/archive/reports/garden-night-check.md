# CHECK garden-night (report only, no code) — session_01UV1SziLuyrJEqfUqguNP1W, for MAIN s41
PRIORITY #1 CHECK ('dự yến'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 · ('tướng quân' / minW): main jmen.js:64 menMinW, j95.js:124, MEN_PLAN.md:21 | review/* none | claims: only this row.
Code read on origin/main f6ee11b. Note: brief names refs/owner-1811-0128-*.jpg, but they are NOT on the handover branch, so I could not see her screenshot.

## Reproduction (headless, built index.html from main, Pixi on, pictures from the CDN)
New game, month 6 tuần 0 (= Hội Phượng, festival `phoenix`, t:[0,1,2] = the WHOLE month), goTo("vuon") at buổi chiều, then nextBuoi() → buổi tối:
- People at Ngự hoa viên, chiều: 6 consorts, Vương gia, Sứ thần, `min: Đại tướng quân · dự yến`, maids.
- People at Ngự hoa viên, TỐI: ONLY `min: Đại tướng quân · dự yến` (S.minW = {"Đại tướng quân":"vuon"}). Same when walking there directly at tối.
That is exactly what the owner saw: a general standing alone in the inner garden at night, at a "banquet" that is not there.

## Q1 SCENE LIGHT — art complete, code picks the night painting; NOT reproduced
- Rule: KIT §56 (jsl.js) — every scene is a per-buổi painting `<name>-<mùa>-<buổi>` (sang/trua/chieu/toi); j12 draws no buổi wash any more.
  Picker: j94 `sceneImg` + `SCN_VAR` (fallback: tối only takes tối; day buổi take nearest day). Applied by wrapping renderStage / evArt / pxScene.
- Art on the CDN (all 16 = 4 mùa × 4 buổi each): duong-tam-dien, khon-ninh-cung, kinh-su-phong, lanh-cung, ngu-hoa-vien, ngu-thu-phong, phi-tan-cung,
  tam-cung-dem, thai-y-vien, tu-ninh-cung, tan-gia-kho, phong-cung-nu (j94) + cung-nhan, thuong-thu-phong, a-ca-so, dong-cung (jplx). Residences: jres sets SCIMG.home/rv per palace.
  I downloaded ngu-hoa-vien-{xuan,ha,thu,dong}-{chieu,toi} and looked: every tối picture is a clear moonlit night (mean luma 85–100 vs chiều 129–155).
- Runtime check (DOM `#scimg` AND Pixi `PX.bgSrc` texture): chiều → ngu-hoa-vien-ha-chieu; after nextBuoi (no manual render) → ngu-hoa-vien-ha-toi on both layers; direct arrival at tối → -toi. Summer sun rays/motes are off at night (jfx kfSeCfg).
- Verdict: no missing art (not a C job) and no reproducible picker bug on the place stage. Candidates if her screenshot shows otherwise:
  (a) an EVENT/person card picture (evArtOf = fixed ev-* paintings, not per buổi) — would be a separate known family;
  (b) Dư đồ list tile for "home" uses the bare `tam-cung-dem` (j9:85), not the buổi variant (minor, not the garden).
  → MAIN: send me / the fix worker her 01:28 screenshot before opening any Q1 work.

## Q2 HISTORY (expert, general knowledge; Qing first, Ming where the game borrows names)
- Ngự hoa viên (御花园) is the north end of the INNER court (内廷), behind Khôn Ninh cung — i.e. hậu cung ground. The Qing kept a strict 内外之防 (inner/outer
  separation): outer officials worked in the outer court; even the Grand Council sat outside Long Tông môn, and ministers summoned to the Emperor at
  Dưỡng Tâm điện were led in and out by eunuchs. An official/general in the inner garden by day: only with the Emperor, on his summons, escorted; with consorts present: they withdraw (回避).
- At night: no. At dusk the inner gates were locked by eunuchs (the "下钥 / 下钱粮" lock-up ritual, palace rules in 《国朝宫史》 and 《钦定宫中现行则例》);
  no outside man stayed in the inner court overnight; the night watch inside was eunuchs, imperial guards patrolled outside the inner gates.
- Festival banquets with officials were in OUTER halls (Thái Hòa / Bảo Hòa điện); Càn Thanh cung "家宴" was family only; Trùng cửu in Ngự hoa viên
  (climbing Đôi Tú sơn) = Emperor + consorts, no officials. A general's festival banquet never happened in the inner garden, least of all at night.
- Princes: adult princes lived outside; visiting their mother needed permission and an escort; consorts other than the mother avoided them.
- What a consort did on meeting an outside man: turn aside / withdraw, her maids and eunuch stand between (fan, screen), the eunuch asks him to leave or
  calls the gate eunuchs/guards; a man who had no business there was reported (in the dramas: guards seize him; discipline via Thận hình ty / Ming Cung Chính ti).
- Dramas: guards (thị vệ) inside the palace are normal escorts (Phó Hằng, Hải Lan Sát in Diên Hi công lược; Lăng Vân Triệt in Như Ý truyện), and any
  consort seen alone with a man at night becomes a 私通 scandal (Như Ý truyện uses this repeatedly) — the same logic the game's MEN_PLAN already has.
- So: the game's own rule is right (jmen menZone: vuon = Hậu cung, "nam nhân không được vào, trừ Hoàng thượng, thái giám, thái y hay thợ có lệnh");
  the scheduled official breaks that rule.

## Q3 GAME — who puts outside men where
| source | who | where / buổi | night? |
|---|---|---|---|
| jmen menMinW (jmen.js:64) | 2 officials (j55 houses incl. Đại tướng quân) | thu, buổi sáng (chầu) | no |
| jmen menMinW | 1 official, "dự yến" | **vuon, every buổi > 0 of any festival day incl. TỐI** | **YES — BUG** |
| jmen menSched | Vương gia | vuon on festival day if !night; tn sáng every 4 tuần | no |
| jmen menSched | Sứ thần | thu sáng by turn; vuon on festival day if !night | no (but a foreign envoy in the inner garden is also unhistorical) |
| jmen menSched | thị vệ (4 named) | duty thu/dtd/ksp by roster | yes, nội đình only |
| jmen menSched | thái y / nhạc sư / họa sư | tyv; sick consort's palace chiều; work orders sáng/chiều | no |
| jmen menPlans (strays) | lovers, letter guards, overstaying craftsmen, admirers | vuon / lc / her palace, mostly tối (by design, rare) | yes, as hidden strays |
| j95 j95ppl (j95.js:124) | reads S.minW → registry "min" | same as menMinW | inherits the bug |
Festival length makes it worse: `phoenix` (Hội Phượng) has t:[0,1,2] → the general stands in the garden every trưa/chiều/tối for a whole month.
- Acts she has toward them now: official on stage (kind "min") → only "Chào hỏi đúng lễ" (+favour). Stray man (w:"stray") → event card menCard:
  **Báo thị vệ · Báo Cung Chính ti · Làm như không thấy · Giấu giúp · Núp nghe lén** (+ "Uy hiếp hắn" later). Outer-court card: "Hỏi thái giám tin ngoại triều".
  So "gọi lính canh" ALREADY EXISTS (as Báo thị vệ / Báo Cung Chính ti) — but only for strays, never for a scheduled official.

## RECOMMENDATION
BUG now (owner-bug lane, one worker, whole family):
1. jmen menMinW: the festival official must not be in the hậu cung at night — best per history: no official in `vuon` at all (move the banquet official to an
   outer/nội-đình place, e.g. thu, or drop him), at least never at B4L. Same family: Sứ thần at vuon on festivals → same move; Vương gia at vuon by day may stay (family festival).
2. Festival-day presence must follow the festival's real day, not a 3-tuần span (phoenix): check every `menFestOn()` user (menSched, menMinW).
3. j95 registry + stage caption read S.minW, so the fix in one place covers stage, map count, countAt (j59:383, jmen:101) — re-run dev/test/stage-caption.js and the bot dev/measure/men.js.
4. Test to add: every place × 4 buổi × festival on/off → no "min"/"man" (non-stray) in zone hc at B4L.
PARKING_LOT (freeze OD:L1402): a "Lánh mặt / sai thái giám mời ra" act toward a lawful outside man in the hậu cung (by day), and "Báo thị vệ" for a lawful-but-wrong-place man. Not needed once the bug is fixed.
Q1: no work until MAIN gets her screenshot (art and picker are fine).
