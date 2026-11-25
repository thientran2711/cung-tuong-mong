/* ================= jnhv: NGỰ HOA VIÊN — KHU VƯỜN (second Dư đồ level + area scene + vòng nhóm + thẻ gỗ) =================
   Owner OD 24/11 ~15:40Z (areas adopted: tap Ngự hoa viên → its own map with areas + head-counts, she enters ONE area), ~15:30Z (≤ 3–4 groups per view,
   no hard cap, NPCs come with a PURPOSE, bright background, only figures dim, the chosen person steps out, no frame on the scene, picker by her feet),
   ~08:05Z/~08:20Z (vòng nhóm: groups of 1–4 doing something together, line over their heads), ~07:58Z (followers behind their master), ~09:05Z (dim figures only),
   25/11 ~21:55Z (✓/✕ confirm — kit part, KK32), ~22:05Z (build it all). Plan: dev/AREA_PLAN.md (review/ring-design-3), mock review/ring-design-4 (KAR, MAIN 127 FAIL 1–7 fixed here).
   ONE SOURCE (law 6b): who is in the garden and what they do = the j95 record (S.roster, the same count as the Dư đồ chip countAt); which area = AREA_PLAN rules 1–6 on that
   record + BAL.area only (law 4) — deterministic per buổi × khắc and NEVER from the screen size (MAIN 127 FAIL 1): Fold and iPad show the same areas and the same people.
   KIT PARTS (law 9): garden map = kitPalaceMap §76 (this module only answers its kpm* questions for slot "p:vuon"); figures = the stage's own pictures
   (figFor / §59.1 stand-in .ksil, opaque); name plate = j59tagHTML; group line = kit .kchip; dim = kitDim §98.3; person acts = kitPick §98.1 (thẻ gỗ treo)
   fed by the real act list (jdfv dfData) and run by the real act flow (kitFocus + dfTap: rules card, on-figure game, result, log).
   Wraps only: kpmParts, kpmMulti, kpmArt, kpmSplit, kpmHallOf, hallName, hallRole, kitPalaceMap, curPeople, placeOf, renderStage. Off: BAL.area.on = 0. */
