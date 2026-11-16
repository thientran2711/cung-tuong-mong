FAIL
1. **jroute (main, routes-port) NPC acts bypass the shared motive gate + record (OD:L34, OD:L35, OD:L188).** `rtCaughtBy` (dev/build/jroute.js ~L111-112) makes a consort blackmail her (`T.bm`, card `rtBm {v}`) on `greedy||roll(55)` with its own `aff>=45` check, not `motiveOK(v,S,…)` / `j95actLog`; `rtBm` and `rtNpcEsc {v}` are not declared in P95B (audit (g) will flag them whenever they fire; rand shard 4 flagged the sister card `sgpick`, fixed below). Route both through the shared gate (hostile role for rtBm, witness role for rtNpcEsc) and declare them in P95B.
2. **jroute witnesses come from outside the record.** `rtWit(k)` and `rtNpcMeet` read `S.where[v.id]` (a view that can lag the record), and `rtSeen` falls back to ANY consort with `mat>=2` (55 %) who is not at that place: someone "sees" her who is elsewhere in the ledger. Use `whereOf(v)` / `S.roster` at the current khắc; no witness from another place (no fallback pool), or the record must move her there first with a reason.
3. **LUẬT SỬA CẢ NHÓM**: scan every card main added since schedules2 whose params carry a consort id (my static scan: rtBm, rtNpcEsc, rtNgNpc, sgpick; h54show/j97x/tsbPetGift/rg carry strings, not consort ids). Paste the before/after table.
4. Start from **review/schedules3-r3 @ 94edaf9f** (already on origin/main 73c06812, with my two declarations); re-run roster_audit sens 18 + rand 18 shard 4 (give rand a longer `timeout`; on a shared 4-core box it hit the 50-min kill once), stage-counts ×3, roster_dom ×3, oldsave, coop-e2e.

Everything else PASSES: all four r1 items are fixed at the root, the final reconcile is safe (below). This FAIL is only about the main module jroute that arrived after r2.

# review/schedules3-r3 — independent review of review/schedules3-r2 @ 4ea772f3 (D29, Foreman C)
Reviewer branch **review/schedules3-r3 @ 94edaf9f4191643ba226714fe0b79deab601b027** = r2 + merges of origin/main 9ddb3f6c → e9c6021d → 73c06812 (main moved twice during the review) + one reviewer fix. Every merge conflicted only in assemble.py / index.html / sw.js: I took main's list and put back `jk95` after `jk2b` and `j95, j95b, j95c, jqsave` just before `jkpc`. Main's new modules (jdiff, jcol, jroute, jchap, jsgame, jcycle; jmort, jtoilr, jlux, jne, jbac, jdis, jmem, jorigins, jeitem; jact2, jmline) are in main's order. Site rebuilt with dev/site/build_site.sh each time.

## r1 FAIL items: really fixed at the root?
| r1 item | r2 fix | verdict |
|---|---|---|
| 1 her servant in lãnh cung not drawn | audit learns kind `serv`; drawn servant absent from record leaves | fixed (test gap + reverse check). lcStage 1 274 checks, 0 |
| 2a nvp eunuch not drawn on some arrival | audit learns kind `peddler`; j95stage draws him from the record on any arrival | fixed |
| 2b nvp map 2 / record 1 (in lãnh cung) | countAt("nvp") always removes jact's +1; `j95vis(c:ped,nvp)` needs `j95nvp()` | fixed at the root (one rule in every state) |
| 3 home elder map 2 / record 1 | record re-applies `j95elderK` each sync; `j95elderFix` makes stage + homePeople follow | fixed at the root |
| 4 vuon 3→5 (j22 stale men) | a drawn `man` absent from the record leaves | fixed; stage-counts 4 runs 0 |
| 5 full re-run | see Tests | done |
| 6 API for D13 | additive | OK (below) |

