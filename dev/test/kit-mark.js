/* kit-mark (review/kit-mark, owner OD 20/11 ~07:15Z, KIT §13.10) — node dev/test/kit-mark.js [dev/index.html] [WxH] [outdir]
   1 EVERY kind (all KG82_KIND, via playArt / startContest): after «Sẵn sàng» the title line holds ONE small chip «n/10» (.kgmk, number only, no words, no %)
     beside the clock, the old PHẦN/HỒI/CÒN row stays hidden; before «Sẵn sàng» there is no chip
   2 the chip = the graded mark in hand: after the engine reports score s the chip equals s (the HUD score is already the graded mark, no second grading), and it still equals it
     after env.end — the same number the result gives (onEnd(mgGrade(raw)))
   3 a drop pops (.kgmk-pop), a rise does not
   4 the clock chip turns AMBER (.kchip.w, .kgclk-amber) once the full-marks window (mgFast) is passed, normal at the round start / for a kind with no time part
   5 no page errors. Prints the table kind × (engine, chip, expected, clock tone). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const OUT=process.argv[4]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:OUT?2:1});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  window.__km=async(src)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const r={};try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   try{(0,eval)(src)}catch(e){r.err=String(e.message||e);return r}
   await sleep(900);const box=kg82Box();if(!box){r.nobox=1;return r}
   const mk=()=>document.querySelector('.kgame .kgmk'),vis=e=>e&&!e.hidden;
   r.pre=vis(mk());const go=box.querySelector('.kgr-go');if(!go){r.nogo=1;return r}go.click();await sleep(1300);
   const c=KG82.cur;r.kind=c&&c.kind;r.chip=vis(mk())?mk().textContent.trim():null;r.row=[...document.querySelectorAll('.kgame .kghud')].every(h=>h.hidden);
   r.title=!!(mk()&&mk().parentNode&&mk().parentNode.classList.contains('kph'));
   try{KG82.run.stop()}catch(e){}/* freeze the engine: only my hud calls from here */
   const set=(s)=>c.hud({score:s});set("3/10");await sleep(50);mk().classList.remove('kgmk-pop');set("8/10");await sleep(50);r.a=mk().textContent.trim();r.exp8=8;r.popA=mk().classList.contains('kgmk-pop');
   set("5/10");await sleep(50);r.b=mk().textContent.trim();r.exp5=5;r.popB=mk().classList.contains('kgmk-pop');
   set("7/10");await sleep(50);r.popC=mk().classList.contains('kgmk-pop')&&false;r.c=mk().textContent.trim();r.exp7=7;
   /* clock: a kind with a time part */
   const tone=()=>{const e=document.querySelector('.kgame .kgclk');return e&&!e.hidden?{amber:e.classList.contains('kgclk-amber'),w:!!e.querySelector('.kchip.w'),txt:e.textContent.trim()}:null};
   const L=Math.max(25,Math.ceil(((document.querySelector('.kgame .kgclk')||{dataset:{}}).dataset.len||0)/1000)),T=n=>({time:n+" giây"});
   c.hud(T(L));await sleep(30);r.t0=tone();c.hud(T(1));await sleep(30);r.t1=tone();c.hud(T(L));await sleep(30);r.t2=tone();
   r.fast=typeof mgFast==="function"?mgFast(c,c.kind):'nofn';
   /* the end: chip = the result's mark */
   const last=KG82.lastScore;c.end(7.0);await sleep(400);{const m=/(\d+)\s*\/\s*(\d+)/.exec(String(KG82.lastScore))||[0,0,10];r.lastExp=Math.round(+m[2]===10?+m[1]:10*m[1]/m[2])}r.after=mk()&&!mk().hidden?mk().textContent.trim():null;r.res=(document.querySelector('.kgres')||{}).innerText||'';
   return r};
  window.__kinds=Object.keys(KG82_KIND).map(k=>[k,KG82_KIND[k].e])});
 const kinds=await p.evaluate(()=>window.__kinds);console.log('kind | engine | chip | graded(8,5,7) | clock tone | after end');
 for(const [k,e] of kinds){const src=k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:k==='chai'?`(can(1)||(S.ap=9),wdGroomUI())`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
  const r=await p.evaluate(s=>window.__km(s),src);
  const f=n=>n+'/10';
  console.log([k,e,r.chip,[r.a,r.b,r.c].join(','),r.t0&&(r.t0.amber?'A':'n')+(r.t1&&r.t1.amber?'A':'n')+(r.t2&&r.t2.amber?'A':'n'),r.after,'fast='+r.fast].join(' | '));
  ok(!r.err&&!r.nobox&&!r.nogo,`kind ${k}: opened`,r.err||r.nogo);
  ok(r.pre===false||r.pre===undefined||!r.pre,`kind ${k}: no chip before «Sẵn sàng»`);
  ok(/^\d+\/10$/.test(r.chip||''),`kind ${k}: chip «n/10» number only`,r.chip);
  ok(r.row,`kind ${k}: PHẦN/HỒI/CÒN row still hidden`);ok(r.title,`kind ${k}: chip sits in the title line`);
  ok(r.a===f(r.exp8)&&r.b===f(r.exp5)&&r.c===f(r.exp7),`kind ${k}: chip = HUD mark (no second grading)`,[r.a,r.b,r.c,r.exp8,r.exp5,r.exp7]);
  ok(r.popB&&!r.popA,`kind ${k}: pop on a drop only`,[r.popA,r.popB]);
  ok(r.after===f(mgGrade_(r)),`kind ${k}: chip after end = result mark`,[r.after,mgGrade_(r)]);
  if(r.fast!=null&&r.fast!=='nofn'&&r.fast>0&&r.t0){ok(r.t0&&!r.t0.amber&&r.t1&&r.t1.amber&&r.t1.w&&r.t2&&!r.t2.amber,`kind ${k}: clock normal → AMBER after the window → normal at a new round`,[r.t0,r.t1,r.t2,r.fast])}
  else if(r.t1)ok(!r.t1.amber,`kind ${k}: no time part or window 0 → clock never amber`,r.t1);
 }
 function mgGrade_(r){return r.lastExp}
 ok(!errs.length,'no page errors',errs.slice(0,3));
 if(OUT){const fs=require('fs');fs.mkdirSync(OUT,{recursive:true})}
 console.log(res.every(x=>x)?'KIT-MARK PASS':'KIT-MARK FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
