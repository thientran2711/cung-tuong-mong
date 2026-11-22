# THACT1 — Thái hậu ACT (HĐ) seals: tone-down stills + animation (worker of Foreman C ROOT-C3 session_01D3E3NaHk4WXbAeqcG1iXWK; started under ROOT-C1, then ROOT-C2)
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

## (2) L2349 / A29 — act seals must show a CLEAR action (prompt work only, 0 cr, NOT generated — waits for owner yes via ROOT-C2)
Owner L2349: vui money pouch odd; lo dark eye bags = sleepy; giận too restrained; 'act seals are over-restrained'. Re-checked all 21 (stills + MP4s).
Kept: same Thái hậu, tone-down LOOK, two hands, no earrings, no big arms (B), arms inside the picture, BACK = reversed OUT. Changed: action clause ('Light posture only' → 'Clear readable action'), B 'small calm gesture only' → 'a clear readable action'.
Files prompts_L2095/M2349-NN_th_act-<k>_{A_still,B_burst,clips}_ACTION.txt; .keep for A (base = M2342 A) and B (base = THACT1_tools/prompts/B_<k>.txt): 24/24 PASS (every allowed drop = a restrained-action phrase). seal_gate A 12, B 12, out 12, loop 12: all PASS.
| code | seal | new action (VN) |
|---|---|---|
| M2349-01 | vui | vỗ tay cười lớn vui sướng (bỏ thỏi vàng + túi tiền) |
| M2349-02 | lo | bồn chồn lần chuỗi tràng hạt, cắn môi, mắt ngước lo âu, giọt mồ hôi (bỏ quầng thâm/tóc rối = buồn ngủ) |
| M2349-03 | giận | đập tay xuống vành ấn, tay kia chỉ thẳng quát, mặt đỏ, dấu giận + khói (bỏ chén trà, mặt kìm nén) |
| M2349-04 | ẩn | ngón tay 'suỵt' + giấu lá thư sau tay áo, nháy mắt, sương + dấu hỏi (rõ hơn bản nhét thư) |
| M2349-05 | mưu | đặt quân cờ vây đen lên bàn cờ nhỏ trên vành ấn, gõ cằm, cười mưu mô |
| M2349-06 | ghen | quạt che miệng + ngón tay chỉ chế giễu sang bên, cười khẩy (thêm lại ngón chỉ) |
| M2349-07 | buồn | khóc, chấm nước mắt bằng khăn tay trắng, mây mưa nhỏ (rõ hơn bản 1 giọt lệ) |
| M2349-08 | sợ | trốn sau chăn hoa tím kéo tới mũi, run, mắt mở to (rõ hơn bản kéo tới cằm) |
| M2349-09 | chán | quăng khung thêu qua vai, chống má chán nản, đảo mắt (rõ hơn bản cầm hờ) |
| M2349-10 | khó chịu | chỉ tay sang bên quát người hầu, miệng mở cằn nhằn (rõ hơn bản chỉ nhẹ ngậm miệng) |
| M2349-11 | tự tin | giơ cuộn tranh hoa mai mở ra khoe, hếch cằm nháy mắt (rõ hơn bản cầm cuộn thấp) |
| M2349-12 | tinh nghịch | thả lủng lẳng con rắn giấy ra ngoài vành để trêu, che miệng cười khúc khích (rõ hơn bản cầm im) |
KEEP as is (action already readable): bình (nhấp trà), đau lòng (ngọc bội áp ngực, 1 giọt lệ — L798 heartache ≠ crying), hổ thẹn (giả ốm, khăn trán), choáng (đờ đẫn, mây xám), hờn (quay mặt, giơ tay 'không'), tình tứ (thiệp mời + vẫy gọi), hăng hái (viết thư pháp), chuyên tâm (đọc sách), hưng khởi (bút lông + vệt mực).
Cost if all 12: 12 × (2×135 + 2×940) = 25 800 cr (2 150 each; BACK 0).
| M2349-13 | tình tứ | đưa bông mẫu đơn hồng mời, tay kia chạm má e thẹn, nháy mắt (bỏ thiệp đỏ giống bao lì xì — owner L2350) |
Add-on L2350: tình tứ moved from KEEP to REDO → 13 seals, 27 950 cr if all.

