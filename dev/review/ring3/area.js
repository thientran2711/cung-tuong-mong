/* KAR v3 — RING-DESIGN-3 mock «KHU VƯỜN»: Ngự hoa viên = SECOND Dư đồ level (kitPalaceMap markup, owner 24/11 ~15:40Z) → one AREA scene.
   Injected into the REAL built game (host mode). Design only, never for main. Plan = dev/AREA_PLAN.md (areas, rules 1–6, BAL.area).
   People = the real j95 record of one buổi at Ngự hoa viên (names, plans, master→followers, known/stranger rule).
   Kit parts only: garden map = kitPalaceMap markup (.mapv.kpmv, .mspot.kpm-spot, .mlab, .kpm-list .btn.kpm-row, kitTam 'tạm');
   figures = the stage's own pictures (j59 / .j59sil stranger stand-in), plaque = j59tagHTML, caption = .kchip, picker buttons =
   kitFocus .kfoc-b markup (btnHTML copy), tabs = .pctabs/.pct, bubble = kitMoodSay.
   Motion = WAAPI transform/opacity only (compositor); dimming = cross-fade to a pre-filtered copy (no animated filter). */
window.KAR=(function(){
const st=()=>document.getElementById('stage');
const A=(window.BAL&&BAL.area)||{};const wait=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const kv=()=>document.documentElement.classList.contains('kv2')?'kv2':'kv1';
let L=null,BG=null,G=[],AREAS=[],cur=-1,fh=420,D=null,sel=null,selM=null,PK=null,anims=[],BGSRC='';
window.__karAn=(...x)=>an(...x);function an(el,kf,o){const a=el.animate(kf,Object.assign({fill:'forwards',easing:'cubic-bezier(.2,.7,.2,1)'},o));anims.push(a);if(anims.length>400)anims.splice(0,200);return a}
function geo(){const s=st(),r=s.getBoundingClientRect();const q=x=>{const e=document.querySelector(x);if(!e||getComputedStyle(e).display==='none'||!e.getBoundingClientRect().width)return null;const b=e.getBoundingClientRect();return {l:b.left-r.left,r:b.right-r.left}};
 const rl=q('#stage .k3p.kas')||q('#krail'),cl=kv()==='kv1'?null:q('.kshR');const rlR=rl&&rl.l>r.width/2;/* phone shell: the rail sits on the RIGHT */
 return {W:r.width,H:r.height,x0:(rl&&!rlR?rl.r:6)+6,x1:Math.min(cl?cl.l:r.width-6,rlR?rl.l:r.width-6)-6,feet:r.height*(A.feet||.9)}}
function css(){if(document.getElementById('kar-css'))return;const c=document.createElement('style');c.id='kar-css';c.textContent=`
html.karon #tokens,html.karon #mefig,html.karon #stage .kmemark,html.karon #j59metag,html.karon .j59more,html.karon .kspet,html.karon #tokens .tok{visibility:hidden!important}
html.kv1.karon .kshR{display:none!important}
html.karon .kfoc-mood:not(.kar-say){display:none!important}
#kar{position:absolute;inset:0;z-index:1;overflow:hidden;contain:layout paint}
#kar .kar-bg{position:absolute;left:0;top:0;background-size:100% 100%;will-change:transform;z-index:0}
#kar .kar-f{position:absolute;left:0;top:0;transform-origin:50% 100%;will-change:transform,opacity;cursor:pointer;contain:layout}
#kar .kar-f img{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
#kar .kar-f img.d{filter:brightness(.52) saturate(.55)}#kar .kar-f img.l{will-change:opacity}
#kar .kar-tag{position:absolute;left:50%;top:100%;transform:translateX(-50%);margin-top:2px;z-index:2}
#kar .kar-cap{position:absolute;transform:translate(-50%,-100%);white-space:nowrap;z-index:40;pointer-events:none}
#kar .kar-cap .kchip{font-size:14px;padding:4px 11px;box-shadow:0 2px 8px #0005}
#kar .kar-pk{position:absolute;z-index:60;--kfh:64px}#kar.kv2 .kar-pk{--kfh:72px}
#kar .kar-pk .kfoc-b{position:absolute;left:0;top:0;will-change:transform,opacity;contain:layout style}/* a lift re-lays out ONE plaque only */
#kar .kar-pk .kfoc-b.kar-min{--kfp:44px;height:58px;min-height:58px}
#kar .kar-pk .kfoc-b.kar-min .kfoc-t b{-webkit-line-clamp:3;max-height:3.3em;line-height:1.08}
#kar .kar-pk .kfoc-b.kar-min .kfoc-t small{display:none}
#kar .kar-pk .kfoc-b.kar-up .kfoc-t small{display:block}
#kar .kar-pk .kfoc-b.kar-up.kar-min{height:auto;min-height:58px;padding-top:4px;padding-bottom:4px}
#kar .kar-pk .kfoc-b.kar-rib{flex-direction:row-reverse;text-align:right;padding:2px 4px 2px 8px}
html body .game .mapv.kpmv.kside.kleather.kar-map>.mapsc>.mapw,html body .game .mapv.kpmv.kar-map>.mapsc>.mapw{width:min(100cqw,calc(100cqh * 1.7778))!important;aspect-ratio:16/9}.kar-map .mapimg{width:100%!important;height:100%!important;max-height:none!important}
#kar .kar-pk .pctabs{position:absolute;left:0;top:0;display:flex;gap:4px}`;document.head.appendChild(c)}
/* the kit fan button (copy of jfocus btnHTML: same classes, same parts) */
function btn(a){const sub=[a.word,a.ton?('Tốn '+a.ton):''].filter(Boolean);const pic=a.pic&&/^(https?:|img\/|data:)/.test(a.pic)?`<img class="kfoc-pic" alt="" src="${esc(a.pic)}" draggable="false">`:`<span class="kfoc-pic kfoc-ph"></span>`;
 return `<button type="button" class="kfoc-b${a.off?' kfoc-off kitoff':''}" data-id="${esc(a.id)}">${pic}<span class="kfoc-t"><b>${esc(a.n)}</b>${sub.length?`<small>${sub.map(x=>`<span>${esc(x)}</span>`).join(' · ')}</small>`:''}</span></button>`}
function mkFig(m){const e=document.createElement('div');e.className='kar-f tok fig';const src=m.src;
 e.innerHTML=`<img class="d" alt="" src="${esc(src)}"><img class="l" alt="" src="${esc(src)}"><span class="kar-tag kscn-tag">${m.tag||''}</span>`;
 m.el=e;m.lit=e.querySelector('img.l');m.tg=e.querySelector('.kar-tag');m.tg.style.setProperty('--tc',m.tc||'');m.tg.style.display='none';e.style.display='none';
 e.addEventListener('click',ev=>{ev.stopPropagation();onTap(m)});L.appendChild(e);return e}
/* group shapes, in figure-width units: master(s) front, followers behind both shoulders (owner ~07:58Z) */
function shape(g){const ms=g.masters,fs=g.fol;const out=[];
 if(ms.length===1){out.push({m:ms[0],dx:0,s:1,dy:0,z:3});fs.forEach((f,i)=>out.push({m:f,dx:(i%2?1:-1)*((A.folDx||.40)+.16*(i>>1)),s:A.folS||.86,dy:A.folDy||.035,z:1}))}
 else{ms.forEach((m,i)=>out.push({m,dx:(i-(ms.length-1)/2)*.95,s:1,dy:0,z:3,flip:i===ms.length-1&&ms.length===2}));
  fs.forEach((f,i)=>{const side=i%2?1:-1;out.push({m:f,dx:side*((ms.length-1)/2*.95+(A.folDx||.40)+.15*(i>>1)),s:A.folS||.86,dy:A.folDy||.035,z:1})})}
 return out}
function gw(g){const P=shape(g);let l=9,r=-9;P.forEach(p=>{const w=(p.m.asp||.32)*p.s;l=Math.min(l,p.dx*.32-w/2);r=Math.max(r,p.dx*.32+w/2)});g.P=P;g.wU=r-l;g.cU=(r+l)/2;return g.wU}
/* AREA_PLAN rules 1–6: purpose → area; plain walk → nết pull; Emperor route; overflow → neighbour by purpose, then «Lối đi». Nobody is sent away. */
function areaOf(g){const a=g.act;let i=AREAS.findIndex(x=>(x.acts||[]).indexOf(a)>=0&&!(a==='walk'||a==='ag_effort'));
 if(a==='seekemp'){/* rule 4: bold nết wait where he IS (route[kh]), others where he passes next */const R=A.route||[];const kh=window.__karKh||0;const bold=g.masters.some(m=>(m.net||[]).some(n=>/Kiêu ngạo|Tham vọng/.test(n))||(m.sac||0)>=((A.bold&&A.bold.sac)||75));
  const k=R[Math.min(R.length-1,kh+(bold?0:1))];i=AREAS.findIndex(x=>x.k===k)}
 if(i<0){/* rule 3: plain walk → strongest nết pull, ties → Vườn hoa */let best=-1,bs=0;AREAS.forEach((x,j)=>{const s=g.masters.reduce((t,m)=>t+(m.net||[]).filter(n=>(x.net||[]).indexOf(n)>=0).length,0);if(s>bs){bs=s;best=j}});
  i=best>=0?best:AREAS.findIndex(x=>x.k==='vuonhoa')}
 return Math.max(0,i)}
function assign(){const cap=kv()==='kv2'?(A.view&&A.view.kv2||4):(A.view&&A.view.kv1||3);const span=D.x1-D.x0,minGap=(A.gap||.06)*fh;
 AREAS.forEach(a=>{a.g=[];a.w=0});const fits=(a,g)=>a.g.length<cap&&a.w+g.wU*fh+(a.g.length+1)*minGap<=span;
 const ord=G.slice().sort((x,y)=>(y.pri||0)-(x.pri||0));
 for(const g of ord){const i=areaOf(g);let a=AREAS[i];g.want=a.k;
  if(!fits(a,g)){const nb=((A.near||{})[a.k]||[]).map(k=>AREAS.find(x=>x.k===k)).filter(Boolean);a=nb.find(x=>fits(x,g))||null;
   if(!a){a=AREAS.find(x=>x.extra&&fits(x,g));if(!a){a={k:'x'+AREAS.length,n:A.extraName||'Lối đi',x:.42,acts:[],extra:1,g:[],w:0,hs:{x:.30,y:.80,w:.22,h:.14}};AREAS.push(a)}}}
  a.g.push(g);a.w+=g.wU*fh;g.area=a;
  /* moved off the Emperor's spot by rule 6: she waits where he will pass next — the caption says so (no false «trước Hoàng thượng») */
  if(a.k!==g.want&&g.want==='ngudao'&&!g.masters.some(m=>m.kind==='emp'))g.cap='Đang chờ Hoàng thượng đi qua'}}
function bgSet(x,ms,from){const W=D.W,H=D.H,z=kv()==='kv2'?(A.zoom&&A.zoom.kv2||1.45):(A.zoom&&A.zoom.kv1||1);let bw=Math.max(W*z,H*(16/9)),bh=bw*9/16;if(bh<H){bh=H;bw=H*16/9}
 BG.style.width=bw+'px';BG.style.height=bh+'px';const tx=-(bw-W)*x,ty=-(bh-H);const t=`translate(${tx}px,${ty}px)`;if(ms){return an(BG,[{transform:from||BG.__t||t},{transform:t}],{duration:ms,easing:'cubic-bezier(.45,0,.25,1)'}).finished.then(()=>{BG.__t=t})}BG.style.transform=t;BG.__t=t}
function place(a){const n=a.g.length;const span=D.x1-D.x0;const tot=a.g.reduce((s,g)=>s+g.wU*fh,0);const gap=(span-tot)/(n+1);let x=D.x0+gap;
 a.g.forEach(g=>{const cx=x+g.wU*fh/2;g.cx=cx;g.top=1e9;g.P.forEach(p=>{const m=p.m,h=fh*p.s,w=h*(m.asp||.32),mx=cx+(p.dx*.32-g.cU)*fh,fy=D.feet-p.dy*D.H;
   m.x=mx-w/2;m.y=fy-h;m.tg.style.display=p.z===3?'block':'none';m.w=w;m.h=h;m.z=p.z;Object.assign(m.el.style,{width:w+'px',height:h+'px',zIndex:10+p.z,transform:`translate(${m.x}px,${m.y}px)`,display:'block'});m.el.__t=`translate(${m.x}px,${m.y}px)`;
   if(p.flip)m.el.querySelectorAll('img').forEach(i=>i.style.transform='scaleX(-1)');g.top=Math.min(g.top,m.y)});
  x+=g.wU*fh+gap;capFor(g)})}
function capFor(g){if(!g.cap)return;if(!g.capEl||!g.capEl.isConnected){g.capEl=document.createElement('div');g.capEl.className='kar-cap';g.capEl.innerHTML=`<span class="kchip ${g.drama?'r':'n'}">${esc(g.cap)}</span>`;L.appendChild(g.capEl)}
 g.capEl.style.left=Math.max(D.x0+70,Math.min(D.x1-70,g.cx))+'px';g.capEl.style.top=(g.top-6)+'px';g.capEl.style.display='block'}
/* MOCK-ONLY (KIT REQUEST 24/11 RING-DESIGN-4 #7b): the live kit rail (jrail paint) keeps the inline left/flex-direction that hudSlot() wrote while the stage was hidden
   (Dư đồ tab on Fold), so back on the stage it stands on the RIGHT over the place title («N 17 viên»). The kit's own slot is left:8px (jrail CSS) — the mock clears the
   stale inline values (= the kit default slot) and the people chip counts THIS area (kitArea feed, request #7). */
function railFix(){try{const kr=document.getElementById('krail');if(kr&&kr.parentNode===st()){kr.style.left='';kr.style.flexDirection=''}
 const a=AREAS[cur],c=document.querySelector('#krail .krailc .j59n');const tn=document.querySelector('#stage #kpname>span');if(a&&tn&&document.getElementById('kar')&&tn.textContent!=='Ngự hoa viên · '+a.n)tn.textContent='Ngự hoa viên · '+a.n;if(a&&c&&c.textContent!==String(count(a)))c.textContent=String(count(a))}catch(e){}}
function tagsFix(){railFix();try{const a=AREAS[cur];if(!a)return;const F=figsOf(a).filter(m=>m.tg.style.display!=='none'&&m.el.style.display!=='none');
 const pr=m=>(m===selM?0:sel&&m.g===sel?1:2)*100-(m.z||0);F.sort((x,y)=>pr(x)-pr(y));const keep=[];
 const meR=window.__karMeEl&&window.__karMeEl.getBoundingClientRect();
 F.forEach(m=>{m.tg.style.visibility='';const r=m.tg.getBoundingClientRect();const hit=keep.some(k=>!(r.right<k.left-2||r.left>k.right+2||r.bottom<k.top-2||r.top>k.bottom+2));
  if(hit)m.tg.style.visibility='hidden';else keep.push(r)})}catch(e){}}
function figsOf(a){return a.g.flatMap(g=>g.P.map(p=>p.m))}
function count(a){return a.g.reduce((s,g)=>s+g.P.length,0)}
/* ===== LEVEL 2: the garden map (kitPalaceMap markup; picture = the ONE existing garden painting as 'tạm' until Foreman C paints the bird's-eye map) ===== */
function mapHTML(){const chip=n=>n?`<i>${n} bóng người</i>`:`<i>vắng</i>`;const tot=AREAS.reduce((s,a)=>s+count(a),0);
 return `<div class="mapv kpmv kar-map" data-kpm="vuon"><div class="maptools"><span><button class="btn mz kpm-back" aria-label="Về Dư đồ">‹ Dư đồ</button></span><span class="past kpm-t"><b>Ngự hoa viên</b> · <em>${tot} bóng người</em></span></div>
 <div class="mapsc"><div class="mapw" style="width:100%"><img class="mapimg" src="${esc(BGSRC)}" alt="Ngự hoa viên">
 ${AREAS.map((a,i)=>{const b=a.hs;return `<button class="mspot kpm-spot" data-kar="${i}" title="${esc(a.n)}" style="left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%"><span class="mlab">${esc(a.n)}${chip(count(a))}</span></button>`}).join('')}
 ${typeof kitTam==='function'?kitTam(true):''}</div></div>
 <div class="kpm-list">${AREAS.map((a,i)=>`<button class="btn kpm-row" data-kar="${i}"><b class="kpm-rn">${esc(a.n)}</b><span class="kpm-rs">${count(a)?count(a)+' bóng người':'vắng người'}</span></button>`).join('')}</div></div>`}
function inject(){const v=document.querySelector('#panel .mapv:not(.kar-map)');if(!v)return null;const cls=v.className,sky=v.dataset.sky||'';v.outerHTML=mapHTML();const n=document.querySelector('#panel .kar-map');n.className=cls+' kpmv kar-map';if(sky)n.dataset.sky=sky;const mw=n.querySelector('.mapw');mw.style.setProperty('width','100%','important');mw.style.setProperty('height','auto','important');const mi=n.querySelector('.mapimg');['width:100%','height:auto','max-width:100%','max-height:none','min-height:0','min-width:0'].forEach(x=>{const [k,v]=x.split(':');mi.style.setProperty(k,v,'important')});/* the whole garden in view (the real painted map gets its own fit) */const m=document.querySelector('#panel .kar-map');
 m.querySelectorAll('[data-kar]').forEach(b=>b.addEventListener('click',ev=>{ev.stopPropagation();enter(+b.dataset.kar)}));m.querySelector('.kpm-back').addEventListener('click',ev=>{ev.stopPropagation();window.__karMapOn=0;render()});return m}
/* the game re-renders on its own timers: while the garden map is open, every render puts it back (mock only; the real build = kitPalaceMap slot 'vuon') */
(function(){if(window.__karR)return;window.__karR=1;const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(window.__karMapOn&&tab==='go')inject()}catch(e){}return r}})();
async function showMap(){await unsel();window.__karMapOn=1;tab='go';window.__mapList=false;render();await wait(60);const m=document.querySelector('#panel .kar-map')||inject();if(!m)return false;
 const sp=[...m.querySelectorAll('.kpm-spot')];sp.forEach((s,i)=>an(s,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320,delay:120+i*70}));return true}
