/* MẪU 2 «Vòng bảo vật» v3 (owner OD 24/11 ~15:15Z + ~15:30Z + ~15:40Z). ONE wide scene on both devices (kit scene layer §93.1 = no panel; iPad = the whole 1180x820 spread, never the left half).
   Flow: the people stand on the floor (kit figure scale, full body, kit name tags under the feet, nothing over a face) → tap a person: SHE steps out + a warm light grows behind her, the others
   recede (a pre-filtered copy cross-fades in — no animated CSS filter, background untouched, OD ~09:05Z) → RING-DESIGN-2's person picker «thẻ gỗ treo» (hanging plaques = kit fan buttons `.kfoc-b`
   in the compact `kar-min` form, copied 1:1 from review/ring-design-2 dev/review/ring3/area.js picker 'hang' — ONE picker, not a second one) drop from above beside her and swing to rest;
   tap a plaque = it lifts + its line shows, tap again = choose. The acts are the game's own (dfData: real names, pictures, odds words, Tốn). «Biếu» (the real gift act) → the plaques fold away,
   the ITEM RING blooms on the floor band (≤ 12 kit item tiles; ring maths = the same as RING-DESIGN's people ring: ONE kitRing, two renderers), swipe with inertia / ‹ › / tap a side item → «Tặng» →
   the item arcs to her chest (never the face), she pulses once, kit chip «Thiện cảm +n» (n from the game's giftVal → BAL). No dotted oval, no frame over her. Motion = transform + opacity only. */
