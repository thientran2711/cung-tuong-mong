# night-steal — NPC night stealing by agent choice (BUILD)

Worker: opus build worker, session_01UV1SzgeCydcDMrs45qdQaf, opened by MAIN s21 (session_01UV1SzkBh9FhY36EqiUowuZ).
Branch: `review/night-steal` (off origin/main 12f52db7). Status: see the last line.
Rules read: START_CORE, START_WORKER, people-life last line [OD:L1386], OD 16/11 14:10Z + 14:45Z (verbatim core), 18:10Z / 18:40Z (10-night ledger), 18:55Z; reports npc-agent.md §1a row 3 + §3.1–3.2, night-time.md §12 (v2, b385145e), history-thitam.md R5.

## 1. Base (PRIORITY RULE #1)
- `git grep` origin/main + review/*: the steal act, odds and one-try-per-night already exist on main (j8 ACT steal/road, oSteal, stealNight/stealWin; j75 ntCan/ntTry/ntTake; jflip stoleFrom → card-flip shows a stolen night; jemo mood; j28 PERS traits). All reused, nothing rebuilt.
- review/cardflip, review/coop-night-sync: already in main.
- review/npc-mind (jmind, mindW/mindPick 12 % slip): **not PASSED** (SẴN SÀNG KIỂM 7fd289cd, review with Foreman B, no verdict found) → NOT merged. jsteal calls `mindW(v,"scheme")` only when that module is present, so it picks it up automatically when npc-mind lands. The choice is already non-argmax without it (each NPC rolls a try chance; the mode is drawn weighted by its odds).
- review/people-ledger, emotion-acts*, ghen-shown-r1: not needed for this rule (emotion on main = jemo, used).
- **Base used: origin/main 12f52db7 only.**

## 2. What changed
| file | change |
|---|---|
| j8.js flip | the line `hostility(v,t)>=50&&roll(6)` → 50/50 feign/road is **deleted**. stealWin/stealNight read BAL.steal (rel, ghen, cost, failSung); new `stealCost(mode)` |
| jsteal.js (new, after j75) | `stealPass(holder,{live})` = the NPC agent choice, run inside flip() after the tablet + custom night (so jflip's card-flip scene shows it: turned card → stolen pick, cause "stolen") |
| jbal2.js | `BAL.steal` = ONE CORE for the act (cost feign Đức 4 / road Sức 5, failSung 3, rel 15, ghen 25) and the agent knobs |
| j2.js | deck cards Tranh sủng / Chặn ngự giá: cost + fail read BAL.steal; stealKem prints BAL numbers (was typed "+25 / -15 / +9") |
| j75.js, j79.js | fallback text with typed numbers → stealKem(v) |
| j28.js PERS | `steal` weight added to traits that had none: Kiêu ngạo 1.5, Khéo léo 1.4, Trọng nghĩa .8, Thẳng thắn .7, Hiền lành .5, Nhu mì .5 (Tham vọng 3, Ghen tuông 1.6 already there) |
| j28 SOC.steal | the weekly social "steal" (dead path: it ran before the flip, when no night is set) is folded into the one choice (ok → false) |

## 3. The rule (owner 14:10Z + 14:45Z + OD:L1386)
Every consort except the holder (and except the co-op friend, who is a human) may try, with the player's own acts and costs and odds. Eligible = could be bedded tonight (nightCh > 0: not pregnant, cycle tuần, confined, cold palace, tablet hidden), has not tried this night (j75), can pay (feign: Đức ≥ cost; road: Sức ≥ sucMin + cost).
want = **need × personality × relation × fear × odds**:
- need (SELF-INTEREST) = weighted mean of favour gap (100 − Sủng), rank gap (to Hoàng hậu), heir gap (no living son = 1, with a son = heirHas). Weights BAL.steal.need {fav, rank, heir}.
- personality = persW(v,"steal") = her traits (PERS) × her mood (jemo emoMul: ghen × more, sợ / vui less) × mindW (when jmind lands).
- relation to the holder: thiện cảm ≥ friend → friendMin of the wish left (friends rarely rob friends); oán adds at most × (1+oanW) — hatred is NOT the driver.
- fear: holder ≥ fear.gap ranks above her × fear.f; the Empress's custom night (mùng một / rằm) × custom.
- odds = oSteal of the mode she picks (modes drawn weighted by their own odds).
try chance = 1 − e^(−k·want), ≤ pMax; at most maxTry tries a night in random order; the first win ends it.
Her side (symmetric): unchanged deck cards against any NPC holder, same cost (now from BAL) and odds. NPC → NPC is new (old code only fired NPC → whoever was turned, almost only her).
What she sees: a win against her = the card-flip scene (her card turned, the night goes to the thief; "Hoàng thượng bị mời sang cung khác giữa đường") + the Kính sự phòng card with the true text; a failed try against her = log + news; tries between NPCs = news feed under the usual fog (newsAdd), log at Tai mắt ≥ 2.

## 4. 10-night ledger fit (owner 18:10Z / 18:40Z)
The ledger is not built yet (no code on main or review/*). Only the PLAYED night is stolen live (this flip). For the ledger builder: on each non-played ledger night call `stealPass(holder,{live:false})` → `{holder, lines[], tries}`; print `lines` as the notice (Sổ ghi line + toast) and use `holder` as that night's partner. Note: j75 one-try-each is keyed by week (wk()); a ledger must key it per night (S.ntTry/S.ntk) — one line in j75.

## 5. Frequency (bot, measured) — knobs BAL.steal, no typed numbers in text
`node dev/test/night-steal-bot.js <index> 20 3 out.json` + `night-steal-sum.js`. 20 lives × 3 years, real weekly loop, her Sủng floor 25, cycle question off (so every flip resolves). OLD = origin/main build.

**OLD**

#### OLD (origin/main: hostility ≥ 50 + flat 6 %) lives 20 (errors 0, page errors 0) weeks 2095 flip nights 1198 (hers 91) avg rivals 10.6
| target | nights | tries | tries / 10 nights | wins | wins / 10 nights | share of nights stolen | tries / tuần |
|---|---|---|---|---|---|---|---|
| her night | 91 | 4 | 0.44 | 1 | 0.11 | 1.1% | 0.002 |
| NPC night | 1107 | 0 | 0.00 | 0 | 0.00 | 0.0% | 0.000 |
| all | 1198 | 4 | 0.03 | 1 | 0.01 | 0.1% | 0.002 |
modes: feign 3 · road 1
| doer's first trait | NPC-nights present | tries | tries / 100 NPC-nights | wins | win rate |
|---|---|---|---|---|---|
| Kiêu ngạo | - | 2 | - | 1 | 50.0% |
| Đa nghi | - | 1 | - | 0 | 0.0% |
| Tham vọng | - | 1 | - | 0 | 0.0% |

**NEW, k = .25 (final, with per-trait exposure)**

#### NEW k=.25 (final) lives 20 (errors 0, page errors 0) weeks 2170 flip nights 1351 (hers 73) avg rivals 10.3
| target | nights | tries | tries / 10 nights | wins | wins / 10 nights | share of nights stolen | tries / tuần |
|---|---|---|---|---|---|---|---|
| her night | 73 | 27 | 3.70 | 16 | 2.19 | 21.9% | 0.012 |
| NPC night | 1278 | 519 | 4.06 | 217 | 1.70 | 17.0% | 0.239 |
| all | 1351 | 546 | 4.04 | 233 | 1.72 | 17.2% | 0.252 |
modes: feign 310 · road 236
| doer's first trait | NPC-nights present | tries | tries / 100 NPC-nights | wins | win rate |
|---|---|---|---|---|---|
| Kiêu ngạo | 2890 | 181 | 6.26 | 64 | 35.4% |
| Tham vọng | 2333 | 138 | 5.92 | 73 | 52.9% |
| Đa nghi | 2490 | 115 | 4.62 | 37 | 32.2% |
| Hiểm độc | 2285 | 50 | 2.19 | 26 | 52.0% |
| Hiền lành | 2591 | 33 | 1.27 | 18 | 54.5% |
| Nhu mì | 2534 | 29 | 1.14 | 15 | 51.7% |

**NEW, k = .25, second seed run** (same knobs; shows run-to-run spread)

#### NEW k=.25 lives 20 (errors 0, page errors 0) weeks 2278 flip nights 1422 (hers 102) avg rivals 10.2
| target | nights | tries | tries / 10 nights | wins | wins / 10 nights | share of nights stolen | tries / tuần |
|---|---|---|---|---|---|---|---|
| her night | 102 | 32 | 3.14 | 19 | 1.86 | 18.6% | 0.014 |
| NPC night | 1320 | 403 | 3.05 | 244 | 1.85 | 18.5% | 0.177 |
| all | 1422 | 435 | 3.06 | 263 | 1.85 | 18.5% | 0.191 |
modes: feign 231 · road 204
| doer's first trait | tries | wins | win rate |
|---|---|---|---|
| Kiêu ngạo | 163 | 115 | 70.6% |
| Tham vọng | 117 | 55 | 47.0% |
| Đa nghi | 57 | 33 | 57.9% |
| Hiểm độc | 47 | 26 | 55.3% |
| Hiền lành | 27 | 18 | 66.7% |
| Nhu mì | 24 | 16 | 66.7% |

Reading: an NPC tries on ≈ 3–4 of every 10 nights (old ≈ 0.03); the night changes hands on ≈ 17–19 % of nights (old 0.1 %); HER played nights are lost ≈ 19–22 % (old 1 %), ≈ 1 in 5, close to the analyst's "≤ 1 lost per 6 of her nights". Per tuần (36 a year) that is ≈ 0.19–0.25 tries. By trait (tries per 100 NPC-nights present): Kiêu ngạo / Tham vọng ≈ 6, Đa nghi ≈ 4.6, Hiểm độc ≈ 2.2, Hiền lành / Nhu mì ≈ 1.2 — ambition and pride lead, the gentle rarely try. Tham vọng's base weight is 2× Kiêu ngạo's, but Tham vọng women already hold more favour/rank in these runs (smaller need), so the two end level. Win rates per trait swing between runs (small samples per life); overall ≈ 45–55 %. Knobs: BAL.steal.k (overall rate), pMax, maxTry, need/friend/fear.


Earlier calibration run (k = .35): 4.6 tries / 10 nights, 25.8 % of nights stolen, her nights 30.5 % stolen → too punishing for her; k lowered to .25 (≈ night-time v2 §12 target "night changes hands on ≈ 17 % of evenings", "≤ 1 lost per 6 of her nights").

## 6. Tests
| test | result |
|---|---|
| unit `dev/test/night-steal-unit.js` (21 checks: one-core costs; NPC→her live, prep card withdrawn, cost paid, one try; NPC→NPC; her→NPC same act/cost; need/relation/hatred/personality ordering; pMax; no-hatred NPC still tries; failed try keeps her night; ledger live:false; maxTry; co-op guest decides only tries against herself; co-op friend never an NPC; flip → nightWhy "stolen"; SOC folded) | 21/21 PASS, 0 page errors |
| bot frequency (§5) | 20 lives OLD + NEW, 0 errors |
| old save (`night-steal-oldsave.js`: main build plays 3 weeks + saves, new build loads, 6 weeks with forced tries) | PASS (no new save fields; window.__stealSt is measuring only, never saved) |
| co-op `dev/test/coop-e2e.js` (Fold host + iPad guest, live Worker) | 59/59 passed |
| perf smoke (`flip()` 200×, 10 rivals) | flip 0.30 ms new vs 0.30 ms old; stealPass 0.12 ms |
| shots (`night-steal-shot.js`: her card turned, an NPC takes it on the way) | Fold 755x1000@2 `night-steal/steal-fold-755x1000.jpg`, iPad 1180x820@2 `night-steal/steal-ipad-1180x820.jpg`: her card turned, result "Thẻ bài của ta được lật · Giữa đường, Hoàng thượng bị mời sang cung khác. Đêm nay: <thief>"; no horizontal overflow, 0 page errors. Kit notes for the reviewer (existing jflip/KIT §67, not changed here): on Fold the turned card is no longer shown big in the final still (empty middle slot); on iPad a faded tag of the card under the result chip shows through. |

## 7. Not done / for the coordinator
- Optional (night-time v2 §12): a warning card when she has Tai mắt ("người của X đang chạy sang…", 3 answers). Not built: needs a dilemma (existing kit card, no new part) and an owner nod; easy follow-up.
- j79 stealX "Sủng +3, Ân tình +2 trở lên" are NIGHT gains (nightFx), not steal numbers; out of this scope (one-core audit of night gains belongs to the night package).
- jaudit.js:92 regex "ghen +25, thù -15" never matched the current text (dead); left as is.
- The 90 % / 65 % flip odds: untouched (owner keep).

## 8. Gain / risk
- Gain: stealing is now a choice by interest, personality, mood and relation for every consort, against her AND each other; drama ≈ 3 tries per 10 nights (was ≈ 0.03).
- Risk 1: her nights stolen too often → likelihood có thể, severity vừa; detect: this bot (her row); fix: BAL.steal.k / pMax. Measured 18.6 % at k .25.
- Risk 2: a reviewer prefers jmind's slip inside the pick → hiếm, nhỏ; mindW hook already in place.
- Risk 3: co-op guest's own night decided locally (as before) → hiếm, nhỏ; same pattern as the old code, host keeps NPC-vs-NPC.
Được lớn hơn: the owner's rule is built with her own acts and odds, and the rate sits where the analyst and the owner's "much more drama" meet.

SẴN SÀNG KIỂM 4b5919af195c4156e837b10616e812784000157a (review/night-steal; code commit a9b8741e + k/bot/site commit 4b5919af). Not pushed to main.
