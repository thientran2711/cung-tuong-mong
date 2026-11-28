/* ui-fixes-1 #4: count frames where a VISIBLE falling sprite (alpha>.05) overlaps a stage info chip (#sc-t, .k3c, .k3p, .krailb). usage: node dev/test/ui-fixes-1-petals.js <device> [seconds=25] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const D=require('./lib/device');
const [,,DEV='ipadAir',SEC='25']=process.argv;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await D.newDeviceContext(b,DEV);await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 const game=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await game.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove())});
 for(let i=0;i<90;i++){const st=await game.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await game.evaluate(()=>{try{nlAccept(true)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.month=3;render();const b=document.querySelector('#tabs [data-tab="rel"]');if(b)b.click()});await p.waitForTimeout(4000);
 const R=await game.evaluate(async sec=>{const info=()=>[...document.querySelectorAll('#stage .k3c,#stage .k3p,#stage .krailb,#stage #sc-t')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>4);
  let frames=0,hit=0,maxLive=0,worst=0;const end=performance.now()+sec*1000;
  await new Promise(res=>{const tick=()=>{if(performance.now()>end)return res();frames++;const ch=(window.KFX&&KFX.wroot&&KFX.wroot.children)||[];const R=info();let h=0,live=0;
    for(const c of ch){if(!(c.alpha>.05)||!c.visible)continue;live++;const q=c.getBounds?c.getBounds():null;if(!q)continue;const rs=document.getElementById('krotf');
     const L=q.x,T=q.y,Rr=q.x+q.width,B=q.y+q.height;for(const r of R){const ox=Math.min(Rr,r.right)-Math.max(L,r.left),oy=Math.min(B,r.bottom)-Math.max(T,r.top);if(ox>1&&oy>1){h++;worst=Math.max(worst,Math.min(ox,oy));break}}}
    maxLive=Math.max(maxLive,live);if(h)hit++;requestAnimationFrame(tick)};tick()});return{frames,framesWithOverlap:hit,maxLive,worstOverlapPx:Math.round(worst),hasKFX:!!window.KFX}},+SEC);
 console.log(JSON.stringify({dev:DEV,...R}));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
