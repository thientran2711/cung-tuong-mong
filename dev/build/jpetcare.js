/* ================= jpetcare: THÚ NUÔI LỚN LÊN + CHĂM NHƯ THÚ ẢO + THÚ CỦA NGƯỜI KHÁC (owner 15/11, review/pet-care) — numbers in BAL.pet =================
   1. FOUR stages: Non → Thiếu niên → Trưởng thành → Linh thú, by TIME OWNED (BAL.pet.ageW tuần) and TÌNH CẢM (BAL.pet.affNeed). Each stage unlocks
      more: Non = only cheers the palace (Sức +1 a week); Thiếu niên = the species' own use, weaker (× BAL.pet.mul[1]); Trưởng thành = full use;
      Linh thú = stronger use (× mul[3]) and, for Ngự tứ, ĐỠ MỘT MẠNG (only at Linh thú). petT(P) returns the stage's effects (the one source the rules read).
      The pet card shows the stage, what works now and what the next stage unlocks + its requirement. Growing up = an immediate card. Linh thú = its own picture (-lt), no code glow (owner).
   2. CARE like a virtual pet: P.full (No; owner 15/11 ~22:30Z: label stays "No", higher = better), P.clean (Sạch), P.joy (Vui), P.aff (Tình cảm) 0..100; P.care (khí lực, read by jpet) = the mean of
      No/Sạch/Vui. "Chăm" opens a full-screen kit view: the pet big (stage art img/pet512/pet-<key>-non|-tn|(grown)|-lt, falling back to the grown art,
      smaller for the young), the four bars, and three short games, each BAL.pet.khac khắc — Cho ăn (drag the food this species eats onto it),
      Tắm / chải lông (even strokes), Chơi (tap when the toy passes the middle). Score = how she plays (no dice). A trusted servant can be put in
      charge (BAL.pet.maidEff of the gain, every week, 4 weeks). Stats fall every week (BAL.pet.decay); long neglect (mean < BAL.pet.sad) → an omen
      card, then sick (Sức of the pet's use off), then after BAL.pet.neglectW weeks it runs away / fades (immediate card).
   3. Other palaces (NPC consorts and the co-op friend, relayed by jcoopworld res.pet): Giúp chăm thú (petcare) — her khắc, the owner's thiện cảm +;
      Hại thú (thaopet, jpet) as before; Trộm thú (petsteal) — odds fall with the pet's stage (BAL.pet.stealO), bites (Sức −), alarm, caught
      (Danh, oán, chứng cứ); a stolen pet keeps its stage with tình cảm BAL.pet.stolenAff. NPCs use the same acts on her (and each other).
   4. NPCs: same stages and stats (data only, they feed when they have the bạc). Old saves: stage from the time already owned, stats from khí lực. */
Object.assign(BAL,{pet:{freeHiSung:3,/* Sủng lost when she sends back a pet the Emperor gave (jpet free) */stages:["Non","Thiếu niên","Trưởng thành","Linh thú"],ageW:[0,8,20,40],affNeed:[0,25,50,80],mul:[0,.6,1,1.4],
 decay:{full:14,clean:9,joy:11,aff:2},khac:1,gain:{feed:[12,40],bath:[10,40],play:[8,36]},affGain:[2,6],maidEff:.5,maidW:4,sad:30,sick:15,neglectW:3,
 helpRel:6,helpGain:25,stealO:[55,38,22,8],stealBite:[6,10,16,24],stealSuc:8,stealCaughtDanh:6,stolenAff:5,npcCare:.8,/* role-parity-bundle-fix (law 1 + law 4): who an NPC CHOOSES to help — p3PetFr (jagacts3, AG plan) asks rel ≥ helpFr, the mind menu (below) rel ≥ helpMind; the act gate ACT.petcare.ok is ONE gate for her and an NPC */helpFr:10,helpMind:20}});
const PETC_FOOD={meo:"cá",cho:"xương",chim:"hạt kê",tho:"cà rốt",ca:"mồi bánh",ho:"thịt",lan:"quả linh",phuong:"hạt ngô đồng",long:"ngọc châu",loc:"cỏ linh chi",hac:"cá nhỏ"};
function petcKind(k){k=String(k||"");return /meo|mieu/.test(k)?"meo":/cho|sutu/.test(k)?"cho":/hoami|sao|vet|uyen|camke|ke/.test(k)?"chim":/tho/.test(k)?"tho":/cavang|cachep|lyngu|ly/.test(k)?"ca":/cuuvi|ho/.test(k)?"ho":/kylan|lan/.test(k)?"lan":/phuong/.test(k)?"phuong":/thanhlong|long/.test(k)?"long":/loc|thienma|ma/.test(k)?"loc":/quy|hac/.test(k)?"hac":"meo"}
const PETC_FOODS=Object.values(PETC_FOOD).filter((x,i,a)=>a.indexOf(x)===i);
/* ---------- stats / stage ---------- */
function petcInit(P){if(!P||P.full!=null)return P;const c=P.care!=null?P.care:80;P.full=c;P.clean=c;P.joy=c;P.aff=P.aff!=null?P.aff:Math.round(c/2);
 if(P.stg==null){const age=Math.max(0,tsbWk()-(P.at||0));let s=0;for(let i=1;i<4;i++)if(age>=BAL.pet.ageW[i])s=i;P.stg=Math.min(s,2)}return P}
