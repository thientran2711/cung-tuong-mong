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
 /* seal-lean-2 (owner 19/11 ~05:05Z): MOTION=1 proves SMALL = STILL (idle rotate barely visible), LEAN-IN timing from the big clone img.kemo-big (grow s to ~full size, HOLD s at full size,
    shrink s), the big size (px + share of the short screen side), clamped inside the screen, above other UI (z-index), and the STAGGER (one lean at a time + gap). The real mp4 proof: dev/test/seal-lean-video.js. */
 if(process.env.MOTION){
  await p.evaluate(()=>{window.__L=[];window.__I={};let n=0;const id=e=>e.__sid||(e.__sid=++n);
   const ob=new MutationObserver(ms=>{for(const m of ms){for(const e of m.addedNodes)if(e.nodeType===1&&e.classList&&e.classList.contains('kemo-big')){const l={id:++n,t:performance.now(),k:e.className,small:null,maxW:0,samples:[],inside:true,z:+getComputedStyle(e).zIndex,loops:getComputedStyle(e).animationIterationCount};window.__L.push(l);e.__l=l;
     (function tick(){if(!e.isConnected){l.end=performance.now();return}const r=e.getBoundingClientRect(),t=performance.now();l.samples.push([t,r.width]);if(r.width>l.maxW)l.maxW=r.width;l.inside=l.inside&&r.left>=-1&&r.top>=-1&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1;requestAnimationFrame(tick)})()}
     for(const e of m.removedNodes)if(e.__l)e.__l.end=performance.now()}});ob.observe(document.body,{childList:true});
   const live=()=>[...document.querySelectorAll('img.kemo.kemo-live')].filter(e=>e.getClientRects().length);
   (function tick(){for(const e of live()){const i=id(e),cs=getComputedStyle(e),rot=cs.rotate==='none'?0:parseFloat(cs.rotate);const q=window.__I[i]||(window.__I[i]={min:99,max:-99});q.min=Math.min(q.min,rot);q.max=Math.max(q.max,rot)}requestAnimationFrame(tick)})()});
  const T=+process.env.SECS||36;await p.waitForTimeout(T*1000);
  const M=await p.evaluate(()=>({vw:innerWidth,vh:innerHeight,L:window.__L.map(l=>{const mx=l.maxW,s=l.samples,t0=l.t;let g=null,h0=null,h1=null;for(const [t,w] of s){if(g===null&&w>=mx*.97)g=t-t0;if(w>=mx*.97){if(h0===null)h0=t;h1=t}}
    return{id:l.id,cls:l.k.replace('kemo-big ',''),totalS:l.end?+((l.end-t0)/1e3).toFixed(2):null,growS:g===null?null:+(g/1e3).toFixed(2),holdS:h0===null?null:+((h1-h0)/1e3).toFixed(2),shrinkS:l.end&&h1?+((l.end-h1)/1e3).toFixed(2):null,bigPx:Math.round(mx),inside:l.inside,z:l.z,loops:l.loops,t:Math.round(t0),end:l.end?Math.round(l.end):null}}),I:Object.values(window.__I).map(q=>[q.min,q.max])}));
  const all=[...M.L].sort((a,b)=>a.t-b.t);let minGap=1e9,overlap=0;for(let i=1;i<all.length;i++){if(all[i-1].end==null||all[i].t<all[i-1].end)overlap++;else minGap=Math.min(minGap,(all[i].t-all[i-1].end)/1000)}
  R.stillAvatars=await p.evaluate(()=>{const all=[...document.querySelectorAll('img.kemo')].filter(e=>e.getClientRects().length);const bad=all.filter(e=>e.classList.contains('kemo-live')&&!e.matches('img.kfseal')&&!e.closest('#modal,.krbox,.kmov,.dlg'));return{seals:all.length,stage:all.filter(e=>e.matches('img.kfseal')).length,avatarOrOtherLive:bad.length,topBarLive:document.querySelectorAll('header.hud img.kemo.kemo-live').length}});
  R.lean={secs:T,leans:M.L,overlappingLeans:overlap,minGapAfterPreviousEndS:minGap===1e9?null:+minGap.toFixed(2),minBigShareOfShortSide:+(Math.min(...M.L.map(l=>l.bigPx))/Math.min(M.vw,M.vh)).toFixed(3),allInside:M.L.every(l=>l.inside),idleRotateDeg:{min:Math.min(...M.I.map(q=>q[0])),max:Math.max(...M.I.map(q=>q[1]))}}
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
