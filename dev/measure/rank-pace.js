// review/rank-pace (MAIN 171 ORDER ~04:40Z (1), Foreman D JOB 3 D-RANKPACE): WHY does her rank stay flat?
// Robot lives on the real game (inpage6 bot, same harness family as pace.js / statpace.js). Every MONTH, right before the month's decree
// (promoteP(S) from monthTick), every row of promoReqP(S) is read and each unmet row is counted under ONE gate name (gate(), numbers dropped):
//   cnt[gate]  = months that gate was unmet;  sole[gate] = months it was the ONLY unmet gate (the true bottleneck).
// Also: the month each rank was first reached, every rank change (+/-) with the latest log line, the exam tallies (__exN), deaths/ends.
// Profiles (the robot-review seat kinds): lazy = plays only strong options (__minS 2.0), even = the inpage6 sensible bot as is,
//   greedy = chases favour: emperor place / Sủng / Danh options boosted (+1.5) and plays almost anything (__minS 0.1).
//   noexam = lazy + never sits the exam card; quiet = the real-tap «quiet» seat: answers dialogs, plays no card / talk / walk, no exam.
// usage: node dev/measure/rank-pace.js <page.html> <seeds> [months=96] [seed0=0] [profile=even]
// env PAR (default 3), CAP (s per seed, 1500), BALO (JSON merged into BAL before play)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0,PROF]=process.argv;const N=+NS||3,MONTHS=+MO||96,seed0=+S0||0,PAR=+process.env.PAR||3,prof=PROF||'even';
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
/* one gate name per promoReqP row (read in page) */
const GATE=`window.__rpGate=function(t){t=String(t).replace(/<[^>]+>/g,"");
 if(/^Sủng/.test(t))return"sung";if(/^Danh/.test(t))return"danh";if(/Cách lần/.test(t))return"gap";if(/Hoàng hậu không chặn/.test(t))return"hhBlock";
 if(/hiếu thảo/.test(t))return"thHate";if(/Hoàng hậu không phản đối/.test(t))return"hhOppose";if(/tranh ngôi/.test(t))return"seatBan";if(/bỏ trống/.test(t))return"hhSeatTaken";
 if(/Thái hậu (phải|quý)/.test(t))return"hhTh";if(/^Đức/.test(t))return"hhDuc";if(/cấm túc/.test(t))return"confined";if(/lãnh cung/.test(t))return"cold";
 if(/Chờ ghế|Ghế /.test(t))return"seatFull";if(/Đang tranh ghế/.test(t))return"contest";
 if(/Khảo hạch/.test(t)){if(/vừa trượt|lỡ hạn/.test(t))return"examCd";if(/được thi, hạn/.test(t))return"examOpen";if(/ân thi/.test(t))return"examGrace";if(/đủ các điều kiện/.test(t))return"examWait";return"exam:"+t.slice(0,40)}
 if(/^Kỳ sắc phong/.test(t))return"kyWait";if(/sắc phong|đại lễ|kỳ/i.test(t))return"ky:"+t.replace(/\\d+/g,"#").slice(0,40);
 return"other:"+t.replace(/\\d+/g,"#").slice(0,50)};`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${5000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};window.__exAuto=1;`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  let src=fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8');
  src=src.replace('function modalStep(sens){','function modalStep(sens){{const m=Q[0];if(m&&/làm gì\\?|tác phẩm gì\\?/.test(m.t||"")&&!document.getElementById("modal").hidden){const B=[...document.querySelectorAll("#modal button")].filter(b=>!b.disabled&&/^\\s*Làm/.test(b.textContent));if(B.length){B[0].click();return true}}}');
  /* noexam = the lazy player who never sits the promotion exam card (the real-tap seats: the board is a mini-game she must play herself) */
  if(prof==='noexam'||prof==='quiet')src=src.replace('{const ei=deck.findIndex(a=>a&&a.exam&&cardOK(a));if(ei>=0){note("exam");act(ei);return}}','').replace('function cardOK(a){','function cardOK(a){if(a&&a.exam)return false;');
  await p.evaluate(src);await p.evaluate(GATE);if(process.env.NOASK)await p.evaluate(()=>{window.__noAsk=1});
  await p.evaluate(pr=>{
   /* review/rank-pace: a player who is SHOWN the exam card («Thi ngay / Để sau», jexam exAsk) reads «được: thánh chỉ tấn phong …» and takes it
      (the inpage6 scorer only values fx, so it always took the free «Để sau»); env NOASK=1 keeps the old scorer */
   if(!window.__noAsk)window.__persPick=(okIdx,m)=>{if(m&&m.exAsk){const j=okIdx.find(([o])=>o.n==="Thi ngay");if(j)return j[1]}return null};
   if(pr==='lazy'||pr==='noexam')window.__minS=2.0;if(pr==='quiet')window.__minS=99;
   if(pr==='greedy'){window.__minS=0.1;window.__persOpts=(opts)=>{const W=S.where||{};for(const o of opts){const L=String(o.L||'');if(W.emp&&L==='g'+W.emp)o.s+=1.5;else if(/^c/.test(L)){const a=deck.find(x=>x&&'c'+x.n===L);const t=a?String(a.x||'')+String(a.t||''):'';if(/Sủng|Danh/.test(t))o.s+=1.0}}}}
   const R=window.__rp={cnt:{},sole:{},months:0,first:{},chg:[],lastRk:S.rank,lastLog:""};R.first[S.rank]=S.turn;
   const lg=log;log=function(t){try{R.lastLog=String(t).replace(/<[^>]+>/g,"").slice(0,90)}catch(e){}return lg.apply(this,arguments)};
   const pm=promote;promote=function(){try{if(S&&!S.dead&&!S.srv&&rkOf(S)<7){R.months++;const g=new Set();for(const [ok,t] of promoReqP(S))if(!ok)g.add(__rpGate(t));if(g.size>1)g.delete("examWait")/* the exam row only says «meet the rows above first» */;
     for(const k of g)R.cnt[k]=(R.cnt[k]||0)+1;if(g.size===1){const k=[...g][0];R.sole[k]=(R.sole[k]||0)+1}if(!g.size)R.sole.none=(R.sole.none||0)+1;
     R.byRk=R.byRk||{};const rk=rkOf(S);const B=R.byRk[rk]=R.byRk[rk]||{m:0};B.m++;for(const k of g)B[k]=(B[k]||0)+1}}catch(e){}return pm.apply(this,arguments)};
   const st=window.__bot.step;window.__bot.step=function(m,n){const r=st.apply(this,arguments);try{if(S&&!S.dead&&S.rank!==R.lastRk){R.chg.push([S.turn,S.rank,R.lastLog]);if(R.first[S.rank]==null)R.first[S.rank]=S.turn;R.lastRk=S.rank}}catch(e){}return r}},prof);
  const t0=Date.now();let end='months';const snaps=[];let lastT=-1;
  while(true){const st=await p.evaluate(()=>{const n0=window.__res.length;window.__bot.step('sens',120);return{t:S.turn,dead:window.__res.length>n0}});
   if(st.dead){end='died';break}
   if(st.t!==lastT){lastT=st.t;if(st.t%12===0)snaps.push(await p.evaluate(()=>({t:S.turn,rank:S.rank,out:!!S.out,sung:Math.round(S.sung),danh:Math.round(S.danh),th:Math.round(S.th||0),hh:Math.round(S.hh||0),duc:Math.round(S.duc||0)})))}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||1500)*1e3){end='cap';break}}
  const r=await p.evaluate(()=>({rp:window.__rp,ex:window.__exN||{},res:window.__res.slice(-1)[0]||null,rank:S.rank,turn:S.turn}));
  console.log(JSON.stringify({seed:si,prof,end,turn:r.turn,rank:r.rank,fate:r.res&&r.res.fate,origin:r.res&&r.res.origin,rp:r.rp,ex:r.ex,snaps,errs:errs.slice(0,3)}));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
