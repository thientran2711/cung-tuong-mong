// review/stat-pace (owner OD 26/11 ~04:20Z «1 năm trong game đã full 100 điểm toàn bộ … sự kiện quá liên tục … kỳ ngộ +30 40 … người tìm liên tục»):
// robot lives on the real game (inpage6 «sens» bot, same harness family as pace.js); every game day (tuần) records her Danh / Đức / Sủng,
// Thái hậu / Hoàng hậu → ta thiện cảm, every consort's thiện cảm (v.rel) and oán (v.oan) toward her, her rank, and the cards that reached her
// that day (by kind). Also tallies the size of every gain through the funnels (apply / ap / affAdd / oanAdd) by size band.
// usage: node dev/measure/statpace.js <page.html> <seeds> [months=12] [seed0=0]   env PAR (default 3), CAP (s per seed, 900), BALO (JSON merged into BAL)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0]=process.argv;const N=+NS||4,MONTHS=+MO||12,seed0=+S0||0,PAR=+process.env.PAR||3;
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
   /* gain sizes through the funnels, toward HER only: band 1-3 / 4-7 / 8-14 / 15-24 / 25+ */
   const G=window.__g={};const band=n=>n<=3?'a1-3':n<=7?'b4-7':n<=14?'c8-14':n<=24?'d15-24':'e25+';
   const W=window.__src={};const who=()=>{const L=String(new Error().stack).split('\n').slice(3).map(l=>(l.match(/at (?:Object\.|window\.)?([\w$.]+)/)||[])[1]||'?').filter(f=>!/^(apply|affAdd|oanAdd|ap|tally|who|Array|eval|Function)$/.test(f)&&!/^(Array|Object)\./.test(f));return L.slice(0,2).join('<')};
   const tally=(k,n)=>{if(!(n>0))return;const o=G[k]=G[k]||{};const bb=band(n);o[bb]=(o[bb]||0)+1;o.sum=(o.sum||0)+n;const w=who();const z=W[k]=W[k]||{};const e=z[w]=z[w]||[0,0,0];e[0]++;e[1]+=n;e[2]=Math.max(e[2],n)};
   const a0=apply;apply=function(o){try{for(const k of ['sung','danh','duc','th','hh'])if(o&&o[k]>0)tally(k,o[k])}catch(e){}return a0.apply(this,arguments)};
   const f0=affAdd;affAdd=function(x,y,n){if(y===S&&x!==S)tally('rel',n);return f0.apply(this,arguments)};
   const o0=oanAdd;oanAdd=function(x,y,n){if(y===S&&x!==S)tally('oan',n);return o0.apply(this,arguments)};
   /* cards that reach her: every card painted (showModal, Q[0]), classed by title, counted once */
   window.__day={};window.__dayT=[];const seen=new WeakSet();const C=(t,m)=>{const pid=String(m.pid||'');if(pid==='j70')return'harm';if(pid==='kyngo')return'ky';if(/^j71[ix]$/.test(pid)||/(^| · )(Lời mời|Lễ$|Dâng lễ)|^(Tết|Tiết|Lễ|Hội) [^·]+$/.test(t))return'fest';
    if(/^(Có người đến|Có người tìm đến|Một ánh mắt)/.test(t)||m.gm||/visit/.test(pid))return'visit';if(/^(e68|q72o|rg$|rgo|j71m)/.test(pid)||/^Việc khó xử|^Phụ tuyến|^Lập công/.test(t))return'opt';if(/^Tin trong cung/.test(t))return'news';return'other'};
   const sm=showModal;showModal=function(){try{const m=Q[0];if(m&&typeof m==='object'&&!seen.has(m)){seen.add(m);const t=String(m.t||m.title||'').replace(/<[^>]+>/g,'');const k=C(t,m);window.__day[k]=(window.__day[k]||0)+1;window.__dayT.push((m.pid?m.pid+'|':'')+t.slice(0,40))}}catch(e){}return sm.apply(this,arguments)};
   /* one snapshot per game day (tuần), taken when the day turns */
   window.__snaps=[];const et=endTurn;endTurn=function(){const k0=S.turn*3+S.tuan;const pre=S.evc&&S.evc.d===k0?Object.assign({},S.evc.n,{t:S.evc.t}):null;const r=et.apply(this,arguments);try{if(S.turn*3+S.tuan!==k0){const x=window.__snapF();x.evc=pre;window.__snaps.push(x)}}catch(e){}return r};
   window.__snapF=()=>{const R=(typeof rivals!=='undefined'?rivals:[]).filter(v=>v&&v.alive!==false&&!v.out);
    const rel=R.map(v=>v.rel||0),oan=R.map(v=>v.oan||0),mx=a=>a.length?Math.max(...a):0,mean=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
    const d=window.__day;window.__day={};const dt=window.__dayT;window.__dayT=[];
    return{t:S.turn,tu:S.tuan,rank:S.rank,out:!!S.out,sung:Math.round(S.sung),danh:Math.round(S.danh),duc:Math.round(S.duc||0),th:Math.round(S.th||0),hh:Math.round(S.hh||0),
     relM:mean(rel),relX:mx(rel),rel90:rel.filter(x=>x>=90).length,oanM:mean(oan),oanX:mx(oan),oan90:oan.filter(x=>x>=90).length,n:R.length,day:d,dt}};
  });
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;window.__bot.step(m,120);return{k:S.turn*3+S.tuan,t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){end='cap';break}}
  const g=await p.evaluate(()=>window.__g);const srcT=await p.evaluate(()=>window.__src);const days=await p.evaluate(()=>window.__snaps);
  console.log(JSON.stringify({seed:si,end,days,g,src:srcT,errs:errs.slice(0,3)}));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
