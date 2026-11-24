/* MẪU 2 «Vòng bảo vật» (owner OD 24/11 ~15:15Z): NO frame over the person. Tap a person on the stage → she lights up (halo behind her, full colour; the others a little
   softer — figures only, background at normal brightness, OD ~09:05Z) → kit buttons beside her («Tặng đồ», «Trò chuyện», «Hỏi chuyện») → «Tặng đồ» opens the ITEM RING
   (KIT REQUEST kitRing — ONE part with RING-DESIGN's people ring: same slot maths, renderer = kit item tile kitItem §28.13) on the floor band in front of the figures,
   ≤ 12 items, swipe with inertia + ‹ › kit buttons + tap a side item = it turns to the centre → «Tặng» → the item flies to her, kit chip shows the effect. No dotted oval (OD ~08:55Z). */
window.M2=(function(){const {wait,R}=MD2;let st=null;
const KEYS=['ngocboi','vongngoc','tuithom','aolong','guong','hoadieu','hophuong','khantay','quatcong','nhansam','hopnhac','batcanh','tram','luoc','tranh','tho'];
function items(n){const out=[];for(const k of KEYS){const it=IT[k];if(!it)continue;const src=kmItemImg(k);if(!src)continue;out.push({k,name:it.n||it.name||k,src,grade:Math.max(0,Math.min(4,(it.g!=null?it.g:it.q!=null?it.q:it.grade)|0))});if(out.length>=n)break}
 if(out.length<n){for(const k in IT){if(out.length>=n)break;if(out.find(x=>x.k===k))continue;const src=kmItemImg(k);if(src&&/item-/.test(src))out.push({k,name:IT[k].n||k,src,grade:(IT[k].g|0)%5})}}return out}
async function setup(o){o=o||{};MD2.ensureCss();if(!window.__md2R){window.__md2R=[window.render,window.renderSoon];window.render=()=>{};window.renderSoon=()=>{}}/* mock only: hold the stage still while recording */const stage=document.getElementById('stage');const figs=[...stage.querySelectorAll('.tok.fig')].filter(e=>R(e).width>0);
 const list=items(o.n||12);await MD2.preload(list.map(x=>x.src));
 const lay=document.createElement('div');lay.id='md2r';lay.style.cssText='position:absolute;inset:0;z-index:30;pointer-events:none';stage.appendChild(lay);
 const all=[...stage.querySelectorAll('img.j59sz,img.figimg')].filter(e=>R(e).width>40);st={stage,figs,all,list,lay,sel:-1,rot:0,v:0,tiles:[],open:0,ip:document.documentElement.classList.contains('kv2')};
 figs.forEach((f,i)=>f.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();tapPerson(i)},true));return {figs:figs.length,items:list.length}}
function rel(e){const a=R(e),s=R(st.stage);return {l:a.left-s.left,t:a.top-s.top,w:a.width,h:a.height}}
async function tapPerson(i){const {figs,lay}=st;st.sel=i;const f=figs[i];const r=rel(f);
 lay.querySelectorAll('.md2-halo,.md2-acts').forEach(e=>e.remove());
 /* lit = warm glow + full colour; the others a little softer (static filters set ONCE — no animated filter, so no per-frame repaint); background untouched */
 const mine=f.querySelector('img');st.all.forEach(im=>{im.style.transition='filter .25s';im.style.filter=im===mine?'drop-shadow(0 0 10px rgba(255,214,120,.95)) drop-shadow(0 0 22px rgba(255,200,90,.6)) brightness(1.05)':'saturate(.55) brightness(.93)'});
 f.style.zIndex=3;
 /* kit buttons beside her, at chest height (never over a face), on the side with room */
 const acts=document.createElement('div');acts.className='md2-acts';const right=r.l+r.w/2<R(st.stage).width/2;const bw=st.ip?132:118;
 acts.style.cssText=`position:absolute;top:${r.t+r.h*.34}px;${right?`left:${Math.min(R(st.stage).width-bw-6,r.l+r.w*.78)}px`:`left:${Math.max(6,r.l+r.w*.22-bw)}px`};width:${bw}px;display:flex;flex-direction:column;gap:7px;pointer-events:auto;z-index:31`;
 acts.style.width='auto';acts.innerHTML=['Tặng đồ','Trò chuyện','Hỏi chuyện'].map((t,k)=>`<button class="kbtn${k===0?' main':''}" data-a="${k}" style="white-space:nowrap">${t}</button>`).join('');lay.appendChild(acts);
 acts.querySelector('[data-a="0"]').addEventListener('click',e=>{e.stopPropagation();openRing()});
 [...acts.children].forEach((b,k)=>b.animate([{opacity:0,transform:`translateX(${right?-16:16}px)`},{opacity:1,transform:'none'}],{duration:240,delay:120+k*70,fill:'both',easing:'ease-out'}));
 st.acts=acts;await wait(500)}
