# BIG REVIEW — review/d-giftin-like 329da0a5 (rv session_01964izDDkUo2RxTUUvG3NQE, for Foreman D ROOT) — 28/11

PRIORITY #1 CHECK: brief briefs/d-giftin-like-rv.md | main a96564ad (j8 giveTo / j83 wkGive relAdd before the giftin push = the fault; d19 jrcv rcvGiftIn already waits for the answer for an NPC receiver) | review/* review/d-giftin-like only, reuses d19 keepGain rule; no other rv | claims D-GIFTIN-LIKE (worker DXiybd9m, archived).
KIT CHECK: reuses the existing PEND.giftin / pgin kit option cards (oddsChip, ✕), pvQuy / balSg text helpers (dev/kit/KIT_CHECKLIST.md). No new UI part. kit-std-scan REPORT_ONLY (Fold 755x1000 + iPad 1180x820): main FAIL 16 (2 rules) = merged FAIL 16 (2 rules) — no change, all pre-existing.
START_CTX ≈ 5 % (estimate); at delivery ≈ 20 %.

## Verdict: **PASS 7c143419** (review/d-giftin-like-rv = 329da0a5 merged onto origin/main a96564ad; fast-forward of main)

## What I checked (code, all of the diff)
- j8 `giftKeepOf` = ONE reader (giveTo NPC receiver, giveTo→her, j83 card, jrcp card); `giftKeepGo` pays via the one relAdd + giver hh. Numbers identical to the old inline keepGain.
- To HER: nothing paid at send (j8 L342, j83 L106); card carries pp.kg. Nhận → invAdd + gain; Trả lại quà → go_2 only (+ goHhQ for a Hoàng hậu giver); Thái y clean → go_3 + gain; taint found → evidence only.
- jptime servant carrier passes `pp` whole → kg rides (jptime.js:479 `a:{run:"giftin",pp:d.pp,…}`).
- jpoison: giftin→pgin wrapper passes kg; `keep()` pays it. Poisoned dishes (pgGive, no kg) never reach keep() (P set → found / hit / refuse), so no tell and no gain for a poisoner. Gain not printed on pgin (same card for clean / poisoned) — accepted.
- Co-op seats (jcoopthin / jcoopworld) push no kg: a player seat has no NPC liking → correct.
- Old saved cards: kg missing → Nhận pays nothing more (no double count).
- Law 4: `BAL.eff.j8.goHhQ:-8` replaces the typed `apply({hh:-8})`; same value. No other number.

## Laws touched
| law | result |
|---|---|
| 1 two-way | PASS — NPC→her now mirrors her→NPC (d19 rcvGiftIn): gain only on a keeping answer |
| 3 gain-and-loss | PASS — Nhận card names its gain («cất vào rương · được: X quý ngươi +N»); Trả lại quà names its cost |
| 4 BAL only | PASS — goHhQ; gain from giftVal/giftRel (BAL) |
| 6 real objects | PASS — item paths unchanged (invAdd / ilGone / back to giver) |
| 7 wording | PASS — no %, odds chip «Khó lường» on Thái y; signed numbers via balSg / pvQuy as elsewhere |
| 9 kit | PASS — same kit cards; Fold + iPad shots looked at: 3 cards, ✕, no overflow, 0 page errors |
| 11 whole family | PASS — all 7 giftin/pgin pushers scanned (static) + runtime j8/j83/food/old-save |

## OPEN choice — jrcp copy gain: **KEEP**
Her own pattern copies (wkp_* items, pr BAL.rcp.sheetPr, tg ["rv"]) can be given to an NPC through giveTo, which pays the same giftKeepOf gain when the NPC keeps it. So the friend getting the gain on her «Nhận» is the law-1 mirror and the law-11 same rule. Reverting would make one gift road gain-free on one side only.

## Gates (re-run by me)
| gate | 329da0a5 | merged 7c143419 | origin/main a96564ad |
|---|---|---|---|
| giftin-like-scan | PASS | PASS | FAIL 15 (confirms the fault) |
| gift-return-scan | PASS | PASS | — |
| gift-dead y14-ncBtuc-010 / y05-ncBtuc-035 | PASS / PASS | — | — |
| npc-purpose-scan (419 rows) | PASS | PASS | — |
| undef-scan | PASS (360) | PASS (372) | — |
| d19-gift Fold + iPad | run 1 FAIL 1 (iPad «Biếu quà làm lành» card overflow), run 2 PASS | — | FAIL 1, the same iPad card → pre-existing / flaky, not this diff (the dialog is not touched) |
| kit-std-scan REPORT_ONLY | — | FAIL 16 (2 rules) | FAIL 16 (2 rules) — equal |
| quickcheck.js part 2 (by hand) | — | **QUICKCHECK PASS** (open 2269 ms · old save from LIVE loads + plays a buổi · render 372/375, tab 625/723, buổi 1973/1955, tasks>200ms 58/66) | live |
| coop-e2e (soft) | not run: relay/CDN unreachable from this box | | |

## Merge / build
- Trial-merge onto review/lr-rules caa95310: that is the branch base (clean). review/lr-rules is now inside origin/main a96564ad (= lr-rules-r2), so I merged onto origin/main: sources clean, only index.html / sw.js conflicted → rebuilt.
- `dev/site/build_site.sh` cannot reach the CDN host ctm-img.victoria-tntt.workers.dev here (proxy 403; assets.py also fails). Rebuilt with the same script, the CDN img/*.json list taken from main's sw.js PRE (28 entries, unchanged) and assets.json unchanged. Built index.html contains the assembled dev/index.html byte for byte. **The lander should rebuild index.html/sw.js** with build_site.sh as usual.

## Note for D (not blocking)
- d19-gift iPad «Biếu quà làm lành» card horizontal overflow (scrollWidth > clientWidth+2) shows on LIVE main too, intermittently — worth a small separate ticket.
