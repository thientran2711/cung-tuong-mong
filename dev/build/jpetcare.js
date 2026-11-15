/* ================= jpetcare: THÚ NUÔI LỚN LÊN + CHĂM NHƯ THÚ ẢO + THÚ CỦA NGƯỜI KHÁC (owner 15/11, review/pet-care) — numbers in BAL.pet =================
   1. FOUR stages: Non → Thiếu niên → Trưởng thành → Linh thú, by TIME OWNED (BAL.pet.ageW tuần) and TÌNH CẢM (BAL.pet.affNeed). Each stage unlocks
      more: Non = only cheers the palace (Sức +1 a week); Thiếu niên = the species' own use, weaker (× BAL.pet.mul[1]); Trưởng thành = full use;
      Linh thú = stronger use (× mul[3]) and, for Ngự tứ, ĐỠ MỘT MẠNG (only at Linh thú). petT(P) returns the stage's effects (the one source the rules read).
      The pet card shows the stage, what works now and what the next stage unlocks + its requirement. Growing up = an immediate card. Linh thú = its own picture (-lt), no code glow (owner).
   2. CARE like a virtual pet: P.full (No), P.clean (Sạch), P.joy (Vui), P.aff (Tình cảm) 0..100; P.care (khí lực, read by jpet) = the mean of
      No/Sạch/Vui. "Chăm" opens a full-screen kit view: the pet big (stage art img/pet512/pet-<key>-non|-tn|(grown)|-lt, falling back to the grown art,
      smaller for the young), the four bars, and three short games, each BAL.pet.khac khắc — Cho ăn (drag the food this species eats onto it),
      Tắm / chải lông (even strokes), Chơi (tap when the toy passes the middle). Score = how she plays (no dice). A trusted servant can be put in
      charge (BAL.pet.maidEff of the gain, every week, 4 weeks). Stats fall every week (BAL.pet.decay); long neglect (mean < BAL.pet.sad) → an omen
      card, then sick (Sức of the pet's use off), then after BAL.pet.neglectW weeks it runs away / fades (immediate card).
   3. Other palaces (NPC consorts; co-op friend: hook coopPetAct, see note): Giúp chăm thú (petcare) — her khắc, the owner's thiện cảm +;
      Hại thú (thaopet, jpet) as before; Trộm thú (petsteal) — odds fall with the pet's stage (BAL.pet.stealO), bites (Sức −), alarm, caught
      (Danh, oán, chứng cứ); a stolen pet keeps its stage with tình cảm BAL.pet.stolenAff. NPCs use the same acts on her (and each other).
   4. NPCs: same stages and stats (data only, they feed when they have the bạc). Old saves: stage from the time already owned, stats from khí lực. */
Object.assign(BAL,{pet:{stages:["Non","Thiếu niên","Trưởng thành","Linh thú"],ageW:[0,8,20,40],affNeed:[0,25,50,80],mul:[0,.6,1,1.4],
 decay:{full:14,clean:9,joy:11,aff:2},khac:1,gain:{feed:[12,40],bath:[10,40],play:[8,36]},affGain:[2,6],maidEff:.5,maidW:4,sad:30,sick:15,neglectW:3,
 helpRel:6,helpGain:25,stealO:[55,38,22,8],stealBite:[6,10,16,24],stealSuc:8,stealCaughtDanh:6,stolenAff:5,npcCare:.8}});
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
function petcStageT(T,s,k){const key=k+"|"+s;if(PETC_CACHE[key])return PETC_CACHE[key];const X=Object.assign({},T);const m=BAL.pet.mul[s];
 if(s===0){for(const f of PETC_MAIN)delete X[f];X.suc=Math.max(1,T.suc||0);X.use=`còn non: chỉ làm cung thêm vui (Sức +1 mỗi tuần) · lớn lên mới ${T.use}`}
 else{for(const f of PETC_MAIN){if(X[f]==null||f==="rescue")continue;if(Array.isArray(X[f]))X[f]=[Math.round(X[f][0]*m),X[f][1]];else X[f]=f==="sniff"?Math.min(95,Math.round(X[f]*m)):Math.max(1,Math.round(X[f]*m))}
  if(T.rescue&&s<3){delete X.rescue;X.use=String(T.use).replace(/ĐỠ MỘT MẠNG[^;·]*;?\s*/,"")+" · đỡ một mạng: khi thành Linh thú"}
  X.use=(s===1?"còn nhỏ, công dụng yếu: ":s===3?"Linh thú, công dụng mạnh: ":"")+(X.use||T.use)}
 return PETC_CACHE[key]=X}
