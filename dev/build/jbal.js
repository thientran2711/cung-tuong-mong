/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={wkFinCap:1,/* Đức from handmade works (kinh, vật cầu phúc): at most this many per month (j83 wkFinLeft) */ oanLv:[5,20,45,75],/* oán word ladder (VANPHONG): <5 Không oán · <20 Chút oán · <45 Oán · <75 Oán sâu · else Oán hận */outQ:85,hz:3.2,conc:.25,later:6,hhTh:60,/* diff-remeasure 16/11: 55 → 60 (Vừa HH 45 % → ~32 % with the fixed bot; 65 measured 26 %) */birthAdd:2,
 /* ONE SOURCE for every promotion threshold the player sees (checks in promoReqP/candOK and every text read these) */
 hhThNoSon:80,hhThNoSonHieu:70,hhDuc:50,hhDucHeir:40,qBlockHh:-40,qBlockTh:50,hiOppHh:-30,hiOppTh:30,hiOppFac:180,
 /* handmade works (j83), by material 0 thường / 1 tốt / 2 quý: matQ = phần added to the score; cap = highest tier it can reach (only quý makes a
    Tuyệt phẩm); val = gift value added (Sủng / Thái hậu / thiện cảm); sell = share of the material's silver paid back when sold (1: a sale never loses the material's price); tinh = extra
    chân tình for a quý work given to a sincere person. Value check: dev/test/paid-tiers.js */
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
/* what the Hoàng hậu seat asks of p (the same numbers the checks use) */
function hhNeed(p){p=p||S;const sn=sonsOf(p).length>0,hieu=typeof has==="function"&&has("hieuthao");const heir=!!(S.heir&&S.heir.k&&S.heir.k.alive&&S.heir.v===(p===S?null:p));
 return{sons:sn,th:sn?BAL.hhTh:(hieu?BAL.hhThNoSonHieu:BAL.hhThNoSon),duc:heir?BAL.hhDucHeir:BAL.hhDuc,heir}}
/* an empty Hoàng hậu seat: the Thái hậu may bring in a girl of a great house instead of holding a contest (same for every candidate) */
(function(){const c0=contestOpen;contestOpen=function(r){if(r===7&&!ct()&&!queenP()&&S.outQv!==S.vacSince&&consorts().some(p=>candOK(p,7))&&(S.outQv=S.vacSince,true)&&roomFor("consort")&&roll(BAL.outQ)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);S.vacSince=null;
  const t=`<b>Thánh chỉ: Thái hậu chọn ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> Ghế trống không mở tranh. `;log(t);return t}return c0.apply(this,arguments)}})();
/* fewer births per life: conception (after the ×0.7) scaled; a woman who has borne before is a little safer in labour (everyone alike) */
(function(){const c0=conceiveCh;conceiveCh=function(p){return Math.round(c0.apply(this,arguments)*BAL.conc)}})();
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
   c = context + (Lợi thế − 1) × sc); base is the same both ways, so a neutral life leans neither way. */
Object.assign(BAL,{st14:{max:14,parts:[[1,3],[4,11],[12,14]],lim:{nhap:6,nhapCnv:8,sung:10,tap:8},
 goal:{sung:25,rel:30,art:2,tin:60,nt:25},danh:{nhap:3,sung:2,tap:2,len:4},rw:{nhap:0,sung:1,tap:1,len:2},
 hate:{min:25,base:15,friend:20},tr:{"Hiểm độc":-5,"Tham vọng":-3,"Kiêu ngạo":-2,"Nhu mì":2,"Hiền lành":4,"Trung hậu":3},
 ctx:{aff:6,affCap:6,oan:10,oanCap:5,tam:[40,15],duc:[50,20],foeOan:30,foeCap:4,cap:15},odds:[5,95],
 shift:{base:15,slope:2,sc:2,min:5,max:40}},
/* cung nữ được sủng hạnh (j42 cnvName): from Hoàng thượng để ý ≥ at, each time he notices her the odds he asks her name and raises her
   Đáp ứng = nt / div − sub (j42 roll, the Thân phận row, the j67 / jst14 «Từ kẻ hầu thành tiểu chủ» step all read this) */
 ntRise:{at:45,div:2,sub:10}});
function ntRiseOdds(){return Math.max(0,(S.nt||0)/BAL.ntRise.div-BAL.ntRise.sub)}
