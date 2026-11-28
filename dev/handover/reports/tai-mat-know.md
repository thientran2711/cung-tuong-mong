# TAI-MAT-KNOW — a master resents a spymaster only when she really learns it

PRIORITY #1 CHECK: OD 49 «tai mắt» hits, none gates oán on knowledge (OD 27/11 ~04:16Z = this order) | main 0b43ee55 j24.js:34 svDefect, j29.js:27, j10.js:74-92, j14.js:83-85 (Tra xét), j42.js:240/295/376/413, jky.js:221 + jbalky sv_den, jbalkyc kyc-sv-001/016, jtsb.js:243, j7.js:48-52, jagknow tmRefuse/tmTry/knErrSell | review/* 0 | claims none → this worker.

Branch `review/tai-mat-know` (from origin/main 0b43ee55). Worker session_01Rc5AsLs77k5Zjpz1euhJR4. START_CTX ≈ 5 %.

## Where the owner saw it (root cause)
Kỳ ngộ «Đèn rơi cứu người» (`sv_den`, jbalky) and its two composed twins (`kyc-sv-001`, `kyc-sv-016`, jbalkyc from
dev/handover/content/thin/kyseeds_b.md): the option «Giữ nàng ta làm tai mắt» had cost `oan:8` / `oan:6`. jky `runOpt` turns a cost
`oan` into `oanAdd(third, F)` + the result line «<chủ> để bụng oán <ngươi>» — `third()` = the servant's own master when no rival stands there.
So the moment the servant agreed, her master resented the player, though nobody told the master. (The j24 / jtsb «Có người đến» defecting maid
and the j7 volunteer carried no direct oán; they now follow the same gate.)

## The rule built (OD 27/11 ~04:16Z MAIN rec, followed exactly)
- ONE helper `spyLearn(m, b, aff)` (jagknow): master `m` LEARNS that `b` turned her servant → oán `+BAL.ag.know.tm.learn.oan` (8),
  thiện cảm `−BAL.ag.know.tm.oan` (6, the old refusal-report number). Remembered as `m.spyKn[key(b)] = week` (lazy). Her and every NPC (law 1).
- `spyFound(s)`: her two-faced servant is found → `knSoldFound` + she learns WHO bought him → `spyLearn(S, buyer)`; returns the buyer so the road names him.
- `spyLeak(S, n)`: her own turned servant never gives a notice; when her palace's talk really reached a rival through him, ONE sign line
  «Chuyện trong cung ngươi dường như lọt ra ngoài.», at most once a week.
- Recruiting itself never touches the master's feeling. No new button, screen or state to read.

## Table (law 11) — road | rel / notice BEFORE | AFTER
Scan: `node dev/test/tai-mat-know-scan.js` (before = origin/main files: 4 breaches; after: 0 breaches, 23 learn calls).

