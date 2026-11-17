/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={wkFinCap:1,/* Đức from handmade works (kinh, vật cầu phúc): at most this many per month (j83 wkFinLeft) */ oanLv:[5,20,45,75],/* oán word ladder (VANPHONG): <5 Không oán · <20 Chút oán · <45 Oán · <75 Oán sâu · else Oán hận */
 /* outQ = % an empty Hoàng hậu seat goes to an outsider girl (one-core: was 85 here and 60 in jbal2; 60 is the measured v12 value) */outQ:60,hz:3.2,conc:.5,/* conception per night × (D57 owner 16/11: doubled from .25 for everyone; the cycle peak/low is BAL.cyc.fert in jcycle.js) */trystC:[5,60],/* a tryst / affair conception = trystCh(p) = conceiveCh(p) kept within [lo,hi] (her Hẹn gặp riêng j22, Tư thông jroute, an NPC consort's affair month j22) */later:6,hhTh:60,/* diff-remeasure 16/11: 55 → 60 (Vừa HH 45 % → ~32 % with the fixed bot; 65 measured 26 %) */birthAdd:2,
 /* ONE SOURCE for every promotion threshold the player sees (checks in promoReqP/candOK and every text read these) */
 hhThNoSon:80,hhThNoSonHieu:70,hhDuc:50,hhDucHeir:40,qBlockHh:-40,qBlockTh:50,hiOppHh:-30,hiOppTh:30,hiOppFac:180,
 /* handmade works (j83), by material 0 thường / 1 tốt / 2 quý: matQ = phần added to the score; cap = highest tier it can reach (only quý makes a
    Tuyệt phẩm); val = gift value added (Sủng / Thái hậu / thiện cảm); sell = share of the material's silver paid back when sold (1: a sale never loses the material's price); tinh = extra
    chân tình for a quý work given to a sincere person. Value check: dev/test/paid-tiers.js */
 tsGift:{bac:12,ghen:8,oan:5,aff:3,eq:4,khac:2},/* Biếu quà làm lành (jts): bạc per person, effect, least worth of a work/item given instead (D19) */
 wk:{matQ:[0,2,4],cap:[2,2,3],val:[0,1,2],sell:[0,1,1],tinh:[0,0,1]},
 /* paid lessons (owner 14:50Z: paying must be worth it): a teacher always gives at least self-study + tchMin */
 tchMin:1,
 /* event-choice hints (KIT 28.6): Tâm cơ below hintMid → a vague hint; from hintMid → plain; from hintSharp (or Tai mắt ≥ hintMat) → names who reacts */
 hintMid:25,hintSharp:45,hintMat:3,
 /* TRUNG Y (jty, sếp 15/11 09:15Z): the Y phục slot is empty → she is in her inner robe. ONE source for every number of that rule */
 ty:{out:2,crowd:3,crowdN:3,royal:6,royalDuc:1,meet:1,reissueWk:2,   /* Danh lost: out of her palace / extra with ≥crowdN people / extra (tai tiếng) before the Emperor or Thái hậu (+ Đức); a visitor at home */
  robNight:12,robLonely:8,robPlot:45,robThug:3,robDanh:3,robWalk:2,omenWk:2,plotCh:12,plotRel:-30, /* robbery: % parts, Danh lost, omen lasts N weeks, weekly % an enemy plans it, relation that makes an enemy */
  npcOut:2,npcRob:2},                                                /* NPC: Danh per week seen out in trung y; weekly % an NPC is robbed (night walks) */
 /* THÁI Y (jthaiy, owner 15/11 20:20Z): monthly "Thỉnh bình an mạch" (free) + "Mời thái y bắt mạch" (two roads) + bribed / trusted physician */
 thy:{cost:[6,8,10,12,15,20,25,35],  /* bạc road by rank (≈ 1/7–1/8 of BAL.pay[rank]: scarce at low ranks, the same weight at every rank) */
  khPay:1,khSelf:3,sucSelf:5,        /* khắc of the bạc road (he comes to her) / of her own road (she walks to Thái y viện and waits) + Sức lost on her road */
  seen:40,seenPreg:30,               /* her road: % a rival hears she went to Thái y viện / % a hidden pregnancy is then guessed */
  find:50,findY:5,findTrust:20,findSelf:10, /* % to read a hidden harm (requested check): base + Y thuật bậc × findY + trusted physician + at Thái y viện */
  routineHint:25,routineTrust:25,    /* routine visit: % it notices "something odd" about a hidden harm (+ trusted) */
  early:50,earlyTrust:20,            /* requested check 2 weeks after conception: % to feel the hỉ mạch (≥3 weeks: always) */
  lie:35,lieSelf:20,leak:50,         /* bribed, untrusted physician: % he lies (at Thái y viện, with people around, less) / % her news reaches the briber */
  trustAf:40,bribeAf:30,bribeHost:40,/* thiện cảm the physician needs to be her man / a rival's bribe weight that turns him / hostility that makes a rival use it */
  npcBribe:6,npcBribeBac:30,npcBribeAf:20,npcDecay:4, /* NPC: monthly % a hostile rival bribes the physician, its price, weight it adds, monthly fade */
  npcFind:15,npcFindDoc:35,          /* NPC: monthly % the routine visit finds a hidden harm in her (+ her own trusted physician) */
  askAf:30,askBase:40,               /* Hỏi chuyện with the physician: thiện cảm needed for him to tell a rival's mạch án / base odds (+ thiện cảm/2) */
  nausea:45},                        /* weekly % of a nausea hint from the 2nd week of an unfound pregnancy */
 /* PALACE START (owner 16/11 "game starts right after the accession" + amendment "about 4 small children"; review/palace-start; NEW games only, flag S.ps):
    j1 psSeedKids / psOpenText, j2 start, j51 kvW. harem = [rank, queen] of the consorts at the start (young and small: 10, was 12);
    consAge = [min, spread, +years for the queen and Phi+]; kidN = weights for 0,1,2,3,4,5 children in the whole palace; kidAge = [min,max] age;
    sonP = chance a seeded child is a prince; sonMom / dauMom = mother's rank range (7 = the Hoàng hậu: daughters only, never a son = no đích tử);
    empAge = [min, spread]; power0 = the throne's grip on the court (0–100, hook for the Emperor's side story and the side road, D5);
    npcConc[y] = NPC conception × in the y-th game year (then 1); truongW = heir weight for the first-born son (old saves 25): an edge, not a lock;
    momAge = youngest age of a mother (and the Emperor) at a seeded child's birth (review r1). */
 ps:{harem:[[7,1],[5,0],[4,0],[3,0],[3,0],[2,0],[1,0],[1,0],[0,0],[0,0]],consAge:[18,4,2],kidN:[0,0,0,30,50,20],kidAge:[1,4],sonP:.5,sonMom:[1,5],dauMom:[1,7],
  empAge:[19,6],power0:30,npcConc:[.9],truongW:8,momAge:17}};