(function(){const t0=petT;petT=function(P){const T=t0.apply(this,arguments);try{if(P&&typeof P==="object"&&P.t)return petcStageT(T,petStage(P),petK(P.t))}catch(e){}return T}})();
(function(){const a0=petAdd;petAdd=function(p,t,from,src){const P=a0.apply(this,arguments);try{if(P){P.full=75;P.clean=75;P.joy=65;P.aff=src==="stolen"?BAL.pet.stolenAff:15;P.stg=0;petcSync(P)}}catch(e){}return P}})();
function petcStageSrc(P,big){const k=petK(P.t),s=petStage(P),suf=["-non","-tn","","-lt"][s];return{src:`img/${big?"pet512/":""}pet-${k}${suf}.webp`,fb:petSrc(k,big),scale:[.62,.8,1,1][s]}}
function petcEffects(P){const T=petT(P);const L=[];if(T.suc)L.push(`Sức +${T.suc} mỗi tuần`);if(T.sniff)L.push(`đánh hơi đồ ăn lạ (${word(T.sniff)})`);if(T.guard)L.push("canh cửa cung");if(T.beast)L.push("đuổi thú dữ");
 if(T.sungN)L.push(`Sủng +${T.sungN} mỗi đêm thị tẩm`);if(T.anN)L.push(`Ân tình +${T.anN} mỗi đêm thị tẩm`);if(T.omen)L.push(`điềm lành: Danh +${T.omen[1]}`);if(T.th)L.push(`Thái hậu +${T.th} mỗi tháng`);
 if(T.spy)L.push("nghe lén");if(T.soft)L.push("bớt oán người ghét ngươi");if(T.rescue)L.push("ĐỠ MỘT MẠNG");return L}
function petcNextTxt(P){const n=petcNext(P);if(!n)return"đã là Linh thú";const base=PET[petK(P.t)]||{};const T2=petcStageT(base,n.s,petK(P.t));const now=petcEffects(P);
 const gain=petcEffects({t:P.t,stg:n.s,full:1}).filter(x=>!now.includes(x));
 return `${BAL.pet.stages[n.s]}: ${gain.length?gain.join(", "):"công dụng mạnh hơn"} · cần nuôi ${n.age} tuần (đã ${n.ageNow}), tình cảm ${n.aff} (có ${n.affNow})`}
function petcGrow(p,P,quiet){const n=petcNext(P);if(!n||n.ageNow<n.age||(P.aff||0)<n.aff)return false;P.stg=n.s;
 if(p===S&&!quiet&&!tsbBot()){const T=petT(P);const E=petcEffects(P);setTimeout(()=>{try{petcFx();kitModal({kind:"notice",title:`${T.n} đã lớn: ${BAL.pet.stages[P.stg]}`,sub:PET_TIER[T.tr],
   itemPic:petcPic(P,true),facts:[`Công dụng bây giờ: ${E.join(", ")||"làm cung thêm vui"}.`,P.stg<3?`Lớn tiếp: ${petcNextTxt(P)}.`:"Đã là Linh thú: công dụng mạnh nhất."]})}catch(e){}},60)}
 try{log(`${p===S?"":NM(p)+": "}${petT(P).n} lớn lên thành ${BAL.pet.stages[P.stg]}.`)}catch(e){}return true}
function petcPic(P,big){const a=petcStageSrc(P,1);const T=petT(P);
 return `<span class="kitem kitem-lg kig${T.tr}${T.tr===4?" kitem-nt":""}" style="--ig:${KIT_GRADE[T.tr].g};--ic:${KIT_GRADE[T.tr].c}${KIT_GRADE[T.tr].r?";--ir:"+KIT_GRADE[T.tr].r:""}"><span class="kitb"><img src="${a.src}" alt="" onerror="if(this.dataset.f){this.remove()}else{this.dataset.f=1;this.style.transform='scale(${a.scale})';this.src='${a.fb}'}">${T.tr===4?'<i class="kits" aria-hidden="true">Ngự</i>':""}</span></span>`}
