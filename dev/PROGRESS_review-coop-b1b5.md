# PROGRESS review/coop-b1b5 — D21 co-op B1–B5 (orphan #20)

Spec (verbatim plan): `dev/coop/COOP_AUDIT.md` "Big items" (from review/coop-pets, merged into this branch).
Base: origin/main 399483e3 + merge of review/coop-pets 3236348b (A10, never reviewed; B1 builds on its `res.pet` / `pos` relay).
All code: `dev/build/jcoopworld.js` (client only, host-authoritative over the existing act/res/pos/where relays; NO Worker change, Worker not deployed).
Numbers: `BAL.coopEmpY` (jbal2.js). No new UI parts: every card is the standard kit modal (pushModal); no KIT REQUEST.

## Step 1 audit (origin/main before this branch)
| Item | On main | On review/* | Status before |
|---|---|---|---|
| B1 item / kid steal on the friend | no (friend entry inv:[] kids:[]) | coop-pets: gifts + pets only | missing |
| B1 servant entry gets maid act set | no | no | missing |
| B2 host-picked night | no (S.tonight per client); coop-night-sync only gates the buổi tối TIMING | no | missing |
| B2 shared heir | no (S.heir per client) | no | missing |
| B3 Emperor death in co-op | muted on both seats | no | missing |
| B4 festivals + NPC schemes include guest | muted on guest, friend pulled on host | no | missing |
| B5 seat caps across both players | holders() blind to the friend during endTurn | no | missing |

## Done
- **B1** her bag (`ci` index) + living children + open pregnancy on her entry (buildFriend + live `pos.fam`); `res.fam` ops rm/plant/ret/kd/kdie/ktake/preg0
  applied to HER own S. Acts covered: laydo, laydol (thất lạc case held by the friend), phonghoa, batnat/uyhiep/tieuhuy (taken), plant/giahoa (silent),
  "Lén trả lại" (case closes, not a gift), ksab/kframe (Tài/fond/heir loss), kpoison/pond (death → kidDie on her side), takeaway (child moves), musk.
- **B2 night**: host's flip draws with the friend in the deck → world key `S.tn={w,who}`; guest draws nothing, takes tn at the merged week (+ Kính sự phòng card);
  in-week changes relayed (`act k:"ctm-tn"`); NPC nights resolved on the host only, a player's night only by that player.
- **B3**: host-only roll (gated by emp.y0 + BAL.coopEmpY for a new Emperor) → `emp.dead={w}`; both run the normal reign ending at the merged week;
  host makes ONE new Emperor (mkEmp) into the world the reborn lives join.
- **B4**: rivalsTurn / rivalsMonth / festival on the host run WITH the friend entry; effects write back through toCanon.
- **B5**: holders() counts the pulled friend; guest promoted into a seat the host took the same week → back one rank + kit card.

## Tests
- `dev/test/coop-b1.js` (2 browsers, 755x1000@2 host + 1180x820@2 guest, live Worker)
- `dev/test/coop-b2b5.js` (same)
- `dev/test/coop-e2e.js` must stay green.
Results @49c95738: coop-b1 41/41, coop-b2b5 30/30, coop-e2e 59/59.

## NOT done (list for a second worker)
1. **B1 servant entry maid act set** (friend on the cung nữ road: consort/maid acts on her as a servant) — not started.
2. **B2 shared heir** (S.heir → world key, host-authoritative heirMonth; today each client keeps its own heir view; kframe/kidDie heir loss already reaches her via res.fam).
3. **B3 succession choices** (j99succ Ba đường / Nữ đế) stay off in co-op (its epilogue stops the world); co-op uses the base endings. NPC consorts are not retired at the new reign (same harem continues).
4. **B4 gaps**: NPC acts on her ITEMS/KIDS inside host rivalsTurn do not reach her (only stats/rel/oan/cold/death write back); her festival entry has no own choice (she competes with her numbers like an NPC); lines about her arrive only in the week news.
5. coop-pets.js harness update.

