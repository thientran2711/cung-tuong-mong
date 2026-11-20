# tut-road (worker E27, sonnet) — SẴN SÀNG KIỂM (r2) review/tut-road @ 6ff5bd33
PRIORITY #1 CHECK ('tut-road tut-followups tutorial per-origin road'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (prio1.sh); by hand: tut-followups-r1 92cce50b already ancestor of main → nothing to re-merge. Merged LIVE main 30e8714e (conflict only in generated sw.js/index.html → rebuilt).
## 1 Per-road ch1 (Foreman fix 1)
jtq14.js: ch1 «Duyên cớ» = the origin's own line + «Điều <x> canh cánh trong lòng là <road subject>» read from ARC67[S.st.f14.road].sj (every road has one; a road whose sj still has a {placeholder} filled at road start adds nothing). So «Thái hậu lâm bệnh» now reads "bệnh tình của Thái hậu". 
## 2 Per-origin lines (fix 2)
BEAT[origin][chapter] for all 10 origins (tt dtq ch muoi thd td nc bd cn cnv) × ch1–3 (30 lines, cổ trang, no %, no number; each line only names the quest deeds of that chapter). Test dev/test/tut-road.js 10/10.
## 3 tut-quests.js failing 12–15 on clean main — root cause + fix (law 11)
| fault | where | before | after |
|---|---|---|---|
| REAL BUG: kitShopBuy did `o=B(key)` — window.__kshBuild always exists (jcoopthinf) and returns undefined in solo → o undefined → return false → the Mua button in EVERY solo kit shop (Nội vụ phủ, pet shop, errand shop…) ran nothing | dev/build/jinv.js kitShopBuy | no solo purchase | `const o2=B(key); if(o2){o=o2;…}` (kit logic fix, no visual change); quest «mua» now done |
| test: «di» assumed Ngự hoa viên reachable | tut-quests.js | "home" in some lives | tries every place |
| test: lesson «hoc» waited a fixed 2.5 s, a lesson can end with 0 progress (chance) | tut-quests.js | random fail | waits for result card, repeats lesson ≤16× |
| test: B maid set Chủ tin 70, a month of events can drop ~11 | tut-quests.js | random fail of 9 checks | 100 |
Before (clean main 377d5ce3, tt): 23 pass / 12 FAIL; after: tt 35/35 (5 runs of 6; the 6th hit the lesson retry, now 16), bd 35/35, td 32→(test fixed)…; errors only "updateLocalTransform" pixi noise seen once, pre-existing.
Group scan: kitShopBuy is the only `=B(` user (grep). Other shops share this engine → all fixed.
## Tests
one-core-guard PASS 0 fails · tut-road 10/10 · tut-origins-scan 10/10 · tut-quests tt 35/35, bd 35/35 · story14-view 755x1000 + 1180x820 PASS · old-save: tut-quests «E old save» PASS (chapter without q14 loads, no card). tut-followups.js and story-frame-oldsave.js need a PRE-FIX build (66f598de-era) as «before»; against main (already fixed) their 'old build has the bug' checks fail by premise, not by this change — not re-run on a pre-fix build.
`quickcheck`: no sh/quickcheck script exists on main or the handover branch (only .quickcheck logs) → ran one-core-guard + the tests above instead.
## Shots (looked at): chapter-open card, Fold 755x1000@2 + iPad 1180x820@2, roads tt_oan, td_an, cnv (random road). CDN upload REFUSED (cdn_sync HTTP 401 Authentication error) → shots stay in worker scratch /home/user/wt/tutroad-shots, NOT committed. iPad td shot read: new «Duyên cớ» row sits in the existing kit panel between Lời dặn and Mục tiêu, no overflow.
## Open
cnv subject with an unlearnt name prints «???» (name mask, law 6b) — correct but reads odd: "chuyện cung nữ ??? bị vu".
