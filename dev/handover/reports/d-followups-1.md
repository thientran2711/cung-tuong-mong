# d-followups-1 — law gaps left open by D's LAND READY branches (worker session_01D3E3Na18fpnoePCSKA3zqi, Foreman D, 24/11)

PRIORITY #1 CHECK ('guest queen nominate' / 'typed khắc' / 'greet servant' / 'tìm gặp'): OD 0 new rows | ledger 0 | claims: none other | main eae255e2: no pbHhMeDo intent, no svtNpcGreet, no one-core-khac | review/*: promo-build-2-rv 70571e8a (base; pbHhMe*), servant-trust-rv 59ea20a8 (merged; svtEtq / svtPeer / svTouch, BAL.svt), jcoopthinf reg8 (reused), BAL.btn table jbal.js:319 (reused, extended in place), hhGet/hhBind j24 (reused), greetName jgreet (reused) | archive 0.

## Branch
**review/d-followups-1** = review/promo-build-2-rv 70571e8a + merge review/servant-trust-rv 59ea20a8 (assemble list union: jpromob + jsvt) + newest origin/main eae255e2. Final sha: see the last line of this report.

## 1. LAW 1 — co-op GUEST Hoàng hậu «đề cử» (jpromob + jcoopthinf)
- `pbHhMeList`: a guest seat is no longer cut off when the intent road is on (`pbHhMeCoop()`: COOPW.thin.F.R.pbHhMeDo && level 8). Her phone shows the same act card (k = BAL.promoR.sp.meK) and the same kit sheet (pbHhMeOpen).
- Her pick = intent **pbHhMeDo** (jcoopthinf `reg8("pbHhMeDo",["who","wl"])`, level 8): the host runs pbHhMeDo in her context = the same pbHhMeList rules (cut, maxTo, rows, not open, kỳ), same gains (nợ ân hhOwe in HER q72, thiện cảm +meAff) and losses (passed-over oán +mePassOan); her log line comes back with the answer.
- Root found on the way (same family, law 11): on a guest the NPC copy's `v.hh` is a plain lens value computed host-side (j24 hhBind getter = aff(queenP(), v) is lost) → her list was always empty even with the gate open. `pbHhOf` now reads `hhGet(p)` (identical to the bound getter in solo / on the host).
- Once-key per seat: key(S) is "me" on both seats → the host's and the guest's nominations shared ONE once-per-life count. `pbHhMeKey()` = "hh:me" (solo / host seat, old saves unchanged) / "hh:me@b" (guest seat, phone = host-in-her-context).
- NPC queen route unchanged.
- Test **dev/test/coop-hh-decu.js** (new, live Worker, level 9): (A) host queen — list, act card, pick → hh exam + once-key, guest copy shows it, not listed again; (B) guest queen — her rank reached, intent on, her list = the host's list in her context, act card khắc from BAL, equal kit sheet, pick ran on the HOST (exam + once-key hh:me@b), her phone shows it, ân owed to HER, every passed-over oán her, her log line back, not listed again, a second pick refused on the host; host life untouched; no page errors. **25/25.**

