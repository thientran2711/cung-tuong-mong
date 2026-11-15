/* Hold-and-drag page turn (owner 11/15 08:10Z): the sheet BENDS with the finger, stays where the finger stops; release under half → back,
   flick → turns. Real touch input through CDP (Input.dispatchTouchEvent: the browser's own scroll / touch-action decisions apply).
   usage: node dev/test/drag-curl.js <baseURL> <W>x<H>@dpr <outdir> <tag> [oldsave.json] [book]
   Shots (css px, light): <tag>-tab-{25,50,75}.jpg (live tab, finger held), with "book": <tag>-cover-{25,50,75}.jpg (week book cover) and
   <tag>-page-50.jpg (a paper leaf). Prints one JSON line: bend per hold (strip angle spread = curved, not a flat board), results of
   release-under-half / flick / vertical scroll / tap / Cảnh động off, one #panel, no stuck sheet, page errors, old save loads. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD,BOOK]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text().slice(0,160))});
 const cdp=await ctx.newCDPSession(p);const T=(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x:Math.round(x),y:Math.round(y),id:1}]});
 /* the first-entry asset download (jload) is not under test: an empty asset list */
 await p.route('**/assets.json*',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({v:'t',files:[]})}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 let old=null;
 if(OLD){const d=fs.readFileSync(OLD,'utf8');old=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return'ok '+S.name}catch(e){return'ERR '+e.message}},d)}
 else await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 for(let i=0;i<6;i++){await p.waitForTimeout(600);await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true})}
 const shot=n=>p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:66,scale:'css'});
 const click=t=>p.evaluate(t=>{if(tab===t)return true;const b=document.querySelector(`#tabs [data-tab=${t}]`);if(b)b.click();return !!b},t); /* (a tap on the open tab toggles the room view on phones) */
 const audit=()=>p.evaluate(()=>({tab,panels:document.querySelectorAll('#panel').length,sheets:document.querySelectorAll('.ksht').length,ox:document.documentElement.scrollWidth>innerWidth}));
 /* bend: spread of the strips' rotateY angles (a flat board turning = one angle for every strip) */
 const bend=()=>p.evaluate(()=>{const a=[...document.querySelectorAll('.ksht-st')].map(e=>{const m=/rotateY\((-?[\d.]+)deg/.exec(e.style.transform);return m?-+m[1]:0});
  return a.length?{n:a.length,min:Math.round(Math.min(...a)),max:Math.round(Math.max(...a)),flat:document.querySelectorAll('.ksht-flat').length}:null});
 /* two neighbouring page tabs in the visible tab bar (not the map): T1 → T2 forward, T2 → T1 back */
 const [T1,T2]=await p.evaluate(()=>{const B=[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent&&!b.disabled).map(b=>b.dataset.tab);for(let i=0;i+1<B.length;i++)if(B[i]!=='go'&&B[i+1]!=='go'&&B[i]!=='act')return[B[i],B[i+1]];return[B[0],B[1]]});
 await click(T1);await p.waitForTimeout(1600);
 const R=await p.evaluate(()=>{const r=document.getElementById('panel').getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});
 const y=R.y+R.h*.55,x0=R.x+R.w*.9,span=x0-R.x;
 const res={TAG,old};
 /* wait until no sheet is left and no turn runs (the loaded test machine can be far slower than KIT_TURN_MS) */
 const idle=()=>p.waitForFunction(()=>!document.querySelector('.ksht')&&!kclLive,null,{timeout:40000}).then(()=>p.waitForTimeout(250)).catch(()=>{});
 /* 1. slow drag left, hold at 25 / 50 / 75 % of the way, then go back to 30 % and let go → returns */
 const t0=await p.evaluate(()=>tab);await T('touchStart',x0,y);let x=x0;const holds={};
 for(const f of [.25,.5,.75]){const to=x0-span*f;while(x>to){x=Math.max(to,x-20);await T('touchMove',x,y)}
  await p.waitForTimeout(450);holds[f]=await bend();await shot(`tab-${Math.round(f*100)}`)}
 /* hold still: nothing moves by itself */
 const s1=await p.evaluate(()=>[...document.querySelectorAll('.ksht-st')].map(e=>e.style.transform).join());await p.waitForTimeout(500);
 const s2=await p.evaluate(()=>[...document.querySelectorAll('.ksht-st')].map(e=>e.style.transform).join());res.still=s1===s2&&s1.length>0;
 const to=x0-span*.3;while(x<to){x=Math.min(to,x+20);await T('touchMove',x,y)}await p.waitForTimeout(300);
 const tmid=await p.evaluate(()=>tab);await T('touchEnd');await idle();
 res.tab={holds,from:t0,during:tmid,afterRelease30:(await audit())};
 /* 2. flick: a short fast swipe left → turns */
 /* (the flick is dispatched inside the page: on the loaded test machine CDP events arrive ~0.5 s apart, which is no flick) */
 const flick=(x,y,dx,ptr)=>p.evaluate(([x,y,dx,ptr])=>new Promise(res=>{const t=document.elementFromPoint(x,y);let i=0;
   const ev=(type,cx)=>{if(ptr){t.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,pointerId:7,isPrimary:true,pointerType:'touch',clientX:cx,clientY:y,button:0}));return}
    const q=new Touch({identifier:7,target:t,clientX:cx,clientY:y});t.dispatchEvent(new TouchEvent(type,{bubbles:true,cancelable:true,touches:type==='touchend'?[]:[q],targetTouches:type==='touchend'?[]:[q],changedTouches:[q]}))};
   ev(ptr?'pointerdown':'touchstart',x);for(let i=1;i<=6;i++)ev(ptr?'pointermove':'touchmove',x+dx*i/6);ev(ptr?'pointerup':'touchend',x+dx);res(1)}),[x,y,dx,ptr]);
 await idle();await flick(x0,y,-150);await idle();res.flick=await audit();
 /* 3. slow drag right past half → back to the previous tab */
 await click(T2);await idle();await p.waitForTimeout(800);
 { const xs=R.x+R.w*.12;await T('touchStart',xs,y);let q=xs;const tgt=xs+(R.x+R.w-xs)*.62;while(q<tgt){q=Math.min(tgt,q+20);await T('touchMove',q,y)}
  await p.waitForTimeout(500);res.backHold=await bend();await p.waitForTimeout(300);await T('touchEnd');await idle();res.backPast=await audit()}
 /* 4. vertical drag = the page's own scroll, no turn */
 { const st0=await p.evaluate(()=>document.getElementById('panel').scrollTop);const tb=await p.evaluate(()=>tab);await T('touchStart',R.x+R.w*.5,R.y+R.h*.8);
  for(let i=1;i<=12;i++)await T('touchMove',R.x+R.w*.5+i*1.5,R.y+R.h*.8-i*22);await T('touchEnd');await p.waitForTimeout(900);
  const a=await audit();res.vertical={same:a.tab===tb,sheets:a.sheets,scrolled:(await p.evaluate(()=>document.getElementById('panel').scrollTop))-st0}}
 /* 5. tap on a button in the page = a tap (no turn) */
 { const tb=await p.evaluate(()=>tab);const bt=await p.evaluate(()=>{const e=[...document.querySelectorAll('#panel button')].find(b=>{const r=b.getBoundingClientRect();return r.width>20&&r.top>0&&r.bottom<innerHeight});if(!e)return null;const r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}});
  if(bt){await T('touchStart',bt.x,bt.y);await T('touchMove',bt.x+3,bt.y+1);await T('touchEnd');await p.waitForTimeout(700)}
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});const a=await audit();res.tap={button:!!bt,noTurnSheet:a.sheets===0}}
 /* 6. Cảnh động off: the drag still moves the page (flat slide, no bend) */
 await click(T1);await p.waitForTimeout(1500);
 { await p.evaluate(()=>{OPT.fxon=false});await T('touchStart',x0,y);let q=x0;while(q>x0-span*.4){q-=20;await T('touchMove',q,y)}await p.waitForTimeout(300);
  res.off=await bend();await T('touchEnd');await p.waitForTimeout(1200);res.offAfter=await audit();await p.evaluate(()=>{OPT.fxon=true})}
 /* 7. week book (dawn): cover = stiff board, a leaf = paper; mouse drag (pointer events) */
 if(BOOK){await p.evaluate(()=>{const P=kpPeople().filter(x=>x[1]!==S).slice(0,3);P.forEach(([n])=>{log(`${n} sai người mang lễ vật sang cung ngươi.`);log(`${n} gặp ngươi ở Ngự hoa viên.`)});log('Triều đình: Được mùa ở Giang Nam.')});
  await p.evaluate(()=>{dawn()});await p.waitForTimeout(3500);await p.evaluate(()=>{const d=document.querySelector('#kmcal,.kmcal');if(d)d.click()});await p.waitForTimeout(900);
  const bk=async(name,go)=>{await p.evaluate(g=>window.__kbk.go(g),go);await p.waitForTimeout(400);
   const r=await p.evaluate(()=>{const r=document.querySelector('.kbk-book').getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height,mode:__kbk.mode}});
   const bx=r.x+r.w*.93,by=r.y+r.h*.6,sp=bx-r.x;await T('touchStart',bx,by);let q=bx;const out={};
   for(const f of (name==='cover'?[.25,.5,.75]:[.5])){const to=bx-sp*f;while(q>to){q=Math.max(to,q-20);await T('touchMove',q,by)}await p.waitForTimeout(450);out[f]=await bend();await shot(`${name}-${Math.round(f*100)}`)}
   const back=bx-sp*.3;while(q<back){q=Math.min(back,q+20);await T('touchMove',q,by)}await p.waitForTimeout(200);await T('touchEnd');await idle();
   out.back30=await p.evaluate(()=>({cur:__kbk.cur,sheets:document.querySelectorAll('.ksht').length}));
   await flick(bx,by,-150,true);await idle();
   out.flick=await p.evaluate(()=>({cur:__kbk.cur,sheets:document.querySelectorAll('.ksht').length}));out.mode=r.mode;return out};
  res.cover=await bk('cover',0);res.leaf=await bk('page',1);
  /* tap ‹ › = animated curl with KIT_TURN_MS */
  res.btn=await p.evaluate(()=>new Promise(r=>{__kbk.go(1);const c0=__kbk.cur;__kbk.next();const t0=performance.now();setTimeout(()=>{const a=[...document.querySelectorAll('.ksht-st')].map(e=>{const m=/rotateY\((-?[\d.]+)deg/.exec(e.style.transform);return m?-+m[1]:0});
   const w=()=>{if(document.querySelector('.ksht')&&performance.now()-t0<30000){setTimeout(w,100);return}r({from:c0,mid:a.length?Math.round(Math.max(...a)-Math.min(...a)):0,cur:__kbk.cur,sheets:document.querySelectorAll('.ksht').length})};w()},KIT_TURN_MS*.45)}));
  await p.evaluate(()=>{try{__kbk.close()}catch(e){}})}
 res.pair=[T1,T2];res.end=await audit();res.ids=await p.evaluate(()=>{const c={};let d=0;document.querySelectorAll('[id]').forEach(e=>{if(c[e.id])d++;c[e.id]=1});return d});res.errs=errs.slice(0,8);
 console.log(JSON.stringify(res));await b.close()})();
