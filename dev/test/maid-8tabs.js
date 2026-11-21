/* maid-8tabs (owner 21/11 ~03:15Z mark #32 + ~03:18Z mark #33; brief dev/handover/briefs/main85-maid-8tabs.md):
   1 every road shows the SAME 8 bottom tabs as the consort (Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện), no locks:
     the cung nữ road has the consort's sub-tab KEYS in every group (labels from ROAD8: Đồng liêu, Thân phận), every tab / sub-tab opens with no page error;
     the tiểu thư ngoài cung road (isKc) has the same bar, her panels as sub-tabs (ROAD8.kc), Hoàng tự = the kit empty card.
   2 #33: no «Cung nữ … của … · Chủ tin» strip (.srvhead) under the tabs; the stage right column = the consort's: «Chủ tin N» kit button where the consort
     has «Cung nhân», the Chí tôn button, the Ân sủng card (Tai mắt + her facts); no separate servant box (.k3py with srk/nt/wage/merit).
   3 OLD SAVE: a maid life saved by the LIVE build (oldURL) loads in the new build and lands on Hành sự with the 8 tabs (an old remembered
     sub-tab in localStorage is fine).
   4 RANK-UP: the maid rises (srvRise) → consort: same 8 tabs, sub-tab labels back to the consort's (Cung nhân, Phi tần, Mệnh truyện), the right column shows
     Cung nhân (her new maid), no Đồng liêu box and no chủ row, tab = Hành sự, no page error.
   5 #34 (owner 21/11 ~03:20Z): her chủ = the FIRST row of the right column's court box (kit .kcrow data-kc="mis", «<phẩm> <tên>» + «Chủ tin N»); tap = Hậu cung ›
     Chủ tử pager on her chủ. #36 (~03:25Z): the same two right-column buttons, words from ROAD8_LAB («Đồng liêu N» in the Cung nhân place, N = her colleagues;
     its fold = colleague chips, tap = that colleague in the Đồng liêu pager); Phi tần sub-tab = «Chủ tử»; Nguy hiểm chung + Xét phẩm boxes (hud2 + right column),
     Xét phẩm panel = her next rung. #35 (~03:22Z): Hậu cung › Đồng liêu = the shared person-tab layout (kit pager strip + ONE pcard, act buttons in card
     groups), no private .srvrow list; one act button works from the card.
   usage: node dev/test/maid-8tabs.js <newURL> <oldURL|-> [WxH@dpr ...]   (default 755x1000@1 1180x820@1) → exit 1 on FAIL */
const {chromium}=require('playwright');
const [,,URL,OLD0,...SZ]=process.argv;const OLD=OLD0&&OLD0!=='-'?OLD0:null;const SIZES=SZ.length?SZ:['755x1000@1','1180x820@1'];
const T8='Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện';
const boot=async(p,u,road)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(road=>{for(const id of ['kload','kroul','kroulw','dawn']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  if(road==='srv'){window.__forceOrigin='cnv';for(let i=0;i<30;i++){start();if(isSrv())break}}
  else if(road==='kc'){for(let i=0;i<200;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S.srv&&kcOk(S.origin.k))break}try{nlCard()}catch(e){}}
  else{window.__forceOrigin='tt';for(let i=0;i<30;i++){start();if(!isSrv())break}}
  if(road!=='kc'){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()}},road);
 if(road==='kc'){await p.waitForTimeout(600);await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await p.waitForTimeout(600);
  for(let i=0;i<20&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await p.waitForTimeout(400);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await p.waitForTimeout(1000);
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()})}};
const bar=p=>p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length).map(x=>x.textContent.trim()).join(' · '));
/* every bar tab, every sub-tab: keys + labels + the panel has content */
const walk=p=>p.evaluate(()=>{const out=[];const heads=[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length).map(x=>x.dataset.tab);
 for(const h of heads){document.querySelector(`#tabs [data-tab="${h}"]`).click();const subs=[...document.querySelectorAll('#panel .ksub .ksubb')].map(x=>[x.dataset.ksub,x.textContent.trim()]);
  if(!subs.length){out.push({h,k:tab,txt:document.getElementById('panel').innerText.trim().length});continue}
  for(const [k,l] of subs){const b=document.querySelector(`#panel .ksub [data-ksub="${k}"]`);if(b)b.click();out.push({h,k,l,on:tab,txt:document.getElementById('panel').innerText.trim().length})}}
 document.querySelector('#tabs [data-tab="act"]').click();return out});
