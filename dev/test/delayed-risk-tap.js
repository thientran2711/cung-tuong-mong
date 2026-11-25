/* REAL-TAP check of the delayed-risk roads (review/m-fix-3): Fold 755x1000 + iPad 1180x820, touch taps only (page.touchscreen.tap at the
   card title; elementFromPoint must be inside that card; no JS click). At the robot-M4 state (Tâm cơ 100, last night 7 tuần back):
   1. the «Giả mang thai» card shows the whole-road word (= word(fpRoad)), not «Rất vững», and cites the real book;
   2. a tap plays it: the toast seal = the first step's real outcome (THÀNH → fake on; BẠI → Danh lost, no fake);
   3. while the fake runs the counter-plays are on the tray; a tap on «Báo sảy thai» ends the fake on a win.
   MUTATE=1 puts the old lie back (corner word = the first step only) → the test MUST fail.
   usage: node dev/test/delayed-risk-tap.js <url> [shotdir]   (shots go OUTSIDE the repo) */
const {chromium}=require('./lib/pw-roulette');const {dismissRoulette,clearMoments}=require('./lib/roulette');const fs=require('fs');const [,,URL,OUT]=process.argv;const MUT=process.env.MUTATE==='1';
const DEVS=[['fold',755,1000],['ipad',1180,820]];
(async()=>{const b=await chromium.launch();const res={};const fails=[];
 for(const [dn,W,H] of DEVS){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:dn==='fold',serviceWorkers:'block'});const p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});
  for(let n=0;n<600;n++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await p.waitForTimeout(1000)}
  await p.waitForTimeout(1500);
  await p.evaluate(MUT=>{try{localStorage.clear()}catch(e){}try{(window.KLIFE||{}).off=true}catch(e){}try{LIFE.off=true}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<12;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
   window.__clr=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('#klife,.kveil,.ktut,#ktut').forEach(e=>{try{e.remove()}catch(x){}})};
   window.__m4=()=>{S.turn=Math.max(S.turn,30);S.tamco=100;S.preg=0;S.fake=0;S.doctor=0;S.khBook=0;S.out=0;S.bac=500;S.suc=80;used=0;S.buoi=0;const W=wk();S.nightLog=[2,3,10,14,14,14,27,29,30,34,41,44,45,47,48,49,50,50,51,52,53].map(x=>x-60+W);S.nights=21};
   window.__put=(n,src)=>{deck.forEach(a=>a.done=0);let i=deck.findIndex(a=>a.n===n);if(i<0){const a=src().find(a=>a.n===n);if(MUT&&a&&a.oin!=null)a.oi=a.oin;deck.unshift(a);i=0}else if(MUT&&deck[i].oin!=null)deck[i].oi=deck[i].oin;tab="act";render();return i};
   window.__clr()},MUT);
  await dismissRoulette(p);await clearMoments(p);await p.waitForTimeout(800);await p.evaluate(()=>__clr());
  const R0={};
  /* a player opens the Hành sự tray with a real tap when the card is not on screen (Fold: the tray is a sheet) */
  const openTray=async(n)=>{for(let k=0;k<3;k++){if(await openTray1(n))return}};
  /* the tray is open when ANY card shows on screen (then the player scrolls to the card); else one tap on «Hành sự» opens it */
  const openTray1=async(n)=>{const vis=await p.evaluate(n=>{const open=[...document.querySelectorAll('.card[data-i]')].some(c=>{const r=c.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>innerHeight)return false;const hit=document.elementFromPoint(r.left+Math.min(r.width/2,60),Math.max(1,Math.min(innerHeight-2,r.top+12)));return !!(hit&&c.contains(hit))});
    if(!open)return false;const i=deck.findIndex(a=>a.n===n);const el=document.querySelector(`.card[data-i="${i}"]`);if(el)el.scrollIntoView({block:'center'});return true},n);
   if(vis)return true;const t=await p.evaluate(()=>{const B=[...document.querySelectorAll('button,[role=button],.ktab,div')].filter(e=>e.children.length<=2&&/^\s*Hành sự\s*$/.test(e.textContent||''));for(const e of B){const r=e.getBoundingClientRect();if(r.width>20&&r.height>15&&r.top<innerHeight&&r.bottom>0){const x=r.left+r.width/2,y=r.top+r.height/2;const hit=document.elementFromPoint(x,y);if(hit&&(e.contains(hit)||hit.contains(e)))return{x,y}}}return null});
   if(process.env.DBG)console.error("openTray",dn,n,JSON.stringify(t));if(t){await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(700)}return false};
  /* a moment over the screen (win fx «Chạm để bỏ qua», reward chest): the player taps it away */
  const skipFx=async()=>{for(let k=0;k<6;k++){const t=await p.evaluate(()=>{const E=[...document.querySelectorAll('body *')].filter(e=>e.children.length===0&&/Chạm để bỏ qua/.test(e.textContent||''));for(const e of E){const r=e.getBoundingClientRect();if(r.width&&r.height)return{x:r.left+r.width/2,y:r.top+r.height/2}}return null});
   if(!t)break;await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(600)}await clearMoments(p);
   /* the result toast of the last play: the player taps it closed («Chạm để đóng») */
   const rt=await p.evaluate(()=>{const T=document.getElementById('rtoast');if(!T||!T.classList.contains('on'))return null;const r=T.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+Math.min(20,r.height/2)}});
   if(rt){await p.touchscreen.tap(rt.x,rt.y);await p.waitForTimeout(500)}};
  const tapCard=async(n)=>{await skipFx();/* a random event card (e.g. «Có người bán tin») that the game queued after the setup covers the tray: test setup clears it (review r6: Fold race) */for(let k=0;k<3;k++){const up=await p.evaluate(()=>{const m=document.getElementById('modal');if(m&&!m.hidden){__clr();return true}return false});if(!up)break;await p.waitForTimeout(400)}await openTray(n);const box=await p.evaluate(n=>{const i=deck.findIndex(a=>a.n===n);const el=document.querySelector(`.card[data-i="${i}"]`);if(!el)return null;el.scrollIntoView({block:'center'});const h=el.querySelector('h4')||el;const r=h.getBoundingClientRect();const x=r.left+Math.min(r.width/2,40),y=r.top+r.height/2;const hit=document.elementFromPoint(x,y);return{x,y,inside:!!(hit&&el.contains(hit)),word:(el.innerText.match(/Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Rất vững|Vững/)||[''])[0],txt:el.innerText.replace(/\s+/g,' ').slice(0,400)}},n);
   if(!box)return null;await p.waitForTimeout(200);const b2=await p.evaluate(n=>{const i=deck.findIndex(a=>a.n===n);const el=document.querySelector(`.card[data-i="${i}"]`);const h=el.querySelector('h4')||el;const r=h.getBoundingClientRect();const x=r.left+Math.min(r.width/2,40),y=r.top+r.height/2;const hit=document.elementFromPoint(x,y);return{x,y,inside:!!(hit&&el.contains(hit))}},n);
   Object.assign(box,b2);return box};
  const one=async(v,tag)=>{await p.evaluate(()=>{__clr();__m4();__put("Giả mang thai",()=>pool())});
   const want=await p.evaluate(()=>{const a=deck.find(a=>a.n==="Giả mang thai");return{road:word(fpRoad(S,od(S.tamco),1,fpNoRec(S,wk()))),d:S.danh}});
   const box=await tapCard("Giả mang thai");if(OUT)await p.screenshot({path:`${OUT}/${dn}-${tag}-card.png`});
   await p.evaluate(v=>{window.__R0=Math.random;Math.random=()=>v},v);if(box&&box.inside)await p.touchscreen.tap(box.x,box.y);await p.waitForTimeout(400);await p.evaluate(()=>{Math.random=window.__R0});
   const after=await p.evaluate(d0=>{const T=document.getElementById('rtoast');return{seal:T&&T.classList.contains('on')?(T.querySelector('.seal')||{}).textContent:'none',fake:S.fake,preg:S.preg,dDanh:S.danh-d0}},want.d);
   if(OUT)await p.screenshot({path:`${OUT}/${dn}-${tag}-toast.png`});return{box,want,after}};
  R0.win=await one(0.0001,'win');R0.lose=await one(0.9999,'lose');
  /* the fake runs: counter-plays, tap «Báo sảy thai» */
  await p.evaluate(()=>{__clr();__m4();S.preg=3;S.fake=1;S.pregWk=wk();deal();tab="act";render()});
  R0.counter=await p.evaluate(()=>deck.filter(a=>/Hối lộ Kính sự phòng sửa sổ|Báo sảy thai/.test(a.n)).map(a=>a.n));
  const ex=await tapCard("Báo sảy thai");if(OUT)await p.screenshot({path:`${OUT}/${dn}-exit-card.png`});
  await p.evaluate(()=>{window.__R0=Math.random;Math.random=()=>0.0001});if(ex&&ex.inside)await p.touchscreen.tap(ex.x,ex.y);await p.waitForTimeout(400);await p.evaluate(()=>{Math.random=window.__R0});
  R0.exit=await p.evaluate(()=>({fake:S.fake,preg:S.preg}));R0.exitBox=ex&&{inside:ex.inside,word:ex.word};R0.errs=errs;res[dn]=R0;
  const W1=R0.win,L1=R0.lose;const chk=[
   [`${dn}: card word = whole road (${W1.want.road})`,W1.box&&W1.box.word===W1.want.road&&W1.box.word!=='Rất vững'],
   [`${dn}: card cites the real book`,W1.box&&/đêm cuối 7 tuần trước/.test(W1.box.txt)],
   [`${dn}: tap lands on the card`,W1.box&&W1.box.inside&&L1.box&&L1.box.inside&&ex&&ex.inside],
   [`${dn}: win → THÀNH + fake`,W1.after.seal==='THÀNH'&&W1.after.fake===1],
   [`${dn}: lose → BẠI + Danh lost`,L1.after.seal==='BẠI'&&!L1.after.fake&&L1.after.dDanh<0],
   [`${dn}: counter-plays on the tray`,R0.counter.length===2],
   [`${dn}: Báo sảy thai ends the fake`,R0.exit.fake===0&&R0.exit.preg===0],
   [`${dn}: no page error`,!errs.length]];
  for(const [n,ok] of chk)if(!ok)fails.push(n);await ctx.close()}
 console.log(JSON.stringify(res,null,1));console.log(fails.length?`FAIL delayed-risk-tap${MUT?' (MUTATE)':''}: `+fails.join(' · '):`PASS delayed-risk-tap${MUT?' (MUTATE — should have failed!)':''}: fold + ipad`);
 await b.close();process.exit(fails.length?1:0)})();
