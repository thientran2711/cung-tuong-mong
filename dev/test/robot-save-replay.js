/* robot-save-replay (ROBOT-10 bugs A/B): load a robot save through a REAL page reload (title «Tiếp tục»), then drive it.
   A = press «Sang ngày mới» until the day turns (save dev/handover/robot/saves/proof-save-001-softlock-after-load.json, handover branch);
   B = Mưu kế «Hạ độc» on a rival → «Ra tay ngay» → «Làm như thường» (save-B-hadoc-loop.json; that save is from AFTER the loop — she was
       confined later and holds 5 bạc — so this replay lifts the confinement and gives bạc, test only: the card routing is what is checked).
   usage: node dev/test/robot-save-replay.js <url> <save.json> A|B   → prints JSON; exit 1 when the bug shows (A: day not turned; B: loop) */
const {chromium}=require('playwright');const [,,URL,SAVE,MODE]=process.argv;const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:0});
 await p.evaluate(s=>{localStorage.clear();localStorage.setItem("hclh-save-v2-1",s);localStorage.setItem("hclh-slot","1")},fs.readFileSync(SAVE,'utf8'));
 await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button[data-load="1"]'),null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.querySelector('#slots button[data-load="1"]').click()});await p.waitForTimeout(2500);
 const r=await p.evaluate(async MODE=>{window.__bot=1;const sl=ms=>new Promise(r=>setTimeout(r,ms));const o={wk0:wk(),buoi0:S.buoi,q0:Q.map(m=>m.pid||m.t),x0:JSON.stringify(S.nfX)};
  const drain=(pick)=>{for(let n=0;n<40&&Q.length;n++){const m=Q[0];const op=m.opts||[];if(op.length){let i=pick?pick(m,op):-1;if(i<0)i=op.findIndex(x=>x.n==="Thôi");if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}};
  if(MODE==="A"){let k=0;const d=wk();for(;k<12&&wk()===d;k++){drain();used=Math.max(used,BAL.time.khac);nextBuoi();await sl(50)}drain();o.presses=k;o.turned=wk()!==d;o.x1=JSON.stringify(S.nfX)}
  else{S.bac=Math.max(S.bac||0,5000);S.confined=0;S.out=0;/* test only: the save holds 5 bạc */const K=Object.keys(ACT).filter(k=>ACT[k].n==="Hạ độc");o.keys=K;const k=K[0];const L=liveRivals(false);o.nR=L.length;o.okR=L.filter(x=>ACT[k].ok(S,x)).length;o.can2=can(2);o.used=used;o.bac=S.bac;
   o.logs=(S.logs||[]).slice(0,6).map(x=>String(x).replace(/<[^>]+>/g,"").slice(0,90));const v=L.find(x=>ACT[k].ok(S,x));o.target=v&&v.name;const u0=used;let bm=0,rp=0,taps=0;Q.length=0;
   if(v){doAct(rivals.indexOf(v),k);while(Q.length&&taps<8){const m=Q[0],op=m.opts||[];let j=-1;if(m.pid==="j70start"){bm++;j=op.findIndex(x=>/^Ra tay ngay/.test(x.n))}else if(m.pid==="roadpick"){rp++;j=op.findIndex(x=>x.n==="Làm như thường")}else break;taps++;chooseM(j)}}
   o.bm=bm;o.rp=rp;o.taps=taps;o.spent=used-u0;o.loop=taps>=8}
  return o},MODE);
 r.errs=errs.length;console.log(JSON.stringify(r));await b.close();process.exit((MODE==="A"?!r.turned:r.loop||!r.target)||r.errs?1:0)})();
