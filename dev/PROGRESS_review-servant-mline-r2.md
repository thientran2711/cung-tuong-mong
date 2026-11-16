# PROGRESS review/servant-mline-r2 (worker, Foreman D) — fixes of the reviewer FAIL on servant-system part C
Base: origin/review/servant-mline-r1 @93b39ee3 + merge of origin/main 399483e3 (generated files rebuilt).

## FAIL item 1 — gain and loss (numbers decided by us, BAL.mline in jbal2.js)
- ONE caught key per harmful act: frameCatch 30 (a maid frames another palace's maid), poisonCatch 40 (Thái y traces a maid's poison;
  the poisoner goes to Thận hình ti), hitCatch 30 (a consort's frame of another palace's maid). A beating is done in the open: always a deed.
- Caught (mlCaught): a true deed on the master (jtruth deedAdd, weight 1 frame/beat, 2 poison), the victim's mistress (ANY mistress, not
  only the player) gets evN×w proof (evA, capped by true deeds) and oán +caughtOan×w; the master Đức −caughtDuc×w, Danh −caughtDanh.
  Caught frame: the framed maid is cleared (not punished / not thrown out), the framer is made to kneel by her own master.
  When the player's own maid did it (she gave no order): no deed and no proof on her; she loses Danh −caughtDanh, the victim resents her.
- feudEv removed (it gave proof only to the player and, with no deed behind it, evA found nothing). hitEv stays for the beating (now with a deed).
- use: the master pays useBac 20 bạc (dress, rouge), and a used maid who rises turns her back at useTurn 35 %. "Losing favour" is now
  Sủng ≥ useGap 20 under the harem median (the old Sủng < 30 met a master with maids in 9 of 1737 maid-months: use never happened, before = 0).
- Fight: the slapped one is either side (was always the other palace's maid).
- j14 rise literals 60 / 25 -> BAL.mline.riseLoy / riseRel (ONE CORE).
## FAIL item 2 — co-op whole family
- servRanks (j14): NPC households skipped on the guest (merit, rises, wages, "bought by a bigger consort"); jaudit đề bạt skipped on the guest.
- servMonth (j10): on the guest an NPC household's loyalty decay, NPC-vs-NPC spy reports and refilling are skipped; her spies' reports,
  her servants' friends and NPC acts aimed at her (pickTarget gives only her on the guest) still roll.
- mlMonth: on the guest NPC consorts' maids feud with HER maids and NPC consorts hit HER maids (so her household is a target in co-op too);
  her own maids seek his notice. Her maids attacking NPC maids and every NPC-vs-NPC act roll on the host only.
- mlEye: no rise on the guest at all (a new consort made on the guest is dropped by the week merge, PROTOCOL §4.4 "new ids only in B under W
  dropped"), so a guest maid's rise is not possible yet -> coordinator note below.
## FAIL item 3 — wording + cooldown
- "Tai mắt báo: X, người hầu của <chủ>, …" (rank no longer read twice). seekCd 6 months before the same maid seeks again (after a seek ends
  or she is punished).
## Tests (server on a free port, one at a time)
- dev/measure/sim_maidline_r2.js (before = r1 build 93b39ee3, 4 runs; after = this branch, 5 runs; 300 months, Tai mắt 3, 3 maids of hers): table in the report.
- dev/test/mline-guest.js (new): guest run changes no NPC-only state (merit 0, rises 0, refills 0, loyalty decay 0); before: 612 / 0 / 360 / 487.
- dev/test/mline-oldsave.js: main save loads, 24 months, 0 errors. dev/test/coop-e2e.js: 59/59 (a first run 59/60, "fold #next enabled" timing; rerun clean).
- dev/test/evtruth-scan.py: no new unchecked evA (2 old ones in jlost.js). dev/test/mline-shots.js 6 sizes: no overflow, 0 errors, no %.
