/* ================= jkring: kitRing «VÒNG NGƯỜI · VÒNG NHÓM» — the people / group RING of a place (KIT §104; RING-BUILD under KK44; owner OD 26/11 ~18:55Z + ~19:00Z)
   OWNER (26/11 ~18:55Z, verbatim excerpt): «… cái vòng người, đúng nghĩa là cái vòng người giống như là cái vòng [bảo vật] … xoay vòng tới ai thì người đó sáng, người đó là cái trung tâm …
   những người còn lại là tối … bấm chọn vô người đó thì người đó phải to hơn … phóng to nguyên thân … dịch qua một bên trái … vẫn là to … bên phải là sẽ thả xuống mấy cái nút giao tiếp …
   Mình chỉ cần một người đứng ở đó lúc đó là được rồi. 2 người xuất hiện chỉ khi nào mà đó là cuộc hội thoại giữa 2 người … còn một nhóm người thì sao?»
   ONE ring = the «Vòng bảo vật» ring maths (motion-design-4 mẫu 2: angle per slot, depth scale, front = bright, swipe with inertia, ‹ ›, tap a side slot = turn to it), two slot kinds:
     PERSON slot = one full-body figure (kit figure painting, kit name tag under the feet);  GROUP slot = the members of one real group standing together (master in front, the others
     beside/behind her), its activity line (the NPC day plan's own words, S.roster) over their heads.
   Front slot BRIGHT, the others DIM (a pre-filtered copy cross-fades in: opacity only, never an animated filter; BAL.kdim numbers). Tap the bright slot = FOCUS: it grows to a big full body
   and slides LEFT (still the centre), the others go; the interaction plaques DROP on the RIGHT = kitPick «thẻ gỗ treo» (§98, the ONE person picker). Person acts = the game's own (dfData /
   dfRun, the same buttons as the pop-up card → the game's own result card). Group plaques = «Đứng nghe» (the group's talk as kit result rows) + one «Nói với …» per member: that member
   STEPS OUT of the group (the others dim) and her own acts drop. Only the person she talks to stands on the scene — HER figure never walks in (her figure = two-person dialogue only, §102).
   No dotted oval, no frame, no panel (OD 24/11 ~08:55Z / ~15:30Z). Motion = transform + opacity only (60 fps at CPU 4x, dev/test/kit-ring.js perf).
   API: kitRing.open({people, idx:[curPeople index], mode:"person"|"group", bg}) → R ; kitRing.close() ; kitRing.cur ; R.turnBy(d) ; R.turnTo(i) ; R.focus() ; R.back() ; R.setMode(m)
   Wiring (prototype, review/ring-build): a place visit with ≥ KIT_RING.min people (not chests) opens the ring over the place stage; ✕ = back to the place stage. Off under robots (window.__bot). */
