# E-GAIN3b — law 3: real «Được» on every act card (successor of E-GAIN3, MAIN 171)

PRIORITY #1 CHECK: OD 0 new (law 2 27/11 ~00:46Z, law 3 18/11 ~09:20Z, OD 26/11 ~17:55Z «Tốn: không» stays; no ruling on «Khoe quà ngự ban») | main: jdoor.js doorFold/doorGain (E-GAIN3), jtwoway.js TWD flaunt/provoke, j2.js:175 rival Khiêu khích (w:{danh:BAL.talk.provoke.danh}), j63 kaRows/kaBody (kit, NOT changed), j19 kcls (kit, NOT changed) | review/*: review/e-gain3 23b44074 (base, report §5), review/kk54-plaque (census) | claims: E-GAIN3 (done) → E-GAIN3b.
KIT CHECK: reuses kaRows/kcls rows (Thành / Được / Kèm), the writer's explicit class `<span class="g">` (kit KP12, j63 kaSent «the writer's explicit class g/r beats the word-meaning colouring»), doorGain (jdoor, door engine). No kit internal touched (j63, j19, jk2b, jopic unchanged).

Branch review/e-gain3b from origin/review/e-gain3 23b44074. START_CTX ~8 %.

## 0. §5.0 — the «cao» state, reproduced and explained
`node dev/test/gain-empty.js <url> cao` on 23b44074: **3 distinct empty** (Khiêu khích · Hạ uy thế · Ra uy, pop-up of the rival met at home, home#2 / place:thu#2 / place:dtd#2). Cause, read in the page (one rival per kind, every way of each door):
- **The door read only each way's `x`.** doorFold (jdoor.js) fed doorGain with `x` alone, but many talk ways keep their gain in `w` or in a «thành:» of their own line (optLine): «Khiêu khích» = `w:{danh:BAL.talk.provoke.danh}` (Danh +1, j2.js:175) with `x` = «thiện cảm −15, oán ta +9, nàng ta ghen +10» (all red); «Vu oan» `x` = «lộ: Danh −15 · Đức −5» while its line says «thành: nàng mất Danh và Sủng −10; Danh +3»; same for «Ngáng chân» (x «nàng bẽ mặt»), «Hặc ăn mặc sai phẩm» / «Tố xa xỉ» (x = the need text). When the rival out-ranks her (no «Hạ nhục»), P6 had only «Khoe quà ngự ban» + «Khiêu khích» → nothing green from `x` → empty door. Same root for the empty Hạ uy thế / Ra uy there.
- **So «Khiêu khích» is NOT cost-only**: it really gives Danh +BAL.talk.provoke.danh (run: talk applies `w`). E-GAIN3 §5.0 read it from `x`.
- **The real cost-only way is «Khoe quà ngự ban»** (P6, tier nhẹ): her card said «Thành: Không được gì thêm · Kèm: mọi phi tần ghen +»; the code (TWD flaunt) only raised every rival's ghen (+ Kiệm/Khiêm −1 in jtrong). The scan missed it because the dialog hint word «chẳng được gì» was counted as a gain (KIT REQUEST 27/11 #4).

### Rule call (BIG): «Khoe quà ngự ban» gains Danh, no merge
- Chosen: **gain**. `BAL.tw.g.flauntDanh = 1`; TWD flaunt run `twAp(a,{danh:G().flauntDanh})` for ANY doer (her and an NPC: law 1, same deed same effect); her option line «Danh +1 · mọi phi tần ghen +2» (both from BAL.tw.g).
- Why not merge: (a) the brief's merge target was «Khiêu khích» → «Hạ nhục», but Khiêu khích already gains (above), and «Hạ nhục» needs her rank ≥ the rival's, so for a higher rival a merge would leave NO way at all; (b) «Khoe quà ngự ban» is a two-way deed NPCs do (j28 SOC / jagent flaunt) — law 1 forbids dropping her copy.
- Law 2 (P6 «Khiêu khích» door, one matter = show her standing over the rival): **nhẹ** Khoe quà ngự ban — Tốn 1 khắc, Được Danh +, Mất: a small jealousy spread over everyone (ghen +2 each, no one aimed at); **vừa** Khiêu khích / Trút giận — Tốn 1 khắc, Được Danh + and ONE rival stung (her ghen +10 → pushed toward a rash act), Mất: that rival's regard −15 and her oán; **nặng** Hạ nhục — Tốn Danh 1, Được the rival's Danh −2, Mất her oán +10. Cost and result rise together; nhẹ stays the smallest of each.
- Danh = public standing (the throne's favour seen by the whole palace) is the gain the drama gives a flaunt; it is the smallest unit (+1).

## 1. Table (producer | card | before | after | kind)
| producer | card | before | after | kind |
|---|---|---|---|---|
| jdoor.js doorFold (pop-up talk doors, whole family) | Khiêu khích (P6) | empty Được (rival above her) | «được: Danh +» | worded (doorGain path: a way whose `x` names no gain is read from its own optLine) |
| same | Hạ uy thế (P8) | empty when only Vu oan / Tung tin đồn read from `x` | «Danh nàng −−− ; nàng mất Danh và Sủng −−−» | worded |
| same | Ra uy (P14), Hãm hại (P7), Tố cáo (P11) pop-up | empty in the same states (x = need text / «nàng bẽ mặt») | «nàng vấp ngã: Danh nàng −−» · «Danh ++ ; nàng bị quở: …» | worded (law 11) |
| jdoor.js doorGain | every door card | a red piece of a rolled «Thành» could be taken («thiện cảm −−−» of Phạt vô cớ); a piece «Danh +, thiện cảm −−−, oán ta ++» printed whole; «nàng quý ngươi −−» (Bàn tán) taken as gain | Thành: green pieces only; a piece keeps only its leading gains (kit kaSent, read-only; a list about «nàng» = the target stays whole); «… quý ngươi / thiện cảm / tin ngươi −» never a gain | fix (no fake gain) |
| jtwoway.js TWD flaunt + topicOpts add | Khoe quà ngự ban (P6 nhẹ) | «Thành: Không được gì thêm · Kèm: mọi phi tần ghen +» (cost-only) | «Được: Danh + · Kèm: mọi phi tần ghen +»; real Danh +BAL.tw.g.flauntDanh (both sides) | **RULE (BIG)** |
| j2.js:175 (no change) | Khiêu khích way | — | real Danh +BAL.talk.provoke.danh, now shown on the door | none (scanner artefact of E-GAIN3) |
| j30.js xinhh x | Xin Hoàng hậu giáng | «Thành: Không được gì thêm · Kèm: nàng bị giáng một phẩm» | «Thành: nàng bị giáng một phẩm» | worded (explicit green) |
| j30.js tocao x + jcharge.js AOUT.tocao | Tố tội thật | «Thành: Không được gì thêm» | «Thành: <tên> <hình phạt> (or «nàng chịu phạt theo tội ấy») · Danh +» (f: `ap(a,{danh:BAL.eff.j30.danhTocao})`) | worded (real Danh was hidden) |
| jcharge.js AOUT.accuse (same family) | Tố giác | punishment in red Kèm, Danh + in Thành | punishment + Danh in Thành | worded (law 11) |
| j78.js j78out trinhhh | Trình Hoàng hậu | «Thành: Không được gì thêm · Kèm: <tên> chịu phạt theo tội» | «Thành: <tên> chịu phạt theo tội» (or the charge's chPunTxt) | worded |
| jpoison.js pgift x | Tặng quà ăn có độc | «Thành: Không được gì thêm … Kèm: nàng trúng độc nếu ăn» | «Thành: nàng trúng độc nếu ăn» | worded |
| j70.js huydung x (found by scan) | Hủy dung | «Thành: Không được gì thêm … Kèm: Sắc nàng giảm mạnh, ân sủng giảm» | «Thành: Sắc nàng giảm mạnh, ân sủng giảm» | worded (law 11) |
| jtsb.js thathu x (same wording family) | Thả thú dữ làm hại dung nhan | text without «thành:» (Kèm) | «Thành: Sắc nàng giảm mạnh tới khi lành, Sủng và Danh giảm» | worded (law 11) |
| jface.js AOUT.tat / AOUT.phatquy | Ra uy door (Tát · nhẹ, Phạt quỳ · vừa) | Fold full run: «Ra uy» empty (cao home#1, hh place#2): «nàng quỳ phạt: Sức −−, đi lại chậm một tuần» read red | target harm in explicit green; doorGain also takes a plain-text «thành / kèm» piece whose subject is the target («nàng …», «Sắc nàng …») and that is no hostility / risk (oán, ghen, thù, nghi, nắm, quý ngươi, thiện cảm, biết, đoán, khai) — door cards built from card buttons read their plain text | worded |
| jdoor.js PEND.door rows (door dialog) + DOOR.rowsJ2 | every way row in a pop-up door dialog | the row hint came from the way's optLine (numbers already marks) → kitHint «chẳng được gì» (Khoe quà ngự ban, Khiêu khích · vừa, Vu oan · nặng); P5 «Dò la › Dò la» (x = «Bạc −15» only) EMPTY on Fold full run (Foreman E / reviewer §3 4th empty) | the row carries `hint` = kitHint of the way itself, or of its full line when that names no gain: «Danh +; nhưng Phi tần ghen +», «Chứng cứ +, Tâm cơ +» | worded |
| jaudit.js talkOpts wrapper | Khiêu khích way | `pvRel(v,-15)`, «ghen +10» typed | BAL.talk.provoke.rel / .ghen | law 4 |
| j10.js jointScheme + facHTML | Hợp mưu hạ <X> | `ap(m,{tamco:1})` typed; card «thành: X bị cả phe tố tội …» only | `BAL.eff.j10.tamcoJoint` (=1, jbaleff); card «Thành: X bị cả phe tố tội, bị trị tội · Tâm cơ +» | law 4 + worded |
Scan (law 11): every consort-card act (rvGroups, raw members, all 6 states, every live rival): before **6 producers** print «Thành: Không được gì thêm» (tocao, trinhhh, xinhh, huydung, pgift; accuse with red Kèm) → after **0**. All ACT keys with a card line: only pmplay / pmduel keep an empty Thành in a bare actLine — they are NPC / co-op only (jpma, jcoopworld ASK); her own «Cùng chơi / Thách đấu» door shows «hai bên quý nhau thêm ; lấy cược của nàng».

## 2. KIT REQUESTs (dev/kit/KIT_REQUESTS.md «27/11 E-GAIN3b», NOT changed here, law 9)
1. §5.2 j63.js:80 kaRows: a paid «Chứng cứ n» under «tốn:» → green «Được».
2. §5.3 jk2b.js:248 MARK_NUM: «+1,1» → «+,1» (decimal comma).
3. j19.js:27 kcls: «nàng quý ngươi −−» coloured as a gain (Bàn tán về <X>).
4. jk2b.js:231/:314 kitHintSign/kitHint: «một phi tần khác Danh −1» (Rỉ tai) → «chẳng được gì; nhưng Danh −»; + gain-empty.js should then count «chẳng được gì» as empty.
5. jk2b.js:217 kitOptModel reads dilLineRaw, never a talk option's `w` (Khiêu khích Danh + missing from its hint; whole family: talk options with `w`).

## 3. Tests
All on the final build (96eb9ee2 sources, dev/index.html via assemble.py; shots none needed — wording only, kit rows unchanged):
- `node dev/test/gain-empty.js <url> out 755x1000@1` (6 states dau/toi/cao/con/hau/hh, Fold): **1527 cards, 0 empty, 0 page errors, exit 0**.
- same, iPad `1180x820@1`: **1634 cards, 0 empty, 0 page errors, exit 0**.
- Before (23b44074, cao): 3 distinct empty (Khiêu khích, Hạ uy thế, Ra uy); reviewer full runs also the 4th «Dò la»; my intermediate full runs found «Ra uy» (Fold cao home#1, iPad hh place#2) and «Dò la › Dò la» (Fold hau home#2) → both fixed above.
- Mutant `MUTANT=1 … toi` (doorGain blanked): **FAIL, exit 1** (5 distinct: Hãm hại, Hạ uy thế, Học, Mua đồ, Tố cáo).
- act-audit smoke `node dev/test/act-audit.js <url> out.jsonl 755x1000@1 cao`: 626 runs, done errs=0, exit 0; «Khoe quà ngự ban» run: real S.danh 60→61 = card «Danh +» (+ every rival ghen +1..2 as Kèm).
- Old save: `node dev/test/oldsave-r1.js` (old = origin/main 4cd3f974 dev build): **16 / 16** (755x1000, 1180x820, 1366x1024; loads, tabs, no overflow, 0 page errors).
- Consort-card scan (rvGroups raw members, 6 states, every live rival): «Thành: Không được gì thêm» 6 producers → 0.
- Report-only (detector hole, KIT REQUEST #4): dialog hint rows still saying «chẳng được gì» on the final runs — Trò chuyện › Nương theo / Rỉ tai chuyện trong cung, Dò la tin tức › Nghe ngóng chung, Thưởng phạt › Phạt vô cớ / Đổi người (J4 / servant doors, kit hint sign; «Phạt vô cớ» also a law-3 rule candidate).

## 4. Result
SMALL/BIG: **BIG** — one rule change (Khoe quà ngự ban gains Danh +BAL.tw.g.flauntDanh for every doer, new BAL key) + one new BAL key (BAL.eff.j10.tamcoJoint, value unchanged) + wording in jdoor.js, j30.js, jcharge.js, j78.js, jpoison.js, j70.js, jtsb.js, jface.js, jaudit.js, j10.js; KIT_REQUESTS.md (5 requests). No kit internals, no index.html / sw.js / assets.json.
Found, not fixed (separate): a disabled act card whose reason falls back to its `x` (rvGroups `why=a.x` when no LACK text) shows the line text as the reason (pre-existing, e.g. «Tố tội thật» needing evidence); «Phạt vô cớ» (servant, jhouse.js:46) shows only losses (law 3 candidate, needs a rule call); j70 huydung `duc:-8` typed (law 4).

## FIX (E-GAIN3b-FIX)
PRIORITY #1 CHECK: OD 0 new | main 17835565 (no DOOR.rowHint / flauntDanh) | review/* review/e-gain3b 78c8608a (base of this fix) + review/e-gain3 23b44074 (rv PASS) + review/e-gain3c (built on 78c8608a) | claims E-GAIN3b (FAIL) → E-GAIN3b-FIX.
KIT CHECK: reuses kitHint / kitHintSign / kaSent (jk2b / j63, called read-only with caller data), the kit row HTML of optLine (read, not changed), doorGain's target reading. No kit internal touched (j63, j19, jk2b, jopic unchanged); no CSS / part added (kit-std-scan not run).
START_CTX ~6 %.

### FAIL 1 — door-dialog row hint (jdoor.js, whole family = every pop-up door row, law 11)
Cause: 8c3ce425 / 96eb9ee2 made every pop-up door row take `kitHint(raw way)` whenever it was not «chẳng được gì», so the raw way's `x` (a NEED text, a tip, a stat she pays) won over the row's right hint.
Fix (`DOOR.rowHint`, jdoor.js): (1) FIRST the row's own line = the base hint (kitHint of {n, x = optLine}); (2) only when that says nothing gained («chẳng được gì» / «không được mất gì» / empty) the way's own hint, then the hint of its full data, and ONLY if `DOOR.hintGain` says it names a REAL gain: a stat with + marks she does not pay for (`a.c`), or a harm to the target («Danh nàng −−», «nàng bị quở …»); a need text («cần …») / tip («có … thì khỏi …») never; otherwise the base hint stays. (3) Same family, found by the new scan: a row whose optLine is already kit HTML (Hạ nhục, Nghe lén câu chuyện, Khiêu khích in some states) glued the row heads into the hint on base too («Danh nàng −−Bạichỉ uổng công·không mất gì khác», «Tốnmột khắcThànhbiết …») — `DOOR.lineOf` reads that HTML as a labelled line (Tốn left out; a price inside a rolled Thành stays «nhưng …»; a «Bại» with no odds word left out; a target-harm piece of Mất/Bại/Kèm is the gain, as doorGain reads it). Card-mode rows (DOOR.cardM) carry no hint and are untouched.

Row table, every pop-up door-dialog row (lv 1, most common hint; Fold 755x1000 full 6-state runs of dev/test/door-row-hint.js on each build; «—» = row not met in that run's random states; hỏng-part cut for width):
| door › row (pop-up) | base 23b44074 | head 78c8608a | fix |
|---|---|---|---|
| P11 › Hặc ăn mặc sai phẩm | «Bị phạt −, Danh ++; nhưng Bị phạt +» | «cần nguyên cớ: đã nghe người nhận xét, hoặc tai mắt báo nàng mặc sai phẩm, hoặc phòng nàng» | «Bị phạt −, Danh ++; Có cơ» |
| P11 › Tố xa xỉ | «Bị phạt −−, tháo món xa xỉ nhất; nhưng Danh −−» | «cần đã thấy (cùng chỗ, hoặc dò la): nàng ăn mặc quá mức của phẩm mình, hoặc phòng nàng bày» | «Bị phạt −−, tháo món xa xỉ nhất; Có cơ» |
| P14 › Phạt quỳ · vừa | «Đức +; Rất vững; nhưng oán +» | «Đức +; Rất vững; nhưng oán +» | «Đức +; Rất vững; nhưng oán +» |
| P14 › Tát · nhẹ | «Sắc +; Rất vững; nhưng oán +» | «Sắc +; Rất vững; nhưng oán +» | «Sắc +; Rất vững; nhưng oán +» |
| P5 › Dò la | «Chứng cứ +, Tâm cơ ++» | «Chứng cứ +, Tâm cơ ++; Có cơ» | «Chứng cứ +, Tâm cơ ++» |
| P5 › Nghe lén câu chuyện | — | «biết một điều thật về nàng, Chứng cứ +» | — |
| P6 › Hạ nhục · nặng | «Danh nàng −−Bạinàng ta chuộng giản dị: quý ta +; nhưng oán +» | «Danh ++; nhưng oán ++» | «Danh nàng −−; Rất vững; nhưng oán +» |
| P6 › Khiêu khích · vừa | «Danh +; nhưng thiện cảm −−−, oán ta ++, oán +» | «Danh +; nhưng thiện cảm −−−, oán ta ++, oán +» | «Danh +; Rất vững; nhưng thiện cảm −−−, oán ta ++» |
| P6 › Khoe quà ngự ban · nhẹ | «chẳng được gì; nhưng Phi tần ghen +» | «Danh +; nhưng Phi tần ghen +» | «Danh +; Rất vững; nhưng mọi phi tần ghen +» |
| P7 › Hạ độc · nặng | «nàng trúng độc, nàng không chết (có thuốc giải); nhưng Đức −−−, Chứng cứ −» | «có Hạc đỉnh hồng thì khỏi mua thạch tín; nhưng lộ: tội chết — năm đầu được tha một lần: gi» | «nàng trúng độc, nàng không chết (có thuốc giải); nhưng Đức −−−, Chứng cứ −» |
| P7 › Hắt trà · nhẹ | «Đức +, áo nàng loang vết trà, phấn son lem; Rất vững» | «Đức +, áo nàng loang vết trà, phấn son lem; Rất vững; nhưng Đức −−» | — |
| P7 › Ngáng chân · nhẹ | «Danh ++; nhưng Đức −−» | — | «Danh ++; nhưng Đức −−» |
| P7 › Quạt mực · nhẹ | — | «Đức +, mặt nàng lem mực; Rất vững» | «Đức +, mặt nàng lem mực; Rất vững; nhưng Đức −−» |
| P8 › Tung tin đồn · nhẹ | «Danh +++; nhưng Chứng cứ −, thiện cảm −−» | «Danh +++» | «Danh +++; nhưng Chứng cứ −, thiện cảm −−» |
| P8 › Vu oan · nặng | «Sủng +++, Danh ++; nhưng bị người của nàng phát giác, Chứng cứ −» | «Sủng +++, Danh ++; Khó lường; nhưng bị người của nàng phát giác, Chứng cứ −» | «Sủng +++, Danh ++; nhưng bị người của nàng phát giác, Chứng cứ −» |
Card-mode rows (51 distinct): hint sets base = head = fix up to state noise (servant names in «Chủ tin với …», odds bands); the only real text changes there are E-GAIN3b's own card wordings (Tố tội thật «chẳng được gì» → «Danh ++», Tặng quà ăn có độc → «nàng trúng độc nếu ăn»).
Nghe lén câu chuyện (rare state; unit check on the final build with its kit HTML line): base «Tốnmột khắcThànhbiết một điều thật về nàng, Chứng cứ +» → fix «biết một điều thật về nàng, Chứng cứ +; Rất vững».

New check `dev/test/door-row-hint.js` (every row of every door dialog, pop-up + card mode, 3 clarity levels, 6 states): a row passes when its hint = the base hint, or names a real gain, or is the base gain cleaned (same pieces, heads no longer glued).
| build | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| base 23b44074 | 6777 rows, 0 bad, 0 page errors | — |
| head 78c8608a | 6633 rows, **134 bad (15 distinct: Hặc ăn mặc sai phẩm / Tố xa xỉ need text, Hạ độc · nặng tip, Hạ nhục «Danh ++», …)**, exit 1 | — |
| fix (final) | 6987 rows, 96 changed, **0 bad**, 0 page errors, exit 0 | 6780 rows, 60 changed, **0 bad**, 0 page errors, exit 0 |
| fix + MUTANT=1 (DOOR.rowHint = the 78c8608a rule) | **exit 1** (14 distinct, dau+cao) | — |

### FAIL 2 — Danh balance run (BAL.tw.g.flauntDanh 0 vs 1)
Bot: dev/measure/run_par.js `sens` (life-long sensible bot) + mkinp.sh (inpage6 + inx + inpz + inty + inpromo + inbirth) + MORE=indanh + EXTRA infl.js (scratch, not committed: sets BAL.tw.g.flauntDanh per arm, counts every TW flaunt run by doer, NPC Danh mean / max / count at 100 at the indanh DT checkpoints), cap 144 tuần, HH-STOP, seeds 501 / 777 / 901, same seeds both arms, final build.
| | flauntDanh 0 | flauntDanh 1 |
|---|---|---|
| lives with ≥12 tuần | 10 | 11 |
| flaunts per life her / NPC | 0.0 / 5.5 | 0.0 / 2.5 |
| her Danh @ tuần 12 | 39.2 (n=10) | 43.5 (n=11) |
| her Danh @ tuần 24 | 46.5 (n=10) | 56.1 (n=11) |
| her Danh @ tuần 48 | 42.8 (n=9) | 54.8 (n=10) |
| her Danh @ tuần 72 | 52.9 (n=9) | 62.1 (n=9) |
| her Danh @ tuần 96 | 64.8 (n=9) | 62.9 (n=9) |
| her Danh @ tuần 120 | 68.2 (n=8) | 67.7 (n=9) |
| her Danh @ tuần 144 | 71.8 (n=8) | 74.9 (n=7) |
| NPC Danh mean / max / at 100 @ tuần 12 | 41.5 / 91 / 0 | 41.1 / 89 / 0 |
| NPC Danh mean / max / at 100 @ tuần 24 | 45.3 / 97 / 0 | 44.1 / 90 / 0 |
| NPC Danh mean / max / at 100 @ tuần 48 | 44.8 / 87 / 0 | 44.9 / 85 / 0 |
| NPC Danh mean / max / at 100 @ tuần 72 | 40.8 / 89 / 0 | 41.2 / 89 / 0 |
| NPC Danh mean / max / at 100 @ tuần 96 | 39.5 / 89 / 0 | 35.8 / 83 / 0 |
| NPC Danh mean / max / at 100 @ tuần 120 | 37.4 / 75 / 0 | 34.5 / 88 / 0 |
| NPC Danh mean / max / at 100 @ tuần 144 | 35.6 / 74 / 0 | 31.5 / 64 / 0 |
| her Danh at end | 72.1 (n=9) | 68.4 (n=9) |
| reached Hoàng hậu | 1/10 | 2/11 |

Lives = lives that reached tuần 12 (the rest end in the selection, both arms alike), seeds 501 + 777 + 901 pooled (the 777 / 901 runs were stopped part-way: 21 lives in all). Judgment: **no runaway.** NPC Danh mean stays 31–45 at every checkpoint in both arms (arm 1 is not higher: 41.1 vs 41.5 at tuần 12, 31.5 vs 35.6 at tuần 144), max ≤ 97 / ≤ 90, **0 NPCs at 100** in either arm; an NPC flaunts 2.5–5.5 times per life (TW flaunt run counts), so the rule adds at most ≈ +3–5 Danh per flaunting NPC per life, inside the drift of every other Danh source. Her side: the sensible bot never chooses «Khoe quà ngự ban» (0 runs both arms), so her Danh gaps (e.g. tuần 24: 46.5 vs 56.1) are seed-chain drift (the two arms diverge as soon as an NPC flaunt changes state), not this rule; by hand her gain is +1 Danh per flaunt for 1 khắc, gated by Sủng ≥ 40 — the smallest unit, below Khiêu khích (+1 and a rival stung) and far below a Hành sự Danh card. **No BAL change** (flauntDanh stays 1). Note kept from the review: the NPC agent's utility for flaunt still values only spite (jagent.js:108), so NPCs do not flaunt more often because of this rule.

### Tests (final build, assemble.py → dev/index.html; index.html / sw.js / assets.json not committed)
| test | result |
|---|---|
| gain-empty FULL 6 states Fold 755x1000 | **1531 cards, 0 empty, 0 page errors, exit 0** |
| gain-empty FULL 6 states iPad 1180x820 | **1509 cards, 0 empty, 0 page errors, exit 0** |
| (before, same run) base 23b44074 Fold / iPad | 34 / 14 runs empty, 4 distinct (Dò la, Hạ uy thế, Khiêu khích, Ra uy), exit 1 |
| (before) head 78c8608a Fold / iPad | 0 / 0 empty (1497 / 1391 cards) |
| door-row-hint (new) Fold + iPad, mutant | see table above (0 bad; mutant exit 1) |
| act-audit 755x1000 cao | 740 runs, done errs=0, exit 0 |
| old save (origin/main 17835565 build → fix) oldsave-r1 | **16 / 16**, 0 page errors (755x1000, 1180x820, 1366x1024) |
| charge-smoke | 0 page errors, exit 0 |
| odds-one-row | 755x1000 / 1180x820 / 390x844 PASS, exit 0 |
| fac-parity-play | 17 ok, ALL PASS |
| role-parity-drift2-play | 11 ok, ALL PASS |

### Found, not fixed (report-only)
- Kit hint readings that are wrong on base too (KIT REQUEST 27/11 E-GAIN3b #4 family, kit internals, law 9): card-mode rows «Hạ độc / Hủy dung / Hắt trà … · Đức +, Bạc +» (the kit reads the servant runner's side lines as her gain), «Trình Hoàng hậu · chẳng được gì» (the green «<tên> chịu phạt theo tội» is read as a loss), pop-up «Tung tin đồn · Danh +++» / «Vu oan · Sủng +++, Danh ++» (the kit drops the subject «nàng»: it is the rival's Danh / Sủng that falls). The new test takes these as the base reference; they need the kit keeper.
- The pop-up «Hạ nhục» row card itself shows «Danh nàng −−» in its red Mất row (kit kaRows colouring; the hint now names it as the gain).
