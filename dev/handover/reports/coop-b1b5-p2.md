SẴN SÀNG KIỂM a9d25e287ff7e96ac420ac99f9715a54a3bc6bec

# coop-b1b5-p2 — D21 co-op B1–B5 PART 2 + reviewer r1 fixes — worker report (successor)
Branch: review/coop-b1b5-p2 @ a9d25e287ff7e96ac420ac99f9715a54a3bc6bec (part 1 d0f2260a + origin/main c4b0c58f + reviewer tests 8dd1626a + part 2 2740a299 + r1 fixes).
One reviewer checks part 1 + r1 fixes + part 2 together. Per-item details, numbers and gain/loss: dev/PROGRESS_review-coop-b1b5-p2.md.
Worker NOT deployed; NO Worker change (new relays ride `act`: k "ctm-fam" mode fam/ask, k "ctm-tn" mode claim + versioned tn; all
backward-compatible with old clients). main s13's coop-rejoin-xdev code untouched. Kit: only pushModal / pushDil → no KIT REQUEST.
START_CTX ≈ 3 % of the window; finished ≈ 20 %.

## r1 fixes (all done)
1. BLOCKING pos cap: pos = place/khắc/stats/name + hash `fh`; bag/kids/preg/fx7/pets on their own relay "ctm-fam", re-asked on a hash
   mismatch (missed relay, rejoin). 152-item bag + 6 kids: bag JSON 22 293 chars, every pos < 4000 (coop-r2).
2. NPC acts on her: runAct wrapper relays ANY NPC act on her entry (npcAct / mindRun / j70 / kv / due plans) as res.fam / res.pet ops;
   the guest never runs NPC acts on the host's entry. Per-act test via mindRun: takeaway, petsteal, musk, kpoison.
3. B5 seat card (OD:L1228): no waiting claim; LARGE compensation (promoFullSeat if promo-skip is in, else the same rule; BAL.psk.seat:
   Bạc 4 × stipend, phong hiệu, 2 ngự ban, house favour, Danh +6; loss: consorts ghen +10); normal exam later. NOTE for merge:
   jbal2 adds BAL.psk.seat only if absent (same key/values as review/promo-skip) — delete that guarded line when promo-skip lands.
4. In-week night: host-authoritative (guest claims with the host version she saw; host decides, broadcasts the final, writes S.tn).
5. coop-b1 loss checks tied to gains. 6. coop-pets 48/48 (night gate in its week end).

## Tests (LIVE Worker, host 755x1000@2 + guest 1180x820@2, one at a time)
| Test | Result |
|---|---|
| dev/test/coop-r2.js (NEW) | 47/47 (big chest, NPC per-act, night crossing, full seat, merged week no copies) |
| coop-p2 | 45/45 (one run 42/45: NPC bribe card raced the player's — test race, rerun green) |
| coop-b1 / coop-b2b5 / coop-e2e (E2E_TO=120000) / coop-pets | 41/41 / 30/30 / 59/59 / 48/48 |
| oldroom-r1 / oldsave-r1 (old = origin/main build in .tmp/old.html) | 16/16 / 16/16 |
Screenshots looked at: seat card 1180x820 + 755x1000 (kit BÁO dialog, gains green, jealousy red, no overflow).
Known limits: Dọa tố đối thực is never offered on the friend-servant (her affair is with an outer-court man, kept on her side);
the j99succ epilogue is her personal ending — the shared world goes on under the host's new Emperor.

## Owner questions
None.
