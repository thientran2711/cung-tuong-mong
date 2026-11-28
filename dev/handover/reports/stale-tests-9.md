depth 3
# STALE-TESTS-9 — successor of STALE-TESTS-8 (worker of MAIN CHÍNH 189 session_01Rc5AsKLcnai97YwjFT5YMc)

PRIORITY #1 CHECK: OD law 2 tiers (27/11 ~00:46Z), act-merge jdoor (26/11 ~07:25Z), kitRing (26/11 ~18:55Z) | main dev/build/jone.js:186-191 (PEND.door TIER card), jkring.js:236-247 (ring say/choices), jkring.js:334-338 (pager → ring), jkpick.js:92-97, jfocus.js:48-49 | review/lr-rules-r3 aecbc267 (new base), review/stale-tests-8 6aa2f96c | claims none other

Branch: **review/stale-tests-9** (base **review/lr-rules-r3 aecbc267** = LR-RULES newest tip: rules chain + stale-tests-8 incl. perf fix abda1390 + LIVE c03d6ee7 merged). Test-only.
- c9f9a086 + 965fa2af = stale-tests-8 4c77dd12 + 6aa2f96c cherry-picked (clean)
- 86af2d96 emotion-acts-2 kinds/plock + emotion-acts lock
- c00c84fc temper-perception math isolation
- (review/stale-tests-8 6aa2f96c = the same tp commit on the old base; superseded by stale-tests-9)
**MODGATE** vs LIVE c03d6ee7: assemble.py quoted *.js 513 ⊇ LIVE 508 (0 missing); 0 LIVE files deleted; every line LIVE added since a96564ad (j63.js, KIT.md, KIT_REQUESTS.md) is on the branch; index.html/sw.js = aecbc267's rebuild (tests only after it).

## Results on review/stale-tests-9
| test | result | note |
|---|---|---|
| temper-perception (755x1000@2, 1180x820@2) | gateYes, label, math, eaHook, npcMood, oldsave **PASS**; gateNo **FAIL on a REAL KIT BUG only** | see bug 1 |
| emotion-acts-2 (6 sizes) | **PASS** all | kinds, plock fixed (TEST LIE) |
| emotion-acts (6 sizes) | lock **PASS** (3 sizes fixed); `hit` 1000x755 overflow seen again in the 6-size run | see «hit» below |
| world_check | **PASS 25/25** | new base |
| feelings18.test.js | **34/34 PASS** | |
| temper-outburst (3 sizes) | **PASS** | |
| ag-all.test.js | 1 FAIL perf only: p95 **8.9 ms** vs BAL.ag.perf.p95 8 | same as STALE-TESTS-8 (LIVE a96564ad 8.3 on this container also fails); budget NOT changed |

## What was wrong (each proven)
1. temper-perception gateNo/gateYes — the door «Khiêu khích» (P6) is a jone TIER card: «Chọn mức. <tên>» is said in the RING say box (jkring adapter.say, `.kring-say`, typed line; a tap on the ring layer finishes it, the next moves on), then ≤3 tier plaques (kitPick: tap = lift, «Chọn» ✓ chip `.khconf .khok`). Rows are not `#modal .dlg .opts` buttons. The harness now taps through the say box, reads the tier holding provoke from Q[0].pp (ONE.members/ONE.tierOf, read only), gateNo = that tier is a closed plaque (all its ways closed, row «chưa có cớ»), her tap + its «!» change nothing AND the reason must be visible; gateYes = Oán 45 → the row names «cớ: oán 45», provoke is the one free way of its tier (vừa), lift + «Chọn» → regard drops, provoke judged by the onlookers, «Người chứng kiến» in Sổ. The «rank lock» seen once by STALE-TESTS-8 did not show again (setup keeps her not above).
2. temper-perception label — Phi tần is ONE kit pager «‹ tên · i/n ›» (jkring §104.2 wiring B): tap → ring of the list → real › turns until she is in front → front tap → «Xem» plaque + «Chọn» → her card, «Khẩu xà tâm Phật» visible. The strip ring's people carry a different object than liveRivals (matched by name). ringX also closes a ring result card («Kết quả … Tiếp ▸», `.kres-next`) with its own Tiếp first (else the ✕ sits under #kxcatch — kit rule «first tap outside only closes», jk4.js:969, not a bug).
3. temper-perception math — in some lives the judge already knows the doer's mood cause (the life's own record) → every «no reason» run acted «reason known» (base = nhân −2, apNo 20 on Fold). The no-reason runs now set moodCauseKnownBy → null (prepared state, like the reason runs).
4. emotion-acts-2 plock / emotion-acts lock — TEST LIE: they read #modal in the same sync call as showModal(); the card is painted later by the day queue (jdayq), so they read the start card («Đổi thân phận …») or nothing. The game was right: «[x] Rót rượu, nũng nịu … Cần: ta đang phẫn uất, tính nóng, không nũng nịu nổi», «Nhịn … Cần: ta đang phẫn uất, tính nóng, không nhịn nổi». Checks now run after the dialog is up and also need the «Cần» reason (+ «Đáp trả» open for lock).
5. emotion-acts-2 kinds — (a) the same sync read of #dawn; (b) the week window was logSeq−12 = only the last 12 of 40 outburst lines (staff), never the Emperor / Thái hậu rows it checks → window = this case's first outburst. (c) one 1000x755 run had `c:ghen:cham` «no stat moved»: not reproduced in 3 reruns + a 30×N in-page probe; the snapshot now also holds HER Danh / rl / ro and the rivals' rel/rl («Châm chọc» may target her), and a bad row carries its result line for next time.

