// review/pace-speed (MAIN 164, law 11 family «art pace»; TITLE-BAL finding: palace-maid road Y thuật bậc 1 → 5 in ~100–400 buổi):
// robot lives on the real game (inpage6 «sens» bot) on ONE road (consort = a life that is not a servant; srv = the palace-maid / servant road),
// every art (ARTS) and Tứ đức course point she gains is tallied by its SOURCE (call site) and the month each bậc is first reached is recorded.
// usage: node dev/measure/artpace.js <page.html> <consort|srv> <seeds> [months=36] [seed0=0]   env PAR (3), CAP (s per seed, 1500), BALO
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,ROAD,NS,MO,S0]=process.argv;const N=+NS||3,MONTHS=+MO||36,seed0=+S0||0,PAR=+process.env.PAR||3;const SRV=ROAD==='srv';
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${9000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
  const ok=await p.evaluate(srv=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<200;i++){start();const s=typeof isSrv==='function'&&isSrv();if(srv?s:(!s&&S.ps))break}Q.length=0;return !!(typeof isSrv==='function'&&isSrv())===srv},SRV);
  if(!ok){console.log(JSON.stringify({seed:si,road:ROAD,err:'road not reached'}));await ctx.close();return}
  let src=fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8');
  src=src.replace('function modalStep(sens){','function modalStep(sens){{const m=Q[0];if(m&&/làm gì\\?|tác phẩm gì\\?/.test(m.t||"")&&!document.getElementById("modal").hidden){const B=[...document.querySelectorAll("#modal button")].filter(b=>!b.disabled&&/^\\s*Làm/.test(b.textContent));if(B.length){B[0].click();return true}}}');
  await p.evaluate(src);
  await p.evaluate(()=>{const W=window.__ap={src:{},reach:{},life:S.name,srv0:!!(typeof isSrv==='function'&&isSrv()),origin:S.origin&&S.origin.k};
   const who=()=>{const L=String(new Error().stack).split('\n').slice(3).map(l=>(l.match(/at (?:Object\.|window\.)?([\w$.]+)/)||[])[1]||'?').filter(f=>!/^(addArt|addArtP|addVir|crsPush|who|tally|Array|eval|Function|apply|call)$/.test(f));return L.slice(0,3).join('<')};
   const tally=(k,g)=>{if(!(g>0))return;const w=who();const e=W.src[k+'|'+w]=W.src[k+'|'+w]||[0,0];e[0]++;e[1]+=g};
   const a0=addArt;addArt=window.addArt=function(k,g){tally('art:'+k,g);return a0.apply(this,arguments)};
   if(typeof addVir==='function'){const v0=addVir;addVir=window.addVir=function(p,k,g){if(p===S)tally('vir:'+k,g);return v0.apply(this,arguments)}}
   W.snap=()=>{for(const k in (S.arts||{})){const l=S.arts[k]|0;for(let b=1;b<=l;b++){const key=k+':'+b;if(W.reach[key]==null)W.reach[key]={t:S.turn,buoi:window.__lifeB||0}}}}});
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(()=>{const n0=window.__res.length;window.__bot.step('sens',120);window.__ap.snap();return{t:S.turn,dead:window.__res.length>n0}});
   if(st.dead){end='ended';break}if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||1500)*1e3){end='cap';break}}
  const W=await p.evaluate(()=>{const W=window.__ap;delete W.snap;return Object.assign({},W,{arts:Object.assign({},S.arts),artp:Object.assign({},S.artp||{}),t:S.turn,buoi:window.__lifeB||0,srvNow:!!(typeof isSrv==='function'&&isSrv())})});
  console.log(JSON.stringify({seed:si,road:ROAD,end,ap:W,errs:errs.slice(0,3)}));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
