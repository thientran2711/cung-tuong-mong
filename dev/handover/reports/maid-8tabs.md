# maid-8tabs — report (worker session_01Rc5AsN3dAttmwAANVGfgtX, MAIN CHÍNH 85)

PRIORITY #1 CHECK ('cung nữ maid tabs Phận sự Đồng liêu SRVTABS KCTABS kgOn'): OD 0 earlier rule (new rule 21/11 ~03:15Z + ~03:18Z) | main dev/build/j42.js SRVTABS + srvTabs + srvHead, j79 kgOn (isSrv off), jhc:185 court/men hidden for srv, jht:174/278 HTK off for srv, jkc KCTABS/kcTabs + kgOn off at home, jk3 K3_RIGHT servant box | review/* none | claims: this row only.

START_CTX ~4 % (1M window). Finished well under the rollover line.

Branch **review/maid-8tabs** @ **5d0ac1c6** (base origin/main a88b14f0). TIER BIG.
Shots (Fold 755x1000 + iPad 1180x820 side by side, @2, real pictures): CDN `img/_review/maid-8tabs/` (11 files: maid-01-home-33 … maid-11-menh-truyen-so-ghi). Looked at all of them 3×.

## What changed
- **dev/build/jroad8.js (new, last in assemble.py)**: `ROAD8` = THE ONE mapping table (consort tab key → what a road shows there). Owner decides the final mapping later → only this table changes. Guards: unknown / hidden key on a road → Hành sự (old links/saves); `renderPanel0` dispatch (road panel under its own key, kitEmpty, or the consort panel as is). Helpers `road8Hide / road8Label / road8Name`.
- **j79**: `kgOn()` true on every road (only death turns groups off); `kgKeys` drops keys ROAD8 hides; `kgLabel` reads ROAD8 labels; `kgBar` hides every non-head member (incl. hidden keys); a group with one sub-tab shows no sub-tab row.
- **j42 (cung nữ)**: bar no longer relabelled/hidden (`srvTabs` no-op; SRVTABS kept only as old names); `tab in SRVTABS` guard gone; **#33 `srvHead` strip removed** (function deleted); `rkName(S)` / `rkOfFace("consort",S)` = her servant rung on her road (consort panels said «Đáp ứng»).
- **jhc / jht**: Chí tôn, Nam nhân and the 5 Hoàng tự sub-tabs open on the maid road too; Ân oán self row = her rung; the court/rel sub-label override respects ROAD8.
- **jkc (tiểu thư ngoài cung)**: same 8 tabs + groups at home (kcTabs no-op, KCTABS guard + kgOn override + ksub removal gone); «Áp lực hôn sự» chip opens Giao tình (rel).
- **jk3 (#33 right column)**: maid = «Chủ tin N» kit button (same `krailb krailt kgfbtn`) where the consort has «Cung nhân», then Chí tôn, then the **Ân sủng card** with Tai mắt + Ngài để ý (nt) + Công lao + Lương tháng (+ Tân Giả khố / Biết chuyện của chủ / Tai mắt cho người khác when they apply). The separate servant box (srk/nt/wage/merit) is gone; srk is the header title. Phone-map rail gets the same Chủ tin button.
- **jpet**: Tư trang › Thú cưng sub-tab (kitEmpty «Phận cung nữ chưa được nuôi thú cưng…») + the empty pet slot on the maid road (pet rules unchanged: tsbOn still off for her).
- **Words (fix the group)**: j42 entry card «Mục Hành sự … Dư đồ … Hậu cung › Đồng liêu», jexam «ở Hành sự», jtut tab rows identical for every road, jgoal `tabName` / goal «where» via road8Name («Hậu cung › Đồng liêu»), j84 dead SRVTABS rename + «Mục Việc» pair removed.
- Kit parts only (law 9): kit sub-tab row, kitEmpty, kit rail button, k3 Ân sủng card. No new CSS.

## MAPPING TABLE (ROAD8 in dev/build/jroad8.js — the owner's later ruling changes only this)
| Bottom tab (same on every road) | Sub-tab key | Consort | Cung nữ (srv) | Tiểu thư ngoài cung (kc) |
|---|---|---|---|---|
| Hành sự | act | Hành sự | **Phận sự** cards (her deck) | Khuê phòng cards |
| Dư đồ | go | Dư đồ | her Dư đồ (srvMapFix) | her home map |
| Hậu cung | court | Chí tôn | Chí tôn (consort panel) | **Thư từ / Tin trong cung** (KCTABS.kid) |
| | rv | Phi tần | Phi tần | **Gia tộc** (KCTABS.rv) |
| | men | Nam nhân | Nam nhân | — (not a sub-tab) |
| | staff | Cung nhân | **Đồng liêu** | — |
| Giao tình | rel | Ân oán | Ân oán | **Giao du** (KCTABS.staff) |
| | fac | Phe phái | Phe phái | — |
| Hoàng tự | kid kvo kin hon qt | 5 sub-tabs | same 5 (Con của ta = «Ta chưa có con» card) | kitEmpty «Ngươi chưa vào cung, chưa có con.» |
| Tư trang | inv | Túi đồ · Thú cưng · Việc | same 3 (Thú cưng = kitEmpty) | same |
| Tài nghệ | art | Tài nghệ | Tài nghệ | hers |
| Mệnh truyện | story | Mệnh truyện | **Thân phận** cung nữ | her Mệnh truyện |
| | q72 | Việc nhờ | Việc nhờ | — |
| | log | Sổ ghi | **Sổ ghi** | — |
(KCTABS names follow her variant: thôn nữ / công chúa hòa thân — e.g. Thư từ · Vương tộc · Triều đình.)

## BEFORE / AFTER — every maid-only (and home-road) layout difference removed (#32 + #33)
| # | Place | Before | After |
|---|---|---|---|
| 1 | bottom bar, cung nữ | 5 tabs «Phận sự · Dư đồ · Đồng liêu · Thân phận · Sổ ghi» | the consort's 8 tabs, same order/labels |
| 2 | sub-tabs, cung nữ | groups off (kgOn false) | same groups + sub-tab row as consort |
| 3 | Chí tôn / Nam nhân | hidden on maid road (jhc) | sub-tabs of Hậu cung |
| 4 | Hoàng tự sub-tabs | Kế vị … Quý tộc hidden (jht) | all 5 |
| 5 | Tư trang › Thú cưng + pet slot | missing for maid | present (kit empty card / empty slot) |
| 6 | strip under tabs (#33) | «Cung nữ tam đẳng của … · Chủ tin 43» | removed (header already says it) |
| 7 | stage right column (#33) | Tịch Cần viện + «Chí tôn» only + separate servant box (Cung nữ tam đẳng / Hoàng thượng để ý / Lương tháng / Công lao) | consort layout: «Chủ tin N» in the Cung nhân place · Chí tôn · Ân sủng card (Tai mắt + her facts) |
| 8 | her title in consort panels (Ân oán self card, etc.) | «Đáp ứng» | her servant rung («Cung nữ tam đẳng») |
| 9 | bottom bar, tiểu thư ngoài cung | 8 tabs with other names (Khuê phòng · Gia tộc · Giao du · Thư từ …) | the consort's 8 tabs; her panels as sub-tabs |
| 10 | help / goal / exam lines | «Phận sự», «Mục Việc», «Đồng liêu» tab names | the 8-tab names («Hành sự», «Hậu cung › Đồng liêu») |
Scan used: dev/test/maid-8tabs.js (bar + every tab/sub-tab key set equals the consort's on both roads) + a panel scan for any consort rank printed next to her own name on every maid tab (none left).

## Tests (on 5d0ac1c6 unless noted)
- `bash dev/tools/quickcheck.sh` — PASS on 06807c14 (render 263/267 ms, tab 437/449, buổi 1339/1457, core gates PASS); on 5d0ac1c6: run A FAIL on perf only (buổi median 3427 vs live 1091; runs 4814/1092/3427), run B **PASS** (render 250/245, tab 447/422, buổi 1321/1004; runs 3223/1255/1321). One slow buổi run in each 5d0ac1c6 pass vs none on 06807c14 (runs 1339/1487/1233); the only code between them is the rkOfFace/rkName wrappers (O(1)) + one jhc label + one jk3 label — looks like box noise, but **reviewer: please re-measure buổi** (quickcheck perf).
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js` — 92/92.
- **both-seat** (new check in coop-e2e: the 8 tabs + each seat's own road): `COOP_A_ORIGIN=tt COOP_B_ORIGIN=cnv` — **94/94** (one earlier run 92/94: «both seats show the same Thái hậu picture» on the maid seat, gone on the re-run; not tab related, flaky S.thO timing).
- `node dev/test/maid-8tabs.js <new> <old live>` (new) — **41/41** on Fold + iPad: 8 tabs maid/home/consort, same sub-tab keys, labels, every tab opens, #33 strip/column/Ân sủng, her title, **rank-up maid→consort** (lands on Hành sự, consort sub-tab names, Cung nhân button, every tab opens), **old save from the live build** (loads, Hành sự, 8 tabs, remembered Hậu cung sub-tab), home road Hoàng tự empty card, no page error.
- `dev/test/tab-pairs.js` — consort 56 pairs ×2 sizes, 0 mismatches; same test pinned to the maid road (scratch copy) — 56 pairs ×2, 0 mismatches, 0 errors.
- `node dev/test/role-parity.test.js dev/index.html` — ALL PASS.
- `maid-ladder-6.js` 11/12, `promo-exam.js` 32/33 — the failing lines (old build «5 rungs, no lad6»; promo-exam old save) fail the same way with main a88b14f0 as the new build (pre-existing / stale), not this branch.

## Notes for the reviewer
- No save field changed (tab is not saved); old localStorage `hclh-kg-*` keys stay valid.
- Co-op sends no UI state; each seat computes its own road (verified both seats).
- Known open (not in scope): kc road shows the consort pet sub-tab because tsbOn is true at home (unchanged behaviour).
