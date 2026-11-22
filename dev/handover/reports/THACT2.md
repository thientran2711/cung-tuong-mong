START_CTX ≈ 4 % of 1M (get_session reads 0 → own estimate) · depth 3 · roll line ≈ 29 %, ceiling 60 % · rolled at ≈ 28 % (own estimate) → HANDOVER below
# THACT2 — Thái hậu act seals, lean-out level (owner L2363 "vẫn quá là nhạt nhòa" + L2370 GO), worker of ROOT-C3 (session_01D3E3NaHk4WXbAeqcG1iXWK)

## Done
- Prompts for all 18 (codes M2370-A01..A18, MA_HINH.json): dev/handover/prompts_L2095/M2370-ANN_th_act-<k>_B_burst_LEAN.txt (+ .keep) and _clips_LEAN.txt (OUT / LOOP / BACK note; redone ones also carry OUT_REDO / LOOP_REDO, and B_burst_LEAN_REDO.txt + .keep).
  Order: 01 vui · 02 lo · 03 ẩn · 04 mưu · 05 ghen · 06 buồn · 07 sợ · 08 chán · 09 khó chịu · 10 tình tứ · 11 bình · 12 đau lòng · 13 hổ thẹn · 14 choáng · 15 hờn · 16 hăng hái · 17 chuyên tâm · 18 hưng khởi.
- Gates: seal_gate.py (A24 = the seal gate; check_store is the figure gate, not used for seals) PASS on every B/OUT/LOOP sent (54 + redo texts); keep_check --sidecar 24/24 PASS (every allowed drop = a lean/restrained-action phrase, "# owner L2363/L2370 + A29"). No outfit/crown/jewellery words cut.
- The 8 kept-M2342 seals got a CLEARER action (same cost), files M2370-A11..A18 (NOT generated yet):
  bình = forearms on rim, blows on celadon tea, contented sigh, floating tea leaf · đau lòng = clutches jade pendant tight, head bowed, two tears, trembling lips · hổ thẹn = swoons over rim, back of hand at temple under cloth, waves white handkerchief weakly, sly peek · choáng = grips rim, jaw dropped, dizzy spiral eyes, grey cloud with 3 circling stars · hờn = forearms folded tight on rim, face turned sharply away, puffed 'hmph' cheeks, grey puff · hăng hái = sleeves rolled, small determined fist, big bold brush strokes on sheet over rim · chuyên tâm = forearms on rim, book up close, fingertip follows line, hourglass on rim · hưng khởi = brush near shoulder, small ink swirl CLOSE to the brush, other hand presses paper on rim (pull-in wording: only head, shoulders, forearms out).

## Generated (10 of 18 started) + measure (leanout_measure method, peak / loop % of disc area outside the rim)
| seal | try 1 ("leans boldly OUT … about a third") | try 2 = one redo (L2324) | state |
|---|---|---|---|
| buồn | 27.5 / 23.6 | — | **PASS** |
| vui | 23.9 / 20.1 | 53.3 / 39.2 | over 40 |
| lo | 24.1 / 20.4 | 61.0 / 52.0 | over 40 |
| ẩn | 47.5 (mist puffs) / 13.3 | 68.6 / 55.3 | over 40 |
| mưu | 19.9 / 19.0 | 45.6 / 42.7 | over 40 |
| chán | 21.2 / 7.7 | 78.6 / 29.2 | over 40 |
| khó chịu | 23.8 / 19.2 | 42.0 / 37.3 | over 40 |
| ghen | 26.6 / 6.1 | LOOP-only redo: 26.6 / 12.4 | B too weak (B pose ≈ 12 %; the 26 % was a passing frame mid-OUT) |
| sợ | 29.4 / 17.8 | LOOP-only redo: 29.4 / 17.4 | B pose ≈ 17 % |
| tình tứ | 26.2 / 15.6 | LOOP-only redo: 27.3 / 13.9 | B pose ≈ 12 % |
MY MISTAKE: for ghen/sợ/tình tứ I redid only the LOOP (peak looked in band). Frame check showed the B pose itself is weak (≈ 12–17 %); the LOOP redo could not fix that → 3 × 940 cr wasted.
WHY try 2 overshoots: try-2 B wording ("leans far OUT … well over a third … the medallion smaller than her body") makes GPT draw the medallion much smaller; the BACK/disc lock rescales every frame to A's disc → she grows ≈ 1.3× vs A (visible zoom, breaks "same size, no zoom") and 42–79 % is outside. Looked at (strip): action very clear, head/shoulders/chest/forearms over the lower rim, never fully out, same Thái hậu, two hands, no earrings — the only fault is the size jump.
Looked at try-1 B sheets + strips too: all clear actions, same Thái hậu, two hands, no earrings; try-1 lean ≈ 20–27 %.

- NOTE: codes are M2370-A.. because another worker already used M2370-01..17 (rooms) on the same Lượt; MA_HINH.json was broken JSON upstream again (duplicated tails) → rebuilt from every "code": "file" line, first value kept (THACT1 method).

## Output (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/)
- th-act-lean-try2-batch1-anim.mp4 (vui lo ẩn mưu chán, try 2) sha b1d782b62bf1
- th-act-lean-try2-batch2-anim.mp4 (khó chịu try 2 + buồn PASS) sha e420fc3e455c
- per seal th-act-<k>-{out,loop,back}-M2370.webp for vui lo an muu chan khochiu buon (current = try 2 / buồn try 1) and ghen so tinhtu (try 1 OUT + LOOP-redo).
Old M2349/M2342 files untouched.