(function(){try{
const KIT_RING=window.KIT_RING=window.KIT_RING||{min:5,wire:true,
 fh:{kv1:.60,kv2:.70}/* front figure height / layer height */,fhF:{kv1:.90,kv2:.95}/* focus figure height */,fx:{kv1:.30,kv2:.27}/* focus centre x / width */,
 rx:{kv1:.36,kv2:.33},ry:{kv1:.10,kv2:.11},floor:.955,/* slot sizes + dim = the 3 tiers KRING_MATH.tier (BAL.kring) */
 grpFh:1/* group lead = the stage size too (owner 20:27Z); members beside her ×.9 depth */,stdR:{kv1:.747,kv2:.725}/* LIVE stage figure image px / stage px (fallback) */,grpGap:.22/* member spacing / member height (members overlap: one cluster) */,grpW:{kv1:.56,kv2:.50}/* focused group max width / layer width */,
 focusMs:560,arrow:{kv1:42,kv2:46}};
const kv=()=>document.documentElement.classList.contains("kv2")?"kv2":"kv1";
const calm=()=>{try{return typeof kscnCalm==="function"&&kscnCalm()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const E="cubic-bezier(.2,.75,.25,1)";
/* §104.1 KRING_MATH — the ONE ring maths of the whole ring kit (vòng người · vòng nhóm · vòng bảo vật): same semantics as MOTION-BUILD's KRI_MATH (jkring-item.js reads
   window.KRING_MATH when present). N > seats: one seat spacing (2π/seats), only the seats around the front show (a scrolling ring of many). */
const KB=()=>BAL.kring||{};
const KRING_MATH=window.KRING_MATH=window.KRING_MATH||{get seats(){return KB().seats||12},get decay(){return KB().decay||.93},get stop(){return KB().stop||.0012},get snapMs(){return KB().snapMs||200},get stepMs(){return KB().stepMs||280},
 slot(i,rot,N){let a=((i-rot)%N+N)%N;if(a>N/2)a-=N;const n=Math.max(3,Math.min(N,this.seats)),th=a*2*Math.PI/n,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;return{a,c,s,k,hide:Math.abs(a)>n/2-.5}},
 /* §104.1 the 3 SIZE TIERS (owner 21:45Z; BAL.kring szL/szM/szS · dimL/dimM/dimS · near): seat distance |a| → {sc, dim, t} (t 0 = L, 1 = M, 2 = S); at rest every slot is exactly one tier */
 tier(a){const B=KB(),d=Math.abs(a),nr=Math.max(1,B.near||1),L=B.szL||1,M=B.szM||.66,S=B.szS||.46,dL=B.dimL||0,dM=B.dimM!=null?B.dimM:.45,dS=B.dimS!=null?B.dimS:1;
  const t=d<=1?d:d<=nr?1:d<=nr+1?1+(d-nr):2,mix=(x,y,z)=>t<=1?x+(y-x)*t:y+(z-y)*(t-1);return{t,sc:mix(L,M,S),dim:mix(dL,dM,dS)}},
 front(rot,N){return((Math.round(rot)%N)+N)%N},
 short(i,rot,N){let d=((i-rot)%N+N)%N;if(d>N/2)d-=N;return d},
};
let CUR=null;
/* ---------- CSS (kit part; tokens from the kit: --kpk-* wood, kscn-tag) ---------- */
function css(){if(document.getElementById("k-ring"))return;const s=document.createElement("style");s.id="k-ring";s.textContent=`
.kscn.kring .kscn-bg{filter:none!important}.kscn.kring .kscn-veil{opacity:0!important}
.kring-band{position:absolute;inset:0;z-index:5;touch-action:none}
/* §104.1c: a ring layer that is not on screen (opening fade at opacity 0, a build that never finished) takes no tap: the band wakes when the layer is shown (kring-live) */
.kscn.kring:not(.kring-live),.kscn.kring:not(.kring-live) *{pointer-events:none!important}
/* RING-BUILD-4 (MAIN LOOK FAIL 26/11): every figure lives in ONE layer UNDER every tap target (✕ ‹ › tabs 60, plaques .kpk 30, bubble 270) — a figure is never drawn over a button */
.kring-wrap{position:absolute;inset:0;z-index:10;pointer-events:none;will-change:transform}
.kring-s{position:absolute;left:0;top:0;transform-origin:50% 100%;will-change:transform;pointer-events:none;z-index:10}
.kring-halo{position:absolute;pointer-events:none;z-index:0;opacity:0;will-change:opacity;background:radial-gradient(ellipse 50% 50% at 50% 55%,rgba(255,228,160,.85),rgba(255,228,160,.4) 50%,rgba(255,228,160,0) 72%)}
.kring-m{position:absolute;z-index:1;bottom:0;transform-origin:50% 100%}
.kring-m img{position:absolute;inset:0;width:100%;height:100%;display:block;user-select:none;-webkit-user-drag:none}
.kring-m img.kring-dim{will-change:opacity}
.kring-tg{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;transition:opacity .22s;z-index:3}
.kring-tg .kscn-tag{position:static;display:inline-block}
.kring-s:not(.kring-front) .kring-tg,.kring-s:not(.kring-front) .kring-act{opacity:0}
.kring-act{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;transition:opacity .22s;z-index:3}
.kring-act .kscn-tag{position:static;display:inline-block;font-style:italic}
body.kring-on #rtoast{z-index:290!important}body.kring-on #modal:not([hidden]){z-index:280!important}
.kring-ui{position:absolute;z-index:60}
.kring-tabs{position:absolute;z-index:60;left:50%;top:8px;transform:translateX(-50%);display:flex;gap:4px;margin:0}
.kring-x{position:absolute;z-index:61;top:8px;right:8px}
.kring-tt{position:absolute;z-index:60;left:12px;right:60px;top:10px;display:flex;flex-direction:column;align-items:flex-start;pointer-events:none}
.kring-tt .kptitle{font-family:var(--display);font-size:1.12rem;color:#fff6e4;text-shadow:0 1px 3px #0009;line-height:1.2}.kring-tt small{color:#f2e3c6;font-size:.8rem;text-shadow:0 1px 2px #0008}
body.kring-on #modal.kring-held{visibility:hidden!important}
.kring-say{position:absolute;z-index:270;padding:10px 16px 12px;border-radius:16px;background:#fffaf0f0;border:1px solid #b8901f88;box-shadow:0 3px 12px rgba(0,0,0,.22);font-size:1rem;line-height:1.45;color:#3a2a18;cursor:pointer}
.kring-say .kring-sw{display:block;font-size:.85rem;color:#8a5a14;margin-bottom:2px}.kring-say .kring-more{position:absolute;right:10px;bottom:4px;font-style:normal;color:#b8901f}
.kring-ftg{position:absolute;z-index:260;transform:translateX(-50%);white-space:nowrap;pointer-events:none}
.kring-ftg .kscn-tag{position:static;display:inline-block}
`;document.head.appendChild(s)}
/* ---------- people + real groups ---------- */
function rid(p){try{if(p&&p.ref&&p.ref.id!=null)return "v"+p.ref.id;if(p&&p.kind==="emp")return "emp"}catch(e){}return null}
function rost(p){try{const id=rid(p),R=S&&S.roster;if(!id||!R||!R.P||!R.P[id]||typeof j95kh!=="function")return null;return R.P[id][j95kh()]||null}catch(e){return null}}
/* a GROUP = the people here linked by the day plan (roster «with» = another person here); a person with no link is a group of one. Line = the plan's own words. */
function groupsOf(list){const id2=new Map();list.forEach((x,i)=>{const id=rid(x.p);if(id)id2.set(id,i)});const par=list.map((_,i)=>i);const f=i=>par[i]===i?i:(par[i]=f(par[i]));
 list.forEach((x,i)=>{const e=rost(x.p);x.why=e&&e[3]||"";x.with=e&&e[2]!=null?String(e[2]):"";const w=x.with&&(id2.has(x.with)?x.with:id2.has("v"+x.with)?"v"+x.with:"");if(w){const j=id2.get(w);par[f(i)]=f(j);x.lead=j}});
 const G=new Map();list.forEach((x,i)=>{const r=f(i);if(!G.has(r))G.set(r,[]);G.get(r).push(x)});
 return [...G.values()].map(m=>{const lead=m.find(x=>x.lead==null)||m[0];const ms=[lead,...m.filter(x=>x!==lead)];
  const line=lead.why||ms.map(x=>x.why).find(Boolean)||(ms.length>1?"Đang chuyện trò":"Đang dạo vườn");return {members:ms,line}})}
/* who stands in the ring: the people of rank (consorts, Hoàng hậu, Hoàng thượng, Thái hậu, court officers) — never servants beside consorts (owner OD 24/11 ~07:58Z «không muốn là cung nữ và phi tần đứng chung một vòng»), never a chest */
const KR_KINDS=["rival","hh","emp","th","ty","ksp","lc","man","official"];
function ringable(p){return !!p&&p.kind!=="chest"&&(KR_KINDS.includes(p.kind)||!!p.ref)}
/* ---------- picture loading (figure painting + painted bbox) ---------- */
async function loadFig(p){let src="";try{const q=p&&p.ref||p;src=typeof kitFigOf==="function"?kitFigOf(q):figFor(q)}catch(e){}if(!src)return null;
 const im=new Image();im.crossOrigin="anonymous";im.alt="";im.src=src;try{await im.decode()}catch(e){return null}
 const ob=typeof kscnOpaque==="function"?kscnOpaque(im):{l:0,r:1,t:0,b:1};return {src,ob,ar:im.naturalWidth/Math.max(1,im.naturalHeight)}}
function memberEl(x,fh){const d=document.createElement("div");d.className="kring-m";const fw=fh*x.f.ar;d.style.cssText=`width:${fw}px;height:${fh}px`;
 const s=esc(x.f.src);d.innerHTML=`<img src="${s}" alt=""><img class="kring-dim" src="${s}" alt="" style="filter:brightness(${(BAL.kring||BAL.kdim).dimB||BAL.kdim.b}) saturate(${(BAL.kring||BAL.kdim).dimS||BAL.kdim.s})">`;x.el=d;x.dim=d.querySelector(".kring-dim");x.fw=fw;x.fh=fh;return d}
function tagEl(p,cls,fix){const t=document.createElement("div");t.className=cls;try{t.innerHTML=kitNameTagBox(p.ref||p,fix?{fix:1}:{})}catch(e){t.innerHTML=`<span class="kscn-tag">${esc(p.name)}</span>`}return t}
/* ---------- build a slot ---------- */
/* OWNER 26/11 ~20:27Z «kích thước lúc trong vòng quay không to như ban đầu»: the FRONT figure = the LIVE stage figure size, px for px. Read from the place stage under the ring
   (a visible woman figure: its image px, absolute); no stage → layer px × KIT_RING.stdR (measured LIVE: Fold 541/724, iPad 436/601). Per person × KIT_FIG.fac (men ×1.07, children by age). */
function stdImgR(){try{const st=document.getElementById("stage");if(st&&st.offsetHeight){const im=[...st.querySelectorAll(".tok.fig .figimg.j59sz,.tok.fig img.j59sz")].find(i=>i.getClientRects().length&&/fig-consort-|fig-maid-/.test(i.src||""));
 if(im){const f=KIT_FIG.fac(im.src,20)||1;return im.getBoundingClientRect().height/f}}}catch(e){}return null}
function figH(R,x){let f=1;try{const q=x.p&&x.p.ref||x.p;f=KIT_FIG.fac(x.f.src,q&&typeof q.age==="number"?q.age:20)||1}catch(e){}return Math.round(R.stdPx*f)}
function buildSlot(R,g,fh0){const s=document.createElement("div");s.className="kring-s";const M=g.members;fh0=figH(R,M[0]);
 if(M.length===1){const x=M[0];const d=memberEl(x,fh0);d.style.left="0px";s.appendChild(d);const W=x.fw;s.style.width=W+"px";s.style.height=fh0+"px";
  s.__cx=(x.f.ob.l+x.f.ob.r)/2*W;s.__feet=x.f.ob.b*fh0;s.__top=x.f.ob.t*fh0;x.dx=0;
  const t=tagEl(x.p,"kring-tg",1);t.style.top=(s.__feet+2)+"px";t.style.left=s.__cx+"px";s.appendChild(t)}
 else{/* the lead in front, the others beside / behind her by turns (smaller, a little higher = depth on the floor) */
  const fh=fh0*KIT_RING.grpFh;const els=[];let minL=0,maxR=0;M.forEach((x,k)=>{const side=k===0?0:(k%2?-1:1)*Math.ceil(k/2),dep=k===0?1:.9;const h=(k===0?fh:figH(R,x)*KIT_RING.grpFh)*dep;const d=memberEl(x,h);
   const pc=(x.f.ob.l+x.f.ob.r)/2*x.fw;const cx=side*fh*KIT_RING.grpGap;x.cx=cx;x.left=cx-pc;x.lift=k===0?0:fh*.03;d.style.zIndex=k===0?"3":"2";
   minL=Math.min(minL,x.left+x.f.ob.l*x.fw);maxR=Math.max(maxR,x.left+x.f.ob.r*x.fw);els.push(d)});
  const W=maxR-minL;M.forEach((x,k)=>{x.left-=minL;x.el.style.left=x.left+"px";x.el.style.transform=x.lift?`translateY(${-x.lift}px)`:"";s.appendChild(x.el)});
  const lead=M[0];s.style.width=W+"px";s.style.height=fh0+"px";M.forEach(x=>{x.el.style.top=(fh0-x.fh)+"px";x.el.style.bottom="auto"});
  s.__cx=W/2;s.__feet=fh0-fh*(1-lead.f.ob.b);s.__top=Math.min(...M.map(x=>fh0-x.fh+x.f.ob.t*x.fh-(x.lift||0)));
  const a=document.createElement("div");a.className="kring-act";a.innerHTML=`<span class="kscn-tag">${esc(g.line)}</span>`;a.style.left=(W/2)+"px";a.style.top=Math.max(-30,s.__top-30)+"px";s.appendChild(a);
  /* OWNER 26/11 ~21:45Z (WIDER): the joined names label ran on under the figures → a named group (picker: its name) keeps ONE label; otherwise ONE FIXED-SIZE kit name plate
     (kitNameTagBox fix, KIT §93.5a) under EACH member's feet */
  if(g.gi!=null&&R.o.groups&&R.o.groups[g.gi].name){const t=document.createElement("div");t.className="kring-tg";t.innerHTML=`<span class="kscn-tag">${esc(R.o.groups[g.gi].name)}</span>`;t.style.top=(s.__feet+2)+"px";t.style.left=(W/2)+"px";s.appendChild(t)}
  else M.forEach(x=>{const t=tagEl(x.p,"kring-tg",1);t.style.left=(x.left+(x.f.ob.l+x.f.ob.r)/2*x.fw)+"px";t.style.top=(fh0-x.fh+x.f.ob.b*x.fh-(x.lift||0)+2)+"px";s.appendChild(t)})}
 /* the warm light behind the slot in front (static gradient, opacity only) */const h=document.createElement("div");h.className="kring-halo";const W0=parseFloat(s.style.width);h.style.cssText=`left:${-W0*.25}px;top:${s.__top-fh0*.04}px;width:${W0*1.5}px;height:${(s.__feet-s.__top)*1.08}px`;s.insertBefore(h,s.firstChild);s.__halo=h;
 s.__g=g;return s}
/* ---------- ring maths (the vòng bảo vật maths: angle per slot, depth scale, dim, z) ---------- */
function geo(R){const m=kv(),K=KIT_RING,L=R.L,w=L.g.w,H=L.g.H;return {w,H,cx:w/2,floor:H*K.floor,Rx:w*K.rx[m],Ry:H*K.ry[m]}}
function place(R){const N=R.slots.length,g=geo(R);R.slots.forEach((s,i)=>{const q=KRING_MATH.slot(i,R.rot,N),a=q.a,c=q.c,sn=q.s,k=q.k;s.style.visibility=q.hide?"hidden":"";
  const T=KRING_MATH.tier(N>1?a:0)/* one seat = the L tier (BAL.kring szL / dimL) */,sc=T.sc,y=g.floor-g.Ry*(1-c);let x=g.cx+g.Rx*sn;
  /* RING-BUILD-6: a wide slot (a group cluster at M / L size) stays between the ‹ › arrows (overlap gate: no figure over a tap target) */if(N>1&&!q.hide){const P=s.__px||(s.__px=paintX(s)),aw=(KIT_RING.arrow[kv()]||44)+12,l=x+(P.l-s.__cx)*sc,r=x+(P.r-s.__cx)*sc;if(r-l<g.w-2*aw){if(l<aw)x+=aw-l;else if(r>g.w-aw)x-=r-(g.w-aw)}}
  s.style.transform=`translate(${(x-s.__cx).toFixed(1)}px,${(y-s.__feet).toFixed(1)}px) scale(${sc.toFixed(3)})`;s.style.zIndex=String(Math.round(100+c*50));
  const st=N>1?Math.abs(a):0,d=T.dim;s.__halo&&(s.__halo.style.opacity=Math.max(0,1-st*1.6).toFixed(3));s.__g.members.forEach(x=>{x.dim.style.opacity=d.toFixed(3)});s.classList.toggle("kring-front",Math.abs(a)<.5);/* the name tag under the feet never leaves the layer: near the bottom edge it rides up over the lower legs */const tgs=s.__tg||(s.__tg=[...s.querySelectorAll(":scope>.kring-tg")]);if(tgs.length){const over=y+(tgs.length>1?50:44)-g.H;const tf=over>0?`translate(-50%,${(-over/sc).toFixed(1)}px)`:"translateX(-50%)";tgs.forEach(tg=>{tg.style.transform=tf})}s.__x=x;s.__y=y;s.__sc=sc})}
let raf=0;function loop(fn){cancelAnimationFrame(raf);let lt=performance.now();const f=now=>{const dt=Math.min(48,now-lt);lt=now;if(fn(dt)!==false)raf=requestAnimationFrame(f);else raf=0};raf=requestAnimationFrame(f)}
function stepPx(R){const g=geo(R);return Math.max(60,g.Rx*2*Math.PI/Math.max(3,R.slots.length)*.7)}
function tween(R,to,ms){const from=R.rot,t0=performance.now();if(calm())ms=1;return new Promise(res=>loop(()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);R.rot=from+(to-from)*e;place(R);if(k>=1){yieldCard(R);res();return false}}))}
function fling(R,v){R.v=v;if(calm())return snap(R);return new Promise(res=>loop(dt=>{R.rot+=R.v*dt;R.v*=Math.pow(KRING_MATH.decay,dt/16.67);place(R);if(Math.abs(R.v)<KRING_MATH.stop){snap(R).then(res);return false}}))}
const snap=R=>tween(R,Math.round(R.rot),KRING_MATH.snapMs);
const front=R=>KRING_MATH.front(R.rot,R.slots.length);
/* ---------- open ---------- */
async function open(o){o=o||{};close(true);css();const m=kv();
 if(o.groups){o.people=[];o.gi=[];o.groups.forEach((G,gi)=>(G.people||[]).forEach(p=>{o.people.push(p);o.gi.push(gi)}));o.mode="group";o.acts=o.acts||(()=>[])}
 const ppl=(o.people||(typeof curPeople==="function"?curPeople():[])).map((p,i)=>({p,i:o.idx?o.idx[i]:i,gi:o.gi?o.gi[i]:-1})).filter(x=>x.p&&(o.acts||ringable(x.p)));if(!ppl.length)return null;
 const figs=await Promise.all(ppl.map(x=>loadFig(x.p)));const list=ppl.filter((x,k)=>{x.f=figs[k];return !!x.f});if(!list.length)return null;
 const Sc=kitScene.open({bg:o.bg});const L=Sc.L;L.classList.add("kring");document.body.classList.add("kring-on");L.style.opacity="0";
 const R={Sc,L,list,rot:0,v:0,mode:o.mode||"person",slots:[],sel:-1,busy:0,pk:null,o};CUR=R;
 const band=document.createElement("div");band.className="kring-band";L.appendChild(band);R.band=band;const wrap=document.createElement("div");wrap.className="kring-wrap";L.appendChild(wrap);R.W=wrap;
 /* top: kit tabs «Từng người · Từng nhóm» + ✕ */
 const tabs=document.createElement("div");tabs.className="pctabs kring-tabs";tabs.innerHTML=[["person","Từng người"],["group","Từng nhóm"]].map(([k,n])=>`<button type="button" class="pct" data-kr="${k}">${n}</button>`).join("");
 tabs.addEventListener("click",e=>{const b=e.target.closest("[data-kr]");if(b&&!R.busy)setMode(R,b.dataset.kr)});L.appendChild(tabs);R.tabs=tabs;
 /* a PICKER ring (o.acts: the caller's own choices): its kit title on top; the caller's own tabs (o.tabs = [{label,on,fn}]) replace «Từng người · Từng nhóm» */
 if(o.acts){if(o.tabs&&o.tabs.length){tabs.innerHTML=o.tabs.map((t,k)=>`<button type="button" class="pct${t.on?" on":""}" data-kt="${k}">${esc(t.label)}</button>`).join("");tabs.onclick=e=>{const b=e.target.closest("[data-kt]");if(b&&!R.busy){const t=o.tabs[+b.dataset.kt];close(true);t.fn()}}}else tabs.style.display="none";
  if(o.title){const tt=document.createElement("div");tt.className="kring-tt";tt.innerHTML=`<span class="kptitle">${esc(o.title)}</span>`+(o.sub?`<small>${esc(o.sub)}</small>`:"");L.appendChild(tt);if(o.tabs&&o.tabs.length)tt.style.top="52px"}}
 const xw=document.createElement("div");xw.className="kring-x";xw.innerHTML=typeof kitXHTML==="function"?kitXHTML("","Lui"):`<button type="button" class="kit-x" aria-label="Lui">✕</button>`;xw.firstElementChild.addEventListener("click",e=>{e.stopPropagation();if(R.busy)return;if(R.sel>=0)return back(R);close();if(o.onClose)try{o.onClose()}catch(x){console.error(x)}});L.appendChild(xw);R.x=xw;
 const mk=(txt,fn)=>{const b=document.createElement("button");b.type="button";b.className="kbtn kring-ui kring-ar";b.textContent=txt;const a=KIT_RING.arrow[m];b.style.cssText+=`width:${a}px;min-height:${a}px;padding:0;font-size:1.4rem`;b.addEventListener("click",e=>{e.stopPropagation();if(!R.busy&&R.sel<0)turnBy(R,txt==="‹"?-1:1)});L.appendChild(b);return b};
 R.arL=mk("‹");R.arR=mk("›");R.ct=0;R.watch=setInterval(()=>watch(R),250);
 /* drag / swipe with inertia; a tap: front slot = focus, a side slot = turn to it */
 let x0=0,last=0,lt=0,drag=0,moved=0;band.addEventListener("pointerdown",e=>{if(R.busy||R.sel>=0)return;drag=1;moved=0;x0=last=e.clientX;lt=performance.now();R.v=0;cancelAnimationFrame(raf);try{band.setPointerCapture(e.pointerId)}catch(_){}});
 band.addEventListener("pointermove",e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;if(Math.abs(e.clientX-x0)>6)moved=1;if(!moved)return;R.rot-=dx/stepPx(R);R.v=-(dx/stepPx(R))/Math.max(1,now-lt);last=e.clientX;lt=now;place(R)});
 const up=e=>{if(!drag)return;drag=0;if(!moved){tapAt(R,e.clientX,e.clientY);return}fling(R,R.v)};band.addEventListener("pointerup",up);band.addEventListener("pointercancel",up);
 await build(R);await new Promise(r=>requestAnimationFrame(r));
 if(calm()){L.style.opacity="1";L.classList.add("kring-live")}else{{const live=()=>{L.style.opacity="1";L.classList.add("kring-live")};L.animate([{opacity:0},{opacity:1}],{duration:320,easing:"ease-out",fill:"both"}).onfinish=live;setTimeout(live,700)/* RV-175 nit: a fade that never finishes (tab hidden, animation cancelled) can never leave the ring + ✕ inert */}
  R.slots.forEach((s,i)=>{const fin=s.style.transform;s.animate([{transform:`translate(${geo(R).cx-s.__cx}px,${geo(R).floor-geo(R).Ry*2-s.__feet}px) scale(.3)`,opacity:0},{transform:fin,opacity:1}],{duration:520,delay:120+i*50,easing:"cubic-bezier(.2,1.1,.4,1)"})})}
 return R}
async function build(R){R.slots.forEach(s=>s.remove());R.slots=[];const m=kv(),g0=R.L.g;if(R.stdPx==null)R.stdPx=stdImgR()||g0.H*KIT_RING.stdR[m];R.stdR=R.stdPx/g0.H;const fh0=Math.round(R.stdPx);
 const groups=R.o.groups?R.o.groups.map((G,gi)=>({gi,members:R.list.filter(x=>x.gi===gi),line:G.line||G.name||""})).filter(g=>g.members.length):R.mode==="group"?groupsOf(R.list):R.list.map(x=>({members:[x],line:""}));
 R.groups=groups;R.slots=groups.map(g=>{const s=buildSlot(R,g,fh0);R.W.appendChild(s);/* KIT §93.5a: one plate height per row (KK49), measured once the slot is in the page */try{kitNameTagFit(s)}catch(e){}return s});R.rot=0;
 if(R.o.at!=null){const k=R.o.groups?groups.findIndex(g=>g.gi===R.o.at):R.list.findIndex(x=>x.i===R.o.at);if(k>=0)R.rot=k}place(R);
 if(!R.o.acts)R.tabs.querySelectorAll(".pct").forEach(b=>b.classList.toggle("on",b.dataset.kr===R.mode));
 arrows(R);yieldCard(R)}
function arrows(R){const m=kv(),g=geo(R),a=KIT_RING.arrow[m],fy=g.floor-g.H*(R.stdR||KIT_RING.stdR[m])*.45;R.arL.style.left="6px";R.arR.style.left=(g.w-a-6)+"px";R.arL.style.top=R.arR.style.top=fy+"px";
 [R.arL,R.arR].forEach(b=>b.style.visibility=R.slots.length>1?"":"hidden")}
async function setMode(R,m){if(m===R.mode)return;R.busy=1;try{if(R.sel>=0)await back(R,true);const out=R.slots.map(s=>s.animate([{opacity:1},{opacity:0}],{duration:calm()?1:180,fill:"both"}).finished);await Promise.all(out);R.mode=m;await build(R);
 if(!calm())R.slots.forEach((s,i)=>s.animate([{opacity:0,transform:s.style.transform+" scale(.85)"},{opacity:1,transform:s.style.transform}],{duration:300,delay:i*40,easing:E}))}finally{R.busy=0}}
function slotAt(R,x,y){const hit=document.elementsFromPoint(x,y).map(e=>e.closest&&e.closest(".kring-s")).filter(Boolean);if(hit.length)return hit.sort((a,b)=>+b.style.zIndex-+a.style.zIndex)[0];
 /* slots have no pointer events: hit-test the painted boxes in z order */let best=null;R.slots.forEach(s=>{const r=s.getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom&&(!best||+s.style.zIndex>+best.style.zIndex))best=s});return best}
function tapAt(R,x,y){const s=slotAt(R,x,y);if(!s)return tapUnder(R,x,y);const i=R.slots.indexOf(s);if(i===front(R)&&Math.abs(R.rot-Math.round(R.rot))<.02)return focus(R);turnTo(R,i)}
/* KIT §104.1c (K-RING-ALL b, KK59; RV-163J G4 q-softlock + RV-172 nhv family): the band NEVER eats a tap. A tap that hits no ring slot goes to what lies under the ring layer:
   a stage figure (#tokens .tok[data-p]) whose person stands in the ring = that slot turns to the front and focuses (one figure view); any other stage target (a figure not in the ring,
   a plaque, a button) gets the tap itself. Nothing under the finger = nothing happens (empty ground). */
function tapUnder(R,x,y){try{const L=R.L;const el=document.elementsFromPoint(x,y).find(e=>e!==L&&!L.contains(e)&&e!==document.documentElement&&e!==document.body&&!(e.id==="stage"));if(!el)return;
 const tok=el.closest&&el.closest("#tokens .tok[data-p]");
 if(tok){const pi=+tok.dataset.p,k=R.slots.findIndex(s=>s.__g&&s.__g.members.some(m=>m.i===pi));
  if(k>=0){if(R.busy||R.sel>=0)return;return turnTo(R,k).then(()=>{if(CUR===R&&R.sel<0&&front(R)===k)return focus(R)})}}
 const t=(el.closest&&el.closest("button,a,[data-p],.tok,.kpk,[role=button]"))||el;if(typeof t.click==="function")t.click()}catch(e){console.error("kitRing tapUnder",e)}}
function turnBy(R,d){return tween(R,Math.round(R.rot)+d,KRING_MATH.stepMs)}
function turnTo(R,i){const N=R.slots.length;const d=KRING_MATH.short(i,R.rot,N);return tween(R,R.rot+d,Math.min(700,KRING_MATH.stepMs+Math.abs(d)*90))}
/* ---------- focus: the front slot grows to a big full body, slides LEFT; plaques drop on the RIGHT ---------- */
function anim(el,to,ms){const from=el.style.transform||"none";el.style.transform=to;if(calm())return Promise.resolve();return el.animate([{transform:from},{transform:to}],{duration:ms,easing:E}).finished.catch(()=>{})}
async function focus(R){if(R.busy||R.sel>=0)return;R.busy=1;try{const i=front(R);R.sel=i;const s=R.slots[i],m=kv(),g=geo(R),K=KIT_RING;
 R.slots.forEach((o,k)=>{if(k===i)return;o.animate([{opacity:1},{opacity:0}],{duration:calm()?1:260,fill:"both"})});
 [R.arL,R.arR,R.tabs].forEach(b=>b.animate([{opacity:1},{opacity:0}],{duration:calm()?1:200,fill:"both"}));
 s.__g.members.forEach(x=>{x.dim.style.opacity="0"});s.classList.remove("kring-front");
 const grp=s.__g.members.length>1;R.nPk=pkCount(R,s);const FG=focusGeo(R,s),sc=FG.sc,cx=FG.cx,feet=FG.feet;
 R.fT=`translate(${(cx-s.__cx).toFixed(1)}px,${(feet-s.__feet).toFixed(1)}px) scale(${sc.toFixed(3)})`;R.fSc=sc;R.fCx=cx;R.fFeet=feet;s.style.zIndex="200";
 await anim(s,R.fT,K.focusMs);yieldCard(R);
 if(R.o.groups)return groupChoose(R,s);if(grp)return groupPick(R);return personPick(R,s.__g.members[0])}finally{R.busy=0}}
/* RING-BUILD-4 focus geometry (owner 26/11 ~20:30Z «Vòng người che nút chọn … mất cả đầu ở trên»; MAIN LOOK FAIL: the figure over the plaques' left column):
   the big figure keeps KIT_RING.fhF; the plaque band (KIT_PLAQUE one plaque width + post) must fit on its RIGHT inside the layer → slide the figure LEFT first (never past the
   layer edge), shrink ONLY when sliding is not enough; the head is never above the layer top. Group = the whole cluster (every member). */
function paintX(s){let l=1e9,r=-1e9;s.__g.members.forEach(x=>{const L0=x.left||0;l=Math.min(l,L0+x.f.ob.l*x.fw);r=Math.max(r,L0+x.f.ob.r*x.fw)});return{l,r}}
/* KK47 §98.1 wiring: the band hangs from the ONE fixed post (kitPick.postBox). RING-BUILD-7 (MAIN LOOK: the Fold group cluster was tiny beside a 1-column board): the figure
   yields to the board THIS focus really opens — R.nPk plaques (pkCount): a person = her acts (the largest tab);
   a group = «Đứng nghe» + one «Nói với …» per member; a group-picker slot = its choices. A member who steps out re-yields to her own board (reyield, awaited); a later bigger board (talk answers) re-yields as it opens (pickOpen, grow only). Owner 22:43Z: > 7 is
   allowed (no paging) → postBox lays the extra columns leftward; the yield follows whatever box it returns. */
function plaqueNeed(m,R,n){try{if(R&&R.L&&kitPick.postBox){const B=kitPick.postBox(R.L,n||R.nPk||7);/* KK51 §98.1: ✓/✕ stand ON the lifted plaque → x0 is the board's real left edge, no extra room */return Math.round(B.W-B.x0+10)}}catch(e){}const K=window.KIT_PLAQUE||{};return ((K.w&&K.w[m])||170)+(K.post||8)+30}
function maxActs(G){return Math.max(0,...(G||[]).map(g=>g&&g.acts?g.acts.length:1))}
function personN(R,x){let n=0;try{if(R.o.acts){const A=R.o.acts(x)||[];n=A.length&&A[0].acts?maxActs(A):A.length}else n=maxActs(acts(R,x))}catch(e){}return Math.max(1,n)}
function pkCount(R,s){const M=s.__g.members;try{if(R.o.groups){const A=R.o.gacts?R.o.gacts(s.__g.gi)||[]:[];return Math.max(1,A.length&&A[0].acts?maxActs(A):A.length)}}catch(e){return 7}return M.length>1?1+M.length:personN(R,M[0])}
async function reyield(R,n){const s=R.slots[R.sel];if(!s||n===R.nPk)return;const B0=plaqueNeed(kv(),R,R.nPk),B1=plaqueNeed(kv(),R,n);R.nPk=n;if(Math.abs(B0-B1)<2)return;
 const FG=focusGeo(R,s);R.fSc=FG.sc;R.fCx=FG.cx;R.fFeet=FG.feet;R.fT=`translate(${(FG.cx-s.__cx).toFixed(1)}px,${(FG.feet-s.__feet).toFixed(1)}px) scale(${FG.sc.toFixed(3)})`;await anim(s,R.fT,360)}
function focusGeo(R,s){const m=kv(),g=geo(R),K=KIT_RING,grp=s.__g.members.length>1,fwS=s.offsetWidth,edge=8,need=plaqueNeed(m,R),P=paintX(s),hh=s.__feet-s.__top;
 let sc=(g.H*K.fhF[m])/hh;if(grp)sc=Math.min(sc,g.w*K.grpW[m]/fwS);let cx=g.w*(grp?K.fx[m]+.03:K.fx[m]);const feet=g.H*.995;
 const right=()=>cx+(P.r-s.__cx)*sc,left=()=>cx+(P.l-s.__cx)*sc;let over=right()+need-g.w;
 if(over>0){cx-=Math.min(over,Math.max(0,left()-edge));over=right()+need-g.w}
 if(over>0){sc=Math.max(.3,(g.w-need-edge)/Math.max(1,P.r-P.l));cx=edge+(s.__cx-P.l)*sc}
 /* a group member who steps out grows ×1.06 from her feet: the head line keeps that room */const up=grp?1.08:1;if(feet-hh*sc*up<4)sc=(feet-4)/(hh*up);return{sc,cx,feet}}
/* every ring picker opens through here: with TWO plaque columns the left column's ✓ / ✕ sits on its outer (left) side = toward the figure → the band moves right by that room */
function pickOpen(R,o){try{const n=o.groups?maxActs(o.groups):(o.acts||[]).length;if(R.sel>=0&&n&&plaqueNeed(kv(),R,n)>plaqueNeed(kv(),R,R.nPk)+2)reyield(R,n)}catch(e){console.error("kitRing reyield",e)}let P=kitPick.open(o);try{const G=P&&P.G,A=o.anchor;if(G&&!G.fixed&&A&&G.cols===2&&G.side==="r"){const cw=((typeof KIT_HAND!=="undefined"&&KIT_HAND.confPx)||44)*2+6+12,fr=A.x+A.w;if(G.x0-cw<fr){P.destroy();P=kitPick.open(Object.assign({},o,{anchor:Object.assign({},A,{w:A.w+(fr-(G.x0-cw))})}))}}}catch(e){console.error("kitRing pick",e)}return P}
/* the union box of every member of the focused slot (layer px): the plaques and the bubble go to the right of the WHOLE cluster, never over a member */
function unionBox(R){const M=R.slots[R.sel].__g.members.map(y=>boxOf(R,y));const x0=Math.min(...M.map(b=>b.x)),y0=Math.min(...M.map(b=>b.y));return{x:x0,y:y0,w:Math.max(...M.map(b=>b.x+b.w))-x0,h:Math.max(...M.map(b=>b.y+b.h))-y0}}
/* §104.3 group PICKER mode (open({groups:[{name,line,people}], gacts(gi)→acts|groups, onGroupPick(gi,id)})): the focused group's plaques = the caller's choices for that group */
function groupChoose(R,s){closePk(R);const gi=s.__g.gi,M=s.__g.members;let A=[];try{A=R.o.gacts?R.o.gacts(gi)||[]:[]}catch(e){console.error(e)}
 const b=M.map(x=>boxOf(R,x)).reduce((u,q)=>u?{x:Math.min(u.x,q.x),y:Math.min(u.y,q.y),w:Math.max(u.x+u.w,q.x+q.w)-Math.min(u.x,q.x),h:Math.max(u.y+u.h,q.y+q.h)-Math.min(u.y,q.y)}:q,null);
 R.repick=()=>groupChoose(R,s);R.pk=pickOpen(R,Object.assign({host:R.L,anchor:b,side:"r",dismiss:false,noLap:true},A.length&&A[0].acts?{groups:A}:{acts:A},{onPick:id=>{const fn=R.o.onGroupPick;close(true);if(fn)try{fn(gi,id)}catch(e){console.error("kitRing gpick",e)}}}));return R.pk}
/* the painted box of one member of the focused slot, in layer px */
function boxOf(R,x){/* RING-BUILD-4: the painted box as it IS on screen (a stepping-out member's neighbours draw back ±12 % — the old maths missed that and the plaques landed on them) */
 try{const r=x.el.getBoundingClientRect(),o=x.f.ob;if(r.width>1&&r.height>1){const a=unyield(R,r.left,r.top),b=unyield(R,r.right,r.bottom),W=b.x-a.x,H=b.y-a.y;return {x:a.x+o.l*W,y:a.y+o.t*H,w:(o.r-o.l)*W,h:(o.b-o.t)*H}}}catch(e){}return boxOf0(R,x)}
/* a screen point → layer px WITHOUT the figure layer's card yield (slide / shrink while a result card shows): plaques, tags and the bubble keep the full-size room, which holds the yielded figure */
function unyield(R,px,py){const L=R.L.getBoundingClientRect();let x=px-L.left,y=py-L.top;try{const c=getComputedStyle(R.W);if(c.transform&&c.transform!=="none"){const m=new DOMMatrix(c.transform),og=c.transformOrigin.split(" ").map(parseFloat),ox=og[0]||0,oy=og[1]||0;const q=m.inverse().transformPoint(new DOMPoint(x-ox,y-oy));x=q.x+ox;y=q.y+oy}}catch(e){}return{x,y}}
function boxOf0(R,x){const s=R.slots[R.sel],sc=R.fSc,ox=R.fCx-s.__cx*sc,oy=R.fFeet-s.__feet*sc;const left=(x.left||0),top=x.el.offsetTop-(x.lift||0);
 return {x:ox+(left+x.f.ob.l*x.fw)*sc,y:oy+(top+x.f.ob.t*x.fh)*sc,w:(x.f.ob.r-x.f.ob.l)*x.fw*sc,h:(x.f.ob.b-x.f.ob.t)*x.fh*sc}}
function closePk(R){if(R.pk){try{R.pk.destroy()}catch(e){}R.pk=null}if(R.ftg){R.ftg.remove();R.ftg=null}}
function focusTag(R,x){if(R.ftg)R.ftg.remove();const b=boxOf(R,x);const t=tagEl(x.p,"kring-ftg",1);t.style.left=(b.x+b.w/2)+"px";t.style.top=Math.min(R.L.g.H-30,b.y+b.h+2)+"px";
 /* the big figure's feet reach the floor: the tag sits over the lower legs, never over a face */if(b.y+b.h+30>R.L.g.H)t.style.top=(b.y+b.h*.86)+"px";R.W.appendChild(t);try{kitNameTagFit(t)}catch(e){}R.ftg=t;if(!calm())t.animate([{opacity:0},{opacity:1}],{duration:220,fill:"both"})}
function acts(R,x){let G=[];try{G=dfData(x.i)||[]}catch(e){}return G.filter(g=>g.acts&&g.acts.length).map(g=>({k:g.k,n:g.n,acts:g.acts}))}
/* the person she talks to = the game's OWN focus-view flow (jdfv: DF.p / DF.F, dfTap → dfRun → dfAfter; an event frame about this person (Q, e.g. «Trò chuyện» topics)
   plays in the same focus: its lines in the kit speech bubble, its answers as thẻ gỗ on the right). The ring is that view's FIGURE + PICKER (adapter F below);
   the old kitFocus figure view is not opened while the ring holds the person (ONE figure on the scene). On-figure mini-games: F.play → null = the plain result (game layer later, KK44). */
function personPick(R,x,G){closePk(R);R.who=x;focusTag(R,x);
 if(R.o.acts){let A=[];try{A=R.o.acts(x)||[]}catch(e){console.error("kitRing acts",e)}const others=R.slots[R.sel].__g.members.filter(y=>y!==x).map(y=>boxOf(R,y));
  R.repick=()=>personPick(R,x);R.pk=pickOpen(R,Object.assign({host:R.L,anchor:unionBox(R),avoid:others,side:"r",dismiss:false,noLap:true},A.length&&A[0].acts?{groups:A}:{acts:A},{onPick:id=>{const fn=R.o.onPick;close(true);if(fn)try{fn(x.i,id,x.p)}catch(e){console.error("kitRing pick",e)}}}));return R.pk}
 try{if(typeof DF==="object"&&DF){if(!R.tk||DF.F!==R.F){const tk={};R.tk=tk;DF.tk=tk}DF.p=x.p;DF.i=x.i;popIdx=x.i;DF.F=R.F=adapter(R,x)}}catch(e){console.error("kitRing DF",e)}
 G=G||acts(R,x);const others=R.slots[R.sel].__g.members.filter(y=>y!==x).map(y=>boxOf(R,y));
 if(!G.length){try{kitResultCard({title:x.p.name,ok:true,rows:[{k:"note",label:"",items:["Lúc này không có việc gì để làm với người này."]}]})}catch(e){}return}
 R.repick=()=>personPick(R,x);R.pk=pickOpen(R,{host:R.L,anchor:unionBox(R),avoid:others,side:"r",noLap:true,groups:G.map(g=>({k:g.k,n:g.n,acts:g.acts})),dismiss:false,onPick:(id,a)=>runAct(R,x,id,a)});return R.pk}
function showQ(){try{if(typeof Q!=="undefined"&&Q.length&&document.getElementById("modal").hidden){if(typeof render==="function")render();if(Q.length&&document.getElementById("modal").hidden&&typeof showModal==="function")showModal()}}catch(e){console.error("kitRing frame",e)}}
async function runAct(R,x,id,a){closePk(R);R.last=a&&a.n;try{if(typeof dfTap==="function"&&DF.F===R.F)dfTap(id);else dfRun(x.i,id)}catch(e){console.error("kitRing act",e)}
 /* an event frame the act queued (Q): show it now (the place stage under the ring would have shown it on its next render) */await wait(60);showQ();
 const again=()=>{if(CUR!==R||R.sel<0||R.who!==x)return;if(R.saying||R.pk)return;if(typeof Q!=="undefined"&&Q.length||!document.getElementById("modal").hidden){showQ();setTimeout(again,400);return}personPick(R,x)};setTimeout(again,700)}
/* the light speech bubble beside the big figure (kit speech look of §102.2 .ksay: soft paper, thin gold edge; no panel) */
function sayBox(R,x){let b=R.say;if(!b){b=document.createElement("div");b.className="kring-say";R.L.appendChild(b);R.say=b}const m=kv(),B=R.sel>=0?unionBox(R):boxOf(R,x),W=R.L.g.w,H=R.L.g.H;
 /* RING-BUILD-4: the bubble starts right of her painted box (never over her face / body); only a too-narrow room falls back to the old overlap */
 const wMax=Math.min(W*(m==="kv2"?.40:.46),460),l0=B.x+B.w+14,room=W-12-l0;let left,w;if(room>=Math.min(wMax,220)){left=l0;w=Math.min(wMax,room)}else{w=wMax;left=Math.min(W-12-w,B.x+B.w*.72)}
 b.style.cssText=`left:${Math.max(8,left)}px;top:${Math.round(H*(m==="kv2"?.12:.10))}px;width:${w}px`;return b}
function adapter(R,x){const F={get el(){return R.L},get figEl(){return x.el&&x.el.querySelector("img")},figRect(){const b=boxOf(R,x),r=R.L.getBoundingClientRect();return new DOMRect(r.left+b.x,r.top+b.y,b.w,b.h)},
 playing:false,play(){return null},intro(){return false},endPlay(){},hud(){},
 say(lines,o){o=o||{};closePk(R);const L=(lines||[]).filter(l=>l&&l.text);if(!L.length){o.onDone&&o.onDone();return}R.saying=1;const b=sayBox(R,x);let k=0;
  const show=()=>{const l=L[k];b.innerHTML=`${l.who?`<b class="kring-sw">${esc(l.who)}</b>`:""}<span class="kring-st"></span><i class="kring-more">${k<L.length-1?"▸":"✓"}</i>`;const st=b.querySelector(".kring-st");
   R.tl=typeof kitTypeLine==="function"?kitTypeLine(st,l.text):(st.textContent=l.text,{done:true,finish(){}});if(!calm())b.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:200,fill:"both"})};
  const next=e=>{if(e){e.stopPropagation();e.preventDefault()}if(R.tl&&!R.tl.done){R.tl.finish();return}k++;if(k<L.length){show();return}R.L.removeEventListener("pointerup",next,true);R.saying=0;b.remove();R.say=null;o.onDone&&o.onDone()};
  R.L.addEventListener("pointerup",next,true);show()},
 choices(list,cb){closePk(R);R.repick=()=>F.choices(list,cb);R.pk=pickOpen(R,{host:R.L,anchor:unionBox(R),side:"r",noLap:true,acts:(list||[]).map(a=>({id:a.id,n:a.n,pic:a.pic||"",word:a.word||"",ton:a.ton||"",off:!!a.off,why:a.why||""})),dismiss:false,onPick:id=>{closePk(R);cb&&cb(id);setTimeout(()=>{showQ()},60)}})},
 setGroups(G){if(CUR!==R||R.sel<0||R.who!==x||R.saying)return;if(typeof Q!=="undefined"&&Q.length)return;personPick(R,x,(G||[]).filter(g=>g.acts&&g.acts.length))},
 react(o){try{const ln=o&&o.line;if(!ln)return;const b=sayBox(R,x);b.innerHTML=`<span class="kring-st">${esc(ln)}</span>`;if(!calm())b.animate([{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.85},{opacity:0}],{duration:2600,fill:"both"}).onfinish=()=>{if(R.say===b&&!R.saying){b.remove();R.say=null}}}catch(e){}},
 open(){},close(){if(CUR===R&&R.sel>=0)back(R)},destroy(){closePk(R)}};return F}
