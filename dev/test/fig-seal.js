/* review/kit-figure-mood: the mood seal beside the head of every interactable full-body figure (KIT 28.8d, dev/build/jfigseal.js).
   usage: node dev/test/fig-seal.js <W>x<H>@dpr <outdir> [dev/index.html]
   Starts a life, sets known moods on the people, shoots the room stage, a place view and an event dialog, and checks per figure: seal inside the stage/dialog,
   seal not over the face (head centre), seal size within min..max and ~ body height, seal beside (not above) the head. Prints a JSON table. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,SZ,OUT,PAGE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:process.env.MOTION?'no-preference':'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());
  if(process.env.FAKE&&/\/img\/kit\/emo-(anim|fx)\/gian\.webp$/.test(u.pathname)){const rr=await r.fetch({url:r.request().url().replace(/emo-(anim|fx)\/gian/,'emo-gian')});return r.fulfill({response:rr})}
  if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/'+(PAGE||'dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 const clean=()=>p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true});
 await clean();
 await p.evaluate(()=>{S.emo={k:'gian',v:70,why:'thử',t:null,w:0};S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}});
 const R={};
 const check=(tag)=>p.evaluate((tag)=>{const out=[];document.querySelectorAll('img.kfseal').forEach(s=>{const f=s.__fig;if(!f)return;const sr=s.getBoundingClientRect();if(!sr.width)return;const fr=f.getBoundingClientRect();
   const bd=(f.closest('#stage')||f.closest('.kszfig,.kesf')||f.closest('.dlg')||f.parentElement).getBoundingClientRect();
   const hd=window.kitFigBody&&kitFigBody(f.currentSrc||f.src);
   let faceHit=null,inside=sr.left>=bd.left-1&&sr.right<=bd.right+1&&sr.top>=bd.top-1&&sr.bottom<=bd.bottom+1;
   if(hd){const bh=fr.height,ht=hd.ht!=null?hd.ht:hd.t,body=(hd.b-ht)*bh,cx=fr.left+fr.width*((hd.cl+hd.cr)/2),cy=fr.top+bh*ht+body*.085;/* face = ellipse around the head centre, half-width .045 body */
    const dx=Math.max(sr.left-cx,0,cx-sr.right),dy=Math.max(sr.top-cy,0,cy-sr.bottom);faceHit=Math.hypot(dx,dy)<body*.04}
   out.push({fig:f.id||f.className.slice(0,14),who:(f.closest('.tok')?.querySelector('.tag')?.textContent||'').slice(0,24),seal:s.getAttribute('src').replace(/^.*\/img\//,''),px:Math.round(sr.width),body:s.dataset.kfsb,inside,faceHit,
    dxHead:hd?Math.round(sr.left+sr.width/2-(fr.left+fr.width*((hd.cl+hd.cr)/2))):null,above:hd?Math.round((fr.top+fr.height*(hd.ht!=null?hd.ht:hd.t))-sr.bottom):null})});
  const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg,img.kesimg,.kszfs>img')].filter(e=>e.getClientRects().length).length;return{tag,figs,seals:out}},tag);
 await p.waitForTimeout(12000);R.motion=await p.evaluate(()=>[...document.querySelectorAll('img.kemo')].filter(e=>e.getClientRects().length).map(e=>({k:e.className.replace(/^kemo /,''),anim:getComputedStyle(e).animationName,src:e.getAttribute('src').replace(/^.*\/img\//,''),fx:!!e.__fx,cause:e.dataset.kemoc})));R.room=await check('room');await p.screenshot({path:`${OUT}/room-${W}x${H}.jpg`,type:'jpeg',quality:72});
 /* seal-lean (owner 19/11 ~02:15Z): MOTION=1 proves IDLE (rotate only, tiny, slow) + LEAN-IN timing (random 4..8 s per seal, scale ~1.12..1.18) + STAGGER (no two seals lean together),
    then writes frame strips (idle + lean-in frames, deterministic via the Web Animations API) for gian / buon / vui to <outdir>/strip-<key>-<W>x<H>.png (single clips, montage with dev/test/seal-strip.py). */
 if(process.env.MOTION){
  await p.evaluate(()=>{window.__L=[];window.__I={};let n=0;const id=e=>e.__sid||(e.__sid=++n);const ob=new MutationObserver(ms=>{for(const m of ms){const e=m.target;if(!e.classList||!e.classList.contains('kemo'))continue;const is=e.classList.contains('kemo-lean'),was=!!e.__st;if(is===was)continue;e.__st=is;
    if(is){const mk=/kemo-([a-z0-9]+)(?=\s|$)/g;let k='',x;while((x=mk.exec(e.className.replace(/kemo-(live|lean|m-\w+)/g,''))))k=x[1];window.__L.push({id:id(e),k,t:performance.now(),peak:1})}else{const l=[...window.__L].reverse().find(x=>x.id===id(e)&&!x.end);if(l)l.end=performance.now()}}});
   ob.observe(document.body,{attributes:true,attributeFilter:['class'],attributeOldValue:true,subtree:true});
   const live=()=>[...document.querySelectorAll('img.kemo.kemo-live')].filter(e=>e.getClientRects().length);
   (function tick(){const t=performance.now();for(const e of live()){const i=id(e),cs=getComputedStyle(e),rot=cs.rotate==='none'?0:parseFloat(cs.rotate);const q=window.__I[i]||(window.__I[i]={min:99,max:-99,n:0,flips:[],last:null});q.min=Math.min(q.min,rot);q.max=Math.max(q.max,rot);q.n++;
     if(q.last!==null&&Math.sign(rot-q.last)&&q.dir&&Math.sign(rot-q.last)!==q.dir&&Math.abs(rot-q.last)>1e-4){q.flips.push(t)}if(q.last!==null&&Math.abs(rot-q.last)>1e-4)q.dir=Math.sign(rot-q.last);q.last=rot;
     if(e.classList.contains('kemo-lean')){const l=[...window.__L].reverse().find(x=>x.id===i&&!x.end);if(l){const m=/matrix\(([^,]+),/.exec(cs.transform);const sc=m?parseFloat(m[1]):1;if(sc>l.peak)l.peak=sc}}}
    requestAnimationFrame(tick)})()});
  const T=+process.env.SECS||36;await p.waitForTimeout(T*1000);
  const M=await p.evaluate(()=>({L:window.__L.map(l=>({id:l.id,k:l.k,t:Math.round(l.t),dur:l.end?Math.round(l.end-l.t):null,peak:+l.peak.toFixed(3)})),I:Object.fromEntries(Object.entries(window.__I).map(([i,q])=>[i,{min:+q.min.toFixed(2),max:+q.max.toFixed(2),flips:q.flips.length,half:q.flips.length>1?Math.round((q.flips[q.flips.length-1]-q.flips[0])/(q.flips.length-1)):null}]))}));
  const by={};M.L.forEach(l=>(by[l.id]=by[l.id]||[]).push(l));const gaps=[];Object.values(by).forEach(a=>{for(let i=1;i<a.length;i++)gaps.push((a[i].t-a[i-1].t-(a[i-1].dur||0))/1000)});
  const all=[...M.L].sort((a,b)=>a.t-b.t);let minGap=1e9;for(let i=1;i<all.length;i++)minGap=Math.min(minGap,(all[i].t-all[i-1].t)/1000);
  const overlap=all.filter((l,i)=>i&&l.t<all[i-1].t+(all[i-1].dur||0)).length;
  const idleHalf=Object.values(M.I).map(q=>q.half).filter(Boolean);
  R.lean={secs:T,seals:Object.keys(M.I).length,leans:M.L.length,sealsLeaned:Object.keys(by).length,restGap:{min:gaps.length?+Math.min(...gaps).toFixed(2):null,max:gaps.length?+Math.max(...gaps).toFixed(2):null,n:gaps.length},minStartGapAnySeal:+minGap.toFixed(2),overlappingLeans:overlap,
   leanDur:{min:Math.min(...M.L.map(l=>l.dur||9e9)),max:Math.max(...M.L.map(l=>l.dur||0))},peakScale:{min:Math.min(...M.L.filter(l=>l.dur).map(l=>l.peak)),max:Math.max(...M.L.map(l=>l.peak))},
   idleRotateDeg:{min:Math.min(...Object.values(M.I).map(q=>q.min)),max:Math.max(...Object.values(M.I).map(q=>q.max))},idleHalfPeriodMs:{min:Math.min(...idleHalf),max:Math.max(...idleHalf)},perKeyLeans:M.L.reduce((o,l)=>(o[l.k]=(o[l.k]||0)+1,o),{})};
  /* frame strips: pause the lean animation and step it */
  R.strips={};for(const key of ['gian','buon','vui']){
   const sel=await p.evaluate(key=>{const vis=[...document.querySelectorAll('img.kemo.kemo-live')].filter(e=>e.getClientRects().length);let e=vis.find(e=>new RegExp('kemo-'+key+'(\\s|$)').test(e.className+' '));let borrowed=false;
     if(!e&&vis[0]){/* key not on this screen: re-key one real seal (same kit part, same code path) so the strip can still show that feeling */e=vis[0];const set=(/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(e.getAttribute('src'))||[0,''])[1];e.className=e.className.replace(/kemo-(?!live|lean|m-)[a-z0-9_-]+/,'kemo-'+key).replace(/kemo-m-\w+/,'').trim();e.dataset.kemos='img/kit/emo-'+set+key+'.webp';e.setAttribute('src',e.dataset.kemos);window.kitEmoSeal.live(e,true);borrowed=true}
     if(!e)return null;e.scrollIntoView({block:'center'});e.id=e.id||'sl-'+key;e.classList.remove('kemo-lean');const r=e.getBoundingClientRect();return{id:e.id,w:r.width,cls:e.className,borrowed}},key);
   if(!sel){R.strips[key]='no seal on screen';continue}
   await p.waitForTimeout(300);
   const shot=async name=>{const r=await p.evaluate(id=>{const b=document.getElementById(id).getBoundingClientRect();const pad=b.width*.35;return{x:Math.max(0,b.left-pad),y:Math.max(0,b.top-pad),width:b.width+2*pad,height:b.height+2*pad}},sel.id);await p.screenshot({path:`${OUT}/strip-${key}-${name}-${W}x${H}.png`,clip:r})};
   await p.evaluate(id=>{const e=document.getElementById(id);e.getAnimations().forEach(a=>{if(a.animationName==='kemoIdle'){a.pause();a.currentTime=0}})},sel.id);await shot('0idle');
   const d=await p.evaluate(id=>{const e=document.getElementById(id);e.__ln&&clearTimeout(e.__ln);window.kitEmoSeal.lean(e,true);return parseFloat(getComputedStyle(e).getPropertyValue('--kemo-ld'))*1000},sel.id);
   await p.evaluate(()=>{});const fr=[.2,.4,.6,.8];R.strips[key]={cls:sel.cls,leanMs:d,frames:[]};
   for(let i=0;i<fr.length;i++){const sc=await p.evaluate(({id,t})=>{const e=document.getElementById(id);const a=e.getAnimations().find(x=>/^kemoL-/.test(x.animationName));if(!a)return null;a.pause();a.currentTime=t;return getComputedStyle(e).transform},{id:sel.id,t:fr[i]*d});R.strips[key].frames.push({at:fr[i],transform:sc});await shot('f'+(i+1))}
   await p.evaluate(id=>{const e=document.getElementById(id);e.getAnimations().forEach(a=>a.cancel())},sel.id)}
 }
 /* event dialog with a person (kit sample: the real pop-up, Hoàng hậu on the stage) */
 await p.evaluate(()=>{try{kitPopSample('event')}catch(e){console.error(e)}});await p.waitForTimeout(2500);R.event=await check('event');R.dbg=await p.evaluate(()=>[...document.querySelectorAll('#modal img')].filter(i=>i.getBoundingClientRect().height>300).map(i=>({c:i.className,s:i.src.slice(-50),p:i.parentElement.className,pp:i.parentElement.parentElement.className})));await p.screenshot({path:`${OUT}/event-${W}x${H}.jpg`,type:'jpeg',quality:72});
 await clean();
 /* Dư đồ → a place with several people (single-hall garden): the full-screen place view */
 await p.evaluate(()=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const Wh=S.where||(S.where={});liveRivals(true).slice(0,5).forEach(v=>{Wh[v.id]='vuon';S.met[v.id]=1});
  goTo('home');tab='go';render();try{j77Tap('vuon','');const bs=[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent&&/Đi|đi|Vào|vào|Đến/.test(b.textContent));if(bs[0])bs[0].click()}catch(e){console.error(e)}});
 await p.waitForTimeout(5000);await clean();await p.waitForTimeout(2500);R.place=await check('place '+await p.evaluate(()=>S.place));await p.screenshot({path:`${OUT}/place-${W}x${H}.jpg`,type:'jpeg',quality:72});
 /* tap a person on the place stage = the person pop-up (kitPersonDlg, full-body figure) */
 const tp=await p.evaluate(()=>{const ppl=curPeople();const t=[...document.querySelectorAll('#tokens .tok')].find(e=>e.style.display!=='none'&&e.querySelector('img.figimg')&&ppl[+e.dataset.p]&&ppl[+e.dataset.p].kind!=='chest');if(!t)return null;const q=t.querySelector('img.figimg').getBoundingClientRect();return{x:q.left+q.width/2,y:q.top+q.height*.5}});
 if(tp){await p.mouse.click(tp.x,tp.y);await p.waitForTimeout(3000);R.pop=await check('pop');await p.screenshot({path:`${OUT}/pop-${W}x${H}.jpg`,type:'jpeg',quality:72})}
 console.log(JSON.stringify({W,H,...R,errs},null,1));await b.close()})();
