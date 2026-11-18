# land-b-passes — B lander report (session_01N1tNP6NHm7FrTkoTUSGnpa, opus)

PRIORITY #1 CHECK ('land'): OD 49 (OD:L1370 go-live rule) | claims CLAIMS.md:752 (this) | main 2de320ac→bbb3b4ca chain | review/* review/land-{makeup-theme,mg-snap,trait-rename,coop-thin-b}-r* (mine), review/staff-root-fix-1 (fix worker, Foreman B s6).
START_CTX ~4 % (1 M window, estimate; get_session reads 0). Rollover at ~29 %: written at ~24 %.
Coordinator: Foreman B s5 (session_01N1tNP5TgfuFGPjgoMfV7Tx, archived) → Foreman B s6 (session_01N1tNP6aS1jVsCvD9kpxdH1). Foreman B pushes main (golive.sh --yes stops on the tag push: tags 403 from this account → foreman verifies FF + pushes main itself).

## Method notes (for the successor)
- Worktrees: /home/user/wt/land-b (makeup), land-b2 (staff-root, held), land-b3 (mg-snap), land-b4 (trait-rename), land-b5 (coop-thin-b-r3), landb-main (detached, base comparisons), landb-docs (this). Scripts: /home/user/wt/landb-tools/ (focus*.sh test runners, sheet.py contact sheets of shots).
- tier.js "touched part" lists are huge (151 tests for makeup-theme; many are ad-hoc scripts needing argv). I ran the reviewer-named tests + the direct touched tests with correct argv, and compared every failure against the base (main) build: only failures that PASS on main count as regressions.
- shots.js: act-card pictures and the Dư đồ map were not loaded at shot time on BOTH branch and live main from ~14:30Z (CDN load in this box) — layout looked, not pictures.
- Main moved 4× under me; each time: merge newest main, rebuild, rerun the touched tests, golive.sh (no --yes), READY at once.

## 1. makeup-theme-r1 (PASS 471de81f) — LIVE 25bfd7cf
- Merges: main 6ca04148 → c29866a6 → d0a839e8. Conflicts: dev/build/assemble.py module list (twice) → main's list + 'jmkt.js' after 'jts.js' (only branch module); generated index.html/sw.js/assets.json → main's + rebuild; CHANGE.txt → main's file + this line on top.
- CHANGE: "Điểm trang nay có tên từng bậc dung nhan, từ Mặt mộc, Đoan trang, Kiều diễm đến Khuynh thành, tô quá tay thành Diêm dúa bị chê phô trương; mỗi đề thi, mỗi dịp, mỗi mùa người chấm ưa một lối trang điểm riêng, phải hỏi ma ma, nhờ tai mắt, hỏi han người khác hay nhớ các kỳ trước mới đoán ra."
- Tier BIG (reviewer did the full BIG review). Tests on the land sha: makeup-theme 755x1000@2 + 1180x820@2, toilette, toil-react, toil-looks, ts-a, difficulty, paid-tiers, coop-e2e 63/63 — green; coop-b1 / coop-r2 same pre-existing fails as main.
- Shots Fold + iPad looked: clean. golive.sh (no --yes) on 25bfd7cf: FF ok, QUICKCHECK PASS 118 s, core gates PASS, old save ok, render 139/146 ms.
- LIVE 25bfd7cf (Foreman B s5, 13:53Z).