window.M2=(function(){const {wait,R}=MD3;let st=null;
const KEYS=['ngocboi','vongngoc','tuithom','aolong','guong','hoadieu','hophuong','khantay','quatcong','nhansam','hopnhac','batcanh','tram','luoc','tranh','tho'];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function items(n){const out=[];const add=k=>{if(out.length>=n||out.find(x=>x.k===k))return;const it=IT[k];if(!it)return;const src=kmItemImg(k);if(!src||!/item-|img\//.test(src))return;out.push({k,name:it.n||k,src,grade:Math.max(0,Math.min(4,(it.g!=null?it.g:it.q!=null?it.q:it.grade)|0))})};
 KEYS.forEach(add);for(const k in IT)add(k);return out}
/* the game's real person acts (dfData): the picker shows these, never typed ones */
function realActs(){const out=[];let n=2;try{n=Math.max(2,homePeople().length)}catch(e){}for(let i=0;i<n;i++){try{dfData(i).forEach(g=>g.acts.forEach(a=>{if(!out.find(x=>x.n===a.n))out.push(a)}))}catch(e){}}
 let gift=out.findIndex(a=>/^Biếu/.test(a.n));/* the real gift act «Biếu» (maids / mamas / consorts carry it); a life whose stage people have none gets it as the first plaque with an item picture so the flow can always be shown */
 if(gift<0)out.unshift({id:'gift',n:'Biếu',pic:kmItemImg('ngocboi')});else if(gift>0){const g=out.splice(gift,1)[0];out.unshift(g)}return out.slice(0,6)}
const css=`#md3sc .md3-halo{position:absolute;pointer-events:none;z-index:1;background:radial-gradient(ellipse 50% 52% at 50% 52%,rgba(255,226,150,.95),rgba(255,226,150,.55) 48%,rgba(255,226,150,0) 72%);will-change:opacity,transform;opacity:0}
#md3sc .md3-tile:not(.md3-front) .kitn,#md3sc .md3-tile:not(.md3-front) .kgchip{visibility:hidden}#md3sc .kscn-fig{will-change:transform}#md3sc .md3-tg{position:absolute;z-index:5;pointer-events:none;transform:translateX(-50%);white-space:nowrap}`;
async function setup(o){o=o||{};MD3.ensureCss();if(!document.getElementById('md3-css2')){const s=document.createElement('style');s.id='md3-css2';s.textContent=css;document.head.appendChild(s)}
 const ip=document.documentElement.classList.contains('kv2');const np=o.people||(ip?4:3);const list=items(o.n||12);
 const P=liveRivals(true).filter(v=>v.alive&&!v.out).slice(0,np);const bg=IMG_U('img/ngu-hoa-vien.webp');
 /* fixture: the cast on the stage has MET her (so every kit name tag shows a real name, no «???»; the kit's stranger rule itself is untouched) */
 try{S.met=S.met||{};const K=k61S();P.forEach(v=>{if(S.met[v.id]==null)S.met[v.id]=0;if(K)K[kOf61(v)]=Math.max(+K[kOf61(v)]||0,2)})}catch(e){}
 MD3.meetAll();const acts=realActs().slice(0,ip?5:4);await MD3.preload([bg,...list.map(x=>x.src),...acts.map(a=>a.pic).filter(Boolean)]);
 const Sc=kitScene.open({bg,intro:0});const L=Sc.L;L.id='md3sc';MD3.sceneBright(L);L.style.opacity='0';const g=L.g,w=g.w,H=g.H;
 const fh=Math.round(H*(ip?.68:.58)),feet=H*.925;const figs=[],tags=[];
 for(let i=0;i<P.length;i++){const cx=w*(i+.5)/P.length;const f=await Sc.fig(P[i],{cx,top:Math.round(feet-fh),fh,z:2});figs.push(f);
  const t=document.createElement('div');t.className='md3-tg';t.innerHTML=kitNameTagBox(P[i],{});L.appendChild(t);tags.push(t)}
 figs.forEach((f,i)=>{const r=R(f),lr=R(L),ob=f.ob;const cx=r.left-lr.left+(ob.l+ob.r)/2*r.width,bt=r.top-lr.top+ob.b*r.height;tags[i].style.left=cx+'px';tags[i].style.top=Math.min(H-34,bt+1)+'px';f.__cx=cx;f.__bt=bt});
 /* pre-decode / pre-raster: dim copies + halo exist from the start (opacity 0), so a tap only animates opacity/transform */
 const halos=[];figs.forEach((f,i)=>{const h=document.createElement('div');h.className='md3-halo';const r=R(f),lr=R(L);h.style.cssText+=`left:${r.left-lr.left-r.width*.2}px;top:${r.top-lr.top-r.height*.04}px;width:${r.width*1.4}px;height:${r.height*1.08}px`;L.insertBefore(h,f);halos.push(h)});
 st={Sc,L,figs,tags,halos,P,acts,list,sel:-1,rot:0,v:0,tiles:[],open:0,ip,w,H,pk:null,busy:0};return {people:P.length,acts:acts.length,items:list.length,fh}}
async function enter(){const {L,figs,tags}=st;const T=(e,k,o)=>e.animate(k,Object.assign({fill:'both',easing:'cubic-bezier(.2,.8,.3,1)'},o));
 /* ONE opaque kit screen veil, people enter by transform only at opacity 1 */
 figs.forEach(f=>f.style.transform='translateX(-60px)');tags.forEach(t=>t.style.visibility='hidden');
 await MD3.cover(async()=>{L.style.opacity='1'});
 T(L.querySelector('.kscn-bg'),[{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:900});
 figs.forEach((f,i)=>{f.style.transform='';T(f,[{transform:'translateX(-60px)'},{transform:'none'}],{duration:560,delay:i*150});setTimeout(()=>{tags[i].style.visibility=''},560+i*150)});
 figs.forEach((f,i)=>f.addEventListener('click',e=>{e.stopPropagation();tapPerson(i)}));await wait(700+figs.length*150)}
/* ---- tap a person: she steps out + light; the others recede (cross-fade to the pre-filtered copy + slide away) ---- */
async function tapPerson(i){if(st.busy||st.sel===i)return;st.busy=1;await closePk();const {figs,halos,tags,w}=st;st.sel=i;const E='cubic-bezier(.2,.7,.2,1)';
 const f=figs[i],right=f.__cx<w/2;
 /* the others: kitDim (KIT §98.3, opaque figure-only dim, BAL.kdim); she steps OUT toward her free side (forward + apart from the group) */
 kitDim.off();kitDim.on(figs,{keep:f});
 figs.forEach((x,k)=>{[x,halos[k],tags[k]].forEach(e=>e.getAnimations().forEach(a=>a.cancel()));
  if(k!==i){const sg=x.__cx<f.__cx?-1:1,lr0=R(st.L),tr=R(tags[k]),room=Math.max(0,sg<0?tr.left-lr0.left-4:lr0.right-tr.right-4),dx=sg*Math.min(w*.07,room),kf=[{transform:'none'},{transform:`translateX(${dx}px)`}],o={duration:560,easing:E,fill:'both'};/* the others also draw APART from her (clear floor for the plaques); the dim copy travels with its figure */
   x.animate(kf,o);if(x.__kdc)x.__kdc.animate(kf,o);tags[k].animate([{opacity:1,transform:'translateX(-50%)'},{opacity:.4,transform:`translateX(calc(-50% + ${dx}px))`}],o);halos[k].animate([{opacity:0}],{duration:10,fill:'both'})}
  else{const tx=right?w*.07:-w*.07;const to=`translateX(${tx}px) translateY(10px) scale(1.07)`;x.__t=to;x.animate([{transform:'none'},{transform:`translateX(${tx}px) translateY(14px) scale(1.09)`,offset:.6},{transform:to}],{duration:640,easing:E,fill:'both'});
   halos[k].animate([{opacity:0,transform:'scale(.85)'},{opacity:1,transform:`translateX(${tx}px) scale(1.07)`}],{duration:640,easing:E,fill:'both'});tags[k].animate([{transform:'translateX(-50%)'},{transform:`translateX(calc(-50% + ${tx}px))`}],{duration:640,easing:E,fill:'both'})}});
 await wait(680);st.busy=0;return picker(i)}
/* ---- picker = KIT kitPick «thẻ gỗ treo» (KIT §98, KK21): plaques hang BESIDE the chosen person, low, near her feet; tap = lift + line, tap again = choose. No private picker. ---- */
const anchorOf=f=>{const L=st.L,r=R(f),lr=R(L),ob=f.ob;return {x:r.left-lr.left+ob.l*r.width,y:r.top-lr.top+ob.t*r.height,w:(ob.r-ob.l)*r.width,h:(ob.b-ob.t)*r.height}};
async function closePk(){if(!st||!st.pk)return;const p=st.pk;st.pk=null;p.close();await wait(200)}
async function picker(i){const {L,figs,acts}=st;const f=figs[i];
 const avoid=figs.filter((x,k)=>k!==i).map(anchorOf);
 const P=kitPick.open({host:L,anchor:anchorOf(f),avoid,acts,dismiss:false,onPick:(id,act)=>{pickAct(act)}});st.pk=P;
 await wait(KIT_PLAQUE.dropMs+KIT_PLAQUE.stagger*acts.length+200);return P}
function tapPlaque(k){const b=st.pk&&st.pk.el.querySelectorAll('.kfoc-b')[k];if(b)b.click();return wait(30)}
async function pickAct(a){if(st.busy)return;st.busy=1;await wait(120);st.busy=0;
 if(/^Biếu/.test(a.n))return openRing();await closePk();st.lastAct=a.n}
/* ---- ring maths (shared kitRing: angle per slot, depth scale, softness, z order) ---- */
function geo(){const W=st.w,H=st.H,ip=st.ip;const tw=ip?104:94;return {W,H,cx:W/2,cy:H*(ip?.74:.66),Rx:Math.min(W*.40,ip?300:270),Ry:H*(ip?.06:.07),tw}}
function place(){const {tiles}=st;const N=tiles.length,g=geo();tiles.forEach((t,i)=>{let a=((i-st.rot)%N+N)%N;if(a>N/2)a-=N;const th=a*2*Math.PI/N,c=Math.cos(th),s=Math.sin(th),k=(1+c)/2;
  const sc=.48+.62*Math.pow(k,1.6),x=g.Rx*s,y=-g.Ry*c;t.style.transform=`translate(${(x-g.tw/2).toFixed(1)}px,${(y-g.tw*.6).toFixed(1)}px) scale(${sc.toFixed(3)})`;t.style.opacity=(.55+.45*k).toFixed(3);t.style.zIndex=Math.round(100+c*50);t.classList.toggle('md3-front',Math.abs(a)<.5);t.classList.toggle('md3-far',Math.abs(a)>1.5)})}
async function openRing(){if(st.open)return;st.open=1;await closePk();const {L,list}=st;const g=geo();
 const ring=document.createElement('div');ring.className='md3-ring';ring.style.cssText=`position:absolute;left:${g.cx}px;top:${g.cy}px;width:0;height:0;z-index:40;pointer-events:none`;L.appendChild(ring);st.ring=ring;
 st.tiles=list.map((it,i)=>{const t=document.createElement('div');t.className='md3-tile';t.style.cssText=`position:absolute;left:0;top:0;width:${g.tw}px;transform-origin:50% 50%;will-change:transform,opacity;pointer-events:auto`;
  t.innerHTML=kitItem({src:it.src,name:it.name,grade:it.grade,size:'md'});ring.appendChild(t);t.addEventListener('click',e=>{e.stopPropagation();turnTo(i)});return t});
 const band=document.createElement('div');band.style.cssText=`position:absolute;left:0;right:0;top:${g.cy-g.tw*1.3}px;height:${g.tw*2.1}px;z-index:35;pointer-events:auto;touch-action:none`;L.appendChild(band);st.band=band;
 let x0=0,last=0,lt=0,drag=0;band.addEventListener('pointerdown',e=>{drag=1;x0=last=e.clientX;lt=performance.now();st.v=0;band.setPointerCapture(e.pointerId)});
 band.addEventListener('pointermove',e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;st.rot-=dx/stepPx();st.v=-(dx/stepPx())/Math.max(1,now-lt);last=e.clientX;lt=now;place()});
 band.addEventListener('pointerup',e=>{drag=0;if(Math.abs(e.clientX-x0)<6){const hitT=document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.closest&&x.closest('.md3-tile'));if(hitT){const i=st.tiles.indexOf(hitT.closest('.md3-tile'));if(i>=0)turnTo(i)}return}fling(st.v)});
 const mk=(txt,cls,css,fn)=>{const b=document.createElement('button');b.className='kbtn '+cls;b.textContent=txt;b.style.cssText='position:absolute;z-index:45;pointer-events:auto;'+css;b.addEventListener('click',e=>{e.stopPropagation();fn()});L.appendChild(b);return b};
 const ab=st.ip?44:40;st.arL=mk('‹','',`left:${Math.max(4,g.cx-g.Rx-g.tw*.5-ab)}px;top:${g.cy-g.tw*.55}px;width:${ab}px;min-height:${ab}px;padding:0;font-size:1.4rem`,()=>turnBy(-1));
 st.arR=mk('›','',`left:${Math.min(g.W-ab-4,g.cx+g.Rx+g.tw*.5)}px;top:${g.cy-g.tw*.55}px;width:${ab}px;min-height:${ab}px;padding:0;font-size:1.4rem`,()=>turnBy(1));
 st.give=mk('Tặng','main',`left:${g.cx-60}px;top:${Math.min(g.cy+g.tw*1.05,g.H-(st.ip?44:40)-62)}px;width:120px;min-height:${st.ip?44:40}px`,()=>give());
 place();const N=st.tiles.length;st.tiles.forEach((t,i)=>{const fin=t.style.transform,op=t.style.opacity;t.animate([{transform:`translate(${-g.tw/2}px,${-g.tw*.6}px) scale(.1)`,opacity:0},{transform:fin,opacity:op}],{duration:420,delay:i*28,easing:'cubic-bezier(.2,1.3,.4,1)'})});
 [st.arL,st.arR,st.give].forEach(b=>b.animate([{opacity:0},{opacity:1}],{duration:260,delay:300,fill:'both'}));await wait(420+N*28)}
const stepPx=()=>{const g=geo();return g.Rx*2*Math.PI/st.tiles.length*.75};
let raf=0;function loop(fn){cancelAnimationFrame(raf);let lt=performance.now();const f=now=>{const dt=Math.min(48,now-lt);lt=now;if(fn(dt)!==false)raf=requestAnimationFrame(f);else raf=0};raf=requestAnimationFrame(f)}
function fling(v){st.v=v;return new Promise(res=>loop(dt=>{st.rot+=st.v*dt;st.v*=Math.pow(.94,dt/16.67);place();if(Math.abs(st.v)<.0009){snap().then(res);return false}}))}
function tween(to,ms){const from=st.rot;const t0=performance.now();return new Promise(res=>loop(()=>{const k=Math.min(1,(performance.now()-t0)/ms),e=1-Math.pow(1-k,3);st.rot=from+(to-from)*e;place();if(k>=1){res();return false}}))}
const snap=()=>tween(Math.round(st.rot),Math.round(180*MD3.pace()/1.75));
const turnBy=d=>tween(Math.round(st.rot)+d,Math.round(260*MD3.pace()/1.75));
function turnTo(i){const N=st.tiles.length;let d=((i-st.rot)%N+N)%N;if(d>N/2)d-=N;return tween(st.rot+d,Math.round(Math.min(700,220+Math.abs(d)*90)*MD3.pace()/1.75))}
function giftN(k){try{const r=st.P[st.sel];const g=giftVal(Object.assign({k},IT[k]),r);const v=typeof g==='object'&&g?(g.v!=null?g.v:g.aff!=null?g.aff:g.th):g;if(v!=null&&isFinite(v)&&+v>0)return Math.round(+v)}catch(e){}return BAL.dis.aff}
async function give(){const N=st.tiles.length;const fi=((Math.round(st.rot)%N)+N)%N;const t=st.tiles[fi];const f=st.figs[st.sel];const a=R(t),b=R(f),ob=f.ob;
 const dx=b.left+(ob.l+ob.r)/2*b.width-(a.left+a.width/2),dy=b.top+(ob.t+(ob.b-ob.t)*.42)*b.height-(a.top+a.height/2);const base=t.style.transform;
 st.give.animate([{transform:'scale(1)'},{transform:'scale(.93)'},{transform:'scale(1)'}],{duration:200});const FL=Math.round(560*MD3.pace()/1.75);
 t.animate([{transform:base},{transform:base+` translate(${dx*.4}px,${dy*.5-60}px) scale(1.15)`,offset:.45},{transform:base+` translate(${dx}px,${dy}px) scale(.35)`,opacity:.9,offset:.92},{transform:base+` translate(${dx}px,${dy}px) scale(.2)`,opacity:0}],{duration:FL,easing:'cubic-bezier(.4,0,.3,1)',fill:'both'});
 st.tiles.forEach((x,i)=>{if(i!==fi)x.animate([{opacity:x.style.opacity},{opacity:0,transform:x.style.transform+' scale(.3)'}],{duration:300,delay:120+Math.abs(i-fi)*15,fill:'both'})});
 [st.arL,st.arR,st.give].forEach(bb=>bb.animate([{opacity:1},{opacity:0}],{duration:200,fill:'both'}));
 await wait(FL);f.animate([{scale:1},{scale:1.03},{scale:1}],{duration:420});
 const lr=R(st.L);const cx=b.left-lr.left+(ob.l+ob.r)/2*b.width,cy=b.top-lr.top+(ob.t+(ob.b-ob.t)*.5)*b.height;
 const chip=document.createElement('div');chip.style.cssText=`position:absolute;left:${cx}px;top:${cy}px;transform:translateX(-50%);z-index:50;pointer-events:none`;chip.innerHTML=kitChip('Thiện cảm',giftN(st.list[fi].k));chip.firstElementChild.style.fontSize='1.15em';st.L.appendChild(chip);
 chip.animate([{opacity:0,transform:'translate(-50%,10px)'},{opacity:1,transform:'translate(-50%,0)',offset:.2},{opacity:1,transform:'translate(-50%,-26px)',offset:.8},{opacity:0,transform:'translate(-50%,-34px)'}],{duration:1600,fill:'both'});
 await wait(1700);const nm=st.list[fi].name;await close();return nm}
async function close(){if(!st)return;cancelAnimationFrame(raf);try{kitDim.off();if(st.pk)st.pk.destroy()}catch(e){}st.open=0;st=null;await MD3.cover(async()=>{kitScene.close(true);try{render()}catch(e){}await M4.settleStage(12000)})}
/* only the person she talks to counts: no picker part / tile / tag may cover THAT face (painted-bbox head band) */
function check(){if(!st||st.sel<0)return [];const els=[];if(st.pk&&st.pk.el)els.push(...st.pk.el.querySelectorAll('.kfoc-b,.kpk-post,.kpk-rail'));if(st.ring)els.push(...st.tiles);els.push(st.give,st.arL,st.arR,...st.tags);const f=st.figs[st.sel];
 const F=MD3.faceBoxes({figs:[f]});return els.filter(e=>e&&e.isConnected&&R(e).width>2&&F.some(b=>{const r=R(e);return !(r.right<=b.l||b.r<=r.left||r.bottom<=b.t||b.b<=r.top)})).map(e=>e.className.split(' ')[0])}
return {setup,enter,tapPerson,picker,pickAct,tapPlaque,openRing,fling,turnBy,turnTo,give,close,check,get st(){return st}}})();
