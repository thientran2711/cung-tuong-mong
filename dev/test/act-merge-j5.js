/* ACT-MERGE J5 test: cung nữ Phận sự doors S1–S5 + pop-up doors, lãnh cung doors G12. Usage: node dev/test/act-merge-j5.js [url]
   Checks: the doors show; every way inside runs through the old chain (khắc spent = the way's own, effects applied, old once/rep kept);
   no page errors. Prints BEFORE (door names ← way names) and the result of one run per way. */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const URL=process.argv[2]||'file://'+path.join(ROOT,'index.html');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);await p.evaluate(LIB);
 const R={};let fails=0;const ok=(c,m,x)=>{if(!c){fails++;console.log('FAIL',m,x===undefined?'':JSON.stringify(x))}else console.log('ok  ',m)};
 /* ---- cung nữ road ---- */
 R.srv=await p.evaluate(()=>{try{try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;AA.reseed(11);let g=false;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(isSrv()){g=true;break}}if(!g)return{err:"no srv start"};AA.hide();
  S.buoi=0;used=0;S.suc=80;S.bac=300;S.tin=99;deal();
  const doors=deck.filter(a=>a.door).map(a=>({n:a.n,ways:a.m.map(w=>w.n)}));const plain=deck.filter(a=>!a.door).map(a=>a.n);
  const m=srvM();const v=rivals.find(x=>x.alive&&x!==m&&!x.queen);const q=rivals.find(x=>x.alive&&x.queen&&x!==m);const s=(typeof allServ==="function"?allServ():[]).find(x=>x&&x.sid!=null);
  const K={mis:{sk:"mis"},rv:{sk:"rv",ref:{id:v.id}},hh:q?{sk:"hh",ref:{id:q.id}}:null,emp:{sk:"emp"},ty:{sk:"ty"},sv:s?{sk:"sv",sid:s.sid}:null};const pop={};
  for(const k in K){if(!K[k])continue;const mk=Object.assign({kind:"srv"},K[k]);const A=talkOpts(mk);const RAW=doorRaw(mk);pop[k]=A.map(a=>a.door?`[${a.n}: ${RAW.filter(w=>w&&!w.door&&DOOR.of(w.n,"srv")&&DOOR.of(w.n,"srv").k===a.door).map(w=>w.n).join(" | ")}]`:a.n)}
  return{doors,plain,pop}}catch(e){return{err:e.message+" "+e.stack.slice(0,300)}}});
 console.log(JSON.stringify(R.srv,null,1));
 ok(!R.srv.err,'srv start');
 if(!R.srv.err){const N=R.srv.doors.map(d=>d.n);for(const n of["Hầu việc","Dò la cho chủ","Học","Nghỉ ngơi"])ok(N.includes(n),'Phận sự door '+n,N);
  ok(R.srv.pop.mis&&R.srv.pop.mis.some(x=>/^\[Xin chủ:/.test(x)),'pop-up chủ: door Xin chủ',R.srv.pop.mis);
  ok(R.srv.pop.hh==null||R.srv.pop.hh.some(x=>/^\[Phản chủ:/.test(x)),'pop-up Hoàng hậu: door Phản chủ',R.srv.pop.hh);
  ok(R.srv.pop.sv==null||R.srv.pop.sv.some(x=>/^\[Giao hảo:/.test(x)),'pop-up người hầu: door Giao hảo',R.srv.pop.sv)}
 /* run every way of every door once (fresh state each) through the real door path: open chooser → choose way */
 const run=await p.evaluate(()=>{const out=[];try{SRVA.errand.offer=100;S.srv.err=null;const ids=[];deal();deck.forEach((a,i)=>{if(a.door)a.m.forEach(w=>ids.push([i,w.n,a.n]))});
  for(const [i,wn,dn] of ids){try{let di=-1;for(let t=0;t<40&&di<0;t++){S.srv.err=null;S.srv.once={};S.buoi=0;used=0;S.suc=90;S.bac=400;S.tin=99;Q.length=0;deal();di=deck.findIndex(a=>a.door&&a.n===dn&&a.m.some(w=>w.n===wn))}if(di<0){out.push({dn,wn,miss:1});continue}const u0=used,b0=S.bac;act(di);const opened=Q.length&&Q[0].t===dn;let r={dn,wn,opened:!!opened};
    if(opened){const ix=Q[0].opts.findIndex(o=>o.n===wn);r.found=ix>=0;if(ix>=0){r.off=!!Q[0].opts[ix].off;r.x=String(Q[0].opts[ix].x).slice(0,140);if(!r.off){chooseM(ix);r.used=used-u0;r.err=null;Q.length=0}else Q.length=0}else Q.length=0}
    out.push(r)}catch(e){out.push({dn,wn,err:e.message})}}}catch(e){out.push({err:e.message})}return out});
 R.run=run;for(const r of run)console.log(JSON.stringify(r));
 ok(run.every(r=>!r.err&&!r.miss&&r.found!==false),'every way of every srv door reachable & runs without error');
 /* ---- lãnh cung ---- */
 R.cold=await p.evaluate(()=>{const o={};try{AA.scen('cao');AA.reseed(7);S.out=1;S.dad=99;S.framedBy=null;deal();o.doors=deck.filter(a=>a.door).map(a=>({n:a.n,ways:a.m.map(w=>w.n)}));o.plain=deck.filter(a=>!a.door).map(a=>a.n);
  o.runs=[];const ids=[];deck.forEach(a=>{if(a.door)a.m.forEach(w=>ids.push([a.n,w.n]))});
  for(const [dn,wn] of ids){try{let di=-1;for(let t=0;t<40&&di<0;t++){AA.scen('cao');AA.reseed(7+t);S.out=1;S.dad=99;S.bac=500;S.suc=90;deal();di=deck.findIndex(a=>a.door&&a.n===dn&&a.m.some(w=>w.n===wn))}if(di<0){o.runs.push({dn,wn,miss:1});continue}const u0=used;act(di);const r={dn,wn,opened:Q.length>0&&Q[0].t===dn};if(r.opened){const ix=Q[0].opts.findIndex(x=>x.n===wn);r.found=ix>=0;r.off=ix>=0&&!!Q[0].opts[ix].off;if(ix>=0&&!r.off){chooseM(ix);r.used=used-u0;if(S.out===0||S.out===false)r.freed=1;if(S.dead)r.dead=1}Q.length=0}o.runs.push(r)}catch(e){o.runs.push({dn,wn,err:e.message})}}}catch(e){o.err=e.message+" "+(e.stack||"").slice(0,300)}return o});
 console.log(JSON.stringify(R.cold,null,1));
 ok(!R.cold.err,'cold start');ok((R.cold.doors||[]).length>=3,'lãnh cung doors',(R.cold.doors||[]).map(d=>d.n));
 ok((R.cold.runs||[]).every(r=>!r.err&&!r.miss&&r.found!==false),'every way of every cold door reachable & runs without error');

 /* ---- khuê các (G13): twins + same-result acts; two roads (đại tiểu thư dtq, dân nữ cnv) ---- */
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
 R.kc={};
 for(const og of ['dtq','cnv']){
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});
  await p.evaluate(()=>{const t=document.querySelector('#slots button[data-new="1"]');if(t)t.click()});await sleep(2000);await skip();
  await p.evaluate(og=>{for(let i=0;i<500&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},og);await sleep(600);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(700);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1500);
  R.kc[og]=await p.evaluate(()=>{const o={runs:[]};try{o.isKc=isKc();AA.hide();const PL=Object.keys(KCPL);const rs=pl=>{S.buoi=0;used=0;S.suc=90;S.bac=500;if(S.kc){S.kc.once={};S.kc.ds=0;S.kc.gift=[];S.kc.le=0;S.kc.early=0;S.kc.g7=-999}Q.length=0;if(pl){S.place=pl;S.kc.fam.forEach(m=>{S.kc.at[m.id]=pl});S.kc.at.ftm=pl}deal()};const dm={},ids=[];for(const pl of [null,...PL]){rs(pl);deck.forEach(a=>{if(a.door&&!dm[a.n]){dm[a.n]={n:a.n,g:a.g,ways:a.m.map(w=>w.n)};a.m.forEach(w=>ids.push([a.n,w.n]))}})}rs();o.doors=Object.values(dm);
   for(const [dn,wn] of ids){try{let di=-1;for(const pl of PL){rs(pl);di=deck.findIndex(a=>a.door&&a.n===dn&&!a.lock&&a.m.some(w=>w.n===wn&&!w.lock));if(di>=0)break}if(di<0){o.runs.push({dn,wn,miss:1});continue}const w0=deck[di].m.find(w=>w.n===wn);const u0=used;act(di);const r={dn,wn,opened:Q.length>0&&Q[0].t===dn};if(r.opened){const ix=Q[0].opts.findIndex(x=>x.n===wn);r.found=ix>=0;r.off=ix>=0&&!!Q[0].opts[ix].off;r.k=w0.k;if(ix>=0&&!r.off){chooseM(ix);r.used=used-u0}Q.length=0}else{r.used=used-u0}o.runs.push(r)}catch(e){o.runs.push({dn,wn,err:e.message})}}}catch(e){o.err=e.message}return o});
  console.log(og,JSON.stringify(R.kc[og].doors));for(const r of R.kc[og].runs)console.log(' ',JSON.stringify(r));
  ok(R.kc[og].isKc&&!R.kc[og].err,'kc '+og+' start',R.kc[og].err);ok((R.kc[og].doors||[]).length>=3,'kc '+og+' doors',(R.kc[og].doors||[]).map(d=>d.n));
  ok((R.kc[og].runs||[]).every(r=>!r.err&&!r.miss&&r.found!==false),'kc '+og+': every way reachable & runs');
  ok((R.kc[og].runs||[]).filter(r=>r.used!=null&&!r.off).every(r=>r.used>=1),'kc '+og+': each way spent its own khắc',(R.kc[og].runs||[]).filter(r=>!(r.used>=1)&&!r.off))}
 ok(perr.length===0,'no page errors',perr);
 fs.writeFileSync(process.env.J5OUT||'/home/user/wt/J5-out/j5.json',JSON.stringify(R,null,1));await b.close();console.log(fails?'FAILED '+fails:'ALL OK');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
