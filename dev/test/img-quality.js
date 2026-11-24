/* img-quality.js — audit of every person picture on screen (portraits, figures, silhouettes).
   usage: node dev/test/img-quality.js <baseURL e.g. http://127.0.0.1:8765/index.html> <outdir> [sizes "755x1000@2,1180x820@2"] [md path]
   (on a slow machine run one size per process into the same <outdir>: the report merges the sizes already there)
   env: IQ_ONLY=<regex on screen names> to run a subset, IQ_SKIP=<regex> to leave screens out (slow line: IQ_SKIP='lạ · Danh mục'); IQ_SHOTS=1 for screenshots (off by default: disk); IQ_CARDS=8 cards per strip tab, IQ_PLACES=6 places.
   Walks the screens of a NEW life (consort road; strangers everywhere) and of the same life once everyone is known:
   top bar + Hoàng thượng / Thái hậu / Hoàng hậu chips, the stage at every place with people (+ the card of each person tapped on
   the stage), every tab (Hậu cung strip + card of EVERY consort, Cung nhân strip + card of EVERY servant, Giao tình, Hoàng tự,
   Phe, Dư đồ, Tư trang, Mệnh truyện), Hoàng thượng card, a person dialog, the week book (Sổ tuần), the title / Luân hồi page,
   the co-op lobby, and a CATALOGUE: the kit card portrait (pcPort, at the live card cell width) and the small frame (mdH sm) of
   every person of the life (consorts, maids, mamas, eunuchs, Tổng quản, thái y, men, officials, công tử, princes/princesses,
   Thái hậu, Hoàng thượng) at the three reveal stages (0 người lạ, 1 thấy mặt, 3 quen biết).
   For every <img> / background-image of a person it records the source, natural size, shown size × devicePixelRatio → upscale,
   and how much of the face box is inside the visible clip (object-fit / object-position / overflow / clip-path).
   Flags: UPSCALE (> 1.25: blurry) · FACE_FALLBACK (old face-*.webp shown) · HALF_FACE (< 85 % of the face visible)
          · BROKEN (404 / not decoded) · BLUR (a CSS blur filter on a real face).
   Slow machines: one browser, one page per size, long timeouts, reduced motion, image-complete polls instead of fixed sleeps.
   Writes <outdir>/img-quality.json, screenshots <outdir>/<w>-<screen>.jpg and the table <md path> (default dev/test/IMG_QUALITY.md).
   Exit 1 when anything is flagged or a page error / 404 happened. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs'),path=require('path');
const [,,BASE,OUT,SZS,MD]=process.argv;const MERGE=BASE==='--merge';
if(!BASE||!OUT){console.error('usage: node dev/test/img-quality.js <baseURL> <outdir> [sizes] [md]');process.exit(2)}
const SIZES=MERGE?[]:(SZS||'755x1000@2,1180x820@2').split(',').map(s=>{const [wh,d]=s.split('@');const [w,h]=wh.split('x').map(Number);return{w,h,dpr:+(d||1),tag:s}});
const MDP=MD||path.join(__dirname,'IMG_QUALITY.md');fs.mkdirSync(OUT,{recursive:true});
const UP=1.25,FACEMIN=.85,ONLY0=process.env.IQ_ONLY?new RegExp(process.env.IQ_ONLY):null,SKIP=process.env.IQ_SKIP?new RegExp(process.env.IQ_SKIP):null,ONLY=(ONLY0||SKIP)?{test:n=>(!ONLY0||ONLY0.test(n))&&!(SKIP&&SKIP.test(n))}:null,SHOTS=process.env.IQ_SHOTS==='1';

/* ---- in-page measurement: every person picture visible on screen ---- */
function measure(screen){
 const dpr=devicePixelRatio,VW=innerWidth,VH=innerHeight;const R=[];
 const PERSON=/(^|\/)(por|fig|face)-[^/]*\.webp|kit\/unknown-[^/]*\.webp/;
 /* face box inside each kind of picture, fractions of the natural picture (x0,y0,x1,y1)
    por (porcrop: eye line 40 %, face 36 % wide, centred) → x .32–.68, y .24–.60 · old face-* 256² → x .28–.72, y .18–.70
    grey silhouette 360x480 → head x .33–.67, y .05–.50 · fig / stage silhouette: head = top 13 % of the picture, centred */
 const FACE={por:[.32,.24,.68,.60],face:[.28,.18,.72,.70],unk:[.33,.05,.67,.50],fig:[.30,.01,.70,.13]};
 const kindOf=s=>/kit\/unknown-fig/.test(s)?'fig':/kit\/unknown/.test(s)?'unk':/(^|\/)por-/.test(s)?'por':/(^|\/)face-/.test(s)?'face':'fig';
 const inset=(el,b,r)=>{const cp=getComputedStyle(el).clipPath;const m=/^inset\(([^)]*)\)/.exec(cp||'');if(!m)return r;const v=m[1].split(/\s+round\s+/)[0].trim().split(/\s+/);
  const q=[v[0],v[1]||v[0],v[2]||v[0],v[3]||v[1]||v[0]].map((x,i)=>/%$/.test(x)?parseFloat(x)/100*((i%2)?b.width:b.height):parseFloat(x)||0);
  return{l:Math.max(r.l,b.left+q[3]),t:Math.max(r.t,b.top+q[0]),r:Math.min(r.r,b.right-q[1]),b:Math.min(r.b,b.bottom-q[2])}};
 const SC={cut:0};const clipRect=el=>{SC.cut=0;let r={l:-1e9,t:-1e9,r:1e9,b:1e9};r=inset(el,el.getBoundingClientRect(),r);
  for(let e=el.parentElement;e&&e!==document.documentElement;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none')return null;
   const b=e.getBoundingClientRect();if(cs.overflowX!=='visible'||cs.overflowY!=='visible'||cs.contain.includes('paint'))r={l:Math.max(r.l,b.left),t:Math.max(r.t,b.top),r:Math.min(r.r,b.right),b:Math.min(r.b,b.bottom)};
   /* a list scrolled so the picture is half out of its scroll box is not a crop fault */
   if(/auto|scroll/.test(cs.overflowY+cs.overflowX)){const m=el.getBoundingClientRect();if(m.top<b.top-1||m.bottom>b.bottom+1||m.left<b.left-1||m.right>b.right+1)SC.cut=1}
   r=inset(e,b,r)}
  return{l:Math.max(r.l,0),t:Math.max(r.t,0),r:Math.min(r.r,VW),b:Math.min(r.b,VH)}};
 const visible=el=>{for(let e=el;e;e=e.parentElement){if(e.hidden)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<.05)return false}return true};
 /* covered by an overlay (loading screen, roulette): the centre point must hit the picture or its frame */
 const onTop=(el,box)=>{const x=Math.min(VW-1,Math.max(0,box.left+box.width/2)),y=Math.min(VH-1,Math.max(0,box.top+box.height*.4));const h=document.elementFromPoint(x,y);if(!h)return false;
  const host=el.closest('.pcp,.md,.tok,.kpod-fig,.kesf,figure,.kin')||el.parentElement;return h===el||el.contains(h)||(host&&host.contains(h))||h.contains(el)};
 const who=el=>{let t='';const card=el.closest('.pc');const pcp=el.closest('.pcp,.md');
  if(pcp&&pcp.getAttribute('title'))t=pcp.getAttribute('title');
  if(!t){const f=el.closest('[data-iqwho]');if(f)t=f.getAttribute('data-iqwho')}
  if(!t){const b=el.closest('button');if(b)t=b.innerText}
  if(!t&&card){const n=card.querySelector('.pcn,h2,h3,b');if(n)t=n.textContent}
  if(!t){const tok=el.closest('.tok');if(tok)t=tok.innerText}
  if(!t){const fig=el.closest('figure');if(fig)t=fig.innerText}
  if(!t)t=el.getAttribute('alt')||'';return t.replace(/\s+/g,' ').trim().slice(0,40)};
 const place=el=>{const c=el.closest('#iqcat,#modal,#kpop,#pop,.kbook,#stage,#hud,#hud2,#kcchips,#panel,#title,#kroul,body');return c?(c.id||String(c.className).split(' ')[0]):''};
 const one=(el,src,nw,nh,box,fit,pos,isBg)=>{
  if(box.width<4||box.height<4)return;if(box.right<0||box.bottom<0||box.left>VW||box.top>VH)return;const cr=clipRect(el);if(!cr)return;
  if(cr.r-cr.l<2||cr.b-cr.t<2)return;if(!onTop(el,box))return;
  const k=kindOf(src);let dw,dh,dx,dy;
  if(!nw||!nh){R.push({screen,who:who(el),src:src.replace(/^.*?img\//,'img/'),k,nw:0,nh:0,cssW:Math.round(box.width),cssH:Math.round(box.height),scale:0,face:0,onScr:1,where:place(el),broken:1});return}
  const fitMode=fit||'fill';
  if(fitMode==='cover'||fitMode==='contain'||fitMode==='scale-down'){let s=fitMode==='cover'?Math.max(box.width/nw,box.height/nh):Math.min(box.width/nw,box.height/nh);if(fitMode==='scale-down')s=Math.min(s,1);dw=nw*s;dh=nh*s;
   const P=(pos||'50% 50%').split(' ').map(v=>/%$/.test(v)?parseFloat(v)/100:v==='top'||v==='left'?0:v==='bottom'||v==='right'?1:/px$/.test(v)?NaN:.5);
   const px=P[0],py=P.length>1?P[1]:.5;dx=box.left+(isNaN(px)?parseFloat((pos||'').split(' ')[0]):(box.width-dw)*px);dy=box.top+(isNaN(py)?parseFloat((pos||'').split(' ')[1]):(box.height-dh)*py)}
  else if(fitMode==='none'){dw=nw;dh=nh;dx=box.left+(box.width-nw)/2;dy=box.top+(box.height-nh)/2}
  else{dw=box.width;dh=box.height;dx=box.left;dy=box.top}
  const scale=Math.max(dw*dpr/nw,dh*dpr/nh);
  const F=FACE[k];const fx0=dx+F[0]*dw,fy0=dy+F[1]*dh,fx1=dx+F[2]*dw,fy1=dy+F[3]*dh;
  const vis=Math.max(0,Math.min(fx1,cr.r,box.right)-Math.max(fx0,cr.l,box.left))*Math.max(0,Math.min(fy1,cr.b,box.bottom)-Math.max(fy0,cr.t,box.top));
  const face=vis/((fx1-fx0)*(fy1-fy0));
  /* judge the crop only for pictures fully inside the viewport and not clipped by a scrolling list (a card scrolled half out is not a crop fault) */
  const onScr=SC.cut?0:(Math.min(box.right,VW)-Math.max(box.left,0))*(Math.min(box.bottom,VH)-Math.max(box.top,0))/(box.width*box.height);
  let filt='';for(let e=el;e&&e!==document.body;e=e.parentElement){const f=getComputedStyle(e).filter;if(f&&f!=='none')filt+=f+' '}
  R.push({screen,who:who(el),src:src.replace(/^.*?img\//,'img/'),k,nw,nh,cssW:Math.round(box.width),cssH:Math.round(box.height),scale:+scale.toFixed(2),face:+face.toFixed(2),onScr:+onScr.toFixed(2),fit:fitMode,where:place(el),bg:isBg?1:0,filter:filt.trim()})};
 document.querySelectorAll('img').forEach(im=>{const src=im.currentSrc||im.src||'';if(!PERSON.test(src)||!visible(im))return;
  const cs=getComputedStyle(im);const box=im.getBoundingClientRect();
  if(im.complete&&im.naturalWidth===0){one(im,src,0,0,box,'',null,0);return}
  const pl=parseFloat(cs.paddingLeft)+parseFloat(cs.borderLeftWidth),pr=parseFloat(cs.paddingRight)+parseFloat(cs.borderRightWidth),pt=parseFloat(cs.paddingTop)+parseFloat(cs.borderTopWidth),pb=parseFloat(cs.paddingBottom)+parseFloat(cs.borderBottomWidth);
  const sx=box.width/(im.offsetWidth||box.width),sy=box.height/(im.offsetHeight||box.height);
  const cb={left:box.left+pl*sx,top:box.top+pt*sy,width:box.width-(pl+pr)*sx,height:box.height-(pt+pb)*sy};cb.right=cb.left+cb.width;cb.bottom=cb.top+cb.height;
  one(im,src,im.naturalWidth,im.naturalHeight,cb,cs.objectFit,cs.objectPosition,0)});
 document.querySelectorAll('body *').forEach(el=>{if(el.tagName==='IMG')return;const cs=getComputedStyle(el);const bi=cs.backgroundImage;if(!bi||bi==='none')return;
  const m=/url\("?([^")]+)"?\)/.exec(bi);if(!m||!PERSON.test(m[1])||!visible(el))return;const box=el.getBoundingClientRect();
  const n=window.__IQN&&window.__IQN[m[1]];const sz=cs.backgroundSize;const fit=sz==='cover'?'cover':sz==='contain'?'contain':'fill';
  one(el,m[1],n?n[0]:0,n?n[1]:0,box,fit,cs.backgroundPosition,1)});
 return R}

async function bgSizes(p){await p.evaluate(async()=>{window.__IQN=window.__IQN||{};const PERSON=/(^|\/)(por|fig|face)-[^/]*\.webp|kit\/unknown-[^/]*\.webp/;const L=[];
 document.querySelectorAll('body *').forEach(el=>{const bi=getComputedStyle(el).backgroundImage;const m=bi&&/url\("?([^")]+)"?\)/.exec(bi);if(m&&PERSON.test(m[1])&&!(m[1] in window.__IQN))L.push(m[1])});
 await Promise.all([...new Set(L)].map(u=>new Promise(r=>{const i=new Image();i.onload=()=>{window.__IQN[u]=[i.naturalWidth,i.naturalHeight];r()};i.onerror=()=>{window.__IQN[u]=null;r()};i.src=u;setTimeout(r,8000)})))})}
/* wait until every picture has loaded and the game's own "portrait loaded → re-render" timers (250 ms) have run */
async function settle(p,ms){await p.waitForTimeout(ms||500);for(let i=0;i<3;i++){try{await p.waitForFunction(()=>[...document.images].every(i=>i.complete),null,{timeout:30000})}catch(e){}await p.waitForTimeout(400)}}

/* ---- in-page helpers (installed once per page) ---- */
function helpers(){
 const W=window;
 W.__iqClean=()=>{const r=document.getElementById('kroul');if(r){const k=r.querySelector('.krskip');try{k&&k.click()}catch(e){}r.remove()}try{Q.length=0}catch(e){}
  for(const id of ['modal','kpop','pop']){const m=document.getElementById(id);if(m&&id==='modal')m.hidden=true;else if(m)m.remove()}
  const c=document.getElementById('iqcat');if(c)c.remove();try{popIdx=null}catch(e){}};
 W.__iqTab=t=>{W.__iqClean();let b=document.querySelector(`#tabs [data-tab="${t}"]`);
  if(!b){/* sub-tabs (jhc: Hậu cung = Hoàng thượng·Thái hậu | Phi tần | Nam nhân | Cung nhân): open the group, then the sub-tab */
   const g=document.querySelector('#tabs [data-tab="rv"]');if(g)g.click();b=document.querySelector(`[data-ksub="${t}"]`)}
  if(!b)return 'no tab '+t;b.click();const sb=document.querySelector(`[data-ksub="${t}"]`);if(sb&&sb!==b)sb.click();return 'ok'};
 W.__iqStart=()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}W.__iqClean();render()};
 W.__iqKnowAll=st=>{for(const e of k61All())S.known[kOf61(e)]=st;try{for(const s of W.__iqCongtu())S.known[kOf61(s)]=st}catch(e){}K61VER++;render()};
 /* công tử of the court families (Hoàng tự tab, hôn sự): any object with off/house that the life keeps */
 W.__iqCongtu=()=>{const L=[];const seen=new Set();const walk=(o,d)=>{if(!o||typeof o!=='object'||d>3||seen.has(o))return;seen.add(o);
   if(!Array.isArray(o)&&(o.off||o.house)&&o.name&&typeof o.age==='number')L.push(o);for(const k in o){try{walk(o[k],d+1)}catch(e){}}};
  for(const k of ['hPool','hEnv','h54','suitors']){if(S[k])walk(S[k],0)}return L.slice(0,12)};
 W.__iqPeople=()=>{const L=[];const add=(e,lab)=>{if(e&&!L.some(x=>x.e===e))L.push({e,lab})};
  for(const e of k61All())add(e,k61Kind(e));for(const s of W.__iqCongtu())add(s,'congtu');return L};
 /* catalogue: the real kit portrait (pcPort) at the live card cell width + the small frame (mdH sm), for every person */
 W.__iqCatalog=(from,n)=>{W.__iqClean();const L=W.__iqPeople().slice(from,from+n);if(!L.length)return 0;
  const cw=W.__iqCW||Math.min(230,Math.max(150,innerWidth*.34));
  const d=document.createElement('div');d.id='iqcat';d.style.cssText='position:fixed;inset:0;z-index:99999;background:#f4e9d8;overflow:hidden;display:flex;flex-wrap:wrap;align-content:flex-start;gap:6px;padding:6px';
  let h='';for(const x of L){let f=null;try{f=kitFace(x.e)}catch(e){}if(!f)continue;let nm='';try{nm=(typeof kitName==='function'?kitName(x.e):x.e.name)||''}catch(e){}
   h+=`<div class="pc iqc" data-iqwho="${x.lab}: ${String(nm).replace(/"/g,'')}" style="width:${cw+60}px;flex:0 0 ${cw+60}px;display:block;overflow:visible;padding:0;border:0;background:none;box-shadow:none;position:static;max-height:none">${pcPort(f,f.col).replace('class="pcp','style="width:'+cw+'px!important;max-width:none!important;max-height:none!important" class="pcp')}<div>${mdH(f,'sm')} ${mdH(f,'xs')}</div></div>`}
  d.innerHTML=h;document.body.appendChild(d);return L.length};
}

/* ---- the screens: [name, async (page) => note] ---- */
const STEPS=[];const step=(name,fn)=>STEPS.push({name,fn});
const ev=(p,f,a)=>p.evaluate(f,a);
async function shot(p,SZ,name){if(!SHOTS)return;const fn=`${SZ.w}-${name.replace(/[^a-zA-Z0-9]+/g,'_')}.jpg`;try{await p.screenshot({path:path.join(OUT,fn),type:'jpeg',quality:62,timeout:120000})}catch(e){}}
const DONE=new Set();
async function look(p,SZ,name,ALL,ms){if(ONLY&&!ONLY.test(name))return;if(DONE.has(SZ.tag+'|'+name))return;
 /* first paint: an old face-* fallback put in the page before the portrait has loaded (porOf gating) is what a slow phone shows */
 const early=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>/(^|\/)face-[^/]*\.webp/.test(i.getAttribute('src')||'')&&i.getClientRects().length&&!i.closest('[hidden]')).map(i=>{const b=i.closest('.pcp,.md,figure,.tok');return{src:i.getAttribute('src'),who:((b&&(b.getAttribute('title')||b.innerText))||'').replace(/\s+/g,' ').trim().slice(0,40)}}));
 early.forEach(e=>ALL.push({screen:name+' (lúc mở)',who:e.who,src:e.src.replace(/^.*?img\//,'img/'),k:'face',nw:0,nh:0,cssW:0,cssH:0,scale:0,face:1,onScr:0,fit:'',where:'',early:1,size:SZ.tag}));
 await settle(p,ms);await bgSizes(p);const rows=await p.evaluate(measure,name);rows.forEach(x=>x.size=SZ.tag);ALL.push(...rows);await shot(p,SZ,name);DONE.add(SZ.tag+'|'+name);
 const f=rows.filter(x=>x.scale>UP||x.k==='face'||(x.onScr>.9&&x.face<FACEMIN)||x.broken).length;console.log(SZ.tag,name,'·',rows.length,'pictures',f?`· ${f} flagged`:'')}

async function walk(p,SZ,ALL,phase){
 const P=phase; /* 'lạ' (new life: strangers) or 'quen' (everyone known) */
 await ev(p,()=>{__iqTab('act')});await look(p,SZ,`${P} · Thanh trên + Hành sự`,ALL);
 /* places with people: the stage + the card of each person tapped */
 const places=await ev(p,NP=>{const W=S.where||{};const ks=['home'].concat(places().map(x=>x.k));const has=k=>k==='home'||Object.values(W).includes(k)||['tn','tyv','ksp','lc'].includes(k);return ks.filter(has).slice(0,NP)},+(process.env.IQ_PLACES||6));
 for(const k of places){if(ONLY&&!ONLY.test(`${P} · Nơi ${k}`)&&!ONLY.test(`${P} · Nơi ${k} · người`))continue;
  const ok=await ev(p,k=>{__iqClean();try{S.place='home';used=0}catch(e){}try{goTo(k)}catch(e){return 'ERR '+e.message}if(Q.length){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}const b=document.querySelector('#tabs [data-tab="act"]');if(b)b.click();return curPeople().length},k);
  await look(p,SZ,`${P} · Nơi ${k}`,ALL,900);
  const n=await ev(p,()=>document.querySelectorAll('#tokens .tok').length);
  for(let i=0;i<Math.min(n,2);i++){await ev(p,i=>{const t=document.querySelectorAll('#tokens .tok')[i];if(t)t.click()},i);await look(p,SZ,`${P} · Nơi ${k} · người ${i+1}`,ALL,700);
   await ev(p,()=>{const x=document.getElementById('popx');if(x)x.click();const m=document.getElementById('modal');if(m&&!m.hidden){Q.length=0;m.hidden=true}})}}
 await ev(p,()=>{__iqClean();try{S.place='home';goTo('home')}catch(e){}});
 /* list tabs with a face strip: every person's card */
 for(const [t,lab] of [['court','Hoàng thượng · Thái hậu'],['rv','Phi tần'],['men','Nam nhân'],['staff','Cung nhân']]){
  await ev(p,t=>__iqTab(t),t);await look(p,SZ,`${P} · ${lab}`,ALL,900);
  await ev(p,()=>{const c=document.querySelector('#panel .pc .pcp.kit, .panel .pc .pcp.kit');if(c&&!window.__iqCW)window.__iqCW=c.getBoundingClientRect().width});
  const n=await ev(p,t=>document.querySelectorAll(`.pface[data-pg="${t}"]`).length,t);
  const CAP=+(process.env.IQ_CARDS||8);for(let i=0;i<n;i+=Math.max(1,Math.ceil(n/CAP))){const nm=`${P} · ${lab} · thẻ ${i+1}`;if(ONLY&&!ONLY.test(nm))continue;await ev(p,([t,i])=>{const b=document.querySelector(`.pface[data-pg="${t}"][data-pi="${i}"]`);if(b)b.click()},[t,i]);await look(p,SZ,nm,ALL,500)}}
 await ev(p,()=>__iqTab('rel'));await look(p,SZ,`${P} · Giao tình`,ALL,900);
 const rels=await ev(p,()=>[...document.querySelectorAll('[data-rel]')].map(b=>b.dataset.rel).filter((v,i,a)=>a.indexOf(v)===i).slice(0,8));
 for(const r of rels){const nm=`${P} · Giao tình · ${r}`;if(ONLY&&!ONLY.test(nm))continue;await ev(p,r=>{const b=document.querySelector(`[data-rel="${r}"]`);if(b)b.click()},r);await look(p,SZ,nm,ALL,600)}
 for(const [t,lab] of [['kid','Hoàng tự'],['fac','Phe phái'],['go','Dư đồ'],['inv','Tư trang'],['story','Mệnh truyện']]){const r=await ev(p,t=>__iqTab(t),t);if(r==='ok')await look(p,SZ,`${P} · ${lab}`,ALL,1200)}
 await ev(p,()=>{__iqClean();try{showEmp()}catch(e){}});await look(p,SZ,`${P} · Thẻ Hoàng thượng`,ALL,900);
 await ev(p,()=>{__iqClean();const v=rivals.find(x=>x.alive&&!x.out);Q.push({t:'Có người đến',h:'Nàng ghé thăm.',who:pv(v),opts:[{n:'Lui'}]});showModal()});await look(p,SZ,`${P} · Hộp thoại có người`,ALL,900);
 /* catalogue: every person of the life */
 const tot=await ev(p,()=>__iqPeople().length);const per=SZ.w>1000?6:4;
 for(let i=0;i<tot;i+=per){const nm=`${P} · Danh mục ${i+1}-${Math.min(tot,i+per)}`;if(ONLY&&!ONLY.test(nm))continue;await ev(p,([i,n])=>__iqCatalog(i,n),[i,per]);await look(p,SZ,nm,ALL,600)}
 await ev(p,()=>__iqClean());}

(async()=>{
 /* --merge: node dev/test/img-quality.js --merge <outdir> <a/img-quality.json,b/img-quality.json,…> [md] — one report from runs made in parallel */
 if(BASE==='--merge'){const ALL=[],ERR=[];for(const f of SZS.split(',')){const o=JSON.parse(fs.readFileSync(f,'utf8'));ALL.push(...o.ALL);ERR.push(...o.ERR)}fs.writeFileSync(path.join(OUT,'img-quality.json'),JSON.stringify({ALL,ERR}));return report(ALL,ERR,[])}
 const PX=process.env.HTTPS_PROXY||process.env.https_proxy;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{}); /* pictures come from the CDN (dev/art/CDN.md) */const ALL=[];const ERR=[];
 for(const SZ of SIZES){
  /* a renderer that crashes on a loaded machine is re-opened (up to 3 tries); screens already measured are skipped (DONE) */
  for(let attempt=1;attempt<=3;attempt++){
  const ctx=await b.newContext({viewport:{width:SZ.w,height:SZ.h},deviceScaleFactor:SZ.dpr,hasTouch:true,isMobile:SZ.w<1100,serviceWorkers:'block',ignoreHTTPSErrors:true,reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__bot=1}); /* no background art download (jload) during the audit */
  const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const bad=[];p.on('response',r=>{if(r.status()>=400&&/\.(webp|png|jpg|json)/.test(r.url()))bad.push(r.status()+' '+r.url().replace(/^.*?\/img\//,'img/'))});
  try{
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
  await look(p,SZ,'Trang đầu (Luân hồi)',ALL,800);
  /* co-op lobby from the title screen */
  if(!DONE.has(SZ.tag+'|Chơi cùng bạn (sảnh)')&&await ev(p,()=>{const b=document.querySelector('#modal .kco');if(b){b.click();return 1}return 0}))await look(p,SZ,'Chơi cùng bạn (sảnh)',ALL,900);
  await ev(p,helpers);await ev(p,()=>__iqStart());await p.waitForTimeout(3000);
  /* the origin roulette (jk2b) opens a moment after start(): keep it away for the whole audit; consort road only */
  await ev(p,()=>{setInterval(()=>{const r=document.getElementById('kroul');if(r){try{const k=r.querySelector('.krskip');k&&k.click()}catch(e){}r.remove()}},150)});
  for(let i=0;i<20&&await ev(p,()=>typeof isSrv==='function'&&isSrv());i++){await ev(p,()=>{try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(1500)}
  await p.waitForTimeout(800);await ev(p,()=>{__iqClean();render()});
  await walk(p,SZ,ALL,'lạ');
  /* week book: the next buổi until the book opens */
  if((!ONLY||ONLY.test('Sổ tuần'))&&!DONE.has(SZ.tag+'|Sổ tuần')){await ev(p,()=>{__iqClean();try{for(let i=0;i<4;i++){nextBuoi();if(document.querySelector('.kbook,.kbk'))break}}catch(e){}});await look(p,SZ,'Sổ tuần',ALL,2500);
   for(let i=0;i<3;i++){const ok=await ev(p,()=>{const n=document.querySelector('.kbook .knext,.kbk .knext,[data-kbnext],.kbook button.next');if(n){n.click();return 1}return 0});if(!ok)break;await look(p,SZ,`Sổ tuần · trang ${i+2}`,ALL,900)}}
  /* stage 1 (face seen, name unknown: "???" + descriptor) — the catalogue only */
  await ev(p,()=>{__iqClean();try{if(typeof kbookClose==='function')kbookClose()}catch(e){}__iqKnowAll(1)});
  {const tot=await ev(p,()=>__iqPeople().length);const per=SZ.w>1000?6:4;for(let i=0;i<tot;i+=per){const nm=`thấy mặt · Danh mục ${i+1}-${Math.min(tot,i+per)}`;if(ONLY&&!ONLY.test(nm))continue;if(DONE.has(SZ.tag+'|'+nm))continue;await ev(p,([i,n])=>__iqCatalog(i,n),[i,per]);await look(p,SZ,nm,ALL,600)}}
  await ev(p,()=>{__iqClean();__iqKnowAll(3)});
  await walk(p,SZ,ALL,'quen');
  ERR.push(...errs.map(e=>SZ.tag+' '+e),...[...new Set(bad)].map(u=>SZ.tag+' '+u));await ctx.close();break
  }catch(e){console.log(SZ.tag,'attempt',attempt,'crashed:',String(e.message||e).split('\n')[0]);ERR.push(...errs.map(e=>SZ.tag+' '+e));try{await ctx.close()}catch(x){}
   if(attempt===3){ERR.push(SZ.tag+' CRASH '+String(e.message||e).split('\n')[0])}}
  }}
 await b.close();report(ALL,ERR,SIZES)})().catch(e=>{console.error(e);process.exit(2)});
function report(ALL,ERR,SIZES){
 /* sizes run as separate processes (slow machines): merge with the rows of the other sizes already in <outdir>/img-quality.json */
 if(SIZES.length)try{const old=JSON.parse(fs.readFileSync(path.join(OUT,'img-quality.json'),'utf8'));const mine=new Set(SIZES.map(s=>s.tag));
  ALL.unshift(...(old.ALL||[]).filter(x=>!mine.has(x.size)));ERR.unshift(...(old.ERR||[]).filter(e=>!mine.has(e.split(' ')[0])))}catch(e){}
 ALL.forEach(x=>{const f=[];if(x.early)f.push('FACE_FALLBACK');else if(x.broken)f.push('BROKEN');else{if(x.scale>UP)f.push('UPSCALE');if(x.k==='face')f.push('FACE_FALLBACK');if(x.onScr>.9&&x.face<FACEMIN)f.push('HALF_FACE');if(/blur/.test(x.filter||'')&&x.k!=='unk'&&!/unknown/.test(x.src))f.push('BLUR')}x.flags=f});
 fs.writeFileSync(path.join(OUT,'img-quality.json'),JSON.stringify({ALL,ERR}));
 const bad=ALL.filter(x=>x.flags.length);const cnt=f=>bad.filter(x=>x.flags.includes(f)).length;
 const seen=new Map();bad.forEach(x=>{const k=[x.size,x.screen.replace(/ · (thẻ|người) \d+$/,' · thẻ *').replace(/Danh mục \d+-\d+/,'Danh mục'),x.src.replace(/\d+/g,'#'),x.flags.join('+')].join('|');if(!seen.has(k))seen.set(k,Object.assign({n:0,whos:new Set()},x));const o=seen.get(k);o.n++;if(o.whos.size<3&&x.who)o.whos.add(x.who);o.scale=Math.max(o.scale,x.scale);o.face=Math.min(o.face,x.face)});
 const L=[`# IMG_QUALITY — người trên màn hình`,'',`Bộ đo: \`node dev/test/img-quality.js <baseURL> <outdir>\` (Playwright). Chạy: ${new Date().toISOString().slice(0,16)}Z · cỡ ${[...new Set(ALL.map(x=>x.size))].join(', ')} · ${ALL.length} lần hiện ảnh người trên ${new Set(ALL.map(x=>x.size+x.screen)).size} màn.`,'',
  `Ngưỡng: phóng (cỡ hiển thị × devicePixelRatio ÷ cỡ ảnh) > ${UP} = mờ (UPSCALE) · face-*.webp cũ hiện ra = FACE_FALLBACK · mặt thấy < ${FACEMIN*100}% = HALF_FACE · 404 / không giải mã = BROKEN · bộ lọc blur trên mặt thật = BLUR.`,'',
  `| Lỗi | số lần hiện |`,`|---|---|`,...['UPSCALE','FACE_FALLBACK','HALF_FACE','BROKEN','BLUR'].map(f=>`| ${f} | ${cnt(f)} |`),`| lỗi trang / 404 | ${ERR.length} |`,'',
  bad.length?`## Chỗ lỗi (gộp theo cỡ + màn + loại nguồn)`:`## Sạch: 0 chỗ lỗi.`,''];
 if(bad.length){L.push('| cỡ | màn | người (vd) | nguồn (vd) | cỡ ảnh | hiển thị css | phóng max | mặt thấy min | lỗi | lần |','|---|---|---|---|---|---|---|---|---|---|');
  for(const x of seen.values())L.push(`| ${x.size} | ${x.screen} | ${[...x.whos].join('; ')||'-'} | ${x.src} | ${x.nw}x${x.nh} | ${x.cssW}x${x.cssH} | ${x.scale} | ${Math.round(x.face*100)}% | ${x.flags.join(', ')} | ${x.n} |`)}
 L.push('','## Tất cả ảnh đã đo (gộp theo màn + loại)','','| cỡ | màn | loại | số | phóng lớn nhất | mặt thấy ít nhất |','|---|---|---|---|---|---|');
 const g=new Map();ALL.filter(x=>!x.broken).forEach(x=>{const k=[x.size,x.screen,x.k].join('|');const o=g.get(k)||{size:x.size,screen:x.screen,k:x.k,n:0,mx:0,mf:1};o.n++;o.mx=Math.max(o.mx,x.scale);if(x.onScr>.9)o.mf=Math.min(o.mf,x.face);g.set(k,o)});
 for(const o of g.values())L.push(`| ${o.size} | ${o.screen} | ${o.k} | ${o.n} | ${o.mx} | ${Math.round(o.mf*100)}% |`);
 if(ERR.length)L.push('','## Lỗi trang / 404','',...ERR.map(e=>'- '+e));
 fs.writeFileSync(MDP,L.join('\n')+'\n');
 console.log(`TOTAL ${ALL.length} pictures · flagged ${bad.length} (UPSCALE ${cnt('UPSCALE')}, FACE_FALLBACK ${cnt('FACE_FALLBACK')}, HALF_FACE ${cnt('HALF_FACE')}, BROKEN ${cnt('BROKEN')}, BLUR ${cnt('BLUR')}) · errors ${ERR.length}`);
 process.exit(bad.length||ERR.length?1:0)}
