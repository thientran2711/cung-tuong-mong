# wording-gain — report (branch review/wording-gain, from LIVE f573dc94)

PRIORITY #1 CHECK ('wording|+++'): OD 36 | ledger 3 | claims 8 | main 15 | archive 362 — owner row = OD 26/11 ~18:50Z (7); no earlier wording-gain scan exists (dev/test/rel-words-scan.js, kit-gain-list-scan.js cover other groups); no running worker on it.
Report line 1: depth <not given in the order>; START_CTX ≈ low (single session, no rollover needed).

## What the owner's vague words were (root cause)
- The «Gợi ý» row of every hidden-outcome option (`kitHintPhrase`, dev/build/jk2b.js) was a table of vague phrases: «thêm thể diện», «bệ hạ để mắt hơn», «được tiếng hiền đức», «có lợi cho con», «hao sức», «có thêm bạc», «(nhiều)» / «(chút ít)» …
- The static Được / Mất / Kèm text (`wx` / `lx` / `kx` of every option, arc step, road and event, 12 793 texts in dev/build/j*.js) said stats in words: «tiếng sút», «tiếng tăm sứt mẻ», «bớt tin», «thêm oán», «bạc riêng vơi đi», «ngươi mệt rã», «lòng ngươi áy náy», «ân sủng nhạt đi» …

## Changes
1. **BAL.mk** (dev/build/jbal.js, ONE CORE): `{lo:.25, hi:1.5, big:{hon,hoi,rel,uu,sung,dan,bac,suc,cc}, word:{nhe,vua,nang}}` — an amount ≤ max(1,⌊big×lo⌋) = `+`, ≥ big×hi = `+++`, between = `++`; loss `− −− −−−`. (The old private table KIT_HINT_MAG numbers moved here.)
2. **kitHintPhrase / kitMk** (jk2b.js): the hint names the STAT + marks at every clarity level («Sủng ++», «Danh −», «Thái hậu: thiện cảm +», «oán −»); lv0 one mark, lv1/2 the real size, lv2 the person by name; hostility stats print their OWN sign («oán −» = her gain); another house's thế lực stays neutral (no marks).
3. **Static rows**: `dev/test/wording-gain-rules.js` (ONE rule table) rewrites 1 046 wx/lx/kx texts in 22 files: Danh 489 · Sức 269 · Lòng 122 · oán/thù 101 · Bạc 76 · Chủ tin 49 · Sủng 40 · thiện cảm/nghi 32 · chứng cứ 10 · Lời đồn 9 (families overlap). Full before/after table: `dev/handover/reports/wording-gain-table.md` (every file:line).
4. **Colour / row rules read a mark as its number**: `kMk` (j19.js) used by `kcls` and `kaSent` (j63.js): «Danh −−» ≡ «Danh −2» (hostility exceptions «oán −» = gain keep working).
5. **VANPHONG.md** row «Số đo … và lời tăng / giảm» (canon overwrite in place) + **KIT.md** §28.6 hint paragraph (canon overwrite in place).
6. Tests updated to the new words: kit-e-rows.js, kit-cost-rows-home.js, kit-ton-row.js (word assertions only).

## Scan (LUẬT SỬA CẢ NHÓM)
`node dev/test/wording-gain-scan.js` → 12 793 wx/lx/kx texts · vague word beside a tracked stat 55 (all KEEP) · **VAGUE GAIN LINES LEFT 0** (before: 1 032 vague-word items beside a stat, 960 not kept).
KEEP classes (the scan prints counts): «không …» rows (owner 17:55Z, kept) · exact counts («một người», «hai năm») · chance words («dễ hơn», odds ladder) · speech/knowledge/time events («lên tiếng», «biết thêm», «chờ thêm») · comparisons / the cause clause after a marked stat.

## HONEST SCOPE NOTES for MAIN
- Scope = kit rows only (owner): `wx/lx/kx` + the Gợi ý table. NOT touched: story prose, news lines (jworld2 «thêm thể diện» in a news sentence), `rt`/`rf` result sentences, dialogue. A second family — chance phrases «dễ … hơn» — is the odds ladder, not a stat gain; left.
- Item-count phrases with a number («thêm một người biết») stay (exact).
- A few non-stat world lines the first lexicon matched (e.g. «giá vẫn lên», «lời đồn lan thêm» now → «Lời đồn +») were converted only where a tracked stat exists.

