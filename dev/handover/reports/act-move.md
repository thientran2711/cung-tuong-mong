# ACT-MOVE report + HANDOVER (worker ACT-MOVE, MAIN CHÍNH 168) — rolled at ctx limit before code

PRIORITY #1 CHECK: see act-move-plan.md (same branch) + OD 27/11 ~00:42Z (2 card buttons, palace-bound vs person-bound) + ~00:46Z (3-tier law; Phô tài vs Xin hầu cờ/đánh đàn NOT merged here → note for Foreman E tier audit).
State: review/act-move = LIVE a22cf45d + plan + inventory only. MAIN 168 PLAN OK (00:38Z): Q1 = (a) no Hành sự strip (Hành sự person acts = tap people on her current stage → same pop-up); Q2 = remote «sai người» ways stay inside their door, door opens from the target's pop-up or at her palace. KK51-P (review/kit-person-panel, jkpp.js last module) builds the card UI incl. the 2 buttons; ACT-MOVE wires their targets.

## Design for the successor (all hooks exist on LIVE — verified in code)
1. Card buttons = EXISTING buttons (j21.js): «Tìm gặp» = `seeBtn(v)` (data-see → goSee; shown when `locKnown(v)`) else `scoutBtn(v)` (data-scout «Sai tai mắt dò nơi ở»); «Ghé cung» = the visit button (j21.js:85, data-visit → visitPal → palaceOf(v)). Give KK51-P one function `amCardBtns(v)` → [Tìm gặp, Ghé cung] html (retitle only; handlers unchanged). Emperor card: Tìm gặp = courtMeet go/yết kiến button (jgift.js:159, data-kgmgo / data-acask on `S.where.emp`); Thái hậu: «Sang Đức Thọ cung» (same function).
2. Classification table (ONE core: put in jbaldf.js beside `BAL.df.inPerson`, e.g. `BAL.df.palace` / `BAL.df.person`):
   PALACE-bound (offered when S.place === palaceOf(v), owner present OR absent): gift, petcare, plant, rash, bribe, bribel, laydo, laydol, giahoa, thaopet, petsteal, thathu, phonghoa, poison, slowpoison, musk, huydung, spy (Nghe lén/Dò la), kpoison, catswap, pgift.
   PERSON-bound (only when together(S,v)): ally, trip, tat, phatquy, nuoc, tea, ink, pushp (vuon), batnat, takeaway, pond, kframe, ksab, rumor, frame, lygian, accuse, tocao, expose, vp, xx, uyhiep, banphe, tieuhuy, spyk, + Quyền Hoàng hậu e-keys judge/conf/reward/pardon/cutpay (rank ≥ 7).
   Bound to another person: block/blockf (Rút thẻ bài) → Kính sự phòng pop-up; xinhh / trinhhh → Hoàng hậu pop-up; trinhth → Thái hậu pop-up (target picked inside). Successor: sanity-check each a.ok / doAct path; if a key's doAct still refuses away from together, say so in report, don't rewrite the act.
   (runtime key list: /tmp dump = every ACT key of RVGRP + doors P5–P14 + inPerson; 54 keys, all present in ACT.)
