# D-FAMILY-GIFT — report (worker session_01964izCqcy28euSanyuhN8A, Foreman D ROOT)
PRIORITY #1 CHECK: OD 26/11 (c) «gifts to family» (PARKING_LOT row 35, e-park-audit row 35 + item 2: PARTLY) | main j55.js:192/212 «Biếu quà, gửi thư cho <head>» (five court houses only, HIDDEN for her own father: `hd.dadOf==="me"?""`), jkcg.js:86-131 family→her (letters, home gifts, «Viết thư thăm nhà» / «Xin nhà gửi đồ vào», Khuê các road only), jecon.js:20/43 BAL.home money every 3 months, j72 «fam» favour quests (family ASKS her, e.g. j72c-fam-010 «xin ít bạc sửa mái nhà»), jemoact.js:227 «Viết thư nhà» (mood vent only, nothing travels) | review/* review/d-giftin-like-rv 7c143419 (row 10, base), review/d19-gift-npc-rv (live) | claims none (ORDER MAIN 189 in FOREMAN_D_STATUS).
KIT CHECK: reuses kitRows, pbtn act card, PEND/Q option dialog (one formatter markTxt: Tốn exact, Được/Mất marks), KINV_XTRA Tư trang sub-tab «Thư nhà», resultShow card, jil ledger (ilOut/ilGone/ilLog).
START_CTX: ~4 % of the 1M window (get_session read 0; own estimate). Rollover at ~29 %, ceiling 60 %.

## §EXPERT (law 8) — could a Qing consort send gifts / money home?
Tags: **H** = history (sourced or standard scholarship), **D** = drama convention, **?** = uncertain / not verified this session.

| # | Point | Tag | Source / note |
|---|---|---|---|
| E1 | On entering the palace a consort was formally the emperor's household; ties to her natal family were cut down to what the court allowed. | H | Smithsonian NMAA «Empresses of China's Forbidden City 1644–1912» overview (asia-archive.si.edu/exhibition/empresses-overview): a chosen consort "severed ties to her natal family". |
| E2 | Contact went only through approved channels: palace eunuchs and the Neiwufu (Nội vụ phủ) registered what went in and out of the inner court gates (Thần Vũ môn); private carrying in or out by eunuchs was a punishable offence. | H | Standard scholarship on Qing household rules (Kinh sự phòng / Neiwufu regulations 《钦定宫中现行则例》); E. Rawski, *The Last Emperors* (1998), ch. on the Imperial Household Department: bondservants supervised eunuchs. Exact article not re-checked this session (?). |
| E3 | The mother could be allowed into the palace on set occasions (e.g. late pregnancy / birth); home visits (省亲) by consorts were extremely rare and ceremonial. | H/? | Widely cited Qing practice; one popular source cites a 1723 rule set (not verified, ?). The famous 省亲 visit is fiction (Hồng lâu mộng). |
| E4 | Gifts to her family normally came as the EMPEROR's favour (ân điển): silver, silk, posts for brothers, or raising the family's banner (抬旗), e.g. Lệnh phi Ngụy thị's family raised to the Bordered Yellow banner. | H | Standard: Consort Ling / Empress Xiaoyichun, family moved into a higher banner. |
| E5 | A consort could quietly send part of her own monthly allowance (月例银) or her own things home through a trusted eunuch, but it was "tư" (private) and risky; anything from imperial bestowal leaving the palace was improper. | H/D | Allowance by rank is documented (Quốc triều cung sử, 月例 table); private sending = common practice in memoirs, risk real. |
| E6 | RISK made real: Trân phi (珍妃) — her family and a eunuch channel were tied to selling offices (卖官鬻爵); 1894 she was demoted with her sister and the eunuch go-betweens were punished. Sending home through eunuchs could be read as tư thông / tham ô. | H | Consort Zhen demotion 1894 (Guangxu reign), well documented. |
| E7 | What came back: family letters, home goods, and the family's standing rising with her favour (or falling with her disgrace). | H/D | E4 + drama. |
| E8 | Chân Hoàn truyện: Chân Hoàn sends silver and things to her exiled father through trusted eunuchs (Tô Bồi Thịnh line), An Lăng Dung's family keep asking her for money; letters carried in and out by eunuchs, sometimes intercepted. | D | Drama (2011). |
| E9 | Diên Hi công lược / Như Ý truyện: consorts send things home through maids/eunuchs; a rival catching a parcel at the gate is used as a scheme. | D | Drama (2018). |

