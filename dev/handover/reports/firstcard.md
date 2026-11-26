# FIRSTCARD — the first card «Lễ ra mắt» ends the life at «Rất vững» (BUG FAST LANE, MAIN 153)

PRIORITY #1 CHECK ('Lễ ra mắt ban hoa'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (prio1.sh, from MAIN); family already known: thd_tho «Cha định hôn» all-exit card → KK33 (odds) + OB-NGOAICUNG (law 2). Checked review/ob-ngoaicung (no jkc/jkc2/jk2b/jselx change), review/selection-scene*, review/selscene-dramas3, review/kit-selscene, review/co-ngu-banhoa: no triều kiến built, no fix of this family. Worker session_01V1ZZH2jZ5mTk6LLgaTSM3m, branch review/firstcard from LIVE 02f564ae.

## Root causes (two)
1. **The odds word** (law 7, law 4): `jk2b kitOptOdds` stamps the SURE meter «Rất vững» on EVERY dialog option that has no odds of its own (owner 19/11 ~01:48Z rule for certain outcomes). The selection card options (`jkc2 PEND.kc2Sel`, kc2H risk «an toàn»/«có rủi ro» is not an odds word) and every home-road card (`kcO` wraps `go`, so the kit cannot see the roll inside) therefore read «Rất vững» — also «Thắt cổ tự vẫn» (ĐƯỢC: mất mạng) and the whole tú nữ contest (top 4 of 12 kept, else ban hoa = the life ends).
2. **The princess in the tú nữ contest** (laws 2/3; OD 23/11 ~22:35Z (3) «hòa thân (nc/bd/pf) = YES, the only road with NO tuyển tú … the SAME 3-test format … feeds the ±1 cap Phi + Sắc rule»): the direct road «Vào cung ngay» of a hòa thân life (`jkc2 kc2SelDo → jselx selxSelDo`) put the princess into the 12-girl contest, so ~3 of 4 new hòa thân lives ended at the first card (measured below). E-S4 pt_hai seed 3835466079 «Dâng Kỳ», E-S8 bd_san seed 653072582 «Cúi đầu chờ xét», E-S6 pt_tang R6-random-5 / R6-scholar-2 are this.

## Fix (one place each)
- **ONE odds rule for a life-ending option** (`jk2b`, KIT §6.2b-END in KIT.md): `kitRiskOpt(o, p, loss, end)` — a caller whose chance the card cannot see declares the TRUE chance p from the SAME function its roll uses + the loss words → the line leads with `word(p)` (BAL.odds.cut) and the hint gets «nhưng nếu hỏng: …» = the red **Mất** row. `kitOptOdds → kitEndOdds(o, n)`: never the sure stamp on a pick whose words say the life ends (`KIT_END_RE`): declared p → `word(p)`, a certain ending → `word(BAL.odds.lo)` = «Mong manh» (the chance of keeping this life). Single-option cards keep the sure meter.
- **Selection odds** (`jselx selxOddsP(raw, art)`): BAL.odds.simN contests of the same girls by the same formula (her noise + each girl's drawn marks), on a PRIVATE generator (the game's Math.random is never consumed — seeded lives replay the same). Tú nữ: P(kept); princess: P(step ≥ 0). `jkc2 kc2SelRisk` puts it on every selection option (at her own level = the «không thi» mark); `jentry entExam` frame row «Được ở lại» / «Giữ đúng bậc» (để tài nghệ quyết định · chơi xuất sắc) + «Nếu hỏng».
- **Princess never ban hoa** (`jselx selxHtMe`): the intake girls compete among themselves (law 6b, they stay real), her step = the place her score would take among them (`BAL.selx.placeStep`, below the kept places = −1), cap Phi + Sắc rule unchanged (`selxRank`); no tú nữ podium / hương nang for her; words «Lễ ra mắt chưa đủ, phong thấp hơn hòa ước một bậc» etc.; card texts no longer say «bị trả về cố quốc» (joi OI_SELT, jkc2).
- **Home-road family** (jkc / jkc2 / jkc3b): true odds declared at «Uống, không muốn mất lòng» (1 − P(độc)·P(chết)), «Đến bến sông» (rlKcElope), dịch ×5 (`kcIllLive`), «Quỳ xin cha» (`kcQuyP`; fail → all-exit card), Sơ tuyển ×3 (`kcSoOk` is decided by her numbers → hi / lo), Điện tuyển ×2 (`kcDienP` = mean over the score noise of `kcDienSel`), «Tự mình chống trả» (`kc2FightP`), «Xin để … đi thay» (success ends the life → 100 − P), Ngày tuyển cung nữ / Lễ ra mắt home road (`kc2ExRisk`, entOdds tier ≥ 1). Certain endings: hints «…; nhưng kiếp này dừng …» (KCH table, kc2 home endings, every ✦ rare ending, jkc3b x1).
- **Law 4**: numbers that were typed in jkc (kcIll 35/20/40/8, Điện tuyển 45/1.2/20/15/±4, plea +15) moved unchanged to `BAL.kc2.ill`, `BAL.kc2.dienSel`, `BAL.kc2.kcCard.quyXinChaWant`; each roll and its card read ONE function.

