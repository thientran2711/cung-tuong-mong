START_CTX ≈ 6 % of 1M (get_session used_tokens reads 0 → own estimate) · depth 3 · roll line ≈ 31 %, ceiling 60 % · running cr 22 300 (final) · ended ≈ 25 % (own estimate)
# THACT4: Thái hậu act seals — ghen/chán OUT redo + 8 kept seals A11–A18 (MID2). Worker of ROOT-C3 → now ROOT-C4 (session_01D3E3NWqpW2ooEEFJyANw9a)

## Prompt changes (all seal_gate PASS + keep_check --sidecar PASS)
- `*_clips_MID2_out_SMOOTH.txt` (ghen, chán + all 8 A11–A18) = MID2 OUT + one sentence after "no zoom.": "She leans out smoothly and steadily in one slow continuous movement: no lunge toward the viewer, her head and body never grow bigger, and the medallion never grows." (ROOT-C3 decision 1 wording; also put on the 8 new OUTs to stop the same lunge). Nothing cut.
- hổ thẹn B `_MID3.txt`: "swooning over the lower gold rim" → "swooning, she slumps far forward over the lower gold rim … with that elbow and forearm lying out over the rim in front of it" (MID3 for slump seals).
- hờn B `_MID3.txt` (re-roll after 19 %): "she slumps far forward over the lower gold rim, both forearms folded … lying out over the rim in front of it". Did not raise the number (19 / 17).
- hưng khởi B `_MID2.txt`: its own pull-in wording gave 9 % → MID2 lean block ("far OUT … well over a third"), kept "the ink swirl stays small and close" → 27.6 %.
- LOOP prompts unchanged (`_clips_MID2_loop.txt`).

## B stills (rim fit bm3, medallion r/rA)
bình 32 (1.00) · đau lòng 26.5 (1.00) · hổ thẹn 23 (1.02) · choáng 32 (1.00) · hờn 19 (1.01, best of 3) · hăng hái 23 (1.01) · chuyên tâm 30 (1.01) · hưng khởi 9 → 27.6 (1.00). Medallion same size in every B.

## Clips (official THACT1 peak / loop mean · rim-fit peak / loop · LOOK at dense OUT+LOOP frames)
| seal | official | rim | look | verdict |
|---|---|---|---|---|
| ghen (OUT redo) | 36.0 / 30.7 | 27 / 22 | smooth lean, no lunge | PASS (fault fixed) |
| chán (OUT redo) | 39.0 / 16.9 | 29 / 21 | frames ~21–24 she stands up as a full-body figure, crown above the disc; hoop flies out of the picture | FAIL again |
| bình | 34.4 / 31.5 | 47 / 29 | clean, sips, steady ≈ 30–34 % | PASS |
| đau lòng | 31.3 / 30.2 | 57 / 28 | short swell frames 21–25 (head/crown bigger), then steady ≈ 29 % | PASS with a small swell |
| hổ thẹn | 55.9 / 32.6 (min 2.7) | 29 / 16 | OUT jumps and grows (disc bigger, shifted up); LOOP falls back fully inside a small disc twice (L5–10, L49–54) | FAIL |
| choáng | 48.0 / 47.8 | 32 / 32 | pop at frame ~15 (disc shifts up), then rock-steady; official 48 = disc misfit after the shift | PASS on body (rim 32) |
| hờn | 33.4 / 24.1 | 21 / 19 | short pop frame ~15, then steady arms-folded sulk | PASS (low side, 19–24) |
| hăng hái | 26.0 / 22.6 | 37 / 25 | short pop frame ~15, then steady writing | PASS |
| chuyên tâm | 43.4 / 40.6 | 64 / 33 | grows ≈1.3× mid-OUT and stays big (book close to viewer) | BORDERLINE (over 40 official) |
| hưng khởi | 46.2 / 36.3 | 41 / 34 | pop frame ~25; the ink swirl grows and drifts well outside the rim (OUT end + LOOP) | BORDERLINE (swirl) |
Pattern: most new OUTs have a 1–3 frame "pop" where Seedance jumps from A to B (frame 15–25); only bình and ghen are fully smooth.