function petcSync(P){P.care=Math.round((P.full+P.clean+P.joy)/3);return P}
function petStage(P){petcInit(P);return P.stg|0}
function petcNext(P){const s=petStage(P);if(s>=3)return null;const need=s+1;return{s:need,age:BAL.pet.ageW[need],aff:BAL.pet.affNeed[need],ageNow:Math.max(0,tsbWk()-(P.at||0)),affNow:Math.round(P.aff||0)}}
const PETC_MAIN=["sniff","guard","beast","sungN","anN","omen","th","spy","soft","rescue"];
const PETC_CACHE={};
/* Ngự tứ: ĐỠ MỘT MẠNG only at Linh thú (coordinator s7, 15/11 20:05Z; Trưởng thành does not) — the base text says so, younger stages drop it */
const PETC_RESCUE=/(khi đã thành Linh thú thì )?ĐỠ MỘT MẠNG[^;·]*;?\s*/;
function petcStageT(T,s,k){const key=k+"|"+s;if(PETC_CACHE[key])return PETC_CACHE[key];const X=Object.assign({},T);const m=BAL.pet.mul[s];
 if(s===0){for(const f of PETC_MAIN)delete X[f];X.suc=Math.max(BAL.eff.jpetcare.babySuc,T.suc||0);X.use=`còn non: chỉ làm cung thêm vui (Sức ${balSg(BAL.eff.jpetcare.babySuc)} mỗi tuần) · lớn lên mới ${T.rescue?String(T.use).replace(PETC_RESCUE,"")+" · đỡ một mạng: chỉ khi thành Linh thú":T.use}`}
 else{for(const f of PETC_MAIN){if(X[f]==null||f==="rescue")continue;if(Array.isArray(X[f]))X[f]=[Math.round(X[f][0]*m),X[f][1]];else X[f]=f==="sniff"?oddsCl(Math.round(X[f]*m)):Math.max(1,Math.round(X[f]*m))}
  if(T.rescue&&s<3){delete X.rescue;X.use=String(T.use).replace(PETC_RESCUE,"")+" · đỡ một mạng: chỉ khi thành Linh thú"}
  if(T.rescue&&s===3)X.use=String(T.use).replace("khi đã thành Linh thú thì ","")
  X.use=(s===1?"còn nhỏ, công dụng yếu: ":s===3?"Linh thú, công dụng mạnh: ":"")+(X.use||T.use)}
 return PETC_CACHE[key]=X}
(function(){const t0=petT;petT=function(P){const T=t0.apply(this,arguments);try{if(P&&typeof P==="object"&&P.t)return petcStageT(T,petStage(P),petK(P.t))}catch(e){}return T}})();
(function(){const a0=petAdd;petAdd=function(p,t,from,src){const P=a0.apply(this,arguments);try{if(P){P.full=75;P.clean=75;P.joy=65;P.aff=src==="stolen"?BAL.pet.stolenAff:15;P.stg=0;petcSync(P)}}catch(e){}return P}})();
function petcStageSrc(P,big){const k=petK(P.t),s=petStage(P),suf=["-non","-tn","","-lt"][s];return{src:`img/${big?"pet512/":""}pet-${k}${suf}.webp`,fb:petSrc(k,big),scale:[.62,.8,1,1][s]}}
function petcEffects(P){const T=petT(P);const L=[];if(T.suc)L.push(`Sức +${T.suc} mỗi tuần`);if(T.sniff)L.push(`đánh hơi đồ ăn lạ: ${chanceW(T.sniff)}`);if(T.guard)L.push("canh cửa cung");if(T.beast)L.push("đuổi thú dữ");
 if(T.sungN)L.push(`${sgStat(T.sungN)} mỗi đêm thị tẩm`);if(T.anN)L.push(`Ân tình +${T.anN} mỗi đêm thị tẩm`);if(T.omen)L.push(`điềm lành: Danh +${T.omen[1]}`);if(T.th)L.push(`Thái hậu +${T.th} mỗi tháng`);
 if(T.spy)L.push("nghe lén");if(T.soft)L.push("bớt oán người ghét ngươi");if(T.rescue)L.push("ĐỠ MỘT MẠNG");return L}
function petcNextTxt(P){const n=petcNext(P);if(!n)return"đã là Linh thú";const base=PET[petK(P.t)]||{};const T2=petcStageT(base,n.s,petK(P.t));const now=petcEffects(P);
 const gain=petcEffects({t:P.t,stg:n.s,full:1}).filter(x=>!now.includes(x));
 return `${BAL.pet.stages[n.s]}: ${gain.length?gain.join(", "):"công dụng mạnh hơn"} · cần nuôi ${n.age} tuần (đã ${n.ageNow}), tình cảm ${n.aff} (có ${n.affNow})`}
function petcGrow(p,P,quiet){const n=petcNext(P);if(!n||n.ageNow<n.age||(P.aff||0)<n.aff)return false;P.stg=n.s;
 if(p===S&&!quiet&&!tsbBot())petcGrowCard(P);
 try{log(`${p===S?"":NM(p)+": "}${petT(P).n} lớn lên thành ${BAL.pet.stages[P.stg]}.`)}catch(e){}return true}
