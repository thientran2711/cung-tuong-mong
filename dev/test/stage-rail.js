/* KIT §77 kitStageRail test (owner 16/11): rail on the stage (left column, under the title, inside the stage), no goal strip anywhere,
   goal icon → chapter detail that closes by ✕ / Esc / tap outside, calendar icon → month calendar; no rail button over a face box.
   usage: node dev/test/stage-rail.js <url> <outdir> [WxH,...]   → JSON per size + screenshots <outdir>/rail-<W>x<H>[-detail].jpg; exit 1 on FAIL */
const {chromium}=require('playwright');const [,,URL,OUT,SZ]=process.argv;const sizes=(SZ||'1180x820,755x1000,844x390,1000x755').split(',');
(async()=>{const b=await chromium.launch();let bad=0;const all={};
 for(const sz of sizes){const [W,H]=sz.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.setDefaultTimeout(30000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){start()}return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kcoach,.kcoach,.kcf,#kcf,.kflip,#kflip').forEach(e=>e.remove());try{S.tutDone=1}catch(e){}tab='act';render()});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const q=e=>{const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
   const rail=document.getElementById('krail');const st=document.getElementById('stage');const B=rail?[...rail.querySelectorAll('[data-rail]')]:[];
   const sr=st.getBoundingClientRect();const inside=B.every(x=>{const r=x.getBoundingClientRect();return r.left>=sr.left-1&&r.right<=sr.right+1&&r.top>=sr.top-1&&r.bottom<=sr.bottom+1});
   const faces=[...st.querySelectorAll('img.figimg,#mefig')].filter(e=>e.offsetParent).map(e=>{const r=e.getBoundingClientRect();return{l:r.left+r.width*.3,r:r.right-r.width*.3,t:r.top,b:r.top+r.height*.22}});
   const overFace=B.filter(x=>{const r=x.getBoundingClientRect();return faces.some(f=>r.left<f.r&&r.right>f.l&&r.top<f.b&&r.bottom>f.t)}).map(x=>x.dataset.rail);
   const strips=[...document.querySelectorAll('#kgoalst,#panel .kgoal,#panel .obj67')].filter(e=>e.getClientRects().length).length;
   return{rail:rail?q(rail):null,btns:B.map(x=>[x.dataset.rail,q(x),x.classList.contains('kbadge')]),inside,overFace,strips,desk:!!document.getElementById('kmcdesk'),title:(document.getElementById('sc-t')||{}).textContent}});
  await p.screenshot({path:`${OUT}/rail-${sz}.jpg`,type:'jpeg',quality:60});
  /* tutorial step "muctieu" must find the rail icon (40 / 34 px) */
  r.tut=await p.evaluate(()=>{const st=(window.KTUT_STEPS||[]).find(x=>x.id==='muctieu');if(!st)return 'no step';const e=st.target();if(!e)return null;const q=e.getBoundingClientRect();return [e.dataset.rail,Math.round(q.width)]});
  await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);
  await p.click('#krail [data-rail=goal]');await p.waitForTimeout(1200);
  r.detail=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&!M.hidden&&M.querySelector('.dlg');return d?{title:(d.querySelector('.kptitle')||{}).textContent,x:!!d.querySelector('.kph .kit-x'),pics:d.querySelectorAll('#mb img').length,figs:d.querySelectorAll('.kes,.kdper').length,badgeAfter:document.querySelector('#krail [data-rail=goal]').classList.contains('kbadge')}:null});
  await p.screenshot({path:`${OUT}/rail-${sz}-detail.jpg`,type:'jpeg',quality:60});
await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);
  await p.keyboard.press('Escape');await p.waitForTimeout(500);r.escClosed=await p.evaluate(()=>document.getElementById('modal').hidden);
await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);
  await p.click('#krail [data-rail=goal]');await p.waitForTimeout(800);await p.click('#modal .kph .kit-x').catch(()=>{});await p.waitForTimeout(500);r.xClosed=await p.evaluate(()=>document.getElementById('modal').hidden);
await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);
  await p.click('#krail [data-rail=goal]');await p.waitForTimeout(800);await p.mouse.click(3,Math.round(H/2));await p.waitForTimeout(500);r.outClosed=await p.evaluate(()=>document.getElementById('modal').hidden);
  await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true;M.className='modal';document.querySelectorAll('.kroul,#kroul,#kroulw,.kcf,#ktut,#kcoach').forEach(e=>e.remove());try{kitCoachOff()}catch(e){}});await p.waitForTimeout(300);await p.click('#krail [data-rail=cal]');await p.waitForTimeout(800);
  r.cal=await p.evaluate(()=>{const M=document.getElementById('modal');return !M.hidden&&!!M.querySelector('.kpseal')&&M.querySelector('.kpseal').textContent});
  r.errs=errs;const ok=Array.isArray(r.tut)&&r.tut[0]==='goal'&&r.rail&&r.inside&&!r.overFace.length&&!r.strips&&!r.desk&&r.detail&&r.detail.x&&r.escClosed&&r.xClosed&&r.outClosed&&r.cal&&!r.detail.figs;
  r.verdict=ok?'PASS':'FAIL';if(!ok)bad++;all[sz]=r;await ctx.close()}
 console.log(JSON.stringify(all,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
