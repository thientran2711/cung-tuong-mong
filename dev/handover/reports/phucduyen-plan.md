# E-PHUCDUYEN-PLAN — «Bộ bài Phúc duyên» STEP 1 plan (no game code)
Worker session_01DgYSWmrvcBipCfWarncs3U · FOREMAN E · main 17f23656 · handover branch read at 63cdf2bd.

PRIORITY #1 CHECK: `prio1.sh "phúc duyên|hộ mệnh|miễn tử|kho bài|bộ bài"` → OD 4 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0. The main hits are the existing **Phúc duyên meta-currency** (j52.js:6-8, `ctm-phucduyen`, kept across lives, buys identity rerolls; j69.js:9; j71.js:175 `+1 Phúc duyên`) — **not** a card deck. No card deck, Kho bài or hộ mệnh mechanic exists on main or review/*. Related things already on main, which this plan reuses: the act deck `deal()` (j2.js:68, a deck of direct acts such as «Hối lộ Kính sự phòng» j2.js:94); the weekly xăm lot that shifts odds by ladder steps (`lotB`/`lotTag`/`ladI` j13.js:64-65, folded in by `odA` j9.js:121, dealt by `newLots()` j3.js:148); the nợ ân ledger (j72.js:67).

**CANON NOTE: the brief is out of date.** The brief follows the ~02:00Z row («1–2 cards a month, expire unused»). Seven later owner rows overwrite it: OD 27/11 ~02:10Z, ~02:15Z, ~02:20Z, ~02:25Z, ~02:30Z, ~02:35Z and ~02:40Z (FOREMAN_E_STATUS lines 443-454). Under law 14 this plan follows the **latest** rows:
- Every card is EARNED.
- Kho bài (the collection) has no limit. She carries a deck of 10.
- Every 3 months she draws 3.
- Cards have **two natures** (~02:35Z). A «Một lần» card is gone once used: an ân tình (N favours owed = N identical cards), a miễn tử / hộ mệnh pardon, a one-off token. A «Thường trực» card always comes back to the deck. A card that is drawn but not used always comes back. Otherwise a card is lost only by trading.
- There are three families, CÔNG, THỦ and THỜI CƠ, and four grades.
- Each identity has a starter deck, and each road has one signature card.
- Cards can be traded.
- **A card never replaces an action** (~02:40Z). Every action button stays for everyone; a card is only a modifier or privilege on named actions. The button-removal ablation is DROPPED.

## 0. Two conflicts MAIN must rule on (law 17 — not re-asking sếp, flagging only)
1. **NAME CLASH.** «Phúc duyên» is already a player-visible meta-currency (j52: «Đổi thân phận (−N Phúc duyên)», end-card line «Kiếp này được +N Phúc duyên»; listed as fixed wording in VANPHONG.md:109). A card system with the same name puts two meanings on one word.
   - **REC:** call the system «Bài cơ duyên» (Kho bài · Bài mang theo · Lá cơ duyên), the name in the ~01:55Z approval.
   - Keep «Phúc duyên» for the currency only.
2. **«Tuyệt = sure success»** (~02:15Z) clashes with the VANPHONG ceiling «không việc may rủi nào chắc chắn — cao nhất là Rất vững» (VANPHONG.md:66, BAL.odds.hi 95).
   - **REC:** a Tuyệt card never prints 100. Instead it **changes the road of the crisis**. For example, the poison is found before she drinks it, so the death roll never happens; what is left is a small roll on what follows it, at the Rất vững ceiling.
   - This keeps law 6a (real evidence: her defence can still fail at the edges).

## 1. Card sources = real state each card reads (law 6b/6c)
Each card is a **token** `{id, fam, grade, src:{who, why, buoi}, owner}` stored in the owner's Kho bài: `S.kho[]` for her and `p.kho[]` for NPCs.

A card can only be **played** if its named giver is still real and can help, for example alive and not in lãnh cung.
- A «Thường trực» card whose giver cannot help shows «người đã khuất / thất thế» and is dimmed for that season. It is not deleted, because it is still a real token.
- An ân tình card («Một lần») FADES from the deck if that NPC dies or turns enemy, and Sổ ghi says why (~02:35Z).