function dfLeave(R){try{if(typeof DF==="object"&&DF&&R.F&&DF.F===R.F){const tk=R.tk;R.F=null;R.tk=null;if(typeof dfClosed==="function")dfClosed(tk)}}catch(e){}if(R.say){R.say.remove();R.say=null}R.saying=0}
/* group focus: «Đứng nghe» + «Nói với …» per member */
function groupPick(R){closePk(R);dfLeave(R);R.who=null;const s=R.slots[R.sel],M=s.__g.members;if(R.nPk!==1+M.length){reyield(R,1+M.length).then(()=>{if(CUR===R&&R.sel>=0&&!R.who)groupPick(R)});return}const face=p=>{try{const f=kitFace(p.ref||p);return f&&f.src||""}catch(e){return""}};
 const nm=p=>{const q=p.ref||p;try{return typeof kitIsKnown==="function"&&!kitIsKnown(q)&&typeof kitUnkName==="function"?kitUnkName(q):(q.name||p.name)}catch(e){return p.name}};
 const list=[{id:"listen",n:"Đứng nghe",pic:typeof kitActArt==="function"&&(kitActArt("Nghe ngóng")||{}).src||"",word:"",ton:""},...M.map((x,k)=>({id:"m"+k,n:"Nói với "+nm(x.p),pic:face(x.p),word:"",ton:""}))];
 const a=M.map(x=>boxOf(R,x));const all={x:Math.min(...a.map(b=>b.x)),y:Math.min(...a.map(b=>b.y)),w:0,h:0};all.w=Math.max(...a.map(b=>b.x+b.w))-all.x;all.h=Math.max(...a.map(b=>b.y+b.h))-all.y;
 R.repick=()=>groupPick(R);R.pk=pickOpen(R,{host:R.L,anchor:all,side:"r",noLap:true,acts:list,dismiss:false,onPick:id=>{if(id==="listen")return listen(R);stepOut(R,M[+id.slice(1)])}});return R.pk}
