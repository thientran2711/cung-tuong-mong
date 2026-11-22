# SEALPF1 — Thái hậu feeling-seal tone-down SAMPLE as paste-ready ChatGPT prompts (worker of Foreman C ROOT-B8 session_01D3E3NadxEFd7mXzQAPmzNG)
depth 8 · START_CTX ≈ 3 % of 1M (get_session read 0 → own estimate) · roll line ≈ 28 %, ceiling 60 % · 22/11

Order: owner L2291 "ấn biểu cảm … làm tiếp đi" + L2293 keep the OLD in-game seal style exactly. Method A53: NO Magnific — 0 credits used.
Basis: SEAL7 audit + owner ruling ~02:05Z 20/11 (feeling seals = face + light posture; HĐ act-* seals stay, never redo).

## Files (dev/handover/prompts_L2095/) — keyframe A still only, no B, no clips
| code | file | change vs base (A17 diff) |
|---|---|---|
| M2294-01 | M2294-01_th_gian_A_still_TONEDOWN.txt | ADDED after the face line: "Light posture only: shoulders drawn up stiffly, both hands resting tense at the bottom of the medallion just inside the gold rim, one small steam puff by her crown; mouth closed, no raised fist, no shouting, no big gesture." Nothing cut. |
| M2294-02 | M2294-02_th_hanghai_A_still_TONEDOWN.txt | CUT "one small fist raised by her cheek"; ADDED "Light posture only: shoulders lifted eagerly, chin up, both hands resting at the bottom of the medallion just inside the gold rim; no raised fist, no fist pumping, no big gesture." |
| M2294-03 | M2294-03_th_chuyentam_A_still_TONEDOWN.txt | ADDED "Light posture only: her chin resting lightly on one hand inside the gold rim, the other hand still; no book, no scroll, no props, no big gesture." Face line unchanged. |
Every file ends with the CAPTION line (code top-left, outside the medallion). MA_HINH.json updated (3 codes).

Bases (new, = the store A wording, so keep_check has a file to compare): dev/art/emo-anim/groups/still_base/th-{gian,hanghai,chuyentam}-A.txt
- hanghai / chuyentam = `th_prompts.py` A output (incl. seal_ear "Bare earlobes, no earrings.", disc bright coral / warm cream-beige).
- gian = th-gian.md §1 A text + seal_ear (F15: "small pearl earrings" removed, bare-earlobes sentence) + "Qing-style inner palace" → "imperial inner palace"
  (same as the builder WHO line, F14). These two are store fixes already in the builder, not new changes.
Style words, disc/medallion recipe, WHO, green bg, "no text" = verbatim.

## Gates
- keep_check --sidecar: 3 × PASS (hanghai: 1 allowed drop, the fist, with owner ruling note).
- seal_gate.py --kind A on each prompt body: 3 × PASS (0 FAIL).

## ATTACH (owner attaches in ChatGPT; local img/ is gitignored — CDN)
ONE image for all three (= the builder's A reference, th-gian A; the full keyframe lives only in Magnific eIPl4i6dqL, so the in-game still):
https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/still/th-gian.webp
Do NOT attach still/th-hanghai.webp (old disc is green #8DC423; prompt says bright coral — owner's A/B disc choice still open, SEAL9).
Optional for M2294-03 only: still/th-chuyentam.webp (same disc, same face) if her picture drifts.

## Notes for the foreman (honest)
- The OLD A stills of giận and chuyên tâm are already face-only (looked at still/th-gian, th-hanghai, th-chuyentam); the acting-out lived in B + clips.
  So this sample mainly matters for hăng hái (fist in the still) and for a future "still only / light B" replacement of the burst — owner's call.
- "Hands resting at the bottom just inside the rim" may make GPT show more body than the old bust-only stills; if she dislikes it, drop the posture clause (face only).

## NEXT batch (list only — NOT started)
1. khóc seal (new) · 2. th dau2 (heartache, not crying) · 3. hh dau (Hoàng hậu has no đau yet) · 4. 11 disc digital recolour (SEAL9 list, disc_recolour.py, 0 cr).
5. If she likes the sample: same tone-down for the other ACTS-OUT feelings (khó chịu, vui, tinh nghịch, ghen, ẩn, hổ thẹn, lo, mưu, hưng khởi) and the other groups.

## Vietnamese (cho chủ)
- Đã viết 3 prompt ấn Thái hậu (giận, hăng hái, chuyên tâm) bản dịu: chỉ mặt + dáng nhẹ, giữ y phong cách cũ — mã M2294-01, 02, 03.
- Dán vào ChatGPT, đính kèm 1 hình: ấn Thái hậu giận cũ (still/th-gian.webp).
- Chưa vẽ gì, 0 credit; chị duyệt mẫu rồi mới làm tiếp (khóc, đau lòng, Hoàng hậu đau, đổi màu 11 đĩa).

## HANDOVER
Done; nothing pending in this worker. Commit hash in the message to Foreman C.

## (2) GENERATED — owner L2296 via ROOT-B8 ~01:45Z: "bạn tự làm bên mặt đi" (A53 exception) — 22/11 ~01:05Z, 3 × 135 = 405 cr
Balance before 3 015 079 (stop line 60 000). Recipe exactly as SEAL5/SEAL7 A stills: gpt-2-6, 1:1, 2k, ref eIPl4i6dqL (th-gian A), folder as before;
prompt = line 1 of each M2294 file (the CAPTION line is for ChatGPT only, not sent). One try each (A20). Ledger: 3 lines in gen_ledger.jsonl.
| code | gen id | CDN (img/_review/emo-anim-groups/tonedown/) |
|---|---|---|
| M2294-01 giận | Syv7O0AUb8 | th-gian-A-M2294.png · th-gian-M2294-still160.webp |
| M2294-02 hăng hái | Syv7OTGUb8 | th-hanghai-A-M2294.png · th-hanghai-M2294-still160.webp |
| M2294-03 chuyên tâm | iGKZAtS3uK | th-chuyentam-A-M2294.png · th-chuyentam-M2294-still160.webp |
OLD|NEW sheet (VN captions + codes): https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/th-tonedown-old-new.jpg — looked at.
All 3 came back RGBA transparent (no green) — fine for stills; flatten on #00FF00 before any B/clip.
### Looked at — notes only (no redraw)
- giận: good — same angry face, fist gone, hands resting on the rim, small steam puff top-left. Style/crown/robe match the old one.
- hăng hái: fist gone, eager smile, coral disc, hands on rim. Eyes glance a little sideways (both the same way) — old looked straight.
- chuyên tâm: chin on hand OK, no book; BUT side-glance + one brow up reads more sceptical/scheming (close to mưu) than calm focus. Mild.
- All 3 NEW: earrings gone (F15, correct); she is drawn a bit lower/wider, hands visible at the bottom of the rim (more body than the old bust-only stills).
