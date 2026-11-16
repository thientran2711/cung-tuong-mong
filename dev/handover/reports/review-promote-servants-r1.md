PASS 81deb15f758774d8cd1537097a2c553e38d695d6

# Review: review/promote-servants @ c4a79401 (D41) → review/promote-servants-r1 @ 81deb15f7
Reviewer (Foreman C). Base: origin/main bad941b (fast-forward safe: origin/main is an ancestor of 81deb15f7, re-checked after a fresh fetch).

## Merge
- Merged c4a79401 onto origin/main bad941b. One conflict: dev/build/assemble.py list (main added jcloud.js, jlogsync.js). Resolved = main's list + 'jpromsv.js' last (after jkc.js).
- Root site rebuilt with dev/site/build_site.sh (CDN index reachable): index.html, sw.js, assets.json committed (dd207b7, then 81deb15f7).

## Checks
- LUẬT ƯU TIÊN SỐ 1: correct — the Đề bạt act already existed on main (jaudit §4: srkMax cap, BAL.dbCost, dbOdds, envy, NPCs). Worker extended it, rebuilt nothing. OWNER_LEDGER §7 row 53 "NOT DONE / no promotion act found" is wrong and should be updated by the coordinator.
- Owner rule OD:L302 (she promotes her maids/eunuchs to Chưởng sự cô cô / Nữ quan / Thủ lĩnh / Tổng quản, limited by her rank, NPCs same): met. Caps per rank tested on the real button (rank 2 locked with reason naming the cap; rank 4 → Chưởng sự / Thủ lĩnh; rank 5 → Tổng quản; rank 7 → Nữ quan).
- OD:L1149 (servant rank follows the master's rank, srkMax): reused; spMove also clamps a moved servant to the new master's srkMax.
- BALANCE OD:L582 (two roads of equal worth): Bạc road (BAL.dbCost) vs favour road ("Xin Hoàng hậu chuẩn"; Hoàng hậu herself / no queen → Thái hậu) priced = Bạc × pay[Tần]/pay[her rank] × 0.2, all from BAL (BAL.pay in jecon, BAL.sp). 80 bạc → 29/16/9/7 favour at rank 2/4/6/7. At Tần 16 favour ≈ 4 morning thỉnh an vs 80 bạc ≈ 2/3 of a month's stipend: neither road obviously better; the favour loss has real knock-on (Hoàng hậu → ta lower = less protection). Accept.
- Gain AND loss (16/11 07:15Z): gain = rank +1, thiện cảm +8, post effects; loss = Bạc or favour, others −3 envy, passed-over senior −5, chance of pride (6 months −3/month, others −1, may ask to leave → keep (Bạc) / demote / let go (rival gains 1 evidence)). Evidence goes through evA → jtruth deedCap, so a clean player gives no false evidence (OD:L1007 respected).
- NPC mistresses same rules (OD:L599 "whatever she has, they have"): NPC uses the favour road when the purse is short; proud NPC servants move to a higher palace with room. Tested.
- ONE CORE (OD:L1267): numbers in BAL.sp / BAL.db*. Reviewer fixes below removed 3 typed numbers. Remaining typed number: Kèm "thiện cảm dưới 30 thì có khi bán mình cho cung khác" copies the existing standing threshold that is ALSO typed in j24.js:70/75, j29.js:62, jface.js:238 (pre-existing family debt on main, not introduced logic) → follow-up below.
- KIT (LUẬT KIT TRƯỚC + KIT CONSISTENCY): jpromsv has 0 style/class/div/span strings. Two-road card and leave card = tsPanel + tsOpt (same option cards as every dialog), Kèm rows via kitRows, servant button = pbtn act card. Consistency scan: the new option cards render identical to other kdper/dialog option cards and the servant act card matches Thưởng/Phạt cards beside it. PASS.
- VANPHONG: no %, odds ladder only (Chắc …), side chance on the side ladder (chanceW "khả năng rất thấp"), no "Chắc chắn" shown on no-odds options (checked in shots). Source text uses "lòng"; j84 rewrites every "lòng ±N / lòng dưới N" to "thiện cảm" on screen (verified in every screenshot: no "Lòng" visible). Player = "ta" on cards ("Phẩm ta cho phép…", "Hoàng hậu → ta: thiện cảm").
- Co-op: only change is s.coop servants skip pride/leave (no sync/protocol code touched) → coop-e2e not run.

## Tests (on review/promote-servants-r1)
- dev/test/promote-servants.js (file:// dev/index.html, old = origin/main root index.html): 23/23 PASS at 755x1000@2 + 1180x820@2, before and after my fixes (incl. old save loads, monthly + Đề bạt work, no page errors).
- Host mode (root index.html ?khost=1 through rot.js frame, reviewer script .rv/host.js, not committed): 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 → host=true at all, 390x844 rotated + rotate prompt shown; two-road card opens from the real button; no horizontal overflow, 0 clipped / 0 overlapping option cards on both the two-road and the leave card; 0 page errors.
- Screenshots looked at: servant card (755), two-road card (755, 1180, 1000x755, 844x390), leave card (755, 1180, 390x844 rotate prompt). Text complete, no cut lines; leave card's third option scrolls inside the dialog body as the kit does.

## Reviewer fixes (commit 81deb15f7)
1. Failure loss of Đề bạt was a typed 2 in 4 places (dbDo ×2, button text, both option cards) → BAL.dbFail=2.
2. spLeaveCard keep-pay floor typed 5 → BAL.sp.keepMin.
3. spFav dropped the typed copy of the stipend table (`BAL.pay||[40,…]`) → BAL.pay only.
4. Servant button "hỏng: mất bạc" was wrong for the favour road → "mất bạc hoặc lời xin" when the favour road exists.

## Follow-ups (non-blocking)
- ONE CORE family: the servant "loyalty < 30" threshold is typed in j24.js, j29.js, jface.js and now in jpromsv's Kèm text → one BAL constant (e.g. BAL.srvLow) read by all four + texts printing it.
- KIT REQUEST (worker's, carried): jk4 kitDlgFit `.opts{grid-auto-rows:max-content}` lets a tall option card overlap the next one in landscape kdper; suggest `grid-auto-rows:auto`. Worker worked around it here; other long option cards may still hit it. → KIT_REQUESTS.md.
- Missing art: option picture for "Lót tay Nội vụ phủ" (card shows no picture while the favour road has one; kit handles both).
- Seen once in host run (pre-existing, not this branch): mkServ can give two servants in the SAME household the same name ("Tiểu Thúy" promoted while "Tiểu Thúy" is passed over). Names should be unique within a household → small-bugs.

## Open owner questions (from the worker, still open)
1. Đề bạt gate (thiện cảm ≥ 55 AND công lao ≥ 3) is almost never met in bot play (0–3 eligible servant-months per life) — loosen (e.g. 45) or keep rare?
2. Should a palace hold only ONE Chưởng sự cô cô / ONE Tổng quản (a post, not a rank)? Today several servants can hold the same tier.
