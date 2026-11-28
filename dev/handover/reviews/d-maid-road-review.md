# BIG REVIEW review/d-maid-road 1990977f → PASS 5f37b79a (review/d-maid-road-rv) — 28/11
Reviewer session_01964izBp3gfQrukph9vdTCp (opus) for Foreman D ROOT session_01964izEUYzmixcs6Yg5ZXsE. START_CTX ~6 %.
PRIORITY #1 CHECK: claims D-MAID-ROAD (worker G1y9L64o, done) | brief briefs/d-maid-road-rv.md | base review/lr-rules caa95310 (head unchanged at review time) | origin/main a96564ad already ⊃ caa95310 | no other rv on d-maid-road | kit: lx / failTxt (j2) is the existing fail-text field of every act card (kaRows → BẠI block).
KIT CHECK: reuses the act card (kaRows / kaBody THÀNH · BẠI · KÈM rows), failTxt l + lx, oddsChip. No new part, no CSS. Checklist dev/kit/KIT_CHECKLIST.md: kit-std-scan Fold + iPad = FAIL 16 (2 rules: X06 bare ladder word ×12, X08 ellipsis ×4, all on tab:court) — IDENTICAL to base caa95310 (pre-existing, not touched).

## CLAIMS
1. **Double exam door (build-only)** — CONFIRMED + fix OK. `exLive(ex)` is the one check (maid: target set + window open + not mid-board; consort: window open, not passed, not mid-board); every door uses it: exAsk «Thi ngay» / «Để sau», exCard / exSrvCard go (→ exGo), exAdd / exSrvAdd. exGo removes the other door's queued card (exUnask) and the deck card (exDrop). chooseM shifts Q before go, so exUnask never eats an unrelated card. exDone / exSrvDone clear w1 → a stale door closes with «Kỳ khảo hạch ấy đã qua.» Old-save mend (deser wrap) touches only a non-risen maid whose rung is not finite (new maids start rk:1, so no live save is changed). Tests 14/15/16 PASS.
2. **Tân Giả khố «Nghỉ tay một lát»** — loss printed, but in the WRONG ROW → fixed by reviewer. On 1990977f the card read (iPad + Fold): THÀNH «Sức ++ · còn 6 tuần» (green), **KÈM «hỏng thì thêm một tuần phạt»**, BẠI «Sức −−». The kit sorter puts x into the THÀNH block; the fail text belongs in `lx` (failTxt → BẠI). Now: THÀNH «Sức ++», BẠI «Sức −− · thêm một tuần phạt» (looked at both devices). «còn N tuần» dropped: the side panel already shows «Tân Giả khố N tuần». BAL proposal addMax NOT built (git grep addMax dev/build = 0); no new number in the diff (law 4).
3. **Missed exam window** — covered (rank-pace 0–12 PASS on the build).
   Robot maid-even (4 × 72 months, rerun by me): build seed 2 = 69/72 months in Tân Giả khố (max rung 1); LIVE seed 0 = 72/74. Numbers CONFIRMED. The text fix does not change the bot, so the trap stays until the BAL proposal (term growth cap) is decided → MAIN / sếp.

