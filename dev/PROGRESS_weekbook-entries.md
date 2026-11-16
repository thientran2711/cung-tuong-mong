# PROGRESS — review/weekbook-entries (queue C33)

Owner 15/11: Tuần lục p.5 Hoàng thượng showed the raw Điểm trang card text, nothing about the Emperor ("Giải thích gì mà không liên quan tới hoàng thượng vậy."). Rule (OWNER_DECISIONS "Week book person page shows an unrelated entry"): each person page lists ONLY what happened with THAT person, one short past-tense sentence per entry with its cause, never raw act-card text, chip totals = sum of listed entries. Whole family: every page that lists log entries (people, her own page, Triều đình). Page-turn animation untouched (C32).

## Cause (dev/build/j87.js wkBookData, old)
1. Each log SENTENCE went to the first person named in it. A hint in brackets ("gặp Hoàng thượng ghi trước") or a name later in the line made the Emperor the owner; the Điểm trang card promise text was logged and printed.
2. Result/reaction sentences were glued to "the previous person" whatever they were about, so one page collected gossip about other people.
3. A line with several numbers (Danh/Sức/Sủng/Thái hậu quý ngươi) was printed whole on one person's page: her own numbers on the Thái hậu page, and the Sủng number (the Emperor's row) landed on her own page only.
4. Nothing tied the relation-table change to the entries.

## Fix (j87.js only; no CSS, no new kit part — entries still go through kitFacts / kbkArt / kitRelTable as before)
- Log text is split into units (cause + result/number sentences of the same person). Card promise / hint text and the Sổ thị tẩm table dump are dropped (WKE_CARD).
- Every number of a unit has an owner (wkeTokens): `Sủng` → Hoàng thượng, `Thái hậu/Hoàng hậu/<tên> quý ngươi|thiện cảm|oán|ghen` → that person, `Sủng của X` → X, Danh/Sức/Bạc/Đức/Tai mắt/Ân tình… → her, "phi tần ghen +n" (group) → nobody's page. Same "a → b" said twice counts once.
- A person's page gets a unit when they own a number in it, or the sentence is about them (named first outside brackets; Hoàng thượng / Thái hậu only when the sentence opens with them). Their entry = the unit's cause + why it moved ("Hoàng thượng để tâm đến ta hơn", "Thái hậu thêm quý mến ta", "nàng bớt ghen") + ONLY their numbers: "Đánh đàn ở ngự hoa viên: thành, Hoàng thượng để tâm đến ta hơn. Sủng +7."
- Her own page keeps the cause + her numbers (incl. Sủng); other people's numbers are removed from it.
- Table = sum: for each relation row with a week change the page adds one entry "Mấy việc vặt trong tuần chưa ghi riêng, … Sủng +2." for what no log line explained, so listed numbers always equal the row's change. (Large rests expose unlogged changes; review/log-sync adds the missing lines.)
- Result sentences glue only to a unit about the same person; a bare act ("Thỉnh an.") with no person stays on her page.

## Tests
- `node dev/test/weekbook-entries.js <url> [WxH@dpr ...] [--shots dir]`: the owner's case (Điểm trang hint line + Đánh đàn Sủng +7 + Thái hậu / Hoàng hậu thỉnh an + gossip + night). On origin/main build: 7 FAIL (hint text in an entry; Emperor page holds the hint, Sủng +7 missing, row change 10 != listed 0; Thái hậu page shows her Danh). After: PASS at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (no cut text, no new horizontal overflow; the 317 px `.kbk` scrollWidth at 755x1000 is identical on main = stacked sheets).
- Existing `dev/test/book-person.js` at 755x1000, 1180x820, 844x390: errs [] (same relation tables / fig / fill checks).
- Scan (family): `node dev/test/weekbook-entries-scan.js <url> out.json 4 14` (4 bot games x 4 weeks, one snapshot per week) then `python3 dev/test/weekbook-entries-scan.py before.json after.json` (before = main build, after = this branch; the two runs diverge slightly so counts are samples):

| check | before | after |
|---|---|---|
| person pages scanned | 43 | 50 |
| entries on person pages | 65 | 98 |
| entries unrelated to the page's person | 2 | 0 |
| raw card/hint/table text entries | 1 | 0 |
| her own stat numbers on a person's entry | 18 | 0 |
| relation rows with a week change | 48 | 42 |
| rows whose change != sum of listed entries | 42 | 0 |

Sections covered: Tổng lược / Việc của ngươi, every person page (Hoàng thượng, Thái hậu, Hoàng hậu, phi tần, servants, children), Triều đình · thiên hạ (card text filter + world routing unchanged).

## Open / notes
- Pictures could not load in this sandbox (CDN blocked), so screenshots show empty frames; layout checks are numeric. Reviewer should look at the Emperor page on a real build.
- Many "việc vặt" residual lines will show until review/log-sync (unlogged changes, "Ân tình 0→N" noise) is on main; they are honest, not a bug.
- Merge note: log-sync's new log wording ("Sủng 40 → 37 (lý do)") is parsed by the same token regex.
- KIT REQUEST: none (no new kit part, CSS or art).
