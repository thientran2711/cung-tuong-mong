/* ================= jkpick: kitPick = the PERSON-INTERACTION PICKER (KIT §98; request «kitPick» + «wood skin» of RING-DESIGN-3; owner OD 24/11 ~15:30Z / ~15:40Z)
   «Thẻ treo» (KK53: the plaque face is a SILK CARD «thẻ lụa», the post / rail / cord stay wood): when she picks one person on a people stage, the acts she can do with that person hang as small PLAQUES on a signpost BESIDE the person
   (her free side), LOW (from about her waist down to her feet) — never over a face, never from the screen's top edge, never a frame / card / veil.
   Plaques drop from the rail and sway to rest (idle sway stays gentle); tap = the plaque lifts + its line shows (odds word, cost) + ONE «Chọn» button under it (owner 27/11 ~01:35Z); another plaque = switch, elsewhere = back.
   A plaque = the kit act button (kitFocus.btn = .kfoc-b: picture + name + «word · Tốn …»); the SILK-CARD SKIN is the kit look of that button inside .kpk (CSS tokens --kpk-*; --kpk-img is the unused painted-wood slot). ONE plaque size per mode (kv1/kv2), the same on every place.
   kitDim: ONE dim for the people who are NOT chosen: brightness + saturation on the FIGURE, OPAQUE (never opacity / see-through); the background is never touched.
     Static filter on a copy of the figure that cross-fades in (compositor opacity, no animated filter); numbers = BAL.kdim {b,s,ms}.
   API:  const P=kitPick.open({host,anchor:{x,y,w,h},side:"auto"|"l"|"r",groups:[{k,n,acts:[{id,n,pic,word,ton,off,why,info}]}] | acts:[…],group,onPick(id,act,P),onOff(act,P) (told after kitPick showed the reason, §98.1d),onClose(),dismiss:true});
         P.lift(id) · P.setGroup(k) · P.close() (animated) · P.destroy() · kitPick.rect(figEl,host) → anchor {x,y,w,h} in host px · kitPick.current() · kitPick.close()
         Event: the plaque button gets «kpkpick» (bubbles) on «Chọn» (or a 2nd keyboard/robot click), data-id = act id.   kitDim.on(figs,{keep}) · kitDim.off() · kitDim.state().
   PURE DISPLAY: no game logic, no numbers of its own.   Test: dev/test/kit-pick.js (Fold 755x1000 + iPad 1180x820). */
