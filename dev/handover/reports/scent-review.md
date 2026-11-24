# E71r — BIG REVIEW review/scent de29c737 (PARKING #10 HƯƠNG RIÊNG)
PRIORITY #1 CHECK ('scent|hương riêng|lò hương|tẩm hương'): OD 0 new (owner row PARKING_LOT #10 20/11 ~06:35Z verbatim read; build OD 24/11 ~05:20Z) | ledger 0 | main 15 hits reused by the worker (j8 TAINT/inspect, jinv, j70 poison2 «huong», j1 LIKES, jdis, jagknow) + 1 MISSED family site found here (jthaiy pulse check, fixed) | review/* 0 other | claims E67 (worker, READY de29c737) + this seat.
Reviewer E71r = session_01DgYSWo5b8sXNAmSRTfQ98P · branch `review/scent-r` · **verdict sha 5c428bd8** (merge of de29c737 onto LIVE 03b47224 + 4 small reviewer fixes).

## Merge
`review/scent-r` d024ff68 = de29c737 merged onto origin/main 03b47224 (conflicts: assemble.py list = main's list + jscent.js after jdis; jinv.js Tẩm line = main's `balSg(BAL.eff.j8.taintDuc)` form + the two scent lines; index.html/sw.js rebuilt).

## Small fixes made by the reviewer (on review/scent-r)
| # | Fault found | Fix | sha |
|---|---|---|---|
| 1 | **Toggle exploit** (law 2/3): «Thôi xông» then «Xông» again burnt a new box each tap → +1 stat per tap, many per month (probe: 6 taps = Sắc +6 in one khắc). The card says «mỗi tháng». | one box a month: scBurn records p.scT = S.turn; picking/switching again in a month already burnt changes the scent but burns nothing («lò tháng này đã xông, sang tháng mới đốt hộp mới»). Probe after: 6 taps = Sắc +1. | 3214db02 |
| 2 | **Emperor likes AND dislikes the same scent** (law 6 / consistency): S.emp.likes.scent was filled lazily after jdis drew his dislikes (jdis pool now holds scent:*) → 2 of 60 fresh lives had liked = disliked. | scEmp fills his scent BEFORE normAll/jdis draws (likeKeys then excludes it) and never picks a scent already in S.emp.dis (old saves). Probe after: 0 / 60. | 3214db02 |
| 3 | **Law 1 NPC↔NPC copy missing**: only «NPC copies HER scent» existed. | scMonth: a consort whose thiện cảm toward another consort ≤ −BAL.scent.copy.ghen copies that one's scent with the same odds BAL.scent.copy.p (no new number). | 3214db02 |
| 4 | «Thôi xông» showed a loss as ĐƯỢC («cung ngươi không còn hương riêng», green) — law 3 / wording. | ĐƯỢC «giữ lại các hộp hương, thôi đốt mỗi tháng» · KÈM «cung ngươi không còn hương riêng, thôi <gain> mỗi tháng» (gain printed from BAL). | 1a44176a |
| 5 | **Law 11 family miss**: the Thái y pulse check (jthaiy) — her bắt mạch and the NPC Thái y find — only knew taints xa/chi/meo/bua, so a «tẩm hương độc» box was invisible to it; the new j70 route «lohuong» had no PW word (fell back to «dấu thuốc lạ»). | tainted() list + TW/TWHERE `doc`, PW `lohuong` (jthaiy.js). | c8732783 |
Tests added to dev/test/scent.test.js: T2b (no second burn), T5b (liked ≠ disliked), T6b (NPC→NPC copy), T7b (jthaiy knows doc/lohuong; static, negative-checked).

