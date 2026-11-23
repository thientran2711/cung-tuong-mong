/* ================= jbaleff: ONE CORE (OD:L1267) amounts of relation / power effects (review/one-core-dup, family F3) =================
   BAL.eff.<module>.<site> = the amount the module's effect call applies (relAdd thiện cảm, oanAdd oán, affAdd, kcAf, tdPowAdd …);
   [a,b] = the two amounts of a `cond ? a : b` call. Site = the enclosing function / option key (_2, _3 … for the next calls in it).
   Moved from inline literals by dev/measure/one-core-eff-move.js; proof dev/measure/one-core-eff-same.js (values unchanged).
   ev<Site> = chứng cứ (evidence) count of an evA / evStory call (review/one-core-dup3, dev/measure/one-core-dup3-ev-move.js);
   loyal / tin / tal / hp / fond / me<Site> = the amount of a person-stat write x.p±N (the sign stays typed in the code; dev/measure/one-core-dup3-stat-move.js);
   j42 merit* / srvErrandDone_2 / srvDoOrder_2 = Công lao (srvMerit) of the servant acts (review/one-core-dup3). ·
   <stat><Site> (sung / danh / duc / bac / suc / th / tamco / mat / an / tai / sac / tin) = an amount a text ALSO typed (review/one-core-jkc-2, dev/measure/one-core-fx-both-move.js). */