function petcFx(){try{if(typeof sfx==="function")sfx("chime")}catch(e){}}
/* ---------- the week: decay, servant care, NPC care, omen → sick → gone; growth ---------- */
petWeek=function(){for(const p of [S].concat(liveRivals(true))){const L=tsbPets(p);if(!L.length)continue;const me=p===S;
  if(p.out){for(let i=L.length-1;i>=0;i--)petLose(p,i,"Nội vụ phủ thu lại khi vào lãnh cung");if(me)log(`<span class="r">Vào lãnh cung, thú nuôi của ngươi bị Nội vụ phủ thu lại hết.</span>`);continue}
  const winter=S.month>=10,D=BAL.pet.decay;
  for(let i=L.length-1;i>=0;i--){const P=petcInit(L[i]),T=petT(P);let ex=0;if(T.pond&&rkOf(p)<3)ex+=4;if(T.weak&&winter)ex+=5;
   P.full=cl(P.full-D.full-ex,0,100);P.clean=cl(P.clean-D.clean,0,100);P.joy=cl(P.joy-D.joy-ex,0,100);P.aff=cl(P.aff-D.aff,0,100);
   if(me&&P.maidW&&P.maidW>tsbWk()){const m=BAL.pet.maidEff;P.full=cl(P.full+D.full*2*m,0,100);P.clean=cl(P.clean+D.clean*2*m,0,100);P.joy=cl(P.joy+D.joy*2*m,0,100)}
   if(!me){const can=(p.bac||0)>=(T.up||0);const k=BAL.pet.npcCare*(can?1:.4);P.full=cl(P.full+D.full*1.2*k,0,100);P.clean=cl(P.clean+D.clean*1.2*k,0,100);P.joy=cl(P.joy+D.joy*1.2*k,0,100);P.aff=cl(P.aff+3*k,0,100)}
   petcSync(P);
   if(petOk(P)&&T.suc){if(me)S.suc=cl(S.suc+T.suc,0,100);else p.suc=cl((p.suc||0)+T.suc,0,100)}
   if(T.al&&p.asthma){if(me)S.suc=cl(S.suc-2,0,100);else p.suc=cl((p.suc||0)-2,0,100)}
   if(P.care<BAL.pet.sad){P.bad=(P.bad||0)+1;if(me&&P.bad===1&&tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi biếng ăn",who:typeof pMe==="function"?pMe():null,h:`<p>${T.n} nằm lì một góc, lông xơ, không buồn ăn. Phải chăm ngay kẻo ốm.</p>`})}
   else P.bad=0;
   if(P.bad>=BAL.pet.neglectW||P.care<=0){const n=petLose(p,i,/hoami|sao|vet|uyenuong|phuong|camke|hac|thanhlong/.test(P.t)?"bay mất vì bỏ bê":"bỏ đi vì bỏ bê");
    if(me&&n){log(`<span class="r">${tsbCap(n)} của ngươi bị bỏ bê lâu ngày, đã bỏ đi.</span>`);if(tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi bỏ đi",who:typeof pMe==="function"?pMe():null,h:`<p class="r">${n} bị bỏ bê lâu ngày, sáng nay không thấy đâu nữa.</p>`})}continue}
   petcGrow(p,P,!me)}}};
/* ---------- the care screen ---------- */
const PETC={i:-1,game:null};
function petcBars(P){const b=(l,v,c)=>`<div class="kpcb"><span>${l}</span><i style="--v:${Math.round(v)}%;--c:${c}"></i><b>${Math.round(v)}</b></div>`;
 return b("No",P.full,"#c98a3a")+b("Sạch",P.clean,"#4f8fb8")+b("Vui",P.joy,"#d46a8a")+b("Tình cảm",P.aff,"#b8434a")}
function petcOpen(i){const P=tsbPets(S)[i];if(!P)return;petcInit(P);PETC.i=i;let ov=document.getElementById("kpetcare");if(!ov){ov=document.createElement("div");ov.id="kpetcare";ov.className="kpc";document.body.appendChild(ov)}petcDraw()}
function petcClose(){const ov=document.getElementById("kpetcare");if(ov)ov.remove();PETC.i=-1;PETC.game=null;try{render()}catch(e){}}
function petcDraw(msg){const ov=document.getElementById("kpetcare");const P=tsbPets(S)[PETC.i];if(!ov||!P){petcClose();return}const T=petT(P),s=petStage(P),a=petcStageSrc(P,1);const t1=whyTime(BAL.pet.khac);const m=tsbMaid(S);
 const g=(k,n,x)=>pbtn(`data-petc="${k}"`,n,`tốn: ${BAL.pet.khac} khắc · ${x}`,t1);
 ov.innerHTML=`<div class="kpcbox"><div class="kpch"><b>${T.n}</b><span class="kchip n">${BAL.pet.stages[s]}</span><span class="kchip n" style="color:${KIT_GRADE[T.tr].c}">${PET_TIER[T.tr]}</span><button class="kbtn alt kpcx" data-petc="close">Xong</button></div>
  <div class="kpcstage" id="kpcstage"><img id="kpcimg" src="${a.src}" style="--sc:1" alt="" draggable="false" onerror="if(this.dataset.f){this.remove()}else{this.dataset.f=1;this.style.setProperty('--sc','${a.scale}');this.src='${a.fb}'}"></div><div id="kpcgame"></div>
  <div class="kpcbars">${petcBars(P)}</div>
  <p class="kpcmsg">${msg||`Công dụng: ${petcEffects(P).join(", ")||"làm cung thêm vui"}. Lớn tiếp: ${petcNextTxt(P)}.`}</p>
  <div class="rbtn kpcacts">${g("feed","Cho ăn",`thành: No tăng, Tình cảm tăng · kéo đúng món ${T.n.toLowerCase()} ăn vào nó`)}${g("bath","Tắm, chải lông","thành: Sạch tăng · vuốt đều tay 5 lần")}${g("play","Chơi","thành: Vui tăng · chạm khi đồ chơi qua giữa (3 lần)")}
   ${m?pbtn(`data-petc="maid"`,`Giao ${m.name} chăm`,`thành: ${BAL.pet.maidW} tuần, mỗi tuần đỡ một nửa phần hao · kèm: không thêm tình cảm`,P.maidW>tsbWk()?`${m.name} đang chăm`:""):""}</div></div>`}
function petcGain(kind,score){const P=tsbPets(S)[PETC.i];if(!P)return;const G=BAL.pet.gain[kind],v=Math.round(G[0]+(G[1]-G[0])*score),f={feed:"full",bath:"clean",play:"joy"}[kind];
 P[f]=cl(P[f]+v,0,100);const af=Math.round(BAL.pet.affGain[0]+(BAL.pet.affGain[1]-BAL.pet.affGain[0])*score);P.aff=cl(P.aff+af,0,100);if(kind==="play")apply({suc:1});petcSync(P);P.bad=0;
 const T=petT(P);const grew=petcGrow(S,P,false);petcDraw(`${T.n}: ${({full:"No",clean:"Sạch",joy:"Vui"})[f]} +${v}, Tình cảm +${af}${score>=.8?" · rất vừa ý":score<.35?" · chưa khéo":""}.`);
 log(`Ngươi ${({feed:"cho",bath:"tắm cho",play:"chơi với"})[kind]} ${T.n.toLowerCase()} (${({full:"No",clean:"Sạch",joy:"Vui"})[f]} +${v}, Tình cảm +${af}).`)}
/* game 1: drag the right food onto the pet */
function petcFeed(){const P=tsbPets(S)[PETC.i];const ok=PETC_FOOD[petcKind(P.t)];const L=[ok].concat(PETC_FOODS.filter(x=>x!==ok).sort(()=>Math.random()-.5).slice(0,2)).sort(()=>Math.random()-.5);
 const box=document.getElementById("kpcgame");box.innerHTML=`<div class="kpcfood">${L.map(x=>`<button class="kpcf" data-food="${x}">${x}</button>`).join("")}</div><div class="kpchint">Kéo món nó ăn vào nó (hay chạm món rồi chạm nó)</div>`;
 let sel=null,tries=0;const done=x=>{tries++;if(x===ok){petcGain("feed",tries===1?1:.5)}else if(tries>=2){petcGain("feed",.15)}else{box.querySelector(".kpchint").textContent=`${P.t?petT(P).n:""} quay đi, không ăn ${x}. Thử món khác.`}};
 box.querySelectorAll(".kpcf").forEach(b=>{b.addEventListener("pointerdown",e=>{e.preventDefault();sel=b.dataset.food;const g=b.cloneNode(true);g.className="kpcf kpcdrag";document.body.appendChild(g);
   const mv=ev=>{g.style.left=ev.clientX+"px";g.style.top=ev.clientY+"px"};mv(e);const up=ev=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);g.remove();const im=document.getElementById("kpcimg");
    const r=(im||box).getBoundingClientRect();if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom)done(sel)};addEventListener("pointermove",mv);addEventListener("pointerup",up)})});
 const stg=document.getElementById("kpcstage");if(stg)stg.onclick=e=>{if(sel&&!e.target.closest(".kpcf"))done(sel)}}
/* game 2: five even strokes over the pet */
function petcBath(){const box=document.getElementById("kpcgame"),st=document.getElementById("kpcstage");box.innerHTML=`<div class="kpchint">Vuốt dọc lông 5 lần, đều tay (0/5)</div>`;const lens=[];let a=null;
 const dn=e=>{e.preventDefault();try{st.setPointerCapture(e.pointerId)}catch(x){}a={x:e.clientX,y:e.clientY}},up=e=>{if(!a)return;const d=Math.hypot(e.clientX-a.x,e.clientY-a.y);a=null;if(d<20)return;lens.push(d);box.querySelector(".kpchint").textContent=`Vuốt dọc lông 5 lần, đều tay (${lens.length}/5)`;
  if(lens.length>=5){st.removeEventListener("pointerdown",dn);st.removeEventListener("pointerup",up);const m=lens.reduce((x,y)=>x+y)/5,sd=Math.sqrt(lens.reduce((x,y)=>x+(y-m)*(y-m),0)/5);petcGain("bath",cl(1-sd/m*1.6,0,1))}};
 st.addEventListener("pointerdown",dn);st.addEventListener("pointerup",up)}
/* game 3: tap when the toy crosses the middle, 3 times */
function petcPlay(){const box=document.getElementById("kpcgame");box.innerHTML=`<div class="kpcbar"><i class="kpcz"></i><b class="kpcball"></b></div><div class="kpchint">Chạm khi quả cầu qua giữa (0/3)</div>`;
 const ball=box.querySelector(".kpcball");let t0=performance.now(),n=0,hits=0,raf=0,stop=false;const pos=t=>.5+.5*Math.sin((t-t0)*.004*(1+n*.25));
 const fr=t=>{if(stop)return;ball.style.left=(pos(t)*100)+"%";raf=requestAnimationFrame(fr)};raf=requestAnimationFrame(fr);
 const tap=e=>{if(stop)return;e.preventDefault();const p=pos(performance.now());if(Math.abs(p-.5)<.1)hits++;n++;box.querySelector(".kpchint").textContent=`Chạm khi quả cầu qua giữa (${n}/3) · trúng ${hits}`;
  if(n>=3){stop=true;cancelAnimationFrame(raf);box.removeEventListener("pointerdown",tap);petcGain("play",hits/3)}};box.addEventListener("pointerdown",tap);PETC.peek=()=>pos(performance.now())}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-petc]");if(!b||b.disabled)return;e.stopPropagation();const k=b.dataset.petc;
 if(k==="close"){petcClose();return}const P=tsbPets(S)[PETC.i];if(!P)return;
 if(k==="maid"){const m=tsbMaid(S);if(!m)return;P.maidW=tsbWk()+BAL.pet.maidW;petcDraw(`${m.name} nhận chăm ${petT(P).n.toLowerCase()} ${BAL.pet.maidW} tuần.`);return}
 if(!can(BAL.pet.khac))return;spend(BAL.pet.khac);if(k==="feed")petcFeed();else if(k==="bath")petcBath();else if(k==="play")petcPlay()},true);
