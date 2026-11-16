/* review/title-tag (owner 11/16 13:00-13:20Z): KIT 82 title system parts. usage: node dev/test/title-tag.js <page URL> <outdir> [WxH@dpr]
   Checks: stage tags carry plate / rank / name (3 lines, plate above rank, nothing overlaps), the person pop-up left figure carries the plate above the rank,
   NO plate in lists / cards (#panel), the emperor-granted hiệu joins the rank ("Thục phi"), tap on a plate on the kit page opens the info card, 0 page errors. Shots in <outdir>. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const R={errs:[],fail:[]};
 const [wh,d]=(SZ||'755x1000@2').split('@');const [W,H]=wh.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.addInitScript(()=>{let a=0x2f6e2b1;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});/* seeded: same people every run */p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});await sleep(800);
 const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e){e.hidden=true;if(id==='dawn')e.innerHTML=''}}});
 await clean();await p.evaluate(()=>{S.rank=4;S.hieu="Thục";S.titleWorn="s5";S.dead=false;S.confined=0;S.buoi=0;S.wx={n:"trời quang",k:"dust",f:0};const k='vuon';S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
  const L=liveRivals(true).filter(v=>!v.queen);L.slice(0,2).forEach((v,i)=>{Wh[v.id]=k;S.met=S.met||{};S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}v.titleWorn=i?"s8":"s3";v.rank=Math.max(v.rank,4);v.hieu=i?"Đức":""});
  S.place="home";used=0;tab="act";goTo(k);Q.length=0});await sleep(3000);await clean();
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,20000)}))));await sleep(1500);
 R.stage=await p.evaluate(()=>[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(e=>e.offsetParent).map(g=>{const q=x=>x&&x.offsetParent?x.getBoundingClientRect():null;const a=q(g.querySelector('.kdh')),r=q(g.querySelector('.j59t')),n=q(g.querySelector('.j59n'));
  return{txt:g.innerText.replace(/\n/g,' / '),plate:!!a,order:a&&r&&n?a.bottom<=r.top+2&&r.bottom<=n.top+2:null}}));
 R.stage.forEach(s=>{if(s.plate&&s.order===false)R.fail.push('stage order '+s.txt)});if(!R.stage.some(s=>s.plate))R.fail.push('no plate on stage');if(!R.stage.some(s=>/Thục phi/.test(s.txt)))R.fail.push('no "Thục phi" on stage');
 await p.screenshot({path:`${OUT}/title-stage-${wh}.jpg`,type:'jpeg',quality:75});
 await clean();await p.evaluate(()=>{tab='rv';render();window.scrollTo(0,0)});await sleep(2500);
 R.listPlates=await p.evaluate(()=>document.querySelectorAll('#panel .kdh').length);if(R.listPlates)R.fail.push('plate in list/cards');
 for(let k=0;k<4;k++){await clean();await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.queen);const v=L[0];window.__dpName=v.name;v.titleWorn="s8";S.met[v.id]=1;Q.push({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} đến thăm.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}}]});showModal()});
  const ok=await p.waitForFunction(()=>{const m=document.getElementById('modal');return m&&!m.hidden&&[...m.querySelectorAll('.kdpcap,.kesf>.kpsn')].some(c=>c.innerText.includes(window.__dpName))},null,{timeout:15000}).then(()=>true).catch(()=>false);if(ok)break}
 await sleep(2500);
 R.dp=await p.evaluate(()=>{const c=[...document.querySelectorAll('#modal .kdpcap, #modal .kesf>.kpsn')].find(c=>c.innerText.includes(window.__dpName));if(!c)return null;const a=c.querySelector('.kdh'),r=c.querySelector('.kti, .knr-r');return{txt:c.innerText.replace(/\n/g,' / '),plate:!!a,order:a&&r?a.getBoundingClientRect().bottom<=r.getBoundingClientRect().top+2:null}});
 if(!R.dp||!R.dp.plate||R.dp.order===false)R.fail.push('dp plate '+JSON.stringify(R.dp));await p.screenshot({path:`${OUT}/title-dp-${wh}.jpg`,type:'jpeg',quality:75});
 await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await sleep(6000);
 R.kit=await p.evaluate(()=>{const e=document.querySelector('[data-kit="§82"]');if(!e)return'no §82';e.scrollIntoView({block:'start'});return{plates:e.querySelectorAll('.kdh').length,over:e.scrollWidth>e.clientWidth+1}});await sleep(600);await p.screenshot({path:`${OUT}/title-kit-${wh}.jpg`,type:'jpeg',quality:75});
 await p.evaluate(()=>{const x=document.querySelector('[data-kit="§82"] .kdh[data-kdh]');x&&x.click()});await sleep(1500);R.card=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText.slice(0,160).replace(/\n/g,' | '):'no card'});if(R.card==='no card')R.fail.push('no info card');
 await p.screenshot({path:`${OUT}/title-card-${wh}.jpg`,type:'jpeg',quality:75});
 console.log(JSON.stringify(R,null,1));await b.close();process.exit(R.errs.length||R.fail.length?1:0)})();
