// Outside route UI tour: node dev/test/outside/tour.js <outdir> [w h dpr]... (default: 686x880@2.2 and 1180x820@2)
// New life -> "Ở nhà chờ tuyển tú" (origin tt) -> screenshots of every tab, then plays 8 weeks by clicking cards / options;
// reports page errors, horizontal overflow, truncated card titles.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../../..');const GAME='http://game.local/zz-test.html';
const MT={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css',svg:'image/svg+xml'};
async function serve(c){await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})})}
const OUT=process.argv[2]||'.';const sizes=[];for(let i=3;i+2<process.argv.length;i+=3)sizes.push(process.argv.slice(i,i+3).map(Number));if(!sizes.length)sizes.push([686,880,2.2],[1180,820,2]);
(async()=>{const b=await chromium.launch();const rep=[];
 for(const [W,H,D] of sizes){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block'});await serve(c);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1500);
  await p.evaluate(()=>{S.origin=ORIGINS.find(o=>o.k==='tt');try{nlCard()}catch(e){}});await p.waitForTimeout(500);
  const btn=await p.$('button[data-kcp="nha"]');if(btn){await btn.click();await p.waitForTimeout(400)}
  const shot=async n=>{await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${W}-${n}.png`,timeout:30000}).catch(()=>{});try{await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}})}catch(e){}};
  await shot('0-card');
  await p.evaluate(()=>nlAccept());await p.waitForTimeout(600);await shot('1-open');
  await p.evaluate(()=>{while(Q.length)closeModal();render()});await p.waitForTimeout(800);await shot('2-home');
  const info={size:`${W}x${H}@${D}`,isKc:await p.evaluate(()=>isKc())};
  for(const t of ['act','rv','staff','art','kid','go','story','inv']){await p.evaluate(t=>{tab=t;render();const P=document.getElementById('panel');if(P)P.scrollTop=0},t);await p.waitForTimeout(600);await shot('3-'+t);
   const bad=await p.evaluate(()=>[...document.querySelectorAll('#panel button.ka h4, #panel .kan')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent).slice(0,5));if(bad.length)(info.trunc=info.trunc||{})[t]=bad}
  // play 8 weeks: random enabled card, else next buổi; options: first enabled
  const hist=[];for(let i=0;i<220;i++){const r=await p.evaluate(()=>{try{if(S.dead)return'dead';if(document.querySelector('#kg82skip')&&document.querySelector('#kg82skip').offsetParent){document.querySelector('#kg82skip').click();return'mg'}
     if(document.querySelector('#kg82ok')&&document.querySelector('#kg82ok').offsetParent){document.querySelector('#kg82ok').click();return'mgok'}
     if(Q.length){const m=Q[0];if(m.opts&&m.opts.length){chooseM(Math.floor(Math.random()*m.opts.length));return'opt:'+m.t}closeModal();return'close:'+m.t}
     const L=deck.map((a,i)=>[a,i]).filter(([a])=>!a.done&&!a.lock&&can(cardCost(a))&&canPay(a));if(L.length&&Math.random()<.75){const [a,i]=L[Math.floor(Math.random()*L.length)];act(i);return'act:'+a.n}
     if(Math.random()<.2){const ks=Object.keys(KCPL).filter(k=>!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);render();return'go'}}
     nextBuoi();return'next'}catch(e){return'ERR '+e.message}});hist.push(r);if(r==='dead')break;if(await p.evaluate(()=>S.turn>=3))break}
  info.after=await p.evaluate(()=>({turn:S.turn,month:S.month,year:S.year,dead:S.dead,isKc:isKc(),kap:S.kap,kgt:S.kgt,fam:S.kc.fam.map(m=>m.t+' '+m.af),intel:S.kc.intel.length}));
  info.errs=errs.slice(0,8);info.ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);info.steps=hist.filter(x=>/^ERR/.test(x)).slice(0,5);
  await p.evaluate(()=>{while(Q.length&&!(Q[0].opts&&Q[0].opts.length))closeModal();tab='act';render()});await shot('4-after');rep.push(info);await c.close()}
 console.log(JSON.stringify(rep,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
