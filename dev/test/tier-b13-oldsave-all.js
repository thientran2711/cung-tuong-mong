/* E-TIER-B13-RV (BIG review, law 2 old saves): tier-b13-oldsave.js only saves on old way 3, and both of its cases map 3 → 0, so a broken map
   «always 0» still passed it. This gate saves on the LIVE build, for 5 hồi of tt_ruong (s1 s2 x1 c1 t1) × EVERY old way 0..3, a bạc pledge
   (S.pl67.i) alone and a helper refusal (A.hpNo.i) alone, loads each in the new build (deser) and checks BY NAME: the mapped way == the new row
   way at om[i], and a kept way == the old way's own name. Mutants: rdcOm «return i» and «return 0» both FAIL here.
   usage: git show <live sha>:index.html > /tmp/old.html && node dev/test/tier-b13-oldsave-all.js /tmp/old.html */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OLD=process.argv[2];let VER='old';
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.startsWith('/__ver/')){VER=p.slice(7);return r.end(VER)}
 if(p==='/'||p==='/index.html'){r.setHeader('Content-Type','text/html; charset=utf-8');return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
 const f=path.join(ROOT,p.replace(/^\/+/,''));if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,700):''))};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const open=async()=>{const g=await D.openHost(p,URL,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});return g};
 let g=await open();const saves=[];
 for(const bid of ['s1','s2','x1','c1','t1']){for(let i=0;i<4;i++){saves.push(await g.evaluate(([bid,i])=>{try{store.set(NL_KEY,null)}catch(e){}document.getElementById('title').hidden=true;
   const others=Object.keys(ARC67).filter(id=>ARC67[id].o==='tt'&&id!=='tt_ruong');try{localStorage.setItem('ctm-arcs',JSON.stringify({tt:others}));localStorage.setItem('ctm-tm96','1')}catch(e){}
   window.__forceOrigin='tt';start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;
   const c=S.st.ch,k=c.plan.indexOf('o');S.st.ms=null;S.st.M=null;c.i=k-1;c.n=k;chAdvance67(null);Q.length=0;const A=S.st.M;if(!A||A.a!=='tt_ruong')return{err:'thread'};
   if(!ARC67[A.a].B[bid])return{err:'nobeat '+bid};A.nb=bid;A.cur=null;Q.length=0;fireBeat67(A);const q=Q.find(m=>m.pid==='j67');if(!q)return{err:'no card'};
   const b=beatDef67(A,bid);const O=opts67(A,b);const raw=b.o.map(o=>o.n);
   S.pl67={a:A.a,b:bid,t:thKey67(A),pp:q.pp,i,sev:1,due:absB67()+9,t0:absB67(),n:'x',h:'x',cost:1,chap:1};const sP=JSON.stringify(ser());S.pl67=null;A.hpNo={b:bid,i:[i]};const sR=JSON.stringify(ser());
   return{bid,i,on:O[i]&&O[i].n,raw,nO:O.length,sP,sR}},[bid,i]))}}
 ok(saves.every(x=>!x.err),'old saves '+saves.length,saves.filter(x=>x.err).map(x=>x.err));
 await fetch(URL+'__ver/new');g=await open();
 for(const s of saves){if(s.err)continue;for(const kind of ['pledge','refusal']){const R=await g.evaluate(([s,kind])=>{deser(JSON.parse(kind==='pledge'?s.sP:s.sR));const A=S.st.M;const b=beatDef67(A,s.bid);const O=opts67(A,b);
   return{om:b.om,pl:S.pl67&&S.pl67.i,pn:S.pl67&&O[S.pl67.i]&&O[S.pl67.i].n,hp:A.hpNo&&A.hpNo.i,hpn:A.hpNo&&A.hpNo.i.map(j=>b.o[j]&&b.o[j].n),raw:b.o.map(o=>o.n)}},[s,kind]);
  const want=R.om&&R.raw[R.om[s.i]];const kept=R.raw.includes(s.on);
  const got=kind==='pledge'?R.pn:(R.hpn&&R.hpn.length===1?R.hpn[0]:null);
  ok(got===want&&(!kept||got===s.on),`${s.bid} old way ${s.i} «${s.on}»${kept?'':' (removed)'} → ${kind} on «${got}» (om ${R.om&&R.om.join('')})`,R)}}
 ok(errs.length===0,'page errors '+errs.length+' '+(errs[0]||''));
 console.log(fail?`TIER-B13 OLDSAVE-ALL: ${fail} FAIL`:'TIER-B13 OLDSAVE-ALL: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
