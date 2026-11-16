# kc-lore-r1 review (branch review/kc-lore-r1, base review/kc-lore 580d1b7 merged onto origin/main 0c23da4)

Result: PASS (small wording fixes made, listed below).

## Checked
- Merge: only generated files conflicted (assets.json, index.html, sw.js); rebuilt with dev/site/build_site.sh.
- Playwright route (dev/test/kc-lore/route-td.js) for all 6 origins tt, dtq, muoi, thd, ch, td: home road -> Sơ/Phúc/Điện tuyển -> palace. 755x1000@2 and 1180x820@2 for all six; 1000x755, 1366x1024, 844x390 for td and ch; 1366x1024 and 844x390 for tt, dtq, muoi, thd (rerun after the fixes). No page errors, no horizontal overflow, no cut text. Shots looked at (td fall card + Nhập cung card at 755x1000 and 844x390).
- Fall card (td) uses the kit event frame (BÁO tag, father's figure, kit sentence lines, kit rows with red/neutral values); wording per VANPHONG.
- Old saves: dev/test/outside/oldsave.js (main build vs this build): fail [], v1 home save reloads at home unchanged.
- Test-script notes (not bugs): thd fails the script's "home dress -kc-" assertion because thd keeps the poor dress by design (flag 3); a muoi Giao tình tab shows "???" = the existing "chưa quen" placeholder; one 1180x820 first run for ch/td ended the home life randomly before the palace (random play), rerun passed.

## Fixes made (wording/data only)
1. "cô tổ" -> "cô mẫu" everywhere (j4, j67, j97, jkc): ch's father is the Quốc cữu (Thái hậu's brother), so Thái hậu is her father's sister; j72 already said "cô ngươi". Flag 1 resolved.
2. td fall card: label "Tỳ nữ hồi môn" -> "Tỳ nữ thân tín" when the house has fallen (dowry confiscated, as the same card says).
3. td fall card: "Em trai út lạc…" moved to its own paragraph so it gets the kit sentence icon like the other lines.

## Flagged items judged
1. ch cô tổ / cô ngươi: FIXED.
2. thd "di cảo của cha" vs father alive at home and writing in j72: NOT fixed, needs a story decision. j4:95, j67 thd_sach, jkc:450 assume the father is dead; home road and j72 fam_thd have him alive. Options: (a) father dies at palace entry for thd, (b) rewrite thd_sach as "bản thảo của cha". Coordinator/owner to pick.
3. thd Hàn lâm clan (all.js clanOf + KCCLAN) vs j1 "ngoài ra không có gì": NOT changed; removing it changes balance (allies, house power, kcPow), a design decision.
4. muoi Bạc 320 direct vs about 150 via home road: by design (dowry rule). Leave.
5. td not entering the palace (trả thẻ bài / marriage / elope): house never falls; by decision. Leave unless the owner asks.