## Tests
- kit-e-rows PASS 26 · kit-cost-rows-home PASS 15 · hint-dedup unchanged · kit-ton-row 6/14 FAIL = SAME 6 fails as LIVE base (Tốn-row fixtures, not this change; the 2 hint fails it had on the new words are fixed).
- quickcheck: see line at the bottom (run on the branch HEAD).
- LOOK: Fold 755x1000 + iPad 1180x820, CDN `_review/wording-gain/` → `img/_review/wording-gain/{hint-vague,hint-sharp,rows}-{fold,ipad}.png` (https://ctm-img.victoria-tntt.workers.dev/img/_review/wording-gain/…). Seen: hint cards «Thái hậu: thiện cảm ++ / −−», «Sủng −−»; rows «Sủng ++ · Hoàng hậu: thiện cảm + · …», «Danh + · Đức ++», Mất «Ta tin cậy − · Lòng − · Hoàng hậu: oán ++» green/red correct, no overflow, no page error.

## Not done / for MAIN
- Marks in the hint row show a little space between glyphs in the display font («+ +»); cosmetic, same font as the rest.
- Built root index.html / sw.js not rebuilt here (coordinator rebuilds on land).

## BEFORE (LIVE) vs AFTER pair — same option, both devices (MAIN 161 request)
CDN `https://ctm-img.victoria-tntt.workers.dev/img/_review/wording-gain/ba-{BEFORE,AFTER}-{vague,sharp,rows}-{fold,ipad}.png` (event «Giữ hay không giữ», Tâm cơ 5 = vague).
| option | BEFORE (LIVE) | AFTER |
|---|---|---|
| Cúi đầu tuân lệnh | Được «được lòng bề trên» · Mất «lỡ phúc con cái» | Được «Bề trên: thiện cảm +» · Mất «Có thai −» |
| Đút bạc xin giữ | «hỏng thì Thái hậu phật ý» | «hỏng thì Thái hậu: thiện cảm −−» |
| Cầu xin Hoàng thượng | «hỏng thì bệ hạ lạt lẽo đi» | «hỏng thì Sủng −−» |
(Earlier `hint-vague-*` shots were the boot cover; superseded by `ba-*`.)
## Gate notes
coregates (quickcheck): dialog-fixed «no empty Tốn / Được cell» identical on LIVE base (pre-existing); button crawl «Ô lưu · Lui» not compared on base. Full quickcheck verdict line did not finish in this session.

## ROUND 2 — RV-161 SMALL FAIL fixed (merged LIVE 53319e6f; sources regenerated from main with the corrected rules)
1. «không» rows: the rewriter never touches an item holding không / khỏi / chẳng / chưa (offset-aware, per item). Lost clause «Hoàng hậu không tin» restored; jrd_cnv:384 «không thêm oán», jrd_muoi:583 «không tốn thêm bạc» back to the original words. Scan floor: wx/lx/kx texts with «không» = LIVE count (2260 = 2260, the scan exits 1 if it drops).
2. «,,»: 0 (scan asserts no «,,»; rewriter collapses it; «mà lòng nặng» rule split so no comma is left).
3. Wrong stat: «gia tư vơi một nửa» → «Gia tư −−» (not Bạc). Dropped the «giàu lên / giàu thêm / có thêm của» → Bạc rules (wealth / belongings ≠ Bạc: left as written). Third-person tiredness («Tố Nga mệt thêm», «làm lão kiệt sức») is no longer turned into HER Sức (KEEP class «another person's own condition»; Sức / Lòng rules skip an item with a third-person subject).
4. Marks = one source: `wgDrop(text, w, l, c)` (j19, used by j67 / jkc3 / jreign builders): a static mark line «Danh −−» is dropped when the option's own typed fx (w / l / c) already names that stat — the BAL number prints alone. Remaining static marks exist only where the option has NO typed amount (the size word is then the only source; BAL.mk.word documents the bands). Unit check: «người ta bảo, Danh −−» + {danh:-1} → «người ta bảo»; not dropped for another stat.
5. Minor: «đòi thêm, Bạc −»; hostility label unified to «oán» (thù ++ → oán ++, «thế lực» spelled out).
Tests: scan LEFT 0 · «,,» 0 · không 2260/2260; kit-e-rows 26 PASS; kit-cost-rows-home 15 PASS; kit-gain-list-scan same as LIVE; kit-ton-row 4/14 FAIL (LIVE has 6 FAIL there — fewer, none new). Also removed the stray report write dev/review/hint-dedup.md (restored to main).
