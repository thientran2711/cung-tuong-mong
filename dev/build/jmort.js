/* ================= jmort: THỌ SỐ + SINH TỬ — one mortality model for every person (owner 16/11, review/mortality) =================
   Numbers: BAL.mort (jbal2.js). Pure core between CORE markers (dev/measure/mort-sim.js reuses it in node).
   1. LIFESPAN (owner 16/11 "thọ số"): every person rolls ONE lifespan (p.tho = age at death, p.thoM = month) the first time the model
      sees them: her at the start, NPCs / maids / eunuchs / officials / the Emperor / the Thái hậu at the start or when they appear,
      every child at birth. Saved on the person; an old save rolls once at load. No reroll. The roll is drawn from BAL.mort.life.dice[group]
      (bell curve {mean,sd,lo,hi}), conditioned on being above the present age. Children: kid.risk % die young at an age from the kid.early bands (smallpox, an epidemic).
      Before most lifespan deaths an OMEN illness shows for thoO months (Thái y reports, the illness name on the person) — a share
      (BAL.mort.sudden) strike without warning. Events cut a life short: poison, assassination, accidents, illness, childbirth, punishment
      (the existing rules) — this file adds accidents (a few odd ones), Emperor assassination / poison plots with an omen, and age making illness
      easier to catch and deadlier when critical.
   2. Older → more tired: sleep regen (j76sleep) −1 per BAL.mort.tired.per years over tired.from (everyone).
   3. Emperor death: the legacy "year>12" roll (j3) is replaced by mortEmpDue(); her fate by rank / children / favour (Thái phi, theo con ra
      phủ, xuất gia làm ni cô, xuất cung về quê, tuẫn táng risk that Đức / Thái hậu / a living child can avert). Her son as heir → the
      succession flow (j3 / j99succ), untouched.
   4. Thái hậu death → court shift (Hoàng hậu holds lục cung; her backing gone). NPC deaths free their seats (tuyển tú refills; maid/staff refill).
   5. Co-op: world people (Emperor, Thái hậu, rivals, officials, men) roll and die on the host only; her own life and her household locally.
      The Emperor's death stays muted in co-op (existing jcoopworld rule) — his lifespan is not applied there.
   SWITCHES (owner answers 16/11, OD:L1141/L1151/L1168): life.show 0 = hidden, never shown · life.dice bell curve = BAL.mort.life.dice.adult (owner: mean 45 sd 15, 15–85), children their own risk curve · life.care 1 = care adds up to careMax (3) years. Every number here reads BAL.mort (one core, OD:L1267). */
/*CORE{*/
function mortBand(B){let t=0;for(const b of B)t+=b[2];let r=Math.random()*t;for(const b of B){if(r<b[2])return b[0]+Math.random()*(b[1]-b[0]);r-=b[2]}return B[B.length-1][1]}
function mortGauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
/* one draw from a group's curve: {mean,sd,lo,hi} bell curve (owner 16/11: early death rare, the average most common, long life rare);
   a child curve {risk,early,adult}: risk % die young at an age from the `early` bands, else the adult curve. A string = alias of another group. */
function mortDraw(grp){const D=BAL.mort.life.dice;let c=D[grp]||D.adult;while(typeof c==="string")c=D[c];
 if(c.risk!=null){if(Math.random()*100<c.risk)return mortBand(c.early);return mortDraw(c.adult||"adult")}
 return Math.max(c.lo,Math.min(c.hi,c.mean+c.sd*mortGauss()))}
/* roll a lifespan (whole years of age at death) not below the present age (conditioned: redraw); floor = minimum years still to live (switch) */
function mortRoll(grp,age,floor){const min=age+Math.max(0,floor||0);
 for(let i=0;i<200;i++){const x=Math.floor(mortDraw(grp));if(x>=min)return x}return min+Math.floor(Math.random()*3)}
