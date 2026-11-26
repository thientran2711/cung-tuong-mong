/* DUP-REPORT SCAN (E97, owner 26/11 feature-duplication audit): every act button the consort road offers — ACT table, Hành sự / Hậu cung / Cung nhân / Tư trang / Hoàng tự / Tài nghệ panels (hidden group panes included), and every person met in Dư đồ (dfActs = the stage pop-up). usage: node dev/test/dup-report-scan.js <out.json> [url]. Deck union over seeds: dev/test/act-dedupe-deck.js. */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(process.argv[3]||'file://'+require('path').resolve(__dirname,'../../index.html'),{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);const out={};
 out.ACT=await p.evaluate(()=>Object.keys(ACT).map(k=>{const a=ACT[k];let c="",x="";try{c=kitActCat(a.n)}catch(e){}try{x=String(a.x||"")}catch(e){}return {k,n:String(a.n),cat:c,x}}));
 for(const sc of ['cao','hh','con']){await p.evaluate(n=>AA.scen(n),sc);
  out[sc]=await p.evaluate(()=>{const R={surf:{},place:{}};const T=e=>(e&&e.innerText||"").replace(/\s+/g," ").trim();
   for(const sf of AA.surfaces()){try{AA.restore(1);
     if(sf.place){AA.show(sf);const L=[];let ppl=[];try{ppl=curPeople()}catch(e){}
       ppl.forEach((q,i)=>{let g=null;try{g=dfActs(i)}catch(e){}L.push({who:(q.name||q.kind||"?")+"|"+q.kind,groups:(g||[]).map(x=>({n:x.n,acts:x.acts.map(a=>a.n+" ["+a.ton+"]")}))})});
       R.place[sf.id]={people:L,btns:[...document.querySelectorAll('#panel button')].map(x=>T(x).slice(0,80)).filter(Boolean).slice(0,60)}}
     else{AA.show(sf);const pan=document.querySelector('#panel');const tabs=[...pan.querySelectorAll('.pctabs .pct')].map(t=>t.dataset.pct||t.textContent.trim());const panes=[...pan.querySelectorAll('.pcg')];
 R.surf[sf.id]=[...pan.querySelectorAll('button')].filter(x=>typeof dfIsAct!=="function"||dfIsAct(x)).map(x=>{const pg=x.closest('.pcg');const gi=pg?panes.indexOf(pg):-1;const sm=x.querySelector('small');return {n:(typeof dfBtnTitle==="function"?dfBtnTitle(x):"")||x.textContent.trim().slice(0,40),g:gi>=0?(tabs[gi]||("g"+gi)):"",d:Object.keys(x.dataset).filter(k=>!/^k/.test(k)).map(k=>k+"="+x.dataset[k]).join("&"),sm:sm?sm.textContent.replace(/\s+/g," ").trim().slice(0,160):"",off:x.disabled}})}
   }catch(e){R.surf[sf.id]=["ERR "+e.message]}}
   return R});console.error(sc,'done')}
 out.perr=perr;fs.writeFileSync(process.argv[2],JSON.stringify(out));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
