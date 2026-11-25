/* review/d-robot-bugs (Foreman D robot lives 25/11): scan + real checks for the bug family fixed there.
   #1 «f.rk.split is not a function»: a face's .rk is a CLASS STRING; every .rk string use goes through kitRk / kitRkCls (j15). Static scan + pcPort/mdH with rk = number / object / array / null / "c3 th".
   #5 the death ink banner (kitInk, j93) must not sit on the ending card: while .kmov.km-inkov plays, #modal.end is hidden (visibility), after it the card shows.
   usage: node dev/test/d-robot-bugs.js [WxH,...]   (needs the BUILT root: python3 dev/build/assemble.py && bash dev/site/build_site.sh) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const D=require('./lib/device');
const root=path.join(__dirname,'..','..');let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(c?'PASS':'FAIL',n,x===undefined?'':JSON.stringify(x))};
/* 1. static scan: every .rk string method call in the game code (before: j15 pcPort x2 unguarded; after: none outside the helper) */
{const dir=path.join(root,'dev','build');const hits=[];for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){fs.readFileSync(path.join(dir,f),'utf8').split('\n').forEach((l,i)=>{const re=/\.rk\.(split|slice|trim|replace|indexOf|startsWith|toLowerCase|match|substr)\b|\.rk\)\.(split|slice)\b/g;let m;while((m=re.exec(l)))hits.push(f+':'+(i+1)+' '+m[0])})}
 ok('scan: no .rk.<string method> call left (kitRk is the only way)',hits.length===0,hits)}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const wh of (process.argv[2]||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.route(/workers\.dev/,r=>r.abort());
  await p.goto(srv.url+'/index.html?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}render()});
  const r1=await p.evaluate(()=>{const out={};for(const [k,v] of [['num',3],['obj',{a:1}],['arr',["c1"]],['null',null],['str','c3 th'],['empty','']]){try{const f={rk:v,src:"",ini:"T",col:"#888"};const a=pcPort(f);const c=mdH(Object.assign({},f,{ini:"T"}));out[k]={port:(a.match(/class="pcp([^"]*)"/)||[])[1],md:(c.match(/class="md([^"]*)"/)||[])[1]}}catch(e){out[k]='THROW '+e.message}}return out});
  const bad1=Object.entries(r1).filter(([k,v])=>typeof v==='string'||/object|undefined|\[/.test(JSON.stringify(v)&&(v.port||'')+(v.md||'')));
  ok(wh+' #1 pcPort/mdH never throw, no junk class',bad1.length===0&&/rk-c3 rk-th/.test(r1.str.port)&&/rk-c3 rk-th/.test(r1.str.md),r1);
  /* #5 ending card vs the ink banner */
  await p.evaluate(()=>{document.querySelectorAll('[id^="kroul"],.kroul-ov').forEach(e=>e.remove());S.age=19;over("Hồng nhan bạc mệnh","Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 19 tuổi","bệnh",false);showModal()});
  await p.waitForTimeout(700);
  const a=await p.evaluate(()=>{const M=document.getElementById('modal');return{dbg:[(document.getElementById('dawn')||{}).className+'#'+(document.getElementById('dawn')||{}).hidden,!!document.getElementById('kpodov'),!!document.querySelector('[id^="kroul"],.kroul-ov'),!!document.getElementById('kmrew'),KMQ.length,kmBusy,kmFree(),[...document.querySelectorAll('.kmov')].map(e=>e.className)].join('/'),ink:!!document.querySelector('.kmov.km-inkov'),vis:getComputedStyle(M).visibility,end:M.classList.contains('end')}});
  ok(wh+' #5 ink on screen -> ending card held back',a.ink&&a.end&&a.vis==='hidden',a);
  await p.screenshot({path:`${process.env.OUT||'/tmp'}/drb-${wh}-ink.png`});
  const bt=await p.$('.kmov .kmend,.kmov [data-km-close]');
  if(!bt){await p.waitForTimeout(6000)}
  const bt2=await p.$('.kmov .kmend,.kmov [data-km-close]');
  if(bt2){const bb=await bt2.boundingBox();if(bb)await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)}else await p.mouse.click(W/2,H/2);
  await p.waitForTimeout(1200);
  const c=await p.evaluate(()=>{const M=document.getElementById('modal');return{ink:!!document.querySelector('.kmov.km-inkov:not(.km-out)'),vis:getComputedStyle(M).visibility,hid:M.hidden}});
  ok(wh+' #5 after the ink the ending card shows',!c.ink&&c.vis==='visible'&&!c.hid,c);
  await p.screenshot({path:`${process.env.OUT||'/tmp'}/drb-${wh}-card.png`});
  /* #4 ✕ / Lui on «Tin chờ người sai đi» and «Tâm trạng · X» when a forced card (night flip choice nfch) is put in FRONT after the dialog was drawn: ✕ must close THE DIALOG (not answer the hidden choice) */
  await p.evaluate(()=>{try{kmReset()}catch(e){}['buoitr','klife','curtain'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,[id^="kroul"],.kroul-ov').forEach(e=>e.remove());S.dead=false;Q.length=0;document.getElementById('modal').hidden=true});
  const NF=()=>({t:"Kính sự phòng",pid:"nfch",h:"<p>x</p>",opts:[{n:"Tranh sủng",fx:{}},{n:"Chặn ngự giá",fx:{}}]});
  const scen={
   look:()=>{Q.length=0;Q.push(NF());kitModal({kind:"info",look:1,title:"Tâm trạng · Thử",sub:"chưa rõ",subject:S,sections:[{h:"",rows:[["Tâm trạng","bình thản"]]}]});Q.unshift(Q.splice(Q.findIndex(m=>m.pid==="nfch"),1)[0])},
   tin:()=>{Q.length=0;S.away=[{id:"e1-0",by:"me",who:"mm:me",nm:"Tiểu cung nữ",k:"spy",lbl:"đi dò la",t0:0,due:0,back:1,read:0,rep:{t:"Tiểu cung nữ về",ok:null,L:["Nghe được vài lời."],d:[]}}];kitStatusIcon.refresh();kitStatusIcon.open("tin");const T=Q.filter(m=>m.t==='Tin chờ người sai đi');Q.length=0;T.forEach(m=>Q.push(m));showModal();Q.unshift(NF())}};
  for(const k of Object.keys(scen)){const src=scen[k].toString();
   await p.evaluate(`(()=>{const NF=${NF.toString()};(${src})()})()`);
   try{await p.waitForFunction(()=>!document.getElementById('modal').hidden,null,{timeout:8000})}catch(e){}await p.waitForTimeout(500);
   const r=await p.evaluate(()=>{const M=document.getElementById('modal');const x=[...M.querySelectorAll('.kit-x')].filter(e=>e.getClientRects().length)[0];return{title:(M.querySelector('.kptitle')||{}).textContent,x:x?JSON.stringify(x.getBoundingClientRect()):null,q:Q.map(m=>m.t)}});
   if(!r.x){ok(wh+' #4 '+k+' has a ✕',false,r);continue}
   const bb=JSON.parse(r.x);await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(700);
   const a=await p.evaluate(()=>{const M=document.getElementById('modal');return{title:(M.querySelector('.kptitle')||{}).textContent,q:Q.map(m=>m.t+'|'+(m.pid||''))}});
   ok(wh+' #4 '+k+': ✕ closes the dialog, the forced card is NOT answered',a.q.length===1&&a.q[0]==='Kính sự phòng|nfch'&&a.title!==r.title,{before:r,after:a});
   await p.screenshot({path:`${process.env.OUT||'/tmp'}/drb-${wh}-x-${k}.png`});
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
  ok(wh+' no page errors',errs.length===0,errs);await ctx.close()}
 await b.close();srv.close();console.log(bad?'FAIL':'ALL PASS');process.exit(bad?1:0)})();