function petcPic(P,big){const a=petcStageSrc(P,1);const T=petT(P);return kitItem({src:a.src,name:"",grade:T.tr,size:"lg"}).replace('<span class="kitn"></span>','')}
function petcFx(){try{if(typeof kitSfx==="function")kitSfx("notice");else if(typeof sfx==="function")sfx("sfx-notice")}catch(e){}} /* the old "chime" name had no file (404) */
/* ---------- the week: decay, servant care, NPC care, omen → sick → gone; growth ---------- */
petWeek=function(){for(const p of [S].concat(typeof petNpcs==="function"?petNpcs():liveRivals(true))){const L=tsbPets(p);if(!L.length)continue;const me=p===S;
  if(p.out){for(let i=L.length-1;i>=0;i--)petLose(p,i,"Nội vụ phủ thu lại khi vào lãnh cung");if(me)log(`<span class="r">Vào lãnh cung, thú nuôi của ngươi bị Nội vụ phủ thu lại hết.</span>`);continue}
  const winter=S.month>=10,D=BAL.pet.decay;
  for(let i=L.length-1;i>=0;i--){const P=petcInit(L[i]),T=petT(P);let ex=0;if(T.pond&&rkOf(p)<3)ex+=4;if(T.weak&&winter)ex+=5;
   P.full=cl(P.full-D.full-ex,0,100);P.clean=cl(P.clean-D.clean,0,100);P.joy=cl(P.joy-D.joy-ex,0,100);P.aff=cl(P.aff-D.aff,0,100);
   if(me&&P.maidW&&P.maidW>tsbWk()){const m=BAL.pet.maidEff;P.full=cl(P.full+D.full*2*m,0,100);P.clean=cl(P.clean+D.clean*2*m,0,100);P.joy=cl(P.joy+D.joy*2*m,0,100)}
   if(!me){const can=(p.bac||0)>=(T.up||0);const k=BAL.pet.npcCare*(can?1:.4);P.full=cl(P.full+D.full*1.2*k,0,100);P.clean=cl(P.clean+D.clean*1.2*k,0,100);P.joy=cl(P.joy+D.joy*1.2*k,0,100);P.aff=cl(P.aff+3*k,0,100)}
   petcSync(P);
   if(petOk(P)&&T.suc){if(me)S.suc=cl(S.suc+T.suc,0,sucCap(S));else p.suc=cl((p.suc||0)+T.suc,0,sucCap(p))}
   if(T.al&&p.asthma){if(me)S.suc=cl(S.suc+BAL.eff.jpet.sucAsthma,0,sucCap(S));else p.suc=cl((p.suc||0)+BAL.eff.jpet.sucAsthma,0,sucCap(p))}
   if(P.care<BAL.pet.sad){P.bad=(P.bad||0)+1;if(me&&P.bad===1&&tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi biếng ăn",who:typeof pMe==="function"?pMe():null,h:`<p>${T.n} nằm lì một góc, lông xơ, không buồn ăn. Phải chăm ngay kẻo ốm.</p>`})}
   else P.bad=0;
   if(P.bad>=BAL.pet.neglectW||P.care<=0){const n=petLose(p,i,/hoami|sao|vet|uyenuong|phuong|camke|hac|thanhlong/.test(P.t)?"bay mất vì bỏ bê":"bỏ đi vì bỏ bê");
    if(me&&n){log(`<span class="r">${tsbCap(n)} của ngươi bị bỏ bê lâu ngày, đã bỏ đi.</span>`);if(tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi bỏ đi",who:typeof pMe==="function"?pMe():null,h:`<p class="r">${n} bị bỏ bê lâu ngày, sáng nay không thấy đâu nữa.</p>`})}continue}
   petcGrow(p,P,!me)}}};
/* ---------- the care screen ---------- */
const PETC={i:-1,game:null,kind:"",rdy:0};
/* THE CARE SCREEN = the KIT 32.7 person dialog (same frame as the shop, kitShop 28.13d; review/pets-fix, KIT-first rule): the PET is the
   "person" — its stage picture full height in the left column at the kit figure scale, name chip under it; RIGHT: the four care numbers as
   kit stat cells with bars (kitStatRow, KIT 32.1), what it does now / next stage (kitRows), the mini-game in the kit mini-game frame
   (kitGameFrame, KIT 13: pieces are .kgbtn), then the act cards (pbtn). Closed by the kit ✕ (32.10). No style of its own. */
function petcBars(P){return kitStatRow([{cells:[["No",P.full],["Sạch",P.clean],["Vui",P.joy],["Tình cảm",P.aff]].map(([l,v])=>kitStatCell("",l,Math.round(v),{bar:Math.round(v),title:`${l} ${Math.round(v)}/100`}))}])}
function petcFig(){/* her pet picture: the old subject frame, or the figure column of the figure-left layout (.kszfig, KIT 56.7) */return document.querySelector("#modal .kpsubj.kes .kesimg")||document.querySelector("#modal .kpsubj.kes")||document.querySelector("#modal .kszfig .kszfs")||document.querySelector("#modal .kszfig")}
function petcOpen(i){const P=tsbPets(S)[i];if(!P)return;petcInit(P);PETC.i=i;PETC.game=null;const T=petT(P),s=petStage(P),a=petcStageSrc(P,1);
 try{if(!document.getElementById("modal").hidden)closeModal()}catch(e){}
 kitModal({kind:"info",title:`Chăm ${T.n.replace(/^./,c=>c.toLowerCase())}`,sub:`${(typeof petcStageN==="function"?petcStageN(P):BAL.pet.stages[s])} · ${PET_TIER[T.tr]}`,pick:true,
  stage:[{__fig:a.src,__cap:T.n,__role:(typeof petcStageN==="function"?petcStageN(P):BAL.pet.stages[s]),age:20,sex:"f",__pet:1}],html:`<div id="kpcare">${petcBody(P)}</div>`,onClose:()=>{kgTutDrop();PETC.i=-1;PETC.game=null;try{render()}catch(e){}}})}
function petcClose(){kgTutDrop();PETC.i=-1;PETC.game=null;try{closeModal()}catch(e){}try{render()}catch(e){}}
function petcBody(P,msg){const T=petT(P);const t1=whyTime(BAL.pet.khac);const m=tsbMaid(S);
 const g=(k,n,x)=>pbtn(`data-petc="${k}"`,n,`tốn: ${BAL.pet.khac} khắc · ${x}`,t1);
 return petcBars(P)+kitRows([["Công dụng",petcEffects(P).length?petcEffects(P):["làm cung thêm vui"],"g"],["Lớn tiếp",[petcNextTxt(P)],"n"]].concat(msg?[["Vừa rồi",[msg],"n"]]:[]))+
  `<div id="kpcgw"></div><div class="rbtn">${g("feed","Cho ăn",`thành: No tăng, Tình cảm tăng · chọn đúng món ${T.n.toLowerCase()} ăn, kéo vào nó`)}${g("bath","Tắm, chải lông","thành: Sạch tăng · vuốt dọc lông nó 5 lần, đều tay")}${g("play","Chơi",`thành: Vui tăng, Sức ${balSg(BAL.eff.jpetcare.playSuc)} · chạm đúng quả cầu đang sáng (3 lần)`)}`+
  (m?pbtn(`data-petc="maid"`,`Giao ${m.name} chăm`,`thành: ${BAL.pet.maidW} tuần, mỗi tuần đỡ một nửa phần hao · kèm: không thêm tình cảm`,P.maidW>tsbWk()?`${m.name} đang chăm`:""):"")+`</div>`}
function petcDraw(msg){const box=document.getElementById("kpcare");const P=tsbPets(S)[PETC.i];if(!box||!P){petcClose();return}kgTutDrop();PETC.game=null;box.classList.remove("kg-open");box.innerHTML=petcBody(P,msg);try{if(typeof kitFix==="function")kitFix(box)}catch(e){}}
/* the game area: the kit mini-game frame inside the dialog; returns its box */
function petcGameBox(title,how,kind){const w=document.getElementById("kpcgw");if(!w)return null;{const c=document.getElementById("kpcare");if(c)c.classList.add("kg-open")}/* care info folds away while the frame is open (class, not :has: perf) */w.innerHTML=kitGameFrame({art:"Chăm",title,how,id:"kpcgame",kind:kind==="bath"?"thu_tam":kind==="play"?"thu_choi":""})+
  /* mg-skip-all (KIT §13.6): the quick option of every care game: won = BAL.skip.care of the gain (a middling hand), lost = nothing */
  `<div class="kg82act">${kitQuick({id:"kpcquick",n:"Để trời định",win:"được nửa phần như chăm vừa tay",lose:"không thêm gì"})}</div>`;
 try{w.scrollIntoView({block:"nearest"})}catch(e){}return document.getElementById("kpcgame")}
/* KIT §13.7 (mg-ui-rest, owner OD:L1981): EVERY care game opens on the kit rules screen (kgReady: luật + picture of the move, «Hướng dẫn» guided round, «Sẵn sàng»);
   NO khắc are spent and nothing runs until «Sẵn sàng»; then the khắc go and run(box) starts the real game. tutor(box, env) = the unscored guided round. */
function petcRules(kind,title,how,e,tutor,run){const box=petcGameBox(title,how,kind);if(!box)return;PETC.game=kind;PETC.kind=kind;PETC.rdy=0;
 box.innerHTML=`<div class="kg82act"><button type="button" class="${kg82Btn()}" id="kpcgo">Bắt đầu</button></div>`;
 kgReady(box,{n:"Chăm",t:title,how,e,go:"#kpcgo",pic:"",ev:false,timed:false,tutor});
 try{const t=box.querySelector("#kgrtut")||box.querySelector("#kpcgo");if(t)t.scrollIntoView({block:"nearest"})}catch(e){}
 box.querySelector("#kpcgo").addEventListener("click",()=>{if(PETC.game!==kind||PETC.rdy)return;if(!can(BAL.pet.khac))return;spend(BAL.pet.khac);PETC.rdy=1;box.classList.remove("kgintro");box.innerHTML="";run(box)})}
/* guided rounds (unscored, nothing saved): the hand shows the move through KG82.peek; ends on the first success or two */
function petcTutFeed(b,env){const P=tsbPets(S)[PETC.i];const ok=PETC_FOOD[petcKind(P.t)];const L=[ok].concat(PETC_FOODS.filter(x=>x!==ok).slice(0,2)).sort(()=>Math.random()-.5);
 b.innerHTML=`<div class="rbtn">${L.map(x=>`<button type="button" class="kgbtn" data-food="${x}">${x}</button>`).join("")}</div>`;let sel=null,dead=false;const fig=petcFig();
 const pickEl=e=>{const x=e.currentTarget.dataset.food;if(x===ok){sel=x;b.querySelectorAll(".kgbtn").forEach(y=>y.classList.toggle("on",y===e.currentTarget))}};
 const eat=()=>{if(sel&&!dead){dead=true;KG82.peek=()=>null;setTimeout(()=>env.end(),500)}};
 b.querySelectorAll("[data-food]").forEach(x=>x.addEventListener("click",pickEl));if(fig)fig.addEventListener("click",eat);
 KG82.peek=()=>{if(dead)return null;if(!sel)return{sel:`[data-food="${ok}"]`};const f=petcFig();if(!f)return null;const r=f.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height*.55}};
 return()=>{dead=true;KG82.peek=()=>null;if(fig)fig.removeEventListener("click",eat)}}
function petcTutBath(b,env){const st=petcFig();if(!st)return()=>{};let n=0,a=null,dead=false;b.innerHTML=NWB.cnt(2,0);st.style.touchAction="none";
 const dn=e=>{e.preventDefault();try{st.setPointerCapture(e.pointerId)}catch(x){}a={x:e.clientX,y:e.clientY}},up=e=>{if(!a||dead)return;const d=Math.hypot(e.clientX-a.x,e.clientY-a.y);a=null;if(d<20)return;n++;b.innerHTML=NWB.cnt(2,n);if(n>=2){dead=true;KG82.peek=()=>null;setTimeout(()=>env.end(),500)}};
 st.addEventListener("pointerdown",dn);st.addEventListener("pointerup",up);
 KG82.peek=()=>{if(dead)return null;const r=st.getBoundingClientRect();return{drag:[[r.left+r.width*.5,r.top+r.height*.3],[r.left+r.width*.5,r.top+r.height*.75]]}};
 return()=>{dead=true;KG82.peek=()=>null;st.style.touchAction="";st.removeEventListener("pointerdown",dn);st.removeEventListener("pointerup",up)}}
function petcTutPlay(b,env){const N=["Trái","Giữa","Phải"];b.innerHTML=`<div class="rbtn">${N.map((x,i)=>`<button type="button" class="kgbtn" data-ball="${i}">${x}</button>`).join("")}</div>`;
 let lit=-1,hits=0,tm=0,dead=false;const B=[...b.querySelectorAll("[data-ball]")];
 const step=()=>{if(dead)return;let j;do{j=Math.floor(Math.random()*3)}while(j===lit);lit=j;B.forEach((x,i)=>x.classList.toggle("on",i===lit));tm=setTimeout(step,1500)};step();
 B.forEach((x,i)=>x.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();if(dead||i!==lit)return;hits++;clearTimeout(tm);if(hits>=2){dead=true;KG82.peek=()=>null;setTimeout(()=>env.end(),500)}else step()}));
 KG82.peek=()=>dead?null:{sel:`[data-ball="${lit}"]`};
 return()=>{dead=true;clearTimeout(tm);KG82.peek=()=>null}}
/* the "đã lớn" card of her pet (one function: solo shows it here; co-op thin F4 shows it on her phone after the host's answer) */
function petcGrowCard(P){if(!P)return;const T=petT(P);const E=petcEffects(P);setTimeout(()=>{try{petcFx();kitModal({kind:"notice",title:`${T.n} đã lớn: ${BAL.pet.stages[P.stg]}`,sub:PET_TIER[T.tr],
   itemPic:petcPic(P,true),facts:[`Công dụng bây giờ: ${E.join(", ")||"làm cung thêm vui"}.`,P.stg<3?`Lớn tiếp: ${petcNextTxt(P)}.`:"Đã là Linh thú: công dụng mạnh nhất."]})}catch(e){}},60)}
function petcGain(kind,score){const P=tsbPets(S)[PETC.i];if(!P)return;const G=BAL.pet.gain[kind],v=Math.round(G[0]+(G[1]-G[0])*score),f={feed:"full",bath:"clean",play:"joy"}[kind];
 const f0=P[f];P[f]=cl(P[f]+v,0,100);/* show what really changed (a full pet cannot get fuller) */const vv=Math.round(P[f]-f0);const af=Math.round(BAL.pet.affGain[0]+(BAL.pet.affGain[1]-BAL.pet.affGain[0])*score);P.aff=cl(P.aff+af,0,100);if(kind==="play")apply({suc:BAL.eff.jpetcare.playSuc});petcSync(P);P.bad=0;
 const T=petT(P);const s0=petStage(P);const grew=petcGrow(S,P,false);const lbl=`${({full:"No",clean:"Sạch",joy:"Vui"})[f]} +${vv}`;const msg=`${lbl}, Tình cảm +${af}${score>=.8?" · rất vừa ý":score<.35?" · chưa khéo":""}.`;
 const pn=T.n.toLowerCase();log(`Ngươi ${({feed:`cho ${pn} ăn`,bath:`tắm cho ${pn}`,play:`chơi với ${pn}`})[kind]} (${lbl}, Tình cảm +${af}).`);
 if(grew&&petStage(P)!==s0){petcClose();return}/* the "đã lớn" card (petcGrow) comes next */petcDraw(msg)}
/* game 1: pick the food this species eats and drag it onto the pet (or tap the food, then the pet) */
function petcFeed(){const P=tsbPets(S)[PETC.i];const ok=PETC_FOOD[petcKind(P.t)];const L=[ok].concat(PETC_FOODS.filter(x=>x!==ok).sort(()=>Math.random()-.5).slice(0,2)).sort(()=>Math.random()-.5);
 petcRules("feed","Cho ăn",`Kéo món ${petT(P).n.toLowerCase()} ăn vào nó (hay chạm món rồi chạm nó). Sai hai lần thì nó bỏ ăn.`,"drag",petcTutFeed,box=>{PETC.game="feed";
 box.innerHTML=`<div class="rbtn">${L.map(x=>`<button type="button" class="kgbtn" data-food="${x}">${x}</button>`).join("")}</div>`;
 let sel=null,tries=0,over=false;const done=x=>{if(over)return;tries++;if(x===ok){over=true;petcGain("feed",tries===1?1:.5)}else if(tries>=2){over=true;petcGain("feed",.15)}
  else{box.querySelectorAll(".kgbtn").forEach(b=>b.classList.toggle("on",false));const w=box.querySelector(`[data-food="${x}"]`);if(w)w.disabled=true;sel=null}};
 const fig=petcFig();const onFig=(x,y)=>{const f=petcFig();if(!f)return false;const r=f.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom};
 box.querySelectorAll("[data-food]").forEach(b=>{b.style.touchAction="none";b.addEventListener("pointerdown",e=>{e.preventDefault();sel=b.dataset.food;box.querySelectorAll(".kgbtn").forEach(x=>x.classList.toggle("on",x===b));
   const g=b.cloneNode(true);Object.assign(g.style,{position:"fixed",zIndex:99999,pointerEvents:"none",transform:"translate(-50%,-50%)",margin:0});document.body.appendChild(g);
   const mv=ev=>{g.style.left=ev.clientX+"px";g.style.top=ev.clientY+"px"};mv(e);const up=ev=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);g.remove();if(onFig(ev.clientX,ev.clientY))done(sel)};
   addEventListener("pointermove",mv);addEventListener("pointerup",up)})});
 const col=petcFig();if(col)col.onclick=()=>{if(sel&&PETC.game==="feed")done(sel)}})}
