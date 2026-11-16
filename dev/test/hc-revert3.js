/* review/hc-portrait-revert-r1: Người lạ card (strip click) screenshot + aspect. usage: node dev/test/hc-revert3.js <url> <WxH> <out.jpg> */
const {chromium}=require('playwright');const [,,BASE,SZ,OUT]=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}kn();Q.length=0;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML=''}document.body.classList.remove('kbk-open');document.querySelectorAll('.kroul').forEach(e=>e.remove());tab='staff';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}});
 await p.waitForTimeout(3500);
await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));
 await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));const hit=await p.mouse.click(190,255).then(()=>true);
 await p.waitForTimeout(3500);
 const r=await p.evaluate(()=>{const AR=550/1037;return{asp:[...document.querySelectorAll('#panel .pc>.pcl>.pcp img.kfr')].map(i=>{const r=i.getBoundingClientRect();return +(r.width/r.height/AR).toFixed(3)}),name:(document.querySelector('#panel .pcname')||{}).textContent,silh:!![...document.querySelectorAll('#panel .pc img')].some(i=>/unknown|silh|face-/.test(i.src))}});
 await p.screenshot({path:OUT,type:'jpeg',quality:50});console.log(JSON.stringify({hit,r,errs}));await b.close()})();
