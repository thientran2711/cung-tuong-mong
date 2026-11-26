# NEWS-SIEVE — report (worker session_01V1ZZH3wzCzJXUyoxYK9v3v, coordinator MAIN CHÍNH 152)

depth 1 (limit 8) · START_CTX ≈ 4 % (get_session reads 0; own estimate) · roll at ≈ 29 %

PRIORITY #1 CHECK: OD 'Tin trong cung' 12 / 'nết' 36 / 'tổng kết tháng' 0 / 'cười nhạo' 1 | main dev/build: newsAdd j28 (one sink for ~40 producers), kitKnow jnotice, seenNPC j8, mckMorning jmoodknow, jmline, knBao jagknow, tbHook jnotice; humiliate already rank-checked (j28), provoke not | review/* tinbao (10 branches = wording, LIVE in f009e1a6 — reused, nothing redone) | claims: B save-unseen-lists (no save-format change here except two lazy fields S.nsA / S.nsM, old saves load), F «Tin báo kit softlock» (KK37 told, kitPanelOnce), HOME-WAY (no overlap).

Brief: OD 26/11 ~04:40Z (verbatim, read in full) + 25/11 ~23:10Z (palace news at home) + ~23:36Z / ~23:54Z (repeated words) + FOREMAN_D_STATUS 26/11 03:56Z (LIVE «Tin báo» ×9 copies + «Lui» dead; evidence Seat A 3b226773 review: "dialog queue holds 8 copies of «Tin báo» (each close pops one; looks like a dead ✕)").

## RESULT
Branch `review/news-sieve` (from LIVE f009e1a6). LAND READY sha: see the last line of this file.

## 1 · INVENTORY — every news producer on LIVE (one palace life, 36 tuần = 1 year, bot, seed 1; LIVE f009e1a6)
Count = lines that reached her feed per in-game month (3 tuần). «her» = how many of them name her / her household or carry an evidence · night · rank · birth · death word.

| producer (file) | per month on LIVE | touches her | new home |
|---|---|---|---|
| newsAdd «toil» NPC↔NPC toilette (jagtoil tl2See, jagacts3: «che miệng cười … Vụng về», khen giản dị, hỏi bí quyết) | 23.9 | 0 / 287 | monthly summary (count + thiện cảm changes) |
| newsAdd «cx*» NPC minigames / invitations (jagacts*) | 6.6 | 19 / 79 | hers (invites HER, «… với ngươi») stay daily; NPC↔NPC → month |
| newsAdd «ky» NPC kỳ ngộ (jky) | 3.3 | 2 / 40 | month |
| kitKnow «Sổ ghi thêm về …» others' favour book (noteAdd) | 3.1 | 4 / 37 | month (the Sổ still holds it) |
| kitKnow «id:» names / faces she learns (k61) | 2.8 | 34 / 34 | daily (her own knowledge) |
| card «Trong cung truyền tai nhau: X đang …» NPC moods (jmoodknow) | 2.8 | 26 / 33 (keyword only) | Hoàng thượng / Thái hậu mood stays (moves her chances); a consort's mood → month |
| card other sentences (court, weather, ma ma report, her rest, her ice …) | 2.4 | — | stay (name nobody else) |
| card «Đêm qua thẻ bài của X được lật» (j3) | 2.2 | 27 / 27 | daily (owner: who was favoured last night) |
| newsAdd «steal» night stealing / chặn ngự giá | 1.9 | 11 / 23 | daily (favour) |
| newsAdd «emo» moods acted out (jemoact) | 1.8 | 3 / 22 | on her → daily; NPC↔NPC → month |
| card promotions «X được tấn phong …» | 1.8 | 21 / 21 | daily (rank) |
| card «Ngươi ngủ một đêm: Sức +n» | 1.2 | 15 / 15 | daily |
| newsAdd «call» visits | 1.2 | 4 / 14 | to her → daily; NPC↔NPC → month |
| kitKnow «rk:» rank sync of a known person | 1.1 | 13 / 13 | daily |
| card ma ma «bẩm sổ tháng» (Kính sự phòng most called) | 0.8 | 9 / 10 | daily (favour) |
| newsAdd spy / stip / gift / provoke / hh / feign / pray / warn / check / apol / thTH / pmwin / help / test / flaunt / follow / nuoc … (j28 SOC + jagent AGSOC + j40 + jstip + jgift) | 5.6 | 10 / 67 | on her → daily; NPC↔NPC → month |
| newsAdd ink / tea / rumor / rash / giahoa / humil (harm aimed at her) | 0.8 | 9 / 9 | daily |
| newsAdd ty / slowpoison (thái y, poison traces) | 0.6 | 1 / 7 | poison / evidence words → daily; «mời thái y trò chuyện lâu» → month |
| card «Người của X vu cho Y làm vỡ đồ» (jmline) | 0.3 | 0 / 4 | her servant → daily; NPC↔NPC → month |
| kitKnow nết reveals «Ngươi biết nết X», «lộ nết» (j28 newsAdd / learnTrait / j78 tai mắt fact) | 0.2 + | 2 / 3 | GONE: nết shown from the start |
| jagknow Tin báo: servant gossip reports «nghe X kể: <chuyện người khác>» (knBao from the gossip chain) | see test (tin) | — | NPC-only → month; her errands / her palace / bribes stay |
| jagknow Tin báo: happenings already over («Chuyện đã qua rồi …») about others | see test (tin) | — | month |
| jagknow Tin báo: festival places «Ở X ngày hội» ×4 | 4+/festival | — | ONE line «Trong cung có hội ở A, B, C» per buổi |
| **total** | **65 / month (LIVE)** | | |

