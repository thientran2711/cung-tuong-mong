/* ================= jreignend: HẾT MỘT TRIỀU — the Emperor's reign ends by game state (owner OD 26/11 ~21:20Z «Làm theo khuyên nghị hoàng thượng trên đi») =================
   Ruling: (1) his natural death is RARE on a wide curve (BAL.mort.life.dice.emp, PACE-SPEED, read only here); (2) NHƯỜNG NGÔI — he hands the throne to
   the crown prince when he is old / ill, or when the Thái hậu and the court press him; (3) PHẾ — a court house with enough strength, Sủng and evidence
   deposes him; (4) LẬT ĐỔ — a coup by a house whose power passes the threshold. Reign length = whatever these and the natural curve give.
   Numbers: BAL.re (jbal2.js), law 4. Her own side: illness / poison / assassination still end her life early (owner ~21:40Z «Giữ bệnh, độc, ám sát»); the age-40 «Tuổi xuân qua đi» end is removed (j3, owner ~21:30Z).
   THE MODEL (one rule for every house, law 6b — the five court houses of j55 are the factions; each acts by its own goals: power, a prince of its blood, greed):
     NHƯỜNG NGÔI pressure S.re.a (0..100): rises each month from the state — a grown crown prince, illness / old age, the reign's length, the living
       Thái hậu pressing, the heir's house strong at court — damped by the throne's grip (jreign rg.p). At BAL.re.abd.warn the court petitions
       (card); at 100 he abdicates. No son → he hands it to a hoàng đệ (slower).
     PHẾ (per house): evidence of misrule (S.re.F[c].ev) gathers while Quốc sự is bad (j55 biên cương / kho lúa), he is ill or in a black mood; when the
       house's power ≥ phe.pow, its best consort's Sủng ≥ phe.sung, evidence ≥ phe.ev and it has a prince to raise, the case opens (card); after phe.mo
       months the court votes (odds) — win: he is deposed, their prince is raised; lose: the house falls (power, Sủng of its women).
     LẬT ĐỔ (per house): power ≥ coup.pow and power − grip ≥ coup.gap → the house plots (S.re.F[c].pl months); a rumour at coup.rum; at coup.mo it
       strikes (odds) — win: he is overthrown, their prince (else the heir, else a thân vương) takes the throne; lose: the house is crushed.
   TWO-WAY (law 1, equal value laws 2/3): every opened case reaches her as one kit card with three roads of equal weight — block (mật tấu / dâng sớ
   giữ ngôi), help (ngầm tiếp tay / cùng triều thần xin lập tân quân), stand aside (gain-only, time is its cost). Her father's house is a house
   like the others: its case can be her road to put her son on the throne, or hers to stop. Her ordinary court acts (j55 can chính, gifts, leaks)
   already move house power — the same numbers the cases read.
   THE END: the event sets S.re.end and answers j3's monthly mortEmpDue() → the existing emperorDies() flow runs unchanged (heir, j99succ three
   roads, her fate by rank / children); only the words change («băng hà, thọ N tuổi» → nhường ngôi / bị phế / bị lật đổ), and no one is buried with
   a living Emperor (tuẫn táng off for these ends). Co-op: off (the Emperor's end stays muted in co-op, jmort rule). Old saves: S.re is made at load.
   Kit only: PEND cards (pid "re", kit act-card rows with odds words, KIT §28.6) + «Tin trong cung» news + log; art = approved event pictures (no new art).
   Measure: dev/measure/reignend.js (robot lives, LIVE vs branch) + dev/measure/reignend-sim.js (month loop). Test: dev/test/reignend.js. */
