# errand-bal (E32, opus) — one BAL key for the errand act + the errand / servant / exam odds family (law 1, 4, 7, 11)
PRIORITY #1 CHECK ('errand|j95dice|SRVA.errand|offer:45|kcPhucPlay|kc2Play|3+R(6)'): OD 16 hits (L1908–L1953 = errand-scene UI, L1832 NPC purpose; no ruling on the number) | ledger 1 | claims: only errand-bal E32 + old errand-scene UI rows | main: j42.js:51 SRVA.errand.offer 45, j95.js:252 j95dice(15)/j95dice(50), jkc.js:514-516 + jkc2.js:352-354 + jentry.js:73-74 typed exam scores | review/*: review/errand-scene (UI only, no numbers) | no other worker on this family.
Branch **review/errand-bal**, base LIVE origin/main 548dcd0d. Commit: **be6302f6b8d4848e0774ca6d7cbdf59ce77812f0** (pushed).

## What changed
1. **One act, one number (law 1 + 4).** «Việc chủ sai» (a master sends her servant on an errand in a buổi) was 45 on her maid card (SRVA.errand.offer, j42) and 15 for every NPC servant (j95plan j95dice(15)). Now both read **BAL.errand.offer = 45** (jbal2.js, next to BAL.errand.n / msWalk). Value picked: **45, the card value** — it is the number the player sees and the maid road was balanced on; 15 was an un-named roster dice. The NPC side is only the FALLBACK path: with the agent loop on (default) NPC staff rows already come from the agent day plan, which runs the same SRVA rows (jagstaff.js:199 "the old errand dice give way to it"); the j95 dice runs when the loop is off (BAL.ag.on=0 / agDOn false).
2. **One errand list (law 1 two-way).** NPC servants went only to Thái y viện / Kính sự phòng (50/50, j95dice(50)); her card picked from Thái y viện / Ngự hoa viên / Cần Chính điện / Đức Thọ cung / a friendly palace. Now one function **srvErrList(m)** (j42) gives the list for a master; her card = pick(srvErrList(srvM())), the NPC servant = pick(srvErrList(owner)); the day-record "why" prints the same errand words ("chủ sai: mang kinh chép tay sang Đức Thọ cung"). No new player text.
3. **Whole family (law 11): 47 bare odds literals → BAL** with dev/measure/errand-bal-move.js (the one-core-odb-move pattern, values unchanged, BAL.odb block edited in place, comments kept): j42 19 roll(N) (servant road: caught, affair, pregnancy, prince, black-mail, buy…), j95 11 j95dice(N) + the j95 eunuch-tell 80 shared by its ag2Ch utility and its dice (one key dcPrepTell), j95 :139 eyes ×12 / spy +30 → dcJ95weekEye / dcJ95weekSpy, j95b 1, jkc 16 roll(N) (home / selection road). Keys BAL.odb.<module>.rl<Site> (roll) / dc<Site> (j95dice).
4. **Texts print the constant (law 4 + 7).** j42 typed chanceW(25) ×2 / chanceW(50) / chanceW(20) next to rolls of the same number → chanceW(BAL key). The spy card «khi ấy bị đánh chết: chanceW(30)» was FALSE: the real outcome is npwPick(kill vs Tân Giả khố, BAL.ag.why.srv.pun) — new **npwShare()** (jagwhy.js, same near/top/pow cut as npwPick) prints the true share. «Bạc +8», «Tân Giả khố 10 tuần», Chủ tin 10 after → BAL.ag.why.srv.pun.spyPay / lauWk / tin (code and text read the same key).
5. **Entry exam numbers (jkc.js:514-516, jkc2.js:352-354, jentry.js:73-74).** Typed bot score cl(3+R(6),0,10), skipped / broken round fin(5), «tính 5/10» → **BAL.entry.bot = {min:3,r:6,max:10}** + entBotRaw(); a skipped or broken round reads **entSkipRaw()** on every road (jentry already ruled "one not-playing value on every road" — kc2Play still gave a flat 5; now it does not). jkc kcScore for the other girls used raw:3+R(6) → entBotRaw() (same rule for her and them).