## 2. staff-root-r1 (PASS 1abbf075) — HELD (regression); later went LIVE from review/staff-root-fix-1 as main 7e0250ec (landed by its own reviewer, not by me)
- Land sha b14d45c0 (local in land-b2, not pushed; merge of 25bfd7cf). Conflict: dev/build/j95.js j95vis → kept staff-root's gtAtHome() AND main's `if(id==="c:ly")return k==="lc";`.
- CHANGE (prepared): "Số cung nữ, thái giám hầu hạ nay theo đúng phẩm vị, cho nàng lẫn mọi phi tần; bị giáng phẩm thì người dư được trả về Nội vụ phủ, kẻ thân tín vẫn ở lại; người trong cung bớt đông, dễ nhớ mặt hơn."
- REGRESSION: dev/test/coop-guest-maid.js case 3 "guest: refused (no seat) → her maid is back" FAILS 2/2 (guest rank 0, capOf [1,0], N.returned 1, S.staff []); also fails on 1abbf075 alone; passes 37/37 on main. Cause: guest-seat capSweep/capTrim vs jcoopask:71/74 maid return.
- Green: staff-root (13), promote-servants, promo-rules, promo-exam, promo-next-rank, promo-skip, elder-staff, coop-e2e, coop-ask-srvprobe, mline-guest, unmet-list-family, chap-label, tab-pairs, roster_sim, one-core-guard. item-events-scan + dress-offence fail identically on main.
- Foreman B s6 decision: a servant coming home counts as capTrim's 'stay'; fix worker session_01N1tNP4tMiPQEh5DXeZP29x on review/staff-root-fix-1 → land staff-root FROM THAT BRANCH after its delta PASS (redo the j95vis resolution above).

## 3. mg-snap-r1 (PASS 931255b1) — LIVE 2de320ac
- Merges: 25bfd7cf → abe056c3 (world-events) → ce29592e (one-core-dup3 land). Conflicts: generated files + CHANGE.txt only; jts.js (with makeup-theme) and j92.js (with world-events) auto-merged, independent hunks; assemble.py = main's (adds no module).
- CHANGE = the branch's own line: "Thêu theo nét: mũi chỉ đi đúng theo tay, lệch nét thì mất điểm; các trò thi tài không còn ăn điểm khi chơi bừa."
- Tests: mg-balance-vp (old save from main 25bfd7cf → new, 755x1000@2 + 1180x820@2) PASS, lessons91, makeup-theme, ts-a, tone-pool-check, one-core-guard (5093 = baseline), coop-e2e — green. minigames91 / mgeasy (item-gain dialog .kfgain intercepts the tap) and tuduc-mg (ngon raw 0) fail IDENTICALLY on main — stale tests, pre-existing.
- Shots Fold + iPad looked: layout clean. golive.sh (no --yes) on 2de320ac: FF ok, QUICKCHECK PASS 134 s, core gates PASS, old save ok, render 178/140 (in gate).
- LIVE 2de320ac (Foreman B s6, 15:23Z).

## 4. trait-rename-r1 (PASS 84d47894) — LIVE bbb3b4ca (Foreman B s6, 15:33Z)
- Re-check vs trait-pool (live since 9fdc1199): everything of trait-rename except 2 lines was already on main (j1 TRAIT_OLD / traitLabel / trMigrate, deser hook, dev/test/trait-rename-oldsave.js). Conflicts j42 + j95 → main's code (amOn(), hasT()) + this branch's words: j42 "vốn nhiều ác ý, lại chẳng ưa ngươi", j95 harm reason "tính xảo quyệt" (main still printed "hiểm độc").
- git grep 'hiểm độc' over dev/build/j*.js after merge = only the two old-word maps. Pool (jbal2) has 'Xảo quyệt' in ld for F and M; no 'Hiểm độc'. Old saves: label via j1 TRAIT_OLD, pool slot via BAL pool .old ('Hiểm độc'→'Xảo quyệt').
- OPEN for Foreman B (not changed by me): two old-word maps exist on main (j1 TRAIT_OLD + BAL pool .old) — one source would be TRAIT_OLD built from BAL's .old. Old act-log lines saved as lowercase "tính hiểm độc" stay (trMigrate is case-sensitive; history text).
- CHANGE: "Nết Xảo quyệt nay gọi thống nhất ở mọi nơi: lời kể không còn chữ "hiểm độc", người ra tay vì tính xảo quyệt được ghi đúng lý do; sổ cũ mở lên vẫn đọc theo tên mới."
- Tests: trait-rename-oldsave 9/9, agmaid_check 23/23, roster_sim 0 errors, coop-p2 45/45, coop-e2e 63/63. Shots Fold + iPad looked: clean. golive.sh (no --yes) on bbb3b4ca: FF ok (main 2de320ac), QUICKCHECK PASS 140 s, core gates PASS, old save ok.

