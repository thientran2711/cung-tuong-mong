/* kit-pair.js (KK56, RV-167): the Dư đồ bottom pair (Ân sủng | Nguy hiểm) on Fold 755x1000 (+ iPad): both cards have the kit header, equal height on the Fold, and EVERY row of both = label (.k3l) + value (b).
   usage: node dev/test/kit-pair.js <index.html> [outdir]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const F=path.resolve(process.argv[2]||'index.html'),O=process.argv[3]||'';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:O?2:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto('file://'+F,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitReward,null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{if(typeof kitRoulette==='function'){kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{REC.tour='done'}catch(e){}start()});
 for(let i=0;i<5;i++){await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
 await p.evaluate(()=>{tab='go';render()});await p.waitForTimeout(1200);
 const m=await p.evaluate(()=>{const h=e=>{const x=document.querySelector(e);return x?Math.round(x.getBoundingClientRect().height):0};const rows=[...document.querySelectorAll('.kas .k3r,.k3py .k3r')].map(r=>({t:r.textContent.trim().slice(0,30),l:!!r.querySelector('.k3l'),v:!!r.querySelector(':scope > b')}));return {kas:h('.kas'),k3py:h('.k3py'),hdrR:!!document.querySelector('.k3py .k3h'),hdrL:!!document.querySelector('.kas .k3h'),rows}});
 const D=W+'x'+H;ok(m.hdrL&&m.hdrR,`${D}: both cards have the kit header`);ok(W>=1100||Math.abs(m.kas-m.k3py)<=1,`${D}: pair equal height (${m.kas}/${m.k3py})`);
 const badr=m.rows.filter(r=>!(r.l&&r.v));ok(m.rows.length>0&&!badr.length,`${D}: every row = label + value (${m.rows.length} rows${badr.length?', bad: '+JSON.stringify(badr):''})`);ok(!errs.length,`${D}: no page errors`);
 if(O)await p.screenshot({path:`${O}/pair-${W}x${H}.png`});await ctx.close()}
await b.close();process.exit(bad?1:0)})();
