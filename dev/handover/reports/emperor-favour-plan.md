# EMP-DAY — where and when she can meet the Emperor BY DAY (PLAN ONLY) — worker EMP-DAY (session_01PEhRbuMDVjApgDKJapJENo) for Foreman C

PRIORITY #1 CHECK: OD 27/11 ~00:26Z (gap) / ~00:32Z + ruling (acts only by meeting on Dư đồ, law 6b) / ~00:42Z rec (Tìm gặp · Ghé cung; Emperor moves follow «go where he is») / ~00:46Z (law 2 tiers) / ~00:54Z (6 moves) / ~01:00Z (true result) / ~01:03Z–01:05Z (one button, odds word first, best fit) / ~01:07Z–01:14Z (doors → one tap, NPC + co-op same) + OD:L1152 (Dư đồ pop-up) read verbatim | main 5e013076→fa722503: j95.js:180–190 `j95empW`/`j95planEmp` (his REAL per-khắc schedule), j9.js:60 `placeWhere` fallback (`W.emp`), jtime4.js:8–11 `B4N/B4L/b4EmpNoon`, jagday.js:238 (agent slot overrides `W.emp`), jworld.js:101 `EVD.away` (out of palace → `S.where.emp=null`), j21.js:57 `seenAt` (his face on the map only at Dưỡng Hòa điện trưa/tối), jgift.js `courtMeet` (Chí tôn card «Đến … gặp ngài» / «Xin yết kiến» on `S.where.emp`) + `KM_EMPACT`/`kmEmpFree`, j41.js:18–26 `accessOf`/`accAskO` (thư phòng/tẩm điện = yết kiến, rank ≥ 4), j2.js:156–163 `talkOpts(emp)`, j2.js:191 ksp, jact.js:143–170 `adStroll`, j24.js:115 `empTeaCard`, j75.js:177 `npcEffort`, jagwhy1.js:110 `seekEmp` | review/act-move 8dbcc69b (jamove.js: Emperor pop-up = 6 moves, robot F PASS), emperor-visit 16a2d41e / -r1 b2e34df7 (not opened: night visit, out of scope) | claims: EMP-DAY = Foreman C; ACT-MOVE (session_01Rc5AsLFs4oXTwHRN1Mv54e) owns the 6 buttons.

Scope: ONLY where/when he can be met by day + nothing lost. The 6 moves (Hiến nghệ · Dâng lễ vật · Hầu chuyện · Chặn ngự giá · Xin ân điển · Đút lót lật thẻ) are ACT-MOVE's; not redesigned here.

## 1. Law 8 expert pass (history + dramas + genre)
- Qing routine (Palace Museum 故宫 daily-routine notes; E. Rawski, *The Last Emperors*, 1998): rise ~giờ Dần; **ngự môn thính chính / thượng triều** at dawn; **early meal (tảo thiện)** after court; late morning–afternoon **phê tấu chương and receive ministers** at the study hall (from Ung Chính on, Dưỡng Tâm điện); 2nd main meal ~giờ Mùi, often **dùng thiện at a favoured consort's palace or with Thái hậu**; afternoon reading / **dạo ngự hoa viên**; **thỉnh an Thái hậu** regularly (Càn Long famously); evening: Kính sự phòng brings the **thẻ bài at the evening meal (lật thẻ)**. Seasonal: **tuần du, thu săn (Mộc Lan), tế lễ** = he is out of the palace for days.
- Forbidden to consorts: entering the **front court (tiền triều) during triều**; «hậu cung không được can chính» — talking state affairs is a known fault; entering the study/bedchamber **uninvited** (needs khẩu dụ / thái giám tổng quản thông báo).
- Allowed / dramatised ways to meet him by day: *Chân Hoàn truyện* — soup brought to Dưỡng Tâm điện, waiting outside for Tô Bồi Thịnh to announce (= Dâng lễ vật at the study); the «chance» meeting in Ỷ Mai viên / song on his road (= Chặn ngự giá / Hiến nghệ in the garden); meeting him while paying respects at Thọ Khang cung. *Diên Hi công lược* — staged garden encounters, kite/dance in his path. *Như Ý truyện* — he drops in at a consort's palace for tea/meal by day; consorts lose favour for talking politics. *Thâm cung nội chiến* / genre palace-sim games — favour moves tied to a **time slot + place** (garden at chiều, study by day, tablets at night).
- Takeaway for the game: by day he is (a) at court/study (hard to reach, gift-and-talk only), (b) resting/eating (warmer, art welcome), (c) in the garden (open, any art, staged encounter), (d) with Thái hậu (meet at thỉnh an), (e) at some consort's palace (only that consort meets him), (f) out of the palace. Night = Kính sự phòng + tẩm điện (already the night flow).

