SẴN SÀNG KIỂM 21b9df01f24600e88755970cc4c8149eef00f5c6
# review/title-sys2 (Foreman C worker, opus) — TITLE SYSTEM phase 2
Branch review/title-sys2 @ 21b9df01, built on phase 1 PASS ced2edc6 + merged origin/main 0ce59361 (descends from main). START_CTX ~3 % (1M window); finished well under +25 %.
Owner lines: OD 16/11 13:00Z, 13:20Z (2)(4)(5), 13:30Z (3) item conservation, 13:40Z; FOREMAN_C 13:20Z/13:50Z. Details: dev/PROGRESS_title-sys.md › PHASE 2 — BUILT.

## What was built (dev/build/jdh2.js, after jdh.js; numbers BAL.dh.hieu / .conf / .it in jbal2.js)
| # | Rule | How (one place) |
|---|---|---|
| 1 | Emperor HIỆU by thresholds, her + NPCs | `dhHieuOK(p)` = the ONE check: rank ≥ Tần, Sủng ≥ RANKS[r].s+10, Danh ≥ RANKS[r].d+8, 2 months at rank, not lãnh cung/cấm túc, nothing confiscated, not Hoàng hậu, a free name. `dhHieuGrant(p)` = the ONE grant (hiệu + Sắc phong + Ngọc ấn, Danh +5). Monthly 25 % when eligible; j8 `bestow` son/promo/contest: old `roll(30)` removed → grants at once when eligible; jexam full seat uses the same grant (owner-approved seat compensation keeps no threshold). Player view: Nhiệm vụ › Danh hiệu › "Hiệu Hoàng thượng ban" (has / how to get / what is missing / where the pieces are). |
| 2 | Sắc phong + Ngọc ấn items | IT `sacphong`, `ngocan` (j8, Kỷ vật, keep:1 → "kỷ vật: không bán", nt:1); entries {own, hieu, dhid}. Never sold (sellItem/econ), never given (giveTo, gift bag). Old saves with a hiệu get both pieces once, quietly. |
| 3 | Confiscation by punishment | ONE weekly state check per person (rank drop / lãnh cung / new cấm túc) catches EVERY route (punish, fall, demote, cold, deathSentence mercy, inline drops in j4/j67/jreign); reasons stamped by wrappers. Odds `conf.p`: lãnh cung [hiệu 100, worn title 100], giáng [50,35], cấm túc [0,40]. Hiệu reserved in p.dhConf, pieces → Nội vụ phủ store (S.il.box record shape of the item ledger), worn title flagged conf (not wearable). Danh −5, Sủng −3; kit notice "Bị thu hiệu ban". |
| 4 | Atonement quest | Opens 3 months later (out of lãnh cung, no cấm túc): Chép kinh sám hối 3 copies OR lập công Danh +12. Her: dialog "Dâng biểu sám hối"; NPC: at once. All back (hiệu, pieces, title). Progress in Nhiệm vụ › Danh hiệu. |
| 5 | Loss / theft + investigation | 2 %/month per piece → a jlost case for THAT piece (loLose forced; rival cause only when her motive allows; may keep it). jlost random loss / laydo never pick these. Her: dialog "Ấn tín thất lạc" (Báo Cung Chính ti / Hỏi cung nhân = jlost loDo, true evidence / Để sau). Closed and not back → Danh −8 once. |
| 6 | Item conservation | Weekly census: exactly one book + one seal per hiệu (held or confiscated, owner alive or dead) somewhere (chest, store, case, dialog); none → store ("Nội vụ phủ nhặt được", home after 4–10 weeks; dead owner → di vật); duplicates dropped. |

