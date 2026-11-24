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

## REVIEW (opus BIG reviewer session_01D3E3NX5CughfPF92X2Mv3Z, Foreman D depth 5, 24/11)
PRIORITY #1 CHECK ('d-followups-1 review' / 'pbHhMeDo hh:me@b' / 'svtNpcGreet' / 'one-core-khac'): OD 0 new | ledger 0 | claims: worker Na18fpno (SSK) → this review | main 502c48c9 (newest; no pbHhMeDo / svtNpcGreet / one-core-khac there) | review/*: d-followups-1 58f78dcd (target), promo-build-2-rv 70571e8a + servant-trust-rv 59ea20a8 (bases, both PASS, ancestors ✔) | archive 0.

**VERDICT: REVIEW PASS — LAND READY review/d-followups-1-rv 563d336be28b8099a26d7abf6a73cba7e80903fd (lands after servant-trust-rv + promo-build-2-rv; both are ancestors, origin/main 502c48c9 is an ancestor too)**

### My commits on review/d-followups-1-rv
1. da34f38b merge LIVE origin/main 22f1e491 (kit-toilring), index.html/sw.js rebuilt.
2. d4d71cb2 **law 4 + law 11 small fix (same family as item 3, missed by the new scan):** j77 `accMini` printed `${t} khắc` with `t = tc + 1` (a typed +1 glued through a variable — one-core-khac sees only `${x+1} khắc` in one expression) on «Xin yết kiến / Xin bái kiến / Lẻn vào»; j77 `accSneakLine` timed «vào được … buổi này» with `j77When(tc+1)`. Now `tc + BAL.btn.accAsk.k` / `tc + BAL.btn.accSneak.k` (both 1 = same values, no visible change). Hand grep after the fix: every `${v} khắc` whose v is assigned `…+N` in dev/build — none left (jerr/jptime «khắc ${i+1}» are clock labels, not costs).
3. 563d336b merge LIVE origin/main 502c48c9 (kit-titleplate / kit-noprewarn / kit-mapgo: UI + tests only; generated files rebuilt). One-core ×1 rerun after it: guard / text / bind / text-rule / khac PASS.

### 1. LAW 1 — co-op guest Hoàng hậu «đề cử» — PASS
- Intent `pbHhMeDo` (jcoopthinf reg8, ["who","wl"], level 8, `mine` = live, a real NPC, not her own copy) — the host runs the SAME `pbHhMeDo` in withSeat('b'): same `pbHhMeList` rules (cut, maxTo, rows, not open, kỳ), same gains (q72 debt to HER, meAff) and losses (mePassOan on every passed-over one).
- `pbHhOf` reads `hhGet(p)` = exactly the j24 hhBind getter on solo / host → no number change there; fixes the guest lens copy (plain value).
- Once-key: `pbHhMeKey()` = "hh:me" solo / host seat (old saves unchanged), "hh:me@b" on the guest seat AND on the host while it runs in her seat (COOPW.ctx) — test B0 checks phone key == host-in-her-context key ≠ host key. Once per life per queen, like the NPC route's "hh:<queen key>".
- coop-hh-decu (live Worker, level 9): **25/25 host Fold + guest iPad, 25/25 swapped** (host acts first in (A), guest in (B)); one later run crashed in harness setup before the world (S undefined at line 47, room join timing) — rerun below.

### 2. LAW 1 — NPC servants greet — PASS
`svtNpcGreet` sits inside svtPeer (every NPC servant ↔ other house act) and svTalk (NPC mistress «Hỏi chuyện»); her own seat is skipped (her greeting stays her choice). Greet = `svtGreetDo` (trSrvGreet regard + svtMet) for a servant, `greetName` (the ONE greeting) for a mistress; skip → the ONE `svtEtq`. Odds `svtNpcGreetO` = BAL.svt.npcGreet {base 70, talk −20, loyal +15, timid +10, 20–95} through nq (nết) — law 4. jagstaff `AS_DO.greet` and her «Hành lễ thỉnh an» now mark the greeting of this buổi (svtMet) — the mirror both ways. servant-trust **80/80 ×3** (+1 on the final head), svt-scan 67 sites / **0 UNWIRED**.

