/* review/night-end (KIT §62): lonely night + dawn beats in the week panel, the night card after her bedding night; overflow + errors.
   usage: node dev/test/night-end.js <url> <outdir> 755x1000,1000x755,1180x820,1366x1024,844x390 */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VPS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const SHOT=async(p,o)=>{for(let i=0;i<3;i++){try{await p.screenshot(Object.assign({timeout:150000},o));return}catch(e){console.error('shot retry',o.path)}}};
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
 document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const vps=(VPS||'755x1000').split(',');const R={};
 for(const v of vps){const [W,H]=v.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true});const p=await c.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
  for(let i=0;i<30;i++){await sleep(700);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
  for(let i=0;i<20;i++){await sleep(400);const k=await p.evaluate(()=>{const o=document.querySelector('.kmov');if(o){o.click();return 1}return (window.KMQ&&KMQ.length)?1:0});if(!k)break}
  await sleep(800);await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render()});
  /* A: a week without her night -> end the tuần */
  const a=await p.evaluate(()=>{BAL.nightEnd.lonelyMs=60000;window.__kneTr=[];const T0=performance.now();const tr=()=>{const d=document.getElementById('dawn');window.__kneTr.push(Math.round(performance.now()-T0)+':'+(d?d.className:'-')+':'+((d&&d.querySelector('.kne-b.on'))||{dataset:{}}).dataset.i);if(performance.now()-T0<20000)setTimeout(tr,500)};tr();Q.length=0;document.getElementById('modal').hidden=true;S.tonight=null;S.ntk=null;S.nightLog=[];endTurn();return {dawnCls:document.getElementById('dawn')&&document.getElementById('dawn').className,last:window.kneLastDay,q:Q.map(x=>x.t)}});
  await p.waitForFunction(()=>document.querySelector('#dawn .kne-b.on[data-i="0"]'),null,{timeout:60000}).catch(()=>{});await sleep(500);await SHOT(p,{path:`${OUT}/a-lonely-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>{document.querySelectorAll('#dawn .kne-b').forEach(e=>e.classList.toggle('on',e.dataset.i==='1'))});await sleep(1500);await SHOT(p,{path:`${OUT}/b-dawn-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>document.getElementById('dawn').click());await p.waitForFunction(()=>document.querySelector('#dawn.kbkdawn'),null,{timeout:60000}).catch(()=>{});await sleep(1500);const a2=await p.evaluate(()=>({tr:window.__kneTr,dc:window.__kneDC||[],cls:document.getElementById('dawn').className,box:!!document.querySelector('#dawn .dbox'),kmov:[...document.querySelectorAll('.kmov')].map(e=>e.className)}));
  await SHOT(p,{path:`${OUT}/c-week-${v}.jpg`,type:'jpeg',quality:60});
  /* close everything, then a night */
  await p.evaluate(()=>{const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
  await sleep(500);
  const n=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));S.ntk=null;S.ntTry=null;S.preg=0;S.tonight="me";pushDil(mkP("ksp"),"Kính sự phòng báo tin");showModal();const seen=[];
   for(let i=0;i<8;i++){await W(300);const m=Q[0];if(!m)break;seen.push(m.pid||m.t);if(document.getElementById('modal').hidden)showModal();chooseM(0);}
   await W(400);return {seen,last:window.kneLast,ov:[...document.querySelectorAll('.kmov')].map(e=>e.className),toast:document.getElementById('rtoast')&&document.getElementById('rtoast').className+' | '+document.getElementById('rtoast').textContent.slice(0,200)}});
  await sleep(1500);await SHOT(p,{path:`${OUT}/d-night-${v}.jpg`,type:'jpeg',quality:60});
  const ov=await p.evaluate(()=>({beat:(()=>{return null})(),sw:document.documentElement.scrollWidth>innerWidth+1,ovr:(()=>{const e=document.querySelector('#kneov .kne');if(!e)return null;const r=e.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round)})(),cut:[...document.querySelectorAll('#kneov .kpkb .krv, #kneov .kne-cap small, #kneov .kne-cap b')].filter(e=>e.scrollWidth>e.clientWidth+1).length,offscreen:[...document.querySelectorAll('#kneov .kne *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.bottom>innerHeight+1||r.left<-1)}).length}));
  R[v]={a,a2,n,ov,errs};console.log(v,JSON.stringify(R[v]));await c.close()}
 await b.close()})();