/* MG11 (owner OD 20/11 ~08:40Z scan + MAIN ROOT-79 16:25Z: the care games join «Thử tay» and feed her rolling hand b like every kind):
   the two SKILL care games are ONE engine each (KG82_KIND thu_tam / thu_choi, registered in jmgx.js), played here on her pet AND in Thử tay on the same board.
   Board ease env.lv (mgPlayLv: the hoc tier, harder as she climbs, law 5) → BAL.mgTier.lev.thu_tam / thu_choi; at the middle ease the board is the old one.
   The result goes through the ONE result path (mgPlayRes: graded, her hand b learns it, identity offset) and the gain reads it (petcGain score = result / 10).
   Cho ăn stays outside: picking the food a species eats is knowledge, not a hand (dev/handover/reports/mg11-thutay.md). */
/* engine: N even strokes along the pet's coat; env.fig = the picture to stroke (her pet on the care screen); none (Thử tay) = her first pet, or a kitten, drawn in the board (kitItem) */
function petcStrokeEng(box,env){const N=Math.round(mgLev(env,"thu_tam","n")),K=mgLev(env,"thu_tam","k");let st=env.fig||null;
 const fx=c=>NWB.cnt(N,c);
 if(!st){let src="";try{const P=(typeof S!=="undefined"&&S)?tsbPets(S)[0]:null;src=P?petcStageSrc(P,1).src:petSrc(Object.keys(PET)[0],1)}catch(e){}
  box.innerHTML=kitItem({src,name:"",grade:null,size:"lg"}).replace('<span class="kitn"></span>','')+fx(0);st=box.firstElementChild}else box.innerHTML=fx(0);
 const facts=()=>box.querySelector(".nwb-cnt");const lens=[];let a=null,dead=false;st.style.touchAction="none";
 const dn=e=>{if(dead)return;e.preventDefault();try{st.setPointerCapture(e.pointerId)}catch(x){}a={x:e.clientX,y:e.clientY}},
  up=e=>{if(!a||dead)return;const d=Math.hypot(e.clientX-a.x,e.clientY-a.y);a=null;if(d<20)return;lens.push(d);
   const f=facts();if(f)f.outerHTML=fx(lens.length);env.hud({round:`${lens.length}/${N}`});
   if(lens.length>=N){off();const m=lens.reduce((x,y)=>x+y)/N,sd=Math.sqrt(lens.reduce((x,y)=>x+(y-m)*(y-m),0)/N);env.end(10*cl(1-sd/m*K,0,1))}};
 const off=()=>{dead=true;KG82.peek=()=>null;st.removeEventListener("pointerdown",dn);st.removeEventListener("pointerup",up);st.style.touchAction=""};
 st.addEventListener("pointerdown",dn);st.addEventListener("pointerup",up);env.hud({round:`0/${N}`});
 KG82.peek=()=>{if(dead)return null;const r=st.getBoundingClientRect();return{drag:[[r.left+r.width*.5,r.top+r.height*.3],[r.left+r.width*.5,r.top+r.height*.75]]}};
 return off}
