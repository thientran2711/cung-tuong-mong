PRIORITY #1 CHECK: I read START_CORE (18 laws) + START_REVIEWER, the worker report dev/handover/reports/ge-batu.md, the W3 review dev/handover/reports/ge-writers-w3-review.md (law 6c object-state precedent), GRAND_ENDINGS.md §2.13 + catalogue rows 273–288 on the handover tip, BAL.ge in dev/build/jbalge.js, BDP/bdKill/bdO in jrd_bd.js + jrd_bd2.js, and jge.js geTerm. I git-grepped origin/main 315950c2, review/bd-roads d76511d3 and review/ge-batu e0424d54. Nothing duplicates this work. bd-roads 4adea508 is the base.

# ge-batu BIG review — review/ge-batu e0424d54 — reviewer E28r

**VERDICT: FAIL e0424d54.** The numbered fix list is below. The structure, gates, guards and doc work are good. The failures are text-vs-state truth (laws 6a/6c) plus one law-2 sizing issue. No final-merge in any case until bd-roads and ge-w3 land.

## Gates (run by me)
| gate | result |
|---|---|
| ge-guard | 8/8 PASS, ERRORS 0, 29 live branches incl. bd_san/bd_soi/bd_tuyet/bd_hen; STEPPE regex 0 hits |
| ge-engine `- all` | **936/936 pass** (bd slice 4×34 = 136/136) |
| one-core-guard | PASS (inline 3837 ≤ 4212, fails 0) |
| quickcheck alone (bash dev/tools/quickcheck.sh) + old save | **QUICKCHECK PASS** 396 s · core gates PASS · time-spill PASS · open 1624 ms · old save ok («Hoa Tuyết Dao», 0 errors) · perf median new/live render 256/232, tab 490/546, buổi 1566/1197 ms, tasks>200ms 20/19 |
| law 14 (GRAND_ENDINGS steppe→Ba Tư in place) | PASS: grep finds 0 steppe words; the only hits are the art line «never steppe» and «old saves stay Bắc Địch». Catalogue rows 273–288 match cat.py; §2.13 is Ba Tư |
| law 7 VANPHONG | PASS: t/a 3 sentences, ft 2–3; no digits, %, or {tokens} in the narration; cổ trang wording |
| law 6b real people | PASS: every dead-able person (Đạt Lỗ, Nê Niết Sư, A La Hám, Mật Hồ Đạt) is named only behind a correct fo/cond. The places Tật Lăng, Thông Lĩnh, Đức Thắng and Thận hình ty all exist in the game |
| law 8 expert note | present in the worker report |
| law 5 | n/a, same as W1–W3 (FOR E question 1 stays open) |

## Measure (run by me, ONE life per process, ge-measure.js unchanged except JOBI = one job)
bd_san 12 lives; bd_soi 7, bd_tuyet 6 and bd_hen 4 lives (the 4 aimed jobs; its kind/cruel lives hung past 40 min and were stopped) (I cut the plan to 8 jobs per road for time; every job type ran at least once per road). 0 errors.

| road | n | inChar | random | open11 | kind→thiện | cruel→ác | aimed won / tried per ending | won by ending | end Mật |
|---|---|---|---|---|---|---|---|---|---|
| bd_san | 12 | .73 | 0 | 1.92 | 1.00 | 1.00 | 2/3 3/3 1/3 2/2 | 2·3·1·2 | 0–1 |
| bd_soi | 7 | .50 | 0 | 3.14 | 1.00 | — (cruel aimed at ge3, failed on mật) | 2/2 1/1 **0/2 0/1** | 2·1·0·0 | 0–2 |
| bd_tuyet | 6 | .67 | — | 2.17 | — | — | 1/2 1/1 1/2 1/1 | 1·1·1·1 | 0–1 |
| bd_hen | 4 | .75 | — | 1.50 | — | — | 0/1 1/1 1/1 1/1 | 0·1·1·1 | — |
| all | 29 | .67 | 0 | 2.21 | 1.00 | 1.00 | 5/8 6/6 3/8 4/5 | | |

Bands (BAL.ge.target): inChar [.3,.6], random [0,.2], open11 [1,2.6], shade ≥ .7.
- No ending dominates (wins spread 5·6·3·4). Random is 0 (good). Shade is 1.00 where it was measured.
- Every ending is open at chapter end in many lives (openAtEnd 16·14·12·20).
- bd_soi ge3/ge4 were never won by a bot. ge3 fails on mật (cf=mat:0/2). ge4 needs son + Tô Lận seat, which this bot never builds. Both are reachable by design, not by this bot.
- inChar .67–.75 sits above the .6 ceiling on 3 of 4 roads. Bot stats reach 95–100 by ch11, so the 35–55 stat gates do not bite. Only mật and the cond terms decide the outcome.

