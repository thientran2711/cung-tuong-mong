/* allot-season (OD 27/11 ~05:10Z): a 12-month life of monthly allotments at rank 0 / 3 / 7 on the real page — "never uses anything" (the worst
   pile-up) — for her and for one NPC consort at the same rank. Prints the stock per line at year end, the silver paid as quy bạc and its share
   of the year's bổng. Run on a build BEFORE (origin/main checkout) and AFTER (this branch) for the before/after table.
   usage: node dev/measure/allot-season-bot.js <worktree or url> [label] */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,LABEL]=process.argv;
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof econStipend==='function');await sleep(2500);
 const out=await p.evaluate(()=>{try{const kl=document.getElementById('kload');if(kl)kl.remove()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  /* the line of a piece: the same grouping as jseason ssFam (written here so the BEFORE build can be measured too) */
  const fam=k=>{const it=IT[k];if(!it)return null;if(/^lx(may|son|ma|mat)\d$/.test(k))return "son phấn";if(/^aldau\d$/.test(k))return "dầu chải tóc";if(/^alnen\d$/.test(k))return "nến";
   if(it.kd==="Vải vóc")return "vải";if(it.kd==="Trà")return "trà";if(it.kd==="Than sưởi")return "than";if(k==="yensao"||k==="nhansam")return "yến, sâm";return null};
  const R={};
  for(const r of [0,3,7]){for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;
   const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&!x.queen);S.rank=r;v.rank=r;S.sung=80;v.sung=80;S.month=1;
   for(const q of [S,v]){q.inv=(q.inv||[]).filter(e=>!fam(e.k));q.stip={};q.bac=1000}
   let pay=0;const b0={me:S.bac,v:v.bac};
   for(let m=1;m<=12;m++){S.month=m;S.turn=(S.turn|0)+1;for(const q of [S,v]){try{q.stip.tip=S.turn}catch(e){}econStipend(q)}Q.length=0;pay+=BAL.pay[r]}
   const st=q=>{const o={};for(const e of q.inv||[]){const f=fam(e.k);if(f&&(e.u==null||e.u>0))o[f]=(o[f]||0)+1}return o};
   R[r]={me:st(S),npc:st(v),qbMe:(S.stip&&S.stip.qb)||0,qbNpc:(v.stip&&v.stip.qb)||0,pay}}
  return R});
 console.log(`== ${LABEL||URL} ==`);const F=["vải","trà","yến, sâm","than","son phấn","dầu chải tóc","nến"];
 console.log(`| rank | who | ${F.join(" | ")} | quy bạc | share of bổng |`);console.log(`|---|---|${F.map(()=>"---").join("|")}|---|---|`);
 for(const r in out){const o=out[r];for(const [w,s,q] of [["her",o.me,o.qbMe],["NPC",o.npc,o.qbNpc]])console.log(`| ${r} | ${w} | ${F.map(f=>s[f]||0).join(" | ")} | ${q} | ${(q/o.pay).toFixed(3)} |`)}
 console.log("page errors:",errs.length?errs:"none");await b.close();if(SV)SV.close()})();
