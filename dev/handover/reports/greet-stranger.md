# greet-stranger (owner bug OD 18/11 ~01:38Z) — worker session_01UV1SzknEXr3P2cemBDGhow
PRIORITY #1 CHECK: OD 17/11 ~05:12Z (greet naming rule) + ~05:25Z + 04:15Z + 18/11 ~01:38Z | main jgreet.js (greetName, the rule already built), j61.js:155 stranger gate, jmen.js:121 min talk | review/* none | claims none (row taken by this session)

Branch `review/greet-stranger` from origin/main f6ee11b1 → **54431a1** (5 commits, site rebuilt).
Note: the 3 owner screenshots refs/owner-1811-0128-*.jpg are NOT on the handover branch nor the CDN (main never committed/uploaded them); worked from the OD text + a reproduction.

## (1) Root cause — male stranger greet: no face, no name
The officials on a place stage are kind `"min"` (jmen.js / j95 ledger `q:` ids; "Đại tướng quân ???"). `jmen.js:121` wraps `talkOpts` AFTER j61 and, for kind "min", **returns its own list without calling down** → j61's stranger gate (k61 "Chào hỏi" = jgreet greetName) never ran. She got the plain "Chào hỏi đúng lễ" (af +3, Danh +1): k61 level stayed 0 → no face, no name, no word about the name. Same tap also leaked his real name in the j24 learn line ("<real name> với ngươi: chưa rõ").
Fix (whole group, load-order proof): j61 gate is now one function `k61Gate(p,A)`; jgreet re-applies it as an OUTER talkOpts wrapper (idempotent), so no kind answered by a later short-circuit wrapper can skip it. Officials also go through grWrapOpt when already named. Plus: a public-name person (Hoàng hậu) now gets the FACE on greet (was name only, face stayed grey when level 0); grPron says "người ấy" (not "nàng") for thái y / thái giám / quan / nam nhân; j24 never prints a stranger's real name and has no "với ngươi" line for officials.
Naming follows the chosen rule unchanged (jgreet/BAL.greet): officials/men rank `man`=8 < consort → they always name themselves to a consort; if a name is not given the line says so: "Ngươi đã thấy mặt …; chưa biết tên. Vì sao: Nàng ta chỉ khẽ gật đầu, không xưng danh: …".

Scan `node dev/test/greet-stranger.js <build>` (every stage person kind, first greeting of a stranger):
| kind | main f6ee11b1 | this branch |
|---|---|---|
| consort higher / lower-equal / higher Kiêu ngạo (no name) | ok | ok (no-name line shown) |
| Hoàng hậu (public name, level 0) | FAIL: face stays grey | ok |
| min official ×2 (Đại tướng quân, Tể tướng…) | FAIL: no gate, no face, no name, real name LEAK, dup line | ok |
| man (thị vệ…) | ok | ok |
| thái y, thái giám KSP | ok but "nàng" | ok, "người ấy" |
| co-op friend | ok | ok |
| other palaces' servants (j95 ledger kind npc) | not k61 people: name shown openly on stage, no greet needed — left as is (not in this bug; flag for main if she wants them grey too) | same |

## (2) Duplicate result lines — root cause
j21 appends the new Sổ ghi lines under the result ("<literary line> <title>. <facts>", e.g. "Người nghe gật gù… Chào hỏi đúng lễ. Danh 8 → 9."); j65 `onePop` only stripped the line when it repeated line one as a whole string in one fixed order, so it missed it. Fix: `popDedup` sentence by sentence (drops sentences line one says, the bare title / Thành / Hỏng, and "X a → b" items whose label line one moved) — every action. Also jpcf "Dạo này" skipped the log row the open result already shows (it repeated the result right under it).
Scan: every talk option of a known consort (18) + official: duplicate sentences main **3** (min greet "Người nghe gật gù…", Khiêu khích, Dò la) → branch **0**.

## (3) "Lần ghé này đã nói chuyện với người này rồi" after greeting the man (MAIN s41 relay of owner 18/11 ~01:58Z: a BUG, same flow as consorts)
Root cause: the same as (1). For a consort the greeting is the k61 "Chào hỏi" (j61 talk wrapper), which never uses the visit's talk slot, so after it she goes on with Hỏi han / Khen / … For the official the jmen short-circuit gave the plain "Chào hỏi đúng lễ" — an ordinary talk option, so j2 talk() set `S.visit.tk[i]=1` → the card locked for the whole visit. With k61Gate as the outer wrapper every kind now greets through the k61 path (no slot used) and the talk stays open; also fixed: a Hoàng hậu at level 1 (public name, face seen) was stuck on "Chào hỏi" forever (greet now raises her to level 2).
Rule that stays for every kind (not changed, owner choice): one talk option per person per visit (`S.visit.tk`); "lần ghé" = one visit to a place (goTo) / one buổi. Officials have only one talk option (jmen "Chào hỏi đúng lễ"); men (j22) a few; thái y / Kính sự phòng their own lists.
Scan column "talk open after greet" (dev/test/greet-stranger.js, consort road): main FAIL for official ×2 (locked) + Hoàng hậu (face grey, greet again); branch: every kind yes.
| kind | main | branch |
|---|---|---|
| consort higher / lower / Kiêu ngạo, co-op friend | open | open |
| Hoàng hậu level 0 / 1 | greet again (stuck) / open | open / open |
| official (min) ×2 | LOCKED after the one greet-talk | open (Chào hỏi đúng lễ / Hỏi danh tính if unnamed) |
| man, thái y, Kính sự phòng | open | open |

## Tests
- dev/test/greet-stranger.js: PASS (table above); main build: FAIL 6.
- dev/test/greet_check.js: ALL 13 PASS. one-core-guard PASS.
- quickcheck 54431a1 (final): PASS 108 s · open 1141 ms · old save ok · core gates PASS · perf new/live render 127/121, tab 304/259, buổi 683/627, tasks>200ms 10/9.
- Shots (host mode, @2): CDN img/_review/greet-stranger/ greet-fold-755x1000-{before,after}.webp, greet-ipad-1180x820-{before,after}.webp — after: real face + "Đại tướng quân <name>", one result box, no repeat. (Fold: a grey "?" disc on the frame corner of officials = pre-existing frame badge, not from this branch.)
