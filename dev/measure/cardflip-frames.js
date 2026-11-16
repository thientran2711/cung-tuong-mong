const {chromium}=require('playwright');
const [,,BASE,VPS,TAG,THR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
for(const v of VPS.split(',')){const [W,H]=v.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true});const p=await c.newPage();
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
 for(let i=0;i<30;i++){await sleep(600);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
 await p.evaluate(()=>{document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#kload,.kmov').forEach(e=>e.remove());const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}});
 await sleep(1500);
 // warm art so network is not measured; also fx
 await p.evaluate(()=>cfDemo(14,3,'me'));await sleep(500);await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.click());document.querySelectorAll('.kmov').forEach(e=>e.click())});await sleep(1500);await p.evaluate(()=>document.querySelectorAll('.kmov').forEach(e=>e.remove()));
 const cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:+(THR||4)});await cdp.send('Performance.enable');
 const m0=await cdp.send('Performance.getMetrics');await b.startTracing(p,{path:'/tmp/cfs-tr.json',categories:['devtools.timeline','cc','disabled-by-default-devtools.timeline']});
 await p.evaluate(()=>{window.__fr=[];window.__lt=[];try{new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push(Math.round(e.duration)))).observe({type:'longtask',buffered:true})}catch(e){}
  let last=performance.now(),t0=last;(function f(t){__fr.push([Math.round(t-t0),+(t-last).toFixed(1)]);last=t;if(!window.__stop)requestAnimationFrame(f)})(last)});
 await p.evaluate(()=>{window.__t00=performance.now();cfDemo(14,3,'me')});
 await p.waitForFunction(()=>{const o=document.querySelector('.kmov.kcf');return !o||o.classList.contains('kcf-fin')},null,{timeout:60000,polling:100}).catch(()=>{});
 await sleep(300);
 const r=await p.evaluate(()=>{window.__stop=1;const a=__fr.slice(2).map(x=>x[1]).sort((x,y)=>x-y);const q=f=>a[Math.min(a.length-1,Math.floor(a.length*f))];
  return{n:a.length,p50:q(.5),p95:q(.95),p99:q(.99),max:a[a.length-1],drop:a.filter(x=>x>25).length,drop50:a.filter(x=>x>50).length,lt:__lt.join(','),dur:Math.round(performance.now()-__t00),fr:__fr}});
 await b.stopTracing();const m1=await cdp.send('Performance.getMetrics');const g=(m,n)=>m.metrics.find(x=>x.name===n).value;
 const mm=n=>+((g(m1,n)-g(m0,n))*1000).toFixed(0);
 console.log(TAG,v,JSON.stringify({n:r.n,p50:r.p50,p95:r.p95,p99:r.p99,max:r.max,'>25ms':r.drop,'>50ms':r.drop50,longtasks:r.lt,durMs:r.dur,layoutMs:mm('LayoutDuration'),styleMs:mm('RecalcStyleDuration'),scriptMs:mm('ScriptDuration'),taskMs:mm('TaskDuration')}));
 console.log(TAG,v,'TRACE',JSON.stringify(require('child_process').execFileSync('python3',['/tmp/cfs-tr.py','/tmp/cfs-tr.json']).toString().trim()));try{require('fs').unlinkSync('/tmp/cfs-tr.json')}catch(e){}
 require('fs').writeFileSync(`/tmp/cfs-${TAG}-${v}.json`,JSON.stringify(r.fr));
 await c.close()}
await b.close()})();
