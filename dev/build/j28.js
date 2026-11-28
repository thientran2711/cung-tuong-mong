/* ================= FIGURES: full-body art read from img/FIGURES.json when present; faces otherwise ================= */
/* manifest: an array (or {figures:[...]}) of {file, role, tier, trait, ageBand, look}; fig-* full body, por-* portrait */
let FIGS=[];
(function(){try{fetch("img/FIGURES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{const L=Array.isArray(j)?j:j&&(j.figures||j.files||j.items)||[];FIGS=L.filter(x=>x&&(x.file||x.src));if(FIGS.length&&S)render()}).catch(()=>{})}catch(e){}})();
const TRK={"Xảo quyệt":"hiemdoc","Kiêu ngạo":"kieungao","Ân cần":"hienlanh","Kín đáo":"danghi","Tham vọng":"thamvong","Khiêm nhường":"numi"};
function figRole(p){if(p===S)return"heroine";const k=p&&p.kind;if(k==="emp"||p===S.emp)return"emperor";if(k==="th")return"thaihau";if(k==="man"||(p&&p.ref&&p.ref.rw))return"man";if(k==="ty")return"physician";if(k==="maid"||k==="serv")return(p.ref&&p.ref.role==="eunuch")?"eunuch":"maid";return"consort"}
function ageBandOf(a){const B=BAL.ageBand;return a>=B[1]?"old":a>=B[0]?"mid":"young"}
function norm(x){return String(x==null?"":x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]/g,"")}
/* KIT §95.4 K-SRV-OWNFIG (KK63, RV-177 FAIL-1 on nhv-areas, laws 9 + 11): the servant-path stage entry for the Emperor / Thái y is servant-SHAPED
   ({kind:"srv",sk:"emp"|"ty"}, j95 j95ledObj + j42 srvVisitOf) — every kit figure function first maps it to the real person (the Emperor = S.emp, the
   Thái y = {kind:"ty"}), so stage / ring / speaker / pane all draw his OWN figure, never the grey stand-in (was only inside jnhv nhvKind).
   figFor is re-assigned by several files (j39 / j88 full bodies, jkc / jstaff / jty wrappers): the mapping is the late wrapper in jkstage.js. */
function kitFigWho(p){try{if(p&&p.kind==="srv"&&!p.ref){if(p.sk==="emp")return (typeof S!=="undefined"&&S&&S.emp)||{kind:"emp",name:p.name};if(p.sk==="ty")return{kind:"ty",name:p.name,id:"ty"}}}catch(e){}return p}
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
 danghi:{tend:"Đa nghi, lời vu cáo khó gỡ",w:{punish:1.3},slight:1.2,forgive:.8},mesac:{tend:"trọng sắc",w:{visit:1.2},slight:1,forgive:1},trongtai:{tend:"trọng tài nghệ",w:{reward:1.2},slight:1,forgive:1},hieuthao:{tend:"nghe lời Thái hậu",w:{},slight:1,forgive:1}
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
/* heat (review/net-build step 0): oán counts whole, ghen and dislike only their BAL.net.heat share — before, ghen 99 toward a favoured girl put EVERY consort at band 3 */
function danger(v,t){const H=BAL.net.heat;const g=Math.max(t===S?(v.ghen||0)*(persF(v,"ghen",1)>1?1.15:1)*H.ghenK:0,oan(v,t),Math.max(0,-aff(v,t))*H.affK);const gate=persF(v,"harmGate",0);const d=Math.round(g+persF(v,"dang",0));return gate&&g<gate?Math.min(d,29):d}
/* harm menu: the band's acts, each weighted by the doer's traits */
function npcAct(v,t){const b=bandVT(v,t);if(!b)return"";const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const add=(k,w)=>{const a=ACT[k];w*=persW(v,k);if(a&&allow.includes(k)&&a.ok(v,t)&&w>0)O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||(IT[e.k]||{}).il))O.push(["plant",3*persW(v,"plant")]);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];persCount(v,k);
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||(IT[e.k]||{}).il));return runAct(v,t,k)}
/* reactions: Oán from a slight scales with the victim's traits; forgiveness (monthly fade) too; trust gains from her too */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0&&x&&x!==S)n*=persF(x,"slight",1);return o0.call(this,x,y,n)}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){/* AG-ALL-2 G12 (one rule both ways): her trust trait slows how fast she warms to ANYONE, the player or an NPC */if(n>0&&x&&x!==S&&y&&y!==x)n*=persF(x,"trust",1);return a0.call(this,x,y,Math.round(n))}})();
/* review/pace-all PART B (owner OD 26/11 ~08:25Z «làm cách nào để giảm bớt oán … Điểm thì nó tăng cao chót vót mà không biết làm cách nào để cho nó giảm»):
   OÁN COOL-DOWN = the ONE fade of every grudge (canon overwrite: it replaces the old flat «BAL.oanFade a month»; oanMonth keeps its monthly hooks).
   Each tuần (rivalsTurn), a grudge nothing new fed for BAL.oanCool.quiet tuần fades by (the width of its oán band, BAL.oanLv) ÷ BAL.oanCool.season
   × the holder's nết (persF "forgive": Thù dai slower, Rộng lượng faster), so a feud left alone one season drops one band. Same rule for every holder:
   consorts, men, servants and HER own oán toward them (law 1). It never goes below the floor while the CAUSE stands (law 6a real evidence): the holder
   still remembers a bad deed of that person (jmem memTop, weight ≥ BAL.mem.faint) → floor «Chút oán» (BAL.oanLv[floor.mem − 1]); a deed carved for
   life (keep / khắc cốt) → «Oán» (BAL.oanLv[floor.keep − 1]); the memory itself fades by BAL.mem.fadeMo, then the floor goes. A new rise
   (oanAdd n > 0) restarts the quiet count (p.ocq[key] = tuần of the last rise); fractions carry (p.occ). Old saves: no stamp = quiet. */
