# names-unique review r1 — VERDICT: PASS dcb2ea96
Reviewer session_01UV1Szgh9q48ZKZGafhknjL (BIG, opus) · coordinator main s24 · 11/16/2026 · START_CTX ~3 % (ended ~12 %).
Branch `review/names-unique-r1` = origin/main c1e1bbd1 (coop-name-mask golive) + review/names-unique b250c5ea + 3 reviewer fixes, site rebuilt;
origin/main is an ancestor (fast-forwardable). jcoopone.js / jnf.js are not on main yet: assemble.py merged clean (jname after j0, jnamefix last);
nmOwner() falls back to COOPW seat until worldOn() lands.

## Checks
| # | Check | Result |
|---|---|---|
| 1 | Every name site goes through the core (own grep of j*.js for SURN/GIVEN/MALEN/MAIDS/EUN/PRINCE/PRINCESS/QNG/CTG/NM_* and `name:` built from pools) | PASS. Old pools are aliases only; j54/j55 use SURN only to build avoid-sets, names from nmNew; WEDW / NPCFIX are titles, not people. Dynamic scan (walk of S for person objects outside nmPeople): only princes' wives `k.pW.*` and princesses' husbands `k.hW.s` (jht) — named by nmNew + registered, so 0 full-name dups; not swept by nmFix (jht nFix covers them). Minor, left. |
| 2 | 0 dup / 0 excluded / Chinese court style | PASS. names-unique 55y×6 lives = 330 years: 0 failures; stress 2000/kind 0 dup 0 bad; own probe 3×20 y: 0 dup, 0 banned, month sweep 0 renames. Samples read as Chinese court names (see below). |
| 2b | Given names repeating inside a role (owner: each person distinct) | PASS in play: own probe counts given names among the LIVING per role (f, m, maid, eun, eunE, doc, prince, princess): 0 repeats in all lives (the core blocks shared short forms among the living). The 'Thế Khanh ×3' sample was a test artefact: names-unique printed 10 nmNew() calls never held, so they could not see each other. Fixed the sample (held together, `more`): now 10 distinct given names per role. All-time (dead + living) repeats of a lady's given name: 2–3 of ~47 (different surname, holder dead) — allowed by design. |
| 3 | Old saves (origin/main build, 12 y × 3 lives) load in the new build | PASS after test fixes: player name kept, 0 dup, 0 excluded, 0 registry miss, a turn passes, 22–39 renames, 400–860 text refs rewritten. Co-op: coop-e2e "single-player + old save still load" ok. |
| 4 | Co-op: names from host, both seats identical | FAIL on b250c5ea → FIXED here (see R1, R2). New coop-e2e check "same names of the world people (consorts, their staff and kids, court) on both seats" after every week: worker build failed every week (old eunuchs and the friend's maid renamed on the host each week); main and this branch pass. coop-e2e 63/63 (run alone; a run in parallel with other heavy tests flaked on timing). |
| 4b | Open point: guest's own household checked only vs synced world | ACCEPTED with R2: the friend's people are never renamed on the host copy; they hold their names and the host's world people give way (the rename syncs to both seats). Residual: a guest-local name made the same week as an identical host name → the host renames its world person at its next sweep; both seats then agree. Rare, cosmetic, self-healing. |
| 5 | Perf | PASS. nmNew 0.5–0.65 ms/call, ~600 calls per 20 years. quickcheck dcb2ea96: QUICKCHECK PASS (open 2002 ms, old save ok, render 398/334, tab 530/619, buổi 1279/1674 ms new/live). |

## Reviewer fixes (on review/names-unique-r1)
- R1 `jname.js` nmNoSur/nmVars/nmBad: "Lão X Tử" (j25 ageInit turns a 45+ eunuch "Tiểu X Tử" into "Lão X Tử" on every load) was read as surname "Lão" + given, so every old eunuch shared the short form "Lão Tử" → the sweep renamed them to a new "Tiểu Y Tử", ageInit made it "Lão Y Tử", and so on: old eunuchs got a new name on every load / month, in solo too. Now a no-surname form like Tiểu; one living "X" eunuch at a time (internal key "@eun X"). Negative control: the new names-unique case fails on b250c5ea, passes here.
- R2 `jname.js` nmPeople + `jnamefix.js` nmFix: co-op friend's own people (rivals entry coop:true, its maid/staff/kids) tagged `guest`; nmFix never renames them (her next sync undid it every week and the seats disagreed) and lets them hold their names first.
- R3 `jstaff.js` elderName: a BAL first-holder ma ma name is also checked against the living short forms; before, a consort "… Uyển Hề" made the month sweep rename "Lạc Uyển Hề" (Lạc ma ma) mid-game.
- Tests: `coop-e2e.js` world-names check; `names-unique.js` old-eunuch stability case + samples held together; `names-oldsave.js` stale check ignores other people's longer names that contain the old one ("Mộ Dung Uyển Thanh" vs maid "Uyển Thanh" was a false FAIL), banned check exempts her own family's surname (player's name is hers).

## Samples (names-unique, held together, fresh save)
Ladies: Uông Tuyết Nhạn, Diêu Dao Cầm, Triệu Thanh Diên, Tiết Thục Hoa, Tề Yên Nhiên, Cố Uyển Thanh, Tạ Lan Âm, Tiêu Thư Dao, Vu Nhã Như · Men: Nghiêm Bách Xuyên, Lương Tử Mặc, Tề Tử Khiêm, Chu Thiệu Khang, Doãn Chính Khanh · Maids: Tư Kỳ, Liễu Nhi, Bảo Châu, Lục Châu, Bão Cầm · Eunuchs: Tiểu Hải Tử, Tiểu Lộc Tử; Tổng quản Lư An Thái, Khương Vượng Tài · Thái y Mạnh Bá Ngôn, Diêu Thừa Ân, Giang Thận Vi · Hoàng tử Vĩnh Ninh, Vĩnh Tường · Công chúa Hòa Huệ, Hòa Kính, Đoan Mẫn · mothers Lữ thị, Điền thị.

## Notes for the coordinator
- `dev/test/coop-chat.js` fails "both players are in the shared world" on this branch AND on origin/main c1e1bbd1 (main fails 2 more checks: unmet-friend signature, guest header chip). Pre-existing, not names; worth a coop owner look (CO-OP FIRST).
- When review/coop-one-world (worldOn) lands, nmOwner switches to it automatically; re-run coop-e2e then.
- No UI / kit change in this branch.