/* ================= ONE CORE (owner 16/11 07:25Z, review/one-core): rule numbers that used to be typed in several modules.
   Every check and every player-visible text reads these; dev/test/one-core-guard.js fails on a new typed copy.
   time.khac = khắc in one buổi (4 buổi a tuần = B4N, jtime4); time.sucMin = an act of 2+ khắc needs Sức at least this (kiệt sức floor, j76/j80 hotfix: was typed 20 in old texts, the live rule is 5).
   lot = re-draw of the weekly lot (Gieo lại quẻ): bac bạc + k khắc.  walk = khắc to walk to a near / far place (j9 / jclose travel; weather never adds walking khắc, owner 15/11 06:40Z OD:L351).
   sneak = Danh lost when caught sneaking in (danh; the Emperor's halls: heavy, a heavy offence) / when seen at Trường Môn viện (seen).
   srvAge = servant start (cnv): age she is asked about leaving (ask), age a maid must leave (out), age a ma ma retires (mama).
   age.sac* = once she is older than sacFrom her Sắc falls sacLoss a year, never below sacMin (everyone); age.betroth / wed = a child may be promised /
   is married (princes and princesses alike); matchShow = a child shows in the match lists from this age; matchMax = oldest prince offered as a match; age.reign = the young Emperor rules alone from this age (no regency).
   seat = seats per rank (7 Hoàng hậu, 6 Hoàng quý phi, 5 Quý phi, 4 Phi, 3 Tần); SEATCAP (j30) is this table.
   night = the least a night with the Emperor gives: Sủng +sung, Ân tình +an (the night's score adds more, j8 nightFx). */
Object.assign(BAL,{time:{khac:4,sucMin:5},lot:{bac:10,k:1},walk:{near:1,far:2},sneak:{danh:8,heavy:15,seen:2},srvAge:{ask:25,out:30,mama:45},
 age:{sacFrom:25,sacLoss:2,sacMin:10,betroth:16,wed:18,matchShow:14,matchMax:21,reign:16},seat:{7:1,6:1,5:2,4:4,3:6}});
