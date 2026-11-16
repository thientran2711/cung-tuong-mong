PASS 287a7010589184b207a4854e1f01fc6fef155304

# review-coop-b1b5-fix-r1 — reviewer report (Foreman D; D21 co-op B1–B5 final review)
Reviewed review/coop-b1b5-fix @ 7c7fcc452d2e6bed5267d3f5f5bf62bbea255992 (worker report reports/coop-b1b5-fix.md).
Result branch review/coop-b1b5-fix-r1 = 7c7fcc45 + merge origin/main b85cdb1e (mortality-r1, night-end-r3, promo-skip-r1) + reviewer fixes
+ merge origin/main ee5d33de (merge-train-7: servant-mline-r3, cycle-art-r1, balance-pass-r1, act-split-w2, scene-end-sweep …)
+ merge origin/main 73c06812 (cardflip-glow2-r2, skin-norosy-r1). Head 287a7010; origin/main 73c06812 is an ancestor → fast-forward. Rebuilt with assemble.py + build_site.sh. Not deployed. START_CTX ≈ 3 % of 1M; finished ≈ 20 %.

## 1. The BLOCKING item of review-coop-b1b5-r2 (guest's Kỳ nguyệt sự answer before the host's B2 draw): FIXED
- jcycle `cybOf(p)` gives the friend's entry her own relayed flags (COOPW.fcyb: the ctm-p2 "cyb" relay, else her merged blob's S.cyb); NPC = null.
- jcoopworld: each seat relays `cyRec()` on render when it changes (never mid-endTurn; resent after a reconnect). The host's flip wrapper holds
  the draw (`CW.cyHold`, no draw, `sendEnd` blocked) while her entry is in her cycle tuần and her answer for that week is not in. Her answer
  (pend=false) or her week end (presence `ended`: an old client) runs `cyFree` → flip again → week end goes out. The host's own open card is respected.
- Her guest sendEnd waits for `!Q.length`, and pushDil goes through Q, so her week end can never go out with her card still open: the
  `ended` escape only fires for an old client / after she answered. No "wait for ever": an old guest frees the hold at her week end (coop-cyc mixed case).
- One fact (OD:L96): both screens agree on tray on/off, tn, tonight; her cost lands once on her client (coop-cyc checks Đức on both seats).

