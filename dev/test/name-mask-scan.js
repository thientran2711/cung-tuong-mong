/* name-mask scan (LUẬT SỬA CẢ NHÓM; review/name-mask): no player-visible path may print the RAW name of a person she has not met by name,
   nor a literal "???" in prose (log / Nhật ký / toast / result rows / palace names). The one mask = j61 k61Scrub/k61Mask (plain) + j78who + kitNameList.
   Parts: (S) static: log() is wrapped by the kit mask, no "???" string literal in a log/result/palace path;
          (L) live: bot plays >= MONTHS months; EVERY line passed to log() is checked at the moment it is written;
          (R) result rows: kaResultRows with strangers moved -> ONE aggregate row, no "<tước> ???" rows, no raw names;
          (P) palace names/descriptions (palName/palFn/places) of strangers' palaces.
   usage: NODE_PATH=$(npm root -g) node dev/test/name-mask-scan.js <url|file> [WxH] [MONTHS]   exit 1 on any hit */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,URL0,VP,MON]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);const MONTHS=+MON||24;
const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);let bad=0;const rep=(k,m)=>{console.log(k.padEnd(8),m);if(!/^ok|^info/.test(k))bad++};
/* (S) static */
const B=path.join(__dirname,'../build');const src={};for(const f of fs.readdirSync(B))if(/^j.*\.js$/.test(f))src[f]=fs.readFileSync(path.join(B,f),'utf8');
if(!/log=function\(h\)\{try\{k61Announce\(h\);if\(typeof h==="string"&&S&&S\.known\)h=k61Scrub\(h,true,"",h,true\)/.test(src['j61.js']))rep('S-FAIL','j61: log() is not wrapped by the kit mask');else rep('ok','S log() wrapped by k61Scrub');
for(const [f,t] of Object.entries(src)){t.split('\n').forEach((ln0,i)=>{const ln=ln0.replace(/\/\*.*?\*\//g,'');if(/["'`][^"'`\n]*\?\?\?[^"'`\n]*["'`]/.test(ln)&&!/^\s*\/\*/.test(ln)&&/(log\(|kaResultRows|per\.push|palName|palFn)/.test(ln))rep('S-FAIL',`${f}:${i+1} "???" literal inside a log/result/palace path`)})}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kaResultRows==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8')});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  window.__nm={hits:[],lines:0,months:new Set()};const l1=window.log;
  const strip=x=>String(x).replace(/<[^>]+>/g,' ');
  window.log=log=function(h){const r=l1.apply(this,arguments);try{if(S&&S.known&&S.logs&&S.logs[0]){const t=strip(S.logs[0]);__nm.lines++;{const k=S.year+'/'+S.month+'/'+S.tuan;if(__nm.last!==k){__nm.last=k;__nm.mc=(__nm.mc||0)+1}}
    const un=(rivals||[]).filter(v=>v!==S&&v.name&&!kitKnownName(v));
    for(const v of un){const vs=[v.name];const w=v.name.split(' ');if(w.length>=3){vs.push(w.slice(-2).join(' '));vs.push(w[0]+' '+w[w.length-1])}
      const oth=[S.maid&&S.maid.name,...(S.staff||[]).map(x=>x.name)].filter(Boolean);
      const own=(n)=>{/* a 2-word variant also inside ANOTHER person's name (e.g. a guard "Hà Lăng Vân") is not this consort */let i=t.indexOf(n);while(i>=0){const pre=t.slice(0,i).trim().split(/\s+/).pop()||'';if(n===v.name||!/^\p{Lu}/u.test(pre)||v.name.includes(pre)||RANKS.some(r=>r.n.endsWith(pre))||/^(Hoàng|Quý|Phi|Tần|Thường|Đáp|Phế)$/.test(pre)||/^T\d/.test(pre))return true;i=t.indexOf(n,i+1)}return false};
      for(const n of vs)if(n.split(' ').length>=2&&!oth.some(o=>o.includes(n)||n.includes(o))&&t.includes(n)&&own(n)){__nm.hits.push({kind:'RAW',name:n,line:t.slice(0,160)});break}}
    if(t.includes('???'))__nm.hits.push({kind:'???',line:t.slice(0,160)})}}catch(e){}return r};
  start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 let guard=0;while(guard++<400){const n=await p.evaluate(()=>__nm.mc||0);if(n>=MONTHS)break;await p.evaluate(()=>window.__bot.step('sens',300))}
 const L=await p.evaluate(()=>({lines:__nm.lines,months:__nm.mc||0,hits:__nm.hits}));
 console.log(`live: ${L.lines} log lines over ${L.months} months`);const seen=new Set();
 for(const h of L.hits){const k=h.kind+h.line;if(seen.has(k))continue;seen.add(k);rep('L-'+h.kind,`${h.name||''} :: ${h.line}`)}
 if(!L.hits.length)rep('ok','L no raw unmet name, no "???" in any log line');
 if(L.lines<50)rep('L-FAIL','too few log lines to mean anything');
 const R=await p.evaluate(()=>{for(let i=0;i<40;i++){try{nlNew()}catch(e){}start();if(S.ps&&!(typeof isSrv==='function'&&isSrv())&&S.origin.k!=='tt')break}Q.length=0;
  const un=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&!kitKnownName(v)).slice(0,6);const out={n:un.length,rows:[],pal:[]};
  const before=rsnap();before.rel=before.rel||{};for(const v of un)before.rel[v.id]={a:aff(v,S)-5*(un.indexOf(v)%2?-1:1),m:aff(S,v),e:v.ev||0,g:v.ghen||0,o:Math.round(oan(v,S))};
  const [G,Bd]=kaResultRows(before);out.rows=[...G,...Bd].map(x=>x.replace(/<[^>]+>/g,''));out.names=un.map(v=>v.name);
  for(const v of un){const k='r'+v.id;try{out.pal.push(palName(k)+' | '+palFn(k))}catch(e){out.pal.push('ERR '+e.message)}}
  try{out.pal.push(...places().filter(x=>x.k[0]==='r').map(x=>x.n+' | '+x.fn+' | '+String(x.d).replace(/<[^>]+>/g,'')))}catch(e){}return out});
 console.log('unmet consorts in fresh court:',R.n);
 for(const t of R.rows.concat(R.pal)){const raw=R.names.find(n=>t.includes(n));if(raw)rep('R-RAW',`${raw} :: ${t}`);else if(t.includes('???'))rep('R-???',t);else console.log('info    ',t)}
 if(R.n&&!R.rows.some(t=>/^\s*\d+ vị/.test(t)))rep('R-FAIL','no aggregate "N vị" row');else rep('ok','R result rows aggregate strangers');
 console.log('page errors',errs.length,errs.slice(0,3));await b.close();console.log(bad||errs.length?'FAIL':'PASS',bad,'hits');process.exit(bad||errs.length?1:0)})();
