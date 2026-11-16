SẴN SÀNG KIỂM de331af61d24d472c97e598ab0a0b4a8952eb478

# kc-roads-cn-nc-fix (Foreman D worker, opus) — fixes the r3 FAIL list (review-kc-roads-cn-nc-r1.md)
Branch review/kc-roads-cn-nc-fix @ de331af61d24d472c97e598ab0a0b4a8952eb478 = origin/review/kc-roads-cn-nc-r1 @ef6e7a05 (reviewer fixes kept) + origin/main 92668096 merged
(assemble.py: main's list + jkc2.js after jkc.js, before jhouse.js; site rebuilt). START_CTX ≈ 3 % (get_session read 0; own estimate). PROGRESS: dev/PROGRESS_kc-roads-cn-nc-fix.md.

## 1. BLOCKING — "Chờ 3 năm" worth as much as the palace years (OD:L1288, ONE CORE OD:L1267)
Lever: BAL.kcv (jkc2, the one carry table). The home arm already wins the SELECTION (home skills → khá / tốt; the palace arm meets kém → Tân Giả khố /
two steps under), so the carry counted the home years twice. Changed: dan (cnv) {dn 70→50, st 15→10, kn 12→10, tin 45→25}; nc {dn 40→8, sung 30→10,
st 12→3, art 2→1, bac 20→10}; kc (tiểu thư) unchanged (inside the spread). KC2CUT left as is: review/entry-exam replaces it with BAL.entry.cut (no double source).
Method: dev/measure/kc2val.js, BOTH arms run fresh on the same build (never a reused file), + new dev/measure/kc2val-arm.py (mean, sd, min–max, selection tier mix).
V rule = kc2val-sum.py. Palace arm does not depend on BAL.kcv, so after-builds pool it (n shown).

| origin | build | palace V mean (sd, n) · tier kém/khá/tốt | home V mean (sd, n) · tier | gap home − palace |
|---|---|---|---|---|
| cnv | before (r1 numbers) | 279 (84, 15) · 6/9/0 | 326 (21, 16) · 0/7/9 | **+47** |
| cnv | after | 295 (69, 15) · 3/12/0 | 288 (17, 16) · 0/5/11 | **−7** |
| cnv | after + review/entry-exam merged (local, not pushed) | 316 (73, 7) · 1/6/0 | 289 (22, 8) · 0/4/4 | −27 |
| nc | before | 306 (57, 7) · 3/4/0 | 400 (9, 8) · 0/0/8 | **+94** |
| nc | after (final numbers) | 313 pooled (n 15) | 330 (13, 8) · 0/0/8 | **+17** |
| nc | after + entry-exam merged | 323 (97, 8) · 1/7/0 | 333 (3, 8) · 0/0/8 | +10 |
| muoi (tiểu thư, kc) | before = after | 370 (99, 7) · 1/6/0 | 363 (28, 7) | −7 |
Every gap is now well inside the palace arm's spread (sd 57–97). Reading: the palace is the gamble (wide spread: Tân Giả khố or high favour), home is the safe road
with about the same mean — the choice is real. nc home always reaches the ceiling (Tần) at the selection (rank is most of its value), so its carry is now small.
bd: no origin data in this build (wakes with review/origins-r1); bd runs the nc code (kc2Br) and the nc carry.
Note for entry-exam merge: its selection gap is smaller for skilled players (report § Rank distribution), measured above: still inside the spread, no further retune needed.

## 2. Loss under ĐƯỢC / untrue texts (OD:L908, whole family) — scan dev/measure/kcxscan.js
Scans every kcCard in jkc.js + jkc2.js (88 cards) with the game's OWN colour rule (j19 kcls / effList / kemCol): red word under Được, green under Kèm, a w effect
coloured against its meaning, l:{} on a card with odds 100 (never applies). Plus a number check (every ±N in the text exists in the card's effects).
| card (file:line) | before | after |
|---|---|---|
| Ra ruộng giúp cha (jkc2:171) | Được "nắng làm sạm da" (l sac −1, odds 100: never applied); Áp lực/Nợ nhà −4 red | Tốn: Sức −20 · Sắc −1 (real, red); sạm da in the card text; Nợ nhà −4 green |
| Học chữ với sư cụ (jkc2:187) | l kgt −1 never applied; "xóm giềng xì xào" under Được | Tốn: Tiếng trong xóm −1 (real); words in the card text |
| Dò ý Hoàng thúc / Cầu phúc (jkc2:205/213) | "phe chủ chiến −6 / −3" red under Được (a gain) | moved into w → "Phe chủ chiến −6/−3" green (KLOW) |
| Trả bớt nợ / Làm không công (jkc2:178/179), Khéo từ chối / Giả bệnh / Nhịn ăn (jkc:235/236/267) | Nợ nhà / Áp lực hôn sự −N red under Được | green — ONE rule: j1 KLOW {kap, kld} + kGood in fmt; j63 result card uses the same (a rise of these = Mất) |
| Xin tổ mẫu mời danh sư, Nhờ tổ mẫu khuyên cha (jkc:249/253) | "tổ mẫu với ngươi −15" red under Được | Kèm (red) |
| Nhờ huynh trưởng dò tin (jkc:251) | "huynh trưởng với ngươi −10" under Được | Kèm |
| Sai tỳ nữ ngáng chân thứ muội (jkc:259) | "<maid> thiện cảm −5" under Được; "thứ muội Sắc −3, Danh −3" red | maid → Kèm; "Sắc của nàng −3 · Danh của nàng −3" green (a gain for her) |
| Ngáng chân thứ muội (jkc:224) | sister −3 red | green (same wording) |
| Tố … trước tổ mẫu (jkc:226) | "bị phạt" red under Được | "bị tổ mẫu răn dạy, thôi hại ngươi một thời gian" (neutral → Được colour) |
| Dệt vải bán / lái buôn (jkc2:166/265) | Khéo tay +1 past 5/5 (untrue "nay 6/5") | capped at 5, text only while < 5 |
Totals: 15 flagged → 0 (kcxscan before/after JSON in the run; number check: 0 real misses).

## 3. Her own family shown as strangers — ONE place
j61: new k61Kin(e) (living S.kc.fam while !S.kc.inPal) inside k61Own = the one "her own people" list (maid, staff, kids, home family). jemo emoKnown now calls k61Own
(was a private copy of the list); j28 trKnown returns a kin's nature. So mood (kitEmotion, badge, "Tâm trạng"), nature ("Tính nết"), known state and the pager
names change together on every home road; after entering the palace the old rule applies again. Test dev/test/kc-roads/kin-known.js (all home roads in the data:
tt dtq muoi thd ch td cnv nc; cn has no home road; bd with KIN_BD=1 later): every member mood known + nature known, person card and popup without
"chưa rõ / chưa gặp / ??? / Người lạ", pager strip unmasked — 755x1000@2 PASS 8/8, 1180x820@2 PASS 8/8 (before the fix: father "Tâm trạng: chưa rõ", "Tính nết chưa rõ").
Side flag "Mạnh thái y ???": source found — jthaiy docName() put the physician's name in the act text "Mời <name> đến tận cung", j61 masked it → "Mời thái y ??? đến
tận cung" (palace, any origin; not fixed on review/reign-road-fix-r1 either). docName now gives the title "Thái y" until she knows his name (j99succ rule). Also fixed
on the way (route test): jroute "đợi qua cơn giận của Hoàng thượng (còn NaN tháng)" when there is no cooldown.

## 4. Exam hook = one seam
jkc kcPhucPlay (six tiểu thư Phúc tuyển) now calls window.kcEntryExam(<origin key>, done, {art, origin, title:"Phúc tuyển", note, phuc:1}) like kc2Play; a throw or no hook
falls back to playArt; bots skip. Contract comment in jkc2 updated. playArt call sites in jkc+jkc2: 2, both behind the hook. review/entry-exam overrides
kcPhucPlay in jentry (same kind of call) — merge conflict in that one jkc line is trivial (take either; jentry wins at runtime).

## Tests (this build, 0 page errors)
| test | size | result |
|---|---|---|
| kc-roads/kin-known.js (new) | 755x1000@2, 1180x820@2 | 8/8, 8/8 PASS |
| kc-roads/direct.js 9 origins | 755x1000, 1180x820 | 9/9, 9/9 PASS |
| kc-roads/route.js --origin=cnv / nc (home → exam → palace → save/reload) | 755x1000@2, 1180x820@2 | 4/4 PASS |
| outside/route.js --origin=tt (Phúc tuyển through the hook), muoi | 755x1000@2 | only remaining flag: "Thường tại ??? / Phi ???" = j61's deliberate stranger mask in a palace act card (main); thái y ??? and NaN gone |
| entry-exam/direct.js 9 origins on a LOCAL merge fix + review/entry-exam | 755x1000, 1180x820 | 9/9, 9/9 PASS |
| kcxscan.js | — | 15 → 0 |
Screens looked at: cnv Gia đình pager 1180x820 (father card known, "Ra ruộng giúp cha" Tốn Sức −20 Sắc −1 red). Portraits there are dark squares (CDN blocked in the test; art placeholders known).

## Merge notes / questions
- Merge order: this branch, then review/entry-exam (conflicts there: jkc kcPhucPlay line, generated files). BAL.kcv is not touched by entry-exam.
- KIT: no new part, no CSS. VANPHONG: no % added; new words "Sắc của nàng", "bị tổ mẫu răn dạy".
- Not done (not this branch): "<title> ???" stranger masks in palace act targets are by design (j61).
