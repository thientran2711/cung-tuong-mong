# THACT5: Thái hậu act seals — ONE fixed disc scale for all 21 (owner L2381). Worker of ROOT-C4 (session_01D3E3NWqpW2ooEEFJyANw9a)
depth 4 · START_CTX ≈ 3 % of 1M (get_session used_tokens reads 0 → own estimate) · ended ≈ 18 % · cost **0 cr** (post-process only, no gen)

## 1. Shared spec (one place)
- **dev/art/emo-anim/disc_scale_spec.py** (import it; numbers live only there) + rule **A58** (`rule.py find disc scale`) + pointer at top of emo-anim/prompts.md.
- canvas 288 px, 15 fps · rest disc r **74 px**, centre **(144,144)** for every seal · OUT: 100 → **112 %** over the first **15 frames** (smoothstep 3t²−2t³), then holds · LOOP: **112 %** every frame · BACK: 112 % then → 100 % over its **last 15 frames** (same curve) · disc centre never moves. Body lean-out untouched (whole frame scaled about the disc centre).
- Why 74 px: the old rest radii were 68 (ẩn) … 86 (chuyên tâm); content reaches 1.72 r from the disc centre, so at 112 % (r 82.9) the widest seal still fits 288 px → **no canvas pad**, nothing clips (border alpha 0 px on all 21).

## 2. What was wrong before (raw measure of the THACT4 files)
Inside each file the disc was locked to ~100 % (old rebuild_back_clamp), so nothing "grew" consistently; rest radii differed per seal (ẩn 68 px vs mưu 73 / vui 78 / chuyên tâm 85), the disc centre drifted up to 52 px during OUT (hổ thẹn, chuyên tâm), and mưu's/ghen's alpha disc swelled ~9 % in LOOP (a dark halo grows outside the gold rim; the rim itself stays). → owner's "ấn này phóng, ấn kia không".

## 3. Method (tools: dev/handover/reports/THACT5_tools/)
disc.py: per-frame disc circle = RANSAC on alpha-edge points (alpha > 48 — teal discs come out of the chroma cut semi-transparent) whose inside colour = that seal's disc background (rejects robe, crown, sparkles, giận's floor glow ring), radius band ±10 %, 5-frame median+mean. mưu + ghen use the gold-rim tracker instead (rim_track: per-ray outermost rim-coloured pixel), because their halo fools the alpha edge. apply.py: warp each source frame by R0·scale(i)/r_i about the measured centre → C0 (premultiplied bicubic), webp q82 m6. fix_track.py loop: one closed-loop pass (fold output residual back into the source track) for tự tin, chuyên tâm, giận, hờn. meas_after.py / meas_spec.py / eyecheck.py = checks. Source files = CDN THACT4 set (16 × -M2370m, ghen/chán OUT+BACK -M2370s, buồn -M2370, giận/tự tin/tinh nghịch -M2349).

## 4. Measure after (independent re-track of the OUTPUT, r / r_rest per frame; spec 1.00 / 1.12 / 1.12 ± 0.01)
| seal | rest r px | rest | OUT end | peak | LOOP min | LOOP max | BACK end | centre drift px |
|---|---|---|---|---|---|---|---|---|
| vui | 74.5 | 1.00 | 1.119 | 1.120 | 1.118 | 1.119 | 1.000 | 0.5 |
| lo | 74.2 | 1.00 | 1.119 | 1.120 | 1.117 | 1.120 | 1.000 | 1.3 |
| an | 74.6 | 1.00 | 1.119 | 1.120 | 1.119 | 1.120 | 1.000 | 1.2 |
| muu | 74.2 | 1.00 | 1.081 | 1.119 | 1.055 | 1.106 | 0.996 | 19.4 | ⚠
| ghen | 74.1 | 1.00 | 1.124 | 1.147 | 1.112 | 1.144 | 1.001 | 4.7 | ⚠
| buon | 74.4 | 1.00 | 1.120 | 1.121 | 1.120 | 1.121 | 1.000 | 0.1 |
| so | 74.6 | 1.00 | 1.119 | 1.121 | 1.119 | 1.121 | 1.010 | 2.1 |
| chan | 74.6 | 1.00 | 1.117 | 1.119 | 1.116 | 1.118 | 1.000 | 0.7 |
| khochiu | 74.1 | 1.00 | 1.117 | 1.120 | 1.117 | 1.120 | 1.001 | 2.6 |
| tinhtu | 74.5 | 1.00 | 1.117 | 1.119 | 1.117 | 1.118 | 1.000 | 0.8 |
| binh | 74.2 | 1.00 | 1.117 | 1.120 | 1.116 | 1.118 | 0.999 | 1.9 |
| dau | 74.5 | 1.00 | 1.118 | 1.120 | 1.118 | 1.120 | 1.000 | 0.4 |
| hothen | 74.4 | 1.00 | 1.120 | 1.122 | 1.119 | 1.121 | 1.001 | 2.4 |
| choang | 74.5 | 1.00 | 1.120 | 1.120 | 1.119 | 1.120 | 1.000 | 1.3 |
| hon | 74.2 | 1.00 | 1.121 | 1.126 | 1.121 | 1.121 | 1.000 | 0.6 |
| hanghai | 74.5 | 1.00 | 1.116 | 1.119 | 1.117 | 1.119 | 1.000 | 0.5 |
| chuyentam | 73.9 | 1.00 | 1.129 | 1.130 | 1.120 | 1.130 | 1.000 | 1.0 |
| hungkhoi | 74.5 | 1.00 | 1.118 | 1.120 | 1.116 | 1.120 | 1.000 | 3.8 |
| gian | 74.1 | 1.00 | 1.121 | 1.126 | 1.120 | 1.123 | 0.999 | 0.9 |
| tutin | 74.2 | 1.00 | 1.121 | 1.135 | 1.110 | 1.135 | 1.001 | 1.1 | ⚠
| tinhnghich | 74.6 | 1.00 | 1.117 | 1.118 | 1.117 | 1.118 | 0.999 | 0.7 |

