# ky-keeper-f2 — Kỳ ngộ keeper copy / stale-card family (MAIN 110 W1, session_01Rc5AsJaFJSoKrXkhjQ2zdv)

PRIORITY #1 CHECK ('jky.js:196' / F2 family): OD 0 | ledger 0 | claims 1 (CLAIMS row ky-keeper-f2, MAIN 110) | main dev/build/jky.js:195-196 + :251 wrapper | review/* none (review/coop-famops-t2 holds only the traced scan with HDROP rows, not landed) | sources: FOREMAN_E_STATUS 19:15Z/19:27Z/~20:50Z 23/11 (E44k, E53r), reports/coop-famops.md «E44k». Reused: jlost loKeepBy (the ONE keep road, E42), kyLc pattern, lost-one-home-scan / coop-lost-scan-traced harnesses.
START_CTX ~4 % (get_session reads 0; own estimate). Ended ~22 %.

Branch **review/ky-keeper-f2** · head **7d7a77d7c149f3150d61cdf67bd85ff37c5df50a** (= LIVE f7016b8d + 0bfea50d fix/test + 7d7a77d7 site rebuild/tool; assets.json = LIVE).

## 1. Root (what is proven on LIVE f7016b8d)
- **jky.js:196 is dead code on LIVE.** The unguarded «Giữ lại» keeper copy at :196 is never reached: jky.js:251 wraps SPEC.item and sends every `c.X.lc && oi≠0` call to `loKeepBy(L, F)`.
- **The real fault is the :251 wrapper (and :196 behind it): it passes the DIALOG-TIME case object `L`.** loKeepBy checks `loHolds(L)` on that object. When the world was rebuilt after the card was made (save round-trip, co-op snapshot / seat restore: S.lost holds new objects) the stale twin still says «lost»: a 2nd copy of the piece goes into the finder's chest and the stale object is marked held, while the live case stays as it was (still holding the piece → 2 places; or already closed with the piece back at its owner → 2 places). Proved by `dev/test/ky-keeper-f2.js` on LIVE: **E** (rebuilt world, live case lost) → 2 copies, live case still «lost»; **F** (rebuilt world, live case closed = the F2 shape: piece back with its NPC owner) → keeper copy made, 2 copies.
- Same family, same cause (dialog-time object, no live check), proved on LIVE: **I** di vật (vat_cu) whose box piece was bought meanwhile — «Xin chuộc» still charges Bạc for nothing; «Dâng Thái hậu» answered by the buyer takes the buyer's own piece into the Thái hậu box. **J** món quý (vat_ngu) already sold — the card makes a NEW piece from nothing and charges Bạc.
- **Not reproduced: the observed F2 VANISH (2235 y_vanthuy, NPC 19, case 133 «done/kyngo» w70 → HDROP w71).** LIVE runs: lost-one-home-scan 3 seeds × 108 tuần + a heavier local variant (5 losses / 8 NPC passes per tuần) 6 seeds × 160 tuần → 0 dup, 0 vanish, 0 net; LIVE co-op traced scan (review/coop-famops-t2's coop-lost-scan-traced.js run on LIVE f7016b8d) SWAP 9001 + Fold-host 9001, 76 wk each → **0 vanish** (s1: 1 persistent dup 10000061 «A:me:lo27 / B:me» = the known LIVE F1 «Lấy đồ» res-relay dup fixed in -t2; h1: 0 dup; NET 1 «other» tp). No case-present HDROP with an NPC holder in either run. E's 2235 came from -t2 5020f618 (1 of 4 runs); the dup→renumber road below is the only path found by code read that links this family to a piece leaving an NPC, and it is closed by this fix — but 2235 itself is NOT proven to be it. **Keep 2235 / 278 as a WATCH item on the N17 (-t2) scans.**
- Possible link (code read, not proven): a 2nd copy with the same id makes jil ilCensus renumber the later slot (`seen.has(e.iu) → e.iu=0`, S first in ilPeople); in co-op the census never nets an NPC-held piece (`ilCoop()&&h!=="me" … continue`), so a dup can show as «id left its holder, no ledger line».

## 2. Fix (dev/build/jky.js only; no BAL, no text, no kit change)
| road | before (LIVE) | after |
|---|---|---|
| SPEC.item lost case «Giữ lại» (:196 + :251 wrapper) | :196 unguarded copy (dead) + wrapper → loKeepBy(dialog-time L) | ONE road inside SPEC.item: `kyLive(L)` (loGet by id, same kind) → loKeepBy(live case); stale / closed / held → nothing moves, empty result. Wrapper removed (comment left in place) |
| kyLc (lost case «Mang trả», SPEC.ev) | loGet(L.id), no kind check | kyLive (same id AND kind; another seat's numbering is never that case) |
| SPEC.item di vật (vat_cu) | no box check: pay for nothing / buyer's own piece taken | `ilS().box.includes(x)` first: gone → nothing moves, nothing paid |
| SPEC.item món quý (vat_ngu) | no sold check: new piece from nothing + pay | `r.sold` → nothing |

## 3. Family scan (law 11) — every Kỳ ngộ / case-close / keeper-copy site that writes an item holder
Script: `python3 dev/tools/ky-holder-sites.py [files]` (default jky.js + jlost.js; 35 sites after). Each site read for a LIVE-state guard:
| site (after) | road | live-state guard | before → after |
|---|---|---|---|
| jky SPEC.item lc oi0 | «Mang trả» | kyLc → kyLive + st lost | OK → OK (kind check added) |
| jky SPEC.item lc oi1 (:196/:251) | «Giữ lại» | none on the live case | **FAIL → fixed** (kyLive + loKeepBy) |
| jky SPEC.ev lc | clue + return | kyLc | OK → OK |
| jky SPEC.item box oi0/oi1 | chuộc / dâng | ilTake indexOf only after paying | **FAIL → fixed** (box check first) |
| jky SPEC.item rr | Nội vụ phủ món quý | none | **FAIL → fixed** (r.sold) |
| jky fireNpc | NPC card | fired in the same call it is built (no stale window) | OK |
| jky PEND.kyngo | her card after a load | dropped (null) | OK |
| jlost lostReturn | the ONE return | case by mark/identity, stale own record → false | OK |
| jlost loKeepBy | the ONE keep | loHolds(c) on the object passed (now always the live case from jky) | OK |
| jlost loFind / loGoneOwner / expiry «giữ luôn» | weekly | live case loop | OK |
| jlost loOwnerMove ask / loKeepHear / loQuietHear / loHolderMove nộp / loUI askback·giveback·handin·sneak / loEvBack | holder copy back | loEntry(live case) then lostReturn of that copy | OK |
| jlost inspect wrapper | Soát rương | piece by its own lo mark; closed/pruned case → owner via gh | OK |
| jil ilCensus dead branch / ilStaleCases | census | live | OK |
| jcoopworld famBack / «gone» / famLostCase / «rm lost» | co-op | live case by id + kind (E44b wrap) | OK (not touched) |

## 4. Tests
| gate | LIVE f7016b8d | fix |
|---|---|---|
| `node dev/test/ky-keeper-f2.js dev/index.html` (new, 10 checks) | **FAIL 4** (E, F, I, J) | **PASS 10/10** |
| `node dev/test/kyngo-unit.js file://…/dev/index.html` | — | PASS |
| `node dev/test/kyngo-eq.js` | — | PASS (eqTol 1.25) |
| `node dev/test/lost-one-home-scan.js` seeds 20261121 / 9001 (108 tuần) | 0 dup 0 van 0 net | 0 dup 0 van 0 net (the «every road exercised» row FAILs on LIVE too: Kỳ ngộ traffic bar, pre-existing) |
| heavy solo variant (local only), 6 seeds × 160 tuần | 0 dup 0 van 0 net | — |
| co-op traced scan SWAP 9001 / Fold 9001 (76 wk) | 0 van; 1 dup = LIVE F1 | see §6 |
| `bash dev/tools/quickcheck.sh` on 7d7a77d7 | — | **PASS** (old save ok; core gates PASS; render 270/277, tab 508/508, buổi 1256/1386 ms) |
| `node dev/test/coop-e2e.js` (Fold host, iPad guest) | — | **141/141** |

## 5. Notes for E53r / N17 (not fixed here, outside the brief)
- **HDROP false positives in review/coop-famops-t2 `coop-lost-scan-traced.js`:** the per-tick map M only holds ids of cases still in S.lost; when jlost loWeek prunes a closed case (12 weeks), every piece of that case reads as HDROP although it never moved (my LIVE runs: 72 / 83 HDROP rows, only 8 / 13 with a case; all case-present ones have holder «me» → piece to the friend, counted on her seat). Only rows WITH a case are signal. 2235 had its case → real.

## 6. Co-op on the fix
- coop-e2e Fold host / iPad guest on the fix: 141/141.
- co-op traced scan SWAP 9001 (76 wk) on the fix: running at report time; result appended here by W1 when it ends (non-blocking: LIVE baseline above).

LAND READY? → needs BIG review (item / ledger rules, jky SPEC roads).
