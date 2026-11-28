/* NPC-PURPOSE G1 part 4 — life events (j68) and favours (j72) come from a person with a need / goal (kinds jagwhy1 npcFavor, ladyJob, q72Collect; BAL.ag.why.{e68,fav,job,q72}).
   1 no consort has a need → q72Npc: no NPC favour · 2 one consort short of silver with a friend → she asks that friend to lend silver (named)
   3 Thái hậu errand goes to the consort she regards most (th ≥ job.th); nobody regarded → no errand
   4 nothing owed → q72Collect null · 5 rv6 never picks a zero-score consort; the best tie wins when alone in the top
   6 hairpin thief: the culprit is the greedy / disloyal servant; all loyal, none greedy → no theft event
   (j68h SOC gossip target: converted, but the live gossip deed is jtwoway TW.gossip — G3 row jtwoway:72) · 8 j68 tick: no second j68 event inside BAL.ag.why.e68.gap tuần · 9 bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1d.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|q72|e68/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(true).filter(v=>!v.queen);o.n=L.length;const F=BAL.ag.why.fav;
  const calm=()=>{for(const v of rivals){v.bac=500;v.ill=0;v.q72job=null;v.th=50;v.oan=0;v.ghen=0;v.rel=0;v.ro={};v.rl={};v.preg=0;v.affair=0;v.tai=50;v.sung=50;v.confined=0;for(const s of (v.staff||[]))s.loyal=80}S.thDead=0;delete S.npw};
  calm();const q=q72();q.np=[];q72Npc();o.np1=q.np.length;o.w1=q.np.every(x=>!/nhờ .* (mượn|chép|thêu|dò|nói đỡ|giữ|mời|dạy|đưa|che)/.test(x.t)||/Thái hậu|Hoàng hậu/.test(x.t));
  calm();for(const v of rivals)v.th=0;const a=L[0],f=L[1];a.bac=0;a.ro={};a.ro[f.id]=0;try{relAdd(a,f,40)}catch(e){}o.af=aff(a,f);q.np=[];q72Npc();o.np2=q.np.map(x=>x.t);
  o.w2=q.np.some(x=>x.t.indexOf(a.name+" nhờ "+f.name+" mượn bạc")===0)&&q.np.filter(x=>/ nhờ /.test(x.t)&&!/Thái hậu|Hoàng hậu/.test(x.t)).every(x=>x.t.indexOf(a.name)===0);
  calm();for(const v of rivals)v.th=0;const t=L[2]||L[0];t.th=netTh("th","than")+30;let hit=0,bad=0;for(let i=0;i<10;i++){delete S.npw;const x=npcWhy("ladyJob",{L:liveRivals(true).filter(v=>!v.confined)});if(x&&x.who===NPW1_TH){if(x.tgt===t)hit++;else bad++}}o.w3a=hit>0&&bad===0;
  calm();for(const v of rivals)v.th=0;let any=0;for(let i=0;i<10;i++){delete S.npw;const x=npcWhy("ladyJob",{L:liveRivals(true)});if(x&&x.who===NPW1_TH)any++}o.w3b=any===0;
  calm();q.d={};o.w4=q72Collect()===null;
  calm();const z=L[0];let zbad=0;for(let i=0;i<30;i++){const id=rv6(null,v=>v===z?10:0);if(id!==z.id)zbad++}o.w5=zbad===0;
  calm();const ST=S.staff||[];o.ns=ST.length;if(ST.length>=3){const s=E68I.hairpinThief;for(const x of ST){x.loyal=80;if(x.net)x.net=x.net}const gq=ST[1];const net0=netIs;netIs=(s,k)=>k==="greed"?s===gq:net0(s,k);
   let gb=0;for(let i=0;i<20;i++){const pp=s.pp();if(!pp||[pp.a0,pp.a1,pp.a2][pp.g]!==gq.sid)gb++}netIs=(s,k)=>k==="greed"?false:net0(s,k);const pn=s.pp();netIs=net0;o.w6=gb===0&&!pn}else o.w6=true;
  calm();const e=e68();/* the first tick may find no fitting event (no candidate / e68Make null): tick until one fires (bounded), then the gap must hold */let n1=0,tries=0;for(;tries<20&&!n1;tries++){e.nx=0;Q.length=0;e68Tick();n1=Q.length}const g=e.nx-wk();Q.length=0;e68Tick();const n2=Q.length;Q.length=0;o.e=[n1,n2,g,tries];o.w8=n1>0&&n2===0&&g===BAL.ag.why.e68.gap;
  return o});
 ok(r.n>=3,'setup',r.n);ok(r.w1,'1 no need → no NPC favour',r.np1);ok(r.w2,'2 short of silver → asks her friend to lend',{aff:r.af,np:r.np2});ok(r.w3a,'3a Thái hậu errand → the consort she regards');ok(r.w3b,'3b nobody regarded → no errand');
 ok(r.w4,'4 nothing owed → no collector');ok(r.w5,'5 rv6 picks only goal-valid consorts');ok(r.w6,'6 thief = greedy servant; none → no theft');ok(r.w8,'8 j68 gap holds',r.e);
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat={};for(const k of ["npcFavor","ladyJob","q72Collect"])o.stat[k]=NPW.stat[k];return o});
 ok(!bot.e.length,'9 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'9 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1d: '+f:'PASS npc-purpose-g1d ('+res.length+' checks)');process.exit(f?1:0)})();
