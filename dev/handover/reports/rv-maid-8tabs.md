# REVIEW maid-8tabs (BIG, opus) — MAIN CHÍNH 89 · reviewer session_01Rc5AsMYd9YDaGJ8Zvocx99 · 21/11

PRIORITY #1 CHECK ('maid-8tabs'): OD 21/11 rows ~03:15Z–03:25Z (#32–#36) + ~05:10Z reviewer rule | main LIVE 1e826e29 | review/maid-8tabs 7d68436b (worker session_01Rc5AsKY5rVpiLYpPGJuZPT) | claims: REVIEW maid-8tabs row (this session).
START_CTX ~4 % (1M window); finished well under the rollover line.

## VERDICT: FAIL — 1 item (everything else PASS; reviewer fixes pushed)
Branch **review/maid-8tabs-rv @ f479ac2f** = merge of origin/main 1e826e29 into 7d68436b (assemble list: main's list + jroad8; index/sw rebuilt) + reviewer fixes. The fixer continues FROM THIS SHA.

### FAIL 1 — Nguy hiểm chung panel on the maid road offers a consort-only act (law 6 real world, law 2/3, VANPHONG)
#36 put the Nguy hiểm chung box on the cung nữ road (jts tsBoxOn) — correct per her words — but its panel (jts tsDangerPanel → tsOptGuard) still offers
«Đóng cửa giữ mình»: TỐN **Sủng -2** (a cung nữ has no Sủng; her bar is Chủ tin, so the cost is fake → a free option), log «Ngươi đóng cửa cung, dặn kẻ hầu canh giữ nghiêm» (she has no palace door and no servants), kem «ít gặp Hoàng thượng». Seen on Fold + iPad (shot 15-nguyhiem).
Fix (whole group: every option the shared danger panel / the maid warning can offer on a non-consort road — tsOptGuard, tsOptGifts, tsDangerOmen's «Ghi nhớ» — check each):
on the cung nữ road give the guard act a maid-true version from the SAME act (one rule, kit option card): what she does (e.g. stays in the hạ nhân room / keeps to her chủ's side), a REAL cost on her own bars with the number from BAL (no typed -2; the consort's `fx:{sung:-2}` is a typed number too — move it to BAL while there, law 4), same gain (`s.guard`, read by jagharm haGuardW + jts npcAct wrapper for x===S, so the gain is real for her too). Equal value vs the consort's version (law 2). Then re-gate maid-8tabs.js (+ a line: danger panel on the maid road has no Sủng cost / no «cung»/«kẻ hầu» words) and quickcheck.

## Reviewer fixes (on f479ac2f)
| # | What | Why |
|---|---|---|
| 1 | j42 srvStaffTabHTML texts read SRVA: Trò chuyện `balSg(SRVA.chat.af/afL)`, `SRVA.chat.k` khắc; Biếu quà `balSg(SRVA.gift.af)`; Tố lỗi `SRVA.frame.k` | law 4: the rewritten Đồng liêu card typed +10 / -3 / +12 / «1 khắc» (values equal SRVA today) |
| 2 | j42 trKnown wrapper: a cung nữ knows her own chủ's nature (traitsOf, = what netTxt printed in the removed strip) | #34 verbatim «chủ kín đáo, thật thà, ham vui … Tôi bấm vào thì nó hiện những cái thông tin của người chủ đó»: after the strip removal the chủ card said Tính nết «chưa rõ» — the info was gone from the game. Now the chủ row tap → card «Tính nết: Khiêm nhường · Xảo quyệt · An phận» (checked) |
| 3 | jk2b kitPersonByName: pools that are not arrays are skipped | `S.srv` (an object) threw «(P||[]) is not iterable» inside every pcard of a person not found earlier — new on the maid road (Đồng liêu cards, Nam nhân). Console error gone (probe) |
| 4 | dev/test/maid-8tabs.js line 109 accepts `.kempty` | main's empty-states landed a new kitEmpty (.kempty); the test looked for the old kitSkillCard classes (2/57 FAIL on the merge, not a code bug) |

## Checks
- #32 same 8 bottom tabs + groups on maid + home road: PASS (maid-8tabs.js; tab-pairs consort 56×2 and a maid-pinned copy 56×2, 0 mismatches, 0 errors).
- #33 no strip; right column = consort's (2 kit buttons «N Đồng liêu» / «N Chí tôn», Ân sủng card, Nguy hiểm chung + Xét phẩm): PASS, compared with the consort road shot 17/18 — same parts, same order.
- #34 chủ = first row of the court box «Phi Liên Y · Chủ tin 43»; tap → Hậu cung › Chủ tử pager on her chủ (Fold + iPad, name matches srvM()): PASS (+ fix 2).
- #35 Đồng liêu = j15 staffTab layout (pgwrap + pager("staff") + pcard groups): PASS; deleted srvStaffHTML / SRVTABS / srvTabs / srvHead / kcTabs — `git grep` finds no caller (only comments; j67:1591 still uses class «srvhead» on a dead path — kitStageRail always exists — harmless, nit).
- #36 labels from ONE table (ROAD8_LAB, ROAD8.srv.rv «Chủ tử», staff «Đồng liêu»): PASS; boxes present: PASS; panel content: FAIL 1 above. Xét phẩm panel = her next rung, rows Công lao / cung chủ cap / Chủ tin x/BAL.srvx.tinUp: PASS.
- Law 4 BAL.srvx.tinUp = 35 replaces both typed 35 in srvMonth, same value: PASS (no other typed 35 for the rise).
- Group bug fixes (j79 stale head mark, jk3 kgfShut, j27 rvPgOf): consort road unaffected (tab-pairs consort 0 mismatch, coop tt+nc 94/94, consort court-row tap path same code).
- Old maid save from LIVE: PASS (maid-8tabs.js old-save line, + quickcheck old save).
- Older owner rules on the same elements (OD 05:10Z rule): right column parts/order (OD 18/11 ~21:40Z/21:52Z phone groups under the rail) unchanged — maid shows the same rail buttons on the phone map (shot 04 Fold); Ân sủng card (OD 11/15 04:05Z, 17:55Z) same plaque, one value per line; no colour change to Hoàng thượng rows (OD:L1362 gold untouched).
- Probe: 55 act-button taps over every consort panel on the maid road (Chủ tử, Chí tôn, Nam nhân, Giao tình, Hoàng tự, Tư trang, Tài nghệ): 0 page errors, road unchanged.

## Gates (on 6781309d merge unless noted)
- quickcheck 6781309d: PASS (render 247/247, tab 426/420, buổi 1138/1290 ms, tasks>200ms 18/20, core gates PASS). Not re-run on f479ac2f (3 small text/lookup edits) — the fixer re-gates.
- maid-8tabs.js 57/57 (f479ac2f) · ag-stf2 23/23 · tab-pairs consort + maid copy 0 mismatch · coop-e2e tt+nc 94/94 · tt+cnv (maid seat) 94/94 · role-parity ALONE: ALL PASS.
- Shots Fold 755x1000@2 + iPad 1180x820@2 (18 pairs: act, both folds, Dư đồ, Hậu cung ×4, Giao tình, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện, chủ tap, Nguy hiểm chung, Xét phẩm, consort compare): scratch only (not in git, deleted), looked 3×.

## Notes (not blocking, for MAIN)
- The consort panels now open on the maid road with all consort acts (Chủ tử card: «Mời nàng ta sang cung», «Sát hại»…). Per her 03:15Z words the content mapping is hers to rule later («đổi cái gì vào trong cái tab gì … tôi sẽ báo bạn sau»); no errors in the probe. Flag for her mapping pass.
- iPad Chủ tử / Phi tần card: long act titles wrap word-per-line («Sai tai mắt dò nơi ở») in the narrow title column — same consort layout, pre-existing, not this branch.
- Chủ card «Dạo này» shows her own entry log deltas (Sủng 8→0 …) — the shared «Dạo này» reader, pre-existing.

---
## ROUND 2 — PASS → LAND READY **561e3f47** (FF of main aee7ff84)
Fix 941c1367 (worker maid-8tabs-2) for FAIL 1: jts tsGuardW = ONE act, two roads — cung nữ «Nép mình theo hầu chủ» (Chủ tin −BAL.tsGuard.tin, need «không ở Tân Giả khố», log phòng hạ nhân / theo sát chủ), consort unchanged words with Sủng −BAL.tsGuard.sung; same s.guard gain BAL.tsGuard.wk weeks; NPC tsNpcDanger reads the same BAL (typed 2/2 gone, law 4). Group: Biếu quà làm lành (real bạc cost, no consort words) kept; tsDangerOmen consort-only. Verified Fold + iPad: card «Nép mình theo hầu chủ · TỐN Chủ tin −2 · ĐƯỢC 2 tuần: mưu hại … ít đi một nửa», no Sủng, no «cung / kẻ hầu».
Reviewer fix 7dabdd53: maid kèm «ít được chủ sai việc, …» was read by the kit option parser as a gain (green Được row, word «được»); now kèm «chủ ít thấy mặt ngươi» → same render path as the consort's «ít gặp Hoàng thượng».
Merged origin/main 2bf59027 then aee7ff84 (assemble: main's list + jroad8; index/sw rebuilt).
Gates: quickcheck 561e3f47 PASS (render 255/238, tab 516/470, buổi 1886/1460 — one slow run 3998 in 3; the two earlier quickchecks this round/last round were 1278/1228 and 1138/1290, box noise) · maid-8tabs.js 59/59 · coop tt+cnv 94/94 (561e3f47); on 4fb5312b: quickcheck PASS, ag-stf2 23/23, tab-pairs 56×2 0 mismatch, coop tt+nc 94/94, tt+cnv 94/94, role-parity ALONE ALL PASS.
Notes for MAIN (not blocking, pre-existing kit): the dialog option card drops a «kèm» line with no number (jk2b kitParse → notes): the consort's «ít gặp Hoàng thượng» never shows; the Sủng cost shows −3 for BAL 2 on the consort (a Sủng cost scaler) — worth a look by the kit keeper.