(function(){try{
const KIT_PLAQUE=window.KIT_PLAQUE=window.KIT_PLAQUE||{
 dropMs:700,stagger:80,swayS:[3.4,4.6],swayDeg:1.3,liftMs:200,liftDy:-8,liftScale:1.05,liftGap:3,closeMs:170,
 w:{kv1:152,kv2:200},h:{kv1:62,kv2:56},pic:{kv1:40,kv2:48},cord:{rail:18,gap:10,gapS:6},hS:50,gx:8,max:10,two:5,three:8,postIn:{kv1:10,kv2:16},postTop:{kv1:176,kv2:120},railAt:.40,railMin:.18,railLap:.34,slimW:140,minW:128,post:8,tabH:34,railPad:52,rows0:1,pen2:1500,penS:4000,obst:'#kshR,#kshL,.kshR,.kshL,.krail,.krailb,#kpname,.kchip,.tok .tag,.kscn-tag,#tomap',
 motion:null /* test hook: true = ignore reduced motion */};
const kv=()=>document.documentElement.classList.contains("kv2")?"kv2":"kv1";
const still=()=>{if(KIT_PLAQUE.motion===true)return false;try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)||document.documentElement.classList.contains("kf-still")}catch(e){}return false};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const DIM=()=>BAL.kdim;/* law 4: the numbers live in BAL.kdim only */
let CUR=null;
function btn(a,i){return typeof kitFocus!=="undefined"&&kitFocus.btn?kitFocus.btn(a,i):`<button type="button" class="kfoc-b" data-i="${i}" data-id="${esc(a.id)}"><span class="kfoc-t"><b>${esc(a.n)}</b></span></button>`}
/* anchor of a stage figure inside the host (host px) */
function rect(el,host){host=host||document.getElementById("stage")||document.body;const h=host.getBoundingClientRect(),r=el.getBoundingClientRect();return {x:r.left-h.left,y:r.top-h.top,w:r.width,h:r.height}}
/* the kit parts of the stage that a plaque band must never cover, as rects in host px (visible, not inside the picker, not a whole-stage container) */
function obstacles(host,raw){const K=KIT_PLAQUE,h=host.getBoundingClientRect(),out=[];try{host.querySelectorAll(K.obst).forEach(e=>{if(e.closest(".kpk")||e.hidden||getComputedStyle(e).visibility==="hidden")return;const r=e.getBoundingClientRect();if(r.width<6||r.height<6||r.width*r.height>.55*h.width*h.height)return;out.push({x:r.left-h.left,y:r.top-h.top,w:r.width,h:r.height+(!raw&&e.classList.contains("krail")?K.railPad:0),n:(e.id||e.className||"").toString().slice(0,30)+"|"+(e.textContent||"").trim().slice(0,12)})})}catch(e){}return out}
function open(o){if(CUR)CUR.destroy();o=o||{};const host=o.host||document.getElementById("stage")||document.body,m=kv(),K=KIT_PLAQUE;
 const P={o,host,m,anims:[],open:true,up:null};CUR=P;
 const gs=(o.groups&&o.groups.length?o.groups:[{k:"",n:"",acts:o.acts||[]}]).map(g=>Object.assign({},g,{acts:(g.acts||[]).map((a,i)=>[a,i]).sort((x,y)=>(x[0].off?1:0)-(y[0].off?1:0)||x[1]-y[1]).map(x=>x[0])}))/* KK56 (X12 / C6): the enabled plaques come first, the dimmed ones after, each keeping the caller's order */;P.groups=gs;P.group=o.group||gs[0].k;
 P.obst=obstacles(host);const el=P.el=document.createElement("div");el.className="kpk kpk-"+m+(still()?" kpk-still":"");el.setAttribute("role","group");el.setAttribute("aria-label","Chọn việc");host.appendChild(el);
 document.body.classList.add("kpk-open");/* §98.1: the stage HUD under the post yields while a board is open */build(P);/* KK53 (MAIN 170 note): a tap anywhere that is not a plaque / its «Chọn» / a tab puts the lifted plaque back (the board stays) */P.dropAway=e=>{if(!P.open||!P.up)return;const t=e.target;if(t&&t.closest&&t.closest(".kpk-n,.khconf,.kpk-tabs"))return;drop(P)};document.addEventListener("pointerdown",P.dropAway,true);if(o.dismiss!==false){P.away=e=>{if(!P.open||el.contains(e.target))return;P.close()};setTimeout(()=>{if(P.open)document.addEventListener("pointerdown",P.away,true)},0)}
 P.lift=id=>lift(P,id);P.setGroup=k=>{if(k===P.group)return;P.group=k;build(P,true)};P.close=()=>close(P);P.destroy=()=>destroy(P);
 return P}
/* KIT §98.1 PLAQUE POST (owner OD 26/11 ~21:41Z «để cái sự lựa chọn nào nó cũng tới từ một cái cột thôi … lúc thì nằm bên giữa, lúc thì nằm bên phải là sao?»; KK47, canon overwrite of the
   anchor-relative side/tier search and of the KK36 «Việc · 1/2» pages): EVERY choice board hangs from ONE post at ONE fixed place — the right side of the stage
   (x = host width − KIT_PLAQUE.postIn), the same top (KIT_PLAQUE.postTop px from the host top) on every board and device. 1–4 plaques = one column hanging LEFT of the post;
   5–7 = two columns, the second column added on the LEFT (the post never moves); 8+ (KIT_PLAQUE.three) = three columns, the third added on the LEFT again (owner 26/11 ~22:43Z:
   7 is not a hard cap, an event that needs more keeps them, all at once, no paging; KIT_PLAQUE.max 10 = the design size, never a cut: more = the compact tier).
   The figure / cluster yields to the post (kitPick.postBox before opening), never the reverse; the kit result card yields too (yieldCard). Group tabs (really different groups) sit in
   the fixed room above the rail. */
function postBox(host,n,hx){const K=KIT_PLAQUE,m=kv(),hr=(host||document.getElementById("stage")||document.body).getBoundingClientRect(),W=hr.width,H=hr.height,post=K.post;
 n=Math.max(1,n||1);const cols=n>=K.three?3:n>=K.two?2:1,xR=Math.round(W-K.postIn[m]-post-4),free=xR-8;
 const cw=Math.max(cols>1?K.minW:120,Math.min(K.w[m],cols>1?Math.floor((free-(cols-1)*K.gx)/cols):free)),bw=cols*cw+(cols-1)*K.gx,x0=xR-bw;
 const top=K.postTop[m],railY=top+K.tabH+8,rows=Math.ceil(n/cols);let hh=Math.max(K.h[m],hx||0),gap=K.cord.gap,comp=false;
 const tot=()=>K.cord.rail+rows*hh+(rows-1)*gap;if(railY+tot()>H-6&&!hx){hh=K.hS;gap=K.cord.gapS;comp=true}
 return {x0,x1:xR+post+4,top,railY,bottom:railY+tot(),cols,cw,bw,rows,h:hh,gap,comp,post,W,H}}
function geo(P){const K=KIT_PLAQUE,hr=P.host.getBoundingClientRect(),A=P.o.anchor||{x:hr.width*.3,y:hr.height*.2,w:hr.width*.2,h:hr.height*.6};
 const gr=P.groups.find(g=>g.k===P.group)||P.groups[0],all=gr.acts||[],acts=all,n=acts.length;
 if(all.length>K.max)console.warn("kitPick: "+all.length+" plaques > "+K.max+" — all shown (compact tier); KIT REQUEST if it leaves the stage");
 const B=postBox(P.host,n,P.hx);
 return {over:Math.max(0,B.bottom-(B.H-2)),lapped:false,comp:B.comp,A,acts,n,side:"l"/* the outer side of a plaque = away from the post (✓ / ✕, widen) */,cols:B.cols,cw:B.cw,h:B.h,gap:B.gap,rows:B.rows,
  railY:B.railY,bandW:B.bw,x0:B.x0,post:B.post,postTop:B.top,floor:B.H-2,tabsH:P.groups.length>1?K.tabH+8:0,W:B.W,H:B.H}}
function build(P,swap){const K=KIT_PLAQUE;const G=geo(P),el=P.el,m=P.m;P.G=G;P.up=null;
 const old=[...el.querySelectorAll(".kpk-n,.kpk-tabs")];old.forEach(x=>x.remove());
 const side=G.side,pw=G.post;
 /* signpost + rail (built once) */
 let post=el.querySelector(".kpk-post"),rail=el.querySelector(".kpk-rail");if(!post){post=document.createElement("i");post.className="kpk-post";rail=document.createElement("i");rail.className="kpk-rail";el.append(post,rail)}
 /* §98.1 the post stands at its ONE place (right of the band, fixed top) whatever the side value says */post.style.cssText=`left:${G.x0+G.bandW+4}px;top:${G.postTop}px;width:${pw}px;height:${Math.max(30,G.floor-G.postTop)}px`;
 rail.style.cssText=`left:${G.x0-4}px;top:${G.railY}px;width:${G.bandW+pw+8}px`;
 /* tabs (kit .pctabs/.pct) above the rail when more than one group */
 if(P.groups.length>1){const t=document.createElement("div");t.className="kpk-tabs pctabs";t.innerHTML=P.groups.map(g=>`<button type="button" class="pct${g.k===P.group?" on":""}" data-k="${esc(g.k)}">${esc(g.n||"Việc")}</button>`).join("");
  t.style.cssText=`left:${G.x0}px;top:0;width:${G.bandW}px;visibility:hidden`;t.__fit=1;t.addEventListener("click",e=>{const b=e.target.closest(".pct");if(!b)return;e.stopPropagation();P.setGroup(b.dataset.k)});el.appendChild(t);
  /* ONE row: a label that does not fit its tab steps down (kpk-ts1, kpk-ts2); never a second row, never cut */
  for(const c of ["kpk-ts1","kpk-ts2","kpk-ts3"]){if(![...t.querySelectorAll(".pct")].some(x=>x.scrollWidth>x.clientWidth+1||x.scrollHeight>x.clientHeight+1))break;t.classList.add(c)}
  const th=Math.ceil(t.getBoundingClientRect().height);t.style.top=Math.max(2,G.railY-th-8)+"px";t.style.visibility=""}
 G.acts.forEach((a,i)=>{const c=i%G.cols,r=(i/G.cols)|0,n=document.createElement("div");n.className="kpk-n";n.dataset.id=a.id;
  const kc=r?G.gap:K.cord.rail,x=G.x0+c*(G.cw+K.gx),y=G.railY+K.cord.rail+r*(G.h+G.gap);
  n.__x=x;n.__y=y;n.style.cssText=`left:${x}px;top:${y}px;width:${G.cw}px;height:${G.h}px;--kc:${kc}px;--kph:${G.h}px;--kpp:${K.pic[m]}px;--sd:${(K.swayDeg*(1-.12*r)).toFixed(2)}deg;--ss:${(K.swayS[0]+(K.swayS[1]-K.swayS[0])*((i*37%10)/10)).toFixed(2)}s;--sdl:${(-(i*.9+c*1.3)).toFixed(2)}s`;
  n.innerHTML=`<i class="kpk-cord"></i>`+btn(a,i);if(G.cw<K.slimW)n.classList.add("kpk-slim");/* narrow side: no picture, the whole name gets the room (OD:L177 names never cut) */const b=n.querySelector(".kfoc-b");b.classList.add("kpk-b");b.dataset.id=a.id;b.setAttribute("aria-pressed","false");
  b.addEventListener("click",ev=>{ev.stopPropagation();tap(P,a,n,b,ev)});el.appendChild(n);
  /* fall-in from the rail: transform + opacity only, staggered top → bottom, settles with a damped swing */
  if(!still()&&n.animate){const s=c%2?-1:1,dy=-(y-G.railY)+4;n.classList.add("kpk-drop");
   const an=n.animate([{opacity:0,transform:`translateY(${dy}px) rotate(${s*9}deg)`},{opacity:1,transform:`translateY(5px) rotate(${-s*6}deg)`,offset:.46},{transform:`translateY(-2px) rotate(${s*3.2}deg)`,offset:.68},{transform:`translateY(0) rotate(${-s*1.4}deg)`,offset:.84},{opacity:1,transform:"none"}],{duration:K.dropMs,delay:(swap?0:60)+i*K.stagger,easing:"cubic-bezier(.3,.7,.4,1)",fill:"backwards"});
   P.anims.push(an);an.onfinish=()=>{n.classList.remove("kpk-drop");const j=P.anims.indexOf(an);if(j>=0)P.anims.splice(j,1)}}
  });
 yieldCard();fitNames(P);try{document.fonts&&document.fonts.ready.then(()=>{if(P.open&&CUR===P)fitNames(P)})}catch(e){}/* a late web font changes the name widths */
 /* KK35: a later name pass (half-known names «Tể tướng ???», NHV tagsFix) rewrites a plaque NAME after this fit → fit again (only when the name texts change; own rebuilds ignored) */
 try{if(!P.__nmo&&window.MutationObserver){const sig=()=>[...P.el.querySelectorAll(".kpk-n .kfoc-t b")].map(b=>b.textContent).join("|");P.__nsig=sig();let q=0;
  P.__nmo=new MutationObserver(()=>{if(q||P.__fitR||!P.open)return;q=1;requestAnimationFrame(()=>{q=0;if(!P.open||P.__fitR)return;const s2=sig();if(s2===P.__nsig)return;P.__nsig=s2;fitNames(P);P.__nsig=sig()})});
  P.__nmo.observe(P.el,{subtree:true,childList:true,characterData:true})}else if(P.__nmo)P.__nsig=[...P.el.querySelectorAll(".kpk-n .kfoc-t b")].map(b=>b.textContent).join("|")}catch(e){}}
/* a closed plaque shows its name in 2 lines at most (owner 24/11, Fold): too long with the picture -> the whole band goes slim (no picture), still too long -> a slightly smaller name; the lifted plaque shows the whole name */
function fitNames(P){const el=P.el;el.classList.remove("kpk-slimall","kpk-tight","kpk-three","kpk-four");const B=()=>[...el.querySelectorAll(".kpk-n:not(.kpk-up) .kfoc-t b")],over=()=>B().some(b=>b.scrollHeight>b.clientHeight+1);
 if(!over())return;el.classList.add("kpk-slimall");if(!over())return;el.classList.add("kpk-tight");if(!over())return;el.classList.add("kpk-three");if(!over())return;
 /* KK35 (NHV area test 6 «Bàn tán về Hoàng hậu Dư Sơ Ảnh» cut at 3 lines): a name is NEVER cut (OD:L177) — the whole set of plaques grows to the height the longest
    name needs (ONE plaque height per picker, law 10) and is laid again; the 4th line shows (.kpk-four, no clamp) */
 el.classList.add("kpk-four");if(P.__fitR)return;/* the plaque box (.kpk-b) must hold the unclamped name: grow by what spills (only grows → never loops with a name pass) */
 const ex=Math.max(0,...[...el.querySelectorAll(".kpk-n:not(.kpk-up) .kfoc-b.kpk-b")].map(k=>{const b=k.querySelector(".kfoc-t b");return Math.max(k.scrollHeight-k.clientHeight,b?b.getBoundingClientRect().bottom-k.getBoundingClientRect().bottom+4:0)}));
 if(ex>1){P.hx=(P.G&&P.G.h||KIT_PLAQUE.h[P.m])+Math.ceil(ex)+2;P.__fitR=1;try{build(P,true)}finally{P.__fitR=0}}}
/* «CHỌN» CONFIRM v2 (owner OD 27/11 ~03:17Z, law 14 — replaces the ✓ / ✕ pair of 25/11, the KK51 strip pair and the KK53 v1 bar under the plaque): tap = the plaque lifts + its line shows, and a SMALL kit «Chọn» chip
   (.kbtn.khok.kpk-gob, size BAL.kpkgo) stands INSIDE its bottom-right corner (the plaque grows one chip-tall strip, .kpk-cf); the lifted plaque never covers the row below. A tap on the lifted plaque body again = Chọn too
   (two-tap: 1st lifts, 2nd chooses); another plaque = switch; a tap outside = the lift drops. onPick / «kpkpick» unchanged for the callers. */
/* KIT §98.1d THE REASON OF A CLOSED PLAQUE (K-RING-WHY, LIVE law 3 «no hidden loss / honest locks», law 9 kit first, law 11 the whole group): EVERY closed plaque (off + why),
   whatever host hangs the board (kitFocus, kitRing, kitStage answers / place card, kitPcard, any kitPick.open), shows its reason in the kit word pop-up (kpPop) when she taps the
   plaque or its «!» badge (.kfoc-i of kitFocus.btn) — kitPick does it itself, no host has to pass anything; the host's onOff(act,P) is only told afterwards. The «!» of an OPEN plaque
   shows its details (info, else the whole name + line) and never chooses. Hold-to-lift / two-tap choose of an open plaque are unchanged. */
function whyHTML(a){const sub=[a.word,a.ton?("Tốn "+a.ton):""].filter(Boolean).join(" · ");const h=(a.off?`<div class="kpopt">${esc(a.why||"Chưa làm được")}</div>`:"")+(a.info||"");return h||`<div class="kpopt">${esc(a.n)}</div>${sub?`<p>${esc(sub)}</p>`:""}`}
function whyShow(P,a,b){try{if(typeof kpPop==="function"&&b)kpPop(b,whyHTML(a),{})}catch(e){console.error("kitPick why",e)}}
function whyTap(P,a,n,b,ev){const bang=!!(ev&&ev.target&&ev.target.closest&&ev.target.closest(".kfoc-i"));if(!bang&&!a.off)return false;
 if(P.up!==n)lift(P,a.id);whyShow(P,a,b);if(a.off){try{P.o.onOff&&P.o.onOff(a,P)}catch(e){}}return true}
function pick(P,a,b){if(!P.open)return;if(a.off){whyShow(P,a,b);try{P.o.onOff&&P.o.onOff(a,P)}catch(e){}return}
 b.dispatchEvent(new CustomEvent("kpkpick",{bubbles:true,detail:{id:a.id,act:a}}));try{P.o.onPick&&P.o.onPick(a.id,a,P)}catch(e){}}
function tap(P,a,n,b,ev){if(!P.open)return;if(whyTap(P,a,n,b,ev))return;if(P.up===n){pick(P,a,b);return}
 lift(P,a.id)}
function conf(P){try{let c=P.el.querySelector(":scope>.khconf");const n=P.up;if(!n||!P.open){if(c)c.hidden=true;return}
 const a=(P.G&&P.G.acts||[]).find(x=>String(x.id)===n.dataset.id);if(!a||a.off){if(c)c.hidden=true;return}
 if(!c){c=document.createElement("div");c.className="khconf kpk-conf kpk-go";c.innerHTML=`<button type="button" class="kbtn khok kpk-gob" aria-label="Chọn">✓</button>`;
  c.addEventListener("click",e=>{e.stopPropagation();const k=e.target.closest("button");if(!k||!P.up)return;const u=P.up,aa=(P.G.acts||[]).find(x=>String(x.id)===u.dataset.id);if(aa)pick(P,aa,u.querySelector(".kpk-b"))});P.el.appendChild(c)}
 /* KK53 v2 (owner 03:17Z «nút chọn dưới thẻ nhìn kì quá, choáng chỗ»; MAIN 170 rec): NO bar under the plaque. A SMALL kit «Chọn» chip (BAL.kpkgo {w,h}) stands INSIDE the lifted plaque's bottom-right corner, in a strip the plaque grows at its bottom
    (.kpk-cf, one chip tall), so the lifted plaque grows by one line and never covers the row below / a neighbour. The chip sits where the odds line is NOT (strip under the text). Near the stage floor the plaque rises. */
 const K=KIT_PLAQUE,G=P.G,bw=BAL.kpkgo.w,bh=BAL.kpkgo.h;n.style.setProperty("--kpgw",bw+"px");n.style.setProperty("--kpgh",bh+"px");
 n.style.top=n.__y+"px";const hh=n.offsetHeight||G.h,wd=n.offsetWidth||G.cw,x0=parseFloat(n.style.left)||n.__x,k=K.liftScale,kc=parseFloat(n.style.getPropertyValue("--kc"))||12;
 const over=n.__y+K.liftDy+(hh+kc)*k-kc-(G.H-4);if(over>0)n.style.top=Math.round(n.__y-over)+"px";const y0=n.offsetTop;
 /* the LIFTED box (translateY liftDy + scale liftScale about its cord top), whatever moment of the lift animation this runs in */
 const oy=y0-kc,L={l:x0+wd/2-wd*k/2,t:oy+kc*k+K.liftDy,w:wd*k,h:hh*k};
 /* KK54 (MAIN nit «lifted plaque bottom edge touches the next row by a few px»; law 11 = every lift): the plaques BELOW the lifted one (same column span) make way: they slide down by the excess so the lifted bottom stays K.liftGap clear above the nearest one (clamped at the stage floor); drop() puts them back */
 try{unmake(P);const bl=[];let nt=1e9,fl=0;P.el.querySelectorAll(".kpk-n").forEach(o=>{if(o===n)return;const ox=o.offsetLeft,ow=o.offsetWidth,ot=o.offsetTop;if(ot<=y0+hh*.5||ox+ow<=L.l+1||ox>=L.l+L.w-1)return;bl.push(o);nt=Math.min(nt,ot);fl=Math.max(fl,ot+o.offsetHeight)});
  const ex=Math.ceil(L.t+L.h-(nt-K.liftGap)),room=Math.max(0,G.H-4-fl),dn=Math.min(ex,room);if(bl.length&&dn>0){bl.forEach(o=>{o.__mv=parseFloat(o.style.top)||o.offsetTop;o.style.top=(o.__mv+dn)+"px"});P.moved=bl}}catch(e){}
 const x=Math.round(L.l+L.w-bw*k-3*k),y=Math.round(L.t+2*k);/* OD 27/11 ~04:00Z: the small green ✓ stands in the lifted plaque's TOP-RIGHT corner */
 c.hidden=false;c.style.left=x+"px";c.style.top=y+"px";c.style.setProperty("--kpgw",bw+"px");c.style.setProperty("--kpgh",bh+"px");c.style.transform=`scale(${k})`;c.style.transformOrigin="0 0"}catch(e){console.error("kitPick conf",e)}}
function unmake(P){(P.moved||[]).forEach(o=>{if(o.__mv!=null){o.style.top=o.__mv+"px";o.__mv=null}});P.moved=null}
function drop(P){unmake(P);const K=KIT_PLAQUE,u=P.up;if(!u)return;P.up=null;u.classList.remove("kpk-up","kpk-wrap","kpk-sm","kpk-cf");if(u.__sl){u.classList.remove("kpk-slim");u.__sl=0}u.style.width=P.G.cw+"px";u.style.left=u.__x+"px";if(u.__y!=null)u.style.top=u.__y+"px";u.querySelector(".kpk-b").setAttribute("aria-pressed","false");
 if(!still()&&u.animate)u.animate([{transform:`translateY(${K.liftDy}px) scale(${K.liftScale})`},{transform:"none"}],{duration:K.liftMs-40,easing:"ease-out"});else u.style.transform="";P.anims.forEach(x=>{try{if(x.effect&&x.effect.target===u)x.cancel()}catch(e){}});conf(P)}
/* RING-DESIGN-5: a lifted plaque grows with its small line: «Vững · Tốn 1 khắc» stays on ONE line, so the plaque widens (towards the outer side, inside the stage) instead of growing a 4th text line */
function widen(P,n){const G=P.G,sm=n.querySelector(".kfoc-t small"),t=n.querySelector(".kfoc-t");n.classList.remove("kpk-wrap","kpk-sm");if(n.__sl){n.classList.remove("kpk-slim");n.__sl=0}n.style.width=G.cw+"px";n.style.left=n.__x+"px";if(!sm||!t)return;let need=Math.ceil(sm.scrollWidth-t.clientWidth);if(need<=0)return;
 /* KK51: the lifted plaque widens INSIDE the band box only (over its neighbour column — it is in front while up): never left of postBox().x0, never over the post;
    a small line still too long for the band steps down once, then (last resort) wraps */
 /* KK54 (MAIN 171 «anchor the lift inside its own column, never covers the other column's text»): the lifted plaque widens ONLY over free band space — never over a plaque of its own row (the neighbour column); with a neighbour on that side it keeps its own column and the small line wraps */
 const nb=[...P.el.querySelectorAll(".kpk-n")].filter(o=>o!==n&&Math.abs((o.__y!=null?o.__y:o.offsetTop)-(n.__y!=null?n.__y:n.offsetTop))<G.h*.6),hasL=nb.some(o=>o.__x<n.__x),hasR=nb.some(o=>o.__x>n.__x);
 const lr=hasL?0:Math.max(0,n.__x-G.x0),rr=hasR?0:Math.max(0,G.x0+G.bandW-(n.__x+G.cw)),addL=Math.min(need,lr),addR=Math.min(need-addL,rr),add=addL+addR;
 if(add>0){n.style.width=(G.cw+add)+"px";n.style.left=(n.__x-addL)+"px"}{const over=()=>sm.scrollWidth>t.clientWidth+1;/* KK54: the kit odds bar + costs need room: the lifted plaque first drops its picture, then steps the line down, then wraps it */if(over()&&!n.classList.contains("kpk-slim")){n.classList.add("kpk-slim");n.__sl=1}if(over())n.classList.add("kpk-sm");if(over())n.classList.add("kpk-wrap")}}
function lift(P,id){const K=KIT_PLAQUE,n=P.el.querySelector(`.kpk-n[data-id="${CSS.escape(String(id))}"]`);if(!n)return;
 if(P.up&&P.up!==n)drop(P);
 P.up=n;n.classList.add("kpk-up");widen(P,n);n.querySelector(".kpk-b").setAttribute("aria-pressed","true");conf(P);
 if(!still()&&n.animate){const a=n.animate([{transform:"none"},{transform:`translateY(${K.liftDy}px) scale(${K.liftScale})`}],{duration:K.liftMs,easing:"cubic-bezier(.3,.8,.4,1)",fill:"forwards"});P.anims.push(a)}else n.style.transform=`translateY(${K.liftDy}px) scale(${K.liftScale})`}
function close(P){if(!P||!P.open)return;P.open=false;document.removeEventListener("pointerdown",P.away,true);document.removeEventListener("pointerdown",P.dropAway,true);const K=KIT_PLAQUE,N=[...P.el.querySelectorAll(".kpk-n,.kpk-tabs,.kpk-rail,.kpk-post")];
 if(!still()&&N[0]&&N[0].animate){N.forEach(x=>x.animate([{opacity:1},{opacity:0}],{duration:K.closeMs,fill:"forwards"}));setTimeout(()=>destroy(P,true),K.closeMs+20)}else destroy(P,true)}
function destroy(P,fromClose){if(!P)return;P.open=false;try{P.__nmo&&P.__nmo.disconnect()}catch(e){}document.removeEventListener("pointerdown",P.away,true);document.removeEventListener("pointerdown",P.dropAway,true);P.anims.forEach(a=>{try{a.cancel()}catch(e){}});P.anims.length=0;try{P.el.remove()}catch(e){}if(CUR===P){CUR=null;document.body.classList.remove("kpk-open");yieldCard();if(P.o.onClose&&fromClose!==false)try{P.o.onClose()}catch(e){}}}
/* §98.1b RESULT CARD YIELDS TO THE PLAQUE BOARD (owner OD 26/11 ~21:41Z (b) «khung kết quả … che»; KK47): while a board is open, the kit result card (#rtoast, resultShow + kitResultCard)
   sits in the free span LEFT of the band (bottom unchanged), narrowed to that span when needed; the board never moves for the card. Restored when the board closes. */
function yieldCard(){try{const t=document.getElementById("rtoast");if(!t)return;const P=CUR,on=t.classList.contains("on");
 if(!P||!P.open||!on||!P.G){if(t.__ky){t.classList.remove("kres-y");t.style.removeProperty("--kyx");t.style.maxWidth="";t.style.minWidth="";t.__ky=0}return}
 const hb=P.host.getBoundingClientRect(),G=P.G;t.classList.add("kres-y");t.__ky=1;t.style.setProperty("--kyx","0px");t.style.maxWidth="";t.style.minWidth="";
 let r=t.getBoundingClientRect();const sc=r.width?t.offsetWidth/r.width:1,bl=hb.left+G.x0-14,br=hb.left+G.x0+G.bandW+G.post+18;/* the wider free span: left of the band, or right of the post (iPad: the stage is the left part of the screen) */
 const sp=[[8,bl],[br,innerWidth-8]].sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]))[0],L=sp[0],R=sp[1],span=R-L;if(span<=40)return;
 if(r.width>span){t.style.maxWidth=Math.floor(span*sc)+"px";t.style.minWidth="0";r=t.getBoundingClientRect()}
 const cx=r.left+r.width/2,want=r.left>=L&&r.right<=R?cx:(L+R)/2;t.style.setProperty("--kyx",Math.round((want-cx)*sc)+"px")}catch(e){console.error("kitPick yieldCard",e)}}
