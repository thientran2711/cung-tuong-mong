PRIORITY #1 CHECK: worker's report line 1 (dev/handover/reports/newlife-reset.md) | claims: newlife-reset session_01UV1SzgyQP6eCJz2hmcnLrF READY | review/*: review/newlife-reset. Reviewer; build nothing new. Found during review: origin/main already holds the SAME root fix (it-key-guard 7662ae56a/23e53eaa6: S.vmem + j8 itClean) and review/tuanluc-sync a THIRD copy (vmemFix in jvoice) — duplicate work across 3 branches.

# review-newlife-reset r1 — PASS b2da25cc05d9ac74cf51c640ce1f98de0190d64e (branch review/newlife-reset-r1, ancestor = origin/main bad6d59f)

## Root (verified)
- Reproduced on main 7abaf07a with the worker's tests: newlife-leak FAIL 13 (healing line + nameless chest entry on start / rebirth / slot load, ECON_AT holds old-life people), newlife-oldsave FAIL 4, sfield-collide 1 pair (vl: jvoice map vs jveil/jrash item). Root = jvoice kLine memory in S.vl (worn-veil field). Real.
- Readers of S.vl/p.vl: jveil, jrash:21/36, jface:149, jfx:416 kfWorn — all treat it as the veil; none reads it for voice. After the fix S.vl only ever holds a veil.
- Real worn veil kept: newlife-oldsave "real veil: kept on the wounded face {k:mc21}" + plays a week, PASS. Memory written ONTO a real veil is cleaned by main's itClean.

## Merge onto current origin/main (bad6d59f, +190 commits)
Conflicts jveil.js / jvoice.js (main's it-key-guard did the same S.vmem move + itm()) + generated files. Resolved: main's itm()/comment kept; branch vlFix kept. NEW ordering fix: main's itClean (inside normAll) nulls the old S.vl memory BEFORE jveil's normAll wrapper runs, so vlFix lost the signal and old saves kept the false "Vết thương trên mặt đã lành…" line → jveil now wraps itClean and runs vlFix first. Site rebuilt.

## Fixes by reviewer (small)
1. jtruth FRAME_LAST, j79 KPSLUG_C (slug memo keyed by old-life names), jk3 KAS_ORD (new store from main) registered with lifeStore.
2. newlife-leak.js was FLAKY (worker's FAIL 0 was one lucky run; my first run on the branch FAIL 2): (a) same-name draws of the new life (officials S.trieu, servants share the name pools) were flagged as leaks → current names now = S/rivals + kpPeople + every .name inside new S (object leaks still judged by the reference walk); (b) store-size check noise (deck, last picture…) → band mx*1.5+2, empty-on-every-fresh-life must stay empty; (c) allow-list + reasons: KIT_CDNHAVE, KMM_HEAD, sidN, __rtN, EA_SAY, kaLastResult (registered, refilled by new play), KIT_PH_SEEN (name filter); (d) hits in S/rivals now print their path.
   After: 3+3+3 parallel runs FAIL 0 (pre- and post-merge); same test on main still FAIL 12 (sensitivity kept).

## Tests on b2da25cc
newlife-leak FAIL 0 (x3) · newlife-oldsave FAIL 0 · sfield-collide pairs 0 · voice-core 0 FAIL · voice-band PASS · QUICKCHECK PASS (open 1162 ms, old save ok, render 225/234, tab 270/306, buổi 1418/1066 ms, core gates PASS).
Registry: lifeStore in j1 (bundle order: jcdn, j0, j1 first; single bundle), run by kmReset on start / rebirth / co-op new life / slot load / title. Slot switch: "load" path of newlife-leak (old life saved to slot 3, load slot 3 then slot 2) clean.
Shots (Fold 755x1000@2, iPad 1180x820@2, dev/tools/shots.js, fresh game day 1 home + every tab): no page errors, no overflow; chest holds only real pieces, no nameless entry, veil slot empty, no wound/veil line. UI unchanged. Scratch shots deleted.

## Trial merge with review/tuanluc-sync (a1b683cb, based on old main 7abaf07a)
onto origin/main: CONFLICT assets.json, assemble.py, jroute.js, jvoice.js, index.html, sw.js. onto r1: same + jveil.js.
For its worker: drop its vmemFix (jvoice + vlSync call) — main itClean + this branch's vlFix cover it; its vlSync "p.scar.veil=0" is a no-op (vlSync only reaches there when !vlNeed(p) ⇒ p.scar is falsy). Keep its log-attribution work.

## Notes
- Brief gap: the newlife-reset worker's PRIORITY #1 CHECK said "review/* 0 (no other branch touches S.vl / jvoice memory)" — it-key-guard (then a review branch, now on main) already did. Coordinator: one root, three fixes.