/* yearly % of an Emperor plot (assassination k="ass" / poison k="poi"), higher when the throne is weak (S.reign.power 0–100, else 50) */
function mortPlotY(k,power){const E=BAL.mort.emp;const w=power<50?1+E.weak*(50-power)/50:1;return (k==="ass"?E.ass:E.poi)*w}
function mortFoil(power){const E=BAL.mort.emp;return Math.max(E.foilLo,Math.min(E.foilHi,E.foil+(power-50)/2))}
/*}CORE*/
(function(){if(typeof BAL!=="object"||!BAL.mort)return;const M=BAL.mort;
const cw=()=>window.COOPW&&COOPW.on,host=()=>!cw()||COOPW.seat==="a";
const pw=()=>S&&S.reign&&typeof S.reign.power==="number"?S.reign.power:50;
ILL.laobenh={n:"Bệnh già",slow:1,die:0};ILL.trongbenh={n:"Trọng bệnh",slow:1,die:0};
function kidSet(){const K=new Set();try{allKids().forEach(([k])=>K.add(k))}catch(e){}return K}
function ageOf(p){return p===S?S.age:p===S.thO?S.thAge:p.age}
function grpOf(p,K){return p===S?"me":p===S.emp?"emp":K.has(p)?"kid":"adult"}
function nm(p){return p===S.emp?"Hoàng thượng":p===S.thO?"Thái hậu":p.name||"người hầu"}
/* give p a lifespan once */
function assign(p,K,oldSave){if(!p||typeof p!=="object"||p.tho>0||p.nb)return;const a=ageOf(p);if(!(a>=0))return;const g=grpOf(p,K);
 let fl=g==="me"?M.life.floorMe:g==="emp"?M.life.floorEmp:0;if(oldSave&&(g==="me"||g==="emp"))fl=Math.max(fl,M.oldFloor);
 p.tho=mortRoll(g,a,fl);p.thoM=1+R(12);if((p.tho-a)*12+(p.thoM-(S.month||1))<M.life.minMo)p.tho=a+1;p.thoO=Math.random()*100<M.sudden?0:M.omen[0]+R(M.omen[1]-M.omen[0]+1);
 if(p===S&&M.life.show){const w=p.tho<40?"yểu mệnh":p.tho<60?"trung thọ":p.tho<75?"thượng thọ":"hạc thọ";
  log(`Thầy tướng xem tay ngươi, phán: số ${w}${M.life.show>=2?`, thọ chừng ${p.tho} tuổi`:""}.`)}}
function worldPeople(){const L=[S.emp];if(!S.thDead&&S.thO)L.push(S.thO);(rivals||[]).forEach(v=>{if(v.alive&&!v.coop)L.push(v);(v.kids||[]).forEach(k=>k.alive&&L.push(k));(v.staff||[]).forEach(s=>!s.coop&&L.push(s))});
 const C=S.court||{};for(const k in C)L.push(C[k]);(S.men||[]).forEach(m=>m.alive!==false&&L.push(m));return L}
function myPeople(){const L=[S];if(S.maid)L.push(S.maid);(S.staff||[]).forEach(s=>!s.coop&&L.push(s));(S.kids||[]).forEach(k=>k.alive&&L.push(k));return L}
function people(){return (host()?worldPeople():[]).concat(myPeople())}
function initAll(){if(!S||!M.on)return;const old=!S.mort;if(!S.mort)S.mort={v:1,old:old&&S.turn>0?1:0};const K=kidSet();for(const p of people())assign(p,K,S.mort.old)}
const left=p=>(p.tho-ageOf(p))*12+(p.thoM-S.month);
const OFFICIAL={tq:"Tổng quản thái giám",ksp:"Thái giám Kính sự phòng",ped:"Thái giám Nội vụ phủ",ty:"Thái y"},HEIRN=["Vương","Trần","Phùng","Tô","Cao","Lưu","Hà","Đỗ"];
/* a person reaches the end of the lifespan (or an accident): remove them the way the game already does for that kind of person */
/* death ledger for audits / bots: S.mort.dl = [{g group, a age, c cause, y year}] (last 300) */
function note(p,why,K){try{const g=p===S?"me":p===S.emp?"emp":p===S.thO?"th":K.has(p)?"kid":rivals.includes(p)?"consort":p===S.maid?"maid":(S.men||[]).includes(p)?"men":Object.values(S.court||{}).includes(p)?"court":"staff";
 const c=!why?"lifespan":/Thích khách|độc/.test(why)?"plot":/ngã|nghẹn|ngất|trượt|cảm hàn sau|trúng phong|chè hạt sen/.test(why)&&p.tho-ageOf(p)>0?"accident":"lifespan";
 (S.mort.dl=S.mort.dl||[]).push({g,a:ageOf(p),c,y:S.year});if(S.mort.dl.length>300)S.mort.dl.shift()}catch(e){}}
function kill(p,why,K){let ev="";note(p,why,K);
 if(p===S){S.mort.cause=why;die(why);return ""}
 if(p===S.emp){S.mort.empDue=why||(p.thoO?"Ngài lâm trọng bệnh đã lâu, thuốc thang vô hiệu":"Ngài trúng phong đột ngột giữa đêm");return ""}
 if(p===S.thO){if(!S.thDead){S.thDead=true;S.th=0;S.thIll=null;ev+=`<b>Thái hậu băng hà, thọ ${S.thAge} tuổi.</b> ${why?why+". ":""}`}return ev}
 if(K.has(p)){const mine=(S.kids||[]).includes(p);return kidDie(p,why||p.nbWhy||(p.nb?"yểu mệnh khi chưa đầy tháng":p.age<6?pick(["mất vì đậu mùa","mất vì sốt cao","nhiễm dịch mà mất"]):"lâm bệnh mà mất"),mine)}
 if(rivals.includes(p)){p.alive=false;if(p.queen){p.queen=false;if(S.vacSince==null)S.vacSince=S.turn}return `<span class="r">${p.name} ${why||"lâm trọng bệnh qua đời"}, ${p.age} tuổi.</span> `}
 if(p===S.maid){const o=S.maid.name;S.maid=newMaid(pick(MAIDS.filter(x=>x!==o)),M.maidLoy);return `<span class="r">Cung nữ thân cận ${o} ${why||"lâm bệnh qua đời"}.</span> Nội vụ phủ đưa ${S.maid.name} đến hầu thay. `}
 for(const q of [S].concat(rivals))if(q&&q.staff&&q.staff.includes(p)){q.staff.splice(q.staff.indexOf(p),1);try{fillStaff(q,true)}catch(e){}return q===S?`Người hầu ${p.name||""} trong cung ngươi ${why||"qua đời"}. `:""}
 const C=S.court||{};for(const k in C)if(C[k]===p){const o=p.name;p.name=`${OFFICIAL[k]||"Quan"} ${pick(HEIRN)}`;p.af={};p.age=k==="ped"?M.repl.young[0]+R(M.repl.young[1]):M.repl.adult[0]+R(M.repl.adult[1]);delete p.tho;delete p.fc;delete p.fk;assign(p,K);
  return `${o} ${why||"qua đời"}; ${p.name} lên thay. `}
 if((S.men||[]).includes(p)){p.alive=false;return ""}
 return ev}
/* the omen illness on people who show illness (her, consorts, the Thái hậu, the Emperor) */
function omen(p,ml){const st=ml<=M.omenSt[0]?3:ml<=M.omenSt[1]?2:1,k=ageOf(p)>=M.oldAge?"laobenh":"trongbenh";let ev="";
 if(p===S.emp){const i=S.emp.ill;if(!(i&&i.mort)){S.emp.ill={k:"longthe",st,known:true,mort:1};S.emp.mood=2;ev+="Thái y viện tâu: long thể suy nhược, mạch tượng không tốt. "}else if(i.st!==st){i.st=st;if(st===3)ev+="<b>Thái y viện quỳ ngoài Càn Thanh cung: long thể nguy kịch.</b> "}return ev}
 if(p===S.thO){const i=S.thIll;if(!(i&&i.mort)){S.thIll={k,st,known:true,mort:1};ev+="Thái y bắt mạch Từ Ninh cung, lắc đầu không nói. "}else if(i.st!==st){i.st=st;if(st===3)ev+="Thái hậu bệnh nguy kịch, các phi tần thay nhau hầu thuốc. "}return ev}
 if(p===S||rivals.includes(p)){const i=p.ill;if(!(i&&i.mort)){p.ill={k,st,known:p===S,mort:1};if(p===S)ev+=`<span class="r">Ngươi mắc ${ILL[k].n.toLowerCase()}; thái y bốc thuốc mà mạch vẫn yếu.</span> `}else if(i.st!==st){i.st=st;if(p===S&&st===3)ev+=`<span class="r">${ILL[k].n} trở nguy kịch.</span> `}}
 return ev}
/* the year before a natural death: weaker, ill more often; one Thái y report for the Emperor / Thái hậu / her (owner 16/11 omens approved) */
function weak(p){let ev="";if(p===S.emp){if(!S.emp.pre){S.emp.pre=1;ev+="Thái y viện tâu: Hoàng thượng dạo này hay mệt, ăn ít, đêm ngủ không yên. "}return ev}
 if(p===S.thO){if(!S.thO.pre){S.thO.pre=1;ev+="Thái y nói khẽ: Thái hậu tuổi cao, khí huyết đã kém. "}return ev}
 if(p===S||rivals.includes(p)){ap(p,{suc:-M.pre.suc});if(p===S&&!S.mort.pre){S.mort.pre=1;ev+="Dạo này ngươi hay mệt, trở trời là đau mình. "}
  if(!illOf(p)&&roll(M.pre.ill)){const sea=SEASON[S.month-1];const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));ev+=catchIll(p,L.length?pick(L)[0]:pick(["phonghan","matngu"]))}}
 return ev}