setTimeout(()=>{for(const f of ["resultShow","kitResultCard"]){const f0=window[f];if(typeof f0!=="function"||f0.__ky)continue;const w=function(){const r=f0.apply(this,arguments);try{yieldCard()}catch(e){}return r};w.__ky=1;window[f]=w;try{if(f==="resultShow")resultShow=w;else kitResultCard=w}catch(e){}}},0);
window.kitPick={open,postBox,yieldCard,drop:()=>{if(CUR)drop(CUR)},rect,obstacles,current:()=>CUR,close:()=>{if(CUR)CUR.close()},destroy:()=>{if(CUR)CUR.destroy()}};
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§98.1",title:"kitPick · cột treo thẻ lụa MỘT chỗ (1–4 thẻ một cột, 5–7 hai cột, 8+ ba cột mọc sang trái) · MỘT nút «Chọn» dưới thẻ đang nâng",where:"mọi bảng chọn thẻ gỗ: vòng người, vòng nhóm, bảo vật, lời đáp, việc với một người",
 html:()=>`<div data-kpkdemo style="position:relative;height:540px;border-radius:8px;background:linear-gradient(#efe4cf,#d9c7a4);overflow:hidden"></div><div class="kitpg-row"><button type="button" class="kbtn alt" data-kpkd="2">2 thẻ</button><button type="button" class="kbtn alt" data-kpkd="4">4 thẻ</button><button type="button" class="kbtn alt" data-kpkd="7">7 thẻ</button><button type="button" class="kbtn alt" data-kpkd="7" data-kpkup="a2">7 thẻ · nâng một thẻ</button></div>`});
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kpkd]");if(!b)return;e.stopPropagation();const h=document.querySelector("#kitpage [data-kpkdemo]");if(!h)return;
  const N=["Trò chuyện","Giao hảo","Khiêu khích","Cùng chơi / Thách đấu","Tặng quà","Hỏi han chuyện nhà","Nhờ dò la tin tức"];const P=kitPick.open({host:h,acts:N.slice(0,+b.dataset.kpkd).map((n,i)=>({id:"d"+i,n,pic:"",word:"Vững",ton:BAL.time.cost.talk+" khắc",off:false,why:""})),onPick:()=>kitPick.close()});if(b.dataset.kpkup)setTimeout(()=>P.lift("d2"),900)},true)}catch(e){}