Object.assign(BAL,{eff:{
 j1:{},
 j10:{evPlantServ:1,evServMonth_2:1,evServAct:1,evServAct_2:1,evSellOut:2,loyalServCaught:10,loyalServMonth:1,loyalServAct:12,loyalServAct_2:15,loyalServAct_3:20,meCourtAct:10,meCourtAct_2:1,danhServAct:-2},
 j13:{hpEpidemic:40},
 j14:{coldMonth:40,evSearchMaids:2,loyalServRanks:5,sucColdMonth:-20},
 j2:{start:35,go:9,go_3:-20,run:-15,fondGo:8,hpGo:30,hpGo_2:25},
 j20:{bacQueenRewards:20},
 j21:{top:-3,meTop:1},
 j22:{evGo:1,evAffairMonth:3,evAffairMonth_2:2,evTop:2,evTop_2:3,evTop_3:2,sucGo:-20,sucL:-30,sucTryst:12},
 j23:{evTop:1,talArtMonth:1},
 j24:{go:20,go_2:-5,go_3:12,go_4:-6,approachOne:3,go_5:-10,go_6:-15,go_7:5,go_8:-3,evTop:1,loyalGo:15,loyalGo_2:10,loyalGo_3:3,loyalJudgeServ:5,loyalJudgeServ_2:1,loyalJudgeServ_3:25,loyalJudgeServ_4:5,loyalJudgeServ_5:5,loyalJudgeServ_6:1,loyalJudgeServ_7:15,loyalJudgeServ_8:2,loyalJudgeServ_9:6,bacTop:40,ducJudgeServ:-3,bacApproaches:20,bacTop_2:-20},
 j25:{go:10,go_2:-3,evTop:1,hpKidAct:10,fondKidAct:8,sungKidAct:2,sucKidAct:-5/* r3 sg-card: kid greet Sức (was typed on card + apply) */},
 j28:{run:6,run_2:5,run_3:4,run_4:-10,run_5:6,run_6:10,run_7:[3,-6],run_8:8,run_9:-20,run_10:4,run_11:6,run_12:6,run_13:-8,evRun:[1,0]},
 j29:{evBribeServ:1,loyalBribeServ:5,evFireServ:1,evFireServ_2:1,bacFx:-20,danhServTraitMonth:-1},
 j3:{evGo:2,evGo_2:2,danhGo:-8,danhMonthTick:5},
 j30:{f:-10,evF:-1,sungF:-10,sucF:-25,danhF:-5,sungLyFail:-4/* r3 sg-card: ly gián not believed — the schemer's Sủng (was typed on card + ap) */},
 j31:{go:6,sungGo:4,danhGo:2,danhGo_2:-1,ducGo:2,danhGo_3:3,sungGo_2:2,ducGo_2:3,ducGo_3:4,matGo:1,sungGo_3:5,danhGo_4:-2,thGo:5,sucGo:5,sungGo_4:4,danhGo_5:3,danhGo_6:4,sungGo_5:3,danhGo_7:-2,bacGo:50,ducGo_4:3,sungGo_6:3},
 j34:{gW:1.6,miniW:1.5,rN:4,rW:1.2,scMax:10,sucDef:60,sucLow:40,sucPen:-2,dHit:6,dMiss:3,dDuc:25,dTam:30,pheMax:4,pheBase:1,pheDiv:2/* jemo-bal: tScore art × / mini-game × / roll R(rN) × rW, score 0..scMax, Sức (default sucDef) under sucLow → sucPen; dScore virtue hit / miss + Đức ÷ dDuc + Tâm cơ ÷ dTam; fScore a phe backer min(pheMax, pheBase + n ÷ pheDiv) */,contestEnd:10,meGo:1,danhSabotage:-6,sungSabotage:-8,prW:1.5,sabCut:2,backerPt:2,wTrong:1.5,wHieu:1.5,wDanghi:.6/* law4-typed: practice weight / sabotage cut / backer point / judge-trait round weights — were typed in tScore/fScore/crW + their card text */},
 j4:{evMonth:2,evGo:1,danhMonth:4,danhMonth_2:-4,danhMonth_3:-20,danhMonth_4:-20,sungMonth:-15,danhMonth_5:10,sungMonth_2:-10,sungMonth_3:-10,danhMonth_6:-10,danhGo:5,tamcoGo:2,danhGo_2:-8,thGo:10,sungMonth_4:3,sungMonth_5:-3,sungMonth_6:-15,danhGo_3:8,danhMonth_7:-1,sungMonth_7:-20,danhMonth_8:5,bacMonth:150,danhMonth_9:-10,thMonth:10,danhMonth_10:-10,danhMonth_11:3,danhLose:-15},
 j40:{mindBelief:8,mindBelief_2:8,evMindRun:1,evTop:1},
 j42:{cnvFrame:-30,srvErrandDone:3,srvErrandDone_2:1,srvDoOrder_2:1,meritMis:0.25,meritRec:3,meritSweep:0.5,meritTea:0.25,meritNvp:0.5,meritRite:0.25,meritBooks:0.5,srvDoOrder:-10,go:-5,srvRise:[25,-25],top:15,top_2:40,evSrvTalk:1,evSrvTalk_2:2,evGo:1,evSrvMonth:1,evN:1,evSrvDoOrder:2,evTop:2,tinSrvMonth:5,loyalSrvStaffAct:15,loyalSrvAffairCaught:20,tinSrvAffairCaught:20,tinSrvMoodEvent:1,tinGo:3,tinGo_2:-3,sucGo:-15,sucGo_2:-20,tinGo_3:2,tinGo_4:-12,sucGo_3:-15,tinGo_5:-15,tinGo_6:-5,tinGo_7:-4,bacTop:30,tinTop:6,sucGo_4:-15,sucL:-30,sucSrvDoOrder:-20},
 j53:{fondKtGrow:1,sungFav:-4/* r3 sg-card: «Xin Hoàng thượng cử Đại học sĩ» Sủng cost (was typed on card + apply) */},
 j54:{noiSung:3,noiTinh:2/* r2 sg-card: child «vào cung nói giúp» Sủng (+2 for a tình child) — was typed 3 times */,sungGo:-10,danhGo:-3,sucGo:-15,thGo:8,sungGo_2:6,sucGo_2:-15},
 j55:{tdGiftHead:-10,ccStep:-5,ccStep_2:-5,tdAsk:-3,tdProbe:-8,tdProbe_2:8,tdLeak:-6,tdLeak_2:25,tdLeak_3:-10,top:2,top_2:3,top_3:6,top_4:-8,top_5:-6,top_6:8,top_7:-10,tdSoMonth:3,tdSoMonth_2:[4,-3],tdSoMonth_3:2,tdSoMonth_4:-2,tdSoMonth_5:-5,tdSoMonth_6:-5,tdImpeach:-6,tdImpeach_2:2,tdImpeach_3:-5,top_8:6,top_9:-6,go:-3,fail:-3,danhTdAsk:4,sungTdAsk:2,danhTdAsk_2:-2},
 j67:{evGo:1,evN:2,talGo:5,hpGo:15,evGo_2:2,evGo_3:1},
 j68:{},
 j68e:{ok:-5,ducOk:-1,ducOk_2:-1,sucOk:-3,danhOk:-1,sungOk:-2,sungOk_2:-1,sungOk_3:-3,sungOk_4:-1,matW:1},
 j68f:{relOk:6,hpOk:10,hpOk_2:6,hpOk_3:4,talOk:2,talOk_2:5,evOk:1,sungOk:-1,sacOk:-1,ducOk:-2,ducOk_2:-1,danhL:-1},
 j68g:{talOk:4,talOk_2:3,talOk_3:2,evOk:1,sacOk:-1,ducOk:-1,danhOk:-1,sungOk:-1,ducOk_2:-1,sungOk_2:-1,ducOk_3:-2,ducOk_4:-3},
 j68h:{relHit:-25,relOk:6,evOk:1,loyalOk:10,danhL:-1},
 /* j68q (OR20): j68 life in lãnh cung (cold), as a servant (srv), Hoàng hậu duties (hh). cd = tuần between two of one template; w = weights;
    rk = odds lost per rung (law 5: cold = the rank she fell from, srv = her servant rung, hh = rungs above BAL.voice.hq + 1); od = base odds;
    rel / loy / tin / nt / st / suc / bac = small / mid / large amounts (s / m / l); ev = chứng cứ per success */
 j68q:{cd:10,w:{lo:.7,mid:1,hi:1.5},rk:{cold:2,srv:3,hh:4},dv:3,ev:1,
  od:{talk:50,take:45,gloat:45,letter:45,credit:45,cheer:55,quan:45,pass:40,late:55,ledger:55,judge:55,deny:50,visit:50,newT:50},
  rel:{s:4,m:8,l:12},loy:{s:5,m:10,l:15},tin:{s:4,m:8,l:12},nt:{s:3,m:6},st:{s:1,m:2,l:3},suc:{s:3,m:6,l:10},bac:{s:10,m:20,l:40}},
 j7:{sungGuardOk:2,danhGuardFail:-6/* r2 sg-card: guardrumour «Xin Hoàng thượng tra xét» — applied but typed and not on the card (law 4) */,evGo:1,evGo_2:1,evN:2,fondGo:6,talGo:5,fondGo_2:8,hpGo:20,hpGo_2:8,hpGo_3:30,hpGo_4:10,evGo_3:2,evGo_4:1,evGo_5:2,evGo_6:2,evGo_7:2,evGo_8:2,sungGo:4,sungGo_2:-8,danhGo:3,danhGo_2:4,sungGo_3:-10,matGo:1,danhGo_3:5,sungGo_4:3,sungGo_5:-5,sungGo_6:-10,bacGo:60,danhGo_4:5,sungGo_7:2,matGo_2:1,thGo:15,danhGo_5:4,thGo_2:3,ducGo:5,matGo_3:1,sungGo_8:-5,sungGo_9:-6,ducGo_2:4,sucGo:10,sungGo_10:-4,danhGo_6:6,sucGo_2:-15,danhGo_7:-5},
 j70:{thShield:-3,thLotus:-3,step70:2,exec70:-10,no:5,no_2:8,ok:12,ok_2:8,ordMonth70:6,ok_3:-3,evNewPlot70:1,evStep70:1,evExec70:1,evExec70_2:2,evOk:1,evOk_2:1,evOk_3:2,evOk_4:-1,evTop:1,evOrdMonth70:1,evTop_2:1,evF:1,evF_2:1,loyalNewPlot70:5,loyalOk:2,loyalOk_2:10,loyalOrdMonth70:5,loyalTop:5,ducOk:1,sucC:-5,sacUse:3},
 j71:{winSung:8,winDanh:3/* r2 sg-card: tribute contest winner (was typed twice) */,incenseTh:3,thNurse:[10,3],go:4,go_2:2,go_3:5,go_4:-3,go_5:6,go_6:4,ok:-2,no:-2,npc:10,res:-10,ok_2:10,npc_2:10,npc_3:5,npc_4:5,hpOnFire:15,hpOk:20,fondOk:6,hpOk_2:15,fondOk_2:3,hpOk_3:15,hpOk_4:8,hpNpc:15,danhGo:1,sucGo:4,danhGo_2:4,sungGo:2,danhGo_3:-2,danhGo_4:1,sucGo_2:4,sungGo_2:2,danhGo_5:3,danhGo_6:-2,ducGo:2,sucGo_3:4,danhNpc:3,danhNpc_2:2,danhNpc_3:2,sungStakes:8,danhStakes:3,ducNpc:3,danhCFin7:1,danhCFin7_2:-1,danhTop:-1},
 j72:{hhTh:5,bacMat:-8,gioiTh:5,tinDoi:4,q72Npc:[6,-4],q72Npc_2:[5,-3],fn:6,fn_2:-8,fn_3:5,fn_4:4,fn_5:-4,fn_6:5,fn_7:4,fn_8:-6,fn_9:-3,fn_10:-12,evQ72End:1,evFn:1,evFn_2:1,hpFn:15,loyalFn:15,loyalFn_2:4,loyalFn_3:10,loyalFn_4:10,talFn:5,fondFn:12,loyalFn_5:10,hpFn_2:3,talFn_2:2,talFn_3:3,talFn_4:5,talFn_5:2,talFn_6:3,sucFn:10,matAcc:1,bacAcc:50,taiAcc:3,danhAcc:2,matAcc_2:1,bacAcc_2:60,sucFn_2:10,bacAcc_3:30,bacFn:30,bacFn_2:20,taiFn:2,sucFn_3:8,tamcoFn:3},
 j75:{monopoly:2,sucFx:3},
 j76:{tamcoGo:1},
 j78:{trinhth:2,trinhth_2:-4,j78maidFail:5,f:-15,f_2:-10,f_3:-5,f_4:10,f_5:15,f_6:8,f_7:5,evN:1,evN_2:1,evTop:1,evF:-1,evF_2:-2,evF_3:-1,sungF:-10},
 j8:{maidStealBac:30/* IT05: a bought maid with no piece worth taking runs off with this much silver */,rumorDanh:-8,accuseDanh:6,accuseFailDanh:-8,vpFailDanh:-3/* r3 sg-card (core gate g1-text on j17 AOUT): rumor / accuse / vp — were typed in j8 A + j17 AOUT */,frameDanh:3,frameTam:2,frameFailDanh:-15,frameFailSung:-8/* r3 sg-card: «Vu oan» (A frame) win / exposed — were typed in j8 A frame + j17 AOUT.frame */,framedSung:10,framedDanh:12/* r2 sg-card: framed() (bùa ngải / vu tội) — were typed in framed + 2 result lines */,festSung:8,festDanh:3/* r2 sg-card: festival winner (was typed in festival()) */,taintDuc:-3/* Đức per taint (taintItem + taintpick card, one key) */,taintXaSuc:-20,taintHit:{chi:{sac:-1,suc:-3},meoAsthma:-8,meo:-1,bua:-3},caught:-10,f:-8,f_2:25,f_3:-5,f_4:-5,f_5:-30,f_6:-20,f_7:-20,f_8:-10,f_9:-30,judge:-10,vpAccuse:-10,vpAccuse_2:-10,giveTo:-25,plantItem:-20,go:-5,sendMaid:[30,-25],birthP:-10,maidMonthP:-10,empAct:-15,empAct_2:30,go_2:[-12,-4],go_3:-3,evCaught:2,evF:1,evF_2:1,evF_3:2,evF_4:1,evF_5:1,evF_6:1,evGiveTo:2,evPlantItem:2,evInspect:2,evSearch:2,evBirthP:2,evMaidMonthP:2,evSeenNPC:1,evGo:2,evItemAct:2,loyalF:10,loyalF_2:5,talF:15,hpF:30,fondF:35,fondGo:10,loyalMaidMonthP:1,hpKidsMonth:4,danhDeathSentence:-10,mercyTurn:12,mercyConfine:3,spyTam:2,ksabCost:-3,ksabTam:2,ksabFailDanh:-10,pondCost:-15,pondFailDanh:-10,frameCost:-5,catswapCost:-10,kpoisonCost:-20,kframeCost:-15,kframeDanh:-10,kframeTam:2,pondDrown:45,kpHit:{lo:50,r:40,doc:2},frameSev:2,pondSev:2,kframeSev:2,catswapPreg:6,kframeAge:6,pondAge:2/* jemo-bal: catswap from pregnancy month catswapPreg, kframe a son of age ≥ kframeAge, pond a child of age ≥ pondAge; frame / catswap / kpoison / kframe Đức costs (card c + rule), kframe win (mother Danh, doer Tâm cơ), pond drown odds, kpoison hit (lo + R(r), ÷doc with a physician), punish severities *//* law4-typed: death mercy (first year, confinement), spy/ksab/pond — were typed in j8 A + j17 AOUT + jaudit aaDeathTxt */,danhGo:5,bacGo:40,sungGo:-3,thGo:-10,sungGo_2:-3,danhBirthP:-10,sungDeathSentence:-10,sucF:-10,sucF_2:-25,danhVpAccuse:-8,danhUseItem:-5,danhSearch:-10,sungRivalNight:-4,sungBirthP:-10,danhFestival:-2},
 j83:{evIllBuy:1,evIllBuy_2:2,evIllBuy_3:1,evIllBuy_4:2,loyalIllBuy:10,danhWkSell:-3},
 j85:{hpV85Month:2},
 j9:{npcEncounters:3,npcEncounters_2:3,npcEncounters_3:-2,npcEncounters_4:-2,npcEncounters_5:2,npcEncounters_6:2,run_5:-3,run_8:-15,run_9:-8,run_10:2,run_11:10,run_12:-5,pushPond:-10,pushPond_2:-25,trip:-6,trip_2:-12,evN:1,evTrip:1,evOverhear:1,danhTrip:-3},
 j92:{wdAccuse:-12,wdAccuse_2:-10,wdAccuse_3:-10,danhWdAccuseA:2,wdFrame:-20,wdFrameResolve:-10,clear:-15,evWdFrame:2,evWdFrame_2:1,evWdFrameResolve:1,evSpendEv:-1,danhWdRemark:-6,danhWdAccuse:-8,sungWdFrameResolve:-5,danhGuilty:-10,sungGuilty:-5,sungWdNtMonth:-10,sungGo:-6,bacFx:-40,sungWdRemark:-5,danhWdAccuse_2:-2,danhWdAccuse_3:-6,danhWdAccuse_4:-4,sungWdAccuse:-5,danhWdFrameResolve_3:-5,danhGuilty_2:-5,danhGo:-3},
 j95:{j95caught:25,j95caught_2:-15,go:10,j95bribeTake:6,j95silent:15,j95silent_2:12,j95silent_3:-10,evJ95secApply:[1,2],evJ95watch:1,evJ95caught:1,evJ95hold:1,evJ95npcCatch:1,evJ95npcCatch_2:1,evJ95npcCatch_3:2},
 j95b:{j95bClear:12,j95bClear_2:-8,j95bClear_3:4,evJ95bTrace:1},
 j96:{evGo:1,evGo_2:2,loyalGo:8,tinGo:10,loyalGo_2:12},
 j99succ:{},
 jact:{hpTop:30,sungGo:-1},
 jagent:{evGo:1},
 jaudit:{run:-3,f:-10,f_2:-10,f_3:-5,evN:1,evRun:1,evF:-2},
 jcmaid:{evD:1,evD_2:1,loyalTop:1,loyalTop_2:1,loyalTop_3:1},
 jcoopworld:{briber:-5,evBriber:1},
 jcycle:{evG:2,evG_2:1,evG_3:1,evTop:1},
 jecon:{econDoDuty:2,f:-8,evF:1,evF_2:1,loyalF:10,loyalF_2:5,danhF:-2},
 jemo:{/* jemo-bal (law 4): every number of jemo.js. ev = event → [feeling, strength]; tr = trait filter [feeling, ×strength]; decay / decayDef = points a tuần, dk = trait ×decay;
  night = her tablet × by her mood (v3: all 1); brake = Đức + trait brake on harm wishes (hi/mid Đức lines, f* shares, soft = trait Đức shift, ducDef = NPC with no Đức,
  grudge = oán that keeps grudgeF, zero = harm weight when fully braked); floor = below it no feeling; stack = share of a repeated same feeling added;
  legSync / legV = old 4-step bars (Emperor, Thái hậu) sync line / strength; wk = the week's real-change lines (aff / oán / Sủng / Sức / Lòng) and strengths;
  emp = the Emperor's own feelings (heir born / lost, a consort punished); hook = oán / kindness hooks (min amount, n/div clamped lo..hi);
  nightK = the Emperor's mood on the tablet; loyDiv = servants' Lòng a month divisor; mot = motive gate (j95) strength lines, grief level, liking line */
  ev:{selfUp:["vui",60],selfDown:["buon",55],rivalUp:["ghen",30],friendUp:["vui",20],foeDown:["vui",20],gift:["vui",18],slight:["gian",35],  kidBorn:["vui",70],kidDie:["buon",95],otherKid:["ghen",25],punished:["so",50],cold:["buon",85],neglect:["buon",30],ill:["lo",35],  friendDie:["buon",55],foeDie:["vui",15],mistressUp:["vui",30],mistressDown:["lo",40],loyalUp:["vui",25],loyalDown:["buon",30],motherDie:["buon",90],  motherCold:["buon",50],clanUp:["vui",35],clanDown:["lo",40]},
  tr:{  "Kiêu ngạo":{rivalUp:["gian",1.4],slight:["gian",1.5],punished:["gian",1.2],selfDown:["gian",1.3],gift:["vui",.6],otherKid:["ghen",1.4]},  "Khiêm nhường":{rivalUp:["buon",1],slight:["buon",1],punished:["so",1.4],selfDown:["buon",1.2],gift:["vui",1.2],otherKid:["buon",.8]},  "Tham vọng":{punished:["gian",.8],selfDown:["gian",1],friendDie:["lo",.6]},  "Xảo quyệt":{slight:["gian",1.1],punished:["gian",.9],foeDown:["vui",1.6],foeDie:["vui",1.5],gift:["vui",.8]},  "Ân cần":{rivalUp:["vui",.5],slight:["buon",.6],gift:["vui",1.3],punished:["so",1],otherKid:["vui",.5],foeDown:[null,0],foeDie:["buon",.6],friendDie:["buon",1.6]},  "Kín đáo":{rivalUp:["lo",1],slight:["gian",1],gift:["lo",.5],punished:["so",1.2],ill:["lo",1.4],night:["lo",.3]},  "Thù dai":{slight:["gian",1.4],foeDown:["vui",1.3]},  "Ham lợi":{gift:["vui",1.6]},  "Trọng nghĩa":{friendDie:["buon",1.7],friendUp:["vui",1.4]},  "Rộng lượng":{slight:["buon",.8]},  "Thật thà":{slight:["gian",1.1]},  "Mê tín":{ill:["so",1.2],kidDie:["buon",1]},   trung:{mistressDown:["lo",1.4],mistressUp:["vui",1.3]},tham:{gift:["vui",1.6],mistressDown:["lo",.8]},nhat:{punished:["so",1.6],mistressDown:["so",1.3],loyalDown:["so",1.2]},  lanh:{mistressUp:["vui",1.2],loyalDown:["gian",.8]},chuyen:{},   nongnay:{slight:["gian",1.5],kidDie:["gian",.8]},nhantu:{slight:["buon",.7]},danghi:{slight:["gian",1.2],ill:["lo",1.3]}},
  decay:{vui:9,binh:0,buon:6,gian:8,so:9,ghen:6,lo:6},decayDef:6,dk:{"Thù dai":{gian:.4},"Ân cần":{gian:1.6,ghen:1.6},"Khiêm nhường":{buon:.7,so:.8},"Kiêu ngạo":{gian:.8},"Nóng nảy":{ghen:.6},"Trọng nghĩa":{buon:.8}},night:{vui:1,binh:1,buon:1,gian:1,so:1,ghen:1,lo:1},
  brake:{hi:70,mid:40,fHi:0,fMid:.5,fLo:1,fBad:1.5,soft:{"Ân cần":15,"Khiêm nhường":8,"Trọng nghĩa":8,"Vì gia tộc":5,"Xảo quyệt":-10,"Tham vọng":-5,"Thù dai":-5},ducDef:50,grudge:60,grudgeF:.5,zero:.9},
  floor:15,stack:.5,legSync:40,legV:50,
  wk:{friend:30,foeOan:30,foeAff:-20,upFriend:40,upRival:25,downOan:25,downAff:-25,kidAff:25,fondN:6,nightAff:10,nightK:.6,neglect:6,ill:30,loyD:5,mistress:40,fearV:30,kidV:30,offV:30,manV:25},
  emp:{born:55,lost:75,punish:35},hook:{oanMin:5,affMin:8,div:10,lo:.6,hi:1.6},nightK:{nhantu:1.05,angry:.5,gentle:1.08},loyDiv:60,mot:{anger:50,strong:60,lv:3,aff:-30}},
 jemoact:{},
 jend14:{},
 jexam:{tinExSrvRise:5},
 jface:{evPzWeek:1,evOk:1,evSlapEvidence:1,evSlapEvidence_2:1,evFxServMonth:1,evSlapReport:1},
 jgift:{danhGo:1,sungGo:1,sungGo_2:-1,anGo:1,sungGo_3:-1,sungKmEmpAct:-1},
 jhouse:{loyalRun:6},
 jinv:{thLuxMonth:-3,danhLuxMonth:-1,ducLuxMonth:1},
 jkc:{mzL:5,go:4,go_2:5,fail:-6,go_3:4,fail_2:-10,fail_3:-5,fail_4:-2,fail_5:-3,go_4:8,go_5:6,fail_6:-2,fail_7:-15,fail_8:-10,fail_9:-8,go_6:4,go_7:6,fail_10:-12,go_8:10,go_9:-15,fail_11:-5,go_10:-10,fail_12:-4,go_11:10,go_12:-15,fail_13:-5,go_13:8,go_14:6,fail_14:-2,fail_15:-15,fail_16:-10,fail_17:-8,fail_18:-8,go_15:6,fail_19:-12,o:-3,o_2:4,o_3:-2,o_4:-8,o_5:3,o_6:8,o_7:-8,o_8:2,o_9:-10,o_10:6,o_11:2,o_12:15,o_13:-15,o_14:4,o_15:-4,o_16:15,o_17:-3,o_18:8,o_19:3,o_20:5,o_21:2,o_22:6,o_23:-15,o_24:-15,o_25:-25,o_26:[10,3],o_27:[4,-6],o_28:-5,kcOriginFx:6,kcOriginFx_2:3,kcOriginFx_3:-4,bac:12,bac_2:-15,dithai:8,chieu:-15,so:-15,meGo:4,meGo_2:4,meGo_3:4,meGo_4:4,loyalO:15,loyalO_2:8,loyalO_3:20,meO:5,loyalKcEnter:15,meBac:3,loyalGianhan:6,oanGo:4,oanFail:20,oanGo_2:15,oanFail_2:15,oanGo_3:4,oanFail_3:20,oanKcMonth:1,oanO:5,oanO_2:8,kgtO:2,oanO_3:10,kgtO_2:4,oanO_4:6,kapO:10,oanO_5:10,kgtO_3:2,kapO_2:8,oanO_6:10,kgtO_4:2,kgtO_5:5,kapO_3:4,kapO_4:10,kgtO_6:6,kapO_5:15,kgtO_7:8,kapO_6:4,kapO_7:8,kapO_8:30,kapKcFest:3,kgtKcOriginFx:8,kgtKcElope:15,sucO:-20,sucO_2:-10,sucKcOrigin:-30,kldNk:8,kldCc:2,kldDl:5,kldTl:12,kldGr:12,kldThu:15,kldTc:5,g7Wait:6},
 jkc2:{go:4,go_2:5,go_3:6,go_4:6,fail:-2,go_5:10,go_6:10,go_7:10,fail_2:-3,go_8:10,fail_3:-2,go_9:6,fail_4:-2,go_10:8,go_11:3,fail_5:-3,go_12:4,fail_6:-2,go_13:4,go_14:5,fail_7:-5,fail_8:-6,go_15:8,go_16:6,fail_9:-2,go_17:8,fail_10:-2,go_18:8,fail_11:-2,fail_12:-6,go_19:6,fail_13:-4,go_20:4,fail_14:2,o:10,o_2:6,o_3:12,o_4:8,o_5:4,o_6:-6,o_7:-10,o_8:-15,o_9:4,o_10:3,o_11:20,o_12:14,o_13:4,o_14:-10,o_15:12,o_16:-12,o_17:4,o_18:-4,o_19:8,o_20:12,o_21:6,o_22:2,o_23:2,o_24:-4,o_25:-8,o_26:8,o_27:5,o_28:6,o_29:-8,o_30:-12,o_31:-4,o_32:12,o_33:6,o_34:-10,o_35:6,o_36:-6,o_37:6,o_38:15,o_39:-6,o_40:10,o_41:10,o_42:2,o_43:5,o_44:-10,o_45:-6,o_46:4,o_47:-8,o_48:8,meGo:3,meGo_2:3,meGo_3:4,meGo_4:3,meGo_5:4,meGo_6:4,meO:10,meO_2:10,tinKc2EnterSrv:8,loyalKc2EnterNc:10,tinKc2SelDo:8,kapGo:4,kgtGo:1,kapGo_2:3,oanFail:2,oanFail_2:6,kapKc2Month:3,oanKc2Month:1,kapO:8,kapO_2:6,kgtO:5,kapO_3:12,kgtO_2:2,kgtO_3:3,oanO:6,kapO_4:6,oanO_2:8,kapO_5:10,kgtO_4:3,kapO_6:6,kapO_7:10,kapO_8:10,kgtO_5:5,kapO_9:10,kgtO_6:3,kapO_10:10,kapO_11:8,kgtO_7:5,kgtO_8:6,kgtO_9:4,oanO_3:10,oanO_4:12,kgtO_10:3,kgtO_11:2,kapO_12:5,kgtO_12:6,kapO_13:8,kgtO_13:8,kgtO_14:3,kapO_14:15,kapO_15:20,kgtO_15:6,oanO_5:10,kapO_16:5,kapO_17:12,oanO_6:20,kgtO_16:5,kgtO_17:8,kgtO_18:4,kgtO_19:3,kapO_18:15,kgtO_20:5,kapO_19:35,kapO_20:12,kapO_21:4,oanO_7:3,kgtO_21:8,kgtO_22:2,kgtO_23:3,kgtO_24:6,kapO_22:4,kgtO_25:6,oanO_8:8,kgtO_26:6,kgtO_27:12,kapO_23:10,kgtO_28:3,kldSb:2,kldLt:6,kldRc:8},
 jkrel:{},
 jlost:{loKeepHear:-6,loKeepHear_2:-6,loHolderMove:3,go:4,go_2:-4,loUI:-4,loUI_2:4,loUI_3:6,loUI_4:-6,loSteal:-4,evLoKeepHear:-1,evLoEvAdd:1,evTop:2,evLostEvUse:-1,danhLoUI:1},
 jmem:{evHookUse:1},
 jmen:{unhappySung:-2/* r2 sg-card: «Hoàng thượng không vui» when her report punishes his favourite (was typed) */,hideMan:15,hearMan:-5,menReport:30,menReport_2:-25,menReport_3:22,menReport_4:-18,menHide:15,menHide_2:-10,menChoose:15,menChoose_2:-8,top:10,evMenHide:[2,1],evMenChoose:[2,1],evMenNpcAct:1,evTop:[2,1],meGo:3,danhTop:-4,bacRun:40},
 jmind:{},
 jmline:{},
 jmood:{},
 jne:{go:-3},
 jpet:{petMonthOf:2,evPetMonthOf:1,evPetMonthOf_2:1,evGo:1,evF:1,loyalPetMonthOf:1,danhGo:-3,sungEmp:-2,sungTrib:-2,sungDecl:-2,sungGo:2,sucGo:2},
 jpetcare:{f:-6},
 jpoison:{pgGive:-6,found:-15,go:-4,go_2:-4,evFound:2,loyalGo:10,sucPgEffect:-25,sacPgEffect:-8,sucPgEffect_2:-25,sucPgEffect_3:-10},
 jpromo:{},
 jrash:{evF:1},
 jrcp:{win:-3,go:-5,evRcpAllergy:1,evRcpAllergy_2:1,evLose:1,loyalGo:30,loyalGo_2:3},
 jrd_cn:{evCN_HHCLEAR:-1},
 jrd_cnv:{},
 jreign:{rgAmnesty:10,rgPurge:-15,rgDecide:8,rgDecide_2:8,rgDecide_3:-10,rgDecide_4:-10,rgDecide_5:-10,rgDecide_6:10,rgMine:8,rgMine_2:-8,evRgRes:1},
 jroute:{evFail:1,evRtSeen:[3,2],evFail_2:2,evRtMonth:1,loyalFail:15},
 jsgame:{},
 jstaff:{meAct:1},
 jstip:{maidUse:3,go:5,go_2:10,evN:1,loyalGo:5,sucUse:3,sucUse_2:4,ducUse:1,sucUse_3:1,sucUse_4:3,sucUse_5:4,sucUse_6:5,danhGo:-1},
 jthaiy:{npcMonth:8,evNpcMonth:1},
 jtin:{loyalTop:1,loyalTop_2:1},
 jtruth:{frameExpose:-20,evN:1,evFrameExpose:2,evGo:-1,bacFx:-10,danhGuilty:-6},
 jts:{denSung:3,denAn:2,dressSung:3,dressDanh:3/* r2 sg-card: hoa đăng «Cầu thánh ân» seen + dress contest winner — were typed on card and in code */,go:3,danhGo:1,danhGo_2:-2,bacGo:6,bacTsBirthReward:20,danhTsBirthReward:3,sungOnDone:4,danhOnDone:3,sungGo:2,sungGo_2:-2,ducGo:1,danhGo_3:-1},
 jtsb:{loyalNhin:2,loyalDap:2,thCall:3,thCall_2:-3,tsbBulNpc:3,tsbBulNpc_2:10,tsbBulNpc_3:12,tsbBulNpc_4:12,go:10,go_2:10,go_3:15,go_4:8,go_5:5,go_6:8,top:4,go_7:6,go_8:20,go_9:5,go_10:-5,go_11:-15,go_12:5,go_13:-3,evF:1,evF_2:1,evTsbBulNpc:-1,evTsbBulNpc_2:1,evGo:1,evGo_2:-1,evGo_3:-1,evGo_4:1,loyalGo:8,danhTsbBulNpc:-4,bacGo:-10,sucGo:-5,danhGo:-5,danhGo_2:-4,sucGo_2:-5,danhGo_3:-2,danhGo_4:1,danhGo_5:-1,ducGo:1,danhGo_6:1,danhGo_7:3,danhGo_8:-3,danhGo_9:-1,danhGo_10:1,sucGo_3:-5,bacFx:-20,sucTsbBulNpc:-5},
 jtwoway:{run:-2,run_2:-2,run_3:4},
 jweather:{sucSlip:-20},
 jwhy:{f:-8,evRun:[1,0],evSpyMaidRun:1,loyalSpyMaidRun:5}
}});

