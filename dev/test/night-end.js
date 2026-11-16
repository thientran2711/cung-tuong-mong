/* review/night-end (KIT §62): lonely night + dawn beats in the week panel, the night card after her bedding night; overflow + errors.
   usage: node dev/test/night-end.js <url> <outdir> 755x1000,1000x755,1180x820,1366x1024,844x390 */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VPS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const SHOT=async(p,o)=>{for(let i=0;i<3;i++){try{await p.screenshot(Object.assign({timeout:150000},o));return}catch(e){console.error('shot retry',o.path)}}};
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
 document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
(async()=>{const b=await chromium.launch(Object.assign({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']},process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{}));
 const vps=(VPS||'755x1000').split(',');const R={};
 for(const v of vps){const [W,H]=v.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,ignoreHTTPSErrors:true,serviceWorkers:'block'});const p=await c.newPage();
  /* the CDN tunnel is slow/flaky in this sandbox: serve pictures we have on disk (img/…) locally, the rest goes to the network */
  await p.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\//,async r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.slice(1));
   if(fs.existsSync(f)){const ext=f.split('.').pop();return r.fulfill({path:f,headers:{'access-control-allow-origin':'*','content-type':{webp:'image/webp',webm:'video/webm',mp4:'video/mp4',json:'application/json'}[ext]||'application/octet-stream'}})}return r.continue()});const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
  for(let i=0;i<30;i++){await sleep(700);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
  for(let i=0;i<20;i++){await sleep(400);const k=await p.evaluate(()=>{const o=document.querySelector('.kmov');if(o){o.click();return 1}return (window.KMQ&&KMQ.length)?1:0});if(!k)break}
  await sleep(800);await p.evaluate(()=>{if(typeof kmReset==='function')kmReset();Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#dawn,#kload').forEach(e=>e.remove());document.querySelectorAll('.kmov').forEach(e=>e.remove());render()});
  /* A: a week without her night -> end the tuần */
  const a=await p.evaluate(()=>{BAL.nightEnd.lonelyMs=60000;window.__kneTr=[];const T0=performance.now();const tr=()=>{const d=document.getElementById('dawn');window.__kneTr.push(Math.round(performance.now()-T0)+':'+(d?d.className:'-')+':'+((d&&d.querySelector('.kne-b.on'))||{dataset:{}}).dataset.i);if(performance.now()-T0<20000)setTimeout(tr,500)};tr();Q.length=0;document.getElementById('modal').hidden=true;S.tonight=null;S.ntk=null;S.nightLog=[];endTurn();return {dawnCls:document.getElementById('dawn')&&document.getElementById('dawn').className,last:window.kneLastDay,q:Q.map(x=>x.t)}});
  await p.waitForFunction(()=>document.querySelector('#dawn .kne-b.on[data-i="0"]'),null,{timeout:60000}).catch(()=>{});await sleep(500);await SHOT(p,{path:`${OUT}/a-lonely-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>{document.querySelectorAll('#dawn .kne-b').forEach(e=>e.classList.toggle('on',e.dataset.i==='1'))});await sleep(1500);await SHOT(p,{path:`${OUT}/b-dawn-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>document.getElementById('dawn').click());await p.waitForFunction(()=>document.querySelector('#dawn > .kmend'),null,{timeout:20000}).catch(()=>{});await p.evaluate(()=>{const b=document.querySelector('#dawn > .kmend');if(b)b.click()});await p.waitForFunction(()=>document.querySelector('#dawn.kbkdawn'),null,{timeout:60000}).catch(()=>{});await sleep(1500);const a2=await p.evaluate(()=>({tr:window.__kneTr,dc:window.__kneDC||[],cls:document.getElementById('dawn').className,box:!!document.querySelector('#dawn .dbox'),kmov:[...document.querySelectorAll('.kmov')].map(e=>e.className)}));
  await SHOT(p,{path:`${OUT}/c-week-${v}.jpg`,type:'jpeg',quality:60});
  /* close everything, then a night */
  await p.evaluate(()=>{const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}if(typeof kmReset==='function')kmReset();document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
  await sleep(500);
  const n=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));S.ntk=null;S.ntTry=null;S.preg=0;S.bac=Math.max(S.bac||0,300);S.suc=Math.max(S.suc||0,60);S.tonight="me";pushDil(mkP("ksp"),"Kính sự phòng báo tin");showModal();const seen=[];
   for(let i=0;i<8;i++){await W(300);const m=Q[0];if(!m)break;seen.push(m.pid||m.t);if(document.getElementById('modal').hidden)showModal();chooseM(0);}
   await W(400);return {seen,last:window.kneLast,ov:[...document.querySelectorAll('.kmov')].map(e=>e.className),toast:document.getElementById('rtoast')&&document.getElementById('rtoast').className+' | '+document.getElementById('rtoast').textContent.slice(0,200)}});
  await sleep(1500);await SHOT(p,{path:`${OUT}/d-night-${v}.jpg`,type:'jpeg',quality:60});
  const ov=await p.evaluate(()=>({beat:(()=>{return null})(),sw:document.documentElement.scrollWidth>innerWidth+1,ovr:(()=>{const e=document.querySelector('#kneov .kne');if(!e)return null;const r=e.getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round)})(),cut:[...document.querySelectorAll('#kneov .kpkb .krv, #kneov .kne-cap small, #kneov .kne-cap b')].filter(e=>e.scrollWidth>e.clientWidth+1).length,offscreen:[...document.querySelectorAll('#kneov .kne *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.bottom>innerHeight+1||r.left<-1)}).length}));
  /* r2 checks: painted only, button on screen, picture loaded, no celebration on her night, cold card, night2 tone picture */
  const r2=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const q=s=>[...document.querySelectorAll(s)];
   const take=document.querySelector('#kneov .kne-take');const tr=take&&take.getBoundingClientRect();
   const code=q('#kneov .kne-pic *, #dawn .kne-pic *').filter(e=>{const cs=getComputedStyle(e);return /gradient/.test(cs.backgroundImage)||(cs.borderRadius==='50%'&&e.tagName==='I')}).length;
   const sp=q('#kneov .kne-sp');const res={takeOn:!!tr&&tr.bottom<=innerHeight&&tr.top>=0,code,spr:sp.length,sprPainted:sp.every(e=>/img\/fx\//.test(e.style.backgroundImage)),
    lights:q('#kneov .kne-lb').length,imgLoaded:!!document.querySelector('#kneov .kne-img.ld'),fxlog:(window.KFX&&KFX.log||[]).slice(-12)};
   document.querySelectorAll('.kmov').forEach(e=>e.remove());window.KMQ&&(KMQ.length=0);
   kitNightEnd({tier:'cold',m0:1,m1:2,before:rsnap(),items:[],line:'Ngọn nến lụi dần, trăng lạnh soi qua song cửa.'});await W(1800);
   res.cold={spr:q('#kneov .kne-sp').length,lights:q('#kneov .kne-lb').map(e=>e.firstChild&&e.firstChild.className).join(',')};
   document.querySelectorAll('.kmov').forEach(e=>e.remove());
   res.night2=[7,4,1].map(s=>{const b=kitEvBanner({pid:'night2',pp:{s}});return b&&b.src.replace(/^.*img\//,'')});
   res.dark=q('.modal.night .dlg').length;return res});
  await sleep(300);
  /* the night dialog itself (pillow talk, warm): light paper panel + warm picture */
  const nd=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;S.tonight='me';pushFront(mkP('night2',{s:7,ex:''}),'Đêm thị tẩm');showModal();await W(1500);
   const d=document.querySelector('#modal .dlg');const cs=d&&getComputedStyle(d);const im=[...document.querySelectorAll('#modal img')].map(i=>i.src.replace(/^.*img\//,'')).filter(s=>/ev-/.test(s));
   return {cls:document.getElementById('modal').className,bg:cs&&cs.backgroundColor,img:im}});
  await sleep(1200);await SHOT(p,{path:`${OUT}/e-night2-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
  /* follow-ups: morning after (warm / cold), rằm + festival variants, lonely music line */
  const fu=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const out={};
   Q.length=0;const d0=S.danh;S.neMorn={d:wk()-1,tier:'warm'};kneMorningAfter();out.warm={t:Q[0]&&Q[0].t,danh:S.danh-d0};
   Q.length=0;const d1=S.danh;S.neMorn={d:wk()-1,tier:'cold'};kneMorningAfter();out.cold={t:Q[0]&&Q[0].t,danh:S.danh-d1,opts:Q[0]&&Q[0].opts.map(o=>o.n)};showModal();await W(1200);
   const dl=document.querySelector('#modal .dlg');out.coldBg=dl&&getComputedStyle(dl).backgroundColor;return out});
  await SHOT(p,{path:`${OUT}/f-mock-${v}.jpg`,type:'jpeg',quality:60});
  const fu2=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;const t0=S.tuan;S.tuan=1;
   kitNightEnd({tier:'warm',m0:1,m1:0,before:rsnap(),items:[],line:'Trăng rằm tròn vằng vặc, nến đỏ cháy suốt canh khuya.',pic:'ne-night-ram-warm'});await W(2600);
   const im=document.querySelector('#kneov .kne-img');const r={ram:im&&im.src.replace(/^.*img\//,''),loaded:!!(im&&im.classList.contains('ld'))};S.tuan=t0;return r});
  await SHOT(p,{path:`${OUT}/g-ram-${v}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove())});
  R[v]={a,a2,n,ov,r2,nd,fu,fu2,errs};console.log(v,JSON.stringify(R[v]));await c.close()}
 await b.close()})();
