# coop-thin F4 — her pets / garden / kitchen / study as intents (on the F1 wrapper TH.F.reg) — STEP 0 (report first)

PRIORITY #1 CHECK ('petDo|petShop|petcGain|petcMaid|shelfPlant|rcpRead|rcpAskQ|tdsRun|wkFinishLesson|lessonMode|q72Do|TH.F.reg'): OD 0 new | ledger 0 | claims: CLAIMS row 'coop-thin F4' (this worker) | main 98f9f0f: no F4 registration | review/*: review/coop-thin-f3 f659cf7b (base, reg8 + KSH nvp; F3 report names the pet shop = F4), review/coop-thin-f2-r2 (quiet-gate fix, not merged yet), no review/coop-thin-f4 | archive 0.

Worker session_01N1tNP2DFfqtxibVd8wgyr6 (opus), successor of F3 worker session_01N1tNP4NVrwK67H3DPhD9Ld; coordinator FOREMAN B ROOT-4 session_01N1tNP5E7rYx1LwH4fEBuk8. depth 5 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f4 STACKED on origin/review/coop-thin-f3 f659cf7b. Worktree /home/user/wt/f4 (sparse). Level **9** (`TH.CAP` 8 → 9; Worker THINMAX 9).

## 0a. Entry points (base f659cf7b) and which part moves them
What the game has: pets (jpet / jpetcare); NO garden system of her own (no S.garden): "garden" = the potted plant on her display shelf (jshelf), the Ngự hoa viên place (goTo = F2), Lãnh cung deck card "Trồng rau" (deck), quest steps (j72), summons (jts). Kitchen and study are ONE pipeline: the art lesson chain (Tài nghệ: lessonMode → wkAsk → wkrMat → playArt mini-game → addArt + wkFinishLesson; "Nấu món" = work kind mon, game k91Cook), plus recipe books (rcpRead), the taste questions (rcpAskQ), Tứ đức lessons (jtd / jtds).
Rule used for the split (brief: "Mini-game scores belong to F5"): an engine that receives a mini-game SCORE = F5; a tap that ends in an engine with no game = F4; the generic deck runner act(i) and event / quest card families = F6 (they span every area).

| # | area | entry (guest tap) | file:line | engine | part |
|---|---|---|---|---|---|
| 1 | pets | pet card Cho theo hầu / Gửi về Ngự thú viên (`data-pet` follow / free) | jpet.js:236-238, :250-252, click :285 | `petDo(k,b)` (wrapR card) | **F4** |
| 2 | pets | pet shop tile (Nhờ thái giám tìm thú nuôi, kitShop key 'pet') | jpet.js:272 (onBuy → petBuyOne :261), click jinv kitShopBuy | `kitShopBuy("pet",k,q)` | **F4** (KSH key 'pet') |
| 3 | pets | Chăm → Giao <maid> chăm (`data-petc="maid"`) | jpetcare.js click :128 | was inline (P.maidW=…) → new engine `petcMaid(i)` (solo identical) | **F4** |
| 4 | pets | care game "Để trời định" (`#kpcquick`: the roll) | jpetcare.js :131 | was inline → new engine `petcQuick(kind)` | **F4** |
| 5 | pets | care games Cho ăn / Tắm / Chơi → score | jpetcare.js petcGain(kind,score) :96 | score | **F5** (spend of the game start = her khắc clock `used`, stays on her phone as F1–F3) |
| 6 | pets | Chăm (opens the care screen), Nhờ thái giám tìm (opens shop) | jpet.js :242, jpetcare petDo care wrapper | UI only, read-only | stays local |
| 7 | garden | shelf plant "Để trời định" (`#kshpquick`: the roll) | jshelf.js :393-394 | was inline → new engine `shelfPlantQuick()` (ctx SHPC.g) | **F4** |
| 8 | garden | shelf plant water game → score | jshelf.js shelfPlantGain(score) :385 | score | **F5** |
| 9 | garden | Ngự hoa viên walk; "Dâng hoa" talk | goTo / talk | already | F2 |
| 10 | study | read a recipe / sutra book (`data-rcpread`) | jrcp.js :214, click :219 | `rcpRead(ix)` | **F4** |
| 11 | kitchen | Hỏi thái y kiêng kỵ / Sai cung nữ dò la khẩu vị (`data-rcpq` → card) | jrcp.js rcpAskQ :284 (option go closures) | card local (read-only) → choice = new engine `rcpAskGo(how,r)` (closure body moved, solo identical) | **F4** |
| 12 | study | Tứ đức "Tự học" at bậc 5 (no game) | jtds.js tdsPractice :130 → wkAsk → wkrMat → `tdsRun(k,"prac",pick)` :104 | `tdsRun` (prac only) | **F4** |
| 13 | kitchen/study | art lessons, practice "Tự học, làm tác phẩm", "Học lối mới với thầy", Tứ đức lessons with a game | j23 lessonMode, j83 wkPractice, jrcp rcpMaster, jtd tdPlay → playArt / kg82 → onDone(score) → addArt + wkFinishLesson / tdFinish (cost deferred to jaudit aaPayMG) | score | **F5** (the pickers before the game are cards on her phone) |
| 14 | kitchen | give / sell / show a dish or work | wkGive / wkPoison / wkSell / wkShow | already | F3 |
| 15 | study/garden | deck cards "Đọc sách…", "Chép kinh, giữ đức", "Trồng rau" (Lãnh cung) | j2 act(i) → runOpt | the generic deck runner (every area) | **F6** |
| 16 | all | quest steps "Hái hoa…", "Chép kinh…", "Chép sách" | j72 q72Do / q72Drop / q72Ask / q72Call | the quest family (every area) | **F6** |
| 17 | all | event / story options (cháo Lạp bát, chè, chép kinh…), ma ma bếp núc, du hồ summons | chooseM option go / tsGame | D cards / F5 game | D / F5 |
| 18 | pets | pet naming | none in code (pets are not named) | — | — |

