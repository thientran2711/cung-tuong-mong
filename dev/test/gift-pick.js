/* review/gift-pick: item pickers as a picture grid (KIT 28.13i) + the painted gift moment (§68 kitFxGift).
   usage: node dev/test/gift-pick.js <url> <outdir> [WxH@dpr,…] [shots]
   For each size: opens every item picker of the family (giftpick to a person, giftto Hoàng thượng / Thái hậu, plantpick),
   measures (grid present, tiles = items, row alignment, no overflow, no clipped text), taps a tile (selected + detail + confirm),
   confirms a gift (kitFxGift log), checks Gọn (no fx) and tap-to-skip. Prints one JSON line per size. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,OUT,SIZES,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const L=(SIZES||'755x1000@2,1000x755@1,1180x820@1,1366x1024@1,844x390@2,390x844@2').split(',');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
for(const SZ of L){const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const bad=[];p.on('response',r=>{if(r.status()>=400&&!/assets\.json/.test(r.url()))bad.push(r.status()+' '+r.url().slice(-60))});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 const R={sz:SZ};
 R.rot=await p.evaluate(()=>{const e=document.querySelector('#rotate,.rotate,#rot');return e?getComputedStyle(e).display!=='none'&&e.offsetParent!==null:false});
 await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});
 await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(typeof S!=='undefined'&&S&&!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.rank=Math.max(S.rank,2);S.bac=500;S.used=0;
  for(const k of ["tramngoc","vongngoc","sonphan","boodieu","tramphuong","vongvang"])if(IT[k])S.inv.push({k,from:"me"});
  for(const k of Object.keys(IT).filter(k=>IT[k].kd==="Vải vóc"||IT[k].kd==="Hương liệu"||IT[k].kd==="Lễ vật").slice(0,6))S.inv.push({k,from:"me"});
  try{KMS=S;KMSNAP=kmSnap()}catch(e){}render()});
 await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;try{KMSNAP=kmSnap()}catch(e){}render()});
 const settle=()=>p.waitForFunction(()=>[...document.querySelectorAll('#modal img')].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:12000}).catch(()=>{});
 const shot=async n=>{if(!SHOTS)return;await settle();await p.screenshot({path:`${OUT}/${W}x${H}-${n}.jpg`,type:'jpeg',quality:70})};
 const meas=()=>p.evaluate(()=>{const M=document.getElementById('modal');const vw=innerWidth,vh=innerHeight;
  const dlg=M&&M.querySelector('.dlg');const r=dlg?dlg.getBoundingClientRect():null;
  const g=M&&M.querySelector('.kipg');const tiles=g?[...g.querySelectorAll('.kipc')]:[];
  const tops={};tiles.forEach(t=>{const y=Math.round(t.getBoundingClientRect().top);(tops[y]=tops[y]||[]).push(t)});
  let spread=0;for(const y in tops){const ns=tops[y].map(t=>t.querySelector('.kshn').getBoundingClientRect().top);spread=Math.max(spread,Math.max(...ns)-Math.min(...ns))}
  const cut=[...M.querySelectorAll('*')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)&&!e.closest('.kshn,.kshe')).slice(0,4).map(e=>e.className+':'+e.textContent.slice(0,30));
  const optsVisible=M?[...M.querySelectorAll('.opts>.opt')].filter(o=>o.offsetParent).length:0;const gr=g?g.getBoundingClientRect():null;const gridVis=gr?gr.height>40&&gr.top<vh&&gr.bottom>0:false;
  return{grid:!!g,gridVis,gridH:gr?Math.round(gr.height):0,tiles:tiles.length,rows:Object.keys(tops).length,perRow:Math.max(0,...Object.values(tops).map(a=>a.length)),spread,optsVisible,
   inView:r?r.left>=-1&&r.right<=vw+1&&r.top>=-1&&r.bottom<=vh+1:false,ovf:document.documentElement.scrollWidth>vw+1,cut,
   pics:tiles.filter(t=>{const i=t.querySelector('img');return i&&i.complete&&i.naturalWidth>0}).length}});
 const close=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 const queen=await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.queen)||liveRivals(true)[0];return v.id});
 /* 1. giftpick to a person (Hậu cung act "Tặng quà") */
 await p.evaluate(id=>{pushDil(mkP("giftpick",{v:id}),"Tặng quà");showModal();render()},queen);await p.waitForTimeout(900);
 R.giftpick=await meas();await shot('1-giftpick');
 /* tap the 2nd tile: selected, detail with kit rows + confirm */
 await p.evaluate(()=>{const t=document.querySelectorAll('#modal .kipc')[1];t&&t.querySelector('.kshpic').click()});await p.waitForTimeout(500);
 R.sel=await p.evaluate(()=>{const M=document.getElementById('modal');const s=M.querySelectorAll('.kipc[aria-checked="true"]');const d=M.querySelector('.kipd');const go=M.querySelector('.kipgo');
  const dr=d&&d.getBoundingClientRect(),gr=go&&go.getBoundingClientRect();
  return{selected:s.length,detail:!!(d&&d.offsetParent),rows:d?d.querySelectorAll('.kipd .opt small, .kipd .kitrow, .kipd .ka-row, .kipd [class*=row]').length:0,goTxt:go?go.innerText:"",goInView:gr?gr.bottom<=innerHeight+1&&gr.top>=0:false,
   detailTxt:d?d.innerText.replace(/\s+/g,' ').slice(0,160):""}});
 await shot('2-selected');
 /* confirm → gift given, kitFxGift plays (log), tap to skip */
 await p.evaluate(()=>{window.__fxlog=[];const o=window.kitFxGift;if(o)window.kitFxGift=function(){__fxlog.push([...arguments].slice(0,1).join());return o.apply(this,arguments)}});
 R.before=await p.evaluate(()=>S.inv.length);
 await p.evaluate(()=>{const g=document.querySelector('#modal .kipgo');g&&g.click()});if(process.env.SEQ){for(const t of [350,500,500,600,600,700,800]){await p.waitForTimeout(t);await p.screenshot({path:`${OUT}/${W}x${H}-seq-${Date.now()%100000}.jpg`,type:'jpeg',quality:60})}}else{await p.waitForTimeout(700);await shot('3-givefx')}
 R.after=await p.evaluate(()=>({inv:S.inv.length,fx:window.__fxlog||[],kfk:typeof KFK!=="undefined"?(KFK.log||[]).slice(-4):null,live:document.querySelectorAll('.kfxk').length,carry:document.querySelectorAll('.kgpc').length}));
 await p.mouse.click(Math.round(W/2),Math.round(H/2));await p.waitForTimeout(300);R.skipCatch=await p.evaluate(()=>document.querySelectorAll('.kfxk-catch').length);await p.waitForTimeout(1200);
 R.skip=await p.evaluate(()=>({live:document.querySelectorAll('.kfxk,.kfxk-catch,.kgpc').length}));
 await p.waitForTimeout(2500);await close();
 /* 2. giftto Hoàng thượng */
 await p.evaluate(()=>{pushDil(mkP("giftto",{t:"emp"}),"Dâng quà lên Hoàng thượng");showModal();render()});await p.waitForTimeout(900);
 R.giftto=await meas();await shot('4-giftto');await close();
 /* 3. plantpick */
 await p.evaluate(id=>{pushDil(mkP("plantpick",{v:id}),"Cài đồ vào rương");showModal();render()},queen);await p.waitForTimeout(900);
 R.plant=await meas();await shot('5-plantpick');await close();
 /* 4. Gọn: no painted fx */
 await p.evaluate(id=>{OPT.fxon=false;OPT.fxpick=1;window.__fxg=0;pushDil(mkP("giftpick",{v:id}),"Tặng quà");showModal();render()},queen);await p.waitForTimeout(600);
 await p.evaluate(()=>{const t=document.querySelector('#modal .kipc .kshpic');t&&t.click();const g=document.querySelector('#modal .kipgo');g&&g.click()});await p.waitForTimeout(500);
 R.gon=await p.evaluate(()=>({live:document.querySelectorAll('.kfxk,.kgpc').length}));
 await p.evaluate(()=>{OPT.fxon=true});await close();
 R.errs=errs;R.bad=bad.slice(0,5);console.log(JSON.stringify(R));await ctx.close()}
await b.close()})().catch(e=>{console.error(e);process.exit(2)});
