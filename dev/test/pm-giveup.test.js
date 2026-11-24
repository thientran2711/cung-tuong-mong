/* REVIEW E22t (round C): KIT §13.9 give-up × person duels. G1–G4 co-op live board (two pages, pm-live relay), G5–G8 NPC duels (stake once, hooks cleared). usage: node dev/test/pm-giveup.test.js [dev/index.html] */
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
 const mk=async(seat,vp)=>{const p=await b.newPage({viewport:{width:vp[0],height:vp[1]}});await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push(seat+': '+e.message));
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


 const hooks=p=>p.evaluate(()=>({kyNoise:KG82.kyNoise??null,kyOut:KG82.kyOut??null,onVs:!!KG82.onVs,kyNet:!!KG82.kyNet,guardMs:KG82.guardMs??null,onHud:!!KG82.onHud,engX:KG82.engX??null,vs:!!KG82.vs,frame:!!document.getElementById('kg82'),phase:KG82.phase}));
 const gu=p=>p.evaluate(()=>{try{kg82GiveUp();return true}catch(e){return 'ERR '+e.message}});
 const resTxt=p=>p.evaluate(()=>{const r=document.getElementById('kg82box-res');return r&&!r.hidden?r.textContent.replace(/\s+/g,' ').trim().slice(0,200):''});
 const moveOnce=async p=>p.evaluate(()=>{const q=KG82.peek&&KG82.peek();const el=q&&q.sel&&document.querySelector(q.sel);if(el&&!el.disabled){el.click();return true}return false});
 const coop=async(label,kind,who,when,act)=>{act=act||'duel';sent.a.length=0;sent.b.length=0;await A.evaluate(()=>{__ans.length=0});
  await ask(A,{a:act,kind,ak:kind==="co"?"ky":kind,n:kind==="co"?"Cờ":"Đàn",s:"bac"});
  const opened=await until(async()=>!!(await A.evaluate(()=>!!document.getElementById('kg82go')))&&!!(await B.evaluate(()=>!!document.getElementById('kg82go'))),8000);
  const Q=who==='a'?A:B,O=who==='a'?B:A;let g;
  if(when==='pre'){g=await gu(Q);await sleep(300);await go(O)}
  else{await go(A);await go(B);await sleep(800);if(kind==="co"){for(let k=0;k<4;k++)for(const p of [B,A]){await moveOnce(p);await sleep(300)}}else await sleep(2500);g=await gu(Q)}
  const ended=await until(async()=>!!(await resTxt(A))&&!!(await resTxt(B)),kind==="co"?20000:30000);
  const rA=await resTxt(A),rB=await resTxt(B),outs=[await A.evaluate(()=>KG82.kyOut??null),await B.evaluate(()=>KG82.kyOut??null)];
  await sleep(800);await okb(A);await okb(B);await until(async()=>(await A.evaluate(()=>__ans.length))>0,9000);await sleep(1500);
  const ans=await A.evaluate(()=>__ans.slice()),hA=await hooks(A),hB=await hooks(B);
  const wExp=who==='a'?'a':'t';/* A = the card device (reader 't'), B = the friend (asker 'a'): the side that gives up loses */
  ok(opened&&g===true&&ended,label+': both boards reach a result after the give-up',{opened,g,ended,rA,rB});
  if(kind==="co")ok(ans.length===1&&ans[0].ok===true&&ans[0].lv&&ans[0].lv.w===wExp,label+': the card device answers ONCE, the side that gave up loses',{ans,wExp,outs});
  if(kind==="co")ok(outs[who==='a'?1:0]==='win',label+': the OTHER device\'s board says it won (the friend\'s result agrees with the card)',{outs,rA,rB});
  else ok(ans.length===1&&ans[0].lv&&(who==='a'?ans[0].lv.rt===0:ans[0].lv.ra===0),label+': answered ONCE, the giver-up\'s raw is 0',{ans});
  const clean=h=>!h.frame&&h.kyNoise==null&&h.kyOut==null&&!h.onVs&&!h.kyNet&&h.guardMs==null&&!h.onHud&&h.engX==null;
  ok(clean(hA)&&clean(hB),label+': round-C hooks cleared on both devices after close',{hA,hB});
  try{await A.evaluate(()=>{try{kg82Close(true)}catch(e){}});await B.evaluate(()=>{try{kg82Close(true)}catch(e){}})}catch(e){}
  await sleep(500)};
 await coop('G1 co-op Cờ, card device gives up before «Sẵn sàng»','co','a','pre');
 await coop('G2 co-op Cờ, card device gives up during play','co','a','play');
 await coop('G3 co-op Cờ, the friend gives up during play','co','b','play');
 await coop('G4 co-op Đàn, card device gives up during play','dan','a','play');
 /* ---- NPC duels on A (no co-op friend): stake moves once ---- */
 const npc=async(label,kind,when)=>{const r0=await A.evaluate(([kind])=>{const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop&&!x.confined);const a=V[0];window.__npc=a;S.place=whereOf(a);a.bac=Math.max(a.bac||0,300);S.bac=Math.max(S.bac,300);
   window.__b0=[S.bac,a.bac];try{pmRun(S,a,{a:"duel",kind,ak:kind==="co"?"ky":kind,n:kind,s:"bac"})}catch(e){return 'ERR '+e.message}return !!document.getElementById('kg82go')},[kind]);
  let g;if(when==='pre')g=await gu(A);else{await go(A);await sleep(900);if(kind==="co"){for(let k=0;k<2;k++){await moveOnce(A);await sleep(900)}}else await sleep(2000);g=await gu(A)}
  const ended=await until(async()=>!!(await resTxt(A)),15000);const rt=await resTxt(A);
  await sleep(600);await okb(A);await sleep(1200);await okb(A);await sleep(1500);
  const r=await A.evaluate(()=>{const a=__npc;return{b0:__b0,b1:[S.bac,a.bac]}});const h=await hooks(A);
  const dS=r.b1[0]-r.b0[0],dA=r.b1[1]-r.b0[1];
  /* E22u ruling (one rule with startContest / Hội thi, KIT §13.9 «the caller's own lose path with 0/10»): Cờ = the side that gives up loses the board;
     a timed art = her mark is 0/10 and the duel is scored as always (talent + mark), so a strong talent may still beat a weak rival — the stake moves once either way */
  const won=dS>0;ok(r0===true&&g===true&&ended&&dS!==0&&dS===-dA&&(kind==="co"?dS<0:true),label+(kind==="co"?': she loses the board, the stake moves once from her to the NPC (bạc conserved)':': scored with her 0/10 mark, the stake moves once (bạc conserved)'+(won?' — she won on talent':' — she lost')),{r0,g,rt,r,dS,dA});
  await sleep(2500);const r2=await A.evaluate(()=>[S.bac,__npc.bac]);ok(r2[0]===r.b1[0]&&r2[1]===r.b1[1],label+': nothing moves again later',{r2,b1:r.b1});
  ok(!h.frame&&h.kyNoise==null&&h.kyOut==null&&!h.onVs&&h.guardMs==null&&!h.onHud&&h.engX==null,label+': hooks cleared',h)};
 relay=false;await A.evaluate(()=>{COOPW.on=false});
 await npc('G5 NPC Cờ, gives up before «Sẵn sàng»','co','pre');
 await npc('G6 NPC Cờ, gives up during play','co','play');
 await npc('G7 NPC Đàn, gives up during play','dan','play');
 await npc('G8 NPC Đàn, gives up before «Sẵn sàng»','dan','pre');
 /* E22h fix 1 whole family: timed art before «Sẵn sàng» + the friend's side, and «Cùng chơi» (no stake) on both board kinds */
 relay=true;await A.evaluate(()=>{COOPW.on=true;Q.length=0});/* the room back on after the NPC block */
 await coop('G4b co-op Đàn, the friend gives up before «Sẵn sàng»','dan','b','pre');
 await coop('G4c co-op Đàn, the friend gives up during play','dan','b','play');
 await coop('G4d co-op Cùng chơi Cờ, the friend gives up during play','co','b','play','play');
 await coop('G4e co-op Cùng chơi Đàn, card device gives up before «Sẵn sàng»','dan','a','pre','play');
 ok(!errs.length,'no page error',errs.slice(0,5));
 await b.close();const n=res.filter(Boolean).length;console.log((n===res.length?'PASS ':'FAIL ')+n+'/'+res.length);process.exit(n===res.length?0:1)})();
