/* ORDER THIN P3 browser test: composed việc nhờ (j72c) on the real game. node dev/test/j72c-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   Registers the fixture seeds (or the given file) as T72 templates and checks, per seed: the requester (and B) is a living real person with the wanted
   nết, every placeholder is filled, the offer marks P0 family j72:<kind>, accepting + playing every step (go / wait / pick) ends it with real changes
   equal to the seed's steps × BAL.j72c.fx, the object trace is kept (law 6c), a real `it` item lands in her chest, the twist applies when true,
   the seed rests for the rest of the life, and every seed in J72SEEDS (built game data) registers. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'j72c-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};let pass=0;
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;const out={built:Object.values(j72cCount()).reduce((a,b)=>a+b,0),builtN:(typeof J72SEEDS!=='undefined'?J72SEEDS.length:-1),seeds:[]};
  S.rank=Math.max(S.rank,3);S.bac=Math.max(S.bac||0,999);
  /* make every live consort carry every nết the fixture names, so the cast is real for the test; Thái hậu ill etc. only when a seed needs it */
  const roll0=roll;const st=(k)=>[S.sung,S.danh,S.bac,S.suc,S.mat,S.th,S.hh,S.duc,S.an].join();
  for(const sd of FIX){const r={id:sd.id};out.seeds.push(r);try{
   if(!T72I["c:"+sd.id])j72cReg(sd);const T=T72I["c:"+sd.id];r.reg=!!T;if(!T)continue;
   if(sd.req.need==="thIll")S.thIll={k:Object.keys(ILL)[0],st:1};if(sd.req.need==="empIll")S.emp.ill={k:Object.keys(ILL)[0],st:1,known:true};
   const q=q72();q.a=[];q.mo={};q.cd={};Q.length=0;let x=null;for(let t=0;t<40&&!x;t++)x=q72Make(T);r.made=!!x;if(!x)continue;const X=q72X(x);
   r.who=X.A.n+(X.B?' / '+X.B.n:'');r.alive=!!X.A&&(X.A.o?X.A.o.alive!==false:true);
   if(sd.req["nết"]&&sd.req["nết"].length&&(X.A.k==="rv"))r.net=sd.req["nết"].some(n=>tr6(X.A.o).includes(n));else r.net=true;
   q72Offer(x,"");const it=Q.find(z=>z.t==="Việc nhờ");r.offer=!!it;r.text=it?plain(it.h).slice(0,160):'';r.unfilled=it?/\{[A-Za-z]+\}/.test(it.h+it.opts.map(o=>o.n+o.x).join()):true;
   r.mark=nrNow("j72:"+sd.kind,sd.id);it.opts[0].go();Q.length=0;r.acc=q.a.includes(x);
   if(sd.twist)x.p.tw=1;const s0=st();const ob0=q72c().ob.length;const inv0=(S.inv||[]).length;const rel0=q72RelV(X.A);
   roll=()=>true;let n=0;while(q.a.includes(x)&&n++<20){used=0;S.suc=100;Q.length=0;const step=X.T.s[x.st];if(step&&step.w){x.wt=wk();q72Tick();continue}if(!q72Bot()){const pl=q72StepPl(step,X);r.stuck=(r.stuck||'')+`[${x.st}:${pl}:${S.place}:${q72Why(x,X,step,step.ch?step.ch[0]:null)}]`;if(pl&&pl!=="home"){S.place=pl}else if(pl==="home"){S.place="home"}else break}}
   roll=roll0;r.ended=!q.a.includes(x);r.res=(q.h[0]||{}).res;r.changed=s0!==st()||q72RelV(X.A)!==rel0;
   const ob=q72c().ob.slice(ob0);r.trace=ob.length?ob[0].trace:null;r.objOk=sd.object?ob.length===1&&!!ob[0].trace&&!/\{/.test(ob[0].trace):true;
   r.item=sd.object&&sd.object.it?(S.inv||[]).length>inv0&&(S.inv||[]).some(e=>e.k===sd.object.it):true;
   r.rest=!q72Cands().some(z=>z[0]===T);r.log=(q.h[0]||{}).tok;
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  /* number check: ok fx of the first seed = its gain steps × BAL */
  const sd0=FIX[0],T0=T72I["c:"+sd0.id];out.num=T0?Object.entries(sd0.ok.gain).every(([k,n])=>k==="rel"?T0.ok.r===n*BAL.j72c.fx[sd0.tier].rel+(0):k==="relb"?true:T0.ok.fx[k]===n*BAL.j72c.fx[sd0.tier][k]):false;
  return out},FIX);
 for(const r of R.seeds){const t=`${r.id} (${r.who||'-'})`;
  if(r.err){ok(false,t+' threw '+r.err);continue}
  ok(r.reg,t+' registers');ok(r.made,t+' made from the live roster');ok(r.alive&&r.net,t+' requester alive with a wanted nết');ok(r.offer&&!r.unfilled,t+' offer shown, placeholders filled');
  ok(r.mark,t+' P0 marks family j72:<kind>');ok(r.acc,t+' accept');ok(r.ended&&r.res==='ok',t+' plays to the end ('+r.res+(r.stuck?' '+r.stuck:'')+')');ok(r.changed,t+' real changes');
  ok(r.objOk,t+' object traced: '+r.trace);ok(r.item,t+' real item in her chest');ok(r.rest,t+' rests for this life');if(!fail||process.env.V)pass++}
 ok(R.num,'ok numbers = steps × BAL.j72c.fx');ok(R.builtN<0||R.built>=R.builtN,`built J72SEEDS register (${R.built}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 if(process.env.V)console.log(JSON.stringify(R.seeds.slice(0,4),null,1).slice(0,3000));
 console.log(fail?`J72C PLAY: ${fail} FAIL (${R.seeds.length} seeds)`:`J72C PLAY: ALL PASS (${R.seeds.length} seeds, ${R.builtN} built)`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
