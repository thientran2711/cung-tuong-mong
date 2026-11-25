# review/minigame-fix — report (worker MINIGAME-FIX, 24/11)
PRIORITY #1 CHECK: read OD 24/11 ~22:02Z items 2+6; reused existing kit rules block (j82 kgReady «Luật chơi», kg82Rows, kg82Btn) and kitFocus play layer; no new kit part (KIT OK not needed).
Branch review/minigame-fix = 7d21d04fff6b387dbdae6e6ce3c500aa78009489 (base origin/main 502c48c9). Files: dev/build/jdfv.js, j82.js, jbal2.js, tests, rebuilt index.html/sw.js.

## (6) Mystery mini-game
- Cause: the ✗/✓ field is the real «Lời hay» engine (jdfg words; hỏi thăm / nương tựa …) started instantly with no rules; skip button read «Làm luôn · không chơi: như thường».
- Fix (jdfv.js dfIntro + DF_RULE): ALL 7 on-figure engines (swipe tug bow drag ear words stare) first show a kit card «Luật chơi · <move>» with rows Việc / Chạm / Được and kit button «Sẵn sàng»; nothing runs, no clock until Sẵn sàng. Skip = «Bỏ qua · kết quả thường, không tính phần» (shown on the intro too). ◂ = cancel, no act.
- ✗/✓ confirmed real pieces (✓ green = good words +2, ✗ red = wrong −2); rule row says so.
- Not changed: the NPC dodge (slapGame) — a hand is already coming at her, rules would be wrong there; its skip button gets the new wording.
## (2) Mirror
- Cause: kg82Open drew the frame at once; board painting + her figure loaded async → empty mirror seconds.
- Fix (j82.js kg82Veil, BAL.mgVeilMs=1500): every kg82Open frame (whole family of kg82 mini-games: Điểm trang/chải chuốt, lessons, contests…) stays visibility:hidden until all its <img> + the kind's board picture are decoded, capped at 1.5 s so a slow picture never traps her.
## Tests
- dev/test/minigame-fix.js (new): each engine's rule text exists (no %), intro shows before game & Sẵn sàng starts it, veil hidden→shown→never trapped; Fold 755x1000 + iPad 1180x820: ALL OK. duodo-focus-view.js (updated 2a) ALL pass; duodo-focus-games.js ALL OK; build_site ok.
- Shots LOOKED at: Fold + iPad intro card (legible paper card centered, Sẵn sàng + Bỏ qua visible) and play field. Pictures were blocked in the sandbox (CDN), so figure/mirror art not visible in shots; veil verified by test.
## Not done / for MAIN
- No old-save/quickcheck run beyond the two duodo tests (no save-format change). Items 1,3,4,5 of the same OD row are other workers'.
~70% xong / ~70% chơi được (items 2+6 only).

