/* dev/test/tab-instant.js — owner OD 16/11 15:45Z + 15:55Z: a tab change has NO animation on any device (no curl / slide / fade).
   usage: node dev/test/tab-instant.js [--root <built site>] [--video <dir>]
   Fold 755x1000 and iPad 1180x820, HOST mode: taps 7 tabs (incl. Dư đồ: landscape keeps the leather unroll, portrait none); after each tap checks (next frames) that no page-turn copy (.kcl-host /
   .ksht / .kcl-slide) and no .kcl-in fade exists and that the new tab's page is already there. Exit 1 on any animation. --video records. */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const D=require('./lib/device');const PP=require('./lib/playperf');
const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:A[i+1]};const ROOT=path.resolve(opt('root',path.join(__dirname,'../..')));const VID=opt('video',null);
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch({args:PP.LAUNCH_ARGS});
 for(const dev of ['fold','ipadAir']){const d=D.DEVICES[dev];const extra=VID?{recordVideo:{dir:VID,size:{width:d.w,height:d.h}}}:{};const ctx=await D.newDeviceContext(b,dev,extra);
  await ctx.addInitScript(()=>{window.__bot={pre:1}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const f=await D.openHost(p,srv.url,{timeout:300000});await sleep(1500);await PP.newLife(f);await sleep(4000);await f.evaluate(PP.CLEAR);
  for(const k of ['court','rel','kid','go','inv','art','act']){const h=await f.evaluateHandle(k=>[...document.querySelectorAll('#tabs [data-tab="'+k+'"]')].find(x=>x.offsetParent!==null)||null,k);const el=h.asElement();if(!el)continue;
   await el.click();const r=await f.evaluate(async k=>{const seen=new Set();for(let i=0;i<20;i++){await new Promise(r=>requestAnimationFrame(r));
     for(const s of ['.kcl-host','.ksht','.kcl-slide','.kcl','#panel.kcl-in','#panel.kcl-fade','.kl-unroll'])if(document.querySelector(s))seen.add(s)}return{tab,seen:[...seen]}},k);
   /* reviewer lag-play-r1: Dư đồ leather unroll = landscape only (portrait: no effect at all, owner 15:45Z) */
   if(k==='go'&&d.w>d.h){const u=r.seen.indexOf('.kl-unroll');if(u>=0)r.seen.splice(u,1);else if(!process.env.NOFX)r.seen.push('(landscape unroll missing)')}
   const ok=!r.seen.length&&r.tab===k;if(!ok)bad++;console.log(dev,k,ok?'instant':'ANIMATED '+r.seen.join(','));await sleep(1500)}
  if(errs.length){bad++;console.log(dev,'errors',errs.slice(0,3))}const v=p.video();await ctx.close();if(v&&VID){const out=path.join(VID,`tabs-${dev}.webm`);fs.renameSync(await v.path(),out);console.log('video',out)}}
 await b.close();srv.close();console.log(bad?'FAIL '+bad:'PASS tab-instant');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
