/* opt-centre-tap (KK37 items 4+5: robot M2 UX-OPTION-CENTRE ×469 «a centre tap on an option card hits the odds chip», M5b «Sai … đi dò la» picker card
   centre = portrait = no action, M2 «left side of an option opens its picture full-screen»): EVERY PEND event frame (+ c2a), Fold 755x1000 + iPad 1180x820.
   For each option card (first 3 per frame) a REAL touch tap at its CENTRE and at its PICTURE (left thumb) — fresh frame each tap. Verdict per tap:
     CHOSE  = the card did its job (frame left Q[0] / Q changed, or in a hand the card lifted with ✓ / ✕, or a confirm / follow-up opened)
     STOLE  = something else answered (kit popup #kpop, an emotion tip, a picture viewer, a ladder) and the card did nothing
     DEAD   = nothing happened.  Also CUT = the card is not fully visible inside the dialog (needs a scroll) at open.
   usage: node dev/test/opt-centre-tap.js <index.html> [WxH,...]   env ONLY=regex (frame ids) MAXF=n (frames, default all)   exit 1 on STOLE/DEAD */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]);const SIZES=(A[1]||'755x1000,1180x820').split(',');
(async()=>{const b=await chromium.launch();const rows=[];let bad=0;const tot={};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<H?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;try{kn();for(const v of rivals){S.met[v.id]=1}}catch(e){}});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#dawn,#kdaytc{display:none!important}'});
  const ids=await p.evaluate(()=>['c2a'].concat(Object.keys(PEND)));const re=process.env.ONLY?new RegExp(process.env.ONLY):null;const list=ids.filter(i=>!re||re.test(i)).slice(0,+(process.env.MAXF||1e9));
  /* open one frame fresh (same filler as opt-frame-scroll-scan) */
  const open=id=>p.evaluate(id=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');const kp=document.getElementById('kpop');if(kp)kp.remove();
   if(id==='c2a'){try{if((()=>{try{S.evc=null;EVCW.length=0}catch(e){}/* clean day: LIVE jevc daily cap */return rgFire('c1b')})()/*c2a = a side choice = vòng nhóm (KIT §101.9)*/){Q.length=1;showModal();return true}}catch(e){}return false}
   const v=(liveRivals(true)||[])[0];const C=[...(liveRivals(true)||[]).map(x=>x.id),...((S.srvs||S.servants||[]).map(x=>x&&x.id)),null,0,1,2,'emp','th','hh'];const E6=typeof EV6!=='undefined'?EV6[id]:null;let p6=null;
   if(E6&&typeof A6==='function'){p6={vi:0};for(let i=0;i<(E6.a||[]).length;i++){const c=C.find(x=>{try{return !!A6(E6.a[i],x)}catch(e){return false}});if(c===undefined){p6=null;break}p6['a'+i]=c}}
   for(const pp of [...(p6?[p6]:[]),{v:v&&v.id},{q:2,vp:0},{a0:v&&v.id,vi:0},{}]){let d=null;const pc=Object.assign({},pp);try{d=PEND[id](pc)}catch(e){d=null}if(!d)continue;try{Q.length=0;pushDil(mkP(id,pc),'Tuyến truyện');showModal();if(Q.length&&!document.getElementById('modal').hidden)return true}catch(e){}}return false},id).catch(()=>false);
  const SEL='#modal .opts>button,#modal .kpopts>button,#modal .k3btns>button,#modal #mr>button,#modal .kszopts>button,#modal .opts.khand>button.kopt';
  const snap=()=>p.evaluate(SEL=>{const M=document.getElementById('modal');const kp=document.getElementById('kpop');const vis=e=>e&&!e.hidden&&e.getClientRects().length&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden';
   const other=[...document.querySelectorAll('#kpop,.kemotip,.kemo-tip,.kzoom,.kpicv,.kimgv,.klight,[class*=zoom],[class*=lightbox]')].filter(vis).map(e=>e.id||e.className.toString().slice(0,20));
   return {q0:Q[0]?(Q[0].__id||(Q[0].__id=Math.random().toString(36).slice(2))):null,ql:Q.length,hid:M.hidden,lift:document.querySelectorAll('#modal .khlift,#modal .khconf:not([hidden]),#modal .ksel,#modal .kopt.on').length,html:(M.innerText||'').length,other}},SEL);
  const cards=()=>p.evaluate(SEL=>{const M=document.querySelector('#modal .dlg');if(!M)return [];const D=M.getBoundingClientRect();const mb=document.getElementById('mb');const B=mb?mb.getBoundingClientRect():D;
   return [...document.querySelectorAll(SEL)].filter(e=>e.getClientRects().length&&!e.disabled&&e.getBoundingClientRect().width>30).slice(0,3).map((e,i)=>{const r=e.getBoundingClientRect();const im=e.querySelector('img,.kpor,.kthumb,[class*=thumb],[class*=pic]');const ir=im&&im.getBoundingClientRect();
    return {i,name:(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,30),cut:r.bottom>Math.min(D.bottom,innerHeight)+1||r.top<Math.max(D.top,0)-1,c:[r.left+r.width/2,r.top+r.height/2],pic:ir&&ir.width>8?[ir.left+ir.width/2,ir.top+ir.height/2]:null}})},SEL);
  for(const id of list){if(!(await open(id)))continue;await p.waitForTimeout(900);const cs=await cards();if(!cs.length)continue;
   for(const c of cs){if(c.cut){rows.push([dev,id,c.name,'open','CUT']);tot.CUT=(tot.CUT||0)+1}
    for(const where of ['centre','picture']){if(where==='picture'&&!c.pic)continue;if(!(await open(id)))break;await p.waitForTimeout(700);const now=(await cards())[c.i];if(!now)break;const pt=where==='centre'?now.c:now.pic;
     if(pt[1]<0||pt[1]>H){/* scroll it into view first, as a player would */await p.evaluate(([SEL,i])=>{const e=[...document.querySelectorAll(SEL)].filter(e=>e.getClientRects().length&&!e.disabled&&e.getBoundingClientRect().width>30)[i];if(e)e.scrollIntoView({block:'center'})},[SEL,c.i]);await p.waitForTimeout(300);const n2=(await cards())[c.i];if(!n2)break;pt[0]=(where==='centre'?n2.c:n2.pic)[0];pt[1]=(where==='centre'?n2.c:n2.pic)[1]}
     const s0=await snap();await p.touchscreen.tap(pt[0],pt[1]);await p.waitForTimeout(800);const s1=await snap();
     const chose=s1.q0!==s0.q0||s1.ql!==s0.ql||s1.hid!==s0.hid||s1.lift>s0.lift||Math.abs(s1.html-s0.html)>40&&!s1.other.length;const v=chose?'CHOSE':s1.other.length?'STOLE':'DEAD';tot[v]=(tot[v]||0)+1;
     if(v!=='CHOSE'){bad++;rows.push([dev,id,c.name,where,v+(s1.other.length?' by '+s1.other.join(','):'')])}}}}
  await ctx.close()}
 for(const r of rows)console.log(r.join(' | '));console.log('TOTAL',JSON.stringify(tot));console.log(bad?`OPT-CENTRE FAIL ${bad}`:'OPT-CENTRE PASS');await b.close();process.exit(bad?1:0)})();
