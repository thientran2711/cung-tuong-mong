START_CTX ≈ 3 % of 1M (own estimate; used_tokens not read) · depth 1 · roll line 28 %, ceiling 60 %
# C3-SEALS — step 1: groups × emotions table (0 cr spent so far)
PRIORITY #1 CHECK: OD 8 | main 15 | review/* 2 | live today = ONLY Thái hậu (21 `emo-th-act-*` + 63 anim files on CDN, index checked 25/11 22:17Z). Old SEAL3 bg/bt/mm review sets (10 moods, pre tone-down, pre disc-scale) are NOT live and NOT in the approved look → not reused.

## Measured unit cost (from the approved Thái hậu run, THACT1 «Cost» + balance 2 573 959 cr now)
A still 135 + B burst 135 + OUT 940 + LOOP 940 + BACK 0 (reversed OUT, disc lock) = **2 150 cr per seal**; redo-free. One set of 21 emotions = **45 150 cr**.
Emotions per set = the 21 act keys of Thái hậu: vui, lo, giận, tình tứ, ẩn, mưu, ghen, buồn, sợ, chán, khó chịu, tự tin, tinh nghịch, bình, đau lòng, hổ thẹn, choáng, hờn, hăng hái, chuyên tâm, hưng khởi.

## Groups (every existing role stays separate; ONLY merges per OD 24/11 ~08:05Z/~08:40Z)
| # | set | covers (personRoleRank) | have | missing | cr |
|---|---|---|---|---|---|
| 0 | Thái hậu | thaihau | 21/21 LIVE | 0 | 0 |
| 1 | HH + HQP | consort rank 7 (queen) | 0 | 21 | 45 150 |
| 2 | Phi tần ≤ Quý phi | consort ranks 0–6, cold (Lãnh cung) | 0 | 21 | 45 150 |
| 3 | Cung nữ già + Ma ma già | maid/mama old | 0 | 21 | 45 150 |
| 4 | Cung nữ trẻ + Ma ma trẻ | maid/mama young | 0 | 21 | 45 150 |
| 5 | Hoàng thượng | emp | 0 | 21 | 45 150 |
| 6 | Thái tử | heir | 0 | 21 | 45 150 |
| 7 | Hoàng tử (lớn) | prince, adult | 0 | 21 | 45 150 |
| 8 | Công chúa (lớn) | princess, adult | 0 | 21 | 45 150 |
| 9 | Bé trai | kid boy | 0 | 21 | 45 150 |
| 10 | Bé gái | kid girl | 0 | 21 | 45 150 |
| 11 | Thái giám | eunuch | 0 | 21 | 45 150 |
| 12 | Thị vệ | guard | 0 | 21 | 45 150 |
| 13 | Quan | official | 0 | 21 | 45 150 |
| 14 | Thái y | physician | 0 | 21 | 45 150 |
| 15 | Nam nhân | man | 0 | 21 | 45 150 |
| 16 | Vương gia | royal | 0 | 21 | 45 150 |
**16 new sets × 21 = 336 seals × 2 150 = 722 400 cr** (balance 2 573 959 → ≈1 851 559; stop line 60 000 far). Redo reserve +10 % ≈ 72 000.

## Questions for Foreman C (not for the owner) — my default if no answer
- Sets 6/7/8/16 (Thái tử, Hoàng tử lớn, Công chúa lớn, Vương gia) are thin groups: default = keep SEPARATE (owner: «mọi nhóm giữ như cũ»). Merging Thái tử+Hoàng tử+Vương gia would save 90 300 cr.
- Pilot first (EXPRESS: pilot then batch): ONE seal (set 5 Hoàng thượng, giận) = 2 150 cr, measured against the table, shown to Foreman C, then batch per group.
- Spend > 3 000 cr waits for Foreman C's OK (confirmed with MAIN). No generation done yet.

## PILOT — Hoàng thượng giận (25/11 ~22:25Z) · 2 150 cr measured (135+135+940+940), 1 try, no redo
Ref = live emo-m-gian (young man) upscaled 640 → Magnific upload CqW6AJdEEy. gpt-2-6 1:1 2k.
A = TdJrglOVNR (135 cr) · B = nVgbjVGYQD (135) · OUT A→B = DoPL73ypcl (940) · LOOP B→B = JNuoaKwOq4 (940) · Seedance 2.0 Fast 4 s 1:1 720p no sound. BACK = reversed OUT (0 cr, not yet cut).
Prompt = Thái hậu giận recipe (THACT1_tools B_gian/out_gian/loop_gian), only the group text swapped (young emperor, topknot + small gold crown piece, royal-yellow dragon robe, one hand on the cracked teacup; "exactly two hands", disc same size/colour).
LOOKED at A, B and 8-frame sheets of OUT and LOOP: same face and disc throughout, exactly two hands, cup stays in hand, disc stays round/red, flat green, no shards; B leans out modestly. Not yet done: chroma cut, disc-scale spec (THACT5 apply.py), BACK.
CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-seals/ : emp-gian-A.png, emp-gian-B.png, emp-gian-out-sheet.png, emp-gian-loop-sheet.png, emp-gian-out.mp4, emp-gian-loop.mp4

## Pilot seal finished (0 cr): cut + THACT5 disc scale + BACK
cut.sh out/loop; BACK = ffmpeg-reversed OUT cut with cut.sh back; meas_raw.py + apply.py (spec 1.00/1.12/1.12, BACK end 1.00). meas_after: rest 1.001, peak 1.121, loop 1.120, back_end 1.001, max dev from spec 0.003, centre drift 0.2 px, border alpha 0. Looked at the 5-frame sheet: clean edge, two hands, same disc.
CDN review: https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-seals/final/ : emp-act-gian.webp (LOOP) · -out · -back · emo-emp-act-gian.webp (160 px still) · emp-act-gian-sheet.png. Naming for live: img/kit/emo-anim/emp-act-gian{,-out,-back}.webp + img/kit/emo-emp-act-gian.webp (same as th-act-*).
Note: Emperor's raw disc r 95.7 px (spec rest 74) → apply.py rescales; same tools for every group.

## Wiring (0 cr) — branch review/c3-seals (from origin/main 5e013076)
dev/build/jemoseal.js: roleSet now thaihau th-, emp emp-, heir tt-, eunuch tg-, guard tv-, official qu-, physician ty-, man nn-, royal vg-, consort pt-, cold pt-, maid cy-, mama cl-, prince ht-, princess cc-; setExtra {queen hh- (consort rank 7), kidM bt-, kidF bg-}; KES_SETRE includes every prefix. dev/build/jemo.js emoArtSet picks queen/kid splits before roleSet. Strict by CDN index: a prefix is used per key only when img/kit/emo-<prefix><key>.webp is on the CDN, so NOTHING changes in the game until sets are uploaded. Built (build_site.sh ok), smoke in Chromium 755x1000: no page errors, roles 15, regex ok.
Assumption: old = role «mama», young = role «maid» (personRoleRank already makes an old maid a mama) → "old cung nữ + old ma ma" = cl-, "young cung nữ + young ma ma" = cy-.
NOT yet: Fold/iPad shots (need live sets), small review. Spend still frozen for the batch.