## (3) L2355 GO — 13 clear-action act seals GENERATED (M2349-01..13), one try each
Recipe as (1): A ref = the seal's own M2342 tone-down A; B ref = new A; OUT/LOOP Seedance; BACK = reversed OUT + disc lock (clamp 1.00–1.10). Work dir separate; new CDN files carry -M2349 (old M2342 files untouched).
Heavy fault auto-redo (L2324): chán OUT zoomed her to ~2x, disc vanished, hoop flew off the picture → OUT redone once with a same-size lock (prompt in M2349-09 clips file as OUT_REDO) → fixed. +940 cr.
CDN …/tonedown/act/: th-act-action-batch1-anim.mp4 (vui lo giận tình-tứ ẩn) · batch2 (mưu ghen buồn sợ chán) · batch3 (khó-chịu tự-tin tinh-nghịch) + th-act-action-batchN-stills-AB.jpg; per seal th-act-<k>-{out,loop,back}-M2349.webp, th-act-<k>-{A,B}-M2349.png.
| seal | code | A | ref | B | OUT | LOOP | note |
|---|---|---|---|---|---|---|---|
| vui | M2349-01 | iGK2WNd3uK | gOhwL3fSXO | rgBsJrlxtc | rgBsOrsxtc | aFzukaJfSh |  |
| lo | M2349-02 | dt98aeoXSL | jU8l1NfLD0 | huACbhpvqL | 0ewDI0OTfW | ovimFIQ829 |  |
| gian | M2349-03 | JNE4RJGOq4 | w4fOgZm7EI | 3zkATZCREY | xSolPLMjfW | bxD1UKh5Y2 |  |
| an | M2349-04 | WDSVB0ScXe | gOhwxsHSXO | ksdj7jr16B→LwIS4faswO | LwIS9S3swO | EbWHjHYuuO | B flattened |
| muu | M2349-05 | WDSVBmRcXe→bxD1gXY5Y2 | p8PX0pyehw | YMgTBT6WeC | VXJehaWMMU | IfRvqK1tvE | A flattened |
| ghen | M2349-06 | 8a3hQK4IrU→Td7pIPRVNR | xSosKLPjfW | N2bRWZk6D9 | CqYFxsWEEy | 6A5Z0MNiJO | A flattened |
| buon | M2349-07 | huACbjFvqL | VXJpcvIMMU | LwIS4w2swO | dt98EHqXSL | 4RHiYT59Aa |  |
| so | M2349-08 | 4RHizV19Aa | VXJpcatMMU | IfRvHbktvE | 6A5Z0D6iJO | eI4oCHFdqL |  |
| chan | M2349-09 | bxD1gPL5Y2 | nVlczO9YQD | 6A5ZcT9iJO | 79CP2YIJAL→REDO 4RHicuP9Aa | SyvJ3zOUb8 | OUT heavy fault (zoom ~2x, disc gone, hoop off picture) → redone once (L2324) |
| khochiu | M2349-10 | rgBsJitxtc→jU8gyvsLD0 | lJmUsFtgv9 | 3zkATDxREY | bxD1URU5Y2 | KLex72Dkqp | A flattened |
| tutin | M2349-11 | w4fy3WX7EI | MBOeMMuDCm | ksdj7Pi16B→ovimQGp829 | 1lXLOG5r4r | lJmw6TZgv9 | B flattened |
| tinhnghich | M2349-12 | VXJetFeMMU | 6A5Z3EmiJO | xSoly6PjfW | jU8g4WhLD0 | tCZabwomZJ |  |
| tinhtu | M2349-13 | huACqhevqL | 4RH644Q9Aa | vQGEKC7a47→6A5ZcjaiJO | w4fyZO37EI | N2bRc3b6D9 | B flattened |
Looked at (stills, bursts, all frame strips): every action reads clearly; same Thái hậu, two hands, no earrings, disc colour + size steady after the chán fix. Small: giận slam makes a white burst spark at the rim; sợ has small shiver lines outside the rim; ẩn medallion drawn a bit smaller.
Cost: 26×135 + 27×940 = 28 890 cr. Final 21 act set = these 13 (M2349) + 8 kept from M2342 (bình đau-lòng hổ-thẹn choáng hờn hăng-hái chuyên-tâm hưng-khởi).