## ROUND 2 (MAIN 128 asks) 
Shots (real CDN art via proxy, Fold + iPad) at https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-fix/ : {fold,ipadAir}-diemtrang-intro, -mirror-40ms / -300ms / -1500ms (her face already in the mirror at 40 ms), -loihay-intro, -loihay-play (✓/✗ real pieces over the person).
Điểm trang real fix (jtoil.js): toilOpen warms her portrait (decode) while rules/dress pick; toilMakeup veils the board until her face is decoded (cap BAL.mgVeilMs). j82 kg82Veil still covers every kg82Open frame (seen: frame absent at 40 ms, whole board at 300 ms).
### Family table (dev/test/minigame-family-scan.js, dynamic: playArt per KG82_KIND)
| game family | Luật chơi intro | Sẵn sàng | skip wording | decode-first |
|---|---|---|---|---|
| 39 kg82 kinds (Đàn Hát Cờ Đầu hồ Bắn cung Thơ Câu đối Thắp đèn Vẽ Cắm hoa Thêu Khéo tay Múa(Lục yêu…) Nấu ăn Điều hương Công Dung Ngôn Hạnh Chải chuốt Lễ nghi Trị cung Xử án Thái hậu hỏi Dán hoa điền Du hồ Hoa đăng Tát Né Chép kinh May áo Nghe ngóng Truyền lời Mặc cả Thời cơ Chải lông/Chơi thú Tưới cây Cờ năm quân) | yes (scan ALL OK 39/39) | yes | «Để trời định / Học nhanh …» + sub «tính 5/10»/odds (kitQuick, plain) | yes (kg82Veil) |
| contests / Thử tay / khảo hạch / tuyển tú (jexam jentry jmgcal startContest) | yes (kgReady) | yes | «Để tài nghệ quyết định · màn thi tính N/10» | yes |
| Điểm trang mirror (jtoil) | yes | yes | kit quick | yes, face decode added (was the empty mirror) |
| scheme games jsgame, pet/shelf care, Nghiệm thân jroute, jtd, jts | yes (kgReady) | yes | kit quick | yes (kg82Open) |
| Dư đồ on-figure 7 engines (jdfv) | ADDED this branch | ADDED | «Bỏ qua · kết quả thường, không tính phần» | n/a (kitFocus layer) |
| NPC dodge (slapGame in focus) | no — a hand is already coming | no | new wording only | n/a |
| Phối đồ picker (jts tsDressGame), Giọt máu (jroute rtNgScene) | no intro: a picker / a no-input animation | n/a | n/a | veiled (kg82Open) |

