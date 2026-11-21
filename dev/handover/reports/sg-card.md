# sg-card — her literal Sủng on option cards drawn through sg() (law 4 shown==applied + law 11 whole family)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (foreman brief) · git grep sgTxt/sgStat on origin/main + review/*: none · reuse: jaudit §15 rewrite (act cards) became the ONE rule
Order: MAIN 92 21/11 09:43Z (rv MSxp, reports/rv-kit-opt-kem.md). Worker SG-CARD (opus), Foreman D #15.
Branch: review/sg-card, base review/kit-opt-kem-rv e09fd19a (land chain).

## Fault
apply() runs every Sủng change of hers through sg() (Hoàng thượng nồng nàn ×1.3, lạnh lùng ×.7 on gains). fmt() did too, but an option
whose Sủng was a LITERAL in its x text («thành: Sủng ${balSg(…)}») was drawn raw. Proof (before): j7 doll «Tự trình lên Hoàng thượng»,
nồng nàn: card +4 / −8, applied +5 / −10.

## Fix (one core, no typed numbers)
- j1 `sgTxt(h)`: the ONE rewrite. Her «Sủng ±N» in a card text → `Sủng ±sg(N)`. Idempotent: a number already drawn through sg()
  carries a no-break space after «Sủng» (invisible) and is never scaled twice. Someone else's Sủng — «nàng / nàng ta / hắn / <Tên> Sủng»,
  «của nàng», «nàng mất» — is applied raw (ap(v,…) / v.sung=…) and stays raw.
- j1 `sgStat(v)`: her Sủng drawn through sg() with the marker; used by fmt, j68 (e68 event lines) and j83 wkGainTxt (they pre-scaled
  with a plain space → the first build double-scaled 28 e68 options; caught by the scan, fixed).
- Readers: j63 kitParse (EVERY kit card: dialog options, optLine, act cards, kitParse(...) result rows), jk2b kitOptModel (hint model
  reads the same number as the card), jaudit §15 (act lines) now calls sgTxt instead of its own copy of the regex.
- Co-op: the number is computed from S.emp.traits of the one shared world at render time, the same on both seats (coop-thin renders her
  cards on the host); no new state, nothing synced, old saves untouched.

## Test — dev/test/sg-card-scan.js <url> [--table]
Runtime walk of every saveable dialog builder PEND[id] (all EV events + every pending choice) × every option × Emperor traits
{none, nồng nàn, lạnh lùng, both} × {thành, bại}: shown = her Sủng on the RENDERED card (dilLine → kitParse rows), applied = S.sung after
the real choice (apply(c.fx); c.go()) with Math.random forced to win / lose. SG family = shown==applied with no trait but ≠ with a trait.
Plus sgTxt unit cases (scaled once, second pass / fmt not rescaled, nàng / nàng ta / <Tên> raw, kit card draws +5/−10).
- BEFORE (e09fd19a): options with her Sủng on the card 65 · all-trait OK 45 · **SG family 9** · other 11
- AFTER  (this branch): options 66 · all-trait OK 55 · **SG family 0** · other 11 · unit cases all pass → PASS
- 11 builders that need a live situation could not be drawn by the walk yet name Sủng (coldvisit, wdframe, wdnt, j97x, rtBm, rtKid,
  rtNgNpc, htban, tsbPetGift, tsbPetHunt, vuoan): checked by hand — every her-Sủng there is applied by apply()/apply(BAL…) (sg), rtBm
  is «<Tên> Sủng» = NPC raw (ap) and stays raw → covered by the same rewrite.

