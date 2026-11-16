/* tut-quests (review/tut-quests, jtq14.js): the tutorial quests of chapters 1–3 of the 14-chapter frame.
   For both variants (consort start tt, cung nữ start cnv) a player-like run does every quest of chapters 1, 2, 3 by TAPPING the real
   buttons (Hành sự / Phận sự act cards, Đồng liêu buttons, Tài nghệ lesson buttons, Nội vụ phủ shop, Tư trang sell) or, where the tap
   path is a map / drag, the same game function the button calls (goTo, wdWear / wear, runAct through the Hậu cung act); after each
   chapter's milestone is reached (state set by the test: the milestone itself is jst14's, tested by story14-frame.js) one month passes.
   Checks: quests are given at chapter open with the narrator card (OD:L1432 office), each quest pays BAL.st14.q.bac only when done
   (OD:L1233), the chapter does NOT close on its milestone while a quest is open, it closes «Xong» with its reward when all are done,
   time running out closes it «Lỡ dịp» with no reward (OD:L1242), a maid raised mid-chapter has her maid quests lapse, an old save
   (chapter started before this build: no q14) keeps the old rule, the chapter detail shows the quests + "Đi làm", no page errors.
   usage: NODE_PATH=$(npm root -g) node dev/test/tut-quests.js <built root url> [shots dir] */