## 2. Inventory on main (5e013076 = fa722503 for these files)
His position TODAY: REAL schedule, not random per tap. `j95planEmp(c)` plans each buổi c (0 sáng · 1 trưa · 2 chiều · 3 tối, `J95.B4`) as 4 khắc rows [place, act, —, why] with an in-buổi surprise switch (`J95.SUR` = 22 chance points: «có tấu khẩn» / «đổi ý ra vườn» / «mệt, hồi điện nghỉ»); weights `j95empW` are TYPED in code (law 4 breach): thu (Cần Chính điện) [75,25,45,5], dtd (Dưỡng Hòa điện) [10,50,20,85], vuon (Ngự hoa viên) [5,25,35,10] × Chăm chính / Đa tình traits × season × mood × busy × his favourite's likely place. Places used: ONLY thu / dtd / vuon. Never tn (Thái hậu), never a consort's palace by day (only the random `empTeaCard` j24:115 «ghé cung ngươi uống chén trà»), out of palace only via `EVD.away` (jworld:101). Fallback without roster: j9.js:60 dice. Co-op/agent: jagday.js:238 slot overrides.
What she sees: map face only at dtd trưa/tối (j21:57); Chí tôn card `courtMeet` tells his place + «Đến <nơi> gặp ngài» / «Xin yết kiến ở <nơi>» (one a day, j41) — effectively public.

| Act today | file:line | place gate | buổi gate | after the 6-move merge → |
|---|---|---|---|---|
| Tâng bốc · Nói thật lòng · Bàn chuyện triều chính (Chăm chính) | j2.js:158–163 talkOpts(emp) | with him (any place met) | none | Hầu chuyện (tiers) |
| Phô tài: <best art> | j2.js:160 | with him | none | Hiến nghệ |
| Dâng <hoa> / Dâng một cành hoa · Dâng quà (data-kgmgive) | j2.js:161, jgift courtMeet | with him / card | none | Dâng lễ vật |
| Xin ân điển (Sủng ≥ BAL.ag.cx2.favor.min) | j2.js:162 | with him | none | Xin ân điển |
| Xin hầu cờ · Xin đánh đàn hầu ngài · Mời ngài dạo ngự hoa viên | jgift.js:200 KM_EMPACT, kmEmpFree | **none — acted from the Chí tôn card at a distance**; refused if he is at thu or a palace | not tối | Hiến nghệ (cờ, đàn) · Hầu chuyện nặng (dạo vườn) — ACT-MOVE 8dbcc69b |
| Đánh đàn chờ ngự giá (old «Đánh đàn ở ngự hoa viên») | jact.js:170 adStroll | vuon, he is there | day | Hiến nghệ (at vuon) |
| Đàn khúc Phượng cầu hoàng · Kinh hồng vũ · Đánh cờ với Hoàng thượng | j2.js:63–65 artActs → Hành sự deck | **none** | none | Hiến nghệ (way inside) |
| Dâng canh ở ngự thư phòng · Cắm hoa dâng Hoàng thượng · Làm thơ dâng lên | j2.js:41–47 → folded into j83 works (WFOLD j83:163) | chest item | — | Dâng lễ vật (the real work leaves her chest) |
| Xin yết kiến | j41.js:18–26, courtMeet | thu / dtd (rank ≥ 4; dtd Sủng ≥ BAL.m95.dtdSung) | day | entry gate to the pop-up (kept) |
| Đút lót lật thẻ · Hỏi sở thích Hoàng thượng | j2.js:191–192 | ksp | any | Đút lót lật thẻ (+ stays at ksp) |
| Tranh sủng · Chặn ngự giá | j2.js:72–74, jnf, j75:44 | night card flip | tối | Chặn ngự giá (night) |
| Hầu trà khi ngự giá (maid) · maid empTea | j42.js:238, jagstaff:70 | his place ≠ dtd | day/tối | servant road (unchanged) |
| Hoàng thượng ghé cung ngươi uống trà | j24.js:115 empTeaCard | home (random event) | day | becomes a real schedule slot (§3) |
| Theo hầu ngự giá · Cáo bệnh | jworld:116 EVD.away | out of palace | days | unchanged |
| NPC: npcEffort (deck arts / hoa) · seekEmp → kmEmpAct | j75:184, jagwhy1:110 | **none** (not tied to where he is) | — | same 6 moves, place-bound (§3 parity) |