## REAL GAME BUGS
1. **KIT (also on LIVE c03d6ee7; reported to MAIN 189 + KK70 session_01Rc5AsNMwzXdmhSRS6Qq64i)**: in kitRing a CLOSED plaque never shows why — its «!» badge (.kfoc-i from jfocus btnHTML, off && why) is dead: the kpPop handler is bound only on the kitFocus element (jfocus.js:48-49), ring plaques are hosted in the ring layer (jkring pickOpen host R.L), and jkring never passes kitPick onOff (jkpick.js:92). Repro: temper-perception gateNo (tier «Khiêu khích · vừa» «chưa có cớ»; or the whole door plaque closed). Kit-first: not fixed here.

## emotion-acts `hit` 1000x755 (`.opt.ka.kart.kopt.khideout.kback` + art past the .dlg right edge)
Seen in 3 of 5 six-size runs (STALE-TESTS-7, -8, -9), never in 7 single-size runs (EA_ONLY=hit ×5, full ea at 1000x755 ×2 with an overflow probe). In the failing run the screenshot is the TITLE cover over the dialog (a player cannot see that dialog); the card is a hidden-outcome card (kitHideOut). **Not proven a real kit overflow** → not reported as a bug; next step if MAIN wants: a 6-size run with the probe (dump rects + hide the cover + screenshot) to catch it.

## MUTATE (break → red → restore; index.html patched in a scratch worktree, `git checkout index.html` after each)
| mutation (one string in the built index.html) | test | result |
|---|---|---|
| jtperc gate `if(!g.ok)return` → `if(false)` (no reason needed) | tp gateNo | **red** (way.lock false, tier row open — independent of the kit-bug check) |
| same → `if(true)` (always closed) | tp gateYes | **red** |
| label word «Khẩu xà tâm Phật» → «… Ph» | tp label | **red** |
| `BAL.trong.off=0` (tail script) | tp math | **red** |
| `/^Rót rượu/` lock → `/^ZZZ/` | ea2 plock | **red** |
| eaDo `case"noi":` → `case"noi_x":` (Emperor anger moves nothing) | ea2 kinds | **red** |
| punish angry-Emperor `a+md*Q.mo` → `a` | ea2 punish | **red** (the old `BAL.punW.mid.m=[2,3,1]` mutate stays green by design: the test reads BAL on both sides — ONE CORE) |
| `EA_HOLD` lock → `false&&` | ea lock | **red** |
| jworld `/quan tham/i` → `/Quan tham/` | world_check | **red** (1/25: court roll kinds) |
| her Đập đồ price line `F.bac` → `F.bac+3` (jemoact:349) | temper-outburst | **red** (`BAL.ea.fx.dapdo.bac=0` stays green by design: price and check both read BAL) |
| jfeel fin `k1:…+feelActDur(r.k)` → `+1` (jfeel:284) | feelings18 | **red** 33/34 (`feelActDur=()=>0` stays green: the test's expected timer is the same function; the feelActFin path jfeel:295 is not covered by feelings18) |
| `BAL.ag.day.on=0` | ag-all | **red** (6 FAIL: day plan, hybrid day, consort deeds …) |
| perf fix off: `n>=chNeedLo(t,x)&&n>=chNeed(t,x)` → `n>=chNeed(t,x)` | ag-all perf | **red** p95 **119.8 ms** (fix on: 8.9) |
All restored (`git status` clean).

## Not done / for the successor
1. KIT BUG «closed plaque in kitRing shows no reason» → kit keeper (KK70). When fixed, temper-perception gateNo turns green with no test change (it already taps the plaque and its «!»).
2. emotion-acts `hit` 1000x755: catch it in a 6-size run with an overflow probe (rects + cover hidden + screenshot); only then report.
3. emotion-acts-2 kinds `c:ghen:cham` (one 1000x755 run): the bad row now prints its result line; read it if it comes back.
4. (STALE-TESTS-7 item 7, still not done) scan the other jworld / jagmin regexes that read event TEXT for the case trap.
5. feelings18 does not cover jfeel feelActFin (jfeel:295) — note only.
Container-local (lost with this session): worktrees /home/user/wt/st9r (branch), /home/user/wt/mut (mutations), /home/user/wt/live (LIVE c03d6ee7); mutation runner = scratchpad mutate.py (string-replace in index.html + run + `git checkout index.html`), easy to remake from the table above. Tests run fine from file:// URLs (a local http server was refused by the auto-mode classifier).
