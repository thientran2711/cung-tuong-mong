# D19-GIFT-NPC — report (worker session_01D3E3NanQicQRaAsfLfS2TM, Foreman D)

PRIORITY #1 CHECK: OD 0 hits «d19-gift»; OD L752–753 (Biếu quà làm lành, three roads) + OD 18/11 ~21:15Z L1916 (receiver choice, jrcv) | main dev/test/d19-gift.js, dev/build/jts.js:226–297 (D19), dev/build/jrcv.js:64 rcvGiftIn, dev/build/j8.js:282 giveTo, dev/build/j83.js:98 wkGive | review/* none on this topic | claims D19-GIFT-NPC = this session | archive reports/d19-gift-work.md, live-bugs-2711 (gift-dead-scan) reused, not rebuilt.

Branch **review/d19-gift-npc** off LIVE 8330e8b8. Commit: see «SẴN SÀNG KIỂM» at the end.

## 1. Cause

### 1a. «NPC piece road» intermittent (LC32 Fold 2/4 FAIL)
- The return IS a real rule: **jrcv receiver choice (OD 18/11 ~21:15Z, OD L1916, law 1)** — a gift to an NPC goes through `rcvGiftIn` (j8 giveTo → jrcv:64), and the NPC picks among HER giftin answers (Nhận / Trả lại quà / Xét nghiệm) by `rcvPick` weights × `BAL.rcv.k.gift` (random, jmind slip). So the test must seed/force that branch (done).
- But the game handled the return WRONG (faults, fixed):
  1. `giveTo` (j8:285) added the receiver's liking `relAdd(a,r,g+3)` (which also mends oán, `BAL.relOan.mend`) and `hh` BEFORE asking her answer → a gift sent back came home **and** still bought thiện cảm + eased oán (law 3: gain without paying; law 6c ok — the piece is copied home).
  2. `tsGiftPiece` (jts) treated «kept» as `a.inv.includes(e)`; rcvGiftIn sends back a COPY (`Object.assign({},e)`) → a returned piece counted as given: oán eased by BAL.tsGift.oan, ghen eased, and her log said «Lời lẽ mềm mỏng, lòng nàng dịu đi. Được: … Mất: <món>» although the piece was back in her chest. For an NPC (tsNpcGift) the refusal line was returned as a success and the bạc road was never tried.
  3. `wkGive` (j83, works) never called rcvGiftIn: an NPC could send back an item but never a work (law 1 / law 11 gap in the same receiver-choice rule).

### 1b. «item road» FAIL Fold + iPad (pre-existing on LIVE, 3/3 runs)
- Test set-up: `oanAdd(v,S,30)` is paced by jstatpace (OD 26/11 ~04:20Z) to **12** (`BAL.stp.band.oan` = [4,8,12]); bạc road −5, work road −5 and the work's own relAdd mend took the grudge to 0, so the item road had nothing left to ease → `oan: 0`. Fixed in the test (set-up written with `SP_OFF`, as start values are).
- Game fault behind it = the OPEN item **«d19 bớt oán 5 has no effect»**: `tsGiftEaseTxt` printed the BAL number (`bớt oán 5`, `bớt ghen 8`) whatever she still held; with oán already 0 the line promised an ease that cannot happen (law 4: the line must say what the rule does). Fixed: `tsGiftEaseN` caps each ease by what she still holds; `tsGiftEase` returns the real amounts and the result line prints them; nothing to ease → «<tên> vốn đã nguôi lòng, chỉ thêm thiện cảm» (the gift still buys thiện cảm, law 3 kept).

## 2. Ruling
- Return = REAL RULE (OD 18/11 ~21:15Z, dev/OWNER_DECISIONS.md L1916; jrcv header) → test forces the receiver's answer (`rcvPick` «gift» = take for the three roads; a separate «Trả lại quà» branch for her item, her work and the NPC piece).
- What happens AFTER a return = FAULT → game fixed (no new rule invented: a returned gift = «Lễ làm lành không thành, lòng nàng chưa dịu» — the existing jdis-refusal line; the NPC falls back to the bạc road exactly as the existing code already did for a jdis refusal; the receiver's own rcvGiftIn «back» cost `BAL.eff.j8.go_2` is unchanged).
- Numbers: only BAL (BAL.tsGift.ghen / .oan / .aff / .bac, BAL.eff.j8.go_2, BAL.stp). No new BAL key. No new UI; text only through the existing log lines (no kit part touched, law 9 n/a).

## 3. Family (law 11) — every single-piece gift road, forced Nhận / Trả lại quà
Scan: `node dev/test/gift-return-scan.js <root> [out.md]` (new). Bạc-only roads (tsGiftBac) carry no piece → covered by d19-gift «bạc road» + the real-ease text. NPC→player gifts (PEND.giftin) are HER own choice card (Nhận / Trả lại quà with its shown cost) — not changed (see Notes).

BEFORE (LIVE 8330e8b8): GIFT-RETURN-SCAN FAIL 7

BEFORE_TABLE

AFTER (branch): GIFT-RETURN-SCAN PASS

AFTER_TABLE

## 4. Gates (on the branch commit)
GATES_HERE

## Notes for rv / MAIN
- NPC→player (PEND.giftin): giveTo still adds the giver's side of relAdd before she answers (j8 r===S path, unchanged order) — her «Trả lại quà» shows its own cost; several other senders (jrcp, coop, jptime) push giftin without that pre-add, so that path is already uneven. Not changed here (it is her card, and changing it moves her numbers); flagged as a possible follow-up for MAIN.
- Liking moved after the answer: `rcvP` now reads the receiver's liking from BEFORE the gift (it used to read it after the free +g+3), so her willingness to keep a gift is judged on the real relation.
- Co-op giver: `tsGiftPieceGo` is the same function the co-op intent calls (jcoopthinf.js:308) → fixed with it.