function listen(R){const s=R.slots[R.sel],M=s.__g.members;const nm=p=>{const q=p.ref||p;try{return typeof kitIsKnown==="function"&&!kitIsKnown(q)&&typeof kitUnkName==="function"?kitUnkName(q):(q.name||p.name)}catch(e){return p.name}};
 try{kitResultCard({title:s.__g.line,ok:true,rows:[{k:"note",label:"Nghe được",items:M.slice(0,3).map(x=>`${esc(nm(x.p))}: ${esc(x.why||"đứng cùng nhóm")}`).concat(M.length>3?[`và ${M.length-3} người nữa đứng nghe cùng`]:[])}]})}catch(e){console.error(e)}/* a fresh picker (the chosen plaque goes back to the rail) */setTimeout(()=>{if(CUR===R&&R.sel>=0&&!R.who)groupPick(R)},250)}
/* a member STEPS OUT of the group toward her: she comes forward, the others dim and draw back */
async function stepOut(R,x){if(R.busy)return;R.busy=1;try{closePk(R);const s=R.slots[R.sel],M=s.__g.members;
 const ps=[];M.forEach(y=>{if(y===x)return;const t=(y.lift?`translateY(${-y.lift}px) `:"")+`translateX(${(y.cx<x.cx?-1:1)*y.fw*.12}px) scale(.94)`;ps.push(anim(y.el,t,420));if(!calm())y.dim.animate([{opacity:0},{opacity:1}],{duration:420,fill:"forwards"}).onfinish=()=>{y.dim.style.opacity="1"};else y.dim.style.opacity="1"});
 x.el.style.zIndex="9";ps.push(anim(x.el,`scale(1.06)`,460));/* the plaques are placed on the cluster as it ENDS (every member's move done) */await Promise.all(ps);await reyield(R,personN(R,x));
 /* boxOf reads the member box unscaled: correct for the step-out scale */personPickScaled(R,x,1.06);R.repick=()=>personPickScaled(R,x,1.06)}finally{R.busy=0}}
