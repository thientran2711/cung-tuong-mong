/* map-tap-go probe: opens each place-card situation through the real tap rule (j77Tap) and prints the modal structure.
   usage: node dev/test/map-tap-go-probe.js <device> <outdir> [scenarios]  (serves the BUILT root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,DEV='ipadAir',OUT='/tmp',SC='last,spill,etq,sneak,rank']=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,DEV,{ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(2500);
 const clear=()=>g.evaluate(()=>{for(const e of [...document.querySelectorAll('#kroul,#kroulw,.kroul,#kload,.kloadchip')])e.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await clear();
 for(const k of SC.split(',')){await clear();
  const info=await g.evaluate(k=>{S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;S.wx=S.wx||{};S.acPass={};S.invite=null;tab='go';
   const C={spill:[0,3,'vuon'],last:[0,2,'vuon'],sneak:[1,0,'kn'],rank:[0,0,'thu']}[k]||[0,0,'vuon'];let place=C[2];S.buoi=C[0];used=C[1];
   if(k==='etq'){place=places().map(x=>x.k).find(x=>{try{return accEtq(S,x)&&accessOf(S,x).ok}catch(e){return false}})||'kn'}
   render();j77Tap(place);const m=Q[0];return{place,q:m&&m.t,placeK:m&&m.placeK,headArt:!!(m&&m.headArt),keys:m?Object.keys(m).join(','):''}},k);
  await p.waitForTimeout(1200);
  const dom=await g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const d=M.querySelector('.dlg');const r=d.getBoundingClientRect();return{cls:d.className,w:Math.round(r.width),h:Math.round(r.height),fig:!!d.querySelector('.kfig,.kevfig,.kestage,canvas,.kpfig'),parts:[...d.querySelectorAll(':scope *')].filter(e=>/^(kpsubj|kpiart|kes|kev|kplinfo|kpmain|kdlgart)/.test(e.className)).map(e=>e.className).slice(0,12)}});
  console.log(k,JSON.stringify(info),JSON.stringify(dom));await p.screenshot({path:`${OUT}/probe-${DEV}-${k}.png`})}
 console.log('errors',errs.length,errs.slice(0,3).join('|'));await b.close();srv.close()})();