/* ---------- kitDim: ONE dim for the people who are not chosen (owner OD 24/11 ~09:05Z + ~15:30Z) ----------
   figure only, never the background, never see-through: a copy of the figure image with a STATIC filter (brightness + saturate from BAL.kdim) cross-fades on top of the figure
   (opacity only = compositor). If an image has no positioned parent that matches its box, the filter goes straight on the image (no fade). off() fades back. */
const DM={els:[]};
function dimOne(im,fade){if(!im||im.__kdc)return;const p=im.parentElement;if(!p)return;const cs=getComputedStyle(p),ir=im.getBoundingClientRect(),pr=p.getBoundingClientRect(),D=DIM();
 const direct=()=>{im.classList.add("kdim-d");im.style.setProperty("--kdb",D.b);im.style.setProperty("--kds",D.s);DM.els.push(im)};
 if(im.tagName!=="IMG"||cs.position==="static"||Math.abs(ir.width-pr.width)>2||Math.abs(ir.height-pr.height)>2){direct();return}
 const c=document.createElement("img");c.className="kdim-c "+(im.className||"").replace(/\b(kidl\w*|figimg)\b/g,"").trim();c.alt="";c.draggable=false;c.src=im.currentSrc||im.src;c.setAttribute("aria-hidden","true");
 c.style.cssText=`position:absolute;left:${ir.left-pr.left}px;top:${ir.top-pr.top}px;width:${ir.width}px;height:${ir.height}px;pointer-events:none;filter:brightness(${D.b}) saturate(${D.s});opacity:${fade&&!still()?0:1}`;
 im.after(c);im.__kdc=c;DM.els.push(im);if(fade&&!still()&&c.animate)c.animate([{opacity:0},{opacity:1}],{duration:D.ms,fill:"forwards"})}
