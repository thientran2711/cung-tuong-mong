SẴN SÀNG KIỂM d0f2260ac0a945c5ce862bec3df58e8649c333c5

# coop-b1b5 — D21 co-op B1–B5 (orphan #20) — worker report
Branch: review/coop-b1b5 @ d0f2260a (code 49c95738 + PROGRESS) (base origin/main 399483e3). START_CTX ≈ 3 % of the window; finished at ≈ 25 %.
Spec read verbatim: dev/coop/COOP_AUDIT.md "Big items" B1–B5 (lives on review/coop-pets, H7:L80).
**Note for the reviewer/coordinator:** this branch MERGES review/coop-pets (A10, queued, never reviewed) because B1 extends its `res.pet`/`pos`
relay (LUẬT ƯU TIÊN SỐ 1: reuse). Reviewing this branch therefore also reviews coop-pets. Its conflicts with main were resolved
(jcoopworld tryEnd/onWeek/buildFriend kept main's code + coop-pets' rpend/PETK2; KIT.md / kitpage / built files kept main's).
Worker NOT deployed (no server change; new fields ride the existing free-form `res`/`act`/`pos` relays). review/coop-rejoin-xdev not touched
(its jcoopworld hunks frozen()/onState/snap area do not overlap mine).

## Step 1 audit (main before this branch)
| Item | Main | review/* | Before |
|---|---|---|---|
| B1 steal item / harm kid of the friend | entry inv:[] kids:[] → acts never offered | coop-pets: gift + pets only | missing |
| B1 servant (cung nữ) entry gets maid act set | no | no | missing |
| B2 host-picked night | S.tonight per client (coop-night-sync only gates buổi tối timing) | no | missing |
| B2 shared heir | S.heir per client | no | missing |
| B3 Emperor death in co-op | muted on both | no | missing |
| B4 festivals / NPC schemes include guest | muted on guest, friend pulled on host | no | missing |
| B5 seat caps across both | holders() blind to friend in endTurn | no | missing |

## Step 2 built (all in dev/build/jcoopworld.js; BAL.coopEmpY in jbal2.js)
| Item | Now | Gain / loss |
|---|---|---|
| B1 items | her bag (with index) on her entry (buildFriend + live pos.fam); res.fam ops: laydo/laydol → her own "Đồ thất lạc" case held by the friend; phonghoa → burnt; batnat/uyhiep/tieuhuy → taken (named, ledger); plant/giahoa → silent hidden item; "Lén trả lại" → her case closes, item back (not a gift) | thief/extorter keeps the item (existing act code); she loses it on her own S |
| B1 kids | living children + open pregnancy on her entry; ksab/kframe (Tài, Hoàng thượng thương, heir loss), kpoison/pond (death → kidDie on her side, her grief Sức), takeaway (child moves to the actor), musk (miscarriage) | actor gets the child (takeaway) / pays the act costs; she loses on her own S |
| B2 night | host flip draws WITH the friend (both players + NPCs) → world key S.tn={w,who}; guest draws nothing, takes tn at merge (+ Kính sự phòng card); in-week changes relayed (act k "ctm-tn") both ways; NPC night resolved on host only, player's night by her own client | — |
| B3 | host-only roll (new Emperor gated by emp.y0 + BAL.coopEmpY) → emp.dead={w}; both clients run the normal reign ending in the same merged week; host makes ONE new Emperor (mkEmp) for the world the reborn lives join | personal endings from her own heir/rank |
| B4 | rivalsTurn / rivalsMonth / festival on host run WITH her entry; effects write back via toCanon into her blob (merge) | — |
| B5 | holders() counts the pulled friend; guest promoted into the seat the host took the same week → back one rank + kit card "Ghế đã có người" | — |
No new UI parts (standard kit modal only) → no KIT REQUEST.

## Tests (LIVE Worker, 2 browsers, host 755x1000@2 + guest 1180x820@2, one test at a time)
- dev/test/coop-b1.js: 41/41 (laydo both ways, phonghoa, ksab, musk, takeaway, pond, plant, return, week merge: entry bag/kids == her own)
- dev/test/coop-b2b5.js: 30/30 (night to guest / to NPC identical on both, in-week give-up + claim relay, B4 host rolls with friend, B5 holders + seat card, B3 both end same week + reborn + one new Emperor)
- dev/test/coop-e2e.js: 59/59 (E2E_TO=120000)
- Note: dev/test/coop-pets.js (from coop-pets) fails at setup on current main (old clear() vs new Luân hồi flow) — test harness only, its cases are covered by coop-b1.js style setup; not fixed here.

## NOT done (list for a second worker)
1. **B1 servant entry maid act set** (friend on the cung nữ road: consort/maid acts on her as a servant) — not started.
2. **B2 shared heir** (S.heir → world key, host-authoritative heirMonth; today each client keeps its own heir view; kframe/kidDie heir loss already reaches her via res.fam).
3. **B3 succession choices** (j99succ Ba đường / Nữ đế) stay off in co-op (its epilogue stops the world); co-op uses the base endings. NPC consorts are not retired at the new reign (same harem continues).
4. **B4 gaps**: NPC acts on her ITEMS/KIDS inside host rivalsTurn do not reach her (only stats/rel/oan/cold/death write back); her festival entry has no own choice (she competes with her numbers like an NPC); lines about her arrive only in the week news.
5. coop-pets.js harness update.

## Owner questions
None.