## j95final (new outermost reconcile): can it break anything?
- **Wrapper order**: installed with setTimeout 0 after j59's and jplx's countAt timeouts (registration order), so it wraps renderStage/goTo/spend/nextBuoi/endTurn/coldVisit/talk/closeModal/chooseM/homePeople outside every module, including the ones loaded after j95 (jact, jact2, jkc, jhouse, jmem, jeitem, jroute's goTo/nextBuoi). No other module installs a late (setTimeout) wrapper of these functions (grep). The game runs only after the boot cover, so the timeout is in place before play.
- **Other modules**: the branch touches no main file (diff vs origin/main in dev/build: j95, j95b, j95c, jk95, jqsave, assemble.py only). It removes only stage entries the record knows (rival/hh/emp/th/man/min/ty/ksp/serv/peddler/fallen/elder); only j22 makes `man` entries. Main's new modules add no stage people (jroute/jcycle/jmort/jmem/jact2… grep: no `people.push`). jmort's deaths are removed from the record (sens: 4 deaths, (e) 0).
- **Co-op**: `j95on()` is false while `COOPW.on`, so j95final returns at once. coop-e2e **59/59** (twice).
- **Trips (jkc)**: `isKc()` → return false before touching the stage; jkc's own renderStage swap is inside.
- **Old saves**: roster_oldsave (save made on a main build without j95 → this build): loads at 755x1000 + 1180x820, record built on load, 48 checks, 0 bad, 0 errors (run on main 9ddb3f6c and e9c6021d bases).
- **Performance**: j95final 0.003–0.10 ms per call (300-call average, 1180x820, 0–10 people on stage); renderStage 5–30 ms with or without the ledger (noise). No cost worth noting.
- Note: the wrappers on goTo/closeModal/… call renderStage a second time only when the stage list changed (j95final returns true).

## Tests
| test | on main 9ddb3f6c merge (ec649e19) | on main e9c6021d merge (caaa42f7) |
|---|---|---|
| roster_audit **sens 18**, CAP 3300 | 16 626 checks; (a) 2 "cnv T7 spend thiếu m4" (known one-khắc gap at maid→consort promotion, PROGRESS L100), rest 0; page err 0 | **17 567 checks, all (a)–(r) 0**; page err 0; J95/J95B/J95C errors 0; knownTgkElder 14 463 |
| roster_audit **rand 18 shard 4** | time cap, 9 lives, 60 175 checks, all 0 | time cap, 16 lives, 50 542 checks: **(g) 1** `sgpick` (jsgame, main) → fixed by me (item 1 family); rest 0; page err 0 |
| stage-counts.js | ×3: thd 145/141/151, cnv 66/65/67, 0 mismatches, 0 errors | thd 147, cnv 66, 0 mismatches |
| roster_dom 755x1000@2 / 1180x820@2 / cnv | 20/20/20 moments, 0 bad, 0 page errors | same, 0 bad; again 0 on 73c06812 (755) |
| roster_oldsave | 0 bad, 0 errors | 0 bad, 0 errors |
| coop-e2e (live Worker) | 59/59 | 59/59 |
| Playwright direct 755x1000 + 1180x820, host mode (device.js openHost) fold + ipadAir, iphone14 host | stage count = map count = record at every size; no horizontal overflow; 0 page errors; iphone14 host = rotate prompt "Xoay ngang điện thoại để chơi" | same (all 5) |
Screenshots looked at: Ngự hoa viên stage + side column at 755 and 1180 (direct and host), Dư đồ map at 755 (counts "1 bóng", "4 bóng" readable, no cut names), rotate prompt at 390x844. One figure still a grey placeholder at first paint (picture loading, main's KIT §59 behaviour, not this branch). Test pages note: I removed the first-run download cover (#kload) and set `__bot` while auto-playing to skip the card-flip, only in my shot script.

## Reviewer fix on r3 (74854ea8)
| file | change |
|---|---|
| dev/build/j95b.js | P95B declares `sgpick` (jsgame scheme pick) and `rtNgNpc` (jroute blood-test accusation) as her own picks `{v:{me:1}}` (they are her acts, not NPC acts) |

## Other checks
- **Ledger API (Foreman B D13, review/spread-events @ 44c7f074)**: jspread uses `j95on()`, `S.roster.P["v"+id]`; jk95 there uses `j95habitsMine()`. All kept; r2 changes are additive (new `j95final`, `j95elderFix`, `j95elderEntry`; nothing renamed or removed).
- **ONE core (OD:L1267)**: r2/r3 add no player-visible numbers. Internal dice in j95 stay local as on the PASSed schedules2 (not shown to the player).
- **Kit**: no style in j95*/jk95/jqsave (grep 0). **KIT REQUEST K14** (two-shadows map mark, "N người theo hầu" tag line) still pending at the kit keeper (FOREMAN_C_STATUS L204); nothing private drawn. Not a FAIL reason.
- **VANPHONG**: new r2 strings are record reasons ("bày hàng mua từ ngoài cung ở Nội vụ phủ", "giữ chức trong cung", "đi bán hàng rong kiếm lời"): cổ trang, no %, no "có thể".
- **Audit change (h) placeWhy**: a card that places a consort and then confines/banishes her counts as "record says why" (the (h) rule's own exception). Accepted.
- Non-blocking, known: sens (a) "thiếu m4" for one khắc at a maid→consort promotion (stale `S.menWhy` until the next buổi) showed on one of my two sens runs; the worker may close it while doing item 3.

## Open (unchanged, for the owner/coordinator)
Q15 co-op ledger (off in co-op; OD:L96 lists the ledger among shared world facts); Q16 maid-road cap of 4; jhouse vs jplx servant rest; main bugs knownTgkElder and jmen 3-buổi.

## Handover
Reviewer done; no successor needed. Worktrees /home/user/wt/sch3r3, sch3main, sch3docs to be removed after push.
