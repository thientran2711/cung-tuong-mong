# REVIEW ban-cung (opus, BIG tier) — reviewer for Foreman D #15
- (21/11 ~11:40Z) PRIORITY #1 CHECK ('ban cung'/'bcOdds'/'palCeremony'): OD 1 (21/11 ~04:12Z, mark #53) | main origin/main:dev/build/j27.js:44 palCeremony (old free pick), jpal palFix | review/* review/ban-cung 9b67bfc0 only | claims FOREMAN D (worker session_01964izDzJ9DZJRZ4MUStHk6).
- Merge: review/ban-cung-rv 12a40f80 = review/ban-cung 9b67bfc0 + LIVE 2bab70e1. Conflicts: assemble.py (main's list + jbancung.js after jpal.js), index.html/sw.js rebuilt (build_site + assemble). Pushed.

## VERDICT: FAIL (1 law item; everything else PASS)

### FAIL list for the worker (session_01964izDzJ9DZJRZ4MUStHk6)
1. LAW 2 (equal value) + LAW 3 (gain-and-loss): a «Xin <cung>» of the SAME standing as the granted palace (st=0) has a real risk
   (refusal: Sủng −2, Danh −1; and worse odds when it is nearer, −near×nr) but NO gain. Palace position has no gameplay effect anywhere
   (MAPH.rivalSlots/PALN are read only by the map/picture code: jmapz, jpm, jres), so «Xin same-standing» is strictly worse than «Nhận» (sure, Đức +1).
   It is the COMMON case: a Phi granted a standing-2 palace can only ask standing-2 (same) or lower; Fold shot: Phi in Thừa Minh → «Xin Diên Huy» (Khá chắc)
   and «Xin Trường Xuân» (Chắc) both read "Được: dời sang … cung" + a refusal line, nothing else.
   Fix (one core, whole group): give every allowed ask a gain from BAL.banCung, printed from the same key that bcAsk applies, for player and NPC alike, e.g.
   nearer, same standing (nr>0) → Danh +ok.danhNear (research §1.2: nearness = prestige); farther, same standing (nr<0) → the humble gain (Đức +ok.ducHumble or a smaller BAL key).
   Test (law 11 scan): for EVERY (granted from, asked i) pair with i allowed, the card has a non-empty gain and shown == applied (extend dev/test/ban-cung.js).
   Keep: odds, locks, refusal price, NPC parity, co-op purity as they are.

### Non-blocking notes
- Research/map fit: the table says Vĩnh Thọ/Dực Khôn are "near the Emperor's hall"; on MAPH they are mid-distance (≈0.21–0.25 from dtd vs Diên Huy 0.12, Thừa Minh 0.13), so measured nearness ranks them ~5th/6th. Their standing 3 carries the prestige, so the rule holds; fix the doc wording ("west, by Càn Ninh") when you touch it.
- KIT (decision asked): the faded «Nắm chắc» meter on a greyed (locked) card. kitOptOdds (jk2b.js:313) gives the sure meter to EVERY card without its own odds, greyed ones included, so this card is identical to every other kitOff card in the game → NOT a kit break for this branch (worker rightly did not patch it privately). It IS a clarity fault for the whole group (a locked option must not read «Nắm chắc»): KIT REQUEST to the keeper → kitOptOdds skips .kdis / c.off cards (no meter, or a blank greyed meter), every greyed card at once. Also kit-wide: kitHint maps «Khá chắc» to "thành bại khó đoán" (jk2b) — keeper to check the word map.
- Lock reason: shown in the kit way (Cần row in the «!» info popup; tapped on iPad: «Cung gần ngự tẩm, lệ chỉ dành cho bậc Quý phi trở lên; tâu xin là vượt phận. · mở lại khi được tấn phong»). OK.
- coop-e2e 90/92 "Thái hậu picture blank on guest": reproduced once here (start + after week 1 fail, guest fid null; weeks 2/3/rejoin ok), then 92/92, 92/92 on the same build; LIVE 2bab70e1 92/92 (1 run). Same failure was logged before on coop-guest-agent (FOREMAN_B_STATUS L94, "66/68 Thái hậu pi…"), ban-cung touches no face/thO code → FLAKE w.r.t. this branch, a pre-existing co-op race. Pointer for the co-op owner: in the failing run the HOST's Thái hậu face changed c23 → c04 during week 1 (it should never change); that re-pick is likely the race.

### Checked and PASS
- Law 1 two-way: NPCs petition with the same bcChoices/bcOdds/bcAsk (bcNpcAsk, host only in co-op); the rival grudge is relAdd (both sides; the player can be the rival an NPC crosses). Decree bcGrantIx = same lock rule for player and NPC.
- Law 4 one core: every odds/price in BAL.banCung; card text prints balSg(B.*) = what bcAsk applies; card word = word(bcOdds) = roll(bcOdds). Law 6b: rival named is a living chủ vị. Law 7: ladder words only, no %.
- Rank locks (standing 3 Quý phi+, 2 Phi+), refusal cost + grudge, humble ask Đức, Nhận Đức +1: as specified; numbers sane (Phi/Sủng 60 → Khó…Nắm chắc spread).
- History fit vs dev/research/palace-residence.md: axis offices fixed (Càn Ninh/Đức Thọ/lãnh cung not askable), standing table + rank locks match §1.2–1.3 (see map note above).
- Gates on 12a40f80: ban-cung.js PASS 31 · coop-ban-cung 23/23 (both seats same odds table, card word = bcOdds) · coop-e2e 90/92, 92/92, 92/92 (flake above) · quickcheck PASS (core gates, time-spill, old save ok, perf new/live render 206/235 ms) · LIVE-revert audit: diff vs LIVE = jbancung.js, jpal.js (1 line), assemble.py (1 entry), research doc, 3 tests, rebuilt index/sw (only build-id lines removed) → nothing newer undone.
- Shots Fold 755x1000@2 + iPad 1180x820@2 (dialog top, scrolled to locked card, «!» tapped): kit act cards, no overflow, 0 page errors, no cut text. Shots in scratch only (deleted).
