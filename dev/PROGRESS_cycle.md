# PROGRESS review/cycle — monthly cycle (kỳ nguyệt sự), owner 15/11 ~20:25Z

Branch `review/cycle` from origin/main e3fc5f61. Module `dev/build/jcycle.js` (assembled LAST, after jartc.js). Test `dev/test/cycle.js`.

## What it does
- **Cycle per woman** (her, every consort, co-op friend entry): pure function of her NAME + month index (`cyBase`, `cyDaysM`):
  one tuần (`t`), 5–7 days inside it, ±1 day jitter per month. No save data → old saves load; host and guest compute the same days.
  None while truly pregnant (`preg && !fake`, also for the months still to come of the pregnancy) or from age 50 ("đã dứt kỳ").
- **Night flip**: during her cycle tuần `nightCh` → 0 (never flipped however favoured); she cannot steal a night (`stealNight`,
  `ACT.steal/road.ok`, `LACK`, the Tranh sủng / Chặn ngự giá deck cards get lock + reason); `nightScene` refuses; the options
  "Tắm gội chờ giá" (PEND.ksp) and "Thắp đèn hầu rượu" (late visit PEND.empnight) lock with "Đang kỳ nguyệt sự, thẻ bài tạm cất, không tiện hầu giá";
  `S.nightWhy.rows[].reasons` gets `{k:"cyc"}`. Her cycle week starts with a `kitLine` notice + Sổ ghi line; while her pregnancy is
  not yet found (`pregUnk`) a missed cycle logs "Tuần này đáng lẽ tới kỳ nguyệt sự, mà chưa thấy." (pregnancy hint).
- **Sổ nguyệt sự** (Kính sự phòng, Tổng quản talk cards, after the j61 greeting like every other card):
  bạc road "Xem sổ nguyệt sự" (Bạc `BAL.cyc.read[rank]` ≈ 1/4 bổng, 1 khắc, sure) ↔ "Hầu chuyện, xem lén sổ nguyệt sự" (2 khắc, Sức −4,
  odds from Tổng quản thiện cảm + Tâm cơ; fail: Danh −2, thiện cảm −2). The book = `kitModal({kind:"intel"})` + `kitFacts`: each woman
  "tháng này / tháng trước: đã báo, mồng a–b | chưa tới kỳ (… tuần) | không báo (chip) | đã dứt kỳ" + nights this month.
  Reading: rival who stopped reporting → note + `S.cyKnow[id]=pregWk` → "Bỏ xạ hương" possible on that HIDDEN pregnancy;
  rival `pregMismatch` (tư thông) → chứng cứ +2 once; fake pregnancy still reporting → chứng cứ +1; a false "không báo" against her →
  option "Xin Kính sự phòng chép lại cho đúng" (rumour off; names the forger with chứng cứ +1, sure-ish when thiện cảm ≥ 20).
  A clever rival (Tâm cơ ≥ 60, 40 %) hides her own pregnancy behind false reports.
- **Her forgeries** (deck cards): hide a found, hidden pregnancy: "Sửa sổ nguyệt sự" (Bạc `BAL.cyc.hide[rank]`, odds 80, fail: Tổng quản knows)
  ↔ "Dặn ma ma báo ngày giả" (Đức −4, odds 35 + ma ma loyalty/2, fail: whole palace learns she is pregnant).
  Non-bạc twin of j22 "Hối lộ Kính sự phòng sửa sổ" (80 bạc): "Khai lùi ngày nguyệt sự" (Đức −6, odds Tâm cơ + loyalty; fail Danh −3 +
  `S.ksKnows`), only when a real night lies 2–6 weeks before conception.
- **NPCs**: monthly (monthPay hook, per player, runs on host and guest): a foe (hostility ≥ 50) may read the book and guess her hidden
  late pregnancy (`v.cyKnowMe`, then musk is open to her; Tai mắt ≥1 tells her); a foe with 30 bạc may forge "không báo" against her
  (`S.cyb.rum`): rumour now, "mừng hụt" next month (Sủng −3, Danh −2) unless corrected. Rival-vs-rival reading in `rivalsMonth`
  (host only in co-op: muted on the guest).
- **API** for other workers: `cycleDaysOf(person, month 1..12[, monthsAhead])` → days (calendar, review/cal-plus);
  `cycleLate(person)` → missed cycles (thái y hints, review/thaiy); `cycOn(person)`; `cyBook(how)`.
- Numbers: `BAL.cyc` (set in jcycle.js to avoid a jbal.js conflict with review/thaiy).
- Also fixed (whole class): j19 `KRED` matched "nguy" inside "nguyệt" → any line/name with "Nguyệt" (e.g. Lâm Nguyệt Hoa) was coloured red.

## Not done / notes
- Calendar marks: provided only through `cycleDaysOf` (owner of jmcal.js = review/cal-plus).
- Summonable maids (player as cung nữ): no night system for her in servant mode, so nothing to remove; NPC servants have no flip.
- No new kit part used or needed.

## Tests
`node dev/test/cycle.js dev/index.html [outdir] [sizes]` — logic once + book panel + Kính sự phòng cards per size; see report.