/* ONE CORE r2 (review/one-core-land, 16/11): rule numbers of the modules that landed after review/one-core: story roads (jroute),
   origin arcs (jorigins), family house (jhouse), Tu duc lessons (jtds, jtd), small modules. One table per module; texts print the same key. */
Object.assign(BAL,{route:{ /* jroute «Lối riêng» (tư tình / trốn cung / rời cung / ẩn dật / nghiệm thân): every rule number of that module */
 ducFree:50 /* Đức above this lowers the odds of being seen / caught (rtDuc: (Đức-ducFree)/4) */,
 wearySung:25 /* Sủng below this (from month 6) = "ân sủng nhạt dần", a reason that opens Lối riêng */,
 tySuc:45 /* Sức below this lets her summon the physician lover to her palace */,
 guiltDuc:60 /* Đức at/above this: conscience pricks; eyeing a man then costs eyeGuilt */,
 eyeGuilt:{duc:-2} /* cost: start an affair while Đức is high */,
 token:{bac:-10} /* cost: send the man a keepsake */,
 tokenLost:40 /* roll: a lost keepsake is picked up by a rival who holds evidence */,
 meet:{suc:-8} /* cost: a secret meeting */,
 meetG:{suc:5} /* gain: a secret meeting that goes well */,
 night:{suc:-10,duc:-3} /* cost: a secret night */,
 nightG:{suc:12} /* gain: a secret night that goes well */,
 order:{bac:-30} /* cost: summon the painter / musician for a week */,
 cutW:{duc:2} /* gain: break off the affair */,
 bmRoll:55 /* roll: a witness (not greedy) chooses blackmail over reporting */,
 accused:{sung:-10,danh:-6} /* she is reported for an affair without proof: the Emperor's rebuke */,
 watch:3 /* months Cung Chính ti watches her after a bribed guard reports */,
 maidBlab:25 /* roll: the frightened maid lets the escape plan slip */,
 home:{bac:-40} /* cost: secret letter home (family ready) */,
 scout:{suc:-12} /* cost: scout the Thần Vũ gate */,
 pass:{bac:-80} /* cost: forged exit token */,
 cloth:{bac:-10} /* cost: palace-maid clothes */,
 escape:{suc:-15} /* cost: the escape night itself */,
 overdose:30 /* roll: caught after the death-feigning drug = it was an overdose (she dies) */,
 kidAge:15 /* a child younger than this bars xuất gia / phế làm thứ dân */,
 tuDuc:50 /* Đức needed to petition to become a nun */,
 tuFail:{sung:-8} /* nun petition refused */,
 plead:{bac:-30} /* cost: ask the Empress Dowager to speak for her */,
 pleadFail:{th:-6} /* the Empress Dowager is displeased */,
 honFail:{sung:-15} /* petition to be given to a prince refused */,
 queSung:20 /* Sủng must be below this to ask to go home */,
 queFail:{sung:-5} /* go-home petition refused */,
 queCd:6 /* months to wait after a refused go-home petition */,
 pheFail:{danh:-5} /* petition to be made a commoner refused */,
 pheCd:3 /* months to wait after a refused commoner petition */,
 adCost:{sung:-10} /* cost: withdraw her name tablet (quiet life) */,
 adMonth:{duc:1} /* quiet life: Đức gain each month */,
 anDuc:60 /* quiet life: Đức needed (with 3 years, no harm) for «Một đời an nhiên» */,
 kinh:{suc:-4} /* cost: copy sutras */,
 kinhW:{duc:2} /* gain: copy sutras */,
 che:{bac:-15} /* cost: shelter the weakest consort */,
 cheW:{duc:2} /* gain: shelter the weakest consort */,
 cheRel:12 /* regard gained from the sheltered consort */,
 bmWork:{danh:-4} /* blackmail: work for her instead of paying */,
 bmWorkSung:6 /* blackmail: the blackmailer's Sủng gain when she works for her */,
 kidTy:{bac:-60} /* the child's face: pay a physician to vouch */,
 kidTyFail:{sung:-10} /* the physician stammers */,
 kidTyAsk:50 /* roll: after the physician fails, the Emperor orders the blood test */,
 kidBlameFail:{sung:-15} /* "he takes after my mother's side" not believed */,
 kidBlameAsk:60 /* roll: after that, the Emperor orders the blood test */,
 npcReport:{danh:5,th:5} /* report a fleeing consort to Cung Chính ti */,
 npcHelp:{bac:-30} /* cost: help a fleeing consort */,
 npcHelpRel:30 /* regard gained from the consort she helps flee */,
 npcThreat:{bac:60} /* blackmail a fleeing consort */,
 escDeath:50 /* roll: a consort caught fleeing is put to death (else cold palace) */,
 npcTry:40 /* roll each month: a consort with a 3+ month escape plan makes her attempt */,
 oil:35 /* roll: a scheming accuser (Hiểm/Tâm or Tâm cơ 60+) puts oil in the bowl; her own estimate uses the same chance */,
 cheat:15 /* roll: the bribed physician is found out at the blood test */,
 ngWin:{sung:8,danh:5} /* the blood mixes: she is cleared */,
 ngDeath:50 /* roll: blood test lost (her or an NPC mother) = death (else cold palace) */,
 npcAlum:25 /* roll: an NPC mother (Tâm cơ under 55) puts alum in the bowl */,
 npcOil:40 /* roll: a hostile framer puts oil in an NPC mother's bowl */,
 demandWin:{danh:5,th:5} /* she demands a rival's blood test and the blood does not mix */,
 demandFail:{sung:-10,danh:-8} /* she demands a rival's blood test and the blood mixes (false accusation) */,
 frame:{bac:-50,duc:-10} /* cost: have oil dropped in the rival's bowl */,
 alum:{bac:-20,duc:-4} /* cost: slip alum into her own bowl */,
 spy:{suc:-5} /* cost: spy on the accuser's bowl */,
 frameOil:70 /* roll: a rival framing her innocent child uses oil */
}});
Object.assign(BAL,{orig:{ /* jorigins.js: Bac Dich (bd) origin numbers */
 /* Bac Dich princess START values live in BAL.start.bd (jbal2, balance-core: one start table for every origin) */
 /* QUEST67.bd chapter-end rewards [both nations / forgiven hostage / still a hostage] */ quest:[{danh:10,th:8},{th:4},{tamco:3}],
 /* arc bd_hoa (ten-year treaty): per option <node><a|b|c> c=cost w=win l=loss; win/win2/mid/lose = ending fx */ hoa:{s1a:{c:{bac:-20},w:{danh:3,sung:2}},s1b:{w:{sung:3},l:{danh:-3}},s2a:{c:{bac:-10},w:{duc:2}},s2b:{w:{th:2}},c1a:{c:{suc:-3},w:{danh:5,sung:3},l:{danh:-4}},c1b:{c:{bac:-30},w:{sung:4},l:{danh:-3}},c2a:{c:{bac:-50},w:{duc:4},l:{sung:-6}},c2b:{c:{bac:-20},w:{duc:3}},t1a:{c:{suc:-4},l:{danh:-3}},t1b:{c:{bac:-20},w:{sung:2}},x1a:{c:{suc:-5}},x1b:{c:{suc:-3}},x1c:{c:{bac:-60},w:{danh:2}},win:{danh:12,sung:6},win2:{sung:10,th:4},mid:{danh:3},lose:{sung:-8,danh:-6}},
 /* arc bd_ngua (northern warhorses): same layout as hoa */ ngua:{s1a:{c:{bac:-20},w:{sung:5,danh:2}},s1b:{c:{bac:-40},w:{danh:3},l:{danh:-3}},s2a:{c:{suc:-4},w:{sung:4,danh:3},l:{danh:-3}},s2b:{w:{duc:2}},c1a:{c:{suc:-6},w:{sung:6,danh:4},l:{danh:-5,sung:-2}},c1b:{w:{duc:2,th:2}},c2a:{w:{danh:4,sung:3},l:{danh:-3}},c2b:{c:{bac:-20},w:{mat:1}},t1a:{c:{bac:-60},l:{sung:-2}},t1b:{c:{bac:-30},w:{danh:3}},x1a:{c:{suc:-6}},x1b:{c:{suc:-4}},x1c:{w:{duc:2}},win:{sung:10,danh:8},win2:{danh:10,sung:4},mid:{danh:3},lose:{danh:-6,sung:-6}},
 /* arc bd_tuc (steppe customs): same layout as hoa */ tuc:{s1a:{c:{danh:-2},w:{th:6}},s1b:{w:{th:4,danh:3},l:{th:-6}},s2a:{c:{bac:-10},w:{th:6},l:{th:-4}},s2b:{w:{duc:2}},c1a:{c:{suc:-3},w:{th:12},l:{th:-8}},c1b:{w:{tamco:2}},c2a:{c:{bac:-30},w:{danh:5},l:{th:-6}},c2b:{c:{suc:-2},w:{duc:3}},t1a:{l:{th:-4}},t1b:{c:{suc:-2},w:{th:6}},x1a:{c:{suc:-5}},x1b:{c:{suc:-4}},x1c:{c:{bac:-60},w:{th:3}},win:{th:22,danh:6},win2:{th:16,duc:3},mid:{th:4},lose:{th:-15,danh:-6}},
 /* arc bd_hoang (Khan succession): same layout as hoa */ hoang:{s1a:{c:{bac:-10},w:{duc:3,sung:2}},s1b:{w:{mat:1},l:{duc:-1}},s2a:{w:{tamco:2}},s2b:{w:{sung:4,danh:3},l:{danh:-3}},c1a:{w:{danh:5},l:{danh:-3}},c1b:{c:{duc:-3},w:{bac:80}},c2a:{w:{sung:5,danh:3},l:{sung:-2}},c2b:{c:{suc:-3},w:{mat:1}},t1a:{c:{suc:-3},l:{sung:-3}},t1b:{w:{tamco:2}},x1a:{c:{suc:-5}},x1b:{c:{suc:-4}},x1c:{w:{duc:2}},win:{danh:12,sung:6},win2:{bac:120,danh:6},mid:{danh:3},lose:{danh:-6,sung:-5}}
}});
/* ONE CORE (OD:L1267): her household on the room stage (jhouse.js), Tứ đức works (jtds.js), Tứ đức lessons (jtd.js). Same values as before. */
Object.assign(BAL,{
 house:{ /* jhouse.js: acts on a household servant's stage card */
  k:1,              /* khắc each stage act takes (Thưởng/Phạt/Tha/Che chở/Tra khảo/Xem người/Tiến cử/Đổi người/Giao việc phòng bị) */
  thuongBac:10,     /* Thưởng: bạc paid, and bạc needed */
  phatDuc:3,        /* Phạt vô cớ: Đức -N (card text) */
  cheDanh:2,        /* Che chở (servant accused): Danh -N */
  lookBac:15,       /* Xem người: bạc paid, and bạc needed */
  upBac:30,         /* Tiến cử: bạc paid, and bạc needed */
  upDanh:2,         /* Tiến cử: Danh -N */
  swapBac:20,       /* Đổi người: bạc paid, and bạc needed */
  swapDanh:1,       /* Đổi người: Danh -N */
  swapTwiceDanh:3   /* Đổi người: firing 2 servants within half a year, Danh -N (card risk text) */
 },
 tds:{ /* jtds.js: Tứ đức works */
  open:[0,2,4,5],   /* Tứ đức level that opens each lối (lối 1 known from the start) */
  npcLv:[0,1,1,2,2,3], /* lối an NPC knows, by her art level */
  npcWk:50,         /* % an NPC's Tứ đức lesson ends with a work */
  npcWkCap:4,       /* most works an NPC holds */
  phucDuc:1,        /* Vật cầu phúc (Hạnh) work: Đức +N when finished */
  pracK:2,          /* mastered course "Tự học, làm đồ": khắc */
  pracSuc:10,       /* mastered course practice: Sức -N */
  pracMin:15        /* mastered course practice: Sức needed */
 },
 td:{ /* jtd.js (+ jtds.js cards): a Tứ đức lesson */
  k:2,              /* khắc per lesson (Tự học / Học với thầy) */
  selfSuc:15,       /* Tự học: Sức -N */
  selfMin:25,       /* Tự học: Sức needed */
  mSuc:10,          /* Học với thầy (ma ma or a consort): Sức -N */
  mMin:10,          /* Học với thầy: Sức needed (jtds lesson check) */
  exNeed:2          /* Hạnh minigame first-time example: "Người ghi cần N phần" */
 }
});
/* one-core small modules (j95, j95b, jkitpage, jsgame, jslap, jdiff, j92, jsteal, jmort, jly, jcmaid, jaudit, j90, j72). Module-owned tables that
   already exist in their own module got the new keys there instead (a jbal key would be overwritten when the module re-assigns its table):
   BAL.eit.cool / kcSac (jeitem), BAL.lux.plainP / plainDuc (jlux), BAL.nightEnd.after.bearDanh / replySuc (jne), BAL.sp.k (jpromsv). */
