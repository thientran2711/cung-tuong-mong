/* review/selection-scene (SELSCENE-5): the additions to the 3 opening days.
   OD 24/11 ~08:55Z (Day 2 toilette → first impression: thiện cảm + a small part of the score per royal by HIS / HER taste, same for all 12),
   ~09:25Z / ~09:40Z (DÒ HỎI MA MA: pay bạc = sure / win her favour = grows with regard / just ask = by her nết; a poor girl keeps a road; NPC girls the same),
   ~09:20Z (PHÂN CUNG hook after the edict, thiện cảm of the 3 royals from the selection days, the kept girls too), MAIN 118 (a) the clock moves 3 tuần at the edict,
   ~09:35Z / ~09:50Z (Day-3 drama pool a–e, 1–2 per life), ~09:30Z + ~08:50Z + ~05:10Z (the scene layer plays on KIT §93 / §95 with no page error, the card under it comes back).
   usage: node dev/test/selx-days2.js [index.html]  (serves dev/ through a Playwright route; run python3 dev/build/assemble.py first) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,700):'')}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function'&&typeof selxScRooms==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(()=>{const out={};const plain=h=>String(h||'').replace(/<[^>]*>/g,' ');
  const life=og=>{for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k===og)break}if(!S||!S.origin||S.origin.k!==og)return false;S.kcPick="cung";nlAccept();return true};
  const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpod,.kpod').forEach(x=>x.remove())}catch(e){}};
  /* play the queue; pref = ordered regexes of option names to prefer */
  const play=(pref,stopAt)=>{const seen=[];for(let n=0;n<500&&Q.length&&!S.dead;n++){const m=Q[0];seen.push(m.t);if(stopAt&&stopAt(m))return seen;
    if(m.pid==="kc2Sel"){Q.shift();S.selx.done=1;S.selx.art="";selxSelDo(8);close();continue}
    if(m.pid==="selxD"&&m.opts){const nm=m.opts.map(x=>x.n);let i=-1;for(const re of pref){i=nm.findIndex(s=>re.test(s));if(i>=0)break}chooseM(i<0?0:i);close();continue}
    if(m.opts){chooseM(0);close();continue}closeModal();close()}return seen};
  /* ---- A. DÒ HỎI MA MA: levels by road + a poor girl's roads ---- */
  window.__bot=1;window.__selxNoSc=1;life("tt");const Z=S.selx2;const A=BAL.selx.ask;
  out.lvBac=selxAskLvl("bac",-99);out.lvPleaseHi=selxAskLvl("please",A.maHi);out.lvPleaseLo=selxAskLvl("please",-1);out.lvAskHi=selxAskLvl("ask",A.maHi+5);out.lvAskLo=selxAskLvl("ask",A.maLo-5);
  const k0=(selxRoyals()[0]||[])[0];S.bac=0;selxAskHow(k0,"x",()=>{});out.poorOpts=Q[0].opts.map(o=>o.n);Q.shift();S.bac=A.bac*2;selxAskHow(k0,"x",()=>{});out.richOpts=Q[0].opts.map(o=>o.n);
  const bac0=S.bac;Q[0].opts[0].go();out.paid=bac0-S.bac;out.bacWant=A.bac;out.knowAfterPay=Object.assign({},Z.know||{},{T:Z.knowT});Q.shift();
  /* ---- B. day 1 → the lesson: NPC girls asked too (law 1); a girl who knows picks the answer the asker values ---- */
  play([/^Tập thật kỹ/,/Cất đồ/,/Theo/],m=>m.t===BAL.selx.lodge.sanh[1]&&false||/^Ngày thứ hai/.test(m.t));
  out.npcKn=selxAll().filter(v=>v.__kn&&Object.keys(v.__kn).length).length;out.nGirls=selxAll().length;
  const RY=selxRoyals();const tk=RY.find(x=>x[0]==="T");const e=SELX_TESTS.find(x=>x.type==="doidap");const v=selxAll()[0];v.__kn={T:2};
  const mk=selxNpcMarks(v,{dd:Object.assign({},e,{__k:"T"}),rdd:o=>selxReactR(o,tk&&tk[2])});out.hasPlus=e.options.some(o=>selxReactR(o,tk&&tk[2])==="+");out.knowMark=mk.dd;out.hit=BAL.selx.npcMatch.hit;
  /* ---- C. Day 2: the mirror (bot = toilAuto), the hall's first impression, why, score part ---- */
  out.d2=play([/^Ngồi trước gương/,/Theo/,/Quỳ/,/^Làm quen/],m=>m.t==="Ba vị nhìn mặt"||/^Thái hậu$/.test(m.t));
  out.toil=!!toilToday(S);out.imp=Z.mk&&Z.mk.imp;out.impL=(Z.imp||[]).length;out.npcImp=selxAll().every(v=>v.__impMk!=null);
  const last=[];try{const L=document.querySelectorAll('#rtoast,.karesult');L.forEach(x=>last.push(x.textContent.slice(0,200)))}catch(e){}out.res=last;
  const s5=selxScore(S,{mini:5,dd:5,hx:5,imp:5},false),s9=selxScore(S,{mini:5,dd:5,hx:5,imp:10},false);out.impW=+(s9-s5).toFixed(2);out.impWant=+(BAL.selx.w.imp*5).toFixed(2);
  out.whyTxt=selxImpOf(S,"T")?selxImpWhy(selxImpOf(S,"T")):"";
  /* ---- D. to the edict: carry, the clock, the PHÂN CUNG hook ---- */
  S.sac=S.duc=S.tai=100;let hook=null;window.phanCungEdict=o=>{hook={n:o.list.length,me:o.list[0].p===S,fav:o.list.map(x=>Object.keys(x.fav).length)};o.then()};
  const wk0=wk(),sung0=S.sung;out.d3=play([/^Làm quen/,/chờ tới tối|Theo|Quỳ|Ngủ|Về|Nghe/]);
  out.kept=!!S.selx.kept;out.wkMoved=wk()-wk0;out.wkWant=BAL.selx.days;out.hook=hook;out.fav=Object.assign({},Z.fav||{});out.favG=Object.keys(Z.favG||{}).length;out.carried=!!Z.carried;
  out.keptPool=(SELX_SEEDS.kept||[]).map(x=>x.id);out.seenKp=(Z.seen||[]).filter(x=>/^kp-/.test(x));
  window.__bot=0;window.__selxNoSc=0;return out});
 ok(r.lvBac===2,'Dò hỏi: pay bạc = a sure full answer',r.lvBac);
 ok(r.lvPleaseHi===2&&r.lvPleaseLo<=1,'Dò hỏi: win her favour = the answer grows with her regard',[r.lvPleaseHi,r.lvPleaseLo]);
 ok(r.lvAskHi>=r.lvAskLo,'Dò hỏi: just ask = by her nết, better when she likes the girl',[r.lvAskHi,r.lvAskLo]);
 ok(r.poorOpts.length===2&&r.richOpts.length===3,'law 2: without bạc a girl still has two roads (favour / ask)',[r.poorOpts,r.richOpts]);
 ok(r.paid===r.bacWant,'paying costs the BAL silver (BAL.selx.ask.bac)',[r.paid,r.bacWant]);
 ok(r.npcKn===r.nGirls&&r.nGirls>0,'law 1: every tú nữ asks the ma ma on day 1 (pays / pleases / asks by her standing and nết)',[r.npcKn,r.nGirls]);
 ok(!r.hasPlus||r.knowMark===r.hit,'a girl who knows the asker\'s chữ trọng answers what he values',[r.hasPlus,r.knowMark,r.hit]);
 ok(r.toil,'Day 2: the mirror (jtoil) makes today\'s look',r.toil);
 ok(r.imp!=null&&r.impL>=2&&r.npcImp,'the hall: first impression per royal for her and every girl (law 1)',[r.imp,r.impL,r.npcImp]);
 ok(Math.abs(r.impW-r.impWant)<.01,'the first impression is a small part of the score (BAL.selx.w.imp)',[r.impW,r.impWant]);
 ok(/trọng|chuộng|thích|ghen|:/.test(r.whyTxt)&&/thiện cảm|không để tâm/.test(r.whyTxt),'the impression says WHY (taste + dress + face → reaction)',r.whyTxt);
 ok(r.kept&&r.wkMoved===r.wkWant,'the edict: the clock moves BAL.selx.days tuần',[r.kept,r.wkMoved,r.wkWant]);
 ok(r.hook&&r.hook.me&&r.hook.n===1+3,'PHÂN CUNG hook: phanCungEdict gets her + the 3 kept girls with their thiện cảm',r.hook);
 ok(r.carried&&r.favG===3&&['E','T','H'].some(k=>r.fav[k]!=null),'selection thiện cảm with the 3 royals is stored (her + kept girls) and carried',[r.carried,r.favG,r.fav]);
 ok(['kp-007','kp-008','kp-009','kp-010','kp-011'].every(x=>r.keptPool.includes(x))&&r.seenKp.length>=1&&r.seenKp.length<=2,'Day-3 pool holds the 5 MAIN seeds a–e; 1–2 dramas per life',[r.keptPool.length,r.seenKp]);
 /* ---- E. the scene layer (KIT §93 / §95): rooms, hall, result play with the card hidden, then the card is back ---- */
 const sc=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const tapAll=async n=>{for(let i=0;i<n;i++){const L=document.querySelector('.kscn');if(!L)return i;L.click();await wait(40)}return n};
  for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==="tt")break}S.kcPick="cung";nlAccept();await wait(50);
  const Z=S.selx2;Q.shift();selxD1Rooms();await wait(300);o.rooms=!!document.querySelector('.kscn');o.hidden=document.getElementById('modal').style.visibility==='hidden';
  o.taps=await tapAll(400);await wait(900);o.roomsGone=!document.querySelector('.kscn');o.back=document.getElementById('modal').style.visibility!=='hidden';
  Z.days=2;selxHall();await wait(300);o.hall=!!document.querySelector('.kscn');await tapAll(400);await wait(900);o.hallGone=!document.querySelector('.kscn');
  const L=selxContest(selxAll(),{marks:{mini:9,dd:9,hx:9,imp:9},t:{}});selxPodShow(L);await wait(300);o.res=!!document.querySelector('.kscn');o.pod0=!!document.querySelector('#kpod,.kpod');
  await tapAll(900);await wait(1500);o.resGone=!document.querySelector('.kscn');o.pod1=!!document.querySelector('#kpod,.kpod,.kmov');return o});
 ok(sc.rooms&&sc.hidden,'room assignment scene opens over the hidden card (KIT §93 / §95)',sc);
 ok(sc.roomsGone&&sc.back,'tapping through ends it and the card is back',sc);
 ok(sc.hall&&sc.hallGone,'the hall scene (royals\' reveal + Tổng quản roll-call) plays and ends',sc);
 ok(sc.res&&!sc.pod0&&sc.resGone,'the per-girl result scene plays first; the podium waits for it',sc);
 ok(!errs.length,'no page errors',errs);
 await b.close();console.log(bad?`${bad} FAIL`:'ALL PASS');process.exit(bad?1:0)})();