const ACC={me:["trượt chân trên bậc đá đóng băng trước điện, không tỉnh lại","ngã xuống hồ Thái Dịch giữa đêm mưa"],
 adult:["trượt chân ngã xuống hồ Thái Dịch lúc ngắm trăng","bị ngựa kinh hãi hất ngã ở Nam Uyển","cảm hàn sau đêm thả đèn hoa đăng, không qua khỏi"],
 odd:["nghẹn hạt sen giữa yến tiệc","mải đuổi con vẹt sổng lồng, trượt chân ngã từ lầu vọng nguyệt","cười quá đà khi xem gánh chèo, ngất đi không tỉnh"],
 emp:["ngã ngựa khi săn bắn ở Nam Uyển","trúng phong giữa buổi chầu"],empOdd:["ăn liền ba bát chè hạt sen đêm Trung thu, đau bụng rồi không qua khỏi"]};
function accY(p,K){if(K.has(p))return 0;return p===S?M.acc.me:p===S.emp?M.acc.emp:M.acc.npc}
function accText(p){const odd=Math.random()*100<M.oddP;if(p===S.emp)return pick(odd?ACC.empOdd:ACC.emp);return pick(odd?ACC.odd:p===S?ACC.me:ACC.adult)}
/* Emperor plots: an omen month(s) first, then cấm quân foils it or not */
function empPlot(){if(cw())return "";const P=S.mort;let ev="";
 if(P.plot){P.plot.mo--;if(P.plot.mo>0)return "";const k=P.plot.k;P.plot=null;
  if(roll(mortFoil(pw())))return k==="ass"?"Cấm quân bắt được thích khách nấp trong Ngự hoa viên; Hoàng thượng bình an. ":"Thái giám thử món phát hiện chén canh có độc; Ngự thiện phòng bị tra xét. ";
  P.empDue=k==="ass"?"Thích khách lẻn vào tẩm điện hành thích":"Ngự thiện bị kẻ gian bỏ độc";return ev}
 for(const k of ["ass","poi"])if(roll(mortPlotY(k,pw())/12)){P.plot={k,mo:M.emp.plotMo[0]+R(M.emp.plotMo[1])};
  if(S.mat>=M.emp.rumourMat||roll(M.emp.rumour))ev+=k==="ass"?"Trong cung có tin đồn: có kẻ mưu hành thích. Cấm quân tăng canh. ":"Ngự thiện phòng xuất hiện người lạ; thái giám thử món phải nếm từng món. ";break}
 return ev}