## LAW 11 — WHOLE FAMILY (reviewer fix): maid act cards whose fail loss sat in the wrong row or was hidden
Scan: runtime srvCards() with preg + spyFor + pilfer open, each card with a fail → where its fail text renders; static (17b) in dev/test/rank-pace.js: no j42 card with a fail keeps «hỏng:» inside x.
| card (j42) | before (1990977f, = LIVE) | after (5f37b79a) |
|---|---|---|
| Nghỉ tay một lát | KÈM (THÀNH block) «hỏng thì thêm một tuần phạt»; THÀNH «· còn 6 tuần» | BẠI «Sức −− · thêm một tuần phạt» |
| Uống thuốc phá thai | KÈM under THÀNH «hỏng: băng huyết — …: khả năng vừa» | KÈM under BẠI «băng huyết — có thể băng huyết mà chết: khả năng vừa» |
| Lén giữ đồ Nội vụ phủ phát | THÀNH «thành: bán đi được bạc · tùy chủ xử (phạt …)», KÈM «hỏng: … bắt được», BẠI «có hậu quả · xem kết quả» | THÀNH «bán đi được bạc», BẠI «… bắt được · tùy chủ xử (phạt: Chủ tin −−− · hoặc tha …)» |
| Lén báo tin cho … | BẠI «Chủ tin −−−» only — the fail's 40 roll → srvLaundry (Tân Giả khố BAL.ag.why.srv.pun.spyOutWk) HIDDEN (law 3 / 6a) | BẠI «Chủ tin −−−», KÈM under BẠI «bị bắt thì đày Tân Giả khố 8 tuần» (8 = BAL) |
| Tự đi dò la cho chủ (jagknow) | rows SWAPPED: THÀNH «…, hỏng: nàng đoán ra», BẠI «thành: … chứng cứ …» | NOT changed: moving to lx still lands the gain in BẠI (kit sorter kaRows routes the «nếu … tìm ra» piece). **KIT REQUEST for the kit keeper** (law 9, not a reviewer fix): kaRows must keep an act card's x in THÀNH and route «thành:» / «hỏng:» segments of x to their own block. Same fault class game-wide: deck/act cards with «hỏng:» inside x (dialog options via kitParse are fine). |
Notes (pre-existing, not in this diff): SRVA.spy.out = 40 typed in j42 SRVA, not BAL (law 4) → Foreman D list.

## GATES (my runs, build = 1990977f, then 5f37b79a)
- rank-pace.js: ALL PASS (0–17 + new 17b); 17 now checks the BẠI row on the page; 17b fails on 1990977f (pilfer + abort), passes on 5f37b79a.
- srv-rank: 16/16 PASS (with LIVE old-save URL; 14/14 without it). promote-servants: 19/23 = LIVE baseline (same 4 FAIL rows: nobtn, Bạc road, gain+loss, NPC favour road).
- undef-scan PASS (360 names). page errors 0 (Fold + iPad).
- quickcheck.js (part 2, root index.html built locally WITHOUT committing; CDN host 403 here too): open ok, **old save from LIVE ok**; perf flagged longTaskMaxMs (3629 / 4109 vs live 2173 / 2500) — NOISE: base caa95310 in the same box gave 3208–4771, live 2081–4590 across runs; medians render/tab/buổi within live ± 15 %. Diff is logic + text only.
- Trial merges: onto review/lr-rules caa95310 = fast-forward; onto origin/main a96564ad = clean (auto-merge j42.js), merged build rank-pace ALL PASS, srv-rank 14/14.
- Root index.html / sw.js NOT rebuilt (worker 403 and mine: ctm-img host blocked by this environment's proxy) → the lander runs build_site.sh.
- Laws touched: 3 / 6a (loss shown) PASS after fix; 4 PASS (no number typed in the diff); 7 PASS (no %, kit odds words); 9 PASS (kit lx, no private part); 11 PASS after reviewer family fix (+ kit request above); 12 both devices looked at.

VERDICT: **PASS 5f37b79a** (review/d-maid-road-rv). Open: BAL proposal addMax (MAIN/sếp); KIT REQUEST kaRows x «thành:/hỏng:» routing (kit keeper); lander rebuilds root.

## LIVE MERGE (foreman order 28/11 09:06Z: the fault is on LIVE a96564ad)
**PASS 27fc24ae** = review/d-maid-road-rv-live = 5f37b79a merged onto LIVE a96564ad (clean, FF from a96564ad). Gates: rank-pace ALL PASS, srv-rank 16/16, undef PASS, quickcheck part 2 PASS on the 2nd run (the 1st run's single day-life 74 > 72 flag was noise; LIVE vs itself varies the same amount). Root index.html / sw.js not rebuilt (CDN 403) → lander.