/* engine: the ball lights up under one of three kit buttons in turn; tap the lit one before it moves (N rounds) */
function petcBallEng(box,env){const L=n=>mgLev(env,"thu_choi",n),N=Math.round(L("n")),M0=L("ms"),DEC=L("dec"),MIN=L("min"),B0=["Trái","Giữa","Phải"];
 box.innerHTML=`<div class="rbtn">${B0.map((x,i)=>`<button type="button" class="kgbtn" data-ball="${i}">${x}</button>`).join("")}</div>`+NWB.cnt(N,0);
 let lit=-1,n=0,hits=0,tm=0,dead=false;const B=[...box.querySelectorAll("[data-ball]")];
 const step=()=>{if(dead||!document.body.contains(box)){clearTimeout(tm);return}let j;do{j=Math.floor(Math.random()*3)}while(j===lit);lit=j;B.forEach((b,i)=>b.classList.toggle("on",i===lit));tm=setTimeout(step,Math.max(MIN,M0-n*DEC))};
 const off=()=>{dead=true;clearTimeout(tm);KG82.peek=()=>null};env.hud({round:`0/${N}`});step();
 KG82.peek=()=>dead?null:{sel:`[data-ball="${lit}"]`};
 B.forEach((b,i)=>b.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();if(dead)return;if(i===lit)hits++;n++;
  const f=box.querySelector(".nwb-cnt");if(f)f.outerHTML=NWB.cnt(N,n,hits);env.hud({round:`${n}/${N}`});if(n>=N){off();env.end(10*hits/N)}else{clearTimeout(tm);step()}}));
 return off}