## State (resume notes)
- Pushed: review/cycle (commits daee3400 code+test, 14993f36 test/PROGRESS/site rebuilt). Nothing local-only; no art generated.
- dev/test/cycle.js on the site build: ALL OK at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (@2/@3), 390x844 rotate prompt.
- coop-e2e: 59/59 passed (live Worker, room WPUH). The first run timed out at page.goto (load avg ~42 on 4 CPUs); the passing run used a
  180 s default timeout in a local copy of the test (not committed).
- Merge note: assemble.py list conflicts trivially with review/thaiy (adds jthaiy.js) — keep both; jcycle.js stays last.

## Review r1 (review/cycle-r1, on review/thaiy-r1 f7c61f829)
- Merged onto thaiy-r1; assemble order: jthaiy.js right after jty.js, jcycle.js LAST; site rebuilt with build_site.sh.
- Balance (bạc-equivalence rule 15/11 20:30Z): book read cost 1/8 → ~1/4 of bổng (BAL.cyc.read), peek odds base 35 → 50
  (at 1/8 bổng + Khó odds the free road was never worth taking); "Dặn ma ma báo ngày giả" base 25 → 35 (BAL.cyc.hideMaidO),
  so a loyal ma ma beats the 80-odds bribe while an average one does not.
- thaiy now gets cycleLate() (its lateHint() hook was optional).

## Review r2 (review/cycle-r2, from cycle-r1 7ea3ec447 + origin/main 4f5e5f3b3) — owner 16/11 (A7)
- Merge: assemble.py takes main's list + `jcycle.js` LAST; j19 takes main's whole-word KRED (`KWB`), which already covers the
  "nguy" inside "nguyệt" case fixed in r0; generated files (index.html, sw.js, assets.json) rebuilt with build_site.sh.
- (1) **Sổ nguyệt sự as HÀNH SỰ deck cards** (no walk to Dư đồ; owner rule "acts that need no meeting are Hành sự cards"):
  "Xem sổ nguyệt sự" (Bạc `BAL.cyc.read[rank]`, 1 khắc, sure, opens the book) and "Xem lén sổ nguyệt sự" (Sức −4, 2 khắc, odds
  peekO + Tổng quản thiện cảm + Tâm cơ/4; fail Danh −2 + Tổng quản thiện cảm −2). Added in `cyDeck()` (deal hook) for every non-cold,
  non-servant deck. The Kính sự phòng talk cards stay as the place shortcut (same numbers).
- (2) **Monthly report pop-up** `PEND.cyrep` (kit dialog via pushDil + c6 option cards; who = her maid): when her cycle tuần starts,
  flip() is deferred (`cyAsk`), the maid asks how to report to Kính sự phòng; the chosen option calls flip() again, so the answer
  decides this week's tablet. Numbers `BAL.cyc.rep`:
  - Báo đúng ngày — sure; card off this tuần (as before).
  - Báo lùi vài hôm — Đức −2; odds = "Khai lùi ngày nguyệt sự" formula (backO 35 + Tâm cơ/3 + ma ma loyalty/5); card off this tuần and
    next tuần's flip weight ×0.5; a pregnancy begun ≤3 tuần after it: the book still shows the first missed cycle as reported, foes and
    thái y see one missed cycle less (`window.cycleLate` = book view, `cycleLateTrue` = real), and a mismatched conception with a real
    night 2–6 tuần earlier is cleared like "Khai lùi". Fail = Danh −3 + S.ksKnows (as Khai lùi).
  - Báo sớm, nói đã sạch kỳ — Đức −3; her card stays on the tray (`cyTray`), steal acts open.
  - Giấu, không báo — free; card stays; the book says "không báo" (self rumour: no "chép lại" option), phi tần ghen +4; no real
    pregnancy by the month's end → mừng hụt Sủng −3 Danh −2 (same as a rival's forged "không báo"); if she does conceive, foes reading
    the book learn it a month early.
  - Both lies: flipped/stealing during the cycle → Kính sự phòng mama checks in nightScene: passes with lieO 50 + loyalty/4 + Tâm cơ/5;
    caught = night lost, Sủng −6, Danh −4, S.ksKnows. Forgery evidence: at the month's end each foe (hostility ≥ 50) reading the book
    (npcRead 12 %) gets chứng cứ +1 on her.
  - Never answered (reload/closed): the week ends with "báo đúng" (endTurn hook). Saves: only new optional S.cyb fields (rk, rv, df,
    lie, lieM, lieEv, giauM, back, lck); old saves load. Co-op: all personal state (S.cyb, S.tonight), runs per player like flip().
  - Bạc-equivalence: the pop-up has no bạc road (all roads cost Đức / risk); the deck book cards keep the r1 bạc ↔ Sức+risk balance.
  - Option display: palace-event hidden-outcome mode (KIT 28.6) with a truthful hint per option (odds word of the rolled road, every
    risk in words, "tổn Đức") + risk chip; full numbers on the result card. Full Được/Mất/Kèm rows were tried (KIT_ACT_PIDS) but overflow.
