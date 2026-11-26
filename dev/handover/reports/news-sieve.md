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

## LAND READY review/news-sieve c7a3302d (ask MAIN 152 for a BIG reviewer) — superseded by NEWS-SIEVE-2 below

---

# NEWS-SIEVE-2 — report (worker session_01V1ZZH2L7SB2YyEATuwgbWi, coordinator MAIN CHÍNH 153)

depth 2 · START_CTX ≈ 3 % (get_session reads 0; own estimate) · roll at ≈ 28 %

PRIORITY #1 CHECK: OD 26/11 ~04:40Z NEWS SIEVE + ~05:05Z refinement + ~06:47Z MAIN decisions (verbatim, read) | main 02f564ae: jmem CAUSE LEDGER
(causeAdd / causeWhy / causeText / causeLine — every act between two people already recorded with its REASON, "hidden from her") — REUSED as the
cause of every Sổ ghi record, nothing rebuilt; j1 log() / S.logs = the Sổ ghi; j24 BANDS = harm bands; jptime parallel time lands NPC deeds later
| review/news-sieve c7a3302d (predecessor, continued) | claims: NEWS-SIEVE (this session).

## RESULT — branch `review/news-sieve` (merged origin/main 02f564ae). LAND READY sha: last line of this section.

### Merge of main 02f564ae (7 source conflicts)
- j28 SOC provoke / humiliate, jagwhy1 apTaunt, jemoact cham: main's net-build thresholds (netThK / bandVT / eaRival) AND the rank-respect gate mockOK.
- j28 trKnown / trLearned split kept over main's new wording («Ngươi biết X vốn tính …»).
- jbal2: BAL.news kept beside main's net-build block.
- jnotice / jstatus: main's button-crawl-fix-5 (`view:1`, one copy per title in Q) does what kitPanelOnce did → kitPanelOnce and its KIT.md line REMOVED (one mechanism, law 14). The test «5 taps → 1 copy, one Lui → 0» still passes.

### 1 · Owner 05:05Z: «ai mưu hại ai» stays in Tin báo; the Sổ ghi keeps the FULL harem record (doer, victim, cause)
Found on c7a3302d (and LIVE): an NPC ↔ NPC deed reached her only through `seenNPC` (j8): a chance roll; a BAD deed seen gave silent evidence and NO line at all;
S.news (cap 40) is not the Sổ ghi; the cause ledger (jmem) knew doer / victim / reason but was hidden. So «ai rạch mặt ai, vì sao» was nowhere she could read.
Fix (jnsieve §5, BAL.news.recMax / bigBand):
- every act between two other consorts (runAct, caught at the moment it LANDS — parallel time sends it first) → one record in `S.hrec`:
  «A hủy dung B, vì ghen nàng được sủng. Người được sai: X. Kết quả: …» — the reason is jmem `causeText` (trả đũa / ghen / oán / ghét / nóng giận / nết …);
  failed or not = the act's own first sentence;
- every line the sieve takes out of the daily feed (newsAdd NPC deeds, NPC-only know lines, morning-card sentences, gossip reports) → `S.hrec` too: nothing lost;
- the Sổ ghi tab (Mệnh truyện › Sổ ghi, j6 «log») shows S.hrec merged by time with her own lines; S.logs itself untouched (Tuần lục, kitWhy, jlogsync read it);
- a BIG harm (BANDS band ≥ 2: vu oan, tố giác, hủy dung, hạ độc, đẩy xuống hồ, xin bế con, rút thẻ bài, trộm thú nuôi …) is also ONE «Tin báo» line
  «A định vu oan B, vì oán nàng từ trước, nhưng không thành.»; none while she is at home in Khuê các (OD 25/11 ~23:10Z);
- names through knowWho at show time (a stranger stays «một vị Quý phi»; her name appears once she learns it); cap 300, the oldest heard line goes first, a big harm last.
- whole family (law 11): the kitKnow sieve now takes EVERY know line about other people only (not just the «Sổ ghi thêm …» / nết patterns): e.g. j92 overheard
  dress remarks «(lời của X, chưa chắc đúng)», jration «X lấy được … trong rương Y»; her own name / rank knowledge (id: / rk:) and the big-harm lines stay.

