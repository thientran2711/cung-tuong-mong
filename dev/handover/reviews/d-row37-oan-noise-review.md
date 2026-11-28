# BIG REVIEW — review/d-row37-oan-noise e6e59ac0 (Foreman D ROOT) — 28/11
Reviewer session_01964izGB6a4dWK9mErbhY5p (opus). START_CTX ~8 % (estimate).
PRIORITY #1 CHECK: brief d-row37-oan-noise-rv.md (claims D-ROW37-OAN-NOISE worker session_01964izEtRCxwJe9JL9s4S8c) | base review/lc34-3b-r2-rv184 1a6a1aed (3b at RV-184), newer 3b head 2d9f07c7 | report dev/handover/reports/d-row37-oan-noise.md | git grep origin/main + review/*: oán-pace (joanpace opDn/opUp) only on the 3b line; qc-noise in lr-rules-r2; no other rv on this branch.
KIT CHECK: no kit part added or changed. The work reuses the existing card option x-line (dilLine), balSg, the jty map chip (kitChips) and the kit card stage. No private CSS. kit-std-scan not run separately: the quickcheck run had it as hook 96, and it timed out with the run (see Gates).
Laws read: 18 LAWS (START_CORE) + START_WORKER + START_REVIEWER.

## VERDICT: **PASS 19dc854d** (review/d-row37-oan-noise-rv), after reviewer fixes (2 commits on top of e6e59ac0)
19dc854d = e6e59ac0 + e6eb7e27 (rv fixes) + merge of the newer 3b head 2d9f07c7. Its ancestors include origin/main a96564ad, review/lr-rules caa95310 and review/lc34-3b-r2-rv184 2d9f07c7.

## Claims checked
| # | claim | result |
|---|---|---|
| 1 | ghét leak: 13 direct `v.rel -= N` (j2/j4/j7/j8/jagacts3) skipped the pace door → affAdd + BAL.ghetHit; previews print what lands (opDnSee); scan 13 → 0 | **Partly true. The family was NOT complete.** All 13 sites are right: each one is now `affAdd(v,S,-BAL.ghetHit.x)` (jagacts3 uses BAL.ag.par3.tell), and opDnSee is read-only with the same fold, cap and stat-pace as opDn. **But 5 more falls toward her skipped the ghét pace (opDn) through `spAdd(v,"rel",-N)`**, which gives stat-pace only: j7:27 poison «Nhờ Thái hậu» (BAL.cv.poison.rel −15), j7:34 spy «Tìm kẻ tung tin» (BAL.cv.spy.rel −10), j7:108 comet «Đổ thêm dầu» (comet.thu −20), j7:146 cane «Thêm một lời buộc tội» (cane.thu −30), and jreign:310 q72Rel for the fallen Lý (n<0). The scan only looked at `.rel -=`. **Fixed by the reviewer (law 11)**, see the table below. |
| 1b | robot ghét/yr LIVE 842 · 3b 560 · branch 486; oán unchanged vs 3b | **Not re-run** (8 lives × 12 months is too heavy for this box next to the gates). The report's table agrees with itself: oán door 304 → 313 and all 245 → 249 (same), ghét all 560 → 486. The 5 extra sites only take more ghét through the pace, so the true branch number is ≤ 486. |
| 2 | trung y card once per buổi; Danh still charged per place (law 3) | **True.** The new branch in jty goTo runs only when S.tyWent = this buổi (set only by «Vẫn đi»). It calls the original goTo, then tyCharge(k). tyCharge keys on tyPaid = wk.buổi.place, so each new place is charged once and logged. Nothing is lost and nothing is charged twice; the map chip still shows the cost. An old save has no tyWent, so the card asks. |
| 2b | repeats 9.3 → 6.7 / day | Not re-run (robot). It agrees with the code change: the card's choice line no longer repeats. |
| 3 | BAL.ghetHit.favour: the build reads the BAL key | **True.** j8 rivalsTurn uses `affAdd(v,S,-BAL.ghetHit.favour)` ×2, no typed number. The value 1 is left for D/MAIN. The `roll(33)` / `roll(50)` beside it were typed before this branch (not touched). |