## Scan table (before → after, dev/build)
| family | before | after |
|---|---|---|
| errand chance (her card / NPC) | 45 / 15 (two numbers) | BAL.errand.offer 45 (one) |
| errand places (her / NPC) | 5 places / 2 places | srvErrList (one) |
| bare roll(N) j42 / jkc | 19 / 16 | 0 / 0 |
| j95dice(N…) j95 / j95b | 13 / 1 | 0 / 0 |
| chanceW(N) typed j42 | 5 | 0 |
| typed exam score (3+R(6), fin(5), skip?5, «5/10») jkc / jkc2 / jentry | 4 / 3 / 2 | 0 |
| one-core-guard inline count | 3776 (baseline 3930) | 3739 (baseline shrunk with --update, no grow) |
Left on purpose (named for the queue, not this errand family): j95 / j95b catch & rumour FORMULAS oddsCl(Math.min(N+eyes×k…,cap)) (j95 :408 :426 :454, j95b :204 :212 :220 :225 :226 :236) — a "catch odds" family of its own; jkc / jkc2 R(N) character-generation ranges (ages / stats, not act odds); j82 playArt default skip 5 «tính 5/10» (the generic mini-game engine, every playArt caller — own family, owner of the mini-game kit). NPC errands have no effect beyond the day record in the fallback path (her errand gives công lao / relAdd) — two-way of the EFFECT is the agent loop's (SRVA run), unchanged.

## Tests
- NEW dev/test/errand-bal.js (static): any typed literal in roll / j95dice / chanceW / od in j42 j95 j95b jkc jkc2 jentry fails; both errand sites must read BAL.errand.offer and srvErrList; typed exam scores fail; every BAL key read exists. PASS; self-test (inject roll(20) + j95dice(15)) → FAIL as it should.
- Runtime probe (Fold 755x1000, agent loop off, 200 buổi): NPC servant errand rate 45 % (1525 / 3400), places tyv/vuon/thu/tn/r*/kn (all valid record keys), why-text in Vietnamese, 0 page errors; entBotRaw 3..8, entSkipRaw 4; spy card text reads the true share.
- one-core-guard PASS (3739 ≤ baseline); one-core-text PASS; one-core-bind PASS (1295 prints, 0 mismatches).
- npc-purpose-scan: the BAL swaps changed the text fingerprints of 7 OPEN/LIVE-OFF rows + 3 done-texts in dev/test/npc-purpose-rows.json → fingerprints updated to the new text, NO row status changed (PASS 419 rows; G3 open 0 · live-off 15 · done 47 · out 29, as before).
- **quickcheck PASS** on be6302f6 (core gates PASS incl. hooks 6, time-spill PASS, old save loads + plays a buổi, perf new/live median render 253/284 ms, buổi 1240/1496 ms).
- **role-parity ×2: ALL PASS, outputs byte-identical.**
- **coop-e2e 68/68 PASS** (live Worker).
- **Own co-op check NEW dev/test/coop-errand.js: ALL PASS 16** — both seats are maids (origin cnv) in ONE live room (Fold host 755x1000, iPad guest 1180x820); on EACH seat: card and BAL read 45; errand offered at 41 % / 43 % over 400 draws; every errand from srvErrList and its card shows (165/165, 173/173); NPC servant fallback rolls the same number (44 % / 46 %); 0 page errors.
- Shots (looked at): CDN refused (401, same as E27) → dev/handover/shots/errand-bal/fold-maid-errand.jpg + ipad-maid-errand.jpg (maid road, «Việc chủ sai» card in the kit card list; no layout change, text only).

## Notes for the reviewer / merge
- review/home-chapters-r1 (E25r2) also edits jkc.js (kcFreeFid) — different lines; a re-merge should be clean, but re-run dev/test/errand-bal.js after it.
- No new kit part, no new player wording (the NPC "why" line reuses her errand words). Balance: unchanged except the NPC fallback errand chance 15 → 45 (the one number) and the NPC places now = her list.

SẴN SÀNG KIỂM errand-bal be6302f6b8d4848e0774ca6d7cbdf59ce77812f0
