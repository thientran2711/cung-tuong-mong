# inv-stack — S.inv unstacked entries → huge DOM / slow late game (FIXER inv-stack, Foreman B ROOT 2 child 2; MAIN 154 ORDER 26/11 ~07:50Z)
PRIORITY #1 CHECK ('stack inventory' / 'invAdd' / 'invS'): OD 0 | ledger 0 | main 0 (no stacking code; 116 raw `inv.push` sites) | review/* 0 (review/inventory-origin = Tư trang UI only) | claims: this fixer (FOREMAN_B_STATUS 08:52Z). Reused: jil ledger (ilS / ilDur / census), kit `kitItem` qty badge (×N), kinvGroups, kitShopSellable / kitShopSellList, jgpick tile grid.
Branch `review/inv-stack` (base origin/main 6b5d3d05, LIVE). Does NOT touch jksize.js / jinv.js observer code (Fold freeze fix c20aaa6e lands separately); jinv.js edits are only kinvGroups / kitShopSellable / kitShopSellList / shop `have` + buy.

## Root (F 07:45Z evidence, s7 robot save `dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz`, year 18)
| place | entries | of which |
|---|---|---|
| S.inv (her chest) | 1,437 | 518 alnen0, 154 aldau0, 145 tragoi, 127 vaibong … all from:"noivu" (lệ tháng, one entry per piece for 18 years) |
| 43 NPC bags | 7,537 | son phấn boxes, robes, lệ tháng |
| ledger store S.il.box | 20,688 records = 2.75 MB of the 4.76 MB save | 5,534 alnen0 + 4,738 alnen1 + 2,848 aldau0 + 3,000+ son phấn «kho» records: NPCs' used-up lệ tháng routed by `ilGuard("stipGoods","kho")` every month (candles / oil / son are not in IL_USED_KD) and walked one by one by `ilWeek` every week |
Every list drew one card per entry (gift pickers, Tư trang), so DOM 43k / renderer 2.4 GB.

## Fix (one core `dev/build/jstack.js`, numbers `BAL.stack` — law 4)
1. **ONE add rule** `invAdd(p,e)` — all 115 push sites into a person's chest go through it (table below; guard `dev/test/inv-stack-scan.py`, exit 1 on any raw site).
2. **Stacks (law 6c, every piece stays real and traceable):** p.inv keeps at most `BAL.stack.live` (2) real pieces of one kind-and-source (`invSig`: same k + from + giver + src + uses u + colour c + … — every field but the ledger id iu and the date). The rest sit in the person's own stack `p.invS = [{k, from, giver, src, u, c, …, n, d (latest), d0 (earliest)}]`: owner = the holder, source/giver kept, count n, dates kept. A piece with any identity field (worn w, hidden h, taint t/by, lost-case lo/gh, handmade wk, co-op ci/hiu, sắc phong book/seal, tp) is never stacked.
   Every per-piece road (use, give, gift, sell, steal, confiscate, plant, co-op fam/b4 ops, the ledger census + guards) keeps working on the real pieces exactly as before; after a piece leaves, the next comes out of the stack (`invTop`: start + end of every turn for everyone, before every render for her, before the bag / Bán / gift lists). Folding runs after the turn (`invFoldAll`), never on pieces received this turn (reveal / skim / pilfer / ledger still see them), and drops the folded pieces' ids from the ledger map (no false «vanished» route).
3. **Ledger store** folds the same way (`S.il.bs`, plain parked records at Nội vụ phủ, why kho / dead, no timer): boxFold / boxTop / boxCount. A dead NPC's stacks go to the store as one counted record (as the census does with her real pieces).
4. **Old saves:** on load (`deser` wrapper) every bag + the store fold (no piece lost — test).
5. **Counts** read real pieces + stacks: Tư trang bag grid (kinvGroups jinv + jecon override → tile ×N), Bán (kitShopSellable / kitShopSellList, selling ×N takes the next piece out of the stack), shop «có» (jinv Nhờ thái giám mua, jact hàng hiếm), Thái hậu gift weight (jagacts th:gift), NPC lệ tháng keep (jstip npcKeep counts her stack, the oldest still used up as before), gift pickers (jgpick: twin tiles → ONE tile with the kit stack badge `kitItem qty` ×N, hidden twin cards dropped).
6. **Two-way (law 1):** the same rule for her, every NPC and the servants. A co-op friend's ENTRY (v.coop = a copy of her chest, bagOf) is never folded — she folds her own chest on her own seat, so famDiff / b4Ops / famSame keep diffing real objects; NPC bags fold only where the NPCs live (solo / co-op host seat a).
Known difference (law 6c holds): a road that picks «a random piece» of a person (theft, confiscation) now picks among her real pieces, so one kind with 500 pieces no longer outweighs every other kind 500:1; the stacked ones come out and can be taken next.

