# charge-evidence (D4 option A, worker D1+D4 #2 session_01D3E3NYUoFuaWeKkNJXdrZH, depth 2, START_CTX ~5 %)

PRIORITY #1 CHECK ('Tìm chứng|BAL.charge|evidence per charge|tội danh|tai mắt'): OD 36 | ledger 2 | claims 0 | main 594 (evG/evA total store, jtruth deed ledger, eyes()/p.mat Tai mắt) | review/* evidence-truth(-r1) = already in main | claims D1+D4 row = this worker.
Reuse: jtruth deed ledger (DEEDW / deedsOf / deedCap), evA/evG total (kept as the sum), jwhy spyRoll (caught risk, unchanged), Tai mắt = p.mat real eyes (jagknow), jpun punNote/punRows (D1), kit panel rows.

Branch review/charge-evidence (from review/punish-reason c6336349 / 74e9161f). Owner words: OD 26/11 ~05:15Z «D4 A» + ~05:35Z find odds (verbatim in OD).

## What it does
- BAL.charge (jbal2): 9 charges, own pieces — Vượt phẩm xa xỉ 1 · Giấu đồ cấm 2 · Ức hiếp quấy phá 2 · Mua chuộc người hầu 2 · Bày mưu hại người 2 · Hại dung nhan 2 · Mưu hại tính mạng 3 · Vu oan giá họa 3 · Tư thông 3 (Hoàng hậu +1); deed→charge map for every DEEDW/DEEDX key; base find band per charge (Rất vững → Hiểm).
- jcharge.js (new, last in assemble): per-charge store h.evc[key(t)][c] whose sum = the old total (chSync spreads old saves / direct writes onto the target's real deeds, newest first, or takes back from the fullest); a charge's cap = max(pieces needed, deed weights) only if she really did a deed of it (law 6a); deedCap = sum of caps.
- FIND ROLL (owner 05:35Z): every search road runs inside chSearch(master, servant, fn); each piece rolls chFind = crime band + MASTER Tâm cơ vs target (±1 band / 20, cap ±2) + servant ±1 only at extremes (sharp & bậc ≥3 / timid & bậc ≤1) + Tai mắt (≥2 +1, ≥4 +2, planted eye in her palace +1, cap +2) + target Phi+ −1 + each miss +1 (cap 6, reset on a find). Caught risk = the existing spyRoll (unchanged). A miss says «Dò kỹ mà chưa tìm ra chứng tội X (Tìm chứng: <word>); lần sau dễ hơn» — never «không có gì sai trái» when she did wrong. Someone searching HER → «Tai mắt báo: người của X đang dò tìm chứng cứ về ngươi» (her Tai mắt ≥2 or her eye in the searcher's palace; once a day per searcher).
- SHOWN: picker card sub-line «Tìm chứng: <word>» per person (the charge she is building; else a middle crime — never reveals a crime she does not know) + one plain paragraph on what decides it (her real Tâm cơ / Tai mắt numbers); talk card + servant order card + scout card carry the full line with reasons; evidence card (kit panel rows) «Chứng cứ theo tội»: per charge n/need + next «Tìm chứng» word; accusation frame «chưa đủ chứng một tội: Tư thông 1/3 …».
- ACCUSING = one full charge (accOK / judge / tocao / expose / trinhhh / NPC queen judge / j95 khống chế / jkh + jroute blood test / jlost theft): only that charge's pieces are spent; punishment by charge (light = phạt bổng + Danh −, vp confiscated; cam = cấm túc, đồ cấm confiscated; giang = one rank; cold = lãnh cung) — one punishment (D1). Her notice: AI TỐ / VÌ SAO (tội …) / CHỨNG CỨ «tội X, n món chứng: <each deed>» / HÌNH PHẠT. Two-way: the same functions for NPCs.

## Whole-family scan (python3 dev/test/charge-scan.py [ref])
| family | origin/main | branch |
|---|---|---|
| total_gate | 15 | 0  |
| total_need | 7 | 0  |
| miss_lie | 11 | 0  |
| search_noroll | 15 | 0  |

## Sim table (node dev/measure/charge-sim.js <url>; 2000 runs, miss +1 included) — both directions
| who searches whom | charge | pieces | first search «Tìm chứng» | searches to accuse (mean) | LIVE |
|---|---|---|---|---|---|
| A. Đáp ứng, Tâm cơ 70, Tai mắt 1 → Phi, Tâm cơ 20 | Tư thông | 3 | Khó lường | 6.2 | 2 (any crime) |
|  | Mưu hại tính mạng, long thai | 3 | Tùy duyên | 5.2 | 2 (any crime) |
|  | Vu oan, giá họa | 3 | Tùy duyên | 5.2 | 2 (any crime) |
|  | Hại dung nhan, hại thân | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Bày mưu hại người | 2 | Vững | 2.5 | 2 (any crime) |
|  | Mua chuộc, dọa người hầu | 2 | Vững | 2.5 | 2 (any crime) |
|  | Ức hiếp, quấy phá | 2 | Rất vững | 2.3 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Rất vững | 2.3 | 2 (any crime) |
|  | Vượt phẩm, xa xỉ | 1 | Rất vững | 1.1 | 2 (any crime) |
| B. Phi, Tâm cơ 20, Tai mắt 3 → Đáp ứng, Tâm cơ 70 | Tư thông | 3 | Mong manh | 10.0 | 2 (any crime) |
|  | Mưu hại tính mạng, long thai | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Vu oan, giá họa | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Hại dung nhan, hại thân | 2 | Khó lường | 4.2 | 2 (any crime) |
|  | Bày mưu hại người | 2 | Tùy duyên | 3.5 | 2 (any crime) |
|  | Mua chuộc, dọa người hầu | 2 | Tùy duyên | 3.5 | 2 (any crime) |
|  | Ức hiếp, quấy phá | 2 | Có cơ | 3.0 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Vượt phẩm, xa xỉ | 1 | Vững | 1.3 | 2 (any crime) |
| C. same rank (Tần), Tâm cơ 40 = 40, Tai mắt 0 | Tư thông | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Mưu hại tính mạng, long thai | 3 | Khó lường | 6.2 | 2 (any crime) |
|  | Vu oan, giá họa | 3 | Khó lường | 6.3 | 2 (any crime) |
|  | Hại dung nhan, hại thân | 2 | Tùy duyên | 3.5 | 2 (any crime) |
|  | Bày mưu hại người | 2 | Có cơ | 3.0 | 2 (any crime) |
|  | Mua chuộc, dọa người hầu | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Ức hiếp, quấy phá | 2 | Vững | 2.6 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Vững | 2.5 | 2 (any crime) |
|  | Vượt phẩm, xa xỉ | 1 | Rất vững | 1.1 | 2 (any crime) |

## Tests
- node dev/test/charge-smoke.js <url>: 31/31 PASS (store, caps, every find factor, miss/hit, accuse by charge, two-way, Tai mắt warning, notice rows, old-save spread), 0 page errors (3 runs).
- node dev/test/charge-taps.js <url> [W H dir label] — real taps on the maid picker card, the evidence card «Tố giác», her notice; LIVE f009e1a6 vs branch (built root index.html):
  - LIVE: 2 searches on a Phi who poisoned someone → «Tố giác» open (any 2 pieces), no charge, no «Tìm chứng».
  - branch iPad 1180x820: 7 searches (3 misses first) → Mưu hại tính mạng 3/3 → Tố giác (real tap) → «tội mưu hại tính mạng … thành», she goes to lãnh cung. Fold 755x1000: 10 searches → 2/3 (Phi, heavy crime: not yet). Her side: NPC with 2/2 Ức hiếp → her notice «AI TỐ … VÌ SAO … (tội ức hiếp quấy phá) · CHỨNG CỨ tội ức hiếp quấy phá, 2 món chứng: ngáng chân … · HÌNH PHẠT Cấm túc».
- Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/ipad-1180x820.webm (+ fold-picker.png, ipad-evidence.png)

## HANDOVER (worker D1+D4 #2 session_01D3E3NYUoFuaWeKkNJXdrZH, depth 2, START_CTX ~5 %, rolled at ~30 % on 26/11 ~05:58Z)
State:
- D4 = review/charge-evidence (this file). Built + smoke + scan + sim + real-taps done. TODO for the successor: (1) raise charge-taps loop cap 10 → 14 and re-shoot the Fold video so it reaches the accusation; (2) look at both videos (3×) + fold-picker / ipad-evidence; (3) VANPHONG pass on the new words (Tìm chứng, chHowTxt paragraph, miss line, Tai mắt warning); (4) the picker log line «Sai X đi dò la: <name> · đang nhắm · Tìm chứng: …» repeats the sub-line — strip «· Tìm chứng…» from that log (find the generic option logger); (5) known gaps to state or fix: charge D «Mua chuộc người hầu» does not dismiss the bought servant (deed has no servant id); confiscated items vanish like the existing «Tịch thu» (law 6c: route to Nội vụ phủ if a store exists); (6) merge origin/main (LIVE moved f009e1a6 → 02f564ae) before SSK so LAND READY is FF; (7) ONE opus BIG reviewer as child (create_session, source_url https://github.com/thientran2711/cung-tuong-mong, clone_depth 30), then LAND READY in this file → Foreman D.
- D1 = review/punish-reason c6336349: BIG rv session_01D3E3NYgP2MiapKNFbLV7bG — NO verdict received by #2 yet (check its events / ask it). NPC-release line pending sếp (revert ready review/punish-reason-npcfloor 38467ddf). Seatcap bot (dev/test/seatcap-active.js) re-run on the final sha still owed. D4 is built on top of D1, so D1 FAIL fixes must be merged into review/charge-evidence too.