## 2 · SIEVE (dev/build/jnsieve.js, BAL.news in jbal2.js)
ONE module, loaded last (before jend), wraps the sinks, never the producers' logic:
- newsAdd: the deed, its witness and S.news stay as before (jemoact / jlost read S.news as "she heard it" — law 16, unchanged). Only the NOTICE is sieved: an NPC-only line gives no «Tin báo» know line and no week-card row (S.news entry `npc:1`, newsHTML skips it); counted for the month.
- kitKnow: nết lines dropped (nết open); «Sổ ghi thêm về …» about others → month; «X trượt khảo hạch» → month.
- morning card «Tin trong cung buổi này» (whatever produced it): sentence by sentence; a sentence naming only other people (or a consort's mood) goes; «Lý do / Kết quả …» follow their sentence; an empty card is removed.
- jagknow gossip reports (knBao from the chain) and ended happenings about others: no report (nsGossipSkip).
- «touches her» = «ngươi» / her name / her maid & servants, or a keep word: evidence (chứng cứ, tố giác, độc …), the night (thẻ bài, thị tẩm, đêm qua, Hoàng thượng sang cung, chặn ngự giá …), rank (tấn phong, giáng, phế), life (mang thai, sinh hạ, qua đời …), lãnh cung / cấm túc; plus keepK kinds steal / illicit / hieu / rank / evd.
- MONTHLY SUMMARY at monthTick: ONE kit news panel `kitPanel({kind:"news", title:"Tin trong cung · tổng kết tháng", facts:[{who, text, chips:[["Thiện cảm",±n]]}]})` — whose feeling toward HER moved (≥ BAL.news.sumOwnMin), the largest consort↔consort thiện cảm changes (≥ sumMin, top sumTop), and «Tháng qua giữa các phi tần có N chuyện lớn nhỏ; ta chỉ nghe kể lại tóm tắt.» Names through knowWho (a stranger stays «một phi tần áo bậc …»). Snapshot S.nsA lazy (old save: baseline at its first turn, summary from the next month end).
- NOTE for MAIN: the game month = 3 tuần (thượng / trung / hạ tuần); sếp said "mỗi tháng … 4 tuần một lần, 4 ngày chơi". The summary runs at the GAME month end (every 3 tuần). If she wants every 4 tuần exactly, it is one line in nsMonth (ask her; law 16/17).

## 3 · NẾT OPEN
- j28 `trKnown(v)` = every nết of a consort when BAL.news.netOpen (People tab rvCard / jpcf «Tính nết», trLine, trChip, rp info all read it); `trLearned(v)` keeps the old "found out" list.
- newsAdd's «lộ nết» reveal is off; learnTrait finds nothing left to learn; j78 tai mắt «X có nết Y» fact is no longer offered.
- LAW 16 LIST for MAIN (logic that read "nết unknown"; what I did):
  1. j85 `ducKnown`: «trKnown(v).length>0 ⇒ Đức known» — would have revealed every consort's Đức. KEPT the old behaviour (reads trLearned).
  2. jaudit `aaMulRange`, jwhy «Kín đáo», jwhyn `whyText`, jgreet `grKnowsT`: they read trKnown → odds ranges / why-lines are now as precise as for a known nết (consequence of the owner's rule; no number changed).
  3. j29 `svSpy` (a «sharp» servant spies a consort's unknown nết) and j78 tai mắt trait fact: now find nothing to learn — they simply do not fire (no act removed).
  4. NOT CHANGED, ask sếp: SERVANTS' nết (s.kn: jhouse «Xem người» paid act «biết nết thật», jpromsv, j70, j29 strShow «nết chưa rõ») and children's nết (j53 ktReveal). The owner's words name «người này / người kia»; the People tab = consorts. If she wants servants open too, it touches a paid act (jhouse) — her call.

## 4 · RANK RESPECT (law 1: her, NPCs, the co-op friend alike)
`mockOK(a,t)` in j8 (next to rkOf): open mockery only toward an equal or lower rank (Thái hậu / Hoàng thượng / servants not limited). Every generator of OPEN mockery checked:
| generator | file | before | after |
|---|---|---|---|
| SOC provoke (j28; also jagent AGSOC through agSocT) | j28 | no rank check | mockOK |
| SOC humiliate | j28 | rkOf ≥ | mockOK (same rule, one function) |
| toilette tease «che miệng cười … Vụng về» NPC↔NPC (tl2See) and NPC→her (toilRival) | jtoil toilSeeRule(v,L,w) | none | no tease from a lower rank |
| «hỏi bí quyết … bị cười nhạt» | jagacts3 | none | the ask happens only when the answerer may laugh |
| rival-tease dialog from a host's taste (jmkt surprise) | jtoil toilReact | none | a lower-rank host: no mocking dialog, the effect stays (log line) |
| «Châm chọc tình địch» (her and NPC moods) | jemoact eaMockT | none | target must be equal / lower |
| NPC meets her and «buông lời khiêu khích» | jgreet gmOpts | none | mockOK(v,S) |
| «đến tận cửa cung buông lời mỉa mai» | jagwhy1 apTaunt | none | mockOK(v,S) |
Test (1-year life, every newsAdd text + every queued card, rank read at that moment): see table below.

## 5 · LIVE «Tin báo» FAULTS
- Duplicates at creation: every tap on the box (kitNoticeOpen), a status icon (kitStatusIcon.open — «Tin chờ người sai đi») or the toast rail (kitToastTap) queued ANOTHER panel; each «Lui» popped one ("looks dead"). Fix at the source: kit helper `kitPanelOnce(key,spec,front)` (j79, under kitPanel; KIT.md §42.2 line) drops older queued copies of the same key. KK37 told (send_message).
- «Tai mắt báo: Tai mắt báo (…)»: the informer's name was printed twice — said once now (tbHook).
- Home (OD 25/11 ~23:10Z): no palace Tai mắt Tin báo while at home (isKc).

## TESTS (all on this box)
`node dev/test/news-sieve.test.js <built dev/index.html> 36 <seed>` — one palace life, 36 tuần = 1 year (a death starts a new palace life and the count goes on), bot answers every card with its first payable option. «lines» = everything that reached her per tuần: «Tin báo» know lines + Tai mắt items + every sentence of the «Tin trong cung» cards + the summary panel.

| check (1 year) | LIVE f009e1a6 seed 1 / 2 / 3 | review/news-sieve c7a3302d seed 1 / 2 / 3 |
|---|---|---|
| lines per tuần, average | 19.3 / 40.2 / 34.8 | 8.7 / 9.8 / 10.4 |
| lines on the worst tuần | 44 / 94 / 87 | 26 / 35 / 36 |
| NPC-only lines in the daily feed (per year) | 247 / 971 / 812 | **0 / 0 / 0** |
| monthly summary panels | 0 / 0 / 0 | 12 / 11 / 12 (first month = baseline) |
| «lower rank openly mocks a higher one» (all drama lines + all cards) | 128 / 342 / 208 | **0 / 0 / 0** |
| 5 taps on «Tin báo» box → copies in queue; after one «Lui» | 5 → 4 | **1 → 0** |
| 5 taps on a status icon («Tin chờ người sai đi») | 5 → 4 | **1 → 0** |
| 5 toast-rail taps | 5 | 1 |
| consorts with every nết shown | 0 / 10 | 10 / 10 |
| old save (no S.nsA / S.nsM) plays on | ok | ok |
| page errors | 0 | 0 |
Result: NEWS-SIEVE PASS 7/7 on seeds 1, 2, 3 (threshold: average ≤ 12 lines per tuần, worst ≤ 40). What stays daily (seed 1, by kind): names / faces she learns (start of life), «Đêm qua thẻ bài của …», invitations / challenges / visits / provocations aimed at HER, promotions, night stealing, live Tai mắt «go see» items, the monthly summary.

- QUICKCHECK alone: `bash dev/tools/quickcheck.sh` on c7a3302d → QUICKCHECK PASS · open 2047 ms · old save from LIVE ok · perf (median of 3, new/live): render 259/324 ms, tab 587/599 ms, buổi 1590/1594 ms, tasks>200ms 24/26 · core gates PASS (one-core-guard, rules-one-source, kit-conform, hooks 7) · time-spill guard PASS.
- VIDEOS (looked at my own frames first; HOST mode, built site): CDN `img/_review/news-sieve/` — `news-sieve-fold-755x1000.webm`, `news-sieve-ipadAir-1180x820.webm`, stills `fold-3-tongket.png`, `ipadAir-3-tongket.png`. Steps: «Tin báo» box (only her news, festival in one line) → morning «Tin trong cung» card (only «Đêm qua thẻ bài …») → «Tin trong cung · tổng kết tháng» (names + Thiện cảm chips; strangers stay «một phi tần áo bậc …») → Hậu cung. Note: the start-of-life chest scene (kit motion) re-queued itself after the bot skipped it, so `.kmov` is hidden during the recording only.

## OPEN POINTS FOR MAIN (ask sếp only what needs her)
1. Monthly cadence: game month = 3 tuần; she said "4 tuần một lần". Summary runs at the game month end. Ask her if she wants exactly every 4 tuần.
2. Servants' / children's nết still learned as before (law 16 list §3 item 4) — her call.
3. «Tin báo» panel option cards «Để ta xem / Để sau» still show «TỐN không · ĐƯỢC không» (kit option card; KK37 family, not changed here).
4. Home (Khuê các): only the Tai mắt palace Tin báo is gated here; the k61 «xưng danh / quen biết» lines she gets at home (OD 25/11 ~23:10Z shot) come from the meeting code, not the news sinks — another job.

## LAND READY review/news-sieve c7a3302d (ask MAIN 152 for a BIG reviewer)
