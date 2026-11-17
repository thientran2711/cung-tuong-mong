// staff-caps-count (MEASURE ONLY, owner OD 17/11 ~15:40Z staff caps): node dev/measure/staff-caps-count.js <game html> <lives>
// Month loop (as staff-month.js, no forced rank moves): new game per life (8 origins in turn), monthTick() month after month, dialogs dropped.
// At month 0 / 24 / 60 records the live rank mix: her + every live NPC consort (rank index, cold palace, queen=7) + Thái hậu alive.
// Then counts servants each table would give (maids incl. the personal maid, eunuchs, ma ma) and face-pool cuts (young maid / eunuch pools as on main).
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GF=process.argv[2]||'dev/index.html',LIVES=+process.argv[3]||16;const AT=[0,24,60];
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'text/javascript; charset=utf-8'})});
 const snaps=[];let pools=null;const errs=[];
 for(let l=0;l<LIVES;l++){const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto('http://ts.local/'+GF,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof monthTick==='function',null,{timeout:120000});await p.waitForTimeout(2000);
  const R=await p.evaluate(([l,AT])=>{const ORIG=['tt','dtq','muoi','cn','nc','td','ch','thd'];const quiet=()=>{try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}};
   SLOT=3;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin=ORIG[l%8];start();quiet();const out=[];
   const snap=m=>{const ranks=[];for(const q of [S].concat(rivals||[])){if(!q||(q!==S&&q.alive===false))continue;if(q===S&&typeof isSrv==="function"&&isSrv())continue;ranks.push(q.out?"cold":(q===S?S.rank:(q.queen?7:q.rank)))}
    out.push({m,ranks,th:!S.thDead,cap:BAL.promo.cap,capTh:BAL.promo.capTh})};
   for(let m=0;m<=AT[AT.length-1]&&!S.dead;m++){if(AT.includes(m))snap(m);S.bac=Math.max(S.bac,80);S.suc=Math.max(S.suc,60);try{monthTick()}catch(e){break}quiet();try{render()}catch(e){}quiet()}
   return{out,pools:{maid:FPOOL.maid.length,eunuch:poolOf("eunuch").length,mama:FPOOL.mama.length,womid:FPOOL.womid.length},dead:S.dead?S.turn:null}},[l,AT]);
  await p.close();pools=R.pools;for(const s of R.out)snaps.push(Object.assign({l},s));process.stderr.write(`life ${l} snaps ${R.out.map(s=>s.m+':'+s.ranks.length).join(' ')} dead ${R.dead}\n`)}
 fs.writeFileSync(process.argv[4]||'/dev/null',JSON.stringify({snaps,pools,errs:errs.slice(0,5)}));console.log(JSON.stringify({pools,n:snaps.length,errs:errs.slice(0,3)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
