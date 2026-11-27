/* review/outside-r2: the pre-palace road (jkc, "Ở nhà chờ tuyển tú") played start -> enter the palace, on today's main.
   usage: node dev/test/outside/route.js <site url, e.g. http://127.0.0.1:PORT/index.html> <outdir> [WxH@dpr ...] [--origin=tt] [--shots=few|all|none]
   Per size: new life (loading screen + Luân hồi roulette skipped) -> identity card shows "Con đường" -> pick "Ở nhà chờ tuyển tú" ->
   Nhận thân phận -> home life: every home tab rendered (no page error, no horizontal overflow, no clipped text, no '???'/undefined/NaN) ->
   ~3 months of random play by tapping cards / options -> jump to the tuyển tú (calendar moved to the month before Sơ tuyển) -> answer
   Sơ tuyển / Phúc tuyển / Điện tuyển (the court's keep roll forced to "kept" with __kcKeep) -> she is a consort: isKc() false, rank 0..2,
   in consorts(), palace tabs back, her figure is no longer the home dress, carry-over (Danh ≤ entry cap 30 + the origin's BAL.kcv carry row, Bạc ≤ 400 + BAL.kcv carry (+200 slack), maid, intel) -> 4 palace
   buổi -> save + reload the slot -> still the same palace life. Prints one JSON report; exit 1 on any fail. */
