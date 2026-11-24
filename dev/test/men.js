/* jmen UI test: old save loads, the encounter card, the stage with a man, the map with the Ngoại triều zone.
   usage: node dev/test/men.js <baseURL dir (serving _mt.html new build + _old.html build without jmen)> <W>x<H>@dpr <outdir> <tag>
   Prints per step: horizontal overflow, cut text in the card, page errors. */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const R={};const ovf=()=>p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 /* 1. an old save (build without jmen) */
 await p.goto(BASE+'/_old.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;
  for(let i=0;i<4;i++){try{nextBuoi()}catch(e){}Q.length=0}quiet=false;try{NLP=null}catch(e){}save();return Object.keys(localStorage)}).then(k=>R.oldKeys=k);
 await p.goto(BASE+'/_mt.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3500);
 R.newKeys=await p.evaluate(()=>Object.keys(localStorage));
 R.old=await p.evaluate(()=>{document.getElementById('title').hidden=true;let ok=true;try{const d=loadSlot(3);if(!d)ok='NO SAVE';if(!d)return{ok};else{SLOT=3;quiet=true;deser(d);quiet=false;deal();showModal()}}catch(e){ok='ERR '+e.message}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){ok='RENDER '+e.message}
  try{nextBuoi()}catch(e){ok='NEXT '+e.message}Q.length=0;if(m)m.hidden=true;render();return{ok,men:(S.men||[]).length,why:Object.keys(S.menWhy||{}).length,turn:S.turn}});
 console.log('STEP1',JSON.stringify(R));
 /* 2. the encounter card: a guard and a consort in the garden, afternoon */
 await p.evaluate(()=>{for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
  const m=S.men.find(x=>x.rw==="thị vệ");const v=liveRivals(false).find(x=>!x.queen&&x.alive)||liveRivals(false)[0];
  S.out=0;S.confined=0;S.buoi=1;used=0;S.place="home";S.menMet={};S.menW={[m.id]:"vuon"};S.menWhy={[m.id]:{w:"stray",k:"vuon",r:"letter",v:v.id,why:"jealous"}};S.where[v.id]="vuon";window.__tv=v.id;window.__tm=m.id;goTo("vuon")});
 await p.waitForTimeout(2500);
 await p.screenshot({path:`${OUT}/${TAG}-card.jpg`,type:'jpeg',quality:85});await p.evaluate(()=>{const o=document.querySelector('#modal .opts');if(o)o.scrollIntoView({block:'start'})});await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/${TAG}-card-opts.jpg`,type:'jpeg',quality:85});
 R.card=await p.evaluate(()=>{const M=document.getElementById('modal');const dlg=M&&M.querySelector('.dlg');const cut=[...(M?M.querySelectorAll('button, .kpb p, .kpsn, figcaption'):[])].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.slice(0,40));
  return{shown:M&&!M.hidden,title:(document.getElementById('mt')||{}).textContent,figs:M?M.querySelectorAll('.kesf img').length:0,opts:M?[...M.querySelectorAll('.opts button')].map(b=>b.innerText.replace(/\s+/g,' ').slice(0,60)):[],cut,dlgW:dlg?Math.round(dlg.getBoundingClientRect().width):0}});
 R.cardOvf=await ovf();
 /* 3. choose "Làm như không thấy" → the stage with the man (and the consort) */
 await p.evaluate(()=>{const i=Q[0]&&Q[0].opts?Q[0].opts.findIndex(o=>/không thấy/.test(o.n)):-1;if(i>=0)chooseM(i)});await p.waitForTimeout(4200);
 await p.screenshot({path:`${OUT}/${TAG}-stage.jpg`,type:'jpeg',quality:85});
 R.stage=await p.evaluate(()=>({people:(S.visit&&S.visit.people||[]).map(x=>x.kind),figs:[...document.querySelectorAll('#tokens .tok img.figimg, #stage img')].map(i=>i.getAttribute('src')).filter(s=>/fig-man|unknown-fig|fig-official/.test(s||''))}));
 R.stageOvf=await ovf();
 /* 4. the map: Ngoại triều zone */
 await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="map"]')||[...document.querySelectorAll('#tabs [data-tab]')].find(x=>/Dư đồ/.test(x.textContent));if(b)b.click()});await p.waitForTimeout(3000);
 await p.screenshot({path:`${OUT}/${TAG}-map.jpg`,type:'jpeg',quality:80});
 R.map=await p.evaluate(()=>[...document.querySelectorAll('.mspot.empty, .mspot.kmen-nt')].map(e=>e.title).filter(t=>/Ngoại triều/.test(t)));R.mapOvf=await ovf();R.kfig=await p.evaluate(()=>[KIT_FIG.fac('img/kit/unknown-fig-m.webp',30),KIT_FIG.fac('img/kit/unknown-fig-f.webp',30),KIT_FIG.fac('img/fig-man-thive-1-a26.webp',30)]);
 await p.evaluate(()=>{const b=document.querySelector('[data-mennt]');if(b)b.click()});await p.waitForTimeout(2000);
 await p.screenshot({path:`${OUT}/${TAG}-ntcard.jpg`,type:'jpeg',quality:82});
 R.nt=await p.evaluate(()=>{const M=document.getElementById('modal');return{shown:M&&!M.hidden,title:(document.getElementById('mt')||{}).textContent,opts:M?[...M.querySelectorAll('.opts button')].map(b=>b.innerText.replace(/\s+/g,' ').slice(0,70)):[]}});
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
