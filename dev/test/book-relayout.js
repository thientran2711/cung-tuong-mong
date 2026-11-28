/* book-relayout.js — review r8 FAIL 2: when a wide figure's picture arrives AFTER the Tuần lục book is open, the book re-lays out once
   (kitBookFigCol → the book's own relayout) and must keep the reader on the same fact, and must NOT dispatch a window resize.
   usage: node dev/test/book-relayout.js <build url | page.html> <outdir>   (env FIG, N facts, SZ=[[W,H],…], TURNS = pages to turn first)
   The figure's download is HELD until the reader has turned TURNS pages, then released. Exit 1 on failure. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const FIG=process.env.FIG||'fig-thaihau-h1-a51.webp',N=+(process.env.N||14),TURNS=+(process.env.TURNS||1);
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1000,755],[1180,820],[1366,1024]];const isFile=!/^https?:/.test(SRC);
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{window.__bot=1;window.__resizes=0;const a0=window.dispatchEvent.bind(window);window.dispatchEvent=function(e){if(e&&e.type==='resize')window.__resizes++;return a0(e)}});
  if(isFile)await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:fs.readFileSync(SRC),contentType:'text/html; charset=utf-8'}));
  let release;const gate=new Promise(r=>release=r);let held=0;
  await ctx.route('**/img/'+FIG+'*',async r=>{held++;await gate;r.continue()});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto(isFile?'http://ctm.test/index.html':SRC+'index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitBook==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}});
  const seen=()=>p.evaluate(()=>{const bk=window.__bk;const els=[...document.querySelectorAll('#dawn .kbk-sheet')];const c=bk.cur;
   const vis=[];if(bk.mode==='spread'&&c>0&&els[c-1])vis.push(els[c-1].querySelector('.kbk-back'));if(els[c])vis.push(els[c].querySelector('.kbk-front'));
   const facts=vis.flatMap(v=>[...v.querySelectorAll('.kbk-flow > *')].map(x=>(/Mục(\d+)/.exec(x.textContent)||[])[1]).filter(Boolean).map(Number));
   return {label:document.querySelector('#dawn .kbk-no').textContent,facts}});
  await p.evaluate(([FIG,N])=>{const k0=kitFigOf;window.kitFigOf=kitFigOf=function(q){if(q&&(q===S.thO||q.kind==='th'))return (typeof IMG_BASE==='string'?IMG_BASE:'')+'img/'+FIG;return k0.apply(this,arguments)};
   const who=S.thO||{kind:'th',name:'Thái hậu',age:60};let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';document.body.appendChild(w)}w.innerHTML='';w.hidden=false;w.className='dawn kbkdawn on';w.style.zIndex=2147483000;
   const facts=[];for(let i=0;i<N;i++)facts.push({text:`Mục${i}: Thái hậu ban thưởng, khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung cho phải phép.`,kind:'world',auto:false});
   window.__bk=kitBook({pages:[{kind:'person',who,title:'Thái hậu',blocks:[{facts}],n:N}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}})},[FIG,N]);
  await p.waitForTimeout(1500);
  const settle=async()=>{let a='',n=0;for(let k=0;k<40&&n<3;k++){await p.waitForTimeout(300);const l=await p.evaluate(()=>document.querySelector('#dawn .kbk-no').textContent+'|'+window.__bk.cur);if(l===a)n++;else{n=0;a=l}}};   /* page turn finished */
  await settle();for(let i=0;i<TURNS;i++){await p.evaluate(()=>window.__bk.next());await settle()}
  const before=await seen();const r0=await p.evaluate(()=>window.__resizes);
  release();await p.waitForTimeout(2500);await settle();
  const after=await seen();const r1=await p.evaluate(()=>window.__resizes);
  const keep=before.facts.length?after.facts.includes(before.facts[0]):true;
  const fail=[];if(!held)fail.push('figure was never requested (test did not hold anything)');if(!keep)fail.push(`jumped: was on Mục${before.facts[0]} (${before.label}), now ${after.label} Mục${after.facts.join(',')}`);
  if(r1>r0)fail.push(`dispatched ${r1-r0} window resize`);if(errs.length)fail.push('page errors '+errs[0]);
  if(fail.length)bad++;console.log(`${W}x${H} ${fail.length?'FAIL '+fail.join('; '):'ok'}  before ${before.label} [${before.facts}]  after ${after.label} [${after.facts}]  held ${held}`);
  await p.screenshot({path:`${OUT}/relayout-${W}x${H}.jpg`,type:'jpeg',quality:55});await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
