// review/sideq-trim (owner OD 26/11 ~19:15Z «phụ tuyến nhiều quá … ai cũng tới tìm tôi»): robot lives count every Việc nhờ / Phụ tuyến ask.
// usage: node dev/measure/sideq-count.js <page.html> <seeds> [months=12] [seed0=0] [rank=-1]
//   rank ≥ 0 = a high-rank life: she starts at that rank index (j1 RANKS) right after the draw (only for counting who asks at that band).
// Records per ask: month, tuần, her rank, asker kind (q72 rk), source (how: ""=random tick, fu=follow-up/NPC road, meet, ask, collect),
// template id, open quests at that moment. Also every modal title (Q.push) whose title holds «nhờ|Phụ tuyến|Việc nhờ|Lời nhờ».
// env ACC=1 = she accepts every ask (a yes-player: shows open quests, lengths, endings). env PAR (default 3), CAP (s per seed, default 600). Prints one JSON line per seed.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0,RK]=process.argv;const N=+NS||3,MONTHS=+MO||12,seed0=+S0||0,PAR=+process.env.PAR||3,RANK=RK==null?-1:+RK;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${5000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  if(RANK>=0)await p.evaluate(r=>{S.rank=r;try{if(typeof f14==="function"&&f14()&&typeof BAL.st14==="object")S.st.ch.n=Math.max(S.st.ch.n,BAL.st14.parts[1][0])}catch(e){}},RANK);
  await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8'));
  await p.evaluate(fs.readFileSync(path.join(__dirname,'inq72.js'),'utf8'));
  if(process.env.ACC)await p.evaluate(()=>{window.__acc=1});
  await p.evaluate(()=>{window.__asks=[];window.__mt=[];const o0=q72Offer;q72Offer=function(x,how){const r=o0.apply(this,arguments);
     try{if(r&&window.__acc){const i=Q.map(m=>m&&m.t).lastIndexOf("Việc nhờ");if(i>=0){const m=Q.splice(i,1)[0];try{m.opts[0].go()}catch(e){}}}}catch(e){}
     try{if(r)__asks.push({t:S.turn,w:wk(),rank:S.rank,k:x.rk,how:how||"",tid:x.tid,open:q72().a.length})}catch(e){}return r};
    const p0=Q.push.bind(Q);Q.push=function(...a){try{for(const m of a){const s=((m&&m.t)||"")+" | "+String((m&&m.h)||"").replace(/<[^>]+>/g,"").slice(0,90);if(/nhờ|Phụ tuyến|Lời nhờ/i.test(s))__mt.push({t:S.turn,rank:S.rank,s:s.slice(0,120)})}}catch(e){}return p0(...a)};
    window.__openMax=0;window.__openW=[];window.__ends=[];const e0=q72End;q72End=function(x,res){try{const T=T72I[x.tid];__ends.push({tid:x.tid,res,len:wk()-(x.t0||wk()),dl:T?(T.dl||6):null,steps:T?T.s.length:null,rank:S.rank,k:x.rk})}catch(e){}return e0.apply(this,arguments)}});
  const t0=Date.now();let end='months';let lastW=-1;
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;window.__bot.step(m,60);let o=0;try{o=q72().a.length;if(o>__openMax)__openMax=o;const w=wk();if(w!==window.__lw){window.__lw=w;__openW.push(o)}}catch(e){}return{t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||600)*1e3){end='cap';break}}
  const out=await p.evaluate(()=>{const q=q72();return{asks:__asks,mt:__mt.slice(0,400),openMax:__openMax,openW:__openW,n:q.n,ends:__ends,rank:S.rank,turn:S.turn}});
  console.log(JSON.stringify(Object.assign({seed:si,end,rank0:RANK,errs:errs.slice(0,3)},out)));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
