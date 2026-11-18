PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 (read verbatim) | main dev/build/jnroad.js nrOffer + 8 stock nr_* cards (stock nr_hh on a queen asker: same fault, pre-existing) | review/* review/questline-q1a 1b6005a (engine, under E7ar), review/questline-q1b 255f5b2a (this) | claims E7b session_01DgYSWqDaerQBfKu5bPRkef, E7ar session_01DgYSWpCXPTeYeHGVi3ZVZ2

# questline-q1b — BIG review (reviewer E7br, Foreman E)
Scope: `git diff 1b6005a 255f5b2a` only (jnrask_b.js + one assemble.py line + generated index.html / sw.js). Engine = q1a (E7ar reviews it).
Read in full: CLAUDE.md, START_CORE/WORKER/REVIEWER, E-common, E7-questline-q1, questline-expert (A+B), questline-q1a, questline-q1b (both rounds), ROAD_MAP §4.5–4.9, VANPHONG §2/§3. Every one of the 240 asks (h + 4 labels/loss lines each) was read against its chapter (title, sj, cast in jrd_*.js, ROAD_MAP line).

## VERDICT: FAIL 255f5b2a
The writing is strong: every ask is about its own chapter's conflict, the 9 origins sound different (nc custom/letters/envoys, td old case/witness/tiểu đệ, ch the reverse ask against cô mẫu, thd poems/books/exam/teaching, cnv nô tỳ asks), the two asks of a chapter never share a kind (0/120), money is only ever a cost (no «xin bạc» shape; kinds thu 34 · do 60 · emp 44 · che 37 · y 17 · hh 25 · th 23, never bac), the option order matches the stock cost roads, no number in the data (ONE CORE ok: deadlines are the road chapters' own story text, not BAL values). FAIL for a small set of text faults, one story contradiction for the maid askers, and one engine-side group fault the q1b data exposes 25 times.

## Fixes (numbered)
1. **cnv_mat_9 (both asks) assume the maid has risen** («Từ tớ thành chủ, {me} không biết ngồi ghế nào…», «Từ tớ thành chủ, đồ dùng {me} được cấp lại…»), but cnv askers are NPC maids only (nrMInit) speaking as nô tỳ — "nô tỳ … từ tớ thành chủ" contradicts itself. ROAD_MAP §8.4: every cnv chapter must read right as a maid. Rewrite both so they read right for a maid (e.g. the summons turned back, old roommates' envy, the mistress's old punishment record). Also cnv_mat_9[0] o1: label says «nữ quan Khôn Ninh cung», loss line says «ma ma» — make them the same person.
2. **cnv_ban_10[0]** «mấy thái giám của chính phủ ấy» reads as the modern word «chính phủ» (government) — VANPHONG §3. → «của chính Nội vụ phủ».
3. **«ghi ngươi vào lòng»** as a loss line (ch_co_9[0] o1, td_ke_10[1] o1) reads as gratitude («ghi lòng tạc dạ»). → «để bụng ngươi» / «ghi hận ngươi».
4. **ch_ho_5[0]** «Lệ ấy do Trung cung định» contradicts the chapter (ROAD_MAP 4.7: the Thái hậu calls whom first at her own palace, Đức Thọ cung). Reword the hh ask so the Hoàng hậu's part is real (e.g. the consorts' thỉnh an order at Khôn Ninh cung that the Thái hậu copies), or change it to another kind (chapter keeps 2 different kinds).
5. **True information only (HANDOVER L46)**: four asks state as fact that the PLAYER's family has people at court / in a district / who read books: nc_su_9[0] «Nhà {call} có người ở triều», nc_vuong_6[0] «Nhà {call} có người nói được trong triều», td_song_9[0] «{Me} biết nhà {call} có người ở huyện», thd_hoc_9[0] «Nhà {call} có người đọc sách». False for a cn/cnv/thd player. Make them conditional or questions («Nếu nhà {call} có người…», «{Call} có người nhà quen … không?» as thd_hoc_7[1] already does).
7. **ch_co_5[0] o1** label «… xin cho nàng ở lại cung ngươi»: an option label is the player's own voice → «cung mình» (house style of every stock label; the only label of jnrask*.js with «ngươi»; nrask-shots flagged it because j84 prints «cung ta» on screen). Add «ngươi» in labels to nrask-scan.
6. **FOR THE ENGINE (q1a, E7a/E7ar; whole group incl. the stock nr_hh card on main)**: an NPC Hoàng hậu can ask (nrOffer rk "hh"; nrask-shots uses a queen asker), and nrAskPick may then deal an **hh-kind** ask: «{Call} thưa với Hoàng hậu giúp {me}…» spoken by the Hoàng hậu herself (q1b: 25 hh asks, e.g. td_an_7[1], ch_co_10[0], cnv_ma_7[0]; q1a: 21 + 4 others naming the Hoàng hậu, tt_mat_6/8/9/10). Fix in nrAskPick/nrKind: a queen asker never gets kind hh (and never the stock nr_hh); q1b needs no data change for this — every q1b chapter has a second ask of another kind. Add a check to nrask-engine.js (queen asker → no hh ask/card). q1b may land only with this engine fix (or with q1a carrying it).

Not blocking (writer's choice, note for later polish): the 60 «do» asks lean on one shape (dò la, «… giúp {me} biết …» ×34); the expert kit K5 also offers giữ vật chứng / gài người / đồng mưu / cảnh báo — worth mixing in on a later pass. «bên ấy» for the player's palace (5 asks) is colloquial but fine.

## Tests (run by the reviewer on 255f5b2a, worktree /home/user/wt/e7br-q1b)
| test | result |
|---|---|
| build_site.sh → index.html | same as committed except the build line (built) |
| node dev/test/nrask-scan.js | ALL PASS · 432 asks (jnrask 96 + jnrask_b 120 chapters) · 1232 sentences · 864 labels · 864 loss lines · 9 origins 24/24 |
| node dev/test/nrask-engine.js | ALL PASS (kinds never bac + flip; offer carries av; every ask × 2 voices renders, no raw slot; fallback; old saves; play/betray; no page errors) |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · 329 s · core gates PASS · old save ok · perf new/live render 143/168, tab 352/387, buổi 855/775 ms |
| own scans | kind pairs per chapter differ 120/120; h ≤ 235 chars; bạc/Sức road labels follow the stock order (Sức-road labels never name money); emp/th/hh/y asks name their power; 0 digits/%; slots only |

## Shots (Fold 755x1000@2 + iPad 1180x820@2, HOST mode, node dev/test/nrask-shots.js; CDN upload not used: 401 in this container; scratch only, deleted after the verdict)
Picks: nc_su_7:0 peer · td_an_7:1 QUEEN · ch_co_5:0 peer · thd_hoc_8:1 peer · cnv_mat_9:0 peer (10 offer + 10 tab shots). Looked at them: kit j72 offer card + kit option cards (Tốn/Thành/Bại rows, ladder words Khó/Năm ăn năm thua/Khá chắc/Chắc), no overflow, no raw slot, no cut text, no page errors, both devices.
Seen faults: **td_an_7 queen offer** = Hoàng hậu Chu Bạch Lộ says «… sắp vu cho bổn cung tội trộm đồ. Trung cung sẽ phải xử. Muội muội thưa trước với Hoàng hậu, để bà nghe bổn cung …» (fix 6). **cnv_mat_9** «Từ tớ thành chủ …» (fix 1; the script can only cast a consort asker, the real asker is a maid with «nô tỳ»). Script «FAIL» on ch_co_5 tab = fix 7 (label text «cung ngươi» shown as «cung ta»). SHOTS FAIL 2 = these, not layout.
Maid voice (cnv, nô tỳ/tiểu chủ) not shot by nrask-shots (consort askers only); engine test renders every ask in 2 consort voices.

## Re-review
Text-only fixes 1–5, 7 on jnrask_b.js (rerun nrask-scan + nrask-engine; no quickcheck needed for text) + fix 6 in the q1a engine (with an nrask-engine check) → a SMALL re-review of the diff only.
