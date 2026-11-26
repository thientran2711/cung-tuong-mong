PRIORITY #1 CHECK (successor #2, 'Tạ lỗi|Nhún nhường|hòa giải|làm lành|apologise|humble|oán'): OD 26/11 ~08:25Z row + MAIN 155 add-on (FOREMAN_D_STATUS ~08:30Z) | main: j9 Tạ lỗi / Nhún nhường, jtwoway TW apol, j28 SOC.apologise / mediate, jagacts cx:humble, jnet netForgive (all REUSED, not rebuilt) | review/* none for a deep-grudge road | claims: PACE-ALL row (this worker).

# review/pace-all — SUCCESSOR #2 (session_01D3E3NXTnDZUXLbRTbkjsZy · depth 3 · START_CTX ~3 % estimate, tool reads 0)
Head: **review/pace-all afa89339** (FF from LIVE 3af7896e: LIVE merged at 207c39b4, built files rebuilt; CHANGE line = pace-all).

## Done by #2
1. Merged LIVE 3af7896e (conflicts only in built index.html / sw.js → rebuilt).
2. Video script fixed (dev/test/pace-all-video.js), 3 parts, all real taps in the page (page.evaluate clicks):
   (1) Tứ đức: «Tự học» → «Làm» → material → lesson game «Bỏ qua» → result card → ✕ (owner OD:L1352: no «Đã hiểu» word; ✕ presses the hidden #kg82ok) → card «Tiến bộ 0/10 → 2/10» (if the «để trời định» roll fails it studies again, caption says so).
   (2) a known consort set to Oán hận 85, nothing feeds it → real «Nguy hiểm chung» chip → «Người nặng lòng nhất … oán 85»; 9 quiet tuần (BAL.oanCool, fast-forwarded, caption) → «oán 57/58 · Oán sâu».
   (3) MAIN 155 add-on: deep grudge talk card: Tạ lỗi / Nhún nhường greyed (locked, reason in the card's «Cần ✗» row), «Hậu lễ tạ tội» tapped → Fold: refused, bạc/Danh handed back; iPad: accepted, oán −25, Bạc −60, Danh −1. (The Lễ nghi tab tap did not switch in the recording; the row runs through talk(i), the same function the card button calls.)
   Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/pace-all/pace-all-fold.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/pace-all/pace-all-ipad.mp4 (0 page errors). Known look note (not this diff): some silhouettes grey where pictures were not loaded in the test server.
3. **MAIN 155 ADD-ON BUILT** (jmend.js + BAL.oanMend in jbal.js):
   - A refused word costs nothing: while netForgive fails (oán ≥ the wronged one's «nguoi» level) her «Tạ lỗi» / «Nhún nhường» rows are LOCKED with the reason (kit option lock + t → «Cần ✗ … chưa nguôi giận (Oán hận): lời suông chưa đủ, cần hậu lễ hoặc người đứng giữa»), never paid. NPC side: TW apol req needs netForgive (no paid refusal), SOC.apologise ok needs it, cx:humble pays only after the check and is not chosen toward a deep grudge.
   - Two equal-value costly roads (law 2: bạc vs a friend's goodwill; law 3: each has a gain; law 5: the gift grows with rank): «Hậu lễ tạ tội» (Bạc 60 + 30 × the giver's rank, Danh −1) and «Nhờ người đứng giữa» (a person the wronged one likes ≥ than who likes the doer ≥ quen; that person's liking −10, Danh −1). Odds = 50 + 40 × (forgive nết − 1) − 0.4 × (oán − nguoi) (+ 0.3 × (her liking for the go-between − than)), shown as odds words (typical: Hiểm / Khó lường; Rộng lượng: Vững). Thành: oán − its BAL.oanLv band width (one band down = one quiet season). Hỏng: the gift is sent back / the go-between is turned away — nothing paid (her card pays the Tốn row first, a refusal refunds it).
   - Two-way: ONE mendDo(doer, wronged, road) for her and every consort; agent options cx:mendGift / cx:mendGo (toward her and toward each other); her own deep grudge (S.ro) is mended by an NPC's roads the same way. Note: NPC «Tạ lỗi» already existed (SOC.apologise / AGSOC apol / TW apol) — the real gap was the deep-grudge road and paid refusals.
4. Tests: dev/test/pace-all.js **ALL PASS 32** (new C1–C9: locked rows not payable; costs from BAL by rank; refused gift nothing paid; card-paid refusal refunded; accepted gift one band; go-between; NPC→her; NPC↔NPC; NPC refused words not paid; agent offers the roads). net-build 189/189. one-core-guard PASS. receiver-choice ALL PASS (mendGift/mendGo classified DONE like apol/humble). **coop-e2e 143/143.**
5. Regression (111 tests = the predecessor's rule, LIVE build vs branch build, same test files): exit codes differ on 5:
   | test | LIVE | branch | why / action |
   |---|---|---|---|
   | ag-all-b.js | 1 | 0 | branch better (passes) |
   | moodknow-step0.test.js | 0 | 1→0 | asserted the OLD ghen rise (+10 flat; NPC-caused raise). Rule changed on purpose (5a/5c) → test now reads BAL.oanCool.ghen.dm; 19/19 PASS |
   | receiver-choice.test.js | 0 | 1→0 | new acts cx:mendGift/Go unclassified → classified DONE (scan) |
   | rel-men-servants.js | 0 | 1→0 | D5 called the old flat oanMonth (canon overwritten) → test uses the weekly oanCool; 30/30 PASS |
   | person-minigame-acts-c.test.js | 124 | 1 | re-run alone on BOTH: the same 3 FAIL on LIVE and branch (pre-existing, not this diff) |
   All other 106 the same exit code (82 non-zero on both = harness args / pre-existing; only differences matter).
6. Quickcheck (under robot load): build OK, open 0 errors, OLD SAVE loads + plays a buổi, time-spill PASS; CORE GATES: G1 one-core PASS; G4 80-dialog-fixed «kit-dialog-2 empty Tốn/Được» + 90-button-crawl «Ô lưu · Lui» FAIL = the SAME pre-existing LIVE fails (Foreman D 08:33Z line). Perf smoke: re-run on an idle box (see the last line below).

## Robot (dev/measure/pace-all.js, 6 lives × 24 months each, LIVE 3af7896e vs branch)
| season | LIVE oán mean · sâu+ · hận · ghen mean · her own oán max · Nguy hiểm | branch #3 (cool-down, no mend) | branch #4 (final, + mend) |
|---|---|---|---|
| 1 | 7 · 0.2 · 0.0 · 50 · 4.5 · 61 | 4 · 0.2 · 0.1 · 17 · 9 · 9 | 3.5 · 0.2 · 0.0 · 15.5 · 7 · 10 |
| 2 | 14 · 1.1 · 0.2 · 81 · 32.5 · 76 | 12 · 0.9 · 0.4 · 38 · 18.5 · 37.5 | 12 · 0.8 · 0.2 · 23.5 · 20 · 35 |
| 3 | 23 · 2.4 · 0.7 · 90 · 40 · 86.5 | 19 · 2.1 · 0.9 · 54 · 26 · 74.5 | 17 · 2.4 · 0.7 · 43 · 32.5 · 62 |
| 4 | 25 · 3.3 · 1.2 · 96 · 40 · 84 | 23 · 2.7 · 1.9 · 54.5 · 31 · 72.5 | 21 · 3.7 · 1.5 · 58 · 36 · 77 |
| 5 | 23.5 · 3.7 · 1.6 · 99 · 81 · 77.5 | 23 · 3.2 · 1.9 · 58.5 · 22 · 71.5 | 24 · 4.2 · 1.9 · 61 · 58 · 76.5 |
| 6 | 25 · 4.1 · 1.6 · 97 · 86.5 · 75 | 24 · 3.2 · 1.6 · 60 · 19 · 71 | 24 · 4.9 · 2.3 · 60 · 47.5 · 78.5 |
| 7 | 25 · 4.6 · 2.1 · 99 · 80.5 · 77 | 22 · 2.6 · 1.5 · 68.5 · 25.5 · 68.5 | 26 · 4.5 · 2.7 · 69 · 39.5 · 83 |
| 8 | 29.5 · 5.1 · 2.4 · 99 · 81.5 · 81 | 20 · 2.4 · 1.3 · 67 · 30.5 · 71 | 25.5 · 4.6 · 2.6 · 79 · 37.5 · 84.5 |
| 9 | 28.5 · 5.1 · 2.6 · 99 · 91 · 80.5 | 20 · 2.7 · 1.2 · 71 · 37 · 69.5 | 22 · 3.2 · 1.8 · 76 · 25 · 76 |
Reading: ghen toward her stays well under 90 in year 2 (LIVE 99); her own grudges stay far lower (max 25–58 vs 80–91). Oán toward her: the cool-down + mend roads trim it, but the RISES (j95b ledger seeds, relAdd: +up to 28 a hit) are D2's job (review/stat-pace); #3 vs #4 differ within the noise of 6 lives (different random lives). The bot (her) does not use the new talk rows; NPC use of cx:mend is not counted by this robot.
Per-act shares (unchanged from run #2): art bậc 0–2 1/10 · 1/12 · 1/16, vir 1/5 · 1/6 (LIVE 1/5 · 1/10 · 1/19, 1/2.5 · 1/5).

## HANDOVER / NEXT (if a successor is needed)
Left: BIG reviewer (opus, my child) → on PASS «LAND READY review/pace-all <sha>» to Foreman D (now session_01D3E3NZKCLJ7V9VupQyCnr1). D2 merge note stands (j8 rivalsTurn ghen line next to D2's spAdd line: keep both). KK39 display numbers: crsNeedP / srvMpNeed / BAL.oanLv / BAL.oanMend (read functions).

## For sếp (Vietnamese, short) — thêm phần làm lành
- Oán sâu thì «Tạ lỗi», «Nhún nhường» hiện khóa kèm lý do, không mất Danh nữa.
- Thêm hai đường tốn kém, ngang giá: «Hậu lễ tạ tội» (bạc, càng cao phẩm lễ càng lớn) hoặc «Nhờ người đứng giữa» (nhờ người nàng ấy nể; người đó bớt quý ta một chút). Thành thì oán xuống một bậc; hỏng thì lễ bị trả về, không mất gì.
- Phi tần khác cũng làm lành với ta và với nhau bằng đúng hai đường này.
~72% xong / ~66% chơi được

---
# (predecessor #1 report below, unchanged)
PRIORITY #1 CHECK ('tài nghệ|tiến bộ|oán|ghen|giảm oán|Công lao|BAL.art.gain|oanFade'): OD 26/11 ~08:00Z / ~08:05Z / ~08:25Z rows | main dev/measure/pace.js, BAL.art.gain (LIVE 6b5d3d05), j28 oanMonth + BAL.oanFade (the existing monthly fade — REUSED / overwritten in place, not rebuilt), jmem memTop (cause), PERS/BAL.net forgive (nết) | review/stat-pace (D2 #3, rises of Danh/Đức/Sủng/thiện cảm/oán = theirs; messaged), review/kit-bac-progress (KK39 display = theirs), review/ob-oan (oán UI = theirs) | claims: CLAIMS row by Foreman D 08:30Z.

# review/pace-all — PACE-ALL + OÁN / GHEN COOL-DOWN (worker of Foreman D) — STATUS: BUILD DONE, measured; tests/regression/videos/reviewer = successor
session_01D3E3NaoXShUHgnUPftgX5g · depth 3 · START_CTX ~3 % (estimate; tool reads 0) · rolled over at ~28 % (rule START_CTX + 25 %).
Branch review/pace-all from LIVE origin/main 6b5d3d05 · pushed head a51d97a3.

## What the branch does (every number BAL, law 4; same rule for her and every NPC, law 1)
PART A — ONE PACE TABLE (rule: one ordinary act moves 1/15 … 1/3 of the step it is in)
1. Tài nghệ + Tứ đức (one ladder): BAL.art.gain [2,1.5,1.1,.9,.8] → [1,1.25,1.25,1.25,1.25] (jbal2) ⇒ phần per bậc 5·10·19·28·38 → **10·12·16·20·24** (crsNeedP, total 100 → 82). A played lesson (2 phần) = 5·6·8·10·12 lessons a bậc (harder as she climbs, law 5); LIVE: a good game was 3/5 of Nhập môn (FAST) and 1/38 of Tông sư (SLOW). Points ladder BAL.art.tier untouched → old saves keep bậc + points, NPC study same ladder.
   crsPush (jbalcore) keeps points on a 0.01 grid (was 0.1: a 1.25-point phần drifted, a bậc came 1 phần early/late — unit test A4).
2. Công lao (cung nữ road): need BAL.srvMp×(rank+1) = 5·10·15·20·25 → **BAL.srvMpN [6,8,10,12,14,16,18]** (srvMpNeed, her + NPC servants j14/jagstaff); merits 0.25/0.5 → **whole numbers** (BAL.eff.j42 meritTea/Rite/Mis 1, Sweep/Nvp/Books 2, errand/order 3; BAL.ag … listen/watch 1, scout 2). LIVE: a chore was 1/20 … 1/100 of a rank and «Công lao n/need» (floor) did not move for 2–4 chores.
3. Checked, no change (in window or by design): Hoàng thượng để ý (13/45), thú nuôi tình cảm (4 of 25/25/30), Sủng/Danh/Đức/thiện cảm (robot 1/3 … 1/13; RISES = D2), Lễ nghi khuê các (a counter: one costly lesson = one mức), Chủ tin (starts 40–50 ≥ BAL.srvx.tinUp 35: a gate already met), Học nhanh at the top bậc 1/17 (the lower-yield shortcut, OD:L192; Tứ đức Học nhanh fail = 0 phần by design).
PART B — OÁN / GHEN COOL-DOWN (j28, j1, j8; BAL.oanCool in jbal.js next to oanFade)
4. **Weekly oán cool-down** `oanCool(w)` inside a rivalsTurn wrapper (every road; co-op host only — jcoopworld mutes rivalsTurn on the guest, whose OWN grudges cool in oanMonth, 3 tuần at once): a grudge nothing new fed for BAL.oanCool.quiet = 2 tuần fades by (its BAL.oanLv band width) ÷ season 9 × nết (persF forgive: Thù dai ×.3, Rộng lượng ×1.8, Khiêm nhường ×1.3 …) ⇒ a feud left alone one season drops one band. Floor while the cause stands (law 6a): the holder remembers a bad deed of that person (jmem memTop, g ≥ BAL.mem.faint) → «Chút oán» (oanLv[0]); a keep / lifelong deed → «Oán» (oanLv[1]); the memory fades by BAL.mem.fadeMo, then the floor goes. Two-way: HER oán (S.ro), consorts', men's, servants' — one rule. A rise (oanAdd n>0) stamps p.ocq[key]; carry p.occ. **Canon overwrite**: oanMonth's flat BAL.oanFade 2/month runs only with BAL.oanCool.on = 0 (rollback switch).
5. **Ghen** (v.ghen = a consort's jealousy toward HER, per seat in co-op): (a) a jealousy CAUSED BY ANOTHER CONSORT (ghenUp by = NPC: her dance, a stolen night, a gift shown — 15 callers) no longer raises the score toward her; it fires the Chạnh lòng feeling at that consort as before and becomes oán v → by × BAL.oanCool.ghen.npc .5 (then cools) — LIVE robot: every consort Ghen ~99 by season 2; (b) weekly fade j8 «3 : 1» typed → ghenCool(v) = (than 3 | base 1) + pct .03 × ghen, × nết, carry; (c) a rise toward her × max(.15, 1 − (ghen/100)^3) (BAL.oanCool.ghen.dm, carry v.gUc).
6. Mending ways vs rises (static table below): Biếu quà −5 (1/3 … 1/6 of a band: ok), Tạ lỗi −15 / Nhún nhường −8 (FAST but gated: refused while oán ≥ BAL.net.th.nguoi 10–60 by nết — OB-OAN finding 1); che chở / Phòng bị lower harm, not oán. With the cool-down, a 70 feud left alone comes under the forgiving line in ~21 tuần (unit B12), so Tạ lỗi works again.

## Measured (robot dev/measure/pace-all.js, inpage6 «sens» bot, 24 months/life; summary dev/measure/pace-all-sum.py; static dev/measure/pace-all-table.js)
Per-act shares (robot, LIVE 6 lives → branch 6 lives): art bậc 0 1/5 → 1/10, bậc 1 1/10 → 1/12, bậc 2 1/19 SLOW → 1/16 (bot uses Học nhanh = 1 phần; played 2 phần = 1/8); vir bậc 0 1/2.5 FAST → 1/5, bậc 1 1/5 → 1/6; Sủng 1/13→1/6.5, Danh 1/3.3, Đức 1/5, thiện cảm 1/10 (rises = D2, untouched).
Oán toward her by season (9 tuần), LIVE 9 lives vs branch 10 lives (runs #1+#2, before the ghen dm of 5c): median max / mean / consorts in Oán sâu+ / in Oán hận / Nguy hiểm chung

| season | LIVE max · mean · sâu+ · hận · nguy hiểm | branch max · mean · sâu+ · hận · nguy hiểm |
|---|---|---|
| 1 | 28 · 6 · 0.2 · 0.0 · 61 | 24 · 4 · 0.1 · 0.0 · 20 |
| 2 | 50 · 15 · 0.8 · 0.0 · 70 | 50 · 15 · 1.1 · 0.2 · 57 |
| 3 | 60 · 19 · 1.4 · 0.4 · 69 | 64 · 18 · 1.9 · 0.6 · 66 |
| 4 | 95 · 22 · 3.0 · 1.1 · 82 | 92 · 22 · 3.0 · 1.4 · 77 |
| 5 | 98 · 25 · 3.8 · 1.4 · 76 | 94 · 20 · 3.3 · 1.6 · 73 |
| 6 | 97 · 25 · 4.0 · 1.4 · 74 | 84 · 18 · 3.0 · 1.1 · 69 |
| 7 | 98 · 26 · 4.4 · 1.9 · 77 | 89 · 20 · 3.0 · 1.4 · 67 |
| 8 | 98 · 25 · 4.7 · 2.1 · 74 | 78 · 18 · 2.7 · 1.2 · 68 |
| 9 | 98 · 24 · 5.0 · 2.2 · 74 | 86 · 16 · 2.7 · 1.2 · 71 |
Ghen mean (all consorts) LIVE 50 · 77 · 88 · 98 · 99 … 99 → branch #2 (5a+5b) 16 · 37 · 55 · 70 · 76 · 75 · 82 · 83 · 90. Reading: a feud cools only when left quiet; the LIVE oán toward her is re-fed nearly every week by the j95b ledger seeds (+up to 28 a hit) and relAdd — those RISES are D2's (BAL.stp caps them at ≤ 12 with slowdown); with D2 landed the quiet weeks come and the cool-down does the rest. Ghen still drifts high from her own deeds → 5c added (dm); run #3 on the final build is the successor's step 1.
Static table (pace-all-table.js, LIVE → branch): courses FAST bậc 0 (5 phần) → ok, SLOW top bậc (38) → ok; Công lao SLOW every rank ≥ 1 → ok; oán quiet-week fade 0.7 (SLOW) → 1.7 … 3.3 a tuần (ok).

## Tests so far
dev/test/pace-all.js on the branch build: ALL PASS 22 (course ladder per bậc + exact pushes + NPC + old points; Công lao; oán cool B1–B12 incl. fed = no fade, memory floor, keep floor, her own S.ro, men/servants, no double fade, switch off = old fade, co-op guest only-mine, ghen carry, back under the forgiving line). Robot lives 0 page errors (LIVE 9, branch 10).
NOT RUN YET: regression list (110 tests: /home/user/wt/pa-out/tests.txt rule = every dev/test/*.js matching crsPush|addArt|addVir|crsNeedP|crsProg|BAL\.art\.gain|srvMerit|srvMpNeed|Công lao|SRVA|meritTea|oanMonth|oanFade|oanAdd|ghenUp|ghenAll|p3GhenAll|stealWin|rivalsTurn|\.ghen\b|\.oan\b|tsDanger|Tiến bộ|artp|virp), coop-e2e, quickcheck (old save), coregates (timed out under robot load), videos.

## HANDOVER → successor (the COORDINATOR Foreman D opens it)
State: review/pace-all a51d97a3 (pushed). Container files of this session are gone in a new container: rebuild with a sparse worktree of review/pace-all + `bash dev/site/build_site.sh`; LIVE copy = build of origin/main 6b5d3d05 (or current LIVE: merge it first if main moved).
TODO in order:
1. Robot run #3 on the final build: `CAP=2400 PAR=4 node dev/measure/pace-all.js index.html 6 24 0 sens > br3.jsonl` + `python3 dev/measure/pace-all-sum.py br3.jsonl`; check ghen mean stays well under 90 in year 2 with 5c; if not, raise BAL.oanCool.ghen.pct (.03 → .05) — NOT the rises of other stats (D2). Update the tables above.
2. Regression: `bash dev/measure/pace-all-regress.sh <live.html> tests.txt live.out 3` and the same on the branch build; re-run alone every test that differs; fix families (likely: tests asserting the old phần 5/10/19, srvMp 5, merit .25, ghen rising from an NPC's deed, oanMonth −2): the rule changed on purpose → update the test to read BAL, never typed numbers.
3. `node dev/test/coop-e2e.js <outdir>` (CO-OP FIRST: PASS criterion) + `bash dev/tools/quickcheck.sh` (old LIVE save loads + plays) + `bash dev/tools/coregates.sh` (one-core-guard).
4. Videos (law 12): dev/test/pace-all-video.js (DEV=fold / ipadAir) — part 2 (oán Oán hận 85 → Oán sâu after 9 quiet tuần) works; part 1 the Tứ đức lesson does not apply the gain yet: the flow is Tự học → «Làm» → material option → #kg82skip («Để trời định», kitQuickRoll) → #kg82ok (tdFinish) — use `page.evaluate` clicks (the #klife / #kroul overlays intercept Playwright pointer clicks; hide them with the style line already in the script BEFORE clicking) and wait for #kg82ok; show «Tiến bộ 2/10» after. Also show her relation row (tab 'rel') for the oán word. Upload to img/_review/pace-all/ (python3 dev/site/cdn_sync.py img/_review/pace-all).
5. ONE BIG reviewer (opus) as YOUR child (create_session, source_url https://github.com/thientran2711/cung-tuong-mong, clone_depth 30): this report + the 18 laws; then «LAND READY review/pace-all <sha> (FF from LIVE)» + video URLs here → message Foreman D (session_01D3E3NaVk7n7f8KTo2enJna).
Notes for the merge with D2 review/stat-pace: j8 rivalsTurn ghen line sits right after D2's «spAdd(v,"sung",R(3)-1)» line (adjacent-line conflict, keep both); D2 #3 was messaged. KK39 (session_01V1ZZH1KkKyKvFCTKrJjfDi) could not be messaged (not found) → Foreman D please pass: «Tiến bộ n/need» = crsProg(..)[0] / crsNeedP(bậc) (branch 10·12·16·20·24), Công lao n / srvMpNeed(rank) (BAL.srvMpN), thú nuôi BAL.pet.affNeed steps, oán bands BAL.oanLv — read the functions, never copy numbers.

## For sếp (Vietnamese, short)
- Tài nghệ / Tứ đức: thanh «Tiến bộ» tính riêng từng bậc: bậc đầu 10 phần, rồi 12 · 16 · 20 · 24 (trước 5 · 10 · 19 · 28 · 38). Một buổi học thường được 2 phần: bậc đầu 5 buổi, bậc cuối 12 buổi — càng lên càng khó nhưng không còn cảnh học mãi không nhúc nhích.
- Cung nữ: công lao mỗi việc là số chẵn (1–3), mỗi bậc cần 6 · 8 · 10 · 12 · 14 — làm việc nào thanh cũng nhích.
- Oán: mỗi tuần không ai gây thêm chuyện thì oán tự nguôi dần — yên một mùa (9 tuần) xuống một bậc (Oán hận → Oán sâu …); người Thù dai nguôi chậm, Rộng lượng nguôi nhanh; còn nhớ chuyện ta làm thì không hết hẳn. Oán của ta với người khác cũng vậy.
- Ghen: phi tần khác múa hay, giành đêm… thì họ ghen NHAU, không còn đổ hết lên ta; ghen càng cao càng khó lên thêm và nguôi nhanh hơn.
~70% xong / ~65% chơi được
ROLLOVER (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
