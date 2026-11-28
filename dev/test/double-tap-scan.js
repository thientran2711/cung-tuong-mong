/* double-tap-scan.js (KK44, MAIN 160/161 «double tap on xác nhận / buy / give = 2 actions spent», law 11 whole family).
   Every button of every main tab + sub-tab (tú nữ palace life) and every option / buy / give button of the dialog it opens is tapped ONCE and, from the same
   saved state and the same seeded dice, tapped TWICE the way a fast finger does (two real taps at the same point, ~70 ms apart). The spend of each run is read
   from the state: khắc used, bạc, Sức, items held (inv / tư trang counts), log lines. FAIL = the double tap spent MORE than the single tap (a second action ran).
   usage: node dev/test/double-tap-scan.js <index.html> [WxH,...]   env BUSY=ms (the 1st tap's work outlasts the double-tap window) CPU=n (slow device) TABS=a,b  MAXB=n (buttons per tab, default 30)  MAXO=n (options per dialog, default 8)
   exit 1 on any FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000').split(',');
const TABS=process.env.TABS?process.env.TABS.split(','):['act','go','court','rel','kid','inv','art','story'];const MAXB=+process.env.MAXB||30,MAXO=+process.env.MAXO||8;
(async()=>{const b=await chromium.launch();let fails=0,tot=0;const FL=[];
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.__seed=7;Math.random=()=>{window.__seed=(window.__seed*16807)%2147483647;return (window.__seed-1)/2147483646}});
  const p=await ctx.newPage();if(+process.env.CPU>1){const cdp=await ctx.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:+process.env.CPU})}/* env CPU=N: a slow phone (the 1st tap's work can outlast BAL.kdlg.tapArm) */const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;try{kmReset()}catch(e){}document.getElementById('modal').hidden=true;['kload','kboot','klife'].forEach(i=>{const k=document.getElementById(i);if(k)k.remove()});S.bac=40;S.suc=Math.max(S.suc||0,60);window.__dtSnap=JSON.stringify(ser());window.__dtUsed=used;
   window.__dtDig=()=>{const n=x=>Array.isArray(x)?x.length:(x&&typeof x==='object'?Object.keys(x).length:0);const items=['inv','items','tt','tutrang','cloth','gifts','pets'].reduce((a,k)=>a+n(S[k]),0);return {khac:used,bac:S.bac,suc:S.suc,items,logs:(S.logs||[]).length,turn:S.turn,buoi:S.buoi}};
   window.__dtVis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&!e.disabled&&getComputedStyle(e).visibility!=='hidden'}});
  await p.waitForTimeout(1000);
  const reset=async(tab,sub)=>p.evaluate(async([tab,sub])=>{const sl=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const M=document.getElementById('modal');M.hidden=true;/* a result card (#rtoast) and its tap catcher (KIT 32.10) left by the last run would eat the next first tap */['rtoast','kxcatch','kpinfo'].forEach(i=>{const k=document.getElementById(i);if(k)k.remove()});try{deser(JSON.parse(window.__dtSnap))}catch(e){}used=window.__dtUsed;try{render()}catch(e){}const tb=document.querySelector(`[data-tab="${tab}"]`);if(tb)tb.click();await sl(300);
   if(sub){const s=document.querySelector(sub);if(s)s.click();await sl(350)}window.__seed=7;return window.__dtDig()},[tab,sub]);
  const panelBtns=()=>p.evaluate(()=>[...document.querySelectorAll('#panel button')].filter(window.__dtVis).filter(e=>!e.closest('#modal,#title,.kpop,#kpop')&&!e.matches('[role=tab],.ksubb,.ktab,[data-tab]')).map((e,i)=>({i,t:(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)})));
  const at=(sel,i,txt)=>p.evaluate(([sel,i,txt])=>{const B=[...document.querySelectorAll(sel)].filter(window.__dtVis).filter(e=>sel!=='#panel button'||(!e.closest('#modal,#title,.kpop,#kpop')&&!e.matches('[role=tab],.ksubb,.ktab,[data-tab]')));const e=B[i];if(!e||(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)!==txt)return null;e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]},[sel,i,txt]);
  const BUSY=+process.env.BUSY||0;/* env BUSY=ms: the 1st tap's own work takes this long (a busy phone): the 2nd tap is queued behind it (RV-163C F1) */
  const cdp=await ctx.newCDPSession(p);/* every double tap = a real finger: two taps 70 ms apart by their event timestamps, sent without waiting for the page (a loaded box used to stretch the gap past BAL.kdlg.tapArm = not a double tap any more) */
  /* BUSY: the finger taps twice 70 ms apart (event timestamps of a real finger), sent without waiting for the page; the 1st tap's own work takes BUSY ms, so the 2nd tap waits in the queue behind it */
  const fingerTwice=async(x,y)=>{const t0=Date.now()/1000,ev=(type,t)=>cdp.send('Input.dispatchMouseEvent',{type,x,y,button:'left',clickCount:1,timestamp:t});
   await Promise.all([ev('mousePressed',t0),ev('mouseReleased',t0+0.01),new Promise(r=>setTimeout(r,70)).then(()=>Promise.all([ev('mousePressed',t0+0.07),ev('mouseReleased',t0+0.08)]))])};
  const tap=async(xy,two)=>{if(two){if(BUSY)await p.evaluate(ms=>{const f=()=>{document.removeEventListener('click',f);const t=performance.now();while(performance.now()-t<ms);};document.addEventListener('click',f)},BUSY);await fingerTwice(xy[0],xy[1])}
   else await p.mouse.click(xy[0],xy[1]);await p.waitForTimeout(900)};
  const OPT='#modal .opt:not(:disabled), #modal button.kopt:not(:disabled), #modal [data-kshbuy], #modal [data-kgive], #modal button.main:not(#mclose)';
  const optList=()=>p.evaluate(OPT=>[...document.querySelectorAll(OPT)].filter(window.__dtVis).map((e,i)=>({i,t:(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)})),OPT);
  const dig=()=>p.evaluate(()=>window.__dtDig());
  const cmp=(name,b0,s,d)=>{tot++;const more=[];for(const k of ['khac','items','logs'])if((d[k]-b0[k])>(s[k]-b0[k]))more.push(`${k} ${s[k]-b0[k]}→${d[k]-b0[k]}`);for(const k of ['bac','suc'])if((b0[k]-d[k])>(b0[k]-s[k]))more.push(`${k} −${b0[k]-s[k]}→−${b0[k]-d[k]}`);
   /* items alone (no extra khắc / Bạc / Sức and no extra log line = no second action ran) is the dice of one act landing differently: a note */const bad=more.some(x=>/^(khac|bac|suc)/.test(x))||(more.some(x=>/^items/.test(x))&&more.some(x=>/^logs/.test(x)));if(bad){fails++;FL.push(wh+' '+name+' '+more.join(', '))}console.log(wh.padEnd(9),name.slice(0,90).padEnd(90),bad?'FAIL double tap spent more: '+more.join(', '):(more.length?'note '+more.join(', '):'ok'))};
  const subs=async()=>p.evaluate(()=>[...document.querySelectorAll('#panel [role=tab]')].filter(e=>e.getClientRects().length&&!e.closest('#modal')).map(e=>{const k=Object.keys(e.dataset)[0];return `[data-${k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${e.dataset[k]}"]`}));
  for(const tab of TABS){await reset(tab,null);const SUBS=[null,...(await subs())];
   for(const sub of SUBS){await reset(tab,sub);const L=(await panelBtns()).slice(0,MAXB);
    for(const it of L){const where=tab+(sub?' '+sub.replace(/^\[data-|\]$/g,''):'')+' · '+it.t.slice(0,26);
     /* level 1: the panel button itself */
     let b0=await reset(tab,sub);let xy=await at('#panel button',it.i,it.t);if(!xy)continue;await tap(xy,false);const s1=await dig();const dlg=await p.evaluate(()=>!document.getElementById('modal').hidden);const opts=dlg?(await optList()).slice(0,MAXO):[];
     b0=await reset(tab,sub);xy=await at('#panel button',it.i,it.t);if(!xy)continue;await tap(xy,true);const d1=await dig();cmp(where,b0,s1,d1);
     /* level 2: each option / buy / give button of the dialog it opened */
     for(const o of opts){b0=await reset(tab,sub);xy=await at('#panel button',it.i,it.t);if(!xy)break;await tap(xy,false);const oxy=await at(OPT,o.i,o.t);if(!oxy)continue;const bo=await dig();await tap(oxy,false);const s2=await dig();
      await reset(tab,sub);xy=await at('#panel button',it.i,it.t);if(!xy)break;await tap(xy,false);const oxy2=await at(OPT,o.i,o.t);if(!oxy2)continue;const bo2=await dig();await tap(oxy2,true);const d2=await dig();
      if(JSON.stringify(bo)!==JSON.stringify(bo2)){console.log(wh.padEnd(9),(where+' › '+o.t.slice(0,26)).slice(0,90).padEnd(90),'skip (opening the dialog is not repeatable)');continue}cmp(where+' › '+o.t.slice(0,26),bo,s2,d2)}}}}
  console.log(wh,'page errors',errs.length,errs.slice(0,2).join(' | '));await ctx.close()}
 console.log('taps compared',tot,'FAIL',fails);FL.forEach(x=>console.log('  FAIL',x));await b.close();process.exit(fails?1:0)})();
