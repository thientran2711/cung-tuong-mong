# E-GAIN3c — leftovers of E-GAIN3/3b: law 3 servant / J4 doors, law 4 typed act deltas, real reasons on disabled act cards

PRIORITY #1 CHECK: OD 0 new (law 1 OD:L33/L1534, law 2 OD 27/11 ~00:46Z, law 3 OD 18/11 ~09:20Z, law 4 OD:L1267, OD 26/11 ~17:55Z «Tốn: không» stays) | ledger 0 | claims E-GAIN3/E-GAIN3b (done) → E-GAIN3c | main: j24 judgeServ, j10 servDo (NPC staffPhat via jagacts3 cx3), jagknow btTerms (the ONE betray/sell/recruit odds core), j29 bribeOdds, jtwoway TWD gossip, jdoor PEND.door (both paths) + doorGain, j25 LACK, j15 rvGroups | review/*: review/e-gain3 23b44074 + review/e-gain3b 78c8608a (base; e-gain3b report §3 / line 58 «Found, not fixed»).
KIT CHECK: reuses kaRows/kcls rows (Thành / Được / Kèm), the writer's explicit `<span class="g">` (KP12), kitHint (read-only), doorGain (jdoor door engine), LACK (j25 reason table, j63 Cần row). No kit internal touched (j63, j19, jk2b, jopic unchanged); 3 new KIT REQUESTs (#6–#8, dev/kit/KIT_REQUESTS.md).

Branch review/e-gain3c from origin/review/e-gain3b 78c8608a (lands after e-gain3 + e-gain3b). START_CTX ~6 %.

## A. Law 3 — the servant / J4 door family

### A.1 Rule call (BIG): «Phạt vô cớ» gains RĂN ĐE (no merge)
Before: card «Thành: thiện cảm −−−, Đức −−, kẻ hầu khác thiện cảm −− · Bại: mang hận …», hint «chẳng được gì; nhưng thiện cảm −, Đức −». Code (j24 judgeServ no-fault): loyalty −25, Đức −3, others −5, grudge → svSell. Nothing for her: cost-only (law 3).
- **Gain chosen: răn đe (deterrence, «giết gà dọa khỉ»).** For `BAL.ag.bt.dread.w` = 8 weeks every servant of that master fears the master: −`BAL.ag.bt.dread.d` = 15 points in the ONE betray/sell/recruit odds core (jagknow btTerms, term «sợ chủ», kinds `tm` and `sell`; the j29 bribeOdds fallback reads the same `svDread`). Another palace finds her people hard to buy, and they offer her news less. The punished servant still bears the grudge (svSell, a separate want) — the loss stays real.
- Measured (toi, servants at lòng 20): a rival's bribe odds on her servant 23 → **8** while feared → 23 after 8 weeks; «sell» raw −10 → −25.
- **Law 1:** one helper `svDreadSet(m)` for every master. Her: judgeServ «Phạt vô cớ» (stage card + Cung nhân tab). NPCs: servDo «phat» on a non-spy servant (the NPC staffPhat act, jagacts3 cx3:staffPhat — the same deed, it was loss-only too) → `m.dreadW`; her Mua chuộc odds on that NPC's servants drop the same way (run: «Phạt San Hô: thiện cảm −15; kẻ hầu khác sợ, 8 tuần khó bị mua chuộc», her odds 6 → 5 at the floor). Saved with S / the rival (save→load keeps `dreadW`; old saves: absent = no fear).
- **Why not merge:** its siblings do other things (Thưởng = loyalty for bạc, Phạt vì <cớ> = discipline when there IS a fault, Đổi người = a new servant); dropping it would take a deed NPCs also do away from her (law 1).
- **Law 2 (one matter = how she handles THIS servant, door «Thưởng phạt»):** NHẸ Thưởng vô cớ — Tốn Bạc thuongBac + 1 khắc, Được thiện cảm +, Mất none; VỪA Phạt vô cớ — Tốn 1 khắc, Được răn đe (the whole household, 8 weeks), Mất that servant's lòng −25 + grudge, Đức −3, others −5; NẶNG Đổi người — Tốn Bạc swapBac + Danh swapDanh, Được a new servant (the old one gone), Mất a possible sale of her secrets / Danh if twice in half a year. Phạt vì <cớ> / Tha lỗi replace the vô cớ pair when a cause exists (one of each direction). Cost and result rise together.
- Wording: the typed `chanceW(15)` («mỗi tuần bán mình … khả năng thấp») was no real odds (svSell is a npcWhy want, cd 12) and broke law 4 → «có thể lén bán tin cho phi tần muốn hại ngươi nhất» (stage card, tab card, the log). The duplicate key `BAL.house.phatDuc` (=3, card text only) is removed; the card prints `BAL.eff.j24.ducJudgeServ` (the −3 judgeServ applies).

