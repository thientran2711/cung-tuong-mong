/* ================= jpetlife: TUỔI THỌ THÚ NUÔI — pets live and die like people (owner 16/11 18:15Z idea, 18:50Z approval, OD:L1143 mirror) =================
   Numbers: BAL.pet.life (one core, OD:L1267). Pure core between CORE markers (dev/measure/pet-life-sim.js reuses it in node).
   1. LIFESPAN: every pet (hers, every NPC's — NPC agent law OD:L1386: same roll, same rule) rolls ONE lifespan the first time this file sees it
      (P.life = years, P.lifeW = week of that year it ends), from BAL.pet.life.dice[group of its species] (bell curve {mean,sd,lo,hi}),
      conditioned on being above its present age. Species → group: BAL.pet.life.grp (small beasts shortest, birds / fish longer, the crane and the
      tier-3 spirit beasts long, the three Ngự tứ divine pets very long but NOT immortal). Age = weeks owned (P.at, the same clock as the growth
      stages), BAL.pet.life.wY weeks a year. Old saves: a pet without P.at gets the youngest age its stage allows; its first roll leaves it at least
      BAL.pet.life.floorW weeks.
   2. GIÀ (old): from the group's `old` years on, the pet is Già (P.old=1), shown as its stage ("Già") — it keeps its growth stage's effect
      (Linh thú stays Linh thú in what it does) but tires faster: No / Sạch / Vui fall × BAL.pet.life.oldDecay each week. Becoming old = one quiet card.
   3. DEATH by fate when the lifespan ends (số trời). Care lengthens it only a little: each pet-year with Khí lực (P.care) ≥ careOk and Tình cảm ≥
      careAff gives careP % for +1 year, total never above the group's careMax (HARD CEILING); a year with Khí lực < careLapse takes one gained
      year back. Neglect deaths (jpetcare) stay as they are.
   4. FAREWELL: her pet → a quiet kit notice card (rare event, owner 16/11 17:25Z: big frame only for rare things) with the pet's picture, the grave
      under the plum tree and the keepsake: item `petkv` (Kỷ vật, never sold / given; the picture reuses the kit painting of the sachet, tuithom).
      NPC pets: a log line, the keepsake in the NPC's chest. No punishment: an old-age death never triggers the Thái hậu "lost her gift" rule (jpet
      petLose, src "th") — that rule stays for neglect / harm / theft only. A Ngự tứ pet that dies takes its ĐỠ MỘT MẠNG with it; NO compensation
      (owner 16/11 18:50Z, verbatim scope).
   5. Co-op: her own pets roll locally; NPC pets roll and die on the host only (jmort convention), the guest mirrors the host's state. */
Object.assign(BAL.pet,{life:{on:1,wY:36,floorW:4,oldDecay:1.4,careOk:70,careAff:50,careP:25,careLapse:40,giaArt:0,
 /* years: mean / sd / lo / hi of the bell curve; old = age the pet turns Già; careMax = most years care can add (hard ceiling) */
 dice:{thu:{mean:12,sd:3,lo:6,hi:20,old:9,careMax:1},chim:{mean:15,sd:4,lo:7,hi:25,old:11,careMax:1},ca:{mean:18,sd:5,lo:8,hi:30,old:13,careMax:1},
  hac:{mean:30,sd:7,lo:18,hi:45,old:22,careMax:2},linh:{mean:28,sd:7,lo:15,hi:45,old:21,careMax:2},than:{mean:40,sd:10,lo:22,hi:70,old:30,careMax:3}},
 grp:{meomuop:"thu",cho:"thu",tho:"thu",meo:"thu",sutu:"thu",linhmieu:"thu",hoami:"chim",sao:"chim",uyenuong:"chim",vet:"chim",camke:"chim",
  cavang:"ca",cachep:"ca",lyngu:"ca",hac:"hac",cuuvi:"linh",thienma:"linh",ngoctho:"linh",phuong:"linh",bachloc:"than",kylan:"than",thanhlong:"than"},
 oldN:"Già"}});
