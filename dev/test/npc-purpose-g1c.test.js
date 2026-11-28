/* NPC-PURPOSE G1 part 3 — people who come to her door (j24) have a reason (kinds jagwhy1 apFriend…; BAL.ag.why.ap).
   1 nobody likes / hates / owes / serves her well → 60 approach draws: nobody comes
   2 one fond consort → every visitor is that consort · 3 one consort with a grudge → the taunt names her, with the reason
   4 approaches(): at most BAL.ag.why.ap.max visitors a tuần · 5 a debtor repays only when she has the silver (bac ≥ ap.repay)
   6 bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1c.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|approach/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(false);o.n=L.length;
  const cold=()=>{for(const v of rivals){v.sung=S.sung=20;v.oan=0;v.ghen=0;v.rel=0;v.ro={};v.rl={};v.confined=0;for(const s of (v.staff||[]))s.loyal=Math.max(s.loyal,BAL.loy.bad)}
   for(const m of (S.men||[])){m.tinh=0;m.likeV=null;m.seen=null}for(const m of (S.men||[])){try{netOf(m)}catch(e){}if(Array.isArray(m.net))m.net=m.net.map(t=>t==="Ham vui"?"An phận":t)}/* G1 #8: no man of a roving / fancying nết (Ham vui) in this fixture */if(S.maid)S.maid.loyal=0;S.th=0;for(const s of (S.staff||[])){s.loyal=0;s.grudge=0}S.loans=[]};
  window.__e68off=1;const AK=new Set(AP_K);const st0=npwStamp;let got=[];npwStamp=function(k,p){if(AK.has(k))got.push([k,p&&p.id!=null?p.id:p&&p.name]);return st0.apply(this,arguments)};
  const draw=n=>{const c=[];for(let i=0;i<n;i++){delete S.npw;got=[];try{approachOne()}catch(e){o.err=e.message}c.push(...got)}return c};
  cold();const c1=draw(60);o.c1=c1;o.w1=c1.length===0;
  const a=L[0];cold();a.rel=30;const c2=draw(60);o.c2=[...new Set(c2.map(x=>x.join(':')))];o.w2=c2.length>0&&c2.every(x=>x[1]===a.id);
  const h=L[1];cold();h.oan=80;h.rel=-30;let tw=0,tb=0;for(let i=0;i<60;i++){delete S.npw;got=[];const m=approachOne();if(!got.length)continue;if(got[0][1]!==h.id||got[0][0]!=='apTaunt')tb++;else if(m&&/mỉa mai/.test(m.h)&&m.h.includes(h.name)&&/ôm hận|ghen|cái gai/.test(m.h))tw++;else tb++}npwStamp=st0;o.s3={tw,tb};o.w3=tw>0&&tb===0;
  cold();for(const v of L)v.rel=40;delete S.npw;Q.length=0;got=[];npwStamp=function(k,p){if(AK.has(k))got.push(k);return st0.apply(this,arguments)};approaches();npwStamp=st0;o.q4=got.length;o.w4=got.length<=BAL.ag.why.ap.max&&got.length>0;Q.length=0;
  cold();const d=L[2];d.rel=10;d.bac=0;S.loans=[{id:d.id,t:S.turn-2}];delete S.npw;approaches();Q.length=0;o.l0=S.loans.length;d.bac=BAL.ag.why.ap.repay+5;delete S.npw;approaches();Q.length=0;o.l1=S.loans.length;o.w5=o.l0===1&&o.l1===0;
  return o});
 ok(r.n>=3,'setup',r.n);ok(r.w1&&!r.err,'1 nobody with a reason: nobody comes',{c:r.c1,e:r.err});ok(r.w2,'2 only the fond consort visits',r.c2);ok(r.w3,'3 taunt names the one with the grudge + reason',r.s3);
 ok(r.w4,'4 at most ap.max visitors a tuần',r.q4);ok(r.w5,'5 debtor repays only with the silver',{before:r.l0,after:r.l1});
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat=NPW.stat;return o});
 ok(!bot.e.length,'6 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'6 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1c: '+f:'PASS npc-purpose-g1c ('+res.length+' checks)');process.exit(f?1:0)})();