Object.assign(BAL,{
 actK:2,          /* khắc a scheme act on a person takes (j8 doAct / j6 act cards; jsgame Tự ra tay and place acts, jslap Giáng tay read it) */
 servK:2,         /* khắc a servant act takes (j10 Mua chuộc / Dọa; jsgame Mặc cả reads it) */
 m95:{dtdSung:50,       /* Sủng below which the Emperor is not shown / met in Dưỡng tâm điện (j2's door uses the same 50) */
      k:1,              /* khắc to accuse a consort (Hoàng hậu / Hoàng thượng / luật cung) or to keep silent for a favour */
      accWin:{danh:4}}, /* an accusation that holds: her Danh (a failed one: BAL.tw.g.accFail) */
 m95b:{k:1,             /* khắc to clear a rumour face to face, or to trace who spread it */
      trace:{bac:-10}}, /* silver to have the rumour traced */
 kitpage:{demo:{age:19,k:1,grey:{need:40,have:3,k:2,suc:10},/* §84 greyed-option sample (jgrey) */mapK:2,/* §85 Dư đồ sample khắc (jmapc) */tomb:{suc:10,duc:3},gift:{bac:20,hh:4,danh:2,th:1},study:{k:2,suc:15,bac:15},/* jksize sheet study cards */ask:{danh:5,sung:10,an:2},/* jkitpage night-ask sample */ev:{need:1,have:0}/* jgrey §84 need[] sample */},/* kit sample page demo option texts (jopic §6.2b) and slot age (j74) */
      wk:2,         /* kit sample page: the demo "· 2 tuần trước" age of a mood cause */
      listen:{duc:1},  /* kit sample page: the demo option "Nghe hết rồi mới định" gain */
      clock:{left:22000,len:30000}},  /* kit sample page: the timed-choice demo chip (§69 + §32.5c): 22 s left of 30 s */
 diff:{bac:{de:1.5,vua:1,kho:.7}},   /* starting bạc × by difficulty (Dễ / Vừa / Khó) */
 m92:{srvY:{chuongsu:{sac:1},nuquan:{sac:1},mama:{sac:2}}},  /* Sắc of the servant-rank clothes: chưởng sự cô cô, nữ quan, ma ma */
 stealx:{hearMat:2},    /* Tai mắt she needs to hear that a consort stole another consort's night (jsteal) */
 mortx:{youngAge:6},    /* a child younger than this dies of pox / fever / plague in the death line, older of "lâm bệnh" (jmort) */
 ly:{npcAge:{tgk:36,ttp:36}},        /* fixed ages of the Tân Giả khố steward and the Thượng thư phòng tutor (jly NPCFIX) */
 cmaidx:{age:16,ageR:7},             /* close-maid candidates offered to pick: age = age + R(ageR) */
 audit:{loan:30},       /* bạc a friendly consort lends on "Nhờ giúp đỡ" (jaudit; j9's base option types the same 30) */
 m90:{kidAge:14},       /* an unknown person younger than this shows the child silhouette (j90) */
 m72:{bdOk:{danh:3}}    /* quest fam_bd (Bắc Địch father: open a horse market): Danh on success */
});
try{Object.assign(SEATCAP,BAL.seat)}catch(e){}
/* what the Hoàng hậu seat asks of p (the same numbers the checks use) */
function hhNeed(p){p=p||S;const sn=sonsOf(p).length>0,hieu=typeof has==="function"&&has("hieuthao");const heir=!!(S.heir&&S.heir.k&&S.heir.k.alive&&S.heir.v===(p===S?null:p));
 return{sons:sn,th:sn?BAL.hhTh:(hieu?BAL.hhThNoSonHieu:BAL.hhThNoSon),duc:heir?BAL.hhDucHeir:BAL.hhDuc,heir}}
