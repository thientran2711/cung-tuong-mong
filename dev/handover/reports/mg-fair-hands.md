# mg-fair-hands — worker report (opus, child of C-AG #25; MAIN ROOT-72 order) — HOLD (owner OD 20/11 ~01:42Z: lands only after her full calibration + ratio OK)
PRIORITY #1 CHECK: OD 20/11 ~01:10Z + ~01:18Z (thirds) + ~01:42Z (every split number a knob, HOLD) + ~01:50Z (upbringing replaces rank) — canon overwrite of OD 17/11 ~16:20Z (f) | main jmgt.js:87 mgHand skew, jmgcal.js mgCalBand up/dn, jbal2.js BAL.ag.mg2.hand {lo,hi,w,skew} + cal {up,dn,min,max} | review/* none on this topic | claims: this row only
START_CTX ≈ 6 % (1M window), depth 4. Branch `review/mg-fair-hands` from LIVE 72f7c0c5.
**Head b4b5999** (site build) on code **5bf7d64**, merged LIVE origin/main 7292287 (683ee9c). Earlier passes on the same branch (overwritten in place by the owner's updates): 78d5bee ±2.5 half/half → 3960cb1 thirds → 25b6fcf upbringing table + split knob → 5bf7d64 upbringing from the existing ORIGINS art (MAIN relay, no new table).

## What
1. **Thirds base** (OD ~01:18Z "1/3 ngang, 1/3 hơn, 1/3 kém"; jmgt `mgThird`, `mgBand` / jmgcal `mgCalBand`): centre = her calibrated base b + w/2 (an NPC's average play = hand − w/2; a kind she has not tested: the skilled human median `mgMedD(0)` = 7.5). A hashed draw puts each NPC in a third by `split` [worse, equal, better] (default 1:1:1): equal = centre ± eq (0.5); better = centre + eq … + far (2.5); worse = mirror; bell-shaped inside each third (mean of 2 hashed draws). Saved per person per kind (p.mgH); old saves re-roll (band sig now `t/lo/hi`).
2. **Art lift** (jmgt `mgHandEff`): + art (0.2) per art level of that kind above / below HER level — on top of the board ease the NPC's level already gives (≈ 0.8 / level; 0.5 was tried: ±2 levels → 96 % / 5 %, too steep).
3. **Upbringing** (OD ~01:50Z "tiểu thư khuê các … vào cung đã giỏi mà, chỉ có nhà nghèo mới yếu"; MAIN relay: read the EXISTING origin stats, no new table): a person's art level for the lift AND for her own board = max(her own level, her origin's start bậc for that kind from j1 ORIGINS / ORIGIN_BR `art:{…}` — tt cam 1, cn y 2, nc / bd vu 1, td / thd thi 1) (jmgt `mgOrgLv`). Her own arts already hold her start bậc, so the NPC now gets the same. Origin key `mgOrgOf`: S.origin; consort v.nr.o / v.ag.o / jagent agOrg (saved, host only); servant "srv" / unknown = none. **Rank gives no skill** (old rank knob deleted).
- Art / upbringing read live (not saved), measured against the seat-a player (`mgRefP`: S; co-op guest → the host's person) so both seats roll the same play. No player-visible text or UI change (contest odds words stay on the ladder via oddsCl) → no shots.

## Knob table (ONE CORE: `BAL.ag.mg2.hand` in dev/build/jbal2.js, one line — main retunes after her real-life rating)
| knob | default | meaning |
|---|---|---|
| split | [1,1,1] | weights of the thirds [worse, equal, better] (1:1:1 = 1/3 each; e.g. [1,2,1] = half about equal) |
| eq | 0.5 | half-width of the "about equal" third (hand points round her) |
| far | 2.5 | outer edge of the better / worse thirds (band = centre ± far) |
| w | 4 | how far under her ceiling a play falls (average play = hand − w/2) |
| art | 0.2 | hand points per art level above / below hers (board ease ≈ 0.8 / level comes on top) |
| (ORIGINS art) | j1.js / jorigins.js `art:{…}` per origin | upbringing start bậc (tuned there at the ratio step, per MAIN) |
| (cal.k) | dan b 8.3 | her calibrated base per kind (dev/tools/mgcal_apply.py) |
Deleted (law 14): hand lo / hi / skew, cal up / dn / min / max, first-pass sp, rank, the interim up table.

## Whole group (law 11) — every reader of the hand (`grep -n "mgHand\|mgCalBand\|mg2.hand" dev/build/*.js`)
| place | before | after |
|---|---|---|
| jmgt mgNpcRaw (every NPC mini-game play: j71 contests + odds, j82 rivals, jexam, jts summons/lanterns, j83 works, j85 lessons) | ceiling = skewed hand | ceiling = mgHandEff (thirds hand + art lift on max(own, origin start bậc)); board lv = the same max |
| jslap slapNpcDraw (tat) | heavy × (hand−lo)/(hi−lo): table = best hand, all others weaker | f = (eff − centre)/far ∈ −1…1, symmetric: middle hand = table |
| jhd hdNpc (hoa điền) | q mean = hand/10 (ceiling read as mean) | q mean = (eff − w/2)/10 = her average play |
| jmgcal mgCalBand | b+w/2+1 … b+w/2−4 (strong rare) | thirds round b + w/2 |

## Measure (dev/measure/mg-fair-hands.js; contest board occ hoi; her win share %)
**A — thirds, average untrained NPC set** (art 0 = hers, her origin, same rank; 1500 NPCs × 6 plays)
| kind | third | share of NPCs | her win |
|---|---|---|---|
| dan (b 8.3) | worse / equal / better | 34.6 / 32.2 / 33.2 % | 89.5 / 48.7 / 10.2 |
| co (untested → 7.5) | worse / equal / better | 33.9 / 32.1 / 34.0 % | 89.3 / 50.0 / 11.1 |
**B — upbringing × own art step** (her: thd, art 2; NPC own level = 2 + step, floored by her origin's start bậc; 600 NPCs × 8 plays per cell)
| kind · origin | art −2 | −1 | 0 | +1 | +2 |
|---|---|---|---|---|---|
| dan · tt (cam 1) | 72.6 | 72.9 | 50.3 | 29.6 | 14.6 |
| dan · cn / thd / cnv (no cam) | 89.1 | 72.7 | 49.7 | 29.6 | 14.5 |
| huong · cn (y 2) | 48.0 | 47.1 | 47.9 | 27.5 | 13.1 |
| huong · tt / thd / cnv (no y) | 88.1 | 70.8 | 48.3 | 27.4 | 12.9 |
| co · any (no origin gives ky) | 87.4 | 70.0 | 48.5 | 29.3 | 14.5 |
Reading: an untrained noble-born / maid-born NPC enters at her origin's start bậc in that art (tt strong at đàn, cn at hương), the poor-born start at 0 and rise only through palace levels. With today's ORIGINS values the upbringing shows only in the arts each origin lists (cam / y / vu / thi); e.g. dtq, ch, muoi give none — **MAIN: tune the bậc in ORIGINS at the ratio step** if the owner wants a wider "khuê các" edge.

**C — as she climbs** (her at rank r, art 2, origin thd, vs the consorts of rank r over 20 fresh courts)
| rank | consorts | their mean art (dan) | her average play on her board (dan) | her win dan / huong / co |
|---|---|---|---|---|
| 0 | 40 | 0.9 | 9.0 | 70.6 / 74.3 / 73.4 |
| 1 | 40 | 0.9 | 8.6 | 69.5 / 83.1 / 78.5 |
| 2 | 20 | 0.8 | 8.3 | 78.1 / 79.5 / 78.0 |
| 3 | 40 | 1.1 | 7.9 | 72.2 / 83.5 / 79.5 |
| 4 | 20 | 1.1 | 7.5 | 60.0 / 86.6 / 80.2 |
| 5 | 20 | 1.1 | 7.0 | 78.8 / 72.6 / 81.1 |
| 7 | 20 | 0.8 | 6.2 | 75.3 / 78.0 / 77.1 |
(her win > 50 % here only because she is art 2 against fresh courts of mean art ≈ 0.5–1.)
**Finding for MAIN (not changed here, outside the brief):** law 5 holds through HER board (her average play falls 9.0 → 6.2 as she climbs), but NOT through "who she meets": in fresh courts origins are spread evenly over ranks (tt×5 at rank 0, tt×4 at rank 7) and art levels do not rise with rank, so higher-rank consorts are not stronger. If the owner wants "high ranks mostly noble-born", the lever is the court generator / origin roads (BAL.nroad.org, BAL.ag.org by clan) or promotion weighting by arts — a separate order.

## Tests (on 25b6fcf / 2548e06)
- NEW dev/test/mg-fair-hands.js (15 checks): thirds 30–37 % each (dan + co), middle NPC = her ±0.3, symmetric, bell inside a third, split [1,2,1] → half equal (one knob), no old keys (skew/sp/rank/up/lo/hi), art lift = BAL.art, equal NPC wins ≈ 50 %, upbringing from ORIGINS art (tt cam 1 plays clearly above her thd on dan; cnv = her; own level above the start counts as is), rank alone = no lift, family reads mgHandEff, old-save re-roll, S never gets a hand, no page errors.
- ag-mgh 10/10, ag-mgcal 14/14 (skew asserts overwritten by fair-spread asserts; test persons equal to her in art / origin where a lift would blur the check; dan cal restored not deleted), mgcal-apply.test.sh all ok.
- ag-mg2 22 ok / 2 FAIL — both "summons" rows (calls 15/400; median 6 vs 5.8) = **the same 2 FAILs on LIVE 72f7c0c5** (stash run of main); summons calls are a jts issue outside this branch.
- mg-skip PASS (on b4b5999). slap-mg: "fails":["marks"] (screenshot-marks check) on b4b5999; the main-build comparison could not run here (the sparse main worktree lacked rank/worker/src/score.js for assemble) — reviewer please run `node dev/test/slap-mg.js <url> 755x1000@2 <dir> 0` on origin/main vs this head.
- **QUICKCHECK PASS on head b4b5999** (166 s, old save ok, core gates PASS).

## ITEM (O) origin-arts — NOT STARTED (HANDOVER)
Received from C-AG #26 at 01:53Z (brief item (O), handover 7c9b5160). Not started: this worker hit its rollover point (START_CTX 6 % + 25 % → context ≈ 30 % at 01:55Z). Successor plan:
1. Branch: continue on `review/mg-fair-hands` (head b4b5999; worktree pattern in START_WORKER PREAMBLE). Read brief item (O) verbatim.
2. Hook point already in place: jmgt `mgOrgLv(p, kind)` reads `originByKey(mgOrgOf(p)).art` (the max bậc over the kind's KG82 formula stats). When the per-identity table exists, make `mgOrgLv` read the identity row (origin × story branch) instead of `ORIGINS[k].art` — one function, no other mg change needed; her own start arts come from the same table at new game (j2 start: where `o.art` is applied to S.arts).
3. Data to survey: j1 ORIGINS (8) + ORIGINS.push cnv (j-file with `ORIGINS.push`) + ORIGIN_BR (jorigins bd + hòa thân branches) ; story branches per origin (grep "nhánh"/branch in j53, j67–j72, jorigins); arts list = KG82_STAT / kg82FormulaOf stats + S.arts keys (cam ky thi hoa vu y theu nau …).
4. Tests: extend dev/test/mg-fair-hands.js check 3 to the table; old saves keep their arts.

## ITEM (O) origin-arts — DONE (successor worker session_01Rc5AsHhYZNaAFPZUh3fGff; lands HOLD with mg-fair-hands)
PRIORITY #1 CHECK: OD 20/11 ~02:05Z (OD:L1988) + ~02:15Z (fit each road) + ~01:50Z (noble high / poor low) | main j1.js ORIGINS art:{cam:1}/{y:2}/{vu:1}/{thi:1}, jorigins bd art:{vu:1}, j2 start Object.assign(S.arts,o.art), jmgt mgOrgLv | review/* none (art-* branches are images) | claims: this row
START_CTX ≈ 4 % (1M window). Branch `review/mg-fair-hands`: code **3af6358** + fix **4ef9d04**, head **4ab03cd** (site build). origin/main unchanged (7292287, already merged at 683ee9c).

### Survey (true numbers from code)
- Origins: 9 roulette origins (j1 ORIGINS 8 + j42 cnv) + 1 country branch (ORIGIN_BR bd of hòa thân) = **10 roots**.
- Story roads: each root has exactly **4** roads = its j67 / jorigins premise arcs (ARC67 o:<origin>, not follow-ups = jnroad nrRoads; each road continues in jrd_<origin>.js ch5–11). The life's road is rolled at STORY init (jst14 a67init → S.st.f14.road); an NPC's is v.nr.r. → **40 identities**.
- Arts in the game: ARTS cam Cầm · ky Kỳ · thi Thi · hoa Họa · vu Vũ · y Y thuật & điều hương (j1) + theu Thêu thùa · nau Nấu nướng (j85) = 8 in S.arts, and Tứ đức VIR cong Công · dung Dung · ngon Ngôn · hanh Hạnh (j85, S.vir) = **12**.

### What
- **ONE table** `BAL.orig.art` (jbal.js, law 4): {origin: {"": origin row, <road>: {art: bậc}}}. "" = the old one-art ORIGINS value (tt Cầm 1, cn Y 2, nc/bd Vũ 1, td/thd Thi 1) + new ones for dtq Vũ 1, muoi Ngôn 1, ch Dung 1, cnv Công 1 — used only when the road is unknown. ORIGINS / ORIGIN_BR `art:{}` deleted (law 14).
- `originArts(k, road)` (j1) = the one reader.
- **New game** (j2 start): after STORY init rolls the road, her S.arts / S.vir = the row of HER identity (replaces `Object.assign(S.arts,o.art)`). Old saves never pass start → keep their arts (law 6c); nothing is re-rolled.
- **mg-fair-hands upbringing** (jmgt `mgOrgLv`): reads the NPC's identity row (mgOrgOf × v.nr.r; no road → origin row); a Tứ đức board td_<k> reads virtue k; the player herself 0 (her row is already in her own arts; an old save is not lifted by a table it did not start with).
- No player-visible text or UI changed (her start arts show through the existing kit arts tab) → no shots.

### Table — start arts per identity, one-line reason per art (art names as the player reads them; data = BAL.orig.art, jbal.js)
Totals per origin (law 2: all 4 roads of one origin equal): Tể tướng / Nam Chiếu / Bắc Địch **7** · Đại tướng quân / tội thần / cháu Thái hậu **6** · buôn muối / cung nữ được sủng / thầy đồ **5** · cung nữ tuyển **4**. Max bậc 2 at start (bậc 3 perks stay earned in the palace). "(no road)" row = old one-art ORIGINS value, used only when the road is unknown (old save, NPC without a road, F14 off).
| identity (origin · road) | start arts | why (one line per art) |
|---|---|---|
| Con gái Tể tướng · Quân cờ trong tay cha (tt_co) | Kỳ 2 · Cầm 2 · Thi 2 · Dung 1 | Kỳ: the minister schooled his "quân cờ" in chess/strategy · Cầm: khuê các tutor · Thi: reads and answers the father's coded letters · Dung: groomed for the dragon bed |
| Tể tướng · Phủ Tể tướng mắc oan (tt_oan) | Thi 2 · Cầm 2 · Ngôn 2 · Hạnh 1 | Thi: reads forged ledgers, writes the plea · Cầm: khuê các · Ngôn: pleads her father's case · Hạnh: filial daughter |
| Tể tướng · Phủ Tể tướng chia đôi (tt_tranh) | Cầm 2 · Kỳ 2 · Họa 2 · Ngôn 1 | Cầm: khuê các · Kỳ: weighs the two factions · Họa: refined noble painting (gift between houses) · Ngôn: arbitrates father vs brother |
| Tể tướng · Mật ước với Hoàng hậu (tt_mat) | Cầm 2 · Dung 2 · Ngôn 2 · Họa 1 | Cầm: khuê các · Dung: poise at Khôn Ninh audiences · Ngôn: sounds out what father promised · Họa: painting as courtly gift to Hoàng hậu |
| Con gái Đại tướng quân · Khói lửa Nhạn Môn (dtq_bien) | Vũ 2 · Y thuật 2 · Kỳ 1 · Ngôn 1 | Vũ: sword dance / archery of a camp childhood · Y: dressed soldiers' wounds · Kỳ: army maps · Ngôn: pleads for grain and reinforcements |
| Đại tướng quân · Bức thư mưu phản (dtq_vu) | Thi 2 · Họa 2 · Vũ 1 · Kỳ 1 | Thi: knows her father's hand and letters · Họa: a brush eye to spot the forgery · Vũ: tướng môn body · Kỳ: traces the plot |
| Đại tướng quân · Binh phù và long ngai (dtq_binh) | Kỳ 2 · Ngôn 2 · Vũ 1 · Dung 1 | Kỳ: the power game of the tiger tally · Ngôn: mediates emperor and father · Vũ: tướng môn · Dung: court poise of a general's house |
| Đại tướng quân · Người anh nơi đất giặc (dtq_huynh) | Vũ 2 · Kỳ 2 · Thi 1 · Hạnh 1 | Vũ: rode and shot with her brother · Kỳ: campaign chess with him · Thi: letters across the border · Hạnh: family loyalty |
| Con gái nhà buôn muối · Mua tước cho cha (muoi_tuoc) | Ngôn 2 · Dung 1 · Cầm 1 · Thi 1 | Ngôn: merchant talk, finds who will speak for them · Dung / Cầm / Thi: tutors bought to pass as gentry |
| Buôn muối · Thuyền muối đêm (muoi_lau) | Ngôn 2 · Thi 1 · Nấu nướng 1 · Kỳ 1 | Ngôn: questions boatmen and clerks · Thi: reads the account books · Nấu: salt-and-kitchen trade house · Kỳ: works out who set the trap |
| Buôn muối · Năm đói ở Giang Nam (muoi_doi) | Nấu nướng 2 · Hạnh 1 · Ngôn 1 · Y thuật 1 | Nấu: cooks gruel for the starving · Hạnh: charity · Ngôn: argues price with father · Y: famine sickness |
| Buôn muối · Món nợ trong cung (muoi_no) | Kỳ 2 · Ngôn 1 · Thêu 1 · Dung 1 | Kỳ: reckoning and leverage over the debtor · Ngôn: trade talk · Thêu: silk-trade family · Dung: bought manners |
| Cung nữ được sủng hạnh · Chủ cũ (cn_chu) | Y thuật 2 · Công 1 · Ngôn 1 · Thêu 1 | Y: tea maid of Càn Thanh (herbs, tea) · Công: maid's handiwork · Ngôn: knows how to speak to masters · Thêu: mended her mistress's robes |
| Cung nữ được sủng · Mối tình thuở hầu trà (cn_tinh) | Y thuật 2 · Thi 1 · Thêu 1 · Dung 1 | Y: tea maid · Thi: wrote the love letters · Thêu: embroidered keepsakes · Dung: learned to carry herself as a consort |
| Cung nữ được sủng · Tri kỷ ở Tân Giả khố (cn_ban) | Y thuật 2 · Công 1 · Hạnh 1 · Nấu nướng 1 | Y: tea maid · Công / Nấu: shared laundry and kitchen work with Tố Nga · Hạnh: loyalty to a friend |
| Cung nữ được sủng · Thân thế thật (cn_than) | Y thuật 2 · Cầm 1 · Thi 1 · Ngôn 1 | Y: tea maid · Cầm / Thi: an official's daughter taught as a small child before the fall · Ngôn: asks the old mama the right questions |
| Công chúa Nam Chiếu · Mật lệnh cố quốc (nc_gian) | Vũ 2 · Kỳ 2 · Ngôn 2 · Họa 1 | Vũ: court dancer of her homeland · Kỳ: strategy, border lines · Ngôn: two-faced talk · Họa: can sketch a map |
| Nam Chiếu · Sứ đoàn cố quốc (nc_su) | Vũ 2 · Cầm 2 · Ngôn 2 · Nấu nướng 1 | Vũ / Cầm: banquet dance and homeland music · Ngôn: diplomacy at every feast · Nấu: homeland dishes for the envoys |
| Nam Chiếu · Người ngoại tộc (nc_tuc) | Vũ 2 · Nấu nướng 2 · Thêu 2 · Dung 1 | Vũ / Nấu / Thêu: the dances, food and dress the Thái hậu picks at · Dung: learning Đại Hy etiquette |
| Nam Chiếu · Ngai vàng cố quốc (nc_vuong) | Kỳ 2 · Thi 2 · Vũ 2 · Ngôn 1 | Kỳ: chooses a side in the succession · Thi: royal letters and edicts · Vũ: princess's dance · Ngôn: answers both claimants |
| Công chúa Bắc Địch · Hòa ước mười năm (bd_hoa) | Vũ 2 · Ngôn 2 · Dung 2 · Hạnh 1 | Vũ: steppe dance · Ngôn: the treaty is kept by words · Dung: "sai một bước" — every step watched · Hạnh: gives herself for peace |
| Bắc Địch · Ngựa chiến phương Bắc (bd_ngua) | Vũ 2 · Y thuật 2 · Kỳ 2 · Nấu nướng 1 | Vũ: grew up on horseback (archery board reads Vũ) · Y: horse and herb lore · Kỳ: steppe tactics · Nấu: camp cooking |
| Bắc Địch · Phong tục thảo nguyên (bd_tuc) | Vũ 2 · Nấu nướng 2 · Thêu 2 · Cầm 1 | Vũ: steppe dance · Nấu: mare's milk, steppe food · Thêu: felt and braided embroidery · Cầm: horse-head fiddle |
| Bắc Địch · Ngai Khả hãn (bd_hoang) | Kỳ 2 · Ngôn 2 · Vũ 2 · Dung 1 | Kỳ: khan succession game · Ngôn: answers both brothers · Vũ: steppe body · Dung: holds rank at a foreign court |
| Con gái tội thần · Lật lại án cũ (td_an) | Thi 2 · Ngôn 2 · Cầm 1 · Kỳ 1 | Thi: writes the memorial · Ngôn: keeps the witnesses · Cầm: khuê các past · Kỳ: waits for the right move |
| Tội thần · Kẻ đứng sau màn (td_ke) | Kỳ 2 · Họa 2 · Thi 1 · Cầm 1 | Kỳ: unravels the hand behind the knife · Họa: a painter's eye for detail · Thi / Cầm: minister's daughter schooling |
| Tội thần · Người em còn sống (td_song) | Thêu 2 · Hạnh 2 · Thi 1 · Y thuật 1 | Thêu: sews clothes to send her brother in secret · Hạnh: family first · Thi: schooling · Y: remedies for a border conscript |
| Tội thần · Thù hay tha (td_tha) | Cầm 2 · Hạnh 2 · Thi 1 · Dung 1 | Cầm: music shared with the foe's daughter · Hạnh: the road of forgiveness · Thi / Dung: khuê các past |
| Cháu gái Thái hậu · Quân cờ của cô mẫu (ch_co) | Dung 2 · Kỳ 2 · Ngôn 1 · Cầm 1 | Dung: raised at Đức Thọ cung · Kỳ: the aunt's chess game vs Hoàng hậu · Ngôn: carries the aunt's words · Cầm: noble schooling |
| Cháu Thái hậu · Thái hậu lâm bệnh (ch_benh) | Y thuật 2 · Hạnh 2 · Nấu nướng 1 · Dung 1 | Y: nursed her aunt · Hạnh: filial niece · Nấu: medicinal soups · Dung: Đức Thọ cung manners |
| Cháu Thái hậu · Hai người cháu (ch_ho) | Vũ 2 · Cầm 2 · Dung 1 · Họa 1 | Vũ / Cầm / Họa: the two nieces were raised to outshine each other in the arts · Dung: Đức Thọ cung |
| Cháu Thái hậu · Bí mật năm xưa (ch_bi) | Thi 2 · Dung 2 · Kỳ 1 · Ngôn 1 | Thi: reads the old letter · Dung: Đức Thọ cung · Kỳ: protect or use the secret · Ngôn: keeps it quiet |
| Con gái thầy đồ nghèo · Danh hiệu Tài nữ (thd_tho) | Thi 2 · Họa 1 · Công 1 · Ngôn 1 | Thi: the poet herself · Họa: thi họa go together · Công: poor girl's needlework · Ngôn: defends against the plagiarism charge |
| Thầy đồ · Bản thảo của cha (thd_sach) | Thi 2 · Kỳ 1 · Hạnh 1 · Công 1 | Thi: copied her father's manuscript · Kỳ: weighs printing it · Hạnh: nho phong · Công: poor household |
| Thầy đồ · Học trò của cha (thd_tro) | Thi 2 · Ngôn 1 · Kỳ 1 · Nấu nướng 1 | Thi: grew up among examination students · Ngôn: speaks for the student · Kỳ: the exam-fraud plot · Nấu: cooked for father's students |
| Thầy đồ · Thầy giáo trong cung (thd_hoc) | Thi 2 · Ngôn 1 · Họa 1 · Hạnh 1 | Thi: teaches characters · Ngôn: explains to children · Họa: brush lessons · Hạnh: a teacher's virtue |
| Cung nữ tuyển vào cung · Bí mật của chủ nhân (cnv_chu) | Công 1 · Nấu nướng 1 · Y thuật 1 · Ngôn 1 | Công / Nấu: commoner girl's work · Y: night duty with tea and medicine · Ngôn: knows when to keep silent |
| Cung nữ tuyển · Chị em đồng hương (cnv_ban) | Thêu 1 · Công 1 · Hạnh 1 · Nấu nướng 1 | Thêu: village embroidery she learned with Xuân Đào · Công: maid's work · Hạnh: stands by her friend · Nấu: shared the servants' kitchen with her |
| Cung nữ tuyển · Ánh mắt nơi hành lang (cnv_mat) | Công 1 · Vũ 1 · Dung 1 · Thêu 1 | Công: maid's work · Vũ: village dance · Dung: how she stood under the eaves · Thêu: village needlework |
| Cung nữ tuyển · Ma ma dạy việc (cnv_ma) | Công 1 · Nấu nướng 1 · Dung 1 · Hạnh 1 | Công: Lưu ma ma's training is household work · Nấu: kitchen duty · Dung: palace deportment drilled · Hạnh: patience and obedience under the strictest mama |

### Start value per identity (laws 2 / 3; dev/measure/origin-arts.js table A — all 4 roads of one origin are equal, so one row per origin)
Training points: reaching bậc L costs L(L+3)/2 lesson points (j85 addArtP: 2 / 5 / 9).
| origin | Σ bậc (each road) | Σ points (each road) | start rank | other start stats | Thái hậu / Hoàng hậu thiện cảm | what pays for it |
|---|---|---|---|---|---|---|
| Con gái Tể tướng | 7 | 17 | Quý nhân | danh 25, bạc 150 | 5 / −15 | Hoàng hậu sees her as a threat (−15) |
| Công chúa Nam Chiếu hòa thân | 7 | 17 | Tần | danh 30, bạc 120 | −15 / 0 | foreigner: Thái hậu −15, two-nation roads |
| Công chúa Bắc Địch hòa thân | 7 | 17 | Quý nhân | danh 15, sức 90, bạc 90 | −20 / 0 | "người rợ": Thái hậu −20 (the hard branch) |
| Cháu gái Thái hậu | 6 | 14 | Quý nhân | danh 20, bạc 100 | 40 / −5 | Hoàng hậu −5; her fate tied to the old lady |
| Con gái Đại tướng quân | 6 | 14 | Thường tại | danh 15, sức 100, bạc 80 | 0 / 0 | lower rank than the other nobles |
| Con gái tội thần | 6 | 14 | Đáp ứng | bạc 70, sủng 10, thù 1, tâm cơ 15, tài 15, danh 6 | 0 / 0 | lowest rank + a blood enemy at court |
| Con gái nhà buôn muối | 5 | 11 | Đáp ứng | bạc 320 | −5 / 0 | — (rich: can buy lessons) |
| Cung nữ được sủng hạnh | 5 | 11 | Thường tại | sủng 20, bạc 60, danh 6, sức 10 | 5 / 0 | old servant stigma; ally |
| Con gái thầy đồ nghèo | 5 | 11 | Đáp ứng | bạc 20, tài 20, đức 10 | 0 / 5 | poor (bạc 20) |
| Cung nữ tuyển vào cung | 4 | 8 | under Đáp ứng (servant) | — | 0 / 0 | the climb itself is her road |
Reading (law 2/3): no identity is clearly best — the 7-bậc nobles each carry an existing cost (Hoàng hậu −15 / Thái hậu −15 / −20); ch's Thái hậu +40 gets only 6; the poor get fewer bậc but other help (muoi bạc 320, thd tài +20 / đức +10, cnv a servant road made for climbing). Inside one origin every road is equal value (same bậc, same training points) — only which arts differ, by story. Origin is rolled (roulette, BAL.orig.ow), not chosen. MAIN may retune any bậc in BAL.orig.art in one edit at the ratio step.

### Upbringing as she meets them (table B: her win % on 4 boards, her = thd road thd_sach (Thi 2, Kỳ 1, Công 1, Hạnh 1) at rank 0, vs untrained NPCs (own arts 0) of each origin, roads mixed; 800 NPCs × 4 plays)
| NPC origin | Đàn | Cờ | Múa | Điều hương |
|---|---|---|---|---|
| Con gái Tể tướng | 13.8 | 50.9 | 49.8 | 50.6 |
| Con gái Đại tướng quân | 50.4 | 41.1 | 19.8 | 39.7 |
| Con gái nhà buôn muối | 42.2 | 55.5 | 50.5 | 46.1 |
| Cung nữ được sủng hạnh | 43.8 | 72.5 | 51.0 | 13.2 |
| Công chúa nước Nam Chiếu hòa thân | 39.7 | 51.2 | 13.1 | 48.5 |
| Con gái tội thần | 29.5 | 56.8 | 47.3 | 45.1 |
| Cháu gái Thái hậu | 35.5 | 56.3 | 40.6 | 42.0 |
| Con gái thầy đồ nghèo | 49.7 | 60.5 | 49.1 | 49.4 |
| Cung nữ tuyển vào cung | 52.0 | 73.9 | 44.4 | 43.5 |
| Công chúa Bắc Địch hòa thân | 43.7 | 51.9 | 12.3 | 40.6 |
Noble-born NPCs beat her clearly in their house arts (Tể tướng at Đàn 14 %, hòa thân princesses at Múa 12–13 %, Đại tướng quân at Múa 20 %, cung nữ được sủng at Điều hương 13 %); commoner maids ≈ her (44–52 %). The size of the lift = BAL.ag.mg2.hand.art (0.2 / level) + the board ease of the level — both knobs unchanged.

### Tests (head 4ab03cd)
- NEW dev/test/origin-arts.js **8/8 ok**: survey (10 roots, 40 identities, rows == real roads), one core (keys real, bậc 1..5, no ORIGINS art left), variety (no two identical sets, 3–4 arts), law 2 (equal bậc + points per road; noble > middle > poor; road rows keep the origin art), new game (every origin × 3 lives: S.arts / S.vir == her rolled road's row; F14 off → origin row), old save keeps arts, NPC mgOrgLv reads identity row (road / no road / td_ virtue / servant 0 / herself 0), no page errors.
- mg-fair-hands 15/15 (check 3 now also asserts a road row: tt_tranh Cầm 2 → +2·art); ag-mgh + ag-mgcal + mgcal-apply 31 ok / 0 FAIL; mg-skip PASS.
- ag-mg2: 1 FAIL "summons calls" — **same FAIL on LIVE main 7292287** (run in a main worktree: 23 ok + the same summons FAIL) → pre-existing jts issue, not this branch. (The predecessor's second "median" FAIL did not recur on either.)
- **slap-mg "marks": pre-existing.** Run on LIVE origin/main 7292287 (own worktree, assembled) AND on this head: both `fails:["marks"]` with identical data — every tier portrait renders as the stranger silhouette (`unknown:true`, no `kslap s1/s2/s3` class, no swell). It is the test's meet / portrait path on file://, not mg-fair-hands or origin-arts.
- QUICKCHECK: PASS on 7051a3e (first build, 183 s, old save ok, core gates PASS); **QUICKCHECK PASS on head 4ab03cd** (191 s, old save ok, perf new/live render 213/235 ms, core gates PASS).

### Knobs (all BAL, MAIN retunes at the ratio step)
| knob | where | meaning |
|---|---|---|
| BAL.orig.art[origin][road] | jbal.js | start bậc per art per identity (her start + NPC upbringing) |
| BAL.orig.art[origin][""] | jbal.js | the origin row when the road is unknown |
| BAL.ag.mg2.hand.art | jbal2.js | hand points per art level difference (unchanged 0.2) |

### Status
SẴN SÀNG KIỂM mg-fair-hands+origin-arts 4ab03cd (HOLD: lands only after the owner's calibration + ratio OK, OD 20/11 ~01:42Z). Worker context ≈ 15 % at end (START_CTX 4 %), no rollover needed.
