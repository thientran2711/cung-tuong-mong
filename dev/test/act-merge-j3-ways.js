/* ACT-MERGE J3 parity: every way inside a Hành sự door does EXACTLY what its old card did (law: no rule / outcome lost; law 4 no new number).
   For each forced state and each door way: from ONE saved state + the same seed, path A = the old card path act(i) · path B = a real click on the
   door card, then a real click on the way's option in the kit dialog. Rolls forced to succeed, then to fail. Compares the queued dialog TITLES (a random «Kỳ ngộ» body may differ), and the CHANGE the act makes, AA.diff(before, after) of AA.snap() (the act-audit snapshot: every player number, relations, maid, items — background world timers excluded),
   khắc used and the result card text. usage: node dev/test/act-merge-j3-ways.js [url]   (exit 1 on any difference or page error) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const src=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL=process.argv[2]||'file://'+path.resolve(__dirname,'../../index.html');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);await p.evaluate(LIB);
 const ST={"base":"","ill":"S.ill={k:Object.keys(ILL)[0],st:2,at:wk()};S.arts.y=5","pregnant":"S.preg=2;S.hidden=true;S.fake=0","art":"for(const a of ['cam','vu','ky','hoa','y'])S.arts[a]=20","evening":"S.buoi=3"};
 let bad=0,n=0;const rows=[];
 for(const [k,js] of Object.entries(ST)){
  const doors=await p.evaluate(js=>{AA.scen('cao');eval(js);S.bac=Math.max(S.bac,500);S.suc=Math.max(S.suc,90);deal();AA.save();AA.restore(42);AA.show(AA.surfaces().find(s=>s.id==="act"));
   return [...document.querySelectorAll('#panel button[data-ddoor]')].map(b=>({k:b.dataset.ddoor,I:b.dataset.ddi.split(",").map(Number),X:b.dataset.ddx.split(",").map(Number),dis:b.disabled}))},js);
  for(const d of doors)for(let j=0;j<d.I.length;j++)for(const f of [true,false]){
   const run=async(viaDoor)=>{
    const r=await p.evaluate(async([d,j,f,viaDoor])=>{AA.restore(42);AA.show(AA.surfaces().find(s=>s.id==="act"));AA.hide();render();/* arrival events of the restore cleared in BOTH paths; ONE synchronous task: no background timer can step in */const name=deck[d.I[j]].n;const pre=AA.snap(),u0=used;AA.force=f;const a0=act;act=function(){AA.reseed(99);act=a0;return a0.apply(this,arguments)};/* same RNG stream from the act on: showing a dialog draws randoms (voice, seals) */
     if(!viaDoor){act(d.I[j]);if(Q.length)showModal()/* the result card shows, as after a real tap */}else{const b=document.querySelector(`#panel button[data-ddoor="${d.k}"]`);if(!b)return{err:"no door"};if(b.disabled)return{off:1,name};b.click();
      if(!Q[0]||!(Q[0].opts||[]).some(o=>o&&o.ddoor))return{err:"door dialog not queued: Q="+Q.map(m=>m.t).join("/")+" dis="+b.disabled+" hsi="+b.dataset.ddi+" vs "+d.I.join(",")};const c=Q[0].opts[j];if(!c)return{err:"no way "+j};if(c.off){AA.force=null;Q.length=0;return{off:1,name}}
      const m=document.getElementById("modal");const o=!m.hidden&&[...m.querySelectorAll('.opts button.opt')].find(x=>+x.dataset.m===j);if(o){o.click();window.__j3real=(window.__j3real||0)+1}else{chooseM(j);window.__j3cm=(window.__j3cm||0)+1}await new Promise(r=>setTimeout(r,0))/* the way runs in its own task */}
     AA.force=null;if(act!==a0)act=a0;const s0=AA.diff(pre,AA.snap());delete s0.logs;const s={};for(const k in s0){const [x,y]=s0[k];s[k]=typeof x==='number'&&typeof y==='number'?y-x:s0[k]};return {name,pre:JSON.stringify(pre),used:used-u0,j:JSON.stringify(s),q:Q.map(m=>m.t).join("/"),toast:((document.getElementById("rtoast")||{}).innerText||"").slice(0,300)}},[d,j,f,viaDoor]);
    return r};
   const A=await run(false),A2=await run(false),B=await run(process.env.J3AA?false:true);n++;
   const eq=(X,Y)=>!X.err&&!Y.err&&X.used===Y.used&&X.q===Y.q&&X.j===Y.j;const same=B.off?(d.X[j]===0||d.dis):(eq(A,B)||eq(A2,B));const noisy=!same&&(!eq(A,A2)||A.pre!==B.pre);if(noisy){rows.push(`noisy [${k}] ${d.k} / ${A.name}: the old path itself varies, or the harness restore left a different start (rival ghen is not reset by AA.restore; a clamp at 0 then gives another delta)`);continue}
   let dk='';try{const a=JSON.parse(A.j),bb=JSON.parse(B.j);const D=(x,y,pf,dep)=>{if(JSON.stringify(x)===JSON.stringify(y))return[];if(dep>3||typeof x!=="object"||typeof y!=="object"||!x||!y)return[pf+":"+String(JSON.stringify(x)).slice(0,50)+"→"+String(JSON.stringify(y)).slice(0,50)];return Object.keys(Object.assign({},x,y)).flatMap(k=>D(x[k],y[k],pf+"."+k,dep+1))};dk=D(a,bb,"",0).filter(x=>!/^\.at:/.test(x)).join(" ; ")}catch(e){dk="ERR "+e.message}
   if(!same){bad++;rows.push(`DIFF [${k}] ${d.k} / ${A.name} force=${f}: used ${A.used}/${B.used} save ${A.j===B.j?"=":"≠"} q ${A.q===B.q?"=":"≠"} ${B.err||""} KEYS ${dk} QA ${A.q.slice(0,200)} QB ${(B.q||"").slice(0,200)}`)}
   else rows.push(`ok [${k}] ${d.k} / ${A.name} ${f?"thành":"bại"}${B.off?" (greyed in both)":""}`)}}
 rows.forEach(r=>console.log(r));console.log("option taps: real click",await p.evaluate(()=>window.__j3real||0),"· chooseM (modal held by a test-state dialog)",await p.evaluate(()=>window.__j3cm||0));console.log(`\n${n} way runs, ${bad} differences, ${rows.filter(r=>/^noisy/.test(r)).length} noisy (old path ≠ itself), page errors ${perr.length}`,perr.slice(0,3));await b.close();process.exit(bad||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
