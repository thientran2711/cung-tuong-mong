/* title-never-bare — the ONE «#title never bare» guard (j74 tgBlank/tgFix/tgSoon + closeModal wrap; robot M1 #2 + robot-coop-fix-7 r2).
   Proves the guard itself (coop-title-leave proves the menu paths): every way a title-layer card is closed by some OTHER module leaves
   #title with its buttons, or goes back to the life behind it. One page, no Worker. Fold 755x1000@2 + iPad 1180x820@2.
     G1  first open: #title shows the home menu (buttons > 0), no ✕ on it (no life behind)
     G2  no life: a module hides #modal / empties the queue under the title → the home menu comes back by itself
     G3  no life: closeModal() of the home card → the home menu comes back
     G4  a life behind (solo life, ☰): #modal hidden by a module → back to the running life (title hidden), not a bare cover
     G5  a visible cover of its own (a #coopfz panel) on the bare title → the guard waits (does not open the menu over it); cover gone → menu back
     G6  dead life: #modal hidden → the home menu (never «back» into a dead life)
   usage: python3 dev/build/assemble.py && node dev/test/title-never-bare.js   env TNB_ROOT=<other worktree> (serve that build: MUTATE / LIVE proof) */
const {chromium}=require('playwright');const path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const ROOT=process.env.TNB_ROOT?path.resolve(process.env.TNB_ROOT):undefined;
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const look=p=>p.evaluate(()=>{const T=document.getElementById('title'),M=document.getElementById('modal');const v=e=>!!e&&e.getClientRects().length>0;
 const menu=M&&!M.hidden?[...M.querySelectorAll('button')].filter(v).map(b=>(b.textContent||b.getAttribute('aria-label')||'').trim().split('\n')[0]):[];
 return{title:!!T&&!T.hidden,modal:!!M&&!M.hidden,menu,bare:!!T&&!T.hidden&&!menu.length,x:!!(M&&!M.hidden&&M.querySelector('#mr button')),S:typeof S!=='undefined'&&!!S&&!S.dead}});
(async()=>{const b=await chromium.launch();
 for(const [nm,[W,H]] of [['fold',[755,1000]],['ipad',[1180,820]]]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce'});await serve(ctx,ROOT);
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});/* the life roulette: skip, as pcport-rk does */
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000}).catch(()=>{});await sleep(2500);
  let l=await look(p);ok(l.title&&l.menu.length>0&&!l.x,`G1 ${nm}: first open = home menu, no ✕`,l);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sleep(1200);l=await look(p);
  ok(l.title&&l.menu.length>0,`G2 ${nm}: #modal hidden by a module → the home menu is back`,l);
  await p.evaluate(()=>{try{closeModal()}catch(e){}});await sleep(1200);l=await look(p);ok(l.title&&l.menu.length>0,`G3 ${nm}: closeModal() of the home card → the home menu is back`,l);
  /* G5 a cover of its own */
  await p.evaluate(()=>{const z=document.createElement('div');z.id='coopfz';z.style.cssText='position:fixed;inset:0;z-index:9500;background:#0003';document.body.appendChild(z);Q.length=0;document.getElementById('modal').hidden=true});
  await sleep(1200);l=await look(p);ok(!l.modal,`G5 ${nm}: a visible #coopfz cover → the guard waits`,l);
  await p.evaluate(()=>{document.getElementById('coopfz').remove();document.getElementById('modal').hidden=false;document.getElementById('modal').hidden=true});await sleep(1200);l=await look(p);
  ok(l.title&&l.menu.length>0,`G5 ${nm}: cover gone → the home menu is back`,l);
  /* G4 a solo life behind ☰ */
  const nm0=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{save()}catch(e){}try{render()}catch(e){}return S&&S.name});
  /* the new-life loading cover (#klife) waits for pictures; offline it may stay: give it 20 s, then take it down as its own end does */
  await p.waitForFunction(()=>![...document.querySelectorAll('#klife,#kroul')].some(x=>x.getClientRects().length),null,{timeout:20000}).catch(()=>{});
  await p.evaluate(()=>{const k=document.getElementById('klife');if(k)k.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
  await sleep(800);await p.evaluate(()=>{try{showTitle()}catch(e){}});await sleep(900);l=await look(p);ok(l.title&&l.menu.length>0,`G4 ${nm}: ☰ over a life = the menu`,l);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sleep(2500);l=await look(p);
  ok(!l.bare&&!l.title&&l.S&&await p.evaluate(n=>S&&S.name===n,nm0),`G4 ${nm}: #modal hidden by a module → back to the same running life`,l);
  /* G6 a dead life */
  await p.evaluate(()=>{S.dead=true;try{showTitle()}catch(e){}});await sleep(900);await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sleep(1500);l=await look(p);
  ok(l.title&&l.menu.length>0,`G6 ${nm}: dead life → the home menu, not a bare cover`,l);
  ok(!errs.length,`${nm}: no page errors`,errs.slice(0,5));await ctx.close()}
 await b.close();const f=res.filter(x=>!x[0]).length;console.log(`\n${res.length-f}/${res.length} ${f?'FAIL':'PASS'}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
