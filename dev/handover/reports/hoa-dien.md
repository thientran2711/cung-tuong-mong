# hoa-dien — report (worker session_01N1tNP6SdCcvsQaB11nruyu, opus BIG)

PRIORITY #1 CHECK: OD L152/L1104/L1451 + OD tail '(17/11 ~17:30Z real' + '(17/11 ~17:45Z real' + 17:10Z Thử tay (read verbatim) | main j92.js:76 'Hoa điền bạc khảm lưu ly' (was a trâm; REUSED, moved into the new slot), jtoil makeup flow (REUSED: one more phase on the same mirror), kg82 minigame kit (REUSED: KG82_KIND/KG82_ENG, kg82Btn, kg82Pop), jlux luxTotal (REUSED: no second score) | review/* review/makeup-lux (base, stacked), review/ag-all-2 jmgcal/mgHand (used when present, not merged) | claims: this session only.

**SẴN SÀNG KIỂM fa483a8ed** — branch `review/hoa-dien` (stacked on review/makeup-lux 7c6ef2fda = main b5d109fe). START_CTX ~6 % (1M window).

## What it does (owner's words in OD tail 17:30Z / 17:45Z)
1. **Item (ONE table).** j92 `WD_LIST` gets slot `"hd"`: 8 tiers, one per phẩm — P1 Hoa điền mai trắng · P2 hoa đào · P3 bạc khảm lưu ly (the existing item, moved from "tram") · P4 hồ điệp · P5 lá lan phỉ thúy · P6 liên hoa hồng ngọc · P7 mẫu đơn điểm thúy · P8 kim phượng. Motifs only flowers/leaves/butterfly/phoenix (OD:L1104). Kind name "Hoa điền" everywhere through ONE helper `wdSlN(sl,i)` (family fix: jwdinv bag/panel/acts, jitd kind + pick acts, jkrev, j92 IT kd). Never worn via the wardrobe (`wdWear`/`wdWearEntry` refuse "hd"; no Cài/Mặc button for it); bag tab "Trang sức".
2. **Getting one.** Shop restock (`BAL.hd.shop` %), NPC consorts hold one (`BAL.hd.npcHave` %, once) → they gift it by the existing j8 gift rule (tg "rv"), found (`BAL.hd.find` %/month, log line), **+1 per promotion** (her + NPCs; text appended to the promotion line).
3. **Makeup step (new phase after the lips, same mirror canvas, jtoil → `hdStep`).** Pick one of hers (kg82Btn list with grade + xa xỉ, or "Không dán") → **drag** (relative drag: the finger never covers the target) + **tilt** (Nghiêng trái / Nghiêng phải, `BAL.hd.rot`°) → Dán. It comes off the tray tilted (`BAL.hd.a0`, hashed per day). No clock → nothing rewards speed.
   Score `hdQ(d,a,sk,lvF)` = `wD·(1−d/(tolD·tf)) + wA·(1−|a|/(tolA·tf))`, d = distance to the forehead anchor / eye distance, a = tilt vs the eye line, tf = skill (`skTol`) × board ease. q becomes makeup part **hd** in `toilRaw` (new ONE weights table `BAL.toil.w` — the .4/.3/.3 typed in 3 places is gone); weights normalise over parts present, so a day without a hoa điền scores exactly as before. A miss still counts (lower q, never skipped). Result card row "Dán hoa điền N/100 · <name>".
4. **NPCs, her auto-bot, contest rivals, mesh-timeout fallback** — `hdNpc(v,h,sk)`: her best hoa điền for her phẩm (Kiêu ngạo/Tham vọng one above), q from her hand (ag-all-2 `mgHand("hoadien",v)` when it is in, else `BAL.hd.npc`), hashed per person per day (both co-op seats agree), **cap `BAL.hd.npcCap` .95**.
5. **Xa xỉ.** The placed one's `wdLux(k)` goes into `toilMkLux` → `luxOf` → `luxTotal` (ONE total); `luxParts(p).hd` = its share **inside** `mk` (parts still add up).
6. **Thử tay.** `KG82_KIND.hoadien` + `KG82_ENG.hoadien` (same board, same hdQ, reads `env.lv` via `BAL.mgTier.lev.hoadien.tol`) → listed by ag-all-2 `mgCalKinds()` automatically once ag-all-2 lands (test checks that exact filter).
7. **Forehead anchor.** From the face mesh (img/mk-fit): brows' inner ends, raised `BAL.hd.up`·eye distance perpendicular to the eye line; target angle = eye line. A per-face table from Foreman C (`window.HD_ANCHOR[file]`) wins when it exists. Sits where the painted hoa điền sits today (checked on 3 faces).
8. Old saves: a hoa điền worn in the old Cài tóc slot goes back to the chest, default trâm restored (wdOf wrapper); jwdinv old-save migration skips "hd".