## Measured (dev/test/firstcard/stat.js, 25 new lives per origin, «Cúi đầu chờ xét»)
| origin | LIVE 02f564ae: life ends at card 1 | meter shown LIVE | review/firstcard: ends | meter shown (mean p) |
|---|---|---|---|---|
| bd Công chúa Ba Tư/Bắc Địch | 17/25 | Rất vững 25/25 | 0/25 (18 −1, 5 =, 2 +1) | Hiểm (≈21–28) |
| pf Công chúa Phù Tang | 20/25 | Rất vững 25/25 | 0/25 (18 −1, 2 =, 5 +1) | Hiểm (≈28–31) |
| nc Công chúa Cao Ly | 19/25 | Rất vững 25/25 | 0/25 (20 −1, 5 =) | Hiểm (≈22) |
| cn Cung nữ được sủng hạnh (tú nữ contest, ban hoa by OD 24/11 ~06:15Z) | 19/25 | Rất vững 25/25 | 22/30 | Hiểm (mean 25 vs real kept 27 %) |

FOR MAIN (balance, owner's rule, not changed): a tú nữ who meets the one-card contest (cn: no 3 days) is kept ~1 in 4 → ~3 of 4 cn lives end in the first minutes. Now told truthfully («Hiểm» + «không lọt vào bốn người đứng đầu thì bị ban hoa, kiếp này dừng»), but it is the owner's call whether cn should get the 3 days (selxDaysFit excludes cn) or a softer keep.

## Family scan (`python3 dev/test/firstcard-scan.py --fail`): 51 life-ending options
BEFORE (LIVE): 46 of 51 print the sure «Rất vững» (only the 5 with own odds were told). AFTER: declared 18 · own odds 5 · ending words 28 · NOT TOLD 0.

| file:line | option | ends via | LIVE meter | told by (after) |
|---|---|---|---|---|
| j14.js:21 | "Xuất gia" | over | own odds | own odds |
| j22.js:64 | "Uống thuốc phá thai" | die | own odds | own odds |
| j4.js:108 | "Theo cha mưu đại sự" | die | own odds | own odds |
| j42.js:431 | "Cúi đầu thưa tên" | die | own odds | own odds |
| j42.js:435 | "Tạ ơn, xuất giá" | over | Rất vững (sure stamp) | words |
| j42.js:438 | "Xuất cung về quê" | over | Rất vững (sure stamp) | words |
| j42.js:612 | "Tạ ơn, xuất giá" | over | Rất vững (sure stamp) | words |
| j42.js:616 | "Theo về vương phủ" | over | Rất vững (sure stamp) | words |
| j42.js:619 | `Xuất cung thành thân với ${b.name}` | over | Rất vững (sure stamp) | words |
| j42.js:628 | "Uống thuốc phá thai" | die | own odds | own odds |
| jge.js:150 | "Tạ ơn" | over | Rất vững (sure stamp) | words |
| jkc.js:375 | "Uống, không muốn mất lòng" | kcDie | Rất vững (sure stamp) | declared |
| jkc.js:426 | "Đến bến sông" | kcElope | Rất vững (sure stamp) | declared |
| jkc.js:426 | "✦ Theo chàng đi, có tỳ nữ lo liệu đường đi" | kcElope | Rất vững (sure stamp) | words |
| jkc.js:435 | "✦ Đối đáp, rồi dâng một khúc đàn" | kcEnd | Rất vững (sure stamp) | declared |
| jkc.js:437 | "Đóng cửa khuê phòng, uống thuốc phòng" | kcIll | Rất vững (sure stamp) | declared |
| jkc.js:437 | "Vẫn đi lại như thường" | kcIll | Rất vững (sure stamp) | declared |
| jkc.js:437 | "Đi chùa phát thuốc cho dân" | kcIll | Rất vững (sure stamp) | declared |
| jkc.js:443 | `Nhận lời nhà ${s.n}` | kcMarry | Rất vững (sure stamp) | words |
| jkc.js:446 | "Vâng lời cha" | kcMarry | Rất vững (sure stamp) | words |
| jkc.js:447 | "Quỳ xin cha cho đi tuyển tú" | dinhhon2 | Rất vững (sure stamp) | declared |
| jkc.js:448 | "✦ Xin cha gả cho người ấy, nay đã đỗ đạt" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:449 | "Lên kiệu hoa" | kcMarry | Rất vững (sure stamp) | words |
| jkc.js:449 | "Cắt tóc xin đi tu" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:449 | "Thắt cổ tự vẫn" | kcDie | Rất vững (sure stamp) | words |
| jkc.js:491 | "✦ Cải trang nam nhi, theo quân ra Nhạn Môn" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:492 | "✦ Xin cha giao cho ngươi giữ cả sổ muối" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:538 | "Ra mắt ma ma" | kcSoGo | Rất vững (sure stamp) | declared |
| jkc.js:538 | "Dúi bạc cho ma ma khám tuyển" | kcSoGo | Rất vững (sure stamp) | declared |
| jkc.js:574 | "Đáp lời khiêm nhường" | kcDien | Rất vững (sure stamp) | declared |
| jkc.js:574 | "Đối đáp lanh lợi" | kcDien | Rất vững (sure stamp) | declared |
| jkc.js:583 | `Gả cho ${s.n}` | kcMarry | Rất vững (sure stamp) | words |
| jkc.js:583 | "Xin ở vậy, mở lớp dạy chữ cho con gái" | kcEndDo | Rất vững (sure stamp) | words |
| jkc.js:584 | "Cắt tóc đi tu" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:584 | `✦ Gả cho ${tm.name}` | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:584 | "✦ Nhận làm nghĩa nữ, đi hòa thân" | kcEnd | Rất vững (sure stamp) | words |
| jkc.js:785 | "Ở yên trong khuê phòng, xông ngải cứu" | kcIll | Rất vững (sure stamp) | declared |
| jkc.js:785 | "Đi chùa giúp sắc thuốc cho dân" | kcIll | Rất vững (sure stamp) | declared |
| jkc.js:789 | "Nhờ tổ mẫu viết thư gửi ma ma" | kcSoGo | Rất vững (sure stamp) | declared |
| jkc2.js:310 | "Nhận lời làm thiếp, trả nợ cho nhà" | kc2End | Rất vững (sure stamp) | words |
| jkc2.js:314 | "Theo họ về làm người ở" | kc2End | Rất vững (sure stamp) | words |
| jkc2.js:331 | "Tự mình chống trả" | kcDie | Rất vững (sure stamp) | declared |
| jkc2.js:356 | `Xin để ${mu?mu.t.toLowerCase():kc2Muoi().to | kc2End | Rất vững (sure stamp) | declared |
| jkc2.js:375 | "Ở lại quê nhà" | kc2End | Rất vững (sure stamp) | words |
| jkc2.js:526 | n | kc2SelPlay | Rất vững (sure stamp) | declared |
| jkc2.js:527 | "Cúi đầu chờ xét" | kc2SelPlay | Rất vững (sure stamp) | declared |
| jkc3a.js:30 | "✦ Cải trang nam nhi, theo quân ra Nhạn Môn" | kcEnd | Rất vững (sure stamp) | words |
| jkc3a.js:63 | "✦ Xin cha giao cho ngươi giữ cả sổ muối" | kcEnd | Rất vững (sure stamp) | words |
| jkc3b.js:66 | "Nhận lời nhà {suitN}" | kcMarry | Rất vững (sure stamp) | words |
| jkc3b.js:103 | "Đến bến sông" | kcElope | Rất vững (sure stamp) | words |
| jkc3b.js:104 | "✦ Theo chàng đi, có tỳ nữ lo liệu đường đi" | kcElope | Rất vững (sure stamp) | words |

Runtime check on the real kit cards (dev/test/firstcard/family.js): every card above prints the declared word / «Mong manh» and its red Mất row (e.g. Cha định hôn 3× «Mong manh · Mất: kiếp này dừng …», Điện tuyển «Vững · Mất: bị trả thẻ bài thì nhà ép gả, kiếp này dừng ngoài cung», Uống canh «Vững · Mất: canh có độc thì có thể chết …»).

## Replays (real pointer taps; dev/test/firstcard/replay.js) + seeds
- Harness review/robot-realtap fd9218fe, seeds 653072582 (bd_san sens iPad) and 3835466079 (pt_hai bold iPad) on this build: 40 buổi each, 0 bugs / 0 dead / 0 stuck — but the bot took the home road this time (game RNG is not seeded), so the first-card path was replayed by replay.js (Vào cung ngay → the exact option):
  - LIVE pf Fold «Dâng Kỳ» → «Duyên cung lỡ hẹn · Bị ban hoa, xuất cung» (bug reproduced). review/firstcard: pf Fold → Quý nhân (đúng hòa ước), pf iPad → Thường tại (−1); bd Fold «Cúi đầu chờ xét» → Tần (+1), bd iPad → Quý nhân. No life ended; 0 page errors.
- Tests: selx-rules 16/16, selx-wire 44/44 (updated: a princess is never ban hoa; girls-only podium/records counts), firstcard-scan 0 NOT TOLD.

## Shots / videos (LOOKED; CDN img/_review/firstcard/, wipe after verdict)
before-LIVE-fold-bd-le-ra-mat.png · after-fold-bd-le-ra-mat.png · after-ipad-bd-le-ra-mat.png · before-LIVE-fold-cha-dinh-hon.png («Thắt cổ tự vẫn · Rất vững · ĐƯỢC mất mạng») · after-fold-cha-dinh-hon.png · after-fold-dien-tuyen.png · after-ipad-dien-tuyen.png · after-fold-pf-khung-thi.png · after-fold-pf-ket-qua.png · before-LIVE-fold-pf-ket-qua-banhoa.png · videos (last 80 s, real taps): before-LIVE-fold-pf-dangky-banhoa.mp4 · before-LIVE-ipad-bd-cuidau.mp4 · after-{fold,ipad}-{pf-dangky,bd-cuidau}.mp4

## Not in this branch (routed)
- Law 2 of the all-exit «Cha định hôn» card (dinhhon2, thd_tho) stays with OB-NGOAICUNG (MAIN 148); here only its odds/warnings.
- Same kit gap, NOT life-ending: every `kcO` home-road option with a hidden roll (e.g. «Thưa: con đợi kỳ tuyển tú», «Thức đêm thêu», «Nghe hắn kể») still reads the sure «Rất vững»; `kitRiskOpt` is the one tool to give them their true odds (FOR MAIN: route as a follow-up family).
- Deck act «Xuất gia» (j14, o:100, act card meter, not a dialog option) keeps «Rất vững» + its own «kết thúc kiếp này» line.
- Changes the owner's 19/11 ~01:48Z «certain outcome = top word» rule ONLY for options whose outcome ends the life (MAIN 153 brief: «a life-ending pick never Rất vững»); FOR MAIN: confirm with sếp if needed (law 16).


# FIRSTCARD-2 (review/firstcard-2 on 9ba83cf0; MAIN 156 recs (a) + (c))

## (a) cn meets the 3 selection days
`jselxday selxDaysFit` no longer excludes cn (hòa thân stays out, cnv stays out). A cn life now starts in Dưỡng Tú viện, Day 1 (thân phận «Tú nữ»), like every tú nữ origin; the contest is on Day 2 after her own play. selx-days ALL PASS (14 lives, cn included; the test now reads selxDaysFit).
Measured (dev/test/firstcard/stat-days.js, 25 new lives each; her mini mark = her own level; the two answers A unknown / B both liked by the asking royal / C one liked one disliked):
| origin | kept A | kept B | kept C |
|---|---|---|---|
| cn | 2/25 | 19/25 | 4/25 |
| tt | 7/25 | 16/25 | 7/25 |
| td | 7/25 | 20/25 | 11/25 |
Before (round 1): cn met the ONE-card contest at once → 22/30 lives ended in the first minutes with no road to play well. Now the first card is Day 1, and a player who learns the royals' chữ trọng (ma ma, dramas) keeps ~¾ of cn lives.
Note FOR MAIN: cn = «Cung nữ được sủng hạnh» (j1 k:"cn", ex-tea maid of Càn Thanh); OD:L1251 calls cn «Cung nữ tuyển vào cung» — the code key and the OD name differ; her prequel («ba năm nay ta hầu trà ở Càn Thanh cung») now leads into Dưỡng Tú viện as a tú nữ.

## (c) non-lethal hidden-roll family (every kcO option whose go rolls a chance the card cannot see)
Each option now reads ONE function for its roll and its odds word: `((rp)=>kitRiskOpt(kcO(…roll(rp())…),()=>P))(()=>EXPR)` (P = rp(), or 100 − rp() where the roll is the BAD branch: «Dùng thử», «Từ chối, giữ kín» ×2, «Đưa bạc», «Về kể với cha»; a person-guard `x&&roll(…)` → `x?rp():0`; the silver pin shows the detection chance, never the hidden «real»). `kitRiskOpt` accepts p as a function (a missing person → no word, never a crash). No loss words added (not life-ending): the meter alone changes.
Scan `python3 dev/test/firstcard-scan.py --fail`: 39 hidden-roll options — LIVE 38 sure «Rất vững» + 1 own odds (jkc3 kc3Ev) → AFTER declared 38 · own odds 1 · NOT TOLD 0. Life-ending table unchanged (51, 0 not told). Runtime (family.js): Thưa: con đợi kỳ tuyển tú «Có cơ», Thức đêm thêu «Vững», Mua bức thêu «Tùy duyên», phấn ×3 «Tùy duyên», Thức đêm sắc lá «Tùy duyên», Mời thầy cúng «Hiểm», Nhận lời cho êm «Tùy duyên», Quỳ xin cha «Có cơ»; options with no roll keep «Rất vững» (certain).

| file:line | option | LIVE meter | after |
|---|---|---|---|
| jkc.js:373 | "Lấy trâm bạc thử" | Rất vững (sure stamp) | declared |
| jkc.js:378 | "Nhờ đại phu xem thử" | Rất vững (sure stamp) | declared |
| jkc.js:379 | "Dùng thử" | Rất vững (sure stamp) | declared |
| jkc.js:381 | `Đứng ra bênh ${mz}` | Rất vững (sure stamp) | declared |
| jkc.js:384 | "Xin tổ mẫu cho tra xét" | Rất vững (sure stamp) | declared |
| jkc.js:392 | "Nói lại với cha" | Rất vững (sure stamp) | declared |
| jkc.js:400 | "Từ chối, giữ kín" | Rất vững (sure stamp) | declared |
| jkc.js:415 | "Ra phố thắp đèn thi" | Rất vững (sure stamp) | declared |
| jkc.js:434 | "Đối lại câu đối" | Rất vững (sure stamp) | declared |
| jkc.js:438 | "Thức đêm thêu bách thọ đồ" | Rất vững (sure stamp) | declared |
| jkc.js:438 | "Mua bức thêu ngoài phố" | Rất vững (sure stamp) | declared |
| jkc.js:439 | "Nghe hắn kể" | Rất vững (sure stamp) | declared |
| jkc.js:442 | "Thưa: con đợi kỳ tuyển tú" | Rất vững (sure stamp) | declared |
| jkc.js:780 | "Thử một chút lên cổ tay" | Rất vững (sure stamp) | declared |
| jkc.js:786 | "Nhờ tỳ nữ dò hỏi hắn" | Rất vững (sure stamp) | declared |
| jkc2.js:282 | "Bán đôi khuyên bạc mua thuốc" | Rất vững (sure stamp) | declared |
| jkc2.js:283 | "Thức đêm sắc lá, chườm cho mẹ" | Rất vững (sure stamp) | declared |
| jkc2.js:284 | "Mời thầy cúng về nhà" | Rất vững (sure stamp) | declared |
| jkc2.js:286 | "Nghiêm mặt mắng lại" | Rất vững (sure stamp) | declared |
| jkc2.js:288 | "Về kể với cha" | Rất vững (sure stamp) | declared |
| jkc2.js:291 | "Bày cho nàng ghi tên đi tuyển" | Rất vững (sure stamp) | declared |
| jkc2.js:294 | "Nhận lời dệt riêng" | Rất vững (sure stamp) | declared |
| jkc2.js:297 | "Đưa bạc" | Rất vững (sure stamp) | declared |
| jkc2.js:299 | "Từ chối, giữ kín" | Rất vững (sure stamp) | declared |
| jkc2.js:301 | "Ra đồng cứu lúa cùng cha" | Rất vững (sure stamp) | declared |
| jkc2.js:306 | "Để cha đi phu, ngươi gánh việc nhà" | Rất vững (sure stamp) | declared |
| jkc2.js:307 | "Xin lý trưởng khất" | Rất vững (sure stamp) | declared |
| jkc2.js:309 | "Xin cha từ chối" | Rất vững (sure stamp) | declared |
| jkc2.js:321 | "Nói chuyện thẳng với nàng" | Rất vững (sure stamp) | declared |
| jkc2.js:322 | "Tâu với phụ thân" | Rất vững (sure stamp) | declared |
| jkc2.js:325 | "Xin sứ đoàn mời thầy thuốc Đại Hy" | Rất vững (sure stamp) | declared |
| jkc2.js:327 | "Xin giữ quyền thư từ với cố quốc" | Rất vững (sure stamp) | declared |
| jkc2.js:330 | "Kêu cứu" | Rất vững (sure stamp) | declared |
| jkc2.js:334 | `Nhận lời cho êm, rồi tâu ${kc2L().dad.toLow | Rất vững (sure stamp) | declared |
| jkc2.js:336 | "Quỳ trước triều xin giữ hòa ước" | Rất vững (sure stamp) | declared |
| jkc2.js:343 | "Xin cha lo gạch tên" | Rất vững (sure stamp) | declared |
| jkc2.js:346 | "Tự làm trả nợ, giữ đường lùi" | Rất vững (sure stamp) | declared |
| jkc2.js:352 | "Ra mắt đoan trang, đáp lời bằng tiếng Đại H | Rất vững (sure stamp) | declared |
| jkc3.js:168 | n | Rất vững (sure stamp) | own odds |

Stills (LOOKED, Fold + iPad): CDN img/_review/firstcard-2/ after2-{fold,ipad}-ba-moi.png, after2-{fold,ipad}-me-benh.png, after2-{fold,ipad}-cn-ngay1.png.

## REVIEW (RV-FIRSTCARD) — BIG · PASS 
PRIORITY #1 CHECK ('firstcard'): OD 0 | ledger 0 | claims 4 | main 0 | review/* 1 (review/firstcard) | archive 0 (from MAIN 156). Reviewer session_01V1ZZH2t5HyBQ4EUYgVmvsq. START_CTX ≈ 4 % (1M window).
Scope (MAIN 156 scope change): review/firstcard-2 f9748b92 (= 9ba83cf0 + round 2) as ONE set, merged onto LIVE 3af7896e → **review/firstcard-2-rv** (only index.html / sw.js conflicted → rebuilt; CHANGE.txt line left to MAIN).
(The earlier WIP push review/firstcard-rv 2ee25433 = round 1 only; superseded, not a verdict.)

### Reviewer fixes on the rv branch (small, made here)
1. **Law 9 / OD:L1096 — kit sample page missing.** KIT.md got §6.2b-END but the kit page had no sample. Added `kitEndSample()` + KIT_SAMPLES «§6.2b-END» (jopic, next to §6.2b): the button opens a REAL dialog (Q + showModal, the game's path) with a declared kitRiskOpt option («Hiểm» + red MẤT «… bị ban hoa, kiếp này dừng»), a certain ending («Cắt tóc đi tu» → «Mong manh», MẤT «kiếp này dừng») and a safe option (sure meter). Looked at Fold + iPad: rows right, 0 page errors.
2. **Law 4 / 7 — «Tự mình chống trả» (jkc2 n_thich) showed the SURVIVAL chance**, `100−(100−fight)·odds2/100` ≈ 86 → «Rất vững» at Sức 90, while the option's own roll (winning the fight, kc2FightP = 30 + Sức/3 (+15 bd)) is ≈ 60 «Có cơ» and a loss kills ~1 in 7 — the owner's exact complaint («Rất vững» then the life ends) could recur. Now the meter = kc2FightP (max ≈ 78 → never «Rất vững»), death on a loss stays the red MẤT row. KIT §6.2b-END now states what p is (own roll; BAD-branch roll → 100 − p; a plea whose success ENDS the life → 100 − p = the chance this life goes on; no roll → the chance she lives through it).

### Checks (on the rv branch, merged with LIVE)
- Law 4 (one core): roll and word read one function — kitRiskOpt(o, ()=>P) / kc2SelRisk → selxOddsP runs the SAME selxContest/selxScore/selxHtMe as selxSelDo (selxRoomCap never touches her own kept flag; private RNG, game Math.random untouched). Typed jkc numbers moved unchanged to BAL.kc2.ill / dienSel / quyXinChaWant. PASS (after fix 2).
- Round 2 «100 − p» inversions (Dùng thử, Từ chối giữ kín ×2, Đưa bạc, Về kể với cha): in each the roll fires the BAD branch → 100 − p = chance of the good result. Correct. No-roll options keep «Rất vững» (kit sample + family.js).
- Law 7 ladder words only (Mong manh … Rất vững, BAL.odds.cut), no %, no typed numbers in new player text (selxNumW). PASS.
- Law 9: no private CSS/inline style in the diff; the meter is the kit .kodds/oddsChip; frame rows via kgBangRows. PASS (after fix 1).
- Law 11 family scan rerun: `firstcard-scan.py --fail` → 51 life-ending (declared 18 · own odds 5 · words 28 · NOT TOLD 0) + 39 hidden-roll (declared 38 · own odds 1 · NOT TOLD 0). PASS.
- Law 2/3 on changed options: the princess card's options share the same loss and each has a gain (play / skip); certain endings name their gain + loss. PASS. Law 6b: the intake girls still compete among themselves and stay real NPCs (selxNpcOut). PASS.
- Princess never reaches ban hoa: real taps (replay, Fold 755x1000 + iPad 1180x820) bd ×3, pf ×3 → −1 / = / +1, no life ended, 0 page errors; card read: meter Mong manh/Có cơ/Vững per life, MẤT «nếu hỏng: bị phong thấp hơn hòa ước một bậc», no «trả về cố quốc». Looked at both devices.
- cn 3 days: real taps Fold + iPad: prequel → Dưỡng Tú viện Day 1 («Tú nữ») → Day 2 Điện tuyển (bare selection cards §93.7; ban hoa named in the text) → kept, Thường tại; no dead end, 0 page errors.
- Tests: selx-rules 16/16 · selx-wire 44/44 · selx-days 12/12 ALL PASS.
- Old save (quickcheck, save made by LIVE): loads + plays a buổi, 0 errors.
- Core gates vs LIVE (same box, same scripts, side by side): dialog-fixed 82 ok + 2 FAIL «(kit-dialog-2 a) no empty Tốn/Được» — IDENTICAL on LIVE 3af7896e (test case «Mặc kệ» x:'' is a .kfree free-choice card since OD 25/11 → stale test; FOR MAIN). button-crawl: 1 fault «Ô lưu · Lui close did not close its layer» — IDENTICAL on LIVE. look-dedupe PASS (LIVE: 1 flaky FAIL), dead-card PASS (both). First quickcheck run crashed these on 180 s timeouts under load; rerun alone they pass/match LIVE. 0 new page errors vs LIVE.
- Perf: selxOddsP 1–22 ms per call, 3–4 ms at 4× CPU (iPad). quickcheck's 6-run perf stage did not finish inside the 30-min tool limit on this box (stopped, not failed) — FOR LC21: run golive.sh quickcheck as usual.

### Notes FOR MAIN (no fault, owner/MAIN calls)
- «Xin để … đi thay» shows 100 − P(plea granted) = the chance this life goes on (the brief «a life-ending pick never Rất vững»); kept as built.
- The dịch options can read «Rất vững» when Sức is high: that is the TRUE survival chance (law 4); the brief's literal «never Rất vững» would need a lie, so not changed.
- «Lấy trâm bạc thử» shows the detection chance, not P(real)·P (no leak of the hidden bowl) — deliberate.
- dialog-fixed (kit-dialog-2 a) is stale vs the .kfree rule on LIVE — route a test fix.
