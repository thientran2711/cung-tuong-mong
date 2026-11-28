/* MOTION-BUILD «Vòng bảo vật»: law 11 family scan (old item pickers left on screen = 0). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,OUT,WH,MODE]=process.argv;const SC='check';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const [W,H]=(WH||'755x1000').split('x').map(Number);const rec=SC!=='check';
 const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'},rec?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{}));
 await ctx.addInitScript(([sc,off])=>{window.__SC=sc;if(off)window.__kriOff=1},[SC,MODE==='before']);await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 let p=await ctx.newPage();const T0=Date.now();p.setDefaultTimeout(240000);const errs=[];p.on('console',m=>{if(m.type()==='error'&&/kri|TypeError|Reference/.test(m.text()))errs.push('C:'+m.text().slice(0,300))});p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
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
 /* LAW 11 — «Vòng bảo vật» family scan: every old item picker place, opened through its real trigger; per place: did the ring open, is an old picker still on screen?
    usage: node dev/test/kit-ring-oldleft.js <url> <outdir> [WxH] [before]   (before = the ring switched off: the old pickers count) */
 const vis=s=>p.evaluate(s=>[...document.querySelectorAll(s)].some(e=>{const r=e.getBoundingClientRect();if(!(r.width>0&&r.height>0))return false;if(e.closest('.kri'))return false;
   for(let a=e;a;a=a.parentElement){if(a.hidden)return false;const cs=getComputedStyle(a);if(cs.visibility==='hidden'||cs.display==='none')return false}return r.bottom>0&&r.top<innerHeight}),s);
 const ring=()=>p.evaluate(()=>!!kitRingItem.cur&&!!document.querySelector('.kri .kri-t'));
 const reset=async()=>{await p.evaluate(()=>{try{kitRingItem.close(true)}catch(e){}Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}const m=document.getElementById('modal');m.hidden=true;m.classList.remove('kri-hide');
   const k=document.getElementById('kg82');if(k){k.hidden=true;k.classList.remove('kri-hide')}document.querySelectorAll('#kriInj,#kdaytc,#klife,#kmrew,.kroul,#kroulw').forEach(e=>e.remove());/* a result toast left by the previous place keeps its tap catcher (KIT 32.10): the first tap only closes it — closed here */const t=document.getElementById('rtoast');if(t)t.classList.remove('on');document.querySelectorAll('#kxcatch').forEach(e=>{e.hidden=true;e.__close=null});render()});await w(700)};
 const inj=html=>p.evaluate(h=>{const d=document.createElement('div');d.id='kriInj';d.className='kpanel';d.style.cssText='position:fixed;left:10px;top:200px;width:60vw;z-index:5';d.innerHTML=h;document.body.appendChild(d)},html);
 const tapIn=async s=>{const c=await at(s);if(!c)return false;await tapXY(c[0],c[1]);return true};
 const OLD={pick:'#modal .kipw, #modal .kshop, #modal .opts .opt',strip:'',toil:'#kg82 .kinvg [data-kinvi]',dh:'#modal .opt[data-m]',hd:'#kg82 [data-hdk]',face:'.kpick[data-pick="face"]'};
 await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.queen)||liveRivals(true)[0];window.__qv=v.id;S.met=S.met||{};S.met[v.id]=1;
  for(const k of Object.keys(IT).filter(k=>/^mc\d\d$/.test(k)).slice(0,3))S.inv.push({k,from:"me"});
  for(const k of Object.keys(WD_ITEMS).filter(k=>WD_ITEMS[k].sl==="hd").slice(0,3))S.inv.push({k,from:"me"});
  try{petAdd(S,Object.keys(PET)[0],"me")}catch(e){}const K=DHKEYS();S.dh=S.dh||{};K.slice(0,4).forEach(k=>{S.dh[k]=S.dh[k]||{};S.dh[k].i=0});try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
 const dhBtn=()=>p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(b=>/^Đeo «/.test((Q[0].opts[+b.dataset.m]||{}).n||''));if(!b)return null;b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]});
 const bag=async()=>{await p.evaluate(()=>{try{tab='inv'}catch(e){}render()});await w(1500)};
 const P=[
  ['1 gift (giftpick, person → item)',async()=>{await p.evaluate(()=>{pushDil(mkP("giftpick",{v:window.__qv}),"Tặng quà");showModal();render()})},'pick'],
  ['1 plantpick',async()=>{await p.evaluate(()=>{pushDil(mkP("plantpick",{v:window.__qv}),"Cài đồ");showModal();render()})},'pick'],
  ['2 Tư trang bag tile',async()=>{await bag();await tapIn('.kinv[data-kinv="tutrang"] .kinvg [data-kinvi]')},'strip'],
  ['3 kinl strip (2nd tile)',async()=>{await bag();await tapIn('.kinv[data-kinv="tutrang"] .kinvg [data-kinvi="1"]')},'strip'],
  ['5 shop buy',async()=>{await p.evaluate(()=>{kitShopNvp();render()})},'pick'],
  ['6 shop sell',async()=>{await p.evaluate(()=>{kitShopNvp();render()});await w(900);await tapIn('.kri-tabs [data-kritab="sell"]')},'pick'],
  ['8/9/12 works · wardrobe · Trưng bày (bag tile, wardrobe piece)',async()=>{await bag();const i=await p.evaluate(()=>{const o=KINV.reg.tutrang;return o?o.items.findIndex(x=>x.g&&WD_ITEMS[x.g.k]):-1});await tapIn(`.kinv[data-kinv="tutrang"] .kinvg [data-kinvi="${Math.max(0,i)}"]`)},'strip'],
  ['10 veil chest',async()=>{await inj(await p.evaluate(()=>vlInvHTML()));await w(300);await tapIn('#kriInj [data-vlpick]')},'inj'],
  ['15 pets',async()=>{await inj(await p.evaluate(()=>petPanelHTML()));await w(300);await tapIn('#kriInj .kpetcards > * img')||await tapIn('#kriInj .kpetcards > *')},'inj'],
  ['11 titles',async()=>{await p.evaluate(()=>{dhPanel()});await w(1200);if(await dhBtn()){await w(400);const c=await dhBtn();await tapXY(c[0],c[1])}},'dh'],
  ['4 toilette dress',async()=>{await p.evaluate(()=>{toilOpen()});await w(1200);if(!await vis('#kg82 [data-kinvkey="toil"][data-kinvi]'))await p.evaluate(()=>{try{toilDressUI()}catch(e){}});await w(1000);await tapIn('#kg82 [data-kinvkey="toil"][data-kinvi]')},'toil'],
  ['13 hoa điền',async()=>{await p.evaluate(()=>{toilOpen()});await w(1200);await p.evaluate(()=>{hdStep({box:kg82Box(),draw:()=>{},done:()=>{},C:null,G:null,file:""})})},'hd'],
 ];
 const rows=[];
 for(const [name,open,ok] of P){await reset();let err='';try{await open()}catch(e){err=String(e).slice(0,120)}await w(1500);const r=await ring();const o=OLD[ok]?await vis(OLD[ok]):false;rows.push({place:name,ring:r,oldVisible:o,left:(!r||o)?1:0,err});
  await p.screenshot({path:`${OUT}/oldleft-${MODE||'after'}-${W}x${H}-${rows.length}.jpg`,type:'jpeg',quality:45})}
 /* face: the new-game card of a fresh life — the face scene of kit-ring-item.js (its own page, real taps) */
 {let d=null;try{const o=require('child_process').execFileSync('node',[__dirname+'/kit-ring-item.js',BASE,OUT,'face',W+'x'+H],{env:Object.assign({},process.env,MODE==='before'?{KRI_OFF:'1'}:{}),encoding:'utf8',timeout:400000});d=JSON.parse(o.split('\n').find(l=>l.startsWith('{')))}catch(e){}
  const r=!!(d&&d.open&&d.open.open);rows.push({place:'14 face (new-game card)',ring:r,oldVisible:!!(d&&d.picker&&!r),left:r?0:1,err:d?'':'face scene failed'})}
 const left=rows.reduce((a,x)=>a+x.left,0);
 console.log(JSON.stringify({sz:W+'x'+H,mode:MODE||'after',places:rows.length,oldLeft:left,rows,errs}));
 console.log(`old left = ${left}`);await b.close()})();