3. Pipe: `dfInPerson(p)` (jdf.js:35) + `DOOR.more` (jdf.js:130) today accept kinds rival/hh, keys = BAL.df.inPerson, gate together(). Wrap both in a new module (e.g. dev/build/jamove.js, after jdf/jdoor in assemble.py, before jkpp): rival/hh → PERSON keys if together ∪ PALACE keys if at her palace; kind `chest` (j2.js:147, appears at her palace when she is out, ref = owner) → PALACE keys. Add kinds rival, hh, chest to doors P5–P14 (jdoor.js:182–197; P10 Lấy của, P12 Mặc cả, P13 Quyền HH are kind `card` only today); add `acts:{a:["ally","gift","petcare"]}` to door gh «Giao hảo». Doors already fold members by tier (nhẹ/vừa/nặng); a row with a single member falls back to a standalone act in dfActs (jdf.js:66). Keep the a.ok + k61Named locks.
4. Emperor/Thái hậu (OVERWRITTEN by OD 27/11 ~00:54Z — read that row verbatim before coding): his pop-up = exactly 6 moves, tiers nhẹ/vừa/nặng inside each, no copies: Hiến nghệ (ONE button for all arts, her best / his favourite; absorbs Phô tài <môn>, Xin hầu cờ, Xin đánh đàn hầu ngài, Đánh đàn ở ngự hoa viên — KM_EMPACT jgift.js:200 minigames become ways inside it) · Dâng lễ vật (absorbs Dâng quà data-kgmgive + Dâng một cành hoa) · Hầu chuyện (door «hau», jdoor) · Chặn ngự giá · Xin ân điển · Đút lót lật thẻ. Build as a door like jdoor P-rows (kinds emp) fed by a popCard (j15.js:84) wrap; dfActs reads popCard's DOM so the focus view follows. Thái hậu pop-up: + Dâng lễ vật.
5. Cung nhân: serv/maid pop-up already has 5/6 (add «Chọn làm cung nữ thân cận», jcoopthinf.js:202). Household acts (Thêm người jactj4:68, Cài người vào cung khác / Chưởng sự tra xét j15:74) + «Mời đến cung ta» (inviteBtn j21) → Hành sự deck as existing buttons. Hoàng tự (j25 kidActs, j15:59): kid pop-up where the kid is per schedule (check kind `kid` in curPeople) — if kids never appear on stage, report it to MAIN as a gap (don't invent schedules).
6. Card act groups: KK51-P's jkpp strips them (info only). Until it lands, test with a flag that hides rvGroups/courtMeet/kidActs groups on Hậu cung cards only.
7. Robot `dev/test/act-move-reach.js`: baseline = every act key/name offered on LIVE in Hậu cung cards (dev/tools/act-inventory.js scan, file act-move-inv-a22cf45d.txt) → assert each is offered on a Dư đồ pop-up (person when together; palace/chest at palaceOf) over AA.scen dau/cao/hh/con × 4 buổi; assert absent person not actable face-to-face; palace acts reachable via «Ghé cung». Then Fold 755x1000 + iPad 1180x820 mp4 (Hậu cung → Ghé cung → chest/owner pop-up → act; Tìm gặp → person → act; Emperor) → LOOK READY to MAIN 168 → RV-163D.
~15 % this task / ~0 % in game.

---
# ACT-MOVE-2 report + HANDOVER (rolled at ctx limit; batch 1 built + robot PASS, video + batch 2 open)
PRIORITY #1 CHECK: OD 27/11 ~00:13Z/~00:15Z/~00:32Z/~00:42Z/~00:46Z/~00:54Z/~01:00Z read verbatim | main a22cf45d: jdf.js:35 dfInPerson, jdf.js DOOR.more, jdoor.js:182 P5–P14, jgift.js:159 courtMeet/:200 KM_EMPACT, j21 seeBtn/scoutBtn/visitBtn, j2.js:147 chest | review/act-move 82a3ef02 (plan) | claims KK51-P owns the card LOOK (not touched: content only via pcard groups).
## Built (commit ce8e8103 on review/act-move, from LIVE a22cf45d)
- `dev/build/jamove.js` (LAST module in assemble.py; KK51-P's jkpp goes AFTER it). Lists in `jbaldf.js`: `BAL.df.person / palace / either / personE`.
  - dfInPerson + DOOR.more replaced: rival/hh pop-up → PERSON (+EITHER, +personE) keys when together; at her palace (palaceOf) → PALACE (+EITHER) keys, owner home (her pop-up) or out (chest). Greyed card members keep their reason; same-name talk members are not doubled; j61 name lock + «done this visit» kept.
  - Doors P5,P7–P14 kinds += rival,hh,chest; «Giao hảo» gh += acts ally/gift/petcare (+chest,card).
  - goTo wrapper: every absent resident consort gets «Rương của …» at her palace (j2 only did the head).
  - Emperor pop-up = 6: Hiến nghệ (= old pho door: Phô tài <best art> nhẹ · Xin hầu cờ / Xin đánh đàn vừa, roll one) · Dâng lễ vật (new door dl: Dâng hoa nhẹ · Dâng quà trong rương → giftto picker, real item) · Hầu chuyện (Tâng bốc nhẹ · Nói thật lòng vừa · Bàn chuyện triều chính / Mời ngài dạo ngự hoa viên nặng, roll one) · Chặn ngự giá (ACT road vs tonightOf, greyed by day) · Xin ân điển (greyed «cần Sủng N» when short) · Đút lót lật thẻ (the ksp talk option, sent). Results append the real cause (amCause: his known like, nết, mood, art + level, flower) to the talk result + Sổ ghi (OD 01:00Z). Thái hậu pop-up += «Dâng lễ vật».
  - Cards: pcard wrapper → consort card (tabKey rival, alive) and Chí tôn cards: groups = `amCardBtns(v)` only («Tìm gặp» = seeBtn / scoutBtn retitled; «Ghé cung» = visitBtn; greyed `data-amoff` with reason otherwise); emp «Tìm gặp» = courtMeet go/yết kiến; th «Ghé cung». «Hỏi người hầu: đó là ai?» moved to the unnamed consort's pop-up.
  - `jgift.js`: `kmEmpRun(kind)` = the old data-kmemp handler body (same path).
- `dev/test/act-move-reach.js`: **PASS** — A 176 cards 0 act buttons · C palace 2345/2345 · D person 2628/2628 (21 skipped: palace access denied, tùy duyên) · E 66 absent chests offer 0 person keys · F 12 Emperor pop-ups = exactly 6 · 0 page errors (dau/cao/hh/con × 4 buổi, run `python3 dev/build/assemble.py` first; it loads dev/index.html).
## OPEN for the successor (in this order)
1. **Video** Fold 755x1000 + iPad 1180x820 mp4: `dev/test/act-move-video.js` works mechanically but AA.scen lands in the tú-nữ intro — boot like `dev/test/cfglow2-r2-video.js` (not a tú nữ), then: Hậu cung card (2 buttons) → Ghé cung → chest/owner pop-up → door Lấy của (tiers) → Emperor pop-up (6) → Hiến nghệ door → Chí tôn card. Look 3×; shots to img/_review/act-move only. Then LOOK READY → MAIN 168 → RV-163D.
2. **Batch 2 (whole family, OD 00:32Z (4))** — cards still carrying acts (kept, nothing lost meanwhile): Cung nhân (servant card: Thưởng phạt/Xem người/Hỏi chuyện/Tiến cử/Thân cận/Phòng bị → serv/maid pop-up already has 5; add «Xem người» + «Chọn làm cung nữ thân cận»; household Thêm cung nữ/thái giám, Cài người vào cung khác, Chưởng sự tra xét → a «Quản kẻ hầu» door on HER maid's pop-up), Hoàng tự (kidActs j25:47 Dạy học/Chăm sóc/Dẫn đi thỉnh an/Canh giữ → talk options on the kid pop-up — kids DO appear on stage (kind kid seen at r2); strip the kidCard «Chăm con» insert), Nam nhân card, lãnh cung «Ân xá» (rank ≥ 7; card for out consorts untouched now → move to the `fallen` pop-up, empAct(i,"pardon")). Extend the robot A/D to those cards.
3. Note for MAIN: «Đút lót lật thẻ» on the Emperor's face is MAIN's 00:54Z list (labelled «sai người sang Kính sự phòng»); Hiến nghệ uses her best art (bestArt) — «his favourite art» needs a like of kind art (LIKES has flower/music/dish only); «Chặn ngự giá» is real only at night (ACT road), so by day it shows greyed with its reason.
~45 % this task / ~0 % in game (until RV PASS).

---
# ACT-MOVE-3 report + HANDOVER (rolled at ctx limit; job 1 video done = LOOK READY, batch 2 designed + inventoried, not coded)
PRIORITY #1 CHECK: OD 27/11 ~00:32Z→~01:14Z read verbatim | review/act-move 8dbcc69b (batch 1) | main fa722503 | claims KK51-P2 (card LOOK, amCardBtns hook), DOOR-ONETAP (jone.js one-tap doors) — not touched.
## Job 1 — video (DONE)
- `dev/test/act-move-video.js` fixed: boot skips the selection (`kc2SelOn=()=>false` before AA.scen) and force-clears the new-life intro (NLP, kmBusy/KMQ, roulette, kmov) = cfglow2 CLEAN; Ghé cung clicks data-visit then the companion pick (fallback walk); Emperor met at «thu» (his schedule; «vuon» has nobody at buổi sáng). 0 page errors both devices.
- CDN `img/_review/act-move/`: sheet-fold.jpg, sheet-ipad.jpg, fold.webm, ipad.webm (Hậu cung card 2 buttons → palace chest pop-up → door Lấy của tiers → Emperor pop-up 6 moves in 3 sub-tabs (Giao thiệp 3 · Hầu hạ 1 · Tranh sủng 2, Chặn ngự giá greyed by day) → Hiến nghệ door → Chí tôn card «Tìm gặp»). Looked 3×: Fold all 7 steps right; iPad frames 4/6 (door) show the pop-up without the door opened over the focus view — script step only (doorOpen while kitFocus view is up on wide screens), the game path is covered by the robot. Note for DOOR-ONETAP: the Lấy của door still lists several «vừa» rows (its job).
## Batch 2 — inventory (dev/test/act-move-inv2.js, cao/con/hh) + stage probe
Card acts still on Hậu cung cards (LIVE head):
- Cung nhân › maid: Thêm cung nữ/thái giám (data-hire), Cài người vào cung khác (data-plantsv), Chưởng sự tra xét (data-smaid), Chọn làm cung nữ thân cận (data-thcp), Giao việc phòng bị (data-j70o), Đổi người chạy việc (data-runner).
- own servant: Thưởng/Phạt (data-sj), Hỏi chuyện/Đổi người (data-sv), Tiến cử (data-rec), Giao việc phòng bị, Chọn thân cận, Đề bạt (data-kneed), Xem người (data-svlook). Stage kind `serv` (jhouse hsvActs) already has these except check Chọn thân cận / Đề bạt.
- court (ty, tq, ksp, ped): Biếu / Hỏi chuyện (data-cv), bắt mạch bm/bm2; elders (gt, tn, kn: data-elder bieu/hoi); other palaces' servants: Mua chuộc / Dọa tố đối thực (data-sv), Bắt quỳ vả miệng / Vu tội (data-mlh), Hỏi người hầu (k61).
- kids: kidCard «Về tẩm cung thăm con» (ok) + j25 string-inserted «Chăm con» kidActs (teach/care/greet/guard, data-kid).
- lãnh cung consort card: «Ân xá» (data-e pardon, rank ≥ 7). Nam nhân card: only «Đến chỗ hắn» (already compliant).
Stage pop-ups today (probe, scen con): maid = Trò chuyện / Dò la / Giao việc phòng bị; **kid = nothing**; **elder = nothing**; other palaces' servants stand as kind `npc` with only «Chào hỏi»; ty = Chào hỏi/Bài thuốc/Thái y tâm phúc/Xin bắt mạch (no Biếu/Hỏi chuyện); ksp ok; fallen = «Hỏi chuyện cũ» only.
## Design for the successor (in jamove.js, nothing lost, same handlers)
1. Bridge: for a stage person, build that person's OLD card groups under a capture flag (staffTabHTML per PG index / kidActs(k) / elderGroups(s) / rvCard raw for fallen), parse its buttons → talk options `{n,x,lock,t,dom,open}`; `open` = click a hidden clone carrying the same data-* attrs (the delegated handlers run unchanged). Skip labels the pop-up already has. Map: maid→S.maid card; serv→own card; npc with ref = another palace's servant (check p.ref.sid)→«other» card; ty/ksp/court→court card; elder→elder card; kid (hers)→kidActs; fallen→Ân xá.
2. Cards (pcard wrapper, tab staff/kid + rv cards with status): groups → one «Tìm gặp» (own household/kids: data-go home with walkBlock reason; court: their post — ty tyv, ksp ksp, tq thu, ped nvp; elders: tn/kn/home; other servants: visitBtn of the mistress = «Ghé cung»); strip the j25 «Chăm con» insert. Tell KK51-P2 the extra kinds.
3. Robot: extend act-move-reach.js A (0 act buttons on those cards) + D (every inventoried card label offered on the matching pop-up). Then video, LOOK READY → MAIN 168 → RV-163D.
~55 % this task / ~0 % in game (until RV PASS).
## Late notes (01:21Z) for ACT-MOVE-4
- MAIN is now **MAIN 169** session_01Rc5AsLs58Sh2uCgF1R9EHu — report there.
- MAIN 168 BINDING: acts that need a target/item pick KEEP their pick list; only method variants of the same act merge. → «Dâng quà trong rương» (jamove door dl, giftto picker) keeps the item list, with the item he values most preselected (yours, jamove; DOOR-ONETAP leaves it to us).
- DOOR-ONETAP (jone.js, after jamove in assemble.py) reshapes rows gh (ally → own row «kg»), so (→ so2), P13 (→ Trừng phạt / Ban thưởng / Tha tội) in jone.fix() before each use: do NOT put «ally» back into gh.acts as a hard requirement, and tell it if you change these rows.

---
# ACT-MOVE-4 report + HANDOVER (MAIN CHÍNH 170; batch 2 BUILT + robot PASS; video open → rolled at ctx ceiling)
PRIORITY #1 CHECK ('amCardBtns'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (prio1.sh on local refs; the hook lives only on review/act-move + review/kit-person-panel) | OD 27/11 ~00:32Z (4) / ~00:42Z / ~01:12Z keep-choice / ~01:14Z NPC parity read verbatim | MAIN_STATUS 27/11 ~01:25Z notes a/b/c | KK51-P2 jkpp 31f83ba0 read (kppSrc/kppBtn) | DOOR-ONETAP not touched.
## Built — commit 8c145d17 on review/act-move (from f5360191), all in `dev/build/jamove.js` §(6)
- **Cards info only (whole family)**: Hậu cung › Cung nhân (maid, own servants, court ty/ksp/tq/ped, Thái hậu's people, other palaces' servants), Hoàng tự (kidCard: the j25 «Chăm con» insert emptied), lãnh cung consort card → groups = «Tìm gặp» / «Ghé cung» only; the «Đổi ›» runner chip and the j70 «Phòng bị» group no longer sit on the card.
  - Tìm gặp = `data-go` walk to where the person is NOW (roster `placeOfId`: maid `mm:me`, servant `s<sid>`, court `c:<k>` else post ty→tyv · ksp→ksp · tq→thu · ped→nvp, Thái hậu's people → tn), greyed «… ở ngay đây: chạm vào trên sân khấu» when already there; kid → her tẩm cung; lãnh cung consort → lc. Ghé cung = other palaces' servants → `visitBtn(mistress)` (greyed with the reason otherwise).
- **Bridge (nothing lost, same handlers)**: the stage pop-up of maid / serv / npc (other palaces' servant by sid, court by lid `c:<k>`) / ty / ksp / peddler / elder / kid (hers) / fallen (rival in lãnh cung) gets every button its OLD card had, as talk options (`amb:1`, greyed ones keep their reason, labels the pop-up already has are not doubled). Source = the old builders run whole under a capture flag (staffTabHTML with pager→every row / kidActs raw / rvCard), fired by a hidden twin with the same data-* inside #panel (`amFire`) → the delegated handlers pay their own khắc/bạc/odds/result. Re-entry guard (doorRaw → talkOpts) keeps it ~1–3 ms per pop-up.
- **KK51-P2 contract**: `amCardBtns(v,kind)` (kind rv|emp|th|maid|p) → positional `[tìm, ghé]`: html button · `""` none · `{why}` disabled · `null` = kit defaults (men → null). One-arg `amCardBtns(v)` keeps the old html-array behaviour (jkpp 31f83ba0 still calls it that way). **KK51-P2 must switch kppSrc to the 2-arg call for maid / p kinds** (staff, kids, lãnh cung) — their cards have no buttons from the kit otherwise.
- **MAIN 169 note (a)**: a person-card button (Tìm gặp / Ghé cung / yết kiến) that moves her ends on **Hành sự** (`goTab("act")`, the stage where the pop-up lives) — no person tab stays lit. Notes (b)/(c) = DOOR-ONETAP's job (not touched).
## Robots
- NEW `dev/test/act-move-reach2.js` **PASS**: A 241 cards (cao/con/hh) 0 act buttons · D old card labels offered on the person's stage pop-up **265/265** (every person seen on stage) · G one bridged twin per data family fired without error (runner, plantsv, elder, sv, mlh, thcp, cv, smaid, e=Ân xá) · 0 page errors.
- `dev/test/act-move-reach.js` (batch 1): C 2546/2546 · D 2821/2825 · F 12 OK · 0 page errors; **4 misses = one visit, hh/0, e:judge/conf/reward/cutpay on one consort @kn** — re-run of the same case (9 consorts at kn × 4 lives) offers all four; the miss is the existing «done this visit» lock (S.visit talked/tk set by an arrival event), not batch 2 (bridge touches no rival kind). Successor: re-run once; if it repeats, make the robot skip a visit already marked talked.
## OPEN for ACT-MOVE-5 (in order)
1. **Video + LOOK READY**: extend `dev/test/act-move-video.js` (boot as ACT-MOVE-3 fixed) with batch 2: Cung nhân card (2 buttons) → Tìm gặp → maid/serv pop-up showing the moved acts (Thêm cung nữ, Cài người…, Đề bạt, Chọn thân cận) → other palace servant pop-up (Mua chuộc / Vu tội) → Hoàng tự card → kid pop-up (Chăm sóc…) → lãnh cung card → fallen pop-up «Ân xá» (scen hh, rank ≥ 7). Fold 755x1000 + iPad 1180x820, look 3×, CDN img/_review/act-move/ only → LOOK READY to MAIN 170 → RV-163E.
2. Tell KK51-P2 (via MAIN) the 2-arg call (above); trial-merge kit-person-panel + act-move again (assemble order `jamove.js`, `jkpp.js`, then jone).
3. Nam nhân card: «Đến chỗ hắn» already compliant; `amCardBtns(man,"p")` returns null (kit default) — serve it if MAIN wants.
~75 % this task / ~0 % in game (until RV PASS).

---
# ACT-MOVE-5 report (MAIN CHÍNH 170) — jobs 1–4 done → LOOK READY
PRIORITY #1 CHECK ('amCardBtns|BAL.time.cost|kgbest'): OD 0 | ledger 0 | claims 0 | main 0 | review/* = review/act-move + review/kit-person-panel-rv165 only (the hook) | gift khắc already typed inline in jgift giftto/giftpick/gift card (frozen in one-core baseline) → one key for the family | jgpick already preselects the first doable tile (kept; kgbest added).
## 1. G1 one-core-guard FAIL on jamove.js → PASS
- New keys `BAL.time.cost.give:2` (a gift from her chest) and `BAL.time.cost.ask:1` (Hỏi người hầu: đó là ai?) in jbal.js beside talk/talkAct/harm.
- Whole family read from them (law 11): jamove Dâng lễ vật ×2 rows + Hỏi người hầu; jgift giftto (spend + can + «tốn» text + giftEval pre), kgmgive button + handler, Tư trang «Tặng» (itemAct gift can + gift card spend); j61 k61AskBtn + k61Ask (can/spend/text). one-core-guard inline 3099 → 3082 (fails 0), one-core-text / one-core-bind PASS.
## 2. «Dâng quà trong rương» preselect
- jgift PEND.giftto marks the doable item he/she values most (giftEval v = giftVal with his likes) `kgbest:1`; jgpick kipBuild opens on the kgbest tile (else first doable, as before). Pick list kept whole (MAIN 168 BINDING). Seen in video step 9: «Trâm phượng cửu vĩ» glowing, both devices.
## 3. kit-person-panel merged (review/kit-person-panel-rv165 34d41e13, RV-165 PASS)
- First merged LIVE main 17f23656 into act-move (no conflict; act-move was 29 behind), then kpp: only assemble.py conflicted → order `'jamove.js', 'jkpp.js'` (both last).
- jkpp `kppSrc`: ONE call `amCardBtns(v,kind)` for every kind (positional [tìm, ghé]; null → kit defaults, men).
- Found + fixed: staff «???» (unnamed) and Hoàng tự cards had NO button (kppWho resolves by name; «???» / kid names do not resolve) → jamove's card wrapper stamps `data-amw` with the person it already resolved (`amWhoOf(id)`), jkpp kppWho reads it first.
- kit-person-panel.js (dev/index.html): Fold 13 cards 0 faults · iPad 13 cards 0 faults · KIDS=1 15 cards 0 faults, 0 page errors; staff + kids now show «Tìm gặp» (greyed «… ở ngay đây: chạm vào trên sân khấu» when at home).
## Robots after merge
- act-move-reach2: A 241 cards 0 act buttons · D 263/263 · G 9 bridged families fired · 0 page errors PASS.
- act-move-reach (batch 1): C 2667/2667 · D 2978/2978 · F 12 Emperor pop-ups = 6 · 0 page errors PASS (the earlier 4-miss case did not repeat).
## 4. Video (LOOK READY)
- NEW `dev/test/act-move-video2.js` (boot = act-move-video.js; scen hh, rank 7, one consort in lãnh cung, 2 kids, gifts): 1 Cung nhân card (info + Tìm gặp) → 2 maid pop-up (Thêm cung nữ / Thêm thái giám / Cài người… / Chưởng sự tra xét / Chọn thân cận) → 3 other palace's servant pop-up «Hại người» (Mua chuộc / Vu tội, greyed «Chưa biết người này là ai») → 4 Hoàng tự card → 5 kid pop-up «Chăm con» → 6 lãnh cung card (Tìm gặp → lc) → 7 fallen pop-up «Ân xá» → 8 Emperor «Dâng lễ vật» (nhẹ hoa · vừa quà) → 9 picker on his best item. 0 page errors both devices. Looked 3× (3 runs; fixed: focus view left open over tab switches, a rank-reward chest overlay, name clash «…Ngưng», maid not home at buổi 0).
- CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/b2-fold.mp4 · b2-ipad.mp4 · b2-sheet-fold.jpg · b2-sheet-ipad.jpg (batch-1 files from ACT-MOVE-3 still there).
- Note (not this job): iPad kid on stage = grey silhouette (no full-body kid figure art) — art gap for Foreman C if MAIN wants; Fold shows the kid portrait card.
~90 % this task / ~0 % in game (until RV PASS).
## Gates (9be8932f build)
- quickcheck.sh: timed out at 590 s here (blocked host ctm-rank.victoria-tntt.workers.dev, proxy 403), so its parts ran by hand:
  coregates G1 one-core-guard / text / textrule / bind PASS (inline 3082 < baseline 3592) · G2 rules-one-source bad [] · G3 kit-conform floats none · G4 odds-cap, coop-one-world, mk-layer, manifest-guard, npc-purpose, dialog-fixed, dead-card, look-dedupe PASS · time-spill-guard PASS.
  G4 button-crawl: 1 fault «Ô lưu [title] · Lui · close button did not close its layer» — SAME on LIVE 17f23656 (crawl run on both over http): pre-existing, not this branch.
- MAIN is now MAIN 171 (session_01Rc5AsLtirkQB1N5Nb16Wct).

## MAIN 171 LOOK FAIL cadf0346 → fixed (kit rows glued on moved acts)
- Root: the bridge read an old card button's `<small>` (already kitParse-rendered rows) and tag-stripped it → «Tùy duyênThànhBạc−−BạiTồn công»; then optLine wrapped that text as «thành: …» with its own «tốn: 1 khắc», and the Dư đồ focus line (jdf dfActs) wrote «Tốn 0 khắc» from talkK.
- Fix (jamove, whole moved-act family): while an old card is captured, pbtn keeps its RAW small string on the button (`data-amx`, never fired); the bridged option's x = that raw string (fallback for non-pbtn buttons: rebuilt «label: value» from the rendered span.kl rows). For `amb` options: optLine = kitParse(x) (= exactly the old card's kit rows: odds part, Tốn/Thành/Bại/Kèm/Cần/Ghi chú rows, gains green / losses red); talkK = the khắc its own «tốn» states; the focus line (dfActs) takes odds word + Tốn from the kit model (kaRows(kaModelStr(x))), cost written as the Tốn row writes it («Bạc 20»). No double pay (j25 defers the talk pay; amFire clears it).
- NEW `dev/test/act-move-rows-scan.js` (scen cao/con/hh × buổi 0–2 × every place, every bridged option): glued label /[a-zà-ỹ0-9)](Tốn|Được|Thành|Bại|Hỏng|Ghi chú|Kèm|Cần)/ in x, nested label in the rendered option line, «0 khắc» / signed cost in the focus line.
  | kind | before glued/options | after |
  |---|---|---|
  | maid | 7/15 | 0/15 |
  | kid | 9/9 | 0/9 |
  | elder | 12/12 | 0/17 |
  | serv | 6/6 | 0/6 |
  | npc (other palaces' servants) | 18/18 | 0/18 |
  | ty | 15/15 | 0/15 |
  | ksp | 9/9 | 0/9 |
  | peddler | 9/9 | 0/9 |
  | fallen | 0/1 | 0/1 |
  | TOTAL (run 1 / last run) | 85/94 · 89/99 | 0/99 · 0/93 |
- Robots after: reach PASS · reach2 PASS · rows-scan PASS · one-core PASS · 0 page errors. A locked card (e.g. Mua chuộc «Chưa biết người này là ai») shows «Thành: Không được gì thêm» + no Bại = the kit's own disabled-card rule (kaBody dis), same as native locked options.
- New sheets/videos (looked 3×): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/b3-fold.mp4 · b3-ipad.mp4 · b3-sheet-fold.jpg · b3-sheet-ipad.jpg
- KIT_CHECKLIST.md (KIT-STD-AUDIT) not published yet at this commit — to check against when it lands.

---
# ACT-MOVE-5 HANDOVER → ACT-MOVE-6 (rolled at ctx ceiling, 27/11 ~05:35Z)
State: review/act-move 90488b6c = built, robots PASS. MAIN 172 (session_01Rc5AsMU9mSE7tW95QoYfC8) LOOK 05:27Z: FLOW PASS; FAIL on kit std / law 3 (gain-and-loss) in moved cards. Its order, verbatim:
«1) Lãnh cung «Ân xá» card has an EMPTY body (only Ghi chú «đưa nàng về cung»; j15.js:49). Needs Tốn (2 khắc via whyTime/BAL) + Được green: nàng về cung, thiện cảm + (pvRel BAL.ag.hh.pardonRel), Đức + (BAL.ag.hh.pardonDuc) — same numbers as the confined «Ân xá» on j15.js:43.
2) «Thêm cung nữ» / «Thêm thái giám» / «Chọn làm cung nữ thân cận»: Tốn only, no Được row → add the gain (thêm 1 cung nữ/thái giám …) in green.
3) Servant «Mua chuộc» / «Vu tội»: Thành shows «Không được gì thêm» (j63.js:129 kr-none) = a road with no gain (law 3). When the person is unknown, still print what success gives (tai mắt / nàng bị phạt …) from the act's own effect; Mua chuộc also lacks a Tốn row (print its bạc cost, or «Tốn: không» per OD 26/11 ~17:55Z — never omit). Scan every caller of the j63 kr-none «Không được gì thêm» path across the game, not only these two.
4) NOT yours: iPad stage mini-cards odds word with no bar → kit keeper.
Then new Fold+iPad sheets → MAIN LOOK → RV-163E. Keep the art gap (kid silhouette) noted in the report.»
## Source map (traced, nothing changed yet)
- (1) j15.js:49 lãnh cung card: `pbtn(data-e pardon,"Ân xá","đưa nàng về cung",whyTime(2)||…)`. REAL effect = j8.js:546 empAct pardon: coldFree(v) (back to court), `relAdd(S,v,BAL.eff.j8.empAct_2)` (=30) + `apply({duc:BAL.ag.hh.pardonDuc})`; cost = empAct's inline can(2)/spend(2) (j8.js:542–547, frozen baseline). NOTE: j15:43 (confined Ân xá) PRINTS BAL.ag.hh.pardonRel but the rule applies BAL.eff.j8.empAct_2 → print the key the rule reads (one-core-bind), and tell MAIN about the j15:43 mismatch (same family: fix it too). Plan: add `BAL.time.cost.hh:2` (Quyền Hoàng hậu e-acts) beside give/ask in jbal.js, wire empAct can/spend (lines 542–547 only) + j15:43/49 whyTime(2) to it; Ân xá sm = `tốn: ${BAL.time.cost.hh} khắc · thành: nàng về cung, ${pvRel(v,BAL.eff.j8.empAct_2)}, Đức ${balSg(BAL.ag.hh.pardonDuc)}`.
- (2) maid card buttons come from staffTabHTML (j15.js:74 maid card); «Thêm cung nữ/thái giám» = data-hire (raw x was «Nội vụ phủ · Bạc -20»: no thành), «Chọn làm cung nữ thân cận» = jtc.js:50 (`Bạc ${balSg(-B.pic…)}` …). Add «thành: thêm 1 cung nữ/thái giám vào cung ngươi» etc. (NPC twin: jagacts3.js:171 hire uses BAL.house.hireBac).
- (3) other palace servant buttons: «Mua chuộc» = data-sv (j15.js:80 «Mưu kế» group; game handler jsgame.js:283 → Mặc cả, cost sgServCost(s), BAL.servK khắc) — raw x was «thành: Bạc -30 · Mong manh» (cost wrongly under thành → disabled card filters losses → kr-none). «Vu tội» / «Bắt quỳ, vả miệng» = jmline.js:115–116 (thành has a loss only: «thiện cảm với chủ −−−»). kr-none writer: j63.js:129 kaBody (dis filters red from Thành). Game-wide scan idea: run every option/act card builder through kaBody and list cards whose THÀNH block is kr-none (both enabled and disabled), per family; fix strings so a real gain is printed (law 3).
- Scan robot to extend: dev/test/act-move-rows-scan.js (add: amb option rendered with kr-none Thành = FAIL; Tốn row missing when the act costs bạc/khắc = FAIL).
- Video: dev/test/act-move-video2.js (both devices, `OUT=… node dev/test/act-move-video2.js 755 1000 fold` / `1180 820 ipad`), sheets via PIL 3×3, upload `python3 dev/site/cdn_sync.py img/_review/act-move/<file>` (img/ is git-ignored), then LOOK READY → MAIN 172.
- Pending: check against dev/kit/KIT_CHECKLIST.md when KIT-STD-AUDIT (session_01Rc5AsLjdujq3CBnAckhFyp) publishes it (MAIN 171 said yes).
- quickcheck.sh times out here (ctm-rank host blocked); run coregates by hand: `bash dev/tools/coregates.sh $PWD 17f23656 <outdir>`; button-crawl «Ô lưu · Lui» fault is on LIVE too.
- Always test on dev/index.html after `python3 dev/build/assemble.py`; rebuild the site (`bash dev/site/build_site.sh`) before pushing.
~85 % this task / ~0 % in game.

