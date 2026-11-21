/* maid-8tabs (owner 21/11 ~03:15Z mark #32 + ~03:18Z mark #33; brief dev/handover/briefs/main85-maid-8tabs.md):
   1 every road shows the SAME 8 bottom tabs as the consort (Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện), no locks:
     the cung nữ road has the consort's sub-tab KEYS in every group (labels from ROAD8: Đồng liêu, Thân phận), every tab / sub-tab opens with no page error;
     the tiểu thư ngoài cung road (isKc) has the same bar, her panels as sub-tabs (ROAD8.kc), Hoàng tự = the kit empty card.
   2 #33: no «Cung nữ … của … · Chủ tin» strip (.srvhead) under the tabs; the stage right column = the consort's: «Chủ tin N» kit button where the consort
     has «Cung nhân», the Chí tôn button, the Ân sủng card (Tai mắt + her facts); no separate servant box (.k3py with srk/nt/wage/merit).
   3 OLD SAVE: a maid life saved by the LIVE build (oldURL) loads in the new build and lands on Hành sự with the 8 tabs (an old remembered
     sub-tab in localStorage is fine).
   4 RANK-UP: the maid rises (srvRise) → consort: same 8 tabs, sub-tab labels back to the consort's (Cung nhân, Mệnh truyện), the right column shows
     Cung nhân (her new maid) and no Chủ tin button, tab = Hành sự, no page error.
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
  /* 1 cung nữ */
  await boot(p,URL,'srv');const sBar=await bar(p);const sW=await walk(p);
  ok(await p.evaluate(()=>isSrv()),sz+' cung nữ road started');
  ok(sBar===T8,sz+' cung nữ: the same 8 bottom tabs',sBar);
  const keys=W=>W.map(x=>x.h+'>'+x.k).join(',');
  ok(keys(sW)===keys(cW),sz+' cung nữ: the same tabs and sub-tab keys as the consort (no locks, nothing hidden)',{srv:keys(sW),cons:keys(cW)});
  const lab=(W,k)=>(W.find(x=>x.k===k)||{}).l;
  ok(lab(sW,'staff')==='Đồng liêu'&&lab(sW,'story')==='Thân phận'&&lab(cW,'staff')==='Cung nhân'&&lab(cW,'story')==='Mệnh truyện',sz+' ROAD8 labels: Hậu cung › Đồng liêu, Mệnh truyện › Thân phận (consort: Cung nhân, Mệnh truyện)',[lab(sW,'staff'),lab(sW,'story'),lab(cW,'staff'),lab(cW,'story')]);
  ok(sW.every(x=>x.txt>0&&(x.on==null||x.k==null||x.on===x.k)),sz+' cung nữ: every tab / sub-tab opens with content',sW.filter(x=>!(x.txt>0&&(x.on==null||x.k==null||x.on===x.k))));
  /* 2 #33 */
  const c33=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="act"]').click();render();const R=document.getElementById('kshR');
   return{strip:!!document.querySelector('#panel .srvhead'),btn:R?[...R.querySelectorAll('.kgfbtns button')].map(x=>x.textContent.trim()):null,tin:S.tin,as:R?[...R.querySelectorAll('.kas .k3l')].map(x=>x.textContent.trim()):null,
    py:R?[...R.querySelectorAll('.k3py [data-k3]')].map(x=>x.dataset.k3):null,rk:rkName(S)}});
  ok(!c33.strip,sz+' #33: no «Cung nữ … · Chủ tin» strip under the tabs',c33);
  ok(!c33.btn||(c33.btn[0]===`${c33.tin}Chủ tin`&&c33.btn.some(x=>/Chí tôn$/.test(x))),sz+' #33: right column = «Chủ tin N» in the Cung nhân place + Chí tôn',c33.btn);
  ok(!c33.as||(c33.as[0]==='Tai mắt'&&c33.as.includes('Ngài để ý')&&c33.as.includes('Công lao')&&c33.as.includes('Lương tháng')),sz+' #33: the Ân sủng card holds Tai mắt + her facts',c33.as);
  ok(!c33.py||!c33.py.some(k=>['srk','nt','wage','merit'].includes(k)),sz+' #33: no separate servant box',c33.py);
  ok(c33.rk!=='Đáp ứng'&&/Cung nữ|Ma ma/.test(c33.rk),sz+' her own title in consort panels = her servant rung',c33.rk);
  /* 4 rank-up */
  const up=await p.evaluate(()=>{document.querySelector('#tabs [data-tab="court"]').click();const k0=tab;srvRise('Thánh thượng để mắt');Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();
   const R=document.getElementById('kshR');return{k0,srv:isSrv(),tab,rank:S.rank,st:kgLabel('staff'),sy:kgLabel('story'),btn:R?[...R.querySelectorAll('.kgfbtns button')].map(x=>x.textContent.trim()):null}});
  const uBar=await bar(p);const uW=await walk(p);
  ok(!up.srv&&up.tab==='act'&&uBar===T8&&up.st==='Cung nhân'&&up.sy==='Mệnh truyện',sz+' rank-up maid → consort: same 8 tabs, consort sub-tab names, lands on Hành sự',{up,uBar});
  ok(keys(uW)===keys(cW)&&uW.every(x=>x.txt>0),sz+' rank-up: every tab / sub-tab opens',keys(uW));
  ok(!up.btn||(!up.btn.some(x=>/Chủ tin$/.test(x))),sz+' rank-up: no Chủ tin button in the right column',up.btn);
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
  ok(await p.evaluate(()=>{document.querySelector('#tabs [data-tab="kid"]').click();return !!document.querySelector('#panel .kskc,#panel .kskill,#panel [class*="ksk"]')&&tab==='kid'}),sz+' tiểu thư ngoài cung: Hoàng tự = the kit empty card');
  ok(!errs.length,sz+' no page error',errs.slice(0,3));await ctx.close()}
 await b.close();const f=R.filter(x=>!x).length;console.log(f?`FAIL ${f}/${R.length}`:`PASS ${R.length}/${R.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