Item ledger: review/item-ledger (Foreman D, jil.js) is NOT on main → thin adapter: jdh2 calls ilLog when present and writes jil's own S.il.box record shape otherwise; store records carry rel 1e9 + dh:1 so jil's generic ilconf never returns them (only atonement does). No change needed when jil lands.
Family fixes found on the way: jinv showed "Sủng không dưới 15" on every keep/ngự tứ item (ngocboi's own rule) → ngocboi only; j8 giftVal and the NPC monthly gift threw on items with no `tg` list (jeitem home pieces: the gift bag crashed) → tolerant.
NPC hiệu that phase 1 never removed now leaves on lãnh cung / giáng (same rule as hers).

## Tests (all PASS, 0 page errors)
| Test | Result |
|---|---|
| dev/test/title-sys2.js (logic her + NPC: thresholds, grant, never sold/given, bestow, old save, every confiscation route, both atonement roads, loss case + dialog + penalty once, census both ways, JSON round-trip; UI panels + overflow) | PASS 755x1000@2, 1180x820@2, 1366x1024@2, 1000x755@2, 844x390@2 (one earlier run at 844x390 failed once "NPC lập công did not restore"; not reproduced in 3 reruns + every later run; diagnostics left in the test) |
| dev/test/title-sys.js (phase 1) | PASS 755x1000 |
| dev/test/lost-items.js | PASS 755x1000, 1180x820 |
| dev/test/coop-e2e.js | 59/59 (one run 58/59: CDN CORS console error on FIGURES.json, environment; rerun 59/59) |
| dev/measure/dh2bot.js 4 lives × 216 weeks (passive bot) | NPC grants 12 (month 7, contest 5), confiscations 53 (cấm túc 33, giáng 17, lãnh cung 3; hiệu taken 5, titles 50), atonements opened 20 / restored 13, losses 12 (rival 1); conservation faults 0 (checked every quarter) |
| dh2bot `me` variant (she starts as an eligible Phi), 3 lives | her grant 1, her losses 2 → cases + dialog; conservation faults 0 |
Note: serve dev/index.html with a UTF-8 server (dev/test/lib/device.js serveRoot); python http.server sends no charset → the page fails to parse.
Shots (local, not committed): grant reward panel, confiscation notice, Danh hiệu panel with hiệu + atonement sections, loss dialog with the §64 item frame.

## KIT REQUEST
- (optional, owner 13:00Z "equip slot together with the sắc phong book") a "Hiệu ban" slot in Tư trang › Đang mang showing the Sắc phong + Ngọc ấn. Not built (no kit part); the pieces show as normal Kỷ vật in the chest and in Nhiệm vụ › Danh hiệu.
- Still open from phase 1: a panel picture for Danh hiệu / the confiscation notice (today the kit generic tea-set fallback).

## ART LIST FOR FOREMAN C
- item-sacphong (Sắc phong: imperial yellow brocade decree scroll on a stand) + item-ngocan (white jade seal, dragon knob, red tassel): img/item-*.webp + item512, transparent, sharp at the big centre reveal (jitev/kitItemBig). Today the kit item frame shows no picture.
- optional: event banner for "Sắc phong ban hiệu" / "Bị thu hiệu ban" (decree being read / eunuch taking the tray away).

## History notes (OD 14:10Z rule)
Qing practice: phong hiệu (封号) usually from Tần (嫔) up, given with the investiture; demotion or lãnh cung often stripped it (e.g. the hiệu removed on 降位), and a restored favour could bring it back. The investiture items were a gold/jade book (册) and, for Phi and above, a seal (宝/印); Tần received the book only. Built: book + seal for every hiệu (owner 13:00Z). Option if wanted: Tần gets the book only, the seal from Phi up.

## QUESTIONS (defaults chosen, not asked)
1. Full-seat compensation (jexam) still gives a hiệu without the thresholds (owner-approved seat rule), now with book/seal and Danh +5 like every grant. OK?
2. Her own "laydo" theft cannot target someone's Sắc phong / Ngọc ấn (only the monthly rule moves them). Allow?
3. Seal from Phi up only (history), or both pieces at every rank with a hiệu (built)?
