/* kit-hand-split.js (KIT-STAGE-R10, MAIN LOOK 27/11 «Được» held the failure text; KIT §224 kaRows; law 11 whole group): every card of every reign beat (RGBT, the Bàn bài frames) —
   no «hỏng thì …» clause inside a gain row (Được / Thành); the loss sits in its own red row (Mất / Bại). Prints a before/after table row per card with a violation.
   usage: node dev/test/kit-hand-split.js <index.html>   exit 1 on FAIL */
const {chromium}=require('playwright');const fs=require('fs');const SRC=process.argv[2];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot=1;let s=777;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof rgFire==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true});await p.waitForTimeout(3000);
 const ids=await p.evaluate(()=>Object.keys(RGBT));let n=0,bad=[],nog=0;
 for(const id of ids){const r=await p.evaluate(id=>{try{S.evc=null;EVCW.length=0}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;if(!rgFire(id))return null;showModal();return 1},id);if(!r)continue;await p.waitForFunction(()=>document.querySelector('#modal .opts button.kopt .kb .kr-duoc,#modal .opts button.kopt .kb .kr-thanh'),null,{timeout:4000}).catch(()=>{});await p.waitForTimeout(700);
  const rows=await p.evaluate(()=>[...document.querySelectorAll('#modal .opts button.kopt')].map(c=>({n:(c.querySelector('.kan,.kat b')||c).textContent.trim().slice(0,40),gain:[...c.querySelectorAll('.kb .kr-duoc .krv,.kb .kr-thanh .krv')].map(v=>v.textContent).join(' | '),loss:[...c.querySelectorAll('.kb .kr-mat2 .krv,.kb .kr-bai:not(.kofold) .krv')].map(v=>v.textContent).join(' | '),odds:!!c.querySelector('.kodds,.kodb'),/* KK56 §93.8: on a hand card the odds live in the picture badge */labs:[...c.querySelectorAll('.kb>.kr:not(.kofold)>.krl')].map(e=>e.textContent.trim()).join('/')})));
  rows.forEach(x=>{n++;if(!x.gain)nog++;if(/hỏng thì/.test(x.gain+x.loss))bad.push({beat:id,...x});if(x.odds&&/(^|\/)(Được|Mất)(\/|$)/.test(x.labs))bad.push({beat:id,why:'odds card labelled Được/Mất',...x});if(!x.odds&&/(^|\/)(Thành|Bại)(\/|$)/.test(x.labs))bad.push({beat:id,why:'sure card labelled Thành/Bại',...x})})}
 console.log(`cards scanned ${n}, violations («hỏng thì» in a gain row · odds card Được/Mất · sure card Thành/Bại): ${bad.length}, cards with no gain row ${nog}`);bad.forEach(x=>console.log('  BAD',JSON.stringify(x)));
 await b.close();process.exit(bad.length?1:0)})();
