# Review: review/reign-road @ c0e6f7d255 → review/reign-road-r1

Reviewer (session 8 subagent), 16/11. Branch: Emperor side story "Tân quân lập uy" (jreign.js, BAL.rg), faction road, Tâm nguyện lines,
Mệnh truyện › Triều cục / Tâm nguyện.

## Merge
- origin/main 63cf7b12a merged (merge base 3ac727833 = palace-start), then main eba64ead43 and a363cc14a6 (kpanel-compact, evidence-truth, elder-staff, goal-strip-fix) merged again; reign.js PASS at all 5 sizes and kit scan 87/87 CONFORMS after both merges. Conflicts: assemble.py (main's list + `jreign.js` after `jstory.js`),
  index.html / sw.js (rebuilt with dev/site/build_site.sh). BAL.rg merged cleanly into jbal2.js.

## Reviewer fixes (on r1)
1. **Promotion exam (owner 15/11 17:20Z)**: the Hoàng thượng-side win did `S.rank++` (free rank). Now it grants an exam at once with the
   conditions waived (jexam `exGrace`, reason "công phò tá bệ hạ thân chính" via an `exGw` wrapper); same Sủng / rankCap gate as before.
   Test: emp win → rank unchanged, `S.ex.grace` set; exRow shows "được ân thi ngay (công phò tá bệ hạ thân chính)".
2. **Emperor death (review/mortality + j99succ)**: `rgOn()` is now false once `S.empDead` or while the succession epilogue runs (`S.succ.on`).
   Before, endTurn still ran monthTick during the epilogue, so the court could still "decide" (e.g. "Hoàng thượng thân chính") after his death
   and pay her side's reward. Thái hậu death was already handled (S.thDead → her side dissolves). Test added.
3. **Kit (LUẬT KIT TRƯỚC)**: kit-conform scan (kit-sweep's template check, run on every rg beat × side, the switch dialog, 6 line offers):
   before 8 MIXED (c2a, c4b: hand-made `<span class="past">` hint block in the body) → after 0 (87/87 CONFORMS at 755x1000, 1000x755, 844x390).
   - Beat body repeated the title already in the kit header → body title removed.
   - "Đổi phe" act was a pbtn in a private `.rbtn` row (only place in the game) → kitSkillCard `acts` (§21/§46 act card).
   - Tâm nguyện list: 6 people as label/value rows → kit person lines (`ktPerson` → kitPersonLine in `.ktpeople/.ktprow`, as Việc nhờ);
     the "Cách đi" rules paragraph → `kitInfo("Tâm nguyện")` gloss (§46: no rules text as a paragraph).
| scan | before | after |
|---|---|---|
| rg dialogs MIXED/CUSTOM | 8 | 0 |
| private `.rbtn` act rows in rg panes | 1 | 0 |
| person lists not kit person lines | 1 (6 people) | 0 |
| rules paragraphs on the page | 1 | 0 |

## Tests (dev/test/reign.js, after merge + fixes)
755x1000 PASS · 1000x755 PASS · 1180x820 PASS · 1366x1024 PASS (one earlier run lost the browser: machine/disk load) · 844x390 PASS ·
390x844 rotate prompt shown, 0 page errors. 0 page errors in every run. Screenshots looked at (dialog, panes, switch, line offer) and deleted.

## VANPHONG
No %, no numbers for odds (word() ladder), cổ trang wording. OK.

## Balance (dev/measure/rgpure.js MT=1, merged build, 42 months, bots always take their side's option)
| side | lives (decided) | her side wins |
|---|---|---|
| Hoàng thượng | 29 (29) | 14 = 48 % (batches 8/9 and 6/20: large noise) |
| Thái hậu | 10 (9) | 5 = 56 % (1 life: Thái hậu died → đứng ngoài) |
| quyền thần | 30 (28) | 17 = 61 % |
| neutral outcome (đứng ngoài) | 30 (25) | emp 9 · th 11 · quyen 5 |
Within the worker's ~55/61/67 at n≈10–30 (±10–15 points). No side is the obvious pick; payoffs differ in kind.
Quốc sự low months per life: 0–39, mean ~20 of 42 → not constant (half the lives under 20); cost .4 a month = at most −16 grip against
+27 drift, never decisive alone. OK.

## Co-op / old saves
S.trieu.rg is under the W_KEYS world key `trieu` (host-authoritative, 3-way delta merge); the guest never runs rgWorldMonth (test: guest
month moves neither p nor ch). Old saves (no S.ps): no sub-tabs, no beats (test).
Note (non-blocking): a palace-start guest in a non-palace-start host's room gets a court that never moves (the host has no S.ps).

## Non-blocking notes
- Dialogs with who = her own figure (switch dialog, c4a) show an empty left column: main hides her own figure in every T3 dialog
  (`.kesme` visibility hidden) — game-wide, not this branch.
- Switch dialog event picture comes out as "Yến tiệc, mừng thọ" (evArt keyword pick); painted chapter art is a listed follow-up.
- Tâm nguyện offer of Phế phi họ Lý opens as T4 (portrait) while the other five are T3 (figure): her j72 face has no full figure.

## Verdict
PASS (after the reviewer fixes) — see the coordinator report for the sha.