| Source | Existing code that would mint the card |
|---|---|
| Emperor ban thưởng | `bestow(p,why)` j8.js:324 (BEST lists night/contest/son/promo/accuse/story/birthday, j8.js:322) |
| Thái hậu gift | j8.js:524 (`p.th>=BAL.ag.th.fondTh … roll(8)`) |
| Hoàng hậu reward | j8.js:526 (BAL.tw.reward) |
| Story / arc reward | `reward67` j67.js:1717, pools RPOOL67 j67.js:1712 |
| Merit / festivals | `bonusDo7` / MF7 j71.js:176-179 |
| Favour quests / nợ ân | `q72Make` / `q72Offer` j72.js:116/145; ledger `q72Debt` j72.js:67-69 (an NPC who owes her = an «Ân tình của <tên>» card) |
| Buying | Nội vụ phủ shop `kitShopNvp` jinv.js:580; black market j29.js:65 and `illDoor` j83.js:271; restock j8.js:257 (rare card slot, BAL price) |
| Found on the road | Dư đồ places (j95 place record, `recAt` j2.js:130); rare, BAL odds |
| Trade | NPC: needs thiện cảm `aff` (j9.js:33), and the NPC can refuse by her own nết. Co-op: new two-confirm swap on the ASK path (jcoopworld.js:491) |
| Real state a card checks when played | NPC place `S.roster` / `agAt` (j95.js:1-15, jagent.js:96); Emperor mood `S.emp.mood` (j3.js:104-107); Thái hậu / Hoàng hậu mood S.cm (jcmood.js); thái y `S.court.ty` (j10.js:29, jthaiy.js:32 — **one** physician, no duty roster, so «Thái y thân tín trực đêm» reads `trusted()` jthaiy.js:40, not a schedule) |

## 2. Season rule (all numbers BAL, NEW-KEY proposals)
`BAL.cd` (rename to `BAL.phucduyen` if MAIN keeps that name):
- `{carry:10, draw:3, season:3 /*months*/, perAct:1, band:{pham:1,luong:2,thuong:3}, kho:0 /*0 = no limit*/}`
- `swapAt:"season"`: she can change her carried deck only at season start.
- `price:{pham:40,luong:120,thuong:300,tuyet:0 /*never sold*/}` in bạc.
- `earnW:{pham:60,luong:28,thuong:10,tuyet:2}`: the grade weights when a source mints a card. Higher grades are harder to EARN.
- `find:{o:4}`: the chance per place visit of finding a card on the road.
- `trade:{aff:40}`: thiện cảm needed to trade with an NPC.
- `starter:{min:4,max:6}`.

How the season works:
- **Draw.** Hook `monthTick` (j3.js:152) with the existing wrap pattern (j22.js:77). When `S.turn % BAL.cd.season === 0`: shuffle the carried 10 with the game RNG and draw 3 into her hand. Every card has an **equal** chance (owner ~02:10Z).
- **Season end.** Cards not used, and «Thường trực» cards that were used, go back to the Kho bài. «Một lần» cards that were used are gone, and Sổ ghi records it («ân tình đã trả», «kim bài đã nộp lại»; law 6c). `nature:"once"|"keep"` is stored on the token, and the card face shows the tag «Một lần» / «Thường trực» (~02:35Z).
- **Luck** comes from two things: whether the card is drawn (3 of 10), and whether a fitting moment comes during that season.
- **Band size.** One step on the ladder is one band of `BAL.odds.cut`, 13 points. The new odds are capped at `BAL.odds.hi` (95). Ladder words are printed through `word()` (j1.js:96), the same as the xăm lot does.
- **One card per act**, which is `perAct`. A card only ADDS steps, a better outcome tier, or protection to an action that already exists. It never removes, locks or replaces a button, and it never makes non-holders pay more (~02:40Z). The xăm lot stays separate: it is luck dealt each tuần, while cards are earned.
  - The plan proposes that card + lot together may not go past `hi`.
  - The card is shown on the act as «Bài: <tên> · Có cơ → Vững».