(function(){try{
const SLOT="p:vuon",K="vuon";
const AB=()=>BAL.area;
const on=()=>{try{return !!(BAL.area&&BAL.area.on&&typeof S!=="undefined"&&S&&!S.dead&&!(window.COOPW&&COOPW.on))}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const kv=()=>document.documentElement.classList.contains("kv2")?"kv2":"kv1";
/* one short line per record act (cổ trang); else «Đang <ACT95>» */
const CAP={"ag_cx3:pmPlay":"Đang cùng chơi cờ","ag_cx3:pmDuel":"Đang thách đấu cờ","ag_cx3:talkSecret":"Đang to nhỏ chuyện riêng","ag_cx3:talkHealth":"Đang hỏi han sức khỏe",
 "ag_cx3:talkPraise":"Đang khen ngợi nhau","ag_cx3:talkGossip":"Đang bàn tán","ag_cx3:qin":"Đang gảy đàn","ag_flaunt":"Đang khoe sắc","ag_effort":"Đang dạo vườn",
 "ag_cx2:court":"Đang chờ được để mắt","ag_cx2:show":"Đang trổ tài","ag_cx2:flat":"Đang nói lời ngọt","stroll":"Hoàng thượng ngự du","seekemp":"Đang chờ gặp Hoàng thượng",
 "provoke":"Hai người đang cãi nhau","tryst":"Đang hẹn hò lén","wager":"Đang đánh cờ ăn thua"};
function capOf(a,n){if(n>1&&(a==="walk"||!a))return"Đang chuyện trò";if(CAP[a])return CAP[a];try{if(typeof ACT95==="object"&&ACT95[a])return"Đang "+ACT95[a]}catch(e){}return"Đang dạo vườn"}

/* ---------- 1. the crowd from the record ---------- */
function rec(){try{const R=S.roster;return R&&R.key===j95key()?R:null}catch(e){return null}}
function kh(){try{return S.place===K?j95kh():j95arrKh(K)}catch(e){return 0}}
function entries(){const R=rec(),E=[];
 if(R){const h=kh();for(const id in R.P){const w=R.P[id]&&R.P[id][h];if(!w||w[0]!==K)continue;let vis=true;try{vis=j95vis(id,K)}catch(e){}if(!vis)continue;const who=(R.who||{})[id]||[];
   E.push({id,act:w[1]||"walk",with:w[2]||null,name:who[0]||"",role:who[1]||""})}return E}
 /* no record (j95 off): the rivals the ledger puts here, every one a plain walk */
 const W=S.where||{};(typeof rivals!=="undefined"?rivals:[]).forEach(v=>{if(v.alive&&!v.out&&W[v.id]===K)E.push({id:"v"+v.id,act:"walk",with:null,name:v.name,role:""})});if(W.emp===K)E.push({id:"emp",act:"stroll",with:null,name:"Hoàng thượng",role:"Hoàng thượng"});return E}
function rivOf(id){try{if(id&&id[0]==="v"){const n=+id.slice(1);return rivals.find(v=>v.id===n)||null}}catch(e){}return null}
function netOf(e){try{const v=rivOf(e.id);return v?traitsOf(v):[]}catch(e2){return[]}}
function boldOf(e){const v=rivOf(e.id);if(!v)return false;return netOf(e).some(n=>(AB().vuon[0].net||[]).includes(n))||(v.sac||0)>=((AB().bold||{}).sac||75)}
let CACHE=null;
/* AREA_PLAN rules 1–6. Returns {key, areas:[{k,n,cap,hs,x,extra,g:[group]}], groups}; group = {ms:[entry], fol:[entry], act, cap, pri, area} */
function plan(){const E=entries();const h=kh();const R=rec();const key=(R?R.key:"x")+"|"+h+"|"+E.map(e=>e.id+":"+e.act+":"+(e.with||"")).join(",");if(CACHE&&CACHE.key===key)return CACHE;
 const B=AB(),FO=new Set(B.fol||[]),FE=new Set(B.folEmp||[]),by={};E.forEach(e=>by[e.id]=e);
 const isFol=e=>FO.has(e.act)||(!!by.emp&&e.id!=="emp"&&(FE.has(e.act)||/^ag_maid:emp/.test(e.act)));
 const ms=E.filter(e=>!isFol(e)),fs=E.filter(isFol),G=[],gOf={};
 ms.forEach(m=>{if(gOf[m.id])return;let g=null;const p=m.with&&by[m.with];if(p&&!isFol(p)&&gOf[p.id]&&gOf[p.id].ms.length<4)g=gOf[p.id];/* rule 2: a two-person act joins the partner */
  if(!g){g={ms:[],fol:[],act:m.act};G.push(g)}g.ms.push(m);gOf[m.id]=g;
  if(p&&!isFol(p)&&!gOf[p.id]&&g.ms.length<4){g.ms.push(p);gOf[p.id]=g}});
 fs.forEach(f=>{let m=f.with&&gOf[f.with]?f.with:null;if(!m&&FE.has(f.act)&&gOf.emp)m="emp";if(!m&&/^ag_maid:emp/.test(f.act)&&gOf.emp)m="emp";
  if(!m){const nm=(String(f.role).match(/của (.+)$/)||[])[1];const x=nm&&ms.find(y=>y.name===nm||String(y.name).endsWith(nm));if(x)m=x.id}
  if(m)gOf[m].fol.push(f);else{const g={ms:[f],fol:[],act:"walk"};G.push(g);gOf[f.id]=g}});
 G.forEach((g,i)=>{g.i=i;g.emp=g.ms.some(m=>m.id==="emp");g.pri=g.emp?9:g.ms.length;g.cap=capOf(g.act,g.ms.length);g.u=g.ms.length+g.fol.length*(B.folU||.7)});
 /* areas: purpose first (rule 1), the Emperor's route + seekers (rule 4), plain walk by nết pull (rule 3, ties → Vườn hoa) */
 const V=B.vuon,RT=B.route||[];
 const want=g=>{const a=g.act;if(g.emp)return RT[Math.min(RT.length-1,h)]||"ngudao";
  if(a==="seekemp"){const bold=g.ms.some(boldOf);return RT[Math.min(RT.length-1,h+(bold?0:1))]||"ngudao"}
  if(a!=="walk"&&a!=="ag_effort"){const x=V.find(x=>(x.acts||[]).includes(a));if(x)return x.k}
  let best=null,bs=0;V.forEach(x=>{const s=g.ms.reduce((t,m)=>t+netOf(m).filter(n=>(x.net||[]).includes(n)).length,0);if(s>bs){bs=s;best=x.k}});return best||"vuonhoa"};
 const AR=V.map(x=>({k:x.k,n:x.n,cap:x.cap,hs:x.hs,x:x.x,g:[],u:0}));const fits=(a,g)=>a.g.length<(B.grpMax||2)&&(a.g.length===0||a.u+g.u<=(B.span||4.2));
 const ord=G.slice().sort((x,y)=>y.pri-x.pri||x.i-y.i);
 for(const g of ord){const w=want(g);let a=AR.find(x=>x.k===w);g.want=w;
  if(!fits(a,g)){const nb=((B.near||{})[w]||[]).map(k=>AR.find(x=>x.k===k)).filter(Boolean);a=nb.find(x=>fits(x,g))||AR.find(x=>x.extra&&fits(x,g))||null;
   if(!a){const ne=AR.filter(x=>x.extra).length,X=B.extraHs||{x:.4,y:.82,w:.2,h:.14};a={k:"loidi"+ne,n:(B.extraName||"Lối đi")+(ne?" "+["nhì","ba","tư","năm","sáu"][Math.min(4,ne-1)]:""),cap:"lối nhỏ men theo tường hoa",hs:{x:Math.min(.8,X.x+ne*.12),y:X.y,w:X.w,h:X.h},x:[.42,.28,.62,.18,.8][ne%5],extra:1,g:[],u:0};AR.push(a)}
   if(w==="ngudao"&&!g.emp&&g.act==="seekemp")g.cap="Đang chờ Hoàng thượng đi qua"}
  a.g.push(g);a.u+=g.u;g.area=a.k}
 AR.forEach(a=>a.g.sort((x,y)=>x.i-y.i));
 CACHE={key,areas:AR,groups:G,kh:h};return CACHE}
function count(a){return a.g.reduce((s,g)=>s+g.ms.length+g.fol.length,0)}
function areaKeyOfEntry(id){const P=plan();for(const g of P.groups)if(g.ms.concat(g.fol).some(e=>e.id===id))return g.area;return null}
function isArea(k){if(typeof k!=="string"||!(/^loidi\d+$/.test(k)||(AB().vuon||[]).some(a=>a.k===k)))return false;/* cheap name test first: hallName / hallRole are asked for every room of the game */try{return !!plan().areas.find(a=>a.k===k)}catch(e){return false}}
function areaByK(k){return plan().areas.find(a=>a.k===k)||null}

/* ---------- 2. who in curPeople is which record entry ---------- */
function entryOfP(p,E){if(!p)return null;E=E||entries();if(p.lid){const e=E.find(x=>x.id===p.lid);if(e)return e}
 if(p.kind==="emp")return E.find(x=>x.id==="emp")||null;if(p.kind==="th")return E.find(x=>x.id==="th")||null;
 if(p.ref&&typeof rivals!=="undefined"&&rivals.includes(p.ref)){const e=E.find(x=>x.id==="v"+p.ref.id);if(e)return e}
 if(p.ref&&p.ref.sid!=null){const e=E.find(x=>x.id==="s"+p.ref.sid);if(e)return e}
 return E.find(x=>x.name&&x.name===p.name)||null}
/* the area of a person on the place list; someone the record does not hold stands with the master named in her line («… của X»), else in the first area that has people */
function areaOfP(p,E){const e=entryOfP(p,E);if(e)return areaKeyOfEntry(e.id);const nm=(String(p.info||p.role||"").match(/của (.+?)(?:\s·|$)/)||[])[1];if(nm){const m=(E||entries()).find(x=>x.name===nm);if(m)return areaKeyOfEntry(m.id)}
 const a=plan().areas.find(x=>x.g.length);return a?a.k:"vuonhoa"}
function hall(){try{if(S.place!==K)return null;let h=S.hall;if(h&&h.k===K&&h.t===kpmStamp()&&isArea(h.part))return h;
 /* she stands in the garden but her area belongs to another buổi (time passed) or she came another way: she stays in the same area if it still has people, else the fullest one */
 if(!on()||S.dead)return null;const P=plan();let best=h&&h.k===K&&P.areas.find(a=>a.k===h.part&&count(a)>0);if(!best){best=P.areas[0];P.areas.forEach(a=>{if(count(a)>count(best))best=a})}
 if(!best)return null;S.hall={k:K,part:best.k,t:kpmStamp(),place:0};return S.hall}catch(e){return null}}

/* ---------- 3. the garden map = kitPalaceMap §76 for slot "p:vuon" ---------- */
/* painted pictures (ART-NHV): {s}=mùa {b}=buổi of now; the map has all 16 states; a scene state not yet painted falls back to <area>-xuan-<buổi> → <area>-xuan-sang
   (probed once per path at run time, so a newly painted state shows by itself) and the scene carries the kit «tạm» chip (kitTam) while it stands in */
function sb(){let s="xuan",b="sang";try{s=kpmSeason();b=kpmBuoiW()}catch(e){}return{s,b}}
const fill=(p,s,b)=>p.replace("{s}",s).replace("{b}",b);
const HAVE={};function probe(u){if(u in HAVE)return HAVE[u];HAVE[u]=null;try{const im=new Image();im.onload=()=>{HAVE[u]=true;try{if(CUR&&BG&&CUR.want===u){BG.style.backgroundImage=`url("${u}")`;CUR.tam=false;tamPut()}}catch(e){}};im.onerror=()=>{HAVE[u]=false};im.src=u}catch(e){HAVE[u]=false}return null}
function mapSrc(){const B=AB(),A=B.art||{};if(A.map){const {s,b}=sb();return fill(A.map,s,b)}try{return "img/"+SCIMG.vuon+".webp"}catch(e){return "img/ngu-hoa-vien.webp"}}
function areaArt(k){const A=AB().art||{},p=A.area&&A.area[k];if(!p)return null;const {s,b}=sb(),have=A.areaHave||[];const L=[s+"-"+b,"xuan-"+b,"xuan-sang"].filter((x,i,a)=>a.indexOf(x)===i);
 const exact=fill(p,s,b);let use=null;for(const st of L){const u=fill(p,...st.split("-"));if(have.includes(st)||HAVE[u]===true){use=u;break}}if(!use)use=fill(p,"xuan","sang");
 if(use!==exact&&HAVE[exact]!==false)probe(exact);return{src:use,want:exact,tam:use!==exact}}
function syncSpots(){try{const P=plan();KPM_DATA.spots.nhv={};P.areas.forEach(a=>{KPM_DATA.spots.nhv[a.k]=a.hs});KPM_HALLS.nhv=P.areas.map(a=>a.k)}catch(e){}}
(function(){
 const pa=kpmParts;kpmParts=function(slot,k,nm){if(slot===SLOT&&on())return plan().areas.map(a=>[a.k,a.n]);return pa.apply(this,arguments)};
 const mu=kpmMulti;kpmMulti=function(slot,k){if(slot===SLOT&&on())return true;return mu.apply(this,arguments)};
 const ar=kpmArt;kpmArt=function(slot){if(slot===SLOT&&on()){syncSpots();return{src:mapSrc(),dir:"nhv",tam:!(AB().art&&AB().art.map)}}return ar.apply(this,arguments)};
 const sp=kpmSplit;kpmSplit=function(k){if(k===K&&on()){const O={};plan().areas.forEach(a=>{O[a.k]={ppl:[],n:count(a),res:[]}});["chinh","dong","tay","cungnhan"].forEach(x=>{O[x]=O[x]||{ppl:[],n:0,res:[]}});return O}return sp.apply(this,arguments)};
 const ho=kpmHallOf;kpmHallOf=function(p,k){if(k===K&&on()){try{return areaKeyOfEntry("v"+p.id)||"chinh"}catch(e){}}return ho.apply(this,arguments)};
 const hn=hallName;hallName=function(base,part){if(on()&&isArea(part)){const a=areaByK(part);if(a)return a.n}return hn.apply(this,arguments)};window.hallName=hallName;
 const hr=hallRole;hallRole=function(part){if(on()&&isArea(part)){const a=areaByK(part);if(a)return a.cap||""}return hr.apply(this,arguments)};window.hallRole=hallRole;
 /* the area rows say what is going on there (one short line), the hotspot under the label keeps the kit chip; she is marked where she stands */
 const pm=kitPalaceMap;kitPalaceMap=function(o){let h=pm.apply(this,arguments);if(!(o&&o.slot===SLOT&&on()))return h;try{const P=plan(),me=hall();
  P.areas.forEach(a=>{const line=a.g.length?a.g.map(g=>g.cap).filter((x,i,L)=>L.indexOf(x)===i).slice(0,2).join(" · "):"";const sel=me&&me.part===a.k;
   h=h.replace(new RegExp(`(<button class="btn kpm-row)("[^>]*data-kpmpart="${a.k}">)([\\s\\S]*?)(</button>)`),(m0,b,c,body,e)=>`${b}${sel?" sel":""}${c}${body}${line?`<span class="kpm-rs nhv-do">${esc(line)}</span>`:""}${e}`);
   if(sel)h=h.replace(`class="mspot kpm-spot" data-go="kpm:${a.k}"`,`class="mspot kpm-spot here" data-go="kpm:${a.k}"`)});
  const tot=P.areas.reduce((s,a)=>s+count(a),0);h=h.replace(/(<span class="past kpm-t"><b>[^<]*<\/b>)/,`$1 · <em>${tot?tot+" bóng người":"vắng người"}</em>`);return h.replace('class="mapv kpmv"','class="mapv kpmv nhv-map"')}catch(e){console.error("nhv map",e);return h}};
})();

/* ---------- 4. the place while she stands in one area: only that area's people, the title names the area ---------- */
(function(){
 const c0=curPeople;curPeople=function(){const h=hall();if(!h||!on())return c0.apply(this,arguments);const keep=S.hall;let L;S.hall=null;try{L=c0.apply(this,arguments)}finally{S.hall=keep}
  try{const E=entries();return L.filter(p=>p===S||areaOfP(p,E)===h.part)}catch(e){return L}};window.curPeople=curPeople;
 const p0=placeOf;placeOf=function(k){const h=hall();if(!h||k!==K||!on())return p0.apply(this,arguments);const keep=S.hall;let P;S.hall=null;try{P=p0.apply(this,arguments)}finally{S.hall=keep}
  try{const a=areaByK(h.part);return Object.assign({},P,{n:`${P.n} · ${a?a.n:""}`})}catch(e){return P}};window.placeOf=placeOf;
})();

/* ---------- 5. the AREA SCENE: groups on the floor band (vòng nhóm), dim, step-out, thẻ gỗ ---------- */
let L=null,BG=null,CUR=null,SEL=null,SELM=null,KP=null,MEM=[],anims=[];
function an(el,kf,o){if(!el||!el.animate)return{finished:Promise.resolve()};const a=el.animate(kf,Object.assign({fill:"forwards",easing:"cubic-bezier(.2,.7,.2,1)"},o));anims.push(a);if(anims.length>300)anims.splice(0,150);return a}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function still(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("kf-still")}catch(e){return false}}
function st(){return document.getElementById("stage")}
function geo(){const s=st(),r=s.getBoundingClientRect(),B=AB();const q=x=>{const e=s.querySelector(x)||document.querySelector(x);if(!e||getComputedStyle(e).display==="none"||!e.getBoundingClientRect().width)return null;const b=e.getBoundingClientRect();if(b.bottom<r.top||b.top>r.bottom)return null;return{l:b.left-r.left,r:b.right-r.left}};
 const rl=q("#krail"),cl=kv()==="kv1"?null:q(".kshR");const rlR=rl&&rl.l>r.width/2;
 return{W:r.width,H:r.height,x0:(rl&&!rlR?Math.min(rl.r,r.width*.2):6)+6,x1:Math.min(cl&&cl.l>r.width/2?cl.l:r.width-6,rlR?rl.l:r.width-6)-6,feet:r.height*(B.feet||.9),fh:r.height*(B.figH||.62)}}
function figSrc(p){let src="";try{const who=p.kind==="emp"||p.kind==="th"?p:p.ref;if(who)src=figFor(p.kind==="emp"||p.kind==="th"?p:who)}catch(e){}
 let kn=true;try{kn=j59known(p)!==false}catch(e){}
 if(!kn||!src){let g="f";try{if(/^(ksp|peddler|ty|man|min|emp|guard)$/.test(p.kind)||(p.kind==="srv"&&/^(man|emp|ty)$/.test(p.sk))||/thái giám|công công/i.test((p.info||"")+" "+(p.name||"")))g="m";else{const r=typeof personRoleRank==="function"?personRoleRank(p.kind==="srv"&&p.ref?p.ref:{kind:p.kind,ref:p.ref}):null;if(r&&(r.kid||r.sex==="k"))g="k";else if(r&&r.sex==="m")g="m"}}catch(e){}
  return{src:"img/kit/unknown-fig-"+g+".webp",sil:1}}
 return{src,sil:0}}
/* the scene's people: the area's groups, each person bound to her index on the place list (the act flow reads that list) */
function sceneGroups(a){const ppl=curPeople(),E=entries(),used=new Set();const pOf=e=>{const i=ppl.findIndex((p,j)=>{if(used.has(j)||p===S)return false;const x=entryOfP(p,E);return !!x&&x.id===e.id});if(i<0)return null;used.add(i);return{p:ppl[i],i}};
 const out=a.g.map(g=>({cap:g.cap,emp:g.emp,ms:g.ms.map(pOf).filter(Boolean),fol:g.fol.map(pOf).filter(Boolean)})).filter(g=>g.ms.length||g.fol.length);
 out.forEach(g=>{if(!g.ms.length)g.ms=[g.fol.shift()]});
 /* people on the place list that the record does not tie to a group (a visitor who just came, a servant with no own line): they stand with their master or alone */
 ppl.forEach((p,i)=>{if(used.has(i)||p===S||!j59person(p))return;used.add(i);const nm=(String(p.info||"").match(/của (.+?)(?:\s·|$)/)||[])[1];const g=nm&&out.find(x=>x.ms.some(m=>m.p.name===nm||(m.p.ref&&m.p.ref.name===nm)));
  if(g)g.fol.push({p,i});else out.push({cap:capOf("walk",1),ms:[{p,i}],fol:[]})});
 return out}
function mkFig(m,master){const e=document.createElement("div");e.className="nhv-f";const F=figSrc(m.p);m.sil=F.sil;
 let tag="",tc="";try{tag=j59tagHTML(m.p,m.p.name);tc=j59col(m.p)}catch(x){}
 /* a name she has not learnt is never «???» on her screen: the kit §59.1 word «Người lạ» (MAIN 127 FAIL 4) */if(/\?\?\?/.test(tag))tag=tag.replace(/\?\?\?/g,"Người lạ");
 e.innerHTML=`<img class="nhv-i${F.sil?" ksil":""}" alt="" draggable="false" src="${esc(F.src)}">${master?`<span class="nhv-tag kscn-tag" style="--tc:${tc}">${tag}</span>`:""}`;
 m.el=e;m.img=e.querySelector("img");m.tg=e.querySelector(".nhv-tag");m.asp=.32;
 const fixA=()=>{if(m.img.naturalWidth&&m.img.naturalHeight){m.asp=m.img.naturalWidth/m.img.naturalHeight}};m.img.addEventListener("load",()=>{const a0=m.asp;fixA();if(Math.abs(a0-m.asp)>.01&&CUR)layout(true)});fixA();
 e.addEventListener("click",ev=>{ev.stopPropagation();onTap(m)});L.appendChild(e);return e}
/* group shape (figure-height units): masters side by side in the middle, followers smaller BEHIND-beside them with a gap — people never overlap (MAIN 127 fix 3) */
function shape(g){const B=AB(),gp=B.folGap||.05,Sf=B.folS||.66,P=[];const all=g.ms.concat(g.fol);all.forEach(m=>m.w0=m.asp||.32);
 const wm=g.ms.map(m=>m.w0),tot=wm.reduce((a,b)=>a+b,0)+gp*(g.ms.length-1);let x=-tot/2;g.ms.forEach((m,i)=>{P.push({m,ux:x+wm[i]/2,s:1,z:3,flip:g.ms.length===2&&i===1});x+=wm[i]+gp});
 let lx=-tot/2,rx=tot/2;g.fol.forEach((f,i)=>{const w=f.w0*Sf;if(i%2){P.push({m:f,ux:rx+gp+w/2,s:Sf,z:1});rx+=gp+w}else{P.push({m:f,ux:lx-gp-w/2,s:Sf,z:1});lx-=gp+w}});
 g.P=P;g.wU=rx-lx;g.cU=(rx+lx)/2;return g.wU}
function layout(re){if(!CUR||!L)return;const D0=geo();if(D0.H<80||D0.W<80){/* the stage is hidden or not laid out yet (a focus / tab switch): place everyone once it has its size */clearTimeout(window.__nhvLT);window.__nhvLT=setTimeout(()=>{try{if(CUR&&L&&L.isConnected)layout(true)}catch(e){}},150);return}const D=CUR.D=D0,B=AB(),G=CUR.G;G.forEach(shape);
 const span=D.x1-D.x0,need=G.reduce((s,g)=>s+g.wU,0);let fh=D.fh;const gapMin=12;if(need*fh+gapMin*(G.length+1)>span)fh=Math.max(D.H*.34,(span-gapMin*(G.length+1))/need);CUR.fh=fh;
 const gap=(span-need*fh)/(G.length+1);let x=D.x0+gap;
 G.forEach(g=>{const cx=x+g.wU*fh/2;g.cx=cx;g.top=1e9;g.P.forEach(p=>{const m=p.m,h=fh*p.s,w=h*m.w0,mx=cx+(p.ux-g.cU)*fh;m.x=mx-w/2;m.y=D.feet-h;m.w=w;m.h=h;m.z=p.z;m.g=g;
   const t=`translate(${m.x}px,${m.y}px)`;Object.assign(m.el.style,{width:w+"px",height:h+"px",zIndex:String(10+p.z)});if(!(SELM===m||(SEL===g&&SELM)))m.el.style.transform=t;m.el.__t=t;m.img.style.transform=p.flip?"scaleX(-1)":"";g.top=Math.min(g.top,m.y)});
  x+=g.wU*fh+gap;capPut(g)});
 bgPut();tagsFix()}
function tamPut(){try{if(!L)return;let e=L.querySelector(".nhv-tam");if(CUR&&CUR.tam&&typeof kitTam==="function"){if(!e){e=document.createElement("div");e.className="nhv-tam";e.innerHTML=kitTam(true);L.appendChild(e)}}else if(e)e.remove()}catch(x){}}
function bgPut(){if(!BG||!CUR)return;const D=CUR.D,painted=!!areaArt(CUR.a.k),a=painted?{x:(AB().art||{}).x==null?.5:AB().art.x}:CUR.a,z=painted?1:((AB().zoom||{})[kv()]||1);let bw=Math.max(D.W*z,D.H*16/9),bh=bw*9/16;if(bh<D.H){bh=D.H;bw=D.H*16/9}
 BG.style.width=bw+"px";BG.style.height=bh+"px";BG.style.transform=`translate(${-(bw-D.W)*(a.x==null?.5:a.x)}px,${-(bh-D.H)}px)`}
function capPut(g){if(!g.cap)return;if(!g.capEl||!g.capEl.isConnected){g.capEl=document.createElement("div");g.capEl.className="nhv-cap";g.capEl.innerHTML=`<span class="kchip n">${esc(g.cap)}</span>`;L.appendChild(g.capEl)}
 const D=CUR.D;g.capEl.style.left=Math.max(D.x0+60,Math.min(D.x1-60,g.cx))+"px";g.capEl.style.top=Math.max(4,g.top-6)+"px"}
/* name plates never overlap: the chosen person first, then her group, then the rest (a plate that would touch a kept one is hidden) */
function tagsFix(){try{if(!CUR)return;const F=CUR.G.flatMap(g=>g.P.map(p=>p.m)).filter(m=>m.tg);const pr=m=>(m===SELM?0:SEL&&m.g===SEL?1:2);F.sort((x,y)=>pr(x)-pr(y));const keep=[];
 const caps=CUR.G.map(g=>g.capEl&&g.capEl.style.visibility!=="hidden"&&g.capEl.getBoundingClientRect()).filter(Boolean);
 F.forEach(m=>{m.tg.style.visibility="";const r=m.tg.getBoundingClientRect();const hit=keep.some(k=>!(r.right<k.left-2||r.left>k.right+2||r.bottom<k.top-2||r.top>k.bottom+2));if(hit)m.tg.style.visibility="hidden";else keep.push(r)})}catch(e){}}
function css(){if(document.getElementById("nhv-css"))return;const c=document.createElement("style");c.id="nhv-css";c.textContent=`
html.nhvon #stage #tokens,html.nhvon #stage #mefig,html.nhvon #stage .kmemark,html.nhvon #stage #j59metag,html.nhvon #stage .j59more,html.nhvon #stage .kspet,html.nhvon #stage .j59chip{visibility:hidden!important}
html.kv1.nhvon #stage .kshR{display:none!important}/* phone: the area needs the whole stage width (ring4 mock, reviewed) */
html.nhvon .kfoc-mood:not(.nhv-say),html.nhvon #stage .khead.ksay{display:none!important}
#nhv{position:absolute;inset:0;z-index:1;overflow:hidden;contain:layout paint}
#nhv .nhv-bg{position:absolute;left:0;top:0;background-size:100% 100%;background-repeat:no-repeat;z-index:0}
#nhv .nhv-f{position:absolute;left:0;top:0;transform-origin:50% 100%;cursor:pointer;contain:layout}
#nhv .nhv-f>img{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;object-fit:contain;object-position:50% 100%}
#nhv .nhv-tag{position:absolute;left:50%;top:100%;transform:translateX(-50%);margin-top:-6px;z-index:2;white-space:nowrap;pointer-events:none}
#nhv .nhv-tam{position:absolute;left:8px;bottom:6px;z-index:41;pointer-events:none}
#nhv .nhv-cap{position:absolute;transform:translate(-50%,-100%);white-space:nowrap;z-index:40;pointer-events:none}
#nhv .nhv-cap .kchip{font-size:13px;padding:3px 10px;box-shadow:0 2px 8px #0005}
.kpmv.nhv-map .kpm-list .nhv-do{font-style:italic}
`;document.head.appendChild(c)}
function bgSrc(a){const P=areaArt(a.k);if(P){if(CUR)Object.assign(CUR,{want:P.want,tam:P.tam});return P.src}if(CUR)Object.assign(CUR,{want:null,tam:true});try{const si=document.getElementById("scimg");const u=si&&(si.style.backgroundImage||getComputedStyle(si).backgroundImage)||"";const m=/url\(["']?([^"')]+)["']?\)/.exec(u);if(m)return m[1]}catch(e){}return mapSrc()}
function mount(a){css();const s=st();if(!s)return false;let l=document.getElementById("nhv");const key=plan().key+"|"+a.k+"|"+curPeople().length;
 if(l&&l.parentNode===s&&CUR&&CUR.key===key){if(!CUR.D||Math.abs(CUR.D.W-s.getBoundingClientRect().width)>2||Math.abs(CUR.D.H-s.getBoundingClientRect().height)>2)layout(true);return false}
 const fresh=!l||!CUR||CUR.a.k!==a.k;if(l)l.remove();closePk(true);SEL=SELM=null;try{kitDim.off()}catch(e){}
 L=l=document.createElement("div");l.id="nhv";l.className=kv();s.appendChild(l);document.documentElement.classList.add("nhvon");
 const G=sceneGroups(a);CUR={a,G,key,D:geo()};BG=document.createElement("div");BG.className="nhv-bg";BG.style.backgroundImage=`url("${bgSrc(a)}")`;l.appendChild(BG);tamPut();G.forEach(g=>{g.ms.forEach(m=>mkFig(m,1));g.fol.forEach(f=>mkFig(f,0))});
 l.addEventListener("click",()=>{if(SEL)unsel()});layout();
 if(fresh&&!still()){l.style.transformOrigin="50% 92%";an(l,[{transform:"scale(1.06)"},{transform:"none"}],{duration:AB().enterMs||560});G.forEach(g=>g.capEl&&an(g.capEl,[{opacity:0},{opacity:1}],{duration:260,delay:380}))}
 return true}
function unmount(){const l=document.getElementById("nhv");if(l)l.remove();document.documentElement.classList.remove("nhvon");closePk(true);try{kitDim.off()}catch(e){}CUR=null;SEL=SELM=null;L=null}
/* tap: a group → it stays lit, the others dim (figures only); a person of the lit group → she steps out toward her, the thẻ gỗ hang beside her */
function onTap(m){if(!CUR||S.dead||Q.length)return;const g=m.g;if(SEL!==g){pickGroup(g);return}if(SELM===m){openPk(m);return}stepOut(m).then(()=>openPk(m))}
function figsNot(g){return CUR.G.filter(x=>x!==g).flatMap(x=>x.P.map(p=>p.m.el))}
function pickGroup(g){closePk();if(SELM)back(SELM,true);SEL=g;try{kitDim.on(()=>figsNot(g))}catch(e){}CUR.G.forEach(x=>{if(x.capEl)an(x.capEl,[{opacity:x===g?1:.45}],{duration:260})});tagsFix()}
function unsel(){closePk();if(SELM)back(SELM);SEL=null;try{kitDim.off()}catch(e){}if(CUR)CUR.G.forEach(x=>{if(x.capEl)an(x.capEl,[{opacity:1}],{duration:240})});tagsFix()}
function back(m,quick){const g=m.g;SELM=null;an(m.el,[{transform:m.el.__t}],{duration:quick?200:420});g.P.forEach(p=>{if(p.m!==m)an(p.m.el,[{transform:p.m.el.__t}],{duration:quick?200:360})});m.el.style.zIndex=String(10+m.z);
 CUR.G.forEach(x=>{if(x.capEl)x.capEl.style.visibility=""});tagsFix()}
/* step out: she walks to the talk spot (speaker-left rule); her followers stand beside her on the left with a gap, the plaque band keeps her right side free */
async function stepOut(m){const g=m.g;if(SEL!==g)pickGroup(g);if(SELM&&SELM!==m)back(SELM,true);SELM=m;const B=AB(),D=CUR.D,k=B.stepK||1.12,gp=(B.folGap||.05)*CUR.fh;
 /* her followers stand BEHIND-beside her on the left, in one row with a gap (never on her shoulder, never on each other — MAIN 127 FAIL 3); a smaller scale = further back.
    She keeps the right side free for the thẻ gỗ band (BAL.area.band, two plaque columns on the phone) */
 const fo=g.P.filter(p=>p.m!==m).map(p=>p.m),band=(B.band||{})[kv()]||150,W=m.w*k;
 const tcx=D.x0+(D.x1-D.x0)*((B.spot||{})[kv()]||.24),maxX=D.x1-band-W;
 const fw=fo.reduce((s,q)=>s+q.w,0);let tx=Math.min(maxX,Math.max(tcx-W/2,D.x0+4+(fo.length?Math.min(fw+gp*fo.length,(maxX-D.x0)*.62):0)));
 const room=tx-D.x0-4-gp*fo.length,sF=fo.length&&fw>room?Math.max(B.folMin||.55,room/fw):1;
 const ty=Math.min(D.H-m.h*k-40,m.y+(B.stepY||.045)*D.H);
 const to=`translate(${tx+(m.w*(k-1))/2}px,${ty+m.h*(k-1)}px) scale(${k})`;m.el.style.zIndex="30";m.fx={x:tx,y:ty,w:W,h:m.h*k};
 CUR.G.forEach(x=>{if(x.capEl)x.capEl.style.visibility="hidden"});
 const mid=`translate(${(m.x+tx)/2}px,${(m.y+ty)/2-8}px) scale(${(1+k)/2})`;an(m.el,[{transform:m.el.__t},{transform:mid,offset:.5},{transform:to}],{duration:still()?1:(B.walkMs||700)});
 const feet=ty+m.h*k-(B.folBack||.02)*D.H;let x=tx-gp;fo.forEach(q=>{const w=q.w*sF;x-=w;const cx=x+w/2;x-=gp;const t3=`translate(${cx-q.w/2}px,${feet-q.h}px) scale(${sF.toFixed(3)})`;q.el.style.zIndex="29";
  an(q.el,[{transform:q.el.__t},{transform:t3}],{duration:still()?1:520})});
 await wait(still()?30:(B.walkMs||700)+40);tagsFix()}
/* THẺ GỖ TREO = kit §98.1 kitPick, fed by the real act list of this person (jdfv dfData) */
function closePk(now){const k=KP;KP=null;if(!k)return;try{now?k.destroy():k.close()}catch(e){}}
function openPk(m){closePk(true);if(!CUR||typeof kitPick==="undefined")return;let G=[];try{G=dfData(m.i)}catch(e){}
 /* names she has not learnt (the kit shows them as «???» on a button): those acts are not offered by that name */let unk=[];try{unk=(rivals||[]).filter(v=>typeof k61Named==="function"&&!k61Named(v)).map(v=>v.name).filter(Boolean)}catch(e){}
 G=(G||[]).map(g=>Object.assign({},g,{acts:(g.acts||[]).filter(a=>a&&a.n&&!/\?\?\?/.test(a.n+" "+(a.word||""))&&!unk.some(n=>String(a.n).includes(n)))})).filter(g=>g.acts.length);/* an act naming someone she has not learnt is not offered by that name (MAIN 127 FAIL 4, ring4 rule) */if(!G.length)return;
 const others=[...L.querySelectorAll(".nhv-f")].filter(e=>e!==m.el&&e.offsetParent!==null).map(e=>kitPick.rect(e,L));
 KP=kitPick.open({host:L,anchor:kitPick.rect(m.el,L),avoid:others,side:"r",groups:G,dismiss:false,
  onPick:id=>runAct(m,id),onOff:a=>{try{if(a&&a.why&&typeof kitMoodSay==="function"){const b=kitMoodSay(m.img,a.why,{hold:2600});if(b&&b.classList)b.classList.add("nhv-say")}}catch(e){}}})}
/* the act runs through the game's own person flow (kitFocus + dfTap: rules card, on-figure game, result toast, log) on the stepped-out figure; when it is done the plaques hang again */
function runAct(m,id){closePk(true);const p=curPeople()[m.i];if(!p||typeof kitFocus==="undefined"||typeof dfTap!=="function")return;
 const tk={};DF.tk=tk;DF.encM=null;DF.p=p;DF.i=m.i;popIdx=m.i;popMsg="";window.__nhvAct=1;
 DF.F=kitFocus.open({p,person:p,fig:m.img,from:m.img.getBoundingClientRect(),groups:[],onAct:x=>dfTap(x),onClose:()=>{window.__nhvAct=0;try{dfClosed(tk)}catch(e){}setTimeout(()=>{try{if(CUR&&SELM===m&&m.el.isConnected)openPk(m)}catch(e){}},60)}});
 try{dfTap(id)}catch(e){console.error("nhv act",e)}}
/* after the act's result: the focus closes by itself and the plaques of the same person come back (her area scene stays) */
(function(){if(typeof dfAfter!=="function")return;const a0=dfAfter;dfAfter=function(){const r=a0.apply(this,arguments);try{if(window.__nhvAct&&DF.F){const F=DF.F;setTimeout(()=>{try{if(DF.F===F&&!DF.play&&!Q.length)F.close()}catch(e){}},BAL.df&&BAL.df.reactMs||1400)}}catch(e){}return r};window.dfAfter=dfAfter})();
/* the scene follows the stage: mounted after every stage paint while she stands in an area, gone everywhere else */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const h=on()&&typeof tab!=="undefined"&&tab==="act"&&!S.out?hall():null;
  if(h){const a=areaByK(h.part);if(a)mount(a)}else if(document.getElementById("nhv")||document.documentElement.classList.contains("nhvon"))unmount()}catch(e){console.error("nhv stage",e);(window.__nhvErr=window.__nhvErr||[]).push(String(e&&e.stack||e).slice(0,300))}return r};window.renderStage=renderStage})();
addEventListener("resize",()=>{clearTimeout(window.__nhvRz);window.__nhvRz=setTimeout(()=>{try{if(CUR)layout(true)}catch(e){}},140)});
/* arriving in the garden another way (followed someone, an event, a road): she stands in the area with the most people, so the place is never shown unsplit */
(function(){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(on()&&k===K&&S.place===K&&!hall()){const P=plan();let best=P.areas[0];P.areas.forEach(a=>{if(count(a)>count(best))best=a});S.hall={k:K,part:best.k,t:kpmStamp(),place:0}}}catch(e){}return r};window.goTo=goTo})();

window.NHV={plan,entries,count,areaOfP,hall,on,mount,unmount,layout,pickGroup,stepOut,openPk,unsel,get cur(){return CUR},get kp(){return KP}};
try{if(window.KIT_SAMPLES)KIT_SAMPLES.push({id:"§76.nhv",title:"kitPalaceMap · Ngự hoa viên",html:()=>kitPalaceMap({slot:SLOT,k:K})})}catch(e){}
}catch(e){console.error("jnhv",e)}})();
