// two-browser co-op lobby test against the deployed worker. node two.js BASE OUTDIR
const {chromium}=require('playwright');
const [,,BASE,OUT]=process.argv;
const VP={A:{w:686,h:880,d:2.2},B:{w:1180,h:820,d:2}};
const log=(...a)=>console.log(...a);
(async()=>{
 const px=process.env.HTTPS_PROXY||process.env.https_proxy;
 const b=await chromium.launch(px?{proxy:{server:px,bypass:'localhost,127.0.0.1'}}:{});
 const mk=async(k,vp)=>{const ctx=await b.newContext({viewport:{width:vp.w,height:vp.h},deviceScaleFactor:vp.d,hasTouch:true,isMobile:vp.w<1100,ignoreHTTPSErrors:true});
  const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.on('console',m=>{if(m.type()==='error')p.errs.push('console: '+m.text())});p.ctx=ctx;p.k=k;return p};
 const shot=async(p,n)=>{await p.waitForTimeout(400);try{await p.screenshot({path:`${OUT}/${n}-${p.k}.png`,timeout:120000,animations:'disabled'})}catch(e){log('shot timeout',n,p.k)}
  const r=await p.evaluate(()=>{const vw=innerWidth;const bad=[];document.querySelectorAll('#modal:not([hidden]) *, #coopfz *').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.right>vw+1||q.left<-1)bad.push('out:'+e.className);if(e.scrollWidth>e.clientWidth+1&&/hidden|clip/.test(getComputedStyle(e).overflowX)&&e.tagName!=='INPUT')bad.push('clip:'+e.className+':'+e.textContent.slice(0,20))});
   return{ovx:document.documentElement.scrollWidth>vw,bad:bad.slice(0,5),ell:/…/.test((document.querySelector('#modal:not([hidden])')||document.body).innerText)}});
  log(n,p.k,JSON.stringify(r))};
 const A=await mk('A',VP.A);
 await A.goto(BASE,{waitUntil:'domcontentloaded'});await A.waitForTimeout(2500);
 await shot(A,'1-home');
 await A.locator('#modal .kco').click();await shot(A,'2-co');
 await A.locator('[data-coop=make]').first().click();
 await A.waitForFunction(()=>COOP.state.status==='open',null,{timeout:20000});
 const code=await A.evaluate(()=>COOP.state.room);log('room',code);
 await shot(A,'3-wait');
 const B=await mk('B',VP.B);
 // B: join by typing the code
 await B.goto(BASE,{waitUntil:'domcontentloaded'});await B.waitForTimeout(2500);
 await B.locator('#modal .kco').click();await B.locator('[data-coop=join]').click();await shot(B,'4-join');
 await B.fill('#coop-code',code.toLowerCase());await B.locator('[data-coop=go]').click();
 const starts=await Promise.all([A,B].map(p=>p.waitForFunction(()=>COOP.state.playing&&COOP.state.bothIn,null,{timeout:20000}).then(()=>true,()=>false)));
 log('both started',starts, await A.evaluate(()=>COOP.state.you), await B.evaluate(()=>COOP.state.you));
 await shot(A,'5-started');
 // B leaves (tab closed) -> A freezes
 await B.close();
 const fr=await A.waitForFunction(()=>!!document.querySelector('#coopfz'),null,{timeout:60000}).then(()=>true,()=>false);log('A frozen',fr);
 await shot(A,'6-freeze');
 // B comes back via link ?room=CODE (same context = same pid)
 const B2=await B.ctx.newPage();B2.k='B';B2.errs=[];B2.on('pageerror',e=>B2.errs.push(e.message));
 await B2.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});
 const back=await A.waitForFunction(()=>!document.querySelector('#coopfz'),null,{timeout:30000}).then(()=>true,()=>false);
 log('A unfrozen',back,'B2 you',await B2.evaluate(()=>COOP.state.you));
 // week wait panel (A ended, B not)
 await A.evaluate(()=>{COOP.state.ended={a:true,b:false};COOP_LOBBY.check()});await shot(A,'7-weekwait');
 await B2.evaluate(()=>{COOP.state.ended={a:false,b:true};COOP_LOBBY.check()});await shot(B2,'7-weekwait');
 // third person: full
 const Cc=await mk('C',VP.B);await Cc.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await Cc.waitForTimeout(5000);await shot(Cc,'8-full');
 // bad code
 const D=await mk('D',VP.A);await D.goto(BASE+'?room=ZZZZ',{waitUntil:'domcontentloaded'});await D.waitForTimeout(5000);await shot(D,'9-noroom');
 // A own net drop: close A socket (simulate)
 await A.evaluate(()=>{COOP.state.ended={a:false,b:false};});await A.context().setOffline(true);await A.evaluate(()=>COOP._ws&&COOP._ws.close());
 log('errs',A.errs,B2.errs,Cc.errs,D.errs);
 await b.close()})().catch(e=>{console.error('FAIL',e);process.exit(1)});