/* an empty Hoàng hậu seat: the Thái hậu may bring in a girl of a great house instead of holding a contest (same for every candidate) */
(function(){const c0=contestOpen;contestOpen=function(r){if(r===7&&!ct()&&!queenP()&&S.outQv!==S.vacSince&&consorts().some(p=>candOK(p,7))&&(S.outQv=S.vacSince,true)&&roomFor("consort")&&roll(BAL.outQ)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);S.vacSince=null;
  const t=`<b>Thánh chỉ: Thái hậu chọn ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> Ghế trống không mở tranh. `;log(t);return t}return c0.apply(this,arguments)}})();
/* fewer births per life: conception (after the ×0.7) scaled; a woman who has borne before is a little safer in labour (everyone alike) */
(function(){const c0=conceiveCh;conceiveCh=function(p){return Math.round(c0.apply(this,arguments)*BAL.conc)}})();
function trystCh(p){return cl(conceiveCh(p),BAL.trystC[0],BAL.trystC[1])}
/* palace-start: NPC conception slowed in the first game years of a NEW game (S.ps), BAL.ps.npcConc; the player is never scaled here */
(function(){const c0=conceiveCh;conceiveCh=function(p){p=p||S;const r=c0.apply(this,[p].concat([].slice.call(arguments,1)));try{if(p===S||!S||!S.ps)return r;const y=Math.floor((S.turn||0)/12),m=BAL.ps.npcConc[y];return m==null?r:Math.round(r*m*10)/10}catch(e){return r}}})();
(function(){const b0=birthRisk;birthRisk=function(p){const r=b0.apply(this,arguments);const n=p===S?(S.kids||[]).length:(p.kids||[]).length;if(n>0&&p===S&&S.birthWhy)S.birthWhy=S.birthWhy.concat([]);return cl(r-(n>0?BAL.later:0)+BAL.birthAdd,1.5,60)}})();
/* the Hoàng hậu seat asks more: the Thái hậu's favour 55+ to stand as a candidate (same for every candidate) */
/* (since rules-one-source: promoReqP (j8) and candOK (j34) read BAL.hhTh / hhNeed() directly; no second check here) */
/* every hidden meeting widens the circle that might know: exposure risk grows with the number of trysts (same rule for everyone) */
(function(){const l0=lộRisk;lộRisk=function(k){const n=(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0);return cl(l0.apply(this,arguments)+Math.min(30,n*4),6,92)}})();
/* NAMED PALACE STAFF (owner 16/11, review/elder-staff, jstaff.js): 5 named servants, each with 3–4 duties. 3 women here, real servants in a
   master's household (staff entries: role maid, rank by SRK, capped by srkMax / capOf); the 2 eunuchs are the existing S.court.tq
   (Tổng quản: truyền chỉ, ngự tiền, gọi thị tẩm) and S.court.ksp (Kính sự phòng: sổ thị tẩm, sổ nguyệt tín, mua sắm Nội vụ phủ),
   both of the Emperor's household. Everyone else stays nameless. Change the numbers / names here.
   post: id · title · palace · master ("th" Thái hậu; "hh" Hoàng hậu, kept by Thái hậu while the seat is empty) · rk (SRK maid rank:
   4 ma ma, 3 cô cô) · age range at the start · names (the first holds the post at the start; successors take the next) · call = how
   the palace addresses her · tr (STR temperament key) · duties (shown on her card) */