ACT-MOVE 8dbcc69b already: Emperor pop-up = exactly the 6 moves when she is WITH him (robot F 12/12); Chặn ngự giá greyed by day; card «Tìm gặp» = courtMeet go / yết kiến. It does NOT change his schedule, does NOT filter moves by place, and the NPC side is untouched.

## 3. PLAN
**3.1 Day schedule** (stays in `j95planEmp`; numbers move to BAL — new key `BAL.empSched`, jbal2):
| buổi | main (why) | tùy duyên (why) |
|---|---|---|
| Sáng | khắc 1–2 Cần Chính điện «thượng triều» (closed: `BAL.empSched.court` khắc) → khắc 3–4 Cần Chính điện «phê tấu» | Đức Thọ cung «thỉnh an Thái hậu» (`w.tn[0]`) |
| Trưa | Dưỡng Hòa điện «ngự thiện, nghỉ trưa» | a consort's palace «dùng thiện ở cung …» (`w.pal[1]`, picked by his night weight `nightCh` = favour, so HER palace is possible); Ngự hoa viên when cool |
| Chiều | Cần Chính điện «phê tấu» or Ngự hoa viên «dạo vườn» | Đức Thọ cung; a consort's palace «ghé uống trà» (replaces random empTeaCard) |
| Tối | Dưỡng Hòa điện / lật thẻ (night flow, unchanged) | — |
| any | `EVD.away` tuần du / thu săn / tế lễ (unchanged): nowhere to meet by day | |
Keys: `BAL.empSched.w = {thu:[…4], dtd:[…4], vuon:[…4], tn:[…4], pal:[…4]}` (today's typed weights moved as-is; tn/pal new, set by robot), `.sur` (= J95.SUR), `.court` (closed khắc of sáng), `.trait/.sea/.mood` multipliers (today's 1.6/1.5/1.3/.6), `.palFav` (how much favour pulls the palace pick). All traits/mood/busy rules kept.

