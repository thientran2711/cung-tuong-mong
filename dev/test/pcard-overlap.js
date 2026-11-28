/* pcard-overlap (TAINGHE r5 item 1, LC19/MAIN 150: person pop-ups — dotted info words over the «Xin …» action buttons; law 11 family = EVERY person card):
   opens the person card of the Emperor, Thái hậu (if any), every live rival and the first servants, Fold 755x1000 + iPad 1180x820; at every scroll step of the
   card (#mb and the act list) measures each VISIBLE info target (.kgl / .kfx / .khap / .kskn / .ladi — its own box AND its r4 hit layer) against each VISIBLE
   action button (button / [data-kmemp] / .pbtn …): a point inside both where elementFromPoint lands on the info target = a STEAL (the button loses the tap).
   PASS = 0 steals. usage: node dev/test/pcard-overlap.js [index.html] [WxH,...]  (env MAX=n people per kind, default 4) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]||path.join(__dirname,'../../index.html'));const SIZES=(A[1]||'755x1000,1180x820').split(',');const MAX=+(process.env.MAX||4);
(async()=>{const b=await chromium.launch();let bad=0;const out=[];
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;try{kn();for(const v of rivals){S.met[v.id]=1}}catch(e){}});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#dawn,#kdaytc,#kxcatch{display:none!important}'});
  const people=await p.evaluate(MAX=>{const L=[['emp','showEmp()']];try{if(S.th&&typeof showTH==='function')L.push(['th','showTH()'])}catch(e){}for(const t of ['rv','staff'])for(let i=0;i<MAX;i++)L.push([t+' row'+i,{tab:t,i}]);return L},MAX);
  for(let [who,code] of people){
   let ok=await p.evaluate(code=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;if(typeof code!=='string'){tab=code.tab;render();return 'tap'}try{(0,eval)(code)}catch(e){return String(e).slice(0,80)}return !document.getElementById('modal').hidden},code);
   if(ok==='tap'){await p.waitForTimeout(600);const q=await p.evaluate(i=>{const e=[...document.querySelectorAll('#panel .kpor')].filter(e=>e.getClientRects().length)[i];if(!e)return null;e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},code.i);if(!q){ok='no row';}else{await p.waitForTimeout(250);await p.touchscreen.tap(q[0],q[1]);await p.waitForTimeout(700);ok=await p.evaluate(()=>!document.getElementById('modal').hidden);who+=' '+(await p.evaluate(()=>(document.querySelector('#modal .kph h3,#modal h3,#modal .kpt')||{}).innerText||'')).slice(0,24)}}
   if(ok!==true){out.push([wh,who,'not opened '+ok,'SKIP']);continue}await p.waitForTimeout(900);
   const res=await p.evaluate(async()=>{const M=document.querySelector('#modal');const vis=e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return null;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||+cs.opacity<.05)return null;return r};
    const scs=[document.getElementById('mb'),...M.querySelectorAll('.pcr,.kpscroll,[class*=scroll]')].filter(e=>e&&e.scrollHeight>e.clientHeight+4);const steals=[];const seen=new Set();
    const INFO='.kgl,.kfx,.khap,.kskn,.ladi';const BTN='button:not(.kgl):not(.kskn):not(.ladi):not(.kx),[data-kmemp],.pbtn,[role=button]:not(.kgl):not(.khap)';
    const step=async()=>{await new Promise(r=>setTimeout(r,180));const inf=[...M.querySelectorAll(INFO)].map(e=>[e,vis(e)]).filter(x=>x[1]);const bts=[...M.querySelectorAll(BTN)].filter(e=>!e.matches(INFO)&&!e.closest(INFO)).map(e=>[e,vis(e)]).filter(x=>x[1]&&x[1].bottom>0&&x[1].top<innerHeight);
     for(const [bt,br] of bts){if(bt.contains(document.activeElement)&&0)continue;for(let gx=.1;gx<1;gx+=.2)for(let gy=.2;gy<1;gy+=.3){const x=br.left+gx*br.width,y=br.top+gy*br.height;const t=document.elementFromPoint(x,y);if(!t)continue;const ii=t.closest(INFO);if(ii&&!bt.contains(ii)){const k=(bt.innerText||'').trim().slice(0,30)+' ⟵ '+(ii.innerText||ii.dataset.kgl||'').trim().slice(0,24);if(!seen.has(k)){seen.add(k);steals.push(k)}}}}};
    await step();for(const sc of scs){for(let y=0;y<=sc.scrollHeight;y+=Math.max(60,sc.clientHeight*.4)){sc.scrollTop=y;await step()}sc.scrollTop=0}return {steals,scrollers:scs.map(s=>s.id||s.className.slice(0,20))}});
   if(res.steals.length)bad++;out.push([wh,who,'steals '+res.steals.length+(res.steals.length?' · '+res.steals.slice(0,4).join(' | '):''),res.steals.length?'FAIL':'PASS'])}
  await ctx.close()}
 for(const r of out)console.log(r.join(' | '));console.log(bad?`PCARD-OVERLAP FAIL ${bad}`:'PCARD-OVERLAP PASS');await b.close();process.exit(bad?1:0)})();
