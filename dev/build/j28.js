/* ================= FIGURES: full-body art read from img/FIGURES.json when present; faces otherwise ================= */
/* manifest: an array (or {figures:[...]}) of {file, role, tier, trait, ageBand, look}; fig-* full body, por-* portrait */
let FIGS=[];
(function(){try{fetch("img/FIGURES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{const L=Array.isArray(j)?j:j&&(j.figures||j.files||j.items)||[];FIGS=L.filter(x=>x&&(x.file||x.src));if(FIGS.length&&S)render()}).catch(()=>{})}catch(e){}})();
const TRK={"Xảo quyệt":"hiemdoc","Kiêu ngạo":"kieungao","Ân cần":"hienlanh","Kín đáo":"danghi","Tham vọng":"thamvong","Khiêm nhường":"numi"};
function figRole(p){if(p===S)return"heroine";const k=p&&p.kind;if(k==="emp"||p===S.emp)return"emperor";if(k==="th")return"thaihau";if(k==="man"||(p&&p.ref&&p.ref.rw))return"man";if(k==="ty")return"physician";if(k==="maid"||k==="serv")return(p.ref&&p.ref.role==="eunuch")?"eunuch":"maid";return"consort"}
function ageBandOf(a){const B=BAL.ageBand;return a>=B[1]?"old":a>=B[0]?"mid":"young"}
function norm(x){return String(x==null?"":x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]/g,"")}
function figFor(p,kind){if(!FIGS.length||!p)return"";const role=figRole(p),who=p.ref||p;const tier=who===S?(S.out?"cold":S.rank):who.queen?7:who.rank;const tr=TRK[who.trait]||norm(who.trait||who.look||"");const ab=ageBandOf(who===S.thO||who.kind==="th"?(S.thAge||55):who.kind==="emp"&&S.emp?S.emp.age:(who.age||20));
 const L=FIGS.filter(f=>norm(f.role)===norm(role)&&(kind!=="por"||/(^|\/)por-/.test(f.file||f.src))&&(kind==="por"||!/(^|\/)por-/.test(f.file||f.src)));if(!L.length)return"";
 const sc=f=>(String(f.tier)===String(tier)||String(f.tier)===String(+tier+1)?4:0)+(norm(f.trait)===tr||norm(f.look)===tr?3:0)+(norm(f.ageBand)===ab?2:0);const best=Math.max(...L.map(sc));const top=L.filter(f=>sc(f)===best);
 const h=String(who.id!=null?who.id:who.name||"me").split("").reduce((a,c)=>a*31+c.charCodeAt(0)>>>0,7);const f=top[h%top.length];const src=f.file||f.src;return /^img\//.test(src)?src:"img/"+src}
/* the place screen: people present stand as full figures when the art exists, as framed faces otherwise */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{if(!FIGS.length)return;const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const who=p&&(p.kind==="emp"||p.kind==="th"?p:p.ref);if(!who)return;const src=figFor(p.kind==="emp"||p.kind==="th"?p:who);if(!src)return;
  const md=b.querySelector(".md");if(md){const im=document.createElement("img");im.className="figimg";im.alt="";im.src=src;im.onerror=()=>{im.remove();md.style.display=""};md.style.display="none";b.insertBefore(im,md);b.classList.add("fig")}})}catch(e){}}})();
/* her own figure in her palace (and in lãnh cung while she lives there) */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{const st=$("stage");let el=document.getElementById("mefig");/* owner 11/15: she is drawn at EVERY place she is (first / left, counted in the 4 / 3 people of the stage) */const show=FIGS.length&&!!S.place;const src=show?figFor(S):"";if(!src){if(el)el.remove();return}if(!el){el=document.createElement("img");el.id="mefig";el.alt="";st.appendChild(el)}if(el.getAttribute("src")!==src)el.src=src}catch(e){}}})();