/* "Chăm" on the pet card opens the screen; the card shows stage + effects + next */
(function(){const d0=petDo;petDo=function(k,b){if(k==="care"){const i=+b.dataset.i;try{closeModal()}catch(e){}petcOpen(i);return}return d0.apply(this,arguments)};window.petDo=petDo})();
(function(){const r0=petRows;petRows=function(P,i){let h=r0.apply(this,arguments);try{petcInit(P);const s=petStage(P);h=kitRows([["Lớn",`<b>${BAL.pet.stages[s]}</b>`],["Đang có",petcEffects(P).length?petcEffects(P):["làm cung thêm vui"],"g"],["Lớn tiếp",[petcNextTxt(P)],"n"],["Chăm",[`No ${Math.round(P.full)} · Sạch ${Math.round(P.clean)} · Vui ${Math.round(P.joy)} · Tình cảm ${Math.round(P.aff)}`],"n"]])+h}catch(e){}return h}})();
/* ---------- other palaces: help / steal (harm = jpet thaopet) ---------- */
function petcBestOf(t){return petTarget(t)}
function petStealO(a,t){const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return 5;const s=petStage(P),T=petT(P);return cl(Math.round(odA(a,BAL.pet.stealO[s]+(a.tamco||0)/6-T.tr*3)-(typeof tsbGuard==="function"?tsbGuard(t):0)),3,90)}
function petStealWhy(a,t){const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";return `${BAL.pet.stages[petStage(P)]} (càng lớn càng khó), ${PET_TIER[petT(P).tr]}, Tâm cơ ngươi, chó canh cung`}
A("petcare","Giúp chăm thú nuôi của nàng",{c:{},ok:(a,t)=>tsbPets(t).length>0&&(a===S?true:rel(a,t)>=10),o:()=>null,x:`thiện cảm của nàng +${BAL.pet.helpRel} · thú của nàng khỏe hơn`,f:(a,t)=>{const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";petcInit(P);
 P.full=cl(P.full+BAL.pet.helpGain,0,100);P.clean=cl(P.clean+BAL.pet.helpGain,0,100);P.joy=cl(P.joy+BAL.pet.helpGain,0,100);petcSync(P);relAdd(t,a,BAL.pet.helpRel);
 return `${NMc(a)} sang giúp ${NM(t)} chăm ${petT(P).n.toLowerCase()}; ${NM(t)} quý ${a===S?"ngươi":NM(a)} hơn (+${BAL.pet.helpRel}). `}});
A("petsteal","Trộm thú nuôi của nàng",{c:{},ok:(a,t)=>tsbPets(t).length>0&&petHasFree(a),o:(a,t)=>petStealO(a,t),x:`có được con thú (giữ nguyên độ lớn, chưa quen chủ mới) · mất: có thể bị cắn, cào (Sức -${BAL.pet.stealSuc}), làm náo động, bị bắt quả tang (Danh -${BAL.pet.stealCaughtDanh}, nàng thù, nắm chứng cứ)`,f:(a,t)=>{
 const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return"";const T=petT(P),s=petStage(P);a.schemes=(a.schemes||0)+1;let r="";
 if(roll(BAL.pet.stealBite[s])){ap(a,{suc:-BAL.pet.stealSuc});r+=`${T.n} cắn, cào ${a===S?"ngươi":NM(a)} (Sức -${BAL.pet.stealSuc}). `}
 const c=caught(a,t,false,`trộm ${T.n.toLowerCase()} của ${NM(t)}`);if(c){ap(a,{danh:-BAL.pet.stealCaughtDanh});return r+c}
 if(!roll(petStealO(a,t))){relAdd(a,t,-6);return r+`${T.n} kêu inh ỏi, người trong cung ${NM(t)} chạy ra; ${a===S?"ngươi":NM(a)} phải bỏ đi tay không. `}
 const stg=s;tsbPets(t).splice(j,1);if(t.petOn===j)t.petOn=-1;else if(t.petOn>j)t.petOn--;const N=petAdd(a,P.t,`Lấy từ cung ${t.name}`,"stolen");if(N){N.stg=stg;N.at=P.at;N.aff=BAL.pet.stolenAff}
 if(t===S&&tsbOn()&&!tsbBot())Q.push({t:"Thú nuôi bị trộm",who:typeof pMe==="function"?pMe():null,h:`<p class="r">Sáng ra không thấy ${T.n.toLowerCase()} đâu; cửa lồng mở, có dấu người lạ.</p>`});
 return r+`${a===S?"Ngươi":NMc(a)} lén mang ${T.n.toLowerCase()} của ${NM(t)} về cung. `}});
try{const add=(g,k)=>{const x=RVGRP.find(r=>r[0]===g);if(x&&!x[1].includes(k))x[1].push(k)};add("Giao thiệp","petcare");add("Hại nặng","petsteal");
 AOUT.petcare=[`nàng quý ngươi hơn (+${BAL.pet.helpRel})`,""];AOUT.petsteal=["có con thú của nàng (chưa quen ngươi)","bị bắt quả tang: Danh -6, nàng thù, nắm chứng cứ · bị cắn: Sức -8"];
 ACTDOM.petcare="Giao tình";ACTDOM.petsteal="Mưu kế";J78VERB.petcare="giúp {t} chăm thú nuôi";J78VERB.petsteal="trộm thú nuôi của {t}";if(BANDS[2]&&!BANDS[2][2].includes("petsteal"))BANDS[2][2].push("petsteal");
 LACK.petsteal=t=>!tsbPets(t).length?"nàng không nuôi thú":!petHasFree(S)?"hết ô thú nuôi":"";LACK.petcare=t=>!tsbPets(t).length?"nàng không nuôi thú":""}catch(e){console.error("petcare acts",e)}
/* NPC minds: friendly ones help (with her too), greedy / hostile ones steal (higher stages less tempting: harder) */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)&&v!==S&&tsbPets(t).length){
  if(rel(v,t)>=20&&ACT.petcare.ok(v,t))O.push(["petcare",.4]);const tr=traitsOf(v);if((tr.includes("Tham vọng")||tr.includes("Hiểm độc"))&&hostility(v,t)>=40&&ACT.petsteal.ok(v,t))O.push(["petsteal",.25*(1+petT(tsbPets(t)[petTarget(t)]).tr*.3)])}}catch(e){}return O}})();
