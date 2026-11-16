# PROGRESS review/fig-bg — backgrounds behind full-body figures (owner 15/11 ~18:00Z)

Owner: Tuần lục person-page figures stand on bare paper; wants a simple, beautiful background per status (consort tier colour family,
maid ranks, cold palace, men's roles, Thái hậu) behind the book figure AND the kitEventDp left-column figure. No rooms, no people, no text.

## Step 1 (done, 15/11) — sample sheet only, NOTHING wired into the game
- Sheet: https://ctm-img.victoria-tntt.workers.dev/img/fig-bg-samples.jpg (2400x3680), local copy /home/user/wt/figbg-assets/fig-bg-samples.jpg
- 15 backgrounds (Magnific gpt-2-6, folder ba4aecfe…, 9:16, ~752x1344 full / 448x800 preview), local: /home/user/wt/figbg-assets/raw/{A,B,C}-{tan,hau,maid,emp,cong}.png
  - A = painted silk hanging scroll (rollers + brocade mount), B = round moon-window / silk fan disc on aged paper (halo behind the head),
    C = tinted silk wash + gold-leaf clouds, edges dissolve into the book paper (no frame).
  - Statuses sampled: Tần (pink/peony), Hoàng hậu (yellow/phoenix), hạ nhân (grey hemp/willow), Hoàng thượng (ochre/dragon-cloud),
    Vương gia/công tử (ink wash bamboo + mountains).
  - Magnific creations: A iGqjjlD3uK If6zz0mtvE KLM88fJkqp bxTBBfa5Y2 mE3YYXwhJQ · B rgemm1Mxtc MBwN6pQDCm 79vHqPBJAL 6AHxj2NiJO CqGVMb0EEy ·
    C gOIEu4kSXO 8aNGzFiIrU WDsOy8ncXe If6zn5wtvE TdS49fLVNR (order tan,hau,maid,emp,cong).
- Composites: dev/test/figbg/shoot.js injects a TEMPORARY style (background on .kbk-por and #modal .kpsubj.kes) into the live build and
  screenshots the real week book (kitBook person page, 755x1000) and a real kitEventDp dialog (1180x820); sheet built by dev/test/figbg/sheet.py
  (paths point at <worktree>/.figbg — copy raw/ there first). jobs.json = the 32 shots.
- Findings for step 2: .kbk-por is narrower than wide figures (queen's train, prince's cloak spill into the text column), so a framed
  rectangle (A) gets cut by the figure; B/C have no hard side edge and survive that. Dialog column is small: colour carries the identity there.

## Step 2 (waiting for the owner's pick) — one kit part (needs a section number from the coordinator)
Background layer behind kitStageFig figure (book + kitEventDp), keyed by status → colour/motif table; batch-generate the remaining statuses.

## Step 2 (16/11, owner picked A = silk hanging scroll) — DONE, KIT §61
- New kit part `dev/build/jfigbg.js` (after jopic in assemble.py): `kitFigBgKey(p)` -> key, `KIT_FIGBG` table (colour + motif per status, KIT.md §61), CSS paints the scroll
  on the figure's column through `border-image` (rods top + bottom with knobs + brocade mount keep their size, silk stretches). `kitStageFig` (jk4) writes `data-fb="<key>"` on the figure.
- Readers: Tuần lục person page `.kbk-por` and the event-with-person dialog column `.kes` (kitEventDp / kitEventStage). Kit sample §61 registered (KIT_SAMPLES).
- ONE figure size in the scroll: book `--kfr = .93 x min(1, kfr x KIT_FIG.man)` (j87) so men are not taller and the head keeps room under the top rod; dialog column already `min(1, fac)`.
- Crop rule: figure sits in the silk window, `overflow:hidden` -> wide robes cropped (Thái hậu, Vương gia), never spill. Dialog: `kitDpFit` widens the column by the border (jk4).
- Name chip in the dialog column gets a light halo (it sits on the painting). Book name stays on the paper beside the scroll.
- Art: 14 painted scrolls (Magnific gpt-2-6, 9:16, folder ba4aecfe..., all looked at, none redrawn except c3 + unk for thicker rods): `img/kit/figbg-{c0..c7,cold,emp,th,serv,man,unk}.webp`
  448x800, 8-49 KB (total ~0.37 MB, one download per status, on demand). On the CDN. Raw 752x1344 PNGs only in `.fb/` (deleted); Magnific ids: c3 bxTtmMT5Y2, c0 fHAppz9CDY, c1 tCi00ZsmZJ, c2 XmPzz6zBfo, c4 KLMhhBjkqp, c5 1lpaaIRr4r, c6 EbzddMiuuO, c7 lJ8FFEBgv9, cold P3Exxri42C, emp N2FsssQ6D9, th Do7ZZ2npcl, serv 8aNWWTkIrU, man 1lpaaucr4r, unk Bh4npEVoQR.
- Test: `node dev/test/figbg/scroll.js <build url> <outdir> [sizes]` (scroll painted + right key, head/feet inside the window, chip inside column, no overflow, no page errors).
- Not done / notes: a dialog with two people shows ONE scroll keyed by the first person (kes2). Old step-1 `shoot.js` (temporary CSS) is obsolete.

## C7 extra case (Foreman C, 16/11): thái y "Mời thái y bắt mạch" (review/thaiy-r1 @ f7c61f829) — bạc-equivalence
- Now: BAL.thy.cost = [6,8,10,12,15,20,25,35] (12.5-15 % of pay at every rank); her road = Sức -5, 3 khắc, 40 % a rival hears — flat at every rank.
- Fault: bạc weight stays the same share of pay while the walk (3 khắc of a busier day, Sức -5 when Sức is the gate for night/strong acts, a rival hearing = Danh/tai tiếng about a Phi/Hoàng hậu) weighs MORE with rank. High ranks: bạc 25-35 is trivial -> obvious pick.
- Proposed BAL change (apply on thaiy-r1/main after merge; NOT edited here): bạc share rises with rank from ~15 % to ~30 % of pay: `cost:[7,10,14,19,26,38,52,75]`, keep `khSelf:3, sucSelf:5, seen:40`
  (rank 0-2 bạc is scarce and the walk is cheap -> she hesitates; rank 5-7 the bạc is a real price against the walk). Do NOT make the walk costlier with rank (that re-opens the gap).

## Process note (16/11 ONE KIT KEEPER rule arrived mid-task)
Step 2 was assigned as the kit part §61 BEFORE the rule; kit files touched: new `jfigbg.js`, small hooks in `jk4.js` (kitStageFig data-fb, kitDpFit border width), `j87.js` (book kfr), `jsl.js` (clamp skips scroll pages), `KIT.md` §61, `figbg-*.webp` shared art.
No further kit changes were made after the rule. KIT REQUEST / hand-over to the kit keeper: review + own §61 (jfigbg + the 3 hooks) before merge; dialogs with two people use the first person's scroll (decide if a per-figure scroll is wanted).

## Kit keeper 1 (16/11, review/fig-bg-k1 = review/fig-bg merged onto main 02a0d3f1) — KIT OK
- Conflicts: kitStageFig (main added crossorigin + named chip) → kept main + data-fb; kitDpFit (main's KIT 32.2 cap + crop rewrite) → kept main,
  the scroll border is now taken INSIDE the capped column (Wmax − border, --kdpw = need + border), never widens past KIT_DP_COL; jfigbg.js moved to the end of assemble (after jact).
- Two-person open point closed: KIT 50.1 on main shows ONE person in the dialog column, so one scroll = that person's key.
- dev/test/figbg/scroll.js PASS at 1180x820@2, 755x1000@2, 844x390, 390x844 (rotate prompt), 1000x755, 1366x1024; shots looked at.
