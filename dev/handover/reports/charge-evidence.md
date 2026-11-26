# charge-evidence (D4 option A, worker D1+D4 #2 session_01D3E3NYUoFuaWeKkNJXdrZH, depth 2, START_CTX ~5 %)

PRIORITY #1 CHECK ('Tìm chứng|BAL.charge|evidence per charge|tội danh|tai mắt'): OD 36 | ledger 2 | claims 0 | main 594 (evG/evA total store, jtruth deed ledger, eyes()/p.mat Tai mắt) | review/* evidence-truth(-r1) = already in main | claims D1+D4 row = this worker.
Reuse: jtruth deed ledger (DEEDW / deedsOf / deedCap), evA/evG total (kept as the sum), jwhy spyRoll (caught risk, unchanged), Tai mắt = p.mat real eyes (jagknow), jpun punNote/punRows (D1), kit panel rows.

Branch review/charge-evidence (from review/punish-reason c6336349 / 74e9161f). Owner words: OD 26/11 ~05:15Z «D4 A» + ~05:35Z find odds (verbatim in OD).

## What it does
- BAL.charge (jbal2): the owner's EIGHT charges, own pieces — Vượt phẩm xa xỉ 1 · Giấu đồ cấm 2 · Ức hiếp quấy phá 2 · Mua chuộc người hầu 2 · Hại dung nhan 2 · Mưu hại tính mạng 3 · Vu oan giá họa 3 · Tư thông 3 (Hoàng hậu +1); the former 9th «Bày mưu hại người» is folded into Ức hiếp quấy phá (see #3 below); deed→charge map for every DEEDW/DEEDX key; base find band per charge (Rất vững → Hiểm).
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

## Sim table (node dev/measure/charge-sim.js <url>; 2000 runs, miss +1 included) — both directions (re-run by #3 on the 8-charge tree)
| who searches whom | charge | pieces | first search «Tìm chứng» | searches to accuse (mean) | LIVE |
|---|---|---|---|---|---|
| A. Đáp ứng, Tâm cơ 70, Tai mắt 1 → Phi, Tâm cơ 20 | Tư thông | 3 | Khó lường | 6.3 | 2 (any crime) |
|  | Mưu hại tính mạng | 3 | Tùy duyên | 5.2 | 2 (any crime) |
|  | Vu oan giá họa | 3 | Tùy duyên | 5.2 | 2 (any crime) |
|  | Hại dung nhan | 2 | Có cơ | 3.0 | 2 (any crime) |
|  | Mua chuộc người hầu | 2 | Vững | 2.5 | 2 (any crime) |
|  | Ức hiếp quấy phá | 2 | Rất vững | 2.2 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Rất vững | 2.2 | 2 (any crime) |
|  | Vượt phẩm xa xỉ | 1 | Rất vững | 1.1 | 2 (any crime) |
| B. Phi, Tâm cơ 20, Tai mắt 3 → Đáp ứng, Tâm cơ 70 | Tư thông | 3 | Mong manh | 9.9 | 2 (any crime) |
|  | Mưu hại tính mạng | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Vu oan giá họa | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Hại dung nhan | 2 | Khó lường | 4.1 | 2 (any crime) |
|  | Mua chuộc người hầu | 2 | Tùy duyên | 3.5 | 2 (any crime) |
|  | Ức hiếp quấy phá | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Vượt phẩm xa xỉ | 1 | Vững | 1.3 | 2 (any crime) |
| C. same rank (Tần), Tâm cơ 40 = 40, Tai mắt 0 | Tư thông | 3 | Hiểm | 7.8 | 2 (any crime) |
|  | Mưu hại tính mạng | 3 | Khó lường | 6.2 | 2 (any crime) |
|  | Vu oan giá họa | 3 | Khó lường | 6.3 | 2 (any crime) |
|  | Hại dung nhan | 2 | Tùy duyên | 3.5 | 2 (any crime) |
|  | Mua chuộc người hầu | 2 | Có cơ | 2.9 | 2 (any crime) |
|  | Ức hiếp quấy phá | 2 | Vững | 2.5 | 2 (any crime) |
|  | Giấu đồ cấm | 2 | Vững | 2.6 | 2 (any crime) |
|  | Vượt phẩm xa xỉ | 1 | Rất vững | 1.1 | 2 (any crime) |