**3.2 Which moves where** (one table `BAL.empSched.at`, read by ACT-MOVE's pop-up; greyed rows keep a reason, never hidden):
| his place (act) | entry | Hiến nghệ | Dâng lễ vật | Hầu chuyện | Xin ân điển | Chặn ngự giá | Đút lót lật thẻ |
|---|---|---|---|---|---|---|---|
| Cần Chính điện, thượng triều | none — «ngài đang thượng triều» | – | – | – | – | – | – |
| Cần Chính điện, phê tấu | Xin yết kiến (j41) | quiet arts only (kỳ · thi · họa) | yes (canh/điểm tâm) | yes; triều chính topic = the known fault | yes | – | – |
| Dưỡng Hòa điện, ngự thiện/nghỉ | Xin yết kiến / Sủng gate | cầm · kỳ · thi | yes (món ăn) | yes | yes | – | – |
| Ngự hoa viên, dạo | open | all arts (vũ, cầm …) | yes (hoa) | yes (dạo cùng) | yes | yes — by day = wait on his path (next khắc he walks there) | – |
| Đức Thọ cung, thỉnh an | her own Thỉnh an Thái hậu (sáng) | – (filial: no show) | yes (to Thái hậu or him) | yes | – (not before the mother) | – | – |
| HER palace, ghé cung | he comes | all | yes | yes | yes | – | – |
| another consort's palace / Càn Ninh | not hers to enter | – | – | – | – | yes, on his road out (next khắc) | – |
| Kính sự phòng (him absent) | — | – | – | – | – | – | yes (place pop-up j2:191, + ACT-MOVE's «sai người» on his face) |
| Tối Dưỡng Hòa / night | night flow | | | | | Chặn ngự giá (night, ACT road) | yes |
Hiến nghệ's best-fit pick (ACT-MOVE, OD 01:03Z) = her best art AMONG the arts this place allows. Odds words only (BAL.odds.cut).

**3.3 How she learns where he is** (reuse, no new screen): Chí tôn card «Tìm gặp» (courtMeet) = his place at the START of the buổi (court life is public); an in-buổi surprise switch is NOT shown — she finds out on arrival (tùy duyên) or by «Sai tai mắt dò nơi ở» (scoutBtn) / her servant on an errand (j42:196); map face extends from dtd-only to wherever he is at buổi start (seenAt, one line). Chặn ngự giá by day needs the NEXT khắc place → only known via tai mắt / servant report (it is a bold move).

**3.4 NPC + co-op parity (law 1, OD 01:14Z)**: an NPC's Emperor move (npcEffort, seekEmp→kmEmpAct) lands ONLY if her day slot (jagday/j95 roster) is at his place that khắc, through the same `BAL.empSched.at` gates (yết kiến odds j41 accAskO for her too); seekEmp adds his place to her day-plan weights (j95dist) instead of acting at a distance. A consort's palace slot for him = that NPC gets the meeting. Co-op friend = same table on the host's world.

**3.5 Robot `dev/test/emp-day-reach.js`** (AA.scen dau/cao/hh/con × 4 buổi × 8 tuần): (a) his place shares per buổi match `BAL.empSched.w` (no place outside the table; court khắc never enterable); (b) NOTHING LOST: every row of the §2 table (20 old acts/ways) is produced as the result or way of one of the 6 moves at ≥ 1 reachable place/time, or stays at its place (yết kiến, ksp, away); (c) a move is never offered when he is not there (except Đút lót at ksp, Chặn on his next-khắc road); (d) per day: count of Emperor-move offers vs palace-fight offers on her pop-ups, LIVE vs after → report both numbers to MAIN (target: every day ≥ 1 reachable day meeting for a rank ≥ 4 consort, garden chance for lower ranks — exact floor `BAL.empSched.minDay` set by robot); (e) NPC Emperor-move count per tuần LIVE vs after (favour economy must not collapse; tune `w`/`palFav`, not new rules).

## 4. Align with ACT-MOVE (no duplicate build)
ACT-MOVE keeps the 6 buttons, their tiers/results and the card «Tìm gặp». It needs from this plan exactly ONE hook + ONE table:
1. `BAL.empSched.at` (§3.2) and `empMovesAt(k, kh)` → `{move: ""|reason}` for the 6 move keys, called by jamove's Emperor pop-up to grey a move with its reason (e.g. «Đang ở Cần Chính điện — không tiện múa hát») and by Hiến nghệ's best-fit to filter arts.
2. `empNextAt(kh)` → his place next khắc (from `S.roster.P.emp`) so «Chặn ngự giá» can be offered by day on his road (today greyed by day in jamove).
The schedule change (§3.1 BAL move + tn/pal slots + empTeaCard → slot), seenAt line, NPC parity (§3.4) and the robot (§3.5) = ONE build task «EMP-DAY-B» for a Foreman C worker after ACT-MOVE lands (it wraps j95empW/j95planEmp/jagwhy1/j75 only; no UI part, kit untouched). No question sent to ACT-MOVE (nothing blocking; its report already says «align with Foreman C»).

~100 % this plan / ~0 % in game (until EMP-DAY-B + ACT-MOVE pass review).