## 3. Example cards (Vietnamese text per VANPHONG; giver = a real NPC, law 6b)
| # | Card (fam · grade · nature: 1 = Một lần, T = Thường trực) | Giver / trigger state | Action boosted → effect when played | Được / Mất (law 3) | BAL keys |
|---|---|---|---|---|---|
| 1 | «Đồng hương ở Kính sự phòng» THỜI CƠ · Lương · T | a eunuch from her home there (`c.af.me` j10.js:29 ≥ trade.aff) | «Đút lót lật thẻ» (j2.js:185) / «Hối lộ KSP sửa sổ» (j22.js:49) → +2 steps, and her tablet goes first that tuần; the bribe itself is still paid | Được: chance of being called rises · Mất: Hoàng hậu ghen + | cd.ksp.{tablet,ghen} |
| 2 | «Phụng Tiên điện ứng mộng» THỜI CƠ · Phàm · T | Thái hậu thương (`S.th≥fondTh`) | «Cầu tự» (j2.js:48) → +1 step (the act and its cost stay) | Được: has a child · Mất: one khắc | cd.pray.b |
| 3 | «Thái y tâm phúc canh thuốc» THỦ · Lương · T | `trusted()` jthaiy.js:40 | illness cure roll (j13.js:18) +2 steps | Được: Sức back · Mất: owes the thái y a favour (nợ ân −) | cd.ill.b |
| 4 | «Bát bạc thử độc» THỦ · Thượng · T | loyal maid near her (j24.js:62) | the Phòng option on PEND.pgin / j70 defence +3 steps | Được: poison found → evidence token · Mất: the maid's Sức − | cd.poi.b |
| 5 | «Mệnh treo sợi tóc — có người đổi chén» THỦ · Tuyệt (HỘ MỆNH) · 1 | a maid who is really there, tin cậy ≥ X | the poison is never drunk; the plot is turned to «bị lộ» | Được: lives, the culprit's trail · Mất: the maid falls ill / leaves service (real person) | cd.hm.poi |
| 6 | «Ân tình của <chứng nhân>» THỦ · Thượng · 1 | an NPC who saw it (`npcSee70` j70.js:177 witness) | the defence road on PEND.vuoan +3 steps | Được: cleared, the framer exposed · Mất: the witness becomes a target | cd.vu.b |
| 7 | «Miễn tử kim bài» THỦ · Tuyệt (HỘ MỆNH) · 1 | Thái hậu alive and `S.th` high | a guilty verdict or `deathSentence` (j8.js:105) turns into a re-trial / cấm túc | Được: lives · Mất: Thái hậu favour − big, Hoàng hậu oán + | cd.hm.tri |
| 8 | «Thư nhà gửi sớ kêu oan» THỜI CƠ · Lương · 1 | the father's clan has backing (j55.js:12) | the existing escape acts in `coldActsOf` (j14.js:17) and the amnesty roll (j14.js:43) → +2 steps | Được: chance to leave lãnh cung · Mất: the clan's danh − | cd.cold.b |
| 9 | «Lò sưởi của cố nhân» THỦ · Phàm · T | an ally maid outside | `coldMonth` freezing death roll (j14.js:43) −1 step | Được: survives winter · Mất: the ally's bạc − | cd.cold.frost |
| 10 | «Bà đỡ thân tín» THỦ · Thượng · T | a midwife not bribed (j32.js:5) | `birthRisk` (j32.js:3) −3 steps | Được: mother and child safe · Mất: bạc to the midwife | cd.birth.b |
| 11 | «Phúc tinh chiếu mệnh — mẹ tròn con vuông» THỦ · Tuyệt (HỘ MỆNH) · 1 | the trusted thái y + Thái hậu | the «Giữ mẹ / giữ con» choice (jmort.js:153) does not appear: both live, then a small roll for weakness | Được: both live · Mất: Sức long recovery | cd.hm.birth |
| 12 | «Tai mắt trong Dực Khôn cung» CÔNG · Lương · T | a spy maid she planted (`spyFor` j29.js:23) | her scheme on that consort +2 steps | Được: scheme odds · Mất: Đức − by tier, the spy can be exposed | cd.atk.spy |
| 13 | «Lời gièm đúng lúc» CÔNG · Phàm · 1 | an NPC in her faction near the Emperor | the accusation `oAccuse` (j8.js:81) +1 step | Được: accusation odds · Mất: Đức − | cd.atk.acc |
| 14 | «Phụ thân dâng sớ» THỜI CƠ · Lương · T (starter, tt) | the Tể tướng father alive | the next promotion check: the clan backing counts double | Được: rank · Mất: Hoàng hậu oán + | cd.tt.so |
| 15 | «Quen lối Kính sự phòng» THỜI CƠ · Phàm · T (starter, cn) | a maid friend there | «Biếu» the court eunuchs (j10.js:119) → +1 step | Được: night · Mất: one khắc | cd.cn.ksp |