function personPickScaled(R,x,k){const fw=x.fw,fh=x.fh,l=x.left,lf=x.lift||0;x.left=l-(fw*(k-1))/2;x.lift=lf+fh*(k-1);x.fw=fw*k;x.fh=fh*k;try{personPick(R,x)}finally{x.left=l;x.fw=fw;x.fh=fh;x.lift=lf}}
/* RING-BUILD-4 WATCH (one 250 ms check while the ring is open):
   (a) LAYER REFIT — the kit scene layer is sized once at open from kscnGeo() (HUD bottom → bottom bar top); when the bottom bar grows (a 3-line «Sang buổi» label after an act)
       or the HUD / window changes, the layer took the old height and covered the bottom buttons (owner 20:30Z «Vòng người che nút chọn ở dưới»). Same kit geometry, re-applied;
       ring / focus / plaques / bubble follow. (KIT REQUEST to KK45: kitScene.refit for every scene — the ring does it for its own layer until then.)
   (b) RESULT CARD — while the kit result card (#rtoast.on) is over a figure, the figures SLIDE aside (smallest shift clear of the card and of every tap target), else SHRINK
       (scaled from their head line until the feet clear the card top); back to full size when the card goes. Never over the card, never over a button. */
function geoSig(){try{const g=kscnGeo();return [g.t,g.H,g.L,g.R,g.w].join(",")}catch(e){return ""}}
function cardBox(){const t=document.getElementById("rtoast");if(!t||!t.classList.contains("on"))return null;try{const c=getComputedStyle(t);if(c.display==="none"||c.visibility==="hidden"||+c.opacity<.05)return null}catch(e){return null}const r=t.getBoundingClientRect();return r.width>4&&r.height>4?r:null}
function watch(R){if(CUR!==R){clearInterval(R.watch);return}try{const gs=geoSig();if(gs&&gs!==R.gsig){const first=R.gsig==null;R.gsig=gs;if(!first)refit(R)}
 const c=cardBox(),cs=c?[c.left,c.top,c.width,c.height].map(Math.round).join(","):"";if((cs!==R.csig||(cs&&++R.ct%4===0))&&!R.busy&&!raf){R.csig=cs;yieldCard(R)}}catch(e){console.error("kitRing watch",e)}}