/* co-op hook: the friend's palace (jcoop): call coopPetAct(kind, friendId) to relay "petcare" / "petsteal" through the room's act relay — NOT wired yet. */
window.coopPetAct=window.coopPetAct||function(kind,fid){try{if(typeof coopAct==="function")coopAct({k:"pet-"+kind,to:fid})}catch(e){}};
/* old saves: every pet gets its stage + stats once */
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{for(const p of [S].concat(rivals||[]))for(const P of tsbPets(p))petcInit(P),petcSync(P)}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kpetcare-css";st.textContent=`
.kpc{position:fixed;inset:0;z-index:9600;background:radial-gradient(circle at 50% 35%,#fbf3e4 0,#efe0c3 70%,#e2cda6 100%);display:flex;align-items:stretch;justify-content:center;overflow:auto}
.kpcbox{width:min(100%,760px);display:flex;flex-direction:column;gap:8px;padding:max(10px,env(safe-area-inset-top)) 14px 14px}
.kpch{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.kpch b{font-family:var(--display,serif);font-size:1.3rem;color:var(--ink,#2a1a12)}.kpcx{margin-left:auto}
.kpcstage{position:relative;flex:1 1 auto;min-height:min(46vh,420px);display:grid;place-items:center;border-radius:14px;background:radial-gradient(circle at 50% 60%,#fffaf0 0,#f3e4c6 70%);border:1px solid var(--gold,#c9a46a);overflow:hidden;touch-action:none}
.kpcstage>img{pointer-events:none;-webkit-user-drag:none;max-height:min(44vh,400px);max-width:90%;transform:scale(var(--sc,1));transform-origin:50% 85%;filter:drop-shadow(0 6px 10px #5a3a2044);user-select:none}
.kitb#kpcgame{display:flex;min-height:0;flex-direction:column;align-items:center;gap:6px;pointer-events:auto}
.kpcfood{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.kpcf{font:600 .95rem var(--body,sans-serif);padding:8px 12px;border-radius:10px;border:1px solid var(--gold,#c9a46a);background:#fffaf0;touch-action:none}
.kpcdrag{position:fixed;z-index:9700;transform:translate(-50%,-50%);pointer-events:none;box-shadow:0 4px 12px #0004}
.kpchint{font-size:.85rem;background:#fffaf0e6;border-radius:8px;padding:2px 8px;color:var(--ink,#2a1a12)}
.kpcbar{position:relative;width:min(80%,420px);height:30px;border-radius:15px;background:#f6ead6;border:1px solid var(--gold,#c9a46a)}.kpcz{position:absolute;left:40%;width:20%;top:0;bottom:0;background:#2d7a5233;border-left:2px solid #2d7a52;border-right:2px solid #2d7a52}
.kpcball{position:absolute;top:3px;width:24px;height:24px;margin-left:-12px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#d46a8a)}
.kpcbars{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:6px 12px}
.kpcb{display:grid;grid-template-columns:4.6em 1fr 2.2em;align-items:center;gap:6px;font-size:.85rem}.kpcb i{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--c) var(--v),#e8dcc4 var(--v));box-shadow:inset 0 1px 2px #0002}.kpcb b{text-align:right}
.kpcmsg{margin:0;font-size:.88rem;color:var(--ink,#2a1a12)}
.kpcacts{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:6px}
@media (max-height:500px){.kpcstage{min-height:42vh}.kpcstage>img{pointer-events:none;-webkit-user-drag:none;max-height:40vh}}
`;document.head.appendChild(st)})();
window.petcOpen=petcOpen;window.petStage=petStage;window.petcGrow=petcGrow;
