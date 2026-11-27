# E-TITLES3 — titles2 content fix on review/titles-daycard-lrm → review/titles-daycard-lrm2 (Foreman E child3, 27/11)

PRIORITY #1 CHECK: OD 26/11 ~18:20Z TITLE REBALANCE (read verbatim) + brief E-TITLES3 (MAIN 175 order) | main 611fca61: jdh3/jdh3n NOT on LIVE; dhNoteGate jdh.js:193 only on review/titles-daycard-lrm | review/titles-daycard-lrm 16e8b575 (base), dev/measure/title-bal-bot.js | claims: none for this fix | reused: jdh dhNoteGate / S.dhPend / BAL.dh.note.per, jdh3 RP / RULE / rpSync / rpNotice, kit panel + rows, DH3N format.
KIT CHECK: reuses kitPanel (kind reward/info) + its rows, kitModal info card, kitTitlePlate (KIT §82/§82.1). No new UI part; one new kit ROW («Bậc») in the existing rows list.

Branch: **review/titles-daycard-lrm2** (base 16e8b575). Head: see §6. Never pushed main, no PR.
START_CTX ≈ 4 % (estimate; get_session reads 0).

## 1. F1 — every title panel through the ONE gate (law 11, whole family)
Scan: every place that opens a panel for a NEW title (grep kitPanel/kitModal/dh:1/dhInc/S.dh[...] in j*.js):

| title family | opener | before | after |
|---|---|---|---|
| jdh achievement titles (art, works, nights, kids, thỉnh an, c_han / c_th …) | dhSync → dhNoteGate → dhNotice | gated | gated (unchanged) |
| titles2 chapter / side / việc nhờ / mưu hại / lập công (cp_ ca_ vn_ mh_ lc_) | cpGive → dhInc → dhSync | gated | gated |
| khuê các titles (jkcg KCT) | dhInc | gated | gated |
| Thiên mệnh shading titles (jge) | dhInc | gated | gated |
| **reputation «Tiếng thơm / Tiếng xấu» (jdh3 rp_*)** | rpSync → rpNotice → own kitPanel | **BYPASS** (one panel per title, several a buổi) | dhNoteGate("rp:<id>") |
| **the Emperor's hiệu «Sắc phong ban hiệu» (jdh2)** | dhHieuGrant → dhHieuNotice → own kitPanel | **BYPASS** | dhNoteGate("hieu:<why>") |
| hiệu taken «Bị thu hiệu ban», «Đường sám hối» (jdh2) | punishment notices, not a new title | — | unchanged (not a title gain) |
| Thiên mệnh board (jge:197), wear / list panels (jdh) | opened by her tap | — | unchanged |

| **«Danh hiệu mới / lên bậc» option cards (Foreman E add; runner E-S5 on LIVE: «Để sau» did nothing on 3 taps)** | dhNotice kitPanel kind «reward» | **became a Bàn bài hand** (jkhand kitHandWants checked only KIT_HAND.notKinds info/rule/help, though KIT §101 lists Danh hiệu as NOT a hand): a tap only LIFTS the card, the ✓ must be tapped → «Để sau» / «Đeo ngay» «do nothing». **On LIVE main 611fca61 too** (same jkhand + jdh) | kitHandWants also skips any `spec.dh` panel (KIT.md §101 WHERE line updated): plain kit cards, one tap runs |
| «Đeo ngay» → the wear panel «Đeo «…»» (jdh dhPick, kind info) | opened inside the choose pass | **stayed in Q behind a hidden modal** (nothing on screen) once the hand was gone; under the hand it needed ✓ | opened after the choose pass (setTimeout 0 + showModal) |
| «Tiếng thơm / Tiếng xấu», Danh hiệu list, Thiên mệnh board | kind reward / info, spec.dh | rp reward panel was a 1-option frame (no hand) | all `spec.dh` → never a hand |

Real-tap test dev/test/title-notice-tap.js (Fold 755x1000 + iPad 1180x820, mouse at card centre): before 4/10 (a tap on «Để sau» or «Đeo ngay» only lifts the card), after 10/10. dev/test/kit-hand.js PASS on the head (event hands unchanged). Shots looked at: the «Danh hiệu mới» panel = two plain kit option cards (Đeo ngay with Tốn / Được «không» rows, Để sau), nothing clipped, both devices.

How: jdh `DH_NOTE[kind]` registry; dhNoteGate shows plain keys with dhNotice and "<kind>:<arg>" keys with DH_NOTE[kind]; a show function returns false when the title is gone by then (lost while waiting) → no slot used, the next waiting key comes. Log lines are still written at the moment of gain. Old saves: S.dhPend is a list of strings as before.