### A.2 Door rows (hint «Gợi ý») — the whole family
Root: the talk-door path (jdoor PEND.door, doors with no `acts`: Trò chuyện, Thưởng phạt, Dò la tin tức …) gave its rows NO hint → the kit hinted from the marks line → «chẳng được gì». E-GAIN3b fixed only the J2 path. Now ONE helper `doorHint(a,x)` (jdoor) feeds both paths: the kit hint of the way, else of its full line, else — when the way's own line shows a green gain (doorGain, the card's «Được») — that gain leads and the «nhưng …» part is the kit hint of the line without its green pieces.
Scan `dev/test/door-loss.js` (every person at home + every place, every DOOR row, 6 states).

| producer | way (door) | before (hint) | after (hint) | kind |
|---|---|---|---|---|
| j24 judgeServ + jhouse hsvActs + j24 servJudgeBtns | Phạt vô cớ (Thưởng phạt) | chẳng được gì; nhưng thiện cảm −, Đức − | răn đe: tám tuần kẻ hầu sợ chủ nên cung khác khó mua chuộc người của ngươi; nhưng thiện cảm −−−, Đức −− | **RULE (BIG)** + worded |
| jdoor doorHint (talk path) | Đổi người (Thưởng phạt) | chẳng được gì; nhưng Danh − | trả <tên> về, người thay ngẫu nhiên, nết chưa rõ | hint fix |
| same | Nương theo (Trò chuyện) | chẳng được gì; nhưng thiện cảm − | thiện cảm + (real: relAdd BAL.tw.g.follow) | hint fix |
| same | Nghe ngóng chung (Dò la tin tức, maid + servants) | chẳng được gì; nhưng Tai mắt − | chờ hai khắc, <tên> đi nghe ngóng: biết một điều thật trong cung … (KIT REQUEST #8 for «chờ») | hint fix |
| jtwoway TWD gossip + topicOpts | Rỉ tai chuyện trong cung (Trò chuyện) | chẳng được gì; nhưng Danh − ; with no foe it truly gained nothing | offered only when she (or the NPC teller) resents someone above BAL.ag.why.min (one req, law 1); line «<g>kẻ ngươi ghét bị bàn tán: Danh nàng ta −1</g>»; hint «kẻ ngươi ghét bị bàn tán: Danh nàng ta −» | worded + hide-when-gainless (law 3) |
| jdoor doorHint (J2 path, same helper) | Khoe quà ngự ban · nhẹ (Khiêu khích) | (E-GAIN3b: fixed inline) | unchanged result, now through the shared helper (MUTANT=1 shows it) | refactor |
| jhouse hsvActs | Tiến cử (stage card) | x «công lao lên bậc +5» (typed 5) | «<tên> công lao +BAL.ag.par3.house.merit (đủ công thì được thăng bậc)» = the j15 tab line | law 4 + worded |
| j2.js:174 talkOpts (found after the E-GAIN3b-FIX merge, door-loss) | Tặng quà (Giao hảo) | «Thành: Không được gì thêm», hint «không được mất gì»; an empty chest opened nothing (cost-free no-op) | «chọn món trong rương · nàng quý ngươi +N (món quý nhất)», N = giftVal of her best chest item for that rival (the same number the pick rows show, j25); hint «chọn món trong rương, thiện cảm +»; empty chest → locked «rương trống» | worded (hub says what opening gets her) |

## B. Law 4 — typed gain / loss deltas inside ACT definitions
Scan `node dev/measure/act-literal-scan.js` (every j8 `A("key","Name",{…})` def body: `{stat:±N}` and `ducAdd(x,±N)`): before **15** hits → after **0**. Values unchanged (parity below).

| file:line (before) | act | before | BAL key (same value) |
|---|---|---|---|
| j8.js:137 (c + f) | poison «Hạ độc» | `duc:-10` ×2 | `BAL.actDuc.poison` = 10 |
| j8.js:153 (c + f) | musk «Bỏ xạ hương» | `duc:-8` ×2 | `BAL.actDuc.musk` = 8 |
| j9.js:216 (c) + j9.js:153 trip() | trip «Ngáng chân» | `duc:-4` ×2 | `BAL.actDuc.trip` = 4 |
| j70.js:515 (c) + :516 (f, ducAdd + fallback) | huydung «Hủy dung» | `duc:-8` ×3 | `BAL.actDuc.huydung` = 8 |
| jtsb.js:54/55 | thathu «Thả thú dữ…» | `duc:-6` ×2 | `BAL.actDuc.thathu` = 6 |
| jtsb.js:74/75 | phonghoa «Phóng hỏa kho đồ» | `duc:-8` ×2 | `BAL.actDuc.phonghoa` = 8 |
| j78.js:150 | banphe «Bán cho phe khác» | `bac:15*n` | `BAL.eff.j78.bacBanphe` = 15 |
| jface.js:185 | phatquy «Phạt quỳ» | `danh:1` | `BAL.rl.jface.danhQuy` = 1 |
| jpet.js:216 | thaopet «Hại thú nuôi» | `roll(25)`, `danh:-1` | `BAL.rl.jpet.rareP` = 25, `.danhRare` = −1 |
| j78.js:146 / :139 (found with C) | uyhiep ok / j78pay | `>=10`, `Math.min(60,…)` | `BAL.eff.j78.uyhiepMin` = 10, `.payCap` = 60 |
ACT `c` costs use getters (`get duc(){return -BAL.actDuc.k}`, the musk `get bac` pattern) because j8 loads before jbal.

## C. Disabled act card: the real reason, not the line text
rvGroups (j15:39) falls back to `a.x` when LACK (j25) has no text. In-page scan (6 states, every live rival, every ACT whose ok() is false and LACK gives ""): before **6 acts** → after **0**.

| act | before (reason shown) | after (from its ok() code) |
|---|---|---|
| trinhth Trình Thái hậu | «cần chứng cứ» (also when Thái hậu dead / target is Hoàng hậu) | «chưa có chứng cứ nào về nàng» · «Thái hậu đã băng hà» · «nàng ở ngôi Hoàng hậu, không trình Thái hậu được» |
| trinhhh Trình Hoàng hậu | «cần chứng cứ» | «trong cung chưa có Hoàng hậu» · «ngươi là Hoàng hậu: dùng «Xử tội»» · «nàng chính là Hoàng hậu» · chNeedTxt (the charge's own need) |
| uyhiep Uy hiếp đòi bạc | «cần chứng cứ» | no evidence · «nàng không đủ bạc để nộp» |
| banphe Bán cho phe khác | «cần chứng cứ» | no evidence · «không phe nào muốn mua chứng cứ về nàng» |
| tieuhuy Trả chứng cứ lấy lòng | «cần chứng cứ» | «chưa có chứng cứ nào về nàng» |
| blockf Nhờ ơn người quen rút thẻ bài | its whole x line («không tốn bạc · người quen … trả ơn …») | «chưa có người quen nào đủ thân để nhờ» · «thẻ bài của nàng đã bị rút» |

## Tests (final build = this branch, dev/index.html via assemble.py; file:// URL)
- `node dev/test/door-loss.js <url> out 755x1000@1` (NEW): **0 bad hints / 0 page errors, exit 0** (≈600 door ways, 6 states). Before (= MUTANT=1, doorHint blanked): **FAIL, 6 distinct** (Phạt vô cớ, Đổi người, Nghe ngóng chung ×2 kinds, Rỉ tai, Khoe quà ngự ban). MUTANT=2 (Phạt vô cớ without its gain): **FAIL, 1 distinct LOSS-ONLY** (Phạt vô cớ). iPad 1180x820: 426 door ways, **0 bad, 0 page errors, exit 0**.
- `node dev/test/gain-empty.js` FULL 6 states: Fold 755x1000 — **1627 cards, 0 empty, 0 page errors, exit 0**; iPad 1180x820 — **1685 cards, 0 empty, 0 page errors, exit 0**.
- `node dev/test/act-audit.js <url> out 755x1000@1 cao`: **done errs=0, exit 0** (666 runs; «Phạt vô cớ» option card: «Được: răn đe: tám tuần kẻ hầu sợ chủ, cung khác khó mua chuộc …» · «Mất: thiện cảm −−−, Đức −−»).
- `node dev/test/egain3c-parity.js .tmp/old.html dev/index.html` (old = origin/main 611fca61 build): **64 same, 0 different** (every ACT `c` with getters read + the f-side moved numbers).
- `node dev/test/oldsave-r1.js` (old = origin/main 611fca61): **16 / 16** (755x1000, 1180x820, 1366x1024; loads, tabs, no overflow, 0 page errors).
- `node dev/measure/act-literal-scan.js`: 15 → **0**, exit 0. (C) LACK scan: 6 → **0**.
- Răn đe run (toi): bribe odds 23 → 8 → 23 (8 weeks); NPC servDo phat sets the NPC's dread; save→load keeps `dreadW`.

### Final run after the E-GAIN3b-FIX merge (this sha; dev/index.html via assemble.py, file://)
| test | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| gain-empty, 6 states | **1401 cards, 0 empty, 0 page errors** | **1441 cards, 0 empty, 0 page errors** |
| door-row-hint (fixer's base↔head row diff) | **6789 rows, 78 changed, 0 bad**; MUTANT=1 exit 1 (168 bad) | **6663 rows, 66 changed, 0 bad** |
| door-loss (new) | **0 bad**; MUTANT=1 exit 1, MUTANT=2 exit 1 | **628 ways, 0 bad** |
| act-audit cao | done errs=0 | — |
| parity vs origin/main 611fca61 | 64 same, 0 different | — |
| act-literal-scan | 0 typed deltas | — |
| old save oldsave-r1 | 16 / 16 (755x1000, 1180x820, 1366x1024) | |
(The run before the merge: Fold 1627 / iPad 1685 cards, 0 empty — card counts follow the random states.)

## Merge of E-GAIN3b-FIX (review/e-gain3b 76821d10, code 5e26fc81)
Merged into this branch; one conflict (jdoor.js J2 PEND.door member line): kept the fixer's `c:a.c` and its gate, through the shared helper. `doorHint(a,x)` (both door paths) now = (1) `DOOR.rowHint(a,x,lv)` — the fixer's gate: the row's own line first, the way's own hint only when it names a REAL gain (DOOR.hintGain: never a need text, a tip, a stat she pays); (2) only when that still says nothing gained and the way's OWN line shows a green gain (doorGain = the card's «Được»): that gain leads, «nhưng …» = the kit hint of the line without its green pieces. The talk-door path (no `acts`: Trò chuyện / Thưởng phạt / Dò la …) gets the same gate.
Base↔head door-row diff (the reviewer's ask) = `dev/test/door-row-hint.js` (compares every row's hint with its base hint): see Tests.

## Found, not fixed (separate families)
1. Module-local number tables typed in code (law 4, a wider family than ACT defs): e.g. jface.js:80 `FXF={…tat:3,tatDuc:-2,tatRel:-20,phatDuc:-1,…}`, j9 trip `roll(25)` / `suc:-15` (miscarry), j8/j9 odds formulas `odA(a,38+…)`, j24 svDefect `fx:{bac:-20}`. Needs its own scan + move.
2. «Bại: nàng mang hận» on Phạt vô cớ: the grudge is certain, the stage card puts it under `risk` (shown «Bại»). Pre-existing.
3. KIT REQUESTs #6–#8 (kitHint misreads; worked around per caller, kit untouched).

## Result
SMALL/BIG: **BIG** — one rule change (Phạt vô cớ = răn đe, new BAL.ag.bt.dread, both sides) + Rỉ tai offered only with a foe (req change, both sides) + new BAL keys with unchanged values (actDuc ×6, eff.j78 ×3, rl.jface.danhQuy, rl.jpet ×2; removed duplicate house.phatDuc) + wording / reasons in jdoor, jhouse, j24, j10, jagknow, j29, jtwoway, j78, jecon, j8, j9, j70, jtsb, jface, jpet; new tests door-loss.js, egain3c-parity.js, measure act-literal-scan.js; KIT_REQUESTS.md (#6–#8). No kit internals, no index.html / sw.js / assets.json.
EOF