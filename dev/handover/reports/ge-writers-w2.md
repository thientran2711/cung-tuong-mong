# ge-writers-w2 — W2 (cn_* ×4 · nc_gian nc_su nc_vuong · td_* ×4) — READY r2 2e37bdc9 (r1 6e0426df FAIL) (E11b → E11b2)
PRIORITY #1 CHECK ('grand ending' / 'ge-writers-w2'): OD 5 | main engine LIVE (jge.js/jgedata.js/jbalge.js) | review/ge-writers-w2 = this branch (reused, nothing rebuilt) ; review/ge-writers-w1 df30265f (shared test block source) | claims E11b → E11b2 session_01DgYSWmfFdwEVWhdEJkhbTh.

Branch `review/ge-writers-w2` = **6e0426df** (merged LIVE main 94d11623). No push to main, no PR. FOR B: none (every option name is a real road option; no road patch).

## What E11b2 did (on top of E11b's 1e499220)
- **Funnel fix (open endings at .11, band [1, 2.6])**, jgedata_w2.js only, one real cross-ending Khóa each = an option already on a SIBLING ending's Chuỗi at ch.7–.10 (so a player chasing that sibling closes this one; the target ending's own Chuỗi never holds it):
  | road | ending closed | new Khóa (real option, chapter) | taken when chasing |
  |---|---|---|---|
  | cn_than | ge3 Mang họ mẹ đi | «Xin xét đến cùng, gọi tên kẻ tham» (.10) | ge1, ge4 |
  | nc_su | ge3 Sứ đoàn đẫm máu | «Nhắn trước cho {pa} những điều nên gật» (.9) | ge1, ge2, ge4 |
  | nc_vuong | ge2 Hai ngai một lòng | «Giữ mật thư, dùng khi cần» (.8) | ge1, ge4 |
  | nc_vuong | ge4 Công chúa lưu vong | «Khuyên xuất quân giúp tân {quan} lấy lại ba thành» (.8) | ge1, ge3 |
  | td_song | ge3 Chị em phiêu bạt | «Dâng bản ghi công của em» (.7) | ge1, ge4 |
  Whole group: every W2 road was measured; these 4 were the only ones OUT. Chuỗi / lean lists unchanged → E11b's thiện/ác shading scan (every ending ≥ +3/−3) still holds.
- **ONE CORE** (W1 review item a): the 44 W2 gate / fail / rw rows moved INSIDE the BAL.ge literals (one table per concept, like W1); the Object.assign block is gone. BAL.ge before/after = identical (JSON compare). one-core-guard: 44 FAIL → PASS.
- **Shared test block** copied verbatim from review/ge-writers-w1 df30265f: dev/test/ge-guard.js, dev/test/ge-engine.js, dev/measure/ge-measure.js (road wait).
- assemble.py = main 94d11623 list + 'jgedata_w2.js' right after 'jgedata.js'.

## Measure (dev/measure/ge-measure.js, sens bot, kind + cruel lives; m2 = E11b's run on unchanged data, m5/m6/m8/m9 = E11b2 after the fixes)
| road | lives k+c | run | in-char rate | open at .11 | kind→thiện | cruel→ác |
|---|---|---|---|---|---|---|
| cn_chu | 6 | m2 | .67 | 1.33 | 3/3 | 3/3 |
| cn_tinh | 6 | m2 | .50 | 2.50 | 3/3 | 3/3 |
| cn_ban | 6 | m2 | .83 | 2.33 | 3/3 | 3/3 |
| cn_than | 4 | m5 | .50 | 1.75 (was 2.67 OUT) | 2/2 | 2/2 |
| nc_gian | 6 | m2 | .67 | 1.67 | 3/3 | 3/3 |
| nc_su | 4 | m5 | .25 | 2.00 (was 2.67 OUT) | 2/2 | 2/2 |
| nc_vuong | 4 | m6 | .75 | 2.50 (was 2.83 OUT; m5 after 1st Khóa 2.75) | 2/2 | 2/2 |
| td_an | 5 | m2 | .80 | 1.80 | 3/3 | 2/2 |
| td_ke | 4 | m8 | .50 | 2.00 | 2/2 | 2/2 |
| td_song | 4 | m9 | .50 | 2.25 (m8 2.75 OUT) | 2/2 | 2/2 |
| td_tha | 4 | m8 | .75 | 1.75 | 2/2 | 2/2 |
Open at .11: 11/11 IN. Shading: 11/11 roads, 44/44 lives IN. 0 page errors.
- **Rand lives: NOT measured.** On this container a rand-bot life did not finish in 30 min (two tries, ~60 min, 0 lives; a sens life takes ~2–5 min). Pilots' rand band is the same engine numbers. For the reviewer.
- **NOTE for reviewer (not tuned):** in-char rate is above .60 on several roads (sens bot maxes stats → gates met, odds at cap 88). Same shared BAL.ge.odds as the pilots (ONE CORE) — a Foreman E / shared decision, not a W2 data fix.
- Memory: PAR 3 OOM-kills a page (≈4 GB each); the measure retries; use PAR 2.

