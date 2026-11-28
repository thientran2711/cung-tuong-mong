/* KK63 HARNESS-BIGPAGE check: a page over the ~20.65 MB route.fulfill limit. Plain run (BIGPAGE=0) = the old harness: the page target closes on the
   first tab click; patched run = it survives and the game starts. usage: node dev/test/bigpage-check.js <index.html> [MB=21.4]   exit 1 on a closed page */
const [,,SRC,MB]=process.argv;if(process.env.BIGPAGE!=='0')require('./lib/bigpage');
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{let s=fs.readFileSync(SRC,'utf8');const want=Math.round((+MB||21.4)*1e6);const i=s.lastIndexOf('</body>');s=s.slice(0,i)+'<!-- '+'x'.repeat(Math.max(0,want-Buffer.byteLength(s)))+' -->'+s.slice(i);
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:s,contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();let closed=false;p.on('close',()=>closed=true);let ok=false,err='';
 try{await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.waitForTimeout(3000);
  await p.evaluate(()=>{const t=document.querySelector('[data-tab]');if(t)t.click()});await p.waitForTimeout(3000);ok=await p.evaluate(()=>typeof S!=="undefined"&&S!=null&&typeof isSrv==="function")}catch(e){err=e.message.split('\n')[0]}
 const alive=ok&&!closed;/* RV-178: decide BEFORE b.close() — closing the browser fires the page 'close' event */console.log(`BIGPAGE ${process.env.BIGPAGE==='0'?'plain':'patched'} page ${(Buffer.byteLength(s)/1e6).toFixed(2)} MB: ${alive?'ALIVE (game started, tab clicked)':'CLOSED '+(closed?'(page close event) ':'')+err}`);await b.close();process.exit(alive?0:1)})();
