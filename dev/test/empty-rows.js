/* empty-rows (owner OD 26/11 ~06:50Z item (E): «ĐƯỢC không / TỐN không» on free acts and gain/cost rows that say nothing → KIT RULE: hide empty rows everywhere).
   Whole-family scan: every kit row (.kr: .krl label + .krv value — kaRowH option/act rows, kitRows info tables, kitOptFinal copies, «!» plates) and every
   act-card grid pair (.kgrid .kl + value) in the main tabs, person pop-ups and EVERY PEND event frame (+ c2a). A row is EMPTY when its label is a
   gain/cost label (Cần · Tốn · Được · Được ngay · Mất · Kèm · Thành; BẠI keeps its failure answer «Tốn công, không được gì», MAIN s34 17/11, law 16) and its value says nothing («không», «không mất gì», «không được gì»,
   «Không được gì thêm», «—», empty).
   usage: node dev/test/empty-rows.js <index.html> [WxH,...]   prints one line per empty row + TOTAL; exit 1 when any is found. */
const {chromium}=require('playwright');const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]);const SIZES=(A[1]||'755x1000,1180x820').split(',');
const SCENES={'act':"tabGo('act')",'art':"tabGo('art')",'inv-viec':"invViec()",'tab-rv':"tabGo('rv')",'tab-court':"tabGo('court')",'tab-staff':"tabGo('staff')",'tab-kid':"tabGo('kid')",'tab-men':"tabGo('men')",'tab-rel':"tabGo('rel')",'tab-inv':"tabGo('inv')",'pop-maid':"popKind('maid')",'pop-elder':"popKind('elder')"};
(async()=>{const b=await chromium.launch();const out=[];const tot={};let errs=0;
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<H?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>{errs++;console.log('PAGEERROR',e.message.slice(0,160))});await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render();
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)return 'none';popIdx=i;popMsg='';renderStage();return 'ok'};
   window.invViec=()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='inv';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};const v=[...document.querySelectorAll('#panel button,#panel .pct,#panel .ksubb')].find(x=>x.textContent.trim()==='Việc');if(v)v.click();return 'ok'};
   window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};return 'ok'}});
  await p.addStyleTag({content:'#kload,#klife,#kroulw,.kroul,#curtain,#dawn,#kdaytc{display:none!important}'});
  const scan=where=>p.evaluate(where=>{const LAB=/^(cần|tốn|được|được ngay|mất|kèm|thành)$/i;
   const NIL=/^(không|không có|không gì|chưa có|—|-|không (được )?(không )?mất( không được)? gì|không được không mất|không mất không được|không được gì( thêm)?|không mất gì( thêm)?)?\.?$/i;
   const R=[];const pl=e=>(e?e.textContent:'').replace(/\s+/g,' ').replace(/[!]$/,'').trim();
   const host=document.getElementById('modal').hidden?document.body:document.getElementById('modal');
   host.querySelectorAll('.kr').forEach(r=>{const l=r.querySelector(':scope > .krl'),v=r.querySelector(':scope > .krv');if(!l||!v)return;const L=pl(l),V=pl(v);if(LAB.test(L)&&NIL.test(V)){const c=r.closest('button,.kpop,.dlg,.pc,.card');R.push([where,L,V||'(empty)',(c?pl(c.querySelector('h4,b,.kat,.kopn')||c):'').slice(0,40)])}});
   host.querySelectorAll('.kgrid > .kl').forEach(l=>{const v=l.nextElementSibling;const L=pl(l),V=pl(v);if(LAB.test(L)&&NIL.test(V)){const c=l.closest('button');R.push([where,L,V||'(empty)',(c?pl(c.querySelector('h4')):'').slice(0,40)])}});
   return R},where);
  for(const [k,js] of Object.entries(SCENES)){try{await p.evaluate(js)}catch(e){continue}await p.waitForTimeout(900);for(const r of await scan(k))out.push([dev,...r])}
  const ids=await p.evaluate(()=>['c2a'].concat(Object.keys(PEND)));const re=process.env.ONLY?new RegExp(process.env.ONLY):null;
  const open=id=>p.evaluate(id=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');const kp=document.getElementById('kpop');if(kp)kp.remove();
   if(id==='c2a'){try{if(rgFire('c2a')){Q.length=1;showModal();return true}}catch(e){}return false}
   const v=(liveRivals(true)||[])[0];const C=[...(liveRivals(true)||[]).map(x=>x.id),...((S.srvs||S.servants||[]).map(x=>x&&x.id)),null,0,1,2,'emp','th','hh'];const E6=typeof EV6!=='undefined'?EV6[id]:null;let p6=null;
   if(E6&&typeof A6==='function'){p6={vi:0};for(let i=0;i<(E6.a||[]).length;i++){const c=C.find(x=>{try{return !!A6(E6.a[i],x)}catch(e){return false}});if(c===undefined){p6=null;break}p6['a'+i]=c}}
   for(const pp of [...(p6?[p6]:[]),{v:v&&v.id},{q:2,vp:0},{a0:v&&v.id,vi:0},{}]){let d=null;const pc=Object.assign({},pp);try{d=PEND[id](pc)}catch(e){d=null}if(!d)continue;try{Q.length=0;pushDil(mkP(id,pc),'Tuyến truyện');showModal();if(Q.length&&!document.getElementById('modal').hidden)return true}catch(e){}}return false},id).catch(()=>false);
  let nf=0;for(const id of ids.filter(i=>!re||re.test(i))){if(!(await open(id)))continue;nf++;await p.waitForTimeout(700);for(const r of await scan('ev:'+id))out.push([dev,...r])}
  console.log(dev,'frames',nf);await ctx.close()}
 for(const r of out){console.log(r.join(' | '));const k=r[0]+' '+r[2]+' '+r[3];tot[k]=(tot[k]||0)+1}
 console.log('TOTAL',out.length,JSON.stringify(tot));console.log(out.length?`EMPTY-ROWS FAIL ${out.length}`:'EMPTY-ROWS PASS');await b.close();process.exit(out.length?1:0)})();