function monthMort(){if(!S||!M.on||S.dead)return "";initAll();let ev="";const K=kidSet();
 for(const p of people()){if(S.dead)break;if(!(p.tho>0||p.nb))continue;if(p===S.emp&&cw())continue;if(p.alive===false)continue;
  const ml=left(p);const show=p===S||p===S.emp||p===S.thO||rivals.includes(p);
  if(ml<=0){ev+=kill(p,p===S?`Tuổi trời đã tận, ${ILL[ageOf(p)>=M.oldAge?"laobenh":"trongbenh"].n.toLowerCase()} không qua khỏi, thọ ${S.age} tuổi`:"",K);continue}
  if(show&&p.thoO&&ml<=p.thoO)ev+=omen(p,ml);
  else if(p.thoO&&ml<=M.pre.mo)ev+=weak(p);
  const a=accY(p,K);if(a&&roll(a/12)){const t=accText(p);ev+=p===S?(kill(p,`Ngươi ${t}`,K),""):kill(p,t,K)}}
 if(!S.dead&&!S.mort.empDue)ev+=empPlot();
 if(S.thDead&&!S.mort.thGone){S.mort.thGone=1;ev+=thShift()}
 return ev}
/* the Thái hậu is gone: lục cung passes to the Hoàng hậu; her backing (or her disfavour) ends */
function thShift(){let ev="Quốc tang ba tháng. ";const q=typeof queenP==="function"?queenP():null;
 if(q&&q!==S){ap(q,{danh:M.thDanh});ev+=`Hoàng hậu ${q.name} một mình nắm quyền lục cung. `}else if(S.rank>=7){apply({danh:M.thDanh});ev+=`Ngươi một mình nắm quyền lục cung. Danh +${M.thDanh}. `}
 if(S.emp)S.emp.mood=2;return ev}