## 2. F2 — one matter = one ladder NHẸ · VỪA · NẶNG (law 2 + TITLE REBALANCE rec (3)(5))
Scan of the 28 reputation titles for same-matter groups (dev/test/titles2-unit.js G7 checks the ladders):

| matter | NHẸ | VỪA | NẶNG | before |
|---|---|---|---|---|
| sắc (beauty) | Quốc sắc thiên hương | Phong hoa tuyệt đại (+ tài) | Khuynh quốc khuynh thành (+ Hoàng thượng say mê: sung ≥ BAL) | all three could be held at once (robot: quocsac + khuynh same buổi) |
| sủng (favour gossip) | Chuyên sủng | Hồ mị hoặc chủ | Hồng nhan họa thủy | all three at once possible |
| đức (virtue) | Tri thư đạt lễ | Khiêm cung | Hiền lương thục đức | all three at once possible |
| ác đức | Kiêu phi | Thất đức | Độc phụ | all three at once possible |
| mưu / miệng | Trường thiệt phụ | Đố phụ | Thâm bất khả trắc | all three at once possible |
| con | Phúc tinh | — | Mẫu bằng tử quý | both at once |
| vượt khổ | Nhẫn nhục phụ trọng | — | Phượng hoàng niết bàn | both at once |
| exclusion | «Tú hoa chẩm đầu» not while a beauty rung is held | | | could sit beside Quốc sắc |

Own-matter titles (one each, no ladder): Vịnh nhứ chi tài, Khoan hậu, Cần kiệm / Tham tài (opposite tones, exclusive by Đức), Trung can nghĩa đảm, Vu cổ, Hàm oan, Hồng nhan bạc mệnh.
Rules: only the highest rung whose rule holds is held; a higher rung REPLACES the lower (log «thôi gọi … nay gọi …», no loss line); when it is lost she falls back only if the lower rung is earned again. Effects rise with the rung (BAL.dh.rp.T; same kinds kept):

| title | old g / l | new g / l |
|---|---|---|
| quocsac | sung 10 / muu −4 | sung 12 / muu −4 |
| khuynh | sung 8 / muu −8, bar sac 95 | sung 6 / muu −12, bar sac 95 + sung 85 (keep 70) |
| chuyensung | sung 10 / muu −8 | sung 12 / muu −4 |
| hien | tren 10 / danhLoss 2 | tren 6 / danhLoss 2 |
| docphu | muu 8 / sung −5 | muu 8 / sung −4 |
| truongthiet | muu 4 / danh −6 | muu 4 / danh −8 |
| thambat | muu 8 / sung −8 | muu 12 / sung −5 |
(share kinds: smaller d = bigger share.) Player words show the rung in a kit row «Bậc: giữa · trên «Quốc sắc thiên hương»» on the notice and the info card (no numbers).

Bars not met at entry:
- **BAL.dh.rp.per = 1**: at most one NEW reputation name a sync (a rung replacing its own lower rung is not new); the others come at the next syncs if they still hold.
- **BAL.dh.rp.seen = 8 months**: no reputation title before the palace has watched her 8 months (≈ buổi 96; LIVE TITLE-BAL first-title target ≈ buổi 95+). Her clock starts on her first sync outside the khuê các; an NPC consort at court is already known (t0 = now − seen). Earning only; a held title keeps by its own keep rule (old saves keep theirs; old save holding two rungs keeps the highest — G6).
- Entry probe (9 palace origins × 3 seeds, fresh life, rpSync at entry): before = «Tham tài» at entry for every muối life (dowry bạc + low Đức); after = 0 titles at entry for all 27. Cần kiệm / Tham tài now count only bạc gathered since that first watched month (BAL grow 100 / 150).

## 3. GAP — 44 LIVE roads without a DH3N pair (land-remerge §D7)
### Expert pass (law 8) — cổ trang chapter naming
- Chương hồi novels (Tam quốc diễn nghĩa, Hồng lâu mộng, Hoàng Lê nhất thống chí) title each hồi as a parallel couplet (đối): same object, mirrored verb. Our good/bad pair is that couplet split in two: SAME object, opposite act (Giữ … / Bán …).
- Palace dramas (cung đấu: Chân Hoàn truyện, Diên Hi công lược, Như Ý truyện) name episodes by the concrete prop or place of the turn (chén rượu, phong thư, lệnh bài, hồ sen) — never by abstract virtue; the virtue is in the verb.
- Four Hán-Việt / Nôm syllables is the natural cổ trang rhythm (bốn chữ, like thành ngữ); ≤ 4 words keeps the plate on one or two lines (K-DH-CAPFIT).
- Good verbs: giữ, trả, gỡ, cứu, nhường, dâng, minh, thật; bad verbs: bán, đổi, tráo, chặn, ép, nuốt, vu, giấu, đút lót. No modern words (checked: no «chợ đen», «phiếu», «thao túng», «quảng cáo»); no numbers; no real-person names; tokens {land}/{foe} never in a name.
- Composed roads (rdc) share their middle beats .5–.10 inside one origin (e.g. every tt_* road has «chén rượu đầu của môn sinh» at .5). The road's own matter (premise .4 / finale .11) colours each beat so every road keeps its own name and DH_CAT stays unique (titles2-scan dups 0).
### Result
44 roads × 8 chapters × 2 = 704 names in dev/build/jdh3n.js (DH3N.cp), e.g. tt_ruong: «Trả ruộng về dân / Nuốt ruộng công điền» … «Ruộng về tay dân / Ruộng về túi riêng»; bd_su: «Nuôi sư tử cống / Thả sư tử cống» … «Sư tử yên chuồng / Sư tử sổng chuồng»; pf_tra … «Tay nải về chùa / Tay nải vào kho». titles2-scan: missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 (2473 keys).