/* ================= PERSONALITY: one engine for every character ================= */
/* each trait = weights over the act menu + reaction rules; a person's behaviour = product of both traits' weights */
/* pool nết (consorts, servants, men, NPCs, the player) are merged in from THE trait table BAL.net by jnet.js; only the Emperor's own keys live here */
const PERS={
 /* the Emperor's traits drive his visits, punishments and rewards; men too */
 nongnay:{tend:"phạt nặng, sủng thất thường",w:{punish:2,reward:.8},slight:1.5,forgive:.6},nhantu:{tend:"hay khoan thứ, trọng đức",w:{punish:.5,reward:1.4,pardon:2},slight:.7,forgive:1.6},
 datinh:{tend:"thị tẩm nhiều, rải khắp",w:{visit:1.6},slight:1,forgive:1},lanhlung:{tend:"sủng lên chậm, phai chậm",w:{visit:.7},slight:1,forgive:1},chamchinh:{tend:"ít thị tẩm, trọng người bàn việc",w:{visit:.7,reward:1.1},slight:1,forgive:1},
 danghi:{tend:"dễ nghi, lời vu cáo khó gỡ",w:{punish:1.3},slight:1.2,forgive:.8},mesac:{tend:"trọng sắc",w:{visit:1.2},slight:1,forgive:1},trongtai:{tend:"trọng tài nghệ",w:{reward:1.2},slight:1,forgive:1},hieuthao:{tend:"nghe lời Thái hậu",w:{},slight:1,forgive:1}
};
const TH_TRAITS=["Ân cần","Kín đáo","Kiêu ngạo","Vì gia tộc"];
/* base answer for the two own sets only; every other person is answered by the ONE pool (jnet.js netOf wraps this) */
function traitsOf(p){if(!p||p===S)return[];if(p.kind==="emp"||p===S.emp)return S.emp.traits||[];if(p.kind==="th"||p==="th")return[S.thTrait||(S.thTrait="Ân cần")];return[]}
function persW(p,act){let w=1;for(const t of traitsOf(p)){const P=PERS[t];if(P&&P.w&&P.w[act]!=null)w*=P.w[act]}return w}
function persF(p,f,def){let v=def;for(const t of traitsOf(p)){const P=PERS[t];if(P&&P[f]!=null)v=(f==="dang"?v+P[f]:v*P[f])}return v}
function tends(p){return traitsOf(p).map(t=>PERS[t]&&PERS[t].tend).filter(Boolean).join("; ")}
/* measurement: what each trait chose */
function persCount(p,act){if(!S||!p||p===S)return;S.persLog=S.persLog||{};for(const t of traitsOf(p)){const L=S.persLog[t]=S.persLog[t]||{};L[act]=(L[act]||0)+1}}
/* danger reads both traits (one rule for every head) */
function danger(v,t){const g=Math.max(t===S?(v.ghen||0)*(persF(v,"ghen",1)>1?1.15:1):0,oan(v,t),Math.max(0,-aff(v,t)));const gate=persF(v,"harmGate",0);const d=Math.round(g+persF(v,"dang",0));return gate&&g<gate?Math.min(d,29):d}
/* harm menu: the band's acts, each weighted by the doer's traits */
function npcAct(v,t){const b=bandOf(danger(v,t));if(!b)return"";const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const add=(k,w)=>{const a=ACT[k];w*=persW(v,k);if(a&&allow.includes(k)&&a.ok(v,t)&&w>0)O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||(IT[e.k]||{}).il))O.push(["plant",3*persW(v,"plant")]);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];persCount(v,k);
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||(IT[e.k]||{}).il));return runAct(v,t,k)}
/* reactions: Oán from a slight scales with the victim's traits; forgiveness (monthly fade) too; trust gains from her too */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0&&x&&x!==S)n*=persF(x,"slight",1);return o0.call(this,x,y,n)}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){/* AG-ALL-2 G12 (one rule both ways): her trust trait slows how fast she warms to ANYONE, the player or an NPC */if(n>0&&x&&x!==S&&y&&y!==x)n*=persF(x,"trust",1);return a0.call(this,x,y,Math.round(n))}})();
function oanMonth(){for(const v of rivals){const f=Math.round(BAL.oanFade*persF(v,"forgive",1));v.oan=Math.max(0,(v.oan||0)-f);for(const k in v.ro)v.ro[k]=Math.max(0,v.ro[k]-f)}for(const k in S.ro)S.ro[k]=Math.max(0,S.ro[k]-BAL.oanFade)}
/* gifts land by trait: Kiêu ngạo shrugs at small ones, Tham vọng warms to a rising giver, Tham tiền to anything */
(function(){const g0=giftVal;giftVal=function(it,r){let v=g0.apply(this,arguments);if(r&&typeof r==="object"&&r!==S){let m=persF(r,"gift",1);const lav=persF(r,"lavish",0);if(lav&&(it.pr||0)>=lav)m=Math.max(m,1.5);{const rg=Math.max(1,...traitsOf(r).map(t=>(PERS[t]&&PERS[t].riseGift)||1));if(rg>1&&(S.rank>=r.rank||S.sung>=r.sung))m*=rg}v=Math.max(1,Math.round(v*m))}return v}})();
/* SOCIAL MENU: once a week each consort may do one non-harm deed, by her traits; the same menu toward her and toward anyone */
const SOC={
 help:{w:1,ok:(v,t)=>aff(v,t)>=10,run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run);return `${v.name} sang giúp ${NM(t)} việc trong cung`}},
 visit:{w:0.8,ok:(v,t)=>t!==S?(t.suc<50||t.preg):(S.suc<50||S.preg),run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run_2);if(t===S)apply({suc:3});return `${v.name} sang thăm ${NM(t)} lúc ốm mệt`}},
 warn:{w:0.8,ok:(v,t)=>aff(v,t)>=20&&liveRivals(true).some(x=>x!==v&&x!==t&&bandOf(danger(x,t))>=2),run:(v,t)=>{const x=mindPickBy(liveRivals(true).filter(x=>x!==v&&x!==t&&bandOf(danger(x,t))>=2),x=>danger(x,t)+Math.max(0,oan(v,x)),v);/* npc-mind: was FIRST */if(t===S){if(traitsOf(S).length){}S.dKnown=S.dKnown||{};S.dKnown[x.id]=wk();noteAdd(x.id,`${v.name} báo: nàng có ý hại ngươi`)}else{t.shield=Math.max(t.shield||0,1)}relAdd(v,t,BAL.eff.j28.run_3);return `${v.name} lén báo ${NM(t)} đề phòng ${x.name}`}},
 mediate:{w:0.8,ok:(v,t)=>t!==S&&oan(t,S)>=20,run:(v,t)=>{oanAdd(t,S,BAL.eff.j28.run_4);return `${v.name} đứng ra hòa giải giữa ${t.name} và ngươi`}},
 provoke:{w:0.6,ok:(v,t)=>danger(v,t)>=10,run:(v,t)=>{oanAdd(t,v,BAL.eff.j28.run_5);if(t===S)apply({duc:0});else t.ghen=cl(t.ghen+3,0,100);ap(v,{danh:-1});return `${v.name} buông lời khiêu khích ${NM(t)}`}},
 humiliate:{w:0.5,ok:(v,t)=>danger(v,t)>=18&&rkOf(v)>=rkOf(t),run:(v,t)=>{oanAdd(t,v,BAL.eff.j28.run_6);ap(t,{danh:-2});ap(v,{danh:-1});return `${v.name} hạ nhục ${NM(t)} trước mặt cung nhân`}},
 flaunt:{w:0.5,ok:(v,t)=>v.sung>=40,run:(v,t)=>{liveRivals(true).forEach(x=>{if(x!==v)x.ghen=cl(x.ghen+2,0,100)});return `${v.name} đi khắp cung khoe quà ngự ban`}},
 spy:{w:0.6,ok:()=>true,run:(v,t)=>{evA(v,t,roll(40)?BAL.eff.j28.evRun[0]:BAL.eff.j28.evRun[1]);return `Người của ${v.name} dò hỏi giờ giấc của ${NM(t)}`}},
 test:{w:0.4,ok:(v,t)=>aff(v,t)>=0,run:(v,t)=>{const ok=t===S?roll(60):roll(50);affAdd(v,t,ok?BAL.eff.j28.run_7[0]:BAL.eff.j28.run_7[1]);return `${v.name} thử lòng ${NM(t)}: ${ok?"tin thêm một chút":"càng ngờ vực"}`}},
 check:{w:0.4,ok:v=>v.inv.some(e=>!e.h),run:v=>{const i=v.inv.findIndex(e=>e.t);if(i>=0){const x=v.inv.splice(i,1)[0];if(typeof ilGone==="function")ilGone(v,x,"evid");return `${v.name} cho soát quà, vứt bỏ một món có độc`}return `${v.name} cho thái y soát lại quà được tặng`}},
 ally:{w:0.6,ok:(v,t)=>t!==S?t.sung>=v.sung:S.sung>=v.sung,run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run_8);return `${v.name} tìm đến kết thân với ${NM(t)} đang được sủng`}},
 drop:{w:0.6,ok:(v,t)=>aff(v,t)>=30&&(t===S?S.sung<25||S.confined:t.sung<25||t.confined),run:(v,t)=>{affAdd(v,t,BAL.eff.j28.run_9);return `${v.name} lạnh nhạt với ${NM(t)} lúc sa cơ`}},
 steal:{w:0.5,ok:(v,t)=>(t===S?S.tonight:true)&&v.sung>=20,run:(v,t)=>{ap(v,{sung:2});ap(t,{sung:-2});oanAdd(t,v,BAL.eff.j28.run_10);return `${v.name} khéo léo cướp đêm thị tẩm của ${NM(t)}`}},
 bribeksp:{w:0.4,ok:v=>v.bac>=BAL.bacFee.ksp,run:v=>{ap(v,{bac:-BAL.bacFee.ksp,sung:2});return `${v.name} đút lót Kính sự phòng để được lật thẻ`}},
 follow:{w:0.5,ok:v=>liveRivals(true).some(x=>x!==v&&rkOf(x)>rkOf(v)+1),run:v=>{const L=liveRivals(true).filter(x=>x!==v&&rkOf(x)>rkOf(v)+1);const x=mindPickBy(L,y=>BAL.mind.pick.j28up.base+rkOf(y)+Math.max(0,aff(v,y))/BAL.mind.pick.j28up.aff,v);relAdd(v,x,BAL.eff.j28.run_11)/* npc-mind: was ARGMAX rank */;return `${v.name} nép theo ${x.name}`}},
 feign:{w:0.5,ok:(v,t)=>danger(v,t)>=20,run:(v,t)=>{affAdd(t,v,BAL.eff.j28.run_12);return `${v.name} niềm nở với ${NM(t)}, chuyện trò thân mật`}},
 apologise:{w:0.4,ok:(v,t)=>oan(t,v)>=15,run:(v,t)=>{oanAdd(t,v,BAL.eff.j28.run_13);return `${v.name} sang xin lỗi ${NM(t)}`}},
 serveTH:{w:0.5,ok:()=>!S.thDead,run:v=>{v.th=cl((v.th||0)+2,-100,100);return `${v.name} sớm hôm hầu hạ Thái hậu`}},
 gossip:{w:0.4,ok:()=>true,run:(v,t)=>{const x=pick(liveRivals(true).filter(y=>y!==v));if(x)ap(x,{danh:-1});return `${v.name} rỉ tai chuyện trong cung`}},
 pray:{w:0.3,ok:()=>true,run:v=>{v.pray=Math.max(v.pray||0,1);return `${v.name} lên chùa cầu khấn`}},
 idle:{w:3,ok:()=>true,run:()=>""}};