window.mortMonth=monthMort;
/* hooks: the monthly pass runs inside illMonth (once a month, before rivals); the omen illnesses are kept away from the old cure rolls */
(function(){const i0=illMonth;illMonth=function(){if(!M.on||!S)return i0.apply(this,arguments);
 const e=S.emp&&S.emp.ill&&S.emp.ill.mort?S.emp.ill:null,t=S.thIll&&S.thIll.mort?S.thIll:null;if(e)S.emp.ill=null;if(t)S.thIll=null;
 /* the old Thái hậu illness (j13) killed on its own; her lifespan now carries most of that: a critical old illness keeps its death roll only thIllKeep % of months */
 if(!t&&S.thIll&&S.thIll.st>=3&&!roll(M.thIllKeep))S.thIll.st=2;
 let ev=i0.apply(this,arguments);if(e)S.emp.ill=e;if(t&&!S.thDead)S.thIll=t;if(S.dead)return ev;return ev+monthMort()}})();
(function(){const p0=illMonthP;illMonthP=function(p){if(!M.on||!p)return p0.apply(this,arguments);if(p.ill&&p.ill.mort){ap(p,{suc:-M.pre.omenSuc*p.ill.st});return ""}
 const had=!!illOf(p);let ev=p0.apply(this,arguments);if(S.dead||p.alive===false)return ev;const a=ageOf(p)||20;
 if(!had&&!illOf(p)&&a>M.illAge[0]&&roll(M.illAge[2]*(a-M.illAge[0])/M.illAge[1])){const sea=SEASON[S.month-1];const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));ev+=catchIll(p,L.length?pick(L)[0]:"phonghan")}
 const i=illOf(p);if(i&&i.st===3&&!i.mort&&ILL[i.k].die&&a>M.dieAge[0]&&roll(M.dieAge[2]*ILL[i.k].die*(a-M.dieAge[0])/M.dieAge[1])){if(p===S){die(`${ILL[i.k].n} nguy kịch, tuổi cao sức yếu không qua khỏi`);return ev}p.alive=false;if(p.queen)p.queen=false;ev+=`<span class="r">${p.name} mất vì ${ILL[i.k].n.toLowerCase()}, tuổi cao sức yếu.</span> `}
 return ev}})();
