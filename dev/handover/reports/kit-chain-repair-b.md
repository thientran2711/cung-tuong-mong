# KIT-CHAIN REPAIR B (worker B, sonnet) — mgskin-wire + nochip

PRIORITY #1 CHECK ('mgskin-wire' + 'nochip'): OD 1 | ledger 0 | claims 8 | main 5 | review/* 2 | archive 0 (from ORDER MAIN 124 16:32Z + ORDER MAIN 125 16:48Z).
Base: both branches re-merged on LIVE 284e0d08; LIVE has since moved to 502c48c9 (kit-mapgo, UI-only) → **self-merge at land OK** for both.

## JOB 1 — review/mgskin-wire-r2 = b2a0d0c259b4576fb44d503a1a0fa6ff2a31c791
- Merge of 284e0d08: conflicts only dev/build/assemble.py (file list: took LIVE's list + `jmgskin.js` after `j82.js`), index.html, sw.js (rebuilt with `bash dev/site/build_site.sh`).
- Reproduced: `node dev/test/mgskin-wire.js` → `FAIL fold (e) dan really loaded the skinned picture (xuan) {"canvas":[],"dom":0}`, `FAIL 1/70`.
- ROOT CAUSE (not a mgboardof logic fault): the skinned board picture (img/mg/dan-xuan.webp, ~200 KB, CDN) is a network load; on the merged build it still had `complete=false` after the test's fixed 900 + 2200 ms. Probe with a 15 s wait: `KG82_IMG["dan-bg-hoc@xuan"]` completes, src = img/mg/dan-xuan.webp (mgboardof ctx «hoc» key is right), no page errors. j82.js is byte-identical to LIVE, so no product change needed.
- FIX (test only, dev/test/mgskin-wire.js (e)): after the 2.2 s sleep poll up to 15 s for a skinned, loaded `KG82_IMG[…@skin]` (or a DOM `.kgbox-bg`); a picture that never loads still FAILs.
- Results on b2a0d0c2: `node dev/test/mgskin-wire.js` → ALL PASS 70 (Fold+iPad); `node dev/test/kit-mgskin.js` no args → ALL PASS; `node dev/test/kit-mgskin.js index.html <outdir>` (Fold 755x1000 + iPad 1180x820 shots) → ALL PASS; quickcheck ALONE: `QUICKCHECK PASS · 200 s · open 1627 ms · old save ok · perf (median of 3, new/live): render 231/241 ms, tab 447/467 ms, buổi 1854/1117 ms, tasks>200ms 23/20 · core gates PASS`.
- Shots (Fold + iPad, Tài nghệ Đàn rules screen, skin dao) looked at: skin banner + figure + 3 buttons, no overflow.

## JOB 2 — review/kit-nochip-r2 = a3108ff7a5cfb514753c6184916aa69206f1d5bf
- Merge of 284e0d08: conflicts dev/kit/KIT.md (took LIVE's picture-square lines, kept nochip's «no meter» ROWS line = canon overwrite), index.html, sw.js (rebuilt).
- Product rule unchanged and rule-based: `kitOptOdds` (jk2b.js) removes every `data-ksure` meter; no option shows a meter unless it has a roll (kitOptModel odds). No id list anywhere.
- Gap found in the TEST, not the rule: odds-meter-back drew ONE random cast of j7c per run, and approachOne is a 400-draw sample. FIX THE WHOLE GROUP: dev/test/odds-meter-back.js now audits EVERY composed j7c seed (all 81 of J7SEEDS × 3 casts; if the life has nobody who fits the nết it forces a cast from any living person, because the meter does not depend on who) + every PEND id + the approach draws; wipes the previous dialog's buttons and settles before each audit; re-reads any suspect after 400 ms (transient ones are logged, not counted). Env `OMB_ONLY=pend` skips the approach draws. Prints j7c seeds/cast/dialogs.
- BEFORE/AFTER (script = odds-meter-back, LIVE build vs nochip-r2 build, Fold 755x1000, same scan):

| build | options | rolled with meter | certain, no meter | certain WITH meter (FAIL) |
|---|---|---|---|---|
| LIVE 284e0d08 (before) | 819 | 20 | 0 | **799** (all «Rất vững»/«Nắm chắc») |
| kit-nochip-r2 (after) | 1064 | 21 | 1043 | **0** |

  j7c: 81 seeds, 81 cast, 243 dialogs (3 casts each), 0 certain-with-meter after.
- Tests on a3108ff7: `odds-meter-back.js <index> <out.json>` no args (755x1000 + 1180x820) → PASS, PASS (krisk 0, no meter 0, step≠odds 0, certain with a meter 0, page errors 0); with args `… 755x1000,1180x820,1366x1024` → PASS ×3 (1030 / 955 / 858 options); quickcheck ALONE (old save): `QUICKCHECK PASS · 193 s · open 1711 ms · old save ok · perf render 229/208 ms, tab 405/373, buổi 1376/1129 · core gates PASS`.
- Shots Fold + iPad of a j7c dialog (j7-049, «Nhờ … xem cuộn chỉ đỏ trên tay …»): the sure options show Tốn / Được rows and NO odds meter.
- HONEST NOTE (one open item): before the harness fix I saw a flake ~1 in 12 runs, only on iPad, label PEND:j7c: «Kéo … chứng cứ X +1» or «Nhờ … tìm chiếc hài lẻ chứng cứ X +1» reported «certain with a meter «Mong manh»». j7cOpt options carry no `p`, so no roll exists; I could not reproduce it in 26+ further runs and 500+ probe draws (probes, HTML capture added to the failure line for next time). I added the 400 ms re-read; in the final runs transient = 0. If it ever shows again, the failure line prints the button HTML + option keys → send it to the kit keeper.
- Files: dev/test/odds-meter-back.js, dev/kit/KIT.md (merge only), index.html, sw.js.

No new kit part, no changed look (test + merge only). Worktrees deleted after push. Rollover: not needed (context small).
