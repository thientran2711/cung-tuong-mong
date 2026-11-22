# THACT1 — Thái hậu ACT (HĐ) seals: tone-down stills + animation (worker of Foreman C ROOT-C2 session_01D3E3NbRKVda1eN4trg7rnx; started under ROOT-C1 session_01D3E3NX4Gc3XCtkhsnipEAS)
depth 1 · START_CTX ≈ 3 % of 1M (get_session read 0 → own estimate) · roll line 28 %, ceiling 60 % · finished well below the line (no handover needed) · 22/11
Order: owner L2341 (21 tone-down emotion anims OK) + L2342 "Ok làm đi" → (1) missing th-act ẩn, bình, đau lòng, mưu + act-ghen REDRAW, (2) the old 17 th-act seals remade in the tone-down look.
Count: brief said 22; distinct seals = **21** (act-ghen is in both lists). All 21 done, one try each, no redo needed.

## Method (reused, nothing new except noted)
- Keyframe A: SEALPF1 tone-down method on the th_prompts.py act A text (base files still_base/th-act-<k>-A.txt): face line toned down + one "Light posture only: …" clause; cut phrases listed as allow lines in .keep. keep_check 17/17 PASS (ẩn/bình/đau/mưu have no base: new prompts in the same template), seal_gate --kind A 21/21 PASS.
  Ref = each seal's OWN old th-act A (ledger SEAL6 ids); the 4 new ones use their tone-down emotion A (M2301: ẩn YMg0mtAWeC, bình rgBLNNDxtc, đau p8PXQFwehw, mưu mE2arOnhJQ). gpt-2-6 1:1 2k.
