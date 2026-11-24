const {chromium}=require('playwright');const D=require(__dirname+'/../../test/lib/device');
async function boot(dev,dsf,minP,extra){const srv=await D.serveRoot();const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,dev,Object.assign({deviceScaleFactor:dsf||1,reducedMotion:'reduce'},extra||{}));await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});if(process.env.KSEED)await ctx.addInitScript(sd=>{let a=sd>>>0;Math.random=function(){a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}},+process.env.KSEED);if(minP)await ctx.addInitScript(n=>{window.__minP=n},minP);
 const pg=await ctx.newPage();pg.on('pageerror',e=>console.log('PERR',e.message));
 const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
 await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:60000}).catch(()=>{});
 await g.evaluate(()=>{try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<80;i++){start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isKc==='function'&&isKc())&&!(typeof isSrv==='function'&&isSrv())&&(!window.__minP||homePeople().length>=window.__minP))break}['kroul','kroulw','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
 await g.waitForFunction(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
  for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();
   if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8){const bt=e.querySelector('button.kbtn,button');if(bt&&!e.__qcPressed){e.__qcPressed=1;bt.click()}else e.remove()}}try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){}return !Q.length&&(window.__qcN=(window.__qcN||0)+1)>12},null,{timeout:60000,polling:150}).catch(()=>{});
 return {srv,b,ctx,pg,g}}
module.exports={boot};