function npcSocial(v){const T=others(v);if(!T.length)return"";const t=mindPickBy(T,x=>BAL.mind.pick.j28soc.base+Math.abs(aff(v,x))/BAL.mind.pick.j28soc.aff+oan(v,x)/BAL.mind.pick.j28soc.oan,v);/* npc-mind: was UNIFORM; people deal more with those they feel strongly about */const O=[];for(const k in SOC){const s=SOC[k];let w=s.w*persW(v,k)*mindW(v,(MIND_SOC[k]||"social"));if(w>0&&s.ok(v,t))O.push([k,w])}if(!O.length)return"";
 let r=Math.random()*O.reduce((a,b)=>a+b[1],0),i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}const k=O[i][0];persCount(v,k);if(k==="idle")return"";const txt=SOC[k].run(v,t);
 if(txt)newsAdd(v,k,txt,t===S||v.id===undefined);return t===S&&txt?txt+". ":""}
/* the weekly news feed: deeds that show character; seen deeds may reveal a trait */
function newsAdd(v,k,txt,toMe){S.news=S.news||[];const seen=toMe||roll(BAL.odb.j28.rbSeen+eyes(S)*8)||(S.staff||[]).some(s=>netIs(s,"talk")&&roll(30));if(!seen)return;S.news.unshift({w:wk(),id:v.id,k,t:txt});if(S.news.length>40)S.news.length=40;
 S.trK=S.trK||{};const T=traitsOf(v);const which=T.find(t=>PERS[t]&&PERS[t].w&&PERS[t].w[k]>1.5);if(which){const K=S.trK[v.id]=S.trK[v.id]||[];if(!K.includes(which)&&roll(35)){K.push(which);noteAdd(v.id,`Qua việc ${txt.replace(v.name+" ","")}: lộ nết ${which}`)}}}