### Whole family (law 11) — dev/measure/ghet-door-scan.py (rv: now also counts `spAdd(x,"rel",<negative literal or BAL value>)`)
| build | FALL outside affAdd | RAISE-OAN outside oanAdd |
|---|---|---|
| 1a6a1aed (base) | 17 (13 `rel-=` + 4 spAdd) | 0 |
| e6e59ac0 (worker) | **4** (j7:27, 34, 108, 146) + jreign:310 var (n<0 possible) | 0 |
| 19dc854d (rv) | **0**; jreign:310 `sp-var` now has a guard: a fall uses affAdd, a rise keeps spAdd | 0 |
Previews of the 4 j7 sites now print `-opDnSee(v,S,…)`, the amount that really lands (law 4).

## Reviewer fixes (on review/d-row37-oan-noise-rv)
- e6eb7e27: (a) the 5 falls above go through the door, and their previews print what lands; (b) the scan covers spAdd; (c) **d-row37 test B was flaky.** The setup `if(w.y)w.y={k:w.y.k,from:'base'}` kept her dressed, so B0–B5 failed on my first run while the box was loaded. Now `w.y=null`, and 3 runs in a row are ALL PASS 13. (d) **The worker branch did not rebuild root index.html / sw.js**: grep opDnSee / ghetHit in index.html = 0, so the site would ship without the fix. Now rebuilt.
- 19dc854d: merge 3b fix 2d9f07c7. assemble.py had lost jkring-item.js and rank score.js in the 1a6a1aed union. That loss is where the undef-scan **CTM_RANK** hit came from: it was already there on 1a6a1aed (confirmed: the same 3 CTM_RANK lines on e6eb7e27) and it is gone after the merge (undef-scan PASS, 373 names). Only index.html / sw.js conflicted (built files), so I rebuilt them.
- **Build note:** build_site.sh cannot reach the CDN host ctm-img.victoria-tntt.workers.dev here (proxy 403; it stops at assets.py). index.html comes from build_site.sh up to that step. It matches the committed file apart from the CTM_BI build line (quickcheck norm compare: same). sw.js V was recomputed by hand with the same formula (hash of index.html + manifest + assets.json + audio/*.json), with the PRE image list kept from the committed sw.js. assets.json is unchanged. **The coordinator should re-run build_site.sh where the CDN is reachable before go-live; the result should only refresh the PRE list.**

## Gates (on 19dc854d unless said)
| gate | result |
|---|---|
| d-row37 | ALL PASS 13 (×3 after the B fix; e6e59ac0 as given: 1 run FAIL 4 (flaky B), 1 run ALL PASS 13) |
| oan-pace | ALL PASS 33 |
| ghet-door-scan | 0 FALL · 0 RAISE-OAN (exit 0) |
| one-core guard + bind | PASS · PASS (1677 prints, 0 mismatches) |
| undef-scan | PASS on 19dc854d. CTM_RANK FAIL on e6eb7e27/1a6a1aed = the 3b assemble loss, already there before this branch, fixed by 2d9f07c7 |
| quickcheck part 1 (build) | cannot run (CDN host blocked, see build note). Done by hand: built index.html = committed |
| coregates (run on e6eb7e27, quickcheck without the build step; the run hit its 25-min box limit in the button crawl) | G1 all PASS (guard, bind, text, textrule, khắc, c6cancel) · G2 rules-one-source ok (old save ok) · G4: webkit-syntax, webkit-boot, odds-cap, coop-one-world, mk-layer, npc-purpose, dead-card PASS; manifest-guard = CDN 403 (env) |
| G4 FAIL hooks: base 1a6a1aed vs this branch, same box, same server | look-dedupe 6 / 6 · press-keep 10 / 9 · q-softlock 8 / 8 · next-dead 4 / 4 · dialog-fixed (#80 event picture) 2 / 2. **The same or fewer on the branch, so all were there before** (most are `row text covered: DIV#kveil.kscrv`: the LC35 screen veil waits for CDN pictures that cannot load here) |
| quickcheck part 2 (by hand: dev/tools/quickcheck.js 19dc854d vs LIVE a96564ad) | **PASS** · open 2282 ms, 0 errors · **old save from LIVE loads + plays a buổi, 0 errors** · perf medians new/live: render 372/317, tab 696/741, buổi 2330/3872, tasks>200 66/52 (in limits) |
| Shots (Fold 755x1000 + iPad 1180x820, scratch only, looked at) | Sổ ghi tab: clean on both, no overflow, 0 page errors. Preview: rival quarrel card on both. The option previews print the paced amount (e.g. «Lư Thi Hàm thù -12» / «-10» where BAL side = 15), as A4 shows. Pictures are «Đang thỉnh tranh…» only because the CDN is blocked |
| coop-e2e (soft) | not run (no co-op code touched) |

## Trial merges (19dc854d)
- review/lr-rules caa95310: ancestor, clean (FF).
- latest 3b review/lc34-3b-r2-rv184 2d9f07c7: merged in (19dc854d), only built files.
- review/lr-rules-r3 aecbc267 and review/lr-rules-tip 850441e3: **conflicts in dev/build/j7.js + dev/build/jbal2.js** (+ built files). j7:186 rvmusk «Cảnh báo / Tố lên Hoàng thượng»: keep OUR «Cảnh báo» line (affAdd + opDnSee) and THEIR «Tố lên» line (`fall(a,…,null,"nang")`, punish-tier). jbal2: two blocks appended at the same spot (BAL.ghetHit vs PUNISH-TIER), keep both. Then re-run assemble, ghet-door-scan, d-row37 and one-core.

## Laws
1 two-way: affAdd is the same door the NPC↔NPC falls use. OK · 3 gain–loss: no option lost its cost (trung y still charges each place). OK · 4 one core: BAL.ghetHit holds every size; previews print what lands. OK (old typed numbers next to these lines, NOT touched by this branch, are listed for D/MAIN: j7 «thiện cảm +25/+15/+30», spAdd rises 25/40/20/5/30, ghenUp 10, fx hh:12, poisongift danh −6, j8 roll(33)/roll(50)) · 5 n/a · 6 OK · 7 wording: no new words. When the day cap is used up a preview reads «thù 0», which is honest · 9 kit: no new UI · 11 whole family: completed by the reviewer (17 → 0).

## Notes for Foreman D
- The text hygiene the worker found (choice lines with the card body glued in brackets, j3 logChoice) is real and still open. It belongs to the KK / qc-noise owner.
- Shots were deleted from scratch with this verdict; none are in git.

## R3 restack (Foreman D order 28/11 09:47Z): **PASS f867bb26** = review/d-row37-oan-noise-r3 (FF from review/lr-rules-r3 aecbc267, which contains LIVE c03d6ee7 + 3b fix 2d9f07c7)
- Merge 19dc854d → aecbc267. Hand hunks: j7.js rvmusk: «Cảnh báo» keeps D-ROW37 (affAdd BAL.ghetHit.warn + opDnSee) and «Tố lên Hoàng thượng» keeps punish-tier `fall(a,…,null,"nang")`; jbal2.js: the PUNISH-TIER block and the BAL.ghetHit block are both kept. index.html rebuilt; it matches the committed file apart from the CTM_BI build line. sw.js V by hand (CDN host blocked), PRE kept, assets.json unchanged.
- Gates on f867bb26: d-row37 ALL PASS 13 · oan-pace ALL PASS 33 · ghet-door-scan 0 FALL / 0 RAISE-OAN (no new direct falls came in from r3) · one-core guard + bind PASS · undef-scan PASS (378 names).
- quickcheck part 2 vs LIVE c03d6ee7: open 2361 ms, 0 errors, **old save from LIVE ok, plays a buổi**. **Perf gate FAIL by a hair:** tasks>200 in a day life 74/73/76 > ceiling 72; worst task median 3967 vs limit 3930. **The same gate on bare aecbc267 (no D-ROW37) also FAILs:** 73 > 72, one run 4180 ms worst task. The live runs on this box swing 30–68 tasks. So this is box load and/or the r3 bundle, not this branch (its delta is 9 logic lines + one BAL table). The perf gate should be re-run on a quiet box at landing.
