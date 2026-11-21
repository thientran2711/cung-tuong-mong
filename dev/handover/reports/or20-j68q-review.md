depth 6
# or20-j68q BIG review (E31r, opus, depth 6) — of review/or20-j68q cd23ef92
PRIORITY #1 CHECK ('or20|j68q|lãnh cung|tuyển tú|kitHintPhrase tin'): OD 12 | ledger 2 | claims 8 (E31 SSK cd23ef92 + this row) | main: j68.js e68On/e68Cands/e68FuTick (only definers), j27 tuyenTu (only definer; jcoopask wraps it for the guest), jk2b kitHintPhrase (no row for «Chủ tin» / «Hoàng thượng để ý») | review/* 1 (review/or20-j68q) | no second copy of any q6 rule (git grep q6 / BAL.eff.j68q: j68q.js + jbaleff.js + tests only).

VERDICT: **PASS** — LAND READY on review/or20-j68q-r6 @ 88205658b5fd836bd1c0c00f534c0d3218db7470 (= LIVE 0d60ae54 + or20-j68q + reviewer fixes; FF on 0d60ae54). LIVE since then (5a8c30af … 60dd62c3) shares no file with this branch but index.html/sw.js → main self-merges index/sw.

## Reviewer fixes (small, made here)
| # | Law | Before (cd23ef92) | After |
|---|---|---|---|
| 1 | 6c / crash | q6coldRice option «Chia phần ít ỏi cho người hầu» applies `maid` loyalty; the card came even with no S.maid → apply() throws on S.maid.loyal | the card needs S.maid (the one the lãnh cung household cap keeps); test check «rice card needs the one maid she still has» |
| 2 | 7 / truth | q6coldLetter 3rd variant spoke of cold-medicine, its options of a letter | variant 3 = «{A} nghe tin Hoàng thượng sắp ngự giá qua Tây cung, xin mang thư của ngươi ra đón đường.» |
| 3 | brief / plan point 3 (tú nữ selection) | left out (tú nữ are not living NPCs before selection — law 6b, correct) | the reachable half built: j27 tuyenTu wrapped to stamp the girls who REALLY entered (v.ttY, on the consort = one world for both seats); new Hoàng hậu duty q6hhNew (receive / teach / test a newcomer, once each, within a year; od BAL.eff.j68q.od.newT); EV6, 3 options gain+cost, law 5 via q6od |
| 4 | L594 co-op gate | co-op test ran one seat order only (host in lãnh cung) | or20-j68q-coop.js COOP_SWAP=1 = guest in lãnh cung, host Hoàng hậu; both orders 11/11 |

## Law check (18 laws, the ones this touches)
- 1 two-way: rice taken ⇄ «Lấy phần của nàng bù lại»; framer gloats ⇄ q6visitCold (only a consort SHE sent: v.coldBy==="me"); maid takes credit ⇄ «Nhận luôn việc của A»; she judges ⇄ q6hhAccused. Between the PLAYERS in co-op: the gloating framer can be the other player, and the other player in lãnh cung is the one the free seat can visit (both seat orders). NPC-side life in lãnh cung (faction acts while cold) is E33 cold-faction, already LIVE — not duplicated here.
- 2/3: each of 18 cards 3 options, each a gain AND a cost (test «every option has a gain AND a cost», «options differ»). Bạc road always beside a non-bạc road of the same card.
- 4 one core: every amount BAL.eff.j68q; one-core-guard PASS (inline 3776 ≤ 3930). Months 3/9 of the rite card are calendar facts, not rules.
- 5: q6od −BAL.eff.j68q.rk[life] per rung (test: lãnh cung 48→38, Hoàng hậu 46→42).
- 6a: accused only on a real wrong (bias / skim written by her own choices); denial can fail; gloat evidence really clears her at BAL.coldEvNeed (restore(true)). 6b: every actor a real NPC (court office names, S.maid, srvM staff, real newcomers). 6c: nothing created or lost.
- 7 / VANPHONG: odds by word(); no %; new lines cổ trang.
- 9 kit: no UI; cards are the kit event dialog (shots).
- 11 group: the S.maid guard checked on every q6 card that names the maid (q6coldLetter already guarded).

## KIT dependency (pre-existing on main, not a gate) — filed dev/kit/KIT_REQUESTS.md 21/11
jk2b kitHintPhrase has no row for the servant stats «Chủ tin» (NAMES.tin) / «Hoàng thượng để ý» (NAMES.nt). On every servant-life card (j42 and the 4 new q6srv cards) a «Chủ tin +n» gain reads «chẳng được gì» and a «Chủ tin −n» kèm shows TỐN «không» (seen in the Fold shot of q6srvCredit). Kit keeper adds 2 rows; then all servant cards read right at once.

## Gates
FULL set on fb372307 (FF on LIVE a88b14f0) — all PASS:
- or20-j68q (4 lives × 26 months + every template + laws): 18/18 PASS, 0 page errors (cold 21 cards / 5 kinds, servant 20 / 4, Hoàng hậu 43 incl. duty cards, low-rank palace none of the 3 families).
- coop-e2e 92/92. or20-j68q-coop both seat orders: A cold / B queen 11/11, B cold / A queen 11/11.
- QUICKCHECK PASS (open 1795 ms · old save ok · render 234/284, tab 437/478, buổi 1079/1269 ms · core gates PASS). one-core-guard PASS. role-parity ×2: ALL PASS, both logs identical.

SHORT re-gate on 88205658 (FF on LIVE 0d60ae54; FOREMAN E #25 order — the merge brought only main's own changes, no conflict but index/sw/assemble list/KIT_REQUESTS rows): one-core PASS (inline 3776 ≤ 3930) · QUICKCHECK PASS (open 1704 ms · old save ok · render 272/248, tab 525/494, buổi 1330/1311 ms) · coop-e2e 92/92 · both-seat 11/11 + 11/11 · or20-j68q (8 months) 18/18, 0 page errors.
- Shots (local only, CDN 401; not committed; deleted after verdict): Fold 755x1000@2 + iPad 1180x820@2 of q6coldRice, q6srvCredit, q6hhNew, q6hhAccused — kit event dialog, real names, no overflow, no cut text, no page errors; looked at each.