function ocBandW(v){const L=BAL.oanLv;let i=0;while(i<L.length&&v>=L[i])i++;return Math.max(1,(i<L.length?L[i]:100)-(i?L[i-1]:0))}
function ocKey(p){return p===S?"me":p&&p.id!=null?String(p.id):null}
function ocWk(){try{return wk()}catch(e){return 0}}
function ocStamp(x,y){try{if(!x||!y||typeof x!=="object")return;const k=ocKey(y);if(k==null)return;(x.ocq=x.ocq&&typeof x.ocq==="object"?x.ocq:{})[k]=ocWk()}catch(e){}}
function ocFloor(h,t){const C=BAL.oanCool,L=BAL.oanLv;try{if(typeof memTop!=="function"||!t)return 0;const m=memTop(h,t,-1);if(!m)return 0;
  if(m.L||m.k)return L[C.floor.keep-1]||0;return m.g>=BAL.mem.faint?(L[C.floor.mem-1]||0):0}catch(e){return 0}}
/* fade one grudge value v held by h toward t (key k) by w tuần of cool-down; returns the new value */
/* review/oan-pace (c) (owner OD 26/11 ~18:40Z «giảm quá chậm»): the longer the holder is left alone, the faster (× 1 + alone.k × days quiet past
   quiet, at most alone.max days; an old save with no stamp = alone the longest); a deep grudge (≥ BAL.oanLv[deep.lv − 1]) slower (× deep.k) */
function ocOne(h,t,k,v,w,kf){const C=BAL.oanCool;v=+v||0;if(!(v>0))return v;const q=h.ocq&&h.ocq[k];const qd=q==null?1e9:ocWk()-q;if(qd<C.quiet)return v;
 const fl=ocFloor(h,t);if(v<=fl)return v;const cc=h.occ=h.occ&&typeof h.occ==="object"?h.occ:{};
 const A=C.alone,Dp=C.deep,m=(1+A.k*Math.min(A.max,qd-C.quiet))*(v>=BAL.oanLv[Dp.lv-1]?Dp.k:1);
 const d=(cc[k]||0)+w*ocBandW(v)/C.season*kf*m;const n=Math.floor(d);cc[k]=Math.round((d-n)*1000)/1000;if(!n)return v;return Math.max(fl,v-n)}
