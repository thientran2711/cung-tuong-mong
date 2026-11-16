# PROGRESS — review/routes-port (D33: Lối riêng routes + trích huyết nghiệm thân + water-bowl picture)

Spec: OD:L184 (alternative routes), OD:L190 (blood test, tamperable, same rules for NPCs), OD:L192 (blood test animation/minigame);
SESSION8_QUEUE D33; OWNER_LEDGER §7 rows 81/82 + AM:L48 (water bowl drawable → draw). Old work: origin/review/routes @453203123
(dev/PROGRESS_routes.md = the old notes, kept; dev/STORY_ROUTES_PLAN.md = the design).

## What was done (base: origin/main a523531da8)
- Re-applied the 7 route commits by hand (jroute.js is self-contained): dev/build/jroute.js (after jmen in assemble.py), dev/test/routes.js,
  dev/measure/routes.js, dev/measure/routes_reach.js, plan + old PROGRESS. Every hooked symbol exists on main (scan: .tmp/syms.js).
  jmen's B4L night fix of the old branch is already on main. jdiff/jkc are not on main: jroute guards them (typeof).
- Water bowl: painted sprite img/kit/mg-nghiem-bowl.webp (Magnific gpt-2-6, folder ba4aecfe…, creation 4RuLckw9Aa → bg removed XmPnHuTBfo;
  480x289, 22 KB; uploaded with cdn_sync). Used in the tamper mini-game and the bowl scene (drops/ripples/gaze cones stay live marks);
  falls back to the old canvas bowl until it has loaded. Preloaded when a test is announced. Result label moved above the bowl.
- Bot fix (dev/measure/routes.js): window.__rtGo is on ONLY while the route policy reads the deck, off again before act(). Before: nested
  time steps inside act() let the inpage6 sensible bot take «Lối riêng» cards (a tc run started ẩn dật: n.ad_start=1). After: 0.
  Balance bots (window.__bot without __rtGo) never get route cards (rtCards gate, unchanged).
- Mệnh truyện: main replaced panel67 with jtabs ktStoryHTML; the «Lối riêng» block now hooks ktStoryHTML (sub-tab «Chương này») and is one
  kit rows block (rows67 → kitRows), first row «Lối riêng: <routes in progress>» (no bare h3).
- VANPHONG: men in route text are «y», not «hắn» (33 → 0 in jroute). «Chắc chắn» in option lines stays: it is the internal no-roll marker
  the kit reads (j17 ODDW) and is not shown.

## LUẬT SỬA CẢ NHÓM — quiet-life vow: which acts count as harming someone (RT_HARM) — scan of every A("…") on main
| | before (old branch) | after |
|---|---|---|
| harm acts on main covered | 15 of 30 (rumor frame poison block musk ksab kpoison pond kframe pushp trip plant catswap steal accuse) | 30 of 30 |
| added | — | lygian slowpoison huydung uyhiep giahoa blockf pgift thathu phonghoa batnat thaopet petsteal expose xinhh vp |
provoke/humiliate (old list) are not acts on main; kept, harmless. Not harm (left out): spy spyk ally bribe bribel gift petcare takeaway road tieuhuy trinhth trinhhh banphe tocao (true report).

## Tests (reducedMotion)
- dev/measure/routes_reach.js on this build: 15/15 endings reached through real cards/dialogs.
- dev/test/routes.js 755x1000@2 + 1180x820@2: 8 shots each (entry, steps, Mệnh truyện, blood-test dialog, mini-game intro/play,
  bowl, ending): 0 page errors, 0 horizontal overflow, 0 cut text.
- Old save: dev/test/ts-oldsave.js (main build → this build, same origin): loads, 12 weeks played, 0 errors.

## Bot measurement (for C7) — see table below (dev/measure/routes.js, sens bot inpage6 + route policy)
Runs on this branch 16/11 (60000 bot iterations each, sens bot, careful route player; small n — the machine is shared):
| route | lives | tries | result | per try | spec | verdict |
|---|---|---|---|---|---|---|
| Trốn cung (tc, careful: goes at Năm ăn năm thua+ or after 18 months) | 11 | 21 escape nights | 3 out (all «sống đời thường dân»), 18 caught | **14 %** (27 % of lives) | 10–25 % per try | in spec, unchanged numbers (bases 12/16/10/22/8, cap 45) |
| Rời cung hợp lệ (hl) | 6 | xuất gia 23 · phế 6 · ban hôn 1 · về quê 1 | 1 · 1 · 0 · 0 | xuất gia **4 %**, phế 17 % | rare, 5–20 % | in spec (old branch n=65: 6 %); vows stay hard |
| Tư tình (tt, meets whenever possible) | 5 | 11 meetings, 1 night | 8 seen, 10 caught by a consort, 6 reports, 5 exposed | exposed in 5/5 lives | reckless lover is mostly exposed | as designed |
| Ẩn dật (ad, never harms anyone) | 8 | — | 8/8 «Một đời an nhiên» (after 76–208 months) | — | 3 years, Đức 60, no harm | reachable; costs Sủng / no tablet / no rank-up |
Old branch (before main merge): tc careful 19 %/try, careless 9 %; xuất gia 6 %; tư tình exposed 54 % of lives.
Bot leaks: before the __rtAct guard, tc and hl runs each had 1 stray ẩn dật start by the balance bot; after it, tt and ad runs show
bot_leak=1 each (blocked, nothing ran). No global economy numbers touched; route numbers unchanged from the approved branch.
Raw: dev/measure/routes.js <tc|tt|hl|ad> 60000 (needs zz-test.html = dev/index.html with <meta charset>).

## Main bug seen (not in this branch's scope, ONE KIT KEEPER)
- On the Mệnh truyện tab the sub-tab row (.ktsub.kcattabs, z-index 6) is drawn ON TOP of the end-of-life «Kiếp này» dialog
  (also on the plain main build: elementFromPoint on the row = the row). Probe: .tmp/probe.js (not committed).

## KIT REQUESTS
- KIT §6.1 legend: register category `loi-rieng` «Lối riêng» `#2c6e5a` (jroute sets KIT_CAT["loi-rieng"] at runtime, as on the
  owner-approved branch; it is the Hành sự category tab «Lối riêng»). Not added to KIT.md by me.
- Mini-game frame seal «MƯU» for scheme/route mini-games (the frame now reads «TÀI NGHỆ»); scheme-games port owns it.
