# CUNG QUY — worker report (review/cung-quy)

Worker session_01D3E3NZyGJdTgPiznVEBfbh (opus) · depth 3 · START_CTX ~5 % · for FOREMAN D (order «(26/11 ~07:10Z) ORDER FROM MAIN 154»; owner OD 26/11 ~06:50Z item (C)).
PRIORITY #1 CHECK ('cung quy'): OD 2 | ledger 0 | claims 0 | main 15 (existing rank checks — reused: jface fxAuth/tat, jtwoway humil/follow, j8 takeaway/accOK, jgreet greetName, j82 seat game, jemoact Phạm thượng) | review/* 0 | archive 1.

Branch **review/cung-quy** head **77d9a6e4** (FF from main 3af7896e; rv1 fixes below). Expert report (law 8, written first): dev/handover/reports/cung-quy-expert.md (§G = the adopted rule table).

## What was built
- **ONE function** `cqRule(a,t,k)` / `cqOK` / `cqAuth` (dev/build/jcq.js), **ONE table** `BAL.cq` (jbal2.js, law 4). Classes up / down / downNB / high / auth / take / accuse / free (expert §G).
- **Gates — every NPC act generator** passes it: agOptsG (agent options of every group), agLand0 (agent deed lands: all AGRUN cx/cx2/cx3/cx4/hh/th/emp/maid/srv deeds), runAct (every ACT deed: j28 harm menu, her rv buttons), twDo (every two-way deed: SOC menu), motiveOK (j95 legacy callers: j70 plans, j83 works, visitors), approachOne (người tìm đến), talkOpts (her own Khiêu khích / Trút giận).
- **Two-way (law 1)**: the same rule for her → NPC, NPC → her, NPC ↔ NPC; her breach options carry a warning in the row (cổ trang, odds in words) and pay the same consequence.
- **Deliberate breach only**: a breach happens only by HER choice or a bold NPC (nết Kiêu ngạo / Nóng nảy + Sủng ≥ BAL.cq.bold.sung, cool-down = BAL.ea.pick.phamCd). Consequence: target oán +BAL.cq.fx.oan, doer Danh −BAL.cq.fx.danh, cấm túc on the SAME roll as jemoact's Phạm thượng (BAL.ea.pick.phamP). A failed open charge against a higher rank = «vu cáo bề trên» (same consequence). NPC → her breach = a «Phạm thượng» notice card (kit Q card, BÁO); NPC ↔ NPC = Tin báo via newsAdd.
- **Legacy checks merged into the one rule** (their numbers moved to BAL.cq): fxAuth +3 → auth.gap, follow +1 → gap.follow, takeaway <4 → take.max, accOK ≥3 → accQ; new authority rows from the research: chủ vị over her own palace, hiệp lý (Hoàng quý phi while no Hoàng hậu), a mistress over her own servants.
- **Gift words** by rank (research §6): «ban cho» down / «kính dâng» up / «tặng» equal (j8 giveTo).
- Reused, not rebuilt: greeting order (jgreet greetName, lower names herself first), seating by rank (j82 «Kéo từng người vào ghế» game).
- Kit: no new UI part (the notice is the standard Q card; warnings are text in existing option rows).

## LAW 11 scan — dev/test/cung-quy-scan.js (PASS, head 77d9a6e4)
keys 280 · classes {"accuse":8,"auth":15,"down":6,"high":2,"up":8,"downNB":2,"take":1,"free":238} · rank-ruled 42: before checked 14 / unchecked 28 → after checked 42 / unchecked 0 · gift words ban cho / kính dâng / tặng · page errors 0

