# REVIEW staff-cap-fix — PASS f984fa5f (reviewer session_01UV1SzkW9AbJs8kAvGGWzkv, BIG, opened by MAIN s41)
PRIORITY #1 CHECK: OD 18/11 ~01:40Z (bug) / ~02:12Z (B2 live) / ~02:34Z (B2 HELD, ~25–27) / ~02:55Z (L1784 thinking aloud) | main j10 capOf/hhHas/capTrim/capSweep, jpromo BAL.promo.cap (unchanged on this branch) / trimTrust, jstaff fitCap | review/staff-cap-fix a2389cc (worker), review/staff-caps-count (measure only) | claims SziJshK worker DONE; this reviewer row.

Branch review/staff-cap-fix-r6 = a2389cc merged onto origin/main 3da5720a (535b7b48, generated files rebuilt) + 43799bbb site + **f984fa5f** (reviewer fix). origin/main is an ancestor → FF.
Caps table UNCHANGED (BAL.promo.cap still [[1,0],[2,0],[2,1],[2,1],[3,1],[3,2],[4,2],[4,2]]); the pick stays open with the owner.

## Checked (code read in full: j10 capTrim/capTell/capLaw/capRoom/capSweep, j14 cold, j29 hireCard, jstaff fitCap)
- One rule: capTrim is the only trim (fitCap = capTrim; capSweep on every render + servMonth + load). Exempt only personal maid (not in staff), eid, coop; home/stay sorted last (keep +5000) but DO go when nobody else can. eid women only reach Hoàng hậu / Thái hậu households (masterFor), so eid cannot push a low rank over the table.
- Every removal from HER household told: trusted (loyal ≥ trimTrust) = legacy farewell (unchanged), others = ONE kitPanel kind "notice" per trim; log line for all. NPC households data only.
- Paths: new life, demotion, cold palace (keeps per row 0, names who leave, no 2nd popup), home/stay, plant (capRoom refuses into a full house), hire, monthly sweep, co-op guest (trims only her own on seat b; figUsed world key untouched on seat b), co-op host (guest consort p.coop skipped), old saves of EVERY rank 0..7 (6 maids + 3 eunuchs → ser/deser/render: within table each rank, one grouped notice per load).
- Wording (VANPHONG): "BÁO · Nội vụ phủ điều người · Định lại kẻ hầu theo phẩm vị"; facts "Phẩm Đáp ứng theo lệ giữ 1 cung nữ (kể cả cung nữ thân tín), không có thái giám." + "<names> đều được điều sang hầu nơi khác."; no %, numbers from capOf (BAL). btn "Đã hiểu" is hidden by kit 32.10 (only ✕ shows) — verified in shots.
- Kit: T3 BÁO panel with the Nội vụ phủ picture (info-noi-vu.webp), kit ✕; no private CSS.

## Reviewer fix (f984fa5f)
- j29 hireCard: the pick card applies fx (Bạc −20) BEFORE go; the new at-cap re-check returned after payment → she paid and nobody joined (probe: bacDelta −20 on a2389cc, 0 after fix). Now the silver comes back + log "…bạc trả lại". New case in dev/test/staff-cap.js.

## Tests (on f984fa5f)
- staff-cap.js 28/28 ALL PASS (27 + r6 silver case) · staff-root.js 16/16 · one-core-guard PASS (3842 = baseline)
- quickcheck PASS (open 1080 ms, old save ok, render 142/144, tab 277/282, buổi 686/667 new/live, core gates PASS)
- coop-e2e ×3 in parallel under load (with quickcheck running): 63/63 ×3
- newlife-oldsave PASS (0 fail). seatcap-oldsave/palace-oldsave need old/new URLs (not run; unrelated to this change).
- Shots (scratch, looked at; not uploaded): Fold 755x1000@2 + iPad 1180x820@2 grouped notice and cold-palace popup — no overflow, no cut text, picture loaded. Worker CDN folder img/_review/staff-cap-fix wiped.

## Notes for main (not blocking)
1. Many trusted servants trimmed at once (old save) = one farewell popup each (legacy, by design: "farewell for trusted").
2. Her spy (spyFor "me") removed from an NPC household by that NPC's trim is not told (pre-existing; NPC data-only rule).
3. S.thO (Thái hậu household) is never trimmed (pre-existing; capTh not enforced by capTrim).
4. Owner 18/11 01:50Z empty-picture rule: the notice's picture box is empty for ~1–2 s in host mode until info-noi-vu.webp loads → belongs to the life-preload worker (add info-noi-vu to the preload set).