function ocPerson(id){try{return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&String(v.id)===String(id))||null}catch(e){return null}}
/* w tuần of cool-down for every grudge in the world; mine = also HER own grudges (S.ro) */
function oanCool(w,mine,onlyMine){const C=BAL.oanCool;if(!C||!C.on||!S)return;w=w||1;
 if(!onlyMine)for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||typeof v!=="object"||v.alive===false)continue;
  /* co-op (review B1): the friend entry (jcoopworld buildFriend, v.coop) mirrors the OTHER player's own grudges (toCanon writes them back into her S.ro);
     those cool once, on her own client (oanMonth → oanCool(3,true,true) / her rivalsTurn S.ro pass) — never a second time here */if(v.coop)continue;const kf=persF(v,"forgive",1);
  if(v.oan)v.oan=ocOne(v,S,"me",v.oan,w,kf);if(v.ro&&typeof v.ro==="object")for(const k in v.ro)v.ro[k]=ocOne(v,ocPerson(k),k,v.ro[k],w,kf)}
 if(mine&&S.ro)for(const k in S.ro)S.ro[k]=ocOne(S,ocPerson(k),k,S.ro[k],w,C.me);
 /* rel-men-servants: men and servants forget by the same rule (their nết, j28 persF) */
 if(!onlyMine)for(const h of relMSAll()){const kf=persF(h,"forgive",1);if(h.oan)h.oan=ocOne(h,S,"me",h.oan,w,kf);if(h.ro&&typeof h.ro==="object")for(const k in h.ro)h.ro[k]=ocOne(h,ocPerson(k),k,h.ro[k],w,kf)}}
/* the weekly jealousy fade of one consort (j8 rivalsTurn): BAL.oanCool.ghen.than when she likes her, .base otherwise, + .pct of the jealousy itself (high jealousy
   cools faster: a quiet season takes about a third off, like one oán band), × her nết; fractions carry (v.gcc) */
function ghenCool(v){const G=BAL.oanCool.ghen;const b0=(+v.rel||0)>=netTh(v,"than")?G.than:G.base;/* rollback (BAL.oanCool.on = 0): the old flat «3 : 1» exactly */
 if(!(BAL.oanCool&&BAL.oanCool.on))return b0;const b=(b0+G.pct*(+v.ghen||0))*(typeof opGfK==="function"?opGfK(+v.ghen||0,(+S.sung||0)-(+v.sung||0),v.gLw):1)/* review/oan-pace-ghen: × alone / deep / relative favour */;const d=(+v.gcc||0)+b*persF(v,"forgive",1),n=Math.floor(d);v.gcc=Math.round((d-n)*1000)/1000;return n}
/* the weekly tick: inside rivalsTurn (host only in co-op: jcoopworld mutes it on the guest, whose OWN grudges cool in her oanMonth, 3 tuần at once) */
(function(){const r0=rivalsTurn;rivalsTurn=function(){const r=r0.apply(this,arguments);try{oanCool(1,true)}catch(e){console.error("oanCool",e)}return r}})();
/* a new rise restarts the quiet count of that grudge */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0)ocStamp(x,y);return o0.apply(this,arguments)}})();
function oanMonth(){if(BAL.oanCool&&BAL.oanCool.on){try{if(typeof worldOn==="function"&&!worldOn())oanCool(3,true,true)}catch(e){}return}
 for(const v of rivals){const f=Math.round(BAL.oanFade*persF(v,"forgive",1));v.oan=Math.max(0,(v.oan||0)-f);for(const k in v.ro)v.ro[k]=Math.max(0,v.ro[k]-f)}for(const k in S.ro)S.ro[k]=Math.max(0,S.ro[k]-BAL.oanFade);
 /* rel-men-servants: men and servants forget by the same rule (their nết, j28 persF) */
 for(const h of relMSAll()){const f=Math.round(BAL.oanFade*persF(h,"forgive",1));if(h.oan)h.oan=Math.max(0,h.oan-f);if(h.ro&&typeof h.ro==="object")for(const k in h.ro)h.ro[k]=Math.max(0,h.ro[k]-f)}}/* rv-promo-stack-lr4: LIVE rollback line restored (the token merge had put D's oanCool(h,x) call here; LIVE oanCool is (w,mine,onlyMine) → wrote undefined) */
