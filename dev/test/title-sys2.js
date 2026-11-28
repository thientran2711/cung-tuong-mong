/* review/title-sys2 (owner 16/11 13:00Z / 13:20Z (2)(4)(5) / 13:30Z (3)): TITLE SYSTEM phase 2 (jdh2.js).
   usage: node dev/test/title-sys2.js <page URL> <outdir> [WxH@dpr]
   Logic (her AND an NPC, same rules): threshold check dhHieuOK (below / above, every number from BAL.dh.hieu), monthly grant, bestow grant
   (no roll), book + seal (keep, never sold / given), old save with a hiệu gets them once; punishment → confiscation through EVERY route
   (punish cấm túc, demote, cold, an inline rank drop) by the weekly state check; atonement opens after BAL.dh.conf.wait months, both roads
   (Chép kinh / lập công) restore everything; loss → a jlost case for THAT piece, investigation dialog, closed case not back → Danh penalty once;
   census: the piece is never gone (removed by force → Nội vụ phủ store → back home), never two; save JSON round-trip.
   UI: grant reward panel, confiscation notice, Nhiệm vụ › Danh hiệu with the hiệu + atonement sections, the loss dialog with the item frame;
   no horizontal overflow; 0 page errors. Shots in <outdir>. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const R={errs:[],fail:[]};
 const [wh,d]=(SZ||'755x1000@2').split('@');const [W,H]=wh.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof dhHieuOK==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
 const fresh=()=>p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});
 const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e){e.hidden=true;if(id==='dawn')e.innerHTML=''}}});
 await fresh();await sleep(800);await clean();
 /* ---------------- 1. logic ---------------- */
 R.logic=await p.evaluate(()=>{const F=[],o={};const B=BAL.dh;const has=(q,k)=>(q.inv||[]).filter(e=>e&&e.k===k&&e.dhid&&e.own===(q===S?'me':String(q.id))).length;
  BAL.dh.it.lose=0;/* no random loss during the logic run (forced below) */const ready=q=>{q.rank=q===S?4:4;if(q!==S)q.queen=false;q.out=false;q.confined=0;q.hieu='';delete q.dhConf;q.lastPromo=S.turn-B.hieu.gapM;const N=dhHieuNeed(q);q.sung=N.sung;q.danh=N.danh;return N};
  if(S.rank==null)F.push('no rank');
  /* thresholds (one core: the shown numbers ARE the rule) */
  const N=ready(S);if(N.sung!==RANKS[4].s+B.hieu.sung||N.danh!==RANKS[4].d+B.hieu.danh)F.push('need not from BAL '+JSON.stringify(N));
  if(!dhHieuOK(S).ok)F.push('eligible her refused: '+dhHieuOK(S).why);S.sung=N.sung-1;if(dhHieuOK(S).ok)F.push('Sủng below accepted');S.sung=N.sung;
  S.rank=B.hieu.minRank-1;if(dhHieuOK(S).ok)F.push('rank below accepted');ready(S);S.confined=1;if(dhHieuOK(S).ok)F.push('cấm túc accepted');ready(S);
  S.lastPromo=S.turn;if(dhHieuOK(S).ok)F.push('gap ignored');ready(S);
  /* the grant: hiệu + book + seal + Danh */
  /* stat-pace (jstatpace spG, LIVE since 4cfcda61): the +danhG rise goes through the ONE rise rule (size band + slowdown), so the expected value is what spG gives */
  Q.length=0;const d0=S.danh;const dx=typeof spG==='function'?spG('danh',S,d0,B.hieu.danhG,S.rank|0,'danh',1):B.hieu.danhG;const h=dhHieuGrant(S,'month');o.grant=h;if(!h||S.hieu!==h)F.push('no hiệu granted');if(S.danh!==Math.min(100,d0+dx))F.push('Danh not +danhG (paced '+dx+') '+d0+'>'+S.danh);
  if(has(S,'sacphong')!==1||has(S,'ngocan')!==1)F.push('book/seal not in chest');if(!Q.some(m=>m.kit&&m.kit.kind==='reward'))F.push('no reward panel');
  if(!/^[^ ]+ phi$/.test(rkName(S)))F.push('hiệu not joined to rank: '+rkName(S));Q.length=0;
  /* never sold / given */
  const ix=S.inv.findIndex(e=>e.k==='sacphong');if(!econNo(S,S.inv[ix]))F.push('book sellable');if(sellItem(S,ix))F.push('sellItem sold the book');
  const v0=liveRivals(true).filter(x=>!x.queen)[0];if(giveTo(S,v0,ix))F.push('book given away');if(has(S,'sacphong')!==1)F.push('book left the chest');
  if(typeof giftBagFor==='function'&&giftBagFor(v0).some(x=>x.e&&x.e.dhid))F.push('book in the gift bag');
  /* monthly grant: eligible NPC, same rule (rolls: force p=100) */
  const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const v=L[0],w=L[1];ready(v);const p0=B.hieu.p;B.hieu.p=100;dhMonth();B.hieu.p=p0;o.npcHieu=v.hieu;
  if(!v.hieu)F.push('NPC eligible not granted');if(has(v,'sacphong')!==1||has(v,'ngocan')!==1)F.push('NPC book/seal');if(v.hieu===S.hieu)F.push('duplicate hiệu');
  /* bestow: no roll, threshold only */
  ready(w);w.sung=0;bestow(w,'son');if(w.hieu)F.push('bestow granted below threshold');ready(w);bestow(w,'son');if(!w.hieu)F.push('bestow eligible not granted');
  /* old save: a hiệu without items → given once, quietly */
  const u=L[2];u.hieu='Tĩnh';u.inv=(u.inv||[]).filter(e=>!e.dhid);delete u.dhSeed;Q.length=0;dhWeek();if(has(u,'sacphong')!==1||has(u,'ngocan')!==1)F.push('old save hiệu not given items');dhWeek();if(has(u,'sacphong')!==1)F.push('old save items doubled');
  /* ---- confiscation through every route (weekly state check) ---- */
  dhWeek();/* snapshots */
  /* her: cold palace → hiệu + items + worn title taken */
  S.dh=S.dh||{};S.dh.w_kim={n:(BAL.dh.T.w_kim.n||BAL.dh.n0)[0]};dhSync(S,true);dhWear(S,'w_kim');const h0=S.hieu,dn=S.danh,sg=S.sung;Q.length=0;
  cold('Ngươi phạm tội khi quân');dhWeek();o.confHer=S.dhConf;
  if(S.hieu)F.push('hiệu kept in lãnh cung');if(!S.dhConf||S.dhConf.hieu!==h0)F.push('dhConf.hieu');if(S.titleWorn)F.push('title still worn');if(!(S.dh.w_kim||{}).conf)F.push('title not flagged conf');
  if(has(S,'sacphong')||has(S,'ngocan'))F.push('items still in chest');const st=(S.il&&S.il.box||[]).filter(x=>x.e&&x.e.dhid&&x.e.own==='me'&&x.why==='conf');if(st.length!==2)F.push('items not in Nội vụ phủ store '+st.length);
  if(!(S.danh<=dn-B.conf.danh+0.001||S.danh===0))F.push('Danh not -conf.danh');if(!Q.some(m=>m.kit&&m.kit.kind==='notice'&&/thu/i.test(m.t)))F.push('no confiscation notice');
  if(!/lãnh cung/.test(S.dhConf.why))F.push('reason not kept: '+S.dhConf.why);if(dhWear(S,'w_kim'),S.titleWorn)F.push('confiscated title wearable');
  if(dhHieuOK(S).ok)F.push('grant while confiscated');Q.length=0;
  /* atonement waits (lãnh cung blocks), then opens; road A: Chép kinh */
  S.turn+=B.conf.wait+1;dhMonth();if(S.dhConf.open)F.push('opened inside lãnh cung');S.out=0;S.rank=3;dhWeek();Q.length=0;dhMonth();if(!S.dhConf.open)F.push('atonement not opened');
  Q.length=0;S.dh.m_kinh=S.dh.m_kinh||{n:0};S.dh.m_kinh.n+=B.conf.kinh;dhMonth();const dl=Q.find(m=>m.pid==='dhatone');if(!dl)F.push('no atonement dialog');
  else{dl.opts[0].go()}o.after=[S.hieu,has(S,'sacphong'),has(S,'ngocan'),!!(S.dh.w_kim||{}).conf,!!S.dhConf];
  if(S.hieu!==h0)F.push('hiệu not back');if(has(S,'sacphong')!==1||has(S,'ngocan')!==1)F.push('items not back');if((S.dh.w_kim||{}).conf)F.push('title not back');if(S.dhConf)F.push('dhConf left');
  if((S.il.box||[]).some(x=>x.e&&x.e.dhid&&x.e.own==='me'))F.push('store still holds her pieces');Q.length=0;
  /* NPC: demote (giáng phẩm) with odds forced 100 → hiệu; road B lập công */
  dhWeek();const P0=JSON.stringify(B.conf.p);B.conf.p.giang=[100,100];const hv=v.hieu;demote(v,'phạm cung quy');dhWeek();B.conf.p=JSON.parse(P0);
  if(v.hieu||!v.dhConf||v.dhConf.hieu!==hv)F.push('NPC demote not confiscated');if(has(v,'sacphong'))F.push('NPC book not taken');
  v.out=false;v.confined=0;S.turn+=B.conf.wait;dhMonth();if(!v.dhConf||!v.dhConf.open)F.push('NPC atonement not opened');v.danh=Math.min(100,(v.dhConf.d0|0)+B.conf.cong);dhMonth();
  if(v.hieu!==hv||v.dhConf){F.push('NPC lập công did not restore');o.npcDbg={hv,hieu:v.hieu,conf:v.dhConf,danh:v.danh,out:v.out,cf:v.confined,alive:v.alive,st:dhConfState(v),turn:S.turn}}if(has(v,'sacphong')!==1){F.push('NPC book not back');o.npcBook=[has(v,'sacphong'),findIn(String(v.id),'sacphong'),JSON.stringify((S.il.box||[]).filter(x=>x.e&&x.e.own===String(v.id)).map(x=>[x.e.k,x.why])),JSON.stringify((S.lost||[]).filter(c=>c.e&&c.e.own===String(v.id)).map(c=>[c.k,c.st,c.at]))]}
  /* reviewer r1: road B near the Danh ceiling (Danh at opening ≥ top − cong) must still finish */
  {const P1=JSON.stringify(B.conf.p);B.conf.p.giang=[100,0];dhWeek();if(v.hieu){v.danh=B.conf.top-2;demote(v,'phạm cung quy');dhWeek();B.conf.p=JSON.parse(P1);v.out=false;v.confined=0;S.turn+=B.conf.wait;dhMonth();if(v.dhConf&&v.dhConf.open){v.danh=B.conf.top;dhMonth()}if(v.dhConf)F.push('road B stuck near the Danh ceiling')}else B.conf.p=JSON.parse(P1)}
  /* inline rank drop (a route with no punisher function) + cấm túc (punish sev 1) — odds forced */
  dhWeek();B.conf.p.giang=[100,0];const hw=w.hieu;w.rank=Math.max(0,w.rank-1);dhWeek();if(w.hieu||!w.dhConf)F.push('inline rank drop not caught');B.conf.p=JSON.parse(P0);
  dhWeek();S.dh.w_kim={n:(BAL.dh.T.w_kim.n||BAL.dh.n0)[0],i:0};dhSync(S,true);dhWear(S,'w_kim');B.conf.p.cam=[0,100];punish(S,'vô lễ',1);dhWeek();B.conf.p=JSON.parse(P0);
  if(S.titleWorn||!S.dhConf||!(S.dhConf.titles||[]).includes('w_kim'))F.push('cấm túc did not take the worn title');if(!S.hieu)F.push('cấm túc took the hiệu (odds 0)');
  delete S.dhConf;delete S.dh.w_kim.conf;S.confined=0;
  /* ---- loss / theft: a jlost case for THAT piece; jlost random loss never picks it ---- */
  const bk=S.inv.find(e=>e.k==='sacphong'&&e.dhid);if(loOk(bk))F.push('jlost random pool accepts the book');Q.length=0;
  const c=dhLose(S,bk);if(!c||c.e!==bk||!c.dh)F.push('no case for the book');if(has(S,'sacphong'))F.push('book still in chest after loss');
  const dlg=Q.find(m=>m.pid==='dhlost');if(!dlg)F.push('no investigation dialog');else o.lostOpts=dlg.opts.map(x=>x.n);if(Q.some(m=>m.t==='Đồ thất lạc'))F.push('double notice');
  /* somewhere in the game while the case runs */
  dhCensus();if(findIn('me','sacphong')!==1)F.push('book not exactly once while lost: '+findIn('me','sacphong'));
  /* closed and not back → Danh −lostDanh once */
  const dd=S.danh;c.st='done';c.end=wk();dhWeek();if(S.danh!==Math.max(0,dd-B.it.lostDanh))F.push('no lost penalty '+dd+'>'+S.danh);const dd2=S.danh;dhWeek();if(S.danh!==dd2)F.push('penalty twice');
  /* the piece removed by force (old jlost expiry) → census → store → home after backW */
  for(const q of [S].concat(rivals))q.inv=(q.inv||[]).filter(e=>!(e&&e.dhid===bk.dhid));S.lost=(S.lost||[]).filter(x=>x!==c);
  dhCensus();const nx=(S.il.box||[]).find(x=>x.e&&x.e.k==='sacphong'&&x.e.own==='me');if(!nx||nx.why!=='net')F.push('vanished book not in store');
  S.tuan=0;S.turn+=Math.ceil((B.it.backW[1]+1)/3);Q.length=0;dhCensus();if(has(S,'sacphong')!==1)F.push('store book not sent home');
  /* never two */
  S.inv.push(Object.assign({},S.inv.find(e=>e.k==='ngocan'&&e.dhid)));dhCensus();if(has(S,'ngocan')!==1)F.push('duplicate seal kept '+JSON.stringify(S.inv.filter(e=>e.k==='ngocan'))+' hieu='+S.hieu+' conf='+JSON.stringify(S.dhConf));
  function findIn(own,k){let n=0;for(const q of [S].concat(rivals))n+=(q.inv||[]).filter(e=>e&&e.k===k&&e.own===own&&e.dhid).length;n+=(S.il.box||[]).filter(x=>x.e&&x.e.k===k&&x.e.own===own).length;
   n+=(S.lost||[]).filter(x=>x.st!=='done'&&x.e&&x.e.k===k&&x.e.own===own&&!(([S].concat(rivals)).some(q=>(q.inv||[]).includes(x.e)))).length;return n}
  /* JSON round-trip */
  const J=JSON.parse(JSON.stringify(S));if(!J.hieu||!J.inv.some(e=>e.dhid))F.push('save round trip');
  o.F=F;return o});
 R.fail.push(...R.logic.F);delete R.logic.F;
 /* ---------------- 2. UI ---------------- */
 const shot=async(n)=>{await sleep(4500);await p.evaluate(()=>{document.querySelectorAll(".kmov,.krkfx,.kfxrank").forEach(e=>e.remove())});const ov=await p.evaluate(()=>{const m=document.querySelector('#modal .dlg');return m?{t:(m.querySelector('.kptitle')||{}).innerText,over:m.scrollWidth>m.clientWidth+2||document.documentElement.scrollWidth>innerWidth+2}:null});
  await p.screenshot({path:`${OUT}/${n}-${wh}.jpg`,type:'jpeg',quality:72});return ov};
 await fresh();await sleep(600);await clean();
 const ui=async(n,fn)=>{await clean();await p.evaluate(fn);await p.evaluate(()=>{showModal()});const r=await shot(n);R[n]=r;if(!r)R.fail.push(n+': no panel');else if(r.over)R.fail.push(n+': overflow')};
 await ui('ts2-grant',()=>{S.rank=4;S.hieu='';delete S.dhConf;S.lastPromo=-9;const N=dhHieuNeed(S);S.sung=N.sung;S.danh=N.danh;Q.length=0;dhHieuGrant(S,'son')});
 await ui('ts2-conf',()=>{dhWeek();S.dh=S.dh||{};S.dh.w_kim={n:(BAL.dh.T.w_kim.n||BAL.dh.n0)[0]};dhSync(S,true);dhWear(S,'w_kim');Q.length=0;cold('Ngươi phạm tội khi quân');dhWeek();Q.splice(0,Q.length-1)});
 await ui('ts2-panel',()=>{S.out=0;S.rank=3;dhWeek();S.turn+=BAL.dh.conf.wait;Q.length=0;dhMonth();Q.length=0;S.dh.m_kinh={n:(S.dh.m_kinh||{n:0}).n+1};dhPanel();Q.splice(0,Q.length-1)});
 R.panelTxt=await p.evaluate(()=>{const m=document.querySelector('#modal .dlg');return m?m.innerText.replace(/\s+/g,' ').slice(0,900):''});
 if(!/Bị thu · đường sám hối/i.test(R.panelTxt)&&!/BỊ THU · ĐƯỜNG SÁM HỐI/.test(R.panelTxt))R.fail.push('panel: no atonement section');
 await ui('ts2-lost',()=>{const BK=BAL.dh;if(S.dhConf)dhRestore(S);dhWeek();Q.length=0;const e=S.inv.find(x=>x.k==='ngocan'&&x.dhid);dhLose(S,e);Q.splice(0,Q.findIndex(m=>m.pid==='dhlost'))});
 R.lostItem=await p.evaluate(()=>!!document.querySelector('#modal .kiev'));if(!R.lostItem)R.fail.push('loss dialog: no item frame');
 console.log(JSON.stringify(R,null,1));await b.close();process.exit(R.errs.length||R.fail.length?1:0)})();
