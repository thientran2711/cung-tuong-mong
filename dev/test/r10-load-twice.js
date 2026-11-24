/* robot10 nc-fix-3 family «a load draws dice»: the SAME save file loaded in two fresh pages must give the SAME game (nothing may be rolled
   at load: lifespans, faces, names … are drawn when the person is made, or once and then saved). Lists every differing path.
   usage: node dev/test/r10-load-twice.js <save.json> [more.json ...]   exit 1 when a save loads differently twice */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const files=process.argv.slice(2);let bad=0;
async function loadOnce(b,txt){const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(nr=>{window.COOP_URL='http://127.0.0.1:9/';if(nr)window.__noR=1},!!process.env.NORENDER);await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},txt);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 const s=await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click();if(!window.__noR)try{render()}catch(e){}
  const d=ser();delete d.at;/* the on-screen log text and its counters carry no game state */return JSON.stringify(d)});await ctx.close();return {s,errs}}
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const f of files){const txt=fs.readFileSync(f,'utf8');const A=await loadOnce(b,txt),B=await loadOnce(b,txt);
  const out=[];const diff=(x,y,p)=>{if(out.length>200)return;if(JSON.stringify(x)===JSON.stringify(y))return;if(x&&y&&typeof x==='object'&&typeof y==='object'){new Set(Object.keys(x).concat(Object.keys(y))).forEach(k=>diff(x[k],y[k],p+'.'+k));return}
   out.push(p+': '+String(JSON.stringify(x)).slice(0,80)+' → '+String(JSON.stringify(y)).slice(0,80))};
  diff(JSON.parse(A.s),JSON.parse(B.s),'save');
  console.log((out.length?'FAIL':'ok  ')+' '+f.split('/').pop()+' differs on '+out.length+' paths');out.forEach(d=>console.log('   '+d));
  if(A.errs.length)console.log('   page errors: '+A.errs.slice(0,3).join(' | '));if(out.length)bad++}
 await b.close();process.exit(bad?1:0)})();
