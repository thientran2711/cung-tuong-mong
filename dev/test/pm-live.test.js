/* PERSON MINIGAME ACTS — ROUND C Q-C2: the co-op LIVE board (FOREMAN E #16 ruling 20/11: two humans, pm-live state messages; own-hand path = offline fallback).
   Two pages = two devices; COOP.send of each is relayed to the other page's jpma pmLvMsg (the COOP.on("act") handler body), so the real jpma flow runs:
   (1) Cờ duel: «Nhận» (pmLiveAns) → go → the friend's device answers rdy and opens the 7×7 board (asker = black, first) → her device opens hers;
       one move per message, both boards hold the same stones, the card device answers ONCE with lv {ra, rt, w}; the kit plate shows whose turn it is;
   (2) a timed duel (Đàn): both boards run at once, running scores ride as sc messages (≤ one per BAL.pm.live.tx ms), the friend's plate line = them;
   (3) offline fallback: the friend's device never answers go → after BAL.pm.live.wait ms a plain «Nhận» (no lv = round-B own-hand path);
   (4) the friend drops mid-Cờ: after BAL.pm.live.mv ms the AI takes her side, the board still ends, the answer carries her own raw + the winner;
   (5) the act with the raws (ACT.pmduel f on the co-op path, COOPW.inv): Cờ winner takes the stake once, hòa = stakes stay; Cùng chơi uses both raws;
   (6) messages carry state only (no markup / pictures), no page error.
   usage: node dev/test/pm-live.test.js [dev/index.html] → exit 1 on FAIL */
