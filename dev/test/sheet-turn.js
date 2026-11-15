/* Live game: tab switch = WHOLE-SHEET page turn (kitSheetTurn via kitCurlSwap; owner 11/15 10:00Z).
   usage: node dev/test/sheet-turn.js <baseURL> <W>x<H>@dpr <outdir> <tag> [noshots]
   Holds the turn with kitCurlSwap.hold(p) (the game's own rAF keeps running, so the page underneath lays out normally) and writes
   <tag>-fwd-{20,45,70}.jpg (Hậu cung → Cung nhân), <tag>-back-{30,60}.jpg (Cung nhân → Hành sự), <tag>-week-45.jpg (week book).
   Checks: one #panel, no horizontal overflow, page errors, fast taps (no stuck sheet), swipe left/right on the page, buttons,
   "Cảnh động" off = no sheet. Prints one JSON line. */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,NOSHOT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console:'+m.text().slice(0,160))});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1500);
 const shot=n=>NOSHOT?0:p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80});
 const click=t=>p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab=${t}]`);if(b)b.click();return !!b},t);
 const audit=n=>p.evaluate(n=>({n,ox:document.documentElement.scrollWidth>innerWidth,panels:document.querySelectorAll('#panel').length,sheets:document.querySelectorAll('.ksht').length,ids:(()=>{const c={};let d=0;document.querySelectorAll('[id]').forEach(e=>{if(c[e.id])d++;c[e.id]=1});return d})()}),n);
 const A=[];
 const hold=async(t,ps,name)=>{const ok=await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab=${t}]`);b.click();return !!document.querySelector('.kcl-host .ksht')},t);
  for(const f of ps){await p.evaluate(f=>kitCurlSwap.hold(f),f);await p.waitForTimeout(500);await shot(`${name}-${Math.round(f*100)}`);A.push(await audit(name+f))}
  await p.evaluate(()=>kitCurlSwap.end&&kitCurlSwap.end());await p.waitForTimeout(400);return ok};
 await click('rv');await p.waitForTimeout(1500);
 const fwd=await hold('staff',[.2,.45,.7],'fwd');
 await p.waitForTimeout(800);
 const back=await hold('act',[.6,.3],'back');
 A.push(await audit('after'));
 /* fast taps: 12 tab switches 50 ms apart */
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab).filter(t=>t!=='go'));
 for(let i=0;i<12;i++){await click(tabs[i%tabs.length]);await p.waitForTimeout(50)}
 await p.waitForTimeout(2000);const fast=await audit('fast');A.push(fast);
 /* swipe on the page (touch events) */
 await click('rv');await p.waitForTimeout(1200);
 const swipe=async dx=>{await p.evaluate(dx=>{const pn=document.getElementById('panel');const r=pn.getBoundingClientRect();const x0=r.left+r.width*(dx<0?.75:.25),y=r.top+r.height*.75;
   let t=document.elementFromPoint(x0,y)||pn;const mk=(x)=>new Touch({identifier:1,target:t,clientX:x,clientY:y});
   t.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[mk(x0)],changedTouches:[mk(x0)]}));
   t.dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[mk(x0+dx)]}))},dx);await p.waitForTimeout(1900);return p.evaluate(()=>tab)};
 const sw1=await swipe(-160),sw2=await swipe(160);
 /* button: tab bar click */
 await click("inv");await p.waitForTimeout(1900);const btn=await p.evaluate(()=>tab);
 /* "Cảnh động" off: no sheet */
 await p.evaluate(()=>{OPT.fxon=false});await click('rv');const rm=await p.evaluate(()=>document.querySelectorAll('.ksht').length);await p.evaluate(()=>{OPT.fxon=true});await p.waitForTimeout(500);


 A.push(await audit('end'));
 console.log(JSON.stringify({TAG,fwd,back,sw:[sw1,sw2],btn,rm,A,errs:errs.slice(0,8)}));await b.close()})();
