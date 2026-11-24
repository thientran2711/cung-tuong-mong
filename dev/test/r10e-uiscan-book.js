/* robot10 E-FIX-2 proof: run the robot's OWN uiScan (dev/measure/robot10.js, or the file given by R10=) over the Tuần lục flip-book (dawn) and over
   every tab of the game, from a save; prints the text-overlap / covered rows. Before (LIVE harness): the stacked leaves give kbk-rh × kbk-rh rows;
   after: none, while a REAL text-over-text (a test chip laid on a title) is still reported.
   usage: node dev/test/r10e-uiscan-book.js <save.json> [WxH]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [save,vpS='755x1000']=process.argv.slice(2);const [w,h]=vpS.split('x').map(Number);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const src=fs.readFileSync(process.env.R10||path.join(__dirname,'../measure/robot10.js'),'utf8');const i0=src.indexOf('function uiScan(');let d=0,j=src.indexOf('{',i0);for(;j<src.length;j++){if(src[j]==='{')d++;else if(src[j]==='}'&&!--d)break}
const UIS=src.slice(i0,j+1);
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(save,'utf8'));
 const p=await ctx.newPage();p.on('console',m=>{if(/chip debug/.test(m.text()))console.log(m.text())});await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click()});await p.waitForTimeout(2500);
 await p.evaluate(s=>{window.__uis=(0,eval)('('+s+')')},UIS);
 const scan=()=>p.evaluate(()=>window.__uis({}).filter(x=>/text-overlap|covered|overlap/.test(x.k)).map(x=>x.msg+' | '+x.ex));
 await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}document.querySelectorAll('.modal').forEach(x=>{x.hidden=true});const t=$('title');if(t)t.hidden=true;dawn()});await p.waitForTimeout(1500);
 let kb=0;for(let pg=0;pg<4;pg++){const r=await scan();const k=r.filter(x=>/kbk/.test(x));kb+=k.length;if(k.length&&process.env.SHOT)await p.screenshot({path:process.env.SHOT+'-'+pg+'.png'});console.log(`book page ${pg}: ${r.length} rows, kbk ${k.length}`,r.slice(0,3));await p.evaluate(()=>{const n=document.querySelector('.kbk-next');if(n)n.click()});await p.waitForTimeout(900)}
 await p.evaluate(()=>{for(let i=0;i<2;i++){const n=document.querySelector('.kbk-prev');if(n)n.click()}});await p.waitForTimeout(1200);
 ok(kb===0,'Tuần lục flip-book: no kbk text-over-text row (stacked leaves are hidden)',kb);
 /* a real one must still be caught: a chip laid over the book page title */
 const r2=await p.evaluate(()=>{const t=[...document.querySelectorAll('#dawn h3.kbk-t'),...document.querySelectorAll('#dawn .kbk-rh')].find(e=>{const r=e.getBoundingClientRect();const x=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return x&&e.contains(x)});if(!t)return null;const r=t.getBoundingClientRect();
  const c=document.createElement('span');c.textContent='Chíp';c.style.cssText='position:relative;display:block;width:2.6em;margin:-1.35em auto 0;background:transparent;white-space:nowrap';t.insertAdjacentElement('afterend',c);c.id='r10chip';
  const L=window.__uis({}).filter(x=>x.k==='text-overlap').map(x=>x.msg+' | '+x.ex);const cr=c.getBoundingClientRect(),tr=t.getBoundingClientRect();c.remove();const H=L.filter(x=>/Chíp/.test(x));if(!H.length)console.log('chip debug',JSON.stringify({c:[cr.left,cr.top,cr.width,cr.height].map(Math.round),t:[tr.left,tr.top,tr.width,tr.height].map(Math.round),tt:t.textContent.slice(0,20),L}));return H});
 ok(r2&&r2.length>0,'a real text laid over a title is still reported',r2);
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
