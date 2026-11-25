# REVIEW review/net-ghen — RV4 (BIG tier, Foreman D) — 25/11 ~14:20Z

PRIORITY #1 CHECK: OD 25/11 ~05:45Z + net-build rows (owner worklist #9) | main 9f72524b j1 ghenUp, j8:472, j28 danger()/ghenCool, jaudit §5 pvOan/pvQuy | review/net-thresholds 96c2859e (PASS, base) → review/net-ghen 6d7d2da9 | claims Foreman D (W4 session_01D3E3NYQa21C7i6ghmbEahF, W5 session_01D3E3NX8Jh4APbxeSvZnnBd). Rules read: START_CORE (18 laws), START_WORKER, START_REVIEWER, worklist-9-26.md SEAT W4 + W5.
Reviewer session: session_01D3E3NYJGFXzYfn1ZGJhCE8 (START_CTX ~6 % of 1M).

## VERDICT: PASS de69f206 (review/net-ghen-r1 = 6d7d2da9 + one reviewer fix; FF-able: origin/main 9f72524b → 96c2859e → 6d7d2da9 → de69f206)

### Reviewer fix (law 11 whole family / law 6 real cause) — de69f206
- jration.js:188 (tribute cosmetics with a bestowal): every OTHER consort's `v.ghen` (= jealousy OF HER) was raised by a DIRECT write `v.ghen=cl(v.ghen+T.ghen)` whenever ANY consort p got a tribute — the same fault family W4 fixed in ghenUp («another consort caused it, it piled onto her»), but it bypassed ghenUp so the W4 ledger never saw it. Now `ghenUp(v,T.ghen,"thấy <p> được Hoàng thượng ban cống phẩm",p)`: p = her → jealousy of her + Chạnh lòng (as before + the feeling); p = an NPC → oán toward p × BAL.net.ghenOanK. Scan after: no other direct raise of an NPC's `v.ghen` left (`grep '\.ghen\s*=' dev/build/j*.js`: only j1 ghenUp itself, jshelf t===S (her own cause, writes direct — see N2), co-op row copies, fades).
- Site rebuilt (index.html + sw.js).

### Gates (all on this box; quickcheck ALONE)
| gate | 6d7d2da9 | de69f206 |
|---|---|---|
| net-build | 203/203 PASS | 203/203 PASS |
| one-core guard / bind / text / text-rule | PASS ×4 | PASS ×4 |
| relshow-scan (oán WIRED/NEG/RAW) | 63 / 13 / 25 (matches W4 table) | same |
| relshow-rt | PASS | PASS (NPC-caused: her ghen same, oán NPC→NPC +n×.5) |
| quickcheck ALONE | PASS · open 2492 · old save ok · render 347/309 · tab 766/735 · buổi 2046/1695 | PASS · open 2033 · old save ok · render 258/256 · tab 608/564 · buổi 2690/1837 (per-run buổi 1691–4631 new vs 1837–5371 live: noise) · core gates PASS · own build ✓ |
| coop-e2e (live Worker) | 142/142 first run | 142/142 first run |
| two-way-oldsave main → new (40 wk) | ok, 0 errors (turn stays 0: harness, as W4 noted) | — |

### Robot (nt-run sens, 3 slots × 900 s ALONE per build, same box, nt-sum / nt-norm)
| build | weeks | ghen p50/p90 (NPC→her) | NPC→her band-3 | NPC→NPC band-3 | all band-3 | proud÷gentle | ghenUp gain toward her: by her / by an NPC |
|---|---|---|---|---|---|---|---|
| before 96c2859e | 665 | 99/100 | 8/398 = 2.0 % | 134/398 = 33.7 % | 17.8 % | 2.80 | 10730 / 15168 (59 % NPC-caused) |
| 6d7d2da9 (worker) | 740 | 19/96 | 81/571 = 14.2 % | 126/377 = 33.4 % | 21.8 % | 2.44 | 24927 / 0 |
| de69f206 (×2 runs, 6 slots) | 1395 | 14/96 | 95/850 = 11.2 % | 332/819 = 40.5 % | 25.6 % | 2.13 | all by her |
- W4's claims reproduce on 6d7d2da9 (ghen p50 99 → 19 vs claimed 25; NPC→her band-3 ≤ 30 % ✓; NPC→NPC ~33 % unchanged ✓; proud÷gentle ≥ 2 ✓).
- de69f206: targets still hold (all band-3 25.6 % ≤ 30 %, proud÷gentle 2.13 ≥ 2, NPC→her 11.2 %). NPC→NPC band-3 rises to ~40 % (tribute jealousy now becomes NPC→NPC oán toward the favoured consort, as the rule says) while the NPC→NPC oán distribution is unchanged (p50 4 / p90 51 vs 4 / 48). proud÷gentle is noisy per 3-slot run (3.10 / 1.54); the 6-slot pool is 2.13 — watch item N1.
- Law 6 check: after the fix every ghen rise toward her has a cause SHE made (dance, rumours of her, her nights, her beauty, her rank-ups…); ghen still lives (p90 96) and cools every turn.

