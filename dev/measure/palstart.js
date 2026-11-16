// review/palace-start: children at start + births over the first 3 in-game years (owner 16/11 "game starts right after the accession").
// usage (env SEED0=<n> picks another seed set, default 1000): node dev/measure/palstart.js <page.html> init <N>            -> N fresh new games: children at start (count, sexes, mothers, đích tử)
//        node dev/measure/palstart.js <page.html> bot <seeds> [months=36] [mode=sens]  -> inpage6 bot plays each seed for <months>;
//        reports children by year, first-born mother (player / NPC), modals (events) + log lines per year. env BALJ='{"npcConc":1}' overrides BAL.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,what,NS,MO,MODE]=process.argv;const N=+NS||6,MONTHS=+MO||36,mode=MODE||'sens';
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const out=[];
 for(let si=0;si<(what==='init'?1:N);si++){
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${(+process.env.SEED0||1000)+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(process.env.BALJ)await p.evaluate(`Object.assign(BAL,${process.env.BALJ})`);
  if(what==='init'){
   const r=await p.evaluate(n=>{try{document.getElementById('title').hidden=true}catch(e){}const L=[];
    window.__nlInner=1;for(let i=0;i<n;i++){start();Q.length=0;const ks=allKids().filter(([k])=>k.alive);
     L.push({n:ks.length,m:ks.filter(([k])=>k.sex==="m").length,f:ks.filter(([k])=>k.sex==="f").length,queenSon:ks.some(([k,v])=>v&&v.queen&&k.sex==="m"),
      maxAge:Math.max(0,...ks.map(([k])=>k.age)),heir:!!S.heir,era:S.emp.era,nRivals:rivals.length,ranks:rivals.map(v=>v.rank).join('')})}
    return L},N);
   const h={};r.forEach(x=>h[x.n]=(h[x.n]||0)+1);
   out.push({games:r.length,kidsHist:h,meanKids:+(r.reduce((a,x)=>a+x.n,0)/r.length).toFixed(2),sons:r.reduce((a,x)=>a+x.m,0),daughters:r.reduce((a,x)=>a+x.f,0),
    queenSonGames:r.filter(x=>x.queenSon).length,heirAtStart:r.filter(x=>x.heir).length,maxKidAge:Math.max(...r.map(x=>x.maxAge)),over2:r.filter(x=>x.n>2).length,errs:errs.slice(0,3)});
  }else{
   await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0});
   await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8'));
   await p.evaluate(()=>{window.__ps={births:[],modals:{},logs:{},start:null,life:0};
    const yr=()=>Math.floor((S.turn||0)/12)+1;
    const snap=()=>({kids:allKids().filter(([k])=>k.alive).map(([k,v])=>({s:k.sex,a:k.age,mom:v?(v.queen?"queen":"npc"):"me"}))});
    window.__ps.start=snap();
    const b0=birthP;birthP=function(pp,fake){const n0=((pp&&pp.kids)||[]).length;const r=b0.apply(this,arguments);try{((pp&&pp.kids)||[]).slice(n0).forEach(k=>window.__ps.births.push({t:S.turn,y:yr(),mom:pp===S?"me":(pp.queen?"queen":"npc"),r:pp===S?S.rank:pp.rank,s:k.sex}))}catch(e){}return r};
    const pm0=pushModal;pushModal=function(m){try{const y=yr();window.__ps.modals[y]=(window.__ps.modals[y]||0)+1}catch(e){}return pm0.apply(this,arguments)};
    const l0=log;log=function(h){try{const y=yr();window.__ps.logs[y]=(window.__ps.logs[y]||0)+1}catch(e){}return l0.apply(this,arguments)};
    window.__ps.snap=snap});
   const t0=Date.now();let dead=false;const byYear={};
   while(true){const st=await p.evaluate(([m])=>{const n0=window.__res.length;window.__bot.step(m,200);return{t:S.turn,dead:window.__res.length>n0}},[mode]);
    const y=Math.floor(st.t/12);if(y>=1&&y<=Math.ceil(MONTHS/12)&&!byYear[y])byYear[y]=await p.evaluate(()=>window.__ps.snap());
    if(st.dead){dead=true;break}if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){console.error('time cap seed',si);break}}
   const r=await p.evaluate(()=>({births:window.__ps.births,modals:window.__ps.modals,logs:window.__ps.logs,start:window.__ps.start,turn:S.turn,rank:S.rank}));
   out.push({seed:si,dead,...r,byYear,errs:errs.slice(0,3),sec:Math.round((Date.now()-t0)/1000)});
   console.error('seed',si,'turn',r.turn,'births',r.births.length,'dead',dead,Math.round((Date.now()-t0)/1000)+'s');
  }
  await ctx.close()}
 console.log(JSON.stringify(out));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