### Before / after table (shown/applied per trait; the 9 SG rows first)
| # | dialog | option | before | after | after: shown/applied per Emperor trait (none · nồng nàn · lạnh lùng · both) |
|---|---|---|---|---|---|
| 1 | doll | Tự trình lên Hoàng thượng | **SG** nongnay thành shown 4 applied 5; nongnay bại shown -8 applied -10; lanhlung thành shown 4 applied 3; nongnay+lanhlung bại shown -8 applied -10 | OK | -: thành 4/4, bại -8/-8 · nongnay: thành 5/5, bại -10/-10 · lanhlung: thành 3/3, bại -8/-8 · nongnay+lanhlung: thành 4/4, bại -10/-10 |
| 2 | empnight | Phô tài: Thi | **SG** nongnay thành shown 6 applied 8; lanhlung thành shown 6 applied 4; nongnay+lanhlung thành shown 6 applied 5 | - |  |
| 3 | minister | Can gián thẳng thắn | **SG** nongnay thành shown 3 applied 4; nongnay bại shown -5 applied -6; lanhlung thành shown 3 applied 2; nongnay+lanhlung bại shown -5 applied -6 | OK | -: thành 3/3, bại -5/-5 · nongnay: thành 4/4, bại -6/-6 · lanhlung: thành 2/2, bại -5/-5 · nongnay+lanhlung: thành 3/3, bại -6/-6 |
| 4 | trungcuu | Làm thơ Trùng cửu | **SG** nongnay thành shown 2 applied 3; lanhlung thành shown 2 applied 1 | OK | -: thành 2/2 · nongnay: thành 3/3 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 2/2 |
| 5 | condemnedmaid | Quỳ xin tha | **SG** nongnay bại shown -5 applied -6; nongnay+lanhlung bại shown -5 applied -6 | OK | -: thành 0/0, bại -5/-5 · nongnay: thành 0/0, bại -6/-6 · lanhlung: thành 0/0, bại -5/-5 · nongnay+lanhlung: thành 0/0, bại -6/-6 |
| 6 | letterhome | Xin ân chuẩn về thăm | **SG** nongnay bại shown -4 applied -5; nongnay+lanhlung bại shown -4 applied -5 | OK | -: thành 0/0, bại -4/-4 · nongnay: thành 0/0, bại -5/-5 · lanhlung: thành 0/0, bại -4/-4 · nongnay+lanhlung: thành 0/0, bại -5/-5 |
| 7 | night2 | Thì thầm nói xấu <rival> | **SG** nongnay bại shown -2 applied -3; nongnay+lanhlung bại shown -2 applied -3 | OK | -: thành 0/0, bại -2/-2 · nongnay: thành 0/0, bại -3/-3 · lanhlung: thành 0/0, bại -2/-2 · nongnay+lanhlung: thành 0/0, bại -3/-3 |
| 8 | giu | Cầu xin Hoàng thượng | **SG** nongnay bại shown -3 applied -4; nongnay+lanhlung bại shown -3 applied -4 | OK | -: thành 0/0, bại -3/-3 · nongnay: thành 0/0, bại -4/-4 · lanhlung: thành 0/0, bại -3/-3 · nongnay+lanhlung: thành 0/0, bại -4/-4 |
| 9 | adStroll | Đánh đàn chờ ngự giá | **SG** nongnay thành shown 7 applied 9; lanhlung thành shown 7 applied 5; nongnay+lanhlung thành shown 7 applied 6 | OK | -: thành 7/7, bại -1/-1 · nongnay: thành 9/9, bại -1/-1 · lanhlung: thành 5/5, bại -1/-1 · nongnay+lanhlung: thành 6/6, bại -1/-1 |
| 10 | tuyen | Tâu nên tuyển ít | OK | OK | -: thành -3/-3 · nongnay: thành -4/-4 · lanhlung: thành -3/-3 · nongnay+lanhlung: thành -4/-4 |
| 11 | tuyen | Tâu nên tuyển nhiều | OK | OK | -: thành 5/5 · nongnay: thành 7/7 · lanhlung: thành 4/4 · nongnay+lanhlung: thành 5/5 |
| 12 | tt1 | Tâu xin cho người của cha | OK | OK | -: thành -3/-3 · nongnay: thành -4/-4 · lanhlung: thành -3/-3 · nongnay+lanhlung: thành -4/-4 |
| 13 | tt3 | Mật tâu Hoàng thượng | OK | OK | -: thành -5/-5 · nongnay: thành -6/-6 · lanhlung: thành -5/-5 · nongnay+lanhlung: thành -6/-6 |
| 14 | nc1 | Dâng thư lên Hoàng thượng | OK | OK | -: thành 3/3 · nongnay: thành 4/4 · lanhlung: thành 2/2 · nongnay+lanhlung: thành 3/3 |
| 15 | empnight | Khuyên ngài giữ long thể | OK | OK | -: thành -1/-1 · nongnay: thành -1/-1 · lanhlung: thành -1/-1 · nongnay+lanhlung: thành -1/-1 |
| 16 | minister | “Hậu cung không bàn chính sự” | OK | OK | -: thành -1/-1 · nongnay: thành -1/-1 · lanhlung: thành -1/-1 · nongnay+lanhlung: thành -1/-1 |
| 17 | trungcuu | Theo ngài lên núi | OK | OK | -: thành 5/5 · nongnay: thành 7/7 · lanhlung: thành 4/4 · nongnay+lanhlung: thành 5/5 |
| 18 | taster | Khóc kể với Hoàng thượng | OK | OK | -: thành 3/3 · nongnay: thành 4/4 · lanhlung: thành 2/2 · nongnay+lanhlung: thành 3/3 |
| 19 | ksp | Cáo bệnh | OK | OK | -: thành -2/-2 · nongnay: thành -3/-3 · lanhlung: thành -2/-2 · nongnay+lanhlung: thành -3/-3 |
| 20 | e68letterHome | Xin Hoàng thượng ân điển | OK | OK | -: thành 0/0, bại -3/-3 · nongnay: thành 0/0, bại -4/-4 · lanhlung: thành 0/0, bại -3/-3 · nongnay+lanhlung: thành 0/0, bại -4/-4 |
| 21 | e68eunuchSqueeze | Mắng thẳng mặt | OK | OK | -: thành 0/0, bại -1/-1 · nongnay: thành 0/0, bại -1/-1 · lanhlung: thành 0/0, bại -1/-1 · nongnay+lanhlung: thành 0/0, bại -1/-1 |
| 22 | e68flowerBloom | Mời Hoàng thượng thưởng hoa | OK | OK | -: thành 4/4, bại 0/0 · nongnay: thành 5/5, bại 0/0 · lanhlung: thành 3/3, bại 0/0 · nongnay+lanhlung: thành 4/4, bại 0/0 |
| 23 | e68empDish | Tự tay vào bếp | OK | OK | -: thành 4/4, bại -1/-1 · nongnay: thành 5/5, bại -1/-1 · lanhlung: thành 3/3, bại -1/-1 · nongnay+lanhlung: thành 4/4, bại -1/-1 |
| 24 | e68empDish | Thuê đầu bếp giỏi làm thay | OK | OK | -: thành 5/5 · nongnay: thành 7/7 · lanhlung: thành 4/4 · nongnay+lanhlung: thành 5/5 |
| 25 | e68empDish | Nói thật món ăn chưa ngon | OK | OK | -: thành 3/3, bại -3/-3 · nongnay: thành 4/4, bại -4/-4 · lanhlung: thành 2/2, bại -3/-3 · nongnay+lanhlung: thành 3/3, bại -4/-4 |
| 26 | e68empPoem | Nghiêm túc góp ý | OK | OK | -: thành 4/4, bại -2/-2 · nongnay: thành 5/5, bại -3/-3 · lanhlung: thành 3/3, bại -2/-2 · nongnay+lanhlung: thành 4/4, bại -3/-3 |
| 27 | e68empPoem | Khen hết lời | OK | OK | -: thành 1/1 · nongnay: thành 1/1 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 1/1 |
| 28 | e68empPoem | Nhờ người chấp bút | OK | OK | -: thành 8/8, bại -4/-4 · nongnay: thành 10/10, bại -5/-5 · lanhlung: thành 6/6, bại -4/-4 · nongnay+lanhlung: thành 7/7, bại -5/-5 |
| 29 | e68empSulk | Lặng lẽ ở bên, pha trà | OK | OK | -: thành 3/3, bại -2/-2 · nongnay: thành 4/4, bại -3/-3 · lanhlung: thành 2/2, bại -2/-2 · nongnay+lanhlung: thành 3/3, bại -3/-3 |
| 30 | e68empSulk | Khuyên giải chuyện triều chính | OK | OK | -: thành 5/5, bại -5/-5 · nongnay: thành 7/7, bại -6/-6 · lanhlung: thành 4/4, bại -5/-5 · nongnay+lanhlung: thành 5/5, bại -6/-6 |
| 31 | e68empSulk | Kể chuyện vui cho ngài khuây | OK | OK | -: thành 3/3, bại -1/-1 · nongnay: thành 4/4, bại -1/-1 · lanhlung: thành 2/2, bại -1/-1 · nongnay+lanhlung: thành 3/3, bại -1/-1 |
| 32 | e68empChess | Đánh hết sức | OK | OK | -: thành 4/4, bại -1/-1 · nongnay: thành 5/5, bại -1/-1 · lanhlung: thành 3/3, bại -1/-1 · nongnay+lanhlung: thành 4/4, bại -1/-1 |
| 33 | e68empChess | Khéo để ngài thắng sát nút | OK | OK | -: thành 3/3, bại -2/-2 · nongnay: thành 4/4, bại -3/-3 · lanhlung: thành 2/2, bại -2/-2 · nongnay+lanhlung: thành 3/3, bại -3/-3 |
| 34 | e68empGiftOdd | Tạ ơn, cất giữ kín đáo | OK | OK | -: thành 1/1 · nongnay: thành 1/1 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 1/1 |
| 35 | e68empIncognito | Theo ngài | OK | OK | -: thành 6/6, bại 0/0 · nongnay: thành 8/8, bại 0/0 · lanhlung: thành 4/4, bại 0/0 · nongnay+lanhlung: thành 5/5, bại 0/0 |
| 36 | e68empIncognito | Theo, nhưng báo ngầm thị vệ | OK | OK | -: thành 8/8, bại -3/-3 · nongnay: thành 10/10, bại -4/-4 · lanhlung: thành 6/6, bại -3/-3 · nongnay+lanhlung: thành 7/7, bại -4/-4 |
| 37 | e68empSleepRead | Để ngài ngủ, thức canh | OK | OK | -: thành 3/3 · nongnay: thành 4/4 · lanhlung: thành 2/2 · nongnay+lanhlung: thành 3/3 |
| 38 | e68empSleepRead | Nhân lúc ngài vui, xin ân điển | OK | OK | -: thành 0/0, bại -3/-3 · nongnay: thành 0/0, bại -4/-4 · lanhlung: thành 0/0, bại -3/-3 · nongnay+lanhlung: thành 0/0, bại -4/-4 |
| 39 | e68heatStroke | Ra hồ hầu Hoàng thượng | OK | OK | -: thành 4/4, bại 0/0 · nongnay: thành 5/5, bại 0/0 · lanhlung: thành 3/3, bại 0/0 · nongnay+lanhlung: thành 4/4, bại 0/0 |
| 40 | e68snowDay | Làm thơ vịnh mai dâng ngài | OK | OK | -: thành 3/3, bại 0/0 · nongnay: thành 4/4, bại 0/0 · lanhlung: thành 2/2, bại 0/0 · nongnay+lanhlung: thành 3/3, bại 0/0 |
| 41 | e68stormNight | Sang hầu ngài giữa đêm | OK | OK | -: thành 4/4, bại -2/-2 · nongnay: thành 5/5, bại -3/-3 · lanhlung: thành 3/3, bại -2/-2 · nongnay+lanhlung: thành 4/4, bại -3/-3 |
| 42 | e68borderNews | Thêu cờ, may áo gửi quân | OK | OK | -: thành 2/2 · nongnay: thành 3/3 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 2/2 |
| 43 | e68borderNews | Mang canh khuya hầu ngài | OK | OK | -: thành 3/3, bại -1/-1 · nongnay: thành 4/4, bại -1/-1 · lanhlung: thành 2/2, bại -1/-1 · nongnay+lanhlung: thành 3/3, bại -1/-1 |
| 44 | e68empWager | Cược lớn cho ngài vui | OK | OK | -: thành 2/2, bại 1/1 · nongnay: thành 3/3, bại 1/1 · lanhlung: thành 1/1, bại 1/1 · nongnay+lanhlung: thành 2/2, bại 1/1 |
| 45 | e68empWager | Cược nhỏ, giữ chừng mực | OK | OK | -: thành 1/1, bại 0/0 · nongnay: thành 1/1, bại 0/0 · lanhlung: thành 1/1, bại 0/0 · nongnay+lanhlung: thành 1/1, bại 0/0 |
| 46 | e68empWager | Đứng xem, khen ngài | OK | OK | -: thành 1/1 · nongnay: thành 1/1 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 1/1 |
| 47 | e68empDream | Giải mộng theo hướng lành | OK | OK | -: thành 3/3, bại -2/-2 · nongnay: thành 4/4, bại -3/-3 · lanhlung: thành 2/2, bại -2/-2 · nongnay+lanhlung: thành 3/3, bại -3/-3 |
| 48 | e68empDream | Xin lập đàn cầu an cho ngài | OK | OK | -: thành 6/6 · nongnay: thành 8/8 · lanhlung: thành 4/4 · nongnay+lanhlung: thành 5/5 |
| 49 | e68empOldFlame | Lắng nghe, an ủi | OK | OK | -: thành 3/3 · nongnay: thành 4/4 · lanhlung: thành 2/2 · nongnay+lanhlung: thành 3/3 |
| 50 | e68empOldFlame | Cố giống người cũ | OK | OK | -: thành 5/5, bại -3/-3 · nongnay: thành 7/7, bại -4/-4 · lanhlung: thành 4/4, bại -3/-3 · nongnay+lanhlung: thành 5/5, bại -4/-4 |
| 51 | e68droughtPrayer | Chép kinh cầu đảo | OK | OK | -: thành 1/1 · nongnay: thành 1/1 · lanhlung: thành 1/1 · nongnay+lanhlung: thành 1/1 |
| 52 | e68envoyGift | Thử tài trước sứ thần | OK | OK | -: thành 2/2, bại 0/0 · nongnay: thành 3/3, bại 0/0 · lanhlung: thành 1/1, bại 0/0 · nongnay+lanhlung: thành 2/2, bại 0/0 |
| 53 | e68q6coldLetter | Nhờ đưa thư lên Hoàng thượng | OK | OK | -: thành 4/4, bại 0/0 · nongnay: thành 5/5, bại 0/0 · lanhlung: thành 3/3, bại 0/0 · nongnay+lanhlung: thành 4/4, bại 0/0 |
| 54 | cmTt | Làm theo lời cha | OK | OK | -: thành -3/-3 · nongnay: thành -4/-4 · lanhlung: thành -3/-3 · nongnay+lanhlung: thành -4/-4 |
| 55 | empnight | Phô tài: Cầm | - | OK | -: thành 6/6 · nongnay: thành 8/8 · lanhlung: thành 4/4 · nongnay+lanhlung: thành 5/5 |
| 56 | guardrumour | Xin Hoàng thượng tra xét | OTH | OTH | -: thành 0/2, bại -10/-10 · nongnay: thành 0/3, bại -13/-13 · lanhlung: thành 0/1, bại -10/-10 · nongnay+lanhlung: thành 0/2, bại -13/-13 |
| 57 | empnight | Thắp đèn hầu rượu | OTH | OTH | -: thành 3/0 · nongnay: thành 4/0 · lanhlung: thành 2/0 · nongnay+lanhlung: thành 3/0 |
| 58 | night1 | Bàn thơ văn, cầm kỳ | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 4/0, bại 3/0 · nongnay+lanhlung: thành 5/0, bại 4/0 |
| 59 | night1 | Bàn chuyện thiên hạ | OTH | OTH | -: thành 4/0, bại 3/0 · nongnay: thành 5/0, bại 4/0 · lanhlung: thành 3/0, bại 2/0 · nongnay+lanhlung: thành 4/0, bại 3/0 |
| 60 | night1 | Rót rượu, nũng nịu | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 3/0, bại 2/0 · nongnay+lanhlung: thành 4/0, bại 3/0 |
| 61 | night1 | Lặng lẽ xoa vai, nghe ngài kể | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 4/0, bại 3/0 · nongnay+lanhlung: thành 5/0, bại 4/0 |
| 62 | night2 | Xin ân cho gia đình | OTH | OTH | -: thành 0/-3, bại -3/-3 · nongnay: thành 0/-4, bại -4/-4 · lanhlung: thành 0/-3, bại -3/-3 · nongnay+lanhlung: thành 0/-4, bại -4/-4 |
| 63 | vnight | Bàn thơ văn, cầm kỳ | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 4/0, bại 3/0 · nongnay+lanhlung: thành 5/0, bại 4/0 |
| 64 | vnight | Bàn chuyện thiên hạ | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 4/0, bại 3/0 · nongnay+lanhlung: thành 5/0, bại 4/0 |
| 65 | vnight | Rót rượu, nũng nịu | OTH | OTH | -: thành 5/0, bại 4/0 · nongnay: thành 7/0, bại 5/0 · lanhlung: thành 4/0, bại 3/0 · nongnay+lanhlung: thành 5/0, bại 4/0 |
| 66 | vnight | Lặng lẽ xoa vai, nghe ngài kể | OTH | OTH | -: thành 6/0, bại 5/0 · nongnay: thành 8/0, bại 7/0 · lanhlung: thành 4/0, bại 4/0 · nongnay+lanhlung: thành 5/0, bại 5/0 |