# ACT-MOVE-6 (27/11 ~06:40Z) — MAIN 172 LOOK FAIL 05:27Z fix: law 3 gain-and-loss on moved cards (law 11 whole family, law 4 one core)
PRIORITY #1 CHECK ('act-move'): OD 9 | ledger 0 | claims 8 | main 0 | review/* 1 (review/act-move) | archive 0 — continued review/act-move from 83390931, nothing rebuilt.
## What changed (source)
- j15.js lãnh cung «Ân xá» (was an empty body): `tốn: BAL.ag.hh.kh khắc · thành: nàng rời lãnh cung về cung · pvRel(BAL.ag.hh.pardonRel) · Đức balSg(BAL.ag.hh.pardonDuc)`, gate whyTime(BAL.ag.hh.kh).
- j15.js Quyền Hoàng hậu group (Xử tội / Tịch thu / Ân xá / Khất bổng lộc): khắc from BAL.ag.hh.kh (was whyTime(2)), a Tốn row on every card; Xử tội gets a Thành («nàng bị xử theo chứng cứ ngươi nắm»); Khất bổng thiện cảm reads BAL.ag.hh.cutRel (was typed 15).
- Item 4 (ACT-MOVE-5 finding «j15:43 prints pardonRel but the rule applies BAL.eff.j8.empAct_2»): **checked — not a mismatch**. The live rule for her Ân xá is the jagacts.js:97–99 empAct wrapper → hhAct (jagacts.js:71) which reads BAL.ag.hh.pardonRel / pardonDuc and spends BAL.ag.hh.kh; j8 empAct (empAct_2) only runs when the wrapper declines (k not in AGHH or khắc short → it returns too). So both Ân xá cards print the keys the rule reads (pardonRel/pardonDuc/kh); j8 untouched. one-core-bind PASS (1621 prints, 0 mismatches).
- j15.js maid card «Thêm cung nữ» / «Thêm thái giám»: `tốn: Bạc -hireBac · thành: thêm 1 cung nữ / thái giám hầu ngươi` (green). jtc.js «Chọn làm cung nữ thân cận»: `tốn: Bạc … · thành: nàng thành cung nữ thân cận của ngươi` + the old thiện cảm lines.
- j15.js «Mua chuộc» (other palace servant + elder, same builder): `odds · tốn: BAL.servK khắc · thành: X thành tai mắt của ngươi (green), Bạc -bribeCost · hỏng: X có thể mách chủ` — bạc is paid on success only (bribeServ / jsgame serv pay), so it sits in Thành, red. A LOCKED card (person unknown) now shows the gain instead of «Thành: Không được gì thêm».
- jmline.js «Vu tội»: Thành = what mlHitDo frame gives, explicit green: X bị phạt quỳ · lòng X với chủ −frameLoy · X bị đuổi khỏi cung chủ: chanceW(frameOut). Locked card keeps the gain too.
- Same family found by the scan (law 11): «Cài người vào cung khác» (odds + Thành tai mắt + Bạc on success, as its pick j10 PEND.plantsv), «Chưởng sự tra xét cung nữ» (what j14 searchMaids gives), «Đổi người chạy việc» (jamove: chip without small line → Thành «người chạy việc mới do ngươi chọn»), own servant «Xem người» (servLearn), «Tiến cử» (servMerit BAL.ag.par3.house.merit; jhouse.js twin's typed «+5» → the same key), «Dọa tố đối thực» (threatServ odds + tai mắt; kèm oán).
## Scan robot (new) dev/test/act-move-law3-scan.js — every bridged option of every person on stage, cao/con/hh × buổi 0–2 × every place, rendered by optLine; flags NOGAIN (no green Được/Thành), NONE / NONE-LOCKED («Không được gì thêm», also via kaBody dis), NOCOST (bạc taken, no row names it)
| family | before (83390931 build) | after |
|---|---|---|
| fallen · Ân xá | 1/1 NOGAIN | 0 |
| maid · Thêm cung nữ / Thêm thái giám | 6/6 NOGAIN | 0 |
| maid · Cài người vào cung khác | 3/3 NOGAIN | 0 |
| maid · Chưởng sự tra xét cung nữ | 1/1 NOGAIN | 0 |
| maid · Đổi người chạy việc | 2/2 NOGAIN | 0 |
| npc + elder · Mua chuộc | 5/5 NOGAIN, NONE-LOCKED | 0 |
| npc + elder · Vu tội | 5/5 NOGAIN, NONE-LOCKED | 0 |
| elder · Tiến cử (seen in one run) | 1/1 NOGAIN | 0 |
| TOTAL | 23/96 (+1) | 0/93–99 PASS |
- Wider look (NATIVE=1, not gated, NOT this branch's family — for MAIN): native pop-up options flagged NOGAIN 65/305 are almost all tier/group openers («Dò la», «Ra uy», «Mặc cả chứng cứ», «Hiến nghệ», «Dâng lễ vật» … «chọn mức và cách») whose rows live in the picker; two look like real gaps worth a ticket: emp «Chặn ngự giá» (only Tốn 1 khắc) and rival «Đẩy con nàng xuống hồ» (empty line), plus chest «Lấy trộm son phấn» whose x nests «thành:» inside a Thành row through native optLine.
## Robots (after)
- act-move-law3-scan PASS 0/93 · act-move-rows-scan PASS 0/94 · act-move-reach2 PASS (A 241 cards, D 263/263, G 8 families fired) · act-move-reach PASS (C 2493/2493, D 2788/2788, F 12) · 0 page errors.
- coregates (17f23656 base): G1 guard / text / textrule / bind PASS (bind after fix: 0 mismatches) · G2 rules bad [] · G3 floats none · G4 odds-cap, coop-one-world, mk-layer, manifest-guard, npc-purpose, dialog-fixed, dead-card, look-dedupe, press-keep, q-softlock PASS · button-crawl 1 fault «Ô lưu · Lui» = the known LIVE fault (not this branch).
## Sheets (looked 3×)
- Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6-fold-sheet.jpg
- iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6-ipad-sheet.jpg (12 shots: the stage mini-card shows one line by kit design; shots 2b / 3b / 7b tap its «!» to show the full kit card: Thêm cung nữ, Mua chuộc locked, Ân xá)
- dev/test/act-move-video2.js: iPad TAP step added (taps the «!», shoots, then a real tap outside closes it).
- Art gaps (not mine, noted): unknown servant / thái giám silhouette is a female figure; kid silhouette gap as before. iPad mini-card odds line = KK56.
~100 % this task / ~0 % in game (until LAND).
## ACT-MOVE-6 follow-up (MAIN 172 05:45Z/05:51Z): on top of door-onetap e408ab1d
- Branch **review/act-move-law3** = e408ab1d + merge of review/act-move 66afd77e (conflicts only in generated index.html / sw.js → rebuilt with assemble + build_site; assets.json kept = e408ab1d).
- «Tốn: Bạc -20» minus (MAIN 05:45Z): the source now writes `tốn: Bạc -N`, and the kit row renders it WITHOUT a minus («Tốn Bạc 20», red) — checked on both sheets (Fold maid card, iPad mini-card + «!» card). Same for Chọn làm thân cận («Tốn Bạc 30»).
- Robots on the merged build: law3-scan PASS 0/98 · rows-scan PASS · reach2 PASS · door-onetap PASS (members 90, 0 page errors) · one-core bind / guard / text PASS.
- Sheets (looked 3×): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6b-fold-sheet.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6b-ipad-sheet.jpg
## ACT-MOVE-6 item (a) (MAIN 172 06:18Z LOOK PASS 66afd77e + order): native-option law-3 gaps, same family, on review/act-move-law3 (on top of door-onetap e408ab1d)
- j25.js optLine (the pop-up line every door / one-tap card reads): (1) an act with an AOUT key returns kit rows (kitParse(actLineRaw …)) — was the raw line, an EMPTY card body where the frame does not re-parse («Đẩy con nàng xuống hồ»); (2) an x that already carries its own labels (odds · thành: · hỏng:) is passed whole, never nested inside one «thành:» row («Lấy trộm son phấn»: «Thành: Khó lường, thành: … hỏng: …» → Thành lấy một hộp son phấn / Bại bị bắt …).
- jone.js one-tap door: copies k / tgt from the picked member too (an act member such as «Dò la» k:spy lost its AOUT line → «Thành: Dò la: Bạc −−»; now Tốn 2 khắc · Bạc / Thành chứng cứ + · Tâm cơ ++ / Bại bị lộ …).
- jamove.js Emperor: «Chặn ngự giá» open = odds · tốn fmt(stealCost road) · thành Hoàng thượng dừng bước, sang cung ngươi đêm nay · hỏng fmt(stealLose road); locked = the same Được; «Xin ân điển» locked placeholder = thành ngài ban fmt(BAL.ag.cx2.favor.w).
- jration.js «Mượn son phấn»: the gain on its own Thành row + Bại (was one neutral note line when her word is «Không ưa»).
- j9.js «Cùng cung» = a notice (always locked, «không thể lấy lòng hay ra tay») → notice:1, the scan skips notices; tier / group openers («chọn mức và cách / chọn một trong …») are counted apart, never gated.
| NATIVE=1 scan (every pop-up option, cao/con/hh) | before (42793459) | after |
|---|---|---|
| chest · Lấy trộm son phấn | 3/3 | 0 |
| emp · Chặn ngự giá | 3/3 | 0 |
| emp · Xin ân điển (locked) | 1/3 | 0 |
| rival · Dò la (one-tap act member) | 3/3 | 0 |
| rival · Đẩy con nàng xuống hồ | 1/1 | 0 |
| rival · Mượn son phấn («Không ưa») | seen 1 | 0 |
| rival · Trò chuyện / Nhờ giúp đỡ / Nhờ người đứng giữa (one-tap seeds) | 2/3, 1/3, 1/1 | 0 (3 runs) |
| rival · Cùng cung (notice) | 2/2 | skipped as notice |
| TOTAL | 17/313 (openers 10 apart) | 0/295 · 0/292 · 0/316 PASS |
- For MAIN / door-onetap (not changed here): the one-tap «Trò chuyện» may pick «Bàn tán về X» when it loses her thiện cảm (x «nàng quý ngươi −3» shows on a green Được row) — a pick that gives only a loss; jone pick rule territory.
- Robots: law3-scan (bridged) PASS 0/98 · NATIVE PASS · rows-scan PASS · reach2 PASS · door-onetap PASS · coregates (17f23656) CORE GATES PASS incl. button-crawl (0 faults) · 0 page errors.
- video2: steps 7c–7h added (rival Mưu kế, chest, Emperor Tranh sủng; iPad taps the «!»). Sheets (looked 3×): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6c-fold-sheet.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/act-move/act-move6c-ipad-sheet.jpg
## ACT-MOVE-6 RV-163G F1 fix (07:42Z FAIL 7b7baf53, 1 item)
- F1 «Trò chuyện» member «Rỉ tai chuyện trong cung» showed only Mất («một phi tần khác Danh −»). Whole jtwoway two-way talk block fixed (law 11): a deed that hurts another is HER gain, written with the explicit green class (kit KP12: writer's class beats word colour), her own loss on «kèm:» (explicit red where words read green):
  gossip «thành: phi tần ngươi ghét Danh −N» (TW.gossip hits her foe, npwPick by hostility; no foe → note «chỉ là chuyện phiếm») · humil «thành: Danh nàng −N · kèm: nàng oán ngươi +N» · drop «thành: ngươi dứt tình thân với người sa cơ · kèm: ngươi lạnh với nàng −N» · admon «thành: Sủng nàng −N · hai tuần ngài để ý người khác» · flaunt «thành: mọi phi tần khác ghen tức +N». Keys unchanged (BAL.tw.g via G()), bind PASS.
- jone.js: the one-tap door wrote «<member>: <x>»; a labelled member x became «tên: thành: …» (nested, unparsed → Mất). Now a labelled x stays label-first and the member name goes to Ghi chú «(Rỉ tai chuyện trong cung)».
- Note for MAIN (design, not changed): «Lạnh nhạt» (drop) has no mechanical gain beyond cutting her own thiện cảm toward a fallen friend; the card now names that as the gain. A real gain (e.g. no guilt-by-tie) would be a design ticket.
- Robots: NATIVE=1 ×4 runs 0/307 · 0/318 · 0/309 · 0/309 (openers 10 apart) · bridged 0/93 · rows-scan PASS · door-onetap PASS · one-core bind / guard / text / text-rule PASS · site rebuilt.
## ACT-MOVE-6 MAIN 174 add-on (08:01Z): side chance on the ladder (KIT §11 «never label: ${word(n)} in a gain/risk/kèm string») + one more law-3 root
- jecon blCard «khất bổng (bớt 3 phần 10): ${word(20)}» → `${chanceW(20)}` (j20's original wording).
- Family scan (sidew.py: every `${word(…)}` printed after a label / «khả năng» / «(» inside a template, 18 hits) — classified:
| file:line | text | kind | action |
|---|---|---|---|
| jecon.js:80 | khất bổng …: word(20) | side chance (help text) | → chanceW |
| jaudit.js:107 | nàng có thể kể bệnh của mình: word | side chance in a gain | → chanceW |
| jthaiy.js:96 | thấy mưu hại ngầm (nếu có): word | side chance in Thành | → chanceW |
| jemoact.js:397 | có thể bị cấm túc (word) | side chance in a risk | → chanceW |
| jts.js:513 | (hợp ý hay không) tùy thiện cảm: word(loyal) | side chance | → chanceW |
| j41:124 · j70:256/305 · j99succ:84–87 · jcharge:62/69/180/182 · jts:126/130 · jveil:138 | «được cho vào / lúc ra tay / Tìm chứng / Bỏ qua: cơ may / Xin … ban» | the act's OWN odds (ladder is right) | kept |
- Root found by the NATIVE scan while testing: jtoil put her look reaction («nàng ta chuộng giản dị: quý ta +N», «… ghen +N») into every rival option's `risk` → optLine printed it as the deed's Bại → a two-block card «Thành: Không được gì thêm ‖ Kèm: <the real gain> ‖ Bại: <green>» («Nhờ giúp đỡ»). The reaction happens either way: jtoil now writes `kem`, j25 optLine appends «kèm: …» on all three paths (a green reaction lands in Được, a jealousy in Kèm). toil-react / toil-tease / toil-harsh PASS.
- Robots: NATIVE ×3 0/313 · 0/323 · 0/306 · bridged 0/98 · rows-scan PASS · door-onetap PASS (one earlier run FAIL «never picked hs-tainghe|Kinh hồng vũ» = dice, not touched here; next run PASS) · one-core ×4 PASS · odds-unknown-scan unchanged vs before (7 / 18 exempt, same lines) · site rebuilt.
## ACT-MOVE-6 F2 (RV-163G 08:06Z) + MAIN 174 ruling + MAIN 175 time-spill item
- F2 «a forced class never turns a cost into a gain» — MAIN 174 ruling applied (real gains, both sides law 1, keys in BAL law 4):
| deed | before (516752a3) | after |
|---|---|---|
| Khoe quà ngự ban (TW flaunt) | run: only rivals' ghen ↑; line painted «mọi phi tần khác ghen tức +N» green | run `twAp(a,{danh:G().flauntDanh})` + ghen (= review/e-gain3b 78c8608a hunk, same key BAL.tw.g.flauntDanh=1, same run text); line «Thành: Danh + · Kèm: mọi phi tần khác ghen +N» (red) |
| Lạnh nhạt (TW drop) | run: only her own liking ↓; line «ngươi dứt tình thân…» green (a phrase) | new BAL.tw.g.coldRisk=2; run: everyone who holds oán toward the fallen one AND toward the doer lowers her oán toward the doer by coldRisk (twColdFoes) → the doer's Nguy hiểm chung (j28 danger ← oán) falls; req = twFallen(t) (lãnh cung / cấm túc / Sủng < 25, the old cut) AND at least one such foe (never offered without a real gain); line «Thành: kẻ ghét nàng bớt oán ngươi N · Kèm: ngươi lạnh với nàng −N» |
  Checked by a probe: her drop → foe's oán toward her 12 → 10; an NPC doer (TW.drop.run(y,t)) 12 → 10; flaunt Danh 60 → 61.
- MAIN 175: LIVE 611fca61 «time-spill-guard 20 bad». CAUSE (not act-move costs): the rows that fail are «greet / ask / sneak OFFERED» = the card sat in Q while #modal stayed hidden. jdayq (dialog-order, landed in BUNDLE 1) holds every game-posted card while the new-day host is on screen (dqDawn: #dawn .on/.kne-day with content, or #kdaytc) — by design. Under CPU load (reviewers run many robots at once) the boot / nextBuoi dawn is still up when the guard's synchronous checks run → 20–24 bad; alone it PASSES (reproduced: 6 parallel seeds → 20–24 bad, serial → 0). No act is offered past the buổi. Fix = the guard's clr() clears the new-day host like it already clears kit scenes (dev/test/time-spill-guard.js). After: 6 parallel seeds on LIVE 0 bad; on this branch SEED 1/5 under load PASS. Game code unchanged for this item.
- Robots: NATIVE ×3 0/310 · 0/304 · 0/297 · bridged 0/90 · rows-scan PASS · door-onetap PASS · npc-purpose-scan PASS (419 rows) · one-core bind/guard/text/text-rule PASS · time-spill-guard PASS (under load) · site rebuilt.