BAL.staff={retire:[63,68],gift:20,giftAf:10,talk:2,succAge:[46,54],
 /* FRAME NARRATOR (owner 16/11 19:23Z s22, kit-size #4): a kit frame without its own person is told by the named palace official whose
    office covers that topic. ONE map (kind of the frame → post id gt / tn / kn, or the Emperor's eunuchs tq / ksp; "maid" = her thân tín
    maid, "me" = the player, where no office fits). Read by jksize kszWho3. */
 narrator:{news:"kn",notice:"kn",week:"kn",choice:"kn",rule:"tn",info:"tn",evidence:"tn",night:"ksp",reward:"tq",
  intel:"maid",threat:"maid",person:"maid",end:"me",result:"me"},
 posts:[
  {id:"gt",title:"Giáo tập ma ma",palace:"Trữ Tú cung",master:"th",tr:"trung",rk:4,age:[50,55],
   names:[["Tống Quế Chi","Tống ma ma"],["Lạc Ngọc Dung","Lạc ma ma"],["Ôn Tú Hà","Ôn ma ma"]],
   duties:["dạy tú nữ mới vào cung","giữ lễ nghi, cung quy","coi việc tuyển tú","dặn dò người mới"]},
  {id:"tn",title:"Chưởng sự cô cô",palace:"Đức Thọ cung",master:"th",tr:"lanh",rk:3,age:[44,49],
   names:[["Hà Tú Dung","Hà cô cô"],["Mạnh Bích Liên","Mạnh cô cô"],["Kiều Thanh Đào","Kiều cô cô"]],
   duties:["truyền ý chỉ của Thái hậu","giữ cung quy","thi hành hình phạt","coi Tân Giả khố"]},
  {id:"kn",title:"Quản sự ma ma",palace:"Càn Ninh cung",master:"hh",tr:"chuyen",rk:4,age:[54,60],
   names:[["Diệp Thanh Hòa","Diệp ma ma"],["Phùng Thục Trinh","Phùng ma ma"],["Lam Ngọc Hoàn","Lam ma ma"]],
   duties:["chia cung nữ về các cung","phát lệ bạc","coi Thượng cung cục","bẩm sổ tháng của lục cung"]}]};
