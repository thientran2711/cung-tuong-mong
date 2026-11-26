/* ACT-MERGE J5 test: cung nữ Phận sự doors S1–S5 + pop-up doors, lãnh cung doors G12. Usage: node dev/test/act-merge-j5.js [url]
   Checks: the doors show; every way inside runs through the old chain (khắc spent = the way's own, effects applied, old once/rep kept);
   no page errors. Prints BEFORE (door names ← way names) and the result of one run per way. */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const URL=process.argv[2]||'file://'+path.join(ROOT,'index.html');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);await p.evaluate(LIB);
 await p.evaluate(()=>{window.J5T={dd(full){const out=[];const L=full?AA.surfaces():AA.surfaces().filter(x=>x.id==="act");for(const sf of L){try{AA.show(sf)}catch(e){continue}for(const d of DOOR.deckDoors()){d.sf=sf;out.push(d)}}return out},
  all(S0,full){const m={};for(const st of S0){try{st()}catch(e){}for(const d of this.dd(full)){const o=m[d.n]||(m[d.n]={ways:[],at:{}});d.ways.forEach(w=>{if(!o.ways.includes(w)){o.ways.push(w);o.at[w]=S0.indexOf(st)}})}}return Object.entries(m).map(([n,v])=>({n,ways:v.ways,at:v.at}))},
  try(dn,wn,S0,at,full){let seen=null;const O=at!=null&&S0[at]?[S0[at],...S0.filter((x,i)=>i!==at)]:S0;for(const st of O){try{st()}catch(e){}const d=this.dd(full).find(x=>x.n===dn&&x.ways.includes(wn));if(!d)continue;try{AA.show(d.sf)}catch(e){}seen=seen||d;if(!d.free.includes(wn))continue;
   const b=document.querySelector('#panel button[data-ddoor]'+'[data-ddoor="'+dn.replace(/"/g,'\\"')+'"]');Q.length=0;if(b)b.click();const txt=((document.getElementById('modal')||{}).textContent)||'';const opened=!!b&&Q.length>0,found=txt.includes(wn);Q.length=0;
   const u0=used,ran=DOOR.run(wn);return{dn,wn,opened,found,used:used-u0,ran}}
   return seen?{dn,wn,opened:true,found:true,locked:1}:{dn,wn,miss:1}}}});
 const R={};let fails=0;const ok=(c,m,x)=>{if(!c){fails++;console.log('FAIL',m,x===undefined?'':JSON.stringify(x))}else console.log('ok  ',m)};
 /* ---- cung nữ road ---- */
 R.srv=await p.evaluate(()=>{try{try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;AA.reseed(11);let g=false;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(isSrv()){g=true;break}}if(!g)return{err:"no srv start"};AA.hide();
  S.buoi=0;used=0;S.suc=80;S.bac=300;S.tin=99;deal();
  render();const doors=J5T.dd().map(d=>({n:d.n,ways:d.ways}));const plain=deck.map(a=>a.n);
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
 const run=await p.evaluate(()=>{const out=[];try{SRVA.errand.offer=100;const st=()=>{S.srv.err=null;S.srv.once={};S.buoi=0;used=0;S.suc=90;S.bac=400;S.tin=99;Q.length=0;deal()};const D=J5T.all([st]);for(const d of D)for(const w of d.ways)out.push(J5T.try(d.n,w,[st],d.at[w]))}catch(e){out.push({err:e.message})}return out});
 R.run=run;for(const r of run)console.log(JSON.stringify(r));
 ok(run.every(r=>!r.err&&!r.miss&&r.opened&&r.found),'every way of every srv door reachable & runs without error');
 /* ---- lãnh cung ---- */
 R.cold=await p.evaluate(()=>{const o={};try{const S0=[];for(let t=0;t<40;t++)S0.push(()=>{AA.scen('cao');AA.reseed(7+t);S.out=1;S.dad=99;S.bac=500;S.suc=90;S.framedBy=null;Q.length=0;deal();render();render()});
  S0[0]();o.doors=J5T.dd().map(d=>({n:d.n,ways:d.ways}));o.plain=[...document.querySelectorAll('#panel button.kcard[data-i]')].map(b=>deck[+b.dataset.i]&&deck[+b.dataset.i].n);o.dups=deck.filter(a=>/^Nghỉ ngơi một lát$/.test(a.n)).length;
  const D=J5T.all(S0);o.runs=[];for(const d of D)for(const w of d.ways)o.runs.push(J5T.try(d.n,w,S0,d.at[w]))}catch(e){o.err=e.message+" "+(e.stack||"").slice(0,300)}return o});
 console.log(JSON.stringify(R.cold,null,1));
 ok(!R.cold.err,'cold start');ok((R.cold.doors||[]).length>=3,'lãnh cung doors',(R.cold.doors||[]).map(d=>d.n));
 ok(R.cold.dups<=1&&!(R.cold.plain||[]).some(n=>/^(Nghỉ ngơi một lát|Đọc sách giải khuây)$/.test(n)),'lãnh cung: no bare member beside its door after render() (j76 re-add)',R.cold.plain);
 ok((R.cold.runs||[]).every(r=>!r.err&&!r.miss&&r.opened&&r.found),'every way of every cold door reachable & runs without error');

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
  R.kc[og]=await p.evaluate(()=>{const o={runs:[]};try{o.isKc=isKc();AA.hide();const PL=Object.keys(KCPL);const rs=pl=>{S.buoi=0;used=0;S.suc=90;S.bac=500;if(S.kc){S.kc.once={};S.kc.ds=0;S.kc.gift=[];S.kc.le=0;S.kc.early=0;S.kc.g7=-999}Q.length=0;if(pl){S.place=pl;S.kc.fam.forEach(m=>{S.kc.at[m.id]=pl});S.kc.at.ftm=pl}deal()};rs();
   const S0=[null,...PL].map(pl=>()=>rs(pl));rs();J5T.dd();o.dbg={tab:typeof tab!=='undefined'?tab:null,sf:AA.surfaces().map(x=>x.id),cards:document.querySelectorAll('#panel .cards button').length,kc:document.querySelectorAll('#panel button.kcard[data-i]').length,dk:deck.length,road:DOOR.road(),R:DOOR.D.filter(r=>r.roads.includes('kc')).length};const D=J5T.all(S0,1);o.doors=D.map(d=>({n:d.n,ways:d.ways}));for(const d of D)for(const w of d.ways)o.runs.push(J5T.try(d.n,w,S0,d.at[w],1))}catch(e){o.err=e.message}return o});
  console.log(og,JSON.stringify(R.kc[og].dbg),JSON.stringify(R.kc[og].doors));for(const r of R.kc[og].runs)console.log(' ',JSON.stringify(r));
  ok(R.kc[og].isKc&&!R.kc[og].err,'kc '+og+' start',[R.kc[og].isKc,R.kc[og].err]);ok((R.kc[og].doors||[]).length>=3,'kc '+og+' doors',(R.kc[og].doors||[]).map(d=>d.n));
  ok((R.kc[og].runs||[]).every(r=>!r.err&&!r.miss&&r.opened&&r.found),'kc '+og+': every way reachable & runs');
  ok((R.kc[og].runs||[]).filter(r=>r.used!=null&&!r.locked).every(r=>r.used>=1),'kc '+og+': each way spent its own khắc',(R.kc[og].runs||[]).filter(r=>!(r.used>=1)&&!r.off))}
 ok(perr.length===0,'no page errors',perr);
 fs.writeFileSync(process.env.J5OUT||require('os').tmpdir()+'/j5-out.json',JSON.stringify(R,null,1));await b.close();console.log(fails?'FAILED '+fails:'ALL OK');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
