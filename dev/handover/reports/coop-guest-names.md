# coop-guest-names — report (OPUS worker session_01N1tNP4yDu6wnmaLKhzumGM, Foreman B ROOT-5)
PRIORITY #1 CHECK ('k61' / 'coop-guest-names' / 'K61MAP' / 'kOf61'): OD 0 | ledger 0 | claims: my row only | main: j61 k61Table/k61All/kOf61, jnamefix nmFix/nmFrPeople (coop-name-clash LIVE), jcoopworld buildFriend | review/*: review/hao-huu-rv2 (its sheet title in data-k61skip — untouched, K61SKIP unchanged) | reused: nmPers (jname), coop-e2e harness, hao-huu r3 K61MAP-log idea.
START_CTX ≈ 4 % (own estimate, 1M window). Branch `review/coop-guest-names` = **3ffea799** (main 2bab70e1 merged, site rebuilt). TIER BIG.

## Root cause (found, reproduced)
1. **One j61 key, two people across seats.** Each seat issues its own `x<n>` keys (S.kseq) and servant ids (sidN). The guest player's own people (her maid, servants, kids, home family) and their copies on the host's friend entry carried keys that world / host people also hold: `x1` = BOTH players' maids on BOTH seats (probe, every run). `KREG[k]` keeps the last object and `S.known[k]` is one slot → the mask resolves a name through the other person (title + knowledge) = «<his title> ???».
2. **Friend out of rivals.** While her entry is out of `rivals` (week-end `withoutFriend` pull, at home `friendHome`, a rebuild in flight, she serves as a cung nữ), `k61Table` has no record of her, so the first unmet record with her words owns the name. Forced on main: unmet S.men «Hàn lâm học sĩ» holding her name + entry pulled → **«Hàn lâm học sĩ ???»** on both seats, met or unmet (= rv-hao-huu r2 FAIL A).
3. **First holder wins.** k61Table gave a name to the first entity in k61All order (own maid/staff/kids before rivals), so an unmet local record could beat the friend.

## Fix (dev/build/j61.js only)
- `kOf61`: `k61GuestOwn(e)` → the guest player's people get their own namespace `g…` on BOTH seats (guest: S.maid/staff/kids/kc.fam; host: the coop entry's maid/staff/kids). Host people + world keep the solo keys (solo, old saves and the host change nothing; her own people stay known on her seat via k61Own). Stand-in friend `{coop,id}` → her rivals key `r<pid>`.
- `k61Table`: `k61Shared()` puts the shared people first (friend + her copies; on the guest her own people), protects by full name her people known only from the room blob (`nmPers(P.S)`: servants, home family, pools), and adds `k61CoopFr()` (stand-in from the room P; cung nữ → `{coop,sid}`) when her entry is missing → unmet «Hảo hữu của ta», met her name.
- Two-way (law 1): same code path on both seats; COOP_SWAP runs pass.
- jnamefix: no change needed — host sweep already lets the friend hold (checked: forced world man with her full name is renamed, she keeps it; NC_FORCE F1/F2 pass). Known minor (not changed): the host's knowledge of friend-people copies that never got a key from her seat is re-keyed each rebuild.

## Scan table (law 11; runtime probe dev/test/k61-coop-probe.js on both seats; before = main f13dc915, after = this branch)
| shared-person class | before | after |
|---|---|---|
| friend entry in rivals, unmet / met | ok | ok |
| friend entry OUT of rivals (pull / home / rebuild), forced «Hàn lâm học sĩ» | FAIL «Hàn lâm học sĩ ???» (4/4) | ok «Hảo hữu của ta» / name |
| friend as cung nữ (servant entry), cn origins both orders | ok | ok |
| players' maids / people keys (x1 shared) | FAIL keyDup every run (6/6) | ok, one key = one person |
| local record carrying a world key (forced) | FAIL same key (2/2) | ok, `g…` key |
| friend's people known only via room blob vs unmet world record same name | not protected | protected (full name) |
| host sweep, world man with friend's full name | renamed | renamed |

## Tests (after)
- NEW dev/test/coop-guest-names.js: 37–38/38 in tt/nc, nc/tt SWAP, cn/tt, tt/cn SWAP (before: 25/37).
- coop-e2e (+ K61MAP probe in `same()`, 30 new lines): tt/nc 122/122 · COOP_SWAP 122/122 · COOP_NC_FORCE 123/123 (F2 in-flight noted like the name-list check).
- role-parity ALL PASS · one-core PASS · undef-scan PASS · quickcheck: see last line below.
- UI: no layout / kit change (mask text only) → no shots.

QUICKCHECK PASS · 262 s · old save ok · perf new/live render 257/318 ms · core gates PASS (sha 3ffea799).
After merging main 2bab70e1: coop-guest-names 38/38, coop-e2e tt/nc 122/122.

State: idle, waiting for review. Reviewer wipe: no CDN shots made.

