START_CTX ≈ 3 % of 1M (get_session used_tokens reads 0 → own estimate) · depth 3 · roll line ≈ 28 %, ceiling 60 % · running cr 19 215
# THACT3: Thái hậu act seals, MIDDLE lean (ROOT-C3 option b, owner L2370/L2362/L2363). Worker of ROOT-C3 (session_01D3E3NaHk4WXbAeqcG1iXWK)

## What changed vs THACT2's MIDDLE wording (prompt work, all gated)
- B pilot (lo + ẩn) with the MIDDLE wording as briefed (try-1 text + "both elbows rest on the lower gold rim …" + "exactly the same size as in the reference"): medallion kept its size, but the lean stayed at try-1 level (still ≈ 15–16 %). Not enough.
- Root cause of the try-2 overshoot = "a bit smaller, smaller than her body" (GPT shrank the medallion), NOT the lean words. So **MID2** = try-2 lean words + medallion "exactly the same size as in the reference, with well over a third of her leaning out over its lower rim" → still B 22–31 %, medallion same size (rim fit r/rA 0.99–1.02).
- chán only: **MID3** = MID2 + "she slumps far forward over the lower gold rim, the other hand propping her bored cheek with that elbow and forearm lying out over the rim" (her cheek-prop pose kept her inside: 14–19 % on 4 samples).
- Clips (MID2): OUT = try-1 OUT text; LOOP = try-1 LOOP + try-2 lock ("she never pulls back into the medallion: her chest, elbows and forearms stay out over the rim in every frame, same size, no zoom"), "(…elbows and forearms outside, about a third of her)".
- Files: prompts_L2095/M2370-ANN_th_act-<k>_B_burst_MID2.txt (+ .keep), chán _MID3.txt (+ .keep), _clips_MID2.txt (+ _out/_loop .txt). Also _B_burst_MID.txt (pilot wording, not used further). A11–A17 clip files converted from try-2 to try-1 + lock wording (MID2). seal_gate: B 17+2+1, out 17, loop 17 all PASS; keep_check --sidecar all PASS (every allowed drop = a lean/medallion-size phrase, "# owner L2363/L2370 + ROOT-C3 option (b)").

## Measure tool fix
- leanout circle() (equator band) misplaces the disc on B stills where sleeves spread wide (centre shifted up to 0.5 r). New: Hough rim fit (scratch hough.py / bm3.py / vh.py, numpy only). Still B values below use it.
- Video: official = THACT1 leanout (A-disc of OUT frame 0, all OUT+LOOP frames). "rim" = per-frame Hough rim (what the eye sees; the stock disc lock drifts the centre).

## Results, 9 redo seals (B still % · official peak / loop · rim peak / loop · look)
| seal | B still | official peak / loop | rim peak / loop | verdict |
|---|---|---|---|---|
| vui | 29 | 39.0 / 30.1 | 37 / 30 | PASS |
| lo | 28 | 48.3 / 34.6 | 37 / 31 | PASS on body (30–38 every frame); the 48 peak = worry swirls drawn outside the rim |
| ẩn | 24 | 33.9 / 20.2 | 29 / 19 | PASS on numbers; loop dips to 11 % while she pulls the letter in to read it |
| mưu | 31 | 43.5 / 42.9 | 34 / 33 | official just over 40 (steady 42–44); rim fit 33. Borderline |
| ghen | 25 | 55.8 / 30.4 | 36 / 22 | FAULT: mid-OUT lunge (~0.8 s): she pushes toward the viewer, head bigger, fan dips below the rim, then settles. B pose + loop fine |
| sợ | 31 | 40.3 / 33.7 | 35 / 28 | PASS |
| chán | 22 (MID3) | 64.0 / 22.2 | 36 / 21 | FAULT: messy OUT (wails, flails the hoop, the medallion visibly swells mid-OUT). B pose + loop fine (21–26) |
| khó chịu | 25 | 41.5 / 31.1 | 29 / 26 | PASS (face goes quite red in the loop: "cheeks flushed") |
| tình tứ | 25 | 42.8 / 28.3 | 24 / 22 | PASS (43 = one lock-jitter frame in the loop) |
Looked at every B full size + every clip strip: same Thái hậu, two hands, no earrings, crown intact, medallion same size in B. Figure scale in B ≈ try-1 level (≈1.1× A), not try-2's 1.3×.
Faults NOT redone (would be a 4th try): ghen OUT, chán OUT. A fix = OUT-only regen (940 each) with "no lunge toward the viewer, smooth lean". Waiting for ROOT-C3.

## Output (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/tonedown/act/)
- th-act-lean-mid-batch1-anim.mp4 (9 seals, OUT + LOOP×2 + BACK) sha 4e886f16525a
- th-act-lean-mid-batch1-stills-AB.jpg (A top / B bottom) sha ffbc6053ca70
- per seal th-act-<k>-{out,loop,back}-M2370m.webp (k = vui lo an muu ghen so chan khochiu tinhtu). THACT2's -M2370 files untouched.
BACK = reversed OUT + stock disc lock (rebuild_back_clamp 1.00–1.10), no BACK gens.

