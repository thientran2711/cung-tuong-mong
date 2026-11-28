/* kit-stage.js — KIT §102 kitStage «sân khấu không khung» + §102.2 dialogue (KK33, owner 25/11 ~21:50Z / ~21:55Z / ~22:00Z). Fold 755x1000 + iPad 1180x820, real c2a «Tân quân lập uy · Chương 2».
   CARDS: the frame is a stage (no panel: no border / shadow on the dialog), both figures inside the layer, no face under the story box or the plate,
   on one page the story box never over the upper half of a painted figure (KIT_STAGE.bodyK), the hand inside the layer, card faces = picture + name (no odds), the figures visible after the entrance.
   DIALOGUE (Q item talk:1): one line at a time in the bubble, a real tap on the stage = the next line, after the last line thẻ gỗ (all at once, ≤ 7, no pages) beside her,
   real tap = lift + ✓ / ✕; ✓ chooses the frame's card (the frame leaves Q[0]).
   usage: node dev/test/kit-stage.js <index.html> [outdir]   Exit 1 on a FAIL. Shots never go in git. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);let fails=0;const log=s=>console.log(s);if(OUT)fs.mkdirSync(OUT,{recursive:true});
 for(const [W,H] of SZ){const dev=W<H?'fold':'ipad';const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e))});await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kstgPlace==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  const chk=(n,ok,info)=>{if(!ok){fails++;log(`FAIL ${dev} ${n} ${info||''}`)}else log(`ok   ${dev} ${n}`)};const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${dev}-${n}.png`})};
  const fire=talk=>p.evaluate(async talk=>{for(let k=0;k<6;k++){/* a clean day per fire: LIVE jevc daily big-event cap (OD 26/11 ~01:25Z) holds a 2nd «Phụ tuyến» the same day */try{S.evc=null;EVCW.length=0}catch(e){}try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;if(rgFire('c1b')/*c2a = a side choice = vòng nhóm (KIT §101.9)*/){Q.length=1;Q[0].__ks='c2a';if(talk)Q[0].talk=1;showModal();return true}window.__nlInner=1;start();window.__nlInner=0;Q.length=0;await new Promise(r=>setTimeout(r,2000))}return false},talk);
  const tapXY=async q=>{await p.touchscreen.tap(q[0],q[1]);await p.waitForTimeout(450)};
  /* ---- CARDS ---- */
  chk('c2a fired',await fire(false));await p.waitForTimeout(3200);await shot('cards');
  const g=await p.evaluate(()=>{const dl=document.querySelector('#modal .dlg');const R=e=>{const r=e.getBoundingClientRect();return {l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};const D=R(dl),cs=getComputedStyle(dl);const K=KIT_STAGE;
   const figs=[...dl.querySelectorAll('.kstg-fig')].map(f=>{const im=f.querySelector('img'),r=R(f),ob=(im&&im.complete&&im.naturalWidth&&typeof kscnOpaque==='function')?kscnOpaque(im):{l:.1,r:.9,t:.02,b:1};const pt={l:r.l+ob.l*r.w,r:r.l+ob.r*r.w,t:r.t+ob.t*r.h,b:r.t+ob.b*r.h};return {cls:f.className,vis:getComputedStyle(f).visibility,face:{l:pt.l,r:pt.r,t:pt.t,b:pt.t+K.faceK*(pt.b-pt.t)},upper:{l:pt.l+.15*(pt.r-pt.l),r:pt.r-.15*(pt.r-pt.l),t:pt.t,b:pt.t+K.bodyK*(pt.b-pt.t)},inL:r.t>=D.t-1&&r.b<=D.b+1}});
   const pm=dl.querySelector('.kpmain');const B=pm?R(pm):null;const hit=(a,c)=>a&&c&&a.l<c.r-2&&c.l<a.r-2&&a.t<c.b-2&&c.t<a.b-2;
   const cards=[...dl.querySelectorAll('.opts.khand>button.kopt')].map(R);const odds=[...dl.querySelectorAll('.opts.khand>button.kopt .kodds')].filter(e=>e.getClientRects().length).length;
   return {stage:dl.classList.contains('kstage'),panel:cs.boxShadow!=='none'||parseFloat(cs.borderTopWidth)>0,n:figs.length,figsIn:figs.every(f=>f.inL),figsVis:figs.every(f=>f.vis!=='hidden'),faceUnderBox:figs.some(f=>hit(f.face,B)),upperUnderBox:figs.some(f=>hit(f.upper,B)),
    cardsIn:cards.length>1&&cards.every(c=>c.t>=D.t-1&&c.b<=D.b+1&&c.l>=D.l-1&&c.r<=D.r+1),odds,pages:(()=>{try{return kitView().pages}catch(e){return 0}})()}});
  chk('stage (no panel box)',g.stage&&!g.panel,JSON.stringify(g).slice(0,160));chk('NO figure on an event stage (§102.7, owner 26/11 ~22:07Z: background + cards + info box only)',g.n===0,'n='+g.n);
  chk('no face under the story box',!g.faceUnderBox);if(g.pages===1)chk('one page: story never over an upper body',!g.upperUnderBox);chk('hand inside the layer',g.cardsIn);chk('card face: no odds meter',g.odds===0,'odds '+g.odds);
  /* plate never over a face */
  const c1=await p.evaluate(()=>{const r=document.querySelectorAll('#modal .opts.khand>button.kopt')[1].getBoundingClientRect();return [r.left+r.width/2,r.top+r.height*.4]});await tapXY(c1);await shot('cards-lift');
  const pf=await p.evaluate(()=>{const dl=document.querySelector('#modal .dlg'),z=dl.querySelector(':scope>.khplate:not([hidden])');if(!z)return null;const P=z.getBoundingClientRect();return [...dl.querySelectorAll('.kstg-fig')].some(f=>{const r=f.getBoundingClientRect(),t=r.top+r.height*.02,fb=t+KIT_STAGE.faceK*r.height*.98;return P.left<r.right-r.width*.25&&r.left+r.width*.25<P.right&&P.top<fb&&t<P.bottom})});
  chk('plate shown, never over a face',pf===false,'plate '+pf);
  /* ---- DIALOGUE ---- */
  chk('c2a fired (talk)',await fire(true));await p.waitForTimeout(3200);
  const st=()=>p.evaluate(()=>{const dl=document.querySelector('#modal .dlg');const T=dl&&dl.__kstT;const on=[...document.querySelectorAll('#modal .kpmain .kfact.kson')].filter(e=>e.getClientRects().length).length;return {talk:dl&&dl.classList.contains('kstalk'),i:T&&T.i,asked:T&&T.asked,on,plaques:document.querySelectorAll('.kpk .kpk-n').length,q0:Q[0]&&Q[0].__ks}});
  let s0=await st();chk('dialogue mode + one line shown',s0.talk&&s0.on===1,JSON.stringify(s0));await shot('talk-line1');
  const mid=await p.evaluate(()=>{const r=document.querySelector('#modal .dlg').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height*.45]});
  await tapXY(mid);let s1=await st();chk('tap = next line',s1.i===1&&s1.on===1,JSON.stringify(s1));
  for(let k=0;k<12&&!(await st()).plaques;k++)await tapXY(mid);await p.waitForTimeout(1200);let s2=await st();await shot('talk-plaques');
  chk('answers = thẻ gỗ after the last line, all at once (no pages)',s2.plaques>0&&s2.plaques<=7,JSON.stringify(s2));
  const pl=await p.evaluate(()=>{const r=document.querySelector('.kpk .kpk-n .kpk-b').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});await tapXY(pl);
  const ok=await p.evaluate(()=>{const e=document.querySelector('.kpk .khconf:not([hidden])>.khok'),x=document.querySelector('.kpk .khconf:not([hidden])>.khx');if(!e||x)return null;/* KK53: ONE «Chọn», no ✕ */const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});await shot('talk-lift');
  chk('plaque tap = lift + ONE «Chọn»',!!ok);await tapXY(pl);await p.waitForTimeout(500);chk('lifted plaque body tap again chooses the frame card (two-tap)',(await st()).q0!=='c2a');
  chk('no page errors',!errs.length,errs.slice(0,3).join(' | '));await ctx.close()}
 await b.close();log(fails?`KIT-STAGE FAIL ${fails}`:'KIT-STAGE PASS');process.exit(fails?1:0)})();
