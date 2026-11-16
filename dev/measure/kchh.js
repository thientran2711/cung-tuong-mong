// Both roads to Hoàng hậu: node dev/measure/kchh.js <cung|nha> <livesPerOrigin> [origins] [capSeconds]
// The inpage6 palace bot (sensible) plays every life; with "nha" each life first plays the home road with inkc.js (sensible)
// and the palace bot takes over at the palace entry (lives that end outside are counted as not reaching HH).
// Output: dev/measure/kchh-<path>.json + a summary (HH %, death before HH %, entry rank, stats at entry, palace months).
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GAME='http://game.local/'+(process.env.GF||'index.html');/* r2: the built site (index.html); images are not loaded */const M=__dirname;
const PATHK=process.argv[2]||'cung',N=+process.argv[3]||5,ORIG=(process.argv[4]||'tt,dtq,muoi,thd,ch,td').split(','),CAP=(+process.argv[5]||3000)*1e3;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const c=await b.newContext({viewport:{width:390,height:844}});
 await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html':/\.json$/.test(f)?'application/json':'text/plain'})});
 const errs=[];const res=[],info=[];const t0=Date.now();const OUTF=path.join(M,`kchh-${PATHK}.json`);
 async function life(o){const p=await c.newPage();p.on('pageerror',e=>{if(!/onerror/.test(e.stack||''))errs.push(String(e.message).slice(0,200))});
 await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1000);
 await p.evaluate(`window.__hhStop=1;window.__origO=${JSON.stringify(o)};window.__kcPath=${PATHK==='nha'?1:0};try{PX.app.ticker.stop()}catch(e){}`);
 await p.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));await p.evaluate(fs.readFileSync(path.join(M,'inkc.js'),'utf8'));
 await p.evaluate(()=>{window.__kcInfo=[];const s1=start;start=function(){const r=s1.apply(this,arguments);try{if(window.__kcPath&&S&&kcOk(S.origin.k)&&!S.kc){Q=[];kcInit();Q=[];try{$("modal").hidden=true}catch(e){}
   const R=window.__kcRun('sens');const K=S.kc;window.__kcInfo.push({o:S.origin.k,inPal:!!K.inPal,r:K.r,end:K.end,dead:!!S.dead,mo:S.turn,sac:S.sac,tai:S.tai,danh:S.danh,bac:S.bac,arts:Math.max(...Object.values(S.arts)),intel:K.intel.length,stuck:!!R.ring});
   if(K.inPal){Q=[];try{deal()}catch(e){}}}else if(S)window.__kcInfo.push({o:S.origin.k,direct:1,r:S.rank,sac:S.sac,tai:S.tai,danh:S.danh,bac:S.bac,arts:Math.max(...Object.values(S.arts||{a:0}))})}catch(e){console.error(e)}return r}});
 await p.evaluate(()=>{try{start()}catch(e){console.error(e)}});
  const t1=Date.now();while(true){let n=0;try{n=await p.evaluate(()=>window.__bot.step("sens",40))}catch(e){errs.push('step '+String(e).slice(0,160));break}
   if(await p.evaluate(()=>window.__res.length>=1))break;if(Date.now()-t1>900e3){errs.push('life cap '+o);break}}
  const r=await p.evaluate(()=>[window.__res[0],window.__kcInfo[window.__kcInfo.length-1]]);try{await p.close()}catch(e){}return r}
 for(let i=0;i<N;i++)for(const o of ORIG){if(Date.now()-t0>CAP)break;let r;try{r=await life(o)}catch(e){errs.push('life '+String(e).slice(0,160));continue}
  if(r[0])res.push(r[0]);if(r[1])info.push(r[1]);fs.writeFileSync(OUTF,JSON.stringify({res,info}));process.stderr.write(`${o} ${r[0]?r[0].title+' maxRank '+r[0].maxRank:'-'} ${r[1]?(r[1].inPal?'entry '+r[1].r:r[1].direct?'direct':r[1].end):''}\n`)}
 const hh=r=>(r.maxRank>=7||r.hhTurn!=null);const outside=r=>/Tiểu thư ngoài cung/.test(r.text||'')||(r.title&&/Chính thất|Vợ quan|thiếp|Gả xa|Xuất gia|Nữ phu tử|Bỏ trốn|Trạng nguyên|Vương phi|Nữ tướng|Hòa thân|Nữ thương/.test(r.title));
 const by={};for(const r of res){const k=r.origin;by[k]=by[k]||{n:0,hh:0,out:0};by[k].n++;if(hh(r))by[k].hh++;if(outside(r))by[k].out++}
 const pc=(a,b)=>Math.round(100*a/Math.max(1,b));const tot=res.length,thh=res.filter(hh).length;
 const ins=info.filter(x=>x.inPal||x.direct);const avg=(L,k)=>Math.round(L.reduce((a,x)=>a+(x[k]||0),0)/Math.max(1,L.length));
 const palMo=res.filter(r=>!outside(r)).map((r,i)=>r.turns);
 console.log(JSON.stringify({path:PATHK,lives:tot,HH:pc(thh,tot),outside:pc(res.filter(outside).length,tot),byOrigin:Object.fromEntries(Object.entries(by).map(([k,v])=>[k,{n:v.n,HH:pc(v.hh,v.n),out:pc(v.out,v.n)}])),
  entry:{n:ins.length,rank:[0,1,2,3].map(r=>ins.filter(x=>x.r===r).length),sac:avg(ins,'sac'),tai:avg(ins,'tai'),danh:avg(ins,'danh'),bac:avg(ins,'bac'),arts:avg(ins,'arts'),intel:avg(ins,'intel'),monthsOutside:avg(info.filter(x=>x.inPal),'mo')},
  lifeMonths:Math.round(res.reduce((a,r)=>a+(r.turns||0),0)/Math.max(1,tot)),errs:errs.slice(0,5),secs:Math.round((Date.now()-t0)/1000)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
