FAIL

# review/coop-b1b5-r1 — reviewer r1 of review/coop-b1b5 @ d0f2260a (D21 B1–B5) + the merged, never-reviewed review/coop-pets (A10)
Branch: review/coop-b1b5-r1 = origin/main c4b0c58f + merge of d0f2260 (only conflicts: built index.html / sw.js → rebuilt with
dev/build/assemble.py + dev/site/build_site.sh). No code change by the reviewer. Added two reviewer tests (below). Worker NOT deployed.
main s13's coop-rejoin-xdev code (seat copy, snapLoad/pickSnap, "moved") merged cleanly; no hunk of this branch touches it.

## Fix list (numbered, for the worker on review/coop-b1b5-p2)
1. **BLOCKING — `pos` grows past the LIVE Worker's 4000-char cap and is then dropped silently.** B1 puts her whole bag
   (`fam.bag`, every entry cloned + `ci`) and kids into every `pos` message (jcoopworld sendPos). coop/worker/src/index.js:168
   `if (JSON.stringify(o).length > 4000) return;` drops the WHOLE pos (place, khắc, stats, alive, pets) with no error.
   Measured in coop-b1 (probe): a 51-item bag = 3564 chars bag + 258 kids + stats ≈ the cap; a fresh life already holds 40–47 entries,
   and item entries carry src/giver/d/from strings. A mid-game chest goes over → the friend's place / stats / bag freeze on the other
   screen (phase-2 meetings and every act on her break). Fix without a Worker change: keep pos small (e.g. bag as compact
   [ci,k,h?] pairs or only a hash + send the bag/kids in their own `note`/`act` relay on change), and add a test with a ≥150-item bag
   + 6 children asserting the pos JSON < 4000 and that the friend's place still updates.
2. **BLOCKING — B4 × B1/A10 makes duplicates (gain without loss).** On the host, rivalsTurn / rivalsMonth now run WITH her entry, and
   her entry now carries her bag, children, pregnancy and pets. NPC acts go npcAct/mindRun → runAct(v, friend, k) (j8.js:368,
   j40.js:26) with a = the NPC, so the co-op runAct wrapper (a===S only) sends nothing: NPC `takeaway` puts a COPY of her child in the
   NPC's house while she keeps it; NPC `petsteal` (jpetcare mindMenu) gives the NPC her pet while she keeps it; `musk`, `kpoison`,
   `pond`, `kframe`, `ksab`, `plant` change only the display copy (no loss on her side, NPC pays/gains). Fix: relay NPC acts on the
   friend entry from the host through the same res.fam / res.pet ops (wrap for any actor when the target is the friend), or keep
   those acts off the friend in NPC menus until relayed; test each (NPC gains AND she loses, no second copy after the merge).
3. **B5 seat card breaks OD:L1228.** "Ghế đã có người … Hoàng thượng giữ ngươi ở phẩm X, đợi khi có ghế trống" is the banned waiting
   claim ("no waiting claim on a seat"), and the guest is demoted with nothing in return (loss without gain). Per OD:L1228 a full seat
   gives a LARGE compensation (bạc + rare gifts, phong hiệu without rank change, favour for her family; cost: consorts' jealousy), she
   later passes the normal exam; numbers in BAL, wording via VANPHONG.
4. **B2 in-week night changes are last-writer peer-to-peer, not host-authoritative.** tnRelay sends each client's local change and
   the other side applies it blindly: if both change the night in the same buổi (both Tranh sủng / Chặn ngự giá), the two relays cross
   and each screen gives the night to the other (or one to nobody) — one fact, two values. Fix: the guest sends a CLAIM, the host
   decides and broadcasts the final tn ({w,who}, also written to S.tn), the guest applies only the host's word; add a crossing test.
5. **coop-b1.js is not deterministic.** It forces roll/caught but not the servant-refusal roll ("<servant> quỳ xin nương nương đừng
   làm việc thất đức; việc không thành") nor the "caught → servant beaten to death" path, so the runs ran out of servants:
   run 1 = 30/41 (fails: friend entry timing, 1 laydo case, 5 takeaway, 6 pond, 7 plant, 7b, 8 ×4, 9), run 2 = 39/41 (7 plant, 7b).
   Also case 5's "child left B's house" check passes vacuously when the gain check found no child (nm=null). Force those rolls, make
   every loss check depend on a real gain.
6. **coop-pets (A10) has no passing test of its own**: dev/test/coop-pets.js fails at setup on current main (worker note). A10 is
   reviewed here only through code reading + coop-b1 setup; fix the harness and run it (care / harm / steal, gain on me AND loss on her,
   follow-bonus side effects counted once).

## Tests run (one at a time, LIVE Worker, host 755x1000@2 + guest 1180x820@2)
| Test | Result |
|---|---|
| dev/test/coop-b1.js | run 1 30/41, run 2 39/41 (fix 5); B1 item/kid ops themselves work when the act really happens (gain on actor, loss on her, merge equal) |
| dev/test/coop-b2b5.js | 30/30 (B2 night to guest/NPC identical, give-up/claim relay, B4 host rolls with friend, B5 holders + card, B3 same-week end, reborn, one new Emperor) |
| dev/test/coop-e2e.js (E2E_TO=120000) | run 1 58/59 (FAIL "fold #next enabled" after the rebirth, stuck "Chờ hảo hữu…"), run 2 59/59 — flaky, watch it |
| dev/test/oldroom-r1.js (NEW, reviewer) | 16/16: room created + one week played on the OLD main build, both reload into the new build: same seats/week, friend entries, old blob bag shown, laydo works, next week merges, S.tn equal, no page errors |
| dev/test/oldsave-r1.js (NEW, reviewer) | 16/16: old solo save (items, 2 pets incl. Kỳ lân, a child) from the main build loads at 755x1000@2, 1180x820@2, 1366x1024@2; Tư trang / Hành sự / Hoàng tự render, no overflow, no page errors |
Usage of the two new tests: build the OLD page first (origin/main dev/build → assemble.py → copy dev/index.html to .tmp/old.html).

## Checks
- Worker protocol: new fields ride the free-form relays (pos.pets/fam, res.pet/items/fam, act mode "tn" k "ctm-tn"); `end` re-sent
  after a late res overwrites sub-<seat> (Worker line 213) — compatible with the LIVE Worker EXCEPT the pos cap (fix 1).
- Rejoin: no conflict with coop-rejoin-xdev (seat copy / snapLoad / pickSnap / 4001 moved); old room reload test passes.
- Gain AND loss: B1 player acts OK (both sides checked by coop-b1 when the act runs); NPC side broken (fix 2); B5 (fix 3).
- ONE CORE: BAL.coopEmpY in jbal2.js (12). Kit: only pushModal / pushDil / existing kit dialogs; no private CSS. VANPHONG: no %,
  cổ trang wording; pet "đỡ một mạng: chỉ khi thành Linh thú" text consistent across stages.
- Every animation scene ends with a button: new notes are kit modals with ✕ / Nhận; the B3 end uses the normal Kiếp này card.
- Screenshots looked at: b2-guest-night 1180x820, b3-host-end 755x1000, b1-guest-note 1180x820, oldroom host 755x1000,
  oldsave act 1366x1024, inv 755x1000 (item pictures blank = CDN not reachable from the sandbox, same on main).
