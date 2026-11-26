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

## SET 5 Hoàng thượng (emp-) — progress (26/11) · gen ids in reports/C3-SEALS/emp_state.json (Aflat/Bflat/OUT/LOOP creation ids)
Prompts = tools/swap.py emp <emo> (final Thái hậu act prompts M2349/M2342 with the person block swapped, 0 cr). Giận pilot (cup version) is OLDER than the live Thái hậu giận (M2349 slam+point) → redone in the action version for consistency (+2 150). Done so far: A+B for vui lo gian an so muu ghen buon (16 × 135) , OUT for the same 8 (8 × 940). Note: gpt-2-6 sometimes returns RGBA (glow) instead of green: flatten on #00FF00 (PIL alpha_composite), re-upload (creations_request_upload) and use that id as keyframe.

## HANDOVER (W1 C3-SEALS, 26/11 ~10:35Z) — near roll line, written for the successor (Foreman C opens it)
Spent so far: pilot 2 150 + set 5 emp: 16 stills (A+B ×8) 2 160 + 8 OUT + 8 LOOP clips queued/running = 15 040 → ≈ 19 350 cr. Balance was 2 573 959 before.
State of set 5 Hoàng thượng (emp-): creation ids for A/B (flat-green versions) and OUT/LOOP clips of vui lo gian an so muu ghen buon are in dev/handover/reports/C3-SEALS/emp_state.json (keys Aflat, Bflat, OUT, LOOP). Clips were still rendering; NEXT for these 8: `creations_wait` the 16 clip ids → download mp4 (url in the wait result) → ffmpeg 8-frame sheet → LOOK → HOWTO step 6 (cut.sh out/loop/back-from-reversed, meas_raw, apply, meas_after) → upload review copies to img/_review/c3-seals/emp/ and live names img/kit/emo-anim/emp-act-<k>{,-out,-back}.webp + img/kit/emo-emp-act-<k>.webp (160 px still).
REMAINING for set 5: 13 emotions (binh dau hothen choang hon hanghai chuyentam hungkhoi tinhtu tutin tinhnghich khochiu chan); giận pilot is in the OLD cup version (A TdJrglOVNR, B nVgbjVGYQD, OUT DoPL73ypcl, LOOP JNuoaKwOq4, files in CDN img/_review/c3-seals/final/) — the new action-version giận (ids in emp_state.json) replaces it. Prompts: `python3 tools/swap.py emp <k>` (print A/B/out/loop; ~900 chars each). Pipeline = A (ref TdJrglOVNR for identity) → B (ref own A) → OUT (A→B), LOOP (B→B), Seedance 2.0 Fast 4 s 1:1 720p no sound.
Gotchas: gpt-2-6 returns RGBA (glow, black in viewers) for ~half the pictures: flatten on #00FF00 with PIL alpha_composite, re-upload via creations_request_upload (PUT with curl) + creations_finalize_upload (visible:false), use the new id as keyframe. Ref uploads are rate-limited: request fresh upload URLs. Push races on the handover branch: loop `git pull --rebase` + push.
Then sets 1 (hh-), 2 (pt-), 3 (cl-), 4 (cy-): need person blocks in tools/swap.py G{} (add groups; women keep «Bare earlobes, no earrings.»; only the Emperor wears yellow; mm/bg/bt person blocks exist in dev/art/emo-anim/groups/grp_gian_prompts.py G{} as a starting point for cl-/cy-). Wiring branch review/c3-seals @ c0c35eb1 is done (merge tt- included); after art: Fold 755x1000 + iPad 1180x820 shots, SMALL review, LAND READY.