### 2 · MAIN decisions (OD ~06:47Z)
(a) monthly summary fires at each GAME month end (monthTick, 3 tuần) — already so on c7a3302d, kept. (b) NẾT OPEN for servants and children:
`s.kn = 1` for every servant (hers and others', new ones at mkServ, old saves at the next buổi) and `k.dilK = 1` for every child with a learning nết (j53).
«Xem người» (Bạc −15, jhouse + j15 card button) is no longer offered (it showed only while !s.kn).
The People tab servant card (Cung nhân) had NO nết row at all (neither before nor after): it now gets the same «Tính nết» row as a consort, through
jmind mindRows (the one source of «Sở trường / Thích / Ghét» rows on every person card; jmind line 115 now reads window.mindRows so the jnsieve row reaches it). LAW 16 list for MAIN (logic that read "nết unknown"):
1. jhouse «Hỏi chuyện» odds: 70 instead of 40 with a talkative servant now that her nết is known (`netIs(s,"talk")&&s.kn`) — consequence, no number changed;
2. jagknow knLoyK: a Tai mắt's firmness is shown for every servant of hers (gated on s.kn);
3. j29 servLearn / svSpy reveal, j80 servPolicy «look first», j53 ktReveal «Thầy dạy tâu riêng / Dạy con, ngươi thấy» now find nothing to reveal (no act removed).

### 3 · «TỐN không / ĐƯỢC không» on a free option = KIT family → KIT REQUEST K-FREE-OPT (dev/kit/KIT_REQUESTS.md) for KK38. Not touched here.
Note: the quickcheck gate dev/test/dialog-fixed.js (l) («MAIN 88: a card with no gain says «không»») FAILS on origin/main 02f564ae too (card «Mặc kệ» shows
EMPTY Tốn / Được cells) — the owner's newer rule says hide them; KK38 must settle rule + gate together (written in the request).

## TESTS
`node dev/test/news-sieve.test.js dev/index.html 36 <seed>` (1 palace life = 36 tuần, bot; new checks 7–9):
| check (1 year) | c7a3302d (before) | review/news-sieve (after) seed 1 / 2 / 3 |
|---|---|---|
| big NPC ↔ NPC harm events (test's own runAct wrapper, at landing) | — | 1 / 4 / 4 (+1 forced hủy dung each) |
| … of them in «Tin báo» | 0 by design («NPC-only → 0»); only a lucky «Tai mắt thấy» for a non-bad deed | **1 / 4 / 4** |
| … of them in the Sổ ghi with doer + victim + cause | none (no record; bad deeds seen = silent evidence) | **1 / 4 / 4** |
| every NPC ↔ NPC act in the Sổ ghi (records / acts) | 0 / n | 9/9 · 18/18 · 35/35 (no record without a cause, none without both people) |
| harem record lines kept per year (acts + lines taken out of the feed) | 0 | 1228 / 1239 / 1195 (cap 300 kept, small first out) |
| forced hủy dung A → B: Tin báo line + Sổ ghi tab row (A, B, «hủy dung», cause) | — | yes / yes / yes |
| NPC-only lines in the daily feed | 0 | 0 / 0 / 0 |
| lines per tuần avg / worst | 8.7–10.4 / 26–36 | 7.9 / 8.1 / 6.6 · 22 / 27 / 22 |
| monthly summaries | 12 / 11 / 12 | 12 / 11 / 12 (a death: the new life takes its baseline first) |
| lower rank openly mocks a higher one | 0 | 0 / 0 / 0 |
| servants with nết open / children with nết open / «Xem người» offered | 0 / 0 / yes | 27/27 · 29/29 · 29/29 / 3/3 · 4/4 · 4/4 / no |
| one copy per tapped panel | 1 → 0 | 1 → 0 |
| page errors | 0 | 0 |
Result: NEWS-SIEVE PASS 10/10 on seeds 1, 2, 3.
Test fixes (independent checks kept): «hạ nhục nàng» told by a SERVANT about herself is not a rank breach (servants are not ranked); «bị bắt khi …» = evidence kept (OD rule 1).
QUICKCHECK (bash dev/tools/quickcheck.sh): open ok, core G1–G3 PASS, G4 80-dialog-fixed FAIL = (l) «no empty Tốn / Được cell» — the SAME 2 FAIL on origin/main 02f564ae
(run here on main's build) → KIT REQUEST K-FREE-OPT; «old save» FAIL 2 of 2 runs = the OLD build (origin/main) selection life ends in ban hoa («Duyên cung lỡ hẹn»,
S.dead) during «old build first turn» — the old-save step has no reroll (the perf step has); traced with a debug copy: when the old build gets past it, the old
save loads and plays a buổi on THIS build 3 of 3 (0 errors); main vs main passed once by luck. «perf: live build could not be measured (undefined)» also on main vs main here.
→ for MAIN / the quickcheck owner: give the old-save step the same ban-hoa reroll as the perf step.

VIDEOS + stills (looked at every frame first; built site, HOST mode): CDN img/_review/news-sieve/ — news-sieve-fold-755x1000.webm, news-sieve-ipadAir-1180x820.webm, fold-1-tinbao.png / ipadAir-1-tinbao.png (Tin báo, first line = the hủy dung), fold-2b-soghi.png / ipadAir-2b-soghi.png (Sổ ghi record: doer, victim, cause, servant sent, result), fold-3-tongket.png (monthly summary), fold-5-cungnhan-net.png / ipadAir-5-cungnhan-net.png (servant card «Tính nết»). Note: a «Kết quả · Trong cung vừa qua» popup left by the bot sits over part of the Fold Sổ ghi shot (not part of this change).
OPEN FOR MAIN: (1) names in the Sổ ghi / Tin báo follow knowWho: a consort she has not met reads «một vị Quý phi» (law of known names); if sếp wants the real names always («ai rạch mặt ai đầy đủ»), it is one switch in jnsieve maskNames. (2) quickcheck old-save step needs the ban-hoa reroll (see above). (3) K-FREE-OPT for KK38.
HANDOVER: nothing left on this job; follow-on ONE SIEVE (MAIN 154 order) not started — it goes on review/one-sieve from this branch.

## LAND READY review/news-sieve 2a24d4db (NEWS-SIEVE-2)

## REVIEW (RV-NEWS-SIEVE-2) — PASS review/news-sieve-rv 82eb2832 (base LIVE 3af7896e, fast-forwardable)
Reviewer session_01V1ZZH3QAYX1bQZ4KysAkM7 (BIG), for MAIN 156 → MAIN 157. START_CTX ≈ 5 %.
PRIORITY #1 CHECK: OD 26/11 ~04:40Z + ~05:05Z + ~06:47Z (verbatim, read) | main 3af7896e jmem cause ledger (causeAdd/causeQuery/causeText), j1 S.logs, j24 BANDS, jptime | review/news-sieve 2a24d4db | claims NEWS-SIEVE-2 session_01V1ZZH2L7SB2YyEATuwgbWi.

MERGE onto LIVE 3af7896e: only index.html / sw.js conflicted (built files) → rebuilt (3f0ece2b). Overlapping sources (jtoil, j85, j79, jbal2) merged clean; read the result.

FIXES made by the reviewer (82eb2832, small, on review/news-sieve-rv):
1. LAW 11 — not every NPC↔NPC act reached S.hrec: only runAct acts were caught. Acts the cause ledger holds from other paths were missing
   (probe, 1 year seed 1 on 2a24d4db-merged: SOC dò la «spy» 12, giveTo NPC→NPC gifts 3, SOC «feign» 1 of 36 ledger records). Fix (whole family):
   jnsieve recLedger — after each buổi every new ledger record between two consorts not yet written this tuần is written with the ledger's own
   cause (causeText); ACT_SAY gained the SOC / gift wordings. After: 10 tuần seed 2 → 12/12 ledger records in S.hrec, 0 miss (at 36 tuần the
   only «misses» are older lines pushed out by the recMax cap, by design).
2. LAW 6 (known names) — a THIRD consort named in a record's cause / result («trả đũa chuyện X đã …», «Người của X phát giác …») kept her real
   name although unmet; only doer + victim were masked. Fix: every consort named in the record / Tin báo line is in its ids → knowWho at show time.
3. LAW 1 (two-way) — the branch stopped NPCs openly mocking a higher rank (mockOK) but HER own «Khiêu khích» (j2 talkOpts, rival + Hoàng hậu)
   stayed open upward. Fix: the same mockOK lock on her two options, shown locked «phận dưới không dám khiêu khích bậc trên» (VANPHONG wording).
   LAW 16 note for MAIN: this takes away her «Khiêu khích Hoàng hậu» while she is below the Hoàng hậu (the owner's own words «làm gì có cái chuyện
   người phi nào mà dám cười nhạo hoàng hậu» + law 1); revert = drop the two `lock:` keys in j2 if sếp wants it open for her.

CHECKS on 82eb2832 (LIVE merge):
| check | result |
|---|---|
| news-sieve.test.js 36 tuần seeds 1/2/3 | 10/10 · 10/10 · 10/10 (big harms Tin báo = Sổ ghi = events: 1/1, 7/7, 5/5; acts in Sổ ghi 42 · 105 · 66 incl. ledger acts) |
| law 6 (nothing invented) | records built only from runAct text + jmem ledger (doer / victim / cause causeText); knowWho masking kept («một vị Quý phi») + fix 2 |
| law 4 | BAL.news (recMax, bigBand, sum*) read; no new typed number |
| law 9 kit | Tin báo = kitNotice, monthly = kitPanel news facts + kit chips, servant «Tính nết» via mindRows → kitRows; Sổ ghi rows = the j6 log rows. No private CSS. |
| law 11 | fix 1 (all ledger paths) |
| save growth (1 year, seed 1) | S.hrec capped 300 rows ≈ 41 KB; whole save 606 KB vs LIVE 586 KB (+3 %); bounded |
| render safety | Sổ ghi render swaps S.logs only inside renderPanel, restored (150→150), save after render clean |
| perf (buổi, 180 buổi, same seed) | mean 2082 ms vs LIVE 2617 ms (box shared with other runs; no slowdown) |
| quickcheck (HEAD) | open ok 0 err · OLD SAVE PASS (loads, plays a buổi; LIVE's quickcheck now rerolls ban hoa → the worker's old-save note is fixed on LIVE, not this branch) · G4 80-dialog-fixed (a) empty Tốn/Được 2 FAIL and G4 90-button-crawl «Ô lưu · Lui» 1 FAIL = IDENTICAL on LIVE 3af7896e (run here) → pre-existing (K-FREE-OPT / crawl owner) · perf step cut by my timeout (measured by probe above) |
| real taps Fold 755x1000 + iPad 1180x820 | cover «Vào cung ngay» → Mệnh truyện → Sổ ghi by touch taps: Sổ ghi opens, records shown, 0 page errors, no horizontal overflow |
| MAIN LOOK PASS stills (looked) | Tin báo (hủy dung line, names masked), Sổ ghi record (doer, victim, cause, servant sent, result), monthly «tổng kết tháng» kit rows + chips, servant card «Tính nết» row — Fold + iPad |

NOTES (not blocking): (a) recMax 300 fills in < 10 tuần, mostly heard lines («truyền tai nhau … đang tình tứ» rows, the same text again next tuần);
big harms are kept longest, so «ai rạch mặt ai» survives, but small history spans ~2 months — MAIN may raise recMax (≈ 0.14 KB/row) or skip mood
lines from the record. (b) names in the monthly summary have no rank title where the Tin báo line has one («Phùng Nghê Thường» vs «Phi Phùng Nghê
Thường») — knowWho vs kit name chip, pre-existing style.
VERDICT: PASS review/news-sieve-rv 82eb2832 (ancestor = LIVE 3af7896e).

---

# NEWS-SIEVE-3 — report (worker session_01V1ZZH2nSD6EWY5T3AdDk7A, successor of NEWS-SIEVE-2, coordinator MAIN CHÍNH 157)

PRIORITY #1 CHECK: OD 26/11 ~06:50Z (B) ONE SIEVE + news-sieve rows | main 3af7896e j63 kitWhy (kaWhyCl / kaWhyLead / kaWhyStat / kaWhyKem), j9 runAct confessRisk,
j3 logChoice + jlogsync lsRest | review/ob-verdict 129a9c51 (kaAim verdict, same result card — coordinated, see below) | review/news-sieve-rv 82eb2832 (RV PASS) | claims NEWS-SIEVE-2 → me.

## (1) RV-NEWS-SIEVE-2: PASS review/news-sieve-rv 82eb2832 (LIVE merge + 3 reviewer fixes) — no faults left to take. Merged into review/news-sieve (c701b06f), rebuilt.

## (2) KAWHY-VERDICT (law 11) — «vì sao» rows match the verdict
Owner card: THÀNH «Vu oan», «Được: Danh +3 · kẻ được ta sai đi bị bắt, khai ra chủ». Reproduced on LIVE by real taps (person card → Bày mưu → «Ra tay ngay: vu oan», sent servant confesses).
ROOT CAUSE: a deed run from a dialog option is folded by j3 logChoice into ONE line; the lines were joined with " " and the «Tâm cơ 50 → 52, Danh 8 → 11» summary
(lsRest) glued after «… khai ra chủ: X nắm thêm 1 chứng cứ. (sai người đi)» — no full stop, so kaWhyCl kept one clause, and kaWhyStat gave the Danh / Tâm cơ / Bạc rows
the lead of that clause «kẻ được ngươi sai đi bị bắt, khai ra chủ».
FIX (family):
- j3 logChoice: every folded line ends its sentence (adds «.» when it does not end in . ! ? … » ” ") — the summary is its own sentence.
- j9 runAct: the confess side roll sentence is flagged EXPLICITLY (`<span class="kwside">`); j63 kaWhyCl collects flagged clauses (out.side) and also splits a sentence after «)»
  (old saves' glued lines); kaWhyLead(c,i,C) never takes a side clause as a cause (its own loss is the target's chứng cứ, not her numbers).
- j63 kaResultRows(before,title,ok): resultShow passes its verdict (okHint); on THÀNH a lead matching KA_WHYFAIL (bị bắt, bị lộ, phát giác, khai ra, không thành, chặn kịp,
  từ chối, thoái thác, thất bại, hỏng …) is dropped; on BẠI a lead matching KA_WHYWIN (thành công, việc thành, mưu thành, tìm thấy …). No verdict (KẾT QUẢ / night) → only the
  side flag + split apply. jne kitNightEnd / jselxday unchanged (no verdict there on this branch).
BEFORE / AFTER (scan: 53 deeds × direct / via dialog choice × THÀNH / BẠI × confess roll on / off × sent / present = 530 cases; gated deeds forced so their sentences are read):
| deed (THÀNH, sent, confess, via Bày mưu) | LIVE 3af7896e | review/news-sieve d6e27b01 |
|---|---|---|
| frame (Vu oan) | Danh +3 · kẻ được ngươi sai đi bị bắt, khai ra chủ ; Tâm cơ +2 · (same) | Danh +3 ; Tâm cơ +2 (no reason) |
| poison, block, musk, catswap, lygian, slowpoison, huydung, giahoa, rash, laydo, thathu, phonghoa | Bạc −N · kẻ được ngươi sai đi bị bắt, khai ra chủ | Bạc −N (no reason) |
| uyhiep, batnat | Được: Bạc +N · kẻ được ngươi sai đi bị bắt, khai ra chủ | Bạc +N |
| all 530 cases: reason against the verdict | 15 deeds (THÀNH rows with a failure reason) | 0 |
TEST: `node dev/test/kawhy-verdict.test.js index.html <shots>` — LIVE: FAIL 7/25 (2 real-tap + scan + 4 synthetic); this branch: PASS 25/25 (also after the RV merge).
news-sieve.test.js 36 tuần seed 1: PASS 10/10 after the merge. result-reason.js (old «every line has a why» rule) FAILs identically on LIVE and here — stale vs owner 24/11 ~21:57Z, not touched.
SHOTS (looked, Fold 755x1000 + iPad 1180x820, before = LIVE, after = this branch): CDN img/_review/news-sieve/kawhy-{before,after}-{fold-755x1000,ipad-1180x820}.png.
COORDINATION: OB-VERDICT-2 told (same card): its resultShow takes the verdict from kaAim — when the two branches meet, pass that final verdict as kaResultRows' 3rd arg
(and the kne verdict in kitNightEnd); whoever lands second resolves that one line. On this branch the Bày mưu card seal is «KẾT QUẢ» (ob-verdict gives THÀNH).
QUICKCHECK d6e27b01 vs LIVE 3af7896e: open 0 errors · OLD SAVE PASS (loads, plays a buổi) · TIME-SPILL PASS · G4 80-dialog-fixed (a) empty Tốn/Được 2 FAIL and
G4 90-button-crawl «Ô lưu · Lui» 1 FAIL = the same as LIVE (RV-NEWS-SIEVE-2 ran LIVE: identical; K-FREE-OPT / crawl owner) · G4 92-look-dedupe FAIL 1 inside quickcheck
(box under load) but `node dev/test/look-dedupe.js index.html` PASS 16/16 three runs standalone → flaky, not this change.
HANDOVER: nothing left on KAWHY-VERDICT. Open for MAIN: the OB-VERDICT merge line above (kaResultRows 3rd arg); stale result-reason.js gate (old rule) for its owner.

## LAND READY review/news-sieve d6e27b01 (NEWS-SIEVE-3: RV PASS 82eb2832 + KAWHY-VERDICT; fast-forward of LIVE 3af7896e)
