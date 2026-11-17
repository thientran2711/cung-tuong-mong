PRIORITY #1 CHECK ('makeup levels xa xỉ luxOf taste'): OD L1638 (owner 15:35Z, verbatim) + ORDER main s33 15:40Z | ledger 0 | claims B makeup-lux (this) | main bbb3b4ca: jinv.js luxOf/luxAllow (the ONE total), jlux.js luxVerdict/luxRange/luxExtra, jtoil.js TOIL_MK/toilLookOf/toilFx, jmkt.js taste (tone per person), jts.js tsDressPts, jne.js NE.toil; jdress.js ACT.xx 'Tố xa xỉ' | review/* review/toil-looks2-r5 (base, art untouched), review/makeup-theme-r1 (live, reused). Nothing rebuilt: every change sits in those functions.

# makeup-lux — review/makeup-lux 43bbe87b0 (contains review/toil-looks2-r5 97f57862 + origin/main 7e0250ec; toil-looks2 NOT yet on main when reported) (opus worker, Foreman B)
START_CTX ~6% of the window.

## What (owner OD L1638, her words are the spec)
1. **Diêm dúa dropped as a LEVEL.** `TOIL_MK` = five levels (Mặt mộc, Vụng về [art A/B unchanged], Đoan trang, Kiều diễm, Khuynh thành = max). `toilLookOf(P,score)` no longer rolls an overdone look; the heaviness machinery that only fed it is removed (BAL.toil.heavy / presetDiem / mixH / showyH / cakeH / allow / diemOdds / play.cake* / allowRk, `toilHeavy`, `toilAllow`). The bold preset group "Kiểu cầu kỳ" stays (taste / contest want) and previews at the Khuynh thành look. TOIL_MKS.diem / TOIL_LOOKS.diem art data left untouched (toil-looks2's art; no longer drawn).
2. **Each level shows beauty + xa xỉ**, one BAL key per level: `BAL.toil.lv[level] = {dep, lux}`, text prints the keys. Kit only: `toilLvChips(k)` = `kitChip("Dung nhan N","n")` + `kitLuxChip`; `toilLvRows()` in `kitRows`. Shown: (a) the mirror colour step — the five-level ladder; (b) the result card — row "Mức điểm trang" + row "Cả bộ hôm nay" (`kitLuxChip` of the ONE total + verdict word); (c) the reveal card — row "Mức điểm trang". No KIT REQUEST needed.
3. **Xa xỉ judged only at events, as ONE total.** `luxOf(p)` (jinv, + jpet pet) gains today's makeup level's lux (wrapper in jtoil, `toilMkLux`): her own sitting, the co-op friend's synced sitting (`p.toilette`), an NPC's raw roll (`TOIL_NPC0`, no recursion with jlux's toilNpc wrapper). No second formula: every event reader of luxOf counts the face the same way. The month tick passes `luxOf(p,{noMk:1})` (clothes only). The event why-line prints "Xa xỉ N, son phấn M, giữa dịp …".
4. **Taste = each person's own** (jmkt, same system as the liked tone): `toilLvTasteOf` — by nết first (`BAL.toil.taste.lvTrait`, consorts; Thái hậu / Hoàng thượng by name hash), else hash (`lvLike`); liked level +1, two steps away −1 (`lvReact`); known → on the card (toilFx why), unknown → one surprise popup then learned (`toilLvTasteSurprise`, same toilReact); Hoàng thượng's "Điều ngài thích" gets a "Dung nhan" row (filled before discover).
5. **"Diêm dúa" = a reaction word only**: `luxVerdict` returns v `diem` (word "diêm dúa", `TOIL_DV.diem`) when the ONE total ratio > occasion ceiling × `BAL.lux.diem` (1.3); consequences = phô trương's (luxExtra Đức, reputation) + the host's existing `BAL.toil.react[kind].diem` row; reaction lines (th/hh scold, emp-dislike, slip "diem" pools, rival tease) fire on that verdict on a made-up face.
6. Hội phối đồ: `tsDressPts(p,pick,th,mk)` adds the face's lux into the outfit total (her + every rival, same way); contest makeup points = `lv[level].dep − lvBase` (bare face `taste.pts.moc`).
7. Found + fixed (same family): jne night-end read `NE.toil[t.makeup]` (a boolean key → never counted); now `sign(lv.dep − lvBase)` (same values as the old table: +1/+1/0/−1/0).

## Levels table (BAL.toil.lv; lvBase 2)
| level | name | dep (Dung nhan) | lux (Xa xỉ) | contest pts (dep−2) | night end |
|---|---|---|---|---|---|
| moc | Mặt mộc | 0 | 0 | pts.moc −3 | 0 |
| vung | Vụng về (A/B art) | 1 | 6 | −1 (was −2) | −1 |
| vua | Đoan trang | 2 | 6 | 0 | 0 |
| dep | Kiều diễm | 3 | 12 | +1 | +1 |
| tuyet | Khuynh thành (max) | 4 | 20 | +2 | +1 |
Scale: allowance 36 + 16 × rank (57 at rank 0 here incl. base WD lux, 264 at rank 6); one piece 8–64+. Khuynh thành at Đáp ứng ≈ a third of the allowance, at Quý phi a few %: low ranks overdo sooner (the old rank shift, now through the one total).

## Event family (every luxOf reader)
| reader | kind | before | after |
|---|---|---|---|
| jlux luxVerdict (thỉnh an / yến / lễ / tang / edict / lãnh cung; toilDress) | event | clothes+pet | + face; new verdict `diem` |
| jlux luxExtra / aaThieuLeApply rep / serveTH NPC extra | event | photruong/vuot | + diem |
| jlux toilNpc wrapper (NPC dress verdict at Thái hậu) | event | clothes | + face (raw roll) |
| jaudit leAttire (thiếu lễ / showy / overRank) | event | clothes | + face |
| jaudit aaThieuLe0 (too plain) | event | clothes | + face |
| jts tsDressPts (Hội phối đồ, her + rivals) | event | 4 pieces | + face |
| jdress dressRec / xxAccuse (Tố xa xỉ) | event | — | + face automatically; NOTE jdress.js is NOT in assemble.py (ACT.xx not live on main) — not wired here, flag for B |
| jinv kitLuxChip (Tư trang), jwdinv chip, jitd item detail "Bên mình N → M", jtoil dress step | display of the total | clothes | + face (the same total) |
| jinv luxMonth, jlux luxRepTick, luxMonthX (edict month) | month tick | clothes | clothes only (`{noMk:1}`) |
| jlux luxRange / luxThemeRange / luxGift | allowance only | bud | unchanged |

## Taste table (BAL.toil.taste)
| who | liked level |
|---|---|
| nết Khiêm nhường / Ân cần / Kín đáo | Đoan trang |
| nết Kiêu ngạo / Tham vọng | Khuynh thành |
| Hoàng thượng, Thái hậu | name hash (like the liked tone: their traits are not one world value on both co-op seats) |
| anyone else | hash: <.25 Đoan trang, <.5 Kiều diễm, <.75 Khuynh thành, else none |
react: same level +1, ≥ 2 steps away −1 (Vụng về sits below Đoan trang), inside the ONE toilFx judgement, capped by BAL.toil.cap.

## Old-save map
`TOIL_OLDLV = {diem:"tuyet"}` — her words "khuynh thành chính là diêm dúa luôn rồi"; one map read by `toilMk` and `toilLookRec` (face layer). Test: a save with `toilette.look:"diem"` loads, chip "dung nhan Khuynh thành", face layer tuyet, xa xỉ 20.

## Co-op
Friend's face lux = her own synced sitting (jcoopworld LOOK carries toilette); both seats compute the same total; coop-toil-look checks the face + mkLux equal on both seats. NPC values are hashes (no Math.random). The friend's tastes are judged by HER known tastes (mkKnow synced in jcoopworld LOOK), so both seats add the same taste rows. No real-time rule.

## Tests
All on 43bbe87b0 unless noted:
- quickcheck PASS 163 s (core gates PASS: one-core-guard (no growth), one-core-text, one-core-bind, rules-one-source, kit-conform, coop one-world; old save ok; perf render 178/198 ms vs live).
- NEW dev/test/makeup-lux.js — Fold 755x1000@2 + iPad 1180x820@2 PASS: levels, chips, luxTotal (5 levels), npcFriend (NPC raw roll + co-op friend), diemWord (photruong just above, diem > hi×1.3, Thái hậu's why names "ăn vận diêm dúa (Xa xỉ 40, son phấn 20 …)"), month tick clothes only, oldSave (diem → Khuynh thành), contest, lvTaste (nết, ±, known on card, Emperor row), ladder, result, event.
- makeup-theme PASS (updated: five names, rank via luxAllow). luxury PASS (2b edict accepts diem). toil-react, toilette, toil-tease, voice-band, voice-trait-b, voice-pool-sim PASS. player-dress all PASS.
- coop-toil-look 29/29 (updated: old diem face reads tuyet on both seats + face xa xỉ equal). It first showed 8 parity FAILs: the friend's tone/level taste counted always on the other seat but only when known on her own → fixed for the whole taste family (her mkKnow rides jcoopworld LOOK; toilTasteKnown/toilLvTasteKnown(host, who)). coop-e2e 63/63.
- makeup-theme-bot (dev/measure): skilled+scouted 4.47 > random 1.2 > bare face −4 (Khuynh thành 27% vs 14%).
- dress-offence: crashes on base too (ACT.xx undefined: jdress.js is not assembled) — pre-existing, not touched.

## Shots (outside git; looked at)
Fold 755x1000@2 + iPad 1180x820@2: mirror ladder, made result, Thỉnh an Thái hậu event (diêm dúa verdict). CDN img/_review/makeup-lux/ (6 jpgs: mlux-755x1000-{1-ladder,2-result,3-event}.jpg, mlux-1180x820-…); verdict giver wipes it.
Note for B (not mine): on iPad the reaction popup option cards are cramped (title wraps under the "an toàn" chip) — existing toilReact layout.

## Numbers / one core
New keys: BAL.toil.lv, lvBase, taste.pts.moc, taste.lvTrait/lvEmp/lvLike/lvReact, BAL.lux.diem. Removed: toil heaviness keys, allowRk, NE.toil, taste.pts.lv.
