/* robot10 E-FIX-4 proof (R2 rebel-3, Fold, every tab: «text over text: span.kmchip.kmck × span.kmchip.kmck Thường tại × Thường tại»):
   the demotion card's rank chip cracks in two (j93 kmRankDownHTML: a hidden layout copy kmck-t + two aria-hidden clip-path halves kmck-a / kmck-b of the
   SAME words). The robot's OWN uiScan (dev/measure/robot10.js, or R10=<file>) is run over that chip drawn by the game; before: reported, after: not,
   while two different words laid on each other, and a same-word copy that is NOT aria-hidden, are still reported.
   usage: node dev/test/r10e-uiscan-copy.js <save.json> [WxH]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [save,vpS='755x1000']=process.argv.slice(2);const [w,h]=vpS.split('x').map(Number);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const src=fs.readFileSync(process.env.R10||path.join(__dirname,'../measure/robot10.js'),'utf8');const i0=src.indexOf('function uiScan(');let d=0,j=src.indexOf('{',i0);for(;j<src.length;j++){if(src[j]==='{')d++;else if(src[j]==='}'&&!--d)break}
const UIS=src.slice(i0,j+1);
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;deser(d);try{Q.length=0;closeModal()}catch(e){}render()},JSON.parse(fs.readFileSync(save,'utf8')));
 await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove()));await p.evaluate(s=>{window.__uis=(0,eval)('('+s+')')},UIS);if(process.env.DBG)await p.evaluate(()=>{window.__DBG=1});
 const run=html=>p.evaluate(html=>{let g=document.elementFromPoint(innerWidth/2,innerHeight/2);while(g&&g.parentElement&&g.parentElement!==document.body)g=g.parentElement;/* the layer the robot scans */const box=document.createElement('div');box.id='r10cp';box.style.cssText='position:fixed;left:40px;top:120px;z-index:99999;padding:12px;background:#fff';box.innerHTML=html;g.appendChild(box);
  const all=window.__uis({});const L=all.filter(x=>x.k==='text-overlap'&&/r10|kmck|kmchip/.test(x.msg+x.ex)).map(x=>x.msg+' | '+x.ex);if(window.__DBG)L.push('DBG '+JSON.stringify({top:(document.elementFromPoint(innerWidth/2,innerHeight/2)||{}).className,r:box.getBoundingClientRect().top,n:all.length,k:all.map(x=>x.k).slice(0,8)}));box.remove();return L},html);
 const chip=await p.evaluate(()=>{const h=kmRankDownHTML(S,Math.max(1,rkOf(S)),Math.max(0,rkOf(S)-1));const t=document.createElement('div');t.innerHTML=h;const c=t.querySelector('.kmchip-row');return c?c.outerHTML:''});
 ok(!!chip,'the game draws the cracking rank chip (kmRankDownHTML .kmchip-row)');
 const a=await run(chip);ok(a.length===0,'cracking rank chip (aria-hidden halves of the same words): no «text over text»',a);
 const b2=await run('<span style="position:relative;display:inline-block"><span class="r10x">Thường tại</span><span class="r10y" style="position:absolute;top:0;left:2.4em;white-space:nowrap">Đáp ứng</span></span>');
 ok(b2.length>0,'two DIFFERENT words laid on each other are still reported',b2);
 const c=await run('<span style="position:relative;display:inline-block"><span class="r10x">Thường tại</span><span class="r10y" style="position:absolute;top:0;left:2.4em;white-space:nowrap">Thường tại</span></span>');
 ok(c.length>0,'the same words twice, NOT aria-hidden (a real double draw), are still reported',c);
 ok(!pe.length,'no page error',pe.slice(0,3));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