function petcHow(k){const L=n=>Math.round(mgLev({lv:BAL.mgTier.mid},k,n));return k==="thu_tam"?`Vuốt dọc lông nó ${L("n")} lần, đều tay (vuốt trên hình nó).`:`Quả cầu sáng lên ở một ô rồi lăn sang ô khác: chạm đúng ô đang sáng (${L("n")} lần).`}
/* game 2: even strokes along the pet's coat (on its picture) */
function petcBath(){petcRules("bath","Tắm, chải lông",petcHow("thu_tam"),"drag",petcTutBath,box=>{const st=petcFig();if(!st)return;PETC.game="bath";
 PETC.stop=petcStrokeEng(box,mgPlayEnv("thu_tam",raw=>{PETC.stop=null;petcGain("bath",mgPlayRes("thu_tam",raw)/10)},{fig:st}))})}
/* game 3: the ball under the three kit buttons */
function petcPlay(){petcRules("play","Chơi",petcHow("thu_choi"),"tap",petcTutPlay,box=>{PETC.game="play";
 PETC.stop=petcBallEng(box,mgPlayEnv("thu_choi",raw=>{PETC.game=null;PETC.stop=null;petcGain("play",mgPlayRes("thu_choi",raw)/10)}))})}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-petc]");if(!b||b.disabled)return;e.stopPropagation();const k=b.dataset.petc;
 if(k==="close"){petcClose();return}const P=tsbPets(S)[PETC.i];if(!P)return;if(PETC.game)return;
 if(k==="maid"){petcMaid(PETC.i);return}
 if(!can(BAL.pet.khac))return;/* KIT §13.7 (mg-ui-rest): the tap opens the RULES screen; the khắc are spent only on «Sẵn sàng» (petcRules) */if(k==="feed")petcFeed();else if(k==="bath")petcBath();else if(k==="play")petcPlay()},true);
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kpcquick");if(!b)return;e.stopPropagation();e.preventDefault();const kind=PETC.kind;if(!kind||!PETC.game)return;
 if(!PETC.rdy){if(!can(BAL.pet.khac))return;spend(BAL.pet.khac)}/* «Để trời định» from the rules screen is a play-through too: same khắc */
 kgTutDrop();PETC.game=null;PETC.rdy=0;try{if(PETC.stop)PETC.stop()}catch(x){}PETC.stop=null;/* MG11: the shared engines return their own stop */
 petcQuick(kind)},true);
