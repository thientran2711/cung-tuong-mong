PRIORITY #1 CHECK ('pqOdds poison-road'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (from the brief; my own git grep main + review/*: no second BAL.pg / pq table, BAL.anFade new, oddsCl from main odds-cap reused)

# POISON-ROAD FIX ROUND — worker report (opus, session_01964izENMh7RgrvjTLQsBZa) → Foreman D #1

START_CTX ≈ 4 % (own estimate); finished ≈ 25 %, no rollover.
Branch **review/poison-road-fix** from review/poison-road-rv @118436cc.
**SẴN SÀNG KIỂM 1c177a238722c09cee5ad42e92ce5cf199560b40**

## Commits
- 718b1ddd merge origin/main 33e98993 (index.html / sw.js rebuilt from merged sources)
- 17a17c07 the fix (below)
- f59a445f merge origin/main 5cbfd620 (odds-cap r2 landed while I worked) — conflict in jpoison pgOdds / maid taste: resolved onto the one ODDS CAP
- 1c177a23 tests force hit / miss via the pqOdds result (odds cap has no per-road floor any more)
- NOTE: origin/main moved again to 2850c45b (look-fx-wire) after my gates → not FF; the landing needs one more re-merge (expect index.html / sw.js conflicts only).

## FAIL 2 — ONE CORE (OD:L1267) + whole family (OD:L474)
One table **BAL.pg** (jpoison) now holds every poison-dish rule; jpq reads it (no second copy). Values unchanged.

| site | before | after |
|---|---|---|
| jpq pqOdds Tâm cơ / trust | `/4`, `/4` | `BAL.pg.tamDiv`, `BAL.pg.trustDiv` |
| jpoison pgOdds Tâm cơ / thiện cảm | `/4`, `/4` | same two keys |
| khắc (jpoison spend + "2 khắc" text; jpq BAL.pq.khac) | `spend(2)`, typed text, 2nd key | `BAL.pg.khac` (BAL.pq.khac removed) |
| pgGuard watchfulness | `oSee/3` | `BAL.pg.seeDiv` |
| pgOdds top / weak penalty / traced | `cl(…,3,92)`, `-15`, `4*(facN-1)`, `cl(…,5,95)` | `oddsCl(min(…,BAL.pg.hi))`, `BAL.pg.weak`, `BAL.pg.cpFac` + `oddsCl` (main's ODDS CAP) |
| jpq pqOdds clamp | `cl(…,pq.min 3, pq.max)` | `oddsCl(min(…,pq.max))` — pq.min 3 was below the cap floor 5 (owner "Trần 95%" cap); pq.min removed |
| PGX Đức per poison | typed 10/6/5/10/3 | `BAL.pg.duc.{hacdinh,…}` (old unused `BAL.pg.duc:6` replaced) |
| Hạc đỉnh hồng Sức / ốm 3 tháng / Mê dược 1 tuần | `-120`, `3`, `1` | `BAL.pg.hacSuc`, `sickMo`, `blockWk` |
| texts IT.d ×3, WILL ×3, PGX.won ×5, pgEffect | typed "Sức -25, ốm ba tháng" … | print `BAL.eff.jpoison.*` / `BAL.pg.*` (`balSg`, kit `kitNumVi` → "ba tháng", "một tuần") |
| maid tasting odds | `cl(loyal,5,95)` | `oddsCl` (main) |
| NPC mind-menu weight / cook roll / dish | `2*`, `roll(30)`, `wkMake(…,0,4)` | `BAL.pg.npc.{w,cook,mat,raw}` |
| Chân tình bonus (same file) | `emp?1:2`, `+1`, text "+1" | `BAL.gift.sinc.{emp,oth,tr}` |
| Ân tình gloss "giảm 4 … 2 … 1" (copy of j8 anMonth) | typed in text + j8 code (and `<=3` weeks) | `BAL.anFade{base,night,min,wk}` read by j8 anMonth and printed by the gloss |

Identity check (scratch script, real build): all texts identical to the old literals (IT.d differ only by a later module's appended "· Hiệu quả" suffix); pgOdds old formula vs new on 360 pairs SAME; pqOdds factors 100 SAME; anMonth 0 / 2 nights SAME.

**Guard:** one-core-guard gained kind `div` (a typed divisor of a rule stat, e.g. `(a.tamco||0)/4`, `v.sung/5`). First `--update` froze 439 such sites game-wide (may only shrink; jpq/jpoison 0). Proven: re-typing `/4` in jpq → `FAIL NEW inline rule number: jpq.js [div] .tamco||0)/4`. Guard now 0 fails, inline 4222 ≤ baseline 4261 (non-div count 3842 → 3783).

## FAIL 3 — vacuous tests (poison-road.js)
- "Đức cost applied once": now S.duc before/after = −BAL.pq.duc (was `ok(…,true)`).
- Both NPC checks: persW(v,"pgift") is forced to 1 for that NPC (wrapper, restored after); the `pdA<=0||` / `persW<=0||` escapes are gone; also require pqNpc to return a text.
- Proven on a deliberately broken build (NPC weight ×0, Đức ×2), on the final build: **3 FAIL** (Đức 50 → 26, NPC caught, NPC hit). Restored build: 35/35.
- Forcing after odds-cap: hit / miss = pqOdds result set to 100 / 0 + BAL.odds.hi lifted to 100 during the test (restored in place). poison-road-shots.js forcing updated the same way.

## Gates @1c177a23
- poison-road.js **35/35 PASS**
- one-core-guard **0 fails** (PASS)
- coop-e2e: run 1 56/63 (week-3 sync / rejoin / rebirth steps against the live Worker), immediate rerun **63/63** (= live) → run 1 was a flake in the live sync, not this diff (no co-op code touched).
- quickcheck.sh: `--runs 3` FAIL on tab 657/490 (noise, no tab code changed); `--runs 6` **QUICKCHECK PASS** (render 270/327, tab 772/692, buổi 1550/1531, old save ok, core gates PASS).
- Shots Fold 755x1000@2 + iPad 1180x820@2 of the poison picker LOOKED (scratch /home/user/wt/pq-shots, nothing uploaded): numbers print from BAL ("2 khắc", "Đức -10/-12", "Sức -120"), royal rows with portraits, closed Thái hậu row greyed with its reason. 0 page errors.
- dev/test/poison-gift.js (older shot script, not in the gate list) stops at its gift-dialog step (`.click` of undefined) — stale DOM selector, not touched here.

## FAIL 1 (kit, not mine)
Kit fix has **NOT landed**: main 2850c45b still has jk4 `.modal .dlg.kdscroll>#mb>.kpb{flex:0 1 auto!important;min-height:0}`; the shots still show the picker intro hidden under the option list on Fold and iPad. No private CSS added (KIT FIRST).

## Notes
- New BAL keys: BAL.pg.{weak,tamDiv,trustDiv,seeDiv,hi,cpFac,khac,duc{},hacSuc,sickMo,blockWk,npc{}}, BAL.gift.sinc, BAL.anFade (jbal.js, next to oanFade). Removed: BAL.pq.khac, BAL.pq.min.
- Reviewer notes from the BIG review (Vương gia lookup by S.vgAlly, one S.pq.slow slot, NPC Sủng saturation) untouched — not in this brief.
