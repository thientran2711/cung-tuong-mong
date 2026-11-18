# review-it-key-guard-r1 — verdict: FAIL (2 items)
Reviewer opus BIG, session_01UV1SzkM4xXVtuGJCpS4Sdh. Reviewed review/it-key-guard @ ce1eda7b (from 744b80e7). START_CTX ~8 %.
Trial merge onto live main f5220eaa: **review/it-key-guard-r1 @ a9e19997** (worker may build on it).

## FAIL
1. **Raw item key shown to the player (VANPHONG; the report claims "no raw key shown").** The ONE kit item model `kitItemInfo`
   (jkrev.js:18-19: `it=IT[k]||{}; name=it.n||String(k)`) is not routed through `itm()`, so every kit item card of an unknown piece prints
   its key. Seen on Fold 755x1000@2 AND iPad 1180x820@2: Tư trang → the new-piece reveal shows "Thường / **zz_gone_item** / Nhận".
   Same family (mechanical replace kept the raw-key fallback): `IT[x]?itm(x).n:x` / `(IT[e.k]||{}).n||e.k` at j20:29, j75:71, j92:306,
   j93:253, jdress:50, jgift:12, jpromo:65, jstip:129, jtruth:32. Fix: all → `itm(k).n` (kitItemInfo name/sub/d from itm); add the
   raw-key-fallback patterns to it-key-scan.py (regex used here: `IT\[(X)\]\?…\.n:\1`, `\(IT\[(X)\]\|\|\{\}\)\.n\|\|\1`, plus `it.n||String(k)`).
   Also decide one behaviour for the stub in the chest: today it is NOT listed in the grid ("Tất cả 4" with 5 pieces) yet the reveal pops
   it as a new piece. Either list it (Tạp vật, no actions) or never reveal it — not half of each.
2. **Rebase/merge onto current main.** main f5220eaa adds jksize.js with 4 unguarded reads (`!IT[k].story&&IT[k].sl`, lines 230/453):
   after merging, `it-key-scan.py` exits 1 (4 in 1 file). Conflicts in jgpick/jtoil/jtoilr (main's new lines). All resolved in a9e19997
   (main's lines + itm; jksize → itm; scan 0/0) — reuse it.

## Checked and OK
| check | result |
|---|---|
| root real (744b80e7) | yes: old jvoice write + vlWear on old build puts a keyless piece in the chest (keyless 1); it-key-guard.js ONLYUNK on old build throws `reading 'tg'` at month 5; new build after load: keyless 0, veil kept |
| old-save migration (own script): old build save with all 261 IT keys in her bag + 3 NPC bags, worn pieces, tainted piece, her veil worn WITH jvoice memory merged on it, NPC veils (mc20, mcnt), dress → load on a9e19997, 24 months | 0 real items/veils lost; only diff = dress→wardrobe piece, identical in control (old→old, old→main f5220eaa) = pre-existing migration; 0 thrown, 0 page errors, 0 unknown pieces |
| it-key-guard.js 8×200 (a9e19997) | PASS, 0 page errors |
| it-key-scan.py (a9e19997) | 0 / 0 |
| coop-e2e vs LIVE Worker (a9e19997) | 60/60 ok, exit 0 |
| quickcheck (a9e19997 vs live) | open 1213 ms, old save loads, 0 errors; G4 coop-one-world FAILED once (seed 7, `R.evm` 1 path, run under 3 parallel heavy tests); reruns seed 7/3: 12/12 clean on branch, 8/8 on main → timing flake, not item-related |
| kit / CSS | no UI part changed; no private parts |
| itm never on the left of `=`; existence checks kept; IT_NONE frozen | ok |
Note (non-blocking): an old save where jvoice wrote its memory ONTO a worn veil (`S.vl` with `k` + "cycle:ask" keys) keeps those keys on the
veil object (itClean only moves a keyless S.vl); voice memory just restarts. Optional: strip non-piece keys from p.vl in itClean.
Shots: scratch only (/home/user/wt/ikr-scratch), never in git, none on the CDN; deleted with this verdict.

# r2 — verdict: PASS 02561fca
review/it-key-guard @ 02561fca (= trial merge a9e19997 + fix 593285a9 + merge main 7abaf07a; live main 7abaf07a is its ancestor → fast-forward OK).
| r1 item / check | result |
|---|---|
| 1 raw key | kitItemInfo reads itm(); 13 fallbacks → itm(k).n; scan part 3 (raw-key fallbacks) 0. Fold 755x1000@2 + iPad 1180x820@2: an unknown piece + nhansam added → reveal shows "Tinh phẩm · Nhân sâm trăm năm · Thuốc bổ"; unknown piece never revealed/listed; "zz_gone_item" in page HTML 0; no h-overflow, 0 page errors |
| one behaviour for the stub | inert + never shown (grid and reveal agree). Old saves lose nothing they should see: old-build (744b80e7) save with all 261 keys in 4 bags, worn pieces, taint, veils, dress → load on 02561fca: 0 hidden pieces (all keys known), only diff = dress→wardrobe piece, identical in control (old→main); kit callers with literal keys (chenthuoc, thu, y_saxanh, tramngoc, boodieu, vongngoc, nhansam) all in IT, no stub name leaks into kit sample pages |
| 2 rebase | main ancestor; scan 0/0/0 |
| veil-memory note | done: memory on a worn veil moved to S.vmem, veil keeps only k/src/d |
| quickcheck | PASS, core gates PASS (incl. coop-one-world), open 1258 ms, old save ok |
| coop-e2e LIVE Worker | 60/60, exit 0 |
| it-key-guard.js 4×120 | PASS, 0 page errors |
Shots: scratch only, deleted; nothing on the CDN.