## 5. coop-thin-b-r3 (PASS fee14ec5) — BLOCKED at the go-live gate (branch review/land-coop-thin-b-r3 b3d81c32 pushed, NOT ready)
- Merges: 2de320ac → bbb3b4ca → 7e0250ec (staff-root-fix-1 live). Conflicts (first merge): j2.js start ally → kept the shared allyBond() (ONE key BAL.allyRel); deleted the dup BAL.eff.j2.start in jbaleff (0 reads); jbal.js comment updated; jcoopworld:991 briber preview prints balAb(BAL.eff.jcoopworld.evBriber) (G1 one-core-text gate caught it once, fixed in 0013ddea); assemble.py: kept jcoopthinb.js line and main's regSweep line (regSweep last). Later merges: generated files only. one-core-guard PASS.
- CAP: jcoopthin TH.CAP is still 2 in this sha (and it is the thin LEVEL cap; seats stay 2) → the CHANGE line does NOT mention 4. Foreman B s6 wrote 'CAP 4' at 15:33Z: if CAP must be 4, that is the branch owner's change, not the lander's (B s5 order: 'check; do not change it yourself').
- CHANGE: "Chơi chung: hảo hữu vào cung hay sang kiếp mới đều được an bài ngay trong cùng một thế giới; lời mời, bạc đút lót, chứng cứ giữa hai người hiện đúng lúc, không còn trùng thẻ hay sót thẻ."
- Tests on 5a8b923f (base bbb3b4ca): coop-e2e 63/63, coop-one-world PASS (default seed), coop-thin-b-r1 (R7) 39/39, DFLAG=1 coop-thin-b-r3 (R8–R10) 25/25, coop-thin-b 148/148, coop-thin-d 53/53. On b3d81c32 (base 7e0250ec): coop-e2e 63/63, coop-thin-b-r3 25/25, coop-guest-maid 37/37.
- BLOCKER: golive.sh on b3d81c32 → QUICKCHECK FAIL, CORE GATES G4 50-coop-one-world: SEED=7 'FAIL: merge differs from the host', path S.wwin (8 diffs) = jworld's co-op WORLD key (world-events, live since abe056c3; pushed into COOPW.X.W_KEYS at jworld load). Same probe, same seed on main 7e0250ec: PASS. Seeds 3/1/2 PASS on both. Repro: QC_WT=/home/user/wt/land-b5 SEED=7 node dev/test/coop-one-world.js (log /home/user/wt/landb-g5b/coop-one-world-seed7-FAIL.log). Not fixed by me: a real logic conflict between thin-guest B (host-side week merge / K.W0 restore in jcoopthinb:69/96/100, TH snapshot paths in jcoopthin) and the new world key S.wwin → needs coop-thin-b's worker (or world-events' owner) to make S.wwin merge like the other W_KEYS, then golive again.

## Queue after this (Foreman B s6, 14:55Z + 15:23Z)
6. origin-bd-branch-r1 4e50e6ea (reports/review-origin-bd-branch-r1.md): j69 ow69Rare conflicts with dup2/arcs → keep originRoot + BAL.rareLv; one-core-dup3-land is live (ce29592e) → re-run the bd/nc bot split once.
7. (done by others) staff-root is live via staff-root-fix-1 (main 7e0250ec).

## HANDOVER (rollover at ~28 % context; START_CTX ~4 %)
Successor (opened by Foreman B): (a) coop-thin-b-r3 waits for the S.wwin fix above; after the fix, merge the fix branch on newest main, rerun coop-one-world SEED=7 and SEED=3 + coop-e2e + DFLAG=1 coop-thin-b-r3, golive.sh (no --yes), READY FF. (b) origin-bd-branch-r1 4e50e6ea: not started (j69 ow69Rare → keep originRoot + BAL.rareLv; re-run the bd/nc bot split once on main ≥ ce29592e). Worktrees under /home/user/wt/land-b*, landb-main, landb-docs can be deleted (all pushed); scratch logs /home/user/wt/landb-g*.