## 4. Tests (all on the head build)
| gate | result |
|---|---|
| node dev/test/titles2-unit.js (head 5c3bbca3) | PASS 84/84 (was 68/69 F1-gap; new G1–G8 (G8: one new name a sync): rp + hieu panels gated, stale key no slot, ladders, seen wait, old save two rungs, 300 random states never two rungs) |
| node dev/test/titles2-scan.js | missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 |
| node dev/test/chapter-title-hook.js | PASS 41/41 |
| shots Fold 755x1000 + iPad 1180x820 @2 (notice «Tiếng thơm» with the «Bậc» row + info card; looked at) | kit panel, no clip, no overflow-x, page errors 0; /home/user/wt/t3-shots (outside git) |
| quickcheck (89718cc5) | old save from LIVE loads + plays a buổi, 0 errors · open 0 errors · time-spill PASS · core gate G4 dialog-fixed FAIL 4 (3-dai-ket-cuc seal / XL figure) = the pre-existing LIVE 611fca61 fault (land-remerge.md), not in my files |
| node dev/test/title-notice-tap.js | PASS 10/10 (before 4/10) |
| node dev/test/kit-hand.js | PASS |
| title-bal-bot before / after | §5 |

## 5. Robot (dev/measure/title-bal-bot.js, palace, maxBuoi 300, death shield)
Before = base build 16e8b575 (seeds 1, 2; lives cut short by the box, gains are what happened); after = head 5c3bbca3 (seeds 1, 2, 300 buổi each). Gains = [title, buổi].

| run | before | after |
|---|---|---|
| tt/cung seed 1 | rp_tham @3 (dowry at entry), nights @20, rp_chuyensung @20 (80 buổi run) | lc_conbenh @20 (a lập công feat, once at its close — not reputation), rp_nhannhuc @225 |
| cnv/cung seed 1 | rp_quocsac @43, l_y @51, **rp_khuynh @51 held beside quocsac** (two rungs of one matter), l_y @155 | l_y @130, l_y @150 |
| tt/cung seed 2 | none in 90 buổi | rp_nhannhuc @139, vn chain @212, lc_dichbenh @245 |
| cnv/cung seed 2 | l_y @46 ×2, l_theu @133 | l_y @126, l_y @170 |
| first reputation title | buổi 3 / 20 / 43 | buổi 139 / 225 (target ≈ 95+) |
| two reputation names in one buổi / two rungs of one ladder | yes (seed 1 cnv: quocsac + khuynh held together; reviewer's run: both at buổi 20) | never (also titles2-unit G7: 300 random states) |

An intermediate head (before BAL.dh.rp.per) gave two names at buổi 100 when the seen wait ended (rp_nhannhuc + rp_thatduc) → fixed by per:1 (titles2-unit G8). Entry probe (27 fresh palace lives, rpSync at entry): before 9 titles (all «Tham tài», muối), after 0.

## 6. Commits (review/titles-daycard-lrm2)
f59187e3 F1 + F2 · 98d52b05 44-road names · 5956cb9f grow (dowry) · 89718cc5 built · 287e80e5 title panels no hand + Đeo ngay · bc0804f0 built · cb36238f per:1 · **5c3bbca3 built = HEAD**

## 7. Notes
- Pre-existing, not mine (LIVE TITLE-BAL jdh): the «Danh hiệu mới» «Cách có» row prints digits («đọc sách 15 lần · đủ 50 lần») — law 7 wording for TITLE-BAL owner.
- jkhand.js is a kit file: the change only makes the code follow the rule KIT §101 already states (Danh hiệu panels not a hand); kit keeper please confirm.
- Pre-existing, not touched: the rpNotice option «Đã hiểu» is not drawn as a button in the kit panel (only ✕ closes it); the opts code is unchanged from the base branch (not re-shot on base).
- Handover: none needed (finished in one session).
