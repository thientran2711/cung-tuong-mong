# BIG REVIEW — review/d19-gift-npc 727ebd71 (D19-GIFT-NPC)

Reviewer: session_01Rc5AsMwSqkJzn11evuPSqA (BIG rv, opened by MAIN 185 for Foreman D) · depth 7 · START_CTX 10 % (roll at 35 %, ceiling 60 %).
PRIORITY #1 CHECK: OD L752–753 (Biếu quà làm lành) + OD L1916 (jrcv receiver choice, 18/11 ~21:15Z) | main dev/build/j8.js giveTo, jrcv.js:64 rcvGiftIn, j83.js wkGive, jts.js tsGiftPiece | review/* **review/lc34-ui5 + lc34-b3a carry KK64 K-GIFT-OUT (c5243be6) = a parallel fix of the same tsGiftPiece copy-back fault** (see §4) | claims D19-GIFT-NPC worker session_01D3E3NanQicQRaAsfLfS2TM.
KIT CHECK: n/a. No kit part or UI is touched; only log/result lines change, through the existing log lines. The shots (Fold 755x1000 + iPad 1180x820, d19-gift run 6) look the same as LIVE.

## VERDICT: **PASS cc856c9e** (review/d19-gift-npc-rv = 727ebd71 + merge of LIVE 18003079; ancestor = origin/main → fast-forward)
For LC34, use the trial landing **review/d19-gift-npc-rv-lc34 70ebe171**: rv-d19 resolved onto lc34-b3a 7de4f10a (§4).

## Claims
| # | Claim | Result | Evidence |
|---|---|---|---|
| 1 | The NPC return is a real rule (jrcv receiver choice); the test forces the answer; the «Trả lại quà» branch is tested | PASS | `rcvGiftIn` slot 2 «back» = OD L1916. d19-gift.js + gift-return-scan wrap `rcvPick(...,"gift")` and run take + back on every road. The «check» (Xét nghiệm) answer is not forced in the scan. On reading, the gain stays only when she keeps the piece (non-blocking). |
| 2 | j8 giveTo pays liking / oán mend / hh only after the receiver keeps the piece (laws 3, 4) | PASS | `keepGain()` runs only on take/check (and on r===S, unchanged order). «back» and «found» get nothing. No new BAL key. With LIVE merged, keepGain uses LIVE `giftRel()` (law 4, one reader). |
| 3 | tsGiftPiece sees the copied-back piece: no false ease, no false «Mất», NPC falls back to bạc (law 6c) | PASS | The kind-count `same()>=c0` catches the rcvGiftIn copy. tsNpcGift keeps the refusal line and tries bạc. Scan rows «Biếu quà · item/work [back]» and «NPC Biếu quà [back]» are ok. Non-blocking note: a tainted piece that is **found/caught** still counts as «given», so it eases and logs «Mất». This is the same on LIVE. KK64 (lc34-ui5) adds the `lost` branch for it, and the §4 trial landing keeps it. |
| 4 | j83 wkGive goes through receiver choice | PASS | `rcvGiftIn(a,r,copy)`. «back» copies the full piece home, and «found» hands it to jrcv `ilGone` as evidence (traceable). The callers j83:183/223 just log the line. |
| 5 | «bớt oán N» prints the real ease, capped by what she holds (laws 4, 7) | PASS | `tsGiftEaseN` caps at BAL.tsGift.ghen/.oan. `tsGiftEase` measures the real change. jstatpace does not pace a decrease within the current value (spG n<0: z=min(-n,c)), so preview = real. When there is nothing to ease the line reads «… vốn đã nguôi lòng, chỉ thêm thiện cảm». No % or typed numbers. |
| 6 | Law 11 scan: LIVE FAIL → branch PASS; it covers every gift road | PASS | All 11 giveTo callers (j8:176/486/491/553/554, jagacts:48, jgift:49/159, jptime:329, jveil:211, jts:262) go through the giveTo or wkGive wrapper, and j83:183/223 call wkGive directly. All are covered by the scan's giveTo/wkGive/tsGiftPieceGo/tsNpcGift roads. The giftin pushes (jcoopthin/jcoopworld/jptime/jrcp) are her own card (rcvGiftIn returns null for S / coop). **Re-run here: LIVE 18003079 FAIL 7 → cc856c9e PASS.** |