**Game rules taken from the table** (numbers in BAL.gift.fam):
- R1 her gift home always travels through a eunuch / the gate (E2): a small fee + a gate check; a stopped parcel is NOT lost — it goes to the Nội vụ phủ store (jil «conf», real, comes back by the existing atonement road).
- R2 three tiers (law 2): **Nhẹ** a letter + a small thing she makes herself (Sức, safe); **Vừa** a piece from her chest OR some silver (gate check, Có cơ band); **Nặng** a valuable piece OR much silver (gate check harder, a stopped Nặng parcel = talk of «đưa của ra ngoài cung», Danh/Đức loss) (E5, E6).
- R3 imperial bestowals (from:"emp") are never auto-picked to go home (E5).
- R4 what comes back (E7): family liking rises; Vừa → next month a home gift (real item, ledger) ; Nặng → next month a home gift + the home money (BAL.home) larger for a few months.
- R5 same act for NPC consorts (law 1): they send home too (their bạc / chest piece), same gate check, a stopped NPC parcel goes to the same store and is news she hears.

## §MAP (step 2)
| Road | Where | Status |
|---|---|---|
| family → her: letters, home gifts (Khuê các road) | jkcg.js palRecvFromKc / kcgPalMonth | LIVE (kc road only) |
| family → her: home money every 3 months | jecon.js econHome, BAL.home | LIVE (all origins) |
| family asks her (favour quests) | j72 kind «fam» | LIVE |
| her → court houses (not her father) | j55 tdGift | LIVE |
| her → HER OWN family: gift / money | — | **MISSING** (j55 hides own father; jkcg only letters/asks) |
| the item really leaves + is traceable | jil box kinds mkt/nvp/cct/emp/th/srv/dlg | **MISSING «nha» (at her family's home)** |
| family's answer to her gift | — | **MISSING** |
| NPC consorts send home (law 1) | — | **MISSING** |
| NPC → her gifts (row 10) | review/d-giftin-like-rv | READY (base) |

## §BUILD (step 3) — base review/d-giftin-like-rv 7c143419 + origin/main c03d6ee7 (merge b5c4a6dd)
| File | Change |
|---|---|
| dev/build/jfamg.js (NEW, after jkcg) | ONE act `fgGo(p,tier,way)` for her AND every NPC consort (law 1). Button «Gửi quà về nhà» in Tư trang › «Thư nhà» (existing KINV_XTRA sub-tab; on the Khuê các road it sits under jkcg's letters, otherwise the tab shows her mother + this road). Dialog `PEND.fgSend` (kit option dialog → kitHand cards): **Nhẹ** thư + khăn tay tự thêu (Sức, Rất vững, no gate) · **Vừa** a chest piece OR Bạc · **Nặng** a valuable piece OR much Bạc (gate odds by tier + Tâm cơ). Unpayable rows = kit §84 greyed option (kitOff) with reason + when. Family answer `fgReply` next month (letter card + a real home gift from "nha"; Nặng: home money +N for 3 rounds via econHome wrap). NPC monthly `fgNpcMonth` (same costs/odds/results; success raises her house standing p.dad; a stopped NPC parcel is a log line she hears). |
| dev/build/jil.js | ledger box **"nha"** (ilGone how "home") = at the sender's family home, kept. A stopped parcel uses the existing "conf" road (Nội vụ phủ store). |
| dev/build/jbal2.js | **BAL.gift.fam** (all numbers, below). |
| dev/build/jpoison.js | its `Object.assign(BAL,{gift:{…}})` replaced the whole BAL.gift object → now merges (`Object.assign(BAL.gift||{},…)`) so BAL.gift.fam survives. Values unchanged. |
| dev/build/assemble.py | + jfamg.js after jkcg.js. |
| dev/test/family-gift.js (NEW) | law-11 road scan + runtime checks (below). |

Law 6b: receiver = kc road `kcgMom()` (real S.kc.fam member) else `S.fgh` (her mother, made once, real name via nmNew("mo"), liking af) for origins tt/dtq/muoi/cn/ch/thd only (td family executed, nc/bd/pf abroad, servant road: no road). Law 6c: the piece leaves her chest (ilOut) → box "nha" (or "nvp" when stopped), every move in S.il.log; imperial bestowals (from:"emp") never picked. Law 7: odds words only; Tốn exact, Được/Mất marks via the one formatter (checked in the card DOM: «Tốn 1 khắc·Bạc 35 · Thành thiện cảm ++, Đức + · Bại Danh −−»).

### BAL.gift.fam values (law 4)
`k:1 khắc, fee:5 (eunuch), cd:1 month, wait:1 month, keep:12, tcMid:40, tcK:.3, orig:[tt,dtq,muoi,cn,ch,thd]`
| Tier | Tốn | Gate odds base | Được (success) | Mất (stopped) |
|---|---|---|---|---|
| Nhẹ | 1 khắc, Sức 8, item khantay made | none (Rất vững) | mother af +3, Đức +1 | — |
| Vừa | 1 khắc + piece value 15–59 + Bạc 5, OR Bạc 35 | 72 | af +6, Đức +1, Danh +1, next month a home gift | Danh −2 (piece → NVP store) |
| Nặng | 1 khắc + piece value ≥ 60 + Bạc 5, OR Bạc 95 | 50 | af +10, Đức +2, Danh +2, home gift + home money +10 × 3 rounds | Danh −4, Đức −2 |
| NPC | same | same | p.dad +0/+2/+4 | same | 
NPC monthly odds npc.p 6, Nặng share 30.
**Balance proposal for D/MAIN (owner-facing only if D wants):** Nặng bạc 95 vs return 30 home money + a gift + marks — deliberately net-negative in silver (filial gift, not an investment); if D wants it to pay back, raise nang.up to 20.

### GATES
| Gate | Result |
|---|---|
| family-gift.js (new: law-11 road scan 8 roads + 20 runtime checks, Fold) | **PASS** |
| giftin-like-scan | PASS |
| d19-gift | PASS |
| gift-dead-scan y14-ncBtuc-010 / y05-ncBtuc-035 | PASS / PASS (0 dead tiles) |
| undef-scan | PASS (372 names) |
| quickcheck.js (run by hand: CDN host 403 here) | **PASS** · old save ok · perf new/live render 347/320, tab 698/669, buổi 2736/2628 ms |
| kit-std-scan REPORT_ONLY (Fold + iPad) | 16 hits, ALL in tab:court (X06 bare odds word on court buttons ×12, X08 chapter line ellipsis ×4) — pre-existing, files untouched by this branch; my tab/dialog: 0 |
| Shots Fold 755x1000 + iPad 1180x820 (outside git, /home/user/wt/dfg-shots) | looked at: Thư nhà tab (mother row, act card, list) and the kitHand card dialog (5 cards, odds words, greyed item card), 0 page errors, no horizontal overflow. Card pictures blank only because the CDN is 403 in this box. |
Root index.html rebuilt (dev/index.html assembled); **sw.js NOT rebuilt** (build_site stops at assets.py on the CDN 403) — lander rebuilds.

### LAW-11 ROAD TABLE (every family-gift road)
| Road | Way | Before | After |
|---|---|---|---|
| jkcg palRecvFromKc / kcgPalMonth | family → her (kc) | yes | unchanged |
| jecon econHome | family → her money | yes | + Nặng bonus rounds |
| j72 «fam» | family asks her | yes | unchanged |
| j55 tdGiftGo | her → court houses (not father) | yes | unchanged (own family = jfamg, no second copy) |
| jfamg fgGo | her → own family | **no** | yes |
| jfamg fgReply | family answers her gift | **no** | yes |
| jfamg fgNpcMonth | NPC → own family (law 1) | **no** | yes |
| jil box «nha» | item really at home | **no** | yes |
Not done (scope): the per-item TẶNG QUÀ dialog (jgift) has no «Nhà mẹ đẻ» recipient — one road only (this tier dialog) to keep one-feature-one-button; D may ask for it.
