/* kg82-phase (D-KG82PHASE, F ROOT #2 ★ play-stopper) — node dev/test/kg82-phase.js [url | file] [WxH] [shotdir]
   Fault: KG82.phase stayed «play» after a round ended on the result / next-round screen (jexam «Môn kế tiếp / Xem kết quả», jmgcal «Hồi kế tiếp /
   Xem mức tay», jroute «Đã hiểu», …): the board screen was over but the game frame still said «play» (sign pass turned result buttons into ●, ✕ took the play branch).
   Fix: the ONE shared result path kg82ShowRes sets KG82.phase="result" and stops KG82.run, so no caller can forget.
   Runtime family check — EVERY caller of the shared game frame: rules → «Sẵn sàng» → board live → the board ends (KG82.cur.end, the engine's own end;
   jroute: its own end via KG82.quit) → on the result screen read: KG82.phase, KG82.run, result shown, result button words (not ● signs),
   rAF callbacks / s while idle on the result, Pixi tickers (stage PX, FX KFX) running, JS heap. Then a 10-board loop: heap + rAF after each board.
   Serve over http so dev/vendor/pixi-8.5.2 really loads (root index.html). Prints the before/after table. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SHOT=process.argv[4]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:VW,height:VH},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');
 const heap=async()=>{await cdp.send('HeapProfiler.collectGarbage').catch(()=>{});const m=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(m.find(x=>x.name===k)||{}).value||0;return{heapMB:+(g('JSHeapUsedSize')/1048576).toFixed(1),nodes:g('Nodes')}};
 await p.addInitScript(()=>{window.__raf=0;const r0=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=f=>r0(t=>{window.__raf++;return f(t)})});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(async()=>{localStorage.clear();SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  try{await kitPixi()}catch(e){}try{if(typeof kfApp==='function')await kfApp()}catch(e){}});
 await p.waitForTimeout(2500);
 const pixi=await p.evaluate(()=>({PIXI:!!window.PIXI,ver:window.PIXI&&PIXI.VERSION,PX:!!(typeof PX!=='undefined'&&PX.app),KFX:!!(typeof KFX!=='undefined'&&KFX.app)}));
 ok(pixi.PIXI,'pixi really loaded (stage / fx apps)',pixi);
 await p.evaluate(()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));
  window.__clean=()=>{document.querySelectorAll('body>*>.kmst').forEach(e=>e.parentElement.remove());document.querySelectorAll('#klife,#kmrew').forEach(e=>e.remove());try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;window.__done=[]};
  window.__fx=async()=>{for(let i=0;i<4;i++){const bt=[...document.querySelectorAll('body button')].find(x=>x.offsetParent&&!x.closest('#kg82,#modal')&&/^(Tiếp|Nhận)$/.test(x.textContent.trim()));if(!bt)return;bt.click();await sleep(700)}};
  window.__tick=()=>({px:!!(typeof PX!=='undefined'&&PX.app&&PX.app.ticker.started),fx:!!(typeof KFX!=='undefined'&&KFX.app&&KFX.app.ticker.started)});
  window.__resBtns=()=>{const rs=document.getElementById('kg82box-res');const L=[...document.querySelectorAll('#kg82 .kg82act button')].filter(x=>x.offsetParent);return L.map(x=>(x.textContent||'').replace(/\s+/g,' ').trim().slice(0,22))};
  window.__shown=()=>{const rs=document.getElementById('kg82box-res');return !!(rs&&!rs.hidden&&rs.innerHTML.length>0)||!!document.getElementById('sgdo')||!!document.getElementById('toildone')};
  /* one board: open (src), «Sẵn sàng», let the board run, end it the engine's own way, read the result screen */
  window.__board=async(src,o)=>{o=o||{};const r={};if(!o.keep){__clean();(0,eval)(src)}await sleep(o.wait||1000);
   const box=kg82Box();const go=box&&(box.querySelector('.kgr-go')||box.querySelector('#kg82go,#kg92go,#sggo'));if(!go){r.err='no go';return r}go.click();await sleep(o.play||2200);
   r.live=KG82.phase;r.liveRun=!!KG82.run;
   if(KG82.cur&&typeof KG82.cur.end==='function'&&KG82.phase==='play'&&!o.quit)KG82.cur.end(7);else if(typeof KG82.quit==='function'){r.byQuit=1;const q=KG82.quit;KG82.quit=null;q()}
   await sleep(o.res||1200);await __fx();
   r.phase=KG82.phase;r.run=!!KG82.run;r.shown=__shown();r.btns=__resBtns();r.signs=r.btns.filter(t=>/^[●?✓↶↷♨]$/.test(t)).length;
   const a0=window.__raf;await sleep(2000);r.rafS=Math.round((window.__raf-a0)/2);r.tick=__tick();r.cls=(document.getElementById('kg82')||{}).className||'';return r}});
 const D='(x)=>window.__done.push(x===undefined?"cb":x&&x.raw!=null?x.raw:x)';const v=`(liveRivals(true)[0])`;
 const CALL=[
  ['j82 startContest (hội thi)',`startContest({art:"dan",title:"Hội Thượng nguyên",onDone:${D}})`],
  ['j82 playArt (học / tác phẩm)',`playArt({art:"mua",title:"Tự học",onDone:${D}})`],
  ['jentry tuyển chọn',`kcEntryExam("dan",${D},{})`],
  ['jslap Tát',`slapGame({dodge:false,by:${v},title:"Giáng tay",rows:[],go:"Tát",skip:"Tát luôn",skipSub:"",onDone:${D}})`],
  ['jtd Tu đức','(TDS.busy=false,S.mg=null,tdPlay("cong","self"))'],
  ['jts Hoàng thượng triệu',`tsGame({kind:"duho",odds:50,onDone:${D}})`],
  ['jsgame mưu kế',`sgPlay({G:SG.K.rumor,art:"Mưu kế",v:${v},p0:()=>50,run:${D},cost:""})`],
  ['jroute Nghiệm thân',`rtNgSleight("alum",3,${D})`,{quit:1}],
  ['j92 Chải chuốt','(can(1)||(S.ap=9),wdGroomUI())'],
 ];
 const rows=[];
 for(const [l,src,o] of CALL){let r;try{r=await p.evaluate(([s,o])=>window.__board(s,o),[src,o||{}])}catch(e){r={err:String(e.message).slice(0,160)}}rows.push([l,r])}
 /* jexam: Môn 1 → «Môn kế tiếp» → Môn 2 → «Xem kết quả» → final «Đã hiểu» */
 {let r1,r2,r3;try{r1=await p.evaluate(()=>window.__board('exRun(exPlan(S),{},'+'(x)=>window.__done.push(1))'));rows.push(['jexam khảo hạch · Môn 1 → «'+(r1.btns||[]).join('/')+'»',r1]);
   r2=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));document.getElementById('kg82ok').click();await sleep(300);return window.__board('',{keep:1})});rows.push(['jexam khảo hạch · Môn 2 → «'+(r2.btns||[]).join('/')+'»',r2]);
   r3=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const k=document.getElementById('kg82ok');const last=k&&/Xem kết quả/.test(k.textContent);if(k)k.click();await sleep(1000);return{last,phase:KG82.phase,run:!!KG82.run,shown:__shown(),btns:__resBtns(),signs:0,tick:__tick(),rafS:0}});rows.push(['jexam khảo hạch · kết quả',r3])}catch(e){rows.push(['jexam',{err:String(e.message).slice(0,160)}])}}
 /* jmgcal Thử tay: hồi 1 → «Hồi kế tiếp» */
 {let r;try{r=await p.evaluate(()=>window.__board('mgCalRun("dan")'));r.signs=(r.btns||[]).filter(t=>/^[●?✓↶↷♨]/.test(t)&&!/Chép|Thử|Dừng|Hồi|Xem/.test(t)).length}catch(e){r={err:String(e.message).slice(0,160)}}rows.push(['jmgcal Thử tay · hồi 1 → «'+((r.btns||[]).join('/'))+'»',r])}
 if(SHOT){const fs=require('fs');fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/mgcal-res-${VW}x${VH}.png`});
  await p.evaluate(()=>window.__board('exRun(exPlan(S),{},()=>{})'));await p.screenshot({path:`${SHOT}/exam-mon1-res-${VW}x${VH}.png`})}
 console.log('\n| caller · screen | live board phase | result: KG82.phase | KG82.run | result shown | buttons (● = turned to a sign) | rAF/s idle on result | Pixi tickers px/fx |');console.log('|---|---|---|---|---|---|---|---|');
 for(const [l,r] of rows)console.log(`| ${l} | ${r.live||'–'} | ${r.err?'ERR '+r.err:r.phase} | ${r.run?'running':'stopped'} | ${r.shown?'yes':'no'} | ${(r.btns||[]).join(' / ')} | ${r.rafS} | ${r.tick?(r.tick.px?'on':'off')+'/'+(r.tick.fx?'on':'off'):'–'} |`);
 /* 10-board memory / idle loop */
 const mem=[await heap()];const loop=[];for(let i=0;i<10;i++){const [l,src,o]=CALL[i%CALL.length];const r=await p.evaluate(([s,o])=>window.__board(s,o),[src,o||{}]).catch(e=>({err:e.message}));await p.evaluate(()=>__clean());mem.push(await heap());loop.push(r.rafS)}
 console.log('\nheap MB after board 0..10: '+mem.map(m=>m.heapMB).join(' → ')+' · DOM nodes '+mem[0].nodes+' → '+mem[10].nodes+' · rAF/s idle on each result: '+loop.join(' '));
 const bad=rows.filter(([l,r])=>r.err||r.phase!=='result'||r.run||!r.shown);ok(!bad.length,'every board end path: result screen shows with KG82.phase «result» and the run stopped',bad.map(([l,r])=>l+' '+JSON.stringify(r).slice(0,200)));
 const sg=rows.filter(([l,r])=>r.signs>0);ok(!sg.length,'result / next-round buttons keep their words (no ● sign pass on a result screen)',sg.map(([l,r])=>l+' '+(r.btns||[]).join('/')));
 ok(mem[10].heapMB-mem[1].heapMB<25,'10 boards: no heap growth beyond 25 MB (board 1 → 10)',mem.map(m=>m.heapMB));
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