/* ONE CORE (owner OD:L1267) for the 14-chapter frame (jst14.js, review/story14-p1-r2): every number the frame uses or prints lives here; texts print these.
   max = chapters in one life; parts = [first, last] chapter of Phần đầu / giữa / cuối.
   lim = months before a tutorial chapter closes by itself with NO reward (nhap: chương 1 «Nhập cung, đứng vững»; nhapCnv: chương 1 of the
   cung nữ được sủng hạnh road; sung: «Lần đầu được sủng»; tap: «Học quy củ trong cung»; «Từ kẻ hầu thành tiểu chủ» has no limit: the later
   chapters are a consort's and open only when she is raised). The months count
   from the day she is in the palace (a home road «Ở nhà chờ tuyển tú» starts them at entry).
   goal: sung = Sủng for «Lần đầu được sủng»; rel = thiện cảm of one palace person for «kết thân»; art = tài nghệ level; tin = Chủ tin and nt =
   Hoàng thượng để ý for the servant tutorial steps (cnv, while she still serves).
   danh / rw = Danh and reward67 tier (0..2) when a tutorial chapter is DONE (nothing when it closes by time).
   hate: a hostile arc role (F14ROLE table in jst14) costs thiện cảm max(min, base + the better of the two thiện cảm) both ways (j9 relAdd: oán up);
   such a role takes, when it can, someone whose thiện cảm both ways is under friend.
   ctx (OD:L1253, this life's context for a story option, sum clamped to ±cap): the cast person's thiện cảm / aff (at most ±affCap), her oán / oan
   (at most oanCap), her trait (tr), the player's Tâm cơ (tam: [neutral, per]) and Đức (duc: [neutral, per]), and how many consorts with oán ≥ foeOan
   watch her (at most foeCap). odds = [min, max] odds of a chancy story option after the context.
   shift: an ending no roll decides moves one step worse with base − c × slope and one step better with base + c × slope (each between min and max,
   c = context + (Lợi thế − 1) × sc); base is the same both ways, so a neutral life leans neither way.
   q = tutorial quests of chapters 1–3 (jtq14.js, review/tut-quests): bac = Bạc paid the moment one quest is done (c consort, s cung nữ who still
   serves); need = how many times a quest's deed must be done (default 1); narr = the BAL.staff post whose holder tells the tutorial (OD:L1432:
   gt Giáo tập ma ma for a new consort, kn Quản sự ma ma for a new palace maid). */
