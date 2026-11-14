/* j91: every contest kind has its own mini-game. Playwright plays each one at one viewport:
   1) one REAL touch action through CDP (tap, drag or hold, taken from the oracle KG82.peek) must reach the game as trusted touch pointer events;
   2) an in-page auto-player finishes the game (synthetic touch pointer events / clicks from the oracle);
   3) checks: result shown, onDone called, no page error, no horizontal overflow, no ellipsis, no "có thể".
   usage: node dev/test/minigames91.js <baseURL> <W>x<H>@<dpr> <outdir> [kinds,comma] [shots: all|play]  */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,KL,SH]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const ALL='dan,hat,co,dauho,ban,tho,doi,doden,ve,hoa,theu,kim,mua,banh,huong';const KINDS=(KL&&KL!=='all'?KL:ALL).split(',');const SHOTS=SH||'all';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();const cdp=await ctx.newCDPSession(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);Object.assign(S.arts,{cam:3,ky:2,thi:4,hoa:1,vu:3,y:2});S.tai=62;render()});
 const shot=async(name)=>{await p.locator('#kg82').screenshot({path:`${OUT}/${name}.jpg`,type:'jpeg',quality:82,timeout:120000})};
 const touch=async(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y,id:1}]});
 const res=[];
 for(const kind of KINDS){await p.evaluate(kind=>{window.__res=null;const R=liveRivals(true).slice(0,4);startContest({art:kind,title:'Hội Thượng nguyên',rivals:R,prep:6,stakes:{win:{sung:8,danh:3},top3:{danh:1},last:{danh:-1},paid:{suc:-6}},onDone:r=>window.__res=r})},kind);
  await p.waitForTimeout(400);if(SHOTS==='all')await shot(`${kind}-${SZ}-1intro`);
  await p.locator('#kg82go').tap();
  await p.evaluate(()=>{window.__rt={down:0,move:0,up:0};const bx=document.getElementById('kg82box');['pointerdown','pointermove','pointerup'].forEach(t=>bx.addEventListener(t,e=>{if(e.pointerType==='touch'&&e.isTrusted)window.__rt[t.slice(7)]++},true))});
  /* 1) one real touch action */
  let real=null;const t0=Date.now();
  while(Date.now()-t0<15000){const pk=await p.evaluate(()=>{const k=KG82.peek();return k?JSON.parse(JSON.stringify(k)):null});
   if(pk){if(pk.drag){const D=pk.drag;await touch('touchStart',D[0][0],D[0][1]);for(let i=1;i<D.length;i++){const [x0,y0]=D[i-1],[x1,y1]=D[i];const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)/14));for(let s=1;s<=n;s++)await touch('touchMove',x0+(x1-x0)*s/n,y0+(y1-y0)*s/n)}await touch('touchEnd');real='drag'}
    else if('hold' in pk){let x=pk.x,y=pk.y;if(pk.hsel){const r=await p.locator(pk.hsel).boundingBox();x=r.x+r.width/2;y=r.y+r.height/2}await touch('touchStart',x,y);await p.waitForTimeout(400);await touch('touchEnd');real='hold'}
    else if(pk.sel){await p.locator(pk.sel).tap();real='button'}
    else{await touch('touchStart',pk.x,pk.y);await touch('touchEnd');real='tap'}break}
   await p.waitForTimeout(60)}
  const rt=await p.evaluate(()=>window.__rt);
  /* 2) in-page auto-player */
  await p.evaluate(()=>{let nx=0,hold=null,busy=false;const pe=(el,t,x,y,id)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(KG82.phase!=='play'){if(hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}return}const pk=KG82.peek();const now=performance.now();
    if(pk){if('hold' in pk){const el=pk.hsel?document.querySelector(pk.hsel):document.elementFromPoint(pk.x,pk.y);let x=pk.x,y=pk.y;if(pk.hsel&&el){const r=el.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2}
       if(pk.hold&&!hold&&el){pe(el,'pointerdown',x,y,7);hold={el,x,y}}else if(!pk.hold&&hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}}
     if(pk.drag&&!busy&&now>nx){busy=true;const D=pk.drag;const el=document.elementFromPoint(D[0][0],D[0][1]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let s=1;s<=n;s++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n])}
       pe(el,'pointerdown',D[0][0],D[0][1],3);let k=0;const mv=()=>{if(k<pts.length){pe(el,'pointermove',pts[k][0],pts[k][1],3);k++;setTimeout(mv,10)}else{const l=pts[pts.length-1]||D[0];pe(el,'pointerup',l[0],l[1],3);busy=false;nx=performance.now()+260}};mv()}
     else if(pk.sel&&now>nx&&!busy){const el=document.querySelector(pk.sel);if(el)el.click();nx=now+300}
     else if(pk.x!=null&&!('hold' in pk)&&!pk.drag&&now>nx&&!busy){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y,5);pe(el,'pointerup',pk.x,pk.y,5)}nx=now+120}}
    setTimeout(tick,8)};tick()});
  let shotDone=false;const t1=Date.now();
  while(Date.now()-t1<150000){const ph=await p.evaluate(()=>KG82.phase);if(ph!=='play')break;if(!shotDone&&Date.now()-t1>2600){await shot(`${kind}-${SZ}-2play`);shotDone=true}await p.waitForTimeout(400)}
  await p.waitForTimeout(500);
  /* j90 (main): the honour podium shows first; go on to the score table */
  for(let i=0;i<10&&await p.locator('.kpod-next').count();i++){await p.waitForTimeout(300);try{await p.locator('.kpod-next').tap({timeout:3000})}catch(e){}await p.waitForTimeout(300)}
  const info=await p.evaluate(()=>{const d=document.getElementById('kg82');const trunc=[...d.querySelectorAll('*')].filter(e=>e.children.length===0&&/…/.test(e.textContent)).length;
   const cut=[...d.querySelectorAll('button,.kgc b,.kgc small')].filter(e=>e.scrollWidth>e.clientWidth+1).length;
   return{last:KG82.last,overflowX:document.documentElement.scrollWidth>innerWidth,inner:d.scrollWidth>d.clientWidth+1,trunc,cut,coThe:(d.innerText||'').includes('có thể')}});
  if(SHOTS==='all')await shot(`${kind}-${SZ}-3result`);
  await p.locator('#kg82ok').tap();await p.waitForTimeout(200);const got=await p.evaluate(()=>window.__res);
  res.push({kind,eng:await p.evaluate(k=>KG82_KIND[k].e,kind),real,trusted:rt,raw:info.last&&info.last.raw,score:got&&got.score,place:got&&got.place,of:got&&got.of,done:!!got,ox:info.overflowX,inner:info.inner,trunc:info.trunc,cut:info.cut,coThe:info.coThe})}
 console.log(JSON.stringify({size:SZ,res,errors:errs}));await b.close()})();