### Mật gates lowered 3/4 → 2 (da7224d7)
- The bots end EVERY life at mật 0–2, on bd roads and on a td_ke comparison life (mật 0). Bots place no real spies; mật is derived by tmSync from real spies.
- The aimed mật endings fail with cf=mat:0/2 even at the lowered value. **The change moves no measured number.** It did not make any test pass, so it is not test-gaming.
- It is also not proven by numbers. It is consistent with the table (mat:2 ×17, mat:3 ×11, mat:4 ×10). The bd roads give fewer spy beats than the palace roads, so I **accept 2**. The worker must give one line of reason in the report (see fix 8).

## FIX LIST (numbered; all must be done before PASS)
1. **Law 6c ring, bd_hen_1 «Lời thề trọn vẹn».** Its t says Mật Hồ Đạt puts the ring back «vào tay ngươi», and its ft says Thận hình ty seals the ring. Both are false when da=chon (burned) or da=vua (the Emperor holds it).
   - Add to `close`: «Dâng nhẫn vào lửa thánh ở đền Hỏa Tiên» (bare) and «Dâng chiếc nhẫn vào lửa thánh».
   - Then either also close the «vua» options or make t/ft true for da=vua.
2. **Law 6c ring, bd_hen_2 «Dâng lửa lời thề».** Its t/a burn the ring she holds, which is false when da=tra (returned) or da=vua.
   - «Để chiếc nhẫn ở chỗ Hoàng thượng» is even in its `pull`, and «Đưa chiếc nhẫn cho Hoàng thượng xem» is in its pull as well.
   - Either close the tra and vua options or rewrite t/a so they are true in those states, for example: the ring is gone, so she burns the oath letter or the ash packet.
3. **Law 6c song, bd_tuyet_4 «Khúc ca Nô Nhụ».** t needs khuc=thien and a needs khuc=oan. Beat t1 may never fire, and the shading comes from lean p/m, not from the song she actually wrote.
   - Either (a) ask E for an engine flag term (FOR E question 2), or (b) rewrite t/a so each is true whatever the khuc state is, including no song.
   - The cw line «một khúc ca thật sự đã viết thành lời» is then only true with (a).
4. **Law 6a letters, bd_soi_3.** Its t says she presents «những bức thư dọa của vương thúc». The letters can be gone: thuluc=burnt via «Đốt lời nhắn trước mặt người đưa» (lean m, not closed), beat s3 is gated RDW(0) so it may never fire, or s3's third option was taken.
   - Close the burn option and make t true without the letters, or cite only evidence that always exists («lời khai»).
5. **Law 6a evidence, bd_hen_4 «Đòi máu cho chàng».** Its t/a/cw cite «chứng cứ ngươi đã giữ», but a life can hold none («Ngồi yên, chờ xem», «Để mặc»).
   - Gate on a term that proves evidence exists, or reword to evidence the ending itself creates.
6. **Law 6c timing, bd_hen_4.** «Ngươi rời cung theo linh cữu Mật Hồ Đạt về tây» comes too late: the coffin already left with the envoy at ch11 s3.
   - Reword so she leaves after the coffin, for example along the road the envoy took, or to his grave in Tô Lận.
7. **Law 2 sizing.** bd_soi_2 and bd_tuyet_2 rw are the ONLY rows in the whole BAL.ge.rw table that give both rank:1 and bac:300. Every other bac:300 row has no rank. This breaks the worker's own rule too.
   - Drop one of the two from each row (keep rank and cut bạc to the usual size, or keep bạc and drop rank) and match a W1–W3 row of the same shape.
8. **Law 6b dead man, bd_hen_3 fail text.** Its ft «… Mật Hồ Đạt về tây không một lời…» shows exactly when fo e10 lose fires, which is when Mật Hồ Đạt is DEAD (bdKill phong at bd_hen ch10 lose). I saw it on screen (shot A below).
   - Rewrite the ft so it is true for a dead man, for example his coffin going west.
   - Scan every ft whose fo is a death condition for the same fault.
9. **Family scan + report.** Re-scan all 16 endings: every object or evidence claim in cw/t/a/ht/ha/ft against bdO (da, khuc, thuluc, chen, dai, daocat, so, bando) and the RD_FL state.
   - Post a before/after table (LUẬT SỬA CẢ NHÓM).
   - Add the one-line mật=2 reason to dev/handover/reports/ge-batu.md.
   - Re-run ge-guard, ge-engine and one bd life per road with the fixed sha.

## Notes (no fix needed)
- The worker's history note says Arabs take Tô Lận, while the road and the endings keep Tô Lận as a living court. The road canon wins; the endings are fine.
- bd_hen_3 after an e10 «mid» exile is an acceptable effect.
- bd_san_3's «chứng cứ chuồng ngựa» is gated by fo e6 lose, so it is true when it shows.
- inChar above the band comes from bot stats saturating, not from these gates. If W-roads show the same in this harness it is game-wide: FOR E, not this branch.
- FOR E (open from the worker): Q1 law-5 rank key; Q2 song flag term (fix 3a); Q3 the steppe words in ROAD_MAP §4.5b are in B's file, so they should go to B.

