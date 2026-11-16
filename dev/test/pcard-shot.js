/* review/pcard-fill shots: node dev/test/pcard-shot.js <url> <WxH> <outdir> [tab=rv|court|men|staff]... */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,...TABS]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
  kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};
  Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()});
 await p.waitForTimeout(1500);
 for(const t of (TABS.length?TABS:['rv'])){await p.evaluate(t=>{if(t==='pop'){Q.length=0;document.getElementById('modal').hidden=true;tab='act';render();const i=curPeople().findIndex(x=>x.ref&&x.kind!=='chest');popIdx=i<0?0:i;popMsg='';renderStage();return}Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}},t);await p.waitForTimeout(6000);
  await p.screenshot({path:`${OUT}/${SZ}-${t}.png`});}
 console.log(JSON.stringify({errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
