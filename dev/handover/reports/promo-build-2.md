# promo-build-2 — follow-ups of promo-build (worker session_01D3E3NYnT9a58st5Vj9RX4B, Foreman D)
PRIORITY #1 CHECK ('Hoàng hậu đề cử' / 'truy phong' / 'lâm bệnh nguy kịch' / 'quốc tang'): OD 24/11 ~05:55Z, ~06:30Z, ~07:00Z real, ~08:30Z read verbatim | ledger 0 | claims: promo-build (DONE, rv PASS 1cab34e1) | main fd85907a: none (jexam PROMO_SRC, j13.js:21 illness death STG 3 «nguy kịch», exDirectUp, j92 wdTang 3-month dress mourning — not reused for kỳ: own BAL.promoR.mourn) | review/*: promo-build-rv 1cab34e1 = base; promo-hist ed47e570 (deathbed as direct decree, superseded by design row 9 — not taken). Reused: pbGrant/pbCost/pbRowsOk/pbHhCut (hh route), exSimC (record exam), exBase/pbDlRows (full rows), q72 nợ ân ledger, affAdd/oanAdd, Q modal + kitRows (kit), deal() act card, over() end panel.

## Branch
review/promo-build-2 — base review/promo-build-rv 1cab34e1 (not yet on origin/main fd85907a). Head 7accb31a62084e7e7f360c1ca2111871daf305df.

