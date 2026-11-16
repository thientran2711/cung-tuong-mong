/* review/thaiy test (owner 15/11 20:20Z, 4 thái y ideas). Serves the repo from disk (coop-serve.js route, no http server).
   usage: python3 dev/build/assemble.py && node dev/test/thaiy.js [outdir] [sizes e.g. 755x1000x2,1000x755x1]
   Checks (logic at the first size): monthly Thỉnh bình an mạch + calendar hook, both roads of Mời thái y bắt mạch (cost, khắc, Sức),
   hidden harm found (tainted gift, j70 plot), pregnancy found from week 3 (j75 card), nausea hint, bribed physician lies + leaks,
   trusted physician does not, treat() uses the same rule, NPC rules (bribes, tainted gift found in a rival), Hỏi chuyện leaks a
   rival's mạch án, old save without S.thy loads. Then at every size: the physician card (Bắt mạch group) and the result card — no
   page errors, no horizontal overflow; screenshots to outdir. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../tmp/thaiy'));fs.mkdirSync(OUT,{recursive:true});
const SIZES=(process.argv[3]||'755x1000x2,1000x755x2,1180x820x2,1366x1024x2,844x390x2').split(',').map(s=>s.split('x').map(Number));
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
async function boot(b,W,H,D){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D||1,serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100});await serve(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:180000});await p.waitForTimeout(800);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});await p.waitForTimeout(1500);
 await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});return{ctx,p,errs}}
const clr=p=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kmov,#kmrew,.kmfx,.kmnote,#rtoast').forEach(e=>e.remove());const m=$('modal');m.hidden=true;m.className='modal';try{NLP=null}catch(e){}Q.length=0;used=0;S.visit=S.visit||{k:'home',people:[],talked:false}});
(async()=>{const b=await chromium.launch();
 /* ---------------- logic ---------------- */
 {const [W,H]=SIZES[0];const {ctx,p,errs}=await boot(b,W,H,1);await clr(p);
  let r=await p.evaluate(()=>{const v=thaiyNextVisit(),L=thaiyVisits(3);return{v,L:L.map(x=>x.month),api:typeof thyReq,cost:BAL.thy.cost.map((c,i)=>[c,BAL.pay[i]])}});
  ok(r.v&&r.v.n==='Thỉnh bình an mạch'&&r.L.length===3,'calendar hook thaiyNextVisit/thaiyVisits',r);
  ok(r.cost.every(([c,p])=>c*6<=p&&c*9>=p),'bạc road ≈ 1/6–1/9 of the month bổng at every rank',r.cost);
  /* 1. monthly routine visit */
  r=await p.evaluate(()=>{Q.length=0;S.tuan=2;const t0=S.turn;S.suc=80;S.ill=null;endTurn();const c=Q.find(m=>m.t==='Thỉnh bình an mạch');return{turn:S.turn>t0,last:S.thy&&S.thy.last===S.turn,card:!!c,h:c&&c.h,log:S.logs.some(l=>/Thỉnh bình an mạch/.test(l)),rec:S.thy.rec[0]}});
  ok(r.turn&&r.last&&r.log&&r.rec&&r.rec.k==='routine','routine visit runs at the month change, logs, writes the mạch án',r);
  ok(!r.card||/Khỏe mạnh/.test(r.h),'routine verdict Khỏe mạnh for a healthy Sức 80',r.h);
  r=await p.evaluate(()=>{Q.length=0;S.tuan=2;S.suc=60;S.ill={k:'phonghan',st:2,known:true};const im=illMonth;illMonth=()=>'';try{endTurn()}finally{illMonth=im}const c=Q.find(m=>m.t==='Thỉnh bình an mạch');return c&&c.h});
  ok(/Có bệnh/.test(r||''),'routine verdict Có bệnh with an illness (card shown)',r);
  await clr(p);
  /* 2. the two roads */
  r=await p.evaluate(()=>{S.ill=null;S.bac=100;S.suc=70;used=0;const c=thyCost();thyReq('pay');const a={bac:S.bac,used,card:Q.some(m=>m.t==='Thái y bắt mạch'),c};Q.length=0;used=0;thyReq('self');return Object.assign(a,{suc:S.suc,used2:used})});
  ok(r.bac===100-r.c&&r.used===1&&r.card,'bạc road: Bạc -cost, 1 khắc, result card',r);
  ok(r.suc===65&&r.used2===3,'own road: no bạc, Sức -5, 3 khắc',r);
  r=await p.evaluate(()=>{S.bac=0;used=0;return{w:thyWhy('pay'),w2:thyWhy('self'),deck:deck.length?1:0}});
  ok(/bạc/.test(r.w)&&!r.w2,'without bạc the bạc road is locked with a reason, her road stays open',r);
  r=await p.evaluate(()=>{deal();const A=deck.filter(a=>/bắt mạch/.test(a.n));return A.map(a=>[a.n,a.k,a.c,a.x])});
  ok(r.length===2&&r[0][1]===1&&r[1][1]===3,'Hành sự deck has both roads side by side',r);
  /* hidden harm: tainted gift + j70 plot */
  await clr(p);
  r=await p.evaluate(()=>{const v=liveRivals(true)[0];S.doctor=1;S.arts.y=5;S.bac=100;used=0;S.inv.push({k:'tuithom',t:'xa',by:v.id});
   const pl=newPlot70(v,S,'poison2','tra');if(pl){pl.pg=1;pl.st='prep'}const B=BAL.thy.find;BAL.thy.find=95;thyReq('pay');BAL.thy.find=B;
   const h=(Q.find(m=>m.t==='Thái y bắt mạch')||{}).h||'';const e=S.inv.find(e=>e.t==='xa');return{h,seen:e&&e.seen,kn:pl&&pl.kn,pend:pl&&pl.pend}});
  ok(/xạ hương/.test(r.h)&&r.seen,'requested check finds the xạ hương gift',r.h.replace(/<[^>]+>/g,' ').slice(0,300));
  ok(r.kn===1&&r.pend==='seen','requested check reveals a j70 slow-poison plot (same reveal as j70)',r);
  /* 3. pregnancy */
  await clr(p);
  r=await p.evaluate(()=>{S.inv=S.inv.filter(e=>!e.t);S.doctor=0;S.preg=1;S.pregUnk=1;S.hidden=true;S.fake=0;S.pregWk=wk()-3;S.pregDisc=wk()+9;S.bac=100;used=0;thyReq('pay');
   return{unk:S.pregUnk,found:Q.some(m=>/đã có thai/.test(m.h||''))}});
  ok(r.unk===0&&r.found,'requested check finds the pregnancy from week 3 (j75 card)',r);
  await clr(p);
  r=await p.evaluate(()=>{S.preg=1;S.pregUnk=1;S.hidden=true;S.pregWk=wk()-1;S.pregDisc=wk()+9;S.bac=100;used=0;thyReq('pay');return{unk:S.pregUnk}});
  ok(r.unk===1,'week 1: not found yet',r);
  await clr(p);
  r=await p.evaluate(()=>{S.preg=1;S.pregUnk=1;S.thy.nz=null;S.pregWk=wk()-2;S.pregDisc=wk()+9;const B=BAL.thy.nausea;BAL.thy.nausea=100;Q.length=0;S.tuan=0;endTurn();BAL.thy.nausea=B;
   const c=Q.find(m=>m.t==='Trong người khác lạ');return{c:!!c,o:c&&c.opts.map(o=>o.n)}});
  ok(r.c&&r.o.length===3,'nausea hint card with both roads (week 2, before it is found)',r);
  await clr(p);
  /* 4. bribed physician lies and leaks; trusted does not */
  r=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.coop);const c=S.court.ty;c.af.me=0;c.af[v.id]=80;v.ghen=100;try{oanAdd(v,S,60)}catch(e){}S.doctor=0;
   const by=thyBribedBy(S);const L=BAL.thy.lie,K=BAL.thy.leak;BAL.thy.lie=0;BAL.thy.leak=100;S.preg=1;S.pregUnk=1;S.hidden=true;S.pregWk=wk()-4;S.bac=100;used=0;thyReq('pay');
   const leaked=!S.hidden;Q.length=0;BAL.thy.lie=100;S.preg=1;S.pregUnk=1;S.hidden=true;S.pregWk=wk()-4;S.pregDisc=wk()+9;used=0;thyReq('pay');const lied=S.pregUnk===1;
   BAL.thy.lie=L;BAL.thy.leak=K;Q.length=0;S.doctor=1;const tr=thyBribedBy(S);S.doctor=0;c.af.me=95;const tr2=thyBribedBy(S);c.af.me=0;return{by:by&&by.id,leaked,lied,tr:!!tr,tr2:!!tr2}});
  ok(r.by!=null,'a hostile rival with a big bribe holds the physician',r);
  ok(r.leaked,'bribed physician leaks a hidden pregnancy to the briber',r);
  ok(r.lied,'bribed physician may lie: no hỉ mạch said, pregnancy not found',r);
  ok(!r.tr&&!r.tr2,'trusted physician (own man S.doctor / thiện cảm ≥ 40 above the bribe) is never the briber\'s',r);
  /* NPCs */
  await clr(p);
  r=await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.coop);const v=L[0],g=L[1];const c=S.court.ty;for(const k in c.af)if(k!=='me')c.af[k]=0;
   v.inv.push({k:'tuithom',t:'xa',by:g.id});const ev0=(v.evm&&v.evm[key(g)])||0;const B=BAL.thy.npcFind;BAL.thy.npcFind=100;thyNpcMonth();BAL.thy.npcFind=B;
   const gone=!v.inv.some(e=>e.t==='xa'&&e.by===g.id);const ev1=(v.evm&&v.evm[key(g)])||0;
   g.bac=500;g.ghen=100;try{oanAdd(g,S,60)}catch(e){}S.sung=80;const nb=BAL.thy.npcBribe;BAL.thy.npcBribe=100;thyNpcMonth();BAL.thy.npcBribe=nb;return{gone,ev:ev1>ev0||ev1>0,af:c.af[g.id],bac:g.bac}});
  ok(r.gone,'NPC: the monthly visit finds a tainted gift in a rival and takes it away',r);
  ok(r.af>0&&r.bac<500,'NPC: a hostile rival pays bạc to bribe the physician',r);
  r=await p.evaluate(()=>{const c=S.court.ty;c.af.me=90;const v=liveRivals(true).find(x=>!x.coop);v.preg=2;v.hidden=true;used=0;S.notes={};const B=BAL.thy.askBase;BAL.thy.askBase=100;courtAct('hoi','ty');BAL.thy.askBase=B;
   return{note:JSON.stringify(S.notes||{})}});
  ok(/thái y kể/.test(r.note),'Hỏi chuyện: a physician who likes her tells a rival\'s mạch án (hidden pregnancy / illness)',r);
  r=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.coop);const c=S.court.ty;c.af.me=0;c.af[v.id]=80;v.ghen=100;S.ill={k:'phonghan',st:1,known:true};S.doctor=1;const a=thyBribedBy(S);S.doctor=0;const b2=thyBribedBy(S);c.af[v.id]=0;S.ill=null;return{a:!!a,b:!!b2}});
  ok(!r.a&&r.b,'treat() rule: same bribed / trusted function',r);
  /* old save */
  r=await p.evaluate(()=>{const o=JSON.parse(JSON.stringify(ser()));delete o.thy;if(o.S)delete o.S.thy;deser(o);let e='';try{thaiyNextVisit();thyReq('pay');S.tuan=2;Q.length=0;endTurn()}catch(x){e=x.message}return{e,thy:!!S.thy}});
  ok(!r.e&&r.thy,'old save without S.thy loads and plays',r);
  ok(!errs.length,'no page errors (logic)',errs);await ctx.close()}
 /* ---------------- views ---------------- */
 for(const [W,H,D] of SIZES){const {ctx,p,errs}=await boot(b,W,H,D);await clr(p);const tag=`${W}x${H}`;
  /* the physician card in Hậu cung › Cung nhân */
  const r=await p.evaluate(()=>{S.bac=100;try{k61Know(S.court.ty,'',true,3)}catch(e){}tab='staff';const L=[];L.push(1);S.staff.forEach(()=>L.push(1));const i=L.length+Object.keys(S.court).indexOf('ty');PG.staff=i;render();
   const pc=[...document.querySelectorAll('#panel .pct')].find(x=>/Bắt mạch/.test(x.textContent));if(pc)pc.click();
   const t=document.getElementById('panel').innerText;return{has:/Mời thái y bắt mạch/.test(t)&&/Sang Thái y viện/.test(t),line:/Thỉnh bình an mạch/i.test(t)}});
  ok(r.has&&r.line,`${tag}: physician card shows the Bắt mạch group + next visit`,r);
  await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/card-${tag}.png`,timeout:120000});
  let ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${tag}: no horizontal overflow (card)`);
  /* the result card through the button */
  await p.evaluate(()=>{used=0;const b=[...document.querySelectorAll('#panel button[data-cv="bm"]')][0];if(b)b.click();else courtAct('bm','ty')});await p.waitForTimeout(900);
  const m=await p.evaluate(()=>{const M=$('modal');return{open:!M.hidden,t:M.innerText.slice(0,300)}});
  ok(m.open&&/Lời thái y/.test(m.t),`${tag}: result card opens`,m.t.replace(/\s+/g,' ').slice(0,160));
  await p.screenshot({path:`${OUT}/res-${tag}.png`,timeout:120000});
  ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${tag}: no horizontal overflow (result)`);
  ok(!errs.length,`${tag}: no page errors`,errs);await ctx.close()}
 await b.close();const f=res.filter(x=>!x[0]);console.log(`\n${res.length-f.length}/${res.length} ok`);process.exit(f.length?1:0)})();
