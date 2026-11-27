/* sfx-instant-scan (review/sfx-instant, OD 24/11 ~18:05Z item 2, FIX THE WHOLE GROUP): every tap / UI / mini-game sound must play at once on every tap.
   Real gesture policy (no autoplay flag); files served from <root> by route interception; optional <index> = another built index.html (the BEFORE build).
   Checks, per file of the tap family (SFXL ui layer + every mg* moment + item-pop/open/close/lock/page):
     ready  = decoded into a WebAudio buffer within 2.5 s of her first touch (else its first play is a cold <audio> = late / silent)
   and for the family as a whole:
     burst  = 8 tap sounds in 8 quick taps (90 ms apart, 2 sounds per tap like Múa): how many were dropped
     synth  = window.__bellCtx (bell, kg82Pluck fallback, Sổ tuần knock) is the unlocked context (else its first sound is made in a suspended context)
     first  = the very first touch of the session lands on a mini-game: its stroke sound plays (after the unlock) instead of being dropped
   usage: node dev/test/sfx-instant-scan.js <root> [index.html override] [WxH=755x1000]   → JSON; exit 1 when a check fails (after build only) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,ROOT,IDX,SZ='755x1000']=process.argv;const [W,H]=SZ.split('x').map(Number);
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
async function page(b){const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:true,deviceScaleFactor:1,serviceWorkers:'block'});
 await ctx.route('http://g.test/**',async r=>{const u=new URL(r.request().url());let f=path.join(ROOT,decodeURIComponent(u.pathname));if(/\/index\.html$/.test(u.pathname)&&IDX&&IDX!=='-')f=IDX;
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});if(/\.mp3$/.test(f))await new Promise(o=>setTimeout(o,150));
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[path.extname(f)]||'application/octet-stream'}})});
 await ctx.route(/^https?:\/\/(?!g\.test)/,r=>r.fulfill({status:404,body:''}));
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.__errs=[];p.on('pageerror',e=>p.__errs.push(e.message.slice(0,160)));
 await p.goto('http://g.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitSfx==='function'&&typeof kg82Play==='function');await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}OPT.snd=true;OPT.mute=false;OPT.sfx=.7;saveOpt();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await p.waitForTimeout(300);const s=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;try{nlNew()}catch(e){}start()}return s});if(!s)break}
 await p.evaluate(()=>{document.querySelectorAll('.kroul,#kroul').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;tab='go';render()});return p}
(async()=>{const b=await chromium.launch();const out={size:SZ,build:IDX&&IDX!=='-'?'before':'after'};
 /* A: her first touch anywhere, then the family */
 let p=await page(b);await p.touchscreen.tap(Math.round(W/2),40);await p.waitForTimeout(2500);
 out.family=await p.evaluate(()=>{const F=new Set();Object.keys(SFXL).forEach(f=>{if(SFXL[f].ui)F.add(f)});Object.keys(SFXN).forEach(k=>{if(/^mg/.test(k))F.add(SFXN[k])});["sfx-item-pop","sfx-open","sfx-close","sfx-lock","sfx-page","sfx-tap"].forEach(f=>F.add(f));
  return [...F].sort().map(f=>({f,ready:!!(AU.bufs&&AU.bufs[f]&&AU.bufs[f].buf)}))});
 out.synth=await p.evaluate(()=>({shared:!!AU.ctx&&window.__bellCtx===AU.ctx,state:AU.ctx&&AU.ctx.state}));
 out.burst=await p.evaluate(async()=>{const d0=KSFX.drop.length,l0=KSFX.log.length;for(let i=0;i<8;i++){sfx("sfx-step",{m:"mgStep"});sfx(i%3?"sfx-mg-pluck":"sfx-mg-miss",{m:"mgPluck"});await new Promise(r=>setTimeout(r,90))}
  return{asked:16,played:KSFX.log.length-l0,dropped:KSFX.drop.slice(d0).filter(d=>/full|twice|dead/.test(d.why)).map(d=>d.n.replace('sfx-','')+':'+d.why)}});
 out.errsA=p.__errs;await p.context().close();
 /* B: the very first touch of the session is a mini-game tap */
 p=await page(b);await p.evaluate(()=>{kg82Open({art:'Thử tay',title:'t',how:''});KG82.noDemo=true;kg82Play('mua',()=>{})});await p.waitForTimeout(1500);
 const bx=await p.evaluate(()=>{const c=document.querySelector('.kgbox canvas,.kg82cv');const r=c.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2-Math.min(r.width,r.height)*.31}});
 const l0=await p.evaluate(()=>KSFX.log.length);await p.touchscreen.tap(Math.round(bx.x),Math.round(bx.y));await p.waitForTimeout(600);
 out.first=await p.evaluate(l0=>({played:KSFX.log.slice(l0).map(x=>x.n.replace('sfx-','')),dropped:KSFX.drop.slice(-4).map(d=>d.n.replace('sfx-','')+':'+d.why)}),l0);
 out.errsB=p.__errs;await b.close();
 const notReady=out.family.filter(x=>!x.ready).map(x=>x.f);
 out.summary={files:out.family.length,ready:out.family.length-notReady.length,notReady,burstDropped:out.burst.dropped.length,synthShared:out.synth.shared,firstTouchSounds:out.first.played.length>0,errs:out.errsA.length+out.errsB.length};
 const ok=!notReady.length&&!out.burst.dropped.length&&out.synth.shared&&out.summary.firstTouchSounds&&!out.summary.errs;out.summary.PASS=ok;
 console.log(JSON.stringify(out));if(out.build==='after'&&!ok)process.exit(1)})().catch(e=>{console.error(e);process.exit(1)});
