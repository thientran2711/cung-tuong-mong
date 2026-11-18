# review person-dialog-restore (owner bug 18/11 06:10Z, OD:L1852) — reviewer report
PRIORITY #1 CHECK: OD 1000/1009/1543/1557/1560/1851/1852 | main j15 popCard, j65 talk, j63 kaSentence/resultShow, jk3:458 | review/* person-dialog-restore e6bda27 (reviewed) | claims person-dialog-restore SzhK83Z.
Verdict: PASS b2a9d3496 (branch review/person-dialog-restore-r1 = worker e6bda27 + merge of origin/main 09b1bbaf + 1 reviewer fix). Quickcheck PASS (core gates, time-spill, open 1326 ms, old save ok, perf 146/140 ms).
## Same-save shots (Fold 755x1000@2, iPad 1180x820@2; before = origin/main, after = branch; scratch only, nothing on CDN/git)
- Fault 1 empty band: gone (gap before 52-219 px, after 10 px, scan table: stranger/consort/queen/Emperor/Thái hậu/Thái y/servant/maid).
- Fault 2 group tabs: present, same .pctabs row + counts (Giao thiệp 1/5, Lễ nghi 0/1, Mưu kế, Hại người, Ban thưởng, Trừng phạt). One category = no tab row.
- Fault 3 "Ta đã biết" notice: no longer a box in the column; result goes to the bottom result card (#rtoast). Checked the owner's exact case (stranger, Chào hỏi): before = notice box + 200 px band; after = card in the bottom.
- Fault 4 tall cards: iPad compact (picture fills card, one size). Fold: still one size per group, picture tall-rect fills the card (OD:L1557), card height follows the longest text of its group, so short-text cards keep empty space right of the text. Same as before the branch for that group; NOT worsened. Owner may still call it tall: needs a decision (shrink picture min height) — not blocking.
## Defect found and fixed by the reviewer (FAIL point 1 of the worker branch)
Chào hỏi on a stranger: the bottom card said "Bên ngoài, hoa đào bay. / không đổi gì" (kaSentence picks the OLDEST log line of the span = ambient weather line logged by spend()), the greeting text was lost. Fix: j65 fallback passes plain(popMsg) to kaSentence via window.__kaSenOvr (one-shot, cleared in finally; j63 kaSentence honours it). Now the card reads "Ta đã thấy mặt một phi tần áo bậc Tần; chưa biết tên." Sổ ghi link keeps the full "Vì sao".
## Kit / consistency
No private part: tabs = existing .pctabs/.pct + KIT_CAT/kitActCat; result = standard #rtoast; CSS fix is one selector (.pcx:first-child+*). All popCard users covered (consort, queen, stranger, Emperor, Thái hậu, Thái y, servant, maid/elder card via jstaff, cold-palace consort closes dialog after act, kid has no acts).
## Not done / notes
- Emperor and some after-act shots were covered by the chapter-quest modal in the harness (same before/after, harness artifact); Emperor/Thái hậu checked by scan table only.
- Observation (pre-existing, not touched): the "Chuyện dạo này" row of the sticky info block can show a long result sentence of the previous act.