## Results (s7, Fold 755x1000 + iPad 1180x820)
| | before | after |
|---|---|---|
| S.inv entries | 1,437 | 117 real + 39 stacks |
| NPC bag entries | 7,537 | 4,711 real + 596 stacks |
| ledger store records | 20,688 | 3,930 + 861 stacks |
| totals per kind (her, each NPC, store) | — | equal (0 differences) |
| save size | 4,757,978 chars | 2,758,781 |
| load (deser + fold) | — | ~1.0 s |
| Tư trang bag DOM | one card per entry | 608 nodes, tile «Nến mỡ dê ×518» |
| «Dâng quà» / «Biếu quà làm lành» DOM | ~37k (one hidden card per entry) | 2,319 / 2,226 (KIT REQUEST K-LIST-PAGE for < 2k) |
| page DOM (bag open) | 43,526 (F) | ~4.1k |

## Readers of S.inv / p.inv (law 11 scan: 927 `inv` reads in dev/build, `/home` list from `grep -n '\binv\b' dev/build/j*.js`)
Per-piece readers (find / splice / indexOf / some / iterate one piece: use, give, gift, sell one, steal, confiscate, plant, wear, ledger census + guards, co-op fam/b4 ops, lost cases …) work on the REAL pieces and are unchanged by design — the stack keeps ≤ live real pieces out (invTop at the start/end of every turn, before every render, before every list below), so «has one / take one» behaves as before. Readers that COUNT or list per piece were changed:
| site | before | after |
|---|---|---|
| jinv.js kinvGroups (Tư trang bag grid, tab counts) | n = real entries | invTop first; n += the stack of that kind-and-source (invMoreOnce) → tile ×518 |
| jecon.js kinvGroups override (giver-split groups) | same | same fix |
| jinv.js kitShopSellable | n = real entries | invTop first; n += stack |
| jinv.js kitShopSellList (Bán, Nội vụ phủ) | n = real entries; ×N sale ran out after the real pieces | invTop at each list read (each sale takes the next piece out); invTop after the sale; n += stack |
| jinv.js Nhờ thái giám mua `have` / buy | `S.inv.filter(k).length` / `S.inv.push` | `invCount(S,…)` / `invAdd` |
| jact.js hàng hiếm `have` | `S.inv.filter(k).length` | `invCount(S,…)` |
| jagacts.js th:gift (what the favoured one lacks) | `p.inv.filter(k).length` | `invCount(p,…)` |
| jstip.js NPC lệ tháng keep (npcKeep×3) | real entries only | her stack counts too (its pieces come out, the oldest are used up as before, same ilGuard «kho» road) |
| jgpick.js kipBuild / kipTile (every picker with `ik`: «Dâng quà», «Biếu quà làm lành», Tặng, Cài vào rương …) | one tile + one hidden card per entry | twin pieces with the same offer = ONE tile, kit badge `kitItem({qty})` ×N (real twins + stack), hidden twin cards dropped |
| jgift.js courtMeet «chọn món trong rương (N món)» | `S.inv.filter(...).length` | `invCount(S,…)` (every piece, stacks included) |
Not a person's chest (left as is): `KMSNAP.inv` (bag snapshot for the new-piece animation: j93:317, jitev:201, jpromo:77, jstip:113), jdisp `F.inv` / local `inv` (display fixture).