/* the engines behind the care buttons (one function each: the tap ends here; co-op thin F4 registers them) */
function petcMaid(i){const P=tsbPets(S)[i];const m=tsbMaid(S);if(!P||!m)return;P.maidW=tsbWk()+BAL.pet.maidW;petcDraw(`${m.name} nhận chăm ${petT(P).n.toLowerCase()} ${BAL.pet.maidW} tuần.`)}
function petcQuick(kind){if(kitQuickRoll()){petcGain(kind,BAL.skip.care);return}log("Để trời định: chăm chưa thành, không thêm gì.");petcDraw("Để trời định: chưa thành, không thêm gì.")}
/* "Chăm" on the pet card opens the screen; the card shows stage + effects + next */
(function(){const d0=petDo;petDo=function(k,b){if(k==="care"){const i=+b.dataset.i;try{closeModal()}catch(e){}petcOpen(i);return}return d0.apply(this,arguments)};window.petDo=petDo})();
(function(){const r0=petRowsL;petRowsL=function(P,i){const L=r0.apply(this,arguments);try{petcInit(P);const s=petStage(P);return [["Lớn",`<b>${BAL.pet.stages[s]}</b>`],["Đang có",petcEffects(P).length?petcEffects(P):["làm cung thêm vui"],"g"],["Lớn tiếp",[petcNextTxt(P)],"n"],["Chăm",[`No ${Math.round(P.full)} · Sạch ${Math.round(P.clean)} · Vui ${Math.round(P.joy)} · Tình cảm ${Math.round(P.aff)}`],"n"]].concat(L)}catch(e){}return L}})();
/* ---------- other palaces: help / steal (harm = jpet thaopet) ---------- */
function petcBestOf(t){return petTarget(t)}
function petStealO(a,t){const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return BAL.odds.lo;const s=petStage(P),T=petT(P);return oddsCl(Math.min(Math.round(odA(a,BAL.pet.stealO[s]+(a.tamco||0)/6-T.tr*3)-(typeof tsbGuard==="function"?tsbGuard(t):0)),90))}
function petStealWhy(a,t){const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";return `${BAL.pet.stages[petStage(P)]} (càng lớn càng khó), ${PET_TIER[petT(P).tr]}, Tâm cơ ngươi, chó canh cung`}
A("petcare","Giúp chăm thú nuôi của nàng",{c:{},ok:(a,t)=>tsbPets(t).length>0,/* law 1: the same gate for her and an NPC; an NPC's friend test is her CHOICE (p3PetFr BAL.pet.helpFr, mind menu BAL.pet.helpMind) */o:()=>null,x:`thiện cảm của nàng +${BAL.pet.helpRel} · thú của nàng khỏe hơn`,f:(a,t)=>{const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";petcInit(P);
 P.full=cl(P.full+BAL.pet.helpGain,0,100);P.clean=cl(P.clean+BAL.pet.helpGain,0,100);P.joy=cl(P.joy+BAL.pet.helpGain,0,100);petcSync(P);relAdd(t,a,BAL.pet.helpRel);
 return `${NMc(a)} sang giúp ${NM(t)} chăm ${petT(P).n.toLowerCase()}; thiện cảm của ${NM(t)} +${BAL.pet.helpRel}. `}});
A("petsteal","Trộm thú nuôi của nàng",{c:{},ok:(a,t)=>tsbPets(t).length>0&&petHasFree(a),o:(a,t)=>petStealO(a,t),x:`có được con thú (giữ nguyên độ lớn, chưa quen chủ mới) · mất: có thể bị cắn, cào (Sức -${BAL.pet.stealSuc}), làm náo động, bị bắt quả tang (Danh -${BAL.pet.stealCaughtDanh}, nàng thù, nắm chứng cứ)`,f:(a,t)=>{
 const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";const T=petT(P),s=petStage(P);a.schemes=(a.schemes||0)+1;let r="";
 if(roll(BAL.pet.stealBite[s])){ap(a,{suc:-BAL.pet.stealSuc});r+=`${T.n} cắn, cào ${a===S?"ngươi":NM(a)} (Sức -${BAL.pet.stealSuc}). `}
 const c=caught(a,t,false,`trộm ${T.n.toLowerCase()} của ${NM(t)}`);if(c){ap(a,{danh:-BAL.pet.stealCaughtDanh});return r+c}
 if(!aRoll(petStealO(a,t),a)){relAdd(a,t,BAL.eff.jpetcare.f);return r+`${T.n} kêu inh ỏi, người trong cung ${NM(t)} chạy ra; ${a===S?"ngươi":NM(a)} phải bỏ đi tay không. `}
 const stg=s;/* petLose (not a bare splice): the follow bonus leaves with the pet, the next one follows (review/coop-pets) */petLose(t,j,"bị trộm mất");const N=petAdd(a,P.t,`Lấy từ cung ${t.name}`,"stolen");if(N){N.stg=stg;N.at=P.at;N.aff=BAL.pet.stolenAff}
 if(t===S&&tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi bị trộm",who:typeof pMe==="function"?pMe():null,h:`<p class="r">Sáng ra không thấy ${T.n.toLowerCase()} đâu; cửa lồng mở, có dấu người lạ.</p>`});
 return r+`${a===S?"Ngươi":NMc(a)} lén mang ${T.n.toLowerCase()} của ${NM(t)} về cung. `}});
try{const add=(g,k)=>{const x=RVGRP.find(r=>r[0]===g);if(x&&!x[1].includes(k))x[1].push(k)};add("Giao thiệp","petcare");add("Hại nặng","petsteal");
 AOUT.petcare=[`thiện cảm +${BAL.pet.helpRel}`,""];AOUT.petsteal=["có con thú của nàng (chưa quen ngươi)",`bị bắt quả tang: Danh -${BAL.pet.stealCaughtDanh}, nàng thù, nắm chứng cứ · bị cắn: Sức -${BAL.pet.stealSuc}`];
 ACTDOM.petcare="Giao tình";ACTDOM.petsteal="Mưu kế";J78VERB.petcare="giúp {t} chăm thú nuôi";J78VERB.petsteal="trộm thú nuôi của {t}";if(BANDS[2]&&!BANDS[2][2].includes("petsteal"))BANDS[2][2].push("petsteal");
 LACK.petsteal=t=>!tsbPets(t).length?"nàng không nuôi thú":!petHasFree(S)?"hết ô thú nuôi":"";LACK.petcare=t=>!tsbPets(t).length?"nàng không nuôi thú":""}catch(e){console.error("petcare acts",e)}
/* NPC minds: friendly ones help (with her too), greedy / hostile ones steal (higher stages less tempting: harder) */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)&&v!==S&&tsbPets(t).length){
  if(rel(v,t)>=BAL.pet.helpMind&&ACT.petcare.ok(v,t))O.push(["petcare",.4]);const tr=traitsOf(v);if((tr.includes("Tham vọng")||tr.includes("Xảo quyệt"))&&hostility(v,t)>=40&&ACT.petsteal.ok(v,t))O.push(["petsteal",.25*(1+petT(tsbPets(t)[petTarget(t)]).tr*.3)])}}catch(e){}return O}})();
