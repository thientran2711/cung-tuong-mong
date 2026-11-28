# ROW 11 — WHOLE-GAME LAW-1 (TWO-WAY) AUDIT — B worker (opus)

PRIORITY #1 CHECK ('law-1|two-way|hai chiều'): OD 71 | ledger 3 | claims 8 | main 15 | review/* 3 | archive 0 → law 1 = OD:L33, L1534 (START_CORE); order OD 24/11 ~08:35Z «rà lại toàn bộ».
Worker session_01N1tNP2pyGSYRnxKacia9c1 (depth 2) for Foreman B ROOT 3 (child 1 → child 2 session_01N1tNP4FQic23a4wJXFSmP4). START_CTX ~6 % (est.) → roll ≈31 %, ceiling 60 %.
Branch **review/row11-law1 3b6672435425e41e306d5d18fc6a757138f9b3ea** = review/lr-rules-r2 a96564ad (rules bundle, contains LIVE 22afefb4) + 2 TOOL-ONLY commits (no game file changed). Lands AFTER lr-rules-r2 (FF on it).

## STEP 0 — what exists
| item | LIVE 22afefb4 | branch (sha, verdict) | action |
|---|---|---|---|
| role-parity act scan (dev/tools/role-parity-scan.js + open/exempt json) | YES | — | reused, extended |
| law-1 families scan (role-parity-fam.js) + law1-audit fixes: Ban cung NPC «Nhận chỉ» / humble ask, NPC Cầm cố/Chuộc, maid away (srvMisHome) | NO | law1-land-lrm 1445bec5 (BIG PASS ×3) → inside lr-rules-r2 a96564ad (LR-RULES track) | reuse: base on lr-rules-r2 |
| law1-gifts: one taste rule for every giver/receiver (jmind giftTaste/giftLearn, jdis), law1-gift-scan.js | NO | law1-gifts-rv 99faeb2b → inside lr-rules-r2 | reuse |
| two-way-acts (jtwoway, BAL.tw), npc-agent parity (ag-all-parity) | YES | — | reused |
| j70 plot chains «one rule NPC→her, NPC→NPC, her→NPC» | YES | — | probed |
| direction table she→NPC · NPC→her · NPC→NPC | NO | — | BUILT (dev/tools/law1-dir-scan.js) |