### "other" rows (≠ even with no trait — NOT this family, pre-existing, listed for MAIN; unchanged before/after)
- night1 / vnight / empnight «Thắp đèn hầu rượu» (9 rows): applied 0 at the click because the choice opens the next night step; nightFx
  applies the card's Sủng later (through apply → sg; the card now shows the sg'd number). Scan artifact, not a fault.
- j7.js:32 guardrumour «Xin Hoàng thượng tra xét»: go applies `sung:2` on success and `danh:-6` on failure — typed numbers that are
  not on the card (law 4: shown ≠ applied, hidden effects). Walk measured thành 0/−10 (the forced roll path also runs another roll).
- j8.js:347 night2 «Xin ân cho gia đình»: walk measured thành 0/−3 (forced-win Math.random also lands the inner roll(o1) of go(...)
  helper on the fail branch). Needs a look by a reviewer; card text itself matches the code's two branches.
→ Recommend a follow-up topic for guardrumour's typed `sung:2` / `danh:-6` (law 4 typed number + hidden effect).

### Adjacent family not in this order (follow-up recommended)
Result LOG lines that print the raw literal after apply() scaled it (e.g. jact.js:168 log «Sủng +${w}», jtruth vuoan «Sủng -10»):
the option CARD is now right, the log line after the choice still prints the raw number under nồng nàn / lạnh lùng. Not routed through
sgTxt here because some logs print measured deltas (S.sung − before) and would be scaled twice; needs its own scan.

## Gates (on 03efb82887e44fc7c5d9884beeca834b41914dac)
- node dev/test/sg-card-scan.js <url> → PASS (SG family 0, unit cases pass); on e09fd19a → FAIL 9 (the fault).
- node dev/test/kit-opt-kem.js → PASS (shown Sủng == applied for fmt path unchanged).
- bash dev/tools/quickcheck.sh → QUICKCHECK PASS · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 7) ·
  time-spill PASS · open 1663 ms 0 errors · OLD SAVE from live loads + plays a buổi · perf median new/live render 224/218, tab 407/450, buổi 1071/1488.
- node dev/test/coop-e2e.js → 92/92 passed (host Fold + guest iPad one room, rejoin, rebirth, solo old save loads, no page errors).
  Co-op: the drawn number is sg() of S.emp.traits of the one shared world — the same on both seats; nothing new is synced or stored.
- Note: branch is on the land chain (kit-opt-kem e09fd19a); origin/main has moved to 2bab70e1 (quickcheck compared against it) — land
  merges it in the chain as usual.
- No visual change (text numbers only; the marker is an invisible no-break space); no new kit part.

SẴN SÀNG KIỂM 03efb82887e44fc7c5d9884beeca834b41914dac (review/sg-card)