(async()=>{const b=await chromium.launch();const R=[];const ok=(c,n,x)=>{R.push(c);console.log((c?'PASS':'FAIL')+' | '+n+(x==null?'':' | '+JSON.stringify(x).slice(0,400)))};
 let oldSave=null;
 if(OLD){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();await boot(p,OLD,'srv');
  oldSave=await p.evaluate(()=>isSrv()?JSON.stringify(ser()):null);ok(!!oldSave,'old build: a maid life saved');await ctx.close()}
 for(const sz of SIZES){const [w,h,d]=sz.split(/[x@]/).map(Number);const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d||1,serviceWorkers:'block'});
  await ctx.route(u=>!/^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  /* consort reference */
  await boot(p,URL,'cons');const cBar=await bar(p);const cW=await walk(p);
  ok(cBar===T8,sz+' consort: the 8 bottom tabs',cBar);
  {const c=await p.evaluate(()=>{const K=new Set();for(let i=0;i<rivals.length;i++){const v=rivals[i];if(!v||v===S)continue;const re=/<button[^>]*data-(a|invite)="([^"]+)"/g;let m;const h=rvCard(v,i);while((m=re.exec(h)))K.add(m[1]==='a'?m[2]:'invite')}return['ally','steal','lygian','invite'].filter(k=>K.has(k))});
   ok(c.length===4,sz+' maid-acts-a: the consort road keeps every consort act on Phi tần cards (Kết giao, Tranh sủng, Ly gián, Mời đến cung ta)',c)}
  /* 1 cung nữ */
  await boot(p,URL,'srv');const sBar=await bar(p);const sW=await walk(p);
  ok(await p.evaluate(()=>isSrv()),sz+' cung nữ road started');
  ok(sBar===T8,sz+' cung nữ: the same 8 bottom tabs',sBar);
  const keys=W=>W.map(x=>x.h+'>'+x.k).join(',');
  ok(keys(sW)===keys(cW),sz+' cung nữ: the same tabs and sub-tab keys as the consort (no locks, nothing hidden)',{srv:keys(sW),cons:keys(cW)});
  const lab=(W,k)=>(W.find(x=>x.k===k)||{}).l;
  ok(lab(sW,'staff')==='Đồng liêu'&&lab(sW,'story')==='Thân phận'&&lab(sW,'rv')==='Chủ tử'&&lab(cW,'staff')==='Cung nhân'&&lab(cW,'story')==='Mệnh truyện'&&lab(cW,'rv')==='Phi tần',sz+' ROAD8 labels: Hậu cung › Chủ tử + Đồng liêu, Mệnh truyện › Thân phận (consort: Phi tần, Cung nhân, Mệnh truyện)',[lab(sW,'rv'),lab(sW,'staff'),lab(sW,'story'),lab(cW,'rv'),lab(cW,'staff'),lab(cW,'story')]);
  ok(sW.every(x=>x.txt>0&&(x.on==null||x.k==null||x.on===x.k)),sz+' cung nữ: every tab / sub-tab opens with content',sW.filter(x=>!(x.txt>0&&(x.on==null||x.k==null||x.on===x.k))));
  /* 2 #33 */
  const c33=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="act"]').click();render();const R=document.getElementById('kshR');
   return{strip:!!document.querySelector('#panel .srvhead'),btn:R?[...R.querySelectorAll('.kgfbtns button')].map(x=>x.textContent.trim()):null,tin:S.tin,nCol:srvColleagues().length,nCt:kitCourtRows().length,as:R?[...R.querySelectorAll('.kas .k3l')].map(x=>x.textContent.trim()):null,
    py:R?[...R.querySelectorAll('.k3py [data-k3]')].map(x=>x.dataset.k3):null,rk:rkName(S)}});
  ok(!c33.strip,sz+' #33: no «Cung nữ … · Chủ tin» strip under the tabs',c33);
  ok(!c33.btn||(c33.btn.length===2&&c33.btn[0]===`${c33.nCol}Đồng liêu`&&c33.btn[1]===`${c33.nCt}Chí tôn`),sz+' #33/#36: right column = the consort\'s two buttons, «Đồng liêu N» in the Cung nhân place + «Chí tôn N» (no extra button)',c33);
  /* 5 #34: her chủ row in the court box; tap = her chủ's person card */
  const c34=await p.evaluate(()=>{window.__kgfOpen='ct';const R0=document.getElementById('kshR');if(R0)R0.dataset.full='';k3Stage();const host=document.querySelector('#kshR .kgfopen,#kgfdrop');
   const r=host&&host.querySelector('.kcrow');const m=srvM();const o={mis:r?r.dataset.kc:null,txt:r?r.textContent.trim():null,want:`${rkName(m)} ${shortN(m.name)}`,tin:S.tin|0,hud:!!document.querySelector('#hud2 .kcrow[data-kc="mis"],#hud2 [data-kc="mis"]')};
   if(r){r.click();o.tab=tab;o.pg=PG.rv;o.ix=rvPgOf(m);o.card=(document.querySelector('#panel .pc')||{}).innerText||'';o.npc=document.querySelectorAll('#panel .pc').length;o.on=(document.querySelector('#panel .pface.on')||{}).innerText;o.mname=m.name;o.st=k61St(m);o.kn=kitKnown(m)}window.__kgfOpen=null;document.querySelector('#tabs [data-tab="act"]').click();return o});
  ok(c34.mis==='mis'&&c34.txt.includes(c34.want)&&c34.txt.includes('Chủ tin '+c34.tin),sz+' #34: the court box\'s first row = her chủ «<phẩm> <tên>» + «Chủ tin N»',c34);
  ok(c34.tab==='rv'&&c34.pg===c34.ix&&c34.on.includes(c34.want.split(' ').pop())&&c34.card.includes(c34.want.split(' ').pop()),sz+' #34: tap = her chủ\'s person card (Hậu cung › Chủ tử pager on her)',{tab:c34.tab,pg:c34.pg,ix:c34.ix,card:c34.card.slice(0,80),npc:c34.npc,on:c34.on,mname:c34.mname,st:c34.st,kn:c34.kn});
  /* 5 #36: Đồng liêu fold = her colleagues; tap one = her card in the pager */
  const c36=await p.evaluate(()=>{window.__kgfOpen='cn';const R0=document.getElementById('kshR');if(R0)R0.dataset.full='';k3Stage();const host=document.querySelector('#kshR .kgfopen,#kgfdrop');
   const L=host?[...host.querySelectorAll('[data-k3go="staff"]')]:[];const o={n:L.length,want:srvColleagues().length,head:host?(host.querySelector('.kgf-t')||{}).textContent:null};
   const c=L[1]||L[0];if(c){const j=+c.dataset.k3pi;c.click();o.tab=tab;o.pg=PG.staff;o.j=j;o.name=(document.querySelector('#panel .pc')||{}).innerText||'';o.wantName=srvColleagues()[j].name}
   window.__kgfOpen=null;return o});
  ok(c36.n===c36.want&&/^Đồng liêu · \d+/.test(c36.head||''),sz+' #36: the Đồng liêu fold lists her colleagues (same kit chips as Cung nhân)',c36);
  ok(c36.tab==='staff'&&c36.pg===c36.j&&c36.name.includes(c36.wantName),sz+' #36: tap a colleague = her card in Hậu cung › Đồng liêu',{tab:c36.tab,pg:c36.pg,j:c36.j});
  /* #35: Đồng liêu = the shared person-tab layout */
  const c35=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="court"]').click();const b=document.querySelector('#panel .ksub [data-ksub="staff"]');if(b)b.click();const P=document.getElementById('panel');
   const o={tab,strip:!!P.querySelector('.pgwrap .pstrip'),faces:P.querySelectorAll('.pstrip .pface').length,want:srvColleagues().length,pc:P.querySelectorAll('.pc').length,row:!!P.querySelector('.srvrow'),btn:P.querySelectorAll('.pc [data-cnv]').length};
   const c=P.querySelector('.pc [data-cnv="chat"]:not([disabled])');if(c){const k0=used;c.click();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();o.spent=used-k0}return o});
  ok(c35.tab==='staff'&&c35.strip&&c35.faces===c35.want&&c35.pc===1&&!c35.row&&c35.btn>=2,sz+' #35: Hậu cung › Đồng liêu = kit pager strip + ONE kit person card with her act buttons (no private list)',c35);
  ok(c35.spent==null||c35.spent>=1,sz+' #35: «Trò chuyện» from the card spends its khắc',c35.spent);
  /* #36: Nguy hiểm chung + Xét phẩm boxes on her road (hud2 chip + right-column row), Xét phẩm = her next rung */
  const BAL_TIN=await p.evaluate(()=>BAL.tsGuard.tin);
  const cts=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="act"]').click();render();k3Stage();const h=document.getElementById('hud2');
   const o={nh:!!(h&&h.querySelector('[data-hx="tsnh"]')),xp:!!(h&&h.querySelector('[data-hx="tsxp"]')),col:[...document.querySelectorAll('#kshR [data-k3="tsnh"],#kshR [data-k3="tsxp"],#kshR [data-k3sheet]')].map(x=>x.dataset.k3||'sheet'),nx:SRK.maid[(S.srv.rk|0)+1]};
   Q.length=0;tsSrvPromoPanel();o.t=Q[0]&&Q[0].t;o.h=Q[0]&&Q[0].h||'';Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   tsDangerPanel();o.d=Q[0]&&Q[0].t;{const O=(Q[0]&&Q[0].opts)||[];const txt=JSON.stringify(O.map(x=>({n:x.n,fx:x.fx,x:x.x,sub:x.sub,d:x.d})))+(Q[0]&&Q[0].h||'');
    o.dOpts=O.map(x=>x.n);o.sung=/\bS\u1ee7ng\b|"sung"/.test(txt);o.door=/c\u1eeda cung|k\u1ebb h\u1ea7u/.test(txt);const g=O.find(x=>/N\u00e9p m\u00ecnh/.test(x.n));o.gfx=g&&g.fx;
    if(g&&g.go){const t0=S.tin,s0=tsS().guard;g.go();o.gGuard=tsS().guard-wk();o.gWk=BAL.tsGuard.wk;S.tin=t0;tsS().guard=s0}}Q.length=0;if(m)m.hidden=true;render();return o});
  ok(cts.nh&&cts.xp,sz+' #36: Nguy hiểm chung + Xét phẩm chips on her road (the right column reads them)',cts);
  ok(cts.t===`Xét phẩm cuối tháng · ${cts.nx}`&&/Công lao/.test(cts.h)&&/Chủ tin/.test(cts.h)&&cts.d==='Nguy hiểm chung',sz+' #36: Xét phẩm panel = her next rung (Công lao, bậc cung chủ cho phép, Chủ tin); Nguy hiểm chung panel opens',{t:cts.t,d:cts.d});
  ok(!cts.sung&&!cts.door&&cts.gfx&&cts.gfx.tin===-BAL_TIN&&cts.gGuard===cts.gWk,sz+' rv FAIL 1: Nguy hiểm chung on her road = maid-true guard «Nép mình theo hầu chủ» (Chủ tin −BAL.tsGuard.tin, same guard weeks), no Sủng cost, no palace door / servants',{opts:cts.dOpts,sung:cts.sung,door:cts.door,gfx:cts.gfx,gGuard:cts.gGuard,gWk:cts.gWk});
  ok(!c33.as||(c33.as[0]==='Tai mắt'&&c33.as.includes('Ngài để ý')&&c33.as.includes('Công lao')&&c33.as.includes('Lương tháng')),sz+' #33: the Ân sủng card holds Tai mắt + her facts',c33.as);
  ok(!c33.py||!c33.py.some(k=>['srk','nt','wage','merit'].includes(k)),sz+' #33: no separate servant box',c33.py);
  ok(c33.rk!=='Đáp ứng'&&/Cung nữ|Ma ma/.test(c33.rk),sz+' her own title in consort panels = her servant rung',c33.rk);
  /* maid-acts-a (MAIN CHÍNH 90, option A): Hậu cung › Chủ tử cards on her road hold ONLY the acts in ROAD8.srv.acts (walk to her / ask who she is), maid words,
     no consort act (Tranh sủng, Ly gián, Phạt quỳ, Rút thẻ bài, Mời đến cung ta …), no lock; the same card with the table switched off = the consort acts (the table is the switch);
     meeting a consort she keeps her own maid acts (j42 srvTalk: Hành lễ thỉnh an · Mật báo chuyện của chủ) = what an NPC maid does to a consort (law 1) */
  const cma=await p.evaluate(()=>{const keys=h=>{const o=[];const re=/<button[^>]*>/g;let m;while((m=re.exec(h))){const k=road8ActKey(m[0]+'</button>');if(!/^\?(pct|pg|ladder|kev|kintel|pi)$/.test(k)&&!/data-(pct|pg|ladder|kev|kintel)=/.test(m[0]))o.push(k)}return o};
   const A=ROAD8.srv.acts.rival,K=new Set(),T=[],off=new Set();let cons=0;for(let i=0;i<rivals.length;i++){const v=rivals[i];if(!v||v===S)continue;const h=rvCard(v,i);keys(h).forEach(k=>K.add(k));T.push(h.replace(/<[^>]+>/g,' '))}
   const a0=ROAD8.srv.acts;ROAD8.srv.acts=null;try{for(let i=0;i<rivals.length;i++){const v=rivals[i];if(!v||v===S)continue;keys(rvCard(v,i)).forEach(k=>off.add(k))}}finally{ROAD8.srv.acts=a0}
   const t=T.join(' ');const v=rivals.find(x=>x&&x!==S&&x!==srvM()&&x.alive&&!x.out);let talk=[];try{talk=talkOpts({kind:'srv',sk:v.queen?'hh':'rv',ref:v,name:v.name}).map(a=>a.n)}catch(e){talk=['ERR '+e.message]}
   return{K:[...K],bad:[...K].filter(k=>!A[k]),off:off.size,offHas:['ally','steal','lygian','invite'].filter(k=>off.has(k)),cw:['Tranh sủng','Ly gián','Phạt quỳ','Rút thẻ bài','Mời đến cung ta','Sai cung nữ thân tín','Kết giao','phải sai người','dễ hơn sai người'].filter(w=>t.includes(w)),
    lock:/🔒|kitLock|klock/.test(t)||/Đến cung nàng( ta)? thăm/.test(t),visit:/Đến cung nàng( ta)? thỉnh an/.test(t),talk}});
  ok(cma.bad.length===0&&cma.cw.length===0&&!cma.lock,sz+' maid-acts-a: Chủ tử cards on her road = only ROAD8.srv.acts keys, no consort act words, no lock',cma);
  ok(cma.visit&&cma.K.includes('visit'),sz+' maid-acts-a: kept act in her words «Đến cung nàng thỉnh an»',cma.K);
  ok(cma.off>10&&cma.offHas.length===4,sz+' maid-acts-a: the table is the switch (table off → the consort acts come back)',{off:cma.off,has:cma.offHas});
  ok(cma.talk.includes('Hành lễ thỉnh an')&&cma.talk.some(n=>/^Mật báo chuyện của/.test(n)),sz+' maid-acts-a law 1: meeting a consort she keeps her maid acts (Hành lễ thỉnh an, Mật báo chuyện của chủ)',cma.talk);
  /* 4 rank-up */
  const up=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="court"]').click();const k0=tab;srvRise('Thánh thượng để mắt');Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();
   const R=document.getElementById('kshR');return{k0,srv:isSrv(),tab,rank:S.rank,st:kgLabel('staff'),sy:kgLabel('story'),rv:kgLabel('rv'),mis:kitCourtRows().some(r=>r.k==='mis'),btn:R?[...R.querySelectorAll('.kgfbtns button')].map(x=>x.textContent.trim()):null}});
  const uBar=await bar(p);const uW=await walk(p);
  ok(!up.srv&&up.tab==='act'&&uBar===T8&&up.st==='Cung nhân'&&up.sy==='Mệnh truyện'&&up.rv==='Phi tần'&&!up.mis,sz+' rank-up maid → consort: same 8 tabs, consort sub-tab names, lands on Hành sự',{up,uBar});
  ok(keys(uW)===keys(cW)&&uW.every(x=>x.txt>0),sz+' rank-up: every tab / sub-tab opens',keys(uW));
  ok(!up.btn||(!up.btn.some(x=>/(Chủ tin|Đồng liêu)$/.test(x))),sz+' rank-up: no Đồng liêu / Chủ tin button in the right column',up.btn);
  /* 3 old save */
  if(oldSave){const o=await p.evaluate(raw=>{try{localStorage.setItem('hclh-kg-hc','staff');localStorage.setItem('hclh-kg-mt','story')}catch(e){}tab='staff';localStorage.setItem(SK(3),raw);const d=loadSlot(3);if(!d)return{err:'loadSlot null'};deser(d);Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab='act';render();
    const r={srv:isSrv(),tab};document.querySelector('#tabs [data-tab="court"]').click();r.hc=tab;r.lab=kgLabel(tab);return r},oldSave);
   const oBar=await bar(p);
   ok(o.srv&&o.tab==='act'&&oBar===T8&&o.hc==='staff'&&o.lab==='Đồng liêu',sz+' old save (live build): loads, Hành sự, 8 tabs, the remembered Hậu cung sub-tab opens',{o,oBar})}
  /* 1b tiểu thư ngoài cung */
  await boot(p,URL,'kc');const kBar=await bar(p);const kW=await walk(p);
  const kOn=await p.evaluate(()=>!!(window.isKc&&isKc()));
  ok(kOn,sz+' tiểu thư ngoài cung road started');
  ok(kBar===T8,sz+' tiểu thư ngoài cung: the same 8 bottom tabs',kBar);
  ok(kW.every(x=>x.txt>0&&(x.on==null||x.k==null||x.on===x.k)),sz+' tiểu thư ngoài cung: every tab / sub-tab opens with content',kW);
  ok(await p.evaluate(()=>{document.querySelector('#tabs [data-tab="kid"]').click();return !!document.querySelector('#panel .kempty,#panel .kskc,#panel .kskill,#panel [class*="ksk"]')&&tab==='kid'}),sz+' tiểu thư ngoài cung: Hoàng tự = the kit empty card');
  ok(!errs.length,sz+' no page error',errs.slice(0,3));await ctx.close()}
 await b.close();const f=R.filter(x=>!x).length;console.log(f?`FAIL ${f}/${R.length}`:`PASS ${R.length}/${R.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