| # | generator | file | gate after |
|---|---|---|---|
| 1 | npcAct (harm menu) | j28.js | runAct ✓ |
| 2 | npcSocial (social menu, agent off) | j28.js | twDo ✓ |
| 3 | rivalsTurn judge (Hoàng hậu) | j8.js | hh rule (queen) ✓ |
| 4 | agOpts / agOptsG (agent options, every group) | jagent.js / jagday.js | agOptsG ✓ |
| 5 | agLand0 (agent deed lands) | jagent.js / jagday.js | agLand0 ✓ |
| 6 | AGRUN cx/cx2/cx3/cx4/hh/th/emp/maid/srv/see/know deeds | jagacts*.js jagstaff.js jagday.js jagknow.js jpma.js | agLand0 ✓ |
| 7 | approachOne (người tìm đến, visitor) | j24.js | motiveOK + approachOne ✓ |
| 8 | newPlot70 / j70 plans | j70.js | motiveOK ✓ |
| 9 | wkGive / wkPoison (handmade works) | j83.js | motiveOK ✓ |
| 10 | jemoact Phạm thượng outburst (deliberate breach, own cấm túc roll) | jemoact.js | own consequence = the same BAL.ea.pick.phamP ✓ |
| 11 | her talk options (Khiêu khích / Trút giận) | j2.js | talkOpts ✓ |
| 12 | her rv act buttons | j6.js | runAct + xw warning ✓ |
| 13 | giveTo gift words | j8.js | cqGiftVerb ✓ |

