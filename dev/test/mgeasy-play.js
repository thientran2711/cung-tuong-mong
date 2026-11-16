/* mg-easy: plays each knowledge game at a forced tier with an in-page oracle auto-player; checks no page error, result reached, no overflow. usage: LV=0 node dev/test/mgeasy-play.js <url> <W>x<H>@<dpr> <outdir> [kinds] [demo] */
const {chromium}=require('playwright');const [,,BASE,SZ,OUT,KL,DEMO]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const LV=process.env.LV;
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await b.newContext({ignoreHTTPSErrors:true,viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;if(typeof kitRoulette==='function')kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}};document.getElementById('title').hidden=true;try{start()}catch(e){}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.arts,null,{timeout:60000});
 await p.evaluate(([lv,demo])=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());if(typeof kitRoulette==='function')kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}};
  if(lv!=='')kg82LvFor=()=>+lv;if(!demo)KG82.noDemo=1;S.tai=62;render()},[LV||'',DEMO||'']);
 const res=[];
 for(const kind of (KL||'tho,doi,doden,co,le,tc,xa,thq').split(',')){
  await p.evaluate(kind=>{KG82.phase='';KG82.last=null;window.__res=null;document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;
   if(window.EXK&&EXK[kind]){KG82.ctx='thi';KG82.lv=kg82LvFor?kg82LvFor():0;kg82Open({art:'x',title:'t',how:'h'});kg82Play(kind,raw=>{window.__res={raw}})}
   else startContest({art:kind,title:'Hội',rivals:liveRivals(true).slice(0,3),prep:5,onDone:r=>window.__res=r||{none:1}})},kind);
  await p.waitForTimeout(500);
  await p.evaluate(()=>{const g=document.getElementById('kg82go');if(g)g.click()});
  if(!process.env.NOAUTO)await p.evaluate(()=>{let nx=0,busy=false;const pe=(el,t,x,y,id)=>el&&el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(KG82.phase==='play'){const pk=KG82.peek();const now=performance.now();if(pk&&now>nx&&!busy){
     if(pk.drag){busy=true;const D=pk.drag;const el=document.elementFromPoint(D[0][0],D[0][1]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let s=1;s<=n;s++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n])}
      pe(el,'pointerdown',D[0][0],D[0][1],3);let k=0;const mv=()=>{if(k<pts.length){pe(el,'pointermove',pts[k][0],pts[k][1],3);k++;setTimeout(mv,10)}else{const l=pts[pts.length-1]||D[0];pe(el,'pointerup',l[0],l[1],3);busy=false;nx=performance.now()+250}};mv()}
     else if(pk.sel){const el=document.querySelector(pk.sel);if(el)el.click();nx=now+300}
     else if(pk.x!=null){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y,5);pe(el,'pointerup',pk.x,pk.y,5)}nx=now+150}}}setTimeout(tick,8)};tick()});
  try{await p.waitForFunction(()=>KG82.phase==='play',null,{timeout:20000})}catch(e){}
  await p.waitForTimeout(2800);try{await (process.env.FULL?p:p.locator('#kg82')).screenshot({path:`${OUT}/${kind}-L${LV}-${SZ}.jpg`,type:'jpeg',quality:70,timeout:20000})}catch(e){}
  if(process.env.NOAUTO){res.push({kind,shot:1});continue}const t1=Date.now();while(Date.now()-t1<170000){if(await p.evaluate(()=>KG82.phase!=='play'))break;await p.waitForTimeout(500)}
  await p.waitForTimeout(600);
  const info=await p.evaluate(()=>({ph:KG82.phase,ox:document.documentElement.scrollWidth>innerWidth,res:window.__res,last:KG82.last&&KG82.last.raw,exraw:window.__res&&window.__res.raw}));
  res.push({kind,...info,sec:Math.round((Date.now()-t1)/1000)});
  await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click();try{kg82Close()}catch(e){}});await p.waitForTimeout(300)}
 console.log(JSON.stringify({size:SZ,LV,res,errors:errs}));await b.close()})();