/* ===== LEVEL 3: one area ===== */
function stageTitle(t){try{const sr=st().getBoundingClientRect();const e=[...st().querySelectorAll('*')].find(e=>e.children.length===0&&/^Ngự hoa viên/.test(e.textContent.trim())&&e.getBoundingClientRect().top-sr.top<70);if(e)e.textContent=t}catch(e){}}
function mount(){css();const old=document.getElementById('kar');if(old)old.remove();document.querySelectorAll('.kmsay,.kfoc-say,[class*=moodsay]').forEach(e=>e.remove());
 L=document.createElement('div');L.id='kar';L.className=kv();st().appendChild(L);document.documentElement.classList.add('karon');
 BG=document.createElement('div');BG.className='kar-bg';BG.style.backgroundImage=`url("${BGSRC}")`;L.appendChild(BG);D=geo();
 G.forEach(g=>{g.capEl=null;g.P.forEach(p=>mkFig(p.m))});L.addEventListener('click',()=>{if(!window.__karAuto)unsel()})}
async function enter(i){window.__karMapOn=0;{window.__k3quiet=1;tab='act';render();try{j77Tap('vuon')}catch(e){}await wait(160);try{j77Tap('vuon')}catch(e){}await wait(60)}/* phone shell: the here-tap = the game's own «show my place» (jk3 k3ShowPlace) */railFix();if(!document.querySelector('#stage #kar'))mount();else D=geo()
 const a=AREAS[i];cur=i;stageTitle('Ngự hoa viên · '+a.n);G.forEach(g=>{g.P.forEach(p=>p.m.el.style.display='none');if(g.capEl)g.capEl.style.display='none'});bgSet(a.x);
 place(a);tagsFix();/* RING-DESIGN-4: no see-through people — the camera settles on the whole layer (painting + people together, all opaque) */
 L.style.transformOrigin='50% 92%';an(L,[{transform:'scale(1.07)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.2,.7,.2,1)'});
 a.g.forEach(g=>{if(g.capEl)an(g.capEl,[{opacity:0},{opacity:1}],{duration:260,delay:420})});await wait(700)}
async function back(){await unsel();const a=AREAS[cur];if(a){a.g.forEach(g=>g.capEl&&an(g.capEl,[{opacity:1},{opacity:0}],{duration:200}));await an(L,[{transform:'none'},{transform:'scale(1.05)'}],{duration:240,easing:'ease-in'}).finished;figsOf(a).forEach(m=>m.el.style.display='none')}return showMap()}
/* focus: lit group / dim the rest (figures only; the painting keeps its brightness, owner 09:05Z) */
function dimSet(m,on,ms){const to=on?0:1;const from=+getComputedStyle(m.lit).opacity;an(m.lit,[{opacity:from},{opacity:to}],{duration:ms||280,easing:'ease-out'})}
async function pickGroup(g){if(sel===g)return;await unsel(true);sel=g;const a=AREAS[cur];
 a.g.forEach(x=>{x.P.forEach(p=>{dimSet(p.m,x!==g);p.m.tg.style.display=p.z===3?'block':'none'});if(x.capEl)an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:x===g?1:.35}],{duration:280})});
 g.P.forEach(p=>an(p.m.tg,[{opacity:0,transform:'translate(-50%,6px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:260}));tagsFix()}
async function unsel(keepGroup){await closePk();if(window.__karMeEl){const me=window.__karMeEl;window.__karMeEl=null;an(me,[{transform:me.__t},{transform:`translate(${D.W+20}px,${me.__y}px)`}],{duration:260,easing:'ease-in'});setTimeout(()=>me.remove(),280)}
 document.querySelectorAll('.kmsay,.kfoc-say,.kfoc-mood,[class*=moodsay]').forEach(e=>e.remove());const a=AREAS[cur];if(!a)return;
 if(selM){const m=selM;selM=null;an(m.el,[{transform:m.el.__t2||m.el.__t},{transform:m.el.__t}],{duration:420});sel&&sel.P.forEach(p=>{if(p.m!==m)an(p.m.el,[{transform:p.m.el.__t3||p.m.el.__t},{transform:p.m.el.__t}],{duration:360})});m.el.style.zIndex=10+m.z;await wait(430)}
 if(!keepGroup&&sel){a.g.forEach(x=>{x.P.forEach(p=>{dimSet(p.m,false);p.m.tg.style.display=p.z===3?'block':'none'});if(x.capEl)an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:1}],{duration:250})});sel=null}}
/* step out: she walks toward the player to the talk spot on the LEFT (speaker-left rule, owner 04:35Z); her group steps back */
async function stepOut(m){const g=m.g;if(sel!==g)await pickGroup(g);if(selM===m)return;if(selM)await unsel(true);selM=m;
 const k=A.stepK||1.12;const tcx=D.x0+(D.x1-D.x0)*(kv()==='kv2'?(A.spot&&A.spot.kv2||.30):(A.spot&&A.spot.kv1||.24));const tx=Math.max(D.x0+4,tcx-m.w*k/2),ty=Math.min(D.H-m.h*k-52,m.y+(A.stepY||.045)*D.H);
 const to=`translate(${tx+(m.w*(k-1))/2}px,${ty+m.h*(k-1)}px) scale(${k})`;m.el.__t2=to;m.el.style.zIndex=30;
 dimSet(m,false,200);AREAS[cur].g.forEach(x=>x.capEl&&an(x.capEl,[{opacity:+getComputedStyle(x.capEl).opacity},{opacity:0}],{duration:200}));AREAS[cur].g.forEach(x=>{if(x!==g)x.P.forEach(p=>{dimSet(p.m,true,300);p.m.tg.style.display='none'})});g.P.forEach(p=>{if(p.m!==m)p.m.tg.style.display='none'});
 const mid=`translate(${(m.x+tx)/2}px,${(m.y+ty)/2-8}px) scale(${(1+k)/2})`;an(m.el,[{transform:m.el.__t},{transform:mid,offset:.5},{transform:to}],{duration:A.walkMs||700});
 g.P.forEach(p=>{if(p.m===m)return;const q=p.m,t3=`translate(${q.x}px,${q.y-.02*D.H}px) scale(.95)`;q.el.__t3=t3;an(q.el,[{transform:q.el.__t},{transform:t3}],{duration:520});dimSet(q,true,420)});
 await wait((A.walkMs||700)+40);m.fx={x:tx,y:ty,w:m.w*k,h:m.h*k};m.tg.style.display='block';tagsFix()}
/* ===== the person-interaction picker — the 3 the owner named (15:40Z); all = kit .kfoc-b buttons + kit .pctabs; no frame, no card, never over a face =====
   'hang' THẺ GỖ TREO (her favourite): compact plaques drop from above beside her and sway to rest; tap = it lifts + its line shows; tap again = choose.
   'fan'  QUẠT NÚT: full kit buttons slide out from her hip along an arc, upright, all info at once.
   'rib'  NAN QUẠT GIẤY: the buttons are the ribs of a paper fan pinned at her hand: closed (stacked) → the fan OPENS (each rib turns about the pin);
          tap = that rib swings level and slides out with its line; tap again = choose. */
async function closePk(){if(!PK)return;const p=PK;PK=null;const B=[...p.querySelectorAll('.kfoc-b,.pctabs')];B.forEach(b=>an(b,[{opacity:1},{opacity:0}],{duration:160}));await wait(170);p.remove()}
function pkData(m){const q=a=>!/\?\?\?/.test((a.n||'')+' '+(a.word||''));const g=(m.acts&&m.acts.length?m.acts:[{k:'gt',n:'Giao thiệp',acts:[{id:'a',n:'Chào hỏi'},{id:'b',n:'Trò chuyện'}]}]);return g.map(x=>Object.assign({},x,{acts:(x.acts||[]).filter(q)})).filter(x=>x.acts.length)}
async function picker(m,kind){await closePk();const gs=pkData(m),acts=gs[0].acts.slice(0,A.pkMax||6),f=m.fx,K=kv();const bh=K==='kv2'?72:64,free=D.x1-(f.x+f.w)-10,col=Math.min(K==='kv2'?300:236,free);
 const p=document.createElement('div');p.className='kar-pk';p.style.cssText='left:0;top:0;width:100%;height:100%;pointer-events:none';L.appendChild(p);PK=p;p.dataset.kind=kind;
 const tb=document.createElement('div');tb.className='pctabs';tb.innerHTML=gs.slice(0,3).map((g,i)=>`<button type="button" class="pct${i?'':' on sel'}">${esc(g.n)}</button>`).join('');tb.style.pointerEvents='auto';p.appendChild(tb);
 const ease='cubic-bezier(.2,.8,.25,1.15)';const B=[];acts.forEach(a=>{const w=document.createElement('div');w.innerHTML=btn(a);const b=w.firstChild;b.style.pointerEvents='auto';p.appendChild(b);B.push(b)});
 let tx=0,ty=0;const Q2=[];const an=(el,kf,o)=>{const t=kf[kf.length-1].transform;if(t)el.style.transform=t;Q2.push([el,kf,o])};
 if(kind==='hang'){const cols=B.length>3?2:1,gx=8,cw=cols===2?Math.min((free-gx)/2,K==='kv2'?200:168):Math.min(col,K==='kv2'?240:200);const x0=f.x+f.w+6;const rows=Math.ceil(B.length/cols);const y0=Math.max(64,Math.min(f.y+f.h*(A.pkY||.44),f.y+f.h*.97-rows*(58+12)));
  B.forEach((b,i)=>{b.classList.add('kar-min');b.style.width=cw+'px';b.style.transformOrigin='50% -60px';const c=i%cols,r=(i/cols)|0;const bx=x0+c*(cw+gx),by=y0+r*(58+12);b.__x=bx;b.__y=by;
   an(b,[{transform:`translate(${bx}px,${by-D.H*.45}px) rotate(8deg)`,opacity:0},{transform:`translate(${bx}px,${by+5}px) rotate(-5deg)`,opacity:1,offset:.55},{transform:`translate(${bx}px,${by}px) rotate(2.5deg)`,offset:.8},{transform:`translate(${bx}px,${by}px) rotate(0deg)`,opacity:1}],{duration:880,delay:i*80,easing:'ease-out'})});
  tx=x0;ty=y0-44}
 else if(kind==='fan'){const n=B.length,R=Math.min(f.h*.42,(n*bh*1.02)/1.75),top=Math.max(64,Math.min(f.y+f.h*(A.pkY||.44)-bh*.2,f.y+f.h*.97-f.h*.52-bh));const hipX=f.x+f.w*.72,hipY=f.y+f.h*.50;
  B.forEach((b,i)=>{b.style.width=col+'px';const t=n>1?i/(n-1):.5,ang=(-50+100*t)*Math.PI/180;const bx=f.x+f.w*.62+Math.cos(ang)*R*.55,by=top+(f.h*.52)*t-bh/2;b.__x=bx;b.__y=by;
   an(b,[{transform:`translate(${hipX}px,${hipY-bh/2}px) scale(.25)`,opacity:0},{transform:`translate(${bx}px,${by}px)`,opacity:1}],{duration:340,delay:60+i*45,easing:ease})});
  tx=f.x+f.w*.62;ty=top-bh*.55-36}
 else{/* rib: pin at her hand; ribs fan out to the right; each button's left edge sits r0 from the pin */const n=B.length,span=Math.min(78,14*(n-1)),r0=K==='kv2'?70:46,len=Math.min(col+20,K==='kv2'?270:220),a0=-8;
  const px=f.x+f.w*.66,py=f.y+f.h*.50;
  B.forEach((b,i)=>{b.classList.add('kar-min','kar-rib');b.style.width=len+'px';const ang=n>1?a0+span*i/(n-1):0;b.__ang=ang;b.style.transformOrigin=`${-r0}px 26px`;const bx=px+r0,by=py-26;b.__x=bx;b.__y=by;
   b.style.zIndex=String(10+i);an(b,[{transform:`translate(${bx}px,${by}px) rotate(${a0-8}deg) scaleX(.2)`,opacity:0},{transform:`translate(${bx}px,${by}px) rotate(${a0}deg)`,opacity:1,offset:.25},{transform:`translate(${bx}px,${by}px) rotate(${ang}deg)`,opacity:1}],{duration:700,delay:40,easing:'cubic-bezier(.3,.7,.25,1)'})});
  tx=px+r0;ty=py-(r0+len)*Math.sin(-a0*Math.PI/180)-26-44;if(ty<44)ty=44}
 tb.style.transform=`translate(${tx}px,${ty}px)`;an(tb,[{opacity:0,transform:`translate(${tx}px,${ty+6}px)`},{opacity:1,transform:`translate(${tx}px,${ty}px)`}],{duration:220,delay:300});
 /* never over a face (OD 15:30Z/MAIN): measured at the final pose, the whole picker drops below every face it would cover (bounded by the floor) */
 {const fr=[...L.querySelectorAll('.kar-f')].filter(e=>e.style.display!=='none'&&e.offsetParent).map(e=>{const r=e.getBoundingClientRect();return {l:r.left+r.width*.3,r:r.right-r.width*.3,t:r.top+r.height*.02,b:r.top+r.height*.19}});
  const pr=[...B,tb].map(e=>e.getBoundingClientRect());const sr=L.getBoundingClientRect();let dy=0;
  for(let it=0;it<4;it++){let need=0;pr.forEach(q=>fr.forEach(fc=>{if(q.right>fc.l&&q.left<fc.r&&q.bottom+dy>fc.t&&q.top+dy<fc.b)need=Math.max(need,fc.b+6-(q.top+dy))}));if(!need)break;dy+=need}
  const maxB=Math.max(...pr.map(q=>q.bottom));dy=Math.min(dy,Math.max(0,sr.bottom-6-maxB));if(dy>0)p.style.transform=`translateY(${dy.toFixed(1)}px)`}
 Q2.forEach(x=>window.__karAn(...x));
 B.forEach(b=>b.addEventListener('click',ev=>{ev.stopPropagation();lift(b,kind)}));await wait(kind==='hang'?900+B.length*80:800);return B}
function lift(b,kind){const p=PK;if(!p)return;if(b.classList.contains('kar-up')){b.dispatchEvent(new CustomEvent('karpick',{bubbles:true}));return}
 p.querySelectorAll('.kar-up').forEach(x=>{x.classList.remove('kar-up');if(kind==='rib'){x.style.zIndex=x.__z||'';an(x,[{transform:`translate(${x.__x}px,${x.__y}px) rotate(${x.__ang}deg)`}],{duration:220})}else if(kind==='hang')an(x,[{transform:`translate(${x.__x}px,${x.__y}px)`}],{duration:200})});
 b.classList.add('kar-up');
 if(kind==='hang')an(b,[{transform:`translate(${b.__x}px,${b.__y}px)`},{transform:`translate(${b.__x}px,${b.__y-10}px) scale(1.04)`}],{duration:220});
 else if(kind==='rib'){b.__z=b.style.zIndex;b.style.zIndex='40';an(b,[{transform:`translate(${b.__x}px,${b.__y}px) rotate(${b.__ang}deg)`},{transform:`translate(${b.__x+16}px,${b.__y}px) rotate(0deg) scale(1.05)`}],{duration:260,easing:'cubic-bezier(.2,.8,.25,1.1)'})}}
/* NPC line (kit bubble) + her own figure steps in on the right (speaker left / her right) */
async function talk(m,text){await closePk();const me=document.createElement('div');me.className='kar-f';const src=window.__karMe;me.innerHTML=`<img class="l" alt="" src="${esc(src)}">`;
 const f=m.fx,h=f.h,w=h*(window.__karMeAsp||.32);const x=Math.min(D.x1-w-6,Math.max(f.x+f.w+D.W*.06,D.x1-w-D.W*.06)),y=f.y;Object.assign(me.style,{width:w+'px',height:h+'px',zIndex:31});L.appendChild(me);window.__karMeEl=me;
 me.__t=`translate(${x}px,${y}px)`;me.__y=y;an(me,[{transform:`translate(${D.W+20}px,${y}px)`},{transform:me.__t}],{duration:650});await wait(700);tagsFix();
 if(typeof kitMoodSay==='function'){try{const b=kitMoodSay(m.el.querySelector('img.l'),text,{hold:6000});const e=b&&b.classList?b:[...document.querySelectorAll('.kfoc-mood')].pop();if(e)e.classList.add('kar-say')}catch(e){}}return me}
function onTap(m){if(window.__karAuto)return;if(!sel||sel!==m.g)pickGroup(m.g);else stepOut(m).then(()=>picker(m,window.__karPk||'hang'))}
function init(o){css();cur=-1;sel=selM=null;G=o.groups;BGSRC=o.bg;fh=o.fh;AREAS=o.areas.map(a=>Object.assign({},a));G.forEach(g=>{g.masters.concat(g.fol).forEach(m=>{m.g=g})});
 G.forEach(gw);mount();assign();
 return {D:[D.x0,D.x1,D.W,D.H].map(Math.round),fh:Math.round(fh),areas:AREAS.map(a=>({k:a.k,n:a.n,want:G.filter(g=>g.want===a.k).length,groups:a.g.map(g=>g.masters.map(m=>m.name).join('+')+(g.fol.length?' (+'+g.fol.length+')':'')+' ['+g.act+']'),people:count(a)}))}}
return {init,showMap,enter,back,pickGroup,stepOut,picker,lift,talk,unsel,closePk,get areas(){return AREAS},get groups(){return G},get cur(){return cur},get D(){return D}}})();