/* treatment of the omen illness: switch 3 (care) — 0: the lifespan holds, thuốc chỉ đỡ đau; 1: a cure adds careAdd years once per careMax */
(function(){const t0=treat;treat=function(p,way){const i=p&&p.ill;if(!M.on||!(i&&i.mort))return t0.apply(this,arguments);
 if(!M.life.care||(p.thoX||0)>=M.life.careMax){ap(p,{suc:M.life.cureSuc});return "Thái y lắc đầu: tuổi trời đã định, thang thuốc chỉ giúp bớt đau. "}
 if(roll(way==="ty"?M.life.cureTy:M.life.cureOther)){const add=Math.min(M.life.careAdd,M.life.careMax-(p.thoX||0));p.thoX=(p.thoX||0)+add;p.tho+=add;p.ill=null;return `${NMc(p)} qua cơn nguy, sức khỏe hồi lại. `}return "Bệnh chưa thuyên giảm. "}})();
/* switch 3, care=1 (owner 16/11: care lengthens life only a little, HARD CEILING careMax years in all; số trời decides the rest; care counts
   only while kept up, and it lowers illness risk a bit). careN(p) = sources kept up now: Sức ≥ careSuc, a thái y of her own (doctor), Y thuật ≥ 2.
   Each new year: each source gives careP % for +1 year (total never above careMax); a year with no source and Sức < careLapse takes one
   gained year back. While a source is kept up, a newly caught illness is shaken off at once careIll % × sources. */
function careN(p){return p?(p.suc>=M.life.careSuc?1:0)+(p.doctor?1:0)+(p.arts&&p.arts.y>=M.life.careYt?1:0):0}
(function(){const a0=ageYear;ageYear=function(){const r=a0.apply(this,arguments);try{if(M.on&&M.life.care)for(const p of consorts()){if(!(p.tho>0))continue;const n=careN(p),x=p.thoX||0;
 if(n&&x<M.life.careMax&&roll(M.life.careP*n)){p.thoX=x+1;p.tho+=1}
 else if(!n&&x>0&&(p.suc||0)<M.life.careLapse&&p.tho-1>ageOf(p)){p.thoX=x-1;p.tho-=1}}}catch(e){}return r}})();
(function(){const p0=illMonthP;illMonthP=function(p){const had=!!illOf(p);const ev=p0.apply(this,arguments);
 try{if(M.on&&M.life.care&&!had&&p&&p.alive!==false&&!(p===S&&S.dead)){const i=illOf(p);if(i&&!i.mort&&roll(M.life.careIll*careN(p))){p.ill=null;return p===S?"Nhờ giữ gìn sức khỏe, ngươi chỉ cảm mệt mấy hôm rồi khỏi. ":""}}}catch(e){}return ev}})();
/* older → more tired */
(function(){if(typeof j76sleep!=="function")return;const s0=j76sleep;j76sleep=function(p){const r=s0.apply(this,arguments);if(!M.on||!p||(typeof khB==="function"&&khB()))return r;/* folded into the Sức khỏe ceiling (jkh, owner 16/11 18:05Z: age acts through Sức max only) */const a=ageOf(p)||20;return a>M.tired.from?Math.max(M.tired.min,r-Math.floor((a-M.tired.from)/M.tired.per)):r}})();
/* grief: losing her child weighs on her health (illness easier for griefMo months) */
(function(){const k0=kidDie;kidDie=function(k,why,mine){if(mine&&S)S.mortGrief=M.griefMo;return k0.apply(this,arguments)}})();
(function(){const p0=illMonthP;illMonthP=function(p){if(p===S&&S.mortGrief>0){S.mortGrief--;if(!illOf(S)&&roll(M.griefIll))return catchIll(S,"tambenh")+p0.apply(this,arguments)}return p0.apply(this,arguments)}})();
/* ================= BIRTH (owner 16/11 approved: stillbirth, newborn death, hard birth survived, "giữ mẹ hay giữ con" = the Emperor's choice) =========
   Same rule for her and every NPC consort. The old death roll of birthP (roll birthRisk) is taken over here: birthRisk is set to 0 inside birthP. */
