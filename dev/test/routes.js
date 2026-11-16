// Lối riêng (jroute) UI test: node dev/test/routes.js <outdir> [w h dpr]...  (default 686x880@2.2 and 1180x820@2; run with 755 1000 2 1180 820 2; reducedMotion)
// Needs zz-test.html at the repo root (dev/index.html + <meta charset> wrapper; not committed).
// Shots: route entry (Hành sự · Lối riêng), a step card list (escape mid-prep), the blood-test dialog, the Mệnh truyện section, an ending card.
// Prints page errors, horizontal overflow, cut card text per shot.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GAME='http://game.local/'+(process.env.GF||'zz-test.html');
const MT={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css',svg:'image/svg+xml'};
async function serve(c){await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})})}
const OUT=process.argv[2]||'.';const sizes=[];for(let i=3;i+2<process.argv.length;i+=3)sizes.push(process.argv.slice(i,i+3).map(Number));if(!sizes.length)sizes.push([686,880,2.2],[1180,820,2]);
(async()=>{const b=await chromium.launch();const rep=[];
 for(const [W,H,D] of sizes){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block',reducedMotion:'reduce'});await serve(c);const p=await c.newPage();const errs=[];p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message));
  await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});
  /* current main (16/11): same start as dev/test/ts-a.js — drop the loading screen, start a consort life (not a servant life), remove the
     Luân hồi roulette + identity card */
  await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
  for(let i=0;i<60;i++){await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;try{store.set(NL_KEY,null)}catch(e){}start()})}
  await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
  const clear=async()=>{for(let i=0;i<3;i++){await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kmrt,.kmroul').forEach(e=>e.remove());try{NLP=null}catch(e){}for(let k=0;k<40&&Q.length;k++)closeModal();Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});await p.waitForTimeout(400)}};
  await clear();
  const check=async n=>{const r=await p.evaluate(()=>{const cut=[...document.querySelectorAll('#panel button.ka:not([hidden]) .kan, #modal button .kan, #modal .kr .krv')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.slice(0,40));
    return{ovf:document.documentElement.scrollWidth>innerWidth+1,cut}});rep.push({W,n,...r})};
  const shot=async n=>{await p.waitForTimeout(700);await p.evaluate(()=>{const b=document.querySelector('#kroul .krskip');if(b)b.click()});await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${W}-${n}.png`,timeout:30000}).catch(()=>{});await check(n);try{await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}})}catch(e){}};
  const goTab=async t=>{for(let i=0;i<3;i++){const ok=await p.evaluate(t=>{const P=document.getElementById('panel');const r=P&&P.getBoundingClientRect();return !!(P&&P.dataset.tab===t&&r.height>200&&r.width>100&&getComputedStyle(P).visibility!=='hidden'&&P.offsetParent)},t);if(ok&&i)break;await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click();else{tab=t;render()}},t);await p.waitForTimeout(1000)}};
  const cat=async()=>{await p.evaluate(()=>{const b=[...document.querySelectorAll('.kcattabs [data-kcat]')].find(x=>/Lối riêng/.test(x.textContent));if(b){b.click();setTimeout(()=>{const c=document.querySelector('.kcattabs [data-kcat="loi-rieng"]');if(c)c.scrollIntoView({inline:"center",block:"nearest"})},100)}});await p.waitForTimeout(600)};
  /* 1. entry: a year without child, low favour, a guard she met */
  await p.evaluate(()=>{S.turn=14;S.sung=12;S.duc=40;menInit();const m=S.men[0];m.seen='x';m.tinh=20;S.maid&&(S.maid.loyal=75);deal();for(let k=0;k<30&&Q.length;k++)closeModal();render()});await clear();
  await goTab('act');await cat();await shot('1-entry');
  /* 2. step cards: lover chosen and met, escape planned with some steps done */
  await p.evaluate(()=>{const m=S.men[0];S.rt.tt={mid:m.id,st:3,meet:2,tok:1,since:S.turn};m.tinh=70;S.rt.tc={prep:{guard:1,route:1},since:S.turn};S.rt.heat=28;S.buoi=3;S.menW=S.menW||{};S.menW[m.id]='vuon';rtRefresh();render()});
  await goTab('act');await cat();await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel button.ka')].find(x=>/Đêm riêng/.test(x.textContent));if(b)b.scrollIntoView({block:'center'})});await shot('2-steps');
  /* 3. Mệnh truyện section */
  await goTab('story');await p.evaluate(()=>{const h=[...document.querySelectorAll('#panel h3')].find(x=>/Lối riêng/.test(x.textContent));if(h)h.scrollIntoView({block:'start'})});await shot('3-story');
  /* 4. blood test (trích huyết nghiệm thân) */
  await p.evaluate(()=>{const k=mkKid('m',4);k.tf=S.men[0].id;S.kids.push(k);const v=liveRivals(true).find(x=>!x.queen)||liveRivals(true)[0];try{k61Know(v,'',true,2);k61Know(k,'',true,2)}catch(e){}S.rt.tt=null;rtNgSet(k,v.id,true);S.rt.ng.saw=1;S.rt.ng.at=wk();S.rt.ng.held=1;rtPush('rtNg',{})});await p.waitForTimeout(2500);await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].filter(x=>x.children.length===0&&/Chạm để (đóng|lui)/.test(x.textContent)&&x.offsetParent);if(e.length)e[e.length-1].click()});await p.waitForTimeout(1500);await shot('4-nghiem');
  await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)Q.shift();showModal();S.rt.ng=null});
  /* 4b. the tampering mini-game + the bowl scene (shared j82 frame) */
  await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)Q.shift();showModal();rtNgSleight('alum',4,()=>{})});await shot('4b-mg-intro');
  await p.evaluate(()=>{const b=document.getElementById('kg82go');if(b)b.click()});await p.waitForTimeout(1600);await shot('4c-mg-play');
  await p.evaluate(()=>{try{kg82Close()}catch(e){}rtNgScene(true,'Hoàng tử',()=>{})});await p.waitForTimeout(1500);await shot('4d-bowl');
  await p.evaluate(()=>{try{kg82Close()}catch(e){}});
  /* 5. an ending: escape succeeds */
  await p.evaluate(()=>{S.rt.tc={prep:{guard:1,route:1,home:1},since:S.turn};rtFled('doan')});await p.waitForTimeout(3000);await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].filter(x=>x.children.length===0&&/Chạm để (đóng|lui)/.test(x.textContent)&&x.offsetParent);if(e.length)e[e.length-1].click()});await p.waitForTimeout(2000);await shot('5-ending');
  rep.push({W,errs:errs.slice(0,8)});await c.close()}
 console.log(JSON.stringify(rep,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
