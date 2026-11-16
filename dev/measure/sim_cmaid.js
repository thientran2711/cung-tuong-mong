/* review/close-maid (D58): balance check of the close-maid effects per origin (owner: no re-test of the origins themselves, only the maid).
   usage: node dev/measure/sim_cmaid.js <url> [lives per origin] [months] [origins comma list]
   Each life: forced origin, she does nothing but (CARE=1) talks with her maid when her loyalty is under 55 (Tâm sự, +6, as a player
   who keeps her maid would; CARE=0: a passive bot, her maid is bought away every year or two), is kept alive; every close-maid dilemma is answered at random (a random option, fx applied, go run).
   Counts what the close maid gave and took: bạc, Danh, Sủng, Đức, Thái hậu thiện cảm, Sức, proof, her loyalty at the end, dilemmas. */
const {chromium}=require('playwright');const [,,URL,LIVES='3',MON='120',ORG='tt,dtq,muoi,nc,ch,thd,td,cn',CARE='1']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--blink-settings=imagesEnabled=false']});
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(1200000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(800);
 for(const o of ORG.split(',')){const out=await p.evaluate(async([o,LIVES,MON,CARE])=>{const T={lives:0,bac:0,danh:0,sung:0,duc:0,th:0,suc:0,ev:0,loyEnd:0,dil:0,src:{},tal:{},N:{},errs:[]};
  for(let L=0;L<LIVES;L++){window.__cmN={};window.__forceOrigin=o;SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;
   const r0=render,d0=die,o0=over;render=()=>{};die=()=>{};over=()=>{};
   const snap=()=>({bac:S.bac,danh:S.danh,sung:S.sung,duc:S.duc,th:S.th,suc:S.suc});const add=(a,z)=>{for(const k of ["bac","danh","sung","duc","th","suc"])T[k]+=(z[k]||0)-(a[k]||0)};
   const fact0=window.__cmN.fact||0;
   const solve=()=>{for(let g=0;g<20&&Q.length;g++){const q=Q[0];if(q&&q.opts&&q.pid&&/^cm/.test(q.pid)){const a=snap();const op=q.opts[Math.floor(Math.random()*q.opts.length)];Q.shift();try{apply(op.fx||{});if(op.go)op.go()}catch(e){T.errs.push(String(e).slice(0,100))}add(a,snap());T.dil++}else Q.shift()}};
   const cm0=cmMonthMe;cmMonthMe=function(){const a=snap();const r=cm0.apply(this,arguments);add(a,snap());return r};
   solve();let g=0;const t0=S.turn;while(S.turn<t0+MON&&g++<MON*8){if(S.dead)S.dead=false;S.suc=Math.max(S.suc||0,60);S.mg=null;S.out=false;S.confined=0;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}
    if(CARE&&S.maid&&S.maid.loyal<55&&S.tuan===0)S.maid.loyal=cl(S.maid.loyal+6,0,100);try{endTurn()}catch(e){T.errs.push(String(e).slice(0,160));if(T.errs.length>5)break}solve()}
   cmMonthMe=cm0;render=r0;die=d0;over=o0;T.lives++;T.loyEnd+=S.maid?S.maid.loyal:0;const m=S.maid||{};T.src[m.src]=(T.src[m.src]||0)+1;T.tal[m.tal]=(T.tal[m.tal]||0)+1;
   for(const [k,v] of Object.entries(window.__cmN))T.N[k]=(T.N[k]||0)+v;T.keep=(T.keep||0)+(S.maid&&S.maid.src!=="noi"?1:0)}
  T.ev=T.N.fact||0;return T},[o,+LIVES,+MON,+CARE]);
  console.log(JSON.stringify(Object.assign({o},out)))}
 console.log(JSON.stringify({pageErrors:errs.slice(0,8)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
