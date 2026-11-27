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