## Cost
16 × 135 (B) + 35 × 940 (clips) = **35 060 cr** (ledger: 51 lines "THACT2"). Balance before ≈ 2 861 726.

## Ids (A / B used / OUT / LOOP) — also gen_ledger.jsonl
try 1: vui iGK2WNd3uK / LwISYIWswO→WDSVHVqcXe / 6A5ZtAqiJO / O6u9dW7ynm · lo dt98aeoXSL / SyvJTa6Ub8 / jU8gY3ALD0 / O6u9dcJynm · ẩn WDSVB0ScXe / s7tUWmul8e / mE2fwjwhJQ / yiQNXTaPW9 · mưu bxD1gXY5Y2 / Td7pbOlVNR / s7tUc2Ll8e / jU8gYZzLD0 · ghen Td7pIPRVNR / SyvJTCAUb8 / EbWH4w0uuO / xSolnZsjfW (+LOOP redo w4fyeKu7EI) · buồn huACbjFvqL / DoyX1jIpcl→IfRvSW6tvE / LwIScglswO / WDSVqTFcXe · sợ 4RHizV19Aa / 1lXLGYIr4r→8a3hgY0IrU / MBOd1eWDCm / 0ewD5DxTfW (+LOOP redo WDSVb6XcXe) · chán bxD1gPL5Y2 / O6u9d82ynm / dt98L8WXSL / yiQNB6VPW9 · khó chịu jU8gyvsLD0 / 1lXLGWfr4r→CqYFPpaEEy / lJmwT7agv9 / LwIScwUswO · tình tứ huACqhevqL / xSolnV4jfW / 1lXLzlir4r / cpUMbpg0eP (+LOOP redo DoyXxAxpcl)
try 2: vui tCZa7MEmZJ / 0ewDk1GTfW / MBOdxLHDCm · lo P3F68s542C / 9Zq3mvSNYZ / 79CPX8oJAL · ẩn SyvJDk0Ub8→lJmwM6ogv9 / u5cqi25QLD / w4fyd8M7EI · mưu 1lXLnQwr4r / xSolcMfjfW / MBOdxg5DCm · chán 5jprACDKxe / VXJerlTMMU / ksdjnVR16B · khó chịu fHnQ48lCDY→YMgTbo7WeC / rgBsWD8xtc / VXJergVMMU

## HANDOVER (THACT2 → successor; ROOT-C3 opens it) — 22/11 ~06:45Z
DECISION FOR ROOT-C3 (not the owner, L2370): L2324 allows one redo and it is used for 9 seals (6 overshoot, 3 wrong-kind LOOP redo). A second try = beyond L2324. Options: (a) accept try 2 for the 6 overshoots if the bigger look is OK (clear, bold, never fully out, but she grows ≈1.3×); (b) authorise one more B+OUT+LOOP with the MIDDLE wording below for the 6 overshoots + B redo for ghen/sợ/tình tứ (9 × 2 015 ≈ 18 135 cr).
MIDDLE WORDING (recommended): try-1 B text ("leans boldly OUT … about a third of her body outside the medallion …") + add "; both elbows rest on the lower gold rim and her forearms and hands come out in front of it" + replace "The medallion stays round and centred, a bit smaller, with a third of her leaning out over its lower rim." with "The medallion stays round and centred, exactly the same size as in the reference, with a third of her leaning out over its lower rim." (stops the medallion shrinking = stops the zoom). Clips: try-1 OUT; LOOP with the try-2 lock "she never pulls back into the medallion: her chest, elbows and forearms stay out over the rim in every frame, same size, no zoom". Expect ≈ 28–35 %.
STILL TO DO: the 8 M2342 seals (bình đau-lòng hổ-thẹn choáng hờn hăng-hái chuyên-tâm hưng-khởi), never generated. Their M2370-A11..A18 files currently carry the TRY-2 (overshoot) wording → switch to the MIDDLE wording before any gen (hưng khởi: keep its own pull-in wording file, already middle-like). Then seal_gate + keep_check (allow lines for the changed phrases).
Recipe/post as THACT1 brief; my working copies: procx.sh with W=/tmp/claude-0/t2/run/wx (scratch, lost on restart; originals in THACT1_tools). Measure: leanout_measure.py circle()/stats() on webp2 OUT+LOOP; ALSO check the B pose (OUT last frames / LOOP mean), not only the peak — a passing mid-OUT frame can fake the peak. ẩn: mist puffs inflate the peak; prompt keeps mist small inside the medallion.
Every 5 seals: MP4 + measure + CDN URL → send_message ROOT-C3, never the owner.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS (owner 20/11): never create one.

## Vietnamese (cho chủ, qua ROOT-C3)
- Đã viết lệnh vẽ cho cả 18 ấn (M2370-A01..A18); 8 ấn giữ lại đã có hành động rõ hơn. Đã vẽ 10 ấn: buồn đạt (27 %).
- Lần 1 nghiêng ra còn ít (20–27 %); lần làm lại thì quá tay (42–79 %): bà nghiêng ra rất rõ nhưng to lên khoảng 1,3 lần. Cần quản đốc chọn: giữ bản lần 2, hay làm thêm một lần với câu chữ ở giữa (≈ 18 000 credit). 8 ấn còn lại chưa vẽ.
- Tốn 35 060 credit.
