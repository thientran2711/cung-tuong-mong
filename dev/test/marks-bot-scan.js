/* MARKS bot scan (law 11, MAIN 164): a sensible bot life (dev/measure/inpage4.js) plays; EVERY dialog the game pushes (pushModal) is read through the kit row builder
   (kitParse → kaBody); any Được / Mất / Kèm / Ghi chú text markTxt(text,row) would still change = a stat number left on a choice = FAIL. TỐN rows are exact by rule and skipped.
   usage: node dev/test/marks-bot-scan.js <page url> [steps=3000] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,ST]=process.argv;const STEPS=+ST||3000;const INP=fs.readFileSync(path.join(__dirname,'..','measure','inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1500']});const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof markTxt==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById("title").hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin,null,{timeout:120000});await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#klife,.klife').forEach(e=>e.remove())});await p.evaluate(INP);
 await p.evaluate(()=>{window.__M={bad:[],seen:new Set(),dlg:0,txt:0,signed:0};const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const chk=m=>{if(!m||!m.opts||!m.opts.length)return;__M.dlg++;for(const o of m.opts){const x=typeof o.x==="function"?"":o.x;if(!x)continue;let h="";try{h=kitParse(String(x))}catch(e){continue}const t=document.createElement("template");t.innerHTML=h;
   t.content.querySelectorAll(".ef,.kwhy").forEach(e=>{if(e.closest(".kr-ton"))return;const tx=T(e.textContent);if(!tx)return;__M.txt++;if(/[+−-]\s?\d/.test(tx))__M.signed++;if(markTxt(tx,"duoc")!==tx&&!__M.seen.has(tx)){__M.seen.add(tx);__M.bad.push(tx.slice(0,140)+"  ← "+T(o.n).slice(0,30))}})}};
  const pm=pushModal;pushModal=function(m){try{chk(m)}catch(e){}return pm.apply(this,arguments)}});
 /* the new-life intro (Thân phận, dung mạo…) is answered with the first option until the game starts */
 for(let i=0;i<80;i++){const r=await p.evaluate(()=>{const M=document.getElementById('modal');const o=!M.hidden&&document.querySelector('#mb .opt:not([disabled])');if(o){o.click();return 'click'}return Q.length?'wait':'free'});await p.waitForTimeout(150);if(r==='free'&&await p.evaluate(()=>S.turn>=0&&!Q.length&&!NLP))break}
 /* forced turns: showModal stubbed (nothing blocks), every dialog the game pushes is read by the pushModal hook; Q cleared each step */
 await p.evaluate(()=>{window.__sm=showModal;showModal=function(){}});
 const T0=Date.now(),LIM=+(process.env.LIMIT_S||240)*1000;let done=0;
 while(done<STEPS&&Date.now()-T0<LIM){await p.evaluate(()=>{for(let i=0;i<10;i++){if(!S||S.dead){try{start()}catch(e){}}Q.length=0;try{(i%2?endTurn:nextBuoi)()}catch(e){}Q.length=0}});done+=10}
 const R=await p.evaluate(()=>({dlg:__M.dlg,txt:__M.txt,signed:__M.signed,bad:__M.bad,turn:S&&S.turn}));
 console.log(JSON.stringify({dialogs:R.dlg,rowTexts:R.txt,signedLeft:R.signed,turn:R.turn,numbersLeftOnChoices:R.bad.length,errs:errs.slice(0,3)},null,1));R.bad.slice(0,60).forEach(x=>console.log('  LEFT',x));await b.close();process.exit(R.bad.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