/*CORE{*/
function plGauss(){let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
function plDice(k){const L=BAL.pet.life;return L.dice[L.grp[k]]||L.dice.thu}
/* one lifespan in whole years for species k, not below `min` years (conditioned: redraw) */
function plRoll(k,min){const c=plDice(k);for(let i=0;i<200;i++){const x=Math.floor(Math.max(c.lo,Math.min(c.hi,c.mean+c.sd*plGauss())));if(x>=min)return x}return Math.ceil(min)}
/* the pet-year tick of care: returns the new care years (never above careMax, never below 0) */
function plCareYear(P,k){const L=BAL.pet.life,c=plDice(k),x=P.lifeX||0;
 if((P.care||0)>=L.careOk&&(P.aff||0)>=L.careAff&&x<c.careMax&&Math.random()*100<L.careP)return x+1;
 if((P.care||0)<L.careLapse&&x>0)return x-1;return x}
/*}CORE*/
(function(){if(typeof BAL!=="object"||!BAL.pet||!BAL.pet.life||typeof petWeek!=="function")return;const L=BAL.pet.life;
const cw=()=>window.COOPW&&COOPW.on,host=()=>!cw()||COOPW.seat==="a";
const owners=()=>[S].concat(typeof petNpcs==="function"?petNpcs():liveRivals(true));
function ageW(P){return Math.max(0,tsbWk()-(P.at||0))}
function ageY(P){return Math.floor(ageW(P)/L.wY)}
/* give P a lifespan once (old save: an age that fits its stage, at least floorW weeks left) */
function plAssign(P){if(!P||P.life>0||!P.t)return P;const k=petK(P.t);
 if(P.at==null){const s=typeof petStage==="function"?petStage(P):0;P.at=tsbWk()-((BAL.pet.ageW&&BAL.pet.ageW[s])||0)}
 const w=ageW(P),min=(w+L.floorW)/L.wY;P.life=plRoll(k,min);P.lifeW=Math.floor(Math.random()*L.wY);
 if(P.life*L.wY+P.lifeW<w+L.floorW)P.lifeW=Math.min(L.wY-1,w+L.floorW-P.life*L.wY);P.lifeY=ageY(P);P.old=ageY(P)>=plDice(k).old?1:0;return P}
function plEnd(P){return P.life*L.wY+(P.lifeW||0)}
/* the stage word shown for a pet: Già over its growth stage (jpetcare petcStageN) */
window.petcStageN=function(P){try{if(P&&P.old)return L.oldN}catch(e){}return BAL.pet.stages[typeof petStage==="function"?petStage(P):0]};
/* the keepsake: a small sachet holding a little fur / feather / scale of the pet; never sold, never given (keep), no effect */
try{IT.petkv={n:"Túi kỷ vật",kd:"Kỷ vật",d:"Túi thơm nhỏ giữ chút lông, vảy của thú nuôi đã khuất · không bán, không tặng",pr:0,keep:1,tg:[]};
 if(typeof ITIMG==="object"&&ITIMG)ITIMG.petkv=ITIMG.tuithom||"tuithom";
 const n0=iname;iname=function(e){const r=n0.apply(this,arguments);return e&&e.k==="petkv"&&e.of?`${r} (${e.of})`:r}}catch(e){console.error("petkv",e)}
/* the Thái hậu gift line names what still costs her favour: neglect / harm / loss, never old age */
try{for(const k of ["hac","kylan"])if(PET[k]&&PET[k].bad)PET[k].bad=PET[k].bad.replace(/để chết hay bị hại|để mất/,"để chết vì bỏ bê, bị hại hay để mất (chết già thì không)")}catch(e){}
/* death ledger for audits / bots: S.petDl = [{k species, a age years, x care years, who me|npc, y year}] (last 300) */
function note(p,P){try{(S.petDl=S.petDl||[]).push({k:petK(P.t),a:ageY(P),x:P.lifeX||0,who:p===S?"me":"npc",y:S.year});if(S.petDl.length>300)S.petDl.shift()}catch(e){}}
function farewell(P,T,y){const facts=[`${T.n} đã ở bên ngươi ${y} năm, đêm qua nằm yên trong ổ, ra đi thanh thản.`,
  `Ngươi cho chôn nó dưới gốc mai sau cung, giữ lại một túi kỷ vật.`];if(T.rescue)facts.push("Phúc đỡ một mạng của thần thú cũng theo nó mà đi.");
 setTimeout(()=>{try{if(typeof petcFx==="function")petcFx();kitModal({kind:"notice",title:`Tiễn biệt ${T.n.replace(/^./,c=>c.toLowerCase())}`,sub:`${L.oldN} · ${PET_TIER[T.tr]}`,
  itemPic:typeof petcPic==="function"?petcPic(P,true):"",facts})}catch(e){console.error("pet farewell",e)}},60)}
function oldCard(P,T){setTimeout(()=>{try{if(typeof petcFx==="function")petcFx();kitModal({kind:"notice",title:`${T.n} đã già`,sub:`${L.oldN} · ${PET_TIER[T.tr]}`,
  itemPic:typeof petcPic==="function"?petcPic(P,true):"",facts:[`Công dụng vẫn giữ như cũ, nhưng nó mau mệt: No, Sạch, Vui hao nhanh hơn, phải chăm nhiều hơn.`,"Chăm khéo thì nó ở thêm với ngươi được ít lâu; tuổi trời đã định, không giữ mãi được."]})}catch(e){}},60)}
/* one pet dies of old age: remove it the way jpet does, with no Thái hậu penalty (src cleared first), keepsake to the owner */
function die(p,i,P){const me=p===S,T=petT(P),y=ageY(P);note(p,P);P.src="";
 const n=petLose(p,i,"qua đời vì tuổi già");if(!n)return;
 try{(p.inv=p.inv||[]).push({k:"petkv",of:T.n})}catch(e){}
 if(me){log(`<span class="r">${T.n} của ngươi đã qua đời vì tuổi già (${y} năm). Ngươi chôn nó dưới gốc mai, giữ lại túi kỷ vật.</span>`);if(tsbOn()&&!tsbBot())farewell(P,T,y)}
 else try{log(`${NM(p)}: ${T.n.toLowerCase()} của nàng đã chết già.`)}catch(e){}}
function plWeek(){if(!L.on||!S||S.dead)return;const D=BAL.pet.decay,ex=L.oldDecay-1;
 for(const p of owners()){const me=p===S;if(!me&&!host())continue;const Lp=tsbPets(p);
  for(let i=Lp.length-1;i>=0;i--){const P=plAssign(Lp[i]);if(!P||!P.t)continue;const k=petK(P.t),c=plDice(k),y=ageY(P);
   /* a new pet-year: care adds a little (hard ceiling) or a lapse takes it back */
   if(y>(P.lifeY|0)){for(let n=(P.lifeY|0);n<y;n++){const x0=P.lifeX||0,x=plCareYear(P,k);if(x!==x0){P.life+=x-x0;P.lifeX=x;if(plEnd(P)<ageW(P))P.life=Math.ceil(ageW(P)/L.wY)}}P.lifeY=y}
   if(ageW(P)>=plEnd(P)){die(p,i,P);continue}
   if(!P.old&&y>=c.old){P.old=1;try{log(`${me?"":NM(p)+": "}${petT(P).n} đã già.`)}catch(e){}if(me&&tsbOn()&&!tsbBot())oldCard(P,petT(P))}
   /* old pets tire faster: the extra share of the week's fall (the base fall ran in jpetcare petWeek) */
   if(P.old&&ex>0&&P.full!=null){P.full=cl(P.full-D.full*ex,0,100);P.clean=cl(P.clean-D.clean*ex,0,100);P.joy=cl(P.joy-D.joy*ex,0,100);if(typeof petcSync==="function")petcSync(P)}}}}
const w0=petWeek;petWeek=function(){const r=w0.apply(this,arguments);try{plWeek()}catch(e){console.error("petlife week",e)}return r};
/* a new pet gets its lifespan lazily (next week / its card): a stolen pet first takes its old P.at (jpetcare petsteal), then rolls */
/* old saves: roll once at load */
const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(L.on)for(const p of owners())for(const P of tsbPets(p))plAssign(P)}catch(e){}return r};
/* the pet card (one kit table, KIT §51): Già on the "Lớn" row, the pet's age, and what old age costs */
const r0=petRowsL;petRowsL=function(P,i){const R=r0.apply(this,arguments);try{if(!L.on||!P)return R;plAssign(P);const y=ageY(P),w=ageW(P)%L.wY;
 const age=["Tuổi",[`${y?`${y} năm `:""}${w} tuần${P.old?` · ${L.oldN}: mau mệt, No, Sạch, Vui hao nhanh hơn`:""}`],"n"];
 const j=R.findIndex(r=>r&&r[0]==="Lớn");if(j>=0){if(P.old)R[j]=["Lớn",`<b>${L.oldN}</b> (${BAL.pet.stages[petStage(P)]})`];R.splice(j+1,0,age)}else R.push(age)}catch(e){}return R};
/* the Già picture: switch giaArt (img/pet512/pet-<key>-gia.webp from Foreman C, KIT REQUEST) — until then the growth-stage picture */
if(typeof petcStageSrc==="function"){const s0=petcStageSrc;petcStageSrc=function(P,big){const a=s0.apply(this,arguments);try{if(L.giaArt&&P&&P.old){const k=petK(P.t);return{src:`img/${big?"pet512/":""}pet-${k}-gia.webp`,fb:a.src,scale:1}}}catch(e){}return a}}
window.plAssign=plAssign;window.plWeek=plWeek;window.plAgeY=ageY})();