/* ---- ring maths (shared kitRing: angle per slot, depth scale, softness, z order) ---- */
function geo(){const s=R(st.stage),W=s.width,H=s.height,ip=st.ip;const tw=ip?104:94;return {W,H,cx:W/2,cy:H*(ip?.74:.79),Rx:Math.min(W*.40,ip?250:270),Ry:H*.075,tw}}
function place(){const {tiles,list}=st;const N=tiles.length,g=geo();tiles.forEach((t,i)=>{let a=((i-st.rot)%N+N)%N;if(a>N/2)a-=N;const th=a*2*Math.PI/N,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;
  const sc=.48+.62*Math.pow(k,1.6),x=g.Rx*s,y=-g.Ry*c;t.style.transform=`translate(${(x-g.tw/2).toFixed(1)}px,${(y-g.tw*.6).toFixed(1)}px) scale(${sc.toFixed(3)})`;t.style.opacity=(.55+.45*k).toFixed(3);t.style.zIndex=Math.round(100+c*50);t.classList.toggle('md2-front',Math.abs(a)<.5);t.classList.toggle('md2-far',Math.abs(a)>1.5)})}
async function openRing(){if(st.open)return;st.open=1;const {lay,list}=st;const g=geo();
 const ring=document.createElement('div');ring.className='md2-ring';ring.style.cssText=`position:absolute;left:${g.cx}px;top:${g.cy}px;width:0;height:0;z-index:40;pointer-events:none`;lay.appendChild(ring);st.ring=ring;
 st.tiles=list.map((it,i)=>{const t=document.createElement('div');t.className='md2-tile';t.style.cssText=`position:absolute;left:0;top:0;width:${g.tw}px;transform-origin:50% 50%;will-change:transform,opacity;pointer-events:auto`;
  t.innerHTML=kitItem({src:it.src,name:it.name,grade:it.grade,size:'md'});ring.appendChild(t);t.addEventListener('click',e=>{e.stopPropagation();turnTo(i)});return t});
 /* swipe capture band + arrows + Tặng (kit buttons) */
 const band=document.createElement('div');band.style.cssText=`position:absolute;left:0;right:0;top:${g.cy-g.tw*1.3}px;height:${g.tw*2.1}px;z-index:35;pointer-events:auto;touch-action:none`;lay.appendChild(band);st.band=band;
 let x0=0,t0=0,last=0,lt=0,drag=0;band.addEventListener('pointerdown',e=>{drag=1;x0=last=e.clientX;t0=lt=performance.now();st.v=0;band.setPointerCapture(e.pointerId)});
 band.addEventListener('pointermove',e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;st.rot-=dx/stepPx();st.v=-(dx/stepPx())/Math.max(1,now-lt);last=e.clientX;lt=now;place()});
 band.addEventListener('pointerup',e=>{drag=0;if(Math.abs(e.clientX-x0)<6){const hitT=document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.closest&&x.closest('.md2-tile'));if(hitT){const i=st.tiles.indexOf(hitT.closest('.md2-tile'));if(i>=0)turnTo(i)}return}fling(st.v)});
 const mk=(txt,cls,css,fn)=>{const b=document.createElement('button');b.className='kbtn '+cls;b.textContent=txt;b.style.cssText='position:absolute;z-index:45;pointer-events:auto;'+css;b.addEventListener('click',e=>{e.stopPropagation();fn()});lay.appendChild(b);return b};
 const ab=st.ip?44:40;st.arL=mk('‹','',`left:${Math.max(4,g.cx-g.Rx-g.tw*.5-ab)}px;top:${g.cy-g.tw*.55}px;width:${ab}px;min-height:${ab}px;padding:0;font-size:1.4rem`,()=>turnBy(-1));
 st.arR=mk('›','',`left:${Math.min(g.W-ab-4,g.cx+g.Rx+g.tw*.5)}px;top:${g.cy-g.tw*.55}px;width:${ab}px;min-height:${ab}px;padding:0;font-size:1.4rem`,()=>turnBy(1));
 st.give=mk('Tặng','main',`left:${g.cx-60}px;top:${Math.min(g.cy+g.tw*.75,g.H-(st.ip?44:40)-10)}px;width:120px;min-height:${st.ip?44:40}px`,()=>give());
 if(st.acts)st.acts.animate([{opacity:1},{opacity:0}],{duration:160,fill:'both'}).onfinish=()=>{st.acts.style.visibility='hidden'};
 place();const N=st.tiles.length;st.tiles.forEach((t,i)=>{const fin=t.style.transform,op=t.style.opacity;t.animate([{transform:`translate(${-g.tw/2}px,${-g.tw*.6}px) scale(.1)`,opacity:0},{transform:fin,opacity:op}],{duration:420,delay:i*28,easing:'cubic-bezier(.2,1.3,.4,1)'})});
 [st.arL,st.arR,st.give].forEach(b=>b.animate([{opacity:0},{opacity:1}],{duration:260,delay:300,fill:'both'}));await wait(420+N*28)}
