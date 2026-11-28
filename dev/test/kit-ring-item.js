/* MOTION-BUILD «Vòng bảo vật» kitRingItem: check + real-tap recording.
   usage: node dev/test/kit-ring-item.js <url> <outdir> <check|bag|perf|gift|shop|toil|title|hd|face> [WxH]
   toil / title / hd / face = real-tap recordings of the toilette dress chest, the Danh hiệu panel, the hoa điền step, the new-game face picker + a JSON line (ring opened, old picker hidden, result).
   check = open every wired picker, measure (ring present, front bright, tiles in view, no page errors, pane in view after focus, act gives result rows), JSON line.
   gift / shop = real touch taps / swipes recorded to <outdir>/<scene>-<WxH>.webm (owner look gate videos). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,OUT,SC,WH]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const [W,H]=(WH||'755x1000').split('x').map(Number);const rec=SC!=='check';
 const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'},rec?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{}));
 await ctx.addInitScript(([sc,off])=>{window.__SC=sc;if(off)window.__kriOff=1},[SC,!!process.env.KRI_OFF]);await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();const T0=Date.now();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});
 await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(typeof S!=='undefined'&&S&&!(typeof isSrv==='function'&&isSrv()))break}
  if(window.__SC==='face')return;Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.rank=Math.max(S.rank,2);S.bac=500;S.used=0;
  for(const k of ["tramngoc","vongngoc","sonphan","boodieu","tramphuong","vongvang","ngocboi","tuithom","guong","quatcong"])if(IT[k])S.inv.push({k,from:"me"});
  for(const k of Object.keys(IT).filter(k=>IT[k].kd==="Vải vóc"||IT[k].kd==="Hương liệu").slice(0,4))S.inv.push({k,from:"me"});
  try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
 await p.waitForTimeout(1500);if(SC!=='face')await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove());Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}document.getElementById('modal').hidden=true;
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
 /* OVERLAP SCAN (MAIN 162 / owner 20:30Z): no ring tile / big item may cover a button, plaque, tab row or any tap target; the big item lies inside the stage */
 const ovl=()=>p.evaluate(()=>{const R=kitRingItem.cur;if(!R)return null;
  const shown=e=>{const r=e.getBoundingClientRect();if(!(r.width>1&&r.height>1))return null;for(let a=e;a;a=a.parentElement){if(a.hidden)return null;const cs=getComputedStyle(a);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<.05)return null}return r};
  const nm=e=>(e.id?'#'+e.id:'')+'.'+String(e.className||'').split(' ').slice(0,2).join('.')+(e.textContent?'«'+e.textContent.trim().slice(0,14)+'»':'');
  const A=[...document.querySelectorAll('.kri .kri-t, .kri .kri-big')].map(e=>[e,shown(e)]).filter(x=>x[1]);
  const T=[...document.querySelectorAll('button, [role=button], .kri-ar, .kri-tabs, .kit-x, .kri-pane, .kri-acts, .kri-name b, header.hud, nav, .kbtn')].filter(e=>!e.closest('.kri-t,.kri-big')).map(e=>[e,shown(e)]).filter(x=>x[1]);
  /* a target outside the ring layer that the scene itself covers (stage figures, the bag grid under the scene) is not tappable: skipped (hit test with the ring items hidden) */
  const H=A.map(([e])=>[e,e.style.visibility]);H.forEach(([e])=>e.style.visibility='hidden');const reach=([t,r])=>{if(t.closest('.kri'))return true;const pts=[[.5,.5],[.15,.5],[.85,.5],[.5,.15],[.5,.85]];return pts.some(([fx,fy])=>{const x=r.left+r.width*fx,y=r.top+r.height*fy;if(x<0||y<0||x>=innerWidth||y>=innerHeight)return false;const h=document.elementFromPoint(x,y);return !!h&&(t===h||t.contains(h))})};
  const T2=T.filter(reach);H.forEach(([e,v])=>e.style.visibility=v);T.length=0;T.push(...T2);
  const hit=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1;
  const L=[];for(const [a,ra] of A)for(const [t,rt] of T){if(t.contains(a)||a.contains(t))continue;if(hit(ra,rt))L.push(nm(a).slice(0,30)+' × '+nm(t).slice(0,40))}
  const st=R.L.getBoundingClientRect(),bg=R.big&&shown(R.big);const bigOut=!!bg&&(bg.left<st.left-1||bg.right>st.right+1||bg.top<st.top-1||bg.bottom>st.bottom+1);
  return{n:L.length,bigOut,L:L.slice(0,6)}});
 const OV={};const ov=async k=>{OV[k]=await ovl()};
 await p.evaluate(async()=>{const srcs=[];try{S.inv.forEach(e=>{const I=kipItem(e);if(I.src)srcs.push(I.src)})}catch(e){}try{(S.shop||[]).forEach(k=>srcs.push(kitItemSrc(k,'')))}catch(e){}
  await Promise.all(srcs.map(s=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=s;setTimeout(r,8000)})))});
 if(SC!=='face')await p.evaluate(()=>{['#kdaytc','#klife','#kmrew','.kroul','#kroulw'].forEach(s=>document.querySelectorAll(s).forEach(e=>e.remove()))});
 if(SC==='check'){
  await openGift();await w(900);out.gift0=await meas();await ov('gift-ring');await p.screenshot({path:`${OUT}/${W}x${H}-gift-ring.jpg`,type:'jpeg',quality:60});out.under=await p.evaluate(()=>document.elementsFromPoint(innerWidth/2,innerHeight*.85).slice(0,5).map(e=>(e.id||'')+'.'+String(e.className).slice(0,30)));const c=await front();await tapXY(c[0],c[1]);await w(1100);out.giftFocus=await meas();await ov('gift-focus');await p.screenshot({path:`${OUT}/${W}x${H}-gift-focus.jpg`,type:'jpeg',quality:60});
  await tapAct('Tặng');await w(1200);out.giftAct=await meas();await ov('gift-result');out.stray=await p.evaluate(()=>{const e=document.elementsFromPoint(innerWidth*.79,innerHeight*.76);return e.slice(0,4).map(x=>(x.id||'')+'.'+String(x.className).slice(0,40))});await p.screenshot({path:`${OUT}/${W}x${H}-gift.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>kitRingItem.close(true));await w(300);out.giftModalLeft=await p.evaluate(()=>!document.getElementById('modal').hidden&&!!document.querySelector('#modal .kipw'));
  await p.evaluate(()=>{Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}document.getElementById('modal').hidden=true});
  await openShop();await w(900);out.shop0=await meas();await ov('shop-ring');const s=await front();await tapXY(s[0],s[1]);await w(1100);await ov('shop-focus');await tapAct('^\\+$|Thêm');await tapAct('^Mua');await w(900);out.shopAct=await meas();await ov('shop-result');out.bac=await p.evaluate(()=>S.bac);
  await p.screenshot({path:`${OUT}/${W}x${H}-shop.jpg`,type:'jpeg',quality:60});
  await tapAct('Xem món khác');await w(700);await tap('.kri-tabs [data-kritab="sell"]').catch(()=>{});await w(1600);out.sell=await meas();await ov('sell-ring');
  out.ov=OV;out.errs=errs;console.log(JSON.stringify(out));await b.close();return}
 if(SC==='bag'){
  await p.evaluate(()=>{try{tab='inv'}catch(e){}render()});await w(1200);const c=await at('.kinv[data-kinv="tutrang"] .kinvg [data-kinvi]');out.tile=!!c;if(c){await tapXY(c[0],c[1]);await w(1500)}out.bag=await meas();await ov('bag-focus');
  await p.screenshot({path:`${OUT}/${W}x${H}-bag.jpg`,type:'jpeg',quality:60});out.acts=await p.evaluate(()=>[...document.querySelectorAll('.kri-pane [data-kria]')].map(b=>b.textContent.trim()));
  const ok=await tapAct('^(Dùng|Đeo|Mặc)');await w(1200);out.actTapped=ok;out.after=await meas();await ov('bag-result');await p.screenshot({path:`${OUT}/${W}x${H}-bag2.jpg`,type:'jpeg',quality:60});out.ov=OV;out.errs=errs;console.log(JSON.stringify(out));await b.close();return}
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

 const vis=s=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return false;const r=e.getBoundingClientRect();const cs=getComputedStyle(e);let m=e.closest('#modal');return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&!(m&&(m.hidden||getComputedStyle(m).visibility==='hidden'))},s);
 const res=()=>p.evaluate(()=>{const r=document.querySelector('.kri-pane .kri-res');return r?r.innerText.replace(/\n/g,' | '):''});
 const shot=n=>p.screenshot({path:`${OUT}/${W}x${H}-${n}.jpg`,type:'jpeg',quality:60});
 if(SC==='toil'){
  await p.evaluate(()=>{for(const k of Object.keys(WD_ITEMS).filter(k=>WD_ITEMS[k].sl==="tram").slice(0,3))S.inv.push({k,from:"me"});try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
  await w(400);mark('start');await p.evaluate(()=>{toilOpen()});await w(1500);
  if(!await vis('#kg82 [data-kinvkey="toil"][data-kinvi]'))await p.evaluate(()=>{try{toilDressUI()}catch(e){console.log('toilDressUI',e)}});await w(1500);
  out.oldGrid=await vis('#kg82 [data-kinvkey="toil"][data-kinvi]');await shot('toil-old');
  await tap('#kg82 [data-kinvkey="toil"][data-kinvi]');await w(1800);out.open=await meas();await ov('toil-focus');await shot('toil-focus');out.acts=await p.evaluate(()=>[...document.querySelectorAll('.kri-pane [data-kria]')].map(b=>b.textContent.trim()));
  await tapAct('^(Cài|Mặc|Đeo|Tháo)');await w(1600);out.res=await res();await ov('toil-result');await shot('toil-res');
  await tapAct('Xem món khác');await w(900);const y=await ringY();await swipe(W*.75,W*.3,y,10);await w(1600);await ov('toil-ring');let c=await front();await tapXY(c[0],c[1]);await w(1800);
  await tapAct('^(Cài|Mặc|Đeo|Tháo)');await w(1600);out.res2=await res();
  await tap('.kri .kit-x');await w(500);await tap('.kri .kit-x').catch(()=>{});await w(1200);out.closed=await p.evaluate(()=>!kitRingItem.cur);out.backToToil=await vis('#kg82 #toilok');await shot('toil-back');mark('end')}
 if(SC==='title'){
  await p.evaluate(()=>{const K=DHKEYS();S.dh=S.dh||{};K.slice(0,6).forEach(k=>{S.dh[k]=S.dh[k]||{};S.dh[k].i=0});render()});
  await w(400);mark('start');await p.evaluate(()=>{dhPanel()});await w(1500);out.panel=await vis('#modal .opt[data-m]');await shot('title-old');
  const c0=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(b=>/^Đeo «/.test(Q[0].opts[+b.dataset.m].n));if(!b)return null;b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
  out.deo=!!c0;if(c0){await w(500);const c1=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(b=>/^Đeo «/.test(Q[0].opts[+b.dataset.m].n));const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});await tapXY(c1[0],c1[1])}
  await w(1800);out.open=await meas();out.modalHidden=!(await vis('#modal .opt[data-m]'));await ov('title-focus');await shot('title-focus');out.acts=await p.evaluate(()=>[...document.querySelectorAll('.kri-pane [data-kria]')].map(b=>b.textContent.trim()));
  await tapAct('.');await w(1600);out.res=await res();out.worn=await p.evaluate(()=>S.titleWorn||null);await ov('title-result');await shot('title-res');
  await tapAct('Xem món khác');await w(900);const y=await ringY();await swipe(W*.75,W*.3,y,10);await w(1600);await ov('title-ring');await shot('title-ring');
  await tap('.kri .kit-x');await w(500);await tap('.kri .kit-x').catch(()=>{});await w(1200);out.closed=await p.evaluate(()=>!kitRingItem.cur);out.panelBack=await vis('#modal .opt[data-m]');mark('end')}
 if(SC==='hd'){
  await p.evaluate(()=>{for(const k of Object.keys(WD_ITEMS).filter(k=>WD_ITEMS[k].sl==="hd").slice(0,5))S.inv.push({k,from:"me"});try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
  await w(400);mark('start');await p.evaluate(()=>{toilOpen()});await w(1500);
  out.step=await p.evaluate(()=>{try{return hdStep({box:kg82Box(),draw:()=>{},done:()=>{window.__hdDone=1},C:null,G:null,file:""})}catch(e){return String(e)}});await w(1800);
  out.open=await meas();await ov('hd-ring');await shot('hd-ring');const c=await front();await tapXY(c[0],c[1]);await w(1800);out.focus=await meas();await ov('hd-focus');out.acts=await p.evaluate(()=>[...document.querySelectorAll('.kri-pane [data-kria]')].map(b=>b.textContent.trim()));await shot('hd-focus');
  await tapAct('^Không dán');await w(1200);out.done=await p.evaluate(()=>!!window.__hdDone);out.closed=await p.evaluate(()=>!kitRingItem.cur);mark('end')}
 if(SC==='face'){
  await w(400);mark('start');await p.evaluate(()=>{try{render();showModal()}catch(e){}});await w(2500);out.picker=await vis('.kpick[data-pick="face"]');await shot('face-old');
  const pid0=await p.evaluate(()=>S.pid);const c0=await p.evaluate(()=>{const b=[...document.querySelectorAll('.kpick[data-pick="face"] [data-pk]')].filter(b=>!b.hidden)[1];if(!b)return null;b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
  if(c0){await w(400);await tapXY(c0[0],c0[1])}await w(2000);out.open=await meas();await ov('face-focus');await shot('face-focus');
  if(out.open&&out.open.open){await tapAct('^Chọn');await w(1500);out.res=await res();await ov('face-result');out.changed=await p.evaluate(p0=>S.pid!==p0,pid0);await shot('face-res');
  await tap('.kri .kit-x').catch(()=>{});await w(500);await tap('.kri .kit-x').catch(()=>{})}await w(1200);out.closed=await p.evaluate(()=>!kitRingItem.cur);out.cardBack=await vis('.kpick[data-pick="face"]');await shot('face-back');mark('end')}
 if(['toil','title','hd','face'].includes(SC)){out.ov=OV;out.errs=errs;out.ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);console.log(JSON.stringify(out))}
 fs.writeFileSync(`${OUT}/marks-${SC}-${W}x${H}.json`,JSON.stringify({marks,errs}));const v=p.video();await ctx.close();const src=await v.path();fs.renameSync(src,`${OUT}/${SC}-${W}x${H}.webm`);
 console.log(SC,W+'x'+H,JSON.stringify(marks),errs.slice(0,3));await b.close()})();