## Push sites (ONE add rule) — before / after
| site (main 6b5d3d05) | chest of | before | after |
|---|---|---|---|
| j2.js:188 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j24.js:26 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j29.js:65 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j67.js:1717 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j8.js:253 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j8.js:279 | `r` | `r.inv.push(x)` | `invAdd(r,x)` |
| j8.js:284 | `t` | `t.inv.push(x)` | `invAdd(t,x)` |
| j8.js:311 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j8.js:511 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j8.js:547 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j8.js:550 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j8.js:551 | `f` | `f.inv.push(x)` | `invAdd(f,x)` |
| j8.js:552 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j83.js:107 | `r` | `r.inv.push(x)` | `invAdd(r,x)` |
| j83.js:131 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| j83.js:208 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| j83.js:253 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j83.js:259 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j83.js:263 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:152 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:153 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:173 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:225 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:310 | `t` | `t.inv.push(x)` | `invAdd(t,x)` |
| j92.js:326 | `o` | `o.inv.push(x)` | `invAdd(o,x)` |
| j92.js:377 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| j92.js:403 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| j93.js:317 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| j97.js:29 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jact.js:106 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jagacts.js:112 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jagacts3.js:92 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jagharm.js:112 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jallot.js:67 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jallot.js:105 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jallot.js:113 | `s` | `s.inv.push(x)` | `invAdd(s,x)` |
| jcoopworld.js:648 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jcoopworld.js:745 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jcoopworld.js:750 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jcoopworld.js:1509 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jcui.js:31 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jdc.js:210 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jdemo.js:56 | `o` | `o.inv.push(x)` | `invAdd(o,x)` |
| jdh2.js:48 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jdh2.js:69 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jdisp.js:68 | `F` | `F.inv.push(x)` | left: not a person's chest (F: bag snapshot / display fixture) |
| jdisp.js:70 | `F` | `F.inv.push(x)` | left: not a person's chest (F: bag snapshot / display fixture) |
| jearn.js:21 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jeitem.js:60 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jeitem.js:130 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jeitem.js:130 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jeitem.js:152 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jeitem.js:163 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jeitem.js:164 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jeitem.js:166 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jeitem.js:167 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jevb.js:116 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jfx.js:442 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| jgenpc.js:125 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jhd.js:242 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jhd.js:250 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jil.js:78 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jitev.js:180 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| jitev.js:200 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jitev.js:201 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| jkc3.js:164 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jkcco.js:78 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jkcco.js:118 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jkcg.js:82 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jkcg.js:85 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jky.js:209 | `F` | `F.inv.push(x)` | `invAdd(F,x)` |
| jlost.js:87 | `o` | `o.inv.push(x)` | `invAdd(o,x)` |
| jlost.js:88 | `o` | `o.inv.push(x)` | `invAdd(o,x)` |
| jlost.js:92 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jlost.js:100 | `t` | `t.inv.push(x)` | `invAdd(t,x)` |
| jlost.js:113 | `o` | `o.inv.push(x)` | `invAdd(o,x)` |
| jlost.js:117 | `h` | `h.inv.push(x)` | `invAdd(h,x)` |
| jlost.js:196 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jlost.js:307 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jpetlife.js:67 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jpma.js:70 | `win` | `win.inv.push(x)` | `invAdd(win,x)` |
| jpoison.js:89 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jpoison.js:119 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jpromo.js:58 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jpromo.js:77 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| jptime.js:311 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jptime.js:320 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jptime.js:507 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jration.js:102 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jration.js:103 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jration.js:104 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jration.js:148 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jration.js:155 | `to` | `to.inv.push(x)` | `invAdd(to,x)` |
| jration.js:173 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jration.js:196 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jration.js:205 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jrcp.js:313 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jrcp.js:319 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jrcv.js:66 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jrcv.js:66 | `f` | `f.inv.push(x)` | `invAdd(f,x)` |
| jrcv.js:173 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jrcv.js:234 | `a` | `a.inv.push(x)` | `invAdd(a,x)` |
| jselx.js:55 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jshelf.js:188 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jshelf.js:190 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jstip.js:103 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jstip.js:113 | `KMSNAP` | `KMSNAP.inv.push(x)` | left: not a person's chest (KMSNAP: bag snapshot / display fixture) |
| jstip.js:117 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jstip.js:126 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jtoilr.js:57 | `h` | `h.inv.push(x)` | `invAdd(h,x)` |
| jts.js:272 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jts.js:301 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jts.js:357 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jtsb.js:95 | `a` | `a.inv.push(x)` | `invAdd(a,x)` |
| jtsb.js:151 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jty.js:39 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jty.js:117 | `S` | `S.inv.push(x)` | `invAdd(S,x)` |
| jveil.js:52 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jveil.js:67 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jveil.js:68 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jveil.js:95 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jveil.js:211 | `v` | `v.inv.push(x)` | `invAdd(v,x)` |
| jwdinv.js:40 | `p` | `p.inv.push(x)` | `invAdd(p,x)` |
| jdc.js:233 | `v` (local `inv=dcInv(v)`) | `inv.push(w.tram)` | `invAdd(v,w.tram)` |
| jdc.js:245 | `v` (local `inv=dcInv(v)`) | `inv.push(old)` | `invAdd(v,old)` |
