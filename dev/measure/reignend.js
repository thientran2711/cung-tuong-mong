// review/reign-end: pacespeed.js + the reign-end record (how and when the Emperor's reign ended: S.re.end / natural / plot / her own end first).
// Same harness, same JSON line (so dev/measure/pacespeed-sum.py reads it) + field «re». usage as pacespeed.js; dev/measure/reignend-sum.py summarises.
// (base) review/pace-speed (owner OD 26/11 ~19:10Z ruling (A): «robot 8-9 tiếng chưa ra được một cái kết»; stats land JUST AT the next bar; ≤ ~4 h to an ending).
// Whole robot lives on the real game (inpage6 «sens» bot, same harness family as statpace.js / pace.js), one life per seed, run until the life ENDS
// (over(): death, Hoàng hậu …) or the month cap. Records: every promotion (month, from → to, Sủng / Danh / Đức at that moment vs the bar RANKS[to].s/.d,
// which road), bot actions (one bot action = one player tap/choice) per rank, the ending (month, title, actions).
// usage: node dev/measure/pacespeed.js <page.html> <seeds> [maxMonths=300] [seed0=0]   env PAR (3), CAP (s per seed, 2400), BALO (JSON merged into BAL)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0]=process.argv;const N=+NS||4,MONTHS=+MO||300,seed0=+S0||0,PAR=+process.env.PAR||3;
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
  src=src.replace('function modalStep(sens){','function modalStep(sens){{const m=Q[0];if(m&&/làm gì\\?|tác phẩm gì\\?/.test(m.t||"")&&!document.getElementById("modal").hidden){const B=[...document.querySelectorAll("#modal button")].filter(b=>!b.disabled&&/^\\s*Làm/.test(b.textContent));if(B.length){B[0].click();return true}}}');
  await p.evaluate(src);
  await p.evaluate(()=>{
   const W=window.__ps={promos:[],acts:0,rk0:S.rank,origin:S.origin&&S.origin.k,start:{sung:S.sung,danh:S.danh,duc:S.duc||0},via:"",years:[],src:{}};
   const tag=(n,f)=>{if(typeof window[n]!=="function")return;const f0=window[n];window[n]=function(){const v0=W.via;W.via=n;try{return f0.apply(this,arguments)}finally{W.via=v0}}};
   ["promoteP","exDirectUp","exGraceUp","exSonUp","promoReward","demote","fall"].forEach(n=>{try{tag(n)}catch(e){}});
   W.last=S.rank;W.lastT=S.turn;
  });
  const t0=Date.now();let end='months';
  while(true){
   const st=await p.evaluate(()=>{const W=window.__ps;const n0=window.__res.length;let dead=false;
    for(let i=0;i<120;i++){const r0=S.rank,t0=S.turn;
     /* tap source (MAIN 161: count taps by source, to remove pure busywork): an open card = its pid/title + number of live buttons, else the bot's own move (act / travel / next buổi) */
     try{const md=document.getElementById('modal'),m=Q[0];let key;if(m&&md&&!md.hidden){const t=String(m.t||m.title||'').replace(/<[^>]+>/g,'').replace(/\d+/g,'#').slice(0,34);const nb=[...md.querySelectorAll('button')].filter(b=>!b.disabled&&b.offsetParent!==null).length;const no=(m.opts||[]).length;key='M|'+(m.pid?m.pid+'|':'')+t+'|o'+no+'|b'+nb}else if(S.mg)key='G|minigame';else if(!document.getElementById('ov').hidden)key='O|'+(document.querySelector('#ov h2,#ov h3,#ov .kt')||{}).textContent;else key='A|'+(S.place||'')+'|b'+(S.buoi||0);
      key=String(key).slice(0,80);W.src[key]=(W.src[key]||0)+1}catch(e){W.src['?']=(W.src['?']||0)+1}
     try{const m0=Q[0];if(m0&&m0.pid==='re'&&m0!==window.__reLast){window.__reLast=m0;const C=window.__reCards=window.__reCards||{};C[m0.pp.k]=(C[m0.pp.k]||0)+1}}catch(e){}window.__bot.step('sens',1);W.acts++;
     if(window.__res.length>n0){dead=true;break}
     if(S.rank!==r0){const to=S.rank,R=RANKS[to]||{};W.promos.push({t:S.turn,tu:S.tuan,from:r0,to,sung:Math.round(S.sung),danh:Math.round(S.danh),duc:Math.round(S.duc||0),barS:R.s,barD:R.d,via:W.via||"?",acts:W.acts,out:!!S.out})}
     /* stall causes, one look per game month (MAIN 163): why she cannot rise now — queen block / seat full / stat bar / exam / gap / other */
     if(S.turn!==t0&&S.rank<7&&!S.out){try{const L=promoReqP(S).filter(x=>!x[0]).map(x=>String(x[1]));const c=W.stall=W.stall||{};const k=!L.length?"ready":L.some(x=>/^Hoàng hậu không (chặn|phản đối)/.test(x))?"qBlock":L.some(x=>/^Chờ ghế/.test(x))?"seat":L.some(x=>/^(Sủng|Danh|Đức) \d/.test(x))?"stat":L.some(x=>/^Cách lần/.test(x))?"gap":L.some(x=>/Khảo hạch/.test(x))?"exam":"other";c[k]=(c[k]||0)+1}catch(e){}}
     if(S.turn!==t0&&S.turn%12===0)W.years.push({t:S.turn,rank:S.rank,sung:Math.round(S.sung),danh:Math.round(S.danh),duc:Math.round(S.duc||0),acts:W.acts,out:!!S.out,miss:(()=>{try{return promoReqP(S).filter(x=>!x[0]).map(x=>String(x[1]).slice(0,40))}catch(e){return['?']}})(),ex:S.ex?{cd:S.ex.cd,n:S.ex.n,lapse:S.ex.lapse}:null})}
    return{t:S.turn,dead}});
   if(st.dead){end='ended';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||2400)*1e3){end='cap';break}}
  const W=await p.evaluate(()=>{const W=window.__ps;const r=window.__res[window.__res.length-1]||null;return Object.assign({},W,{botActs:window.__acts,trimN:window.__trimN,emp:{age:S.emp&&S.emp.age,tho:S.emp&&S.emp.tho,year:S.year},re:{end:S.re&&S.re.end||null,ry:S.year-(S.reign&&S.reign.y0!=null?S.reign.y0:1),why:S.mort&&S.mort.empWhy||null,empDead:!!S.empDead,succ:S.succ?{p:S.succ.p||null,end:S.succ.end||null}:null,cards:window.__reCards||{},a:S.re?Math.round(S.re.a):null,F:S.re?S.re.F:null},trimL:window.__trimL,res:r?{title:r.title,fate:r.fate,turns:r.turns,age:r.age,rank:r.rank,maxRank:r.maxRank,hhTurn:r.hhTurn}:null,tNow:S.turn,rankNow:S.rank})});
  console.log(JSON.stringify({seed:si,end,wall:Math.round((Date.now()-t0)/1000),ps:W,errs:errs.slice(0,3)}));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
