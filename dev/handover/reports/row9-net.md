# ROW 9 — personality-driven thresholds + nết behaviour (Foreman B, worker session_01N1tNP2RzPiR6L1EkbawFH2, 28/11)

PRIORITY #1 CHECK ('nết|net open|personality|tinhcach' + 'S.th|Thái hậu thiện cảm|netTh "th"'): OD 60 (24/11 ~06:00Z (2)+(3), ~06:35Z, ~06:40Z; OD:L599 «her reactions must depend on her personality (some Thái hậu are harsh)»; 26/11 ~04:40Z nết open; 25/11 ~08:05Z temper) | ledger 3 | claims 8 (net-build NYsFNUq9 / rv DONE; net-ghen W3–W10 DONE; temper T1–T3 DONE; D PROMO-STACK lr4 RUNNING) | main 22afefb4: jnet.js netTh / netForgive / netCross / bandCut, BAL.net.th + T[t].th, news-sieve nết open | review/*: net-build-rv c6c3ca76 (PASS, LIVE), news-sieve(-rv) (PASS, LIVE), net-thresholds 96c2859e (superseded by LIVE pace-all BAL.oanCool), net-ghen-2-r5 9d3b7b7b + temper-perception-lr2 (PASS, NOT LIVE — ride inside D's review/promo-stack-lr4 7fc09b65, row 7, RUNNING) | none for Thái hậu levels on any branch (git grep `netTh("th"` = 0 on main + promo-stack-lr4).
KIT CHECK: reuses log() (the player's own Sổ ghi line) and the existing requirement rows / chips (text only); no new UI part.

## STEP 0 — what exists
| piece of row 9 | where | state |
|---|---|---|
| per-nết levels BAL.net.th + T[t].th, ONE netTh(p,key) for her / consorts / servants / men | review/net-build-rv c6c3ca76 | **LIVE** |
| typed relation gates → netTh (net-scan-rv), one forgiveness rule netForgive, evidence gates real | net-build-rv | **LIVE** (1 regression since: jtwoway:74 E-GAIN3c 27/11 — fixed here) |
| crossing lines in the holder's nết voice (consorts): «than» up, «ghet» down | jnet netCross | **LIVE** |
| mindTell sign earlier / later by nết (hide quality) | j43 mindTell `-nq(v,"hide")` | **LIVE** |
| nết open from the start (consorts, servants, children) — the player reads nết directly, no «lộ nết» news | review/news-sieve | **LIVE** (owner OD 26/11 ~04:40Z; brief's «only through real signs» is superseded by this ruling — nothing re-hidden, law 16) |
| ghen cooling / shown == applied oán deltas | review/net-ghen-2-r5 9d3b7b7b | PASS, inside D promo-stack-lr4 (row 7) — not touched here |
| temper outbursts / perception (Bộc phát theo tính cách) | review/temper-perception-lr2 | PASS-track, inside D promo-stack-lr4 — not touched here |
| net-thresholds BAL.net.oanCool .10 | review/net-thresholds | superseded by LIVE BAL.oanCool (pace-all, OD 26/11 ~08:25Z) — not re-merged (would double-cool) |
| **Thái hậu's levels by HER nết** | — | **MISSING**: jnet said «Emperor / Thái hậu (no pool nết) → the base», but the Thái hậu DOES hold a pool nết (TH_ARCH[..].trait = Ân cần / Thật thà / Kín đáo / Kiêu ngạo / Mê tín, traitsOf("th")). netTh0 only read object holders → every Thái hậu was base, and 63 S.th / p.th gates typed their own number (20 / 30 / 40 / 50 / 60 / 70 / 80 / 85, −10) or a BAL copy. **Built here.** |
| Emperor levels | ETRAITS (not a pool nết); favour levels per Emperor nết = BAL.promo.favK (promo worker, row 7) | not here (owned elsewhere) |

## What changed (branch review/row9-net from LIVE 22afefb4, re-merged onto LIVE a96564ad → aecbc267 → 8a30664e; head 840732e0b9c55b2ddfe35a8cfe223e1a490bfc91)
1. **jnet.js**: netTh accepts the holder `"th"` (her one archetype nết, same netTh0 as everyone: base + offsets, clamped). New `netAt(p,key,v)` = a mark ABOVE the top level moved by p's nết exactly as her «key» level moves (cap 100) — for the three Thái hậu marks above than2 that keep their own BAL key (hhNeed no-son 80 / hiếu thảo 70, cmood.thHi 70, g2pet.kyTh 85, g2wk.thWant 70).
   Levels now (quen / than / than2 / ky / ghet): Từ ái (Ân cần) 5/20/40/−17/−45 · Nghiêm khắc (Thật thà) 7/30/50/−10/−30 · Đa nghi (Kín đáo) 15/38/58/−10/−30 · Quyền uy (Kiêu ngạo) 15/45/65/−5/−20 · Sùng Phật (Mê tín) 10/30/50/−10/−30.
2. **63 gates (+ 4 that LIVE added while this ran: jpromob cut table → pbThCut()=netTh("th","than2"), jttw tuanTh, jscent aff ≤ netTh(v,"ghet"), jpun thMin) → netTh("th",key)** (mapping = net-build's: 5–15 → quen · 20–40 → than · 45–60 → than2 · −10 → ky · above 60 → netAt(than2)), for BOTH her regard S.th and each consort's p.th (law 1: one rule). Families: Học với Thái hậu (j23 / j83 / j85 / jtabs), xin phong tước cho cha (j4), Hoàng hậu seat / promotion needs (j8 promoReqP, hhNeed, j34 candOK / backers, j6 + jtabs gloss), mercy / restore from lãnh cung (j14, jagacts mercy), her gifts to favoured consorts (j8, jagacts fond, jpet, jrcp), protection / guard (jtsb, jagwhyg2b), Thái hậu errands and asks (j2 «Xin Thái hậu đỡ lời», jagacts, jagwhy1 ap / fav / job, j71, j72 ×4, j83 work gift), rumour / ma ma reports (j68f / g / h), routes (jroute ×2), rare endings / roads (j97 ×3, jrd_ch ×5), succession (j99succ ×3), tuẫn táng (jmort), dh streak (jdh), staff talk (jstaff), cmood / rcp motives (jcmood, jagwhyg2c), entry contest judge (jentry).
3. **19 BAL copies deleted in place** (law 14; no reader left — row9-net test (6)): qBlockTh, hiOppTh, hhTh, ag.th.fondTh / mercyTh, ag.cx.thHelp.min, succN.cTh / thB / thOpp, ag.why.ap.th / fav.th / fav.thLow / job.th / g2b.guard.th / g2rcp.thHi, dh.cond.th, staff.say.tn, mort fate.tuanTh, road.ch_co / ch_benh, road ch_bi_11.th, arc.rare muoi_tuoc / cn_ban / ch_co .bar. Comments next to them now name netTh("th",..).
4. **Printed needs = her level** (law 4, OD:L1267): «cần Thái hậu thương N», «Cần Thái hậu ủng hộ N», «hoặc Thái hậu N», «(có x/N)», «Được Thái hậu quý mến (từ N trở lên)», Ngôi Hoàng hậu gloss, succession row — all print netTh("th",..). Three rare-ending x texts that are built at load time (never shown) → words («Thái hậu thân với ngươi» / «rất quý ngươi»), no load-time number.
5. **Visible behaviour (OD (3), report §3.4 row 1 for the Thái hậu)**: `netThCross()` — her regard crossing HER «than» level → one line in her nết's voice in the player's Sổ ghi («Thái hậu nắm tay ngươi, dặn từ nay có chuyện gì cứ sang Đức Thọ cung mà nói» / Thật thà «nói thẳng trước mặt mọi người: ngươi là đứa biết điều, bà tin ngươi» / Kín đáo «vốn chẳng tin ai, nay lại kể ngươi nghe một chuyện cũ trong cung» / Kiêu ngạo «vốn khó chiều, nay lại khen ngươi trước mặt các phi tần» / Mê tín «nói ngươi có phúc tướng, từ nay cho ngươi hầu bên cạnh»); falling to her «ghet» → the cold line. Once per crossing; first look (old saves) silent. Hooked on apply({th}) and endTurn. No number, no %.
6. **Law 11 regression fixed**: jtwoway:74 twGossipFoes (E-GAIN3c «Rỉ tai», LIVE 27/11) compared hostility with BAL.ag.why.min → `netThK(a,"host","hostLo")` (net-scan-rv 1 → 0; net-build test was FAIL 188/189 on LIVE, now 189/189).

## Law 11 — whole family, scan + before/after
Scan: `python3 dev/measure/th-scan.py dev/build [--list]` (new; every `<holder>.th` / `(x.th||0)` compared with a number or a name, local copies, sign tests excluded; KEEP = archetype gain caps, tn / K locals that are netTh / netAt).
| scan row kind | LIVE 22afefb4 | review/row9-net |
|---|---|---|
| typed number | 30 | **0** |
| BAL / alias copy | 31 | **0** |
| via a local copy | 2 | **0** |
| total Thái hậu regard gates off netTh("th") | **63** | **0** |
| net-scan-rv (relation gates off netTh) | 1 (jtwoway:74) | **0** |

## Tests
| gate | LIVE | branch |
|---|---|---|
| `node dev/test/row9-net.js` (new, 73 checks) | **FAIL** 6/10 (Ân cần Thái hậu = base 30; netAt missing) | **PASS 73/73** |
| MUTATE (built file, one gate put back): jtsb `>=40` | — | **FAIL** (Từ ái no longer protects at 33) |
| MUTATE: netThCross returns early | — | **FAIL** ×3 (no crossing lines) |
| net-build.js | FAIL (net-scan-rv jtwoway:74) | **PASS 203/203** |
| rules-one-source (G2 read BAL.hhTh → now netTh/netAt) | — | PASS |
| stat-pace (gate list = max than2 across TH_ARCH; BAL.stp.floor.th 60 → 65 = Quyền uy's than2, else unreachable at ranks 0–1) | — | PASS |
| promo-build | — | no fails |
| one-core-guard / text / text-rule / bind | — | PASS ×4 (inline 3038 < 3592; 1605 prints, 0 mismatches) |
| npcmind-check (LIVE save → new) | — | ERRS [] |
| two-way-oldsave (LIVE save, 20 weeks) | — | ok, errs [] |
| coregates (G1 / G2 / kit-std-scan 6 vs baseline 28 / button-crawl) | — | PASS; q-softlock FAIL is pre-existing (LIVE FAILs it too) |
| coop-e2e (real co-op Worker) | **FAIL**: stuck «buổi 0:3 advanced for both» («Chờ hảo hữu…», sent −1), test killed at the 30 min limit | same FAIL, same place — pre-existing on LIVE, not from this branch (row 9 touches no co-op / day-step code) |
| quickcheck | — | not re-run on the final merge (only LIVE's dayq-noturn files came in); coregates PASS on the pre-merge head 97066945 |

Shots (looked at 3×): Fold 755x1000 + iPad 1180x820, Sổ ghi with «Thái hậu nắm tay ta, dặn từ nay có chuyện gì cứ sang Đức Thọ cung mà nói — thiện cảm 0 → 20»; CDN img/_review/row9-net/ (fold-755x1000-soghi-thaihau.png, ipad-1180x820-soghi-thaihau.png). Not in git.

## Laws
1 ✓ one netTh for every holder now incl. the Thái hậu; her S.th and a consort's p.th read the same level · 2/3 ✓ no option values changed; each archetype keeps a gain and a cost (Từ ái warms soon but her ghet is far — she rarely turns; Quyền uy is slow to warm but quick to turn cold) · 4 ✓ 0 typed / 0 copies; printed numbers = the rule's own · 6b ✓ the Thái hậu acts by her own nết · 7 ✓ new lines words only · 9 ✓ no new UI (log line, existing rows) · 11 ✓ scan 63 → 0 + the jtwoway regression · 14 ✓ 19 keys deleted in place · 16 ✓ nết-open rule kept · 18 ✓ only what OD (2)/(3) + OD:L599 decided.

## Open / follow-ups (not in this job)
- D's promo-stack-lr4 (row 7) touches j8 / j72 / jagacts / jtwoway too: when it lands after this, its merge re-runs th-scan + net-scan-rv (both must stay 0).
- Emperor levels stay with BAL.promo.favK (Sủng per Emperor nết, row 7).

## Handover
Done in this session; no successor needed. If re-merged: take LIVE's side, re-run `python3 dev/measure/th-scan.py dev/build` (must be 0) + net-build + row9-net.

## REVIEW (B BIG RV row9-net, session_01N1tNP46D5E3FcBCW5Ao87E, 28/11) — **FAIL** (4 items)
PRIORITY #1 CHECK: brief b-row9-net-review.md + this report read in full; OD/ledger/claims per brief line; git grep main 5fc4bc79 + review/row9-net 840732e0 (netTh("th") 0 on LIVE). KIT CHECK: reuses log() (kit Sổ ghi row) only; no new UI part.
Re-gated on **review/row9-net-r2 cfa630d1** = 840732e0 merged onto LIVE 5fc4bc79 (pushed). Conflicts: only dev/site/CHANGE.txt (branch line kept) + built index.html / sw.js (rebuilt). Sources auto-merged.

### Passed
| gate | LIVE 5fc4bc79 | r2 cfa630d1 |
|---|---|---|
| th-scan (merged with newest LIVE) | 65 | **0** (the 4 «LIVE-added» gates are in the list and converted) |
| net-scan-rv | – | **0** |
| row9-net.js | **FAIL** 5/10 | **PASS 73/73 ×3** |
| MUTATE (built file: jtsb tsbProtector back to `>=40`) | – | **FAIL** «regard 33: Từ ái stands up… (false/false)» |
| net-build | – | PASS 203/203 |
| stat-pace (dev/index.html) | – | PASS (47 days, cap 3, over 0) |
| one-core guard / text / text-rule / bind | – | PASS ×4 (inline 2761 < 3592; 1597 prints, 0 mismatches) |
| quickcheck ALONE (`bash dev/tools/quickcheck.sh`) | – | CORE GATES PASS · hooks 17 incl. **q-softlock PASS**, button-crawl, dialog-fixed, kit-std-scan 6 (baseline 28), rules-one-source old save loads; step 2 (quickcheck.js perf/oldsave) not reached in my 1700 s cap |
| wording (law 7) | – | OK: 5 «than» + 3 «ghet» lines cổ trang, no number/% in her words; the Sổ ghi row adds the standard apply suffix «Thái hậu → ta: thiện cảm a → b» like every row |
| law 9 | – | line uses the shared log() row, same as every Sổ ghi row (Fold 755x1000 + iPad 1180x820 looked at 3×; no overflow, no page errors) |
Not run (FAIL already decided): oldsave-r1, coop-e2e (worker: same FAIL on LIVE, owned by COOP r4).

### FAIL items (for the worker; base = review/row9-net-r2 cfa630d1)
1. **Difficulty «Dễ» lost an easing (law 4/14 regression).** dev/build/jdiff.js:18 `de.bal.hhTh:[1,-5]` still targets the deleted BAL.hhTh; diffApply skips non-numbers, so Dễ no longer lowers the Hoàng hậu Thái hậu need. Move the knob onto the new rule (one BAL knob read by hhNeed / promoReqP / the j6 gloss / candOK together) and test Dễ vs Vừa.
2. **Deleted BAL keys still read by tests (brief check 2: dev/build + dev/test).** PASS on LIVE, FAIL/crash on r2: `title-bal.js` + `title-parity.js` (BAL.dh.cond.th.v → «Cannot read properties of undefined (reading 'v')»), `npc-purpose-g1d.test.js` (BAL.ag.why.job.th → «FAIL 3a Thái hậu errand»), `ag-all.test.js` F5 (BAL.ag.th.fondTh). Point them at netTh("th",..); row9-net check (6) must scan dev/test + dev/measure + dev/tools too. (Docs ACT_AUDIT.md / BALANCE_REPORT.md mention hhTh — history, leave.)
3. **netAt makes the Hoàng hậu seat without a son unreachable for 2 archetypes (brief check 4).** Measured on r2 (scratch reach.js: best case 3 un-repeated +10 gifts every week for 2 years through the real trThDeed saturation + the real monthly cooling; plateau = highest regard she can hold):
| archetype | plateau | hhNeed no son (LIVE 80) | + Hiếu thảo (LIVE 70) | g2pet.kyTh (LIVE 85) |
|---|---|---|---|---|
| Từ ái | 97 | 70 | 60 | 75 |
| Nghiêm khắc | 88 | 80 | 70 | 85 |
| Đa nghi | 85 | **88 ✗** | 78 | **93 ✗** |
| Quyền uy | 92 | **95 ✗** | 85 | **100 ✗** |
| Sùng Phật | 95 | 80 | 70 | 85 |
   Above the plateau only one-off events help (paced to dm.min), so the road is effectively closed. Fix: a mark above than2 may move with her nết but never above what that archetype can hold (e.g. cap netAt at the archetype's gift plateau minus a margin, one BAL key), + a row9-net check «every netAt mark ≤ plateau for all 5 archetypes».
4. **Law 11 family not complete: the Hoàng hậu's regard gates are still typed / BAL copies** (she holds a pool nết via queenP(); row 9 = «every NPC's nết must change her thresholds»): j19:102 `S.hh>20 / <-20`, j2:171 `S.hh<BAL.ag.cx.hhShield.min`, j25:129 + j8:585 `p.hh<=-40`, j8:496 `p.hh>BAL.hiOppHh`, j8:586 `p.hh>=50`, jagacts:75/76 `BAL.ag.hh.confHh / rewardHh`, jpet:140 `p.hh>=60`, jreign:143 `S.hh>=15`, jbal qBlockHh −40 (≈11 sites). Same treatment as th: `netTh(queenP(),key)` (base when no Hoàng hậu), an hh-scan like th-scan = 0, before/after table. (Emperor Sủng stays with row 7 favK — not counted.)
Nit (not blocking): netThCross has no hysteresis — regard wobbling around her «than» level (gift up / monthly cooling down) can repeat the warm line; consider a gap before re-arming.
