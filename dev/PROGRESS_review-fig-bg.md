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