## 2. LAW 1 — NPC servants (and NPC mistresses) greet the other master (jsvt)
Before: only HER greeting counted (greetName / chatMark); every NPC servant's open act beside the other master was bất kính by construction; her own cung-nữ «Hành lễ thỉnh an» and the NPC servant's mirror act «greet» did not count as a greeting at all.
| site | before | after |
|---|---|---|
| svtPeer (NPC servant ↔ servant of another house: jagstaff chat / gift / ask, svtMonth asks) | never greets → always bất kính if the master stands there | `svtNpcGreet` inside its own tick: greets first at odds `svtNpcGreetO` = BAL.svt.npcGreet {base 70, Nhiều lời −20, Trung +15, Nhát +10, clamp 20–95} → the same greeting as hers (trSrvGreet gain + greeting of this buổi); skips → bất kính (the ONE svtEtq) |
| svTalk by an NPC mistress («Hỏi chuyện» with another house's servant) | never greets | the same svtNpcGreet; a mistress greets through greetName (jgreet, the ONE greeting function) |
| jagstaff AS_DO.greet (NPC servant «greet» a higher consort) | no AS_DO entry → only Danh +1, no regard, no greeting | `svtGreetDo`: the consort's regard (trSrvGreet) + the greeting of this buổi — the mirror of hers |
| her cung-nữ «Hành lễ thỉnh an» (j42) | regard only, not a greeting for the bất kính rule | + svtMet (greeting of this buổi) |
| her own open acts | her choice (greet card / talk / greetName) | unchanged — no auto-greet for her (a === S skipped) |
Churn (dev/measure/svt-churn.js 14 months, consort life, after): 42 weeks, bất kính 7, NPC greetings 8, NPC skips 7, 0 servants returned (before, servant-trust r1 report: bất kính 8 / reviewer 14 world-wide in 14 months, NPC greetings 0).
Tests (dev/test/servant-trust.js, now **80/80 ×3**): NPC servant greets → no bất kính; skips → bất kính; AS_DO.greet counts; odds from BAL; NPC mistress greets her first → no bất kính; cung nữ «Hành lễ thỉnh an» then gift to that master's maid → no bất kính. force() pins BAL.svt.npcGreet so the old bất kính lines stay deterministic.

## 3. LAW 4 — every typed khắc in player text (whole game)
Scan **dev/test/one-core-khac.js** (new, acorn: every string literal + template quasi in dev/build/j*.js; plus a number glued into a khắc text `${tc+1} khắc`; «||0» fallbacks are not costs). Wired into dev/tools/coregates.sh G1 (no baseline: always 0).
| | before (merged base 7de43b26) | after |
|---|---|---|
| typed «N khắc» in strings | 139 (33 files) | 0 |
| glued `${x+1} khắc` | 7 (j41, j77 sneak / ask / lead) | 0 |
| total | **146** | **0** |
Per file before: jwdinv 10 · jtabs 10 · jmen 9 · j78 9 · jveil 8 · jtsb 8 · jrcp 8 · j10 8 · jlost 6 · j85 6 · jopic 5 · jinv 5 · j53 5 · j15 5 · jpet 4 · jgift 4 · jecon 4 · j83 4 · j8 3 · j41 3 · jkitpage 2 · j72 2 · j54 2 · jtoil, jkc, jitd, jht, jaudit, j93, j61, j55, j25, j23 1 each.
Every card now prints the constant its rule spends, and the rule's can() / spend() / whyTime() read the same key (no number in text and rule both typed):
- BAL.btn (jbal.js:319, the existing per-button table, extended in place): svHoi, svSearch, svPlant, svLook, svMua, svDoa, fac, kidAct, accAsk, accSneak, accLead, h54Noi, h54Ban, k61Ask, empAct, give, itemUse, inspect, kidTut, kidFav, q72, wkGive, wkSell, econSell, dbsv, virLes, pkBan, wear, loAct, men{ask,bao,ccti,giau,nghe}, petShop, rcpRead, rcpTy, rcpSpy, tsb{k,th}, veilCraft, veil, wdTrade, groom (39 keys, values = the old typed numbers: no balance change).
- Existing keys reused: BAL.kidTeach.k, BAL.btn.courtHoi.k / wkShow / loSneak, BAL.svt.k, BAL.time.cost.harm via harmK (j78 evidence acts = what doAct spends), BAL.time.cost.talk/talkAct (kit sample page), BAL.walk.near (jkc city), BAL.pet.khac, BAL.toil.khac, cardCost(BAL.arc.card.c) (as j67 already did); new BAL.artLes.k / pk (art lesson / practice), BAL.empDay.k.
- Dropped: j93 kitWxEffects «Đi đến nơi xa tốn 3 khắc (ngày thường 2)» (false since walk-cost r3 — travel has no weather term — and already filtered out by jclose); jwdinv «Tự chọn đồ · tốn: 0 khắc» (it spends nothing: the price line now starts at «thành:»).
- Note: j41 accSneak (overridden by j77) checked can(tc+2) while spending 1 + tc; now can(tc + BAL.btn.accSneak.k) like j77's dayFit.
one-core ×3 (guard · text · bind · text-rule · khac): **PASS ×3** (inline numbers 3112 → 2840 vs baseline 3592).

## 4. WORDING (law 7) — «ngươi tìm gặp X» when X came to her
`svTouch(a, s, kind, at, mv)`: mv = who MOVED; the after-line is picked by the mover. The two-way chat (svtPeer: svTouch both directions) passes the one who came; j42 srvFriendTip passes the friend (she came to her).
| case | before | after |
|---|---|---|
| another house's servant came to HER servant (second line) | «Hoa Tuệ, người của ngươi, tìm gặp Tình Văn» | «Tình Văn tìm gặp Hoa Tuệ, người của ngươi» |
| HER servant went to another house (second line) | «Hồng Ngọc, người của …, bắt chuyện với Hoa Tuệ» | «Hoa Tuệ lén sang bắt chuyện với Hồng Ngọc, người của …» |
| she (cung nữ) chatted with another house's maid, her own master hears | «X lén tìm gặp ngươi» | «ngươi lén tìm gặp X» |
| a friend of another house came to her (srvFriendTip) | «ngươi tìm gặp Hồng Ngọc» | «Hồng Ngọc tìm gặp ngươi» |
Family scan: every «tìm gặp» line in dev/build (j67 ×3, jrd_td, j68sd, jmen, jsvt ×3): the event texts name the visitor as subject already («{v} tìm gặp ngươi»); jmen is a label. Only jsvt had the direction bug. Tests in servant-trust.js (3 lines).

## Gates (head before the report commit)
| gate | result |
|---|---|
| promo-build | 48/48, errors none |
| promo-exam (Fold + iPad) | 20/21, FAIL set = LIVE (old-save exam card — same on LIVE) |
| servant-trust | 80/80 ×3 |
| svt-scan | 67 sites, 0 UNWIRED |
| net-build | 189/189 |
| one-core ×3 (+ one-core-khac) | PASS ×3 |
| npcmind-check (LIVE save → head) | 52 people, 0 missing, ERRS [] |
| two-way-oldsave (LIVE save → head) | ok, errs [] |
| coop-hh-decu (new) | 25/25 |
| coop-e2e | run 1: 141/142 (FAIL «after week 1: same world» S.fidUsed.52 face id — face pick, not this branch); run 2: **142/142** |
| quickcheck | **PASS** · render 270/285, tab 662/602, buổi 1664/1719 ms new/live · old save ok · core gates PASS |
Shots (Fold 755x1000 + iPad 1180x820 @2, looked at 3×, scratch only, not uploaded): «Hoàng hậu đề cử» kit sheet — frame, figure, rows, equal option cards Tốn/Được/Mất, «Kéo xuống», no overflow / cut text on both. The khắc cards print the same numbers as before (values unchanged), so no visual change elsewhere.

~97% xong / ~91% chơi được

**FOR FOREMAN D: SẴN SÀNG KIỂM review/d-followups-1 58f78dcdda0fcbaba661573e65ef855cfc725954**
