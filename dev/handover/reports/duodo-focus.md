# duodo-focus — Dư đồ FOCUS VIEW + every person act = an on-figure mini-game (MAIN CHÍNH 90, worker session_01Rc5AsN9YcB3r7aJt7LGx7R)
PRIORITY #1 CHECK ('dư đồ focus' / 'focus view' / 'kitFocus'): OD 3 (21/11 ~06:20Z idea, ~06:50Z approval, ~06:55Z NPC-initiated addition) | ledger 0 | claims = this row only | main 0 | review/* 0.
('jslap' / 'jsgame' / 'jpma'): main — jslap.js (Tát power bar + NPC slap «Né đòn», BAL.slap jbal2:538; also drives jlooks Hắt nước / Hắt trà / Quạt mực), jsgame.js (Nghe ngóng / Truyền lời / Mặc cả / Thời cơ, sgShift = one ladder step, BAL.cut.sgStep), jpma.js (Cùng chơi / Thách đấu), jmgt.js mgTier (ONE rank-difficulty engine, law 5), jfigseal / jemoseal (mood seal on every stage figure), j59 stage tokens (`.tok.fig.bob` = idle bob exists), j15 popCard (today's person pop-up `.pcpop`, groups by kitActCat → KIT_CAT), j2 talkOpts / talk(oi) (the acts + executor), j9 placeHarms (Ngáng chân / Đẩy nàng xuống hồ sen at vuon / Dò la / Tung tin đồn / Bỏ độc …), j15 RVGRP (Hậu cung act groups), jrcv rcvCard (NPC asks her). REUSE all; nothing of the focus view exists.
START_CTX ≈ 4 % of the 1M window (rollover at 29 %, ceiling 60 %).

## STATUS
- 21/11 ~07:35Z K-FOCUS-1 written (dev/kit/KIT_REQUESTS.md, 39ff7e76) → MAIN «KIT REQUEST K-FOCUS-1» sent.
- PLAN below → MAIN «PLAN READY». Step 2 building waits for MAIN's laws 1–6 check.

## PLAN

### 0. What the player sees today (Fold shot, 21/11): Ngự hoa viên stage → tap a figure → the RIGHT page turns into the person card (`.pcpop`: portrait left, group tabs Giao thiệp 3/18 · Mưu kế 0/3 · Hại người 0/4, long §6.3 act rows). The focus view REPLACES this tap on the place stage (the pop-up stays for every other host and as the fallback when Cảnh động is off? → no: the focus view has its own reduced-motion form, the pop-up is no longer opened from a stage tap).

### 1. STEP 1 — focus view (UI on kitFocus, K-FOCUS-1)
- Hook: the stage figure tap (j6 `popIdx` set by the token click; j21 open) → `dfOpen(i)` instead of the `.pcpop`; `popIdx` stays the source of truth so talk(oi), the log sync (popMsg) and co-op keep working; ✕ = popIdx=null + walk back.
- Data = the SAME acts the pop-up has (talkOpts(p) → kitActCat groups, «làm được/tổng» counts, lock reasons, Tốn/Được rows via the §6.3 row html for the «!» popover) PLUS the in-person ACT acts of the Hậu cung groups that need her to be there and are not yet in the pop-up (owner names them: Tát; and the same family Phạt quỳ, Hắt nước, Hắt trà, Quạt mực) — each run through its own doAct/runAct path (jslap, jlooks), placed in the kitActCat group of its name (Mưu kế / Hại người). Remote acts (Vu oan by letter, Rút thẻ bài …) stay in Hậu cung (one home per act, jact).
- Every person kind on every place (rival, hh, emp, th, maid, serv, ty, ksp, peddler, fallen, kid, men, elders, co-op friend); co-op both seats (local display; acts go the existing runAct / jcoopworld path).
- Until KIT READY I build the logic against a thin adapter `dfView` (one file) so wiring onto kitFocus is a swap, not a rewrite; no private CSS ships.

### 2. STEP 2 — act → mini-game table (every act reachable on a person from the Dư đồ)
Result rule (ONE CORE, no new numbers): (A) an act with a roll (o < 100) → the game's raw 0–10 moves the odds ONE ladder step via jsgame sgShift + BAL.cut.sgStep (7+ up, 4–6 same, 0–3 down) — exactly the existing scheme-game rule; (B) a tiered act (Tát, Hắt nước, Hắt trà, Quạt mực) → its own BAL.slap tiers (red / amber / else = nặng / vừa / nhẹ; BAL.slap.bar widths by rank); (C) a sure act (o = 100, no tiers) → the act's numbers are unchanged; the game decides only the REACTION (face seal + line: khéo / vừa / vụng); (D) an act that already has a full game opens THAT game from the focus view (no copy).
Every gesture game: «Làm luôn» = skip = plain odds (A) / BAL.slap.def nhẹ (B) / no game (C) — same price; the game is a choice with its own up AND down (law 2/3). Difficulty: mgTier(kind,{occ}) (law 5: stake rises with HER rank; Tát/Né keep their tat/ne occasions); per-kind ease = BAL.mgTier.kAdj[kind] (new keys, value 0 to start, calibrated with dev/measure/mg-bots.js). Time limits / zone sizes per engine = new BAL.df block (jbal2, with source line), nothing typed in code.

| # | Act (who) | today | class | on-figure mini-game (engine) |
|---|---|---|---|---|
| 1 | Tát (rival/hh lower rank, ACT tat) | jslap power bar | B | SWIPE «Giáng tay»: her hand (painted sprite) swipes across the face; tier = swipe speed through the cheek zone (red/amber = BAL.slap.bar zones mapped to speed bands); the face turns away (dodge) faster with rank |
| 2 | Hắt nước / Hắt trà / Quạt mực (jlooks) | jslap game | B | SWIPE: flick the cup / fan toward the face zone; tier as #1 |
| 3 | Ngáng chân nàng (placeHarms) | roll | A | SWIPE low: sweep the foot across her path at the step beat (her walk bob = timing) |
| 4 | Đẩy nàng xuống hồ sen (vuon only) | roll | A | TUG «Xô»: alternate taps / pushes at the pond edge against her balance meter; her resistance by rank |
| 5 | Phạt quỳ (ACT phatquy, authority) | sure | C | STARE «Uy»: hold the press while her eyes rise; release in band = she kneels at once (reaction) |
| 6 | Chào hỏi · Thỉnh an · Thỉnh an, chép kinh · Nhún nhường · Tạ lỗi | sure / roll | C / A | BOW «Hành lễ»: rings close on the figure, tap on the beat (3 beats) |
| 7 | Tặng quà (gift picker → jgift) · Dâng hoa (emp) · Đưa cơm áo (fallen) · Mua … (peddler) · Bài thuốc / Xin thuốc (ty) · Đút lót lật thẻ (ksp) | sure / roll | C / A | DRAG «Trao tay»: drag the item into her moving hands; reaction from the EXISTING like/dislike (gift) result |
| 8 | Mượn son phấn · Xin son phấn | roll | A | DRAG reverse «Nhận»: take the box from her hands while she offers it (window) |
| 9 | Chia sẻ bí mật · Rỉ tai chuyện trong cung · Bàn tán về … · Kể tội một phi tần (th) · Cảnh báo nàng · Nói thật lòng (emp) · Hỏi chuyện cũ (fallen) · Nghe ngóng chung · Sai đi dò la (maid) · Hỏi sở thích Hoàng thượng (ksp) | roll / sure | A / C | EAR «Ghé tai»: hold your finger at her ear zone; release when the onlooker's glance (meter) turns your way |
| 10 | Hỏi han sức khỏe · Khen tài nghệ · Tâng bốc · Thử lòng · Nương theo · Nhờ giúp đỡ · Giúp đỡ nàng · Ghé chơi · Cùng cung · Tâm sự / Trò chuyện (maid) · Xin che chở / đỡ lời (hh/th) · Xin ân điển · Bàn chuyện triều chính (emp) · Mời làm thái y tâm phúc · Học hỏi y lý · Xem sổ thị tẩm | roll / sure | A / C | WORDS «Lời hay»: soft word-bubbles drift round her head; tap the ones that suit HER (her real likes / nết / mood from the record: jemo, LIKES, trLine) — no new data |
| 11 | Khiêu khích · Trút giận · Hạ nhục · Hặc ăn mặc sai phẩm · Tố vượt phẩm · Tố xa xỉ | sure / roll | C / A | STARE «Đấu mắt»: press-and-hold, keep the pressure in band while her gaze pushes back |
| 12 | Dò la · Tung tin đồn · Nghe lén câu chuyện · Bỏ độc vào trà nàng · Bỏ xạ hương · Đẩy con nàng xuống hồ · Vu oan (placeHarms) | jsgame | D | opens the EXISTING jsgame choice (Tự ra tay / Giao cho người làm) — its board shown in the focus play layer when kitFocus allows, else its own frame |
| 13 | Cùng chơi · Thách đấu | jpma | D | opens the EXISTING jpma flow (receiver choice → kitGameVs) |
| 14 | Phô tài: <art> (emp) | roll | D | opens the EXISTING art board of that art (j82 playArt, occ trieu), result step as today's contest |
| 15 | NPC-initiated (06:55Z): her slap on her («Né đòn» jslap), push into the pond, a gift to her, a greeting, a jpma ask (rcvCard), any card whose speaker stands with her at this place | Q card | — | the SAME focus scene: the person walks in, SAY box carries the card text (lines → «Tiếp»), the card's options fan out L/R as choice buttons; «Né» = SWIPE-DODGE on the figure (her hand comes at the screen, dodge by swiping away; result = BAL.slap dodge rule: one tier lower, nhẹ = miss); pond = TUG resist; gift = DRAG catch. The NPC's animation plays DURING her game (06:55Z (2)). Generic adapter: one rule for every person card (law 11), no per-card code |
Reaction after every act (all rows): the result card text stays the source; the figure shows the mood seal lean-in (jemo emoSet already fires on most acts), ONE line in the stage speech bubble (the act's result line, kLitLog), the delta chips float up (existing kit chips). Idle on the map: tokens already `bob`; I add nothing new there unless the keeper's kitFocus brings a breathing idle (owner asked for idle + mood bubbles: mood seals are already beside every stage head — jfigseal).

### 3. LAWS
1 two-way: every gesture has the NPC mirror (row 15) on the same engine; NPC→her acts already exist (jagacts* AGRUN, jslap NPC slap, jrcv); NPCs never «play» — their side stays the existing roll / mgNpcRaw (as jsgame/jpma). 2 equal value: play vs «Làm luôn» = same price, game goes up OR down one step. 3 gain-and-loss: no act's gain/loss rows change. 4 one core: outcomes from existing BAL (sgShift/sgStep, BAL.slap, mgTier); new knobs only in BAL.df / BAL.mgTier.kAdj with source line. 5 harder with rank: mgTier stake by her rank (her rank for her acts; the attacker's for dodges, as jslap ne). 6 real world: items given move through the existing gift path (ledger), nothing invented. 7 words: no %, ladder words only, no word in play (OD 20/11 ~05:10Z). 9 kit: kitFocus only (K-FOCUS-1). 12 Fold + iPad shots 3× + mp4 both devices.
Old saves: no new saved state except S.df (last group per person kind, optional); loads without it.

### 4. ART REQUEST (Foreman C, Magnific gpt-2-6; I draw nothing)
- ART REQUEST df-hand: her hand, first-person, open palm + sleeve cuff (cổ trang, fair skin, no jewellery change by rank needed), 3 poses (raised · mid-swipe blur-free · after), transparent webp ≤ 40 KB each.
- ART REQUEST df-props: cup of water (splash), teacup (tea splash), ink fan (ink spray), gift box in hands (generic, the real item picture is drawn on it by code from itemArt), son phấn box — transparent sprites ≤ 40 KB.
- ART REQUEST df-npc-hand: an NPC's hand coming at the screen (for «Né»), 2 poses.
Until art lands the engines use the kit glyph set (jnwb NWB signs) — no code-drawn hand where a painting is expected: the gesture runs with a kit trail line, the hand appears when the art is in (flag in BAL.df.art).

### 5. ORDER OF WORK
(a) dfView adapter + data (talkOpts + in-person ACT acts, groups, counts) + test; (b) engines SWIPE, BOW, DRAG, EAR, WORDS, STARE, TUG (one file each, shared `dfGame` shell: start/score/skip, mgTier, BAL.df) + result mapping A/B/C/D + tests (raw → step / tier, skip = plain); (c) NPC encounter adapter (row 15); (d) wire onto kitFocus at KIT READY; (e) gates + shots + mp4. If (b)–(c) run long, Step 1 lands first (I tell MAIN).

### 6. QUESTIONS FOR MAIN (decided by default if no answer in 30 min)
Q1 class C (sure acts): numbers unchanged, game = reaction only — default YES (any number change would invent an outcome the act does not have).
Q2 the stage tap no longer opens `.pcpop` (focus view replaces it on the place stage only; every other host keeps the person card) — default YES.
Q3 06:55Z NPC-initiated in scope (row 15) — default YES.
