/* ================= jkpick: kitPick = the PERSON-INTERACTION PICKER (KIT §98; request «kitPick» + «wood skin» of RING-DESIGN-3; owner OD 24/11 ~15:30Z / ~15:40Z)
   «Thẻ gỗ treo»: when she picks one person on a people stage, the acts she can do with that person hang as small WOODEN PLAQUES on a signpost BESIDE the person
   (her free side), LOW (from about her waist down to her feet) — never over a face, never from the screen's top edge, never a frame / card / veil.
   Plaques drop from the rail and sway to rest (idle sway stays gentle); tap = the plaque lifts + its line shows (odds word, cost); tap again = choose.
   A plaque = the kit act button (kitFocus.btn = .kfoc-b: picture + name + «word · Tốn …»); the WOOD SKIN is the kit look of that button inside .kpk (CSS tokens --kpk-*, one painted-wood
   slot --kpk-img for Foreman C's art later; until then a code wood of the kit's gold/brown). ONE plaque size per mode (kv1/kv2), the same on every place.
   kitDim: ONE dim for the people who are NOT chosen: brightness + saturation on the FIGURE, OPAQUE (never opacity / see-through); the background is never touched.
     Static filter on a copy of the figure that cross-fades in (compositor opacity, no animated filter); numbers = BAL.kdim {b,s,ms}.
   API:  const P=kitPick.open({host,anchor:{x,y,w,h},side:"auto"|"l"|"r",groups:[{k,n,acts:[{id,n,pic,word,ton,off,why,info}]}] | acts:[…],group,onPick(id,act,P),onOff(act,P),onClose(),dismiss:true});
         P.lift(id) · P.setGroup(k) · P.close() (animated) · P.destroy() · kitPick.rect(figEl,host) → anchor {x,y,w,h} in host px · kitPick.current() · kitPick.close()
         Event: the plaque button gets «kpkpick» (bubbles) on the 2nd tap, data-id = act id.   kitDim.on(figs,{keep}) · kitDim.off() · kitDim.state().
   PURE DISPLAY: no game logic, no numbers of its own.   Test: dev/test/kit-pick.js (Fold 755x1000 + iPad 1180x820). */
