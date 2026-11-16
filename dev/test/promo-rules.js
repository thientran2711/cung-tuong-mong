/* review/promo-rules (owner 15/11 20:05Z): birth rules, servant-road exams, promotion rewards (KIT §65), rank-change FX (KIT §66).
   usage: node dev/test/promo-rules.js <url> [oldBuildUrl|-] [outdir|-] [WxH@dpr ...]
   Logic (first size): son birth = rank +1 at once (no exam); daughter birth = exam granted, conditions waived; promotion → rank set in Tư trang
   (y phục + trâm of the new phẩm, Đeo tay, Túi thơm, extras), chest kitReward «Phẩm phục …» with the head mark, a new servant + kitPersonReveal;
   NPC promotion → set + data only; servant road: merit opens an exam window + card «Khảo hạch Nội vụ phủ», pass → rank +1 + pouch, fail →
   cooldown; NPC servants roll the exam (seeded); ma ma choice = exam; demotion / cold palace → kitGloom with the cracking chip (.kmdown);
   old save loads silently (no chest for the past). Every size: chest list, person reveal, rank-down stage — no overflow, button in view. */
const {chromium}=require('playwright');const KM=require('./lib/kmscene');const args=process.argv.slice(2);const URL=args[0],OLD=args[1]&&args[1]!=='-'?args[1]:null,OUT=args[2]&&args[2]!=='-'?args[2]:null;
let SIZES=args.slice(3);if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3'];
const boot=async(p,u,srv)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(srv=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<80;i++){start();if(srv?isSrv():(!isSrv()&&S.rank<=2))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200;S.suc=90;render()},!!srv)};
const clearOv=p=>p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
(async()=>{const b=await chromium.launch();const errs=[];const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,180)]);
 for(const [si,SZ] of SIZES.entries()){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});await KM.use(ctx);/* KIT §81: scenes wait for their end button */const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);await boot(p,URL);
  if(si===0){
   /* 1. son birth: decree at once */
   const s=await p.evaluate(()=>{const rk=S.rank;S.preg=9;const k0=Math.random;let t;Math.random=()=>0.99;try{t=birthP(S)}finally{Math.random=k0}
    return{rk,after:S.rank,grace:S.ex&&S.ex.grace,t:String(t).replace(/<[^>]+>/g,'')}});
   ok(s.after===s.rk+1&&!s.grace&&/không qua khảo hạch/.test(s.t),'son birth → promoted at once, no exam',s.t.slice(0,150));
   await p.evaluate(()=>render());await p.waitForTimeout(300);await clearOv(p);
   /* 2. daughter birth: exam granted, conditions waived */
   const g=await p.evaluate(()=>{const rk=S.rank;S.sung=0;S.danh=0;S.lastPromo=S.turn;S.preg=9;const k0=Math.random;let i=0;let t;Math.random=()=>{i++;return i===3?0.1:0.99};
    try{const m0=mkKid;mkKid=(sx,a)=>m0("f",a);try{t=birthP(S)}finally{mkKid=m0}}finally{Math.random=k0}render();
    return{rk,after:S.rank,grace:S.ex.grace,to:S.ex.to,elig:exElig(S),row:promoReq().slice(-1)[0],w1:S.ex.w1,card:deck.some(x=>x.exam),t:String(t).replace(/<[^>]+>/g,'')}});
   ok(g.after===g.rk&&g.grace===g.to&&g.elig&&g.w1!=null&&g.card,'daughter birth → exam at once, conditions waived (window + card)',g.t.slice(0,140)+' | '+JSON.stringify(g.row));
   await clearOv(p);
   /* 3. promotion: set + chest + servant reveal */
   const r=await p.evaluate(async()=>{const rk=S.rank,n0=S.inv.length,st0=S.staff.length;const cap0=capOf(S);KFX.rewards=0;window.__prRev=0;
    S.rank++;render();await new Promise(r=>setTimeout(r,400));const add=S.inv.slice(n0);
    const P=S.rank+1;const wd=add.filter(e=>WD_ITEMS[e.k]);return{rk,now:S.rank,keys:add.map(e=>e.k),wdP:wd.map(e=>WD_ITEMS[e.k].P+':'+WD_ITEMS[e.k].sl),P,
     wrist:add.some(e=>IT[e.k]&&IT[e.k].sl==="wrist"),scent:add.some(e=>IT[e.k]&&IT[e.k].sl==="scent"),nvp:add.every(e=>e.from==="nvp"),st:S.staff.length-st0,cap0,cap1:capOf(S),
     rewards:KFX.rewards,rev:window.__prRev,ov:[...document.querySelectorAll('.kmov')].map(e=>e.className)}});
   ok(r.now===r.rk+1&&r.wdP.includes(r.P+':y')&&r.wdP.includes(r.P+':tram')&&r.wrist&&r.scent&&r.keys.length>=6&&r.nvp,'promotion → full rank set as real items (y phục + trâm of the new phẩm, Đeo tay, Túi thơm, extras), from Nội vụ phủ',r.keys.join(','));
   ok(r.st===1&&r.rev===1,'promotion → one new servant assigned + person reveal queued',`staff +${r.st}, cap ${r.cap0}→${r.cap1}`);
   const ch=await p.evaluate(async()=>{for(let i=0;i<40&&!document.querySelector('.km-reward .km-done');i++){const o=document.querySelector('.kmov.km-reward:not(.km-prev)');if(o)o.click();
     const e=document.querySelector('.kmov.km-edict');if(e)e.click();__kmNext();await new Promise(r=>setTimeout(r,250))}const L=document.querySelector('.km-reward .kmlist');return{t:L?L.innerText:'',ttl:(document.querySelector('.km-reward .kmrew-h')||{}).innerText||''}});
   ok(/Phẩm phục/.test(ch.ttl)&&/Dấu ấn/.test(ch.t),'chest «Phẩm phục …» lists the set and the head mark',ch.ttl.replace(/\s+/g,' ')+' | '+ch.t.replace(/\s+/g,' ').slice(0,120));
   const pv=await p.evaluate(async()=>{const c=document.querySelector('.km-reward [data-km-close]');if(c)c.click();for(let i=0;i<30&&!document.getElementById('kprevov');i++)await new Promise(r=>setTimeout(r,200));
    const o=document.getElementById('kprevov');const im=o&&o.querySelector('.kprev-img');await new Promise(r=>setTimeout(r,800));return{on:!!o,src:im&&im.getAttribute('src'),t:o?o.innerText:''}});
   ok(pv.on&&/fig-/.test(pv.src||'')&&/Nội vụ phủ phụ cấp thêm/.test(pv.t),'person reveal: full-body figure + «Nội vụ phủ phụ cấp thêm …» + Nhận',(pv.src||'').split('/').pop()+' | '+pv.t.replace(/\s+/g,' ').slice(0,120));
   await clearOv(p);
   /* 4. NPC promotion: data only */
   const n=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&x.rank<4);prNpcScan();const n0=(v.inv||[]).length,s0=(v.staff||[]).length;v.rank++;prNpcScan();const add=(v.inv||[]).slice(n0);
    return{keys:add.map(e=>e.k),P:v.rank+1,y:add.some(e=>WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='y'&&WD_ITEMS[e.k].P===v.rank+1),ov:document.querySelectorAll('.kmov').length,staff:(v.staff||[]).length-s0}});
   ok(n.y&&n.keys.length>=6&&n.ov===0,'NPC promotion → the same set, no screens',n.keys.join(',')+` staff +${n.staff}`);
   /* 5. demotion and cold palace: kitGloom with the cracking chip */
   const dm=await p.evaluate(async()=>{await new Promise(r=>setTimeout(r,200));const o={};S.rank=Math.max(1,S.rank)-1;render();await new Promise(r=>setTimeout(r,500));
    const g=document.querySelector('.kmov.km-gloom');o.down=!!(g&&g.querySelector('.kmdown .kmcrack .kmck-a'));o.chip=g?(g.querySelector('.kmchip-down')||{}).textContent:'';document.querySelectorAll('.kmov').forEach(e=>e.remove());kmBusy=false;KMQ.length=0;
    S.out=1;S.coldWhy="Bị vu oan.";render();await new Promise(r=>setTimeout(r,500));const g2=document.querySelector('.kmov.km-gloom');o.cold=!!(g2&&g2.querySelector('.kmdown-cold'));o.chip2=g2?(g2.querySelector('.kmchip-down')||{}).textContent:'';
    document.querySelectorAll('.kmov').forEach(e=>e.remove());kmBusy=false;KMQ.length=0;S.out=0;render();return o});
   ok(dm.down&&dm.cold&&dm.chip2==='Lãnh cung','demotion / cold palace → chip cracks and falls, frame greys (.kmdown)',JSON.stringify(dm));
   await clearOv(p);
   /* 6. old save: silent */
   if(OLD){const p2=await ctx.newPage();p2.on('pageerror',e=>errs.push('old '+e.message.slice(0,200)));await boot(p2,OLD);const sv=await p2.evaluate(()=>JSON.stringify(ser()));await p2.close();
    const o=await p.evaluate(async s=>{deser(JSON.parse(s));Q.length=0;window.__prN=0;render();await new Promise(r=>setTimeout(r,300));return{seen:S.prSeen,n:window.__prN,ov:document.querySelectorAll('.kmov.km-reward').length}},sv);
    ok(o.seen&&o.seen.r!=null&&o.n===0&&o.ov===0,'old save loads: rank seen set silently, no chest for the past',JSON.stringify(o))}
   /* 7. servant road */
   await boot(p,URL,true);
   const sv=await p.evaluate(()=>{const o={srv:isSrv(),rk:S.srv.rk};S.srv.lau=0;S.tin=60;S.srv.mp=99;const need=(S.srv.rk+1)*5;S.tuan=2;
    const m=srvM();try{srvMonth()}catch(e){o.err=e.message}deal();render();o.after=S.srv.rk;o.ex=S.srv.ex;o.card=deck.some(a=>a&&a.exam===2);const c=deck.find(a=>a&&a.exam===2);o.h=c?cardH(c,0).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,200):'';return o});
   ok(sv.srv&&sv.after===sv.rk&&sv.ex&&sv.ex.w1!=null&&sv.card,'servant road: merit opens an exam (no rise yet) + card «Khảo hạch Nội vụ phủ»',sv.h);
   const sp=await p.evaluate(async()=>{const rk=S.srv.rk;const B=BAL.ex.srvBar.slice();BAL.ex.srvBar=[0,0,0,0,0,0];window.__exAuto=1;const n0=S.inv.length;exSrvStart();BAL.ex.srvBar=B;window.__exAuto=0;window.__prN=0;render();await new Promise(r=>setTimeout(r,300));
    return{rk,now:S.srv.rk,add:S.inv.slice(n0).map(e=>e.k),pr:window.__prN,pouch:!!document.querySelector('.kmrew-pouch')}});
   ok(sp.now===sp.rk+1&&sp.add.length>=2&&sp.pr===1,'servant exam pass → rank +1 + servant-road set (pouch)',`${sp.rk}→${sp.now} ${sp.add.join(',')}`);
   await clearOv(p);
   const sf=await p.evaluate(()=>{S.srv.ex={to:S.srv.rk+1};exSrvOpen(S.srv.rk+1);const rk=S.srv.rk;const B=BAL.ex.srvBar.slice();BAL.ex.srvBar=[99,99,99,99,99,99];window.__exAuto=1;exSrvStart();BAL.ex.srvBar=B;window.__exAuto=0;
    return{rk,now:S.srv.rk,cd:S.srv.ex.cd,turn:S.turn,gate:exSrvGate(S.srv.rk+1),card:deck.some(a=>a&&a.exam===2)}});
   ok(sf.now===sf.rk&&sf.cd>sf.turn&&sf.gate&&!sf.card,'servant exam fail → no rise, cooldown, gate holds the rise',JSON.stringify(sf));
   const mm=await p.evaluate(()=>{S.srv.ex={};exSrvMama();return{to:S.srv.ex.to,w1:S.srv.ex.w1,mama:!!S.srv.mama}});
   ok(mm.to==='mama'&&mm.w1!=null&&!mm.mama,'«Ở lại làm ma ma» → exam window (no flag yet)',JSON.stringify(mm));
   const ns=await p.evaluate(()=>{let pass=0,fail=0;const s={sid:4242,role:'maid',rk:1,loyal:50};for(let t=0;t<60;t++){S.turn+=1;s.exCd=0;if(exSrvNpc(s))pass++;else fail++}
    const a=exSrvNpc(Object.assign({},s,{exCd:0})),b2=exSrvNpc(Object.assign({},s,{exCd:0}));return{pass,fail,same:a===b2}});
   ok(ns.pass>0&&ns.fail>0&&ns.same,'NPC servants roll the exam (both outcomes, seeded = same on both co-op clients)',JSON.stringify(ns));
   await boot(p,URL)}
  /* every size: chest, person reveal, rank-down */
  const shot=async n=>{const m=await p.evaluate(()=>{const o=[...document.querySelectorAll('.kmov')].pop()||document.body;const sw=document.documentElement.scrollWidth-innerWidth;const bt=o.querySelector('[data-km-close]');const br=bt&&bt.getBoundingClientRect();
    const clip=[...o.querySelectorAll('b,small,p,button,.kprev-n')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.slice(0,24)).slice(0,3);
    const im=o.querySelector('.kprev-img');const fig=o.querySelector('.kprev-fig');const fr=fig&&fig.getBoundingClientRect(),ir=im&&im.getBoundingClientRect();
    return{sw,btn:bt?(br.bottom<=innerHeight+1&&br.top>=0):null,clip,fig:fr?Math.round(fr.height):null,img:ir?Math.round(ir.height):null}});
   ok(m.sw<=0&&m.btn!==false&&!m.clip.length,`${SZ} ${n}: no overflow / clipping, button in view`,JSON.stringify(m));if(OUT)await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:55})};
  await p.evaluate(async()=>{S.rank=Math.min(5,S.rank+1);render();for(let i=0;i<40&&!document.querySelector('.km-reward .km-done');i++){const o=document.querySelector('.kmov.km-reward');if(o)o.click();const e=document.querySelector('.kmov.km-edict');if(e)e.click();__kmNext();await new Promise(r=>setTimeout(r,250))}});
  await p.waitForTimeout(400);await shot('chest');
  await p.evaluate(async()=>{const c=document.querySelector('.km-reward [data-km-close]');if(c)c.click();for(let i=0;i<30&&!document.getElementById('kprevov');i++)await new Promise(r=>setTimeout(r,200))});await p.waitForTimeout(900);
  if(await p.evaluate(()=>!!document.getElementById('kprevov')))await shot('reveal');else ok(false,`${SZ} reveal shown`);
  /* rank down mid-animation (motion on): the chip cracks and falls, the frame greys */
  await clearOv(p);await p.emulateMedia({reducedMotion:'no-preference'});await p.evaluate(()=>{OPT.fxon=true;if(!window.__kmS0){window.__kmS0=kmStage;kmStage=function(c,h,o){return window.__kmS0(c,h,Object.assign({},o,{dur:600000}))}}const r=Math.max(1,S.rank);kitGloom({title:`Bị giáng xuống ${kmRankName(r-1)}`,sub:`Từ ${kmRankName(r)} xuống ${kmRankName(r-1)}.`,from:r,to:r-1})});
  await p.evaluate(()=>{const o=document.querySelector('.kmov.km-gloom');if(o)o.getAnimations({subtree:true}).forEach(a=>{try{a.pause();a.currentTime=1450}catch(e){}})});await p.waitForTimeout(300);await shot('down');await clearOv(p);await p.emulateMedia({reducedMotion:'reduce'});
  await ctx.close()}
 for(const t of T)console.log(t.join('  '));console.log('page errors:',errs.length?errs:'none');const bad=T.filter(t=>t[0]==='FAIL').length;console.log(`${T.length-bad}/${T.length} pass`);await b.close();process.exit(bad||errs.length?1:0)})();
