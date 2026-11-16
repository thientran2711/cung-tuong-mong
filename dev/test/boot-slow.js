/* boot-slow (review boot-flash r1): a SLOW but working first open must never end on the failure card. The page is streamed at a low
   rate (CDP throttle) so it is still downloading/parsing past 15 s (and, at the lower rate, past 30 s). Logs the cover state every second:
   'cover' / 'slow-text' (15 s note) / 'slow-card' (30 s card) / 'gone'. PASS = the cover is gone and the game ready at the end, never a
   'broken' card. usage: node dev/test/boot-slow.js <baseURL> <bytesPerSec> [khost=0|1] */
const {chromium}=require('playwright');const [,,BASE,BPS='120000',HOST='0']=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');
 await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:100,downloadThroughput:+BPS,uploadThroughput:1e5});
 const t0=Date.now();const log=[];let last="";
 p.goto(BASE+(HOST==="1"?"?khost=1":"?khost=0&kboot=1"),{waitUntil:'commit',timeout:300000}).catch(()=>{});
 let ready=false;for(let i=0;i<240;i++){await p.waitForTimeout(1000);
  const s=await p.evaluate(()=>{const f=document.getElementById("krotf");const w=f?f.contentWindow:window;const D=w&&w.document;if(!D)return"none";
   const c=D.getElementById("kboot");const why=c&&c.getAttribute("data-why");const sm=c&&c.querySelector("small");
   return (c?(c.classList.contains("fail")?(why==="slow"?"slow-card":"BROKEN-card"):/dựng dần/.test(sm&&sm.textContent||"")?"slow-text":"cover"):"gone")+(w.__kbootDone?"|ready":"")+"|"+D.readyState}).catch(e=>"eval-err");
  if(s!==last){last=s;log.push(Math.round((Date.now()-t0)/1000)+"s "+s);console.log(log[log.length-1])}
  if(/^gone\|ready/.test(s)){ready=true;break}if(/BROKEN/.test(s))break}
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
 const ok=ready&&!log.some(x=>/BROKEN/.test(x));console.log(ok?"PASS":"FAIL","errors",errs.slice(0,3));await b.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(1)});