(function(){try{
const KIT_PLAQUE=window.KIT_PLAQUE=window.KIT_PLAQUE||{
 dropMs:700,stagger:80,swayS:[3.4,4.6],swayDeg:1.3,liftMs:200,liftDy:-8,liftScale:1.05,closeMs:170,
 w:{kv1:152,kv2:200},h:{kv1:62,kv2:56},pic:{kv1:40,kv2:48},cord:{rail:18,gap:10,gapS:6},hS:50,gx:8,max:6,railAt:.40,railMin:.18,railLap:.34,slimW:140,minW:128,post:8,tabH:34,pen2:1500,penS:4000,obst:'#kshR,#kshL,.kshR,.kshL,.krail,.krailb,#kpname,.kchip,.tok .tag,.kscn-tag,#tomap',
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
function obstacles(host){const K=KIT_PLAQUE,h=host.getBoundingClientRect(),out=[];try{host.querySelectorAll(K.obst).forEach(e=>{if(e.closest(".kpk")||e.hidden||getComputedStyle(e).visibility==="hidden")return;const r=e.getBoundingClientRect();if(r.width<6||r.height<6||r.width*r.height>.55*h.width*h.height)return;out.push({x:r.left-h.left,y:r.top-h.top,w:r.width,h:r.height})})}catch(e){}return out}
function open(o){if(CUR)CUR.destroy();o=o||{};const host=o.host||document.getElementById("stage")||document.body,m=kv(),K=KIT_PLAQUE;
 const P={o,host,m,anims:[],open:true,up:null};CUR=P;
 const gs=o.groups&&o.groups.length?o.groups:[{k:"",n:"",acts:o.acts||[]}];P.groups=gs;P.group=o.group||gs[0].k;
 P.obst=obstacles(host);const el=P.el=document.createElement("div");el.className="kpk kpk-"+m+(still()?" kpk-still":"");el.setAttribute("role","group");el.setAttribute("aria-label","Chọn việc");host.appendChild(el);
 build(P);if(o.dismiss!==false){P.away=e=>{if(!P.open||el.contains(e.target))return;P.close()};setTimeout(()=>{if(P.open)document.addEventListener("pointerdown",P.away,true)},0)}
 P.lift=id=>lift(P,id);P.setGroup=k=>{if(k===P.group)return;P.group=k;build(P,true)};P.close=()=>close(P);P.destroy=()=>destroy(P);
 return P}
function geo(P){const K=KIT_PLAQUE,m=P.m,hr=P.host.getBoundingClientRect(),A=P.o.anchor||{x:hr.width*.4,y:hr.height*.2,w:hr.width*.2,h:hr.height*.6},W=hr.width,H=hr.height;
 const gr=P.groups.find(g=>g.k===P.group)||P.groups[0],acts=(gr.acts||[]).slice(0,K.max),n=acts.length,post=K.post;
 /* the band (tabs + rail + columns + post) goes on the side, tier and height that cover the least: kit parts of the stage (P.obst: right column, rail chips, title, name tags, corner buttons) count HARD, other people (o.avoid) SOFT */
 const ovl=(x0,y0,x1,y1,L)=>{let a=0;L.forEach(o=>{const w=Math.min(x1,o.x+o.w)-Math.max(x0,o.x),hh=Math.min(y1,o.y+o.h)-Math.max(y0,o.y);if(w>0&&hh>0)a+=w*hh});return a};
 const tabsEst=P.groups.length>1?K.tabH+8:0,av=P.o.avoid||[],ob=P.obst||[];
 const fit=s=>{let free=s==="r"?W-(A.x+A.w)-8:A.x-8,minRail=A.y+A.h*K.railMin;const maxB=H-6;
  /* last resort on a narrow phone: the band may lap the outer 35 % of her BODY (never her face: the rail then starts below the shoulders) */
  let lap=0;if(free<K.w[m]*.9&&!(P.o.noLap)){lap=Math.round(A.w*.35);free+=lap;minRail=Math.max(minRail,A.y+A.h*K.railLap)}
  const mk=(cols,comp)=>{let cw=cols===2?Math.min(K.w[m],Math.floor((free-post-10-K.gx)/2)):Math.min(K.w[m],free-post-6);cw=Math.max(cols===2?K.minW:104,cw);
   const hh=comp?K.hS:K.h[m],gg=comp?K.cord.gapS:K.cord.gap,bw=cols*cw+(cols-1)*K.gx,x0=s==="r"?A.x+A.w+6-lap:A.x-6-bw-post-4+lap,rows=Math.ceil(n/cols),tot=K.cord.rail+rows*hh+(rows-1)*gg;return {cols,cw,bw,x0,rows,tot,hh,gg,comp:!!comp,pen:(cols===2?K.pen2:0)+(comp?K.penS:0)}};
  const V=[mk(1)];if(n>3&&free>=2*K.minW+post+10+K.gx)V.push(mk(2));V.push(mk(1,1));if(n>3&&free>=2*K.minW+post+10+K.gx)V.push(mk(2,1));
  let best=null;V.forEach(C=>{const want=A.y+A.h*K.railAt,lo=Math.max(minRail,2+tabsEst),hi=maxB-C.tot,T=[Math.max(minRail,Math.min(want,hi))];for(let t=lo;t<=hi;t+=6)T.push(t);
   const bx0=s==="r"?C.x0:C.x0-post-4,bx1=s==="r"?C.x0+C.bw+post+4:C.x0+C.bw;
   T.forEach(top=>{const over=Math.max(0,top+C.tot-maxB),y0=top-tabsEst,hard=ovl(bx0,y0,bx1,top+C.tot,ob),soft=ovl(bx0,y0,bx1,top+C.tot,av);
    const cost=hard*100+soft+over*C.bw*200+C.pen+Math.abs(top-want)*.05*C.bw;if(!best||cost<best.cost)best=Object.assign({cost,hard,soft,over,top},C)})});
  return Object.assign({s,free,ov:best.hard+best.soft,lap},best)};
 let side=P.o.side&&P.o.side!=="auto"?P.o.side:null,F;
 if(side)F=fit(side);else{const r=fit("r"),l=fit("l");F=r.cost!==l.cost?(r.cost<l.cost?r:l):(r.free>=l.free?r:l)}
 let railY=F.top;
 const tabsH=P.groups.length>1?K.tabH+8:0;if(railY-tabsH<2)railY=2+tabsH;
 return {lapped:F.lap>0,comp:F.comp,A,acts,n,side:F.s,cols:F.cols,cw:F.cw,h:F.hh,gap:F.gg,rows:F.rows,railY,bandW:F.bw,x0:F.x0,post,floor:Math.min(A.y+A.h,H-2),tabsH,W,H}}
function build(P,swap){const K=KIT_PLAQUE,G=geo(P),el=P.el,m=P.m;P.G=G;P.up=null;
 const old=[...el.querySelectorAll(".kpk-n,.kpk-tabs")];old.forEach(x=>x.remove());
 const side=G.side,pw=G.post;
 /* signpost + rail (built once) */
 let post=el.querySelector(".kpk-post"),rail=el.querySelector(".kpk-rail");if(!post){post=document.createElement("i");post.className="kpk-post";rail=document.createElement("i");rail.className="kpk-rail";el.append(post,rail)}
 post.style.cssText=`left:${side==="r"?G.x0+G.bandW+4:G.x0-pw-4}px;top:${G.railY-6}px;width:${pw}px;height:${Math.max(30,G.floor-(G.railY-6))}px`;
 rail.style.cssText=`left:${side==="r"?G.x0-4:G.x0-pw-4}px;top:${G.railY}px;width:${G.bandW+pw+8}px`;
 /* tabs (kit .pctabs/.pct) above the rail when more than one group */
 if(P.groups.length>1){const t=document.createElement("div");t.className="kpk-tabs pctabs";t.innerHTML=P.groups.map(g=>`<button type="button" class="pct${g.k===P.group?" on":""}" data-k="${esc(g.k)}">${esc(g.n||"Việc")}</button>`).join("");
  t.style.cssText=`left:${G.x0}px;top:0;width:${G.bandW}px;visibility:hidden`;t.__fit=1;t.addEventListener("click",e=>{const b=e.target.closest(".pct");if(!b)return;e.stopPropagation();P.setGroup(b.dataset.k)});el.appendChild(t);
  /* the tab row may wrap to 2 lines in a narrow band: it grows UPWARD from the rail (measured), never onto the plaques */
  const th=Math.ceil(t.getBoundingClientRect().height);t.style.top=Math.max(2,G.railY-th-8)+"px";t.style.visibility=""}
 G.acts.forEach((a,i)=>{const c=i%G.cols,r=(i/G.cols)|0,n=document.createElement("div");n.className="kpk-n";n.dataset.id=a.id;
  const kc=r?G.gap:K.cord.rail,x=G.x0+c*(G.cw+K.gx),y=G.railY+K.cord.rail+r*(G.h+G.gap);
  n.style.cssText=`left:${x}px;top:${y}px;width:${G.cw}px;height:${G.h}px;--kc:${kc}px;--kph:${G.h}px;--kpp:${K.pic[m]}px;--sd:${(K.swayDeg*(1-.12*r)).toFixed(2)}deg;--ss:${(K.swayS[0]+(K.swayS[1]-K.swayS[0])*((i*37%10)/10)).toFixed(2)}s;--sdl:${(-(i*.9+c*1.3)).toFixed(2)}s`;
  n.innerHTML=`<i class="kpk-cord"></i>`+btn(a,i);if(G.cw<K.slimW)n.classList.add("kpk-slim");/* narrow side: no picture, the whole name gets the room (OD:L177 names never cut) */const b=n.querySelector(".kfoc-b");b.classList.add("kpk-b");b.dataset.id=a.id;b.setAttribute("aria-pressed","false");
  b.addEventListener("click",ev=>{ev.stopPropagation();tap(P,a,n,b)});el.appendChild(n);
  /* fall-in from the rail: transform + opacity only, staggered top → bottom, settles with a damped swing */
  if(!still()&&n.animate){const s=c%2?-1:1,dy=-(y-G.railY)+4;n.classList.add("kpk-drop");
   const an=n.animate([{opacity:0,transform:`translateY(${dy}px) rotate(${s*9}deg)`},{opacity:1,transform:`translateY(5px) rotate(${-s*6}deg)`,offset:.46},{transform:`translateY(-2px) rotate(${s*3.2}deg)`,offset:.68},{transform:`translateY(0) rotate(${-s*1.4}deg)`,offset:.84},{opacity:1,transform:"none"}],{duration:K.dropMs,delay:(swap?0:60)+i*K.stagger,easing:"cubic-bezier(.3,.7,.4,1)",fill:"backwards"});
   P.anims.push(an);an.onfinish=()=>{n.classList.remove("kpk-drop");const j=P.anims.indexOf(an);if(j>=0)P.anims.splice(j,1)}}
  });
}
function tap(P,a,n,b){if(!P.open)return;if(P.up===n){if(a.off){try{P.o.onOff&&P.o.onOff(a,P)}catch(e){}return}
  b.dispatchEvent(new CustomEvent("kpkpick",{bubbles:true,detail:{id:a.id,act:a}}));try{P.o.onPick&&P.o.onPick(a.id,a,P)}catch(e){}return}
 lift(P,a.id)}
function lift(P,id){const K=KIT_PLAQUE,n=P.el.querySelector(`.kpk-n[data-id="${CSS.escape(String(id))}"]`);if(!n)return;
 if(P.up&&P.up!==n){const u=P.up;u.classList.remove("kpk-up");u.querySelector(".kpk-b").setAttribute("aria-pressed","false");if(!still()&&u.animate)u.animate([{transform:`translateY(${K.liftDy}px) scale(${K.liftScale})`},{transform:"none"}],{duration:K.liftMs-40,easing:"ease-out"})}
 P.up=n;n.classList.add("kpk-up");n.querySelector(".kpk-b").setAttribute("aria-pressed","true");
 if(!still()&&n.animate){const a=n.animate([{transform:"none"},{transform:`translateY(${K.liftDy}px) scale(${K.liftScale})`}],{duration:K.liftMs,easing:"cubic-bezier(.3,.8,.4,1)",fill:"forwards"});P.anims.push(a)}else n.style.transform=`translateY(${K.liftDy}px) scale(${K.liftScale})`}
function close(P){if(!P||!P.open)return;P.open=false;document.removeEventListener("pointerdown",P.away,true);const K=KIT_PLAQUE,N=[...P.el.querySelectorAll(".kpk-n,.kpk-tabs,.kpk-rail,.kpk-post")];
 if(!still()&&N[0]&&N[0].animate){N.forEach(x=>x.animate([{opacity:1},{opacity:0}],{duration:K.closeMs,fill:"forwards"}));setTimeout(()=>destroy(P,true),K.closeMs+20)}else destroy(P,true)}
function destroy(P,fromClose){if(!P)return;P.open=false;document.removeEventListener("pointerdown",P.away,true);P.anims.forEach(a=>{try{a.cancel()}catch(e){}});P.anims.length=0;try{P.el.remove()}catch(e){}if(CUR===P){CUR=null;if(P.o.onClose&&fromClose!==false)try{P.o.onClose()}catch(e){}}}
window.kitPick={open,rect,obstacles,current:()=>CUR,close:()=>{if(CUR)CUR.close()},destroy:()=>{if(CUR)CUR.destroy()}};

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
/* wood tokens: ONE look. --kpk-img = the slot for Foreman C's painted wood (none until it exists) */
.kpk{--kpk-w1:#c99a5b;--kpk-w2:#b4813f;--kpk-w3:#97662d;--kpk-line:#5a3a1a;--kpk-ink:#2b1708;--kpk-hi:rgba(255,236,196,.55);--kpk-img:none;position:absolute;left:0;top:0;width:0;height:0;z-index:30;pointer-events:none}
.kpk>*{pointer-events:auto}
.kpk-post{position:absolute;border-radius:4px 4px 2px 2px;border:1px solid var(--kpk-line);box-sizing:border-box;background:var(--kpk-img),linear-gradient(90deg,var(--kpk-w3),var(--kpk-w2) 45%,var(--kpk-w1) 55%,var(--kpk-w3));box-shadow:2px 3px 5px rgba(0,0,0,.35);pointer-events:none}
.kpk-post::before{content:"";position:absolute;left:50%;top:-5px;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e7c27a,#a8782f 70%);border:1px solid var(--kpk-line);box-sizing:border-box}
.kpk-rail{position:absolute;height:8px;border-radius:4px;border:1px solid var(--kpk-line);box-sizing:border-box;background:var(--kpk-img),linear-gradient(var(--kpk-w1),var(--kpk-w2) 55%,var(--kpk-w3));box-shadow:0 3px 5px rgba(0,0,0,.35);pointer-events:none}
.kpk-tabs{position:absolute;display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:0;margin:0}.kpk-tabs .pct{height:${KIT_PLAQUE.tabH}px;white-space:nowrap}
.kpk-n{position:absolute;transform-origin:50% calc(-1 * var(--kc,12px));will-change:transform;contain:layout style;animation:kpk-sw var(--ss,4s) ease-in-out var(--sdl,0s) infinite alternate}
.kpk-n.kpk-up{animation-play-state:paused;z-index:3}
@keyframes kpk-sw{from{rotate:calc(var(--sd,1.2deg)*-1)}to{rotate:var(--sd,1.2deg)}}
.kpk-still .kpk-n,html.kf-still .kpk-n,.kf-off .kpk-n{animation:none!important}
@media (prefers-reduced-motion:reduce){.kpk-n{animation:none!important}}
.kpk-cord{position:absolute;left:50%;top:calc(-1 * var(--kc,12px));width:4px;height:var(--kc,12px);margin-left:-2px;pointer-events:none;background:repeating-linear-gradient(135deg,#8a6a3a 0 2px,#cfae72 2px 4px);border-radius:2px;box-shadow:0 0 0 .5px rgba(60,35,10,.55)}
.kpk .kfoc-b.kpk-b{--kfh:var(--kph,58px);--kfp:var(--kpp,40px);position:relative;width:100%;height:var(--kph,58px);min-height:var(--kph,58px);padding:2px 8px 2px 5px;border-radius:7px;border:1.5px solid var(--kpk-line);color:var(--kpk-ink);
 background:var(--kpk-img),repeating-linear-gradient(93deg,rgba(80,45,15,.13) 0 1px,transparent 1px 5px,rgba(255,226,170,.10) 5px 6px,transparent 6px 11px),linear-gradient(180deg,var(--kpk-w1),var(--kpk-w2) 58%,var(--kpk-w3));
 box-shadow:inset 0 1.5px 0 var(--kpk-hi),inset 0 -2px 0 rgba(70,40,12,.45),0 3px 6px rgba(0,0,0,.4)}
.kpk .kfoc-b.kpk-b::before,.kpk .kfoc-b.kpk-b::after{content:"";position:absolute;top:4px;width:4px;height:4px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#e8d9b8,#6b4a22);pointer-events:none}.kpk .kfoc-b.kpk-b::before{left:3px}.kpk .kfoc-b.kpk-b::after{right:3px}
.kpk .kfoc-b.kpk-b .kfoc-pic{border:1.5px solid var(--kpk-line);box-sizing:border-box;border-radius:6px;margin-left:3px}
.kpk .kfoc-b.kpk-b.kfoc-hasi{padding-right:20px}.kpk .kfoc-b.kpk-b .kfoc-i{top:-9px;right:-7px}/* the «!» badge sits on the corner, never on the title */
.kpk-n.kpk-slim .kfoc-b.kpk-b .kfoc-pic{display:none}.kpk-n.kpk-slim .kfoc-b.kpk-b{padding-left:9px}
.kpk .kfoc-b.kpk-b .kfoc-t b{-webkit-line-clamp:3;max-height:3.3em;font-size:.8rem}
.kpk .kfoc-b.kpk-b .kfoc-t b{color:var(--kpk-ink);text-shadow:0 1px 0 var(--kpk-hi);letter-spacing:.1px}
.kpk .kfoc-b.kpk-b .kfoc-t small{display:none;color:#3d2410;text-shadow:0 1px 0 var(--kpk-hi);font-weight:600}
.kpk-n.kpk-up .kfoc-b.kpk-b .kfoc-t small{display:block}
.kpk-n.kpk-up{height:auto!important;min-height:var(--kph,58px)}.kpk-n.kpk-up .kfoc-b.kpk-b{height:auto;min-height:var(--kph,58px);padding-top:5px;padding-bottom:5px}.kpk-n.kpk-up .kfoc-t b{-webkit-line-clamp:unset;max-height:none}.kpk-n.kpk-up .kfoc-t small{max-height:none}
.kpk-n.kpk-up .kfoc-b.kpk-b{box-shadow:inset 0 1.5px 0 var(--kpk-hi),inset 0 -2px 0 rgba(70,40,12,.45),0 8px 14px rgba(0,0,0,.45),0 0 0 2px #f1d79a}
.kpk .kfoc-b.kpk-b.kfoc-off{filter:grayscale(.6);opacity:1}
.kpk .kfoc-b.kpk-b:focus-visible{outline:2px solid #fff3c4;outline-offset:2px}
.kdim-d{filter:brightness(var(--kdb,.7)) saturate(var(--kds,.75))!important}
.kdim-c{transform-origin:50% 100%}
`;document.head.appendChild(css);
}catch(e){console.error("jkpick",e)}})();
