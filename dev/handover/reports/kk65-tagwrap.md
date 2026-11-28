# KK65 — review/kk65-tagwrap (base review/lc34-ui6 62b08228) — K-TAG-WRAP (MAIN 185 order 28/11 ~03:04Z) — WIP, NOT RV READY
PRIORITY #1 CHECK: OD n/a (MAIN 185 order: Fold «KẾT QUẢ» tag wrap, whole family, scan Fold 755 + cover 904) | main LIVE 18003079 | review/* lc34-ui6 62b08228 | claims KK65 → KK66
KIT CHECK: reuses kitResultSeal / .seal (j63), kitChip .kchip (j79), kit-std-scan harness.
Done (commit on this branch): dev/test/kit-std-scan.js
- rule X22 «a tag label stays on ONE line»: named tag classes (.seal,.kseal,.kpseal,.kchip,.kmchip,.kgchip,.ktag,.kptag,.kpill,.kbadge; text ≤ 24)
  + any short label (own text node, ≤ 3 words / ≤ 18 letters, own bg or border, not a button); counts lines of the label's OWN text nodes only
  (an icon / count child stacked by design is not a fault — that removed the false hits: rail buttons «3 / Chí tôn», tab bars, act titles .kat,
  the 2-row Bạc/Sức box, item tier badge .kitb with an icon).
- scene «ringres» (new, in the default ONLY list): Tặng quà ring (queen / first rival), window.__bot=0 for this scene only (kriOn), real taps:
  front tile → first act → scan .kri-pane; then the SAME seal element is set to every kitResultSeal word (BẠI / KẾT QUẢ / BỎ DỞ) and re-scanned.
  This start state has no maid to send, so the errand road (real «KẾT QUẢ») cannot happen here — hence the seal-word cycle.
- dev label: a 2nd portrait width is named by width (w904).
BEFORE (ui6 62b08228, RULES=X22 REPORT_ONLY=1 SZ='[[755,1000],[904,2316],[1180,820]]'): KIT-STD-SCAN FAIL 8 — the whole family:
| part | text | where | widths |
|---|---|---|---|
| b.seal (kitResultSeal, CSS j63 `.seal{font-size:.9rem;padding:3px 8px;flex:0 0 auto}`) | «KẾT QUẢ» (w 60), «BỎ DỞ» (w 46) | ring result card .kri-res | Fold only (904 + iPad fine; THÀNH / BẠI fit) |
| span.kchip.g (kitChip, j79) | «✓ Đã biết: Đúng phẩm» (w 114) | tab Tư trang (inv) + sub0 | Fold, w904, iPad |
TODO for KK66:
1. Fix in the kit part only (law 9): `.seal` → white-space:nowrap (the seal is flex 0 0 auto; check the title .kan still wraps beside it on Fold and
   nothing overflows the card). kchip: find who builds «✓ Đã biết: …» (grep «Đã biết:» / kitChip callers in jinv / j82 tab inv) — the chip is
   capped at ~114 px; decide nowrap + let the chip grow vs. a shorter word (VANPHONG) — names/words never cut (OD:L177 spirit), no ellipsis.
2. AFTER run of the same command → 0; plus full kit-std-scan REPORT_ONLY=1 (Fold + iPad) per KIT CHECK RULE to show no other rule moved.
3. LOOK at Fold 755 + iPad 1180 (+ 904) stills: ring result card (out/<dev>-ringres-seal.png) and Tư trang chip.
4. KIT.md line (K-TAG-WRAP) + KIT_CHECKLIST.md «Scan rule ids» add X22; report; merge-tree vs the lander's newest bundle; RV READY to MAIN 185.
Shots: /home/user/wt/kk65-out/w/{before2,rr}/ (scratch, not in git).

## HANDOVER KK65 → KK66 (28/11 ~03:50Z; rollover by context: START_CTX ~3 %, now ~26 % ≈ START + 25 %; MAIN 185 opens the successor)
State of KK65's units:
- review/kk65-noise d1214155 — RV-178 §5 PASS, lands with b3a via LC34 (G4 noise-hygiene: scanner skips KIT_SAMPLES / lifeStore label).
- review/kk65-ui5 a14d5cfe — RV READY at RV-178 (K-GIFT-NOTE + kit-pick-go / dlg-dead-scan hand + nested-scroll gaps). Answer any FAIL.
- review/kk65-tagwrap — THIS file: WIP, TODO above.
- E75: already BUILT on review/lc34-b3a 5f6fdda8 (closed). Foreman F told of the realtap nested-scroller gap (FOREMAN_F_STATUS, handover 6e00cc11).
Open queue: (1) finish K-TAG-WRAP; (2) RV-178 verdict on kk65-ui5; (3) picker-dom r6 re-sign when its sha comes (trial-merge, kit-pick-go pager Fold + iPad,
«KIT OK picker-dom <sha>» in FOREMAN_D_STATUS); (4) nit noted, not ordered: none.
Worktrees: /home/user/wt/kk65w (tagwrap, build published), /home/user/wt/kk65v (kk65-ui5), /home/user/wt/kk65n (kk65-noise); save fixture /home/user/wt/y05.json
(= handover branch dev/handover/robot/nc-B-tuc/saves/20261124-0057-035.json).
Rollover lines (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