### Laws
| law | result |
|---|---|
| 1 two-way | PASS — j28 ghenCool is the ONE cooling rule for an NPC's v.ghen (j8:472) and her v.pg (same call, her nết / her thân); ghenUp NPC-cause → oán is the jshelf NPC↔NPC rule, one key BAL.net.ghenOanK |
| 2 equal value / 3 gain-loss | PASS — no option values changed; only the shown oán numbers now match what is applied |
| 4 one core | PASS — BAL.net.ghenOanK / BAL.net.ghenCool {fade,k}; jshelf npcOanK removed (one key); guard green |
| 6 real world | PASS (with the reviewer fix) — jealousy of her rises only on her own deeds; another consort's deeds land on that consort; cools with time |
| 7 wording | PASS — «oán ta +1 đến +6», «nàng oán ngươi +3 đến +13» (no %, cổ trang) |
| 9 kit | PASS — text only, same kit cards; iPad THÀNH row clip is the known kit-keeper item (NB-d) |
| 11 whole group | PASS after de69f206 (the one missed family member fixed); oán wave 1 63 wired / 25 RAW listed for wave 2 |

### Real taps (realtap.js from review/robot-realtap via a scratch command driver; touch on BOTH devices; page.evaluate read-only + __forceOrigin setup) — build de69f206 served over http
| device | taps | page errors | looked at (3×) | shown == applied |
|---|---|---|---|---|
| Fold 755x1000@2 | 30 (1 «dead» = my tap on Sang buổi under an open #modal, harness) | 0 | title, Luân hồi, Hậu cung › Phi tần › Hại nhỏ (Hoàng hậu Vu Tâm Duyệt: «oán ta +1 đến +6», «+3 đến +13», «+2 đến +10»), Tung tin đồn dialog, KẾT QUẢ toast, flip screen, Tuần lục | Tung tin đồn self (Kiêu ngạo, slight 1.5, nết unknown) failed «không ai tin»: oán 0 → 5 ✓ in +1..+6, thiện cảm −10 → −15 ✓ (−5) |
| iPad 1180x820@2 | 28 (8 «dead» = my Sang buổi taps under the flip-card screen, harness) | 0 | Hậu cung › Phi tần › Hại nhỏ (HH Ôn Tuyết Dao) same lines | Tung tin đồn failed: oán 0 → 3 ✓ in +1..+6 (slight 1), thiện cảm −5 ✓ |
Shots kept in scratch only (f-hn, f-res, f3, f4, f5, i-hn); CDN img/_review/net-ghen/ wiped with this verdict.

### Non-blocking (for D / wave 2 on review/net-ghen-2)
- N1 robot: NPC→NPC band-3 ~40 % with the tribute rule fixed (all band-3 25.6 % ≤ 30 %); proud÷gentle 2.13 on 6 slots, noisy per run — re-measure in wave 2 (more slots) before tuning BAL.net.ghenOanK.
- N2 jshelf.js:239/241 (her own luxury seen) still writes `obs.ghen` directly (right target, no Chạnh lòng feeling) — route through ghenUp(obs,n,why,S) in wave 2 (one raise rule).
- N3 jagacts3.js:19 the NPC-dancer option text «phi tần ghen +N» (NPC side, not shown to her) now applies as oán toward the dancer — align its text in wave 2.
- N4 already known: j70 Bày mưu / Tung tin đồn sub-dialog list no bại/kèm (NB-a, seen again on both devices: «Ra tay ngay … ĐƯỢC thêm thể diện», result «ta không được gì, cũng không mất gì» while the deed resolves later); Hại nhỏ «nàng oán ta» with no number (NB-b); iPad THÀNH row clipped (NB-d, kit keeper).
- N5 jbal2 comment says «42 %» NPC-caused, report says 46 % (my before run: 59 %) — cosmetic.
- N6 (not this branch) Fold room scene name label «Quý nhân Từ Hàm Chương» wraps «Chươn/g» at the right edge — for kit keeper.