/* gifts land by trait: Kiêu ngạo shrugs at small ones, Tham vọng warms to a rising giver, Tham tiền to anything */
(function(){const g0=giftVal;giftVal=function(it,r){let v=g0.apply(this,arguments);if(r&&typeof r==="object"&&r!==S){let m=persF(r,"gift",1);const lav=persF(r,"lavish",0);if(lav&&(it.pr||0)>=lav)m=Math.max(m,1.5);{const rg=Math.max(1,...traitsOf(r).map(t=>(PERS[t]&&PERS[t].riseGift)||1));if(rg>1&&(S.rank>=r.rank||S.sung>=r.sung))m*=rg}v=Math.max(1,Math.round(v*m))}return v}})();
/* SOCIAL MENU: once a week each consort may do one non-harm deed, by her traits; the same menu toward her and toward anyone */
const SOC={
 help:{w:1,ok:(v,t)=>aff(v,t)>=netTh(v,"quen"),run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run);return `${v.name} sang giúp ${NM(t)} việc trong cung`}},
 visit:{w:0.8,ok:(v,t)=>t!==S?(t.suc<50||t.preg):(S.suc<50||S.preg),run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run_2);if(t===S)apply({suc:3});return `${v.name} sang thăm ${NM(t)} lúc ốm mệt`}},
 warn:{w:0.8,ok:(v,t)=>aff(v,t)>=netTh(v,"than")&&liveRivals(true).some(x=>x!==v&&x!==t&&bandVT(x,t)>=2),run:(v,t)=>{const x=mindPickBy(liveRivals(true).filter(x=>x!==v&&x!==t&&bandVT(x,t)>=2),x=>danger(x,t)+Math.max(0,oan(v,x)),v);/* npc-mind: was FIRST */if(t===S){if(traitsOf(S).length){}S.dKnown=S.dKnown||{};S.dKnown[x.id]=wk();noteAdd(x.id,`${v.name} báo: nàng có ý hại ngươi`)}else{t.shield=Math.max(t.shield||0,1)}relAdd(v,t,BAL.eff.j28.run_3);return `${v.name} lén báo ${NM(t)} đề phòng ${x.name}`}},
 mediate:{w:0.8,ok:(v,t)=>!!t&&t!==v/* row11-law1 r2 (law 1): the TW rule only (jtwoway TWD mediate req: t holds an oán ≥ «oan» on someone — her or an NPC — and twDo runs the ONE Hòa giải, RCVK answer by the holder), as her button; it used to be «only a grudge t holds against HER» */,run:(v,t)=>{/* net-build: she lets it go only while her oán is under her own «nguoi» level */if(!netForgive(t,S))return `${v.name} đứng ra hòa giải giữa ${t.name} và ngươi, nhưng ${t.name} không chịu bỏ qua`;oanAdd(t,S,BAL.eff.j28.run_4);return `${v.name} đứng ra hòa giải giữa ${t.name} và ngươi`}},
 provoke:{w:0.6,ok:(v,t)=>danger(v,t)>=netThK(v,"act","provoke")&&mockOK(v,t)/* rank respect */,run:(v,t)=>{oanAdd(t,v,BAL.eff.j28.run_5);if(t===S)apply({duc:0});else ghenUp(t,3,`bị ${v.name} buông lời khiêu khích`,v);ap(v,{danh:-1});return `${v.name} buông lời khiêu khích ${NM(t)}`}},
 humiliate:{w:0.5,ok:(v,t)=>danger(v,t)>=netThK(v,"act","humiliate")&&mockOK(v,t),run:(v,t)=>{oanAdd(t,v,BAL.eff.j28.run_6);ap(t,{danh:-2});ap(v,{danh:-1});return `${v.name} hạ nhục ${NM(t)} trước mặt cung nhân`}},
 flaunt:{w:0.5,ok:(v,t)=>v.sung>=40,run:(v,t)=>{liveRivals(true).forEach(x=>{if(x!==v)ghenUp(x,2,`thấy ${v.name} khoe quà ngự ban`,v)});return `${v.name} đi khắp cung khoe quà ngự ban`}},
 spy:{w:0.6,ok:()=>true,run:(v,t)=>{evA(v,t,roll(40)?BAL.eff.j28.evRun[0]:BAL.eff.j28.evRun[1]);return `Người của ${v.name} dò hỏi giờ giấc của ${NM(t)}`}},
 test:{w:0.4,ok:(v,t)=>aff(v,t)>=0,run:(v,t)=>{const ok=t===S?roll(60):roll(50);affAdd(v,t,ok?BAL.eff.j28.run_7[0]:BAL.eff.j28.run_7[1]);return `${v.name} thử lòng ${NM(t)}: ${ok?"tin thêm một chút":"càng ngờ vực"}`}},
 check:{w:0.4,ok:v=>v.inv.some(e=>!e.h),run:v=>{const i=v.inv.findIndex(e=>e.t);if(i>=0){const x=v.inv.splice(i,1)[0];if(typeof ilGone==="function")ilGone(v,x,"evid");return `${v.name} cho soát quà, vứt bỏ một món có độc`}return `${v.name} cho thái y soát lại quà được tặng`}},
 ally:{w:0.6,ok:(v,t)=>t!==S?t.sung>=v.sung:S.sung>=v.sung,run:(v,t)=>{relAdd(v,t,BAL.eff.j28.run_8);return `${v.name} tìm đến kết thân với ${NM(t)} đang được sủng`}},
 drop:{w:0.6,ok:(v,t)=>aff(v,t)>=netTh(v,"than")&&(t===S?S.sung<25||S.confined:t.sung<25||t.confined),run:(v,t)=>{affAdd(v,t,BAL.eff.j28.run_9);return `${v.name} lạnh nhạt với ${NM(t)} lúc sa cơ`}},
 steal:{w:0.5,ok:(v,t)=>(t===S?S.tonight:true)&&v.sung>=20,run:(v,t)=>{ap(v,{sung:2});ap(t,{sung:-2});oanAdd(t,v,BAL.eff.j28.run_10);return `${v.name} khéo léo cướp đêm thị tẩm của ${NM(t)}`}},
 bribeksp:{w:0.4,ok:v=>v.bac>=BAL.bacFee.ksp,run:v=>{ap(v,{bac:-BAL.bacFee.ksp,sung:2});return `${v.name} đút lót Kính sự phòng để được lật thẻ`}},
 follow:{w:0.5,ok:v=>liveRivals(true).some(x=>x!==v&&rkOf(x)>rkOf(v)+1),run:v=>{const L=liveRivals(true).filter(x=>x!==v&&rkOf(x)>rkOf(v)+1);const x=mindPickBy(L,y=>BAL.mind.pick.j28up.base+rkOf(y)+Math.max(0,aff(v,y))/BAL.mind.pick.j28up.aff,v);relAdd(v,x,BAL.eff.j28.run_11)/* npc-mind: was ARGMAX rank */;return `${v.name} nép theo ${x.name}`}},
 feign:{w:0.5,ok:(v,t)=>danger(v,t)>=netThK(v,"act","feign"),run:(v,t)=>{affAdd(t,v,BAL.eff.j28.run_12);return `${v.name} niềm nở với ${NM(t)}, chuyện trò thân mật`}},
 apologise:{w:0.4,ok:(v,t)=>oan(t,v)>=netTh(t,"oan")&&netForgive(t,v)/* jmend: deep grudge → the costly roads */,run:(v,t)=>{/* net-build: accepted only under the wronged one's «nguoi» level (Rộng lượng forgives deep wrongs, Thù dai / Kiêu ngạo hardly) */if(!netForgive(t,v))return netRefused(v,t,"sang xin lỗi");oanAdd(t,v,BAL.eff.j28.run_13);return `${v.name} sang xin lỗi ${NM(t)}`}},
 serveTH:{w:0.5,ok:()=>!S.thDead,run:v=>{spAdd(v,"th",2);return `${v.name} sớm hôm hầu hạ Thái hậu`}},
 gossip:{w:0.4,ok:v=>liveRivals(true).some(y=>y!==v&&hostility(v,y)>=netTh(v,"tell")),run:(v,t)=>{/* net-build: she spreads talk about someone she bears enough against (her «tell» level: Nhiều chuyện soon, Kín đáo hardly) */const x=pick(liveRivals(true).filter(y=>y!==v&&hostility(v,y)>=netTh(v,"tell")));if(x)ap(x,{danh:-1});return `${v.name} rỉ tai chuyện trong cung`}},
 pray:{w:0.3,ok:()=>true,run:v=>{v.pray=Math.max(v.pray||0,1);return `${v.name} lên chùa cầu khấn`}},
 idle:{w:3,ok:()=>true,run:()=>""}};
