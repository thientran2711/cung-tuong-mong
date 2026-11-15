# PROGRESS review/coop-pets — co-op pets + co-op audit (owner batch 15/11 ~20:05Z, coordinator s7)

Base: origin/main 23a8e80e. Files: dev/build/jcoopworld.js, jpet.js, jpetcare.js,
dev/test/coop-pets.js (new), dev/test/coop-audit.py (new) → dev/coop/COOP_AUDIT.md, dev/test/coop-e2e.js (E2E_TO env timeout only).

## Done
1. **Co-op pets (help / harm / steal the friend's pet)** — jcoopworld:
   - her entry carries her pets (`pets, petOn, petB, petBn` from P.S at the week; live in every `pos` as `pets:{L,on,b,bn}`) → the act tabs
     offer Giúp chăm thú / Hại thú / Trộm thú on her exactly as on an NPC; never written back by the week merge.
   - runAct wrapper: for petcare / thaopet / petsteal on her entry, the change of each of her pets goes out as `res.pet` ops
     (`{op:"d",t,at,d:{full,clean,joy,aff}}` | `{op:"lose",t,at}`); the friend-entry stat side effects of petLose (follow bonus, Thái hậu −8)
     are taken out of `fx` (her own petLose re-does them once). Her client applies ops to her own pets + note (Đói −25 …, "cửa lồng mở…").
     The stolen pet is mine at once (petAdd on my S, keeps its stage).
   - `coopPetAct(kind)` (jpetcare) = the same act from code: "care"|"harm"|"steal".
   - petsteal now uses petLose (bonus leaves with the pet; was a bare splice — also for NPCs / single-player).
2. **Late res fix (all acts)**: a `res` that reached her after she had sent `end` was lost at the merge. Now she re-sends `end` (server
   overwrites her sub) BEFORE the ack; my week end waits for the acks of my `res` (≤10 s).
3. **Gift to the friend (audit fix)**: Tặng quà / handmade / food gift to her used to vanish (pushed into her entry's bag only). Now
   `res.items` → her own "Quà tặng" dialog (giftin: keep / thái y nghiệm; jpoison's food path), `from`/`by` mapped to my pid.
4. **NPC pets in co-op**: petWeek/petMonth run NPC pets on the host only (`petNpcs()`, jpet); before, the merge added the NPC pet decay
   and costs twice.
5. **Ngự tứ = Linh thú only** (coordinator): code already gated `rescue` at stage 3; texts fixed: base use "khi đã thành Linh thú thì ĐỠ MỘT
   MẠNG…" (event offers petLine), Non stage no longer promised the rescue "lớn lên mới…", stages 1–2 "đỡ một mạng: chỉ khi thành Linh thú".
6. **Pet bar label**: coordinator first said "Đói"; OWNER 15/11 ~22:30Z overrode it: label stays **"No"** (fullness, higher = better).
   The Đói change + kit `hot` option were reverted (jk4/jkitpage/KIT.md = main). Kept: game result/log show the real change after clamp;
   unpaid upkeep now lowers full/joy (was care only, overwritten by petcSync).
7. **Co-op audit** `python3 dev/test/coop-audit.py --md dev/coop/COOP_AUDIT.md` (table + evidence + big-item plans B1–B5).

## Tests
- dev/test/coop-pets.js (live Worker, host 755x1000@2 + guest 1180x820@2): 2 rounds 44/44, 4 rounds 48/48 (pre-gift), 6 rounds 56/56 (pre-gift),
  final build 2 rounds 44/44 (incl. gift). One early run had a week not merging in 60 s under load 14 (not reproduced in 3 later runs).
- coop-e2e (E2E_TO=120000, load ~40): 3 runs 59/59 each. pets-fix.js 755x1000@2, 1180x820@2, 844x390@3 + old save (main): pass, 0 errors.
  Final build (No label) coop-pets 2 rounds 44/44.

## Open / next
- Big co-op items (not started): B1 friend's items/kids/servant entry, B2 nights + heir host-authoritative, B3 Emperor death, B4 festivals +
  NPC schemes reach the guest, B5 seat caps across players — see dev/coop/COOP_AUDIT.md.
- NPC that steals the GUEST's pet: the NPC does not keep it if the host's NPC pet array changed that week (non-id arrays: host wins).

## Commands
- `python3 dev/build/assemble.py && bash dev/site/build_site.sh`
- `node dev/test/coop-pets.js <outdir> [rounds]` · `E2E_TO=120000 node dev/test/coop-e2e.js <outdir>`
