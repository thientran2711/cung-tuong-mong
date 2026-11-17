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