function dimOff(){const D=DIM();DM.els.forEach(im=>{const c=im.__kdc;if(c){im.__kdc=null;if(!still()&&c.animate){c.animate([{opacity:1},{opacity:0}],{duration:D.ms,fill:"forwards"});setTimeout(()=>c.remove(),D.ms+20)}else c.remove()}else{im.classList.remove("kdim-d");im.style.removeProperty("--kdb");im.style.removeProperty("--kds")}});DM.els=[]}
window.kitDim={/* figs may be a FUNCTION returning the current figure elements; kitDim.refresh() re-applies it after a stage redraw replaced the tokens (the dim copies live beside the old nodes) */
 refresh(){const L=DM.last;if(L)window.kitDim.on(L.figs,Object.assign({},L.o,{fade:false}))},
 on(figs,o){o=o||{};dimOff();DM.last={figs,o};const keep=typeof o.keep==="function"?o.keep():o.keep;if(typeof figs==="function")figs=figs();[].slice.call(figs||[]).forEach(f=>{if(f===keep||(keep&&f.contains&&f.contains(keep)))return;dimOne(f.tagName==="IMG"?f:(f.querySelector("img")||f.querySelector(".j59sil,canvas,svg")),o.fade!==false)})},off(){DM.last=null;dimOff()},state:()=>({n:DM.els.length,b:DIM().b,s:DIM().s})};