## Gates (on 5c428bd8 unless noted)
- `node dev/test/scent.test.js dev/index.html 3` → **PASS** (3 lives; also PASS on the plain merge d024ff68).
- `bash dev/tools/quickcheck.sh` → **QUICKCHECK PASS** (5c428bd8: core gates G1–G5 PASS, own build, old save from LIVE fd85907a ok, perf within gate; also PASS on d024ff68 and c8732783).
- role-parity ×2 → **ALL PASS ×2 on c8732783 (10/10 each) + ALL PASS once on 5c428bd8 (only main's thin-p6/map-perf merged after); ×2 also on d024ff68**.
- coop-e2e (worker skipped it) → **142/142 PASS on c8732783 (live Worker; Fold host + iPad guest, 3 weeks, leave/return, death/rebirth, old save). jscent's NPC month part is worldOn-gated; no canonical-W diff**.
- old save: quickcheck «old save ok» (LIVE 03b47224 save loads and plays a buổi) + scent.test T8 (no likes.scent / no sc filled by normAll).
- Shots (host build, CDN images, Fold 755x1000@2 + iPad 1180x820@2, 0 page errors, no horizontal overflow; LOOKED at all 6): box panel (kit pbtn «Xông làm hương riêng»: ĐƯỢC Sắc +1 mỗi tháng · KÈM đốt một hộp…), panel after a real tap (fact «Ta đang xông hương lan làm hương riêng», «Thôi xông» card with ĐƯỢC + KÈM), Emperor card «Hương» row (kit rows, same as Hoa/Nhạc/…). Shots kept in reviewer scratch only (not in git); the worker's dev/handover/shots/scent/ is deleted with this verdict.

## The 18 laws (those the work touches)
| Law | Result |
|---|---|
| 1 two-way | she↔NPC: pick/copy (she copies by buying a rival's box; NPC copies hers), tell (both observe, both are observed), poison (Tẩm + gift, j70 lohuong NPC→her / her→NPC / NPC→NPC, test T7). NPC↔NPC copy added (fix 3). OK |
| 2 equal value | 4 boxes one price BAL.scent.pr; one stat each (Đức 1 / Sắc 1 / Danh 1 / Sức 5 = the huongtram ratio). Liked = Sủng + but louder tell (more Ghen); disliked = Sủng − but quieter. Toggle exploit removed (fix 1). OK |
| 3 gain-and-loss | pick: gain stat / loss box + being smelt; stop: keeps boxes / loses gain (fix 4). OK |
| 4 one core | every number BAL.scent (+ BAL.odds via oddsCl, BAL.ag.eye via eyes); text prints BAL (kinvPlain/fmt). typed-stat scan: no jscent hit. OK |
| 5 harder as she climbs | tell odds + rk·rank of the visited (T6). OK |
| 6 real world | boxes bought (NPC buy()), stocked (npcStock), burnt 1/month, sold, given, tainted (e.by), found by Kiểm tra đồ / Thái y (fix 5) → evidence (T7). The tell can blame the wrong sharer (probe: ~2/3 of tells name a sharer, by design). OK |
| 7 wording | no %, no odds shown; stat deltas in the standard «Sắc +1» form only. Nit: her own smelling is logged as «Tai mắt báo:» even without tai mắt (not blocking). |
| 9 kit | pbtn action cards, kitFacts, Emperor pcard rows, log/kitKnow; no private CSS (jscent has none). OK |
| 11 family | incense sites scanned (lò trầm / lò hương / xông hương / huongtram / tuithom / đốt-thắp hương / xạ hương): poison/taint-relevant sites = j8 TAINT+inspect+gift, j70 huong+lohuong, jinv panel, jthaiy pulse check (MISSED → fix 5); the rest are prose/ritual (thắp hương, story text) with no incense object. |
| 12 devices | Fold + iPad shots looked at. OK |
| 13 gate zero | brief + worker report carry the PRIORITY #1 line. OK |

## Notes (not blocking; for a later pass)
- She cannot see a rival's scent anywhere except the morning tell lines (S.scSeen is recorded but shown nowhere); NPCs read hers directly to copy it. A «Hương» row on a rival's card once smelt would make her copy road as easy as theirs.
- NPCs spend down to BAL.scent.keep (10 bạc) on boxes each month (probe: up to −168 bạc / 24 months for one consort) — watch NPC bribe budgets in the robot round.
- Item icons for hg_tram/lan/que/mai: FOR MAIN art order already in reports/scent.md (generic fallback picture until then).

## Verdict
**PASS 5c428bd8 (LAND READY) — review/scent-r = de29c737 + 4 reviewer fixes, merged on LIVE fd85907a (ancestor ok). Worker shots dev/handover/shots/scent/ deleted with this verdict; reviewer shots were scratch only (no CDN folder made).**