## Output (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/)
- th-act-lean-mid-batch2-anim.mp4 (ghen+chán new OUT, 8 new seals; OUT + LOOP×2 + BACK) sha 897818193620
- th-act-lean-mid-batch2-stills-AB.jpg (8 seals, A top / B bottom) sha 0420fd2753d1
- th-act-<k>-{out,loop,back}-M2370m.webp + th-act-<k>-B-M2370m.png (k = binh dau hothen choang hon hanghai chuyentam hungkhoi)
- th-act-{ghen,chan}-{out,back}-M2370s.webp (redo OUT; THACT3's -M2370m files untouched; LOOP = THACT3 -M2370m loop)
BACK = reversed OUT + stock disc lock (rebuild_back_clamp), 0 cr.

## Cost: 2 OUT redo × 940 + 12 B × 135 + 16 clips × 940 = 18 540 cr (gen_ledger: 30 lines "THACT4"). Balance before 2 803 806.
Ids: dev/handover/reports/THACT4_tools/log.txt (B, flat keyframes, clips).

## Round 1 open points (answered by ROOT-C4 07:20Z: chán 1 more OUT no toss, hổ thẹn OUT+LOOP, chuyên tâm OUT once, hưng khởi ACCEPT; cap 3 760)
1. chán: 2nd OUT also faulty. Options: (a) keep THACT3 OUT (medallion swell) ; (b) one more OUT with the toss taken out ("she sets the hoop down behind her inside the medallion, no throwing") — 940.
2. hổ thẹn: redo OUT + LOOP (1 880), maybe new B (current B fine, 23 %).
3. chuyên tâm (big) and hưng khởi (swirl out): accept, or OUT/LOOP redo with "the book stays at the same distance" / "the ink swirl stays inside the medallion".
4. Full-set MP4 of all 21 act seals: after the above decisions.

## Round 3 (ROOT-C4, 4 × 940 = 3 760 cr) — keep the best, no further tries
Prompts: chán `_out_SEATED` (toss → "staying seated, slowly lifts the hoop back over her shoulder with her fingertips (no throwing …)" + "She stays seated the whole time and never stands up."); hổ thẹn `_out_SEATED` (+ "never grows or moves. She stays seated and slumped over the rim …") and `_loop_LOCK` (+ "she never shrinks back inside the medallion and the medallion never moves, shrinks or grows"); chuyên tâm `_out_SAMEDIST` (+ "The book stays at the same distance …"). All seal_gate + keep_check PASS.
- chán 1lXLakur4r: stays seated, hoop stays in the picture, leans out to one side mid-OUT; rim 25 / 21 → KEPT (best of 3).
- hổ thẹn nVl0PntYQD + rgBsfrfxtc: steady, no drop-back; rim 30.5 / 26.9 (loop min 20) → KEPT (official 55 = disc shifted up, misfit).
- chuyên tâm 5jprhk2Kxe: still grows to the B size mid-OUT — cause = the B keyframe itself is big (figure ≈1.3× A); rim 34.5 / 32.5 → KEPT (smoother than round 1). A real fix needs a smaller B (135) + OUT/LOOP.

## FULL SET (21 seals, owner judges side by side)
- th-act-lean-full21-anim.mp4 (3 rows × 7, OUT + LOOP×2 + BACK, 16 s) sha 86634c352b9a
- th-act-lean-full21-stills.jpg (LOOP mid-frame of each) sha 86becedcfc3c
Rim-fit peak / loop: vui 37/30 · lo 37/31 · ẩn 29/19 · mưu 34/33 · ghen 27/22 · buồn 26/23 · sợ 35/28 · chán 25/21 · khó chịu 29/26 · tình tứ 24/22 · bình 47/29 · đau lòng 57/28 · hổ thẹn 31/27 · choáng 32/32 · hờn 21/19 · hăng hái 37/25 · chuyên tâm 35/33 · hưng khởi 41/34 · giận 25/15 · tự tin 71/67 (scroll + sparkles, misfit) · tinh nghịch 25/15. (peaks > 40 = short pops / effects, see verdicts.)
Outliers by eye: ẩn sits small mid-loop (reads the letter inside); giận and tinh nghịch (kept M2349, not redone) loop ≈ 15 %, lower than the rest; chuyên tâm and hưng khởi on the big side; hờn on the low side.
Files: hổ thẹn / chuyên tâm -M2370m now = round 3; chán -M2370s = round 3 (loop = THACT3 -M2370m).

## Vietnamese (cho chủ, qua ROOT-C4)
- ghen làm lại đoạn OUT: đã mượt, không còn chồm ra. chán làm lại vẫn lỗi (giữa đoạn bà đứng bật lên, cái khung thêu bay ra ngoài).
- 8 ấn mới (bình, đau lòng, hổ thẹn, choáng, hờn, hăng hái, chuyên tâm, hưng khởi): bình, đau lòng, choáng, hờn, hăng hái đạt; hổ thẹn lỗi (lúc ra lúc thụt vào); chuyên tâm hơi to; hưng khởi vệt mực bay ra ngoài khung.
- Lần 3: chán giờ ngồi yên, khung thêu không bay; hổ thẹn hết thụt vào; chuyên tâm vẫn to (do hình gốc B to).
- Đã có video cả 21 ấn chạy cùng lúc + 1 tấm ảnh tĩnh để chủ so.
- Tổng tốn 22 300 credit.
