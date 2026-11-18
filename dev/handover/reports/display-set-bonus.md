# REPORT — DISPLAY SHELF SET BONUS (opus builder, session_01UV1SzjpfceWSitedZq3R6g)

START_CTX ~5 % of window (get_session used_tokens read 0; own estimate). Rollover line: ~30 %, hard ceiling 60 %. Single session, no rollover needed.

PRIORITY #1 CHECK ('set bonus|shelfSet|BAL.shelf.set|Phòng trưng bày|Đa Bảo Các'): OD L1714/L1716/L1717/L1718/L1719 | ledger 0 | claims: this build (C-AG #6 brief) | origin/main 99f3978 no set logic (jshelf has none) | review/* none (display-shelf-r3rv 41418cd8 = base, no set code). Table reused as approved: dev/research/display-set-bonus.md @500faf22.

## Branch
review/display-set-bonus — head 0c97c0c3 (contains live main e24d5838; earlier merges 99f3978, eb3675a, 3da5720, f6ee11b — only generated files ever conflicted; assemble order unchanged from main: jshelf, jlooks, jdisp).
Commits: ad96f54 set bonus core · shelf-check count · KIT_REQUESTS (6) · 0298b89 merge origin/main 99f3978 + jdisp wording · af560e0 set glow data + Đa Bảo Các wording · 72e3e62 test fix (mid stats) · merges up to e24d5838.

