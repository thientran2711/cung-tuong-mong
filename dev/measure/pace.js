// review/balance-pace (owner OD 25/11 ~23:52Z «bao giờ tao mới lên được bậc … bao lâu lên được hoàng hậu»):
// robot lives on the real game; every month records her course points (6+ Tài nghệ + 4 Tứ đức), bậc, rank, Sủng/Danh and the NPC consorts' ranks.
// usage: node dev/measure/pace.js <page.html> <seeds> [months=60] [seed0=0] [mode=sens|study]
//   sens  = the inpage6 «sensible» bot as is (a good all-round player)
//   study = the same bot but it studies whenever it can (window.__studyBias: a player who wants her skills up)
// env PAR (parallel pages, default 3), CAP (seconds per seed, default 900), BALO (JSON merged into BAL before play: a curve option)
// prints one JSON line per seed: {seed, months:[{t,rank,sung,danh,ap:{k:pts},vp:{k:pts},al:{k:bậc},vl:{k:bậc},npc:[ranks]}], acts, end}
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0,MODE]=process.argv;const N=+NS||4,MONTHS=+MO||60,seed0=+S0||0,PAR=+process.env.PAR||3,mode=MODE||'sens';
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${5000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  let src=fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8');
  /* a lesson that first asks «Học X: làm gì?» / «… làm ra tác phẩm gì?» (jtds / j83 wkAsk, kit buttons, no opts): she picks the first open «Làm» (the bot closed it: no lesson) */
  src=src.replace('function modalStep(sens){','function modalStep(sens){{const m=Q[0];if(m&&/làm gì\\?|tác phẩm gì\\?/.test(m.t||"")&&!document.getElementById("modal").hidden){const B=[...document.querySelectorAll("#modal button")].filter(b=>!b.disabled&&/^\\s*Làm/.test(b.textContent));if(B.length){B[0].click();return true}}}');
  if(mode==='study'){/* a skill-minded player: lesson / self-study / Tứ đức self-study scored above most acts while Sức allows */
   src=src.replace('opts.push({s:2.0+(S.sung>=40?.5:0)-(S.suc<55?1.5:0),','opts.push({s:4.0-(S.suc<55?1.5:0),')
      .replace('opts.push({L:"self",s:1.3-(S.suc<70?.5:0),','opts.push({L:"self",s:3.6-(S.suc<70?.8:0),')
      .replace('opts.push({L:"vself",s:1.1-(S.suc<70?.5:0),','opts.push({L:"vself",s:3.5-(S.suc<70?.8:0),')}
  await p.evaluate(src);
  /* SKILL=good|avg: her lesson games are PLAYED with a raw mark drawn from that hand (good 6.5–10, avg 3.5–8) instead of the bot's «Học nhanh» roll */
  /* her real course gains (lesson or event): calls and points (a try the game refused is not counted) */
  await p.evaluate(()=>{window.__gain={a:0,an:0,v:0,vn:0};const aa=addArt;addArt=function(k,g){if(g>0){__gain.a+=g;__gain.an++}return aa.apply(this,arguments)};
   const av=addVir;addVir=function(q,k,g){if(q===S&&g>0){__gain.v+=g;__gain.vn++}return av.apply(this,arguments)}});
  if(process.env.SKILL)await p.evaluate(sk=>{window.__rawD=()=>Math.min(10,sk==='good'?6.5+Math.random()*3.5:3.5+Math.random()*4.5);
   const pa=playArt;playArt=function(o){if(S&&S.mg&&o&&typeof o.onDone==='function'){const r=Math.round(window.__rawD());return o.onDone(r,{})}return pa.apply(this,arguments)};
   const tf=tdFinish;tdFinish=function(k,mode,raw,skipped){if(skipped&&window.__bot){raw=Math.round(window.__rawD());skipped=false}return tf.call(this,k,mode,raw,skipped)}},process.env.SKILL);
  const snap=()=>p.evaluate(()=>{const ap={},al={},vp={},vl={};try{for(const a of ARTS){ap[a.k]=artPts(S,a.k);al[a.k]=S.arts[a.k]||0}}catch(e){}
    try{for(const v of VIR){vp[v.k]=virPts(S,v.k);vl[v.k]=(S.vir||{})[v.k]||0}}catch(e){}
    let npc=[];try{npc=(typeof rivals!=='undefined'?rivals:[]).filter(v=>v&&v.alive!==false&&!v.out).map(v=>v.rank|0)}catch(e){}
    let nart=[];try{nart=(typeof rivals!=='undefined'?rivals:[]).filter(v=>v&&v.alive!==false&&!v.out).map(v=>{let s=0,n=0;for(const a of ARTS){s+=artPts(v,a.k);n++}return Math.round(s/n)})}catch(e){}
    return{t:S.turn,rank:S.rank,out:!!S.out,srv:!!(typeof isSrv==='function'&&isSrv()),sung:Math.round(S.sung),danh:Math.round(S.danh),ap,al,vp,vl,npc,nart}});
  const t0=Date.now();let end='months';const months=[];let lastT=-1;
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;window.__bot.step(m,120);return{t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}
   if(st.t!==lastT){lastT=st.t;months.push(await snap())}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){end='cap';break}}
  const acts=await p.evaluate(()=>Object.assign({},window.__acts,{gain:window.__gain}));const res=await p.evaluate(()=>window.__res.slice(-1)[0]||null);
  console.log(JSON.stringify({seed:si,mode,skill:process.env.SKILL||'quick',end,origin:(res&&res.origin)||null,months,acts,errs:errs.slice(0,3)}));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