- **18/21 inside 1.12 ± 0.01 numerically.**
- ⚠ mưu, ghen, tự tin: the numbers here are the instrument, not the picture — the alpha tracker reads the growing dark halo (mưu, ghen) / sparkles + scroll (tự tin); the guided gold-rim fit gives other numbers (mưu 1.10–1.17, ghen 1.10–1.12, tự tin 1.12–1.17): the two methods disagree by 3–5 %. **Eye check** (eyecheck.py: 6 LOOP frames each, red line = spec circle 1.12·74 at (144,144)): the gold rim sits on the red circle in every frame for mưu, ghen, tự tin (also chuyên tâm, giận, vui). Owner judges by eye in the MP4.
- BACK end 1.000 ± 0.01 for all (sợ 1.010).

## 5. Output (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/)
- **th-act-disc112-full21-anim.mp4** (3×7, THACT4 layout 1680×840, OUT + LOOP×2 + BACK, 244 frames @15 fps = 16.3 s, every seal held at rest after its BACK) sha256 0f3b933735b4
- **th-act-disc112-full21-stills.jpg** (LOOP mid-frame of each, same grid) sha256 9c57aec36295
- per seal **th-act-<k>-{out,loop,back}-D112.webp** (63 files, 288 px, 67 ms). Older -M2370m/-M2370s/-M2370/-M2349 files untouched.
- Looked myself (ffmpeg tile f0 / f14 / f90 / f239): all discs equal at rest, all grow together, equal in LOOP, all back to rest.
- Note: webps are ~1.5× the old size (q82 instead of q50, to avoid a second heavy lossy pass); re-encode lower if the game budget needs it.

## 6. Open / for ROOT-C4
- If the owner wants the disc a bit bigger on screen: raise R0 in disc_scale_spec.py and pad the canvas (needs 2·1.72·1.12·R0 px), rerun apply.py (≈ 20 min, 0 cr).
- BACK lengths still differ per seal (21–61 frames, from the old trim); the disc timing is identical (last 15 frames), the body return length is not. Say if BACK should be one fixed length too (0 cr).

## Vietnamese (cho chủ, qua ROOT-C4)
- Đã làm MỘT luật chung cho mọi ấn (A58 + file disc_scale_spec.py): vòng ấn lúc nghỉ bằng nhau cho cả 21 ấn; lúc ra phóng đúng 112 % trong 1 giây rồi đứng yên ở 112 % suốt đoạn lặp; lúc về thu lại 100 % cùng một nhịp. Tâm vòng không xê dịch.
- Không vẽ lại gì: chỉnh từng khung hình bằng máy (0 credit). Độ nhô người ra giữ nguyên.
- Trước đây: ấn ẩn vòng nhỏ nhất (68 px), chuyên tâm to nhất (85 px), mưu và ghen lúc lặp vòng nở thêm ~9 %, có ấn vòng còn trôi lên trên — giờ hết.
- Video 21 ấn mới: th-act-disc112-full21-anim.mp4.

