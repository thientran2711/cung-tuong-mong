PRIORITY #1 CHECK ('scenes-3'): OD 0 | ledger 0 | claims 3 | main 0 | review/* 1 (review/scenes-3) ; ('dhConfiscate'): main 3. Reviewer for an existing branch; build nothing new.
(reviewer re-run: PRIORITY #1 CHECK ('dhConfiscate kitLearn tsGift'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 — new code only on review/scenes-3)

# review scenes-3 r1 (reviewer opus) — PASS 92b6c60f
START_CTX ≈ 10 % (fresh session); no rollover.
Reviewed: review/scenes-3 @ 0237c648 (worker's 6b28243b + one follow-up commit "gift khắc cost from BAL.tsGift"); base = current origin/main 7abaf07a, so the trial merge is a fast-forward.
Result branch: review/scenes-3-r1 @ 92b6c60f (ancestor = origin/main 7abaf07a).

## Rules vs OD
- OD:L374 demotion/lãnh cung confiscation: jdemo hooks jdh2's single dhConfiscate (cold/giang), her + every consort (NPC = data + news, co-op host only); scene = kitPanel person dialog with Nội vụ phủ eunuch, decree line, «Mâm thu về» tray of kit item tags, «Tuân chỉ». Items kept in S.il.box and returned weekly when she stands high enough. OK.
- OD:L712 level-up: kitLearn on addArt/addVir (all roads), effect lines from ARTFX/VIRFX (one source), lối opened (Tứ đức). OK. "items fly to Tư trang" part: no items are granted by a level-up today, nothing to show.
- OD:L752 gift with a work/item: worth from wkEval (works) / giftVal + luxGift (items), item via giveTo; ghen/oán/aff/bạc/khắc all from BAL.tsGift; ghen 40→32 = BAL.tsGift.ghen. OK.

## ONE CORE / kit / wording
- BAL.tsGift added; old hard-coded 12/8/5/3 now read BAL. core gates PASS (one-core-guard, rules-one-source, kit-conform).
- Kit: §86 kitLearn registered in KIT.md + kit sample page + KIT_NUMBERS; §66.3 demotion tray registered. Built on kmStage/§65.2 frame and kitPanel/kitItemTag/kitRows/kitSteps — no private frames.
- VANPHONG: no %; option x "Chắc chắn · thành: …" is the existing machine prefix stripped by oddsChip (no word shown), same as all other sure options.

## Fixes made on review/scenes-3-r1
1. jlevel: «Mở thêm» printed the internal sub-style id ("công thức mới: s2") → now the lối names ("lối mới: Thắt nút, tua kết"), word «lối» as jtds uses.
2. jlevel: kitSteps(o.to,5,…) typed 5 → kitSteps(o.to,0,…) = the kit's own max.
Site rebuilt both times.

## Tests (on 92b6c60f)
- node dev/test/scenes3.js: fold + ipadAir errors [] on both, all checks as in the worker report.
- bash dev/tools/quickcheck.sh: PASS (old save ok, perf ≈ live, core gates PASS, time-spill guard PASS).
- Extra sizes 1366x1024, 844x390 (learn scene): no page errors, no horizontal overflow; 412x1058 = rotate prompt (by design).
- Shots looked at (scratch, not committed): fold/ipadAir demo, giftopt, giftpick, learn, cold; learn-844, learn-1366.

## Missing painting img/scene-thanhtai.webp (ART REQUEST at Foreman C)
- With a real 404 (route-forced): jcdn retries once, then the onerror swap shows the skill art (act-cat-hoc-tap.webp) — verified (naturalWidth 384, visible). Clean, no broken icon.
- Note: in this container CDN requests through the proxy sometimes hang (no response), so the painting frame stays empty in some test shots (also other CDN art in the same shots). Environment, not code.
- Note for Foreman C: the fallback is 384 px wide shown cover-fit in a ~526x640 frame on Fold → soft until the real painting lands.
