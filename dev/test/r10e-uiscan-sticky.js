/* robot10 E-FIX-4 proof (R8 bd_tuyet cautious-3, Fold, every tab: «button covered: div.kmrow under button.kbtn.kmtake»): a long reward list
   (j93 kitReward, > 6 items: .km-long; when opened .km-done) keeps «Nhận» sticky at the bottom of the scrolling list, so rows pass under it while
   she scrolls. The robot's OWN uiScan (dev/measure/robot10.js, or R10=<file>) on that list drawn by the game: before reported, after not; a
   NON-sticky button laid on a row is still reported. usage: node dev/test/r10e-uiscan-sticky.js <save.json> [WxH]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [save,vpS='755x1000']=process.argv.slice(2);const [w,h]=vpS.split('x').map(Number);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const src=fs.readFileSync(process.env.R10||path.join(__dirname,'../measure/robot10.js'),'utf8');const i0=src.indexOf('function uiScan(');let d=0,j=src.indexOf('{',i0);for(;j<src.length;j++){if(src[j]==='{')d++;else if(src[j]==='}'&&!--d)break}
const UIS=src.slice(i0,j+1);
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;deser(d);try{Q.length=0;closeModal()}catch(e){}render()},JSON.parse(fs.readFileSync(save,'utf8')));
 await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove()));await p.evaluate(s=>{window.__uis=(0,eval)('('+s+')')},UIS);
 await p.evaluate(()=>{const K=Object.keys(IT).filter(k=>IT[k]&&IT[k].n&&kmItemImg(k)).slice(0,14);kitReward({kind:"chest",title:"Thử rương dài",items:K.map(k=>({k,n:IT[k].n,d:"Thắp học đêm: buổi tối luyện cầm kỳ thi họa hay đọc binh thư",img:kmItemImg(k),tier:kmTierOf(k)}))})});
 for(let i=0;i<30;i++){const done=await p.evaluate(()=>!!document.querySelector('.kmrew.km-done'));if(done)break;await p.evaluate(()=>{const t=document.querySelector('.kmrew .kmtap')||document.querySelector('.kmrew');if(t)t.click()});await p.waitForTimeout(500)}
 const st=await p.evaluate(()=>{const L=document.querySelector('.kmrew .kmlist'),t=document.querySelector('.kmrew .kmtake');if(!L||!t)return null;L.scrollTop=Math.max(0,(L.scrollHeight-L.clientHeight)/2);return {done:!!document.querySelector('.kmrew.km-done'),pos:getComputedStyle(t).position,scroll:L.scrollHeight>L.clientHeight+1}});
 ok(st&&st.done&&st.pos==='sticky'&&st.scroll,'the game draws a long reward list, opened, «Nhận» sticky over a scrolling list',st);await p.waitForTimeout(300);
 const cov=()=>p.evaluate(()=>window.__uis({}).filter(x=>x.k==='covered-btn'&&/kmrow|r10/.test(x.msg)).map(x=>x.msg+' | '+x.ex));
 const a=await cov();ok(a.length===0,'rows passing under the sticky «Nhận»: no «button covered»',a);
 /* control: the same button made non-sticky and laid over a row (a real layout fault) is still reported */
 const c=await p.evaluate(()=>{const L=document.querySelector('.kmrew .kmlist'),row=[...L.querySelectorAll('.kmrow')].find(r=>{const q=r.getBoundingClientRect(),z=L.getBoundingClientRect();return q.top>z.top+10&&q.bottom<z.bottom-60});if(!row)return['no row'];
  const bt=document.createElement('button');bt.className='kbtn r10b';bt.textContent='Nhận thử';const q=row.getBoundingClientRect(),z=L.getBoundingClientRect();bt.style.cssText=`position:absolute;left:${q.left-z.left+q.width/2-60}px;top:${q.top-z.top+L.scrollTop}px;width:120px;height:${q.height}px`;L.style.position='relative';L.appendChild(bt);
  const R=window.__uis({}).filter(x=>x.k==='covered-btn'&&/kmrow/.test(x.msg)).map(x=>x.msg);bt.remove();return R});
 ok(c.length>0&&c[0]!=='no row','a NON-sticky button laid on a row is still reported',c);
 ok(!pe.length,'no page error',pe.slice(0,3));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
