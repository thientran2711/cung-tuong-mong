# land-b-2 — B lander #2 report (session_01N1tNP34QePRanPQevmttcs, opus)

PRIORITY #1 CHECK ('wwin' / 'coop-thin-b land' / 'origin-bd land'): OD OD:L1370 (go-live) + OD:L1063 | ledger 0 | claims CLAIMS.md:843 (this), lander #1 DONE (reports/land-b-passes.md) | main 7e0250ec jworld.js:327 (S.wwin pushed into COOPW.X.W_KEYS), main e8b1906f (world-events-2 r1: her choice → S.wwMe) | review/* review/land-coop-thin-b-r3, review/coop-thin-b-r3 fee14ec5, review/origin-bd-branch-r1 4e50e6ea, review/world-events-2.
START_CTX ~5 % (1 M window, estimate). Coordinator: Foreman B s6 (session_01N1tNP6aS1jVsCvD9kpxdH1).
Worktrees: /home/user/wt/lb2 (coop land), lb2bd (origin-bd land), lb2main / lb2m7e / lb2old (base comparisons), lb2docs (this); logs /home/user/wt/lb2-out.
NOTE for the next lander: the shared repo's refs/remotes/origin/main was STALE (3ef079f6, days old) — always fetch with `+main:refs/remotes/origin/main` and check `git ls-remote origin main`.

## 1. coop-thin-b-r3 — READY FF b5d109fe (review/land-coop-thin-b-r3, base main e9bbc4d6)