## 4. Crisis hook list (where a THỦ / HỘ MỆNH card adds one option; at most one card option per crisis)
| Crisis | Player card (append option here) | NPC path (same function → law 1) |
|---|---|---|
| Poisoned gift | PEND.pgin options jpoison.js:97-102 (`O.push`) | NPC target rolled inline jpoison.js:74 → add `cdPlay(t,"poi")` before the roll |
| Poison / musk / plot | PEND.j70 j70.js:258, opts `optsSeen70` :235 / `optsAft70` :248 / `optsNpc70` :244 (`ch70` :22) | `npcSee70` j70.js:177 |
| Direct «Hạ độc» on her | **no card**: `ACT.poison` j8.js:137 → `apply({suc:-d})`. Add a hook in `caught()` j8.js:123 (auto-play THỦ if she holds one, shown in the result) | `dieIf` j8.js:26 via jagharm.js:79 |
| Frame / vu oan | PEND.vuoan jtruth.js:111, `O` :122-128 | `frameDef` jtruth.js:91 |
| Planted item / maid frame | PEND.wdframe j92.js:340; `cnvFrameOpts` j42.js:384 | `stf2Framed` jagstf2.js:24 |
| Tố giác / trial | **no defence card**: jcharge.js:146-150, `chPunish` :90; HH trial PEND.rcvJudge jrcv.js:219 | same functions |
| Death sentence | **no card**: `deathSentence` j8.js:105 (hook for HỘ MỆNH #7) | same |
| Lãnh cung entry / stay | `cold()` j14.js:2; `coldActsOf` j14.js:17-27; `coldMonth` j14.js:43 | `p3Cold` jagacts3.js:109 |
| Severe illness | `illCards` j13.js:43-48; roll `illMonthP` j13.js:18-20; Sức-0 death j3.js:144 (no card) | `P3C.treat` jagacts3.js:36 |
| Childbirth | **no card**: `pregMonthP` j8.js:408-416, `birthP` j8.js:419-420, `birthRisk` j32.js:3, jmort.js:153-174 | same |

Where a crisis has **no card**, the plan is **auto-play**:
- If she holds a fitting card this season, a small choice appears just before the roll: «Dùng lá <tên>? · Để mệnh trời».
- This uses a kit dialog and adds no new screen.
- NPCs auto-play by their AI.

## 5. NPC + co-op mirror (law 1)
- **One core.** A single function `cdPlay(who, kind, ctx)` serves the player and every NPC.
- **Every consort has the same deck structure as the player:**
  - `p.kho` (the collection);
  - `p.carry`, which starts with the starter deck of **her own identity**;
  - a draw of 3 per season, at the same `monthTick` hook.
- **NPCs earn cards from the same sources.** `bestow` already takes `p`; `q72` debts are two-way.
- **The NPC AI plays her cards:**
  - AGSELF jagent.js:100-108 and the harm table j8.js:129-176 call `cdPlay` before `aRoll`.
  - So a rival may play CÔNG on her, and she may answer with THỦ.
- **Co-op:**
  - Each seat has its own Kho bài.
  - A trade is a two-confirm swap on the ASK path (jcoopworld.js:491).
  - Only the state syncs (the token id moves), never graphics.
  - Signature cards are not tradeable.
  - Note for B/F: trade must be atomic across seats.
- **Existing identity perks** (ORIGINS j1.js:19-28):
  - These are stats and rank, not acts, so none of them duplicates a card. The rule «a perk that duplicates a card becomes that card» has nothing to convert today.
  - The cn y thuật entry (jentry.js:24) **stays a skill**.

**Starter decks** (by birth; equal total strength = the same sum of grade points; the robot checks ±10 %):

| Id | Starter deck | Strength / weakness |
|---|---|---|
| tt | Phụ thân dâng sớ · Môn sinh trong triều · Lời gièm đúng lúc · Hồi môn hậu hĩnh | CÔNG/THỜI CƠ through court; weak THỦ among servants |
| dtq | Thân binh của phụ thân · Gan dạ trước điện · Thư nhà gửi sớ | THỦ by family force |
| muoi | Bạc lót đường ×2 · Mối buôn ngoài cung · Lò sưởi của cố nhân | THỜI CƠ by money |
| cn | Quen lối Kính sự phòng · Tai mắt hạ nhân · Bạn cũ ở Thái y viện · Bà đỡ tận tâm | THỦ/THỜI CƠ by the servant network; weak CÔNG at court |
| nc | Sứ thần mẫu quốc · Lễ vật ngoại bang · Thân phận khó động | THỦ through diplomacy |
| td | Oan khuất chờ rửa · Tâm cơ của kẻ sa cơ · Tai mắt hạ nhân | CÔNG by tâm cơ |
| ch | Thái hậu đang thương · Thái hậu khẩu dụ (Thượng) · Họ ngoại | THỦ through Thái hậu |
| thd | Chữ nghĩa giúp người · Học trò của cha · Đức hạnh được tiếng | THỜI CƠ through tài/đức |
| bd / cnv / pf | the same pattern; to be filled in when building | — |

Each of the 40 roads also has one signature card, tied to the story beats of that road in GE_CAT (jgecat.js:5).

## 6. Robot design (no runs now)
**Tools:**
- `node dev/measure/run_par.js` (run_par.js:2) + `an7.py`, which already sorts lives into cold palace, childbirth, poisoned, executed and illness, and reports time to Hoàng hậu (an7.py:4-12; inpage6.js:12 records `hhTurn`).
- The persona bots in robot10.js (robot10.js:38). **But** robot10.js:1 says its lives are not valid for counts, so the counts must come from F's real-tap harness (`dev/test/robot-rt.js`, harness 97e55a457).

**Arms (the same seeds in every arm):**

| Arm | Setup |
|---|---|
| A | LIVE (no cards) |
| B | cards on |
| C | cards on, NPCs have no cards (to isolate law 1) |

**Sample:**
- Seeds: `seed0+k*101+att*7001` (run_par.js scheme), 3 seed sets.
- Personas: skilled, random, cautious, schemer, lover, lazy, speed.
- Identities: all 11.

**Metrics** (median and p25/p75 for time; rate per 100 lives for the rest):
- time to Hoàng hậu, Nữ đế and the throne road;
- death, split by cause;
- lãnh cung entry and exit;
- how many cards are played per season, by family and by nature (Một lần cards used up vs left over).

**Pass:**
- B vs A: time to Hoàng hậu within ±10 % for every persona.
- Death and lãnh cung: the change is reported, not gated. Sếp sees how much HỘ MỆNH lowers them.
- Per identity in B: time to Hoàng hậu within ±10 % of the mean of all identities (equal value, ~02:20Z).

**The ablation is DROPPED** (owner ~02:40Z). It is replaced by a «card → action» table and a fairness check.

**Card → action table.** Column 4 of §3 is that table: each card names the action(s) it boosts and by how many steps (`BAL.cd.band`). In the build, `BAL.cd.cards[id] = {fam, grade, nature, acts:[...], band|tier|guard}` holds it in one place (law 4).

**Fairness check (law 2/3), per action with a card:**
1. On the same seeds, the action's success rate and gain for a NON-holder in arm B equal arm A within noise. A card only adds; nothing is taken from non-holders.
2. Each persona's use of the action among non-holders drops by at most ~10 %, so no action becomes pointless without the card.
3. For holders, the share of the action's uses that carry a card stays under ~50 %, so the card does not become the only way to do the act.

The privilege acts (Đút lót lật thẻ j2.js:185, Hối lộ KSP j2.js:94/j22.js:49, Cầu tự j2.js:48, Bài thuốc dễ thụ thai / thái y tâm phúc j2.js:181-182, Xin Thái hậu đỡ lời j2.js:167, Xin Hoàng hậu che chở j2.js:171, Xin ân điển j2.js:162, Mua chuộc j8.js:144 / j15.js:80, Cài người j10.js:82, Giả bệnh j13.js:47, Giả mang thai j2.js:58) all stay normal buttons for everyone. They are the main targets of THỜI CƠ cards.

## 7. Kit needs (for KK53 — names only, law 9)
1. A card face on the light «thẻ lụa» look, with a grade frame tone ngà · bạc · vàng · ngọc and a family mark (Công/Thủ/Thời cơ).
2. The season-draw hand, shown with the no-flip Bàn bài hand (jflip.js `kitEmpHand` :59).
3. A **card icon slot in the stage's left icon column**. The icon art comes from Foreman C.
4. A Kho bài collection page (grid + filter by family/grade) and a «Bài mang theo» 10-slot picker.
5. A card chip on an act or option («Bài: <tên> · Có cơ → Vững»).
6. A two-confirm trade card (NPC and co-op).

## 8. Dependencies / step 2
- **Build only after ACT-MOVE + DOOR-ONETAP are LIVE.** They rewrite the act layer that §4 and the card → action table hook into.
- Before building:
  - MAIN rules on §0 (the name, and Tuyệt);
  - F's harness runs arms A/B/C and the fairness check;
  - KK53 builds the kit parts in §7;
  - C draws the icon art.
- **Save migration:** add `S.kho=[]`, `S.carry=[]`, `S.hand=[]`, and the same on every NPC. Old saves get their starter deck at the first season.

## Handover
Plan complete; nothing left except foreman review. No game code was changed.
