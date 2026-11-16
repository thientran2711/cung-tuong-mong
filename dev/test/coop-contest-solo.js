/* review/coop-contest: solo is unchanged. The festival contest outside co-op still pays through the mini-game (no hold), the gift / wager
   variants still resolve at once, a save without the co-op contest keys loads and plays on. usage: node dev/test/coop-contest-solo.js [outdir] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../../cc-solo'));fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true});await serve(ctx);
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))errs.push('console: '+m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&rivals&&rivals.length>0,null,{timeout:90000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{Q.length=0;const o={};o.coop=!!(window.COOPW&&COOPW.on);
  /* a festival contest day with the mini-game: solo pays at the mini-game result (no hold) */
  let got=null;const sc0=startContest;startContest=x=>{got={hold:!!x.hold};x.onDone({score:999,shown:true})};
  const k=Object.keys(FV7).find(f=>FEST[f]&&FV7[f].some(V=>V[0]==='C'&&SC7[V[1]]));const vi=FV7[k].findIndex(V=>V[0]==='C'&&SC7[V[1]]);
  const pp=fPP7(k,vi);pp.y=S.year;const j=j7s();j.plans=j.plans||{};j.plans[k]={y:S.year,pp,me:1};const m=fDay7(k);o.day=!!m;
  const sung0=S.sung,fn0=j.fn;if(m){const op=(m.opts||[]).find(x=>/^Vào thi/.test(x.n));if(op)op.go()}o.hold=got&&got.hold;o.won=S.sung>sung0;o.fn=j.fn-fn0;startContest=sc0;
  o.boards=!!S.cfb;
  /* a wager: the race winner comes from the plan seed (same on every reload) */
  const kw=Object.keys(FV7).find(f=>FV7[f].some(V=>V[0]==='W'));const wi=FV7[kw].findIndex(V=>V[0]==='W');const pw=fPP7(kw,wi);const d1=PEND.j71f(pw),d2=PEND.j71f(pw);
  const bac0=S.bac;const rr=[];for(const d of [d1,d2]){const L=S.logs.length;d.o[d.o.length-1].go();rr.push(S.logs[0])}o.same=rr[0].replace(/<[^>]+>/g,'').slice(-60)===rr[1].replace(/<[^>]+>/g,'').slice(-60);
  /* old save: no co-op contest keys */
  const d=ser();for(const x of ['cfp','cfb','cfa','ctc','ctcRes'])delete d.S[x];quiet=true;deser(d);quiet=false;Q.length=0;
  for(let i=0;i<10;i++){try{endTurn()}catch(e){o.err=String(e);break}Q.length=0}o.after=S.month+'/'+S.year;return o});
 ok(!r.coop,'solo: co-op off',r);ok(r.day&&r.hold===false&&r.won&&r.fn===1,'solo: contest pays through the mini-game, no hold, counted once',r);
 ok(!r.boards,'solo: no shared boards written',r);ok(r.same,'solo: wager winner from the plan seed (stable)',r);ok(!r.err,'solo: old save without the new keys plays 10 weeks',r);
 ok(!errs.length,'no page errors',errs.slice(0,5));
 const bad=res.filter(x=>!x[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
