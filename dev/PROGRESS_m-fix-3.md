# PROGRESS m-fix-3 — odds lie / evidence / result seals (robot M4, seed 104, LIVE 0756a05b)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims F #12 (this branch) | main: reused j13 fakeIllRisk + chanceW, j1 inner/oi odds path, j22 «Hối lộ Kính sự phòng sửa sổ» card + khBook, j8 pregMonthP, j63 oddsSoft | review/* 0 on fakePreg / Kính sự phòng / result seal (m-fix-1/2 are other M-items) | archive 0.
Branch review/m-fix-3 on LIVE origin/main 4a8c627b. Worker session_01UV1SzkDurA75A3P5i3ns2w (opus, depth 8).

## Root causes
1. ODDS LIE — the «Giả mang thai» card showed od(Tâm cơ) = the FIRST step only (Tâm cơ 100 → 95 «Rất vững»). The road then rolls a monthly
   exposure for 9 months (3 %/month, 1.5 % with a Thái y tâm phúc, +4 % when the book does not match) and a month-10 swap
   (30 + Tâm cơ/2 + tai mắt×4): the whole road at the M4 state is 40 % («Khó lường»), and the exposure had no way out.
   Same family: «Giả bệnh» (o 100 shown «Rất vững», 28 % to be found out → punished) and «Giấu đi, im lặng» (lost ngự tứ: no word at all,
   45 % to come out → punish sev 2).
2. EVIDENCE — j8 pregMonthP checked «no night within 6 tuần before the announcement» (true at M4: last night 7 tuần earlier) but PRINTED
   «Sổ Kính sự phòng không ghi đêm thị tẩm nào» while nightLog held 21 nights. Numbers were typed in the function (law 4).
3. «BẠI» after «Rất vững» rest — measured 2000 plays of «Nghỉ ngơi một lát»: BẠI 110 (5.5 %), and EVERY BẠI is the odds-cap soft fail
   (OD 17/11 ~17:00Z/17:35Z: nothing rolled is sure, a sure act fails softly at the 95 cap; Sức unchanged, nothing lost). The label is
   TRUE. Family scan of every dealt card (forced win / forced fail) found the real mislabel instead: every SURE / inner act sealed «THÀNH»
   even when its inner roll failed (j19 wrapR turned the "sure" hint into true) — 6 cards (Trò chuyện với cung nữ, Đọc sách giải khuây,
   Hối lộ Kính sự phòng, Giả bệnh, Mời thái y bắt mạch, Sang Thái y viện xin bắt mạch).

## Fix (whole families)
- BAL (law 4): BAL.tw.g.fakeX {catch, catchDoc, noRec, recWk, swap[3], exitO, exitTam, exitDoc, exitSung, exitDanh, npcExit};
  BAL.eff.j92.wdHideCatch. jbal2.js.
- j8: fpNoRec / fpCatch / fpSwapO / fpRoad / fpLast / fpBook — ONE path for the card word, the monthly roll and the counter-plays.
  The verdict reads the real book: «Sổ Kính sự phòng ghi 21 đêm thị tẩm của ngươi, đêm cuối cách ngày báo có thai 7 tuần: tháng thai
  không khớp sổ, giả mang thai bị lật tẩy, tội khi quân» (empty book: «… chưa ghi đêm thị tẩm nào của ngươi …»).
- j2: «Giả mang thai» = a STAGED act: corner word = oi = whole road (fpRoad), first step rolls at oin (runOpt), Kèm cites the real book and
  the death chance of the rest of the road. runOpt: generic staged-act support (a.inner + a.oin). j25: a staged act seals its first
  step's THÀNH / BẠI.
- j22 counter-plays while the fake runs: «Hối lộ Kính sự phòng sửa sổ» (the existing card, now one factory kspFixCard; khBook → the book
  matches) and «Báo sảy thai» (ends the fake; seen through = Danh − and cấm túc, never death; Kèm shows what keeping the fake still
  risks). NPC two-way: a consort whose book does not match ends her own fake (npcExit × Tâm cơ).
