/* jtq14-addr: the tutorial-quest narrator's address words ({X}/{x}/{m}) come from jvoice kAddr (one core, VANPHONG §2),
   for every rank and for a maid; plus j29 servant plea. usage: node dev/test/jtq14-addr.js  (dev/index.html via a local server) */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript; charset=utf-8':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});
 await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const rows=[],fail=[];
  for(const r of [0,1,2,3,4,5,6,7,8]){S.rank=r;S.sung=10;S.th=0;S.hh=0;
   const a=kAddr({srv:"f"},S,{m:"cool"});const got=tq14Say("{x}|{X}|{m}");const want=a.goi+"|"+a.goi.charAt(0).toUpperCase()+a.goi.slice(1)+"|"+a.xung;
   rows.push([r,got]);if(got!==want)fail.push(`rank ${r}: got ${got} want ${want}`)}
  /* a maid (still serving): ngươi / ta from kAddr, no hand-typed word */
  const was=S.origin;S.rank=0;S.srv=S.srv||{};S.origin={k:"cnv"};S.srv.risen=false;
  const g=tq14Say("{x}|{X}|{m}");rows.push(["maid",g]);if(g!=="ngươi|Ngươi|ta")fail.push("maid: "+g);
  S.origin=was;return{rows,fail}});
 console.log(R.rows.map(x=>x.join(' → ')).join('\n'));
 if(errs.length){console.log('PAGE ERRORS',errs);process.exit(1)}
 if(R.fail.length){console.log('FAIL',R.fail);process.exit(1)}
 console.log('PASS jtq14-addr');await b.close();srv.close()})();
