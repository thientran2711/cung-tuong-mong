/* face-w404 seeded compare (review/face-w404 r2): SAME seed, new life on LIVE build vs BRANCH build; dumps every person's face id
   (me, maid, Emperor, Thai hau, men, rivals, court, servants of me + rivals) + FAV per pool. Faces must be IDENTICAL.
   usage: node dev/test/face-w404-seed.js <live root> <branch root> [seed...]   (CDN via HTTPS_PROXY) */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const A=process.argv.slice(2);const [LIVE,BR]=[path.resolve(A[0]),path.resolve(A[1])];const SEEDS=A.slice(2).length?A.slice(2).map(Number):[0,1,2,3];const sl=t=>new Promise(r=>setTimeout(r,t));
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.css':'text/css'};
const srv=ROOT=>new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
 s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))});
const DUMP=()=>{const L=[];const add=(role,o)=>{if(o)L.push([role,o.name||o.n||"",o.fc==null?null:o.fc])};
 try{add('me',S);add('maid',S.maid);add('emp',S.emp);L.push(['thF','',S.thF||null]);(S.men||[]).forEach((m,i)=>add('man'+i,m));(rivals||[]).forEach((r,i)=>{add('rival'+i,r);(r.staff||[]).forEach((x,j)=>add('rival'+i+'.st'+j,x));add('rival'+i+'.maid',r.maid)});
  for(const k in (S.court||{}))add('court.'+k,S.court[k]);(S.staff||[]).forEach((x,j)=>add('me.st'+j,x))}catch(e){L.push(['ERR',String(e),null])}
 const fav={};for(const k of Object.keys(FPOOL))for(const f of FPOOL[k])fav[f]=FAV[f]===undefined?'u':FAV[f];return{L,fav,fseen:(S.fseen||[]).slice()}};
/* the game's own fixed-seed life (nlRun: NL_KEY seed -> same life + separate face stream NLR.face): store the seed, press start() */
const NEWLIFE=seed=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;store.set(NL_KEY,{seed:seed,at:1});start()};
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'localhost,127.0.0.1'}}:{});const OUT={};
 for(const [nm,root] of [['live',LIVE],['live2',LIVE],['branch',BR]]){const s=await srv(root);OUT[nm]={};
  for(const seed of SEEDS){const ctx=await D.newDeviceContext(b,'fold',{reducedMotion:'reduce'});const p=await ctx.newPage();
   const g=await D.openHost(p,s.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await sl(9000);
   const favBefore=await g.evaluate(()=>Object.keys(FPOOL).reduce((n,k)=>n+FPOOL[k].filter(f=>FAV[f]===0).length,0));
   await g.evaluate(NEWLIFE,1000003+seed*7919);await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.emp&&typeof NLP!=='undefined'&&NLP,null,{timeout:30000});await sl(3000);OUT[nm][seed]=await g.evaluate(DUMP);OUT[nm][seed].fav0=favBefore;await ctx.close()}
  s.close()}
 await b.close();fs.writeFileSync(process.env.SEED_OUT||'face-w404-seed.json',JSON.stringify(OUT));
 const cmp=(l,r)=>{const M=new Map(r.L.map(x=>[x[0],x[2]]));const o={persons:l.L.length,same:0,diff:0,empty:0,ex:[],menDiff:0,menN:0};
  for(const [role,n,f] of l.L){const man=/^man\d/.test(role);if(man)o.menN++;const g=M.get(role);if(g===f){if(!man)o.same++;continue}if(man){o.menDiff++;continue}o.diff++;if(!g)o.empty++;if(o.ex.length<8)o.ex.push(role+': '+f+' / '+g)}
  let favd=0;for(const f in l.fav)if(l.fav[f]!==r.fav[f])favd++;o.favd=favd;return o};
 const T=[];for(const seed of SEEDS)for(const [a,b2] of [['live','live2'],['live','branch']]){const c=cmp(OUT[a][seed],OUT[b2][seed]);T.push({seed,pair:a+' vs '+b2,persons:c.persons,sameFace:c.same,different:c.diff,empty:c.empty,menDiff:c.menDiff+'/'+c.menN,FAVdiff:c.favd,FAV0:OUT[a][seed].fav0+'/'+OUT[b2][seed].fav0,ex:c.ex})}
 console.table(T.map(({ex,...x})=>x));T.forEach(t=>t.ex.length&&console.log(t.seed,t.pair,t.ex))})().catch(e=>{console.error(e);process.exit(1)});
