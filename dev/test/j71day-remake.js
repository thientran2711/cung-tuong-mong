/* rv4 (BIG rv save-unseen-lists r4): Hội Phượng (3 tuần) day card remade after fPlan7 replaced the plan in the same step must be the SAME contest. usage: node dev/test/j71day-remake.js index.html [other.html …] → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':'text/javascript'});r.end(b)})}).listen(0);
 const b=await chromium.launch();let bad=0;
 for(const page of process.argv.slice(2)){const ctx=await D.newDeviceContext(b,'fold',{serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();
  await D.openDirect(p,`http://127.0.0.1:${srv.address().port}/${page}`);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H);
  const r=await p.evaluate(()=>{__sbr.newLife();Q.length=0;const j=j7s();j.plans=j.plans||{};const vis=FV7.phoenix.map((v,i)=>[v[0],i]);const C=vis.filter(x=>x[0]==='C').map(x=>x[1]);
   const pp=fPP7('phoenix',C[0]);pp.y=S.year;j.plans.phoenix={y:S.year,pp,me:1,pb:0};const ok7=typeof mgOn7==='function'&&mgOn7();const pres=present7(S);
   const m=fDay7('phoenix');if(!m||!m.rk)return{err:'no card',ok7,pres,m:m&&m.t};
   /* the same step plans next tuần's contest of the same festival (another variant) */
   const other=vis.find(x=>x[1]!==C[0]&&x[0]==='C')||vis.find(x=>x[1]!==C[0]);const pp2=fPP7('phoenix',other[1]);j.plans.phoenix={y:S.year,pp:pp2,me:0};
   const e=JSON.parse(JSON.stringify({rk:m.rk,ra:m.ra,t:m.t}));const c=rcpMk(e);
   return{t0:m.t,t1:c&&c.t,h0:m.h,h1:c&&c.h,ra:JSON.stringify(m.ra).slice(0,120)}});
  const pass=r.t1&&r.t0===r.t1&&r.h0===r.h1;if(!pass)bad++;console.log(page,pass?'PASS':'FAIL',JSON.stringify({t0:r.t0,t1:r.t1,err:r.err,ra:r.ra,same_h:r.h0===r.h1}));await ctx.close()}
 await b.close();srv.close();process.exit(bad?1:0)})();