## What was built (all in dev/build/jshelf.js unless noted)
1. ONE table BAL.shelf.set = {cap:6, capDanh:3, size:{2:1,3:2,5:3}, s:{26 sets}} (12 groups; members = BAL.shelf.it keys or "tp:tranh"/"tp:tho" handmade works); player words SHELF_SET_N. Exactly the approved table (sets, sizes, stats, 4 minus rows). Never Sủng.
2. 6 NEW pieces (section D) in BAL.shelf.it + IT kd "Bày biện": sonthuy, hoadieu (Thư họa, Quý nhân, src mp), hophuong (Hương lô, Thường tại, m), nhatquy (Tây dương, Phi, ngự ban n), butlong, muchuy (Văn phòng, Thường tại, m). No art: the existing stand-in shows until Foreman C paints them (art order already sent by s37; nothing drawn).
3. Stats through the EXISTING paths only: Sắc = one more wearBonus wrapper (never ×1.5; b.shSac names the part); Danh / Đức / Tài / Tâm cơ + minus (Danh, Thái hậu th, Hoàng hậu hh) = the jdh dhApplyFx apply / take-back pattern (p.shSet.on holds what was applied; read back after writing because hh is the Empress's own regard via j24 hhSet→affAdd).
4. Set-broken rule: a set is whole when every member stands (any slot of its group) and none is withered (shelfBad) or above her rank without being ngự ban (vượt phẩm charge waiting). Dead / burnt / given / confiscated / sold = not on the shelf. Weekly check shelfSetCheck (in shelfWeek after plants) is the ONLY gain; any break takes back AT ONCE (shelfSetSync in shelfPut-replace, shelfTake, jil ilOut wrapper, cold palace strip); regain at the next whole check. Old saves (no p.shSet): nothing until the first check, no crash.
   Not hookable yet (no mechanic exists in the game): incense TAINT (Hoan Nghi hương taint was parked) and STOPPED clock / lamp out of oil — when such a state is added, it goes into shelfSetBreak(p,e) (one place).
5. Cap: plus ≤ 6 per person, Danh ≤ 3, biggest set first; minus always applies while the set is whole.
6. NPCs: same table, same check in the weekly shelf pass (host only in co-op: guest runs only her own room, existing shelfGuest rule).
7. Player text: «Bộ Tam quân tử: Đức +2.» · «Bộ Ngự diêu: Danh +2, Thái hậu thiện cảm -1, Hoàng hậu thiện cảm -1, vì chủ vị không ưa khoe của.» · «Bộ Phúc tử: còn thiếu Cải thảo phỉ thúy.» · «Bộ Tam quân tử khuyết: chậu lan quý héo úa.» · «Bộ … đủ lại.» Numbers printed from BAL; no %. Name: «Đa Bảo Các» (owner OD ~21:22Z, overwrites «Phòng trưng bày») in jshelf + jdisp (5 strings) + KIT.md §89.1 + KIT_REQUESTS.
8. UI: no new UI. shelfView(S).sets = [{id,on,t}] lines (interim shelfOpen shows them via kitFacts); per piece shelfView(p).groups[g].items[i].set = {id,name,full} for the GLOW (owner OD ~21:20Z, MAIN s37 order) — drawn by the kit worker session_01UV1SzisVVpBnxyKZsxjCfY (told the field). KIT REQUEST (6) in dev/kit/KIT_REQUESTS.md.

## LUẬT SỬA CẢ NHÓM — every reader, bonus counted once
| reader | before | after |
|---|---|---|
| j8.js:37 effSac (Sắc everywhere: status, NPC compare, night, contests) | wearBonus | + set Sắc once (intended) |
| j75.js:104/110 night prep "Đeo trang sức đẹp nhất" (jewellery bonus jb + its text) | wearBonus.sac | jewellery only: wb.sac − shSac |
| j8.js:285 / j8.js:500 worn text "trang sức đang đeo / Đang mặc: Sắc +" | wb.sac | wb.sac − shSac |
| jinv.js:335, jtoil.js:312, jwdinv.js:120 worn chips Sắc / Danh | wb.sac | wb.sac − shSac (set Sắc is not worn) |
| Danh / Đức / Tài / Tâm cơ / th / hh readers (status, promo, NPC compare, rank bars) | stat field | stat field (set part lives in it once; no second source; dhOn-style track only in p.shSet.on, read by nobody else) |
| shelfLux / room xa xỉ / taste / charges / jil ledger | — | unchanged (sets give no luxury) |
Pre-existing, NOT changed (for the foreman): the title Sắc (jdh) and the veil +2 (jinv) also flow into wearBonus, so they inflate the night-prep jewellery bonus jb and the "worn" chips — same family; left as is (balance owner call).

## Tests
All on head 0c97c0c3 (after the e24d5838 merge): set-bonus-check PASS (new: table, each size, counted once, break/regain incl. wither + over-rank vs ngự ban, cap 6 / Danh 3, minus rows, NPC parity + co-op guest, old save, text, glow data) · shelf-check PASS (73 pieces) · one-core-guard PASS · one-core-text-rule PASS · it-key-guard PASS.
Earlier on ad96f54/af560e0 (pre-merge; not re-run since because the merges touched no set/shelf/wearBonus code): agent_check 16/16 · QUICKCHECK --cpu 4 PASS (render 152/139, tab 287/279, buổi 688/702) · bind PASS.
display-room.js: in this container it times out at 120 s waiting for start/showModal on both base and head (environment, not decided) — reviewer please run it on your side.

## Paired balance smoke (run_par.js, sensible bot inpage6, 4 pages, seeds 2..9 × 8 lives, same seeds both builds)
A = 41418cd8 (shelf r3, no sets) vs B = ad96f54 (same + set bonus only; the later commits add only main's merge, glow data and wording).
| measure | A base (n=65) | B set bonus (n=65) |
|---|---|---|
| reach Hoàng hậu | 30 = 46 % | 30 = 46 % |
| early death (below HH, not old age) | 31 = 48 % | 21 = 32 % |
|  of which poisoned / childbirth / illness | 18 / 8 / 4 | 10 / 6 / 3 |
| childbirth death per birth | 7.8 % | 8.7 % |
| births per life | 2.18 | 2.26 |
| years to HH p25 / median / p75 | 5.6 / 6.5 / 8.9 | 6.1 / 8.0 / 9.0 |
Per seed HH (A/B): s2 2/4 · s3 4/4 · s4 2/4 · s5 5/5 · s6 4/3 · s7 2/2 · s8 5/5 · s9 6/3.
Read: HH reach is identical (band unmoved). The seeds are shared, but lives diverge from the first changed number, so A and B are in effect two independent samples of 65. Early death 48 → 32 is a two-proportion difference of about 1.9 standard errors (p ≈ 0.07): not significant at the usual bar, and per-seed it goes both ways. The earlier plain base run (seed 1, n=60) gave 38 % early death, so the base itself ranges 38–48 %. The median time to HH is later in B, but the quartile ranges overlap (p75 8.9 vs 9.0). Verdict: no move beyond noise on HH reach / band. The early-death gap is flagged for the reviewer. If it is wanted, a second 65-life pair costs about 2 h here.

## Handover
Done; nothing left but review. Worktrees: /home/user/wt/dsb (branch, pre-merge), /home/user/wt/dsb2 (head), /home/user/wt/dsb-base (smoke base) — delete after verdict.
