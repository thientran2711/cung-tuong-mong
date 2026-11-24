/* review/selection-scene (SELSCENE-6): Dưỡng Tú viện on the Dư đồ level 2 (OD 24/11 ~05:35Z / ~08:20Z) — the free card offers «Ra Dư đồ» instead of «Sang …»,
   the map opens on the jpm courtyard level with 4 parts (3 sở + Tiền sảnh) and people counts, «Sang buổi» stays shut, a part tap walks there (BAL.walk.near khắc)
   and brings back her free card there, the deferred cards come back after; «Ra Dư đồ» raises no result card.  usage: node dev/test/selx-map.js [index.html] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,600):'')}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxMapGo==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(()=>{const o={};for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k==="tt")break}S.kcPick="cung";nlAccept();window.__selxNoSc=1;
  const close=()=>document.querySelectorAll(".kmov,#kprevov,#kg82").forEach(x=>x.remove());let card=null;
  for(let n=0;n<60&&Q.length;n++){const m=Q[0];const nm=(m.opts||[]).map(x=>x.n);if(nm.includes("Ra Dư đồ")){card=m;break}const c=nm.findIndex(s=>/Cất đồ|Theo|Tập thật kỹ|Quỳ|Nghe/.test(s));if(m.opts)chooseM(c<0?0:c);else closeModal();close()}
  o.found=!!card;o.noSang=card&&!card.opts.some(x=>/^Sang /.test(x.n));const q0=Q.length-1;document.querySelectorAll('#rtoast').forEach(x=>x.remove());
  showModal();const j=card.opts.findIndex(x=>x.n==="Ra Dư đồ");document.querySelector('#modal button[data-m="'+j+'"]').click();render();
  o.tab=tab;o.Q=Q.length;o.toast=!!document.getElementById('rtoast');o.kpmv=!!document.querySelector('#panel .kpmv');o.rows=[...document.querySelectorAll('#panel .kpm-row')].map(x=>x.dataset.kpmpart);
  o.sel=(document.querySelector('#panel .kpm-row.sel')||{}).dataset;o.sel=o.sel&&o.sel.kpmpart;o.at=S.selx2.at;o.next=document.getElementById('next').disabled;
  const n=[...document.querySelectorAll('#panel .kpm-row')].reduce((a,x)=>a+(+((x.textContent.match(/(\d+) bóng/)||[])[1]||0)),0);o.count=n;o.all=1+selxAll().length;
  const kh=S.selx2.kh;const t=[...document.querySelectorAll('#panel .kpm-row')].find(x=>x.dataset.kpmpart!==S.selx2.at);const to=t.dataset.kpmpart;t.click();
  o.moved=S.selx2.at===to;o.spent=kh-S.selx2.kh;o.walk=BAL.walk.near;o.back=Q[0]&&Q[0].pid==="selxD"&&tab==="act";o.restored=Q.length-1>=q0;return o});
 ok(r.found&&r.noSang,'free card: «Ra Dư đồ» replaces the «Sang …» rows',r);
 ok(r.tab==="go"&&r.kpmv&&r.rows.join()==="dong,tay,bac,sanh",'the Dư đồ opens on Dưỡng Tú viện level 2: Đông / Tây / Bắc sở + Tiền sảnh',r.rows);
 ok(!r.toast,'«Ra Dư đồ» raises no result card',r.toast);
 ok(r.sel===r.at,'her part is the kit «here» row',[r.sel,r.at]);
 ok(r.count===r.all,'people counts per part add up to everyone (her + the girls)',[r.count,r.all]);
 ok(r.next,'«Sang buổi» stays shut during the 3 days',r.next);
 ok(r.moved&&r.spent===r.walk,'a part tap walks there for BAL.walk.near khắc',[r.moved,r.spent,r.walk]);
 ok(r.back&&r.restored,'her free card comes back there; the deferred cards are back in the queue',[r.back,r.restored]);
 ok(!errs.length,'no page errors',errs);
 console.log(bad?`${bad} FAIL`:'ALL PASS');await b.close();process.exit(bad?1:0)})();