/* co-op (review/coop-pets): the friend's entry carries her live pets, so the act tabs offer petcare / thaopet / petsteal on her exactly as on an
   NPC; jcoopworld's runAct wrapper sends what happened to her pets (res.pet) and her client applies it to her own pets.
   coopPetAct(kind) = the same act from code/tests: kind "care"|"harm"|"steal" (or the act key) on the friend entry; returns the result text. */
window.coopPetAct=function(kind){try{const k={care:"petcare",help:"petcare",harm:"thaopet",steal:"petsteal"}[kind]||kind;const f=window.COOPW&&COOPW.on&&COOPW.friend&&COOPW.friend();
 if(!f||!ACT[k]||!ACT[k].ok(S,f))return"";return runAct(S,f,k)}catch(e){console.error(e);return""}};
/* old saves: every pet gets its stage + stats once */
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{for(const p of [S].concat(rivals||[]))for(const P of tsbPets(p))petcInit(P),petcSync(P)}catch(e){}return r}})();
/* KIT 28.13d rule (review/pets-fix): a shop / pick person dialog (kitModal {shop} or {pick}) is not an event: no event band picture over it
   (a title such as "Chăm mèo tuyết" matched the snow-day event by the word "tuyết"). Outermost kitEvArt wrapper (after jk4). */
(function(){if(typeof kitEvArt!=="function")return;const a0=kitEvArt;kitEvArt=function(m){if(m&&m.kit&&(m.kit.shop||m.kit.pick))return null;return a0.apply(this,arguments)};window.kitEvArt=kitEvArt})();
/* no private CSS: the care screen is kit parts only (person dialog, kitStatRow, kitRows, kitGameFrame, .kgbtn, pbtn) */
window.petcOpen=petcOpen;window.petStage=petStage;window.petcGrow=petcGrow;
