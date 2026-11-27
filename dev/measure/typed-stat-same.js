/* typed-stat-bal proof (law 4): the moved numbers are the SAME as on LIVE. Loads the new build (index.html) and the LIVE build (git show <ref>:index.html)
   in chromium, dumps every table this branch touched (values the rules apply + the texts shown, tokens resolved) and prints the differences.
   usage: node dev/measure/typed-stat-same.js [liveRef=origin/main]     exit 1 when a rule value differs (text changes are listed, not failed) */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),http=require('http'),cp=require('child_process');
const ROOT=path.join(__dirname,'..','..'),REF=process.argv[2]||'origin/main';
fs.writeFileSync(path.join(ROOT,'_tsl.html'),cp.execSync(`git -C ${ROOT} show ${REF}:index.html`,{maxBuffer:1<<28}));
/* DUMP runs in the page: {rules:{…numbers the code applies…}, texts:{…words shown…}} */
const DUMP=()=>{const R={},T={},J=o=>JSON.parse(JSON.stringify(o===undefined?null:o));
 for(const k in IT){const it=IT[k];R['IT.'+k]=J({w:it.w,use:it.use,dr:it.dr,evi:it.evi});T['IT.'+k]=it.d}
 try{if(typeof window.__TSX==='function')window.__TSX(R,T,J)}catch(e){T.__err=String(e)}
 for(const g of (window.__TSG||[]))try{g(R,T,J)}catch(e){T['__err_'+g.name]=String(e)}
 return {R,T}};
const EXTRA=fs.existsSync(path.join(__dirname,'typed-stat-same.d'))?fs.readdirSync(path.join(__dirname,'typed-stat-same.d')).filter(f=>f.endsWith('.js')).sort().map(f=>fs.readFileSync(path.join(__dirname,'typed-stat-same.d',f),'utf8')):[];
(async()=>{const srv=http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end()}r.end(b)})}).listen(0);
 const port=srv.address().port,br=await chromium.launch();const out={};
 for(const [nm,pg] of [['new','index.html'],['live','_tsl.html']]){const ctx=await br.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();
  await p.route(/^https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
  await p.goto(`http://127.0.0.1:${port}/${pg}`,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof IT==='object'&&typeof BAL==='object',null,{timeout:60000});
  /* each typed-stat-same.d/*.js = one group's dump: a function (R,T,J)=>{…} source pushed to window.__TSG */
  for(const src of EXTRA)await p.evaluate(s=>{window.__TSG=window.__TSG||[];window.__TSG.push((0,eval)('('+s+')'))},src);
  out[nm]=await p.evaluate(DUMP);await ctx.close()}
 await br.close();srv.close();fs.unlinkSync(path.join(ROOT,'_tsl.html'));
 let bad=0,txt=0;const keys=new Set([...Object.keys(out.new.R),...Object.keys(out.live.R)]);
 for(const k of keys){const a=JSON.stringify(out.new.R[k]),b=JSON.stringify(out.live.R[k]);if(a!==b){bad++;console.log(`RULE DIFF ${k}\n  new  ${a}\n  live ${b}`)}}
 for(const k of new Set([...Object.keys(out.new.T),...Object.keys(out.live.T)])){const a=JSON.stringify(out.new.T[k]),b=JSON.stringify(out.live.T[k]);if(a!==b){txt++;console.log(`TEXT ${k}\n  new  ${a}\n  live ${b}`)}}
 console.log(`typed-stat-same: ${keys.size} rule tables, ${bad} rule diffs, ${txt} text diffs`);process.exit(bad?1:0)})();
