/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={entryToastMs:5000,/* owner 18/11 ~03:4xZ: ms the place-entry line stays on screen; stage-here r4 (owner OD 18/11 ~22:10Z "5 giây hay là 10 giây"): THE ms every notice chip (kitNotice, KIT §42.2) stays up */noticeMax:20,/* stage-here r4: notices kept in the top-bar «!» box list (oldest dropped) */allyRel:35,/* the "người quen cũ" ally of a new life: her Thiện cảm toward the player at the start (j2 allyBond; co-op part B rebase) */ghenNew:15,/* a new face: an NPC's Ghen toward her starts at R(ghenNew) (j1 newRival, j1 ghenNew0; co-op part B rebase) */wkFinCap:1,/* Đức from handmade works (kinh, vật cầu phúc): at most this many per month (j83 wkFinLeft) */ oanLv:[5,20,45,75],/* oán word ladder (VANPHONG): <5 Không oán · <20 Chút oán · <45 Oán · <75 Oán sâu · else Oán hận */
 /* night-balance-bundle (D #15/#16 ruling 21/11): the Hoàng hậu gate keeps LIVE values (hhThNoSon 80 / Hiếu 70, outQ 60, RANKS HH Danh 78). balance-2 had lowered them while Danh was scarce; with the §7 Danh re-tune Danh m36 is at LIVE level and HH reach was already above LIVE (knobbot k3/k4 vs LIVE 94cbe0cd). */
 /* outQ = % an empty Hoàng hậu seat goes to an outsider girl (one-core: was 85 here and 60 in jbal2; 60 is the measured v12 value) */outQ:60,hz:3.2,/* home road hazards (OUTSIDE_PLAN §12, GAP OR11; Vừa values; jdiff Dễ/Khó scale them like hz): kcSch = weight (100 = as shipped) of the hostile-kin schemes at home (stepmother, rival sister, assassin, the pestering suitor); kcRumFade = how much the city gossip about her (S.kld) fades each month; kcMatch = % of the monthly push toward a forced match (S.kap; 100 = as shipped; the sensible bot never loses to a forced match, so Vừa keeps it, GAP OR12) */kcSch:100,kcRumFade:2,kcMatch:100,/* kcRareX = the hidden roll (×100) of an outside rare ending once its gate is met (× its own weight and R97CFG.p; was a typed .12 in kcRare; value as shipped: the sensible bot meets no rare gate, so a bigger roll moved nothing, GAP OR12) */kcRareX:12,/* kcSelMax = the best chance (%) the court keeps a girl at Điện tuyển (was KC.selMax 80 in jkc; value as shipped, bot-checked for OUTSIDE_PLAN §12, GAP OR12) */kcSelMax:80,conc:.5,/* conception per night × (D57 owner 16/11: doubled from .25 for everyone; the cycle peak/low is BAL.cyc.fert in jcycle.js) */trystC:[5,60],/* a tryst / affair conception = trystCh(p) = conceiveCh(p) kept within [lo,hi] (her Hẹn gặp riêng j22, Tư thông jroute, an NPC consort's affair month j22) */later:6,hhTh:60,/* diff-remeasure 16/11: 55 → 60 (Vừa HH 45 % → ~32 % with the fixed bot; 65 measured 26 %) */birthAdd:2,
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
    j1 psSeedKids / psOpenText, j51 kvW (j2 start = BAL.allyRel). harem = [rank, queen] of the consorts at the start (young and small: 10, was 12);
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
   seat = seats per rank (7 Hoàng hậu, 6 Hoàng quý phi, 5 Quý phi, 4 Phi, 3 Tần); SEATCAP (j30) is this table. res / harem: see below.
   night = the least a night with the Emperor gives: Sủng +sung, Ân tình +an (the night's score adds more, j8 nightFx). */
Object.assign(BAL,{time:{khac:4,sucMin:5,/* khắc a deed costs, ONE source for the player and every NPC (AG-ALL-2 G8): talk option (j2 talk), talk that is an act, a harm act (j8 doAct) */cost:{talk:1,talkAct:2,harm:2}},lot:{bac:10,k:1},walk:{near:1,far:2,npc:1,pen:1/* jface «đi chậm»: extra khắc per walk while punished (per walker, j9 walkSlow) */},sneak:{danh:8,heavy:15,seen:2,lead:15},srvAge:{ask:25,out:30,mama:45,old:45},
 age:{sacFrom:25,sacLoss:2,sacMin:10,betroth:16,wed:18,matchShow:14,matchMax:21,reign:16},seat:{7:1,6:1,5:1,4:2,3:3}, /* owner 17/11 04:30Z: halved (was {7:1,6:1,5:2,4:4,3:6}) */
 /* RESIDENCE (owner 17/11 04:20Z + 04:32Z): every chủ vị (Tần, Phi, Quý phi; the player too) takes at most side co-residents in each
    of the halls (Đông phối điện, Tây phối điện), one room each; Hoàng hậu and Hoàng quý phi live alone. harem.cap = most consorts alive at once
    (the player counted); a new game still starts with BAL.ps.harem and grows by tuyển tú and maids raised to rank (roomFor('consort')). */
 res:{side:1,halls:["dong","tay"]},harem:{cap:20}});
/* co-residents one chủ vị may take (one core: jpal palFix, j95c cap, jres resSidePart, j27 read this) */
function resCap(){return BAL.res.side*BAL.res.halls.length}
/* ONE CORE r2 (review/one-core-land, 16/11): rule numbers of the modules that landed after review/one-core: story roads (jroute),
   origin arcs (jorigins), family house (jhouse), Tu duc lessons (jtds, jtd), small modules. One table per module; texts print the same key. */
Object.assign(BAL,{route:{
 /* k = the khắc each «Lối riêng» card costs, by card id (rtCard({id,…,k}); review/one-core-dup3, dev/measure/one-core-dup3-rtk-move.js) */
 k:{tt0:1,tt1:1,tt2:2,tt3:3,ttord:1,ttcut:1,tc0:1,step_guard:1,step_maid:1,step_home:1,step_route:2,step_pass:1,step_cloth:1,step_drug:1,tcgo_:4,tcstop:1,hl_tu:2,hl_plead:1,hl_hon:2,hl_que:2,hl_phe:2,ad0:1,ad_kinh:2,ad_che:1,ad_off:1,mk_bribe:1,mk_swap:1,mk_alum:1,mk_spy:1,ngn_:1}, /* jroute «Lối riêng» (tư tình / trốn cung / rời cung / ẩn dật / nghiệm thân): every rule number of that module */
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
 frameOil:70 /* roll: a rival framing her innocent child uses oil */,
 heatW:[15,35,60,80] /* Lời ra tiếng vào: the cut points of its words (rtHeatW: Yên ắng < [0] ≤ Có kẻ xì xào < [1] … ≥ [3] Sắp vỡ lở) (review/one-core-arcs) */,
 seen:{aff:45,rel:5} /* a rival who sees her with the man but likes her (thiện cảm ≥ aff) keeps quiet; thiện cảm +rel */,
 oan:{report:40,threat:25,ngWin:30,demand:40,frame:50} /* oán the rival takes: reported to Cung Chính ti / threatened / lost the blood test / her false
   accusation of the rival's child / caught framing the rival */,
 threatEv:2 /* evidence on the rival gained by threatening her (printed in the choice) */
}});
Object.assign(BAL,{orig:{ /* jorigins.js: Bac Dich (bd) origin numbers */
 /* j69 origin roulette weights (approved 11/14 table, OD:L19). Hòa thân (nc) is ONE origin: its weight is the whole hòa thân slot, its country
    branches split it by br.nc (owner OD:L1213–L1219; set from the bd bot measure, review/origin-bd-branch report). ow2 = the frozen table of
    lives pre-rolled while bd was a separate card (ow=2 marks): they keep the origin they were shown. */ ow:{nc:6,thd:9,cn:13,dtq:17,muoi:17,ch:13,td:9,tt:8,cnv:8},
 ow2:{nc:6,bd:7,thd:9,cn:13,dtq:17,muoi:17,ch:13,td:9,tt:8,cnv:8},
 /* country-branch share inside an origin: {origin:{branch:weight}} (hard branch = rare, OD:L1216) */ br:{nc:{nc:1,bd:1}},
 /* Bac Dich princess origin: start stats o, Thai hau favour th */ bd:{o:{danh:15,suc:90,bac:90},th:-20},
 /* QUEST67.bd chapter-end rewards [both nations / forgiven hostage / still a hostage] */ quest:[{danh:10,th:8},{th:4},{tamco:3}],
 /* arc bd_hoa (ten-year treaty): per option <node><a|b|c> c=cost w=win l=loss; win/win2/mid/lose = ending fx */ hoa:{s1a:{c:{bac:-20},w:{danh:3,sung:2}},s1b:{w:{sung:3},l:{danh:-3}},s2a:{c:{bac:-10},w:{duc:2}},s2b:{w:{th:2}},c1a:{c:{suc:-3},w:{danh:5,sung:3},l:{danh:-4}},c1b:{c:{bac:-30},w:{sung:4},l:{danh:-3}},c2a:{c:{bac:-50},w:{duc:4},l:{sung:-6}},c2b:{c:{bac:-20},w:{duc:3}},t1a:{c:{suc:-4},l:{danh:-3}},t1b:{c:{bac:-20},w:{sung:2}},x1a:{c:{suc:-5}},x1b:{c:{suc:-3}},x1c:{c:{bac:-60},w:{danh:2}},win:{danh:12,sung:6},win2:{sung:10,th:4},mid:{danh:3},lose:{sung:-8,danh:-6}},
 /* arc bd_ngua (northern warhorses): same layout as hoa */ ngua:{s1a:{c:{bac:-20},w:{sung:5,danh:2}},s1b:{c:{bac:-40},w:{danh:3},l:{danh:-3}},s2a:{c:{suc:-4},w:{sung:4,danh:3},l:{danh:-3}},s2b:{w:{duc:2}},c1a:{c:{suc:-6},w:{sung:6,danh:4},l:{danh:-5,sung:-2}},c1b:{w:{duc:2,th:2}},c2a:{w:{danh:4,sung:3},l:{danh:-3}},c2b:{c:{bac:-20},w:{mat:1}},t1a:{c:{bac:-60},l:{sung:-2}},t1b:{c:{bac:-30},w:{danh:3}},x1a:{c:{suc:-6}},x1b:{c:{suc:-4}},x1c:{w:{duc:2}},win:{sung:10,danh:8},win2:{danh:10,sung:4},mid:{danh:3},lose:{danh:-6,sung:-6}},
 /* arc bd_tuc (steppe customs): same layout as hoa */ tuc:{s1a:{c:{danh:-2},w:{th:6}},s1b:{w:{th:4,danh:3},l:{th:-6}},s2a:{c:{bac:-10},w:{th:6},l:{th:-4}},s2b:{w:{duc:2}},c1a:{c:{suc:-3},w:{th:12},l:{th:-8}},c1b:{w:{tamco:2}},c2a:{c:{bac:-30},w:{danh:5},l:{th:-6}},c2b:{c:{suc:-2},w:{duc:3}},t1a:{l:{th:-4}},t1b:{c:{suc:-2},w:{th:6}},x1a:{c:{suc:-5}},x1b:{c:{suc:-4}},x1c:{c:{bac:-60},w:{th:3}},win:{th:22,danh:6},win2:{th:16,duc:3},mid:{th:4},lose:{th:-15,danh:-6}},
 /* arc bd_hoang (Khan succession): same layout as hoa */ hoang:{s1a:{c:{bac:-10},w:{duc:3,sung:2}},s1b:{w:{mat:1},l:{duc:-1}},s2a:{w:{tamco:2}},s2b:{w:{sung:4,danh:3},l:{danh:-3}},c1a:{w:{danh:5},l:{danh:-3}},c1b:{c:{duc:-3},w:{bac:80}},c2a:{w:{sung:5,danh:3},l:{sung:-2}},c2b:{c:{suc:-3},w:{mat:1}},t1a:{c:{suc:-3},l:{sung:-3}},t1b:{w:{tamco:2}},x1a:{c:{suc:-5}},x1b:{c:{suc:-4}},x1c:{w:{duc:2}},win:{danh:12,sung:6},win2:{bac:120,danh:6},mid:{danh:3},lose:{danh:-6,sung:-5}}
}});
/* ORIGIN START ARTS (owner OD 20/11 ~02:05Z, verbatim: "mỗi một thân phận là có 4 nhánh chuyện ... thì phải là 4 các cái tài nghệ của mỗi thân phận khác nhau
   đi cho nó đa dạng"; MAIN + OD ~02:15Z: each set fits ITS story road; noble upbringing higher bậc, poor lower, OD ~01:50Z). ONE table: identity = origin ×
   its road (the j67 premise arc id, S.st.f14.road / an NPC's v.nr.r) → {art: bậc}. Keys: ARTS cam ky thi hoa vu y theu nau (S.arts) + tứ đức VIR cong dung
   ngon hanh (S.vir). "" = the origin's own row, used when the road is not known (an old save, an NPC without a road, F14 off) = the old one-art
   ORIGINS art (moved here, law 14). Read by j1 originArts → j2 start (her start arts) and jmgt mgOrgLv (the upbringing shift of an NPC of that identity).
   Totals per origin (every road of one origin the same bậc AND the same training points, law 2): tt nc bd 7 · ch dtq td 6 · muoi cn thd 5 · cnv 4. Reasons per art per road:
   dev/handover/reports/mg-fair-hands.md (handover branch), item (O). */
Object.assign(BAL.orig,{art:{
 tt:{"":{cam:1},tt_co:{ky:2,cam:2,thi:2,dung:1},tt_oan:{thi:2,cam:2,ngon:2,hanh:1},tt_tranh:{cam:2,ky:2,hoa:2,ngon:1},tt_mat:{cam:2,dung:2,ngon:2,hoa:1}},
 dtq:{"":{vu:1},dtq_bien:{vu:2,y:2,ky:1,ngon:1},dtq_vu:{thi:2,hoa:2,vu:1,ky:1},dtq_binh:{ky:2,ngon:2,vu:1,dung:1},dtq_huynh:{vu:2,ky:2,thi:1,hanh:1}},
 muoi:{"":{ngon:1},muoi_tuoc:{ngon:2,dung:1,cam:1,thi:1},muoi_lau:{ngon:2,thi:1,nau:1,ky:1},muoi_doi:{nau:2,hanh:1,ngon:1,y:1},muoi_no:{ky:2,ngon:1,theu:1,dung:1}},
 cn:{"":{y:2},cn_chu:{y:2,cong:1,ngon:1,theu:1},cn_tinh:{y:2,thi:1,theu:1,dung:1},cn_ban:{y:2,cong:1,hanh:1,nau:1},cn_than:{y:2,cam:1,thi:1,ngon:1}},
 nc:{"":{vu:1},nc_gian:{vu:2,ky:2,ngon:2,hoa:1},nc_su:{vu:2,cam:2,ngon:2,nau:1},nc_tuc:{vu:2,nau:2,theu:2,dung:1},nc_vuong:{ky:2,thi:2,vu:2,ngon:1}},
 bd:{"":{vu:1},bd_hoa:{vu:2,ngon:2,dung:2,hanh:1},bd_ngua:{vu:2,y:2,ky:2,nau:1},bd_tuc:{vu:2,nau:2,theu:2,cam:1},bd_hoang:{ky:2,ngon:2,vu:2,dung:1}},
 td:{"":{thi:1},td_an:{thi:2,ngon:2,cam:1,ky:1},td_ke:{ky:2,hoa:2,thi:1,cam:1},td_song:{theu:2,hanh:2,thi:1,y:1},td_tha:{cam:2,hanh:2,thi:1,dung:1}},
 ch:{"":{dung:1},ch_co:{dung:2,ky:2,ngon:1,cam:1},ch_benh:{y:2,hanh:2,nau:1,dung:1},ch_ho:{vu:2,cam:2,dung:1,hoa:1},ch_bi:{thi:2,dung:2,ky:1,ngon:1}},
 thd:{"":{thi:1},thd_tho:{thi:2,hoa:1,cong:1,ngon:1},thd_sach:{thi:2,ky:1,hanh:1,cong:1},thd_tro:{thi:2,ngon:1,ky:1,nau:1},thd_hoc:{thi:2,ngon:1,hoa:1,hanh:1}},
 cnv:{"":{cong:1},cnv_chu:{cong:1,nau:1,y:1,ngon:1},cnv_ban:{theu:1,cong:1,hanh:1,nau:1},cnv_mat:{cong:1,vu:1,dung:1,theu:1},cnv_ma:{cong:1,nau:1,dung:1,hanh:1}}}});
/* SỞ ĐOẢN per identity (owner OD 20/11 ~07:15Z, verbatim: "mình có cái môn sở trường thì mình cũng phải có môn sở đoản ... có nhiều người họ học hoài cái môn
   này họ học không nổi"): the 1–2 arts an identity (origin × road, the same keys as BAL.orig.art above) is WEAK at — never an art of that identity's own row.
   SỞ TRƯỜNG = every art of the identity's BAL.orig.art row (bậc ≥ BAL.orig.id.trAt); every other art = bình thường. "" = the origin's row (road unknown); a road key
   overrides it. List from the C-AG cal-p2 analysis (reports/cal-p2.md §A2, script-checked: no overlap with the road's own arts; dev/test/cal-p2c.js re-checks it).
   Read by jmgid mgIdClass → the identity target of a mini-game result (OD ~07:35Z: sở trường ≈ 9, bình thường ≈ 7.5, sở đoản ≈ 6; BAL.orig.id in jbal2.js). */
Object.assign(BAL.orig,{doan:{
 tt:{"":["nau","vu"]},dtq:{"":["theu","cam"]},muoi:{"":["hoa","vu"]},cn:{"":["ky","vu"]},
 nc:{"":["thi","theu"],nc_vuong:["theu","hanh"],nc_tuc:["thi","cam"]},bd:{"":["thi","theu"],bd_tuc:["thi","hoa"]},
 td:{"":["vu","nau"]},ch:{"":["nau","theu"],ch_benh:["theu","ky"]},thd:{"":["vu","cam"]},cnv:{"":["thi","ky"]}}});
/* ONE CORE (OD:L1267): her household on the room stage (jhouse.js), Tứ đức works (jtds.js), Tứ đức lessons (jtd.js). Same values as before. */
Object.assign(BAL,{
 house:{ /* jhouse.js: acts on a household servant's stage card */
  k:1,              /* khắc each stage act takes (Thưởng/Phạt/Tha/Che chở/Tra khảo/Xem người/Tiến cử/Đổi người/Giao việc phòng bị) */
  thuongBac:10,     /* Thưởng: bạc paid, and bạc needed */
  phatDuc:3,        /* Phạt vô cớ: Đức -N (card text) */
  cheDanh:2,        /* Che chở (servant accused): Danh -N */
  tra:{base:55,tcDiv:4,loyal:25},   /* Tra khảo a planted spy (a chance, owner 17:00Z): odds he names his master = base + her Tâm cơ/tcDiv − loyal when loyal by nature; hỏng: he holds his tongue, stays */
  che:{base:45,danhDiv:4,rank:4,failLoy:8}, /* Che chở before Thận Hình ti (a chance): base + her Danh/danhDiv + rank×rank; hỏng: the Danh is spent, he is grateful (lòng +failLoy) */
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
   post: id · title · palace · master ("th" Thái hậu; "hh" Hoàng hậu, kept by Thái hậu while the seat is empty) · rk (SRK maid rank,
   six rungs since maid-ladder-6: 5 ma ma post = Nữ quan rung, 4 cô cô = Chưởng sự cô cô) · age range at the start · names (the first holds the post at the start; successors take the next) · call = how
   the palace addresses her · tr (STR temperament key) · duties (shown on her card) */
BAL.staff={retire:[63,68],gift:20,giftAf:10,talk:2,succAge:[46,54],
 /* say = the cuts of the office holder's greeting pool (jstaff): tn = Thái hậu thiện cảm [hi from, mid from]; kn = Hoàng hậu thiện cảm [hi from, mid above] (review/one-core-dup3-land) */
 say:{tn:[30,0],kn:[10,-10]},
 /* the Giáo tập ma ma stands in her room while S.turn <= gtDays (new tú nữ only; jstaff gtAtHome) */
 gtDays:4,
 posts:[
  {id:"gt",title:"Giáo tập ma ma",palace:"Nội vụ phủ",master:"th",tr:"trung",rk:5,age:[50,55],
   names:[["Tống Quế Chi","Tống ma ma"],["Lạc Uyển Hề","Lạc ma ma"],["Ôn Tú Hà","Ôn ma ma"]],
   duties:["dạy tú nữ mới vào cung","giữ lễ nghi, cung quy","coi việc tuyển tú","dặn dò người mới"]},
  {id:"tn",title:"Chưởng sự cô cô",palace:"Đức Thọ cung",master:"th",tr:"lanh",rk:4,age:[44,49],
   names:[["Hà Tú Dung","Hà cô cô"],["Mạnh Bích Liên","Mạnh cô cô"],["Kiều Thanh Đào","Kiều cô cô"]],
   duties:["truyền ý chỉ của Thái hậu","giữ cung quy","thi hành hình phạt","coi Tân Giả khố"]},
  {id:"kn",title:"Quản sự ma ma",palace:"Càn Ninh cung",master:"hh",tr:"chuyen",rk:5,age:[54,60],
   names:[["Diệp Thanh Hòa","Diệp ma ma"],["Phùng Thục Trinh","Phùng ma ma"],["Lam Ngọc Hoàn","Lam ma ma"]],
   duties:["chia cung nữ về các cung","phát lệ bạc","coi Thượng cung cục","bẩm sổ tháng của lục cung"]}]};
/* ONE CORE (owner OD:L1267) for the 14-chapter frame (jst14.js, review/story14-p1-r2): every number the frame uses or prints lives here; texts print these.
   max = chapters in one life; parts = [first, last] chapter of Phần đầu / giữa / cuối.
   lim = months before a tutorial chapter closes by itself with NO reward (nhap: chương 1 «Nhập cung, đứng vững»; nhapCnv: chương 1 of the
   cung nữ được sủng hạnh road; nhapHi: chương 1 of an origin that enters at rank hiR or above (Nam Chiếu enters as Tần: one more step
   up from a palace head is slower; D8 story bot 17/11: nc chương 1 done 4/29 in 6 months); sung: «Lần đầu được sủng»; tap: «Học quy củ trong cung»; «Từ kẻ hầu thành tiểu chủ» has no limit: the later
   chapters are a consort's and open only when she is raised). The months count
   from the day she is in the palace (a home road «Ở nhà chờ tuyển tú» starts them at entry).
   goal: sung = Sủng for «Lần đầu được sủng»; rel = thiện cảm of one palace person for «kết thân»; art = tài nghệ level; tin = Chủ tin and nt =
   Hoàng thượng để ý for the servant tutorial steps (cnv, while she still serves). Tuned 17/11 (D8 story bot, aim: a player who follows
   the goal makes it about 6–7 times in 10): rel 30 → 20 (chương 3 done 36 % → 57 %; 15 measured no better: the misses are lives where every consort dislikes her), nt 25 → 14
   (cnv chương 2 done 1/28 → about half; 12 made it near-certain). tin 60 kept (85 measured: still done in 1–2 months).
   danh / rw = Danh and reward67 tier (0..2) when a tutorial chapter is DONE (nothing when it closes by time).
   hate: a hostile arc role (F14ROLE table in jst14) costs thiện cảm max(min, base + the better of the two thiện cảm) both ways (j9 relAdd: oán up);
   such a role takes, when it can, someone whose thiện cảm both ways is under friend.
   ctx (OD:L1253, this life's context for a story option, sum clamped to ±cap): the cast person's thiện cảm / aff (at most ±affCap), her oán / oan
   (at most oanCap), her trait (tr), the player's Tâm cơ (tam: [neutral, per]) and Đức (duc: [neutral, per]), and how many consorts with oán ≥ foeOan
   watch her (at most foeCap). (its odds clamp to the one cap BAL.odds.lo / hi, ODDS CAP).
   shift: an ending no roll decides moves one step worse with base − c × slope and one step better with base + c × slope (each between min and max,
   c = context + (Lợi thế − 1) × sc); base is the same both ways, so a neutral life leans neither way.
   q = tutorial quests of chapters 1–3 (jtq14.js, review/tut-quests): bac = Bạc paid the moment one quest is done (c consort, s cung nữ who still
   serves); need = how many times a quest's deed must be done (default 1); narr = the BAL.staff post whose holder tells the tutorial (OD:L1432:
   gt Giáo tập ma ma for a new consort, kn Quản sự ma ma for a new palace maid). */
Object.assign(BAL,{st14:{max:14,parts:[[1,3],[4,11],[12,14]],lim:{nhap:6,nhapCnv:8,nhapHi:9,hiR:3,sung:10,tap:8},
 goal:{sung:25,rel:20,art:2,tin:60,nt:14},danh:{nhap:3,sung:2,tap:2,len:4},rw:{nhap:0,sung:1,tap:1,len:2},
 hate:{min:25,base:15,friend:20},tr:{"Xảo quyệt":-5,"Tham vọng":-3,"Kiêu ngạo":-2,"Khiêm nhường":2,"Ân cần":4,"Trung hậu":3},
 ctx:{aff:6,affCap:6,oan:10,oanCap:5,tam:[40,15],duc:[50,20],foeOan:30,foeCap:4,cap:15},
 shift:{base:15,slope:2,sc:2,min:5,max:40},
 q:{bac:{c:15,s:3},need:{ban:1},narr:{c:"gt",s:"kn"}}},
/* cung nữ được sủng hạnh (j42 cnvName): from Hoàng thượng để ý ≥ at, each time he notices her the odds he asks her name and raises her
   Đáp ứng = nt / div − sub (j42 roll, the Thân phận row, the j67 / jst14 «Từ kẻ hầu thành tiểu chủ» step all read this) */
 ntRise:{at:45,div:2,sub:10}});
function ntRiseOdds(){return Math.max(0,(S.nt||0)/BAL.ntRise.div-BAL.ntRise.sub)}
/* ONE CORE odds ladder (review/one-core-dup; VANPHONG odds words Liều … Nắm chắc, words in KIT_ODDS j79): an odds value o reaches word
   step i when o ≥ cut[i-1]; lo / hi = the lowest / highest odds a chancy option shows. Read by j1 word(), j79 kitOddsLv, jsgame sgLv /
   SG_LO / SG_HI (before: the cuts were typed in all four). */
/* ODDS CAP (owner 17/11 ~17:35Z "Trần 95%"): lo / hi are ALSO the one cap of every roll in the game (j1 roll / oddsCl): nothing is ever above hi
   nor (for an act's odds) below lo. softFail = what a formerly-sure act spends when it fails at the cap (owner "chỉ hỏng nhẹ" + 17:10Z (1)
   "không thành công thì sao tốn bạc"): its khắc are spent, and of its cost only the keys in spend (the effort: Sức); the bạc and every other
   cost (Danh, Đức…) are NOT taken; nothing is gained, nothing else lost. */
Object.assign(BAL,{confess:{base:70,sungDiv:4,thDiv:5},
 /* BUTTON ACTS that roll at the odds cap (j63 capAt): k = khắc, suc = Sức each one costs. The handler, its hint and its soft-fail gate read
    the SAME key (one core); a soft fail spends of it only BAL.odds.softFail.spend (khắc + Sức), never the bạc. */
 /* the road with a man (j22 manCards, her and an NPC consort alike): Sắc / Tâm cơ divisors of «Liếc mắt» / «Trao khăn tay»; a tryst within seenW tuần may leave proof with a hostile woman whose tai mắt dig it up (npcWhy trystKnow, her and an NPC alike) */manRd:{sacD:5,tcD:5,seenW:3},
 btn:{courtHoi:{k:2},kidTeach:{k:2},kidCare:{k:2},kidGuard:{k:2,mo:2,blk:50},cnv:{k:1},h54Thu:{k:1},wkShow:{k:2},h54Day:{k:2,suc:5},kidHeal:{k:2,suc:10},htAsk:{k:1},loSneak:{k:1}},/* Thú tội tư thông (a chance, the Emperor's mercy): base + Sủng/sungDiv + Thái hậu/thDiv; hỏng: bị ban chết */
 odds:{cut:[31,46,56,66,81,91],lo:5,hi:95,weak:{suc:30,pen:15}/* odA (j9): the doer's Sức below suc → every act's odds −pen; the poison card "Vì sao" prints this same key */,simN:200,softFail:{spend:["suc"]}}});
function oddsLv(o){let i=0;for(const c of BAL.odds.cut)if(o>=c)i++;return i}
/* ONE CORE number formatters for player texts (review/one-core-dup r2, OD:L1267 "text prints the constant"): balSg(n) = the signed amount as the
   texts show it ("+4" / "-4"), balAb(n) = the amount without sign ("4"). A text that shows a BAL.eff / BAL.road / BAL.arc amount prints it with these
   (dev/test/one-core-text.js fails a typed copy). */
function balSg(n){return(n>0?"+":n<0?"-":"")+Math.abs(n)}
/* AG-ALL-2f (one-core text G1): THE ONE evidence-count text — "chứng cứ +1" always prints the BAL amount (default BAL.ag.ev.one); cap = "Chứng cứ" */
function evSg(n,cap){return (cap?"Chứng cứ ":"chứng cứ ")+balSg(n==null?BAL.ag.ev.one:n)}
function balDec(n){/* law4-typed: a BAL decimal as players read it (1.5 → 1,5) */return String(n).replace(".",",")}
function balAb(n){return String(Math.abs(n))}
/* a printed count as a word («một chứng cứ»): balWord(balAb(BAL…)) — the number word of VP.num (j84, loads later; called only when the text is built) */
function balWord(n){try{return window.VP&&VP.num?VP.num(+n):String(n)}catch(e){return String(n)}}
/* balOan(n,"hurt"|"doer"|"mend"): the oán a relAdd amount n makes (relAdd gives the hurt one |n|×hurt, the doer |n|×doer, a kind act takes |n|×mend off), as the texts show it */
function balOan(n,m){return String(Math.round(Math.abs(n)*BAL.relOan[m]))}
/* ONE CORE age bands (owner art rule OD:L567 + owner 19/11 ~00:50Z "nhân viên của mình bất kỳ ai cũng có 65 tuổi": 18–25 / 26–35 / 36–50 /
   51–64 / 65+, for every woman of the pool at every rank/role; review/one-core-dup, art-wiring-1119): band i starts at ageBand[i-1].
   Read by band4 + BAND4N labels (j35), pidBand (j66), kcBand (jkc), the elders' picture (jstaff) (before: 26/36/51 typed in each).
   figxTry = failed reads of img/FIGURES-x.json after which the Thái hậu's face is drawn without it (jfigx r2).
   figVar (art-wiring-1119) = how many colours of the t7/t8 dress a woman may wear (v0 + v1 + v2 painted); 1 = everyone in v0. */
Object.assign(BAL,{ageBand:[26,36,51,65],figVar:3,figxTry:3});
function ageBandIx(a){let i=0;for(const c of BAL.ageBand)if(a>=c)i++;return i}
/* the band labels players see ("18-25" … "65+"), from the same numbers */
function ageBandName(i){const B=BAL.ageBand,lo=i?B[i-1]:18;return i>=B.length?lo+"+":lo+"-"+(B[i]-1)}
if(typeof BAND4N!=="undefined"){BAND4N.length=0;for(let i=0;i<=BAL.ageBand.length;i++)BAND4N.push(ageBandName(i))}
/* ===== ONE CORE duplicate-rule hunt part 2 (review/one-core-dup2): one key per concept that had typed copies in several modules =====
   quyLv  = the "quý" word ladder (thiện cảm) of VANPHONG:69 / owner OD:L247 (Ghét ≤ q0 · Không ưa < q1 · Bình thường ≤ q2 · Có cảm tình
            < q3 · Quý mến < q4 · Thân thiết); quyIx(v) = word index 0…5, quyW (jhc) the word. Before: j21 affW (7 words incl. Thù /
            Lạnh nhạt / Thân, banned by VANPHONG), jhc quyW and jts tsQuy typed their own cuts. Colour: > q2 green, < q1 red.
   loy    = a servant's Lòng (loyalty) cut points used by the rules (trust 70 = "tin cẩn": she shields, warns, never sells her mistress;
            close 60; firm 55; mid 50; warn 45 = may leave / shown red; low 40; bad 35; out 30 = betrays / runs; deep 75, top 80 = the
            rare devoted tiers). Before: ~70 typed copies in 40 modules.
   wit    = an NPC's Tâm cơ (j40 / j43 / j51 / j70 mind): lo 30 = weighs the odds / makes fewer mistakes, mid 35 = no longer foolish,
            hi 60 = plans ahead, top 70 = hard to catch. (The "spot" bonus is 15 in j40/j43 and 12 in j70: kept, listed.)
   ducLv  = Đức tiers: monthly drift of Thái hậu / Hoàng hậu thiện cảm (≥ up +1, < down −1), servants' Lòng drift (staffUp / staffDown),
            the Đức word ducWord (word cuts thất đức < w0 ≤ bạc đức < w1 ≤ thường < w2 ≤ tử tế < w3 ≤ hiền đức).
   sungLv = the Sủng word ladders, one per screen (no owner ruling yet; the cut sets differ, each keeps its live value):
            emp = Hoàng thượng line in the person talk (j24), th = Thái hậu's word and the rumour (j68f / j68h), kinh = Kính sự phòng
            (j68g), card = Hoàng thượng row of the people strip (jk2b), kc = consort lists (jkc). */
Object.assign(BAL,{quyLv:[-30,-10,10,30,60],
 loy:{trust:70,close:60,firm:55,mid:50,warn:45,low:40,bad:35,out:30,deep:75,top:80},
 wit:{lo:30,mid:35,hi:60,top:70},
 ducLv:{up:60,down:20,staffUp:70,staffDown:25,word:[20,40,60,80]},
 sungLv:{emp:[25,45,70],th:[30,55],kinh:[15,35,60],card:[10,30,60],kc:[30,60]}});
function quyIx(v){const q=BAL.quyLv;return v<=q[0]?0:v<q[1]?1:v<=q[2]?2:v<q[3]?3:v<q[4]?4:5}
/* part 2 (review/one-core-dup2):
   tinhLv  = a man's tình ý for the player (j22 / j42 / j24 / jmen): known 10 (shows), warm 30 (khăn tay, rumour), prince 40 (vương gia
             asks for her), close 50 (meets alone, helps), ally 60 (vương gia ally), love 70 (word "si mê"); tinhW words on 10/30/50/70.
   tinLv   = Chủ tin colour of the cung-nữ road (j42 chip + card): < lo red, ≥ hi green; watch = the Chủ tin a servant needs to keep watch
             at the door for a secret meeting (jtin watcher, printed by jroute / j22 «… canh cửa (lòng …+, Chủ tin …+)»; review/one-core-dup3).
   rareLv  = rarity word of an origin / event weight (j69 ow69Rare, jk2b kitRare): ≤ [0] Rất hiếm, ≤ [1] Hiếm.
   sucLv   = Sức words: word = jthaiy sucWord (30/50/70), ask = Hỏi han result line (jaudit, 30/60) — two live ladders, kept, listed.
   oanFade = oán that fades each month (j28 oanMonth: NPC × persF forgive, the player's own oán toward others flat).
   tsDanger= "Nguy hiểm chung" (jts): hot ≥ 30 shown red, act ≥ 35 the NPC acts on it, calm < 10 shown green.
   age.adult = the youngest adult in the game (owner OD:L104 18+; jage AGE_MIN lifts every adult below it). */
Object.assign(BAL,{tinhLv:{known:10,warm:30,prince:40,close:50,ally:60,love:70},tinLv:{lo:30,hi:60,watch:60},rareLv:[6,9],
 sucLv:{word:[30,50,70],ask:[30,60]},oanFade:2,anFade:{base:4,night:2,min:1,wk:3}/* Ân tình fades each month (j8 anMonth): base − night × nights in the last wk weeks, at least min (glossed in jpoison) */,tsDanger:{hot:30,act:35,calm:10},tsGuard:{wk:2,sung:2,tin:2}/* «Đóng cửa giữ mình» (jts tsOptGuard, NPC tsNpcDanger): weeks kept in; cost Sủng −sung for a consort, Chủ tin −tin for a cung nữ (her Sủng bar, j42 srvHud) — the same act, equal value (law 2) */});BAL.age.adult=18;
/* part 3 (review/one-core-dup2): single-copy cut ladders that were typed in their module, now named here (values unchanged):
   rhythm = rhythm game hits for grade 2 / 3 (j5) · facRel = faction standing ±: thân / thù (j10) · tuanDays = day of month → tuần
   (j31) · clanRel = clan relation ±: Đồng minh / Đối đầu (j55) · form = sports form words (j71) · virCong = công virtue level for
   progress / tier 1 / tier 2 (j85) · wkQ = handmade work quality → tier (j85) · tho = lifespan words (jmort) · succEnd = succession
   ending (j99succ) · veil = veil craft quality tiers (jveil) · lost = lost-item grade by price (jlost) · kidHp = kin health words (jht) · exTier = exam tier by target rank (jexam) · luxRep = luxury reputation tick (jlux) ·
   rgTrust = reign faction trust words (jreign) · summon = summon gain steps (jts) · sgStep = minigame raw → odds step (jsgame). */
/* review/one-core-jkc PART 2 (ONE CORE OD:L1267 + LUẬT SỬA CẢ NHÓM, dev/measure/one-core-text-rule.js): cuts whose number a help / gloss / tip text
   ALSO typed (the tiểu thư fault family): the rule and the text now read the same key. */
Object.assign(BAL,{
 accNeedEv:[2,4],          /* chứng cứ needed to accuse (Tố giác): [anyone, Hoàng hậu (rank 7+)] — j8 accNeed + the act text */
 coldEvNeed:2,             /* chứng cứ that clear her name from lãnh cung (j14 «Tìm chứng cứ minh oan») */
 ngocboiSung:15,           /* the Ngọc bội ngự ban keeps its owner's Sủng from falling below this (j8; item text, jinv) */
 sinhThanSung:50,          /* her birthday is bestowed only when Sủng is at least this (j20; ban thưởng list) */
 m30:{tocaoEv:1,exposeEv:2,xinhhAff:40},     /* j30: chứng cứ for «Tố tội thật» / «Bóc chuyện tư tình»; Hoàng hậu thiện cảm for «Xin Hoàng hậu giáng» */
 srvx:{tinOut:10,keepTin:60,secNeed:2,friendAf:30,colN:10,tinUp:35}, /* cung nữ road (j42): Chủ tin below tinOut = sent to Tân Giả khố; from keepTin the chủ keeps her past
                           the age; secNeed = secrets of the chủ she must know to betray; friendAf = quý from which a colleague counts as a friend  tinUp = the Chủ tin she needs to rise a rung (j42 srvMonth; jts Xét phẩm box prints it)  colN = rows in her Đồng liêu list (j42 srvColleagues: her palace first, then friends, ill-wishers, the rest). */
 virx:{hanhCap:80,camSung:40},               /* j85: Hạnh bậc 3 monthly Đức +1 stops at hanhCap; Cầm bậc 5 cheers the Emperor when Sủng is at least camSung */
 tsx:{empSung:30,denSung:20},                /* jts: at a birth the Emperor bestows when Sủng is at least empSung; he sees the lake lantern from denSung */
 sucNeed:{self:25,wk:15,rcp:10,kid:5,yKid:15}, /* Sức an act needs (the lock, its «Sức dưới N» word and the act's own check read the same key): self = «Tự học»
                           (j23 / j85 / jtabs / j83 deck card); wk = «Tự học, làm tác phẩm» (j83 / jtabs Tác phẩm tab); rcp = master / teacher lessons (jrcp);
                           kid = teaching a child chữ / lễ nghi / nghệ (j53 / j54); yKid = Y thuật care of a sick child (jact) */
 facJoinAff:30,             /* a consort with no faction joins hers when her thiện cảm with the player is at least this (j10 «lập phe») */
});
/* review/one-core-jkc-2 (ONE CORE OD:L1267 + LUẬT SỬA CẢ NHÓM, the «thiếu bạc (cần N)» lock family; scan dev/measure/one-core-bac-lock.js): each action's
   price is ONE key that its cost text («Bạc -N»), its lock (S.bac<N), its lock word («cần N bạc») and its handler (apply({bac:-N}), the NPC mirror
   included) all read. Servant acts with a key already read BAL.house (thuongBac / lookBac / upBac / swapBac); the scheme bribe reads BAL.net.n.bribeCost;
   Ban thưởng reads BAL.tw.reward; the tiểu thư dialog reads BAL.kc2.st.kc. */
Object.assign(BAL.house,{hireBac:20,plantBac:40}); /* Nội vụ phủ: thêm cung nữ / thái giám (her and every NPC); «Cài người vào cung khác» */
Object.assign(BAL,{
 bacFee:{court:20,kidCare:10,kidGuard:20,cnvGift:5,h54Thu:15,h54Noi:10,h54Hoa:50,tdProbe:30,tdLeak:20,tdGift:40,itTest:10,htAsk:5,master:60,
   lend:30,lendAff:30,ksp:30,midwife:40,backer:30,npcMat:15,giu:40},
   /* court = «Biếu» a court person (j10 / j15; the NPC Tổng quản gift too) · kidCare / kidGuard = «Chăm sóc» / «Canh giữ các con» (j25) · cnvGift =
      cung nữ road «Biếu quà» a colleague (j42) · h54Thu / h54Noi / h54Hoa = a married daughter: letter, «Nhờ con vào cung nói giúp», a tông nữ's dowry (j54) ·
      tdProbe / tdLeak / tdGift = triều đình acts (j55, her and NPCs) · itTest = «Nghiệm độc» an item (j8 / jinv) · htAsk = «Dò hỏi gia thế» (jht) ·
      master = hiring a danh sư (j2) · lend / lendAff = a friend lends her lend bạc when she likes her from lendAff (j9 «Trò chuyện») ·
      NPC-side prices (the check and the charge read one key): ksp = an NPC bribes Kính sự phòng (j28) · midwife = a rival bribes the midwife (j32) ·
      backer = a court backer (j34) · npcMat = an NPC buys craft material (j75) · giu = an NPC bribes past «giữ» (j8 + j75, one rule in two modules) */
 actBac:{spy:15,ally:30,bribe:40,block:40,musk:30,catswap:50,lygian:20,slowpoison:40,xinhh:30,huydung:30,giahoa:40,thathu:40,phonghoa:30,thaopet:10},
   /* base bạc of each scheme act (ACT[k].c, its ok and its f charge); jecon raises it by the target's rank / guards, and the lock words print that real price (actBac(k,a,t)) */
});
/* evWipe: the chứng cứ amount that clears every piece one person holds against another (evA(a,t,BAL.evWipe): a pardon, a death, a plot undone); review/one-core-dup3 */
Object.assign(BAL,{evWipe:-99});
Object.assign(BAL,{cut:{nightPrep:[1,2] /* night preparation q (j8 night1: Để mộc 1, Tắm 2, Tập 1+bậc) → why word sơ sài ≤[0] / chu đáo ≥[1] (jwhyn) */,rhythm:[8,13],facRel:20,tuanDays:[10,20],clanRel:25,form:[35,50,65],virCong:[2,3,5],wkQ:[25,45,65,85],
 tho:[40,60,75],succEnd:{an:5,q:6},veil:[6,10,14],lost:[40,100,200],kidHp:[35,60],exTier:[3,5],luxRep:[2,3],
 rgTrust:[15,35,60],summon:[3,5,8],summonGain:[{sung:1,an:1},{sung:2,an:1},{sung:3,an:2},{sung:4,an:3}]/* r2 sg-card: tsSummonGain per band (below summon[0], ≥[0], ≥[1], ≥[2]) — were typed in jts */,sgStep:{up:7,down:3}}});
/* CHOICE VALUE (owner OD:L582 + OD 18/11 ~09:20Z; START_CORE laws 2 + 3; review/choice-value-audit): no option is cost-only, none is clearly better.
   rest = Sức she keeps when she declines / stays in her palace (the gain of every "Khéo từ chối / Không đến / Cáo bệnh / Mặc kệ / Lánh đi" option);
   duc = Đức of a virtuous refusal (burning a man's love poem); skipAff = thiện cảm the host loses when she skips a tấn phong feast (was a typed 6 in jts);
   vulan = the three Vu Lan roads at equal value (bạc road ↔ Sức road ↔ scheming road); reign = Tân quân lập uy c1a: Sủng ↔ Đức trade. */
Object.assign(BAL,{cv:{ransom:60,/* bạc to ransom the maid's parents (j7 maidhostage) */coldAid:30,/* bạc a lãnh cung consort begs for medicine (j3 coldletter) */servAsk:10,/* bạc a servant asks for her sick mother (j24 Kẻ hầu xin) */rest:3,duc:1,skipAff:6,vulan:{den:{bac:-10,duc:4,danh:2},cung:{suc:-10,duc:4},cungMaid:8},reign:{nhan:{sung:1,duc:1},mai:{sung:2}},poison:{th:-12,rel:-15,maid:-40,duc:-6}/* j7 poisongift: Thái hậu covers it up / a maid takes the blame — both buy a sure escape */,newgirl:20/* bạc of the brooch for the new consort (j7 newgirl); the cold welcome keeps it */,
 ngAff:{warm:20,cold:-10}/* j7 newgirl: the new consort's thiện cảm after the brooch / the cold welcome */,rumor:{bac:40,danh:2}/* j7 guardrumour «Đút bạc dập lời đồn»: the bribe and the Danh it costs */,tutor:{fest:20,fx:30}/* bạc for the contest tutor: festival entry (j71 fInv7) / court contest (j71x) */,
 quarrel:{hh:5,duc:1,sung:5}/* j7 rvquarrel «Mách Hoàng hậu»: Hoàng hậu quý +hh (only while a Hoàng hậu reigns) · Đức −duc · each quarreller Sủng −sung = her gain (law 3: shown under Được) */,
 cuu:{sung:2,suc:6}/* j71 Cứu giá «Hoảng sợ đứng nhìn»: Sủng −sung (he saw her stand still) · Sức +suc (unhurt, keeps the strength «Lao vào» spends: Sức −10, hurt up to 15) */,
 decl:{suc:6,duc:2,sung:2,an:2}/* DECLINE-THE-EMPEROR family (law 3, OD L1877): «Cáo bệnh» to his night / summons / trip = she rests a whole night, Sức +suc (as «Nghỉ ngơi một lát»); «Dặn cung nữ chỉ viết chuyện vặt» (no spying on him for her father) = Đức +duc; sung / an = what the consort's «Cáo bệnh» on lật thẻ costs (Sủng −sung, Ân tình −an). ONE source: her cards (j8 ksp, jagmaid amNight, jts summons, jworld trip, jcmaid cmTt) AND the summoned NPC's «Cáo bệnh» (jrcv) read it */}});
/* CHOICE VALUE #4 (law 4 on every line this branch rewrote, reviewer re-check #2 FAIL 1): the typed numbers of those options live here, the cards print the keys */
Object.assign(BAL.cv,{glance:{warm:10,cold:-5}/* j24 «Một ánh mắt» (fired by npcWhy manPoem): hắn tình ý when she answers / burns the poem */,vase:{take:{hh:-5,danh:-3,maid:30},leave:{maid:-30,duc:-3}}/* j3 vase: «Nhận tội thay nàng» / «Để nàng chịu đòn» */,coldL:{duc:5,rel:20,ign:{duc:-2}}/* j3 coldletter: «Giúp nàng» Đức + her thiện cảm · «Làm ngơ» */,confessTha:{tin:-6,suc:-8}/* j42 «Nhận tội, xin tha» */,spy:{suc:-10,rel:-10}/* j7 «Tìm kẻ tung tin»: a night of searching · the culprit's thiện cảm when caught */,ghost:{watch:{suc:-10},skip:{danh:-3,maid:-5}}/* j7 ghost: «Rình bắt kẻ giả ma» / «Mặc kệ» */,tong:{bac:-50,danh:-2}/* j7 foreignwed «Tiến cử một tông nữ» */,hostage:{pay:25,skip:-35}/* j7 maidhostage: maid loyalty when she ransoms / abandons the parents */,cmaidSkip:{duc:-1}/* j7 condemnedmaid «Không can dự» */,gift7:{miss:{th:-2,sung:-2},jade:60,npcMin:100,jit:25}/* j71 feast gift: «Không dâng lễ» costs Thái hậu / Sủng · «Dâng ngọc quý» price = what a rich rival (bạc ≥ npcMin) spends · jit = luck in the gift ranking */,closeDoor:{maid:-3}/* j71 «Đóng cửa cung giữ mình» */,stipSup:{danh:-2}/* jstip «Tố lên …»: the superior who backed the eunuch is blamed */,tsBorrow:{aff:25,cost:-2}/* jts hội phối đồ «Mượn áo»: thiện cảm needed · the favour owed */,facAsk:20/* j25 «Có người đến» (a faction head asks her in): event chance (%) */,secPayMul:2/* jcmaid «Trả nợ thay / Gửi tiền thuốc»: maid loyalty = secLoy × this (the «Mặc kệ» side loses secLoy × 1) */});
/* MAID LADDER (maid-ladder-6, owner OD 19/11 ~01:26Z «Cung nữ chia là thô sử, tam đẳng, nhị đẳng, nhất đẳng, nhất đẳng là đại cung nữ như giờ»):
   SRK.maid = thô sử 0 · tam đẳng 1 · nhị đẳng 2 · nhất đẳng (Đại cung nữ) 3 · Chưởng sự cô cô 4 · Nữ quan 5; ma ma = the stay-on standing after it (index 6
   in BAL.ex.srvBar/srvCd (jbal2) and the promo chest). Named rungs: every gate reads these, never a typed number. tier[rung] = the 5-step standing of the art, frame,
   colour, leaderboard and bow order (tam + nhị đẳng share the «Cung nữ» robe until Foreman C paints their own). wage = Bạc per month by rung (was j42 CNV_WAGE). */
BAL.srvRk={tam:1,nhi:2,dai:3,cs:4,nq:5,mama:6,tier:[0,1,1,2,3,4]};
BAL.srvWage=[1,3,4,5,8,12];
/* r2 sg-card: the monthly thơ (j3 artMonth, applied as is, not through sg) — was typed in j3 + 3 rule texts (j1 ARTS.u, j23, j85) */
BAL.tho={lv:3,sung:1,lv5:5,sung5:2};
