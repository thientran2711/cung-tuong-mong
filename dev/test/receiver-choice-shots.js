/* RECEIVER CHOICE shots (law 12: Fold 755x1000@2 HOST + iPad 1180x820@2): her «Lời nhờ» card (jrcv PEND.rcvHelp) + the ONE ask card (PEND.rcvAsk: Kết giao, Ghé chơi, Mời đến cung ta) + her judge card as the Hoàng hậu (PEND.rcvJudge) — an NPC asks HER, 4 answers.
   usage: bash dev/site/build_site.sh && node dev/test/receiver-choice-shots.js <outdir>   (shots stay OUTSIDE the repo; boot = ptime-shots.js) */
const {chromium}=require('playwright');const D=require('./lib/device');const OUT=process.argv[2]||'/tmp/rcv-shots';require('fs').mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const errs=[];
 for(const [nm,prof] of (process.env.ONLY?[[process.env.ONLY,process.env.ONLY==="fold"?"fold":"ipadAir"]]:[["fold","fold"],["ipad","ipadAir"]])){const ctx=await D.newDeviceContext(b,prof,{deviceScaleFactor:2,viewport:nm==="fold"?{width:755,height:1000}:{width:1180,height:820}});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(nm+": "+e.message));const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000});
  await g.evaluate(()=>{try{KLOAD.paused=true}catch(e){}const k=document.getElementById('kload');if(k)k.remove()});
  await g.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__bot=1;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&!S.out)break}window.__bot=0;
   Q.length=0;document.getElementById('modal').hidden=true;tab="act";deal();render();for(const id of ['kload','klife']){const k=document.getElementById(id);if(k)k.remove()}});await sleep(2500);
  await g.evaluate(()=>{const v=liveRivals(true).find(x=>x!==S&&!x.out&&x.alive!==false);S.bac=Math.max(S.bac||0,100);helpAsk(v,S);showModal()});await sleep(3500);console.log(nm,JSON.stringify(await g.evaluate(()=>{const m=document.getElementById("modal");const r=m&&m.getBoundingClientRect();return{hidden:m&&m.hidden,r:r&&[r.x,r.y,r.width,r.height],q:Q.length,w:innerWidth,h:innerHeight}})));
  await p.screenshot({path:`${OUT}/${nm}-rcv-help.png`});
  /* every other ask: ONE card (jrcv PEND.rcvAsk) — Kết giao and Ghé chơi as samples */
  for(const k of ["ally","call"]){await g.evaluate(k=>{Q.length=0;document.getElementById('modal').hidden=true;const v=liveRivals(true).filter(x=>x!==S&&!x.out&&x.alive!==false)[1];rcvAsk(k,v,S);showModal()},k);await sleep(3000);await p.screenshot({path:`${OUT}/${nm}-rcv-${k}.png`})}
  /* round 3: she as the Hoàng hậu judges «Trình Hoàng hậu» (jrcv PEND.rcvJudge) · an NPC host's «Mời đến cung ta» lands as her 4-answer card */
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const V=liveRivals(true).filter(x=>x!==S&&!x.out&&x.alive!==false);const rk=S.rank;S.rank=7;const a=V[1],t=V.find(x=>x!==a&&rkOf(x)>=1)||V[2];evA(a,t,6);ACT.trinhhh.f(a,t);S.rank=rk;showModal()});await sleep(3000);await p.screenshot({path:`${OUT}/${nm}-rcv-judge.png`});
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const v=liveRivals(true).filter(x=>x!==S&&!x.out&&x.alive!==false)[2];rcvAsk("invite",v,S);showModal()});await sleep(3000);await p.screenshot({path:`${OUT}/${nm}-rcv-invite.png`});
  await ctx.close()}
 console.log(JSON.stringify({errs}));await b.close();srv.close()})();