## WAITING ON FOREMAN C (art; FOREMAN_C_STATUS 17:32Z question still unanswered at 18:35Z)
- Painted hoa điền on portraits **NOT hidden** (C has not said it is a separate layer) → the placed one sits over the painted one until clean foreheads exist.
- ART REQUEST (please forward to C): (a) 8 transparent forehead sprites `img/hd-<key>.webp` (keys hd-mai, hd-dao, hoadien-bac, hd-diep, hd-lan, hd-sen, hd-maudon, hd-phuong; flower/leaf/butterfly/phoenix only, small like the approved 8.5 % size) — until then the item picture is placed (code falls back automatically); (b) 7 item icons `img/wd-hd-*.webp` (bag/shop show no picture for the 7 new items until then; `item-pics.js` will list them); (c) clean foreheads + optional per-face anchor table.
- No KIT REQUEST: only existing kit parts (kg82Btn, kitRows result rows, kg82Pop, KIT_GRADE).

## Tests (all on fa483a8ed / its build)
| test | result |
|---|---|
| `node dev/test/hoa-dien.js <dev/index.html> 755x1000@2` (mouse) | 29/29 ALL OK |
| same, `TOUCH=1` Fold 755x1000@2 (CDP touch drags + taps) | 29/29 ALL OK |
| same, `TOUCH=1` iPad 1180x820@2 | 29/29 ALL OK |
| toilette.js 755x1000@2 (old makeup flow) | OK, errs [] |
| makeup-lux.js 755x1000@2 | fail [] errs [] |
| luxury.js | all PASS, no page errors |
| coop-toil-look.js | 29/29 |
| coop-e2e.js | 63/63 |
| minigames.js kinds hoadien,chai | both done, no overflow |
| one-core-guard / one-core-text | PASS / PASS |
| kit-conform 755x1000 | 102 CONFORMS / 3 MISSING (base makeup-lux: 101 / 4 — same unreachable cases place:etq, contest, cold-palace) |
| quickcheck.sh | open 1321 ms · old save OK · perf ≈ live · **G1 "frozen list grew 3843 → 4957" = INHERITED from review/makeup-lux (its baseline is 4957, this branch does not touch one-core-baseline.json)** — clears when makeup-lux merges main d5ea786d+ |
Shots (look at locally, not committed): pick / place / result at Fold + iPad checked by me: face in the glass, buttons fit, no overflow.

## Notes for the reviewer
- Merge of newest main 03a776e4 NOT done here (shallow history → many conflicts); it comes through makeup-lux.
- `TOIL.hdLbl` = board label of phase 3; `HD.peek()` = test oracle (anchor / sticker / angle in client px).
- Numbers: all in `BAL.hd` (jhd.js top) + `BAL.toil.w`; texts print no typed amounts.
- Report "~X% xong": item + step + NPC + Thử tay + lux done; art (sprites, icons, clean foreheads) pending C.