### Root cause of the G4 coop-one-world S.wwin failure
- Diff paths (probe with a merge-path print, b3d81c32 SEED=4): `.S.wwin.L[#2]` = the **đại xá** window (k "xa", cause "Thắng trận trở về, ban ân xá"): host had already ended/removed it, the merge kept the guest's copy.
- Cause: jworld EVD.xa.start wrote `w.x.me` (a seat-relative "me" flag) INSIDE the shared world key S.wwin. Seat translation makes the guest's copy of that window differ from the base, so merge3 keeps her stale window. The fault is in **jworld (world-events, live since abe056c3)**, not in thin guest B.
- Proof it is pre-existing on main: old main 7e0250ec, coop-one-world seeds 1–10 → FAIL at seeds 1, 4, 7, 9 (S.wwin 7–8 diffs). b3d81c32 fails intermittently (seed 4 2/2, seed 7 1/3) — the probe is seeded but not fully deterministic, which is why seed 7 "passed on main once".
- Fix: ALREADY ON MAIN — world-events-2 r1 e8b1906f moved her choice to her own S.wwMe and the đại xá card checks her own eligibility. I merged it; no jworld change on the land branch. FOR MAIN / C-AG: nothing to take over for S.wwin (C-AG's branch is the source of the fix).
- Whole family (world keys added by a module at load): `hr` (jcoopworld:881) and `wwin` (jworld:327) are the only `W_KEYS.push`. The thin guest reads X.W_KEYS live at call time everywhere (jcoopthin 109/123/130/148/163/164/262, jcoopthinb 69/96/100); no module copies the array (git grep `W_KEYS.slice|...W_KEYS|=X.W_KEYS` = 0) → load order is not a factor; both pushed keys are handled like the static ones.
- Same family left OPEN for C-AG (not touched, jworld is theirs): EVD.away card "Cáo bệnh ở lại" (jworld.js ~118) writes `w.x.f` (world) from her own card; on a guest that change is world-written on her side and dropped by the safety net (her decline is lost). Not in the probe (it does not click cards).
- Separate pre-existing family (NOT S.wwin): coop-one-world seed 9 "guest week changes the world" on `.R[#n].evm` = `{}` at base, absent after the guest week (guestNet drops an emptied evm container). Fails on main 086f1d60 2/3 and on this branch 1/3; gate seeds (7, 3) not affected. FOR MAIN.

### Merges (all on review/land-coop-thin-b-r3)
| commit | main | conflicts → resolution |
|---|---|---|
| fb65ae8f | e8b1906f (world-events-2) | index.html, sw.js → main's + rebuild |
| 21952e22 | 086f1d60 (one-core-jkc) | index.html, sw.js → main's + rebuild; CHANGE.txt → main's file + this branch's line on top |
| b5d109fe | e9bbc4d6 (batch-s31b) | same as above |
assemble.py auto-merged (jworld2 + jcoopthinb + regSweep lines all present). CAP: jcoopthin TH.CAP stays 2; CHANGE line unchanged (says nothing about 4).

### Tests
| test | sha | result |
|---|---|---|
| coop-one-world seeds 1–10 | fb65ae8f / main e8b1906f | 10/10 / 10/10 |
| coop-one-world SEED=7 ×5 | fb65ae8f | 5/5 |
| coop-one-world seeds 1,4,7 / 9 | 21952e22 | PASS / FAIL R.evm (pre-existing, above) |
| coop-one-world seeds 1–10 | old main 7e0250ec | 6/10 (S.wwin) |
| coop-e2e | fb65ae8f, 21952e22, b5d109fe | 63/63 each |
| coop-guest-maid | fb65ae8f, b5d109fe | 37/37 |
| coop-thin-b | fb65ae8f, b5d109fe | 148/148 |
| coop-thin-b-r1 / DFLAG=1 | fb65ae8f | 39/39 / 48/48 |
| DFLAG=1 coop-thin-b-r3 (R8–R10) | fb65ae8f, 21952e22, b5d109fe | 25/25; 23/25 in 2 of 5 runs while other tests ran in parallel, 25/25 when alone |
| coop-thin-d | fb65ae8f | 52/52; 51/52 in 2 of 4 runs (kit compare data-pres fig vs one = speaker figure loaded or not: timing) |
| coop-p2 (Foreman B add: B1 'NPC bribe reaches her as the j42 card') | b5d109fe | 45/45 ×3, B1 ok each run |
| one-core-guard | b5d109fe | PASS, inline 5092 ≤ baseline 5093 (no growth) |
| golive.sh (no --yes) | b5d109fe vs live e9bbc4d6 | FF ok; QUICKCHECK PASS 120 s, core gates PASS (incl. coop-one-world 7+3), old save ok, render 143/148 ms, tab 239/250, buổi 734/703 |
READY FF coop-thin-b-r3 b5d109fe sent to Foreman B 17/11 ~17:25Z.

LIVE: coop-thin-b-r3 → main b5d109fe (Foreman B s6, 17/11 ~17:24Z). Foreman B s6 rolled over → s7 (session_01N1tNP2EybzVZ1ao4kd6ovb) → ROOT Foreman B session_01N1tNP3WvLNPV6guHYCkC66 (from 18:04Z); origin-bd READY went there.

## 2. origin-bd-branch-r1 (PASS 4e50e6ea) — READY FF e503c53e (review/land-origin-bd-r1, base main 03a776e4)

### Merges + conflicts
| commit | main | conflicts → resolution |
|---|---|---|
| cde9a521 | e9bbc4d6 | dev/build/j69.js ow69Rare → branch's `OW69[originRoot(k)]` + main's `BAL.rareLv[0]/[1]` (one core; branch's ow69Pick ow 1/2/3 kept); dev/build/jroute.js "Gửi thư về nhà" → main's BAL.route.k keys + branch's kem `nhà ở ${S.origin.land} xa xôi` (every hòa thân branch); generated files main's + rebuild; CHANGE line added (the branch had none) |
| 315af52e | d5ea786d (coop-thin-b-r3 live …) | dev/build/jcoopthin.js withSeat → main's part-B/D block with `sb.origin = originByKey(B.ok)` (main typed `ORIGINS.find(o=>o.k===B.ok)`, which loses the bd branch in co-op); jroute again → main's BAL.odb.jroute keys + the land line; CHANGE.txt main's + this line on top |
| e503c53e | 03a776e4 (weather-khac) | generated files only |
Family scan after merge: `git grep 'ORIGINS.find|filter|map'` → j1 originByKey (the one door), j69 card weights (roots only, correct), jagent agOrgName (NPC origin names; NPCs never roll bd — reviewer note (c)), jk2b roulette (one card per root, correct). No other origin-key lookup bypasses originByKey.
CHANGE: "Công chúa hòa thân nay chung một thẻ thân phận: rút trúng thì tùy duyên mà làm công chúa Nam Chiếu hay Bắc Địch, mỗi nơi một cố hương, một lá thư nhà riêng; thân phận đã rút từ trước mở lên vẫn giữ nguyên."

### bd/nc bot split (once, one-core-dup3 live)
run_par + inpage6 with forced origin (window.__origO, wrapper not committed), sens, 4 pages each, seeds 11 / 41, on cde9a521. The box hit the shared memory limit (OOM kills) → ~10 min per life; stopped after 45 min.
| branch | n | Hoàng hậu | yrs to HH | non-HH ends |
|---|---|---|---|---|
| bd | 3 | 1 | 14.5 | childbirth 2 |
| nc | 9 | 2 | 14.4, 4.0 | poison 4, Thái phi 3 |
n far too small to move anything → BAL.orig.br.nc stays {nc:1, bd:1}; the reviewer's pooled 107 / 77 lives stand. A real re-measure needs a dedicated bot slot (and is due anyway after one-core-arcs-r2v lands — reviewer follow-up (a)).

### Tests (315af52e; e503c53e = + weather-khac generated merge, re-run marked *)
| test | result |
|---|---|
| origins.js 755x1000@2 / 1180x820@2 | 28/28 / 28/28 (* Fold 28/28) |
| origin-bd-oldsave (saves from main e9bbc4d6 build, bd = 10th origin there) | 14/14 |
| tut-origins-scan | 10/10, 0 page errors |
| road-rare | ALL PASS |
| coop-e2e / coop-p2 / coop-thin-b | 63/63 / 45/45 / 136/136 |
| one-core-guard | PASS (*) |
| golive.sh (no --yes) e503c53e vs live 03a776e4 | FF ok, QUICKCHECK PASS 109 s, core gates PASS, old save ok, render 134/136 ms, tab 224/204, buổi 603/689 |
Looks (scratch only, not uploaded): Fold roulette 3×3 with one "Công chúa hòa thân · Rất hiếm" card, bd identity card (banner, name, rarity chip, lore, stats, Nhận / Đổi thân phận) clean; iPad bd card clean except the stat grid scrolls behind the pinned action rows — identical on the unchanged nc card → pre-existing kit behaviour (note for the kit keeper), not this branch.
READY FF origin-bd e503c53e sent to Foreman B ROOT 17/11 ~18:35Z.

## Open items (not mine to fix)
- C-AG / jworld: EVD.away "Cáo bệnh ở lại" writes w.x.f (world) from her card (same family as the đại xá fix).
- FOR MAIN: coop-one-world seed 9 `.R[#n].evm {}` dropped by guestNet (pre-existing, intermittent; Foreman B s6: note only).
- FOR MAIN: refs/remotes/origin/main in /home/user/cung-tuong-mong was stale; fetch with `+main:`.
- origin-bd reviewer follow-ups (a)–(d) stay open (bd/nc re-measure after arcs-r2v; NPC consorts never roll bd; story14-frame startsWith; road-saves stale expectations).
Worktrees /home/user/wt/lb2*, logs /home/user/wt/lb2-out can be deleted (everything pushed).
