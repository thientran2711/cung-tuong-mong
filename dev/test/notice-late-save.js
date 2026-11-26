/* rv4 (BIG rv save-unseen-lists, LAW 11 Tin báo family): a notice that arrives AFTER the act's own save (kitKnow: setTimeout 0) is in the sổ at the
   end of the tick — a TRUE reload right then brings the line back. usage: node dev/test/notice-late-save.js index.html [other.html …] → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');
 const srv=http.createServer((q,r)=>{fs.readFile(path.join(root,decodeURIComponent(q.url.split('?')[0])),(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':'text/html'});r.end(b)})}).listen(0);
 const b=await chromium.launch();let bad=0;
 for(const page of process.argv.slice(2)){for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();
  const open=async()=>{await D.openDirect(p,`http://127.0.0.1:${srv.address().port}/${page}`);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H)};
  await open();
  const a=await p.evaluate(async()=>{__sbr.newLife();await __sbr.settle();render();/* her act: she learns a fact; the act renders (save), the notice comes a tick later */
   kitKnow({key:'rvlate',text:'Ngươi biết thêm: Ngự hoa viên mai nở sớm.'});render();await new Promise(r=>setTimeout(r,60));return NT.list.map(x=>x.id).filter(i=>/^know:/.test(i))});
  await p.reload();await open();await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(2500);
  const c=await p.evaluate(()=>NT.list.map(x=>x.id).filter(i=>/^know:/.test(i)));
  const pass=a.length>0&&a.every(i=>c.includes(i));if(!pass)bad++;console.log(page,dev,pass?'PASS':'FAIL','before',JSON.stringify(a),'after reload',JSON.stringify(c));await ctx.close()}}
 await b.close();srv.close();process.exit(bad?1:0)})();