- **KIT REQUEST (option card overflow)**: in a scrolling person dialog (`.dlg.kdper > #mb > .opts.k3rows`), jopic.js:161 sets
  `min-height: calc(var(--kah)+18px) !important` on `button.ka.kart.kopt`, replacing jk4's `min-height: max-content`; when the option
  list must scroll, the grid auto rows collapse to that min-height (130px at 755x1000) and taller cards' rows spill over the next card.
  Seen with full Được/Mất/Kèm rows (pid in KIT_ACT_PIDS). Suggested kit fix: `min-height: max(calc(var(--kah)+18px), max-content)` or
  `grid-auto-rows: max-content` on that list. Not used here (hint mode fits).
- Note (kit, not requested): the two deck cards fall in the "Giao thiệp" tab (KIT_ACT_CATS has no rule for "sổ nguyệt sự"/"xem lén");
  card art = §59 placeholder until art exists (act art queue).
- Test: dev/test/cycle.js extended (sections 9–10 + per-size pop-up and Hành sự checks).
- r2 results (site build): cycle.js ALL OK at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (@2/@3) + 390x844 rotate prompt
  (one earlier run aborted once with "ksp roads missing" in logic section 5 — random start state; the test now reports the state instead
  of crashing; the rerun passed); thaiy.js 49/49; cardflip.js 5 sizes: no page errors, no overflow, cards inside tray; coop-e2e 59/59 (room T5YM).
- State: pushed review/cycle-r2; nothing local-only; no art generated, no CDN upload.

## Review r3 (review/cycle-r3 = cycle-r2 7d57639e8 + origin/main 9b4f1697a) — reviewer (rules/numbers), A7
- Merge: assemble.py = main's list (+ jtut, jgoal, jstaff) with `jcycle.js` LAST; generated files rebuilt (build_site.sh).
- Fixes made by the reviewer:
  1. Tab: the cycle-book cards fell into "Giao thiệp" (KIT_ACT_CATS default). Data line in jcycle (same pattern as jexam):
     `["muu-ke",/nguyệt sự|báo ngày giả|xem sổ/i]` → Xem sổ / Xem lén sổ nguyệt sự, Sửa sổ nguyệt sự, Dặn ma ma báo ngày giả,
     Khai lùi ngày nguyệt sự, the ksp talk shortcut and "Xem sổ thị tẩm" now sort to "Mưu kế" (like "Hối lộ Kính sự phòng sửa sổ").
     Before → after: 7 cards giao-thiep/hau-ha → muu-ke. No kit change.
  2. Co-op: the deferred flip (option button → flip()) ran OUTSIDE endTurn's withoutFriend, so the Emperor could pick the co-op
     friend's entry in my world (rivalNight would write Sủng/thai deltas into her row on merge). `cyNoFriend(flip)` takes coop
     entries out around that call (test g).
  3. New life: start() flips right after "Nhập cung" → the pop-up could be the very first thing a new player sees. That week the
     maid reports truly by default, no pop-up (test f).
  4. "Xem lén sổ nguyệt sự": "Tổng quản phật ý" showed under ĐƯỢC (kit row parser). Now "hỏng: bị Tổng quản bắt gặp (thiện cảm -2)"
     on the deck card and the ksp shortcut → MẤT row.
  5. Pop-up hints shortened so no option card touches its border at 755 (K11 min-height issue stays with the kit keeper);
     "Giấu" hint now also names the forgery-evidence risk.
- Numbers check (no change): báo đúng safe; báo lùi Đức −2 + Khai-lùi odds, costs flip weight (this tuần off + next ×0.5), only pays
  for a planned hidden/mismatched pregnancy — cheaper than reactive Khai lùi (Đức −6) but blind; báo sớm Đức −3 buys a full extra
  flip tuần at a mama check (50 + loyalty/4 + Tâm cơ/5) + 12 %/foe evidence; giấu is not free: ghen +4 and near-sure mừng hụt
  (Sủng −3 Danh −2) unless she conceives, foes learn a real pregnancy a month early, same check + evidence → roughly sớm's price
  in other currencies, not dominant.
- Tests (site build): cycle.js ALL OK at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844 rotate) incl. new f/g;
  test setup now starts with `__nlInner` (was stuck on a seeded servant life at 844); thaiy.js 29/29 (755); coop-e2e 59/59.
- Second merge: origin/main moved to 7f20b751b (evidence-truth-r1 + palace-start-r1). assemble = main's list (… jstaff, jtruth) + `jcycle.js` LAST.
  6. Evidence-truth family (jtruth: evidence only for a real wrong; scan dev/test/evtruth-scan.py flagged 3 jcycle sites): every jcycle
     evidence site now writes its deed first (`cyDeed` → deedOnce: cyfake, cyforge (also when an NPC forges), cylie) and announces the
     value evA really gave (pm deed comes from jtruth's deedSync). Scan: 3 unchecked → 0.
  Re-run after the merge: cycle.js ALL OK (6 sizes), coop-e2e 59/59.
