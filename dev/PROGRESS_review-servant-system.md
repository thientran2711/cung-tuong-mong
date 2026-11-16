# review/servant-system (coordinator session 8, owner 16/11)
## A. Her household on her room stage (done)
- dev/build/jhouse.js (new, last in assemble.py): homePeople() adds every S.staff servant as {kind:"serv",ref,sid} after the maid and children
  (highest servant rank first, maids before eunuchs). KIT 33.7 slot rules (j59) place them; pages "+N"/"‹"; she once. Head count follows.
- Tap = kit person card (popCard) with the trusted maid's acts (Tâm sự, Sai đi dò la, Nghe ngóng chung — jwhy spyPick/spyMaidRun/j78
  now take an optional agent) + the Cung nhân acts (Thưởng/Phạt/Tra khảo/Tha lỗi/Che chở, Hỏi chuyện, Giao việc phòng bị, Xem người,
  Tiến cử, Đổi người). Same functions and costs; on the stage each takes the khắc shown on the card (1; Hỏi chuyện 2).
- Family fixes: trusted maid's stage card also has Giao việc phòng bị; "Sai đi dò la" (maid) was free and "Thôi" gave 2 khắc back — now
  the 2 khắc are paid when a target is chosen, "Thôi" costs nothing; lãnh cung stage shows the servant who stayed.
- Home visit is rebuilt when the household changes (fired / bought away / died) so nobody gone stays on the stage.
- Tests: dev/test/house-stage.js (1180x820, 755x1000, 844x390: all pass), dev/test/house-scan.js (before = main build, after = branch).
## Open (proposal, waiting for owner): see the coordinator report (B audit). NPC maid line (C) on this branch: jmline.js.
## C. Active NPC maid line (owner 16/11 approved) — dev/build/jmline.js, numbers BAL.mline (jbal2.js)
- j14 servRanks: the Emperor's eye now mlEye(p,s): any maid rank, BAL.mline.eye by rank × master Sủng × seeking; still needs roomFor("consort").
- Seeking (serve tea / stand where he passes), NPC master punishes (harsh nết) or uses her (losing favour); maids of hostile palaces fight /
  frame / poison each other; consorts bribe (bribeServ) / frame / beat other palaces' maids. Face marks via jface givers (mlFx).
- Headcount (dev/measure/hc_maidline.js, 2 seeds × 10 years, she passive, old rule vs line): consorts 14.28/14.09 → 14.30/14.31,
  servants 24.6 → 23.8/24.6, eye hits/yr 1.3/0.6 → 1.5/1.2, rises/yr 0.4/0.3 → 0.3/0.3 (the consort ceiling holds), seeking maids ~1.1 at a time,
  maid harm events ~4-5/yr palace-wide (she hears those touching her household, or all with Tai mắt ≥ 3).