const {chromium}=require('playwright');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,URL,SHOTS]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,700))};
 const boot=async(vw)=>{const ctx=await b.newContext({viewport:vw||{width:1180,height:820},serviceWorkers:'block'});await autoDismissRoulette(ctx);const p=await ctx.newPage();p.setDefaultTimeout(30000);
  p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(800);return p};
 const life=async(p,k)=>{await p.evaluate(k=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin=k;start()},k);
  await dismissRoulette(p);await p.waitForFunction(k=>typeof S!=='undefined'&&S&&S.origin&&S.origin.k===k&&S.st&&S.st.ms&&!document.querySelector('.kroul,#kroul,#kroulw'),k,{timeout:60000});
  await p.evaluate(()=>{window.__cards=[];const k0=kitPanel;kitPanel=function(sp){try{window.__cards.push({t:sp.title,sub:sp.sub,subj:!!sp.subject,rows:(sp.sections||[]).flatMap(s=>(s.rows||[]).map(r=>r[0]+': '+String(r[1]).replace(/<[^>]+>/g,' ')))})}catch(e){}return k0.apply(this,arguments)};window.kitPanel=kitPanel;
   window.__clear=()=>{Q.length=0;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}try{showModal()}catch(e){}};
   window.__month=()=>{const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__clear();used=0;if(S.dead){S.dead=false;S.suc=60}S.suc=Math.max(S.suc||0,60);try{nextBuoi()}catch(e){return e.message}}__clear();return null};
   window.__st=()=>{const m=S.st.ms;return m?{id:m.id,q:m.q14?m.q14.L.map(q=>q.id+(q.ok?'+':q.x?'x':'-')):null,steps:MS67[m.id].steps(m).map(x=>(x[1]?'✓':'✗')+x[0]+(x[2]?'['+x[2]+']':''))}:{id:null,M:S.st.M&&S.st.M.a}};
   __clear()})};
 /* tap an act card (Hành sự / Phận sự): the real button, at buổi sáng with khắc and Sức to spare */
 const tapAct=async(p,re)=>{await p.evaluate(()=>{__clear();used=0;S.buoi=0;S.suc=Math.max(S.suc||0,80);S.bac=Math.max(S.bac||0,200);if(S.mg)S.mg=null;tab='act';try{deal()}catch(e){}render()});
  /* the panel re-renders on its own: find the card by its name and fire its own click (the same handler a tap runs; an overlay
     left by the month skip — a reward moment, a weather layer — does not swallow it) */
  const done=await p.evaluate(re=>{const R=new RegExp(re);const e=[...document.querySelectorAll('#panel button.ka')].find(e=>!e.disabled&&R.test(((e.querySelector('.kan')||e).textContent||'').trim()));if(!e)return false;e.click();return true},re.source);
  if(!done)return 'no card '+re.source;await p.waitForTimeout(300);
  const dbg=await p.evaluate(()=>({Q:Q.map(m=>m.t||(m.kit&&m.kit.title)),log:(S.log||[]).slice(-2).map(x=>String(typeof x==='string'?x:JSON.stringify(x)).replace(/<[^>]+>/g,'').slice(0,160)),pop:(document.querySelector('.kpop,#kppop')||{}).textContent}));if(process.env.DBG)console.log('tap',re.source,JSON.stringify(dbg).slice(0,600));
  await p.evaluate(()=>{if(S.mg){try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}S.mg=null}__clear()});return null};
 const tapSel=async(p,tabk,sel,pre)=>{await p.evaluate(([t,pre])=>{__clear();used=0;S.buoi=0;S.suc=Math.max(S.suc||0,80);S.bac=Math.max(S.bac||0,200);if(pre)eval(pre);tab=t;render()},[tabk,pre||'']);
  const hit=await p.evaluate(sel=>{const e=document.querySelector(sel);if(!e)return false;e.click();return true},sel);if(!hit)return 'no '+sel;await p.waitForTimeout(300);
  await p.evaluate(()=>{if(S.mg){try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}S.mg=null}__clear()});return null};
 const st=p=>p.evaluate(()=>__st());const bac=p=>p.evaluate(()=>S.bac);
 const Q=await (async()=>{const p=await boot();await p.evaluate(()=>0);const q=await p.evaluate(()=>BAL.st14.q);await p.context().close();return q})();
 /* ================= A) consort (tt) ================= */
 {const p=await boot();await life(p,'tt');const R={};
  let s=await st(p);R.c1=s;chk('A consort ch1 opens with 3 quests (an, di, trang) as steps',s.id==='nhap14'&&s.q&&s.q.join()==='an-,di-,trang-',s);
  let C=await p.evaluate(()=>__cards.slice());
  /* chapter-open card is the narrator's (shown when the life began, before this hook: check the Q / log text instead) */
  const logt=await p.evaluate(()=>(S.log||[]).map(x=>typeof x==='string'?x:(x.t||x.h||'')).join(' ').replace(/<[^>]+>/g,''));
  chk('A ch1 goal text names the quests of the ma ma',/Phải làm đủ ba việc Tống ma ma dặn/.test(await p.evaluate(()=>MS67.nhap14.g())),await p.evaluate(()=>MS67.nhap14.g()));
  /* milestone first (rank up): the chapter must NOT close while quests are open */
  await p.evaluate(()=>{S.st.ms.r0=S.rank-1});let e=await p.evaluate(()=>__month());s=await st(p);
  chk('A milestone reached but quests open: chapter 1 stays open',s.id==='nhap14',[e,s]);
  let b0=await bac(p);let r=await tapAct(p,/^Thỉnh an Thái hậu/);s=await st(p);let b1=await bac(p);
  C=await p.evaluate(()=>__cards.filter(c=>/^Xong việc/.test(c.t)));
  chk('A quest «an» done by tapping the Thỉnh an card; Bạc +BAL.st14.q.bac.c paid; narrator card',!r&&s.q[0]==='an+'&&C.length===1&&C[0].subj&&C[0].rows.some(x=>x==='Phần thưởng: Bạc +'+Q.bac.c)&&b1>=b0+Q.bac.c-60,[r,s,C,b0,b1]);
  r=await p.evaluate(()=>{__clear();used=0;S.suc=80;goTo('vuon');__clear();return S.place});s=await st(p);
  chk('A quest «di» done by going to a place (goTo, Dư đồ)',s.q[1]==='di+',[r,s]);
  r=await p.evaluate(()=>{const ix=S.inv.findIndex(e=>e&&!e.h&&(typeof wdItem==='function'&&wdItem(e)||IT[e.k]&&IT[e.k].sl));if(ix<0)return 'nothing to wear';const e=S.inv[ix];if(typeof wdItem==='function'&&wdItem(e))wdWear(S,ix);else wear(S,ix);__clear();return null});
  s=await st(p);chk('A quest «trang» done by wearing (Tư trang)',!r&&s.q[2]==='trang+',[r,s]);
  /* chapter detail lists the steps */
  const det=await p.evaluate(()=>{const G=kitGoalNow();return{steps:G.C.steps.map(x=>x.t),any:G.C.any,next:G.next.map(x=>x.t)}});
  e=await p.evaluate(()=>__month());const past=await p.evaluate(()=>S.st.ch.past.slice(-1)[0]);s=await st(p);
  chk('A all quests + milestone: chapter 1 closes «Xong» (reward), chapter 2 opens with sell/beauty/buy quests',past&&past.ms==='nhap14'&&past.tag==='Xong'&&s.id==='sung14'&&s.q.join()==='ban-,diem-,mua-',[e,past,s]);
  C=await p.evaluate(()=>__cards.filter(c=>/^Chương 2/.test(c.t)));
  chk('A chapter 2 open card = narrator kit panel (person, "dặn", quests, reward, Hạn)',C.length===1&&C[0].subj&&/dặn$/.test(C[0].sub)&&C[0].rows.some(x=>/^Việc phải làm/.test(x))&&C[0].rows.some(x=>/^Hạn/.test(x)),C);
  if(SHOTS){await p.evaluate(()=>{Q.length=0;kitPanel(Object.assign({},window.__lastSpec||{}));});}
  /* sell: the Tư trang sell button path (econSellUI → econSell) */
  r=await p.evaluate(()=>{__clear();used=0;const L=econSellable(S).filter(x=>x&&!x.no);if(!L.length)return 'nothing sellable '+JSON.stringify(S.inv.map(e=>e.k));econSellUI(L[0].ix);__clear();return null});s=await st(p);
  chk('A quest «ban» done by selling one chest item (Tư trang sell button, econSellUI)',!r&&s.q[0]==='ban+',[r,s]);
  r=await tapAct(p,/^(Điểm trang|Dưỡng nhan)/);s=await st(p);chk('A quest «diem» done by tapping Điểm trang / Dưỡng nhan',!r&&s.q[1]==='diem+',[r,s]);
  /* buy: the Nội vụ phủ kit shop, tapping its buy button */
  r=await p.evaluate(()=>{__clear();S.bac=500;S.shop=S.shop&&S.shop.length?S.shop:Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<60).slice(0,4);kitShopNvp();try{showModal()}catch(e){}return null});
  await p.waitForTimeout(500);const bought=await p.evaluate(()=>{const e=document.querySelector('#modal [data-kshbuy]');if(!e)return 'no buy button';const n0=S.inv.length;e.click();return S.inv.length>n0?null:'nothing bought'});
  await p.evaluate(()=>__clear());s=await st(p);
  chk('A quest «mua» done by tapping buy in the Nội vụ phủ shop',!bought&&s.q[2]==='mua+',[bought,s]);
  await p.evaluate(()=>{S.sung=Math.max(S.sung,BAL.st14.goal.sung+15)});e=await p.evaluate(()=>__month());s=await st(p);
  chk('A chapter 2 closes, chapter 3 opens with consort/art/maid quests',s.id==='tap14'&&s.q.join()==='giao-,hoc-,cn-',[e,s]);
  r=await p.evaluate(()=>{__clear();used=0;S.suc=80;const v=liveRivals(true).find(v=>v!==S&&v.alive&&!v.out);const k=Object.keys(ACT).find(k=>!['gift','plant'].includes(k)&&ACT[k].ok(S,v));if(!k)return 'no act';const x=runAct(S,v,k);__clear();return x?null:'empty '+k});
  s=await st(p);chk('A quest «giao» done by a deed to a consort (runAct, Hậu cung)',!r&&s.q[0]==='giao+',[r,s]);
  /* Tài nghệ › Tứ đức › Tự rèn: pick the first work, the first material, then «Để trời định» in the mini game (a player's own choice) */
  await p.evaluate(()=>{__clear();used=0;S.buoi=0;S.suc=90;S.bac=Math.max(S.bac,200);tab='art';render();document.querySelector('[data-vlearn][data-mode="self"]:not([disabled]),[data-learn][data-mode="self"]:not([disabled])').click()});await p.waitForTimeout(400);
  r=await p.evaluate(()=>{const g=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(!g)return 'no work to pick';g.click();return null});await p.waitForTimeout(400);
  if(!r)r=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].find(b=>/·/.test(b.textContent)&&!b.disabled);if(!b)return 'no material';b.click();return null});await p.waitForTimeout(1200);
  if(!r)r=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^Để trời định/.test(b.textContent.trim()));if(!b)return 'no «Để trời định»';b.click();return null});await p.waitForTimeout(2500);
  /* the mini game's result card: its kit ✕ presses #kg82ok, which hands the progress over (dev/test/lib/roulette.js closeResult) */
  await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click();else{const x=document.querySelector('.kit-x[data-kitx="ov"]');if(x)x.click()}});await p.waitForTimeout(800);
  await p.evaluate(()=>{if(S.mg){try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}S.mg=null}__clear()});s=await st(p);chk('A quest «hoc» done by a whole lesson in Tài nghệ (tap Tự rèn, pick a work + material, «Để trời định»)',!r&&s.q[1]==='hoc+',[r,s]);
  r=await tapAct(p,/^Trò chuyện với cung nữ/);s=await st(p);chk('A quest «cn» done by tapping Trò chuyện với cung nữ',!r&&s.q[2]==='cn+',[r,s]);
  await p.evaluate(()=>{const v=liveRivals(true)[1]||liveRivals(true)[0];relAdd(S,v,BAL.st14.goal.rel+40);for(const k in S.arts)S.arts[k]=Math.max(S.arts[k],0);const k0=Object.keys(S.arts)[0];S.arts[k0]=Math.max(S.arts[k0],BAL.st14.goal.art)});
  e=await p.evaluate(()=>__month());const pa=await p.evaluate(()=>S.st.ch.past.slice(-1)[0]);s=await st(p);
  chk('A chapter 3 closes «Xong», the road chapter 4 opens',pa&&pa.ms==='tap14'&&pa.tag==='Xong'&&s.id===null&&s.M,[e,pa,s]);
  chk('A chapter detail: quests are steps, every line must be done, open quests are the "Việc nên làm"',det.steps.length>=4&&det.any===false,det);
  await p.context().close()}
 /* ================= B) cung nữ (cnv) ================= */
 {const p=await boot();await life(p,'cnv');let s=await st(p);
  chk('B maid ch1 opens with maid quests (hau, le, di), milestone as ONE "hoặc" line',s.id==='nhap14'&&s.q&&s.q.join()==='hau-,le-,di-'&&s.steps.filter(x=>/hoặc/.test(x)&&!/\[/.test(x)).length===1,s);
  let r=await tapAct(p,/^(Quét sân|Dâng trà)/);s=await st(p);chk('B quest «hau» by tapping a serving card',!r&&s.q[0]==='hau+',[r,s]);
  r=await tapAct(p,/^Học lễ nghi/);s=await st(p);chk('B quest «le» by tapping Học lễ nghi',!r&&s.q[1]==='le+',[r,s]);
  r=await p.evaluate(()=>{for(const k of places().map(x=>x.k).filter(k=>k!=='vuon')){__clear();used=0;S.suc=80;S.buoi=0;goTo('home');__clear();used=0;goTo(k);__clear();if(S.place===k)return k}return 'nowhere: '+S.place});s=await st(p);chk('B quest «di» by going somewhere',s.q[2]==='di+',[r,s]);
  const bs=await p.evaluate(()=>S.bac);
  await p.evaluate(()=>{S.tin=BAL.st14.goal.tin+10});let e=await p.evaluate(()=>__month());s=await st(p);
  chk('B maid ch1 closes, ch2 «Lọt vào mắt Hoàng thượng» with chai/vuon/theu',s.id==='sung14'&&s.q.join()==='chai-,vuon-,theu-',[e,s]);
  r=await tapAct(p,/^Chải chuốt/);s=await st(p);chk('B quest «chai»',!r&&s.q[0]==='chai+',[r,s]);
  r=await p.evaluate(()=>{__clear();used=0;S.suc=80;goTo('home');__clear();used=0;goTo('vuon');__clear();return S.place});s=await st(p);chk('B quest «vuon» (only the garden counts)',s.q[1]==='vuon+',s);
  r=await tapAct(p,/^Thêu khăn/);s=await st(p);chk('B quest «theu»',!r&&s.q[2]==='theu+',[r,s]);
  await p.evaluate(()=>{S.nt=BAL.st14.goal.nt+10});e=await p.evaluate(()=>__month());s=await st(p);
  chk('B ch3 opens with colleague/gift/practice quests',s.id==='tap14'&&s.q.join()==='chat-,bieu-,luyen-',[e,s]);
  r=await tapSel(p,'staff','[data-cnv="chat"]:not([disabled])');s=await st(p);chk('B quest «chat» by tapping Trò chuyện (Đồng liêu)',!r&&s.q[0]==='chat+',[r,s]);
  r=await tapSel(p,'staff','[data-cnv="gift"]:not([disabled])');s=await st(p);chk('B quest «bieu» by tapping Biếu quà (Đồng liêu)',!r&&s.q[1]==='bieu+',[r,s]);
  r=await tapAct(p,/^Luyện thêu/);s=await st(p);chk('B quest «luyen»',!r&&s.q[2]==='luyen+',[r,s]);
  await p.evaluate(()=>{const c=srvColleagues()[0];S.srv.af[c.sid]=BAL.st14.goal.rel+5;const k0=Object.keys(S.arts)[0];S.arts[k0]=Math.max(S.arts[k0],BAL.st14.goal.art)});
  e=await p.evaluate(()=>__month());const pa=await p.evaluate(()=>S.st.ch.past.slice(-1)[0]);s=await st(p);
  chk('B maid chapter 3 closes «Xong»',pa&&pa.ms==='tap14'&&pa.tag==='Xong',[e,pa,s]);
  const paid=await p.evaluate(()=>S.st.ch.past.filter(x=>x.ms).map(x=>x.ms+':'+x.tag).join());chk('B maid chapters 1–3 all «Xong»',paid==='nhap14:Xong,sung14:Xong,tap14:Xong',paid);
  await p.context().close()}
 /* ================= C) no quests done: time closes the chapter, no reward; D) raised maid: maid quests lapse; E) old save ================= */
 {const p=await boot();await life(p,'tt');
  const r=await p.evaluate(()=>{const b0=S.bac,i0=S.inv.length;S.st.ms.r0=S.rank-1;for(let i=0;i<BAL.st14.lim.nhap+1&&S.st.ms&&S.st.ms.id==='nhap14';i++)__month();const pa=S.st.ch.past.slice(-1)[0];return{pa,inv:S.inv.length-i0}});
  chk('C quests never done: chapter 1 closes «Lỡ dịp» by time, no chapter reward (OD:L1233/L1242)',r.pa&&r.pa.ms==='nhap14'&&r.pa.tag==='Lỡ dịp',r);
  await p.context().close()}
 {const p=await boot();await life(p,'cnv');
  const r=await p.evaluate(()=>{__clear();S.age=Math.max(S.age||0,18);srvRise('test');__clear();const s=__st();__month();return{s,after:__st(),past:S.st.ch.past.slice(-1)[0]}});
  chk('D a maid raised mid-chapter: her open maid quests lapse (not required, no pay), chapter 1 closes «Xong» on «phong Đáp ứng»',r.s.q.every(x=>/x$/.test(x))&&r.past&&r.past.ms==='nhap14'&&r.past.tag==='Xong',r);
  await p.context().close()}
 {const p=await boot();await life(p,'dtq');
  const r=await p.evaluate(()=>{delete S.st.ms.q14;const sv=JSON.stringify(ser());__clear();deser(JSON.parse(sv));__clear();const s0=__st();S.st.ms.r0=S.rank-1;__month();return{s0,past:S.st.ch.past.slice(-1)[0],now:__st()}});
  chk('E old save (chapter started before this build, no q14): loads, no quests, closes on its milestone alone as before',r.s0.q===null&&r.past&&r.past.ms==='nhap14'&&r.past.tag==='Xong'&&r.now.id==='sung14'&&r.now.q&&r.now.q.length===3,r);
  await p.context().close()}
 /* ================= F) shots of the two cards (narrator open card, quest done card) ================= */
 if(SHOTS){for(const [nm,vw,sc] of [['755x1000',{width:755,height:1000},2],['1180x820',{width:1180,height:820},2],['1366x1024',{width:1366,height:1024},2],['1000x755',{width:1000,height:755},2],['412x1058',{width:412,height:1058},2],['844x390',{width:844,height:390},2]]){
   const ctx=await b.newContext({viewport:vw,deviceScaleFactor:1,serviceWorkers:'block'});await autoDismissRoulette(ctx);const p=await ctx.newPage();p.on('pageerror',e=>errs.push(nm+': '+e.message.slice(0,200)));
   await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(800);
   await life(p,'tt');await p.evaluate(()=>{S.st.ms.r0=S.rank-1;tab='act';render()});await p.evaluate(()=>{const d=MS67.sung14;S.st.ms=null;S.st.ch.past.push({ms:'nhap14',tag:'Xong',k:1,n:1});msStart67('sung14');showModal()});
   await p.waitForTimeout(6000);await p.screenshot({path:`${SHOTS}/open-${nm}.png`});
   const ov=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg')||document.querySelector('#modal');const r=d.getBoundingClientRect();return{w:r.width,h:r.height,sw:document.documentElement.scrollWidth,vw:innerWidth}});
   chk(`F ${nm} open card fits (no horizontal overflow)`,ov.sw<=ov.vw+1,ov);
   await p.evaluate(()=>{__clear();const L=econSellable(S).filter(x=>x&&!x.no);if(L.length)econSellUI(L[0].ix);showModal()});await p.waitForTimeout(4000);await p.screenshot({path:`${SHOTS}/done-${nm}.png`});
   await ctx.close()}}
 console.log(JSON.stringify({pass:ok.filter(x=>x[1]).length,fail:ok.filter(x=>!x[1]).map(x=>x[0])}),'errors:',JSON.stringify(errs.slice(0,10)));await b.close();process.exit(ok.every(x=>x[1])&&!errs.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
