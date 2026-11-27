# KIT-STAGE-R9 report
PRIORITY #1 CHECK: OD 12 Bàn bài no-flip + OD 27/11 03:17Z chip → 04:00Z green ✓ tick (canon overwrite) | main 17f23656 kitHand (no tick) | review/kit-stage-r8 3f45346f, review/kk53 a7ee4459, review/kk54-plaque a4dd8db6 (tick kit part) | claims R8 → R9, KK54 tick.

## Done (branch review/kit-stage-r9)
1. kk53 a7ee4459 merged into r8 (real merge). jkpick/kit-pick = kk53 (silk plaque, kitRing, post >7); jkhand/jkstage/jfocus + hand tests = r8 (no-flip, kitHandRows); assemble.py = union + jkring; KIT.md / KIT_REQUESTS union; rebuilt. kk53's jkhand «; x; x» de-dupe dropped (root fix in jopic/jk2b is kept).
2. kk54-plaque a4dd8db6 merged (green ✓ tick kit part, BAL.kpkgo {24,24}, lifted-plaque neighbours make way, KK54 jopic «Cách làm» one-row). jopic conflict: r8 fit line + KK54 `one` rule combined.
3. Bàn bài enlarged card: the old 280x64 bar is gone; the SAME kit tick (`.khconf.khgo>button.kbtn.khok.kpk-gob`, ✓, BAL.kpkgo, one CSS rule in jkpick.js) stands INSIDE the card, top-right, 3 in / 2 down (KIT_HAND.big.tick); `.khbn` side padding keeps the title clear; no strip, nothing under the card; one source kitHandConf (frame hand + kitHand.mount + kitHandRows). KIT §101.10 overwritten in place.
4. Tests updated: kit-hand (tick text/size/offset/clear of title), kit-hand-mount, kit-hand-rows, kit-stage (kk53 two-tap lines).

## Tests (final build)
kit-hand PASS · kit-hand-mount PASS · kit-hand-rows PASS · kit-stage / kit-pick / kit-plaque-confirm / result-sieve-card / kit_dupes: see final line in MAIN message · thoi-live-scan: 168 probed, 0 with close-only card (run needs ~10 min).

## Open questions answered / notes
- jflip = Emperor's flip animation, not a hand → untouched.
- Hậu cung / Hoàng tự person card «pcg» groups hold 5 act cards (`pcb x5`, e.g. «Xin yết kiến ở Cần…», «Xin hầu cờ») → listed only, NOT converted (family-scan INFO in kit-hand-rows).
- Khuê các decks + Việc groups: no sibling-card row at game start → not wired (needs a mid-game save).
- Env note: ctm-rank.victoria-tntt.workers.dev is blocked by the proxy in this container (scans still run).

## Handover
START_CTX ≈ 20 %. Remaining at write time: mp4 Fold + iPad to CDN → MAIN, RV READY to RV-165/166.
