# HISTORY / DRAMA / GAME research — Thị tẩm card flip, 1st/15th, night stealing

Worker: history expert (s17 child). START_CTX ~3 %. No code changed.
Confidence tags: [DOC] = documented in primary/standard scholarship; [MIX] = documented in part, details come from late memoirs/eunuch recollections; [POP] = popular belief / drama invention. Web search gave only popular-history pages (thecollector.com, ancientwarhistory.com, Wikipedia mirrors), so most of the text below is from the worker's own knowledge; nothing here is a verified quotation. Treat every [POP]/[MIX] as flavour, not law.

## 0. How the game works NOW (origin/main)
- Time: 1 "tuần" = one 10-day period (TUAN = thượng/trung/hạ tuần, j1.js), 3 per month; each has 4 buổi (sáng/trưa/chiều/tối, 4 khắc each, jtime4.js). S.tuan 0 is called "mùng một", 1 is "rằm" in j75.js. So the game's "night" is ONE sampled night per 10 days, not every night.
- flip() (j8.js:486) runs at the day change: 90 % chance a card is turned, weighted by nightCh(p) (Sủng, Sắc, arts, rank, tablet bribe...). nightCh = 0 for pregnant / hidden tablet / confined / out; illness and cycle (jcycle.js) grey the card. S.nightWhy (j75.js) stores pick, flip0 (card he turned), cause (tablet / custom / stolen), reasons per row. jflip.js only SHOWS that result; never changes it.
- 1st/15th TODAY (j75.js): probabilistic, mùng 1 40 %, rằm 20 % (FAIRN.custom) the Empress gets the night, only if she is eligible and the night is not already taken (ntTaken). Owner now wants it AUTOMATIC (OD 16/11 14:00Z #3).
- Stealing: acts "Tranh sủng" (feign illness, cost Đức −4) and "Chặn ngự giá" (road, cost Sức −5), j8.js oSteal: Tranh sủng 34 + Sủng/3 + Sắc/10 + fit; Chặn 30 + Sắc/5 + vũ×5 + fit. Win (stealWin): rel(a,t) −15, loser's ghen +25, night moves to the thief. Fail: thief Sủng −3. ntTake locks the night so only the first success counts (j75). NPCs: inside flip(), any NPC with hostility ≥ 50 to the pick has a flat 6 % to try (random feign/road) — NOT driven by trait/mood.
- Emperor visits himself: review/emperor-visit (jvisit.js, PROGRESS_review-emperor-visit.md) already has a daily visit roll after flip (rises with Sủng, Ân tình, his nature). Reuse; do not build a second one.
- Co-op: merged week (COOPW.pend), each player sees cards by own knowledge, friend's card on tray read-only; host-only rolls.
- Empress is currently ON the tray (nightCh +5 if rank ≥ 7).

## 1. REAL HISTORY
### 1.1 Kính sự phòng and the green-head tablet [MIX]
- 敬事房 (Jingshifang) was a eunuch office under the Imperial Household Department [DOC]. Its jobs: present the tablets, keep the intimacy register (the Ming equivalent 彤史 Tongshi recorded dates, and also menstruation and pregnancy [DOC for Ming]), report pregnancies.
- 绿头牌 (green-head tablets): wooden/lacquer slips with the consort's rank and surname, green-topped; the head eunuch brought them on a silver tray after the Emperor's dinner (晚膳, evening) and he turned one over ("翻牌子"); no pick = "撂牌子" [MIX; the tray after dinner is widely repeated, details come from memoirs and Qing "宫史" style sources].
- Late-Qing detail that a chosen consort was carried wrapped in a quilt to the Emperor's bedchamber and had to leave before dawn, and the "stay or not" (留不留) question afterwards: [MIX/POP], sensational, many scholars doubt how universal it was. Higher ranks were also visited in their own palace (驾幸) [DOC that visits happened]. → Do NOT add the "stay or not" part (unsavoury, uncertain).
- Time of day: evening, after dinner [MIX]. So "start of the evening buổi" is historically right.
- Who was on the tray: popular claim that the Empress had no tablet and lowest ranks (答应/常在) were not always on it [POP]. Safe to say the Empress was handled outside the ordinary rotation.

### 1.2 The Empress's 1st and 15th [POP + partly DOC]
- 朔望 (1st and 15th) were ritual days [DOC]: Ming 朔望朝 court sessions, incense offerings, greetings to the Empress Dowager, rites in the palace.
- The rule "the Emperor spends 1st and 15th with the Empress" is the old 嫡妻 household custom (the legal wife has the 1st and 15th, concubines the other nights) and is repeated for the imperial house, in Ming and Qing [POP/MIX]. Real emperors broke it freely (Qianlong and others spent many 1st/15th elsewhere) [MIX]. One mirror of a Wikipedia bio says custom required "one day a month" with the Empress, which hints the rule was looser than the "two fixed days" legend.
- No Empress: Qing emperors often had none for long stretches. Documented substitute: a high consort "摄六宫事" (given charge of the six palaces) acted as head of the harem (e.g. Qianlong's Noble Consorts) [DOC]. Whether she inherited the 1st/15th nights is not documented [POP].
- Empress ill / pregnant / in mourning: Emperor visits to inquire ("看望") and sits with her, no night [POP, plausible]; during national mourning and before great sacrifices (斋戒, fast at the 斋宫) he stayed out of the inner court entirely [DOC].
- Cycle: Ming Tongshi logged menstruation; a consort in her period could not be summoned [DOC for Ming].
- Empress Dowager / Thái hậu watching nights: "mưa móc đều khắp" (spread the favour) was a standard remonstrance by Empress / Empress Dowager; already in the game as the admonition rule [DOC as ideal].

### 1.3 Ngự giá vs summoning [MIX]
- Two modes existed: summoned by tablet (Emperor stays in his own palace) and 驾幸 (Emperor goes in person to a consort's palace). Visiting was the more honourable form and common for high ranks and favourites [MIX].
- The "goat cart" story: Emperor Wu of Jin (晋武帝) let a goat cart wander through his harem and slept where it stopped; ladies stuck bamboo leaves and sprinkled salt water at their doors to lure the goat [DOC as anecdote, Jin shu]. Perfect ancestor of "Chặn ngự giá".
- Qing story that young Cixi sang in the garden to catch Xianfeng's ear [POP].

### 1.4 How rivals interfered [MIX/POP]
- Bribing Jingshifang eunuchs to put one's tablet where the Emperor's hand lands, to hide/lose a rival's tablet, to delay the tray [MIX: eunuch corruption documented in general, individual cases mostly gossip]. The game already has "đút lót Kính sự phòng" and "thẻ bài bị giấu".
- Feigned illness or "emergency" reported to the Emperor, intercepting him on the way, staging a performance (music, dance) on his usual path [POP, dramas and anecdote].
- Poison/rumour against the flipped consort so she is struck off: beyond this task.
- Vietnamese / Nguyễn court: the same Chinese model was copied (Tam cung lục viện, bát tháp… Nội giám keeping the book), but the worker found no Nguyễn-specific nightly-card source; treat as Chinese-derived. [unknown]

## 2. PALACE DRAMAS (from memory; episode numbers not cited)
- Chân Hoàn truyện / Empresses in the Palace (2011): the tray of "lật bài" scenes with Công công 苏培盛 (Su Peisheng); the Emperor goes to the Empress on the 15th as a duty and visibly with little warmth [POP]. Stealing the night is constant: a consort's maid runs to report her mistress "suddenly ill" (Hoa Phi / Hoa Phi's people do this; Zhen Huan herself uses illness/accident and also staged encounters: the Kinh Hồng vũ, the singing, the chance meeting) [POP]. Consequence pattern: the stolen-from consort holds a grudge, the thief is later accused of "tranh sủng" by the Empress/Thái hậu; open stealing on the Empress's night is a crime of disrespect. The Emperor (Yongzheng-based character) punishes cheap tricks he sees through.
- Diên Hi công lược (2018): Empress Phú Sát keeps the 1st/15th religiously, and the Emperor's "not coming on the 15th" is read by the whole harem as a signal; stealing with illness, with a "gift" or with a prepared dish; the cost is a loss of Danh when seen through [POP].
- Như Ý truyện (2018): Empress and then Như Ý's quarrels about who the Emperor visits on the 1st/15th; after the Empress's death the 1st/15th claim passes to the "acting" consort in practice; the intercepted "kiệu" and staged illness appear again [POP].
- Common drama grammar: (1) tray scene with the card names read aloud; (2) the Emperor flips, a maid or eunuch rushes in with the false news; (3) the Emperor either goes (thief wins) or sees through (thief loses face); (4) the victim and her camp are shown seething; (5) the thief's victory is repaid later through gossip, accusations or a counter-trick. That maps exactly onto our oán/ghen per current rules.

## 3. GAMES (recollection, not checked; small sample)
- Chinese 宫斗 mobile games (e.g. the official Zhen Huan Zhuan mobile titles, "Palace" style card games) usually: (a) have a daily "summon" with a limited number of slots, (b) show the flip as a short cutscene with a name list, (c) rank the chance by favour + rank + item boosts, (d) let rivals "intercept" with cooldowns, (e) tie loss of a night to a jealousy/hostility meter. Most are one-sided (only the player interferes); the owner's symmetric rule (OD 14:10Z) is a stronger fit for a life sim than for those games.
- Western harem/court sims (Crusader Kings-style consort rotation, Concubine games on itch/Steam): night choice is the player's pick, interference is event-driven (jealousy event fires when relationship < X). Our weighted tablet + intercept act is richer.
- Lesson: timing early + visible trays + counter-play keeps the loop engaging; hidden NPC actions with no warning feel unfair.

## 4. PROPOSED RULE SET
Calendar mapping: mùng 1 = tuần 0 (thượng tuần), rằm = tuần 1 (trung tuần). Hạ tuần (tuần 2) has no custom night. All numbers go in BAL (ONE CORE rule).

### R1. Flip at the START of tối [owner rule, 14:00Z #4]
- When S.buoi becomes 3 (tối) the night is decided (flip + custom + NPC attempts pending) and the cardflip scene plays at once; rest of the tối the player may act with her khắc (Tranh sủng / Chặn ngự giá / others) before "Sang ngày mới". Historical fit [MIX]: tray comes after dinner.
- A won steal replays only a short "ngự giá đổi hướng" beat (not the whole scene). A lost one is a log line.
- Gain: everyone has full information and khắc, history fits, no uneven cut of khắc. Risk: (a) co-op sync, both players must see the tray at the same time — likelihood: can happen, severity: medium, detect: both clients show different pick in the 2-seat test; fix: result decided by host only (as emperor-visit does). (b) the player now sees the night early and acts on it, so cheap steals become near-free; likelihood: likely, severity: small-medium, detect: bot test of win rate; fix: BAL odds/cost.
- Gain > risk.

### R2. Empress nights: automatic, no tray [owner #3]
- If an Empress is eligible (alive, not cycle, not pregnant ≥ visible, not ill, not confined, not in mourning/fast) on tuần 0 and 1: the Emperor goes to her palace at the start of tối, skipping the contest for that night.
- DECISION D1 FOR THE OWNER (important blind spot): our "night" is one sampled night per 10 days. If the custom night REPLACES the flip, the Empress gets 2 of 3 game-nights a month and everyone else starves (real: 2 of ~30). Recommend: **both happen**: on tuần 0/1 the tối starts with the Empress's visit as a short "mùng một / rằm" scene (small gains, not the full night scene) AND the normal flip still runs and represents "the other nights in these ten days". Other options: (B) replace (2/3 of nights to the Empress: too strong), (C) keep % (current 40/20: random, owner dislikes).
  Wait for the owner to pick before coding.
- Empress is OFF the tray on every tuần (she is never flipped), reached only on 1st/15th, by Tranh sủng/Chặn against others, or by an Emperor visit (jvisit). CHANGE vs today (nightCh +5 and on tray): confirm with owner, small and revertible.
- Gain: clear, historically flavoured, owner asked. Risk: harming Empress-player balance or an NPC Empress's heir odds: likelihood: can happen, severity: medium; detect: births-per-year balance bot (as in OD s9 pregnancy balance); fix: BAL.custom gains.

### R3. Edge cases
1. No Empress (vacant / dead / deposed): the acting head (highest-rank consort holding 摄六宫事, game = highest rank or Quý phi) gets a 50 % chance of the custom visit on tuần 0/1 (not automatic; she is not the Empress) [custom passing to her is POP]. If nobody holds that role, nothing. Gain: avoids a dead calendar; risk: tiny (rare, small, tune BAL.actingChance).
2. Empress barred by illness / pregnancy: Emperor still comes in the evening to sit with her ("ngự giá thăm bệnh"), no night, small bonus to her Sủng/Ân tình, other consorts do not get her night. Not transferred (blocks a farmable loophole). Barred by her cycle (jcycle): the visit becomes "tea only" the same way. [POP, plausible]
3. Mourning / fast (if the game has Thái hậu death or festival fast): Emperor alone, no custom, no flip that tuần; tray does not play (show one line). [DOC]
4. Player IS the Empress: she is summoned automatically; scene "Hoàng thượng đến cung Hoàng hậu" with ONE optional choice: "Khuyên ngài sang cung khác" (virtue: Danh +, Thái hậu +, Emperor regard + small, the chosen consort gets the night and owes her) or stay. Her own card never on the tray. She may still use Chặn ngự giá against others (cost as now) but not Tranh sủng against herself. [DOC as ideal: remonstrating wife]
5. Co-op: tối start is the merged sync point; host decides; each seat sees cards by her own knowledge, own card glows (owner 14:05Z). If player A is Empress, player B's steal against A's custom night has −25 odds and a heavy fail penalty (R4). If both are consorts, simultaneous attempts: order by khắc stamp, tie broken by host roll; first success locks (ntTake). Gain: determinism, no duplicate night. Risk: desync on tie: rare, small, detect by the co-op bot.
6. Both flipped consort and Empress barred the same night, nobody eligible: "Hoàng thượng nghỉ một mình" line (already the nightWhy text).

### R4. How a steal changes the night
- Keep current numbers (winner: night moves, rel −15, loser ghen +25, thief cost Đức −4 / Sức −5, fail Sủng −3). Add only visibility: the loser learns the thief if she has tai mắt ≥ 2 or the chance oSee, else it is a rumour / stranger rule (so oán is not always aimed correctly). Gain: fewer free steals; risk: low (small, easy to retune, detect by news log).
- Against the Empress custom night: Tranh sủng odds −25, Chặn −20; failure Danh −5 and Empress oán +; win = Empress oán big (+15), Thái hậu displeased by chance. Dramas show this as a serious offence [POP]. Risk: players avoid it entirely: that is fine.
- The flipped consort who loses her night: keeps the "card turned" record in the book (Kính sự phòng note), small Danh loss to nobody, only ghen/oán per rule above.

### R5. Symmetric NPC interference [owner 14:10Z]
- Each NPC (not Empress-custom exempt, eligible: nightCh(npc) > 0, not cycle/pregnant/confined, has Đức/Sức for the cost) computes an intent once per tối against the current holder (the player, another NPC or the Empress night):
  intent = trait base (Tham vọng .35, Ghen tuông .25, Kiêu ngạo .25, others .10-.18, reusing npcEffort's EFF table) + 0.4 × (ghen or malice of her toward the holder)/100 + relationship term (−rel/200: dislike raises, ally lowers, near zero if rel > 40) + mood term (her ghen, or Emperor mood ≥ 2 raises caution: lowers) + opportunity (own Sắc/Sủng via oSteal) − fear term (holder's rank much higher: −).
- Take the 2 highest intents per night at most; each rolls "tries?" with p = intent × FAIRN.eff; if she tries she pays the same cost and rolls oSteal against the holder. Order: after the player's last act of the tối or at "Sang ngày mới", so the player can act first with her visible tray; first success locks.
- Warning to the player when she is the target and has tai mắt ≥ 2: "Tai mắt báo: {name} định chặn ngự giá của ngươi". No counter act exists yet; OPTIONAL later kit request "Cử người canh hành lang" (cost khắc, −odds). Not required for v1.
- Replaces the flat 6 % / hostility ≥ 50 in flip(). Gain: traits and mood matter, owner's symmetry done; risk: NPCs steal too often (likelihood: can happen, severity: medium, detect: bot counting steals per year, target ≤ ~1 per 6 tuần per NPC; fix: FAIRN.eff, cap 2).

### R6. Other customs worth adding (all optional)
1. 朔望 on tuần 0/1: festival line "Mùng một / Rằm" already in nightScene: add the Emperor's morning greeting to Thái hậu (existing Thái hậu system): tiny Danh for the Empress. [DOC ritual]
2. Goat-cart flavour: a rare event "Xe dê" where the Emperor lets the lantern-cart wander; each eligible consort prepares (bamboo leaf/salt) → counts as a group Chặn ngự giá. Cute, historically tied [DOC anecdote]. Risk small; only if owner likes.
3. Acting-head title (摄六宫事) as a power-up for the highest consort with no Empress: she may run Empress duties (judge, admonition). Already near existing "queenP()" logic; check before building.
4. Emperor-initiated visit: ALREADY in review/emperor-visit; add that on such nights there is no flip, Tranh sủng does not apply (Chặn ngự giá only). Priority rule #1: reuse.
5. Not recommended: "stay or not" (留不留), carried-on-back, eunuch pressing the back: sensational, uncertain, unsavoury; not adding.

### Risk summary (as asked)
| Rule | Gain | Risk (likelihood / severity / detect-fix) |
|---|---|---|
| R1 start of tối | info, fairness, history | co-op desync (can / medium / 2-seat bot, host decides); cheap steals (likely / small / bot win rate, BAL) |
| R2 automatic Empress nights | clear custom, owner wants | Empress over-strong if replacing (likely if option B / medium / balance bot; choose option A) |
| R3 edge cases | no dead states, no loopholes | tiny (rare / small / news log) |
| R4 steal visibility + Empress penalty | oán feels fair, dramas' pattern | low (can / small / retune BAL) |
| R5 NPC intent | symmetry, trait-driven | too many NPC steals (can / medium / count per year, cap 2) |
| R6 extras | flavour | optional, parked |

Verdict: Được lớn hơn, provided the owner picks D1 option A (or consciously accepts B).

## 5. Questions for the owner (one at a time, with options)
- D1: Empress custom night = REPLACES the flip (2/3 of nights) / ADDS a short visit scene, flip still runs (recommended) / keep probability.
- D2: Empress off the tray entirely (recommended) or still on it on other days.
- D3: Vacant throne: acting head gets 50 % custom night (recommended) or nothing.
