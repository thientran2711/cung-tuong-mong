/* KIT §54.2 HOME AGAIN (KK69; RV-180 / RV-182 iPad ring «Trả lại quà»): a piece that leaves her Tư trang and comes back in the SAME step is no gain
   and no loss — no «Nhận» reveal over the act's result. Real call sites: j8 giveTo → jrcv rcvGiftIn «back» (forced), and a co-op style copy without iu.
   Control: a really new item still gets its kitGain reveal.
   usage: node dev/test/sw-serve.js 8955 <repo root> (another shell);  node dev/test/kit/gift-back.js http://localhost:8955/
   BEFORE column = the same run against a build without the pairing (e.g. the base branch) → the two «back» rows FAIL. */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));const [,,BASE]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const c=await b.newContext({viewport:{width:W,height:H},hasTouch:true,serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitGain,null,{timeout:180000});
  await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});await sleep(1500);
  const R=await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));
   document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
   document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render();await wait(400);
   const drain=async()=>{for(let i=0;i<20;i++){const o=document.querySelector('.kmov');if(!o){await wait(150);if(!document.querySelector('.kmov')&&!(window.KMQ&&KMQ.length))break;continue}o.click();await wait(350)}};
   const rows=[];const L=(typeof liveRivals==='function'?liveRivals(true):rivals.filter(x=>x.alive!==false&&!x.out));const v=L.find(x=>x.queen)||L[0];
   const key=Object.keys(IT).find(k=>IT[k]&&!IT[k].h&&(typeof itKnown!=='function'||itKnown({k})))||'';
   let iuN=900000;const fresh=()=>({k:key,iu:'kk69-'+(iuN++)});
   const step=async(name,fn)=>{const g0=(KFX.gains||[]).length,b0=KFX.back||0,n0=S.inv.length;let err='',ret;try{ret=fn()}catch(e){err=e.message}render();await wait(500);
    const ov=!!document.querySelector('.kmov.kfgain');const g=(KFX.gains||[]).length-g0;await drain();Q.length=0;document.getElementById('modal').hidden=true;
    rows.push({name,gains:g,ov,back:(KFX.back||0)-b0,dn:S.inv.length-n0,ret:String(ret||'').slice(0,70),err})};
   S.inv.push(fresh());render();await wait(300);await drain();
   const rcv0=window.rcvGiftIn;
   window.rcvGiftIn=function(a,r,e){if(a===S){invAdd(S,Object.assign({},e));return'back'}return rcv0.apply(this,arguments)};
   await step('giveTo back (iu)',()=>giveTo(S,v,S.inv.length-1));
   window.rcvGiftIn=function(a,r,e){if(a===S){const x=Object.assign({},e);delete x.iu;invAdd(S,x);return'back'}return rcv0.apply(this,arguments)};
   const last=S.inv[S.inv.length-1];if(last)delete last.iu;
   await step('giveTo back (no iu)',()=>giveTo(S,v,S.inv.length-1));
   window.rcvGiftIn=rcv0;
   await step('new item (control)',()=>{S.inv.push(fresh())});
   return {rows,key,v:v&&v.name}});
  const dev=W<H?'fold':'ipad';
  for(const r of R.rows){const want=r.name.startsWith('new')?r.gains>=1:(r.gains===0&&!r.ov&&r.back>=1&&r.dn===0);if(!want)bad++;
   console.log(`${want?'OK  ':'FAIL'} ${dev} ${r.name.padEnd(20)} reveals ${r.gains} · overlay ${r.ov} · paired ${r.back} · Δinv ${r.dn}${r.err?' · ERR '+r.err:''} · «${r.ret}»`)}
  if(errs.length){bad++;console.log('FAIL page errors',errs.slice(0,3))}await c.close()}
 await b.close();console.log(bad?`GIFT-BACK FAIL ${bad}`:'GIFT-BACK PASS');process.exit(bad?1:0)})();