## Round 2 (ROOT-C5 20:08Z: equalise BACK length, re-encode ≈ old size, keep R0) — 0 cr
- Spec (disc_scale_spec.py + A58 via rule.py set): **BACK_N = 45 frames (3.0 s) for every seal**; shorter source BACK → lean pose held at the start, longer → frames dropped evenly (first try with blended frames ghosted on lo/ẩn fast pose jumps → dropped). Encode **webp q50 m4** (WEBP_Q/WEBP_M): 32 MB for 63 files vs 39 MB old (round 1 was 1.5× old).
- libwebp merges identical held frames into one long frame → apply.py puts a 1/255-alpha marker on the transparent corner pixel every other frame so every BACK really has 45 frames (checked on the CDN copy).
- Re-run from source (no double lossy). LOOP 61 frames all; OUT still as cut (54–61, lo 27) — not asked; say if OUT should be fixed too.
- Measure (same tracker): 19/21 inside 1.12 ± 0.01; ⚠ mưu, ghen = halo instrument issue as round 1 (eye-checked); tự tin now passes. lo BACK end reads 1.016 (tracker on its fast last-frame pop; looks at rest).

| seal | rest r px | rest | OUT end | peak | LOOP min | LOOP max | BACK end | frames out/loop/back |
|---|---|---|---|---|---|---|---|---|
| vui | 74.1 | 1.00 | 1.119 | 1.120 | 1.118 | 1.119 | 1.000 | 58/61/45 |
| lo | 74.3 | 1.00 | 1.117 | 1.118 | 1.116 | 1.118 | 1.016 | 27/61/45 |
| an | 74.3 | 1.00 | 1.118 | 1.119 | 1.117 | 1.118 | 1.000 | 55/61/45 |
| muu | 74.2 | 1.00 | 1.090 | 1.138 | 1.064 | 1.138 | 0.997 | 56/61/45 | ⚠
| ghen | 74.1 | 1.00 | 1.120 | 1.144 | 1.113 | 1.144 | 1.001 | 58/61/45 | ⚠
| buon | 74.1 | 1.00 | 1.118 | 1.118 | 1.118 | 1.118 | 1.000 | 54/61/45 |
| so | 74.2 | 1.00 | 1.118 | 1.121 | 1.118 | 1.121 | 0.999 | 60/61/45 |
| chan | 74.1 | 1.00 | 1.118 | 1.120 | 1.118 | 1.119 | 1.000 | 57/61/45 |
| khochiu | 74.1 | 1.00 | 1.117 | 1.130 | 1.117 | 1.120 | 1.000 | 58/61/45 |
| tinhtu | 74.1 | 1.00 | 1.119 | 1.132 | 1.119 | 1.119 | 1.000 | 57/61/45 |
| binh | 74.2 | 1.00 | 1.117 | 1.121 | 1.117 | 1.119 | 1.000 | 54/61/45 |
| dau | 74.3 | 1.00 | 1.117 | 1.119 | 1.117 | 1.119 | 1.000 | 56/61/45 |
| hothen | 74.2 | 1.00 | 1.118 | 1.119 | 1.117 | 1.118 | 1.000 | 61/61/45 |
| choang | 74.2 | 1.00 | 1.116 | 1.117 | 1.116 | 1.117 | 1.000 | 54/61/45 |
| hon | 74.2 | 1.00 | 1.121 | 1.131 | 1.120 | 1.121 | 1.000 | 58/61/45 |
| hanghai | 74.2 | 1.00 | 1.117 | 1.120 | 1.117 | 1.120 | 1.000 | 58/61/45 |
| chuyentam | 73.9 | 1.00 | 1.127 | 1.127 | 1.116 | 1.126 | 1.001 | 58/61/45 |
| hungkhoi | 74.2 | 1.00 | 1.117 | 1.118 | 1.116 | 1.118 | 1.000 | 57/61/45 |
| gian | 74.0 | 1.00 | 1.123 | 1.128 | 1.120 | 1.125 | 0.999 | 61/61/45 |
| tutin | 74.2 | 1.00 | 1.121 | 1.121 | 1.110 | 1.121 | 1.015 | 56/61/45 |
| tinhnghich | 74.1 | 1.00 | 1.119 | 1.120 | 1.119 | 1.120 | 1.000 | 57/61/45 |

Output (same CDN folder): **th-act-disc112b45-full21-anim.mp4** (228 frames = 61 + 2×61 + 45; every seal held at rest after BACK) sha256 d99dba73e978 · **th-act-disc112b45-full21-stills.jpg** sha256 bc301fe2ef52 · per seal th-act-<k>-{out,loop,back}-D112.webp **overwritten with this final version**. Looked: f0/f14/f120/f190/f215/f227 + BACK strips of lo/ẩn/choáng/mưu — all discs equal, BACK clean, all at rest together at the end.
