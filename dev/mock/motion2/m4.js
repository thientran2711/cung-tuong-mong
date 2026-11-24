/* MẪU 4 «bay về túi» (owner OD 24/11 ~15:15Z: NO flip card; the normal kit result frame shows as today, then each change flies ONE BY ONE to its HUD cell / Tư trang tab).
   Reused kit parts: resultShow (real result card, seal, bars), the kit float chip .kmfl (j93 kitResultFx — today all float up AT ONCE; here they travel one by one),
   real HUD cells .kst (#hud-*), kitFlyItem (j93) for a received item → Tư trang tab + km-pulse. NOT a new part: KIT REQUEST = extend KIT §57.1 kitStatFx (jstatfx.js, already queues «Danh +2» labels one every ~0.7 s): (a) the label starts AT its row in the result card (from: DOMRect, already an option), (b) the cell keeps its OLD number until its label lands, then updates + pulses, (c) timings below.
   Timing from BAL (proposal: BAL.reveal.fly = 300*BAL.pace, flyGap = BAL.reveal.list/8, flyPre = BAL.reveal.pause*.6): at today's pace 1.75 = 525 ms per flight + 77 ms gap ≈ 0.6 s per change, first flight 735 ms after the frame. Tap anywhere = finish at once. */
window.M4=(function(){const {wait,R}=MD2;let cur=null;
const cellOf=n=>[...document.querySelectorAll('.kst')].find(e=>e.getBoundingClientRect().width>0&&(e.querySelector('.kstl')||{}).textContent.trim()===n);
async function run(o){o=o||{};MD2.ensureCss();const P=MD2.pace();const RV=BAL.reveal;const FLY=o.fly||Math.round(300*P),GAP=o.gap!=null?o.gap:Math.round(RV.list/8),PRE=o.pre!=null?o.pre:Math.round(RV.pause*.6);
 const V=e=>e.querySelector('.kstv');const old={};document.querySelectorAll('.kst').forEach(e=>{if(e.id&&V(e)&&R(e).width>0)old[e.id]=V(e).textContent});
 /* today three systems fire AT ONCE (jstatfx .ksfl HUD floats, j93 .kmfls card floats, jfx/jkrev kfhit cell flashes) — kitFlyTo replaces them (law 11 group); the mock mutes them */
 const mute=new MutationObserver(()=>{document.querySelectorAll('.ksfl,.kmfls').forEach(e=>e.remove());document.querySelectorAll('.kst[class*=kfhit]').forEach(e=>[...e.classList].filter(c=>c.startsWith('kfhit')).forEach(c=>e.classList.remove(c)))});mute.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
 const ksf0=window.kitStatFx;window.kitStatFx=function(){};/* mock: §57.1 is what this extends; its own all-cells-at-once number update is held off */
 const b=rsnap();o.mut();resultShow(o.title,b,o.ok!==false);
 const card=document.getElementById('rtoast');document.querySelectorAll('.kmfls').forEach(e=>e.remove());
 /* hold the HUD at the OLD values until each change lands */
 const nw={};document.querySelectorAll('.kst').forEach(e=>{if(e.id&&old[e.id]!=null&&V(e)&&R(e).width>0&&e.dataset.k&&S[e.dataset.k]!=null){nw[e.id]=old[e.id].replace(/-?\d+/,String(Math.round(S[e.dataset.k])))}});document.querySelectorAll('.kst').forEach(e=>{if(nw[e.id]!=null&&V(e))V(e).textContent=old[e.id]});
 const LAND=new Set();const all=id=>document.querySelectorAll('[id="'+id+'"]');const hold=new MutationObserver(()=>{for(const id in nw)for(const e of all(id)){const v=V(e);if(!v)continue;const want=LAND.has(id)?nw[id]:old[id];if(v.textContent!==want)v.textContent=want}});hold.observe(document.body,{subtree:true,childList:true,characterData:true});
 const rows=[...card.querySelectorAll('.kitem .ef')].map(ef=>{const m=ef.textContent.match(/^(.*?)\s+(-?\d+)→(-?\d+)/);if(!m)return null;const d=+m[3]-+m[2];const c=cellOf(m[1].trim());return c&&d?{ef,n:m[1].trim(),d,c}:null}).filter(Boolean);
 let done=false;const anims=[];const land=x=>{if(x.landed)return;x.landed=1;LAND.add(x.c.id);all(x.c.id).forEach(e=>{if(V(e)&&nw[x.c.id]!=null)V(e).textContent=nw[x.c.id]});x.c=cellOf(x.n)||x.c;x.c.animate([{transform:'scale(1)'},{transform:'scale(1.16)',offset:.35},{transform:'scale(1)'}],{duration:Math.round(RV.shelf),easing:'ease-out'});
  x.ef.animate([{opacity:1},{opacity:.55}],{duration:200,fill:'both'})};
 const finish=()=>{if(done)return;done=true;rows.forEach(x=>LAND.add(x.c.id));anims.forEach(a=>{try{a.finish()}catch(e){}});document.querySelectorAll('.md2-fly').forEach(e=>e.remove());rows.forEach(land);Object.keys(nw).forEach(id=>all(id).forEach(e=>{if(V(e))V(e).textContent=nw[id]}))};
 const tap=()=>finish();setTimeout(()=>document.addEventListener('pointerdown',tap,{once:true,capture:true}),50);cur={finish,rows};
 await wait(PRE);
 for(const x of rows){if(done)break;x.c=cellOf(x.n)||x.c;const a=R(x.ef),z=R(x.c);const chip=document.createElement('span');chip.className='kmfl md2-fly '+(x.d>0?'g':'r');chip.textContent=`${x.n} ${x.d>0?'+':'−'}${Math.abs(x.d)}`;
  chip.style.animation='none';chip.style.position='fixed';document.body.appendChild(chip);const cr=R(chip);
  const x0=a.left+a.width/2-cr.width/2,y0=a.top+a.height/2-cr.height/2,x1=z.left+z.width/2-cr.width/2,y1=z.top+z.height/2-cr.height/2;const lift=Math.min(90,Math.abs(y1-y0)*.25+30);
  const an=chip.animate([{transform:`translate(${x0}px,${y0}px) scale(1)`,opacity:0},{transform:`translate(${x0}px,${y0-14}px) scale(1.12)`,opacity:1,offset:.15},
   {transform:`translate(${(x0+x1)/2}px,${Math.min(y0,y1)-lift}px) scale(1)`,opacity:1,offset:.55},{transform:`translate(${x1}px,${y1}px) scale(.7)`,opacity:1,offset:.92},{transform:`translate(${x1}px,${y1}px) scale(.6)`,opacity:0}],
   {duration:FLY,easing:'cubic-bezier(.4,0,.3,1)',fill:'both'});anims.push(an);
  await new Promise(r=>{an.onfinish=r;an.oncancel=r;setTimeout(r,FLY+80)});chip.remove();land(x);if(!done)await wait(GAP)}
 if(!done&&o.item){try{kitFlyItem(o.item)}catch(e){}await wait(Math.round(900*P)+80)}
 if(!done)done=true;hold.disconnect();window.kitStatFx=ksf0;setTimeout(()=>mute.disconnect(),400);document.removeEventListener('pointerdown',tap,{capture:true});return {n:rows.length,each:FLY+GAP}}
return {run,get cur(){return cur}}})();
