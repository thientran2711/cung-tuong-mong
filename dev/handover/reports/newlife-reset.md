# newlife-reset — report (worker session_01UV1SzgyQP6eCJz2hmcnLrF, coordinator main s28)
PRIORITY #1 CHECK ('new life reset|leak|carry|kiếp mới|S.vl|vmem|lifeStore'): OD 1 (the 03:22Z bug line itself) | ledger 0 | claims 1 (own row) | main: j2.js:3 + j6.js:80 kmReset (scenes/overlays/queue), jflip.js:222 life token, j68.js:161 EVHOLD reset in start() only | review/* 0 (no other branch touches S.vl / jvoice memory / a life registry). Related: review/tuanluc-sync (week-book attribution) — not overlapped: this branch only removes ONE false line from S.logs of old saves (vlScrubLog) and touches no log() call site.

Branch review/newlife-reset (from origin/main 7abaf07a). Commits 47d4f213 (fix + registry + tests), 521d7bae (site rebuilt + test allow-list + family scan).

## Root cause (owner: "mới vừa tạo lại kiếp mới mà vết thương trên mặt đã lành là sao?")
Not state from the previous life: a FIELD COLLISION in the current one. `S.vl` is the worn-veil entry of jveil ({k:"mcPG"|"mcnt"}).
jvoice kLine (palace-voice, 16/11) also kept its no-repeat line memory in `S.vl` (`S.vl=S.vl||{}`). On a brand-new life the first spoken line
made S.vl={…}; the veil checks (monthTick / endTurn / normAll vlSync) saw "a veil on a face with no wound", logged
"Vết thương trên mặt đã lành, ngươi tháo mạng che, cất vào rương." and pushed the memory object into her chest (an empty, nameless chest entry).
It shows on every life, first one included, as soon as anyone speaks — the owner saw it on a new life because that is where her week book starts.

## Fix (root, not per field)
1. jvoice: line memory lives in `S.vmem` (S.vl = worn veil only).
2. jveil `vlFix(p)` (run by vlMig / vlSync / vlOff / KIT_VEIL.on / normAll): a non-veil S.vl moves to S.vmem; memory objects already in a chest
   are taken out; the false healing line is removed from S.logs when she owns / wears no veil (a real healing always follows a real veil).
   KIT_VEIL.on answers vlIs(p.vl), never plain truthiness.
3. ONE per-life registry `lifeStore(name, reset)` (j1.js, loaded first; `window.LIFE_STORES` = names). j93 kmReset runs every entry; kmReset
   already runs on start() (new game, Luân hồi rebirth, co-op new life), slot load and title. Registered stores (found by the leak test):

| store | module | before (main) | after |
|---|---|---|---|
| S.vl line memory | jvoice | false "vết thương đã lành, tháo mạng che" line + nameless chest entry on a new life | S.vmem; old saves cleaned |
| ECON_AT | jecon | kept the old life's actor/target (scheme price getter) + their names | reset |
| EVHOLD / EVLAST | j68 | reset in start() only → a slot load released the OLD life's held events | reset on every new life / load |
| FP_C | j86 | face-picker items held a copy of the old her (names of the old harem) | reset |
| RCP_PC | jrcp | per-seed profile cache with old names | reset |
| kitRpMap | j79 | name → person map of the old life until the next rebuild | reset |
| KMSNAP / KMS | j93 | snapshot of the old S | reset |
| TSA.pre, __kitLastEvArt, kaLastResult, KFX.log/loses | jts, j87/jgift, j63, jfx/jkrev | last result / picture / snapshot of the old life | reset |
| flip scene token | jflip | (already reset via kmOnReset) | moved into lifeStore |

Allow-list (meant to carry or static, listed with reasons in the test): localStorage (slots + account unlocks / Luân hồi ledger), art/word caches
(KAK_C, KIT_TONE_CACHE, KIT_BGSZ, WD_BASELUX, PETC_CACHE, KDH_ART, KIT_FLOOR, __rtArt, KPID_OK, KFK_VPOOL, BTR_KEEP, kfkTexP), dev lists and bot
counters (CTM_MISSING_PICS, KIT_PH_SEEN, KIT_PICFALL, __stealSt, __mlN, MOOD_N, __exN, __cmN, KPRES_LOG, __cfdbg).

## Tests
- NEW dev/test/newlife-leak.js: plays a life 100 weeks with scar + worn veil + rash + pz + illness + pregnancy + items, then a new life by
  start(), by Luân hồi rebirth (dead → start) and by loading another slot; checks every top-level let/var/collection of the built game (1061 names)
  + window.* : (a) no reference to any person object of the old life (marked objects, deep walk), (b) no old-life name anywhere, (c) no store
  bigger than on 3 brand-new lives (allow-list above), (d) no healing/veil line, (e) S.vl is a veil or nothing, no foreign chest entry.
  main (before): FAIL 5 (run 1: healing line + foreign chest entry + ECON_AT/EVHOLD…) → branch: **FAIL 0** (all 3 paths).
- NEW dev/test/newlife-oldsave.js (a save written before the fix, memory in S.vl + memory in chest + false line; and a save with a REAL worn veil):
  main FAIL 4 → branch **FAIL 0** (memory → S.vmem, chest clean, line gone, real veil kept, plays a week, no page errors).
- NEW dev/test/sfield-collide.py (family scan: a person field written as a map {} in one module and read as an item .k / array in another):
  main 1 pair (vl: jvoice vs jveil/jrash) → branch 0.
- voice-core PASS (0 FAIL); voice-band.js / voice-pool-sim.js updated to S.vmem.
- QUICKCHECK PASS 521d7bae · open 1064 ms · old save ok · perf new/live render 235/250 ms, tab 332/305 ms, buổi 796/951 ms · core gates PASS.

Limits: state kept inside closures (IIFE-private lets) is not reachable by name; it is covered only by the behaviour checks (d)(e) and the
person-reference walk over every reachable store.
