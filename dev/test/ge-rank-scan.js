/* ge-rank-scan (review/ge-rank, brief E35): law 5 «harder as she climbs» family scan of every grand-ending odds / gate site (LUẬT SỬA CẢ NHÓM).
   1. static: every place in dev/build that rolls or prints grand-ending odds (geOdds / BAL.ge.odds) and every gate reader (BAL.ge.gate) → the list;
      the only odds site must read BAL.ge.odds.rank; no GE data file (jgedata*.js) may carry its own odds number.
   2. runtime, on the built game: for every live branch of every wave (GE_DATA) and each of its 4 endings, the odds at pull 0 / 3 / 6 for rank 0 … 7,
      once with the key off (BAL.ge.odds.rank = 0, = the build before this branch) and once on → before/after table per wave;
      law 5 holds when the odds never rise with rank and the top rank is below the bottom one on every ending (condition cap lifted, as ge-engine).
   usage: node dev/test/ge-rank-scan.js [url|-]   exit 1 on a fault */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const B=path.resolve(__dirname,'../build');const faults=[];
/* 1. static */
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f));const sites=[];
for(const f of files){const L=fs.readFileSync(path.join(B,f),'utf8').split('\n');L.forEach((l,i)=>{
 if(/geOdds\s*\(|BAL\.ge\.odds|GB\(\)\.odds/.test(l))sites.push([f,i+1,'odds',/function geOdds/.test(l)?(/O\.rank/.test(l)?'reads rank':'NO RANK'):'uses geOdds']);
 if(/gate\(s,i\)|BAL\.ge\.gate|GB\(\)\.gate/.test(l))sites.push([f,i+1,'gate','stat floor']);
 if(/^jgedata/.test(f)&&/\bodds\s*:/.test(l))faults.push(`${f}:${i+1} a GE data file types its own odds`)})}
for(const s of sites)if(s[3]==='NO RANK')faults.push(`${s[0]}:${s[1]} geOdds does not read BAL.ge.odds.rank`);
console.log('STATIC sites');for(const s of sites)console.log(' ',s.join(' · '));
/* 2. runtime */
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../index.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof geOdds==='function'&&typeof GE_DATA==='object'&&typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
 /* a life (as ge-engine): S exists only after start() */await p.evaluate(()=>{document.getElementById('title').hidden=true;quiet=true;start();quiet=false});
 await p.waitForFunction(()=>typeof S!=='undefined'&&!!S&&!!S.origin,null,{timeout:0});
 const R=await p.evaluate(()=>{const O=BAL.ge.odds,k0=O.rank,nc=O.noCond,r0=S.rank,srv=S.srv;const out=[];
  const wave=b=>/^bd_/.test(b)?'Ba Tư':['tt_co','cnv_mat','nc_tuc'].includes(b)?'pilot':/^(tt_oan|tt_tranh|tt_mat|dtq_|muoi_)/.test(b)?'W1':/^(cn_|nc_gian|nc_su|nc_vuong|td_)/.test(b)?'W2':'W3';
  S.srv=null;O.noCond=O.max;
  for(const b of Object.keys(GE_DATA)){const s={b,st:["o","o","o","o"],pull:[0,0,0,0]};
   for(let i=0;i<4;i++){const row={b,w:wave(b),i,t:{}};for(const key of ['before','after']){O.rank=key==='before'?0:k0;row.t[key]=[0,3,6].map(pl=>{s.pull[i]=pl;return [0,1,2,3,4,5,6,7].map(r=>{S.rank=r;return geOdds(s,i)})})}
    s.pull[i]=0;out.push(row)}}
  /* a servant life climbs the maid ladder: step = S.srv.rk */
  const sv={rk:3,risen:0};S.srv=sv;const srvOk=geRk()===3;sv.risen=1;S.rank=2;const risenOk=geRk()===2;
  O.rank=k0;O.noCond=nc;S.rank=r0;S.srv=srv;out.srv=[srvOk,risenOk];return {k:k0,out,srv:out.srv,ranks:RANKS.map(r=>r.n)}});
 await b.close();
 const W={};for(const r of R.out){const w=W[r.w]||(W[r.w]={br:new Set(),n:0,bOk:0,aOk:0,b:[],a:[]});w.br.add(r.b);w.n++;
  const law=t=>t.every(L=>L.every((v,k)=>k===0||v<=L[k-1])&&L[7]<L[0]);if(law(r.t.before))w.bOk++;if(law(r.t.after))w.aOk++;else faults.push(`${r.b}_${r.i+1}: odds do not fall with rank ${JSON.stringify(r.t.after)}`);
  w.b.push(r.t.before[1]);w.a.push(r.t.after[1])}
 console.log(`\nBAL.ge.odds.rank = ${R.k} per rank step (${R.ranks[0]} 0 … ${R.ranks[7]} 7)\n`);
 console.log('| wave | branches | endings | law 5 holds BEFORE (key 0) | law 5 holds AFTER | odds at pull 3, rank 0→7 BEFORE | AFTER |');
 console.log('|---|---|---|---|---|---|---|');
 for(const [w,x] of Object.entries(W))console.log(`| ${w} | ${x.br.size} | ${x.n} | ${x.bOk}/${x.n} | ${x.aOk}/${x.n} | ${x.b[0].join(' ')} | ${x.a[0].join(' ')} |`);
 const tot=R.out.length,br=new Set(R.out.map(r=>r.b)).size;console.log(`| all | ${br} | ${tot} | ${Object.values(W).reduce((a,x)=>a+x.bOk,0)}/${tot} | ${Object.values(W).reduce((a,x)=>a+x.aOk,0)}/${tot} | | |`);
 const r1=R.out[0].t.after;console.log('\nodds AFTER, every branch the same (pull 0 / 3 / 6 × rank 0…7):');r1.forEach((L,k)=>console.log(`  pull ${[0,3,6][k]}: ${L.join(' ')}`));
 console.log(`servant life: step = maid rung ${R.srv[0]?'ok':'FAULT'} · raised: step = rank ${R.srv[1]?'ok':'FAULT'}`);if(!R.srv[0]||!R.srv[1])faults.push('servant rank step');
 if(errs.length)faults.push('page errors: '+errs.join(' | '));
 console.log(faults.length?`\nFAULTS ${faults.length}\n`+faults.join('\n'):'\nge-rank-scan: PASS (0 faults)');process.exit(faults.length?1:0)})();