### 3. LAW 4 — typed khắc — PASS (with fix 2 above)
**Value check (my own script, not the worker's):** BAL dumped from the built page; every removed/added line pair of 6c92bd67 (dev/build/j*.js minus jbal*) compared after replacing each `BAL.…` path by its value and `${N}` by N, comments stripped, token diff:
| result | line pairs |
|---|---|
| identical after substitution (text, can, spend, whyTime) | 176 |
| only string form changed («"…"+x+"…"» ↔ template, `t2` var ↔ `whyTime(2)` inlined, `tv2` rename) | 24 |
| `hkK(k)` = harmK(p,k) in j78 evidence cards (was typed 2) | 8 — harmK = BAL.time.cost.harm (2) unless the act is sent through her bestSent person (ptRow harm): the card now prints what doAct really spends; no rule change |
| jtabs `cardCost({c:BAL.arc.card.c})` (was 2) | 1 — = 2 (c.suc −5) |
| j41 accSneak `can(tc+2)` → `can(tc+BAL.btn.accSneak.k)` (1) | 2 — dead code: j77 (assembled after j41) replaces accSneak/accSneakLine; the live gate is j77 `dayFit(tc+k)`, unchanged |
| dropped false lines (j93 weather «Đi đến nơi xa tốn 3 khắc», jwdinv «tốn: 0 khắc») | 2 (as reported; both were untrue) |
| new law-1 / wording code (not khắc) | rest |
→ **no balance value changed.** BAL.btn extended IN PLACE (one `btn:{…}` literal, jbal.js:319; one-core-guard «no second value» PASS ×3); BAL.artLes / BAL.empDay extended in their own literals. **Plant test:** a typed «Tốn 2 khắc» planted in j15 → one-core-khac FAIL and coregates **G1 FAIL** (g1-khac.txt), removed after. one-core ×3 (guard · text · bind · text-rule · khac) **PASS ×3** + PASS after the last merge.

### 4. LAW 7 wording — PASS
svTouch mover `mv`: shot (Fold + iPad, Sổ ghi, real game): «Tai mắt của ta bẩm: Ngân Linh, người của Quý phi Giang Uyển Hề, bắt chuyện với Cung nữ tam đẳng Phẩm Nhi, Phẩm Nhi không từ chối … Tai mắt của Giang Uyển Hề bẩm lại: Ngân Linh tìm gặp Phẩm Nhi, người của ta; …» — the one who came is the subject both lines; no %, cổ trang (voice layer prints «ta»). servant-trust holds the 3 direction lines (incl. srvFriendTip «X tìm gặp ngươi»).

### 5. Law 11 / law 9 — PASS
Scan tables in the worker report re-checked (svt-scan rerun, one-core-khac rerun + my value table + the j77 family miss fixed). No new UI part: the guest uses the same `pbHhMeOpen` kit sheet (Q card, kitRows, kit option cards Tốn/Được/Mất); greeting lines are Sổ ghi text. Laws 2/3 unchanged (each nominee option equal; gain + loss).

### 6. Gates (head d4d71cb2 = branch + LIVE 22f1e491, one at a time; then the final head after 502c48c9)
| gate | d4d71cb2 | final head |
|---|---|---|
| promo-build | 48/48, errors none | 48/48 |
| promo-exam Fold + iPad | 20/21; FAIL «old save loads: exam … card dealt» = LIVE 22f1e491 run (same 20/21, same line) | — |
| servant-trust | 80/80 ×3 | 80/80 |
| svt-scan | 67 / 0 UNWIRED | — |
| net-build | 189/189 | 189/189 |
| one-core ×3 + khac | PASS ×3 | PASS |
| npcmind-check LIVE → head | 55 people, ERRS [] | — |
| two-way-oldsave LIVE → head | ok, errs [] | — |
| coop-hh-decu | 25/25 (swap 0) + 25/25 (swap 1) | 25/25 + 25/25 swapped (one earlier run crashed in harness room setup before the world, S undefined; reran clean) |
| coop-e2e | 142/142 ×2 | 141/142 («A sees the reborn friend by her new name», rebirth naming — not touched here) then 142/142 on rerun |
| quickcheck | PASS (render 294/270, tab 565/590, buổi 1815/1714 ms new/live, old save ok, core gates PASS) | PASS (render 286/313, tab 541/565, buổi 3226/1820 median — box swing during co-op runs; open 2354 ms, old save ok, core gates PASS) |
Shots (scratch only, not uploaded, looked 3×): guest «Hoàng hậu đề cử» kit sheet on her phone — Fold 755x1000@2 (guest Mộ Dung Như Sương) + iPad 1180x820@2 (guest Đào Mi Trang): kit frame, figure, rows, two equal option cards Tốn/Được/Mất, no overflow / cut text; greet line in Sổ ghi on Fold + iPad (real game), wraps cleanly.

### Notes (not FAIL)
- ACC_ETQ.khac (j77) and SRVA.*.k (j42) are rule constants outside BAL printed as «${x} khắc» — not typed in text, but law 4 wants them in BAL; a later sweep (pre-existing, not this branch).
- The guest's Sổ ghi shows «Tai mắt của <NPC> bẩm lại …» (what the OTHER master learned) — pre-existing servant-trust wording.
- coop-hh-decu tests host-acts-first in (A) and guest-acts in (B) on one room; a guest-first-then-host order is not a separate case (same once-key code path).

~97% xong / ~91% chơi được
