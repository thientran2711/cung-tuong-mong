/* jmen balance: bot plays (inpage5 sensible/random) and counts men encounters per game year.
   usage: node dev/measure/men.js <baseURL of the game page> <mode sens|rand> <bot iterations> [out.json] [walk 0..1]
   walk: chance that a 'walker' takes one stroll to a random open place at the START of each buổi (the inpage5 bots almost never walk:
   34 walks in 7 years); a player who strolls once a buổi ≈ walk 1.
   prints {lives, years, per year: stray (buổi with a stray), enc (her encounters), npcSee, choices…, crashes, page errors} */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,MODE,ITER,OUT,WALK]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(600000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;});
 await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage5.js'),'utf8'));
 await p.evaluate(()=>{window.__menL=[];const o0=over;over=function(){try{window.__menL.push({y:S.turn/12,st:Object.assign({},S.menStat||{}),srv:!!(typeof isSrv==='function'&&isSrv())})}catch(e){}return o0.apply(this,arguments)};
  const s0=start;start=function(){try{if(S&&!S.dead&&S.turn>0)window.__menL.push({y:S.turn/12,st:Object.assign({},S.menStat||{}),srv:!!(typeof isSrv==='function'&&isSrv()),cut:1})}catch(e){}return s0.apply(this,arguments)}});
 await p.evaluate(w=>{window.__walk=+w||0;const nb=nextBuoi;nextBuoi=function(){const r=nb.apply(this,arguments);try{if(S&&!S.dead&&!Q.length&&!S.out&&!S.confined&&Math.random()<window.__walk){const P=places().map(x=>x.k).filter(k=>k!==S.place);const st=k=>{try{return accState(k)}catch(e){return{why:'x'}}};const ok=P.filter(k=>!st(k).why);if(ok.length){menStat('walk');goTo(ok[Math.floor(Math.random()*ok.length)])}}}catch(e){}return r}},WALK||0);
 const N=+ITER||20000;for(let i=0;i<N;i+=500){await p.evaluate(([m])=>window.__bot.step(m,500),[MODE==='rand'?'rand':'sens'])}
 const r=await p.evaluate(()=>{const L=window.__menL.slice();if(S&&!S.dead)L.push({y:S.turn/12,st:Object.assign({},S.menStat||{}),srv:isSrv&&isSrv(),cut:1});const A=L.filter(x=>!x.srv);const Y=A.reduce((s,x)=>s+x.y,0);const T={};A.forEach(x=>{for(const k in x.st)T[k]=(T[k]||0)+x.st[k]});const per={};for(const k in T)per[k]=+(T[k]/Math.max(.01,Y)).toFixed(2);
  const crash=window.__res.filter(x=>/CRASH/.test(x.title||"")).map(x=>x.fate);return{lives:A.length,years:+Y.toFixed(1),perYear:per,total:T,crash:crash.slice(0,5),bad:window.__bad.slice(0,5),saveFail:window.__saveFail.slice(0,5)}});
 r.errs=errs.slice(0,8);console.log(JSON.stringify(r));if(OUT)fs.writeFileSync(OUT,JSON.stringify(r));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
