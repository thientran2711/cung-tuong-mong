# BUILDFIX5 — builder / gate worker · child of ROOT-B3 (session_01D3E3NXR5kG5EWHxHyn9TN6) · successor of BUILDFIX4
depth 3 (limit 8) · START_CTX ~3 % · 0 gens (A53: no Magnific) · base d1c7e56

## Cho sếp (tóm tắt)
- Hoàng quý phi (t7): vân kiên MỘT tầng ở mọi mùa + gốc.
- Hoàng quý phi + Hoàng hậu (t7/t8 thu): bỏ chữ "cứng" và "không ôm vai"; chỉ còn "dài hơn một chút, chìa ra ngoài vai" (t7) / "dài hơn, chìa rõ ra ngoài vai" (t8).
- Bậc 6–8: bỏ hết chữ "áo choàng" (cape). Quý phi mùa gốc/xuân/hạ/đông: "2 lớp áo choàng vai" đổi tên thành "vân kiên hai tầng", giữ nguyên hình dáng/kích cỡ.
- Thu Quý phi (t6): máy quay lại đúng lời đã duyệt L1893 (tranh eIPcGThdqL), bỏ lời thử L2088.
- Thu t6–t8: vải = y chang vải thu t1–t5 (lụa mỏng nhẹ + sa, thướt tha); bỏ "gấm dày / HEAVY / ceremonial". Mùa khác không đổi.
- Thu MỌI bậc t1–t8: không còn chữ "gấm/brocade" (t3 đai lụa, t5 Phi "áo lụa nhiều lớp", "cổ tay lụa", "đai lụa vàng").
- Triều phục: câu vải S28 = gấm NHẸ NHẤT (mỏng, mềm, lì, không dày/cứng/nặng). Bộ lời triều r27 (chưa vẽ).
- Không đụng: tư thế/góc (A54), eo, ngực, cổng độ dài, Tần t4 CAPELET. Ghi chú H14/G73 chỉ đọc, chưa đưa vào máy (A55).

## Jobs (ROOT-B3 GO 16:37Z, owner L2119; + items 4/5)
JOB 0–4 of the first brief (B27 Phi fabric all seasons, LEN warn, …) were CANCELLED by ROOT-B3 (owner L2116, A55); nothing of them was committed.
The GO items done here:
1. t7 HQP one-tier vân kiên, all seasons + root (L2099/L2119) — only the vân kiên part of reverted 08361600 (no B27 constant, no heavy-brocade gate).
2. t7/t8 no STIFF / STIFFER / 'never hugging them' (L2105).
3. t6–t8 no 'cape' garment word (L2119); t6 non-thu capes renamed to the TWO-TIER cloud collar (ROOT-B3 answer (a)).
4. thu t6 QP back to the APPROVED L1893 words + its own refs (ROOT-B3 item 4).
5. thu t6–t8 fabric = the t1–t5 thu fabric sentence (owner L2122 CHỐT, rule B32; ROOT-B3 item 5).
6. triều phục S28 = the lightest-gấm sentence (owner L2122, ROOT-B3 item 6).
7. thu thường phục t1–t8: no 'brocade' word → silk (owner L2122, ROOT-B3 item 7).
Push 1 = 29f7d431 (items 1–5); push 2 = items 6–7 + tables.