## r2 — FIX ORDER MAIN s36 (owner OD 17/11 ~21:03Z): shown hoa điền always at the forehead anchor
PRIORITY #1 CHECK: OD 17/11 ~21:00Z + ~21:03Z (read verbatim) | main none | review/* review/hoa-dien-r1 67b18b1e (base, reviewer's tolD .24 / mkLv 2 / sprite fallback KEPT) | claims B hoa-dien (this session).
**SẴN SÀNG KIỂM 7907c543d** — branch `review/hoa-dien-r2` (on r1 67b18b1e).
- **One layer, every view**: `hdFaceLayer(p,file)` joins `kitFxLayers` (the hook every portrait / stage figure / avatar / reveal / podium uses, like the makeup colour layer) → her, NPCs, co-op friend alike. Painted once per (picture, hoa điền, vụng) into a transparent canvas of the picture's size, ALWAYS at that picture's forehead anchor (`hdAnchor`: face mesh; `window.HD_ANCHOR[file]` wins when C delivers per-file mark centres), size `BAL.hd.size` × face width, rotation = the face's eye line. A picture without face points shows none (never guessed).
- **vụng** = q below `BAL.toil.fail` (the SAME cut that makes any makeup part vụng; `hdVung`) → fixed tilt `BAL.hd.vungA` (9°), still on the anchor; good → straight. The mirror board snaps the sticker to the anchor (straight / vụng tilt) right after Dán; pop text "ngay ngắn / hơi lệch / Dán vụng mất rồi".
- **Praise / criticism**: a vụng hoa điền is a makeup slip like brow/powder/son (`toilLookOf` part `hoadien`) → look Vụng về, tease lines `TOIL_SLIP.{th,hh,emp,rival}.hoadien` (tone pools `toilSlip:<who>:hoadien` not written yet → the one-liners are the fallback, same as before tone pools existed). Score + lux unchanged (part hd of `toilRaw`, wdLux in luxTotal).
- **Anchor height**: brow inner END on the brow centre line (mean of the 2 contour points nearest the midline) + `BAL.hd.up` .12 × eye distance (was .25 over the upper contour → sat ~½ eye-distance above the painted mark). Checked with mesh dots on 5 faces.
- **Sprites**: C's 8 sprites `img/hd-<key>.webp` are live on the CDN (200) → used directly; r1 fallback stays for safety.
- **FOUND (pre-existing, not this branch; for C / main)**: on some stage figures the face mesh `img/mk-fit/<face>.json` no longer matches the picture (seen on fig-consort-c06 / c02 / c10 *-tcold-a18: mesh eyes ~⅓ eye-distance right of the painted eyes; c13 / c27 / c31 / c14 match). Every mesh layer (makeup colours, blush, and now hoa điền) sits off on those pictures. Fix = re-run dev/art/mkfit/mkfit.py on repainted figures (or C's HD_ANCHOR mark centres for hoa điền).
Tests (7907c543d build): hoa-dien.js **34/34** Fold mouse · Fold touch · iPad touch (new: snap to anchor straight / vụng tilt, layer painted on stage + header, vụng look, NPC layer); toilette OK errs []; coop-toil-look 29/29; one-core guard / text / text-rule / bind PASS. LOOKED: Fold + iPad close-ups good vs vụng (stage + header).

## r4 — REBASE ORDER Foreman B 23:13Z: onto makeup-lux r2 PASS (review/makeup-lux-r2v 0e6489f6) + newest main
PRIORITY #1 CHECK: Foreman B order 23:13Z | main eb3675a6 | review/makeup-lux-r2v 0e6489f6 (base), review/hoa-dien-r2 98954903a (source) | claims B hoa-dien (this session).
**SẴN SÀNG KIỂM cb376b6e0** — new branch `review/hoa-dien-r4` = 0e6489f6 + the hoa-dien commits cherry-picked (r0 item/step/NPC/Thử tay, r0 follow-up, ITEMS.md, r1 reviewer tune tolD .24 / mkLv 2 / sprite fallback, r2 anchor + vụng tilt + slip, r3 BAL.hd.npcShow) + `edFw` comment back on its own line + merge origin/main eb3675a6 (only index.html / sw.js conflicted → main's, then site rebuilt). Nothing depended on toil-looks2-r5; the only real conflict was jtoil toilFinish rows (kept makeup-lux r1's rows, re-added "Dán hoa điền") + assemble.py list (main's + jhd.js).
Gates (cb376b6e0 build): quickcheck **PASS** (core gates PASS — the old G1 3843→4957 is gone; open 1351 ms, old save ok, perf ≈ live) · hoa-dien.js **35/35** Fold mouse + iPad touch · toilette errs [] · makeup-lux fail [] errs [] · coop-toil-look 29/29 · one-core guard / text / text-rule / bind PASS · kit-conform 101 / 4 MISSING (same unreachable cases as base).
LOOKED: Fold + iPad mirror right after Dán — good = straight at the forehead anchor, vụng = 9° tilt + "Dán vụng mất rồi"; stage (iPad): her figure carries it, NPCs none (test: NPC consort portrait layer empty while npcShow 0).
