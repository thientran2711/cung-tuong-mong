/* dead-close-scan.js (KK43, law 11 family of robot R2 cnv_chu «Nhờ thái giám tìm thú nuôi»: ✕ / «Lui» tapped 3× and the same dialog stayed).
   Every button on every main tab + sub-tab (tú nữ palace life, Fold / iPad) that opens a dialog is opened the way a fast finger does (two taps before the
   dialog shows), then the dialog's own ✕ / close is REAL-tapped ONCE (mouse at its centre, hit-checked). PASS = the dialog with that title is gone
   (or another dialog took its place); FAIL = the same title is still up (a queued second copy = «the ✕ did nothing»). Also a nested card close
   («Lui» on a shop item card) must close only its card. usage: node dev/test/dead-close-scan.js <index.html> [WxH,...]  exit 1 on any FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');
const TABS=process.env.TABS?process.env.TABS.split(','):['act','go','court','rel','kid','inv','art','story'];
(async()=>{const b=await chromium.launch();let fails=0,tot=0;
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{let s=7;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;try{kmReset()}catch(e){}document.getElementById('modal').hidden=true;['kload','kboot','klife'].forEach(i=>{const k=document.getElementById(i);if(k)k.remove()});S.bac=6;window.__dcSnap=JSON.stringify(ser())});
  await p.waitForTimeout(1200);
  const reset=async(tab,sub)=>p.evaluate(async([tab,sub])=>{const sl=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const M=document.getElementById('modal');M.hidden=true;try{deser(JSON.parse(window.__dcSnap))}catch(e){}try{render()}catch(e){}const tb=document.querySelector(`[data-tab="${tab}"]`);if(tb)tb.click();await sl(300);
   if(sub){const s=document.querySelector(sub);if(s)s.click();await sl(350)}return true},[tab,sub]);
  const list=async()=>p.evaluate(()=>{const M=document.getElementById('modal');const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&!e.disabled&&!e.closest('#modal,#title,.kpop,#kpop')&&getComputedStyle(e).visibility!=='hidden'};
   return [...document.querySelectorAll('#panel button')].filter(vis).filter(e=>!e.matches('[role=tab],.ksubb,.ktab,[data-tab]')).map((e,i)=>({i,t:(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)}))});
  const subs=async()=>p.evaluate(()=>[...document.querySelectorAll('#panel [role=tab]')].filter(e=>e.getClientRects().length&&!e.closest('#modal')).map(e=>{const k=Object.keys(e.dataset)[0];return `[data-${k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${e.dataset[k]}"]`}));
  for(const tab of TABS){await reset(tab,null);const SUBS=[null,...(await subs())];
   for(const sub of SUBS){await reset(tab,sub);const L=await list();
    for(const it of L.slice(0,40)){await reset(tab,sub);
     const t0=await p.evaluate(([i,txt])=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&!e.disabled&&!e.closest('#modal,#title,.kpop,#kpop')&&getComputedStyle(e).visibility!=='hidden'};const B=[...document.querySelectorAll('#panel button')].filter(vis).filter(e=>!e.matches('[role=tab],.ksubb,.ktab,[data-tab]'));const e=B[i];if(!e||(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,40)!==txt)return null;
      /* a fast finger: two taps before the dialog shows */try{e.click();if(e.isConnected&&!e.disabled)e.click()}catch(x){}return 1},[it.i,it.t]);if(!t0)continue;
     await p.waitForTimeout(900);
     const d=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const dl=M.querySelector('.dlg');const tt=dl&&(dl.querySelector('.kpt,.kt,h3,.dlgt,.kph')||{}).textContent||'';const x=[...M.querySelectorAll('.kit-x[data-kitx],.kit-x:not([data-kshdetx]):not([data-kidx])')].find(e=>e.getClientRects().length);if(!x)return {tt,nox:1,q:Q.length};const r=x.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {tt:tt.replace(/\s+/g,' ').trim().slice(0,60),x:r.x+r.width/2,y:r.y+r.height/2,hit:hit===x||x.contains(hit),q:Q.length}});
     if(!d||d.nox)continue;if(!d.hit){console.log(wh.padEnd(9),(tab+(sub?' '+sub:'')).padEnd(34),it.t.padEnd(40),'| skip: the ✕ is covered by another layer (not a dead close; not counted)');continue}tot++;await p.mouse.click(d.x,d.y);await p.waitForTimeout(1300);
     const a=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return '';const dl=M.querySelector('.dlg');return ((dl&&(dl.querySelector('.kpt,.kt,h3,.dlgt,.kph')||{}).textContent)||'').replace(/\s+/g,' ').trim().slice(0,60)});
     const bad=a&&a===d.tt;if(bad)fails++;console.log(wh.padEnd(9),(tab+(sub?' '+sub:'')).padEnd(34),it.t.padEnd(40),'| Q',d.q,'|',d.tt.slice(0,40),'→',a?a.slice(0,30):'(closed)',bad?'FAIL same dialog after ✕ (✕ hit-test '+d.hit+')':'ok')}}}
  /* a card / confirm over a shop: its own ✕ («Lui») closes ONLY that card, the shop stays open (RV-KK41) */
  {await reset('inv','[data-kinvsub="thu"]');await p.evaluate(()=>{const e=document.querySelector('[data-petshop]');if(e)e.click()});await p.waitForTimeout(900);
   const d=await p.evaluate(()=>{const e=[...document.querySelectorAll('#modal [data-kshdet]')].find(x=>x.getClientRects().length);if(!e)return null;e.click();return 1});await p.waitForTimeout(700);
   const x=d&&await p.evaluate(()=>{const e=[...document.querySelectorAll('#modal .kit-x[data-kshdetx]')].find(x=>x.getClientRects().length);if(!e)return null;const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});
   if(x){tot++;await p.mouse.click(x[0],x[1]);await p.waitForTimeout(900);const r=await p.evaluate(()=>({shop:!document.getElementById('modal').hidden&&!!document.querySelector('#modal .kshop'),card:!!document.querySelector('#modal .kshdet')}));const bad=!r.shop||r.card;if(bad)fails++;console.log(wh.padEnd(9),'shop item card «Lui»'.padEnd(34),JSON.stringify(r),bad?'FAIL card close must leave the shop open':'ok')}else console.log(wh,'shop item card: not reached')}
  console.log(wh,'page errors',errs.length,errs.slice(0,2).join(' | '));await ctx.close()}
 console.log('dialogs opened',tot,'FAIL',fails);await b.close();process.exit(fails?1:0)})();
