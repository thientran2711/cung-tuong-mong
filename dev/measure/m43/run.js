const {chromium}=require('playwright');const fs=require('fs');const http=require('http');const path=require('path');
const D='/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/';
const [game,seed,months]=[process.argv[2],+process.argv[3],+process.argv[4]||120];
const body=fs.readFileSync(D+'cung-dau/'+game,'utf8');
const html='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>\n'+body+'\n</body></html>';
const srv=http.createServer((q,r)=>{if(q.url==='/'||q.url.startsWith('/?')){r.writeHead(200,{'content-type':'text/html; charset=utf-8'});r.end(html)}else{const f=D+'cung-dau'+decodeURIComponent(q.url.split('?')[0]);if(fs.existsSync(f)&&fs.statSync(f).isFile()){r.writeHead(200);r.end(fs.readFileSync(f))}else{r.writeHead(404);r.end()}}});
srv.listen(0,async()=>{const port=srv.address().port;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];
 p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(s=>{let a=s>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};try{localStorage.clear()}catch(e){}},seed);
 await p.goto('http://127.0.0.1:'+port+'/',{timeout:120000});await p.waitForTimeout(800);
 await p.click('#slots button[data-new="1"]');await p.waitForTimeout(300);
 await p.evaluate("window.__ply="+(process.env.PLY?1:0));await p.evaluate(fs.readFileSync(D+'measure/m43/inpage.js','utf8'));
 const m=await p.evaluate(n=>window.__run(n),months);
 m.pageErrors=errs.slice(0,5);console.log(JSON.stringify(m));await b.close();srv.close()})