## What changed (ONE copy in master_common, used by build_all + check_store)
| item | before | after | where |
|---|---|---|---|
| thu t7 tier | 'TWO-TIER cloud collar (vân kiên hai tầng)' | 'SINGLE-TIER cloud collar of ONE layer only (vân kiên một tầng)' | L2119_SWAPS |
| root/xuân/hạ/đông t7 | 'a jewelled cloud-collar cape edged with …' · 'lying flat on the cloud-collar cape' · 'robe, cape and sleeves' · 'trims along the cape edges' | 'a jewelled SINGLE-TIER cloud collar of ONE layer only (vân kiên một tầng) edged with …' · 'lying flat on the cloud collar' · 'robe, cloud collar and sleeves' · 'trims along the vân kiên edges' (= S14_VK) | L2119_SWAPS |
| thu t7 | 'a little LONGER and STIFF, standing slightly OUT past the shoulders, never hugging them' | 'a little LONGER, extending slightly OUT past the shoulders' | L2119_SWAPS |
| thu t8 | 'LONGER and STIFFER, standing clearly OUT past the shoulders, never hugging them' | 'LONGER, extending clearly OUT past the shoulders' | L2119_SWAPS |
| t7/t8 gem line | 'NEVER on the robe, cape, collar or belt' | 'NEVER on the robe, collar or belt' | L2119_SWAPS |
| root/xuân/hạ/đông t6 | 'TWO layered embroidered <c> SHORT shoulder capes, one over the other (the upper cape shorter, the lower cape a little longer, …' · 'collar and cape trim' · 'sleeves, cape and train' · 'sleeves and any cape,' | '… <c> SHORT TWO-TIER cloud collar (vân kiên hai tầng), one tier over the other (the upper tier shorter, the lower tier a little longer, …' · 'collar and cloud-collar trim' · 'sleeves, cloud collar and train' · 'sleeves and cloud collar,' | L2119_SWAPS |
| thu t6 base | s62_t6_THU_vankien2_L2088.txt (VE12 test) + refs [KC, TdwDfOyVNR, YMl2p0yWeC] | s62_t6_THU_vankien2_L1893.txt (= G63 frozen THU_QP_t6_L1933_FROZEN.txt, picture eIPcGThdqL) + refs [KC, TdwDfOyVNR] (= eIPcGThdqL ledger refs) | thu_ladder SRC/REFS; S62[6] 'camellia sprigs' pair dropped (not in L1893) |
| thu t6–t8 fabric | 'FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.' | master M06 'The FABRIC is thin, light, flowing silk and gauze with a soft sheen … (thướt tha); the small embroidered motifs are stitched in fine gold thread.' (= thu t1–t5, all five identical) | b32_swaps (thu only) |
| thu t6 noun | 'a HEAVY silk brocade robe in SATURATED <c> silk' | 'a robe of thin, light, flowing SATURATED <c> silk' (SATURATED colour word kept) | b32_swaps |
| thu t7 noun | 'a near-empress ceremonial robe of <c> silk' | 'a near-empress robe of thin, light, flowing <c> silk' | b32_swaps |
| thu t8 noun | "the Empress's imperial phoenix ceremonial robe of <c> silk" | "… imperial phoenix robe of thin, light, flowing <c> silk" | b32_swaps |
| thu t6 phi bạch | ', matching the weight of her brocade' | dropped (no brocade left; owner L1847 'slightly THICKER' words kept) | b32_swaps |
| builder | — | build_all.season_post + build(): l2119_post (all seasons, t6–t8); season_post thu: b32_post | build_all |
| gate | — | check_store store gate: the season store text is put back to the old words (new_words_unswap) for the HQP slot regex, then read as the new words (b32_store_swap, l2119_store_swap); master check: thu t6–t8 with M06 in the brocade slot = low-rank fabric rule (B32 WARN note, no B12 BROCADE demand); S07 brocade sentence waived for thu B32 | check_store |
| thu t3 (all p) | 'a wide stiff <sec> brocade girdle' (G15) | 'a wide stiff <sec> silk girdle' (G15 gate template read the same way for thu) | b32_swaps |
| thu t5 Phi | 'a layered silk brocade court robe' · 'deep brocade cuffs' · 'a broad gold brocade girdle' | 'a layered silk court robe' · 'deep silk cuffs' · 'a broad gold silk girdle' | b32_swaps |
| triều phục S28 | 'FABRIC OF THIS COURT ROBE: the robe and sleeves are rich silk BROCADE (gấm) with a woven pattern, flowing as brocade flows, the same brocade on every rank, never thin, limp or flimsy.' | 'FABRIC OF THIS COURT ROBE: the robe and sleeves are the LIGHTEST thin, supple brocade (gấm) with a soft matte finish, never thick, stiff or heavy, with a graceful, flowing drape, the same on every rank.' | master_common.TRIEU_GAM; check_store S28 text + proof → owner-copy/trieu/r27/t3_c06_RAN.txt; trieu6–8 brocade slot accepts it (b29_alts) |
| triều set | r26 (S28 old) | r27 = r26 word for word + S28 swap (make_r27.py, .keep sidecars). r26/r27 both carry OLD faults the gate now finds (NOEAR, M01, G57 …) — never a live prompt set; no triều builder in build_all | owner-copy/trieu/r27 |
| rule B32 | owner text | + WIRED note (thu t1–t8, S28 light gấm) via rule.py set | ART_RULES + _HISTORY |
| rule | G37 'one tier … HH a little STIFFER' | G37 rewritten via rule.py set (quotes L2105 + L2119; L1543 'stiffer' superseded; t6 two-tier L1847/L2088, t8 two-tier L2099, t7 one tier) | ART_RULES + _HISTORY |

