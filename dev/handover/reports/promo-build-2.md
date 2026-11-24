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

## REVIEW (reviewer session_01D3E3NXxkVhTabMxB4z4ood, opus BIG, 24/11)
PRIORITY #1 CHECK ('truy phong' / 'Hoàng hậu đề cử' / 'lâm bệnh nguy kịch' / 'quốc tang'): OD 24/11 ~05:55Z, ~06:30Z, ~07:00Z real, ~07:15Z, ~07:55Z (truy phong «cũng phải thi»), ~08:30Z, ~09:35Z, ~09:50Z read verbatim | ledger 0 | claims promo-build-2 NYnT9a58 (archived) | main ac4790f0: jexam PROMO_SRC / exDirectUp, j13 illness STG 3, j32 over() | review/*: promo-build-rv 1cab34e1 (base, PASS, not yet live), promo-build-2 7accb31a (target) | design promo-redesign rows 9–10 + §3 + kỳ table L72/L96.

**REVIEW FAIL** — review/promo-build-2-rv de24c1ae5b97b5c55413c20a2d0ebfb61abf23a2 (= 7accb31a + merge of LIVE origin/main ac4790f0, index.html/sw.js rebuilt; no code change by me). One fault, a whole family (law 11), too wide for a reviewer fix.

### FAIL list (for the fixer)
1. **Truy phong is granted to people executed for a crime (law 6 real world, law 8 history; OD ~07:15Z truy phong conditions «no crime»).** My probe (her stats eligible, then `over(...)`): fate «Ban chết: tư thông bại lộ» → «truy tặng ngươi làm Quý nhân»; fate «Ban chết» → same. The Emperor who ordered her death cannot honour her the next line. Cause: the over() wrapper (jpromob end) runs pbTp for every non-alive fate; S.out is set only AFTER over() on the crime paths (j30.js:25 `over(...)` then `cold(...)`), so the `!S.out` guard misses them. NPC side is the same gap and wider: pbTpNpc gives truy phong to every rival with `alive===false`, and NPC executions just set `alive=false` with no cause (j22.js:22/44/52 xử trảm, j24.js:54, j30.js:25 «bị ban chết», j8 dieIf, j13 illness …) — so an executed NPC gets the «Truy phong: … truy tặng» news too. Fix the whole family: one death-cause mark for her AND every NPC (e.g. p.dieK = "crime" at each execution / ban chết / xử trảm / tư thông site, scan script listing every `alive=false` and every over() fate, before/after table), and pbTp refuses a crime death (her: also refuse fates matching ban chết / xử tử / xử trảm / tư thông / phế). Same rule for the deathbed is not needed (a condemned person is not «lâm bệnh»), but check cấm túc / lãnh cung there stays as now (pbDeath already skips confined; her lãnh cung = S.out, skipped ✔). Add tests: executed her → no truy phong row (or «không được truy phong» why line), executed NPC → no news.

