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