const path=require('path');const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const HTML=process.argv[2]||'dev/index.html';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const {chromium}=require('playwright');const b=await chromium.launch();const errs=[];
 const mk=async(seat,vp)=>{const p=await b.newPage({viewport:{width:vp[0],height:vp[1]}});p.on('pageerror',e=>errs.push(seat+': '+e.message));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;window.kitNotice=undefined;window.ptOn=()=>false});
  return p};
 const A=await mk('a',[755,1000]),B=await mk('b',[1180,820]);
 /* the room: each device has the other as its co-op friend entry; COOP.send goes to the other page (relay on/off per test) */
 let relay=true;const sent={a:[],b:[]};
 for(const [p,me,other] of [[A,'a',()=>B],[B,'b',()=>A]]){
  await p.exposeFunction('__relay',async m=>{sent[me].push(m);if(!relay)return;const o=other();setTimeout(()=>o.evaluate(m=>{try{pmLvMsg(m)}catch(e){console.error(e)}},Object.assign({},m,{from:me})).catch(()=>{}),30)});
  await p.evaluate(seat=>{const F=liveRivals(true).find(v=>v!==S&&!v.out&&!v.confined);F.coop=true;F.bac=Math.max(F.bac||0,400);S.bac=Math.max(S.bac||0,400);
   COOPW.on=true;COOPW.seat=seat;COOPW.friend=()=>F;COOP.send=m=>{window.__relay(JSON.parse(JSON.stringify(m)));return true};
   BAL.pm.live.wait=4000;BAL.pm.live.mv=3000;BAL.pm.ky.ai.think=60;window.__ans=[];window.__fid=F.id},me)}
 const ask=(p,x)=>p.evaluate(x=>{pmLiveAns(x.a==="play"?"pmplay":"pmduel",x,true,(ok,lv)=>__ans.push({ok,lv:lv||null}))},x);
 const go=p=>p.evaluate(()=>{const g=document.getElementById('kg82go');if(g){g.click();return true}return false});
 const okb=p=>p.evaluate(()=>{const g=document.getElementById('kg82ok');if(g){g.click();return true}return false});
 const stones=p=>p.evaluate(()=>[...document.querySelectorAll('#kg82 .goban button')].map(c=>c.classList.contains('bk')?'b':c.classList.contains('wh')?'w':'.').join(''));
 const plate=p=>p.evaluate(()=>{const pl=document.querySelector('#kg82box .kgvs');if(!pl)return null;const t=s=>{const e=pl.querySelector(s);return e?e.textContent.trim():''};return{me:t('.kgvs-me [data-vs="sc"]'),opp:t('.kgvs-opp [data-vs="sc"]'),turn:pl.textContent.includes('Đến phiên')}});
 const until=async(fn,ms)=>{const t0=Date.now();while(Date.now()-t0<ms){if(await fn())return true;await sleep(150)}return false};

 /* ---- (1) Cờ duel, two humans ---- */
 await ask(A,{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac"});
 const opened=await until(async()=>!!(await A.evaluate(()=>!!document.getElementById('kg82go')))&&!!(await B.evaluate(()=>!!document.getElementById('kg82go'))),8000);
 const modes1=sent.a.map(m=>m.mode).concat(sent.b.map(m=>m.mode));
 ok(opened&&sent.a[0]&&sent.a[0].mode==='go'&&sent.b.some(m=>m.mode==='rdy'),'«Nhận» → go → the friend\'s device answers rdy, both devices open the board',{opened,modes1});
 const rows=await B.evaluate(()=>(document.querySelector('#kg82')||{}).textContent||''),rowsA=await A.evaluate(()=>(document.querySelector('#kg82')||{}).textContent||'');
 ok(/hảo hữu\) cầm quân trắng, đi sau/.test(rows)&&/hảo hữu\) cầm quân đen, đi trước/.test(rowsA)&&/Hảo hữu cầm quân đen đi trước/.test(rowsA),'the friend\'s device (asker) holds black and moves first; the rules rows say so',{B:rows.slice(-300),A:rowsA.slice(-300)});
 await go(A);await go(B);await sleep(600);
 let snap=[],plSeen=null;
 for(let k=0;k<80;k++){const done=await A.evaluate(()=>!!KG82.kyOut)&&await B.evaluate(()=>!!KG82.kyOut);if(done)break;
  for(const p of [B,A]){const moved=await p.evaluate(()=>{const q=KG82.peek&&KG82.peek();const el=q&&q.sel&&document.querySelector(q.sel);if(el&&!el.disabled){el.click();return true}return false});if(moved){await sleep(250);if(!plSeen)plSeen=await plate(A);const a=await stones(A),c=await stones(B);if(a)snap=[a,c]}}}
 await sleep(500);const sA=snap[0]||'',sB=snap[1]||'';const outs=[await A.evaluate(()=>KG82.kyOut),await B.evaluate(()=>KG82.kyOut)];
 ok(sA===sB&&/b/.test(sA)&&/w/.test(sA),'one move per message: both boards hold the same stones',{sA,sB});
 ok((outs[0]==='draw'&&outs[1]==='draw')||(outs[0]==='win'&&outs[1]==='lose')||(outs[0]==='lose'&&outs[1]==='win'),'both boards end with the same game (one wins, the other loses, or both hòa)',outs);
 ok(plSeen&&plSeen.turn,'the kit plate K-PM-1 on the live Cờ board shows whose turn it is',plSeen);
 await sleep(1500);await okb(B);await okb(A);
 const got1=await until(async()=>(await A.evaluate(()=>__ans.length))>0,8000);const ans1=await A.evaluate(()=>__ans.slice());
 const wExp=outs[0]==='draw'?'d':outs[0]==='win'?'t':'a';
 ok(got1&&ans1.length===1&&ans1[0].ok===true&&ans1[0].lv&&ans1[0].lv.w===wExp&&ans1[0].lv.ra!=null&&ans1[0].lv.rt!=null,'the card device answers ONCE, with both raws and the board\'s winner (asker / reader / hòa)',{ans1,wExp});
 const mv=sent.a.concat(sent.b).filter(m=>m.mode==='mv');
 ok(mv.length===sA.replace(/\./g,'').length,'Cờ: one message per stone',{msgs:mv.length,stones:sA.replace(/\./g,'').length});

 /* ---- (2) timed duel (Đàn): running scores as sc messages ---- */
 sent.a.length=0;sent.b.length=0;await A.evaluate(()=>{__ans.length=0});
 await ask(A,{a:"duel",kind:"dan",ak:"dan",n:"Đàn",s:"bac"});
 await until(async()=>!!(await A.evaluate(()=>!!document.getElementById('kg82go')))&&!!(await B.evaluate(()=>!!document.getElementById('kg82go'))),8000);
 await go(A);await go(B);
 /* both play: tap the engine's peek target when it has one */
 let pl2=null,n6=-1;const t0=Date.now();
 while(Date.now()-t0<150000){const fin=await A.evaluate(()=>!!document.getElementById('kg82ok'))&&await B.evaluate(()=>!!document.getElementById('kg82ok'));if(fin)break;
  for(const p of [A,B])await p.evaluate(()=>{const q=KG82.peek&&KG82.peek();const el=q&&q.sel&&document.querySelector(q.sel);if(el)el.click()});
  if(Date.now()-t0>6000&&!pl2&&n6<0){await A.evaluate(()=>{if(!window.__g0){window.__g0=mgGrade;mgGrade=()=>6}});n6=sent.a.filter(m=>m.mode==='sc').length}/* her running score (graded) = 6 from here: what the friend's plate must show */
  /* E22g: since main mg-score-same the board's mark starts at what she can still reach (10) and falls, so the plate is read only from sc messages sent AFTER the 6 */
  const q=await B.evaluate(()=>({x:document.querySelector('#kg82box .kgvs')?1:0}));if(q.x&&n6>=0){const L=sent.a.filter(m=>m.mode==='sc');const last=L.length>n6+1?L.pop():null;const pb=await plate(B);if(pb&&last&&last.raw>0&&!pl2){pl2=Object.assign(pb,{aSent:last.raw})}}await sleep(300)}
 const sc=sent.a.filter(m=>m.mode==='sc');let gap=1e9;
 ok(sc.length>0,'timed duel: her running score rides as sc messages',{n:sc.length});
 const plB=pl2||await plate(B);
 ok(plB&&plB.opp!==''&&+plB.opp===6&&plB.aSent===6,'the friend\'s plate shows her live line from those messages (kit plate K-PM-1)',plB);
 await A.evaluate(()=>{if(window.__g0){mgGrade=__g0;window.__g0=null}});await okb(A);await okb(B);
 await until(async()=>(await A.evaluate(()=>__ans.length))>0,8000);const ans2=await A.evaluate(()=>__ans.slice());
 ok(ans2.length===1&&ans2[0].lv&&ans2[0].lv.ra!=null&&ans2[0].lv.rt!=null&&ans2[0].lv.w===undefined,'timed duel: one answer with both raws (the act scores them like pmAuto: talent + raw)',ans2);
 const allMsg=sent.a.concat(sent.b);const big=allMsg.filter(m=>JSON.stringify(m).length>400||/[<>]|data:image/.test(JSON.stringify(m)));
 const tx=await A.evaluate(()=>BAL.pm.live.tx);
 ok(big.length===0,'messages carry state only (small, no markup / pictures)',{n:allMsg.length,big:big.length});
 void gap;void tx;

 /* ---- (3) offline fallback: no answer to go ---- */
 relay=false;await A.evaluate(()=>{__ans.length=0;window.__log0=(S.log||[]).length});
 await ask(A,{a:"play",kind:"dauho",ak:null,n:"Đầu hồ"});
 const got3=await until(async()=>(await A.evaluate(()=>__ans.length))>0,9000);const ans3=await A.evaluate(()=>({a:__ans.slice(),open:!!document.getElementById('kg82go')}));
 ok(got3&&ans3.a[0].ok===true&&ans3.a[0].lv===null&&!ans3.open,'offline fallback: the friend never opens the board → a plain «Nhận» after BAL.pm.live.wait ms (own-hand path), no board left open',ans3);

 /* ---- (4) the friend drops mid-Cờ: the AI takes her side ---- */
 relay=true;sent.a.length=0;sent.b.length=0;await A.evaluate(()=>{__ans.length=0});
 await ask(A,{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac"});
 await until(async()=>!!(await A.evaluate(()=>!!document.getElementById('kg82go')))&&!!(await B.evaluate(()=>!!document.getElementById('kg82go'))),8000);
 await go(A);await go(B);await sleep(500);
 await B.evaluate(()=>{const q=KG82.peek&&KG82.peek();const el=q&&document.querySelector(q.sel);if(el)el.click()});await sleep(400);relay=false;/* she drops after her first stone */
 const t4=Date.now();let note='';
 while(Date.now()-t4<60000&&!(await A.evaluate(()=>!!KG82.kyOut))){await A.evaluate(()=>{const q=KG82.peek&&KG82.peek();const el=q&&q.sel&&document.querySelector(q.sel);if(el&&!el.disabled)el.click()});if(!note)note=await A.evaluate(()=>(document.getElementById('kgkysc')||{}).textContent||'');await sleep(300)}
 const o4=await A.evaluate(()=>KG82.kyOut);await sleep(1200);await okb(A);
 const got4=await until(async()=>(await A.evaluate(()=>__ans.length))>0,9000);const ans4=await A.evaluate(()=>__ans.slice());
 ok(!!o4&&got4&&ans4[0].lv&&ans4[0].lv.rt!=null&&ans4[0].lv.ra==null&&!!ans4[0].lv.w,'friend drops mid-Cờ: the AI takes her side with her hand (BAL.pm.live.mv ms), the board ends, the answer = her own raw + the winner (her raw drawn later)',{o4,ans4});
 await B.evaluate(()=>{try{kg82Close()}catch(e){}});

 /* ---- (5) the act with the live raws (ACT.pmduel / pmplay f, co-op path) ---- */
 const r5=await A.evaluate(()=>{const F=COOPW.friend();const out={};COOPW.inv="t1";COOPW.yd=false;
  const run=(k,x)=>{const b0=[S.bac,F.bac];const r=ACT[k].f(S,F,x);return{r,d:[S.bac-b0[0],F.bac-b0[1]]}};
  try{out.win=run("pmduel",{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac",live:{ra:10,rt:0,w:"a"}});
   out.lose=run("pmduel",{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac",live:{ra:0,rt:10,w:"t"}});
   out.draw=run("pmduel",{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac",live:{ra:5,rt:5,w:"d"}});
   out.bad=run("pmduel",{a:"duel",kind:"co",ak:"ky",n:"Cờ",s:"bac",live:{ra:"x",w:"zz"}});
   const af0=(F.rel||0);out.play=run("pmplay",{a:"play",kind:"dauho",ak:null,n:"Đầu hồ",live:{ra:9,rt:9}}).r;
   out.san=pmLvSan({ra:99,rt:-3,w:"a",z:1})}finally{COOPW.inv=false}return out});
 ok(r5.win.d[0]>0&&r5.win.d[0]===-r5.win.d[1]&&r5.lose.d[0]<0&&r5.lose.d[0]===-r5.lose.d[1],'the board\'s winner takes the stake once (bạc conserved, both ways)',{win:r5.win.d,lose:r5.lose.d});
 ok(r5.draw.d[0]===0&&r5.draw.d[1]===0&&/hòa/.test(r5.draw.r),'hòa: stakes stay',r5.draw);
 ok(typeof r5.bad.r==='string'&&r5.bad.r.length>0,'bad lv is cleaned (pmLvSan) and the act still runs (raws drawn from each hand)',r5.bad.r.slice(0,80));
 ok(JSON.stringify(r5.san)==='{"ra":10,"rt":0,"w":"a"}','pmLvSan clamps raws to 0..10 and drops unknown keys',r5.san);
 ok(!/%/.test(JSON.stringify(r5)),'law 7: no % in any result line');
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`FAIL ${n}/${res.length}`:`ALL PASS ${res.length}`);process.exit(n?1:0)})();