## 2. Family scan (LUẬT SỬA CẢ NHÓM): every jcycle / night decision of the guest that the other seat resolves
| # | Her decision | Resolved on | Reads after the fix | Verified |
|---|---|---|---|---|
| 1 | Báo sớm / Giấu (lie) | host flip (cyTray, nightCh) | her relayed `lie` | coop-cyc som/giau: ON on both, host drew her |
| 2 | Báo lùi (back) next flip | host nightCh | relayed `back`, × BAL.cyc.rep.luiNext | coop-cyc lui: exact × luiNext |
| 3 | Báo lùi cover (book late) | other seat's cyRep / cyLateSeen | cyCover(p) on her flags | code read |
| 4 | Giấu / NPC-forged "không báo" (rum) | other seat's book | relayed `rum` | coop-cyc giau: host book "không báo" |
| 5 | Sửa sổ / Dặn ma ma (hide) | host rivalsMonth (rival vs rival) | cyHideOf(p) on her flags; NPC clever-rival rule kept for NPCs only | code read |
| 6 | Timing (her card after the host's draw) | host endTurn | draw held until her answer / her week end | coop-cyc 4 answers + mixed old guest |
| 7 | Báo đúng (truth) | host tray | card off → host draws nobody else's card wrongly | coop-cyc dung |
Checked, no change needed: Kính sự phòng mama lie check (her nightScene, her client — the night she loses is lost on both, nobody else gets it);
Tắm gội / Thắp đèn / Tranh sủng / Chặn ngự giá locks (cyTray(S) on her client; claims go through ctm-tn); monthly mừng hụt, foe book-read,
forge, forgery evidence (monthPay on her client; NPC deltas go through the existing NPC act relay); nightWhy cycle row of the friend (private).
main's new jne (night-end, endTurn wrapper) reads the PAST night at endTurn, so the held flip of the NEXT night does not change it.
Not changed (reviewed and left): when the host leaves the room (COOP "stop" = back to the title screen) while the draw is held, that
week has no night; running a flip there would act on the title screen — the safer choice is to leave it.

## 3. r2's R1–R4 stay
R1 (deferred-flip night week, `CW.inTurn || CW.pend`), R2 (cyNoFriend skipped when COOPW.tnShared), R3 (bribe BAL.coopBribe + shared cnvSpyX),
R4 (hrWeek prints the real Danh): all present after both merges (code read; coop-b2b5 B2.3, coop-p2 bribe card, coop-rev2 deferred-flip case pass).

## 4. ONE CORE (OD:L1267)
- No new numbers: luiNext / luiCover from BAL.cyc.rep.
- Reviewer fix R5: promo-skip is on main now, so the guarded duplicate `BAL.psk.seat` line in jbal2 is DELETED (main's BAL.psk is the one
  source) and jcoopworld's private copy `coopFullSeat()` is DELETED; the co-op full-seat card calls main's `promoFullSeat(S,"coop",{})`
  (window export in jexam). (Planned in r2: "delete the guarded line + coopFullSeat when promo-skip lands".)
- R6 (wording): promoFullSeat's bold "Ghế X đã đủ người:" prefix is dropped inside the co-op card (its first line already says the seat is full).

## 5. Merge notes
- b85cdb1e: jbal2 (psk, see R5), index.html / sw.js rebuilt.
- 73c06812: only jflip (visual halo) + art/assets; built files rebuilt.
- ee5d33de: jcoopworld W_KEYS = main's `luxEdict` + this branch's `tn`; jbal2 keeps coopEmpY / coopBribe and main's mline / mem; rebuilt.

## 6. Tests (LIVE Worker, one at a time; host 755x1000@2, guest 1180x820@2; full set on e83439e2, then coop-cyc + coop-b2b5 on 287a7010)
| Test | After merge 1 (b85cdb1e) | ee5d33de merged (e83439e2) |
|---|---|---|
| coop-cyc | 69/69, 70/70 | 70/70 |
| coop-b2b5 | 29/30 (start-up placement), 30/30, 28/30 (see T1), 30/30 ×2 after T1 | 30/30 |
| coop-p2 | 45/45 | 45/45 |
| coop-rev2 | 34/38 (start-up placement), 37/38 (see T2), 38/38 after T2 | 38/38 |
| coop-r2 | 47/47 | 47/47 |
| coop-b1 | 39/41 (laydo took B's only burnable test item → phonghoa not offered; test data), 41/41 | 41/41 |
| coop-e2e (E2E_TO=120000) | 59/59 | 59/59 |
| coop-pets | 48/48 | 48/48 |
| oldroom-r1 / oldsave-r1 (old = origin/main build) | 16/16 / 16/16 | 16/16 / 16/16 |
| coop-guest-maid (NOT on main: trial merge of review/coop-guest-maid-r1 onto this branch) | 37/37 | 1st run 29/37 (weeks 2b/3a/3b did not advance), then 37/37 ×3 and 37/38 (timing check "fold #next enabled") in 4 traced runs; control main + guest-maid-r1: 37/37 |
On 287a7010 (main 73c06812 merged): coop-cyc 63/70 once (after "som" won her the night, the "giau" round never got her card / week 5 did not merge), then 69/69 ×2; coop-b2b5 30/30.
Test-only fixes:
- T1 coop-b2b5 B2.1: its forceFlip replaces the global nightCh, which bypasses jcycle's tray rule; when the guest's random name falls in her
  cycle tuần (≈1 run in 7 here) the host drew her off-tray card, her client then cancelled the night (host tn null / guest tn 902). The real
  game never draws an off-tray card. Fix: pick a guest name out of her cycle tuần before B2.1 (as coop-cyc does). r2 noted this as "rare".
- T2 coop-rev2 act(): a loyal (trung) runner refused the forced takeaway on a roll; same guard as coop-b1 (r1 fix 5).
WATCH (for the coop-guest-maid reviewer / next co-op work): the one stalled trial run (weeks not advancing) did not come back in 4 traced runs that dump
COOPW.tr / cyHold / ended; the only new wait in this branch is cyHold, which always ends at her answer or her week end. If it recurs, look at that trace first.
Trial merge with review/coop-guest-maid-r1: conflicts only in assemble.py (jcoopask.js after jmline.js) and built files; no source conflict.

## 7. Kit / wording (KIT.md, VANPHONG.md)
- No new UI in the fix. Screens looked at: the guest's Kỳ nguyệt sự card (kit option card, hidden-outcome mode, hint + risk chips) at
  755x1000@2 and 1180x820@2; the co-op "Ghế đã có người" card (pushModal kit report card, stat chips) at 1180x820@2 — no overflow
  (scrollWidth − innerWidth = 0), no cut text, no page errors. Same shapes as every other kit option / report card.
- No new player-visible words except removing a repeated phrase (R6); no %, odds via chanceW / word.
- Note: in coop-cyc screenshots main's night-end scene (jne, kit §81) now sits over the cards until its button is pressed (the harness does
  not press it) — not a game issue.

## 8. Backward compatibility
- Old save: no S.cyb → {} → nothing changes (oldsave-r1 16/16).
- Old client: never relays "cyb" (unknown ctm-p2 mode ignored by old clients); the host waits for her week end, then draws (coop-cyc mixed, oldroom-r1).
