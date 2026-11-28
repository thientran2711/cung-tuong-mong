/* review/tuduc-sub (jtds, item D16): Tứ đức sub-styles + CDNH works + teacher fees.
   usage: node dev/test/tuduc-sub.js <url of index.html> <W>x<H>@dpr <outdir> <tag> [noshots]
   Prints one JSON line: per step overflowX + clipped leaf text + dialog inside, checks, page errors. Screenshots <outdir>/<tag>-<step>.jpg */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,NOSHOT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tdsSync==='function');await p.waitForTimeout(2500);
 const R={};
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
 const fresh=()=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());S.buoi=0;used=0;S.bac=300;S.suc=90;render()});
 await fresh();await p.waitForTimeout(800);
 const settle=()=>p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000}).catch(()=>{});
 const shot=async n=>{if(NOSHOT)return;await settle();return p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:55})};
 const meas=()=>p.evaluate(()=>{const vw=innerWidth;const cut=[...document.querySelectorAll('#panel *, #modal *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,6).map(e=>e.className+':'+e.textContent.trim().slice(0,40));
  const M=document.querySelector('#modal .dlg');const mr=M&&!document.getElementById('modal').hidden?M.getBoundingClientRect():null;
  const broken=[...document.querySelectorAll('#panel img,#modal img')].filter(i=>i.offsetParent&&i.complete&&!i.naturalWidth&&/item-(tp|wkbook)/.test(i.src)).map(i=>i.src.split('/').pop());
  return{ovf:document.documentElement.scrollWidth>vw+1,cut,dlgOut:mr?(mr.left<-1||mr.right>vw+1||mr.bottom>innerHeight+1):false,broken}});
 const close=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{tdsReset()}catch(e){}render()});
 /* 0. data: 4 kinds × 10 recipes × 4 lối; books exist; fee = 8% bổng */
 R.data=await p.evaluate(()=>({kinds:tdsKinds().map(k=>[k,WKR[k].length,RCP_ST[k].length,RCP_ST[k].reduce((n,s)=>n+s[2].length,0)]),books:Object.keys(IT).filter(k=>/^wk[bp]_(kimchi|phanson|thuchuc|phucthien)_/.test(k)).length,
  known:tdsKinds().map(k=>rcpKnown()[k].join(",")),fee:virCost(0),feeRanks:[0,1,2,3,4,5,6,7].map(r=>Math.max(BAL.rcp.tFeeMin,Math.round(BAL.pay[r]*BAL.rcp.tFeeK))),favRanks:[0,1,2,3,4,5,6,7].map(r=>{const o=S.rank;S.rank=r;const f=rcpFavorOf(S);S.rank=o;return f})}));
 /* 1. Tài nghệ › Tứ đức */
 await p.evaluate(()=>{tab="art";KTSUB.art="duc";render()});await p.waitForTimeout(1000);
 R.duc=Object.assign(await meas(),await p.evaluate(()=>({ls:document.querySelectorAll('#panel [data-rcpls]').length,btn:[...document.querySelectorAll('#panel [data-vlearn]')].slice(0,2).map(b=>b.innerText.replace(/\s+/g,' ').slice(0,160))})));await shot('duc');
 /* 2. self lesson: grid → material → work */
 await p.evaluate(()=>lessonVir("cong","self"));await p.waitForTimeout(900);
 R.grid=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,tiles:document.querySelectorAll('#modal .kshpick').length,btn:[...document.querySelectorAll('#modal .kshgo')].map(b=>b.textContent+(b.disabled?"(x)":"")).join("|"),imgs:[...document.querySelectorAll('#modal .kshpic img')].filter(i=>i.naturalWidth>0).length})));
 await shot('grid');
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled);b.click()});await p.waitForTimeout(700);
 R.mat=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,opts:(Q[0]&&Q[0].opts||[]).map(o=>o.n)})));await shot('material');
 R.self=await p.evaluate(()=>{const n0=S.inv.length,p0=S.virp.cong+S.vir.cong*10,b0=S.bac;document.querySelector('#modal .opt[data-m="1"]').click();const e=S.inv[S.inv.length-1];
  return{added:S.inv.length-n0,kind:e&&e.wk&&e.wk.kind,r:e&&e.wk&&e.wk.r,ti:e&&e.wk&&e.wk.ti,name:e&&e.wk&&e.wk.n,paid:b0-S.bac,prog:S.virp.cong+S.vir.cong*10-p0,log:S.logs.slice(0,3).map(x=>x.replace(/<[^>]+>/g,'').slice(0,150))}});
 await close();await fresh();
 /* 3. teacher (ma ma): picker → grid with "Học lối này" → new lối learnt, fee = 8% bổng */
 await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.vir);if(v){v.vir.ngon=4;affAdd(v,S,60)}lessonVir("ngon","master")});await p.waitForTimeout(800);
 R.tch=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,opts:(Q[0]&&Q[0].opts||[]).map(o=>o.n+" :: "+String(o.x).slice(0,90))})));await shot('teacher');
 await p.evaluate(()=>document.querySelector('#modal .opt[data-m="0"]').click());await p.waitForTimeout(800);
 R.tgrid=Object.assign(await meas(),await p.evaluate(()=>({btn:[...document.querySelectorAll('#modal .kshgo')].map(b=>b.textContent+(b.disabled?"(x)":"")).join("|")})));await shot('teacher-grid');
 R.tlearn=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled&&/Học lối/.test(b.textContent));if(!b)return{none:1};const rid=b.dataset.kwri;b.click();
  const b0=S.bac,fee=virCost(S.vir.ngon);document.querySelector('#modal .opt[data-m="0"]').click();const s=rcpStOf("thuchuc",rid);const e=S.inv[S.inv.length-1];
  return{rid,st:s[1],known:rcpKnown().thuchuc.includes(s[0]),paid:b0-S.bac,fee,work:e&&e.wk&&e.wk.n}});
 await close();await fresh();
 /* 4. consort teacher: favour scaled, no bạc */
 R.ctch=await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.vir&&v.vir.ngon>=4);if(!v)return{none:1};const r0=rel(v,S);lessonVir("ngon","master");const i=Q[0].opts.findIndex(o=>o.n.includes(v.name));if(i<0)return{noopt:1};
  chooseM(i);const t=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled);t.click();const b0=S.bac;chooseM(0);return{bacPaid:b0-S.bac,relDrop:r0-rel(v,S),fav:rcpFavorOf(S),log:S.logs.slice(0,3).map(x=>x.replace(/<[^>]+>/g,'').slice(0,120))}});
 await close();await fresh();
 /* 5. lối list */
 await p.evaluate(()=>rcpListOpen("dung"));await p.waitForTimeout(700);R.list=await meas();await shot('list');await close();
 /* 6. level-up opens lối 2 (bậc 2), lối 3 (bậc 4), lối 4 (bậc 5) */
 R.lv=await p.evaluate(()=>{S.vir.hanh=0;S.virp.hanh=0;S.rcpL.phucthien=["s1"];const out=[];for(let i=0;i<5;i++){addVir(S,"hanh",S.vir.hanh+2);out.push(S.vir.hanh+":"+rcpKnown().phucthien.join(","))}return out});
 /* 7. Tác phẩm tab: course cards */
 await p.evaluate(()=>{S.vir.cong=5;tab="art";KTSUB.art="wk";render()});await p.waitForTimeout(1000);
 R.wk=Object.assign(await meas(),await p.evaluate(()=>({cards:["cong","dung","ngon","hanh"].filter(k=>document.querySelector(`#panel [data-skill="wk-${k}"]`)).length,prac:!!document.querySelector('#panel [data-tdsprac="cong"]')})));
 await p.evaluate(()=>{const c=document.querySelector('#panel [data-skill="wk-cong"]');if(c)c.scrollIntoView({block:'start'})});await shot('works');
 /* 8. practice at bậc 5 */
 R.prac=await p.evaluate(()=>{const n0=S.inv.length;tdsPractice("cong");const t=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled);if(!t)return{none:1};t.click();chooseM(0);return{added:S.inv.length-n0,kind:S.inv[S.inv.length-1].wk.kind}});
 await close();await fresh();
 /* 9. the work in the chest (picture) + gift dialog */
 await p.evaluate(()=>{const w=wkMake(S,"phanson",2,9);w.wk.r="r03";w.wk.n="Son hoa hồng";S.inv.push(w);tab="inv";render();const it=kinvItems().find(x=>x.g&&x.g.wk&&x.g.wk.kind==="phanson");if(it)kinvOpen(it)});await p.waitForTimeout(1200);
 R.inv=Object.assign(await meas(),await p.evaluate(()=>({img:[...document.querySelectorAll('#modal img')].map(i=>i.src.split('/').pop()+":"+i.naturalWidth).slice(0,3),rows:(document.querySelector('#modal .kinvrows')||{}).innerText})));await shot('inv-work');
 await close();
 await p.evaluate(()=>{itemAct("gift",S.inv.length-1)});await p.waitForTimeout(1200);R.gift=Object.assign(await meas(),await p.evaluate(()=>({n:(Q[0]&&Q[0].opts||[]).length})));await shot('gift');await close();
 /* 10. NPC lối: art = s1 + favourite first, by level; virtue by 2/4/5 */
 R.npc=await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.arts&&v.vir);const out={};for(const l of [0,1,3,5]){v.arts.hoa=l;out["hoa"+l]=RCP_ST.tranh.filter(s=>rcpNpcKnows(v,"tranh",s[0])).map(s=>s[0]).join(",")}
  out.fav=rcpProf(v).f.tranh;out.hate=rcpProf(v).h.tranh||"";for(const l of [1,2,4,5]){v.vir.dung=l;out["dung"+l]=RCP_ST.phanson.filter(s=>rcpNpcKnows(v,"phanson",s[0])).map(s=>s[0]).join(",")}
  const n0=(v.inv||[]).filter(e=>e.wk).length;const r0=roll;roll=()=>true;try{addVir(v,"cong",50)}finally{roll=r0}out.npcWork=(v.inv||[]).filter(e=>e.wk).length-n0;return out});
 /* 11. old save without S.rcpL: Tứ đức lối by level, not by the WKR_LV gate */
 R.old=await p.evaluate(()=>{const keep=S.rcpL;delete S.rcpL;S.vir.cong=4;S.vir.dung=0;rcpOldSave();const r={kimchi:S.rcpL.kimchi.join(","),phanson:S.rcpL.phanson.join(","),mon:S.rcpL.mon.join(",")};return r});
 R.errs=errs;console.log(JSON.stringify(R));await b.close()})();