function refit(R){if(CUR!==R||typeof kscnGeo!=="function")return;const g=kscnGeo(),L=R.L;L.style.left=g.L+"px";L.style.right=g.R+"px";L.style.top=g.t+"px";L.style.height=g.H+"px";L.g=g;
 if(R.sel<0){place(R)}else{const s=R.slots[R.sel];s.getAnimations().forEach(a=>{if(a.effect&&a.effect.getKeyframes().some(k=>k.transform))a.cancel()});const FG=focusGeo(R,s);R.fSc=FG.sc;R.fCx=FG.cx;R.fFeet=FG.feet;
  R.fT=`translate(${(FG.cx-s.__cx).toFixed(1)}px,${(FG.feet-s.__feet).toFixed(1)}px) scale(${FG.sc.toFixed(3)})`;s.style.transform=R.fT;
  if(R.pk&&R.repick)R.repick();else if(R.ftg&&R.who)focusTag(R,R.who);if(R.say&&R.who)sayBox(R,R.who)}
 arrows(R);R.csig=null}
function yieldCard(R){if(CUR!==R||!R.W)return;const W=R.W;W.getAnimations().forEach(a=>a.cancel());const prev=W.style.transform,po=W.style.transformOrigin;W.style.transform="";W.style.transformOrigin="";let to="",org="";
 try{const c=cardBox();if(c){const L=R.L.getBoundingClientRect();const vis=e=>{for(let n=e;n&&n!==R.L;n=n.parentElement){const k=getComputedStyle(n);if(k.visibility==="hidden"||k.display==="none"||+k.opacity<.05)return false}return true};
  const F=[];R.slots.forEach(s=>{if(!vis(s))return;s.__g.members.forEach(x=>{if(!vis(x.el))return;const r=x.el.getBoundingClientRect(),o=x.f.ob;F.push({x:r.left+o.l*r.width,y:r.top+o.t*r.height,w:(o.r-o.l)*r.width,h:(o.b-o.t)*r.height})})});
  const hit=(a,b)=>Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>.5&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>.5;const C={x:c.left-6,y:c.top-6,w:c.width+12,h:c.height+12};
  if(F.length&&F.some(f=>hit(f,C))){const T=[C];R.L.querySelectorAll(".kring-x button,.kring-ar,.kring-tabs .pct,.kpk .kpk-b,.kpk .kpk-tabs .pct,.kring-say").forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();if(r.width>4)T.push({x:r.left,y:r.top,w:r.width,h:r.height})});
   const ux0=Math.min(...F.map(f=>f.x)),ux1=Math.max(...F.map(f=>f.x+f.w)),uy0=Math.min(...F.map(f=>f.y)),uy1=Math.max(...F.map(f=>f.y+f.h));
   const ok=G=>G.every(f=>f.x>=L.left+2&&f.x+f.w<=L.right-2&&T.every(t=>!hit(f,t)));
   const sh=[C.x+C.w-ux0,-(ux1-C.x)].filter(d=>R.sel<0||d<0).sort((a,b)=>Math.abs(a)-Math.abs(b)).find(d=>ok(F.map(f=>Object.assign({},f,{x:f.x+d}))));
   if(sh!=null)to=`translateX(${sh.toFixed(1)}px)`;
   else{const k=Math.max(.4,Math.min(1,(C.y-2-uy0)/Math.max(1,uy1-uy0))),ox=(ux0+ux1)/2;to=`scale(${k.toFixed(3)})`;org=`${(ox-L.left).toFixed(1)}px ${(uy0-L.top).toFixed(1)}px`}}}}catch(e){console.error("kitRing card",e)}
 W.style.transformOrigin=org||po||"";W.style.transform=to;if(to!==prev&&!calm())W.animate([{transform:prev||"none",transformOrigin:po||org||"50% 0"},{transform:to||"none",transformOrigin:org||po||"50% 0"}],{duration:260,easing:E});if(!to)W.style.transformOrigin=""}
/* back to the ring */
async function back(R,quick){closePk(R);dfLeave(R);const i=R.sel;if(i<0)return;R.busy=1;try{const s=R.slots[i];R.sel=-1;
 R.repick=null;s.__g.members.forEach(y=>{y.el.getAnimations().forEach(a=>a.cancel());y.dim.getAnimations().forEach(a=>a.cancel());y.el.style.transform=y.lift?`translateY(${-y.lift}px)`:"";y.el.style.zIndex=""});
 R.slots.forEach(o=>o.getAnimations().forEach(a=>a.cancel()));[R.arL,R.arR,R.tabs].forEach(b=>b.getAnimations().forEach(a=>a.cancel()));
 const from=s.style.transform;place(R);const to=s.style.transform;if(!quick&&!calm()){s.animate([{transform:from},{transform:to}],{duration:420,easing:E});R.slots.forEach((o,k)=>{if(k!==i)o.animate([{opacity:0},{opacity:1}],{duration:320,delay:120,fill:"backwards"})})}yieldCard(R)}finally{R.busy=0}}
function close(now){const R=CUR;if(!R)return;CUR=null;clearInterval(R.watch);document.body.classList.remove("kring-on");cancelAnimationFrame(raf);closePk(R);dfLeave(R);try{if(kitScene.cur&&kitScene.cur.L===R.L)kitScene.close(!!now);else R.L.remove()}catch(e){try{R.L.remove()}catch(_){}}}
const kitRing=window.kitRing={open,close,groupsOf,get cur(){return CUR},
 turnBy:d=>CUR&&turnBy(CUR,d),turnTo:i=>CUR&&turnTo(CUR,i),focus:()=>CUR&&focus(CUR),back:()=>CUR&&back(CUR),setMode:m=>CUR&&setMode(CUR,m),pick:i=>{const P=CUR&&CUR.pk;return P},
 front:()=>CUR?front(CUR):-1};
