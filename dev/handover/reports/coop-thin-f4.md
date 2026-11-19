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
