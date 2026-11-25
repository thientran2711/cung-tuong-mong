# hardlock-choice — no choice card may lock her (SEAT C, brief b-coop-0045)

HARD-LOCK FIXER (opus) session_01N1tNP3HWwA785d24xRGQTm · START_CTX ≈3 % (used_tokens read 0 → estimate) · roll at ≈28 %, ceiling 60 %.
PRIORITY #1 CHECK ('j68c'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 0 · ('hard-lock'): all 0 — reused: the one choice path j3 showModal / chooseM, kit grey jgrey (kitOff / kitOffBac), kit ✕ (kitCancelIx / kitModalCloser), harvest of dev/tools/choice-value-scan.js; nothing rebuilt.

## SẴN SÀNG KIỂM review/hardlock-choice ea9cfd51da75974e8e07b12719c2c37772a1f147 (from LIVE 502c48c9)

### What was wrong (FIXER #9, LIVE, solo + co-op)
j68c «VIỆC · Kẻ hầu» j68c-serv-022: all 4 stances cost bạc (BAL steps 2/1/1/1 × 60); at 46 bạc j3 showModal greys every road (poor), the card has no ✕ → the game stands still. Law 2 («a bạc road always has another road of equal cost») + law 3 broken; a dead end.

### Fix (shared engine, not per card — law 11)
`dev/build/jnolock.js` (assembled LAST, after jcoophl: the outermost showModal / chooseM wrappers, so the thin guest, the host running her pick, bots, the ✕ closer, the co-op timer and every inner wrapper see the same roads):
- `kitLockWhy(c,m)` = ONE list of every hold-back the game has: kit grey (c.off), bạc short, gift lock (c.lock), night taken (j75 c.lk), temper (jemoact eaLockWhy). `kitTakeable`.
- `kitNoLock(m)` before every draw and every pick: a road she can take or a ✕ → nothing changes. Else every road held back by **bạc alone** is offered paid with an **equal value**: her whole purse, the rest in Sức (then Danh) at `BAL.nolock.per` = the j68c step table (one bạc step == one Sức step: 40/8 = 5 bạc per Sức; 40/3 per Danh) — all such roads change the same way, so they stay equal (law 2); the road name gets `BAL.nolock.tag` « (thiếu bạc, lấy công sức bù)»; Tốn row shows the real numbers (Bạc −46 · Sức −15). Nothing payable (no Sức / Danh either) or held back by rank / item / evidence → a «Thôi» road is added: the kit ✕ on an open card, a plain road on a forced card (mustChoose); it leaves the card, nothing paid. Undone and worked out again every pass (her purse can change). A road greyed by rank / item keeps its price and grey (never paid another way).
- `BAL.nolock` (jbal2.js, after BAL.j68c; numbers derived from BAL.j68c.fx.m — law 4). `jgrey.js kitOffBac` tags `c.off.k="bac"` (data tag only, no look change) so a bạc grey set by a builder can be paid the same way; a stale bạc grey she can now pay is cleared.
- No new UI part: the same kit option card, Cần/Tốn rows, kit ✕ (law 9). Words cổ trang, no digits in the tag (law 7).

### Family scan — `node dev/tools/hardlock-scan.js [--turns N] [--purse 0,46] [--md]` (from a built repo root)
Walks every PEND builder (2 pp variants), every EV6 j68 template (old 90 + 460 composed, own cast), MF7 / FV7 / FX7 / WORLD cards / TSA summons, + N buổi steps (nextBuoi); draws each card through the REAL showModal at purse 0 and 46 bạc and judges the DOM she sees (open roads + kit ✕). Always-on PLANT (2 roads, both bạc over her purse, no ✕) as self-test. Static part: every seed file option set whose EVERY option costs bạc.

| scan (`--turns 40 --md`) | LIVE 502c48c9 | head ea9cfd51 |
|---|---|---|
| choice cards judged | 906 | 907 |
| HARD LOCKS | **2**: j68c-serv-022 «Kẻ hầu» (120/60/60/60 bạc), j68c-sea-023 «Thời tiết» (4 × 60 bạc) | **0** |
| PLANT (self-test) | LOCKED | not locked (guarded) |
| page errors | 0 | 0 |
| static: seed option sets all-bạc | 6 (j68c-serv-022, j68c-sea-023, j72c-craft-007/029/057, j72c-social-013) | 6 (data unchanged; the 2 j68c are now guarded by the engine; the 4 j72c are «pick» steps of an accepted favour in the Việc nhờ panel, which always has «Bỏ việc» (q72Drop) → never a lock) |

Coverage note: 243 of 550 j68 templates had no cast in the one scan world (their people / needs absent); every composed seed's prices come from data, so the static part covers all 460 of them. 8 cards were held back by other wrappers (j95c clash / festival not today) and not judged — same on both builds.

### Gates (commands + outputs)
- `node dev/test/hardlock-choice.js` (new; Fold 755x1000 + iPad 1180x820): on LIVE 502c48c9 → `HARDLOCK-CHOICE FAIL (12)` («at 46 bạc she can take a road (0 open, ✕ false) — [off] Thưởng nặng… | [off] Đưa nàng… | [off] Kể công… | [off] Cầm tay…», both devices); on head → `HARDLOCK-CHOICE ALL PASS` (3 runs): 4 roads open at 46 bạc, road taken pays Bạc −46 + Sức −15 (74 bạc short at 5 bạc/Sức), card gone; enough bạc → card untouched; purse 0 + no Sức/Danh → kit ✕, leaves, nothing paid; forced card greyed by rank → one plain «Thôi», rank-greyed road keeps price + grey; 0 page errors.
- `bash dev/tools/quickcheck.sh` → `QUICKCHECK PASS · 267 s · open 2191 ms · old save ok · perf (median of 3, new/live): render 286/296 ms, tab 594/542 ms, buổi 2097/4534 ms, tasks>200ms 26/27 · core gates PASS · build 3 s · total 683 s` (core gates: one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 7; TIME-SPILL GUARD PASS).
- `node dev/test/one-core-guard.js` → `PASS: one core (no second value, no typed core text, no new inline rule number)`.
- `python3 dev/build/assemble.py && node dev/test/undef-scan.js` → `PASS: no unguarded undefined identifier (302 names checked)`.
- `node dev/test/coop-e2e.js` (Fold host A + iPad guest B, LIVE Worker) → `142/142 passed` (co-op: the wrappers are outermost, so the thin guest and the host running her pick build the same roads; the added «Thôi» goes through closeModal = her i:-1 leave on the host).
- SHOTS (scratch only, not in git; LOOKED 3×): serv022 at 46 bạc, Fold + iPad: kit VIỆC frame, 4 open option cards, Tốn «Bạc -46 · Sức -17/-4» (before the rate fix to the pure step rate), no overflow, names wrap, no cut text.

### Notes for Foreman B (not blocking)
- Data law 2 (content, not a lock any more): j68c-serv-022 / j68c-sea-023 have no non-bạc stance; j72c-craft-007/029/057 + social-013 «pick» steps are both-bạc. The engine now always leaves a road, but a writer pass could give each a non-bạc stance of equal steps.
- Existing scripts that check `c.fx.bac&&S.bac+c.fx.bac<0` inline (bots/measures, jcooptimer autoRead, j87, jemoact) keep working: after kitNoLock the paid-another-way road is no longer «poor».