## W1b progress (26/11 ~10:52Z) — set 5 emp: 16/21 LIVE on CDN, 5 clips pending
Balance 2 506 001 cr at ~10:35Z (W1 spent ≈19 k, W1b ≈ 13×135 ×2 + 26×940 ≈ 28 k so far). LIVE (img/kit/emo-anim/emp-act-<k>{,-out,-back}.webp + img/kit/emo-emp-act-<k>.webp, review copies + sheets img/_review/c3-seals/emp/): vui lo gian an so muu ghen buon binh dau hothen choang hon hanghai chuyentam hungkhoi = 16. Looked at every A/B and 8-frame sheet of every OUT/LOOP: same face, two hands, no shards.
PENDING (clips queued/rendering, ids in emp_state.json OUT13/LOOP13): tinhtu tutin tinhnghich khochiu chan → collect, LOOK, then `finish.sh emp <k>…` + `publish.py emp <k>…` + cdn_sync (see below). Seedance account has a PARALLEL LIMIT (~15 videos at once, "slot frees in ~300 s"): queue ≤ 14 at a time.
Tools added to tools/: finish.sh (cut+reverse+disc scale for a prefix dir /home/user/wt/<P>/ holding <emo>-out.mp4 <emo>-loop.mp4), publish.py (stage live + review names + sheet into <checkout>/img, then `python3 dev/site/cdn_sync.py img/_review/c3-seals/<P> img/kit/emo-anim/<P>-act-*.webp img/kit/emo-<P>-act-*.webp`), swap.py now has groups hh pt cl cy (no yellow; women keep «Bare earlobes»).
GOTCHA disc measure: meas_raw/hough fails on some clips (ghen with the fan, binh sage disc low contrast) → `meas_after` shows dev 0.15–0.25 / drift 20 px and the disc visibly pulses. The raw Seedance disc is steady, so FIX = set cut/<key>.disc.npy columns 0..2 to the per-clip median (np.median) and rerun apply.py, then LOOK at an 8-frame sheet of the LOOP (done for emp-ghen, emp-binh).
Women sets: ref still for A = ref upload vQzzg4ja47 (live emo-gian young girl, 640 px on green); person blocks in swap.py G (hh crimson+phoenix crown, pt jade green+gold hairpins, cl coral/teal silver bun, cy pale blue-green maid). Not started (0 cr).

## SET 5 Hoàng thượng (emp-) DONE — 26/11 ~11:00Z (W1b)
21/21 LIVE on CDN: img/kit/emo-anim/emp-act-<k>{,-out,-back}.webp (63 files) + img/kit/emo-emp-act-<k>.webp (21 stills). Review copies + 5-col sheets img/_review/c3-seals/emp/ (emp-act-sheet-vui.png = first 8, -binh.png = next 8, -tinhtu.png = last 5; cols: OUT rest|OUT peak|LOOP start|LOOP mid|BACK mid). Disc spec measured: rest 1.00 / peak 1.12 / loop 1.12 / back_end 1.00 (emp-ghen, emp-binh fixed by constant-disc median, looked at sheets).
Cost W1b for the 13 new + collecting W1's 8: 26 stills × 135 + 27 clips × 940 = 28 890 cr (1 redo: tinhnghich LOOP, snake turned into origami, +940). Per seal ≈ 2 222 (≈3 % over 2 150 because of the redo). W1+W1b set 5 total ≈ 19 350 + 28 890 + 8 clips … ≈ 48–50 k (incl. the OLD cup-version giận pilot 2 150 that is now unused).
NEXT (successor): set 1 hh- (HH+HQP), then 2 pt-, 3 cl-, 4 cy-. Everything is prepared: swap.py groups hh/pt/cl/cy (A/B/out/loop for all 21 emos), women ref upload vQzzg4ja47, tools finish.sh / publish.py. Per-set recipe: (1) A ×21 gpt-2-6 1:1 2k ref=vQzzg4ja47 (use swap.py <g> → A), flatten RGBA ones on #00FF00 (PIL) + re-upload; LOOK; (2) B ×21 ref = own A; (3) OUT/LOOP ×21 Seedance fast 2.0 (≤14 videos at once, account limit); (4) LOOK at sheets; mkdir /home/user/wt/<P>/ with <k>-out.mp4/<k>-loop.mp4; finish.sh <P> <k…> ; publish.py <P> <k…>; cdn_sync. Prefixes: hh pt cl cy → keys hh-act-<k> etc. Pilot ONE giận seal first per set (see 'look' below) because the women ref is the child-like emo-gian face: check she is the right age/crown (hh: empress ~30 phoenix crown crimson; pt: young consort jade green; cl: ma ma 55 silver bun coral/teal; cy: maid 18 pale blue-green).