/* typed-stat-bal GROUP B block (law 4): new amounts of group-B modules — Object.assign(BAL.eff.<module>,{…}) or new keys, never a key set twice */
Object.assign(BAL.eff.j55,{dadCut:-15,danhDadCut:-4/* father dismissed for graft (tdLeak / tdImpeach): her house-father support (t.dad) and her Danh; j55 rule + cards */,danhSoMonth:2/* «Sớ khen» a house: Danh of each consort of that house (j55 tdSoMonth) */});
Object.assign(BAL.eff.j71,{danhFxRank:1/* tribute contest (fxFin7) she played: 2nd / 3rd place Danh; j71 rule + sign-up card */});
Object.assign(BAL.eff.j30,{sungSick:-4/* slow poison (hạ độc dần) sick months: Sủng a month (j30 month tick + «slowpoison» card) */,danhTocao:3/* «Tố tội thật» success: the accuser's Danh (j30 rule, j78 evidence card) */});
Object.assign(BAL.eff.j78,{danhUyhiep:-3/* «Uy hiếp đòi bạc» refused: her Danh */,ducTrinhth:-2/* «Trình Thái hậu» cost: Đức */,ducTieuhuy:2/* «Trả chứng cứ lấy lòng»: Đức */,
 tieuhuy:{aff:8,oan:10,cap:30}/* «Trả chứng cứ lấy lòng»: target's thiện cảm +aff×n / oán −oan×n per returned piece, each capped at cap (j78thAff / j78thOan) */});