## (4) L2362 — lean-out / frame-interaction measure (0 cr, analysis only)
Owner L2362: the 5 act seals played together do not match — some lean far out of the frame, some barely touch it (giận most, ẩn gentle); wants ONE consistent level, not necessarily a full jump out; refers to the earlier/rejected act videos.
Method (THACT1_tools/leanout_measure.py): per seal, disc circle from OUT frame 0 (= A): centre x + radius from the equator band, centre y = widest row. Every OUT + LOOP frame (288 px cuts; current sets are disc-locked to A): **area** = figure pixels outside the rim (r×1.03) as % of the disc area; **reach** = 98th-percentile distance past the rim, % of disc diameter (98th pct so steam/sparkle specks don't count). Peak = max over OUT+LOOP; loop = mean over the LOOP. 'Rim touched' = yes for all (hands/forearms always over the rim from B on).
Contact sheet (peak frame per seal, same disc scale 160 px, blue ring = measured disc): https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/th-act-leanout-measure-sheet.jpg
| set | seal | peak area % | peak reach % | loop area % |
|---|---|---|---|---|
| M2349 (current) | tự tin | 40.4 | 27.3 | 33.3 |
| M2349 (current) | giận | 39.4 | 32.7 | 19.4 |
| M2349 (current) | tinh nghịch | 28.9 | 32.1 | 18.0 |
| M2349 (current) | chán | 21.8 | 37.7 | 5.0 |
| M2349 (current) | lo | 19.2 | 14.9 | 18.4 |
| M2349 (current) | buồn | 18.9 | 16.0 | 18.3 |
| M2349 (current) | vui | 14.6 | 8.7 | 13.5 |
| M2349 (current) | khó chịu | 13.7 | 9.7 | 12.9 |
| M2349 (current) | tình tứ | 12.1 | 11.0 | 8.4 |
| M2349 (current) | sợ | 11.8 | 7.4 | 3.8 |
| M2349 (current) | ghen | 11.1 | 7.5 | 10.7 |
| M2349 (current) | ẩn | 10.2 | 8.3 | 6.2 |
| M2349 (current) | mưu | 9.9 | 6.1 | 9.3 |
| M2342 kept (current) | hưng khởi | 47.5 | 26.5 | 20.8 |
| M2342 kept (current) | hờn | 16.0 | 10.1 | 10.6 |
| M2342 kept (current) | hăng hái | 12.4 | 9.2 | 11.7 |
| M2342 kept (current) | bình | 10.6 | 10.2 | 8.1 |
| M2342 kept (current) | đau lòng | 9.9 | 10.1 | 9.8 |
| M2342 kept (current) | hổ thẹn | 9.9 | 10.2 | 9.6 |
| M2342 kept (current) | choáng | 9.9 | 8.1 | 9.8 |
| M2342 kept (current) | chuyên tâm | 8.3 | 8.3 | 7.6 |
| OLD strong set (SEAL6-8) | hưng khởi | 87.3 | 42.0 | 38.8 |
| OLD strong set (SEAL6-8) | tự tin | 69.1 | 30.4 | 47.6 |
| OLD strong set (SEAL6-8) | hờn | 66.9 | 37.7 | 57.0 |
| OLD strong set (SEAL6-8) | hăng hái | 51.4 | 29.3 | 23.5 |
| OLD strong set (SEAL6-8) | tinh nghịch | 42.9 | 40.4 | 23.2 |
| OLD strong set (SEAL6-8) | ghen | 40.3 | 18.2 | 28.4 |
| OLD strong set (SEAL6-8) | giận | 37.0 | 39.2 | 22.4 |
| OLD strong set (SEAL6-8) | khó chịu | 35.4 | 21.8 | 26.2 |
| OLD strong set (SEAL6-8) | choáng | 33.6 | 31.9 | 32.0 |
| OLD strong set (SEAL6-8) | vui | 33.2 | 17.9 | 30.8 |
| OLD strong set (SEAL6-8) | hổ thẹn | 30.4 | 38.8 | 23.9 |
| OLD strong set (SEAL6-8) | chán | 28.1 | 40.3 | 19.1 |
| OLD strong set (SEAL6-8) | chuyên tâm | 26.9 | 20.0 | 25.9 |
| OLD strong set (SEAL6-8) | buồn | 24.4 | 21.7 | 21.5 |
| OLD strong set (SEAL6-8) | tình tứ | 23.0 | 16.0 | 20.4 |
| OLD strong set (SEAL6-8) | lo | 22.5 | 20.6 | 14.3 |
| OLD strong set (SEAL6-8) | sợ | 19.7 | 12.2 | 9.5 |
Reading: current 21 range 8–48 % (spread ×6): too far = hưng khởi 47.5, tự tin 40, giận 39, tinh nghịch 29; barely out (≈8–12) = chuyên tâm, mưu, choáng, hổ thẹn, đau lòng, ẩn, bình, ghen, sợ (loop 4), tình tứ, hăng hái. OLD strong set: 20–87 %, median ≈ 33 %. Old sets B frames decide the lean (clips interpolate A→B), so a level change needs a new B + OUT + LOOP (BACK = reversed OUT, 0 cr).
PROPOSAL (one level, 'clear action, interacts with the rim, moderate lean-out, no full jump out'): peak area 15–25 % of the disc, reach ≤ 25 % of the diameter, loop 12–20 %; head + shoulders + forearms over the lower rim, props stay inside the picture. Prompt wording to lock it in B + clips: 'she leans out so her head, shoulders and forearms come over the lower gold rim (about a quarter of her body outside the medallion), not further; she does not jump out of the frame'.
Redo to match (B + OUT + LOOP = 2 015 cr each): pull IN (4): tự tin, giận, tinh nghịch, hưng khởi · push OUT (11): mưu, ẩn, ghen, sợ, tình tứ, chuyên tâm, choáng, hổ thẹn, đau lòng, bình, hăng hái · in band, keep (6): lo, buồn, vui, khó chịu, hờn, chán (chán LOOP only 5 % — optional LOOP redo 940). → 15 × 2 015 = 30 225 cr (+940 optional chán LOOP).
OPEN (ambiguous wording): the owner's text could also mean 'all like ẩn' (ẩn is only 10 % = the second-lowest). If she wants the ẩn level (≤ 12 %), redo instead the 10 above 12 %: hưng khởi, tự tin, giận, tinh nghịch, chán, lo, buồn, hờn, vui, khó chịu → 20 150 cr. Ask her to pick: band 15–25 % (≈ old-video feel, toned) or ẩn level.
### (4b) Revised after OWNER L2363 (on L2360 act batches 2–3): "Nó vẫn quá là nhạt nhòa, vẫn chưa có đủ với tôi." → stronger, one level for all 21. Replaces the 15–25 % proposal and the "ẩn level" option.
TARGET: peak 25–40 % of the disc area outside the rim (≈ old strong set median 33 %), loop ≥ 18 %, reach ≤ 40 % of the diameter; head, shoulders, chest and both forearms out over the lower rim (about a third of her outside), hands acting on/over the rim, props inside the picture, never leaving the medallion completely (no full jump, no zoom).
B + clip wording to add: "she leans boldly OUT of the round medallion: her head, shoulders, chest and both forearms come out over the lower gold rim, about a third of her body outside the medallion, her hands acting on or over the rim; she never leaves the medallion completely, same size, no zoom".
KEEP (already in band): giận 39/19 · tự tin 40/33 · tinh nghịch 29/18.
REDO 18 (B + OUT + LOOP, 2 015 cr each = 36 270 cr): pull in hưng khởi (47.5) · push out chán (22, loop 5), lo 19, buồn 19, hờn 16, vui 15, khó chịu 14, tình tứ 12, hăng hái 12, sợ 12, ghen 11, bình 11, ẩn 10, mưu 10, đau lòng 10, hổ thẹn 10, choáng 10, chuyên tâm 8. A stills stay (new B ref = own A). After gen: re-measure with leanout_measure.py, any seal outside 25–40 % = heavy fault → one redo (L2324).

## HANDOVER (THACT1 → successor, opened by ROOT-C3 session_01D3E3NaHk4WXbAeqcG1iXWK) — 22/11 ~06:02Z
depth 1 · START_CTX ≈ 3 % · now 605 k / 1 M = 60.5 % (over START+25 % and over the 60 % ceiling) → stopped BEFORE any L2370 gen. 0 cr spent on L2370.
ORDER (owner L2370 = GO, via ROOT-C3; owner: do not ask her again): plan §(4b). Target 25–40 % of the disc area outside the rim at the peak frame, loop mean ≥ 18 %, head/shoulders/chest/forearms over the lower rim (≈ a third of her out), hands acting on the rim, props in the picture, never fully out, same size, no zoom.
KEEP as is: giận M2349-03, tự tin M2349-11, tinh nghịch M2349-12.
REDO 18 = new B + OUT + LOOP (A stills stay; BACK = reversed OUT + disc lock, 0 cr); 2 015 cr each ≈ 36 270 cr:
- 10 current M2349 (B prompts = prompts_L2095/M2349-NN_th_act-<k>_B_burst_ACTION.txt, clips = *_clips_ACTION.txt): vui 01, lo 02, ẩn 04, mưu 05, ghen 06, buồn 07, sợ 08, chán 09 (use OUT_REDO wording style: same size lock), khó chịu 10, tình tứ 13.
- 8 kept M2342 (B prompts = reports/THACT1_tools/prompts/B_<k>.txt, clips = out_<k>.txt/loop_<k>.txt; they still carry 'small calm gesture only' → replace with the clear-action + lean wording, A29; ROOT-C3: worker decides a clearer action, same cost): bình, đau lòng, hổ thẹn, choáng, hờn, hăng hái, chuyên tâm, hưng khởi (hưng khởi = PULL IN from 47.5 %).
Wording to put in every B and OUT (replace "leans OUT … her head and shoulders come forward over the gold rim" / "small calm gesture only"): "she leans boldly OUT of the round medallion: her head, shoulders, chest and both forearms come out over the lower gold rim, about a third of her body outside the medallion, her hands acting on or over the rim; she never leaves the medallion completely, same size, no zoom". hưng khởi: "only head, shoulders and forearms over the rim, the ink swirl stays small and close".
Gates: keep_check --sidecar (.keep base = the file you edit; allow lines for changed phrases, "# owner L2363/L2370 + A29"), seal_gate --kind B/out/loop PASS before each gen. New codes M2370-01.. (MA_HINH.json).
A ids (ref for B; B ref = own A): vui iGK2WNd3uK · lo dt98aeoXSL · ẩn WDSVB0ScXe · mưu bxD1gXY5Y2 · ghen Td7pIPRVNR · buồn huACbjFvqL · sợ 4RHizV19Aa · chán bxD1gPL5Y2 · khó chịu jU8gyvsLD0 · tình tứ huACqhevqL · bình dt9oMbOXSL · đau lòng DoydcDtpcl · hổ thẹn jU8lxfwLD0 · choáng mE2at0jhJQ · hờn ksdxKhq16B · hăng hái VXJeDDnMMU · chuyên tâm p8PBdX7ehw · hưng khởi u5cqF22QLD. (Disc colours: disc_colours.json act-*/emotion; ghen = deep jade-teal.)
Recipe: gpt-2-6 1:1 2k, folder ba4aecfe-efce-47e2-b53f-30d292091886; RGBA results → flatten on #00FF00, 1024 px, re-upload (creations_request_upload + PUT + finalize). Seedance bytedance-seedance-fast-2.0, 4 s, 1:1, 720p, withSoundEffects false, keyframes only.
Post: THACT1_tools/procx.sh (download mp4 list → cut.sh → rebuild_back_clamp.py → sheet2.py MP4 + strip) and upx.sh (CDN copy + cdn_sync + stills-AB sheet + sha) — they hard-code /tmp/claude-0/thact/{wx,w} paths and urls_<n>.txt; copy them into your scratch and fix paths. Measure: THACT1_tools/leanout_measure.py (edit SETS/lists) → any seal outside 25–40 % peak or loop < 18 % = heavy fault → one redo (L2324). CDN names: th-act-<k>-{out,loop,back}-M2370.webp, th-act-lean-batchN-anim.mp4, …-stills-AB.jpg.
Report: batches of 5 → ROOT-C3 with MP4 URL + sha + measure numbers; ledger lines in gen_ledger.jsonl; push.