function sonsAlive(){try{return allKids().filter(([k])=>k.alive&&k.sex==="m").length}catch(e){return 1}}
function keepMomOdds(p,boy){const E=M.birth.emp;const th=p===S?S.th:(p.th||0);let o=E.base+E.sung*((p.sung||0)-50)+E.th*th*(has("hieuthao")?E.hieuthao:1);
 if(!sonsAlive())o-=E.heirNeed;if(boy)o-=E.boy;for(const k of ["nhantu","datinh","mesac","lanhlung","chamchinh"])if(has(k))o+=E[k];return cl(Math.round(o),5,95)}
function birthEvent(t,h){if(typeof Q==="object"&&Q)Q.push({t,kind:"news",h})}
(function(){const b0=birthP;birthP=function(p,fake){if(!M.on||fake||!p)return b0.apply(this,arguments);const me=p===S,B=M.birth;
 const r=birthRisk(p);const br0=birthRisk;let res;
 /* stillbirth */
 if(roll(B.stillP+Math.max(0,(p.age||20)-35)*B.stillAge)){ap(p,{suc:-B.stillSuc});p.stillN=(p.stillN||0)+1;if(me)S.mortGrief=M.griefMo;p.lastBirth=S.turn;
  return me?`<span class="r">Ngươi trở dạ suốt một đêm, đứa bé sinh ra đã không còn hơi thở (thai chết lưu).</span> Sức -${B.stillSuc}. `:`<span class="r">${p.name} lâm bồn, thai chết lưu.</span> `}
 if(!roll(r*B.hardX)){birthRisk=()=>0;try{return b0.apply(this,arguments)}finally{birthRisk=br0}}
 p.hardN=(p.hardN||0)+1;
 if(roll(B.choiceP)){const guess=roll(B.emp.boyGuess);const o=keepMomOdds(p,guess);const mom=roll(o);
  const who=me?"ngươi":p.name;const head=`Bà đỡ quỳ ngoài điện: ${who} khó sinh, chỉ giữ được một. ${guess?"Thái y đoán là hoàng tử. ":""}Hoàng thượng lặng đi hồi lâu rồi phán: `;
  if(mom){ap(p,{suc:-B.hardSuc});p.lastBirth=S.turn;if(roll(B.barrenP))p.barren=1;p.choiceN=(p.choiceN||0)+1;
   const t=head+"“Giữ mẹ.” Đứa bé không giữ được."+(p.barren?" Thái y nói từ nay khó lòng có thai lại.":"");if(me){S.mortGrief=M.griefMo;birthEvent("Giữ mẹ hay giữ con",`<p>${t}</p><p class="past">Sức -${B.hardSuc}</p>`)}
   return `<span class="r">${t}</span> `}
  /* giữ con: the child is born, the mother dies */
  p.choiceN=(p.choiceN||0)+1;birthRisk=()=>0;try{res=b0.apply(this,arguments)}finally{birthRisk=br0}
  const t=head+"“Giữ con.”";if(me){die(`${t} Ngươi gắng sinh hạ hài nhi rồi nhắm mắt`);return ""}
  p.alive=false;if(p.queen)p.queen=false;return res+`<span class="r">${t} ${p.name} sinh hạ hài nhi rồi qua đời.</span> `}
 if(roll(B.hardDie)){if(me){die("Khó sinh, băng huyết mà chết");return ""}p.alive=false;if(p.queen)p.queen=false;return `<span class="r">${p.name} khó sinh, băng huyết mà chết.</span> `}
 birthRisk=()=>0;try{res=b0.apply(this,arguments)}finally{birthRisk=br0}ap(p,{suc:-B.hardSuc});if(roll(B.barrenP))p.barren=1;
 return res+(me?`<span class="r">Ngươi khó sinh, vượt cạn suốt hai ngày mới qua khỏi.</span> Sức -${B.hardSuc}. ${p.barren?"Thái y nói từ nay khó lòng có thai lại. ":""}`:`${p.name} khó sinh nhưng qua khỏi. `)}})();
