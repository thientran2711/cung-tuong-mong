# review-palace-voice-r1 — reviewer report (BIG tier: wording + co-op + inventory fix)

Reviewer session_01UV1Szj7NudgmrctCjo4bZ5 · START_CTX ~5 % of 1M (get_session read 0; own estimate) · rollover at ~30 %, ceiling 60 %.
Branch under review: review/palace-voice @ cc6a8f55 (worker session_01UV1Szkk4oz7w3HZvDnHJf1). Review branch: review/palace-voice-r1.

## Verdict: PASS (sha in the coordinator message; ancestor = origin/main f1509d7c)

## Merge
- origin/main f1509d7c merged. Conflicts: dev/build/assemble.py (union = main's list incl. jcoopone/jlag2 + jvoice after j8), index.html / sw.js
  (main's taken, then site rebuilt with bash dev/site/build_site.sh), assets.json / CHANGE.txt from main.

## Checks
| item | result |
|---|---|
| Rank bands (kBand lo/mid/hi/hq) on every kLine pool | Read ALL reachable lines per band with an own sampler (all TOIL_SAY + TOIL_TRAIT reactions × 6 looks × 70 tuần, every kOutcome pool, every registered pool; distinct lines lo 161 / mid 176 / hi 179 / hq 129 — fewer than 200 exist, so every one was read). Found and FIXED 5 lines that did not fit the listener (table below). After the fixes: no newcomer line to a Quý phi / Empress, no "chủ lục cung / tần thiếp / tỷ tỷ" to the Empress. |
| Hoàng thượng: only "nàng" (low Sủng) / "ái phi" (Sủng >= BAL.voice.aiPhi = 40, jbal2) | Core OK (kAddr emp). Worker left 11 typed "nàng" in emperor quotes (j67 ×4, j96 ×3, j97 ×4) → FIXED: now {goi}/{Goi} from the one core; j67 res67 passes the beat speaker to fill67 for rt/rf (no rt/rf used tokens before, so nothing else changes); the two j96 lines inside a lover beat use rf:()=>kSay("emp",S,…). Verified: Sủng 10 → "Nàng nói thật đi…", Sủng 60 → "Ái phi nói thật đi…". No typed "ái phi" left anywhere. |
| SHORT vs LONG from one function | kGL / kLitLog / kShort (jvoice). Result card (#rtoast, kaSentence), kitLine pill, popWhy use kShort; Sổ ghi keeps the literary part. Seen in shots: Fold + iPad toast = "Thỉnh an Thái hậu · Được: Thái hậu: có thiện cảm với ta hơn (+2)" (no literary part); Sổ ghi = "Thái hậu nghe xong, vẻ mặt dịu đi hẳn. Thỉnh an Thái hậu: thành. Thái hậu → ta: thiện cảm +2." |
| Trait lines | TOIL_TRAIT (6 traits) + kHabit (fixed per consort id, co-op identical, every other tuần, long form only). FIXED: crowd reactions ("cả hậu cung") got one consort's habit appended ("…phấn của cung nào vậy?” Nàng ta nắm chiếc khăn tay…") → crowd-* gets no habit. |
| o.shared (co-op) | kLine o.shared = hash(key+seed) + week*3 + buổi, no Math.random, no personal memory; band from the listener (an NPC) → both seats compute the same line. Used for WD_SAY remarks on NPCs; remarks to her stay personal. OK. |
| j8 npcMonthly guard (co-op host week stall) | coop-e2e on origin/main f1509d7c (own run): 59/59. The worker saw the stall only on the branch (51–53/59 twice); the branch adds no inventory pieces, so this is a latent bug on main too (an NPC holding a non-IT piece, e.g. a WD_ITEMS dress piece, throws "reading 'sl'"). |
| ~20 other bare IT[e.k] reads (same family) | Scan (own script over every assembled module): 62 unguarded IT[x.k].prop reads before → FIXED the 16 lines that scan an inventory that can hold non-IT pieces: j8 vượt phẩm (143, 267), giveTo wear (216), plant (370, 372), NPC month rv/use/dress (388, 390, 391), Hoàng hậu confiscation (425, 443), gift pickers (449, 452); j24/j28 plant (8/10, 62/64); jtruth deed scan (31) → (IT[e.k]||{}).prop. Remaining 36 are display reads on lists already filtered to IT items, reward / WILL keys, or e.wk-guarded (safe). |
| Repetition | voice-pool-sim (59 situations × 30 tuần, 1770 lines): 0 % repeats within 5 tuần. |
| VANPHONG wording | cổ trang, no %, no modern words in the pools read; "lên sân khấu" → "lên đài hát". |
| Tests | voice-band PASS ×3, voice-core PASS; coop-e2e branch run 1 57/59 (A frozen when B left / cannot advance while frozen — known flakes), run 2 59/59; coop-one-world PASS; quickcheck 2f535e0f PASS (old save ok; perf new/live render 276/244, tab 316/335, buổi 970/812 ms). No page errors, no horizontal overflow at 755x1000 and 1180x820. |
| Shots (scratch only, looked at, deleted) | Fold 755x1000 + iPad 1180x820: result toast (short) and Sổ ghi entry (long). Text fits, kit result card, nothing cut. No CDN upload. |
| Kit | Text-only branch; no private UI. |

## Fixes made on review/palace-voice-r1
| line | before (said to) | after |
|---|---|---|
| Thái hậu scold (jtoil) | "Phấn dày như tường vôi. {Goi} vào cung để hầu hạ, đâu phải để lên sân khấu." to every band incl. Quý phi / Hoàng hậu | [lo,mid] only, "lên đài hát" |
| Thái hậu scold [hi] | "Ở vị trí {ten}, chỉ đứng sau Hoàng hậu…" (wrong for a Quý phi when a Hoàng quý phi exists) | "Ở vị trí {ten}, lục cung đều trông vào…" |
| rival [hi] | "{Ten} chỉ đứng dưới một người…" (same) | "{Ten} phẩm cao vị trọng…" |
| Hoàng thượng dislike | "Chẳng giống phi tần của trẫm." also to the Empress | [lo,mid,hi] |
| kOutcome th no | "Thái hậu chỉ dặn một câu: biết phận thì hơn" also to Quý phi / Empress | [lo,mid] |
| crowd reactions | one consort's habit appended to a crowd line | no habit on crowd-* |

## 6 best sample lines for the owner (2 per band)
- lo · Thái hậu khen: “Phận còn nhỏ mà biết giữ mình, ai gia ghi nhớ.”
- lo · Hoàng thượng ưng ý: “Trẫm sao giờ mới thấy nàng?”
- mid · Hoàng hậu khen: “Cung của Hàn tần nề nếp, nhìn chủ là biết.”
- mid · Thái hậu chê: “Hàn tần có cung riêng, người dưới đều nhìn Hàn tần mà học. Thế này thì dạy ai?”
- hi · Thái hậu chê: “Phẩm cao thì lỗi cũng cao. Ai gia không muốn nói lần thứ hai.”
- hi · Hoàng hậu khen: “Có Hoàng quý phi làm gương, bổn cung đỡ được bao lời răn.”

## Notes (not blocking)
- Emperor lines with {goi} repeated read a little heavy at high Sủng ("huynh ái phi hay thúc ái phi") — follows the owner's rule as written.
- Talk-result flavour (kOutcome) is still keyed by person kind, not by act (worker's own follow-up).
