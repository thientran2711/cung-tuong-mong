PRIORITY #1 CHECK ('Bắc Địch|origin-bd|ORIGIN_BR|k:"bd"'): OD 14 | ledger 0 | claims 8 (only this job, CLAIMS L662) | main 15 (jorigins.js ORIGINS.splice k:"bd"; j69 OW69.bd; jk2b KIT_OW copy; jrd_nc bd aliases) | review/* 1 (review/origins-r1 968ed007 = already on main, still a 10th origin → reused as the base, nothing rebuilt)

# origin-bd-branch — Bắc Địch becomes a COUNTRY BRANCH of the hòa thân origin (B37, OD:L1213–L1220)
Worker session_01N1tNP2P9Eko2vdenJRPyk3 (opus). Branch review/origin-bd-branch. START_CTX ≈ 6 % of the window (rollover at 31 %, never > 60 %); finished below it.
Brief note: the first TASK block of the brief (staff caps) was pasted by mistake (Foreman B s2 correction 07:3xZ) — not touched.

## What changed (nothing rebuilt; other origins untouched)
| # | Where | Before | After |
|---|---|---|---|
| 1 | jorigins.js:9 | `ORIGINS.splice(... {k:"bd",...})` = 10th origin, own roulette card | `ORIGIN_BR.bd={par:"nc",k:"bd",land:"Bắc Địch",...}` = country branch of hòa thân; no card of its own |
| 2 | j1.js (ORIGINS, same j1 pattern as Nam Chiếu) | — | nc gets `on:"Công chúa hòa thân"` (the origin's card name) + `land:"Nam Chiếu"`; `ORIGIN_BR` registry + `originByKey(k)` / `originRoot(k)` / `originBrPick(k,r)` |
| 3 | j69.js roll | OW69 typed table incl. bd:7 (137 total) | ONE CORE: `BAL.orig.ow` (approved 11/14 table, hòa thân slot nc = 6); then the branch is rolled from its own derived seed stream with `BAL.orig.br.nc` |
| 4 | j69 pre-rolled lives | ow=1 (before bd) / ow=2 (bd separate) | ow=1 → old table; ow=2 → frozen `BAL.orig.ow2` (bd may come, as shown to her); new rolls ow=3. Nobody is re-rolled. |
| 5 | j69 rarity chip | by own key | by `originRoot` (a branch shows its origin's rarity) |
| 6 | jk2b roulette | 10 cards (3+3+3+1 orphan in portrait, old KIT REQUEST 2); private `KIT_OW` copy of OW69 | 9 cards, one "Công chúa hòa thân" card; bd life lands on it (target = originRoot); `KIT_OW = BAL.orig.ow` (duplicate table deleted) |
| 7 | j2 start / j6 deser / jcoopthin / j60 | `ORIGINS.find(k)` | `originByKey(k)` → old saves with ok:"bd" load as hòa thân + Bắc Địch branch (S.origin.par = "nc") |
| 8 | j72 dich_thu | only `k==="nc"` | every hòa thân branch (`originRoot==="nc"`) |
| 9 | jroute escape step | text hard-coded "Nam Chiếu" for nc only | `nhà ở ${S.origin.land} xa xôi` for every country branch |
| 10 | BAL (jbal.js orig) | — | `ow`, `ow2`, `br:{nc:{nc:1,bd:1}}` |
Kept as is (branch keys, work unchanged): STORY.bd / QUEST67.bd / ARC67 bd_* (story road), jrd_nc bd_* aliases + NCL tokens, fam_bd letter, CM_SRC.bd (home-country maid), BAL.home.bd, bg/wide art, Phúc duyên (bd not hard → none).

## Whole family scan (LUẬT SỬA CẢ NHÓM): every `origin.k` / `ORIGINS` reader in the 280 assembled modules (script in report history: grep `origin\??\.k` + `ORIGINS`), classified
- origin-level (must see the ONE hòa thân origin): roulette (jk2b), rarity chip (j69 ×2), pre-roll (j69), save load (j6, jcoopthin), name lookup (j60), envoy translation (j72), escape text (jroute) → all fixed above.
- branch-level (Bắc Địch keeps its own road): STORY/QUEST67 lookups (j2, j4, j6, j67, jgoal, jstory, jtabs, jchap), letters (j72 fam_*), close maid (jcmaid), home money (jecon, jeitem), art (jgoal, jtut, jreign, j58), roads (jrd_nc) → unchanged, correct with key "bd".
- n/a for hòa thân: tt/dtq/ch/cnv/td/thd/muoi/cn checks (j10, j55, j67 dad, jkc, jreign, j42, jst14, jtq14, j88, jkiep) → unchanged.
- NPC agents (new jagent on main): NPCs never take bd (BAL.ag.org has no bd) → nothing to do.
Open (not built, feature freeze, note for Foreman B): j96 love-arc men role exists only for Nam Chiếu (TM96_W.nc "Phó sứ Nam Chiếu"); a Bắc Địch envoy role is new content. Emblem img/kit/origin-bd.webp (old K12) stays open; bd shows no seal as before.

## Bot measure — Bắc Địch branch only (OD:L1218/L1220), same smart-bot harness as j69 (run_par + inpage6 sens + inty, seeded)
Harness fix first (measurement tool only): on current main every life ended TIMEOUT — the bot picked a locked option (`off`, "thiếu chứng cứ …") that chooseM refuses. inpage4/5/6 now skip off / lk / need / mood-locked options and fall back to another option (main had just added `!c.off` to inpage6; merged, mine kept as the wider filter).
| branch | n | Hoàng hậu % | median years to HH | early death % | roulette share |
|---|---|---|---|---|---|
| Bắc Địch (bd) | 45 | 44 | 10.3 (p25 4.4 / p75 13.4) | 44 | 3 of 130 (half the hòa thân slot) |
| Nam Chiếu (nc) — CONTROL only, same bot today, its number not changed | 32 | 28 | 10.1 | 41 | 3 of 130 |
Reading: bd − nc = +16 pts ≈ 1.5 SE (±11) → not a real difference; both sit in/at the edge of the 20–40 % band; bd is NOT harder than Nam Chiếu, so by hard → rare it is not rarer. Decision (ours, no owner question): hòa thân slot stays 6 (approved table), split 1:1 (BAL.orig.br.nc = {nc:1, bd:1}); no start-stat change; no Phúc duyên bonus. Roll check (6000 seeds, ow=3): nc 175 / bd 172 (expected 180/180).
Seeds: run_par seed 1, 4 pages; first life of each page is a random origin (dropped). Raw: 48 + 36 lives.

## Tests (this branch, base main 9391f9a9 merged)
- origins.js 28/28 at 755x1000@2 and 1180x820@2 (9 cards, one hòa thân card, bd lands on it, lore, arcs end, fam_bd, round trip, old ok:"bd" save → bd/par nc, ow1 never bd, ow2 frozen, ow3 split) — re-run on the final merge: 28/28.
- tut-origins-scan 10/10 (9 origins + bd branch; chapter 1 nhap14 + quests).
- tut-quests TQ_ORIGIN=bd 35/35.
- road-rare ALL PASS. road-saves: tt/nc/bd mid-road PASS (bd keeps bd_ngua); 2 FAIL (dtq main-build "no road state", td "phase-1") = SAME 2 FAIL on pure main (stale expectations, roads landed) → not this branch.
- story14-frame: bd added to its origin list (ORIGIN_BR) → bd walks 1..14 (bd_hoang). Its cnv chapter-skip FAIL + `chAdvance67 p.startsWith` crash happen identically on pure main → not this branch (ticket for Foreman B).
- one-core-guard 0 fails (inline 6671 < baseline 6691, no --allow-grow). road-option-scan FX ALIGN 3 = same as main.
- quickcheck PASS (old save ok, core gates PASS, perf new/live render 293/313, tab 357/394, buổi 957/1019 ms). coop-e2e 62/62, coop-one-world PASS (re-run on the final merge).
- Shots (scratch only, looked at): Fold 755x1000@2 + iPad 1180x820@2 roulette (9 cards, 3×3 / 5+4, no orphan) and bd identity card ("Công chúa Bắc Địch hòa thân", lore, rarity chip). No new UI part (kit only).

## Coordination
- Foreman D review/story-frame (7be4cdc6): keys STORY.bd / ARC67 bd_* / f67Mig untouched by me; one nearby edit in jorigins.js (my line 9 vs its removal of the hand `story67Wrap("bd")` at lines 13–15) → trivial merge; whichever lands second keeps both.
- Player-visible words: roulette card "Công chúa hòa thân" (VANPHONG cổ trang, no %).

SẴN SÀNG KIỂM 24c23752be09d4ed666961195d59510b23c6153c
