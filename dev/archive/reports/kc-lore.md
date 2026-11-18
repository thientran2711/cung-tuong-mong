# kc-lore report (branch review/kc-lore, sha 580d1b7)

Task: owner question — td ("Con gái tội thần") says the whole family was executed, yet the home road has her father alive. Coordinator decision applied: td stays on the home road, set BEFORE the fall; the fall happens when she leaves for the palace. Whole group (tt, dtq, muoi, thd, ch, td) scanned. New rules only for new games (S.kc.v 2, `kcLore()`); old saves (v 1) keep old behaviour.

## What changed (dev/build/jkc.js, j7.js; site rebuilt)
- td home road: intro card says the father is still Thị lang bộ Lễ and enemies at court are gathering a case; the 3 chapters (title "Án đang dựng") only foreshadow it; no more "house saved" (tdSafe) branch; khuê các dress (was "ngheo"); identity card pick text says the house falls the day she leaves (dowry confiscated).
- td at palace entry (kcEnter, single entry path incl. early entry): kit event card "Nhà ngươi bị xử trảm" (father's figure, rows: every relative executed, youngest brother lost, dowry confiscated, house power gone) then "Nhập cung"; family members set dead (thứ muội no longer enters as a consort), dowry 0, entry rank forced Đáp ứng, Danh/Sủng/etc. as the palace td start. Youngest brother "lost in the night" matches j67 td_song. Foe's name revealed (k61Know).
- All six: father = the head of that house in the court for tt/dtq (name + age, was a different name in the palace {dad}); muoi no longer in the Hộ bộ clan (a salt merchant is no minister's kin); dtq brother leaves home once chapter 1 says he is lost at Nhạn Môn (was shown at home); muoi chapter 1 wording "xin một tước vị" (was "mua chức quan", contradicting j4 "xin phong tước"); home dialogs show "Tiểu thư" (pMe said "Đáp ứng"); j7 letter home says "tổ mẫu" when the home mother had died.

## Before / after table (scan: dev/test/kc-lore/scan.js; before = origin/main build)
| origin | fact | before | after |
|---|---|---|---|
| tt | father name home vs palace {dad} | Kiều Bảo Thành vs Kiều Tử Khiêm (mismatch) | same name, same age |
| dtq | father name | Hạ Thế Khanh vs Hạ Văn Uyên | same |
| dtq | brother | at home while chapter 1 says lost at Nhạn Môn | "mất tin ở Nhạn Môn" after chapter 1 |
| muoi | clan/house | Hộ bộ minister's clan (power, "người trong họ") | none, like the palace (clanOf "") |
| muoi | chapter 1 | buy a chức quan vs palace "xin tước" | xin một tước vị |
| thd | dress / house | ngheo; Hàn lâm clan | unchanged (see flagged) |
| ch | father/house | Quốc cữu, no clan | unchanged |
| td | father at home | alive, but "house saved" branch possible | alive, house stands; falls at entry |
| td | dress | ngheo (poor) | kc (Thị lang's house) |
| td | at entry | rank by score up to Quý nhân, dowry +60%, thứ muội a consort | Đáp ứng, no dowry, family dead, fall card |
| all | modal caption at home | Đáp ứng | Tiểu thư |

## Tests
Playwright route (dev/test/kc-lore/route-td.js = outside/route.js + gate shots) td new game home -> Sơ/Phúc/Điện tuyển -> fall card -> Nhập cung -> palace -> save/reload, at 755x1000@2 and 1180x820@2: no page errors, no overflow/cut text, shots checked. scan.js run on the six origins before/after: no errors. Not re-run: other origins' full route (unchanged logic except name/clan/dress strings).

## Flagged, NOT changed (palace wording, needs owner/coordinator decision)
1. ch: Thái hậu is "cô tổ" in j4/j67/j97/jkc but "cô ngươi" in j72 and Quốc cữu = her brother in jkc (a niece says "cô", not "cô tổ").
2. thd: j4/j67 "di cảo của cha" (posthumous) vs father alive at home and writing in j72 "Thư cha".
3. thd: palace clanOf = Hàn lâm clan (NPC head pow 38-68) vs j1 "thầy đồ nghèo, ngoài ra không có gì".
4. muoi wealth: direct start Bạc 320, via home road about 150 at entry (dowry rule, OUTSIDE_PLAN §3: by design).
5. td, not entering the palace (trả thẻ bài / marriage / elope): the house never falls in the game text (the fall is tied to palace entry as decided).
