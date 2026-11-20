PRIORITY #1 CHECK: read the 18 LAWS (START_CORE), the E14r brief, the E14/E14b worker reports and PLAN; git-diffed review/bd-roads against origin/main; reused the existing measures/tests (bd-roads-bal, bd-legacy-save, road-full, road-rare, npc-roads, kc-roads, ge-guard, ge-engine, one-core-guard, shownodds, typedladder, tokscan, quickcheck). No new tool was built except two throwaway probes (scratchpad, not in git).

# bd-roads review — E14r (BIG reviewer, depth 8, START_CTX ≈3%)

Branch: review/bd-roads @ 23278b63f5e1c74704d1c73af5b93348ae078c8f (E14 bd_san + bd_soi in dev/build/jrd_bd.js; E14b bd_tuyet + bd_hen in dev/build/jrd_bd2.js; numbers dev/build/jbalbd.js).
Reviewed on a local copy with the newest origin/main merged in, then `bash dev/site/build_site.sh` (the merge was not pushed).

## VERDICT: FAIL (4 fixes required, 1 filed note)

## Per-law results

| Law | Result | Note |
|---|---|---|
| 1 two-way | OK | the {v} beats have counters; framing can win |
| 2 equal value | **FAIL** | 25 of 32 climax (x1) beats have a dominated option (fix 1) |
| 3 no cost-only | OK | 0 no-loss options and 0 free sure options in 202 beats |
| 4 ONE CORE | OK | one-core-guard PASS; no typed numbers in the road files (only comments) |
| 5 harder with rank | OK (weak) | every rolled option has p8 < p1 (−1 per rank step, BAL.road.bd.rk=1) |
| 6a real evidence | OK | evidence can fail; it is not a free win |
| 6b living NPC | **FAIL** | Ba Đồ / west-gate horse broken continuity in bd_san .10→.11 (fix 2) |
| 6c traceable object | **FAIL** | gifted/bought objects never stored (fix 3) |
| 7 wording | OK | 0 digits/% in player text; rare labels "Sức từ N" follow the VANPHONG rule-display convention; tokscan titleBad 0 tagBad 0 |
| old saves | OK | see tests |
| GE readiness | OK | every Chuỗi has thiện- and ác-leaning raw option names; ge-guard 6/6, ge-engine 456/456 — but see fix 1 (dominated ác options skew geLean) |
| scope | OK | only jrd_bd*.js, jbalbd.js, jrd_nc.js alias loop moved, j97 +2 lines (accepted in PLAN), tests, build outputs |

## Fixes (each as a whole family, law 11)

### 1. Law 2 — climax options are not equal value (all 32 x1 entries)
In most climaxes the win/mid option has base 45 against the win/lose option's 35, is cheaper (suc −2 vs −3) and fails softer (mid, not lose). It dominates in every flag state.
Example bd_san .4: «Thúc Tuyết Câu chắn trước ngự mã» [win2 / mid] p48 beats «Giương cung bắn con lợn rừng» [win / lose] p38.
Dominated beats: bd_san .4 .5 .7 .8 .9 .10 .11; bd_soi .4 .5 .6 .7 .8 .10; bd_tuyet .4 .6 .7 .8 .9 .11; bd_hen .4 .5 .6 .7 .9 .11.
In bd_tuyet / bd_hen the dominant option is often the ác-leaning one («xử nặng cả toán», «giá có lợi: lương đổi cả đồng cỏ», «đốt lều sốt»), which also skews the GE lean.
Files: dev/build/jbalbd.js x1 lines 25, 35, 42, 49, 56, 63, 70, 77 (bd_san); 86, 96, 103, 110, 117, 125, 133, 140 (bd_soi); 153, 172, 179, 186, 193, 200, 207, 215 (bd_tuyet); 160, 224, 231, 238, 245, 252, 259, 267 (bd_hen).
Fix: rebalance all 32 the way the nc roads do (the safe win/mid option gets the LOWER base, e.g. 20 vs 35, or the win/lose option a larger payoff), so no option is better on odds, cost and fail at once.
Measure gap (same family): dev/measure/bd-roads-bal.js:28 `if(!o.e)vs.push(...)` skips every climax option, so its "spread > 6: 0" never covered the climaxes. Include e: options (ending fx + k) and add a dominance check (higher odds AND cheaper AND softer fail ⇒ FAIL). Give a before/after table for all 32.

### 2. Law 6b — a moved person keeps acting (Ba Đồ, bd_san .10 → .11), scan every BDP move/kill
dev/build/jrd_bd.js ~265 (bd_san .10 c1): «Cho Ba Đồ cưỡi con ngựa ấy về thăm nhà» runs `bdMove("bado","tn")` — Ba Đồ rides THE west-gate horse home.
But :274 (x1) still says "Con ngựa ở cửa Tây vẫn chờ" and offers «Bảo Ba Đồ dắt ngựa về chuồng»; and bd_san .11 (:283 g, :289 s2, :291 «Bảo Ba Đồ theo sát ngự mã», :293 c1, :295 «Bảo Ba Đồ theo dõi») has him in the capital. Nothing reads bdP("bado","w") and nothing moves him back to "kinh". bdWhere is defined but never used.
Fix: after any bdMove/bdKill, every later line naming that person must read bdAlive/bdP(id,"w") (swap text or option, or bring him back with a told return). Scan all 4 roads for every BDP id (lie, olac, thatmoc, bado, tuyetcau, asnc, phong, kd) used after a move/kill; attach the scan + table. (bd_soi .9 sends Ba Đồ :502 and Tuyết Câu :499 north and never uses them later — that one is fine.)