function npcSocial(v){const T=others(v);if(!T.length)return"";const t=mindPickBy(T,x=>BAL.mind.pick.j28soc.base+Math.abs(aff(v,x))/BAL.mind.pick.j28soc.aff+oan(v,x)/BAL.mind.pick.j28soc.oan,v);/* npc-mind: was UNIFORM; people deal more with those they feel strongly about */const O=[];for(const k in SOC){const s=SOC[k];let w=s.w*persW(v,k)*mindW(v,(MIND_SOC[k]||"social"));if(w>0&&s.ok(v,t))O.push([k,w])}if(!O.length)return"";
 let r=Math.random()*O.reduce((a,b)=>a+b[1],0),i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}const k=O[i][0];persCount(v,k);if(k==="idle")return"";const txt=SOC[k].run(v,t);
 if(txt)newsAdd(v,k,txt,t===S||v.id===undefined);return t===S&&txt?txt+". ":""}
/* the weekly news feed: deeds that show character; seen deeds may reveal a trait */
function newsAdd(v,k,txt,toMe){S.news=S.news||[];/* npc-purpose G2: news reaches her through a real witness who chooses to tell (grudge vs the doer / liking for her), her informants (eyes), or a talkative servant of hers */
 const seen=toMe||(()=>{try{return !!npcTell(v,{place:whereOf(v)})}catch(e){return false}})()||(eyes(S)>=1&&roll(BAL.odb.j28.rbSeen+eyes(S)*8))||(S.staff||[]).some(s=>netIs(s,"talk")&&roll(30));if(!seen)return;S.news.unshift({w:wk(),id:v.id,k,t:txt});if(S.news.length>40)S.news.length=40;try{kitKnow({key:"news:"+v.id+":"+k,pri:1,text:txt})}catch(e){}/* KNOW-NOTICE: a rumour she hears = one notice */
 S.trK=S.trK||{};const T=traitsOf(v);const which=nsNetOpen()?null/* news-sieve: nết is open from the start, a deed no longer «reveals» it */:T.find(t=>PERS[t]&&PERS[t].w&&PERS[t].w[k]>1.5);if(which){const K=S.trK[v.id]=S.trK[v.id]||[];if(!K.includes(which)&&roll(35)){K.push(which);noteAdd(v.id,`Qua việc ${txt.replace(v.name+" ","")}: lộ nết ${which}`);try{kitKnow({key:"n:"+v.id,pri:2,text:`Ngươi biết ${knowWho(v)} vốn tính ${String(which).toLowerCase()}.`})}catch(e){}}}}