## 0b. How each registers on TH.F.reg (level 9)
`reg9` = F3's reg8 at level 9 (same arg kinds me / ix / who / wl / v; + "el" = a tapped button travels as its dataset, + "pm" = a person or HER). ctx = CX8 + PETC.i / SHPC.g (the open care screen). Registered: petDo (mine: k follow / free; care stays the local UI router), kitShopBuy key 'pet' (KSH), petcMaid, petcQuick, shelfPlantQuick, rcpRead, rcpAskGo, tdsRun (prac).
Her care screen on the HOST: petcDraw / petcClose / petcGrowCard / the shelf plant panel draw touch the DOM (and petcClose → closeModal = the HOST's queue) → inside her context on the host they do not run; they are captured (TH.uiCap) and replayed on her phone with the answer (her pet / plant from her patched S).
Old guest path for the moved rows: unreachable at L9 (one switch); deleted for good when L9 is the default (part H).

## 0c. Tap-to-screen time before
Today (L8) every row above is local on her phone (one render, F3 measured 93–249 ms, median 150 ms); measured again as the L8 column of coop-thin-f4.js in Done.

## Done — SẴN SÀNG KIỂM b4f2031c (review/coop-thin-f4, pushed; stacked on review/coop-thin-f3 f659cf7b; F2-r2 / F3-r1 / main NOT merged yet — waiting for Foreman B)
Touched vs f659cf7b: dev/build/jcoopthinf.js (F4 block: reg9, kinds "el" / "pm", ctx CX9 = CX8 + PETC / SHPC.g / TDV, UI capture of her screens; kitShopBuy pet only at level 9), jcoopthin.js (CAP 8 → 9), jpetcare.js (petcGrowCard, petcMaid, petcQuick), jshelf.js (shelfPlantDraw, shelfPlantQuick), jrcp.js (rcpAskGo) — every solo refactor = the same body moved into a named function; dev/test/coop-thin-f4.js (new), coop-thin-trip.js (F4 bucket); index.html / sw.js / assets.json (build_site.sh).

### Moved paths (level 9; below 9 + solo unchanged)
| area | engine (her tap → `do f`, the host runs it in her context) | L8 (before) | L9 |
|---|---|---|---|
| pets | petDo follow / free (wrapR card on her phone: snap soft + noRes) | her phone | P1 / P2 green, same as solo (twin) |
| pets | kitShopBuy key 'pet' (pet shop, petBuyOne odds + roll on the host) | her phone | P3 green (bạc −price, a pet or the sick-pet line) |
| pets | petcMaid, petcQuick (the "Để trời định" roll) | her phone (inline in click handlers) | P4 green (twin) / P5 green |
| garden | shelfPlantQuick (her shelf plant "Để trời định") | her phone | G1 green |
| kitchen | rcpAskGo (Hỏi thái y / Sai cung nữ dò la: the card choice) | her phone (option closure) | K1 green (twin) / K2 green |
| study | rcpRead (sách phổ) | her phone | R1 green (twin) |
| study | tdsRun prac (Tứ đức Tự học bậc 5, no game) | her phone | T1 green: the work in her bag on both phones (one place) |
Her screens on the host (wrapper gap proven by P5 / G1): petcDraw / petcClose (→ closeModal = the host's own card queue) / shelfPlantDraw / petcGrowCard (a 60 ms timer → "đã lớn" card on the HOST) do not run in her context there; captured (TH.uiCap) and replayed on her phone with the answer (P5 / G1: her screen open on her phone, none on the host).
Level leak fixed: F3's kitShopBuy took any KSH key; the pet key is level 9 only (L8 run: P3 local again).
F5 (not moved): petcGain / shelfPlantGain (care-game scores), the art lesson / cooking / practice / Học lối mới / Tứ đức games (playArt / kg82 → addArt + wkFinishLesson / tdFinish, cost deferred by jaudit aaPayMG). F6: deck act(i) cards (Đọc sách, Chép kinh, Trồng rau), j72 quest steps.

### Quiet-gated emitters reached by F4 acts (fix = review/coop-thin-f2-r2, not rebuilt here)
| emitter | reached from | silenced at L9 today |
|---|---|---|
| jtq14 introCard / doneCard (jtq14.js:117, :128) via note("buy") on the kit shop onBuy (jtq14.js:156) | kitShopBuy pet | yes |
| jtq14 note("art") via addArt / addVir (jtq14.js:163-164) | not reached by F4 acts (lessons with a game = F5) | — |
| jpetcare petcGrow quiet flag (own argument) | petcQuick → petcGain | no (and the card itself is captured → her phone) |

### Tripwire (guest writes outside fromCanon during the F4 act table, TRIP=1)
| | L8 (before) | L9 (after) | L9 swap |
|---|---|---|---|
| F4 entry (engines above) | **197–243** (wdOf __wdmig, log, petcInit S.pets, mkSync, petBonus, shelfPlantGain S.shelf …) | **0** | **0** |
| "?" / F1 / D·patch | 199–207 / 212–216 / 54–78 | 291–301 / 292–302 / 303–330 | 291 / 292 / 303 |
"?" and F1 rise with the number of renders (each answer = one render): their top writers are the render writers mkSync S.mk / S.mood, wdOf, leAttire (F6 / G items, same picture as F3); D·patch = designed.

### Latency (tap → answer on her phone, live Worker, n = 10)
| profile | median | min–max |
|---|---|---|
| L8 before: the tap itself (local) | 159–168 ms | 76–369 |
| L9 no throttle, guest iPad / swap guest Fold | 731 / 419 ms | 441–1142 / 355–642 |
| L9 4G (LAG 85 + host CPU ×4) | **1206 ms** | 1106–4656 |
Pending shows at once (D1: second tap ignored, one intent).

### Tests (live Worker)
| test | result |
|---|---|
| coop-thin-f4 L9 / swap / 4G / L8 (old road) | 18/18 / 18/18 / 17/17 / 16/16 |
| coop-thin-f3 L9 · f2 L9 · f1 L9 | 36/36 · 19/19 · 22/22 |
| coop-thin-a L1 / b L4 / c L4 / d L4 / e L5 | 24/24 / 136/136 / 17/17 / 46/52 (= main: 6 kit sameDom) / 33/33 |
| coop-cyc THIN=9 | 66/66 (mixed-build part skipped: no .tmp/old.html) |
| coop-e2e / COOP_SWAP=1 | 63/63 / 63/63 |
| coop-one-world seeds 1–10 | 10 × PASS |
| one-core guard / text / text-rule / bind | PASS ×4 |
| quickcheck fc424b08 | PASS (old save ok; render 243/255, tab 481/488, buổi 1406/1126 ms new/live; core gates PASS) |
Not run this round: coop-night / timer / p2 / b1 / e-net (F4 touches no night / timer / pairing code; reviewer may run).
LOOK (scratch, deleted, nothing uploaded): guest iPad 1180x820@2 her care screen after P5 (kit frame, "Vừa rồi No +20…" row redrawn from the host's answer) and her plant screen after G1; host Fold 755x1000@2 shows only his own screen (no care / plant panel of hers). The test's rank edict sits over the care card (staging, as F3). The plant card sub-title shows the test's slot key "f4p" (staging).
Laws: 4 no new number (one-core PASS) · 6c the work made in ONE place (T1), pets counted both phones · 7/9–12 no new word, no UI part changed · 1 n/a (no act between the two in F4).
FOR B: (1) merge F2-r2 / F3-r1 / main when you say, then rerun f4 L9 + swap; (2) mini-game score ends + cost deferral (aaPayMG) = F5; deck act(i) + j72 quests = F6.

## Merge round (B ROOT-4 07:18Z) — SẴN SÀNG KIỂM ac66808f
= b4f2031c + merge origin/review/coop-thin-f3 abb9a6a6 (carries f2-r2 final 083227d4 TH.tapRun + main) e98beaf8 (conflicts only index.html / sw.js: rebuilt) + fix (TH.UICAP, below) + build_site.sh.
Gap found by the merge: f2-r2's TH.uiPlay plays only names in its UICAP set → F4's captured screen redraws (petcDraw / petcClose / shelfPlantDraw / petcGrowShow) were dropped on her phone. Fix: jcoopthin exposes `TH.UICAP`; the F4 block adds its 4 names. P5 now checks her care screen is REDRAWN with the result (not just open): green.
Quiet gate: TH.tapRun runs every registered act with quiet off → the jtq14 task cards of the pet shop (note "buy") reach her Q (part D), the floaters / toasts replay on her phone.
Gates after the merge: coop-thin-f4 L9 18/18 · swap 18/18 · TRIP F4 entry 0 / 0 · f3 L9 37/37 · f2 L9 25/25 · cyc THIN=9 66/66 · e2e 68/69 → alone 68/68 (the miss "B reborn as a new person" ran beside 2 other suites) · e2e swap 66/68 beside quickcheck (guest Thái hậu picture not loaded yet) → alone 68/68 · quickcheck PASS (render 275/268, tab 464/449, buổi 1172/1265 ms new/live; old save ok).

## Main round (B ROOT-4 07:19Z, report to B ROOT-5) — SẴN SÀNG KIỂM 8d48cc57
= ac66808f + merge origin/main 950508fc (15002e3e; conflicts only index.html / sw.js → rebuilt) + test commit 8d48cc57 (generated files built at 15002e3e; test-only after).
- coop-thin-f4 L9 20/20 · swap 19/19 (K2 skipped: nobody left to ask) · TRIP F4 entry 0 / 0 · quickcheck PASS (render 237/255, tab 464/434, buổi 1174/1421 ms new/live; old save ok) · coop-e2e 68/68.
- C1 (as F3 'W'): every «Xong việc» line her F4 acts earn → its card on HER phone once, none on the host. This run earned no task line (her road's task nhap14 = an / di / trang, no buy quest; a synthetic sung14 staging did not match the task variant, removed) → the check is conditional, like F3's. The path itself is the one F3 W proved: every registration (reg9 too) runs through F.reg's host run = TH.tapRun (quiet off).
- F2-r2 quiet scan over the F4 roots (`ROOTS=petDo,petcMaid,petcQuick,shelfPlantQuick,rcpRead,rcpAskGo,tdsRun,kitShopBuy`; the scan now also parses reg8 / reg9 / the F3 UI tuple list — before, F3 + F4 roots were missing from its root list): 32 of 41 global-quiet reads "reachable" (static, over-approximate: most paths go through closeModal → tryEnd → nextBuoi, which a registered run never takes). The direct ones: apply (j1:139, j11:78, j85:70, jagknow:380: screen / Sổ ghi suffix), spend → errCan / screenOff (behaviour gates), jagknow tmTry / tmFear (Sổ ghi), jtq14 doneCard via note (kit shop onBuy). All run with quiet OFF inside TH.tapRun since f2-r2 → not silenced; screen effects captured (UICAP) and played on her phone.
