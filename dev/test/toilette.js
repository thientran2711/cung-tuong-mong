/* Điểm trang buổi sáng (review/toilette, dev/build/jtoil.js): the morning card + top-bar chip, the dress game (kitInvGrid), the makeup game
   played with real pointer moves, the effect on the Thỉnh an Thái hậu / Hoàng hậu cards by nết, skipping does not block, an old save loads.
   usage: node dev/test/toilette.js <url> <WxH@dpr> <shotdir> [oldsave.json] */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,VP,DIR,OLD]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);const out={vp:VP};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out);if(ok)break}
 await require('./lib/roulette').dismissRoulette(p);
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.sac=Math.max(S.sac,55);deal();render()});
 await p.evaluate(()=>{while(Q.length){Q.length=0}try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(800);
 /* 1. morning: the card is in Hành sự and the chip is in the top bar */
 out.card=await p.evaluate(()=>{const i=deck.findIndex(a=>a.toil);return i>=0?{i,n:deck[i].n,x:deck[i].x}:null});
 out.chip=await p.evaluate(()=>{const c=document.querySelector('#k3tt [data-k3="toil"]');return c?c.textContent:null});
 /* the Thỉnh an cards before (bare face, yesterday's clothes) */
 const cardTxt=()=>p.evaluate(()=>{const r={};const th=talkOpts({kind:'th'}).find(a=>/^Thỉnh an/.test(a.n));r.th=th?[th.x,th.risk].filter(Boolean).join(' | '):'';
  if(qOn()){const hh=talkOpts({kind:'hh',ref:rivals[0]}).find(a=>/^Thỉnh an/.test(a.n));r.hh=hh?[hh.x,hh.risk].filter(Boolean).join(' | '):''}
  r.thTrait=traitsOf({kind:'th'}).join(',');r.hhTrait=qOn()?traitsOf(rivals[0]).join(','):'';return r});
 out.before=await cardTxt();
  await p.screenshot({path:`${DIR}/toil-${tag}-0-morning.jpg`,quality:70});
 /* 2. tap the chip → the dress game */
 await p.click('#k3tt [data-k3="toil"]');await p.waitForSelector('#kg82 .toilw');await p.waitForFunction(()=>[...document.querySelectorAll('#kg82 img')].every(i=>i.complete),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(600);
 await p.screenshot({path:`${DIR}/toil-${tag}-1-dress.jpg`,quality:70});
 /* put on something from the bag if any (tap the first non-worn item) */
 out.bag=await p.evaluate(()=>document.querySelectorAll('#kg82 [data-kinvkey="toil"][data-kinvi]').length);
 await p.click('#toilok');await p.waitForTimeout(400);out.dress=await p.evaluate(()=>TOIL.st&&TOIL.st.dv);
 await p.screenshot({path:`${DIR}/toil-${tag}-2-verdict.jpg`,quality:70});
 await p.evaluate(()=>{TOIL.clock=+(new URLSearchParams(location.search).get('clock')||12)});await p.click('#toilmk');await p.waitForSelector('#kg82 .kswt');
 /* §60 colour pick: the face file's anchors from the local file (before the CDN upload), pick son đỏ thắm + phấn tử vi + mày thanh đại */
 await p.evaluate(()=>{const f=String((document.querySelector('#kg82 .kfzoom-i>img')||document.querySelector('#kg82 img.kpor')||{}).src||'').split('/').pop().split('?')[0];window.__mkf=f});
 try{const f=await p.evaluate(()=>window.__mkf);const g=await p.evaluate(f=>MK_FIT.face(f),f);if(g&&fs.existsSync(`img/mk-fit/${g}.json`))await p.evaluate(([g,j])=>{MK_FIT.g[g]=JSON.parse(j);MK_FIT.ld[g]=1;TOIL.prevUI&&TOIL.prevUI()},[g,fs.readFileSync(`img/mk-fit/${g}.json`,'utf8')])}catch(e){}
 for(const [r,k] of [['son','dotham'],['mat','tuvi'],['may','thanhdai']])await p.$eval(`#kg82 [data-kswtr="${r}"][data-kswti="${k}"]`,e=>e.click());/* DOM click: a loaded machine paints ~2 fps */
 await p.waitForFunction(()=>[...document.querySelectorAll('#kg82 img.kmkc')].every(i=>!/^data:image\/gif/.test(i.src)),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(500);
 out.palette=await p.evaluate(()=>({rows:document.querySelectorAll('#kg82 .kswt-r').length,sw:document.querySelectorAll('#kg82 .kswt-i').length,on:[...document.querySelectorAll('#kg82 .kswt-i.on')].map(e=>e.title),layer:document.querySelectorAll('#kg82 img.kmkc').length,file:window.__mkf,
  clip:[...document.querySelectorAll('#kg82 .kswt-i small')].some(e=>e.scrollWidth>e.clientWidth+1),hov:(()=>{const d=document.querySelector('#kg82');return d?d.scrollWidth>d.clientWidth+1:false})()}));
 await p.screenshot({path:`${DIR}/toil-${tag}-2b-colour.jpg`,quality:70});
 await p.$eval('#toilgo',e=>e.click());await p.waitForFunction(()=>{const i=kg82Img('chai-bg');return i.complete&&i.naturalWidth},null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
 /* 3. kẻ mày: drag along each guide */
 const geo=await p.evaluate(()=>({b:TOIL.geo.brows()}));
 for(const L of geo.b){await p.mouse.move(L[0].x,L[0].y);await p.mouse.down();for(const q of L.filter((_,i)=>i%2===0||i===L.length-1))await p.mouse.move(q.x,q.y,{steps:2});await p.mouse.up()}
 await p.waitForTimeout(300);await p.screenshot({path:`${DIR}/toil-${tag}-3-brow.jpg`,quality:70});
 if(await p.evaluate(()=>!!document.getElementById('toilnx')))await p.click('#toilnx');await p.waitForTimeout(300);
 /* đánh phấn: rest the puff on each point for ~0.6 s */
 const ch=await p.evaluate(()=>TOIL.geo.cheeks());
 for(const q of ch){await p.mouse.move(q.x,q.y);await p.mouse.down();await p.waitForTimeout(450*12);await p.mouse.up()}
 await p.waitForTimeout(200);await p.screenshot({path:`${DIR}/toil-${tag}-4-powder.jpg`,quality:70});
 if(await p.evaluate(()=>!!document.getElementById('toilnx')))await p.click('#toilnx');await p.waitForTimeout(300);
 /* chấm son: tap when the ring closes on the lip */
 for(let k=0;k<10&&await p.evaluate(()=>!!TOIL.geo.lip());k++){for(let t=0;t<400;t++){const l=await p.evaluate(()=>TOIL.geo.lip());if(!l)break;if(Math.abs(l.ring-1)<.2){await p.mouse.click(l.x,l.y);break}await p.waitForTimeout(15)}}
 await p.waitForTimeout(1300);await p.screenshot({path:`${DIR}/toil-${tag}-5-result.jpg`,quality:70});
 out.rec=await p.evaluate(()=>S.toilette);
 /* D28: the final-look reveal comes first: tap through it (skip to zoom, close) */
 /* KIT 81 (OD:L1261): the zoomed face ends with ONE kit button (.kmend); a tap on the overlay only zooms (review diemtrang-coop-look-r1: the old tap-only loop hung on #toildone) */
 for(let i=0;i<6&&await p.$('.ktrv');i++){if(await p.$('.ktrv-ov .kmend'))await p.click('.ktrv-ov .kmend').catch(()=>{});else await p.click('.ktrv-ov').catch(()=>{});await p.waitForTimeout(900)}

 await require('./lib/roulette').clearMoments(p);await p.waitForSelector('#toildone');await p.click('#toildone');await p.waitForTimeout(600);
 out.chip2=await p.evaluate(()=>{const c=document.querySelector('#k3tt [data-k3="toil"]');return c?c.textContent:null});
 out.after=await cardTxt();
 /* 4. by nết: the same look judged by a frugal and a strict Thái hậu */
 out.byTrait=await p.evaluate(()=>{const r={};const t0=S.thTrait;for(const t of ["Hiền lành","Đa nghi"]){S.thTrait=t;S.toilSeen=null;const L=leAttire(S,"",'th');r[t]=L.toil?L.toil.aff:0}
  S.toilette.makeup=false;for(const t of ["Hiền lành","Đa nghi"]){S.thTrait=t;const L=leAttire(S,"",'th');r[t+' (mặt mộc)']=L.toil?L.toil.aff:0}S.toilette.makeup=true;S.thTrait=t0;return r});
 try{const j=fs.readFileSync('img/toil-fit.json','utf8');await p.evaluate(j=>{TOIL_FIT.fit=JSON.parse(j)},j)}catch(e){}
 for(const lk of ['dep','diem']){await p.evaluate(lk=>{S.toilette.look=lk;S.toilette.makeup=true;render()},lk);await p.waitForTimeout(2500);
  await p.waitForFunction(()=>[...document.querySelectorAll('img.kmkc')].every(i=>!/^data:image\/gif/.test(i.src)),null,{timeout:120000}).catch(()=>{});
  out['face_'+lk]=await p.evaluate(()=>({kmk:document.querySelectorAll('img.kmk').length,kmkc:document.querySelectorAll('img.kmkc').length,col:S.toilette.col,where:[...new Set([...document.querySelectorAll('img.kmk')].map(e=>(e.closest('#stage')?'stage':e.closest('header')?'header':e.closest('.kmini')?'avatar':'other')))]}));
  await p.screenshot({path:`${DIR}/toil-${tag}-6-face-${lk}.jpg`,quality:70})}
 await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab=inv]')||document.querySelector('[data-tab=inv]');if(b)b.click()});await p.waitForTimeout(1500);await p.screenshot({path:`${DIR}/toil-${tag}-7-tutrang.jpg`,quality:70});

 /* 4b. a reaction pops up as an event dialog with the person (owner): thỉnh an Thái hậu with a bare face before a strict Thái hậu */
 out.react=await p.evaluate(()=>{Q.length=0;S.thTrait="Đa nghi";S.toilSeen=null;S.toilette.makeup=false;S.toilette.look=null;S.buoi=0;used=0;S.suc=90;
  /* in play the card goes through act(i), whose j61 hook has her met at the audience; runOpt skips that hook, so meet her here */try{S.thO=S.thO||{};k61Know(S.thO,'',true)}catch(e){}const a=talkOpts({kind:'th'}).find(x=>/^Thỉnh an/.test(x.n));if(!a)return'no card';a.lock=false;const card=[a.x,a.risk].join(' | ');const r0=roll;roll=()=>true;try{runOpt(a)}finally{roll=r0}return{card}});
 await p.waitForTimeout(400);out.react.q=await p.evaluate(()=>Q.map(x=>x.toilEv||x.t));await p.evaluate(()=>{try{while(Q.length&&!Q[0].toilEv)Q.shift();showModal()}catch(e){}});await p.waitForTimeout(2500);
 await p.screenshot({path:`${DIR}/toil-${tag}-8-react.jpg`,quality:70});await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;S.toilette.makeup=true;render()});
 /* 5. skipping does not block: next buổi with no toilette */
 out.skip=await p.evaluate(()=>{S.toilette=null;const b=S.buoi;try{nextBuoi()}catch(e){return 'err '+e.message}return {from:b,to:S.buoi,q:Q.length}});
 /* 6. old save loads */
 if(OLD){const txt=fs.readFileSync(OLD,'utf8');out.old=await p.evaluate(t=>{try{quiet=true;deser(JSON.parse(t));quiet=false;Q.length=0;S.buoi=0;used=0;deal();render();return{ok:!!S,turn:S.turn,chip:typeof toilChip==="function"?toilChip():null,card:deck.some(a=>a.toil),look:toilLookOfP(S)}}catch(e){return 'err '+e.message}},txt)}
 out.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