Object.assign(BAL,{st14:{max:14,parts:[[1,3],[4,11],[12,14]],lim:{nhap:6,nhapCnv:8,sung:10,tap:8},
 goal:{sung:25,rel:30,art:2,tin:60,nt:25},danh:{nhap:3,sung:2,tap:2,len:4},rw:{nhap:0,sung:1,tap:1,len:2},
 hate:{min:25,base:15,friend:20},tr:{"Xảo quyệt":-5,"Tham vọng":-3,"Kiêu ngạo":-2,"Khiêm nhường":2,"Ân cần":4,"Trung hậu":3},
 ctx:{aff:6,affCap:6,oan:10,oanCap:5,tam:[40,15],duc:[50,20],foeOan:30,foeCap:4,cap:15},odds:[5,95],
 shift:{base:15,slope:2,sc:2,min:5,max:40},
 q:{bac:{c:15,s:3},need:{ban:1},narr:{c:"gt",s:"kn"}}},
/* cung nữ được sủng hạnh (j42 cnvName): from Hoàng thượng để ý ≥ at, each time he notices her the odds he asks her name and raises her
   Đáp ứng = nt / div − sub (j42 roll, the Thân phận row, the j67 / jst14 «Từ kẻ hầu thành tiểu chủ» step all read this) */
 ntRise:{at:45,div:2,sub:10}});
function ntRiseOdds(){return Math.max(0,(S.nt||0)/BAL.ntRise.div-BAL.ntRise.sub)}