/* ---------- wiring (prototype): a crowded place visit opens the ring over the place stage ---------- */
function wants(){try{if(!KIT_RING.wire||window.__bot||window.__kringOff||!S||S.dead||(typeof Q!=="undefined"&&Q.length))return false;const V=S.visit;if(!V||V.k==="home")return false;
 return V.people.filter(ringable).length>=KIT_RING.min&&(typeof tab==="undefined"||tab==="act")}catch(e){return false}}
kitRing.wants=wants;
/* the person held by the ring IS on the scene: the game's encounter flow (jdfv showModal) plays her event frames in the ring focus even when her stage token is folded («+N») under the ring */
if(typeof dfHasFig==="function"){const h0=dfHasFig;dfHasFig=window.dfHasFig=function(i){try{if(CUR&&CUR.sel>=0&&CUR.who&&CUR.who.i===i&&CUR.F&&DF.F===CUR.F)return true}catch(e){}return h0.apply(this,arguments)}}
if(typeof goTo==="function"){const g0=goTo;goTo=window.goTo=function(k){const r=g0.apply(this,arguments);try{if(k!=="home"){const V=S.visit;let n=0;const tick=()=>{if(S.visit!==V||kitRing.cur||++n>240)return;/* a walk encounter / place event (Q) first: the ring opens when its frame is done */if(wants()&&document.getElementById("modal").hidden)open({mode:KIT_RING.mode0||"person"});else setTimeout(tick,250)};setTimeout(tick,60)}}catch(e){console.error("kitRing wire",e)}return r}}

/* ---------- §104.2 wiring A: EVERY person-picker frame (a #modal option list where every card is a person: plant a servant, probe, evidence, item target, gift receiver,
   offer, spy, hire, close maid, scold, runner …) → vòng người. The frame stays the game's own (its buttons run the pick); the ring is its face: front-tap → big figure LEFT,
   «Chọn» drops RIGHT (a locked card = its kit «why»); the frame's own tabs ride on the ring; ✕ = the frame's own back. ---------- */
if(typeof kitOptAvatar==="function"){const oa=kitOptAvatar;kitOptAvatar=window.kitOptAvatar=function(b,f,who){try{if(b&&who&&typeof who==="object")b.__kwho=who}catch(e){}return oa.apply(this,arguments)}}
function txt(el){return el?String(el.textContent||"").replace(/\s+/g," ").trim():""}
function modalPeople(){const M=document.getElementById("modal");if(!M||M.hidden)return null;const g=M.querySelector(".opts");if(!g||g.closest(".pc,.kpdlg"))return null;
 const k=[...g.children].filter(b=>b.tagName==="BUTTON"&&b.getClientRects().length);const fc=b=>b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&(/^face/.test(b.dataset.kopic||"")||!!b.querySelector(".kopface"));
 /* one plain card beside the people (a «back» card, or a free «thôi» card) = the ring's ✕ */const aside=k.filter(b=>!fc(b));if(aside.length>1)return null;const nb=k.filter(fc);if(nb.length<2)return null;const out=[];
 for(const b of nb){
  let who=b.__kwho||null;if(!who)try{const kan=b.querySelector(".kan"),pp=kitOptPic(typeof kpActName==="function"&&kan?kpActName(kan):txt(kan),b);who=pp&&pp.who}catch(e){}
  if(!who||typeof who!=="object")return null;out.push({b,who})}
 return {M,g,list:out,back:aside[0]||null}}
function modalRing(){try{if(!KIT_RING.wire||window.__bot||window.__kringOff||(CUR&&CUR.o.modal))return;const P=modalPeople();if(!P)return;const M=P.M;
 const m=typeof Q!=="undefined"&&Q[0]||{};const title=txt(M.querySelector(".kptitle,h2,h3"))||String(m.title||"").replace(/<[^>]*>/g,"");
 const lead=txt(M.querySelector(".mtx,.mbody>p,p"));const tabs=[...M.querySelectorAll(".pctabs .pct")].map(t=>({label:txt(t),on:t.classList.contains("on"),fn:()=>{M.classList.remove("kring-held");t.click();setTimeout(modalRing,150)}}));
 M.classList.add("kring-held");
 open({people:P.list.map(x=>({ref:x.who,name:x.who.name,kind:"pick"})),title,sub:lead.length>90?lead.slice(0,88)+"…":lead,tabs,modal:1,
  acts:x=>{const b=P.list[x.i].b;const sub=txt(b.querySelector(".kad,.kas,.kasub,small"));return [{id:"go",n:"Chọn",word:"",ton:"",off:!!b.disabled,why:b.disabled?(b.title||sub):"",info:sub}]},
  onPick:i=>{M.classList.remove("kring-held");P.list[i].b.click()},
  onClose:()=>{M.classList.remove("kring-held");const x=P.back||M.querySelector(".kit-x,.mx");if(x)x.click()}}).then(R=>{if(!R)M.classList.remove("kring-held")})}catch(e){console.error("kitRing modal",e);try{document.getElementById("modal").classList.remove("kring-held")}catch(_){}}}
/* the frame is watched, not wrapped (showModal is re-wrapped at run time by later layers): any change of #modal → one check on the next frames */
{let tq=0;const chk=()=>{tq=0;try{const M=document.getElementById("modal");if(CUR&&CUR.o.modal&&(!M||M.hidden||!M.classList.contains("kring-held")))close(true);if(M&&!M.hidden&&!M.classList.contains("kring-held"))modalRing()}catch(e){}};
 const watch=()=>{const M=document.getElementById("modal");if(!M)return setTimeout(watch,500);new MutationObserver(()=>{if(!tq)tq=requestAnimationFrame(()=>requestAnimationFrame(chk))}).observe(M,{attributes:true,attributeFilter:["hidden"],childList:true,subtree:true})};watch()}
kitRing.modalPeople=modalPeople;kitRing.ringable=ringable;
/* ---------- §104.2 wiring B: EVERY face strip (pager: Phi tần, Con cái, Nam nhân, Kế vị, Thân tộc, Hôn, Quan, Khuê các …) → vòng người. The strip goes; one kit button names
   who is shown («‹ tên · i/n ›») and opens the ring of that list at her; front-tap → her card's own buttons drop RIGHT («Xem» = show her card). Items without a person stay the old strip. ---------- */
const PGI=window.__kringPG={};
if(typeof pager==="function"){const pg0=pager;pager=window.pager=function(key,items,mk){try{if(KIT_RING.wire&&KIT_RING.strip!==false&&!window.__bot&&items&&items.length>1&&items.every(t=>t&&t.p&&typeof t.p==="object")){
  const n=items.length;let i=PG[key];if(i==null||i<0||i>=n)i=0;PG[key]=i;PGI[key]={items,mk};const nm=String(items[i].name||"").replace(/<[^>]*>/g,"");
  return `<div class="kring-pg"><button type="button" class="kbtn" data-knav="ring" data-kring-pg="${esc(key)}">‹ ${esc(nm)} · ${i+1}/${n} ›</button></div>`+mk(i)}}catch(e){console.error("kitRing pager",e)}return pg0.apply(this,arguments)};
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kring-pg]");if(!b)return;e.preventDefault();e.stopPropagation();stripRing(b.dataset.kringPg)},true)}
function cardBtns(host){const out=[];for(let n=host&&host.nextElementSibling;n;n=n.nextElementSibling)out.push(...n.querySelectorAll(".pcg button"));return out}
const actNm=b=>{const e=b.querySelector(".kan")||b.querySelector("b,strong")||b.firstElementChild||b;let t=txt(e);try{if(typeof kpActName==="function"&&b.querySelector(".kan"))t=kpActName(b.querySelector(".kan"))}catch(_){}return t.slice(0,40)};
function stripRing(key){const G=PGI[key];if(!G)return;const {items,mk}=G;
 /* her card's own act groups (.pcg[data-g]) = the plaque groups; «Xem» (show her card) leads the first group */
 const actsOf=j=>{const d=document.createElement("div");try{d.innerHTML=mk(j)}catch(e){}let k=0;const see={id:"see",n:"Xem",pic:ringActPic("Xem"),word:"",ton:""};
  const G=[...d.querySelectorAll(".pcg")].map(g=>({k:g.dataset.g||String(k),n:g.dataset.g||"",acts:[...g.querySelectorAll("button")].map(b=>({id:"b"+(k++),n:actNm(b),word:"",ton:"",off:!!b.disabled,why:b.disabled?(b.title||""):""}))})).filter(g=>g.acts.length);
  if(!G.length)return [see];G[0].acts.unshift(see);return G};
 let title="";try{title=txt(document.querySelector(`button[data-tab="${typeof tab!=="undefined"?tab:""}"]`))}catch(e){}
 open({people:items.map(t=>t.p),title,at:PG[key],acts:x=>actsOf(x.i),
  onPick:(i,id)=>{PG[key]=i;try{render()}catch(e){console.error(e)}if(id==="see")return;const k=+id.slice(1);requestAnimationFrame(()=>{const bar=document.querySelector(`[data-kring-pg="${CSS.escape(key)}"]`);const b=cardBtns(bar&&bar.closest(".kring-pg"))[k];if(b)b.click()})}})}
kitRing.stripRing=stripRing;
/* ---------- §104.2 wiring C: the place stage — a tapped stage figure / rail person opens the ring at that person (any count; the old token pop-up card does not open) ---------- */
function stageRing(idx){try{const P=typeof curPeople==="function"?curPeople():[];const p=P[idx];if(!p||!ringable(p))return false;open({mode:"person",people:P,at:idx}).then(R=>{if(R&&R.list.length)setTimeout(()=>{if(CUR===R&&R.sel<0&&front(R)===R.list.findIndex(x=>x.i===idx))focus(R)},700)});return true}catch(e){return false}}
kitRing.stageRing=stageRing;
/* the stage figure tap enters jdfv's focus view (dfOpen): with the ring wired, the ring holds her instead (ONE figure view) */
if(typeof dfOpen==="function"){const do0=dfOpen;dfOpen=window.dfOpen=function(i){try{if(KIT_RING.wire&&!window.__bot&&!window.__kringOff&&!CUR&&S&&S.visit&&typeof i==="number"&&stageRing(i))return}catch(e){}return do0.apply(this,arguments)}}
/* ---------- §104.2 wiring D: Việc nhờ strips (q72 «Đang làm / Đã qua») — the requester as a person object (a record with no living person = a face stand-in: silhouette figure) ---------- */
window.q72Pp=function(a){try{if(!a)return{name:"?"};if(a.o&&typeof a.o==="object")return a.o;if(a.o==="th"||a.k==="th")return{kind:"th"};if(a.k==="emp")return S.emp;
 const v=(rivals||[]).find(x=>x.name===a.n);if(v)return v;return{name:a.n||a.pn||"?",f:a.f}}catch(e){return{name:"?"}}};
