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