| road | before | after |
|---|---|---|
| Kỳ ngộ sv_den «Giữ nàng ta làm tai mắt» (owner's case) | master oán +8 at once, line «X để bụng oán ngươi» | no oán, no line (cost 1 khắc, gain a Tai mắt; kyngo-eq PASS) |
| Kỳ ngộ kyc-sv-001 / kyc-sv-016 (same family) | master oán +8 / +6 at once | none (fixed at the seed source, jbalkyc rebuilt) |
| j24 / jtsb defecting maid «Thu làm tai mắt» | price typed 20 (j24), BAL copy in jtsb; leak roll → evidence only | price `BAL.ag.know.tm.def.bac` (one number); leak hit = her master learns → spyLearn; card «kèm» says so |
| j7 volunteer «Nhận làm tai mắt» | no rel | no rel (unchanged) |
| j7 «Thử lòng trước» failed | Danh −3 typed | Danh `BAL.ag.know.tm.vol.danh`; he tells his master → spyLearn; card shows it |
| Mua chuộc taken (cnvBribeOpts take / j29) | servant only | servant only (unchanged) |
| Mua chuộc refused + told (cnvBribe tell) | relAdd(master, briber) | spyLearn(master, briber) |
| j29 fallback refused + told | relAdd(a,o,−5) typed, two-way | spyLearn(o, a) |
| Cài tai mắt try refused + told (tmRefuse) | affAdd(o,p,−6) | spyLearn(o, p) (same −6, + oán) |
| Cài tai mắt try taken (tmTry / tmAsk / tmTake) | no rel | no rel (unchanged) |
| Cài người (plantServ) taken | no rel | no rel; refused at the gate → spyLearn(t, a) |
| Dọa tố (threatServ / j42 threat) | servant's oán only | unchanged |
| j70 accomplice refused + told | evidence only | evidence + spyLearn |
| knErrSell: the scouted one bought the scout | affAdd(t, m, −scout.oan) | spyLearn(t, m, scout.oan) |
| Tra xét (searchMaids) — her | evidence only | evidence + spyLearn(S, buyer) (she now resents him) |
| Tra xét — NPC master | evidence only | evidence + spyLearn(master, buyer) |
| Tra khảo confession (servDo phat / jhouse / jeitem) | evidence only | evidence + spyLearn |
| j68f Theo dõi / Hỏi thẳng / Thử tin giả | knSoldFound, buyer not named | spyFound: buyer named in the line + spyLearn |
| j72 «Dò xét kẻ hầu» / «Nhắc khéo Hoàng hậu» | spy cut, no rel | spyFound (Hoàng hậu / she learns who) |
| j42 maid-player caught by her mistress | punishment only | + spyLearn(mistress, buyer) |
| co-op «Từ chối, bẩm chủ» (jcoopworld) | relAdd(S, o, −5) two-way | spyLearn(o, S, 5) |
| HER servant bought by an NPC (j10 month) | «Có tin: …» when she had any 3 Tai mắt anywhere | told ONLY by a real Tai mắt of hers in the buyer's palace; then found + oán; else nothing |
| HER wronged servant sells her news (j24 svSell) | log «X, kẻ từng bị ngươi phạt oan, lén bán tin cho Y» (direct notice) | no name; the sign line only |
| HER servant's «Lén báo tin» / «Mật báo» / sells an errand / sells what he saw (j10, jagstaff, jagknow) | silent | the sign line (once a week) |
| «Tra khảo» button / Phạt on her own servant (j24, jhouse, j10 servDo) | button switched to «Tra khảo» on any spy = told who is a spy; Phạt made him confess | «Tra khảo» only after she found him (knSoldK); an unfound spy is just punished |

## BAL (law 4)
`BAL.ag.know.tm.learn.oan` 8 · `BAL.ag.know.tm.def.bac` 20 (was typed in j24 and copied as `BAL.eff.jtsb.bacFx`, removed) ·
`BAL.ag.know.tm.vol.danh` 3 (was typed). The j29 typed `relAdd(a,o,−5)` is gone.

## Tests
- `node dev/test/tai-mat-know.test.js` — 19/19 ok (recruit roads leave the master's feeling; learn roads add oán; her turned servant gives no
  notice, «Tra khảo» only after found, unfound Phạt reveals nothing, sign once a week; old save without spyKn/leakW loads and plays; 0 page errors).
- `node dev/test/tai-mat-know-scan.js` — 0 breaches (main: 4).
- one-core-guard PASS · kyngo-eq PASS (sv_den ratio 1.23 ≤ 1.25) · kyseeds_validate 0 errors · npc-purpose-scan PASS ·
  coop-e2e 143/143 · ag-taimat2 16/16 · ag-betray 20/20 · ag-sell 19/19 · ag-soft 20 · ag-truth 11 · ag-stf2 23 · charge-followups PASS · kyngo-unit PASS.
- ag-taimat (2 FAIL), ag-know (6 FAIL), ag-par3 (7 FAIL), cmaid-unit (dtqGuard/muoiBack false): the SAME failures on origin/main 0b43ee55 (pre-existing,
  not this branch). ag-taimat's discovery-site count now also counts `spyFound(s)` (j68f records through it).
- Devices: kỳ ngộ «Đèn rơi cứu người» choice + result on Fold 755x1000 and iPad 1180x820 — options «Giữ nàng ta làm tai mắt · TỐN 1 khắc · ĐƯỢC thêm
  một tai mắt»; result «… thành tai mắt của ta trong cung …», no oán line; no overflow; shots in the worker scratchpad (not in git).
- quickcheck 7b29a3f9: open 2233 ms 0 errors · old save from LIVE loads and plays a buổi · perf median new/live render 199/241, tab 617/565, buổi 1378/1219,
  tasks>200ms 33/26 (in noise) · core gates: one-core / rules-one-source / kit-conform / npc-purpose PASS; ONLY G4 90-button-crawl FAIL =
  «fold · Ô lưu (title save screen) · Lui · close button did not close its layer» — the SAME fault on origin/main 0b43ee55 (crawler run against a served
  main checkout), title-screen code this branch never touches → pre-existing, not this branch.

## Notes for the reviewer
- NPC masters punishing a servant (servDo phat by an NPC) still interrogate as before (no player info leaks there).
- jrd_bd2 «Dò xem ai báo cho {v}»: left as is — the card says {v} resents on success AND failure (a loud search tips him off = he learns).

## Handover
Done; nothing open. If a reviewer FAILs: helper + BAL live in jagknow.js (search TAI-MAT-KNOW) and jbal2.js `BAL.ag.know.tm`.
