/* review/hud-mood-bar shots (host mode): node dev/test/hud-mood-shots.js <outdir> [moodValue=-45] [device…]
   Writes <outdir>/<device>-<tab>.png and prints header metrics (header height, overflow, mood bar box). */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const OUT=process.argv[2]||'/home/user/wt/hud-shots';const MV=+(process.argv[3]||-45);const DEV=process.argv.slice(4);
const devices=DEV.length?DEV:['fold','ipadAir','ipadPro','pixel','iphone14'];const LAY=process.env.LAY||'row';const TABS=['act','rv','inv'];
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const res=[];
 for(const d of devices){const VP=process.env.VP;const ctx=await D.newDeviceContext(b,d,VP?{viewport:{width:+VP.split('x')[0],height:+VP.split('x')[1]}}:{});await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(x=>x.click())},300)});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(1500);
  await g.evaluate(([mv,lay,old])=>{KLIFE.off=1;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   if(old){delete S.mood}else if(S.mood)S.mood.v=mv;else S.mood={v:mv,log:[]};Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')};render()},[MV,LAY,!!process.env.OLD]);
  await p.waitForTimeout(5000);await g.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('.kload,.krbox,.krskip,.klife').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});await p.waitForTimeout(3000);
  for(const t of TABS){await g.evaluate(t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;render()},t);await p.waitForTimeout(1500);
   const m=await g.evaluate(()=>{const h=document.querySelector('header.hud').getBoundingClientRect();const mb=document.querySelector('#hud-mood');const r=mb?mb.getBoundingClientRect():null;
    return{hdr:[Math.round(h.width),Math.round(h.height)],mood:r?[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]:null,ovf:document.documentElement.scrollWidth>innerWidth}});
   res.push({d,t,...m,errs:errs.slice()});await p.screenshot({path:`${OUT}/${d}${process.env.TAG||''}-${LAY}-${t}.png`})}
  {const bx=await g.evaluate(()=>{const e=document.getElementById('hud-mood');const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
   const fr=await (await p.$('#krotf')).boundingBox().catch(()=>null);await g.locator('#hud-mood').click();await p.waitForTimeout(900);
   const tap=await g.evaluate(()=>{const m=document.getElementById('modal');return !m.hidden&&/Thanh tâm trạng|tâm trạng/i.test(m.innerText)});res.push({d,tapOpensMoodBox:tap});await p.screenshot({path:`${OUT}/${d}${process.env.TAG||''}-${LAY}-box.png`})}
  await ctx.close()}
 console.log(JSON.stringify(res));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
