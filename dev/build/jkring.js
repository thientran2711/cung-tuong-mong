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
 rx:{kv1:.36,kv2:.33},ry:{kv1:.10,kv2:.11},floor:.955,back:.48/* scale of the farthest slot */,dimK:1.25,
 grpFh:.84/* group slot member height vs a person slot */,grpGap:.22/* member spacing / member height (members overlap: one cluster) */,grpW:{kv1:.56,kv2:.50}/* focused group max width / layer width */,
 turnMs:300,focusMs:560,arrow:{kv1:42,kv2:46}};
const kv=()=>document.documentElement.classList.contains("kv2")?"kv2":"kv1";
const calm=()=>{try{return typeof kscnCalm==="function"&&kscnCalm()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const E="cubic-bezier(.2,.75,.25,1)";
/* §104.1 KRING_MATH — the ONE ring maths of the whole ring kit (vòng người · vòng nhóm · vòng bảo vật): same semantics as MOTION-BUILD's KRI_MATH (jkring-item.js reads
   window.KRING_MATH when present). N > seats: one seat spacing (2π/seats), only the seats around the front show (a scrolling ring of many). */
const KRING_MATH=window.KRING_MATH=window.KRING_MATH||{seats:12,
 slot(i,rot,N){let a=((i-rot)%N+N)%N;if(a>N/2)a-=N;const n=Math.max(3,Math.min(N,this.seats)),th=a*2*Math.PI/n,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;return{a,c,s,k,hide:Math.abs(a)>n/2-.5}},
 front(rot,N){return((Math.round(rot)%N)+N)%N},
 short(i,rot,N){let d=((i-rot)%N+N)%N;if(d>N/2)d-=N;return d},
 decay:.93,snapMs:200};
let CUR=null;
/* ---------- CSS (kit part; tokens from the kit: --kpk-* wood, kscn-tag) ---------- */
function css(){if(document.getElementById("k-ring"))return;const s=document.createElement("style");s.id="k-ring";s.textContent=`
.kscn.kring .kscn-bg{filter:none!important}.kscn.kring .kscn-veil{opacity:0!important}
.kring-band{position:absolute;inset:0;z-index:5;touch-action:none}
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
function tagEl(p,cls){const t=document.createElement("div");t.className=cls;try{t.innerHTML=kitNameTagBox(p.ref||p,{})}catch(e){t.innerHTML=`<span class="kscn-tag">${esc(p.name)}</span>`}return t}
/* ---------- build a slot ---------- */
function buildSlot(R,g,fh0){const s=document.createElement("div");s.className="kring-s";const M=g.members;
 if(M.length===1){const x=M[0];const d=memberEl(x,fh0);d.style.left="0px";s.appendChild(d);const W=x.fw;s.style.width=W+"px";s.style.height=fh0+"px";
  s.__cx=(x.f.ob.l+x.f.ob.r)/2*W;s.__feet=x.f.ob.b*fh0;s.__top=x.f.ob.t*fh0;x.dx=0;
  const t=tagEl(x.p,"kring-tg");t.style.top=(s.__feet+2)+"px";t.style.left=s.__cx+"px";s.appendChild(t)}
 else{/* the lead in front, the others beside / behind her by turns (smaller, a little higher = depth on the floor) */
  const fh=fh0*KIT_RING.grpFh;const els=[];let minL=0,maxR=0;M.forEach((x,k)=>{const side=k===0?0:(k%2?-1:1)*Math.ceil(k/2),dep=k===0?1:.9;const h=fh*dep;const d=memberEl(x,h);
   const pc=(x.f.ob.l+x.f.ob.r)/2*x.fw;const cx=side*fh*KIT_RING.grpGap;x.cx=cx;x.left=cx-pc;x.lift=k===0?0:fh*.03;d.style.zIndex=k===0?"3":"2";
   minL=Math.min(minL,x.left+x.f.ob.l*x.fw);maxR=Math.max(maxR,x.left+x.f.ob.r*x.fw);els.push(d)});
  const W=maxR-minL;M.forEach((x,k)=>{x.left-=minL;x.el.style.left=x.left+"px";x.el.style.transform=x.lift?`translateY(${-x.lift}px)`:"";s.appendChild(x.el)});
  const lead=M[0];s.style.width=W+"px";s.style.height=fh0+"px";M.forEach(x=>{x.el.style.top=(fh0-x.fh)+"px";x.el.style.bottom="auto"});
  s.__cx=W/2;s.__feet=fh0-fh*(1-lead.f.ob.b);s.__top=Math.min(...M.map(x=>fh0-x.fh+x.f.ob.t*x.fh-(x.lift||0)));
  const a=document.createElement("div");a.className="kring-act";a.innerHTML=`<span class="kscn-tag">${esc(g.line)}</span>`;a.style.left=(W/2)+"px";a.style.top=Math.max(-30,s.__top-30)+"px";s.appendChild(a);
  const t=document.createElement("div");t.className="kring-tg";t.innerHTML=`<span class="kscn-tag">${M.map(x=>esc(typeof kitUnkName==="function"?kitUnkName(x.p.ref||x.p):x.p.name)).join(" · ")}</span>`;t.style.top=(s.__feet+2)+"px";t.style.left=(W/2)+"px";s.appendChild(t)}
 /* the warm light behind the slot in front (static gradient, opacity only) */const h=document.createElement("div");h.className="kring-halo";const W0=parseFloat(s.style.width);h.style.cssText=`left:${-W0*.25}px;top:${s.__top-fh0*.04}px;width:${W0*1.5}px;height:${(s.__feet-s.__top)*1.08}px`;s.insertBefore(h,s.firstChild);s.__halo=h;
 s.__g=g;return s}
/* ---------- ring maths (the vòng bảo vật maths: angle per slot, depth scale, dim, z) ---------- */
function geo(R){const m=kv(),K=KIT_RING,L=R.L,w=L.g.w,H=L.g.H;return {w,H,cx:w/2,floor:H*K.floor,Rx:w*K.rx[m],Ry:H*K.ry[m]}}
function place(R){const N=R.slots.length,g=geo(R);R.slots.forEach((s,i)=>{const q=KRING_MATH.slot(i,R.rot,N),a=q.a,c=q.c,sn=q.s,k=q.k;s.style.visibility=q.hide?"hidden":"";
  const sc0=1;const sc=KIT_RING.back+(1-KIT_RING.back)*Math.pow(k,1.4),x=g.cx+g.Rx*sn,y=g.floor-g.Ry*(1-c);
  s.style.transform=`translate(${(x-s.__cx).toFixed(1)}px,${(y-s.__feet).toFixed(1)}px) scale(${sc.toFixed(3)})`;s.style.zIndex=String(Math.round(100+c*50));
  const st=N>1?Math.abs(a):0,d=Math.min(1,st*KIT_RING.dimK);s.__halo&&(s.__halo.style.opacity=Math.max(0,1-st*1.6).toFixed(3));s.__g.members.forEach(x=>{x.dim.style.opacity=d.toFixed(3)});s.classList.toggle("kring-front",Math.abs(a)<.5);/* the name tag under the feet never leaves the layer: near the bottom edge it rides up over the lower legs */const tg=s.__tg||(s.__tg=s.querySelector(":scope>.kring-tg"));if(tg){const over=y+44-g.H;tg.style.transform=over>0?`translate(-50%,${(-over/sc).toFixed(1)}px)`:"translateX(-50%)"}s.__x=x;s.__y=y;s.__sc=sc})}
let raf=0;function loop(fn){cancelAnimationFrame(raf);let lt=performance.now();const f=now=>{const dt=Math.min(48,now-lt);lt=now;if(fn(dt)!==false)raf=requestAnimationFrame(f);else raf=0};raf=requestAnimationFrame(f)}
function stepPx(R){const g=geo(R);return Math.max(60,g.Rx*2*Math.PI/Math.max(3,R.slots.length)*.7)}
function tween(R,to,ms){const from=R.rot,t0=performance.now();if(calm())ms=1;return new Promise(res=>loop(()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);R.rot=from+(to-from)*e;place(R);if(k>=1){res();return false}}))}
function fling(R,v){R.v=v;if(calm())return snap(R);return new Promise(res=>loop(dt=>{R.rot+=R.v*dt;R.v*=Math.pow(KRING_MATH.decay,dt/16.67);place(R);if(Math.abs(R.v)<.0012){snap(R).then(res);return false}}))}
const snap=R=>tween(R,Math.round(R.rot),KRING_MATH.snapMs);
const front=R=>KRING_MATH.front(R.rot,R.slots.length);
/* ---------- open ---------- */
async function open(o){o=o||{};close(true);css();const m=kv();
 const ppl=(o.people||(typeof curPeople==="function"?curPeople():[])).map((p,i)=>({p,i:o.idx?o.idx[i]:i})).filter(x=>x.p&&(o.acts||ringable(x.p)));if(!ppl.length)return null;
 const figs=await Promise.all(ppl.map(x=>loadFig(x.p)));const list=ppl.filter((x,k)=>{x.f=figs[k];return !!x.f});if(!list.length)return null;
 const Sc=kitScene.open({bg:o.bg});const L=Sc.L;L.classList.add("kring");document.body.classList.add("kring-on");L.style.opacity="0";
 const R={Sc,L,list,rot:0,v:0,mode:o.mode||"person",slots:[],sel:-1,busy:0,pk:null,o};CUR=R;
 const band=document.createElement("div");band.className="kring-band";L.appendChild(band);R.band=band;
 /* top: kit tabs «Từng người · Từng nhóm» + ✕ */
 const tabs=document.createElement("div");tabs.className="pctabs kring-tabs";tabs.innerHTML=[["person","Từng người"],["group","Từng nhóm"]].map(([k,n])=>`<button type="button" class="pct" data-kr="${k}">${n}</button>`).join("");
 tabs.addEventListener("click",e=>{const b=e.target.closest("[data-kr]");if(b&&!R.busy)setMode(R,b.dataset.kr)});L.appendChild(tabs);R.tabs=tabs;
 /* a PICKER ring (o.acts: the caller's own choices): its kit title on top; the caller's own tabs (o.tabs = [{label,on,fn}]) replace «Từng người · Từng nhóm» */
 if(o.acts){if(o.tabs&&o.tabs.length){tabs.innerHTML=o.tabs.map((t,k)=>`<button type="button" class="pct${t.on?" on":""}" data-kt="${k}">${esc(t.label)}</button>`).join("");tabs.onclick=e=>{const b=e.target.closest("[data-kt]");if(b&&!R.busy){const t=o.tabs[+b.dataset.kt];close(true);t.fn()}}}else tabs.style.display="none";
  if(o.title){const tt=document.createElement("div");tt.className="kring-tt";tt.innerHTML=`<span class="kptitle">${esc(o.title)}</span>`+(o.sub?`<small>${esc(o.sub)}</small>`:"");L.appendChild(tt);if(o.tabs&&o.tabs.length)tt.style.top="52px"}}
 const xw=document.createElement("div");xw.className="kring-x";xw.innerHTML=typeof kitXHTML==="function"?kitXHTML("","Lui"):`<button type="button" class="kit-x" aria-label="Lui">✕</button>`;xw.firstElementChild.addEventListener("click",e=>{e.stopPropagation();if(R.busy)return;if(R.sel>=0)return back(R);close();if(o.onClose)try{o.onClose()}catch(x){console.error(x)}});L.appendChild(xw);R.x=xw;
 const mk=(txt,fn)=>{const b=document.createElement("button");b.type="button";b.className="kbtn kring-ui kring-ar";b.textContent=txt;const a=KIT_RING.arrow[m];b.style.cssText+=`width:${a}px;min-height:${a}px;padding:0;font-size:1.4rem`;b.addEventListener("click",e=>{e.stopPropagation();if(!R.busy&&R.sel<0)turnBy(R,txt==="‹"?-1:1)});L.appendChild(b);return b};
 R.arL=mk("‹");R.arR=mk("›");
 /* drag / swipe with inertia; a tap: front slot = focus, a side slot = turn to it */
 let x0=0,last=0,lt=0,drag=0,moved=0;band.addEventListener("pointerdown",e=>{if(R.busy||R.sel>=0)return;drag=1;moved=0;x0=last=e.clientX;lt=performance.now();R.v=0;cancelAnimationFrame(raf);try{band.setPointerCapture(e.pointerId)}catch(_){}});
 band.addEventListener("pointermove",e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;if(Math.abs(e.clientX-x0)>6)moved=1;if(!moved)return;R.rot-=dx/stepPx(R);R.v=-(dx/stepPx(R))/Math.max(1,now-lt);last=e.clientX;lt=now;place(R)});
 const up=e=>{if(!drag)return;drag=0;if(!moved){tapAt(R,e.clientX,e.clientY);return}fling(R,R.v)};band.addEventListener("pointerup",up);band.addEventListener("pointercancel",up);
 await build(R);await new Promise(r=>requestAnimationFrame(r));
 if(calm())L.style.opacity="1";else{L.animate([{opacity:0},{opacity:1}],{duration:320,easing:"ease-out",fill:"both"}).onfinish=()=>{L.style.opacity="1"};
  R.slots.forEach((s,i)=>{const fin=s.style.transform;s.animate([{transform:`translate(${geo(R).cx-s.__cx}px,${geo(R).floor-geo(R).Ry*2-s.__feet}px) scale(.3)`,opacity:0},{transform:fin,opacity:1}],{duration:520,delay:120+i*50,easing:"cubic-bezier(.2,1.1,.4,1)"})})}
 return R}
async function build(R){R.slots.forEach(s=>s.remove());R.slots=[];const m=kv(),g0=R.L.g,fh0=Math.round(g0.H*KIT_RING.fh[m]);
 const groups=R.mode==="group"?groupsOf(R.list):R.list.map(x=>({members:[x],line:""}));
 R.groups=groups;R.slots=groups.map(g=>{const s=buildSlot(R,g,fh0);R.L.appendChild(s);return s});R.rot=0;
 if(R.o.at!=null){const k=R.list.findIndex(x=>x.i===R.o.at);if(k>=0)R.rot=k}place(R);
 if(!R.o.acts)R.tabs.querySelectorAll(".pct").forEach(b=>b.classList.toggle("on",b.dataset.kr===R.mode));
 const g=geo(R),a=KIT_RING.arrow[m],fy=g.floor-g.H*KIT_RING.fh[m]*.45;R.arL.style.left="6px";R.arR.style.left=(g.w-a-6)+"px";R.arL.style.top=R.arR.style.top=fy+"px";
 [R.arL,R.arR].forEach(b=>b.style.visibility=R.slots.length>1?"":"hidden")}
async function setMode(R,m){if(m===R.mode)return;R.busy=1;try{if(R.sel>=0)await back(R,true);const out=R.slots.map(s=>s.animate([{opacity:1},{opacity:0}],{duration:calm()?1:180,fill:"both"}).finished);await Promise.all(out);R.mode=m;await build(R);
 if(!calm())R.slots.forEach((s,i)=>s.animate([{opacity:0,transform:s.style.transform+" scale(.85)"},{opacity:1,transform:s.style.transform}],{duration:300,delay:i*40,easing:E}))}finally{R.busy=0}}
function slotAt(R,x,y){const hit=document.elementsFromPoint(x,y).map(e=>e.closest&&e.closest(".kring-s")).filter(Boolean);if(hit.length)return hit.sort((a,b)=>+b.style.zIndex-+a.style.zIndex)[0];
 /* slots have no pointer events: hit-test the painted boxes in z order */let best=null;R.slots.forEach(s=>{const r=s.getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom&&(!best||+s.style.zIndex>+best.style.zIndex))best=s});return best}
function tapAt(R,x,y){const s=slotAt(R,x,y);if(!s)return;const i=R.slots.indexOf(s);if(i===front(R)&&Math.abs(R.rot-Math.round(R.rot))<.02)return focus(R);turnTo(R,i)}
function turnBy(R,d){return tween(R,Math.round(R.rot)+d,KIT_RING.turnMs)}
function turnTo(R,i){const N=R.slots.length;const d=KRING_MATH.short(i,R.rot,N);return tween(R,R.rot+d,Math.min(700,KIT_RING.turnMs+Math.abs(d)*90))}
/* ---------- focus: the front slot grows to a big full body, slides LEFT; plaques drop on the RIGHT ---------- */
function anim(el,to,ms){const from=el.style.transform;el.style.transform=to;if(calm()||!from)return Promise.resolve();return el.animate([{transform:from},{transform:to}],{duration:ms,easing:E}).finished.catch(()=>{})}
async function focus(R){if(R.busy||R.sel>=0)return;R.busy=1;try{const i=front(R);R.sel=i;const s=R.slots[i],m=kv(),g=geo(R),K=KIT_RING;
 R.slots.forEach((o,k)=>{if(k===i)return;o.animate([{opacity:1},{opacity:0}],{duration:calm()?1:260,fill:"both"})});
 [R.arL,R.arR,R.tabs].forEach(b=>b.animate([{opacity:1},{opacity:0}],{duration:calm()?1:200,fill:"both"}));
 s.__g.members.forEach(x=>{x.dim.style.opacity="0"});s.classList.remove("kring-front");
 const fwS=s.offsetWidth,grp=s.__g.members.length>1;let sc=(g.H*K.fhF[m])/(s.__feet-s.__top);if(grp)sc=Math.min(sc,g.w*K.grpW[m]/fwS);const cx=g.w*(grp?K.fx[m]+.03:K.fx[m]),feet=g.H*.995;
 R.fT=`translate(${(cx-s.__cx).toFixed(1)}px,${(feet-s.__feet).toFixed(1)}px) scale(${sc.toFixed(3)})`;R.fSc=sc;R.fCx=cx;R.fFeet=feet;s.style.zIndex="200";
 await anim(s,R.fT,K.focusMs);
 if(grp)return groupPick(R);return personPick(R,s.__g.members[0])}finally{R.busy=0}}
/* the painted box of one member of the focused slot, in layer px */
function boxOf(R,x){const s=R.slots[R.sel],sc=R.fSc,ox=R.fCx-s.__cx*sc,oy=R.fFeet-s.__feet*sc;const left=(x.left||0),top=x.el.offsetTop-(x.lift||0);
 return {x:ox+(left+x.f.ob.l*x.fw)*sc,y:oy+(top+x.f.ob.t*x.fh)*sc,w:(x.f.ob.r-x.f.ob.l)*x.fw*sc,h:(x.f.ob.b-x.f.ob.t)*x.fh*sc}}
function closePk(R){if(R.pk){try{R.pk.destroy()}catch(e){}R.pk=null}if(R.ftg){R.ftg.remove();R.ftg=null}}
function focusTag(R,x){if(R.ftg)R.ftg.remove();const b=boxOf(R,x);const t=tagEl(x.p,"kring-ftg");t.style.left=(b.x+b.w/2)+"px";t.style.top=Math.min(R.L.g.H-30,b.y+b.h+2)+"px";
 /* the big figure's feet reach the floor: the tag sits over the lower legs, never over a face */if(b.y+b.h+30>R.L.g.H)t.style.top=(b.y+b.h*.86)+"px";R.L.appendChild(t);R.ftg=t;if(!calm())t.animate([{opacity:0},{opacity:1}],{duration:220,fill:"both"})}
function acts(R,x){let G=[];try{G=dfData(x.i)||[]}catch(e){}return G.filter(g=>g.acts&&g.acts.length).map(g=>({k:g.k,n:g.n,acts:g.acts}))}
/* the person she talks to = the game's OWN focus-view flow (jdfv: DF.p / DF.F, dfTap → dfRun → dfAfter; an event frame about this person (Q, e.g. «Trò chuyện» topics)
   plays in the same focus: its lines in the kit speech bubble, its answers as thẻ gỗ on the right). The ring is that view's FIGURE + PICKER (adapter F below);
   the old kitFocus figure view is not opened while the ring holds the person (ONE figure on the scene). On-figure mini-games: F.play → null = the plain result (game layer later, KK44). */
function personPick(R,x,G){closePk(R);R.who=x;focusTag(R,x);
 if(R.o.acts){let A=[];try{A=R.o.acts(x)||[]}catch(e){console.error("kitRing acts",e)}const others=R.slots[R.sel].__g.members.filter(y=>y!==x).map(y=>boxOf(R,y));
  R.pk=kitPick.open(Object.assign({host:R.L,anchor:boxOf(R,x),avoid:others,side:"r",dismiss:false},A.length&&A[0].acts?{groups:A}:{acts:A},{onPick:id=>{const fn=R.o.onPick;close(true);if(fn)try{fn(x.i,id,x.p)}catch(e){console.error("kitRing pick",e)}}}));return R.pk}
 try{if(typeof DF==="object"&&DF){if(!R.tk||DF.F!==R.F){const tk={};R.tk=tk;DF.tk=tk}DF.p=x.p;DF.i=x.i;popIdx=x.i;DF.F=R.F=adapter(R,x)}}catch(e){console.error("kitRing DF",e)}
 G=G||acts(R,x);const others=R.slots[R.sel].__g.members.filter(y=>y!==x).map(y=>boxOf(R,y));
 if(!G.length){try{kitResultCard({title:x.p.name,ok:true,rows:[{k:"note",label:"",items:["Lúc này không có việc gì để làm với người này."]}]})}catch(e){}return}
 R.pk=kitPick.open({host:R.L,anchor:boxOf(R,x),avoid:others,side:"r",groups:G.map(g=>({k:g.k,n:g.n,acts:g.acts})),dismiss:false,onPick:(id,a)=>runAct(R,x,id,a)});return R.pk}
function showQ(){try{if(typeof Q!=="undefined"&&Q.length&&document.getElementById("modal").hidden){if(typeof render==="function")render();if(Q.length&&document.getElementById("modal").hidden&&typeof showModal==="function")showModal()}}catch(e){console.error("kitRing frame",e)}}
async function runAct(R,x,id,a){closePk(R);R.last=a&&a.n;try{if(typeof dfTap==="function"&&DF.F===R.F)dfTap(id);else dfRun(x.i,id)}catch(e){console.error("kitRing act",e)}
 /* an event frame the act queued (Q): show it now (the place stage under the ring would have shown it on its next render) */await wait(60);showQ();
 const again=()=>{if(CUR!==R||R.sel<0||R.who!==x)return;if(R.saying||R.pk)return;if(typeof Q!=="undefined"&&Q.length||!document.getElementById("modal").hidden){showQ();setTimeout(again,400);return}personPick(R,x)};setTimeout(again,700)}
/* the light speech bubble beside the big figure (kit speech look of §102.2 .ksay: soft paper, thin gold edge; no panel) */
function sayBox(R,x){let b=R.say;if(!b){b=document.createElement("div");b.className="kring-say";R.L.appendChild(b);R.say=b}const m=kv(),B=boxOf(R,x),W=R.L.g.w,H=R.L.g.H;
 const left=Math.min(W-12-Math.min(W*.46,460),B.x+B.w*.72),w=Math.min(W*(m==="kv2"?.40:.46),460);b.style.cssText=`left:${Math.max(8,left)}px;top:${Math.round(H*(m==="kv2"?.12:.10))}px;width:${w}px`;return b}
function adapter(R,x){const F={get el(){return R.L},get figEl(){return x.el&&x.el.querySelector("img")},figRect(){const b=boxOf(R,x),r=R.L.getBoundingClientRect();return new DOMRect(r.left+b.x,r.top+b.y,b.w,b.h)},
 playing:false,play(){return null},intro(){return false},endPlay(){},hud(){},
 say(lines,o){o=o||{};closePk(R);const L=(lines||[]).filter(l=>l&&l.text);if(!L.length){o.onDone&&o.onDone();return}R.saying=1;const b=sayBox(R,x);let k=0;
  const show=()=>{const l=L[k];b.innerHTML=`${l.who?`<b class="kring-sw">${esc(l.who)}</b>`:""}<span class="kring-st"></span><i class="kring-more">${k<L.length-1?"▸":"✓"}</i>`;const st=b.querySelector(".kring-st");
   R.tl=typeof kitTypeLine==="function"?kitTypeLine(st,l.text):(st.textContent=l.text,{done:true,finish(){}});if(!calm())b.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:200,fill:"both"})};
  const next=e=>{if(e){e.stopPropagation();e.preventDefault()}if(R.tl&&!R.tl.done){R.tl.finish();return}k++;if(k<L.length){show();return}R.L.removeEventListener("pointerup",next,true);R.saying=0;b.remove();R.say=null;o.onDone&&o.onDone()};
  R.L.addEventListener("pointerup",next,true);show()},
 choices(list,cb){closePk(R);R.pk=kitPick.open({host:R.L,anchor:boxOf(R,x),side:"r",acts:(list||[]).map(a=>({id:a.id,n:a.n,pic:a.pic||"",word:a.word||"",ton:a.ton||"",off:!!a.off,why:a.why||""})),dismiss:false,onPick:id=>{closePk(R);cb&&cb(id);setTimeout(()=>{showQ()},60)}})},
 setGroups(G){if(CUR!==R||R.sel<0||R.who!==x||R.saying)return;if(typeof Q!=="undefined"&&Q.length)return;personPick(R,x,(G||[]).filter(g=>g.acts&&g.acts.length))},
 react(o){try{const ln=o&&o.line;if(!ln)return;const b=sayBox(R,x);b.innerHTML=`<span class="kring-st">${esc(ln)}</span>`;if(!calm())b.animate([{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.85},{opacity:0}],{duration:2600,fill:"both"}).onfinish=()=>{if(R.say===b&&!R.saying){b.remove();R.say=null}}}catch(e){}},
 open(){},close(){if(CUR===R&&R.sel>=0)back(R)},destroy(){closePk(R)}};return F}
function dfLeave(R){try{if(typeof DF==="object"&&DF&&R.F&&DF.F===R.F){const tk=R.tk;R.F=null;R.tk=null;if(typeof dfClosed==="function")dfClosed(tk)}}catch(e){}if(R.say){R.say.remove();R.say=null}R.saying=0}
/* group focus: «Đứng nghe» + «Nói với …» per member */
function groupPick(R){closePk(R);dfLeave(R);R.who=null;const s=R.slots[R.sel],M=s.__g.members;const face=p=>{try{const f=kitFace(p.ref||p);return f&&f.src||""}catch(e){return""}};
 const nm=p=>{const q=p.ref||p;try{return typeof kitIsKnown==="function"&&!kitIsKnown(q)&&typeof kitUnkName==="function"?kitUnkName(q):(q.name||p.name)}catch(e){return p.name}};
 const list=[{id:"listen",n:"Đứng nghe",pic:typeof kitActArt==="function"&&(kitActArt("Nghe ngóng")||{}).src||"",word:"",ton:""},...M.map((x,k)=>({id:"m"+k,n:"Nói với "+nm(x.p),pic:face(x.p),word:"",ton:""}))];
 const a=M.map(x=>boxOf(R,x));const all={x:Math.min(...a.map(b=>b.x)),y:Math.min(...a.map(b=>b.y)),w:0,h:0};all.w=Math.max(...a.map(b=>b.x+b.w))-all.x;all.h=Math.max(...a.map(b=>b.y+b.h))-all.y;
 R.pk=kitPick.open({host:R.L,anchor:all,side:"r",acts:list,dismiss:false,onPick:id=>{if(id==="listen")return listen(R);stepOut(R,M[+id.slice(1)])}});return R.pk}
function listen(R){const s=R.slots[R.sel],M=s.__g.members;const nm=p=>{const q=p.ref||p;try{return typeof kitIsKnown==="function"&&!kitIsKnown(q)&&typeof kitUnkName==="function"?kitUnkName(q):(q.name||p.name)}catch(e){return p.name}};
 try{kitResultCard({title:s.__g.line,ok:true,rows:[{k:"note",label:"Nghe được",items:M.map(x=>`${esc(nm(x.p))}: ${esc(x.why||"đứng cùng nhóm")}`)}]})}catch(e){console.error(e)}/* a fresh picker (the chosen plaque goes back to the rail) */setTimeout(()=>{if(CUR===R&&R.sel>=0&&!R.who)groupPick(R)},250)}
/* a member STEPS OUT of the group toward her: she comes forward, the others dim and draw back */
async function stepOut(R,x){if(R.busy)return;R.busy=1;try{closePk(R);const s=R.slots[R.sel],M=s.__g.members;
 M.forEach(y=>{if(y===x)return;const t=(y.lift?`translateY(${-y.lift}px) `:"")+`translateX(${(y.cx<x.cx?-1:1)*y.fw*.12}px) scale(.94)`;anim(y.el,t,420);if(!calm())y.dim.animate([{opacity:0},{opacity:1}],{duration:420,fill:"forwards"}).onfinish=()=>{y.dim.style.opacity="1"};else y.dim.style.opacity="1"});
 x.el.style.zIndex="9";await anim(x.el,`scale(1.06)`,460);
 /* boxOf reads the member box unscaled: correct for the step-out scale */personPickScaled(R,x,1.06)}finally{R.busy=0}}
function personPickScaled(R,x,k){const fw=x.fw,fh=x.fh,l=x.left,lf=x.lift||0;x.left=l-(fw*(k-1))/2;x.lift=lf+fh*(k-1);x.fw=fw*k;x.fh=fh*k;try{personPick(R,x)}finally{x.left=l;x.fw=fw;x.fh=fh;x.lift=lf}}
/* back to the ring */
async function back(R,quick){closePk(R);dfLeave(R);const i=R.sel;if(i<0)return;R.busy=1;try{const s=R.slots[i];R.sel=-1;
 s.__g.members.forEach(y=>{y.el.getAnimations().forEach(a=>a.cancel());y.el.style.transform=y.lift?`translateY(${-y.lift}px)`:"";y.el.style.zIndex=""});
 R.slots.forEach(o=>o.getAnimations().forEach(a=>a.cancel()));[R.arL,R.arR,R.tabs].forEach(b=>b.getAnimations().forEach(a=>a.cancel()));
 const from=s.style.transform;place(R);const to=s.style.transform;if(!quick&&!calm()){s.animate([{transform:from},{transform:to}],{duration:420,easing:E});R.slots.forEach((o,k)=>{if(k!==i)o.animate([{opacity:0},{opacity:1}],{duration:320,delay:120,fill:"backwards"})})}}finally{R.busy=0}}
function close(now){const R=CUR;if(!R)return;CUR=null;document.body.classList.remove("kring-on");cancelAnimationFrame(raf);closePk(R);dfLeave(R);try{if(kitScene.cur&&kitScene.cur.L===R.L)kitScene.close(!!now);else R.L.remove()}catch(e){try{R.L.remove()}catch(_){}}}
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
  return `<div class="kring-pg"><button type="button" class="kbtn" data-kring-pg="${esc(key)}">‹ ${esc(nm)} · ${i+1}/${n} ›</button></div>`+mk(i)}}catch(e){console.error("kitRing pager",e)}return pg0.apply(this,arguments)};
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kring-pg]");if(!b)return;e.preventDefault();e.stopPropagation();stripRing(b.dataset.kringPg)},true)}
function cardBtns(host){const out=[];for(let n=host&&host.nextElementSibling;n;n=n.nextElementSibling)out.push(...n.querySelectorAll(".pcg button"));return out}
const actNm=b=>{const e=b.querySelector(".kan")||b.querySelector("b,strong")||b.firstElementChild||b;let t=txt(e);try{if(typeof kpActName==="function"&&b.querySelector(".kan"))t=kpActName(b.querySelector(".kan"))}catch(_){}return t.slice(0,40)};
function stripRing(key){const G=PGI[key];if(!G)return;const {items,mk}=G;
 /* her card's own act groups (.pcg[data-g]) = the plaque groups; «Xem» (show her card) leads the first group */
 const actsOf=j=>{const d=document.createElement("div");try{d.innerHTML=mk(j)}catch(e){}let k=0;const see={id:"see",n:"Xem",word:"",ton:""};
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
}catch(e){console.error("jkring",e)}})();