const {chromium}=require('playwright');const fs=require('fs');
const A=process.argv.slice(2);const URL=A[0];const OUT=A[1]||'.';fs.mkdirSync(OUT,{recursive:true});
const opt=k=>{const a=A.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:null};
const ORG=opt('origin')||'tt';const SHOTS=opt('shots')||'few';
const sizes=A.slice(2).filter(x=>/^\d+x\d+@/.test(x));if(!sizes.length)sizes.push('755x1000@2');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rep=[];let bad=0;
 for(const sz of sizes){const [wh,d]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());/* reward chests (kitReward): Nhận, as the player does */document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});/* Luân hồi roulette: Bỏ qua */
  const p=await c.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)+' @'+String(e.stack||'').split('\n')[1]));
  const R={size:sz,origin:ORG,fail:[]};const F=m=>R.fail.push(m);
  const shot=async(n,force)=>{if(SHOTS==='none'||(SHOTS==='few'&&!force))return;await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await sleep(250);
   await p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:62,timeout:60000}).catch(()=>{});await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}})};
  const meas=()=>p.evaluate(()=>{const root=[document.getElementById('panel'),document.getElementById('modal')].filter(Boolean);
   const cut=[];root.forEach(r=>r.querySelectorAll('*').forEach(e=>{if(!e.offsetParent||e.children.length||!e.textContent.trim())return;const cs=getComputedStyle(e);
    if(e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(cs.overflowX)&&cs.textOverflow!=='ellipsis')cut.push(e.className+':'+e.textContent.slice(0,30))}));
   const txt=root.map(r=>r.offsetParent||r.id==='panel'?r.innerText:'').join('\n');
   return{ovf:document.documentElement.scrollWidth>innerWidth+1,cut:cut.slice(0,5),bad:(()=>{const m=txt.match(/\?\?\?|undefined|NaN|\[object/);return m?txt.slice(Math.max(0,m.index-60),m.index+12).replace(/\s+/g,' '):''})()}});
  const skipOverlays=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');
    if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);
  await skipOverlays();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skipOverlays();
  /* the origin is pre-rolled by the life seed; the test makes it the chosen one (the card is drawn again) */
  R.rolled=await p.evaluate(o=>{const r=S.origin.k;/* a servant start (cung nữ) has no home road: roll new lives until an eligible origin */
   for(let i=0;i<60&&(S.srv||(typeof isSrv==='function'&&isSrv())||!KC.ok.includes(S.origin.k));i++){try{store.set(NL_KEY,null)}catch(e){}start()}
   if(S.origin.k!==o&&!S.srv){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}return r},ORG);await sleep(600);await skipOverlays();
  R.card=await p.evaluate(()=>({path:!!document.querySelector('#modal [data-kcp="nha"]'),opts:[...document.querySelectorAll('#modal [data-kcp]')].map(b=>b.dataset.kcp)}));
  if(!R.card.path)F('identity card has no "Ở nhà chờ tuyển tú" option');
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');b.scrollIntoView({block:'center'});b.click()});await sleep(700);
  for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);/* the roulette waits for its pictures */
  R.picked=await p.evaluate(()=>S.kcPick);await shot('0-card',true);R.m0=await meas();
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');b.scrollIntoView({block:'center'});b.click()});await sleep(1200);
  R.home=await p.evaluate(()=>({maid:S.maid&&S.maid.name,isKc:isKc(),age:S.age,rank:S.rank,place:S.place,fam:S.kc&&S.kc.fam.map(m=>m.t),Q:Q.map(m=>m.t),fig:figFor(S),tabs:[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim())}));
  if(!R.home.isKc)F('not at home after Nhận thân phận');if(R.home.age!==18)F('age at home '+R.home.age);
  if(!/-(kc|ngheo)-a18\.webp/.test(R.home.fig||''))F('home dress missing: '+R.home.fig);
  await shot('1-intro',true);R.m1=await meas();
  const close=async()=>{await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)break;closeModal()}render()});await sleep(500)};
  await close();await sleep(1500);await shot('2-home',true);R.m2=await meas();
  R.tabs={};for(const t of ['act','go','rv','staff','art','kid','inv','story']){await p.evaluate(t=>{tab=t;render();const P=document.getElementById('panel');if(P)P.scrollTop=0},t);await sleep(700);
   R.tabs[t]=await meas();if(R.tabs[t].ovf||R.tabs[t].cut.length||R.tabs[t].bad)F('tab '+t+' '+JSON.stringify(R.tabs[t]));await shot('3-'+t,['rv','go'].includes(t))}
  /* random play: cards, options, moves, next buổi */
  const titles=new Set();const steps=[];
  const play=async(n,stopIf,fast)=>{for(let i=0;i<n;i++){const r=await p.evaluate(fast=>{try{if(S.dead)return'dead';
     const vis=e=>e&&e.isConnected&&e.getClientRects().length>0;if(document.getElementById('kpodov')&&typeof kitPodiumClose==='function'){kitPodiumClose();return'pod'}/* the Phúc tuyển podium holds the turn (jdayq) until it is closed */const ok=document.querySelector('#kg82ok');if(vis(ok)){ok.click();return'mgok'}const sk=document.querySelector('#kg82skip');if(vis(sk)){sk.click();return'mg'}const gr=document.querySelector('#ov #kg82box-res'),gx=document.querySelector('#ov .kg82 .kit-x');if(vis(gr)&&vis(gx)){gx.click();return'mgx'}/* a finished game shows its result with only the kit ✕ */
     if(Q.length){const m=Q[0];const t=(isKc()&&m.pid!=='kcE'&&!m.nl&&!/^(Khuê các|Nhập cung)$/.test(m.t)?'Q:[ngoài] ':'Q:')+m.t;if(m.opts&&m.opts.length){const L=m.opts.map((o,i)=>i).filter(i=>!m.opts[i].dis);chooseM(L.length?L[Math.floor(Math.random()*L.length)]:0);return t}closeModal();return t}
     const L=deck.map((a,i)=>[a,i]).filter(([a])=>!a.done&&!a.lock&&can(cardCost(a))&&canPay(a));if(!fast&&L.length&&Math.random()<.7){const [a,i]=L[Math.floor(Math.random()*L.length)];act(i);return'act:'+a.n}
     if(!fast&&isKc()&&Math.random()<.2){const ks=Object.keys(KCPL).filter(k=>!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);render();return'go'}}
     nextBuoi();return'next'}catch(e){return'ERR '+e.message}},!!fast);steps.push(r);if(/^Q:/.test(r))titles.add(r.slice(2));if(r==='dead'||/^ERR/.test(r))return r;if(await p.evaluate(stopIf))return'stop'}return'n'};
  R.play1=await play(500,()=>S.turn>=3||!isKc());R.after3=await p.evaluate(()=>({turn:S.turn,ym:S.year+'/'+S.month,kc:isKc(),dead:!!S.dead}));
  /* jump to the month before Sơ tuyển (the palace world keeps its own calendar values; only the date moves) */
  if(!R.after3.dead&&R.after3.kc){R.endedAt3=await p.evaluate(()=>{/* r2-r1 FAIL 4: never press an end card here (its close starts a NEW life without S.kc) */for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}return S.dead?(S.kc&&S.kc.end)||'NOEND':''});
   if(R.endedAt3){if(R.endedAt3==='NOEND')F('home life ended without S.kc.end');R.note='life ended at home while answering: '+R.endedAt3}}
  if(!R.after3.dead&&R.after3.kc&&!R.endedAt3){await p.evaluate(()=>{
    S.year=KC.ty;S.month=KC.tm-1;S.tuan=2;S.turn=Math.max(S.turn,20);S.kc.ev.chieu=1;S.kc.suit=[];S.kc.forced=0;S.kc.mien=0;
    Object.assign(S,{sac:Math.max(S.sac,70),suc:90,duc:Math.max(S.duc,50),danh:Math.max(S.danh,30),kld:0,kgt:Math.max(S.kgt,50)});window.__kcKeep=1;render()});
   /* time runs in buổi now (4 a day): the month before Sơ tuyển is ~100 buổi, so the second leg only moves time and answers dialogs (fast) */
   R.play2=await play(1500,()=>!isKc()||S.dead,true);R.after2=await p.evaluate(()=>({ovb:[...document.querySelectorAll('#ov button,#ov [data-act],#ov [id]')].filter(b=>b.getClientRects().length).map(b=>b.tagName+'#'+b.id+'.'+b.className+':'+b.textContent.trim().slice(0,20)).slice(0,30),mg:S.mg&&S.mg.k,ov:[...document.querySelectorAll('body>*')].filter(e=>e.getClientRects().length&&getComputedStyle(e).position==='fixed').map(e=>e.id+'.'+e.className).slice(0,12),btn:[...document.querySelectorAll('button')].filter(b=>b.getClientRects().length).map(b=>b.id+':'+b.textContent.trim().slice(0,20)).slice(0,25),turn:S.turn,ym:S.year+'/'+S.month,tuan:S.tuan,buoi:S.buoi,ty:KC.ty,tm:KC.tm,due:S.kc&&S.kc.due,tt:S.kc&&S.kc.tt,Q:Q.map(m=>m.t)}));R.stepTail=steps.slice(-12);await sleep(500)}
  R.titles=[...titles];R.foreign=R.titles.filter(t=>/^\[ngoài\]/.test(t));if(R.foreign.some(t=>/Kính sự phòng|thị tẩm|lật thẻ|Thái hậu triệu|Hoàng thượng đến/i.test(t)))F('palace event at home: '+R.foreign);R.errSteps=steps.filter(x=>/^ERR/.test(x)).slice(0,5);if(R.errSteps.length)F('step errors');
  R.pal=await p.evaluate(()=>{for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}render();
   return{isKc:isKc(),dead:!!S.dead,end:S.kc&&S.kc.end,inPal:!!(S.kc&&S.kc.inPal),rank:S.rank,rankN:RANKS[S.rank].n,inCons:consorts().includes(S),age:S.age,danh:S.danh,bac:S.bac,lim:(()=>{const c=S.kc&&S.kc.carry,B=c&&BAL.kcv[c.kind];if(!B)return{danh:30,bac:400};const f=c.f||1,n=x=>Math.round(x*f);return{danh:Math.min(100,30+n(B.dn)),bac:400+n(B.bac)}})(),maid:S.maid&&S.maid.name,
    intel:S.kc&&S.kc.intel.length,fig:figFor(S),tabs:[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()),title:(document.getElementById('me-r')||{}).textContent}});
  if(R.pal.dead||R.pal.end)R.note='life ended at home: '+(R.pal.end||'dead');
  else{if(R.pal.isKc||!R.pal.inPal)F('did not enter the palace');if(!(R.pal.rank>=0&&R.pal.rank<=2))F('entry rank '+R.pal.rank);if(!R.pal.inCons)F('not in consorts()');
   if(/-(kc|ngheo)-a18/.test(R.pal.fig||''))F('home dress in the palace');if(R.pal.danh>R.pal.lim.danh)F('Danh carry-over '+R.pal.danh+' > '+R.pal.lim.danh);if(R.pal.bac>R.pal.lim.bac+200)F('Bạc carry-over '+R.pal.bac+' > '+R.pal.lim.bac);
   if(!R.pal.tabs.some(t=>/Hậu cung/.test(t)))F('palace tabs not back: '+R.pal.tabs);
   for(let i=0;i<4;i++){if(!await p.evaluate(()=>document.body.classList.contains('kbk-open')))break;await p.keyboard.press('Escape');await sleep(600)}/* Tuần lục of the first palace week */
   await p.evaluate(()=>{tab='act';render()});await sleep(1500);
   await shot('4-palace',true);R.m4=await meas();
   for(let i=0;i<4;i++){await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}try{nextBuoi()}catch(e){}});await sleep(300)}
   R.reload=await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}save();const s=SLOT;const n=S.name;deser(loadSlot(s));render();return{same:S.name===n,isKc:isKc(),inPal:!!(S.kc&&S.kc.inPal),rank:S.rank}});
   if(!R.reload.same||R.reload.isKc)F('reload '+JSON.stringify(R.reload));
   /* ob-phu §9: the tỳ nữ from home IS her palace maid (never swapped by a Nội vụ phủ pick), and the sister / khuê hữu who entered carry two-way relations */
   R.carry=await p.evaluate(()=>{try{if(typeof cmMonthMe==='function')cmMonthMe()}catch(e){}const pal=(S.kc.fam||[]).filter(m=>m.pal!=null).map(m=>{const v=RV(m.pal);return{r:m.r,me:m.me,af:m.af,vRel:v&&v.rel,sRl:v&&S.rl[v.id]}});
    return{maid:S.maid&&S.maid.name,src:S.maid&&S.maid.src,pick:Q.some(m=>m.pid==='cmPick'),pal}});
   if(R.home.maid&&R.carry.maid!==R.home.maid)F('home maid swapped in the palace: '+R.home.maid+' -> '+R.carry.maid);
   if(R.carry.src&&!/^(home|land)$/.test(R.carry.src))F('home maid labelled '+R.carry.src);if(R.carry.pick)F('Nội vụ phủ maid pick queued for a home-road girl');
   for(const x of R.carry.pal)if(x.me!=null&&x.sRl==null)F('consort from home has no her->them relation: '+x.r)}
  R.errs=errs.slice(0,10);if(errs.length)F('page errors');rep.push(R);if(R.fail.length)bad++;await c.close()}
 console.log(JSON.stringify(rep,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
