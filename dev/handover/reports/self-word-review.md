# self-word REVIEW (E41r, BIG, opus) — review/self-word 2030714f (E39 session_01DgYSWmTZftqSHzNfaNSkze)
PRIORITY #1 CHECK ('self-word|bổn cung|thần thiếp|kAddr|muội'): OD ~L2148 story-voice (owner words) | main: jvoice kAddr (one address core, REUSED), j67 TOK67 filler (REUSED), j97 rare-path matcher r97Hit (substring of the raw option label) | review/*: story-voice-land 54af15fa (LAND READY, E38), self-word 2030714f | claims: E39 only (this job) + this review row.
Reviewer branch: **review/self-word-r1** = 2030714f + reviewer fixes + merge of LIVE origin/main fc0867ca (index.html/sw.js conflicts only, rebuilt). Stacked on story-voice-land 54af15fa (contained).

## Verdict: PASS ffc7c1d4 after reviewer fixes (E39's work was right in kind; 3 groups of misses fixed here, no bounce to E39 needed)

## Checks
| # | brief item | result |
|---|---|---|
| 1 | 5 tokens {tx}/{Tx}/{tg}/{Tg}/{tsv} read kAddr, right by rank both ways, servant / eunuch, servant-origin | PASS. j67 my67/peer67 → kAddr(S, peer); {tsv} → kAddr(S,{srv:"m"}). No typed forms. Runtime: she lower → «tần thiếp … Tề phi nương nương»; equal → «bổn cung … tỷ tỷ» (by age/mood); higher → «bổn cung/tỷ … muội muội»; peer = Hoàng hậu → «thần thiếp … Hoàng hậu nương nương»; {tsv} = «bổn cung» from rank nuong up, «ta» below. Servant-origin player: kAddr's who(S) = srv → «nô tỳ … nương nương», never «bổn cung» (checked in a live seat). |
| 1b | each token line has the right listener | **3 lines WRONG, fixed**: jrd_bd «Đáp: mẹ {tx} gặp con gái mình» is said to Thái hậu (beat «{v} nói với Thái hậu», rt «Thái hậu gật») → «Thưa: mẹ thần thiếp gặp con gái mình»; jrd_cn «Đáp: {tsv} để sổ nói thay» answers the EMPEROR («Nàng có muốn nói thêm gì không?») → would read «bổn cung» to the Emperor → «Tâu: thần thiếp để sổ nói thay»; jrd_cn khăn line «Khăn của {tx} …» answered before the Emperor (he nods) → «thần thiếp». jrd_bd2 «buồn, và {tg} biết ai làm {tg} buồn»: the original «tỷ» was HER self word (the rival had just called her «Tỷ tỷ») → {tx} both (was «Hứa phi nương nương biết ai làm Hứa phi nương nương buồn»). GE pull keys renamed with them. |
| 2 | «thiếp»→«thần thiếp» only to the throne | PASS after fixes. Whole-game scan of every «thần thiếp» option/quote in a non-throne beat (w≠emp/th/hh): 8 hits, all to the throne by text (Xin Hoàng thượng / Thưa before Thái hậu / the foe tâu) — 0 to a non-throne person. **Missed group members (still bare «thiếp» to the throne), fixed**: BD97 rare offer «Xin Hoàng thượng cho thiếp tự mang thuốc…», jrd_cn «Thưa: thiếp không muốn gì» (to Hoàng hậu; + jgedata_w2 close/pull ×2), jrd_dtq «Thưa: thiếp tin huynh không hàng» (to the Emperor). Cause: the scan only read `{n:"` (missed `need:[…],n:"` and `,n:"`) and skipped any line with «huynh/Hoàng thượng». |
| 3 | EVERY renamed label vs EVERY word-for-word matcher | **FAIL on 2030714f, fixed**: j97 rare-path matchers (`path:[…]`/`bad:[…]` in jrd_*, substring of the raw label via r97Hit) were NOT renamed: 11 strings stopped matching (bd_san_11 ×2 bad, nc_su_11 + bd_hoa_11 ×3 each, pt_hai ×2, pt_dang_11 ×1) → those rare endings could never be earned / a bad choice no longer blocked them. New test dev/test/self-word/rare-match.js: unmatched 25 → 14 = exactly the story-voice-land base (14 pre-existing family-scope/function-option cases, same list before and after). jgedata* pull/close keys: ge-guard 8/8; ge-engine all 1316/1328 with the 12 misses = thd_hoc premise not rollable in that world (init rolled thd_sach), thd_hoc alone 41/41 ×2. |
| 4 | hand-typed 132 → 0 + 5 kin lines | PASS after fixes: self-word/scan.js 0 (26 token lines); my wider grep (any `n:"` + her quotes) leaves only kin lines: to biểu ca / huynh / {pa} / Xuân Đào (fellow maid) / «tỷ muội» noun (11 strings incl. j97 «như tỷ muội»). |
| 5 | CO-OP LAND GATE (OD:L594) both seats, two-way | PASS. coop-e2e 92/92 (×2: on 167c0da0 and on the final ffc7c1d4); NEW dev/test/self-word/coop-seats.js (two live browsers, host Fold / guest iPad, the friend = the other seat's coop entry as the peer): pass 1 host rank nuong+1 / guest nuong-2 → host «Bổn cung … muội muội … bổn cung», guest «Tần thiếp … ‹X› phi nương nương … ta»; pass 2 SWAPPED → mirrored; two-way agreement checked; servant-origin seat «Nô tỳ … nương nương … nô tỳ». PASS ×2 · story-voice/coop-seats.js PASS. |
| 6 | quickcheck + old save, role-parity ×2, voice-core, screens | QUICKCHECK PASS 215 s · old save ok · core gates PASS · perf new/live render 234/226, tab 468/400, buổi 1168/1473 ms. role-parity ALL PASS ×2. voice-core PASS. j67frame PASS (2714 beats, 0 token left). Screens Fold 755x1000 + iPad 1180x820 (scratch, looked at): cn_chu c1 «Gửi Quý nhân … lời: bổn cung không tranh», bd2 «buồn, và tần thiếp biết ai làm tần thiếp buồn» (she Quý nhân, rival Phi), cn_than «không cần gì ở Uông phi nương nương», Kính sự phòng «Nói thẳng: bổn cung ốm thật» (to the eunuch) — all fit, no h-scroll, 0 page errors. |

## 18 laws
1 two-way: coop-seats both directions PASS. 2/3 equal value / gain-loss: no option value or cost moved (labels only). 4 one core: words from kAddr, BAL.voice thresholds; no number typed. 5 n/a. 6 real evidence/objects: rare paths earnable again (were silently dead). 7 cổ trang: «thần thiếp» to the throne, rank words per VANPHONG §2. 9/10 kit: no UI change. 11 whole group: matcher family scanned (rare-match.js) + throne-line family re-scanned. 12 devices: Fold + iPad looked at. 13 priority check above.

## Reviewer fixes (commit bf0c9c88 on review/self-word-r1)
| file | before | after |
|---|---|---|
| jrd_bd path/bad, jrd_nc, jrd_pt, jrd_pt2 (rare matchers) | «Thưa: thiếp thôi cưỡi», «Thưa: thiếp không dám», «Xin ngài cho thiếp viết thư nhà gửi kèm», «cha thiếp giận, không phải», «Xin ngài đừng nhắc đến thiếp», «Thưa: thiếp tin», «Thưa: thiếp chờ gió mùa», «Thưa: thiếp muốn dùng đao» | same with «thần thiếp» (11 matches restored) |
| jrd_bd BD97 bd_soi offer | Xin Hoàng thượng cho thiếp tự mang thuốc… | … cho thần thiếp … |
| jrd_cn t1 (Hoàng hậu) + jgedata_w2 ×2 | Thưa: thiếp không muốn gì | Thưa: thần thiếp không muốn gì |
| jrd_dtq t1 (Emperor) | Thưa: thiếp tin huynh không hàng | Thưa: thần thiếp tin … |
| jrd_bd c2 (to Thái hậu) | Đáp: mẹ {tx} gặp con gái mình | Thưa: mẹ thần thiếp gặp con gái mình |
| jrd_cn x1 (to the Emperor) + jgedata_w2 | Đáp: {tsv} để sổ nói thay | Tâu: thần thiếp để sổ nói thay |
| jrd_cn c2 khăn (before the Emperor) | “Khăn của {tx}, …” | “Khăn của thần thiếp, …” |
| jrd_bd2 c2 + jgedata_bd | buồn, và {tg} biết ai làm {tg} buồn | buồn, và {tx} biết ai làm {tx} buồn |

## Follow-ups (not this branch; FOR MAIN)
- Pre-existing on LIVE: arc title «Nhà {v} trong án cũ» (jrd_cn cn_than) shows the raw token «{v}» in the hồi header and title line (seen on Fold). Needs fill67 on the header title.
- Rival speech still hand-types address words (bd2 c2 a Phi says «Tỷ tỷ buồn sao?» to a lower Quý nhân): NPC lines to her could take {goi} via kSay — story-voice scope, not her own words.
- self-word/scan.js only reads `{n:"`; rare-match.js should join the scan set for any future label rename.
## Final
Final merge of LIVE origin/main aee7ff84 (index.html/sw.js only, rebuilt) = **ffc7c1d4**; contains story-voice-land 54af15fa. Short re-gate on ffc7c1d4: self-word/scan PASS · rare-match 14 (= base) · ge-guard 8/8 · voice-core PASS · j67frame PASS · self-word/coop-seats PASS · coop-e2e 92/92 · QUICKCHECK PASS 236 s, old save ok, core gates PASS, perf render 275/311, tab 569/523, buổi 1424/1458 ms (one earlier run FAILED buổi 3024 ms while coop-e2e ran beside it; rerun alone PASS).
**LAND READY self-word ffc7c1d4 (land after story-voice 54af15fa)** — review/self-word-r1.
Shots: scratch only, deleted; nothing on CDN.