## Tests
- node dev/test/charge-smoke.js <url>: 31/31 PASS (store, caps, every find factor, miss/hit, accuse by charge, two-way, Tai mắt warning, notice rows, old-save spread), 0 page errors (3 runs).
- node dev/test/charge-taps.js <url> [W H dir label] — real taps on the maid picker card, the evidence card «Tố giác», her notice; LIVE f009e1a6 vs branch (built root index.html):
  - LIVE: 2 searches on a Phi who poisoned someone → «Tố giác» open (any 2 pieces), no charge, no «Tìm chứng».
  - branch iPad 1180x820: 7 searches (3 misses first) → Mưu hại tính mạng 3/3 → Tố giác (real tap) → «tội mưu hại tính mạng … thành», she goes to lãnh cung. Fold 755x1000: 10 searches → 2/3 (Phi, heavy crime: not yet). Her side: NPC with 2/2 Ức hiếp → her notice «AI TỐ … VÌ SAO … (tội ức hiếp quấy phá) · CHỨNG CỨ tội ức hiếp quấy phá, 2 món chứng: ngáng chân … · HÌNH PHẠT Cấm túc».
- Videos: https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/ipad-1180x820.webm (+ fold-picker.png, ipad-evidence.png)

## HANDOVER (worker D1+D4 #2 session_01D3E3NYUoFuaWeKkNJXdrZH, depth 2, START_CTX ~5 %, rolled at ~30 % on 26/11 ~05:58Z)
State:
- D4 = review/charge-evidence (this file). Built + smoke + scan + sim + real-taps done. TODO for the successor: (1) raise charge-taps loop cap 10 → 14 and re-shoot the Fold video so it reaches the accusation; (2) look at both videos (3×) + fold-picker / ipad-evidence; (3) VANPHONG pass on the new words (Tìm chứng, chHowTxt paragraph, miss line, Tai mắt warning); (4) the picker log line «Sai X đi dò la: <name> · đang nhắm · Tìm chứng: …» repeats the sub-line — strip «· Tìm chứng…» from that log (find the generic option logger); (5) known gaps to state or fix: charge D «Mua chuộc người hầu» does not dismiss the bought servant (deed has no servant id); confiscated items vanish like the existing «Tịch thu» (law 6c: route to Nội vụ phủ if a store exists); (6) merge origin/main (LIVE moved f009e1a6 → 02f564ae) before SSK so LAND READY is FF; (7) ONE opus BIG reviewer as child (create_session, source_url https://github.com/thientran2711/cung-tuong-mong, clone_depth 30), then LAND READY in this file → Foreman D.
- D1 = review/punish-reason c6336349: BIG rv session_01D3E3NYgP2MiapKNFbLV7bG is ARCHIVED; its own summary says «PASS e00a9823 on review/punish-reason-rv, merged over the new npcOneBelow switch» (the message did not reach #2 — verify that branch/sha + its report before relying on it; then rebase/merge review/charge-evidence onto that sha). NPC-release line pending sếp (revert ready review/punish-reason-npcfloor 38467ddf). Seatcap bot (dev/test/seatcap-active.js) re-run on the final sha still owed. D4 is built on top of D1, so D1 FAIL fixes must be merged into review/charge-evidence too.

## WORKER #3 (session_01D3E3Na6fYWKmC7N5t9iRx5, depth 2, START_CTX ~3 %) — finish + land prep
PRIORITY #1 CHECK: OD 26/11 ~05:15Z «D4 A» + ~05:35Z formula (verbatim) | FOREMAN_D_STATUS FROM MAIN 152 05:15Z + 05:35Z | main 02f564ae | review/punish-reason-rv e00a9823 (D1 BIG rv PASS) | review/charge-evidence 1e281825 (#2) | claims D1+D4 row = this worker.
- EIGHT CHARGES (owner list: Vượt phẩm 1 · Giấu đồ cấm 2 · Ức hiếp 2 · Mua chuộc người hầu 2 · Hại dung nhan 2 · Mưu hại tính mạng 3 · Vu oan 3 · Tư thông 3). BAL.charge had a 9th, «Bày mưu hại người» (bm: deeds plot = a plot begun, caught = caught in the act, old = old-save scheme counter). It is NOT one of hers renamed → FOLDED into «Ức hiếp quấy phá» (uh): same pieces (2) and the same punishment (cấm túc), so no balance change for those deeds except a one-band easier find (band 5 vs 4). Sites: jbal2 C/order/deed map, jcharge chOfDeed default + old-total spread default + chTocao, j30 «Tố tội thật» text («bày mưu, ức hiếp 2»).
- D1 merged in: review/punish-reason-rv 8351f5ab (BIG rv PASS e00a9823 fixes + BAL.pun.npcOneBelow=false + LIVE 02f564ae). Conflicts j78 (kept D4 lines, expose fail «giáng một bậc» from rv fix 3) + jbal2 (npcOneBelow false + BAL.charge); built files rebuilt.
- PICKER LOG (whole family): j3 logChoice printed the card title «Sai X đi dò la: <name> · đang nhắm · Tìm chứng: …»; j78 evidence record «how» the same. New shared j3 optLogName() strips the card sub-line markers (« · đang nhắm», « · Tìm chứng: …») for BOTH; only jwhy spy picker appends them (chFindWord has one caller). Log now «Sai Bảo Châu đi dò la: Phi Chân Tri Ý.»
- VANPHONG: chHowTxt «Tìm chứng = cơ may MỘT lần dò tìm ra MỘT chứng cứ …» (machine «=», caps) → «Tìm chứng» là may rủi của một lần dò: có tìm ra một món chứng cứ hay không. Tội nhẹ dấu vết dễ lộ, tội nặng giấu kỹ; <who> có Tâm cơ N: hơn người bị dò thì dễ tìm, kém thì khó tìm; …; Tố tội thật «MỘT tội» → «một tội». Other new lines (miss line, Tai mắt warning, reason chips, punishment words) read cổ trang, odds as words, no %.
- charge-taps loop cap 10 → 14; Fold now reaches the accusation (4 searches, Mưu hại tính mạng 3/3 → Tố giác real tap → lãnh cung); iPad 8 searches → same.
- Known gaps (stated, not fixed here): (a) charge «Mua chuộc người hầu» does not dismiss the bought servant (deed has no servant id); (b) confiscated items leave like the existing «Tịch thu» (law 6c: should go to Nội vụ phủ store — no store exists yet; route to the item owner); (c) the victim of a deed she never met shows as «Tần ???» in the evidence rows (the existing stranger rule).

### Tests #3 (file:// build of this tree)
| test | result |
|---|---|
| charge-smoke.js | 31/31 PASS, 0 page errors |
| charge-scan.py | total_gate 0 · total_need 0 · miss_lie 0 · search_noroll 0 |
| charge-taps.js 755x1000 | PASS, 4 searches → accuse → lãnh cung; her side notice AI TỐ / VÌ SAO / CHỨNG CỨ / HÌNH PHẠT |
| charge-taps.js 1180x820 | PASS, 8 searches → accuse → lãnh cung; her side «tội ức hiếp quấy phá … Cấm túc 2 tháng» |
| punish-reason.js 755x1000 + 1180x820 | 18/18 + 18/18 |
| cold-faction.js | 20/20 |
| charge-sim.js | table above (8 charges) |
Videos (re-shot by #3): https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/fold-755x1000.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/ipad-1180x820.webm (+ fold-picker.png, fold-evidence.png, ipad-evidence.png). Looked at: picker card (Tìm chứng sub-line + plain paragraph), evidence card (Chứng cứ theo tội 3/3, Tố giác), her notice — no cut text, kit panel rows.

### #3 part 2 — dup-report §4.1 (FOREMAN E E97f2, relayed by MAIN 152 via Foreman D 06:15Z)
The «6 unnamed» = the six evidence kinds §4.1 left without a D4 charge; «4 missing deed records» = the four act families that wrote no deed (law 6a: no piece could ever exist). All folded into the 8 charges, no new charge:
| kind | before (442bf25b) | after | why |
|---|---|---|---|
| ls (sổ Kính sự phòng lệch ngày, jkh) | recorded, unmapped → default | tt | the same proof as pm |
| mlbeat (maid-line beating) | recorded, unmapped → default | uh | petty harm like trip / batnat |
| mlframe, mlhframe (maid-line frame) | recorded, unmapped → default | vo | framing |
| mlpoison (maid-line poison) | recorded, unmapped → default | mh | poison = attempt on a life |
| rash (Bỏ phấn lạ) | NO deed | DEEDW rash:2 → hd | harms her face |
| xa xỉ (dressed over allowance, the luxOf of act xx) | NO deed | deedSync scan «xx», once per look → vp | the owner's «Vượt phẩm xa xỉ» |
| laydo / laydol (sai người lấy trộm đồ) | NO deed | DEEDW :1 → uh | beside steal / petsteal |
| tat, phatquy, nuoc / tea / ink (slap, kneel, splash) | NO deed | DEEDW :1 → uh | open bullying |
| pushp (đẩy xuống hồ sen) | hd | mh | can drown, like pond (dup-report FOR FOREMAN D 5) |
| phonghoa (phóng hỏa kho đồ) | hd | uh | burns objects, not a body / face (same 5) |
New scan family `deed_unmapped` in dev/test/charge-scan.py (every DEEDW / DEEDX key, deedAdd / deedOnce literal kind and maid-line kind must sit in BAL.charge.deed): 442bf25b = 5 (ls mlbeat mlframe mlhframe mlpoison) → now 0. Probe (her as actor, runAct): trip→uh, rash→hd, tat→uh, phatquy→uh, tea→uh, laydo→uh deeds written; xa xỉ deed «ăn vận xa xỉ quá bổng lộc phẩm mình» → vp. Not in D4: the «who hears the charge» choice (dup-report FOR FOREMAN D 3) — the sentence stays the charge's pun; the hearer only matters inside the future P11 merge (E build).
Tests after: charge-smoke 31/31 · charge-taps Fold 12 searches → accused (lãnh cung) · iPad 6 → accused · punish-reason 18/18 · cold-faction 20/20 · charge-scan all families 0.

## HANDOVER (worker D1+D4 #3 session_01D3E3Na6fYWKmC7N5t9iRx5, depth 2, START_CTX ~3 %, rolled at ~28 % on 26/11 ~07:00Z)
State:
- D1 = LAND READY sent to Foreman D: review/punish-reason-rv 8351f5ab (FF from LIVE 02f564ae; npcOneBelow=false; punish-reason 18/18 ×2, cold-faction 20/20, punish-scan 0, seatcap-oldsave PASS; seatcap-active bot times out as on main — pre-existing). LAND ORDER: D1 first, then D4 (D4 contains D1).
- D4 = review/charge-evidence-rv 4770054d (FF from LIVE) = BIG rv PASS 2781a25e (session_01D3E3NYvhVEvTMxZjLhU7A5, archived) + my dup-report §4.1 delta (798ec852 merged). DELTA reviewer session_01D3E3NXMbdsz2m9Rp34vbV1 (opus, my child) checks only `git diff 2781a25e 4770054d -- dev/build dev/test` and reports «DELTA PASS|FAIL <sha>» to Foreman D + me. Successor: on DELTA PASS send Foreman D «LAND READY review/charge-evidence-rv <sha> (FF from LIVE <sha>)» + videos https://ctm-img.victoria-tntt.workers.dev/img/_review/charge-evidence/fold-755x1000.webm and …/ipad-1180x820.webm (if LIVE moved: merge origin/main, rebuild index.html/sw.js, re-run charge-smoke + charge-taps Fold/iPad + punish-reason). Do NOT wipe img/_review/punish-reason or charge-evidence (the lander wipes).
- STEP 3 (Foreman D 06:43Z, after landing, ONE branch review/charge-followups from the landed D4 sha): (b) table A punishments still missing — Mua chuộc → the bought servant is dismissed (deed needs the servant id), Ức hiếp → bồi bạc to the victim; BAL.charge keys, NPCs same rule (law 1); (c) Trình Hoàng hậu odds «+8 per total piece» (jaudit legacy road) → per-piece of the proven charge via BAL like accW; (a) LAW 6c REAL OBJECTS: every «tịch thu» item goes somewhere traceable — REUSE the existing item conservation code (jil: ilGone(p,e,how,{cause}), j92.js:310/325/383 «Cung Chính ti tang vật», jdress dropJ «Nội vụ phủ», jdh2 census) — 45 «tịch thu» sites in dev/build/j*.js: scan script + before/after table; (d) Fold visitor frame overlap → Foreman D routes to MAIN kit keeper (not this worker). BIG reviewer as child, Fold+iPad videos, LAND READY.
