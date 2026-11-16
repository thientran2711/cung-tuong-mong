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