| key | registries | class (after) | before (LIVE) | after |
|---|---|---|---|---|
| accuse | ACT,H95 | accuse | checked: j8 accOK (Hoàng hậu only) | checked: cqRule accuse (failed charge upward = breach consequence) |
| admon | TW | auth | checked: jtwoway req Hoàng hậu | checked: cqRule auth (deliberate breach only, own consequence) |
| ambush | H95 | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| batnat | ACT,H95 | high | checked: jtsb tsbBulOK rkOf(a)>rkOf(t) | checked: cqRule high (deliberate breach only, own consequence) |
| cx:hhShield | AGRUN | up | UNCHECKED | checked: cqRule up (never breached) |
| cx:thHelp | AGRUN | up | UNCHECKED | checked: cqRule up (never breached) |
| cx2:vent | AGRUN | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| cx3:staffPhat | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| cx3:staffThuong | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| emp:summon | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| emp:tea | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| emp:visit | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| expose | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| follow | TW,SOC,AGSOC | up | checked: jtwoway req rkOf(t)>rkOf(a)+1 | checked: cqRule up (never breached) |
| hh:conf | AGRUN | auth | checked: agReg hh group | checked: cqRule auth (deliberate breach only, own consequence) |
| hh:cutpay | AGRUN | auth | checked: agReg hh group | checked: cqRule auth (deliberate breach only, own consequence) |
| hh:judge | AGRUN | auth | checked: agReg hh group (Hoàng hậu) | checked: cqRule auth (deliberate breach only, own consequence) |
| hh:pardon | AGRUN | auth | checked: agReg hh group | checked: cqRule auth (deliberate breach only, own consequence) |
| hh:reward | AGRUN | auth | checked: agReg hh group | checked: cqRule auth (deliberate breach only, own consequence) |
| humil | TW,AGSOC | downNB | checked: jtwoway req rkOf(a)>=rkOf(t) | checked: cqRule downNB (never breached) |
| humiliate | SOC | downNB | UNCHECKED | checked: cqRule downNB (never breached) |
| ink | ACT | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| maid:greet | AGRUN | up | UNCHECKED | checked: cqRule up (never breached) |
| nuoc | ACT | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| phatquy | ACT,H95 | auth | checked: jface fxAuth (Hoàng hậu or +3) | checked: cqRule auth (deliberate breach only, own consequence) |
| provoke | TW,SOC,AGSOC,H95 | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| serveTH | SOC | up | UNCHECKED | checked: cqRule up (never breached) |
| srv:greet | AGRUN | up | UNCHECKED | checked: cqRule up (never breached) |
| takeaway | ACT,H95 | take | checked: j8 ok rkOf(a)>rkOf(t)&&rkOf(t)<4 | checked: cqRule take (never breached) |
| tat | ACT,H95 | high | checked: jface ok rkOf(a)>rkOf(t) | checked: cqRule high (deliberate breach only, own consequence) |
| tea | ACT | down | UNCHECKED | checked: cqRule down (deliberate breach only, own consequence) |
| th:admon | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| th:gift | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| th:release | AGRUN | auth | UNCHECKED | checked: cqRule auth (deliberate breach only, own consequence) |
| thHH | TW,AGSELF | up | checked: jtwoway req q!==a | checked: cqRule up (never breached) |
| thTH | TW,AGSELF | up | UNCHECKED | checked: cqRule up (never breached) |
| tocao | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| trinhhh | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| trinhth | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| vp | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| xinhh | ACT,H95 | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| xx | ACT | accuse | UNCHECKED | checked: cqRule accuse (failed charge upward = breach consequence) |
| ally | ACT,SOC,F95 | free | — (no rank rule) | free (no rank rule) |
| announce | TW,AGSELF | free | — (no rank rule) | free (no rank rule) |
| apol | TW,AGSOC | free | — (no rank rule) | free (no rank rule) |
| apologise | SOC | free | — (no rank rule) | free (no rank rule) |
| banphe | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| block | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| blockf | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| bribe | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| bribeksp | SOC | free | — (no rank rule) | free (no rank rule) |
| bribel | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| call | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| catswap | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| check | TW,SOC,AGSELF | free | — (no rank rule) | free (no rank rule) |
| cx:ally | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:alms | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:arts | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:book | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:buy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:face | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:gift | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:humble | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:maidR | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:portrait | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:rest | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:study | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:sutra | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx:tqGift | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:bribeSrv | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:chest | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:court | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:doctor | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:favor | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:fert | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:flat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:help | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:kidGreet | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:kidHeal | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:kidMed | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:likes | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:maidSpy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:maidTalk | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:nurse | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:old | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:plantSrv | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:show | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx2:true | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:anthai | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:charity | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:dance | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:def_canh | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:def_giuchung | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:def_theodoi | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:def_thudoc | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:drug | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:eyes | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:facDiv | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:facFound | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:facJoin | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:facLeave | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:facSell | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:hire | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:invite2 | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:invoke | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:petBuy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:petcare | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:pmDuel | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:pmPlay | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:qin | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:restLat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:search | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:sell | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:staffChe | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:staffDoi | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:staffHoi | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:staffTam | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:staffUp | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:talkGossip | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:talkHealth | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:talkPraise | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:talkSecret | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:teachD | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:teachV | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:tell | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:test | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:threat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:treat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:tyGift | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:use | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx3:work | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:cycFix | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:cycMama | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:illAlly | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:illCho | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:illMaid | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:illThaiy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:kidCare | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:kidGuard | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:manCut | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:manFlirt | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:manHail | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:manToken | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:manTryst | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:rougeBeg | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:rougeBorrow | AGRUN | free | — (no rank rule) | free (no rank rule) |
| cx4:rougeSteal | AGRUN | free | — (no rank rule) | free (no rank rule) |
| drop | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| fakeIll | TW,AGSELF | free | — (no rank rule) | free (no rank rule) |
| fakePreg | TW,AGSELF | free | — (no rank rule) | free (no rank rule) |
| feign | SOC | free | — (no rank rule) | free (no rank rule) |
| flaunt | TW,SOC,AGSELF | free | — (no rank rule) | free (no rank rule) |
| frame | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| giahoa | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| gift | ACT,F95 | free | — (no rank rule) | free (no rank rule) |
| gossip | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| harm | H95 | free | — (no rank rule) | free (no rank rule) |
| help | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| huydung | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| idle | SOC | free | — (no rank rule) | free (no rank rule) |
| kframe | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| know:hear | AGRUN | free | — (no rank rule) | free (no rank rule) |
| kpoison | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| ksab | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| ksp | TW,AGSELF | free | — (no rank rule) | free (no rank rule) |
| laydo | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| laydol | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| lygian | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| maid:accuse | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:ask | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:askRec | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:askRew | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:beside | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:betray | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:books | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:chat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:cut | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:embro | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:empTea | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:errand | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:flirt | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:follow | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:frame | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:gift | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:groom | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:hail | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:learn | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:leave | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:listen | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:massage | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:med | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:nvp | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:pil | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:poison | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:rest | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:rite | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:scout | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:spy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:study | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:sweep | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:tea | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:tellMis | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:token | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:tonic | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:tryst | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:vow | AGRUN | free | — (no rank rule) | free (no rank rule) |
| maid:watch | AGRUN | free | — (no rank rule) | free (no rank rule) |
| mediate | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| musk | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| petcare | ACT,F95 | free | — (no rank rule) | free (no rank rule) |
| petsteal | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| pgift | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| phonghoa | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| plant | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| plot | H95 | free | — (no rank rule) | free (no rank rule) |
| pmduel | ACT | free | — (no rank rule) | free (no rank rule) |
| pmplay | ACT | free | — (no rank rule) | free (no rank rule) |
| poison | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| pond | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| pray | TW,SOC,AGSELF | free | — (no rank rule) | free (no rank rule) |
| pushp | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| rash | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| road | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| rumor | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| see:hear | AGRUN | free | — (no rank rule) | free (no rank rule) |
| see:hearMe | AGRUN | free | — (no rank rule) | free (no rank rule) |
| see:join | AGRUN | free | — (no rank rule) | free (no rank rule) |
| see:joinMe | AGRUN | free | — (no rank rule) | free (no rank rule) |
| see:mediate | AGRUN | free | — (no rank rule) | free (no rank rule) |
| slowpoison | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| spy | ACT,SOC,H95 | free | — (no rank rule) | free (no rank rule) |
| spyk | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| srv:accuse | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:ask | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:askRec | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:askRew | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:beside | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:betray | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:books | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:chat | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:cut | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:embro | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:empTea | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:errand | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:flirt | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:follow | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:frame | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:gift | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:groom | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:hail | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:learn | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:leave | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:listen | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:massage | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:med | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:nvp | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:pil | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:poison | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:rest | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:rite | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:scout | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:spy | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:study | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:sweep | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:tea | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:tellMis | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:token | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:tonic | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:tryst | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:vow | AGRUN | free | — (no rank rule) | free (no rank rule) |
| srv:watch | AGRUN | free | — (no rank rule) | free (no rank rule) |
| steal | ACT,SOC,H95 | free | — (no rank rule) | free (no rank rule) |
| test | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |
| thaopet | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| thathu | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| tieuhuy | ACT,F95 | free | — (no rank rule) | free (no rank rule) |
| trip | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| uyhiep | ACT,H95 | free | — (no rank rule) | free (no rank rule) |
| visit | TW,SOC,AGSOC,F95 | free | — (no rank rule) | free (no rank rule) |
| warn | TW,SOC,AGSOC | free | — (no rank rule) | free (no rank rule) |