const css=document.createElement("style");css.id="kpk-css";css.textContent=`
/* wood tokens (post + rail + cord only) and the SILK-CARD tokens of the plaque face (KK53, OD 27/11 ~01:40Z «thẻ lụa»: ivory silk-paper face, thin pale-gold border, dark-red title; the kit card look, CSS only) */
.kpk{--kpk-w1:#c99a5b;--kpk-w2:#b4813f;--kpk-w3:#97662d;--kpk-line:#5a3a1a;--kpk-ink:#7a2a1c;--kpk-hi:rgba(255,236,196,.55);--kpk-img:none;--kpk-s1:#fffaf0;--kpk-s2:#f6ead6;--kpk-sl:#dcc48c;--kpk-sub:#5a4326;position:absolute;left:0;top:0;width:0;height:0;z-index:30;pointer-events:none}
.kpk>*{pointer-events:auto}
.rtoast.kres-y{translate:var(--kyx,0px) 0}
body.kpk-open #kshR,body.kpk-open .kshR,body.kpk-open #kpname,body.kpk-open .j59mr{visibility:hidden!important}
.kpk-post{position:absolute;border-radius:4px 4px 2px 2px;border:1px solid var(--kpk-line);box-sizing:border-box;background:var(--kpk-img),linear-gradient(90deg,var(--kpk-w3),var(--kpk-w2) 45%,var(--kpk-w1) 55%,var(--kpk-w3));box-shadow:2px 3px 5px rgba(0,0,0,.35);pointer-events:none}
.kpk-post::before{content:"";position:absolute;left:50%;top:-5px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e7c27a,#a8782f 70%);border:1px solid var(--kpk-line);box-sizing:border-box}
.kpk-rail{position:absolute;height:8px;border-radius:4px;border:1px solid var(--kpk-line);box-sizing:border-box;background:var(--kpk-img),linear-gradient(var(--kpk-w1),var(--kpk-w2) 55%,var(--kpk-w3));box-shadow:0 3px 5px rgba(0,0,0,.35);pointer-events:none}
.kpk .kpk-tabs.pctabs{position:absolute;display:flex;flex-wrap:nowrap;justify-content:center;gap:4px;padding:0;margin:0}.kpk .kpk-tabs .pct{flex:1 1 auto;min-width:0;height:${KIT_PLAQUE.tabH}px;white-space:normal;line-height:1.05;padding:0 7px;display:flex;align-items:center;justify-content:center;text-align:center}/* ONE row on every device (RING-DESIGN-5): the label wraps INSIDE its tab, then steps down in size; a tab is never cut */.kpk .kpk-tabs.kpk-ts1 .pct{font-size:.7rem;padding:0 5px}.kpk .kpk-tabs.kpk-ts2 .pct{font-size:.62rem;padding:0 3px}.kpk .kpk-tabs.kpk-ts3 .pct{font-size:.56rem;padding:0 2px}
.kpk-n{position:absolute;transform-origin:50% calc(-1 * var(--kc,12px));will-change:transform;contain:layout style;animation:kpk-sw var(--ss,4s) ease-in-out var(--sdl,0s) infinite alternate}
.kpk-n.kpk-up{animation-play-state:paused;z-index:3}
@keyframes kpk-sw{from{rotate:calc(var(--sd,1.2deg)*-1)}to{rotate:var(--sd,1.2deg)}}
.kpk-still .kpk-n,html.kf-still .kpk-n,.kf-off .kpk-n{animation:none!important}
@media (prefers-reduced-motion:reduce){.kpk-n{animation:none!important}}
.kpk-cord{position:absolute;left:50%;top:calc(-1 * var(--kc,12px));width:4px;height:var(--kc,12px);margin-left:-2px;pointer-events:none;background:repeating-linear-gradient(135deg,#8a6a3a 0 2px,#cfae72 2px 4px);border-radius:2px;box-shadow:0 0 0 .5px rgba(60,35,10,.55)}
.kpk .kfoc-b.kpk-b{--kfh:var(--kph,58px);--kfp:var(--kpp,40px);position:relative;width:100%;height:var(--kph,58px);min-height:var(--kph,58px);padding:2px 8px 2px 5px;border-radius:7px;border:1px solid var(--kpk-sl);color:var(--kpk-ink);
 background:repeating-linear-gradient(115deg,rgba(201,162,74,.07) 0 1px,transparent 1px 4px),linear-gradient(180deg,var(--kpk-s1),var(--kpk-s2));
 box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 rgba(201,162,74,.35),0 3px 6px rgba(70,40,12,.28)}/* thẻ lụa: silk-paper face, no wood grain, no nails */
.kpk .kfoc-b.kpk-b .kfoc-pic{border:1.5px solid var(--kpk-sl);background:var(--kpk-s2);box-sizing:border-box;border-radius:6px;margin-left:3px}
.kpk .kfoc-b.kpk-b.kfoc-hasi{padding-right:20px}.kpk .kfoc-b.kpk-b .kfoc-i{top:-9px;right:-7px}/* the «!» badge sits on the corner, never on the title */
.kpk-n.kpk-slim .kfoc-b.kpk-b .kfoc-pic{display:none}.kpk-n.kpk-slim .kfoc-b.kpk-b{padding-left:9px}
.kpk .kfoc-b.kpk-b .kfoc-t b{-webkit-line-clamp:2;max-height:2.3em;font-size:.8rem}.kpk.kpk-tight .kfoc-b.kpk-b .kfoc-t b{font-size:.72rem;letter-spacing:0}.kpk.kpk-three .kfoc-b.kpk-b .kfoc-t b{-webkit-line-clamp:3;max-height:3.4em}.kpk.kpk-four .kfoc-b.kpk-b .kfoc-t b{-webkit-line-clamp:unset;display:block;max-height:none;overflow:visible}/* last resort on an edge person: 3 lines, a name is never cut (OD:L177) */.kpk.kpk-slimall .kpk-n .kfoc-pic{display:none}.kpk.kpk-slimall .kpk-n .kfoc-b.kpk-b{padding-left:9px}
.kpk .kfoc-b.kpk-b .kfoc-t b{color:var(--kpk-ink);letter-spacing:.1px}
.kpk .kfoc-b.kpk-b .kfoc-t small{display:none!important;visibility:hidden;position:absolute;opacity:0;pointer-events:none;color:var(--kpk-sub);font-weight:600}
.kpk-n.kpk-up .kfoc-b.kpk-b .kfoc-t small{display:block!important;visibility:visible;position:static;opacity:1}
.kpk-n.kpk-up{height:auto!important;min-height:var(--kph,58px)}.kpk-n.kpk-up .kfoc-b.kpk-b{height:auto;min-height:var(--kph,58px);padding-top:5px;padding-bottom:5px}.kpk-n.kpk-up .kfoc-t b{-webkit-line-clamp:unset;max-height:none}.kpk-n.kpk-up .kfoc-t small{max-height:none;white-space:nowrap}.kpk-n.kpk-up.kpk-sm .kfoc-t small{font-size:.66rem}.kpk-n.kpk-up.kpk-wrap .kfoc-t small{white-space:normal}/* the small line stays on ONE line; the lifted plaque widens inside the band for it (widen), else steps down, then wraps */
.kpk-n.kpk-up .kfoc-b.kpk-b{background:repeating-linear-gradient(115deg,rgba(201,162,74,.05) 0 1px,transparent 1px 4px),linear-gradient(180deg,#fffefa,#fff6e4);border-color:#e3c36a;box-shadow:inset 0 1px 0 #fff,0 8px 14px rgba(70,40,12,.30),0 0 0 1.5px #f1d79a,0 0 16px 3px rgba(241,205,110,.65)}/* lifted = brighter + soft gold glow */
.kpk .kfoc-b.kpk-b.kfoc-off{filter:grayscale(.6);opacity:1}
.kpk .kfoc-b.kpk-b:focus-visible{outline:2px solid #c9a24a;outline-offset:2px}
.kpk>.khconf.kpk-go{position:absolute;z-index:6;display:block;gap:0;pointer-events:auto}.kpk>.khconf.kpk-go[hidden]{display:none!important}
.kpk>.khconf.kpk-go>button.kpk-gob,#modal .dlg>.khconf.khgo>button.khok,.khost>.khconf.khgo>button.khok{width:var(--kpgw,24px)!important;height:var(--kpgh,24px)!important;min-height:0!important;min-width:0!important;border-radius:50%!important;font-size:.95rem!important;font-weight:800!important;line-height:1;display:grid;place-items:center;padding:0!important;margin:0!important;background:#2f8a3e!important;color:#fff!important;border:1px solid #1f6a2c!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 1px 2px rgba(40,25,8,.35)!important}/* the small GREEN ✓ (the kit green of the ✓ chips, khok) in the lifted plaque's top-right corner */
.kpk-n.kpk-up .kfoc-t b{padding-right:calc(var(--kpgw,24px) + 10px)}.kpk-n.kpk-up .kfoc-t small{margin-top:9px}.kpk .kfoc-b.kpk-b .kfoc-t small .ef.g{color:var(--good)}.kpk .kfoc-b.kpk-b .kfoc-t small .ef.r{color:var(--bad)}.kpk .kfoc-b.kpk-b .kfoc-t small .ef.t{color:var(--ink);font-weight:600}.kpk .kpk-n.kpk-up .kfoc-b.kpk-b .kfoc-t b{-webkit-line-clamp:unset;max-height:none;overflow:visible}/* lifted: the whole name shows (beats the closed plaque's 2/3-line clamp) *//* the title never runs under the ✓; the small line starts below it */
.kdim-d{filter:brightness(var(--kdb,.7)) saturate(var(--kds,.75))!important}
.kdim-c{transform-origin:50% 100%}
`;document.head.appendChild(css);
}catch(e){console.error("jkpick",e)}})();