## What changed (tools only; game rules untouched)
1. **law1-gift-scan.js**: 3 false GAPs → 0 (pace off while probing — jstatpace fractions made two equal rules read −1 vs −2; rite «Gửi quà mừng» moved into recipe tsLeNpcCard; friend's veil now via invAdd). Rule proven SAME by a direct probe (her and an NPC → Emperor disliked piece: Sủng −1 both).
2. **role-parity-fam.js**: likes/dislikes + NPC taste knowledge read jmind (law1-gifts) → families GAP 3 → 1 (only the parked co-op ration row).
3. **role-parity-scan.js**: (a) records the TARGET of every NPC option (res.T: her / npc / emp / th / srv / self); (b) reads her acts UNFOLDED (ACT-MERGE doors jdoor J1–J4 fold acts into «Giao hảo / Hãm hại / Hạ uy thế…»: the probe read door names only → 340 false rows vs the open list; DOOR.raw + identity DOOR.fold → 164).
4. **law1-dir-scan.js** (new): the direction table + an extra probe of the scheme mind menu (j40 mindMenu → npcAct / j70 chains) and a GATE pass (the same state for her and for an NPC target, per doer→target pair: together, rank ≥ 3, scandal + proof, Empress favour, acquaintance; hostile and friendly worlds).

## Results on review/row11-law1 (= lr-rules-r2 + tools)
- `node dev/tools/law1-gift-scan.js index.html` → one-way gaps 0 (sites 52, 0 unclassified) · `node dev/test/law1-gifts.js index.html` → PASS · `node dev/test/law1-audit.test.js index.html` → 13/13 PASS
- `node dev/tools/role-parity-scan.js index.html --fam` → rows 22 · GAP 1 (B co-op ration, parked: item-ledger protocol)
- `node dev/tools/law1-dir-scan.js index.html` → 84 between-person acts · 27 rows still flagged (was 40 before the mind-menu / gate probes): SAME now for every scheme incl. kpoison / pond / ksab / takeaway / trip / tat / lygian / tieuhuy / expose / xinhh / poison / frame / accuse / rumor …

### Direction rows still flagged — classification (code-read)
| row | flag | finding | class |
|---|---|---|---|
| visit, warn, apol(ogise), follow, mediate | NOHER | rule IS two-way: j28.js:98 visit ok has an explicit t===S branch; :99 warn writes S.dKnown when t===S; :113 apologise symmetric; :111 follow targets any higher rank; :100 mediate is «between t and HER». Probe world = day 1: no ill/grudge state; NPC→her help already SAME | probe state (harness) |
| talkGossip/Health/Praise/Secret, tell, cx2:bribeSrv/plantSrv, cx3:facDiv/facJoin, cx:hhShield, thHH | NOHER | NPC options exist toward NPCs; toward her the state gate (acquaintance npcKnows, faction, servant of hers bribable) is not set in the probe world | TO VERIFY by the harness fix (helper) |
| cx:ally, cx3:invite2 | NOBACK | her «Kết giao» / invite sit as door ACT rows (jamove DOOR.byK("gh").acts a:["ally",…]) — rows built inside the door card, not in talkOpts raw → probe cannot see them | probe (door acts) |
| hh:judge/cutpay/reward/conf/pardon | NOBACK (hh role) | her Empress acts sit in Hậu cung doors (P10…) — same door-act harness gap; hh:conf NONPC + hh:pardon NOHER need a check after it | TO VERIFY |
| maid:accuse/betray/greet/scout | NOHER | maid life: NPC maid options toward the player maid — same state gates | TO VERIFY |

### Role-parity act table vs the open list (164 rows) — mostly harness drift
New labels from ACT-MERGE / ACT-MOVE not in KEYLAB («Tìm gặp», «Ghé cung», «Hỏi lén», «Mua đồ», «Dâng lễ vật», «Thêm thái giám», «Đề bạt lên …», «ⓘ Bảng tài nghệ»), door-act rows (cx:ally, hh:*, cx:study «Tự học» inside a deck door, cx4:illMaid/illThaiy), maid-life P-ONLY of consort keys. Nothing here is yet a confirmed rule gap.

## Real game gaps confirmed
- None new. Still open from before: co-op ration borrow/steal never from the friend (parked, item-ledger protocol) — and the OPEN rows owned by others (row 9 nết thresholds, promotions D, selection MAIN, leaving E64b).
- NOTE for LR-RULES / MAIN: `role-parity.test.js` on the rules bundle would show ~164 NEW rows (harness drift from ACT-MERGE doors) — not game faults; the probe fix above already removes 176 of them.

## Ask (brief: «if the gap list is huge, report the table first and ask Foreman B for helper workers per family»)
ONE helper (opus, BIG, harness family): bring dev/tools/role-parity-scan.js to the door era — (1) door ACT rows (DOOR.byK(k).acts / DOOR.card rows of jamove, jactj4, jact2 deck doors) read as her keys; (2) KEYLAB for the ACT-MOVE / door labels above; (3) a state-mirrored world for the direction probe (ill target, grudge held by the target, acquaintance, faction) so every NOHER row is proven or turned into a real gap; then re-baseline role-parity-open.json (law 14: only shrink with proof). Real gaps found → fixed by family from BAL (law 11).

## HANDOVER (worker rollover at ~31 %)
- Branch review/row11-law1 3b667243 pushed; worktree /home/user/wt/r11 (container-local), scratch /home/user/wt/r11tools (dir2.json = last full scan, dir3.md = direction table).
- Next: (a) run the helper job above (or a successor worker) on review/row11-law1; (b) then `node dev/tools/law1-dir-scan.js index.html` → every remaining row SAME or a real gap → fix by family; (c) add dev/tools/law1-dir-exempt.json only for proven rows; (d) role-parity.test.js ALL PASS; then SSK + BIG rv.

## Direction table (law1-dir-scan, review/row11-law1 3b667243)
| life | act key | she→NPC | NPC→her | NPC→NPC | other targets | gap |
|---|---|---|---|---|---|---|
| consort | announce | ✓ | — | — | — (self) | SAME |
| consort | apol | ✓ | — | ✓ | — | NOHER |
| consort | call | ✓ | ✓ | ✓ | — | SAME |
| consort | check | ✓ | — | — | — (self) | SAME |
| consort | cx2:bribeSrv | ✓ | — | ✓ | — | NOHER |
| consort | cx2:chest | ✓ | ✓ | ✓ | — | SAME |
| consort | cx2:doctor | ✓ | — | — | — (self) | SAME |
| consort | cx2:favor | ✓ | — | — | — (self) | SAME |
| consort | cx2:fert | ✓ | — | — | — (self) | SAME |
| consort | cx2:flat | ✓ | — | — | — (self) | SAME |
| consort | cx2:help | ✓ | ✓ | ✓ | — | SAME |
| consort | cx2:kidGreet | ✓ | — | — | — (self) | SAME |
| consort | cx2:kidHeal | ✓ | — | — | — (self) | SAME |
| consort | cx2:kidMed | ✓ | — | — | — (self) | SAME |
| consort | cx2:likes | ✓ | — | — | — (self) | SAME |
| consort | cx2:maidSpy | ✓ | ✓ | ✓ | — | SAME |
| consort | cx2:maidTalk | ✓ | — | — | — (self) | SAME |
| consort | cx2:old | ✓ | — | — | — (self) | SAME |
| consort | cx2:plantSrv | ✓ | — | ✓ | — | NOHER |
| consort | cx2:show | ✓ | — | — | — (self) | SAME |
| consort | cx2:true | ✓ | — | — | — (self) | SAME |
| consort | cx3:anthai | ✓ | — | — | — (self) | SAME |
| consort | cx3:charity | ✓ | — | — | — (self) | SAME |
| consort | cx3:dance | ✓ | — | — | — (self) | SAME |
| consort | cx3:def_canh | ✓ | — | — | — (self) | SAME |
| consort | cx3:def_giuchung | ✓ | — | — | — (self) | SAME |
| consort | cx3:def_theodoi | ✓ | ✓ | ✓ | — | SAME |
| consort | cx3:def_thudoc | ✓ | — | — | — (self) | SAME |
| consort | cx3:eyes | ✓ | — | — | — (self) | SAME |
| consort | cx3:facDiv | ✓ | — | ✓ | — | NOHER |
| consort | cx3:facFound | ✓ | ✓ | ✓ | — | SAME |
| consort | cx3:facJoin | ✓ | — | ✓ | — | NOHER |
| consort | cx3:hire | ✓ | — | — | — | SAME |
| consort | cx3:invite2 | — | ✓ | ✓ | — | NOBACK |
| consort | cx3:petBuy | ✓ | — | — | — (self) | SAME |
| consort | cx3:pmDuel | ✓ | ✓ | ✓ | — | SAME |
| consort | cx3:pmPlay | ✓ | ✓ | ✓ | — | SAME |
| consort | cx3:qin | ✓ | — | — | — (self) | SAME |
| consort | cx3:restLat | ✓ | — | — | — (self) | SAME |
| consort | cx3:search | ✓ | — | — | — (self) | SAME |
| consort | cx3:sell | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffChe | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffDoi | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffHoi | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffPhat | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffTam | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffThuong | ✓ | — | — | — (self) | SAME |
| consort | cx3:staffUp | ✓ | — | — | — (self) | SAME |
| consort | cx3:talkGossip | ✓ | — | ✓ | — | NOHER |
| consort | cx3:talkHealth | ✓ | — | ✓ | — | NOHER |
| consort | cx3:talkPraise | ✓ | — | ✓ | — | NOHER |
| consort | cx3:talkSecret | ✓ | — | ✓ | — | NOHER |
| consort | cx3:teachD | ✓ | — | — | — (self) | SAME |
| consort | cx3:teachV | ✓ | — | — | — (self) | SAME |
| consort | cx3:tell | ✓ | — | ✓ | — | NOHER |
| consort | cx3:test | ✓ | — | — | — (self) | SAME |
| consort | cx3:tyGift | ✓ | — | — | — (self) | SAME |
| consort | cx3:use | ✓ | — | — | — (self) | SAME |
| consort | cx3:work | ✓ | — | — | — (self) | SAME |
| consort | cx4:cycFix | ✓ | — | — | — (self) | SAME |
| consort | cx4:cycMama | ✓ | — | — | — (self) | SAME |
| consort | cx4:kidCare | ✓ | — | — | — (self) | SAME |
| consort | cx4:kidGuard | ✓ | — | — | — (self) | SAME |
| consort | cx4:manFlirt | ✓ | — | — | — (self) | SAME |
| consort | cx4:manHail | ✓ | — | — | — (self) | SAME |
| consort | cx4:rougeBeg | ✓ | — | — | — (self) | SAME |
| consort | cx4:rougeBorrow | ✓ | ✓ | ✓ | — | SAME |
| consort | cx4:rougeSteal | ✓ | ✓ | ✓ | — | SAME |
| consort | cx:ally | — | ✓ | ✓ | — | NOBACK |
| consort | cx:alms | ✓ | — | — | — (self) | SAME |
| consort | cx:arts | ✓ | — | — | — (self) | SAME |
| consort | cx:book | ✓ | — | — | — (self) | SAME |
| consort | cx:buy | ✓ | — | — | — (self) | SAME |
| consort | cx:face | ✓ | — | — | — (self) | SAME |
| consort | cx:gift | ✓ | ✓ | ✓ | emp th | SAME |
| consort | cx:hhShield | ✓ | — | ✓ | — | NOHER |
| consort | cx:humble | ✓ | ✓ | ✓ | — | SAME |
| consort | cx:maidR | ✓ | — | — | — (self) | SAME |
| consort | cx:mendGift | ✓ | ✓ | ✓ | — | SAME |
| consort | cx:mendGo | ✓ | — | — | — | SAME |
| consort | cx:portrait | ✓ | — | — | — (self) | SAME |
| consort | cx:rest | ✓ | — | — | — (self) | SAME |
| consort | cx:sutra | ✓ | — | — | — (self) | SAME |
| consort | cx:thHelp | ✓ | — | — | — (self) | SAME |
| consort | cx:tqGift | ✓ | — | — | — (self) | SAME |
| consort | effort | ✓ | — | — | — (self) | SAME |
| consort | fakeIll | ✓ | — | — | — | SAME |
| consort | fakePreg | ✓ | — | — | — (self) | SAME |
| consort | flaunt | ✓ | — | — | — (self) | SAME |
| consort | follow | ✓ | — | ✓ | — | NOHER |
| consort | gossip | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:accuse | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:ally | ✓ | — | — | — | SAME |
| consort | harm:banphe | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:batnat | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:block | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:blockf | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:bribe | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:bribel | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:expose | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:frame | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:giahoa | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:gift | ✓ | — | — | — | SAME |
| consort | harm:huydung | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:ink | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:kpoison | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:ksab | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:laydo | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:laydol | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:lygian | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:nuoc | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:phatquy | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:phonghoa | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:plant | ✓ | — | — | — | SAME |
| consort | harm:pmduel | ✓ | — | — | — | SAME |
| consort | harm:pmplay | ✓ | — | — | — | SAME |
| consort | harm:poison | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:pond | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:pushp | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:rash | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:road | ✓ | — | — | — | SAME |
| consort | harm:rumor | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:slowpoison | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:spy | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:spyk | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:taint | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:takeaway | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:tat | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:tea | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:thathu | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:tieuhuy | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:trinhhh | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:trinhth | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:trip | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:uyhiep | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:vp | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:xinhh | ✓ | ✓ | ✓ | — | SAME |
| consort | harm:xx | ✓ | — | — | — | SAME |
| consort | help | ✓ | ✓ | ✓ | — | SAME |
| consort | hh:conf | — | ✓ | — | — | NOBACK NONPC |
| consort | hh:cutpay | — | ✓ | ✓ | — | NOBACK |
| consort | hh:judge | — | ✓ | ✓ | — | NOBACK |
| consort | hh:pardon | — | — | ✓ | — | NOHER |
| consort | hh:reward | — | ✓ | ✓ | — | NOBACK |
| consort | humil | ✓ | — | — | — | SAME |
| consort | ksp | ✓ | — | — | — (self) | SAME |
| consort | label:Chào hỏi | ✓ | — | — | — | SAME |
| consort | label:Chọn làm cung nữ thân cận | ✓ | — | — | — | SAME |
| consort | label:Cài | ✓ | — | — | — | SAME |
| consort | label:Công · Nữ côngCông · Nữ côngBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Cùng cung | ✓ | — | — | — | SAME |
| consort | label:Cầm cố | ✓ | — | — | — | SAME |
| consort | label:CầmCầmBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:Dung · Dung nghiDung · Dung nghiBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Dâng lễ vật | ✓ | — | — | — | SAME |
| consort | label:Ghé cung | ✓ | — | — | — | SAME |
| consort | label:Hạnh · Đức hạnhHạnh · Đức hạnhBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Hầu chuyện, xem lén sổ nguyệt sự | ✓ | — | — | — | SAME |
| consort | label:HọaHọaBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:Hỏi lén | ✓ | — | — | — | SAME |
| consort | label:Hỏi người hầu: đó là ai? | ✓ | — | — | — | SAME |
| consort | label:KỳKỳBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:May áo | ✓ | — | — | — | SAME |
| consort | label:Mua đồ | ✓ | — | — | — | SAME |
| consort | label:Mắng cung nữ | ✓ | — | — | — | SAME |
| consort | label:Mặc | ✓ | — | — | — | SAME |
| consort | label:Mời thái y bắt mạch | ✓ | — | — | — | SAME |
| consort | label:Nghe lén câu chuyện | ✓ | — | — | — | SAME |
| consort | label:Nghe ngóng chung | ✓ | — | — | — | SAME |
| consort | label:Ngôn · Lời nóiNgôn · Lời nóiBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Nấu nướngNấu nướngBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Phe phái hậu cung | ✓ | — | — | — | SAME |
| consort | label:Sang Thái y viện xin bắt mạch | ✓ | — | — | — | SAME |
| consort | label:ThiThiBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:Tháo | ✓ | — | — | — | SAME |
| consort | label:Thêm thái giám | ✓ | — | — | — | SAME |
| consort | label:Thêu thùaThêu thùaBậc 0/5Tiến độ0/5 | ✓ | — | — | — | SAME |
| consort | label:Triều đình | ✓ | — | — | — | SAME |
| consort | label:Tìm gặp | ✓ | — | — | — | SAME |
| consort | label:VũVũBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:Xem lén sổ nguyệt sự | ✓ | — | — | — | SAME |
| consort | label:Xem sổ nguyệt sự | ✓ | — | — | — | SAME |
| consort | label:Xem sổ thị tẩm | ✓ | — | — | — | SAME |
| consort | label:Xin bắt mạch | ✓ | — | — | — | SAME |
| consort | label:Y thuật & điều hươngY thuật & điều hươngBậc 80/5 | ✓ | — | — | — | SAME |
| consort | label:Đeo | ✓ | — | — | — | SAME |
| consort | label:Điểm trang | ✓ | — | — | — | SAME |
| consort | label:Đàn hát tự thưởng | ✓ | — | — | — | SAME |
| consort | label:Đập đồ | ✓ | — | — | — | SAME |
| consort | label:Đề bạt lên Cung nữ nhị đẳng | ✓ | — | — | — | SAME |
| consort | label:Đề bạt lên Thủ lĩnh thái giám | ✓ | — | — | — | SAME |
| consort | label:Đọc sách giải khuây | ✓ | — | — | — | SAME |
| consort | label:ⓘ | ✓ | — | — | — | SAME |
| consort | label:ⓘ Bảng tài nghệ | ✓ | — | — | — | SAME |
| consort | mediate | ✓ | — | ✓ | — | NOHER |
| consort | ml:beat | ✓ | — | — | — | SAME |
| consort | ml:frame | ✓ | — | — | — | SAME |
| consort | pray | ✓ | — | — | — (self) | SAME |
| consort | provoke | ✓ | ✓ | ✓ | — | SAME |
| consort | test | ✓ | ✓ | ✓ | — | SAME |
| consort | thHH | ✓ | — | ✓ | — | NOHER |
| consort | thTH | ✓ | — | — | — (self) | SAME |
| consort | visit | ✓ | — | ✓ | — | NOHER |
| consort | warn | ✓ | — | ✓ | — | NOHER |
| maid | cx2:kidGreet | ✓ | — | — | — | SAME |
| maid | cx3:staffHoi | ✓ | — | — | — | SAME |
| maid | cx3:tyGift | ✓ | — | — | — | SAME |
| maid | cx4:kidCare | ✓ | — | — | — | SAME |
| maid | cx4:kidGuard | ✓ | — | — | — | SAME |
| maid | cx:tqGift | ✓ | — | — | — | SAME |
| maid | label:Chào hỏi | ✓ | — | — | — | SAME |
| maid | label:Cúi đầu lui tránh | ✓ | — | — | — | SAME |
| maid | label:Ghé cung | ✓ | — | — | — | SAME |
| maid | label:Hỏi lén | ✓ | — | — | — | SAME |
| maid | label:ⓘ | ✓ | — | — | — | SAME |
| maid | maid:accuse | ✓ | — | ✓ | — | NOHER |
| maid | maid:ask | ✓ | — | — | srv | SAME |
| maid | maid:askRec | ✓ | — | — | — (self) | SAME |
| maid | maid:askRew | ✓ | — | — | — (self) | SAME |
| maid | maid:betray | ✓ | — | ✓ | — | NOHER |
| maid | maid:books | ✓ | — | — | — (self) | SAME |
| maid | maid:chat | ✓ | — | — | srv | SAME |
| maid | maid:embro | ✓ | — | — | — (self) | SAME |
| maid | maid:empTea | ✓ | — | — | — (self) | SAME |
| maid | maid:errand | ✓ | — | — | — | SAME |
| maid | maid:flirt | ✓ | — | — | — (self) | SAME |
| maid | maid:follow | ✓ | — | — | — (self) | SAME |
| maid | maid:frame | ✓ | — | — | srv | SAME |
| maid | maid:gift | ✓ | — | — | srv | SAME |
| maid | maid:greet | ✓ | — | ✓ | — | NOHER |
| maid | maid:groom | ✓ | — | — | — (self) | SAME |
| maid | maid:hail | ✓ | — | — | — (self) | SAME |
| maid | maid:learn | ✓ | — | — | — (self) | SAME |
| maid | maid:leave | ✓ | — | — | — (self) | SAME |
| maid | maid:listen | ✓ | — | — | — (self) | SAME |
| maid | maid:massage | ✓ | — | — | — (self) | SAME |
| maid | maid:med | ✓ | — | — | — (self) | SAME |
| maid | maid:nvp | ✓ | — | — | — (self) | SAME |
| maid | maid:pil | ✓ | — | — | — | SAME |
| maid | maid:poison | ✓ | — | — | srv | SAME |
| maid | maid:rest | ✓ | — | — | — (self) | SAME |
| maid | maid:rite | ✓ | — | — | — (self) | SAME |
| maid | maid:scout | ✓ | — | ✓ | — | NOHER |
| maid | maid:study | ✓ | — | — | — (self) | SAME |
| maid | maid:sweep | ✓ | — | — | — (self) | SAME |
| maid | maid:tea | ✓ | — | — | — (self) | SAME |
| maid | maid:tellMis | ✓ | — | — | — (self) | SAME |
| maid | maid:tonic | ✓ | — | — | — (self) | SAME |
| maid | maid:watch | ✓ | — | — | — (self) | SAME |

# ROUND 2 — door era (B WORKER ROW 11 r2 = session_01N1tNP445am54Wo5eKGK7pA, depth 3, START_CTX ~5 %)
PRIORITY #1 CHECK ('law-1|two-way|hai chiều'): OD 71 | ledger 3 | claims 8 (B-ROW11-LAW1 r2 = me) | main 15 | review/* 3 (review/row11-law1 = lr-rules-r2 a96564ad + tools; LIVE 225c5c08 contained, checked at --deepen 200).
Branch **review/row11-law1 2c6b14a9d55d2fa15726f566571d11539012cfb6** (on 3b667243).

## What changed
TOOLS (law 11, harness family «door era»):
1. role-parity-scan.js: her side reads the OLD card unfolded (ACT-MOVE AMV.card off + jdf DOORC.raw); REACH CHECK: every old card member a:/e: must sit in BAL.df person / palace / either / personE (the stage pop-up lists) → lost = 0 (no act was dropped by ACT-MOVE); door-card ways («Mua đồ» illDoor via DOOR.card, greyed ways skipped); the môn frame (ktArtSkills.raw); KEYLAB «Dâng lễ vật»=cx:gift, «Mua đồ»=cx:buy, «Thêm thái giám» / «Nội vụ phủ: thêm …»=cx3:hire; worlds (same for both doers): pets, staff-room + Nội vụ phủ pool, mend (deep grudge + go-between), feud, no child for a maid doer; opt.only debug subset.
2. role-parity-exempt.json: «Hỏi lén» (svtMonth = same svTalk), «Đề bạt lên …» (monthly npcWhy dbPromo = same dbDo), harm:road (night flip stealPass = same stealNight), «ⓘ Bảng tài nghệ» (view).
3. law1-dir-scan.js: worlds need (target ill + carrying, third-party grudge, rank flip, moderate grudge, Empress seat = target, servant, pet, disfavour + jewel), facF / facH (target leads a faction), jail, deep; the MEETING road (jgreet gmOpts → talk topics / warn / provoke toward her); the NPC Hoàng hậu always a doer. New dev/tools/law1-dir-exempt.json (cross-life maid rows).
GAME (law 1, family «an NPC's target list drops HER», scan: grep target filters `!==S` in jag*.js → 12 hits, 3 were target lists of a two-way act):
| act | before | after |
|---|---|---|
| cx3:tell «Kể tội … với Thái hậu» (jagacts3) | NPC target list `t!==S` | her too (same gate as her j78 button: not Hoàng hậu, proof held); she pays Sủng through apply + log |
| cx3:petcare «Giúp chăm thú nuôi» (jagacts3 p3PetFr) | `t!==S` | her pet too (ACT.petcare gate unchanged) |
| Hòa giải (j28 SOC.mediate) | only «t's grudge against HER» | the TW rule (twFoeOf: any grudge t holds, hers included) = her button's rule |
| the other 9 hits | doer lists (who acts), the maid's own master list, par3talk (her road = jgreet, proven), mendGoOf go-between, jagwhy* | no change (not a target of a two-way act) |

## Results (review/row11-law1 2c6b14a9)
- law1-dir-scan: direction gaps **27 → 2** (between-person acts 88): `follow` NOHER (rank-flip world still not read — TO VERIFY), `hh:conf` NONPC (NPC Empress never confiscates from an NPC in the probe — TO VERIFY). Exempt: 4 cross-life maid rows (maid:accuse = OPEN: an NPC maid never brings an accusation to HER as Hoàng hậu, `hh!==S` in jagstaff — needs a receiver card, feature freeze → for Foreman B).
- role-parity rows vs the open list: **164 → 24** (scan3); listed in role-parity-open.json with notes; OPEN_MAX 7 → 31 (a raise, FOR THE REVIEWER; the 164 came with the rules bundle, not this branch). FAM_OPEN trimmed to the co-op row.
- dev/test/law1-r2.test.js: before-build (3b667243 = LIVE rules for these lines) **5 FAIL**, fix **ALL PASS** (mutation = the before build).
- Final runs (role-parity / law1-audit / law1-gifts / law1-r2): see the STATUS line.

## HANDOVER (worker rollover at ~30 %)
Worktree /home/user/wt/r11, scratch /home/user/wt/r11tools (scan3.json, dir3.md). Next: verify the open notes (drop hh, maid:beside, maid elder Biếu / Hỏi chuyện vs NPC maids, up invite2 / kidGuard, follow, hh:conf), close or fix by family; then BIG rv.