### 3. Law 6c — objects given/bought are not traceable
Not stored anywhere: jrd_bd.js:112 «Nhường con ngựa ô cho {v}»; :143 «Cho lấy con dao về giữ»; :247 .9 win gives "cây cung sừng của tiên đế"; :259 «Bỏ bạc mua con ngựa ấy về kinh»; :335 «Gửi ngay vòng ngọc của mẹ…»; :372 the hawk gift (chim ưng non); :537 «Gửi chim ưng tìm em»; the .4 c1 "con ngựa hồng" given to {v}'s sister; jrd_bd2.js:115/:117 «Nhận ngựa, giữ ở chuồng Thượng tứ viện dưới tên ngươi».
Fix: writer 2 already has the `bdO` object book (fb "bd.o.<thing>") — reuse it on both files (one helper, not two), set it on give/buy, and let later beats read it (e.g. the hawk "Gửi chim ưng" only if the hawk is still held). Scan all 4 roads for give/buy/receive verbs; table.

### 4. Branch is not fast-forward on main
Merging origin/main conflicts in index.html, sw.js and dev/build/assemble.py. Merge main on the branch, keep main's assemble.py list plus the bd entries, rebuild with dev/site/build_site.sh.

### Filed note (not a FAIL here) — FOR E / MAIN
E14's FOR E note: Khả đôn, the women guests and Ba Đồ have no map-stage presence. Their BDP state is traceable and the nc roads' men are text-only too, so this branch is not failed for it. It is a jworld guest/servant item and must be filed (KIT_REQUESTS / queue) before the GE wave.

## Tests (local merged build)

| Test | Result |
|---|---|
| one-core-guard | PASS (exit 0) |
| bd-legacy-save | PASS 4/4 (new bd lives: bd_soi 3, bd_hen 4, bd_san 1 — only new roads) |
| my own legacy case (REAL saves made in the origin/main build, loaded in the new build) | PASS: bd_hoang mid-.4 → .11; bd_tuc at .5 → .11; bd_ngua at .9 → .11; 0 page errors |
| kc-roads direct (ORIGINS=bd,nc) | PASS |
| kc-roads coop-together --a=cnv --b=bd | PASS 26/26 |
| ge-guard / ge-engine all | PASS 6/6 / 456/456 |
| road-rare | ALL PASS (4 roads, 0 page errors) |
| tokscan | PASS (roads 75, titleBad 0, tagBad 0, errs 0) |
| typedladder | exit 0 (hits are existing kit/main lines, none in bd files) |
| road-full | bd_san and bd_soi lives: 14/14 chapters ALL (57–58 min each); run killed by my 2400 s timeout before bd_tuyet/bd_hen — a time-out, not a fault |
| npc-roads | life 1 played (14 NPC roads) then killed by the same 2400 s timeout — not a fault |
| shownodds | FAIL 1 path: j10.js:124 plantServ — not touched by this branch (pre-existing on main) |
| bd-roads-bal static | 0 no-loss, 0 spread>6 (but climaxes not measured — fix 1), 0 not-harder-at-rank, 0 digits, 0 unknown tokens |
| bot ≥20 lives per road | NOT finished: run was still going (3 bd_san lives reached .11, 0 errors) when the verdict was due. Must be run on the fixed branch |
| quickcheck | not reached in this run (queued after the bot) |

Re-review needs: fixes 1–4 with before/after tables, then bot ≥20 lives/road to .11 with 0 page errors, road-full all 4 roads, quickcheck.

## ROUND 2 — E14r re-review (20/11, under Foreman E #17)
PRIORITY #1 CHECK: read my r1 report (above), E14c/E14b/E14d round-2 sections of reports/bd-roads.md @c6e8f08e, the diff of review/bd-roads 23278b63..9c96112d, origin/main 70bea3d3 (LIVE). Reused the branch's own gates (bd-roads-bal static + bots, bd-scan.py, bd-batu-switch, bd-legacy-save) and the shared ones; built nothing new. Depth 8, START_CTX ≈3 %.