### OWNER QUESTION for MAIN (not decided by me, law 16/17)
**Đăng cơ đại lễ vs quốc tang.** OD ~07:00Z real says «none during quốc tang» and design L96 sets 27 months of quốc tang after an Emperor's death; design L72 says «Tân đế đăng cơ: the first Tết of a new reign (game start or succession), once per reign». On a succession the first Tết always falls inside the 27 months → the đăng cơ đại lễ of a new reign is NEVER held (built behaviour: it passes uncelebrated and is marked seen). The OD rows do not settle which wins. Expert note (law 8): in Qing practice the new Emperor's consorts received their formal titles after the mourning (e.g. the Qianlong court, investitures in 1737 after Yongzheng's death in 1735) — i.e. «held when the mourning ends». Question for sếp: hold the đăng cơ đại lễ at the first festival after the mourning ends (one line in pbDlWhich: defer instead of mark seen), or skip it for a successor? Reviewer recommendation: defer.

### Checklist
1. **Hoàng hậu đề cử (law 1/2/3, kit, law 9)** ✔ — candidates = the NPC queen route's test with her nết cut (pbHhCut(S)), maxTo, pbRowsOk, once per life per queen key hh:<her key>; v.hh is the queen's regard whoever is queen (her own Ban thưởng moves it, j8.js:519) → same data both ways. Every option: same gain (nợ ân + thiện cảm +5) and same loss (passed-over oán +4); one candidate = gain-only (allowed, the card costs khắc). Kit Q sheet + kitRows + option cards (shots below). NPC route unchanged (her as queen → NPC route off, tested). **Co-op guest as queen: cannot nominate** (NPC state host-owned) — and the NPC queen route does not run for a guest seat either, so in that world nobody nominates: a law-1 gap, acceptable for now (co-op guest-queen is rare), follow-up item for D (intent through jcoopthinf).
2. **Deathbed + truy phong** — deathbed ✔: STG 3 «nguy kịch», full rows (exBase minus kỳ, + Đức; seat rows excluded and judged at the decree), once per life (counted only when examined — matches «a chance used only when tried», OK), exam exSimC (law 5: exam tier rises), seat full → no decree, HH oán; her + NPCs the same pbDeath; panel ends with «Tạ ân» ✔ (Fold + iPad). Nit: the decree step re-types exDirectUp's body (rank++, lastPromo, ex reset, exDrop, feedback) instead of calling it — keep one helper when the fixer touches it. Truy phong: full rows + record exam (OD ~07:55Z «truy phong cũng phải thi») ✔, title only, never past HQP ✔, lãnh cung/co-op none ✔ — **but FAIL 1** (crime deaths).
3. **Quốc tang** ✔ — Emperor's death / reign change → mt = A + BAL.promoR.mourn, no kỳ, no đại lễ, one log line. Probe: 6 lives × 48 months, no spurious mourning while the same Emperor reigns (pbEmpKey stable). Đăng cơ question above.
4. **Stranger's Sủng (law 11)** ✔ — scanned every number template in jpromob (pcWhy, pbGrant sung/th/hh why, pbHhMeOpen rows, pbDl lines, deathbed/truy phong news, capT) + jexam news + j25 next-rank (already `known?`): every NPC number is now behind pbKnown or her-only. No other promo place prints a stranger's Sủng.
5. **Law 4 / law 5** ✔ — new numbers all BAL.promoR.sp (meK, meMax, death.life, tp.on, cost.deathHhOan/meAff/mePassOan); one-core-guard PASS in all 3 head quickchecks (core gates). Law 5: exam tier and full rows rise with rank; HH cut per nết fixed (same as NPC route, earlier note stands).
6. **PERF** ✔ — quiet box (load 0.3–2.4, nothing else running), quickcheck alternating, 3 runs each (each = median of 3 lives new vs LIVE): head buổi 2402 / 1634 / 1711 ms (median 1711), base 1cab34e1 buổi 1738 / 1506 / 1728 (median 1728); render head 315/253/270 vs base 292/272/259; tab 608/525/487 vs 533/542/579. All 6 runs QUICKCHECK PASS. Head on par with base; the worker's FAILs were box load.
7. **Gates on de24c1ae** — promo-build 44/44 in 5 of 6 runs; 1 run BAD on the OLD base check «Hoàng hậu đề cử once + maxTo + new queen» (not granted — random world; the worker also saw 1/9; not a pb2 check; fixer: make that setup deterministic) · promo-exam 32/33, FAIL set = LIVE (old-save exam card check fails on LIVE ac4790f0 too) · promo-rules / promo-skip / promo-next-rank FAIL sets = LIVE (servants roll + 844x390 reveal; grace-seat + strike-back; card names "") · kit-promo-hook Fold + iPad all ok · coop-e2e 142/142 · two-way-oldsave ok (LIVE save → head, no errors) · quickcheck PASS ×3 (old save ok) · probes: truy phong by fate, spurious mourning.
8. **Shots** (Fold 755x1000 + iPad 1180x820, looked at 3×, kept outside git, not uploaded): nominate sheet — kit sheet, three equal option cards, rows «lên Tần · được lòng Hoàng hậu 67, cần 60», iPad scrolls inside with «Kéo xuống», no overflow/cut text; deathbed — kit «Báo» panel, rows Bệnh / Điều kiện / Nội vụ phủ xét / Kết quả, closes on «Tạ ân», cổ trang, no %. Picture = default decree art (ART REQUEST already filed by the worker).

~95% xong / ~85% chơi được

## FIX r1 (worker session_01D3E3NYmiFCzMBQ7S9iptKN, opus, 24/11)
PRIORITY #1 CHECK ('truy phong' / 'ban chết' / 'death cause'): OD 24/11 ~05:55Z, ~07:15Z («no crime»), ~07:55Z («truy phong cũng phải thi») read verbatim | ledger 0 | claims promo-build-2 NYnT9a58 + rv NXxkVhTa (FAIL) | main 178cac37: no death-cause mark exists (jmort note() keeps a ledger cause S.mort.dl.c = lifespan/plot/accident only, S.mort.cause = her why text; reused as text, not as the mark) | review/* promo-build-2-rv de24c1ae (base).

### What changed
- **One death-cause mark `p.dieK`** (j8.js next to deathSentence): `dieMk(p, kind|text)` sets it once (first mark wins); `dieKOf(text)` reads a death line. Kinds: crime · disgrace · ill · birth · age · murder · tuan · other; not-a-death: nun · fled · left · wed · gone.
- **pbTp** (jpromob) refuses every kind outside `BAL.promoR.sp.tp.okK` = [ill, birth, age, murder, tuan, other]: crime, disgrace, nun/fled/left, and an **unmarked** death (no record → no honour; law 6). Her: the over() wrapper marks S.dieK from h + fate when no site marked it first (deathSentence marks «crime» before die()). The «Kiếp này» panel then shows the reason in the same kit row: «Ngươi chết vì mang tội, Hoàng thượng không truy phong người đã bị xử.» / «… chết trong ô danh, Nội vụ phủ không xét truy phong.» NPC: no news.
- Law 8 notes: suicide and a secret abortion that hides a crime count as disgrace (in Qing practice a palace woman's suicide was itself an offence); tuẫn táng (j99succ, the Thái phi she forces) = «tuan», allowed (Ming consorts who followed the Emperor in death were given posthumous titles).

### Scan (law 11): every `alive=false` site (dev/build, script /home/user/wt/pb2fix-scratch/scan.py) — before: no cause on any site
| site | who | after: mark |
|---|---|---|
| j8 deathSentence (NPC ban chết; her → die) | consort / her | crime |
| j8 dieIf(p,why) (poison, cold, harm) | consort | dieKOf(why) → murder / ill |
| j8:393, jmort:171/172 childbirth | consort | birth |
| j8:479 queen illness, j13:21, jbal2:30, jmort:129 | consort | ill |
| jmort kill() (lifespan / accident / mortKill why) | consort, men | dieKOf(why) (none → age) |
| jpq:73 ban chết vì mưu hại (via mortKill) | consort | crime |
| j30:25 rival tư thông bị ban chết | consort | crime |
| j4:125 Hoàng hậu poisoned | consort | murder |
| j14:44 wasting in lãnh cung | consort | disgrace |
| jagacts3 p3Nun, jroute:274 nun, jgenpc:127 leave | consort | nun / left |
| jroute:272 fled | consort | fled |
| j99succ:115 tuẫn táng | Thái phi | tuan |
| j22:22/44/52×2, j24:54, j42:558/603, j95:442, j96:225, jagstaff:141, jmen:207, jroute:360/368/380 (lov) | men (xử trảm / đày / chết trong ngục) | crime |
| j1 kidDie, jroute:361/368/380, j7:88 | kids | dieKOf(why) / gone / wed |
| not marked (not a death): j54 h54Hide (temporary hide), jcoopask/jcoopworld (copy of the host's alive flag on the guest; truy phong runs on the host only), jroute:233 (object literal), jbook (animation var) | — | — |
Her over() fates: every die()/over() line (scan in the report test «dieKOf on every her death line», 20 lines) → crime: ban chết / tru di / khi quân / Thận hình ti / lụa trắng / rượu độc; disgrace: phá thai / giả chết / lãnh cung; birth; murder (Trúng độc, bị hại, đẩy xuống giếng); ill. Servant (isSrv) and lãnh cung (S.out) deaths stay excluded as before.

| probe | before (de24c1ae) | after |
|---|---|---|
| her deathSentence «tư thông», stats eligible | «truy tặng ngươi làm Quý nhân» | no title; row «chết vì mang tội …» |
| her over(…,"Ban chết: tư thông bại lộ") (j30) | truy tặng | none |
| her die("Uống thuốc phá thai …") | truy tặng | none (disgrace) |
| her illness death | truy tặng | truy tặng (unchanged) |
| NPC deathSentence | «Truy phong: … truy tặng» news | no news, pbTp 0 |
| NPC poisoned (dieIf) | news | news (murder victim) |
| NPC alive=false with no mark | news | none |

### Tests (head sha below)
Head **f9cdc020054335caa3007fd8f68c1c4fde73c3a0** on review/promo-build-2-rv (= de24c1ae + fix 1a538284 + merges of LIVE 178cac37 and d521656c).
| gate | result |
|---|---|
| promo-build | 49/49 ×4 runs (44 old + 5 new fix checks); the old flaky «Hoàng hậu đề cử once» check passed all 4 runs (not reworked: it was not in this brief) |
| promo-exam | 32/32 = LIVE 32/32 |
| promo-rules | 26/28, FAIL set = LIVE (NPC servants roll; 844x390 reveal) |
| promo-skip | FAIL set = LIVE (grace-seat, strike-back) |
| promo-next-rank | BAD set = LIVE (card names "") |
| kit-promo-hook | Fold 755x1000 + iPad 1180x820 PASS |
| coop-e2e | 142/142 on head f9cdc020 (LIVE d521656c the same box: 142/142). Before the d521656c merge both head and LIVE 178cac37 failed «#next enabled» (the kszFootUp driver stall that d521656c fixes) |
| two-way-oldsave | LIVE save → head: ok, no errors |
| one-core-guard | PASS ×3 |
| quickcheck | PASS ×3 after merging 178cac37 + PASS on f9cdc020 (render 267/316, tab 477/491, buổi 1918/1869 ms new/live; core gates PASS; old save ok). One earlier run reported «G4 80-dialog-fixed», but its log says «all pass» and the next 3 runs passed — it ran next to my shots browser |
| mrfoot-scan | 59/59, stale 0 |

Shots (Fold 755x1000 + iPad 1180x820 @2, looked at 3×, outside git: /home/user/wt/pb2fix-shots): «Kiếp này» end panel, executed → kit section «Truy phong» with the reason row; illness → «truy tặng … Quý nhân». Kit section + kitRows only, the button at the bottom, no overflow or cut text. (The voice layer prints «Ngươi» as «Ta» in her end panel, the same as the existing truy tặng line.)
Not built (per brief): đăng cơ in quốc tang (owner Q via MAIN), co-op guest-queen nominate.

~96% xong / ~90% chơi được

## REVIEW r2 (reviewer session_01D3E3NZnFXh5e2NqrPJTpg8, opus BIG, 24/11)
PRIORITY #1 CHECK ('promo-build-2 review r2' / 'truy phong' / 'dieK'): OD 24/11 ~05:55Z, ~07:15Z («no crime»), ~07:55Z read via the r1 review + fix rows | ledger 0 | claims rv r2 = this session | main c6c3ca76 (net-build-rv landed; no death mark there) | review/* promo-build-2-rv f9cdc020 (target), promo-build-rv 1cab34e1 (ancestor ✔, not yet on main) | archive 0.

**VERDICT: REVIEW PASS — LAND READY review/promo-build-2-rv 70571e8a763fb604b7f1ef7e7dcba60db06aac3b** (lands after / together with promo-build-rv 1cab34e1, which is its ancestor; origin/main c6c3ca76 is its ancestor too).

### My changes on the branch
1. 44c36b5e **law 1 two-way (small fix):** j99succ «Ép Thái phi tuẫn táng» marked the NPC `tuan` (truy phong allowed) while the exact mirror, her own j3 «Tân Thái hậu xét lại chuyện cũ … ban lụa trắng, ép ngươi tuẫn táng» reads `crime` (no truy phong). Same act both ways → j99succ now `crime` too (both are retribution for old deeds dressed as tuẫn táng; the new Emperor is the punisher's son, law 6). In play the NPC was never examined (the succession life ends right after), so no visible change; `tuan` stays a valid allowed kind.
2. 25891922 merge LIVE origin/main c6c3ca76 (net-build-rv): conflicts j30.js + jroute.js = main's netTh lines + the fix's dieMk marks kept (j30 1/1, jroute 8/8 marks); index.html/sw.js rebuilt.
3. 0fd07e7a + 70571e8a merge LIVE origin/main 15b5e1ff (robot-coop-fix-1: tests + coop worker only, clean), build line. Rescan after both merges: no new unmarked death site.

### (2) the fix — own checks
- **Scan of every `alive=false` (my own regex over dev/build/j*.js, after the main merge):** every death site carries dieMk / deathSentence / kidDie / kill / dieIf; the rest are not deaths (j54 temporary hide, jbook animation vars, jcoopask/jcoopworld guest copies, jrank local var, jpq/jcoopworld catch fallbacks → unmarked = refused, safe). **Natural play probe:** 8 lives × 462 months, every dead rival marked (ill 138 / age 74 / left 43), **0 unmarked**; truy phong granted only to age/ill.
- **Her lines (die/over/deathSentence, 67 literal lines + kill/kcDie whys + ACC accidents) through dieKOf:** every ban chết / tru di / Thận hình ti / lụa trắng / tư thông → crime; phá thai / giả chết / lãnh cung → disgrace; living exits (ban hôn, Vương gia che chở, Thái phi, Thái hậu, xuất gia…) pass alive=true or match overAlive → never examined. Nits (no outcome change, both kinds allowed): «ngã xuống hồ Thái Dịch» reads `ill` («Dịch»), «cảm hàn» reads `other`.
- pbTp refuses every kind outside BAL.promoR.sp.tp.okK (crime / disgrace / nun / fled / left / wed / gone / unmarked) ✔ · «Kiếp này» reason in the same kit section + kitRows row (law 9) ✔, words cổ trang, no number, no % (law 7) ✔ · executed NPC → no news (test + probe) ✔ · law 1: one pbTp/pbTpBar for her and NPCs, mirror fixed above ✔ · law 4: okK in BAL, no typed number in the new code, one-core-guard PASS ×3 ✔.

### (1)+(3) gates (run one at a time, this box, head before/after the main merge)
| gate | result |
|---|---|
| quickcheck f9cdc020 | PASS · render 246/283, tab 520/536, buổi 2190/1597 ms new/live (median of 3; on par within the box swing seen in r1), old save ok, core gates PASS |
| quickcheck 25891922 (after merging c6c3ca76) | 1st run FAIL perf buổi 3929/1640 (single runs new 3929/1620/4946 vs live 2693/1640/1336 = box swing); perf re-measured with 7 lives each: PASS, buổi 1482/1428, render 246/238, tab 522/528 (on par); standard rerun PASS (buổi 1331/1665) |
| quickcheck 70571e8a (final, after merging 15b5e1ff) | PASS · render 211/251, tab 395/505, buổi 1385/1528 ms, old save ok, core gates PASS |
| promo-build | 48/48 + no errors ×4 before the merge; after the merge 3 of 4 runs 48/48, 1 run BAD on the OLD base check «kitPromoHook ready in kỳ» (got null: the check ticks up to 40 unseeded months and kitPromoHook returns null if she dies / leaves meanwhile — random world, not this fix; test-determinism nit for D, same family as r1's flaky «HH đề cử once») |
| promo-exam | 32/33, FAIL set = LIVE d521656c (old-save exam card) |
| promo-rules | 27/29, FAIL set = LIVE (NPC servants roll; 844x390 reveal) |
| promo-skip | FAIL set = LIVE (grace-seat, strike-back) |
| promo-next-rank | BAD set = LIVE (card names "") |
| kit-promo-hook | Fold 755x1000 8/8 · iPad 1180x820 8/8 |
| coop-e2e | 142/142 |
| two-way-oldsave | LIVE save → head: ok, 40 weeks, no errors |
| one-core-guard | PASS ×3 |
Shots (Fold 755x1000 + iPad 1180x820, looked at, scratch only, not uploaded): «Kiếp này» executed → kit section «Truy phong» row «… chết vì mang tội, Hoàng thượng không truy phong người đã bị xử.»; illness → «… truy tặng … làm Quý nhân.»; button «Chuyển kiếp» at the bottom, no overflow, no cut text. (Voice layer prints «Ta» in her own end panel, the same as the existing truy tặng line.)

### Still open (not this brief)
Owner question đăng cơ đại lễ vs quốc tang (via MAIN) · co-op guest-queen nominate (follow-up) · two flaky base checks in promo-build (unseeded random world).

~96% xong / ~90% chơi được
