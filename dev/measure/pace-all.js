// review/pace-all (owner OD 26/11 ~08:00Z «tài nghệ … tiến bộ thì đòi 100 điểm mà mỗi lần học chỉ được có 2 điểm» + ~08:05Z «tiến bộ là tiến bộ của cái bậc đó»
// + ~08:25Z «làm cách nào để giảm bớt oán»): ONE pace robot for EVERY progress bar of HER life on the real game.
// It records, for each bar, every RISE she gets and the act that caused it (the inpage6 bot's note(k) = one ordinary act), and the size of the
// bar's current STEP (bậc / band) at that moment, so a gain reads as a share of the step: 1/15 … 1/3 is the target window.
// usage: node dev/measure/pace-all.js <page.html> <seeds> [months=24] [seed0=0] [mode=sens|study]
// env PAR (default 3), CAP (s per seed, default 1500), BALO (JSON merged into BAL before play)
// prints one JSON line per seed: {seed, end, ev:[[bar, l, step, gain, act]...], oan:[weekly {mx, mean, n≥band...}], snaps}
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0,MODE]=process.argv;const N=+NS||3,MONTHS=+MO||24,seed0=+S0||0,PAR=+process.env.PAR||3,mode=MODE||'sens';
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
  if(mode==='study')src=src.replace('opts.push({s:2.0+(S.sung>=40?.5:0)-(S.suc<55?1.5:0),','opts.push({s:4.0-(S.suc<55?1.5:0),')
      .replace('opts.push({L:"self",s:1.3-(S.suc<70?.5:0),','opts.push({L:"self",s:3.6-(S.suc<70?.8:0),')
      .replace('opts.push({L:"vself",s:1.1-(S.suc<70?.5:0),','opts.push({L:"vself",s:3.5-(S.suc<70?.8:0),');
  /* the act tag: every note(k) of the bot = one ordinary act she chose */
  src=src.replace('function note(k,d){','function note(k,d){window.__act=k;window.__actN=(window.__actN||0)+1;');
  await p.evaluate(src);
  await p.evaluate(()=>{
   const EV=window.__ev=[];const act=()=>window.__tick||window.__act||'?';
   const push=(bar,l,step,g)=>{if(g>0&&step>0)EV.push([bar,l,step,Math.round(g*100)/100,act(),window.__actN||0])};
   /* 1. courses (Tài nghệ / Tứ đức): the step = phần the bậc needs (crsNeedP), the gain = phần given */
   const cp=crsPush;crsPush=function(lv,pt,k,g,up){try{if(S&&(lv===S.arts||lv===S.vir)&&g>0){const l=lv[k]||0;if(l<BAL.art.tier.length-1)push((lv===S.arts?'art:':'vir:')+k,l,crsNeedP(l),g)}}catch(e){}return cp.apply(this,arguments)};
   /* 2. numbers of HER (0..100 stats, Hoàng thượng để ý, Chủ tin, Công lao, Lễ nghi khuê các, pet bond): diff around every act / tick */
   const RK=()=>{try{return RANKS}catch(e){return[]}};
   const stepOf=(k,v)=>{const r=S.rank|0,R=RK();
    if(k==='sung'){const a=R[r]&&R[r].s,b=R[r+1]&&R[r+1].s;return b!=null?b-a:15}
    if(k==='danh'||k==='duc'){const a=R[r]&&R[r].d,b=R[r+1]&&R[r+1].d;return b!=null?b-a:12}
    return 0};
   const snapV=()=>{const o={};if(!S)return o;for(const k of['sung','danh','duc','tai','sac'])o[k]=+S[k]||0;o.th=+S.th||0;o.hh=+S.hh||0;
    o.nt=+S.nt||0;o.tin=+S.tin||0;o.mp=(S.srv&&+S.srv.mp)||0;o.le=(S.kc&&+S.kc.le)||0;
    try{(S.pets||[]).forEach((P,i)=>{if(P&&P.aff!=null)o['pet'+i]=+P.aff})}catch(e){}
    try{for(const v of rivals){if(!v||v.alive===false||v.out||v.coop)continue;o['rl:'+v.id]=+v.rel||0;o['oan:'+v.id]=+v.oan||0;o['ghen:'+v.id]=+v.ghen||0;o['ro:'+v.id]=+(S.ro||{})[v.id]||0}}catch(e){}
    return o};
   const STEP={th:20,hh:20,nt:()=>((BAL.ntRise||{}).at||30),tin:20,mp:10,le:1,pet:20,rl:20,oan:0,ghen:20,ro:0};
   const bandOf=v=>{const L=BAL.oanLv;let i=0;while(i<L.length&&v>=L[i])i++;const lo=i?L[i-1]:0,hi=i<L.length?L[i]:100;return[i,hi-lo]};
   let last=null;const diff=()=>{const o=snapV();if(last){for(const k in o){const d=o[k]-(last[k]||0);if(!(d>0))continue;const base=k.split(':')[0].replace(/^pet\d+$/,'pet');
      if(base==='oan'||base==='ro'){const [i,w]=bandOf(last[k]||0);push(k,i,w,d)}
      else{let st=stepOf(base,last[k]);if(!st){const s=STEP[base];st=typeof s==='function'?s():s}push(k,0,st||20,d)}}}last=o};
   window.__diff=diff;
   const et=endTurn;endTurn=function(){diff();window.__tick='tick:day';try{return et.apply(this,arguments)}finally{diff();window.__tick=null}};
   /* weekly oán record (toward her, and hers toward others) */
   window.__ow=[];const ow=()=>{try{const R=rivals.filter(v=>v&&v.alive!==false&&!v.out&&!v.coop);const a=R.map(v=>+v.oan||0),g=R.map(v=>+v.ghen||0),mine=Object.values(S.ro||{}).map(x=>+x||0);
     const L=BAL.oanLv;window.__ow.push({w:S.turn*3+S.tuan,rank:S.rank,mx:a.length?Math.max(...a):0,mean:a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0,deep:a.filter(x=>x>=L[2]).length,hate:a.filter(x=>x>=L[3]).length,n:a.length,
      gmx:g.length?Math.max(...g):0,gmean:g.length?Math.round(g.reduce((x,y)=>x+y,0)/g.length):0,my:mine.length?Math.max(...mine):0,dg:(()=>{try{return tsDangerOf(S).n}catch(e){return null}})(),sung:Math.round(S.sung),danh:Math.round(S.danh),duc:Math.round(S.duc||0),th:Math.round(S.th||0)})}catch(e){}};
   const et2=endTurn;endTurn=function(){const k0=S.turn*3+S.tuan;const r=et2.apply(this,arguments);if(S.turn*3+S.tuan!==k0)ow();return r};
   /* rise sources of ghen / oán toward her (caller names from the stack): {kind:{caller:[n, sum, max]}} */
   const W=window.__src={};const who=()=>{const L=String(new Error().stack).split('\n').slice(3).map(l=>(l.match(/at (?:Object\.|window\.)?([\w$.]+)/)||[])[1]||'?').filter(f=>!/^(ghenUp|ghenAll|oanAdd|affAdd|tally|who|Array|eval|Function|o0|a0|n0|g0|f0|r0)$/.test(f)&&!/^(Array|Object)\./.test(f));return L.slice(0,2).join('<')};
   const tally=(k,n)=>{if(!(n>0))return;const z=W[k]=W[k]||{};const w=who();const e=z[w]=z[w]||[0,0,0];e[0]++;e[1]+=n;e[2]=Math.max(e[2],n)};
   const gu=ghenUp;ghenUp=function(v,n){const r=gu.apply(this,arguments);try{tally('ghen',r)}catch(e){}return r};
   const oa=oanAdd;oanAdd=function(x,y,n){try{if(y===S&&x!==S&&n>0)tally('oan',n)}catch(e){}return oa.apply(this,arguments)};
   /* every bot act: close the previous act's window */
   const bs=window.__bot.step;window.__bot.step=function(m,n){const r=[];for(let i=0;i<n;i++){const a0=window.__actN;bs.call(this,m,1);if(window.__actN!==a0)diff()}return r};
  });
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;window.__bot.step(m,120);return{t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||1500)*1e3){end='cap';break}}
  const out=await p.evaluate(()=>({src:window.__src,ev:window.__ev,ow:window.__ow,acts:window.__acts,rank:S.rank,turn:S.turn,srv:!!(typeof isSrv==='function'&&isSrv())}));
  console.log(JSON.stringify(Object.assign({seed:si,mode,end,errs:errs.slice(0,3)},out)));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
