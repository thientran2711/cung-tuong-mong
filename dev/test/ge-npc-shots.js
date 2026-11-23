/* ge-npc-shots (review/ge-npc): the NPC grand-ending world news (centre kit pop-up «Thiên hạ truyền tin», GE08) and the Bảng Thiên mệnh with an NPC
   row (GE09) at Fold 755x1000@2 and iPad 1180x820@2. usage: node dev/test/ge-npc-shots.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [nm,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(nm+': '+e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof geNpcResolve==='function',null,{timeout:120000});
  for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await p.waitForTimeout(250)}
  await p.waitForTimeout(1200);
  await p.evaluate(()=>{try{window.__kbootHostDrop&&window.__kbootHostDrop()}catch(e){}document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{document.getElementById('title').hidden=true}catch(e){}SLOT=3;window.__forceOrigin='muoi';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;try{closeModal&&closeModal()}catch(e){}
   const br=Object.keys(GE_DATA).find(b=>b==="tt_tranh");const v=liveRivals(true).find(x=>!x.queen&&!x.coop);v.nr=nrNew("tt",br);geNpcDbg.state(v);
   const i=GE_CAT[br].e.findIndex(e=>e[5]==="SIS"||e[5]==="CLAN"||e[5]==="ADV")>=0?GE_CAT[br].e.findIndex(e=>e[5]==="SIS"||e[5]==="CLAN"||e[5]==="ADV"):0;
   const r0=roll;let t=0;while(t++<80){const g=v.ge;g.done=0;g.res=null;g.st=["o","o","o","o"];g.pull=[0,0,0,0];g.pull[i]=200;roll=()=>true;const r=geNpcResolve(v);roll=r0;if(r&&r.ok&&r.i===i)break;v.alive=true}
   S.geNs={};geNpcNews();render();if(Q.length)showModal()});
  await p.waitForTimeout(800);await p.evaluate(()=>document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove()));
  await p.waitForTimeout(1800);console.log(nm,await p.evaluate(()=>{const mb=document.getElementById('mb');const d=document.querySelector('#modal .dlg');return JSON.stringify({cls:d&&d.className,kind:d&&d.dataset.kind,subj:[...(mb?mb.querySelectorAll('.kpsubj'):[])].map(e=>e.className),fig:!!(mb&&mb.querySelector('.kes img')),kn:(()=>{const v=rivals.find(x=>x.ge&&x.ge.res);return v?[kitKnown(v),kitKnownName(v)]:null})()})}));await p.screenshot({path:`${OUT}/ge-npc-news-${nm}.png`});
  await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}try{document.querySelectorAll('.modal').forEach(m=>m.hidden=true)}catch(e){}geBoardPanel()});await p.waitForTimeout(500);await p.evaluate(()=>document.querySelectorAll('#kload,#klife').forEach(e=>e.remove()));await p.waitForTimeout(1500);
  await p.screenshot({path:`${OUT}/ge-npc-board-${nm}.png`});await p.close()}
 console.log('page errors',errs.length,errs.slice(0,5));await b.close()})();