## Tests (6e0426df)
- ge-guard 6/6 · ge-engine pilots 104/104 · ge-engine `all` 456/456 · one-core-guard PASS · build_site OK · **quickcheck PASS** (run alone; core gates PASS).
- Flake note: two ge-engine runs made WHILE the bot measure ran on the same CPUs gave 71/104 and 250/456; re-runs alone pass every time (the df30265f road-wait fix targets this).
- **3-way merge check** (W2 6e0426df + W1 df30265f, both on main 94d11623; conflicts only in assemble.py line, jbalge.js rows, built files): one-core-guard PASS · ge-guard 6/6 (25 live branches) · ge-engine all **808/808**. (Earlier W1 a58b55eb merge showed 2 W1-side clashes — dtq_binh_2.cw = pilot, tt_tranh_3.fail = cn_than_3 — fixed on W1's side.)

## Files
dev/build/jgedata_w2.js (new) · dev/build/jbalge.js (44 rows in the literals) · dev/build/assemble.py (one name) · dev/test/ge-guard.js + ge-engine.js + dev/measure/ge-measure.js (= W1 df30265f) · index.html / sw.js rebuilt.

## ROUND 2 (review E11r-w2 FAIL 6e0426df → fixes) — E11b2, branch a2774fa8 (merged main 13bb8c88)
| fix | before | after |
|---|---|---|
| 1 law 6b/c | cn_chu_4 «người đã sinh ra nó» (tablet, ngọc điệp, Tông nhân phủ returns him to her) | Foreman E route (b): text true for EVERY son — she bows-in the new king, «ngai vàng là của thiên hạ»; a: tấu chương through her hands; ft: Tông nhân phủ takes him to Đông cung for the thầy; fail «Con rời tay mẹ» |
| 1 | cn_than_2 «dòng máu tiên triều» (t/a/ha/ft) | the Thẩm case cleared, «dòng máu họ Thẩm» as the banner; ft: Thẩm enemies raise the old case; fail kept |
| 1 | td_an_4 «hũ tro của cha … chùa ngoài thành» | the road's grave: «dời mộ cha về quê cũ» (= option «Xin dời mộ cha về quê»); fail «Mộ cha chưa dời»; dropped «cây hồng mẹ từng trồng» (no road fact) |
| 1 | nc_su_3 a «mất chức ở Binh bộ» | «tờ sớ của người cha không còn ai nghe» (the salt house whose father dâng sớ) |
| 2 terms | td_ke_2 «kẻ đã cầm dao … người cầm dao» | road words «con dao năm xưa» / «bàn tay sau màn» (jrd_td: «bàn tay sau màn năm ấy»; the review's «bàn tay cầm dao» is not in the road) |
| 3 dups | cn_chu lean.p «Xin {eun} giữ lão lại» ×2, cn_chu_4 pull «Tự thức canh, mời thái y khác» ×2 | once each; dev/test/ge-guard.js +1 line «no name twice in one list» (pilots 0, W1 fd7c6775 0, W2 0 → W1 can take the line unchanged) |
| 4 place/scene | cn_tinh_4 «am Tĩnh Thủy» (nowhere in game), same altar+Sư bà scene as td_tha_3 | chùa Hộ Quốc (jrd_td/jrd_ch); scene = leaves the old khăn thêu at the gate, sweeps leaves; no Sư bà (ft «Nhà chùa») |
| 4 polish | stock fail frames «Lời xin ra cung bị bác/gác lại», «Chứng cứ … bị bác/gọi là …», «… vững hơn ngươi tưởng» on cn_than_3/4, nc_su_3, td_an_1/4, td_ke_1 | each W2 ft reworded (none of the three frames left in W2) |
| 5 measure (6 lives k+c each) | nc_vuong 2.50 (n4) · cn_chu 1.33 (m2) | nc_vuong **2.17 IN** (m10) · cn_chu **3.20 OUT** (m10: ge2 target closed nothing) → 3 sibling Khóa: ge1 ← «Chào {v} trước, như xưa» (ge2 Chuỗi .8), ge2 ← «Đứng chờ {v} chào theo phẩm» (ge1 Chuỗi .8), ge3 ← «Xin Hoàng hậu xét lại bổng lộc» (ge4 Chuỗi .9) → m11 (6 lives): cn_chu **2.00 IN**, kind→thiện 3/3, cruel→ác 3/3 |
Family scan (all 44, t/a/ht/ha/ft/cw): places/offices/kin/named objects checked against the road's own text (jrd_<o>.js + j67 .4 + ch12–14): after the fixes no fact is missing from its road; outside-road names left are real game places only (td_song_2 Dưỡng Tâm / Chính Dương). Ending-created objects (rương, gấm, áo vải) are outcomes, not road facts. td_tha_1/3 letters = the road's «đốt thư».
**READY r2 = 2b8c96f3** (main fa411d6f merged). Tests: ge-guard 6/6 · ge-engine all 456/456 · one-core PASS · build_site OK · quickcheck PASS (alone). assemble.py: W1 not on main yet → line = jgedata.js, jgedata_w2.js; when W1 lands first the order is jgedata.js, jgedata_w1.js, jgedata_w2.js (the re-merge keeps both).

---
## E11b history (1e499220, kept for the reviewer)
## What is done
- `dev/build/jgedata_w2.js` (new): `Object.assign(GE_DATA,{…})`, 11 branches × 4 endings, shape = jgedata.js (pull/close/cond/fo/cw/t/a/ht/ha/fail/ft + lean p/m). Every option name is a REAL road/ch12–14 option (ge-guard checks all; no road patch needed → **FOR B: none**).
- `dev/build/assemble.py`: one line, jgedata_w2.js right after jgedata.js (W1 will add jgedata_w1.js on the same line — keep both).
- `dev/build/jbalge.js`: one appended W2 block `Object.assign(BAL.ge.gate|fail|rw,{…})` for the 44 endings (ONE CORE; W1 conflict is textual only — keep both blocks).
- `dev/test/ge-guard.js`: NEW family check — no two endings of ANY live branch share a narration sentence (t/a/ft), ht/ha, cw or fail name (found + fixed 3 repeats incl. one pilot clash). Result **6/6 pass**, 14 live branches.
- `dev/test/ge-engine.js`: `GE_ROADS=<list>` env runs the unit checks on any live branches → W2 **360/360 pass** (pilots default 104/104).
- Fix the whole group (after measure m1: 3 cruel cn lives shaded thiện on gentle chains): scan of all 44 Chuỗi for thiện/ác-tagged real options; before → after (min per side): before e.g. td_tha_1 +14/−0, nc_su_2 +0/−3, nc_gian_3 +0/−3, cn_tinh_4 +0/−3 → after every ending ≥ +3/−3 (most ≥4) — table: `node /home/user/wt/gew2-work/scan.js dev/build/jgedata_w2.js`.
- Law 6b (18 LAWS): FOLLOW endings name only real people (người ấy = her real bond; nc_vuong_4 hoàng huynh; td_tha_4 the enemy's daughter {foe}); cn_chu_4 «Thay chủ nuôi con» now needs a real son (cond ["son"]; raising another's child = existing act «Xin bế con nàng về nuôi», j8).

## Measure m2 (partial, 45/66 kind+cruel lives, sens bot, data of 80201651 — the 1e499220 text/cond edits do not change chains)
| road | lives | grand rate (in-char) | open at .11 | kind→thiện | cruel→ác |
|---|---|---|---|---|---|
| cn_chu | 6 | .67 | 1.33 | 3/3 | 3/3 |
| cn_tinh | 6 | .50 | 2.50 | 3/3 | 3/3 |
| cn_ban | 6 | .83 | 2.33 | 3/3 | 3/3 |
| cn_than | 6 | .67 | **2.67 OUT** | 3/3 | 3/3 |
| nc_gian | 6 | .67 | 1.67 | 3/3 | 3/3 |
| nc_su | 6 | 1.00 | **2.67 OUT** | 3/3 | 3/3 |
| nc_vuong | 6 | 1.00 | **2.83 OUT** | 3/3 | 3/3 |
| td_an | 5 | .80 | 1.80 | 3/3 | 2/2 |
Shading: 44/44 IN so far. Open-at-.11 band [1,2.6]: 3 roads just above. In-char rate above .60 on most roads (sens bot maxes stats → gates always met, odds at cap 88) — same engine numbers as pilots; not tuned (BAL.ge.odds is shared ONE CORE; report to Foreman E).

## §ROUND 3 REMERGE (E11w2m, 18/11)
- review/ge-writers-w2 now **101c67e7** (was 2e37bdc9); merged origin/main three times as it moved: e16e1d66 (W1 jgedata_w1.js + map-zones r6) → 884ce97 (doc-90-women-r1) → ddbf9c7 (entry-blank-r3). No content changes.
- Conflicts: assemble.py (list = main's whole list, `jgedata.js, jgedata_w1.js, jgedata_w2.js`); jbalge.js (3 literals gate/fail/rw: W1 block then W2 block, no value changes, all keys of both waves present); index.html + sw.js each time (took main's copy, regenerated with assemble.py + `bash dev/site/build_site.sh`, markers 0). ge-guard.js auto-merged clean (W1 content + W2's «no name twice in one list» line).
- map-zones r6 dropped palaces Trữ Tú cung, Hàm Phúc cung, Thái Cực điện: grep of jgedata_w2.js (and w1) for those names = 0 hits; the only palace named in W2 is Dưỡng Tâm điện (live). No content decision needed.
- Tests on 101c67e7: ge-guard **6/6** (ERRORS 0, 26 live branches, dup line over W1+W2 clean) · ge-engine `- all` **808/808** · one-core-guard **PASS** · GE measure W2 roads (11 roads, kind+cruel, sens, 22 lives, PAR 2; run on 9725667, later merges touched no GE code): 22/22 lives ok, page errors 0, inChar .41 IN, random 0 IN, open11 2.33 IN, shade kind→thiện 1.00 / cruel→ác 1.00 on every road IN · quickcheck ALONE **PASS** on 49a12174 and again on 101c67e7 (open 1526 ms, old save ok, render 189/205, tab 411/471, buổi 1198/1433 new/live).
- Pushed with main ddbf9c7 already contained (fetched right before the push).
- **Final: review/ge-writers-w2 = c1e39605** — main moved once more (53544bd coop-thin-f1) after the quickcheck; merged (conflicts only index.html + sw.js, regenerated), ge-guard 6/6, ge-engine 808/808, one-core PASS rerun on it; main 53544bd contained at push. quickcheck last run on 101c67e7 (PASS); the delta is main's coop-thin-f1 only.

## §ROUND 4 REMERGE (worker E13m)
- review/ge-writers-w2 now **e38c9337** (was c1e39605); merged origin/main bb8e8ec9 (main was 9a1d6922 at first merge, moved to bb8e8ec9 before the push; merged twice). Main 9a1d6922/bb8e8ec9 contained at push (fetched right before).
- Conflicts: dev/build/assemble.py (main's whole list incl. jagacts4.js + jnroadhp.js (Q2 landed), `jgedata.js, jgedata_w1.js, jgedata_w2.js` in that order); index.html + sw.js regenerated via assemble.py + build_site.sh (markers 0). jbalge.js merged clean (both waves). No content conflict.
- Tests: ge-guard 6/6 · ge-engine `all` 808/808 (on both merges) · one-core-guard PASS · GE measure W2 roads (11 roads, kind+cruel, sens, 22 lives, PAR 2, run on the 9a1d6922 merge; bb8e8ec9 delta touched no GE code): 22/22 lives, 0 errors, shade kind→thiện 1.00 / cruel→ác 1.00 on every road, random 0 IN · quickcheck PASS on the final e38c9337 (render 143/149 ms, buổi 827/766 ms, core gates PASS).

## §ROUND 5 REMERGE (worker E11w2m3, 19/11)
- review/ge-writers-w2 now **360c0ed** (was e38c9337); merged origin/main three times as it moved: 96188526 → 1cf5e8bb (live-servants j95s.js + role-parity + seal-lean) → c12a587 (maid-ladder-6). Main c12a587 contained at push (fetched right before).
- Conflicts: dev/build/assemble.py (main's whole list + `jgedata_w2.js` after `jgedata_w1.js`; jgedata.js, jgedata_w1.js, jgedata_w2.js in order, jnroadhp.js and j95s.js kept); index.html + sw.js + assets.json regenerated via assemble.py + build_site.sh (markers 0). jbalge.js / ge-guard.js merged clean. No content conflict.
- Tests: ge-guard 6/6 · ge-engine `all` 808/808 · one-core-guard PASS (all rerun on the final 360c0ed) · GE measure W2 roads (11 roads, kind+cruel, sens, 22 lives) run on the first merge a9c7682 in pieces (this box's chromium crashed "Target crashed" mid-run twice; surviving lives kept, missing ones rerun): 22/22 lives completed, 0 game errors, shade (shW) kind→thiện / cruel→ác on every life; later merges touched no GE code · quickcheck PASS on 360c0ed (render 211/198 ms, tab 407/385, buổi 941/1020; the 1cf5e8bb merge failed once on tab 516 vs limit 514, passed on the rerun = the known perf flake).