/* NẾT OPEN (owner OD 26/11 ~04:40Z: "những thông tin này không cần thiết phải giấu nữa"): with BAL.news.netOpen every consort's nết is known
   from the start (trKnown = all of them); trLearned keeps the old «what she found out» list for the rules that read it (j85 ducKnown) */
function nsNetOpen(){try{return !!(BAL.news&&BAL.news.on&&BAL.news.netOpen)}catch(e){return false}}
function trKnown(v){if(v&&v!==S&&nsNetOpen()){try{const T=traitsOf(v);if(T&&T.length)return T.slice()}catch(e){}}return trLearned(v)}
function trLearned(v){S.trK=S.trK||{};if(typeof k61Kin==="function"&&k61Kin(v))return[v.tr,v.tr2].filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1));/* home family: she knows their nature */return S.trK[v.id]||[]}
function learnTrait(v,why,shown){/* shown: the caller's card already tells this nature (KNOW-NOTICE, no second notice) */const T=traitsOf(v).filter(t=>!trKnown(v).includes(t));if(!T.length)return"";const t=T[0];(S.trK[v.id]=S.trK[v.id]||[]).push(t);noteAdd(v.id,`${why}: biết nàng ${t}`,shown);try{if(!shown)kitKnow({key:"n:"+v.id,pri:2,text:`Ngươi biết ${knowWho(v)} vốn tính ${String(t).toLowerCase()}.`})}catch(e){}return t}
/* KNOW-NOTICE: the name a notice may print for someone (never a name she has not learned) */
function knowWho(v){try{return typeof kitKnownName==="function"&&!kitKnownName(v)?(typeof k61Desc==="function"?k61Desc(v):"một người"):v.name}catch(e){return"người ấy"}}
(function(){const r0=rivalsTurn;rivalsTurn=function(){let ev=r0.apply(this,arguments);try{if(S.dead)return ev;for(const v of liveRivals(true)){if(v.confined)continue;if(npcWhy("socDeed",{v})){const t=npcSocial(v);if(t)ev+=t}}/* npc-purpose G2: she spends her week on someone only when she feels strongly about someone (liking or grudge) */}catch(e){}return ev}})();
/* talking to someone, her servants' reports and watching them reveal traits */
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&S.chat[v.id]>=1&&roll(30))learnTrait(v,"Chuyện trò")}catch(e){}return r}})();
/* weekly news card section */
function newsHTML(){const L=(S.news||[]).filter(n=>wk()-n.w<=3&&!n.npc/* news-sieve: NPC-only deeds go to the month */);if(!L.length)return"";return `<h3>Tin trong cung tuần qua</h3><div class="pcb rows">${L.slice(0,8).map(n=>{const v=RV(n.id);return `<div class="pcrow"><span>${v?mdH(pv(v),"xs"):""} ${n.t}</span></div>`}).join("")}</div>`}
(function(){if(typeof wkSummary!=="function")return;const w0=wkSummary;wkSummary=function(){let h=w0.apply(this,arguments);try{const n=newsHTML();if(n&&typeof h==="string")h+=n}catch(e){}return h}})();
/* the dossier: traits hidden until learned, then a one-line 'tends to' */
function trLine(v){const K=trKnown(v);const T=traitsOf(v);const un=T.filter(t=>!K.includes(t)).length;return (K.length?K.map(t=>`<b>${kitGloss(t)}</b>`).join(" · ")+(un?` <span class="past">(còn ${un} nết chưa rõ)</span>`:""):`<span class="past">chưa rõ</span>`)+(K.length?`<br><span class="past">Hay: ${K.map(t=>PERS[t]&&PERS[t].tend).filter(Boolean).join("; ")}</span>`:"")}
function trChip(v){const K=trKnown(v);return K.length?K.join(" · "):"Tính nết: chưa rõ"}