(function(){if(typeof BAL!=="object"||!BAL.re)return;
const RB=()=>BAL.re;
const cw=()=>!!(window.COOPW&&COOPW.on);
const REART={abd:"img/ev-trieu-chinh.webp",phe:"img/ev-trieu-chinh-2.webp",coup:"img/ev-am-muu.webp"};
function reOn(){return !!(S&&S.emp&&!S.dead&&!S.empDead&&!(S.succ&&S.succ.on)&&!cw()&&RB().on)}
function reS(){if(!S.re)S.re={a:0,F:{},seen:{},her:0};return S.re}
function reY(){const y0=S.reign&&S.reign.y0!=null?S.reign.y0:1;return S.year-y0}
function grip(){try{const W=typeof rgW==="function"?rgW():null;if(W)return W.p}catch(e){}return S.reign&&typeof S.reign.power==="number"?S.reign.power:50}
function canAct(){return !S.out&&!(typeof isSrv==="function"&&isSrv())}
/* the princes, in the court's order (j51 kvOrder: Thái tử, đích, trưởng, hiền); her own son has v = null */
function sons(){try{return kvOrder()}catch(e){return[]}}
function heir(){const h=S.heir&&S.heir.k&&S.heir.k.alive?S.heir:null;if(h)return{k:h.k,v:h.v||null};const o=sons();return o[0]?{k:o[0].k,v:o[0].v||null}:null}
function houseOfMom(v){try{return tdHouse(v||S)}catch(e){return null}}
function prince(c){const o=sons().filter(x=>houseOfMom(x.v)===c);return o[0]?{k:o[0].k,v:o[0].v||null}:null}
function hName(c){return `nhà ${(typeof TDOFF==="object"&&TDOFF[c])||c}`}
function hSung(c){let m=0;try{for(const p of tdMembers(c))if(p!==S)m=Math.max(m,p.sung||0)}catch(e){}if(houseOfMom(S)===c)m=Math.max(m,S.sung||0);return m}
/* a house's own drive (no typed numbers: BAL.re.amb): greed (a corrupt head), the head's skill, a prince of its blood */
function amb(c){const h=tdHead(c),A=RB().amb;if(!h)return 0;return Math.max(0,1+(h.corrupt?A.corrupt:0)+((h.sk||50)-50)*A.sk+(prince(c)?A.prince:0))}
function F(c){const R=reS();return R.F[c]=R.F[c]||{ev:0,pm:0,pl:0,her:0}}
function misrule(){let n=0;try{const T=trS(),B=RB().phe;if(T.bien<B.bad)n++;if(T.kho<B.bad)n++}catch(e){}if((S.emp.mood||0)>=2)n++;if(S.emp.ill)n++;return n}
function news(t,h){try{Q.push({t,kind:"news",h:`<p class="past">${typeof when==="function"?when():""}</p><p>${h}</p>`})}catch(e){}}
function sonTxt(h){if(!h)return"một vị hoàng đệ";const nm=String(h.k.name||"hoàng tử");return h.v?nm:`${nm}, con ngươi`}
/* ---------- NHƯỜNG NGÔI ---------- */
function abdGain(){const B=RB().abd,y=reY();if(y<RB().minY)return 0;const h=heir();const ha=h?h.k.age||0:0;let g=0;
 if(h){if(ha>=B.heirAge){g+=B.heir+(ha-B.heirAge)*B.heirK;if(!S.thDead)g+=B.th*(has("hieuthao")?B.hieu:1)}}else g+=B.noHeir;
 /* the court's petitions come in waves (more while Quốc sự is bad): petP % a month, pet each */
 if(roll(B.petP*(1+misrule())))g+=B.pet;
 const il=S.emp.ill;if(il&&il.st>=2)g+=B.ill*(il.mort?2:1);
 if((S.emp.age||0)>B.age)g+=((S.emp.age||0)-B.age)*B.old;
 if(y>B.yrs)g+=(y-B.yrs)*B.yr;
 if(h){const c=houseOfMom(h.v);if(c&&tdPow(c)>=B.courtPow)g+=B.court}
 /* his own temper (j1 ETRAITS): a ruler who loves the work clings to it, one who loves pleasure lets it go sooner */
 let tm=1;for(const t of (S.emp.traits||[]))if(B.temper[t])tm*=B.temper[t];
 return g*tm*Math.max(B.gripMin,1-B.gripK*(grip()-50)/50)}
function abdMonth(){const R=reS(),B=RB().abd;const g=abdGain();R.a=cl(R.a+(g>0?g:-B.decay),0,100);
 if(R.a>=B.warn&&!R.seen.abd){R.seen.abd=S.turn;if(canAct())card("abd");else news("Triều đình dâng sớ",`Triều thần dâng sớ xin Hoàng thượng sớm định ngôi cho ${sonTxt(heir())}.`)}
 if(R.a>=B.at)return end("abd",null,heir());return false}
/* ---------- PHẾ ---------- */
function pheMonth(c){const B=RB().phe,f=F(c),h=tdHead(c);if(!h)return false;const a=amb(c),mis=misrule();
 if(h.pow>=B.pow-B.evLead&&mis&&roll(B.evP*mis*a))f.ev=Math.min(B.evMax,f.ev+1);else if(!mis&&f.ev>0&&roll(B.evFade))f.ev--;
 const pr=prince(c);const ok=reY()>=RB().minY&&pr&&h.pow>=B.pow&&hSung(c)>=B.sung&&f.ev>=B.ev;
 if(!ok){f.pm=0;return false}
 f.pm++;if(f.pm===1){f.her=0;if(canAct())card("phe",c);else news("Sớ hặc long thể",`${hName(c)} dâng sớ kể ${f.ev} điều thất đức của Hoàng thượng, xin Thái hậu và tông thất xét việc phế lập.`)}
 if(f.pm<B.mo)return false;
 const o=oddsCl(Math.round(B.base+(h.pow-grip())/B.powD+(f.ev-B.ev)*B.evK+(S.thDead?0:B.th)+f.her));f.pm=0;
 if(roll(o))return end("phe",c,pr);
 fall(c,"phe");return false}
/* ---------- LẬT ĐỔ ---------- */
function coupMonth(c){const B=RB().coup,f=F(c),h=tdHead(c);if(!h)return false;const gap=h.pow-grip();
 const ok=reY()>=RB().minY&&h.pow>=B.pow&&gap>=B.gap&&amb(c)>=B.amb;
 if(!ok){f.pl=Math.max(0,f.pl-1);return false}
 f.pl++;if(f.pl===B.rum){f.her=0;if(canAct()&&(eyes(S)>=B.eyes||roll(B.rumP)||houseOfMom(S)===c))card("coup",c);else news("Tin đồn trong cung",`Cấm quân đổi gác liên tiếp; người ta thì thầm ${hName(c)} đang ngầm điều binh.`)}
 if(f.pl<B.mo)return false;
 const o=oddsCl(Math.round(B.base+(gap-B.gap)*B.k+(c==="Đại tướng quân"?B.army:0)+f.her));f.pl=0;
 if(roll(o))return end("coup",c,prince(c)||heir());
 fall(c,"coup");return false}
/* a failed case: the house falls (its power, its women's Sủng; a coup also costs them rank), the throne holds tighter */
function fall(c,k){const B=k==="coup"?RB().coup:RB().phe;let n=0;try{tdPowAdd(c,-B.fail);for(const p of tdMembers(c)){if(p===S)continue;spAdd(p,"sung",-B.sungLoss);if(k==="coup"&&!p.queen&&typeof punish==="function"){try{punish(p,"nhà ngoại mưu phản",2)}catch(e){}}n++}
 if(k==="coup"&&typeof rgPAdd==="function"){const W=rgW();if(W&&W.out){W.p=cl(W.p+B.gripWin,0,100);S.reign.power=Math.round(W.p)}else rgPAdd(B.gripWin)}}catch(e){console.error(e)}
 const F0=F(c);F0.ev=0;const mine=houseOfMom(S)===c,helped=F0.her>0&&F0.hm;let t=k==="coup"?`Binh biến của ${hName(c)} bị dẹp trước khi trời sáng. Chủ mưu bị bắt, ${n?`${n} phi tần trong nhà bị liên lụy`:"cả nhà bị tra xét"}.`:`Tông thất và triều thần bác sớ phế lập của ${hName(c)}. Nhà ấy thất thế${n?`, ${n} phi tần trong nhà bị lạnh nhạt`:""}.`;
 if(helped||mine){const P=RB().her;if(helped){apply({sung:-P.lose,danh:-P.lose});t+=" Ngươi từng tiếp tay, nay bị Hoàng thượng nghi kỵ."}else{apply({danh:-Math.round(P.lose/2)});t+=" Nhà ngoại của ngươi thất thế, ngươi cũng bị nghi."}}
 F0.her=0;F0.hm=0;log(`<b>${k==="coup"?"Lật đổ bất thành":"Phế lập bất thành"}</b>: ${t}`);news(k==="coup"?"Binh biến bị dẹp":"Sớ phế lập bị bác",t)}
/* ---------- the end: answer j3's monthly mortEmpDue → emperorDies (the existing succession flow) ---------- */
function end(k,c,h){const R=reS();R.end={k,c,hk:h?h.k.name:"",age:S.emp.age,y:reY(),t:S.turn};if(h)S.heir={k:h.k,v:h.v};
 if(S.mort){S.mort.empWhy=null;S.mort.empDue=null}try{(R.dl=R.dl||[]).push({k,y:R.end.y})}catch(e){}return true}
function reMonth(){if(!reOn())return false;reS();
 if(abdMonth())return true;
 let L=[];try{L=Object.keys(trS().H)}catch(e){}
 for(const c of L)if(coupMonth(c))return true;
 for(const c of L)if(pheMonth(c))return true;
 return false}
(function(){const d0=window.mortEmpDue;if(typeof d0!=="function")return;window.mortEmpDue=function(){const r=d0.apply(this,arguments);if(r)return r;try{return reMonth()}catch(e){console.error(e);return false}}})();
/* ---------- words of the end (the emperorDies flow, its j99succ card, her fate) ---------- */
function rePh(R){const n=hName(R.c);return R.k==="abd"?"nhường ngôi, lui về làm Thái thượng hoàng":R.k==="phe"?`bị ${n} cùng tông thất phế truất, giam lỏng ở Tây uyển`:`bị ${n} dấy binh lật đổ, phải rời ngai vàng`}
function reTitle(R){return R.k==="abd"?"Hoàng thượng nhường ngôi":R.k==="phe"?"Hoàng thượng bị phế":"Binh biến đổi ngôi"}
function reTx(t){const R=S&&S.re&&S.re.end;if(!R||typeof t!=="string")return t;const ph=rePh(R);
 return t.replace(/băng hà, thọ (\d+) tuổi/g,(m,a)=>`${ph}, năm ấy ${a} tuổi`)
  .replace(/Tiên đế không có hoàng tử nối ngôi, thân vương vào kế vị/g,R.k==="abd"?"Ngài không có hoàng tử, truyền ngôi cho hoàng đệ":`${hName(R.c)} rước một vị thân vương lên ngôi`)
  .replace(/([Dd])i chiếu truyền ngôi cho/g,(m,d)=>R.k==="abd"?(d==="D"?"Chiếu":"chiếu")+" nhường ngôi truyền cho":(d==="D"?"Triều":"triều")+" thần tôn lập")
  .replace(/tuẫn táng theo tiên đế/g,"tự vẫn").replace(/Tiên đế băng hà/g,reTitle(R)).replace(/băng hà/g,R.k==="abd"?"nhường ngôi":R.k==="phe"?"bị phế":"bị lật đổ")}
window.reTx=reTx;
(function(){const e0=emperorDies;emperorDies=function(ev){const R=S&&S.re&&S.re.end;if(!R||R.done)return e0.apply(this,arguments);R.done=1;
 const cur=over,L0=log,FT=BAL.mort&&BAL.mort.fate,tp=FT?FT.tuanP:null;
 over=function(h,t,fate,alive){over=cur;return cur.call(this,h,reTx(t),reTx(fate),alive)};log=function(x){return L0.call(this,reTx(x))};if(FT)FT.tuanP=0;
 try{return e0.call(this,reTx(ev))}finally{over=cur;log=L0;if(FT)FT.tuanP=tp}}})();
if(PEND.succ0)(function(){const p0=PEND.succ0;PEND.succ0=function(){const d=p0.apply(this,arguments);if(d&&S.re&&S.re.end)d.t=reTx(d.t);return d}})();
(function(){const s0=showModal;showModal=function(){const m=Q&&Q[0],R=S&&S.re&&S.re.end;
 if(!m||!R||m.pid!=="succ0"||typeof SUCC_ART!=="object")return s0.apply(this,arguments);
 m.t=reTitle(R);const a0=SUCC_ART["succ-card"];SUCC_ART["succ-card"]=REART[R.k];try{return s0.apply(this,arguments)}finally{SUCC_ART["succ-card"]=a0}}})();
/* ---------- her card (two-way, law 1; three roads of equal weight, laws 2/3) ---------- */
function line(cost,win,extra){return [cost?"tốn: "+cost:"",win?"được: "+win:"",extra||""].filter(Boolean).join(" · ")}
PEND.re=pp=>{try{if(!reOn())return null;const k=pp.k,c=pp.c,P=RB().her;const R=reS();
 if(k==="abd"){if(R.end)return null;const h=heir();const mine=h&&!h.v;
  const t=`<p>Hoàng thượng ${S.emp.age} tuổi, ở ngôi đã ${reY()} năm${S.emp.ill?", long thể lại bất an":""}. ${S.thDead?"Tông thất":"Thái hậu cùng tông thất"} và triều thần dâng sớ xin ngài sớm truyền ngôi cho ${sonTxt(h)}${h&&h.k.age?`, năm nay ${h.k.age} tuổi`:""}.</p><p>Hậu cung ai cũng biết: lời gối chăn lúc này nặng hơn trăm tờ sớ.</p>`;
  const o=[{n:"Dâng sớ xin Hoàng thượng giữ ngôi",fx:{danh:-P.danh},j67:line(fmt({danh:-P.danh}),fmt({sung:P.sung}),"Hoàng thượng chần chừ thêm"),go:()=>her("abd",null,-1)},
   {n:mine?"Cùng triều thần xin lập con làm tân quân":"Cùng triều thần xin lập tân quân",fx:{sung:-P.sung},j67:line(fmt({sung:-P.sung}),fmt(Object.assign({danh:P.danh},S.thDead?{}:{th:P.th})),"ngày đổi ngôi đến sớm hơn"),go:()=>her("abd",null,1)},
   {n:"Giữ mình, không nói vào",fx:{},j67:line("",fmt({duc:P.duc}),"triều cục tự định"),go:()=>her("abd",null,0)}];
  return{t,o,who:pEmp()}}
 const f=F(c),h=tdHead(c);if(!h)return null;const mine=houseOfMom(S)===c,pr=prince(c);const nm=hName(c);
 const prN=pr?(pr.v?`${pr.k.name}, con của ${typeof kitKnownName!=="function"||kitKnownName(pr.v)?pr.v.name:"một vị phi tần"}`:`${pr.k.name}, con ngươi`):"";
 const t=k==="phe"?`<p>${mine?"Phụ thân ngươi, ":""}${TDOFF[c]||c} ${h.name} cùng môn sinh, họ hàng trong triều dâng sớ kể ${f.ev} điều thất đức của Hoàng thượng${pr?`, xin tông thất phế lập, tôn ${prN} lên ngôi`:""}.</p><p>Tông thất sẽ hội nghị trong ${RB().phe.mo} tháng.${mine?" Phụ thân gửi thư vào cung hỏi ý ngươi.":""}</p>`
  :`<p>${mine?"Thư nhà mang về một tin dữ: phụ thân ngươi":`Người của ngươi báo về: ${nm}`} đang ngầm điều binh, thế lực đã lấn cả ngai vàng${pr?`; họ định tôn ${prN}`:""}.</p><p>Nếu không ai ngăn, chỉ vài tháng nữa cửa cung sẽ mở trong đêm.</p>`;
 const stop=k==="phe"?"Mật tấu với Hoàng thượng":"Mật báo cấm quân";const help=k==="phe"?`Ngầm tiếp tay ${nm}`:`Ngầm mở đường cho ${nm}`;
 const o=[{n:stop,fx:{},j67:line(mine?"phụ thân giận":`${nm} thành kẻ thù`,fmt({sung:P.sung}),k==="phe"?"sớ phế lập khó thành":"binh biến khó thành"),go:()=>her(k,c,-1)},
  {n:help,fx:{bac:-P.bac},j67:line(fmt({bac:-P.bac}),`${mine?"phụ thân":nm} đứng sau ngươi`,`<span class="r">nếu hỏng: ${fmt({sung:-P.lose,danh:-P.lose})}</span>`),go:()=>her(k,c,1)},
  {n:"Giữ mình, không nói vào",fx:{},j67:line("",fmt({duc:P.duc}),"triều cục tự định"),go:()=>her(k,c,0)}];
 let who=null;try{who=pMin(h)}catch(e){}return{t,o,who:who||pEmp()}}catch(e){console.error(e);return null}};
function card(k,c){const d=mkP("re",{k,c});if(!d)return false;Q.push({t:k==="abd"?"Triều cục · Sớ xin nhường ngôi":k==="phe"?"Triều cục · Sớ phế lập":"Triều cục · Mưu biến",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,headArt:REART[k]});try{evBusyMark()}catch(e){}return true}
/* the card's cost (fx) is paid by chooseM; her() pays the gains and moves the case */
function her(k,c,s){const P=RB().her,R=reS();let t="";
 if(k==="abd"){if(s<0){apply({sung:P.sung});R.a=Math.max(0,R.a-P.blk);t="Ngươi dâng sớ xin Hoàng thượng giữ ngôi; ngài cảm động, gác chuyện truyền ngôi lại."}
  else if(s>0){apply(Object.assign({danh:P.danh},S.thDead?{}:{th:P.th}));R.a=Math.min(100,R.a+P.psh);t="Ngươi cùng triều thần xin lập tân quân; Hoàng thượng lặng thinh, nhưng đã cho gọi Thái tử vào hầu."}
  else{apply({duc:P.duc});t="Ngươi giữ mình, không nói vào chuyện ngôi báu."}
  log(`Triều cục · Sớ xin nhường ngôi: ${t}`);return}
 const f=F(c),h=tdHead(c),mine=houseOfMom(S)===c,nm=hName(c);
 if(s<0){apply({sung:P.sung});f.her-=P.od;if(k==="phe")f.ev=Math.max(0,f.ev-P.evCut);else f.pl=Math.max(0,f.pl-1);if(h){h.af=h.af||{};h.af[key(S)]=cl((h.af[key(S)]||0)-P.af,-100,100)}
  try{for(const p of tdMembers(c))if(p!==S)relAdd(p,S,-P.rel)}catch(e){}
  t=k==="phe"?`Ngươi mật tấu với Hoàng thượng; ${nm} mất mấy chứng cứ, coi ngươi là kẻ thù.`:`Ngươi mật báo cấm quân; ${nm} phải hoãn binh, coi ngươi là kẻ thù.`}
 else if(s>0){f.her+=P.od;f.hm=1;if(h){h.af=h.af||{};h.af[key(S)]=cl((h.af[key(S)]||0)+P.af,-100,100)}
  t=`Ngươi ngầm tiếp tay ${nm}; ${mine?"phụ thân":"nhà ấy"} ghi nhớ.`}
 else{apply({duc:P.duc});t="Ngươi giữ mình, không nói vào chuyện ngôi báu."}
 log(`Triều cục · ${k==="phe"?"Sớ phế lập":"Mưu biến"}: ${t}`)}
window.reDbg={reMonth,abdGain,amb,prince,heir,reY,grip,F,card,end,fall};
})();