- j13 «Giả bệnh»: oi = 100 − fakeIllRisk (word «Vững»). j92 «Giấu đi, im lặng» p = 100 − wdHideCatch + Kèm; «Sai người lùng tìm» p = whole
  road (found, or not found and never out) + Kèm.
- j19: a sure / inner act seals «KẾT QUẢ» (the kit's neutral seal), never a THÀNH its inner roll did not earn. Rest BẠI unchanged (owner
  cap rule; changing it needs her word, law 16).

## Before / after
| item | before (LIVE 4a8c627b) | after (this branch) |
|---|---|---|
| Giả mang thai, M4 state (Tâm cơ 100, last night 7 tuần back) | «Rất vững» (95 = first step) | «Khó lường» (40 = whole road) · Kèm: sổ Kính sự phòng ghi đêm cuối 7 tuần trước (không khớp tháng thai) · ban chết: khả năng cao |
| Giả mang thai, fresh night + Thái y tâm phúc | «Rất vững» | «Có cơ» (66) |
| Monte Carlo 3000 roads (shown vs real) | — | book off 36 vs 37 · book on + doctor 61 vs 62 |
| Exposure counter-play | none | «Hối lộ Kính sự phòng sửa sổ» (Tùy duyên) + «Báo sảy thai» (Vững) on the tray; NPCs exit too |
| Verdict text | «không ghi đêm thị tẩm nào» (21 nights in nightLog) | «ghi 21 đêm thị tẩm của ngươi, đêm cuối cách ngày báo có thai 7 tuần» |
| Giả bệnh | «Rất vững» (28 % found out hidden in Kèm) | «Vững» (72 = whole road) |
| Giấu đi, im lặng (ngự tứ) | no word, «không tốn gì» | «Tùy duyên» (55) + Kèm: lộ ra → Sủng −13, cấm túc, có khi giáng: khả năng cao |
| Sai người lùng tìm | word of the search only | whole road (e.g. 78) + Kèm of the later coming-out |
| delayed-risk-scan (3 DELAYED roads) | 3 without the road word (rc 1) | 0 (rc 0) |
| Seal of sure / inner acts on an inner fail | «THÀNH» (6 cards) | «KẾT QUẢ» |
| Rest «Nghỉ ngơi một lát» | BẠI 5.5 % = cap soft fail (true) | unchanged (owner cap rule) |
| Seal vs forced roll, 46 card plays | 6 lies | 0 |

## Tests (all on this branch, served build)
- node dev/test/delayed-risk.js <url> → PASS 16 checks (fake road / book text / staged seal / verdict / counter-plays / MC ±4 / Giả bệnh /
  Giấu đi / rest 2000 plays / seal family 46 plays).
- node dev/test/delayed-risk-tap.js <url> [shots] → PASS fold + ipad (real touch taps, elementFromPoint on the card; win → THÀNH + fake,
  lose → BẠI + Danh, Báo sảy thai ends the fake). MUTATE=1 (old lie back) → FAIL on both devices, as it must.
- python3 dev/tools/delayed-risk-scan.py [--md] → rc 0 (every hit triaged; every DELAYED road shows the road word).
- Pre-existing, not from this branch: dev/test/rest-cards.js expects Sức +20 (BAL.restDsSuc is 24 on LIVE); shown-odds-scan 5 AFTER paths
  (j10 / jkcco / jkcg / jpma / jstip), none touched here.

## Open for MAIN / owner
- Rest BẠI on «Rất vững»: true soft fail by the 95 cap (OD 17/11). If she wants rest-type acts exempt (oddsSure), that is her call.
- «Giả bệnh» M4 note «giáng phẩm (giả bệnh khi quân)»: the punishment itself is cấm túc (sev 1); the «giáng phẩm» label comes from jdh2
  dhConfiscate (hiệu taken after a punishment) — not touched here.