| pair | class | key | lower → higher | higher → lower | ok |
|---|---|---|---|---|---|
| NPC low ↔ NPC high | up | follow | đúng lễ | sai lễ | ✓ |
| NPC low ↔ NPC high | down | provoke | dĩ hạ phạm thượng | đúng lễ | ✓ |
| NPC low ↔ NPC high | downNB | humil | dĩ hạ phạm thượng | đúng lễ | ✓ |
| NPC low ↔ NPC high | high | tat | vượt phận | đúng lễ | ✓ |
| NPC low ↔ NPC high | auth | phatquy | vượt quyền | đúng lễ | ✓ |
| NPC low ↔ NPC high | take | takeaway | vượt phận | đúng lễ | ✓ |
| her low ↔ NPC high | up | follow | đúng lễ | sai lễ | ✓ |
| her low ↔ NPC high | down | provoke | dĩ hạ phạm thượng | đúng lễ | ✓ |
| her low ↔ NPC high | downNB | humil | dĩ hạ phạm thượng | đúng lễ | ✓ |
| her low ↔ NPC high | high | tat | vượt phận | đúng lễ | ✓ |
| her low ↔ NPC high | auth | phatquy | vượt quyền | đúng lễ | ✓ |
| her low ↔ NPC high | take | takeaway | vượt phận | đúng lễ | ✓ |
| NPC low ↔ her high | up | follow | đúng lễ | sai lễ | ✓ |
| NPC low ↔ her high | down | provoke | dĩ hạ phạm thượng | đúng lễ | ✓ |
| NPC low ↔ her high | downNB | humil | dĩ hạ phạm thượng | đúng lễ | ✓ |
| NPC low ↔ her high | high | tat | vượt phận | đúng lễ | ✓ |
| NPC low ↔ her high | auth | phatquy | vượt quyền | đúng lễ | ✓ |
| NPC low ↔ her high | take | takeaway | vượt phận | đúng lễ | ✓ |

| open charge | file | fail branch marked (cqAccFail) |
|---|---|---|
| accuse | j8.js | ✓ |
| vp | j8.js | ✓ |
| xx | jdress.js | ✓ |
| tocao | j30.js | ✓ |
| expose | j30.js | ✓ |
| xinhh | j30.js | ✓ |
| trinhth | j78.js | ✓ |
| trinhhh | j78.js | ✓ |