Laws checked: 1 (two-way: works now get the NPC answer, same as items), 3, 4, 6c, 7, 11. Laws 9, 10 and 12 are n/a because no UI changes. No law is broken.

## Gates (final sha cc856c9e = 727ebd71 + LIVE 18003079)
| Gate | Result |
|---|---|
| merge LIVE 18003079 | 1 real conflict, dev/build/j8.js (LIVE e-gain3 `giftRel` vs d19 keepGain). Resolved: `gr` computed once, keepGain uses `gr`. index.html + sw.js rebuilt (build_site.sh); assets.json = LIVE |
| build | OK |
| d19-gift.js Fold 755x1000 + iPad 1180x820 | **6/6 PASS** (each run covers both devices) |
| gift-return-scan | branch PASS · LIVE 18003079 FAIL 7 · lc34-b3a alone FAIL 6 · trial landing 70ebe171 PASS |
| gift-dead-scan y14-ncBtuc-010 / y05-ncBtuc-035 | PASS / PASS |
| undef-scan | PASS (351 names) |
| quickcheck | old save from LIVE loads + plays a buổi; perf new/live render 273/314, tab 493/562, buổi 1658/1714 ms → PASS. Core gate G4 94-q-softlock FAILed once inside quickcheck (Fold, 4 lines, «view» empty = set-up). Run on its own: **LIVE PASS, branch PASS ×2**. This is a known flake (the promo merger reports the same q-softlock set-up flake) and not a d19 fault |
| coop-e2e COOP_EXAM=1 (soft) | see the last line of this file |

## 4. LC34 lander bundles (merge-tree of cc856c9e)
review/lc34-b3a 7de4f10a contains review/lc34-ui5 c711f8e1, so the result is the same for both. Real conflicts are in **dev/build/j8.js** (giveTo), **dev/build/jts.js** (tsGiftPiece + tsGiftBacGo/tsGiftPieceGo), and in generated index.html and sw.js.
Cause: **KK64 K-GIFT-OUT (c5243be6, RV-178 PASS)** fixed the same copy-back fault through `giveTo.out` («back» → kept), and added `lost` for found/caught. KK64 alone still FAILs gift-return-scan 6: a returned item still buys liking, works are never returned, and the capped-ease text is missing. Both fixes are needed.
**Silent trap (auto-merges without conflict):** j83 wkGive. KK64 sets `giveTo.out="take"` («a work piece is always taken»). After the d19 merge, a returned work would leave out="take". KK64's tsGiftPiece would then ease oán for a work sent back.
Resolution done in **review/d19-gift-npc-rv-lc34 70ebe171** (lander: reuse it or copy it):
- j8: keep KK64 `giveTo.out` on every exit, and keep d19 `keepGain()` (relAdd gr + hh) only on sent/take/check.
- j83: wkGive «back» → `giveTo.out="back"`, «found» → `"found"` (the KK64 comment is updated).
- jts tsGiftPiece: kept = `out back/refused` OR d19 same-kind `home`. `lost` = found/caught (KK64). Otherwise `N=tsGiftEase` (d19). tsGiftPieceGo = KK64 lost branch + d19 `R.N` text. tsGiftBacGo = d19.
- Rebuilt; assets.json = b3a. **gift-return-scan PASS, kit-gift-out 8 cases 0 FAIL** (Fold + iPad).

## Notes for MAIN (not blockers)
- NPC→player (PEND.giftin): j8 still pre-adds the giver's liking before she answers (worker note, confirmed).
- A tainted gift that is found/caught in tsGiftPiece eases oán on LIVE and on d19 alone. KK64 fixes this once LC34 lands.

## Handover
Done; no successor needed. Worktrees: /home/user/wt/d19rv (cc856c9e), /home/user/wt/d19b3a (70ebe171), /home/user/wt/d19live; logs in /home/user/wt/d19rv-out.

coop-e2e COOP_EXAM=1 (soft): running at verdict time; result appended below when done.