- B burst: THANIM1 b.py wording (lean slightly out, small calm gesture, no big arms, no extra hands) + per-seal act clause. "Bare earlobes, no earrings." moved to its own sentence (seal_gate S13 needs it once). seal_gate B 21/21 PASS.
- Clips: Seedance 2.0 Fast 4 s 1:1 720p no sound, keyframes only. OUT A→B, LOOP B→B (+ "the medallion keeps exactly its same size and colour", "exactly two hands", "comes out of the round frame only a little"). seal_gate out/loop 42/42 PASS.
- BACK = OUT reversed + per-frame disc lock to A (THANIM2 rebuild_back.py, owner L2337/L2338). **No BACK gens.** Change: scale clamped to 1.00–1.10 (THANIM2's stated range) — ẩn's mist puffs past the rim fooled the disc measure (raw 0.79 → figure shrank). File THACT1_tools/rebuild_back_clamp.py.
- RGBA results (bình A, tinh nghịch A, hưng khởi A, ghen/giận/vui/khó chịu/hăng hái B) flattened on #00FF00 and re-uploaded before use (THANIM1 practice).
- Disc colours = disc_colours.json (act-* entries; new 4 = emotion an/binh/dau/muu; act-ghen = deep jade-teal, old one amber was wrong).

## The 4 NEW act ideas (no act wording existed anywhere in the store — owner may want to change)
ẩn: tucks a small folded letter into her sleeve, sly wink, grey mist · bình: sips from a small celadon teacup, eyes closed · đau lòng: presses an old jade pendant to her chest, one tear, mouth closed · mưu: black go stone at her chin, sly side-glance.

## Output (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/)
th-act-tonedown-batch{1..5}-anim.mp4 (H.264 yuv420p 15 fps faststart, 1600 px wide; batch 5 = hưng khởi alone 400 px) + .webp; per seal th-act-<k>-{out,loop,back}.webp, th-act-<k>-{A,B}-M2342.png.
Batch 1 ẩn bình đau-lòng mưu ghen (M2342-01..05) · 2 giận buồn vui sợ lo (06..10) · 3 hổ-thẹn chán choáng hờn khó-chịu (11..15) · 4 tự-tin tình-tứ tinh-nghịch hăng-hái chuyên-tâm (16..20) · 5 hưng khởi (21).

## Ids (A / ref / B / OUT / LOOP) — also in gen_ledger.jsonl (84 lines, who THACT1)
| seal | code | A | ref | B | OUT | LOOP |
|---|---|---|---|---|---|---|
| an | M2342-01 | gOhwxsHSXO | YMg0mtAWeC | Bh6IpLkoQR | VXJpWz2MMU | IfRhXeHtvE |
| binh | M2342-02 | 8a3meoOIrU→dt9oMbOXSL | rgBLNNDxtc | VXJpWKqMMU | s7tSrkVl8e | lJmUx1Fgv9 |
| dau | M2342-03 | DoydcDtpcl | p8PXQFwehw | 3zk29vYREY | mE2a8v3hJQ | Bh6Ie8poQR |
| muu | M2342-04 | p8PX0pyehw | mE2arOnhJQ | Syv7LMTUb8 | s7tSxS4l8e | mE2a8aRhJQ |
| ghen | M2342-05 | xSosKLPjfW | fHzirnMCDY | Syv7LDVUb8→KLerHoSkqp | VXJpcpTMMU | 5jp1Hr4Kxe |
| gian | M2342-06 | w4fOgZm7EI | JNCIAucOq4 | gOhwl7eSXO→jU8lxAhLD0 | Syv7g8eUb8 | 5jp1b0tKxe |
| buon | M2342-07 | VXJpcvIMMU | fHzikWdCDY | WDSTYV3cXe | jU8lxdgLD0 | yiQ9OfWPW9 |
| vui | M2342-08 | gOhwL3fSXO | aFG6lozfSh | w4fOUPD7EI→CqYQf7aEEy | xSosremjfW | xSosrd3jfW |
| so | M2342-09 | VXJpcatMMU | JNCIWJhOq4 | Bh6IXmeoQR | VXJpTUjMMU | xSosrdhjfW |
| lo | M2342-10 | jU8l1NfLD0 | SyhXGg9Ub8 | xSosrSEjfW | KLer5MKkqp | tCZvI3LmZJ |
| hothen | M2342-11 | jU8lxfwLD0 | YMlkm0oWeC | xSosxJ6jfW | yiQ9yKdPW9 | 0ewM04STfW |
| chan | M2342-12 | nVlczO9YQD | O6Et2H6ynm | 3zk23cSREY | rgBLrh1xtc | rgBLrv3xtc |
| choang | M2342-13 | mE2at0jhJQ | 8aiOQ2UIrU | lJmUl96gv9 | fHnufMACDY | dt9od2pXSL |
| hon | M2342-14 | ksdxKhq16B | jUoMisdLD0 | 1lXj17Cr4r | s7tSsuRl8e | Syv7SHfUb8 |
| khochiu | M2342-15 | lJmUsFtgv9 | nVsKt0vYQD | LwIgL4GswO→3zk23uWREY | dt9odAeXSL | 4RH64jB9Aa |
| tutin | M2342-16 | MBOeMMuDCm | Lw8DZ5NswO | yiQN4bDPW9 | 1lXLjZkr4r | YMgT0uvWeC |
| tinhtu | M2342-17 | 4RH644Q9Aa | gOmdGkHSXO | 8a3htGuIrU | rgBsLAextc | s7tUSYbl8e |
| tinhnghich | M2342-18 | P3F699M42C→6A5Z3EmiJO | O6Et0sRynm | SyvJwufUb8 | Bh6tILFoQR | ovimtsA829 |
| hanghai | M2342-19 | VXJeDDnMMU | N2qfc5r6D9 | mE2fvWkhJQ→jU8gl7eLD0 | 1lXLjGxr4r | 0ewDMbvTfW |
| chuyentam | M2342-20 | p8PBdX7ehw | N2qfcqk6D9 | 8a3htnFIrU | JNE4Pe5Oq4 | gOh7wV4SXO |
| hungkhoi | M2342-21 | w4fyJyT7EI→u5cqF22QLD | 4RFvT6S9Aa | LwISlCKswO | DoyXdrjpcl | s7tUS0kl8e |
(x→y = gen x came back RGBA, y = flattened upload used.)

## Looked at (every still sheet, every burst sheet, every animation strip) — notes, no heavy fault, no redo
- All 21: same Thái hậu (crown, robe, silver hair), no earrings, two hands, gestures small, disc colour + size steady through OUT/LOOP/BACK, faces never vanish, BACK ends on A.
- ẩn: mist puffs drift outside the rim in the LOOP (soft). bình: the cup briefly covers her mouth while sipping. hờn: head tilts back far in the LOOP (cold 'hmph').
- hưng khởi: the ink swirl grows bigger than "one small swirl" and curls past the rim (cosmetic) — RECOMMENDED-REDO candidate only if the owner dislikes it (LOOP 940 cr).
- Medallion size inside the 1:1 frame differs a bit between seals (follows each old ref); each seal is locked to its own A.

## Cost
42 × 135 (A+B) + 42 × 940 (OUT+LOOP) = **45 150 cr** (≈ 2 150 per seal; BACK costs 0). Balance after ≈ 2 893 316 (stop line 60 000 never near).

## Game wiring
th-act seals are NOT referenced in js/html/json (only disc_colours.json data) → nothing wired, nothing to wire.

## Files
Prompts dev/handover/prompts_L2095/M2342-01..21_th_act-<k>_A_still_TONEDOWN.txt (+ .keep for 17); MA_HINH.json: added M2342-01..21 AND repaired the file (it was broken JSON: a missing comma + a duplicated tail from an earlier merge; rebuilt lossless from every "code": "file" line, first value kept).
Bases still_base/th-act-<k>-A.txt (17). Tools + all B/OUT/LOOP prompt texts: dev/handover/reports/THACT1_tools/ (scripts use /tmp/claude-0/thact paths).

## Vietnamese (cho chủ)
- Đã làm xong 21 ấn hành động (HĐ) của Thái hậu bản dịu + hoạt hình: 4 ấn mới (ẩn, bình, đau lòng, mưu), ghen vẽ lại (đĩa xanh ngọc đậm), 16 ấn cũ làm lại dịu. Mã M2342-01 … 21.
- 5 video MP4 trên CDN (thư mục tonedown/act). Không có lỗi nặng, không phải làm lại. Hưng khởi: vệt mực hơi to, tràn ra ngoài khung (nhẹ).
- Tốn 45 150 credit.

## Coordinator change
ROOT-C1 → ROOT-C2 (session_01D3E3NbRKVda1eN4trg7rnx). Its messages reached me only after the work was done, so batches 3–5 + final went to ROOT-C1 first; all resent to ROOT-C2. Still sheets (A row over B row): …/tonedown/act/th-act-tonedown-batch{1,2,3,45}-stills-AB.jpg.