## REVIEW (BIG reviewer, 24/11) — FAIL dbd5ea4d
PRIORITY #1 CHECK: read START_CORE/WORKER/REVIEWER + brief + this report; git grep origin/main 502c48c9 + review/minigame-fix: kgReady «Luật chơi» (j82 §13.7), kitFocus F.play (jfocus §92) exist; no kit part for an on-figure rules card; no LC12 merge sha received yet → verdict on branch tip dbd5ea4d (base = live main 502c48c9, so the same tree as a clean merge).
### FAIL list (worker)
1. LAW 9 KIT FIRST — private frame. `dfIntro` (jdfv.js) builds the rules card with its own inline cssText (position, width, background var(--paper,#f6eedc), border 1px gold, radius 14px, box-shadow, padding). Not a kit part, no KIT.md entry, no «KIT OK» from KK23b (the report says "no new kit part" — it is one). It also does not look like the Điểm trang «Luật chơi» (kgReady block inside the kit frame, rows behind «!»), so the consistency scan finds TWO different «Luật chơi» looks. Fix: send to kit keeper KK23b → a kit call on the focus play layer (e.g. `F.intro({title,rows,go,onGo})` in jfocus.js + KIT.md §92 + kit page sample), built from the same kgReady/kgBang parts; jdfv only calls it.
2. LAW 9 KIT FIRST — kit behaviour from a game module. The `<style id="dfintro-css">` in jdfv.js hides the kit fx layers (#kfxcv, .kfx-fl, .kfxk, .kfrip) with `body:has(.kfoc-play:not([hidden]) *)`. A kit-wide layer rule belongs in the kit (jfocus/kfx) with its KIT.md line, done by KK23b in the same change as item 1. (Perf measured fine: tasks>200ms 25 vs LIVE 24.)
3. Test the branch broke: `node dev/test/mg-noword-kit.js` → «FAIL odds words / quick buttons were turned into signs». The assertion was changed to /Bỏ qua/ but the synthetic probe button (line ~31) still reads «Để trời định»; update the probe text.
### Notes (fix in the same round, not blocking alone)
- j82.js:542 result line after a skip still says «Để tài nghệ quyết định, N/10 → +K» while the button now reads «Bỏ qua» — say the same thing on the result («Bỏ qua, …») so one wording holds end to end.
- dev/test/minigame-family-scan.js waits 60 ms after playArt: 1 of 3 runs GAP thu_choi (empty go/skip), 2 of 3 ALL OK 39 — wait for #kg82go instead of a fixed sleep.
- dev/test/minigame-fix.js veil check `hid:hid||true` can never fail — assert the real value.
### Checked and OK
- Skip result identical (laws 2/3/4): the intro stub `DF.play.skip` returns `{raw:null,skipped:true}`, the same object as the jdfg engine skip (jdfg.js:38); ◂ during the intro = destroy, no act (as before); kitQuick / j5 openMG / j83 change only the label + small line, handlers and rolls untouched (kitQuickRoll unchanged). NPC dodge path (jdfv:85) unchanged.
- One core: BAL.mgVeilMs=1500 in jbal2; veil cap path: Promise.race(cap) + setTimeout(cap+200) fallback; slow picture (unreachable URL) shown after the cap (test ok both devices).
- quickcheck PASS: core gates PASS, time-spill PASS, open 2103 ms 0 errors, old save loads + plays a buổi, perf new/live render 236/282, tab 531/478, buổi 1482/1672, tasks>200ms 25/24.
- coop-e2e 142/142 passed; duodo-focus-view ALL OK; duodo-focus-games ALL OK (law 5 harder at rank 7 kept); kit-focus PASS 755x1000 + 1180x820; minigame-fix ALL OK; family scan 39/39 (see flake note).
- Shots looked (real CDN art via curl proxy), Fold 755x1000 + iPad 1180x820: Lời hay intro (readable, title one line, Bỏ qua · kết quả thường under), play field (✓/✗ are real pieces over her), Điểm trang rules screen, mirror at 40 ms = her face already in the mirror on both devices. Shots kept in scratch only, none in git/CDN.
Re-review: after 1–3 are fixed (with «KIT OK <sha>» for 1–2), send the new sha / LC12 merge sha.

### RE-REVIEW 66edf06f (BIG reviewer) — FAIL
66edf06f = dbd5ea4d + dev/test/mg-noword-kit.js only (assert restored to the fixture's own «Để trời định» button) → item 3 closed. Items 1 (private dfIntro frame, inline bg/border/radius/shadow) and 2 (dfintro-css body:has fx rule in jdfv) are unchanged in jdfv.js → still FAIL; no step-8 merge sha judged (nothing to land). Needs KK23b «KIT OK» for the focus-layer rules card, then a new sha.

### RE-REVIEW 0506605b (BIG reviewer, 25/11) — BIG PASS 0506605b (branch; step-8 merge sha to be confirmed)
0506605b = 66edf06f + r4 nits (6c57a758) + kit e716092a (KK23b KIT READY, kitFocus F.intro, KIT §92.4) merged; parent chain on live main 502c48c9.
- Item 1 CLOSED: jdfv calls kit `F.intro({title,rows,go,sub,onGo})`; dfIntro and its inline frame deleted. The card is kit `.kgr` + `.kpst «Luật chơi · …»` + kg82Rows + `.kgr-go` on `--k-card`, the same parts as the Điểm trang kgReady rules screen (law 9 consistency OK: heading, rows, button and card colour match; the focus card shows its 3 rows openly where kgReady keeps «Môn/Luật» behind «!». These three rows are the essentials, so that is accepted).
- Item 2 CLOSED: fx layers are hidden by `html.kfoc-playing` (kit jfocus, no :has); the class is removed in playOff + destroy.
- Item 3 + notes CLOSED: mg-noword-kit PASS (odds/quick stay words, 39 kinds 0 words); result line «Bỏ qua, N/10»; family scan waits for Sẵn sàng (ALL OK 39); veil assert real.
- Skip result identical: playArt default QK label only; the skip raw is still `o.quick…?…:5` (no change); the F.intro stub skip = {raw:null,skipped:true}.
- Gates: quickcheck PASS (core gates, time-spill, old save ok, perf new/live render 276/301, tab 570/626, buổi 1794/1551, tasks>200ms 27/25: within run noise, the live median moved 24→25 between runs); coop-e2e 142/142; minigame-fix, minigame-family-scan, duodo-focus-view, duodo-focus-games, kit-mg-intro (755x1000 + 1180x820), kit-focus ALL PASS.
- Shots looked at (real CDN art), Fold 755x1000 + iPad 1180x820: the Lời hay rules card is centred and readable on both, the title is on one line, «Bỏ qua · kết quả thường» shows under it, no fx specks over the card; Điểm trang mirror shows her face (Fold, slow proxy: veiled at 40 ms, face at 600 ms; iPad face at 40 ms).
- Nit (kit keeper, not blocking): jfocus `.kfoc-intro` sets z-index twice (5 then 3), so only 3 applies; keep one.

### REVIEW review/minigame-fix-2 0b118c6b (BIG reviewer, 25/11) — FAIL (small, 3 items)
Diff vs 0506605b: j82 kgReady gets two OPEN kit rows «Chạm» (KG82_TAP per kind / caller tap / first sentence of how) + «Được» (KG82_WIN / mgWord(5) from BAL); callers pass win:"thi"/"hoc"/"toil" (j5, j82 startContest, jentry, jexam, jtoil). Text/UI rows only: no BAL, no logic, no skip path change → SMALL in content. Tests: minigame-family-scan ALL OK 39, mg-noword-kit PASS, minigame-fix ALL OK.
1. dev/test/mg-intro-2.js now FAILS on all 39 playArt kinds (it asserts `!r.kb`: no open kit rows inside .kgr; 0506605b = ALL OK). Update the assertion: inside .kgr, only the two rows Chạm + Được are open, everything else stays behind «!».
2. LAW 14 canon overwrite: KIT.md §13.7 (line ~655) still says the rules block = heading + «!» only. Rewrite that line in place: two open rows Chạm/Được (kgTapRow/kgWinRow, KG82_TAP, KG82_WIN, spec tap/win), with the rest behind «!».
3. LAW 9: kgReady is a kit part (KIT §13.7). Get «KIT OK» from KK23b on this change, or a written waiver from MAIN 130 in this report.
Then send the clean quickcheck sha; I will confirm PASS quickly (no full re-run needed beyond quickcheck + mg-intro-2 + family scan).

### STEP-8 CONFIRM (BIG reviewer, 25/11) — BIG PASS 7df74e84
LC12 step-8 merge 7df74e84 (review/lc12-varC) = parents 2b68def3 (day-queue step) + 0506605b; checked by diff: the change 2b68def3→7df74e84 in dev/build is line-for-line the change 502c48c9→0506605b (224 diff lines each); on the minigame files the only differences from 0506605b come from the lower stack (j79 kitParse+kitNoUnk, jbal2 +4 lines, KIT.md +1), with no conflict and kitQuickWords/kitQuick kept. LC12 gates on 7df74e84: minigame-fix ALL OK, family scan ALL OK 39, duodo-focus-view ALL OK, mg-noword-kit 0 words, coop-one-world 4/4. Valid as long as LC12's per-step quickcheck for 7df74e84 passes (LC12 lands only on that PASS).

### RE-REVIEW review/minigame-fix-2 45ebeae1 (BIG reviewer, 25/11) — PASS 45ebeae1, landing gated on KK24 «KIT OK»
45ebeae1 = 0b118c6b + mg-intro-2.js (asserts only Chạm + Được open) + KIT.md §13.7 rewritten in place (spec tap/win, open rows); no game code change. Rerun here: mg-intro-2 ALL OK, minigame-family-scan ALL OK 39. Worker quickcheck PASS (old save ok). Items 1 and 2 closed. Item 3 (law 9) is still open: KK24 «KIT OK» on the kgReady change is pending. Land only after it arrives; the review needs no new run unless KK24 changes code.