## Shots (local only: the CDN refuses with 401; no images are committed; I looked 3×)
These use a scratch copy of the ge-shots flow on road bd_hen with ends[10]=lose, at Fold 755x1000@2 and iPad 1180x820@2. 0 page errors and no horizontal overflow in all 12 shots.
- **A: «Kết cục · Nghĩa chưa thành nghĩa»** (bd_hen_3 failed on its fo).
  - The kit event card shows the VIỆC tag, the scene image, two narration lines, «MẤT Danh -8» in red and one «Tiếp tục» choice with the «Nắm chắc» ladder.
  - Layout is clean on both devices. Its text is the fix-8 fault.
- **B: «Đại kết cục · Đòi máu cho chàng»** (bd_hen_4).
  - The card shows 3 narration lines split by dotted rules, the «Thiên hạ truyền tai» line, «ĐƯỢC Danh +30 · Tâm cơ +10», «Cả lục cung thêm kính sợ ta», the kim sách reward line and «Tạ ơn».
  - On the iPad each line fits on one row; on the Fold they wrap cleanly with no clipping.
  - The text shows fixes 5 and 6 (the evidence and the coffin timing) live on screen.
- The fork screens (Ngã rẽ 1/2, «Cuối con đường «Lời thề trước lửa thánh»») render correctly with the odds ladder and the TỐN/ĐƯỢC rows.

## ROUND 2 — review/ge-batu 1ca835da (E28b) → **PASS**; final-merged on LIVE → **LAND READY a99673e8**
PRIORITY #1 CHECK: I read E28b's «## ROUND 2» in dev/handover/reports/ge-batu.md and the diff e0424d54..1ca835da (only jgedata_bd.js, jbalge.js rw and the new dev/test/ge-bd-scan.js beyond the main merge). bd-roads is LIVE (494b386a, in eb11e2ad).

### Fixes, checked line by line against the road canon (jrd_bd/jrd_bd2 bdO, bdKill)
| # | fix | r2 state | verdict |
|---|---|---|---|
| 1 | bd_hen_1 ring | no ring in t/a/ft; t needs the living Mật Hồ Đạt and is gated by fo e10 lose; ft «Con đường về tây đóng lại…» names no dead man | OK |
| 2 | bd_hen_2 ring | ring-free: she stands before the fire and thanks the old love; «đốt được cả quá khứ» is a figure, not an object | OK |
| 3 | bd_tuyet_4 song | option (b): the ending itself has her compose a NEW song at next spring's feast, true in every khuc state; cw reworded | OK |
| 4 | bd_soi_3 letters | evidence is made by the ending (she arrests the uncle's men; their confessions); the threat letters are gone | OK |
| 5 | bd_hen_4 evidence | t/a now cite the night of the alarm gong in the Đại Lý tự prison, which is the canon of its own cond (bd_hen ch10 lose, jrd_bd2.js:536) | OK |
| 6 | bd_hen_4 coffin | «theo con đường sứ đoàn đã đưa linh cữu… về tây»: she follows after the coffin | OK |
| 7 | law 2 rw | bd_soi_2 {rank:1,danh:30,duc:10,rel:8}, bd_tuyet_2 {rank:1,danh:30,tamco:10,rel:8}: bạc dropped, same shape as bd_soi_3 | OK |
| 8 | death-fo ft | bd_hen_3 ft no longer names Mật Hồ Đạt; bd_hen_1 and bd_soi_2 ft are also clean | OK |
| 9 | family scan | ge-bd-scan.js lists 34 hits (object, evidence and dead-able person × field, with fo/cond); I read all 16 endings' cw/t/a/ft: 0 faults. Extra fixes are canon: Ngọc Câu is the white horse (jrd_bd), Kim Quang môn exists (jrd_bd ×42); the mật=2 reason is in the worker report | OK |

### Gates (mine)
- On 1ca835da: ge-guard 8/8; ge-engine 1288/1288 (the first run gave 1269 with no false keys in the output and two reruns gave 1288, so it is a timing flake and I note it); one-core PASS; quickcheck alone PASS (old save ok, perf ≈ live).
  - One life each, bd_hen (aimed ge4) and bd_soi (aimed ge3): 0 page errors; both fail on their design conditions (e10 lose; mật 1/2), as in round 1.
- **Final merge onto LIVE eb11e2ad → a99673e8.** The only real conflict was the assemble.py module list: I took main's list (+ jmgid.js) and put jgedata_bd.js after jgedata_w3.js. index.html and sw.js were rebuilt.
  - On a99673e8: ge-guard 8/8, ge-engine 1288/1288, one-core PASS, QUICKCHECK PASS (old save ok; perf new/live render 265/245, tab 548/466 ms).
  - Hooks coop-one-world, mk-layer-scan (12960 pictures, 0 bad), manifest-guard, npc-purpose-scan and odds-cap all PASS. The first quickcheck pass flagged coop and mk-layer only because my sparse worktree lacked coop/ and dev/art/.

**LAND READY review/ge-batu a99673e8** (queues after pm r3 and phutang in the E order). Main untouched by me.
