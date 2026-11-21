# rv-ending-screens — OPUS BIG review (Foreman B ROOT-5; brief main88-rv-ending-screens.md via b5-rv-ending-screens.md)
PRIORITY #1 CHECK: OD 21/11 owner marks #48 #50 #51 (OWNER_MARKS_2111.md) | main LIVE 666def0c: no kitEndScreen, KIT ends at §90 (§91 free) | review/ending-screens bffc0a56 (base 56ff0db0) | claims: worker session_01Rc5AsKeKeU4YfrthgxjKW7 rolled; this reviewer session_01N1tNP2Z5YHxBZcLFzY5BEH
START_CTX ≈ 3 %; finished ≈ 15 %.

## VERDICT: PASS — review/ending-screens-rv c073f8d4 (FF of main 2021e23f; earlier rounds merged 666def0c, 068662ad) 
Commits on top of bffc0a56: 7df97682 merge LIVE 666def0c (assemble.py = main list + jend.js last) · 13cb5a84 reviewer fix (below) · e11a7bf1 merge LIVE 068662ad · c073f8d4 merge LIVE 2021e23f (index.html/sw.js taken from main, rebuilt each time).

## Reviewer fix (small, in jend.js)
kesLife classed «Được Thái hậu ban hôn cho …» (j42.js:596, by = Thái hậu) as `throne` because the throne regex hit "thái hậu" → with art it would show the throne background on a marriage. Now ban hôn / ban gả / xuất giá / thành thân → `leave` before the throne test (exile still first: «Phế làm thứ dân, xuất cung» = exile). Unit check: 5 fates OK; ending-scan unchanged (40 callers, untyped 0).

## Laws checked
- Law 9 / law 11 KIT FIRST + whole group: ONE part kitEndScreen (KIT §91, jend.js) for every ending; no per-screen variant; the frame is the existing kit dialog (same body/figure/buttons), one size override under #modal.kes. ending-scan: 40 ending callers, untyped 0 (no new over( callers in files main added: jrd_pt, jrd_pt2, jbalpt, jkinl).
- Law 4 ONE CORE: no number added or changed (pure rendering; jge/j97 only call kitEndNext before over()).
- Law 7 / VANPHONG: no new player-visible word in play. Nit (kit page only, not player-visible): §91 sample shows type keys "death/grand" in English.
- Law 12 devices: Fold 755x1000@2 + iPad 1180x820@2, all 11 cases (death, exile, fail, fate, grand, grand-exit, leave, rare, rare-exit, throne, oldsave) looked 3×: background fills the screen, top/bottom bar hidden, frame centred ≥ 80 % width, no cut text, no overflow.
- Marks #48 #50 #51: structure matches (mourn = white ring + white flower/drapes slots; fest = gold/red ring + fest flower/drapes; full screen per type). ART PENDING (Foreman C): img/end-bg-<type>.webp and img/kit/{death,fest}-{flower,drape-l,drape-r}.webp are NOT on the CDN yet → today players see the blurred event picture + tone ring, no flower/drapes (no code change needed when art lands). The owner's flower + drapes appear only after C delivers.

## Pre-existing jfx white silk over the death card — judgement: NOT blocking
Measured (Fold, die()): j93 kitInk ink overlay covers the screen and WAITS for «Tiếp theo» (still up at 20 s); the jfx death silk sheet (.kfxk-s) lives 0–~6 s, fading out by 7 s. So the silk only crosses the ending card if she taps «Tiếp theo» before ~6 s, and then for at most ~3–4 s; it never hides content for good. Also on main. Follow-up for the fx owner (not this branch): stop the silk sheet when the ink stage ends; the silk sheet looks pixelated at @2 (120x214 frames scaled up).

## Tests (on 7df97682 unless noted)
- node dev/test/ending-scan.js: 40 callers, untyped 0 (also on 13cb5a84)
- node dev/test/ending-screens.js shots Fold+iPad @2 with OLD=live main index.html: 246/246 PASS; final 13cb5a84 @1: 246/246 PASS
- node dev/test/ending-screens.js --noart: 226/226 PASS
- node dev/test/coop-ending-screens.js: 8/8 PASS
- COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js: 92/92 PASS
- bash dev/tools/quickcheck.sh 7df97682: QUICKCHECK PASS (old save ok, render 215/222 ms, buổi 1029/2393 ms); e11a7bf1 (main 068662ad): QUICKCHECK PASS (old save ok, render 261/238 ms, buổi 1168/1266 ms); 13cb5a84: QUICKCHECK PASS. Final c073f8d4 (merge of LIVE 2021e23f, generated files only): ending-screens 246/246, ending-scan 40/untyped 0
- Shots in reviewer scratch only (not in git, not on CDN), deleted with this verdict.

## Open (for Foreman B / MAIN)
1. KIT KEEPER OK of §91: send_message to keeper session_01Rc5AsMtjP4KTgBZVjENGLs failed ("not found" = rolled/archived) → Foreman B please route to the current keeper.
2. Art (Foreman C): 8 end-bg + 6 overlay pieces (names above; request already in FOREMAN_C_STATUS).
3. fx follow-up: silk sheet vs ending card (above).
