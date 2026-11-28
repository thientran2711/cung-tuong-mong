/* dlg-twin.js (KK44, KIT §6.2i root fix, owner ruling 26/11 ~17:55Z via MAIN 161): the one-copy guard lives in j3 showModal (kitDlgFold) and a folded
   copy RESOLVES WITH its kept twin (kitDlgTwinsDone) — never dropped silently.
   Cases: (a) two identical info dialogs → one shows (Q 1), one ✕ closes both, BOTH onClose ran; (b) a FLOW that awaits its dialog (Promise resolved by
   onClose), started twice by a double tap → one ✕, both flows go on; (c) two identical option dialogs → one pick spends ONCE (bạc −1 once, go once), no
   onClose for an answered dialog, nothing left in Q; (d) two dialogs with a different body are NOT folded (both show, one after the other);
   (e) a dialog under ANOTHER dialog's twin: only identical copies fold.
   usage: node dev/test/dlg-twin.js <index.html> [WxH]   exit 1 on any FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{let s=11;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(async()=>{quiet=true;window.__forceOrigin='tt';document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;try{kmReset()}catch(e){}document.getElementById('modal').hidden=true;['kload','kboot','klife'].forEach(i=>{const k=document.getElementById(i);if(k)k.remove()})});
 await p.waitForTimeout(800);
 const R=await p.evaluate(async()=>{const out={};/* she is at the screen: the day-queue holder (jdayq) paints at once */try{if(typeof DQ!=="undefined")DQ.user=1}catch(e){}const sl=t=>new Promise(r=>setTimeout(r,t));const clr=()=>{Q.length=0;document.getElementById('modal').hidden=true};
  /* (a) */clr();let n=0;for(let k=0;k<2;k++)Q.push({t:'Thử một bản',h:'<p>Cùng một hộp thoại.</p>',onClose:()=>n++});showModal();const qa=Q.length;closeModal();await sl(50);
  out.a={qShown:qa,onClose:n,qAfter:Q.length,hidden:document.getElementById('modal').hidden};
  /* (b) */clr();let done=0;const flow=async()=>{await new Promise(r=>{Q.push({t:'Chờ hồi âm',h:'<p>Một luồng đang chờ.</p>',onClose:r});showModal()});done++};flow();flow();await sl(30);const qb=Q.length;closeModal();await sl(60);
  out.b={qShown:qb,flowsDone:done,qAfter:Q.length};
  /* (c) */clr();const bac0=S.bac=Math.max(S.bac||0,5);let go=0,oc=0;for(let k=0;k<2;k++)Q.push({t:'Mua một món',h:'<p>Trả một lạng bạc.</p>',opts:[{n:'Mua',fx:{bac:-1},go:()=>go++},{n:'Thôi',fx:{}}],onClose:()=>oc++});showModal();const qc=Q.length;chooseM(0);await sl(50);
  out.c={qShown:qc,bacSpent:bac0-S.bac,go,onClose:oc,qAfter:Q.length};
  /* (d) */clr();let d1=0,d2=0;Q.push({t:'Tin báo',h:'<p>Tin thứ nhất.</p>',onClose:()=>d1++});Q.push({t:'Tin báo',h:'<p>Tin thứ hai.</p>',onClose:()=>d2++});showModal();const qd=Q.length;closeModal();const qd2=Q.length;closeModal();await sl(50);
  out.d={qShown:qd,afterFirst:qd2,d1,d2};
  /* (e) */clr();let e1=0,e2=0;Q.push({t:'A',h:'<p>a</p>',onClose:()=>e1++});Q.push({t:'B',h:'<p>b</p>',onClose:()=>e2++});Q.push({t:'A',h:'<p>a</p>',onClose:()=>e1++});showModal();const qe=Q.length;closeModal();const qe2=Q.length;const front=Q[0]&&Q[0].t;closeModal();await sl(50);
  out.e={qShown:qe,afterFirst:qe2,front,e1,e2};clr();return out});
 let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 chk('(a) identical info dialogs: one shows, one ✕ closes both, both onClose ran',R.a.qShown===1&&R.a.onClose===2&&R.a.qAfter===0&&R.a.hidden,R.a);
 chk('(b) a flow awaiting its dialog, started twice: one ✕ → both flows go on',R.b.qShown===1&&R.b.flowsDone===2&&R.b.qAfter===0,R.b);
 chk('(c) identical option dialogs: one pick spends once, no onClose, Q empty',R.c.qShown===1&&R.c.bacSpent===1&&R.c.go===1&&R.c.onClose===0&&R.c.qAfter===0,R.c);
 chk('(d) different body: not folded, both show',R.d.qShown===2&&R.d.afterFirst===1&&R.d.d1===1&&R.d.d2===1,R.d);
 chk('(e) only identical copies fold (A,B,A → A(+twin),B)',R.e.qShown===2&&R.e.afterFirst===1&&R.e.front==='B'&&R.e.e1===2&&R.e.e2===1,R.e);
 chk('no page errors',!errs.length,errs.slice(0,3));await b.close();console.log(fails?'DLG-TWIN FAIL '+fails:'DLG-TWIN PASS');process.exit(fails?1:0)})();