## REVIEW r1 (OPUS BIG reviewer session_01N1tNP4xhQc6kgxpjhWCyYJ, 21/11) — VERDICT: PASS d45076b6 (review/coop-guest-names-r1)
PRIORITY #1 CHECK: worker report + brief b5 read; CLAIMS rows (worker SSK 3ffea799, my RUNNING row); main j61/jcoopworld read; review/hao-huu-rv2 data-k61skip untouched (K61SKIP unchanged in the diff).
Root cause confirmed (one j61 key for two people across seats; friend out of rivals; first holder wins). Fix reviewed line by line (j61 kOf61 / k61GuestOwn / k61Table / k61Shared / k61CoopFr).

### FOUND + FIXED by reviewer (law 1 two-way, law 11 family)
- **Mirror gap on the GUEST seat.** The worker namespaced the guest player's people ('g…') on both seats, but not the HOST player's people copies on the guest seat. Both seats run the key counter from the same shared `S.kseq` (probe: kseq 35 on BOTH seats, max kk 34), so the host's child copy on the friend entry (`kidsCopy` copies `kk` issued by the host) and the guest seat's next own key were the same `x<n>`: reviewer mirror probe, seat b `kc=x35 km=x35 same=true` (FAIL), seat a `gx35/x35` ok. Fix: `k61HostCopy(e)` in j61 — on the guest seat the copies of the host's people on her entry (maid / staff / kids) get `h…`, exactly as hers get `g…` on the host. Test: coop-guest-names.js gains the mirror check on both seats.
- **Merge interaction with hao-huu (landed on main 0046a920 during this review).** coop-haohuu on the merged branch: 4 FAIL «met: no ??? in the sheet» (host + guest × Fold + iPad). Cause: the friend entry copies her maid (`LOOK` has `maid`, with her seat's `kk`); before this fix that copy shared the seat's own maid key `x1` (known), so the sheet's «Cung nữ thân cận» row passed by accident; now the copy has its own key and is unmet → DOM mask «cung nữ ???». Fix in jhaohuu.js: her maid's name (shown only when the friend is met, the sheet's own rule) wrapped in `data-k61skip`, same shield as the sheet's title. After: coop-haohuu 315/319 = exactly main's own result (main ee02e8c0 fails the same 4 iPad checks «!» box / notice chip under the Hảo hữu icon — main's, from a kit landing, not this branch; flagged for Foreman B).
- Commits: 1d3bda38 (j61 mirror + test), ee722a78 (jhaohuu shield); merges of origin/main up to 3a2b81b1 (site rebuilt each time). Main kept landing every ~10 min (after 3a2b81b1: kit-info-tap, ending-screens — j93/j97/jend/jge/jk4, no overlap with j61/jhaohuu/jcoop*); the land step merges LIVE.

### Checks (coop-guest-names + quickcheck + one-core + undef on final d45076b6; coop-e2e lanes / role-parity on 1d3bda38–ee722a78, no co-op code changed after)
| check | result |
|---|---|
| coop-guest-names.js tt/nc | 40/40 (worker sha 38/38; mirror check new) |
| coop-guest-names.js COOP_SWAP nc/tt | 40/40 |
| coop-e2e tt/nc | 124/124 (one earlier run 122/124: «same Thái hậu picture» seat b fid null at start + week 1 — rerun 124/124 twice; not j61, main baseline 94/94 passes it; flaky, noted) |
| coop-e2e COOP_SWAP | 124/124 |
| coop-e2e COOP_NC_FORCE | 126/126 (F2 in-flight note as designed) |
| role-parity (alone) | ALL PASS |
| one-core guard / undef-scan | PASS / PASS |
| quickcheck | PASS (d45076b6, median of 5: render 245/269, tab 478/513 ms; core gates PASS; old save ok). Two earlier runs FAILed on a different perf metric each (tab 637/471, buổi 3554/1699) = box noise; the g/h code returns at once when COOPW is off (solo path unchanged) |
| hao-huu sheet (now LIVE) data-k61skip | kept; maid row added to it; coop-haohuu 315/319 = main's 315/319 (main's 4 iPad icon fails) |
| jnamefix host sweep | test: world man holding friend's full name renamed, she keeps it — confirmed |
| old save | quickcheck old save ok; solo keys unchanged (g/h only when COOPW.on) |
| UI | no layout/kit/word change (mask text only) → no shots needed |

### Notes (not blocking)
- Old co-op saves: the host's stored knowledge of the friend's children (old `x…` key) and the guest's knowledge of the host's children are re-keyed once (`g…` / `h…`) → one-time "unmet" for those children. The old key was shared with another person, so it cannot be migrated safely. Rare, small, self-heals on meeting.
- Worker-known minor (host re-keys friend-people copies that never got a key from her seat) unchanged.
- coop-e2e Thái hậu picture flake: worth a watch item for the co-op owner of that check.
