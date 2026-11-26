/* MOTION-BUILD «Vòng bảo vật» kitRingItem: check + real-tap recording.
   usage: node dev/test/kit-ring-item.js <url> <outdir> <check|gift|shop> [WxH]
   check = open every wired picker, measure (ring present, front bright, tiles in view, no page errors, pane in view after focus, act gives result rows), JSON line.
   gift / shop = real touch taps / swipes recorded to <outdir>/<scene>-<WxH>.webm (owner look gate videos). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,SC,WH]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const [W,H]=(WH||'755x1000').split('x').map(Number);const rec=SC!=='check';
 const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'},rec?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{}));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();const T0=Date.now();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});
 await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(typeof S!=='undefined'&&S&&!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.rank=Math.max(S.rank,2);S.bac=500;S.used=0;
  for(const k of ["tramngoc","vongngoc","sonphan","boodieu","tramphuong","vongvang","ngocboi","tuithom","guong","quatcong"])if(IT[k])S.inv.push({k,from:"me"});
  for(const k of Object.keys(IT).filter(k=>IT[k].kd==="Vải vóc"||IT[k].kd==="Hương liệu").slice(0,4))S.inv.push({k,from:"me"});
  try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
 await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;
  ['#kdaytc','#klife','#kmrew'].forEach(s=>document.querySelectorAll(s).forEach(e=>e.remove()));try{KMSNAP=kmSnap()}catch(e){}render()});
 const w=ms=>p.waitForTimeout(ms);const tapXY=(x,y)=>p.touchscreen.tap(x,y);
 const at=s=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},s);
 const tap=async s=>{const c=await at(s);if(!c)throw new Error('no '+s);await tapXY(c[0],c[1]);return c};
 const swipe=async(x0,x1,y,steps)=>{const cdp=await ctx.newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y}]});
  for(let i=1;i<=steps;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+(x1-x0)*i/steps,y}]});await w(16)}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})};
 const ringY=()=>p.evaluate(()=>{const r=document.querySelector('.kri-ring').getBoundingClientRect();return r.top});
 const front=()=>p.evaluate(()=>{const t=document.querySelector('.kri-t.kri-front');const r=t.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
 const side=d=>p.evaluate(d=>{const R=kitRingItem.cur;const N=document.querySelectorAll('.kri-t').length;const f=kitRingItem.front();const t=document.querySelectorAll('.kri-t')[(f+d+N)%N];const r=t.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},d);
 const actBtn=re=>p.evaluate(re=>{const b=[...document.querySelectorAll('.kri-pane [data-kria],.kri-pane [data-krib],.kri-pane [data-kriq]')].find(b=>new RegExp(re).test(b.textContent));if(!b)return null;const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},re);
 const tapAct=async re=>{const c=await actBtn(re);if(c)await tapXY(c[0],c[1]);return !!c};
 const queen=await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.queen)||liveRivals(true)[0];try{S.met=S.met||{};S.met[v.id]=S.met[v.id]||1}catch(e){}return v.id});
 const openGift=()=>p.evaluate(id=>{pushDil(mkP("giftpick",{v:id}),"Tặng quà");showModal();render()},queen);
 const openShop=()=>p.evaluate(()=>{kitShopNvp();render()});
 const meas=()=>p.evaluate(()=>{const R=kitRingItem.cur;if(!R)return{open:false};const T=[...document.querySelectorAll('.kri-t')];const f=document.querySelector('.kri-t.kri-front');const vw=innerWidth,vh=innerHeight;
  const inV=e=>{const r=e.getBoundingClientRect();return r.left>=-1&&r.right<=vw+1&&r.top>=-1&&r.bottom<=vh+1};const pane=document.querySelector('.kri-pane');
  return{open:true,state:R.state,tiles:T.length,front:!!f,frontOp:f?+getComputedStyle(f).opacity:0,dimOp:T.filter(t=>t!==f).map(t=>+getComputedStyle(t).opacity).reduce((a,b)=>Math.max(a,b),0),
   tilesInView:T.every(inV),pane:pane?{inView:inV(pane),acts:pane.querySelectorAll('[data-kria]').length,res:!!pane.querySelector('.kri-res'),rows:pane.querySelectorAll('.kri-res .kr').length,resTxt:(pane.querySelector('.kri-res')||{}).innerText||'',overflowX:pane.scrollWidth>pane.clientWidth+2}:null,
   ovf:document.documentElement.scrollWidth>vw+1}});
 const marks={};const mark=k=>{marks[k]=+((Date.now()-T0)/1000).toFixed(1)};
 const out={sz:W+'x'+H};
 await p.evaluate(async()=>{const srcs=[];try{S.inv.forEach(e=>{const I=kipItem(e);if(I.src)srcs.push(I.src)})}catch(e){}try{(S.shop||[]).forEach(k=>srcs.push(kitItemSrc(k,'')))}catch(e){}
  await Promise.all(srcs.map(s=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=s;setTimeout(r,8000)})))});
 await p.evaluate(()=>{['#kdaytc','#klife','#kmrew','.kroul','#kroulw'].forEach(s=>document.querySelectorAll(s).forEach(e=>e.remove()))});
 if(SC==='check'){
  await openGift();await w(900);out.gift0=await meas();await p.screenshot({path:`${OUT}/${W}x${H}-gift-ring.jpg`,type:'jpeg',quality:60});out.under=await p.evaluate(()=>document.elementsFromPoint(innerWidth/2,innerHeight*.85).slice(0,5).map(e=>(e.id||'')+'.'+String(e.className).slice(0,30)));const c=await front();await tapXY(c[0],c[1]);await w(1100);out.giftFocus=await meas();await p.screenshot({path:`${OUT}/${W}x${H}-gift-focus.jpg`,type:'jpeg',quality:60});
  await tapAct('Tặng');await w(1200);out.giftAct=await meas();out.stray=await p.evaluate(()=>{const e=document.elementsFromPoint(innerWidth*.79,innerHeight*.76);return e.slice(0,4).map(x=>(x.id||'')+'.'+String(x.className).slice(0,40))});await p.screenshot({path:`${OUT}/${W}x${H}-gift.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>kitRingItem.close(true));await w(300);out.giftModalLeft=await p.evaluate(()=>!document.getElementById('modal').hidden&&!!document.querySelector('#modal .kipw'));
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
  await openShop();await w(900);out.shop0=await meas();const s=await front();await tapXY(s[0],s[1]);await w(1100);await tapAct('^\\+$|Thêm');await tapAct('^Mua');await w(900);out.shopAct=await meas();out.bac=await p.evaluate(()=>S.bac);
  await p.screenshot({path:`${OUT}/${W}x${H}-shop.jpg`,type:'jpeg',quality:60});
  await tapAct('Xem món khác');await w(700);await tap('.kri-tabs [data-kritab="sell"]').catch(()=>{});await w(800);out.sell=await meas();
  out.errs=errs;console.log(JSON.stringify(out));await b.close();return}
 if(SC==='bag'){
  await p.evaluate(()=>{try{tab='inv'}catch(e){}render()});await w(1200);const c=await at('.kinv[data-kinv="tutrang"] .kinvg [data-kinvi]');out.tile=!!c;if(c){await tapXY(c[0],c[1]);await w(1500)}out.bag=await meas();
  await p.screenshot({path:`${OUT}/${W}x${H}-bag.jpg`,type:'jpeg',quality:60});out.acts=await p.evaluate(()=>[...document.querySelectorAll('.kri-pane [data-kria]')].map(b=>b.textContent.trim()));
  const ok=await tapAct('^(Dùng|Đeo|Mặc)');await w(1200);out.actTapped=ok;out.after=await meas();await p.screenshot({path:`${OUT}/${W}x${H}-bag2.jpg`,type:'jpeg',quality:60});out.errs=errs;console.log(JSON.stringify(out));await b.close();return}
 if(SC==='perf'){
  const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});out.base=await p.evaluate(()=>new Promise(r=>{const F=[];let l=performance.now();const f=n=>{F.push(n-l);l=n;if(F.length<90)requestAnimationFrame(f);else{F.shift();const a=F.reduce((x,y)=>x+y,0)/F.length;r({idleFps:+(1000/a).toFixed(1)})}};requestAnimationFrame(f)}));
  await openShop();await w(2500);out.ringIdle=await p.evaluate(()=>new Promise(r=>{const F=[];let l=performance.now();const f=n=>{F.push(n-l);l=n;if(F.length<60)requestAnimationFrame(f);else{F.shift();const a=F.reduce((x,y)=>x+y,0)/F.length;r({fps:+(1000/a).toFixed(1)})}};requestAnimationFrame(f)}));
  await p.evaluate(()=>{window.__fr=[];let l=performance.now();const f=n=>{window.__fr.push(n-l);l=n;if(window.__fr.length<400)requestAnimationFrame(f)};requestAnimationFrame(f)});
  const y=await ringY();await swipe(W*.8,W*.2,y,14);await w(1500);await tap('.kri-ar[aria-label="Quay phải"]');await w(700);const c=await front();await tapXY(c[0],c[1]);await w(1200);await tapAct('‹ Vòng');await w(900);
  out.perf=await p.evaluate(()=>{const F=window.__fr.slice(2).filter(x=>x<1000);F.sort((a,b)=>a-b);const n=F.length;const avg=F.reduce((a,b)=>a+b,0)/n;return{frames:n,avgMs:+avg.toFixed(1),fps:+(1000/avg).toFixed(1),p95:+F[Math.floor(n*.95)].toFixed(1),over33:F.filter(x=>x>33.4).length}});
  out.errs=errs;console.log(JSON.stringify(out));await b.close();return}
 if(SC==='gift'){
  await w(400);mark('start');await openGift();await w(2000);const y=(await ringY());
  await swipe(W*.8,W*.25,y,14);await w(1800);await tap('.kri-ar[aria-label="Quay phải"]');await w(900);await tap('.kri-ar[aria-label="Quay phải"]');await w(900);
  let c=await side(-1);await tapXY(c[0],c[1]);await w(1200);
  c=await front();await tapXY(c[0],c[1]);await w(2600);
  await tapAct('‹ Vòng');await w(1300);await swipe(W*.3,W*.7,y,10);await w(1700);
  c=await front();await tapXY(c[0],c[1]);await w(2400);await tapAct('^Tặng');await w(3800);mark('result');
  await tap('.kri .kit-x');await w(1200);mark('end')}
 if(SC==='shop'){
  await w(400);mark('start');await openShop();await w(2000);const y=await ringY();
  await swipe(W*.78,W*.3,y,12);await w(1800);let c=await side(1);await tapXY(c[0],c[1]);await w(1100);
  c=await front();await tapXY(c[0],c[1]);await w(2200);await tapAct('^\\+$|Thêm');await w(600);await tapAct('^Mua');await w(3200);mark('bought');
  await tapAct('Xem món khác');await w(1200);await tap('.kri-tabs [data-kritab="sell"]').catch(()=>{});await w(1800);
  c=await front();await tapXY(c[0],c[1]);await w(2000);await tapAct('^Bán');await w(3000);mark('sold');
  await tap('.kri .kit-x');await w(400);await tap('.kri .kit-x').catch(()=>{});await w(1000);mark('end')}
 fs.writeFileSync(`${OUT}/marks-${SC}-${W}x${H}.json`,JSON.stringify({marks,errs}));const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${OUT}/${SC}-${W}x${H}.webm`);
 console.log(SC,W+'x'+H,JSON.stringify(marks),errs.slice(0,3));await b.close()})();