### Final merge of LIVE
review/bd-roads 9c96112d + origin/main 70bea3d3 → ff03cebd (same tree as E14d's 17034d70). LIVE then moved to 377d5ce3 (cal-p2 Đầu hồ, minigame files only): 17034d70 + 377d5ce3 → **4adea508** (conflicts index.html/sw.js only: taken from main, rebuilt with build_site.sh), pushed to review/bd-roads. FF on LIVE 377d5ce3: yes.

### r1 fixes
| r1 fix | r2 state | checked how |
|---|---|---|
| 1 law 2 — 25/32 climaxes dominated; measure skipped e: options | FIXED. All 32 x1 rows: hard-fail option base 45 · cost −3, soft-fail option base 30 · cost −2 (gap 15 > flag bonus 10), so the likelier option is never also cheaper and softer. bd-roads-bal.js now values e: options and checks dominance with no flag and all flags on. | read every x1 row in jbalbd.js (lines 25–269); static measure on ff03cebd: 4 roads × (no-loss 0 · spread>6 0 · dominated 0 · not-harder 0 · digits 0 · tokens ok · page errors 0) |
| 2 law 6b — Ba Đồ rode the west-gate horse home but still acted at .10 x1 / .11 | FIXED. The horse is the object bdO("nguatay") (cua/chuong/bado); x1 texts and options read it (BDGATE, `if:` variants with their own BAL rows 4–5); .11 cast() brings Bạc Đồ back with a told line (fb bd_san.badove) and stables the horse. Family: bd-scan.py checks every BDP id after a move/kill on all 4 roads. | jrd_bd.js:71, 281–303; bd-scan on ff03cebd: 0 UNGUARDED |
| 3 law 6c — untracked objects | FIXED as a family. One bdO helper (jrd_bd.js), used by both writers; 130 give/buy/receive options, 93 booked, 37 used up, 0 NO BOOK. | bd-scan on ff03cebd |
| 4 not FF on main | FIXED (merged 56e0ec51, then 0de74d9e, now 70bea3d3 by me). | git merge-base |
| note — Khả đôn / women guests / Ba Đồ no map stage | still FOR E / MAIN (jworld guest item), not a bd-roads gate. | — |

### New since r1: Ba Tư rewrite (owner OD 19/11 ~06:40Z)
Text only, in place (ids, beat keys, flags, option order and numbers unchanged). One per-life switch: old saves (bd_hoa/ngua/tuc/hoang) stay wholly Bắc Địch, every new life is wholly Ba Tư; country words go through NCL.bt tokens. Court-event Bắc Địch untouched. bd-batu-switch PASS incl. case 4 (Cao Ly + Ba Tư in one build). Only steppe words left in the two road files are header comments (GE design names) and bdWhere's old-life branch — not player text for new lives. NIT-1 (nrKhaOf) and NIT-2 (jgedata.js:119) present and correct.

### Gates (my runs, one chromium page at a time) — full set on ff03cebd; static, one-core, bd-batu-switch, bd-legacy-save, ge-engine, quickcheck rerun on 4adea508: all PASS (quickcheck 4adea508: core gates PASS, old save ok, perf new/live render 183/217 ms, buổi 946/3076 ms)
| gate | result |
|---|---|
| bd-roads-bal STATIC=1 XROWS=1, 4 roads | 0 / 0 / 0 / 0 / 0, tokens ok, page errors 0 |
| bd-scan.py | 6b 0 UNGUARDED · 6c 130 / 0 NO BOOK |
| one-core-guard | PASS |
| bd-batu-switch | PASS |
| bd-legacy-save | PASS (old bd_hoa → .6 → reload → .11; new lives {bd_tuyet 4, bd_soi 3, bd_hen 1}; 0 page errors) |
| ge-guard / ge-engine all | 6/6 / 808/808 |
| road-rare, 4 roads | ALL PASS |
| kc-roads direct ORIGINS=bd,nc | PASS |
| kc-roads coop-together --a=cnv --b=bd | 26/26 |
| npc-roads-tokscan | 0 bad |
| quickcheck | QUICKCHECK PASS · core gates PASS · old save ok · perf new/live render 200/193 ms, buổi 1038/1256 ms |
| bots | bd_soi 5/5 reached .11 (1 win · 2 mid · 2 lose), 0 errors (≈5 min/life here; other 3 roads not rerun — road code identical to E14d's 20×4 run, 0 errors) |
| road-full ×4 / bots 20×4 / caoly-oldsave | taken from E14d's runs on 9c96112d (9/9 each; 20/20 each road, 0 errors; 14/14). The 70bea3d3 delta is minigame files only (j82/j91/jtd/jts/jslap/jlant/jbal2 mg rows, KIT.md, 2 new mg tests), no road file, so I did not rerun the ~1 h/life road-full. |
Known flake (FOR MAIN, not a gate here): G4 50-coop-one-world seed 3 (R.evm random roll in j29.js), not touched by bd-roads; it passed in my quickcheck.

### VERDICT r2: PASS — review/bd-roads @ 4adea508 (FF on LIVE 377d5ce3)
Open notes FOR E / MAIN (not blocking): GRAND_ENDINGS.md still names bd_tuyet/bd_hen GEs in steppe words (must follow cat.py); FOR C art lists in §BUILT are steppe scenes and must be redrawn for Ba Tư; map-stage presence of Vương hậu / Bạc Đồ / women guests (jworld item); «Tô Lận» kept (E14d check).