/* a woman the Thái y says can never conceive again */
(function(){const c0=conceiveCh;conceiveCh=function(p){if(M.on&&(p||S).barren)return 0;return c0.apply(this,arguments)}})();
/* newborn death in the first month (part of the child curve) */
(function(){const m0=mkKid;mkKid=function(sex,age){const k=m0.apply(this,arguments);try{if(M.on&&age===0&&roll(M.birth.newbornP)){k.tho=0;k.thoM=((S&&S.month)||1)%12+1;k.thoO=0;k.nb=1}}catch(e){}return k}})();
/* the legacy roll in j3 asks here: the Emperor dies when his lifespan / a plot / an accident says so */
window.mortEmpDue=function(){if(!M.on)return S.year>12&&roll((S.year-12)*1.5+Math.max(0,S.emp.age-50)*.5);if(cw())return false;
 const w=S.mort&&S.mort.empDue;if(!w)return false;S.mort.empWhy=w;S.mort.empDue=null;return true};
/* her fate when the Emperor dies and her son is not the heir: Thái phi / theo con ra phủ / ni cô / về quê; tuẫn táng risk that can be averted */
/* r1 fix: the re-route is installed at call time around the CURRENT (outermost) over(), so every other over() wrapper (j93 ink title,
   jkiep, jkc, j99succ, jcoopworld) sees the real fate, not the legacy "Thái phi" */
(function(){const e0=emperorDies;emperorDies=function(){if(!M.on||!S)return e0.apply(this,arguments);const cur=over;
 over=function(h,t,fate,alive){over=cur;return mortFate.call(this,cur,h,t,fate,alive)};try{return e0.apply(this,arguments)}finally{over=cur}}})();
function mortFate(o0,h,t,fate,alive){if(!M.on||!S||S.dead)return o0.call(this,h,t,fate,alive);
 const why=S.mort&&S.mort.empWhy;if(why)t=String(t).replace(/(băng hà, thọ \d+ tuổi\.)/,`$1 ${why}.`);
 if(h!=="Thái phi")return o0.call(this,h,t,fate,alive);
 const sons=mySons(),daus=myDaus(),F=M.fate;const pre=String(t).match(why?/^.*?băng hà, thọ \d+ tuổi\.(?: [^.]*\.){0,2}/:/^.*?băng hà, thọ \d+ tuổi\.(?: [^.]*\.)?/);const P=pre?pre[0]+" ":"";
 let Q=P;if(!sons.length&&!daus.length&&S.sung>=F.tuanSung&&roll(F.tuanP)){
  const save=S.duc>=F.tuanDuc?"Ngươi xưa nay nhân đức, triều thần dâng sớ can":(!S.thDead&&S.th>=F.tuanTh)?"Thái hậu đứng ra xin cho ngươi":"";
  if(!save)return o0.call(this,"Tuẫn táng",P+"Di chiếu muốn người được sủng ái theo hầu nơi Hoàng lăng. Ngươi uống chén rượu tiễn biệt, theo tiên đế về chốn suối vàng.","Tuẫn táng theo tiên đế",false);
  Q=P+`Di chiếu muốn người được sủng ái theo hầu nơi Hoàng lăng. ${save}, ngươi được miễn. `;t=P?String(t).replace(P,Q):Q+t}
 if(sons.length)return o0.call(this,"Thái phi",Q+`${sons[0].name} được phong vương, đón mẹ về vương phủ phụng dưỡng. Ngươi thành Thái phi, an hưởng tuổi già bên con cháu.`,"Thái phi theo con ra phủ",true);
 if(daus.length||S.rank>=F.phiRank)return o0.call(this,h,t,fate,alive);
 if(S.rank<=F.homeRank&&S.age<F.homeAge&&roll(F.homeP))return o0.call(this,"Xuất cung",Q+"Tân đế ân xá, cho các cung tần chưa có con được về quê. Ngươi rời cung, sống nốt đời ở quê nhà.","Xuất cung về quê",true);
 return o0.call(this,"Xuất gia",Q+"Ngươi không con cái, phẩm vị thấp; theo lệ cũ, cùng các cung tần khác cạo tóc vào chùa Cảm Nghiệp làm ni cô, sớm hôm kinh kệ.","Xuất gia làm ni cô",true)}
/* a new game: everyone rolls at the start; an old save rolls once at load */
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&M.on){S.mort=null;delete S.tho;initAll();S.mort.old=0}}catch(e){console.error(e)}return r}})();
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{initAll()}catch(e){console.error(e)}return r}})();
})();
