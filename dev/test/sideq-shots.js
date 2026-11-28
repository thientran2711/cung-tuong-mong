/* review/sideq-trim LOOK stills: a real ask dealt through the rank gate (q72Choose(q72Cands()) at her rank) + the Nhờ tab after accepting two,
   Fold 755x1000@2 and iPad 1180x820@2. node dev/test/sideq-shots.js <outdir> [rank=5]  (after dev/site/build_site.sh; shots never go to git); env TID=<template id> = the first ask is that template
   Prints who asked (kind, rank) and the deadline so the still can be checked against BAL.sideq. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const OUT=process.argv[2]||'/tmp/sideq-shots';const TID0=process.env.TID||'';const RK=+(process.argv[3]||5);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){process.env.TID=TID0;const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(3000);
  await p.evaluate(rk=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;
   try{$("modal").hidden=true}catch(e){}S.rank=rk;S.sung=Math.max(S.sung,60);try{if(f14())S.st.ch.n=Math.max(S.st.ch.n,BAL.st14.parts[1][0])}catch(e){}
   for(const v of rivals){try{if(v.alive&&!v.out)S.rl[v.id]=Math.max(S.rl[v.id]||0,40)}catch(e){}}render()},RK);
  await p.waitForTimeout(600);
  const offer=async()=>p.evaluate(tid=>{const q=q72();q.lw=null;q.mo={};let x=null;if(tid&&T72I[tid]){for(let i=0;i<40&&!x;i++)x=q72Make(T72I[tid])}for(let i=0;i<40&&!x;i++)x=q72Choose(q72Cands());if(!x)return null;const X=q72X(x);q72Offer(x,"");showModal();
    return{tid:x.tid,k:X.A.k,n:X.A.n,own:X.A.k==="sv"?ownerOf(X.A.o)===S:undefined,rank:X.A.o&&X.A.o.rank,her:S.rank,dl:X.T.dl,dl0:X.T.dl0,steps:X.T.s.length,fit:q72Fit(X.A,X.T)}},process.env.TID||"");
  /* wait until every picture in the modal has loaded (a Fold cold-cache figure takes ~0.6–0.9 s: a still taken at 0.9 s showed an own maid as the grey placeholder) */
  const loaded=async()=>{for(let i=0;i<40;i++){if(await p.evaluate(()=>[...document.querySelectorAll('#modal img')].every(i=>i.complete&&i.naturalWidth>0)))return true;await p.waitForTimeout(250)}return false};
  const a=await offer();await p.waitForTimeout(400);if(!await loaded()){console.log(name,'modal picture did not load');bad++}await p.screenshot({path:path.join(OUT,`${name}-ask.png`)});console.log(name,'ask',JSON.stringify(a));if(!a||!a.fit)bad++;
  const acc=()=>p.evaluate(()=>{const i=Q.map(m=>m&&m.t).lastIndexOf('Việc nhờ');if(i<0)return false;const m=Q.splice(i,1)[0];m.opts[0].go();return true});
  await acc();await p.waitForTimeout(400);
  process.env.TID="";const a2=await offer();console.log(name,'ask2',JSON.stringify(a2));await acc();await p.waitForTimeout(400);
  const a3=await offer();console.log(name,'ask3 (open cap BAL.sideq.open reached: «Nhận lời» refused)',JSON.stringify(a3));
  await acc();await p.evaluate(()=>{try{$("modal").hidden=true}catch(e){}Q.length=0;tab="q72";render()});await p.waitForTimeout(900);
  const st=await p.evaluate(()=>({open:q72().a.length,max:Q72CFG.max,dls:q72().a.map(x=>x.dl-wk())}));console.log(name,'tab',JSON.stringify(st));if(st.open>st.max)bad++;
  await p.screenshot({path:path.join(OUT,`${name}-tab.png`)});
  console.log(name,'page errors',errs.length,errs[0]||'');bad+=errs.length;await p.close()}
 await b.close();console.log(bad?'FAIL':'PASS')})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
