/* review/hud-sacphong stills: node dev/test/hud-sacphong-shots.js <outdir> [device…]  (fold, ipadAir …) — top bar close-up + full screen */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const OUT=process.argv[2]||'/home/user/wt/hud-sp-shots';const DEV=process.argv.slice(3);const devices=DEV.length?DEV:['fold','ipadAir'];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const res=[];
 for(const d of devices){const ctx=await D.newDeviceContext(b,d,{});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(1500);
  await g.evaluate(()=>{KLIFE.off=1;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;render()});
  await p.waitForTimeout(6000);await g.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('.kload,.krbox,.krskip,.klife,.kroul,.curtain,.kdaytc,.kbd').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});await p.waitForTimeout(1500);
  const m=await g.evaluate(()=>{const h=document.querySelector('header.hud').getBoundingClientRect();return{hdr:[Math.round(h.width),Math.round(h.height)],ovf:document.documentElement.scrollWidth>innerWidth,sp:(document.getElementById('hud-sp')||{}).innerText||null}});
  res.push({d,...m,errs});await p.screenshot({path:`${OUT}/${d}${process.env.TAG||''}.png`});await ctx.close()}
 console.log(JSON.stringify(res));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