## SET 1 HH+HQP (hh-) — W1c (26/11 ~12:05Z) · 14/21 LIVE, 7 need disc fix · ≈46 090 cr
PRIORITY #1 CHECK: OD 24/11 ~08:40Z | main Thái hậu live | review/c3-seals c0c35eb1 | claims C3-SEALS (W1c).
Cost: pilot giận 2 150 + 20 × 2 150 + 1 redo (tinhnghich LOOP, snake→origami AGAIN, same pattern as emp; fixed by prompt line "same small flat paper snake on a thread, never changing shape") = ≈46 090 cr. Balance 2 066 981 at W1c start.
All 21 A (ref vQzzg4ja47; gpt-2-6 returned RGBA/white for A → flattened on #00FF00, re-uploaded; B came back green RGB) and 21 B and 21 OUT/LOOP clips LOOKED at (contact sheets + 8-frame sheets): same face/crown/robe, two hands, no shards. Chibi/young face like Thái hậu set.
LIVE on CDN (live names img/kit/emo-anim/hh-act-<k>{,-out,-back}.webp + img/kit/emo-hh-act-<k>.webp; review + sheet img/_review/c3-seals/hh/hh-act-sheet-gian.png): gian an dau vui lo hothen hon khochiu tinhtu tinhnghich hanghai chuyentam hungkhoi choang = 14 (disc dev ≤ 0.009).
NOT YET LIVE (disc measure fails → pulsing disc): binh muu ghen buon so chan tutin. Clips/cuts/finals are in /home/user/wt/hh (may be gone) — if gone, re-download clips by id from hh_state.json (OUT/LOOP; tinhnghich_redo is the good LOOP). meas_after before fix: binh .036, muu .061, ghen .154 (drift 33 px), buon .087, so .032, chan .034, tutin .042. Tried: median of disc.npy cols 0..2 over whole clip and per part (out/loop/back) → WORSE (rest 1.08). Next try: robust re-measure (per-frame hough with fixed radius prior from the rest frame), or fit r(t) by median-filter (window 9) instead of constant, keep centre = median; apply.py then publish.py + cdn_sync. LOOK at the loop sheet after.
Tools: state/hh_state.json (all creation ids: Araw/Aflat/Braw/OUT/LOOP), tools/getimg.py (download+flatten+contact sheet), putall.sh, sheet.py, fin_par.sh (4-parallel finish; BUG fixed: names must be hh-<emo>; script writes "-<emo>" if P unset inside the function — use my renamed version only after setting k=$P-$e before P=$3 — see file), ≈10 min per 21 seals.
Note: B images need no re-upload (already green); A images do (flatten). Prompts: tools/swap.py <g> → prompts.json.
## HANDOVER W1c → successor (rolled at ~28 %)
NEXT: (1) fix the 7 disc cases of hh and publish; (2) sets pt, cl, cy (same recipe, prompts via swap.py, ref vQzzg4ja47); keep ≤5 Seedance in flight; (3) wiring/review on review/c3-seals.

## SET 1 HH+HQP (hh-) DONE — W1d (26/11 ~12:50Z) · 21/21 LIVE · fix cost 0 cr
PRIORITY #1 CHECK: OD MAIN 157 | main none | review/c3-seals c0c35eb1 | claims Foreman C.
The 7 held seals (binh muu ghen buon so chan tutin) are LIVE (img/kit/emo-anim/hh-act-<k>{,-out,-back}.webp + img/kit/emo-hh-act-<k>.webp; review copies + sheet img/_review/c3-seals/hh/hh-act-sheet-binh.png, 7 rows: OUT rest|OUT peak|LOOP start|LOOP mid|BACK mid). Clips re-downloaded by id from hh_state.json (0 cr), re-cut, disc re-measured.
ROOT CAUSE: the old tracker used ONE rest radius for out+loop+back and locked onto halo/robe/fan circles; raw Seedance disc size differs between clips (A disc vs B disc, 86–104 px) and has a glow ring just outside the gold rim. FIX = tools/meas_raw3.py: static camera → disc centre fixed (OUT rest circle); per frame only the radius = innermost strong ring of the alpha-edge distance histogram (halo peaks outside are ignored); LOOP = constant median, OUT/BACK median+box 9. Check = tools/meas_after3.py (fixed centre C0): rest 0.995–0.999, peak 1.12–1.14, LOOP 1.114–1.134, back_end 0.995–0.999, dev from spec ≤0.023 (chan out 0.023, muu 0.021, rest ≤0.014). Looked at the 5-col sheet + 8-frame loop sheets with the 1.12 ring: same disc size, no pulsing. Use `meas_raw3.py` instead of meas_raw.py for ALL next sets (pt cl cy); then apply.py, meas_after3.py.
NEXT: Foreman C asked for a GO before pt/cl/cy spend (SEALS spend over the planned line) — waiting.
