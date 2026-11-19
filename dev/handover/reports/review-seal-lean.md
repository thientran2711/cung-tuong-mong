# review seal-lean — SMALL REVIEW (reviewer, sonnet; ROOT-62 child; depth 1)
PRIORITY #1 CHECK: OD 2 ('seal anim' 17/11 + 19/11 ~02:15Z real) | main dev/build/jemoseal.js, KIT.md §38.4 | review/seal-lean 5f7aef61 | claims seal-lean worker session_01Rc5AsKsNitSW71UKQUtLKJ. START_CTX ~0 %.

## VERDICT: PASS LAND READY 1cf5e8bb8 (branch review/seal-lean-r = review/seal-lean 5f7aef61 + final merge of origin/main 89aa1bd9; only generated index.html conflicted, rebuilt by build_site.sh)

18 LAWS touched: 9 KIT FIRST ok (one part jemoseal, no per-place motion; fig-head kfseal `animation:none` is lower specificity (0,2,1) than kit `img.kemo.kemo-live` (0,3,1)); 11 whole group ok (all img.kemo via kesLive; grep: no other kemo-m-/kemoSway users); 4 ONE CORE ok (motion numbers cosmetic, all in KIT_EMOSEAL; no game number); 7 no player text added; 14 canon overwritten in place (KIT §38.4); 12 both devices looked.

## Checks (brief 1–6)
1. IDLE: `kemoIdle` = `rotate` only, ±1.2deg, period 6–8 s random per seal + random phase. Measured 40 s: −1.2..+1.2 deg, half-period 3.1–3.6 s on both devices. Slight and slow, not a shake. PASS.
2. LEAN-IN: per-seal random 4–8 s (rest 4.1–9.1 s fold, 4.6–8.8 s iPad), scale up to 1.177/1.18, then the feeling's own motion, back to idle. Start gap between any two seals ≥1.24 s (fold) / 1.33 s (iPad); all 4 seals leaned, none together. PASS.
   NOTE (non-blocking, report wording only): worker says "overlapping leans 0 / ≤1 lean at a time". Starts are staggered by 1.2 s, but the lean lasts d+0.15 s (1.15–1.75 s), so tails can overlap ≤0.55 s (my fold run counted 1 overlap, dur max 1.54 s). Seals never START together; owner wording "staggered, not all at once" is met. Not changed.
3. DATA: motion per feeling in KIT_EMOSEAL.keys[k].{m,d}, idle/lean/defaultMotion in the same object; no inline per-place list; css only maps motion name → keyframes. Loop `emo-anim` + `emo-fx` swapped in at lean start, removed at lean end / leaving screen (code read; files still absent on CDN, so still + CSS). PASS.
4. GATES: kemo-live (IntersectionObserver), kesMotionOK (reduced-motion + OPT.fxon===false = Gọn), CSS inside prefers-reduced-motion:no-preference, saveOpt hook re-applies. Leaving screen clears both timers. PASS.
5. KIT.md §38.4 rewritten in place (+Test line). PASS.
6. LOOKED: Fold 755x1000@2 + iPad 1180x820@2 room stage, strips idle|0.2|0.4|0.6|0.8 for giận (shake + warm glow), buồn (droop, tilt), vui (tilt both ways + glow): scale ~1.12–1.17, face not cut, seal beside head. Person card/pcPort use the same `kesLive` (scan). No page errors (fold, iPad, post-merge iPad). Test note: strip step is timing-sensitive (lean timer ends the class ~1.15–1.75 s after start; with two Chromium runs in parallel some frames read null) — re-ran sequentially, all frames present.
   quickcheck --runs 3 on 5f7aef61 vs live b1c3631e: PASS 172 s · open 1484 ms · old save ok · core gates + time-spill PASS · perf median new/live render 213/200, tab 396/442, buổi 944/1155, tasks>200ms 17/19 (no worse; the worker's +7/+12 was noise). Post-merge: build ok, fig-seal MOTION smoke ok (no errors, idle ±1.2deg). Not re-run full quickcheck after the merge (merge only touched role-parity tools + generated files).

## For the owner
2-device montage (Fold top, iPad bottom; rows giận/buồn/vui; columns idle + 4 lean-in frames): https://ctm-img.victoria-tntt.workers.dev/img/_review/seal-lean/montage-fold-ipad.png (CDN img/_review/seal-lean also holds the worker's 4 shots; wipe after she looks: python3 dev/site/cdn_sync.py --wipe-review seal-lean).
Shots in scratch only; none in git. Painted loops/sprites (emo-anim / emo-fx) are still missing: not this branch's job (Foreman C).
