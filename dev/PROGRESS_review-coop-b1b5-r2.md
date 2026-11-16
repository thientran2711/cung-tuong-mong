FAIL

# review/coop-b1b5-r2 — reviewer r2 of review/coop-b1b5-p2 @ a9d25e28 (D21 co-op B1–B5 part 1 + coop-pets A10 + r1 fixes + part 2)
Branch: review/coop-b1b5-r2 = origin/main 92668096 + merge of a9d25e28 (conflicts only in built index.html / sw.js → rebuilt with
assemble.py + build_site.sh) + reviewer fixes below. Worker NOT deployed. START_CTX ≈ 3 % of the window.

## Fix list (numbered, for the next worker; base it on review/coop-b1b5-r2, not on -p2)
1. **BLOCKING — main's jcycle (Kỳ nguyệt sự, cycle review r3) × B2 one night: the GUEST's cycle report does nothing.**
   With B2 the guest's flip draws nothing and the host draws for her; on the host her entry's tray state is `cyTray(v)` = `cycOn(v)` only
   (jcycle.js:67: the `lie` check is for `p===S`; `nightCh` `back` rule also only for S). So in co-op her maid's card
   ("Báo lùi vài hôm" Đức −, "Báo sớm" Đức −, "Giấu" ghen +, "Báo đúng") changes nothing about the night: she pays the cost and gets no
   effect (loss without gain), and her lie can never keep her card on the host's tray. Both seats end the week at once, so the host's flip
   happens before her answer exists. Fix: get her answer to the host BEFORE the host's flip (e.g. ask her card at the start of her cycle
   tuần / on her last buổi and relay it on ctm-p2 as {lie, back, giau}; the host's cyTray / nightCh for the friend entry read it; or the
   host's flip waits for it), keep "one fact" (OD:L96). Test: guest in her cycle tuần, each of the 4 answers → the host's deck and both
   screens agree (on tray / off, odds), costs once on her side.

## Reviewer fixes made on this branch (small)
| # | Where | Before | After |
|---|---|---|---|
| R1 | jcoopworld flip wrapper (B2) | main's jcycle defers the week flip behind the maid's card (flip runs again from cyrep, after endTurn): S.tn.w = the OLD week → the guest never takes it; host tonight = NPC, guest none (coop-b2b5 B2.3 FAIL deterministic on the merged build, PASS on -p2 alone) | night week = wk()+1 when `CW.inTurn` OR `CW.pend` (this week's end not out yet) |
| R2 | jcycle cyNoFriend | the deferred flip took the friend out of the host's deck (B2 wants her in) | skipped when `COOPW.tnShared` (set by jcoopworld B2; guest draws nothing anyway) |
| R3 | j42 PEND.cnvBribe + jcoopworld P2H.bribe (ONE CORE OD:L1267) | bribe pay 20 / Chủ tin 5 typed in j42 while co-op read BAL.coopBribe; the tai mắt terms text copied into jcoopworld | both cards read BAL.coopBribe; one shared `cnvSpyX(m)` text (j42 cnvBribe, the "Nghe lời" card, co-op card) |
| R4 | jcoopworld hrWeek | "Danh +10" typed (setHeir's number) | prints the Danh setHeir really gave |
Note: coop-b2b5 forces nights; a random cycle tuần (jcycle, IIFE-scoped, not overridable) may still take a forced card off the tray (rare).

## Tests (LIVE Worker, one at a time, host 755x1000@2 + guest 1180x820@2; oldsave also 1366x1024@2)
| Test | Merged (before R1–R4) | After R1–R4 |
|---|---|---|
| coop-r2 | 47/47 | — |
| coop-p2 | 45/45 | exit 0, 0 FAIL (bribe card on R3) |
| coop-b1 | 41/41 | — |
| coop-b2b5 | 29/30, 29/30 (B2.3 "same NPC on both" [1,null]) | 30/30, 30/30 |
| coop-e2e (E2E_TO=120000) | 59/59 | — |
| coop-pets | 48/48 | — |
| oldroom-r1 / oldsave-r1 | 16/16 / 16/16 | — |
| coop-rev2 (NEW, reviewer) | — | 38/38 |
coop-rev2: 64-item bag (long provenance strings) + 4 kids + pregnancy on B, 12 items + 2 kids on A: every pos ≤ 215 chars (Worker measure,
cap 4000); the ctm-fam relay carries 11 903 chars; laydo + takeaway: A gains, B loses; item and kid tally across both seats unchanged after
B rejoin, A rejoin and the merged week; entry == own on both; jcycle deferred flip (real cyrep card) → host drew the guest, tn = new week,
guest has her night; B on the OLD build (origin/main) with a new host: her place + Sủng arrive, no endless ask, week merges, no page errors.

## Checks
- r1 fixes 1–6: all verified fixed (pos small + ctm-fam relay + hash/ask; NPC acts relayed for the whole family incl. mindRun; seat card
  per OD:L1228 — compensation, no waiting claim, jealousy cost, normal exam later; host-authoritative night with versioned claims; coop-b1
  loss checks tied to gains, deterministic; coop-pets 48/48).
- Backward compat: unknown act k ignored by old clients; new client reads inline pos.fam of an old one; no ask without `fh`. Mixed builds
  are anyway held by swreg (CTM_BUILD) in the real site.
- BAL.psk.seat guard vs review/promo-skip: SAFE — promo-skip sets `Object.assign(BAL,{psk:{…seat:{same values}}})`; whichever order the
  two lines land in jbal2, BAL.psk.seat ends identical. Delete the guarded line + coopFullSeat when promo-skip lands (promoFullSeat used then).
- No conflict with main's coop-rejoin-xdev (snap/restore untouched; rejoin cases in coop-rev2 pass).
- Kit: only pushModal / pushDil / kit stage end button; no private CSS (classes g/r/past only). VANPHONG: no %, odds via chanceW/word.
- Scenes end with a button (kit §81 "Đã hiểu"); edict overlays seen in test shots are waiting for that tap (test does not press it).
- Screens looked at: seat card guest 1180 / host 755, bribe card 1180, succession 1180, festival 1180, oldsave kid 1366x1024, rev2 host 755.
  "Hoàng tử · undefined tuổi" in oldsave-kid = the test fixture child has no age (oldsave-r1.js), not the game.