/* ---------- §104.2 wiring E: Ân oán person slot (relPopOpen: kit dialog + group tabs + face strip) → vòng người. Group tabs (Ta · Chí tôn · Phi tần · Nam nhân · Cung nhân) ride on
   the ring; «Chọn» = the slot takes that person (relSel / relYk), exactly as the old strip tap. ---------- */
const relP=q=>q.k==="me"?S:q.k==="emp"?S.emp:q.k==="th"?{kind:"th"}:q.p;
function relRing(w,g){const C=relCands();const L=w==="x"?C.all:C.Ys;const cur=w==="x"?C.X:C.Y;const GR=["Ta","Chí tôn","Phi tần","Nam nhân","Cung nhân"].filter(n=>L.some(x=>x.g===n));
 g=g||cur.g;const items=L.filter(x=>x.g===g);const at=Math.max(0,items.findIndex(x=>String(x.k)===String(cur.k)));
 return open({people:items.map(x=>relP(x.q)),title:w==="x"?"Xem quan hệ của":"Quan hệ với",at,tabs:GR.length>1?GR.map(n=>({label:n,on:n===g,fn:()=>relRing(w,n)})):null,
  acts:x=>[{id:"go",n:"Chọn",word:"",ton:""}],onPick:i=>{const q=items[i];if(!q)return;if(w==="x")relSel=q.k;else window.relSetY(q.k);try{renderPanel()}catch(e){console.error(e)}}})}
if(typeof relPopOpen==="function"){const rp0=relPopOpen;relPopOpen=window.relPopOpen=function(w){try{if(KIT_RING.wire&&!window.__bot&&!window.__kringOff&&typeof relCands==="function"){relRing(w);return null}}catch(e){console.error("kitRing rel",e)}return rp0.apply(this,arguments)}}
kitRing.relRing=relRing;
/* ---------- §104.2 wiring F: the map / stage group buttons «Cung nhân» (Đồng liêu) · «Chí tôn» (kitGroupBtns, rail kgf-*, the #kgfdrop list, #kshR court rows) → vòng người of
   that group; «Xem» = the old row tap (court → kitCourtOpen(k); household → the Cung nhân tab at that person). ---------- */
function grpBtnRing(k,at){try{let P=[],go=[],ks=[];
 if(k==="ct"){(typeof kitCourtRows==="function"?kitCourtRows():[]).forEach(r=>{const p=r.k==="emp"?S.emp:r.k==="th"?{kind:"th"}:r.ref||r.p||r.o;if(!p)return;P.push(p);ks.push(r.k);go.push(()=>kitCourtOpen(r.k))})}
 else{const tabGo=j=>()=>{if(typeof PG==="object")PG.staff=j;try{if(typeof kgfShut==="function")kgfShut()}catch(e){}const b=document.querySelector('[data-tab="staff"]');if(b)b.click()};
  if(typeof isSrv==="function"&&isSrv())srvColleagues().forEach((s,j)=>{P.push(s);go.push(tabGo(j))});
  else{let j=0;if(S.maid){P.push(S.maid);go.push(tabGo(j++))}(S.staff||[]).forEach(s=>{if(!s||s===S.maid)return;P.push(s);go.push(tabGo(j++))})}}
 if(P.length<1)return false;let title=k;try{title=typeof kgfLab==="function"?kgfLab(k):k}catch(e){}
 const a0=typeof at==="string"?Math.max(0,ks.indexOf(at)):Math.max(0,Math.min(P.length-1,at|0));open({people:P,title,at:a0,acts:()=>[{id:"see",n:"Xem",pic:ringActPic("Xem"),word:"",ton:""}],onPick:i=>{try{go[i]&&go[i]()}catch(e){console.error(e)}}});return true}catch(e){console.error("kitRing grp",e);return false}}
document.addEventListener("click",e=>{try{if(!KIT_RING.wire||window.__bot||window.__kringOff||CUR)return;const b=e.target.closest&&e.target.closest('.kgfbtns [data-kgf],#krail [data-rail^="kgf-"],#kshR [data-kc],#kshR [data-k3go],#kgfdrop [data-k3go]');if(!b)return;
 const k=b.dataset.kgf||(b.dataset.rail?b.dataset.rail.slice(4,6):b.dataset.kc?"ct":"cn");if(k!=="cn"&&k!=="ct")return;
 if(b.dataset.kc&&!b.closest("#kshR"))return;
 if(grpBtnRing(k,b.dataset.kc||+(b.dataset.k3pi||0))){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();window.__kgfOpen=null}}catch(x){}},true);
kitRing.grpBtnRing=grpBtnRing;
/* ---------- §104.2 wiring G: Phe phái «Lập phe cùng …» / «Mời …» face buttons (facHTML) → ONE kit button «… · N ›» + vòng người of those consorts; the plaque = the old button
   (its words, its cost line, locked = its why); pick = the old button's own click (kept in the panel, hidden). ---------- */
/* KIT §104.2d (KIT REQUEST #11, KK59): a ring OPENER («Lập phe cùng ai · N ›», «Các phe · N ›», the strip «‹ tên · i/n ›») is a door to a list, not an act: it carries data-knav="ring";
   law 3 (Được–Mất) is checked on the plaques the ring drops (each the old button's own Tốn / Được / Mất rows), never on the opener — act scans (gain-empty …) skip [data-knav]. */
const FA_KINDS=["lap","moi","gach","hop"],FA_LAB={lap:["Lập phe cùng ai","Lập phe"],moi:["Mời người vào phe","Mời vào phe"],gach:["Gạch tên ai","Gạch tên"],hop:["Hợp mưu hạ ai","Hợp mưu"]};
/* KIT §104.2e PLAQUE PICTURE (KK63, queue (3), MAIN 181 22:40Z: img/ACTS.json on the CDN): a ring plaque shows its OWN act picture (kitActArt → img/act-<key>.webp:
   «Lập phe» act-ket-minh-h · «Mời vào phe» act-nhan-loi-vao-phe-h · «Gạch tên» act-gach-ten-h · «Hợp mưu» act-hop-muu · «Xem» act-xem-nguoi-h); only a real act picture —
   a category fallback (act-cat-*) or no key keeps the §59 pending box. */
function ringActPic(n){try{const a=typeof kitActArt==="function"&&kitActArt(n);return a&&a.src&&!/\/act-cat-/.test(a.src)?a.src:""}catch(e){return""}}
kitRing.actPic=ringActPic;
if(typeof facHTML==="function"){const fh0=facHTML;facHTML=window.facHTML=function(){let h=fh0.apply(this,arguments);try{if(!KIT_RING.wire||window.__bot||window.__kringOff)return h;
 FA_KINDS.forEach(kind=>{const re=new RegExp(`<button data-fa="${kind}" data-fv="([^"]+)"[^>]*>[\\s\\S]*?<\\/button>`,"g");const n=(h.match(re)||[]).length;if(!n)return;let first=true;
  h=h.replace(re,(m)=>{const hid=m.replace("<button ","<button hidden data-kring-fh ");if(first){first=false;return `<button type="button" class="kbtn" data-knav="ring" data-kring-fa="${kind}">${FA_LAB[kind][0]} · ${n} ›</button>`+hid}return hid})});
 /* §104.3 the faction rows' own acts (Xin vào phe · Ly gián) → ONE kit button «Các phe · N ›» = vòng nhóm of the factions (a slot = the faction's people, her own figure never) */
 const fre=/<button data-fa="(xin|ly)" data-ff="([^"]+)"[^>]*>[\s\S]*?<\/button>/g;const ff=new Set([...h.matchAll(fre)].map(m=>m[2]));
 if(ff.size){h=h.replace(fre,m=>m.replace("<button ","<button hidden data-kring-fh "));h=h.replace(/(<\/div>)/,`$1<div class="rbtn"><button type="button" class="kbtn" data-knav="ring" data-kring-fac="1">Các phe · ${ff.size} ›</button></div>`)}
 }catch(e){console.error("kitRing fac",e)}return h};
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kring-fa]");if(!b)return;e.preventDefault();e.stopPropagation();const kind=b.dataset.kringFa;
  const B=[...document.querySelectorAll(`button[data-kring-fh][data-fa="${kind}"]`)];const P=B.map(x=>{const id=x.dataset.fv;return(rivals||[]).find(v=>String(v.id)===String(id))});
  const ok=B.filter((x,i)=>P[i]);const PP=P.filter(Boolean);if(!PP.length)return;
  open({people:PP,title:txt(b).replace(/ · \d+ ›$/,""),at:0,acts:x=>{const o=ok[x.i];const sm=txt(o.querySelector("small"));return [{id:"go",n:FA_LAB[kind][1],pic:ringActPic(FA_LAB[kind][1]),word:"",ton:"",info:sm,off:!!o.disabled,why:o.disabled?"Hết khắc buổi này":""}]},
   onPick:i=>{const o=ok[i];if(o&&!o.disabled)o.click()}})},true);
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kring-fac]");if(!b)return;e.preventDefault();e.stopPropagation();
  const F=((S&&S.facs)||[]).filter(f=>document.querySelector(`button[data-kring-fh][data-ff="${f.id}"]`));if(!F.length)return;
  open({title:"Các phe",groups:F.map(f=>{const l=facLeader(f);return{name:f.name,line:"đứng đầu: "+(l===S?"ngươi":l.name),people:facMembers(f).filter(m=>m&&m!==S)}}),at:0,
   gacts:gi=>[...document.querySelectorAll(`button[data-kring-fh][data-ff="${F[gi].id}"]`)].map(o=>({id:o.dataset.fa,n:txt(o.firstChild),word:"",ton:"",info:txt(o.querySelector("small")),off:!!o.disabled,why:o.disabled?"Chưa làm được lúc này":""})),
   onGroupPick:(gi,id)=>{const o=document.querySelector(`button[data-kring-fh][data-ff="${F[gi].id}"][data-fa="${id}"]`);if(o&&!o.disabled)o.click()}})},true)}
}catch(e){console.error("jkring",e)}})();
