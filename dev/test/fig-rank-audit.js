/* fig-rank-audit.js — review/fig-rank-match: for every identity (84 painted women: c01–c32 + m01–m52) × every rank tier (cold, t1..t8) × 4 age bands,
   which picture does the game really show for (a) an NPC consort and (b) her (S.pid), and is its dress tier the person's rank tier EXACTLY?
   usage: node dev/test/fig-rank-audit.js [out.json]      (serves the BUILT repo root; manifests read from env FIGDIR=<dir with FIGURES*.json>
   or the CDN https://ctm-img.victoria-tntt.workers.dev/img/)
   verdict per cell: exact | above (nearest tier above, exact art missing = listed) | none (no picture; placeholder) | LOWER (must be 0) | MAIDART (must be 0).
   Exit 1 when LOWER or MAIDART > 0. Prints the missing-art block (identity × tier) for the ART REQUEST. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),http=require('http'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'';
const FIGDIR=process.env.FIGDIR||'';const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const MT={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};
(async()=>{
 const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(ROOT,u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':MT[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
 await new Promise(r=>srv.listen(0,r));const url='http://127.0.0.1:'+srv.address().port+'/';
 const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot=1});
 /* manifests: local copies when given, else the CDN; every picture request is answered with an empty 1x1 so the run is fast */
 await ctx.route(/FIGURES[^/]*\.json/,async r=>{const n=r.request().url().match(/(FIGURES[^/?]*\.json)/)[1];
  if(FIGDIR&&fs.existsSync(path.join(FIGDIR,n)))return r.fulfill({status:200,body:fs.readFileSync(path.join(FIGDIR,n)),contentType:'application/json'});
  try{const x=await ctx.request.get(CDN+n);return r.fulfill({status:200,body:await x.body(),contentType:'application/json'})}catch(e){return r.fulfill({status:200,body:'[]',contentType:'application/json'})}});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.fulfill({status:200,body:Buffer.alloc(0),contentType:'image/webp'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(url+'index.html?khost=0',{waitUntil:'domcontentloaded',timeout:120000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof figFor==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title')&&(document.getElementById('title').hidden=true);window.__nlInner=1;start();window.__nlInner=0;Q.length=0});
 await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0&&f88Keys('consort').length>0&&f88Keys('maid').length>0,null,{timeout:60000});
 const res=await p.evaluate(()=>{
  const TIERS=[-1,1,2,3,4,5,6,7,8],AGES=[18,26,36,51];const out={cells:[],missing:{},errs:[]};
  const parse=f=>{const m=/fig-(\w+)-(\w+?)-(t\w+?|cold)-a(\d+)\./.exec(f||"");return m?{role:m[1],id:m[2],tier:/cold/.test(m[3])?-1:+m[3].slice(1),age:+m[4]}:null};
  const keys=[...f88Keys('consort'),...f88Keys('maid')];
  const savedRivals=rivals.slice();
  for(const k of keys){const have={};for(const f of f88List(k)){if(f88IsCT(f)){const t=f88TNum(f);(have[t]=have[t]||new Set()).add(figAge(f.ageBand))}}
   const miss=TIERS.filter(t=>t>=1&&!have[t]);if(miss.length)out.missing[k]=miss;
   for(const t of TIERS)for(const a of AGES){
    /* (a) an NPC consort of rank tier t: rank = t-1 (t8 = Hoàng hậu via .queen) */
    if(S.pid!==k){const w={name:'AUDIT',age:a,fid:k,rank:t<0?0:Math.min(7,t-1),queen:t===8,out:t<0};rivals.push(w);
    let src="",e=null;try{src=figFor({ref:w},'fig')}catch(x){e=String(x)}rivals.pop();
    const sh=parse(String(src).replace(/^.*\//,''));let v;
    if(!src)v='none';else if(!sh)v='MAIDART';else if(sh.id!==k.replace(/^\w+:/,''))v='OTHERFACE';else{const want=t;v=sh.tier===want?'exact':sh.tier>want?'above':'LOWER'}
    out.cells.push({who:'npc',k,t,a,v,got:sh?sh.tier:null,e});}  /* her own reserved identity is never an NPC's (j66): skipped for NPC cells */
    /* (b) her: S.pid = k, rank t-1 */
    if(t>0&&t<=8){const s0={pid:S.pid,fid:S.fid,rank:S.rank,age:S.age,out:S.out,cnv:S.cnv,srv:S.srv};
     try{S.pid=k;S.fid=k;S.rank=Math.min(7,t-1);S.age=a;S.out=false;S.srv=null;const s2=figFor(S,'fig');const sh2=parse(String(s2).replace(/^.*\//,''));
      let v2;if(!s2)v2='none';else if(!sh2)v2='MAIDART';else v2=sh2.tier===t?'exact':sh2.tier>t?'above':'LOWER';out.cells.push({who:'her',k,t,a,v:v2,got:sh2?sh2.tier:null})}
     catch(x){out.errs.push(String(x))}finally{Object.assign(S,s0)}}
   }}
  rivals.length=0;savedRivals.forEach(x=>rivals.push(x));return out});
 const sum={};for(const c of res.cells){const key=c.who+'/'+(c.t===8?'t8':c.t<0?'cold':'t'+c.t);sum[key]=sum[key]||{};sum[key][c.v]=(sum[key][c.v]||0)+1}
 const tot={};for(const c of res.cells)tot[c.who+':'+c.v]=(tot[c.who+':'+c.v]||0)+1;
 console.log('TOTAL',JSON.stringify(tot));console.log('PER TIER',JSON.stringify(sum));
 const mk=Object.keys(res.missing);console.log('IDENTITIES WITH MISSING CONSORT TIERS',mk.length,'of',new Set(res.cells.map(c=>c.k)).size);
 const grp={};for(const k of mk){const key=res.missing[k].join(',');(grp[key]=grp[key]||[]).push(k)}for(const g of Object.keys(grp))console.log(' missing tiers ['+g+'] ×'+grp[g].length+': '+grp[g].slice(0,6).join(' ')+(grp[g].length>6?' …':''));
 console.log('OTHERFACE',JSON.stringify(res.cells.filter(c=>c.v==='OTHERFACE')));console.log('page errors',errs.length,errs.slice(0,3),'eval errs',res.errs.slice(0,3));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({tot,sum,missing:res.missing}));
 await b.close();srv.close();if(!res.cells.length){console.log('FAIL: 0 cells audited (manifests not loaded)');process.exit(2)}const bad=(tot['npc:LOWER']||0)+(tot['her:LOWER']||0)+(tot['npc:MAIDART']||0)+(tot['her:MAIDART']||0)+(tot['npc:OTHERFACE']||0);
 console.log(bad?'FAIL: '+bad+' wrong-dress cells':'PASS: no lower-tier / maid-art / other-face cell');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