Object.assign(BAL.eff.j92,{danhWdAccuseFalse:-5,danhWdAccuseT:2/* «hặc vượt phẩm» but she was dressed by rank: accuser's Danh / the accused's Danh (j92 wdAccuse + AOUT.vp) */});
Object.assign(BAL.eff.jmen,{danhTryst:4,danhTrystFail:-2/* menReport a tryst: reporter's Danh when caught / when she denies it */,danhMeet:3,danhMeetFail:-5,thMeet:2/* menReport a private meeting: reporter's Danh (proved / slander), her Thái hậu regard */,
 danhMan:2,danhManF:3,thMan:1/* menReport a lone intruder: reporter's Danh (thị vệ / Cung Chính ti), her Thái hậu regard */,danhHide:-6/* «Giấu giúp» seen: hider's Danh (jmen rule + cards) */});
Object.assign(BAL.eff.j42,{/* servant does her master's order (srvDoOrder): her gain per order / her Chủ tin when it fails; j42 rule + ordRow card */});
Object.assign(BAL.eff.j4,{danhWin:5/* «đạo thơ» accusation cleared (PEND.thd1 win): her Danh; j4 rule + both option cards */});
Object.assign(BAL.eff.j54,{tinh:{duc:3,danh:2,hM:15,askM:5}/* a child wed to the one she loves (h54Betroth «tinh»): mother's Đức / Danh, child's Mẫu tử (hM); askM = Mẫu tử when the Emperor refuses; j54 rule + option card */});
Object.assign(BAL.eff.j7,{comet:{rel:25,sung:-15,thu:-20}/* «Sao chổi» omen on a rival: «Đứng ra nói đỡ» her regard (v.rel) / «Đổ thêm dầu vào lửa» her Sủng (raw, NPC) and regard */,
 cane:{rel:30,sung:-10,thu:-30}/* «caning» of a rival: «Quỳ xin tha» her regard / «Thêm một lời buộc tội» her Sủng (raw, NPC) and regard; j7 rule + option text */});
Object.assign(BAL.eff.j9,{ducPushPond:-12/* «Đẩy xuống hồ sen» (pushPond, her and NPCs): the pusher's Đức; j9 rule, ACT cost getter + card */});
Object.assign(BAL.eff.j99succ,{costB:{bac:-100,suc:-10},costC:{bac:-300,suc:-20}/* succession: «Buông rèm nhiếp chính» / «Tự lên ngôi Nữ đế» cost (succTry + PEND.succ0 card) */,danhB:8,danhBFail:-10/* «Buông rèm» succeeds / court refuses: her Danh */});
