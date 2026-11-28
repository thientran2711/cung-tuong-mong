/* d-row8-shots: PHÂN CUNG panel with the D-ROW8 host-liking why line («<chủ vị> quý ngươi, xin cho ngươi về ở chung»), Fold + iPad (copy of promo-build-shots part 1).
   usage: bash dev/site/build_site.sh && node dev/test/d-row8-shots.js <outdir> [--no-net]
   (was: SMALL-tier shots (go-live kit, owner OD:L1370 (b)): the owner's two devices first — Fold 755x1000 and iPad 1180x820 — real device
   profiles, HOST mode (dev/test/lib/device.js), the BUILT root index.html. Title, then a new life: home + every visible tab.
   usage: bash dev/site/build_site.sh && node dev/tools/shots.js <outdir> [device ...] [--no-net]   (default fold ipadAir; JPEG q70 @2x)
   CTM_ROOT=<dir> serves another built site. Look at every picture. Exit 1 on a page error or horizontal overflow. Pictures come from the CDN (--no-net = grey boxes, faster). */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const A=process.argv.slice(2);const OUT=A.find(a=>!a.startsWith('--')&&!D.DEVICES[a])||'shots';fs.mkdirSync(OUT,{recursive:true});
const DEVS=A.filter(a=>D.DEVICES[a]);const NET=!A.includes('--no-net');let bad=0;
(async()=>{const srv=await D.serveRoot(process.env.CTM_ROOT||undefined);const b=await chromium.launch();
 for(const dev of (DEVS.length?DEVS:['fold','ipadAir'])){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  if(!NET)await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:NET?60000:5000}).catch(()=>{});await g.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  const shot=async n=>{await pg.waitForTimeout(500);if(n!=='0-title')await g.evaluate(()=>{document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());['kroul','kroulw','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});await pg.screenshot({path:`${OUT}/${tag}-${n}.jpg`,type:'jpeg',quality:70});
   const o=await g.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0){bad++;console.log(`FAIL ${tag} ${n}: horizontal overflow ${o}px`)}};
  await shot('0-title');
  await g.evaluate(()=>{try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){start();if(!(S.origin&&S.origin.k==='cnv'))break}['kroul','kroulw','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
  await g.waitForFunction(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
   /* scene overlays that open by themselves on the first day (card flip, night end…): press their own button, else lift them */
   for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();
    if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8){const bt=e.querySelector('button.kbtn,button');if(bt&&!e.__qcPressed){e.__qcPressed=1;bt.click()}else e.remove()}}try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){}return !Q.length&&(window.__qcN=(window.__qcN||0)+1)>12},null,{timeout:60000,polling:150}).catch(()=>{});
  /* the opening scene's talk bubbles («Chạm để tiếp») would sit over the panel: tap them away first (the bubble only) */
  for(let i=0;i<30;i++){const t=await g.evaluate(()=>{const e=[...document.querySelectorAll('body *')].reverse().find(e=>e.tagName!=='SCRIPT'&&e.tagName!=='STYLE'&&/Chạm để tiếp/.test(e.textContent)&&e.getBoundingClientRect().width>0);if(!e)return 0;const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});if(!t)break;await pg.mouse.click(t[0],t[1]);await pg.waitForTimeout(500)}
  await g.evaluate(()=>{try{for(let j=0;j<8&&Q.length;j++)closeModal()}catch(e){}Q.length=0});
  await g.evaluate(()=>{{Q.length=0;S.rank=1;S.sung=BAL.promoR.pc.mid.sung;S.hh=0;S.th=0;const hs=[S].concat(rivals).filter(x=>x!==S&&x.alive&&!x.out&&!x.queen&&rkOf(x)>=3&&rkOf(x)<=5&&x.pal!=null);
   for(const h of hs){S.rl[h.id]=0;h.rel=0;h.th=0}const mt=x=>rivals.filter(y=>y.alive&&!y.out&&y.resHead===key(x)&&rkOf(y)<3).length;const m0=Math.min(...hs.map(mt));const h=hs.find(x=>mt(x)===m0);/* her liked host's room is free (its girls are housed again after her: S is first in palFix) */for(const y of rivals)if(y.resHead===key(h)&&rkOf(y)<3&&!y.coop){y.resHead=null;y.resHall=null}S.rl[h.id]=80;h.rel=80;S.ro[h.id]=0;h.oan=0;
   const g=liveRivals(false).filter(x=>x.rank<3).slice(0,2);S.resHead=null;window.phanCungEdict({list:[{p:S,fav:{}}].concat(g.map(v=>({p:v,fav:{}}))),then:()=>{}});}render();showModal()});await pg.waitForTimeout(1500);
  for(let i=0;i<30;i++){const t=await g.evaluate(()=>{const m=document.getElementById('modal');const e=[...document.querySelectorAll('body *')].reverse().find(e=>e.tagName!=='SCRIPT'&&e.tagName!=='STYLE'&&!(m&&m.contains(e))&&/Chạm để tiếp/.test(e.textContent)&&e.getBoundingClientRect().width>0);if(!e)return 0;const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2,e.tagName+'.'+e.className]});if(!t)break;console.log('tap',t[2]);await pg.mouse.click(t[0],t[1]);await pg.waitForTimeout(500)}
  await g.evaluate(()=>{try{showModal()}catch(e){}});await pg.waitForTimeout(600);
  await shot('row8-phan-cung');
  const why=await g.evaluate(()=>pcWhy(S).join(' | '));console.log(tag,'why:',why);if(!/có thiện cảm với ngươi, xin cho ngươi về ở chung/.test(why)){bad++;console.log('FAIL no liking line')}
  if(errs.length){bad++;console.log('page errors',errs.slice(0,3))}
  await ctx.close()}
 await b.close();srv.close&&srv.close();console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0)})();