## What was built (dev/build/jpromob.js new section at the end; numbers BAL.promoR in jbal2)
1. **LAW 1 — «Hoàng hậu đề cử» by HER** (`pbHhMeList/pbHhMeOpen/pbHhMeDo/pbHhMeCard`). When she is the Hoàng hậu, a Hành sự act card «Hoàng hậu đề cử» (k = BAL.promoR.sp.meK) opens a kit option sheet (Q modal + kitRows + one option per candidate + «Thôi» = ✕).
   - Candidates = exactly the NPC queen route's test with her as the queen: Hoàng hậu quý (p.hh) ≥ pbHhCut(her nết, else def), target ≤ sp.hh.maxTo, special-exam rows met (pbRowsOk), not confined, no special exam open, not a kỳ month when the whole road is met, once per life per Hoàng hậu (key hh:<her key>). Top sp.meMax shown.
   - Every option = the SAME gain and loss (laws 2/3): «được: X nợ ngươi một ân (cost.hhOwe, j72 ledger, the mirror of the NPC route's hhOwe), nàng quý ngươi hơn (+cost.meAff)» · «mất: N người không được đề cử oán ngươi +cost.mePassOan». The nominee gets pbGrant «hh» (her NPC exam in jexam promoteP as every special); the NPC route's own loss (others oán the nominee) stays.
   - NPC side unchanged (pbTry still skips q===S). Co-op: offered on solo / host only (NPC state is the host's) — guest-queen cannot nominate yet (open point 2).
2. **DEATHBED (design row 9)** `pbDeath(p)`: illness at «nguy kịch» (j13 STG 3) → once per life (p.pbs.dth, sp.death.life). FULL condition set (OD ~05:55Z/~06:30Z): pbFullRows = every promoReqP row but the kỳ (+ Đức ≥ BAL.promoR.dl.duc[target], the đại lễ row). Short → no exam, her log says the first missing row (once per illness), the chance is NOT used. Met → Nội vụ phủ exam on her record (exSimC, she is too ill to play); pass + free seat → decree (rank +1, p.ex reset) + loss: the Hoàng hậu oán (cost.deathHhOan); pass + full seat → no decree; fail → chance used. Her: kit panel «Xét tấn phong bên giường bệnh» (Bệnh / Điều kiện / Nội vụ phủ xét / Kết quả rows) ending with «Tạ ân»; NPC: news line. Her + every NPC in pbMonth (NPCs host only).
3. **TRUY PHONG (design row 10)** `pbTp(p)`: at death, same full rows + the record exam → title only p.pbTp = rank+1 (never past Hoàng quý phi; lãnh cung / coop seats none). Her: over() wrapper adds a kit section «Truy phong» to the «Kiếp này» panel (title, or why not). NPC: the month after death, news «Truy phong: Nội vụ phủ xét công đức lúc sinh thời, truy tặng X làm Phi.» (old saves: dead already present are marked done, no burst).
4. **QUỐC TANG on the Emperor's death** (`pbEmpKey` in pbKyUpdate): the reign key (era|name, or "dead" while S.empDead / emp.dead / succession) changing from a living Emperor → S.pb.mt = max(mt, A + BAL.promoR.mourn) — the same mourning the Thái hậu's death starts: no kỳ (pbKyStep) and no đại lễ (pbDlWhich «tang» line, the reviewer's fix). One log line when a mourning starts: «Quốc tang: trong cung không mở kỳ sắc phong, không có đại lễ cho đến hết hạn tang (còn N tháng).»
5. **Nit (greeting / knowledge rule), whole group (law 11):** a stranger's numbers never show — pcWhy «(Sủng N)» and the three pbGrant NPC why-lines (favour Sủng, Thái hậu quý, Hoàng hậu quý) print the number only when pbKnown(p) (knows + kitKnownName, as jkrel).
   | place | before | after |
   |---|---|---|
   | Phân cung why (pcWhy) | «Quý nhân ??? … (Sủng 41)» | no number for a stranger |
   | pbGrant sung / th / hh news | «(Sủng 59; …, cần 59)» for anyone | number + cut only when known |

BAL added (jbal2 promoR.sp): meK 1, meMax 4, death {life:1}, tp {on:1}, cost.deathHhOan 10, meAff 5, mePassOan 4; mourn comment now covers the Emperor.

## Tests
| gate | result |
|---|---|
| dev/test/promo-build.js (31 + 13 new pb2: queen list + card, equal options, nominate → exam + owe + passed-over oán + once, NPC queen route off when she is queen, deathbed decree + panel, short → why + chance kept, fail uses chance, NPC parity, truy phong her end panel, NPC news + never past HQP, Emperor quốc tang no kỳ / no đại lễ, stranger's Sủng hidden) | 44/44 in 8 of 9 runs; 1 run had 1 BAD (seen before the last fixes, could not reproduce in the next 5 runs; random world — likely a seat-count draw in one setup) |
| one-core-guard ×3 | PASS ×3 (inlineNow 3112 ≤ baseline; first run caught the card khắc k:1 → moved to BAL.promoR.sp.meK) |
| promo-exam | 32/32 = LIVE |
| promo-rules | 26/28; FAIL set = LIVE (NPC servants roll; 844x390 reveal) |
| promo-skip | FAIL set = LIVE (grace-seat, strike-back) |
| promo-next-rank | BAD set = LIVE (card names "") |
| kit-promo-hook | 8/8 Fold + 8/8 iPad |
| coop-e2e | 142/142 |
| quickcheck (×3 on the head; build / core gates / open / old save PASS every time) | perf buổi FAIL ×3: new/live 6111/2674, 3656/1604, 3291/1295 (render 328/247, 299/283, 321/282; tab ~ equal). Base 1cab34e1 on the same box: PASS 1892/4000 (LIVE itself swung 1259–7134). Checked it is not this branch: (a) in-page, 24 months monthTick+deal with the promo-build-2 hooks on vs stubbed: 744/1447 vs 1229/1003 ms (no difference); (b) the quickcheck BUOI loop run 3× each on base 1cab34e1 and this head, 4 buổi per life: same modal counts and times (first buổi ~4.4–5.2 s on both = 8 origin-story dialogs × the loop's waits; later buổi 0.5–1.9 s on both). The swing is which random life/dialogs the run draws. Reviewer: please rerun quickcheck on a quiet box. |

## Shots (Fold 755x1000 + iPad 1180x820 @2, host mode, looked at 3×) → CDN img/_review/promo-build-2/ (755x1000-hh-decu, 1180x820-hh-decu, 755x1000-deathbed, 1180x820-deathbed); dev/test/promo-build-shots.js has the 2 new scenes.
Fixed after looking: (a) «ngươi quý nàng 52» was auto-linked into «Ta → nàng: thiện cảm 52» (wrong: the number is the nominee's standing with the Hoàng hậu) → «được lòng Hoàng hậu 52, cần 45»; (b) «thiện cảm với ngươi +5» became «thiện cảm thiện cảm +5» → «nàng quý ngươi hơn (+5)»; (c) the deathbed panel lost its bottom button on iPad (the kit turns «Đã rõ» into the ✕) → always «Tạ ân»; (d) deathbed result wording past the auto-link. No overflow, no cut text; the iPad sheet scrolls inside (kit «Kéo xuống»).
**ART REQUEST (Foreman C), not blocking:** both panels show the default decree picture (scroll + hairpin); a sickbed picture would fit the deathbed panel better.

## Open points for Foreman D
1. Đăng cơ đại lễ vs quốc tang: the first Tết of a new reign falls inside the 27-month mourning of the old Emperor → it passes uncelebrated (the reviewer's «none during quốc tang» rule) — so a successor never gets the đăng cơ đại lễ. If sếp wants it held after the mourning, pbDlWhich must defer instead of marking it seen (one line).
2. Co-op guest as Hoàng hậu cannot nominate (NPC state is host-owned); needs an intent through jcoopthinf if wanted.
3. Emperor-death mourning in co-op only applies while her life continues under the new Emperor (S.year/S.turn are per life, so a NEW life does not inherit the mourning of the reign change it joins).
4. Deathbed counts the life chance only when examined (conditions short → not used, she can be examined in a later illness). Design said «once per life»; kept that for the exam itself.

## Handover
Done; nothing half-built. Worktree /home/user/wt/pb2 (delete after review). Shots outside git (/home/user/wt/pb2-shots).

~95% xong / ~90% chơi được