function trKnown(v){S.trK=S.trK||{};if(typeof k61Kin==="function"&&k61Kin(v))return[v.tr,v.tr2].filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1));/* home family: she knows their nature */return S.trK[v.id]||[]}
function learnTrait(v,why){const T=traitsOf(v).filter(t=>!trKnown(v).includes(t));if(!T.length)return"";const t=T[0];(S.trK[v.id]=S.trK[v.id]||[]).push(t);noteAdd(v.id,`${why}: biết nàng ${t}`);return t}
(function(){const r0=rivalsTurn;rivalsTurn=function(){let ev=r0.apply(this,arguments);try{if(S.dead)return ev;for(const v of liveRivals(true)){if(v.confined)continue;if(roll(60)){const t=npcSocial(v);if(t)ev+=t}}}catch(e){}return ev}})();
/* talking to someone, her servants' reports and watching them reveal traits */
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&S.chat[v.id]>=1&&roll(30))learnTrait(v,"Chuyện trò")}catch(e){}return r}})();
/* weekly news card section */
function newsHTML(){const L=(S.news||[]).filter(n=>wk()-n.w<=3);if(!L.length)return"";return `<h3>Tin trong cung tuần qua</h3><div class="pcb rows">${L.slice(0,8).map(n=>{const v=RV(n.id);return `<div class="pcrow"><span>${v?mdH(pv(v),"xs"):""} ${n.t}</span></div>`}).join("")}</div>`}
(function(){if(typeof wkSummary!=="function")return;const w0=wkSummary;wkSummary=function(){let h=w0.apply(this,arguments);try{const n=newsHTML();if(n&&typeof h==="string")h+=n}catch(e){}return h}})();
/* the dossier: traits hidden until learned, then a one-line 'tends to' */
function trLine(v){const K=trKnown(v);const T=traitsOf(v);const un=T.filter(t=>!K.includes(t)).length;return (K.length?K.map(t=>`<b>${kitGloss(t)}</b>`).join(" · ")+(un?` <span class="past">(còn ${un} nết chưa rõ)</span>`:""):`<span class="past">chưa rõ</span>`)+(K.length?`<br><span class="past">Hay: ${K.map(t=>PERS[t]&&PERS[t].tend).filter(Boolean).join("; ")}</span>`:"")}
function trChip(v){const K=trKnown(v);return K.length?K.join(" · "):"Tính nết: chưa rõ"}
