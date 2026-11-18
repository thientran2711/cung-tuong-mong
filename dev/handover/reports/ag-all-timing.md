# AG-ALL timing + parity — how review/ag-all 8f7bdd329 works TODAY (answers to OD 17/11 ~14:50Z, lines 1616–1617)
PRIORITY #1 CHECK ('adHapArrive|agHap|agSlot|j95sync|toilNpc'): OD 2 (L1616, L1617) | main jact.js adHapRoll/adHapArrive | review/ag-all 8f7bdd329 (jagent, jagday, jagacts, jagstaff, jagharm) | claims AG-ALL-2 session_01UV1Szhs6A6KH6MfsDpei7t (build).
Read-only answer, no code changed. Line numbers = review/ag-all 8f7bdd329.

## 1. Do NPC deeds happen per khắc of HER clock, or does an NPC "run ahead"?
- DECIDE: once per buổi, at the buổi's start, for everyone (jagday agReplanB / agDayDraw, called when the record is built, j95plan). Each NPC picks ONE deed for the buổi and a khắc for it (agSlot jagent.js:99, random among the khắc she can be there; staff/Emperor/Thái hậu: agTickX jagday, random free khắc). So the CHOICE is made ahead for the whole buổi (like her plan), not khắc by khắc.
- HAPPEN: the deed lands at its khắc of HER clock: it stays pending (S.ag.pend) and lands when her clock passes that khắc (agWatch: p.kh < her khắc → agLand, jagent.js:192) or when she is there at that khắc (she sees it, witness card). Nothing lands before its khắc while she is in the buổi. Exception: co-op host / record off (no j95 record) → the deed lands at once at buổi start (jagent.js:145, jagday agTickX last line).
- NOT per khắc yet: an NPC does not react khắc by khắc to what happened earlier in the same buổi (only the next buổi re-picks from the new state). One deed per buổi per NPC (her: up to 4 khắc of acts).