| her breachable act | class | warning on her row |
|---|---|---|
| nuoc | down | yes ✓ |
| tea | down | yes ✓ |
| ink | down | yes ✓ |
| tat | high | yes ✓ |
| batnat | high | yes ✓ |
| phatquy | auth | yes ✓ |
| Dư đồ focus view (jdf dfInPerson rows) | all in-person acts | cqWarn ✓ |
| talk options Khiêu khích / Trút giận (j2 talkOpts) | down | cqWarn ✓ |

keys 280 · classes {"accuse":8,"auth":15,"down":6,"high":2,"up":8,"downNB":2,"take":1,"free":238} · rank-ruled 42: before checked 14 / unchecked 28 → after checked 42 / unchecked 0 · gift words ban cho / kính dâng / tặng · page errors 0

## Robot measure — dev/measure/cung-quy-rate.js (NPC acts that break etiquette, bot life, 2 runs)
| build | tuần | NPC acts counted | breaks (no deliberate breach) | per tuần | stopped by the gate |
|---|---|---|---|---|---|
| LIVE 6b5d3d05 (counter injected, gates off) | 60 | 392 | **5** (provoke 4, ink 1) | 0.083 | — |
| review/cung-quy 63de2af3 | 46 | 388 | **0** | 0 | 15 (provoke 13, batnat 1, nuoc 1) |
| review/cung-quy b54f367e (rv1) | 60 | 358 | **0** | 0 | 5 (provoke 3, tea 1, nuoc 1) |
Deliberate breaches in the bot runs: 0 (bold NPCs rare; shown by the shot test below).

## Tests
- coop-e2e (CDN build): **143/143 passed** (63de2af3 and again on rv1 b54f367e) (a first run on an image-less build failed only the 5 «Thái hậu picture» rows: no pictures → environment, not this change).
- old save: dev/test/cung-quy-oldsave.js — LIVE save (4 tuần) loads and plays to tuần 9 with gates on, 0 page errors: **PASS**.
- npc-purpose-scan: PASS (419 rows). two-way-acts: flaky on BOTH builds (random deeds fail by odds each run: branch 1–2 FAIL, LIVE 2–3 FAIL, different rows each run) — not worse.
- Shots + videos of a breach notice (bold Đáp ứng mocks her): Fold 755x1000@2 / iPad 1180x820@2, looked at:
  - https://ctm-img.victoria-tntt.workers.dev/img/_review/cung-quy/cq-breach-fold.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/cung-quy/cq-breach-ipad.png
  - https://ctm-img.victoria-tntt.workers.dev/img/_review/cung-quy/cq-breach-fold.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/cung-quy/cq-breach-ipad.webm
  (verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review cung-quy)

## Parking lot (law 18, not built)
Speech-form checks (本宫 / 嫔妾) in story text → text-hygiene job (D); the slow «叫起» slight.

## Handover
Nothing open except review. Worktrees: /home/user/wt/cungquy (branch), /home/user/wt/cq-live (LIVE build for compare).

## RV1 (BIG review FAIL 63de2af3, dev/handover/reports/review-cung-quy.md) — fixes in b54f367e + 77d9a6e4
1. Dư đồ focus view (jdf dfInPerson rows) shows cqWarn; the scan now checks every surface she starts a breachable act from (person-card row xw for nuoc/tea/ink/tat/batnat/phatquy, focus view, talk options) — all ✓.
2. batnat «Ép nộp của» → class high (LIVE tsbBulOK rkOf(a)>rkOf(t)); tsbBulOK reads cqOK; scan BEFORE row fixed (now 14 checked / 28 unchecked before).
3. Structured fail signal: every open charge (accuse, vp, xx, tocao, expose, xinhh, trinhth, trinhhh) calls cqAccFail(a,t) in its fail branch; cqRun charges «vu cáo» only on it, only upward, never on top of the act's own punishment (expose → fall). Probe: her failed trinhth / accuse / tocao against a higher rank all get «Trái cung quy: ngươi vu cáo X, bậc trên mình…». The scan checks each fail branch.
Also found and fixed: maid/srv:accuse were a FALSE BLOCK (target = the Hoàng hậu as listener) → free; breach lines use the j61 name-mask (unmet consort = «một vị …», second mention «người ấy»), matching the card header «???». Note (pre-existing, not this job): j8 accuse's own line prints the real name of an unmet target («Ngươi tố giác <name> không thành») — name-mask family.
Shots/videos re-uploaded (same URLs). Old save PASS, scan PASS.
