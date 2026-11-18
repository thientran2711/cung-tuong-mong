# opt-pic-same — one picture size per dialog's option cards (KIT §6.2b)

PRIORITY #1 CHECK: OD 7 | ledger 0 | claims 5 | main 15 | review/* 0; ('opt-pic'): OD 5 | claims 8 (all LIVE/old) | main 13. Part EXISTS: KIT §6.2/§6.2b option card
(jk4 `kitOptFit0`, `kitCompactCSS`). Fixed that part; no new part.

Cause: `kitOptFit0` sized each card's picture from ITS OWN text (tall 3:4 or square = own text height), so one dialog had big and small pictures.
Fix (jk4 only): `kitOptGroup` + `kitOptSet` + group-aware `kitOptFit0`: all cards of one dialog (`#modal .dlg`, else siblings) share one size = what the
shortest text allows (all tall if every text fills the tall picture, else all square). KIT.md §6.2b rewritten in place. dev/test/kit-fit.js now flags UNEQUAL pictures.

Branch review/opt-pic-same @ 5f651f96 · assemble + build_site + quickcheck PASS.

Scan (node dev/test/kit-fit.js, 755x1000 · 1180x820 · 1366x1024 · 412x1058 · 390x844, all frame kinds; before = origin/main build, after = this branch):
- dialogs with unequal option pictures: 37 -> 0
- page errors 0 / 0
- other violations: 55 -> 20 total; the non-UNEQUAL empty-px ones (Tiếp 70px x9, Từ chối 56px) are old (grid row stretch beside a taller sibling) and
  3 more rows ("Cúng các phi tần…", "Khen hết lời", "Tiếp chuyện cả buổi") now show as empty-under-text for the same stretch reason; gap-figure ("toil" gaps) unrelated, same as before.
Not verified by eye: owner's exact "Kẻ hầu xin" dialog (shot harness only reaches the generic kinds; the reward modal covered my "man" shot). Shots not committed.

## r2 (s31 kit worker, opt-card) — branch review/opt-pic-same @ 42d52109 (main 65dcf52f merged in; generated files rebuilt)

PRIORITY #1 CHECK ('kitOptFit'): OD 1 | ledger 0 | claims 0 | main 12 | review/* opt-pic-same only. Part reused: kitOptFit0 (jk4); no new part.

Owner rules done (verbatim sources OD 17/11 03:50Z, ~05:00Z, ~06:30Z (4)):
1. PERSON / SUBJECT dialogs (person card act rows `.pc`, any dialog with a figure column `.kpsubj/.kszfig/kszf/kdper`): `kitOptIsPerson` + `kitOptFill` (jk4): every card ONE size (tallest text sets it, min 72 px), picture = tall 3:4 rectangle filling the card height (width 54..84, text column keeps >= 190 px), no square form. Cards narrower than 274 px keep the old one-form rule.
2. Other dialogs: one form per dialog (unchanged from 5f651f96).
3. One-word-per-line (Được/Mất wrapped in 2-col cards at 755): root = T3 right column 304 px made 2 columns of 149 px (`kszBtnGridLive3`/`kszBtnGrid3`, jksize: cell = min-content of the SHORT cards, ignoring the picture). Fix: option cards (`.kart`) never get a cell under 270 px; also k3OptCols (jk3) forces rows under 540 px, kdpo2 (jk4) only >= 540 px. `man`/two/child dialogs at 755: 149 px x 388 px cards -> 292 x 90.
4. VIỆC rival-tease (T3): main already draws banner top of the right column, figure column left, name not clipped (verified by shot, 755 + 1180); no change needed beyond 1.-3.
KIT.md §6.2b updated in place. dev/test/kit-fit.js now also flags `PERSON DIALOG cards not one size`, `PERSON DIALOG card picture is square`, `ONE WORD PER LINE`; the "empty under text" rule is skipped for person/subject dialogs (the picture fills the card there by rule).

Scan (node dev/test/kit-fit.js, all frame kinds, 5 sizes 755x1000 · 1180x820 · 1366x1024 · 412x1058 · 390x844; before = 5f651f96 build, after = 42d52109):
| check | before | after |
| ONE WORD PER LINE cards (755) | man/two/child 3 dialogs | 0 |
| person dialog cards not one size / square picture | square pictures in ~14 person kinds; unequal heights | 0 at 755/1180/1366 |
| UNEQUAL option pictures | 0 | 0 |
| page errors | 0 | 0 |
Remaining kit-fit violations (21 at 755/412/390 spot run; 42 in the full 5-size run) are old: "empty under text" in the court tabs (person-card act rows by rule: picture fills), toil gap 156/133 (figure gaps, unrelated), and at 412/390 (not supported sizes, rotate prompt) person dialog cards 400-1900 px tall — identical on the 5f651f96 baseline, NOT changed here.
Not verified: shots of `person` at 1180 are random events (harness picks any approacher); the three owner screens were reproduced by my own harness (servant "Kẻ hầu xin", visit person dialog, toil rival-tease) + the Hậu cung person card of the Hoàng hậu (acts 69x92 on 3 equal 471x110 cards at 755; 84x123 / 327x141 at 1180).

Shots (LOOKED at all): dev/handover/shots/opt-pic-same/{before,final}-{servant,tease,person,hauc}-{755x1000,1180x820}.jpg (CDN upload not tried, handover branch per brief).
Tests: assemble + build_site PASS; no separate quickcheck.sh on this branch (not present) — main please run it.
Residual design note: one long card (e.g. "Mách Hoàng hậu", 6 rows) makes ALL cards of that dialog as tall (one size, owner rule); option list scrolls (OD L191).