## 2. Dư đồ counts / shadows: per khắc or per buổi? Updated right when an NPC chooses?
- PER KHẮC (single player): the record holds a row per person per khắc (j95 R.P[id][kh]); S.where = the view of the CURRENT khắc (j95sync → j95view, rebuilt each time she spends a khắc, j95.js:304; whereOf reads the record at the current khắc, j95.js:505). The planned deed's place is written into the row of its khắc (agPlan jagent.js:166, agPlanX jagday), so the shadow moves to the deed's place at that khắc.
- WHEN AN NPC CHOOSES: all choices are made at the buổi start, before the map shows; a choice for the khắc she is in re-syncs the view at once only if it touches her place (AG.now → agSyncNow, jagent.js:146/168). Re-plans happen only at buổi change.
- CO-OP: the record is off (j95on false) → S.where per buổi only (placeWhere table, overwritten by the plan's place, jagday placeWhere wrapper).

## 3. A '!' whose happening is over before she arrives
- The '!' list is rebuilt from live pending deeds on every read (jagharm.js agHap :139, haHapDeeds :131: only deeds of this buổi with p.kh ≥ her khắc, not landed / dropped / seen; no per-buổi cache when the loop is on, :176). When her clock passes the deed's khắc, the deed lands and leaves the pending list → its '!' disappears. If she arrives after, there is nothing there (the shadow has moved on too, §2). Exceptions: the Emperor's walk '!' shows while his row has "vuon" at any khắc still to come (:141); the fixed ones (festival, lãnh cung visit: AD_HAP_FIX, jact2) follow their own day rule.

## 4. The old "2 per buổi" cap
- LIST: gone while the loop is on (agHap returns every real happening, no slice; the old adHapRoll `L.slice(0,2)` jact.js:135 runs only with the loop off).
- STILL THERE: on ARRIVAL, adHapArrive fires at most 2 happenings per place (jact.js:140 `for(let i=0;i<2;i++)`), and the per-buổi pacing gate of events (jspread) may hold cards. → GAP G1.
- No Tai mắt filter yet: she sees every '!' (owner rule 2 wants Tai mắt to filter) → GAP G2. No TIN BÁO data API yet → GAP G3.

## 5 + 6. PARITY TABLE (per group)
Legend: same act = the NPC's option calls the player's own act function; cost/gain = same BAL numbers; consequence = what follows the act; choice = when a consequence offers options, does the NPC pick by its own traits/needs/odds (mindPick, weighted with slip, never always-best)?
| group | NPC acts | player has the same buttons? | same cost (bạc / Sức / khắc) | same gains / consequences | NPC picks among consequence options by traits? |
|---|---|---|---|---|---|
| Consort — deck (múa/đàn/cờ/quà), TW deeds (thỉnh an, cầu tự, đút lót, giả bệnh/thai, báo tin, khoe quà, soát quà, social deeds), cx cards (dưỡng nhan, luyện, binh thư, phát chẩn, tụng kinh, thưởng cung nữ, nghỉ, tự học, xin đỡ lời / che chở, mua, tặng quà, kết giao, vẽ chân dung, nhún nhường) | jagent AGSELF/AGSOC/effort, jagacts cx | YES (all are her cards / person-card buttons; j2 cards read the same BAL.ag.cx) | bạc + Sức YES (twPay, ap(c)); KHẮC NO: an NPC spends one deed per buổi, no khắc count | YES same gains and odds (odA) | PARTIAL: the deed itself is mindPick-weighted; consequences that are cards for her (e.g. scenes after a deed) are applied to the NPC as the plain outcome |
| Consort — schemes (all ACT harm + module acts: tát, phạt quỳ, phấn lạ, phóng hỏa, hủy dung, giá họa, ly gián, tố cáo, hạ độc dần, trình TH/HH, uy hiếp, bán phe, quà độc, trộm thú, lấy đồ, Trả chứng cứ) | jagharm haOpts | YES (every key is a RVGRP button, ag-all-c check) — EXCEPT "harm:taint" (lén tẩm đồ) and "harm:cook" (tự tay nấu món) as separate prep deeds: the player does them inside the gift / poison card, not as own buttons | bạc / Đức YES (ACT.c); khắc NO | YES (runAct / mindRun, same oX odds, same caught rules) | YES for the deed (mindPick, persW, fear); caught / punished = plain outcome |
| Hoàng hậu (NPC) — Xử tội, Tịch thu, Ban thưởng, Ân xá, Khất bổng lộc, Khuyên mưa móc | jagacts hhAct (one function with her buttons) | YES when she is Hoàng hậu (j15 / empAct) | bạc YES; khắc: her button 2 khắc, NPC = her one deed | YES (same hhAct) — one known difference: relAdd(Empress, v) raises v.hh too for an NPC Empress (old rule) | n/a |
| Thái hậu — ban thưởng, khuyên can, tha khỏi lãnh cung | jagacts th:* | not a player group (mirrors HH Ban thưởng / Khuyên / Ân xá) | – | same numbers as the old j8 / j75 / j14 lines | – |
| Emperor — summons đàn/cờ/du hồ | jagacts emp:summon → jts tsSummonGo | not a player group (mirrors her "Xin hầu cờ / đánh đàn") | – | same tsSummon odds / gains | – |
| Maid (player can be one) — the SRVA list (quét, dâng trà, theo hầu, lĩnh đồ, học, thêu, chải chuốt, nghỉ, mua thuốc, sổ sách, việc chủ sai, báo tin, đồng liêu, đàn ông…), empTea | jagstaff "maid:*" | YES (one SRVA table in j42 for her and NPC maids) | YES (srvCa costs, lazy NPC Sức/Bạc); khắc NO | YES (srvWa) | PARTIAL: the deed is mindPick; her scolding / order / bribe / frame dilemmas (cnvScold, cnvOrd, cnvBribe, cnvFrame) are NOT choices for NPC maids yet |
| Eunuch / servant — "srv:*" (same SRVA list) | jagstaff | the player cannot be a eunuch (no player group) | YES | YES | as maid |

NPC-only acts the player lacks (§5 answer):
1. harm:taint / harm:cook (prep deeds of a poison gift) — player does them only inside the gift card (no stand-alone button). → G4
2. Maid feud poison / frame of a colleague (jmline mlFeud: feudPoison, frame) and the master beating a maid (mlHit) — player maid has "Tố lỗi với chủ" but no poison-a-colleague; player consort has "Phạt" staff but not the jmline beat chain. → G5
3. Servant pilfering items (jeitem eitPilfer) and pride leaving (jpromsv leaveCh) — no player maid "lấy trộm đồ của chủ" / "xin rời cung chủ" buttons. → G6
4. Old drips still running (not agent): j8 npcCourt roll(10), j10 servMonth consort bribe roll(10) / plant roll(2), jcmaid cmMonthNpc, jemoact NPC emotion acts roll(25) (player has the emotion cards, but NPC timing is dice). → G7

## GAP LIST (for AG-ALL-2)
- G1 no cap: adHapArrive fires ≤ 2 per arrival (jact.js:140) → fire every real happening at that place (or list them in one kit card), owner rule (1).
- G2 Tai mắt filter: what she sees of the '!' list depends on Tai mắt (owner rule 2); today she sees all.
- G3 TIN BÁO API for MAIN's kit badge: list of happenings she KNOWS + informer id + place + khắc window; NPC knowledge of happenings by presence / gossip / Tai mắt (two-way).
- G4 harm:taint / harm:cook as player buttons (or fold them into the gift deed for NPCs too).
- G5 maid feud poison / frame / master beating → player buttons or remove from NPCs; make them agent choices (no jmline dice).
- G6 pilfer / leave-the-master → player maid buttons + agent choices.
- G7 remaining dice: npcCourt, servMonth bribe/plant, cmMonthNpc, jemoact NPC acts, tsSummon-like Emperor rolls left (jvisit visit roll(visCh), j24 tea roll(50), bestow rolls §4 of ag-all.md).
- G8 khắc parity: NPCs do ONE deed per buổi; she can do up to 4 khắc of acts. Give NPCs the same khắc budget (deeds cost their khắc like hers) — perf budget 8 ms per buổi applies.
- G9 timing: start/end khắc for happenings (a quarrel lasts its khắc; arriving later shows nothing); NPCs that react within the buổi (khắc by khắc) instead of only at buổi change.
- G10 consequence choices for NPCs: when an act's result is a dilemma for her (maid scolded / ordered / bribed / framed; "Giữ hay không giữ"; maid night decline; toilette reactions), the NPC gets the same options and picks by traits/needs/odds (mindPick). Today NPCs get the plain outcome.
- G11 makeup parity: NPC looks come from toilNpc (a fixed hash by nết / Sắc, jtoil.js:165), hosts judge them with the same taste rule (jmkt.js:56/66) — but NPCs never CHOOSE their look, so they cannot overdo it and be mocked; give them the dress-up choice (AG-TOIL order OD ~04:05Z) with the same mockery / reprimand consequences.
- G12 Hoàng hậu relAdd asymmetry (NPC Empress's Ban thưởng also raises v.hh via relAdd) — decide one rule.