## LUẬT SỬA CẢ NHÓM — scan (dev/handover/reports/BUILDFIX5/scan.py, 112 persons × t6–t8 × root+4 seasons) — cells with the word
| cell | before | after |
|---|---|---|
| root/xuân/hạ/đông t6 | 'cape' 112 · 'any cape' 112 | 0 · 0 (TWO-TIER cloud collar 112) |
| root/xuân/hạ/đông t7 | 'cape' 112 | 0 (SINGLE-TIER 112) |
| thu t6 | TWO-TIER 112 (L2088 words) | TWO-TIER 112 (L1893 words), cape 0 |
| thu t7 | STIFF 112 · never hugging 112 · TWO-TIER 112 · cape 112 · gem-line cape 112 | all 0 · SINGLE-TIER 112 |
| thu t8 | STIFF 112 · never hugging 112 · TWO-TIER 112 · cape 112 · gem-line cape 112 | all 0 · TWO-TIER 112 (kept, L2099) |
| t6–t8 any season | cloak 0 · capelet 0 | cloak 0 · capelet 0 |
| thu t1–t8 'brocade'/'gấm' (brscan.py) | t3 girdle 112 · t5 robe/cuffs/girdle 112 · t6–t8 fabric+noun 112 | 0 (only 't3 ceremonial front panel', not fabric) |
Files: scan_before/after.json, brscan_thu_after.log.

## Real-gate sweep (gsweep.py, 112 p, a18, t1–t8) — FAIL per rank
| season | before (HEAD d1c7e56, clean worktree, t6–t8) | after (all t1–t8) |
|---|---|---|
| root / xuân / hạ / đông | 0 everywhere | 0 everywhere |
| thu | t6 3 · t7 14 · t8 15 (LEN only) | t1–t6 0 · t7 31 · t8 28 (LEN only) |
NON-LEN FAIL after: 0. LEN is still a FAIL (LEN-warning job cancelled, A55): the M06 thu fabric sentence is ~180 ch longer than the brocade line; thu t6 went 3 → 0 (L1893 base is shorter).
LEN cells thu t7: c06 10477, s44 10418, s60 10371, s57 10323, s45 10305, s36 10304, s58 10299, s56 10288, s41 10285, s61 10271, s54 10209, s38 10198, s40 10184, s59 10166, s33 10153, s09 10145, s35 10141, s43 10113, s39 10097, s27 10090, s07 10080, s42 10078, s24 10072, s17 10068, s21 10063, s47 10057, s34 10039, s49 10030, s51 10021, s46 10017, s08 10007
LEN cells thu t8: s58 10472, c06 10418, s61 10417, s38 10322, s57 10288, s42 10284, s56 10277, s45 10277, s44 10239, s33 10223, s59 10201, s08 10197, s60 10188, s41 10186, s36 10185, s35 10129, s43 10123, s34 10118, s25 10105, s39 10102, s51 10091, s54 10084, s09 10058, s07 10057, m20 10045, s40 10041, s37 10021, s30 10009

## Not done / for ROOT-B3
- Triều phục: S28 done (item 6). The old triều prompt sets (r19…r26) fail many newer gates (NOEAR, M01, G57); a real triều rebuild is a separate job.
- t8-prompt-B/build.py old STORE outfits (non-thu seasons) still say 'silk brocade court robe' / 'HEAVY silk brocade robe' — other seasons unchanged by order.
- NOTE ONLY (A55, not built): H14 inner-robe embroidery ladder (L2131), G73 natural chest embroidery (L2133) wait for the owner's OK on M2133-01..03.
- G63 says the thu QP L1893 prompt is frozen; the builder now uses its words with the L2119 (no cape) + B32 (L2122 fabric) swaps on top — later owner orders.
- thu t6 keeps the NECK bracket (ROOT-B2 family fix, not an L2088 word) and colour_t6 ('any cape' → 'cloud collar', = L2119).
- LEN: still a FAIL in check_store (LEN job cancelled, A55). The thu t7/t8 cells over 10 000 are listed in after.json; the M06 sentence is ~180 chars longer than the brocade line.
Self-tests: check_store --self = the old 3 PROOF MISMATCH only (S12 S14 S19); person_gate --self PASS; keep_check --all 1062 PASS (+8 r27).
Tools: dev/handover/reports/BUILDFIX5/gsweep.py (env RANKS/SEASONS), scan.py, brscan.py (brocade phrases per season), dump.py; before.json / after.json, scan_before/after.json.

## HANDOVER (BUILDFIX5 → successor; the COORDINATOR opens it)
depth 3 · START_CTX ~3 % · now ~25 % → at the roll line. State @6332d63b: items 1–7 done, swept, reported; idle.
Open: (a) thu t7/t8 LEN cells (list above) = owner/ROOT decision (LEN gate still FAIL, A55); (b) triều phục sets r19–r27 carry old gate faults (NOEAR, M01, G57) — rebuild = separate job; (c) WAIST LADDER (dev/handover/reports/WAIST1.md) waits for the owner's yes; (d) H14 (L2131/L2140) / G73 (L2133) = notes only until she OKs pictures (A55).
Where: one copy in master_common (L2119_SWAPS, b32_swaps, TRIEU_GAM, new_words_unswap); build_all season_post/build call l2119_post + b32_post (thu); check_store store_check unswap→hqp_store→b32/l2119 store swaps, S07 waiver, B32 master waiver. Tools in dev/handover/reports/BUILDFIX5/ (gsweep.py, scan.py, brscan.py, dump.py).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