## Cost: 17 B × 135 + 18 clips × 940 = 19 215 cr (gen_ledger: 35 lines "THACT3"). Balance before ≈ 2 823 966.

## Ids (A / B used → flat / OUT / LOOP)
vui iGK2WNd3uK / aFzuRkrfSh→N2bRQqU6D9 / s7tUB1bl8e / 1lXLDblr4r · lo dt98aeoXSL / rgBsVoAxtc→gOh7BtbSXO / 0ewDL2tTfW / jU8gpqtLD0 · ẩn WDSVB0ScXe / 8a3hPQaIrU→6A5Zuq6iJO / huAC6XgvqL / LwISe5CswO · mưu bxD1gXY5Y2 / mE2f65qhJQ→Td7pg7FVNR / O6u9aUoynm / jU8gdkFLD0 · ghen Td7pIPRVNR / 1lXLMPGr4r→0ewDlwYTfW / tCZa68EmZJ / eI4oJDJdqL · sợ 4RHizV19Aa / 3zkAHpoREY→XmNIy6QBfo / lJmw87dgv9 / WDSVsDvcXe · chán bxD1gPL5Y2 / EbWHzs4uuO→O6u9f8Oynm / O6u9ffiynm / iGK2qqC3uK · khó chịu jU8gyvsLD0 / nVl0ro7YQD→1lXLDXtr4r / cpUMsnC0eP / ovim4dG829 · tình tứ huACqhevqL / rgBsD9Kxtc→iGK2HkH3uK / xSoldSBjfW / yiQNC3GPW9
Unused B samples: lo DoyXga3pcl · ẩn yiQNhnpPW9 N2bRC5y6D9 vQGEi55a47 · chán gOh7o3OSXO KLexVYNkqp s7tUBD0l8e 0ewDghjTfW.

## Next (not started): 8 kept-M2342 seals A11–A18 (bình đau-lòng hổ-thẹn choáng hờn hăng-hái chuyên-tâm hưng-khởi)
B prompts ready: A11–A17 _B_burst_MID2.txt, A18 hưng khởi _B_burst_MID.txt (its own pull-in wording + same-size medallion); clips _clips_MID2_{out,loop}.txt (A18: MID2 = its LEAN clips + lock). A refs = their M2342 tone-down A (see THACT1.md table). Cost guard: B first, rim-fit measure (bm3.py), aim still 22–30 %, then OUT + LOOP.

## Vietnamese (cho chủ, qua ROOT-C3)
- Câu chữ "ở giữa" lúc đầu giữ được khung tròn đúng cỡ nhưng bà vẫn nghiêng ra quá ít. Nguyên nhân lần 2 bị phóng to là câu "khung nhỏ hơn", không phải câu "nghiêng ra". Đã sửa: giữ câu nghiêng mạnh + khung "đúng cỡ như hình gốc" → ra 22–31 %, khung không đổi cỡ.
- 9 ấn làm lại đã xong: vui, lo, ẩn, mưu, sợ, khó chịu, tình tứ đạt mức; ghen và chán có một nhịp chồm ra quá đà giữa đoạn OUT (chưa làm lại, chờ quản đốc).
- Tốn 19 215 credit.

## HANDOVER (THACT3 → successor; ROOT-C3 opens it) — 22/11 ~07:05Z, rolled at ≈ 25 % (own estimate; roll line 28 %)
Brief for the successor = this file + THACT2.md HANDOVER (recipe, tools). Scope left:
1. ghen + chán OUT faults (mid-OUT lunge / medallion swell) — only if ROOT-C3 says redo (OUT-only regen 940 each, same B; add "she leans out smoothly and steadily, no lunge toward the viewer, the medallion never grows").
2. 8 kept-M2342 seals A11–A18: B first with _B_burst_MID2.txt (A18: _B_burst_MID.txt), measure with THACT3_tools/bm3.py (rim fit), want 22–30 % still and medallion r/rA ≈ 1.00; re-roll B only (count 2) when low; then OUT + LOOP with _clips_MID2_{out,loop}.txt (seal_gate PASS already). A refs = M2342 tone-down A ids (THACT1.md table / gen_ledger). Video ≈ still + 2–4 % on body; effects (swirls/mist) and lock jitter spike the official peak; also check OUT frames for lunges (look at OUT frames 8–30, not only the numbers).
3. Every 5 seals: MP4 (sheet2.py) + measure table + CDN URL → send_message ROOT-C3. CDN suffix -M2370m.
Tools: dev/handover/reports/THACT3_tools (paths point to THACT3 scratch; copy + fix S). Flatten RGBA B on #00FF00, 1024 px, upload (request_upload + PUT + finalize) before using as a keyframe.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS (owner 20/11): never create one.
