/* robot10 E-FIX-3 r3 (E81r item 3): a save the browser refuses is TOLD (kit notice CTM_WAIT.saveBlocked) by every writer that runs in a
   single-player page: j6 save() and jcloud writeSlot(); the co-op writers (jcoopworld snapSave, jcoopthine guest copy) use the same
   saveBlocked() — static scan dev/test/r10e-savewrite-scan.py + coop-e2e. usage: node dev/test/r10e-saveblocked.js <save.json> (a loaded life: a new life holds its autosave while its intro cards wait)   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const SV=process.argv[2];const {serve,BASE}=require('./coop-serve.js');let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;Q=[];quiet=true;deser(JSON.parse(d));quiet=false;/* as j6 Tiếp tục: quiet=true;deser(d);quiet=false — without it save() returns at its own quiet guard */try{Q.length=0;closeModal()}catch(e){}render()},fs.readFileSync(SV,'utf8'));await p.waitForTimeout(1500);
 const W=()=>p.evaluate(()=>[...document.querySelectorAll('body *')].some(e=>e.offsetParent!==null&&e.children.length===0&&e.textContent.includes(CTM_WAIT.saveBlocked.slice(0,20))));
 ok(!(await W()),'no notice while saves are written');
 const r=await p.evaluate(()=>{const o=Storage.prototype.setItem;Storage.prototype.setItem=function(k){window.__th++;(window.__tk=window.__tk||[]).push(k);throw new DOMException('quota','QuotaExceededError')};let n=0;window.__th=0;const o2=Storage.prototype.setItem;const k0=window.kitNotice;window.kitNotice=function(x){if(x&&x.id==='saveBlocked')n++;return k0.apply(this,arguments)};
  window.__rs=()=>{Storage.prototype.setItem=o};window.__n=()=>n;window.__jqoff=1;window.__spreadOff=1;Q.length=0;/* jqsave holds a save while an unsaveable dialog waits */try{save()}catch(e){}return {ws:typeof writeSlot}});
 await p.waitForTimeout(2500);/* save() may be deferred by its wrappers (co-op / thin layers) */
 Object.assign(r,await p.evaluate(()=>{const a=__n();try{if(typeof writeSlot==='function')writeSlot(2,'{"v":6}')}catch(e){}const c=__n();__rs();return {save:a,cloud:c-a,thrown:window.__th,keys:window.__tk,stack:new Error().stack.split('\n').length}}));
 ok(r.save>=1,'j6 save(): a refused write shows the saveBlocked kit notice',r);await p.waitForTimeout(500);ok(await W(),'the notice is on screen (kit notice, VANPHONG words)');
 ok(r.ws!=='function'||r.cloud>=1,'jcloud writeSlot(): a refused write shows the notice (or writeSlot is module-private: covered by the scan)',r);
 ok(!pe.length,'no page error',pe.slice(0,3));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