const stepPx=()=>{const g=geo();return g.Rx*2*Math.PI/st.tiles.length*.75};
let raf=0;function loop(fn){cancelAnimationFrame(raf);let lt=performance.now();const f=now=>{const dt=Math.min(48,now-lt);lt=now;if(fn(dt)!==false)raf=requestAnimationFrame(f);else raf=0};raf=requestAnimationFrame(f)}
/* inertia: velocity in slots/ms decays (friction), then a short ease snaps to the nearest slot */
function fling(v){st.v=v;return new Promise(res=>loop(dt=>{st.rot+=st.v*dt;st.v*=Math.pow(.94,dt/16.67);place();if(Math.abs(st.v)<.0009){snap().then(res);return false}}))}
function tween(to,ms){const from=st.rot;const t0=performance.now();return new Promise(res=>loop(()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);st.rot=from+(to-from)*e;place();if(k>=1){res();return false}}))}
const snap=()=>tween(Math.round(st.rot),Math.round(180*MD2.pace()/1.75));
const turnBy=d=>tween(Math.round(st.rot)+d,Math.round(260*MD2.pace()/1.75));
function turnTo(i){const N=st.tiles.length;let d=((i-st.rot)%N+N)%N;if(d>N/2)d-=N;return tween(st.rot+d,Math.round(Math.min(700,220+Math.abs(d)*90)*MD2.pace()/1.75))}
async function give(){const N=st.tiles.length;const fi=((Math.round(st.rot)%N)+N)%N;const t=st.tiles[fi];const f=st.figs[st.sel];const a=R(t),b=R(f);
 const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height*.42-(a.top+a.height/2);const base=t.style.transform;
 st.give.animate([{transform:'scale(1)'},{transform:'scale(.93)'},{transform:'scale(1)'}],{duration:200});
 t.animate([{transform:base},{transform:base+` translate(${dx*.4}px,${dy*.5-60}px) scale(1.15)`,offset:.45},{transform:base+` translate(${dx}px,${dy}px) scale(.35)`,opacity:.9,offset:.92},{transform:base+` translate(${dx}px,${dy}px) scale(.2)`,opacity:0}],{duration:Math.round(560*MD2.pace()/1.75),easing:'cubic-bezier(.4,0,.3,1)',fill:'both'});
 st.tiles.forEach((x,i)=>{if(i!==fi)x.animate([{opacity:x.style.opacity},{opacity:0,transform:x.style.transform+' scale(.3)'}],{duration:300,delay:120+Math.abs(i-fi)*15,fill:'both'})});
 [st.arL,st.arR,st.give].forEach(b=>b.animate([{opacity:1},{opacity:0}],{duration:200,fill:'both'}));
 await wait(Math.round(560*MD2.pace()/1.75));f.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:420,composite:'add'});
 const r=rel(f);const chip=document.createElement('div');chip.style.cssText=`position:absolute;left:${r.l+r.w/2}px;top:${r.t+r.h*.5}px;transform:translateX(-50%);z-index:50;pointer-events:none`;chip.innerHTML=kitChip('Thiện cảm',3);chip.firstElementChild.style.fontSize='1.15em';st.lay.appendChild(chip);
 chip.animate([{opacity:0,transform:'translate(-50%,10px)'},{opacity:1,transform:'translate(-50%,0)',offset:.2},{opacity:1,transform:'translate(-50%,-26px)',offset:.8},{opacity:0,transform:'translate(-50%,-34px)'}],{duration:1600,fill:'both'});
 await wait(1700);close();return st.list[fi].name}
function close(){if(!st)return;if(window.__md2R){[window.render,window.renderSoon]=window.__md2R;window.__md2R=null}st.lay.remove();st.halo&&st.halo.remove();st.all.forEach(im=>{im.getAnimations().forEach(a=>a.cancel());im.style.filter='';im.style.transition=''});st.figs.forEach(g=>{g.getAnimations().forEach(a=>a.cancel());g.style.zIndex=''});st.open=0}
return {setup,tapPerson,openRing,fling,turnBy,turnTo,give,close,get st(){return st}}})();
