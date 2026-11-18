PRIORITY #1 CHECK ('trait-pool'): OD 2 (L1562 rename, L1563 pool; L1567 24-list + balance law) | ledger 0 | claims 5 (C ROOT session_011xDdVQM2jyGVY8RsCxbtvX = this branch) | main 0 (no pool on main 6c4f21c3) | review/* 1 — review/trait-pool da4ac6e3 (its base review/trait-rename 27886326 is NOT yet on main: main 6c4f21c3 has no rename commit; this PASS carries it).

# REVIEW review/trait-pool → review/trait-pool-r1 (opus, BIG tier)
Reviewer session session_011xDdVNywSx622xztN465ec, for Foreman C. Read: START_CORE + START_WORKER + START_REVIEWER, topic people-life + coop, worker report trait-pool.md, OD L1562/L1563/L1567, C status orders 05:46Z/06:12Z/06:21Z.
Branch = origin/main 6c4f21c3 + trait-rename 27886326 + trait-pool (4 commits) + r1 fixes. main is an ancestor (fast-forward possible).

## VERDICT: PASS review/trait-pool-r1 9fdc1199a63b185aedb0256baab98d7e65c4ab84 (fast-forward of origin/main 6c4f21c3; includes trait-rename 27886326 + trait-pool da4ac6e3 + r1 fixes dd29812d + site rebuild)

## Checks
1. ONE CORE — BAL.net is the one table (24 F + 2 M nết, 3 groups × 4 symmetric pairs, list = OD:L1567 verbatim). net-scan (true, re-run by me): all old-read rows 0 (10 allowed old-word map entries, 2 P_TR comment/delete). My own grep (.trait / .tr / STR / MTR / TDTR / trait: / tr: writes) found what the scan's regexes miss — see fixes F2, F5. Pre-existing debt NOT from this branch (follow-up, not FAIL): 44 inline nết-keyed numbers in code (e.g. j55 giftO hasT(h,"Ham lợi")?25, j42 13 sites) — they were `.trait==="X"?n` before; moving them into BAL.net columns belongs to SHOW-WHY.
2. LUẬT SỬA CẢ NHÓM — no old trait read left (scan + own grep). Creation sites still WROTE old words (fixed, F2).
3. Old saves (base main build → this build, Playwright): 2-nết consorts map (Hiền lành+Thù dai → Ân cần/Thù dai/+drawn), servant trung→Trọng nghĩa, nhat→Khiêm nhường, men male pool, S.pTr dropped, S.thTrait mapped (Hiền lành→Ân cần), S.trK mapped, save carries p.net, 0 page errors. FOUND old-save court heads (no sex field) drew from the FEMALE pool (Khiêm nhường on a minister; Cương trực → Kiêu ngạo, losing gift refusal) → fixed F3. CO-OP: friend on my seat vs her own seat differed in 173/200 names (consort entry) and 176/200 (maid entry) → fixed F1; now 0/200.
4. Balance law: every row has tend + gain + cost + pair; weight keys are real SOC/ACT acts (check = soát quà vứt độc, pray, follow, serveTH …). riseGift (Tham vọng 2, Xu nịnh 1.6, Thực dụng 1.6) was NOT read — code hard-coded "Tham vọng" ×2 → fixed F4 (reads the table). suspectWarn (Kín đáo) read nowhere → removed (gain still wired via spy/check/test + sharp). Xảo quyệt: mal 25 is the highest malice step but harm spread over 6 nết, poison ×1.5; bot harm/yr 13.9→14.3 sane; no villain-by-name.
5. KIT / wording: no new part. The known-nết line is the existing person-card line (pcinfo body line, same as main — screenshots base vs branch identical layout); unknown = kitPcGrid chip "Tính nết ?". Words cổ trang, no %. NOTE (follow-up, not FAIL): the gain/cost tooltip is a native `title` on <b> → invisible on touch (Fold/iPad); KIT §31.9 pattern is chip + tap = kpPop. Hand to SHOW-WHY job.
   Her own card (jtrong pcard hook) showed only traitsOf(S)[0] → fixed F6 (all 3, same tooltip).
6. Build assemble.py + build_site.sh OK. Tests: trait-pool 20/20 (18 + 2 new r1 checks: old court heads male pool, co-op seats agree), trait-rename-oldsave 9/9, coop-e2e 60/60 (live worker), base/branch 0 page errors. Screens (scratch, not in git): Fold 755x1000@2 rival card 3 known nết + "Hay" line, no overflow/cut; 1 known nết "(còn 2 nết chưa rõ)"; iPad 1180x820@2 same, wraps cleanly, no horizontal scroll.
7. Perf smoke: in-page smoke base main vs branch (755x1000, same box): boot 1266 vs 1263 ms, render 40 vs 24 ms, nextBuoi 166 vs 97 ms, 0 page errors — no regression. dev/test/perf.js fold: OVER only on warmMB 84.8 MB (CDN map/festival pictures + assets.json; this branch adds no asset — pre-existing, not this branch); iPad run killed by me after 20 min (box load). Old-save load = check 3.

## r1 fixes (commit dd29812d, + site rebuild)
- F1 jnet.js netOf: a `.coop` person never seeds from old words (buildFriend look key "Khiêm nhường", buildFriendSrv tr "trung") → both seats = hash("me:"+name).
- F2 new people draw by the same rule (owner: same rule for everyone): removed old-word seeds at creation — j10 servant tr:pick(STR) (+ dead STR), j22 ×2 / jmen trait:pick(MTR), jkc kin default + father picks, jcoopworld tr:"trung". Before: servants' Lòng dạ Trọng nghĩa/Ham lợi ~27% each, men's Chí hướng Ham vui ~45%. Kept: j96 childhood-sweetheart story seed (mapped).
- F3 netSex: p.isMin (court head) → male.
- F4 j28 giftVal reads riseGift from BAL.net (max of her nết) instead of "Tham vọng" ×2.
- F5 dead TDTR table + trs, suspectWarn key removed.
- F6 jtrong: her own card lists her 3 nết.
- dev/test/trait-pool.js +2 checks.

## Follow-ups (not this branch)
- SHOW-WHY: move the 44 inline nết numbers into BAL.net columns; touch-reachable gain/cost (kpPop) instead of title.
- trait-rename must not be merged separately after this (already inside).

## Handover
Review done; nothing open. Shots were in scratch only (none uploaded, nothing to wipe). START_CTX ~? / rollover not needed.
